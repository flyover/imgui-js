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
System.register(["imgui-js"], function (exports_1, context_1) {
    "use strict";
    var ImGui, imgui_js_1, imgui_js_2, imgui_js_3, imgui_js_4, imgui_js_5, imgui_js_6, MemoryEditor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
                imgui_js_1 = ImGui_1;
                imgui_js_2 = ImGui_1;
                imgui_js_3 = ImGui_1;
                imgui_js_4 = ImGui_1;
                imgui_js_5 = ImGui_1;
                imgui_js_6 = ImGui_1;
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
                    this.DataInputBuf = new imgui_js_4.ImStringBuffer(32, "");
                    // char            AddrInputBuf[32];
                    this.AddrInputBuf = new imgui_js_4.ImStringBuffer(32, "");
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
                    ImGui.SetNextWindowSizeConstraints(new imgui_js_5.ImVec2(0.0, 0.0), new imgui_js_5.ImVec2(s.WindowWidth, Number.MAX_VALUE));
                    // this.Open = true;
                    // if (ImGui.Begin(title, &Open, ImGuiWindowFlags_NoScrollbar))
                    if (ImGui.Begin(title, (value = this.Open) => this.Open = value, imgui_js_2.ImGuiWindowFlags.NoScrollbar)) {
                        if (ImGui.IsWindowHovered(imgui_js_3.ImGuiHoveredFlags.RootAndChildWindows) && ImGui.IsMouseClicked(1))
                            ImGui.OpenPopup("context");
                        this.DrawContents(mem_data, mem_size, base_display_addr);
                        if (this.ContentsWidthChanged) {
                            this.CalcSizes(s, mem_size, base_display_addr);
                            ImGui.SetWindowSize(new imgui_js_5.ImVec2(s.WindowWidth, ImGui.GetWindowSize().y));
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
                    ImGui.BeginChild("##scrolling", new imgui_js_5.ImVec2(0, -footer_height_to_reserve));
                    const draw_list = ImGui.GetWindowDrawList();
                    ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new imgui_js_5.ImVec2(0, 0));
                    ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new imgui_js_5.ImVec2(0, 0));
                    const line_total_count = 0 | ((mem_size + this.Rows - 1) / this.Rows);
                    const clipper = new imgui_js_6.ImGuiListClipper(line_total_count, s.LineHeight);
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
                        draw_list.AddLine(new imgui_js_5.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y), new imgui_js_5.ImVec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y + 9999), ImGui.GetColorU32(imgui_js_1.ImGuiCol.Border));
                    const color_text = ImGui.GetColorU32(imgui_js_1.ImGuiCol.Text);
                    const color_disabled = this.OptGreyOutZeroes ? ImGui.GetColorU32(imgui_js_1.ImGuiCol.TextDisabled) : color_text;
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
                                draw_list.AddRectFilled(pos, new imgui_js_5.ImVec2(pos.x + highlight_width, pos.y + s.LineHeight), this.HighlightColor);
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
                            if (ImGui.InvisibleButton("ascii", new imgui_js_5.ImVec2(s.PosAsciiEnd - s.PosAsciiStart, s.LineHeight))) {
                                this.DataEditingAddr = addr + ((ImGui.GetIO().MousePos.x - pos.x) / s.GlyphWidth);
                                this.DataEditingTakeFocus = true;
                            }
                            ImGui.PopID();
                            for (let n = 0; n < this.Rows && addr < mem_size; n++, addr++) {
                                if (addr === this.DataEditingAddr) {
                                    draw_list.AddRectFilled(pos, new imgui_js_5.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(imgui_js_1.ImGuiCol.FrameBg));
                                    draw_list.AddRectFilled(pos, new imgui_js_5.ImVec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(imgui_js_1.ImGuiCol.TextSelectedBg));
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
                        if (ImGui.DragInt("##rows", (_ = this.Rows) => this.Rows = _, 0.2, 4, 32, "%d rows"))
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
//# sourceMappingURL=imgui_memory_editor.js.map