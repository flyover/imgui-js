// dear imgui, v1.66
// (demo code)
System.register(["./imgui"], function (exports_1, context_1) {
    "use strict";
    var ImGui, imgui_1, imgui_2, imgui_3, imgui_4, imgui_5, imgui_6, imgui_7, imgui_8, imgui_9, imgui_10, imgui_11, imgui_12, imgui_13, imgui_14, imgui_15, imgui_16, imgui_17, imgui_18, imgui_19, imgui_20, imgui_21, imgui_22, imgui_23, imgui_24, imgui_25, imgui_26, IM_NEWLINE, Static, _static, done, ExampleAppConsole, ExampleAppLog;
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
    // static void ShowExampleAppMainMenuBar();
    // static void ShowExampleMenuFile();
    function ShowHelpMarker(desc) {
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted(desc);
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    function ShowUserGuide() {
        ImGui.BulletText("Double-click on title bar to collapse window.");
        ImGui.BulletText("Click and drag on lower right corner to resize window\n(double-click to auto fit window to its contents).");
        ImGui.BulletText("Click and drag on any empty space to move window.");
        ImGui.BulletText("TAB/SHIFT+TAB to cycle through keyboard editable fields.");
        ImGui.BulletText("CTRL+Click on a slider or drag box to input value as text.");
        if (ImGui.GetIO().FontAllowUserScaling)
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
    // Demonstrate most Dear ImGui features (this is big function!)
    // You may execute this function to experiment with the UI and understand what it does. You may then search for keywords in the code when you are interested by a specific feature.
    function ShowDemoWindow(p_open = null) {
        done = false;
        // Examples Apps (accessible from the "Examples" menu)
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
            ImGui.Begin("About Dear ImGui", (value = show_app_about.value) => show_app_about.value = value, ImGui.WindowFlags.AlwaysAutoResize);
            ImGui.Text(`Dear ImGui, ${ImGui.GetVersion()}`);
            ImGui.Separator();
            ImGui.Text("By Omar Cornut and all dear imgui contributors.");
            ImGui.Text("Dear ImGui is licensed under the MIT License, see LICENSE for more information.");
            ImGui.End();
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
        ImGui.SetNextWindowPos(new imgui_18.ImVec2(650, 20), ImGui.Cond.FirstUseEver);
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(550, 680), imgui_7.ImGuiCond.FirstUseEver);
        // Main body of the Demo window starts here.
        if (!ImGui.Begin("ImGui Demo", p_open, window_flags)) {
            // Early out if the window is collapsed, as an optimization.
            ImGui.End();
            return done;
        }
        ImGui.Text(`dear imgui says hello. (${imgui_1.IMGUI_VERSION})`);
        // Most "big" widgets share a common width settings by default.
        //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // Use 2/3 of the space for widgets and 1/3 for labels (default)
        ImGui.PushItemWidth(ImGui.GetFontSize() * -12); // Use fixed width for labels (by passing a negative value), the rest goes to widgets. We choose a width proportional to our font size.
        // Menu
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
                ShowHelpMarker("Required back-end to feed in gamepad inputs in io.NavInputs[] and set io.BackendFlags |= ImGuiBackendFlags_HasGamepad.\n\nRead instructions in imgui.cpp for details.");
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableSetMousePos);
                ImGui.SameLine();
                ShowHelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGuiConfigFlags_NavEnableSetMousePos.");
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
                ShowHelpMarker("Instruct back-end to not alter mouse cursor shape and visibility.");
                ImGui.Checkbox("io.ConfigInputTextCursorBlink", (value = io.ConfigInputTextCursorBlink) => io.ConfigInputTextCursorBlink = value);
                ImGui.SameLine();
                ShowHelpMarker("Set to false to disable blinking cursor, for users who consider it distracting");
                ImGui.Checkbox("io.ConfigResizeWindowsFromEdges [beta]", (value = io.ConfigResizeWindowsFromEdges) => io.ConfigResizeWindowsFromEdges = value);
                ImGui.SameLine();
                ShowHelpMarker("Enable resizing of windows from their edges and from the lower-left corner.\nThis requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback.");
                ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
                ImGui.SameLine();
                ShowHelpMarker("Instruct Dear ImGui to render a mouse cursor for you. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
                ImGui.TreePop();
                ImGui.Separator();
            }
            if (ImGui.TreeNode("Backend Flags")) {
                let backend_flags = io.BackendFlags; // Make a local copy to avoid modifying the back-end flags.
                ImGui.CheckboxFlags("io.BackendFlags: HasGamepad", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasGamepad);
                ImGui.CheckboxFlags("io.BackendFlags: HasMouseCursors", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasMouseCursors);
                ImGui.CheckboxFlags("io.BackendFlags: HasSetMousePos", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasSetMousePos);
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
                ShowHelpMarker("Try opening any of the contents below in this window and then click one of the \"Log To\" button.");
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
                ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_21.ImColor.HSV(i / 7.0, 0.6, 0.6));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_21.ImColor.HSV(i / 7.0, 0.7, 0.7));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_21.ImColor.HSV(i / 7.0, 0.8, 0.8));
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
            if (ImGui.ArrowButton("##left", imgui_26.ImGuiDir.Left)) {
                counter.value--;
            }
            ImGui.SameLine(0.0, spacing);
            if (ImGui.ArrowButton("##right", imgui_26.ImGuiDir.Right)) {
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
                ShowHelpMarker("USER:\nHold SHIFT or use mouse to select text.\nCTRL+Left/Right to word jump.\nCTRL+A or double-click to select all.\nCTRL+X,CTRL+C,CTRL+V clipboard.\nCTRL+Z,CTRL+Y undo/redo.\nESCAPE to revert.\n\nPROGRAMMER:\nYou can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputText() to a dynamic string type. See misc/stl/imgui_stl.h for an example (this is not demonstrated in imgui_demo.cpp).");
            }
            {
                /* static */ const str0 = STATIC("str0", new imgui_4.ImStringBuffer(128, "Hello, world!"));
                /* static */ const i0 = STATIC("i0", 123);
                ImGui.InputText("input text", str0.value, imgui_3.IM_ARRAYSIZE(str0.value));
                ImGui.SameLine();
                ShowHelpMarker("USER:\nHold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n\nPROGRAMMER:\nYou can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputText() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example (this is not demonstrated in imgui_demo.cpp).");
                ImGui.InputInt("input int", (value = i0.value) => i0.value = value);
                ImGui.SameLine();
                ShowHelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\nUse +- to subtract.\n");
                /* static */ const f0 = STATIC("f0#400", 0.001);
                ImGui.InputFloat("input float", (value = f0.value) => f0.value = value, 0.01, 1.0);
                // NB: You can use the %e notation as well.
                /* static */ const d0 = STATIC("d0", 999999.000001);
                ImGui.InputDouble("input double", (value = d0.value) => d0.value = value, 0.01, 1.0, "%.8f");
                // static float f1 = 1.e10f;
                /* static */ const f1 = STATIC("f1#403", 1.e10);
                ImGui.InputFloat("input scientific", (value = f1.value) => f1.value = value, 0.0, 0.0, "%e");
                ImGui.SameLine();
                ShowHelpMarker("You can input value using the scientific notation,\n  e.g. \"1e+8\" becomes \"100000000\".\n");
                /* static */ const vec4a = STATIC("vec4a", [0.10, 0.20, 0.30, 0.44]);
                ImGui.InputFloat3("input float3", vec4a.value);
            }
            {
                /* static */ const i1 = STATIC("i1#415", 50), i2 = STATIC("i2#415", 42);
                ImGui.DragInt("drag int", (value = i1.value) => i1.value = value, 1);
                ImGui.SameLine();
                ShowHelpMarker("Click and drag to edit value.\nHold SHIFT/ALT for faster/slower edit.\nDouble-click or CTRL+click to input value.");
                ImGui.DragInt("drag int 0..100", (value = i2.value) => i2.value = value, 1, 0, 100, "%d%%");
                /* static */ const f1 = STATIC("f1#421", 1.00), f2 = STATIC("f2#421", 0.0067);
                ImGui.DragFloat("drag float", (value = f1.value) => f1.value = value, 0.005);
                ImGui.DragFloat("drag small float", (value = f2.value) => f2.value = value, 0.0001, 0.0, 0.0, "%.06f ns");
            }
            {
                /* static */ const i1 = STATIC("i1#427", 0);
                ImGui.SliderInt("slider int", (value = i1.value) => i1.value = value, -1, 3);
                ImGui.SameLine();
                ShowHelpMarker("CTRL+click to input value.");
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
                ShowHelpMarker("Click on the colored square to open a color picker.\nClick and hold to use drag and drop.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");
                ImGui.ColorEdit4("color 2", col2.value);
            }
            {
                // List box
                const listbox_items = ["Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"];
                /* static */ const listbox_item_current = STATIC("listbox_item_current", 1);
                ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, imgui_3.IM_ARRAYSIZE(listbox_items), 4);
                // /* static */ const listbox_item_current2: Static<number> = STATIC("listbox_item_current2", 2);
                // ImGui.PushItemWidth(-1);
                // ImGui.ListBox("##listbox2", (value = listbox_item_current2.value) => listbox_item_current2.value = value, listbox_items, IM_ARRAYSIZE(listbox_items), 4);
                // ImGui.PopItemWidth();
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
                for (let i = 0; i < 5; i++)
                    if (ImGui.TreeNode(i.toString(), `Child ${i}`)) {
                        ImGui.Text("blah blah");
                        ImGui.SameLine();
                        if (ImGui.SmallButton("button")) { }
                        ImGui.TreePop();
                    }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Advanced, with Selectable nodes")) {
                ShowHelpMarker("This is a more standard looking tree with selectable nodes.\nClick to select, CTRL+Click to toggle, click on arrows or double-click to open.");
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
                    let node_flags = imgui_14.ImGuiTreeNodeFlags.OpenOnArrow | imgui_14.ImGuiTreeNodeFlags.OpenOnDoubleClick | ((selection_mask.value & (1 << i)) ? imgui_14.ImGuiTreeNodeFlags.Selected : 0);
                    if (i < 3) {
                        // Node
                        const node_open = ImGui.TreeNodeEx(i, node_flags, `Selectable Node ${i}`);
                        if (ImGui.IsItemClicked())
                            node_clicked = i;
                        if (node_open) {
                            ImGui.Text("Blah blah\nBlah Blah");
                            ImGui.TreePop();
                        }
                    }
                    else {
                        // Leaf: The only reason we have a TreeNode at all is to allow selection of the leaf. Otherwise we can use BulletText() or TreeAdvanceToLabelPos()+Text().
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
            ImGui.Checkbox("Enable extra group", (value = closable_group.value) => closable_group.value = value);
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
                ImGui.TextColored(new imgui_19.ImVec4(1.0, 0.0, 1.0, 1.0), "Pink");
                ImGui.TextColored(new imgui_19.ImVec4(1.0, 1.0, 0.0, 1.0), "Yellow");
                ImGui.TextDisabled("Disabled");
                ImGui.SameLine();
                ShowHelpMarker("The TextDisabled color is stored in ImGuiStyle.");
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
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_18.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_18.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_20.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_20.IM_COL32(255, 255, 0, 255));
                ImGui.PopTextWrapPos();
                ImGui.Text("Test paragraph 2:");
                pos = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_18.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_18.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_20.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_20.IM_COL32(255, 255, 0, 255));
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
            ImGui.Image(my_tex_id, new imgui_18.ImVec2(my_tex_w, my_tex_h), new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(1, 1), new imgui_19.ImVec4(1.0, 1.0, 1.0, 1.0), new imgui_19.ImVec4(1.0, 1.0, 1.0, 0.5));
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
                const uv0 = new imgui_18.ImVec2((region_x) / my_tex_w, (region_y) / my_tex_h);
                const uv1 = new imgui_18.ImVec2((region_x + region_sz) / my_tex_w, (region_y + region_sz) / my_tex_h);
                ImGui.Image(my_tex_id, new imgui_18.ImVec2(region_sz * zoom, region_sz * zoom), uv0, uv1, new imgui_21.ImColor(255, 255, 255, 255).toImVec4(), new imgui_21.ImColor(255, 255, 255, 128).toImVec4());
                ImGui.EndTooltip();
            }
            ImGui.TextWrapped("And now some textured buttons..");
            /* static */ const pressed_count = STATIC("pressed_count", 0);
            for (let i = 0; i < 8; i++) {
                ImGui.PushID(i);
                const frame_padding = -1 + i; // -1 = uses default padding
                if (ImGui.ImageButton(my_tex_id, new imgui_18.ImVec2(32, 32), new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(32.0 / my_tex_w, 32 / my_tex_h), frame_padding, new imgui_19.ImVec4(0, 0, 0, 1)))
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
                    // bool is_selected = (item_current == items[n]);
                    const is_selected = (item_current.value === items[n]);
                    // if (ImGui::Selectable(items[n], is_selected))
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
                ShowHelpMarker("Hold CTRL and click to select multiple items.");
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
                for (let i = 0; i < 16; i++) {
                    ImGui.PushID(i);
                    if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new imgui_18.ImVec2(50, 50))) {
                        const x = i % 4, y = i / 4;
                        if (x > 0)
                            selected.value[i - 1] = !selected.value[i - 1];
                        if (x < 3)
                            selected.value[i + 1] = !selected.value[i + 1];
                        if (y > 0)
                            selected.value[i - 4] = !selected.value[i - 4];
                        if (y < 3)
                            selected.value[i + 4] = !selected.value[i + 4];
                    }
                    if ((i % 4) < 3)
                        ImGui.SameLine();
                    ImGui.PopID();
                }
                ImGui.TreePop();
            }
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
            ShowHelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
            ImGui.InputText("password (clear)", bufpass.value, imgui_3.IM_ARRAYSIZE(bufpass.value), imgui_10.ImGuiInputTextFlags.CharsNoBlank);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Multi-line Text Input")) {
            /* static */ const read_only = STATIC("read_only", false);
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
            ShowHelpMarker("You can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputTextMultiline() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example. (This is not demonstrated in imgui_demo.cpp)");
            ImGui.Checkbox("Read-only", (value = read_only.value) => read_only.value = value);
            const flags = imgui_10.ImGuiInputTextFlags.AllowTabInput | (read_only.value ? imgui_10.ImGuiInputTextFlags.ReadOnly : 0);
            ImGui.InputTextMultiline("##source", text.value, imgui_3.IM_ARRAYSIZE(text.value), new imgui_18.ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), flags);
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
            ImGui.PlotLines("Lines", values.value, imgui_3.IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new imgui_18.ImVec2(0, 80));
            ImGui.PlotHistogram("Histogram", arr.value, imgui_3.IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new imgui_18.ImVec2(0, 80));
            // Use functions to generate output
            // FIXME: This is rather awkward because current plot API only pass in indices. We probably want an API passing floats and user provide sample rate/count.
            class Funcs {
                static Sin(data, i) { return Math.sin(i * 0.1); }
                static Saw(data, i) { return (i & 1) ? 1.0 : -1.0; }
            }
            /* static */ const func_type = STATIC("func_type", 0), display_count = STATIC("display_count", 70);
            ImGui.Separator();
            ImGui.PushItemWidth(100);
            ImGui.Combo("func", (value = func_type.value) => func_type.value = value, "Sin\0Saw\0");
            ImGui.PopItemWidth();
            ImGui.SameLine();
            ImGui.SliderInt("Sample count", (value = display_count.value) => display_count.value = value, 1, 400);
            const func = (func_type.value === 0) ? Funcs.Sin : Funcs.Saw;
            ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_18.ImVec2(0, 80));
            ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_18.ImVec2(0, 80));
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
            ImGui.ProgressBar(progress.value, new imgui_18.ImVec2(0.0, 0.0));
            ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
            ImGui.Text("Progress Bar");
            const progress_saturated = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
            const buf = `${(progress_saturated * 1753).toFixed(0)}/${1753}`;
            ImGui.ProgressBar(progress.value, new imgui_18.ImVec2(0., 0.), buf);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Color/Picker Widgets")) {
            /* static */ const color = STATIC("color#863", new imgui_21.ImColor(114, 144, 154, 200).toImVec4());
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
            ShowHelpMarker("Right-click on the individual color widget to show options.");
            ImGui.Checkbox("With HDR", (value = hdr.value) => hdr.value = value);
            ImGui.SameLine();
            ShowHelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
            const misc_flags = (hdr.value ? imgui_6.ImGuiColorEditFlags.HDR : 0) | (drag_and_drop.value ? 0 : imgui_6.ImGuiColorEditFlags.NoDragDrop) | (alpha_half_preview.value ? imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf : (alpha_preview.value ? imgui_6.ImGuiColorEditFlags.AlphaPreview : 0)) | (options_menu.value ? 0 : imgui_6.ImGuiColorEditFlags.NoOptions);
            ImGui.Text("Color widget:");
            ImGui.SameLine();
            ShowHelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
            ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);
            ImGui.Text("Color widget HSV with Alpha:");
            ImGui.ColorEdit4("MyColor##2", color.value, imgui_6.ImGuiColorEditFlags.HSV | misc_flags);
            ImGui.Text("Color widget with Float Display:");
            ImGui.ColorEdit4("MyColor##2f", color.value, imgui_6.ImGuiColorEditFlags.Float | misc_flags);
            ImGui.Text("Color button with Picker:");
            ImGui.SameLine();
            ShowHelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
            ImGui.ColorEdit4("MyColor##3", color.value, imgui_6.ImGuiColorEditFlags.NoInputs | imgui_6.ImGuiColorEditFlags.NoLabel | misc_flags);
            ImGui.Text("Color button with Custom Picker Popup:");
            // Generate a dummy palette
            /* static */ const saved_palette_inited = STATIC("saved_palette_inited", false);
            /* static */ const saved_palette = STATIC("saved_palette", []);
            if (!saved_palette_inited.value)
                for (let n = 0; n < 32; n++) {
                    saved_palette.value[n] = new imgui_19.ImVec4();
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
            saved_palette_inited.value = true;
            /* static */ const backup_color = STATIC("backup_color", new imgui_19.ImVec4());
            let open_popup = ImGui.ColorButton("MyColor##3b", color.value, misc_flags);
            ImGui.SameLine();
            open_popup = open_popup || ImGui.Button("Palette");
            if (open_popup) {
                ImGui.OpenPopup("mypicker");
                backup_color.value.Copy(color.value);
            }
            if (ImGui.BeginPopup("mypicker")) {
                // FIXME: Adding a drag and drop example here would be perfect!
                ImGui.Text("MY CUSTOM COLOR PICKER WITH AN AMAZING PALETTE!");
                ImGui.Separator();
                ImGui.ColorPicker4("##picker", color.value, misc_flags | imgui_6.ImGuiColorEditFlags.NoSidePreview | imgui_6.ImGuiColorEditFlags.NoSmallPreview);
                ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text("Current");
                ImGui.ColorButton("##current", color.value, imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_18.ImVec2(60, 40));
                ImGui.Text("Previous");
                if (ImGui.ColorButton("##previous", backup_color.value, imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_18.ImVec2(60, 40)))
                    color.value.Copy(backup_color.value);
                ImGui.Separator();
                ImGui.Text("Palette");
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(saved_palette.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 8) !== 0)
                        ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                    if (ImGui.ColorButton("##palette", saved_palette.value[n], imgui_6.ImGuiColorEditFlags.NoAlpha | imgui_6.ImGuiColorEditFlags.NoPicker | imgui_6.ImGuiColorEditFlags.NoTooltip, new imgui_18.ImVec2(20, 20)))
                        color.value.Copy(new imgui_19.ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!
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
            ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new imgui_18.ImVec2(80, 80));
            ImGui.Text("Color picker:");
            /* static */ const alpha = STATIC("alpha", true);
            /* static */ const alpha_bar = STATIC("alpha_bar", true);
            /* static */ const side_preview = STATIC("side_preview", true);
            /* static */ const ref_color = STATIC("ref_color", false);
            /* static */ const ref_color_v = STATIC("ref_color_v", new imgui_19.ImVec4(1.0, 0.0, 1.0, 0.5));
            /* static */ const inputs_mode = STATIC("inputs_mode", 2);
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
            ImGui.Combo("Inputs Mode", (value = inputs_mode.value) => inputs_mode.value = value, "All Inputs\0No Inputs\0RGB Input\0HSV Input\0HEX Input\0");
            ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
            ImGui.SameLine();
            ShowHelpMarker("User can right-click the picker to change mode.");
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
            if (inputs_mode.value === 1)
                flags |= imgui_6.ImGuiColorEditFlags.NoInputs;
            if (inputs_mode.value === 2)
                flags |= imgui_6.ImGuiColorEditFlags.RGB;
            if (inputs_mode.value === 3)
                flags |= imgui_6.ImGuiColorEditFlags.HSV;
            if (inputs_mode.value === 4)
                flags |= imgui_6.ImGuiColorEditFlags.HEX;
            ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);
            ImGui.Text("Programmatically set defaults:");
            ImGui.SameLine();
            ShowHelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
            if (ImGui.Button("Default: Uint8 + HSV + Hue Bar"))
                ImGui.SetColorEditOptions(imgui_6.ImGuiColorEditFlags.Uint8 | imgui_6.ImGuiColorEditFlags.HSV | imgui_6.ImGuiColorEditFlags.PickerHueBar);
            if (ImGui.Button("Default: Float + HDR + Hue Wheel"))
                ImGui.SetColorEditOptions(imgui_6.ImGuiColorEditFlags.Float | imgui_6.ImGuiColorEditFlags.RGB | imgui_6.ImGuiColorEditFlags.PickerHueWheel);
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
            const s32_zero = 0, s32_one = 1, s32_fifty = 50, s32_min = INT_MIN / 2, s32_max = INT_MAX / 2, s32_hi_a = INT_MAX / 2 - 100, s32_hi_b = INT_MAX / 2;
            const u32_zero = 0, u32_one = 1, u32_fifty = 50, u32_min = 0, u32_max = UINT_MAX / 2, u32_hi_a = UINT_MAX / 2 - 100, u32_hi_b = UINT_MAX / 2;
            // const s64_zero = 0,   s64_one = 1,   s64_fifty = 50, s64_min = LLONG_MIN / 2, s64_max = LLONG_MAX / 2,  s64_hi_a = LLONG_MAX / 2 - 100,  s64_hi_b = LLONG_MAX / 2;
            // const u64_zero = 0,   u64_one = 1,   u64_fifty = 50, u64_min = 0,             u64_max = ULLONG_MAX / 2, u64_hi_a = ULLONG_MAX / 2 - 100, u64_hi_b = ULLONG_MAX / 2;
            const f32_zero = 0.0, f32_one = 1.0, f32_lo_a = -10000000000.0, f32_hi_a = +10000000000.0;
            const f64_zero = 0.0, f64_one = 1.0, f64_lo_a = -1000000000000000.0, f64_hi_a = +1000000000000000.0;
            // State
            // static ImS32  s32_v = -1;
            // static ImU32  u32_v = (ImU32)-1;
            // static ImS64  s64_v = -1;
            // static ImU64  u64_v = (ImU64)-1;
            // static float  f32_v = 0.123f;
            // static double f64_v = 90000.01234567890123456789;
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
            ShowHelpMarker("As with every widgets in dear imgui, we never modify values unless there is a user interaction.\nYou can override the clamping limits by using CTRL+Click to input a value.");
            // ImGui.DragScalar("drag s32",       ImGuiDataType_S32,    &s32_v, drag_speed, drag_clamp.value ? &s32_zero : null, drag_clamp.value ? &s32_fifty : null);
            // ImGui.DragScalar("drag u32",       ImGuiDataType_U32,    &u32_v, drag_speed, drag_clamp.value ? &u32_zero : null, drag_clamp.value ? &u32_fifty : null, "%u ms");
            // ImGui.DragScalar("drag s64",       ImGuiDataType_S64,    &s64_v, drag_speed, drag_clamp.value ? &s64_zero : null, drag_clamp.value ? &s64_fifty : null);
            // ImGui.DragScalar("drag u64",       ImGuiDataType_U64,    &u64_v, drag_speed, drag_clamp.value ? &u64_zero : null, drag_clamp.value ? &u64_fifty : null);
            // ImGui.DragScalar("drag float",     ImGuiDataType_Float,  &f32_v, 0.005f,  &f32_zero, &f32_one, "%f", 1.0f);
            // ImGui.DragScalar("drag float ^2",  ImGuiDataType_Float,  &f32_v, 0.005f,  &f32_zero, &f32_one, "%f", 2.0f); ImGui.SameLine(); ShowHelpMarker("You can use the 'power' parameter to increase tweaking precision on one side of the range.");
            // ImGui.DragScalar("drag double",    ImGuiDataType_Double, &f64_v, 0.0005f, &f64_zero, null,     "%.10f grams", 1.0f);
            // ImGui.DragScalar("drag double ^2", ImGuiDataType_Double, &f64_v, 0.0005f, &f64_zero, &f64_one, "0 < %.10f < 1", 2.0f);
            ImGui.DragScalar("drag s32", s32_v.value, drag_speed, drag_clamp.value ? s32_zero : null, drag_clamp.value ? s32_fifty : null);
            ImGui.DragScalar("drag u32", u32_v.value, drag_speed, drag_clamp.value ? u32_zero : null, drag_clamp.value ? u32_fifty : null, "%u ms");
            // ImGui.DragScalar("drag s64",       s64_v.value, drag_speed, drag_clamp.value ? s64_zero : null, drag_clamp.value ? s64_fifty : null);
            // ImGui.DragScalar("drag u64",       u64_v.value, drag_speed, drag_clamp.value ? u64_zero : null, drag_clamp.value ? u64_fifty : null);
            ImGui.DragScalar("drag float", f32_v.value, 0.005, f32_zero, f32_one, "%f", 1.0);
            ImGui.DragScalar("drag float ^2", f32_v.value, 0.005, f32_zero, f32_one, "%f", 2.0);
            ImGui.DragScalar("drag double", f64_v.value, 0.0005, f64_zero, null, "%.10f grams", 1.0);
            ImGui.DragScalar("drag double ^2", f64_v.value, 0.0005, f64_zero, f64_one, "0 < %.10f < 1", 2.0);
            ImGui.Text("Sliders");
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
            // ImGui.InputScalar("input s32",     ImGuiDataType_S32,    &s32_v, inputs_step ? &s32_one : NULL, NULL, "%d");
            // ImGui.InputScalar("input s32 hex", ImGuiDataType_S32,    &s32_v, inputs_step ? &s32_one : NULL, NULL, "%08X", ImGuiInputTextFlags_CharsHexadecimal);
            // ImGui.InputScalar("input u32",     ImGuiDataType_U32,    &u32_v, inputs_step ? &u32_one : NULL, NULL, "%u");
            // ImGui.InputScalar("input u32 hex", ImGuiDataType_U32,    &u32_v, inputs_step ? &u32_one : NULL, NULL, "%08X", ImGuiInputTextFlags_CharsHexadecimal);
            // ImGui.InputScalar("input s64",     ImGuiDataType_S64,    &s64_v, inputs_step ? &s64_one : NULL);
            // ImGui.InputScalar("input u64",     ImGuiDataType_U64,    &u64_v, inputs_step ? &u64_one : NULL);
            // ImGui.InputScalar("input float",   ImGuiDataType_Float,  &f32_v, inputs_step ? &f32_one : NULL);
            // ImGui.InputScalar("input double",  ImGuiDataType_Double, &f64_v, inputs_step ? &f64_one : NULL);
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
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_18.ImVec2(spacing, spacing));
            /* static */ const int_value = STATIC("int_value", 0);
            ImGui.VSliderInt("##int", new imgui_18.ImVec2(18, 160), (value = int_value.value) => int_value.value = value, 0, 5);
            ImGui.SameLine();
            /* static */ const values = STATIC("values#1072", [0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0]);
            ImGui.PushID("set1");
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBg, imgui_21.ImColor.HSV(i / 7.0, 0.5, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgHovered, imgui_21.ImColor.HSV(i / 7.0, 0.6, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgActive, imgui_21.ImColor.HSV(i / 7.0, 0.7, 0.5));
                ImGui.PushStyleColor(imgui_5.ImGuiCol.SliderGrab, imgui_21.ImColor.HSV(i / 7.0, 0.9, 0.9));
                ImGui.VSliderFloat("##v", new imgui_18.ImVec2(18, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
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
            const small_slider_size = new imgui_18.ImVec2(18, (160.0 - (rows - 1) * spacing) / rows);
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
                ImGui.VSliderFloat("##v", new imgui_18.ImVec2(40, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
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
                // static int mode = 0;
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
                // static const char* names[9] = { "Bobby", "Beatrice", "Betty", "Brianna", "Barry", "Bernard", "Bibi", "Blaine", "Bryn" };
                /* static */ const names = STATIC("names", ["Bobby", "Beatrice", "Betty", "Brianna", "Barry", "Bernard", "Bibi", "Blaine", "Bryn"]);
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(names.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 3) != 0)
                        ImGui.SameLine();
                    ImGui.Button(names.value[n], new imgui_18.ImVec2(60, 60));
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
            ImGui.RadioButton("CheckBox", (value = item_type.value) => item_type.value = value, 2);
            ImGui.RadioButton("SliderFloat", (value = item_type.value) => item_type.value = value, 3);
            ImGui.RadioButton("ColorEdit4", (value = item_type.value) => item_type.value = value, 4);
            ImGui.RadioButton("ListBox", (value = item_type.value) => item_type.value = value, 5);
            ImGui.Separator();
            let ret = false;
            if (item_type.value === 0) {
                ImGui.Text("ITEM: Text");
            } // Testing text items with no identifier/interaction
            if (item_type.value === 1) {
                ret = ImGui.Button("ITEM: Button");
            } // Testing button
            if (item_type.value === 2) {
                ret = ImGui.Checkbox("ITEM: CheckBox", (value = b.value) => b.value = value);
            } // Testing checkbox
            if (item_type.value === 3) {
                ret = ImGui.SliderFloat("ITEM: SliderFloat", (value = col4f.value[0]) => col4f.value[0] = value, 0.0, 1.0);
            } // Testing basic item
            if (item_type.value === 4) {
                ret = ImGui.ColorEdit4("ITEM: ColorEdit4", col4f.value);
            } // Testing multi-component items (IsItemXXX flags are reported merged)
            if (item_type.value === 5) {
                const items = ["Apple", "Banana", "Cherry", "Kiwi"]; /* static */
                const current = STATIC("current", 1);
                ret = ImGui.ListBox("ITEM: ListBox", (value = current.value) => current.value = value, items, imgui_3.IM_ARRAYSIZE(items), imgui_3.IM_ARRAYSIZE(items));
            }
            ImGui.Button("ITEM");
            ImGui.BulletText(`Return value = ${ret}\n` +
                `IsItemFocused() = ${ImGui.IsItemFocused()}\n` +
                `IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.AllowWhenOverlapped)}\n` +
                `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(imgui_9.ImGuiHoveredFlags.RectOnly)}\n` +
                `IsItemActive() = ${ImGui.IsItemActive()}\n` +
                `IsItemEdited() = ${ImGui.IsItemEdited()}\n` +
                `IsItemDeactivated() = ${ImGui.IsItemDeactivated()}\n` +
                `IsItemDeactivatedEdit() = ${ImGui.IsItemDeactivatedAfterEdit()}\n` +
                `IsItemVisible() = ${ImGui.IsItemVisible()}\n` +
                `GetItemRectMin() = (${ImGui.GetItemRectMin().x.toFixed(1)}, ${ImGui.GetItemRectMin().y.toFixed(1)})\n` +
                `GetItemRectMax() = (${ImGui.GetItemRectMax().x.toFixed(1)}, ${ImGui.GetItemRectMax().y.toFixed(1)})\n` +
                `GetItemRectSize() = (${ImGui.GetItemRectSize().x.toFixed(1)}, ${ImGui.GetItemRectSize().y.toFixed(1)})`);
            /* static */ const embed_all_inside_a_child_window = STATIC("embed_all_inside_a_child_window", false);
            ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
            if (embed_all_inside_a_child_window.value)
                ImGui.BeginChild("outer_child", new imgui_18.ImVec2(0, ImGui.GetFontSize() * 20), true);
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
                `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.RootWindow)}\n` +
                `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(imgui_9.ImGuiHoveredFlags.AnyWindow)}\n`);
            ImGui.BeginChild("child", new imgui_18.ImVec2(0, 50), true);
            ImGui.Text("This is another child window for testing _ChildWindows flags.");
            ImGui.EndChild();
            if (embed_all_inside_a_child_window.value)
                ImGui.EndChild();
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
        if (ImGui.TreeNode("Child regions")) {
            /* static */ const disable_mouse_wheel = STATIC("disable_mouse_wheel", false);
            /* static */ const disable_menu = STATIC("disable_menu", false);
            ImGui.Checkbox("Disable Mouse Wheel", (value = disable_mouse_wheel.value) => disable_mouse_wheel.value = value);
            ImGui.Checkbox("Disable Menu", (value = disable_menu.value) => disable_menu.value = value);
            /* static */ const line = STATIC("line", 50);
            let goto_line = ImGui.Button("Goto");
            ImGui.SameLine();
            ImGui.PushItemWidth(100);
            goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, imgui_10.ImGuiInputTextFlags.EnterReturnsTrue) || goto_line;
            ImGui.PopItemWidth();
            // Child 1: no border, enable horizontal scrollbar
            {
                ImGui.BeginChild("Child1", new imgui_18.ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5, 300), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar | (disable_mouse_wheel.value ? imgui_15.ImGuiWindowFlags.NoScrollWithMouse : 0));
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
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ChildRounding, 5.0);
                ImGui.BeginChild("Child2", new imgui_18.ImVec2(0, 300), true, (disable_mouse_wheel.value ? imgui_15.ImGuiWindowFlags.NoScrollWithMouse : 0) | (disable_menu.value ? 0 : imgui_15.ImGuiWindowFlags.MenuBar));
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
                    ImGui.Button(buf, new imgui_18.ImVec2(-1.0, 0.0));
                    ImGui.NextColumn();
                }
                ImGui.EndChild();
                ImGui.PopStyleVar();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Widgets Width")) {
            /* static */ const f = STATIC("f#1181", 0.0);
            ImGui.Text("PushItemWidth(100)");
            ImGui.SameLine();
            ShowHelpMarker("Fixed width.");
            ImGui.PushItemWidth(100);
            ImGui.DragFloat("float##1", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.Text("PushItemWidth(GetWindowWidth() * 0.5)");
            ImGui.SameLine();
            ShowHelpMarker("Half of window width.");
            ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.5);
            ImGui.DragFloat("float##2", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.Text("PushItemWidth(GetContentRegionAvailWidth() * 0.5)");
            ImGui.SameLine();
            ShowHelpMarker("Half of available width.\n(~ right-cursor_pos)\n(works within a column set)");
            ImGui.PushItemWidth(ImGui.GetContentRegionAvailWidth() * 0.5);
            ImGui.DragFloat("float##3", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.Text("PushItemWidth(-100)");
            ImGui.SameLine();
            ShowHelpMarker("Align to right edge minus 100");
            ImGui.PushItemWidth(-100);
            ImGui.DragFloat("float##4", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.Text("PushItemWidth(-1)");
            ImGui.SameLine();
            ShowHelpMarker("Align to right edge");
            ImGui.PushItemWidth(-1);
            ImGui.DragFloat("float##5", (value = f.value) => f.value = value);
            ImGui.PopItemWidth();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Basic Horizontal Layout")) {
            ImGui.TextWrapped("(Use ImGui.SameLine() to keep adding items to the right of the preceding item)");
            // Text
            ImGui.Text("Two items: Hello");
            ImGui.SameLine();
            ImGui.TextColored(new imgui_19.ImVec4(1, 1, 0, 1), "Sailor");
            // Adjust spacing
            ImGui.Text("More spacing: Hello");
            ImGui.SameLine(0, 20);
            ImGui.TextColored(new imgui_19.ImVec4(1, 1, 0, 1), "Sailor");
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
            const button_sz = new imgui_18.ImVec2(40, 40);
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
        if (ImGui.TreeNode("Groups")) {
            ImGui.TextWrapped("(Using ImGui.BeginGroup()/EndGroup() to layout items. BeginGroup() basically locks the horizontal position. EndGroup() bundles the whole group so that you can use functions such as IsItemHovered() on it.)");
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
            ImGui.Button("ACTION", new imgui_18.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.SameLine();
            ImGui.Button("REACTION", new imgui_18.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
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
            ImGui.TextWrapped("(This is testing the vertical alignment that occurs on text to keep it at the same baseline as widgets. Lines only composed of text or \"small\" widgets fit in less vertical spaces than lines with normal widgets)");
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
            ImGui.TextWrapped("(Use SetScrollHereY() or SetScrollFromPosY() to scroll to a given position.)");
            /* static */ const track = STATIC("track", true);
            /* static */ const track_line = STATIC("track_line", 50), scroll_to_px = STATIC("scroll_to_px", 200);
            ImGui.Checkbox("Track", (value = track.value) => track.value = value);
            ImGui.PushItemWidth(100);
            ImGui.SameLine(130);
            track.value = ImGui.DragInt("##line", (value = track_line.value) => track_line.value = value, 0.25, 0, 99, "Line = %d") || track.value;
            let scroll_to = ImGui.Button("Scroll To Pos");
            ImGui.SameLine(130);
            scroll_to = ImGui.DragInt("##pos_y", (value = scroll_to_px.value) => scroll_to_px.value = value, 1.00, 0, 9999, "Y = %d px") || scroll_to;
            ImGui.PopItemWidth();
            if (scroll_to)
                track.value = false;
            for (let i = 0; i < 5; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text(i === 0 ? "Top" : i === 1 ? "25%" : i === 2 ? "Center" : i === 3 ? "75%" : "Bottom");
                ImGui.BeginChild(ImGui.GetID(i), new imgui_18.ImVec2(ImGui.GetWindowWidth() * 0.17, 200.0), true);
                if (scroll_to)
                    ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_px.value, i * 0.25);
                for (let line = 0; line < 100; line++) {
                    if (track.value && line === track_line.value) {
                        ImGui.TextColored(new imgui_19.ImVec4(1, 1, 0, 1), `Line ${line}`);
                        ImGui.SetScrollHereY(i * 0.25); // 0.0:top, 0.5f:center, 1.0f:bottom
                    }
                    else {
                        ImGui.Text(`Line ${line}`);
                    }
                }
                const scroll_y = ImGui.GetScrollY(), scroll_max_y = ImGui.GetScrollMaxY();
                ImGui.EndChild();
                ImGui.Text(`${scroll_y.toFixed(0)}/${scroll_max_y.toFixed(0)}`);
                ImGui.EndGroup();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Horizontal Scrolling")) {
            ImGui.Bullet();
            ImGui.TextWrapped("Horizontal scrolling for a window has to be enabled explicitly via the ImGuiWindowFlags.HorizontalScrollbar flag.");
            ImGui.Bullet();
            ImGui.TextWrapped("You may want to explicitly specify content width by calling SetNextWindowContentWidth() before Begin().");
            /* static */ const lines = STATIC("lines#1432", 7);
            ImGui.SliderInt("Lines", (value = lines.value) => lines.value = value, 1, 15);
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FrameRounding, 3.0);
            ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_18.ImVec2(2.0, 1.0));
            ImGui.BeginChild("scrolling", new imgui_18.ImVec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30), true, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
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
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_21.ImColor.HSV(hue, 0.6, 0.6));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_21.ImColor.HSV(hue, 0.7, 0.7));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_21.ImColor.HSV(hue, 0.8, 0.8));
                    ImGui.Button(label, new imgui_18.ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
                    ImGui.PopStyleColor(3);
                    ImGui.PopID();
                }
            }
            const scroll_x = ImGui.GetScrollX(), scroll_max_x = ImGui.GetScrollMaxX();
            ImGui.EndChild();
            ImGui.PopStyleVar(2);
            let scroll_x_delta = 0.0;
            ImGui.SmallButton("<<");
            if (ImGui.IsItemActive())
                scroll_x_delta = -ImGui.GetIO().DeltaTime * 1000.0;
            ImGui.SameLine();
            ImGui.Text("Scroll from code");
            ImGui.SameLine();
            ImGui.SmallButton(">>");
            if (ImGui.IsItemActive())
                scroll_x_delta = +ImGui.GetIO().DeltaTime * 1000.0;
            ImGui.SameLine();
            ImGui.Text(`${scroll_x.toFixed(0)}/${scroll_max_x.toFixed(0)}`);
            if (scroll_x_delta !== 0.0) {
                ImGui.BeginChild("scrolling"); // Demonstrate a trick: you can use Begin to set yourself in the context of another window (here we are already out of your child window)
                ImGui.SetScrollX(ImGui.GetScrollX() + scroll_x_delta);
                ImGui.End();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Clipping")) {
            /* static */ const size = STATIC("size", new imgui_18.ImVec2(100, 100)), offset = STATIC("offset", new imgui_18.ImVec2(50, 20));
            ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
            ImGui.DragFloat2("size", size.value, 0.5, 0.0, 200.0, "%.0f");
            ImGui.TextWrapped("(Click and drag)");
            const pos = ImGui.GetCursorScreenPos();
            const clip_rect = new imgui_19.ImVec4(pos.x, pos.y, pos.x + size.value.x, pos.y + size.value.y);
            ImGui.InvisibleButton("##dummy", size.value);
            if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) {
                offset.value.x += ImGui.GetIO().MouseDelta.x;
                offset.value.y += ImGui.GetIO().MouseDelta.y;
            }
            ImGui.GetWindowDrawList().AddRectFilled(pos, new imgui_18.ImVec2(pos.x + size.value.x, pos.y + size.value.y), imgui_20.IM_COL32(90, 90, 120, 255));
            ImGui.GetWindowDrawList().AddText(ImGui.GetFont(), ImGui.GetFontSize() * 2.0, new imgui_18.ImVec2(pos.x + offset.value.x, pos.y + offset.value.y), imgui_20.IM_COL32(255, 255, 255, 255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowPopups() {
        if (!ImGui.CollapsingHeader("Popups & Modal windows"))
            return;
        // Popups are windows with a few special properties:
        // - They block normal mouse hovering detection outside them. (*)
        // - Unless modal, they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
        // - Their visibility state (~bool) is held internally by imgui instead of being held by the programmer as we are used to with regular Begin() calls.
        // (*) One can use IsItemHovered(ImGuiHoveredFlags_AllowWhenBlockedByPopup) to bypass it and detect hovering even when normally blocked by a popup.
        // Those three properties are intimately connected. The library needs to hold their visibility state because it can close popups at any time.
        // Typical use for regular windows:
        //   bool my_tool_is_active = false; if (ImGui::Button("Open")) my_tool_is_active = true; [...] if (my_tool_is_active) Begin("My Tool", &my_tool_is_active) { [...] } End();
        // Typical use for popups:
        //   if (ImGui::Button("Open")) ImGui::OpenPopup("MyPopup"); if (ImGui::BeginPopup("MyPopup") { [...] EndPopup(); }
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
                ImGui.PushItemWidth(-1);
                ImGui.DragFloat("##Value", (_value = value.value) => value.value = _value, 0.1, 0.0, 0.0);
                ImGui.PopItemWidth();
                ImGui.EndPopup();
            }
            // We can also use OpenPopupOnItemClick() which is the same as BeginPopupContextItem() but without the Begin call.
            // So here we will make it that clicking on the text field with the right mouse button (1) will toggle the visibility of the popup above.
            ImGui.Text("(You can also right-click me to the same popup as above.)");
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
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_18.ImVec2(0, 0));
                ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
                ImGui.PopStyleVar();
                if (ImGui.Button("OK", new imgui_18.ImVec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.SetItemDefaultFocus();
                ImGui.SameLine();
                if (ImGui.Button("Cancel", new imgui_18.ImVec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.EndPopup();
            }
            if (ImGui.Button("Stacked modals.."))
                ImGui.OpenPopup("Stacked 1");
            if (ImGui.BeginPopupModal("Stacked 1")) {
                ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGuiCol.ModalWindowDimBg] behind it.");
                /* static */ const item = STATIC("item#1636", 1);
                ImGui.Combo("Combo", (value = item.value) => item.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                /* static */ const color = STATIC("color#2", [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit4("color", color.value); // This is to test behavior of stacked regular popups over a modal
                if (ImGui.Button("Add another modal.."))
                    ImGui.OpenPopup("Stacked 2");
                if (ImGui.BeginPopupModal("Stacked 2")) {
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
                ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}\nOffset ${ImGui.GetColumnOffset().toFixed(2)}`);
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            if (h_borders.value)
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
            ImGui.SetNextWindowContentSize(new imgui_18.ImVec2(1500.0, 0.0));
            ImGui.BeginChild("##ScrollingRegion", new imgui_18.ImVec2(0, ImGui.GetFontSize() * 20), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
            ImGui.Columns(10);
            const ITEMS_COUNT = 2000;
            const clipper = new imgui_25.ImGuiListClipper(ITEMS_COUNT); // Also demonstrate using the clipper for large list
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
        const node_open = ImGui.TreeNode("Tree within single cell");
        ImGui.SameLine();
        ShowHelpMarker("NB: Tree node must be poped before ending the cell. There's no storage of state per-cell.");
        if (node_open) {
            ImGui.Columns(2, "tree items");
            ImGui.Separator();
            if (ImGui.TreeNode("Hello")) {
                ImGui.BulletText("Sailor");
                ImGui.TreePop();
            }
            ImGui.NextColumn();
            if (ImGui.TreeNode("Bonjour")) {
                ImGui.BulletText("Marin");
                ImGui.TreePop();
            }
            ImGui.NextColumn();
            ImGui.Columns(1);
            ImGui.Separator();
            ImGui.TreePop();
        }
        ImGui.PopID();
    }
    function ShowDemoWindowMisc() {
        if (ImGui.CollapsingHeader("Filtering")) {
            /* static */ const filter = STATIC("filter#1864", new imgui_23.ImGuiTextFilter());
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
                        ImGui.Text(`${i} (${io.KeysDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Keys pressed:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyPressed(i)) {
                        ImGui.SameLine();
                        ImGui.Text(i.toString());
                    }
                ImGui.Text("Keys release:");
                for (let i = 0; i < imgui_3.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(i.toString());
                    }
                ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);
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
                //ImGui.SameLine(); ShowHelperMarker("Use ImGui.PushAllowKeyboardFocus(bool)\nto disable tabbing through certain widgets.");
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
                if (ImGui.Button("Focus on X"))
                    focus_ahead = 0;
                ImGui.SameLine();
                if (ImGui.Button("Focus on Y"))
                    focus_ahead = 1;
                ImGui.SameLine();
                if (ImGui.Button("Focus on Z"))
                    focus_ahead = 2;
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
                if (ImGui.IsItemActive()) {
                    // Draw a line between the button and the mouse cursor
                    const draw_list = ImGui.GetWindowDrawList();
                    draw_list.PushClipRectFullScreen();
                    draw_list.AddLine(io.MouseClickedPos[0], io.MousePos, ImGui.GetColorU32(imgui_5.ImGuiCol.Button), 4.0);
                    draw_list.PopClipRect();
                    // Drag operations gets "unlocked" when the mouse has moved past a certain threshold (the default threshold is stored in io.MouseDragThreshold)
                    // You can request a lower or higher threshold using the second parameter of IsMouseDragging() and GetMouseDragDelta()
                    const value_raw = ImGui.GetMouseDragDelta(0, 0.0);
                    const value_with_lock_threshold = ImGui.GetMouseDragDelta(0);
                    const mouse_delta = io.MouseDelta;
                    ImGui.SameLine();
                    ImGui.Text(`Raw (${value_raw.x.toFixed(1)}, ${value_raw.y.toFixed(1)}), WithLockThresold (${value_with_lock_threshold.x.toFixed(1)}, ${value_with_lock_threshold.y.toFixed(1)}), MouseDelta (${mouse_delta.x.toFixed(1)}, ${mouse_delta.y.toFixed(1)})`);
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Mouse cursors")) {
                const mouse_cursors_names = ["Arrow", "TextInput", "Move", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE", "Hand"];
                imgui_2.IM_ASSERT(imgui_3.IM_ARRAYSIZE(mouse_cursors_names) === imgui_11.ImGuiMouseCursor.COUNT);
                ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
                ImGui.Text("Hover to see mouse cursors:");
                ImGui.SameLine();
                ShowHelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
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
            ImGui.Selectable(font_current.GetDebugName()); // TODO
            // for (let n = 0; n < io.Fonts->Fonts.Size; n++)
            //     if (ImGui.Selectable(io.Fonts->Fonts[n]->GetDebugName(), io.Fonts->Fonts[n] === font_current))
            //         io.FontDefault = io.Fonts->Fonts[n];
            ImGui.EndCombo();
        }
        ImGui.SameLine();
        ShowHelpMarker("- Load additional fonts with io.Fonts->AddFontFromFileTTF().\n" +
            "- The font atlas is built when calling io.Fonts->GetTexDataAsXXXX() or io.Fonts->Build().\n" +
            "- Read FAQ and documentation in misc/fonts for more details.\n" +
            "- If you need to add/remove fonts at runtime (e.g. for DPI change), do it before calling NewFrame().");
    }
    exports_1("ShowFontSelector", ShowFontSelector);
    function ShowStyleEditor(ref = null) {
        // You can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it compares to an internally stored reference)
        const style = ImGui.GetStyle();
        /* static */ const ref_saved_style = STATIC("ref_saved_style", new imgui_22.ImGuiStyle());
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
        ShowHelpMarker("Save/Revert in local non-persistent storage. Default Colors definition are not affected. Use \"Export Colors\" below to save them somewhere.");
        if (ImGui.TreeNode("Rendering")) {
            ImGui.Checkbox("Anti-aliased lines", (value = style.AntiAliasedLines) => style.AntiAliasedLines = value);
            ImGui.SameLine();
            ShowHelpMarker("When disabling anti-aliasing lines, you'll probably want to disable borders in your style as well.");
            ImGui.Checkbox("Anti-aliased fill", (value = style.AntiAliasedFill) => style.AntiAliasedFill = value);
            ImGui.PushItemWidth(100);
            ImGui.DragFloat("Curve Tessellation Tolerance", (value = style.CurveTessellationTol) => style.CurveTessellationTol = value, 0.02, 0.10, Number.MAX_VALUE, "%.2f", 2.0);
            if (style.CurveTessellationTol < 0.10)
                style.CurveTessellationTol = 0.10;
            ImGui.DragFloat("Global Alpha", (value = style.Alpha) => style.Alpha = value, 0.005, 0.20, 1.0, "%.2f"); // Not exposing zero here so user doesn't "lose" the UI (zero alpha clips all widgets). But application code could have a toggle to switch between zero and non-zero.
            ImGui.PopItemWidth();
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Settings")) {
            ImGui.SliderFloat2("WindowPadding", style.WindowPadding, 0.0, 20.0, "%.0f");
            ImGui.SliderFloat("PopupRounding", (value = style.PopupRounding) => style.PopupRounding = value, 0.0, 16.0, "%.0f");
            ImGui.SliderFloat2("FramePadding", style.FramePadding, 0.0, 20.0, "%.0f");
            ImGui.SliderFloat2("ItemSpacing", style.ItemSpacing, 0.0, 20.0, "%.0f");
            ImGui.SliderFloat2("ItemInnerSpacing", style.ItemInnerSpacing, 0.0, 20.0, "%.0f");
            ImGui.SliderFloat2("TouchExtraPadding", style.TouchExtraPadding, 0.0, 10.0, "%.0f");
            ImGui.SliderFloat("IndentSpacing", (value = style.IndentSpacing) => style.IndentSpacing = value, 0.0, 30.0, "%.0f");
            ImGui.SliderFloat("ScrollbarSize", (value = style.ScrollbarSize) => style.ScrollbarSize = value, 1.0, 20.0, "%.0f");
            ImGui.SliderFloat("GrabMinSize", (value = style.GrabMinSize) => style.GrabMinSize = value, 1.0, 20.0, "%.0f");
            ImGui.Text("BorderSize");
            ImGui.SliderFloat("WindowBorderSize", (value = style.WindowBorderSize) => style.WindowBorderSize = value, 0.0, 1.0, "%.0f");
            ImGui.SliderFloat("ChildBorderSize", (value = style.ChildBorderSize) => style.ChildBorderSize = value, 0.0, 1.0, "%.0f");
            ImGui.SliderFloat("PopupBorderSize", (value = style.PopupBorderSize) => style.PopupBorderSize = value, 0.0, 1.0, "%.0f");
            ImGui.SliderFloat("FrameBorderSize", (value = style.FrameBorderSize) => style.FrameBorderSize = value, 0.0, 1.0, "%.0f");
            ImGui.Text("Rounding");
            ImGui.SliderFloat("WindowRounding", (value = style.WindowRounding) => style.WindowRounding = value, 0.0, 14.0, "%.0f");
            ImGui.SliderFloat("ChildRounding", (value = style.ChildRounding) => style.ChildRounding = value, 0.0, 16.0, "%.0f");
            ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f");
            ImGui.SliderFloat("ScrollbarRounding", (value = style.ScrollbarRounding) => style.ScrollbarRounding = value, 0.0, 12.0, "%.0f");
            ImGui.SliderFloat("GrabRounding", (value = style.GrabRounding) => style.GrabRounding = value, 0.0, 12.0, "%.0f");
            ImGui.Text("Alignment");
            ImGui.SliderFloat2("WindowTitleAlign", style.WindowTitleAlign, 0.0, 1.0, "%.2f");
            ImGui.SliderFloat2("ButtonTextAlign", style.ButtonTextAlign, 0.0, 1.0, "%.2f");
            ImGui.SameLine();
            ShowHelpMarker("Alignment applies when a button is larger than its text content.");
            ImGui.Text("Safe Area Padding");
            ImGui.SameLine();
            ShowHelpMarker("Adjust if you cannot see the edges of your screen (e.g. on a TV where scaling has not been configured).");
            ImGui.SliderFloat2("DisplaySafeAreaPadding", style.DisplaySafeAreaPadding, 0.0, 30.0, "%.0f");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Colors")) {
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
            ImGui.PushItemWidth(120);
            ImGui.Combo("##output_type", (value = output_dest.value) => output_dest.value = value, "To Clipboard\0To TTY\0");
            ImGui.PopItemWidth();
            ImGui.SameLine();
            ImGui.Checkbox("Only Modified Colors", (value = output_only_modified.value) => output_only_modified.value = value);
            ImGui.Text("Tip: Left-click on colored square to open color picker,\nRight-click to open edit options menu.");
            /* static */ const filter = STATIC("filter#2223", new imgui_23.ImGuiTextFilter());
            filter.value.Draw("Filter colors", 200);
            /* static */ const alpha_flags = STATIC("alpha_flags", 0);
            ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0);
            ImGui.SameLine();
            ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, imgui_6.ImGuiColorEditFlags.AlphaPreview);
            ImGui.SameLine();
            ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, imgui_6.ImGuiColorEditFlags.AlphaPreviewHalf);
            ImGui.BeginChild("#colors", new imgui_18.ImVec2(0, 300), true, imgui_15.ImGuiWindowFlags.AlwaysVerticalScrollbar | imgui_15.ImGuiWindowFlags.AlwaysHorizontalScrollbar | imgui_15.ImGuiWindowFlags.NavFlattened);
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
            ImGui.TreePop();
        }
        const fonts_opened = ImGui.TreeNode(`Fonts (${ImGui.GetIO().Fonts.Fonts.Size})`);
        if (fonts_opened) {
            const atlas = ImGui.GetIO().Fonts;
            if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`)) {
                ImGui.Image(atlas.TexID, new imgui_18.ImVec2(atlas.TexWidth, atlas.TexHeight), new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(1, 1), new imgui_21.ImColor(255, 255, 255, 255).Value, new imgui_21.ImColor(255, 255, 255, 128).Value);
                ImGui.TreePop();
            }
            ImGui.PushItemWidth(100);
            for (let i = 0; i < atlas.Fonts.Size; i++) {
                const font = atlas.Fonts[i];
                ImGui.PushID(font.native.$$.ptr);
                const font_details_opened = ImGui.TreeNode(font.native.$$.ptr, `Font ${i}: \'${font.ConfigData.length > 0 ? font.ConfigData[0].Name : ""}\', ${font.FontSize.toFixed(2)} px, ${font.Glyphs.Size} glyphs`);
                ImGui.SameLine();
                if (ImGui.SmallButton("Set as default"))
                    ImGui.GetIO().FontDefault = font;
                if (font_details_opened) {
                    ImGui.PushFont(font);
                    ImGui.Text("The quick brown fox jumps over the lazy dog");
                    ImGui.PopFont();
                    ImGui.DragFloat("Font scale", (value = font.Scale) => font.Scale = value, 0.005, 0.3, 2.0, "%.1f"); // Scale only this font
                    ImGui.InputFloat("Font offset", (value = font.DisplayOffset.y) => font.DisplayOffset.y = value, 1, 1, "%.0f");
                    ImGui.SameLine();
                    ShowHelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\nFont are currently rendered into bitmaps at a given size at the time of building the atlas. You may oversample them to get some flexibility with scaling. You can also render at multiple sizes and select which one to use at runtime.\n\n(Glimmer of hope: the atlas system should hopefully be rewritten in the future to make scaling more natural and automatic.)");
                    ImGui.Text(`Ascent: ${font.Ascent}, Descent: ${font.Descent}, Height: ${font.Ascent - font.Descent}`);
                    ImGui.Text(`Fallback character: '${String.fromCharCode(font.FallbackChar)}' (${font.FallbackChar})`);
                    ImGui.Text(`Texture surface: ${font.MetricsTotalSurface} pixels (approx) ~ ${0 | Math.sqrt(font.MetricsTotalSurface)}x${0 | Math.sqrt(font.MetricsTotalSurface)}`);
                    for (let config_i = 0; config_i < font.ConfigDataCount; config_i++) {
                        const cfg = font.ConfigData[config_i];
                        ImGui.BulletText(`Input ${config_i}: \'${cfg.Name}\', Oversample: (${cfg.OversampleH},${cfg.OversampleH}), PixelSnapH: ${cfg.PixelSnapH}`);
                    }
                    if (ImGui.TreeNode("Glyphs", `Glyphs (${font.Glyphs.Size})`)) {
                        // Display all glyphs of the fonts in separate pages of 256 characters
                        const glyph_fallback = font.FallbackGlyph; // Forcefully/dodgily make FindGlyph() return null on fallback, which isn't the default behavior.
                        font.FallbackGlyph = null;
                        for (let base = 0; base < 0x10000; base += 256) {
                            let count = 0;
                            for (let n = 0; n < 256; n++)
                                count += font.FindGlyph((base + n)) ? 1 : 0;
                            if (count > 0 && ImGui.TreeNode(base, `U+${format_number_hex(base, 4).toUpperCase()}..U+${(format_number_hex(base + 255, 4).toUpperCase())} (${count} ${count > 1 ? "glyphs" : "glyph"})`)) {
                                const cell_size = font.FontSize * 1;
                                const cell_spacing = style.ItemSpacing.y;
                                const base_pos = ImGui.GetCursorScreenPos();
                                const draw_list = ImGui.GetWindowDrawList();
                                for (let n = 0; n < 256; n++) {
                                    const cell_p1 = new imgui_18.ImVec2(base_pos.x + (n % 16) * (cell_size + cell_spacing), base_pos.y + (0 | (n / 16)) * (cell_size + cell_spacing));
                                    const cell_p2 = new imgui_18.ImVec2(cell_p1.x + cell_size, cell_p1.y + cell_size);
                                    const glyph = font.FindGlyphNoFallback((base + n));
                                    draw_list.AddRect(cell_p1, cell_p2, glyph ? imgui_20.IM_COL32(255, 255, 255, 100) : imgui_20.IM_COL32(255, 255, 255, 50));
                                    if (glyph)
                                        font.RenderChar(draw_list, cell_size, cell_p1, ImGui.GetColorU32(imgui_5.ImGuiCol.Text), (base + n)); // We use ImFont.RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
                                    if (glyph && ImGui.IsWindowHovered() && ImGui.IsMouseHoveringRect(cell_p1, cell_p2)) {
                                        ImGui.BeginTooltip();
                                        ImGui.Text(`Codepoint: U+${format_number_hex(base + n, 4).toUpperCase()}`);
                                        ImGui.Separator();
                                        ImGui.Image(ImGui.GetIO().Fonts.TexID, new imgui_18.ImVec2(8 * (glyph.X1 - glyph.X0), 8 * (glyph.Y1 - glyph.Y0)), new imgui_18.ImVec2(glyph.U0, glyph.V0), new imgui_18.ImVec2(glyph.U1, glyph.V1), new imgui_21.ImColor(255, 255, 255, 255).toImVec4(), new imgui_21.ImColor(255, 255, 255, 128).toImVec4());
                                        ImGui.SameLine();
                                        ImGui.BeginGroup();
                                        ImGui.Text(`AdvanceX: ${glyph.AdvanceX.toFixed(1)}`);
                                        ImGui.Text(`Pos: (${glyph.X0.toFixed(2)},${glyph.Y0.toFixed(2)}).(${glyph.X1.toFixed(2)},${glyph.Y1.toFixed(2)})`);
                                        ImGui.Text(`UV: (${glyph.U0.toFixed(3)},${glyph.V0.toFixed(3)}).(${glyph.U1.toFixed(3)},${glyph.V1.toFixed(3)})`);
                                        ImGui.EndGroup();
                                        ImGui.EndTooltip();
                                    }
                                }
                                ImGui.Dummy(new imgui_18.ImVec2((cell_size + cell_spacing) * 16, (cell_size + cell_spacing) * 16));
                                ImGui.TreePop();
                            }
                        }
                        font.FallbackGlyph = glyph_fallback;
                        ImGui.TreePop();
                    }
                    ImGui.TreePop();
                }
                ImGui.PopID();
            }
            /* static */ const window_scale = STATIC("window_scale", 1.0);
            ImGui.DragFloat("this window scale", (value = window_scale.value) => window_scale.value = value, 0.005, 0.3, 2.0, "%.1f"); // scale only this window
            ImGui.DragFloat("global scale", (value = ImGui.GetIO().FontGlobalScale) => ImGui.GetIO().FontGlobalScale = value, 0.005, 0.3, 2.0, "%.1f"); // scale everything
            ImGui.PopItemWidth();
            ImGui.SetWindowFontScale(window_scale.value);
            ImGui.TreePop();
        }
        ImGui.PopItemWidth();
    }
    exports_1("ShowStyleEditor", ShowStyleEditor);
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Main Menu Bar / ShowExampleAppMainMenuBar()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a fullscreen menu bar and populating it.
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
            ImGui.BeginChild("child", new imgui_18.ImVec2(0, 60), true);
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
                ImGui.GetWindowDrawList().AddRectFilled(p, new imgui_18.ImVec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i));
                ImGui.Dummy(new imgui_18.ImVec2(sz, sz));
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
        // Demo: add random items (unless Ctrl is held)
        /* static */ const last_time = STATIC("last_time", -1.0);
        const time = ImGui.GetTime();
        if (time - last_time.value >= 0.20 && !ImGui.GetIO().KeyCtrl) {
            const random_words = ["system", "info", "warning", "error", "fatal", "notice", "log"];
            // log.AddLog("[%s] Hello, time is %.1f, frame count is %d\n", random_words[rand() % IM_ARRAYSIZE(random_words)], time, ImGui.GetFrameCount());
            log.value.AddLog(`[${random_words[Math.floor(Math.random() * imgui_3.IM_ARRAYSIZE(random_words))]}] Hello, time is ${time.toFixed(1)}, frame count is ${ImGui.GetFrameCount()}\n`);
            last_time.value = time;
        }
        log.value.Draw("Example: Log", p_open);
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Simple Layout / ShowExampleAppLayout()
    //-----------------------------------------------------------------------------
    // Demonstrate create a window with multiple child windows.
    function ShowExampleAppLayout(p_open) {
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(500, 440), imgui_7.ImGuiCond.FirstUseEver);
        if (ImGui.Begin("Example: Layout", p_open, imgui_15.ImGuiWindowFlags.MenuBar)) {
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
            ImGui.BeginChild("left pane", new imgui_18.ImVec2(150, 0), true);
            for (let i = 0; i < 100; i++) {
                const label = `MyObject ${i}`;
                if (ImGui.Selectable(label, selected.value === i))
                    selected.value = i;
            }
            ImGui.EndChild();
            ImGui.SameLine();
            // right
            ImGui.BeginGroup();
            ImGui.BeginChild("item view", new imgui_18.ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
            ImGui.Text(`MyObject: ${selected}`);
            ImGui.Separator();
            ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ");
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
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(430, 450), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Property editor", p_open)) {
            ImGui.End();
            return;
        }
        ShowHelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");
        ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_18.ImVec2(2, 2));
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
                            // ImGui::TreeNodeEx("Field", ImGuiTreeNodeFlags_Leaf | ImGuiTreeNodeFlags_NoTreePushOnOpen | ImGuiTreeNodeFlags_Bullet, "Field_%d", i);
                            ImGui.TreeNodeEx("Field", imgui_14.ImGuiTreeNodeFlags.Leaf | imgui_14.ImGuiTreeNodeFlags.NoTreePushOnOpen | imgui_14.ImGuiTreeNodeFlags.Bullet, `Field_${i}`);
                            ImGui.NextColumn();
                            ImGui.PushItemWidth(-1);
                            const ref = [dummy_members.value[i] || 0];
                            if (i >= 5)
                                ImGui.InputFloat("##value", ref, 1.0);
                            else
                                ImGui.DragFloat("##value", ref, 0.01);
                            dummy_members.value[i] = ref[0];
                            ImGui.PopItemWidth();
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
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(520, 600), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Long text display", p_open)) {
            ImGui.End();
            return;
        }
        /* static */ const test_type = STATIC("test_type", 0);
        /* static */ const log = STATIC("log#3217", new imgui_24.ImGuiTextBuffer());
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
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_18.ImVec2(0, 0));
                    const clipper = new imgui_25.ImGuiListClipper(lines.value);
                    while (clipper.Step())
                        for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                            ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                    // clipper.delete(); // NOTE: native emscripten class
                    ImGui.PopStyleVar();
                    break;
                }
            case 2:
                // Multiple calls to Text(), not clipped (slow)
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_18.ImVec2(0, 0));
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
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(-1, 0), new imgui_18.ImVec2(-1, Number.MAX_VALUE)); // Vertical only
        if (type.value === 1)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(0, -1), new imgui_18.ImVec2(Number.MAX_VALUE, -1)); // Horizontal only
        if (type.value === 2)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(100, 100), new imgui_18.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
        if (type.value === 3)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(400, -1), new imgui_18.ImVec2(500, -1)); // Width 400-500
        if (type.value === 4)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(-1, 400), new imgui_18.ImVec2(-1, 500)); // Height 400-500
        if (type.value === 5)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square); // Always Square
        if (type.value === 6)
            ImGui.SetNextWindowSizeConstraints(new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100); // Fixed Step
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
                ImGui.SetWindowSize(new imgui_18.ImVec2(200, 200));
            }
            ImGui.SameLine();
            if (ImGui.Button("500x500")) {
                ImGui.SetWindowSize(new imgui_18.ImVec2(500, 500));
            }
            ImGui.SameLine();
            if (ImGui.Button("800x200")) {
                ImGui.SetWindowSize(new imgui_18.ImVec2(800, 200));
            }
            ImGui.PushItemWidth(200);
            ImGui.Combo("Constraint", (value = type.value) => type.value = value, desc, imgui_3.IM_ARRAYSIZE(desc));
            ImGui.DragInt("Lines", (value = display_lines.value) => display_lines.value = value, 0.2, 1, 100);
            ImGui.PopItemWidth();
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
        const window_pos = new imgui_18.ImVec2((corner.value & 1) ? ImGui.GetIO().DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? ImGui.GetIO().DisplaySize.y - DISTANCE : DISTANCE);
        const window_pos_pivot = new imgui_18.ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
        if (corner.value !== -1)
            ImGui.SetNextWindowPos(window_pos, imgui_7.ImGuiCond.Always, window_pos_pivot);
        ImGui.SetNextWindowBgAlpha(0.3); // Transparent background
        if (ImGui.Begin("Example: Simple Overlay", p_open, (corner.value !== -1 ? imgui_15.ImGuiWindowFlags.NoMove : 0) | imgui_15.ImGuiWindowFlags.NoTitleBar | imgui_15.ImGuiWindowFlags.NoResize | imgui_15.ImGuiWindowFlags.AlwaysAutoResize | imgui_15.ImGuiWindowFlags.NoSavedSettings)) {
            ImGui.Text("Simple overlay\nin the corner of the screen.\n(right-click to change position)");
            ImGui.Separator();
            if (ImGui.IsMousePosValid())
                ImGui.Text(`Mouse Position: (${ImGui.GetIO().MousePos.x.toFixed(1)},${ImGui.GetIO().MousePos.y.toFixed(1)})`);
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
        ImGui.SetNextWindowPos(new imgui_18.ImVec2(100, 100), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##1");
        ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
        ImGui.End();
        ImGui.SetNextWindowPos(new imgui_18.ImVec2(100, 200), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##2");
        ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
        ImGui.End();
        // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
        const buf = `Animated title ${"|/-\\".charAt((ImGui.GetTime() / 0.25) & 3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
        ImGui.SetNextWindowPos(new imgui_18.ImVec2(100, 300), imgui_7.ImGuiCond.FirstUseEver);
        ImGui.Begin(buf);
        ImGui.Text("This window has a changing title.");
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Custom Rendering using ImDrawList API / ShowExampleAppCustomRendering()
    //-----------------------------------------------------------------------------
    // Demonstrate using the low-level ImDrawList to draw custom shapes.
    function ShowExampleAppCustomRendering(p_open) {
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(350, 560), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Custom rendering", p_open)) {
            ImGui.End();
            return;
        }
        // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of overloaded operators, etc.
        // Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your types and ImVec2/ImVec4.
        // ImGui defines overloaded operators but they are internal to imgui.cpp and not exposed outside (to avoid messing with your types)
        // In this example we are not using the maths operators!
        const draw_list = ImGui.GetWindowDrawList();
        // Primitives
        ImGui.Text("Primitives");
        /* static */ const sz = STATIC("sz", 36.0);
        /* static */ const thickness = STATIC("thickness", 4.0);
        /* static */ const col = STATIC("color#2583", new imgui_19.ImVec4(1.0, 1.0, 0.4, 1.0));
        ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
        ImGui.DragFloat("Thickness", (value = thickness.value) => thickness.value = value, 0.05, 1.0, 8.0, "%.02f");
        ImGui.ColorEdit3("Color", col.value);
        {
            const p = ImGui.GetCursorScreenPos();
            const col32 = imgui_20.IM_COL32(col.value.x * 255, col.value.y * 255, col.value.z * 255, col.value.w * 255);
            let x = p.x + 4.0, y = p.y + 4.0;
            const spacing = 8.0;
            for (let n = 0; n < 2; n++) {
                const curr_thickness = (n === 0) ? 1.0 : thickness.value;
                draw_list.AddCircle(new imgui_18.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 20, curr_thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, 0.0, imgui_16.ImDrawCornerFlags.All, curr_thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_16.ImDrawCornerFlags.All, curr_thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_16.ImDrawCornerFlags.TopLeft | imgui_16.ImDrawCornerFlags.BotRight, curr_thickness);
                x += sz.value + spacing;
                draw_list.AddTriangle(new imgui_18.ImVec2(x + sz.value * 0.5, y), new imgui_18.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_18.ImVec2(x, y + sz.value - 0.5), col32, curr_thickness);
                x += sz.value + spacing;
                draw_list.AddLine(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y), col32, curr_thickness);
                x += sz.value + spacing; // Horizontal line (note: drawing a filled rectangle will be faster!)
                draw_list.AddLine(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x, y + sz.value), col32, curr_thickness);
                x += spacing; // Vertical line (note: drawing a filled rectangle will be faster!)
                draw_list.AddLine(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, curr_thickness);
                x += sz.value + spacing; // Diagonal line
                draw_list.AddBezierCurve(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value * 1.3, y + sz.value * 0.3), new imgui_18.ImVec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, curr_thickness);
                x = p.x + 4;
                y += sz.value + spacing;
            }
            draw_list.AddCircleFilled(new imgui_18.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 32);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, 10.0);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_16.ImDrawCornerFlags.TopLeft | imgui_16.ImDrawCornerFlags.BotRight);
            x += sz.value + spacing;
            draw_list.AddTriangleFilled(new imgui_18.ImVec2(x + sz.value * 0.5, y), new imgui_18.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_18.ImVec2(x, y + sz.value - 0.5), col32);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + thickness.value), col32);
            x += sz.value + spacing; // Horizontal line (faster than AddLine, but only handle integer thickness)
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + thickness.value, y + sz.value), col32);
            x += spacing + spacing; // Vertical line (faster than AddLine, but only handle integer thickness)
            draw_list.AddRectFilled(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + 1, y + 1), col32);
            x += sz.value; // Pixel (faster than AddLine)
            draw_list.AddRectFilledMultiColor(new imgui_18.ImVec2(x, y), new imgui_18.ImVec2(x + sz.value, y + sz.value), imgui_20.IM_COL32(0, 0, 0), imgui_20.IM_COL32(255, 0, 0), imgui_20.IM_COL32(255, 255, 0), imgui_20.IM_COL32(0, 255, 0));
            ImGui.Dummy(new imgui_18.ImVec2((sz.value + spacing) * 8, (sz.value + spacing) * 3));
        }
        ImGui.Separator();
        {
            /* static */ const points = STATIC("points", new imgui_17.ImVector());
            /* static */ const adding_line = STATIC("adding_line", false);
            ImGui.Text("Canvas example");
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
            draw_list.AddRectFilledMultiColor(canvas_pos, new imgui_18.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_20.IM_COL32(50, 50, 50), imgui_20.IM_COL32(50, 50, 60), imgui_20.IM_COL32(60, 60, 70), imgui_20.IM_COL32(50, 50, 60));
            draw_list.AddRect(canvas_pos, new imgui_18.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_20.IM_COL32(255, 255, 255));
            let adding_preview = false;
            ImGui.InvisibleButton("canvas", canvas_size);
            const mouse_pos_in_canvas = new imgui_18.ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
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
            draw_list.PushClipRect(canvas_pos, new imgui_18.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), true); // clip lines within the canvas (if we resize it, etc.)
            for (let i = 0; i < points.value.Size - 1; i += 2)
                draw_list.AddLine(new imgui_18.ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new imgui_18.ImVec2(canvas_pos.x + points.value.Data[i + 1].x, canvas_pos.y + points.value.Data[i + 1].y), imgui_20.IM_COL32(255, 255, 0, 255), 2.0);
            draw_list.PopClipRect();
            if (adding_preview)
                points.value.pop_back();
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
                    this.Items = new imgui_17.ImVector();
                    // bool                  ScrollToBottom;
                    this.ScrollToBottom = false;
                    // ImVector<char*>       History;
                    this.History = new imgui_17.ImVector();
                    // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
                    this.HistoryPos = -1;
                    // ImVector<const char*> Commands;
                    this.Commands = new imgui_17.ImVector();
                    this.ClearLog();
                    // memset(InputBuf, 0, sizeof(InputBuf));
                    this.InputBuf.buffer = "";
                    this.HistoryPos = -1;
                    this.Commands.push_back("HELP");
                    this.Commands.push_back("HISTORY");
                    this.Commands.push_back("CLEAR");
                    this.Commands.push_back("CLASSIFY"); // "classify" is only here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
                    this.AddLog("Welcome to Dear ImGui!");
                }
                delete() { }
                // Portable helpers
                // static int   Stricmp(const char* str1, const char* str2)         { int d; while ((d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; } return d; }
                // static int   Strnicmp(const char* str1, const char* str2, int n) { int d = 0; while (n > 0 && (d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; n--; } return d; }
                // static char* Strdup(const char *str)                             { size_t len = strlen(str) + 1; void* buff = malloc(len); return (char*)memcpy(buff, (const void*)str, len); }
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
                    this.ScrollToBottom = true;
                }
                // void    Draw(const char* title, bool* p_open)
                Draw(title, p_open) {
                    ImGui.SetNextWindowSize(new imgui_18.ImVec2(520, 600), imgui_7.ImGuiCond.FirstUseEver);
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
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_18.ImVec2(0, 0));
                    /* static */ const filter = STATIC("filter#2763", new imgui_23.ImGuiTextFilter());
                    filter.value.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
                    ImGui.PopStyleVar();
                    ImGui.Separator();
                    const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
                    ImGui.BeginChild("ScrollingRegion", new imgui_18.ImVec2(0, -footer_height_to_reserve), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar); // Leave room for 1 separator + 1 InputText
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
                    ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.ItemSpacing, new imgui_18.ImVec2(4, 1)); // Tighten spacing
                    if (copy_to_clipboard)
                        ImGui.LogToClipboard();
                    const col_default_text = ImGui.GetStyleColorVec4(imgui_5.ImGuiCol.Text);
                    for (let i = 0; i < this.Items.Size; i++) {
                        // const char* item = Items[i];
                        const item = this.Items.Data[i];
                        if (!filter.value.PassFilter(item))
                            continue;
                        let col = col_default_text;
                        // if (strstr(item, "[error]")) col = ImColor(1.0f,0.4f,0.4f,1.0f);
                        if (/\[error\]/.test(item))
                            col = new imgui_19.ImVec4(1.0, 0.4, 0.4, 1.0);
                        // else if (strncmp(item, "# ", 2) === 0) col = ImColor(1.0f,0.78f,0.58f,1.0f);
                        else if (/^# /.test(item))
                            col = new imgui_19.ImVec4(1.0, 0.78, 0.58, 1.0);
                        ImGui.PushStyleColor(imgui_5.ImGuiCol.Text, col);
                        ImGui.TextUnformatted(item);
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
                    this.Buf = new imgui_24.ImGuiTextBuffer();
                    // ImGuiTextFilter     Filter;
                    this.Filter = new imgui_23.ImGuiTextFilter();
                    // ImVector<int>       LineOffsets;        // Index to lines offset
                    this.LineOffsets = new imgui_17.ImVector();
                    // bool                ScrollToBottom;
                    this.ScrollToBottom = false;
                }
                // void    Clear()     { Buf.clear(); LineOffsets.clear(); }
                Clear() { this.Buf.clear(); this.LineOffsets.clear(); }
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
                            this.LineOffsets.push_back(old_size);
                    this.ScrollToBottom = true;
                }
                Draw(title, p_open) {
                    ImGui.SetNextWindowSize(new imgui_18.ImVec2(500, 400), imgui_7.ImGuiCond.FirstUseEver);
                    if (!ImGui.Begin(title, p_open)) {
                        ImGui.End();
                        return;
                    }
                    if (ImGui.Button("Clear"))
                        this.Clear();
                    ImGui.SameLine();
                    const copy = ImGui.Button("Copy");
                    ImGui.SameLine();
                    this.Filter.Draw("Filter", -100.0);
                    ImGui.Separator();
                    ImGui.BeginChild("scrolling", new imgui_18.ImVec2(0, 0), false, imgui_15.ImGuiWindowFlags.HorizontalScrollbar);
                    if (copy)
                        ImGui.LogToClipboard();
                    if (this.Filter.IsActive()) {
                        // const char* buf_begin = Buf.begin();
                        // const char* line = buf_begin;
                        // for (let line_no = 0; line !== null; line_no++)
                        // {
                        //     const char* line_end = (line_no < LineOffsets.Size) ? buf_begin + LineOffsets[line_no] : null;
                        //     if (Filter.PassFilter(line, line_end))
                        //         ImGui.TextUnformatted(line, line_end);
                        //     line = line_end && line_end[1] ? line_end + 1 : null;
                        // }
                    }
                    else {
                        ImGui.TextUnformatted(this.Buf.begin());
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLGNBQWM7Ozs7O0lBc0dkLGtCQUFrQjtJQUNsQixrSUFBa0k7SUFDbEksNkJBQTZCO0lBQzdCLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsK0pBQStKO0lBQy9KLHNNQUFzTTtJQUN0TSxnSUFBZ0k7SUFDaEksOEhBQThIO0lBQzlILHdUQUF3VDtJQUN4VCwyQ0FBMkM7SUFDM0MscUlBQXFJO0lBQ3JJLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsNkhBQTZIO0lBQzdILDRJQUE0STtJQUM1SSw2SkFBNko7SUFDN0osbUlBQW1JO0lBQ25JLHNCQUFzQjtJQUN0Qix3S0FBd0s7SUFDeEssU0FBUztJQUNULFNBQVM7SUFFVCxTQUFTLGFBQWEsQ0FBQyxDQUFTLEVBQUUsUUFBZ0IsRUFBRSxFQUFFLE1BQWMsQ0FBQyxFQUFFLFdBQW1CLEdBQUc7UUFDekYsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCxTQUFTLGlCQUFpQixDQUFDLENBQVMsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pFLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxTQUFTLGlCQUFpQixDQUFDLENBQVMsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pFLE9BQU8sYUFBYSxDQUFDLENB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