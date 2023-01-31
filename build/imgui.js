System.register(["bind-imgui", "./imconfig.js"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Bind, bind, config, IMGUI_VERSION, IMGUI_VERSION_NUM, IMGUI_HAS_TABLE, ImStringBuffer, ImGuiWindowFlags, ImGuiInputTextFlags, ImGuiTreeNodeFlags, ImGuiPopupFlags, ImGuiSelectableFlags, ImGuiComboFlags, ImGuiTabBarFlags, ImGuiTabItemFlags, ImGuiTableFlags, ImGuiTableColumnFlags, ImGuiTableRowFlags, ImGuiTableBgTarget, ImGuiFocusedFlags, ImGuiHoveredFlags, ImGuiDragDropFlags, IMGUI_PAYLOAD_TYPE_COLOR_3F, IMGUI_PAYLOAD_TYPE_COLOR_4F, ImGuiDataType, ImGuiDir, ImGuiSortDirection, ImGuiKey, ImGuiKeyModFlags, ImGuiNavInput, ImGuiConfigFlags, ImGuiCol, ImGuiStyleVar, ImGuiBackendFlags, ImGuiButtonFlags, ImGuiColorEditFlags, ImGuiSliderFlags, ImGuiMouseButton, ImGuiMouseCursor, ImGuiCond, ImDrawFlags, ImDrawListFlags, ImVec2, ImVec4, ImVector, IM_UNICODE_CODEPOINT_MAX, ImGuiTextFilter, ImGuiTextBuffer, ImGuiStorage, IM_COL32_R_SHIFT, IM_COL32_G_SHIFT, IM_COL32_B_SHIFT, IM_COL32_A_SHIFT, IM_COL32_A_MASK, IM_COL32_WHITE, IM_COL32_BLACK, IM_COL32_BLACK_TRANS, ImColor, ImGuiInputTextDefaultSize, ImGuiInputTextCallbackData, ImGuiSizeCallbackData, ImGuiTableColumnSortSpecs, ImGuiTableSortSpecs, ImGuiListClipper, IM_DRAWLIST_TEX_LINES_WIDTH_MAX, ImDrawCallback_ResetRenderState, ImDrawCmd, ImDrawIdxSize, ImDrawVertSize, ImDrawVertPosOffset, ImDrawVertUVOffset, ImDrawVertColOffset, ImDrawVert, ImDrawCmdHeader, ImDrawChannel, ImDrawListSharedData, ImDrawList, ImDrawData, script_ImFontConfig, ImFontConfig, script_ImFontGlyph, ImFontGlyph, ImFontAtlasCustomRect, ImFontAtlasFlags, ImFontAtlas, ImFont, ImGuiViewportFlags, ImGuiViewport, script_ImGuiStyle, ImGuiStyle, ImGuiIO, ImGuiContext, _ImGui_DragDropPayload_data;
    var __moduleName = context_1 && context_1.id;
    function default_1(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                Bind.default(value).then((value) => {
                    exports_1("bind", bind = value);
                    resolve();
                });
            });
        });
    }
    exports_1("default", default_1);
    function import_Scalar(sca) {
        if (Array.isArray(sca)) {
            return [sca[0]];
        }
        if (typeof sca === "function") {
            return [sca()];
        }
        return [sca.x];
    }
    function export_Scalar(tuple, sca) {
        if (Array.isArray(sca)) {
            sca[0] = tuple[0];
            return;
        }
        if (typeof sca === "function") {
            sca(tuple[0]);
            return;
        }
        sca.x = tuple[0];
    }
    function import_Vector2(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1]];
        }
        return [vec.x, vec.y];
    }
    function export_Vector2(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
    }
    function import_Vector3(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1], vec[2]];
        }
        return [vec.x, vec.y, vec.z];
    }
    function export_Vector3(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            vec[2] = tuple[2];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
        vec.z = tuple[2];
    }
    function import_Vector4(vec) {
        if (Array.isArray(vec)) {
            return [vec[0], vec[1], vec[2], vec[3] || 0];
        }
        return [vec.x, vec.y, vec.z, vec.w];
    }
    function export_Vector4(tuple, vec) {
        if (Array.isArray(vec)) {
            vec[0] = tuple[0];
            vec[1] = tuple[1];
            vec[2] = tuple[2];
            vec[3] = tuple[3];
            return;
        }
        vec.x = tuple[0];
        vec.y = tuple[1];
        vec.z = tuple[2];
        vec.w = tuple[3];
    }
    function import_Color3(col) {
        if (Array.isArray(col)) {
            return [col[0], col[1], col[2]];
        }
        if ("r" in col) {
            return [col.r, col.g, col.b];
        }
        return [col.x, col.y, col.z];
    }
    function export_Color3(tuple, col) {
        if (Array.isArray(col)) {
            col[0] = tuple[0];
            col[1] = tuple[1];
            col[2] = tuple[2];
            return;
        }
        if ("r" in col) {
            col.r = tuple[0];
            col.g = tuple[1];
            col.b = tuple[2];
            return;
        }
        col.x = tuple[0];
        col.y = tuple[1];
        col.z = tuple[2];
    }
    function import_Color4(col) {
        if (Array.isArray(col)) {
            return [col[0], col[1], col[2], col[3]];
        }
        if ("r" in col) {
            return [col.r, col.g, col.b, col.a];
        }
        return [col.x, col.y, col.z, col.w];
    }
    function export_Color4(tuple, col) {
        if (Array.isArray(col)) {
            col[0] = tuple[0];
            col[1] = tuple[1];
            col[2] = tuple[2];
            col[3] = tuple[3];
            return;
        }
        if ("r" in col) {
            col.r = tuple[0];
            col.g = tuple[1];
            col.b = tuple[2];
            col.a = tuple[3];
            return;
        }
        col.x = tuple[0];
        col.y = tuple[1];
        col.z = tuple[2];
        col.w = tuple[3];
    }
    function IMGUI_CHECKVERSION() { return DebugCheckVersionAndDataLayout(IMGUI_VERSION, bind.ImGuiIOSize, bind.ImGuiStyleSize, bind.ImVec2Size, bind.ImVec4Size, bind.ImDrawVertSize, bind.ImDrawIdxSize); }
    exports_1("IMGUI_CHECKVERSION", IMGUI_CHECKVERSION);
    exports_1("CHECKVERSION", IMGUI_CHECKVERSION);
    function ASSERT(c) { if (!c) {
        throw new Error();
    } }
    exports_1("ASSERT", ASSERT);
    function IM_ASSERT(c) { if (!c) {
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
    exports_1("ARRAYSIZE", IM_ARRAYSIZE);
    function IM_COL32(R, G, B, A = 255) {
        return ((A << IM_COL32_A_SHIFT) | (B << IM_COL32_B_SHIFT) | (G << IM_COL32_G_SHIFT) | (R << IM_COL32_R_SHIFT)) >>> 0;
    }
    exports_1("IM_COL32", IM_COL32);
    exports_1("COL32", IM_COL32);
    function CreateContext(shared_font_atlas = null) {
        const ctx = new ImGuiContext(bind.CreateContext(shared_font_atlas !== null ? shared_font_atlas.native : null));
        if (ImGuiContext.current_ctx === null) {
            ImGuiContext.current_ctx = ctx;
        }
        return ctx;
    }
    exports_1("CreateContext", CreateContext);
    function DestroyContext(ctx = null) {
        if (ctx === null) {
            ctx = ImGuiContext.current_ctx;
            ImGuiContext.current_ctx = null;
        }
        bind.DestroyContext((ctx === null) ? null : ctx.native);
    }
    exports_1("DestroyContext", DestroyContext);
    function GetCurrentContext() {
        // const ctx_native: Bind.ImGuiContext | null = bind.GetCurrentContext();
        return ImGuiContext.current_ctx;
    }
    exports_1("GetCurrentContext", GetCurrentContext);
    function SetCurrentContext(ctx) {
        bind.SetCurrentContext((ctx === null) ? null : ctx.native);
        ImGuiContext.current_ctx = ctx;
    }
    exports_1("SetCurrentContext", SetCurrentContext);
    // Main
    // IMGUI_API ImGuiIO&      GetIO();                                    // access the IO structure (mouse/keyboard/gamepad inputs, time, various configuration options/flags)
    // IMGUI_API ImGuiStyle&   GetStyle();                                 // access the Style structure (colors, sizes). Always use PushStyleCol(), PushStyleVar() to modify style mid-frame!
    // IMGUI_API void          NewFrame();                                 // start a new Dear ImGui frame, you can submit any command from this point until Render()/EndFrame().
    // IMGUI_API void          EndFrame();                                 // ends the Dear ImGui frame. automatically called by Render(). If you don't need to render data (skipping rendering) you may call EndFrame() without Render()... but you'll have wasted CPU already! If you don't need to render, better to not create any windows and not call NewFrame() at all!
    // IMGUI_API void          Render();                                   // ends the Dear ImGui frame, finalize the draw data. You can then get call GetDrawData().
    // IMGUI_API ImDrawData*   GetDrawData();                              // valid after Render() and until the next call to NewFrame(). this is what you have to render.
    function GetIO() { return new ImGuiIO(bind.GetIO()); }
    exports_1("GetIO", GetIO);
    function GetStyle() { return new ImGuiStyle(bind.GetStyle()); }
    exports_1("GetStyle", GetStyle);
    function NewFrame() { bind.NewFrame(); }
    exports_1("NewFrame", NewFrame);
    function EndFrame() { bind.EndFrame(); }
    exports_1("EndFrame", EndFrame);
    function Render() { bind.Render(); }
    exports_1("Render", Render);
    function GetDrawData() {
        const draw_data = bind.GetDrawData();
        return (draw_data === null) ? null : new ImDrawData(draw_data);
    }
    exports_1("GetDrawData", GetDrawData);
    // Demo, Debug, Information
    // IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create Demo window. demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
    // IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create Metrics/Debugger window. display Dear ImGui internals: windows, draw commands, various internal state, etc.
    // IMGUI_API void          ShowStackToolWindow(bool* p_open = NULL);   // create Stack Tool window. hover items with mouse to query information about the source of their unique ID.
    // IMGUI_API void          ShowAboutWindow(bool* p_open = NULL);       // create About window. display Dear ImGui version, credits and build/system information.
    // IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
    // IMGUI_API bool          ShowStyleSelector(const char* label);       // add style selector block (not a window), essentially a combo listing the default styles.
    // IMGUI_API void          ShowFontSelector(const char* label);        // add font selector block (not a window), essentially a combo listing the loaded fonts.
    // IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
    // IMGUI_API const char*   GetVersion();                               // get the compiled version string e.g. "1.80 WIP" (essentially the value for IMGUI_VERSION from the compiled version of imgui.cpp)
    function ShowDemoWindow(p_open = null) { bind.ShowDemoWindow(p_open); }
    exports_1("ShowDemoWindow", ShowDemoWindow);
    function ShowMetricsWindow(p_open = null) {
        if (p_open === null) {
            bind.ShowMetricsWindow(null);
        }
        else if (Array.isArray(p_open)) {
            bind.ShowMetricsWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            bind.ShowMetricsWindow(ref_open);
            p_open(ref_open[0]);
        }
    }
    exports_1("ShowMetricsWindow", ShowMetricsWindow);
    function ShowStackToolWindow(p_open = null) {
        if (p_open === null) {
            bind.ShowStackToolWindow(null);
        }
        else if (Array.isArray(p_open)) {
            bind.ShowStackToolWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            bind.ShowStackToolWindow(ref_open);
            p_open(ref_open[0]);
        }
    }
    exports_1("ShowStackToolWindow", ShowStackToolWindow);
    function ShowAboutWindow(p_open = null) {
        if (p_open === null) {
            bind.ShowAboutWindow(null);
        }
        else if (Array.isArray(p_open)) {
            bind.ShowAboutWindow(p_open);
        }
        else {
            const ref_open = [p_open()];
            bind.ShowAboutWindow(ref_open);
            p_open(ref_open[0]);
        }
    }
    exports_1("ShowAboutWindow", ShowAboutWindow);
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
    function ShowStyleSelector(label) { return bind.ShowStyleSelector(label); }
    exports_1("ShowStyleSelector", ShowStyleSelector);
    function ShowFontSelector(label) { bind.ShowFontSelector(label); }
    exports_1("ShowFontSelector", ShowFontSelector);
    function ShowUserGuide() { bind.ShowUserGuide(); }
    exports_1("ShowUserGuide", ShowUserGuide);
    function GetVersion() { return bind.GetVersion(); }
    exports_1("GetVersion", GetVersion);
    // Styles
    // IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);    // new, recommended style (default)
    // IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);   // best used with borders and a custom, thicker font
    // IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL); // classic imgui style
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
    // Windows
    // - Begin() = push window to the stack and start appending to it. End() = pop window from the stack.
    // - Passing 'bool* p_open != NULL' shows a window-closing widget in the upper-right corner of the window,
    //   which clicking will set the boolean to false when clicked.
    // - You may append multiple times to the same window during the same frame by calling Begin()/End() pairs multiple times.
    //   Some information such as 'flags' or 'p_open' will only be considered by the first call to Begin().
    // - Begin() return false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting
    //   anything to the window. Always call a matching End() for each Begin() call, regardless of its return value!
    //   [Important: due to legacy reason, this is inconsistent with most other functions such as BeginMenu/EndMenu,
    //    BeginPopup/EndPopup, etc. where the EndXXX call should only be called if the corresponding BeginXXX function
    //    returned true. Begin and BeginChild are the only odd ones out. Will be fixed in a future update.]
    // - Note that the bottom of window stack always contains a window called "Debug".
    // IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
    // IMGUI_API void          End();
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
    function End() { bind.End(); }
    exports_1("End", End);
    // Child Windows
    // - Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window. Child windows can embed their own child.
    // - For each independent axis of 'size': ==0.0f: use remaining host window size / >0.0f: fixed size / <0.0f: use remaining window size minus abs(size) / Each axis can use a different mode, e.g. ImVec2(0,400).
    // - BeginChild() returns false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting anything to the window.
    //   Always call a matching EndChild() for each BeginChild() call, regardless of its return value.
    //   [Important: due to legacy reason, this is inconsistent with most other functions such as BeginMenu/EndMenu,
    //    BeginPopup/EndPopup, etc. where the EndXXX call should only be called if the corresponding BeginXXX function
    //    returned true. Begin and BeginChild are the only odd ones out. Will be fixed in a future update.]
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
    // IMGUI_API void          EndChild();
    function BeginChild(id, size = ImVec2.ZERO, border = false, flags = 0) {
        return bind.BeginChild(id, size, border, flags);
    }
    exports_1("BeginChild", BeginChild);
    function EndChild() { bind.EndChild(); }
    exports_1("EndChild", EndChild);
    // Windows Utilities
    // - 'current window' = the window we are appending into while inside a Begin()/End() block. 'next window' = next window we will Begin() into.
    // IMGUI_API bool          IsWindowAppearing();
    // IMGUI_API bool          IsWindowCollapsed();
    // IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags=0); // is current window focused? or its root/child, depending on flags. see flags for options.
    // IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags=0); // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options. NB: If you are trying to check whether your mouse should be dispatched to imgui or to your app, you should use the 'io.WantCaptureMouse' boolean for that! Please read the FAQ!
    // IMGUI_API ImDrawList*   GetWindowDrawList();                        // get draw list associated to the current window, to append your own drawing primitives
    // IMGUI_API ImVec2        GetWindowPos();                             // get current window position in screen space (useful if you want to do your own drawing via the DrawList API)
    // IMGUI_API ImVec2        GetWindowSize();                            // get current window size
    // IMGUI_API float         GetWindowWidth();                           // get current window width (shortcut for GetWindowSize().x)
    // IMGUI_API float         GetWindowHeight();                          // get current window height (shortcut for GetWindowSize().y)
    function IsWindowAppearing() { return bind.IsWindowAppearing(); }
    exports_1("IsWindowAppearing", IsWindowAppearing);
    function IsWindowCollapsed() { return bind.IsWindowCollapsed(); }
    exports_1("IsWindowCollapsed", IsWindowCollapsed);
    function IsWindowFocused(flags = 0) { return bind.IsWindowFocused(flags); }
    exports_1("IsWindowFocused", IsWindowFocused);
    function IsWindowHovered(flags = 0) { return bind.IsWindowHovered(flags); }
    exports_1("IsWindowHovered", IsWindowHovered);
    function GetWindowDrawList() { return new ImDrawList(bind.GetWindowDrawList()); }
    exports_1("GetWindowDrawList", GetWindowDrawList);
    function GetWindowPos(out = new ImVec2()) { return bind.GetWindowPos(out); }
    exports_1("GetWindowPos", GetWindowPos);
    function GetWindowSize(out = new ImVec2()) { return bind.GetWindowSize(out); }
    exports_1("GetWindowSize", GetWindowSize);
    function GetWindowWidth() { return bind.GetWindowWidth(); }
    exports_1("GetWindowWidth", GetWindowWidth);
    function GetWindowHeight() { return bind.GetWindowHeight(); }
    exports_1("GetWindowHeight", GetWindowHeight);
    // Prefer using SetNextXXX functions (before Begin) rather that SetXXX functions (after Begin).
    // IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0, 0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
    // IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);                  // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
    // IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Sizes will be rounded down. Use callback to apply non-trivial programmatic constraints.
    // IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                               // set next window content size (~ scrollable client area, which enforce the range of scrollbars). Not including window decorations (title bar, menu bar, etc.) nor WindowPadding. set an axis to 0.0f to leave it automatic. call before Begin()
    // IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);                 // set next window collapsed state. call before Begin()
    // IMGUI_API void          SetNextWindowFocus();                                                       // set next window to be focused / top-most. call before Begin()
    // IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                          // set next window background color alpha. helper to easily override the Alpha component of ImGuiCol_WindowBg/ChildBg/PopupBg. you may also use ImGuiWindowFlags_NoBackground.
    // IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                        // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
    // IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);                      // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0, 0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
    // IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);                     // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
    // IMGUI_API void          SetWindowFocus();                                                           // (not recommended) set current window to be focused / top-most. prefer using SetNextWindowFocus().
    // IMGUI_API void          SetWindowFontScale(float scale);                                            // set font scale. Adjust IO.FontGlobalScale if you want to scale all windows. This is an old API! For correct scaling, prefer to reload font + rebuild ImFontAtlas + call style.ScaleAllSizes().
    // IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
    // IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
    // IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
    // IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / top-most. use NULL to remove focus.
    function SetNextWindowPos(pos, cond = 0, pivot = ImVec2.ZERO) { bind.SetNextWindowPos(pos, cond, pivot); }
    exports_1("SetNextWindowPos", SetNextWindowPos);
    function SetNextWindowSize(pos, cond = 0) { bind.SetNextWindowSize(pos, cond); }
    exports_1("SetNextWindowSize", SetNextWindowSize);
    function SetNextWindowSizeConstraints(size_min, size_max, custom_callback = null, custom_callback_data = null) {
        if (custom_callback) {
            bind.SetNextWindowSizeConstraints(size_min, size_max, (data) => {
                custom_callback(new ImGuiSizeCallbackData(data, custom_callback_data));
            }, null);
        }
        else {
            bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
        }
    }
    exports_1("SetNextWindowSizeConstraints", SetNextWindowSizeConstraints);
    function SetNextWindowContentSize(size) { bind.SetNextWindowContentSize(size); }
    exports_1("SetNextWindowContentSize", SetNextWindowContentSize);
    function SetNextWindowCollapsed(collapsed, cond = 0) { bind.SetNextWindowCollapsed(collapsed, cond); }
    exports_1("SetNextWindowCollapsed", SetNextWindowCollapsed);
    function SetNextWindowFocus() { bind.SetNextWindowFocus(); }
    exports_1("SetNextWindowFocus", SetNextWindowFocus);
    function SetNextWindowBgAlpha(alpha) { bind.SetNextWindowBgAlpha(alpha); }
    exports_1("SetNextWindowBgAlpha", SetNextWindowBgAlpha);
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
    function SetWindowFontScale(scale) { bind.SetWindowFontScale(scale); }
    exports_1("SetWindowFontScale", SetWindowFontScale);
    // Content region
    // - Retrieve available space from a given point. GetContentRegionAvail() is frequently useful.
    // - Those functions are bound to be redesigned (they are confusing, incomplete and the Min/Max return values are in local window coordinates which increases confusion)
    // IMGUI_API ImVec2        GetContentRegionAvail();                                        // == GetContentRegionMax() - GetCursorPos()
    // IMGUI_API ImVec2        GetContentRegionMax();                                          // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
    // IMGUI_API ImVec2        GetWindowContentRegionMin();                                    // content boundaries min (roughly (0,0)-Scroll), in window coordinates
    // IMGUI_API ImVec2        GetWindowContentRegionMax();                                    // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
    // IMGUI_API float         GetWindowContentRegionWidth();                                  //
    function GetContentRegionAvail(out = new ImVec2()) { return bind.GetContentRegionAvail(out); }
    exports_1("GetContentRegionAvail", GetContentRegionAvail);
    function GetContentRegionMax(out = new ImVec2()) { return bind.GetContentRegionMax(out); }
    exports_1("GetContentRegionMax", GetContentRegionMax);
    function GetWindowContentRegionMin(out = new ImVec2()) { return bind.GetWindowContentRegionMin(out); }
    exports_1("GetWindowContentRegionMin", GetWindowContentRegionMin);
    function GetWindowContentRegionMax(out = new ImVec2()) { return bind.GetWindowContentRegionMax(out); }
    exports_1("GetWindowContentRegionMax", GetWindowContentRegionMax);
    // export function GetWindowContentRegionWidth(): number { return bind.GetWindowContentRegionWidth(); }
    // Windows Scrolling
    // IMGUI_API float         GetScrollX();                                                   // get scrolling amount [0 .. GetScrollMaxX()]
    // IMGUI_API float         GetScrollY();                                                   // get scrolling amount [0 .. GetScrollMaxY()]
    // IMGUI_API void          SetScrollX(float scroll_x);                                     // set scrolling amount [0 .. GetScrollMaxX()]
    // IMGUI_API void          SetScrollY(float scroll_y);                                     // set scrolling amount [0 .. GetScrollMaxY()]
    // IMGUI_API float         GetScrollMaxX();                                                // get maximum scrolling amount ~~ ContentSize.x - WindowSize.x - DecorationsSize.x
    // IMGUI_API float         GetScrollMaxY();                                                // get maximum scrolling amount ~~ ContentSize.y - WindowSize.y - DecorationsSize.y
    // IMGUI_API void          SetScrollHereX(float center_x_ratio = 0.5f);                    // adjust scrolling amount to make current cursor position visible. center_x_ratio=0.0: left, 0.5: center, 1.0: right. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    // IMGUI_API void          SetScrollHereY(float center_y_ratio = 0.5f);                    // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    // IMGUI_API void          SetScrollFromPosX(float local_x, float center_x_ratio = 0.5f);  // adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.
    // IMGUI_API void          SetScrollFromPosY(float local_y, float center_y_ratio = 0.5f);  // adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.
    function GetScrollX() { return bind.GetScrollX(); }
    exports_1("GetScrollX", GetScrollX);
    function GetScrollY() { return bind.GetScrollY(); }
    exports_1("GetScrollY", GetScrollY);
    function SetScrollX(scroll_x) { bind.SetScrollX(scroll_x); }
    exports_1("SetScrollX", SetScrollX);
    function SetScrollY(scroll_y) { bind.SetScrollY(scroll_y); }
    exports_1("SetScrollY", SetScrollY);
    function GetScrollMaxX() { return bind.GetScrollMaxX(); }
    exports_1("GetScrollMaxX", GetScrollMaxX);
    function GetScrollMaxY() { return bind.GetScrollMaxY(); }
    exports_1("GetScrollMaxY", GetScrollMaxY);
    function SetScrollHereX(center_x_ratio = 0.5) { bind.SetScrollHereX(center_x_ratio); }
    exports_1("SetScrollHereX", SetScrollHereX);
    function SetScrollHereY(center_y_ratio = 0.5) { bind.SetScrollHereY(center_y_ratio); }
    exports_1("SetScrollHereY", SetScrollHereY);
    function SetScrollFromPosX(pos_x, center_x_ratio = 0.5) { bind.SetScrollFromPosX(pos_x, center_x_ratio); }
    exports_1("SetScrollFromPosX", SetScrollFromPosX);
    function SetScrollFromPosY(pos_y, center_y_ratio = 0.5) { bind.SetScrollFromPosY(pos_y, center_y_ratio); }
    exports_1("SetScrollFromPosY", SetScrollFromPosY);
    // Parameters stacks (shared)
    // IMGUI_API void          PushFont(ImFont* font);                                         // use NULL as a shortcut to push default font
    // IMGUI_API void          PopFont();
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);                        // modify a style color. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
    // IMGUI_API void          PopStyleColor(int count = 1);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);                     // modify a style float variable. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);             // modify a style ImVec2 variable. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PopStyleVar(int count = 1);
    // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);              // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
    // IMGUI_API void          PopAllowKeyboardFocus();
    // IMGUI_API void          PushButtonRepeat(bool repeat);                                  // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
    // IMGUI_API void          PopButtonRepeat();
    function PushFont(font) { bind.PushFont(font ? font.native : null); }
    exports_1("PushFont", PushFont);
    function PopFont() { bind.PopFont(); }
    exports_1("PopFont", PopFont);
    function PushStyleColor(idx, col) {
        if (col instanceof ImColor) {
            bind.PushStyleColor(idx, col.Value);
        }
        else {
            bind.PushStyleColor(idx, col);
        }
    }
    exports_1("PushStyleColor", PushStyleColor);
    function PopStyleColor(count = 1) { bind.PopStyleColor(count); }
    exports_1("PopStyleColor", PopStyleColor);
    function PushStyleVar(idx, val) { bind.PushStyleVar(idx, val); }
    exports_1("PushStyleVar", PushStyleVar);
    function PopStyleVar(count = 1) { bind.PopStyleVar(count); }
    exports_1("PopStyleVar", PopStyleVar);
    function PushAllowKeyboardFocus(allow_keyboard_focus) { bind.PushAllowKeyboardFocus(allow_keyboard_focus); }
    exports_1("PushAllowKeyboardFocus", PushAllowKeyboardFocus);
    function PopAllowKeyboardFocus() { bind.PopAllowKeyboardFocus(); }
    exports_1("PopAllowKeyboardFocus", PopAllowKeyboardFocus);
    function PushButtonRepeat(repeat) { bind.PushButtonRepeat(repeat); }
    exports_1("PushButtonRepeat", PushButtonRepeat);
    function PopButtonRepeat() { bind.PopButtonRepeat(); }
    exports_1("PopButtonRepeat", PopButtonRepeat);
    // Parameters stacks (current window)
    // IMGUI_API void          PushItemWidth(float item_width);                                // push width of items for common large "item+label" widgets. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -FLT_MIN always align width to the right side). 0.0f = default to ~2/3 of windows width,
    // IMGUI_API void          PopItemWidth();
    // IMGUI_API void          SetNextItemWidth(float item_width);                             // set width of the _next_ common large "item+label" widget. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -FLT_MIN always align width to the right side)
    // IMGUI_API float         CalcItemWidth();                                                // width of item given pushed settings and current cursor position. NOT necessarily the width of last item unlike most 'Item' functions.
    // IMGUI_API void          PushTextWrapPos(float wrap_local_pos_x = 0.0f);                 // push word-wrapping position for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    // IMGUI_API void          PopTextWrapPos();
    function PushItemWidth(item_width) { bind.PushItemWidth(item_width); }
    exports_1("PushItemWidth", PushItemWidth);
    function PopItemWidth() { bind.PopItemWidth(); }
    exports_1("PopItemWidth", PopItemWidth);
    function SetNextItemWidth(item_width) { bind.SetNextItemWidth(item_width); } // set width of the _next_ common large "item+label" widget. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
    exports_1("SetNextItemWidth", SetNextItemWidth);
    function CalcItemWidth() { return bind.CalcItemWidth(); }
    exports_1("CalcItemWidth", CalcItemWidth);
    function PushTextWrapPos(wrap_pos_x = 0.0) { bind.PushTextWrapPos(wrap_pos_x); }
    exports_1("PushTextWrapPos", PushTextWrapPos);
    function PopTextWrapPos() { bind.PopTextWrapPos(); }
    exports_1("PopTextWrapPos", PopTextWrapPos);
    // Style read access
    // IMGUI_API ImFont*       GetFont();                                                      // get current font
    // IMGUI_API float         GetFontSize();                                                  // get current font size (= height in pixels) of current font with current scale applied
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                       // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    // IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);              // retrieve given style color with style alpha applied and optional extra alpha multiplier, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                 // retrieve given color with style alpha applied, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API ImU32         GetColorU32(ImU32 col);                                         // retrieve given color with style alpha applied, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwise use GetColorU32() to get style color with style alpha baked in.
    function GetFont() { return new ImFont(bind.GetFont()); }
    exports_1("GetFont", GetFont);
    function GetFontSize() { return bind.GetFontSize(); }
    exports_1("GetFontSize", GetFontSize);
    function GetFontTexUvWhitePixel(out = new ImVec2()) { return bind.GetFontTexUvWhitePixel(out); }
    exports_1("GetFontTexUvWhitePixel", GetFontTexUvWhitePixel);
    function GetColorU32(...args) {
        if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                if (0 <= args[0] && args[0] < ImGuiCol.COUNT) {
                    const idx = args[0];
                    return bind.GetColorU32_A(idx, 1.0);
                }
                else {
                    const col = args[0];
                    return bind.GetColorU32_C(col);
                }
            }
            else {
                const col = args[0];
                return bind.GetColorU32_B(col);
            }
        }
        else {
            const idx = args[0];
            const alpha_mul = args[1];
            return bind.GetColorU32_A(idx, alpha_mul);
        }
    }
    exports_1("GetColorU32", GetColorU32);
    function GetStyleColorVec4(idx) { return bind.GetStyleColorVec4(idx); }
    exports_1("GetStyleColorVec4", GetStyleColorVec4);
    // Cursor / Layout
    // - By "cursor" we mean the current output position.
    // - The typical widget behavior is to output themselves at the current cursor position, then move the cursor one line down.
    // - You can call SameLine() between widgets to undo the last carriage return and output at the right of the preceding widget.
    // - Attention! We currently have inconsistencies between window-local and absolute positions we will aim to fix with future API:
    //    Window-local coordinates:   SameLine(), GetCursorPos(), SetCursorPos(), GetCursorStartPos(), GetContentRegionMax(), GetWindowContentRegion*(), PushTextWrapPos()
    //    Absolute coordinate:        GetCursorScreenPos(), SetCursorScreenPos(), all ImDrawList:: functions.
    // IMGUI_API void          Separator();                                                    // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
    // IMGUI_API void          SameLine(float offset_from_start_x=0.0f, float spacing=-1.0f);  // call between widgets or groups to layout them horizontally. X position given in window coordinates.
    // IMGUI_API void          NewLine();                                                      // undo a SameLine() or force a new line when in an horizontal-layout context.
    // IMGUI_API void          Spacing();                                                      // add vertical spacing.
    // IMGUI_API void          Dummy(const ImVec2& size);                                      // add a dummy item of given size. unlike InvisibleButton(), Dummy() won't take the mouse click or be navigable into.
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                  // move content position toward the right, by indent_w, or style.IndentSpacing if indent_w <= 0
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                // move content position back to the left, by indent_w, or style.IndentSpacing if indent_w <= 0
    // IMGUI_API void          BeginGroup();                                                   // lock horizontal starting position
    // IMGUI_API void          EndGroup();                                                     // unlock horizontal starting position + capture the whole group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
    // IMGUI_API ImVec2        GetCursorPos();                                                 // cursor position in window coordinates (relative to window position)
    // IMGUI_API float         GetCursorPosX();                                                //   (some functions are using window-relative coordinates, such as: GetCursorPos, GetCursorStartPos, GetContentRegionMax, GetWindowContentRegion* etc.
    // IMGUI_API float         GetCursorPosY();                                                //    other functions such as GetCursorScreenPos or everything in ImDrawList::
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                          //    are using the main, absolute coordinate system.
    // IMGUI_API void          SetCursorPosX(float local_x);                                   //    GetWindowPos() + GetCursorPos() == GetCursorScreenPos() etc.)
    // IMGUI_API void          SetCursorPosY(float local_y);                                   //
    // IMGUI_API ImVec2        GetCursorStartPos();                                            // initial cursor position in window coordinates
    // IMGUI_API ImVec2        GetCursorScreenPos();                                           // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                          // cursor position in absolute screen coordinates [0..io.DisplaySize]
    // IMGUI_API void          AlignTextToFramePadding();                                      // vertically align upcoming text baseline to FramePadding.y so that it will align properly to regularly framed items (call if you have text on a line before a framed item)
    // IMGUI_API float         GetTextLineHeight();                                            // ~ FontSize
    // IMGUI_API float         GetTextLineHeightWithSpacing();                                 // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
    // IMGUI_API float         GetFrameHeight();                                               // ~ FontSize + style.FramePadding.y * 2
    // IMGUI_API float         GetFrameHeightWithSpacing();                                    // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
    function Separator() { bind.Separator(); }
    exports_1("Separator", Separator);
    function SameLine(pos_x = 0.0, spacing_w = -1.0) { bind.SameLine(pos_x, spacing_w); }
    exports_1("SameLine", SameLine);
    function NewLine() { bind.NewLine(); }
    exports_1("NewLine", NewLine);
    function Spacing() { bind.Spacing(); }
    exports_1("Spacing", Spacing);
    function Dummy(size) { bind.Dummy(size); }
    exports_1("Dummy", Dummy);
    function Indent(indent_w = 0.0) { bind.Indent(indent_w); }
    exports_1("Indent", Indent);
    function Unindent(indent_w = 0.0) { bind.Unindent(indent_w); }
    exports_1("Unindent", Unindent);
    function BeginGroup() { bind.BeginGroup(); }
    exports_1("BeginGroup", BeginGroup);
    function EndGroup() { bind.EndGroup(); }
    exports_1("EndGroup", EndGroup);
    function GetCursorPos(out = new ImVec2()) { return bind.GetCursorPos(out); }
    exports_1("GetCursorPos", GetCursorPos);
    function GetCursorPosX() { return bind.GetCursorPosX(); }
    exports_1("GetCursorPosX", GetCursorPosX);
    function GetCursorPosY() { return bind.GetCursorPosY(); }
    exports_1("GetCursorPosY", GetCursorPosY);
    function SetCursorPos(local_pos) { bind.SetCursorPos(local_pos); }
    exports_1("SetCursorPos", SetCursorPos);
    function SetCursorPosX(x) { bind.SetCursorPosX(x); }
    exports_1("SetCursorPosX", SetCursorPosX);
    function SetCursorPosY(y) { bind.SetCursorPosY(y); }
    exports_1("SetCursorPosY", SetCursorPosY);
    function GetCursorStartPos(out = new ImVec2()) { return bind.GetCursorStartPos(out); }
    exports_1("GetCursorStartPos", GetCursorStartPos);
    function GetCursorScreenPos(out = new ImVec2()) { return bind.GetCursorScreenPos(out); }
    exports_1("GetCursorScreenPos", GetCursorScreenPos);
    function SetCursorScreenPos(pos) { bind.SetCursorScreenPos(pos); }
    exports_1("SetCursorScreenPos", SetCursorScreenPos);
    function AlignTextToFramePadding() { bind.AlignTextToFramePadding(); }
    exports_1("AlignTextToFramePadding", AlignTextToFramePadding);
    function GetTextLineHeight() { return bind.GetTextLineHeight(); }
    exports_1("GetTextLineHeight", GetTextLineHeight);
    function GetTextLineHeightWithSpacing() { return bind.GetTextLineHeightWithSpacing(); }
    exports_1("GetTextLineHeightWithSpacing", GetTextLineHeightWithSpacing);
    function GetFrameHeight() { return bind.GetFrameHeight(); }
    exports_1("GetFrameHeight", GetFrameHeight);
    function GetFrameHeightWithSpacing() { return bind.GetFrameHeightWithSpacing(); }
    exports_1("GetFrameHeightWithSpacing", GetFrameHeightWithSpacing);
    // ID stack/scopes
    // - Read the FAQ for more details about how ID are handled in dear imgui. If you are creating widgets in a loop you most
    //   likely want to push a unique identifier (e.g. object pointer, loop index) to uniquely differentiate them.
    // - The resulting ID are hashes of the entire stack.
    // - You can also use the "Label##foobar" syntax within widget label to distinguish them from each others.
    // - In this header file we use the "label"/"name" terminology to denote a string that will be displayed and used as an ID,
    //   whereas "str_id" denote a string that is only used as an ID and not normally displayed.
    // IMGUI_API void          PushID(const char* str_id);                                     // push string into the ID stack (will hash string).
    // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);       // push string into the ID stack (will hash string).
    // IMGUI_API void          PushID(const void* ptr_id);                                     // push pointer into the ID stack (will hash pointer).
    // IMGUI_API void          PushID(int int_id);                                             // push integer into the ID stack (will hash integer).
    // IMGUI_API void          PopID();                                                        // pop from the ID stack.
    // IMGUI_API ImGuiID       GetID(const char* str_id);                                      // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
    // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API ImGuiID       GetID(const void* ptr_id);
    function PushID(id) { bind.PushID(id); }
    exports_1("PushID", PushID);
    function PopID() { bind.PopID(); }
    exports_1("PopID", PopID);
    function GetID(id) { return bind.GetID(id); }
    exports_1("GetID", GetID);
    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL); // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    // IMGUI_API void          Text(const char* fmt, ...)                                      IM_FMTARGS(1); // formatted text
    // IMGUI_API void          TextV(const char* fmt, va_list args)                            IM_FMTLIST(1);
    // IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)            IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args)  IM_FMTLIST(2);
    // IMGUI_API void          TextDisabled(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                    IM_FMTLIST(1);
    // IMGUI_API void          TextWrapped(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
    // IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                     IM_FMTLIST(1);
    // IMGUI_API void          LabelText(const char* label, const char* fmt, ...)              IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
    // IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)    IM_FMTLIST(2);
    // IMGUI_API void          BulletText(const char* fmt, ...)                                IM_FMTARGS(1); // shortcut for Bullet()+Text()
    // IMGUI_API void          BulletTextV(const char* fmt, va_list args)                      IM_FMTLIST(1);
    function TextUnformatted(text, text_end = null) { bind.TextUnformatted(text_end !== null ? text.substring(0, text_end) : text); }
    exports_1("TextUnformatted", TextUnformatted);
    function Text(text) { bind.Text(text); }
    exports_1("Text", Text);
    function TextColored(col, text) { bind.TextColored((col instanceof ImColor) ? col.Value : col, text); }
    exports_1("TextColored", TextColored);
    function TextDisabled(text) { bind.TextDisabled(text); }
    exports_1("TextDisabled", TextDisabled);
    function TextWrapped(text) { bind.TextWrapped(text); }
    exports_1("TextWrapped", TextWrapped);
    function LabelText(label, text) { bind.LabelText(label, text); }
    exports_1("LabelText", LabelText);
    function BulletText(text) { bind.BulletText(text); }
    exports_1("BulletText", BulletText);
    // Widgets: Main
    // - Most widgets return true when the value has been changed or when pressed/selected
    // - You may also use one of the many IsItemXXX functions (e.g. IsItemActive, IsItemHovered, etc.) to query widget state.
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0, 0));   // button
    // IMGUI_API bool          SmallButton(const char* label);                                 // button with FramePadding=(0,0) to easily embed within text
    // IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size, ImGuiButtonFlags flags = 0); // flexible button behavior without the visuals, frequently useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
    // IMGUI_API bool          ArrowButton(const char* str_id, ImGuiDir dir);                  // square button with an arrow shape
    // IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
    // IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
    // IMGUI_API bool          Checkbox(const char* label, bool* v);
    // IMGUI_API bool          CheckboxFlags(const char* label, int* flags, int flags_value);
    // IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
    // IMGUI_API bool          RadioButton(const char* label, bool active);                    // use with e.g. if (RadioButton("one", my_value==1)) { my_value = 1; }
    // IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);           // shortcut to handle the above pattern when value is an integer
    // IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-FLT_MIN, 0), const char* overlay = NULL);
    // IMGUI_API void          Bullet();                                                       // draw a small circle + keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
    function Button(label, size = ImVec2.ZERO) { return bind.Button(label, size); }
    exports_1("Button", Button);
    function SmallButton(label) { return bind.SmallButton(label); }
    exports_1("SmallButton", SmallButton);
    function ArrowButton(str_id, dir) { return bind.ArrowButton(str_id, dir); }
    exports_1("ArrowButton", ArrowButton);
    function InvisibleButton(str_id, size, flags = 0) { return bind.InvisibleButton(str_id, size, flags); }
    exports_1("InvisibleButton", InvisibleButton);
    function Image(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, tint_col = ImVec4.WHITE, border_col = ImVec4.ZERO) {
        bind.Image(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, tint_col, border_col);
    }
    exports_1("Image", Image);
    function ImageButton(user_texture_id, size = new ImVec2(Number.MIN_SAFE_INTEGER, 0), uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, frame_padding = -1, bg_col = ImVec4.ZERO, tint_col = ImVec4.WHITE) {
        return bind.ImageButton(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, frame_padding, bg_col, tint_col);
    }
    exports_1("ImageButton", ImageButton);
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
    function ProgressBar(fraction, size_arg = new ImVec2(-1, 0), overlay = null) {
        bind.ProgressBar(fraction, size_arg, overlay);
    }
    exports_1("ProgressBar", ProgressBar);
    function Bullet() { bind.Bullet(); }
    exports_1("Bullet", Bullet);
    // Widgets: Combo Box
    // - The BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it, by creating e.g. Selectable() items.
    // - The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
    // IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
    // IMGUI_API void          EndCombo(); // only call EndCombo() if BeginCombo() returns true!
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
    // IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
    function BeginCombo(label, preview_value = null, flags = 0) { return bind.BeginCombo(label, preview_value, flags); }
    exports_1("BeginCombo", BeginCombo);
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
    // Widgets: Drag Sliders
    // - CTRL+Click on any drag box to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
    // - For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
    // - Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.
    // - Format string may also be set to NULL or use the default format ("%f" or "%d").
    // - Speed are per-pixel of mouse movement (v_speed=0.2f: mouse needs to move by 5 pixels to increase value by 1). For gamepad/keyboard navigation, minimum speed is Max(v_speed, minimum_step_at_given_precision).
    // - Use v_min < v_max to clamp edits to given limits. Note that CTRL+Click manual input can override those limits.
    // - Use v_max = FLT_MAX / INT_MAX etc to avoid clamping to a maximum, same with v_min = -FLT_MAX / INT_MIN to avoid clamping to a minimum.
    // - We use the same sets of flags for DragXXX() and SliderXXX() functions as the features are the same and it makes it easier to swap them.
    // - Legacy: Pre-1.78 there are DragXXX() function signatures that takes a final `float power=1.0f' argument instead of the `ImGuiSliderFlags flags=0' argument.
    //   If you get a warning converting a float to ImGuiSliderFlags, read https://github.com/ocornut/imgui/issues/3361
    // IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);     // If v_min >= v_max we have no bound
    // IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);  // If v_min >= v_max we have no bound
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragScalar(const char* label, ImGuiDataType data_type, void* p_data, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
    function DragFloat(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.DragFloat(label, _v, v_speed, v_min, v_max, display_format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("DragFloat", DragFloat);
    function DragFloat2(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("DragFloat2", DragFloat2);
    function DragFloat3(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.DragFloat3(label, _v, v_speed, v_min, v_max, display_format, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("DragFloat3", DragFloat3);
    function DragFloat4(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.DragFloat4(label, _v, v_speed, v_min, v_max, display_format, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("DragFloat4", DragFloat4);
    function DragFloatRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", display_format_max = null, flags = 0) {
        const _v_current_min = import_Scalar(v_current_min);
        const _v_current_max = import_Scalar(v_current_max);
        const ret = bind.DragFloatRange2(label, _v_current_min, _v_current_max, v_speed, v_min, v_max, display_format, display_format_max, flags);
        export_Scalar(_v_current_min, v_current_min);
        export_Scalar(_v_current_max, v_current_max);
        return ret;
    }
    exports_1("DragFloatRange2", DragFloatRange2);
    function DragInt(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.DragInt(label, _v, v_speed, v_min, v_max, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("DragInt", DragInt);
    function DragInt2(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.DragInt2(label, _v, v_speed, v_min, v_max, format, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("DragInt2", DragInt2);
    function DragInt3(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.DragInt3(label, _v, v_speed, v_min, v_max, format, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("DragInt3", DragInt3);
    function DragInt4(label, v, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.DragInt4(label, _v, v_speed, v_min, v_max, format, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("DragInt4", DragInt4);
    function DragIntRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0, v_max = 0, format = "%d", format_max = null, flags = 0) {
        const _v_current_min = import_Scalar(v_current_min);
        const _v_current_max = import_Scalar(v_current_max);
        const ret = bind.DragIntRange2(label, _v_current_min, _v_current_max, v_speed, v_min, v_max, format, format_max, flags);
        export_Scalar(_v_current_min, v_current_min);
        export_Scalar(_v_current_max, v_current_max);
        return ret;
    }
    exports_1("DragIntRange2", DragIntRange2);
    function DragScalar(label, v, v_speed = 1.0, v_min = null, v_max = null, format = null, flags = 0) {
        if (v instanceof Int8Array) {
            return bind.DragScalar(label, ImGuiDataType.S8, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Uint8Array) {
            return bind.DragScalar(label, ImGuiDataType.U8, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Int16Array) {
            return bind.DragScalar(label, ImGuiDataType.S16, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Uint16Array) {
            return bind.DragScalar(label, ImGuiDataType.U16, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Int32Array) {
            return bind.DragScalar(label, ImGuiDataType.S32, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Uint32Array) {
            return bind.DragScalar(label, ImGuiDataType.U32, v, v_speed, v_min, v_max, format, flags);
        }
        // if (v instanceof Int64Array) { return bind.DragScalar(label, ImGuiDataType.S64, v, v_speed, v_min, v_max, format, flags); }
        // if (v instanceof Uint64Array) { return bind.DragScalar(label, ImGuiDataType.U64, v, v_speed, v_min, v_max, format, flags); }
        if (v instanceof Float32Array) {
            return bind.DragScalar(label, ImGuiDataType.Float, v, v_speed, v_min, v_max, format, flags);
        }
        if (v instanceof Float64Array) {
            return bind.DragScalar(label, ImGuiDataType.Double, v, v_speed, v_min, v_max, format, flags);
        }
        throw new Error();
    }
    exports_1("DragScalar", DragScalar);
    // Widgets: Regular Sliders
    // - CTRL+Click on any slider to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
    // - Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.
    // - Format string may also be set to NULL or use the default format ("%f" or "%d").
    // - Legacy: Pre-1.78 there are SliderXXX() function signatures that takes a final `float power=1.0f' argument instead of the `ImGuiSliderFlags flags=0' argument.
    //   If you get a warning converting a float to ImGuiSliderFlags, read https://github.com/ocornut/imgui/issues/3361
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);     // adjust format to decorate the value with a prefix or a suffix for in-slider labels or unit display.
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f, const char* format = "%.0f deg", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    function SliderFloat(label, v, v_min, v_max, format = "%.3f", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.SliderFloat(label, _v, v_min, v_max, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("SliderFloat", SliderFloat);
    function SliderFloat2(label, v, v_min, v_max, format = "%.3f", flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.SliderFloat2(label, _v, v_min, v_max, format, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("SliderFloat2", SliderFloat2);
    function SliderFloat3(label, v, v_min, v_max, format = "%.3f", flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.SliderFloat3(label, _v, v_min, v_max, format, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("SliderFloat3", SliderFloat3);
    function SliderFloat4(label, v, v_min, v_max, format = "%.3f", flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.SliderFloat4(label, _v, v_min, v_max, format, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("SliderFloat4", SliderFloat4);
    function SliderAngle(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0, format = "%.0f deg", flags = 0) {
        const _v_rad = import_Scalar(v_rad);
        const ret = bind.SliderAngle(label, _v_rad, v_degrees_min, v_degrees_max, format, flags);
        export_Scalar(_v_rad, v_rad);
        return ret;
    }
    exports_1("SliderAngle", SliderAngle);
    function SliderAngle3(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0, format = "%.0f deg", flags = 0) {
        const _v_rad = import_Vector3(v_rad);
        _v_rad[0] = Math.floor(_v_rad[0] * 180 / Math.PI);
        _v_rad[1] = Math.floor(_v_rad[1] * 180 / Math.PI);
        _v_rad[2] = Math.floor(_v_rad[2] * 180 / Math.PI);
        const ret = bind.SliderInt3(label, _v_rad, v_degrees_min, v_degrees_max, format, flags);
        _v_rad[0] = _v_rad[0] * Math.PI / 180;
        _v_rad[1] = _v_rad[1] * Math.PI / 180;
        _v_rad[2] = _v_rad[2] * Math.PI / 180;
        export_Vector3(_v_rad, v_rad);
        return ret;
    }
    exports_1("SliderAngle3", SliderAngle3);
    function SliderInt(label, v, v_min, v_max, format = "%d", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.SliderInt(label, _v, v_min, v_max, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("SliderInt", SliderInt);
    function SliderInt2(label, v, v_min, v_max, format = "%d", flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.SliderInt2(label, _v, v_min, v_max, format, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("SliderInt2", SliderInt2);
    function SliderInt3(label, v, v_min, v_max, format = "%d", flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.SliderInt3(label, _v, v_min, v_max, format, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("SliderInt3", SliderInt3);
    function SliderInt4(label, v, v_min, v_max, format = "%d", flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.SliderInt4(label, _v, v_min, v_max, format, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("SliderInt4", SliderInt4);
    function SliderScalar(label, v, v_min, v_max, format = null, flags = 0) {
        if (v instanceof Int8Array) {
            return bind.SliderScalar(label, ImGuiDataType.S8, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint8Array) {
            return bind.SliderScalar(label, ImGuiDataType.U8, v, v_min, v_max, format, flags);
        }
        if (v instanceof Int16Array) {
            return bind.SliderScalar(label, ImGuiDataType.S16, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint16Array) {
            return bind.SliderScalar(label, ImGuiDataType.U16, v, v_min, v_max, format, flags);
        }
        if (v instanceof Int32Array) {
            return bind.SliderScalar(label, ImGuiDataType.S32, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint32Array) {
            return bind.SliderScalar(label, ImGuiDataType.U32, v, v_min, v_max, format, flags);
        }
        // if (v instanceof Int64Array) { return bind.SliderScalar(label, ImGuiDataType.S64, v, v_min, v_max, format, flags); }
        // if (v instanceof Uint64Array) { return bind.SliderScalar(label, ImGuiDataType.U64, v, v_min, v_max, format, flags); }
        if (v instanceof Float32Array) {
            return bind.SliderScalar(label, ImGuiDataType.Float, v, v_min, v_max, format, flags);
        }
        if (v instanceof Float64Array) {
            return bind.SliderScalar(label, ImGuiDataType.Double, v, v_min, v_max, format, flags);
        }
        throw new Error();
    }
    exports_1("SliderScalar", SliderScalar);
    function VSliderFloat(label, size, v, v_min, v_max, format = "%.3f", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.VSliderFloat(label, size, _v, v_min, v_max, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("VSliderFloat", VSliderFloat);
    function VSliderInt(label, size, v, v_min, v_max, format = "%d", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.VSliderInt(label, size, _v, v_min, v_max, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("VSliderInt", VSliderInt);
    function VSliderScalar(label, size, data_type, v, v_min, v_max, format = null, flags = 0) {
        if (v instanceof Int8Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.S8, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint8Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.U8, v, v_min, v_max, format, flags);
        }
        if (v instanceof Int16Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.S16, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint16Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.U16, v, v_min, v_max, format, flags);
        }
        if (v instanceof Int32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.S32, v, v_min, v_max, format, flags);
        }
        if (v instanceof Uint32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.U32, v, v_min, v_max, format, flags);
        }
        // if (v instanceof Int64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.S64, v, v_min, v_max, format, flags); }
        // if (v instanceof Uint64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.U64, v, v_min, v_max, format, flags); }
        if (v instanceof Float32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.Float, v, v_min, v_max, format, flags);
        }
        if (v instanceof Float64Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.Double, v, v_min, v_max, format, flags);
        }
        throw new Error();
    }
    exports_1("VSliderScalar", VSliderScalar);
    // Widgets: Input with Keyboard
    // - If you want to use InputText() with std::string or any custom dynamic string type, see misc/cpp/imgui_stdlib.h and comments in imgui_demo.cpp.
    // - Most of the ImGuiInputTextFlags flags are only useful for InputText() and not for InputFloatX, InputIntX, InputDouble etc.
    // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0, 0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputTextWithHint(const char* label, const char* hint, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputDouble(const char* label, double* v, double step = 0.0, double step_fast = 0.0, const char* format = "%.6f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
    function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return bind.InputText(label, buf, buf_size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = bind.InputText(label, ref_buf, _buf_size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = bind.InputText(label, ref_buf, buf_size + 1, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputText", InputText);
    function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return bind.InputTextMultiline(label, buf, buf_size, size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputTextMultiline", InputTextMultiline);
    function InputTextWithHint(label, hint, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiInputTextDefaultSize, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiInputTextCallbackData(data, user_data))) || null;
        if (Array.isArray(buf)) {
            return bind.InputTextWithHint(label, hint, buf, buf_size, flags, _callback, null);
        }
        else if (buf instanceof ImStringBuffer) {
            const ref_buf = [buf.buffer];
            const _buf_size = Math.min(buf_size, buf.size);
            const ret = bind.InputTextWithHint(label, hint, ref_buf, _buf_size, flags, _callback, null);
            buf.buffer = ref_buf[0];
            return ret;
        }
        else {
            const ref_buf = [buf()];
            const ret = bind.InputTextWithHint(label, hint, ref_buf, buf_size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputTextWithHint", InputTextWithHint);
    function InputFloat(label, v, step = 0.0, step_fast = 0.0, format = "%.3f", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.InputFloat(label, _v, step, step_fast, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("InputFloat", InputFloat);
    function InputFloat2(label, v, format = "%.3f", flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.InputFloat2(label, _v, format, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("InputFloat2", InputFloat2);
    function InputFloat3(label, v, format = "%.3f", flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.InputFloat3(label, _v, format, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("InputFloat3", InputFloat3);
    function InputFloat4(label, v, format = "%.3f", flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.InputFloat4(label, _v, format, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("InputFloat4", InputFloat4);
    function InputInt(label, v, step = 1, step_fast = 100, flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.InputInt(label, _v, step, step_fast, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("InputInt", InputInt);
    function InputInt2(label, v, flags = 0) {
        const _v = import_Vector2(v);
        const ret = bind.InputInt2(label, _v, flags);
        export_Vector2(_v, v);
        return ret;
    }
    exports_1("InputInt2", InputInt2);
    function InputInt3(label, v, flags = 0) {
        const _v = import_Vector3(v);
        const ret = bind.InputInt3(label, _v, flags);
        export_Vector3(_v, v);
        return ret;
    }
    exports_1("InputInt3", InputInt3);
    function InputInt4(label, v, flags = 0) {
        const _v = import_Vector4(v);
        const ret = bind.InputInt4(label, _v, flags);
        export_Vector4(_v, v);
        return ret;
    }
    exports_1("InputInt4", InputInt4);
    function InputDouble(label, v, step = 0.0, step_fast = 0.0, format = "%.6f", flags = 0) {
        const _v = import_Scalar(v);
        const ret = bind.InputDouble(label, _v, step, step_fast, format, flags);
        export_Scalar(_v, v);
        return ret;
    }
    exports_1("InputDouble", InputDouble);
    function InputScalar(label, v, step = null, step_fast = null, format = null, flags = 0) {
        if (v instanceof Int8Array) {
            return bind.InputScalar(label, ImGuiDataType.S8, v, step, step_fast, format, flags);
        }
        if (v instanceof Uint8Array) {
            return bind.InputScalar(label, ImGuiDataType.U8, v, step, step_fast, format, flags);
        }
        if (v instanceof Int16Array) {
            return bind.InputScalar(label, ImGuiDataType.S16, v, step, step_fast, format, flags);
        }
        if (v instanceof Uint16Array) {
            return bind.InputScalar(label, ImGuiDataType.U16, v, step, step_fast, format, flags);
        }
        if (v instanceof Int32Array) {
            return bind.InputScalar(label, ImGuiDataType.S32, v, step, step_fast, format, flags);
        }
        if (v instanceof Uint32Array) {
            return bind.InputScalar(label, ImGuiDataType.U32, v, step, step_fast, format, flags);
        }
        // if (v instanceof Int64Array) { return bind.InputScalar(label, ImGuiDataType.S64, v, step, step_fast, format, flags); }
        // if (v instanceof Uint64Array) { return bind.InputScalar(label, ImGuiDataType.U64, v, step, step_fast, format, flags); }
        if (v instanceof Float32Array) {
            return bind.InputScalar(label, ImGuiDataType.Float, v, step, step_fast, format, flags);
        }
        if (v instanceof Float64Array) {
            return bind.InputScalar(label, ImGuiDataType.Double, v, step, step_fast, format, flags);
        }
        throw new Error();
    }
    exports_1("InputScalar", InputScalar);
    // Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little color square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
    // - Note that in C++ a 'float v[X]' function argument is the _same_ as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible.
    // - You can pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
    // IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
    // IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0, 0)); // display a color square/button, hover for details, return true when pressed.
    // IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                     // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
    function ColorEdit3(label, col, flags = 0) {
        const _col = import_Color3(col);
        const ret = bind.ColorEdit3(label, _col, flags);
        export_Color3(_col, col);
        return ret;
    }
    exports_1("ColorEdit3", ColorEdit3);
    function ColorEdit4(label, col, flags = 0) {
        const _col = import_Color4(col);
        const ret = bind.ColorEdit4(label, _col, flags);
        export_Color4(_col, col);
        return ret;
    }
    exports_1("ColorEdit4", ColorEdit4);
    function ColorPicker3(label, col, flags = 0) {
        const _col = import_Color3(col);
        const ret = bind.ColorPicker3(label, _col, flags);
        export_Color3(_col, col);
        return ret;
    }
    exports_1("ColorPicker3", ColorPicker3);
    function ColorPicker4(label, col, flags = 0, ref_col = null) {
        const _col = import_Color4(col);
        const _ref_col = ref_col ? import_Color4(ref_col) : null;
        const ret = bind.ColorPicker4(label, _col, flags, _ref_col);
        export_Color4(_col, col);
        if (_ref_col && ref_col) {
            export_Color4(_ref_col, ref_col);
        }
        return ret;
    }
    exports_1("ColorPicker4", ColorPicker4);
    function ColorButton(desc_id, col, flags = 0, size = ImVec2.ZERO) {
        return bind.ColorButton(desc_id, col, flags, size);
    }
    exports_1("ColorButton", ColorButton);
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
    function TreePop() { bind.TreePop(); }
    exports_1("TreePop", TreePop);
    function GetTreeNodeToLabelSpacing() { return bind.GetTreeNodeToLabelSpacing(); }
    exports_1("GetTreeNodeToLabelSpacing", GetTreeNodeToLabelSpacing);
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
    function SetNextItemOpen(is_open, cond = 0) {
        bind.SetNextItemOpen(is_open, cond);
    }
    exports_1("SetNextItemOpen", SetNextItemOpen);
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
    // Widgets: List Boxes
    // - FIXME: To be consistent with all the newer API, ListBoxHeader/ListBoxFooter should in reality be called BeginListBox/EndListBox. Will rename them.
    // IMGUI_API bool          BeginListBox(const char* label, const ImVec2& size = ImVec2(0, 0)); // open a framed scrolling region
    // IMGUI_API void          EndListBox();                                                       // only call EndListBox() if BeginListBox() returned true!
    // IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const items[], int items_count, int height_in_items = -1);
    // IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
    function BeginListBox(label, size = new ImVec2(0, 0)) {
        return bind.BeginListBox(label, size);
    }
    exports_1("BeginListBox", BeginListBox);
    function EndListBox() { bind.EndListBox(); }
    exports_1("EndListBox", EndListBox);
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
    // Widgets: Menus
    // - Use BeginMenuBar() on a window ImGuiWindowFlags_MenuBar to append to its menu bar.
    // - Use BeginMainMenuBar() to create a menu bar at the top of the screen and append to it.
    // - Use BeginMenu() to create a menu. You can call BeginMenu() multiple time with the same identifier to append more items to it.
    // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window).
    // IMGUI_API void          EndMenuBar();                                                       // only call EndMenuBar() if BeginMenuBar() returns true!
    // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar.
    // IMGUI_API void          EndMainMenuBar();                                                   // only call EndMainMenuBar() if BeginMainMenuBar() returns true!
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    // IMGUI_API void          EndMenu();                                                          // only call EndMenu() if BeginMenu() returns true!
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
    function BeginMenuBar() { return bind.BeginMenuBar(); }
    exports_1("BeginMenuBar", BeginMenuBar);
    function EndMenuBar() { bind.EndMenuBar(); }
    exports_1("EndMenuBar", EndMenuBar);
    function BeginMainMenuBar() { return bind.BeginMainMenuBar(); }
    exports_1("BeginMainMenuBar", BeginMainMenuBar);
    function EndMainMenuBar() { bind.EndMainMenuBar(); }
    exports_1("EndMainMenuBar", EndMainMenuBar);
    function BeginMenu(label, enabled = true) { return bind.BeginMenu(label, enabled); }
    exports_1("BeginMenu", BeginMenu);
    function EndMenu() { bind.EndMenu(); }
    exports_1("EndMenu", EndMenu);
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
    // Tooltips
    // - Tooltip are windows following the mouse. They do not take focus away.
    // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of items).
    // IMGUI_API void          EndTooltip();
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set a text-only tooltip, typically use with ImGui::IsItemHovered(). override any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    function BeginTooltip() { bind.BeginTooltip(); }
    exports_1("BeginTooltip", BeginTooltip);
    function EndTooltip() { bind.EndTooltip(); }
    exports_1("EndTooltip", EndTooltip);
    function SetTooltip(fmt) { bind.SetTooltip(fmt); }
    exports_1("SetTooltip", SetTooltip);
    // Popups, Modals
    //  - They block normal mouse hovering detection (and therefore most mouse interactions) behind them.
    //  - If not modal: they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
    //  - Their visibility state (~bool) is held internally instead of being held by the programmer as we are used to with regular Begin*() calls.
    //  - The 3 properties above are related: we need to retain popup visibility state in the library because popups may be closed as any time.
    //  - You can bypass the hovering restriction by using ImGuiHoveredFlags_AllowWhenBlockedByPopup when calling IsItemHovered() or IsWindowHovered().
    //  - IMPORTANT: Popup identifiers are relative to the current ID stack, so OpenPopup and BeginPopup generally needs to be at the same level of the stack.
    //    This is sometimes leading to confusing mistakes. May rework this in the future.
    // Popups: begin/end functions
    //  - BeginPopup(): query popup state, if open start appending into the window. Call EndPopup() afterwards. ImGuiWindowFlags are forwarded to the window.
    //  - BeginPopupModal(): block every interactions behind the window, cannot be closed by user, add a dimming background, has a title bar.
    // IMGUI_API bool          BeginPopup(const char* str_id, ImGuiWindowFlags flags = 0);                         // return true if the popup is open, and you can start outputting to it.
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0); // return true if the modal is open, and you can start outputting to it.
    // IMGUI_API void          EndPopup();                                                                         // only call EndPopup() if BeginPopupXXX() returns true!
    function BeginPopup(str_id, flags = 0) { return bind.BeginPopup(str_id, flags); }
    exports_1("BeginPopup", BeginPopup);
    function BeginPopupModal(str_id, p_open = null, flags = 0) {
        if (Array.isArray(p_open)) {
            return bind.BeginPopupModal(str_id, p_open, flags);
        }
        else if (typeof (p_open) === "function") {
            const _p_open = [p_open()];
            const ret = bind.BeginPopupModal(str_id, _p_open, flags);
            p_open(_p_open[0]);
            return ret;
        }
        else {
            return bind.BeginPopupModal(str_id, null, flags);
        }
    }
    exports_1("BeginPopupModal", BeginPopupModal);
    function EndPopup() { bind.EndPopup(); }
    exports_1("EndPopup", EndPopup);
    // Popups: open/close functions
    //  - OpenPopup(): set popup state to open. ImGuiPopupFlags are available for opening options.
    //  - If not modal: they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
    //  - CloseCurrentPopup(): use inside the BeginPopup()/EndPopup() scope to close manually.
    //  - CloseCurrentPopup() is called by default by Selectable()/MenuItem() when activated (FIXME: need some options).
    //  - Use ImGuiPopupFlags_NoOpenOverExistingPopup to avoid opening a popup if there's already one at the same level. This is equivalent to e.g. testing for !IsAnyPopupOpen() prior to OpenPopup().
    // IMGUI_API void          OpenPopup(const char* str_id, ImGuiPopupFlags popup_flags = 0);                     // call to mark popup as open (don't call every frame!).
    // IMGUI_API void          OpenPopupOnItemClick(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);   // helper to open popup when clicked on last item. return true when just opened. (note: actually triggers on the mouse _released_ event to be consistent with popup behaviors)
    // IMGUI_API void          CloseCurrentPopup();                                                                // manually close the popup we have begin-ed into.
    function OpenPopup(str_id, popup_flags = 0) { bind.OpenPopup(str_id, popup_flags); }
    exports_1("OpenPopup", OpenPopup);
    function OpenPopupOnItemClick(str_id = null, popup_flags = 1) { bind.OpenPopupOnItemClick(str_id, popup_flags); }
    exports_1("OpenPopupOnItemClick", OpenPopupOnItemClick);
    function CloseCurrentPopup() { bind.CloseCurrentPopup(); }
    exports_1("CloseCurrentPopup", CloseCurrentPopup);
    // Popups: open+begin combined functions helpers
    //  - Helpers to do OpenPopup+BeginPopup where the Open action is triggered by e.g. hovering an item and right-clicking.
    //  - They are convenient to easily create context menus, hence the name.
    //  - IMPORTANT: Notice that BeginPopupContextXXX takes ImGuiPopupFlags just like OpenPopup() and unlike BeginPopup(). For full consistency, we may add ImGuiWindowFlags to the BeginPopupContextXXX functions in the future.
    //  - IMPORTANT: we exceptionally default their flags to 1 (== ImGuiPopupFlags_MouseButtonRight) for backward compatibility with older API taking 'int mouse_button = 1' parameter, so if you add other flags remember to re-add the ImGuiPopupFlags_MouseButtonRight.
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);  // open+begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);// open+begin popup when clicked on current window.
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);  // open+begin popup when clicked in void (where there are no windows).
    function BeginPopupContextItem(str_id = null, popup_flags = 1) { return bind.BeginPopupContextItem(str_id, popup_flags); }
    exports_1("BeginPopupContextItem", BeginPopupContextItem);
    function BeginPopupContextWindow(str_id = null, popup_flags = 1) { return bind.BeginPopupContextWindow(str_id, popup_flags); }
    exports_1("BeginPopupContextWindow", BeginPopupContextWindow);
    function BeginPopupContextVoid(str_id = null, popup_flags = 1) { return bind.BeginPopupContextVoid(str_id, popup_flags); }
    exports_1("BeginPopupContextVoid", BeginPopupContextVoid);
    // Popups: test function
    //  - IsPopupOpen(): return true if the popup is open at the current BeginPopup() level of the popup stack.
    //  - IsPopupOpen() with ImGuiPopupFlags_AnyPopupId: return true if any popup is open at the current BeginPopup() level of the popup stack.
    //  - IsPopupOpen() with ImGuiPopupFlags_AnyPopupId + ImGuiPopupFlags_AnyPopupLevel: return true if any popup is open.
    // IMGUI_API bool          IsPopupOpen(const char* str_id, ImGuiPopupFlags flags = 0);                         // return true if the popup is open.
    function IsPopupOpen(str_id, flags = 0) { return bind.IsPopupOpen(str_id, flags); }
    exports_1("IsPopupOpen", IsPopupOpen);
    // Tables
    // [BETA API] API may evolve slightly! If you use this, please update to the next version when it comes out!
    // - Full-featured replacement for old Columns API.
    // - See Demo->Tables for demo code.
    // - See top of imgui_tables.cpp for general commentary.
    // - See ImGuiTableFlags_ and ImGuiTableColumnFlags_ enums for a description of available flags.
    // The typical call flow is:
    // - 1. Call BeginTable().
    // - 2. Optionally call TableSetupColumn() to submit column name/flags/defaults.
    // - 3. Optionally call TableSetupScrollFreeze() to request scroll freezing of columns/rows.
    // - 4. Optionally call TableHeadersRow() to submit a header row. Names are pulled from TableSetupColumn() data.
    // - 5. Populate contents:
    //    - In most situations you can use TableNextRow() + TableSetColumnIndex(N) to start appending into a column.
    //    - If you are using tables as a sort of grid, where every columns is holding the same type of contents,
    //      you may prefer using TableNextColumn() instead of TableNextRow() + TableSetColumnIndex().
    //      TableNextColumn() will automatically wrap-around into the next row if needed.
    //    - IMPORTANT: Comparatively to the old Columns() API, we need to call TableNextColumn() for the first column!
    //    - Summary of possible call flow:
    //        --------------------------------------------------------------------------------------------------------
    //        TableNextRow() -> TableSetColumnIndex(0) -> Text("Hello 0") -> TableSetColumnIndex(1) -> Text("Hello 1")  // OK
    //        TableNextRow() -> TableNextColumn()      -> Text("Hello 0") -> TableNextColumn()      -> Text("Hello 1")  // OK
    //                          TableNextColumn()      -> Text("Hello 0") -> TableNextColumn()      -> Text("Hello 1")  // OK: TableNextColumn() automatically gets to next row!
    //        TableNextRow()                           -> Text("Hello 0")                                               // Not OK! Missing TableSetColumnIndex() or TableNextColumn()! Text will not appear!
    //        --------------------------------------------------------------------------------------------------------
    // - 5. Call EndTable()
    // IMGUI_API bool          BeginTable(const char* str_id, int column, ImGuiTableFlags flags = 0, const ImVec2& outer_size = ImVec2(0.0f, 0.0f), float inner_width = 0.0f);
    // IMGUI_API void          EndTable();                                 // only call EndTable() if BeginTable() returns true!
    // IMGUI_API void          TableNextRow(ImGuiTableRowFlags row_flags = 0, float min_row_height = 0.0f); // append into the first cell of a new row.
    // IMGUI_API bool          TableNextColumn();                          // append into the next column (or first column of next row if currently in last column). Return true when column is visible.
    // IMGUI_API bool          TableSetColumnIndex(int column_n);          // append into the specified column. Return true when column is visible.
    function BeginTable(str_id, column, flags = 0, outer_size = ImVec2.ZERO, inner_width = 0.0) { return bind.BeginTable(str_id, column, flags, outer_size, inner_width); }
    exports_1("BeginTable", BeginTable);
    function EndTable() { bind.EndTable(); }
    exports_1("EndTable", EndTable);
    function TableNextRow(row_flags = 0, min_row_height = 0.0) { bind.TableNextRow(row_flags, min_row_height); }
    exports_1("TableNextRow", TableNextRow);
    function TableNextColumn() { return bind.TableNextColumn(); }
    exports_1("TableNextColumn", TableNextColumn);
    function TableSetColumnIndex(column_n) { return bind.TableSetColumnIndex(column_n); }
    exports_1("TableSetColumnIndex", TableSetColumnIndex);
    // Tables: Headers & Columns declaration
    // - Use TableSetupColumn() to specify label, resizing policy, default width/weight, id, various other flags etc.
    // - Use TableHeadersRow() to create a header row and automatically submit a TableHeader() for each column.
    //   Headers are required to perform: reordering, sorting, and opening the context menu.
    //   The context menu can also be made available in columns body using ImGuiTableFlags_ContextMenuInBody.
    // - You may manually submit headers using TableNextRow() + TableHeader() calls, but this is only useful in
    //   some advanced use cases (e.g. adding custom widgets in header row).
    // - Use TableSetupScrollFreeze() to lock columns/rows so they stay visible when scrolled.
    // IMGUI_API void          TableSetupColumn(const char* label, ImGuiTableColumnFlags flags = 0, float init_width_or_weight = 0.0f, ImU32 user_id = 0);
    // IMGUI_API void          TableSetupScrollFreeze(int cols, int rows); // lock columns/rows so they stay visible when scrolled.
    // IMGUI_API void          TableHeadersRow();                          // submit all headers cells based on data provided to TableSetupColumn() + submit context menu
    // IMGUI_API void          TableHeader(const char* label);             // submit one header cell manually (rarely used)
    function TableSetupColumn(label, flags = 0, init_width_or_weight = 0.0, user_id = 0) { bind.TableSetupColumn(label, flags, init_width_or_weight, user_id); }
    exports_1("TableSetupColumn", TableSetupColumn);
    function TableSetupScrollFreeze(cols, rows) { bind.TableSetupScrollFreeze(cols, rows); }
    exports_1("TableSetupScrollFreeze", TableSetupScrollFreeze);
    function TableHeadersRow() { bind.TableHeadersRow(); }
    exports_1("TableHeadersRow", TableHeadersRow);
    function TableHeader(label) { bind.TableHeader(label); }
    exports_1("TableHeader", TableHeader);
    // Tables: Sorting
    // - Call TableGetSortSpecs() to retrieve latest sort specs for the table. NULL when not sorting.
    // - When 'SpecsDirty == true' you should sort your data. It will be true when sorting specs have changed
    //   since last call, or the first time. Make sure to set 'SpecsDirty = false' after sorting, else you may
    //   wastefully sort your data every frame!
    // - Lifetime: don't hold on this pointer over multiple frames or past any subsequent call to BeginTable().
    // IMGUI_API ImGuiTableSortSpecs* TableGetSortSpecs();                        // get latest sort specs for the table (NULL if not sorting).
    function TableGetSortSpecs() {
        const sort_specs = bind.TableGetSortSpecs();
        return (sort_specs === null) ? null : new ImGuiTableSortSpecs(sort_specs);
    }
    exports_1("TableGetSortSpecs", TableGetSortSpecs);
    // Tables: Miscellaneous functions
    // - Functions args 'int column_n' treat the default value of -1 as the same as passing the current column index.
    // IMGUI_API int                   TableGetColumnCount();                      // return number of columns (value passed to BeginTable)
    // IMGUI_API int                   TableGetColumnIndex();                      // return current column index.
    // IMGUI_API int                   TableGetRowIndex();                         // return current row index.
    // IMGUI_API const char*           TableGetColumnName(int column_n = -1);      // return "" if column didn't have a name declared by TableSetupColumn(). Pass -1 to use current column.
    // IMGUI_API ImGuiTableColumnFlags TableGetColumnFlags(int column_n = -1);     // return column flags so you can query their Enabled/Visible/Sorted/Hovered status flags. Pass -1 to use current column.
    // IMGUI_API void                  TableSetColumnEnabled(int column_n, bool v);// change user accessible enabled/disabled state of a column. Set to false to hide the column. User can use the context menu to change this themselves (right-click in headers, or right-click in columns body with ImGuiTableFlags_ContextMenuInBody)
    // IMGUI_API void                  TableSetBgColor(ImGuiTableBgTarget target, ImU32 color, int column_n = -1);  // change the color of a cell, row, or column. See ImGuiTableBgTarget_ flags for details.
    function TableGetColumnCount() { return bind.TableGetColumnCount(); }
    exports_1("TableGetColumnCount", TableGetColumnCount);
    function TableGetColumnIndex() { return bind.TableGetColumnIndex(); }
    exports_1("TableGetColumnIndex", TableGetColumnIndex);
    function TableGetRowIndex() { return bind.TableGetRowIndex(); }
    exports_1("TableGetRowIndex", TableGetRowIndex);
    function TableGetColumnName(column_n = -1) { return bind.TableGetColumnName(column_n); }
    exports_1("TableGetColumnName", TableGetColumnName);
    function TableGetColumnFlags(column_n = -1) { return bind.TableGetColumnFlags(column_n); }
    exports_1("TableGetColumnFlags", TableGetColumnFlags);
    function TableSetColumnEnabled(column_n, v) { bind.TableSetColumnEnabled(column_n, v); }
    exports_1("TableSetColumnEnabled", TableSetColumnEnabled);
    function TableSetBgColor(target, color, column_n = -1) { bind.TableSetBgColor(target, color, column_n); }
    exports_1("TableSetBgColor", TableSetBgColor);
    // Legacy Columns API (2020: prefer using Tables!)
    // - You can also use SameLine(pos_x) to mimic simplified columns.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
    // IMGUI_API int           GetColumnIndex();                                                   // get current column index
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
    // IMGUI_API int           GetColumnsCount();
    function Columns(count = 1, id = null, border = true) { bind.Columns(count, id, border); }
    exports_1("Columns", Columns);
    function NextColumn() { bind.NextColumn(); }
    exports_1("NextColumn", NextColumn);
    function GetColumnIndex() { return bind.GetColumnIndex(); }
    exports_1("GetColumnIndex", GetColumnIndex);
    function GetColumnWidth(column_index = -1) { return bind.GetColumnWidth(column_index); }
    exports_1("GetColumnWidth", GetColumnWidth);
    function SetColumnWidth(column_index, width) { bind.SetColumnWidth(column_index, width); }
    exports_1("SetColumnWidth", SetColumnWidth);
    function GetColumnOffset(column_index = -1) { return bind.GetColumnOffset(column_index); }
    exports_1("GetColumnOffset", GetColumnOffset);
    function SetColumnOffset(column_index, offset_x) { bind.SetColumnOffset(column_index, offset_x); }
    exports_1("SetColumnOffset", SetColumnOffset);
    function GetColumnsCount() { return bind.GetColumnsCount(); }
    exports_1("GetColumnsCount", GetColumnsCount);
    // Tab Bars, Tabs
    // IMGUI_API bool          BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0);        // create and append into a TabBar
    // IMGUI_API void          EndTabBar();                                                        // only call EndTabBar() if BeginTabBar() returns true!
    // IMGUI_API bool          BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0); // create a Tab. Returns true if the Tab is selected.
    // IMGUI_API void          EndTabItem();                                                       // only call EndTabItem() if BeginTabItem() returns true!
    // IMGUI_API bool          TabItemButton(const char* label, ImGuiTabItemFlags flags = 0);      // create a Tab behaving like a button. return true when clicked. cannot be selected in the tab bar.
    // IMGUI_API void          SetTabItemClosed(const char* tab_or_docked_window_label);           // notify TabBar or Docking system of a closed tab/window ahead (useful to reduce visual flicker on reorderable tab bars). For tab-bar: call after BeginTabBar() and before Tab submissions. Otherwise call with a window name.
    function BeginTabBar(str_id, flags = 0) { return bind.BeginTabBar(str_id, flags); }
    exports_1("BeginTabBar", BeginTabBar);
    function EndTabBar() { bind.EndTabBar(); }
    exports_1("EndTabBar", EndTabBar);
    function BeginTabItem(label, p_open = null, flags = 0) {
        if (p_open === null) {
            return bind.BeginTabItem(label, null, flags);
        }
        else if (Array.isArray(p_open)) {
            return bind.BeginTabItem(label, p_open, flags);
        }
        else {
            const ref_open = [p_open()];
            const ret = bind.BeginTabItem(label, ref_open, flags);
            p_open(ref_open[0]);
            return ret;
        }
    }
    exports_1("BeginTabItem", BeginTabItem);
    function EndTabItem() { bind.EndTabItem(); }
    exports_1("EndTabItem", EndTabItem);
    function TabItemButton(label, flags = 0) { return bind.TabItemButton(label, flags); }
    exports_1("TabItemButton", TabItemButton);
    function SetTabItemClosed(tab_or_docked_window_label) { bind.SetTabItemClosed(tab_or_docked_window_label); }
    exports_1("SetTabItemClosed", SetTabItemClosed);
    // Logging/Capture
    // - All text output from the interface can be captured into tty/file/clipboard. By default, tree nodes are automatically opened during logging.
    // IMGUI_API void          LogToTTY(int auto_open_depth = -1);                                 // start logging to tty (stdout)
    // IMGUI_API void          LogToFile(int auto_open_depth = -1, const char* filename = NULL);   // start logging to file
    // IMGUI_API void          LogToClipboard(int auto_open_depth = -1);                           // start logging to OS clipboard
    // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
    // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    function LogToTTY(max_depth = -1) { bind.LogToTTY(max_depth); }
    exports_1("LogToTTY", LogToTTY);
    function LogToFile(max_depth = -1, filename = null) { bind.LogToFile(max_depth, filename); }
    exports_1("LogToFile", LogToFile);
    function LogToClipboard(max_depth = -1) { bind.LogToClipboard(max_depth); }
    exports_1("LogToClipboard", LogToClipboard);
    function LogFinish() { bind.LogFinish(); }
    exports_1("LogFinish", LogFinish);
    function LogButtons() { bind.LogButtons(); }
    exports_1("LogButtons", LogButtons);
    function LogText(fmt) { bind.LogText(fmt); }
    exports_1("LogText", LogText);
    function BeginDragDropSource(flags = 0) {
        return bind.BeginDragDropSource(flags);
    }
    exports_1("BeginDragDropSource", BeginDragDropSource);
    function SetDragDropPayload(type, data, cond = 0) {
        _ImGui_DragDropPayload_data[type] = data;
        return bind.SetDragDropPayload(type, data, 0, cond);
    }
    exports_1("SetDragDropPayload", SetDragDropPayload);
    function EndDragDropSource() {
        bind.EndDragDropSource();
    }
    exports_1("EndDragDropSource", EndDragDropSource);
    function BeginDragDropTarget() {
        return bind.BeginDragDropTarget();
    }
    exports_1("BeginDragDropTarget", BeginDragDropTarget);
    function AcceptDragDropPayload(type, flags = 0) {
        const data = _ImGui_DragDropPayload_data[type];
        return bind.AcceptDragDropPayload(type, flags) ? { Data: data } : null;
    }
    exports_1("AcceptDragDropPayload", AcceptDragDropPayload);
    function EndDragDropTarget() {
        bind.EndDragDropTarget();
    }
    exports_1("EndDragDropTarget", EndDragDropTarget);
    function GetDragDropPayload() {
        return bind.GetDragDropPayload();
    }
    exports_1("GetDragDropPayload", GetDragDropPayload);
    // Disabling [BETA API]
    // - Disable all user interactions and dim items visuals (applying style.DisabledAlpha over current colors)
    // - Those can be nested but it cannot be used to enable an already disabled section (a single BeginDisabled(true) in the stack is enough to keep everything disabled)
    // - BeginDisabled(false) essentially does nothing useful but is provided to facilitate use of boolean expressions. If you can avoid calling BeginDisabled(False)/EndDisabled() best to avoid it.
    // IMGUI_API void          BeginDisabled(bool disabled = true);
    // IMGUI_API void          EndDisabled();
    function BeginDisabled(disabled = true) { bind.BeginDisabled(disabled); }
    exports_1("BeginDisabled", BeginDisabled);
    function EndDisabled() { bind.EndDisabled(); }
    exports_1("EndDisabled", EndDisabled);
    // Clipping
    // - Mouse hovering is affected by ImGui::PushClipRect() calls, unlike direct calls to ImDrawList::PushClipRect() which are render only.
    // IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
    // IMGUI_API void          PopClipRect();
    function PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect) {
        bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    exports_1("PushClipRect", PushClipRect);
    function PopClipRect() {
        bind.PopClipRect();
    }
    exports_1("PopClipRect", PopClipRect);
    // Focus, Activation
    // - Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHereY()" when applicable to signify "this is the default item"
    // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window.
    // IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
    function SetItemDefaultFocus() { bind.SetItemDefaultFocus(); }
    exports_1("SetItemDefaultFocus", SetItemDefaultFocus);
    function SetKeyboardFocusHere(offset = 0) { bind.SetKeyboardFocusHere(offset); }
    exports_1("SetKeyboardFocusHere", SetKeyboardFocusHere);
    // Item/Widgets Utilities
    // - Most of the functions are referring to the last/previous item we submitted.
    // - See Demo Window under "Widgets->Querying Status" for an interactive visualization of most of those functions.
    // IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
    // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited. This will continuously return true while holding mouse button on an item. Items that don't interact will always return false)
    // IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
    // IMGUI_API bool          IsItemClicked(ImGuiMouseButton mouse_button = 0);                   // is the last item clicked? (e.g. button/node just clicked on) == IsMouseClicked(mouse_button) && IsItemHovered()
    // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (items may be out of sight because of clipping/scrolling)
    // IMGUI_API bool          IsItemEdited();                                                     // did the last item modify its underlying value this frame? or was pressed? This is generally the same as the "bool" return value of many widgets.
    // IMGUI_API bool          IsItemActivated();                                                  // was the last item just made active (item was previously inactive).
    // IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
    // IMGUI_API bool          IsItemDeactivatedAfterEdit();                                       // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
    // IMGUI_API bool          IsItemToggledOpen();                                                // was the last item open state toggled? set by TreeNode().
    // IMGUI_API bool          IsAnyItemHovered();                                                 // is any item hovered?
    // IMGUI_API bool          IsAnyItemActive();                                                  // is any item active?
    // IMGUI_API bool          IsAnyItemFocused();                                                 // is any item focused?
    // IMGUI_API ImVec2        GetItemRectMin();                                                   // get upper-left bounding rectangle of the last item (screen space)
    // IMGUI_API ImVec2        GetItemRectMax();                                                   // get lower-right bounding rectangle of the last item (screen space)
    // IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item
    // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
    function IsItemHovered(flags = 0) { return bind.IsItemHovered(flags); }
    exports_1("IsItemHovered", IsItemHovered);
    function IsItemActive() { return bind.IsItemActive(); }
    exports_1("IsItemActive", IsItemActive);
    function IsItemFocused() { return bind.IsItemFocused(); }
    exports_1("IsItemFocused", IsItemFocused);
    function IsItemClicked(mouse_button = 0) { return bind.IsItemClicked(mouse_button); }
    exports_1("IsItemClicked", IsItemClicked);
    function IsItemVisible() { return bind.IsItemVisible(); }
    exports_1("IsItemVisible", IsItemVisible);
    function IsItemEdited() { return bind.IsItemEdited(); }
    exports_1("IsItemEdited", IsItemEdited);
    function IsItemActivated() { return bind.IsItemActivated(); }
    exports_1("IsItemActivated", IsItemActivated);
    function IsItemDeactivated() { return bind.IsItemDeactivated(); }
    exports_1("IsItemDeactivated", IsItemDeactivated);
    function IsItemDeactivatedAfterEdit() { return bind.IsItemDeactivatedAfterEdit(); }
    exports_1("IsItemDeactivatedAfterEdit", IsItemDeactivatedAfterEdit);
    function IsItemToggledOpen() { return bind.IsItemToggledOpen(); }
    exports_1("IsItemToggledOpen", IsItemToggledOpen);
    function IsAnyItemHovered() { return bind.IsAnyItemHovered(); }
    exports_1("IsAnyItemHovered", IsAnyItemHovered);
    function IsAnyItemActive() { return bind.IsAnyItemActive(); }
    exports_1("IsAnyItemActive", IsAnyItemActive);
    function IsAnyItemFocused() { return bind.IsAnyItemFocused(); }
    exports_1("IsAnyItemFocused", IsAnyItemFocused);
    function GetItemRectMin(out = new ImVec2()) { return bind.GetItemRectMin(out); }
    exports_1("GetItemRectMin", GetItemRectMin);
    function GetItemRectMax(out = new ImVec2()) { return bind.GetItemRectMax(out); }
    exports_1("GetItemRectMax", GetItemRectMax);
    function GetItemRectSize(out = new ImVec2()) { return bind.GetItemRectSize(out); }
    exports_1("GetItemRectSize", GetItemRectSize);
    function SetItemAllowOverlap() { bind.SetItemAllowOverlap(); }
    exports_1("SetItemAllowOverlap", SetItemAllowOverlap);
    // Viewports
    // - Currently represents the Platform Window created by the application which is hosting our Dear ImGui windows.
    // - In 'docking' branch with multi-viewport enabled, we extend this concept to have multiple active viewports.
    // - In the future we will extend this concept further to also represent Platform Monitor and support a "no main platform window" operation mode.
    // IMGUI_API ImGuiViewport* GetMainViewport();                                                 // return primary/default viewport. This can never be NULL.
    function GetMainViewport() { return new ImGuiViewport(bind.GetMainViewport()); }
    exports_1("GetMainViewport", GetMainViewport);
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
    function GetTime() { return bind.GetTime(); }
    exports_1("GetTime", GetTime);
    function GetFrameCount() { return bind.GetFrameCount(); }
    exports_1("GetFrameCount", GetFrameCount);
    function GetBackgroundDrawList() {
        return new ImDrawList(bind.GetBackgroundDrawList());
    }
    exports_1("GetBackgroundDrawList", GetBackgroundDrawList);
    function GetForegroundDrawList() {
        return new ImDrawList(bind.GetForegroundDrawList());
    }
    exports_1("GetForegroundDrawList", GetForegroundDrawList);
    function GetDrawListSharedData() {
        return new ImDrawListSharedData(bind.GetDrawListSharedData());
    }
    exports_1("GetDrawListSharedData", GetDrawListSharedData);
    function GetStyleColorName(idx) { return bind.GetStyleColorName(idx); }
    exports_1("GetStyleColorName", GetStyleColorName);
    // IMGUI_API void          SetStateStorage(ImGuiStorage* tree);
    // IMGUI_API ImGuiStorage* GetStateStorage();
    // export function CalcListClipping(items_count: number, items_height: number, out_items_display_start: Bind.ImScalar<number>, out_items_display_end: Bind.ImScalar<number>): void {
    //     return bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
    // }
    function BeginChildFrame(id, size, flags = 0) { return bind.BeginChildFrame(id, size, flags); }
    exports_1("BeginChildFrame", BeginChildFrame);
    function EndChildFrame() { bind.EndChildFrame(); }
    exports_1("EndChildFrame", EndChildFrame);
    // Text Utilities
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    function CalcTextSize(text, text_end = null, hide_text_after_double_hash = false, wrap_width = -1, out = new ImVec2()) {
        return bind.CalcTextSize(text_end !== null ? text.substring(0, text_end) : text, hide_text_after_double_hash, wrap_width, out);
    }
    exports_1("CalcTextSize", CalcTextSize);
    // Color Utilities
    // IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
    // IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
    // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
    // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
    function ColorConvertU32ToFloat4(in_, out = new ImVec4()) { return bind.ColorConvertU32ToFloat4(in_, out); }
    exports_1("ColorConvertU32ToFloat4", ColorConvertU32ToFloat4);
    function ColorConvertFloat4ToU32(in_) { return bind.ColorConvertFloat4ToU32(in_); }
    exports_1("ColorConvertFloat4ToU32", ColorConvertFloat4ToU32);
    function ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v) { bind.ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v); }
    exports_1("ColorConvertRGBtoHSV", ColorConvertRGBtoHSV);
    function ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b) { bind.ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b); }
    exports_1("ColorConvertHSVtoRGB", ColorConvertHSVtoRGB);
    // Inputs Utilities: Keyboard
    // - For 'int user_key_index' you can use your own indices/enums according to how your backend/engine stored them in io.KeysDown[].
    // - We don't know the meaning of those value. You can use GetKeyIndex() to map a ImGuiKey_ value into the user index.
    // IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
    // IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index].
    // IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down)? if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
    // IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)?
    // IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
    // IMGUI_API void          CaptureKeyboardFromApp(bool want_capture_keyboard_value = true);    // attention: misleading name! manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application to handle). e.g. force capture keyboard when your widget is being hovered. This is equivalent to setting "io.WantCaptureKeyboard = want_capture_keyboard_value"; after the next NewFrame() call.
    function GetKeyIndex(imgui_key) { return bind.GetKeyIndex(imgui_key); }
    exports_1("GetKeyIndex", GetKeyIndex);
    function IsKeyDown(user_key_index) { return bind.IsKeyDown(user_key_index); }
    exports_1("IsKeyDown", IsKeyDown);
    function IsKeyPressed(user_key_index, repeat = true) { return bind.IsKeyPressed(user_key_index, repeat); }
    exports_1("IsKeyPressed", IsKeyPressed);
    function IsKeyReleased(user_key_index) { return bind.IsKeyReleased(user_key_index); }
    exports_1("IsKeyReleased", IsKeyReleased);
    function GetKeyPressedAmount(user_key_index, repeat_delay, rate) { return bind.GetKeyPressedAmount(user_key_index, repeat_delay, rate); }
    exports_1("GetKeyPressedAmount", GetKeyPressedAmount);
    function CaptureKeyboardFromApp(capture = true) { return bind.CaptureKeyboardFromApp(capture); }
    exports_1("CaptureKeyboardFromApp", CaptureKeyboardFromApp);
    // Inputs Utilities: Mouse
    // - To refer to a mouse button, you may use named enums in your code e.g. ImGuiMouseButton_Left, ImGuiMouseButton_Right.
    // - You can also use regular integer: it is forever guaranteed that 0=Left, 1=Right, 2=Middle.
    // - Dragging operations are only reported after mouse has moved a certain distance away from the initial clicking position (see 'lock_threshold' and 'io.MouseDraggingThreshold')
    // IMGUI_API bool          IsMouseDown(ImGuiMouseButton button);                               // is mouse button held?
    // IMGUI_API bool          IsMouseClicked(ImGuiMouseButton button, bool repeat = false);       // did mouse button clicked? (went from !Down to Down)
    // IMGUI_API bool          IsMouseReleased(ImGuiMouseButton button);                           // did mouse button released? (went from Down to !Down)
    // IMGUI_API bool          IsMouseDoubleClicked(ImGuiMouseButton button);                      // did mouse button double-clicked? (note that a double-click will also report IsMouseClicked() == true)
    // IMGUI_API int           GetMouseClickedCount(ImGuiMouseButton button);                      // return the number of successive mouse-clicks at the time where a click happen (otherwise 0).
    // IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);// is mouse hovering given bounding rect (in screen space). clipped by current clipping settings, but disregarding of other consideration of focus/window ordering/popup-block.
    // IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    // by convention we use (-FLT_MAX,-FLT_MAX) to denote that there is no mouse available
    // IMGUI_API bool          IsAnyMouseDown();                                                   // is any mouse button held?
    // IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
    // IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve mouse position at the time of opening popup we have BeginPopup() into (helper to avoid user backing that value themselves)
    // IMGUI_API bool          IsMouseDragging(ImGuiMouseButton button, float lock_threshold = -1.0f);         // is mouse dragging? (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)
    // IMGUI_API ImVec2        GetMouseDragDelta(ImGuiMouseButton button = 0, float lock_threshold = -1.0f);   // return the delta from the initial clicking position while the mouse button is pressed or was just released. This is locked and return 0.0f until the mouse moves past a distance threshold at least once (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)
    // IMGUI_API void          ResetMouseDragDelta(ImGuiMouseButton button = 0);                   //
    // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
    // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor cursor_type);                       // set desired cursor type
    // IMGUI_API void          CaptureMouseFromApp(bool want_capture_mouse_value = true);          // attention: misleading name! manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application to handle). This is equivalent to setting "io.WantCaptureMouse = want_capture_mouse_value;" after the next NewFrame() call.
    function IsMouseDown(button) { return bind.IsMouseDown(button); }
    exports_1("IsMouseDown", IsMouseDown);
    function IsMouseClicked(button, repeat = false) { return bind.IsMouseClicked(button, repeat); }
    exports_1("IsMouseClicked", IsMouseClicked);
    function IsMouseDoubleClicked(button) { return bind.IsMouseDoubleClicked(button); }
    exports_1("IsMouseDoubleClicked", IsMouseDoubleClicked);
    function GetMouseClickedCount(button) { return bind.GetMouseClickedCount(button); }
    exports_1("GetMouseClickedCount", GetMouseClickedCount);
    function IsMouseReleased(button) { return bind.IsMouseReleased(button); }
    exports_1("IsMouseReleased", IsMouseReleased);
    function IsMouseHoveringRect(r_min, r_max, clip = true) { return bind.IsMouseHoveringRect(r_min, r_max, clip); }
    exports_1("IsMouseHoveringRect", IsMouseHoveringRect);
    function IsMousePosValid(mouse_pos = null) { return bind.IsMousePosValid(mouse_pos); }
    exports_1("IsMousePosValid", IsMousePosValid);
    function IsAnyMouseDown() { return bind.IsAnyMouseDown(); }
    exports_1("IsAnyMouseDown", IsAnyMouseDown);
    function GetMousePos(out = new ImVec2()) { return bind.GetMousePos(out); }
    exports_1("GetMousePos", GetMousePos);
    function GetMousePosOnOpeningCurrentPopup(out = new ImVec2()) { return bind.GetMousePosOnOpeningCurrentPopup(out); }
    exports_1("GetMousePosOnOpeningCurrentPopup", GetMousePosOnOpeningCurrentPopup);
    function IsMouseDragging(button = 0, lock_threshold = -1.0) { return bind.IsMouseDragging(button, lock_threshold); }
    exports_1("IsMouseDragging", IsMouseDragging);
    function GetMouseDragDelta(button = 0, lock_threshold = -1.0, out = new ImVec2()) { return bind.GetMouseDragDelta(button, lock_threshold, out); }
    exports_1("GetMouseDragDelta", GetMouseDragDelta);
    function ResetMouseDragDelta(button = 0) { bind.ResetMouseDragDelta(button); }
    exports_1("ResetMouseDragDelta", ResetMouseDragDelta);
    function GetMouseCursor() { return bind.GetMouseCursor(); }
    exports_1("GetMouseCursor", GetMouseCursor);
    function SetMouseCursor(type) { bind.SetMouseCursor(type); }
    exports_1("SetMouseCursor", SetMouseCursor);
    function CaptureMouseFromApp(capture = true) { bind.CaptureMouseFromApp(capture); }
    exports_1("CaptureMouseFromApp", CaptureMouseFromApp);
    // Clipboard Utilities
    // - Also see the LogToClipboard() function to capture GUI into clipboard, or easily output text data to the clipboard.
    // IMGUI_API const char*   GetClipboardText();
    // IMGUI_API void          SetClipboardText(const char* text);
    function GetClipboardText() { return bind.GetClipboardText(); }
    exports_1("GetClipboardText", GetClipboardText);
    function SetClipboardText(text) { bind.SetClipboardText(text); }
    exports_1("SetClipboardText", SetClipboardText);
    // Settings/.Ini Utilities
    // - The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
    // - Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.
    // IMGUI_API void          LoadIniSettingsFromDisk(const char* ini_filename);                  // call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).
    // IMGUI_API void          LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0); // call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.
    // IMGUI_API void          SaveIniSettingsToDisk(const char* ini_filename);                    // this is automatically called (if io.IniFilename is not empty) a few seconds after any modification that should be reflected in the .ini file (and also by DestroyContext).
    // IMGUI_API const char*   SaveIniSettingsToMemory(size_t* out_ini_size = NULL);               // return a zero-terminated string with the .ini data which you can save by your own mean. call when io.WantSaveIniSettings is set, then save data by your own mean and clear io.WantSaveIniSettings.
    function LoadIniSettingsFromDisk(ini_filename) { throw new Error(); } // TODO
    exports_1("LoadIniSettingsFromDisk", LoadIniSettingsFromDisk);
    function LoadIniSettingsFromMemory(ini_data, ini_size = 0) { bind.LoadIniSettingsFromMemory(ini_data); }
    exports_1("LoadIniSettingsFromMemory", LoadIniSettingsFromMemory);
    function SaveIniSettingsToDisk(ini_filename) { throw new Error(); } // TODO
    exports_1("SaveIniSettingsToDisk", SaveIniSettingsToDisk);
    function SaveIniSettingsToMemory(out_ini_size = null) { return bind.SaveIniSettingsToMemory(); }
    exports_1("SaveIniSettingsToMemory", SaveIniSettingsToMemory);
    // Debug Utilities
    // IMGUI_API bool          DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert, size_t sz_drawidx); // This is called by IMGUI_CHECKVERSION() macro.
    function DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert, sz_draw_idx) {
        return bind.DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert, sz_draw_idx);
    }
    exports_1("DebugCheckVersionAndDataLayout", DebugCheckVersionAndDataLayout);
    // Memory Allocators
    // - All those functions are not reliant on the current context.
    // - If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again because we use global storage for those.
    // IMGUI_API void          SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void (*free_func)(void* ptr, void* user_data), void* user_data = NULL);
    // IMGUI_API void*         MemAlloc(size_t size);
    // IMGUI_API void          MemFree(void* ptr);
    function SetAllocatorFunctions(alloc_func, free_func, user_data = null) {
        bind.SetAllocatorFunctions(alloc_func, free_func, user_data);
    }
    exports_1("SetAllocatorFunctions", SetAllocatorFunctions);
    function MemAlloc(sz) { bind.MemAlloc(sz); }
    exports_1("MemAlloc", MemAlloc);
    function MemFree(ptr) { bind.MemFree(ptr); }
    exports_1("MemFree", MemFree);
    return {
        setters: [
            function (Bind_1) {
                Bind = Bind_1;
            },
            function (config_1) {
                config = config_1;
            }
        ],
        execute: function () {
            exports_1("Bind", Bind);
            exports_1("IMGUI_VERSION", IMGUI_VERSION = "1.86"); // bind.IMGUI_VERSION;
            exports_1("VERSION", IMGUI_VERSION);
            exports_1("IMGUI_VERSION_NUM", IMGUI_VERSION_NUM = 18600); // bind.IMGUI_VERSION_NUM;
            exports_1("VERSION_NUM", IMGUI_VERSION_NUM);
            exports_1("IMGUI_HAS_TABLE", IMGUI_HAS_TABLE = true);
            ImStringBuffer = class ImStringBuffer {
                constructor(size, buffer = "") {
                    this.size = size;
                    this.buffer = buffer;
                }
            };
            exports_1("ImStringBuffer", ImStringBuffer);
            exports_1("StringBuffer", ImStringBuffer);
            (function (ImGuiWindowFlags) {
                ImGuiWindowFlags[ImGuiWindowFlags["None"] = 0] = "None";
                ImGuiWindowFlags[ImGuiWindowFlags["NoTitleBar"] = 1] = "NoTitleBar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoResize"] = 2] = "NoResize";
                ImGuiWindowFlags[ImGuiWindowFlags["NoMove"] = 4] = "NoMove";
                ImGuiWindowFlags[ImGuiWindowFlags["NoScrollbar"] = 8] = "NoScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoScrollWithMouse"] = 16] = "NoScrollWithMouse";
                ImGuiWindowFlags[ImGuiWindowFlags["NoCollapse"] = 32] = "NoCollapse";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysAutoResize"] = 64] = "AlwaysAutoResize";
                ImGuiWindowFlags[ImGuiWindowFlags["NoBackground"] = 128] = "NoBackground";
                ImGuiWindowFlags[ImGuiWindowFlags["NoSavedSettings"] = 256] = "NoSavedSettings";
                ImGuiWindowFlags[ImGuiWindowFlags["NoMouseInputs"] = 512] = "NoMouseInputs";
                ImGuiWindowFlags[ImGuiWindowFlags["MenuBar"] = 1024] = "MenuBar";
                ImGuiWindowFlags[ImGuiWindowFlags["HorizontalScrollbar"] = 2048] = "HorizontalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["NoFocusOnAppearing"] = 4096] = "NoFocusOnAppearing";
                ImGuiWindowFlags[ImGuiWindowFlags["NoBringToFrontOnFocus"] = 8192] = "NoBringToFrontOnFocus";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysVerticalScrollbar"] = 16384] = "AlwaysVerticalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysHorizontalScrollbar"] = 32768] = "AlwaysHorizontalScrollbar";
                ImGuiWindowFlags[ImGuiWindowFlags["AlwaysUseWindowPadding"] = 65536] = "AlwaysUseWindowPadding";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNavInputs"] = 262144] = "NoNavInputs";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNavFocus"] = 524288] = "NoNavFocus";
                ImGuiWindowFlags[ImGuiWindowFlags["UnsavedDocument"] = 1048576] = "UnsavedDocument";
                ImGuiWindowFlags[ImGuiWindowFlags["NoNav"] = 786432] = "NoNav";
                ImGuiWindowFlags[ImGuiWindowFlags["NoDecoration"] = 43] = "NoDecoration";
                ImGuiWindowFlags[ImGuiWindowFlags["NoInputs"] = 786944] = "NoInputs";
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
                ImGuiInputTextFlags[ImGuiInputTextFlags["AlwaysOverwrite"] = 8192] = "AlwaysOverwrite";
                ImGuiInputTextFlags[ImGuiInputTextFlags["ReadOnly"] = 16384] = "ReadOnly";
                ImGuiInputTextFlags[ImGuiInputTextFlags["Password"] = 32768] = "Password";
                ImGuiInputTextFlags[ImGuiInputTextFlags["NoUndoRedo"] = 65536] = "NoUndoRedo";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CharsScientific"] = 131072] = "CharsScientific";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackResize"] = 262144] = "CallbackResize";
                ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackEdit"] = 524288] = "CallbackEdit";
                // [Internal]
                ImGuiInputTextFlags[ImGuiInputTextFlags["Multiline"] = 1048576] = "Multiline";
                ImGuiInputTextFlags[ImGuiInputTextFlags["NoMarkEdited"] = 2097152] = "NoMarkEdited";
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
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["SpanAvailWidth"] = 2048] = "SpanAvailWidth";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["SpanFullWidth"] = 4096] = "SpanFullWidth";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NavLeftJumpsBackHere"] = 8192] = "NavLeftJumpsBackHere";
                ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["CollapsingHeader"] = 26] = "CollapsingHeader";
            })(ImGuiTreeNodeFlags || (ImGuiTreeNodeFlags = {}));
            exports_1("ImGuiTreeNodeFlags", ImGuiTreeNodeFlags);
            exports_1("TreeNodeFlags", ImGuiTreeNodeFlags);
            (function (ImGuiPopupFlags) {
                ImGuiPopupFlags[ImGuiPopupFlags["None"] = 0] = "None";
                ImGuiPopupFlags[ImGuiPopupFlags["MouseButtonLeft"] = 0] = "MouseButtonLeft";
                ImGuiPopupFlags[ImGuiPopupFlags["MouseButtonRight"] = 1] = "MouseButtonRight";
                ImGuiPopupFlags[ImGuiPopupFlags["MouseButtonMiddle"] = 2] = "MouseButtonMiddle";
                ImGuiPopupFlags[ImGuiPopupFlags["MouseButtonMask_"] = 31] = "MouseButtonMask_";
                ImGuiPopupFlags[ImGuiPopupFlags["MouseButtonDefault_"] = 1] = "MouseButtonDefault_";
                ImGuiPopupFlags[ImGuiPopupFlags["NoOpenOverExistingPopup"] = 32] = "NoOpenOverExistingPopup";
                ImGuiPopupFlags[ImGuiPopupFlags["NoOpenOverItems"] = 64] = "NoOpenOverItems";
                ImGuiPopupFlags[ImGuiPopupFlags["AnyPopupId"] = 128] = "AnyPopupId";
                ImGuiPopupFlags[ImGuiPopupFlags["AnyPopupLevel"] = 256] = "AnyPopupLevel";
                ImGuiPopupFlags[ImGuiPopupFlags["AnyPopup"] = 384] = "AnyPopup";
            })(ImGuiPopupFlags || (ImGuiPopupFlags = {}));
            exports_1("ImGuiPopupFlags", ImGuiPopupFlags);
            exports_1("PopupFlags", ImGuiPopupFlags);
            (function (ImGuiSelectableFlags) {
                ImGuiSelectableFlags[ImGuiSelectableFlags["None"] = 0] = "None";
                ImGuiSelectableFlags[ImGuiSelectableFlags["DontClosePopups"] = 1] = "DontClosePopups";
                ImGuiSelectableFlags[ImGuiSelectableFlags["SpanAllColumns"] = 2] = "SpanAllColumns";
                ImGuiSelectableFlags[ImGuiSelectableFlags["AllowDoubleClick"] = 4] = "AllowDoubleClick";
                ImGuiSelectableFlags[ImGuiSelectableFlags["Disabled"] = 8] = "Disabled";
                ImGuiSelectableFlags[ImGuiSelectableFlags["AllowItemOverlap"] = 16] = "AllowItemOverlap"; // (WIP) Hit testing to allow subsequent widgets to overlap this one
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
            (function (ImGuiTabBarFlags) {
                ImGuiTabBarFlags[ImGuiTabBarFlags["None"] = 0] = "None";
                ImGuiTabBarFlags[ImGuiTabBarFlags["Reorderable"] = 1] = "Reorderable";
                ImGuiTabBarFlags[ImGuiTabBarFlags["AutoSelectNewTabs"] = 2] = "AutoSelectNewTabs";
                ImGuiTabBarFlags[ImGuiTabBarFlags["TabListPopupButton"] = 4] = "TabListPopupButton";
                ImGuiTabBarFlags[ImGuiTabBarFlags["NoCloseWithMiddleMouseButton"] = 8] = "NoCloseWithMiddleMouseButton";
                ImGuiTabBarFlags[ImGuiTabBarFlags["NoTabListScrollingButtons"] = 16] = "NoTabListScrollingButtons";
                ImGuiTabBarFlags[ImGuiTabBarFlags["NoTooltip"] = 32] = "NoTooltip";
                ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyResizeDown"] = 64] = "FittingPolicyResizeDown";
                ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyScroll"] = 128] = "FittingPolicyScroll";
                ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyMask_"] = 192] = "FittingPolicyMask_";
                ImGuiTabBarFlags[ImGuiTabBarFlags["FittingPolicyDefault_"] = 64] = "FittingPolicyDefault_";
            })(ImGuiTabBarFlags || (ImGuiTabBarFlags = {}));
            exports_1("ImGuiTabBarFlags", ImGuiTabBarFlags);
            exports_1("TabBarFlags", ImGuiTabBarFlags);
            ;
            (function (ImGuiTabItemFlags) {
                ImGuiTabItemFlags[ImGuiTabItemFlags["None"] = 0] = "None";
                ImGuiTabItemFlags[ImGuiTabItemFlags["UnsavedDocument"] = 1] = "UnsavedDocument";
                ImGuiTabItemFlags[ImGuiTabItemFlags["SetSelected"] = 2] = "SetSelected";
                ImGuiTabItemFlags[ImGuiTabItemFlags["NoCloseWithMiddleMouseButton"] = 4] = "NoCloseWithMiddleMouseButton";
                ImGuiTabItemFlags[ImGuiTabItemFlags["NoPushId"] = 8] = "NoPushId";
                ImGuiTabItemFlags[ImGuiTabItemFlags["NoTooltip"] = 16] = "NoTooltip";
                ImGuiTabItemFlags[ImGuiTabItemFlags["NoReorder"] = 32] = "NoReorder";
                ImGuiTabItemFlags[ImGuiTabItemFlags["Leading"] = 64] = "Leading";
                ImGuiTabItemFlags[ImGuiTabItemFlags["Trailing"] = 128] = "Trailing"; // Enforce the tab position to the right of the tab bar (before the scrolling buttons)
            })(ImGuiTabItemFlags || (ImGuiTabItemFlags = {}));
            exports_1("ImGuiTabItemFlags", ImGuiTabItemFlags);
            exports_1("TabItemFlags", ImGuiTabItemFlags);
            (function (ImGuiTableFlags) {
                // Features
                ImGuiTableFlags[ImGuiTableFlags["None"] = 0] = "None";
                ImGuiTableFlags[ImGuiTableFlags["Resizable"] = 1] = "Resizable";
                ImGuiTableFlags[ImGuiTableFlags["Reorderable"] = 2] = "Reorderable";
                ImGuiTableFlags[ImGuiTableFlags["Hideable"] = 4] = "Hideable";
                ImGuiTableFlags[ImGuiTableFlags["Sortable"] = 8] = "Sortable";
                ImGuiTableFlags[ImGuiTableFlags["NoSavedSettings"] = 16] = "NoSavedSettings";
                ImGuiTableFlags[ImGuiTableFlags["ContextMenuInBody"] = 32] = "ContextMenuInBody";
                // Decorations
                ImGuiTableFlags[ImGuiTableFlags["RowBg"] = 64] = "RowBg";
                ImGuiTableFlags[ImGuiTableFlags["BordersInnerH"] = 128] = "BordersInnerH";
                ImGuiTableFlags[ImGuiTableFlags["BordersOuterH"] = 256] = "BordersOuterH";
                ImGuiTableFlags[ImGuiTableFlags["BordersInnerV"] = 512] = "BordersInnerV";
                ImGuiTableFlags[ImGuiTableFlags["BordersOuterV"] = 1024] = "BordersOuterV";
                ImGuiTableFlags[ImGuiTableFlags["BordersH"] = 384] = "BordersH";
                ImGuiTableFlags[ImGuiTableFlags["BordersV"] = 1536] = "BordersV";
                ImGuiTableFlags[ImGuiTableFlags["BordersInner"] = 640] = "BordersInner";
                ImGuiTableFlags[ImGuiTableFlags["BordersOuter"] = 1280] = "BordersOuter";
                ImGuiTableFlags[ImGuiTableFlags["Borders"] = 1920] = "Borders";
                ImGuiTableFlags[ImGuiTableFlags["NoBordersInBody"] = 2048] = "NoBordersInBody";
                ImGuiTableFlags[ImGuiTableFlags["NoBordersInBodyUntilResize"] = 4096] = "NoBordersInBodyUntilResize";
                // Sizing Policy (read above for defaults)
                ImGuiTableFlags[ImGuiTableFlags["SizingFixedFit"] = 8192] = "SizingFixedFit";
                ImGuiTableFlags[ImGuiTableFlags["SizingFixedSame"] = 16384] = "SizingFixedSame";
                ImGuiTableFlags[ImGuiTableFlags["SizingStretchProp"] = 24576] = "SizingStretchProp";
                ImGuiTableFlags[ImGuiTableFlags["SizingStretchSame"] = 32768] = "SizingStretchSame";
                // Sizing Extra Options
                ImGuiTableFlags[ImGuiTableFlags["NoHostExtendX"] = 65536] = "NoHostExtendX";
                ImGuiTableFlags[ImGuiTableFlags["NoHostExtendY"] = 131072] = "NoHostExtendY";
                ImGuiTableFlags[ImGuiTableFlags["NoKeepColumnsVisible"] = 262144] = "NoKeepColumnsVisible";
                ImGuiTableFlags[ImGuiTableFlags["PreciseWidths"] = 524288] = "PreciseWidths";
                // Clipping
                ImGuiTableFlags[ImGuiTableFlags["NoClip"] = 1048576] = "NoClip";
                // Padding
                ImGuiTableFlags[ImGuiTableFlags["PadOuterX"] = 2097152] = "PadOuterX";
                ImGuiTableFlags[ImGuiTableFlags["NoPadOuterX"] = 4194304] = "NoPadOuterX";
                ImGuiTableFlags[ImGuiTableFlags["NoPadInnerX"] = 8388608] = "NoPadInnerX";
                // Scrolling
                ImGuiTableFlags[ImGuiTableFlags["ScrollX"] = 16777216] = "ScrollX";
                ImGuiTableFlags[ImGuiTableFlags["ScrollY"] = 33554432] = "ScrollY";
                // Sorting
                ImGuiTableFlags[ImGuiTableFlags["SortMulti"] = 67108864] = "SortMulti";
                ImGuiTableFlags[ImGuiTableFlags["SortTristate"] = 134217728] = "SortTristate";
                // [Internal] Combinations and masks
                ImGuiTableFlags[ImGuiTableFlags["SizingMask_"] = 57344] = "SizingMask_";
            })(ImGuiTableFlags || (ImGuiTableFlags = {}));
            exports_1("ImGuiTableFlags", ImGuiTableFlags);
            exports_1("TableFlags", ImGuiTableFlags);
            (function (ImGuiTableColumnFlags) {
                // Input configuration flags
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["None"] = 0] = "None";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["Disabled"] = 1] = "Disabled";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["DefaultHide"] = 2] = "DefaultHide";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["DefaultSort"] = 4] = "DefaultSort";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["WidthStretch"] = 8] = "WidthStretch";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["WidthFixed"] = 16] = "WidthFixed";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoResize"] = 32] = "NoResize";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoReorder"] = 64] = "NoReorder";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoHide"] = 128] = "NoHide";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoClip"] = 256] = "NoClip";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoSort"] = 512] = "NoSort";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoSortAscending"] = 1024] = "NoSortAscending";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoSortDescending"] = 2048] = "NoSortDescending";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoHeaderLabel"] = 4096] = "NoHeaderLabel";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoHeaderWidth"] = 8192] = "NoHeaderWidth";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["PreferSortAscending"] = 16384] = "PreferSortAscending";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["PreferSortDescending"] = 32768] = "PreferSortDescending";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IndentEnable"] = 65536] = "IndentEnable";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IndentDisable"] = 131072] = "IndentDisable";
                // Output status flags, read-only via TableGetColumnFlags()
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IsEnabled"] = 16777216] = "IsEnabled";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IsVisible"] = 33554432] = "IsVisible";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IsSorted"] = 67108864] = "IsSorted";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IsHovered"] = 134217728] = "IsHovered";
                // [Internal] Combinations and masks
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["WidthMask_"] = 24] = "WidthMask_";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["IndentMask_"] = 196608] = "IndentMask_";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["StatusMask_"] = 251658240] = "StatusMask_";
                ImGuiTableColumnFlags[ImGuiTableColumnFlags["NoDirectResize_"] = 1073741824] = "NoDirectResize_"; // [Internal] Disable user resizing this column directly (it may however we resized indirectly from its left edge)
            })(ImGuiTableColumnFlags || (ImGuiTableColumnFlags = {}));
            exports_1("ImGuiTableColumnFlags", ImGuiTableColumnFlags);
            exports_1("TableColumnFlags", ImGuiTableColumnFlags);
            (function (ImGuiTableRowFlags) {
                ImGuiTableRowFlags[ImGuiTableRowFlags["None"] = 0] = "None";
                ImGuiTableRowFlags[ImGuiTableRowFlags["Headers"] = 1] = "Headers"; // Identify header row (set default background color + width of its contents accounted different for auto column width)
            })(ImGuiTableRowFlags || (ImGuiTableRowFlags = {}));
            exports_1("ImGuiTableRowFlags", ImGuiTableRowFlags);
            exports_1("TableRowFlags", ImGuiTableRowFlags);
            (function (ImGuiTableBgTarget) {
                ImGuiTableBgTarget[ImGuiTableBgTarget["None"] = 0] = "None";
                ImGuiTableBgTarget[ImGuiTableBgTarget["RowBg0"] = 1] = "RowBg0";
                ImGuiTableBgTarget[ImGuiTableBgTarget["RowBg1"] = 2] = "RowBg1";
                ImGuiTableBgTarget[ImGuiTableBgTarget["CellBg"] = 3] = "CellBg"; // Set cell background color (top-most color)
            })(ImGuiTableBgTarget || (ImGuiTableBgTarget = {}));
            exports_1("ImGuiTableBgTarget", ImGuiTableBgTarget);
            exports_1("TableBgTarget", ImGuiTableBgTarget);
            (function (ImGuiFocusedFlags) {
                ImGuiFocusedFlags[ImGuiFocusedFlags["None"] = 0] = "None";
                ImGuiFocusedFlags[ImGuiFocusedFlags["ChildWindows"] = 1] = "ChildWindows";
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootWindow"] = 2] = "RootWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["AnyWindow"] = 4] = "AnyWindow";
                ImGuiFocusedFlags[ImGuiFocusedFlags["NoPopupHierarchy"] = 8] = "NoPopupHierarchy";
                //DockHierarchy               = 1 << 4,   // Consider docking hierarchy (treat dockspace host as parent of docked window) (when used with _ChildWindows or _RootWindow)
                ImGuiFocusedFlags[ImGuiFocusedFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
            })(ImGuiFocusedFlags || (ImGuiFocusedFlags = {}));
            exports_1("ImGuiFocusedFlags", ImGuiFocusedFlags);
            exports_1("FocusedFlags", ImGuiFocusedFlags);
            (function (ImGuiHoveredFlags) {
                ImGuiHoveredFlags[ImGuiHoveredFlags["None"] = 0] = "None";
                ImGuiHoveredFlags[ImGuiHoveredFlags["ChildWindows"] = 1] = "ChildWindows";
                ImGuiHoveredFlags[ImGuiHoveredFlags["RootWindow"] = 2] = "RootWindow";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AnyWindow"] = 4] = "AnyWindow";
                ImGuiHoveredFlags[ImGuiHoveredFlags["NoPopupHierarchy"] = 8] = "NoPopupHierarchy";
                //DockHierarchy               = 1 << 4,   // IsWindowHovered() only: Consider docking hierarchy (treat dockspace host as parent of docked window) (when used with _ChildWindows or _RootWindow)
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByPopup"] = 32] = "AllowWhenBlockedByPopup";
                //AllowWhenBlockedByModal     = 1 << 6,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByActiveItem"] = 128] = "AllowWhenBlockedByActiveItem";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenOverlapped"] = 256] = "AllowWhenOverlapped";
                ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenDisabled"] = 512] = "AllowWhenDisabled";
                ImGuiHoveredFlags[ImGuiHoveredFlags["RectOnly"] = 416] = "RectOnly";
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
                ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAutoExpirePayload"] = 32] = "SourceAutoExpirePayload";
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
                ImGuiDataType[ImGuiDataType["S8"] = 0] = "S8";
                ImGuiDataType[ImGuiDataType["U8"] = 1] = "U8";
                ImGuiDataType[ImGuiDataType["S16"] = 2] = "S16";
                ImGuiDataType[ImGuiDataType["U16"] = 3] = "U16";
                ImGuiDataType[ImGuiDataType["S32"] = 4] = "S32";
                ImGuiDataType[ImGuiDataType["U32"] = 5] = "U32";
                ImGuiDataType[ImGuiDataType["S64"] = 6] = "S64";
                ImGuiDataType[ImGuiDataType["U64"] = 7] = "U64";
                ImGuiDataType[ImGuiDataType["Float"] = 8] = "Float";
                ImGuiDataType[ImGuiDataType["Double"] = 9] = "Double";
                ImGuiDataType[ImGuiDataType["COUNT"] = 10] = "COUNT";
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
            (function (ImGuiSortDirection) {
                ImGuiSortDirection[ImGuiSortDirection["None"] = 0] = "None";
                ImGuiSortDirection[ImGuiSortDirection["Ascending"] = 1] = "Ascending";
                ImGuiSortDirection[ImGuiSortDirection["Descending"] = 2] = "Descending"; // Descending = 9->0, Z->A etc.
            })(ImGuiSortDirection || (ImGuiSortDirection = {}));
            exports_1("ImGuiSortDirection", ImGuiSortDirection);
            exports_1("SortDirection", ImGuiSortDirection);
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
                ImGuiKey[ImGuiKey["KeyPadEnter"] = 15] = "KeyPadEnter";
                ImGuiKey[ImGuiKey["A"] = 16] = "A";
                ImGuiKey[ImGuiKey["C"] = 17] = "C";
                ImGuiKey[ImGuiKey["V"] = 18] = "V";
                ImGuiKey[ImGuiKey["X"] = 19] = "X";
                ImGuiKey[ImGuiKey["Y"] = 20] = "Y";
                ImGuiKey[ImGuiKey["Z"] = 21] = "Z";
                ImGuiKey[ImGuiKey["COUNT"] = 22] = "COUNT";
            })(ImGuiKey || (ImGuiKey = {}));
            exports_1("ImGuiKey", ImGuiKey);
            exports_1("Key", ImGuiKey);
            (function (ImGuiKeyModFlags) {
                ImGuiKeyModFlags[ImGuiKeyModFlags["None"] = 0] = "None";
                ImGuiKeyModFlags[ImGuiKeyModFlags["Ctrl"] = 1] = "Ctrl";
                ImGuiKeyModFlags[ImGuiKeyModFlags["Shift"] = 2] = "Shift";
                ImGuiKeyModFlags[ImGuiKeyModFlags["Alt"] = 4] = "Alt";
                ImGuiKeyModFlags[ImGuiKeyModFlags["Super"] = 8] = "Super";
            })(ImGuiKeyModFlags || (ImGuiKeyModFlags = {}));
            exports_1("ImGuiKeyModFlags", ImGuiKeyModFlags);
            exports_1("KeyModFlags", ImGuiKeyModFlags);
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
                ImGuiNavInput[ImGuiNavInput["KeyLeft_"] = 16] = "KeyLeft_";
                ImGuiNavInput[ImGuiNavInput["KeyRight_"] = 17] = "KeyRight_";
                ImGuiNavInput[ImGuiNavInput["KeyUp_"] = 18] = "KeyUp_";
                ImGuiNavInput[ImGuiNavInput["KeyDown_"] = 19] = "KeyDown_";
                ImGuiNavInput[ImGuiNavInput["COUNT"] = 20] = "COUNT";
                ImGuiNavInput[ImGuiNavInput["InternalStart_"] = 16] = "InternalStart_";
            })(ImGuiNavInput || (ImGuiNavInput = {}));
            exports_1("ImGuiNavInput", ImGuiNavInput);
            exports_1("NavInput", ImGuiNavInput);
            (function (ImGuiConfigFlags) {
                ImGuiConfigFlags[ImGuiConfigFlags["None"] = 0] = "None";
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
                ImGuiCol[ImGuiCol["Tab"] = 33] = "Tab";
                ImGuiCol[ImGuiCol["TabHovered"] = 34] = "TabHovered";
                ImGuiCol[ImGuiCol["TabActive"] = 35] = "TabActive";
                ImGuiCol[ImGuiCol["TabUnfocused"] = 36] = "TabUnfocused";
                ImGuiCol[ImGuiCol["TabUnfocusedActive"] = 37] = "TabUnfocusedActive";
                ImGuiCol[ImGuiCol["PlotLines"] = 38] = "PlotLines";
                ImGuiCol[ImGuiCol["PlotLinesHovered"] = 39] = "PlotLinesHovered";
                ImGuiCol[ImGuiCol["PlotHistogram"] = 40] = "PlotHistogram";
                ImGuiCol[ImGuiCol["PlotHistogramHovered"] = 41] = "PlotHistogramHovered";
                ImGuiCol[ImGuiCol["TableHeaderBg"] = 42] = "TableHeaderBg";
                ImGuiCol[ImGuiCol["TableBorderStrong"] = 43] = "TableBorderStrong";
                ImGuiCol[ImGuiCol["TableBorderLight"] = 44] = "TableBorderLight";
                ImGuiCol[ImGuiCol["TableRowBg"] = 45] = "TableRowBg";
                ImGuiCol[ImGuiCol["TableRowBgAlt"] = 46] = "TableRowBgAlt";
                ImGuiCol[ImGuiCol["TextSelectedBg"] = 47] = "TextSelectedBg";
                ImGuiCol[ImGuiCol["DragDropTarget"] = 48] = "DragDropTarget";
                ImGuiCol[ImGuiCol["NavHighlight"] = 49] = "NavHighlight";
                ImGuiCol[ImGuiCol["NavWindowingHighlight"] = 50] = "NavWindowingHighlight";
                ImGuiCol[ImGuiCol["NavWindowingDimBg"] = 51] = "NavWindowingDimBg";
                ImGuiCol[ImGuiCol["ModalWindowDimBg"] = 52] = "ModalWindowDimBg";
                ImGuiCol[ImGuiCol["COUNT"] = 53] = "COUNT";
            })(ImGuiCol || (ImGuiCol = {}));
            exports_1("ImGuiCol", ImGuiCol);
            exports_1("Col", ImGuiCol);
            (function (ImGuiStyleVar) {
                // Enum name --------------------- // Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
                ImGuiStyleVar[ImGuiStyleVar["Alpha"] = 0] = "Alpha";
                ImGuiStyleVar[ImGuiStyleVar["DisabledAlpha"] = 1] = "DisabledAlpha";
                ImGuiStyleVar[ImGuiStyleVar["WindowPadding"] = 2] = "WindowPadding";
                ImGuiStyleVar[ImGuiStyleVar["WindowRounding"] = 3] = "WindowRounding";
                ImGuiStyleVar[ImGuiStyleVar["WindowBorderSize"] = 4] = "WindowBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["WindowMinSize"] = 5] = "WindowMinSize";
                ImGuiStyleVar[ImGuiStyleVar["WindowTitleAlign"] = 6] = "WindowTitleAlign";
                ImGuiStyleVar[ImGuiStyleVar["ChildRounding"] = 7] = "ChildRounding";
                ImGuiStyleVar[ImGuiStyleVar["ChildBorderSize"] = 8] = "ChildBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["PopupRounding"] = 9] = "PopupRounding";
                ImGuiStyleVar[ImGuiStyleVar["PopupBorderSize"] = 10] = "PopupBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["FramePadding"] = 11] = "FramePadding";
                ImGuiStyleVar[ImGuiStyleVar["FrameRounding"] = 12] = "FrameRounding";
                ImGuiStyleVar[ImGuiStyleVar["FrameBorderSize"] = 13] = "FrameBorderSize";
                ImGuiStyleVar[ImGuiStyleVar["ItemSpacing"] = 14] = "ItemSpacing";
                ImGuiStyleVar[ImGuiStyleVar["ItemInnerSpacing"] = 15] = "ItemInnerSpacing";
                ImGuiStyleVar[ImGuiStyleVar["IndentSpacing"] = 16] = "IndentSpacing";
                ImGuiStyleVar[ImGuiStyleVar["CellPadding"] = 17] = "CellPadding";
                ImGuiStyleVar[ImGuiStyleVar["ScrollbarSize"] = 18] = "ScrollbarSize";
                ImGuiStyleVar[ImGuiStyleVar["ScrollbarRounding"] = 19] = "ScrollbarRounding";
                ImGuiStyleVar[ImGuiStyleVar["GrabMinSize"] = 20] = "GrabMinSize";
                ImGuiStyleVar[ImGuiStyleVar["GrabRounding"] = 21] = "GrabRounding";
                ImGuiStyleVar[ImGuiStyleVar["TabRounding"] = 22] = "TabRounding";
                ImGuiStyleVar[ImGuiStyleVar["ButtonTextAlign"] = 23] = "ButtonTextAlign";
                ImGuiStyleVar[ImGuiStyleVar["SelectableTextAlign"] = 24] = "SelectableTextAlign";
                ImGuiStyleVar[ImGuiStyleVar["COUNT"] = 25] = "COUNT";
            })(ImGuiStyleVar || (ImGuiStyleVar = {}));
            exports_1("ImGuiStyleVar", ImGuiStyleVar);
            exports_1("StyleVar", ImGuiStyleVar);
            (function (ImGuiBackendFlags) {
                ImGuiBackendFlags[ImGuiBackendFlags["None"] = 0] = "None";
                ImGuiBackendFlags[ImGuiBackendFlags["HasGamepad"] = 1] = "HasGamepad";
                ImGuiBackendFlags[ImGuiBackendFlags["HasMouseCursors"] = 2] = "HasMouseCursors";
                ImGuiBackendFlags[ImGuiBackendFlags["HasSetMousePos"] = 4] = "HasSetMousePos";
                ImGuiBackendFlags[ImGuiBackendFlags["RendererHasVtxOffset"] = 8] = "RendererHasVtxOffset";
            })(ImGuiBackendFlags || (ImGuiBackendFlags = {}));
            exports_1("ImGuiBackendFlags", ImGuiBackendFlags);
            exports_1("BackendFlags", ImGuiBackendFlags);
            (function (ImGuiButtonFlags) {
                ImGuiButtonFlags[ImGuiButtonFlags["None"] = 0] = "None";
                ImGuiButtonFlags[ImGuiButtonFlags["MouseButtonLeft"] = 1] = "MouseButtonLeft";
                ImGuiButtonFlags[ImGuiButtonFlags["MouseButtonRight"] = 2] = "MouseButtonRight";
                ImGuiButtonFlags[ImGuiButtonFlags["MouseButtonMiddle"] = 4] = "MouseButtonMiddle";
                // [Internal]
                ImGuiButtonFlags[ImGuiButtonFlags["MouseButtonMask_"] = 7] = "MouseButtonMask_";
                ImGuiButtonFlags[ImGuiButtonFlags["MouseButtonDefault_"] = 1] = "MouseButtonDefault_";
            })(ImGuiButtonFlags || (ImGuiButtonFlags = {}));
            exports_1("ImGuiButtonFlags", ImGuiButtonFlags);
            exports_1("ButtonFlags", ImGuiButtonFlags);
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
                ImGuiColorEditFlags[ImGuiColorEditFlags["NoBorder"] = 1024] = "NoBorder";
                // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaBar"] = 65536] = "AlphaBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreview"] = 131072] = "AlphaPreview";
                ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreviewHalf"] = 262144] = "AlphaPreviewHalf";
                ImGuiColorEditFlags[ImGuiColorEditFlags["HDR"] = 524288] = "HDR";
                ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayRGB"] = 1048576] = "DisplayRGB";
                ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayHSV"] = 2097152] = "DisplayHSV";
                ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayHex"] = 4194304] = "DisplayHex";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 8388608] = "Uint8";
                ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 16777216] = "Float";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 33554432] = "PickerHueBar";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 67108864] = "PickerHueWheel";
                ImGuiColorEditFlags[ImGuiColorEditFlags["InputRGB"] = 134217728] = "InputRGB";
                ImGuiColorEditFlags[ImGuiColorEditFlags["InputHSV"] = 268435456] = "InputHSV";
                // Defaults Options. You can set application defaults using SetColorEditOptions(). The intent is that you probably don't want to
                // override them in most of your calls. Let the user choose via the option menu and/or call SetColorEditOptions() once during startup.
                ImGuiColorEditFlags[ImGuiColorEditFlags["DefaultOptions_"] = 177209344] = "DefaultOptions_";
                // [Internal] Masks
                ImGuiColorEditFlags[ImGuiColorEditFlags["DisplayMask_"] = 7340032] = "DisplayMask_";
                ImGuiColorEditFlags[ImGuiColorEditFlags["DataTypeMask_"] = 25165824] = "DataTypeMask_";
                ImGuiColorEditFlags[ImGuiColorEditFlags["PickerMask_"] = 100663296] = "PickerMask_";
                ImGuiColorEditFlags[ImGuiColorEditFlags["InputMask_"] = 402653184] = "InputMask_";
            })(ImGuiColorEditFlags || (ImGuiColorEditFlags = {}));
            exports_1("ImGuiColorEditFlags", ImGuiColorEditFlags);
            exports_1("ColorEditFlags", ImGuiColorEditFlags);
            (function (ImGuiSliderFlags) {
                ImGuiSliderFlags[ImGuiSliderFlags["None"] = 0] = "None";
                ImGuiSliderFlags[ImGuiSliderFlags["AlwaysClamp"] = 16] = "AlwaysClamp";
                ImGuiSliderFlags[ImGuiSliderFlags["Logarithmic"] = 32] = "Logarithmic";
                ImGuiSliderFlags[ImGuiSliderFlags["NoRoundToFormat"] = 64] = "NoRoundToFormat";
                ImGuiSliderFlags[ImGuiSliderFlags["NoInput"] = 128] = "NoInput";
                ImGuiSliderFlags[ImGuiSliderFlags["InvalidMask_"] = 1879048207] = "InvalidMask_"; // [Internal] We treat using those bits as being potentially a 'float power' argument from the previous API that has got miscast to this enum, and will trigger an assert if needed.
            })(ImGuiSliderFlags || (ImGuiSliderFlags = {}));
            exports_1("ImGuiSliderFlags", ImGuiSliderFlags);
            exports_1("SliderFlags", ImGuiSliderFlags);
            (function (ImGuiMouseButton) {
                ImGuiMouseButton[ImGuiMouseButton["Left"] = 0] = "Left";
                ImGuiMouseButton[ImGuiMouseButton["Right"] = 1] = "Right";
                ImGuiMouseButton[ImGuiMouseButton["Middle"] = 2] = "Middle";
                ImGuiMouseButton[ImGuiMouseButton["COUNT"] = 5] = "COUNT";
            })(ImGuiMouseButton || (ImGuiMouseButton = {}));
            exports_1("ImGuiMouseButton", ImGuiMouseButton);
            exports_1("MouseButton", ImGuiMouseButton);
            (function (ImGuiMouseCursor) {
                ImGuiMouseCursor[ImGuiMouseCursor["None"] = -1] = "None";
                ImGuiMouseCursor[ImGuiMouseCursor["Arrow"] = 0] = "Arrow";
                ImGuiMouseCursor[ImGuiMouseCursor["TextInput"] = 1] = "TextInput";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeAll"] = 2] = "ResizeAll";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNS"] = 3] = "ResizeNS";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeEW"] = 4] = "ResizeEW";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNESW"] = 5] = "ResizeNESW";
                ImGuiMouseCursor[ImGuiMouseCursor["ResizeNWSE"] = 6] = "ResizeNWSE";
                ImGuiMouseCursor[ImGuiMouseCursor["Hand"] = 7] = "Hand";
                ImGuiMouseCursor[ImGuiMouseCursor["NotAllowed"] = 8] = "NotAllowed";
                ImGuiMouseCursor[ImGuiMouseCursor["COUNT"] = 9] = "COUNT";
            })(ImGuiMouseCursor || (ImGuiMouseCursor = {}));
            exports_1("ImGuiMouseCursor", ImGuiMouseCursor);
            exports_1("MouseCursor", ImGuiMouseCursor);
            (function (ImGuiCond) {
                ImGuiCond[ImGuiCond["None"] = 0] = "None";
                ImGuiCond[ImGuiCond["Always"] = 1] = "Always";
                ImGuiCond[ImGuiCond["Once"] = 2] = "Once";
                ImGuiCond[ImGuiCond["FirstUseEver"] = 4] = "FirstUseEver";
                ImGuiCond[ImGuiCond["Appearing"] = 8] = "Appearing";
            })(ImGuiCond || (ImGuiCond = {}));
            exports_1("ImGuiCond", ImGuiCond);
            exports_1("Cond", ImGuiCond);
            (function (ImDrawFlags) {
                ImDrawFlags[ImDrawFlags["None"] = 0] = "None";
                ImDrawFlags[ImDrawFlags["Closed"] = 1] = "Closed";
                ImDrawFlags[ImDrawFlags["RoundCornersTopLeft"] = 16] = "RoundCornersTopLeft";
                ImDrawFlags[ImDrawFlags["RoundCornersTopRight"] = 32] = "RoundCornersTopRight";
                ImDrawFlags[ImDrawFlags["RoundCornersBottomLeft"] = 64] = "RoundCornersBottomLeft";
                ImDrawFlags[ImDrawFlags["RoundCornersBottomRight"] = 128] = "RoundCornersBottomRight";
                ImDrawFlags[ImDrawFlags["RoundCornersNone"] = 256] = "RoundCornersNone";
                ImDrawFlags[ImDrawFlags["RoundCornersTop"] = 48] = "RoundCornersTop";
                ImDrawFlags[ImDrawFlags["RoundCornersBottom"] = 192] = "RoundCornersBottom";
                ImDrawFlags[ImDrawFlags["RoundCornersLeft"] = 80] = "RoundCornersLeft";
                ImDrawFlags[ImDrawFlags["RoundCornersRight"] = 160] = "RoundCornersRight";
                ImDrawFlags[ImDrawFlags["RoundCornersAll"] = 240] = "RoundCornersAll";
                ImDrawFlags[ImDrawFlags["RoundCornersDefault_"] = 240] = "RoundCornersDefault_";
                ImDrawFlags[ImDrawFlags["RoundCornersMask_"] = 496] = "RoundCornersMask_";
            })(ImDrawFlags || (ImDrawFlags = {}));
            exports_1("ImDrawFlags", ImDrawFlags);
            exports_1("DrawFlags", ImDrawFlags);
            (function (ImDrawListFlags) {
                ImDrawListFlags[ImDrawListFlags["None"] = 0] = "None";
                ImDrawListFlags[ImDrawListFlags["AntiAliasedLines"] = 1] = "AntiAliasedLines";
                ImDrawListFlags[ImDrawListFlags["AntiAliasedLinesUseTex"] = 2] = "AntiAliasedLinesUseTex";
                ImDrawListFlags[ImDrawListFlags["AntiAliasedFill"] = 4] = "AntiAliasedFill";
                ImDrawListFlags[ImDrawListFlags["AllowVtxOffset"] = 8] = "AllowVtxOffset"; // Can emit 'VtxOffset > 0' to allow large meshes. Set when 'ImGuiBackendFlags_RendererHasVtxOffset' is enabled.
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
            exports_1("ImVec2", ImVec2);
            exports_1("Vec2", ImVec2);
            ImVec2.ZERO = new ImVec2(0.0, 0.0);
            ImVec2.UNIT = new ImVec2(1.0, 1.0);
            ImVec2.UNIT_X = new ImVec2(1.0, 0.0);
            ImVec2.UNIT_Y = new ImVec2(0.0, 1.0);
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
            exports_1("ImVec4", ImVec4);
            exports_1("Vec4", ImVec4);
            ImVec4.ZERO = new ImVec4(0.0, 0.0, 0.0, 0.0);
            ImVec4.UNIT = new ImVec4(1.0, 1.0, 1.0, 1.0);
            ImVec4.UNIT_X = new ImVec4(1.0, 0.0, 0.0, 0.0);
            ImVec4.UNIT_Y = new ImVec4(0.0, 1.0, 0.0, 0.0);
            ImVec4.UNIT_Z = new ImVec4(0.0, 0.0, 1.0, 0.0);
            ImVec4.UNIT_W = new ImVec4(0.0, 0.0, 0.0, 1.0);
            ImVec4.BLACK = new ImVec4(0.0, 0.0, 0.0, 1.0);
            ImVec4.WHITE = new ImVec4(1.0, 1.0, 1.0, 1.0);
            ImVector = class ImVector extends Array {
                constructor() {
                    super(...arguments);
                    this.Data = this;
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
                get Size() { return this.length; }
                empty() { return this.length === 0; }
                clear() { this.length = 0; }
                pop_back() { return this.pop(); }
                push_back(value) { this.push(value); }
                front() { IM_ASSERT(this.Size > 0); return this.Data[0]; }
                back() { IM_ASSERT(this.Size > 0); return this.Data[this.Size - 1]; }
                size() { return this.Size; }
                resize(new_size, v) {
                    if (v) {
                        for (let index = this.length; index < new_size; ++index) {
                            this[index] = v(index);
                        }
                    }
                    else {
                        this.length = new_size;
                    }
                }
                contains(value) {
                    return this.includes(value);
                }
                find_erase_unsorted(value) {
                    const index = this.indexOf(value);
                    if (index !== -1) {
                        this.splice(index, 1);
                    }
                }
            };
            exports_1("ImVector", ImVector);
            exports_1("Vector", ImVector);
            exports_1("IM_UNICODE_CODEPOINT_MAX", IM_UNICODE_CODEPOINT_MAX = 0xFFFF); // Maximum Unicode code point supported by this build.
            exports_1("UNICODE_CODEPOINT_MAX", IM_UNICODE_CODEPOINT_MAX);
            ImGuiTextFilter = class ImGuiTextFilter {
                // IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
                constructor(default_filter = "") {
                    // [Internal]
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
            exports_1("TextFilter", ImGuiTextFilter);
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
            exports_1("TextBuffer", ImGuiTextBuffer);
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
            // Helpers macros to generate 32-bits encoded colors
            exports_1("IM_COL32_R_SHIFT", IM_COL32_R_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 16 : 0);
            exports_1("IM_COL32_G_SHIFT", IM_COL32_G_SHIFT = 8);
            exports_1("IM_COL32_B_SHIFT", IM_COL32_B_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 0 : 16);
            exports_1("IM_COL32_A_SHIFT", IM_COL32_A_SHIFT = 24);
            exports_1("IM_COL32_A_MASK", IM_COL32_A_MASK = 0xFF000000);
            exports_1("IM_COL32_WHITE", IM_COL32_WHITE = IM_COL32(255, 255, 255, 255));
            exports_1("COL32_WHITE", IM_COL32_WHITE);
            exports_1("IM_COL32_BLACK", IM_COL32_BLACK = IM_COL32(0, 0, 0, 255));
            exports_1("COL32_BLACK", IM_COL32_BLACK);
            exports_1("IM_COL32_BLACK_TRANS", IM_COL32_BLACK_TRANS = IM_COL32(0, 0, 0, 0));
            exports_1("COL32_BLACK_TRANS", IM_COL32_BLACK_TRANS);
            ImColor = class ImColor {
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
                toImU32() { return ColorConvertFloat4ToU32(this.Value); }
                // inline operator ImVec4() const                                  { return Value; }
                toImVec4() { return this.Value; }
                // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
                // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
                SetHSV(h, s, v, a = 1.0) {
                    const ref_r = [this.Value.x];
                    const ref_g = [this.Value.y];
                    const ref_b = [this.Value.z];
                    ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
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
            exports_1("Color", ImColor);
            exports_1("ImGuiInputTextDefaultSize", ImGuiInputTextDefaultSize = 128);
            exports_1("InputTextDefaultSize", ImGuiInputTextDefaultSize);
            ImGuiInputTextCallbackData = class ImGuiInputTextCallbackData {
                constructor(native, UserData = null) {
                    this.native = native;
                    this.UserData = UserData;
                }
                // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
                get EventFlag() { return this.native.EventFlag; }
                // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
                get Flags() { return this.native.Flags; }
                // void*               UserData;       // What user passed to InputText()      // Read-only
                // public get UserData(): any { return this.native.UserData; }
                // CharFilter event:
                // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
                get EventChar() { return this.native.EventChar; }
                set EventChar(value) { this.native.EventChar = value; }
                // Completion,History,Always events:
                // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
                // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
                get EventKey() { return this.native.EventKey; }
                // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
                get Buf() { return this.native.Buf; }
                set Buf(value) { this.native.Buf = value; }
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
                InsertChars(pos, text, text_end = null) { return this.native.InsertChars(pos, text_end !== null ? text.substring(0, text_end) : text); }
                // void                SelectAll()             { SelectionStart = 0; SelectionEnd = BufTextLen; }
                SelectAll() { this.native.SelectAll(); }
                // void                ClearSelection()        { SelectionStart = SelectionEnd = BufTextLen; }
                ClearSelection() { this.native.ClearSelection(); }
                // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
                HasSelection() { return this.native.HasSelection(); }
            };
            exports_1("ImGuiInputTextCallbackData", ImGuiInputTextCallbackData);
            exports_1("InputTextCallbackData", ImGuiInputTextCallbackData);
            ImGuiSizeCallbackData = class ImGuiSizeCallbackData {
                constructor(native, UserData) {
                    this.native = native;
                    this.UserData = UserData;
                }
                get Pos() { return this.native.Pos; }
                get CurrentSize() { return this.native.CurrentSize; }
                get DesiredSize() { return this.native.DesiredSize; }
            };
            exports_1("ImGuiSizeCallbackData", ImGuiSizeCallbackData);
            exports_1("SizeCallbackData", ImGuiSizeCallbackData);
            ImGuiTableColumnSortSpecs = class ImGuiTableColumnSortSpecs {
                constructor(native) {
                    this.native = native;
                }
                get ColumnUserID() { return this.native.ColumnUserID; }
                get ColumnIndex() { return this.native.ColumnIndex; }
                get SortOrder() { return this.native.SortOrder; }
                get SortDirection() { return this.native.SortDirection; }
            };
            exports_1("ImGuiTableColumnSortSpecs", ImGuiTableColumnSortSpecs);
            exports_1("TableColumnSortSpecs", ImGuiTableColumnSortSpecs);
            ImGuiTableSortSpecs = class ImGuiTableSortSpecs {
                constructor(native) {
                    this.native = native;
                    this._Specs = Array.from({ length: this.SpecsCount }).map((_, i) => {
                        return new ImGuiTableColumnSortSpecs(this.native.GetSpec(i));
                    });
                }
                get Specs() { return this._Specs; }
                get SpecsCount() { return this.native.SpecsCount; }
                get SpecsDirty() { return this.native.SpecsDirty; }
                set SpecsDirty(value) { this.native.SpecsDirty = value; }
            };
            exports_1("ImGuiTableSortSpecs", ImGuiTableSortSpecs);
            exports_1("TableSortSpecs", ImGuiTableSortSpecs);
            ImGuiListClipper = class ImGuiListClipper {
                constructor() {
                    this._native = null;
                }
                get native() {
                    return this._native || (this._native = new bind.ImGuiListClipper());
                }
                get DisplayStart() { return this.native.DisplayStart; }
                get DisplayEnd() { return this.native.DisplayEnd; }
                get ItemsCount() { return this.native.ItemsCount; }
                // public get StepNo(): number { return this.native.StepNo; }
                // public get ItemsFrozen(): number { return this.native.ItemsFrozen; }
                get ItemsHeight() { return this.native.ItemsHeight; }
                get StartPosY() { return this.native.StartPosY; }
                // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
                // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
                // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
                // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
                // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
                delete() {
                    if (this._native !== null) {
                        this._native.delete();
                        this._native = null;
                    }
                }
                // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
                Begin(items_count, items_height = -1.0) {
                    this.native.Begin(items_count, items_height);
                }
                // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
                End() {
                    this.native.End();
                    this.delete();
                }
                // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
                Step() {
                    const busy = this.native.Step();
                    if (!busy) {
                        this.delete();
                    }
                    return busy;
                }
            };
            exports_1("ImGuiListClipper", ImGuiListClipper);
            exports_1("ListClipper", ImGuiListClipper);
            //-----------------------------------------------------------------------------
            // Draw List
            // Hold a series of drawing commands. The user provides a renderer for ImDrawData which essentially contains an array of ImDrawList.
            //-----------------------------------------------------------------------------
            // The maximum line width to bake anti-aliased textures for. Build atlas with ImFontAtlasFlags_NoBakedLines to disable baking.
            exports_1("IM_DRAWLIST_TEX_LINES_WIDTH_MAX", IM_DRAWLIST_TEX_LINES_WIDTH_MAX = 63);
            // Special Draw callback value to request renderer back-end to reset the graphics/render state.
            // The renderer back-end needs to handle this special value, otherwise it will crash trying to call a function at this address.
            // This is useful for example if you submitted callbacks which you know have altered the render state and you want it to be restored.
            // It is not done by default because they are many perfectly useful way of altering render state for imgui contents (e.g. changing shader/blending settings before an Image call).
            exports_1("ImDrawCallback_ResetRenderState", ImDrawCallback_ResetRenderState = -1);
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
                get ClipRect() { return this.native.ClipRect; }
                // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
                get TextureId() {
                    return ImGuiContext.getTexture(this.native.TextureId);
                }
                // unsigned int    VtxOffset;              // Start offset in vertex buffer. Pre-1.71 or without ImGuiBackendFlags_RendererHasVtxOffset: always 0. With ImGuiBackendFlags_RendererHasVtxOffset: may be >0 to support meshes larger than 64K vertices with 16-bits indices.
                get VtxOffset() { return this.native.VtxOffset; }
                // unsigned int    IdxOffset;              // Start offset in index buffer. Always equal to sum of ElemCount drawn so far.
                get IdxOffset() { return this.native.IdxOffset; }
            };
            exports_1("ImDrawCmd", ImDrawCmd);
            exports_1("DrawCmd", ImDrawCmd);
            exports_1("ImDrawIdxSize", ImDrawIdxSize = 2); // bind.ImDrawIdxSize;
            exports_1("DrawIdxSize", ImDrawIdxSize);
            exports_1("ImDrawVertSize", ImDrawVertSize = 20); // bind.ImDrawVertSize;
            exports_1("DrawVertSize", ImDrawVertSize);
            exports_1("ImDrawVertPosOffset", ImDrawVertPosOffset = 0); // bind.ImDrawVertPosOffset;
            exports_1("DrawVertPosOffset", ImDrawVertPosOffset);
            exports_1("ImDrawVertUVOffset", ImDrawVertUVOffset = 8); // bind.ImDrawVertUVOffset;
            exports_1("DrawVertUVOffset", ImDrawVertUVOffset);
            exports_1("ImDrawVertColOffset", ImDrawVertColOffset = 16); // bind.ImDrawVertColOffset;
            exports_1("DrawVertColOffset", ImDrawVertColOffset);
            ImDrawVert = class ImDrawVert {
                constructor(buffer, byteOffset = 0) {
                    this.pos = new Float32Array(buffer, byteOffset + bind.ImDrawVertPosOffset, 2);
                    this.uv = new Float32Array(buffer, byteOffset + bind.ImDrawVertUVOffset, 2);
                    this.col = new Uint32Array(buffer, byteOffset + bind.ImDrawVertColOffset, 1);
                }
            };
            exports_1("ImDrawVert", ImDrawVert);
            exports_1("DrawVert", ImDrawVert);
            // #else
            // You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
            // The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
            // The type has to be described within the macro (you can either declare the struct or use a typedef)
            // NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
            // IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
            // #endif
            // [Internal] For use by ImDrawList
            ImDrawCmdHeader = class ImDrawCmdHeader {
            };
            exports_1("ImDrawCmdHeader", ImDrawCmdHeader);
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
                // unsigned int            _VtxCurrentIdx;     // [Internal] == VtxBuffer.Size
                // const ImDrawListSharedData* _Data;          // Pointer to shared draw data (you can use ImGui::GetDrawListSharedData() to get the one from current ImGui context)
                // const char*             _OwnerName;         // Pointer to owner window's name for debugging
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
                // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int flags = ImDrawFlags_None, float thickness = 1.0f);   // a: upper-left, b: lower-right, flags: 4-bits corresponding to which corner to round
                AddRect(a, b, col, rounding = 0.0, flags = ImDrawFlags.None, thickness = 1.0) {
                    this.native.AddRect(a, b, col, rounding, flags, thickness);
                }
                // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int flags = ImDrawFlags_None);                     // a: upper-left, b: lower-right
                AddRectFilled(a, b, col, rounding = 0.0, flags = ImDrawFlags.None) {
                    this.native.AddRectFilled(a, b, col, rounding, flags);
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
                // IMGUI_API void  AddNgon(const ImVec2& center, float radius, ImU32 col, int num_segments, float thickness = 1.0f);
                AddNgon(centre, radius, col, num_segments, thickness = 1.0) {
                    this.native.AddNgon(centre, radius, col, num_segments, thickness);
                }
                // IMGUI_API void  AddNgonFilled(const ImVec2& center, float radius, ImU32 col, int num_segments);
                AddNgonFilled(centre, radius, col, num_segments) {
                    this.native.AddNgonFilled(centre, radius, col, num_segments);
                }
                AddText(...args) {
                    if (args[0] instanceof ImFont) {
                        const font = args[0];
                        const font_size = args[1];
                        const pos = args[2];
                        const col = args[3];
                        const text_begin = args[4];
                        const text_end = args[5] || null;
                        const wrap_width = args[6] = 0.0;
                        const cpu_fine_clip_rect = args[7] || null;
                        this.native.AddText_B(font.native, font_size, pos, col, text_end !== null ? text_begin.substring(0, text_end) : text_begin, wrap_width, cpu_fine_clip_rect);
                    }
                    else {
                        const pos = args[0];
                        const col = args[1];
                        const text_begin = args[2];
                        const text_end = args[3] || null;
                        this.native.AddText_A(pos, col, text_end !== null ? text_begin.substring(0, text_end) : text_begin);
                    }
                }
                // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, ImDrawFlags flags, float thickness);
                AddPolyline(points, num_points, col, flags, thickness) {
                    this.native.AddPolyline(points, num_points, col, flags, thickness);
                }
                // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
                AddConvexPolyFilled(points, num_points, col) {
                    this.native.AddConvexPolyFilled(points, num_points, col);
                }
                // IMGUI_API void  AddBezierCubic(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness, int num_segments = 0); // Cubic Bezier (4 control points)
                AddBezierCubic(p1, p2, p3, p4, col, thickness = 1.0, num_segments = 0) {
                    this.native.AddBezierCubic(p1, p2, p3, p4, col, thickness, num_segments);
                }
                // IMGUI_API void  AddBezierQuadratic(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col, float thickness, int num_segments = 0);               // Quadratic Bezier (3 control points)
                AddBezierQuadratic(p1, p2, p3, col, thickness = 1.0, num_segments = 0) {
                    this.native.AddBezierQuadratic(p1, p2, p3, col, thickness, num_segments);
                }
                // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
                AddImage(user_texture_id, a, b, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT, col = 0xFFFFFFFF) {
                    this.native.AddImage(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col);
                }
                // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
                AddImageQuad(user_texture_id, a, b, c, d, uv_a = ImVec2.ZERO, uv_b = ImVec2.UNIT_X, uv_c = ImVec2.UNIT, uv_d = ImVec2.UNIT_Y, col = 0xFFFFFFFF) {
                    this.native.AddImageQuad(ImGuiContext.setTexture(user_texture_id), a, b, c, d, uv_a, uv_b, uv_c, uv_d, col);
                }
                // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawFlags_None);
                AddImageRounded(user_texture_id, a, b, uv_a, uv_b, col, rounding, flags = ImDrawFlags.None) {
                    this.native.AddImageRounded(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col, rounding, flags);
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
                PathStroke(col, flags, thickness = 1.0) { this.native.PathStroke(col, flags, thickness); }
                // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
                PathArcTo(centre, radius, a_min, a_max, num_segments = 0) { this.native.PathArcTo(centre, radius, a_min, a_max, num_segments); }
                // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
                PathArcToFast(centre, radius, a_min_of_12, a_max_of_12) { this.native.PathArcToFast(centre, radius, a_min_of_12, a_max_of_12); }
                // IMGUI_API void  PathBezierCubicCurveTo(const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, int num_segments = 0);  // Cubic Bezier (4 control points)
                PathBezierCubicCurveTo(p2, p3, p4, num_segments = 0) { this.native.PathBezierCubicCurveTo(p2, p3, p4, num_segments); }
                // IMGUI_API void  PathBezierQuadraticCurveTo(const ImVec2& p2, const ImVec2& p3, int num_segments = 0);                // Quadratic Bezier (3 control points)
                PathBezierQuadraticCurveTo(p2, p3, num_segments = 0) { this.native.PathBezierQuadraticCurveTo(p2, p3, num_segments); }
                // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int flags = ImDrawFlags_None);
                PathRect(rect_min, rect_max, rounding = 0.0, flags = ImDrawFlags.None) { this.native.PathRect(rect_min, rect_max, rounding, flags); }
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
                // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
                PrimReserve(idx_count, vtx_count) { this.native.PrimReserve(idx_count, vtx_count); }
                // IMGUI_API void  PrimUnreserve(int idx_count, int vtx_count);
                PrimUnreserve(idx_count, vtx_count) { this.native.PrimUnreserve(idx_count, vtx_count); }
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
                // IMGUI_API int   _CalcCircleAutoSegmentCount(float radius) const;
                _CalcCircleAutoSegmentCount(radius) { return this.native._CalcCircleAutoSegmentCount(radius); }
            };
            exports_1("ImDrawList", ImDrawList);
            exports_1("DrawList", ImDrawList);
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
                get DisplayPos() { return this.native.DisplayPos; }
                // ImVec2          DisplaySize;            // Size of the viewport to render (== io.DisplaySize for the main viewport) (DisplayPos + DisplaySize == lower-right of the orthogonal projection matrix to use)
                get DisplaySize() { return this.native.DisplaySize; }
                // ImVec2          FramebufferScale;       // Amount of pixels for each unit of DisplaySize. Based on io.DisplayFramebufferScale. Generally (1,1) on normal display, (2,2) on OSX with Retina display.
                get FramebufferScale() { return this.native.FramebufferScale; }
                // Functions
                // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
                // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
                DeIndexAllBuffers() { this.native.DeIndexAllBuffers(); }
                // IMGUI_API void ScaleClipRects(const ImVec2& fb_scale);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
                ScaleClipRects(fb_scale) {
                    this.native.ScaleClipRects(fb_scale);
                }
            };
            exports_1("ImDrawData", ImDrawData);
            exports_1("DrawData", ImDrawData);
            script_ImFontConfig = class script_ImFontConfig {
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
                    // unsigned int    FontBuilderFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
                    this.FontBuilderFlags = 0;
                    // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
                    this.RasterizerMultiply = 1.0;
                    // ImWchar         EllipsisChar;           // -1       // Explicitly specify unicode codepoint of ellipsis character. When fonts are being merged first specified ellipsis will be used.
                    this.EllipsisChar = -1;
                    this.DotChar = -1;
                    // [Internal]
                    // char            Name[32];                               // Name (strictly to ease debugging)
                    this.Name = "";
                    // ImFont*         DstFont;
                    this.DstFont = null;
                    // IMGUI_API ImFontConfig();
                }
            };
            exports_1("script_ImFontConfig", script_ImFontConfig);
            ImFontConfig = class ImFontConfig {
                constructor(internal = new script_ImFontConfig()) {
                    this.internal = internal;
                }
                // void*           FontData;                   //          // TTF/OTF data
                // int             FontDataSize;               //          // TTF/OTF data size
                get FontData() { return this.internal.FontData; }
                // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
                get FontDataOwnedByAtlas() { return this.internal.FontDataOwnedByAtlas; }
                // int             FontNo;                     // 0        // Index of font within TTF/OTF file
                get FontNo() { return this.internal.FontNo; }
                // float           SizePixels;                 //          // Size in pixels for rasterizer.
                get SizePixels() { return this.internal.SizePixels; }
                // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
                get OversampleH() { return this.internal.OversampleH; }
                get OversampleV() { return this.internal.OversampleV; }
                // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
                get PixelSnapH() { return this.internal.PixelSnapH; }
                // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
                get GlyphExtraSpacing() { return this.internal.GlyphExtraSpacing; }
                // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
                get GlyphOffset() { return this.internal.GlyphOffset; }
                // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
                get GlyphRanges() { return this.internal.GlyphRanges; }
                // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
                get GlyphMinAdvanceX() { return this.internal.GlyphMinAdvanceX; }
                // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
                get GlyphMaxAdvanceX() { return this.internal.GlyphMaxAdvanceX; }
                // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
                get MergeMode() { return this.internal.MergeMode; }
                // unsigned int    FontBuilderFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
                get FontBuilderFlags() { return this.internal.FontBuilderFlags; }
                // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
                get RasterizerMultiply() { return this.internal.RasterizerMultiply; }
                // [Internal]
                // char            Name[32];                               // Name (strictly to ease debugging)
                get Name() { return this.internal.Name; }
                set Name(value) { this.internal.Name = value; }
                // ImFont*         DstFont;
                get DstFont() {
                    const font = this.internal.DstFont;
                    return font && new ImFont(font);
                }
            };
            exports_1("ImFontConfig", ImFontConfig);
            exports_1("FontConfig", ImFontConfig);
            // struct ImFontGlyph
            script_ImFontGlyph = class script_ImFontGlyph {
                constructor() {
                    // unsigned int    Colored : 1;        // Flag to indicate glyph is colored and should generally ignore tinting (make it usable with no shift on little-endian as this is used in loops)
                    this.Colored = false;
                    // unsigned int    Visible : 1;        // Flag to indicate glyph has no visible pixels (e.g. space). Allow early out when rendering.
                    this.Visible = false;
                    // unsigned int    Codepoint : 30;     // 0x0000..0x10FFFF
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
            exports_1("script_ImFontGlyph", script_ImFontGlyph);
            ImFontGlyph = class ImFontGlyph {
                constructor(internal = new script_ImFontGlyph()) {
                    this.internal = internal;
                }
                // unsigned int    Colored : 1;
                get Colored() { return this.internal.Visible; }
                // unsigned int    Visible : 1;        // Flag to allow early out when rendering
                get Visible() { return this.internal.Visible; }
                // unsigned int    Codepoint : 31;     // 0x0000..0xFFFF
                get Codepoint() { return this.internal.Codepoint; }
                // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
                get AdvanceX() { return this.internal.AdvanceX; }
                ;
                // float           X0, Y0, X1, Y1;     // Glyph corners
                get X0() { return this.internal.X0; }
                ;
                get Y0() { return this.internal.Y0; }
                ;
                get X1() { return this.internal.X1; }
                ;
                get Y1() { return this.internal.Y1; }
                ;
                // float           U0, V0, U1, V1;     // Texture coordinates
                get U0() { return this.internal.U0; }
                ;
                get V0() { return this.internal.V0; }
                ;
                get U1() { return this.internal.U1; }
                ;
                get V1() { return this.internal.V1; }
                ;
            };
            exports_1("ImFontGlyph", ImFontGlyph);
            exports_1("FontGlyph", ImFontGlyph);
            // See ImFontAtlas::AddCustomRectXXX functions.
            ImFontAtlasCustomRect = class ImFontAtlasCustomRect {
            };
            exports_1("ImFontAtlasCustomRect", ImFontAtlasCustomRect);
            (function (ImFontAtlasFlags) {
                ImFontAtlasFlags[ImFontAtlasFlags["None"] = 0] = "None";
                ImFontAtlasFlags[ImFontAtlasFlags["NoPowerOfTwoHeight"] = 1] = "NoPowerOfTwoHeight";
                ImFontAtlasFlags[ImFontAtlasFlags["NoMouseCursors"] = 2] = "NoMouseCursors";
                ImFontAtlasFlags[ImFontAtlasFlags["NoBakedLines"] = 4] = "NoBakedLines";
            })(ImFontAtlasFlags || (ImFontAtlasFlags = {}));
            exports_1("ImFontAtlasFlags", ImFontAtlasFlags);
            exports_1("FontAtlasFlags", ImFontAtlasFlags);
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
                    return new ImFont(this.native.AddFontFromMemoryTTF(new Uint8Array(data), size_pixels, font_cfg && font_cfg.internal, glyph_ranges));
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
                // IMGUI_API const ImWchar*    GetGlyphRangesVietnamese();       // Default + Vietnamese characters
                GetGlyphRangesVietnamese() { return this.native.GetGlyphRangesVietnamese(); }
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
                // bool                        Locked;             // Marked as Locked by ImGui::NewFrame() so attempt to modify the atlas will assert.
                get Locked() { return this.native.Locked; }
                set Locked(value) { this.native.Locked = value; }
                // ImFontAtlasFlags            Flags;              // Build flags (see ImFontAtlasFlags_)
                get Flags() { return this.native.Flags; }
                set Flags(value) { this.native.Flags = value; }
                // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
                get TexID() {
                    return ImGuiContext.getTexture(this.native.TexID);
                }
                set TexID(value) {
                    this.native.TexID = ImGuiContext.setTexture(value);
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
                get TexUvScale() { return this.native.TexUvScale; }
                // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
                get TexUvWhitePixel() { return this.native.TexUvWhitePixel; }
                // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
                get Fonts() {
                    const fonts = new ImVector();
                    this.native.IterateFonts((font) => {
                        fonts.push(new ImFont(font));
                    });
                    return fonts;
                }
            };
            exports_1("ImFontAtlas", ImFontAtlas);
            exports_1("FontAtlas", ImFontAtlas);
            ImFont = class ImFont {
                constructor(native) {
                    this.native = native;
                }
                // Members: Hot ~62/78 bytes
                // float                       FontSize;           // <user set>   // Height of characters, set during loading (don't change after loading)
                get FontSize() { return this.native.FontSize; }
                // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
                get Scale() { return this.native.Scale; }
                set Scale(value) { this.native.Scale = value; }
                // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
                get Glyphs() {
                    const glyphs = new ImVector();
                    this.native.IterateGlyphs((glyph) => {
                        glyphs.push(new ImFontGlyph(glyph)); // TODO: wrap native
                    });
                    return glyphs;
                }
                // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
                // get IndexAdvanceX(): any { return this.native.IndexAdvanceX; }
                // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
                // get IndexLookup(): any { return this.native.IndexLookup; }
                // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
                get FallbackGlyph() {
                    const glyph = this.native.FallbackGlyph;
                    return glyph && new ImFontGlyph(glyph);
                }
                set FallbackGlyph(value) {
                    this.native.FallbackGlyph = value && value.internal;
                }
                // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
                get FallbackAdvanceX() { return this.native.FallbackAdvanceX; }
                // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
                get FallbackChar() { return this.native.FallbackChar; }
                // ImWchar                     EllipsisChar;       // 2     // out // = -1       // Character used for ellipsis rendering.
                get EllipsisChar() { return this.native.EllipsisChar; }
                get DotChar() { return this.native.DotChar; }
                // Members: Cold ~18/26 bytes
                // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
                get ConfigDataCount() { return this.ConfigData.length; }
                // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
                get ConfigData() {
                    const cfg_data = [];
                    this.native.IterateConfigData((cfg) => {
                        cfg_data.push(new ImFontConfig(cfg));
                    });
                    return cfg_data;
                }
                // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
                get ContainerAtlas() { return null; }
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
                FindGlyph(c) {
                    const glyph = this.native.FindGlyph(c);
                    return glyph && new ImFontGlyph(glyph);
                }
                // IMGUI_API const ImFontGlyph*FindGlyphNoFallback(ImWchar c) const;
                FindGlyphNoFallback(c) {
                    const glyph = this.native.FindGlyphNoFallback(c);
                    return glyph && new ImFontGlyph(glyph);
                }
                // IMGUI_API void              SetFallbackChar(ImWchar c);
                // public SetFallbackChar(c: number): void { return this.native.SetFallbackChar(c); }
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
                    return this.native.CalcTextSizeA(size, max_width, wrap_width, text_end !== null ? text_begin.substring(0, text_end) : text_begin, remaining, new ImVec2());
                }
                // IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
                CalcWordWrapPositionA(scale, text, text_end = null, wrap_width) {
                    return this.native.CalcWordWrapPositionA(scale, text_end !== null ? text.substring(0, text_end) : text, wrap_width);
                }
                // IMGUI_API void              RenderChar(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, unsigned short c) const;
                RenderChar(draw_list, size, pos, col, c) {
                    this.native.RenderChar(draw_list.native, size, pos, col, c);
                }
                // IMGUI_API void              RenderText(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, const ImVec4& clip_rect, const char* text_begin, const char* text_end, float wrap_width = 0.0f, bool cpu_fine_clip = false) const;
                RenderText(draw_list, size, pos, col, clip_rect, text_begin, text_end = null, wrap_width = 0.0, cpu_fine_clip = false) { }
                // [Internal]
                // IMGUI_API void              GrowIndex(int new_size);
                // IMGUI_API void              AddGlyph(ImWchar c, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, float advance_x);
                // IMGUI_API void              AddRemapChar(ImWchar dst, ImWchar src, bool overwrite_dst = true); // Makes 'dst' character/glyph points to 'src' character/glyph. Currently needs to be called AFTER fonts have been built.
                // #ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
                // typedef ImFontGlyph Glyph; // OBSOLETE 1.52+
                // #endif
                // IMGUI_API bool              IsGlyphRangeUnused(unsigned int c_begin, unsigned int c_last);
                IsGlyphRangeUnused(c_begin, c_last) { return false; } // TODO
            };
            exports_1("ImFont", ImFont);
            exports_1("Font", ImFont);
            (function (ImGuiViewportFlags) {
                ImGuiViewportFlags[ImGuiViewportFlags["None"] = 0] = "None";
                ImGuiViewportFlags[ImGuiViewportFlags["IsPlatformWindow"] = 1] = "IsPlatformWindow";
                ImGuiViewportFlags[ImGuiViewportFlags["IsPlatformMonitor"] = 2] = "IsPlatformMonitor";
                ImGuiViewportFlags[ImGuiViewportFlags["OwnedByApp"] = 4] = "OwnedByApp"; // Platform Window: is created/managed by the application (rather than a dear imgui backend)
            })(ImGuiViewportFlags || (ImGuiViewportFlags = {}));
            exports_1("ImGuiViewportFlags", ImGuiViewportFlags);
            exports_1("ViewportFlags", ImGuiViewportFlags);
            ;
            ImGuiViewport = class ImGuiViewport {
                constructor(native) {
                    this.native = native;
                }
                // ImGuiViewportFlags  Flags;                  // See ImGuiViewportFlags_
                get Flags() { return this.native.Flags; }
                // ImVec2              Pos;                    // Main Area: Position of the viewport (Dear ImGui coordinates are the same as OS desktop/native coordinates)
                get Pos() { return this.native.Pos; }
                // ImVec2              Size;                   // Main Area: Size of the viewport.
                get Size() { return this.native.Size; }
                // ImVec2              WorkPos;                // Work Area: Position of the viewport minus task bars, menus bars, status bars (>= Pos)
                get WorkPos() { return this.native.WorkPos; }
                // ImVec2              WorkSize;               // Work Area: Size of the viewport minus task bars, menu bars, status bars (<= Size)
                get WorkSize() { return this.native.WorkSize; }
                // ImGuiViewport()     { memset(this, 0, sizeof(*this)); }
                // Helpers
                // ImVec2              GetCenter() const       { return ImVec2(Pos.x + Size.x * 0.5f, Pos.y + Size.y * 0.5f); }
                GetCenter() { return new ImVec2(this.Pos.x + this.Size.x * 0.5, this.Pos.y + this.Size.y * 0.5); }
                // ImVec2              GetWorkCenter() const   { return ImVec2(WorkPos.x + WorkSize.x * 0.5f, WorkPos.y + WorkSize.y * 0.5f); }
                GetWorkCenter() { return new ImVec2(this.WorkPos.x + this.WorkSize.x * 0.5, this.WorkPos.y + this.WorkSize.y * 0.5); }
            };
            exports_1("ImGuiViewport", ImGuiViewport);
            exports_1("Viewport", ImGuiViewport);
            // a script version of Bind.ImGuiStyle with matching interface
            script_ImGuiStyle = class script_ImGuiStyle {
                _getAt_Colors(index) { return this.Colors[index]; }
                _setAt_Colors(index, color) { this.Colors[index].Copy(color); return true; }
                constructor() {
                    this.Alpha = 1.0;
                    this.DisabledAlpha = 0.6;
                    this.WindowPadding = new ImVec2(8, 8);
                    this.WindowRounding = 7.0;
                    this.WindowBorderSize = 0.0;
                    this.WindowMinSize = new ImVec2(32, 32);
                    this.WindowTitleAlign = new ImVec2(0.0, 0.5);
                    this.WindowMenuButtonPosition = ImGuiDir.Left;
                    this.ChildRounding = 0.0;
                    this.ChildBorderSize = 1.0;
                    this.PopupRounding = 0.0;
                    this.PopupBorderSize = 1.0;
                    this.FramePadding = new ImVec2(4, 3);
                    this.FrameRounding = 0.0;
                    this.FrameBorderSize = 0.0;
                    this.ItemSpacing = new ImVec2(8, 4);
                    this.ItemInnerSpacing = new ImVec2(4, 4);
                    this.CellPadding = new ImVec2(4, 2);
                    this.TouchExtraPadding = new ImVec2(0, 0);
                    this.IndentSpacing = 21.0;
                    this.ColumnsMinSpacing = 6.0;
                    this.ScrollbarSize = 16.0;
                    this.ScrollbarRounding = 9.0;
                    this.GrabMinSize = 10.0;
                    this.GrabRounding = 0.0;
                    this.LogSliderDeadzone = 4.0;
                    this.TabRounding = 0.0;
                    this.TabBorderSize = 0.0;
                    this.TabMinWidthForCloseButton = 0.0;
                    this.ColorButtonPosition = ImGuiDir.Right;
                    this.ButtonTextAlign = new ImVec2(0.5, 0.5);
                    this.SelectableTextAlign = new ImVec2(0.0, 0.0);
                    this.DisplayWindowPadding = new ImVec2(22, 22);
                    this.DisplaySafeAreaPadding = new ImVec2(4, 4);
                    this.MouseCursorScale = 1;
                    this.AntiAliasedLines = true;
                    this.AntiAliasedLinesUseTex = true;
                    this.AntiAliasedFill = true;
                    this.CurveTessellationTol = 1.25;
                    this.CircleTessellationMaxError = 1.60;
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
                            return this.internal._getAt_Colors(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.internal._setAt_Colors(Number(key), value);
                        },
                    });
                }
                get Alpha() { return this.internal.Alpha; }
                set Alpha(value) { this.internal.Alpha = value; }
                get DisabledAlpha() { return this.internal.DisabledAlpha; }
                set DisabledAlpha(value) { this.internal.DisabledAlpha = value; }
                get WindowPadding() { return this.internal.WindowPadding; }
                get WindowRounding() { return this.internal.WindowRounding; }
                set WindowRounding(value) { this.internal.WindowRounding = value; }
                get WindowBorderSize() { return this.internal.WindowBorderSize; }
                set WindowBorderSize(value) { this.internal.WindowBorderSize = value; }
                get WindowMinSize() { return this.internal.WindowMinSize; }
                get WindowTitleAlign() { return this.internal.WindowTitleAlign; }
                get WindowMenuButtonPosition() { return this.internal.WindowMenuButtonPosition; }
                set WindowMenuButtonPosition(value) { this.internal.WindowMenuButtonPosition = value; }
                get ChildRounding() { return this.internal.ChildRounding; }
                set ChildRounding(value) { this.internal.ChildRounding = value; }
                get ChildBorderSize() { return this.internal.ChildBorderSize; }
                set ChildBorderSize(value) { this.internal.ChildBorderSize = value; }
                get PopupRounding() { return this.internal.PopupRounding; }
                set PopupRounding(value) { this.internal.PopupRounding = value; }
                get PopupBorderSize() { return this.internal.PopupBorderSize; }
                set PopupBorderSize(value) { this.internal.PopupBorderSize = value; }
                get FramePadding() { return this.internal.FramePadding; }
                get FrameRounding() { return this.internal.FrameRounding; }
                set FrameRounding(value) { this.internal.FrameRounding = value; }
                get FrameBorderSize() { return this.internal.FrameBorderSize; }
                set FrameBorderSize(value) { this.internal.FrameBorderSize = value; }
                get ItemSpacing() { return this.internal.ItemSpacing; }
                get ItemInnerSpacing() { return this.internal.ItemInnerSpacing; }
                get CellPadding() { return this.internal.CellPadding; }
                get TouchExtraPadding() { return this.internal.TouchExtraPadding; }
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
                get LogSliderDeadzone() { return this.internal.LogSliderDeadzone; }
                set LogSliderDeadzone(value) { this.internal.LogSliderDeadzone = value; }
                get TabRounding() { return this.internal.TabRounding; }
                set TabRounding(value) { this.internal.TabRounding = value; }
                get TabBorderSize() { return this.internal.TabBorderSize; }
                set TabBorderSize(value) { this.internal.TabBorderSize = value; }
                get TabMinWidthForCloseButton() { return this.internal.TabMinWidthForCloseButton; }
                set TabMinWidthForCloseButton(value) { this.internal.TabMinWidthForCloseButton = value; }
                get ColorButtonPosition() { return this.internal.ColorButtonPosition; }
                set ColorButtonPosition(value) { this.internal.ColorButtonPosition = value; }
                get ButtonTextAlign() { return this.internal.ButtonTextAlign; }
                get SelectableTextAlign() { return this.internal.SelectableTextAlign; }
                get DisplayWindowPadding() { return this.internal.DisplayWindowPadding; }
                get DisplaySafeAreaPadding() { return this.internal.DisplaySafeAreaPadding; }
                get MouseCursorScale() { return this.internal.MouseCursorScale; }
                set MouseCursorScale(value) { this.internal.MouseCursorScale = value; }
                get AntiAliasedLines() { return this.internal.AntiAliasedLines; }
                set AntiAliasedLines(value) { this.internal.AntiAliasedLines = value; }
                get AntiAliasedLinesUseTex() { return this.internal.AntiAliasedLinesUseTex; }
                set AntiAliasedLinesUseTex(value) { this.internal.AntiAliasedLinesUseTex = value; }
                get AntiAliasedFill() { return this.internal.AntiAliasedFill; }
                set AntiAliasedFill(value) { this.internal.AntiAliasedFill = value; }
                get CurveTessellationTol() { return this.internal.CurveTessellationTol; }
                set CurveTessellationTol(value) { this.internal.CurveTessellationTol = value; }
                get CircleTessellationMaxError() { return this.internal.CircleTessellationMaxError; }
                set CircleTessellationMaxError(value) { this.internal.CircleTessellationMaxError = value; }
                Copy(other) {
                    this.Alpha = other.Alpha;
                    this.DisabledAlpha = other.DisabledAlpha;
                    this.WindowPadding.Copy(other.WindowPadding);
                    this.WindowRounding = other.WindowRounding;
                    this.WindowBorderSize = other.WindowBorderSize;
                    this.WindowMinSize.Copy(other.WindowMinSize);
                    this.WindowTitleAlign.Copy(other.WindowTitleAlign);
                    this.WindowMenuButtonPosition = other.WindowMenuButtonPosition;
                    this.ChildRounding = other.ChildRounding;
                    this.ChildBorderSize = other.ChildBorderSize;
                    this.PopupRounding = other.PopupRounding;
                    this.PopupBorderSize = other.PopupBorderSize;
                    this.FramePadding.Copy(other.FramePadding);
                    this.FrameRounding = other.FrameRounding;
                    this.FrameBorderSize = other.FrameBorderSize;
                    this.ItemSpacing.Copy(other.ItemSpacing);
                    this.ItemInnerSpacing.Copy(other.ItemInnerSpacing);
                    this.CellPadding.Copy(other.CellPadding);
                    this.TouchExtraPadding.Copy(other.TouchExtraPadding);
                    this.IndentSpacing = other.IndentSpacing;
                    this.ColumnsMinSpacing = other.ColumnsMinSpacing;
                    this.ScrollbarSize = other.ScrollbarSize;
                    this.ScrollbarRounding = other.ScrollbarRounding;
                    this.GrabMinSize = other.GrabMinSize;
                    this.GrabRounding = other.GrabRounding;
                    this.LogSliderDeadzone = other.LogSliderDeadzone;
                    this.TabRounding = other.TabRounding;
                    this.TabBorderSize = other.TabBorderSize;
                    this.TabMinWidthForCloseButton = other.TabMinWidthForCloseButton;
                    this.ColorButtonPosition = other.ColorButtonPosition;
                    this.ButtonTextAlign.Copy(other.ButtonTextAlign);
                    this.DisplayWindowPadding.Copy(other.DisplayWindowPadding);
                    this.DisplaySafeAreaPadding.Copy(other.DisplaySafeAreaPadding);
                    this.MouseCursorScale = other.MouseCursorScale;
                    this.AntiAliasedLines = other.AntiAliasedLines;
                    this.AntiAliasedLinesUseTex = other.AntiAliasedLinesUseTex;
                    this.AntiAliasedFill = other.AntiAliasedFill;
                    this.CurveTessellationTol = other.CurveTessellationTol;
                    this.CircleTessellationMaxError = other.CircleTessellationMaxError;
                    for (let i = 0; i < ImGuiCol.COUNT; ++i) {
                        this.Colors[i].Copy(other.Colors[i]);
                    }
                    return this;
                }
                ScaleAllSizes(scale_factor) { this.internal.ScaleAllSizes(scale_factor); }
            };
            exports_1("ImGuiStyle", ImGuiStyle);
            exports_1("Style", ImGuiStyle);
            ImGuiIO = class ImGuiIO {
                constructor(native) {
                    this.native = native;
                    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
                    this.KeyMap = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiKey.COUNT;
                            }
                            return this.native._getAt_KeyMap(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native._setAt_KeyMap(Number(key), value);
                        },
                    });
                    // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
                    this.MouseDown = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 5;
                            }
                            return this.native._getAt_MouseDown(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native._setAt_MouseDown(Number(key), value);
                        },
                    });
                    // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
                    this.KeysDown = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 512;
                            }
                            return this.native._getAt_KeysDown(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native._setAt_KeysDown(Number(key), value);
                        },
                    });
                    // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
                    this.NavInputs = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiNavInput.COUNT;
                            }
                            return this.native._getAt_NavInputs(Number(key));
                        },
                        set: (target, key, value) => {
                            return this.native._setAt_NavInputs(Number(key), value);
                        },
                    });
                    // ImGuiKeyModFlags KeyMods;                   // Key mods flags (same as io.KeyCtrl/KeyShift/KeyAlt/KeySuper but merged into flags), updated by NewFrame()
                    // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
                    // ImVec2      MouseClickedPos[5];         // Position at time of clicking
                    this.MouseClickedPos = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return 5;
                            }
                            return this.native._getAt_MouseClickedPos(Number(key));
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
                            return this.native._getAt_MouseDownDuration(Number(key));
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
                            return this.native._getAt_KeysDownDuration(Number(key));
                        },
                    });
                    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
                    // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
                    this.NavInputsDownDuration = new Proxy([], {
                        get: (target, key) => {
                            if (key === "length") {
                                return ImGuiNavInput.COUNT;
                            }
                            return this.native._getAt_NavInputsDownDuration(Number(key));
                        },
                    });
                }
                //------------------------------------------------------------------
                // Settings (fill once)                 // Default value:
                //------------------------------------------------------------------
                // ImGuiConfigFlags   ConfigFlags;         // = 0                  // See ImGuiConfigFlags_ enum. Set by user/application. Gamepad/keyboard navigation options, etc.
                get ConfigFlags() { return this.native.ConfigFlags; }
                set ConfigFlags(value) { this.native.ConfigFlags = value; }
                // ImGuiBackendFlags  BackendFlags;        // = 0                  // Set ImGuiBackendFlags_ enum. Set by imgui_impl_xxx files or custom back-end to communicate features supported by the back-end.
                get BackendFlags() { return this.native.BackendFlags; }
                set BackendFlags(value) { this.native.BackendFlags = value; }
                // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
                get DisplaySize() { return this.native.DisplaySize; }
                // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
                get DeltaTime() { return this.native.DeltaTime; }
                set DeltaTime(value) { this.native.DeltaTime = value; }
                // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
                get IniSavingRate() { return this.native.IniSavingRate; }
                set IniSavingRate(value) { this.native.IniSavingRate = value; }
                // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
                get IniFilename() { return this.native.IniFilename; }
                set IniFilename(value) { this.native.IniFilename = value; }
                // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
                get LogFilename() { return this.native.LogFilename; }
                set LogFilename(value) { this.native.LogFilename = value; }
                // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
                get MouseDoubleClickTime() { return this.native.MouseDoubleClickTime; }
                set MouseDoubleClickTime(value) { this.native.MouseDoubleClickTime = value; }
                // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
                get MouseDoubleClickMaxDist() { return this.native.MouseDoubleClickMaxDist; }
                set MouseDoubleClickMaxDist(value) { this.native.MouseDoubleClickMaxDist = value; }
                // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
                get MouseDragThreshold() { return this.native.MouseDragThreshold; }
                set MouseDragThreshold(value) { this.native.MouseDragThreshold = value; }
                // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
                get KeyRepeatDelay() { return this.native.KeyRepeatDelay; }
                set KeyRepeatDelay(value) { this.native.KeyRepeatDelay = value; }
                // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
                get KeyRepeatRate() { return this.native.KeyRepeatRate; }
                set KeyRepeatRate(value) { this.native.KeyRepeatRate = value; }
                // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.
                get UserData() { return this.native.UserData; }
                set UserData(value) { this.native.UserData = value; }
                // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
                get Fonts() { return new ImFontAtlas(this.native.Fonts); }
                // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
                get FontGlobalScale() { return this.native.FontGlobalScale; }
                set FontGlobalScale(value) { this.native.FontGlobalScale = value; }
                // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
                get FontAllowUserScaling() { return this.native.FontAllowUserScaling; }
                set FontAllowUserScaling(value) { this.native.FontAllowUserScaling = value; }
                // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
                get FontDefault() {
                    const font = this.native.FontDefault;
                    return (font === null) ? null : new ImFont(font);
                }
                set FontDefault(value) {
                    this.native.FontDefault = value && value.native;
                }
                // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
                get DisplayFramebufferScale() { return this.native.DisplayFramebufferScale; }
                // Miscellaneous configuration options
                // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
                get ConfigMacOSXBehaviors() { return this.native.ConfigMacOSXBehaviors; }
                set ConfigMacOSXBehaviors(value) { this.native.ConfigMacOSXBehaviors = value; }
                // bool          ConfigInputTextCursorBlink;   // = true               // Enable blinking cursor, for users who consider it annoying.
                get ConfigInputTextCursorBlink() { return this.native.ConfigInputTextCursorBlink; }
                set ConfigInputTextCursorBlink(value) { this.native.ConfigInputTextCursorBlink = value; }
                // bool        ConfigDragClickToInputText;     // = false          // [BETA] Enable turning DragXXX widgets into text input with a simple mouse click-release (without moving). Not desirable on devices without a keyboard.
                get ConfigDragClickToInputText() { return this.native.ConfigDragClickToInputText; }
                set ConfigDragClickToInputText(value) { this.native.ConfigDragClickToInputText = value; }
                // bool          ConfigWindowsResizeFromEdges; // = false          // [BETA] Enable resizing of windows from their edges and from the lower-left corner. This requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback. (This used to be the ImGuiWindowFlags_ResizeFromAnySide flag)
                get ConfigWindowsResizeFromEdges() { return this.native.ConfigWindowsResizeFromEdges; }
                set ConfigWindowsResizeFromEdges(value) { this.native.ConfigWindowsResizeFromEdges = value; }
                // bool        ConfigWindowsMoveFromTitleBarOnly;// = false        // [BETA] Set to true to only allow moving windows when clicked+dragged from the title bar. Windows without a title bar are not affected.
                get ConfigWindowsMoveFromTitleBarOnly() { return this.native.ConfigWindowsMoveFromTitleBarOnly; }
                set ConfigWindowsMoveFromTitleBarOnly(value) { this.native.ConfigWindowsMoveFromTitleBarOnly = value; }
                // float       ConfigMemoryCompactTimer;       // = 60.0f          // Timer (in seconds) to free transient windows/tables memory buffers when unused. Set to -1.0f to disable.
                get ConfigMemoryCompactTimer() { return this.native.ConfigMemoryCompactTimer; }
                set ConfigMemoryCompactTimer(value) { this.native.ConfigMemoryCompactTimer = value; }
                //------------------------------------------------------------------
                // Settings (User Functions)
                //------------------------------------------------------------------
                // Optional: Platform/Renderer back-end name (informational only! will be displayed in About Window) + User data for back-end/wrappers to store their own stuff.
                // const char* BackendPlatformName;            // = NULL
                get BackendPlatformName() { return this.native.BackendPlatformName; }
                set BackendPlatformName(value) { this.native.BackendPlatformName = value; }
                // const char* BackendRendererName;            // = NULL
                get BackendRendererName() { return this.native.BackendRendererName; }
                set BackendRendererName(value) { this.native.BackendRendererName = value; }
                // void*       BackendPlatformUserData;        // = NULL
                get BackendPlatformUserData() { return this.native.BackendPlatformUserData; }
                set BackendPlatformUserData(value) { this.native.BackendPlatformUserData = value; }
                // void*       BackendRendererUserData;        // = NULL
                get BackendRendererUserData() { return this.native.BackendRendererUserData; }
                set BackendRendererUserData(value) { this.native.BackendRendererUserData = value; }
                // void*       BackendLanguageUserData;        // = NULL
                get BackendLanguageUserData() { return this.native.BackendLanguageUserData; }
                set BackendLanguageUserData(value) { this.native.BackendLanguageUserData = value; }
                // Optional: access OS clipboard
                // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
                // const char* (*GetClipboardTextFn)(void* user_data);
                get GetClipboardTextFn() { return this.native.GetClipboardTextFn; }
                set GetClipboardTextFn(value) { this.native.GetClipboardTextFn = value; }
                // void        (*SetClipboardTextFn)(void* user_data, const char* text);
                get SetClipboardTextFn() { return this.native.SetClipboardTextFn; }
                set SetClipboardTextFn(value) { this.native.SetClipboardTextFn = value; }
                // void*       ClipboardUserData;
                get ClipboardUserData() { return this.native.ClipboardUserData; }
                set ClipboardUserData(value) { this.native.ClipboardUserData = value; }
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
                get MousePos() { return this.native.MousePos; }
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
                // IMGUI_API void  AddInputCharacterUTF16(ImWchar16 c);        // Queue new character input from an UTF-16 character, it can be a surrogate
                AddInputCharacterUTF16(c) { this.native.AddInputCharacterUTF16(c); }
                // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
                AddInputCharactersUTF8(utf8_chars) { this.native.AddInputCharactersUTF8(utf8_chars); }
                // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually
                ClearInputCharacters() { this.native.ClearInputCharacters(); }
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
                // int         MetricsRenderVertices;      // Vertices output during last call to Render()
                get MetricsRenderVertices() { return this.native.MetricsRenderVertices; }
                // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
                get MetricsRenderIndices() { return this.native.MetricsRenderIndices; }
                // int         MetricsRenderWindows;       // Number of visible windows
                get MetricsRenderWindows() { return this.native.MetricsRenderWindows; }
                // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
                get MetricsActiveWindows() { return this.native.MetricsActiveWindows; }
                // int         MetricsActiveAllocations;   // Number of active allocations, updated by MemAlloc/MemFree based on current context. May be off if you have multiple imgui contexts.
                get MetricsActiveAllocations() { return this.native.MetricsActiveAllocations; }
                // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
                get MouseDelta() { return this.native.MouseDelta; }
                //------------------------------------------------------------------
                // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
                //------------------------------------------------------------------
                get WantCaptureMouseUnlessPopupClose() { return this.native.WantCaptureMouseUnlessPopupClose; }
                set WantCaptureMouseUnlessPopupClose(value) { this.native.WantCaptureMouseUnlessPopupClose = value; }
            };
            exports_1("ImGuiIO", ImGuiIO);
            exports_1("IO", ImGuiIO);
            // Context creation and access
            // Each context create its own ImFontAtlas by default. You may instance one yourself and pass it to CreateContext() to share a font atlas between imgui contexts.
            // None of those functions is reliant on the current context.
            // IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
            // IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = destroy current context
            // IMGUI_API ImGuiContext* GetCurrentContext();
            // IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
            ImGuiContext = class ImGuiContext {
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
                constructor(native) {
                    this.native = native;
                }
                _getTexture(index) {
                    return ImGuiContext.textures[index] || null;
                }
                _setTexture(texture) {
                    let index = ImGuiContext.textures.indexOf(texture);
                    if (index === -1) {
                        for (let i = 0; i < ImGuiContext.textures.length; ++i) {
                            if (ImGuiContext.textures[i] === null) {
                                ImGuiContext.textures[i] = texture;
                                return i;
                            }
                        }
                        index = ImGuiContext.textures.length;
                        ImGuiContext.textures.push(texture);
                    }
                    return index;
                }
            };
            exports_1("ImGuiContext", ImGuiContext);
            ImGuiContext.current_ctx = null;
            ImGuiContext.textures = [];
            // Drag and Drop
            // - If you stop calling BeginDragDropSource() the payload is preserved however it won't have a preview tooltip (we currently display a fallback "..." tooltip as replacement)
            // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0);                                      // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
            // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t sz, ImGuiCond cond = 0);  // type is a user defined string of maximum 32 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
            // IMGUI_API void          EndDragDropSource();                                                                    // only call EndDragDropSource() if BeginDragDropSource() returns true!
            // IMGUI_API bool                  BeginDragDropTarget();                                                          // call after submitting an item that may receive a payload. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
            // IMGUI_API const ImGuiPayload*   AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);          // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
            // IMGUI_API void                  EndDragDropTarget();                                                            // only call EndDragDropTarget() if BeginDragDropTarget() returns true!
            // IMGUI_API const ImGuiPayload*   GetDragDropPayload();                                                           // peek directly into the current payload from anywhere. may return NULL. use ImGuiPayload::IsDataType() to test for the payload type.
            _ImGui_DragDropPayload_data = {};
        }
    };
});
//# sourceMappingURL=imgui.js.map