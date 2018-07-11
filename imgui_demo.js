// dear imgui, v1.60 WIP
// (demo code)
System.register(["./imgui"], function (exports_1, context_1) {
    "use strict";
    var ImGui, imgui_1, imgui_2, imgui_3, imgui_4, imgui_5, imgui_6, imgui_7, imgui_8, imgui_9, imgui_10, imgui_11, imgui_12, imgui_13, imgui_14, imgui_15, imgui_16, imgui_17, imgui_18, imgui_19, imgui_20, imgui_21, imgui_22, imgui_23, imgui_24, imgui_25, imgui_26, IM_NEWLINE, Static, _static, ExampleAppConsole, ExampleAppLog;
    var __moduleName = context_1 && context_1.id;
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
            return;
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
                    ImGui.Text("Hiragana: \xe3\x81\x8b\xe3\x81\x8d\xe3\x81\x8f\xe3\x81\x91\xe3\x81\x93 (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                    ImGui.Text("Kanjis: \xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e (nihongo)");
                    /* static */ const buf = STATIC("buf", new imgui_4.ImStringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e"));
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
                        ImGui.Text(`${("0000" + i.toString()).substr(-4)}: scrollable region`);
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
                        const buf = `${("000" + i.toString()).substr(-3)}`;
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
                    const label = ("0000" + i.toString()).substr(-4);
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
        // bool fonts_opened = ImGui.TreeNode("Fonts", "Fonts (%d)", ImGui.GetIO().Fonts->Fonts.Size);
        const fonts_opened = ImGui.TreeNode("Fonts");
        if (fonts_opened) {
            const atlas = ImGui.GetIO().Fonts;
            if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`)) {
                ImGui.Image(atlas.TexID, new imgui_18.ImVec2(atlas.TexWidth, atlas.TexHeight), new imgui_18.ImVec2(0, 0), new imgui_18.ImVec2(1, 1), new imgui_21.ImColor(255, 255, 255, 255).Value, new imgui_21.ImColor(255, 255, 255, 128).Value);
                ImGui.TreePop();
            }
            ImGui.PushItemWidth(100);
            // for (let i = 0; i < atlas->Fonts.Size; i++)
            // {
            //     ImFont* font = atlas->Fonts[i];
            //     ImGui.PushID(font);
            //     bool font_details_opened = ImGui.TreeNode(font, "Font %d: \'%s\', %.2f px, %d glyphs", i, font->ConfigData ? font->ConfigData[0].Name : "", font->FontSize, font->Glyphs.Size);
            //     ImGui.SameLine(); if (ImGui.SmallButton("Set as default")) ImGui.GetIO().FontDefault = font;
            //     if (font_details_opened)
            //     {
            //         ImGui.PushFont(font);
            //         ImGui.Text("The quick brown fox jumps over the lazy dog");
            //         ImGui.PopFont();
            //         ImGui.DragFloat("Font scale", &font->Scale, 0.005f, 0.3f, 2.0f, "%.1f");   // Scale only this font
            //         ImGui.InputFloat("Font offset", &font->DisplayOffset.y, 1, 1, 0);
            //         ImGui.SameLine(); ShowHelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\nFont are currently rendered into bitmaps at a given size at the time of building the atlas. You may oversample them to get some flexibility with scaling. You can also render at multiple sizes and select which one to use at runtime.\n\n(Glimmer of hope: the atlas system should hopefully be rewritten in the future to make scaling more natural and automatic.)");
            //         ImGui.Text("Ascent: %f, Descent: %f, Height: %f", font->Ascent, font->Descent, font->Ascent - font->Descent);
            //         ImGui.Text("Fallback character: '%c' (%d)", font->FallbackChar, font->FallbackChar);
            //         ImGui.Text("Texture surface: %d pixels (approx) ~ %dx%d", font->MetricsTotalSurface, (int)sqrtf((float)font->MetricsTotalSurface), (int)sqrtf((float)font->MetricsTotalSurface));
            //         for (let config_i = 0; config_i < font->ConfigDataCount; config_i++)
            //         {
            //             ImFontConfig* cfg = &font->ConfigData[config_i];
            //             ImGui.BulletText("Input %d: \'%s\', Oversample: (%d,%d), PixelSnapH: %d", config_i, cfg->Name, cfg->OversampleH, cfg->OversampleV, cfg->PixelSnapH);
            //         }
            //         if (ImGui.TreeNode("Glyphs", "Glyphs (%d)", font->Glyphs.Size))
            //         {
            //             // Display all glyphs of the fonts in separate pages of 256 characters
            //             const ImFontGlyph* glyph_fallback = font->FallbackGlyph; // Forcefully/dodgily make FindGlyph() return null on fallback, which isn't the default behavior.
            //             font->FallbackGlyph = null;
            //             for (let base = 0; base < 0x10000; base += 256)
            //             {
            //                 int count = 0;
            //                 for (let n = 0; n < 256; n++)
            //                     count += font->FindGlyph((ImWchar)(base + n)) ? 1 : 0;
            //                 if (count > 0 && ImGui.TreeNode((void*)(intptr_t)base, "U+%04X..U+%04X (%d %s)", base, base+255, count, count > 1 ? "glyphs" : "glyph"))
            //                 {
            //                     float cell_size = font->FontSize * 1;
            //                     float cell_spacing = style.ItemSpacing.y;
            //                     ImVec2 base_pos = ImGui::GetCursorScreenPos();
            //                     ImDrawList* draw_list = ImGui::GetWindowDrawList();
            //                     for (int n = 0; n < 256; n++)
            //                     {
            //                         ImVec2 cell_p1(base_pos.x + (n % 16) * (cell_size + cell_spacing), base_pos.y + (n / 16) * (cell_size + cell_spacing));
            //                         ImVec2 cell_p2(cell_p1.x + cell_size, cell_p1.y + cell_size);
            //                         const ImFontGlyph* glyph = font->FindGlyphNoFallback((ImWchar)(base+n));
            //                         draw_list->AddRect(cell_p1, cell_p2, glyph ? IM_COL32(255,255,255,100) : IM_COL32(255,255,255,50));
            //                         if (glyph)
            //                             font->RenderChar(draw_list, cell_size, cell_p1, ImGui::GetColorU32(ImGuiCol_Text), (ImWchar)(base+n)); // We use ImFont::RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
            //                         if (glyph && ImGui::IsMouseHoveringRect(cell_p1, cell_p2))
            //                         {
            //                             ImGui::BeginTooltip();
            //                             ImGui::Text("Codepoint: U+%04X", base+n);
            //                             ImGui::Separator();
            //                             ImGui::Text("AdvanceX: %.1f", glyph->AdvanceX);
            //                             ImGui::Text("Pos: (%.2f,%.2f)->(%.2f,%.2f)", glyph->X0, glyph->Y0, glyph->X1, glyph->Y1);
            //                             ImGui::Text("UV: (%.3f,%.3f)->(%.3f,%.3f)", glyph->U0, glyph->V0, glyph->U1, glyph->V1);
            //                             ImGui::EndTooltip();
            //                         }
            //                     }
            //                     ImGui::Dummy(ImVec2((cell_size + cell_spacing) * 16, (cell_size + cell_spacing) * 16));
            //                     ImGui::TreePop();
            //                 }
            //             }
            //             font->FallbackGlyph = glyph_fallback;
            //             ImGui.TreePop();
            //         }
            //         ImGui.TreePop();
            //     }
            //     ImGui.PopID();
            // }
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
        if (ImGui.MenuItem("Quit", "Alt+F4")) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLGNBQWM7Ozs7O0lBNkdkLDZEQUE2RDtJQUM3RCxnQkFBZ0IsRUFBVSxFQUFFLEVBQVUsSUFBWSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBa0J4RixnQkFBbUIsR0FBVyxFQUFFLEtBQVE7UUFDcEMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsbURBQW1EO0lBQ25ELCtDQUErQztJQUMvQyxrREFBa0Q7SUFDbEQsMERBQTBEO0lBQzFELG9EQUFvRDtJQUNwRCxzREFBc0Q7SUFDdEQsNkRBQTZEO0lBQzdELHlEQUF5RDtJQUN6RCx3REFBd0Q7SUFDeEQsMkRBQTJEO0lBQzNELDJDQUEyQztJQUMzQyxxQ0FBcUM7SUFFckMsd0JBQXdCLElBQVk7UUFFaEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFDekI7WUFDSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDbEQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RCO0lB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R0FBbUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDOUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzdFLEtBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzdHO2dCQUVEO29CQUNJLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBbUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDNUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzdFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxjQUFjLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQkFFL0QsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFtQixNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBbUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDNUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDcEcsS0FBSyxDQUFDLFdBQVcsQ0FB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TUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDL0c7NEJBQ0ksTUFBTSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzFELElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUM3RDt3QkFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7NEJBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNs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QUFDLENBQUM7Z0JBRTNHLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BELEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWhCLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENB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QUMvRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdkcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6RyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDM0csS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUs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RSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO2dCQUMxTCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMscUVBQXFFO2dCQUNsTSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFZLG1FQUFtRTtnQkFDaE0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxlQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsZ0JBQWdCO2dCQUM3SSxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUs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