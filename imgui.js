System.register(["./bind-imgui", "./imconfig"], function (exports_1, context_1) {
    "use strict";
    var Bind, bind, config, IMGUI_VERSION, ImStringBuffer, ImGuiWindowFlags, ImGuiInputTextFlags, ImGuiTreeNodeFlags, ImGuiSelectableFlags, ImGuiComboFlags, ImGuiFocusedFlags, ImGuiHoveredFlags, ImGuiDragDropFlags, IMGUI_PAYLOAD_TYPE_COLOR_3F, IMGUI_PAYLOAD_TYPE_COLOR_4F, ImGuiDataType, ImGuiDir, ImGuiKey, ImGuiNavInput, ImGuiConfigFlags, ImGuiCol, ImGuiStyleVar, ImGuiBackendFlags, ImGuiColorEditFlags, ImGuiMouseCursor, ImGuiCond, ImDrawCornerFlags, ImDrawListFlags, ImVec2, ImVec4, ImVector, ImGuiTextFilter, ImGuiTextBuffer, ImGuiStorage, ImGuiPayload, IM_COL32_R_SHIFT, IM_COL32_G_SHIFT, IM_COL32_B_SHIFT, IM_COL32_A_SHIFT, IM_COL32_A_MASK, IM_COL32_WHITE, IM_COL32_BLACK, IM_COL32_BLACK_TRANS, ImColor, ImGuiTextEditDefaultSize, ImGuiTextEditCallbackData, ImGuiSizeCallbackData, ImGuiListClipper, ImDrawCmd, ImDrawIdxSize, ImDrawVertSize, ImDrawVertPosOffset, ImDrawVertUVOffset, ImDrawVertColOffset, ImDrawVert, ImDrawChannel, ImDrawListSharedData, ImDrawList, ImDrawData, ImFontConfig, ImFontGlyph, ImFontAtlasFlags, ImFontAtlas, ImFont, script_ImGuiStyle, ImGuiStyle, ImGuiIO, ImGuiContext, GetVersion, End, GetContentRegionAvailWidth, GetWindowContentRegionWidth, GetWindowWidth, GetWindowHeight, IsWindowCollapsed, IsWindowAppearing, SetWindowFontScale, SetNextWindowFocus, SetNextWindowBgAlpha, GetScrollX, GetScrollY, GetScrollMaxX, GetScrollMaxY, SetScrollX, SetScrollY, GetFontSize, PushItemWidth, PopItemWidth, CalcItemWidth, PopTextWrapPos, PushAllowKeyboardFocus, PopAllowKeyboardFocus, PushButtonRepeat, PopButtonRepeat, Separator, NewLine, Spacing, BeginGroup, EndGroup, GetCursorPosX, GetCursorPosY, SetCursorPosX, SetCursorPosY, AlignTextToFramePadding, GetTextLineHeight, GetTextLineHeightWithSpacing, GetFrameHeight, GetFrameHeightWithSpacing, NextColumn, GetColumnIndex, SetColumnWidth, SetColumnOffset, GetColumnsCount, PushID, PopID, GetID, Bullet, SmallButton, ArrowButton, InputText_user_data, InputTextMultiline_user_data, TreePop, TreeAdvanceToLabelPos, GetTreeNodeToLabelSpacing, BeginTooltip, EndTooltip, BeginMainMenuBar, EndMainMenuBar, BeginMenuBar, EndMenuBar, EndMenu, OpenPopup, BeginPopup, EndPopup, IsPopupOpen, CloseCurrentPopup, LogFinish, LogButtons, SetItemDefaultFocus, IsItemActive, IsItemFocused, IsItemVisible, IsItemDeactivated, IsItemDeactivatedAfterChange, IsAnyItemHovered, IsAnyItemActive, IsAnyItemFocused, SetItemAllowOverlap, GetTime, GetFrameCount, GetStyleColorName, EndChildFrame, ColorConvertRGBtoHSV, ColorConvertHSVtoRGB, GetMouseCursor, SetMouseCursor, GetClipboardText, SetClipboardText, MemAlloc, MemFree;
    var __moduleName = context_1 && context_1.id;
    function IMGUI_CHECKVERSION() { return bind.IMGUI_CHECKVERSION(); }
    exports_1("IMGUI_CHECKVERSION", IMGUI_CHECKVERSION);
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
    function DebugCheckVersionAndDataLayout() {
        return true; // TODO
    }
    exports_1("DebugCheckVersionAndDataLayout", DebugCheckVersionAndDataLayout);
    // Main
    // IMGUI_API ImGuiIO&      GetIO();
    function GetIO() { return new ImGuiIO(bind.GetIO()); }
    exports_1("GetIO", GetIO);
    // IMGUI_API ImGuiStyle&   GetStyle();
    function GetStyle() { return new ImGuiStyle(bind.GetStyle()); }
    exports_1("GetStyle", GetStyle);
    // IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
    function NewFrame() { bind.NewFrame(); }
    exports_1("NewFrame", NewFrame);
    // IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
    function EndFrame() { bind.EndFrame(); }
    exports_1("EndFrame", EndFrame);
    // IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
    function Render() { bind.Render(); }
    exports_1("Render", Render);
    // IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
    function GetDrawData() {
        const draw_data = bind.GetDrawData();
        return (draw_data === null) ? null : new ImDrawData(draw_data);
    }
    exports_1("GetDrawData", GetDrawData);
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
    function PushFont(font) { bind.PushFont(font ? font.native : null); }
    exports_1("PushFont", PushFont);
    // IMGUI_API void          PopFont();
    function PopFont() { bind.PopFont(); }
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
    function GetColorU32(...args) {
        if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                const col = args[0];
                return bind.GetColorU32_C(col);
            }
            else if (typeof (args[0]) === "object") {
                const col = args[0];
                return bind.GetColorU32_B(col);
            }
            else {
                const idx = args[0];
                return bind.GetColorU32_A(idx, 1.0);
            }
        }
        else {
            const idx = args[0];
            const alpha_mul = args[1];
            return bind.GetColorU32_A(idx, alpha_mul);
        }
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
    function RadioButton(label, ...args) {
        if (typeof (args[0]) === "boolean") {
            const active = args[0];
            return bind.RadioButton_A(label, active);
        }
        else {
            const v = args[0];
            const v_button = args[1];
            const _v = Array.isArray(v) ? v : [v()];
            const ret = bind.RadioButton_B(label, _v, v_button);
            if (!Array.isArray(v)) {
                v(_v[0]);
            }
            return ret;
        }
    }
    exports_1("RadioButton", RadioButton);
    function PlotLines(label, ...args) {
        if (Array.isArray(args[0])) {
            const values = args[0];
            const values_getter = (data, idx) => values[idx * stride];
            const values_count = typeof (args[1]) === "number" ? args[1] : values.length;
            const values_offset = typeof (args[2]) === "number" ? args[2] : 0;
            const overlay_text = typeof (args[3]) === "string" ? args[3] : null;
            const scale_min = typeof (args[4]) === "number" ? args[4] : Number.MAX_VALUE;
            const scale_max = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const graph_size = args[6] || ImVec2.ZERO;
            const stride = typeof (args[7]) === "number" ? args[7] : 1;
            bind.PlotLines(label, values_getter, null, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
        else {
            const values_getter = args[0];
            const data = args[1];
            const values_count = args[2];
            const values_offset = typeof (args[3]) === "number" ? args[3] : 0;
            const overlay_text = typeof (args[4]) === "string" ? args[4] : null;
            const scale_min = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const scale_max = typeof (args[6]) === "number" ? args[6] : Number.MAX_VALUE;
            const graph_size = args[7] || ImVec2.ZERO;
            bind.PlotLines(label, values_getter, data, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
    }
    exports_1("PlotLines", PlotLines);
    function PlotHistogram(label, ...args) {
        if (Array.isArray(args[0])) {
            const values = args[0];
            const values_getter = (data, idx) => values[idx * stride];
            const values_count = typeof (args[1]) === "number" ? args[1] : values.length;
            const values_offset = typeof (args[2]) === "number" ? args[2] : 0;
            const overlay_text = typeof (args[3]) === "string" ? args[3] : null;
            const scale_min = typeof (args[4]) === "number" ? args[4] : Number.MAX_VALUE;
            const scale_max = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const graph_size = args[6] || ImVec2.ZERO;
            const stride = typeof (args[7]) === "number" ? args[7] : 1;
            bind.PlotHistogram(label, values_getter, null, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
        else {
            const values_getter = args[0];
            const data = args[1];
            const values_count = args[2];
            const values_offset = typeof (args[3]) === "number" ? args[3] : 0;
            const overlay_text = typeof (args[4]) === "string" ? args[4] : null;
            const scale_min = typeof (args[5]) === "number" ? args[5] : Number.MAX_VALUE;
            const scale_max = typeof (args[6]) === "number" ? args[6] : Number.MAX_VALUE;
            const graph_size = args[7] || ImVec2.ZERO;
            bind.PlotHistogram(label, values_getter, data, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size);
        }
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
    function Combo(label, current_item, ...args) {
        let ret = false;
        const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
        if (Array.isArray(args[0])) {
            const items = args[0];
            const items_count = typeof (args[1]) === "number" ? args[1] : items.length;
            const popup_max_height_in_items = typeof (args[2]) === "number" ? args[2] : -1;
            const items_getter = (data, idx, out_text) => { out_text[0] = items[idx]; return true; };
            ret = bind.Combo(label, _current_item, items_getter, null, items_count, popup_max_height_in_items);
        }
        else if (typeof (args[0]) === "string") {
            const items_separated_by_zeros = args[0];
            const popup_max_height_in_items = typeof (args[1]) === "number" ? args[1] : -1;
            const items = items_separated_by_zeros.replace(/^\0+|\0+$/g, "").split("\0");
            const items_count = items.length;
            const items_getter = (data, idx, out_text) => { out_text[0] = items[idx]; return true; };
            ret = bind.Combo(label, _current_item, items_getter, null, items_count, popup_max_height_in_items);
        }
        else {
            const items_getter = args[0];
            const data = args[1];
            const items_count = args[2];
            const popup_max_height_in_items = typeof (args[3]) === "number" ? args[3] : -1;
            ret = bind.Combo(label, _current_item, items_getter, data, items_count, popup_max_height_in_items);
        }
        if (!Array.isArray(current_item)) {
            current_item(_current_item[0]);
        }
        return ret;
    }
    exports_1("Combo", Combo);
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
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%d");                                       // If v_min >= v_max we have no bound
    function DragInt(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        if (Array.isArray(v)) {
            return bind.DragInt(label, v, v_speed, v_min, v_max, format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.DragInt(label, ref_v, v_speed, v_min, v_max, format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("DragInt", DragInt);
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt2(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        return bind.DragInt2(label, v, v_speed, v_min, v_max, format);
    }
    exports_1("DragInt2", DragInt2);
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt3(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        return bind.DragInt3(label, v, v_speed, v_min, v_max, format);
    }
    exports_1("DragInt3", DragInt3);
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d");
    function DragInt4(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d") {
        return bind.DragInt4(label, v, v_speed, v_min, v_max, format);
    }
    exports_1("DragInt4", DragInt4);
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
    function DragIntRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", format_max = null) {
        const ref_v_current_min = Array.isArray(v_current_min) ? v_current_min : [v_current_min()];
        const ref_v_current_max = Array.isArray(v_current_max) ? v_current_max : [v_current_max()];
        const ret = bind.DragIntRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, format, format_max);
        if (!Array.isArray(v_current_min)) {
            v_current_min(ref_v_current_min[0]);
        }
        if (!Array.isArray(v_current_max)) {
            v_current_max(ref_v_current_max[0]);
        }
        return ret;
    }
    exports_1("DragIntRange2", DragIntRange2);
    // IMGUI_API bool          DragScalar(const char* label, ImGuiDataType data_type, void* v, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
    // IMGUI_API bool          DragScalarN(const char* label, ImGuiDataType data_type, void* v, int components, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
    function DragScalar(label, v, v_speed, v_min = null, v_max = null, format = null, power = 1.0) {
        if (v instanceof Int32Array) {
            return bind.DragScalar(label, ImGuiDataType.S32, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return bind.DragScalar(label, ImGuiDataType.U32, v, v_speed, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.DragScalar(label, ImGuiDataType.S64, v, v_speed, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.DragScalar(label, ImGuiDataType.U64, v, v_speed, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return bind.DragScalar(label, ImGuiDataType.Float, v, v_speed, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return bind.DragScalar(label, ImGuiDataType.Double, v, v_speed, v_min, v_max, format, power);
        }
        throw new Error();
    }
    exports_1("DragScalar", DragScalar);
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
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat(label, v, step = 0.0, step_fast = 0.0, format = "%.3f", extra_flags = 0) {
        if (Array.isArray(v)) {
            return bind.InputFloat(label, v, step, step_fast, format, extra_flags);
        }
        else {
            const ref_v = [v()];
            const ret = bind.InputFloat(label, ref_v, step, step_fast, format, extra_flags);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("InputFloat", InputFloat);
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat2(label, v, format = "%.3f", extra_flags = 0) {
        return bind.InputFloat2(label, v, format, extra_flags);
    }
    exports_1("InputFloat2", InputFloat2);
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat3(label, v, format = "%.3f", extra_flags = 0) {
        return bind.InputFloat3(label, v, format, extra_flags);
    }
    exports_1("InputFloat3", InputFloat3);
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags extra_flags = 0);
    function InputFloat4(label, v, format = "%.3f", extra_flags = 0) {
        return bind.InputFloat4(label, v, format, extra_flags);
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
    // IMGUI_API bool          InputDouble(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.6f", ImGuiInputTextFlags extra_flags = 0);
    function InputDouble(label, v, step = 0.0, step_fast = 0.0, format = "%.6f", extra_flags = 0) {
        if (Array.isArray(v)) {
            return bind.InputDouble(label, v, step, step_fast, format, extra_flags);
        }
        else {
            const ref_v = [v()];
            const ret = bind.InputDouble(label, ref_v, step, step_fast, format, extra_flags);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("InputDouble", InputDouble);
    // IMGUI_API bool          InputScalar(const char* label, ImGuiDataType data_type, void* v, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
    // IMGUI_API bool          InputScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
    function InputScalar(label, v, step = null, step_fast = null, format = null, extra_flags = 0) {
        if (v instanceof Int32Array) {
            return bind.InputScalar(label, ImGuiDataType.S32, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Uint32Array) {
            return bind.InputScalar(label, ImGuiDataType.U32, v, step, step_fast, format, extra_flags);
        }
        // if (v instanceof Int64Array) { return bind.InputScalar(label, ImGuiDataType.S64, v, step, step_fast, format, extra_flags); }
        // if (v instanceof Uint64Array) { return bind.InputScalar(label, ImGuiDataType.U64, v, step, step_fast, format, extra_flags); }
        if (v instanceof Float32Array) {
            return bind.InputScalar(label, ImGuiDataType.Float, v, step, step_fast, format, extra_flags);
        }
        if (v instanceof Float64Array) {
            return bind.InputScalar(label, ImGuiDataType.Double, v, step, step_fast, format, extra_flags);
        }
        throw new Error();
    }
    exports_1("InputScalar", InputScalar);
    // Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);     // adjust format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
    function SliderFloat(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.SliderFloat(label, v, v_min, v_max, format, power);
        }
        else {
            const ref_v = [v()];
            const ret = bind.SliderFloat(label, ref_v, v_min, v_max, format, power);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("SliderFloat", SliderFloat);
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat2(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.SliderFloat2(label, v, v_min, v_max, format, power);
        }
        else {
            const _v = [v.x, v.y];
            const ret = bind.SliderFloat2(label, _v, v_min, v_max, format, power);
            v.x = _v[0];
            v.y = _v[1];
            return ret;
        }
    }
    exports_1("SliderFloat2", SliderFloat2);
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat3(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        return bind.SliderFloat3(label, v, v_min, v_max, format, power);
    }
    exports_1("SliderFloat3", SliderFloat3);
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function SliderFloat4(label, v, v_min, v_max, format = "%.3f", power = 1.0) {
        return bind.SliderFloat4(label, v, v_min, v_max, format, power);
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
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d");
    function SliderInt(label, v, v_min, v_max, format = "%d") {
        if (Array.isArray(v)) {
            return bind.SliderInt(label, v, v_min, v_max, format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.SliderInt(label, ref_v, v_min, v_max, format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("SliderInt", SliderInt);
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d");
    function SliderInt2(label, v, v_min, v_max, format = "%d") {
        return bind.SliderInt2(label, v, v_min, v_max, format);
    }
    exports_1("SliderInt2", SliderInt2);
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d");
    function SliderInt3(label, v, v_min, v_max, format = "%d") {
        return bind.SliderInt3(label, v, v_min, v_max, format);
    }
    exports_1("SliderInt3", SliderInt3);
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d");
    function SliderInt4(label, v, v_min, v_max, format = "%d") {
        return bind.SliderInt4(label, v, v_min, v_max, format);
    }
    exports_1("SliderInt4", SliderInt4);
    // IMGUI_API bool          SliderScalar(const char* label, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    // IMGUI_API bool          SliderScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    function SliderScalar(label, v, v_min, v_max, format = null, power = 1.0) {
        if (v instanceof Int32Array) {
            return bind.SliderScalar(label, ImGuiDataType.S32, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return bind.SliderScalar(label, ImGuiDataType.U32, v, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.SliderScalar(label, ImGuiDataType.S64, v, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.SliderScalar(label, ImGuiDataType.U64, v, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return bind.SliderScalar(label, ImGuiDataType.Float, v, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return bind.SliderScalar(label, ImGuiDataType.Double, v, v_min, v_max, format, power);
        }
        throw new Error();
    }
    exports_1("SliderScalar", SliderScalar);
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f);
    function VSliderFloat(label, size, v, v_min, v_max, format = "%.3f", power = 1.0) {
        if (Array.isArray(v)) {
            return bind.VSliderFloat(label, size, v, v_min, v_max, format, power);
        }
        else {
            const ref_v = [v()];
            const ret = bind.VSliderFloat(label, size, ref_v, v_min, v_max, format, power);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("VSliderFloat", VSliderFloat);
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d");
    function VSliderInt(label, size, v, v_min, v_max, format = "%d") {
        if (Array.isArray(v)) {
            return bind.VSliderInt(label, size, v, v_min, v_max, format);
        }
        else {
            const ref_v = [v()];
            const ret = bind.VSliderInt(label, size, ref_v, v_min, v_max, format);
            v(ref_v[0]);
            return ret;
        }
    }
    exports_1("VSliderInt", VSliderInt);
    // IMGUI_API bool          VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
    function VSliderScalar(label, size, data_type, v, v_min, v_max, format = null, power = 1.0) {
        return false; // TODO
    }
    exports_1("VSliderScalar", VSliderScalar);
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
    function TreeNode(...args) {
        if (typeof (args[0]) === "string") {
            if (args.length === 1) {
                const label = args[0];
                return bind.TreeNode_A(label);
            }
            else {
                const str_id = args[0];
                const fmt = args[1];
                return bind.TreeNode_B(str_id, fmt);
            }
        }
        else {
            const ptr_id = args[0];
            const fmt = args[1];
            return bind.TreeNode_C(ptr_id, fmt);
        }
    }
    exports_1("TreeNode", TreeNode);
    function TreeNodeEx(...args) {
        if (typeof (args[0]) === "string") {
            if (args.length < 3) {
                const label = args[0];
                const flags = args[1] || 0;
                return bind.TreeNodeEx_A(label, flags);
            }
            else {
                const str_id = args[0];
                const flags = args[1];
                const fmt = args[2];
                return bind.TreeNodeEx_B(str_id, flags, fmt);
            }
        }
        else {
            const ptr_id = args[0];
            const flags = args[1];
            const fmt = args[2];
            return bind.TreeNodeEx_C(ptr_id, flags, fmt);
        }
    }
    exports_1("TreeNodeEx", TreeNodeEx);
    function TreePush(...args) {
        if (typeof (args[0]) === "string") {
            const str_id = args[0];
            bind.TreePush_A(str_id);
        }
        else {
            const ptr_id = args[0];
            bind.TreePush_B(ptr_id);
        }
    }
    exports_1("TreePush", TreePush);
    // IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    function SetNextTreeNodeOpen(is_open, cond = 0) {
        bind.SetNextTreeNodeOpen(is_open, cond);
    }
    exports_1("SetNextTreeNodeOpen", SetNextTreeNodeOpen);
    function CollapsingHeader(label, ...args) {
        if (args.length === 0) {
            return bind.CollapsingHeader_A(label, 0);
        }
        else {
            if (typeof (args[0]) === "number") {
                const flags = args[0];
                return bind.CollapsingHeader_A(label, flags);
            }
            else {
                const p_open = args[0];
                const flags = args[1] || 0;
                const ref_open = Array.isArray(p_open) ? p_open : [p_open()];
                const ret = bind.CollapsingHeader_B(label, ref_open, flags);
                if (!Array.isArray(p_open)) {
                    p_open(ref_open[0]);
                }
                return ret;
            }
        }
    }
    exports_1("CollapsingHeader", CollapsingHeader);
    function Selectable(label, ...args) {
        if (args.length === 0) {
            return bind.Selectable_A(label, false, 0, ImVec2.ZERO);
        }
        else {
            if (typeof (args[0]) === "boolean") {
                const selected = args[0];
                const flags = args[1] || 0;
                const size = args[2] || ImVec2.ZERO;
                return bind.Selectable_A(label, selected, flags, size);
            }
            else {
                const p_selected = args[0];
                const flags = args[1] || 0;
                const size = args[2] || ImVec2.ZERO;
                const ref_selected = Array.isArray(p_selected) ? p_selected : [p_selected()];
                const ret = bind.Selectable_B(label, ref_selected, flags, size);
                if (!Array.isArray(p_selected)) {
                    p_selected(ref_selected[0]);
                }
                return ret;
            }
        }
    }
    exports_1("Selectable", Selectable);
    function ListBox(label, current_item, ...args) {
        let ret = false;
        const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
        if (Array.isArray(args[0])) {
            const items = args[0];
            const items_count = typeof (args[1]) === "number" ? args[1] : items.length;
            const height_in_items = typeof (args[2]) === "number" ? args[2] : -1;
            ret = bind.ListBox_A(label, _current_item, items, items_count, height_in_items);
        }
        else {
            const items_getter = args[0];
            const data = args[1];
            const items_count = args[2];
            const height_in_items = typeof (args[3]) === "number" ? args[3] : -1;
            ret = bind.ListBox_B(label, _current_item, items_getter, data, items_count, height_in_items);
        }
        if (!Array.isArray(current_item)) {
            current_item(_current_item[0]);
        }
        return ret;
    }
    exports_1("ListBox", ListBox);
    function ListBoxHeader(label, ...args) {
        if (typeof (args[0]) === "object") {
            const size = args[0];
            return bind.ListBoxHeader_A(label, size);
        }
        else {
            const items_count = args[0];
            const height_in_items = typeof (args[1]) === "number" ? args[1] : -1;
            return bind.ListBoxHeader_B(label, items_count, height_in_items);
        }
    }
    exports_1("ListBoxHeader", ListBoxHeader);
    // IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
    function ListBoxFooter() {
        bind.ListBoxFooter();
    }
    exports_1("ListBoxFooter", ListBoxFooter);
    function Value(prefix, ...args) {
        if (typeof (args[0]) === "boolean") {
            bind.Value_A(prefix, args[0]);
        }
        else if (typeof (args[0]) === "number") {
            if (Number.isInteger(args[0])) {
                bind.Value_B(prefix, args[0]);
            }
            else {
                bind.Value_D(prefix, args[0], typeof (args[1]) === "string" ? args[1] : null);
            }
        }
        else {
            bind.Text(prefix + String(args[0]));
        }
    }
    exports_1("Value", Value);
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    function SetTooltip(fmt) {
        bind.SetTooltip(fmt);
    }
    exports_1("SetTooltip", SetTooltip);
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    function BeginMenu(label, enabled = true) { return bind.BeginMenu(label, enabled); }
    exports_1("BeginMenu", BeginMenu);
    function MenuItem(label, ...args) {
        if (args.length === 0) {
            return bind.MenuItem_A(label, null, false, true);
        }
        else if (args.length === 1) {
            const shortcut = args[0];
            return bind.MenuItem_A(label, shortcut, false, true);
        }
        else {
            const shortcut = args[0];
            if (typeof (args[1]) === "boolean") {
                const selected = args[1];
                const enabled = typeof (args[2]) === "boolean" ? args[2] : true;
                return bind.MenuItem_A(label, shortcut, selected, enabled);
            }
            else {
                const p_selected = args[1];
                const enabled = typeof (args[2]) === "boolean" ? args[2] : true;
                const ref_selected = Array.isArray(p_selected) ? p_selected : [p_selected()];
                const ret = bind.MenuItem_B(label, shortcut, ref_selected, enabled);
                if (!Array.isArray(p_selected)) {
                    p_selected(ref_selected[0]);
                }
                return ret;
            }
        }
    }
    exports_1("MenuItem", MenuItem);
    // IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
    function OpenPopupOnItemClick(str_id = null, mouse_button = 1) {
        return bind.OpenPopupOnItemClick(str_id, mouse_button);
    }
    exports_1("OpenPopupOnItemClick", OpenPopupOnItemClick);
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
    function BeginPopupModal(str_id = "", p_open = null, extra_flags = 0) {
        if (Array.isArray(p_open)) {
            return bind.BeginPopupModal(str_id, p_open, extra_flags);
        }
        else if (typeof (p_open) === "function") {
            const _p_open = [p_open()];
            const ret = bind.BeginPopupModal(str_id, _p_open, extra_flags);
            p_open(_p_open[0]);
            return ret;
        }
        else {
            return bind.BeginPopupModal(str_id, null, extra_flags);
        }
    }
    exports_1("BeginPopupModal", BeginPopupModal);
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    function BeginPopupContextItem(str_id = null, mouse_button = 1) {
        return bind.BeginPopupContextItem(str_id, mouse_button);
    }
    exports_1("BeginPopupContextItem", BeginPopupContextItem);
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
    function BeginPopupContextWindow(str_id = null, mouse_button = 1, also_over_items = true) {
        return bind.BeginPopupContextWindow(str_id, mouse_button, also_over_items);
    }
    exports_1("BeginPopupContextWindow", BeginPopupContextWindow);
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
    function BeginPopupContextVoid(str_id = null, mouse_button = 1) {
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
    function IsRectVisible(...args) {
        if (args.length === 1) {
            const size = args[0];
            return bind.IsRectVisible_A(size);
        }
        else {
            const rect_min = args[0];
            const rect_max = args[1];
            return bind.IsRectVisible_B(rect_min, rect_max);
        }
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
    // Settings/.Ini Utilities
    // The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
    // Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.
    // IMGUI_API void          LoadIniSettingsFromDisk(const char* ini_filename);                  // call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).
    function LoadIniSettingsFromDisk(ini_filename) { throw new Error(); } // TODO
    exports_1("LoadIniSettingsFromDisk", LoadIniSettingsFromDisk);
    // IMGUI_API void          LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0); // call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.
    function LoadIniSettingsFromMemory(ini_data, ini_size = 0) { bind.LoadIniSettingsFromMemory(ini_data); }
    exports_1("LoadIniSettingsFromMemory", LoadIniSettingsFromMemory);
    // IMGUI_API void          SaveIniSettingsToDisk(const char* ini_filename);
    function SaveIniSettingsToDisk(ini_filename) { throw new Error(); } // TODO
    exports_1("SaveIniSettingsToDisk", SaveIniSettingsToDisk);
    // IMGUI_API const char*   SaveIniSettingsToMemory(size_t* out_ini_size = NULL);               // return a zero-terminated string with the .ini data which you can save by your own mean. call when io.WantSaveIniSettings is set, then save data by your own mean and clear io.WantSaveIniSettings.
    function SaveIniSettingsToMemory(out_ini_size = null) { return bind.SaveIniSettingsToMemory(); }
    exports_1("SaveIniSettingsToMemory", SaveIniSettingsToMemory);
    // Memory Utilities
    // All those functions are not reliant on the current context.
    // If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again.
    // IMGUI_API void          SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void(*free_func)(void* ptr, void* user_data), void* user_data = NULL);
    function SetAllocatorFunctions() { } // TODO
    exports_1("SetAllocatorFunctions", SetAllocatorFunctions);
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
                ImGuiWindowFlags[ImGuiWindowFlags["None"] = 0] = "None";
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
                ImGuiInputTextFlags[ImGuiInputTextFlags["None"] = 0] = "None";
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
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsScientific"] = 131072] = "CharsScientific";
                // [Internal]
                ImGuiInputTextFlags[ImGuiInputTextFlags["Multiline"] = 1048576] = "Multiline";
            })(ImGuiInputTextFlags || (ImGuiInputTextFlags = {}));
            exports_1("ImGuiInputTextFlags", ImGuiInputTextFlags);
            exports_1("InputTextFlags", ImGuiInputTextFlags);
            (function (ImGuiTreeNodeFlags) {
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["None"] = 0] = "None";
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
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["CollapsingHeader"] = 26] = "CollapsingHeader";
            })(ImGuiTreeNodeFlags || (ImGuiTreeNodeFlags = {}));
            exports_1("ImGuiTreeNodeFlags", ImGuiTreeNodeFlags);
            exports_1("TreeNodeFlags", ImGuiTreeNodeFlags);
            (function (ImGuiSelectableFlags) {
                ImGuiSelectableFlags[ImGuiSelectableFlags["None"] = 0] = "None";
                ImGuiSelectableFlags[ImGuiSelectableFlags["DontClosePopups"] = 1] = "DontClosePopups";
                ImGuiSelectableFlags[ImGuiSelectableFlags["SpanAllColumns"] = 2] = "SpanAllColumns";
                ImGuiSelectableFlags[ImGuiSelectableFlags["AllowDoubleClick"] = 4] = "AllowDoubleClick";
            })(ImGuiSelectableFlags || (ImGuiSelectableFlags = {}));
            exports_1("ImGuiSelectableFlags", ImGuiSelectableFlags);
            exports_1("SelectableFlags", ImGuiSelectableFlags);
            (function (ImGuiComboFlags) {
                ImGuiComboFlags[ImGuiComboFlags["None"] = 0] = "None";
                ImGuiComboFlags[ImGuiComboFlags["PopupAlignLeft"] = 1] = "PopupAlignLeft";
                ImGuiComboFlags[ImGuiComboFlags["HeightSmall"] = 2] = "HeightSmall";
                ImGuiComboFlags[ImGuiComboFlags["HeightRegular"] = 4] = "HeightRegular";
                ImGuiComboFlags[ImGuiComboFlags["HeightLarge"] = 8] = "HeightLarge";
                ImGuiComboFlags[ImGuiComboFlags["HeightLargest"] = 16] = "HeightLargest";
                ImGuiComboFlags[ImGuiComboFlags["NoArrowButton"] = 32] = "NoArrowButton";
                ImGuiComboFlags[ImGuiComboFlags["NoPreview"] = 64] = "NoPreview";
                ImGuiComboFlags[ImGuiComboFlags["HeightMask_"] = 30] = "HeightMask_";
            })(ImGuiComboFlags || (ImGuiComboFlags = {}));
            exports_1("ImGuiComboFlags", ImGuiComboFlags);
            exports_1("ComboFlags", ImGuiComboFlags);
            (function (ImGuiFocusedFlags) {
                ImGuiFocusedFlags[ImGuiFocusedFlags["None"] = 0] = "None";
                ImGuiFocusedFlags[ImGuiFocusedFlags["ChildWindows"] = 1] = "ChildWindows";
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootWindow"] = 2] = "RootWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["AnyWindow"] = 4] = "AnyWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
            })(ImGuiFocusedFlags || (ImGuiFocusedFlags = {}));
            exports_1("ImGuiFocusedFlags", ImGuiFocusedFlags);
            exports_1("FocusedFlags", ImGuiFocusedFlags);
            (function (ImGuiHoveredFlags) {
                ImGuiHoveredFlags[ImGuiHoveredFlags["None"] = 0] = "None";
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
                ImGuiDragDropFlags[ImGuiDragDropFlags["None"] = 0] = "None";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoPreviewTooltip"] = 1] = "SourceNoPreviewTooltip";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoDisableHover"] = 2] = "SourceNoDisableHover";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoHoldToOpenOthers"] = 4] = "SourceNoHoldToOpenOthers";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAllowNullID"] = 8] = "SourceAllowNullID";
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceExtern"] = 16] = "SourceExtern";
                // AcceptDragDropPayload() flags
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptBeforeDelivery"] = 1024] = "AcceptBeforeDelivery";
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoDrawDefaultRect"] = 2048] = "AcceptNoDrawDefaultRect";
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoPreviewTooltip"] = 4096] = "AcceptNoPreviewTooltip";
                ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptPeekOnly"] = 3072] = "AcceptPeekOnly";
            })(ImGuiDragDropFlags || (ImGuiDragDropFlags = {}));
            exports_1("ImGuiDragDropFlags", ImGuiDragDropFlags);
            exports_1("DragDropFlags", ImGuiDragDropFlags);
            // Standard Drag and Drop payload types. You can define you own payload types using 12-characters long strings. Types starting with '_' are defined by Dear ImGui.
            exports_1("IMGUI_PAYLOAD_TYPE_COLOR_3F", IMGUI_PAYLOAD_TYPE_COLOR_3F = "_COL3F"); // float[3]     // Standard type for colors, without alpha. User code may use this type.
            exports_1("IMGUI_PAYLOAD_TYPE_COLOR_4F", IMGUI_PAYLOAD_TYPE_COLOR_4F = "_COL4F"); // float[4]     // Standard type for colors. User code may use this type.
            (function (ImGuiDataType) {
                ImGuiDataType[ImGuiDataType["S32"] = 0] = "S32";
                ImGuiDataType[ImGuiDataType["U32"] = 1] = "U32";
                ImGuiDataType[ImGuiDataType["S64"] = 2] = "S64";
                ImGuiDataType[ImGuiDataType["U64"] = 3] = "U64";
                ImGuiDataType[ImGuiDataType["Float"] = 4] = "Float";
                ImGuiDataType[ImGuiDataType["Double"] = 5] = "Double";
                ImGuiDataType[ImGuiDataType["COUNT"] = 6] = "COUNT";
            })(ImGuiDataType || (ImGuiDataType = {}));
            exports_1("ImGuiDataType", ImGuiDataType);
            exports_1("DataType", ImGuiDataType);
            (function (ImGuiDir) {
                ImGuiDir[ImGuiDir["None"] = -1] = "None";
                ImGuiDir[ImGuiDir["Left"] = 0] = "Left";
                ImGuiDir[ImGuiDir["Right"] = 1] = "Right";
                ImGuiDir[ImGuiDir["Up"] = 2] = "Up";
                ImGuiDir[ImGuiDir["Down"] = 3] = "Down";
                ImGuiDir[ImGuiDir["COUNT"] = 4] = "COUNT";
            })(ImGuiDir || (ImGuiDir = {}));
            exports_1("ImGuiDir", ImGuiDir);
            exports_1("Dir", ImGuiDir);
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
                ImGuiConfigFlags[ImGuiConfigFlags["NavEnableKeyboard"] = 1] = "NavEnableKeyboard";
                ImGuiConfigFlags[ImGuiConfigFlags["NavEnableGamepad"] = 2] = "NavEnableGamepad";
                ImGuiConfigFlags[ImGuiConfigFlags["NavEnableSetMousePos"] = 4] = "NavEnableSetMousePos";
                ImGuiConfigFlags[ImGuiConfigFlags["NavNoCaptureKeyboard"] = 8] = "NavNoCaptureKeyboard";
                ImGuiConfigFlags[ImGuiConfigFlags["NoMouse"] = 16] = "NoMouse";
                ImGuiConfigFlags[ImGuiConfigFlags["NoMouseCursorChange"] = 32] = "NoMouseCursorChange";
                ImGuiConfigFlags[ImGuiConfigFlags["IsSRGB"] = 1048576] = "IsSRGB";
                ImGuiConfigFlags[ImGuiConfigFlags["IsTouchScreen"] = 2097152] = "IsTouchScreen"; // Application is using a touch screen instead of a mouse.
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
            (function (ImGuiBackendFlags) {
                ImGuiBackendFlags[ImGuiBackendFlags["HasGamepad"] = 1] = "HasGamepad";
                ImGuiBackendFlags[ImGuiBackendFlags["HasMouseCursors"] = 2] = "HasMouseCursors";
                ImGuiBackendFlags[ImGuiBackendFlags["HasSetMousePos"] = 4] = "HasSetMousePos"; // Back-end can honor io.WantSetMousePos and reposition the mouse (only used if ImGuiConfigFlags_NavEnableSetMousePos is set).
            })(ImGuiBackendFlags || (ImGuiBackendFlags = {}));
            exports_1("ImGuiBackendFlags", ImGuiBackendFlags);
            exports_1("BackendFlags", ImGuiBackendFlags);
            (function (ImGuiColorEditFlags) {
                ImGuiColorEditFlags[ImGuiColorEditFlags["None"] = 0] = "None";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoAlpha"] = 2] = "NoAlpha";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoPicker"] = 4] = "NoPicker";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoOptions"] = 8] = "NoOptions";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoSmallPreview"] = 16] = "NoSmallPreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoInputs"] = 32] = "NoInputs";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoTooltip"] = 64] = "NoTooltip";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoLabel"] = 128] = "NoLabel";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoSidePreview"] = 256] = "NoSidePreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoDragDrop"] = 512] = "NoDragDrop";
                // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaBar"] = 65536] = "AlphaBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreview"] = 131072] = "AlphaPreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreviewHalf"] = 262144] = "AlphaPreviewHalf";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HDR"] = 524288] = "HDR";
                ImGuiColorEditFlags[ImGuiColorEditFlags["RGB"] = 1048576] = "RGB";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HSV"] = 2097152] = "HSV";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HEX"] = 4194304] = "HEX";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 8388608] = "Uint8";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 16777216] = "Float";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 33554432] = "PickerHueBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 67108864] = "PickerHueWheel";
                // Internals/Masks
                ImGuiColorEditFlags[ImGuiColorEditFlags["_InputsMask"] = 7340032] = "_InputsMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_DataTypeMask"] = 25165824] = "_DataTypeMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_PickerMask"] = 100663296] = "_PickerMask";
                ImGuiColorEditFlags[ImGuiColorEditFlags["_OptionsDefault"] = 42991616] = "_OptionsDefault";
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
                Set(x, y) {
                    this.x = x;
                    this.y = y;
                    return this;
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
                Set(x, y, z, w) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.w = w;
                    return this;
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
                    // inline iterator             erase(const_iterator it, const_iterator it_last){ IM_ASSERT(it >= Data && it < Data+Size && it_last > it && it_last <= Data+Size); const ptrdiff_t count = it_last - it; const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + count, ((size_t)Size - (size_t)off - count) * sizeof(value_type)); Size -= (int)count; return Data + off; }
                    // inline iterator             erase_unsorted(const_iterator it)               { IM_ASSERT(it >= Data && it < Data+Size);  const ptrdiff_t off = it - Data; if (it < Data+Size-1) memcpy(Data + off, Data + Size - 1, sizeof(value_type)); Size--; return Data + off; }
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
                // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
                get Flags() { return this.native.Flags; }
                set Flags(value) { this.native.Flags = value; }
                // [Internal, used while building lists]
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
                // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
                get TotalIdxCount() { return this.native.TotalIdxCount; }
                // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
                get TotalVtxCount() { return this.native.TotalVtxCount; }
                // ImVec2          DisplayPos;             // Upper-left position of the viewport to render (== upper-left of the orthogonal projection matrix to use)
                get DisplayPos() { return this.native.getDisplayPos(); }
                // ImVec2          DisplaySize;            // Size of the viewport to render (== io.DisplaySize for the main viewport) (DisplayPos + DisplaySize == lower-right of the orthogonal projection matrix to use)
                get DisplaySize() { return this.native.getDisplaySize(); }
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
                constructor() {
                    // void*           FontData;                   //          // TTF/OTF data
                    // int             FontDataSize;               //          // TTF/OTF data size
                    this.FontData = null;
                    // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
                    this.FontDataOwnedByAtlas = true;
                    // int             FontNo;                     // 0        // Index of font within TTF/OTF file
                    this.FontNo = 0;
                    // float           SizePixels;                 //          // Size in pixels for rasterizer.
                    this.SizePixels = 0;
                    // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
                    this.OversampleH = 3;
                    this.OversampleV = 1;
                    // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
                    this.PixelSnapH = false;
                    // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
                    this.GlyphExtraSpacing = new ImVec2(0, 0);
                    // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
                    this.GlyphOffset = new ImVec2(0, 0);
                    // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
                    this.GlyphRanges = null;
                    // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
                    this.GlyphMinAdvanceX = 0;
                    // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
                    this.GlyphMaxAdvanceX = Number.MAX_VALUE;
                    // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
                    this.MergeMode = false;
                    // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
                    this.RasterizerFlags = 0;
                    // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
                    this.RasterizerMultiply = 1.0;
                    // [Internal]
                    // char            Name[32];                               // Name (strictly to ease debugging)
                    this.Name = "";
                    // ImFont*         DstFont;
                    this.DstFont = null;
                    // IMGUI_API ImFontConfig();
                }
            };
            exports_1("ImFontConfig", ImFontConfig);
            // struct ImFontGlyph
            ImFontGlyph = class ImFontGlyph {
                constructor() {
                    // ImWchar         Codepoint;          // 0x0000..0xFFFF
                    this.Codepoint = 0;
                    // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
                    this.AdvanceX = 0.0;
                    // float           X0, Y0, X1, Y1;     // Glyph corners
                    this.X0 = 0.0;
                    this.Y0 = 0.0;
                    this.X1 = 1.0;
                    this.Y1 = 1.0;
                    // float           U0, V0, U1, V1;     // Texture coordinates
                    this.U0 = 0.0;
                    this.V0 = 0.0;
                    this.U1 = 1.0;
                    this.V1 = 1.0;
                }
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
                AddFontDefault(font_cfg = null) {
                    return new ImFont(this.native.AddFontDefault(font_cfg));
                }
                // IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
                // IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after Build(). Set font_cfg->FontDataOwnedByAtlas to false to keep ownership.
                AddFontFromMemoryTTF(data, size_pixels, font_cfg = null, glyph_ranges = null) {
                    return new ImFont(this.native.AddFontFromMemoryTTF(new Uint8Array(data), size_pixels, font_cfg, glyph_ranges));
                }
                // IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
                // IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
                // IMGUI_API void              ClearTexData();             // Clear the CPU-side texture data. Saves RAM once the texture has been copied to graphics memory.
                ClearTexData() { this.native.ClearTexData(); }
                // IMGUI_API void              ClearInputData();           // Clear the input TTF data (inc sizes, glyph ranges)
                ClearInputData() { this.native.ClearInputData(); }
                // IMGUI_API void              ClearFonts();               // Clear the ImGui-side font data (glyphs storage, UV coordinates)
                ClearFonts() { this.native.ClearFonts(); }
                // IMGUI_API void              Clear();                    // Clear all
                Clear() { this.native.Clear(); }
                // Build atlas, retrieve pixel data.
                // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
                // RGBA32 format is provided for convenience and compatibility, but note that unless you use CustomRect to draw color data, the RGB pixels emitted from Fonts will all be white (~75% of waste).
                // Pitch = Width * BytesPerPixels
                // IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
                Build() { return this.native.Build(); }
                // IMGUI_API bool              IsBuilt()                   { return Fonts.Size > 0 && (TexPixelsAlpha8 != NULL || TexPixelsRGBA32 != NULL); }
                IsBuilt() { return this.native.IsBuilt(); }
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
                GetGlyphRangesDefault() { return this.native.GetGlyphRangesDefault(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesKorean();     // Default + Korean characters
                GetGlyphRangesKorean() { return this.native.GetGlyphRangesKorean(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesJapanese();   // Default + Hiragana, Katakana, Half-Width, Selection of 1946 Ideographs
                GetGlyphRangesJapanese() { return this.native.GetGlyphRangesJapanese(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesChineseFull();            // Default + Half-Width + Japanese Hiragana/Katakana + full set of about 21000 CJK Unified Ideographs
                GetGlyphRangesChineseFull() { return this.native.GetGlyphRangesChineseFull(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesChineseSimplifiedCommon();// Default + Half-Width + Japanese Hiragana/Katakana + set of 2500 CJK Unified Ideographs for common simplified Chinese
                GetGlyphRangesChineseSimplifiedCommon() { return this.native.GetGlyphRangesChineseSimplifiedCommon(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();   // Default + about 400 Cyrillic characters
                GetGlyphRangesCyrillic() { return this.native.GetGlyphRangesCyrillic(); }
                // IMGUI_API const ImWchar*    GetGlyphRangesThai();       // Default + Thai characters
                GetGlyphRangesThai() { return this.native.GetGlyphRangesThai(); }
                // Helpers to build glyph ranges from text data. Feed your application strings/characters to it then call BuildRanges().
                // struct GlyphRangesBuilder
                // {
                //     ImVector<unsigned char> UsedChars;  // Store 1-bit per Unicode code point (0=unused, 1=used)
                //     GlyphRangesBuilder()                { UsedChars.resize(0x10000 / 8); memset(UsedChars.Data, 0, 0x10000 / 8); }
                //     bool           GetBit(int n) const  { return (UsedChars[n >> 3] & (1 << (n & 7))) != 0; }
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
                // ImFontAtlasFlags            Flags;              // Build flags (see ImFontAtlasFlags_)
                get Flags() { return this.native.Flags; }
                set Flags(value) { this.native.Flags = value; }
                // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
                get TexID() {
                    return ImGuiContext.getTexture(this.native.getTexID());
                }
                set TexID(value) {
                    this.native.setTexID(ImGuiContext.setTexture(value));
                }
                // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
                get TexDesiredWidth() { return this.native.TexDesiredWidth; }
                set TexDesiredWidth(value) { this.native.TexDesiredWidth = value; }
                // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.
                get TexGlyphPadding() { return this.native.TexGlyphPadding; }
                set TexGlyphPadding(value) { this.native.TexGlyphPadding = value; }
                // [Internal]
                // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
                // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
                // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
                // int                         TexWidth;           // Texture width calculated during Build().
                get TexWidth() { return this.native.TexWidth; }
                // int                         TexHeight;          // Texture height calculated during Build().
                get TexHeight() { return this.native.TexHeight; }
                // ImVec2                      TexUvScale;         // = (1.0f/TexWidth, 1.0f/TexHeight)
                get TexUvScale() { return this.native.getTexUvScale(); }
                // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
                get TexUvWhitePixel() { return this.native.getTexUvWhitePixel(); }
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
                get FontSize() { return this.native.FontSize; }
                // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
                get Scale() { return this.native.Scale; }
                // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
                get DisplayOffset() { return this.native.DisplayOffset; }
                // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
                // get Glyphs(): any { return this.native.Glyphs; }
                // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
                // get IndexAdvanceX(): any { return this.native.IndexAdvanceX; }
                // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
                // get IndexLookup(): any { return this.native.IndexLookup; }
                // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
                // get FallbackGlyph(): any { return this.native.FallbackGlyph; }
                // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
                get FallbackAdvanceX() { return this.native.FallbackAdvanceX; }
                // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
                get FallbackChar() { return this.native.FallbackChar; }
                // Members: Cold ~18/26 bytes
                // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
                // get ConfigDataCount(): number { return this.native.ConfigDataCount; }
                // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
                // get ConfigData(): any { return this.native.ConfigData; }
                // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
                // get ContainerAtlas(): any { return this.native.ContainerAtlas; }
                // float                       Ascent, Descent;    //              // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
                get Ascent() { return this.native.Ascent; }
                get Descent() { return this.native.Descent; }
                // int                         MetricsTotalSurface;//              // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)
                get MetricsTotalSurface() { return this.native.MetricsTotalSurface; }
                // Methods
                // IMGUI_API ImFont();
                // IMGUI_API ~ImFont();
                // IMGUI_API void              ClearOutputData();
                ClearOutputData() { return this.native.ClearOutputData(); }
                // IMGUI_API void              BuildLookupTable();
                BuildLookupTable() { return this.native.BuildLookupTable(); }
                // IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
                // public FindGlyph(c: number): any { return this.native.FindGlyph(c); }
                // IMGUI_API void              SetFallbackChar(ImWchar c);
                SetFallbackChar(c) { return this.native.SetFallbackChar(c); }
                // float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
                GetCharAdvance(c) { return this.native.GetCharAdvance(c); }
                // bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
                IsLoaded() { return this.native.IsLoaded(); }
                // const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }
                GetDebugName() { return this.native.GetDebugName(); }
                // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
                // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
                // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
                CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end = null, remaining = null) {
                    return this.native.CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end, remaining, new ImVec2());
                }
                // IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
                CalcWordWrapPositionA(scale, text, text_end, wrap_width) {
                    return this.native.CalcWordWrapPositionA(scale, text, text_end, wrap_width);
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
                // ImGuiConfigFlags ConfigFlags;                 // = 0x00               // See ImGuiConfigFlags_. Gamepad/keyboard navigation options.
                get ConfigFlags() { return this.native.ConfigFlags; }
                set ConfigFlags(value) { this.native.ConfigFlags = value; }
                // ImGuiConfigFlags ConfigFlags;                 // = 0x00               // See ImGuiConfigFlags_. Gamepad/keyboard navigation options.
                get BackendFlags() { return this.native.BackendFlags; }
                set BackendFlags(value) { this.native.BackendFlags = value; }
                // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
                get DisplaySize() { return this.native.getDisplaySize(); }
                // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
                get DeltaTime() { return this.native.DeltaTime; }
                set DeltaTime(value) { this.native.DeltaTime = value; }
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
                get OptMacOSXBehaviors() { return this.native.OptMacOSXBehaviors; }
                set OptMacOSXBehaviors(value) { this.native.OptMacOSXBehaviors = value; }
                // bool          OptCursorBlink;           // = true               // Enable blinking cursor, for users who consider it annoying.
                //------------------------------------------------------------------
                // Settings (User Functions)
                //------------------------------------------------------------------
                // Optional: access OS clipboard
                // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
                // const char* (*GetClipboardTextFn)(void* user_data);
                get GetClipboardTextFn() { return this.native.getGetClipboardTextFn(); }
                set GetClipboardTextFn(value) { this.native.setGetClipboardTextFn(value); }
                // void        (*SetClipboardTextFn)(void* user_data, const char* text);
                get SetClipboardTextFn() { return this.native.getSetClipboardTextFn(); }
                set SetClipboardTextFn(value) { this.native.setSetClipboardTextFn(value); }
                // void*       ClipboardUserData;
                get ClipboardUserData() { return this.native.getClipboardUserData(); }
                set ClipboardUserData(value) { this.native.setClipboardUserData(value); }
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
                // bool        WantSetMousePos;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
                get WantSetMousePos() { return this.native.WantSetMousePos; }
                set WantSetMousePos(value) { this.native.WantSetMousePos = value; }
                // bool        WantSaveIniSettings;        // When manual .ini load/save is active (io.IniFilename == NULL), this will be set to notify your application that you can call SaveIniSettingsToMemory() and save yourself. IMPORTANT: You need to clear io.WantSaveIniSettings yourself.
                get WantSaveIniSettings() { return this.native.WantSaveIniSettings; }
                set WantSaveIniSettings(value) { this.native.WantSaveIniSettings = value; }
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
            // IMGUI_API bool          ArrowButton(const char* str_id, ImGuiDir dir);                  // square button with an arrow shape
            exports_1("ArrowButton", ArrowButton = bind.ArrowButton);
            // Widgets: Input with Keyboard
            // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
            InputText_user_data = null;
            // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
            InputTextMultiline_user_data = null;
            // IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
            exports_1("TreePop", TreePop = bind.TreePop);
            // IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
            exports_1("TreeAdvanceToLabelPos", TreeAdvanceToLabelPos = bind.TreeAdvanceToLabelPos);
            // IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
            exports_1("GetTreeNodeToLabelSpacing", GetTreeNodeToLabelSpacing = bind.GetTreeNodeToLabelSpacing);
            // Tooltips
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
            // IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
            exports_1("IsItemDeactivated", IsItemDeactivated = bind.IsItemDeactivated);
            // IMGUI_API bool          IsItemDeactivatedAfterChange();                                     // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
            exports_1("IsItemDeactivatedAfterChange", IsItemDeactivatedAfterChange = bind.IsItemDeactivatedAfterChange);
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
            // Clipboard Utilities (also see the LogToClipboard() function to capture or output text data to the clipboard)
            // IMGUI_API const char*   GetClipboardText();
            exports_1("GetClipboardText", GetClipboardText = bind.GetClipboardText);
            // IMGUI_API void          SetClipboardText(const char* text);
            exports_1("SetClipboardText", SetClipboardText = bind.SetClipboardText);
            // IMGUI_API void*         MemAlloc(size_t sz);
            exports_1("MemAlloc", MemAlloc = bind.MemAlloc);
            // IMGUI_API void          MemFree(void* ptr);
            exports_1("MemFree", MemFree = bind.MemFree);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWd1aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBVUEsZ0NBQWdELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDOztJQUVuRixtQkFBMEIsS0FBdUIsSUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO0tBQUUsQ0FBQyxDQUFDOztJQUUvRixzQkFBNkIsSUFBcUM7UUFDOUQsSUFBSSxJQUFJLFlBQVksY0FBYyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7SUEwd0JELGtCQUF5QixDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFZLEdBQUc7UUFDckUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekgsQ0FBQzs7SUFrc0NELGdGQUFnRjtJQUNoRix1QkFBOEIsb0JBQXdDLElBQUk7UUFDdEUsTUFBTSxVQUFVLEdBQTZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FBRTtRQUMvQyxNQUFNLEdBQUcsR0FBaUIsSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxZQUFZLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUNuQyxZQUFZLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztTQUNsQztRQUNELE9B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