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
System.register(["./imgui"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ImGui, imgui_1, imgui_2, imgui_3, imgui_4, imgui_5, imgui_6, MemoryEditor;
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
                imgui_1 = ImGui_1;
                imgui_2 = ImGui_1;
                imgui_3 = ImGui_1;
                imgui_4 = ImGui_1;
                imgui_5 = ImGui_1;
                imgui_6 = ImGui_1;
            }
        ],
        execute: function () {
            MemoryEditor = class MemoryEditor {
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
                    this.DataInputBuf = new imgui_4.ImStringBuffer(32, "");
                    // char            AddrInputBuf[32];
                    this.AddrInputBuf = new imgui_4.ImStringBuffer(32, "");
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
                    ImGui.SetNextWindowSizeConstraints(new imgui_5.ImVec2(0.0, 0.0), new imgui_5.ImVec2(s.WindowWidth, Number.MAX_VALUE));
                    // this.Open = true;
                    // if (ImGui.Begin(title, &Open, ImGuiWindowFlags_NoScrollbar))
                    if (ImGui.Begin(title, (value = this.Open) => this.Open = value, imgui_2.ImGuiWindowFlags.NoScrollbar)) {
                        if (ImGui.IsWindowHovered(imgui_3.ImGuiHoveredFlags.RootAndChildWindows) && ImGui.IsMouseClicked(1))
                            ImGui.OpenPopup("context");
                        this.DrawContents(mem_data, mem_size, base_display_addr);
                        if (this.ContentsWidthChanged) {
                            this.CalcSizes(s, mem_size, base_display_addr);
                            ImGui.SetWindowSize(new imgui_5.ImVec2(s.WindowWidth, ImGui.GetWindowSize().y));
                        }
                    }
                    ImGui.End();
                }
                // Memory Editor contents only
                DrawContents(mem_data, mem_size = mem_data.byteLength, base_display_addr = 0x0000) {
                    const s = new MemoryEditor.Sizes();
                    this.CalcSizes(s, mem_size, base_display_addr);
                    const style = ImGui.GetStyle();
                    const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
                    ImGui.BeginChild("##scrolling", new imgui_5.ImVec2(0, -footer_height_to_reserve));
                    const draw_list = ImGui.GetWindowDrawList();
                    ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new imgui_5.ImVec2(0, 0));
                    ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new imgui_5.ImVec2(0, 0));
                    const line_total_count = 0 | ((mem_size + this.Rows - 1) / this.Rows);
                    const clipper = new imgui_6.ImGuiListClipper(line_total_count, s.LineHeight);
                    const visible_start_addr = clipper.DisplayStart * this.Rows;
                    const visible_end_addr = clipper.DisplayEnd * this.Rows;
                    let data_next = false;
                    if (this.ReadOnly || this.DataEditingAddr >= mem_size)
                        this.DataEditingAddr = -1;
                    const data_editing_addr_backup = this.DataEditingAddr;
                    let data_editing_addr_next = -1;
                    if (this.DataEditingAddr !== -1) {
                        // Move cursor but only apply on next frame so scrolling with be synchronized (because currently we can't change the scrolling while the window is being rendered)
                        if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.UpArrow)) && this.DataEditingAddr >= this.Rows) {
                            data_editing_addr_next = this.DataEditingAddr - this.Rows;
                            this.DataEditingTakeFocus = true;
                        }
                        else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.DownArrow)) && this.DataEditingAddr < mem_size - this.Rows) {
                            data_editing_addr_next = this.DataEditingAddr + this.Rows;
                            this.DataEditingTakeFocus = true;
                        }
                        else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.LeftArrow)) && this.DataEditingAddr > 0) {
                            data_editing_addr_next = this.DataEditingAddr - 1;
                            this.DataEditingTakeFocus = true;
                        }
                        else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.RightArrow)) && this.DataEditingAddr < mem_size - 1) {
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
                        draw_list.AddLine(new imgui_5.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y), new imgui_5.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y + 9999), ImGui.GetColorU32(imgui_1.ImGuiCol.Border));
                    const color_text = ImGui.GetColorU32(imgui_1.ImGuiCol.Text);
                    const color_disabled = this.OptGreyOutZeroes ? ImGui.GetColorU32(imgui_1.ImGuiCol.TextDisabled) : color_text;
                    for (let line_i = clipper.DisplayStart; line_i < clipper.DisplayEnd; line_i++) // display only visible lines
                     {
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
                                draw_list.AddRectFilled(pos, new imgui_5.ImVec2(pos.x + highlight_width, pos.y + s.LineHeight), this.HighlightColor);
                            }
                            if (this.DataEditingAddr === addr) {
                                // Display text input on current byte
                                let data_write = false;
                                ImGui.PushID(addr);
                                // sprintf(AddrInputBuf, "%0*" _PRISizeT, s.AddrDigitsCount, base_display_addr + addr);
                                this.AddrInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(base_display_addr + addr, s.AddrDigitsCount);
                                // sprintf(DataInputBuf, "%02X", ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                                this.DataInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr], 2);
                                if (this.DataEditingTakeFocus) {
                                    ImGui.SetKeyboardFocusHere();
                                    ImGui.CaptureKeyboardFromApp(true);
                                    // sprintf(AddrInputBuf, "%0*" _PRISizeT, s.AddrDigitsCount, base_display_addr + addr);
                                    // this.AddrInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(base_display_addr + addr, s.AddrDigitsCount);
                                    // sprintf(DataInputBuf, "%02X", ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                                    // this.DataInputBuf.buffer = MemoryEditor.sprintf_PRISizeT(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr], 2);
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
                                function UserData_Callback(data) {
                                    const user_data = data.UserData;
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
                                const flags = ImGui.InputTextFlags.CharsHexadecimal | ImGui.InputTextFlags.EnterReturnsTrue | ImGui.InputTextFlags.AutoSelectAll | ImGui.InputTextFlags.NoHorizontalScroll | ImGui.InputTextFlags.AlwaysInsertMode | ImGui.InputTextFlags.CallbackAlways;
                                // if (ImGui.InputText("##data", DataInputBuf, 32, flags, UserData::Callback, &user_data))
                                if (ImGui.InputText("##data", this.DataInputBuf, this.DataInputBuf.size, flags, UserData_Callback, user_data))
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
                            if (ImGui.InvisibleButton("ascii", new imgui_5.ImVec2(s.PosAsciiEnd - s.PosAsciiStart, s.LineHeight))) {
                                this.DataEditingAddr = addr + ((ImGui.GetIO().MousePos.x - pos.x) / s.GlyphWidth);
                                this.DataEditingTakeFocus = true;
                            }
                            ImGui.PopID();
                            for (let n = 0; n < this.Rows && addr < mem_size; n++, addr++) {
                                if (addr === this.DataEditingAddr) {
                                    draw_list.AddRectFilled(pos, new imgui_5.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(imgui_1.ImGuiCol.FrameBg));
                                    draw_list.AddRectFilled(pos, new imgui_5.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(imgui_1.ImGuiCol.TextSelectedBg));
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
                    if (ImGui.InputText("##addr", this.AddrInputBuf, this.AddrInputBuf.size, ImGui.InputTextFlags.CharsHexadecimal | ImGui.InputTextFlags.EnterReturnsTrue)) {
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
            };
            exports_1("MemoryEditor", MemoryEditor);
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
            })(MemoryEditor || (MemoryEditor = {}));
            exports_1("MemoryEditor", MemoryEditor);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfbWVtb3J5X2VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX21lbW9yeV9lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0VBQWtFO0FBQ2xFLHNFQUFzRTtBQUN0RSxpRUFBaUU7QUFDakUsRUFBRTtBQUNGLDREQUE0RDtBQUM1RCx5S0FBeUs7QUFDekssRUFBRTtBQUNGLFNBQVM7QUFDVCw2R0FBNkc7QUFDN0csNEtBQTRLO0FBQzVLLEVBQUU7QUFDRixTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDLDRCQUE0QjtBQUM1QixnRUFBZ0U7QUFDaEUsaUJBQWlCO0FBQ2pCLEVBQUU7QUFDRixhQUFhO0FBQ2IsMkJBQTJCO0FBQzNCLDhHQUE4RztBQUM5Ryw0RUFBNEU7QUFDNUUsc0hBQXNIO0FBQ3RILDZIQUE2SDtBQUM3SCwyREFBMkQ7QUFDM0Qsb0dBQW9HO0FBQ3BHLCtFQUErRTtBQUMvRSx5SUFBeUk7QUFDekksOElBQThJO0FBQzlJLDJMQUEyTDtBQUMzTCwwSEFBMEg7QUFDMUgsZ0dBQWdHO0FBQ2hHLHFEQUFxRDtBQUNyRCxFQUFFO0FBQ0YsYUFBYTtBQUNiLDhJQUE4STs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUI5SSxlQUFBO2dCQUFBO29CQUVJLDRCQUE0QjtvQkFFNUIsV0FBVztvQkFDWCxtSkFBbUo7b0JBQzVJLFNBQUksR0FBWSxLQUFLLENBQUM7b0JBQzdCLDRHQUE0RztvQkFDckcsYUFBUSxHQUFZLEtBQUssQ0FBQztvQkFDakMseUVBQXlFO29CQUNsRSxTQUFJLEdBQVcsRUFBRSxDQUFDO29CQUN6Qix5RUFBeUU7b0JBQ2xFLGlCQUFZLEdBQVksSUFBSSxDQUFDO29CQUNwQyx5RUFBeUU7b0JBQ2xFLGlCQUFZLEdBQVksS0FBSyxDQUFDO29CQUNyQyx5RUFBeUU7b0JBQ2xFLHFCQUFnQixHQUFZLElBQUksQ0FBQztvQkFDeEMsa0lBQWtJO29CQUMzSCxvQkFBZSxHQUFXLENBQUMsQ0FBQztv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