"use strict";
// Mini memory editor for Dear ImGui (to embed in your game/tools)
// Animated GIF: https://twitter.com/ocornut/status/894242704317530112
// Get latest version at http://www.github.com/ocornut/imgui_club
//
// You can adjust the keyboard repeat delay/rate in ImGuiIO.
// The code assume a mono-space font for simplicity! If you don't use the default font, use ImGui.PushFont()/PopFont() to switch to a mono-space font before caling this.
//
// Usage:
//   static MemoryEditor mem_edit_1;                                            // store your state somewhere
//   mem_edit_1.DrawWindow("Memory Editor", mem_block, mem_block_size, 0x0000); // create a window and draw memory editor (if you already have a window, use DrawContents())
//
// Usage:
//   static MemoryEditor mem_edit_2;
//   ImGui.Begin("MyWindow")
//   mem_edit_2.DrawContents(this, sizeof(*this), (size_t)this);
//   ImGui.End();
//
// Changelog:
// - v0.10: initial version
// - v0.11: always refresh active text input with the latest byte from source memory if it's not being edited.
// - v0.12: added this.OptMidRowsCount to allow extra spacing every XX rows.
// - v0.13: added optional ReadFn/WriteFn handlers to access memory via a function. various warning fixes for 64-bits.
// - v0.14: added GotoAddr member, added GotoAddrAndHighlight() and highlighting. fixed minor scrollbar glitch when resizing.
// - v0.15: added maximum window width. minor optimization.
// - v0.16: added OptGreyOutZeroes option. various sizing fixes when resizing using the "Rows" drag.
// - v0.17: added HighlightFn handler for optional non-contiguous highlighting.
// - v0.18: fixes for displaying 64-bits addresses, fixed mouse click gaps introduced in recent changes, cursor tracking scrolling fixes.
// - v0.19: fixed auto-focus of next byte leaving WantCaptureKeyboard=false for one frame. we now capture the keyboard during that transition.
// - v0.20: added options menu. added this.OptShowAscii checkbox. added optional HexII display. split Draw() in DrawWindow()/DrawContents(). fixing glyph width. refactoring/cleaning code.
// - v0.21: fixes for using DrawContents() in our own window. fixed HexII to actually be useful and not on the wrong side.
// - v0.22: clicking Ascii view select the byte in the Hex view. Ascii view highlight selection.
// - v0.23: fixed right-arrow triggering a byte write
//
// Todo/Bugs:
// - Arrows are being sent to the InputText() about to disappear which for LeftArrow makes the text cursor appear at position 1 for one frame.
Object.defineProperty(exports, "__esModule", { value: true });
// #pragma once
// #include <stdio.h>  // sprintf, scanf
const ImGui = require("./imgui");
const imgui_1 = require("./imgui");
const imgui_2 = require("./imgui");
const imgui_3 = require("./imgui");
class MemoryEditor {
    constructor() {
        // typedef unsigned char u8;
        // Settings
        // bool            Open;                                   // = true   // set to false when DrawWindow() was closed. ignore if not using DrawWindow
        this.Open = false;
        // bool            ReadOnly;                               // = false  // set to true to disable any editing
        this.ReadOnly = false;
        // int             Rows;                                   // = 16     //
        this.Rows = 16;
        // bool            OptShowAscii;                           // = true   //
        this.OptShowAscii = true;
        // bool            OptShowHexII;                           // = false  //
        this.OptShowHexII = false;
        // bool            OptGreyOutZeroes;                       // = true   //
        this.OptGreyOutZeroes = true;
        // int             OptMidRowsCount;                        // = 8      // set to 0 to disable extra spacing between every mid-rows
        this.OptMidRowsCount = 8;
        // int             OptAddrDigitsCount;                     // = 0      // number of addr digits to display (default calculated based on maximum displayed addr)
        this.OptAddrDigitsCount = 0;
        // ImU32           HighlightColor;                         //          // color of highlight
        this.HighlightColor = ImGui.IM_COL32(255, 255, 255, 40);
        // u8              (*ReadFn)(u8* data, size_t off);        // = NULL   // optional handler to read bytes
        this.ReadFn = null;
        // void            (*WriteFn)(u8* data, size_t off, u8 d); // = NULL   // optional handler to write bytes
        this.WriteFn = null;
        // bool            (*HighlightFn)(u8* data, size_t off);   // = NULL   // optional handler to return Highlight property (to support non-contiguous highlighting)
        this.HighlightFn = null;
        // State/Internals
        // bool            ContentsWidthChanged;
        this.ContentsWidthChanged = false;
        // size_t          DataEditingAddr;
        this.DataEditingAddr = -1;
        // bool            DataEditingTakeFocus;
        this.DataEditingTakeFocus = false;
        // char            DataInputBuf[32];
        this.DataInputBuf = new imgui_1.ImStringBuffer(32, "");
        // char            AddrInputBuf[32];
        this.AddrInputBuf = new imgui_1.ImStringBuffer(32, "");
        // size_t          GotoAddr;
        this.GotoAddr = -1;
        // size_t          HighlightMin, HighlightMax;
        this.HighlightMin = -1;
        this.HighlightMax = -1;
    }
    GotoAddrAndHighlight(addr_min, addr_max) {
        this.GotoAddr = addr_min;
        this.HighlightMin = addr_min;
        this.HighlightMax = addr_max;
    }
    // struct Sizes
    // {
    //     int     AddrDigitsCount;
    //     float   LineHeight;
    //     float   GlyphWidth;
    //     float   HexCellWidth;
    //     float   SpacingBetweenMidRows;
    //     float   PosHexStart;
    //     float   PosHexEnd;
    //     float   PosAsciiStart;
    //     float   PosAsciiEnd;
    //     float   WindowWidth;
    // };
    CalcSizes(s, mem_size, base_display_addr) {
        const style = ImGui.GetStyle();
        s.AddrDigitsCount = this.OptAddrDigitsCount;
        if (s.AddrDigitsCount === 0)
            for (let n = base_display_addr + mem_size - 1; n > 0; n >>= 4)
                s.AddrDigitsCount++;
        s.LineHeight = ImGui.GetTextLineHeight();
        s.GlyphWidth = ImGui.CalcTextSize("F").x + 1; // We assume the font is mono-space
        s.HexCellWidth = Math.floor(s.GlyphWidth * 2.5); // "FF " we include trailing space in the width to easily catch clicks everywhere
        s.SpacingBetweenMidRows = Math.floor(s.HexCellWidth * 0.25); // Every this.OptMidRowsCount columns we add a bit of extra spacing
        s.PosHexStart = (s.AddrDigitsCount + 2) * s.GlyphWidth;
        s.PosHexEnd = s.PosHexStart + (s.HexCellWidth * this.Rows);
        s.PosAsciiStart = s.PosAsciiEnd = s.PosHexEnd;
        if (this.OptShowAscii) {
            s.PosAsciiStart = s.PosHexEnd + s.GlyphWidth * 1;
            if (this.OptMidRowsCount > 0)
                s.PosAsciiStart += ((this.Rows + this.OptMidRowsCount - 1) / this.OptMidRowsCount) * s.SpacingBetweenMidRows;
            s.PosAsciiEnd = s.PosAsciiStart + this.Rows * s.GlyphWidth;
        }
        s.WindowWidth = s.PosAsciiEnd + style.ScrollbarSize + style.WindowPadding.x * 2 + s.GlyphWidth;
    }
    // #ifdef _MSC_VER
    // #define _PRISizeT   "IX"
    // #else
    // #define _PRISizeT   "zX"
    // #endif
    static sprintf_PRISizeT(n, pad = 0) {
        return ("0".repeat(pad) + n.toString(16).toUpperCase()).substr(-pad);
    }
    static sscanf_PRISizeT(s) {
        return parseInt(s, 16);
    }
    // Standalone Memory Editor window
    DrawWindow(title, mem_data, mem_size = mem_data.byteLength, base_display_addr = 0x000) {
        const s = new MemoryEditor.Sizes();
        this.CalcSizes(s, mem_size, base_display_addr);
        // ImGui.SetNextWindowSizeConstraints(new ImVec2(0.0, 0.0), new ImVec2(s.WindowWidth, FLT_MAX));
        ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(0.0, 0.0), new imgui_2.ImVec2(s.WindowWidth, Number.MAX_VALUE));
        // this.Open = true;
        // if (ImGui.Begin(title, &Open, ImGuiWindowFlags_NoScrollbar))
        if (ImGui.Begin(title, (value = this.Open) => this.Open = value, 8 /* NoScrollbar */)) {
            if (ImGui.IsWindowHovered(2 /* RootWindow */ | 1 /* ChildWindows */) && ImGui.IsMouseClicked(1))
                ImGui.OpenPopup("context");
            this.DrawContents(mem_data, mem_size, base_display_addr);
            if (this.ContentsWidthChanged) {
                this.CalcSizes(s, mem_size, base_display_addr);
                ImGui.SetWindowSize(new imgui_2.ImVec2(s.WindowWidth, ImGui.GetWindowSize().y));
            }
        }
        ImGui.End();
    }
    // Memory Editor contents only
    DrawContents(mem_data, mem_size = mem_data.byteLength, base_display_addr = 0x0000) {
        const s = new MemoryEditor.Sizes();
        this.CalcSizes(s, mem_size, base_display_addr);
        const style = ImGui.GetStyle();
        // ImGui.BeginChild("##scrolling", new ImVec2(0, -ImGui.GetItemsLineHeightWithSpacing()));
        ImGui.BeginChild("##scrolling", new imgui_2.ImVec2(0, -ImGui.GetFrameHeightWithSpacing()));
        const draw_list = ImGui.GetWindowDrawList();
        ImGui.PushStyleVar(9 /* FramePadding */, new imgui_2.ImVec2(0, 0));
        ImGui.PushStyleVar(12 /* ItemSpacing */, new imgui_2.ImVec2(0, 0));
        const line_total_count = 0 | ((mem_size + this.Rows - 1) / this.Rows);
        const clipper = new imgui_3.ImGuiListClipper(line_total_count, s.LineHeight);
        const visible_start_addr = clipper.DisplayStart * this.Rows;
        const visible_end_addr = clipper.DisplayEnd * this.Rows;
        let data_next = false;
        if (this.ReadOnly || this.DataEditingAddr >= mem_size)
            this.DataEditingAddr = -1;
        const data_editing_addr_backup = this.DataEditingAddr;
        let data_editing_addr_next = -1;
        if (this.DataEditingAddr !== -1) {
            // Move cursor but only apply on next frame so scrolling with be synchronized (because currently we can't change the scrolling while the window is being rendered)
            if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(3 /* UpArrow */)) && this.DataEditingAddr >= this.Rows) {
                data_editing_addr_next = this.DataEditingAddr - this.Rows;
                this.DataEditingTakeFocus = true;
            }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(4 /* DownArrow */)) && this.DataEditingAddr < mem_size - this.Rows) {
                data_editing_addr_next = this.DataEditingAddr + this.Rows;
                this.DataEditingTakeFocus = true;
            }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(1 /* LeftArrow */)) && this.DataEditingAddr > 0) {
                data_editing_addr_next = this.DataEditingAddr - 1;
                this.DataEditingTakeFocus = true;
            }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(2 /* RightArrow */)) && this.DataEditingAddr < mem_size - 1) {
                data_editing_addr_next = this.DataEditingAddr + 1;
                this.DataEditingTakeFocus = true;
            }
        }
        if (data_editing_addr_next !== -1 && (data_editing_addr_next / this.Rows) !== (data_editing_addr_backup / this.Rows)) {
            // Track cursor movements
            const scroll_offset = (0 | (data_editing_addr_next / this.Rows) - 0 | (data_editing_addr_backup / this.Rows));
            const scroll_desired = (scroll_offset < 0 && data_editing_addr_next < visible_start_addr + this.Rows * 2) || (scroll_offset > 0 && data_editing_addr_next > visible_end_addr - this.Rows * 2);
            if (scroll_desired)
                ImGui.SetScrollY(ImGui.GetScrollY() + scroll_offset * s.LineHeight);
        }
        // Draw vertical separator
        const window_pos = ImGui.GetWindowPos();
        if (this.OptShowAscii)
            draw_list.AddLine(new imgui_2.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y), new imgui_2.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y + 9999), ImGui.GetColorU32(5 /* Border */));
        const color_text = ImGui.GetColorU32(0 /* Text */);
        const color_disabled = this.OptGreyOutZeroes ? ImGui.GetColorU32(1 /* TextDisabled */) : color_text;
        for (let line_i = clipper.DisplayStart; line_i < clipper.DisplayEnd; line_i++) {
            let addr = (line_i * this.Rows);
            // ImGui.Text("%0*" _PRISizeT ": ", s.AddrDigitsCount, base_display_addr + addr);
            ImGui.Text(`${MemoryEditor.sprintf_PRISizeT(base_display_addr + addr, s.AddrDigitsCount)}: `);
            // Draw Hexadecimal
            for (let n = 0; n < this.Rows && addr < mem_size; n++, addr++) {
                let byte_pos_x = s.PosHexStart + s.HexCellWidth * n;
                if (this.OptMidRowsCount > 0)
                    byte_pos_x += (n / this.OptMidRowsCount) * s.SpacingBetweenMidRows;
                ImGui.SameLine(byte_pos_x);
                // Draw highlight
                if ((addr >= this.HighlightMin && addr < this.HighlightMax) || (this.HighlightFn && this.HighlightFn(mem_data, addr))) {
                    const pos = ImGui.GetCursorScreenPos();
                    let highlight_width = s.GlyphWidth * 2;
                    const is_next_byte_highlighted = (addr + 1 < mem_size) && ((this.HighlightMax !== -1 && addr + 1 < this.HighlightMax) || (this.HighlightFn && this.HighlightFn(mem_data, addr + 1) || false));
                    if (is_next_byte_highlighted || (n + 1 === this.Rows)) {
                        highlight_width = s.HexCellWidth;
                        if (this.OptMidRowsCount > 0 && n > 0 && (n + 1) < this.Rows && ((n + 1) % this.OptMidRowsCount) === 0)
                            highlight_width += s.SpacingBetweenMidRows;
                    }
                    draw_list.AddRectFilled(pos, new imgui_2.ImVec2(pos.x + highlight_width, pos.y + s.LineHeight), this.HighlightColor);
                }
                if (this.DataEditingAddr === addr) {
                    // Display text input on current byte
                    let data_write = false;
                    ImGui.PushID(addr);
                    if (this.DataEditingTakeFocus) {
                        ImGui.SetKeyboardFocusHere();
                        ImGui.CaptureKeyboardFromApp(true);
                        // sprintf(AddrInputBuf, "%0*" _PRISizeT, s.AddrDigitsCount, base_display_addr + addr);
                        this.AddrInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(base_display_addr + addr, s.AddrDigitsCount);
                        // sprintf(DataInputBuf, "%02X", ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                        this.DataInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr], 2);
                    }
                    ImGui.PushItemWidth(s.GlyphWidth * 2);
                    // struct UserData
                    // {
                    //     // FIXME: We should have a way to retrieve the text edit cursor position more easily in the API, this is rather tedious. This is such a ugly mess we may be better off not using InputText() at all here.
                    //     static int Callback(ImGuiTextEditCallbackData* data)
                    //     {
                    //         UserData* user_data = (UserData*)data->UserData;
                    //         if (!data->HasSelection())
                    //             user_data->CursorPos = data->CursorPos;
                    //         if (data->SelectionStart === 0 && data->SelectionEnd === data->BufTextLen)
                    //         {
                    //             // When not editing a byte, always rewrite its content (this is a bit tricky, since InputText technically "owns" the master copy of the buffer we edit it in there)
                    //             data->DeleteChars(0, data->BufTextLen);
                    //             data->InsertChars(0, user_data->CurrentBufOverwrite);
                    //             data->SelectionStart = 0;
                    //             data->SelectionEnd = data->CursorPos = 2;
                    //         }
                    //         return 0;
                    //     }
                    //     char   CurrentBufOverwrite[3];  // Input
                    //     int    CursorPos;               // Output
                    // };
                    // FIXME: We should have a way to retrieve the text edit cursor position more easily in the API, this is rather tedious. This is such a ugly mess we may be better off not using InputText() at all here.
                    function Callback(data) {
                        if (!data.HasSelection())
                            user_data.CursorPos = data.CursorPos;
                        if (data.SelectionStart === 0 && data.SelectionEnd === data.BufTextLen) {
                            // When not editing a byte, always rewrite its content (this is a bit tricky, since InputText technically "owns" the master copy of the buffer we edit it in there)
                            data.DeleteChars(0, data.BufTextLen);
                            data.InsertChars(0, user_data.CurrentBufOverwrite);
                            data.SelectionStart = 0;
                            data.SelectionEnd = data.CursorPos = 2;
                        }
                        return 0;
                    }
                    // UserData user_data;
                    // user_data.CursorPos = -1;
                    const user_data = {
                        CurrentBufOverwrite: "",
                        CursorPos: -1
                    };
                    // sprintf(user_data.CurrentBufOverwrite, "%02X", ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                    user_data.CurrentBufOverwrite = MemoryEditor.sprintf_PRISizeT(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr], 2);
                    const flags = 2 /* CharsHexadecimal */ | 32 /* EnterReturnsTrue */ | 16 /* AutoSelectAll */ | 4096 /* NoHorizontalScroll */ | 8192 /* AlwaysInsertMode */ | 256 /* CallbackAlways */;
                    // if (ImGui.InputText("##data", DataInputBuf, 32, flags, UserData::Callback, &user_data))
                    if (ImGui.InputText("##data", this.DataInputBuf, this.DataInputBuf.size, flags, Callback, user_data))
                        data_write = data_next = true;
                    else if (!this.DataEditingTakeFocus && !ImGui.IsItemActive())
                        this.DataEditingAddr = data_editing_addr_next = -1;
                    this.DataEditingTakeFocus = false;
                    ImGui.PopItemWidth();
                    if (user_data.CursorPos >= 2)
                        data_write = data_next = true;
                    if (data_editing_addr_next !== -1)
                        data_write = data_next = false;
                    // int data_input_value;
                    // if (data_write && sscanf(DataInputBuf, "%X", &data_input_value) === 1)
                    if (data_write) {
                        let data_input_value = MemoryEditor.sscanf_PRISizeT(this.DataInputBuf.buffer);
                        if (this.WriteFn)
                            // WriteFn(mem_data, addr, (u8)data_input_value);
                            this.WriteFn(mem_data, addr, data_input_value);
                        else
                            // mem_data[addr] = (u8)data_input_value;
                            new Uint8Array(mem_data)[addr] = data_input_value;
                    }
                    ImGui.PopID();
                }
                else {
                    // NB: The trailing space is not visible but ensure there's no gap that the mouse cannot click on.
                    // u8 b = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                    const b = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];
                    if (this.OptShowHexII) {
                        if ((b >= 32 && b < 128))
                            // ImGui.Text(".%c ", b);
                            ImGui.Text(`.${String.fromCharCode(b)} `);
                        else if (b === 0xFF && this.OptGreyOutZeroes)
                            ImGui.TextDisabled("## ");
                        else if (b === 0x00)
                            ImGui.Text("   ");
                        else
                            // ImGui.Text("%02X ", b);
                            // ImGui.Text(`${("00" + b.toString(16).toUpperCase()).substr(-2)} `);
                            ImGui.Text(`${MemoryEditor.sprintf_PRISizeT(b, 2)} `);
                    }
                    else {
                        if (b === 0 && this.OptGreyOutZeroes)
                            ImGui.TextDisabled("00 ");
                        else
                            // ImGui.Text("%02X ", b);
                            // ImGui.Text(`${("00" + b.toString(16).toUpperCase()).substr(-2)} `);
                            ImGui.Text(`${MemoryEditor.sprintf_PRISizeT(b, 2)} `);
                    }
                    if (!this.ReadOnly && ImGui.IsItemHovered() && ImGui.IsMouseClicked(0)) {
                        this.DataEditingTakeFocus = true;
                        data_editing_addr_next = addr;
                    }
                }
            }
            if (this.OptShowAscii) {
                // Draw ASCII values
                ImGui.SameLine(s.PosAsciiStart);
                const pos = ImGui.GetCursorScreenPos();
                addr = line_i * this.Rows;
                ImGui.PushID(line_i);
                if (ImGui.InvisibleButton("ascii", new imgui_2.ImVec2(s.PosAsciiEnd - s.PosAsciiStart, s.LineHeight))) {
                    this.DataEditingAddr = addr + ((ImGui.GetIO().MousePos.x - pos.x) / s.GlyphWidth);
                    this.DataEditingTakeFocus = true;
                }
                ImGui.PopID();
                for (let n = 0; n < this.Rows && addr < mem_size; n++, addr++) {
                    if (addr === this.DataEditingAddr) {
                        draw_list.AddRectFilled(pos, new imgui_2.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(7 /* FrameBg */));
                        draw_list.AddRectFilled(pos, new imgui_2.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(40 /* TextSelectedBg */));
                    }
                    // unsigned char c = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                    const c = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];
                    // char display_c = (c < 32 || c >= 128) ? '.' : c;
                    const display_c = (c < 32 || c >= 128) ? "." : String.fromCharCode(c);
                    // draw_list->AddText(pos, (display_c === '.') ? color_disabled : color_text, &display_c, &display_c + 1);
                    draw_list.AddText(pos, (display_c === ".") ? color_disabled : color_text, display_c);
                    pos.x += s.GlyphWidth;
                }
            }
        }
        clipper.End();
        clipper.delete();
        ImGui.PopStyleVar(2);
        ImGui.EndChild();
        if (data_next && this.DataEditingAddr < mem_size) {
            this.DataEditingAddr = this.DataEditingAddr + 1;
            this.DataEditingTakeFocus = true;
        }
        else if (data_editing_addr_next !== -1) {
            this.DataEditingAddr = data_editing_addr_next;
        }
        ImGui.Separator();
        // Options menu
        if (ImGui.Button("Options"))
            ImGui.OpenPopup("context");
        if (ImGui.BeginPopup("context")) {
            ImGui.PushItemWidth(56);
            // if (ImGui.DragInt("##rows", &Rows, 0.2f, 4, 32, "%.0f rows")) ContentsWidthChanged = true;
            if (ImGui.DragInt("##rows", (_ = this.Rows) => this.Rows = _, 0.2, 4, 32, "%.0f rows"))
                this.ContentsWidthChanged = true;
            ImGui.PopItemWidth();
            // ImGui.Checkbox("Show HexII", &OptShowHexII);
            ImGui.Checkbox("Show HexII", (_ = this.OptShowHexII) => this.OptShowHexII = _);
            // if (ImGui.Checkbox("Show Ascii", &this.OptShowAscii)) ContentsWidthChanged = true;
            if (ImGui.Checkbox("Show Ascii", (_ = this.OptShowAscii) => this.OptShowAscii = _))
                this.ContentsWidthChanged = true;
            // ImGui.Checkbox("Grey out zeroes", &OptGreyOutZeroes);
            ImGui.Checkbox("Grey out zeroes", (_ = this.OptGreyOutZeroes) => this.OptGreyOutZeroes = _);
            ImGui.EndPopup();
        }
        ImGui.SameLine();
        // ImGui.Text("Range %0*" _PRISizeT "..%0*" _PRISizeT, s.AddrDigitsCount, base_display_addr, s.AddrDigitsCount, base_display_addr + mem_size - 1);
        ImGui.Text(`Range ${MemoryEditor.sprintf_PRISizeT(base_display_addr, s.AddrDigitsCount)}..${MemoryEditor.sprintf_PRISizeT(base_display_addr + mem_size - 1, s.AddrDigitsCount)}`);
        ImGui.SameLine();
        ImGui.PushItemWidth((s.AddrDigitsCount + 1) * s.GlyphWidth + style.FramePadding.x * 2.0);
        // if (ImGui.InputText("##addr", AddrInputBuf, 32, ImGuiInputTextFlags_CharsHexadecimal | ImGuiInputTextFlags_EnterReturnsTrue))
        if (ImGui.InputText("##addr", this.AddrInputBuf, this.AddrInputBuf.size, 2 /* CharsHexadecimal */ | 32 /* EnterReturnsTrue */)) {
            // size_t goto_addr;
            const goto_addr = MemoryEditor.sscanf_PRISizeT(this.AddrInputBuf.buffer);
            console.log("goto_addr", goto_addr.toString(16));
            // if (sscanf(AddrInputBuf, "%" _PRISizeT, &goto_addr) === 1)
            // {
            this.GotoAddr = goto_addr - base_display_addr;
            this.HighlightMin = this.HighlightMax = -1;
            // }
        }
        ImGui.PopItemWidth();
        if (this.GotoAddr !== -1) {
            if (this.GotoAddr < mem_size) {
                ImGui.BeginChild("##scrolling");
                ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + (this.GotoAddr / this.Rows) * ImGui.GetTextLineHeight());
                ImGui.EndChild();
                this.DataEditingAddr = this.GotoAddr;
                this.DataEditingTakeFocus = true;
            }
            this.GotoAddr = -1;
        }
        // Notify the main window of our ideal child content size (FIXME: we are missing an API to get the contents size from the child)
        ImGui.SetCursorPosX(s.WindowWidth);
    }
}
exports.MemoryEditor = MemoryEditor;
(function (MemoryEditor) {
    class Sizes {
        constructor() {
            this.AddrDigitsCount = 0;
            this.LineHeight = 0.0;
            this.GlyphWidth = 0.0;
            this.HexCellWidth = 0.0;
            this.SpacingBetweenMidRows = 0.0;
            this.PosHexStart = 0.0;
            this.PosHexEnd = 0.0;
            this.PosAsciiStart = 0.0;
            this.PosAsciiEnd = 0.0;
            this.WindowWidth = 0.0;
        }
    }
    MemoryEditor.Sizes = Sizes;
})(MemoryEditor = exports.MemoryEditor || (exports.MemoryEditor = {}));
// #undef _PRISizeT
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfbWVtb3J5X2VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX21lbW9yeV9lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtFQUFrRTtBQUNsRSxzRUFBc0U7QUFDdEUsaUVBQWlFO0FBQ2pFLEVBQUU7QUFDRiw0REFBNEQ7QUFDNUQseUtBQXlLO0FBQ3pLLEVBQUU7QUFDRixTQUFTO0FBQ1QsNkdBQTZHO0FBQzdHLDRLQUE0SztBQUM1SyxFQUFFO0FBQ0YsU0FBUztBQUNULG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsZ0VBQWdFO0FBQ2hFLGlCQUFpQjtBQUNqQixFQUFFO0FBQ0YsYUFBYTtBQUNiLDJCQUEyQjtBQUMzQiw4R0FBOEc7QUFDOUcsNEVBQTRFO0FBQzVFLHNIQUFzSDtBQUN0SCw2SEFBNkg7QUFDN0gsMkRBQTJEO0FBQzNELG9HQUFvRztBQUNwRywrRUFBK0U7QUFDL0UseUlBQXlJO0FBQ3pJLDhJQUE4STtBQUM5SSwyTEFBMkw7QUFDM0wsMEhBQTBIO0FBQzFILGdHQUFnRztBQUNoRyxxREFBcUQ7QUFDckQsRUFBRTtBQUNGLGFBQWE7QUFDYiw4SUFBOEk7O0FBRTlJLGVBQWU7QUFDZix3Q0FBd0M7QUFFeEMsaUNBQWlDO0FBSWpDLG1DQUF5QztBQUV6QyxtQ0FBaUM7QUFFakMsbUNBQTJDO0FBSTNDO0lBQUE7UUFFSSw0QkFBNEI7UUFFNUIsV0FBVztRQUNYLG1KQUFtSjtRQUM1SSxTQUFJLEdBQVksS0FBSyxDQUFDO1FBQzdCLDRHQUE0RztRQUNyRyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHlFQUF5RTtRQUNsRSxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLHlFQUF5RTtRQUNsRSxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUNwQyx5RUFBeUU7UUFDbEUsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDckMseUVBQXlFO1FBQ2xFLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUN4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