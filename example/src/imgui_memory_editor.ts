// Mini memory editor for Dear ImGui (to embed in your game/tools)
// Get latest version at http://www.github.com/ocornut/imgui_club
//
// Right-click anywhere to access the Options menu!
// You can adjust the keyboard repeat delay/rate in ImGuiIO.
// The code assume a mono-space font for simplicity!
// If you don't use the default font, use ImGui.PushFont()/PopFont() to switch to a mono-space font before calling this.
//
// Usage:
//   // Create a window and draw memory editor inside it:
//   static MemoryEditor mem_edit_1;
//   static char data[0x10000];
//   size_t data_size = 0x10000;
//   mem_edit_1.DrawWindow("Memory Editor", data, data_size);
//
// Usage:
//   // If you already have a window, use DrawContents() instead:
//   static MemoryEditor mem_edit_2;
//   ImGui.Begin("MyWindow")
//   mem_edit_2.DrawContents(this, sizeof(*this), <size_t>this);
//   ImGui.End();
//
// Changelog:
// - v0.10: initial version
// - v0.23 (2017/08/17): added to github. fixed right-arrow triggering a byte write.
// - v0.24 (2018/06/02): changed DragInt("Rows" to use a %d data format (which is desirable since imgui 1.61).
// - v0.25 (2018/07/11): fixed wording: all occurrences of "Rows" renamed to "Columns".
// - v0.26 (2018/08/02): fixed clicking on hex region
// - v0.30 (2018/08/02): added data preview for common data types
// - v0.31 (2018/10/10): added OptUpperCaseHex option to select lower/upper casing display [@samhocevar]
// - v0.32 (2018/10/10): changed signatures to use void* instead of unsigned char*
// - v0.33 (2018/10/10): added OptShowOptions option to hide all the interactive option setting.
// - v0.34 (2019/05/07): binary preview now applies endianness setting [@nicolasnoble]
// - v0.35 (2020/01/29): using ImGui.DataType available since Dear ImGui 1.69.
// - v0.36 (2020/05/05): minor tweaks, minor refactor.
// - v0.40 (2020/10/04): fix misuse of ImGuiListClipper API, broke with Dear ImGui 1.79. made cursor position appears on left-side of edit box. option popup appears on mouse release. fix MSVC warnings where _CRT_SECURE_NO_WARNINGS wasn't working in recent versions.
// - v0.41 (2020/10/05): fix when using with keyboard/gamepad navigation enabled.
// - v0.42 (2020/10/14): fix for . character in ASCII view always being greyed out.
//
// Todo/Bugs:
// - This is generally old code, it should work but please don't use this as reference!
// - Arrows are being sent to the InputText() about to disappear which for LeftArrow makes the text cursor appear at position 1 for one frame.
// - Using InputText() is awkward and maybe overkill here, consider implementing something custom.

// #pragma once

type int = number;
type float = number;
type size_t = number;

import * as ImGui from "imgui-js";

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

export class MemoryEditor
{
    // Settings
    Open: boolean;                                   // = true   // set to false when DrawWindow() was closed. ignore if not using DrawWindow().
    ReadOnly: boolean;                               // = false  // disable any editing.
    Cols: int;                                       // = 16     // number of columns to display.
    OptShowOptions: boolean;                         // = true   // display options button/context menu. when disabled, options will be locked unless you provide your own UI for them.
    OptShowDataPreview: boolean;                     // = false  // display a footer previewing the decimal/binary/hex/float representation of the currently selected bytes.
    OptShowHexII: boolean;                           // = false  // display values in HexII representation instead of regular hexadecimal: hide null/zero bytes, ascii values as ".X".
    OptShowAscii: boolean;                           // = true   // display ASCII representation on the right side.
    OptGreyOutZeroes: boolean;                       // = true   // display null/zero bytes using the TextDisabled color.
    OptUpperCaseHex: boolean;                        // = true   // display hexadecimal values as "FF" instead of "ff".
    OptMidColsCount: int;                            // = 8      // set to 0 to disable extra spacing between every mid-cols.
    OptAddrDigitsCount: int;                         // = 0      // number of addr digits to display (default calculated based on maximum displayed addr).
    HighlightColor: ImGui.U32;                       //          // background color of highlighted bytes.
    public ReadFn: ((data: ArrayBuffer, off: size_t) => size_t) | null; // = 0 // optional handler to read bytes.
    public WriteFn: ((data: ArrayBuffer, off: size_t, d: number) => void) | null; // = 0 // optional handler to write bytes.
    public HighlightFn: ((data: ArrayBuffer, off: size_t) => boolean) | null; // = 0 // optional handler to return Highlight property (to support non-contiguous highlighting).

    // [Internal State]
    ContentsWidthChanged: boolean;
    DataPreviewAddr: size_t;
    DataEditingAddr: size_t;
    DataEditingTakeFocus: boolean;
    readonly DataInputBuf: ImGui.StringBuffer = new ImGui.StringBuffer(32); /*char[32]*/;
    readonly AddrInputBuf: ImGui.StringBuffer = new ImGui.StringBuffer(32); /*char[32]*/;
    GotoAddr: size_t;
    HighlightMin: size_t; HighlightMax: size_t;
    PreviewEndianess: int;
    PreviewDataType: ImGui.DataType;

    constructor()
    {
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
        this.HighlightColor = ImGui.COL32(255, 255, 255, 50);
        this.ReadFn = null;
        this.WriteFn = null;
        this.HighlightFn = null;

        // State/Internals
        this.ContentsWidthChanged = false;
        this.DataPreviewAddr = this.DataEditingAddr = <size_t>-1;
        this.DataEditingTakeFocus = false;
        this.DataInputBuf.buffer = ""; // memset(DataInputBuf, 0, sizeof(DataInputBuf));
        this.AddrInputBuf.buffer = ""; // memset(AddrInputBuf, 0, sizeof(AddrInputBuf));
        this.GotoAddr = <size_t>-1;
        this.HighlightMin = this.HighlightMax = <size_t>-1;
        this.PreviewEndianess = 0;
        this.PreviewDataType = ImGui.DataType.S32;
    }

    GotoAddrAndHighlight(addr_min: size_t, addr_max: size_t): void
    {
        this.GotoAddr = addr_min;
        this.HighlightMin = addr_min;
        this.HighlightMax = addr_max;
    }

    CalcSizes(s: MemoryEditor.Sizes, mem_size: size_t, base_display_addr: size_t): void
    {
        const style: ImGui.Style = ImGui.GetStyle();
        s.AddrDigitsCount = this.OptAddrDigitsCount;
        if (s.AddrDigitsCount === 0)
            for (let /*size_t*/ n = base_display_addr + mem_size - 1; n > 0; n >>= 4)
                s.AddrDigitsCount++;
        s.LineHeight = ImGui.GetTextLineHeight();
        s.GlyphWidth = ImGui.CalcTextSize("F").x + 1;                  // We assume the font is mono-space
        s.HexCellWidth = Math.floor/*(float)(int)*/(s.GlyphWidth * 2.5);             // "FF " we include trailing space in the width to easily catch clicks everywhere
        s.SpacingBetweenMidCols = Math.floor/*(float)(int)*/(s.HexCellWidth * 0.25); // Every OptMidColsCount columns we add a bit of extra spacing
        s.PosHexStart = (s.AddrDigitsCount + 2) * s.GlyphWidth;
        s.PosHexEnd = s.PosHexStart + (s.HexCellWidth * this.Cols);
        s.PosAsciiStart = s.PosAsciiEnd = s.PosHexEnd;
        if (this.OptShowAscii)
        {
            s.PosAsciiStart = s.PosHexEnd + s.GlyphWidth * 1;
            if (this.OptMidColsCount > 0)
                s.PosAsciiStart += /*(float)*/((this.Cols + this.OptMidColsCount - 1) / this.OptMidColsCount) * s.SpacingBetweenMidCols;
            s.PosAsciiEnd = s.PosAsciiStart + this.Cols * s.GlyphWidth;
        }
        s.WindowWidth = s.PosAsciiEnd + style.ScrollbarSize + style.WindowPadding.x * 2 + s.GlyphWidth;
    }

    // Standalone Memory Editor window
    public DrawWindow(title: string, mem_data: ArrayBuffer, mem_size: number = mem_data.byteLength, base_display_addr: number = 0x0000): void
    {
        const s: MemoryEditor.Sizes = new MemoryEditor.Sizes();
        this.CalcSizes(s, mem_size, base_display_addr);
        ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(0.0, 0.0), new ImGui.Vec2(s.WindowWidth, Number.MAX_VALUE));

        this.Open = true;
        if (ImGui.Begin(title, (_ = this.Open) => this.Open = _, ImGui.WindowFlags.NoScrollbar))
        {
            if (ImGui.IsWindowHovered(ImGui.HoveredFlags.RootAndChildWindows) && ImGui.IsMouseReleased(ImGui.MouseButton.Right))
                ImGui.OpenPopup("context");
            this.DrawContents(mem_data, mem_size, base_display_addr);
            if (this.ContentsWidthChanged)
            {
                this.CalcSizes(s, mem_size, base_display_addr);
                ImGui.SetWindowSize(new ImGui.Vec2(s.WindowWidth, ImGui.GetWindowSize().y));
            }
        }
        ImGui.End();
    }

    // Memory Editor contents only
    // void DrawContents(void* mem_data_void, size_t mem_size, size_t base_display_addr = 0x0000)
    public DrawContents(mem_data: ArrayBuffer, mem_size: number = mem_data.byteLength, base_display_addr: number = 0x0000): void
    {
        if (this.Cols < 1)
            this.Cols = 1;

        // ImU8* mem_data = (ImU8*)mem_data_void;
        const s: MemoryEditor.Sizes = new MemoryEditor.Sizes();
        this.CalcSizes(s, mem_size, base_display_addr);
        const style: ImGui.Style = ImGui.GetStyle();

        // We begin into our scrolling region with the 'ImGui.WindowFlags.NoMove' in order to prevent click from moving the window.
        // This is used as a facility since our main click detection code doesn't assign an ActiveId so the click would normally be caught as a window-move.
        const height_separator: float = style.ItemSpacing.y;
        let footer_height: float = 0;
        if (this.OptShowOptions)
            footer_height += height_separator + ImGui.GetFrameHeightWithSpacing() * 1;
        if (this.OptShowDataPreview)
            footer_height += height_separator + ImGui.GetFrameHeightWithSpacing() * 1 + ImGui.GetTextLineHeightWithSpacing() * 3;
        ImGui.BeginChild("##scrolling", new ImGui.Vec2(0, -footer_height), false, ImGui.WindowFlags.NoMove | ImGui.WindowFlags.NoNav);
        const draw_list: ImGui.DrawList = ImGui.GetWindowDrawList();

        ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(0, 0));
        ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(0, 0));

        // We are not really using the clipper API correctly here, because we rely on visible_start_addr/visible_end_addr for our scrolling function.
        const line_total_count: int = 0|/*(int)*/((mem_size + this.Cols - 1) / this.Cols);
        // ImGuiListClipper clipper;
        const clipper = new ImGui.ListClipper();
        clipper.Begin(line_total_count, s.LineHeight);
        clipper.Step();
        const visible_start_addr: size_t = clipper.DisplayStart * this.Cols;
        const visible_end_addr: size_t = clipper.DisplayEnd * this.Cols;

        let data_next: boolean = false;

        if (this.ReadOnly || this.DataEditingAddr >= mem_size)
            this.DataEditingAddr = <size_t>-1;
        if (this.DataPreviewAddr >= mem_size)
            this.DataPreviewAddr = <size_t>-1;

        const preview_data_type_size: size_t = this.OptShowDataPreview ? this.DataTypeGetSize(this.PreviewDataType) : 0;

        let data_editing_addr_backup: size_t = this.DataEditingAddr;
        let data_editing_addr_next: size_t = <size_t>-1;
        if (this.DataEditingAddr !== <size_t>-1)
        {
            // Move cursor but only apply on next frame so scrolling with be synchronized (because currently we can't change the scrolling while the window is being rendered)
            if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.UpArrow)) && this.DataEditingAddr >= <size_t>this.Cols)          { data_editing_addr_next = this.DataEditingAddr - this.Cols; this.DataEditingTakeFocus = true; }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.DownArrow)) && this.DataEditingAddr < mem_size - this.Cols) { data_editing_addr_next = this.DataEditingAddr + this.Cols; this.DataEditingTakeFocus = true; }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.LeftArrow)) && this.DataEditingAddr > 0)               { data_editing_addr_next = this.DataEditingAddr - 1; this.DataEditingTakeFocus = true; }
            else if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.RightArrow)) && this.DataEditingAddr < mem_size - 1)   { data_editing_addr_next = this.DataEditingAddr + 1; this.DataEditingTakeFocus = true; }
        }
        if (data_editing_addr_next !== <size_t>-1 && (data_editing_addr_next / this.Cols) !== (data_editing_addr_backup / this.Cols))
        {
            // Track cursor movements
            const scroll_offset: int = (/*(int)*/(data_editing_addr_next / this.Cols) - /*(int)*/(data_editing_addr_backup / this.Cols));
            const scroll_desired: boolean = (scroll_offset < 0 && data_editing_addr_next < visible_start_addr + this.Cols * 2) || (scroll_offset > 0 && data_editing_addr_next > visible_end_addr - this.Cols * 2);
            if (scroll_desired)
                ImGui.SetScrollY(ImGui.GetScrollY() + scroll_offset * s.LineHeight);
        }

        // Draw vertical separator
        const window_pos: ImGui.Vec2 = ImGui.GetWindowPos();
        if (this.OptShowAscii)
            draw_list.AddLine(new ImGui.Vec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y), new ImGui.Vec2(window_pos.x + s.PosAsciiStart - s.GlyphWidth, window_pos.y + 9999), ImGui.GetColorU32(ImGui.Col.Border));

        const color_text: ImGui.U32 = ImGui.GetColorU32(ImGui.Col.Text);
        const color_disabled: ImGui.U32 = this.OptGreyOutZeroes ? ImGui.GetColorU32(ImGui.Col.TextDisabled) : color_text;

        // const char* format_address = this.OptUpperCaseHex ? "%0*" _PRISizeT "X: " : "%0*" _PRISizeT "x: ";
        const format_address = (n: number, a: number): string => {
            let s = a.toString(16).padStart(n, "0");
            if (this.OptUpperCaseHex) { s = s.toUpperCase(); }
            return s;
        };
        // const char* format_data = this.OptUpperCaseHex ? "%0*" _PRISizeT "X" : "%0*" _PRISizeT "x";
        const format_data = (n: number, a: number): string => {
            let s = a.toString(16).padStart(n, "0");
            if (this.OptUpperCaseHex) { s = s.toUpperCase(); }
            return s;
        };
        // const char* format_byte = this.OptUpperCaseHex ? "%02X" : "%02x";
        const format_byte = (b: number): string => {
            let s = b.toString(16).padStart(2, "0");
            if (this.OptUpperCaseHex) { s = s.toUpperCase(); }
            return s;
        };
        // const char* format_byte_space = this.OptUpperCaseHex ? "%02X " : "%02x ";
        const format_byte_space = (b: number): string => {
            return `${format_byte(b)} `;
        }

        for (let /*int*/ line_i = clipper.DisplayStart; line_i < clipper.DisplayEnd; line_i++) // display only visible lines
        {
            let addr: size_t = <size_t>(line_i * this.Cols);
            // ImGui.Text(format_address, s.AddrDigitsCount, base_display_addr + addr);
            ImGui.Text(format_address(s.AddrDigitsCount, base_display_addr + addr));

            // Draw Hexadecimal
            for (let /*int*/ n = 0; n < this.Cols && addr < mem_size; n++, addr++)
            {
                let byte_pos_x: float = s.PosHexStart + s.HexCellWidth * n;
                if (this.OptMidColsCount > 0)
                    byte_pos_x += /*(float)*/(n / this.OptMidColsCount) * s.SpacingBetweenMidCols;
                ImGui.SameLine(byte_pos_x);

                // Draw highlight
                const is_highlight_from_user_range: boolean = (addr >= this.HighlightMin && addr < this.HighlightMax);
                const is_highlight_from_user_func: boolean = (this.HighlightFn !== null && this.HighlightFn(mem_data, addr));
                const is_highlight_from_preview: boolean = (addr >= this.DataPreviewAddr && addr < this.DataPreviewAddr + preview_data_type_size);
                if (is_highlight_from_user_range || is_highlight_from_user_func || is_highlight_from_preview)
                {
                    const pos: ImGui.Vec2 = ImGui.GetCursorScreenPos();
                    let highlight_width: float = s.GlyphWidth * 2;
                    const is_next_byte_highlighted: boolean = (addr + 1 < mem_size) && ((this.HighlightMax !== <size_t>-1 && addr + 1 < this.HighlightMax) || (this.HighlightFn !== null && this.HighlightFn(mem_data, addr + 1)));
                    if (is_next_byte_highlighted || (n + 1 === this.Cols))
                    {
                        highlight_width = s.HexCellWidth;
                        if (this.OptMidColsCount > 0 && n > 0 && (n + 1) < this.Cols && ((n + 1) % this.OptMidColsCount) === 0)
                            highlight_width += s.SpacingBetweenMidCols;
                    }
                    draw_list.AddRectFilled(pos, new ImGui.Vec2(pos.x + highlight_width, pos.y + s.LineHeight), this.HighlightColor);
                }

                if (this.DataEditingAddr === addr)
                {
                    // Display text input on current byte
                    let data_write: boolean = false;
                    ImGui.PushID(/*(void*)*/addr);
                    if (this.DataEditingTakeFocus)
                    {
                        ImGui.SetKeyboardFocusHere();
                        ImGui.CaptureKeyboardFromApp(true);
                        // sprintf(AddrInputBuf, format_data, s.AddrDigitsCount, base_display_addr + addr);
                        this.AddrInputBuf.buffer = format_data(s.AddrDigitsCount, base_display_addr + addr);
                        // sprintf(DataInputBuf, format_byte, ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                        this.DataInputBuf.buffer = format_byte(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr]);
                    }
                    ImGui.PushItemWidth(s.GlyphWidth * 2);
                    class UserData
                    {
                        // FIXME: We should have a way to retrieve the text edit cursor position more easily in the API, this is rather tedious. This is such a ugly mess we may be better off not using InputText() at all here.
                        static Callback(data: ImGui.InputTextCallbackData<UserData>)
                        {
                            const user_data: UserData | null = data.UserData;
                            ImGui.ASSERT(user_data !== null);
                            if (!data.HasSelection())
                                user_data.CursorPos = data.CursorPos;
                            if (data.SelectionStart === 0 && data.SelectionEnd === data.BufTextLen)
                            {
                                // When not editing a byte, always rewrite its content (this is a bit tricky, since InputText technically "owns" the master copy of the buffer we edit it in there)
                                data.DeleteChars(0, data.BufTextLen);
                                data.InsertChars(0, user_data.CurrentBufOverwrite.buffer);
                                data.SelectionStart = 0;
                                data.SelectionEnd = 2;
                                data.CursorPos = 0;
                            }
                            return 0;
                        }
                        readonly CurrentBufOverwrite: ImGui.StringBuffer = new ImGui.StringBuffer(3); // Input
                        CursorPos: number = 0; // Output
                    }
                    const user_data: UserData = new UserData();
                    user_data.CursorPos = -1;
                    // sprintf(user_data.CurrentBufOverwrite, format_byte, ReadFn ? ReadFn(mem_data, addr) : mem_data[addr]);
                    user_data.CurrentBufOverwrite.buffer = format_byte(this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr]);
                    const flags: ImGui.InputTextFlags = ImGui.InputTextFlags.CharsHexadecimal | ImGui.InputTextFlags.EnterReturnsTrue | ImGui.InputTextFlags.AutoSelectAll | ImGui.InputTextFlags.NoHorizontalScroll | ImGui.InputTextFlags.AlwaysOverwrite | ImGui.InputTextFlags.CallbackAlways;
                    if (ImGui.InputText("##data", this.DataInputBuf, 32, flags, UserData.Callback, user_data))
                        data_write = data_next = true;
                    else if (!this.DataEditingTakeFocus && !ImGui.IsItemActive())
                        this.DataEditingAddr = data_editing_addr_next = <size_t>-1;
                    this.DataEditingTakeFocus = false;
                    ImGui.PopItemWidth();
                    if (user_data.CursorPos >= 2)
                        data_write = data_next = true;
                    if (data_editing_addr_next !== <size_t>-1)
                        data_write = data_next = false;
                    // unsigned int data_input_value = 0;
                    let data_input_value: number/*unsigned int*/ = 0;
                    // if (data_write && sscanf(DataInputBuf, "%X", &data_input_value) === 1)
                    if (data_write && Number.isInteger(data_input_value = parseInt(this.DataInputBuf.buffer, 16)))
                    {
                        if (this.WriteFn)
                            this.WriteFn(mem_data, addr, /*(ImU8)*/data_input_value);
                        else
                            // mem_data[addr] = (ImU8)data_input_value;
                            new Uint8Array(mem_data)[addr] = data_input_value;
                    }
                    ImGui.PopID();
                }
                else
                {
                    // NB: The trailing space is not visible but ensure there's no gap that the mouse cannot click on.
                    // ImU8 b = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                    const b: number/*ImU8*/ = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];

                    if (this.OptShowHexII)
                    {
                        if ((b >= 32 && b < 128))
                            // ImGui.Text(".%c ", b);
                            ImGui.Text(`.${String.fromCharCode(b)} `);
                        else if (b === 0xFF && this.OptGreyOutZeroes)
                            ImGui.TextDisabled("## ");
                        else if (b === 0x00)
                            ImGui.Text("   ");
                        else
                            ImGui.Text(format_byte_space(b));
                    }
                    else
                    {
                        if (b === 0 && this.OptGreyOutZeroes)
                            ImGui.TextDisabled("00 ");
                        else
                            ImGui.Text(format_byte_space(b));
                    }
                    if (!this.ReadOnly && ImGui.IsItemHovered() && ImGui.IsMouseClicked(0))
                    {
                        this.DataEditingTakeFocus = true;
                        data_editing_addr_next = addr;
                    }
                }
            }

            if (this.OptShowAscii)
            {
                // Draw ASCII values
                ImGui.SameLine(s.PosAsciiStart);
                const pos: ImGui.Vec2 = ImGui.GetCursorScreenPos();
                addr = line_i * this.Cols;
                ImGui.PushID(line_i);
                if (ImGui.InvisibleButton("ascii", new ImGui.Vec2(s.PosAsciiEnd - s.PosAsciiStart, s.LineHeight)))
                {
                    this.DataEditingAddr = this.DataPreviewAddr = addr + <size_t>((ImGui.GetIO().MousePos.x - pos.x) / s.GlyphWidth);
                    this.DataEditingTakeFocus = true;
                }
                ImGui.PopID();
                for (let /*int*/ n = 0; n < this.Cols && addr < mem_size; n++, addr++)
                {
                    if (addr === this.DataEditingAddr)
                    {
                        draw_list.AddRectFilled(pos, new ImGui.Vec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(ImGui.Col.FrameBg));
                        draw_list.AddRectFilled(pos, new ImGui.Vec2(pos.x + s.GlyphWidth, pos.y + s.LineHeight), ImGui.GetColorU32(ImGui.Col.TextSelectedBg));
                    }
                    // unsigned char c = ReadFn ? ReadFn(mem_data, addr) : mem_data[addr];
                    const c: number = this.ReadFn ? this.ReadFn(mem_data, addr) : new Uint8Array(mem_data)[addr];
                    // char display_c = (c < 32 || c >= 128) ? '.' : c;
                    const display_c: string = (c < 32 || c >= 128) ? "." : String.fromCharCode(c);
                    // draw_list.AddText(pos, (display_c === c) ? color_text : color_disabled, &display_c, &display_c + 1);
                    draw_list.AddText(pos, (display_c === ".") ? color_disabled : color_text, display_c);
                    pos.x += s.GlyphWidth;
                }
            }
        }
        ImGui.ASSERT(clipper.Step() === false);
        clipper.End();
        ImGui.PopStyleVar(2);
        ImGui.EndChild();

        if (data_next && this.DataEditingAddr < mem_size)
        {
            this.DataEditingAddr = this.DataPreviewAddr = this.DataEditingAddr + 1;
            this.DataEditingTakeFocus = true;
        }
        else if (data_editing_addr_next !== <size_t>-1)
        {
            this.DataEditingAddr = this.DataPreviewAddr = data_editing_addr_next;
        }

        const lock_show_data_preview: boolean = this.OptShowDataPreview;
        if (this.OptShowOptions)
        {
            ImGui.Separator();
            this.DrawOptionsLine(s, mem_data, mem_size, base_display_addr);
        }

        if (lock_show_data_preview)
        {
            ImGui.Separator();
            this.DrawPreviewLine(s, mem_data, mem_size, base_display_addr);
        }

        // Notify the main window of our ideal child content size (FIXME: we are missing an API to get the contents size from the child)
        ImGui.SetCursorPosX(s.WindowWidth);
    }

    DrawOptionsLine(s: MemoryEditor.Sizes, mem_data: ArrayBuffer, mem_size: size_t, base_display_addr: size_t): void
    {
        // IM_UNUSED(mem_data);
        const style: ImGui.Style = ImGui.GetStyle();
        // const char* format_range = OptUpperCaseHex ? "Range %0*" _PRISizeT "X..%0*" _PRISizeT "X" : "Range %0*" _PRISizeT "x..%0*" _PRISizeT "x";
        const format_range = (n_min: number, a_min: number, n_max: number, a_max: number): string => {
            let s_min = a_min.toString(16).padStart(n_min, "0");
            let s_max = a_max.toString(16).padStart(n_max, "0");
            if (this.OptUpperCaseHex) {
                s_min = s_min.toUpperCase();
                s_max = s_max.toUpperCase();
            }
            return `Range ${s_min}..${s_max}`;
        };

        // Options menu
        if (ImGui.Button("Options"))
            ImGui.OpenPopup("context");
        if (ImGui.BeginPopup("context"))
        {
            ImGui.PushItemWidth(56);
            if (ImGui.DragInt("##cols", (_ = this.Cols) => this.Cols = _, 0.2, 4, 32, "%d cols")) { this.ContentsWidthChanged = true; if (this.Cols < 1) this.Cols = 1; }
            ImGui.PopItemWidth();
            ImGui.Checkbox("Show Data Preview", (_ = this.OptShowDataPreview) => this.OptShowDataPreview = _);
            ImGui.Checkbox("Show HexII", (_ = this.OptShowHexII) => this.OptShowHexII = _);
            if (ImGui.Checkbox("Show Ascii", (_ = this.OptShowAscii) => this.OptShowAscii = _)) { this.ContentsWidthChanged = true; }
            ImGui.Checkbox("Grey out zeroes", (_ = this.OptGreyOutZeroes) => this.OptGreyOutZeroes = _);
            ImGui.Checkbox("Uppercase Hex", (_ = this.OptUpperCaseHex) => this.OptUpperCaseHex = _);

            ImGui.EndPopup();
        }

        ImGui.SameLine();
        // ImGui.Text(format_range, s.AddrDigitsCount, base_display_addr, s.AddrDigitsCount, base_display_addr + mem_size - 1);
        ImGui.Text(format_range(s.AddrDigitsCount, base_display_addr, s.AddrDigitsCount, base_display_addr + mem_size - 1));
        ImGui.SameLine();
        ImGui.PushItemWidth((s.AddrDigitsCount + 1) * s.GlyphWidth + style.FramePadding.x * 2.0);
        if (ImGui.InputText("##addr", this.AddrInputBuf, 32, ImGui.InputTextFlags.CharsHexadecimal | ImGui.InputTextFlags.EnterReturnsTrue))
        {
            // size_t goto_addr;
            let goto_addr: size_t;
            // if (sscanf(AddrInputBuf, "%" _PRISizeT "X", &goto_addr) === 1)
            if (Number.isInteger(goto_addr = parseInt(this.AddrInputBuf.buffer, 16)))
            {
                this.GotoAddr = goto_addr - base_display_addr;
                this.HighlightMin = this.HighlightMax = <size_t>-1;
            }
        }
        ImGui.PopItemWidth();

        if (this.GotoAddr !== <size_t>-1)
        {
            if (this.GotoAddr < mem_size)
            {
                ImGui.BeginChild("##scrolling");
                ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + (this.GotoAddr / this.Cols) * ImGui.GetTextLineHeight());
                ImGui.EndChild();
                this.DataEditingAddr = this.DataPreviewAddr = this.GotoAddr;
                this.DataEditingTakeFocus = true;
            }
            this.GotoAddr = <size_t>-1;
        }
    }

    // void DrawPreviewLine(const Sizes& s, void* mem_data_void, size_t mem_size, size_t base_display_addr)
    DrawPreviewLine(s: MemoryEditor.Sizes, mem_data: ArrayBuffer, mem_size: size_t, base_display_addr: size_t): void
    {
        // IM_UNUSED(base_display_addr);
        // ImU8* mem_data = (ImU8*)mem_data_void;
        const style: ImGui.Style = ImGui.GetStyle();
        ImGui.AlignTextToFramePadding();
        ImGui.Text("Preview as:");
        ImGui.SameLine();
        ImGui.PushItemWidth((s.GlyphWidth * 10.0) + style.FramePadding.x * 2.0 + style.ItemInnerSpacing.x);
        if (ImGui.BeginCombo("##combo_type", this.DataTypeGetDesc(this.PreviewDataType), ImGui.ComboFlags.HeightLargest))
        {
            for (let /*int*/ n = 0; n < ImGui.DataType.COUNT; n++)
                if (ImGui.Selectable(this.DataTypeGetDesc(<ImGui.DataType>n), this.PreviewDataType === n))
                    this.PreviewDataType = <ImGui.DataType>n;
            ImGui.EndCombo();
        }
        ImGui.PopItemWidth();
        ImGui.SameLine();
        ImGui.PushItemWidth((s.GlyphWidth * 6.0) + style.FramePadding.x * 2.0 + style.ItemInnerSpacing.x);
        ImGui.Combo("##combo_endianess", (_ = this.PreviewEndianess) => this.PreviewEndianess = _, "LE\0BE\0\0");
        ImGui.PopItemWidth();

        // char buf[128] = "";
        const buf: ImGui.StringBuffer = new ImGui.StringBuffer(128);
        const x: float = s.GlyphWidth * 6.0;
        const has_value: boolean = this.DataPreviewAddr !== <size_t>-1;
        if (has_value)
            this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Dec, buf, <size_t>ImGui.ARRAYSIZE(buf));
        ImGui.Text("Dec"); ImGui.SameLine(x); ImGui.TextUnformatted(has_value ? buf.buffer : "N/A");
        if (has_value)
            this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Hex, buf, <size_t>ImGui.ARRAYSIZE(buf));
        ImGui.Text("Hex"); ImGui.SameLine(x); ImGui.TextUnformatted(has_value ? buf.buffer : "N/A");
        if (has_value)
            this.DrawPreviewData(this.DataPreviewAddr, mem_data, mem_size, this.PreviewDataType, MemoryEditor.DataFormat.Bin, buf, <size_t>ImGui.ARRAYSIZE(buf));
        // buf[ImGui.ARRAYSIZE(buf) - 1] = 0;
        ImGui.Text("Bin"); ImGui.SameLine(x); ImGui.TextUnformatted(has_value ? buf.buffer : "N/A");
    }

    // Utilities for Data Preview
    DataTypeGetDesc(data_type: ImGui.DataType): string
    {
        const descs: string[] = [ "Int8", "Uint8", "Int16", "Uint16", "Int32", "Uint32", "Int64", "Uint64", "Float", "Double" ];
        ImGui.ASSERT(data_type >= 0 && data_type < ImGui.DataType.COUNT);
        return descs[data_type];
    }

    DataTypeGetSize(data_type: ImGui.DataType): size_t
    {
        const sizes: size_t[] = [ 1, 1, 2, 2, 4, 4, 8, 8, /*sizeof(float)*/4, /*sizeof(double)*/8 ];
        ImGui.ASSERT(data_type >= 0 && data_type < ImGui.DataType.COUNT);
        return sizes[data_type];
    }

    DataFormatGetDesc(data_format: MemoryEditor.DataFormat): string
    {
        const descs: string[] = [ "Bin", "Dec", "Hex" ];
        ImGui.ASSERT(data_format >= 0 && data_format < MemoryEditor.DataFormat.COUNT);
        return descs[data_format];
    }

    IsBigEndian(): boolean {
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
    DrawPreviewData(addr: size_t, mem_data: ArrayBuffer, mem_size: size_t, data_type: ImGui.DataType, data_format: MemoryEditor.DataFormat, out_buf: ImGui.StringBuffer, out_buf_size: size_t): void
    {
        // uint8_t buf[8];
        const buf = new Uint8Array(8);
        const elem_size: size_t = this.DataTypeGetSize(data_type);
        const size: size_t = addr + elem_size > mem_size ? mem_size - addr : elem_size;
        if (this.ReadFn)
            for (let /*int*/ i = 0, n = /*(int)*/size; i < n; ++i)
                buf[i] = this.ReadFn(mem_data, addr + i);
        else
            // memcpy(buf, mem_data + addr, size);
            buf.set(new Uint8Array(mem_data, addr, size));

        if (this.PreviewEndianess) { new Uint8Array(buf.buffer, 0, size).reverse(); }

        if (data_format === MemoryEditor.DataFormat.Bin)
        {
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
        switch (data_type)
        {
        case ImGui.DataType.S8:
        {
            // int8_t int8 = 0;
            // EndianessCopy(&int8, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hhd", int8); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%02x", int8 & 0xFF); return; }
            const int8 = new Int8Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = int8[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${int8[0].toString(16).padStart(2, "0")}`; return; }
            break;
        }
        case ImGui.DataType.U8:
        {
            // uint8_t uint8 = 0;
            // EndianessCopy(&uint8, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hhu", uint8); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%02x", uint8 & 0XFF); return; }
            const uint8 = new Uint8Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = uint8[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${uint8[0].toString(16).padStart(2, "0")}`; return; }
            break;
        }
        case ImGui.DataType.S16:
        {
            // int16_t int16 = 0;
            // EndianessCopy(&int16, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hd", int16); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%04x", int16 & 0xFFFF); return; }
            const int16 = new Int16Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = int16[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${int16[0].toString(16).padStart(4, "0")}`; return; }
            break;
        }
        case ImGui.DataType.U16:
        {
            // uint16_t uint16 = 0;
            // EndianessCopy(&uint16, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%hu", uint16); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%04x", uint16 & 0xFFFF); return; }
            const uint16 = new Uint16Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = uint16[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${uint16[0].toString(16).padStart(4, "0")}`; return; }
            break;
        }
        case ImGui.DataType.S32:
        {
            // int32_t int32 = 0;
            // EndianessCopy(&int32, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%d", int32); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%08x", int32); return; }
            const int32 = new Int32Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = int32[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${int32[0].toString(16).padStart(8, "0")}`; return; }
            break;
        }
        case ImGui.DataType.U32:
        {
            // uint32_t uint32 = 0;
            // EndianessCopy(&uint32, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%u", uint32); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%08x", uint32); return; }
            const uint32 = new Uint32Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = uint32[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${uint32[0].toString(16).padStart(8, "0")}`; return; }
            break;
        }
        case ImGui.DataType.S64:
        {
            // int64_t int64 = 0;
            // EndianessCopy(&int64, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%lld", (long long)int64); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%016llx", (long long)int64); return; }
            const int64 = new BigInt64Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = int64[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${int64[0].toString(16).padStart(16, "0")}`; return; }
            break;
        }
        case ImGui.DataType.U64:
        {
            // uint64_t uint64 = 0;
            // EndianessCopy(&uint64, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%llu", (long long)uint64); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "0x%016llx", (long long)uint64); return; }
            const uint64 = new BigUint64Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = uint64[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${uint64[0].toString(16).padStart(16, "0")}`; return; }
            break;
        }
        case ImGui.DataType.Float:
        {
            // float float32 = 0.0f;
            // EndianessCopy(&float32, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%f", float32); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "%a", float32); return; }
            const float32 = new Float32Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = float32[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${float32[0].toString(16)}`; return; }
            break;
        }
        case ImGui.DataType.Double:
        {
            // double float64 = 0.0;
            // EndianessCopy(&float64, buf, size);
            // if (data_format === MemoryEditor.DataFormat.Dec) { ImSnprintf(out_buf, out_buf_size, "%f", float64); return; }
            // if (data_format === MemoryEditor.DataFormat.Hex) { ImSnprintf(out_buf, out_buf_size, "%a", float64); return; }
            const float64 = new Float64Array(buf.buffer);
            if (data_format === MemoryEditor.DataFormat.Dec) { out_buf.buffer = float64[0].toString(); return; }
            if (data_format === MemoryEditor.DataFormat.Hex) { out_buf.buffer = `0x${float64[0].toString(16)}`; return; }
            break;
        }
        case ImGui.DataType.COUNT:
            break;
        } // Switch
        // ImGui.ASSERT(0); // Shouldn't reach
    }
}

export namespace MemoryEditor {
    export enum DataFormat
    {
        Bin = 0,
        Dec = 1,
        Hex = 2,
        COUNT
    }
    
    export class Sizes
    {
        AddrDigitsCount: int = 0;
        LineHeight: float = 0.0;
        GlyphWidth: float = 0.0;
        HexCellWidth: float = 0.0;
        SpacingBetweenMidCols: float = 0.0;
        PosHexStart: float = 0.0;
        PosHexEnd: float = 0.0;
        PosAsciiStart: float = 0.0;
        PosAsciiEnd: float = 0.0;
        WindowWidth: float = 0.0;
    
        // Sizes() { memset(this, 0, sizeof(*this)); }
    }
}

// #undef _PRISizeT
// #undef ImSnprintf

// #ifdef _MSC_VER
// #pragma warning (pop)
// #endif
