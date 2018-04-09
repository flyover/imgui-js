// dear imgui, v1.60 WIP
// (demo code)
System.register(["./imgui"], function (exports_1, context_1) {
    "use strict";
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
    // static void ShowExampleAppFixedOverlay(bool* p_open);
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
        /* static */ const show_app_fixed_overlay = STATIC("show_app_fixed_overlay", false);
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
        if (show_app_fixed_overlay.value)
            ShowExampleAppFixedOverlay((value = show_app_fixed_overlay.value) => show_app_fixed_overlay.value = value);
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
            window_flags |= imgui_1.ImGuiWindowFlags.NoTitleBar;
        if (no_scrollbar.value)
            window_flags |= imgui_1.ImGuiWindowFlags.NoScrollbar;
        if (!no_menu.value)
            window_flags |= imgui_1.ImGuiWindowFlags.MenuBar;
        if (no_move.value)
            window_flags |= imgui_1.ImGuiWindowFlags.NoMove;
        if (no_resize.value)
            window_flags |= imgui_1.ImGuiWindowFlags.NoResize;
        if (no_collapse.value)
            window_flags |= imgui_1.ImGuiWindowFlags.NoCollapse;
        if (no_nav.value)
            window_flags |= imgui_1.ImGuiWindowFlags.NoNav;
        if (no_close.value)
            p_open = null; // Don't pass our bool* to Begin
        ImGui.SetNextWindowSize(new imgui_2.ImVec2(550, 680), imgui_3.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("ImGui Demo", p_open, window_flags)) {
            // Early out if the window is collapsed, as an optimization.
            ImGui.End();
            return;
        }
        //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // 2/3 of the space for widget and 1/3 for labels
        ImGui.PushItemWidth(-140); // Right align, keep 140 pixels for labels
        ImGui.Text(`dear imgui says hello. (${imgui_4.IMGUI_VERSION})`);
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
                ImGui.MenuItem("Simple overlay", null, (value = show_app_fixed_overlay.value) => show_app_fixed_overlay.value = value);
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
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_6.ImColor.HSV(i / 7.0, 0.6, 0.6));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_6.ImColor.HSV(i / 7.0, 0.7, 0.7));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_6.ImColor.HSV(i / 7.0, 0.8, 0.8));
                    ImGui.Button("Click");
                    ImGui.PopStyleColor(3);
                    ImGui.PopID();
                }
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
                    ImGui.PlotLines_Array("Curve", arr.value, imgui_7.IM_ARRAYSIZE(arr.value));
                    ImGui.EndTooltip();
                }
                ImGui.Separator();
                ImGui.LabelText("label", "Value");
                {
                    // Using the _simplified_ one-liner Combo() api here
                    const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO"];
                    /* static */ const item_current = STATIC("item_current", 0);
                    ImGui.Combo("combo", (value = item_current.value) => item_current.value = value, items, imgui_7.IM_ARRAYSIZE(items));
                    ImGui.SameLine();
                    ShowHelpMarker("Refer to the \"Combo\" section below for an explanation of the full BeginCombo/EndCombo API, and demonstration of various flags.\n");
                }
                {
                    /* static */ const str0 = STATIC("str0", new imgui_8.ImStringBuffer(128, "Hello, world!"));
                    /* static */ const i0 = STATIC("i0", 123);
                    /* static */ const f0 = STATIC("f0#400", 0.001);
                    ImGui.InputText("input text", str0.value, imgui_7.IM_ARRAYSIZE(str0.value));
                    ImGui.SameLine();
                    ShowHelpMarker("Hold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n");
                    ImGui.InputInt("input int", (value = i0.value) => i0.value = value);
                    ImGui.SameLine();
                    ShowHelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\nUse +- to subtract.\n");
                    ImGui.InputFloat("input float", (value = f0.value) => f0.value = value, 0.01, 1.0);
                    // NB: You can use the %e notation as well.
                    /* static */ const d0 = STATIC("d0", 999999.000001);
                    ImGui.InputDouble("input double", (value = d0.value) => d0.value = value, 0.01, 1.0, "%.6f");
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
                    ImGui.DragInt("drag int 0..100", (value = i2.value) => i2.value = value, 1, 0, 100, "%.0f%%");
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
                    ImGui.SliderFloat("slider log float", (value = f2.value) => f2.value = value, -10.0, 10.0, "%.4f", 3.0);
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
                    ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, imgui_7.IM_ARRAYSIZE(listbox_items), 4);
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
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.IndentSpacing, ImGui.GetFontSize() * 3); // Increase spacing to differentiate leaves from expanded contents.
                    for (let i = 0; i < 6; i++) {
                        // Disable the default open on single-click behavior and pass in Selected flag according to our selection state.
                        let node_flags = imgui_10.ImGuiTreeNodeFlags.OpenOnArrow | imgui_10.ImGuiTreeNodeFlags.OpenOnDoubleClick | ((selection_mask.value & (1 << i)) ? imgui_10.ImGuiTreeNodeFlags.Selected : 0);
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
                            node_flags |= imgui_10.ImGuiTreeNodeFlags.Leaf | imgui_10.ImGuiTreeNodeFlags.NoTreePushOnOpen; // ImGuiTreeNodeFlags.Bullet
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
                    if (align_label_with_current_x_position)
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
                    ImGui.TextColored(new imgui_11.ImVec4(1.0, 0.0, 1.0, 1.0), "Pink");
                    ImGui.TextColored(new imgui_11.ImVec4(1.0, 1.0, 0.0, 1.0), "Yellow");
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
                    ImGui.GetWindowDrawList().AddRectFilled(new imgui_2.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_2.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_12.IM_COL32(255, 0, 255, 255));
                    ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                    ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                    ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_12.IM_COL32(255, 255, 0, 255));
                    ImGui.PopTextWrapPos();
                    ImGui.Text("Test paragraph 2:");
                    pos = ImGui.GetCursorScreenPos();
                    ImGui.GetWindowDrawList().AddRectFilled(new imgui_2.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_2.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_12.IM_COL32(255, 0, 255, 255));
                    ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                    ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                    ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_12.IM_COL32(255, 255, 0, 255));
                    ImGui.PopTextWrapPos();
                    ImGui.TreePop();
                }
                if (ImGui.TreeNode("UTF-8 Text")) {
                    // UTF-8 test with Japanese characters
                    // (needs a suitable font, try Arial Unicode or M+ fonts http://mplus-fonts.sourceforge.jp/mplus-outline-fonts/index-en.html)
                    // - From C++11 you can use the u8"my text" syntax to encode literal strings as UTF-8
                    // - For earlier compiler, you may be able to encode your sources as UTF-8 (e.g. Visual Studio save your file as 'UTF-8 without signature')
                    // - HOWEVER, FOR THIS DEMO FILE, BECAUSE WE WANT TO SUPPORT COMPILER, WE ARE *NOT* INCLUDING RAW UTF-8 CHARACTERS IN THIS SOURCE FILE.
                    //   Instead we are encoding a few string with hexadecimal constants. Don't do this in your application!
                    // Note that characters values are preserved even by InputText() if the font cannot be displayed, so you can safely copy & paste garbled characters into another application.
                    ImGui.TextWrapped("CJK text will only appears if the font was loaded with the appropriate CJK character ranges. Call io.Font->LoadFromFileTTF() manually to load extra character ranges.");
                    ImGui.Text("Hiragana: \xe3\x81\x8b\xe3\x81\x8d\xe3\x81\x8f\xe3\x81\x91\xe3\x81\x93 (kakikukeko)");
                    ImGui.Text("Kanjis: \xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e (nihongo)");
                    /* static */ const buf = STATIC("buf", new imgui_8.ImStringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e")); // "nihongo"
                    ImGui.InputText("UTF-8 input", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
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
                ImGui.Image(my_tex_id, new imgui_2.ImVec2(my_tex_w, my_tex_h), new imgui_2.ImVec2(0, 0), new imgui_2.ImVec2(1, 1), new imgui_11.ImVec4(1.0, 1.0, 1.0, 1.0), new imgui_11.ImVec4(1.0, 1.0, 1.0, 0.5));
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
                    const uv0 = new imgui_2.ImVec2((region_x) / my_tex_w, (region_y) / my_tex_h);
                    const uv1 = new imgui_2.ImVec2((region_x + region_sz) / my_tex_w, (region_y + region_sz) / my_tex_h);
                    ImGui.Image(my_tex_id, new imgui_2.ImVec2(region_sz * zoom, region_sz * zoom), uv0, uv1, new imgui_6.ImColor(255, 255, 255, 255).toImVec4(), new imgui_6.ImColor(255, 255, 255, 128).toImVec4());
                    ImGui.EndTooltip();
                }
                ImGui.TextWrapped("And now some textured buttons..");
                /* static */ const pressed_count = STATIC("pressed_count", 0);
                for (let i = 0; i < 8; i++) {
                    ImGui.PushID(i);
                    const frame_padding = -1 + i; // -1 = uses default padding
                    if (ImGui.ImageButton(my_tex_id, new imgui_2.ImVec2(32, 32), new imgui_2.ImVec2(0, 0), new imgui_2.ImVec2(32.0 / my_tex_w, 32 / my_tex_h), frame_padding, new imgui_11.ImVec4(0, 0, 0, 1)))
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
                /* static */ const item_current = STATIC("item_current", items[0]); // Here our selection is a single pointer stored outside the object.
                if (ImGui.BeginCombo("combo 1", item_current.value, flags.value)) // The second parameter is the label previewed before opening the combo.
                 {
                    for (let n = 0; n < imgui_7.IM_ARRAYSIZE(items); n++) {
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
                ImGui.Combo("combo 3 (array)", (value = item_current_3.value) => item_current_3.value = value, items, imgui_7.IM_ARRAYSIZE(items));
                // Simplified one-liner Combo() using an accessor function
                // struct FuncHolder { static bool ItemGetter(void* data, int idx, const char** out_str) { *out_str = ((const char**)data)[idx]; return true; } };
                // class FuncHolder { public static ItemGetter(data: any, idx: number, out_str: string[]): boolean { return true; } }
                // /* static */ const item_current_4: Static<number> = STATIC("item_current_4", 0);
                // ImGui.Combo("combo 4 (function)", (value = item_current_4.value) => item_current_4.value = value, FuncHolder.ItemGetter, items, IM_ARRAYSIZE(items));
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
                    if (ImGui.Selectable("5. I am double clickable", selection.value[4], imgui_13.ImGuiSelectableFlags.AllowDoubleClick))
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
                        if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new imgui_2.ImVec2(50, 50))) {
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
                /* static */ const buf1 = STATIC("buf1", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("default", buf1.value, imgui_7.IM_ARRAYSIZE(buf1.value));
                /* static */ const buf2 = STATIC("buf2", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("decimal", buf2.value, imgui_7.IM_ARRAYSIZE(buf2.value), imgui_14.ImGuiInputTextFlags.CharsDecimal);
                /* static */ const buf3 = STATIC("buf3", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("hexadecimal", buf3.value, imgui_7.IM_ARRAYSIZE(buf3.value), imgui_14.ImGuiInputTextFlags.CharsHexadecimal | imgui_14.ImGuiInputTextFlags.CharsUppercase);
                /* static */ const buf4 = STATIC("buf4", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("uppercase", buf4.value, imgui_7.IM_ARRAYSIZE(buf4.value), imgui_14.ImGuiInputTextFlags.CharsUppercase);
                /* static */ const buf5 = STATIC("buf5", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("no blank", buf5.value, imgui_7.IM_ARRAYSIZE(buf5.value), imgui_14.ImGuiInputTextFlags.CharsNoBlank);
                class TextFilters {
                    static FilterImGuiLetters(data) { if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar)))
                        return 0; return 1; }
                }
                /* static */ const buf6 = STATIC("buf6", new imgui_8.ImStringBuffer(64, ""));
                ImGui.InputText("\"imgui\" letters", buf6.value, imgui_7.IM_ARRAYSIZE(buf6.value), imgui_14.ImGuiInputTextFlags.CallbackCharFilter, TextFilters.FilterImGuiLetters);
                ImGui.Text("Password input");
                /* static */ const bufpass = STATIC("bufpass", new imgui_8.ImStringBuffer(64, "password123"));
                ImGui.InputText("password", bufpass.value, imgui_7.IM_ARRAYSIZE(bufpass.value), imgui_14.ImGuiInputTextFlags.Password | imgui_14.ImGuiInputTextFlags.CharsNoBlank);
                ImGui.SameLine();
                ShowHelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
                ImGui.InputText("password (clear)", bufpass.value, imgui_7.IM_ARRAYSIZE(bufpass.value), imgui_14.ImGuiInputTextFlags.CharsNoBlank);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Multi-line Text Input")) {
                /* static */ const read_only = STATIC("read_only", false);
                /* static */ const text = STATIC("text", new imgui_8.ImStringBuffer(1024 * 16, "/*\n" +
                    " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
                    " the hexadecimal encoding of one offending instruction,\n" +
                    " more formally, the invalid operand with locked CMPXCHG8B\n" +
                    " instruction bug, is a design flaw in the majority of\n" +
                    " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
                    " processors (all in the P5 microarchitecture).\n" +
                    "*/\n\n" +
                    "label:\n" +
                    "\tlock cmpxchg8b eax\n"));
                ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FramePadding, new imgui_2.ImVec2(0, 0));
                ImGui.Checkbox("Read-only", (value = read_only.value) => read_only.value = value);
                ImGui.PopStyleVar();
                ImGui.InputTextMultiline("##source", text.value, imgui_7.IM_ARRAYSIZE(text.value), new imgui_2.ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), imgui_14.ImGuiInputTextFlags.AllowTabInput | (read_only.value ? imgui_14.ImGuiInputTextFlags.ReadOnly : 0));
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Plots widgets")) {
                /* static */ const animate = STATIC("animate", true);
                ImGui.Checkbox("Animate", (value = animate.value) => animate.value = value);
                /* static */ const arr = STATIC("arr", [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
                ImGui.PlotLines_Array("Frame Times", arr.value, imgui_7.IM_ARRAYSIZE(arr.value));
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
                    values_offset.value = (values_offset.value + 1) % imgui_7.IM_ARRAYSIZE(values.value);
                    phase.value += 0.10 * values_offset.value;
                    refresh_time.value += 1.0 / 60.0;
                }
                ImGui.PlotLines_Array("Lines", values.value, imgui_7.IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new imgui_2.ImVec2(0, 80));
                ImGui.PlotHistogram_Array("Histogram", arr.value, imgui_7.IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new imgui_2.ImVec2(0, 80));
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
                ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_2.ImVec2(0, 80));
                ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_2.ImVec2(0, 80));
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
                ImGui.ProgressBar(progress.value, new imgui_2.ImVec2(0.0, 0.0));
                ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                ImGui.Text("Progress Bar");
                const progress_saturated = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
                const buf = `${(progress_saturated * 1753).toFixed(0)}/${1753}`;
                ImGui.ProgressBar(progress.value, new imgui_2.ImVec2(0., 0.), buf);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Color/Picker Widgets")) {
                /* static */ const color = STATIC("color#863", new imgui_6.ImColor(114, 144, 154, 200).toImVec4());
                /* static */ const alpha_preview = STATIC("alpha_preview", true);
                /* static */ const alpha_half_preview = STATIC("alpha_half_preview", false);
                /* static */ const options_menu = STATIC("options_menu", true);
                /* static */ const hdr = STATIC("hdr", false);
                ImGui.Checkbox("With Alpha Preview", (value = alpha_preview.value) => alpha_preview.value = value);
                ImGui.Checkbox("With Half Alpha Preview", (value = alpha_half_preview.value) => alpha_half_preview.value = value);
                ImGui.Checkbox("With Options Menu", (value = options_menu.value) => options_menu.value = value);
                ImGui.SameLine();
                ShowHelpMarker("Right-click on the individual color widget to show options.");
                ImGui.Checkbox("With HDR", (value = hdr.value) => hdr.value = value);
                ImGui.SameLine();
                ShowHelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
                const misc_flags = (hdr.value ? imgui_15.ImGuiColorEditFlags.HDR : 0) | (alpha_half_preview.value ? imgui_15.ImGuiColorEditFlags.AlphaPreviewHalf : (alpha_preview.value ? imgui_15.ImGuiColorEditFlags.AlphaPreview : 0)) | (options_menu.value ? 0 : imgui_15.ImGuiColorEditFlags.NoOptions);
                ImGui.Text("Color widget:");
                ImGui.SameLine();
                ShowHelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
                ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);
                ImGui.Text("Color widget HSV with Alpha:");
                ImGui.ColorEdit4("MyColor##2", color.value, imgui_15.ImGuiColorEditFlags.HSV | misc_flags);
                ImGui.Text("Color widget with Float Display:");
                ImGui.ColorEdit4("MyColor##2f", color.value, imgui_15.ImGuiColorEditFlags.Float | misc_flags);
                ImGui.Text("Color button with Picker:");
                ImGui.SameLine();
                ShowHelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
                ImGui.ColorEdit4("MyColor##3", color.value, imgui_15.ImGuiColorEditFlags.NoInputs | imgui_15.ImGuiColorEditFlags.NoLabel | misc_flags);
                ImGui.Text("Color button with Custom Picker Popup:");
                // Generate a dummy palette
                /* static */ const saved_palette_inited = STATIC("saved_palette_inited", false);
                /* static */ const saved_palette = STATIC("saved_palette", []);
                if (!saved_palette_inited.value)
                    for (let n = 0; n < 32; n++) {
                        saved_palette.value[n] = new imgui_11.ImVec4();
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
                /* static */ const backup_color = STATIC("backup_color", new imgui_11.ImVec4());
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
                    ImGui.ColorPicker4("##picker", color.value, misc_flags | imgui_15.ImGuiColorEditFlags.NoSidePreview | imgui_15.ImGuiColorEditFlags.NoSmallPreview);
                    ImGui.SameLine();
                    ImGui.BeginGroup();
                    ImGui.Text("Current");
                    ImGui.ColorButton("##current", color.value, imgui_15.ImGuiColorEditFlags.NoPicker | imgui_15.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_2.ImVec2(60, 40));
                    ImGui.Text("Previous");
                    if (ImGui.ColorButton("##previous", backup_color.value, imgui_15.ImGuiColorEditFlags.NoPicker | imgui_15.ImGuiColorEditFlags.AlphaPreviewHalf, new imgui_2.ImVec2(60, 40)))
                        color.value.Copy(backup_color.value);
                    ImGui.Separator();
                    ImGui.Text("Palette");
                    for (let n = 0; n < imgui_7.IM_ARRAYSIZE(saved_palette.value); n++) {
                        ImGui.PushID(n);
                        if ((n % 8) !== 0)
                            ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                        if (ImGui.ColorButton("##palette", saved_palette.value[n], imgui_15.ImGuiColorEditFlags.NoAlpha | imgui_15.ImGuiColorEditFlags.NoPicker | imgui_15.ImGuiColorEditFlags.NoTooltip, new imgui_2.ImVec2(20, 20)))
                            color.value.Copy(new imgui_11.ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!
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
                ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new imgui_2.ImVec2(80, 80));
                ImGui.Text("Color picker:");
                /* static */ const alpha = STATIC("alpha", true);
                /* static */ const alpha_bar = STATIC("alpha_bar", true);
                /* static */ const side_preview = STATIC("side_preview", true);
                /* static */ const ref_color = STATIC("ref_color", false);
                /* static */ const ref_color_v = STATIC("ref_color_v", new imgui_11.ImVec4(1.0, 0.0, 1.0, 0.5));
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
                        ImGui.ColorEdit4("##RefColor", ref_color_v.value, imgui_15.ImGuiColorEditFlags.NoInputs | misc_flags);
                    }
                }
                ImGui.Combo("Inputs Mode", (value = inputs_mode.value) => inputs_mode.value = value, "All Inputs\0No Inputs\0RGB Input\0HSV Input\0HEX Input\0");
                ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
                ImGui.SameLine();
                ShowHelpMarker("User can right-click the picker to change mode.");
                let flags = misc_flags;
                if (!alpha.value)
                    flags |= imgui_15.ImGuiColorEditFlags.NoAlpha; // This is by default if you call ColorPicker3() instead of ColorPicker4()
                if (alpha_bar.value)
                    flags |= imgui_15.ImGuiColorEditFlags.AlphaBar;
                if (!side_preview.value)
                    flags |= imgui_15.ImGuiColorEditFlags.NoSidePreview;
                if (picker_mode.value === 1)
                    flags |= imgui_15.ImGuiColorEditFlags.PickerHueBar;
                if (picker_mode.value === 2)
                    flags |= imgui_15.ImGuiColorEditFlags.PickerHueWheel;
                if (inputs_mode.value === 1)
                    flags |= imgui_15.ImGuiColorEditFlags.NoInputs;
                if (inputs_mode.value === 2)
                    flags |= imgui_15.ImGuiColorEditFlags.RGB;
                if (inputs_mode.value === 3)
                    flags |= imgui_15.ImGuiColorEditFlags.HSV;
                if (inputs_mode.value === 4)
                    flags |= imgui_15.ImGuiColorEditFlags.HEX;
                ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);
                ImGui.Text("Programmatically set defaults/options:");
                ImGui.SameLine();
                ShowHelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
                if (ImGui.Button("Uint8 + HSV"))
                    ImGui.SetColorEditOptions(imgui_15.ImGuiColorEditFlags.Uint8 | imgui_15.ImGuiColorEditFlags.HSV);
                ImGui.SameLine();
                if (ImGui.Button("Float + HDR"))
                    ImGui.SetColorEditOptions(imgui_15.ImGuiColorEditFlags.Float | imgui_15.ImGuiColorEditFlags.RGB);
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Range Widgets")) {
                /* static */ const begin = STATIC("begin", 10), end = STATIC("end", 90);
                /* static */ const begin_i = STATIC("begin_i", 100), end_i = STATIC("end_i", 1000);
                ImGui.DragFloatRange2("range", (value = begin.value) => begin.value = value, (value = end.value) => end.value = value, 0.25, 0.0, 100.0, "Min: %.1f %%", "Max: %.1f %%");
                ImGui.DragIntRange2("range int (no bounds)", (value = begin_i.value) => begin_i.value = value, (value = end_i.value) => end_i.value = value, 5, 0, 0, "Min: %.0f units", "Max: %.0f units");
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Multi-component Widgets")) {
                /* static */ const vec4f = STATIC("vec4f", [0.10, 0.20, 0.30, 0.44]);
                /* static */ const vec4i = STATIC("vec4i", [1, 5, 100, 255]);
                ImGui.InputFloat2("input float2", vec4f.value);
                ImGui.DragFloat2("drag float2", vec4f.value, 0.01, 0.0, 1.0);
                ImGui.SliderFloat2("slider float2", vec4f.value, 0.0, 1.0);
                ImGui.DragInt2("drag int2", vec4i.value, 1, 0, 255);
                ImGui.InputInt2("input int2", vec4i.value);
                ImGui.SliderInt2("slider int2", vec4i.value, 0, 255);
                ImGui.Spacing();
                ImGui.InputFloat3("input float3", vec4f.value);
                ImGui.DragFloat3("drag float3", vec4f.value, 0.01, 0.0, 1.0);
                ImGui.SliderFloat3("slider float3", vec4f.value, 0.0, 1.0);
                ImGui.DragInt3("drag int3", vec4i.value, 1, 0, 255);
                ImGui.InputInt3("input int3", vec4i.value);
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
                ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.ItemSpacing, new imgui_2.ImVec2(spacing, spacing));
                /* static */ const int_value = STATIC("int_value", 0);
                ImGui.VSliderInt("##int", new imgui_2.ImVec2(18, 160), (value = int_value.value) => int_value.value = value, 0, 5);
                ImGui.SameLine();
                /* static */ const values = STATIC("values#1072", [0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0]);
                ImGui.PushID("set1");
                for (let i = 0; i < 7; i++) {
                    if (i > 0)
                        ImGui.SameLine();
                    ImGui.PushID(i);
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBg, imgui_6.ImColor.HSV(i / 7.0, 0.5, 0.5));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgHovered, imgui_6.ImColor.HSV(i / 7.0, 0.6, 0.5));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.FrameBgActive, imgui_6.ImColor.HSV(i / 7.0, 0.7, 0.5));
                    ImGui.PushStyleColor(imgui_5.ImGuiCol.SliderGrab, imgui_6.ImColor.HSV(i / 7.0, 0.9, 0.9));
                    ImGui.VSliderFloat("##v", new imgui_2.ImVec2(18, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
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
                const small_slider_size = new imgui_2.ImVec2(18, (160.0 - (rows - 1) * spacing) / rows);
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
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.GrabMinSize, 40);
                    ImGui.VSliderFloat("##v", new imgui_2.ImVec2(40, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
                    ImGui.PopStyleVar();
                    ImGui.PopID();
                }
                ImGui.PopID();
                ImGui.PopStyleVar();
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
                goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, imgui_14.ImGuiInputTextFlags.EnterReturnsTrue) || goto_line;
                ImGui.PopItemWidth();
                // Child 1: no border, enable horizontal scrollbar
                {
                    ImGui.BeginChild("Child1", new imgui_2.ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5, 300), false, imgui_1.ImGuiWindowFlags.HorizontalScrollbar | (disable_mouse_wheel.value ? imgui_1.ImGuiWindowFlags.NoScrollWithMouse : 0));
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
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.ChildRounding, 5.0);
                    ImGui.BeginChild("Child2", new imgui_2.ImVec2(0, 300), true, (disable_mouse_wheel.value ? imgui_1.ImGuiWindowFlags.NoScrollWithMouse : 0) | (disable_menu.value ? 0 : imgui_1.ImGuiWindowFlags.MenuBar));
                    if (!disable_menu.value && ImGui.BeginMenuBar()) {
                        if (ImGui.BeginMenu("Menu")) {
                            ShowExampleMenuFile();
                            ImGui.EndMenu();
                        }
                        ImGui.EndMenuBar();
                    }
                    ImGui.Columns(2);
                    for (let i = 0; i < 100; i++) {
                        if (i === 50)
                            ImGui.NextColumn();
                        const buf = `${("00000000" + (i * 5731).toString(16)).substr(-8)}`;
                        ImGui.Button(buf, new imgui_2.ImVec2(-1.0, 0.0));
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
                ImGui.TextColored(new imgui_11.ImVec4(1, 1, 0, 1), "Sailor");
                // Adjust spacing
                ImGui.Text("More spacing: Hello");
                ImGui.SameLine(0, 20);
                ImGui.TextColored(new imgui_11.ImVec4(1, 1, 0, 1), "Sailor");
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
                ImGui.Combo("Combo", (value = item.value) => item.value = value, items, imgui_7.IM_ARRAYSIZE(items));
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
                    ImGui.ListBox("", (value = selection.value[i]) => selection.value[i] = value, items, imgui_7.IM_ARRAYSIZE(items));
                    ImGui.PopID();
                    if (ImGui.IsItemHovered())
                        ImGui.SetTooltip(`ListBox ${i} hovered`);
                }
                ImGui.PopItemWidth();
                // Dummy
                const sz = new imgui_2.ImVec2(30, 30);
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
                ImGui.PlotHistogram_Array("##values", values, imgui_7.IM_ARRAYSIZE(values), 0, null, 0.0, 1.0, size);
                ImGui.Button("ACTION", new imgui_2.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
                ImGui.SameLine();
                ImGui.Button("REACTION", new imgui_2.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
                ImGui.EndGroup();
                ImGui.SameLine();
                ImGui.Button("LEVERAGE\nBUZZWORD", size);
                ImGui.SameLine();
                ImGui.ListBoxHeader("List", size);
                ImGui.Selectable("Selected", true);
                ImGui.Selectable("Not Selected", false);
                ImGui.ListBoxFooter();
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
                track.value = ImGui.DragInt("##line", (value = track_line.value) => track_line.value = value, 0.25, 0, 99, "Line = %.0f") || track.value;
                let scroll_to = ImGui.Button("Scroll To Pos");
                ImGui.SameLine(130);
                scroll_to = ImGui.DragInt("##pos_y", (value = scroll_to_px.value) => scroll_to_px.value = value, 1.00, 0, 9999, "Y = %.0f px") || scroll_to;
                ImGui.PopItemWidth();
                if (scroll_to)
                    track.value = false;
                for (let i = 0; i < 5; i++) {
                    if (i > 0)
                        ImGui.SameLine();
                    ImGui.BeginGroup();
                    ImGui.Text(i === 0 ? "Top" : i === 1 ? "25%" : i === 2 ? "Center" : i === 3 ? "75%" : "Bottom");
                    ImGui.BeginChild(ImGui.GetID(i), new imgui_2.ImVec2(ImGui.GetWindowWidth() * 0.17, 200.0), true);
                    if (scroll_to)
                        ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_px.value, i * 0.25);
                    for (let line = 0; line < 100; line++) {
                        if (track.value && line === track_line.value) {
                            ImGui.TextColored(new imgui_6.ImColor(255, 255, 0), `Line ${line}`);
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
                ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FrameRounding, 3.0);
                ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FramePadding, new imgui_2.ImVec2(2.0, 1.0));
                ImGui.BeginChild("scrolling", new imgui_2.ImVec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30), true, imgui_1.ImGuiWindowFlags.HorizontalScrollbar);
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
                        ImGui.PushStyleColor(imgui_5.ImGuiCol.Button, imgui_6.ImColor.HSV(hue, 0.6, 0.6));
                        ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonHovered, imgui_6.ImColor.HSV(hue, 0.7, 0.7));
                        ImGui.PushStyleColor(imgui_5.ImGuiCol.ButtonActive, imgui_6.ImColor.HSV(hue, 0.8, 0.8));
                        ImGui.Button(label, new imgui_2.ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
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
                /* static */ const size = STATIC("size", new imgui_2.ImVec2(100, 100)), offset = STATIC("offset", new imgui_2.ImVec2(50, 20));
                ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
                ImGui.DragFloat2("size", size.value, 0.5, 0.0, 200.0, "%.0f");
                ImGui.TextWrapped("(Click and drag)");
                const pos = ImGui.GetCursorScreenPos();
                const clip_rect = new imgui_11.ImVec4(pos.x, pos.y, pos.x + size.value.x, pos.y + size.value.y);
                ImGui.InvisibleButton("##dummy", size.value);
                if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) {
                    offset.value.x += ImGui.GetIO().MouseDelta.x;
                    offset.value.y += ImGui.GetIO().MouseDelta.y;
                }
                ImGui.GetWindowDrawList().AddRectFilled(pos, new imgui_2.ImVec2(pos.x + size.value.x, pos.y + size.value.y), imgui_12.IM_COL32(90, 90, 120, 255));
                ImGui.GetWindowDrawList().AddText_Font(ImGui.GetFont(), ImGui.GetFontSize() * 2.0, new imgui_2.ImVec2(pos.x + offset.value.x, pos.y + offset.value.y), imgui_12.IM_COL32(255, 255, 255, 255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
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
                    for (let i = 0; i < imgui_7.IM_ARRAYSIZE(names); i++)
                        if (ImGui.Selectable(names[i]))
                            selected_fish.value = i;
                    ImGui.EndPopup();
                }
                // Showing a menu with toggles
                if (ImGui.Button("Toggle.."))
                    ImGui.OpenPopup("toggle");
                if (ImGui.BeginPopup("toggle")) {
                    for (let i = 0; i < imgui_7.IM_ARRAYSIZE(names); i++) {
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
                        for (let i = 0; i < imgui_7.IM_ARRAYSIZE(names); i++) {
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
                /* static */ const name = STATIC("name", new imgui_8.ImStringBuffer(32, "Label1"));
                const buf = `Button: ${name.value.buffer}###Button`; // ### operator override ID ignoring the preceding label
                ImGui.Button(buf);
                if (ImGui.BeginPopupContextItem()) // When used after an item that has an ID (here the Button), we can skip providing an ID to BeginPopupContextItem().
                 {
                    ImGui.Text("Edit name:");
                    ImGui.InputText("##edit", name.value, imgui_7.IM_ARRAYSIZE(name.value));
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
                if (ImGui.BeginPopupModal("Delete?", null, imgui_1.ImGuiWindowFlags.AlwaysAutoResize)) {
                    ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
                    ImGui.Separator();
                    ///* static */ const dummy_i: number = 0;
                    //ImGui.Combo("Combo", &dummy_i, "Delete\0Delete harder\0");
                    /* static */ const dont_ask_me_next_time = STATIC("dont_ask_me_next_time", false);
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FramePadding, new imgui_2.ImVec2(0, 0));
                    ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
                    ImGui.PopStyleVar();
                    if (ImGui.Button("OK", new imgui_2.ImVec2(120, 0))) {
                        ImGui.CloseCurrentPopup();
                    }
                    ImGui.SetItemDefaultFocus();
                    ImGui.SameLine();
                    if (ImGui.Button("Cancel", new imgui_2.ImVec2(120, 0))) {
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
                    if (ImGui.Selectable(label, selected.value === i, imgui_13.ImGuiSelectableFlags.SpanAllColumns))
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
                ImGui.InputFloat("red", (value = foo.value) => foo.value = value, 0.05, 0, 3);
                ImGui.Text("An extra line here.");
                ImGui.NextColumn();
                ImGui.Text("Sailor");
                ImGui.Button("Corniflower");
                /* static */ const bar = STATIC("bar", 1.0);
                ImGui.InputFloat("blue", (value = bar.value) => bar.value = value, 0.05, 0, 3);
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
                ImGui.SetNextWindowContentSize(new imgui_2.ImVec2(1500.0, 0.0));
                ImGui.BeginChild("##ScrollingRegion", new imgui_2.ImVec2(0, ImGui.GetFontSize() * 20), false, imgui_1.ImGuiWindowFlags.HorizontalScrollbar);
                ImGui.Columns(10);
                const ITEMS_COUNT = 2000;
                const clipper = new imgui_16.ImGuiListClipper(ITEMS_COUNT); // Also demonstrate using the clipper for large list
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
            /* static */ const filter = STATIC("filter#1864", new imgui_17.ImGuiTextFilter());
            ImGui.Text("Filter usage:\n"
                + "  \"\"         display all lines\n"
                + "  \"xxx\"      display lines containing \"xxx\"\n"
                + "  \"xxx,yyy\"  display lines containing \"xxx\" or \"yyy\"\n"
                + "  \"-xxx\"     hide lines containing \"xxx\"");
            filter.value.Draw();
            const lines = ["aaa1.c", "bbb1.c", "ccc1.c", "aaa2.cpp", "bbb2.cpp", "ccc2.cpp", "abc.h", "hello, world"];
            for (let i = 0; i < imgui_7.IM_ARRAYSIZE(lines); i++)
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
            ImGui.CheckboxFlags("io.ConfigFlags: EnableGamepad", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableGamepad);
            ImGui.CheckboxFlags("io.ConfigFlags: EnableKeyboard", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableKeyboard);
            ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NavEnableSetMousePos);
            ImGui.SameLine();
            ShowHelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGuiConfigFlags_NavEnableSetMousePos.");
            ImGui.CheckboxFlags("io.ConfigFlags: NoMouseCursorChange", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.NoMouseCursorChange);
            ImGui.SameLine();
            ShowHelpMarker("Instruct back-end to not alter mouse cursor shape and visibility.");
            if (ImGui.TreeNode("Keyboard, Mouse & Navigation State")) {
                if (ImGui.IsMousePosValid())
                    ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.x})`);
                else
                    ImGui.Text("Mouse pos: <INVALID>");
                ImGui.Text("Mouse down:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (io.MouseDownDuration[i] >= 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i} (${io.MouseDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Mouse clicked:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseClicked(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text("Mouse dbl-clicked:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseDoubleClicked(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text("Mouse released:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.MouseDown); i++)
                    if (ImGui.IsMouseReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text(`Mouse wheel: ${io.MouseWheel.toFixed(1)}`);
                ImGui.Text("Keys down:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (io.KeysDownDuration[i] >= 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (${io.KeysDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Keys pressed:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyPressed(i)) {
                        ImGui.SameLine();
                        ImGui.Text(i.toString());
                    }
                ImGui.Text("Keys release:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(i.toString());
                    }
                ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);
                ImGui.Text("NavInputs down:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputs[i] > 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}] ${io.NavInputs[i].toFixed(2)}`);
                    }
                ImGui.Text("NavInputs pressed:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputsDownDuration[i] === 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}]`);
                    }
                ImGui.Text("NavInputs duration:");
                for (let i = 0; i < imgui_7.IM_ARRAYSIZE(io.NavInputs); i++)
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
                /* static */ const buf = STATIC("buf1#1921", new imgui_8.ImStringBuffer(32, "dummy"));
                ImGui.InputText("1", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                ImGui.InputText("2", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                ImGui.InputText("3", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                ImGui.PushAllowKeyboardFocus(false);
                ImGui.InputText("4 (tab skip)", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                //ImGui.SameLine(); ShowHelperMarker("Use ImGui.PushAllowKeyboardFocus(bool)\nto disable tabbing through certain widgets.");
                ImGui.PopAllowKeyboardFocus();
                ImGui.InputText("5", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Focus from code")) {
                const focus_1 = ImGui.Button("Focus on 1");
                ImGui.SameLine();
                const focus_2 = ImGui.Button("Focus on 2");
                ImGui.SameLine();
                const focus_3 = ImGui.Button("Focus on 3");
                let has_focus = 0;
                /* static */ const buf = STATIC("buf2#1944", new imgui_8.ImStringBuffer(128, "click on a button to set focus"));
                if (focus_1)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("1", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 1;
                if (focus_2)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("2", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 2;
                ImGui.PushAllowKeyboardFocus(false);
                if (focus_3)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("3 (tab skip)", buf.value, imgui_7.IM_ARRAYSIZE(buf.value));
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
            if (ImGui.TreeNode("Focused & Hovered Test")) {
                /* static */ const embed_all_inside_a_child_window = STATIC("embed_all_inside_a_child_window", false);
                ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
                if (embed_all_inside_a_child_window.value)
                    ImGui.BeginChild("embeddingchild", new imgui_2.ImVec2(0, ImGui.GetFontSize() * 25), true);
                // Testing IsWindowFocused() function with its various flags (note that the flags can be combined)
                ImGui.BulletText(`IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
                    `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(imgui_18.ImGuiFocusedFlags.ChildWindows)}\n` +
                    `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(imgui_18.ImGuiFocusedFlags.ChildWindows | imgui_18.ImGuiFocusedFlags.RootWindow)}\n` +
                    `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(imgui_18.ImGuiFocusedFlags.RootWindow)}\n` +
                    `IsWindowFocused(_AnyWindow) = ${ImGui.IsWindowFocused(imgui_18.ImGuiFocusedFlags.AnyWindow)}\n`);
                // Testing IsWindowHovered() function with its various flags (note that the flags can be combined)
                ImGui.BulletText(`IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
                    `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                    `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                    `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.ChildWindows)}\n` +
                    `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.ChildWindows | imgui_19.ImGuiHoveredFlags.RootWindow)}\n` +
                    `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.RootWindow)}\n"` +
                    `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(imgui_19.ImGuiHoveredFlags.AnyWindow)}\n"`);
                // Testing IsItemHovered() function (because BulletText is an item itself and that would affect the output of IsItemHovered, we pass all lines in a single items to shorten the code)
                ImGui.Button("ITEM");
                ImGui.BulletText(`IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                    `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(imgui_19.ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
                    `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(imgui_19.ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                    `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(imgui_19.ImGuiHoveredFlags.AllowWhenOverlapped)}\n` +
                    `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(imgui_19.ImGuiHoveredFlags.RectOnly)}\n`);
                ImGui.BeginChild("child", new imgui_2.ImVec2(0, 50), true);
                ImGui.Text("This is another child window for testing IsWindowHovered() flags.");
                ImGui.EndChild();
                if (embed_all_inside_a_child_window.value)
                    ImGui.EndChild();
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
                imgui_20.IM_ASSERT(imgui_7.IM_ARRAYSIZE(mouse_cursors_names) === imgui_21.ImGuiMouseCursor.COUNT);
                ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
                ImGui.Text("Hover to see mouse cursors:");
                ImGui.SameLine();
                ShowHelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
                for (let i = 0; i < imgui_21.ImGuiMouseCursor.COUNT; i++) {
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
            /* static */ const filter = STATIC("filter#2223", new imgui_17.ImGuiTextFilter());
            filter.value.Draw("Filter colors", 200);
            /* static */ const alpha_flags = STATIC("alpha_flags", 0);
            ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0);
            ImGui.SameLine();
            ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, imgui_15.ImGuiColorEditFlags.AlphaPreview);
            ImGui.SameLine();
            ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, imgui_15.ImGuiColorEditFlags.AlphaPreviewHalf);
            ImGui.BeginChild("#colors", new imgui_2.ImVec2(0, 300), true, imgui_1.ImGuiWindowFlags.AlwaysVerticalScrollbar | imgui_1.ImGuiWindowFlags.AlwaysHorizontalScrollbar | imgui_1.ImGuiWindowFlags.NavFlattened);
            ImGui.PushItemWidth(-160);
            for (let i = 0; i < imgui_5.ImGuiCol.COUNT; i++) {
                const name = ImGui.GetStyleColorName(i);
                if (!filter.value.PassFilter(name))
                    continue;
                ImGui.PushID(i);
                ImGui.ColorEdit4("##color", style.Colors[i], imgui_15.ImGuiColorEditFlags.AlphaBar | alpha_flags.value);
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
                ImGui.Image(atlas.TexID, new imgui_2.ImVec2(atlas.TexWidth, atlas.TexHeight), new imgui_2.ImVec2(0, 0), new imgui_2.ImVec2(1, 1), new imgui_6.ImColor(255, 255, 255, 255).Value, new imgui_6.ImColor(255, 255, 255, 128).Value);
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
            //                         font->RenderChar(draw_list, cell_size, cell_p1, ImGui::GetColorU32(ImGuiCol_Text), (ImWchar)(base+n)); // We use ImFont::RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
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
            ImGui.BeginChild("child", new imgui_2.ImVec2(0, 60), true);
            for (let i = 0; i < 10; i++)
                ImGui.Text(`Scrolling Text ${i}`);
            ImGui.EndChild();
            /* static */ const f = STATIC("f#2408", 0.5);
            /* static */ const n = STATIC("n", 0);
            /* static */ const b = STATIC("b", true);
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
                ImGui.ColorButton(name, ImGui.GetStyleColorVec4(i));
                const p = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(p, new imgui_2.ImVec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i));
                ImGui.Dummy(new imgui_2.ImVec2(sz, sz));
                ImGui.SameLine();
                ImGui.MenuItem(name);
            }
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Disabled", false)) // Disabled
         {
            imgui_20.IM_ASSERT(0);
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
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(-1, 0), new imgui_2.ImVec2(-1, Number.MAX_VALUE)); // Vertical only
        if (type.value === 1)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(0, -1), new imgui_2.ImVec2(Number.MAX_VALUE, -1)); // Horizontal only
        if (type.value === 2)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(100, 100), new imgui_2.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
        if (type.value === 3)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(400, -1), new imgui_2.ImVec2(500, -1)); // Width 400-500
        if (type.value === 4)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(-1, 400), new imgui_2.ImVec2(-1, 500)); // Height 400-500
        if (type.value === 5)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(0, 0), new imgui_2.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square); // Always Square
        if (type.value === 6)
            ImGui.SetNextWindowSizeConstraints(new imgui_2.ImVec2(0, 0), new imgui_2.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100); // Fixed Step
        const flags = auto_resize.value ? imgui_1.ImGuiWindowFlags.AlwaysAutoResize : 0;
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
                ImGui.SetWindowSize(new imgui_2.ImVec2(200, 200));
            }
            ImGui.SameLine();
            if (ImGui.Button("500x500")) {
                ImGui.SetWindowSize(new imgui_2.ImVec2(500, 500));
            }
            ImGui.SameLine();
            if (ImGui.Button("800x200")) {
                ImGui.SetWindowSize(new imgui_2.ImVec2(800, 200));
            }
            ImGui.PushItemWidth(200);
            ImGui.Combo("Constraint", (value = type.value) => type.value = value, desc, imgui_7.IM_ARRAYSIZE(desc));
            ImGui.DragInt("Lines", (value = display_lines.value) => display_lines.value = value, 0.2, 1, 100);
            ImGui.PopItemWidth();
            ImGui.Checkbox("Auto-resize", (value = auto_resize.value) => auto_resize.value = value);
            for (let i = 0; i < display_lines.value; i++)
                ImGui.Text(" ".repeat(i * 4) + "Hello, sailor! Making this line long enough for the example.");
        }
        ImGui.End();
    }
    // Demonstrate creating a simple static window with no decoration + a context-menu to choose which corner of the screen to use.
    function ShowExampleAppFixedOverlay(p_open) {
        const DISTANCE = 10.0;
        /* static */ const corner = STATIC("corner", 0);
        const window_pos = new imgui_2.ImVec2((corner.value & 1) ? ImGui.GetIO().DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? ImGui.GetIO().DisplaySize.y - DISTANCE : DISTANCE);
        const window_pos_pivot = new imgui_2.ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
        ImGui.SetNextWindowPos(window_pos, imgui_3.ImGuiCond.Always, window_pos_pivot);
        ImGui.SetNextWindowBgAlpha(0.3); // Transparent background
        if (ImGui.Begin("Example: Fixed Overlay", p_open, imgui_1.ImGuiWindowFlags.NoTitleBar | imgui_1.ImGuiWindowFlags.NoResize | imgui_1.ImGuiWindowFlags.AlwaysAutoResize | imgui_1.ImGuiWindowFlags.NoMove | imgui_1.ImGuiWindowFlags.NoSavedSettings)) {
            ImGui.Text("Simple overlay\nin the corner of the screen.\n(right-click to change position)");
            ImGui.Separator();
            ImGui.Text(`Mouse Position: (${ImGui.GetIO().MousePos.x.toFixed(1)},${ImGui.GetIO().MousePos.y.toFixed(1)})`);
            if (ImGui.BeginPopupContextWindow()) {
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
            ImGui.End();
        }
    }
    // Demonstrate using "##" and "###" in identifiers to manipulate ID generation.
    // This apply to regular items as well. Read FAQ section "How can I have multiple widgets with the same label? Can I have widget without a label? (Yes). A primer on the purpose of labels/IDs." for details.
    function ShowExampleAppWindowTitles(p_open) {
        // By default, Windows are uniquely identified by their title.
        // You can use the "##" and "###" markers to manipulate the display/ID.
        // Using "##" to display same title but have unique identifier.
        ImGui.SetNextWindowPos(new imgui_2.ImVec2(100, 100), imgui_3.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##1");
        ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
        ImGui.End();
        ImGui.SetNextWindowPos(new imgui_2.ImVec2(100, 200), imgui_3.ImGuiCond.FirstUseEver);
        ImGui.Begin("Same title as another window##2");
        ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
        ImGui.End();
        // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
        const buf = `Animated title ${"|/-\\".charAt((ImGui.GetTime() / 0.25) & 3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
        ImGui.SetNextWindowPos(new imgui_2.ImVec2(100, 300), imgui_3.ImGuiCond.FirstUseEver);
        ImGui.Begin(buf);
        ImGui.Text("This window has a changing title.");
        ImGui.End();
    }
    // Demonstrate using the low-level ImDrawList to draw custom shapes.
    function ShowExampleAppCustomRendering(p_open) {
        ImGui.SetNextWindowSize(new imgui_2.ImVec2(350, 560), imgui_3.ImGuiCond.FirstUseEver);
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
        /* static */ const col = STATIC("color#2583", new imgui_11.ImVec4(1.0, 1.0, 0.4, 1.0));
        ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
        ImGui.ColorEdit3("Color", col.value);
        {
            const p = ImGui.GetCursorScreenPos();
            const col32 = imgui_12.IM_COL32(col.value.x * 255, col.value.y * 255, col.value.z * 255, col.value.w * 255);
            let x = p.x + 4.0, y = p.y + 4.0;
            const spacing = 8.0;
            for (let n = 0; n < 2; n++) {
                const thickness = (n === 0) ? 1.0 : 4.0;
                draw_list.AddCircle(new imgui_2.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 20, thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, 0.0, imgui_23.ImDrawCornerFlags.All, thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_23.ImDrawCornerFlags.All, thickness);
                x += sz.value + spacing;
                draw_list.AddRect(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_23.ImDrawCornerFlags.TopLeft | imgui_23.ImDrawCornerFlags.BotRight, thickness);
                x += sz.value + spacing;
                draw_list.AddTriangle(new imgui_2.ImVec2(x + sz.value * 0.5, y), new imgui_2.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_2.ImVec2(x, y + sz.value - 0.5), col32, thickness);
                x += sz.value + spacing;
                draw_list.AddLine(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y), col32, thickness);
                x += sz.value + spacing;
                draw_list.AddLine(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, thickness);
                x += sz.value + spacing;
                draw_list.AddLine(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x, y + sz.value), col32, thickness);
                x += spacing;
                draw_list.AddBezierCurve(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value * 1.3, y + sz.value * 0.3), new imgui_2.ImVec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, thickness);
                x = p.x + 4;
                y += sz.value + spacing;
            }
            draw_list.AddCircleFilled(new imgui_2.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 32);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, 10.0);
            x += sz.value + spacing;
            draw_list.AddRectFilled(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), col32, 10.0, imgui_23.ImDrawCornerFlags.TopLeft | imgui_23.ImDrawCornerFlags.BotRight);
            x += sz.value + spacing;
            draw_list.AddTriangleFilled(new imgui_2.ImVec2(x + sz.value * 0.5, y), new imgui_2.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_2.ImVec2(x, y + sz.value - 0.5), col32);
            x += sz.value + spacing;
            draw_list.AddRectFilledMultiColor(new imgui_2.ImVec2(x, y), new imgui_2.ImVec2(x + sz.value, y + sz.value), imgui_12.IM_COL32(0, 0, 0), imgui_12.IM_COL32(255, 0, 0), imgui_12.IM_COL32(255, 255, 0), imgui_12.IM_COL32(0, 255, 0));
            ImGui.Dummy(new imgui_2.ImVec2((sz.value + spacing) * 8, (sz.value + spacing) * 3));
        }
        ImGui.Separator();
        {
            /* static */ const points = STATIC("points", new imgui_24.ImVector());
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
            // However you can draw directly and poll mouse/keyboard by yourself. You can manipulate the cursor using GetCursorPos() and SetCursorPos().
            // If you only use the ImDrawList API, you can notify the owner window of its extends by using SetCursorPos(max).
            const canvas_pos = ImGui.GetCursorScreenPos(); // ImDrawList API uses screen coordinates!
            const canvas_size = ImGui.GetContentRegionAvail(); // Resize canvas to what's available
            if (canvas_size.x < 50.0)
                canvas_size.x = 50.0;
            if (canvas_size.y < 50.0)
                canvas_size.y = 50.0;
            draw_list.AddRectFilledMultiColor(canvas_pos, new imgui_2.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_12.IM_COL32(50, 50, 50), imgui_12.IM_COL32(50, 50, 60), imgui_12.IM_COL32(60, 60, 70), imgui_12.IM_COL32(50, 50, 60));
            draw_list.AddRect(canvas_pos, new imgui_2.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_12.IM_COL32(255, 255, 255));
            let adding_preview = false;
            ImGui.InvisibleButton("canvas", canvas_size);
            const mouse_pos_in_canvas = new imgui_2.ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
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
            draw_list.PushClipRect(canvas_pos, new imgui_2.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), true); // clip lines within the canvas (if we resize it, etc.)
            for (let i = 0; i < points.value.Size - 1; i += 2)
                draw_list.AddLine(new imgui_2.ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new imgui_2.ImVec2(canvas_pos.x + points.value.Data[i + 1].x, canvas_pos.y + points.value.Data[i + 1].y), imgui_12.IM_COL32(255, 255, 0, 255), 2.0);
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
            log.value.AddLog(`[${random_words[Math.floor(Math.random() * imgui_7.IM_ARRAYSIZE(random_words))]}] Hello, time is ${time.toFixed(1)}, frame count is ${ImGui.GetFrameCount()}\n`);
            last_time.value = time;
        }
        log.value.Draw("Example: Log", p_open);
    }
    // Demonstrate create a window with multiple child windows.
    function ShowExampleAppLayout(p_open) {
        ImGui.SetNextWindowSize(new imgui_2.ImVec2(500, 440), imgui_3.ImGuiCond.FirstUseEver);
        if (ImGui.Begin("Example: Layout", p_open, imgui_1.ImGuiWindowFlags.MenuBar)) {
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
            ImGui.BeginChild("left pane", new imgui_2.ImVec2(150, 0), true);
            for (let i = 0; i < 100; i++) {
                const label = `MyObject ${i}`;
                if (ImGui.Selectable(label, selected.value === i))
                    selected.value = i;
            }
            ImGui.EndChild();
            ImGui.SameLine();
            // right
            ImGui.BeginGroup();
            ImGui.BeginChild("item view", new imgui_2.ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
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
        ImGui.SetNextWindowSize(new imgui_2.ImVec2(430, 450), imgui_3.ImGuiCond.FirstUseEver);
        if (!ImGui.Begin("Example: Property editor", p_open)) {
            ImGui.End();
            return;
        }
        ShowHelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");
        ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FramePadding, new imgui_2.ImVec2(2, 2));
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
                            ImGui.AlignTextToFramePadding();
                            // Here we use a Selectable (instead of Text) to highlight on hover
                            //ImGui.Text(`Field_${i}`);
                            const label = `Field_${i}`;
                            ImGui.Bullet();
                            ImGui.Selectable(label);
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
        ImGui.SetNextWindowSize(new imgui_2.ImVec2(520, 600), imgui_3.ImGuiCond.FirstUseEver);
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
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.ItemSpacing, new imgui_2.ImVec2(0, 0));
                    const clipper = new imgui_16.ImGuiListClipper(lines.value);
                    while (clipper.Step())
                        for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                            ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                    // clipper.delete(); // NOTE: native emscripten class
                    ImGui.PopStyleVar();
                    break;
                }
            case 2:
                // Multiple calls to Text(), not clipped (slow)
                ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.ItemSpacing, new imgui_2.ImVec2(0, 0));
                for (let i = 0; i < lines.value; i++)
                    ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                ImGui.PopStyleVar();
                break;
        }
        ImGui.EndChild();
        ImGui.End();
    }
    var ImGui, imgui_4, imgui_20, imgui_7, imgui_8, imgui_5, imgui_15, imgui_3, imgui_18, imgui_19, imgui_14, imgui_21, imgui_13, imgui_9, imgui_10, imgui_1, imgui_23, imgui_24, imgui_2, imgui_11, imgui_12, imgui_6, imgui_22, imgui_17, imgui_25, imgui_16, IM_NEWLINE, Static, _static, ExampleAppConsole, ExampleAppLog;
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
                imgui_4 = ImGui_1;
                imgui_20 = ImGui_1;
                imgui_7 = ImGui_1;
                imgui_8 = ImGui_1;
                imgui_5 = ImGui_1;
                imgui_15 = ImGui_1;
                imgui_3 = ImGui_1;
                imgui_18 = ImGui_1;
                imgui_19 = ImGui_1;
                imgui_14 = ImGui_1;
                imgui_21 = ImGui_1;
                imgui_13 = ImGui_1;
                imgui_9 = ImGui_1;
                imgui_10 = ImGui_1;
                imgui_1 = ImGui_1;
                imgui_23 = ImGui_1;
                imgui_24 = ImGui_1;
                imgui_2 = ImGui_1;
                imgui_11 = ImGui_1;
                imgui_12 = ImGui_1;
                imgui_6 = ImGui_1;
                imgui_22 = ImGui_1;
                imgui_17 = ImGui_1;
                imgui_25 = ImGui_1;
                imgui_16 = ImGui_1;
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
                    this.InputBuf = new imgui_8.ImStringBuffer(256, "");
                    // ImVector<char*>       Items;
                    this.Items = new imgui_24.ImVector();
                    // bool                  ScrollToBottom;
                    this.ScrollToBottom = false;
                    // ImVector<char*>       History;
                    this.History = new imgui_24.ImVector();
                    // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
                    this.HistoryPos = -1;
                    // ImVector<const char*> Commands;
                    this.Commands = new imgui_24.ImVector();
                    this.ClearLog();
                    // memset(InputBuf, 0, sizeof(InputBuf));
                    this.InputBuf.buffer = "";
                    this.HistoryPos = -1;
                    this.Commands.push_back("HELP");
                    this.Commands.push_back("HISTORY");
                    this.Commands.push_back("CLEAR");
                    this.Commands.push_back("CLASSIFY"); // "classify" is here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
                    this.AddLog("Welcome to ImGui!");
                }
                delete() { }
                // Portable helpers
                // static int   Stricmp(const char* str1, const char* str2)         { int d; while ((d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; } return d; }
                // static int   Strnicmp(const char* str1, const char* str2, int n) { int d = 0; while (n > 0 && (d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; n--; } return d; }
                // static char* Strdup(const char *str)                             { size_t len = strlen(str) + 1; void* buff = malloc(len); return (char*)memcpy(buff, (const void*)str, len); }
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
                    ImGui.SetNextWindowSize(new imgui_2.ImVec2(520, 600), imgui_3.ImGuiCond.FirstUseEver);
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
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.FramePadding, new imgui_2.ImVec2(0, 0));
                    /* static */ const filter = STATIC("filter#2763", new imgui_17.ImGuiTextFilter());
                    filter.value.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
                    ImGui.PopStyleVar();
                    ImGui.Separator();
                    const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
                    ImGui.BeginChild("ScrollingRegion", new imgui_2.ImVec2(0, -footer_height_to_reserve), false, imgui_1.ImGuiWindowFlags.HorizontalScrollbar); // Leave room for 1 separator + 1 InputText
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
                    // However take note that you can not use this code as is if a filter is active because it breaks the 'cheap random-access' property. We would need random-access on the post-filtered list.
                    // A typical application wanting coarse clipping and filtering may want to pre-compute an array of indices that passed the filtering test, recomputing this array when user changes the filter,
                    // and appending newly elements as they are inserted. This is left as a task to the user until we can manage to improve this example code!
                    // If your items are of variable size you may want to implement code similar to what ImGuiListClipper does. Or split your data into fixed height items to allow random-seeking into your list.
                    ImGui.PushStyleVar(imgui_9.ImGuiStyleVar.ItemSpacing, new imgui_2.ImVec2(4, 1)); // Tighten spacing
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
                            col = new imgui_11.ImVec4(1.0, 0.4, 0.4, 1.0);
                        // else if (strncmp(item, "# ", 2) === 0) col = ImColor(1.0f,0.78f,0.58f,1.0f);
                        else if (/^# /.test(item))
                            col = new imgui_11.ImVec4(1.0, 0.78, 0.58, 1.0);
                        ImGui.PushStyleColor(imgui_5.ImGuiCol.Text, col);
                        ImGui.TextUnformatted(item);
                        ImGui.PopStyleColor();
                    }
                    if (copy_to_clipboard)
                        ImGui.LogFinish();
                    if (this.ScrollToBottom)
                        ImGui.SetScrollHere();
                    this.ScrollToBottom = false;
                    ImGui.PopStyleVar();
                    ImGui.EndChild();
                    ImGui.Separator();
                    // Command-line
                    let reclaim_focus = false;
                    if (ImGui.InputText("Input", this.InputBuf, imgui_7.IM_ARRAYSIZE(this.InputBuf), imgui_14.ImGuiInputTextFlags.EnterReturnsTrue | imgui_14.ImGuiInputTextFlags.CallbackCompletion | imgui_14.ImGuiInputTextFlags.CallbackHistory, ExampleAppConsole.TextEditCallbackStub, this)) {
                        // char* input_end = InputBuf+strlen(InputBuf);
                        // while (input_end > InputBuf && input_end[-1] === ' ') { input_end--; } *input_end = 0;
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
                        case imgui_14.ImGuiInputTextFlags.CallbackCompletion:
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
                        case imgui_14.ImGuiInputTextFlags.CallbackHistory:
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
                    this.Buf = new imgui_25.ImGuiTextBuffer();
                    // ImGuiTextFilter     Filter;
                    this.Filter = new imgui_17.ImGuiTextFilter();
                    // ImVector<int>       LineOffsets;        // Index to lines offset
                    this.LineOffsets = new imgui_24.ImVector();
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
                    ImGui.SetNextWindowSize(new imgui_2.ImVec2(500, 400), imgui_3.ImGuiCond.FirstUseEver);
                    ImGui.Begin(title, p_open);
                    if (ImGui.Button("Clear"))
                        this.Clear();
                    ImGui.SameLine();
                    const copy = ImGui.Button("Copy");
                    ImGui.SameLine();
                    this.Filter.Draw("Filter", -100.0);
                    ImGui.Separator();
                    ImGui.BeginChild("scrolling", new imgui_2.ImVec2(0, 0), false, imgui_1.ImGuiWindowFlags.HorizontalScrollbar);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLGNBQWM7Ozs7SUEyR2QsNkRBQTZEO0lBQzdELGdCQUFnQixFQUFVLEVBQUUsRUFBVSxJQUFZLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFrQnhGLGdCQUFtQixHQUFXLEVBQUUsS0FBUTtRQUNwQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxtREFBbUQ7SUFDbkQsK0NBQStDO0lBQy9DLGtEQUFrRDtJQUNsRCwwREFBMEQ7SUFDMUQsb0RBQW9EO0lBQ3BELHNEQUFzRDtJQUN0RCw2REFBNkQ7SUFDN0Qsd0RBQXdEO0lBQ3hELHdEQUF3RDtJQUN4RCwyREFBMkQ7SUFDM0QsMkNBQTJDO0lBQzNDLHFDQUFxQztJQUVyQyx3QkFBd0IsSUFBWTtRQUVoQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUN6QjtZQUNJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNsRCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDdEI7SUFD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QUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFBQyxJQUFJLFFBQVEsR0FBRyxHQUFHO3dCQUFFLFFBQVEsR0FBRyxHQUFHLENBQUM7eUJBQU0sSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLFNBQVM7d0JBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7b0JBQzlLLElBQUksUUFBUSxHQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQztvQkFBQyxJQUFJLFFBQVEsR0FBRyxHQUFHO3dCQUFFLFFBQVEsR0FBRyxHQUFHLENBQUM7eUJBQU0sSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLFNBQVM7d0JBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxTQUFTLENBQUM7b0JBQzlLLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BFLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEcsTUFBTSxHQUFHLEdBQVcsSUFBSSxjQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztvQkFDN0UsTUFBTSxHQUFHLEdBQVcsSUFBSSxjQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsUUFBUSxH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LENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxjQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQy9HOzRCQUNJLE1BQU0sQ0FBQyxHQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDO2dDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzFELElBQUksQ0FBQyxHQUFHLENBQUM7Z0NBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDN0Q7d0JBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDOzRCQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNqQjtvQkFDRCxL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