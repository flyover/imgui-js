System.register(["./bind-imgui", "./imconfig"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function IM_ASSERT(_EXPR) { if (!_EXPR) {
        throw new Error();
    } }
    exports_1("IM_ASSERT", IM_ASSERT);
    function IM_ARRAYSIZE(_ARR) {
        if (_ARR instanceof ImStringBuffer) {
            return _ARR.size;
        }
        else {
            return _ARR.length;
        }
    }
    exports_1("IM_ARRAYSIZE", IM_ARRAYSIZE);
    function IM_COL32(R, G, B, A = 255) {
        return ((A << IM_COL32_A_SHIFT) | (B << IM_COL32_B_SHIFT) | (G << IM_COL32_G_SHIFT) | (R << IM_COL32_R_SHIFT)) >>> 0;
    }
    exports_1("IM_COL32", IM_COL32);
    // IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
    function CreateContext(shared_font_atlas = null) {
        const ctx_native = bind.CreateContext();
        if (ctx_native === null) {
            throw new Error();
        }
        const ctx = new ImGuiContext(ctx_native);
        if (ImGuiContext.current_ctx === null) {
            ImGuiContext.current_ctx = ctx;
        }
        return ctx;
    }
    exports_1("CreateContext", CreateContext);
    // IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = Destroy current context
    function DestroyContext(ctx = null) {
        if (ctx === null) {
            ctx = ImGuiContext.current_ctx;
            ImGuiContext.current_ctx = null;
        }
        bind.DestroyContext((ctx === null) ? null : ctx.native);
        if (ctx) {
            ctx.delete();
        }
    }
    exports_1("DestroyContext", DestroyContext);
    // IMGUI_API ImGuiContext* GetCurrentContext();
    function GetCurrentContext() {
        // const ctx_native: BindImGui.ImGuiContext | null = bind.GetCurrentContext();
        return ImGuiContext.current_ctx;
    }
    exports_1("GetCurrentContext", GetCurrentContext);
    // IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
    function SetCurrentContext(ctx) {
        bind.SetCurrentContext((ctx === null) ? null : ctx.native);
        ImGuiContext.current_ctx = ctx;
    }
    exports_1("SetCurrentContext", SetCurrentContext);
    // Main
    // IMGUI_API ImGuiIO&      GetIO();
    function GetIO() { return new ImGuiIO(bind.GetIO()); }
    exports_1("GetIO", GetIO);
    // IMGUI_API ImGuiStyle&   GetStyle();
    function GetStyle() { return new ImGuiStyle(bind.GetStyle()); }
    exports_1("GetStyle", GetStyle);
    // IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
    function GetDrawData() {
        const draw_data = bind.GetDrawData();
        return (draw_data === null) ? null : new ImDrawData(draw_data);
    }
    exports_1("GetDrawData", GetDrawData);
    // IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
    function NewFrame() { bind.NewFrame(); }
    exports_1("NewFrame", NewFrame);
    // IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
    function Render() { bind.Render(); }
    exports_1("Render", Render);
    // IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
    function EndFrame() { bind.EndFrame(); }
    exports_1("EndFrame", EndFrame);
    // Demo, Debug, Informations
    // IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
    function ShowDemoWindow(p_open = null) { bind.ShowDemoWindow(p_open); }
    exports_1("ShowDemoWindow", ShowDemoWindow);
    // IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
    function ShowMetricsWindow(p_open = null) {
        if (p_open === null) {
            bind.ShowMetricsWindow(null);
        }
        else if (Array.isArray(p_open)) {
            bind.ShowMetricsWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            const ret = bind.ShowMetricsWindow(ref_open);
            p_open(ref_open[0]);
            return ret;
        }
    }
    exports_1("ShowMetricsWindow", ShowMetricsWindow);
    // IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
    function ShowStyleEditor(ref = null) {
        if (ref === null) {
            bind.ShowStyleEditor(null);
        }
        else if (ref.internal instanceof bind.ImGuiStyle) {
            bind.ShowStyleEditor(ref.internal);
        }
        else {
            const native = new bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(ref);
            bind.ShowStyleEditor(native);
            ref.Copy(wrap);
            native.delete();
        }
    }
    exports_1("ShowStyleEditor", ShowStyleEditor);
    // IMGUI_API bool          ShowStyleSelector(const char* label);
    function ShowStyleSelector(label) { return bind.ShowStyleSelector(label); }
    exports_1("ShowStyleSelector", ShowStyleSelector);
    // IMGUI_API void          ShowFontSelector(const char* label);
    function ShowFontSelector(label) { bind.ShowFontSelector(label); }
    exports_1("ShowFontSelector", ShowFontSelector);
    // IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
    function ShowUserGuide() { bind.ShowUserGuide(); }
    exports_1("ShowUserGuide", ShowUserGuide);
    // Styles
    // IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
    function StyleColorsClassic(dst = null) {
        if (dst === null) {
            bind.StyleColorsClassic(null);
        }
        else if (dst.internal instanceof bind.ImGuiStyle) {
            bind.StyleColorsClassic(dst.internal);
        }
        else {
            const native = new bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            bind.StyleColorsClassic(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    exports_1("StyleColorsClassic", StyleColorsClassic);
    // IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
    function StyleColorsDark(dst = null) {
        if (dst === null) {
            bind.StyleColorsDark(null);
        }
        else if (dst.internal instanceof bind.ImGuiStyle) {
            bind.StyleColorsDark(dst.internal);
        }
        else {
            const native = new bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            bind.StyleColorsDark(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    exports_1("StyleColorsDark", StyleColorsDark);
    // IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
    function StyleColorsLight(dst = null) {
        if (dst === null) {
            bind.StyleColorsLight(null);
        }
        else if (dst.internal instanceof bind.ImGuiStyle) {
            bind.StyleColorsLight(dst.internal);
        }
        else {
            const native = new bind.ImGuiStyle();
            const wrap = new ImGuiStyle(native);
            wrap.Copy(dst);
            bind.StyleColorsLight(native);
            dst.Copy(wrap);
            native.delete();
        }
    }
    exports_1("StyleColorsLight", StyleColorsLight);
    // Window
    // IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
    function Begin(name, open = null, flags = 0) {
        if (open === null) {
            return bind.Begin(name, null, flags);
        }
        else if (Array.isArray(open)) {
            return bind.Begin(name, open, flags);
        }
        else {
            const ref_open = [open()];
            const opened = bind.Begin(name, ref_open, flags);
            open(ref_open[0]);
            return opened;
        }
    }
    exports_1("Begin", Begin);
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
    function BeginChild(id, size = ImVec2.ZERO, border = false, extra_flags = 0) {
        return bind.BeginChild(id, size, border, extra_flags);
    }
    exports_1("BeginChild", BeginChild);
    // IMGUI_API void          EndChild();
    function EndChild() {
        bind.EndChild();
    }
    exports_1("EndChild", EndChild);
    // IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
    function GetContentRegionMax(out = new ImVec2()) {
        return bind.GetContentRegionMax(out);
    }
    exports_1("GetContentRegionMax", GetContentRegionMax);
    // IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
    function GetContentRegionAvail(out = new ImVec2()) {
        return bind.GetContentRegionAvail(out);
    }
    exports_1("GetContentRegionAvail", GetContentRegionAvail);
    // IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
    function GetWindowContentRegionMin(out = new ImVec2()) {
        return bind.GetWindowContentRegionMin(out);
    }
    exports_1("GetWindowContentRegionMin", GetWindowContentRegionMin);
    // IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
    function GetWindowContentRegionMax(out = new ImVec2()) {
        return bind.GetWindowContentRegionMax(out);
    }
    exports_1("GetWindowContentRegionMax", GetWindowContentRegionMax);
    // IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
    function GetWindowDrawList() {
        return new ImDrawList(bind.GetWindowDrawList());
    }
    exports_1("GetWindowDrawList", GetWindowDrawList);
    // IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
    function GetWindowPos(out = new ImVec2()) {
        return bind.GetWindowPos(out);
    }
    exports_1("GetWindowPos", GetWindowPos);
    // IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
    function GetWindowSize(out = new ImVec2()) {
        return bind.GetWindowSize(out);
    }
    exports_1("GetWindowSize", GetWindowSize);
    // IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
    function SetNextWindowPos(pos, cond = 0, pivot = ImVec2.ZERO) {
        bind.SetNextWindowPos(pos, cond, pivot);
    }
    exports_1("SetNextWindowPos", SetNextWindowPos);
    // IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
    function SetNextWindowSize(pos, cond = 0) {
        bind.SetNextWindowSize(pos, cond);
    }
    exports_1("SetNextWindowSize", SetNextWindowSize);
    // IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
    function SetNextWindowSizeConstraints(size_min, size_max, custom_callback = null, custom_callback_data = null) {
        if (custom_callback) {
            function _custom_callback(data) {
                if (custom_callback) {
                    const _data = new ImGuiSizeCallbackData(data);
                    custom_callback(_data);
                    _data.delete();
                }
            }
            bind.SetNextWindowSizeConstraints(size_min, size_max, _custom_callback, custom_callback_data);
        }
        else {
            bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
        }
    }
    exports_1("SetNextWindowSizeConstraints", SetNextWindowSizeConstraints);
    // IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
    function SetNextWindowContentSize(size) {
        bind.SetNextWindowContentSize(size);
    }
    exports_1("SetNextWindowContentSize", SetNextWindowContentSize);
    // IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
    function SetNextWindowCollapsed(collapsed, cond = 0) {
        bind.SetNextWindowCollapsed(collapsed, cond);
    }
    exports_1("SetNextWindowCollapsed", SetNextWindowCollapsed);
    // IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
    // IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
    // IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
    // IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
    // IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
    // IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
    // IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
    // IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
    function SetWindowPos(name_or_pos, pos_or_cond = 0, cond = 0) {
        if (typeof (name_or_pos) === "string") {
            bind.SetWindowNamePos(name_or_pos, pos_or_cond, cond);
            return;
        }
        else {
            bind.SetWindowPos(name_or_pos, pos_or_cond);
        }
    }
    exports_1("SetWindowPos", SetWindowPos);
    function SetWindowSize(name_or_size, size_or_cond = 0, cond = 0) {
        if (typeof (name_or_size) === "string") {
            bind.SetWindowNamePos(name_or_size, size_or_cond, cond);
        }
        else {
            bind.SetWindowSize(name_or_size, size_or_cond);
        }
    }
    exports_1("SetWindowSize", SetWindowSize);
    function SetWindowCollapsed(name_or_collapsed, collapsed_or_cond = 0, cond = 0) {
        if (typeof (name_or_collapsed) === "string") {
            bind.SetWindowNameCollapsed(name_or_collapsed, collapsed_or_cond, cond);
        }
        else {
            bind.SetWindowCollapsed(name_or_collapsed, collapsed_or_cond);
        }
    }
    exports_1("SetWindowCollapsed", SetWindowCollapsed);
    function SetWindowFocus(name) {
        if (typeof (name) === "string") {
            bind.SetWindowNameFocus(name);
        }
        else {
            bind.SetWindowFocus();
        }
    }
    exports_1("SetWindowFocus", SetWindowFocus);
    // IMGUI_API void          SetScrollHere(float center_y_ratio = 0.5f);                         // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    function SetScrollHere(center_y_ratio = 0.5) {
        bind.SetScrollHere(center_y_ratio);
    }
    exports_1("SetScrollHere", SetScrollHere);
    // IMGUI_API void          SetScrollFromPosY(float pos_y, float center_y_ratio = 0.5f);        // adjust scrolling amount to make given position valid. use GetCursorPos() or GetCursorStartPos()+offset to get valid positions.
    function SetScrollFromPosY(pos_y, center_y_ratio = 0.5) {
        bind.SetScrollFromPosY(pos_y, center_y_ratio);
    }
    exports_1("SetScrollFromPosY", SetScrollFromPosY);
    // IMGUI_API void          SetStateStorage(ImGuiStorage* tree);                                // replace tree state storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
    // IMGUI_API ImGuiStorage* GetStateStorage();
    // Parameters stacks (shared)
    // IMGUI_API void          PushFont(ImFont* font);                                             // use NULL as a shortcut to push default font
    function PushFont(font) { }
    exports_1("PushFont", PushFont);
    // IMGUI_API void          PopFont();
    function PopFont() { }
    exports_1("PopFont", PopFont);
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
    function PushStyleColor(idx, col) {
        if (col instanceof ImColor) {
            bind.PushStyleColor(idx, col.Value);
        }
        else {
            bind.PushStyleColor(idx, col);
        }
    }
    exports_1("PushStyleColor", PushStyleColor);
    // IMGUI_API void          PopStyleColor(int count = 1);
    function PopStyleColor(count = 1) {
        bind.PopStyleColor(count);
    }
    exports_1("PopStyleColor", PopStyleColor);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
    function PushStyleVar(idx, val) {
        bind.PushStyleVar(idx, val);
    }
    exports_1("PushStyleVar", PushStyleVar);
    // IMGUI_API void          PopStyleVar(int count = 1);
    function PopStyleVar(count = 1) {
        bind.PopStyleVar(count);
    }
    exports_1("PopStyleVar", PopStyleVar);
    // IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
    function GetStyleColorVec4(idx) {
        return bind.GetStyleColorVec4(idx);
    }
    exports_1("GetStyleColorVec4", GetStyleColorVec4);
    // IMGUI_API ImFont*       GetFont();                                                          // get current font
    function GetFont() {
        return new ImFont(bind.GetFont());
    }
    exports_1("GetFont", GetFont);
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    function GetFontTexUvWhitePixel(out = new ImVec2()) {
        return bind.GetFontTexUvWhitePixel(out);
    }
    exports_1("GetFontTexUvWhitePixel", GetFontTexUvWhitePixel);
    // IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);                  // retrieve given style color with style alpha applied and optional extra alpha multiplier
    // IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                     // retrieve given color with style alpha applied
    // IMGUI_API ImU32         GetColorU32(ImU32 col);                                             // retrieve given color with style alpha applied
    function GetColorU32(idx, alpha_mul = 1.0) {
        return bind.GetColorU32(idx, alpha_mul);
    }
    exports_1("GetColorU32", GetColorU32);
    // IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    function PushTextWrapPos(wrap_pos_x = 0.0) {
        bind.PushTextWrapPos(wrap_pos_x);
    }
    exports_1("PushTextWrapPos", PushTextWrapPos);
    // IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
    function SameLine(pos_x = 0.0, spacing_w = -1.0) {
        bind.SameLine(pos_x, spacing_w);
    }
    exports_1("SameLine", SameLine);
    // IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
    function Dummy(size) { bind.Dummy(size); }
    exports_1("Dummy", Dummy);
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
    function Indent(indent_w = 0.0) { bind.Indent(indent_w); }
    exports_1("Indent", Indent);
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
    function Unindent(indent_w = 0.0) { bind.Unindent(indent_w); }
    exports_1("Unindent", Unindent);
    // IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
    function GetCursorPos(out = new ImVec2()) { return bind.GetCursorPos(out); }
    exports_1("GetCursorPos", GetCursorPos);
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
    function SetCursorPos(local_pos) { bind.SetCursorPos(local_pos); }
    exports_1("SetCursorPos", SetCursorPos);
    // IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
    function GetCursorStartPos(out = new ImVec2()) { return bind.GetCursorStartPos(out); }
    exports_1("GetCursorStartPos", GetCursorStartPos);
    // IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    function GetCursorScreenPos(out = new ImVec2()) { return bind.GetCursorScreenPos(out); }
    exports_1("GetCursorScreenPos", GetCursorScreenPos);
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
    function SetCursorScreenPos(pos) { bind.SetCursorScreenPos(pos); }
    exports_1("SetCursorScreenPos", SetCursorScreenPos);
    // Columns
    // You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    function Columns(count = 1, id = null, border = true) {
        id = id || "";
        bind.Columns(count, id, border);
    }
    exports_1("Columns", Columns);
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    function GetColumnWidth(column_index = -1) {
        return bind.GetColumnWidth(column_index);
    }
    exports_1("GetColumnWidth", GetColumnWidth);
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    function GetColumnOffset(column_index = -1) {
        return bind.GetColumnOffset(column_index);
    }
    exports_1("GetColumnOffset", GetColumnOffset);
    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    function TextUnformatted(text) { bind.TextUnformatted(text); }
    exports_1("TextUnformatted", TextUnformatted);
    // IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
    // IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
    function Text(fmt /*, ...args: any[]*/) { bind.Text(fmt /*, ...args*/); }
    exports_1("Text", Text);
    // IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
    function TextColored(col, fmt /*, ...args: any[]*/) {
        bind.TextColored((col instanceof ImColor) ? col.Value : col, fmt /*, ...args*/);
    }
    exports_1("TextColored", TextColored);
    // IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
    function TextDisabled(fmt /*, ...args: any[]*/) { bind.TextDisabled(fmt /*, ...args*/); }
    exports_1("TextDisabled", TextDisabled);
    // IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
    // IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
    function TextWrapped(fmt /*, ...args: any[]*/) { bind.TextWrapped(fmt /*, ...args*/); }
    exports_1("TextWrapped", TextWrapped);
    // IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
    // IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
    function LabelText(label, fmt /*, ...args: any[]*/) { bind.LabelText(label, fmt /*, ...args*/); }
    exports_1("LabelText", LabelText);
    // IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
    // IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
    function BulletText(fmt /*, ...args: any[]*/) { bind.BulletText(fmt /*, ...args*/); }
    exports_1("BulletText", BulletText);
    // Widgets: Main
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
    function Button(label, size = ImVec2.ZERO) {
        return bind.Button(label, size);
    }
    exports_1("Button", Button);
    // IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
    function InvisibleButton(str_id, size) {
        return bind.InvisibleButton(str_id, size);
    }
    exports_1("InvisibleButton", InvisibleButton);
    // IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
    function Image(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, tint_col = ImVec4.WHITE, border_col = ImVec4.ZERO) {
        bind.Image(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, tint_col, border_col);
    }
    exports_1("Image", Image);
    // IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
    function ImageButton(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, frame_padding = -1, bg_col = ImVec4.ZERO, tint_col = ImVec4.WHITE) {
        return bind.ImageButton(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, frame_padding, bg_col, tint_col);
    }
    exports_1("ImageButton", ImageButton);
    // IMGUI_API bool          Checkbox(const char* label, bool* v);
    function Checkbox(label, v) {
        if (Array.isArray(v)) {
            return bind.Checkbox(label, v);
        }
        else {
            const ref_v = [v()];
            const ret = bind.Checkbox(label, ref_v);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("Checkbox", Checkbox);
    // IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
    function CheckboxFlags(label, flags, flags_value) {
        if (Array.isArray(flags)) {
            return bind.CheckboxFlags(label, flags, flags_value);
        }
        else {
            const ref_flags = [flags()];
            const ret = bind.CheckboxFlags(label, ref_flags, flags_value);
            flags(ref_flags[0]);
            return ret;
        }
    }
    exports_1("CheckboxFlags", CheckboxFlags);
    // IMGUI_API bool          RadioButton(const char* label, bool active);
    // IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);
    function RadioButton(label, active_or_v, v_button) {
        if (typeof (active_or_v) === "boolean" || Array.isArray(active_or_v)) {
            return bind.RadioButton(label, active_or_v, v_button);
        }
        else {
            const ref_v = [active_or_v()];
            const ret = bind.RadioButton(label, ref_v, v_button);
            active_or_v(ref_v[0]);
            return ret;
        }
    }
    exports_1("RadioButton", RadioButton);
    // IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
    function PlotLines_Array(label, values, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO, stride = 1) {
        function values_getter(data, idx) {
            return values[idx];
        }
        PlotLines_Callback(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotLines_Array", PlotLines_Array);
    // IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
    function PlotLines_Callback(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
        bind.PlotLines(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotLines_Callback", PlotLines_Callback);
    function PlotLines(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
        PlotLines_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotLines", PlotLines);
    // IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
    function PlotHistogram_Array(label, values, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO, stride = 1) {
        function values_getter(data, idx) {
            return values[idx];
        }
        PlotHistogram(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotHistogram_Array", PlotHistogram_Array);
    // IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
    function PlotHistogram_Callback(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
        bind.PlotHistogram(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotHistogram_Callback", PlotHistogram_Callback);
    function PlotHistogram(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
        PlotHistogram_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
    }
    exports_1("PlotHistogram", PlotHistogram);
    // IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
    function ProgressBar(fraction, size_arg = new ImVec2(-1, 0), overlay = null) {
        bind.ProgressBar(fraction, size_arg, overlay);
    }
    exports_1("ProgressBar", ProgressBar);
    // Widgets: Combo Box
    // The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it.
    // The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
    // IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
    function BeginCombo(label, preview_value, flags = 0) {
        return bind.BeginCombo(label, preview_value, flags);
    }
    exports_1("BeginCombo", BeginCombo);
    // IMGUI_API void          EndCombo();
    function EndCombo() { bind.EndCombo(); }
    exports_1("EndCombo", EndCombo);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
    // IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
    function CalcMaxPopupHeightFromItemCount(items_count) {
        // ImGuiContext& g = *GImGui;
        // const io: ImGuiIO = GetIO();
        const style = GetStyle();
        if (items_count <= 0)
            return Number.MAX_VALUE;
        // return (g.FontSize + g.Style.ItemSpacing.y) * items_count - g.Style.ItemSpacing.y + (g.Style.WindowPadding.y * 2);
        return (bind.GetFontSize() + style.ItemSpacing.y) * items_count - style.ItemSpacing.y + (style.WindowPadding.y * 2);
    }
    function Combo(label, current_item, items, items_count = items.length, popup_max_height_in_items = -1) {
        // return bind.Combo(label, current_item, items, items_count, popup_max_height_in_items);
        const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
        if (typeof (items) === "string") {
            items = items.replace(/^\0+|\0+$/g, "").split("\0");
            items_count = items.length;
            // popup_max_height_in_items = items_count;
        }
        // const char* preview_text = NULL;
        let preview_text = "";
        // if (*current_item >= 0 && *current_item < items_count)
        //     items_getter(data, *current_item, &preview_text);
        if (_current_item[0] >= 0 && _current_item[0] < items_count)
            preview_text = items[_current_item[0]];
        // The old Combo() API exposed "popup_max_height_in_items", however the new more general BeginCombo() API doesn't, so we emulate it here.
        // if (popup_max_height_in_items != -1 && !g.SetNextWindowSizeConstraint)
        // {
        //     float popup_max_height = CalcMaxPopupHeightFromItemCount(popup_max_height_in_items);
        //     SetNextWindowSizeConstraints(ImVec2(0,0), ImVec2(FLT_MAX, popup_max_height));
        // }
        if (popup_max_height_in_items !== -1 /*&& !g.SetNextWindowSizeConstraint*/) {
            const popup_max_height = CalcMaxPopupHeightFromItemCount(popup_max_height_in_items);
            SetNextWindowSizeConstraints(ImVec2.ZERO, new ImVec2(Number.MAX_VALUE, popup_max_height));
        }
        if (!bind.BeginCombo(label, preview_text, 0))
            return false;
        // Display items
        // FIXME-OPT: Use clipper (but we need to disable it on the appearing frame to make sure our call to SetItemDefaultFocus() is processed)
        let value_changed = false;
        for (let i = 0; i < items_count; i++) {
            bind.PushID(i.toString());
            const item_selected = (i === _current_item[0]);
            // const char* item_text;
            const item_text = items[i];
            // if (!items_getter(data, i, &item_text))
            //     item_text = "*Unknown item*";
            if (Selectable(item_text, item_selected)) {
                value_changed = true;
                _current_item[0] = i;
            }
            if (item_selected)
                bind.SetItemDefaultFocus();
            bind.PopID();
        }
        EndCombo();
        if (!Array.isArray(current_item)) {
            current_item(_current_item[0]);
        }
        return value_changed;
    }
    exports_1("Combo", Combo);
    function Combo_2(label, current_item, items, popup_max_height_in_items = -1) {
        return false;
    }
    exports_1("Combo_2", Combo_2);
    function Combo_3(label, current_item, items_getter, data, items_count, popup_max_height_in_items = -1) {
        return false;
    }
    exports_1("Combo_3", Combo_3);
    // export function Combo(label: string, current_item: ImScalar<number>, ...args: any[]): boolean {
    //     return false;
    // }
    // Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
    // IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
    function DragFloat(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.DragFloat(label, v, v_speed, v_min, v_max, display_format, power);
        }
        else {
            const ref_v = [v()];
            const ret = bind.DragFloat(label, ref_v, v_speed, v_min, v_max, display_format, power);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("DragFloat", DragFloat);
    // IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat2(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        if (v instanceof ImVec2) {
            const _v = [v.x, v.y];
            const ret = bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, power);
            v.x = _v[0];
            v.y = _v[1];
            return ret;
        }
        else {
            return bind.DragFloat2(label, v, v_speed, v_min, v_max, display_format, power);
        }
    }
    exports_1("DragFloat2", DragFloat2);
    // IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat3(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        return bind.DragFloat3(label, v, v_speed, v_min, v_max, display_format, power);
    }
    exports_1("DragFloat3", DragFloat3);
    // IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    function DragFloat4(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
        if (v instanceof ImVec4) {
            const _v = [v.x, v.y, v.z, v.w];
            const ret = bind.DragFloat4(label, _v, v_speed, v_min, v_max, display_format, power);
            v.x = _v[0];
            v.y = _v[1];
            v.z = _v[2];
            v.w = _v[3];
            return ret;
        }
        else {
            return bind.DragFloat4(label, v, v_speed, v_min, v_max, display_format, power);
        }
    }
    exports_1("DragFloat4", DragFloat4);
    // IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", const char* display_format_max = NULL, float power = 1.0f);
    function DragFloatRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", display_format_max = null, power = 1.0) {
        const ref_v_current_min = Array.isArray(v_current_min) ? v_current_min : [v_current_min()];
        const ref_v_current_max = Array.isArray(v_current_max) ? v_current_max : [v_current_max()];
        const ret = bind.DragFloatRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max, power);
        if (!Array.isArray(v_current_min)) {
            v_current_min(ref_v_current_min[0]);
        }
        if (!Array.isArray(v_current_max)) {
            v_current_max(ref_v_current_max[0]);
        }
        return ret;
    }
    exports_1("DragFloatRange2", DragFloatRange2);
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");                                       // If v_min >= v_max we have no bound
    function DragInt(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
        if (Array.isArray(v)) {
            return bind.DragInt(label, v, v_speed, v_min, v_max, display_format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.DragInt(label, ref_v, v_speed, v_min, v_max, display_format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("DragInt", DragInt);
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    function DragInt2(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
        return bind.DragInt2(label, v, v_speed, v_min, v_max, display_format);
    }
    exports_1("DragInt2", DragInt2);
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    function DragInt3(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
        return bind.DragInt3(label, v, v_speed, v_min, v_max, display_format);
    }
    exports_1("DragInt3", DragInt3);
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    function DragInt4(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
        return bind.DragInt4(label, v, v_speed, v_min, v_max, display_format);
    }
    exports_1("DragInt4", DragInt4);
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
    function DragIntRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f", display_format_max = null) {
        const ref_v_current_min = Array.isArray(v_current_min) ? v_current_min : [v_current_min()];
        const ref_v_current_max = Array.isArray(v_current_max) ? v_current_max : [v_current_max()];
        const ret = bind.DragIntRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max);
        if (!Array.isArray(v_current_min)) {
            v_current_min(ref_v_current_min[0]);
        }
        if (!Array.isArray(v_current_max)) {
            v_current_max(ref_v_current_max[0]);
        }
        return ret;
    }
    exports_1("DragIntRange2", DragIntRange2);
    function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, flags = 0, callback = null, user_data = null) {
        InputText_user_data = user_data;
        function _callback(data) {
            const _data = new ImGuiTextEditCallbackData(data, InputText_user_data);
            const ret = callback === null ? 0 : callback(_data);
            _data.delete();
            return ret;
        }
        if (Array.isArray(buf)) {
            return bind.InputText(label, buf, buf_size, flags, callback === null ? null : _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = bind.InputText(label, ref_buf, _buf_size, flags, callback === null ? null : _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = bind.InputText(label, ref_buf, buf_size, flags, callback === null ? null : _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputText", InputText);
    function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
        InputTextMultiline_user_data = user_data;
        function _callback(data) {
            const _data = new ImGuiTextEditCallbackData(data, InputTextMultiline_user_data);
            const ret = callback === null ? 0 : callback(_data);
            _data.delete();
            return ret;
        }
        if (Array.isArray(buf)) {
            return bind.InputTextMultiline(label, buf, buf_size, size, flags, callback === null ? null : _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, callback === null ? null : _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, callback === null ? null : _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputTextMultiline", InputTextMultiline);
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    function InputFloat(label, v, step = 0.0, step_fast = 0.0, decimal_precision = -1, extra_flags = 0) {
        if (Array.isArray(v)) {
            return bind.InputFloat(label, v, step, step_fast, decimal_precision, extra_flags);
        }
        else {
            const ref_v = [v()];
            const ret = bind.InputFloat(label, ref_v, step, step_fast, decimal_precision, extra_flags);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("InputFloat", InputFloat);
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    function InputFloat2(label, v, decimal_precision = -1, extra_flags = 0) {
        return bind.InputFloat2(label, v, decimal_precision, extra_flags);
    }
    exports_1("InputFloat2", InputFloat2);
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    function InputFloat3(label, v, decimal_precision = -1, extra_flags = 0) {
        return bind.InputFloat3(label, v, decimal_precision, extra_flags);
    }
    exports_1("InputFloat3", InputFloat3);
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    function InputFloat4(label, v, decimal_precision = -1, extra_flags = 0) {
        return bind.InputFloat4(label, v, decimal_precision, extra_flags);
    }
    exports_1("InputFloat4", InputFloat4);
    // IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
    function InputInt(label, v, step = 1, step_fast = 100, extra_flags = 0) {
        if (Array.isArray(v)) {
            return bind.InputInt(label, v, step, step_fast, extra_flags);
        }
        else {
            const ref_v = [v()];
            const ret = bind.InputInt(label, ref_v, step, step_fast, extra_flags);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("InputInt", InputInt);
    // IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
    function InputInt2(label, v, extra_flags = 0) {
        return bind.InputInt2(label, v, extra_flags);
    }
    exports_1("InputInt2", InputInt2);
    // IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
    function InputInt3(label, v, extra_flags = 0) {
        return bind.InputInt3(label, v, extra_flags);
    }
    exports_1("InputInt3", InputInt3);
    // IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
    function InputInt4(label, v, extra_flags = 0) {
        return bind.InputInt4(label, v, extra_flags);
    }
    exports_1("InputInt4", InputInt4);
    // Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);     // adjust display_format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
    function SliderFloat(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.SliderFloat(label, v, v_min, v_max, display_format, power);
        }
        else {
            const ref_v = [v()];
            const ret = bind.SliderFloat(label, ref_v, v_min, v_max, display_format, power);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("SliderFloat", SliderFloat);
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    function SliderFloat2(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.SliderFloat2(label, v, v_min, v_max, display_format, power);
        }
        else {
            const _v = [v.x, v.y];
            const ret = bind.SliderFloat2(label, _v, v_min, v_max, display_format, power);
            v.x = _v[0];
            v.y = _v[1];
            return ret;
        }
    }
    exports_1("SliderFloat2", SliderFloat2);
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    function SliderFloat3(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
        return bind.SliderFloat3(label, v, v_min, v_max, display_format, power);
    }
    exports_1("SliderFloat3", SliderFloat3);
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    function SliderFloat4(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
        return bind.SliderFloat4(label, v, v_min, v_max, display_format, power);
    }
    exports_1("SliderFloat4", SliderFloat4);
    // IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
    function SliderAngle(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0) {
        if (Array.isArray(v_rad)) {
            return bind.SliderAngle(label, v_rad, v_degrees_min, v_degrees_max);
        }
        else {
            const ref_v_rad = [v_rad()];
            const ret = bind.SliderAngle(label, ref_v_rad, v_degrees_min, v_degrees_max);
            v_rad(ref_v_rad[0]);
            return ret;
        }
    }
    exports_1("SliderAngle", SliderAngle);
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* display_format = "%.0f");
    function SliderInt(label, v, v_min, v_max, display_format = "%.0f") {
        if (Array.isArray(v)) {
            return bind.SliderInt(label, v, v_min, v_max, display_format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.SliderInt(label, ref_v, v_min, v_max, display_format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("SliderInt", SliderInt);
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* display_format = "%.0f");
    function SliderInt2(label, v, v_min, v_max, display_format = "%.0f") {
        return bind.SliderInt2(label, v, v_min, v_max, display_format);
    }
    exports_1("SliderInt2", SliderInt2);
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* display_format = "%.0f");
    function SliderInt3(label, v, v_min, v_max, display_format = "%.0f") {
        return bind.SliderInt3(label, v, v_min, v_max, display_format);
    }
    exports_1("SliderInt3", SliderInt3);
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* display_format = "%.0f");
    function SliderInt4(label, v, v_min, v_max, display_format = "%.0f") {
        return bind.SliderInt4(label, v, v_min, v_max, display_format);
    }
    exports_1("SliderInt4", SliderInt4);
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    function VSliderFloat(label, size, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.VSliderFloat(label, size, v, v_min, v_max, display_format, power);
        }
        else {
            const ref_v = [v()];
            const ret = bind.VSliderFloat(label, size, ref_v, v_min, v_max, display_format, power);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("VSliderFloat", VSliderFloat);
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* display_format = "%.0f");
    function VSliderInt(label, size, v, v_min, v_max, display_format = "%.0f") {
        if (Array.isArray(v)) {
            return bind.VSliderInt(label, size, v, v_min, v_max, display_format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.VSliderInt(label, size, ref_v, v_min, v_max, display_format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("VSliderInt", VSliderInt);
    // Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
    // Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
    // IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    function ColorEdit3(label, col, flags = 0) {
        if (Array.isArray(col)) {
            return bind.ColorEdit3(label, col, flags);
        }
        else {
            const _col = [col.x, col.y, col.z];
            const ret = bind.ColorEdit3(label, _col, flags);
            col.x = _col[0];
            col.y = _col[1];
            col.z = _col[2];
            return ret;
        }
    }
    exports_1("ColorEdit3", ColorEdit3);
    // IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
    function ColorEdit4(label, col, flags = 0) {
        if (Array.isArray(col)) {
            return bind.ColorEdit4(label, col, flags);
        }
        else {
            const _col = [col.x, col.y, col.z, col.w];
            const ret = bind.ColorEdit4(label, _col, flags);
            col.x = _col[0];
            col.y = _col[1];
            col.z = _col[2];
            col.w = _col[3];
            return ret;
        }
    }
    exports_1("ColorEdit4", ColorEdit4);
    // IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    function ColorPicker3(label, col, flags = 0) {
        if (Array.isArray(col)) {
            return bind.ColorPicker3(label, col, flags);
        }
        else {
            const _col = [col.x, col.y, col.z];
            const ret = bind.ColorPicker3(label, _col, flags);
            col.x = _col[0];
            col.y = _col[1];
            col.z = _col[2];
            return ret;
        }
    }
    exports_1("ColorPicker3", ColorPicker3);
    // IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
    function ColorPicker4(label, col, flags = 0, ref_col = null) {
        if (Array.isArray(col)) {
            return bind.ColorPicker4(label, col, flags, ref_col);
        }
        else {
            const _col = [col.x, col.y, col.z, col.w];
            const ret = bind.ColorPicker4(label, _col, flags, ref_col);
            col.x = _col[0];
            col.y = _col[1];
            col.z = _col[2];
            col.w = _col[3];
            return ret;
        }
    }
    exports_1("ColorPicker4", ColorPicker4);
    // IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
    function ColorButton(desc_id, col, flags = 0, size = ImVec2.ZERO) {
        return bind.ColorButton(desc_id, col, flags, size);
    }
    exports_1("ColorButton", ColorButton);
    // IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
    function SetColorEditOptions(flags) {
        bind.SetColorEditOptions(flags);
    }
    exports_1("SetColorEditOptions", SetColorEditOptions);
    // Widgets: Trees
    // IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
    // IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
    // IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
    // IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
    // IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
    function TreeNode(label_or_id, fmt) {
        return bind.TreeNode(label_or_id, fmt || ((typeof (label_or_id) === "string") ? label_or_id : ""));
    }
    exports_1("TreeNode", TreeNode);
    // IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
    // IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    // IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    function TreeNodeEx(label_or_id, flags = 0, fmt) {
        return bind.TreeNodeEx(label_or_id, flags, fmt || ((typeof (label_or_id) === "string") ? label_or_id : ""));
    }
    exports_1("TreeNodeEx", TreeNodeEx);
    // IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    function SetNextTreeNodeOpen(is_open, cond = 0) {
        bind.SetNextTreeNodeOpen(is_open, cond);
    }
    exports_1("SetNextTreeNodeOpen", SetNextTreeNodeOpen);
    // IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
    // IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
    function CollapsingHeader(label, flags_or_p_open = 0, flags = 0) {
        if (Array.isArray(flags_or_p_open)) {
            return bind.CollapsingHeader(label, flags_or_p_open, flags);
        }
        else if (typeof (flags_or_p_open) === "number") {
            return bind.CollapsingHeader(label, null, flags_or_p_open);
        }
        else {
            const ref_open = [flags_or_p_open()];
            const ret = bind.CollapsingHeader(label, ref_open, flags);
            flags_or_p_open(ref_open[0]);
            return ret;
        }
    }
    exports_1("CollapsingHeader", CollapsingHeader);
    // Widgets: Selectable / Lists
    // IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
    // IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
    function Selectable(label, selected = false, flags = 0, size = ImVec2.ZERO) {
        if (typeof (selected) === "boolean" || Array.isArray(selected)) {
            return bind.Selectable(label, selected, flags, size);
        }
        else {
            const ref_selected = [selected()];
            const ret = bind.Selectable(label, ref_selected, flags, size);
            selected(ref_selected[0]);
            return ret;
        }
    }
    exports_1("Selectable", Selectable);
    // IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
    // IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
    function ListBox(label, current_item, items, items_count = items.length, height_in_items = -1) {
        if (Array.isArray(current_item)) {
            return bind.ListBox(label, current_item, items, items_count, height_in_items);
        }
        else {
            const ref_current_item = [current_item()];
            const ret = bind.ListBox(label, ref_current_item, items, items_count, height_in_items);
            current_item(ref_current_item[0]);
            return ret;
        }
    }
    exports_1("ListBox", ListBox);
    // IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
    // IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
    function ListBoxHeader(label, size) {
        return bind.ListBoxHeader(label, size);
    }
    exports_1("ListBoxHeader", ListBoxHeader);
    // IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
    function ListBoxFooter() {
        bind.ListBoxFooter();
    }
    exports_1("ListBoxFooter", ListBoxFooter);
    // Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
    // IMGUI_API void          Value(const char* prefix, bool b);
    // IMGUI_API void          Value(const char* prefix, int v);
    // IMGUI_API void          Value(const char* prefix, unsigned int v);
    // IMGUI_API void          Value(const char* prefix, float v, const char* float_format = NULL);
    function Value(prefix, ...args) {
    }
    exports_1("Value", Value);
    // Tooltips
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    function SetTooltip(fmt) {
        bind.SetTooltip(fmt);
    }
    exports_1("SetTooltip", SetTooltip);
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    function BeginMenu(label, enabled = true) { return bind.BeginMenu(label, enabled); }
    exports_1("BeginMenu", BeginMenu);
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
    function MenuItem(label, shortcut = null, selected = false, enabled = true) {
        if (shortcut === null) {
            shortcut = "";
        }
        if (typeof (selected) === "boolean") {
            selected = [selected];
            return bind.MenuItem(label, shortcut, selected, enabled);
        }
        else if (Array.isArray(selected)) {
            return bind.MenuItem(label, shortcut, selected, enabled);
        }
        else {
            const ref_selected = [selected()];
            const ret = bind.MenuItem(label, shortcut, ref_selected, enabled);
            selected(ref_selected[0]);
            return ret;
        }
    }
    exports_1("MenuItem", MenuItem);
    // IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
    function OpenPopupOnItemClick(str_id = "", mouse_button = 1) {
        return bind.OpenPopupOnItemClick(str_id, mouse_button);
    }
    exports_1("OpenPopupOnItemClick", OpenPopupOnItemClick);
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
    function BeginPopupModal(str_id = "", p_open = null, extra_flags = 0) {
        p_open = p_open || [true];
        return bind.BeginPopupModal(str_id, p_open, extra_flags);
    }
    exports_1("BeginPopupModal", BeginPopupModal);
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    function BeginPopupContextItem(str_id = "", mouse_button = 1) {
        return bind.BeginPopupContextItem(str_id, mouse_button);
    }
    exports_1("BeginPopupContextItem", BeginPopupContextItem);
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
    function BeginPopupContextWindow(str_id = "", mouse_button = 1, also_over_items = true) {
        return bind.BeginPopupContextWindow(str_id, mouse_button, also_over_items);
    }
    exports_1("BeginPopupContextWindow", BeginPopupContextWindow);
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
    function BeginPopupContextVoid(str_id = "", mouse_button = 1) {
        return bind.BeginPopupContextVoid(str_id, mouse_button);
    }
    exports_1("BeginPopupContextVoid", BeginPopupContextVoid);
    // Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
    // IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
    function LogToTTY(max_depth = -1) {
        bind.LogToTTY(max_depth);
    }
    exports_1("LogToTTY", LogToTTY);
    // IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
    function LogToFile(max_depth = -1, filename = null) {
        bind.LogToFile(max_depth, filename);
    }
    exports_1("LogToFile", LogToFile);
    // IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
    function LogToClipboard(max_depth = -1) {
        bind.LogToClipboard(max_depth);
    }
    exports_1("LogToClipboard", LogToClipboard);
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    function LogText(fmt) {
        bind.LogText(fmt);
    }
    exports_1("LogText", LogText);
    // Drag and Drop
    // [BETA API] Missing Demo code. API may evolve.
    // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
    function BeginDragDropSource(flags = 0, mouse_button = 0) {
        return false;
    }
    exports_1("BeginDragDropSource", BeginDragDropSource);
    // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
    function SetDragDropPayload(type, data, size, cond = 0) {
        return false;
    }
    exports_1("SetDragDropPayload", SetDragDropPayload);
    // IMGUI_API void          EndDragDropSource();
    function EndDragDropSource() {
    }
    exports_1("EndDragDropSource", EndDragDropSource);
    // IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
    function BeginDragDropTarget() {
        return false;
    }
    exports_1("BeginDragDropTarget", BeginDragDropTarget);
    // IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
    function AcceptDragDropPayload(type, flags = 0) {
        return null;
    }
    exports_1("AcceptDragDropPayload", AcceptDragDropPayload);
    // IMGUI_API void          EndDragDropTarget();
    function EndDragDropTarget() {
    }
    exports_1("EndDragDropTarget", EndDragDropTarget);
    // Clipping
    // IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
    function PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect) {
        bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    exports_1("PushClipRect", PushClipRect);
    // IMGUI_API void          PopClipRect();
    function PopClipRect() {
        bind.PopClipRect();
    }
    exports_1("PopClipRect", PopClipRect);
    // IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
    function SetKeyboardFocusHere(offset = 0) {
        bind.SetKeyboardFocusHere(offset);
    }
    exports_1("SetKeyboardFocusHere", SetKeyboardFocusHere);
    // Utilities
    // IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
    function IsItemHovered(flags = 0) {
        return bind.IsItemHovered(flags);
    }
    exports_1("IsItemHovered", IsItemHovered);
    // IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
    function IsItemClicked(mouse_button = 0) {
        return bind.IsItemClicked(mouse_button);
    }
    exports_1("IsItemClicked", IsItemClicked);
    // IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
    function GetItemRectMin(out = new ImVec2()) {
        return bind.GetItemRectMin(out);
    }
    exports_1("GetItemRectMin", GetItemRectMin);
    // IMGUI_API ImVec2        GetItemRectMax();                                                   // "
    function GetItemRectMax(out = new ImVec2()) {
        return bind.GetItemRectMax(out);
    }
    exports_1("GetItemRectMax", GetItemRectMax);
    // IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
    function GetItemRectSize(out = new ImVec2()) {
        return bind.GetItemRectSize(out);
    }
    exports_1("GetItemRectSize", GetItemRectSize);
    // IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
    function IsWindowFocused(flags = 0) {
        return bind.IsWindowFocused(flags);
    }
    exports_1("IsWindowFocused", IsWindowFocused);
    // IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
    function IsWindowHovered(flags = 0) {
        return bind.IsWindowHovered(flags);
    }
    exports_1("IsWindowHovered", IsWindowHovered);
    // IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
    // IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
    function IsRectVisible(size_or_rect_min, rect_max) {
        return bind.IsRectVisible(size_or_rect_min, rect_max);
    }
    exports_1("IsRectVisible", IsRectVisible);
    // IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
    function GetOverlayDrawList() {
        return new ImDrawList(bind.GetOverlayDrawList());
    }
    exports_1("GetOverlayDrawList", GetOverlayDrawList);
    // IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
    function GetDrawListSharedData() {
        return new ImDrawListSharedData(bind.GetDrawListSharedData());
    }
    exports_1("GetDrawListSharedData", GetDrawListSharedData);
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    function CalcTextSize(text, text_end = null, hide_text_after_double_hash = false, wrap_width = -1, out = new ImVec2()) {
        return bind.CalcTextSize(text, text_end, hide_text_after_double_hash, wrap_width, out);
    }
    exports_1("CalcTextSize", CalcTextSize);
    // IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
    function CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end) {
        return bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
    }
    exports_1("CalcListClipping", CalcListClipping);
    // IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
    function BeginChildFrame(id, size, extra_flags = 0) {
        return bind.BeginChildFrame(id, size, extra_flags);
    }
    exports_1("BeginChildFrame", BeginChildFrame);
    // IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
    function ColorConvertU32ToFloat4(in_, out = new ImVec4()) {
        return bind.ColorConvertU32ToFloat4(in_, out);
    }
    exports_1("ColorConvertU32ToFloat4", ColorConvertU32ToFloat4);
    // IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
    function ColorConvertFloat4ToU32(in_) {
        return bind.ColorConvertFloat4ToU32(in_);
    }
    exports_1("ColorConvertFloat4ToU32", ColorConvertFloat4ToU32);
    // Inputs
    // IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
    function GetKeyIndex(imgui_key) {
        return bind.GetKeyIndex(imgui_key);
    }
    exports_1("GetKeyIndex", GetKeyIndex);
    // IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
    function IsKeyDown(user_key_index) {
        return bind.IsKeyDown(user_key_index);
    }
    exports_1("IsKeyDown", IsKeyDown);
    // IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
    function IsKeyPressed(user_key_index, repeat = true) {
        return bind.IsKeyPressed(user_key_index, repeat);
    }
    exports_1("IsKeyPressed", IsKeyPressed);
    // IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
    function IsKeyReleased(user_key_index) {
        return bind.IsKeyReleased(user_key_index);
    }
    exports_1("IsKeyReleased", IsKeyReleased);
    // IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
    function GetKeyPressedAmount(user_key_index, repeat_delay, rate) {
        return bind.GetKeyPressedAmount(user_key_index, repeat_delay, rate);
    }
    exports_1("GetKeyPressedAmount", GetKeyPressedAmount);
    // IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
    function IsMouseDown(button) {
        return bind.IsMouseDown(button);
    }
    exports_1("IsMouseDown", IsMouseDown);
    // IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
    function IsMouseClicked(button, repeat = false) {
        return bind.IsMouseClicked(button, repeat);
    }
    exports_1("IsMouseClicked", IsMouseClicked);
    // IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
    function IsMouseDoubleClicked(button) {
        return bind.IsMouseDoubleClicked(button);
    }
    exports_1("IsMouseDoubleClicked", IsMouseDoubleClicked);
    // IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
    function IsMouseReleased(button) {
        return bind.IsMouseReleased(button);
    }
    exports_1("IsMouseReleased", IsMouseReleased);
    // IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    function IsMouseDragging(button = 0, lock_threshold = -1.0) {
        return bind.IsMouseDragging(button, lock_threshold);
    }
    exports_1("IsMouseDragging", IsMouseDragging);
    // IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
    function IsMouseHoveringRect(r_min, r_max, clip = true) {
        return bind.IsMouseHoveringRect(r_min, r_max, clip);
    }
    exports_1("IsMouseHoveringRect", IsMouseHoveringRect);
    // IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
    function IsMousePosValid(mouse_pos = null) {
        return bind.IsMousePosValid(mouse_pos);
    }
    exports_1("IsMousePosValid", IsMousePosValid);
    // IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
    function GetMousePos(out = new ImVec2()) {
        return bind.GetMousePos(out);
    }
    exports_1("GetMousePos", GetMousePos);
    // IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
    function GetMousePosOnOpeningCurrentPopup(out = new ImVec2()) {
        return bind.GetMousePosOnOpeningCurrentPopup(out);
    }
    exports_1("GetMousePosOnOpeningCurrentPopup", GetMousePosOnOpeningCurrentPopup);
    // IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    function GetMouseDragDelta(button = 0, lock_threshold = -1.0, out = new ImVec2()) {
        return bind.GetMouseDragDelta(button, lock_threshold, out);
    }
    exports_1("GetMouseDragDelta", GetMouseDragDelta);
    // IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
    function ResetMouseDragDelta(button = 0) {
        bind.ResetMouseDragDelta(button);
    }
    exports_1("ResetMouseDragDelta", ResetMouseDragDelta);
    // IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
    function CaptureKeyboardFromApp(capture = true) {
        return bind.CaptureKeyboardFromApp(capture);
    }
    exports_1("CaptureKeyboardFromApp", CaptureKeyboardFromApp);
    // IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
    function CaptureMouseFromApp(capture = true) {
        bind.CaptureMouseFromApp(capture);
    }
    exports_1("CaptureMouseFromApp", CaptureMouseFromApp);
    var Bind, bind, config, IMGUI_VERSION, ImStringBuffer, ImGuiWindowFlags, ImGuiInputTextFlags, ImGuiTreeNodeFlags, ImGuiSelectableFlags, ImGuiComboFlags, ImGuiFocusedFlags, ImGuiHoveredFlags, ImGuiDragDropFlags, IMGUI_PAYLOAD_TYPE_COLOR_3F, IMGUI_PAYLOAD_TYPE_COLOR_4F, ImGuiKey, ImGuiNavInput, ImGuiConfigFlags, ImGuiCol, ImGuiStyleVar, ImGuiColorEditFlags, ImGuiMouseCursor, ImGuiCond, ImDrawCornerFlags, ImDrawListFlags, ImVec2, ImVec4, ImVector, ImGuiTextFilter, ImGuiTextBuffer, ImGuiStorage, ImGuiPayload, IM_COL32_R_SHIFT, IM_COL32_G_SHIFT, IM_COL32_B_SHIFT, IM_COL32_A_SHIFT, IM_COL32_A_MASK, IM_COL32_WHITE, IM_COL32_BLACK, IM_COL32_BLACK_TRANS, ImColor, ImGuiTextEditDefaultSize, ImGuiTextEditCallbackData, ImGuiSizeCallbackData, ImGuiListClipper, ImDrawCmd, ImDrawIdxSize, ImDrawVertSize, ImDrawVertPosOffset, ImDrawVertUVOffset, ImDrawVertColOffset, ImDrawVert, ImDrawChannel, ImDrawListSharedData, ImDrawList, ImDrawData, ImFontConfig, ImFontGlyph, ImFontAtlasFlags, ImFontAtlas, ImFont, script_ImGuiStyle, ImGuiStyle, ImGuiIO, ImGuiContext, GetVersion, End, GetContentRegionAvailWidth, GetWindowContentRegionWidth, GetWindowWidth, GetWindowHeight, IsWindowCollapsed, IsWindowAppearing, SetWindowFontScale, SetNextWindowFocus, SetNextWindowBgAlpha, GetScrollX, GetScrollY, GetScrollMaxX, GetScrollMaxY, SetScrollX, SetScrollY, GetFontSize, PushItemWidth, PopItemWidth, CalcItemWidth, PopTextWrapPos, PushAllowKeyboardFocus, PopAllowKeyboardFocus, PushButtonRepeat, PopButtonRepeat, Separator, NewLine, Spacing, BeginGroup, EndGroup, GetCursorPosX, GetCursorPosY, SetCursorPosX, SetCursorPosY, AlignTextToFramePadding, GetTextLineHeight, GetTextLineHeightWithSpacing, GetFrameHeight, GetFrameHeightWithSpacing, NextColumn, GetColumnIndex, SetColumnWidth, SetColumnOffset, GetColumnsCount, PushID, PopID, GetID, Bullet, SmallButton, InputText_user_data, InputTextMultiline_user_data, TreePush, TreePop, TreeAdvanceToLabelPos, GetTreeNodeToLabelSpacing, BeginTooltip, EndTooltip, BeginMainMenuBar, EndMainMenuBar, BeginMenuBar, EndMenuBar, EndMenu, OpenPopup, BeginPopup, EndPopup, IsPopupOpen, CloseCurrentPopup, LogFinish, LogButtons, SetItemDefaultFocus, IsItemActive, IsItemFocused, IsItemVisible, IsAnyItemHovered, IsAnyItemActive, IsAnyItemFocused, SetItemAllowOverlap, GetTime, GetFrameCount, GetStyleColorName, EndChildFrame, ColorConvertRGBtoHSV, ColorConvertHSVtoRGB, GetMouseCursor, SetMouseCursor, MemAlloc, MemFree, GetClipboardText, SetClipboardText;
    return {
        setters: [
            function (Bind_1) {
                Bind = Bind_1;
                exports_1({
                    "reference_ImVec2": Bind_1["reference_ImVec2"]
                });
                exports_1({
                    "reference_ImVec4": Bind_1["reference_ImVec4"]
                });
            },
            function (config_1) {
                config = config_1;
            }
        ],
        execute: function () {
            exports_1("Bind", Bind);
            bind = Bind.default();
            exports_1("bind", bind);
            exports_1("IMGUI_VERSION", IMGUI_VERSION = bind.IMGUI_VERSION);
            ImStringBuffer = class ImStringBuffer {
                constructor(size, buffer = "") {
                    this.size = size;
                    this.buffer = buffer;
                }
            };
            exports_1("ImStringBuffer", ImStringBuffer);
            (function (ImGuiWindowFlags) {
                ImGuiWindowFlags[ImGuiWindowFlags["NoTitleBar"] = 1] = "NoTitleBar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoResize"] = 2] = "NoResize";
                ImGuiWindowFlags[ImGuiWindowFlags["NoMove"] = 4] = "NoMove";
                ImGuiWindowFlags[ImGuiWindowFlags["NoScrollbar"] = 8] = "NoScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoScrollWithMouse"] = 16] = "NoScrollWithMouse";
                ImGuiWindowFlags[ImGuiWindowFlags["NoCollapse"] = 32] = "NoCollapse";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysAutoResize"] = 64] = "AlwaysAutoResize";
                //ShowBorders          = 1 << 7,   // Show borders around windows and items (OBSOLETE! Use e.g. style.FrameBorderSize=1.0f to enable borders).
                ImGuiWindowFlags[ImGuiWindowFlags["NoSavedSettings"] = 256] = "NoSavedSettings";
                ImGuiWindowFlags[ImGuiWindowFlags["NoInputs"] = 512] = "NoInputs";
                ImGuiWindowFlags[ImGuiWindowFlags["MenuBar"] = 1024] = "MenuBar";
                ImGuiWindowFlags[ImGuiWindowFlags["HorizontalScrollbar"] = 2048] = "HorizontalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoFocusOnAppearing"] = 4096] = "NoFocusOnAppearing";
                ImGuiWindowFlags[ImGuiWindowFlags["NoBringToFrontOnFocus"] = 8192] = "NoBringToFrontOnFocus";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysVerticalScrollbar"] = 16384] = "AlwaysVerticalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysHorizontalScrollbar"] = 32768] = "AlwaysHorizontalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysUseWindowPadding"] = 65536] = "AlwaysUseWindowPadding";
                ImGuiWindowFlags[ImGuiWindowFlags["ResizeFromAnySide"] = 131072] = "ResizeFromAnySide";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNavInputs"] = 262144] = "NoNavInputs";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNavFocus"] = 524288] = "NoNavFocus";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNav"] = 786432] = "NoNav";
                // [Internal]
                ImGuiWindowFlags[ImGuiWindowFlags["NavFlattened"] = 8388608] = "NavFlattened";
                ImGuiWindowFlags[ImGuiWindowFlags["ChildWindow"] = 16777216] = "ChildWindow";
                ImGuiWindowFlags[ImGuiWindowFlags["Tooltip"] = 33554432] = "Tooltip";
                ImGuiWindowFlags[ImGuiWindowFlags["Popup"] = 67108864] = "Popup";
                ImGuiWindowFlags[ImGuiWindowFlags["Modal"] = 134217728] = "Modal";
                ImGuiWindowFlags[ImGuiWindowFlags["ChildMenu"] = 268435456] = "ChildMenu";
            })(ImGuiWindowFlags || (ImGuiWindowFlags = {}));
            exports_1("ImGuiWindowFlags", ImGuiWindowFlags);
            exports_1("WindowFlags", ImGuiWindowFlags);
            (function (ImGuiInputTextFlags) {
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsDecimal"] = 1] = "CharsDecimal";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsHexadecimal"] = 2] = "CharsHexadecimal";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsUppercase"] = 4] = "CharsUppercase";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsNoBlank"] = 8] = "CharsNoBlank";
                ImGuiInputTextFlags[ImGuiInputTextFlags["AutoSelectAll"] = 16] = "AutoSelectAll";
                ImGuiInputTextFlags[ImGuiInputTextFlags["EnterReturnsTrue"] = 32] = "EnterReturnsTrue";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCompletion"] = 64] = "CallbackCompletion";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackHistory"] = 128] = "CallbackHistory";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackAlways"] = 256] = "CallbackAlways";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCharFilter"] = 512] = "CallbackCharFilter";
                ImGuiInputTextFlags[ImGuiInputTextFlags["AllowTabInput"] = 1024] = "AllowTabInput";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CtrlEnterForNewLine"] = 2048] = "CtrlEnterForNewLine";
                ImGuiInputTextFlags[ImGuiInputTextFlags["NoHorizontalScroll"] = 4096] = "NoHorizontalScroll";
                ImGuiInputTextFlags[ImGuiInputTextFlags["AlwaysInsertMode"] = 8192] = "AlwaysInsertMode";
                ImGuiInputTextFlags[ImGuiInputTextFlags["ReadOnly"] = 16384] = "ReadOnly";
                ImGuiInputTextFlags[ImGuiInputTextFlags["Password"] = 32768] = "Password";
                ImGuiInputTextFlags[ImGuiInputTextFlags["NoUndoRedo"] = 65536] = "NoUndoRedo";
                // [Internal]
                ImGuiInputTextFlags[ImGuiInputTextFlags["Multiline"] = 1048576] = "Multiline";
            })(ImGuiInputTextFlags || (ImGuiInputTextFlags = {}));
            exports_1("ImGuiInputTextFlags", ImGuiInputTextFlags);
            exports_1("InputTextFlags", ImGuiInputTextFlags);
            (function (ImGuiTreeNodeFlags) {
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Selected"] = 1] = "Selected";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Framed"] = 2] = "Framed";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["AllowItemOverlap"] = 4] = "AllowItemOverlap";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoTreePushOnOpen"] = 8] = "NoTreePushOnOpen";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoAutoOpenOnLog"] = 16] = "NoAutoOpenOnLog";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["DefaultOpen"] = 32] = "DefaultOpen";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnDoubleClick"] = 64] = "OpenOnDoubleClick";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnArrow"] = 128] = "OpenOnArrow";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Leaf"] = 256] = "Leaf";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Bullet"] = 512] = "Bullet";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["FramePadding"] = 1024] = "FramePadding";
                //SpanAllAvailWidth  = 1 << 11,  // FIXME: TODO: Extend hit box horizontally even if not framed
                //NoScrollOnOpen     = 1 << 12,  // FIXME: TODO: Disable automatic scroll on TreePop() if node got just open and contents is not visible
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NavLeftJumpsBackHere"] = 8192] = "NavLeftJumpsBackHere";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["CollapsingHeader"] = 18] = "CollapsingHeader";
            })(ImGuiTreeNodeFlags || (ImGuiTreeNodeFlags = {}));
            exports_1("ImGuiTreeNodeFlags", ImGuiTreeNodeFlags);
            exports_1("TreeNodeFlags", ImGuiTreeNodeFlags);
            (function (ImGuiSelectableFlags) {
                ImGuiSelectableFlags[ImGuiSelectableFlags["DontClosePopups"] = 1] = "DontClosePopups";
                ImGuiSelectableFlags[ImGuiSelectableFlags["SpanAllColumns"] = 2] = "SpanAllColumns";
                ImGuiSelectableFlags[ImGuiSelectableFlags["AllowDoubleClick"] = 4] = "AllowDoubleClick";
            })(ImGuiSelectableFlags || (ImGuiSelectableFlags = {}));
            exports_1("ImGuiSelectableFlags", ImGuiSelectableFlags);
            exports_1("SelectableFlags", ImGuiSelectableFlags);
            (function (ImGuiComboFlags) {
                ImGuiComboFlags[ImGuiComboFlags["PopupAlignLeft"] = 1] = "PopupAlignLeft";
                ImGuiComboFlags[ImGuiComboFlags["HeightSmall"] = 2] = "HeightSmall";
                ImGuiComboFlags[ImGuiComboFlags["HeightRegular"] = 4] = "HeightRegular";
                ImGuiComboFlags[ImGuiComboFlags["HeightLarge"] = 8] = "HeightLarge";
                ImGuiComboFlags[ImGuiComboFlags["HeightLargest"] = 16] = "HeightLargest";
                ImGuiComboFlags[ImGuiComboFlags["HeightMask_"] = 30] = "HeightMask_";
            })(ImGuiComboFlags || (ImGuiComboFlags = {}));
            exports_1("ImGuiComboFlags", ImGuiComboFlags);
            exports_1("ComboFlags", ImGuiComboFlags);
            (function (ImGuiFocusedFlags) {
                ImGuiFocusedFlags[ImGuiFocusedFlags["ChildWindows"] = 1] = "ChildWindows";
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootWindow"] = 2] = "RootWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["AnyWindow"] = 4] = "AnyWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
            })(ImGuiFocusedFlags || (ImGuiFocusedFlags = {}));
            exports_1("ImGuiFocusedFlags", ImGuiFocusedFlags);
            exports_1("FocusedFlags", ImGuiFocusedFlags);
            (function (ImGuiHoveredFlags) {
                ImGuiHoveredFlags[ImGuiHoveredFlags["Default"] = 0] = "Default";
                ImGuiHoveredFlags[ImGuiHoveredFlags["ChildWindows"] = 1] = "ChildWindows";
                ImGuiHoveredFlags[ImGuiHoveredFlags["RootWindow"] = 2] = "RootWindow";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AnyWindow"] = 4] = "AnyWindow";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByPopup"] = 8] = "AllowWhenBlockedByPopup";
                //AllowWhenBlockedByModal     = 1 << 4,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByActiveItem"] = 32] = "AllowWhenBlockedByActiveItem";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenOverlapped"] = 64] = "AllowWhenOverlapped";
                ImGuiHoveredFlags[ImGuiHoveredFlags["RectOnly"] = 104] = "RectOnly";
                ImGuiHoveredFlags[ImGuiHoveredFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
            })(ImGuiHoveredFlags || (ImGuiHoveredFlags = {}));
            exports_1("ImGuiHoveredFlags", ImGuiHoveredFlags);
            exports_1("HoveredFlags", ImGuiHoveredFlags);
            (function (ImGuiDragDropFlags) {
                // BeginDragDropSource() flags
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoPreviewTooltip"] = 1] = "SourceNoPreviewTooltip";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoDisableHover"] = 2] = "SourceNoDisableHover";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoHoldToOpenOthers"] = 4] = "SourceNoHoldToOpenOthers";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAllowNullID"] = 8] = "SourceAllowNullID";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceExtern"] = 16] = "SourceExtern";
                // AcceptDragDropPayload() flags
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptBeforeDelivery"] = 1024] = "AcceptBeforeDelivery";
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoDrawDefaultRect"] = 2048] = "AcceptNoDrawDefaultRect";
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptPeekOnly"] = 3072] = "AcceptPeekOnly";
            })(ImGuiDragDropFlags || (ImGuiDragDropFlags = {}));
            exports_1("ImGuiDragDropFlags", ImGuiDragDropFlags);
            exports_1("DragDropFlags", ImGuiDragDropFlags);
            // Standard Drag and Drop payload types. You can define you own payload types using 12-characters long strings. Types starting with '_' are defined by Dear ImGui.
            exports_1("IMGUI_PAYLOAD_TYPE_COLOR_3F", IMGUI_PAYLOAD_TYPE_COLOR_3F = "_COL3F"); // float[3]     // Standard type for colors, without alpha. User code may use this type.
            exports_1("IMGUI_PAYLOAD_TYPE_COLOR_4F", IMGUI_PAYLOAD_TYPE_COLOR_4F = "_COL4F"); // float[4]     // Standard type for colors. User code may use this type.
            (function (ImGuiKey) {
                ImGuiKey[ImGuiKey["Tab"] = 0] = "Tab";
                ImGuiKey[ImGuiKey["LeftArrow"] = 1] = "LeftArrow";
                ImGuiKey[ImGuiKey["RightArrow"] = 2] = "RightArrow";
                ImGuiKey[ImGuiKey["UpArrow"] = 3] = "UpArrow";
                ImGuiKey[ImGuiKey["DownArrow"] = 4] = "DownArrow";
                ImGuiKey[ImGuiKey["PageUp"] = 5] = "PageUp";
                ImGuiKey[ImGuiKey["PageDown"] = 6] = "PageDown";
                ImGuiKey[ImGuiKey["Home"] = 7] = "Home";
                ImGuiKey[ImGuiKey["End"] = 8] = "End";
                ImGuiKey[ImGuiKey["Insert"] = 9] = "Insert";
                ImGuiKey[ImGuiKey["Delete"] = 10] = "Delete";
                ImGuiKey[ImGuiKey["Backspace"] = 11] = "Backspace";
                ImGuiKey[ImGuiKey["Space"] = 12] = "Space";
                ImGuiKey[ImGuiKey["Enter"] = 13] = "Enter";
                ImGuiKey[ImGuiKey["Escape"] = 14] = "Escape";
                ImGuiKey[ImGuiKey["A"] = 15] = "A";
                ImGuiKey[ImGuiKey["C"] = 16] = "C";
                ImGuiKey[ImGuiKey["V"] = 17] = "V";
                ImGuiKey[ImGuiKey["X"] = 18] = "X";
                ImGuiKey[ImGuiKey["Y"] = 19] = "Y";
                ImGuiKey[ImGuiKey["Z"] = 20] = "Z";
                ImGuiKey[ImGuiKey["COUNT"] = 21] = "COUNT";
            })(ImGuiKey || (ImGuiKey = {}));
            exports_1("ImGuiKey", ImGuiKey);
            exports_1("Key", ImGuiKey);
            (function (ImGuiNavInput) {
                // Gamepad Mapping
                ImGuiNavInput[ImGuiNavInput["Activate"] = 0] = "Activate";
                ImGuiNavInput[ImGuiNavInput["Cancel"] = 1] = "Cancel";
                ImGuiNavInput[ImGuiNavInput["Input"] = 2] = "Input";
                ImGuiNavInput[ImGuiNavInput["Menu"] = 3] = "Menu";
                ImGuiNavInput[ImGuiNavInput["DpadLeft"] = 4] = "DpadLeft";
                ImGuiNavInput[ImGuiNavInput["DpadRight"] = 5] = "DpadRight";
                ImGuiNavInput[ImGuiNavInput["DpadUp"] = 6] = "DpadUp";
                ImGuiNavInput[ImGuiNavInput["DpadDown"] = 7] = "DpadDown";
                ImGuiNavInput[ImGuiNavInput["LStickLeft"] = 8] = "LStickLeft";
                ImGuiNavInput[ImGuiNavInput["LStickRight"] = 9] = "LStickRight";
                ImGuiNavInput[ImGuiNavInput["LStickUp"] = 10] = "LStickUp";
                ImGuiNavInput[ImGuiNavInput["LStickDown"] = 11] = "LStickDown";
                ImGuiNavInput[ImGuiNavInput["FocusPrev"] = 12] = "FocusPrev";
                ImGuiNavInput[ImGuiNavInput["FocusNext"] = 13] = "FocusNext";
                ImGuiNavInput[ImGuiNavInput["TweakSlow"] = 14] = "TweakSlow";
                ImGuiNavInput[ImGuiNavInput["TweakFast"] = 15] = "TweakFast";
                // [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
                // Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) may be directly reading from io.KeyDown[] instead of io.NavInputs[].
                ImGuiNavInput[ImGuiNavInput["KeyMenu_"] = 16] = "KeyMenu_";
                ImGuiNavInput[ImGuiNavInput["KeyLeft_"] = 17] = "KeyLeft_";
                ImGuiNavInput[ImGuiNavInput["KeyRight_"] = 18] = "KeyRight_";
                ImGuiNavInput[ImGuiNavInput["KeyUp_"] = 19] = "KeyUp_";
                ImGuiNavInput[ImGuiNavInput["KeyDown_"] = 20] = "KeyDown_";
                ImGuiNavInput[ImGuiNavInput["COUNT"] = 21] = "COUNT";
                ImGuiNavInput[ImGuiNavInput["InternalStart_"] = 16] = "InternalStart_";
            })(ImGuiNavInput || (ImGuiNavInput = {}));
            exports_1("ImGuiNavInput", ImGuiNavInput);
            exports_1("NavInput", ImGuiNavInput);
            (function (ImGuiConfigFlags) {
                ImGuiConfigFlags[ImGuiConfigFlags["EnableKeyboard"] = 1] = "EnableKeyboard";
                ImGuiConfigFlags[ImGuiConfigFlags["EnableGamepad"] = 2] = "EnableGamepad";
                ImGuiConfigFlags[ImGuiConfigFlags["MoveMouse"] = 4] = "MoveMouse";
                ImGuiConfigFlags[ImGuiConfigFlags["NoCaptureKeyboard"] = 8] = "NoCaptureKeyboard";
            })(ImGuiConfigFlags || (ImGuiConfigFlags = {}));
            exports_1("ImGuiConfigFlags", ImGuiConfigFlags);
            exports_1("ConfigFlags", ImGuiConfigFlags);
            (function (ImGuiCol) {
                ImGuiCol[ImGuiCol["Text"] = 0] = "Text";
                ImGuiCol[ImGuiCol["TextDisabled"] = 1] = "TextDisabled";
                ImGuiCol[ImGuiCol["WindowBg"] = 2] = "WindowBg";
                ImGuiCol[ImGuiCol["ChildBg"] = 3] = "ChildBg";
                ImGuiCol[ImGuiCol["PopupBg"] = 4] = "PopupBg";
                ImGuiCol[ImGuiCol["Border"] = 5] = "Border";
                ImGuiCol[ImGuiCol["BorderShadow"] = 6] = "BorderShadow";
                ImGuiCol[ImGuiCol["FrameBg"] = 7] = "FrameBg";
                ImGuiCol[ImGuiCol["FrameBgHovered"] = 8] = "FrameBgHovered";
                ImGuiCol[ImGuiCol["FrameBgActive"] = 9] = "FrameBgActive";
                ImGuiCol[ImGuiCol["TitleBg"] = 10] = "TitleBg";
                ImGuiCol[ImGuiCol["TitleBgActive"] = 11] = "TitleBgActive";
                ImGuiCol[ImGuiCol["TitleBgCollapsed"] = 12] = "TitleBgCollapsed";
                ImGuiCol[ImGuiCol["MenuBarBg"] = 13] = "MenuBarBg";
                ImGuiCol[ImGuiCol["ScrollbarBg"] = 14] = "ScrollbarBg";
                ImGuiCol[ImGuiCol["ScrollbarGrab"] = 15] = "ScrollbarGrab";
                ImGuiCol[ImGuiCol["ScrollbarGrabHovered"] = 16] = "ScrollbarGrabHovered";
                ImGuiCol[ImGuiCol["ScrollbarGrabActive"] = 17] = "ScrollbarGrabActive";
                ImGuiCol[ImGuiCol["CheckMark"] = 18] = "CheckMark";
                ImGuiCol[ImGuiCol["SliderGrab"] = 19] = "SliderGrab";
                ImGuiCol[ImGuiCol["SliderGrabActive"] = 20] = "SliderGrabActive";
                ImGuiCol[ImGuiCol["Button"] = 21] = "Button";
                ImGuiCol[ImGuiCol["ButtonHovered"] = 22] = "ButtonHovered";
                ImGuiCol[ImGuiCol["ButtonActive"] = 23] = "ButtonActive";
                ImGuiCol[ImGuiCol["Header"] = 24] = "Header";
                ImGuiCol[ImGuiCol["HeaderHovered"] = 25] = "HeaderHovered";
                ImGuiCol[ImGuiCol["HeaderActive"] = 26] = "HeaderActive";
                ImGuiCol[ImGuiCol["Separator"] = 27] = "Separator";
                ImGuiCol[ImGuiCol["SeparatorHovered"] = 28] = "SeparatorHovered";
                ImGuiCol[ImGuiCol["SeparatorActive"] = 29] = "SeparatorActive";
                ImGuiCol[ImGuiCol["ResizeGrip"] = 30] = "ResizeGrip";
                ImGuiCol[ImGuiCol["ResizeGripHovered"] = 31] = "ResizeGripHovered";
                ImGuiCol[ImGuiCol["ResizeGripActive"] = 32] = "ResizeGripActive";
                ImGuiCol[ImGuiCol["PlotLines"] = 33] = "PlotLines";
                ImGuiCol[ImGuiCol["PlotLinesHovered"] = 34] = "PlotLinesHovered";
                ImGuiCol[ImGuiCol["PlotHistogram"] = 35] = "PlotHistogram";
                ImGuiCol[ImGuiCol["PlotHistogramHovered"] = 36] = "PlotHistogramHovered";
                ImGuiCol[ImGuiCol["TextSelectedBg"] = 37] = "TextSelectedBg";
                ImGuiCol[ImGuiCol["ModalWindowDarkening"] = 38] = "ModalWindowDarkening";
                ImGuiCol[ImGuiCol["DragDropTarget"] = 39] = "DragDropTarget";
                ImGuiCol[ImGuiCol["NavHighlight"] = 40] = "NavHighlight";
                ImGuiCol[ImGuiCol["NavWindowingHighlight"] = 41] = "NavWindowingHighlight";
                ImGuiCol[ImGuiCol["COUNT"] = 42] = "COUNT";
            })(ImGuiCol || (ImGuiCol = {}));
            exports_1("ImGuiCol", ImGuiCol);
            exports_1("Col", ImGuiCol);
            (function (ImGuiStyleVar) {
                // Enum name ......................// Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
                ImGuiStyleVar[ImGuiStyleVar["Alpha"] = 0] = "Alpha";
                ImGuiStyleVar[ImGuiStyleVar["WindowPadding"] = 1] = "WindowPadding";
                ImGuiStyleVar[ImGuiStyleVar["WindowRounding"] = 2] = "WindowRounding";
                ImGuiStyleVar[ImGuiStyleVar["WindowBorderSize"] = 3] = "WindowBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["WindowMinSize"] = 4] = "WindowMinSize";
                ImGuiStyleVar[ImGuiStyleVar["WindowTitleAlign"] = 5] = "WindowTitleAlign";
                ImGuiStyleVar[ImGuiStyleVar["ChildRounding"] = 6] = "ChildRounding";
                ImGuiStyleVar[ImGuiStyleVar["ChildBorderSize"] = 7] = "ChildBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["PopupRounding"] = 8] = "PopupRounding";
                ImGuiStyleVar[ImGuiStyleVar["PopupBorderSize"] = 9] = "PopupBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["FramePadding"] = 10] = "FramePadding";
                ImGuiStyleVar[ImGuiStyleVar["FrameRounding"] = 11] = "FrameRounding";
                ImGuiStyleVar[ImGuiStyleVar["FrameBorderSize"] = 12] = "FrameBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["ItemSpacing"] = 13] = "ItemSpacing";
                ImGuiStyleVar[ImGuiStyleVar["ItemInnerSpacing"] = 14] = "ItemInnerSpacing";
                ImGuiStyleVar[ImGuiStyleVar["IndentSpacing"] = 15] = "IndentSpacing";
                ImGuiStyleVar[ImGuiStyleVar["ScrollbarSize"] = 16] = "ScrollbarSize";
                ImGuiStyleVar[ImGuiStyleVar["ScrollbarRounding"] = 17] = "ScrollbarRounding";
                ImGuiStyleVar[ImGuiStyleVar["GrabMinSize"] = 18] = "GrabMinSize";
                ImGuiStyleVar[ImGuiStyleVar["GrabRounding"] = 19] = "GrabRounding";
                ImGuiStyleVar[ImGuiStyleVar["ButtonTextAlign"] = 20] = "ButtonTextAlign";
                ImGuiStyleVar[ImGuiStyleVar["Count_"] = 21] = "Count_";
                ImGuiStyleVar[ImGuiStyleVar["COUNT"] = 21] = "COUNT";
            })(ImGuiStyleVar || (ImGuiStyleVar = {}));
            exports_1("ImGuiStyleVar", ImGuiStyleVar);
            exports_1("StyleVar", ImGuiStyleVar);
            (function (ImGuiColorEditFlags) {
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoAlpha"] = 2] = "NoAlpha";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoPicker"] = 4] = "NoPicker";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoOptions"] = 8] = "NoOptions";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoSmallPreview"] = 16] = "NoSmallPreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoInputs"] = 32] = "NoInputs";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoTooltip"] = 64] = "NoTooltip";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoLabel"] = 128] = "NoLabel";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoSidePreview"] = 256] = "NoSidePreview";
                // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaBar"] = 512] = "AlphaBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreview"] = 1024] = "AlphaPreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreviewHalf"] = 2048] = "AlphaPreviewHalf";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HDR"] = 4096] = "HDR";
                ImGuiColorEditFlags[ImGuiColorEditFlags["RGB"] = 8192] = "RGB";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HSV"] = 16384] = "HSV";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HEX"] = 32768] = "HEX";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 65536] = "Uint8";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 131072] = "Float";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 262144] = "PickerHueBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 524288] = "PickerHueWheel";
                // Internals/Masks
                ImGuiColorEditFlags[ImGuiColorEditFlags["_InputsMask"] = 57344] = "_InputsMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_DataTypeMask"] = 196608] = "_DataTypeMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_PickerMask"] = 786432] = "_PickerMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_OptionsDefault"] = 335872] = "_OptionsDefault";
            })(ImGuiColorEditFlags || (ImGuiColorEditFlags = {}));
            exports_1("ImGuiColorEditFlags", ImGuiColorEditFlags);
            exports_1("ColorEditFlags", ImGuiColorEditFlags);
            (function (ImGuiMouseCursor) {
                ImGuiMouseCursor[ImGuiMouseCursor["None"] = -1] = "None";
                ImGuiMouseCursor[ImGuiMouseCursor["Arrow"] = 0] = "Arrow";
                ImGuiMouseCursor[ImGuiMouseCursor["TextInput"] = 1] = "TextInput";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeAll"] = 2] = "ResizeAll";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNS"] = 3] = "ResizeNS";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeEW"] = 4] = "ResizeEW";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNESW"] = 5] = "ResizeNESW";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNWSE"] = 6] = "ResizeNWSE";
                ImGuiMouseCursor[ImGuiMouseCursor["Count_"] = 7] = "Count_";
                ImGuiMouseCursor[ImGuiMouseCursor["COUNT"] = 7] = "COUNT";
            })(ImGuiMouseCursor || (ImGuiMouseCursor = {}));
            exports_1("ImGuiMouseCursor", ImGuiMouseCursor);
            exports_1("MouseCursor", ImGuiMouseCursor);
            (function (ImGuiCond) {
                ImGuiCond[ImGuiCond["Always"] = 1] = "Always";
                ImGuiCond[ImGuiCond["Once"] = 2] = "Once";
                ImGuiCond[ImGuiCond["FirstUseEver"] = 4] = "FirstUseEver";
                ImGuiCond[ImGuiCond["Appearing"] = 8] = "Appearing";
            })(ImGuiCond || (ImGuiCond = {}));
            exports_1("ImGuiCond", ImGuiCond);
            exports_1("Cond", ImGuiCond);
            (function (ImDrawCornerFlags) {
                ImDrawCornerFlags[ImDrawCornerFlags["TopLeft"] = 1] = "TopLeft";
                ImDrawCornerFlags[ImDrawCornerFlags["TopRight"] = 2] = "TopRight";
                ImDrawCornerFlags[ImDrawCornerFlags["BotLeft"] = 4] = "BotLeft";
                ImDrawCornerFlags[ImDrawCornerFlags["BotRight"] = 8] = "BotRight";
                ImDrawCornerFlags[ImDrawCornerFlags["Top"] = 3] = "Top";
                ImDrawCornerFlags[ImDrawCornerFlags["Bot"] = 12] = "Bot";
                ImDrawCornerFlags[ImDrawCornerFlags["Left"] = 5] = "Left";
                ImDrawCornerFlags[ImDrawCornerFlags["Right"] = 10] = "Right";
                ImDrawCornerFlags[ImDrawCornerFlags["All"] = 15] = "All";
            })(ImDrawCornerFlags || (ImDrawCornerFlags = {}));
            exports_1("ImDrawCornerFlags", ImDrawCornerFlags);
            exports_1("wCornerFlags", ImDrawCornerFlags);
            (function (ImDrawListFlags) {
                ImDrawListFlags[ImDrawListFlags["AntiAliasedLines"] = 1] = "AntiAliasedLines";
                ImDrawListFlags[ImDrawListFlags["AntiAliasedFill"] = 2] = "AntiAliasedFill";
            })(ImDrawListFlags || (ImDrawListFlags = {}));
            exports_1("ImDrawListFlags", ImDrawListFlags);
            exports_1("wListFlags", ImDrawListFlags);
            ImVec2 = class ImVec2 {
                constructor(x = 0.0, y = 0.0) {
                    this.x = x;
                    this.y = y;
                }
                Copy(other) {
                    this.x = other.x;
                    this.y = other.y;
                    return this;
                }
                Equals(other) {
                    if (this.x !== other.x) {
                        return false;
                    }
                    if (this.y !== other.y) {
                        return false;
                    }
                    return true;
                }
            };
            ImVec2.ZERO = new ImVec2(0.0, 0.0);
            ImVec2.UNIT = new ImVec2(1.0, 1.0);
            ImVec2.UNIT_X = new ImVec2(1.0, 0.0);
            ImVec2.UNIT_Y = new ImVec2(0.0, 1.0);
            exports_1("ImVec2", ImVec2);
            ImVec4 = class ImVec4 {
                constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.w = w;
                }
                Copy(other) {
                    this.x = other.x;
                    this.y = other.y;
                    this.z = other.z;
                    this.w = other.w;
                    return this;
                }
                Equals(other) {
                    if (this.x !== other.x) {
                        return false;
                    }
                    if (this.y !== other.y) {
                        return false;
                    }
                    if (this.z !== other.z) {
                        return false;
                    }
                    if (this.w !== other.w) {
                        return false;
                    }
                    return true;
                }
            };
            ImVec4.ZERO = new ImVec4(0.0, 0.0, 0.0, 0.0);
            ImVec4.UNIT = new ImVec4(1.0, 1.0, 1.0, 1.0);
            ImVec4.UNIT_X = new ImVec4(1.0, 0.0, 0.0, 0.0);
            ImVec4.UNIT_Y = new ImVec4(0.0, 1.0, 0.0, 0.0);
            ImVec4.UNIT_Z = new ImVec4(0.0, 0.0, 1.0, 0.0);
            ImVec4.UNIT_W = new ImVec4(0.0, 0.0, 0.0, 1.0);
            ImVec4.BLACK = new ImVec4(0.0, 0.0, 0.0, 1.0);
            ImVec4.WHITE = new ImVec4(1.0, 1.0, 1.0, 1.0);
            exports_1("ImVec4", ImVec4);
            //-----------------------------------------------------------------------------
            // Helpers
            //-----------------------------------------------------------------------------
            // Lightweight std::vector<> like class to avoid dragging dependencies (also: windows implementation of STL with debug enabled is absurdly slow, so let's bypass it so our code runs fast in debug).
            // Our implementation does NOT call C++ constructors/destructors. This is intentional and we do not require it. Do not use this class as a straight std::vector replacement in your code!
            ImVector = class ImVector {
                constructor() {
                    this.Data = [];
                    // public:
                    // int                         Size;
                    // int                         Capacity;
                    // T*                          Data;
                    // typedef T                   value_type;
                    // typedef value_type*         iterator;
                    // typedef const value_type*   const_iterator;
                    // inline ImVector()           { Size = Capacity = 0; Data = NULL; }
                    // inline ~ImVector()          { if (Data) ImGui::MemFree(Data); }
                    // inline bool                 empty() const                   { return Size == 0; }
                    // inline int                  size() const                    { return Size; }
                    // inline int                  capacity() const                { return Capacity; }
                    // inline value_type&          operator[](int i)               { IM_ASSERT(i < Size); return Data[i]; }
                    // inline const value_type&    operator[](int i) const         { IM_ASSERT(i < Size); return Data[i]; }
                    // inline void                 clear()                         { if (Data) { Size = Capacity = 0; ImGui::MemFree(Data); Data = NULL; } }
                    // inline iterator             begin()                         { return Data; }
                    // inline const_iterator       begin() const                   { return Data; }
                    // inline iterator             end()                           { return Data + Size; }
                    // inline const_iterator       end() const                     { return Data + Size; }
                    // inline value_type&          front()                         { IM_ASSERT(Size > 0); return Data[0]; }
                    // inline const value_type&    front() const                   { IM_ASSERT(Size > 0); return Data[0]; }
                    // inline value_type&          back()                          { IM_ASSERT(Size > 0); return Data[Size - 1]; }
                    // inline const value_type&    back() const                    { IM_ASSERT(Size > 0); return Data[Size - 1]; }
                    // inline void                 swap(ImVector<T>& rhs)          { int rhs_size = rhs.Size; rhs.Size = Size; Size = rhs_size; int rhs_cap = rhs.Capacity; rhs.Capacity = Capacity; Capacity = rhs_cap; value_type* rhs_data = rhs.Data; rhs.Data = Data; Data = rhs_data; }
                    // inline int                  _grow_capacity(int size) const  { int new_capacity = Capacity ? (Capacity + Capacity/2) : 8; return new_capacity > size ? new_capacity : size; }
                    // inline void                 resize(int new_size)            { if (new_size > Capacity) reserve(_grow_capacity(new_size)); Size = new_size; }
                    // inline void                 resize(int new_size, const T& v){ if (new_size > Capacity) reserve(_grow_capacity(new_size)); if (new_size > Size) for (int n = Size; n < new_size; n++) Data[n] = v; Size = new_size; }
                    // inline void                 reserve(int new_capacity)
                    // {
                    //     if (new_capacity <= Capacity)
                    //         return;
                    //     T* new_data = (value_type*)ImGui::MemAlloc((size_t)new_capacity * sizeof(T));
                    //     if (Data)
                    //         memcpy(new_data, Data, (size_t)Size * sizeof(T));
                    //     ImGui::MemFree(Data);
                    //     Data = new_data;
                    //     Capacity = new_capacity;
                    // }
                    // inline void                 push_back(const value_type& v)  { if (Size == Capacity) reserve(_grow_capacity(Size + 1)); Data[Size++] = v; }
                    // inline void                 pop_back()                      { IM_ASSERT(Size > 0); Size--; }
                    // inline void                 push_front(const value_type& v) { if (Size == 0) push_back(v); else insert(Data, v); }
                    // inline iterator             erase(const_iterator it)                        { IM_ASSERT(it >= Data && it < Data+Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(value_type)); Size--; return Data + off; }
                    // inline iterator             insert(const_iterator it, const value_type& v)  { IM_ASSERT(it >= Data && it <= Data+Size); const ptrdiff_t off = it - Data; if (Size == Capacity) reserve(_grow_capacity(Size + 1)); if (off < (int)Size) memmove(Data + off + 1, Data + off, ((size_t)Size - (size_t)off) * sizeof(value_type)); Data[off] = v; Size++; return Data + off; }
                    // inline bool                 contains(const value_type& v) const             { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data++ == v) return true; return false; }
                }
                get Size() { return this.Data.length; }
                empty() { return this.Data.length === 0; }
                clear() { this.Data.length = 0; }
                pop_back() { return this.Data.pop(); }
                push_back(value) { this.Data.push(value); }
            };
            exports_1("ImVector", ImVector);
            // Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
            ImGuiTextFilter = class ImGuiTextFilter {
                // IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
                constructor(default_filter = "") {
                    // struct TextRange
                    // {
                    //     const char* b;
                    //     const char* e;
                    //     TextRange() { b = e = NULL; }
                    //     TextRange(const char* _b, const char* _e) { b = _b; e = _e; }
                    //     const char* begin() const { return b; }
                    //     const char* end() const { return e; }
                    //     bool empty() const { return b == e; }
                    //     char front() const { return *b; }
                    //     static bool is_blank(char c) { return c == ' ' || c == '\t'; }
                    //     void trim_blanks() { while (b < e && is_blank(*b)) b++; while (e > b && is_blank(*(e-1))) e--; }
                    //     IMGUI_API void split(char separator, ImVector<TextRange>& out);
                    // };
                    // char                InputBuf[256];
                    this.InputBuf = new ImStringBuffer(256);
                    // ImVector<TextRange> Filters;
                    // int                 CountGrep;
                    this.CountGrep = 0;
                    if (default_filter) {
                        // ImStrncpy(InputBuf, default_filter, IM_ARRAYSIZE(InputBuf));
                        this.InputBuf.buffer = default_filter;
                        this.Build();
                    }
                    else {
                        // InputBuf[0] = 0;
                        this.InputBuf.buffer = "";
                        this.CountGrep = 0;
                    }
                }
                // IMGUI_API bool      Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f);    // Helper calling InputText+Build
                Draw(label = "Filter (inc,-exc)", width = 0.0) {
                    if (width !== 0.0)
                        bind.PushItemWidth(width);
                    const value_changed = InputText(label, this.InputBuf, IM_ARRAYSIZE(this.InputBuf));
                    if (width !== 0.0)
                        bind.PopItemWidth();
                    if (value_changed)
                        this.Build();
                    return value_changed;
                }
                // IMGUI_API bool      PassFilter(const char* text, const char* text_end = NULL) const;
                PassFilter(text, text_end = null) {
                    // if (Filters.empty())
                    //     return true;
                    // if (text == NULL)
                    //     text = "";
                    // for (int i = 0; i != Filters.Size; i++)
                    // {
                    //     const TextRange& f = Filters[i];
                    //     if (f.empty())
                    //         continue;
                    //     if (f.front() == '-')
                    //     {
                    //         // Subtract
                    //         if (ImStristr(text, text_end, f.begin()+1, f.end()) != NULL)
                    //             return false;
                    //     }
                    //     else
                    //     {
                    //         // Grep
                    //         if (ImStristr(text, text_end, f.begin(), f.end()) != NULL)
                    //             return true;
                    //     }
                    // }
                    // Implicit * grep
                    if (this.CountGrep === 0)
                        return true;
                    return false;
                }
                // IMGUI_API void      Build();
                Build() {
                    // Filters.resize(0);
                    // TextRange input_range(InputBuf, InputBuf+strlen(InputBuf));
                    // input_range.split(',', Filters);
                    this.CountGrep = 0;
                    // for (int i = 0; i != Filters.Size; i++)
                    // {
                    //     Filters[i].trim_blanks();
                    //     if (Filters[i].empty())
                    //         continue;
                    //     if (Filters[i].front() != '-')
                    //         CountGrep += 1;
                    // }
                }
                // void                Clear() { InputBuf[0] = 0; Build(); }
                Clear() { this.InputBuf.buffer = ""; this.Build(); }
                // bool                IsActive() const { return !Filters.empty(); }
                IsActive() { return false; }
            };
            exports_1("ImGuiTextFilter", ImGuiTextFilter);
            // Helper: Text buffer for logging/accumulating text
            ImGuiTextBuffer = class ImGuiTextBuffer {
                constructor() {
                    // ImVector<char>      Buf;
                    this.Buf = "";
                    // ImGuiTextBuffer()   { Buf.push_back(0); }
                    // inline char         operator[](int i) { return Buf.Data[i]; }
                    // const char*         begin() const { return &Buf.front(); }
                    // const char*         end() const { return &Buf.back(); }      // Buf is zero-terminated, so end() will point on the zero-terminator
                    // int                 size() const { return Buf.Size - 1; }
                    // bool                empty() { return Buf.Size <= 1; }
                    // void                clear() { Buf.clear(); Buf.push_back(0); }
                    // void                reserve(int capacity) { Buf.reserve(capacity); }
                    // const char*         c_str() const { return Buf.Data; }
                    // IMGUI_API void      appendf(const char* fmt, ...) IM_FMTARGS(2);
                    // IMGUI_API void      appendfv(const char* fmt, va_list args) IM_FMTLIST(2);
                }
                begin() { return this.Buf; }
                size() { return this.Buf.length; }
                clear() { this.Buf = ""; }
                append(text) { this.Buf += text; }
            };
            exports_1("ImGuiTextBuffer", ImGuiTextBuffer);
            // Helper: Simple Key->value storage
            // Typically you don't have to worry about this since a storage is held within each Window.
            // We use it to e.g. store collapse state for a tree (Int 0/1), store color edit options.
            // This is optimized for efficient reading (dichotomy into a contiguous buffer), rare writing (typically tied to user interactions)
            // You can use it as custom user storage for temporary values. Declare your own storage if, for example:
            // - You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
            // - You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
            // Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
            ImGuiStorage = class ImGuiStorage {
            };
            exports_1("ImGuiStorage", ImGuiStorage);
            // Data payload for Drag and Drop operations
            ImGuiPayload = class ImGuiPayload {
            };
            exports_1("ImGuiPayload", ImGuiPayload);
            // Helpers macros to generate 32-bits encoded colors
            exports_1("IM_COL32_R_SHIFT", IM_COL32_R_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 16 : 0);
            exports_1("IM_COL32_G_SHIFT", IM_COL32_G_SHIFT = 8);
            exports_1("IM_COL32_B_SHIFT", IM_COL32_B_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 0 : 16);
            exports_1("IM_COL32_A_SHIFT", IM_COL32_A_SHIFT = 24);
            exports_1("IM_COL32_A_MASK", IM_COL32_A_MASK = 0xFF000000);
            exports_1("IM_COL32_WHITE", IM_COL32_WHITE = IM_COL32(255, 255, 255, 255)); // Opaque white = 0xFFFFFFFF
            exports_1("IM_COL32_BLACK", IM_COL32_BLACK = IM_COL32(0, 0, 0, 255)); // Opaque black
            exports_1("IM_COL32_BLACK_TRANS", IM_COL32_BLACK_TRANS = IM_COL32(0, 0, 0, 0)); // Transparent black = 0x00000000
            // ImColor() helper to implicity converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
            // Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
            // **Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
            // **None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
            ImColor = class ImColor {
                // ImColor()                                                       { Value.x = Value.y = Value.z = Value.w = 0.0f; }
                // ImColor(int r, int g, int b, int a = 255)                       { float sc = 1.0f/255.0f; Value.x = (float)r * sc; Value.y = (float)g * sc; Value.z = (float)b * sc; Value.w = (float)a * sc; }
                // ImColor(ImU32 rgba)                                             { float sc = 1.0f/255.0f; Value.x = (float)((rgba>>IM_COL32_R_SHIFT)&0xFF) * sc; Value.y = (float)((rgba>>IM_COL32_G_SHIFT)&0xFF) * sc; Value.z = (float)((rgba>>IM_COL32_B_SHIFT)&0xFF) * sc; Value.w = (float)((rgba>>IM_COL32_A_SHIFT)&0xFF) * sc; }
                // ImColor(float r, float g, float b, float a = 1.0f)              { Value.x = r; Value.y = g; Value.z = b; Value.w = a; }
                // ImColor(const ImVec4& col)                                      { Value = col; }
                constructor(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
                    // ImVec4              Value;
                    this.Value = new ImVec4();
                    if (typeof (r) === "number") {
                        if (r > 255 && g === 0.0 && b === 0.0 && a === 1.0) {
                            this.Value.x = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_R_SHIFT) & 0xFF) / 255));
                            this.Value.y = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_G_SHIFT) & 0xFF) / 255));
                            this.Value.z = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_B_SHIFT) & 0xFF) / 255));
                            this.Value.w = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_A_SHIFT) & 0xFF) / 255));
                        }
                        else if (r <= 1.0 && g <= 1.0 && b <= 1.0 && a <= 1.0) {
                            this.Value.x = Math.max(0.0, r);
                            this.Value.y = Math.max(0.0, g);
                            this.Value.z = Math.max(0.0, b);
                            this.Value.w = Math.max(0.0, a);
                        }
                        else {
                            this.Value.x = Math.max(0.0, Math.min(1.0, r / 255));
                            this.Value.y = Math.max(0.0, Math.min(1.0, g / 255));
                            this.Value.z = Math.max(0.0, Math.min(1.0, b / 255));
                            if (a <= 1.0) {
                                this.Value.w = Math.max(0.0, a);
                            }
                            else {
                                this.Value.w = Math.max(0.0, Math.min(1.0, a / 255));
                            }
                        }
                    }
                    else {
                        this.Value.Copy(r);
                    }
                }
                // inline operator ImU32() const                                   { return ImGui::ColorConvertFloat4ToU32(Value); }
                toImU32() { return bind.ColorConvertFloat4ToU32(this.Value); }
                // inline operator ImVec4() const                                  { return Value; }
                toImVec4() { return this.Value; }
                // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
                // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
                SetHSV(h, s, v, a = 1.0) {
                    const ref_r = [this.Value.x];
                    const ref_g = [this.Value.y];
                    const ref_b = [this.Value.z];
                    bind.ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
                    this.Value.x = ref_r[0];
                    this.Value.y = ref_g[0];
                    this.Value.z = ref_b[0];
                    this.Value.w = a;
                }
                // static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r,g,b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r,g,b,a); }
                static HSV(h, s, v, a = 1.0) {
                    const color = new ImColor();
                    color.SetHSV(h, s, v, a);
                    return color;
                }
            };
            exports_1("ImColor", ImColor);
            exports_1("ImGuiTextEditDefaultSize", ImGuiTextEditDefaultSize = 128);
            // Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
            ImGuiTextEditCallbackData = class ImGuiTextEditCallbackData {
                constructor(native, UserData) {
                    this.native = native;
                    this.UserData = UserData;
                }
                delete() { if (this.native) {
                    this.native.delete();
                    delete this.native;
                } }
                // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
                get EventFlag() { return this.native.EventFlag; }
                // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
                get Flags() { return this.native.Flags; }
                // void*               UserData;       // What user passed to InputText()      // Read-only
                // public get UserData(): any { return this.native.UserData; }
                // bool                ReadOnly;       // Read-only mode                       // Read-only
                get ReadOnly() { return this.native.ReadOnly; }
                // CharFilter event:
                // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
                get EventChar() { return this.native.EventChar; }
                set EventChar(value) { this.native.EventChar = value; }
                // Completion,History,Always events:
                // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
                // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
                get EventKey() { return this.native.EventKey; }
                // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
                get Buf() { return this.native.getBuf(); }
                set Buf(value) { this.native.setBuf(value); }
                // int                 BufTextLen;     // Current text length in bytes         // Read-write
                get BufTextLen() { return this.native.BufTextLen; }
                set BufTextLen(value) { this.native.BufTextLen = value; }
                // int                 BufSize;        // Maximum text length in bytes         // Read-only
                get BufSize() { return this.native.BufSize; }
                // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
                set BufDirty(value) { this.native.BufDirty = value; }
                // int                 CursorPos;      //                                      // Read-write
                get CursorPos() { return this.native.CursorPos; }
                set CursorPos(value) { this.native.CursorPos = value; }
                // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
                get SelectionStart() { return this.native.SelectionStart; }
                set SelectionStart(value) { this.native.SelectionStart = value; }
                // int                 SelectionEnd;   //                                      // Read-write
                get SelectionEnd() { return this.native.SelectionEnd; }
                set SelectionEnd(value) { this.native.SelectionEnd = value; }
                // NB: Helper functions for text manipulation. Calling those function loses selection.
                // IMGUI_API void    DeleteChars(int pos, int bytes_count);
                DeleteChars(pos, bytes_count) { return this.native.DeleteChars(pos, bytes_count); }
                // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
                InsertChars(pos, text, text_end = null) { return this.native.InsertChars(pos, text, text_end); }
                // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
                HasSelection() { return this.native.HasSelection(); }
            };
            exports_1("ImGuiTextEditCallbackData", ImGuiTextEditCallbackData);
            // Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
            // NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
            ImGuiSizeCallbackData = class ImGuiSizeCallbackData {
                constructor(native) {
                    this.native = native;
                }
                delete() { if (this.native) {
                    this.native.delete();
                    delete this.native;
                } }
                get UserData() { return this.native.UserData; }
                get Pos() { return this.native.getPos(); }
                get CurrentSize() { return this.native.getCurrentSize(); }
                get DesiredSize() { return this.native.getDesiredSize(); }
            };
            exports_1("ImGuiSizeCallbackData", ImGuiSizeCallbackData);
            ImGuiListClipper = class ImGuiListClipper {
                get StartPosY() { return this.native.StartPosY; }
                get ItemsHeight() { return this.native.ItemsHeight; }
                get ItemsCount() { return this.native.ItemsCount; }
                get StepNo() { return this.native.StepNo; }
                get DisplayStart() { return this.native.DisplayStart; }
                get DisplayEnd() { return this.native.DisplayEnd; }
                // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
                // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
                // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
                // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
                constructor(items_count = -1, items_height = -1.0) {
                    this.native = new bind.ImGuiListClipper(items_count, items_height);
                }
                // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
                delete() {
                    if (this.native) {
                        this.native.delete();
                        delete this.native;
                    }
                }
                // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
                Step() {
                    if (!this.native) {
                        throw new Error();
                    }
                    const busy = this.native.Step();
                    if (!busy) {
                        this.delete();
                    }
                    return busy;
                }
                // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
                Begin(items_count, items_height) {
                    if (!this.native) {
                        this.native = new Bind.ImGuiListClipper(items_count, items_height);
                    }
                    this.native.Begin(items_count, items_height);
                }
                // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
                End() {
                    if (!this.native) {
                        throw new Error();
                    }
                    this.native.End();
                    this.delete();
                }
            };
            exports_1("ImGuiListClipper", ImGuiListClipper);
            // Typically, 1 command = 1 GPU draw call (unless command is a callback)
            ImDrawCmd = class ImDrawCmd {
                constructor(native) {
                    this.native = native;
                    // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
                    this.UserCallback = null; // TODO
                    // void*           UserCallbackData;       // The draw callback code can access this.
                    this.UserCallbackData = null; // TODO
                }
                // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
                get ElemCount() { return this.native.ElemCount; }
                // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
                get ClipRect() { return this.native.getClipRect(); }
                // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
                get TextureId() {
                    return ImGuiContext.getTexture(this.native.TextureId);
                }
            };
            exports_1("ImDrawCmd", ImDrawCmd);
            // Vertex index (override with '#define ImDrawIdx unsigned int' inside in imconfig.h)
            // #ifndef ImDrawIdx
            // typedef unsigned short ImDrawIdx;
            // #endif
            exports_1("ImDrawIdxSize", ImDrawIdxSize = bind.ImDrawIdxSize);
            // Vertex layout
            // #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
            exports_1("ImDrawVertSize", ImDrawVertSize = bind.ImDrawVertSize);
            exports_1("ImDrawVertPosOffset", ImDrawVertPosOffset = bind.ImDrawVertPosOffset);
            exports_1("ImDrawVertUVOffset", ImDrawVertUVOffset = bind.ImDrawVertUVOffset);
            exports_1("ImDrawVertColOffset", ImDrawVertColOffset = bind.ImDrawVertColOffset);
            ImDrawVert = class ImDrawVert {
                constructor(buffer, byteOffset = 0) {
                    this.pos = new Float32Array(buffer, byteOffset + bind.ImDrawVertPosOffset, 2);
                    this.uv = new Float32Array(buffer, byteOffset + bind.ImDrawVertUVOffset, 2);
                    this.col = new Uint32Array(buffer, byteOffset + bind.ImDrawVertColOffset, 1);
                }
            };
            exports_1("ImDrawVert", ImDrawVert);
            // #else
            // You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
            // The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
            // The type has to be described within the macro (you can either declare the struct or use a typedef)
            // NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
            // IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
            // #endif
            // Draw channels are used by the Columns API to "split" the render list into different channels while building, so items of each column can be batched together.
            // You can also use them to simulate drawing layers and submit primitives in a different order than how they will be rendered.
            ImDrawChannel = class ImDrawChannel {
            };
            exports_1("ImDrawChannel", ImDrawChannel);
            ImDrawListSharedData = class ImDrawListSharedData {
                constructor(native) {
                    this.native = native;
                }
            };
            exports_1("ImDrawListSharedData", ImDrawListSharedData);
            // Draw command list
            // This is the low-level list of polygons that ImGui functions are filling. At the end of the frame, all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
            // Each ImGui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to access the current window draw list and draw custom primitives.
            // You can interleave normal ImGui:: calls and adding primitives to the current draw list.
            // All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), however you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
            // Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
            ImDrawList = class ImDrawList {
                constructor(native) {
                    this.native = native;
                }
                IterateDrawCmds(callback) {
                    this.native.IterateDrawCmds((draw_cmd, ElemStart) => {
                        callback(new ImDrawCmd(draw_cmd), ElemStart);
                    });
                }
                // This is what you have to render
                // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
                // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
                get IdxBuffer() { return this.native.IdxBuffer; }
                // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
                get VtxBuffer() { return this.native.VtxBuffer; }
                // [Internal, used while building lists]
                // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
                get Flags() { return this.native.Flags; }
                set Flags(value) { this.native.Flags = value; }
                // const ImDrawListSharedData* _Data;          // Pointer to shared draw data (you can use ImGui::GetDrawListSharedData() to get the one from current ImGui context)
                // const char*             _OwnerName;         // Pointer to owner window's name for debugging
                // unsigned int            _VtxCurrentIdx;     // [Internal] == VtxBuffer.Size
                // ImDrawVert*             _VtxWritePtr;       // [Internal] point within VtxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
                // ImDrawIdx*              _IdxWritePtr;       // [Internal] point within IdxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
                // ImVector<ImVec4>        _ClipRectStack;     // [Internal]
                // ImVector<ImTextureID>   _TextureIdStack;    // [Internal]
                // ImVector<ImVec2>        _Path;              // [Internal] current path building
                // int                     _ChannelsCurrent;   // [Internal] current channel number (0)
                // int                     _ChannelsCount;     // [Internal] number of active channels (1+)
                // ImVector<ImDrawChannel> _Channels;          // [Internal] draw channels for columns API (not resized down so _ChannelsCount may be smaller than _Channels.Size)
                // ImDrawList(const ImDrawListSharedData* shared_data) { _Data = shared_data; _OwnerName = NULL; Clear(); }
                // ~ImDrawList() { ClearFreeMemory(); }
                // IMGUI_API void  PushClipRect(ImVec2 clip_rect_min, ImVec2 clip_rect_max, bool intersect_with_current_clip_rect = false);  // Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)
                PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect = false) {
                    this.native.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
                }
                // IMGUI_API void  PushClipRectFullScreen();
                PushClipRectFullScreen() { this.native.PushClipRectFullScreen(); }
                // IMGUI_API void  PopClipRect();
                PopClipRect() { this.native.PopClipRect(); }
                // IMGUI_API void  PushTextureID(ImTextureID texture_id);
                PushTextureID(texture_id) {
                    this.native.PushTextureID(ImGuiContext.setTexture(texture_id));
                }
                // IMGUI_API void  PopTextureID();
                PopTextureID() { this.native.PopTextureID(); }
                // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
                GetClipRectMin(out = new ImVec2()) {
                    return this.native.GetClipRectMin(out);
                }
                // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }
                GetClipRectMax(out = new ImVec2()) {
                    return this.native.GetClipRectMax(out);
                }
                // Primitives
                // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
                AddLine(a, b, col, thickness = 1.0) {
                    this.native.AddLine(a, b, col, thickness);
                }
                // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
                AddRect(a, b, col, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All, thickness = 1.0) {
                    this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
                }
                // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
                AddRectFilled(a, b, col, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All) {
                    this.native.AddRectFilled(a, b, col, rounding, rounding_corners_flags);
                }
                // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
                AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left) {
                    this.native.AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
                }
                // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
                AddQuad(a, b, c, d, col, thickness = 1.0) {
                    this.native.AddQuad(a, b, c, d, col, thickness);
                }
                // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
                AddQuadFilled(a, b, c, d, col) {
                    this.native.AddQuadFilled(a, b, c, d, col);
                }
                // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
                AddTriangle(a, b, c, col, thickness = 1.0) {
                    this.native.AddTriangle(a, b, c, col, thickness);
                }
                // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
                AddTriangleFilled(a, b, c, col) {
                    this.native.AddTriangleFilled(a, b, c, col);
                }
                // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
                AddCircle(centre, radius, col, num_segments = 12, thickness = 1.0) {
                    this.native.AddCircle(centre, radius, col, num_segments, thickness);
                }
                // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
                AddCircleFilled(centre, radius, col, num_segments = 12) {
                    this.native.AddCircleFilled(centre, radius, col, num_segments);
                }
                // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
                AddText(pos, col, text_begin, text_end = null) {
                    this.native.AddText(pos, col, text_begin, text_end);
                }
                // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
                AddText_Font(font, font_size, pos, col, text_begin, text_end = null, wrap_width = 0.0, cpu_fine_clip_rect = null) {
                    this.native.AddText_Font(font.native, font_size, pos, col, text_begin, text_end, wrap_width, cpu_fine_clip_rect);
                }
                // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
                AddImage(user_texture_id, a, b, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT, col = 0xFFFFFFFF) {
                    this.native.AddImage(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col);
                }
                // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
                AddImageQuad(user_texture_id, a, b, c, d, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT_X, uv_c = ImVec2.UNIT, uv_d = ImVec2.UNIT_Y, col = 0xFFFFFFFF) {
                    this.native.AddImageQuad(ImGuiContext.setTexture(user_texture_id), a, b, c, d, uv_a, uv_b, uv_c, uv_d, col);
                }
                // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
                AddImageRounded(user_texture_id, a, b, uv_a, uv_b, col, rounding, rounding_corners = ImDrawCornerFlags.All) {
                    this.native.AddImageRounded(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col, rounding, rounding_corners);
                }
                // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
                AddPolyline(points, num_points, col, closed, thickness) {
                    this.native.AddPolyline(points, num_points, col, closed, thickness);
                }
                // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
                AddConvexPolyFilled(points, num_points, col) {
                    this.native.AddConvexPolyFilled(points, num_points, col);
                }
                // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
                AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness = 1.0, num_segments = 0) {
                    this.native.AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness, num_segments);
                }
                // Stateful path API, add points then finish with PathFill() or PathStroke()
                // inline    void  PathClear()                                                 { _Path.resize(0); }
                PathClear() { this.native.PathClear(); }
                // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
                PathLineTo(pos) { this.native.PathLineTo(pos); }
                // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
                PathLineToMergeDuplicate(pos) { this.native.PathLineToMergeDuplicate(pos); }
                // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
                PathFillConvex(col) { this.native.PathFillConvex(col); }
                // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
                PathStroke(col, closed, thickness = 1.0) { this.native.PathStroke(col, closed, thickness); }
                // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
                PathArcTo(centre, radius, a_min, a_max, num_segments = 10) { this.native.PathArcTo(centre, radius, a_min, a_max, num_segments); }
                // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
                PathArcToFast(centre, radius, a_min_of_12, a_max_of_12) { this.native.PathArcToFast(centre, radius, a_min_of_12, a_max_of_12); }
                // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
                PathBezierCurveTo(p1, p2, p3, num_segments = 0) { this.native.PathBezierCurveTo(p1, p2, p3, num_segments); }
                // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);
                PathRect(rect_min, rect_max, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All) { this.native.PathRect(rect_min, rect_max, rounding, rounding_corners_flags); }
                // Channels
                // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
                // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
                // IMGUI_API void  ChannelsSplit(int channels_count);
                ChannelsSplit(channels_count) { this.native.ChannelsSplit(channels_count); }
                // IMGUI_API void  ChannelsMerge();
                ChannelsMerge() { this.native.ChannelsMerge(); }
                // IMGUI_API void  ChannelsSetCurrent(int channel_index);
                ChannelsSetCurrent(channel_index) { this.native.ChannelsSetCurrent(channel_index); }
                // Advanced
                // IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
                AddCallback(callback, callback_data) {
                    const _callback = (parent_list, draw_cmd) => {
                        callback(new ImDrawList(parent_list), new ImDrawCmd(draw_cmd));
                    };
                    this.native.AddCallback(_callback, callback_data);
                }
                // IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
                AddDrawCmd() { this.native.AddDrawCmd(); }
                // Internal helpers
                // NB: all primitives needs to be reserved via PrimReserve() beforehand!
                // IMGUI_API void  Clear();
                Clear() { this.native.Clear(); }
                // IMGUI_API void  ClearFreeMemory();
                ClearFreeMemory() { this.native.ClearFreeMemory(); }
                // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
                PrimReserve(idx_count, vtx_count) { this.native.PrimReserve(idx_count, vtx_count); }
                // IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
                PrimRect(a, b, col) { this.native.PrimRect(a, b, col); }
                // IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
                PrimRectUV(a, b, uv_a, uv_b, col) { this.native.PrimRectUV(a, b, uv_a, uv_b, col); }
                // IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
                PrimQuadUV(a, b, c, d, uv_a, uv_b, uv_c, uv_d, col) { this.native.PrimQuadUV(a, b, c, d, uv_a, uv_b, uv_c, uv_d, col); }
                // inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col){ _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
                PrimWriteVtx(pos, uv, col) { this.native.PrimWriteVtx(pos, uv, col); }
                // inline    void  PrimWriteIdx(ImDrawIdx idx)                                 { *_IdxWritePtr = idx; _IdxWritePtr++; }
                PrimWriteIdx(idx) { this.native.PrimWriteIdx(idx); }
                // inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)     { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); }
                PrimVtx(pos, uv, col) { this.native.PrimVtx(pos, uv, col); }
                // IMGUI_API void  UpdateClipRect();
                UpdateClipRect() { this.native.UpdateClipRect(); }
                // IMGUI_API void  UpdateTextureID();
                UpdateTextureID() { this.native.UpdateTextureID(); }
            };
            exports_1("ImDrawList", ImDrawList);
            // All draw data to render an ImGui frame
            ImDrawData = class ImDrawData {
                constructor(native) {
                    this.native = native;
                }
                IterateDrawLists(callback) {
                    this.native.IterateDrawLists((draw_list) => {
                        callback(new ImDrawList(draw_list));
                    });
                }
                // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
                get Valid() { return this.native.Valid; }
                // ImDrawList**    CmdLists;
                // int             CmdListsCount;
                get CmdListsCount() { return this.native.CmdListsCount; }
                // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
                get TotalVtxCount() { return this.native.TotalVtxCount; }
                // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
                get TotalIdxCount() { return this.native.TotalIdxCount; }
                // Functions
                // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
                // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
                DeIndexAllBuffers() { this.native.DeIndexAllBuffers(); }
                // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
                ScaleClipRects(sc) {
                    this.native.ScaleClipRects(sc);
                }
            };
            exports_1("ImDrawData", ImDrawData);
            ImFontConfig = class ImFontConfig {
            };
            exports_1("ImFontConfig", ImFontConfig);
            // struct ImFontGlyph
            ImFontGlyph = class ImFontGlyph {
            };
            exports_1("ImFontGlyph", ImFontGlyph);
            (function (ImFontAtlasFlags) {
                ImFontAtlasFlags[ImFontAtlasFlags["NoPowerOfTwoHeight"] = 1] = "NoPowerOfTwoHeight";
                ImFontAtlasFlags[ImFontAtlasFlags["NoMouseCursors"] = 2] = "NoMouseCursors";
            })(ImFontAtlasFlags || (ImFontAtlasFlags = {}));
            exports_1("ImFontAtlasFlags", ImFontAtlasFlags);
            // Load and rasterize multiple TTF/OTF fonts into a same texture.
            // Sharing a texture for multiple fonts allows us to reduce the number of draw calls during rendering.
            // We also add custom graphic data into the texture that serves for ImGui.
            //  1. (Optional) Call AddFont*** functions. If you don't call any, the default font will be loaded for you.
            //  2. Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
            //  3. Upload the pixels data into a texture within your graphics system.
            //  4. Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture. This value will be passed back to you during rendering to identify the texture.
            // IMPORTANT: If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the ImFont is build (when calling GetTextData*** or Build()). We only copy the pointer, not the data.
            ImFontAtlas = class ImFontAtlas {
                constructor(native) {
                    this.native = native;
                }
                // IMGUI_API ImFontAtlas();
                // IMGUI_API ~ImFontAtlas();
                // IMGUI_API ImFont*           AddFont(const ImFontConfig* font_cfg);
                // IMGUI_API ImFont*           AddFontDefault(const ImFontConfig* font_cfg = NULL);
                // IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
                // IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after Build(). Set font_cfg->FontDataOwnedByAtlas to false to keep ownership.
                // IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
                // IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
                // IMGUI_API void              ClearTexData();             // Clear the CPU-side texture data. Saves RAM once the texture has been copied to graphics memory.
                // IMGUI_API void              ClearInputData();           // Clear the input TTF data (inc sizes, glyph ranges)
                // IMGUI_API void              ClearFonts();               // Clear the ImGui-side font data (glyphs storage, UV coordinates)
                // IMGUI_API void              Clear();                    // Clear all
                // Build atlas, retrieve pixel data.
                // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
                // RGBA32 format is provided for convenience and compatibility, but note that unless you use CustomRect to draw color data, the RGB pixels emitted from Fonts will all be white (~75% of waste).
                // Pitch = Width * BytesPerPixels
                // IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
                Build() { return this.native.Build(); }
                // IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
                GetTexDataAsAlpha8() {
                    return this.native.GetTexDataAsAlpha8();
                }
                // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
                GetTexDataAsRGBA32() {
                    return this.native.GetTexDataAsRGBA32();
                }
                // void                        SetTexID(ImTextureID id)    { TexID = id; }
                SetTexID(id) { this.TexID = id; }
                //-------------------------------------------
                // Glyph Ranges
                //-------------------------------------------
                // Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
                // NB: Make sure that your string are UTF-8 and NOT in your local code page. In C++11, you can create UTF-8 string literal using the u8"Hello world" syntax. See FAQ for details.
                // IMGUI_API const ImWchar*    GetGlyphRangesDefault();    // Basic Latin, Extended Latin
                // IMGUI_API const ImWchar*    GetGlyphRangesKorean();     // Default + Korean characters
                // IMGUI_API const ImWchar*    GetGlyphRangesJapanese();   // Default + Hiragana, Katakana, Half-Width, Selection of 1946 Ideographs
                // IMGUI_API const ImWchar*    GetGlyphRangesChinese();    // Default + Japanese + full set of about 21000 CJK Unified Ideographs
                // IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();   // Default + about 400 Cyrillic characters
                // IMGUI_API const ImWchar*    GetGlyphRangesThai();       // Default + Thai characters
                // Helpers to build glyph ranges from text data. Feed your application strings/characters to it then call BuildRanges().
                // struct GlyphRangesBuilder
                // {
                //     ImVector<unsigned char> UsedChars;  // Store 1-bit per Unicode code point (0=unused, 1=used)
                //     GlyphRangesBuilder()                { UsedChars.resize(0x10000 / 8); memset(UsedChars.Data, 0, 0x10000 / 8); }
                //     bool           GetBit(int n)        { return (UsedChars[n >> 3] & (1 << (n & 7))) != 0; }
                //     void           SetBit(int n)        { UsedChars[n >> 3] |= 1 << (n & 7); }  // Set bit 'c' in the array
                //     void           AddChar(ImWchar c)   { SetBit(c); }                          // Add character
                //     IMGUI_API void AddText(const char* text, const char* text_end = NULL);      // Add string (each character of the UTF-8 string are added)
                //     IMGUI_API void AddRanges(const ImWchar* ranges);                            // Add ranges, e.g. builder.AddRanges(ImFontAtlas::GetGlyphRangesDefault) to force add all of ASCII/Latin+Ext
                //     IMGUI_API void BuildRanges(ImVector<ImWchar>* out_ranges);                  // Output new ranges
                // };
                //-------------------------------------------
                // Custom Rectangles/Glyphs API
                //-------------------------------------------
                // You can request arbitrary rectangles to be packed into the atlas, for your own purposes. After calling Build(), you can query the rectangle position and render your pixels.
                // You can also request your rectangles to be mapped as font glyph (given a font + Unicode point), so you can render e.g. custom colorful icons and use them as regular glyphs.
                // struct CustomRect
                // {
                //     unsigned int    ID;             // Input    // User ID. Use <0x10000 to map into a font glyph, >=0x10000 for other/internal/custom texture data.
                //     unsigned short  Width, Height;  // Input    // Desired rectangle dimension
                //     unsigned short  X, Y;           // Output   // Packed position in Atlas
                //     float           GlyphAdvanceX;  // Input    // For custom font glyphs only (ID<0x10000): glyph xadvance
                //     ImVec2          GlyphOffset;    // Input    // For custom font glyphs only (ID<0x10000): glyph display offset
                //     ImFont*         Font;           // Input    // For custom font glyphs only (ID<0x10000): target font
                //     CustomRect()            { ID = 0xFFFFFFFF; Width = Height = 0; X = Y = 0xFFFF; GlyphAdvanceX = 0.0f; GlyphOffset = ImVec2(0,0); Font = NULL; }
                //     bool IsPacked() const   { return X != 0xFFFF; }
                // };
                // IMGUI_API int       AddCustomRectRegular(unsigned int id, int width, int height);                                                                   // Id needs to be >= 0x10000. Id >= 0x80000000 are reserved for ImGui and ImDrawList
                // IMGUI_API int       AddCustomRectFontGlyph(ImFont* font, ImWchar id, int width, int height, float advance_x, const ImVec2& offset = ImVec2(0,0));   // Id needs to be < 0x10000 to register a rectangle to map into a specific font.
                // IMGUI_API void      CalcCustomRectUV(const CustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max);
                // const CustomRect*   GetCustomRectByIndex(int index) const { if (index < 0) return NULL; return &CustomRects[index]; }
                //-------------------------------------------
                // Members
                //-------------------------------------------
                // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
                get TexID() {
                    return ImGuiContext.getTexture(this.native.getTexID());
                }
                set TexID(value) {
                    this.native.setTexID(ImGuiContext.setTexture(value));
                }
                // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
                // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.
                // [Internal]
                // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
                // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
                // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
                // int                         TexWidth;           // Texture width calculated during Build().
                get TexWidth() { return this.native.TexWidth; }
                // int                         TexHeight;          // Texture height calculated during Build().
                get TexHeight() { return this.native.TexHeight; }
            };
            exports_1("ImFontAtlas", ImFontAtlas);
            // Font runtime data and rendering
            // ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
            ImFont = class ImFont {
                constructor(native) {
                    this.native = native;
                }
                // Members: Hot ~62/78 bytes
                // float                       FontSize;           // <user set>   // Height of characters, set during loading (don't change after loading)
                // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
                // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
                // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
                // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
                // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
                // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
                // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
                // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
                // Members: Cold ~18/26 bytes
                // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
                // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
                // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
                // float                       Ascent, Descent;    //              // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
                // int                         MetricsTotalSurface;//              // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)
                // Methods
                // IMGUI_API ImFont();
                // IMGUI_API ~ImFont();
                // IMGUI_API void              ClearOutputData();
                // IMGUI_API void              BuildLookupTable();
                // IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
                // IMGUI_API void              SetFallbackChar(ImWchar c);
                // float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
                // bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
                // const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }
                GetDebugName() { return this.native.GetDebugName(); }
                // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
                // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
                // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
                CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end = null, remaining = null) {
                    return this.native.CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end, remaining, new ImVec2());
                }
            };
            exports_1("ImFont", ImFont);
            // a script version of BindImGui.ImGuiStyle with matching interface
            script_ImGuiStyle = class script_ImGuiStyle {
                constructor() {
                    this.Alpha = 1.0;
                    this.WindowPadding = new ImVec2(8, 8);
                    this.WindowRounding = 7.0;
                    this.WindowBorderSize = 0.0;
                    this.WindowMinSize = new ImVec2(32, 32);
                    this.WindowTitleAlign = new ImVec2(0.0, 0.5);
                    this.ChildRounding = 0.0;
                    this.ChildBorderSize = 1.0;
                    this.PopupRounding = 0.0;
                    this.PopupBorderSize = 1.0;
                    this.FramePadding = new ImVec2(4, 3);
                    this.FrameRounding = 0.0;
                    this.FrameBorderSize = 0.0;
                    this.ItemSpacing = new ImVec2(8, 4);
                    this.ItemInnerSpacing = new ImVec2(4, 4);
                    this.TouchExtraPadding = new ImVec2(0, 0);
                    this.IndentSpacing = 21.0;
                    this.ColumnsMinSpacing = 6.0;
                    this.ScrollbarSize = 16.0;
                    this.ScrollbarRounding = 9.0;
                    this.GrabMinSize = 10.0;
                    this.GrabRounding = 0.0;
                    this.ButtonTextAlign = new ImVec2(0.5, 0.5);
                    this.DisplayWindowPadding = new ImVec2(22, 22);
                    this.DisplaySafeAreaPadding = new ImVec2(4, 4);
                    this.MouseCursorScale = 1;
                    this.AntiAliasedLines = true;
                    this.AntiAliasedFill = true;
                    this.CurveTessellationTol = 1.25;
                    this.Colors = [];
                    for (let i = 0; i < ImGuiCol.COUNT; ++i) {
                        this.Colors[i] = new ImVec4();
                    }
                    const _this = new ImGuiStyle(this);
                    const native = new bind.ImGuiStyle();
                    const _that = new ImGuiStyle(native);
                    _that.Copy(_this);
                    bind.StyleColorsClassic(native);
                    _this.Copy(_that);
                    native.delete();
                }
                getWindowPadding() { return this.WindowPadding; }
                getWindowMinSize() { return this.WindowMinSize; }
                getWindowTitleAlign() { return this.WindowTitleAlign; }
                getFramePadding() { return this.FramePadding; }
                getItemSpacing() { return this.ItemSpacing; }
                getItemInnerSpacing() { return this.ItemInnerSpacing; }
                getTouchExtraPadding() { return this.TouchExtraPadding; }
                getButtonTextAlign() { return this.ButtonTextAlign; }
                getDisplayWindowPadding() { return this.DisplayWindowPadding; }
                getDisplaySafeAreaPadding() { return this.DisplaySafeAreaPadding; }
                getColorsAt(index) { return this.Colors[index]; }
                setColorsAt(index, color) { this.Colors[index].Copy(color); return true; }
                ScaleAllSizes(scale_factor) {
                    const _this = new ImGuiStyle(this);
                    const native = new bind.ImGuiStyle();
                    const _that = new ImGuiStyle(native);
                    _that.Copy(_this);
                    native.ScaleAllSizes(scale_factor);
                    _this.Copy(_that);
                    native.delete();
                }
            };
            ImGuiStyle = class ImGuiStyle {
                constructor(internal = new script_ImGuiStyle()) {
                    this.internal = internal;
                    this.Colors = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiCol.COUNT;
                            }
                            return this.internal.getColorsAt(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.internal.setColorsAt(Number(key), value);
                        },
                    });
                }
                get Alpha() { return this.internal.Alpha; }
                set Alpha(value) { this.internal.Alpha = value; }
                get WindowPadding() { return this.internal.getWindowPadding(); }
                get WindowRounding() { return this.internal.WindowRounding; }
                set WindowRounding(value) { this.internal.WindowRounding = value; }
                get WindowBorderSize() { return this.internal.WindowBorderSize; }
                set WindowBorderSize(value) { this.internal.WindowBorderSize = value; }
                get WindowMinSize() { return this.internal.getWindowMinSize(); }
                get WindowTitleAlign() { return this.internal.getWindowTitleAlign(); }
                get ChildRounding() { return this.internal.ChildRounding; }
                set ChildRounding(value) { this.internal.ChildRounding = value; }
                get ChildBorderSize() { return this.internal.ChildBorderSize; }
                set ChildBorderSize(value) { this.internal.ChildBorderSize = value; }
                get PopupRounding() { return this.internal.PopupRounding; }
                set PopupRounding(value) { this.internal.PopupRounding = value; }
                get PopupBorderSize() { return this.internal.PopupBorderSize; }
                set PopupBorderSize(value) { this.internal.PopupBorderSize = value; }
                get FramePadding() { return this.internal.getFramePadding(); }
                get FrameRounding() { return this.internal.FrameRounding; }
                set FrameRounding(value) { this.internal.FrameRounding = value; }
                get FrameBorderSize() { return this.internal.FrameBorderSize; }
                set FrameBorderSize(value) { this.internal.FrameBorderSize = value; }
                get ItemSpacing() { return this.internal.getItemSpacing(); }
                get ItemInnerSpacing() { return this.internal.getItemInnerSpacing(); }
                get TouchExtraPadding() { return this.internal.getTouchExtraPadding(); }
                get IndentSpacing() { return this.internal.IndentSpacing; }
                set IndentSpacing(value) { this.internal.IndentSpacing = value; }
                get ColumnsMinSpacing() { return this.internal.ColumnsMinSpacing; }
                set ColumnsMinSpacing(value) { this.internal.ColumnsMinSpacing = value; }
                get ScrollbarSize() { return this.internal.ScrollbarSize; }
                set ScrollbarSize(value) { this.internal.ScrollbarSize = value; }
                get ScrollbarRounding() { return this.internal.ScrollbarRounding; }
                set ScrollbarRounding(value) { this.internal.ScrollbarRounding = value; }
                get GrabMinSize() { return this.internal.GrabMinSize; }
                set GrabMinSize(value) { this.internal.GrabMinSize = value; }
                get GrabRounding() { return this.internal.GrabRounding; }
                set GrabRounding(value) { this.internal.GrabRounding = value; }
                get ButtonTextAlign() { return this.internal.getButtonTextAlign(); }
                get DisplayWindowPadding() { return this.internal.getDisplayWindowPadding(); }
                get DisplaySafeAreaPadding() { return this.internal.getDisplaySafeAreaPadding(); }
                get MouseCursorScale() { return this.internal.MouseCursorScale; }
                set MouseCursorScale(value) { this.internal.MouseCursorScale = value; }
                get AntiAliasedLines() { return this.internal.AntiAliasedLines; }
                set AntiAliasedLines(value) { this.internal.AntiAliasedLines = value; }
                get AntiAliasedFill() { return this.internal.AntiAliasedFill; }
                set AntiAliasedFill(value) { this.internal.AntiAliasedFill = value; }
                get CurveTessellationTol() { return this.internal.CurveTessellationTol; }
                set CurveTessellationTol(value) { this.internal.CurveTessellationTol = value; }
                Copy(other) {
                    this.Alpha = other.Alpha;
                    this.WindowPadding.Copy(this.WindowPadding);
                    this.WindowRounding = other.WindowRounding;
                    this.WindowBorderSize = other.WindowBorderSize;
                    this.WindowMinSize.Copy(this.WindowMinSize);
                    this.WindowTitleAlign.Copy(this.WindowTitleAlign);
                    this.ChildRounding = other.ChildRounding;
                    this.ChildBorderSize = other.ChildBorderSize;
                    this.PopupRounding = other.PopupRounding;
                    this.PopupBorderSize = other.PopupBorderSize;
                    this.FramePadding.Copy(this.FramePadding);
                    this.FrameRounding = other.FrameRounding;
                    this.FrameBorderSize = other.FrameBorderSize;
                    this.ItemSpacing.Copy(this.ItemSpacing);
                    this.ItemInnerSpacing.Copy(this.ItemInnerSpacing);
                    this.TouchExtraPadding.Copy(this.TouchExtraPadding);
                    this.IndentSpacing = other.IndentSpacing;
                    this.ColumnsMinSpacing = other.ColumnsMinSpacing;
                    this.ScrollbarSize = other.ScrollbarSize;
                    this.ScrollbarRounding = other.ScrollbarRounding;
                    this.GrabMinSize = other.GrabMinSize;
                    this.GrabRounding = other.GrabRounding;
                    this.ButtonTextAlign.Copy(this.ButtonTextAlign);
                    this.DisplayWindowPadding.Copy(this.DisplayWindowPadding);
                    this.DisplaySafeAreaPadding.Copy(this.DisplaySafeAreaPadding);
                    this.MouseCursorScale = other.MouseCursorScale;
                    this.AntiAliasedLines = other.AntiAliasedLines;
                    this.AntiAliasedFill = other.AntiAliasedFill;
                    this.CurveTessellationTol = other.CurveTessellationTol;
                    for (let i = 0; i < ImGuiCol.COUNT; ++i) {
                        this.Colors[i].Copy(other.Colors[i]);
                    }
                    return this;
                }
                ScaleAllSizes(scale_factor) { this.internal.ScaleAllSizes(scale_factor); }
            };
            exports_1("ImGuiStyle", ImGuiStyle);
            // This is where your app communicate with ImGui. Access via ImGui::GetIO().
            // Read 'Programmer guide' section in .cpp file for general usage.
            ImGuiIO = class ImGuiIO {
                constructor(native) {
                    this.native = native;
                    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
                    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
                    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
                    // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
                    // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
                    // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
                    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
                    this.KeyMap = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiKey.COUNT;
                            }
                            return this.native.getKeyMapAt(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native.setKeyMapAt(Number(key), value);
                        },
                    });
                    // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
                    this.MouseDown = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 5;
                            }
                            return this.native.getMouseDownAt(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native.setMouseDownAt(Number(key), value);
                        },
                    });
                    // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
                    this.KeysDown = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 512;
                            }
                            return this.native.getKeysDownAt(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native.setKeysDownAt(Number(key), value);
                        },
                    });
                    // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
                    // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
                    this.NavInputs = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiNavInput.COUNT;
                            }
                            return this.native.getNavInputsAt(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native.setNavInputsAt(Number(key), value);
                        },
                    });
                    //------------------------------------------------------------------
                    // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
                    //------------------------------------------------------------------
                    // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
                    // ImVec2      MouseClickedPos[5];         // Position at time of clicking
                    // public getMouseClickedPosAt(index: number): Readonly<BindImGui.reference_ImVec2>;
                    this.MouseClickedPos = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 5;
                            }
                            return this.native.getMouseClickedPosAt(Number(key));
                        },
                    });
                    // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
                    // bool        MouseClicked[5];            // Mouse button went from !Down to Down
                    // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
                    // bool        MouseReleased[5];           // Mouse button went from Down to !Down
                    // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
                    // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
                    this.MouseDownDuration = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 5;
                            }
                            return this.native.getMouseDownDurationAt(Number(key));
                        },
                    });
                    // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
                    // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
                    // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
                    // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
                    this.KeysDownDuration = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 512;
                            }
                            return this.native.getKeysDownDurationAt(Number(key));
                        },
                    });
                    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
                    // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
                    this.NavInputsDownDuration = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiNavInput.COUNT;
                            }
                            return this.native.getNavInputsDownDurationAt(Number(key));
                        },
                    });
                }
                //------------------------------------------------------------------
                // Settings (fill once)                 // Default value:
                //------------------------------------------------------------------
                // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
                get DisplaySize() { return this.native.getDisplaySize(); }
                // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
                get DeltaTime() { return this.native.DeltaTime; }
                set DeltaTime(value) { this.native.DeltaTime = value; }
                // ImGuiConfigFlags ConfigFlags;                 // = 0x00               // See ImGuiConfigFlags_. Gamepad/keyboard navigation options.
                get ConfigFlags() { return this.native.ConfigFlags; }
                set ConfigFlags(value) { this.native.ConfigFlags = value; }
                // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
                // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
                // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.
                // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
                get Fonts() { return new ImFontAtlas(this.native.getFonts()); }
                // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
                get FontGlobalScale() { return this.native.FontGlobalScale; }
                set FontGlobalScale(value) { this.native.FontGlobalScale = value; }
                // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
                get FontAllowUserScaling() { return false; }
                // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
                // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
                get DisplayFramebufferScale() { return this.native.getDisplayFramebufferScale(); }
                // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
                // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize
                // Advanced/subtle behaviors
                // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
                // bool          OptCursorBlink;           // = true               // Enable blinking cursor, for users who consider it annoying.
                //------------------------------------------------------------------
                // Settings (User Functions)
                //------------------------------------------------------------------
                // Optional: access OS clipboard
                // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
                // const char* (*GetClipboardTextFn)(void* user_data);
                // void        (*SetClipboardTextFn)(void* user_data, const char* text);
                // void*       ClipboardUserData;
                // Optional: override memory allocations. MemFreeFn() may be called with a NULL pointer.
                // (default to posix malloc/free)
                // void*       (*MemAllocFn)(size_t sz);
                // void        (*MemFreeFn)(void* ptr);
                // Optional: notify OS Input Method Editor of the screen position of your cursor for text input position (e.g. when using Japanese/Chinese IME in Windows)
                // (default to use native imm32 api on Windows)
                // void        (*ImeSetInputScreenPosFn)(int x, int y);
                // void*       ImeWindowHandle;            // (Windows) Set this to your HWND to get automatic IME cursor positioning.
                //------------------------------------------------------------------
                // Input - Fill before calling NewFrame()
                //------------------------------------------------------------------
                // ImVec2      MousePos;                   // Mouse position, in pixels. Set to ImVec2(-FLT_MAX,-FLT_MAX) if mouse is unavailable (on another screen, etc.)
                get MousePos() { return this.native.getMousePos(); }
                // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
                get MouseWheel() { return this.native.MouseWheel; }
                set MouseWheel(value) { this.native.MouseWheel = value; }
                // float       MouseWheelH;                    // Mouse wheel (Horizontal). Most users don't have a mouse with an horizontal wheel, may not be filled by all back-ends.
                get MouseWheelH() { return this.native.MouseWheelH; }
                set MouseWheelH(value) { this.native.MouseWheelH = value; }
                // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
                get MouseDrawCursor() { return this.native.MouseDrawCursor; }
                set MouseDrawCursor(value) { this.native.MouseDrawCursor = value; }
                // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
                get KeyCtrl() { return this.native.KeyCtrl; }
                set KeyCtrl(value) { this.native.KeyCtrl = value; }
                // bool        KeyShift;                   // Keyboard modifier pressed: Shift
                get KeyShift() { return this.native.KeyShift; }
                set KeyShift(value) { this.native.KeyShift = value; }
                // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
                get KeyAlt() { return this.native.KeyAlt; }
                set KeyAlt(value) { this.native.KeyAlt = value; }
                // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
                get KeySuper() { return this.native.KeySuper; }
                set KeySuper(value) { this.native.KeySuper = value; }
                // Functions
                // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
                AddInputCharacter(c) { this.native.AddInputCharacter(c); }
                // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
                // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually
                //------------------------------------------------------------------
                // Output - Retrieve after calling NewFrame()
                //------------------------------------------------------------------
                // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active).
                get WantCaptureMouse() { return this.native.WantCaptureMouse; }
                set WantCaptureMouse(value) { this.native.WantCaptureMouse = value; }
                // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
                get WantCaptureKeyboard() { return this.native.WantCaptureKeyboard; }
                set WantCaptureKeyboard(value) { this.native.WantCaptureKeyboard = value; }
                // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
                get WantTextInput() { return this.native.WantTextInput; }
                set WantTextInput(value) { this.native.WantTextInput = value; }
                // bool        WantMoveMouse;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
                get WantMoveMouse() { return this.native.WantMoveMouse; }
                set WantMoveMouse(value) { this.native.WantMoveMouse = value; }
                // bool        NavActive;                  // Directional navigation is currently allowed (will handle ImGuiKey_NavXXX events) = a window is focused and it doesn't use the ImGuiWindowFlags_NoNavInputs flag.
                get NavActive() { return this.native.NavActive; }
                set NavActive(value) { this.native.NavActive = value; }
                // bool        NavVisible;                 // Directional navigation is visible and allowed (will handle ImGuiKey_NavXXX events).
                get NavVisible() { return this.native.NavVisible; }
                set NavVisible(value) { this.native.NavVisible = value; }
                // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
                get Framerate() { return this.native.Framerate; }
                // int         MetricsAllocs;              // Number of active memory allocations
                // int         MetricsRenderVertices;      // Vertices output during last call to Render()
                // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
                // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
                // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
                get MouseDelta() { return this.native.getMouseDelta(); }
            };
            exports_1("ImGuiIO", ImGuiIO);
            // Context creation and access, if you want to use multiple context, share context between modules (e.g. DLL).
            // All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
            // All those functions are not reliant on the current context.
            ImGuiContext = class ImGuiContext {
                constructor(native) {
                    this.native = native;
                    this.textures = [];
                }
                static getTexture(index) {
                    if (ImGuiContext.current_ctx === null) {
                        throw new Error();
                    }
                    return ImGuiContext.current_ctx._getTexture(index);
                }
                static setTexture(texture) {
                    if (ImGuiContext.current_ctx === null) {
                        throw new Error();
                    }
                    return ImGuiContext.current_ctx._setTexture(texture);
                }
                delete() {
                    this.textures.length = 0;
                }
                _getTexture(index) {
                    return this.textures[index] || null;
                }
                _setTexture(texture) {
                    let index = this.textures.indexOf(texture);
                    if (index === -1) {
                        for (let i = 0; i < this.textures.length; ++i) {
                            if (this.textures[i] === null) {
                                this.textures[i] = texture;
                                return i;
                            }
                        }
                        index = this.textures.length;
                        this.textures.push(texture);
                    }
                    return index;
                }
            };
            ImGuiContext.current_ctx = null;
            exports_1("ImGuiContext", ImGuiContext);
            // IMGUI_API const char*   GetVersion();
            exports_1("GetVersion", GetVersion = bind.GetVersion);
            // IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
            exports_1("End", End = bind.End);
            // IMGUI_API float         GetContentRegionAvailWidth();                                       //
            exports_1("GetContentRegionAvailWidth", GetContentRegionAvailWidth = bind.GetContentRegionAvailWidth);
            // IMGUI_API float         GetWindowContentRegionWidth();                                      //
            exports_1("GetWindowContentRegionWidth", GetWindowContentRegionWidth = bind.GetWindowContentRegionWidth);
            // IMGUI_API float         GetWindowWidth();
            exports_1("GetWindowWidth", GetWindowWidth = bind.GetWindowWidth);
            // IMGUI_API float         GetWindowHeight();
            exports_1("GetWindowHeight", GetWindowHeight = bind.GetWindowHeight);
            // IMGUI_API bool          IsWindowCollapsed();
            exports_1("IsWindowCollapsed", IsWindowCollapsed = bind.IsWindowCollapsed);
            // IMGUI_API bool          IsWindowAppearing();
            exports_1("IsWindowAppearing", IsWindowAppearing = bind.IsWindowAppearing);
            // IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
            exports_1("SetWindowFontScale", SetWindowFontScale = bind.SetWindowFontScale);
            // IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
            exports_1("SetNextWindowFocus", SetNextWindowFocus = bind.SetNextWindowFocus);
            // IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                  // set next window background color alpha. helper to easily modify ImGuiCol_WindowBg/ChildBg/PopupBg.
            exports_1("SetNextWindowBgAlpha", SetNextWindowBgAlpha = bind.SetNextWindowBgAlpha);
            // IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
            exports_1("GetScrollX", GetScrollX = bind.GetScrollX);
            // IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
            exports_1("GetScrollY", GetScrollY = bind.GetScrollY);
            // IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
            exports_1("GetScrollMaxX", GetScrollMaxX = bind.GetScrollMaxX);
            // IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
            exports_1("GetScrollMaxY", GetScrollMaxY = bind.GetScrollMaxY);
            // IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
            exports_1("SetScrollX", SetScrollX = bind.SetScrollX);
            // IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
            exports_1("SetScrollY", SetScrollY = bind.SetScrollY);
            // IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
            exports_1("GetFontSize", GetFontSize = bind.GetFontSize);
            // Parameters stacks (current window)
            // IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
            exports_1("PushItemWidth", PushItemWidth = bind.PushItemWidth);
            // IMGUI_API void          PopItemWidth();
            exports_1("PopItemWidth", PopItemWidth = bind.PopItemWidth);
            // IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
            exports_1("CalcItemWidth", CalcItemWidth = bind.CalcItemWidth);
            // IMGUI_API void          PopTextWrapPos();
            exports_1("PopTextWrapPos", PopTextWrapPos = bind.PopTextWrapPos);
            // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
            exports_1("PushAllowKeyboardFocus", PushAllowKeyboardFocus = bind.PushAllowKeyboardFocus);
            // IMGUI_API void          PopAllowKeyboardFocus();
            exports_1("PopAllowKeyboardFocus", PopAllowKeyboardFocus = bind.PopAllowKeyboardFocus);
            // IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
            exports_1("PushButtonRepeat", PushButtonRepeat = bind.PushButtonRepeat);
            // IMGUI_API void          PopButtonRepeat();
            exports_1("PopButtonRepeat", PopButtonRepeat = bind.PopButtonRepeat);
            // Cursor / Layout
            // IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
            exports_1("Separator", Separator = bind.Separator);
            // IMGUI_API void          NewLine();                                                          // undo a SameLine()
            exports_1("NewLine", NewLine = bind.NewLine);
            // IMGUI_API void          Spacing();                                                          // add vertical spacing
            exports_1("Spacing", Spacing = bind.Spacing);
            // IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
            exports_1("BeginGroup", BeginGroup = bind.BeginGroup);
            // IMGUI_API void          EndGroup();
            exports_1("EndGroup", EndGroup = bind.EndGroup);
            // IMGUI_API float         GetCursorPosX();                                                    // "
            exports_1("GetCursorPosX", GetCursorPosX = bind.GetCursorPosX);
            // IMGUI_API float         GetCursorPosY();                                                    // "
            exports_1("GetCursorPosY", GetCursorPosY = bind.GetCursorPosY);
            // IMGUI_API void          SetCursorPosX(float x);                                             // "
            exports_1("SetCursorPosX", SetCursorPosX = bind.SetCursorPosX);
            // IMGUI_API void          SetCursorPosY(float y);                                             // "
            exports_1("SetCursorPosY", SetCursorPosY = bind.SetCursorPosY);
            // IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
            exports_1("AlignTextToFramePadding", AlignTextToFramePadding = bind.AlignTextToFramePadding);
            // IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
            exports_1("GetTextLineHeight", GetTextLineHeight = bind.GetTextLineHeight);
            // IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
            exports_1("GetTextLineHeightWithSpacing", GetTextLineHeightWithSpacing = bind.GetTextLineHeightWithSpacing);
            // IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
            exports_1("GetFrameHeight", GetFrameHeight = bind.GetFrameHeight);
            // IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
            exports_1("GetFrameHeightWithSpacing", GetFrameHeightWithSpacing = bind.GetFrameHeightWithSpacing);
            // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
            exports_1("NextColumn", NextColumn = bind.NextColumn);
            // IMGUI_API int           GetColumnIndex();                                                   // get current column index
            exports_1("GetColumnIndex", GetColumnIndex = bind.GetColumnIndex);
            // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
            exports_1("SetColumnWidth", SetColumnWidth = bind.SetColumnWidth);
            // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
            exports_1("SetColumnOffset", SetColumnOffset = bind.SetColumnOffset);
            // IMGUI_API int           GetColumnsCount();
            exports_1("GetColumnsCount", GetColumnsCount = bind.GetColumnsCount);
            // ID scopes
            // If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
            // You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
            // IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
            // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
            // IMGUI_API void          PushID(const void* ptr_id);
            // IMGUI_API void          PushID(int int_id);
            exports_1("PushID", PushID = bind.PushID);
            // IMGUI_API void          PopID();
            exports_1("PopID", PopID = bind.PopID);
            // IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
            // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
            // IMGUI_API ImGuiID       GetID(const void* ptr_id);
            exports_1("GetID", GetID = bind.GetID);
            // IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
            exports_1("Bullet", Bullet = bind.Bullet);
            // IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
            exports_1("SmallButton", SmallButton = bind.SmallButton);
            // Widgets: Input with Keyboard
            // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
            InputText_user_data = null;
            // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
            InputTextMultiline_user_data = null;
            // IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
            // IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
            exports_1("TreePush", TreePush = bind.TreePush);
            // IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
            exports_1("TreePop", TreePop = bind.TreePop);
            // IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
            exports_1("TreeAdvanceToLabelPos", TreeAdvanceToLabelPos = bind.TreeAdvanceToLabelPos);
            // IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
            exports_1("GetTreeNodeToLabelSpacing", GetTreeNodeToLabelSpacing = bind.GetTreeNodeToLabelSpacing);
            // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
            exports_1("BeginTooltip", BeginTooltip = bind.BeginTooltip);
            // IMGUI_API void          EndTooltip();
            exports_1("EndTooltip", EndTooltip = bind.EndTooltip);
            // Menus
            // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
            exports_1("BeginMainMenuBar", BeginMainMenuBar = bind.BeginMainMenuBar);
            // IMGUI_API void          EndMainMenuBar();
            exports_1("EndMainMenuBar", EndMainMenuBar = bind.EndMainMenuBar);
            // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
            exports_1("BeginMenuBar", BeginMenuBar = bind.BeginMenuBar);
            // IMGUI_API void          EndMenuBar();
            exports_1("EndMenuBar", EndMenuBar = bind.EndMenuBar);
            // IMGUI_API void          EndMenu();
            exports_1("EndMenu", EndMenu = bind.EndMenu);
            // Popups
            // IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
            exports_1("OpenPopup", OpenPopup = bind.OpenPopup);
            // IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
            exports_1("BeginPopup", BeginPopup = bind.BeginPopup);
            // IMGUI_API void          EndPopup();
            exports_1("EndPopup", EndPopup = bind.EndPopup);
            // IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
            exports_1("IsPopupOpen", IsPopupOpen = bind.IsPopupOpen);
            // IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
            exports_1("CloseCurrentPopup", CloseCurrentPopup = bind.CloseCurrentPopup);
            // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
            exports_1("LogFinish", LogFinish = bind.LogFinish);
            // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
            exports_1("LogButtons", LogButtons = bind.LogButtons);
            // Focus
            // (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
            // (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
            // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
            exports_1("SetItemDefaultFocus", SetItemDefaultFocus = bind.SetItemDefaultFocus);
            // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
            exports_1("IsItemActive", IsItemActive = bind.IsItemActive);
            // IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
            exports_1("IsItemFocused", IsItemFocused = bind.IsItemFocused);
            // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
            exports_1("IsItemVisible", IsItemVisible = bind.IsItemVisible);
            // IMGUI_API bool          IsAnyItemHovered();
            exports_1("IsAnyItemHovered", IsAnyItemHovered = bind.IsAnyItemHovered);
            // IMGUI_API bool          IsAnyItemActive();
            exports_1("IsAnyItemActive", IsAnyItemActive = bind.IsAnyItemActive);
            // IMGUI_API bool          IsAnyItemFocused();
            exports_1("IsAnyItemFocused", IsAnyItemFocused = bind.IsAnyItemFocused);
            // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
            exports_1("SetItemAllowOverlap", SetItemAllowOverlap = bind.SetItemAllowOverlap);
            // IMGUI_API float         GetTime();
            exports_1("GetTime", GetTime = bind.GetTime);
            // IMGUI_API int           GetFrameCount();
            exports_1("GetFrameCount", GetFrameCount = bind.GetFrameCount);
            // IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
            exports_1("GetStyleColorName", GetStyleColorName = bind.GetStyleColorName);
            // IMGUI_API void          EndChildFrame();
            exports_1("EndChildFrame", EndChildFrame = bind.EndChildFrame);
            // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
            exports_1("ColorConvertRGBtoHSV", ColorConvertRGBtoHSV = bind.ColorConvertRGBtoHSV);
            // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
            exports_1("ColorConvertHSVtoRGB", ColorConvertHSVtoRGB = bind.ColorConvertHSVtoRGB);
            // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
            exports_1("GetMouseCursor", GetMouseCursor = bind.GetMouseCursor);
            // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
            exports_1("SetMouseCursor", SetMouseCursor = bind.SetMouseCursor);
            // Helpers functions to access functions pointers in ImGui::GetIO()
            // IMGUI_API void*         MemAlloc(size_t sz);
            exports_1("MemAlloc", MemAlloc = bind.MemAlloc);
            // IMGUI_API void          MemFree(void* ptr);
            exports_1("MemFree", MemFree = bind.MemFree);
            // IMGUI_API const char*   GetClipboardText();
            exports_1("GetClipboardText", GetClipboardText = bind.GetClipboardText);
            // IMGUI_API void          SetClipboardText(const char* text);
            exports_1("SetClipboardText", SetClipboardText = bind.SetClipboardText);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWd1aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQSxtQkFBMEIsS0FBdUIsSUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO0tBQUUsQ0FBQyxDQUFDOztJQUUvRixzQkFBNkIsSUFBcUM7UUFDOUQsSUFBSSxJQUFJLFlBQVksY0FBYyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7SUF5c0JELGtCQUF5QixDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEdBQUc7UUFDckUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekgsQ0FBQzs7SUE4bENELGdGQUFnRjtJQUNoRix1QkFBOEIsb0JBQXdDLElBQUk7UUFDdEUsTUFBTSxVQUFVLEdBQTZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FBRTtRQUMvQyxNQUFNLEdBQUcsR0FBaUIsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxZQUFZLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUNuQyxZQUFZLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztTQUNsQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7SUFDRCx3R0FBd0c7SUFDeEcsd0JBQStCLE1BQTJCLElB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