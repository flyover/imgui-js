// dear imgui, v1.71
// (demo code)
System.register(["./imgui"], function (exports_1, context_1) {
    "use strict";
    var ImGui, imgui_1, imgui_2, imgui_3, imgui_4, imgui_5, imgui_6, imgui_7, imgui_8, imgui_9, imgui_10, imgui_11, imgui_12, imgui_13, imgui_14, imgui_15, imgui_16, imgui_17, imgui_18, imgui_19, imgui_20, imgui_21, imgui_22, imgui_23, imgui_24, imgui_25, imgui_26, imgui_27, IM_NEWLINE, Static, _static, done, ExampleAppConsole, ExampleAppLog;
    var __moduleName = context_1 && context_1.id;
    // #ifdef _MSC_VER
    // #pragma warning (disable: 4996) // 'This function or variable may be unsafe': strcpy, strdup, sprintf, vsnprintf, sscanf, fopen
    // #define snprintf _snprintf
    // #endif
    // #ifdef __clang__
    // #pragma clang diagnostic ignored "-Wold-style-cast"             // warning : use of old-style cast                              // yes, they are more terse.
    // #pragma clang diagnostic ignored "-Wdeprecated-declarations"    // warning : 'xx' is deprecated: The POSIX name for this item.. // for strdup used in demo code (so user can copy & paste the code)
    // #pragma clang diagnostic ignored "-Wint-to-void-pointer-cast"   // warning : cast to 'void *' from smaller integer type 'int'
    // #pragma clang diagnostic ignored "-Wformat-security"            // warning : warning: format string is not a string literal
    // #pragma clang diagnostic ignored "-Wexit-time-destructors"      // warning : declaration requires an exit-time destructor       // exit-time destruction order is undefined. if MemFree() leads to users code that has been disabled before exit it might cause problems. ImGui coding style welcomes static/globals.
    // #if __has_warning("-Wreserved-id-macro")
    // #pragma clang diagnostic ignored "-Wreserved-id-macro"          // warning : macro name is a reserved identifier                //
    // #endif
    // #elif defined(__GNUC__)
    // #pragma GCC diagnostic ignored "-Wint-to-pointer-cast"          // warning: cast to pointer from integer of different size
    // #pragma GCC diagnostic ignored "-Wformat-security"              // warning : format string is not a string literal (potentially insecure)
    // #pragma GCC diagnostic ignored "-Wdouble-promotion"             // warning: implicit conversion from 'float' to 'double' when passing argument to function
    // #pragma GCC diagnostic ignored "-Wconversion"                   // warning: conversion to 'xxxx' from 'xxxx' may alter its value
    // #if (__GNUC__ >= 6)
    // #pragma GCC diagnostic ignored "-Wmisleading-indentation"       // warning: this 'if' clause does not guard this statement      // GCC 6.0+ only. See #883 on GitHub.
    // #endif
    // #endif
    function format_number(n, radix = 10, pad = 0, pad_char = "0") {
        return pad > 0 ? (pad_char.repeat(pad) + n.toString(radix)).substr(-pad) : n.toString(radix);
    }
    function format_number_dec(n, pad = 0, pad_char = "0") {
        return format_number(n, 10, pad, pad_char);
    }
    function format_number_hex(n, pad = 0, pad_char = "0") {
        return format_number(n, 16, pad, pad_char);
    }
    // #define IM_MAX(_A,_B)       (((_A) >= (_B)) ? (_A) : (_B))
    function IM_MAX(_A, _B) { return ((_A) >= (_B)) ? (_A) : (_B); }
    function STATIC(key, value) {
        return _static[key] || (_static[key] = new Static(value));
    }
    // Forward Declarations
    // static void ShowExampleAppDocuments(bool* p_open);
    // static void ShowExampleAppMainMenuBar();
    // static void ShowExampleAppConsole(bool* p_open);
    // static void ShowExampleAppLog(bool* p_open);
    // static void ShowExampleAppLayout(bool* p_open);
    // static void ShowExampleAppPropertyEditor(bool* p_open);
    // static void ShowExampleAppLongText(bool* p_open);
    // static void ShowExampleAppAutoResize(bool* p_open);
    // static void ShowExampleAppConstrainedResize(bool* p_open);
    // static void ShowExampleAppSimpleOverlay(bool* p_open);
    // static void ShowExampleAppWindowTitles(bool* p_open);
    // static void ShowExampleAppCustomRendering(bool* p_open);
    // static void ShowExampleMenuFile();
    // Helper to display a little (?) mark which shows a tooltip when hovered.
    // In your own code you may want to display an actual icon if you are using a merged icon fonts (see misc/fonts/README.txt)
    function HelpMarker(desc) {
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted(desc);
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    // Helper to display basic user controls.
    function ShowUserGuide() {
        const io = ImGui.GetIO();
        ImGui.BulletText("Double-click on title bar to collapse window.");
        ImGui.BulletText("Click and drag on lower right corner to resize window\n(double-click to auto fit window to its contents).");
        ImGui.BulletText("Click and drag on any empty space to move window.");
        ImGui.BulletText("TAB/SHIFT+TAB to cycle through keyboard editable fields.");
        ImGui.BulletText("CTRL+Click on a slider or drag box to input value as text.");
        if (io.FontAllowUserScaling)
            ImGui.BulletText("CTRL+Mouse Wheel to zoom window contents.");
        ImGui.BulletText("Mouse Wheel to scroll.");
        ImGui.BulletText("While editing text:\n");
        ImGui.Indent();
        ImGui.BulletText("Hold SHIFT or use mouse to select text.");
        ImGui.BulletText("CTRL+Left/Right to word jump.");
        ImGui.BulletText("CTRL+A or double-click to select all.");
        ImGui.BulletText("CTRL+X,CTRL+C,CTRL+V to use clipboard.");
        ImGui.BulletText("CTRL+Z,CTRL+Y to undo/redo.");
        ImGui.BulletText("ESCAPE to revert.");
        ImGui.BulletText("You can apply arithmetic operators +,*,/ on numerical values.\nUse +- to subtract.");
        ImGui.Unindent();
    }
    exports_1("ShowUserGuide", ShowUserGuide);
    //-----------------------------------------------------------------------------
    // [SECTION] Demo Window / ShowDemoWindow()
    //-----------------------------------------------------------------------------
    // We split the contents of the big ShowDemoWindow() function into smaller functions (because the link time of very large functions grow non-linearly)
    // static void ShowDemoWindowWidgets();
    // static void ShowDemoWindowLayout();
    // static void ShowDemoWindowPopups();
    // static void ShowDemoWindowColumns();
    // static void ShowDemoWindowMisc();
    // Demonstrate most Dear ImGui features (this is big function!)
    // You may execute this function to experiment with the UI and understand what it does. You may then search for keywords in the code when you are interested by a specific feature.
    function ShowDemoWindow(p_open = null) {
        done = false;
        // IM_ASSERT(ImGui.GetCurrentContext() !== null && "Missing dear imgui context. Refer to examples app!"); // Exceptionally add an extra assert here for people confused with initial dear imgui setup
        // Examples Apps (accessible from the "Examples" menu)
        /* static */ const show_app_documents = STATIC("show_app_documents", false);
        /* static */ const show_app_main_menu_bar = STATIC("show_app_main_menu_bar", false);
        /* static */ const show_app_console = STATIC("show_app_console", false);
        /* static */ const show_app_log = STATIC("show_app_log", false);
        /* static */ const show_app_layout = STATIC("show_app_layout", false);
        /* static */ const show_app_property_editor = STATIC("show_app_property_editor", false);
        /* static */ const show_app_long_text = STATIC("show_app_long_text", false);
        /* static */ const show_app_auto_resize = STATIC("show_app_auto_resize", false);
        /* static */ const show_app_constrained_resize = STATIC("show_app_constrained_resize", false);
        /* static */ const show_app_simple_overlay = STATIC("show_app_simple_overlay", false);
        /* static */ const show_app_window_titles = STATIC("show_app_window_titles", false);
        /* static */ const show_app_custom_rendering = STATIC("show_app_custom_rendering", false);
        /* static */ const show_backend_checker_window = STATIC("show_backend_checker_window", false);
        if (show_app_documents.value)
            ShowExampleAppDocuments((value = show_app_documents.value) => show_app_documents.value = value);
        if (show_app_main_menu_bar.value)
            ShowExampleAppMainMenuBar();
        if (show_app_console.value)
            ShowExampleAppConsole((value = show_app_console.value) => show_app_console.value = value);
        if (show_app_log.value)
            ShowExampleAppLog((value = show_app_log.value) => show_app_log.value = value);
        if (show_app_layout.value)
            ShowExampleAppLayout((value = show_app_layout.value) => show_app_layout.value = value);
        if (show_app_property_editor.value)
            ShowExampleAppPropertyEditor((value = show_app_property_editor.value) => show_app_property_editor.value = value);
        if (show_app_long_text.value)
            ShowExampleAppLongText((value = show_app_long_text.value) => show_app_long_text.value = value);
        if (show_app_auto_resize.value)
            ShowExampleAppAutoResize((value = show_app_auto_resize.value) => show_app_auto_resize.value = value);
        if (show_app_constrained_resize.value)
            ShowExampleAppConstrainedResize((value = show_app_constrained_resize.value) => show_app_constrained_resize.value = value);
        if (show_app_simple_overlay.value)
            ShowExampleAppSimpleOverlay((value = show_app_simple_overlay.value) => show_app_simple_overlay.value = value);
        if (show_app_window_titles.value)
            ShowExampleAppWindowTitles((value = show_app_window_titles.value) => show_app_window_titles.value = value);
        if (show_app_custom_rendering.value)
            ShowExampleAppCustomRendering((value = show_app_custom_rendering.value) => show_app_custom_rendering.value = value);
        if (show_backend_checker_window.value)
            ShowBackendCheckerWindow((value = show_backend_checker_window.value) => show_backend_checker_window.value = value);
        // Dear ImGui Apps (accessible from the "Help" menu)
        /* static */ const show_app_style_editor = STATIC("show_app_style_editor", false);
        /* static */ const show_app_metrics = STATIC("show_app_metrics", false);
        /* static */ const show_app_about = STATIC("show_app_about", false);
        if (show_app_metrics.value) {
            ImGui.ShowMetricsWindow((value = show_app_metrics.value) => show_app_metrics.value = value);
        }
        if (show_app_style_editor.value) {
            ImGui.Begin("Style Editor", (value = show_app_style_editor.value) => show_app_style_editor.value = value); /*ImGui.*/
            ShowStyleEditor();
            ImGui.End();
        }
        if (show_app_about.value) {
            ShowAboutWindow((value = show_app_about.value) => show_app_about.value = value);
        }
        // Demonstrate the various window flags. Typically you would just use the default!
        /* static */ const no_titlebar = STATIC("no_titlebar", false);
        /* static */ const no_scrollbar = STATIC("no_scrollbar", false);
        /* static */ const no_menu = STATIC("no_menu", false);
        /* static */ const no_move = STATIC("no_move", false);
        /* static */ const no_resize = STATIC("no_resize", false);
        /* static */ const no_collapse = STATIC("no_collapse", false);
        /* static */ const no_close = STATIC("no_close", false);
        /* static */ const no_nav = STATIC("no_nav", false);
        /* static */ const no_background = STATIC("no_background", false);
        /* static */ const no_bring_to_front = STATIC("no_bring_to_front", false);
        let window_flags = 0;
        if (no_titlebar.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoTitleBar;
        if (no_scrollbar.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoScrollbar;
        if (!no_menu.value)
            window_flags |= imgui_15.ImGuiWindowFlags.MenuBar;
        if (no_move.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoMove;
        if (no_resize.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoResize;
        if (no_collapse.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoCollapse;
        if (no_nav.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoNav;
        if (no_background.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoBackground;
        if (no_bring_to_front.value)
            window_flags |= imgui_15.ImGuiWindowFlags.NoBringToFrontOnFocus;
        if (no_close.value)
            p_open = null; // Don't pass our bool* to Begin
        // We specify a default position/size in case there's no data in the .ini file. Typically this isn't required! We only do it to make the Demo applications a little more welcoming.
        ImGui.SetNextWindowPos(new imgui_19.ImVec2(650, 20), ImGui.Cond.FirstUseEver);
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(550, 680), imgui_7.ImGuiCond.FirstUseEver);
        // Main body of the Demo window starts here.
        if (!ImGui.Begin("Dear ImGui Demo", p_open, window_flags)) {
            // Early out if the window is collapsed, as an optimization.
            ImGui.End();
            return done;
        }
        // Most "big" widgets share a common width settings by default.
        //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // Use 2/3 of the space for widgets and 1/3 for labels (default)
        ImGui.PushItemWidth(ImGui.GetFontSize() * -12); // Use fixed width for labels (by passing a negative value), the rest goes to widgets. We choose a width proportional to our font size.
        // Menu Bar
        if (ImGui.BeginMenuBar()) {
            if (ImGui.BeginMenu("Menu")) {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            if (ImGui.BeginMenu("Examples")) {
                ImGui.MenuItem("Main menu bar", null, (value = show_app_main_menu_bar.value) => show_app_main_menu_bar.value = value);
                ImGui.MenuItem("Console", null, (value = show_app_console.value) => show_app_console.value = value);
                ImGui.MenuItem("Log", null, (value = show_app_log.value) => show_app_log.value = value);
                ImGui.MenuItem("Simple layout", null, (value = show_app_layout.value) => show_app_layout.value = value);
                ImGui.MenuItem("Property editor", null, (value = show_app_property_editor.value) => show_app_property_editor.value = value);
                ImGui.MenuItem("Long text display", null, (value = show_app_long_text.value) => show_app_long_text.value = value);
                ImGui.MenuItem("Auto-resizing window", null, (value = show_app_auto_resize.value) => show_app_auto_resize.value = value);
                ImGui.MenuItem("Constrained-resizing window", null, (value = show_app_constrained_resize.value) => show_app_constrained_resize.value = value);
                ImGui.MenuItem("Simple overlay", null, (value = show_app_simple_overlay.value) => show_app_simple_overlay.value = value);
                ImGui.MenuItem("Manipulating window titles", null, (value = show_app_window_titles.value) => show_app_window_titles.value = value);
                ImGui.MenuItem("Custom rendering", null, (value = show_app_custom_rendering.value) => show_app_custom_rendering.value = value);
                ImGui.MenuItem("Documents", null, (value = show_app_documents.value) => show_app_documents.value = value);
                ImGui.MenuItem("Backend-checker window", null, (value = show_backend_checker_window.value) => show_backend_checker_window.value = value);
                ImGui.EndMenu();
            }
            if (ImGui.BeginMenu("Help")) {
                ImGui.MenuItem("Metrics", null, (value = show_app_metrics.value) => show_app_metrics.value = value);
                ImGui.MenuItem("Style Editor", null, (value = show_app_style_editor.value) => show_app_style_editor.value = value);
                ImGui.MenuItem("About Dear ImGui", null, (value = show_app_about.value) => show_app_about.value = value);
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }
        ImGui.Text(`dear imgui says hello. (${imgui_1.IMGUI_VERSION})`);
        ImGui.Spacing();
        if (ImGui.CollapsingHeader("Help")) {
            ImGui.Text("PROGRAMMER GUIDE:");
            ImGui.BulletText("Please see the ShowDemoWindow() code in imgui_demo.cpp. <- you are here!");
            ImGui.BulletText("Please see the comments in imgui.cpp.");
            ImGui.BulletText("Please see the examples/ in application.");
            ImGui.BulletText("Enable 'io.ConfigFlags |= NavEnableKeyboard' for keyboard controls.");
            ImGui.BulletText("Enable 'io.ConfigFlags |= NavEnableGamepad' for gamepad controls.");
            ImGui.Separator();
            ImGui.Text("USER GUIDE:");
            /*ImGui.*/ ShowUserGuide();
        }
        if (ImGui.CollapsingHeader("Configuration")) {
            const io = ImGui.GetIO();
            if (ImGui.TreeNode("Configuration##2")) {
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableKeyboard", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableKeyboard);
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableGamepad", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableGamepad);
                ImGui.SameLine();
                HelpMarker("Required back-end to feed in gamepad inputs in io.NavInputs[] and set io.BackendFlags |= ImGuiBackendFlags_HasGamepad.\n\nRead instructions in imgui.cpp for details.");
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableSetMousePos);
                ImGui.SameLine();
                HelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGuiConfigFlags_NavEnableSetMousePos.");
                ImGui.CheckboxFlags("io.ConfigFlags: NoMouse", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NoMouse);
                if (io.ConfigFlags & ImGui.ConfigFlags.NoMouse) // Create a way to restore this flag otherwise we could be stuck completely!
                 {
                    if ((ImGui.GetTime() % 0.40) < 0.20) {
                        ImGui.SameLine();
                        ImGui.Text("<<PRESS SPACE TO DISABLE>>");
                    }
                    if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.Space)))
                        io.ConfigFlags &= ~ImGui.ConfigFlags.NoMouse;
                }
                ImGui.CheckboxFlags("io.ConfigFlags: NoMouseCursorChange", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NoMouseCursorChange);
                ImGui.SameLine();
                HelpMarker("Instruct back-end to not alter mouse cursor shape and visibility.");
                ImGui.Checkbox("io.ConfigInputTextCursorBlink", (value = io.ConfigInputTextCursorBlink) => io.ConfigInputTextCursorBlink = value);
                ImGui.SameLine();
                HelpMarker("Set to false to disable blinking cursor, for users who consider it distracting");
                ImGui.Checkbox("io.ConfigWindowsResizeFromEdges [beta]", (value = io.ConfigWindowsResizeFromEdges) => io.ConfigWindowsResizeFromEdges = value);
                ImGui.SameLine();
                HelpMarker("Enable resizing of windows from their edges and from the lower-left corner.\nThis requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback.");
                ImGui.Checkbox("io.ConfigWindowsMoveFromTitleBarOnly", (value = io.ConfigWindowsMoveFromTitleBarOnly) => io.ConfigWindowsMoveFromTitleBarOnly = value);
                ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
                ImGui.SameLine();
                HelpMarker("Instruct Dear ImGui to render a mouse cursor for you. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
                ImGui.TreePop();
                ImGui.Separator();
            }
            if (ImGui.TreeNode("Backend Flags")) {
                HelpMarker("Those flags are set by the back-ends (imgui_impl_xxx files) to specify their capabilities.");
                let backend_flags = io.BackendFlags; // Make a local copy to avoid modifying the back-end flags.
                ImGui.CheckboxFlags("io.BackendFlags: HasGamepad", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasGamepad);
                ImGui.CheckboxFlags("io.BackendFlags: HasMouseCursors", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasMouseCursors);
                ImGui.CheckboxFlags("io.BackendFlags: HasSetMousePos", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasSetMousePos);
                ImGui.CheckboxFlags("io.BackendFlags: RendererHasVtxOffset", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.RendererHasVtxOffset);
                ImGui.TreePop();
                ImGui.Separator();
            }
            if (ImGui.TreeNode("Style")) {
                /*ImGui.*/ ShowStyleEditor();
                ImGui.TreePop();
                ImGui.Separator();
            }
            if (ImGui.TreeNode("Capture/Logging")) {
                ImGui.TextWrapped("The logging API redirects all text output so you can easily capture the content of a window or a block. Tree nodes can be automatically expanded.");
                HelpMarker("Try opening any of the contents below in this window and then click one of the \"Log To\" button.");
                ImGui.LogButtons();
                ImGui.TextWrapped("You can also call ImGui.LogText() to output directly to the log without a visual output.");
                if (ImGui.Button("Copy \"Hello, world!\" to clipboard")) {
                    ImGui.LogToClipboard();
                    ImGui.LogText("Hello, world!");
                    ImGui.LogFinish();
                }
                ImGui.TreePop();
            }
        }
        if (ImGui.CollapsingHeader("Window options")) {
            ImGui.Checkbox("No titlebar", (value = no_titlebar.value) => no_titlebar.value = value);
            ImGui.SameLine(150);
            ImGui.Checkbox("No scrollbar", (value = no_scrollbar.value) => no_scrollbar.value = value);
            ImGui.SameLine(300);
            ImGui.Checkbox("No menu", (value = no_menu.value) => no_menu.value = value);
            ImGui.Checkbox("No move", (value = no_move.value) => no_move.value = value);
            ImGui.SameLine(150);
            ImGui.Checkbox("No resize", (value = no_resize.value) => no_resize.value = value);
            ImGui.SameLine(300);
            ImGui.Checkbox("No collapse", (value = no_collapse.value) => no_collapse.value = value);
            ImGui.Checkbox("No close", (value = no_close.value) => no_close.value = value);
            ImGui.SameLine(150);
            ImGui.Checkbox("No nav", (value = no_nav.value) => no_nav.value = value);
            ImGui.SameLine(300);
            ImGui.Checkbox("No background", (value = no_background.value) => no_background.value = value);
            ImGui.Checkbox("No bring to front", (value = no_bring_to_front.value) => no_bring_to_front.value = value);
        }
        // All demo contents
        ShowDemoWindowWidgets();
        ShowDemoWindowLayout();
        ShowDemoWindowPopups();
        ShowDemoWindowColumns();
        ShowDemoWindowMisc();
        // End of ShowDemoWindow()
        ImGui.End();
        return done;
    }
    exports_1("ShowDemoWindow", ShowDemoWindow);
    function ShowDemoWindowWidgets() {
        if (!ImGui.CollapsingHeader("Widgets"))
            return;
        if (ImGui.TreeNode("Basic")) {
            /* static */ const clicked = STATIC("clicked", 0);
            if (ImGui.Button("Button"))
                clicked.value++;
            if (clicked.value & 1) {
                ImGui.SameLine();
                ImGui.Text("Thanks for clicking me!");
            }
            /* static */ const check = STATIC("check", true);
            ImGui.Checkbox("checkbox", (value = check.value) => check.value = value);
            /* static */ const e = STATIC("e", 0);
            ImGui.RadioButton("radio a", (value = e.value) => e.value = value, 0);
            ImGui.SameLine();
            ImGui.RadioButton("radio b", (value = e.value) => e.value = value, 1);
            ImGui.SameLine();
            ImGui.RadioButton("radio c", (value = e.value) => e.value = value, 2);
            // Color buttons, demonstrate using PushID() to add unique identifier in the ID stack, and changing style.
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_22.ImColor.HSV(i / 7.0, 0.6, 0.6));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_22.ImColor.HSV(i / 7.0, 0.7, 0.7));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_22.ImColor.HSV(i / 7.0, 0.8, 0.8));
                ImGui.Button("Click");
                ImGui.PopStyleColor(3);
                ImGui.PopID();
            }
            // Use AlignTextToFramePadding() to align text baseline to the baseline of framed elements (otherwise a Text+SameLine+Button sequence will have the text a little too high by default)
            ImGui.AlignTextToFramePadding();
            ImGui.Text("Hold to repeat:");
            ImGui.SameLine();
            // Arrow buttons with Repeater
            /* static */ const counter = STATIC("counter", 0);
            const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
            ImGui.PushButtonRepeat(true);
            if (ImGui.ArrowButton("##left", imgui_27.ImGuiDir.Left)) {
                counter.value--;
            }
            ImGui.SameLine(0.0, spacing);
            if (ImGui.ArrowButton("##right", imgui_27.ImGuiDir.Right)) {
                counter.value++;
            }
            ImGui.PopButtonRepeat();
            ImGui.SameLine();
            ImGui.Text(`${counter.value}`);
            ImGui.Text("Hover over me");
            if (ImGui.IsItemHovered())
                ImGui.SetTooltip("I am a tooltip");
            ImGui.SameLine();
            ImGui.Text("- or me");
            if (ImGui.IsItemHovered()) {
                ImGui.BeginTooltip();
                ImGui.Text("I am a fancy tooltip");
                /* static */ const arr = STATIC("arr_", [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
                // ImGui.PlotLines("Curve", arr, IM_ARRAYSIZE(arr));
                ImGui.PlotLines("Curve", arr.value, imgui_3.IM_ARRAYSIZE(arr.value));
                ImGui.EndTooltip();
            }
            ImGui.Separator();
            ImGui.LabelText("label", "Value");
            {
                // Using the _simplified_ one-liner Combo() api here
                // See "Combo" section for examples of how to use the more complete BeginCombo()/EndCombo() api.
                const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO"];
                /* static */ const item_current = STATIC("item_current#389", 0);
                ImGui.Combo("combo", (value = item_current.value) => item_current.value = value, items, imgui_3.IM_ARRAYSIZE(items));
                ImGui.SameLine();
                HelpMarker("Refer to the \"Combo\" section below for an explanation of the full BeginCombo/EndCombo API, and demonstration of various flags.\n");
            }
            {
                /* static */ const str0 = STATIC("str0", new imgui_4.ImStringBuffer(128, "Hello, world!"));
                ImGui.InputText("input text", str0.value, imgui_3.IM_ARRAYSIZE(str0.value));
                ImGui.SameLine();
                HelpMarker("USER:\nHold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n\nPROGRAMMER:\nYou can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputText() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example (this is not demonstrated in imgui_demo.cpp).");
                /* static */ const str1 = STATIC("str1", new imgui_4.ImStringBuffer(128, ""));
                ImGui.InputTextWithHint("input text (w/ hint)", "enter text here", str1.value, imgui_3.IM_ARRAYSIZE(str1.value));
                /* static */ const i0 = STATIC("i0", 123);
                ImGui.InputInt("input int", (value = i0.value) => i0.value = value);
                ImGui.SameLine();
                HelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\nUse +- to subtract.\n");
                /* static */ const f0 = STATIC("f0#400", 0.001);
                ImGui.InputFloat("input float", (value = f0.value) => f0.value = value, 0.01, 1.0, "%.3f");
                /* static */ const d0 = STATIC("d0", 999999.000001);
                ImGui.InputDouble("input double", (value = d0.value) => d0.value = value, 0.01, 1.0, "%.8f");
                /* static */ const f1 = STATIC("f1#403", 1.e10);
                ImGui.InputFloat("input scientific", (value = f1.value) => f1.value = value, 0.0, 0.0, "%e");
                ImGui.SameLine();
                HelpMarker("You can input value using the scientific notation,\n  e.g. \"1e+8\" becomes \"100000000\".\n");
                /* static */ const vec4a = STATIC("vec4a", [0.10, 0.20, 0.30, 0.44]);
                ImGui.InputFloat3("input float3", vec4a.value);
            }
            {
                /* static */ const i1 = STATIC("i1#415", 50), i2 = STATIC("i2#415", 42);
                ImGui.DragInt("drag int", (value = i1.value) => i1.value = value, 1);
                ImGui.SameLine();
                HelpMarker("Click and drag to edit value.\nHold SHIFT/ALT for faster/slower edit.\nDouble-click or CTRL+click to input value.");
                ImGui.DragInt("drag int 0..100", (value = i2.value) => i2.value = value, 1, 0, 100, "%d%%");
                /* static */ const f1 = STATIC("f1#421", 1.00), f2 = STATIC("f2#421", 0.0067);
                ImGui.DragFloat("drag float", (value = f1.value) => f1.value = value, 0.005);
                ImGui.DragFloat("drag small float", (value = f2.value) => f2.value = value, 0.0001, 0.0, 0.0, "%.06f ns");
            }
            {
                /* static */ const i1 = STATIC("i1#427", 0);
                ImGui.SliderInt("slider int", (value = i1.value) => i1.value = value, -1, 3);
                ImGui.SameLine();
                HelpMarker("CTRL+click to input value.");
                /* static */ const f1 = STATIC("f1#427", 0.123), f2 = STATIC("f2#427", 0.0);
                ImGui.SliderFloat("slider float", (value = f1.value) => f1.value = value, 0.0, 1.0, "ratio = %.3f");
                ImGui.SliderFloat("slider float (curve)", (value = f2.value) => f2.value = value, -10.0, 10.0, "%.4f", 2.0);
                /* static */ const angle = STATIC("angle", 0.0);
                ImGui.SliderAngle("slider angle", (value = angle.value) => angle.value = value);
                /* static */ const angle3 = STATIC("angle3", [0.0, 0.0, 0.0]);
                ImGui.SliderAngle3("slider angle3", angle3.value);
            }
            {
                /* static */ const col1 = STATIC("col1", [1.0, 0.0, 0.2]);
                /* static */ const col2 = STATIC("col2", [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit3("color 1", col1.value);
                ImGui.SameLine();
                HelpMarker("Click on the colored square to open a color picker.\nClick and hold to use drag and drop.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");
                ImGui.ColorEdit4("color 2", col2.value);
            }
            {
                // List box
                const listbox_items = ["Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"];
                /* static */ const listbox_item_current = STATIC("listbox_item_current", 1);
                ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, imgui_3.IM_ARRAYSIZE(listbox_items), 4);
                // /* static */ const listbox_item_current2: Static<number> = STATIC("listbox_item_current2", 2);
                // ImGui.SetNextItemWidth(-1);
                // ImGui.ListBox("##listbox2", (value = listbox_item_current2.value) => listbox_item_current2.value = value, listbox_items, IM_ARRAYSIZE(listbox_items), 4);
            }
            ImGui.TreePop();
        }
        // Testing ImGuiOnceUponAFrame helper.
        //static ImGuiOnceUponAFrame once;
        //for (let i = 0; i < 5; i++)
        //    if (once)
        //        ImGui.Text("This will be displayed only once.");
        if (ImGui.TreeNode("Trees")) {
            if (ImGui.TreeNode("Basic trees")) {
                for (let i = 0; i < 5; i++) {
                    // Use SetNextItemOpen() so set the default state of a node to be open.
                    // We could also use TreeNodeEx() with the ImGuiTreeNodeFlags_DefaultOpen flag to achieve the same thing!
                    if (i == 0)
                        ImGui.SetNextItemOpen(true, imgui_7.ImGuiCond.Once);
                    if (ImGui.TreeNode(i.toString(), `Child ${i}`)) {
                        ImGui.Text("blah blah");
                        ImGui.SameLine();
                        if (ImGui.SmallButton("button")) { }
                        ImGui.TreePop();
                    }
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Advanced, with Selectable nodes")) {
                HelpMarker("This is a more typical looking tree with selectable nodes.\nClick to select, CTRL+Click to toggle, click on arrows or double-click to open.");
                /* static */ const align_label_with_current_x_position = STATIC("align_label_with_current_x_position", false);
                ImGui.Checkbox("Align label with current X position)", (value = align_label_with_current_x_position.value) => align_label_with_current_x_position.value = value);
                ImGui.Text("Hello!");
                if (align_label_with_current_x_position.value)
                    ImGui.Unindent(ImGui.GetTreeNodeToLabelSpacing());
                /* static */ const selection_mask = STATIC("selection_mask", (1 << 2)); // Dumb representation of what may be user-side selection state. You may carry selection state inside or outside your objects in whatever format you see fit.
                let node_clicked = -1; // Temporary storage of what node we have clicked to process selection at the end of the loop. May be a pointer to your own node type, etc.
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.IndentSpacing, ImGui.GetFontSize() * 3); // Increase spacing to differentiate leaves from expanded contents.
                for (let i = 0; i < 6; i++) {
                    // Disable the default open on single-click behavior and pass in Selected flag according to our selection state.
                    let node_flags = imgui_14.ImGuiTreeNodeFlags.OpenOnArrow | imgui_14.ImGuiTreeNodeFlags.OpenOnDoubleClick;
                    if (selection_mask.value & (1 << i))
                        node_flags |= imgui_14.ImGuiTreeNodeFlags.Selected;
                    if (i < 3) {
                        // Items 0..2 are Tree Node
                        const node_open = ImGui.TreeNodeEx(i, node_flags, `Selectable Node ${i}`);
                        if (ImGui.IsItemClicked())
                            node_clicked = i;
                        if (node_open) {
                            ImGui.Text("Blah blah\nBlah Blah");
                            ImGui.TreePop();
                        }
                    }
                    else {
                        // Items 3..5 are Tree Leaves
                        // The only reason we use TreeNode at all is to allow selection of the leaf.
                        // Otherwise we can use BulletText() or TreeAdvanceToLabelPos()+Text().
                        node_flags |= imgui_14.ImGuiTreeNodeFlags.Leaf | imgui_14.ImGuiTreeNodeFlags.NoTreePushOnOpen; // ImGuiTreeNodeFlags.Bullet
                        ImGui.TreeNodeEx(i, node_flags, `Selectable Leaf ${i}`);
                        if (ImGui.IsItemClicked())
                            node_clicked = i;
                    }
                }
                if (node_clicked !== -1) {
                    // Update selection state. Process outside of tree loop to avoid visual inconsistencies during the clicking-frame.
                    if (ImGui.GetIO().KeyCtrl)
                        selection_mask.value ^= (1 << node_clicked); // CTRL+click to toggle
                    else //if (!(selection_mask & (1 << node_clicked))) // Depending on selection behavior you want, this commented bit preserve selection when clicking on item that is part of the selection
                        selection_mask.value = (1 << node_clicked); // Click to single-select
                }
                ImGui.PopStyleVar();
                if (align_label_with_current_x_position.value)
                    ImGui.Indent(ImGui.GetTreeNodeToLabelSpacing());
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Collapsing Headers")) {
            /* static */ const closable_group = STATIC("closable_group", true);
            ImGui.Checkbox("Show 2nd header", (value = closable_group.value) => closable_group.value = value);
            if (ImGui.CollapsingHeader("Header")) {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`Some content ${i}`);
            }
            if (ImGui.CollapsingHeader("Header with a close button", (value = closable_group.value) => closable_group.value = value)) {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`More content ${i}`);
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Bullets")) {
            ImGui.BulletText("Bullet point 1");
            ImGui.BulletText("Bullet point 2\nOn multiple lines");
            ImGui.Bullet();
            ImGui.Text("Bullet point 3 (two calls)");
            ImGui.Bullet();
            ImGui.SmallButton("Button");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Text")) {
            if (ImGui.TreeNode("Colored Text")) {
                // Using shortcut. You can use PushStyleColor()/PopStyleColor() for more flexibility.
                ImGui.TextColored(new imgui_20.ImVec4(1.0, 0.0, 1.0, 1.0), "Pink");
                ImGui.TextColored(new imgui_20.ImVec4(1.0, 1.0, 0.0, 1.0), "Yellow");
                ImGui.TextDisabled("Disabled");
                ImGui.SameLine();
                HelpMarker("The TextDisabled color is stored in ImGuiStyle.");
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Word Wrapping")) {
                // Using shortcut. You can use PushTextWrapPos()/PopTextWrapPos() for more flexibility.
                ImGui.TextWrapped("This text should automatically wrap on the edge of the window. The current implementation for text wrapping follows simple rules suitable for English and possibly other languages.");
                ImGui.Spacing();
                /* static */ const wrap_width = STATIC("wrap_width", 200.0);
                ImGui.SliderFloat("Wrap width", (value = wrap_width.value) => wrap_width.value = value, -20, 600, "%.0f");
                ImGui.Text("Test paragraph 1:");
                let pos = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_19.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_19.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_21.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_21.IM_COL32(255, 255, 0, 255));
                ImGui.PopTextWrapPos();
                ImGui.Text("Test paragraph 2:");
                pos = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_19.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_19.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_21.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_21.IM_COL32(255, 255, 0, 255));
                ImGui.PopTextWrapPos();
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("UTF-8 Text")) {
                // UTF-8 test with Japanese characters
                // (Needs a suitable font, try Noto, or Arial Unicode, or M+ fonts. Read misc/fonts/README.txt for details.)
                // - From C++11 you can use the u8"my text" syntax to encode literal strings as UTF-8
                // - For earlier compiler, you may be able to encode your sources as UTF-8 (e.g. Visual Studio save your file as 'UTF-8 without signature')
                // - FOR THIS DEMO FILE ONLY, BECAUSE WE WANT TO SUPPORT OLD COMPILERS, WE ARE *NOT* INCLUDING RAW UTF-8 CHARACTERS IN THIS SOURCE FILE.
                //   Instead we are encoding a few strings with hexadecimal constants. Don't do this in your application!
                //   Please use u8"text in any language" in your application!
                // Note that characters values are preserved even by InputText() if the font cannot be displayed, so you can safely copy & paste garbled characters into another application.
                ImGui.TextWrapped("CJK text will only appears if the font was loaded with the appropriate CJK character ranges. Call io.Font->AddFontFromFileTTF() manually to load extra character ranges. Read misc/fonts/README.txt for details.");
                // か \xe3\x81\x8b U+304B &#12363;
                // き \xe3\x81\x8d U+304D &#12365;
                // く \xe3\x81\x8f U+304F &#12367;
                // け \xe3\x81\x91 U+3051 &#12369;
                // こ \xe3\x81\x93 U+3053 &#12371;
                // ImGui.Text("Hiragana: \xe3\x81\x8b\xe3\x81\x8d\xe3\x81\x8f\xe3\x81\x91\xe3\x81\x93 (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                // ImGui.Text("Hiragana: \u304B\u304D\u304F\u3051\u3053 (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                ImGui.Text("Hiragana: かきくけこ (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                // 日 \xe6\x97\xa5 U+65E5 &#26085;
                // 本 \xe6\x9c\xac U+672C &#26412;
                // 語 \xe8\xaa\x9e U+8A9E &#35486;
                // ImGui.Text("Kanjis: \xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e (nihongo)");
                // ImGui.Text("Kanjis: \u65E5\u672C\u8A9E (nihongo)");
                ImGui.Text("Kanjis: 日本語 (nihongo)");
                // /* static */ const buf: Static<ImStringBuffer> = STATIC("buf", new ImStringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e"));
                // /* static */ const buf: Static<ImStringBuffer> = STATIC("buf", new ImStringBuffer(32, "\u65E5\u672C\u8A9E"));
                /* static */ const buf = STATIC("buf", new imgui_4.ImStringBuffer(32, "日本語"));
                //static char buf[32] = u8"NIHONGO"; // <- this is how you would write it with C++11, using real kanjis
                ImGui.InputText("UTF-8 input", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Images")) {
            const io = ImGui.GetIO();
            ImGui.TextWrapped("Below we are displaying the font texture (which is the only texture we have access to in this demo). Use the 'ImTextureID' type as storage to pass pointers or identifier to your own texture data. Hover the texture for a zoomed view!");
            // Here we are grabbing the font texture because that's the only one we have access to inside the demo code.
            // Remember that ImTextureID is just storage for whatever you want it to be, it is essentially a value that will be passed to the render function inside the ImDrawCmd structure.
            // If you use one of the default imgui_impl_XXXX.cpp renderer, they all have comments at the top of their file to specify what they expect to be stored in ImTextureID.
            // (for example, the imgui_impl_dx11.cpp renderer expect a 'ID3D11ShaderResourceView*' pointer. The imgui_impl_glfw_gl3.cpp renderer expect a GLuint OpenGL texture identifier etc.)
            // If you decided that ImTextureID = MyEngineTexture*, then you can pass your MyEngineTexture* pointers to ImGui.Image(), and gather width/height through your own functions, etc.
            // Using ShowMetricsWindow() as a "debugger" to inspect the draw data that are being passed to your render will help you debug issues if you are confused about this.
            // Consider using the lower-level ImDrawList::AddImage() API, via ImGui.GetWindowDrawList()->AddImage().
            const my_tex_id = io.Fonts.TexID;
            const my_tex_w = io.Fonts.TexWidth;
            const my_tex_h = io.Fonts.TexHeight;
            ImGui.Text(`${my_tex_w.toFixed(0)}x${my_tex_h.toFixed(0)}`);
            const pos = ImGui.GetCursorScreenPos();
            ImGui.Image(my_tex_id, new imgui_19.ImVec2(my_tex_w, my_tex_h), new imgui_19.ImVec2(0, 0), new imgui_19.ImVec2(1, 1), new imgui_20.ImVec4(1.0, 1.0, 1.0, 1.0), new imgui_20.ImVec4(1.0, 1.0, 1.0, 0.5));
            if (ImGui.IsItemHovered()) {
                ImGui.BeginTooltip();
                const region_sz = 32.0;
                let region_x = io.MousePos.x - pos.x - region_sz * 0.5;
                if (region_x < 0.0)
                    region_x = 0.0;
                else if (region_x > my_tex_w - region_sz)
                    region_x = my_tex_w - region_sz;
                let region_y = io.MousePos.y - pos.y - region_sz * 0.5;
                if (region_y < 0.0)
                    region_y = 0.0;
                else if (region_y > my_tex_h - region_sz)
                    region_y = my_tex_h - region_sz;
                let zoom = 4.0;
                ImGui.Text(`Min: (${region_x.toFixed(2)}, ${region_y.toFixed(2)})`);
                ImGui.Text(`Max: (${(region_x + region_sz).toFixed(2)}, ${(region_y + region_sz).toFixed(2)})`);
                const uv0 = new imgui_19.ImVec2((region_x) / my_tex_w, (region_y) / my_tex_h);
                const uv1 = new imgui_19.ImVec2((region_x + region_sz) / my_tex_w, (region_y + region_sz) / my_tex_h);
                ImGui.Image(my_tex_id, new imgui_19.ImVec2(region_sz * zoom, region_sz * zoom), uv0, uv1, new imgui_22.ImColor(255, 255, 255, 255).toImVec4(), new imgui_22.ImColor(255, 255, 255, 128).toImVec4());
                ImGui.EndTooltip();
            }
            ImGui.TextWrapped("And now some textured buttons..");
            /* static */ const pressed_count = STATIC("pressed_count", 0);
            for (let i = 0; i < 8; i++) {
                ImGui.PushID(i);
                const frame_padding = -1 + i; // -1 = uses default padding
                if (ImGui.ImageButton(my_tex_id, new imgui_19.ImVec2(32, 32), new imgui_19.ImVec2(0, 0), new imgui_19.ImVec2(32.0 / my_tex_w, 32 / my_tex_h), frame_padding, new imgui_20.ImVec4(0, 0, 0, 1)))
                    pressed_count.value += 1;
                ImGui.PopID();
                ImGui.SameLine();
            }
            ImGui.NewLine();
            ImGui.Text(`Pressed ${pressed_count.value} times.`);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Combo")) {
            // Expose flags as checkbox for the demo
            /* static */ const flags = STATIC("flags#669", 0);
            ImGui.CheckboxFlags("ImGuiComboFlags_PopupAlignLeft", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.PopupAlignLeft);
            ImGui.SameLine();
            HelpMarker("Only makes a difference if the popup is larger than the combo");
            if (ImGui.CheckboxFlags("ImGuiComboFlags_NoArrowButton", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.NoArrowButton))
                flags.value &= ~ImGui.ImGuiComboFlags.NoPreview; // Clear the other flag, as we cannot combine both
            if (ImGui.CheckboxFlags("ImGuiComboFlags_NoPreview", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.NoPreview))
                flags.value &= ~ImGui.ImGuiComboFlags.NoArrowButton; // Clear the other flag, as we cannot combine both
            // General BeginCombo() API, you have full control over your selection data and display type.
            // (your selection data could be an index, a pointer to the object, an id for the object, a flag stored in the object itself, etc.)
            const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO"];
            /* static */ const item_current = STATIC("item_current#692", items[0]); // Here our selection is a single pointer stored outside the object.
            if (ImGui.BeginCombo("combo 1", item_current.value, flags.value)) // The second parameter is the label previewed before opening the combo.
             {
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(items); n++) {
                    const is_selected = (item_current.value === items[n]);
                    if (ImGui.Selectable(items[n], is_selected))
                        item_current.value = items[n];
                    if (is_selected)
                        ImGui.SetItemDefaultFocus(); // Set the initial focus when opening the combo (scrolling + for keyboard navigation support in the upcoming navigation branch)
                }
                ImGui.EndCombo();
            }
            // Simplified one-liner Combo() API, using values packed in a single constant string
            /* static */ const item_current_2 = STATIC("item_current_2", 0);
            ImGui.Combo("combo 2", (value = item_current_2.value) => item_current_2.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
            // Simplified one-liner Combo() using an array of const char*
            /* static */ const item_current_3 = STATIC("item_current_3", -1); // If the selection isn't within 0..count, Combo won't display a preview
            ImGui.Combo("combo 3 (array)", (value = item_current_3.value) => item_current_3.value = value, items, imgui_3.IM_ARRAYSIZE(items));
            // Simplified one-liner Combo() using an accessor function
            // struct FuncHolder { static bool ItemGetter(void* data, int idx, const char** out_str) { *out_str = ((const char**)data)[idx]; return true; } };
            class FuncHolder {
                static ItemGetter(data, idx, out_str) { out_str[0] = data[idx]; return true; }
                ;
            }
            /* static */ const item_current_4 = STATIC("item_current_4", 0);
            ImGui.Combo("combo 4 (function)", (value = item_current_4.value) => item_current_4.value = value, FuncHolder.ItemGetter, items, imgui_3.IM_ARRAYSIZE(items));
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Selectables")) {
            // Selectable() has 2 overloads:
            // - The one taking "bool selected" as a read-only selection information. When Selectable() has been clicked is returns true and you can alter selection state accordingly.
            // - The one taking "bool* p_selected" as a read-write selection information (convenient in some cases)
            // The earlier is more flexible, as in real application your selection may be stored in a different manner (in flags within objects, as an external list, etc).
            if (ImGui.TreeNode("Basic")) {
                /* static */ const selection = STATIC("selection#695", [false, true, false, false, false]);
                ImGui.Selectable("1. I am selectable", (value = selection.value[0]) => selection.value[0] = value);
                ImGui.Selectable("2. I am selectable", (value = selection.value[1]) => selection.value[1] = value);
                ImGui.Text("3. I am not selectable");
                ImGui.Selectable("4. I am selectable", (value = selection.value[3]) => selection.value[2] = value);
                if (ImGui.Selectable("5. I am double clickable", selection.value[4], imgui_12.ImGuiSelectableFlags.AllowDoubleClick))
                    if (ImGui.IsMouseDoubleClicked(0))
                        selection.value[4] = !selection.value[4];
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Selection State: Single Selection")) {
                /* static */ const selected = STATIC("selected#707", -1);
                for (let n = 0; n < 5; n++) {
                    const buf = `Object ${n}`;
                    if (ImGui.Selectable(buf, selected.value === n))
                        selected.value = n;
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Selection State: Multiple Selection")) {
                HelpMarker("Hold CTRL and click to select multiple items.");
                /* static */ const selection = STATIC("selection#720", [false, false, false, false, false]);
                for (let n = 0; n < 5; n++) {
                    const buf = `Object ${n}`;
                    if (ImGui.Selectable(buf, selection.value[n])) {
                        if (!ImGui.GetIO().KeyCtrl) // Clear selection when CTRL is not held
                            // memset(selection, 0, sizeof(selection));
                            selection.value.fill(false);
                        selection.value[n] = !selection.value[n];
                    }
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Rendering more text into the same line")) {
                // Using the Selectable() override that takes "bool* p_selected" parameter and toggle your booleans automatically.
                /* static */ const selected = STATIC("selected#687", [false, false, false]);
                ImGui.Selectable("main.c", (value = selected.value[0]) => selected.value[0] = value);
                ImGui.SameLine(300);
                ImGui.Text(" 2,345 bytes");
                ImGui.Selectable("Hello.cpp", (value = selected.value[1]) => selected.value[1] = value);
                ImGui.SameLine(300);
                ImGui.Text("12,345 bytes");
                ImGui.Selectable("Hello.h", (value = selected.value[2]) => selected.value[2] = value);
                ImGui.SameLine(300);
                ImGui.Text(" 2,345 bytes");
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("In columns")) {
                ImGui.Columns(3, null, false);
                /* static */ const selected = STATIC("selected#699", new Array(16).fill(false));
                for (let i = 0; i < 16; i++) {
                    const label = `Item ${i}`;
                    if (ImGui.Selectable(label, (value = selected.value[i]) => selected.value[i] = value)) { }
                    ImGui.NextColumn();
                }
                ImGui.Columns(1);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Grid")) {
                /* static */ const selected = STATIC("selected#712", [true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true]);
                for (let i = 0; i < 4 * 4; i++) {
                    ImGui.PushID(i);
                    if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new imgui_19.ImVec2(50, 50))) {
                        // Note: We _unnecessarily_ test for both x/y and i here only to silence some static analyzer. The second part of each test is unnecessary.
                        const x = i % 4;
                        const y = i / 4;
                        if (x > 0) {
                            selected.value[i - 1] = !selected.value[i - 1];
                        }
                        if (x < 3 && i < 15) {
                            selected.value[i + 1] = !selected.value[i + 1];
                        }
                        if (y > 0 && i > 3) {
                            selected.value[i - 4] = !selected.value[i - 4];
                        }
                        if (y < 3 && i < 12) {
                            selected.value[i + 4] = !selected.value[i + 4];
                        }
                    }
                    if ((i % 4) < 3)
                        ImGui.SameLine();
                    ImGui.PopID();
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Alignment")) {
                HelpMarker("Alignment applies when a selectable is larger than its text content.\nBy default, Selectables uses style.SelectableTextAlign but it can be overriden on a per-item basis using PushStyleVar().");
                /* static */ const selected = STATIC("selected#1012", [true, false, true, false, true, false, true, false, true]);
                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 3; x++) {
                        const alignment = new imgui_19.ImVec2(x / 2.0, y / 2.0);
                        // char name[32];
                        // sprintf(name, "(%.1f,%.1f)", alignment.x, alignment.y);
                        const name = `(${alignment.x.toFixed(1)},${alignment.y.toFixed(1)})`;
                        if (x > 0)
                            ImGui.SameLine();
                        ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.SelectableTextAlign, alignment);
                        // ImGui.Selectable(name, &selected[3*y+x], ImGuiSelectableFlags_None, ImVec2(80,80));
                        ImGui.Selectable(name, (value = selected.value[3 * y + x]) => selected.value[3 * y + x] = value, imgui_12.ImGuiSelectableFlags.None, new imgui_19.ImVec2(80, 80));
                        ImGui.PopStyleVar();
                    }
                }
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Text Input")) {
            if (ImGui.TreeNode("Multi-line Text Input")) {
                // Note: we are using a fixed-sized buffer for simplicity here. See ImGuiInputTextFlags_CallbackResize
                // and the code in misc/cpp/imgui_stdlib.h for how to setup InputText() for dynamically resizing strings.
                /* static */ const text = STATIC("text", new imgui_4.ImStringBuffer(1024 * 16, "/*\n" +
                    " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
                    " the hexadecimal encoding of one offending instruction,\n" +
                    " more formally, the invalid operand with locked CMPXCHG8B\n" +
                    " instruction bug, is a design flaw in the majority of\n" +
                    " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
                    " processors (all in the P5 microarchitecture).\n" +
                    "*/\n\n" +
                    "label:\n" +
                    "\tlock cmpxchg8b eax\n"));
                /* static */ const flags = STATIC("flags", imgui_10.ImGuiInputTextFlags.AllowTabInput);
                HelpMarker("You can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputTextMultiline() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example. (This is not demonstrated in imgui_demo.cpp)");
                ImGui.CheckboxFlags("ImGuiInputTextFlags_ReadOnly", (value = flags.value) => flags.value = value, imgui_10.ImGuiInputTextFlags.ReadOnly);
                ImGui.CheckboxFlags("ImGuiInputTextFlags_AllowTabInput", (value = flags.value) => flags.value = value, imgui_10.ImGuiInputTextFlags.AllowTabInput);
                ImGui.CheckboxFlags("ImGuiInputTextFlags_CtrlEnterForNewLine", (value = flags.value) => flags.value = value, imgui_10.ImGuiInputTextFlags.CtrlEnterForNewLine);
                ImGui.InputTextMultiline("##source", text.value, imgui_3.IM_ARRAYSIZE(text.value), new imgui_19.ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), flags.value);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Filtered Text Input")) {
                /* static */ const buf1 = STATIC("buf1", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("default", buf1.value, imgui_3.IM_ARRAYSIZE(buf1.value));
                /* static */ const buf2 = STATIC("buf2", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("decimal", buf2.value, imgui_3.IM_ARRAYSIZE(buf2.value), imgui_10.ImGuiInputTextFlags.CharsDecimal);
                /* static */ const buf3 = STATIC("buf3", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("hexadecimal", buf3.value, imgui_3.IM_ARRAYSIZE(buf3.value), imgui_10.ImGuiInputTextFlags.CharsHexadecimal | imgui_10.ImGuiInputTextFlags.CharsUppercase);
                /* static */ const buf4 = STATIC("buf4", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("uppercase", buf4.value, imgui_3.IM_ARRAYSIZE(buf4.value), imgui_10.ImGuiInputTextFlags.CharsUppercase);
                /* static */ const buf5 = STATIC("buf5", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("no blank", buf5.value, imgui_3.IM_ARRAYSIZE(buf5.value), imgui_10.ImGuiInputTextFlags.CharsNoBlank);
                class TextFilters {
                    static FilterImGuiLetters(data) { if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar)))
                        return 0; return 1; }
                }
                /* static */ const buf6 = STATIC("buf6", new imgui_4.ImStringBuffer(64, ""));
                ImGui.InputText("\"imgui\" letters", buf6.value, imgui_3.IM_ARRAYSIZE(buf6.value), imgui_10.ImGuiInputTextFlags.CallbackCharFilter, TextFilters.FilterImGuiLetters);
                ImGui.Text("Password input");
                /* static */ const bufpass = STATIC("bufpass", new imgui_4.ImStringBuffer(64, "password123"));
                ImGui.InputText("password", bufpass.value, imgui_3.IM_ARRAYSIZE(bufpass.value), imgui_10.ImGuiInputTextFlags.Password | imgui_10.ImGuiInputTextFlags.CharsNoBlank);
                ImGui.SameLine();
                HelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
                ImGui.InputText("password (clear)", bufpass.value, imgui_3.IM_ARRAYSIZE(bufpass.value), imgui_10.ImGuiInputTextFlags.CharsNoBlank);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Resize Callback")) {
                // If you have a custom string type you would typically create a ImGui.InputText() wrapper than takes your type as input.
                // See misc/cpp/imgui_stdlib.h and .cpp for an implementation of this using std::string.
                HelpMarker("Demonstrate using ImGuiInputTextFlags_CallbackResize to wire your resizable string type to InputText().\n\nSee misc/cpp/imgui_stdlib.h for an implementation of this for std::string.");
                // struct Funcs
                // {
                //     static int MyResizeCallback(ImGuiInputTextCallbackData* data)
                //     {
                //         if (data->EventFlag == ImGuiInputTextFlags_CallbackResize)
                //         {
                //             ImVector<char>* my_str = (ImVector<char>*)data->UserData;
                //             IM_ASSERT(my_str->begin() == data->Buf);
                //             my_str->resize(data->BufSize);  // NB: On resizing calls, generally data->BufSize == data->BufTextLen + 1
                //             data->Buf = my_str->begin();
                //         }
                //         return 0;
                //     }
                //     // Tip: Because ImGui. is a namespace you would typicall add your own function into the namespace in your own source files.
                //     // For example, you may add a function called ImGui.InputText(const char* label, MyString* my_str).
                //     static bool MyInputTextMultiline(const char* label, ImVector<char>* my_str, const ImVec2& size = ImVec2(0, 0), ImGuiInputTextFlags flags = 0)
                //     {
                //         IM_ASSERT((flags & ImGuiInputTextFlags_CallbackResize) == 0);
                //         return ImGui.InputTextMultiline(label, my_str->begin(), (size_t)my_str->size(), size, flags | ImGuiInputTextFlags_CallbackResize, Funcs::MyResizeCallback, (void*)my_str);
                //     }
                // };
                // For this demo we are using ImVector as a string container.
                // Note that because we need to store a terminating zero character, our size/capacity are 1 more than usually reported by a typical string class.
                // static ImVector<char> my_str;
                // if (my_str.empty())
                //     my_str.push_back(0);
                // Funcs::MyInputTextMultiline("##MyStr", &my_str, ImVec2(-1.0f, ImGui.GetTextLineHeight() * 16));
                // ImGui.Text("Data: %p\nSize: %d\nCapacity: %d", (void*)my_str.begin(), my_str.size(), my_str.capacity());
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Plots Widgets")) {
            /* static */ const animate = STATIC("animate", true);
            ImGui.Checkbox("Animate", (value = animate.value) => animate.value = value);
            /* static */ const arr = STATIC("arr", [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
            ImGui.PlotLines("Frame Times", arr.value, imgui_3.IM_ARRAYSIZE(arr.value));
            // Create a dummy array of contiguous float values to plot
            // Tip: If your float aren't contiguous but part of a structure, you can pass a pointer to your first float and the sizeof() of your structure in the Stride parameter.
            /* static */ const values = STATIC("values#803", new Array(90).fill(0));
            /* static */ const values_offset = STATIC("values_offset", 0);
            /* static */ const refresh_time = STATIC("refresh_time", 0.0);
            if (!animate.value || refresh_time.value === 0.0)
                refresh_time.value = ImGui.GetTime();
            while (refresh_time.value < ImGui.GetTime()) // Create dummy data at fixed 60 hz rate for the demo
             {
                /* static */ const phase = STATIC("phase", 0.0);
                values.value[values_offset.value] = Math.cos(phase.value);
                values_offset.value = (values_offset.value + 1) % imgui_3.IM_ARRAYSIZE(values.value);
                phase.value += 0.10 * values_offset.value;
                refresh_time.value += 1.0 / 60.0;
            }
            ImGui.PlotLines("Lines", values.value, imgui_3.IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new imgui_19.ImVec2(0, 80));
            ImGui.PlotHistogram("Histogram", arr.value, imgui_3.IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new imgui_19.ImVec2(0, 80));
            // Use functions to generate output
            // FIXME: This is rather awkward because current plot API only pass in indices. We probably want an API passing floats and user provide sample rate/count.
            class Funcs {
                static Sin(data, i) { return Math.sin(i * 0.1); }
                static Saw(data, i) { return (i & 1) ? 1.0 : -1.0; }
            }
            /* static */ const func_type = STATIC("func_type", 0), display_count = STATIC("display_count", 70);
            ImGui.Separator();
            ImGui.SetNextItemWidth(100);
            ImGui.Combo("func", (value = func_type.value) => func_type.value = value, "Sin\0Saw\0");
            ImGui.SameLine();
            ImGui.SliderInt("Sample count", (value = display_count.value) => display_count.value = value, 1, 400);
            const func = (func_type.value === 0) ? Funcs.Sin : Funcs.Saw;
            ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_19.ImVec2(0, 80));
            ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_19.ImVec2(0, 80));
            ImGui.Separator();
            // Animate a simple progress bar
            /* static */ const progress = STATIC("progress", 0.0), progress_dir = STATIC("progress_dir", 1.0);
            if (animate.value) {
                progress.value += progress_dir.value * 0.4 * ImGui.GetIO().DeltaTime;
                if (progress.value >= +1.1) {
                    progress.value = +1.1;
                    progress_dir.value *= -1.0;
                }
                if (progress.value <= -0.1) {
                    progress.value = -0.1;
                    progress_dir.value *= -1.0;
                }
            }
            // Typically we would use ImVec2(-1.0f,0.0) to use all available width, or ImVec2(width,0.0) for a specified width. ImVec2(0.0,0.0) uses ItemWidth.
            ImGui.ProgressBar(progress.value, new imgui_19.ImVec2(0.0, 0.0));
            ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
            ImGui.Text("Progress Bar");
            const progress_saturated = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
            const buf = `${(progress_saturated * 1753).toFixed(0)}/${1753}`;
            ImGui.ProgressBar(progress.value, new imgui_19.ImVec2(0., 0.), buf);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Color/Picker Widgets")) {
            /* static */ const color = STATIC("color#863", new imgui_20.ImVec4(114.0 / 255.0, 144.0 / 255.0, 154.0 / 255.0, 200.0 / 255.0));
            /* static */ const alpha_preview = STATIC("alpha_preview", true);
            /* static */ const alpha_half_preview = STATIC("alpha_half_preview", false);
            /* static */ const drag_and_drop = STATIC("drag_and_drop", true);
            /* static */ const options_menu = STATIC("options_menu", true);
            /* static */ const hdr = STATIC("hdr", false);
            ImGui.Checkbox("With Alpha Preview", (value = alpha_preview.value) => alpha_preview.value = value);
            ImGui.Checkbox("With Half Alpha Preview", (value = alpha_half_preview.value) => alpha_half_preview.value = value);
            ImGui.Checkbox("With Drag and Drop", (value = drag_and_drop.value) => drag_and_drop.value = value);
            ImGui.Checkbox("With Options Menu", (value = options_menu.value) => options_menu.value = value);
            ImGui.SameLine();
            HelpMarker("Right-click on the individual color widget to show options.");
            ImGui.Checkbox("With HDR", (value = hdr.value) => hdr.value = value);
            ImGui.SameLine();
            HelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
            const misc_flags = (hdr.value ? imgui_6.ImGuiColorEditFlags.HDR : 0) | (drag_and_drop.value ? 0 : imgui_6.ImGuiColorEditFlags.NoDragDrop) | (alpha_half_preview.value ? imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf : (alpha_preview.value ? imgui_6.ImGuiColorEditFlags.AlphaPreview : 0)) | (options_menu.value ? 0 : imgui_6.ImGuiColorEditFlags.NoOptions);
            ImGui.Text("Color widget:");
            ImGui.SameLine();
            HelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
            ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);
            ImGui.Text("Color widget HSV with Alpha:");
            ImGui.ColorEdit4("MyColor##2", color.value, imgui_6.ImGuiColorEditFlags.DisplayHSV | misc_flags);
            ImGui.Text("Color widget with Float Display:");
            ImGui.ColorEdit4("MyColor##2f", color.value, imgui_6.ImGuiColorEditFlags.Float | misc_flags);
            ImGui.Text("Color button with Picker:");
            ImGui.SameLine();
            HelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
            ImGui.ColorEdit4("MyColor##3", color.value, imgui_6.ImGuiColorEditFlags.NoInputs | imgui_6.ImGuiColorEditFlags.NoLabel | misc_flags);
            ImGui.Text("Color button with Custom Picker Popup:");
            // Generate a dummy default palette. The palette will persist and can be edited.
            /* static */ const saved_palette_init = STATIC("saved_palette_init", true);
            /* static */ const saved_palette = STATIC("saved_palette", []);
            if (saved_palette_init.value) {
                for (let n = 0; n < 32; n++) {
                    saved_palette.value[n] = new imgui_20.ImVec4();
                    // ImGui.ColorConvertHSVtoRGB(n / 31.0f, 0.8f, 0.8f, saved_palette[n].x, saved_palette[n].y, saved_palette[n].z);
                    const r = [0.0];
                    const g = [0.0];
                    const b = [0.0];
                    ImGui.ColorConvertHSVtoRGB(n / 32.0, 0.8, 0.8, r, g, b);
                    saved_palette.value[n].x = r[0];
                    saved_palette.value[n].y = g[0];
                    saved_palette.value[n].z = b[0];
                    saved_palette.value[n].w = 1.0; // Alpha
                }
                saved_palette_init.value = false;
            }
            /* static */ const backup_color = STATIC("backup_color", new imgui_20.ImVec4());
            let open_popup = ImGui.ColorButton("MyColor##3b", color.value, misc_flags);
            ImGui.SameLine();
            open_popup = ImGui.Button("Palette") || open_popup;
            if (open_popup) {
                ImGui.OpenPopup("mypicker");
                backup_color.value.Copy(color.value);
            }
            if (ImGui.BeginPopup("mypicker")) {
                ImGui.Text("MY CUSTOM COLOR PICKER WITH AN AMAZING PALETTE!");
                ImGui.Separator();
                ImGui.ColorPicker4("##picker", color.value, misc_flags | imgui_6.ImGuiColorEditFlags.NoSidePreview | imgui_6.ImGuiColorEditFlags.NoSmallPreview);
                ImGui.SameLine();
                ImGui.BeginGroup(); // Lock X position
                ImGui.Text("Current");
                ImGui.ColorButton("##current", color.value, imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_19.ImVec2(60, 40));
                ImGui.Text("Previous");
                if (ImGui.ColorButton("##previous", backup_color.value, imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_19.ImVec2(60, 40)))
                    color.value.Copy(backup_color.value);
                ImGui.Separator();
                ImGui.Text("Palette");
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(saved_palette.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 8) !== 0)
                        ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                    if (ImGui.ColorButton("##palette", saved_palette.value[n], imgui_6.ImGuiColorEditFlags.NoAlpha | imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.NoTooltip, new imgui_19.ImVec2(20, 20)))
                        color.value.Copy(new imgui_20.ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!
                    // Allow user to drop colors into each palette entry
                    // (Note that ColorButton is already a drag source by default, unless using ImGuiColorEditFlags_NoDragDrop)
                    if (ImGui.BeginDragDropTarget()) {
                        // if (const ImGuiPayload* payload = AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_3F))
                        //     memcpy((float*)&saved_palette[n], payload->Data, sizeof(float) * 3);
                        // if (const ImGuiPayload* payload = AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_4F))
                        //     memcpy((float*)&saved_palette[n], payload->Data, sizeof(float) * 4);
                        ImGui.EndDragDropTarget();
                    }
                    ImGui.PopID();
                }
                ImGui.EndGroup();
                ImGui.EndPopup();
            }
            ImGui.Text("Color button only:");
            ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new imgui_19.ImVec2(80, 80));
            ImGui.Text("Color picker:");
            /* static */ const alpha = STATIC("alpha", true);
            /* static */ const alpha_bar = STATIC("alpha_bar", true);
            /* static */ const side_preview = STATIC("side_preview", true);
            /* static */ const ref_color = STATIC("ref_color", false);
            /* static */ const ref_color_v = STATIC("ref_color_v", new imgui_20.ImVec4(1.0, 0.0, 1.0, 0.5));
            /* static */ const display_mode = STATIC("display_mode", 0);
            /* static */ const picker_mode = STATIC("picker_mode", 0);
            ImGui.Checkbox("With Alpha", (value = alpha.value) => alpha.value = value);
            ImGui.Checkbox("With Alpha Bar", (value = alpha_bar.value) => alpha_bar.value = value);
            ImGui.Checkbox("With Side Preview", (value = side_preview.value) => side_preview.value = value);
            if (side_preview) {
                ImGui.SameLine();
                ImGui.Checkbox("With Ref Color", (value = ref_color.value) => ref_color.value = value);
                if (ref_color.value) {
                    ImGui.SameLine();
                    ImGui.ColorEdit4("##RefColor", ref_color_v.value, imgui_6.ImGuiColorEditFlags.NoInputs | misc_flags);
                }
            }
            ImGui.Combo("Display Mode", (value = display_mode.value) => display_mode.value = value, "Auto/Current\0None\0RGB Only\0HSV Only\0Hex Only\0");
            ImGui.SameLine();
            HelpMarker("ColorEdit defaults to displaying RGB inputs if you don't specify a display mode, but the user can change it with a right-click.\n\nColorPicker defaults to displaying RGB+HSV+Hex if you don't specify a display mode.\n\nYou can change the defaults using SetColorEditOptions().");
            ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
            ImGui.SameLine();
            HelpMarker("User can right-click the picker to change mode.");
            let flags = misc_flags;
            if (!alpha.value)
                flags |= imgui_6.ImGuiColorEditFlags.NoAlpha; // This is by default if you call ColorPicker3() instead of ColorPicker4()
            if (alpha_bar.value)
                flags |= imgui_6.ImGuiColorEditFlags.AlphaBar;
            if (!side_preview.value)
                flags |= imgui_6.ImGuiColorEditFlags.NoSidePreview;
            if (picker_mode.value === 1)
                flags |= imgui_6.ImGuiColorEditFlags.PickerHueBar;
            if (picker_mode.value === 2)
                flags |= imgui_6.ImGuiColorEditFlags.PickerHueWheel;
            if (display_mode.value === 1)
                flags |= imgui_6.ImGuiColorEditFlags.NoInputs; // Disable all RGB/HSV/Hex displays
            if (display_mode.value === 2)
                flags |= imgui_6.ImGuiColorEditFlags.DisplayRGB; // Override display mode
            if (display_mode.value === 3)
                flags |= imgui_6.ImGuiColorEditFlags.DisplayHSV;
            if (display_mode.value === 4)
                flags |= imgui_6.ImGuiColorEditFlags.DisplayHex;
            ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);
            ImGui.Text("Programmatically set defaults:");
            ImGui.SameLine();
            HelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
            if (ImGui.Button("Default: Uint8 + HSV + Hue Bar"))
                ImGui.SetColorEditOptions(imgui_6.ImGuiColorEditFlags.Uint8 | imgui_6.ImGuiColorEditFlags.DisplayHSV | imgui_6.ImGuiColorEditFlags.PickerHueBar);
            if (ImGui.Button("Default: Float + HDR + Hue Wheel"))
                ImGui.SetColorEditOptions(imgui_6.ImGuiColorEditFlags.Float | imgui_6.ImGuiColorEditFlags.HDR | imgui_6.ImGuiColorEditFlags.PickerHueWheel);
            // HSV encoded support (to avoid RGB<>HSV round trips and singularities when S==0 or V==0)
            /* static */ const color_stored_as_hsv = STATIC("color_stored_as_hsv", new imgui_20.ImVec4(0.23, 1.0, 1.0, 1.0));
            ImGui.Spacing();
            ImGui.Text("HSV encoded colors");
            ImGui.SameLine();
            HelpMarker("By default, colors are given to ColorEdit and ColorPicker in RGB, but ImGuiColorEditFlags_InputHSV allows you to store colors as HSV and pass them to ColorEdit and ColorPicker as HSV. This comes with the added benefit that you can manipulate hue values with the picker even when saturation or value are zero.");
            ImGui.Text("Color widget with InputHSV:");
            ImGui.ColorEdit4("HSV shown as RGB##1", color_stored_as_hsv.value, imgui_6.ImGuiColorEditFlags.DisplayRGB | imgui_6.ImGuiColorEditFlags.InputHSV | imgui_6.ImGuiColorEditFlags.Float);
            ImGui.ColorEdit4("HSV shown as HSV##1", color_stored_as_hsv.value, imgui_6.ImGuiColorEditFlags.DisplayHSV | imgui_6.ImGuiColorEditFlags.InputHSV | imgui_6.ImGuiColorEditFlags.Float);
            ImGui.DragFloat4("Raw HSV values", color_stored_as_hsv.value, 0.01, 0.0, 1.0);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Range Widgets")) {
            /* static */ const begin = STATIC("begin", 10), end = STATIC("end", 90);
            /* static */ const begin_i = STATIC("begin_i", 100), end_i = STATIC("end_i", 1000);
            ImGui.DragFloatRange2("range", (value = begin.value) => begin.value = value, (value = end.value) => end.value = value, 0.25, 0.0, 100.0, "Min: %.1f %%", "Max: %.1f %%");
            ImGui.DragIntRange2("range int (no bounds)", (value = begin_i.value) => begin_i.value = value, (value = end_i.value) => end_i.value = value, 5, 0, 0, "Min: %d units", "Max: %d units");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Data Types")) {
            // The DragScalar/InputScalar/SliderScalar functions allow various data types: signed/unsigned int/long long and float/double
            // To avoid polluting the public API with all possible combinations, we use the ImGuiDataType enum to pass the type,
            // and passing all arguments by address.
            // This is the reason the test code below creates local variables to hold "zero" "one" etc. for each types.
            // In practice, if you frequently use a given type that is not covered by the normal API entry points, you can wrap it
            // yourself inside a 1 line function which can take typed argument as value instead of void*, and then pass their address
            // to the generic function. For example:
            //   bool MySliderU64(const char *label, u64* value, u64 min = 0, u64 max = 0, const char* format = "%lld")
            //   {
            //      return SliderScalar(label, ImGuiDataType_U64, value, &min, &max, format);
            //   }
            // Limits (as helper variables that we can take the address of)
            // Note that the SliderScalar function has a maximum usable range of half the natural type maximum, hence the /2 below.
            const INT_MIN = -2147483648; // 0x80000000
            const INT_MAX = +2147483647; // 0x7fffffff
            const UINT_MAX = +4294967295; // 0xffffffff
            // const LLONG_MIN = -9223372036854775808; // 0x8000000000000000
            // const LLONG_MAX = +9223372036854775807; // 0x7fffffffffffffff
            // const ULLONG_MAX = +18446744073709551615; // 0xffffffffffffffff
            const s8_zero = 0, s8_one = 1, s8_fifty = 50, s8_min = -128, s8_max = 127;
            const u8_zero = 0, u8_one = 1, u8_fifty = 50, u8_min = 0, u8_max = 255;
            const s16_zero = 0, s16_one = 1, s16_fifty = 50, s16_min = -32768, s16_max = 32767;
            const u16_zero = 0, u16_one = 1, u16_fifty = 50, u16_min = 0, u16_max = 65535;
            const s32_zero = 0, s32_one = 1, s32_fifty = 50, s32_min = INT_MIN / 2, s32_max = INT_MAX / 2, s32_hi_a = INT_MAX / 2 - 100, s32_hi_b = INT_MAX / 2;
            const u32_zero = 0, u32_one = 1, u32_fifty = 50, u32_min = 0, u32_max = UINT_MAX / 2, u32_hi_a = UINT_MAX / 2 - 100, u32_hi_b = UINT_MAX / 2;
            // const s64_zero = 0,   s64_one = 1,   s64_fifty = 50, s64_min = LLONG_MIN / 2, s64_max = LLONG_MAX / 2,  s64_hi_a = LLONG_MAX / 2 - 100,  s64_hi_b = LLONG_MAX / 2;
            // const u64_zero = 0,   u64_one = 1,   u64_fifty = 50, u64_min = 0,             u64_max = ULLONG_MAX / 2, u64_hi_a = ULLONG_MAX / 2 - 100, u64_hi_b = ULLONG_MAX / 2;
            const f32_zero = 0.0, f32_one = 1.0, f32_lo_a = -10000000000.0, f32_hi_a = +10000000000.0;
            const f64_zero = 0.0, f64_one = 1.0, f64_lo_a = -1000000000000000.0, f64_hi_a = +1000000000000000.0;
            // State
            // static char   s8_v  = 127;
            // static ImU8   u8_v  = 255;
            // static short  s16_v = 32767;
            // static ImU16  u16_v = 65535;
            // static ImS32  s32_v = -1;
            // static ImU32  u32_v = (ImU32)-1;
            // static ImS64  s64_v = -1;
            // static ImU64  u64_v = (ImU64)-1;
            // static float  f32_v = 0.123f;
            // static double f64_v = 90000.01234567890123456789;
            /* static */ const s8_v = STATIC("s8_v", new Int8Array([127]));
            /* static */ const u8_v = STATIC("u8_v", new Uint8Array([255]));
            /* static */ const s16_v = STATIC("s16_v", new Int16Array([32767]));
            /* static */ const u16_v = STATIC("u16_v", new Uint16Array([65535]));
            /* static */ const s32_v = STATIC("s32_v", new Int32Array([-1]));
            /* static */ const u32_v = STATIC("u32_v", new Uint32Array([-1]));
            // /* static */ const s64_v = STATIC("s64_v", new Int64Array([-1]));
            // /* static */ const u64_v = STATIC("u64_v", new Uint64Array([-1]));
            /* static */ const f32_v = STATIC("f32_v", new Float32Array([0.123]));
            /* static */ const f64_v = STATIC("f64_v", new Float64Array([90000.01234567890123456789]));
            const drag_speed = 0.2;
            /* static */ const drag_clamp = STATIC("drag_clamp", false);
            ImGui.Text("Drags:");
            ImGui.Checkbox("Clamp integers to 0..50", (value = drag_clamp.value) => drag_clamp.value = value);
            ImGui.SameLine();
            HelpMarker("As with every widgets in dear imgui, we never modify values unless there is a user interaction.\nYou can override the clamping limits by using CTRL+Click to input a value.");
            // ImGui.DragScalar("drag s8",        ImGuiDataType_S8,     &s8_v,  drag_speed, drag_clamp ? &s8_zero  : NULL, drag_clamp ? &s8_fifty  : NULL);
            // ImGui.DragScalar("drag u8",        ImGuiDataType_U8,     &u8_v,  drag_speed, drag_clamp ? &u8_zero  : NULL, drag_clamp ? &u8_fifty  : NULL, "%u ms");
            // ImGui.DragScalar("drag s16",       ImGuiDataType_S16,    &s16_v, drag_speed, drag_clamp ? &s16_zero : NULL, drag_clamp ? &s16_fifty : NULL);
            // ImGui.DragScalar("drag u16",       ImGuiDataType_U16,    &u16_v, drag_speed, drag_clamp ? &u16_zero : NULL, drag_clamp ? &u16_fifty : NULL, "%u ms");
            // ImGui.DragScalar("drag s32",       ImGuiDataType_S32,    &s32_v, drag_speed, drag_clamp.value ? &s32_zero : null, drag_clamp.value ? &s32_fifty : null);
            // ImGui.DragScalar("drag u32",       ImGuiDataType_U32,    &u32_v, drag_speed, drag_clamp.value ? &u32_zero : null, drag_clamp.value ? &u32_fifty : null, "%u ms");
            // ImGui.DragScalar("drag s64",       ImGuiDataType_S64,    &s64_v, drag_speed, drag_clamp.value ? &s64_zero : null, drag_clamp.value ? &s64_fifty : null);
            // ImGui.DragScalar("drag u64",       ImGuiDataType_U64,    &u64_v, drag_speed, drag_clamp.value ? &u64_zero : null, drag_clamp.value ? &u64_fifty : null);
            // ImGui.DragScalar("drag float",     ImGuiDataType_Float,  &f32_v, 0.005f,  &f32_zero, &f32_one, "%f", 1.0f);
            // ImGui.DragScalar("drag float ^2",  ImGuiDataType_Float,  &f32_v, 0.005f,  &f32_zero, &f32_one, "%f", 2.0f); ImGui.SameLine(); HelpMarker("You can use the 'power' parameter to increase tweaking precision on one side of the range.");
            // ImGui.DragScalar("drag double",    ImGuiDataType_Double, &f64_v, 0.0005f, &f64_zero, null,     "%.10f grams", 1.0f);
            // ImGui.DragScalar("drag double ^2", ImGuiDataType_Double, &f64_v, 0.0005f, &f64_zero, &f64_one, "0 < %.10f < 1", 2.0f);
            ImGui.DragScalar("drag s8", s8_v.value, drag_speed, drag_clamp.value ? s8_zero : null, drag_clamp.value ? s8_fifty : null);
            ImGui.DragScalar("drag u8", u8_v.value, drag_speed, drag_clamp.value ? u8_zero : null, drag_clamp.value ? u8_fifty : null, "%u ms");
            ImGui.DragScalar("drag s16", s16_v.value, drag_speed, drag_clamp.value ? s16_zero : null, drag_clamp.value ? s16_fifty : null);
            ImGui.DragScalar("drag u16", u16_v.value, drag_speed, drag_clamp.value ? u16_zero : null, drag_clamp.value ? u16_fifty : null, "%u ms");
            ImGui.DragScalar("drag s32", s32_v.value, drag_speed, drag_clamp.value ? s32_zero : null, drag_clamp.value ? s32_fifty : null);
            ImGui.DragScalar("drag u32", u32_v.value, drag_speed, drag_clamp.value ? u32_zero : null, drag_clamp.value ? u32_fifty : null, "%u ms");
            // ImGui.DragScalar("drag s64",       s64_v.value, drag_speed, drag_clamp.value ? s64_zero : null, drag_clamp.value ? s64_fifty : null);
            // ImGui.DragScalar("drag u64",       u64_v.value, drag_speed, drag_clamp.value ? u64_zero : null, drag_clamp.value ? u64_fifty : null);
            ImGui.DragScalar("drag float", f32_v.value, 0.005, f32_zero, f32_one, "%f", 1.0);
            ImGui.DragScalar("drag float ^2", f32_v.value, 0.005, f32_zero, f32_one, "%f", 2.0);
            ImGui.DragScalar("drag double", f64_v.value, 0.0005, f64_zero, null, "%.10f grams", 1.0);
            ImGui.DragScalar("drag double ^2", f64_v.value, 0.0005, f64_zero, f64_one, "0 < %.10f < 1", 2.0);
            ImGui.Text("Sliders");
            // ImGui.SliderScalar("slider s8 full",     ImGuiDataType_S8,     &s8_v,  &s8_min,   &s8_max,   "%d");
            // ImGui.SliderScalar("slider u8 full",     ImGuiDataType_U8,     &u8_v,  &u8_min,   &u8_max,   "%u");
            // ImGui.SliderScalar("slider s16 full",    ImGuiDataType_S16,    &s16_v, &s16_min,  &s16_max,  "%d");
            // ImGui.SliderScalar("slider u16 full",    ImGuiDataType_U16,    &u16_v, &u16_min,  &u16_max,  "%u");
            // ImGui.SliderScalar("slider s32 low",     ImGuiDataType_S32,    &s32_v, &s32_zero, &s32_fifty,"%d");
            // ImGui.SliderScalar("slider s32 high",    ImGuiDataType_S32,    &s32_v, &s32_hi_a, &s32_hi_b, "%d");
            // ImGui.SliderScalar("slider s32 full",    ImGuiDataType_S32,    &s32_v, &s32_min,  &s32_max,  "%d");
            // ImGui.SliderScalar("slider u32 low",     ImGuiDataType_U32,    &u32_v, &u32_zero, &u32_fifty,"%u");
            // ImGui.SliderScalar("slider u32 high",    ImGuiDataType_U32,    &u32_v, &u32_hi_a, &u32_hi_b, "%u");
            // ImGui.SliderScalar("slider u32 full",    ImGuiDataType_U32,    &u32_v, &u32_min,  &u32_max,  "%u");
            // ImGui.SliderScalar("slider s64 low",     ImGuiDataType_S64,    &s64_v, &s64_zero, &s64_fifty,"%I64d");
            // ImGui.SliderScalar("slider s64 high",    ImGuiDataType_S64,    &s64_v, &s64_hi_a, &s64_hi_b, "%I64d");
            // ImGui.SliderScalar("slider s64 full",    ImGuiDataType_S64,    &s64_v, &s64_min,  &s64_max,  "%I64d");
            // ImGui.SliderScalar("slider u64 low",     ImGuiDataType_U64,    &u64_v, &u64_zero, &u64_fifty,"%I64u ms");
            // ImGui.SliderScalar("slider u64 high",    ImGuiDataType_U64,    &u64_v, &u64_hi_a, &u64_hi_b, "%I64u ms");
            // ImGui.SliderScalar("slider u64 full",    ImGuiDataType_U64,    &u64_v, &u64_min,  &u64_max,  "%I64u ms");
            // ImGui.SliderScalar("slider float low",   ImGuiDataType_Float,  &f32_v, &f32_zero, &f32_one);
            // ImGui.SliderScalar("slider float low^2", ImGuiDataType_Float,  &f32_v, &f32_zero, &f32_one,  "%.10f", 2.0f);
            // ImGui.SliderScalar("slider float high",  ImGuiDataType_Float,  &f32_v, &f32_lo_a, &f32_hi_a, "%e");
            // ImGui.SliderScalar("slider double low",  ImGuiDataType_Double, &f64_v, &f64_zero, &f64_one,  "%.10f grams", 1.0f);
            // ImGui.SliderScalar("slider double low^2",ImGuiDataType_Double, &f64_v, &f64_zero, &f64_one,  "%.10f", 2.0f);
            // ImGui.SliderScalar("slider double high", ImGuiDataType_Double, &f64_v, &f64_lo_a, &f64_hi_a, "%e grams", 1.0f);
            ImGui.SliderScalar("slider s8 full", s8_v.value, s8_min, s8_max, "%d");
            ImGui.SliderScalar("slider u8 full", u8_v.value, u8_min, u8_max, "%u");
            ImGui.SliderScalar("slider s16 full", s16_v.value, s16_min, s16_max, "%d");
            ImGui.SliderScalar("slider u16 full", u16_v.value, u16_min, u16_max, "%u");
            ImGui.SliderScalar("slider s32 low", s32_v.value, s32_zero, s32_fifty, "%d");
            ImGui.SliderScalar("slider s32 high", s32_v.value, s32_hi_a, s32_hi_b, "%d");
            ImGui.SliderScalar("slider s32 full", s32_v.value, s32_min, s32_max, "%d");
            ImGui.SliderScalar("slider u32 low", u32_v.value, u32_zero, u32_fifty, "%u");
            ImGui.SliderScalar("slider u32 high", u32_v.value, u32_hi_a, u32_hi_b, "%u");
            ImGui.SliderScalar("slider u32 full", u32_v.value, u32_min, u32_max, "%u");
            // ImGui.SliderScalar("slider s64 low",     s64_v.value, s64_zero, s64_fifty,"%I64d");
            // ImGui.SliderScalar("slider s64 high",    s64_v.value, s64_hi_a, s64_hi_b, "%I64d");
            // ImGui.SliderScalar("slider s64 full",    s64_v.value, s64_min,  s64_max,  "%I64d");
            // ImGui.SliderScalar("slider u64 low",     u64_v.value, u64_zero, u64_fifty,"%I64u ms");
            // ImGui.SliderScalar("slider u64 high",    u64_v.value, u64_hi_a, u64_hi_b, "%I64u ms");
            // ImGui.SliderScalar("slider u64 full",    u64_v.value, u64_min,  u64_max,  "%I64u ms");
            ImGui.SliderScalar("slider float low", f32_v.value, f32_zero, f32_one);
            ImGui.SliderScalar("slider float low^2", f32_v.value, f32_zero, f32_one, "%.10f", 2.0);
            ImGui.SliderScalar("slider float high", f32_v.value, f32_lo_a, f32_hi_a, "%e");
            ImGui.SliderScalar("slider double low", f64_v.value, f64_zero, f64_one, "%.10f grams", 1.0);
            ImGui.SliderScalar("slider double low^2", f64_v.value, f64_zero, f64_one, "%.10f", 2.0);
            ImGui.SliderScalar("slider double high", f64_v.value, f64_lo_a, f64_hi_a, "%e grams", 1.0);
            /* static */ const inputs_step = STATIC("inputs_step", true);
            ImGui.Text("Inputs");
            ImGui.Checkbox("Show step buttons", (value = inputs_step.value) => inputs_step.value = value);
            // ImGui.InputScalar("input s8",      ImGuiDataType_S8,     &s8_v,  inputs_step ? &s8_one  : NULL, NULL, "%d");
            // ImGui.InputScalar("input u8",      ImGuiDataType_U8,     &u8_v,  inputs_step ? &u8_one  : NULL, NULL, "%u");
            // ImGui.InputScalar("input s16",     ImGuiDataType_S16,    &s16_v, inputs_step ? &s16_one : NULL, NULL, "%d");
            // ImGui.InputScalar("input u16",     ImGuiDataType_U16,    &u16_v, inputs_step ? &u16_one : NULL, NULL, "%u");
            // ImGui.InputScalar("input s32",     ImGuiDataType_S32,    &s32_v, inputs_step ? &s32_one : NULL, NULL, "%d");
            // ImGui.InputScalar("input s32 hex", ImGuiDataType_S32,    &s32_v, inputs_step ? &s32_one : NULL, NULL, "%08X", ImGuiInputTextFlags_CharsHexadecimal);
            // ImGui.InputScalar("input u32",     ImGuiDataType_U32,    &u32_v, inputs_step ? &u32_one : NULL, NULL, "%u");
            // ImGui.InputScalar("input u32 hex", ImGuiDataType_U32,    &u32_v, inputs_step ? &u32_one : NULL, NULL, "%08X", ImGuiInputTextFlags_CharsHexadecimal);
            // ImGui.InputScalar("input s64",     ImGuiDataType_S64,    &s64_v, inputs_step ? &s64_one : NULL);
            // ImGui.InputScalar("input u64",     ImGuiDataType_U64,    &u64_v, inputs_step ? &u64_one : NULL);
            // ImGui.InputScalar("input float",   ImGuiDataType_Float,  &f32_v, inputs_step ? &f32_one : NULL);
            // ImGui.InputScalar("input double",  ImGuiDataType_Double, &f64_v, inputs_step ? &f64_one : NULL);
            ImGui.InputScalar("input s8", s8_v.value, inputs_step.value ? s8_one : null, null, "%d");
            ImGui.InputScalar("input s8 hex", s8_v.value, inputs_step.value ? s8_one : null, null, "%08X", imgui_10.ImGuiInputTextFlags.CharsHexadecimal);
            ImGui.InputScalar("input s16", s16_v.value, inputs_step.value ? s16_one : null, null, "%d");
            ImGui.InputScalar("input s16 hex", s16_v.value, inputs_step.value ? s16_one : null, null, "%08X", imgui_10.ImGuiInputTextFlags.CharsHexadecimal);
            ImGui.InputScalar("input s32", s32_v.value, inputs_step.value ? s32_one : null, null, "%d");
            ImGui.InputScalar("input s32 hex", s32_v.value, inputs_step.value ? s32_one : null, null, "%08X", imgui_10.ImGuiInputTextFlags.CharsHexadecimal);
            ImGui.InputScalar("input u32", u32_v.value, inputs_step.value ? u32_one : null, null, "%u");
            ImGui.InputScalar("input u32 hex", u32_v.value, inputs_step.value ? u32_one : null, null, "%08X", imgui_10.ImGuiInputTextFlags.CharsHexadecimal);
            // ImGui.InputScalar("input s64",     s64_v.value, inputs_step.value ? s64_one : null);
            // ImGui.InputScalar("input u64",     u64_v.value, inputs_step.value ? u64_one : null);
            ImGui.InputScalar("input float", f32_v.value, inputs_step.value ? f32_one : null);
            ImGui.InputScalar("input double", f64_v.value, inputs_step.value ? f64_one : null);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Multi-component Widgets")) {
            /* static */ const vec4f = STATIC("vec4f", [0.10, 0.20, 0.30, 0.44]);
            /* static */ const vec4i = STATIC("vec4i", [1, 5, 100, 255]);
            ImGui.InputFloat2("input float2", vec4f.value);
            ImGui.DragFloat2("drag float2", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat2("slider float2", vec4f.value, 0.0, 1.0);
            ImGui.InputInt2("input int2", vec4i.value);
            ImGui.DragInt2("drag int2", vec4i.value, 1, 0, 255);
            ImGui.SliderInt2("slider int2", vec4i.value, 0, 255);
            ImGui.Spacing();
            ImGui.InputFloat3("input float3", vec4f.value);
            ImGui.DragFloat3("drag float3", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat3("slider float3", vec4f.value, 0.0, 1.0);
            ImGui.InputInt3("input int3", vec4i.value);
            ImGui.DragInt3("drag int3", vec4i.value, 1, 0, 255);
            ImGui.SliderInt3("slider int3", vec4i.value, 0, 255);
            ImGui.Spacing();
            ImGui.InputFloat4("input float4", vec4f.value);
            ImGui.DragFloat4("drag float4", vec4f.value, 0.01, 0.0, 1.0);
            ImGui.SliderFloat4("slider float4", vec4f.value, 0.0, 1.0);
            ImGui.InputInt4("input int4", vec4i.value);
            ImGui.DragInt4("drag int4", vec4i.value, 1, 0, 255);
            ImGui.SliderInt4("slider int4", vec4i.value, 0, 255);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Vertical Sliders")) {
            const spacing = 4;
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_19.ImVec2(spacing, spacing));
            /* static */ const int_value = STATIC("int_value", 0);
            ImGui.VSliderInt("##int", new imgui_19.ImVec2(18, 160), (value = int_value.value) => int_value.value = value, 0, 5);
            ImGui.SameLine();
            /* static */ const values = STATIC("values#1072", [0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0]);
            ImGui.PushID("set1");
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBg, imgui_22.ImColor.HSV(i / 7.0, 0.5, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgHovered, imgui_22.ImColor.HSV(i / 7.0, 0.6, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgActive, imgui_22.ImColor.HSV(i / 7.0, 0.7, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.SliderGrab, imgui_22.ImColor.HSV(i / 7.0, 0.9, 0.9));
                ImGui.VSliderFloat("##v", new imgui_19.ImVec2(18, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
                if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                    ImGui.SetTooltip(`${values.value[i].toFixed(3)}`);
                ImGui.PopStyleColor(4);
                ImGui.PopID();
            }
            ImGui.PopID();
            ImGui.SameLine();
            ImGui.PushID("set2");
            /* static */ const values2 = STATIC("values2", [0.20, 0.80, 0.40, 0.25]);
            const rows = 3;
            const small_slider_size = new imgui_19.ImVec2(18, (160.0 - (rows - 1) * spacing) / rows);
            for (let nx = 0; nx < 4; nx++) {
                if (nx > 0)
                    ImGui.SameLine();
                ImGui.BeginGroup();
                for (let ny = 0; ny < rows; ny++) {
                    ImGui.PushID(nx * rows + ny);
                    ImGui.VSliderFloat("##v", small_slider_size, (value = values2.value[nx]) => values2.value[nx] = value, 0.0, 1.0, "");
                    if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                        ImGui.SetTooltip(`${values2.value[nx].toFixed(3)}`);
                    ImGui.PopID();
                }
                ImGui.EndGroup();
            }
            ImGui.PopID();
            ImGui.SameLine();
            ImGui.PushID("set3");
            for (let i = 0; i < 4; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.GrabMinSize, 40);
                ImGui.VSliderFloat("##v", new imgui_19.ImVec2(40, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
                ImGui.PopStyleVar();
                ImGui.PopID();
            }
            ImGui.PopID();
            ImGui.PopStyleVar();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Drag and Drop")) {
            {
                // ColorEdit widgets automatically act as drag source and drag target.
                // They are using standardized payload strings IMGUI_PAYLOAD_TYPE_COLOR_3F and IMGUI_PAYLOAD_TYPE_COLOR_4F to allow your own widgets
                // to use colors in their drag and drop interaction. Also see the demo in Color Picker -> Palette demo.
                ImGui.BulletText("Drag and drop in standard widgets");
                ImGui.Indent();
                /* static */ const col1 = STATIC("col1#1309", [1.0, 0.0, 0.2]);
                /* static */ const col2 = STATIC("col2#1310", [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit3("color 1", col1.value);
                ImGui.ColorEdit4("color 2", col2.value);
                ImGui.Unindent();
            }
            {
                ImGui.BulletText("Drag and drop to copy/swap items");
                ImGui.Indent();
                let Mode;
                (function (Mode) {
                    Mode[Mode["Mode_Copy"] = 0] = "Mode_Copy";
                    Mode[Mode["Mode_Move"] = 1] = "Mode_Move";
                    Mode[Mode["Mode_Swap"] = 2] = "Mode_Swap";
                })(Mode || (Mode = {}));
                ;
                /* static */ const mode = STATIC("mode", 0);
                if (ImGui.RadioButton("Copy", mode.value === Mode.Mode_Copy)) {
                    mode.value = Mode.Mode_Copy;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Move", mode.value === Mode.Mode_Move)) {
                    mode.value = Mode.Mode_Move;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Swap", mode.value === Mode.Mode_Swap)) {
                    mode.value = Mode.Mode_Swap;
                }
                /* static */ const names = STATIC("names", ["Bobby", "Beatrice", "Betty", "Brianna", "Barry", "Bernard", "Bibi", "Blaine", "Bryn"]);
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(names.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 3) != 0)
                        ImGui.SameLine();
                    ImGui.Button(names.value[n], new imgui_19.ImVec2(60, 60));
                    // Our buttons are both drag sources and drag targets here!
                    if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
                        // ImGui.SetDragDropPayload("DND_DEMO_CELL", &n, sizeof(int));        // Set payload to carry the index of our item (could be anything)
                        ImGui.SetDragDropPayload("DND_DEMO_CELL", { n }); // Set payload to carry the index of our item (could be anything)
                        if (mode.value === Mode.Mode_Copy) {
                            ImGui.Text(`Copy ${names.value[n]}`);
                        } // Display preview (could be anything, e.g. when dragging an image we could decide to display the filename and a small preview of the image, etc.)
                        if (mode.value === Mode.Mode_Move) {
                            ImGui.Text(`Move ${names.value[n]}`);
                        }
                        if (mode.value === Mode.Mode_Swap) {
                            ImGui.Text(`Swap ${names.value[n]}`);
                        }
                        ImGui.EndDragDropSource();
                    }
                    if (ImGui.BeginDragDropTarget()) {
                        let payload;
                        if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
                            // IM_ASSERT(payload->DataSize == sizeof(int));
                            // int payload_n = *(const int*)payload->Data;
                            const payload_n = payload.Data.n;
                            if (mode.value === Mode.Mode_Copy) {
                                names.value[n] = names.value[payload_n];
                            }
                            if (mode.value === Mode.Mode_Move) {
                                names.value[n] = names.value[payload_n];
                                names.value[payload_n] = "";
                            }
                            if (mode.value === Mode.Mode_Swap) {
                                const tmp = names.value[n];
                                names.value[n] = names.value[payload_n];
                                names.value[payload_n] = tmp;
                            }
                        }
                        ImGui.EndDragDropTarget();
                    }
                    ImGui.PopID();
                }
                ImGui.Unindent();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Querying Status (Active/Focused/Hovered etc.)")) {
            // Display the value of IsItemHovered() and other common item state functions. Note that the flags can be combined.
            // (because BulletText is an item itself and that would affect the output of IsItemHovered() we pass all state in a single call to simplify the code).
            /* static */ const item_type = STATIC("item_type", 1);
            /* static */ const b = STATIC("b#1302", false);
            /* static */ const col4f = STATIC("col4f", [1.0, 0.5, 0.0, 1.0]);
            ImGui.RadioButton("Text", (value = item_type.value) => item_type.value = value, 0);
            ImGui.RadioButton("Button", (value = item_type.value) => item_type.value = value, 1);
            ImGui.RadioButton("Checkbox", (value = item_type.value) => item_type.value = value, 2);
            ImGui.RadioButton("SliderFloat", (value = item_type.value) => item_type.value = value, 3);
            ImGui.RadioButton("InputText", (value = item_type.value) => item_type.value = value, 4);
            ImGui.RadioButton("InputFloat3", (value = item_type.value) => item_type.value = value, 5);
            ImGui.RadioButton("ColorEdit4", (value = item_type.value) => item_type.value = value, 6);
            ImGui.RadioButton("MenuItem", (value = item_type.value) => item_type.value = value, 7);
            ImGui.RadioButton("TreeNode (w/ double-click)", (value = item_type.value) => item_type.value = value, 8);
            ImGui.RadioButton("ListBox", (value = item_type.value) => item_type.value = value, 9);
            ImGui.Separator();
            let ret = false;
            if (item_type.value === 0) {
                ImGui.Text("ITEM: Text");
            } // Testing text items with no identifier/interaction
            if (item_type.value === 1) {
                ret = ImGui.Button("ITEM: Button");
            } // Testing button
            if (item_type.value === 2) {
                ret = ImGui.Checkbox("ITEM: Checkbox", (value = b.value) => b.value = value);
            } // Testing checkbox
            if (item_type.value === 3) {
                ret = ImGui.SliderFloat("ITEM: SliderFloat", (value = col4f.value[0]) => col4f.value[0] = value, 0.0, 1.0);
            } // Testing basic item
            // if (item_type.value === 4) { ret = ImGui.InputText("ITEM: InputText", &str[0], IM_ARRAYSIZE(str)); }  // Testing input text (which handles tabbing)
            // if (item_type.value === 5) { ret = ImGui.InputFloat3("ITEM: InputFloat3", col4f); }                   // Testing multi-component items (IsItemXXX flags are reported merged)
            if (item_type.value === 6) {
                ret = ImGui.ColorEdit4("ITEM: ColorEdit4", col4f.value);
            } // Testing multi-component items (IsItemXXX flags are reported merged)
            // if (item_type == 7) { ret = ImGui.MenuItem("ITEM: MenuItem"); }                                // Testing menu item (they use ImGuiButtonFlags_PressedOnRelease button policy)
            // if (item_type == 8) { ret = ImGui.TreeNodeEx("ITEM: TreeNode w/ ImGuiTreeNodeFlags_OpenOnDoubleClick", ImGuiTreeNodeFlags_OpenOnDoubleClick | ImGuiTreeNodeFlags_NoTreePushOnOpen); } // Testing tree node with ImGuiButtonFlags_PressedOnDoubleClick button policy.
            if (item_type.value === 9) {
                const items = ["Apple", "Banana", "Cherry", "Kiwi"]; /* static */
                const current = STATIC("current", 1);
                ret = ImGui.ListBox("ITEM: ListBox", (value = current.value) => current.value = value, items, imgui_3.IM_ARRAYSIZE(items), imgui_3.IM_ARRAYSIZE(items));
            }
            ImGui.BulletText(`Return value = ${ret}\n` +
                `IsItemFocused() = ${ImGui.IsItemFocused()}\n` +
                `IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenOverlapped)}\n` +
                `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.RectOnly)}\n` +
                `IsItemActive() = ${ImGui.IsItemActive()}\n` +
                `IsItemEdited() = ${ImGui.IsItemEdited()}\n` +
                `IsItemActivated() = ${ImGui.IsItemActivated()}\n` +
                `IsItemDeactivated() = ${ImGui.IsItemDeactivated()}\n` +
                `IsItemDeactivatedAfterEdit() = ${ImGui.IsItemDeactivatedAfterEdit()}\n` +
                `IsItemVisible() = ${ImGui.IsItemVisible()}\n` +
                `IsItemClicked() = ${ImGui.IsItemClicked()}\n` +
                `GetItemRectMin() = (${ImGui.GetItemRectMin().x.toFixed(1)}, ${ImGui.GetItemRectMin().y.toFixed(1)})\n` +
                `GetItemRectMax() = (${ImGui.GetItemRectMax().x.toFixed(1)}, ${ImGui.GetItemRectMax().y.toFixed(1)})\n` +
                `GetItemRectSize() = (${ImGui.GetItemRectSize().x.toFixed(1)}, ${ImGui.GetItemRectSize().y.toFixed(1)})`);
            /* static */ const embed_all_inside_a_child_window = STATIC("embed_all_inside_a_child_window", false);
            ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
            if (embed_all_inside_a_child_window.value)
                ImGui.BeginChild("outer_child", new imgui_19.ImVec2(0, ImGui.GetFontSize() * 20), true);
            // Testing IsWindowFocused() function with its various flags. Note that the flags can be combined.
            ImGui.BulletText(`IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
                `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(imgui_8.ImGuiFocusedFlags.ChildWindows)}\n` +
                `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(imgui_8.ImGuiFocusedFlags.ChildWindows | imgui_8.ImGuiFocusedFlags.RootWindow)}\n` +
                `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(imgui_8.ImGuiFocusedFlags.RootWindow)}\n` +
                `IsWindowFocused(_AnyWindow) = ${ImGui.IsWindowFocused(imgui_8.ImGuiFocusedFlags.AnyWindow)}\n`);
            // Testing IsWindowHovered() function with its various flags. Note that the flags can be combined.
            ImGui.BulletText(`IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
                `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.ChildWindows)}\n` +
                `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.ChildWindows | imgui_9.ImGuiHoveredFlags.RootWindow)}\n` +
                `IsWindowFocused(_ChildWindows|_AllowWhenBlockedByPopup) = ${ImGui.IsWindowFocused(imgui_9.ImGuiHoveredFlags.ChildWindows | imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.RootWindow)}\n` +
                `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.AnyWindow)}\n`);
            ImGui.BeginChild("child", new imgui_19.ImVec2(0, 50), true);
            ImGui.Text("This is another child window for testing the _ChildWindows flag.");
            ImGui.EndChild();
            if (embed_all_inside_a_child_window.value)
                ImGui.EndChild();
            // static char dummy_str[] = "This is a dummy field to be able to tab-out of the widgets above.";
            // ImGui.InputText("dummy", dummy_str, IM_ARRAYSIZE(dummy_str), ImGuiInputTextFlags_ReadOnly);
            // Calling IsItemHovered() after begin returns the hovered status of the title bar.
            // This is useful in particular if you want to create a context menu (with BeginPopupContextItem) associated to the title bar of a window.
            /* static */ const test_window = STATIC("test_window", false);
            ImGui.Checkbox("Hovered/Active tests after Begin() for title bar testing", (value = test_window.value) => test_window.value = value);
            if (test_window.value) {
                ImGui.Begin("Title bar Hovered/Active tests", (value = test_window.value) => test_window.value = value);
                if (ImGui.BeginPopupContextItem()) // <-- This is using IsItemHovered()
                 {
                    if (ImGui.MenuItem("Close")) {
                        test_window.value = false;
                    }
                    ImGui.EndPopup();
                }
                ImGui.Text(`IsItemHovered() after begin = ${ImGui.IsItemHovered()} (== is title bar hovered)\n` +
                    `IsItemActive() after begin = ${ImGui.IsItemActive()} (== is window being clicked/moved)\n`);
                ImGui.End();
            }
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowLayout() {
        if (!ImGui.CollapsingHeader("Layout"))
            return;
        if (ImGui.TreeNode("Child windows")) {
            HelpMarker("Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window.");
            /* static */ const disable_mouse_wheel = STATIC("disable_mouse_wheel", false);
            /* static */ const disable_menu = STATIC("disable_menu", false);
            ImGui.Checkbox("Disable Mouse Wheel", (value = disable_mouse_wheel.value) => disable_mouse_wheel.value = value);
            ImGui.Checkbox("Disable Menu", (value = disable_menu.value) => disable_menu.value = value);
            /* static */ const line = STATIC("line", 50);
            let goto_line = ImGui.Button("Goto");
            ImGui.SameLine();
            ImGui.SetNextItemWidth(100);
            goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, imgui_10.ImGuiInputTextFlags.EnterReturnsTrue) || goto_line;
            // Child 1: no border, enable horizontal scrollbar
            {
                const window_flags = imgui_15.ImGuiWindowFlags.HorizontalScrollbar | (disable_mouse_wheel.value ? imgui_15.ImGuiWindowFlags.NoScrollWithMouse : 0);
                ImGui.BeginChild("Child1", new imgui_19.ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5, 260), false, window_flags);
                for (let i = 0; i < 100; i++) {
                    ImGui.Text(`${format_number_dec(i, 4)}: scrollable region`);
                    if (goto_line && line.value === i)
                        ImGui.SetScrollHereY();
                }
                if (goto_line && line.value >= 100)
                    ImGui.SetScrollHereY();
                ImGui.EndChild();
            }
            ImGui.SameLine();
            // Child 2: rounded border
            {
                const window_flags = (disable_mouse_wheel.value ? imgui_15.ImGuiWindowFlags.NoScrollWithMouse : 0) | (disable_menu.value ? 0 : imgui_15.ImGuiWindowFlags.MenuBar);
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ChildRounding, 5.0);
                ImGui.BeginChild("Child2", new imgui_19.ImVec2(0, 260), true, window_flags);
                if (!disable_menu.value && ImGui.BeginMenuBar()) {
                    if (ImGui.BeginMenu("Menu")) {
                        ShowExampleMenuFile();
                        ImGui.EndMenu();
                    }
                    ImGui.EndMenuBar();
                }
                ImGui.Columns(2);
                for (let i = 0; i < 100; i++) {
                    // sprintf(buf, "%03d", i);
                    const buf = `${format_number_dec(i, 3)}`;
                    ImGui.Button(buf, new imgui_19.ImVec2(-1.0, 0.0));
                    ImGui.NextColumn();
                }
                ImGui.EndChild();
                ImGui.PopStyleVar();
            }
            ImGui.Separator();
            // Demonstrate a few extra things
            // - Changing ImGuiCol_ChildBg (which is transparent black in default styles)
            // - Using SetCursorPos() to position the child window (because the child window is an item from the POV of the parent window)
            //   You can also call SetNextWindowPos() to position the child window. The parent window will effectively layout from this position.
            // - Using ImGui.GetItemRectMin/Max() to query the "item" state (because the child window is an item from the POV of the parent window)
            //   See "Widgets" -> "Querying Status (Active/Focused/Hovered etc.)" section for more details about this.
            {
                ImGui.SetCursorPosX(50);
                ImGui.PushStyleColor(imgui_5.ImGuiCol.ChildBg, imgui_21.IM_COL32(255, 0, 0, 100));
                ImGui.BeginChild("blah", new imgui_19.ImVec2(200, 100), true, imgui_15.ImGuiWindowFlags.None);
                for (let n = 0; n < 50; n++)
                    ImGui.Text(`Some test ${n}`);
                ImGui.EndChild();
                const child_rect_min = ImGui.GetItemRectMin();
                const child_rect_max = ImGui.GetItemRectMax();
                ImGui.PopStyleColor();
                ImGui.Text(`Rect of child window is: (${child_rect_min.x.toFixed(0)},${child_rect_min.y.toFixed(0)}) (${child_rect_max.x.toFixed(0)},${child_rect_max.y.toFixed(0)})`);
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Widgets Width")) {
            // Use SetNextItemWidth() to set the width of a single upcoming item.
            // Use PushItemWidth()/PopItemWidth() to set the width of a group of items.
            /* static */ const f = STATIC("f#1181", 0.0);
            ImGui.Text("SetNextItemWidth/PushItemWidth(100)");
            ImGui.SameLine();
            HelpMarker("Fixed width.");
            ImGui.SetNextItemWidth(100);
            ImGui.DragFloat("float##1", (value = f.value) => f.value = value);
            ImGui.Text("SetNextItemWidth/PushItemWidth(GetWindowWidth() * 0.5f)");
            ImGui.SameLine();
            HelpMarker("Half of window width.");
            ImGui.SetNextItemWidth(ImGui.GetWindowWidth() * 0.5);
            ImGui.DragFloat("float##2", (value = f.value) => f.value = value);
            ImGui.Text("SetNextItemWidth/PushItemWidth(GetContentRegionAvail().x * 0.5f)");
            ImGui.SameLine();
            HelpMarker("Half of available width.\n(~ right-cursor_pos)\n(works within a column set)");
            ImGui.SetNextItemWidth(ImGui.GetContentRegionAvail().x * 0.5);
            ImGui.DragFloat("float##3", (value = f.value) => f.value = value);
            ImGui.Text("SetNextItemWidth/PushItemWidth(-100)");
            ImGui.SameLine();
            HelpMarker("Align to right edge minus 100");
            ImGui.SetNextItemWidth(-100);
            ImGui.DragFloat("float##4", (value = f.value) => f.value = value);
            // Demonstrate using PushItemWidth to surround three items. Calling SetNextItemWidth() before each of them would have the same effect.
            ImGui.Text("SetNextItemWidth/PushItemWidth(-1)");
            ImGui.SameLine();
            HelpMarker("Align to right edge");
            ImGui.PushItemWidth(-1);
            ImGui.DragFloat("float##5a", (value = f.value) => f.value = value);
            ImGui.DragFloat("float##5b", (value = f.value) => f.value = value);
            ImGui.DragFloat("float##5c", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Basic Horizontal Layout")) {
            ImGui.TextWrapped("(Use ImGui.SameLine() to keep adding items to the right of the preceding item)");
            // Text
            ImGui.Text("Two items: Hello");
            ImGui.SameLine();
            ImGui.TextColored(new imgui_20.ImVec4(1, 1, 0, 1), "Sailor");
            // Adjust spacing
            ImGui.Text("More spacing: Hello");
            ImGui.SameLine(0, 20);
            ImGui.TextColored(new imgui_20.ImVec4(1, 1, 0, 1), "Sailor");
            // Button
            ImGui.AlignTextToFramePadding();
            ImGui.Text("Normal buttons");
            ImGui.SameLine();
            ImGui.Button("Banana");
            ImGui.SameLine();
            ImGui.Button("Apple");
            ImGui.SameLine();
            ImGui.Button("Corniflower");
            // Button
            ImGui.Text("Small buttons");
            ImGui.SameLine();
            ImGui.SmallButton("Like this one");
            ImGui.SameLine();
            ImGui.Text("can fit within a text block.");
            // Aligned to arbitrary position. Easy/cheap column.
            ImGui.Text("Aligned");
            ImGui.SameLine(150);
            ImGui.Text("x=150");
            ImGui.SameLine(300);
            ImGui.Text("x=300");
            ImGui.Text("Aligned");
            ImGui.SameLine(150);
            ImGui.SmallButton("x=150");
            ImGui.SameLine(300);
            ImGui.SmallButton("x=300");
            // Checkbox
            /* static */ const c1 = STATIC("c1", false), c2 = STATIC("c2", false), c3 = STATIC("c3", false), c4 = STATIC("c4", false);
            ImGui.Checkbox("My", (value = c1.value) => c1.value = value);
            ImGui.SameLine();
            ImGui.Checkbox("Tailor", (value = c2.value) => c2.value = value);
            ImGui.SameLine();
            ImGui.Checkbox("Is", (value = c3.value) => c3.value = value);
            ImGui.SameLine();
            ImGui.Checkbox("Rich", (value = c4.value) => c4.value = value);
            // Various
            /* static */ const f0 = STATIC("f0#1255", 1.0), f1 = STATIC("f1#1255", 2.0), f2 = STATIC("f2", 3.0);
            ImGui.PushItemWidth(80);
            const items = ["AAAA", "BBBB", "CCCC", "DDDD"];
            /* static */ const item = STATIC("item#1258", -1);
            ImGui.Combo("Combo", (value = item.value) => item.value = value, items, imgui_3.IM_ARRAYSIZE(items));
            ImGui.SameLine();
            ImGui.SliderFloat("X", (value = f0.value) => f0.value = value, 0.0, 5.0);
            ImGui.SameLine();
            ImGui.SliderFloat("Y", (value = f1.value) => f1.value = value, 0.0, 5.0);
            ImGui.SameLine();
            ImGui.SliderFloat("Z", (value = f2.value) => f2.value = value, 0.0, 5.0);
            ImGui.PopItemWidth();
            ImGui.PushItemWidth(80);
            ImGui.Text("Lists:");
            /* static */ const selection = STATIC("selection", [0, 1, 2, 3]);
            for (let i = 0; i < 4; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.ListBox("", (value = selection.value[i]) => selection.value[i] = value, items, imgui_3.IM_ARRAYSIZE(items));
                ImGui.PopID();
                if (ImGui.IsItemHovered())
                    ImGui.SetTooltip(`ListBox ${i} hovered`);
            }
            ImGui.PopItemWidth();
            // Dummy
            const button_sz = new imgui_19.ImVec2(40, 40);
            ImGui.Button("A", button_sz);
            ImGui.SameLine();
            ImGui.Dummy(button_sz);
            ImGui.SameLine();
            ImGui.Button("B", button_sz);
            // Manually wrapping (we should eventually provide this as an automatic layout feature, but for now you can do it manually)
            ImGui.Text("Manually wrapping:");
            const style = ImGui.GetStyle();
            const buttons_count = 20;
            const window_visible_x2 = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x;
            for (let n = 0; n < buttons_count; n++) {
                ImGui.PushID(n);
                ImGui.Button("Box", button_sz);
                const last_button_x2 = ImGui.GetItemRectMax().x;
                const next_button_x2 = last_button_x2 + style.ItemSpacing.x + button_sz.x; // Expected position if next button was on same line
                if (n + 1 < buttons_count && next_button_x2 < window_visible_x2)
                    ImGui.SameLine();
                ImGui.PopID();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Tabs")) {
            if (ImGui.TreeNode("Basic")) {
                const tab_bar_flags = imgui_16.ImGuiTabBarFlags.None;
                if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags)) {
                    if (ImGui.BeginTabItem("Avocado")) {
                        ImGui.Text("This is the Avocado tab!\nblah blah blah blah blah");
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("Broccoli")) {
                        ImGui.Text("This is the Broccoli tab!\nblah blah blah blah blah");
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("Cucumber")) {
                        ImGui.Text("This is the Cucumber tab!\nblah blah blah blah blah");
                        ImGui.EndTabItem();
                    }
                    ImGui.EndTabBar();
                }
                ImGui.Separator();
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Advanced & Close Button")) {
                // Expose a couple of the available flags. In most cases you may just call BeginTabBar() with no flags (0).
                /* static */ const tab_bar_flags = STATIC("tab_bar_flags", imgui_16.ImGuiTabBarFlags.Reorderable);
                ImGui.CheckboxFlags("ImGuiTabBarFlags_Reorderable", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.Reorderable);
                ImGui.CheckboxFlags("ImGuiTabBarFlags_AutoSelectNewTabs", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.AutoSelectNewTabs);
                ImGui.CheckboxFlags("ImGuiTabBarFlags_TabListPopupButton", (value = tab_bar_flags.value) => tab_bar_flags.value = value, imgui_16.ImGuiTabBarFlags.TabListPopupButton);
                ImGui.CheckboxFlags("ImGuiTabBarFlags_NoCloseWithMiddleMouseButton", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.NoCloseWithMiddleMouseButton);
                if ((tab_bar_flags.value & imgui_16.ImGuiTabBarFlags.FittingPolicyMask_) === 0)
                    tab_bar_flags.value |= imgui_16.ImGuiTabBarFlags.FittingPolicyDefault_;
                if (ImGui.CheckboxFlags("ImGuiTabBarFlags_FittingPolicyResizeDown", (value = tab_bar_flags.value) => tab_bar_flags.value = value, imgui_16.ImGuiTabBarFlags.FittingPolicyResizeDown))
                    tab_bar_flags.value &= ~(imgui_16.ImGuiTabBarFlags.FittingPolicyMask_ ^ imgui_16.ImGuiTabBarFlags.FittingPolicyResizeDown);
                if (ImGui.CheckboxFlags("ImGuiTabBarFlags_FittingPolicyScroll", (value = tab_bar_flags.value) => tab_bar_flags.value = value, imgui_16.ImGuiTabBarFlags.FittingPolicyScroll))
                    tab_bar_flags.value &= ~(imgui_16.ImGuiTabBarFlags.FittingPolicyMask_ ^ imgui_16.ImGuiTabBarFlags.FittingPolicyScroll);
                // Tab Bar
                const names = ["Artichoke", "Beetroot", "Celery", "Daikon"];
                /* static */ const opened = STATIC("opened", [true, true, true, true]); // Persistent user state
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(opened.value); n++) {
                    if (n > 0) {
                        ImGui.SameLine();
                    }
                    ImGui.Checkbox(names[n], (value = opened.value[n]) => opened.value[n] = value);
                }
                // Passing a bool* to BeginTabItem() is similar to passing one to Begin(): the underlying bool will be set to false when the tab is closed.
                if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags.value)) {
                    for (let n = 0; n < imgui_3.IM_ARRAYSIZE(opened.value); n++)
                        if (opened.value[n] && ImGui.BeginTabItem(names[n], (value = opened.value[n]) => opened.value[n] = value)) {
                            ImGui.Text(`This is the ${names[n]} tab!`);
                            if (n & 1)
                                ImGui.Text("I am an odd tab.");
                            ImGui.EndTabItem();
                        }
                    ImGui.EndTabBar();
                }
                ImGui.Separator();
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Groups")) {
            HelpMarker("Using ImGui.BeginGroup()/EndGroup() to layout items. BeginGroup() basically locks the horizontal position. EndGroup() bundles the whole group so that you can use functions such as IsItemHovered() on it.");
            ImGui.BeginGroup();
            {
                ImGui.BeginGroup();
                ImGui.Button("AAA");
                ImGui.SameLine();
                ImGui.Button("BBB");
                ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Button("CCC");
                ImGui.Button("DDD");
                ImGui.EndGroup();
                ImGui.SameLine();
                ImGui.Button("EEE");
                ImGui.EndGroup();
                if (ImGui.IsItemHovered())
                    ImGui.SetTooltip("First group hovered");
            }
            // Capture the group size and create widgets using the same size
            const size = ImGui.GetItemRectSize();
            const values = [0.5, 0.20, 0.80, 0.60, 0.25];
            ImGui.PlotHistogram("##values", values, imgui_3.IM_ARRAYSIZE(values), 0, null, 0.0, 1.0, size);
            ImGui.Button("ACTION", new imgui_19.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.SameLine();
            ImGui.Button("REACTION", new imgui_19.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.EndGroup();
            ImGui.SameLine();
            ImGui.Button("LEVERAGE\nBUZZWORD", size);
            ImGui.SameLine();
            if (ImGui.ListBoxHeader("List", size)) {
                ImGui.Selectable("Selected", true);
                ImGui.Selectable("Not Selected", false);
                ImGui.ListBoxFooter();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Text Baseline Alignment")) {
            HelpMarker("This is testing the vertical alignment that gets applied on text to keep it aligned with widgets. Lines only composed of text or \"small\" widgets fit in less vertical spaces than lines with normal widgets.");
            ImGui.Text("One\nTwo\nThree");
            ImGui.SameLine();
            ImGui.Text("Hello\nWorld");
            ImGui.SameLine();
            ImGui.Text("Banana");
            ImGui.Text("Banana");
            ImGui.SameLine();
            ImGui.Text("Hello\nWorld");
            ImGui.SameLine();
            ImGui.Text("One\nTwo\nThree");
            ImGui.Button("HOP##1");
            ImGui.SameLine();
            ImGui.Text("Banana");
            ImGui.SameLine();
            ImGui.Text("Hello\nWorld");
            ImGui.SameLine();
            ImGui.Text("Banana");
            ImGui.Button("HOP##2");
            ImGui.SameLine();
            ImGui.Text("Hello\nWorld");
            ImGui.SameLine();
            ImGui.Text("Banana");
            ImGui.Button("TEST##1");
            ImGui.SameLine();
            ImGui.Text("TEST");
            ImGui.SameLine();
            ImGui.SmallButton("TEST##2");
            ImGui.AlignTextToFramePadding(); // If your line starts with text, call this to align it to upcoming widgets.
            ImGui.Text("Text aligned to Widget");
            ImGui.SameLine();
            ImGui.Button("Widget##1");
            ImGui.SameLine();
            ImGui.Text("Widget");
            ImGui.SameLine();
            ImGui.SmallButton("Widget##2");
            ImGui.SameLine();
            ImGui.Button("Widget##3");
            // Tree
            const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
            ImGui.Button("Button##1");
            ImGui.SameLine(0.0, spacing);
            if (ImGui.TreeNode("Node##1")) {
                for (let i = 0; i < 6; i++)
                    ImGui.BulletText(`Item ${i}..`);
                ImGui.TreePop();
            } // Dummy tree data
            ImGui.AlignTextToFramePadding(); // Vertically align text node a bit lower so it'll be vertically centered with upcoming widget. Otherwise you can use SmallButton (smaller fit).
            const node_open = ImGui.TreeNode("Node##2"); // Common mistake to avoid: if we want to SameLine after TreeNode we need to do it before we add child content.
            ImGui.SameLine(0.0, spacing);
            ImGui.Button("Button##2");
            if (node_open) {
                for (let i = 0; i < 6; i++)
                    ImGui.BulletText(`Item ${i}..`);
                ImGui.TreePop();
            } // Dummy tree data
            // Bullet
            ImGui.Button("Button##3");
            ImGui.SameLine(0.0, spacing);
            ImGui.BulletText("Bullet text");
            ImGui.AlignTextToFramePadding();
            ImGui.BulletText("Node");
            ImGui.SameLine(0.0, spacing);
            ImGui.Button("Button##4");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Scrolling")) {
            HelpMarker("Use SetScrollHereY() or SetScrollFromPosY() to scroll to a given position.");
            /* static */ const track = STATIC("track", true);
            /* static */ const track_line = STATIC("track_line", 50);
            /* static */ const scroll_to_off_px = STATIC("scroll_to_off_px", 0);
            /* static */ const scroll_to_pos_px = STATIC("scroll_to_pos_px", 200);
            ImGui.Checkbox("Track", (value = track.value) => track.value = value);
            ImGui.PushItemWidth(100);
            ImGui.SameLine(140);
            track.value = ImGui.DragInt("##line", (value = track_line.value) => track_line.value = value, 0.25, 0, 99, "Line = %d") || track.value;
            let scroll_to_off = ImGui.Button("Scroll Offset");
            ImGui.SameLine(140);
            scroll_to_off = ImGui.DragFloat("##off_y", (value = scroll_to_off_px.value) => scroll_to_off_px.value = value, 1.00, 0, 9999, "+%.0f px") || scroll_to_off;
            let scroll_to_pos = ImGui.Button("Scroll To Pos");
            ImGui.SameLine(140);
            scroll_to_pos = ImGui.DragInt("##pos_y", (value = scroll_to_pos_px.value) => scroll_to_pos_px.value = value, 1.00, 0, 9999, "Y = %d px") || scroll_to_pos;
            ImGui.PopItemWidth();
            if (scroll_to_off || scroll_to_pos)
                track.value = false;
            const style = ImGui.GetStyle();
            const child_w = (ImGui.GetContentRegionAvail().x - 4 * style.ItemSpacing.x) / 5;
            for (let i = 0; i < 5; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text(i === 0 ? "Top" : i === 1 ? "25%" : i === 2 ? "Center" : i === 3 ? "75%" : "Bottom");
                const child_flags = imgui_15.ImGuiWindowFlags.MenuBar;
                ImGui.BeginChild(ImGui.GetID(i), new imgui_19.ImVec2(child_w, 200.0), true, child_flags);
                if (scroll_to_off)
                    ImGui.SetScrollY(scroll_to_off_px.value);
                if (scroll_to_pos)
                    ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_pos_px.value, i * 0.25);
                for (let line = 0; line < 100; line++) {
                    if (track.value && line === track_line.value) {
                        ImGui.TextColored(new imgui_20.ImVec4(1, 1, 0, 1), `Line ${line}`);
                        ImGui.SetScrollHereY(i * 0.25); // 0.0:top, 0.5f:center, 1.0f:bottom
                    }
                    else {
                        ImGui.Text(`Line ${line}`);
                    }
                }
                const scroll_y = ImGui.GetScrollY();
                const scroll_max_y = ImGui.GetScrollMaxY();
                ImGui.EndChild();
                ImGui.Text(`${scroll_y.toFixed(0)}/${scroll_max_y.toFixed(0)}`);
                ImGui.EndGroup();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Horizontal Scrolling")) {
            HelpMarker("Horizontal scrolling for a window has to be enabled explicitly via the ImGuiWindowFlags_HorizontalScrollbar flag.\n\nYou may want to explicitly specify content width by calling SetNextWindowContentWidth() before Begin().");
            /* static */ const lines = STATIC("lines#1432", 7);
            ImGui.SliderInt("Lines", (value = lines.value) => lines.value = value, 1, 15);
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FrameRounding, 3.0);
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_19.ImVec2(2.0, 1.0));
            ImGui.BeginChild("scrolling", new imgui_19.ImVec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30), true, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
            for (let line = 0; line < lines.value; line++) {
                // Display random stuff (for the sake of this trivial demo we are using basic Button+SameLine. If you want to create your own time line for a real application you may be better off
                // manipulating the cursor position yourself, aka using SetCursorPos/SetCursorScreenPos to position the widgets yourself. You may also want to use the lower-level ImDrawList API)
                const num_buttons = 10 + ((line & 1) ? line * 9 : line * 3);
                for (let n = 0; n < num_buttons; n++) {
                    if (n > 0)
                        ImGui.SameLine();
                    ImGui.PushID(n + line * 1000);
                    const num_buf = n.toFixed(0);
                    const label = (!(n % 15)) ? "FizzBuzz" : (!(n % 3)) ? "Fizz" : (!(n % 5)) ? "Buzz" : num_buf;
                    const hue = n * 0.05;
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_22.ImColor.HSV(hue, 0.6, 0.6));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_22.ImColor.HSV(hue, 0.7, 0.7));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_22.ImColor.HSV(hue, 0.8, 0.8));
                    ImGui.Button(label, new imgui_19.ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
                    ImGui.PopStyleColor(3);
                    ImGui.PopID();
                }
            }
            const scroll_x = ImGui.GetScrollX();
            const scroll_max_x = ImGui.GetScrollMaxX();
            ImGui.EndChild();
            ImGui.PopStyleVar(2);
            let scroll_x_delta = 0.0;
            ImGui.SmallButton("<<");
            if (ImGui.IsItemActive()) {
                scroll_x_delta = -ImGui.GetIO().DeltaTime * 1000.0;
            }
            ImGui.SameLine();
            ImGui.Text("Scroll from code");
            ImGui.SameLine();
            ImGui.SmallButton(">>");
            if (ImGui.IsItemActive()) {
                scroll_x_delta = +ImGui.GetIO().DeltaTime * 1000.0;
            }
            ImGui.SameLine();
            ImGui.Text(`${scroll_x.toFixed(0)}/${scroll_max_x.toFixed(0)}`);
            if (scroll_x_delta !== 0.0) {
                ImGui.BeginChild("scrolling"); // Demonstrate a trick: you can use Begin to set yourself in the context of another window (here we are already out of your child window)
                ImGui.SetScrollX(ImGui.GetScrollX() + scroll_x_delta);
                ImGui.EndChild();
            }
            // TODO
            // ImGui.Spacing();
            // static bool show_horizontal_contents_size_demo_window = false;
            // ImGui.Checkbox("Show Horizontal contents size demo window", &show_horizontal_contents_size_demo_window);
            // if (show_horizontal_contents_size_demo_window)
            // {
            //     static bool show_h_scrollbar = true;
            //     static bool show_button = true;
            //     static bool show_tree_nodes = true;
            //     static bool show_text_wrapped = false;
            //     static bool show_columns = true;
            //     static bool show_tab_bar = true;
            //     static bool show_child = false;
            //     static bool explicit_content_size = false;
            //     static float contents_size_x = 300.0f;
            //     if (explicit_content_size)
            //         ImGui.SetNextWindowContentSize(ImVec2(contents_size_x, 0.0f));
            //     ImGui.Begin("Horizontal contents size demo window", &show_horizontal_contents_size_demo_window, show_h_scrollbar ? ImGuiWindowFlags_HorizontalScrollbar : 0);
            //     ImGui.PushStyleVar(ImGuiStyleVar_ItemSpacing, ImVec2(2, 0));
            //     ImGui.PushStyleVar(ImGuiStyleVar_FramePadding, ImVec2(2, 0));
            //     HelpMarker("Test of different widgets react and impact the work rectangle growing when horizontal scrolling is enabled.\n\nUse 'Metrics->Tools->Show windows rectangles' to visualize rectangles.");
            //     ImGui.Checkbox("H-scrollbar", &show_h_scrollbar);
            //     ImGui.Checkbox("Button", &show_button);            // Will grow contents size (unless explicitly overwritten)
            //     ImGui.Checkbox("Tree nodes", &show_tree_nodes);    // Will grow contents size and display highlight over full width
            //     ImGui.Checkbox("Text wrapped", &show_text_wrapped);// Will grow and use contents size
            //     ImGui.Checkbox("Columns", &show_columns);          // Will use contents size
            //     ImGui.Checkbox("Tab bar", &show_tab_bar);          // Will use contents size
            //     ImGui.Checkbox("Child", &show_child);              // Will grow and use contents size
            //     ImGui.Checkbox("Explicit content size", &explicit_content_size);
            //     ImGui.Text("Scroll %.1f/%.1f %.1f/%.1f", ImGui.GetScrollX(), ImGui.GetScrollMaxX(), ImGui.GetScrollY(), ImGui.GetScrollMaxY());
            //     if (explicit_content_size)
            //     {
            //         ImGui.SameLine();
            //         ImGui.SetNextItemWidth(100);
            //         ImGui.DragFloat("##csx", &contents_size_x);
            //         ImVec2 p = ImGui.GetCursorScreenPos();
            //         ImGui.GetWindowDrawList()->AddRectFilled(p, ImVec2(p.x + 10, p.y + 10), IM_COL32_WHITE);
            //         ImGui.GetWindowDrawList()->AddRectFilled(ImVec2(p.x + contents_size_x - 10, p.y), ImVec2(p.x + contents_size_x, p.y + 10), IM_COL32_WHITE);
            //         ImGui.Dummy(ImVec2(0, 10));
            //     }
            //     ImGui.PopStyleVar(2);
            //     ImGui.Separator();
            //     if (show_button)
            //     {
            //         ImGui.Button("this is a 300-wide button", ImVec2(300, 0));
            //     }
            //     if (show_tree_nodes)
            //     {
            //         bool open = true;
            //         if (ImGui.TreeNode("this is a tree node"))
            //         {
            //             if (ImGui.TreeNode("another one of those tree node..."))
            //             {
            //                 ImGui.Text("Some tree contents");
            //                 ImGui.TreePop();
            //             }
            //             ImGui.TreePop();
            //         }
            //         ImGui.CollapsingHeader("CollapsingHeader", &open);
            //     }
            //     if (show_text_wrapped)
            //     {
            //         ImGui.TextWrapped("This text should automatically wrap on the edge of the work rectangle.");
            //     }
            //     if (show_columns)
            //     {
            //         ImGui.Columns(4);
            //         for (int n = 0; n < 4; n++)
            //         {
            //             ImGui.Text("Width %.2f", ImGui.GetColumnWidth());
            //             ImGui.NextColumn();
            //         }
            //         ImGui.Columns(1);
            //     }
            //     if (show_tab_bar && ImGui.BeginTabBar("Hello"))
            //     {
            //         if (ImGui.BeginTabItem("OneOneOne")) { ImGui.EndTabItem(); }
            //         if (ImGui.BeginTabItem("TwoTwoTwo")) { ImGui.EndTabItem(); }
            //         if (ImGui.BeginTabItem("ThreeThreeThree")) { ImGui.EndTabItem(); }
            //         if (ImGui.BeginTabItem("FourFourFour")) { ImGui.EndTabItem(); }
            //         ImGui.EndTabBar();
            //     }
            //     if (show_child)
            //     {
            //         ImGui.BeginChild("child", ImVec2(0,0), true);
            //         ImGui.EndChild();
            //     }
            //     ImGui.End();
            // }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Clipping")) {
            /* static */ const size = STATIC("size", new imgui_19.ImVec2(100, 100)), offset = STATIC("offset", new imgui_19.ImVec2(50, 20));
            ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
            ImGui.DragFloat2("size", size.value, 0.5, 1.0, 200.0, "%.0f");
            ImGui.TextWrapped("(Click and drag)");
            const pos = ImGui.GetCursorScreenPos();
            const clip_rect = new imgui_20.ImVec4(pos.x, pos.y, pos.x + size.value.x, pos.y + size.value.y);
            ImGui.InvisibleButton("##dummy", size.value);
            if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) {
                offset.value.x += ImGui.GetIO().MouseDelta.x;
                offset.value.y += ImGui.GetIO().MouseDelta.y;
            }
            ImGui.GetWindowDrawList().AddRectFilled(pos, new imgui_19.ImVec2(pos.x + size.value.x, pos.y + size.value.y), imgui_21.IM_COL32(90, 90, 120, 255));
            ImGui.GetWindowDrawList().AddText(ImGui.GetFont(), ImGui.GetFontSize() * 2.0, new imgui_19.ImVec2(pos.x + offset.value.x, pos.y + offset.value.y), imgui_21.IM_COL32(255, 255, 255, 255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowPopups() {
        if (!ImGui.CollapsingHeader("Popups & Modal windows"))
            return;
        // The properties of popups windows are:
        // - They block normal mouse hovering detection outside them. (*)
        // - Unless modal, they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
        // - Their visibility state (~bool) is held internally by Dear ImGui instead of being held by the programmer as we are used to with regular Begin() calls.
        //   User can manipulate the visibility state by calling OpenPopup().
        // (*) One can use IsItemHovered(ImGuiHoveredFlags_AllowWhenBlockedByPopup) to bypass it and detect hovering even when normally blocked by a popup.
        // Those three properties are connected. The library needs to hold their visibility state because it can close popups at any time.
        // Typical use for regular windows:
        //   bool my_tool_is_active = false; if (ImGui.Button("Open")) my_tool_is_active = true; [...] if (my_tool_is_active) Begin("My Tool", &my_tool_is_active) { [...] } End();
        // Typical use for popups:
        //   if (ImGui.Button("Open")) ImGui.OpenPopup("MyPopup"); if (ImGui.BeginPopup("MyPopup") { [...] EndPopup(); }
        // With popups we have to go through a library call (here OpenPopup) to manipulate the visibility state.
        // This may be a bit confusing at first but it should quickly make sense. Follow on the examples below.
        if (ImGui.TreeNode("Popups")) {
            ImGui.TextWrapped("When a popup is active, it inhibits interacting with windows that are behind the popup. Clicking outside the popup closes it.");
            /* static */ const selected_fish = STATIC("selected_fish", -1);
            const names = ["Bream", "Haddock", "Mackerel", "Pollock", "Tilefish"];
            /* static */ const toggles = STATIC("toggles", [true, false, false, false, false]);
            // Simple selection popup
            // (If you want to show the current selection inside the Button itself, you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
            if (ImGui.Button("Select.."))
                ImGui.OpenPopup("my_select_popup");
            ImGui.SameLine();
            ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value]);
            if (ImGui.BeginPopup("my_select_popup")) {
                ImGui.Text("Aquarium");
                ImGui.Separator();
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(names); i++)
                    if (ImGui.Selectable(names[i]))
                        selected_fish.value = i;
                ImGui.EndPopup();
            }
            // Showing a menu with toggles
            if (ImGui.Button("Toggle.."))
                ImGui.OpenPopup("my_toggle_popup");
            if (ImGui.BeginPopup("my_toggle_popup")) {
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(names); i++) {
                    ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
                }
                if (ImGui.BeginMenu("Sub-menu")) {
                    ImGui.MenuItem("Click me");
                    ImGui.EndMenu();
                }
                ImGui.Separator();
                ImGui.Text("Tooltip here");
                if (ImGui.IsItemHovered())
                    ImGui.SetTooltip("I am a tooltip over a popup");
                if (ImGui.Button("Stacked Popup"))
                    ImGui.OpenPopup("another popup");
                if (ImGui.BeginPopup("another popup")) {
                    for (let i = 0; i < imgui_3.IM_ARRAYSIZE(names); i++) {
                        ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
                    }
                    if (ImGui.BeginMenu("Sub-menu")) {
                        ImGui.MenuItem("Click me");
                        if (ImGui.Button("Stacked Popup"))
                            ImGui.OpenPopup("another popup");
                        if (ImGui.BeginPopup("another popup")) {
                            ImGui.Text("I am the last one here.");
                            ImGui.EndPopup();
                        }
                        ImGui.EndMenu();
                    }
                    ImGui.EndPopup();
                }
                ImGui.EndPopup();
            }
            // Call the more complete ShowExampleMenuFile which we use in various places of this demo
            if (ImGui.Button("File Menu.."))
                ImGui.OpenPopup("my_file_popup");
            if (ImGui.BeginPopup("my_file_popup")) {
                ShowExampleMenuFile();
                ImGui.EndPopup();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Context menus")) {
            // BeginPopupContextItem() is a helper to provide common/simple popup behavior of essentially doing:
            //    if (IsItemHovered() && IsMouseReleased(0))
            //       OpenPopup(id);
            //    return BeginPopup(id);
            // For more advanced uses you may want to replicate and cuztomize this code. This the comments inside BeginPopupContextItem() implementation.
            /* static */ const value = STATIC("value", 0.5);
            ImGui.Text(`Value = ${value.value.toFixed(3)} (<-- right-click here)`);
            if (ImGui.BeginPopupContextItem("item context menu")) {
                if (ImGui.Selectable("Set to zero"))
                    value.value = 0.0;
                if (ImGui.Selectable("Set to PI"))
                    value.value = 3.1415;
                ImGui.SetNextItemWidth(-1);
                ImGui.DragFloat("##Value", (_value = value.value) => value.value = _value, 0.1, 0.0, 0.0);
                ImGui.EndPopup();
            }
            // We can also use OpenPopupOnItemClick() which is the same as BeginPopupContextItem() but without the Begin call.
            // So here we will make it that clicking on the text field with the right mouse button (1) will toggle the visibility of the popup above.
            ImGui.Text("(You can also right-click me to open the same popup as above.)");
            ImGui.OpenPopupOnItemClick("item context menu", 1);
            // When used after an item that has an ID (here the Button), we can skip providing an ID to BeginPopupContextItem().
            // BeginPopupContextItem() will use the last item ID as the popup ID.
            // In addition here, we want to include your editable label inside the button label. We use the ### operator to override the ID (read FAQ about ID for details)
            /* static */ const name = STATIC("name", new imgui_4.ImStringBuffer(32, "Label1"));
            const buf = `Button: ${name.value.buffer}###Button`; // ### operator override ID ignoring the preceding label
            ImGui.Button(buf);
            if (ImGui.BeginPopupContextItem()) {
                ImGui.Text("Edit name:");
                ImGui.InputText("##edit", name.value, imgui_3.IM_ARRAYSIZE(name.value));
                if (ImGui.Button("Close"))
                    ImGui.CloseCurrentPopup();
                ImGui.EndPopup();
            }
            ImGui.SameLine();
            ImGui.Text("(<-- right-click here)");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Modals")) {
            ImGui.TextWrapped("Modal windows are like popups but the user cannot close them by clicking outside the window.");
            if (ImGui.Button("Delete.."))
                ImGui.OpenPopup("Delete?");
            if (ImGui.BeginPopupModal("Delete?", null, imgui_15.ImGuiWindowFlags.AlwaysAutoResize)) {
                ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
                ImGui.Separator();
                ///* static */ const dummy_i: number = 0;
                //ImGui.Combo("Combo", &dummy_i, "Delete\0Delete harder\0");
                /* static */ const dont_ask_me_next_time = STATIC("dont_ask_me_next_time", false);
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_19.ImVec2(0, 0));
                ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
                ImGui.PopStyleVar();
                if (ImGui.Button("OK", new imgui_19.ImVec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.SetItemDefaultFocus();
                ImGui.SameLine();
                if (ImGui.Button("Cancel", new imgui_19.ImVec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.EndPopup();
            }
            if (ImGui.Button("Stacked modals.."))
                ImGui.OpenPopup("Stacked 1");
            if (ImGui.BeginPopupModal("Stacked 1", null, imgui_15.ImGuiWindowFlags.MenuBar)) {
                if (ImGui.BeginMenuBar()) {
                    if (ImGui.BeginMenu("File")) {
                        if (ImGui.MenuItem("Dummy menu item")) { }
                        ImGui.EndMenu();
                    }
                    ImGui.EndMenuBar();
                }
                ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGuiCol.ModalWindowDimBg] behind it.");
                // Testing behavior of widgets stacking their own regular popups over the modal.
                /* static */ const item = STATIC("item#1636", 1);
                /* static */ const color = STATIC("color#2", [0.4, 0.7, 0.0, 0.5]);
                ImGui.Combo("Combo", (value = item.value) => item.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                ImGui.ColorEdit4("color", color.value);
                if (ImGui.Button("Add another modal.."))
                    ImGui.OpenPopup("Stacked 2");
                // Also demonstrate passing a bool* to BeginPopupModal(), this will create a regular close button which will close the popup.
                // Note that the visibility state of popups is owned by imgui, so the input value of the bool actually doesn't matter here.
                let dummy_open = true;
                if (ImGui.BeginPopupModal("Stacked 2", [dummy_open])) {
                    ImGui.Text("Hello from Stacked The Second!");
                    if (ImGui.Button("Close"))
                        ImGui.CloseCurrentPopup();
                    ImGui.EndPopup();
                }
                if (ImGui.Button("Close"))
                    ImGui.CloseCurrentPopup();
                ImGui.EndPopup();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Menus inside a regular window")) {
            ImGui.TextWrapped("Below we are testing adding menu items to a regular window. It's rather unusual but should work!");
            ImGui.Separator();
            // NB: As a quirk in this very specific example, we want to differentiate the parent of this menu from the parent of the various popup menus above.
            // To do so we are encloding the items in a PushID()/PopID() block to make them two different menusets. If we don't, opening any popup above and hovering our menu here
            // would open it. This is because once a menu is active, we allow to switch to a sibling menu by just hovering on it, which is the desired behavior for regular menus.
            ImGui.PushID("foo");
            ImGui.MenuItem("Menu item", "CTRL+M");
            if (ImGui.BeginMenu("Menu inside a regular window")) {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            ImGui.PopID();
            ImGui.Separator();
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowColumns() {
        if (!ImGui.CollapsingHeader("Columns"))
            return;
        ImGui.PushID("Columns");
        /* static */ const disable_indent = STATIC("disable_indent", false);
        ImGui.Checkbox("Disable tree indentation", (value = disable_indent.value) => disable_indent.value = value);
        ImGui.SameLine();
        HelpMarker("Disable the indenting of tree nodes so demo columns can use the full window width.");
        if (disable_indent.value)
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.IndentSpacing, 0.0);
        // Basic columns
        if (ImGui.TreeNode("Basic")) {
            ImGui.Text("Without border:");
            ImGui.Columns(3, "mycolumns3", false); // 3-ways, no border
            ImGui.Separator();
            for (let n = 0; n < 14; n++) {
                const label = `Item ${n}`;
                if (ImGui.Selectable(label)) { }
                //if (ImGui.Button(label, new ImVec2(-1,0))) {}
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.Text("With border:");
            ImGui.Columns(4, "mycolumns"); // 4-ways, with border
            ImGui.Separator();
            ImGui.Text("ID");
            ImGui.NextColumn();
            ImGui.Text("Name");
            ImGui.NextColumn();
            ImGui.Text("Path");
            ImGui.NextColumn();
            ImGui.Text("Hovered");
            ImGui.NextColumn();
            ImGui.Separator();
            const names = ["One", "Two", "Three"];
            const paths = ["/path/one", "/path/two", "/path/three"];
            /* static */ const selected = STATIC("selected#1709", -1);
            for (let i = 0; i < 3; i++) {
                const label = format_number_dec(i, 4);
                if (ImGui.Selectable(label, selected.value === i, imgui_12.ImGuiSelectableFlags.SpanAllColumns))
                    selected.value = i;
                const hovered = ImGui.IsItemHovered();
                ImGui.NextColumn();
                ImGui.Text(names[i]);
                ImGui.NextColumn();
                ImGui.Text(paths[i]);
                ImGui.NextColumn();
                ImGui.Text(`${hovered}`);
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Borders")) {
            // NB: Future columns API should allow automatic horizontal borders.
            /* static */ const h_borders = STATIC("h_borders", true);
            /* static */ const v_borders = STATIC("v_borders", true);
            ImGui.Checkbox("horizontal", (value = h_borders.value) => h_borders.value = value);
            ImGui.SameLine();
            ImGui.Checkbox("vertical", (value = v_borders.value) => v_borders.value = value);
            ImGui.Columns(4, null, v_borders.value);
            for (let i = 0; i < 4 * 3; i++) {
                if (h_borders.value && ImGui.GetColumnIndex() === 0)
                    ImGui.Separator();
                // ImGui.Text("%c%c%c", 'a'+i, 'a'+i, 'a'+i);
                const c = String.fromCharCode("a".charCodeAt(0) + i);
                ImGui.Text(`${c}${c}${c}`);
                ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}`);
                ImGui.Text(`Offset ${ImGui.GetColumnOffset().toFixed(2)}`);
                ImGui.Text("Long text that is likely to clip");
                ImGui.Button("Button", new imgui_19.ImVec2(-1.0, 0.0));
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            if (h_borders.value)
                ImGui.Separator();
            ImGui.TreePop();
        }
        // Create multiple items in a same cell before switching to next column
        if (ImGui.TreeNode("Mixed items")) {
            ImGui.Columns(3, "mixed");
            ImGui.Separator();
            ImGui.Text("Hello");
            ImGui.Button("Banana");
            ImGui.NextColumn();
            ImGui.Text("ImGui");
            ImGui.Button("Apple");
            /* static */ const foo = STATIC("foo", 1.0);
            ImGui.InputFloat("red", (value = foo.value) => foo.value = value, 0.05, 0, "%.3f");
            ImGui.Text("An extra line here.");
            ImGui.NextColumn();
            ImGui.Text("Sailor");
            ImGui.Button("Corniflower");
            /* static */ const bar = STATIC("bar", 1.0);
            ImGui.InputFloat("blue", (value = bar.value) => bar.value = value, 0.05, 0, "%.3f");
            ImGui.NextColumn();
            if (ImGui.CollapsingHeader("Category A")) {
                ImGui.Text("Blah blah blah");
            }
            ImGui.NextColumn();
            if (ImGui.CollapsingHeader("Category B")) {
                ImGui.Text("Blah blah blah");
            }
            ImGui.NextColumn();
            if (ImGui.CollapsingHeader("Category C")) {
                ImGui.Text("Blah blah blah");
            }
            ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }
        // Word wrapping
        if (ImGui.TreeNode("Word-wrapping")) {
            ImGui.Columns(2, "word-wrapping");
            ImGui.Separator();
            ImGui.TextWrapped("The quick brown fox jumps over the lazy dog.");
            ImGui.TextWrapped("Hello Left");
            ImGui.NextColumn();
            ImGui.TextWrapped("The quick brown fox jumps over the lazy dog.");
            ImGui.TextWrapped("Hello Right");
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }
        // Scrolling columns
        /*
        if (ImGui.TreeNode("Vertical Scrolling"))
        {
            ImGui.BeginChild("##header", ImVec2(0, ImGui.GetTextLineHeightWithSpacing()+ImGui.GetStyle().ItemSpacing.y));
            ImGui.Columns(3);
            ImGui.Text("ID"); ImGui.NextColumn();
            ImGui.Text("Name"); ImGui.NextColumn();
            ImGui.Text("Path"); ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.EndChild();
            ImGui.BeginChild("##scrollingregion", ImVec2(0, 60));
            ImGui.Columns(3);
            for (let i = 0; i < 10; i++)
            {
                ImGui.Text("%04d", i); ImGui.NextColumn();
                ImGui.Text("Foobar"); ImGui.NextColumn();
                ImGui.Text("/path/foobar/%04d/", i); ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.EndChild();
            ImGui.TreePop();
        }
        */
        if (ImGui.TreeNode("Horizontal Scrolling")) {
            ImGui.SetNextWindowContentSize(new imgui_19.ImVec2(1500.0, 0.0));
            ImGui.BeginChild("##ScrollingRegion", new imgui_19.ImVec2(0, ImGui.GetFontSize() * 20), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
            ImGui.Columns(10);
            const ITEMS_COUNT = 2000;
            const clipper = new imgui_26.ImGuiListClipper(ITEMS_COUNT); // Also demonstrate using the clipper for large list
            while (clipper.Step()) {
                for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    for (let j = 0; j < 10; j++) {
                        ImGui.Text(`Line ${i} Column ${j}...`);
                        ImGui.NextColumn();
                    }
            }
            // clipper.delete(); // NOTE: native emscripten class
            ImGui.Columns(1);
            ImGui.EndChild();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Tree")) {
            ImGui.Columns(2, "tree", true);
            for (let x = 0; x < 3; x++) {
                const open1 = ImGui.TreeNode(x, `Node${x}`);
                ImGui.NextColumn();
                ImGui.Text("Node contents");
                ImGui.NextColumn();
                if (open1) {
                    for (let y = 0; y < 3; y++) {
                        const open2 = ImGui.TreeNode(y, `Node${x}.${y}`);
                        ImGui.NextColumn();
                        ImGui.Text("Node contents");
                        if (open2) {
                            ImGui.Text("Even more contents");
                            if (ImGui.TreeNode("Tree in column")) {
                                ImGui.Text("The quick brown fox jumps over the lazy dog");
                                ImGui.TreePop();
                            }
                        }
                        ImGui.NextColumn();
                        if (open2)
                            ImGui.TreePop();
                    }
                    ImGui.TreePop();
                }
            }
            ImGui.Columns(1);
            ImGui.TreePop();
        }
        if (disable_indent.value)
            ImGui.PopStyleVar();
        ImGui.PopID();
    }
    function ShowDemoWindowMisc() {
        if (ImGui.CollapsingHeader("Filtering")) {
            /* static */ const filter = STATIC("filter#1864", new imgui_24.ImGuiTextFilter());
            ImGui.Text("Filter usage:\n"
                + "  \"\"         display all lines\n"
                + "  \"xxx\"      display lines containing \"xxx\"\n"
                + "  \"xxx,yyy\"  display lines containing \"xxx\" or \"yyy\"\n"
                + "  \"-xxx\"     hide lines containing \"xxx\"");
            filter.value.Draw();
            const lines = ["aaa1.c", "bbb1.c", "ccc1.c", "aaa2.cpp", "bbb2.cpp", "ccc2.cpp", "abc.h", "hello, world"];
            for (let i = 0; i < imgui_3.IM_ARRAYSIZE(lines); i++)
                if (filter.value.PassFilter(lines[i]))
                    ImGui.BulletText(lines[i]);
        }
        if (ImGui.CollapsingHeader("Inputs, Navigation & Focus")) {
            const io = ImGui.GetIO();
            ImGui.Text(`WantCaptureMouse: ${io.WantCaptureMouse}`);
            ImGui.Text(`WantCaptureKeyboard: ${io.WantCaptureKeyboard}`);
            ImGui.Text(`WantTextInput: ${io.WantTextInput}`);
            ImGui.Text(`WantSetMousePos: ${io.WantSetMousePos}`);
            ImGui.Text(`NavActive: ${io.NavActive}, NavVisible: ${io.NavVisible}`);
            if (ImGui.TreeNode("Keyboard, Mouse & Navigation State")) {
                if (ImGui.IsMousePosValid())
                    ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.y})`);
                else
                    ImGui.Text("Mouse pos: <INVALID>");
                ImGui.Text(`Mouse delta: (${io.MouseDelta.x}, ${io.MouseDelta.y})`);
                ImGui.Text("Mouse down:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (io.MouseDownDuration[i] >= 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i} (${io.MouseDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Mouse clicked:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseClicked(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text("Mouse dbl-clicked:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseDoubleClicked(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text("Mouse released:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text(`Mouse wheel: ${io.MouseWheel.toFixed(1)}`);
                ImGui.Text("Keys down:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (io.KeysDownDuration[i] >= 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16)}) (${io.KeysDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Keys pressed:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyPressed(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16)})`);
                    }
                ImGui.Text("Keys release:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16)})`);
                    }
                ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);
                // ImGui.Text("Chars queue:");    for (let i = 0; i < io.InputQueueCharacters.Size; i++) { const c: ImWchar = io.InputQueueCharacters[i]; ImGui.SameLine();  ImGui.Text("\'%c\' (0x%04X)", (c > ' ' && c <= 255) ? (char)c : '?', c); } // FIXME: We should convert 'c' to UTF-8 here but the functions are not public.
                ImGui.Text("NavInputs down:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputs[i] > 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}] ${io.NavInputs[i].toFixed(2)}`);
                    }
                ImGui.Text("NavInputs pressed:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputsDownDuration[i] === 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}]`);
                    }
                ImGui.Text("NavInputs duration:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputsDownDuration[i] >= 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}] ${io.NavInputsDownDuration[i].toFixed(2)}`);
                    }
                ImGui.Button("Hovering me sets the\nkeyboard capture flag");
                if (ImGui.IsItemHovered())
                    ImGui.CaptureKeyboardFromApp(true);
                ImGui.SameLine();
                ImGui.Button("Holding me clears the\nthe keyboard capture flag");
                if (ImGui.IsItemActive())
                    ImGui.CaptureKeyboardFromApp(false);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Tabbing")) {
                ImGui.Text("Use TAB/SHIFT+TAB to cycle through keyboard editable fields.");
                /* static */ const buf = STATIC("buf1#1921", new imgui_4.ImStringBuffer(32, "dummy"));
                ImGui.InputText("1", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                ImGui.InputText("2", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                ImGui.InputText("3", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                ImGui.PushAllowKeyboardFocus(false);
                ImGui.InputText("4 (tab skip)", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                //ImGui.SameLine(); HelpMarker("Use ImGui.PushAllowKeyboardFocus(bool)\nto disable tabbing through certain widgets.");
                ImGui.PopAllowKeyboardFocus();
                ImGui.InputText("5", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Focus from code")) {
                const focus_1 = ImGui.Button("Focus on 1");
                ImGui.SameLine();
                const focus_2 = ImGui.Button("Focus on 2");
                ImGui.SameLine();
                const focus_3 = ImGui.Button("Focus on 3");
                let has_focus = 0;
                /* static */ const buf = STATIC("buf2#1944", new imgui_4.ImStringBuffer(128, "click on a button to set focus"));
                if (focus_1)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("1", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 1;
                if (focus_2)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("2", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 2;
                ImGui.PushAllowKeyboardFocus(false);
                if (focus_3)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("3 (tab skip)", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 3;
                ImGui.PopAllowKeyboardFocus();
                if (has_focus)
                    ImGui.Text(`Item with focus: ${has_focus}`);
                else
                    ImGui.Text("Item with focus: <none>");
                // Use >= 0 parameter to SetKeyboardFocusHere() to focus an upcoming item
                /* static */ const f3 = STATIC("f3", [0.0, 0.0, 0.0]);
                let focus_ahead = -1;
                if (ImGui.Button("Focus on X")) {
                    focus_ahead = 0;
                }
                ImGui.SameLine();
                if (ImGui.Button("Focus on Y")) {
                    focus_ahead = 1;
                }
                ImGui.SameLine();
                if (ImGui.Button("Focus on Z")) {
                    focus_ahead = 2;
                }
                if (focus_ahead !== -1)
                    ImGui.SetKeyboardFocusHere(focus_ahead);
                ImGui.SliderFloat3("Float3", f3.value, 0.0, 1.0);
                ImGui.TextWrapped("NB: Cursor & selection are preserved when refocusing last used item in code.");
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Dragging")) {
                ImGui.TextWrapped("You can use ImGui.GetMouseDragDelta(0) to query for the dragged amount on any widget.");
                for (let button = 0; button < 3; button++)
                    ImGui.Text(`IsMouseDragging(${button}):\n  w/ default threshold: ${ImGui.IsMouseDragging(button)},\n  w/ zero threshold: ${ImGui.IsMouseDragging(button, 0.0)}\n  w/ large threshold: ${ImGui.IsMouseDragging(button, 20.0)}`);
                ImGui.Button("Drag Me");
                if (ImGui.IsItemActive())
                    ImGui.GetForegroundDrawList().AddLine(io.MouseClickedPos[0], io.MousePos, ImGui.GetColorU32(imgui_5.ImGuiCol.Button), 4.0); // Draw a line between the button and the mouse cursor
                // Drag operations gets "unlocked" when the mouse has moved past a certain threshold (the default threshold is stored in io.MouseDragThreshold)
                // You can request a lower or higher threshold using the second parameter of IsMouseDragging() and GetMouseDragDelta()
                const value_raw = ImGui.GetMouseDragDelta(0, 0.0);
                const value_with_lock_threshold = ImGui.GetMouseDragDelta(0);
                const mouse_delta = io.MouseDelta;
                ImGui.SameLine();
                ImGui.Text(`Raw (${value_raw.x.toFixed(1)}, ${value_raw.y.toFixed(1)}), WithLockThresold (${value_with_lock_threshold.x.toFixed(1)}, ${value_with_lock_threshold.y.toFixed(1)}), MouseDelta (${mouse_delta.x.toFixed(1)}, ${mouse_delta.y.toFixed(1)})`);
                // TODO
                // ImGui.Text("GetMouseDragDelta(0):\n  w/ default threshold: (%.1f, %.1f),\n  w/ zero threshold: (%.1f, %.1f)\nMouseDelta: (%.1f, %.1f)", value_with_lock_threshold.x, value_with_lock_threshold.y, value_raw.x, value_raw.y, mouse_delta.x, mouse_delta.y);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Mouse cursors")) {
                const mouse_cursors_names = ["Arrow", "TextInput", "Move", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE", "Hand"];
                imgui_2.IM_ASSERT(imgui_3.IM_ARRAYSIZE(mouse_cursors_names) === imgui_11.ImGuiMouseCursor.COUNT);
                ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
                ImGui.Text("Hover to see mouse cursors:");
                ImGui.SameLine();
                HelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
                for (let i = 0; i < imgui_11.ImGuiMouseCursor.COUNT; i++) {
                    const label = `Mouse cursor ${i}: ${mouse_cursors_names[i]}`;
                    ImGui.Bullet();
                    ImGui.Selectable(label, false);
                    if (ImGui.IsItemHovered() || ImGui.IsItemFocused())
                        ImGui.SetMouseCursor(i);
                }
                ImGui.TreePop();
            }
        }
    }
    //-----------------------------------------------------------------------------
    // [SECTION] About Window / ShowAboutWindow()
    // Access from Dear ImGui Demo -> Help -> About
    //-----------------------------------------------------------------------------
    function ShowAboutWindow(p_open) {
        if (!ImGui.Begin("About Dear ImGui", p_open, imgui_15.ImGuiWindowFlags.AlwaysAutoResize)) {
            ImGui.End();
            return;
        }
        ImGui.Text(`Dear ImGui ${ImGui.GetVersion()}`);
        ImGui.Separator();
        ImGui.Text("By Omar Cornut and all dear imgui contributors.");
        ImGui.Text("Dear ImGui is licensed under the MIT License, see LICENSE for more information.");
        // TODO
        // static bool show_config_info = false;
        // ImGui.Checkbox("Config/Build Information", &show_config_info);
        // if (show_config_info)
        // {
        //     ImGuiIO& io = ImGui.GetIO();
        //     ImGuiStyle& style = ImGui.GetStyle();
        //     bool copy_to_clipboard = ImGui.Button("Copy to clipboard");
        //     ImGui.BeginChildFrame(ImGui.GetID("cfginfos"), ImVec2(0, ImGui.GetTextLineHeightWithSpacing() * 18), ImGuiWindowFlags_NoMove);
        //     if (copy_to_clipboard)
        //         ImGui.LogToClipboard();
        //     ImGui.Text("Dear ImGui %s (%d)", IMGUI_VERSION, IMGUI_VERSION_NUM);
        //     ImGui.Separator();
        //     ImGui.Text("sizeof(size_t): %d, sizeof(ImDrawIdx): %d, sizeof(ImDrawVert): %d", (int)sizeof(size_t), (int)sizeof(ImDrawIdx), (int)sizeof(ImDrawVert));
        //     ImGui.Text("define: __cplusplus=%d", (int)__cplusplus);
        //     #ifdef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_OBSOLETE_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_WIN32_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_WIN32_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_MATH_FUNCTIONS
        //     ImGui.Text("define: IMGUI_DISABLE_MATH_FUNCTIONS");
        //     #endif
        //     #ifdef IMGUI_DISABLE_DEFAULT_ALLOCATORS
        //     ImGui.Text("define: IMGUI_DISABLE_DEFAULT_ALLOCATORS");
        //     #endif
        //     #ifdef IMGUI_USE_BGRA_PACKED_COLOR
        //     ImGui.Text("define: IMGUI_USE_BGRA_PACKED_COLOR");
        //     #endif
        //     #ifdef _WIN32
        //     ImGui.Text("define: _WIN32");
        //     #endif
        //     #ifdef _WIN64
        //     ImGui.Text("define: _WIN64");
        //     #endif
        //     #ifdef __linux__
        //     ImGui.Text("define: __linux__");
        //     #endif
        //     #ifdef __APPLE__
        //     ImGui.Text("define: __APPLE__");
        //     #endif
        //     #ifdef _MSC_VER
        //     ImGui.Text("define: _MSC_VER=%d", _MSC_VER);
        //     #endif
        //     #ifdef __MINGW32__
        //     ImGui.Text("define: __MINGW32__");
        //     #endif
        //     #ifdef __MINGW64__
        //     ImGui.Text("define: __MINGW64__");
        //     #endif
        //     #ifdef __GNUC__
        //     ImGui.Text("define: __GNUC__=%d", (int)__GNUC__);
        //     #endif
        //     #ifdef __clang_version__
        //     ImGui.Text("define: __clang_version__=%s", __clang_version__);
        //     #endif
        //     ImGui.Separator();
        //     ImGui.Text("io.BackendPlatformName: %s", io.BackendPlatformName ? io.BackendPlatformName : "NULL");
        //     ImGui.Text("io.BackendRendererName: %s", io.BackendRendererName ? io.BackendRendererName : "NULL");
        //     ImGui.Text("io.ConfigFlags: 0x%08X", io.ConfigFlags);
        //     if (io.ConfigFlags & ImGuiConfigFlags_NavEnableKeyboard)        ImGui.Text(" NavEnableKeyboard");
        //     if (io.ConfigFlags & ImGuiConfigFlags_NavEnableGamepad)         ImGui.Text(" NavEnableGamepad");
        //     if (io.ConfigFlags & ImGuiConfigFlags_NavEnableSetMousePos)     ImGui.Text(" NavEnableSetMousePos");
        //     if (io.ConfigFlags & ImGuiConfigFlags_NavNoCaptureKeyboard)     ImGui.Text(" NavNoCaptureKeyboard");
        //     if (io.ConfigFlags & ImGuiConfigFlags_NoMouse)                  ImGui.Text(" NoMouse");
        //     if (io.ConfigFlags & ImGuiConfigFlags_NoMouseCursorChange)      ImGui.Text(" NoMouseCursorChange");
        //     if (io.MouseDrawCursor)                                         ImGui.Text("io.MouseDrawCursor");
        //     if (io.ConfigMacOSXBehaviors)                                   ImGui.Text("io.ConfigMacOSXBehaviors");
        //     if (io.ConfigInputTextCursorBlink)                              ImGui.Text("io.ConfigInputTextCursorBlink");
        //     if (io.ConfigWindowsResizeFromEdges)                            ImGui.Text("io.ConfigWindowsResizeFromEdges");
        //     if (io.ConfigWindowsMoveFromTitleBarOnly)                       ImGui.Text("io.ConfigWindowsMoveFromTitleBarOnly");
        //     ImGui.Text("io.BackendFlags: 0x%08X", io.BackendFlags);
        //     if (io.BackendFlags & ImGuiBackendFlags_HasGamepad)             ImGui.Text(" HasGamepad");
        //     if (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors)        ImGui.Text(" HasMouseCursors");
        //     if (io.BackendFlags & ImGuiBackendFlags_HasSetMousePos)         ImGui.Text(" HasSetMousePos");
        //     if (io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset)   ImGui.Text(" RendererHasVtxOffset");
        //     ImGui.Separator();
        //     ImGui.Text("io.Fonts: %d fonts, Flags: 0x%08X, TexSize: %d,%d", io.Fonts->Fonts.Size, io.Fonts->Flags, io.Fonts->TexWidth, io.Fonts->TexHeight);
        //     ImGui.Text("io.DisplaySize: %.2f,%.2f", io.DisplaySize.x, io.DisplaySize.y);
        //     ImGui.Text("io.DisplayFramebufferScale: %.2f,%.2f", io.DisplayFramebufferScale.x, io.DisplayFramebufferScale.y);
        //     ImGui.Separator();
        //     ImGui.Text("style.WindowPadding: %.2f,%.2f", style.WindowPadding.x, style.WindowPadding.y);
        //     ImGui.Text("style.WindowBorderSize: %.2f", style.WindowBorderSize);
        //     ImGui.Text("style.FramePadding: %.2f,%.2f", style.FramePadding.x, style.FramePadding.y);
        //     ImGui.Text("style.FrameRounding: %.2f", style.FrameRounding);
        //     ImGui.Text("style.FrameBorderSize: %.2f", style.FrameBorderSize);
        //     ImGui.Text("style.ItemSpacing: %.2f,%.2f", style.ItemSpacing.x, style.ItemSpacing.y);
        //     ImGui.Text("style.ItemInnerSpacing: %.2f,%.2f", style.ItemInnerSpacing.x, style.ItemInnerSpacing.y);
        //     if (copy_to_clipboard)
        //         ImGui.LogFinish();
        //     ImGui.EndChildFrame();
        // }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Style Editor / ShowStyleEditor()
    //-----------------------------------------------------------------------------
    // Demo helper function to select among default colors. See ShowStyleEditor() for more advanced options.
    // Here we use the simplified Combo() api that packs items into a single literal string. Useful for quick combo boxes where the choices are known locally.
    function ShowStyleSelector(label) {
        /* static */ const style_idx = STATIC("style_idx", -1);
        if (ImGui.Combo(label, (value = style_idx.value) => style_idx.value = value, "Classic\0Dark\0Light\0")) {
            switch (style_idx.value) {
                case 0:
                    ImGui.StyleColorsClassic();
                    break;
                case 1:
                    ImGui.StyleColorsDark();
                    break;
                case 2:
                    ImGui.StyleColorsLight();
                    break;
            }
            return true;
        }
        return false;
    }
    exports_1("ShowStyleSelector", ShowStyleSelector);
    // Demo helper function to select among loaded fonts.
    // Here we use the regular BeginCombo()/EndCombo() api which is more the more flexible one.
    function ShowFontSelector(label) {
        const io = ImGui.GetIO();
        const font_current = ImGui.GetFont();
        if (ImGui.BeginCombo(label, font_current.GetDebugName())) {
            ImGui.Selectable(font_current.GetDebugName());
            // TODO
            // for (let n = 0; n < io.Fonts->Fonts.Size; n++)
            // {
            //     ImFont* font = io.Fonts->Fonts[n];
            //     ImGui.PushID((void*)font);
            //     if (ImGui.Selectable(font->GetDebugName(), font == font_current))
            //         io.FontDefault = font;
            //     ImGui.PopID();
            // }
            ImGui.EndCombo();
        }
        ImGui.SameLine();
        HelpMarker("- Load additional fonts with io.Fonts->AddFontFromFileTTF().\n" +
            "- The font atlas is built when calling io.Fonts->GetTexDataAsXXXX() or io.Fonts->Build().\n" +
            "- Read FAQ and documentation in misc/fonts for more details.\n" +
            "- If you need to add/remove fonts at runtime (e.g. for DPI change), do it before calling NewFrame().");
    }
    exports_1("ShowFontSelector", ShowFontSelector);
    function ShowStyleEditor(ref = null) {
        // You can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it compares to an internally stored reference)
        const style = ImGui.GetStyle();
        /* static */ const ref_saved_style = STATIC("ref_saved_style", new imgui_23.ImGuiStyle());
        // Default to using internal storage as reference
        /* static */ const init = STATIC("init", true);
        if (init.value && ref === null)
            ref_saved_style.value.Copy(style);
        init.value = false;
        if (ref === null)
            ref = ref_saved_style.value;
        ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.50);
        if ( /*ImGui.*/ShowStyleSelector("Colors##Selector"))
            ref_saved_style.value.Copy(style);
        /*ImGui.*/ ShowFontSelector("Fonts##Selector");
        // Simplified Settings
        if (ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f"))
            style.GrabRounding = style.FrameRounding; // Make GrabRounding always the same value as FrameRounding
        {
            let window_border = (style.WindowBorderSize > 0.0);
            if (ImGui.Checkbox("WindowBorder", (value = window_border) => window_border = value))
                style.WindowBorderSize = window_border ? 1.0 : 0.0;
        }
        ImGui.SameLine();
        {
            let frame_border = (style.FrameBorderSize > 0.0);
            if (ImGui.Checkbox("FrameBorder", (value = frame_border) => frame_border = value))
                style.FrameBorderSize = frame_border ? 1.0 : 0.0;
        }
        ImGui.SameLine();
        {
            let popup_border = (style.PopupBorderSize > 0.0);
            if (ImGui.Checkbox("PopupBorder", (value = popup_border) => popup_border = value))
                style.PopupBorderSize = popup_border ? 1.0 : 0.0;
        }
        // Save/Revert button
        if (ImGui.Button("Save Ref"))
            ref.Copy(ref_saved_style.value.Copy(style));
        ImGui.SameLine();
        if (ImGui.Button("Revert Ref"))
            style.Copy(ref);
        ImGui.SameLine();
        HelpMarker("Save/Revert in local non-persistent storage. Default Colors definition are not affected. Use \"Export Colors\" below to save them somewhere.");
        ImGui.Separator();
        if (ImGui.BeginTabBar("##tabs", imgui_16.ImGuiTabBarFlags.None)) {
            if (ImGui.BeginTabItem("Sizes")) {
                ImGui.Text("Main");
                ImGui.SliderFloat2("WindowPadding", style.WindowPadding, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("FramePadding", style.FramePadding, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("ItemSpacing", style.ItemSpacing, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("ItemInnerSpacing", style.ItemInnerSpacing, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("TouchExtraPadding", style.TouchExtraPadding, 0.0, 10.0, "%.0f");
                ImGui.SliderFloat("IndentSpacing", (value = style.IndentSpacing) => style.IndentSpacing = value, 0.0, 30.0, "%.0f");
                ImGui.SliderFloat("ScrollbarSize", (value = style.ScrollbarSize) => style.ScrollbarSize = value, 1.0, 20.0, "%.0f");
                ImGui.SliderFloat("GrabMinSize", (value = style.GrabMinSize) => style.GrabMinSize = value, 1.0, 20.0, "%.0f");
                ImGui.Text("Borders");
                ImGui.SliderFloat("WindowBorderSize", (value = style.WindowBorderSize) => style.WindowBorderSize = value, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("ChildBorderSize", (value = style.ChildBorderSize) => style.ChildBorderSize = value, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("PopupBorderSize", (value = style.PopupBorderSize) => style.PopupBorderSize = value, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("FrameBorderSize", (value = style.FrameBorderSize) => style.FrameBorderSize = value, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("TabBorderSize", (value = style.TabBorderSize) => style.TabBorderSize = value, 0.0, 1.0, "%.0f");
                ImGui.Text("Rounding");
                ImGui.SliderFloat("WindowRounding", (value = style.WindowRounding) => style.WindowRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("ChildRounding", (value = style.ChildRounding) => style.ChildRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("PopupRounding", (value = style.PopupRounding) => style.PopupRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("ScrollbarRounding", (value = style.ScrollbarRounding) => style.ScrollbarRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("GrabRounding", (value = style.GrabRounding) => style.GrabRounding = value, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("TabRounding", (value = style.TabRounding) => style.TabRounding = value, 0.0, 12.0, "%.0f");
                ImGui.Text("Alignment");
                ImGui.SliderFloat2("WindowTitleAlign", style.WindowTitleAlign, 0.0, 1.0, "%.2f");
                // ImGui.Combo("WindowMenuButtonPosition", (int*)&style.WindowMenuButtonPosition, "Left\0Right\0");
                ImGui.SliderFloat2("ButtonTextAlign", style.ButtonTextAlign, 0.0, 1.0, "%.2f");
                ImGui.SameLine();
                HelpMarker("Alignment applies when a button is larger than its text content.");
                // ImGui.SliderFloat2("SelectableTextAlign", (float*)&style.SelectableTextAlign, 0.0f, 1.0f, "%.2f"); ImGui.SameLine(); HelpMarker("Alignment applies when a selectable is larger than its text content.");
                ImGui.Text("Safe Area Padding");
                ImGui.SameLine();
                HelpMarker("Adjust if you cannot see the edges of your screen (e.g. on a TV where scaling has not been configured).");
                ImGui.SliderFloat2("DisplaySafeAreaPadding", style.DisplaySafeAreaPadding, 0.0, 30.0, "%.0f");
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Colors")) {
                /* static */ const output_dest = STATIC("output_dest", 0);
                /* static */ const output_only_modified = STATIC("output_only_modified", true);
                if (ImGui.Button("Export Unsaved")) {
                    if (output_dest.value === 0)
                        ImGui.LogToClipboard();
                    else
                        ImGui.LogToTTY();
                    ImGui.LogText("ImVec4* colors = ImGui.GetStyle().Colors;" + IM_NEWLINE);
                    for (let i = 0; i < imgui_5.ImGuiCol.COUNT; i++) {
                        const col = style.Colors[i];
                        const name = ImGui.GetStyleColorName(i);
                        if (!output_only_modified.value || !col.Equals(ref.Colors[i]))
                            ImGui.LogText(`colors[ImGuiCol.${name}] = new ImVec4(${col.x.toFixed(2)}, ${col.y.toFixed(2)}, ${col.z.toFixed(2)}, ${col.w.toFixed(2)});` + IM_NEWLINE);
                    }
                    ImGui.LogFinish();
                }
                ImGui.SameLine();
                ImGui.SetNextItemWidth(120);
                ImGui.Combo("##output_type", (value = output_dest.value) => output_dest.value = value, "To Clipboard\0To TTY\0");
                ImGui.SameLine();
                ImGui.Checkbox("Only Modified Colors", (value = output_only_modified.value) => output_only_modified.value = value);
                ImGui.Text("Tip: Left-click on colored square to open color picker,\nRight-click to open edit options menu.");
                /* static */ const filter = STATIC("filter#2223", new imgui_24.ImGuiTextFilter());
                filter.value.Draw("Filter colors", 200);
                /* static */ const alpha_flags = STATIC("alpha_flags", 0);
                ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0);
                ImGui.SameLine();
                ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, imgui_6.ImGuiColorEditFlags.AlphaPreview);
                ImGui.SameLine();
                ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf);
                ImGui.BeginChild("#colors", new imgui_19.ImVec2(0, 300), true, imgui_15.ImGuiWindowFlags.AlwaysVerticalScrollbar | imgui_15.ImGuiWindowFlags.AlwaysHorizontalScrollbar | imgui_15.ImGuiWindowFlags.NavFlattened);
                ImGui.PushItemWidth(-160);
                for (let i = 0; i < imgui_5.ImGuiCol.COUNT; i++) {
                    const name = ImGui.GetStyleColorName(i);
                    if (!filter.value.PassFilter(name))
                        continue;
                    ImGui.PushID(i);
                    ImGui.ColorEdit4("##color", style.Colors[i], imgui_6.ImGuiColorEditFlags.AlphaBar | alpha_flags.value);
                    if (!style.Colors[i].Equals(ref.Colors[i])) {
                        // Tips: in a real user application, you may want to merge and use an icon font into the main font, so instead of "Save"/"Revert" you'd use icons.
                        // Read the FAQ and misc/fonts/README.txt about using icon fonts. It's really easy and super convenient!
                        ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                        if (ImGui.Button("Save"))
                            ref.Colors[i].Copy(style.Colors[i]);
                        ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                        if (ImGui.Button("Revert"))
                            style.Colors[i].Copy(ref.Colors[i]);
                    }
                    ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                    ImGui.TextUnformatted(name);
                    ImGui.PopID();
                }
                ImGui.PopItemWidth();
                ImGui.EndChild();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Fonts")) {
                const io = ImGui.GetIO();
                const atlas = io.Fonts;
                HelpMarker("Read FAQ and misc/fonts/README.txt for details on font loading.");
                ImGui.PushItemWidth(120);
                for (let i = 0; i < atlas.Fonts.Size; i++) {
                    const font = atlas.Fonts[i];
                    ImGui.PushID(font.native.$$.ptr);
                    const font_details_opened = ImGui.TreeNode(font.native.$$.ptr, `Font ${i}: \'${font.ConfigData.length > 0 ? font.ConfigData[0].Name : ""}\', ${font.FontSize.toFixed(2)} px, ${font.Glyphs.Size} glyphs, ${font.ConfigDataCount} file(s)`);
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Set as default"))
                        io.FontDefault = font;
                    if (font_details_opened) {
                        ImGui.PushFont(font);
                        ImGui.Text("The quick brown fox jumps over the lazy dog");
                        ImGui.PopFont();
                        ImGui.DragFloat("Font scale", (value = font.Scale) => font.Scale = value, 0.005, 0.3, 2.0, "%.1f"); // Scale only this font
                        ImGui.SameLine();
                        HelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\nFont are currently rendered into bitmaps at a given size at the time of building the atlas. You may oversample them to get some flexibility with scaling. You can also render at multiple sizes and select which one to use at runtime.\n\n(Glimmer of hope: the atlas system should hopefully be rewritten in the future to make scaling more natural and automatic.)");
                        ImGui.InputFloat("Font offset", (value = font.DisplayOffset.y) => font.DisplayOffset.y = value, 1, 1, "%.0f");
                        ImGui.Text(`Ascent: ${font.Ascent}, Descent: ${font.Descent}, Height: ${font.Ascent - font.Descent}`);
                        ImGui.Text(`Fallback character: '${String.fromCharCode(font.FallbackChar)}' (${font.FallbackChar})`);
                        const surface_sqrt = Math.sqrt(font.MetricsTotalSurface);
                        ImGui.Text(`Texture surface: ${font.MetricsTotalSurface} pixels (approx) ~ ${0 | surface_sqrt}x${0 | surface_sqrt}`);
                        for (let config_i = 0; config_i < font.ConfigDataCount; config_i++) {
                            const cfg = font.ConfigData[config_i];
                            ImGui.BulletText(`Input ${config_i}: \'${cfg.Name}\', Oversample: (${cfg.OversampleH},${cfg.OversampleH}), PixelSnapH: ${cfg.PixelSnapH}`);
                        }
                        if (ImGui.TreeNode("Glyphs", `Glyphs (${font.Glyphs.Size})`)) {
                            // Display all glyphs of the fonts in separate pages of 256 characters
                            for (let base = 0; base < 0x10000; base += 256) {
                                let count = 0;
                                for (let n = 0; n < 256; n++)
                                    count += font.FindGlyphNoFallback((base + n)) ? 1 : 0;
                                if (count > 0 && ImGui.TreeNode(base, `U+${format_number_hex(base, 4).toUpperCase()}..U+${(format_number_hex(base + 255, 4).toUpperCase())} (${count} ${count > 1 ? "glyphs" : "glyph"})`)) {
                                    const cell_size = font.FontSize * 1;
                                    const cell_spacing = style.ItemSpacing.y;
                                    const base_pos = ImGui.GetCursorScreenPos();
                                    const draw_list = ImGui.GetWindowDrawList();
                                    for (let n = 0; n < 256; n++) {
                                        const cell_p1 = new imgui_19.ImVec2(base_pos.x + (n % 16) * (cell_size + cell_spacing), base_pos.y + (0 | (n / 16)) * (cell_size + cell_spacing));
                                        const cell_p2 = new imgui_19.ImVec2(cell_p1.x + cell_size, cell_p1.y + cell_size);
                                        const glyph = font.FindGlyphNoFallback((base + n));
                                        draw_list.AddRect(cell_p1, cell_p2, glyph ? imgui_21.IM_COL32(255, 255, 255, 100) : imgui_21.IM_COL32(255, 255, 255, 50));
                                        if (glyph)
                                            font.RenderChar(draw_list, cell_size, cell_p1, ImGui.GetColorU32(imgui_5.ImGuiCol.Text), (base + n)); // We use ImFont.RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
                                        if (glyph && ImGui.IsWindowHovered() && ImGui.IsMouseHoveringRect(cell_p1, cell_p2)) {
                                            ImGui.BeginTooltip();
                                            ImGui.Text(`Codepoint: U+${format_number_hex(base + n, 4).toUpperCase()}`);
                                            ImGui.Separator();
                                            ImGui.Image(ImGui.GetIO().Fonts.TexID, new imgui_19.ImVec2(8 * (glyph.X1 - glyph.X0), 8 * (glyph.Y1 - glyph.Y0)), new imgui_19.ImVec2(glyph.U0, glyph.V0), new imgui_19.ImVec2(glyph.U1, glyph.V1), new imgui_22.ImColor(255, 255, 255, 255).toImVec4(), new imgui_22.ImColor(255, 255, 255, 128).toImVec4());
                                            ImGui.SameLine();
                                            ImGui.BeginGroup();
                                            ImGui.Text(`AdvanceX: ${glyph.AdvanceX.toFixed(1)}`);
                                            ImGui.Text(`Pos: (${glyph.X0.toFixed(2)},${glyph.Y0.toFixed(2)}).(${glyph.X1.toFixed(2)},${glyph.Y1.toFixed(2)})`);
                                            ImGui.Text(`UV: (${glyph.U0.toFixed(3)},${glyph.V0.toFixed(3)}).(${glyph.U1.toFixed(3)},${glyph.V1.toFixed(3)})`);
                                            ImGui.EndGroup();
                                            ImGui.EndTooltip();
                                        }
                                    }
                                    ImGui.Dummy(new imgui_19.ImVec2((cell_size + cell_spacing) * 16, (cell_size + cell_spacing) * 16));
                                    ImGui.TreePop();
                                }
                            }
                            ImGui.TreePop();
                        }
                        ImGui.TreePop();
                    }
                    ImGui.PopID();
                }
                if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`)) {
                    const tint_col = new imgui_20.ImVec4(1.0, 1.0, 1.0, 1.0);
                    const border_col = new imgui_20.ImVec4(1.0, 1.0, 1.0, 0.5);
                    ImGui.Image(atlas.TexID, new imgui_19.ImVec2(atlas.TexWidth, atlas.TexHeight), new imgui_19.ImVec2(0, 0), new imgui_19.ImVec2(1, 1), tint_col, border_col);
                    ImGui.TreePop();
                }
                /* static */ const window_scale = STATIC("window_scale", 1.0);
                if (ImGui.DragFloat("this window scale", (value = window_scale.value) => window_scale.value = value, 0.005, 0.3, 2.0, "%.2f")) // scale only this window
                    ImGui.SetWindowFontScale(window_scale.value);
                ImGui.DragFloat("global scale", (value = ImGui.GetIO().FontGlobalScale) => io.FontGlobalScale = value, 0.005, 0.3, 2.0, "%.2f"); // scale everything
                ImGui.PopItemWidth();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Rendering")) {
                ImGui.Checkbox("Anti-aliased lines", (value = style.AntiAliasedLines) => style.AntiAliasedLines = value);
                ImGui.SameLine();
                HelpMarker("When disabling anti-aliasing lines, you'll probably want to disable borders in your style as well.");
                ImGui.Checkbox("Anti-aliased fill", (value = style.AntiAliasedFill) => style.AntiAliasedFill = value);
                ImGui.PushItemWidth(100);
                ImGui.DragFloat("Curve Tessellation Tolerance", (value = style.CurveTessellationTol) => style.CurveTessellationTol = value, 0.02, 0.10, Number.MAX_VALUE, "%.2f", 2.0);
                if (style.CurveTessellationTol < 0.10)
                    style.CurveTessellationTol = 0.10;
                ImGui.DragFloat("Global Alpha", (value = style.Alpha) => style.Alpha = value, 0.005, 0.20, 1.0, "%.2f"); // Not exposing zero here so user doesn't "lose" the UI (zero alpha clips all widgets). But application code could have a toggle to switch between zero and non-zero.
                ImGui.PopItemWidth();
                ImGui.EndTabItem();
            }
            ImGui.EndTabBar();
        }
        ImGui.PopItemWidth();
    }
    exports_1("ShowStyleEditor", ShowStyleEditor);
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Main Menu Bar / ShowExampleAppMainMenuBar()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a "main" fullscreen menu bar and populating it.
    // Note the difference between BeginMainMenuBar() and BeginMenuBar():
    // - BeginMenuBar() = menu-bar inside current window we Begin()-ed into (the window needs the ImGuiWindowFlags_MenuBar flag)
    // - BeginMainMenuBar() = helper to create menu-bar-sized window at the top of the main viewport + call BeginMenuBar() into it.
    function ShowExampleAppMainMenuBar() {
        if (ImGui.BeginMainMenuBar()) {
            if (ImGui.BeginMenu("File")) {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            if (ImGui.BeginMenu("Edit")) {
                if (ImGui.MenuItem("Undo", "CTRL+Z")) { }
                if (ImGui.MenuItem("Redo", "CTRL+Y", false, false)) { } // Disabled item
                ImGui.Separator();
                if (ImGui.MenuItem("Cut", "CTRL+X")) { }
                if (ImGui.MenuItem("Copy", "CTRL+C")) { }
                if (ImGui.MenuItem("Paste", "CTRL+V")) { }
                ImGui.EndMenu();
            }
            ImGui.EndMainMenuBar();
        }
    }
    // Note that shortcuts are currently provided for display only (future version will add flags to BeginMenu to process shortcuts)
    function ShowExampleMenuFile() {
        ImGui.MenuItem("(dummy menu)", null, false, false);
        if (ImGui.MenuItem("New")) { }
        if (ImGui.MenuItem("Open", "Ctrl+O")) { }
        if (ImGui.BeginMenu("Open Recent")) {
            ImGui.MenuItem("fish_hat.c");
            ImGui.MenuItem("fish_hat.inl");
            ImGui.MenuItem("fish_hat.h");
            if (ImGui.BeginMenu("More..")) {
                ImGui.MenuItem("Hello");
                ImGui.MenuItem("Sailor");
                if (ImGui.BeginMenu("Recurse..")) {
                    ShowExampleMenuFile();
                    ImGui.EndMenu();
                }
                ImGui.EndMenu();
            }
            ImGui.EndMenu();
        }
        if (ImGui.MenuItem("Save", "Ctrl+S")) { }
        if (ImGui.MenuItem("Save As..")) { }
        ImGui.Separator();
        if (ImGui.BeginMenu("Options")) {
            /* static */ const enabled = STATIC("enabled", true);
            ImGui.MenuItem("Enabled", "", (value = enabled.value) => enabled.value = value);
            ImGui.BeginChild("child", new imgui_19.ImVec2(0, 60), true);
            for (let i = 0; i < 10; i++)
                ImGui.Text(`Scrolling Text ${i}`);
            ImGui.EndChild();
            /* static */ const f = STATIC("f#2408", 0.5);
            /* static */ const n = STATIC("n", 0);
            /* static */ const b = STATIC("b#2599", true);
            ImGui.SliderFloat("Value", (value = f.value) => f.value = value, 0.0, 1.0);
            ImGui.InputFloat("Input", (value = f.value) => f.value = value, 0.1);
            ImGui.Combo("Combo", (value = n.value) => n.value = value, "Yes\0No\0Maybe\0\0");
            ImGui.Checkbox("Check", (value = b.value) => b.value = value);
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Colors")) {
            const sz = ImGui.GetTextLineHeight();
            for (let i = 0; i < imgui_5.ImGuiCol.COUNT; i++) {
                const name = ImGui.GetStyleColorName(i);
                const p = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(p, new imgui_19.ImVec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i));
                ImGui.Dummy(new imgui_19.ImVec2(sz, sz));
                ImGui.SameLine();
                ImGui.MenuItem(name);
            }
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Disabled", false)) // Disabled
         {
            imgui_2.IM_ASSERT(0);
        }
        if (ImGui.MenuItem("Checked", null, true)) { }
        if (ImGui.MenuItem("Quit", "Alt+F4")) {
            done = true;
        }
    }
    function ShowExampleAppConsole(p_open) {
        /* static */ const console = STATIC("console", new ExampleAppConsole());
        console.value.Draw("Example: Console", p_open);
    }
    // Demonstrate creating a simple log window with basic filtering.
    function ShowExampleAppLog(p_open) {
        /* static */ const log = STATIC("log#3073", new ExampleAppLog());
        // For the demo: add a debug button _BEFORE_ the normal log window contents
        // We take advantage of a rarely used feature: multiple calls to Begin()/End() are appending to the _same_ window.
        // Most of the contents of the window will be added by the log.Draw() call.
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(500, 400), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin("Example: Log", p_open);
        // /* static */ const last_time: Static<number> = STATIC("last_time", -1.0);
        // const time: number = ImGui.GetTime();
        // if (time - last_time.value >= 0.20 && !ImGui.GetIO().KeyCtrl)
        // {
        //     const random_words: string[] = [ "system", "info", "warning", "error", "fatal", "notice", "log" ];
        //     // log.AddLog("[%s] Hello, time is %.1f, frame count is %d\n", random_words[rand() % IM_ARRAYSIZE(random_words)], time, ImGui.GetFrameCount());
        //     log.value.AddLog(`[${random_words[Math.floor(Math.random() * IM_ARRAYSIZE(random_words))]}] Hello, time is ${time.toFixed(1)}, frame count is ${ImGui.GetFrameCount()}\n`);
        //     last_time.value = time;
        // }
        if (ImGui.SmallButton("[Debug] Add 5 entries")) {
            /* static */ const counter = STATIC("counter", 0);
            for (let n = 0; n < 5; n++) {
                const categories = ["info", "warn", "error"];
                const words = ["Bumfuzzled", "Cattywampus", "Snickersnee", "Abibliophobia", "Absquatulate", "Nincompoop", "Pauciloquent"];
                // log.AddLog("[%05d] [%s] Hello, current time is %.1f, here's a word: '%s'\n",
                //     ImGui.GetFrameCount(), categories[counter % IM_ARRAYSIZE(categories)], ImGui.GetTime(), words[counter % IM_ARRAYSIZE(words)]);
                log.value.AddLog(`[${ImGui.GetFrameCount()}] [${categories[counter.value % imgui_3.IM_ARRAYSIZE(categories)]}] Hello, current time is ${ImGui.GetTime()}, here's a word: '${words[counter.value % imgui_3.IM_ARRAYSIZE(words)]}'\n`);
                counter.value++;
            }
        }
        ImGui.End();
        // Actually call in the regular Log helper (which will Begin() into the same window as we just did)
        log.value.Draw("Example: Log", p_open);
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Simple Layout / ShowExampleAppLayout()
    //-----------------------------------------------------------------------------
    // Demonstrate create a window with multiple child windows.
    function ShowExampleAppLayout(p_open) {
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(500, 440), imgui_7.ImGuiCond.FirstUseEver);
        if (ImGui.Begin("Example: Simple Layout", p_open, imgui_15.ImGuiWindowFlags.MenuBar)) {
            if (ImGui.BeginMenuBar()) {
                if (ImGui.BeginMenu("File")) {
                    if (ImGui.MenuItem("Close"))
                        p_open(false);
                    ImGui.EndMenu();
                }
                ImGui.EndMenuBar();
            }
            // left
            /* static */ const selected = STATIC("selected#3106", 0);
            ImGui.BeginChild("left pane", new imgui_19.ImVec2(150, 0), true);
            for (let i = 0; i < 100; i++) {
                const label = `MyObject ${i}`;
                if (ImGui.Selectable(label, selected.value === i))
                    selected.value = i;
            }
            ImGui.EndChild();
            ImGui.SameLine();
            // right
            ImGui.BeginGroup();
            ImGui.BeginChild("item view", new imgui_19.ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
            ImGui.Text(`MyObject: ${selected}`);
            ImGui.Separator();
            if (ImGui.BeginTabBar("##Tabs", imgui_16.ImGuiTabBarFlags.None)) {
                if (ImGui.BeginTabItem("Description")) {
                    ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ");
                    ImGui.EndTabItem();
                }
                if (ImGui.BeginTabItem("Details")) {
                    ImGui.Text("ID: 0123456789");
                    ImGui.EndTabItem();
                }
                ImGui.EndTabBar();
            }
            ImGui.EndChild();
            if (ImGui.Button("Revert")) { }
            ImGui.SameLine();
            if (ImGui.Button("Save")) { }
            ImGui.EndGroup();
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Property Editor / ShowExampleAppPropertyEditor()
    //-----------------------------------------------------------------------------
    // Demonstrate create a simple property editor.
    function ShowExampleAppPropertyEditor(p_open) {
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(430, 450), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Property editor", p_open)) {
            ImGui.End();
            return;
        }
        HelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");
        ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_19.ImVec2(2, 2));
        ImGui.Columns(2);
        ImGui.Separator();
        class funcs {
            static ShowDummyObject(prefix, uid) {
                ImGui.PushID(uid); // Use object uid as identifier. Most commonly you could also use the object pointer as a base ID.
                ImGui.AlignTextToFramePadding(); // Text and Tree nodes are less high than regular widgets, here we add vertical spacing to make the tree lines equal high.
                const node_open = ImGui.TreeNode("Object", `${prefix}_${uid}`);
                ImGui.NextColumn();
                ImGui.AlignTextToFramePadding();
                ImGui.Text("my sailor is rich");
                ImGui.NextColumn();
                if (node_open) {
                    /* static */ const dummy_members = STATIC("dummy_members", [0.0, 0.0, 1.0, 3.1416, 100.0, 999.0]);
                    for (let i = 0; i < 8; i++) {
                        ImGui.PushID(i); // Use field index as identifier.
                        if (i < 2) {
                            funcs.ShowDummyObject("Child", 424242);
                        }
                        else {
                            // Here we use a TreeNode to highlight on hover (we could use e.g. Selectable as well)
                            ImGui.AlignTextToFramePadding();
                            // ImGui.TreeNodeEx("Field", ImGuiTreeNodeFlags_Leaf | ImGuiTreeNodeFlags_NoTreePushOnOpen | ImGuiTreeNodeFlags_Bullet, "Field_%d", i);
                            ImGui.TreeNodeEx("Field", imgui_14.ImGuiTreeNodeFlags.Leaf | imgui_14.ImGuiTreeNodeFlags.NoTreePushOnOpen | imgui_14.ImGuiTreeNodeFlags.Bullet, `Field_${i}`);
                            ImGui.NextColumn();
                            ImGui.SetNextItemWidth(-1);
                            const ref = [dummy_members.value[i] || 0];
                            if (i >= 5)
                                ImGui.InputFloat("##value", ref, 1.0);
                            else
                                ImGui.DragFloat("##value", ref, 0.01);
                            dummy_members.value[i] = ref[0];
                            ImGui.NextColumn();
                        }
                        ImGui.PopID();
                    }
                    ImGui.TreePop();
                }
                ImGui.PopID();
            }
        }
        // Iterate dummy objects with dummy members (all the same data)
        for (let obj_i = 0; obj_i < 3; obj_i++)
            funcs.ShowDummyObject("Object", obj_i);
        ImGui.Columns(1);
        ImGui.Separator();
        ImGui.PopStyleVar();
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Long Text / ShowExampleAppLongText()
    //-----------------------------------------------------------------------------
    // Demonstrate/test rendering huge amount of text, and the incidence of clipping.
    function ShowExampleAppLongText(p_open) {
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(520, 600), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Long text display", p_open)) {
            ImGui.End();
            return;
        }
        /* static */ const test_type = STATIC("test_type", 0);
        /* static */ const log = STATIC("log#3217", new imgui_25.ImGuiTextBuffer());
        /* static */ const lines = STATIC("lines#3218", 0);
        ImGui.Text("Printing unusually long amount of text.");
        ImGui.Combo("Test type", (value = test_type.value) => test_type.value = value, "Single call to TextUnformatted()\0Multiple calls to Text(), clipped manually\0Multiple calls to Text(), not clipped (slow)\0");
        ImGui.Text(`Buffer contents: ${lines.value} lines, ${log.value.size()} bytes`);
        if (ImGui.Button("Clear")) {
            log.value.clear();
            lines.value = 0;
        }
        ImGui.SameLine();
        if (ImGui.Button("Add 1000 lines")) {
            for (let i = 0; i < 1000; i++)
                log.value.append(`${lines.value + i} The quick brown fox jumps over the lazy dog\n`);
            lines.value += 1000;
        }
        ImGui.BeginChild("Log");
        switch (test_type.value) {
            case 0:
                // Single call to TextUnformatted() with a big buffer
                // ImGui.TextUnformatted(log.begin(), log.end());
                ImGui.TextUnformatted(log.value.begin());
                break;
            case 1:
                {
                    // Multiple calls to Text(), manually coarsely clipped - demonstrate how to use the ImGuiListClipper helper.
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_19.ImVec2(0, 0));
                    const clipper = new imgui_26.ImGuiListClipper(lines.value);
                    while (clipper.Step())
                        for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                            ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                    // clipper.delete(); // NOTE: native emscripten class
                    ImGui.PopStyleVar();
                    break;
                }
            case 2:
                // Multiple calls to Text(), not clipped (slow)
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_19.ImVec2(0, 0));
                for (let i = 0; i < lines.value; i++)
                    ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                ImGui.PopStyleVar();
                break;
        }
        ImGui.EndChild();
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Auto Resize / ShowExampleAppAutoResize()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a window which gets auto-resized according to its content.
    function ShowExampleAppAutoResize(p_open) {
        if (!ImGui.Begin("Example: Auto-resizing window", p_open, ImGui.WindowFlags.AlwaysAutoResize)) {
            ImGui.End();
            return;
        }
        /* static */ const lines = STATIC("lines#2447", 10);
        ImGui.Text("Window will resize every-frame to the size of its content.\nNote that you probably don't want to query the window size to\noutput your content because that would create a feedback loop.");
        ImGui.SliderInt("Number of lines", (value = lines.value) => lines.value = value, 1, 20);
        for (let i = 0; i < lines.value; i++)
            ImGui.Text(" ".repeat(i * 4) + `This is line ${i}`); // Pad with space to extend size horizontally
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Constrained Resize / ShowExampleAppConstrainedResize()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a window with custom resize constraints.
    function ShowExampleAppConstrainedResize(p_open) {
        class CustomConstraints // Helper functions to demonstrate programmatic constraints
         {
            static Square(data) {
                data.DesiredSize.x = data.DesiredSize.y = IM_MAX(data.DesiredSize.x, data.DesiredSize.y);
            }
            static Step(data) {
                const step = data.UserData;
                data.DesiredSize.x = Math.floor(data.DesiredSize.x / step + 0.5) * step;
                data.DesiredSize.y = Math.floor(data.DesiredSize.y / step + 0.5) * step;
            }
        }
        /* static */ const auto_resize = STATIC("auto_resize", false);
        /* static */ const type = STATIC("type", 0);
        /* static */ const display_lines = STATIC("display_lines", 10);
        if (type.value === 0)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(-1, 0), new imgui_19.ImVec2(-1, Number.MAX_VALUE)); // Vertical only
        if (type.value === 1)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(0, -1), new imgui_19.ImVec2(Number.MAX_VALUE, -1)); // Horizontal only
        if (type.value === 2)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(100, 100), new imgui_19.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
        if (type.value === 3)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(400, -1), new imgui_19.ImVec2(500, -1)); // Width 400-500
        if (type.value === 4)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(-1, 400), new imgui_19.ImVec2(-1, 500)); // Height 400-500
        if (type.value === 5)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(0, 0), new imgui_19.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square); // Always Square
        if (type.value === 6)
            ImGui.SetNextWindowSizeConstraints(new imgui_19.ImVec2(0, 0), new imgui_19.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100); // Fixed Step
        const flags = auto_resize.value ? imgui_15.ImGuiWindowFlags.AlwaysAutoResize : 0;
        if (ImGui.Begin("Example: Constrained Resize", p_open, flags)) {
            const desc = [
                "Resize vertical only",
                "Resize horizontal only",
                "Width > 100, Height > 100",
                "Width 400-500",
                "Height 400-500",
                "Custom: Always Square",
                "Custom: Fixed Steps (100)",
            ];
            if (ImGui.Button("200x200")) {
                ImGui.SetWindowSize(new imgui_19.ImVec2(200, 200));
            }
            ImGui.SameLine();
            if (ImGui.Button("500x500")) {
                ImGui.SetWindowSize(new imgui_19.ImVec2(500, 500));
            }
            ImGui.SameLine();
            if (ImGui.Button("800x200")) {
                ImGui.SetWindowSize(new imgui_19.ImVec2(800, 200));
            }
            ImGui.SetNextItemWidth(200);
            ImGui.Combo("Constraint", (value = type.value) => type.value = value, desc, imgui_3.IM_ARRAYSIZE(desc));
            ImGui.SetNextItemWidth(200);
            ImGui.DragInt("Lines", (value = display_lines.value) => display_lines.value = value, 0.2, 1, 100);
            ImGui.Checkbox("Auto-resize", (value = auto_resize.value) => auto_resize.value = value);
            for (let i = 0; i < display_lines.value; i++)
                ImGui.Text(" ".repeat(i * 4) + "Hello, sailor! Making this line long enough for the example.");
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Simple Overlay / ShowExampleAppSimpleOverlay()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a simple static window with no decoration + a context-menu to choose which corner of the screen to use.
    function ShowExampleAppSimpleOverlay(p_open) {
        const DISTANCE = 10.0;
        /* static */ const corner = STATIC("corner", 0);
        const io = ImGui.GetIO();
        if (corner.value !== -1) {
            const window_pos = new imgui_19.ImVec2((corner.value & 1) ? io.DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? io.DisplaySize.y - DISTANCE : DISTANCE);
            const window_pos_pivot = new imgui_19.ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
            ImGui.SetNextWindowPos(window_pos, imgui_7.ImGuiCond.Always, window_pos_pivot);
        }
        ImGui.SetNextWindowBgAlpha(0.35); // Transparent background
        if (ImGui.Begin("Example: Simple overlay", p_open, (corner.value !== -1 ? imgui_15.ImGuiWindowFlags.NoMove : 0) | imgui_15.ImGuiWindowFlags.NoDecoration | imgui_15.ImGuiWindowFlags.AlwaysAutoResize | imgui_15.ImGuiWindowFlags.NoSavedSettings)) {
            ImGui.Text("Simple overlay\nin the corner of the screen.\n(right-click to change position)");
            ImGui.Separator();
            if (ImGui.IsMousePosValid())
                ImGui.Text(`Mouse Position: (${io.MousePos.x.toFixed(1)},${io.MousePos.y.toFixed(1)})`);
            else
                ImGui.Text("Mouse Position: <invalid>");
            if (ImGui.BeginPopupContextWindow()) {
                if (ImGui.MenuItem("Custom", null, corner.value === -1))
                    corner.value = -1;
                if (ImGui.MenuItem("Top-left", null, corner.value === 0))
                    corner.value = 0;
                if (ImGui.MenuItem("Top-right", null, corner.value === 1))
                    corner.value = 1;
                if (ImGui.MenuItem("Bottom-left", null, corner.value === 2))
                    corner.value = 2;
                if (ImGui.MenuItem("Bottom-right", null, corner.value === 3))
                    corner.value = 3;
                if (p_open() && ImGui.MenuItem("Close"))
                    p_open(false);
                ImGui.EndPopup();
            }
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Manipulating Window Titles / ShowExampleAppWindowTitles()
    //-----------------------------------------------------------------------------
    // Demonstrate using "##" and "###" in identifiers to manipulate ID generation.
    // This apply to all regular items as well. Read FAQ section "How can I have multiple widgets with the same label? Can I have widget without a label? (Yes). A primer on the purpose of labels/IDs." for details.
    function ShowExampleAppWindowTitles(p_open) {
        // By default, Windows are uniquely identified by their title.
        // You can use the "##" and "###" markers to manipulate the display/ID.
        // Using "##" to display same title but have unique identifier.
        ImGui.SetNextWindowPos(new imgui_19.ImVec2(100, 100), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##1");
        ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
        ImGui.End();
        ImGui.SetNextWindowPos(new imgui_19.ImVec2(100, 200), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##2");
        ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
        ImGui.End();
        // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
        const buf = `Animated title ${"|/-\\".charAt((ImGui.GetTime() / 0.25) & 3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
        ImGui.SetNextWindowPos(new imgui_19.ImVec2(100, 300), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin(buf);
        ImGui.Text("This window has a changing title.");
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Custom Rendering using ImDrawList API / ShowExampleAppCustomRendering()
    //-----------------------------------------------------------------------------
    // Demonstrate using the low-level ImDrawList to draw custom shapes.
    function ShowExampleAppCustomRendering(p_open) {
        ImGui.SetNextWindowSize(new imgui_19.ImVec2(350, 560), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Custom rendering", p_open)) {
            ImGui.End();
            return;
        }
        // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of overloaded operators, etc.
        // Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your types and ImVec2/ImVec4.
        // ImGui defines overloaded operators but they are internal to imgui.cpp and not exposed outside (to avoid messing with your types)
        // In this example we are not using the maths operators!
        const draw_list = ImGui.GetWindowDrawList();
        if (ImGui.BeginTabBar("##TabBar")) {
            // Primitives
            if (ImGui.BeginTabItem("Primitives")) {
                /* static */ const sz = STATIC("sz", 36.0);
                /* static */ const thickness = STATIC("thickness", 4.0);
                /* static */ const col = STATIC("color#2583", new imgui_20.ImVec4(1.0, 1.0, 0.4, 1.0));
                ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
                ImGui.DragFloat("Thickness", (value = thickness.value) => thickness.value = value, 0.05, 1.0, 8.0, "%.02f");
                ImGui.ColorEdit3("Color", col.value);
                {
                    const p = ImGui.GetCursorScreenPos();
                    const col32 = imgui_21.IM_COL32(col.value.x * 255, col.value.y * 255, col.value.z * 255, col.value.w * 255);
                    let x = p.x + 4.0, y = p.y + 4.0;
                    const spacing = 8.0;
                    for (let n = 0; n < 2; n++) {
                        const curr_thickness = (n === 0) ? 1.0 : thickness.value;
                        draw_list.AddCircle(new imgui_19.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 20, curr_thickness);
                        x += sz.value + spacing;
                        draw_list.AddRect(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, 0.0, imgui_17.ImDrawCornerFlags.All, curr_thickness);
                        x += sz.value + spacing;
                        draw_list.AddRect(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_17.ImDrawCornerFlags.All, curr_thickness);
                        x += sz.value + spacing;
                        draw_list.AddRect(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_17.ImDrawCornerFlags.TopLeft | imgui_17.ImDrawCornerFlags.BotRight, curr_thickness);
                        x += sz.value + spacing;
                        draw_list.AddTriangle(new imgui_19.ImVec2(x + sz.value * 0.5, y), new imgui_19.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_19.ImVec2(x, y + sz.value - 0.5), col32, curr_thickness);
                        x += sz.value + spacing;
                        draw_list.AddLine(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y), col32, curr_thickness);
                        x += sz.value + spacing; // Horizontal line (note: drawing a filled rectangle will be faster!)
                        draw_list.AddLine(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x, y + sz.value), col32, curr_thickness);
                        x += spacing; // Vertical line (note: drawing a filled rectangle will be faster!)
                        draw_list.AddLine(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, curr_thickness);
                        x += sz.value + spacing; // Diagonal line
                        draw_list.AddBezierCurve(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value * 1.3, y + sz.value * 0.3), new imgui_19.ImVec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, curr_thickness);
                        x = p.x + 4;
                        y += sz.value + spacing;
                    }
                    draw_list.AddCircleFilled(new imgui_19.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 32);
                    x += sz.value + spacing;
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32);
                    x += sz.value + spacing;
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, 10.0);
                    x += sz.value + spacing;
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_17.ImDrawCornerFlags.TopLeft | imgui_17.ImDrawCornerFlags.BotRight);
                    x += sz.value + spacing;
                    draw_list.AddTriangleFilled(new imgui_19.ImVec2(x + sz.value * 0.5, y), new imgui_19.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_19.ImVec2(x, y + sz.value - 0.5), col32);
                    x += sz.value + spacing;
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + thickness.value), col32);
                    x += sz.value + spacing; // Horizontal line (faster than AddLine, but only handle integer thickness)
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + thickness.value, y + sz.value), col32);
                    x += spacing + spacing; // Vertical line (faster than AddLine, but only handle integer thickness)
                    draw_list.AddRectFilled(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + 1, y + 1), col32);
                    x += sz.value; // Pixel (faster than AddLine)
                    draw_list.AddRectFilledMultiColor(new imgui_19.ImVec2(x, y), new imgui_19.ImVec2(x + sz.value, y + sz.value), imgui_21.IM_COL32(0, 0, 0), imgui_21.IM_COL32(255, 0, 0), imgui_21.IM_COL32(255, 255, 0), imgui_21.IM_COL32(0, 255, 0));
                    ImGui.Dummy(new imgui_19.ImVec2((sz.value + spacing) * 8, (sz.value + spacing) * 3));
                }
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Canvas")) {
                /* static */ const points = STATIC("points", new imgui_18.ImVector());
                /* static */ const adding_line = STATIC("adding_line", false);
                if (ImGui.Button("Clear"))
                    points.value.clear();
                if (points.value.Size >= 2) {
                    ImGui.SameLine();
                    if (ImGui.Button("Undo")) {
                        points.value.pop_back();
                        points.value.pop_back();
                    }
                }
                ImGui.Text("Left-click and drag to add lines,\nRight-click to undo");
                // Here we are using InvisibleButton() as a convenience to 1) advance the cursor and 2) allows us to use IsItemHovered()
                // But you can also draw directly and poll mouse/keyboard by yourself. You can manipulate the cursor using GetCursorPos() and SetCursorPos().
                // If you only use the ImDrawList API, you can notify the owner window of its extends by using SetCursorPos(max).
                const canvas_pos = ImGui.GetCursorScreenPos(); // ImDrawList API uses screen coordinates!
                const canvas_size = ImGui.GetContentRegionAvail(); // Resize canvas to what's available
                if (canvas_size.x < 50.0)
                    canvas_size.x = 50.0;
                if (canvas_size.y < 50.0)
                    canvas_size.y = 50.0;
                draw_list.AddRectFilledMultiColor(canvas_pos, new imgui_19.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_21.IM_COL32(50, 50, 50), imgui_21.IM_COL32(50, 50, 60), imgui_21.IM_COL32(60, 60, 70), imgui_21.IM_COL32(50, 50, 60));
                draw_list.AddRect(canvas_pos, new imgui_19.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_21.IM_COL32(255, 255, 255));
                let adding_preview = false;
                ImGui.InvisibleButton("canvas", canvas_size);
                const mouse_pos_in_canvas = new imgui_19.ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
                if (adding_line.value) {
                    adding_preview = true;
                    points.value.push_back(mouse_pos_in_canvas);
                    if (!ImGui.IsMouseDown(0))
                        adding_line.value = adding_preview = false;
                }
                if (ImGui.IsItemHovered()) {
                    if (!adding_line.value && ImGui.IsMouseClicked(0)) {
                        points.value.push_back(mouse_pos_in_canvas);
                        adding_line.value = true;
                    }
                    if (ImGui.IsMouseClicked(1) && !points.value.empty()) {
                        adding_line.value = adding_preview = false;
                        points.value.pop_back();
                        points.value.pop_back();
                    }
                }
                draw_list.PushClipRect(canvas_pos, new imgui_19.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), true); // clip lines within the canvas (if we resize it, etc.)
                for (let i = 0; i < points.value.Size - 1; i += 2)
                    draw_list.AddLine(new imgui_19.ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new imgui_19.ImVec2(canvas_pos.x + points.value.Data[i + 1].x, canvas_pos.y + points.value.Data[i + 1].y), imgui_21.IM_COL32(255, 255, 0, 255), 2.0);
                draw_list.PopClipRect();
                if (adding_preview)
                    points.value.pop_back();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("BG/FG draw lists")) {
                /* static */ const draw_bg = STATIC("draw_bg", true);
                /* static */ const draw_fg = STATIC("draw_fg", true);
                ImGui.Checkbox("Draw in Background draw list", (value = draw_bg.value) => draw_bg.value = value);
                ImGui.Checkbox("Draw in Foreground draw list", (value = draw_fg.value) => draw_fg.value = value);
                const window_pos = ImGui.GetWindowPos();
                const window_size = ImGui.GetWindowSize();
                const window_center = new imgui_19.ImVec2(window_pos.x + window_size.x * 0.5, window_pos.y + window_size.y * 0.5);
                if (draw_bg.value)
                    ImGui.GetBackgroundDrawList().AddCircle(window_center, window_size.x * 0.6, imgui_21.IM_COL32(255, 0, 0, 200), 32, 10 + 4);
                if (draw_fg.value)
                    ImGui.GetForegroundDrawList().AddCircle(window_center, window_size.y * 0.6, imgui_21.IM_COL32(0, 255, 0, 200), 32, 10);
                ImGui.EndTabItem();
            }
            ImGui.EndTabBar();
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Documents Handling / ShowExampleAppDocuments()
    //-----------------------------------------------------------------------------
    // Simplified structure to mimic a Document model
    // struct MyDocument
    // {
    //     const char* Name;           // Document title
    //     bool        Open;           // Set when the document is open (in this demo, we keep an array of all available documents to simplify the demo)
    //     bool        OpenPrev;       // Copy of Open from last update.
    //     bool        Dirty;          // Set when the document has been modified
    //     bool        WantClose;      // Set when the document
    //     ImVec4      Color;          // An arbitrary variable associated to the document
    //     MyDocument(const char* name, bool open = true, const ImVec4& color = ImVec4(1.0f,1.0f,1.0f,1.0f))
    //     {
    //         Name = name;
    //         Open = OpenPrev = open;
    //         Dirty = false;
    //         WantClose = false;
    //         Color = color;
    //     }
    //     void DoOpen()       { Open = true; }
    //     void DoQueueClose() { WantClose = true; }
    //     void DoForceClose() { Open = false; Dirty = false; }
    //     void DoSave()       { Dirty = false; }
    //     // Display dummy contents for the Document
    //     static void DisplayContents(MyDocument* doc)
    //     {
    //         ImGui.PushID(doc);
    //         ImGui.Text("Document \"%s\"", doc->Name);
    //         ImGui.PushStyleColor(ImGuiCol_Text, doc->Color);
    //         ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    //         ImGui.PopStyleColor();
    //         if (ImGui.Button("Modify", ImVec2(100, 0)))
    //             doc->Dirty = true;
    //         ImGui.SameLine();
    //         if (ImGui.Button("Save", ImVec2(100, 0)))
    //             doc->DoSave();
    //         ImGui.ColorEdit3("color", &doc->Color.x);  // Useful to test drag and drop and hold-dragged-to-open-tab behavior.
    //         ImGui.PopID();
    //     }
    //     // Display context menu for the Document
    //     static void DisplayContextMenu(MyDocument* doc)
    //     {
    //         if (!ImGui.BeginPopupContextItem())
    //             return;
    //         char buf[256];
    //         sprintf(buf, "Save %s", doc->Name);
    //         if (ImGui.MenuItem(buf, "CTRL+S", false, doc->Open))
    //             doc->DoSave();
    //         if (ImGui.MenuItem("Close", "CTRL+W", false, doc->Open))
    //             doc->DoQueueClose();
    //         ImGui.EndPopup();
    //     }
    // };
    // struct ExampleAppDocuments
    // {
    //     ImVector<MyDocument> Documents;
    //     ExampleAppDocuments()
    //     {
    //         Documents.push_back(MyDocument("Lettuce",             true,  ImVec4(0.4f, 0.8f, 0.4f, 1.0f)));
    //         Documents.push_back(MyDocument("Eggplant",            true,  ImVec4(0.8f, 0.5f, 1.0f, 1.0f)));
    //         Documents.push_back(MyDocument("Carrot",              true,  ImVec4(1.0f, 0.8f, 0.5f, 1.0f)));
    //         Documents.push_back(MyDocument("Tomato",              false, ImVec4(1.0f, 0.3f, 0.4f, 1.0f)));
    //         Documents.push_back(MyDocument("A Rather Long Title", false));
    //         Documents.push_back(MyDocument("Some Document",       false));
    //     }
    // };
    // // [Optional] Notify the system of Tabs/Windows closure that happened outside the regular tab interface.
    // // If a tab has been closed programmatically (aka closed from another source such as the Checkbox() in the demo, as opposed
    // // to clicking on the regular tab closing button) and stops being submitted, it will take a frame for the tab bar to notice its absence.
    // // During this frame there will be a gap in the tab bar, and if the tab that has disappeared was the selected one, the tab bar
    // // will report no selected tab during the frame. This will effectively give the impression of a flicker for one frame.
    // // We call SetTabItemClosed() to manually notify the Tab Bar or Docking system of removed tabs to avoid this glitch.
    // // Note that this completely optional, and only affect tab bars with the ImGuiTabBarFlags_Reorderable flag.
    // static void NotifyOfDocumentsClosedElsewhere(ExampleAppDocuments& app)
    // {
    //     for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
    //     {
    //         MyDocument* doc = &app.Documents[doc_n];
    //         if (!doc->Open && doc->OpenPrev)
    //             ImGui.SetTabItemClosed(doc->Name);
    //         doc->OpenPrev = doc->Open;
    //     }
    // }
    // void ShowExampleAppDocuments(bool* p_open)
    function ShowExampleAppDocuments(p_open) {
        // static ExampleAppDocuments app;
        // // Options
        // static bool opt_reorderable = true;
        // static ImGuiTabBarFlags opt_fitting_flags = ImGuiTabBarFlags_FittingPolicyDefault_;
        if (!ImGui.Begin("Example: Documents", p_open, imgui_15.ImGuiWindowFlags.MenuBar)) {
            ImGui.End();
            return;
        }
        // // Menu
        // if (ImGui.BeginMenuBar())
        // {
        //     if (ImGui.BeginMenu("File"))
        //     {
        //         int open_count = 0;
        //         for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        //             open_count += app.Documents[doc_n].Open ? 1 : 0;
        //         if (ImGui.BeginMenu("Open", open_count < app.Documents.Size))
        //         {
        //             for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        //             {
        //                 MyDocument* doc = &app.Documents[doc_n];
        //                 if (!doc->Open)
        //                     if (ImGui.MenuItem(doc->Name))
        //                         doc->DoOpen();
        //             }
        //             ImGui.EndMenu();
        //         }
        //         if (ImGui.MenuItem("Close All Documents", NULL, false, open_count > 0))
        //             for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        //                 app.Documents[doc_n].DoQueueClose();
        //         if (ImGui.MenuItem("Exit", "Alt+F4")) {}
        //         ImGui.EndMenu();
        //     }
        //     ImGui.EndMenuBar();
        // }
        // // [Debug] List documents with one checkbox for each
        // for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        // {
        //     MyDocument* doc = &app.Documents[doc_n];
        //     if (doc_n > 0)
        //         ImGui.SameLine();
        //     ImGui.PushID(doc);
        //     if (ImGui.Checkbox(doc->Name, &doc->Open))
        //         if (!doc->Open)
        //             doc->DoForceClose();
        //     ImGui.PopID();
        // }
        // ImGui.Separator();
        // // Submit Tab Bar and Tabs
        // {
        //     ImGuiTabBarFlags tab_bar_flags = (opt_fitting_flags) | (opt_reorderable ? ImGuiTabBarFlags_Reorderable : 0);
        //     if (ImGui.BeginTabBar("##tabs", tab_bar_flags))
        //     {
        //         if (opt_reorderable)
        //             NotifyOfDocumentsClosedElsewhere(app);
        //         // [DEBUG] Stress tests
        //         //if ((ImGui.GetFrameCount() % 30) == 0) docs[1].Open ^= 1;            // [DEBUG] Automatically show/hide a tab. Test various interactions e.g. dragging with this on.
        //         //if (ImGui.GetIO().KeyCtrl) ImGui.SetTabItemSelected(docs[1].Name);  // [DEBUG] Test SetTabItemSelected(), probably not very useful as-is anyway..
        //         // Submit Tabs
        //         for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        //         {
        //             MyDocument* doc = &app.Documents[doc_n];
        //             if (!doc->Open)
        //                 continue;
        //             ImGuiTabItemFlags tab_flags = (doc->Dirty ? ImGuiTabItemFlags_UnsavedDocument : 0);
        //             bool visible = ImGui.BeginTabItem(doc->Name, &doc->Open, tab_flags);
        //             // Cancel attempt to close when unsaved add to save queue so we can display a popup.
        //             if (!doc->Open && doc->Dirty)
        //             {
        //                 doc->Open = true;
        //                 doc->DoQueueClose();
        //             }
        //             MyDocument::DisplayContextMenu(doc);
        //             if (visible)
        //             {
        //                 MyDocument::DisplayContents(doc);
        //                 ImGui.EndTabItem();
        //             }
        //         }
        //         ImGui.EndTabBar();
        //     }
        // }
        // // Update closing queue
        // static ImVector<MyDocument*> close_queue;
        // if (close_queue.empty())
        // {
        //     // Close queue is locked once we started a popup
        //     for (int doc_n = 0; doc_n < app.Documents.Size; doc_n++)
        //     {
        //         MyDocument* doc = &app.Documents[doc_n];
        //         if (doc->WantClose)
        //         {
        //             doc->WantClose = false;
        //             close_queue.push_back(doc);
        //         }
        //     }
        // }
        // // Display closing confirmation UI
        // if (!close_queue.empty())
        // {
        //     int close_queue_unsaved_documents = 0;
        //     for (int n = 0; n < close_queue.Size; n++)
        //         if (close_queue[n]->Dirty)
        //             close_queue_unsaved_documents++;
        //     if (close_queue_unsaved_documents == 0)
        //     {
        //         // Close documents when all are unsaved
        //         for (int n = 0; n < close_queue.Size; n++)
        //             close_queue[n]->DoForceClose();
        //         close_queue.clear();
        //     }
        //     else
        //     {
        //         if (!ImGui.IsPopupOpen("Save?"))
        //             ImGui.OpenPopup("Save?");
        //         if (ImGui.BeginPopupModal("Save?"))
        //         {
        //             ImGui.Text("Save change to the following items?");
        //             ImGui.SetNextItemWidth(-1.0f);
        //             if (ImGui.ListBoxHeader("##", close_queue_unsaved_documents, 6))
        //             {
        //                 for (int n = 0; n < close_queue.Size; n++)
        //                     if (close_queue[n]->Dirty)
        //                         ImGui.Text("%s", close_queue[n]->Name);
        //                 ImGui.ListBoxFooter();
        //             }
        //             if (ImGui.Button("Yes", ImVec2(80, 0)))
        //             {
        //                 for (int n = 0; n < close_queue.Size; n++)
        //                 {
        //                     if (close_queue[n]->Dirty)
        //                         close_queue[n]->DoSave();
        //                     close_queue[n]->DoForceClose();
        //                 }
        //                 close_queue.clear();
        //                 ImGui.CloseCurrentPopup();
        //             }
        //             ImGui.SameLine();
        //             if (ImGui.Button("No", ImVec2(80, 0)))
        //             {
        //                 for (int n = 0; n < close_queue.Size; n++)
        //                     close_queue[n]->DoForceClose();
        //                 close_queue.clear();
        //                 ImGui.CloseCurrentPopup();
        //             }
        //             ImGui.SameLine();
        //             if (ImGui.Button("Cancel", ImVec2(80, 0)))
        //             {
        //                 close_queue.clear();
        //                 ImGui.CloseCurrentPopup();
        //             }
        //             ImGui.EndPopup();
        //         }
        //     }
        // }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION]
    //-----------------------------------------------------------------------------
    function ShowBackendCheckerWindow(p_open) {
        if (!ImGui.Begin("Dear ImGui Backend Checker", p_open)) {
            ImGui.End();
            return;
        }
        const io = ImGui.GetIO();
        ImGui.Text(`Dear ImGui ${ImGui.GetVersion()} Backend Checker`);
        ImGui.Text(`io.BackendPlatformName: ${io.BackendPlatformName ? io.BackendPlatformName : "NULL"}`);
        ImGui.Text(`io.BackendRendererName: ${io.BackendRendererName ? io.BackendRendererName : "NULL"}`);
        ImGui.Separator();
        if (ImGui.TreeNode("0001: Renderer: Large Mesh Support")) {
            const draw_list = ImGui.GetWindowDrawList();
            {
                /* static */ const vtx_count = STATIC("vtx_count#4821", 60000);
                // ImGui.SliderInt("VtxCount##1", &vtx_count, 0, 100000);
                ImGui.SliderInt("VtxCount##1", (_ = vtx_count.value) => vtx_count.value = _, 0, 100000);
                const p = ImGui.GetCursorScreenPos();
                for (let n = 0; n < vtx_count.value / 4; n++) {
                    // float off_x = (float)(n % 100) * 3.0f;
                    const off_x = (n % 100) * 3.0;
                    // float off_y = (float)(n % 100) * 1.0f;
                    const off_y = (n % 100) * 1.0;
                    // ImU32 col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                    const col = imgui_21.IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                    // draw_list->AddRectFilled(ImVec2(p.x + off_x, p.y + off_y), ImVec2(p.x + off_x + 50, p.y + off_y + 50), col);
                    draw_list.AddRectFilled(new imgui_19.ImVec2(p.x + off_x, p.y + off_y), new imgui_19.ImVec2(p.x + off_x + 50, p.y + off_y + 50), col);
                }
                ImGui.Dummy(new imgui_19.ImVec2(300 + 50, 100 + 50));
                // ImGui.Text("VtxBuffer.Size = %d", draw_list->VtxBuffer.Size);
                ImGui.Text(`VtxBuffer = ${draw_list.VtxBuffer.length}`);
            }
            {
                /* static */ const vtx_count = STATIC("vtx_count#4841", 60000);
                // ImGui.SliderInt("VtxCount##2", &vtx_count, 0, 100000);
                ImGui.SliderInt("VtxCount##2", (_ = vtx_count.value) => vtx_count.value = _, 0, 100000);
                const p = ImGui.GetCursorScreenPos();
                for (let n = 0; n < vtx_count.value / (10 * 4); n++) {
                    // float off_x = (float)(n % 100) * 3.0f;
                    const off_x = (n % 100) * 3.0;
                    // float off_y = (float)(n % 100) * 1.0f;
                    const off_y = (n % 100) * 1.0;
                    // ImU32 col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                    const col = imgui_21.IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                    // draw_list->AddText(ImVec2(p.x + off_x, p.y + off_y), col, "ABCDEFGHIJ");
                    draw_list.AddText(new imgui_19.ImVec2(p.x + off_x, p.y + off_y), col, "ABCDEFGHIJ");
                }
                ImGui.Dummy(new imgui_19.ImVec2(300 + 50, 100 + 20));
                // ImGui.Text("VtxBuffer.Size = %d", draw_list->VtxBuffer.Size);
                ImGui.Text(`VtxBuffer = ${draw_list.VtxBuffer.length}`);
            }
            ImGui.TreePop();
        }
        ImGui.End();
    }
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
                imgui_7 = ImGui_1;
                imgui_8 = ImGui_1;
                imgui_9 = ImGui_1;
                imgui_10 = ImGui_1;
                imgui_11 = ImGui_1;
                imgui_12 = ImGui_1;
                imgui_13 = ImGui_1;
                imgui_14 = ImGui_1;
                imgui_15 = ImGui_1;
                imgui_16 = ImGui_1;
                imgui_17 = ImGui_1;
                imgui_18 = ImGui_1;
                imgui_19 = ImGui_1;
                imgui_20 = ImGui_1;
                imgui_21 = ImGui_1;
                imgui_22 = ImGui_1;
                imgui_23 = ImGui_1;
                imgui_24 = ImGui_1;
                imgui_25 = ImGui_1;
                imgui_26 = ImGui_1;
                imgui_27 = ImGui_1;
            }
        ],
        execute: function () {
            // Play it nice with Windows users. Notepad in 2017 still doesn't display text data with Unix-style \n.
            // #ifdef _WIN32
            // #define IM_NEWLINE "\r\n"
            // #else
            // #define IM_NEWLINE "\n"
            // #endif
            IM_NEWLINE = "\n";
            //-----------------------------------------------------------------------------
            // [SECTION] Forward Declarations, Helpers
            //-----------------------------------------------------------------------------
            // #if !defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS) && defined(IMGUI_DISABLE_TEST_WINDOWS) && !defined(IMGUI_DISABLE_DEMO_WINDOWS)   // Obsolete name since 1.53, TEST->DEMO
            // #define IMGUI_DISABLE_DEMO_WINDOWS
            // #endif
            // #if !defined(IMGUI_DISABLE_DEMO_WINDOWS)
            Static = class Static {
                constructor(value) {
                    this.value = value;
                }
            };
            _static = {};
            done = false;
            //-----------------------------------------------------------------------------
            // [SECTION] Example App: Debug Console / ShowExampleAppConsole()
            //-----------------------------------------------------------------------------
            // Demonstrate creating a simple console window, with scrolling, filtering, completion and history.
            // For the console example, here we are using a more C++ like approach of declaring a class to hold the data and the functions.
            ExampleAppConsole = class ExampleAppConsole {
                constructor() {
                    // char                  InputBuf[256];
                    this.InputBuf = new imgui_4.ImStringBuffer(256, "");
                    // ImVector<char*>       Items;
                    this.Items = new imgui_18.ImVector();
                    // ImVector<const char*> Commands;
                    this.Commands = new imgui_18.ImVector();
                    // ImVector<char*>       History;
                    this.History = new imgui_18.ImVector();
                    // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
                    this.HistoryPos = -1;
                    // ImGuiTextFilter       Filter;
                    this.Filter = new imgui_24.ImGuiTextFilter();
                    // bool                  AutoScroll;
                    this.AutoScroll = true;
                    // bool                  ScrollToBottom;
                    this.ScrollToBottom = true;
                    this.ClearLog();
                    // memset(InputBuf, 0, sizeof(InputBuf));
                    this.InputBuf.buffer = "";
                    this.HistoryPos = -1;
                    this.Commands.push_back("HELP");
                    this.Commands.push_back("HISTORY");
                    this.Commands.push_back("CLEAR");
                    this.Commands.push_back("CLASSIFY"); // "classify" is only here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
                    this.AutoScroll = true;
                    this.ScrollToBottom = true;
                    this.AddLog("Welcome to Dear ImGui!");
                }
                delete() { }
                // Portable helpers
                // static int   Stricmp(const char* str1, const char* str2)         { int d; while ((d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; } return d; }
                // static int   Strnicmp(const char* str1, const char* str2, int n) { int d = 0; while (n > 0 && (d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; n--; } return d; }
                // static char* Strdup(const char *str)                             { size_t len = strlen(str) + 1; void* buf = malloc(len); IM_ASSERT(buf); return (char*)memcpy(buf, (const void*)str, len); }
                // static void  Strtrim(char* str)                                  { char* str_end = str + strlen(str); while (str_end > str && str_end[-1] == ' ') str_end--; *str_end = 0; }
                ClearLog() {
                    // for (let i = 0; i < Items.Size; i++)
                    //     free(Items[i]);
                    this.Items.clear();
                    this.ScrollToBottom = true;
                }
                // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
                AddLog(fmt) {
                    // FIXME-OPT
                    // char buf[1024];
                    // va_list args;
                    // va_start(args, fmt);
                    // vsnprintf(buf, IM_ARRAYSIZE(buf), fmt, args);
                    // buf[IM_ARRAYSIZE(buf)-1] = 0;
                    // va_end(args);
                    // Items.push_back(Strdup(buf));
                    this.Items.push_back(fmt);
                    if (this.AutoScroll)
                        this.ScrollToBottom = true;
                }
                // void    Draw(const char* title, bool* p_open)
                Draw(title, p_open) {
                    ImGui.SetNextWindowSize(new imgui_19.ImVec2(520, 600), imgui_7.ImGuiCond.FirstUseEver);
                    if (!ImGui.Begin(title, p_open)) {
                        ImGui.End();
                        return;
                    }
                    // As a specific feature guaranteed by the library, after calling Begin() the last Item represent the title bar. So e.g. IsItemHovered() will return true when hovering the title bar.
                    // Here we create a context menu only available from the title bar.
                    if (ImGui.BeginPopupContextItem()) {
                        if (ImGui.MenuItem("Close Console"))
                            // *p_open = false;
                            p_open(false);
                        ImGui.EndPopup();
                    }
                    ImGui.TextWrapped("This example implements a console with basic coloring, completion and history. A more elaborate implementation may want to store entries along with extra data such as timestamp, emitter, etc.");
                    ImGui.TextWrapped("Enter 'HELP' for help, press TAB to use text completion.");
                    // TODO: display items starting from the bottom
                    if (ImGui.SmallButton("Add Dummy Text")) {
                        this.AddLog(`${this.Items.Size} some text`);
                        this.AddLog("some more text");
                        this.AddLog("display very important message here!");
                    }
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Add Dummy Error")) {
                        this.AddLog("[error] something went wrong");
                    }
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Clear")) {
                        this.ClearLog();
                    }
                    ImGui.SameLine();
                    const copy_to_clipboard = ImGui.SmallButton("Copy");
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Scroll to bottom"))
                        this.ScrollToBottom = true;
                    // /* static */ const t: Static<number> = getStatic("t", 0.0); if (ImGui.GetTime() - t > 0.02) { t = ImGui.GetTime(); this.AddLog(`Spam ${t}`); }
                    ImGui.Separator();
                    // Options menu
                    if (ImGui.BeginPopup("Options")) {
                        if (ImGui.Checkbox("Auto-scroll", (value = this.AutoScroll) => this.AutoScroll = value))
                            if (this.AutoScroll)
                                this.ScrollToBottom = true;
                        ImGui.EndPopup();
                    }
                    // Options, Filter
                    if (ImGui.Button("Options"))
                        ImGui.OpenPopup("Options");
                    ImGui.SameLine();
                    this.Filter.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
                    ImGui.Separator();
                    const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
                    ImGui.BeginChild("ScrollingRegion", new imgui_19.ImVec2(0, -footer_height_to_reserve), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar); // Leave room for 1 separator + 1 InputText
                    if (ImGui.BeginPopupContextWindow()) {
                        if (ImGui.Selectable("Clear"))
                            this.ClearLog();
                        ImGui.EndPopup();
                    }
                    // Display every line as a separate entry so we can change their color or add custom widgets. If you only want raw text you can use ImGui.TextUnformatted(log.begin(), log.end());
                    // NB- if you have thousands of entries this approach may be too inefficient and may require user-side clipping to only process visible items.
                    // You can seek and display only the lines that are visible using the ImGuiListClipper helper, if your elements are evenly spaced and you have cheap random access to the elements.
                    // To use the clipper we could replace the 'for (let i = 0; i < Items.Size; i++)' loop with:
                    //     ImGuiListClipper clipper(Items.Size);
                    //     while (clipper.Step())
                    //         for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    // However, note that you can not use this code as is if a filter is active because it breaks the 'cheap random-access' property. We would need random-access on the post-filtered list.
                    // A typical application wanting coarse clipping and filtering may want to pre-compute an array of indices that passed the filtering test, recomputing this array when user changes the filter,
                    // and appending newly elements as they are inserted. This is left as a task to the user until we can manage to improve this example code!
                    // If your items are of variable size you may want to implement code similar to what ImGuiListClipper does. Or split your data into fixed height items to allow random-seeking into your list.
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_19.ImVec2(4, 1)); // Tighten spacing
                    if (copy_to_clipboard)
                        ImGui.LogToClipboard();
                    for (let i = 0; i < this.Items.Size; i++) {
                        // const char* item = Items[i];
                        const item = this.Items.Data[i];
                        if (!this.Filter.PassFilter(item))
                            continue;
                        // Normally you would store more information in your item (e.g. make Items[] an array of structure, store color/type etc.)
                        let pop_color = false;
                        // if (strstr(item, "[error]"))            { ImGui.PushStyleColor(ImGuiCol_Text, new ImVec4(1.0f, 0.4f, 0.4f, 1.0f)); pop_color = true; }
                        if (/\[error\]/.test(item)) {
                            ImGui.PushStyleColor(imgui_5.ImGuiCol.Text, new imgui_20.ImVec4(1.0, 0.4, 0.4, 1.0));
                            pop_color = true;
                        }
                        // else if (strncmp(item, "# ", 2) == 0)   { ImGui.PushStyleColor(ImGuiCol_Text, new ImVec4(1.0f, 0.8f, 0.6f, 1.0f)); pop_color = true; }
                        else if (/^# /.test(item)) {
                            ImGui.PushStyleColor(imgui_5.ImGuiCol.Text, new imgui_20.ImVec4(1.0, 0.8, 0.6, 1.0));
                            pop_color = true;
                        }
                        ImGui.TextUnformatted(item);
                        if (pop_color)
                            ImGui.PopStyleColor();
                    }
                    if (copy_to_clipboard)
                        ImGui.LogFinish();
                    if (this.ScrollToBottom)
                        ImGui.SetScrollHereY(1.0);
                    this.ScrollToBottom = false;
                    ImGui.PopStyleVar();
                    ImGui.EndChild();
                    ImGui.Separator();
                    // Command-line
                    let reclaim_focus = false;
                    if (ImGui.InputText("Input", this.InputBuf, imgui_3.IM_ARRAYSIZE(this.InputBuf), imgui_10.ImGuiInputTextFlags.EnterReturnsTrue | imgui_10.ImGuiInputTextFlags.CallbackCompletion | imgui_10.ImGuiInputTextFlags.CallbackHistory, ExampleAppConsole.TextEditCallbackStub, this)) {
                        // char* s = InputBuf;
                        // Strtrim(s);
                        // if (s[0])
                        //     ExecCommand(s);
                        // strcpy(s, "");
                        this.InputBuf.buffer = this.InputBuf.buffer.trim();
                        if (this.InputBuf.buffer.length > 0)
                            this.ExecCommand(this.InputBuf.buffer);
                        this.InputBuf.buffer = "";
                        reclaim_focus = true;
                    }
                    // Auto-focus on window apparition
                    ImGui.SetItemDefaultFocus();
                    if (reclaim_focus)
                        ImGui.SetKeyboardFocusHere(-1); // Auto focus previous widget
                    ImGui.End();
                }
                // void    ExecCommand(const char* command_line)
                ExecCommand(command_line) {
                    this.AddLog(`# ${command_line}\n`);
                    // Insert into history. First find match and delete it so it can be pushed to the back. This isn't trying to be smart or optimal.
                    this.HistoryPos = -1;
                    for (let i = this.History.Size - 1; i >= 0; i--)
                        // if (Stricmp(History[i], command_line) === 0)
                        if (this.History.Data[i].toLowerCase() === command_line.toLowerCase()) {
                            // free(History[i]);
                            // History.erase(History.begin() + i);
                            break;
                        }
                    // History.push_back(Strdup(command_line));
                    this.History.push_back(command_line);
                    // Process command
                    // if (Stricmp(command_line, "CLEAR") === 0)
                    if (command_line.toUpperCase() === "CLEAR") {
                        this.ClearLog();
                    }
                    // else if (Stricmp(command_line, "HELP") === 0)
                    else if (command_line.toUpperCase() === "HELP") {
                        this.AddLog("Commands:");
                        for (let i = 0; i < this.Commands.Size; i++)
                            this.AddLog(`- ${this.Commands.Data[i]}`);
                    }
                    // else if (Stricmp(command_line, "HISTORY") === 0)
                    else if (command_line.toUpperCase() === "HISTORY") {
                        const first = this.History.Size - 10;
                        for (let i = first > 0 ? first : 0; i < this.History.Size; i++)
                            this.AddLog(`${i}: ${this.History.Data[i]}\n`);
                    }
                    else {
                        this.AddLog(`Unknown command: '${command_line}'\n`);
                    }
                    // On commad input, we scroll to bottom even if AutoScroll==false
                    this.ScrollToBottom = true;
                }
                // static const TextEditCallbackStub: number(ImGuiInputTextCallbackData* data) // In C++11 you are better off using lambdas for this sort of forwarding callbacks
                static TextEditCallbackStub(data) {
                    // ExampleAppConsole* console = (ExampleAppConsole*)data->UserData;
                    const _console = data.UserData;
                    return _console.TextEditCallback(data);
                }
                // int     TextEditCallback(ImGuiInputTextCallbackData* data)
                TextEditCallback(data) {
                    //AddLog("cursor: %d, selection: %d-%d", data->CursorPos, data->SelectionStart, data->SelectionEnd);
                    switch (data.EventFlag) {
                        case imgui_10.ImGuiInputTextFlags.CallbackCompletion:
                            {
                                // Example of TEXT COMPLETION
                                // Locate beginning of current word
                                // const char* word_end = data->Buf + data->CursorPos;
                                // const char* word_start = word_end;
                                // while (word_start > data->Buf)
                                // {
                                //     const char c = word_start[-1];
                                //     if (c === ' ' || c === '\t' || c === ',' || c === ';')
                                //         break;
                                //     word_start--;
                                // }
                                // // Build a list of candidates
                                // ImVector<const char*> candidates;
                                // for (let i = 0; i < Commands.Size; i++)
                                //     if (Strnicmp(Commands[i], word_start, (int)(word_end-word_start)) === 0)
                                //         candidates.push_back(Commands[i]);
                                // if (candidates.Size === 0)
                                // {
                                //     // No match
                                //     AddLog("No match for \"%.*s\"!\n", (int)(word_end-word_start), word_start);
                                // }
                                // else if (candidates.Size === 1)
                                // {
                                //     // Single match. Delete the beginning of the word and replace it entirely so we've got nice casing
                                //     data->DeleteChars((int)(word_start-data->Buf), (int)(word_end-word_start));
                                //     data->InsertChars(data->CursorPos, candidates[0]);
                                //     data->InsertChars(data->CursorPos, " ");
                                // }
                                // else
                                // {
                                //     // Multiple matches. Complete as much as we can, so inputing "C" will complete to "CL" and display "CLEAR" and "CLASSIFY"
                                //     int match_len = (int)(word_end - word_start);
                                //     for (;;)
                                //     {
                                //         int c = 0;
                                //         bool all_candidates_matches = true;
                                //         for (let i = 0; i < candidates.Size && all_candidates_matches; i++)
                                //             if (i === 0)
                                //                 c = toupper(candidates[i][match_len]);
                                //             else if (c === 0 || c !== toupper(candidates[i][match_len]))
                                //                 all_candidates_matches = false;
                                //         if (!all_candidates_matches)
                                //             break;
                                //         match_len++;
                                //     }
                                //     if (match_len > 0)
                                //     {
                                //         data->DeleteChars((int)(word_start - data->Buf), (int)(word_end-word_start));
                                //         data->InsertChars(data->CursorPos, candidates[0], candidates[0] + match_len);
                                //     }
                                //     // List matches
                                //     AddLog("Possible matches:\n");
                                //     for (let i = 0; i < candidates.Size; i++)
                                //         AddLog("- %s\n", candidates[i]);
                                // }
                                break;
                            }
                        case imgui_10.ImGuiInputTextFlags.CallbackHistory:
                            {
                                // Example of HISTORY
                                // const int prev_history_pos = HistoryPos;
                                // if (data->EventKey === ImGuiKey_UpArrow)
                                // {
                                //     if (HistoryPos === -1)
                                //         HistoryPos = History.Size - 1;
                                //     else if (HistoryPos > 0)
                                //         HistoryPos--;
                                // }
                                // else if (data->EventKey === ImGuiKey_DownArrow)
                                // {
                                //     if (HistoryPos !== -1)
                                //         if (++HistoryPos >= History.Size)
                                //             HistoryPos = -1;
                                // }
                                // // A better implementation would preserve the data on the current input line along with cursor position.
                                // if (prev_history_pos !== HistoryPos)
                                // {
                                //     const char* history_str = (HistoryPos >= 0) ? History[HistoryPos] : "";
                                //     data->DeleteChars(0, data->BufTextLen);
                                //     data->InsertChars(0, history_str);
                                // }
                            }
                    }
                    return 0;
                }
            };
            //-----------------------------------------------------------------------------
            // [SECTION] Example App: Debug Log / ShowExampleAppLog()
            //-----------------------------------------------------------------------------
            // Usage:
            //  static ExampleAppLog my_log;
            //  my_log.AddLog("Hello %d world\n", 123);
            //  my_log.Draw("title");
            ExampleAppLog = class ExampleAppLog {
                constructor() {
                    // ImGuiTextBuffer     Buf;
                    this.Buf = new imgui_25.ImGuiTextBuffer();
                    // ImGuiTextFilter     Filter;
                    this.Filter = new imgui_24.ImGuiTextFilter();
                    // ImVector<int>       LineOffsets;        // Index to lines offset. We maintain this with AddLog() calls, allowing us to have a random access on lines
                    this.LineOffsets = new imgui_18.ImVector();
                    // bool                AutoScroll;
                    this.AutoScroll = true;
                    // bool                ScrollToBottom;
                    this.ScrollToBottom = false;
                }
                // void    Clear()     { Buf.clear(); LineOffsets.clear(); }
                Clear() {
                    this.Buf.clear();
                    this.LineOffsets.clear();
                    this.LineOffsets.push_back(0);
                }
                // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
                AddLog(fmt) {
                    let old_size = this.Buf.size();
                    // va_list args;
                    // va_start(args, fmt);
                    // Buf.appendfv(fmt, args);
                    // va_end(args);
                    this.Buf.append(fmt);
                    for (const new_size = this.Buf.size(); old_size < new_size; old_size++)
                        if (this.Buf.Buf[old_size] === "\n")
                            this.LineOffsets.push_back(old_size + 1);
                    if (this.AutoScroll)
                        this.ScrollToBottom = true;
                }
                Draw(title, p_open) {
                    ImGui.SetNextWindowSize(new imgui_19.ImVec2(500, 400), imgui_7.ImGuiCond.FirstUseEver);
                    if (!ImGui.Begin(title, p_open)) {
                        ImGui.End();
                        return;
                    }
                    // Options menu
                    if (ImGui.BeginPopup("Options")) {
                        if (ImGui.Checkbox("Auto-scroll", (value = this.AutoScroll) => this.AutoScroll = value))
                            if (this.AutoScroll)
                                this.ScrollToBottom = true;
                        ImGui.EndPopup();
                    }
                    // Main window
                    if (ImGui.Button("Options"))
                        ImGui.OpenPopup("Options");
                    ImGui.SameLine();
                    const clear = ImGui.Button("Clear");
                    ImGui.SameLine();
                    const copy = ImGui.Button("Copy");
                    ImGui.SameLine();
                    this.Filter.Draw("Filter", -100.0);
                    ImGui.Separator();
                    ImGui.BeginChild("scrolling", new imgui_19.ImVec2(0, 0), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
                    if (clear)
                        this.Clear();
                    if (copy)
                        ImGui.LogToClipboard();
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_19.ImVec2(0, 0));
                    // const char* buf = Buf.begin();
                    // const char* buf_end = Buf.end();
                    if (this.Filter.IsActive()) {
                        // In this example we don't use the clipper when Filter is enabled.
                        // This is because we don't have a random access on the result on our filter.
                        // A real application processing logs with ten of thousands of entries may want to store the result of search/filter.
                        // especially if the filtering function is not trivial (e.g. reg-exp).
                        // for (int line_no = 0; line_no < LineOffsets.Size; line_no++)
                        // {
                        //     const char* line_start = buf + LineOffsets[line_no];
                        //     const char* line_end = (line_no + 1 < LineOffsets.Size) ? (buf + LineOffsets[line_no + 1] - 1) : buf_end;
                        //     if (Filter.PassFilter(line_start, line_end))
                        //         ImGui.TextUnformatted(line_start, line_end);
                        // }
                    }
                    else {
                        // The simplest and easy way to display the entire buffer:
                        //   ImGui.TextUnformatted(buf_begin, buf_end);
                        // And it'll just work. TextUnformatted() has specialization for large blob of text and will fast-forward to skip non-visible lines.
                        // Here we instead demonstrate using the clipper to only process lines that are within the visible area.
                        // If you have tens of thousands of items and their processing cost is non-negligible, coarse clipping them on your side is recommended.
                        // Using ImGuiListClipper requires A) random access into your data, and B) items all being the  same height,
                        // both of which we can handle since we an array pointing to the beginning of each line of text.
                        // When using the filter (in the block of code above) we don't have random access into the data to display anymore, which is why we don't use the clipper.
                        // Storing or skimming through the search result would make it possible (and would be recommended if you want to search through tens of thousands of entries)
                        // ImGuiListClipper clipper;
                        // clipper.Begin(LineOffsets.Size);
                        // while (clipper.Step())
                        // {
                        //     for (int line_no = clipper.DisplayStart; line_no < clipper.DisplayEnd; line_no++)
                        //     {
                        //         const char* line_start = buf + LineOffsets[line_no];
                        //         const char* line_end = (line_no + 1 < LineOffsets.Size) ? (buf + LineOffsets[line_no + 1] - 1) : buf_end;
                        //         ImGui.TextUnformatted(line_start, line_end);
                        //     }
                        // }
                        // clipper.End();
                    }
                    ImGui.PopStyleVar();
                    if (this.ScrollToBottom)
                        ImGui.SetScrollHereY(1.0);
                    this.ScrollToBottom = false;
                    ImGui.EndChild();
                    ImGui.End();
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLGNBQWM7Ozs7O0lBaUhkLGtCQUFrQjtJQUNsQixrSUFBa0k7SUFDbEksNkJBQTZCO0lBQzdCLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsK0pBQStKO0lBQy9KLHNNQUFzTTtJQUN0TSxnSUFBZ0k7SUFDaEksOEhBQThIO0lBQzlILHdUQUF3VDtJQUN4VCwyQ0FBMkM7SUFDM0MscUlBQXFJO0lBQ3JJLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsNkhBQTZIO0lBQzdILDRJQUE0STtJQUM1SSw2SkFBNko7SUFDN0osbUlBQW1JO0lBQ25JLHNCQUFzQjtJQUN0Qix3S0FBd0s7SUFDeEssU0FBUztJQUNULFNBQVM7SUFFVCxTQUFTLGFBQWEsQ0FBQyxDQUFTLEVBQUUsUUFBZ0IsRUFBRSxFQUFFLE1BQWMsQ0FBQyxFQUFFLFdBQW1CLEdBQUc7UUFDekYsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCxTQUFTLGlCQUFpQixDQUFDLENBQVMsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pFLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxTQUFTLGlCQUFpQixDQUFDLENBQVMsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pFLE9BQU8sYUFBYSxDQUFDLENB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QUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlJLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckksS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDOUksd0lBQXdJO1lBQ3hJLHdJQUF3STtZQUN4SSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyRixLQUFLLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyRixLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBSyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFLLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZ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LENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4SSxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsNEJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4SSxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsNEJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4SSxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBTSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFB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QUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXJCLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXJCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTdCLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsNEVBQTRFO1lBQzdHLEtBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxX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QUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwSCxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwSCxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwSCxLQUFLLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoSSxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqSCxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN4QixLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFF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LEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLGdCQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxnQkFBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7NENBQ2pRLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0Q0FDakIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDOzRDQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRDQUNyRCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRDQUNuSCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENB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