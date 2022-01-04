(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('imgui-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'imgui-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ImGui_Memory_Editor = {}, global.ImGui));
})(this, (function (exports, ImGui) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var ImGui__namespace = /*#__PURE__*/_interopNamespace(ImGui);

    // Mini memory editor for Dear ImGui (to embed in your game/tools)
    // #include <stdio.h>      // sprintf, scanf
    // #include <stdint.h>     // uint8_t, etc.
    // #ifdef _MSC_VER
    // #define _PRISizeT   "I"
    // #define ImSnprintf  _snprintf
    // #else
    // #define _PRISizeT   "z"
    // #define ImSnprintf  snprintf
    // #endif
    // #ifdef _MSC_VER
    // #pragma warning (push)
    // #pragma warning (disable: 4996) // warning C4996: 'sprintf': This function or variable may be unsafe.
    // #endif
    class MemoryEditor {
        constructor() {
            this.DataInputBuf = new ImGui__namespace.StringBuffer(32); /*char[32]*/
            this.AddrInputBuf = new ImGui__namespace.StringBuffer(32); /*char[32]*/
            // Settings
            this.Open = true;
            this.ReadOnly = false;
            this.Cols = 16;
            this.OptShowOptions = true;
            this.OptShowDataPreview = false;
            this.OptShowHexII = false;
            this.OptShowAscii = true;
            this.OptGreyOutZeroes = true;
            this.OptUpperCaseHex = true;
            this.OptMidColsCount = 8;
            this.OptAddrDigitsCount = 0;
            this.HighlightColor = ImGui__namespace.COL32(255, 255, 255, 50);
            this.ReadFn = null;
            this.WriteFn = null;
            this.HighlightFn = null;
            // State/Internals
            this.ContentsWidthChanged = false;
            this.DataPreviewAddr = this.DataEditingAddr = -1;
            this.DataEditingTakeFocus = false;
            this.DataInputBuf.buffer = ""; // memset(DataInputBuf, 0, sizeof(DataInputBuf));
            this.AddrInputBuf.buffer = ""; // memset(AddrInputBuf, 0, sizeof(AddrInputBuf));
            this.GotoAddr = -1;
            this.HighlightMin = this.HighlightMax = -1;
            this.PreviewEndianess = 0;
            this.PreviewDataType = ImGui__namespace.DataType.S32;
        }
        ;
        ;
        GotoAddrAndHighlight(addr_min, addr_max) {
            this.GotoAddr = addr_min;
            this.HighlightMin = addr_min;
            this.HighlightMax = addr_max;
        }
        CalcSizes(s, mem_size, base_display_addr) {
            const style = ImGui__namespace.GetStyle();
            s.AddrDigitsCount = this.OptAddrDigitsCount;
            if (s.AddrDigitsCount === 0)
                for (let /*size_t*/ n = base_display_addr + mem_size - 1; n > 0; n >>= 4)
                    s.AddrDigitsCount++;
            s.LineHeight = ImGui__namespace.GetTextLineHeight();
            s.GlyphWidth = ImGui__namespace.CalcTextSize("F").x + 1; // We assume the font is mono-space
            s.HexCellWidth = Math.floor /*(float)(int)*/(s.GlyphWidth * 2.5); // "FF " we include trailing space in the width to easily catch clicks everywhere
            s.SpacingBetweenMidCols = Math.floor /*(float)(int)*/(s.HexCellWidth * 0.25); // Every OptMidColsCount columns we add a bit of extra spacing
            s.PosHexStart = (s.AddrDigitsCount + 2) * s.GlyphWidth;
            s.PosHexEnd = s.PosHexStart + (s.HexCellWidth * this.Cols);
            s.PosAsciiStart = s.PosAsciiEnd = s.PosHexEnd;
            if (this.OptShowAscii) {
                s.PosAsciiStart = s.PosHexEnd + s.GlyphWidth * 1;
                if (this.OptMidColsCount > 0)
                    s.PosAsciiStart += /*(float)*/ ((this.Cols + this.OptMidColsCount - 1) / this.OptMidColsCount) * s.SpacingBetweenMidCols;
                s.PosAsciiEnd = s.PosAsciiStart + this.Cols * s.GlyphWidth;
            }
            s.WindowWidth = s.PosAsciiEnd + style.ScrollbarSize + style.WindowPadding.x * 2 + s.GlyphWidth;
        }
        // Standalone Memory Editor window
        DrawWindow(title, mem_data, mem_size = mem_data.byteLength, base_display_addr = 0x0000) {
            const s = new MemoryEditor.Sizes();
            this.CalcSizes(s, mem_size, base_display_addr);
            ImGui__namespace.SetNextWindowSizeConstraints(new ImGui__namespace.Vec2(0.0, 0.0), new ImGui__namespace.Vec2(s.WindowWidth, Number.MAX_VALUE));
            this.Open = true;
            if (ImGui__namespace.Begin(title, (_ = this.Open) => this.Open = _, ImGui__namespace.WindowFlags.NoScrollbar)) {
                if (ImGui__namespace.IsWindowHovered(ImGui__namespace.HoveredFlags.RootAndChildWindows) && ImGui__namespace.IsMouseReleased(ImGui__namespace.MouseButton.Right))
                    ImGui__namespace.OpenPopup("context");
                this.DrawContents(mem_data, mem_size, base_display_addr);
                if (this.ContentsWidthChanged) {
                    this.CalcSizes(s, mem_size, base_display_addr);
                    ImGui__namespace.SetWindowSize(new ImGui__namespace.Vec2(s.WindowWidth, ImGui__namespace.GetWindowSize().y));
                }
            }
            ImGui__namespace.End();
        }
        // Memory Editor contents only
        // void DrawContents(void* mem_data_void, size_t mem_size, size_t base_display_addr = 0x0000)
        DrawContents(mem_data, mem_size = mem_data.byteLength, base_display_addr = 0x0000) {
            if (this.Cols < 1)
                this.Cols = 1;
            // ImU8* mem_data = (ImU8*)mem_data_void;
            const s = new MemoryEditor.Sizes();
            this.CalcSizes(s, mem_size, base_display_addr);
            const style = ImGui__namespace.GetStyle();
            // We begin into our scrolling region with the 'ImGui.WindowFlags.NoMove' in order to prevent click from moving the window.
            // This is used as a facility since our main click detection code doesn't assign an ActiveId so the click would normally be caught as a window-move.
            const height_separator = style.ItemSpacing.y;
            let footer_height = 0;
            if (this.OptShowOptions)
                footer_height += height_separator + ImGui__namespace.GetFrameHeightWithSpacing() * 1;
            if (this.OptShowDataPreview)
                footer_height += height_separator + ImGui__namespace.GetFrameHeightWithSpacing() * 1 + ImGui__namespace.GetTextLineHeightWithSpacing() * 3;
            ImGui__namespace.BeginChild("##scrolling", new ImGui__namespace.Vec2(0, -footer_height), false, ImGui__namespace.WindowFlags.NoMove | ImGui__namespace.WindowFlags.NoNav);
            const draw_list = ImGui__namespace.GetWindowDrawList();
            ImGui__namespace.PushStyleVar(ImGui__namespace.StyleVar.FramePadding, new ImGui__namespace.Vec2(0, 0));
            ImGui__namespace.PushStyleVar(ImGui__namespace.StyleVar.ItemSpacing, new ImGui__namespace.Vec2(0, 0));
            // We are not really using the clipper API correctly here, because we rely on visible_start_addr/visible_end_addr for our scrolling function.
            const line_total_count = 0 | /*(int)*/ ((mem_size + this.Cols - 1) / this.Cols);
            // ImGuiListClipper clipper;
            const clipper = new ImGui__namespace.ListClipper();
            clipper.Begin(line_total_count, s.LineHeight);
            clipper.Step();
            const visible_start_addr = clipper.DisplayStart * this.Cols;
            const visible_end_addr = clipper.DisplayEnd * this.Cols;
            let data_next = false;
            if (this.ReadOnly || this.DataEditingAddr >= mem_size)
                this.DataEditingAddr = -1;
            if (this.DataPreviewAddr >= mem_size)
                this.DataPreviewAddr = -1;
            const preview_data_type_size = this.OptShowDataPreview ? this.DataTypeGetSize(this.PreviewDataType) : 0;
            let data_editing_addr_backup = this.DataEditingAddr;
            let data_editing_addr_next = -1;
            if (this.DataEditingAddr !== -1) {
                // Move cursor but only apply on next frame so scrolling with be synchronized (because currently we can't change the scrolling while the window is being rendered)
                if (ImGui__namespace.IsKeyPressed(ImGui__namespace.GetKeyIndex(ImGui__namespace.Key.UpArrow)) && this.DataEditingAddr >= this.Cols) {
                    data_editing_addr_next = this.DataEditingAddr - this.Cols;
                    this.DataEditingTakeFocus = true;
                }
                else if (ImGui__namespace.IsKeyPressed(ImGui__namespace.GetKeyIndex(ImGui__namespace.Key.DownArrow)) && this.DataEditingAddr < mem_size - this.Cols) {
                    data_editing_addr_next = this.DataEditingAddr + this.Cols;
                    this.DataEditingTakeFocus = true;
                }
                else if (ImGui__namespace.IsKeyPressed(ImGui__namespace.GetKeyIndex(ImGui__namespace.Key.LeftArrow)) && this.DataEditingAddr > 0) {
                    data_editing_addr_next = this.DataEditingAddr - 1;
                    this.DataEditingTakeFocus = true;
                }
                else if (ImGui__namespace.IsKeyPressed(ImGui__namespace.GetKeyIndex(ImGui__namespace.Key.RightArrow)) && this.DataEditingAddr < mem_size - 1) {
                    data_editing_addr_next = this.DataEditingAddr + 1;
                    this.DataEditingTakeFocus = true;
                }
            }
            if (data_editing_addr_next !== -1 && (data_editing_addr_next / this.Cols) !== (data_editing_addr_backup / this.Cols)) {
                // Track cursor movements
                const scroll_offset = ( /*(int)*/(data_editing_addr_next / this.Cols) - /*(int)*/ (data_editing_addr_backup / this.Cols));
                const scroll_desired = (scroll_offset < 0 && data_editing_addr_next < visible_start_addr + this.Cols * 2) || (scroll_offset > 0 && data_editing_addr_next > visible_end_addr - this.Cols * 2);
                if (scroll_desired)
                    ImGui__namespace.SetScrollY(ImGui__namespace.GetScrollY() + scroll_offset * s.LineHeight);
            }
            // Draw vertical separator
            const window_pos = ImGui__namespace.GetWindowPos();
            if (this.OptShowAscii)
                draw_list.AddLine(new ImGui__namespace.Vec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y), new ImGui__namespace.Vec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y + 9999), ImGui__namespace.GetColorU32(ImGui__namespace.Col.Border));
            const color_text = ImGui__namespace.GetColorU32(ImGui__namespace.Col.Text);
            const color_disabled = this.OptGreyOutZeroes ? ImGui__namespace.GetColorU32(ImGui__namespace.Col.TextDisabled) : color_text;
            // const char* format_address = this.OptUpperCaseHex ? "%0*" _PRISizeT "X: " : "%0*" _PRISizeT "x: ";
            const format_address = (n, a) => {
                let s = a.toString(16).padStart(n, "0");
                if (this.OptUpperCaseHex) {
                    s = s.toUpperCase();
                }
                return s;
            };
            // const char* format_data = this.OptUpperCaseHex ? "%0*" _PRISizeT "X" : "%0*" _PRISizeT "x";
            const format_data = (n, a) => {
                let s = a.toString(16).padStart(n, "0");
                if (this.OptUpperCaseHex) {
                    s = s.toUpperCase();
                }
                return s;
            };
            // const char* format_byte = this.OptUpperCaseHex ? "%02X" : "%02x";
            const format_byte = (b) => {
                let s = b.toString(16).padStart(2, "0");
                if (this.OptUpperCaseHex) {
                    s = s.toUpperCase();
                }
                return s;
            };
            // const char* format_byte_space = this.OptUpperCaseHex ? "%02X " : "%02x ";
            const format_byte_space = (b) => {
                return `${format_byte(b)} `;
            };
            for (let /*int*/ line_i = clipper.DisplayStart; line_i < clipper.DisplayEnd; line_i++) // display only visible lines
             {
                let addr = (line_i * this.Cols);
                // ImGui.Text(format_address, s.AddrDigitsCount, base_display_addr + addr);
                ImGui__namespace.Text(format_address(s.AddrDigitsCount, base_display_addr + addr));
                // Draw Hexadecimal
                for (let /*int*/ n = 0; n < this.Cols && addr < mem_size; n++, addr++) {
                    let byte_pos_x = s.PosHexStart + s.HexCellWidth * n;
                    if (this.OptMidColsCount > 0)
                        byte_pos_x += /*(float)*/ (n / this.OptMidColsCount) * s.SpacingBetweenMidCols;
                    ImGui__namespace.SameLine(byte_pos_x);
                    // Draw highlight
                    const is_highlight_from_user_range = (addr >= this.HighlightMin && addr < this.HighlightMax);
                    const is_highlight_from_user_func = (this.HighlightFn !== null && this.HighlightFn(mem_data, addr));
                    const is_highlight_from_preview = (addr >= this.DataPreviewAddr && addr < this.DataPreviewAddr + preview_data_type_size);
                    if (is_highlight_from_user_range || is_highlight_from_user_func || is_highlight_from_preview) {
                        const pos = ImGui__namespace.GetCursorScreenPos();
                        let highlight_width = s.GlyphWidth * 2;
                        const is_next_byte_highlighted = (addr + 1 < mem_size) && ((this.HighlightMax !== -1 && addr + 1 < this.HighlightMax) || (this.HighlightFn !== null && this.HighlightFn(mem_data, addr + 1)));
                        if (is_next_byte_highlighted || (n + 1 === this.Cols)) {
                            highlight_width = s.HexCellWidth;
                            if (this.OptMidColsCount > 0 && n > 0 && (n + 1) < this.Cols && ((n + 1) % this.OptMidColsCount) === 0)
                                highlight_width += s.SpacingBetweenMidCols;
                        }
                        draw_list.AddRectFilled(pos, new ImGui__namespace.Vec2(pos.x + highlight_width, pos.y + s.LineHeight), this.HighlightColor);
                    }
                    if (this.DataEditingAddr === addr) {
                        // Display text input on current byte
                        let data_write = false;
                        ImGui__namespace.PushID(/*(void*)*/ addr);
                        if (this.DataEditingTakeFocus) {
                            ImGui__namespace.SetKeyboardFocusHere();
                            ImGui__namespace.CaptureKeyboardFromApp(true);
                            // sprintf(AddrInputBuf, format_data, s.AddrDigitsCount, base_display_addr + addr);
                            this.AddrInputBuf.buffer = format_data(s.AddrDigitsCount, base_display_addr + addr);
                            // sprintf(DataInputBuf, format_byte, ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                            this.DataInputBuf.buffer = format_byte(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr]);
                        }
                        ImGui__namespace.PushItemWidth(s.GlyphWidth * 2);
                        class UserData {
                            constructor() {
                                this.CurrentBufOverwrite = new ImGui__namespace.StringBuffer(3); // Input
                                this.CursorPos = 0; // Output
                            }
                            // FIXME: We should have a way to retrieve the text edit cursor position more easily in the API, this is rather tedious. This is such a ugly mess we may be better off not using InputText() at all here.
                            static Callback(data) {
                                const user_data = data.UserData;
                                ImGui__namespace.ASSERT(user_data !== null);
                                if (!data.HasSelection())
                                    user_data.CursorPos = data.CursorPos;
                                if (data.SelectionStart === 0 && data.SelectionEnd === data.BufTextLen) {
                                    // When not editing a byte, always rewrite its content (this is a bit tricky, since InputText technically "owns" the master copy of the buffer we edit it in there)
                                    data.DeleteChars(0, data.BufTextLen);
                                    data.InsertChars(0, user_data.CurrentBufOverwrite.buffer);
                                    data.SelectionStart = 0;
                                    data.SelectionEnd = 2;
                                    data.CursorPos = 0;
                                }
                                return 0;
                            }
                        }
                        const user_data = new UserData();
                        user_data.CursorPos = -1;
                        // sprintf(user_data.CurrentBufOverwrite, format_byte, ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                        user_data.CurrentBufOverwrite.buffer = format_byte(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr]);
                        const flags = ImGui__namespace.InputTextFlags.CharsHexadecimal | ImGui__namespace.InputTextFlags.EnterReturnsTrue | ImGui__namespace.InputTextFlags.AutoSelectAll | ImGui__namespace.InputTextFlags.NoHorizontalScroll | ImGui__namespace.InputTextFlags.AlwaysOverwrite | ImGui__namespace.InputTextFlags.CallbackAlways;
                        if (ImGui__namespace.InputText("##data", this.DataInputBuf, 32, flags, UserData.Callback, user_data))
                            data_write = data_next = true;
                        else if (!this.DataEditingTakeFocus && !ImGui__namespace.IsItemActive())
                            this.DataEditingAddr = data_editing_addr_next = -1;
                        this.DataEditingTakeFocus = false;
                        ImGui__namespace.PopItemWidth();
                        if (user_data.CursorPos >= 2)
                            data_write = data_next = true;
                        if (data_editing_addr_next !== -1)
                            data_write = data_next = false;
                        // unsigned int data_input_value = 0;
                        let data_input_value = 0;
                        // if (data_write && sscanf(DataInputBuf, "%X", &data_input_value) === 1)
                        if (data_write && Number.isInteger(data_input_value = parseInt(this.DataInputBuf.buffer, 16))) {
                            if (this.WriteFn)
                                this.WriteFn(mem_data, addr, /*(ImU8)*/ data_input_value);
                            else
                                // mem_data[addr] = (ImU8)data_input_value;
                                new Uint8Array(mem_data)[addr] = data_input_value;
                        }
                        ImGui__namespace.PopID();
                    }
                    else {
                        // NB: The trailing space is not visible but ensure there's no gap that the mouse cannot click on.
                        // ImU8 b = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                        const b = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];
                        if (this.OptShowHexII) {
                            if ((b >= 32 && b < 128))
                                // ImGui.Text(".%c ", b);
                                ImGui__namespace.Text(`.${String.fromCharCode(b)} `);
                            else if (b === 0xFF && this.OptGreyOutZeroes)
                                ImGui__namespace.TextDisabled("## ");
                            else if (b === 0x00)
                                ImGui__namespace.Text("   ");
                            else
                                ImGui__namespace.Text(format_byte_space(b));
                        }
                        else {
                            if (b === 0 && this.OptGreyOutZeroes)
                                ImGui__namespace.TextDisabled("00 ");
                            else
                                ImGui__namespace.Text(format_byte_space(b));
                        }
                        if (!this.ReadOnly && ImGui__namespace.IsItemHovered() && ImGui__namespace.IsMouseClicked(0)) {
                            this.DataEditingTakeFocus = true;
                            data_editing_addr_next = addr;
                        }
                    }
                }
                if (this.OptShowAscii) {
                    // Draw ASCII values
                    ImGui__namespace.SameLine(s.PosAsciiStart);
                    const pos = ImGui__namespace.GetCursorScreenPos();
                    addr = line_i * this.Cols;
                    ImGui__namespace.PushID(line_i);
                    if (ImGui__namespace.InvisibleButton("ascii", new ImGui__namespace.Vec2(s.PosAsciiEnd - s.PosAsciiStart, s.LineHeight))) {
                        this.DataEditingAddr = this.DataPreviewAddr = addr + ((ImGui__namespace.GetIO().MousePos.x - pos.x) / s.GlyphWidth);
                        this.DataEditingTakeFocus = true;
                    }
                    ImGui__namespace.PopID();
                    for (let /*int*/ n = 0; n < this.Cols && addr < mem_size; n++, addr++) {
                        if (addr === this.DataEditingAddr) {
                            draw_list.AddRectFilled(pos, new ImGui__namespace.Vec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui__namespace.GetColorU32(ImGui__namespace.Col.FrameBg));
                            draw_list.AddRectFilled(pos, new ImGui__namespace.Vec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui__namespace.GetColorU32(ImGui__namespace.Col.TextSelectedBg));
                        }
                        // unsigned char c = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                        const c = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];
                        // char display_c = (c < 32 || c >= 128) ? '.' : c;
                        const display_c = (c < 32 || c >= 128) ? "." : String.fromCharCode(c);
                        // draw_list.AddText(pos, (display_c === c) ? color_text : color_disabled, &display_c, &display_c + 1);
                        draw_list.AddText(pos, (display_c === ".") ? color_disabled : color_text, display_c);
                        pos.x += s.GlyphWidth;
                    }
                }
            }
            ImGui__namespace.ASSERT(clipper.Step() === false);
            clipper.End();
            ImGui__namespace.PopStyleVar(2);
            ImGui__namespace.EndChild();
            if (data_next && this.DataEditingAddr < mem_size) {
                this.DataEditingAddr = this.DataPreviewAddr = this.DataEditingAddr + 1;
                this.DataEditingTakeFocus = true;
            }
            else if (data_editing_addr_next !== -1) {
                this.DataEditingAddr = this.DataPreviewAddr = data_editing_addr_next;
            }
            const lock_show_data_preview = this.OptShowDataPreview;
            if (this.OptShowOptions) {
                ImGui__namespace.Separator();
                this.DrawOptionsLine(s, mem_data, mem_size, base_display_addr);
            }
            if (lock_show_data_preview) {
                ImGui__namespace.Separator();
                this.DrawPreviewLine(s, mem_data, mem_size, base_display_addr);
            }
            // Notify the main window of our ideal child content size (FIXME: we are missing an API to get the contents size from the child)
            ImGui__namespace.SetCursorPosX(s.WindowWidth);
        }
        DrawOptionsLine(s, mem_data, mem_size, base_display_addr) {
            // IM_UNUSED(mem_data);
            const style = ImGui__namespace.GetStyle();
            // const char* format_range = OptUpperCaseHex ? "Range %0*" _PRISizeT "X..%0*" _PRISizeT "X" : "Range %0*" _PRISizeT "x..%0*" _PRISizeT "x";
            const format_range = (n_min, a_min, n_max, a_max) => {
                let s_min = a_min.toString(16).padStart(n_min, "0");
                let s_max = a_max.toString(16).padStart(n_max, "0");
                if (this.OptUpperCaseHex) {
                    s_min = s_min.toUpperCase();
                    s_max = s_max.toUpperCase();
                }
                return `Range ${s_min}..${s_max}`;
            };
            // Options menu
            if (ImGui__namespace.Button("Options"))
                ImGui__namespace.OpenPopup("context");
            if (ImGui__namespace.BeginPopup("context")) {
                ImGui__namespace.PushItemWidth(56);
                if (ImGui__namespace.DragInt("##cols", (_ = this.Cols) => this.Cols = _, 0.2, 4, 32, "%d cols")) {
                    this.ContentsWidthChanged = true;
                    if (this.Cols < 1)
                        this.Cols = 1;
                }
                ImGui__namespace.PopItemWidth();
                ImGui__namespace.Checkbox("Show Data Preview", (_ = this.OptShowDataPreview) => this.OptShowDataPreview = _);
                ImGui__namespace.Checkbox("Show HexII", (_ = this.OptShowHexII) => this.OptShowHexII = _);
                if (ImGui__namespace.Checkbox("Show Ascii", (_ = this.OptShowAscii) => this.OptShowAscii = _)) {
                    this.ContentsWidthChanged = true;
                }
                ImGui__namespace.Checkbox("Grey out zeroes", (_ = this.OptGreyOutZeroes) => this.OptGreyOutZeroes = _);
                ImGui__namespace.Checkbox("Uppercase Hex", (_ = this.OptUpperCaseHex) => this.OptUpperCaseHex = _);
                ImGui__namespace.EndPopup();
            }
            ImGui__namespace.SameLine();
            // ImGui.Text(format_range, s.AddrDigitsCount, base_display_addr, s.AddrDigitsCount, base_display_addr + mem_size - 1);
            ImGui__namespace.Text(format_range(s.AddrDigitsCount, base_display_addr, s.AddrDigitsCount, base_display_addr + mem_size - 1));
            ImGui__namespace.SameLine();
            ImGui__namespace.PushItemWidth((s.AddrDigitsCount + 1) * s.GlyphWidth + style.FramePadding.x * 2.0);
            if (ImGui__namespace.InputText("##addr", this.AddrInputBuf, 32, ImGui__namespace.InputTextFlags.CharsHexadecimal | ImGui__namespace.InputTextFlags.EnterReturnsTrue)) {
                // size_t goto_addr;
                let goto_addr;
                // if (sscanf(AddrInputBuf, "%" _PRISizeT "X", &goto_addr) === 1)
                if (Number.isInteger(goto_addr = parseInt(this.AddrInputBuf.buffer, 16))) {
                    this.GotoAddr = goto_addr - base_display_addr;
                    this.HighlightMin = this.HighlightMax = -1;
                }
            }
            ImGui__namespace.PopItemWidth();
            if (this.GotoAddr !== -1) {
                if (this.GotoAddr < mem_size) {
                    ImGui__namespace.BeginChild("##scrolling");
                    ImGui__namespace.SetScrollFromPosY(ImGui__namespace.GetCursorStartPos().y + (this.GotoAddr / this.Cols) * ImGui__namespace.GetTextLineHeight());
                    ImGui__namespace.EndChild();
                    this.DataEditingAddr = this.DataPreviewAddr = this.GotoAddr;
                    this.DataEditingTakeFocus = true;
                }
                this.GotoAddr = -1;
            }
        }
        // void DrawPreviewLine(const Sizes& s, void* mem_data_void, size_t mem_size, size_t base_display_addr)
        DrawPreviewLine(s, mem_data, mem_size, base_display_addr) {
            // IM_UNUSED(base_display_addr);
            // ImU8* mem_data = (ImU8*)mem_data_void;
            const style = ImGui__namespace.GetStyle();
            ImGui__namespace.AlignTextToFramePadding();
            ImGui__namespace.Text("Preview as:");
            ImGui__namespace.SameLine();
            ImGui__namespace.PushItemWidth((s.GlyphWidth * 10.0) + style.FramePadding.x * 2.0 + style.ItemInnerSpacing.x);
            if (ImGui__namespace.BeginCombo("##combo_type", this.DataTypeGetDesc(this.PreviewDataType), ImGui__namespace.ComboFlags.HeightLargest)) {
                for (let /*int*/ n = 0; n < ImGui__namespace.DataType.COUNT; n++)
                    if (ImGui__namespace.Selectable(this.DataTypeGetDesc(n), this.PreviewDataType === n))
                        this.PreviewDataType = n;
                ImGui__namespace.EndCombo();
            }
            ImGui__namespace.PopItemWidth();
            ImGui__namespace.SameLine();
            ImGui__namespace.PushItemWidth((s.GlyphWidth * 6.0) + style.FramePadding.x * 2.0 + style.ItemInnerSpacing.x);
            ImGui__namespace.Combo("##combo_endianess", (_ = this.PreviewEndianess) => this.PreviewEndianess = _, "LE\0BE\0\0");
            ImGui__namespace.PopItemWidth();
            // char buf[128] = "";
            const buf = new ImGui__namespace.StringBuffer(128);
            const x = s.GlyphWidth * 6.0;
            const has_value = this.DataPreviewAddr !== -1;
            if (has_value)
                this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Dec, buf, ImGui__namespace.ARRAYSIZE(buf));
            ImGui__namespace.Text("Dec");
            ImGui__namespace.SameLine(x);
            ImGui__namespace.TextUnformatted(has_value ? buf.buffer : "N/A");
            if (has_value)
                this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Hex, buf, ImGui__namespace.ARRAYSIZE(buf));
            ImGui__namespace.Text("Hex");
            ImGui__namespace.SameLine(x);
            ImGui__namespace.TextUnformatted(has_value ? buf.buffer : "N/A");
            if (has_value)
                this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Bin, buf, ImGui__namespace.ARRAYSIZE(buf));
            // buf[ImGui.ARRAYSIZE(buf) - 1] = 0;
            ImGui__namespace.Text("Bin");
            ImGui__namespace.SameLine(x);
            ImGui__namespace.TextUnformatted(has_value ? buf.buffer : "N/A");
        }
        // Utilities for Data Preview
        DataTypeGetDesc(data_type) {
            const descs = ["Int8", "Uint8", "Int16", "Uint16", "Int32", "Uint32", "Int64", "Uint64", "Float", "Double"];
            ImGui__namespace.ASSERT(data_type >= 0 && data_type < ImGui__namespace.DataType.COUNT);
            return descs[data_type];
        }
        DataTypeGetSize(data_type) {
            const sizes = [1, 1, 2, 2, 4, 4, 8, 8, /*sizeof(float)*/ 4, /*sizeof(double)*/ 8];
            ImGui__namespace.ASSERT(data_type >= 0 && data_type < ImGui__namespace.DataType.COUNT);
            return sizes[data_type];
        }
        DataFormatGetDesc(data_format) {
            const descs = ["Bin", "Dec", "Hex"];
            ImGui__namespace.ASSERT(data_format >= 0 && data_format < MemoryEditor.DataFormat.COUNT);
            return descs[data_format];
        }
        IsBigEndian() {
            // uint16_t x = 1;
            const x = new Uint16Array([1]);
            // char c[2];
            // memcpy(c, &x, 2);
            const c = new Int8Array(x.buffer);
            return c[0] !== 0;
        }
        // static void* EndianessCopyBigEndian(void* _dst, void* _src, size_t s, int is_little_endian)
        // {
        //     if (is_little_endian)
        //     {
        //         uint8_t* dst = (uint8_t*)_dst;
        //         uint8_t* src = (uint8_t*)_src + s - 1;
        //         for (int i = 0, n = (int)s; i < n; ++i)
        //             memcpy(dst++, src--, 1);
        //         return _dst;
        //     }
        //     else
        //     {
        //         return memcpy(_dst, _src, s);
        //     }
        // }
        // static void* EndianessCopyLittleEndian(void* _dst, void* _src, size_t s, int is_little_endian)
        // {
        //     if (is_little_endian)
        //     {
        //         return memcpy(_dst, _src, s);
        //     }
        //     else
        //     {
        //         uint8_t* dst = (uint8_t*)_dst;
        //         uint8_t* src = (uint8_t*)_src + s - 1;
        //         for (int i = 0, n = (int)s; i < n; ++i)
        //             memcpy(dst++, src--, 1);
        //         return _dst;
        //     }
        // }
        // void* EndianessCopy(void* dst, void* src, size_t size) const
        // {
        //     static void* (*fp)(void*, void*, size_t, int) = null;
        //     if (fp === null)
        //         fp = IsBigEndian() ? EndianessCopyBigEndian : EndianessCopyLittleEndian;
        //     return fp(dst, src, size, PreviewEndianess);
        // }
        // const char* FormatBinary(const uint8_t* buf, int width) const
        // {
        //     ImGui.ASSERT(width <= 64);
        //     size_t out_n = 0;
        //     static char out_buf[64 + 8 + 1];
        //     int n = width / 8;
        //     for (int j = n - 1; j >= 0; --j)
        //     {
        //         for (int i = 0; i < 8; ++i)
        //             out_buf[out_n++] = (buf[j] & (1 << (7 - i))) ? '1' : '0';
        //         out_buf[out_n++] = ' ';
        //     }
        //     ImGui.ASSERT(out_n < ImGui.ARRAYSIZE(out_buf));
        //     out_buf[out_n] = 0;
        //     return out_buf;
        // }
        // [Internal]
        DrawPreviewData(addr, mem_data, mem_size, data_type, data_format, out_buf, out_buf_size) {
            // uint8_t buf[8];
            const buf = new Uint8Array(8);
            const elem_size = this.DataTypeGetSize(data_type);
            const size = addr + elem_size > mem_size ? mem_size - addr : elem_size;
            if (this.ReadFn)
                for (let /*int*/ i = 0, n = /*(int)*/ size; i < n; ++i)
                    buf[i] = this.ReadFn(mem_data, addr + i);
            else
                // memcpy(buf, mem_data + addr, size);
                buf.set(new Uint8Array(mem_data, addr, size));
            if (this.PreviewEndianess) {
                new Uint8Array(buf.buffer, 0, size).reverse();
            }
            if (data_format === MemoryEditor.DataFormat.Bin) {
                // uint8_t binbuf[8];
                // EndianessCopy(binbuf, buf, size);
                // ImSnprintf(out_buf, out_buf_size, "%s", FormatBinary(binbuf, (int)size * 8));
                out_buf.buffer = "";
                for (let i = 0; i < size; ++i) {
                    out_buf.buffer += buf[i].toString(2).padStart(8, "0") + " ";
                }
                return;
            }
            // out_buf[0] = 0;
            out_buf.buffer = "";
            switch (data_type) {
                case ImGui__namespace.DataType.S8:
                    {
                        // int8_t int8 = 0;
                        // EndianessCopy(&int8, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hhd", int8); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%02x", int8 & 0xFF); return; }
                        const int8 = new Int8Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = int8[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${int8[0].toString(16).padStart(2, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.U8:
                    {
                        // uint8_t uint8 = 0;
                        // EndianessCopy(&uint8, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hhu", uint8); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%02x", uint8 & 0XFF); return; }
                        const uint8 = new Uint8Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = uint8[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${uint8[0].toString(16).padStart(2, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.S16:
                    {
                        // int16_t int16 = 0;
                        // EndianessCopy(&int16, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hd", int16); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%04x", int16 & 0xFFFF); return; }
                        const int16 = new Int16Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = int16[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${int16[0].toString(16).padStart(4, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.U16:
                    {
                        // uint16_t uint16 = 0;
                        // EndianessCopy(&uint16, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hu", uint16); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%04x", uint16 & 0xFFFF); return; }
                        const uint16 = new Uint16Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = uint16[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${uint16[0].toString(16).padStart(4, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.S32:
                    {
                        // int32_t int32 = 0;
                        // EndianessCopy(&int32, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%d", int32); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%08x", int32); return; }
                        const int32 = new Int32Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = int32[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${int32[0].toString(16).padStart(8, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.U32:
                    {
                        // uint32_t uint32 = 0;
                        // EndianessCopy(&uint32, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%u", uint32); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%08x", uint32); return; }
                        const uint32 = new Uint32Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = uint32[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${uint32[0].toString(16).padStart(8, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.S64:
                    {
                        // int64_t int64 = 0;
                        // EndianessCopy(&int64, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%lld", (long long)int64); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%016llx", (long long)int64); return; }
                        const int64 = new BigInt64Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = int64[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${int64[0].toString(16).padStart(16, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.U64:
                    {
                        // uint64_t uint64 = 0;
                        // EndianessCopy(&uint64, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%llu", (long long)uint64); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%016llx", (long long)uint64); return; }
                        const uint64 = new BigUint64Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = uint64[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${uint64[0].toString(16).padStart(16, "0")}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.Float:
                    {
                        // float float32 = 0.0f;
                        // EndianessCopy(&float32, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%f", float32); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "%a", float32); return; }
                        const float32 = new Float32Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = float32[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${float32[0].toString(16)}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.Double:
                    {
                        // double float64 = 0.0;
                        // EndianessCopy(&float64, buf, size);
                        // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%f", float64); return; }
                        // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "%a", float64); return; }
                        const float64 = new Float64Array(buf.buffer);
                        if (data_format === MemoryEditor.DataFormat.Dec) {
                            out_buf.buffer = float64[0].toString();
                            return;
                        }
                        if (data_format === MemoryEditor.DataFormat.Hex) {
                            out_buf.buffer = `0x${float64[0].toString(16)}`;
                            return;
                        }
                        break;
                    }
                case ImGui__namespace.DataType.COUNT:
                    break;
            } // Switch
            // ImGui.ASSERT(0); // Shouldn't reach
        }
    }
    (function (MemoryEditor) {
        (function (DataFormat) {
            DataFormat[DataFormat["Bin"] = 0] = "Bin";
            DataFormat[DataFormat["Dec"] = 1] = "Dec";
            DataFormat[DataFormat["Hex"] = 2] = "Hex";
            DataFormat[DataFormat["COUNT"] = 3] = "COUNT";
        })(MemoryEditor.DataFormat || (MemoryEditor.DataFormat = {}));
        class Sizes {
            constructor() {
                this.AddrDigitsCount = 0;
                this.LineHeight = 0.0;
                this.GlyphWidth = 0.0;
                this.HexCellWidth = 0.0;
                this.SpacingBetweenMidCols = 0.0;
                this.PosHexStart = 0.0;
                this.PosHexEnd = 0.0;
                this.PosAsciiStart = 0.0;
                this.PosAsciiEnd = 0.0;
                this.WindowWidth = 0.0;
                // Sizes() { memset(this, 0, sizeof(*this)); }
            }
        }
        MemoryEditor.Sizes = Sizes;
    })(MemoryEditor || (MemoryEditor = {}));
    // #undef _PRISizeT
    // #undef ImSnprintf
    // #ifdef _MSC_VER
    // #pragma warning (pop)
    // #endif

    exports.MemoryEditor = MemoryEditor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
