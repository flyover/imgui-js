// dear imgui, v1.60 WIP
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
    // Demonstrate most ImGui features (big function!)
    function ShowDemoWindow(p_open = null) {
        done = false;
        // Examples apps
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
        /* static */ const show_app_style_editor = STATIC("show_app_style_editor", false);
        /* static */ const show_app_metrics = STATIC("show_app_metrics", false);
        /* static */ const show_app_about = STATIC("show_app_about", false);
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
        /* static */ const no_titlebar = STATIC("no_titlebar", false);
        /* static */ const no_scrollbar = STATIC("no_scrollbar", false);
        /* static */ const no_menu = STATIC("no_menu", false);
        /* static */ const no_move = STATIC("no_move", false);
        /* static */ const no_resize = STATIC("no_resize", false);
        /* static */ const no_collapse = STATIC("no_collapse", false);
        /* static */ const no_close = STATIC("no_close", false);
        /* static */ const no_nav = STATIC("no_nav", false);
        // Demonstrate the various window flags. Typically you would just use the default.
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
        if (no_close.value)
            p_open = null; // Don't pass our bool* to Begin
        ImGui.SetNextWindowSize(new imgui_18.ImVec2(550, 680), imgui_7.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("ImGui Demo", p_open, window_flags)) {
            // Early out if the window is collapsed, as an optimization.
            ImGui.End();
            return done;
        }
        //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // 2/3 of the space for widget and 1/3 for labels
        ImGui.PushItemWidth(-140); // Right align, keep 140 pixels for labels
        ImGui.Text(`dear imgui says hello. (${imgui_1.IMGUI_VERSION})`);
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
            ImGui.TextWrapped("This window is being created by the ShowDemoWindow() function. Please refer to the code in imgui_demo.ts for reference.\n\n");
            ImGui.Text("USER GUIDE:");
            /*ImGui.*/ ShowUserGuide();
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
            if (ImGui.TreeNode("Style")) {
                /*ImGui.*/ ShowStyleEditor();
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Capture/Logging")) {
                ImGui.TextWrapped("The logging API redirects all text output so you can easily capture the content of a window or a block. Tree nodes can be automatically expanded. You can also call ImGui.LogText() to output directly to the log without a visual output.");
                ImGui.LogButtons();
                ImGui.TreePop();
            }
        }
        if (ImGui.CollapsingHeader("Widgets")) {
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
                // Arrow buttons
                const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
                if (ImGui.ArrowButton("##left", imgui_26.ImGuiDir.Left)) { }
                ImGui.SameLine(0.0, spacing);
                if (ImGui.ArrowButton("##left", imgui_26.ImGuiDir.Right)) { }
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
                    ShowHelpMarker("Refer to the \"Combo\" section below for an explanation of the full BeginCombo/EndCombo API, and demonstration of various flags.\n");
                }
                {
                    /* static */ const str0 = STATIC("str0", new imgui_4.ImStringBuffer(128, "Hello, world!"));
                    /* static */ const i0 = STATIC("i0", 123);
                    ImGui.InputText("input text", str0.value, imgui_3.IM_ARRAYSIZE(str0.value));
                    ImGui.SameLine();
                    ShowHelpMarker("Hold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n");
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
                }
                {
                    /* static */ const col1 = STATIC("col1", [1.0, 0.0, 0.2]);
                    /* static */ const col2 = STATIC("col2", [0.4, 0.7, 0.0, 0.5]);
                    ImGui.ColorEdit3("color 1", col1.value);
                    ImGui.SameLine();
                    ShowHelpMarker("Click on the colored square to open a color picker.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");
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
                    ImGui.TextWrapped("CJK text will only appears if the font was loaded with the appropriate CJK character ranges. Call io.Font->LoadFromFileTTF() manually to load extra character ranges. Read misc/fonts/README.txt for details.");
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
                ImGui.PushStyleVar(imgui_13.ImGuiStyleVar.FramePadding, new imgui_18.ImVec2(0, 0));
                ImGui.Checkbox("Read-only", (value = read_only.value) => read_only.value = value);
                ImGui.PopStyleVar();
                ImGui.InputTextMultiline("##source", text.value, imgui_3.IM_ARRAYSIZE(text.value), new imgui_18.ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), imgui_10.ImGuiInputTextFlags.AllowTabInput | (read_only.value ? imgui_10.ImGuiInputTextFlags.ReadOnly : 0));
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
                // The DragScalar, InputScalar, SliderScalar functions allow manipulating most common data types: signed/unsigned int/long long and float/double
                // To avoid polluting the public API with all possible combinations, we use the ImGuiDataType enum to pass the type, and argument-by-values are turned into argument-by-address.
                // This is the reason the test code below creates local variables to hold "zero" "one" etc. for each types.
                // In practice, if you frequently use a given type that is not covered by the normal API entry points, you may want to wrap it yourself inside a 1 line function
                // which can take typed values argument instead of void*, and then pass their address to the generic function. For example:
                //   bool SliderU64(const char *label, u64* value, u64 min = 0, u64 max = 0, const char* format = "%lld") { return SliderScalar(label, ImGuiDataType_U64, value, &min, &max, format); }
                // Below are helper variables we can take the address of to work-around this:
                // Note that the SliderScalar function has a maximum usable range of half the natural type maximum, hence the /2 below.
                // const ImS32   s32_zero = 0,   s32_one = 1,   s32_fifty = 50, s32_min = INT_MIN/2,   s32_max = INT_MAX/2,    s32_hi_a = INT_MAX/2 - 100,    s32_hi_b = INT_MAX/2;
                // const ImU32   u32_zero = 0,   u32_one = 1,   u32_fifty = 50, u32_min = 0,           u32_max = UINT_MAX/2,   u32_hi_a = UINT_MAX/2 - 100,   u32_hi_b = UINT_MAX/2;
                // const ImS64   s64_zero = 0,   s64_one = 1,   s64_fifty = 50, s64_min = LLONG_MIN/2, s64_max = LLONG_MAX/2,  s64_hi_a = LLONG_MAX/2 - 100,  s64_hi_b = LLONG_MAX/2;
                // const ImU64   u64_zero = 0,   u64_one = 1,   u64_fifty = 50, u64_min = 0,           u64_max = ULLONG_MAX/2, u64_hi_a = ULLONG_MAX/2 - 100, u64_hi_b = ULLONG_MAX/2;
                // const float   f32_zero = 0.f, f32_one = 1.f, f32_lo_a = -10000000000.0f, f32_hi_a = +10000000000.0f;
                // const double  f64_zero = 0.,  f64_one = 1.,  f64_lo_a = -1000000000000000, f64_hi_a = +1000000000000000;
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
            if (ImGui.TreeNode("Active, Focused, Hovered & Focused Tests")) {
                // Display the value of IsItemHovered() and other common item state functions. Note that the flags can be combined.
                // (because BulletText is an item itself and that would affect the output of IsItemHovered() we pass all state in a single call to simplify the code).
                /* static */ const item_type = STATIC("item_type", 1);
                /* static */ const b = STATIC("b#1302", false);
                /* static */ const col4f = STATIC("col4f", [1.0, 0.5, 0.0, 1.0]);
                ImGui.RadioButton("Text", (value = item_type.value) => item_type.value = value, 0);
                ImGui.SameLine();
                ImGui.RadioButton("Button", (value = item_type.value) => item_type.value = value, 1);
                ImGui.SameLine();
                ImGui.RadioButton("CheckBox", (value = item_type.value) => item_type.value = value, 2);
                ImGui.SameLine();
                ImGui.RadioButton("SliderFloat", (value = item_type.value) => item_type.value = value, 3);
                ImGui.SameLine();
                ImGui.RadioButton("ColorEdit4", (value = item_type.value) => item_type.value = value, 4);
                ImGui.SameLine();
                ImGui.RadioButton("ListBox", (value = item_type.value) => item_type.value = value, 5);
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
                    `IsItemDeactivated() = ${ImGui.IsItemDeactivated()}\n` +
                    `IsItemDeactivatedAfterChange() = ${ImGui.IsItemDeactivatedAfterChange()}\n` +
                    `IsItemVisible() = ${ImGui.IsItemVisible()}\n`);
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
                ImGui.TreePop();
            }
        }
        if (ImGui.CollapsingHeader("Layout")) {
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
                            ImGui.SetScrollHere();
                    }
                    if (goto_line && line.value >= 100)
                        ImGui.SetScrollHere();
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
                const sz = new imgui_18.ImVec2(30, 30);
                ImGui.Button("A", sz);
                ImGui.SameLine();
                ImGui.Dummy(sz);
                ImGui.SameLine();
                ImGui.Button("B", sz);
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
                ImGui.TextWrapped("(Use SetScrollHere() or SetScrollFromPosY() to scroll to a given position.)");
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
                            ImGui.TextColored(new imgui_21.ImColor(255, 255, 0), `Line ${line}`);
                            ImGui.SetScrollHere(i * 0.25); // 0.0:top, 0.5f:center, 1.0f:bottom
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
        if (ImGui.CollapsingHeader("Popups & Modal windows")) {
            if (ImGui.TreeNode("Popups")) {
                ImGui.TextWrapped("When a popup is active, it inhibits interacting with windows that are behind the popup. Clicking outside the popup closes it.");
                /* static */ const selected_fish = STATIC("selected_fish", -1);
                const names = ["Bream", "Haddock", "Mackerel", "Pollock", "Tilefish"];
                /* static */ const toggles = STATIC("toggles", [true, false, false, false, false]);
                // Simple selection popup
                // (If you want to show the current selection inside the Button itself, you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
                if (ImGui.Button("Select.."))
                    ImGui.OpenPopup("select");
                ImGui.SameLine();
                ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value]);
                if (ImGui.BeginPopup("select")) {
                    ImGui.Text("Aquarium");
                    ImGui.Separator();
                    for (let i = 0; i < imgui_3.IM_ARRAYSIZE(names); i++)
                        if (ImGui.Selectable(names[i]))
                            selected_fish.value = i;
                    ImGui.EndPopup();
                }
                // Showing a menu with toggles
                if (ImGui.Button("Toggle.."))
                    ImGui.OpenPopup("toggle");
                if (ImGui.BeginPopup("toggle")) {
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
                if (ImGui.Button("Popup Menu.."))
                    ImGui.OpenPopup("FilePopup");
                if (ImGui.BeginPopup("FilePopup")) {
                    ShowExampleMenuFile();
                    ImGui.EndPopup();
                }
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Context menus")) {
                // BeginPopupContextItem() is a helper to provide common/simple popup behavior of essentially doing:
                //    if (IsItemHovered() && IsMouseClicked(0))
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
                /* static */ const name = STATIC("name", new imgui_4.ImStringBuffer(32, "Label1"));
                const buf = `Button: ${name.value.buffer}###Button`; // ### operator override ID ignoring the preceding label
                ImGui.Button(buf);
                if (ImGui.BeginPopupContextItem()) // When used after an item that has an ID (here the Button), we can skip providing an ID to BeginPopupContextItem().
                 {
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
                    ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGuiCol.ModalWindowDarkening] for darkening.");
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
        if (ImGui.CollapsingHeader("Columns")) {
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
            ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
            ImGui.SameLine();
            ShowHelpMarker("Instruct ImGui to render a mouse cursor for you in software. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
            ImGui.CheckboxFlags("io.ConfigFlags: EnableGamepad [beta]", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableGamepad);
            ImGui.CheckboxFlags("io.ConfigFlags: EnableKeyboard [beta]", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableKeyboard);
            ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableSetMousePos);
            ImGui.SameLine();
            ShowHelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGuiConfigFlags_NavEnableSetMousePos.");
            ImGui.CheckboxFlags("io.ConfigFlags: NoMouseCursorChange", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NoMouseCursorChange);
            ImGui.SameLine();
            ShowHelpMarker("Instruct back-end to not alter mouse cursor shape and visibility.");
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
                const mouse_cursors_names = ["Arrow", "TextInput", "Move", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE"];
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
        ImGui.End();
        return done;
    }
    exports_1("ShowDemoWindow", ShowDemoWindow);
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
            ImGui.DragFloat("Curve Tessellation Tolerance", (value = style.CurveTessellationTol) => style.CurveTessellationTol = value, 0.02, 0.10, Number.MAX_VALUE, null, 2.0);
            if (style.CurveTessellationTol < 0.0)
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
                    ImGui.InputFloat("Font offset", (value = font.DisplayOffset.y) => font.DisplayOffset.y = value, 1, 1);
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
    // Demonstrate using "##" and "###" in identifiers to manipulate ID generation.
    // This apply to regular items as well. Read FAQ section "How can I have multiple widgets with the same label? Can I have widget without a label? (Yes). A primer on the purpose of labels/IDs." for details.
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
            // DEMO CODE
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
            // Demonstrating creating a simple console window, with scrolling, filtering, completion and history.
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
                    this.Commands.push_back("CLASSIFY"); // "classify" is here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
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
                        if (ImGui.MenuItem("Close"))
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
                        ImGui.SetScrollHere(1.0);
                    this.ScrollToBottom = false;
                    ImGui.PopStyleVar();
                    ImGui.EndChild();
                    ImGui.Separator();
                    // Command-line
                    let reclaim_focus = false;
                    if (ImGui.InputText("Input", this.InputBuf, imgui_3.IM_ARRAYSIZE(this.InputBuf), imgui_10.ImGuiInputTextFlags.EnterReturnsTrue | imgui_10.ImGuiInputTextFlags.CallbackCompletion | imgui_10.ImGuiInputTextFlags.CallbackHistory, ExampleAppConsole.TextEditCallbackStub, this)) {
                        // Strtrim(InputBuf);
                        this.InputBuf.buffer = this.InputBuf.buffer.trim();
                        // if (InputBuf[0])
                        if (this.InputBuf.buffer.length > 0)
                            this.ExecCommand(this.InputBuf.buffer);
                        // strcpy(InputBuf, "");
                        this.InputBuf.buffer = "";
                        reclaim_focus = true;
                    }
                    // Demonstrate keeping focus on the input box
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
                // static const TextEditCallbackStub: number(ImGuiTextEditCallbackData* data) // In C++11 you are better off using lambdas for this sort of forwarding callbacks
                static TextEditCallbackStub(data) {
                    // ExampleAppConsole* console = (ExampleAppConsole*)data->UserData;
                    const _console = data.UserData;
                    return _console.TextEditCallback(data);
                }
                // int     TextEditCallback(ImGuiTextEditCallbackData* data)
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
                                //     data->CursorPos = data->SelectionStart = data->SelectionEnd = data->BufTextLen = (int)snprintf(data->Buf, (size_t)data->BufSize, "%s", (HistoryPos >= 0) ? History[HistoryPos] : "");
                                //     data->BufDirty = true;
                                // }
                            }
                    }
                    return 0;
                }
            };
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
                    ImGui.Begin(title, p_open);
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
                        ImGui.SetScrollHere(1.0);
                    this.ScrollToBottom = false;
                    ImGui.EndChild();
                    ImGui.End();
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLGNBQWM7Ozs7O0lBOEVkLGtCQUFrQjtJQUNsQixrSUFBa0k7SUFDbEksNkJBQTZCO0lBQzdCLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsK0pBQStKO0lBQy9KLHNNQUFzTTtJQUN0TSxnSUFBZ0k7SUFDaEksOEhBQThIO0lBQzlILHdUQUF3VDtJQUN4VCwyQ0FBMkM7SUFDM0MscUlBQXFJO0lBQ3JJLFNBQVM7SUFDVCwwQkFBMEI7SUFDMUIsNkhBQTZIO0lBQzdILDRJQUE0STtJQUM1SSw2SkFBNko7SUFDN0osbUlBQW1JO0lBQ25JLHNCQUFzQjtJQUN0Qix3S0FBd0s7SUFDeEssU0FBUztJQUNULFNBQVM7SUFFVCx1QkFBdUIsQ0FBUyxFQUFFLFFBQWdCLEVBQUUsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pGLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsMkJBQTJCLENBQVMsRUFBRSxNQUFjLENBQUMsRUFBRSxXQUFtQixHQUFHO1FBQ3pFLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCwyQkFBMkIsQ0FBUyxFQUFFLE1BQWMsQ0FBQyxFQUFFLFdBQW1CLEdBQUc7UUFDekUsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUs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RUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQztvQkFDOUwsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFDM0I7d0JBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxlQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQy9HOzRCQUNJLE1BQU0sQ0FBQyxHQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzFELElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMs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Q0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN2RyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pHLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMzRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxHQUFHLEdBQVksS0FBSyxDQUFDO2dCQUN6QixJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMs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LFFBQVEsRUFBRSxDQUFDO3dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQUU7Z0JBQy9NLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBRSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQWM7d0JBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7cUJBQUU7Z0JBQ3pLLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFBRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQWE7d0JBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7cUJBQUU7Z0JBQ3pLLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTVJLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQXFCO3dCQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFBRTtnQkFDM00sS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFLO3dCQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFBRTtnQkFDOUssS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFJO3dCQUFFLEtBQUssQ0FBQyxRQUFR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SyxHQUFVLGlCQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDMUcsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQUMsTUFBTSxPQUFPLEdBQVcsR0FBRyxDQUFDO1lBQzlFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQzFCO2dCQUNJLE1BQU0sY0FBYyxHQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2pFLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUM1SSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsMEJBQWlCLENBQUMsR0FBRyxF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RSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksZUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN4TyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ2xJLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxlQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksZUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDbEgsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxlQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxPQUFPLENB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