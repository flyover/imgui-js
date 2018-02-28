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
                // Testing ImGuiOnceUponAFrame helper.
                //static ImGuiOnceUponAFrame once;
                //for (let i = 0; i < 5; i++)
                //    if (once)
                //        ImGui.Text("This will be displayed only once.");
                ImGui.Separator();
                ImGui.LabelText("label", "Value");
                {
                    // Simplified one-liner Combo() API, using values packed in a single constant string
                    /* static */ const current_item_1 = STATIC("current_item_1", 1);
                    ImGui.Combo("combo", (value = current_item_1.value) => current_item_1.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                    //ImGui.Combo("combo w/ array of char*", &current_item_2_idx, items, IM_ARRAYSIZE(items));   // Combo using proper array. You can also pass a callback to retrieve array value, no need to create/copy an array just for that.
                    // General BeginCombo() API, you have full control over your selection data and display type
                    const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO", "PPPP", "QQQQQQQQQQ", "RRR", "SSSS"];
                    /* static */ const current_item_2 = STATIC("current_item_2", null);
                    if (ImGui.BeginCombo("combo 2", current_item_2.value)) {
                        for (let n = 0; n < imgui_7.IM_ARRAYSIZE(items); n++) {
                            const is_selected = (current_item_2.value === items[n]); // You can store your selection however you want, outside or inside your objects
                            if (ImGui.Selectable(items[n], is_selected))
                                current_item_2.value = items[n];
                            if (is_selected)
                                ImGui.SetItemDefaultFocus(); // Set the initial focus when opening the combo (scrolling + for keyboard navigation support in the upcoming navigation branch)
                        }
                        ImGui.EndCombo();
                    }
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
                /* static */ const col1 = STATIC("col1", [1.0, 0.0, 0.2]);
                /* static */ const col2 = STATIC("col2", [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit3("color 1", col1.value);
                ImGui.SameLine();
                ShowHelpMarker("Click on the colored square to open a color picker.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");
                ImGui.ColorEdit4("color 2", col2.value);
                const listbox_items = ["Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"];
                /* static */ const listbox_item_current = STATIC("listbox_item_current", 1);
                ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, imgui_7.IM_ARRAYSIZE(listbox_items), 4);
                /* static */ const listbox_item_current2 = STATIC("listbox_item_current2", 2);
                ImGui.PushItemWidth(-1);
                ImGui.ListBox("##listbox2", (value = listbox_item_current2.value) => listbox_item_current2.value = value, listbox_items, imgui_7.IM_ARRAYSIZE(listbox_items), 4);
                ImGui.PopItemWidth();
                ImGui.TreePop();
            }
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
                        else
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
                ImGui.TextWrapped("Below we are displaying the font texture (which is the only texture we have access to in this demo). Use the 'ImTextureID' type as storage to pass pointers or identifier to your own texture data. Hover the texture for a zoomed view!");
                const io = ImGui.GetIO();
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
                    const focus_sz = 32.0;
                    let focus_x = io.MousePos.x - pos.x - focus_sz * 0.5;
                    if (focus_x < 0.0)
                        focus_x = 0.0;
                    else if (focus_x > my_tex_w - focus_sz)
                        focus_x = my_tex_w - focus_sz;
                    let focus_y = io.MousePos.y - pos.y - focus_sz * 0.5;
                    if (focus_y < 0.0)
                        focus_y = 0.0;
                    else if (focus_y > my_tex_h - focus_sz)
                        focus_y = my_tex_h - focus_sz;
                    ImGui.Text(`Min: (${focus_x.toFixed(2)}, ${focus_y.toFixed(2)})`);
                    ImGui.Text(`Max: (${(focus_x + focus_sz).toFixed(2)}, ${(focus_y + focus_sz).toFixed(2)})`);
                    const uv0 = new imgui_2.ImVec2((focus_x) / my_tex_w, (focus_y) / my_tex_h);
                    const uv1 = new imgui_2.ImVec2((focus_x + focus_sz) / my_tex_w, (focus_y + focus_sz) / my_tex_h);
                    ImGui.Image(my_tex_id, new imgui_2.ImVec2(128, 128), uv0, uv1, new imgui_6.ImColor(255, 255, 255, 255).toImVec4(), new imgui_6.ImColor(255, 255, 255, 128).toImVec4());
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
                            if (!ImGui.GetIO().KeyCtrl)
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
                while (refresh_time.value < ImGui.GetTime()) {
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
                if (ImGui.BeginPopupContextItem()) {
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
            ImGui.Text(`WantMoveMouse: ${io.WantMoveMouse}`);
            ImGui.Text(`NavActive: ${io.NavActive}, NavVisible: ${io.NavVisible}`);
            ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
            ImGui.SameLine();
            ShowHelpMarker("Request ImGui to render a mouse cursor for you in software. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
            ImGui.CheckboxFlags("io.ConfigFlags: EnableGamepad", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.EnableGamepad);
            ImGui.CheckboxFlags("io.ConfigFlags: EnableKeyboard", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.EnableKeyboard);
            ImGui.CheckboxFlags("io.ConfigFlags: MoveMouse", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ImGuiConfigFlags.MoveMouse);
            ImGui.SameLine();
            ShowHelpMarker("Request ImGui to move your move cursor when using gamepad/keyboard navigation. NewFrame() will change io.MousePos and set the io.WantMoveMouse flag, your backend will need to apply the new mouse position.");
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
        if (ShowStyleSelector("Colors##Selector"))
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
            //                     float cell_spacing = style.ItemSpacing.y;
            //                     ImVec2 cell_size(font->FontSize * 1, font->FontSize * 1);
            //                     ImVec2 base_pos = ImGui.GetCursorScreenPos();
            //                     ImDrawList* draw_list = ImGui.GetWindowDrawList();
            //                     for (let n = 0; n < 256; n++)
            //                     {
            //                         ImVec2 cell_p1(base_pos.x + (n % 16) * (cell_size.x + cell_spacing), base_pos.y + (n / 16) * (cell_size.y + cell_spacing));
            //                         ImVec2 cell_p2(cell_p1.x + cell_size.x, cell_p1.y + cell_size.y);
            //                         const ImFontGlyph* glyph = font->FindGlyph((ImWchar)(base+n));;
            //                         draw_list->AddRect(cell_p1, cell_p2, glyph ? IM_COL32(255,255,255,100) : IM_COL32(255,255,255,50));
            //                         font->RenderChar(draw_list, cell_size.x, cell_p1, ImGui.GetColorU32(ImGuiCol.Text), (ImWchar)(base+n)); // We use ImFont::RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
            //                         if (glyph && ImGui.IsMouseHoveringRect(cell_p1, cell_p2))
            //                         {
            //                             ImGui.BeginTooltip();
            //                             ImGui.Text("Codepoint: U+%04X", base+n);
            //                             ImGui.Separator();
            //                             ImGui.Text("AdvanceX: %.1f", glyph->AdvanceX);
            //                             ImGui.Text("Pos: (%.2f,%.2f)->(%.2f,%.2f)", glyph->X0, glyph->Y0, glyph->X1, glyph->Y1);
            //                             ImGui.Text("UV: (%.3f,%.3f)->(%.3f,%.3f)", glyph->U0, glyph->V0, glyph->U1, glyph->V1);
            //                             ImGui.EndTooltip();
            //                         }
            //                     }
            //                     ImGui.Dummy(ImVec2((cell_size.x + cell_spacing) * 16, (cell_size.y + cell_spacing) * 16));
            //                     ImGui.TreePop();
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
        if (ImGui.BeginMenu("Disabled", false)) {
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
                    else if (command_line.toUpperCase() === "HELP") {
                        this.AddLog("Commands:");
                        for (let i = 0; i < this.Commands.Size; i++)
                            this.AddLog(`- ${this.Commands.Data[i]}`);
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLGNBQWM7Ozs7SUEyR2QsNkRBQTZEO0lBQzdELGdCQUFnQixFQUFVLEVBQUUsRUFBVSxJQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQWtCeEYsZ0JBQW1CLEdBQVcsRUFBRSxLQUFRO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsbURBQW1EO0lBQ25ELCtDQUErQztJQUMvQyxrREFBa0Q7SUFDbEQsMERBQTBEO0lBQzFELG9EQUFvRDtJQUNwRCxzREFBc0Q7SUFDdEQsNkRBQTZEO0lBQzdELHdEQUF3RDtJQUN4RCx3REFBd0Q7SUFDeEQsMkRBQTJEO0lBQzNELDJDQUEyQztJQUMzQyxxQ0FBcUM7SUFFckMsd0JBQXdCLElBQVk7UUFFaEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FDMUIsQ0FBQztZQUNHLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNsRCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFL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S0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQztvQkFDOUwsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQzNCLENBQUM7d0JBQ0csS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hILENBQUM7NEJBQ0csTUFBTSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQztvQkFDRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FDMUMsQ0FBQztnQkFDRyxZQUFZLENBQUMsTUFBTSxJQUFJLEdBQTJCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxzQkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0osWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUEyQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksc0JBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLDRCQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqTSxZQUFZLENBQUMsTUFBTSxJQUFJLEdBQTJCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxzQkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsNEJBQW1CLENBQUMsZ0JBQWdCLEdBQUcsNEJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzlPLFlBQVksQ0FBQyxNQUFNLElBQUksR0FBMkIsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLHNCQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxvQkFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSw0QkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDck0sWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUEyQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksc0JBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLDRCQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsTTtvQkFBMkIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQStCLElBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFDeE0sWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUEyQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksc0JBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsNEJBQW1CLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRWpQLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDN0IsWUFBWSxDQUFDLE1BQU0sT0FBTyxHQUEyQixNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksc0JBQWMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDOUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSw0QkFBbUIsQ0FBQyxRQUFRLEdBQUcsNEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxjQUFjLENBQUMscUZBQXFGLENBQUMsQ0FBQztnQkFDeEgsS0FBSyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLDRCQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUVsSCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUM1QyxDQUFDO2dCQUNHLFlBQVksQ0FBQyxNQUFNLFNBQVMsR0FBb0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDM0UsWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUEyQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksc0JBQWMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUN6RixNQUFNO29CQUNOLHFEQUFxRDtvQkFDckQsMkRBQTJEO29CQUMzRCw2REFBNkQ7b0JBQzdELHlEQUF5RDtvQkFDekQsc0RBQXNEO29CQUN0RCxrREFBa0Q7b0JBQ2xELFFBQVE7b0JBQ1IsVUFBVTtvQkFDVix3QkFBd0IsQ0FBQyxDQUFDLENBQUM7Z0JBRS9CLEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2xGLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLDRCQUFtQixDQUFDLGFBQWEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdk4sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQ3BDLENBQUM7Z0JBQ0csWUFBWSxDQUFDLE1BQU0sT0FBTyxHQUFvQixNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0RSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUU1RSxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQXFCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQyxDQUFDO2dCQUNqRyxLQUFLLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXpFLDBEQUEwRDtnQkFDMUQsdUtBQXVLO2dCQUN2SyxZQUFZLENBQUMsTUFBTSxNQUFNLEdBQTJCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLFlBQVksQ0FBQyxNQUFNLGFBQWEsR0FBbUIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUUsWUFBWSxDQUFDLE1BQU0sWUFBWSxHQUFtQixNQUFNLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUM7b0JBQzdDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QyxPQUFPLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUMzQyxDQUFDO29CQUNHLFlBQVksQ0FBQyxNQUFNLEtBQUssR0FBbUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDaEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFELGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM3RSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUMxQyxZQUFZLENBQUMsS0FBSyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxvQkFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWpILG1DQUFtQztnQkFDbkMsMEpBQTBKO2dCQUMxSjtvQkFFVyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVMsRUFBRSxDQUFTLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFTLEVBQUUsQ0FBUyxJQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ25GO2dCQUNELFlBQVksQ0FBQyxNQUFNLFNBQVMsR0FBbUIsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxhQUFhLEdBQW1CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ25JLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3hJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RyxNQUFNLElBQUksR0FBcUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUMvRixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pHLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLGNBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVsQixnQ0FBZ0M7Z0JBQ2hDLFlBQVksQ0FBQyxNQUFNLFFBQVEsR0FBbUIsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQW1CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDbEIsQ0FBQztvQkFDRyxRQUFRLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3JFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUM7d0JBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFBQyxDQUFDO29CQUNsRixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO3dCQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQUMsQ0FBQztnQkFDdEYsQ0FBQztnQkFFRCxtSkFBbUo7Z0JBQ25KLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLGNBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUUzQixNQUFNLGtCQUFrQixHQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDaEgsTUFBTSxHQUFHLEdBQVcsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDeEUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FDM0MsQ0FBQztnQkFDRyxZQUFZLENBQUMsTUFBTSxLQUFLLEdBQW1CLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxlQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFM0csWUFBWSxDQUFDLE1BQU0sYUFBYSxHQUFvQixNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsRixZQUFZLENBQUMsTUFBTSxrQkFBa0IsR0FBb0IsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RixZQUFZLENBQUMsTUFBTSxZQUFZLEdBQW9CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hGLFlBQVksQ0FBQyxNQUFNLEdBQUcsR0FBb0IsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuRyxLQUFLLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNsSCxLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUFDLGNBQWMsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO2dCQUNqTSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxjQUFjLENBQUMseUVBQXlFLENBQUMsQ0FBQztnQkFDbEwsTUFBTSxVQUFVLEdBQXdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNEJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNEJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFaFIsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUFDLGNBQWMsQ0FBQywyR0FBMkcsQ0FBQyxDQUFDO2dCQUM5SSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUV4RCxLQUFLLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7Z0JBQzNDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsNEJBQW1CLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUVsRixLQUFLLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQy9DLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsNEJBQW1CLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUVyRixLQUFLLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxjQUFjLENBQUMseU5BQXlOLENBQUMsQ0FBQztnQkFDNVAsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSw0QkFBbUIsQ0FBQyxRQUFRLEdBQUcsNEJBQW1CLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUVySCxLQUFLLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7Z0JBRXJELDJCQUEyQjtnQkFDM0IsWUFBWSxDQUFDLE1BQU0sb0JBQW9CLEdBQW9CLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakcsWUFBWSxDQUFDLE1BQU0sYUFBYSxHQUEyQixNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztvQkFDNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQzNCLENBQUM7d0JBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO3dCQUN0QyxpSEFBaUg7d0JBQ2pILE1BQU0sQ0FBQyxHQUFxQixDQUFFLEdBQUcsQ0FBRSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsR0FBcUIsQ0FBRSxHQUFHLENBQUUsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLEdBQXFCLENBQUUsR0FBRyxDQUFFLENBQUM7d0JBQ3BDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDeEQsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUTtvQkFDNUMsQ0FBQztnQkFDTCxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUVsQyxZQUFZLENBQUMsTUFBTSxZQUFZLEdBQW1CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxlQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixJQUFJLFVBQVUsR0FBWSxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pCLFVBQVUsR0FBRyxVQUFVLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQ2YsQ0FBQztvQkFDRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4QixZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdDLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUNqQyxDQUFDO29CQUNHLCtEQUErRDtvQkFDL0QsS0FBSyxDQUFDLElBQUksQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUM5RCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxHQUFHLDRCQUFtQixDQUFDLGFBQWEsR0FBRyw0QkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDakksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNqQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsNEJBQW1CLENBQUMsUUFBUSxHQUFHLDRCQUFtQixDQUFDLGdCQUFnQixFQUFFLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNySSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLDRCQUFtQixDQUFDLFFBQVEsR0FBRyw0QkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLGNBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDN0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQzFELENBQUM7d0JBQ0csS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNkLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsNEJBQW1CLENBQUMsT0FBTyxHQUFHLDRCQUFtQixDQUFDLFFBQVEsR0FBRyw0QkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxjQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZLLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksZUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjt3QkFFakosRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FDaEMsQ0FBQzs0QkFDRyx3RkFBd0Y7NEJBQ3hGLDJFQUEyRTs0QkFDM0Usd0ZBQXdGOzRCQUN4RiwyRUFBMkU7NEJBQzNFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3dCQUM5QixDQUFDO3dCQUVELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQztvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2pCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU5RSxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1QixZQUFZLENBQUMsTUFBTSxLQUFLLEdBQW9CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xFLFlBQVksQ0FBQyxNQUFNLFNBQVMsR0FBb0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUUsWUFBWSxDQUFDLE1BQU0sWUFBWSxHQUFvQixNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRixZQUFZLENBQUMsTUFBTSxTQUFTLEdBQW9CLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzNFLFlBQVksQ0FBQyxNQUFNLFdBQVcsR0FBbUIsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLGVBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2RyxZQUFZLENBQUMsTUFBTSxXQUFXLEdBQW1CLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFFLFlBQVksQ0FBQyxNQUFNLFdBQVcsR0FBbUIsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDM0UsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN2RixLQUFLLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2hHLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUNqQixDQUFDO29CQUNHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDakIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUN2RixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQ3BCLENBQUM7d0JBQ0csS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNqQixLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLDRCQUFtQixDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDakcsQ0FBQztnQkFDTCxDQUFDO2dCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLDBEQUEwRCxDQUFDLENBQUM7Z0JBQ2pKLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLDREQUE0RCxDQUFDLENBQUM7Z0JBQ25KLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxjQUFjLENBQUMsaURBQWlELENBQUMsQ0FBQztnQkFDcEYsSUFBSSxLQUFLLEdBQXdCLFVBQVUsQ0FBQztnQkFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQywwRUFBMEU7Z0JBQ2xJLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQUMsS0FBSyxJQUFJLDRCQUFtQixDQUFDLFFBQVEsQ0FBQztnQkFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxhQUFhLENBQUM7Z0JBQ3BFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxRQUFRLENBQUM7Z0JBQ25FLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUFDLEtBQUssSUFBSSw0QkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQzlELEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVqRyxLQUFLLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFBQyxjQUFjLENBQUMsdVZBQXVWLENBQUMsQ0FBQztnQkFDMVgsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLDRCQUFtQixDQUFDLEtBQUssR0FBRyw0QkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkYsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1QixLQUFLLENBQUMsbUJBQW1CLENBQUMsNEJBQW1CLENBQUMsS0FBSyxHQUFHLDRCQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVuRixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztnQkFDRyxZQUFZLENBQUMsTUFBTSxLQUFLLEdBQW1CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFtQixNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RyxZQUFZLENBQUMsTUFBTSxPQUFPLEdBQW1CLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFtQixNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuSCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQ3pLLEtBQUssQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDNUwsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FDOUMsQ0FBQztnQkFDRyxZQUFZLENBQUMsTUFBTSxLQUFLLEdBQTZCLE1BQU0sQ0FBbUIsT0FBTyxFQUFFLENBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQztnQkFDbkgsWUFBWSxDQUFDLE1BQU0sS0FBSyxHQUE2QixNQUFNLENBQW1CLE9BQU8sRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUM7Z0JBRTNHLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWhCLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWhCLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxD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