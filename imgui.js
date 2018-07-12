System.register(["./bind-imgui", "./imconfig"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var Bind, bind, config, IMGUI_VERSION, ImStringBuffer, ImGuiWindowFlags, ImGuiInputTextFlags, ImGuiTreeNodeFlags, ImGuiSelectableFlags, ImGuiComboFlags, ImGuiFocusedFlags, ImGuiHoveredFlags, ImGuiDragDropFlags, IMGUI_PAYLOAD_TYPE_COLOR_3F, IMGUI_PAYLOAD_TYPE_COLOR_4F, ImGuiDataType, ImGuiDir, ImGuiKey, ImGuiNavInput, ImGuiConfigFlags, ImGuiCol, ImGuiStyleVar, ImGuiBackendFlags, ImGuiColorEditFlags, ImGuiMouseCursor, ImGuiCond, ImDrawCornerFlags, ImDrawListFlags, ImVec2, ImVec4, ImVector, ImGuiTextFilter, ImGuiTextBuffer, ImGuiStorage, ImGuiPayload, IM_COL32_R_SHIFT, IM_COL32_G_SHIFT, IM_COL32_B_SHIFT, IM_COL32_A_SHIFT, IM_COL32_A_MASK, IM_COL32_WHITE, IM_COL32_BLACK, IM_COL32_BLACK_TRANS, ImColor, ImGuiTextEditDefaultSize, ImGuiTextEditCallbackData, ImGuiSizeCallbackData, ImGuiListClipper, ImDrawCmd, ImDrawIdxSize, ImDrawVertSize, ImDrawVertPosOffset, ImDrawVertUVOffset, ImDrawVertColOffset, ImDrawVert, ImDrawChannel, ImDrawListSharedData, ImDrawList, ImDrawData, script_ImFontConfig, ImFontConfig, script_ImFontGlyph, ImFontGlyph, ImFontAtlasFlags, ImFontAtlas, ImFont, script_ImGuiStyle, ImGuiStyle, ImGuiIO, ImGuiContext;
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
    // #define IMGUI_CHECKVERSION()        ImGui::DebugCheckVersionAndDataLayout(IMGUI_VERSION, sizeof(ImGuiIO), sizeof(ImGuiStyle), sizeof(ImVec2), sizeof(ImVec4), sizeof(ImDrawVert))
    function IMGUI_CHECKVERSION() { return DebugCheckVersionAndDataLayout(IMGUI_VERSION, bind.ImGuiIOSize, bind.ImGuiStyleSize, bind.ImVec2Size, bind.ImVec4Size, bind.ImDrawVertSize); }
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
        const ctx = new ImGuiContext(bind.CreateContext());
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
    // IMGUI_API bool          DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert);
    function DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert) {
        return bind.DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_draw_vert);
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
    // IMGUI_API const char*   GetVersion();
    function GetVersion() { return bind.GetVersion(); }
    exports_1("GetVersion", GetVersion);
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
    // IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
    function End() { bind.End(); }
    exports_1("End", End);
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
    function BeginChild(id, size = ImVec2.ZERO, border = false, extra_flags = 0) {
        return bind.BeginChild(id, size, border, extra_flags);
    }
    exports_1("BeginChild", BeginChild);
    // IMGUI_API void          EndChild();
    function EndChild() { bind.EndChild(); }
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
    // IMGUI_API float         GetContentRegionAvailWidth();                                       //
    function GetContentRegionAvailWidth() { return bind.GetContentRegionAvailWidth(); }
    exports_1("GetContentRegionAvailWidth", GetContentRegionAvailWidth);
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
    // IMGUI_API float         GetWindowContentRegionWidth();                                      //
    function GetWindowContentRegionWidth() { return bind.GetWindowContentRegionWidth(); }
    exports_1("GetWindowContentRegionWidth", GetWindowContentRegionWidth);
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
    // IMGUI_API float         GetWindowWidth();
    function GetWindowWidth() { return bind.GetWindowWidth(); }
    exports_1("GetWindowWidth", GetWindowWidth);
    // IMGUI_API float         GetWindowHeight();
    function GetWindowHeight() { return bind.GetWindowHeight(); }
    exports_1("GetWindowHeight", GetWindowHeight);
    // IMGUI_API bool          IsWindowCollapsed();
    function IsWindowCollapsed() { return bind.IsWindowCollapsed(); }
    exports_1("IsWindowCollapsed", IsWindowCollapsed);
    // IMGUI_API bool          IsWindowAppearing();
    function IsWindowAppearing() { return bind.IsWindowAppearing(); }
    exports_1("IsWindowAppearing", IsWindowAppearing);
    // IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
    function SetWindowFontScale(scale) { bind.SetWindowFontScale(scale); }
    exports_1("SetWindowFontScale", SetWindowFontScale);
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
            bind.SetNextWindowSizeConstraints(size_min, size_max, (data) => {
                custom_callback(new ImGuiSizeCallbackData(data, custom_callback_data));
            }, null);
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
    // IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
    function SetNextWindowFocus() { bind.SetNextWindowFocus(); }
    exports_1("SetNextWindowFocus", SetNextWindowFocus);
    // IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                  // set next window background color alpha. helper to easily modify ImGuiCol_WindowBg/ChildBg/PopupBg.
    function SetNextWindowBgAlpha(alpha) { bind.SetNextWindowBgAlpha(alpha); }
    exports_1("SetNextWindowBgAlpha", SetNextWindowBgAlpha);
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
    // IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
    function GetScrollX() { return bind.GetScrollX(); }
    exports_1("GetScrollX", GetScrollX);
    // IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
    function GetScrollY() { return bind.GetScrollY(); }
    exports_1("GetScrollY", GetScrollY);
    // IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
    function GetScrollMaxX() { return bind.GetScrollMaxX(); }
    exports_1("GetScrollMaxX", GetScrollMaxX);
    // IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
    function GetScrollMaxY() { return bind.GetScrollMaxY(); }
    exports_1("GetScrollMaxY", GetScrollMaxY);
    // IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
    function SetScrollX(scroll_x) { bind.SetScrollX(scroll_x); }
    exports_1("SetScrollX", SetScrollX);
    // IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
    function SetScrollY(scroll_y) { bind.SetScrollY(scroll_y); }
    exports_1("SetScrollY", SetScrollY);
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
    // IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
    function GetFontSize() { return bind.GetFontSize(); }
    exports_1("GetFontSize", GetFontSize);
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    function GetFontTexUvWhitePixel(out = new ImVec2()) {
        return bind.GetFontTexUvWhitePixel(out);
    }
    exports_1("GetFontTexUvWhitePixel", GetFontTexUvWhitePixel);
    function GetColorU32(...args) {
        if (args.length === 1) {
            if (typeof (args[0]) === "number") {
                // TODO: ImGuiCol or ImU32
                const idx = args[0];
                return bind.GetColorU32_A(idx, 1.0);
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
    // Parameters stacks (current window)
    // IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
    function PushItemWidth(item_width) { bind.PushItemWidth(item_width); }
    exports_1("PushItemWidth", PushItemWidth);
    // IMGUI_API void          PopItemWidth();
    function PopItemWidth() { bind.PopItemWidth(); }
    exports_1("PopItemWidth", PopItemWidth);
    // IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
    function CalcItemWidth() { return bind.CalcItemWidth(); }
    exports_1("CalcItemWidth", CalcItemWidth);
    // IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    function PushTextWrapPos(wrap_pos_x = 0.0) {
        bind.PushTextWrapPos(wrap_pos_x);
    }
    exports_1("PushTextWrapPos", PushTextWrapPos);
    // IMGUI_API void          PopTextWrapPos();
    function PopTextWrapPos() { bind.PopTextWrapPos(); }
    exports_1("PopTextWrapPos", PopTextWrapPos);
    // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
    function PushAllowKeyboardFocus(allow_keyboard_focus) { bind.PushAllowKeyboardFocus(allow_keyboard_focus); }
    exports_1("PushAllowKeyboardFocus", PushAllowKeyboardFocus);
    // IMGUI_API void          PopAllowKeyboardFocus();
    function PopAllowKeyboardFocus() { bind.PopAllowKeyboardFocus(); }
    exports_1("PopAllowKeyboardFocus", PopAllowKeyboardFocus);
    // IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
    function PushButtonRepeat(repeat) { bind.PushButtonRepeat(repeat); }
    exports_1("PushButtonRepeat", PushButtonRepeat);
    // IMGUI_API void          PopButtonRepeat();
    function PopButtonRepeat() { bind.PopButtonRepeat(); }
    exports_1("PopButtonRepeat", PopButtonRepeat);
    // Cursor / Layout
    // IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
    function Separator() { bind.Separator(); }
    exports_1("Separator", Separator);
    // IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
    function SameLine(pos_x = 0.0, spacing_w = -1.0) {
        bind.SameLine(pos_x, spacing_w);
    }
    exports_1("SameLine", SameLine);
    // IMGUI_API void          NewLine();                                                          // undo a SameLine()
    function NewLine() { bind.NewLine(); }
    exports_1("NewLine", NewLine);
    // IMGUI_API void          Spacing();                                                          // add vertical spacing
    function Spacing() { bind.Spacing(); }
    exports_1("Spacing", Spacing);
    // IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
    function Dummy(size) { bind.Dummy(size); }
    exports_1("Dummy", Dummy);
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
    function Indent(indent_w = 0.0) { bind.Indent(indent_w); }
    exports_1("Indent", Indent);
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
    function Unindent(indent_w = 0.0) { bind.Unindent(indent_w); }
    exports_1("Unindent", Unindent);
    // IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
    function BeginGroup() { bind.BeginGroup(); }
    exports_1("BeginGroup", BeginGroup);
    // IMGUI_API void          EndGroup();
    function EndGroup() { bind.EndGroup(); }
    exports_1("EndGroup", EndGroup);
    // IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
    function GetCursorPos(out = new ImVec2()) { return bind.GetCursorPos(out); }
    exports_1("GetCursorPos", GetCursorPos);
    // IMGUI_API float         GetCursorPosX();                                                    // "
    function GetCursorPosX() { return bind.GetCursorPosX(); }
    exports_1("GetCursorPosX", GetCursorPosX);
    // IMGUI_API float         GetCursorPosY();                                                    // "
    function GetCursorPosY() { return bind.GetCursorPosY(); }
    exports_1("GetCursorPosY", GetCursorPosY);
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
    function SetCursorPos(local_pos) { bind.SetCursorPos(local_pos); }
    exports_1("SetCursorPos", SetCursorPos);
    // IMGUI_API void          SetCursorPosX(float x);                                             // "
    function SetCursorPosX(x) { bind.SetCursorPosX(x); }
    exports_1("SetCursorPosX", SetCursorPosX);
    // IMGUI_API void          SetCursorPosY(float y);                                             // "
    function SetCursorPosY(y) { bind.SetCursorPosY(y); }
    exports_1("SetCursorPosY", SetCursorPosY);
    // IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
    function GetCursorStartPos(out = new ImVec2()) { return bind.GetCursorStartPos(out); }
    exports_1("GetCursorStartPos", GetCursorStartPos);
    // IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    function GetCursorScreenPos(out = new ImVec2()) { return bind.GetCursorScreenPos(out); }
    exports_1("GetCursorScreenPos", GetCursorScreenPos);
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
    function SetCursorScreenPos(pos) { bind.SetCursorScreenPos(pos); }
    exports_1("SetCursorScreenPos", SetCursorScreenPos);
    // IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
    function AlignTextToFramePadding() { bind.AlignTextToFramePadding(); }
    exports_1("AlignTextToFramePadding", AlignTextToFramePadding);
    // IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
    function GetTextLineHeight() { return bind.GetTextLineHeight(); }
    exports_1("GetTextLineHeight", GetTextLineHeight);
    // IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
    function GetTextLineHeightWithSpacing() { return bind.GetTextLineHeightWithSpacing(); }
    exports_1("GetTextLineHeightWithSpacing", GetTextLineHeightWithSpacing);
    // IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
    function GetFrameHeight() { return bind.GetFrameHeight(); }
    exports_1("GetFrameHeight", GetFrameHeight);
    // IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
    function GetFrameHeightWithSpacing() { return bind.GetFrameHeightWithSpacing(); }
    exports_1("GetFrameHeightWithSpacing", GetFrameHeightWithSpacing);
    // Columns
    // You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    function Columns(count = 1, id = null, border = true) {
        id = id || "";
        bind.Columns(count, id, border);
    }
    exports_1("Columns", Columns);
    // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
    function NextColumn() { bind.NextColumn(); }
    exports_1("NextColumn", NextColumn);
    // IMGUI_API int           GetColumnIndex();                                                   // get current column index
    function GetColumnIndex() { return bind.GetColumnIndex(); }
    exports_1("GetColumnIndex", GetColumnIndex);
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    function GetColumnWidth(column_index = -1) {
        return bind.GetColumnWidth(column_index);
    }
    exports_1("GetColumnWidth", GetColumnWidth);
    // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
    function SetColumnWidth(column_index, width) { bind.SetColumnWidth(column_index, width); }
    exports_1("SetColumnWidth", SetColumnWidth);
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    function GetColumnOffset(column_index = -1) {
        return bind.GetColumnOffset(column_index);
    }
    exports_1("GetColumnOffset", GetColumnOffset);
    // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
    function SetColumnOffset(column_index, offset_x) { bind.SetColumnOffset(column_index, offset_x); }
    exports_1("SetColumnOffset", SetColumnOffset);
    // IMGUI_API int           GetColumnsCount();
    function GetColumnsCount() { return bind.GetColumnsCount(); }
    exports_1("GetColumnsCount", GetColumnsCount);
    // ID scopes
    // If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
    // You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
    // IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
    // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API void          PushID(const void* ptr_id);
    // IMGUI_API void          PushID(int int_id);
    function PushID(id) { bind.PushID(id); }
    exports_1("PushID", PushID);
    // IMGUI_API void          PopID();
    function PopID() { bind.PopID(); }
    exports_1("PopID", PopID);
    // IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
    // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API ImGuiID       GetID(const void* ptr_id);
    function GetID(id) { return bind.GetID(id); }
    exports_1("GetID", GetID);
    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    function TextUnformatted(text, text_end = null) { bind.TextUnformatted(text_end !== null ? text.substring(0, text_end) : text); }
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
    // IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
    function Bullet() { bind.Bullet(); }
    exports_1("Bullet", Bullet);
    // Widgets: Main
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
    function Button(label, size = ImVec2.ZERO) {
        return bind.Button(label, size);
    }
    exports_1("Button", Button);
    // IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
    function SmallButton(label) { return bind.SmallButton(label); }
    exports_1("SmallButton", SmallButton);
    // IMGUI_API bool          ArrowButton(const char* str_id, ImGuiDir dir);                  // square button with an arrow shape
    function ArrowButton(str_id, dir) { return bind.ArrowButton(str_id, dir); }
    exports_1("ArrowButton", ArrowButton);
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
    // Widgets: Input with Keyboard
    // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
    function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiTextEditCallbackData(data, user_data))) || null;
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
            const ret = bind.InputText(label, ref_buf, buf_size, flags, _callback, null);
            buf(ref_buf[0]);
            return ret;
        }
    }
    exports_1("InputText", InputText);
    // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
    function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
        const _callback = callback && ((data) => callback(new ImGuiTextEditCallbackData(data, user_data))) || null;
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
        if (v instanceof Int32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.S32, v, v_min, v_max, format, power);
        }
        if (v instanceof Uint32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.U32, v, v_min, v_max, format, power);
        }
        // if (v instanceof Int64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.S64, v, v_min, v_max, format, power); }
        // if (v instanceof Uint64Array) { return bind.VSliderScalar(label, size, ImGuiDataType.U64, v, v_min, v_max, format, power); }
        if (v instanceof Float32Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.Float, v, v_min, v_max, format, power);
        }
        if (v instanceof Float64Array) {
            return bind.VSliderScalar(label, size, ImGuiDataType.Double, v, v_min, v_max, format, power);
        }
        throw new Error();
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
        const _ref_col = Array.isArray(ref_col) ? ref_col : ref_col ? [ref_col.x, ref_col.y, ref_col.z, ref_col.w] : null;
        if (Array.isArray(col)) {
            return bind.ColorPicker4(label, col, flags, _ref_col);
        }
        else {
            const _col = [col.x, col.y, col.z, col.w];
            const ret = bind.ColorPicker4(label, _col, flags, _ref_col);
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
    // IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
    function TreePop() { bind.TreePop(); }
    exports_1("TreePop", TreePop);
    // IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
    function TreeAdvanceToLabelPos() { bind.TreeAdvanceToLabelPos(); }
    exports_1("TreeAdvanceToLabelPos", TreeAdvanceToLabelPos);
    // IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
    function GetTreeNodeToLabelSpacing() { return bind.GetTreeNodeToLabelSpacing(); }
    exports_1("GetTreeNodeToLabelSpacing", GetTreeNodeToLabelSpacing);
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
    // Tooltips
    // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
    function BeginTooltip() { bind.BeginTooltip(); }
    exports_1("BeginTooltip", BeginTooltip);
    // IMGUI_API void          EndTooltip();
    function EndTooltip() { bind.EndTooltip(); }
    exports_1("EndTooltip", EndTooltip);
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    function SetTooltip(fmt) {
        bind.SetTooltip(fmt);
    }
    exports_1("SetTooltip", SetTooltip);
    // Menus
    // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
    function BeginMainMenuBar() { return bind.BeginMainMenuBar(); }
    exports_1("BeginMainMenuBar", BeginMainMenuBar);
    // IMGUI_API void          EndMainMenuBar();
    function EndMainMenuBar() { bind.EndMainMenuBar(); }
    exports_1("EndMainMenuBar", EndMainMenuBar);
    // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
    function BeginMenuBar() { return bind.BeginMenuBar(); }
    exports_1("BeginMenuBar", BeginMenuBar);
    // IMGUI_API void          EndMenuBar();
    function EndMenuBar() { bind.EndMenuBar(); }
    exports_1("EndMenuBar", EndMenuBar);
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    function BeginMenu(label, enabled = true) { return bind.BeginMenu(label, enabled); }
    exports_1("BeginMenu", BeginMenu);
    // IMGUI_API void          EndMenu();
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
    // Popups
    // IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
    function OpenPopup(str_id) { bind.OpenPopup(str_id); }
    exports_1("OpenPopup", OpenPopup);
    // IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
    function OpenPopupOnItemClick(str_id = null, mouse_button = 1) {
        return bind.OpenPopupOnItemClick(str_id, mouse_button);
    }
    exports_1("OpenPopupOnItemClick", OpenPopupOnItemClick);
    // IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
    function BeginPopup(str_id) { return bind.BeginPopup(str_id); }
    exports_1("BeginPopup", BeginPopup);
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
    // IMGUI_API void          EndPopup();
    function EndPopup() { bind.EndPopup(); }
    exports_1("EndPopup", EndPopup);
    // IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
    function IsPopupOpen(str_id) { return bind.IsPopupOpen(str_id); }
    exports_1("IsPopupOpen", IsPopupOpen);
    // IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
    function CloseCurrentPopup() { bind.CloseCurrentPopup(); }
    exports_1("CloseCurrentPopup", CloseCurrentPopup);
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
    // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
    function LogFinish() { bind.LogFinish(); }
    exports_1("LogFinish", LogFinish);
    // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
    function LogButtons() { bind.LogButtons(); }
    exports_1("LogButtons", LogButtons);
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    function LogText(fmt) {
        bind.LogText(fmt);
    }
    exports_1("LogText", LogText);
    // Drag and Drop
    // [BETA API] Missing Demo code. API may evolve.
    // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
    function BeginDragDropSource(flags = 0, mouse_button = 0) {
        return bind.BeginDragDropSource(flags);
    }
    exports_1("BeginDragDropSource", BeginDragDropSource);
    // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
    function SetDragDropPayload(type, data, cond = 0) {
        return bind.SetDragDropPayload(type, data, 0, cond);
    }
    exports_1("SetDragDropPayload", SetDragDropPayload);
    // IMGUI_API void          EndDragDropSource();
    function EndDragDropSource() {
        bind.EndDragDropSource();
    }
    exports_1("EndDragDropSource", EndDragDropSource);
    // IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
    function BeginDragDropTarget() {
        return bind.BeginDragDropTarget();
    }
    exports_1("BeginDragDropTarget", BeginDragDropTarget);
    // IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
    function AcceptDragDropPayload(type, flags = 0) {
        return bind.AcceptDragDropPayload(type, flags);
    }
    exports_1("AcceptDragDropPayload", AcceptDragDropPayload);
    // IMGUI_API void          EndDragDropTarget();
    function EndDragDropTarget() {
        bind.EndDragDropTarget();
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
    // Focus
    // (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
    // (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
    // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
    function SetItemDefaultFocus() { bind.SetItemDefaultFocus(); }
    exports_1("SetItemDefaultFocus", SetItemDefaultFocus);
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
    // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
    function IsItemActive() { return bind.IsItemActive(); }
    exports_1("IsItemActive", IsItemActive);
    // IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
    function IsItemFocused() { return bind.IsItemFocused(); }
    exports_1("IsItemFocused", IsItemFocused);
    // IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
    function IsItemClicked(mouse_button = 0) {
        return bind.IsItemClicked(mouse_button);
    }
    exports_1("IsItemClicked", IsItemClicked);
    // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
    function IsItemVisible() { return bind.IsItemVisible(); }
    exports_1("IsItemVisible", IsItemVisible);
    // IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
    function IsItemDeactivated() { return bind.IsItemDeactivated(); }
    exports_1("IsItemDeactivated", IsItemDeactivated);
    // IMGUI_API bool          IsItemDeactivatedAfterChange();                                     // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
    function IsItemDeactivatedAfterChange() { return bind.IsItemDeactivatedAfterChange(); }
    exports_1("IsItemDeactivatedAfterChange", IsItemDeactivatedAfterChange);
    // IMGUI_API bool          IsAnyItemHovered();
    function IsAnyItemHovered() { return bind.IsAnyItemHovered(); }
    exports_1("IsAnyItemHovered", IsAnyItemHovered);
    // IMGUI_API bool          IsAnyItemActive();
    function IsAnyItemActive() { return bind.IsAnyItemActive(); }
    exports_1("IsAnyItemActive", IsAnyItemActive);
    // IMGUI_API bool          IsAnyItemFocused();
    function IsAnyItemFocused() { return bind.IsAnyItemFocused(); }
    exports_1("IsAnyItemFocused", IsAnyItemFocused);
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
    // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
    function SetItemAllowOverlap() { bind.SetItemAllowOverlap(); }
    exports_1("SetItemAllowOverlap", SetItemAllowOverlap);
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
    // IMGUI_API float         GetTime();
    function GetTime() { return bind.GetTime(); }
    exports_1("GetTime", GetTime);
    // IMGUI_API int           GetFrameCount();
    function GetFrameCount() { return bind.GetFrameCount(); }
    exports_1("GetFrameCount", GetFrameCount);
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
    // IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
    function GetStyleColorName(idx) { return bind.GetStyleColorName(idx); }
    exports_1("GetStyleColorName", GetStyleColorName);
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    function CalcTextSize(text, text_end = null, hide_text_after_double_hash = false, wrap_width = -1, out = new ImVec2()) {
        return bind.CalcTextSize(text_end !== null ? text.substring(0, text_end) : text, hide_text_after_double_hash, wrap_width, out);
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
    // IMGUI_API void          EndChildFrame();
    function EndChildFrame() { bind.EndChildFrame(); }
    exports_1("EndChildFrame", EndChildFrame);
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
    // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
    function ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v) { bind.ColorConvertRGBtoHSV(r, g, b, out_h, out_s, out_v); }
    exports_1("ColorConvertRGBtoHSV", ColorConvertRGBtoHSV);
    // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
    function ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b) { bind.ColorConvertHSVtoRGB(h, s, v, out_r, out_g, out_b); }
    exports_1("ColorConvertHSVtoRGB", ColorConvertHSVtoRGB);
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
    // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
    function GetMouseCursor() { return bind.GetMouseCursor(); }
    exports_1("GetMouseCursor", GetMouseCursor);
    // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
    function SetMouseCursor(type) { bind.SetMouseCursor(type); }
    exports_1("SetMouseCursor", SetMouseCursor);
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
    // Clipboard Utilities (also see the LogToClipboard() function to capture or output text data to the clipboard)
    // IMGUI_API const char*   GetClipboardText();
    function GetClipboardText() { bind.GetClipboardText(); }
    exports_1("GetClipboardText", GetClipboardText);
    // IMGUI_API void          SetClipboardText(const char* text);
    function SetClipboardText(text) { bind.SetClipboardText(text); }
    exports_1("SetClipboardText", SetClipboardText);
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
    function SetAllocatorFunctions(alloc_func, free_func, user_data = null) {
        bind.SetAllocatorFunctions(alloc_func, free_func, user_data);
    }
    exports_1("SetAllocatorFunctions", SetAllocatorFunctions);
    // IMGUI_API void*         MemAlloc(size_t sz);
    function MemAlloc(sz) { bind.MemAlloc(sz); }
    exports_1("MemAlloc", MemAlloc);
    // IMGUI_API void          MemFree(void* ptr);
    function MemFree(ptr) { bind.MemFree(ptr); }
    exports_1("MemFree", MemFree);
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
            exports_1("IMGUI_VERSION", IMGUI_VERSION = "1.62"); // bind.IMGUI_VERSION;
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
            exports_1("ImGuiTextEditDefaultSize", ImGuiTextEditDefaultSize = 128);
            // Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
            ImGuiTextEditCallbackData = class ImGuiTextEditCallbackData {
                constructor(native, UserData) {
                    this.native = native;
                    this.UserData = UserData;
                }
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
                // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
                HasSelection() { return this.native.HasSelection(); }
            };
            exports_1("ImGuiTextEditCallbackData", ImGuiTextEditCallbackData);
            // Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
            // NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
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
                Begin(items_count, items_height = -1.0) {
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
                get ClipRect() { return this.native._get_ClipRect(); }
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
            exports_1("ImDrawIdxSize", ImDrawIdxSize = 2); // bind.ImDrawIdxSize;
            // Vertex layout
            // #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
            exports_1("ImDrawVertSize", ImDrawVertSize = 20); // bind.ImDrawVertSize;
            exports_1("ImDrawVertPosOffset", ImDrawVertPosOffset = 0); // bind.ImDrawVertPosOffset;
            exports_1("ImDrawVertUVOffset", ImDrawVertUVOffset = 8); // bind.ImDrawVertUVOffset;
            exports_1("ImDrawVertColOffset", ImDrawVertColOffset = 16); // bind.ImDrawVertColOffset;
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
                get DisplayPos() { return this.native._get_DisplayPos(); }
                // ImVec2          DisplaySize;            // Size of the viewport to render (== io.DisplaySize for the main viewport) (DisplayPos + DisplaySize == lower-right of the orthogonal projection matrix to use)
                get DisplaySize() { return this.native._get_DisplaySize(); }
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
                    // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
                    this.RasterizerFlags = 0;
                    // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
                    this.RasterizerMultiply = 1.0;
                    // [Internal]
                    // char            Name[32];                               // Name (strictly to ease debugging)
                    this.Name = "";
                    // IMGUI_API ImFontConfig();
                }
                _get_FontData() { return this.FontData; }
                _get_GlyphExtraSpacing() { return this.GlyphExtraSpacing; }
                _get_GlyphOffset() { return this.GlyphOffset; }
                // ImFont*         DstFont;
                _get_DstFont() { return null; }
            };
            exports_1("script_ImFontConfig", script_ImFontConfig);
            ImFontConfig = class ImFontConfig {
                constructor(internal = new script_ImFontConfig()) {
                    this.internal = internal;
                }
                // void*           FontData;                   //          // TTF/OTF data
                // int             FontDataSize;               //          // TTF/OTF data size
                get FontData() { return this.internal._get_FontData(); }
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
                get GlyphExtraSpacing() { return this.internal._get_GlyphExtraSpacing(); }
                // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
                get GlyphOffset() { return this.internal._get_GlyphOffset(); }
                // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
                get GlyphRanges() { return this.internal.GlyphRanges; }
                // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
                get GlyphMinAdvanceX() { return this.internal.GlyphMinAdvanceX; }
                // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
                get GlyphMaxAdvanceX() { return this.internal.GlyphMaxAdvanceX; }
                // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
                get MergeMode() { return this.internal.MergeMode; }
                // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
                get RasterizerFlags() { return this.internal.RasterizerFlags; }
                // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
                get RasterizerMultiply() { return this.internal.RasterizerMultiply; }
                // [Internal]
                // char            Name[32];                               // Name (strictly to ease debugging)
                get Name() { return this.internal.Name; }
                // ImFont*         DstFont;
                get DstFont() {
                    const font = this.internal._get_DstFont();
                    return font && new ImFont(font);
                }
            };
            exports_1("ImFontConfig", ImFontConfig);
            // struct ImFontGlyph
            script_ImFontGlyph = class script_ImFontGlyph {
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
            exports_1("script_ImFontGlyph", script_ImFontGlyph);
            ImFontGlyph = class ImFontGlyph {
                constructor(internal = new script_ImFontGlyph()) {
                    this.internal = internal;
                }
                // ImWchar         Codepoint;          // 0x0000..0xFFFF
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
                get TexUvScale() { return this.native._get_TexUvScale(); }
                // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
                get TexUvWhitePixel() { return this.native._get_TexUvWhitePixel(); }
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
                set Scale(value) { this.native.Scale = value; }
                // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
                get DisplayOffset() { return this.native._get_DisplayOffset(); }
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
                    const glyph = this.native._get_FallbackGlyph();
                    return glyph && new ImFontGlyph(glyph);
                }
                set FallbackGlyph(value) {
                    this.native._set_FallbackGlyph(value && value.internal);
                }
                // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
                get FallbackAdvanceX() { return this.native.FallbackAdvanceX; }
                // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
                get FallbackChar() { return this.native.FallbackChar; }
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
                _get_WindowPadding() { return this.WindowPadding; }
                _get_WindowMinSize() { return this.WindowMinSize; }
                _get_WindowTitleAlign() { return this.WindowTitleAlign; }
                _get_FramePadding() { return this.FramePadding; }
                _get_ItemSpacing() { return this.ItemSpacing; }
                _get_ItemInnerSpacing() { return this.ItemInnerSpacing; }
                _get_TouchExtraPadding() { return this.TouchExtraPadding; }
                _get_ButtonTextAlign() { return this.ButtonTextAlign; }
                _get_DisplayWindowPadding() { return this.DisplayWindowPadding; }
                _get_DisplaySafeAreaPadding() { return this.DisplaySafeAreaPadding; }
                _getAt_Colors(index) { return this.Colors[index]; }
                _setAt_Colors(index, color) { this.Colors[index].Copy(color); return true; }
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
                get WindowPadding() { return this.internal._get_WindowPadding(); }
                get WindowRounding() { return this.internal.WindowRounding; }
                set WindowRounding(value) { this.internal.WindowRounding = value; }
                get WindowBorderSize() { return this.internal.WindowBorderSize; }
                set WindowBorderSize(value) { this.internal.WindowBorderSize = value; }
                get WindowMinSize() { return this.internal._get_WindowMinSize(); }
                get WindowTitleAlign() { return this.internal._get_WindowTitleAlign(); }
                get ChildRounding() { return this.internal.ChildRounding; }
                set ChildRounding(value) { this.internal.ChildRounding = value; }
                get ChildBorderSize() { return this.internal.ChildBorderSize; }
                set ChildBorderSize(value) { this.internal.ChildBorderSize = value; }
                get PopupRounding() { return this.internal.PopupRounding; }
                set PopupRounding(value) { this.internal.PopupRounding = value; }
                get PopupBorderSize() { return this.internal.PopupBorderSize; }
                set PopupBorderSize(value) { this.internal.PopupBorderSize = value; }
                get FramePadding() { return this.internal._get_FramePadding(); }
                get FrameRounding() { return this.internal.FrameRounding; }
                set FrameRounding(value) { this.internal.FrameRounding = value; }
                get FrameBorderSize() { return this.internal.FrameBorderSize; }
                set FrameBorderSize(value) { this.internal.FrameBorderSize = value; }
                get ItemSpacing() { return this.internal._get_ItemSpacing(); }
                get ItemInnerSpacing() { return this.internal._get_ItemInnerSpacing(); }
                get TouchExtraPadding() { return this.internal._get_TouchExtraPadding(); }
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
                get ButtonTextAlign() { return this.internal._get_ButtonTextAlign(); }
                get DisplayWindowPadding() { return this.internal._get_DisplayWindowPadding(); }
                get DisplaySafeAreaPadding() { return this.internal._get_DisplaySafeAreaPadding(); }
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
                    //------------------------------------------------------------------
                    // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
                    //------------------------------------------------------------------
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
                get DisplaySize() { return this.native._get_DisplaySize(); }
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
                get Fonts() { return new ImFontAtlas(this.native._get_Fonts()); }
                // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
                get FontGlobalScale() { return this.native.FontGlobalScale; }
                set FontGlobalScale(value) { this.native.FontGlobalScale = value; }
                // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
                get FontAllowUserScaling() { return this.native.FontAllowUserScaling; }
                set FontAllowUserScaling(value) { this.native.FontAllowUserScaling = value; }
                // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
                get FontDefault() {
                    const font = this.native._get_FontDefault();
                    return (font === null) ? null : new ImFont(font);
                }
                set FontDefault(value) {
                    this.native._set_FontDefault(value && value.native);
                }
                // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
                get DisplayFramebufferScale() { return this.native._get_DisplayFramebufferScale(); }
                // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
                get DisplayVisibleMin() { return this.native._get_DisplayVisibleMin(); }
                // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize
                get DisplayVisibleMax() { return this.native._get_DisplayVisibleMax(); }
                // Advanced/subtle behaviors
                // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
                get OptMacOSXBehaviors() { return this.native.OptMacOSXBehaviors; }
                set OptMacOSXBehaviors(value) { this.native.OptMacOSXBehaviors = value; }
                // bool          OptCursorBlink;           // = true               // Enable blinking cursor, for users who consider it annoying.
                get OptCursorBlink() { return this.native.OptCursorBlink; }
                set OptCursorBlink(value) { this.native.OptCursorBlink = value; }
                //------------------------------------------------------------------
                // Settings (User Functions)
                //------------------------------------------------------------------
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
                get MousePos() { return this.native._get_MousePos(); }
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
                // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
                get InputCharacters() { return this.native.InputCharacters; }
                // Functions
                // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
                AddInputCharacter(c) { this.native.AddInputCharacter(c); }
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
                // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
                get MetricsActiveWindows() { return this.native.MetricsActiveWindows; }
                // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
                get MouseDelta() { return this.native._get_MouseDelta(); }
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWd1aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFJQSxtQkFBOEIsS0FBNEI7O1lBQ3RELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFtQixFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBa0IsRUFBUSxFQUFFO29CQUNsRCxrQkFBQSxJQUFJLEdBQUcsS0FBSyxFQUFDO29CQUNiLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7O0lBT0Qsb0xBQW9MO0lBQ3BMLGdDQUFnRCxPQUFPLDhCQUE4QixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRXJNLG1CQUEwQixLQUF1QixJQUFVLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFBRSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7S0FBRSxDQUFDLENBQUM7O0lBRS9GLHNCQUE2QixJQUFxQztRQUM5RCxJQUFJLElBQUksWUFBWSxjQUFjLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7SUFDTCxDQUFDOztJQTJ3QkQsa0JBQXlCLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksR0FBRztRQUNyRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJ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