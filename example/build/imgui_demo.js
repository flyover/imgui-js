// dear imgui, v1.86
// (demo code)
System.register(["imgui-js"], function (exports_1, context_1) {
    "use strict";
    var ImGui, INT_MIN, INT_MAX, UINT_MAX, FLT_MIN, FLT_MAX, Static, _static_map, StaticArray, _static_array_map, IM_NEWLINE, GImGuiDemoMarkerCallback, done, MyItemColumnID, MyItem, ExampleAppConsole, ExampleAppLog, MyDocument, ExampleAppDocuments;
    var __moduleName = context_1 && context_1.id;
    // const LLONG_MIN: float = 0; // 0x8000000000000000
    // const LLONG_MAX: float = 0; // 0x7fffffffffffffff
    // const ULLONG_MAX: float = 0; // 0xffffffffffffffff
    // #include <math.h>           // sqrtf, powf, cosf, sinf, floorf, ceilf
    function fmodf(a, b) { return a - (Math.floor(a / b) * b); }
    // #include <stdio.h>          // vsnprintf, sscanf, printf
    // #include <stdlib.h>         // null, malloc, free, atoi
    // #if defined(_MSC_VER) && _MSC_VER <= 1500 // MSVC 2008 or earlier
    // #include <stddef.h>         // intptr_t
    // #else
    // #include <stdint.h>         // intptr_t
    // #endif
    function UNIQUE(key) { return key; }
    function STATIC(key, init) {
        let value = _static_map.get(key);
        if (value === undefined) {
            _static_map.set(key, value = new Static(init));
        }
        return value;
    }
    function STATIC_ARRAY(count, key, init) {
        let value = _static_array_map.get(key);
        if (value === undefined) {
            _static_array_map.set(key, value = new StaticArray(count, init));
        }
        return value;
    }
    // Helpers
    // #if defined(_MSC_VER) && !defined(snprintf)
    // #define snprintf    _snprintf
    // #endif
    // #if defined(_MSC_VER) && !defined(vsnprintf)
    // #define vsnprintf   _vsnprintf
    // #endif
    // Helpers macros
    // We normally try to not use many helpers in imgui_demo.cpp in order to make code easier to copy and paste,
    // but making an exception here as those are largely simplifying code...
    // In other imgui sources we can use nicer internal functions from imgui_internal.h (ImMin/ImMax) but not in the demo.
    function IM_MIN(A, B) { return A < B ? A : B; }
    function IM_MAX(A, B) { return A >= B ? A : B; }
    function IM_CLAMP(V, MN, MX) { return V < MN ? MN : V > MX ? MX : V; }
    // Enforce cdecl calling convention for functions called by the standard library, in case compilation settings changed the default to e.g. __vectorcall
    // #ifndef IMGUI_CDECL
    // #ifdef _MSC_VER
    // #define IMGUI_CDECL __cdecl
    // #else
    // #define IMGUI_CDECL
    // #endif
    // #endif
    //-----------------------------------------------------------------------------
    // [SECTION] Forward Declarations, Helpers
    //-----------------------------------------------------------------------------
    // #if !defined(IMGUI_DISABLE_DEMO_WINDOWS)
    // Forward Declarations
    // static void ShowExampleAppDocuments(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppMainMenuBar();
    // static void ShowExampleAppConsole(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppLog(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppLayout(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppPropertyEditor(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppLongText(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppAutoResize(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppConstrainedResize(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppSimpleOverlay(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppWindowTitles(p_open: ImGui.Access<boolean>);
    // static void ShowExampleAppCustomRendering(p_open: ImGui.Access<boolean>);
    // static void ShowExampleMenuFile();
    // Helper to display a little (?) mark which shows a tooltip when hovered.
    // In your own code you may want to display an actual icon if you are using a merged icon fonts (see docs/FONTS.md)
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
    function IMGUI_DEMO_MARKER(section) { if (GImGuiDemoMarkerCallback !== null)
        GImGuiDemoMarkerCallback(section); }
    // Helper to display basic user controls.
    function ShowUserGuide() {
        const io = ImGui.GetIO();
        ImGui.BulletText("Double-click on title bar to collapse window.");
        ImGui.BulletText("Click and drag on lower corner to resize window\n" +
            "(double-click to auto fit window to its contents).");
        ImGui.BulletText("CTRL+Click on a slider or drag box to input value as text.");
        ImGui.BulletText("TAB/SHIFT+TAB to cycle through keyboard editable fields.");
        ImGui.BulletText("CTRL+Tab to select a window.");
        if (io.FontAllowUserScaling)
            ImGui.BulletText("CTRL+Mouse Wheel to zoom window contents.");
        ImGui.BulletText("While inputing text:\n");
        ImGui.Indent();
        ImGui.BulletText("CTRL+Left/Right to word jump.");
        ImGui.BulletText("CTRL+A or double-click to select all.");
        ImGui.BulletText("CTRL+X/C/V to use clipboard cut/copy/paste.");
        ImGui.BulletText("CTRL+Z,CTRL+Y to undo/redo.");
        ImGui.BulletText("ESCAPE to revert.");
        ImGui.BulletText("You can apply arithmetic operators +,*,/ on numerical values.\nUse +- to subtract.");
        ImGui.Unindent();
        ImGui.BulletText("With keyboard navigation enabled:");
        ImGui.Indent();
        ImGui.BulletText("Arrow keys to navigate.");
        ImGui.BulletText("Space to activate a widget.");
        ImGui.BulletText("Return to input text into a widget.");
        ImGui.BulletText("Escape to deactivate a widget, close popup, exit child window.");
        ImGui.BulletText("Alt to jump to the menu layer of a window.");
        ImGui.Unindent();
    }
    // Demonstrate most Dear ImGui features (this is big function!)
    // You may execute this function to experiment with the UI and understand what it does.
    // You may then search for keywords in the code when you are interested by a specific feature.
    function ShowDemoWindow(p_open) {
        done = false;
        // Exceptionally add an extra assert here for people confused about initial Dear ImGui setup
        // Most ImGui functions would normally just crash if the context is missing.
        ImGui.ASSERT(ImGui.GetCurrentContext() !== null && "Missing dear imgui context. Refer to examples app!");
        // Examples Apps (accessible from the "Examples" menu)
        const show_app_main_menu_bar = STATIC(UNIQUE("show_app_main_menu_bar#6a959c6a"), false);
        const show_app_documents = STATIC(UNIQUE("show_app_documents#f11837e5"), false);
        const show_app_console = STATIC(UNIQUE("show_app_console#26eaa5a6"), false);
        const show_app_log = STATIC(UNIQUE("show_app_log#3b0346ee"), false);
        const show_app_layout = STATIC(UNIQUE("show_app_layout#671683e7"), false);
        const show_app_property_editor = STATIC(UNIQUE("show_app_property_editor#c66a5861"), false);
        const show_app_long_text = STATIC(UNIQUE("show_app_long_text#eed4ab47"), false);
        const show_app_auto_resize = STATIC(UNIQUE("show_app_auto_resize#2852aedd"), false);
        const show_app_constrained_resize = STATIC(UNIQUE("show_app_constrained_resize#17933c5a"), false);
        const show_app_simple_overlay = STATIC(UNIQUE("show_app_simple_overlay#6a9175fc"), false);
        const show_app_fullscreen = STATIC(UNIQUE("show_app_fullscreen#6a9175fc"), false);
        const show_app_window_titles = STATIC(UNIQUE("show_app_window_titles#d283f989"), false);
        const show_app_custom_rendering = STATIC(UNIQUE("show_app_custom_rendering#7338d302"), false);
        if (show_app_main_menu_bar.value)
            ShowExampleAppMainMenuBar();
        if (show_app_documents.value)
            ShowExampleAppDocuments(show_app_documents.access);
        if (show_app_console.value)
            ShowExampleAppConsole(show_app_console.access);
        if (show_app_log.value)
            ShowExampleAppLog(show_app_log.access);
        if (show_app_layout.value)
            ShowExampleAppLayout(show_app_layout.access);
        if (show_app_property_editor.value)
            ShowExampleAppPropertyEditor(show_app_property_editor.access);
        if (show_app_long_text.value)
            ShowExampleAppLongText(show_app_long_text.access);
        if (show_app_auto_resize.value)
            ShowExampleAppAutoResize(show_app_auto_resize.access);
        if (show_app_constrained_resize.value)
            ShowExampleAppConstrainedResize(show_app_constrained_resize.access);
        if (show_app_simple_overlay.value)
            ShowExampleAppSimpleOverlay(show_app_simple_overlay.access);
        if (show_app_fullscreen.value)
            ShowExampleAppFullscreen(show_app_fullscreen.access);
        if (show_app_window_titles.value)
            ShowExampleAppWindowTitles(show_app_window_titles.access);
        if (show_app_custom_rendering.value)
            ShowExampleAppCustomRendering(show_app_custom_rendering.access);
        // Dear ImGui Apps (accessible from the "Tools" menu)
        const show_app_metrics = STATIC(UNIQUE("show_app_metrics#d0dce1b4"), false);
        const show_app_stack_tool = STATIC(UNIQUE("show_app_stack_tool#d0dce1b4"), false);
        const show_app_style_editor = STATIC(UNIQUE("show_app_style_editor#d0a84f54"), false);
        const show_app_about = STATIC(UNIQUE("show_app_about#75d624f8"), false);
        if (show_app_metrics.value) {
            ImGui.ShowMetricsWindow(show_app_metrics.access);
        }
        if (show_app_stack_tool.value) {
            ImGui.ShowStackToolWindow(show_app_stack_tool.access);
        }
        if (show_app_about.value) { /*ImGui.*/
            ShowAboutWindow(show_app_about.access);
        }
        if (show_app_style_editor.value) {
            ImGui.Begin("Dear ImGui Style Editor", show_app_style_editor.access);
            /*ImGui.*/ ShowStyleEditor();
            ImGui.End();
        }
        // Demonstrate the various window flags. Typically you would just use the default!
        const no_titlebar = STATIC(UNIQUE("no_titlebar#27f9c1bc"), false);
        const no_scrollbar = STATIC(UNIQUE("no_scrollbar#762ce04e"), false);
        const no_menu = STATIC(UNIQUE("no_menu#da66ab52"), false);
        const no_move = STATIC(UNIQUE("no_move#53e01d48"), false);
        const no_resize = STATIC(UNIQUE("no_resize#1b085109"), false);
        const no_collapse = STATIC(UNIQUE("no_collapse#ecb078b8"), false);
        const no_close = STATIC(UNIQUE("no_close#001e8ca3"), false);
        const no_nav = STATIC(UNIQUE("no_nav#7b730e8e"), false);
        const no_background = STATIC(UNIQUE("no_background#c3c9a254"), false);
        const no_bring_to_front = STATIC(UNIQUE("no_bring_to_front#006124fc"), false);
        const unsaved_document = STATIC(UNIQUE("unsaved_document#006124fc"), false);
        let window_flags = 0;
        if (no_titlebar.value)
            window_flags |= ImGui.WindowFlags.NoTitleBar;
        if (no_scrollbar.value)
            window_flags |= ImGui.WindowFlags.NoScrollbar;
        if (!no_menu.value)
            window_flags |= ImGui.WindowFlags.MenuBar;
        if (no_move.value)
            window_flags |= ImGui.WindowFlags.NoMove;
        if (no_resize.value)
            window_flags |= ImGui.WindowFlags.NoResize;
        if (no_collapse.value)
            window_flags |= ImGui.WindowFlags.NoCollapse;
        if (no_nav.value)
            window_flags |= ImGui.WindowFlags.NoNav;
        if (no_background.value)
            window_flags |= ImGui.WindowFlags.NoBackground;
        if (no_bring_to_front.value)
            window_flags |= ImGui.WindowFlags.NoBringToFrontOnFocus;
        if (unsaved_document.value)
            window_flags |= ImGui.WindowFlags.UnsavedDocument;
        if (no_close.value)
            p_open = null; // Don't pass our ImGui.Access<boolean> to Begin
        // We specify a default position/size in case there's no data in the .ini file.
        // We only do it to make the demo applications a little more welcoming, but typically this isn't required.
        const main_viewport = ImGui.GetMainViewport();
        ImGui.SetNextWindowPos(new ImGui.Vec2(main_viewport.WorkPos.x + 650, main_viewport.WorkPos.y + 20), ImGui.Cond.FirstUseEver);
        ImGui.SetNextWindowSize(new ImGui.Vec2(550, 680), ImGui.Cond.FirstUseEver);
        // Main body of the Demo window starts here.
        if (!ImGui.Begin("Dear ImGui Demo", p_open, window_flags)) {
            // Early out if the window is collapsed, as an optimization.
            ImGui.End();
            return done;
        }
        // Most "big" widgets share a common width settings by default. See 'Demo.Layout.Widgets Width' for details.
        // e.g. Use 2/3 of the space for widgets and 1/3 for labels (right align)
        //ImGui.PushItemWidth(-ImGui.GetWindowWidth() * 0.35);
        // e.g. Leave a fixed amount of width for labels (by passing a negative value), the rest goes to widgets.
        ImGui.PushItemWidth(ImGui.GetFontSize() * -12);
        // Menu Bar
        if (ImGui.BeginMenuBar()) {
            if (ImGui.BeginMenu("Menu")) {
                IMGUI_DEMO_MARKER("Menu/File");
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            if (ImGui.BeginMenu("Examples")) {
                IMGUI_DEMO_MARKER("Menu/Examples");
                ImGui.MenuItem("Main menu bar", null, show_app_main_menu_bar.access);
                ImGui.MenuItem("Console", null, show_app_console.access);
                ImGui.MenuItem("Log", null, show_app_log.access);
                ImGui.MenuItem("Simple layout", null, show_app_layout.access);
                ImGui.MenuItem("Property editor", null, show_app_property_editor.access);
                ImGui.MenuItem("Long text display", null, show_app_long_text.access);
                ImGui.MenuItem("Auto-resizing window", null, show_app_auto_resize.access);
                ImGui.MenuItem("Constrained-resizing window", null, show_app_constrained_resize.access);
                ImGui.MenuItem("Simple overlay", null, show_app_simple_overlay.access);
                ImGui.MenuItem("Fullscreen window", null, show_app_fullscreen.access);
                ImGui.MenuItem("Manipulating window titles", null, show_app_window_titles.access);
                ImGui.MenuItem("Custom rendering", null, show_app_custom_rendering.access);
                ImGui.MenuItem("Documents", null, show_app_documents.access);
                ImGui.EndMenu();
            }
            //if (ImGui.MenuItem("MenuItem")) {} // You can also use MenuItem() inside a menu bar!
            if (ImGui.BeginMenu("Tools")) {
                IMGUI_DEMO_MARKER("Menu/Tools");
                // #ifndef IMGUI_DISABLE_METRICS_WINDOW
                ImGui.MenuItem("Metrics/Debugger", null, show_app_metrics.access);
                ImGui.MenuItem("Stack Tool", null, show_app_stack_tool.access);
                // #endif
                ImGui.MenuItem("Style Editor", null, show_app_style_editor.access);
                ImGui.MenuItem("About Dear ImGui", null, show_app_about.access);
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }
        ImGui.Text(`dear imgui says hello. (${ImGui.VERSION})`);
        ImGui.Spacing();
        IMGUI_DEMO_MARKER("Help");
        if (ImGui.CollapsingHeader("Help")) {
            ImGui.Text("ABOUT THIS DEMO:");
            ImGui.BulletText("Sections below are demonstrating many aspects of the library.");
            ImGui.BulletText("The \"Examples\" menu above leads to more demo contents.");
            ImGui.BulletText("The \"Tools\" menu above gives access to: About Box, Style Editor,\n" +
                "and Metrics/Debugger (general purpose Dear ImGui debugging tool).");
            ImGui.Separator();
            ImGui.Text("PROGRAMMER GUIDE:");
            ImGui.BulletText("See the ShowDemoWindow() code in imgui_demo.cpp. <- you are here!");
            ImGui.BulletText("See comments in imgui.cpp.");
            ImGui.BulletText("See example applications in the examples/ folder.");
            ImGui.BulletText("Read the FAQ at http://www.dearimgui.org/faq/");
            ImGui.BulletText("Set 'io.ConfigFlags |= NavEnableKeyboard' for keyboard controls.");
            ImGui.BulletText("Set 'io.ConfigFlags |= NavEnableGamepad' for gamepad controls.");
            ImGui.Separator();
            ImGui.Text("USER GUIDE:");
            /*ImGui.*/ ShowUserGuide();
        }
        IMGUI_DEMO_MARKER("Configuration");
        if (ImGui.CollapsingHeader("Configuration")) {
            const io = ImGui.GetIO();
            if (ImGui.TreeNode("Configuration##2")) {
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableKeyboard", (_ = io.ConfigFlags) => io.ConfigFlags = _, ImGui.ConfigFlags.NavEnableKeyboard);
                ImGui.SameLine();
                HelpMarker("Enable keyboard controls.");
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableGamepad", (_ = io.ConfigFlags) => io.ConfigFlags = _, ImGui.ConfigFlags.NavEnableGamepad);
                ImGui.SameLine();
                HelpMarker("Enable gamepad controls. Require backend to set io.BackendFlags |= ImGui.BackendFlags.HasGamepad.\n\nRead instructions in imgui.cpp for details.");
                ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (_ = io.ConfigFlags) => io.ConfigFlags = _, ImGui.ConfigFlags.NavEnableSetMousePos);
                ImGui.SameLine();
                HelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGui.ConfigFlags.NavEnableSetMousePos.");
                ImGui.CheckboxFlags("io.ConfigFlags: NoMouse", (_ = io.ConfigFlags) => io.ConfigFlags = _, ImGui.ConfigFlags.NoMouse);
                if (io.ConfigFlags & ImGui.ConfigFlags.NoMouse) {
                    // The "NoMouse" option can get us stuck with a disabled mouse! Let's provide an alternative way to fix it:
                    if (fmodf(ImGui.GetTime(), 0.40) < 0.20) {
                        ImGui.SameLine();
                        ImGui.Text("<<PRESS SPACE TO DISABLE>>");
                    }
                    if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.Space)))
                        io.ConfigFlags &= ~ImGui.ConfigFlags.NoMouse;
                }
                ImGui.CheckboxFlags("io.ConfigFlags: NoMouseCursorChange", (_ = io.ConfigFlags) => io.ConfigFlags = _, ImGui.ConfigFlags.NoMouseCursorChange);
                ImGui.SameLine();
                HelpMarker("Instruct backend to not alter mouse cursor shape and visibility.");
                ImGui.Checkbox("io.ConfigInputTextCursorBlink", (_ = io.ConfigInputTextCursorBlink) => io.ConfigInputTextCursorBlink = _);
                ImGui.SameLine();
                HelpMarker("Enable blinking cursor (optional as some users consider it to be distracting)");
                ImGui.Checkbox("io.ConfigDragClickToInputText", (_ = io.ConfigDragClickToInputText) => io.ConfigDragClickToInputText = _);
                ImGui.SameLine();
                HelpMarker("Enable turning DragXXX widgets into text input with a simple mouse click-release (without moving).");
                ImGui.Checkbox("io.ConfigWindowsResizeFromEdges", (_ = io.ConfigWindowsResizeFromEdges) => io.ConfigWindowsResizeFromEdges = _);
                ImGui.SameLine();
                HelpMarker("Enable resizing of windows from their edges and from the lower-left corner.\nThis requires (io.BackendFlags & ImGui.BackendFlags.HasMouseCursors) because it needs mouse cursor feedback.");
                ImGui.Checkbox("io.ConfigWindowsMoveFromTitleBarOnly", (_ = io.ConfigWindowsMoveFromTitleBarOnly) => io.ConfigWindowsMoveFromTitleBarOnly = _);
                ImGui.Checkbox("io.MouseDrawCursor", (_ = io.MouseDrawCursor) => io.MouseDrawCursor = _);
                ImGui.SameLine();
                HelpMarker("Instruct Dear ImGui to render a mouse cursor itself. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
                ImGui.Text("Also see Style.Rendering for rendering options.");
                ImGui.TreePop();
                ImGui.Separator();
            }
            IMGUI_DEMO_MARKER("Configuration/Backend Flags");
            if (ImGui.TreeNode("Backend Flags")) {
                HelpMarker("Those flags are set by the backends (imgui_impl_xxx files) to specify their capabilities.\n" +
                    "Here we expose them as read-only fields to avoid breaking interactions with your backend.");
                // Make a local copy to avoid modifying actual backend flags.
                let backend_flags = io.BackendFlags;
                ImGui.CheckboxFlags("io.BackendFlags: HasGamepad", (_ = backend_flags) => backend_flags = _, ImGui.BackendFlags.HasGamepad);
                ImGui.CheckboxFlags("io.BackendFlags: HasMouseCursors", (_ = backend_flags) => backend_flags = _, ImGui.BackendFlags.HasMouseCursors);
                ImGui.CheckboxFlags("io.BackendFlags: HasSetMousePos", (_ = backend_flags) => backend_flags = _, ImGui.BackendFlags.HasSetMousePos);
                ImGui.CheckboxFlags("io.BackendFlags: RendererHasVtxOffset", (_ = backend_flags) => backend_flags = _, ImGui.BackendFlags.RendererHasVtxOffset);
                ImGui.TreePop();
                ImGui.Separator();
            }
            IMGUI_DEMO_MARKER("Configuration/Style");
            if (ImGui.TreeNode("Style")) {
                HelpMarker("The same contents can be accessed in 'Tools.Style Editor' or by calling the ShowStyleEditor() function.");
                /*ImGui.*/ ShowStyleEditor();
                ImGui.TreePop();
                ImGui.Separator();
            }
            IMGUI_DEMO_MARKER("Configuration/Capture, Logging");
            if (ImGui.TreeNode("Capture/Logging")) {
                HelpMarker("The logging API redirects all text output so you can easily capture the content of " +
                    "a window or a block. Tree nodes can be automatically expanded.\n" +
                    "Try opening any of the contents below in this window and then click one of the \"Log To\" button.");
                ImGui.LogButtons();
                HelpMarker("You can also call ImGui.LogText() to output directly to the log without a visual output.");
                if (ImGui.Button("Copy \"Hello, world!\" to clipboard")) {
                    ImGui.LogToClipboard();
                    ImGui.LogText("Hello, world!");
                    ImGui.LogFinish();
                }
                ImGui.TreePop();
            }
        }
        IMGUI_DEMO_MARKER("Window options");
        if (ImGui.CollapsingHeader("Window options")) {
            if (ImGui.BeginTable("split", 3)) {
                ImGui.TableNextColumn();
                ImGui.Checkbox("No titlebar", no_titlebar.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No scrollbar", no_scrollbar.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No menu", no_menu.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No move", no_move.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No resize", no_resize.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No collapse", no_collapse.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No close", no_close.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No nav", no_nav.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No background", no_background.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("No bring to front", no_bring_to_front.access);
                ImGui.TableNextColumn();
                ImGui.Checkbox("Unsaved document", unsaved_document.access);
                ImGui.EndTable();
            }
        }
        // All demo contents
        ShowDemoWindowWidgets();
        ShowDemoWindowLayout();
        ShowDemoWindowPopups();
        ShowDemoWindowTables();
        ShowDemoWindowMisc();
        // End of ShowDemoWindow()
        ImGui.PopItemWidth();
        ImGui.End();
        return done;
    }
    exports_1("ShowDemoWindow", /*ImGui.*/ ShowDemoWindow);
    function ShowDemoWindowWidgets() {
        IMGUI_DEMO_MARKER("Widgets");
        if (!ImGui.CollapsingHeader("Widgets"))
            return;
        const disable_all = STATIC(UNIQUE("disable_all#5b278903"), false); // The Checkbox for that is inside the "Disabled" section at the bottom
        if (disable_all.value)
            ImGui.BeginDisabled();
        IMGUI_DEMO_MARKER("Widgets/Basic");
        if (ImGui.TreeNode("Basic")) {
            IMGUI_DEMO_MARKER("Widgets/Basic/Button");
            const clicked = STATIC(UNIQUE("clicked#5b278903"), 0);
            if (ImGui.Button("Button"))
                clicked.value++;
            if (clicked.value & 1) {
                ImGui.SameLine();
                ImGui.Text("Thanks for clicking me!");
            }
            IMGUI_DEMO_MARKER("Widgets/Basic/Checkbox");
            const check = STATIC(UNIQUE("check#6b56dd31"), true);
            ImGui.Checkbox("checkbox", check.access);
            IMGUI_DEMO_MARKER("Widgets/Basic/RadioButton");
            const e = STATIC(UNIQUE("e#3d08775e"), 0);
            ImGui.RadioButton("radio a", e.access, 0);
            ImGui.SameLine();
            ImGui.RadioButton("radio b", e.access, 1);
            ImGui.SameLine();
            ImGui.RadioButton("radio c", e.access, 2);
            // Color buttons, demonstrate using PushID() to add unique identifier in the ID stack, and changing style.
            IMGUI_DEMO_MARKER("Widgets/Basic/Buttons (Colored)");
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(ImGui.Col.Button, /*(ImGui.Vec4)*/ ImGui.Color.HSV(i / 7.0, 0.6, 0.6));
                ImGui.PushStyleColor(ImGui.Col.ButtonHovered, /*(ImGui.Vec4)*/ ImGui.Color.HSV(i / 7.0, 0.7, 0.7));
                ImGui.PushStyleColor(ImGui.Col.ButtonActive, /*(ImGui.Vec4)*/ ImGui.Color.HSV(i / 7.0, 0.8, 0.8));
                ImGui.Button("Click");
                ImGui.PopStyleColor(3);
                ImGui.PopID();
            }
            // Use AlignTextToFramePadding() to align text baseline to the baseline of framed widgets elements
            // (otherwise a Text+SameLine+Button sequence will have the text a little too high by default!)
            // See 'Demo.Layout.Text Baseline Alignment' for details.
            ImGui.AlignTextToFramePadding();
            ImGui.Text("Hold to repeat:");
            ImGui.SameLine();
            // Arrow buttons with Repeater
            IMGUI_DEMO_MARKER("Widgets/Basic/Buttons (Repeating)");
            const counter = STATIC(UNIQUE("counter#26102dc6"), 0);
            const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
            ImGui.PushButtonRepeat(true);
            if (ImGui.ArrowButton("##left", ImGui.Dir.Left)) {
                counter.value--;
            }
            ImGui.SameLine(0.0, spacing);
            if (ImGui.ArrowButton("##right", ImGui.Dir.Right)) {
                counter.value++;
            }
            ImGui.PopButtonRepeat();
            ImGui.SameLine();
            ImGui.Text(`${counter.value}`);
            IMGUI_DEMO_MARKER("Widgets/Basic/Tooltips");
            ImGui.Text("Hover over me");
            if (ImGui.IsItemHovered())
                ImGui.SetTooltip("I am a tooltip");
            ImGui.SameLine();
            ImGui.Text("- or me");
            if (ImGui.IsItemHovered()) {
                ImGui.BeginTooltip();
                ImGui.Text("I am a fancy tooltip");
                const arr = STATIC(UNIQUE("arr#0025cbfb"), [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
                ImGui.PlotLines("Curve", arr.value, ImGui.ARRAYSIZE(arr.value));
                ImGui.EndTooltip();
            }
            ImGui.Separator();
            ImGui.LabelText("label", "Value");
            {
                // Using the _simplified_ one-liner Combo() api here
                // See "Combo" section for examples of how to use the more flexible BeginCombo()/EndCombo() api.
                IMGUI_DEMO_MARKER("Widgets/Basic/Combo");
                const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIIIIII", "JJJJ", "KKKKKKK"];
                const item_current = STATIC(UNIQUE("item_current#adb3af01"), 0);
                ImGui.Combo("combo", item_current.access, items, ImGui.ARRAYSIZE(items));
                ImGui.SameLine();
                HelpMarker("Using the simplified one-liner Combo API here.\nRefer to the \"Combo\" section below for an explanation of how to use the more flexible and general BeginCombo/EndCombo API.");
            }
            {
                // To wire InputText() with std::string or any other custom string type,
                // see the "Text Input > Resize Callback" section of this demo, and the misc/cpp/imgui_stdlib.h file.
                IMGUI_DEMO_MARKER("Widgets/Basic/InputText");
                const str0 = STATIC(UNIQUE("str0#16cfd787"), new ImGui.StringBuffer(128, "Hello, world!"));
                ImGui.InputText("input text", str0.value, ImGui.ARRAYSIZE(str0.value));
                ImGui.SameLine();
                HelpMarker("USER:\n" +
                    "Hold SHIFT or use mouse to select text.\n" +
                    "CTRL+Left/Right to word jump.\n" +
                    "CTRL+A or double-click to select all.\n" +
                    "CTRL+X,CTRL+C,CTRL+V clipboard.\n" +
                    "CTRL+Z,CTRL+Y undo/redo.\n" +
                    "ESCAPE to revert.\n\n" +
                    "PROGRAMMER:\n" +
                    "You can use the ImGui.InputTextFlags.CallbackResize facility if you need to wire InputText() " +
                    "to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example (this is not demonstrated " +
                    "in imgui_demo.cpp).");
                const str1 = STATIC(UNIQUE("str1#9aa9883e"), new ImGui.StringBuffer(128, ""));
                ImGui.InputTextWithHint("input text (w/ hint)", "enter text here", str1.value, ImGui.ARRAYSIZE(str1.value));
                IMGUI_DEMO_MARKER("Widgets/Basic/InputInt, InputFloat");
                const i0 = STATIC(UNIQUE("i0#d03168af"), 123);
                ImGui.InputInt("input int", i0.access);
                ImGui.SameLine();
                HelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n" +
                    "  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\n" +
                    "Use +- to subtract.");
                const f0 = STATIC(UNIQUE("f0#17d0b629"), 0.001);
                ImGui.InputFloat("input float", f0.access, 0.01, 1.0, "%.3f");
                const d0 = STATIC(UNIQUE("d0#920dec57"), 999999.00000001);
                ImGui.InputDouble("input double", d0.access, 0.01, 1.0, "%.8f");
                const f1 = STATIC(UNIQUE("f1#df8da52b"), 1.e10);
                ImGui.InputFloat("input scientific", f1.access, 0.0, 0.0, "%e");
                ImGui.SameLine();
                HelpMarker("You can input value using the scientific notation,\n" +
                    "  e.g. \"1e+8\" becomes \"100000000\".");
                const vec4a = STATIC(UNIQUE("vec4a#90fabef4"), [0.10, 0.20, 0.30, 0.44]);
                ImGui.InputFloat3("input float3", vec4a.value);
            }
            {
                IMGUI_DEMO_MARKER("Widgets/Basic/DragInt, DragFloat");
                const i1 = STATIC(UNIQUE("i1#cc2f2f26"), 50);
                const i2 = STATIC(UNIQUE("i2#8b24152f"), 42);
                ImGui.DragInt("drag int", i1.access, 1);
                ImGui.SameLine();
                HelpMarker("Click and drag to edit value.\n" +
                    "Hold SHIFT/ALT for faster/slower edit.\n" +
                    "Double-click or CTRL+click to input value.");
                ImGui.DragInt("drag int 0..100", i2.access, 1, 0, 100, "%d%%", ImGui.SliderFlags.AlwaysClamp);
                const f1 = STATIC(UNIQUE("f1#9108ba50"), 1.00);
                const f2 = STATIC(UNIQUE("f2#3915ff27"), 0.0067);
                ImGui.DragFloat("drag float", f1.access, 0.005);
                ImGui.DragFloat("drag small float", f2.access, 0.0001, 0.0, 0.0, "%.06f ns");
            }
            {
                IMGUI_DEMO_MARKER("Widgets/Basic/SliderInt, SliderFloat");
                const i1 = STATIC(UNIQUE("i1#ec30714c"), 0);
                ImGui.SliderInt("slider int", i1.access, -1, 3);
                ImGui.SameLine();
                HelpMarker("CTRL+click to input value.");
                const f1 = STATIC(UNIQUE("f1#8ba9d64d"), 0.123);
                const f2 = STATIC(UNIQUE("f2#c362b146"), 0.0);
                ImGui.SliderFloat("slider float", f1.access, 0.0, 1.0, "ratio = %.3f");
                ImGui.SliderFloat("slider float (log)", f2.access, -10.0, 10.0, "%.4f", ImGui.SliderFlags.Logarithmic);
                IMGUI_DEMO_MARKER("Widgets/Basic/SliderAngle");
                const angle = STATIC(UNIQUE("angle#5c327a64"), 0.0);
                ImGui.SliderAngle("slider angle", angle.access);
                // Using the format string to display a name instead of an integer.
                // Here we completely omit '%d' from the format string, so it'll only display a name.
                // This technique can also be used with DragInt().
                IMGUI_DEMO_MARKER("Widgets/Basic/Slider (enum)");
                let Element;
                (function (Element) {
                    Element[Element["Fire"] = 0] = "Fire";
                    Element[Element["Earth"] = 1] = "Earth";
                    Element[Element["Air"] = 2] = "Air";
                    Element[Element["Water"] = 3] = "Water";
                    Element[Element["COUNT"] = 4] = "COUNT";
                })(Element || (Element = {}));
                ;
                const elem = STATIC(UNIQUE("elem#b41812c5"), Element.Fire);
                const elems_names = ["Fire", "Earth", "Air", "Water"];
                const elem_name = (elem.value >= 0 && elem.value < Element.COUNT) ? elems_names[elem.value] : "Unknown";
                ImGui.SliderInt("slider enum", elem.access, 0, Element.COUNT - 1, elem_name);
                ImGui.SameLine();
                HelpMarker("Using the format string parameter to display a name instead of the underlying integer.");
            }
            {
                IMGUI_DEMO_MARKER("Widgets/Basic/ColorEdit3, ColorEdit4");
                const col1 = STATIC(UNIQUE("col1#dccda06c"), [1.0, 0.0, 0.2]);
                const col2 = STATIC(UNIQUE("col2#4b540f98"), [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit3("color 1", col1.value);
                ImGui.SameLine();
                HelpMarker("Click on the color square to open a color picker.\n" +
                    "Click and hold to use drag and drop.\n" +
                    "Right-click on the color square to show options.\n" +
                    "CTRL+click on individual component to input value.\n");
                ImGui.ColorEdit4("color 2", col2.value);
            }
            {
                // Using the _simplified_ one-liner ListBox() api here
                // See "List boxes" section for examples of how to use the more flexible BeginListBox()/EndListBox() api.
                IMGUI_DEMO_MARKER("Widgets/Basic/ListBox");
                const items = ["Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon"];
                const item_current = STATIC(UNIQUE("item_current#2c2f8c94"), 1);
                ImGui.ListBox("listbox", item_current.access, items, ImGui.IM_ARRAYSIZE(items), 4);
                ImGui.SameLine();
                HelpMarker("Using the simplified one-liner ListBox API here.\nRefer to the \"List boxes\" section below for an explanation of how to use the more flexible and general BeginListBox/EndListBox API.");
            }
            ImGui.TreePop();
        }
        // Testing ImGui.OnceUponAFrame helper.
        //static ImGui.OnceUponAFrame once;
        //for (let i = 0; i < 5; i++)
        //    if (once)
        //        ImGui.Text("This will be displayed only once.");
        IMGUI_DEMO_MARKER("Widgets/Trees");
        if (ImGui.TreeNode("Trees")) {
            IMGUI_DEMO_MARKER("Widgets/Trees/Basic trees");
            if (ImGui.TreeNode("Basic trees")) {
                for (let i = 0; i < 5; i++) {
                    // Use SetNextItemOpen() so set the default state of a node to be open. We could
                    // also use TreeNodeEx() with the ImGui.TreeNodeFlags.DefaultOpen flag to achieve the same thing!
                    if (i === 0)
                        ImGui.SetNextItemOpen(true, ImGui.Cond.Once);
                    if (ImGui.TreeNode(/*(void*)(intptr_t)*/ i, `Child ${i}`)) {
                        ImGui.Text("blah blah");
                        ImGui.SameLine();
                        if (ImGui.SmallButton("button")) { }
                        ImGui.TreePop();
                    }
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Trees/Advanced, with Selectable nodes");
            if (ImGui.TreeNode("Advanced, with Selectable nodes")) {
                HelpMarker("This is a more typical looking tree with selectable nodes.\n" +
                    "Click to select, CTRL+Click to toggle, click on arrows or double-click to open.");
                const base_flags = STATIC(UNIQUE("base_flags#f8c171be"), ImGui.TreeNodeFlags.OpenOnArrow | ImGui.TreeNodeFlags.OpenOnDoubleClick | ImGui.TreeNodeFlags.SpanAvailWidth);
                const align_label_with_current_x_position = STATIC(UNIQUE("align_label_with_current_x_position#198220a0"), false);
                const test_drag_and_drop = STATIC(UNIQUE("test_drag_and_drop#3e803533"), false);
                ImGui.CheckboxFlags("ImGui.TreeNodeFlags.OpenOnArrow", base_flags.access, ImGui.TreeNodeFlags.OpenOnArrow);
                ImGui.CheckboxFlags("ImGui.TreeNodeFlags.OpenOnDoubleClick", base_flags.access, ImGui.TreeNodeFlags.OpenOnDoubleClick);
                ImGui.CheckboxFlags("ImGui.TreeNodeFlags.SpanAvailWidth", base_flags.access, ImGui.TreeNodeFlags.SpanAvailWidth);
                ImGui.SameLine();
                HelpMarker("Extend hit area to all available width instead of allowing more items to be laid out after the node.");
                ImGui.CheckboxFlags("ImGui.TreeNodeFlags.SpanFullWidth", base_flags.access, ImGui.TreeNodeFlags.SpanFullWidth);
                ImGui.Checkbox("Align label with current X position", align_label_with_current_x_position.access);
                ImGui.Checkbox("Test tree node as drag source", test_drag_and_drop.access);
                ImGui.Text("Hello!");
                if (align_label_with_current_x_position.value)
                    ImGui.Unindent(ImGui.GetTreeNodeToLabelSpacing());
                // 'selection_mask' is dumb representation of what may be user-side selection state.
                //  You may retain selection state inside or outside your objects in whatever format you see fit.
                // 'node_clicked' is temporary storage of what node we have clicked to process selection at the end
                /// of the loop. May be a pointer to your own node type, etc.
                const selection_mask = STATIC(UNIQUE("selection_mask#b42bb9cf"), (1 << 2));
                let node_clicked = -1;
                for (let i = 0; i < 6; i++) {
                    // Disable the default "open on single-click behavior" + set Selected flag according to our selection.
                    // To alter selection we use IsItemClicked() && !IsItemToggledOpen(), so clicking on an arrow doesn't alter selection.
                    let node_flags = base_flags.value;
                    const is_selected = (selection_mask.value & (1 << i)) !== 0;
                    if (is_selected)
                        node_flags |= ImGui.TreeNodeFlags.Selected;
                    if (i < 3) {
                        // this.Items 0..2 are Tree Node
                        const node_open = ImGui.TreeNodeEx(/*(void*)(intptr_t)*/ i, node_flags, `Selectable Node ${i}`);
                        if (ImGui.IsItemClicked() && !ImGui.IsItemToggledOpen())
                            node_clicked = i;
                        if (test_drag_and_drop.value && ImGui.BeginDragDropSource()) {
                            ImGui.SetDragDropPayload("_TREENODE", null, 0);
                            ImGui.Text("This is a drag and drop source");
                            ImGui.EndDragDropSource();
                        }
                        if (node_open) {
                            ImGui.BulletText("Blah blah\nBlah Blah");
                            ImGui.TreePop();
                        }
                    }
                    else {
                        // this.Items 3..5 are Tree Leaves
                        // The only reason we use TreeNode at all is to allow selection of the leaf. Otherwise we can
                        // use BulletText() or advance the cursor by GetTreeNodeToLabelSpacing() and call Text().
                        node_flags |= ImGui.TreeNodeFlags.Leaf | ImGui.TreeNodeFlags.NoTreePushOnOpen; // ImGui.TreeNodeFlags.Bullet
                        ImGui.TreeNodeEx(/*(void*)(intptr_t)*/ i, node_flags, `Selectable Leaf ${i}`);
                        if (ImGui.IsItemClicked() && !ImGui.IsItemToggledOpen())
                            node_clicked = i;
                        if (test_drag_and_drop.value && ImGui.BeginDragDropSource()) {
                            ImGui.SetDragDropPayload("_TREENODE", null, 0);
                            ImGui.Text("This is a drag and drop source");
                            ImGui.EndDragDropSource();
                        }
                    }
                }
                if (node_clicked !== -1) {
                    // Update selection state
                    // (process outside of tree loop to avoid visual inconsistencies during the clicking frame)
                    if (ImGui.GetIO().KeyCtrl)
                        selection_mask.value ^= (1 << node_clicked); // CTRL+click to toggle
                    else //if (!(selection_mask.value & (1 << node_clicked))) // Depending on selection behavior you want, may want to preserve selection when clicking on item that is part of the selection
                        selection_mask.value = (1 << node_clicked); // Click to single-select
                }
                if (align_label_with_current_x_position.value)
                    ImGui.Indent(ImGui.GetTreeNodeToLabelSpacing());
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Collapsing Headers");
        if (ImGui.TreeNode("Collapsing Headers")) {
            const closable_group = STATIC(UNIQUE("closable_group#6e4b8850"), true);
            ImGui.Checkbox("Show 2nd header", closable_group.access);
            if (ImGui.CollapsingHeader("Header", ImGui.TreeNodeFlags.None)) {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`Some content ${i}`);
            }
            if (ImGui.CollapsingHeader("Header with a close button", closable_group.access)) {
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
                for (let i = 0; i < 5; i++)
                    ImGui.Text(`More content ${i}`);
            }
            /*
            if (ImGui.CollapsingHeader("Header with a bullet", ImGui.TreeNodeFlags.Bullet))
                ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
            */
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Bullets");
        if (ImGui.TreeNode("Bullets")) {
            ImGui.BulletText("Bullet point 1");
            ImGui.BulletText("Bullet point 2\nOn multiple lines");
            if (ImGui.TreeNode("Tree node")) {
                ImGui.BulletText("Another bullet point");
                ImGui.TreePop();
            }
            ImGui.Bullet();
            ImGui.Text("Bullet point 3 (two calls)");
            ImGui.Bullet();
            ImGui.SmallButton("Button");
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Text");
        if (ImGui.TreeNode("Text")) {
            IMGUI_DEMO_MARKER("Widgets/Text/Colored Text");
            if (ImGui.TreeNode("Colorful Text")) {
                // Using shortcut. You can use PushStyleColor()/PopStyleColor() for more flexibility.
                ImGui.TextColored(new ImGui.Vec4(1.0, 0.0, 1.0, 1.0), "Pink");
                ImGui.TextColored(new ImGui.Vec4(1.0, 1.0, 0.0, 1.0), "Yellow");
                ImGui.TextDisabled("Disabled");
                ImGui.SameLine();
                HelpMarker("The TextDisabled color is stored in ImGui.Style.");
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Text/Word Wrapping");
            if (ImGui.TreeNode("Word Wrapping")) {
                // Using shortcut. You can use PushTextWrapPos()/PopTextWrapPos() for more flexibility.
                ImGui.TextWrapped("This text should automatically wrap on the edge of the window. The current implementation " +
                    "for text wrapping follows simple rules suitable for English and possibly other languages.");
                ImGui.Spacing();
                const wrap_width = STATIC(UNIQUE("wrap_width#ade20c8d"), 200.0);
                ImGui.SliderFloat("Wrap width", wrap_width.access, -20, 600, "%.0f");
                const draw_list = ImGui.GetWindowDrawList();
                for (let n = 0; n < 2; n++) {
                    ImGui.Text(`Test paragraph ${n}:`);
                    const pos = ImGui.GetCursorScreenPos();
                    const marker_min = new ImGui.Vec2(pos.x + wrap_width.value, pos.y);
                    const marker_max = new ImGui.Vec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight());
                    ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                    if (n === 0)
                        ImGui.Text(`The lazy dog is a good dog. This paragraph should fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                    else
                        ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                    // Draw actual text bounding box, following by marker of our expected limit (should not overlap!)
                    draw_list.AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), ImGui.COL32(255, 255, 0, 255));
                    draw_list.AddRectFilled(marker_min, marker_max, ImGui.COL32(255, 0, 255, 255));
                    ImGui.PopTextWrapPos();
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Text/UTF-8 Text");
            if (ImGui.TreeNode("UTF-8 Text")) {
                // UTF-8 test with Japanese characters
                // (Needs a suitable font? Try "Google Noto" or "Arial Unicode". See docs/FONTS.md for details.)
                // - From C++11 you can use the u8"my text" syntax to encode literal strings as UTF-8
                // - For earlier compiler, you may be able to encode your sources as UTF-8 (e.g. in Visual Studio, you
                //   can save your source files as 'UTF-8 without signature').
                // - FOR THIS DEMO FILE ONLY, BECAUSE WE WANT TO SUPPORT OLD COMPILERS, WE ARE *NOT* INCLUDING RAW UTF-8
                //   CHARACTERS IN THIS SOURCE FILE. Instead we are encoding a few strings with hexadecimal constants.
                //   Don't do this in your application! Please use u8"text in any language" in your application!
                // Note that characters values are preserved even by InputText() if the font cannot be displayed,
                // so you can safely copy & paste garbled characters into another application.
                ImGui.TextWrapped("CJK text will only appears if the font was loaded with the appropriate CJK character ranges. " +
                    "Call io.Fonts.AddFontFromFileTTF() manually to load extra character ranges. " +
                    "Read docs/FONTS.md for details.");
                // ImGui.Text("Hiragana: \xe3\x81\x8b\xe3\x81\x8d\xe3\x81\x8f\xe3\x81\x91\xe3\x81\x93 (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                // か \xe3\x81\x8b U+304B &#12363;
                // き \xe3\x81\x8d U+304D &#12365;
                // く \xe3\x81\x8f U+304F &#12367;
                // け \xe3\x81\x91 U+3051 &#12369;
                // こ \xe3\x81\x93 U+3053 &#12371;
                ImGui.Text("Hiragana: かきくけこ (kakikukeko)"); // Normally we would use u8"blah blah" with the proper characters directly in the string.
                // ImGui.Text("Kanjis: \xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e (nihongo)");
                // 日 \xe6\x97\xa5 U+65E5 &#26085;
                // 本 \xe6\x9c\xac U+672C &#26412;
                // 語 \xe8\xaa\x9e U+8A9E &#35486;
                ImGui.Text("Kanjis: 日本語 (nihongo)");
                // const buf = STATIC<ImGui.StringBuffer>(UNIQUE("buf#5d65d4f9"), new ImGui.StringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e"));
                const buf = STATIC(UNIQUE("buf#2d64d85e"), new ImGui.StringBuffer(32, "日本語"));
                //const buf = STATIC<ImGui.StringBuffer>(UNIQUE("buf#4610aac2"), new ImGui.StringBuffer(32, /*u8*/"NIHONGO")); // <- this is how you would write it with C++11, using real kanjis
                ImGui.InputText("UTF-8 input", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Images");
        if (ImGui.TreeNode("Images")) {
            const io = ImGui.GetIO();
            ImGui.TextWrapped("Below we are displaying the font texture (which is the only texture we have access to in this demo). " +
                "Use the 'ImTextureID' type as storage to pass pointers or identifier to your own texture data. " +
                "Hover the texture for a zoomed view!");
            // Below we are displaying the font texture because it is the only texture we have access to inside the demo!
            // Remember that ImTextureID is just storage for whatever you want it to be. It is essentially a value that
            // will be passed to the rendering backend via the ImDrawCmd structure.
            // If you use one of the default imgui_impl_XXXX.cpp rendering backend, they all have comments at the top
            // of their respective source file to specify what they expect to be stored in ImTextureID, for example:
            // - The imgui_impl_dx11.cpp renderer expect a 'ID3D11ShaderResourceView*' pointer
            // - The imgui_impl_opengl3.cpp renderer expect a GLuint OpenGL texture identifier, etc.
            // More:
            // - If you decided that ImTextureID = MyEngineTexture*, then you can pass your MyEngineTexture* pointers
            //   to ImGui.Image(), and gather width/height through your own functions, etc.
            // - You can use ShowMetricsWindow() to inspect the draw data that are being passed to your renderer,
            //   it will help you debug issues if you are confused about it.
            // - Consider using the lower-level ImDrawList.AddImage() API, via ImGui.GetWindowDrawList().AddImage().
            // - Read https://github.com/ocornut/imgui/blob/master/docs/FAQ.md
            // - Read https://github.com/ocornut/imgui/wiki/Image-Loading-and-Displaying-Examples
            const my_tex_id = io.Fonts.TexID;
            const my_tex_w = io.Fonts.TexWidth;
            const my_tex_h = io.Fonts.TexHeight;
            {
                ImGui.Text(`${my_tex_w.toFixed(0)}x${my_tex_h.toFixed(0)}`);
                const pos = ImGui.GetCursorScreenPos();
                const uv_min = new ImGui.Vec2(0.0, 0.0); // Top-left
                const uv_max = new ImGui.Vec2(1.0, 1.0); // Lower-right
                const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
                const border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.5); // 50% opaque white
                ImGui.Image(my_tex_id, new ImGui.Vec2(my_tex_w, my_tex_h), uv_min, uv_max, tint_col, border_col);
                if (ImGui.IsItemHovered()) {
                    ImGui.BeginTooltip();
                    const region_sz = 32.0;
                    let region_x = io.MousePos.x - pos.x - region_sz * 0.5;
                    let region_y = io.MousePos.y - pos.y - region_sz * 0.5;
                    const zoom = 4.0;
                    if (region_x < 0.0) {
                        region_x = 0.0;
                    }
                    else if (region_x > my_tex_w - region_sz) {
                        region_x = my_tex_w - region_sz;
                    }
                    if (region_y < 0.0) {
                        region_y = 0.0;
                    }
                    else if (region_y > my_tex_h - region_sz) {
                        region_y = my_tex_h - region_sz;
                    }
                    ImGui.Text(`Min: (${region_x.toFixed(2)}, ${region_y.toFixed(2)})`);
                    ImGui.Text(`Max: (${(region_x + region_sz).toFixed(2)}, ${(region_y + region_sz).toFixed(2)})`);
                    const uv0 = new ImGui.Vec2((region_x) / my_tex_w, (region_y) / my_tex_h);
                    const uv1 = new ImGui.Vec2((region_x + region_sz) / my_tex_w, (region_y + region_sz) / my_tex_h);
                    ImGui.Image(my_tex_id, new ImGui.Vec2(region_sz * zoom, region_sz * zoom), uv0, uv1, tint_col, border_col);
                    ImGui.EndTooltip();
                }
            }
            IMGUI_DEMO_MARKER("Widgets/Images/Textured buttons");
            ImGui.TextWrapped("And now some textured buttons..");
            const pressed_count = STATIC(UNIQUE("pressed_count#9e9e3fbe"), 0);
            for (let i = 0; i < 8; i++) {
                ImGui.PushID(i);
                let frame_padding = -1 + i; // -1 === uses default padding (style.FramePadding)
                const size = new ImGui.Vec2(32.0, 32.0); // Size of the image we want to make visible
                const uv0 = new ImGui.Vec2(0.0, 0.0); // UV coordinates for lower-left
                const uv1 = new ImGui.Vec2(32.0 / my_tex_w, 32.0 / my_tex_h); // UV coordinates for (32,32) in our texture
                const bg_col = new ImGui.Vec4(0.0, 0.0, 0.0, 1.0); // Black background
                const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0); // No tint
                if (ImGui.ImageButton(my_tex_id, size, uv0, uv1, frame_padding, bg_col, tint_col))
                    pressed_count.value += 1;
                ImGui.PopID();
                ImGui.SameLine();
            }
            ImGui.NewLine();
            ImGui.Text(`Pressed ${pressed_count.value} times.`);
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Combo");
        if (ImGui.TreeNode("Combo")) {
            // Expose flags as checkbox for the demo
            const flags = STATIC(UNIQUE("flags#497e993c"), 0);
            ImGui.CheckboxFlags("ImGui.ComboFlags.PopupAlignLeft", flags.access, ImGui.ComboFlags.PopupAlignLeft);
            ImGui.SameLine();
            HelpMarker("Only makes a difference if the popup is larger than the combo");
            if (ImGui.CheckboxFlags("ImGui.ComboFlags.NoArrowButton", flags.access, ImGui.ComboFlags.NoArrowButton))
                flags.value &= ~ImGui.ComboFlags.NoPreview; // Clear the other flag, as we cannot combine both
            if (ImGui.CheckboxFlags("ImGui.ComboFlags.NoPreview", flags.access, ImGui.ComboFlags.NoPreview))
                flags.value &= ~ImGui.ComboFlags.NoArrowButton; // Clear the other flag, as we cannot combine both
            // Using the generic BeginCombo() API, you have full control over how to display the combo contents.
            // (your selection data could be an index, a pointer to the object, an id for the object, a flag intrusively
            // stored in the object itself, etc.)
            const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO"];
            const item_current_idx = STATIC(UNIQUE("item_current_idx#ad5a498a"), 0); // Here we store our selection data as an index.
            const combo_preview_value = items[item_current_idx.value]; // Pass in the preview value visible before opening the combo (it could be anything)
            if (ImGui.BeginCombo("combo 1", combo_preview_value, flags.value)) {
                for (let n = 0; n < ImGui.ARRAYSIZE(items); n++) {
                    const is_selected = (item_current_idx.value === n);
                    if (ImGui.Selectable(items[n], is_selected))
                        item_current_idx.value = n;
                    // Set the initial focus when opening the combo (scrolling + keyboard navigation focus)
                    if (is_selected)
                        ImGui.SetItemDefaultFocus();
                }
                ImGui.EndCombo();
            }
            // Simplified one-liner Combo() API, using values packed in a single constant string
            // This is a convenience for when the selection set is small and known at compile-time.
            const item_current_2 = STATIC(UNIQUE("item_current_2#fd1baaff"), 0);
            ImGui.Combo("combo 2 (one-liner)", item_current_2.access, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
            // Simplified one-liner Combo() using an array of string
            // This is not very useful (may obsolete): prefer using BeginCombo()/EndCombo() for full control.
            const item_current_3 = STATIC(UNIQUE("item_current_3#0e138d1f"), -1); // If the selection isn't within 0..count, Combo won't display a preview
            ImGui.Combo("combo 3 (array)", item_current_3.access, items, ImGui.ARRAYSIZE(items));
            // Simplified one-liner Combo() using an accessor function
            class Funcs {
                static ItemGetter(data, n, out_str) { out_str[0] = data[n]; return true; }
                ;
            }
            const item_current_4 = STATIC(UNIQUE("item_current_4#4a9812a5"), 0);
            ImGui.Combo("combo 4 (function)", item_current_4.access, Funcs.ItemGetter, items, ImGui.ARRAYSIZE(items));
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/List Boxes");
        if (ImGui.TreeNode("List boxes")) {
            // Using the generic BeginListBox() API, you have full control over how to display the combo contents.
            // (your selection data could be an index, a pointer to the object, an id for the object, a flag intrusively
            // stored in the object itself, etc.)
            const items = ["AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO"];
            const item_current_idx = STATIC(UNIQUE("item_current_idx#ad5a498b"), 0); // Here we store our selection data as an index.
            if (ImGui.BeginListBox("listbox 1")) {
                for (let n = 0; n < ImGui.IM_ARRAYSIZE(items); n++) {
                    const is_selected = (item_current_idx.value === n);
                    if (ImGui.Selectable(items[n], is_selected))
                        item_current_idx.value = n;
                    // Set the initial focus when opening the combo (scrolling + keyboard navigation focus)
                    if (is_selected)
                        ImGui.SetItemDefaultFocus();
                }
                ImGui.EndListBox();
            }
            // Custom size: use all width, 5 items tall
            ImGui.Text("Full-width:");
            if (ImGui.BeginListBox("##listbox 2", new ImGui.Vec2(-FLT_MIN, 5 * ImGui.GetTextLineHeightWithSpacing()))) {
                for (let n = 0; n < ImGui.IM_ARRAYSIZE(items); n++) {
                    const is_selected = (item_current_idx.value === n);
                    if (ImGui.Selectable(items[n], is_selected))
                        item_current_idx.value = n;
                    // Set the initial focus when opening the combo (scrolling + keyboard navigation focus)
                    if (is_selected)
                        ImGui.SetItemDefaultFocus();
                }
                ImGui.EndListBox();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Selectables");
        if (ImGui.TreeNode("Selectables")) {
            // Selectable() has 2 overloads:
            // - The one taking "boolean selected" as a read-only selection information.
            //   When Selectable() has been clicked it returns true and you can alter selection state accordingly.
            // - The one taking "boolean* p_selected" as a read-write selection information (convenient in some cases)
            // The earlier is more flexible, as in real application your selection may be stored in many different ways
            // and not necessarily inside a boolean value (e.g. in flags within objects, as an external list, etc).
            IMGUI_DEMO_MARKER("Widgets/Selectables/Basic");
            if (ImGui.TreeNode("Basic")) {
                const selection = STATIC_ARRAY(5, UNIQUE("selection#f8a5b65d"), [false, true, false, false, false]);
                ImGui.Selectable("1. I am selectable", selection.access(0));
                ImGui.Selectable("2. I am selectable", selection.access(1));
                ImGui.Text("(I am not selectable)");
                ImGui.Selectable("4. I am selectable", selection.access(3));
                if (ImGui.Selectable("5. I am double clickable", selection.value[4], ImGui.SelectableFlags.AllowDoubleClick))
                    if (ImGui.IsMouseDoubleClicked(0))
                        selection.value[4] = !selection.value[4];
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/Single Selection");
            if (ImGui.TreeNode("Selection State: Single Selection")) {
                const selected = STATIC(UNIQUE("selected#ea8aa196"), -1);
                for (let n = 0; n < 5; n++) {
                    const buf = `Object ${n}`;
                    if (ImGui.Selectable(buf, selected.value === n))
                        selected.value = n;
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/Multiple Selection");
            if (ImGui.TreeNode("Selection State: Multiple Selection")) {
                HelpMarker("Hold CTRL and click to select multiple items.");
                const selection = STATIC_ARRAY(5, UNIQUE("selection#9b557266"), [false, false, false, false, false]);
                for (let n = 0; n < 5; n++) {
                    const buf = `Object ${n}`;
                    if (ImGui.Selectable(buf, selection.access(n))) {
                        if (!ImGui.GetIO().KeyCtrl) // Clear selection when CTRL is not held
                            selection.value.fill(false); // memset(selection, 0, sizeof(selection));
                        selection.value[n] = !selection.value[n]; // selection.value[n] ^= 1;
                    }
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/Rendering more text into the same line");
            if (ImGui.TreeNode("Rendering more text into the same line")) {
                // Using the Selectable() override that takes "boolean* p_selected" parameter,
                // this function toggle your boolean value automatically.
                const selected = STATIC_ARRAY(3, UNIQUE("selected#40db4a13"), [false, false, false]);
                ImGui.Selectable("main.c", selected.access(0));
                ImGui.SameLine(300);
                ImGui.Text(" 2,345 bytes");
                ImGui.Selectable("Hello.cpp", selected.access(1));
                ImGui.SameLine(300);
                ImGui.Text("12,345 bytes");
                ImGui.Selectable("Hello.h", selected.access(2));
                ImGui.SameLine(300);
                ImGui.Text(" 2,345 bytes");
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/In columns");
            if (ImGui.TreeNode("In columns")) {
                const selected = STATIC_ARRAY(10, UNIQUE("selected#7f38a195"), []);
                if (ImGui.BeginTable("split1", 3, ImGui.TableFlags.Resizable | ImGui.TableFlags.NoSavedSettings | ImGui.TableFlags.Borders)) {
                    for (let i = 0; i < 10; i++) {
                        const label = `Item ${i}`;
                        ImGui.TableNextColumn();
                        ImGui.Selectable(label, selected.access(i)); // FIXME-TABLE: Selection overlap
                    }
                    ImGui.EndTable();
                }
                ImGui.Spacing();
                if (ImGui.BeginTable("split2", 3, ImGui.TableFlags.Resizable | ImGui.TableFlags.NoSavedSettings | ImGui.TableFlags.Borders)) {
                    for (let i = 0; i < 10; i++) {
                        const label = `Item ${i}`;
                        ImGui.TableNextRow();
                        ImGui.TableNextColumn();
                        ImGui.Selectable(label, selected.access(i), ImGui.SelectableFlags.SpanAllColumns);
                        ImGui.TableNextColumn();
                        ImGui.Text("Some other contents");
                        ImGui.TableNextColumn();
                        ImGui.Text("123456");
                    }
                    ImGui.EndTable();
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/Grid");
            if (ImGui.TreeNode("Grid")) {
                const selected = STATIC(UNIQUE("selected#f3d71ffb"), [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
                // Add in a bit of silly fun...
                const time = ImGui.GetTime();
                // const winning_state: boolean = memchr(selected, 0, sizeof(selected)) === null; // If all cells are selected...
                const winning_state = 1 === selected.value.reduce((total, row) => total & row.reduce((row_total, cell) => row_total & cell, 1), 1); // If all cells are selected...
                if (winning_state)
                    ImGui.PushStyleVar(ImGui.StyleVar.SelectableTextAlign, new ImGui.Vec2(0.5 + 0.5 * Math.cos(time * 2.0), 0.5 + 0.5 * Math.sin(time * 3.0)));
                for (let y = 0; y < 4; y++)
                    for (let x = 0; x < 4; x++) {
                        if (x > 0)
                            ImGui.SameLine();
                        ImGui.PushID(y * 4 + x);
                        if (ImGui.Selectable("Sailor", selected.value[y][x] !== 0, 0, new ImGui.Vec2(50, 50))) {
                            // Toggle clicked cell + toggle neighbors
                            selected.value[y][x] ^= 1;
                            if (x > 0) {
                                selected.value[y][x - 1] ^= 1;
                            }
                            if (x < 3) {
                                selected.value[y][x + 1] ^= 1;
                            }
                            if (y > 0) {
                                selected.value[y - 1][x] ^= 1;
                            }
                            if (y < 3) {
                                selected.value[y + 1][x] ^= 1;
                            }
                        }
                        ImGui.PopID();
                    }
                if (winning_state)
                    ImGui.PopStyleVar();
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Selectables/Alignment");
            if (ImGui.TreeNode("Alignment")) {
                HelpMarker("By default, Selectables uses style.SelectableTextAlign but it can be overridden on a per-item " +
                    "basis using PushStyleVar(). You'll probably want to always keep your default situation to " +
                    "left-align otherwise it becomes difficult to layout multiple items on a same line");
                const selected = STATIC_ARRAY(9 /*3*3*/, UNIQUE("selected#846dd8d4"), [true, false, true, false, true, false, true, false, true]);
                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 3; x++) {
                        const alignment = new ImGui.Vec2(x / 2.0, y / 2.0);
                        const name = `${alignment.x.toFixed(1)},${alignment.y.toFixed(1)}`;
                        if (x > 0)
                            ImGui.SameLine();
                        ImGui.PushStyleVar(ImGui.StyleVar.SelectableTextAlign, alignment);
                        ImGui.Selectable(name, selected.access(3 * y + x), ImGui.SelectableFlags.None, new ImGui.Vec2(80, 80));
                        ImGui.PopStyleVar();
                    }
                }
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        // To wire InputText() with std::string or any other custom string type,
        // see the "Text Input > Resize Callback" section of this demo, and the misc/cpp/imgui_stdlib.h file.
        IMGUI_DEMO_MARKER("Widgets/Text Input");
        if (ImGui.TreeNode("Text Input")) {
            IMGUI_DEMO_MARKER("Widgets/Text Input/Multi-line Text Input");
            if (ImGui.TreeNode("Multi-line Text Input")) {
                // Note: we are using a fixed-sized buffer for simplicity here. See ImGui.InputTextFlags.CallbackResize
                // and the code in misc/cpp/imgui_stdlib.h for how to setup InputText() for dynamically resizing strings.
                const text = STATIC(UNIQUE("text#a6a428ac"), new ImGui.StringBuffer(1024 * 16, "/*\n" +
                    " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
                    " the hexadecimal encoding of one offending instruction,\n" +
                    " more formally, the invalid operand with locked CMPXCHG8B\n" +
                    " instruction bug, is a design flaw in the majority of\n" +
                    " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
                    " processors (all in the P5 microarchitecture).\n" +
                    "*/\n\n" +
                    "label:\n" +
                    "\tlock cmpxchg8b eax\n"));
                const flags = STATIC(UNIQUE("flags#1c871733"), ImGui.InputTextFlags.AllowTabInput);
                HelpMarker("You can use the ImGui.InputTextFlags.CallbackResize facility if you need to wire InputTextMultiline() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example. (This is not demonstrated in imgui_demo.cpp because we don't want to include <string> in here)");
                ImGui.CheckboxFlags("ImGui.InputTextFlags.ReadOnly", flags.access, ImGui.InputTextFlags.ReadOnly);
                ImGui.CheckboxFlags("ImGui.InputTextFlags.AllowTabInput", flags.access, ImGui.InputTextFlags.AllowTabInput);
                ImGui.CheckboxFlags("ImGui.InputTextFlags.CtrlEnterForNewLine", flags.access, ImGui.InputTextFlags.CtrlEnterForNewLine);
                ImGui.InputTextMultiline("##source", text.value, ImGui.ARRAYSIZE(text.value), new ImGui.Vec2(-FLT_MIN, ImGui.GetTextLineHeight() * 16), flags.value);
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Text Input/Filtered Text Input");
            if (ImGui.TreeNode("Filtered Text Input")) {
                class TextFilters {
                    // Return 0 (pass) if the character is 'i' or 'm' or 'g' or 'u' or 'i'
                    static FilterImGuiLetters(data) {
                        if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar)))
                            return 0;
                        return 1;
                    }
                }
                const buf1 = STATIC(UNIQUE("buf1#92a08891"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("default", buf1.value, ImGui.ARRAYSIZE(buf1.value));
                const buf2 = STATIC(UNIQUE("buf2#e0010b25"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("decimal", buf2.value, ImGui.ARRAYSIZE(buf2.value), ImGui.InputTextFlags.CharsDecimal);
                const buf3 = STATIC(UNIQUE("buf3#bdf9a76f"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("hexadecimal", buf3.value, ImGui.ARRAYSIZE(buf3.value), ImGui.InputTextFlags.CharsHexadecimal | ImGui.InputTextFlags.CharsUppercase);
                const buf4 = STATIC(UNIQUE("buf4#5777c5e3"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("uppercase", buf4.value, ImGui.ARRAYSIZE(buf4.value), ImGui.InputTextFlags.CharsUppercase);
                const buf5 = STATIC(UNIQUE("buf5#5bd76499"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("no blank", buf5.value, ImGui.ARRAYSIZE(buf5.value), ImGui.InputTextFlags.CharsNoBlank);
                const buf6 = STATIC(UNIQUE("buf6#29e951c2"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("\"imgui\" letters", buf6.value, ImGui.ARRAYSIZE(buf6.value), ImGui.InputTextFlags.CallbackCharFilter, TextFilters.FilterImGuiLetters);
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Text Input/Password input");
            if (ImGui.TreeNode("Password Input")) {
                const password = STATIC(UNIQUE("password#42d6a6d6"), new ImGui.StringBuffer(64, "password123"));
                ImGui.InputText("password", password.value, ImGui.ARRAYSIZE(password.value), ImGui.InputTextFlags.Password);
                ImGui.SameLine();
                HelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
                ImGui.InputTextWithHint("password (w/ hint)", "<password>", password.value, ImGui.ARRAYSIZE(password.value), ImGui.InputTextFlags.Password);
                ImGui.InputText("password (clear)", password.value, ImGui.ARRAYSIZE(password.value));
                ImGui.TreePop();
            }
            if (ImGui.TreeNode("Completion, this.History, Edit Callbacks")) {
                class Funcs {
                    static MyCallback(data) {
                        if (data.EventFlag === ImGui.InputTextFlags.CallbackCompletion) {
                            data.InsertChars(data.CursorPos, "..");
                        }
                        else if (data.EventFlag === ImGui.InputTextFlags.CallbackHistory) {
                            if (data.EventKey === ImGui.Key.UpArrow) {
                                data.DeleteChars(0, data.BufTextLen);
                                data.InsertChars(0, "Pressed Up!");
                                data.SelectAll();
                            }
                            else if (data.EventKey === ImGui.Key.DownArrow) {
                                data.DeleteChars(0, data.BufTextLen);
                                data.InsertChars(0, "Pressed Down!");
                                data.SelectAll();
                            }
                        }
                        else if (data.EventFlag === ImGui.InputTextFlags.CallbackEdit) {
                            // Toggle casing of first character
                            const c = data.Buf[0];
                            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
                                data.Buf[0].toUpperCase();
                            data.BufDirty = true;
                            // Increment a counter
                            // int* p_int = (int*)data.UserData;
                            // *p_int = *p_int + 1;
                            ImGui.ASSERT(data.UserData !== null);
                            data.UserData(data.UserData() + 1);
                        }
                        return 0;
                    }
                }
                const buf1 = STATIC(UNIQUE("buf1#b05534af"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("Completion", buf1.value, 64, ImGui.InputTextFlags.CallbackCompletion, Funcs.MyCallback);
                ImGui.SameLine();
                HelpMarker("Here we append \"..\" each time Tab is pressed. See 'Examples>Console' for a more meaningful demonstration of using this callback.");
                const buf2 = STATIC(UNIQUE("buf2#251effa3"), new ImGui.StringBuffer(64, ""));
                ImGui.InputText("History", buf2.value, 64, ImGui.InputTextFlags.CallbackHistory, Funcs.MyCallback);
                ImGui.SameLine();
                HelpMarker("Here we replace and select text each time Up/Down are pressed. See 'Examples>Console' for a more meaningful demonstration of using this callback.");
                const buf3 = STATIC(UNIQUE("buf3#9fa9b241"), new ImGui.StringBuffer(64, ""));
                const edit_count = STATIC(UNIQUE("edit_count#7897b95f"), 0);
                ImGui.InputText("Edit", buf3.value, 64, ImGui.InputTextFlags.CallbackEdit, Funcs.MyCallback, /*(void*)&*/ edit_count.access);
                ImGui.SameLine();
                HelpMarker("Here we toggle the casing of the first character on every edits + count edits.");
                ImGui.SameLine();
                ImGui.Text(`(${edit_count.value})`);
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Text Input/Resize Callback");
            if (ImGui.TreeNode("Resize Callback")) {
                // To wire InputText() with std::string or any other custom string type,
                // you can use the ImGui.InputTextFlags.CallbackResize flag + create a custom ImGui.InputText() wrapper
                // using your preferred type. See misc/cpp/imgui_stdlib.h for an implementation of this using std::string.
                HelpMarker("Using ImGui.InputTextFlags.CallbackResize to wire your custom string type to InputText().\n\n" +
                    "See misc/cpp/imgui_stdlib.h for an implementation of this for std::string.");
                class Funcs {
                    static MyResizeCallback(data) {
                        if (data.EventFlag === ImGui.InputTextFlags.CallbackResize) {
                            const my_str = data.UserData;
                            // ImGui.ASSERT(my_str.begin() === data.Buf);
                            // my_str.resize(data.BufSize); // NB: On resizing calls, generally data.BufSize === data.BufTextLen + 1
                            // data.Buf = my_str.begin();
                            ImGui.ASSERT(my_str.buffer === data.Buf);
                            my_str.size = data.BufSize;
                        }
                        return 0;
                    }
                    // Note: Because ImGui. is a namespace you would typically add your own function into the namespace.
                    // For example, you code may declare a function 'ImGui.InputText(string label, MyString* my_str)'
                    static MyInputTextMultiline(label, my_str, size = new ImGui.Vec2(0, 0), flags = 0) {
                        ImGui.ASSERT((flags & ImGui.InputTextFlags.CallbackResize) === 0);
                        // return ImGui.InputTextMultiline(label, my_str.begin(), /*(size_t)*/my_str.size(), size, flags | ImGui.InputTextFlags.CallbackResize, Funcs.MyResizeCallback, /*(void*)*/my_str);
                        return ImGui.InputTextMultiline(label, my_str, /*(size_t)*/ my_str.size, size, flags | ImGui.InputTextFlags.CallbackResize, Funcs.MyResizeCallback, /*(void*)*/ my_str);
                    }
                }
                // For this demo we are using ImVector as a string container.
                // Note that because we need to store a terminating zero character, our size/capacity are 1 more
                // than usually reported by a typical string class.
                const my_str = STATIC(UNIQUE("my_str#428942b6"), new ImGui.StringBuffer(0));
                // if (my_str.value.empty())
                //     my_str.value.push_back(0);
                Funcs.MyInputTextMultiline("##MyStr", my_str.value, new ImGui.Vec2(-FLT_MIN, ImGui.GetTextLineHeight() * 16));
                // ImGui.Text("Data: %p\nSize: %d\nCapacity: %d", /*(void*)*/my_str.value.begin(), my_str.value.size(), my_str.value.capacity());
                ImGui.Text(`Size: ${my_str.value.buffer.length}\nCapacity: ${my_str.value.size}`);
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        // Tabs
        IMGUI_DEMO_MARKER("Widgets/Tabs");
        if (ImGui.TreeNode("Tabs")) {
            IMGUI_DEMO_MARKER("Widgets/Tabs/Basic");
            if (ImGui.TreeNode("Basic")) {
                const tab_bar_flags = ImGui.TabBarFlags.None;
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
            IMGUI_DEMO_MARKER("Widgets/Tabs/Advanced & Close Button");
            if (ImGui.TreeNode("Advanced & Close Button")) {
                // Expose a couple of the available flags. In most cases you may just call BeginTabBar() with no flags (0).
                const tab_bar_flags = STATIC(UNIQUE("tab_bar_flags#e7c139bb"), ImGui.TabBarFlags.Reorderable);
                ImGui.CheckboxFlags("ImGui.TabBarFlags.Reorderable", tab_bar_flags.access, ImGui.TabBarFlags.Reorderable);
                ImGui.CheckboxFlags("ImGui.TabBarFlags.AutoSelectNewTabs", tab_bar_flags.access, ImGui.TabBarFlags.AutoSelectNewTabs);
                ImGui.CheckboxFlags("ImGui.TabBarFlags.TabListPopupButton", tab_bar_flags.access, ImGui.TabBarFlags.TabListPopupButton);
                ImGui.CheckboxFlags("ImGui.TabBarFlags.NoCloseWithMiddleMouseButton", tab_bar_flags.access, ImGui.TabBarFlags.NoCloseWithMiddleMouseButton);
                if ((tab_bar_flags.value & ImGui.TabBarFlags.FittingPolicyMask_) === 0)
                    tab_bar_flags.value |= ImGui.TabBarFlags.FittingPolicyDefault_;
                if (ImGui.CheckboxFlags("ImGui.TabBarFlags.FittingPolicyResizeDown", tab_bar_flags.access, ImGui.TabBarFlags.FittingPolicyResizeDown))
                    tab_bar_flags.value &= ~(ImGui.TabBarFlags.FittingPolicyMask_ ^ ImGui.TabBarFlags.FittingPolicyResizeDown);
                if (ImGui.CheckboxFlags("ImGui.TabBarFlags.FittingPolicyScroll", tab_bar_flags.access, ImGui.TabBarFlags.FittingPolicyScroll))
                    tab_bar_flags.value &= ~(ImGui.TabBarFlags.FittingPolicyMask_ ^ ImGui.TabBarFlags.FittingPolicyScroll);
                // Tab Bar
                const names = ["Artichoke", "Beetroot", "Celery", "Daikon"];
                const opened = STATIC_ARRAY(4, UNIQUE("opened#dfbaa112"), [true, true, true, true]); // Persistent user state
                for (let n = 0; n < ImGui.ARRAYSIZE(opened.value); n++) {
                    if (n > 0) {
                        ImGui.SameLine();
                    }
                    ImGui.Checkbox(names[n], opened.access(n));
                }
                // Passing a boolean* to BeginTabItem() is similar to passing one to Begin():
                // the underlying boolean will be set to false when the tab is closed.
                if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags.value)) {
                    for (let n = 0; n < ImGui.ARRAYSIZE(opened.value); n++)
                        if (opened.value[n] && ImGui.BeginTabItem(names[n], opened.access(n), ImGui.TabItemFlags.None)) {
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
            IMGUI_DEMO_MARKER("Widgets/Tabs/TabItemButton & Leading-Trailing flags");
            if (ImGui.TreeNode("TabItemButton & Leading/Trailing flags")) {
                const active_tabs = STATIC(UNIQUE("active_tabs#2fdfbe01"), new ImGui.Vector());
                const next_tab_id = STATIC(UNIQUE("next_tab_id#ad2f2f99"), 0);
                if (next_tab_id.value === 0) // Initialize with some default tabs
                    for (let i = 0; i < 3; i++)
                        active_tabs.value.push_back(next_tab_id.value++);
                // TabItemButton() and Leading/Trailing flags are distinct features which we will demo together.
                // (It is possible to submit regular tabs with Leading/Trailing flags, or TabItemButton tabs without Leading/Trailing flags...
                // but they tend to make more sense together)
                const show_leading_button = STATIC(UNIQUE("show_leading_button#9c7b6fbf"), true);
                const show_trailing_button = STATIC(UNIQUE("show_trailing_button#599f6325"), true);
                ImGui.Checkbox("Show Leading TabItemButton()", show_leading_button.access);
                ImGui.Checkbox("Show Trailing TabItemButton()", show_trailing_button.access);
                // Expose some other flags which are useful to showcase how they interact with Leading/Trailing tabs
                const tab_bar_flags = STATIC(UNIQUE("tab_bar_flags#f3ce9390"), ImGui.TabBarFlags.AutoSelectNewTabs | ImGui.TabBarFlags.Reorderable | ImGui.TabBarFlags.FittingPolicyResizeDown);
                ImGui.CheckboxFlags("ImGui.TabBarFlags.TabListPopupButton", tab_bar_flags.access, ImGui.TabBarFlags.TabListPopupButton);
                if (ImGui.CheckboxFlags("ImGui.TabBarFlags.FittingPolicyResizeDown", tab_bar_flags.access, ImGui.TabBarFlags.FittingPolicyResizeDown))
                    tab_bar_flags.value &= ~(ImGui.TabBarFlags.FittingPolicyMask_ ^ ImGui.TabBarFlags.FittingPolicyResizeDown);
                if (ImGui.CheckboxFlags("ImGui.TabBarFlags.FittingPolicyScroll", tab_bar_flags.access, ImGui.TabBarFlags.FittingPolicyScroll))
                    tab_bar_flags.value &= ~(ImGui.TabBarFlags.FittingPolicyMask_ ^ ImGui.TabBarFlags.FittingPolicyScroll);
                if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags.value)) {
                    // Demo a Leading TabItemButton(): click the "?" button to open a menu
                    if (show_leading_button.value)
                        if (ImGui.TabItemButton("?", ImGui.TabItemFlags.Leading | ImGui.TabItemFlags.NoTooltip))
                            ImGui.OpenPopup("MyHelpMenu");
                    if (ImGui.BeginPopup("MyHelpMenu")) {
                        ImGui.Selectable("Hello!");
                        ImGui.EndPopup();
                    }
                    // Demo Trailing Tabs: click the "+" button to add a new tab (in your app you may want to use a font icon instead of the "+")
                    // Note that we submit it before the regular tabs, but because of the ImGui.TabItemFlags.Trailing flag it will always appear at the end.
                    if (show_trailing_button.value)
                        if (ImGui.TabItemButton("+", ImGui.TabItemFlags.Trailing | ImGui.TabItemFlags.NoTooltip))
                            active_tabs.value.push_back(next_tab_id.value++); // Add new tab
                    // Submit our regular tabs
                    for (let n = 0; n < active_tabs.value.Size;) {
                        let open = true;
                        const name = `${active_tabs.value[n].toString().padStart(4, "0")}`;
                        if (ImGui.BeginTabItem(name, (_ = open) => open = _, ImGui.TabItemFlags.None)) {
                            ImGui.Text(`This is the ${name} tab!`);
                            ImGui.EndTabItem();
                        }
                        if (!open)
                            // active_tabs.value.erase(active_tabs.Data + n);
                            active_tabs.value.splice(n, 1);
                        else
                            n++;
                    }
                    ImGui.EndTabBar();
                }
                ImGui.Separator();
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        // Plot/Graph widgets are not very good.
        // Consider using a third-party library such as ImPlot: https://github.com/epezent/implot
        // (see others https://github.com/ocornut/imgui/wiki/Useful-Extensions)
        IMGUI_DEMO_MARKER("Widgets/Plotting");
        if (ImGui.TreeNode("Plotting")) {
            const animate = STATIC(UNIQUE("animate#44f8c3eb"), true);
            ImGui.Checkbox("Animate", animate.access);
            // Plot as lines and plot as histogram
            IMGUI_DEMO_MARKER("Widgets/Plotting/PlotLines, PlotHistogram");
            const arr = STATIC(UNIQUE("arr#8a33185e"), [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
            ImGui.PlotLines("Frame Times", arr.value, ImGui.ARRAYSIZE(arr.value));
            ImGui.PlotHistogram("Histogram", arr.value, ImGui.IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new ImGui.Vec2(0, 80.0));
            // Fill an array of contiguous float values to plot
            // Tip: If your float aren't contiguous but part of a structure, you can pass a pointer to your first float
            // and the sizeof() of your structure in the "stride" parameter.
            const values = STATIC(UNIQUE("values#5c42d735"), new Array(90).fill(0));
            const values_offset = STATIC(UNIQUE("values_offset#2eb023ef"), 0);
            const refresh_time = STATIC(UNIQUE("refresh_time#6ef7adc4"), 0.0);
            if (!animate.value || refresh_time.value === 0.0)
                refresh_time.value = ImGui.GetTime();
            while (refresh_time.value < ImGui.GetTime()) // Create data at fixed 60 Hz rate for the demo
             {
                const phase = STATIC(UNIQUE("phase#6f660aa9"), 0.0);
                values.value[values_offset.value] = Math.cos(phase.value);
                values_offset.value = (values_offset.value + 1) % ImGui.ARRAYSIZE(values.value);
                phase.value += 0.10 * values_offset.value;
                refresh_time.value += 1.0 / 60.0;
            }
            // Plots can display overlay texts
            // (in this example, we will display an average value)
            {
                let average = 0.0;
                for (let n = 0; n < ImGui.ARRAYSIZE(values.value); n++)
                    average += values.value[n];
                average /= ImGui.ARRAYSIZE(values.value);
                const overlay = `avg ${average.toFixed(6)}`;
                ImGui.PlotLines("Lines", values.value, ImGui.ARRAYSIZE(values.value), values_offset.value, overlay, -1.0, 1.0, new ImGui.Vec2(0, 80.0));
            }
            // Use functions to generate output
            // FIXME: This is rather awkward because current plot API only pass in indices.
            // We probably want an API passing floats and user provide sample rate/count.
            class Funcs {
                static Sin(data, i) { return Math.sin(i * 0.1); }
                static Saw(data, i) { return (i & 1) ? 1.0 : -1.0; }
            }
            const func_type = STATIC(UNIQUE("func_type#6d381c70"), 0);
            const display_count = STATIC(UNIQUE("display_count#4040de5d"), 70);
            ImGui.Separator();
            ImGui.SetNextItemWidth(ImGui.GetFontSize() * 8);
            ImGui.Combo("func", func_type.access, "Sin\0Saw\0");
            ImGui.SameLine();
            ImGui.SliderInt("Sample count", display_count.access, 1, 400);
            const func = (func_type.value === 0) ? Funcs.Sin : Funcs.Saw;
            ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new ImGui.Vec2(0, 80));
            ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new ImGui.Vec2(0, 80));
            ImGui.Separator();
            // Animate a simple progress bar
            IMGUI_DEMO_MARKER("Widgets/Plotting/ProgressBar");
            const progress = STATIC(UNIQUE("progress#b9037fad"), 0.0);
            const progress_dir = STATIC(UNIQUE("progress_dir#15b6a4b8"), 1.0);
            if (animate) {
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
            // Typically we would use new ImGui.Vec2(-1.0,0.0) or new ImGui.Vec2(-FLT_MIN,0.0) to use all available width,
            // or new ImGui.Vec2(width,0.0) for a specified width. new ImGui.Vec2(0.0,0.0) uses ItemWidth.
            ImGui.ProgressBar(progress.value, new ImGui.Vec2(0.0, 0.0));
            ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
            ImGui.Text("Progress Bar");
            const progress_saturated = IM_CLAMP(progress.value, 0.0, 1.0);
            const buf = `${Math.floor(progress_saturated * 1753)}/${1753}`;
            ImGui.ProgressBar(progress.value, new ImGui.Vec2(0., 0.), buf);
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Color");
        if (ImGui.TreeNode("Color/Picker Widgets")) {
            const color = STATIC(UNIQUE("color#60ccdb0e"), new ImGui.Vec4(114.0 / 255.0, 144.0 / 255.0, 154.0 / 255.0, 200.0 / 255.0));
            const alpha_preview = STATIC(UNIQUE("alpha_preview#63bcbd34"), true);
            const alpha_half_preview = STATIC(UNIQUE("alpha_half_preview#133a6af8"), false);
            const drag_and_drop = STATIC(UNIQUE("drag_and_drop#ef0593da"), true);
            const options_menu = STATIC(UNIQUE("options_menu#f0b1cac4"), true);
            const hdr = STATIC(UNIQUE("hdr#fb53bc03"), false);
            ImGui.Checkbox("With Alpha Preview", alpha_preview.access);
            ImGui.Checkbox("With Half Alpha Preview", alpha_half_preview.access);
            ImGui.Checkbox("With Drag and Drop", drag_and_drop.access);
            ImGui.Checkbox("With Options Menu", options_menu.access);
            ImGui.SameLine();
            HelpMarker("Right-click on the individual color widget to show options.");
            ImGui.Checkbox("With HDR", hdr.access);
            ImGui.SameLine();
            HelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
            const misc_flags = (hdr.value ? ImGui.ColorEditFlags.HDR : 0) | (drag_and_drop ? 0 : ImGui.ColorEditFlags.NoDragDrop) | (alpha_half_preview ? ImGui.ColorEditFlags.AlphaPreviewHalf : (alpha_preview ? ImGui.ColorEditFlags.AlphaPreview : 0)) | (options_menu ? 0 : ImGui.ColorEditFlags.NoOptions);
            IMGUI_DEMO_MARKER("Widgets/Color/ColorEdit");
            ImGui.Text("Color widget:");
            ImGui.SameLine();
            HelpMarker("Click on the color square to open a color picker.\n" +
                "CTRL+click on individual component to input value.\n");
            ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);
            IMGUI_DEMO_MARKER("Widgets/Color/ColorEdit (HSV, with Alpha)");
            ImGui.Text("Color widget HSV with Alpha:");
            ImGui.ColorEdit4("MyColor##2", color.value, ImGui.ColorEditFlags.DisplayHSV | misc_flags);
            IMGUI_DEMO_MARKER("Widgets/Color/ColorEdit (float display)");
            ImGui.Text("Color widget with Float Display:");
            ImGui.ColorEdit4("MyColor##2f", color.value, ImGui.ColorEditFlags.Float | misc_flags);
            IMGUI_DEMO_MARKER("Widgets/Color/ColorButton (with Picker)");
            ImGui.Text("Color button with Picker:");
            ImGui.SameLine();
            HelpMarker("With the ImGui.ColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\n" +
                "With the ImGui.ColorEditFlags.NoLabel flag you can pass a non-empty label which will only " +
                "be used for the tooltip and picker popup.");
            ImGui.ColorEdit4("MyColor##3", color.value, ImGui.ColorEditFlags.NoInputs | ImGui.ColorEditFlags.NoLabel | misc_flags);
            IMGUI_DEMO_MARKER("Widgets/Color/ColorButton (with custom Picker popup)");
            ImGui.Text("Color button with Custom Picker Popup:");
            // Generate a default palette. The palette will persist and can be edited.
            const saved_palette_init = STATIC(UNIQUE("saved_palette_init#a309e45d"), true);
            // const saved_palette[32] = STATIC<ImGui.Vec4>(UNIQUE("saved_palette[32]"), {});
            const saved_palette = STATIC_ARRAY(32, UNIQUE("saved_palette#e6400d23"), []);
            if (saved_palette_init.value) {
                for (let n = 0; n < 32 /*ImGui.ARRAYSIZE(saved_palette.value)*/; n++) {
                    // ImGui.ColorConvertHSVtoRGB(n / 31.0, 0.8, 0.8,
                    //     saved_palette[n].x, saved_palette[n].y, saved_palette[n].z);
                    // saved_palette[n].w = 1.0; // Alpha
                    // TODO(imgui-js): ImGui.ColorConvertHSVtoRGB
                    const r = [0];
                    const g = [0];
                    const b = [0];
                    ImGui.ColorConvertHSVtoRGB(n / 31.0, 0.8, 0.8, r, g, b);
                    saved_palette.value[n] = new ImGui.Vec4(r[0], g[0], b[0], 1.0);
                }
                saved_palette_init.value = false;
            }
            const backup_color = STATIC(UNIQUE("backup_color#22597cbf"), new ImGui.Vec4());
            let open_popup = ImGui.ColorButton("MyColor##3b", color.value, misc_flags);
            ImGui.SameLine(0, ImGui.GetStyle().ItemInnerSpacing.x);
            if (ImGui.Button("Palette")) {
                open_popup = true;
            }
            if (open_popup) {
                ImGui.OpenPopup("mypicker");
                backup_color.value.Copy(color.value);
            }
            if (ImGui.BeginPopup("mypicker")) {
                ImGui.Text("MY CUSTOM COLOR PICKER WITH AN AMAZING PALETTE!");
                ImGui.Separator();
                ImGui.ColorPicker4("##picker", color.value, misc_flags | ImGui.ColorEditFlags.NoSidePreview | ImGui.ColorEditFlags.NoSmallPreview);
                ImGui.SameLine();
                ImGui.BeginGroup(); // Lock X position
                ImGui.Text("Current");
                ImGui.ColorButton("##current", color.value, ImGui.ColorEditFlags.NoPicker | ImGui.ColorEditFlags.AlphaPreviewHalf, new ImGui.Vec2(60, 40));
                ImGui.Text("Previous");
                if (ImGui.ColorButton("##previous", backup_color.value, ImGui.ColorEditFlags.NoPicker | ImGui.ColorEditFlags.AlphaPreviewHalf, new ImGui.Vec2(60, 40)))
                    color.value.Copy(backup_color.value);
                ImGui.Separator();
                ImGui.Text("Palette");
                for (let n = 0; n < ImGui.ARRAYSIZE(saved_palette.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 8) !== 0)
                        ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                    const palette_button_flags = ImGui.ColorEditFlags.NoAlpha | ImGui.ColorEditFlags.NoPicker | ImGui.ColorEditFlags.NoTooltip;
                    if (ImGui.ColorButton("##palette", saved_palette.value[n], palette_button_flags, new ImGui.Vec2(20, 20)))
                        color.value.Copy(new ImGui.Vec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!
                    // TODO(imgui-js): ImGui.AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_*)
                    // Allow user to drop colors into each palette entry. Note that ColorButton() is already a
                    // drag source by default, unless specifying the ImGui.ColorEditFlags.NoDragDrop flag.
                    // if (ImGui.BeginDragDropTarget())
                    // {
                    //     if (const ImGui.Payload* payload = ImGui.AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_3F))
                    //         memcpy((float*)&saved_palette.value[n], payload.Data, sizeof(float) * 3);
                    //     if (const ImGui.Payload* payload = ImGui.AcceptDragDropPayload(IMGUI_PAYLOAD_TYPE_COLOR_4F))
                    //         memcpy((float*)&saved_palette.value[n], payload.Data, sizeof(float) * 4);
                    //     ImGui.EndDragDropTarget();
                    // }
                    ImGui.PopID();
                }
                ImGui.EndGroup();
                ImGui.EndPopup();
            }
            IMGUI_DEMO_MARKER("Widgets/Color/ColorButton (simple)");
            ImGui.Text("Color button only:");
            const no_border = STATIC(UNIQUE("no_border#66a40476"), false);
            ImGui.Checkbox("ImGui.ColorEditFlags.NoBorder", no_border.access);
            ImGui.ColorButton("MyColor##3c", color.value, misc_flags | (no_border.value ? ImGui.ColorEditFlags.NoBorder : 0), new ImGui.Vec2(80, 80));
            IMGUI_DEMO_MARKER("Widgets/Color/ColorPicker");
            ImGui.Text("Color picker:");
            const alpha = STATIC(UNIQUE("alpha#ae11fb55"), true);
            const alpha_bar = STATIC(UNIQUE("alpha_bar#ea0fc5b4"), true);
            const side_preview = STATIC(UNIQUE("side_preview#89f2df34"), true);
            const ref_color = STATIC(UNIQUE("ref_color#4882f800"), false);
            const ref_color_v = STATIC(UNIQUE("ref_color_v#3af7b017"), new ImGui.Vec4(1.0, 0.0, 1.0, 0.5));
            const display_mode = STATIC(UNIQUE("display_mode#f788fb8a"), 0);
            const picker_mode = STATIC(UNIQUE("picker_mode#2ca07a18"), 0);
            ImGui.Checkbox("With Alpha", alpha.access);
            ImGui.Checkbox("With Alpha Bar", alpha_bar.access);
            ImGui.Checkbox("With Side Preview", side_preview.access);
            if (side_preview.value) {
                ImGui.SameLine();
                ImGui.Checkbox("With Ref Color", ref_color.access);
                if (ref_color.value) {
                    ImGui.SameLine();
                    ImGui.ColorEdit4("##RefColor", ref_color_v.value, ImGui.ColorEditFlags.NoInputs | misc_flags);
                }
            }
            ImGui.Combo("Display Mode", display_mode.access, "Auto/Current\0None\0RGB Only\0HSV Only\0Hex Only\0");
            ImGui.SameLine();
            HelpMarker("ColorEdit defaults to displaying RGB inputs if you don't specify a display mode, " +
                "but the user can change it with a right-click.\n\nColorPicker defaults to displaying RGB+HSV+Hex " +
                "if you don't specify a display mode.\n\nYou can change the defaults using SetColorEditOptions().");
            ImGui.Combo("Picker Mode", picker_mode.access, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
            ImGui.SameLine();
            HelpMarker("User can right-click the picker to change mode.");
            let flags = misc_flags;
            if (!alpha.value)
                flags |= ImGui.ColorEditFlags.NoAlpha; // This is by default if you call ColorPicker3() instead of ColorPicker4()
            if (alpha_bar.value)
                flags |= ImGui.ColorEditFlags.AlphaBar;
            if (!side_preview.value)
                flags |= ImGui.ColorEditFlags.NoSidePreview;
            if (picker_mode.value === 1)
                flags |= ImGui.ColorEditFlags.PickerHueBar;
            if (picker_mode.value === 2)
                flags |= ImGui.ColorEditFlags.PickerHueWheel;
            if (display_mode.value === 1)
                flags |= ImGui.ColorEditFlags.NoInputs; // Disable all RGB/HSV/Hex displays
            if (display_mode.value === 2)
                flags |= ImGui.ColorEditFlags.DisplayRGB; // Override display mode
            if (display_mode.value === 3)
                flags |= ImGui.ColorEditFlags.DisplayHSV;
            if (display_mode.value === 4)
                flags |= ImGui.ColorEditFlags.DisplayHex;
            ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);
            ImGui.Text("Set defaults in code:");
            ImGui.SameLine();
            HelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\n" +
                "We don't have Push/Pop functions because you can force options on a per-widget basis if needed," +
                "and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid" +
                "encouraging you to persistently save values that aren't forward-compatible.");
            if (ImGui.Button("Default: Uint8 + HSV + Hue Bar"))
                ImGui.SetColorEditOptions(ImGui.ColorEditFlags.Uint8 | ImGui.ColorEditFlags.DisplayHSV | ImGui.ColorEditFlags.PickerHueBar);
            if (ImGui.Button("Default: Float + HDR + Hue Wheel"))
                ImGui.SetColorEditOptions(ImGui.ColorEditFlags.Float | ImGui.ColorEditFlags.HDR | ImGui.ColorEditFlags.PickerHueWheel);
            // HSV encoded support (to avoid RGB<>HSV round trips and singularities when S==0 or V==0)
            const color_hsv = STATIC(UNIQUE("color_hsv#2a9b290b"), new ImGui.Vec4(0.23, 1.0, 1.0, 1.0)); // Stored as HSV!
            ImGui.Spacing();
            ImGui.Text("HSV encoded colors");
            ImGui.SameLine();
            HelpMarker("By default, colors are given to ColorEdit and ColorPicker in RGB, but ImGui.ColorEditFlags.InputHSV" +
                "allows you to store colors as HSV and pass them to ColorEdit and ColorPicker as HSV. This comes with the" +
                "added benefit that you can manipulate hue values with the picker even when saturation or value are zero.");
            ImGui.Text("Color widget with InputHSV:");
            ImGui.ColorEdit4("HSV shown as RGB##1", color_hsv.value, ImGui.ColorEditFlags.DisplayRGB | ImGui.ColorEditFlags.InputHSV | ImGui.ColorEditFlags.Float);
            ImGui.ColorEdit4("HSV shown as HSV##1", color_hsv.value, ImGui.ColorEditFlags.DisplayHSV | ImGui.ColorEditFlags.InputHSV | ImGui.ColorEditFlags.Float);
            ImGui.DragFloat4("Raw HSV values", color_hsv.value, 0.01, 0.0, 1.0);
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Drag and Slider Flags");
        if (ImGui.TreeNode("Drag/Slider Flags")) {
            // Demonstrate using advanced flags for DragXXX and SliderXXX functions. Note that the flags are the same!
            const flags = STATIC(UNIQUE("flags#b67ef6e0"), ImGui.SliderFlags.None);
            ImGui.CheckboxFlags("ImGui.SliderFlags.AlwaysClamp", flags.access, ImGui.SliderFlags.AlwaysClamp);
            ImGui.SameLine();
            HelpMarker("Always clamp value to min/max bounds (if any) when input manually with CTRL+Click.");
            ImGui.CheckboxFlags("ImGui.SliderFlags.Logarithmic", flags.access, ImGui.SliderFlags.Logarithmic);
            ImGui.SameLine();
            HelpMarker("Enable logarithmic editing (more precision for small values).");
            ImGui.CheckboxFlags("ImGui.SliderFlags.NoRoundToFormat", flags.access, ImGui.SliderFlags.NoRoundToFormat);
            ImGui.SameLine();
            HelpMarker("Disable rounding underlying value to match precision of the format string (e.g. %.3f values are rounded to those 3 digits).");
            ImGui.CheckboxFlags("ImGui.SliderFlags.NoInput", flags.access, ImGui.SliderFlags.NoInput);
            ImGui.SameLine();
            HelpMarker("Disable CTRL+Click or Enter key allowing to input text directly into the widget.");
            // Drags
            const drag_f = STATIC(UNIQUE("drag_f#7359d6d0"), 0.5);
            const drag_i = STATIC(UNIQUE("drag_i#41c5d1fc"), 50);
            ImGui.Text(`Underlying float value: ${drag_f.value}`);
            ImGui.DragFloat("DragFloat (0 -> 1)", drag_f.access, 0.005, 0.0, 1.0, "%.3f", flags.value);
            ImGui.DragFloat("DragFloat (0 -> +inf)", drag_f.access, 0.005, 0.0, FLT_MAX, "%.3f", flags.value);
            ImGui.DragFloat("DragFloat (-inf -> 1)", drag_f.access, 0.005, -FLT_MAX, 1.0, "%.3f", flags.value);
            ImGui.DragFloat("DragFloat (-inf -> +inf)", drag_f.access, 0.005, -FLT_MAX, +FLT_MAX, "%.3f", flags.value);
            ImGui.DragInt("DragInt (0 -> 100)", drag_i.access, 0.5, 0, 100, "%d", flags.value);
            // Sliders
            const slider_f = STATIC(UNIQUE("slider_f#92e25be0"), 0.5);
            const slider_i = STATIC(UNIQUE("slider_i#e09018d8"), 50);
            ImGui.Text(`Underlying float value: ${slider_f.value}`);
            ImGui.SliderFloat("SliderFloat (0 -> 1)", slider_f.access, 0.0, 1.0, "%.3f", flags.value);
            ImGui.SliderInt("SliderInt (0 -> 100)", slider_i.access, 0, 100, "%d", flags.value);
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Range Widgets");
        if (ImGui.TreeNode("Range Widgets")) {
            const begin = STATIC(UNIQUE("begin#b1b30e14"), 10);
            const end = STATIC(UNIQUE("end#9a95d5a1"), 90);
            const begin_i = STATIC(UNIQUE("begin_i#45d3bd56"), 100);
            const end_i = STATIC(UNIQUE("end_i#22ded673"), 1000);
            ImGui.DragFloatRange2("range float", begin.access, end.access, 0.25, 0.0, 100.0, "Min: %.1f %%", "Max: %.1f %%", ImGui.SliderFlags.AlwaysClamp);
            ImGui.DragIntRange2("range int", begin_i.access, end_i.access, 5, 0, 1000, "Min: %d units", "Max: %d units");
            ImGui.DragIntRange2("range int (no bounds)", begin_i.access, end_i.access, 5, 0, 0, "Min: %d units", "Max: %d units");
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Data Types");
        if (ImGui.TreeNode("Data Types")) {
            // DragScalar/InputScalar/SliderScalar functions allow various data types
            // - signed/unsigned
            // - 8/16/32/64-bits
            // - integer/float/double
            // To avoid polluting the public API with all possible combinations, we use the ImGui.DataType enum
            // to pass the type, and passing all arguments by pointer.
            // This is the reason the test code below creates local variables to hold "zero" "one" etc. for each types.
            // In practice, if you frequently use a given type that is not covered by the normal API entry points,
            // you can wrap it yourself inside a 1 line function which can take typed argument as value instead of void*,
            // and then pass their address to the generic function. For example:
            //   boolean MySliderU64(string label, u64* value, u64 min = 0, u64 max = 0, string format = "%lld")
            //   {
            //      return SliderScalar(label, ImGui.DataType.U64, value, &min, &max, format);
            //   }
            // Setup limits (as helper variables so we can take their address, as explained above)
            // Note: SliderScalar() functions have a maximum usable range of half the natural type maximum, hence the /2.
            // #ifndef LLONG_MIN
            // ImS64 LLONG_MIN = -9223372036854775807LL - 1;
            // ImS64 LLONG_MAX = 9223372036854775807LL;
            // ImU64 ULLONG_MAX = (2ULL * 9223372036854775807LL + 1);
            // #endif
            const s8_zero /*char*/ = 0, s8_one = 1, s8_fifty = 50, s8_min = -128, s8_max = 127;
            const u8_zero /*ImU8*/ = 0, u8_one = 1, u8_fifty = 50, u8_min = 0, u8_max = 255;
            const s16_zero /*short*/ = 0, s16_one = 1, s16_fifty = 50, s16_min = -32768, s16_max = 32767;
            const u16_zero /*ImU16*/ = 0, u16_one = 1, u16_fifty = 50, u16_min = 0, u16_max = 65535;
            const s32_zero /*ImS32*/ = 0, s32_one = 1, s32_fifty = 50, s32_min = INT_MIN / 2, s32_max = INT_MAX / 2, s32_hi_a = INT_MAX / 2 - 100, s32_hi_b = INT_MAX / 2;
            const u32_zero /*ImU32*/ = 0, u32_one = 1, u32_fifty = 50, u32_min = 0, u32_max = UINT_MAX / 2, u32_hi_a = UINT_MAX / 2 - 100, u32_hi_b = UINT_MAX / 2;
            // const s64_zero: float/*ImS64*/  = 0,   s64_one = 1,   s64_fifty = 50, s64_min = LLONG_MIN/2, s64_max = LLONG_MAX/2,  s64_hi_a = LLONG_MAX/2 - 100,  s64_hi_b = LLONG_MAX/2;
            // const u64_zero: float/*ImU64*/  = 0,   u64_one = 1,   u64_fifty = 50, u64_min = 0,           u64_max = ULLONG_MAX/2, u64_hi_a = ULLONG_MAX/2 - 100, u64_hi_b = ULLONG_MAX/2;
            const f32_zero = 0., f32_one = 1., f32_lo_a = -10000000000.0, f32_hi_a = +10000000000.0;
            const f64_zero = 0., f64_one = 1., f64_lo_a = -1000000000000000.0, f64_hi_a = +1000000000000000.0;
            // State
            const s8_v = STATIC(UNIQUE("s8_v#32ffa902"), new Int8Array([127]));
            const u8_v = STATIC(UNIQUE("u8_v#f949c0ea"), new Uint8Array([255]));
            const s16_v = STATIC(UNIQUE("s16_v#32baa685"), new Int16Array([32767]));
            const u16_v = STATIC(UNIQUE("u16_v#fab34fed"), new Uint16Array([65535]));
            const s32_v = STATIC(UNIQUE("s32_v#beb6aa58"), new Int32Array([-1]));
            const u32_v = STATIC(UNIQUE("u32_v#daf05283"), new Uint32Array([-1]));
            // const s64_v = STATIC<  Int64Array/*ImS64*/>(UNIQUE("s64_v#59a10e78"), new   Int64Array([-1]));
            // const u64_v = STATIC< Uint64Array/*ImU64*/>(UNIQUE("u64_v#61d66413"), new  Uint64Array([-1]));
            const f32_v = STATIC(UNIQUE("f32_v#2edbca83"), new Float32Array([0.123]));
            const f64_v = STATIC(UNIQUE("f64_v#84b3af3c"), new Float64Array([90000.01234567890123456789]));
            const drag_speed = 0.2;
            const drag_clamp = STATIC(UNIQUE("drag_clamp#971f27eb"), false);
            IMGUI_DEMO_MARKER("Widgets/Data Types/Drags");
            ImGui.Text("Drags:");
            ImGui.Checkbox("Clamp integers to 0..50", drag_clamp.access);
            ImGui.SameLine();
            HelpMarker("As with every widgets in dear imgui, we never modify values unless there is a user interaction.\n" +
                "You can override the clamping limits by using CTRL+Click to input a value.");
            ImGui.DragScalar("drag s8", /*ImGui.DataType.S8,    */ s8_v.value, drag_speed, drag_clamp.value ? s8_zero : null, drag_clamp.value ? s8_fifty : null);
            ImGui.DragScalar("drag u8", /*ImGui.DataType.U8,    */ u8_v.value, drag_speed, drag_clamp.value ? u8_zero : null, drag_clamp.value ? u8_fifty : null, "%u ms");
            ImGui.DragScalar("drag s16", /*ImGui.DataType.S16,   */ s16_v.value, drag_speed, drag_clamp.value ? s16_zero : null, drag_clamp.value ? s16_fifty : null);
            ImGui.DragScalar("drag u16", /*ImGui.DataType.U16,   */ u16_v.value, drag_speed, drag_clamp.value ? u16_zero : null, drag_clamp.value ? u16_fifty : null, "%u ms");
            ImGui.DragScalar("drag s32", /*ImGui.DataType.S32,   */ s32_v.value, drag_speed, drag_clamp.value ? s32_zero : null, drag_clamp.value ? s32_fifty : null);
            ImGui.DragScalar("drag u32", /*ImGui.DataType.U32,   */ u32_v.value, drag_speed, drag_clamp.value ? u32_zero : null, drag_clamp.value ? u32_fifty : null, "%u ms");
            // ImGui.DragScalar("drag s64",       /*ImGui.DataType.S64,   */ s64_v.value, drag_speed, drag_clamp.value ? s64_zero : null, drag_clamp.value ? s64_fifty : null);
            // ImGui.DragScalar("drag u64",       /*ImGui.DataType.U64,   */ u64_v.value, drag_speed, drag_clamp.value ? u64_zero : null, drag_clamp.value ? u64_fifty : null);
            ImGui.DragScalar("drag float", /*ImGui.DataType.Float, */ f32_v.value, 0.005, f32_zero, f32_one, "%f");
            ImGui.DragScalar("drag float log", /*ImGui.DataType.Float, */ f32_v.value, 0.005, f32_zero, f32_one, "%f", ImGui.SliderFlags.Logarithmic);
            ImGui.DragScalar("drag double", /*ImGui.DataType.Double,*/ f64_v.value, 0.0005, f64_zero, null, "%.10f grams");
            ImGui.DragScalar("drag double log", /*ImGui.DataType.Double,*/ f64_v.value, 0.0005, f64_zero, f64_one, "0 < %.10f < 1", ImGui.SliderFlags.Logarithmic);
            IMGUI_DEMO_MARKER("Widgets/Data Types/Sliders");
            ImGui.Text("Sliders");
            ImGui.SliderScalar("slider s8 full", /*ImGui.DataType.S8,    */ s8_v.value, s8_min, s8_max, "%d");
            ImGui.SliderScalar("slider u8 full", /*ImGui.DataType.U8,    */ u8_v.value, u8_min, u8_max, "%u");
            ImGui.SliderScalar("slider s16 full", /*ImGui.DataType.S16,   */ s16_v.value, s16_min, s16_max, "%d");
            ImGui.SliderScalar("slider u16 full", /*ImGui.DataType.U16,   */ u16_v.value, u16_min, u16_max, "%u");
            ImGui.SliderScalar("slider s32 low", /*ImGui.DataType.S32,   */ s32_v.value, s32_zero, s32_fifty, "%d");
            ImGui.SliderScalar("slider s32 high", /*ImGui.DataType.S32,   */ s32_v.value, s32_hi_a, s32_hi_b, "%d");
            ImGui.SliderScalar("slider s32 full", /*ImGui.DataType.S32,   */ s32_v.value, s32_min, s32_max, "%d");
            ImGui.SliderScalar("slider u32 low", /*ImGui.DataType.U32,   */ u32_v.value, u32_zero, u32_fifty, "%u");
            ImGui.SliderScalar("slider u32 high", /*ImGui.DataType.U32,   */ u32_v.value, u32_hi_a, u32_hi_b, "%u");
            ImGui.SliderScalar("slider u32 full", /*ImGui.DataType.U32,   */ u32_v.value, u32_min, u32_max, "%u");
            // ImGui.SliderScalar("slider s64 low",       /*ImGui.DataType.S64,   */ s64_v.value, s64_zero, s64_fifty,"%I64d");
            // ImGui.SliderScalar("slider s64 high",      /*ImGui.DataType.S64,   */ s64_v.value, s64_hi_a, s64_hi_b, "%I64d");
            // ImGui.SliderScalar("slider s64 full",      /*ImGui.DataType.S64,   */ s64_v.value, s64_min,  s64_max,  "%I64d");
            // ImGui.SliderScalar("slider u64 low",       /*ImGui.DataType.U64,   */ u64_v.value, u64_zero, u64_fifty,"%I64u ms");
            // ImGui.SliderScalar("slider u64 high",      /*ImGui.DataType.U64,   */ u64_v.value, u64_hi_a, u64_hi_b, "%I64u ms");
            // ImGui.SliderScalar("slider u64 full",      /*ImGui.DataType.U64,   */ u64_v.value, u64_min,  u64_max,  "%I64u ms");
            ImGui.SliderScalar("slider float low", /*ImGui.DataType.Float, */ f32_v.value, f32_zero, f32_one);
            ImGui.SliderScalar("slider float low log", /*ImGui.DataType.Float, */ f32_v.value, f32_zero, f32_one, "%.10f", ImGui.SliderFlags.Logarithmic);
            ImGui.SliderScalar("slider float high", /*ImGui.DataType.Float, */ f32_v.value, f32_lo_a, f32_hi_a, "%e");
            ImGui.SliderScalar("slider double low", /*ImGui.DataType.Double,*/ f64_v.value, f64_zero, f64_one, "%.10f grams");
            ImGui.SliderScalar("slider double low log", /*ImGui.DataType.Double,*/ f64_v.value, f64_zero, f64_one, "%.10f", ImGui.SliderFlags.Logarithmic);
            ImGui.SliderScalar("slider double high", /*ImGui.DataType.Double,*/ f64_v.value, f64_lo_a, f64_hi_a, "%e grams");
            ImGui.Text("Sliders (reverse)");
            ImGui.SliderScalar("slider s8 reverse", /*ImGui.DataType.S8, */ s8_v.value, s8_max, s8_min, "%d");
            ImGui.SliderScalar("slider u8 reverse", /*ImGui.DataType.U8, */ u8_v.value, u8_max, u8_min, "%u");
            ImGui.SliderScalar("slider s32 reverse", /*ImGui.DataType.S32,*/ s32_v.value, s32_fifty, s32_zero, "%d");
            ImGui.SliderScalar("slider u32 reverse", /*ImGui.DataType.U32,*/ u32_v.value, u32_fifty, u32_zero, "%u");
            // ImGui.SliderScalar("slider s64 reverse",   /*ImGui.DataType.S64,*/  s64_v.value, s64_fifty, s64_zero, "%I64d");
            // ImGui.SliderScalar("slider u64 reverse",   /*ImGui.DataType.U64,*/  u64_v.value, u64_fifty, u64_zero, "%I64u ms");
            IMGUI_DEMO_MARKER("Widgets/Data Types/Inputs");
            const inputs_step = STATIC(UNIQUE("inputs_step#fa9045ed"), true);
            ImGui.Text("Inputs");
            ImGui.Checkbox("Show step buttons", inputs_step.access);
            ImGui.InputScalar("input s8", /*ImGui.DataType.S8,    */ s8_v.value, inputs_step.value ? s8_one : null, null, "%d");
            ImGui.InputScalar("input u8", /*ImGui.DataType.U8,    */ u8_v.value, inputs_step.value ? u8_one : null, null, "%u");
            ImGui.InputScalar("input s16", /*ImGui.DataType.S16,   */ s16_v.value, inputs_step.value ? s16_one : null, null, "%d");
            ImGui.InputScalar("input u16", /*ImGui.DataType.U16,   */ u16_v.value, inputs_step.value ? u16_one : null, null, "%u");
            ImGui.InputScalar("input s32", /*ImGui.DataType.S32,   */ s32_v.value, inputs_step.value ? s32_one : null, null, "%d");
            ImGui.InputScalar("input s32 hex", /*ImGui.DataType.S32,   */ s32_v.value, inputs_step.value ? s32_one : null, null, "%08X", ImGui.InputTextFlags.CharsHexadecimal);
            ImGui.InputScalar("input u32", /*ImGui.DataType.U32,   */ u32_v.value, inputs_step.value ? u32_one : null, null, "%u");
            ImGui.InputScalar("input u32 hex", /*ImGui.DataType.U32,   */ u32_v.value, inputs_step.value ? u32_one : null, null, "%08X", ImGui.InputTextFlags.CharsHexadecimal);
            // ImGui.InputScalar("input s64",     /*ImGui.DataType.S64,   */ s64_v.value, inputs_step.value ? s64_one : null);
            // ImGui.InputScalar("input u64",     /*ImGui.DataType.U64,   */ u64_v.value, inputs_step.value ? u64_one : null);
            ImGui.InputScalar("input float", /*ImGui.DataType.Float, */ f32_v.value, inputs_step.value ? f32_one : null);
            ImGui.InputScalar("input double", /*ImGui.DataType.Double,*/ f64_v.value, inputs_step.value ? f64_one : null);
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Multi-component Widgets");
        if (ImGui.TreeNode("Multi-component Widgets")) {
            const vec4f = STATIC(UNIQUE("vec4f#a0b1ae28"), [0.10, 0.20, 0.30, 0.44]);
            const vec4i = STATIC(UNIQUE("vec4i#b2973986"), [1, 5, 100, 255]);
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
        IMGUI_DEMO_MARKER("Widgets/Vertical Sliders");
        if (ImGui.TreeNode("Vertical Sliders")) {
            const spacing = 4;
            ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(spacing, spacing));
            const int_value = STATIC(UNIQUE("int_value#b9179d91"), 0);
            ImGui.VSliderInt("##int", new ImGui.Vec2(18, 160), int_value.access, 0, 5);
            ImGui.SameLine();
            const values = STATIC_ARRAY(7, UNIQUE("values#be41e47b"), [0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0]);
            ImGui.PushID("set1");
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(ImGui.Col.FrameBg, ImGui.Color.HSV(i / 7.0, 0.5, 0.5));
                ImGui.PushStyleColor(ImGui.Col.FrameBgHovered, ImGui.Color.HSV(i / 7.0, 0.6, 0.5));
                ImGui.PushStyleColor(ImGui.Col.FrameBgActive, ImGui.Color.HSV(i / 7.0, 0.7, 0.5));
                ImGui.PushStyleColor(ImGui.Col.SliderGrab, ImGui.Color.HSV(i / 7.0, 0.9, 0.9));
                ImGui.VSliderFloat("##v", new ImGui.Vec2(18, 160), values.access(i), 0.0, 1.0, "");
                if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                    ImGui.SetTooltip(`${values.value[i].toFixed(3)}`);
                ImGui.PopStyleColor(4);
                ImGui.PopID();
            }
            ImGui.PopID();
            ImGui.SameLine();
            ImGui.PushID("set2");
            const values2 = STATIC_ARRAY(4, UNIQUE("values2#5617c79c"), [0.20, 0.80, 0.40, 0.25]);
            const rows = 3;
            const small_slider_size = STATIC(UNIQUE("small_slider_size#816e0354"), new ImGui.Vec2(18, Math.floor /*(float)(int)*/((160.0 - (rows - 1) * spacing) / rows)));
            for (let nx = 0; nx < 4; nx++) {
                if (nx > 0)
                    ImGui.SameLine();
                ImGui.BeginGroup();
                for (let ny = 0; ny < rows; ny++) {
                    ImGui.PushID(nx * rows + ny);
                    ImGui.VSliderFloat("##v", small_slider_size.value, values2.access(nx), 0.0, 1.0, "");
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
                ImGui.PushStyleVar(ImGui.StyleVar.GrabMinSize, 40);
                ImGui.VSliderFloat("##v", new ImGui.Vec2(40, 160), values.access(i), 0.0, 1.0, "%.2f\nsec");
                ImGui.PopStyleVar();
                ImGui.PopID();
            }
            ImGui.PopID();
            ImGui.PopStyleVar();
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Drag and drop");
        if (ImGui.TreeNode("Drag and Drop")) {
            IMGUI_DEMO_MARKER("Widgets/Drag and drop/Standard widgets");
            if (ImGui.TreeNode("Drag and drop in standard widgets")) {
                // ColorEdit widgets automatically act as drag source and drag target.
                // They are using standardized payload strings IMGUI_PAYLOAD_TYPE_COLOR_3F and IMGUI_PAYLOAD_TYPE_COLOR_4F
                // to allow your own widgets to use colors in their drag and drop interaction.
                // Also see 'Demo.Widgets.Color/Picker Widgets.Palette' demo.
                HelpMarker("You can drag from the color squares.");
                const col1 = STATIC(UNIQUE("col1#0a398a7a"), [1.0, 0.0, 0.2]);
                const col2 = STATIC(UNIQUE("col2#3a1842ae"), [0.4, 0.7, 0.0, 0.5]);
                ImGui.ColorEdit3("color 1", col1.value);
                ImGui.ColorEdit4("color 2", col2.value);
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Drag and drop/Copy-swap items");
            if (ImGui.TreeNode("Drag and drop to copy/swap items")) {
                let Mode;
                (function (Mode) {
                    Mode[Mode["Copy"] = 0] = "Copy";
                    Mode[Mode["Move"] = 1] = "Move";
                    Mode[Mode["Swap"] = 2] = "Swap";
                })(Mode || (Mode = {}));
                ;
                const mode = STATIC(UNIQUE("mode#71053ff1"), Mode.Copy);
                if (ImGui.RadioButton("Copy", mode.value === Mode.Copy)) {
                    mode.value = Mode.Copy;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Move", mode.value === Mode.Move)) {
                    mode.value = Mode.Move;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Swap", mode.value === Mode.Swap)) {
                    mode.value = Mode.Swap;
                }
                const names = STATIC_ARRAY(9, UNIQUE("names#84880863"), [
                    "Bobby", "Beatrice", "Betty",
                    "Brianna", "Barry", "Bernard",
                    "Bibi", "Blaine", "Bryn"
                ]);
                for (let n = 0; n < ImGui.ARRAYSIZE(names.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 3) !== 0)
                        ImGui.SameLine();
                    ImGui.Button(names.value[n], new ImGui.Vec2(60, 60));
                    // Our buttons are both drag sources and drag targets here!
                    if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None)) {
                        // Set payload to carry the index of our item (could be anything)
                        ImGui.SetDragDropPayload("DND_DEMO_CELL", n);
                        // Display preview (could be anything, e.g. when dragging an image we could decide to display
                        // the filename and a small preview of the image, etc.)
                        if (mode.value === Mode.Copy) {
                            ImGui.Text(`Copy ${names.value[n]}`);
                        }
                        if (mode.value === Mode.Move) {
                            ImGui.Text(`Move ${names.value[n]}`);
                        }
                        if (mode.value === Mode.Swap) {
                            ImGui.Text(`Swap ${names.value[n]}`);
                        }
                        ImGui.EndDragDropSource();
                    }
                    if (ImGui.BeginDragDropTarget()) {
                        let payload;
                        if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL")) {
                            // ImGui.ASSERT(payload.DataSize === sizeof(int));
                            const payload_n = payload.Data;
                            if (mode.value === Mode.Copy) {
                                names.value[n] = names.value[payload_n];
                            }
                            if (mode.value === Mode.Move) {
                                names.value[n] = names.value[payload_n];
                                names.value[payload_n] = "";
                            }
                            if (mode.value === Mode.Swap) {
                                const tmp = names.value[n];
                                names.value[n] = names.value[payload_n];
                                names.value[payload_n] = tmp;
                            }
                        }
                        ImGui.EndDragDropTarget();
                    }
                    ImGui.PopID();
                }
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Widgets/Drag and Drop/Drag to reorder items (simple)");
            if (ImGui.TreeNode("Drag to reorder items (simple)")) {
                // Simple reordering
                HelpMarker("We don't use the drag and drop api at all here! " +
                    "Instead we query when the item is held but not hovered, and order items accordingly.");
                const item_names = STATIC(UNIQUE("item_names#5ce0ab22"), ["Item One", "Item Two", "Item Three", "Item Four", "Item Five"]);
                for (let n = 0; n < ImGui.ARRAYSIZE(item_names.value); n++) {
                    const item = item_names.value[n];
                    ImGui.Selectable(item);
                    if (ImGui.IsItemActive() && !ImGui.IsItemHovered()) {
                        let n_next = n + (ImGui.GetMouseDragDelta(0).y < 0. ? -1 : 1);
                        if (n_next >= 0 && n_next < ImGui.ARRAYSIZE(item_names.value)) {
                            item_names.value[n] = item_names.value[n_next];
                            item_names.value[n_next] = item;
                            ImGui.ResetMouseDragDelta();
                        }
                    }
                }
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Querying Item Status (Edited,Active,Hovered etc.)");
        if (ImGui.TreeNode("Querying Item Status (Edited/Active/Hovered etc.)")) {
            // Select an item type
            const item_names = [
                "Text", "Button", "Button (w/ repeat)", "Checkbox", "SliderFloat", "InputText", "InputTextMultiline", "InputFloat",
                "InputFloat3", "ColorEdit4", "Selectable", "MenuItem", "TreeNode", "TreeNode (w/ double-click)", "Combo", "ListBox"
            ];
            const item_type = STATIC(UNIQUE("item_type#b38b2976"), 4);
            const item_disabled = STATIC(UNIQUE("item_disabled#b38b2976"), false);
            ImGui.Combo("Item Type", item_type.access, item_names, ImGui.ARRAYSIZE(item_names), ImGui.ARRAYSIZE(item_names));
            ImGui.SameLine();
            HelpMarker("Testing how various types of items are interacting with the IsItemXXX functions. Note that the boolean return value of most ImGui function is generally equivalent to calling ImGui.IsItemHovered().");
            ImGui.Checkbox("Item Disabled", item_disabled.access);
            // Submit selected item item so we can query their status in the code following it.
            let ret = false;
            const b = STATIC(UNIQUE("b#477b9cc2"), false);
            const col4f = STATIC(UNIQUE("col4f#f57415e8"), [1.0, 0.5, 0.0, 1.0]);
            const str = STATIC(UNIQUE("str#092e5277"), new ImGui.StringBuffer(16, ""));
            if (item_disabled.value)
                ImGui.BeginDisabled(true);
            if (item_type.value === 0) {
                ImGui.Text("ITEM: Text");
            } // Testing text items with no identifier/interaction
            if (item_type.value === 1) {
                ret = ImGui.Button("ITEM: Button");
            } // Testing button
            if (item_type.value === 2) {
                ImGui.PushButtonRepeat(true);
                ret = ImGui.Button("ITEM: Button");
                ImGui.PopButtonRepeat();
            } // Testing button (with repeater)
            if (item_type.value === 3) {
                ret = ImGui.Checkbox("ITEM: Checkbox", b.access);
            } // Testing checkbox
            if (item_type.value === 4) {
                ret = ImGui.SliderFloat("ITEM: SliderFloat", col4f.value, 0.0, 1.0);
            } // Testing basic item
            if (item_type.value === 5) {
                ret = ImGui.InputText("ITEM: InputText", str.value, ImGui.ARRAYSIZE(str.value));
            } // Testing input text (which handles tabbing)
            if (item_type.value === 6) {
                ret = ImGui.InputTextMultiline("ITEM: InputTextMultiline", str.value, ImGui.IM_ARRAYSIZE(str.value));
            } // Testing input text (which uses a child window)
            if (item_type.value === 7) {
                ret = ImGui.InputFloat("ITEM: InputFloat", col4f.value, 1.0);
            } // Testing +/- buttons on scalar input
            if (item_type.value === 8) {
                ret = ImGui.InputFloat3("ITEM: InputFloat3", col4f.value);
            } // Testing multi-component items (IsItemXXX flags are reported merged)
            if (item_type.value === 9) {
                ret = ImGui.ColorEdit4("ITEM: ColorEdit4", col4f.value);
            } // Testing multi-component items (IsItemXXX flags are reported merged)
            if (item_type.value === 10) {
                ret = ImGui.Selectable("ITEM: Selectable");
            } // Testing selectable item
            if (item_type.value === 11) {
                ret = ImGui.MenuItem("ITEM: MenuItem");
            } // Testing menu item (they use ImGuiButtonFlags_PressedOnRelease button policy)
            if (item_type.value === 12) {
                ret = ImGui.TreeNode("ITEM: TreeNode");
                if (ret)
                    ImGui.TreePop();
            } // Testing tree node
            if (item_type.value === 13) {
                ret = ImGui.TreeNodeEx("ITEM: TreeNode w/ ImGuiTreeNodeFlags_OpenOnDoubleClick", ImGui.TreeNodeFlags.OpenOnDoubleClick | ImGui.TreeNodeFlags.NoTreePushOnOpen);
            } // Testing tree node with ImGuiButtonFlags_PressedOnDoubleClick button policy.
            if (item_type.value === 14) {
                const items = ["Apple", "Banana", "Cherry", "Kiwi"];
                const current = STATIC(UNIQUE("current#447f243a"), 1);
                ret = ImGui.Combo("ITEM: Combo", current.access, items, ImGui.ARRAYSIZE(items));
            }
            if (item_type.value === 15) {
                const items = ["Apple", "Banana", "Cherry", "Kiwi"];
                const current = STATIC(UNIQUE("current#d92b6d9b"), 1);
                ret = ImGui.ListBox("ITEM: ListBox", current.access, items, ImGui.ARRAYSIZE(items), ImGui.ARRAYSIZE(items));
            }
            // Display the values of IsItemHovered() and other common item state functions.
            // Note that the ImGui.HoveredFlags.XXX flags can be combined.
            // Because BulletText is an item itself and that would affect the output of IsItemXXX functions,
            // we query every state in a single call to avoid storing them and to simplify the code.
            ImGui.BulletText(`Return value = ${ret}\n` +
                `IsItemFocused() = ${ImGui.IsItemFocused()}\n` +
                `IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(ImGui.HoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(ImGui.HoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(ImGui.HoveredFlags.AllowWhenOverlapped)}\n` +
                `IsItemHovered(_AllowWhenDisabled) = ${ImGui.IsItemHovered(ImGui.HoveredFlags.AllowWhenDisabled)}\n` +
                `IsItemHovered(_RectOnly) = ${ImGui.IsItemHovered(ImGui.HoveredFlags.RectOnly)}\n` +
                `IsItemActive() = ${ImGui.IsItemActive()}\n` +
                `IsItemEdited() = ${ImGui.IsItemEdited()}\n` +
                `IsItemActivated() = ${ImGui.IsItemActivated()}\n` +
                `IsItemDeactivated() = ${ImGui.IsItemDeactivated()}\n` +
                `IsItemDeactivatedAfterEdit() = ${ImGui.IsItemDeactivatedAfterEdit()}\n` +
                `IsItemVisible() = ${ImGui.IsItemVisible()}\n` +
                `IsItemClicked() = ${ImGui.IsItemClicked()}\n` +
                `IsItemToggledOpen() = ${ImGui.IsItemToggledOpen()}\n` +
                `GetItemRectMin() = (${ImGui.GetItemRectMin().x.toFixed(1)}, ${ImGui.GetItemRectMin().y.toFixed(1)})\n` +
                `GetItemRectMax() = (${ImGui.GetItemRectMax().x.toFixed(1)}, ${ImGui.GetItemRectMax().y.toFixed(1)})\n` +
                `GetItemRectSize() = (${ImGui.GetItemRectSize().x.toFixed(1)}, ${ImGui.GetItemRectSize().y.toFixed(1)})`);
            if (item_disabled.value)
                ImGui.EndDisabled();
            const buf = new ImGui.ImStringBuffer(1, ""); // char buf[1] = "";
            ImGui.InputText("unused", buf, ImGui.IM_ARRAYSIZE(buf), ImGui.InputTextFlags.ReadOnly);
            ImGui.SameLine();
            HelpMarker("This widget is only here to be able to tab-out of the widgets above and see e.g. Deactivated() status.");
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Widgets/Querying Window Status (Focused,Hovered etc.)");
        if (ImGui.TreeNode("Querying Window Status (Focused/Hovered etc.)")) {
            const embed_all_inside_a_child_window = STATIC(UNIQUE("embed_all_inside_a_child_window#4a40e4ac"), false);
            ImGui.Checkbox("Embed everything inside a child window for testing _RootWindow flag.", embed_all_inside_a_child_window.access);
            if (embed_all_inside_a_child_window.value)
                ImGui.BeginChild("outer_child", new ImGui.Vec2(0, ImGui.GetFontSize() * 20.0), true);
            // Testing IsWindowFocused() function with its various flags.
            ImGui.BulletText(`IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
                `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.ChildWindows)}\n` +
                `IsWindowFocused(_ChildWindows|_NoPopupHierarchy) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.ChildWindows | ImGui.FocusedFlags.NoPopupHierarchy)}\n` +
                `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.ChildWindows | ImGui.FocusedFlags.RootWindow)}\n` +
                `IsWindowFocused(_ChildWindows|_RootWindow|_NoPopupHierarchy) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.ChildWindows | ImGui.FocusedFlags.RootWindow | ImGui.FocusedFlags.NoPopupHierarchy)}\n` +
                `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.RootWindow)}\n` +
                `IsWindowFocused(_RootWindow|_NoPopupHierarchy) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.RootWindow | ImGui.FocusedFlags.NoPopupHierarchy)}\n` +
                `IsWindowFocused(_AnyWindow) = ${ImGui.IsWindowFocused(ImGui.FocusedFlags.AnyWindow)}\n`);
            // Testing IsWindowHovered() function with its various flags.
            ImGui.BulletText(`IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
                `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
                `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.ChildWindows)}\n` +
                `IsWindowHovered(_ChildWindows|_NoPopupHierarchy) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.ChildWindows | ImGui.HoveredFlags.NoPopupHierarchy)}\n` +
                `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.ChildWindows | ImGui.HoveredFlags.RootWindow)}\n` +
                `IsWindowHovered(_ChildWindows|_RootWindow|_NoPopupHierarchy) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.ChildWindows | ImGui.HoveredFlags.RootWindow | ImGui.HoveredFlags.NoPopupHierarchy)}\n` +
                `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.RootWindow)}\n` +
                `IsWindowHovered(_RootWindow|_NoPopupHierarchy) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.RootWindow | ImGui.HoveredFlags.NoPopupHierarchy)}\n` +
                `IsWindowHovered(_ChildWindows|_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.ChildWindows | ImGui.HoveredFlags.AllowWhenBlockedByPopup)}\n` +
                `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(ImGui.HoveredFlags.AnyWindow)}\n`);
            ImGui.BeginChild("child", new ImGui.Vec2(0, 50), true);
            ImGui.Text("This is another child window for testing the _ChildWindows flag.");
            ImGui.EndChild();
            if (embed_all_inside_a_child_window.value)
                ImGui.EndChild();
            const unused_str = STATIC(UNIQUE("unused_str#ea6a7c83"), "This widget is only here to be able to tab-out of the widgets above.");
            ImGui.InputText("unused", unused_str.access, ImGui.ARRAYSIZE(unused_str.value), ImGui.InputTextFlags.ReadOnly);
            // Calling IsItemHovered() after begin returns the hovered status of the title bar.
            // This is useful in particular if you want to create a context menu associated to the title bar of a window.
            const test_window = STATIC(UNIQUE("test_window#150ab832"), false);
            ImGui.Checkbox("Hovered/Active tests after Begin() for title bar testing", test_window.access);
            if (test_window.value) {
                ImGui.Begin("Title bar Hovered/Active tests", test_window.access);
                if (ImGui.BeginPopupContextItem()) // <-- This is using IsItemHovered()
                 {
                    if (ImGui.MenuItem("Close")) {
                        test_window.value = false;
                    }
                    ImGui.EndPopup();
                }
                ImGui.Text(`IsItemHovered() after begin = ${ImGui.IsItemHovered()} (== is title bar hovered)\n` +
                    `IsItemActive() after begin = ${ImGui.IsItemActive()} (== is window being clicked/moved)\n"`);
                ImGui.End();
            }
            ImGui.TreePop();
        }
        // Demonstrate BeginDisabled/EndDisabled using a checkbox located at the bottom of the section (which is a bit odd:
        // logically we'd have this checkbox at the top of the section, but we don't want this feature to steal that space)
        if (disable_all.value)
            ImGui.EndDisabled();
        IMGUI_DEMO_MARKER("Widgets/Disable Block");
        if (ImGui.TreeNode("Disable block")) {
            ImGui.Checkbox("Disable entire section above", disable_all.access);
            ImGui.SameLine();
            HelpMarker("Demonstrate using BeginDisabled()/EndDisabled() across this section.");
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowLayout() {
        IMGUI_DEMO_MARKER("Layout");
        if (!ImGui.CollapsingHeader("Layout & Scrolling"))
            return;
        IMGUI_DEMO_MARKER("Layout/Child windows");
        if (ImGui.TreeNode("Child windows")) {
            HelpMarker("Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window.");
            const disable_mouse_wheel = STATIC(UNIQUE("disable_mouse_wheel#8959bc69"), false);
            const disable_menu = STATIC(UNIQUE("disable_menu#b6ebebfa"), false);
            ImGui.Checkbox("Disable Mouse Wheel", disable_mouse_wheel.access);
            ImGui.Checkbox("Disable Menu", disable_menu.access);
            // Child 1: no border, enable horizontal scrollbar
            {
                let window_flags = ImGui.WindowFlags.HorizontalScrollbar;
                if (disable_mouse_wheel.value)
                    window_flags |= ImGui.WindowFlags.NoScrollWithMouse;
                ImGui.BeginChild("ChildL", new ImGui.Vec2(ImGui.GetContentRegionAvail().x * 0.5, 260), false, window_flags);
                for (let i = 0; i < 100; i++)
                    ImGui.Text(`${i.toString().padStart(4, "0")}: scrollable region`);
                ImGui.EndChild();
            }
            ImGui.SameLine();
            // Child 2: rounded border
            {
                let window_flags = ImGui.WindowFlags.None;
                if (disable_mouse_wheel.value)
                    window_flags |= ImGui.WindowFlags.NoScrollWithMouse;
                if (!disable_menu.value)
                    window_flags |= ImGui.WindowFlags.MenuBar;
                ImGui.PushStyleVar(ImGui.StyleVar.ChildRounding, 5.0);
                ImGui.BeginChild("ChildR", new ImGui.Vec2(0, 260), true, window_flags);
                if (!disable_menu && ImGui.BeginMenuBar()) {
                    if (ImGui.BeginMenu("Menu")) {
                        ShowExampleMenuFile();
                        ImGui.EndMenu();
                    }
                    ImGui.EndMenuBar();
                }
                if (ImGui.BeginTable("split", 2, ImGui.TableFlags.Resizable | ImGui.TableFlags.NoSavedSettings)) {
                    for (let i = 0; i < 100; i++) {
                        const buf = `${i.toString().padStart(3, "0")}`;
                        ImGui.TableNextColumn();
                        ImGui.Button(buf, new ImGui.Vec2(-FLT_MIN, 0.0));
                    }
                    ImGui.EndTable();
                }
                ImGui.EndChild();
                ImGui.PopStyleVar();
            }
            ImGui.Separator();
            // Demonstrate a few extra things
            // - Changing ImGui.Col.ChildBg (which is transparent black in default styles)
            // - Using SetCursorPos() to position child window (the child window is an item from the POV of parent window)
            //   You can also call SetNextWindowPos() to position the child window. The parent window will effectively
            //   layout from this position.
            // - Using ImGui.GetItemRectMin/Max() to query the "item" state (because the child window is an item from
            //   the POV of the parent window). See 'Demo->Querying Status (Edited/Active/Hovered etc.)' for details.
            {
                const offset_x = STATIC(UNIQUE("offset_x#22c5d833"), 0);
                ImGui.SetNextItemWidth(ImGui.GetFontSize() * 8);
                ImGui.DragInt("Offset X", offset_x.access, 1.0, -1000, 1000);
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + offset_x.value);
                ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(255, 0, 0, 100));
                ImGui.BeginChild("Red", new ImGui.Vec2(200, 100), true, ImGui.WindowFlags.None);
                for (let n = 0; n < 50; n++)
                    ImGui.Text(`Some test ${n}`);
                ImGui.EndChild();
                const child_is_hovered = ImGui.IsItemHovered();
                const child_rect_min = ImGui.GetItemRectMin();
                const child_rect_max = ImGui.GetItemRectMax();
                ImGui.PopStyleColor();
                ImGui.Text(`Hovered: ${child_is_hovered}`);
                ImGui.Text(`Rect of child window is: (${child_rect_min.x.toFixed(0)},${child_rect_min.y.toFixed(0)}) (${child_rect_max.x.toFixed(0)},${child_rect_max.y.toFixed(0)})`);
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Layout/Widgets Width");
        if (ImGui.TreeNode("Widgets Width")) {
            const f = STATIC(UNIQUE("f#04b29875"), 0.0);
            const show_indented_items = STATIC(UNIQUE("show_indented_items#271a3fbb"), true);
            ImGui.Checkbox("Show indented items", show_indented_items.access);
            // Use SetNextItemWidth() to set the width of a single upcoming item.
            // Use PushItemWidth()/PopItemWidth() to set the width of a group of items.
            // In real code use you'll probably want to choose width values that are proportional to your font size
            // e.g. Using '20.0 * GetFontSize()' as width instead of '200.0', etc.
            ImGui.Text("SetNextItemWidth/PushItemWidth(100)");
            ImGui.SameLine();
            HelpMarker("Fixed width.");
            ImGui.PushItemWidth(100);
            ImGui.DragFloat("float##1b", f.access);
            if (show_indented_items.value) {
                ImGui.Indent();
                ImGui.DragFloat("float (indented)##1b", f.access);
                ImGui.Unindent();
            }
            ImGui.PopItemWidth();
            ImGui.Text("SetNextItemWidth/PushItemWidth(-100)");
            ImGui.SameLine();
            HelpMarker("Align to right edge minus 100");
            ImGui.PushItemWidth(-100);
            ImGui.DragFloat("float##2a", f.access);
            if (show_indented_items.value) {
                ImGui.Indent();
                ImGui.DragFloat("float (indented)##2b", f.access);
                ImGui.Unindent();
            }
            ImGui.PopItemWidth();
            ImGui.Text("SetNextItemWidth/PushItemWidth(GetContentRegionAvail().x * 0.5)");
            ImGui.SameLine();
            HelpMarker("Half of available width.\n(~ right-cursor_pos)\n(works within a column set)");
            ImGui.PushItemWidth(ImGui.GetContentRegionAvail().x * 0.5);
            ImGui.DragFloat("float##3a", f.access);
            if (show_indented_items.value) {
                ImGui.Indent();
                ImGui.DragFloat("float (indented)##3b", f.access);
                ImGui.Unindent();
            }
            ImGui.PopItemWidth();
            ImGui.Text("SetNextItemWidth/PushItemWidth(-GetContentRegionAvail().x * 0.5)");
            ImGui.SameLine();
            HelpMarker("Align to right edge minus half");
            ImGui.PushItemWidth(-ImGui.GetContentRegionAvail().x * 0.5);
            ImGui.DragFloat("float##4a", f.access);
            if (show_indented_items.value) {
                ImGui.Indent();
                ImGui.DragFloat("float (indented)##4b", f.access);
                ImGui.Unindent();
            }
            ImGui.PopItemWidth();
            // Demonstrate using PushItemWidth to surround three items.
            // Calling SetNextItemWidth() before each of them would have the same effect.
            ImGui.Text("SetNextItemWidth/PushItemWidth(-FLT_MIN)");
            ImGui.SameLine();
            HelpMarker("Align to right edge");
            ImGui.PushItemWidth(-FLT_MIN);
            ImGui.DragFloat("##float5a", f.access);
            if (show_indented_items.value) {
                ImGui.Indent();
                ImGui.DragFloat("float (indented)##5b", f.access);
                ImGui.Unindent();
            }
            ImGui.PopItemWidth();
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout");
        if (ImGui.TreeNode("Basic Horizontal Layout")) {
            ImGui.TextWrapped("(Use ImGui.SameLine() to keep adding items to the right of the preceding item)");
            // Text
            IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout/SameLine");
            ImGui.Text("Two items: Hello");
            ImGui.SameLine();
            ImGui.TextColored(new ImGui.Vec4(1, 1, 0, 1), "Sailor");
            // Adjust spacing
            ImGui.Text("More spacing: Hello");
            ImGui.SameLine(0, 20);
            ImGui.TextColored(new ImGui.Vec4(1, 1, 0, 1), "Sailor");
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
            IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout/SameLine (with offset)");
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
            IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout/SameLine (more)");
            const c1 = STATIC(UNIQUE("c1#8e79c0fc"), false), c2 = STATIC(UNIQUE("c2#aad8e12c"), false), c3 = STATIC(UNIQUE("c3#40deaa13"), false), c4 = STATIC(UNIQUE("c4#67e03dba"), false);
            ImGui.Checkbox("My", c1.access);
            ImGui.SameLine();
            ImGui.Checkbox("Tailor", c2.access);
            ImGui.SameLine();
            ImGui.Checkbox("Is", c3.access);
            ImGui.SameLine();
            ImGui.Checkbox("Rich", c4.access);
            // Various
            const f0 = STATIC(UNIQUE("f0#446d46c8"), 1.0), f1 = STATIC(UNIQUE("f1#7a1dbbee"), 2.0), f2 = STATIC(UNIQUE("f2#1807e9f4"), 3.0);
            ImGui.PushItemWidth(80);
            const items = ["AAAA", "BBBB", "CCCC", "DDDD"];
            const item = STATIC(UNIQUE("item#74aefbce"), -1);
            ImGui.Combo("Combo", item.access, items, ImGui.ARRAYSIZE(items));
            ImGui.SameLine();
            ImGui.SliderFloat("X", f0.access, 0.0, 5.0);
            ImGui.SameLine();
            ImGui.SliderFloat("Y", f1.access, 0.0, 5.0);
            ImGui.SameLine();
            ImGui.SliderFloat("Z", f2.access, 0.0, 5.0);
            ImGui.PopItemWidth();
            ImGui.PushItemWidth(80);
            ImGui.Text("Lists:");
            const selection = STATIC_ARRAY(4, UNIQUE("selection#da11b802"), [0, 1, 2, 3]);
            for (let i = 0; i < 4; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.ListBox("", selection.access(i), items, ImGui.ARRAYSIZE(items));
                ImGui.PopID();
                //if (ImGui.IsItemHovered()) ImGui.SetTooltip("ListBox %d hovered", i);
            }
            ImGui.PopItemWidth();
            // Dummy
            IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout/Dummy");
            const button_sz = new ImGui.Vec2(40, 40);
            ImGui.Button("A", button_sz);
            ImGui.SameLine();
            ImGui.Dummy(button_sz);
            ImGui.SameLine();
            ImGui.Button("B", button_sz);
            // Manually wrapping
            // (we should eventually provide this as an automatic layout feature, but for now you can do it manually)
            IMGUI_DEMO_MARKER("Layout/Basic Horizontal Layout/Manual wrapping");
            ImGui.Text("Manual wrapping:");
            const style = ImGui.GetStyle();
            let buttons_count = 20;
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
        IMGUI_DEMO_MARKER("Layout/Groups");
        if (ImGui.TreeNode("Groups")) {
            HelpMarker("BeginGroup() basically locks the horizontal position for new line. " +
                "EndGroup() bundles the whole group so that you can use \"item\" functions such as " +
                "IsItemHovered()/IsItemActive() or SameLine() etc. on the whole group.");
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
            ImGui.PlotHistogram("##values", values, ImGui.ARRAYSIZE(values), 0, null, 0.0, 1.0, size);
            ImGui.Button("ACTION", new ImGui.Vec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.SameLine();
            ImGui.Button("REACTION", new ImGui.Vec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.EndGroup();
            ImGui.SameLine();
            ImGui.Button("LEVERAGE\nBUZZWORD", size);
            ImGui.SameLine();
            if (ImGui.BeginListBox("List", size)) {
                ImGui.Selectable("Selected", true);
                ImGui.Selectable("Not Selected", false);
                ImGui.EndListBox();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Layout/Text Baseline Alignment");
        if (ImGui.TreeNode("Text Baseline Alignment")) {
            {
                ImGui.BulletText("Text baseline:");
                ImGui.SameLine();
                HelpMarker("This is testing the vertical alignment that gets applied on text to keep it aligned with widgets. " +
                    "Lines only composed of text or \"small\" widgets use less vertical space than lines with framed widgets.");
                ImGui.Indent();
                ImGui.Text("KO Blahblah");
                ImGui.SameLine();
                ImGui.Button("Some framed item");
                ImGui.SameLine();
                HelpMarker("Baseline of button will look misaligned with text..");
                // If your line starts with text, call AlignTextToFramePadding() to align text to upcoming widgets.
                // (because we don't know what's coming after the Text() statement, we need to move the text baseline
                // down by FramePadding.y ahead of time)
                ImGui.AlignTextToFramePadding();
                ImGui.Text("OK Blahblah");
                ImGui.SameLine();
                ImGui.Button("Some framed item");
                ImGui.SameLine();
                HelpMarker("We call AlignTextToFramePadding() to vertically align the text baseline by +FramePadding.y");
                // SmallButton() uses the same vertical padding as Text
                ImGui.Button("TEST##1");
                ImGui.SameLine();
                ImGui.Text("TEST");
                ImGui.SameLine();
                ImGui.SmallButton("TEST##2");
                // If your line starts with text, call AlignTextToFramePadding() to align text to upcoming widgets.
                ImGui.AlignTextToFramePadding();
                ImGui.Text("Text aligned to framed item");
                ImGui.SameLine();
                ImGui.Button("Item##1");
                ImGui.SameLine();
                ImGui.Text("Item");
                ImGui.SameLine();
                ImGui.SmallButton("Item##2");
                ImGui.SameLine();
                ImGui.Button("Item##3");
                ImGui.Unindent();
            }
            ImGui.Spacing();
            {
                ImGui.BulletText("Multi-line text:");
                ImGui.Indent();
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
                ImGui.Unindent();
            }
            ImGui.Spacing();
            {
                ImGui.BulletText("Misc items:");
                ImGui.Indent();
                // SmallButton() sets FramePadding to zero. Text baseline is aligned to match baseline of previous Button.
                ImGui.Button("80x80", new ImGui.Vec2(80, 80));
                ImGui.SameLine();
                ImGui.Button("50x50", new ImGui.Vec2(50, 50));
                ImGui.SameLine();
                ImGui.Button("Button()");
                ImGui.SameLine();
                ImGui.SmallButton("SmallButton()");
                // Tree
                const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
                ImGui.Button("Button##1");
                ImGui.SameLine(0.0, spacing);
                if (ImGui.TreeNode("Node##1")) {
                    // Placeholder tree data
                    for (let i = 0; i < 6; i++)
                        ImGui.BulletText(`Item ${i}..`);
                    ImGui.TreePop();
                }
                // Vertically align text node a bit lower so it'll be vertically centered with upcoming widget.
                // Otherwise you can use SmallButton() (smaller fit).
                ImGui.AlignTextToFramePadding();
                // Common mistake to avoid: if we want to SameLine after TreeNode we need to do it before we add
                // other contents below the node.
                const node_open = ImGui.TreeNode("Node##2");
                ImGui.SameLine(0.0, spacing);
                ImGui.Button("Button##2");
                if (node_open) {
                    // Placeholder tree data
                    for (let i = 0; i < 6; i++)
                        ImGui.BulletText(`Item ${i}..`);
                    ImGui.TreePop();
                }
                // Bullet
                ImGui.Button("Button##3");
                ImGui.SameLine(0.0, spacing);
                ImGui.BulletText("Bullet text");
                ImGui.AlignTextToFramePadding();
                ImGui.BulletText("Node");
                ImGui.SameLine(0.0, spacing);
                ImGui.Button("Button##4");
                ImGui.Unindent();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Layout/Scrolling");
        if (ImGui.TreeNode("Scrolling")) {
            // Vertical scroll functions
            IMGUI_DEMO_MARKER("Layout/Scrolling/Vertical");
            HelpMarker("Use SetScrollHereY() or SetScrollFromPosY() to scroll to a given vertical position.");
            const track_item = STATIC(UNIQUE("track_item#9096c532"), 50);
            const enable_track = STATIC(UNIQUE("enable_track#979b83c3"), true);
            const enable_extra_decorations = STATIC(UNIQUE("enable_extra_decorations#819b7fdb"), false);
            const scroll_to_off_px = STATIC(UNIQUE("scroll_to_off_px#58c87110"), 0.0);
            const scroll_to_pos_px = STATIC(UNIQUE("scroll_to_pos_px#e04e1e3a"), 200.0);
            ImGui.Checkbox("Decoration", enable_extra_decorations.access);
            ImGui.Checkbox("Track", enable_track.access);
            ImGui.PushItemWidth(100);
            ImGui.SameLine(140);
            if (ImGui.DragInt("##item", track_item.access, 0.25, 0, 99, "Item = %d")) {
                enable_track.value = true;
            }
            let scroll_to_off = ImGui.Button("Scroll Offset");
            ImGui.SameLine(140);
            if (ImGui.DragFloat("##off", scroll_to_off_px.access, 1.00, 0, FLT_MAX, "+%.0f px")) {
                scroll_to_off = true;
            }
            let scroll_to_pos = ImGui.Button("Scroll To Pos");
            ImGui.SameLine(140);
            if (ImGui.DragFloat("##pos", scroll_to_pos_px.access, 1.00, -10, FLT_MAX, "X/Y = %.0f px")) {
                scroll_to_pos = true;
            }
            ImGui.PopItemWidth();
            if (scroll_to_off || scroll_to_pos)
                enable_track.value = false;
            const style = ImGui.GetStyle();
            let child_w = (ImGui.GetContentRegionAvail().x - 4 * style.ItemSpacing.x) / 5;
            if (child_w < 1.0)
                child_w = 1.0;
            ImGui.PushID("##VerticalScrolling");
            for (let i = 0; i < 5; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.BeginGroup();
                const names = ["Top", "25%", "Center", "75%", "Bottom"];
                ImGui.TextUnformatted(names[i]);
                const child_flags = enable_extra_decorations.value ? ImGui.WindowFlags.MenuBar : 0;
                const child_id = ImGui.GetID(/*(void*)(intptr_t)*/ i);
                const child_is_visible = ImGui.BeginChild(child_id, new ImGui.Vec2(child_w, 200.0), true, child_flags);
                if (ImGui.BeginMenuBar()) {
                    ImGui.TextUnformatted("abc");
                    ImGui.EndMenuBar();
                }
                if (scroll_to_off)
                    ImGui.SetScrollY(scroll_to_off_px.value);
                if (scroll_to_pos)
                    ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_pos_px.value, i * 0.25);
                if (child_is_visible) // Avoid calling SetScrollHereY when running with culled items
                 {
                    for (let item = 0; item < 100; item++) {
                        if (enable_track.value && item === track_item.value) {
                            ImGui.TextColored(new ImGui.Vec4(1, 1, 0, 1), `Item ${item}`);
                            ImGui.SetScrollHereY(i * 0.25); // 0.0:top, 0.5:center, 1.0:bottom
                        }
                        else {
                            ImGui.Text(`Item ${item}`);
                        }
                    }
                }
                const scroll_y = ImGui.GetScrollY();
                const scroll_max_y = ImGui.GetScrollMaxY();
                ImGui.EndChild();
                ImGui.Text(`${scroll_y.toFixed(0)}/${scroll_max_y.toFixed(0)}`);
                ImGui.EndGroup();
            }
            ImGui.PopID();
            // Horizontal scroll functions
            IMGUI_DEMO_MARKER("Layout/Scrolling/Horizontal");
            ImGui.Spacing();
            HelpMarker("Use SetScrollHereX() or SetScrollFromPosX() to scroll to a given horizontal position.\n\n" +
                "Because the clipping rectangle of most window hides half worth of WindowPadding on the " +
                "left/right, using SetScrollFromPosX(+1) will usually result in clipped text whereas the " +
                "equivalent SetScrollFromPosY(+1) wouldn't.");
            ImGui.PushID("##HorizontalScrolling");
            for (let i = 0; i < 5; i++) {
                const child_height = ImGui.GetTextLineHeight() + style.ScrollbarSize + style.WindowPadding.y * 2.0;
                const child_flags = ImGui.WindowFlags.HorizontalScrollbar | (enable_extra_decorations ? ImGui.WindowFlags.AlwaysVerticalScrollbar : 0);
                const child_id = ImGui.GetID(/*(void*)(intptr_t)*/ i);
                const child_is_visible = ImGui.BeginChild(child_id, new ImGui.Vec2(-100, child_height), true, child_flags);
                if (scroll_to_off)
                    ImGui.SetScrollX(scroll_to_off_px.value);
                if (scroll_to_pos)
                    ImGui.SetScrollFromPosX(ImGui.GetCursorStartPos().x + scroll_to_pos_px.value, i * 0.25);
                if (child_is_visible) // Avoid calling SetScrollHereY when running with culled items
                 {
                    for (let item = 0; item < 100; item++) {
                        if (item > 0)
                            ImGui.SameLine();
                        if (enable_track.value && item === track_item.value) {
                            ImGui.TextColored(new ImGui.Vec4(1, 1, 0, 1), `Item ${item}`);
                            ImGui.SetScrollHereX(i * 0.25); // 0.0:left, 0.5:center, 1.0:right
                        }
                        else {
                            ImGui.Text(`Item ${item}`);
                        }
                    }
                }
                const scroll_x = ImGui.GetScrollX();
                const scroll_max_x = ImGui.GetScrollMaxX();
                ImGui.EndChild();
                ImGui.SameLine();
                const names = ["Left", "25%", "Center", "75%", "Right"];
                ImGui.Text(`${names[i]}\n${scroll_x.toFixed(0)}/${scroll_max_x.toFixed(0)}`);
                ImGui.Spacing();
            }
            ImGui.PopID();
            // Miscellaneous Horizontal Scrolling Demo
            IMGUI_DEMO_MARKER("Layout/Scrolling/Horizontal (more)");
            HelpMarker("Horizontal scrolling for a window is enabled via the ImGui.WindowFlags.HorizontalScrollbar flag.\n\n" +
                "You may want to also explicitly specify content width by using SetNextWindowContentWidth() before Begin().");
            const lines = STATIC(UNIQUE("lines#a00837f9"), 7);
            ImGui.SliderInt("Lines", lines.access, 1, 15);
            ImGui.PushStyleVar(ImGui.StyleVar.FrameRounding, 3.0);
            ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(2.0, 1.0));
            const scrolling_child_size = new ImGui.Vec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30);
            ImGui.BeginChild("scrolling", scrolling_child_size, true, ImGui.WindowFlags.HorizontalScrollbar);
            for (let line = 0; line < lines.value; line++) {
                // Display random stuff. For the sake of this trivial demo we are using basic Button() + SameLine()
                // If you want to create your own time line for a real application you may be better off manipulating
                // the cursor position yourself, aka using SetCursorPos/SetCursorScreenPos to position the widgets
                // yourself. You may also want to use the lower-level ImDrawList API.
                let num_buttons = 10 + ((line & 1) ? line * 9 : line * 3);
                for (let n = 0; n < num_buttons; n++) {
                    if (n > 0)
                        ImGui.SameLine();
                    ImGui.PushID(n + line * 1000);
                    const num_buf = `${n}`;
                    const label = (!(n % 15)) ? "FizzBuzz" : (!(n % 3)) ? "Fizz" : (!(n % 5)) ? "Buzz" : num_buf;
                    const hue = n * 0.05;
                    ImGui.PushStyleColor(ImGui.Col.Button, ImGui.Color.HSV(hue, 0.6, 0.6));
                    ImGui.PushStyleColor(ImGui.Col.ButtonHovered, ImGui.Color.HSV(hue, 0.7, 0.7));
                    ImGui.PushStyleColor(ImGui.Col.ButtonActive, ImGui.Color.HSV(hue, 0.8, 0.8));
                    ImGui.Button(label, new ImGui.Vec2(40.0 + Math.sin((line + n)) * 20.0, 0.0));
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
                // Demonstrate a trick: you can use Begin to set yourself in the context of another window
                // (here we are already out of your child window)
                ImGui.BeginChild("scrolling");
                ImGui.SetScrollX(ImGui.GetScrollX() + scroll_x_delta);
                ImGui.EndChild();
            }
            ImGui.Spacing();
            const show_horizontal_contents_size_demo_window = STATIC(UNIQUE("show_horizontal_contents_size_demo_window#2626c2cb"), false);
            ImGui.Checkbox("Show Horizontal contents size demo window", show_horizontal_contents_size_demo_window.access);
            if (show_horizontal_contents_size_demo_window.value) {
                const show_h_scrollbar = STATIC(UNIQUE("show_h_scrollbar#e31a5214"), true);
                const show_button = STATIC(UNIQUE("show_button#5fba97e6"), true);
                const show_tree_nodes = STATIC(UNIQUE("show_tree_nodes#a2a0be40"), true);
                const show_text_wrapped = STATIC(UNIQUE("show_text_wrapped#e3497492"), false);
                const show_columns = STATIC(UNIQUE("show_columns#77c3e24d"), true);
                const show_tab_bar = STATIC(UNIQUE("show_tab_bar#734c3413"), true);
                const show_child = STATIC(UNIQUE("show_child#bf0c32eb"), false);
                const explicit_content_size = STATIC(UNIQUE("explicit_content_size#ae0d4401"), false);
                const contents_size_x = STATIC(UNIQUE("contents_size_x#d9c6189b"), 300.0);
                if (explicit_content_size.value)
                    ImGui.SetNextWindowContentSize(new ImGui.Vec2(contents_size_x.value, 0.0));
                ImGui.Begin("Horizontal contents size demo window", show_horizontal_contents_size_demo_window.access, show_h_scrollbar ? ImGui.WindowFlags.HorizontalScrollbar : 0);
                IMGUI_DEMO_MARKER("Layout/Scrolling/Horizontal contents size demo window");
                ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(2, 0));
                ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(2, 0));
                HelpMarker("Test of different widgets react and impact the work rectangle growing when horizontal scrolling is enabled.\n\nUse 'Metrics.Tools.Show windows rectangles' to visualize rectangles.");
                ImGui.Checkbox("H-scrollbar", show_h_scrollbar.access);
                ImGui.Checkbox("Button", show_button.access); // Will grow contents size (unless explicitly overwritten)
                ImGui.Checkbox("Tree nodes", show_tree_nodes.access); // Will grow contents size and display highlight over full width
                ImGui.Checkbox("Text wrapped", show_text_wrapped.access); // Will grow and use contents size
                ImGui.Checkbox("Columns", show_columns.access); // Will use contents size
                ImGui.Checkbox("Tab bar", show_tab_bar.access); // Will use contents size
                ImGui.Checkbox("Child", show_child.access); // Will grow and use contents size
                ImGui.Checkbox("Explicit content size", explicit_content_size.access);
                ImGui.Text(`Scroll ${ImGui.GetScrollX().toFixed(1)}/${ImGui.GetScrollMaxX().toFixed(1)} ${ImGui.GetScrollY().toFixed(1)}/${ImGui.GetScrollMaxY().toFixed(1)}`);
                if (explicit_content_size.value) {
                    ImGui.SameLine();
                    ImGui.SetNextItemWidth(100);
                    ImGui.DragFloat("##csx", contents_size_x.access);
                    const p = ImGui.GetCursorScreenPos();
                    ImGui.GetWindowDrawList().AddRectFilled(p, new ImGui.Vec2(p.x + 10, p.y + 10), ImGui.COL32_WHITE);
                    ImGui.GetWindowDrawList().AddRectFilled(new ImGui.Vec2(p.x + contents_size_x.value - 10, p.y), new ImGui.Vec2(p.x + contents_size_x.value, p.y + 10), ImGui.COL32_WHITE);
                    ImGui.Dummy(new ImGui.Vec2(0, 10));
                }
                ImGui.PopStyleVar(2);
                ImGui.Separator();
                if (show_button.value) {
                    ImGui.Button("this is a 300-wide button", new ImGui.Vec2(300, 0));
                }
                if (show_tree_nodes.value) {
                    let open = true;
                    if (ImGui.TreeNode("this is a tree node")) {
                        if (ImGui.TreeNode("another one of those tree node...")) {
                            ImGui.Text("Some tree contents");
                            ImGui.TreePop();
                        }
                        ImGui.TreePop();
                    }
                    ImGui.CollapsingHeader("CollapsingHeader", (_ = open) => open = _);
                }
                if (show_text_wrapped.value) {
                    ImGui.TextWrapped("This text should automatically wrap on the edge of the work rectangle.");
                }
                if (show_columns.value) {
                    ImGui.Text("Tables:");
                    if (ImGui.BeginTable("table", 4, ImGui.TableFlags.Borders)) {
                        for (let n = 0; n < 4; n++) {
                            ImGui.TableNextColumn();
                            ImGui.Text(`Width ${ImGui.GetContentRegionAvail().x.toFixed(2)}`);
                        }
                        ImGui.EndTable();
                    }
                    ImGui.Text("Columns:");
                    ImGui.Columns(4);
                    for (let n = 0; n < 4; n++) {
                        ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}`);
                        ImGui.NextColumn();
                    }
                    ImGui.Columns(1);
                }
                if (show_tab_bar.value && ImGui.BeginTabBar("Hello")) {
                    if (ImGui.BeginTabItem("OneOneOne")) {
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("TwoTwoTwo")) {
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("ThreeThreeThree")) {
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("FourFourFour")) {
                        ImGui.EndTabItem();
                    }
                    ImGui.EndTabBar();
                }
                if (show_child.value) {
                    ImGui.BeginChild("child", new ImGui.Vec2(0, 0), true);
                    ImGui.EndChild();
                }
                ImGui.End();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Layout/Clipping");
        if (ImGui.TreeNode("Clipping")) {
            const size = STATIC(UNIQUE("size#db17ebc1"), new ImGui.Vec2(100.0, 100.0));
            const offset = STATIC(UNIQUE("offset#345f2a79"), new ImGui.Vec2(30.0, 30.0));
            ImGui.DragFloat2("size", size.value, 0.5, 1.0, 200.0, "%.0f");
            ImGui.TextWrapped("(Click and drag to scroll)");
            for (let n = 0; n < 3; n++) {
                if (n > 0)
                    ImGui.SameLine();
                ImGui.PushID(n);
                ImGui.BeginGroup(); // Lock X position
                ImGui.InvisibleButton("##empty", size.value);
                if (ImGui.IsItemActive() && ImGui.IsMouseDragging(ImGui.MouseButton.Left)) {
                    offset.value.x += ImGui.GetIO().MouseDelta.x;
                    offset.value.y += ImGui.GetIO().MouseDelta.y;
                }
                const p0 = ImGui.GetItemRectMin();
                const p1 = ImGui.GetItemRectMax();
                const text_str = "Line 1 hello\nLine 2 clip me!";
                const text_pos = new ImGui.Vec2(p0.x + offset.value.x, p0.y + offset.value.y);
                const draw_list = ImGui.GetWindowDrawList();
                switch (n) {
                    case 0:
                        HelpMarker("Using ImGui.PushClipRect():\n" +
                            "Will alter ImGui hit-testing logic + ImDrawList rendering.\n" +
                            "(use this if you want your clipping rectangle to affect interactions)");
                        ImGui.PushClipRect(p0, p1, true);
                        draw_list.AddRectFilled(p0, p1, ImGui.COL32(90, 90, 120, 255));
                        draw_list.AddText(text_pos, ImGui.COL32_WHITE, text_str);
                        ImGui.PopClipRect();
                        break;
                    case 1:
                        HelpMarker("Using ImDrawList.PushClipRect():\n" +
                            "Will alter ImDrawList rendering only.\n" +
                            "(use this as a shortcut if you are only using ImDrawList calls)");
                        draw_list.PushClipRect(p0, p1, true);
                        draw_list.AddRectFilled(p0, p1, ImGui.COL32(90, 90, 120, 255));
                        draw_list.AddText(text_pos, ImGui.COL32_WHITE, text_str);
                        draw_list.PopClipRect();
                        break;
                    case 2:
                        HelpMarker("Using ImDrawList.AddText() with a fine ClipRect:\n" +
                            "Will alter only this specific ImDrawList.AddText() rendering.\n" +
                            "(this is often used internally to avoid altering the clipping rectangle and minimize draw calls)");
                        const clip_rect = new ImGui.Vec4(p0.x, p0.y, p1.x, p1.y); // AddText() takes a ImGui.Vec4* here so let's convert.
                        draw_list.AddRectFilled(p0, p1, ImGui.COL32(90, 90, 120, 255));
                        draw_list.AddText(ImGui.GetFont(), ImGui.GetFontSize(), text_pos, ImGui.COL32_WHITE, text_str, null, 0.0, clip_rect);
                        break;
                }
                ImGui.EndGroup();
                ImGui.PopID();
            }
            ImGui.TreePop();
        }
    }
    function ShowDemoWindowPopups() {
        IMGUI_DEMO_MARKER("Popups");
        if (!ImGui.CollapsingHeader("Popups & Modal windows"))
            return;
        // The properties of popups windows are:
        // - They block normal mouse hovering detection outside them. (*)
        // - Unless modal, they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
        // - Their visibility state (~boolean) is held internally by Dear ImGui instead of being held by the programmer as
        //   we are used to with regular Begin() calls. User can manipulate the visibility state by calling OpenPopup().
        // (*) One can use IsItemHovered(ImGui.HoveredFlags.AllowWhenBlockedByPopup) to bypass it and detect hovering even
        //     when normally blocked by a popup.
        // Those three properties are connected. The library needs to hold their visibility state BECAUSE it can close
        // popups at any time.
        // Typical use for regular windows:
        //   const my_tool_is_active: boolean = false; if (ImGui.Button("Open")) my_tool_is_active = true; [...] if (my_tool_is_active) Begin("My Tool", &my_tool_is_active) { [...] } End();
        // Typical use for popups:
        //   if (ImGui.Button("Open")) ImGui.OpenPopup("MyPopup"); if (ImGui.BeginPopup("MyPopup") { [...] EndPopup(); }
        // With popups we have to go through a library call (here OpenPopup) to manipulate the visibility state.
        // This may be a bit confusing at first but it should quickly make sense. Follow on the examples below.
        IMGUI_DEMO_MARKER("Popups/Popups");
        if (ImGui.TreeNode("Popups")) {
            ImGui.TextWrapped("When a popup is active, it inhibits interacting with windows that are behind the popup. " +
                "Clicking outside the popup closes it.");
            const selected_fish = STATIC(UNIQUE("selected_fish#ba576008"), -1);
            const names = ["Bream", "Haddock", "Mackerel", "Pollock", "Tilefish"];
            const toggles = STATIC_ARRAY(5, UNIQUE("toggles#b168bdf3"), [true, false, false, false, false]);
            // Simple selection popup (if you want to show the current selection inside the Button itself,
            // you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
            if (ImGui.Button("Select.."))
                ImGui.OpenPopup("my_select_popup");
            ImGui.SameLine();
            ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value]);
            if (ImGui.BeginPopup("my_select_popup")) {
                ImGui.Text("Aquarium");
                ImGui.Separator();
                for (let i = 0; i < ImGui.ARRAYSIZE(names); i++)
                    if (ImGui.Selectable(names[i]))
                        selected_fish.value = i;
                ImGui.EndPopup();
            }
            // Showing a menu with toggles
            if (ImGui.Button("Toggle.."))
                ImGui.OpenPopup("my_toggle_popup");
            if (ImGui.BeginPopup("my_toggle_popup")) {
                for (let i = 0; i < ImGui.ARRAYSIZE(names); i++)
                    ImGui.MenuItem(names[i], "", toggles.access(i));
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
                    for (let i = 0; i < ImGui.ARRAYSIZE(names); i++)
                        ImGui.MenuItem(names[i], "", toggles.access(i));
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
            if (ImGui.Button("With a menu.."))
                ImGui.OpenPopup("my_file_popup");
            if (ImGui.BeginPopup("my_file_popup", ImGui.WindowFlags.MenuBar)) {
                if (ImGui.BeginMenuBar()) {
                    if (ImGui.BeginMenu("File")) {
                        ShowExampleMenuFile();
                        ImGui.EndMenu();
                    }
                    if (ImGui.BeginMenu("Edit")) {
                        ImGui.MenuItem("Dummy");
                        ImGui.EndMenu();
                    }
                    ImGui.EndMenuBar();
                }
                ImGui.Text("Hello from popup!");
                ImGui.Button("This is a dummy button..");
                ImGui.EndPopup();
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Popups/Context menus");
        if (ImGui.TreeNode("Context menus")) {
            HelpMarker("\"Context\" functions are simple helpers to associate a Popup to a given Item or Window identifier.");
            // BeginPopupContextItem() is a helper to provide common/simple popup behavior of essentially doing:
            //     if (id == 0)
            //         id = GetItemID(); // Use last item id
            //     if (IsItemHovered() && IsMouseReleased(ImGuiMouseButton_Right))
            //         OpenPopup(id);
            //     return BeginPopup(id);
            // For advanced advanced uses you may want to replicate and customize this code.
            // See more details in BeginPopupContextItem().
            // Example 1
            // When used after an item that has an ID (e.g. Button), we can skip providing an ID to BeginPopupContextItem(),
            // and BeginPopupContextItem() will use the last item ID as the popup ID.
            {
                const names = ["Label1", "Label2", "Label3", "Label4", "Label5"];
                for (let n = 0; n < 5; n++) {
                    ImGui.Selectable(names[n]);
                    if (ImGui.BeginPopupContextItem()) // <-- use last item id as popup id
                     {
                        ImGui.Text(`This a popup for "${names[n]}"!`); // ImGui.Text("This a popup for \"%s\"!", names[n]);
                        if (ImGui.Button("Close"))
                            ImGui.CloseCurrentPopup();
                        ImGui.EndPopup();
                    }
                    if (ImGui.IsItemHovered())
                        ImGui.SetTooltip("Right-click to open popup");
                }
            }
            // Example 2
            // Popup on a Text() element which doesn't have an identifier: we need to provide an identifier to BeginPopupContextItem().
            // Using an explicit identifier is also convenient if you want to activate the popups from different locations.
            {
                HelpMarker("Text() elements don't have stable identifiers so we need to provide one.");
                const value = STATIC(UNIQUE("value#779ba8c7"), 0.5); // static float value = 0.5;
                ImGui.Text(`Value = ${value.value} <-- (1) right-click this value`); // ImGui.Text("Value = %.3f <-- (1) right-click this value", value);
                if (ImGui.BeginPopupContextItem("my popup")) {
                    if (ImGui.Selectable("Set to zero"))
                        value.value = 0.0;
                    if (ImGui.Selectable("Set to PI"))
                        value.value = 3.1415;
                    ImGui.SetNextItemWidth(-FLT_MIN);
                    ImGui.DragFloat("##Value", value.access, 0.1, 0.0, 0.0);
                    ImGui.EndPopup();
                }
                // We can also use OpenPopupOnItemClick() to toggle the visibility of a given popup.
                // Here we make it that right-clicking this other text element opens the same popup as above.
                // The popup itself will be submitted by the code above.
                ImGui.Text("(2) Or right-click this text");
                ImGui.OpenPopupOnItemClick("my popup", ImGui.PopupFlags.MouseButtonRight);
                // Back to square one: manually open the same popup.
                if (ImGui.Button("(3) Or click this button"))
                    ImGui.OpenPopup("my popup");
            }
            // Example 3
            // When using BeginPopupContextItem() with an implicit identifier (NULL == use last item ID),
            // we need to make sure your item identifier is stable.
            // In this example we showcase altering the item label while preserving its identifier, using the ### operator (see FAQ).
            {
                HelpMarker("Showcase using a popup ID linked to item ID, with the item having a changing label + stable ID using the ### operator.");
                const name = STATIC(UNIQUE("name#c8522cc0"), new ImGui.StringBuffer(32, "Label1")); // static char name[32] = "Label1";
                const buf = `Button: ${name.value}###Button`;
                // char buf[64];
                // sprintf(buf, "Button: %s###Button", name); // ### operator override ID ignoring the preceding label
                ImGui.Button(buf);
                if (ImGui.BeginPopupContextItem()) {
                    ImGui.Text("Edit name:");
                    ImGui.InputText("##edit", name.value, ImGui.IM_ARRAYSIZE(name.value));
                    if (ImGui.Button("Close"))
                        ImGui.CloseCurrentPopup();
                    ImGui.EndPopup();
                }
                ImGui.SameLine();
                ImGui.Text("(<-- right-click here)");
            }
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Popups/Modals");
        if (ImGui.TreeNode("Modals")) {
            ImGui.TextWrapped("Modal windows are like popups but the user cannot close them by clicking outside.");
            if (ImGui.Button("Delete.."))
                ImGui.OpenPopup("Delete?");
            // Always center this window when appearing
            const center = ImGui.GetMainViewport().GetCenter();
            ImGui.SetNextWindowPos(center, ImGui.Cond.Appearing, new ImGui.Vec2(0.5, 0.5));
            if (ImGui.BeginPopupModal("Delete?", null, ImGui.WindowFlags.AlwaysAutoResize)) {
                ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
                ImGui.Separator();
                //const unused_i = STATIC<int>(UNIQUE("unused_i#7fa699b8"), 0);
                //ImGui.Combo("Combo", &unused_i, "Delete\0Delete harder\0");
                const dont_ask_me_next_time = STATIC(UNIQUE("dont_ask_me_next_time#03274588"), false);
                ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(0, 0));
                ImGui.Checkbox("Don't ask me next time", dont_ask_me_next_time.access);
                ImGui.PopStyleVar();
                if (ImGui.Button("OK", new ImGui.Vec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.SetItemDefaultFocus();
                ImGui.SameLine();
                if (ImGui.Button("Cancel", new ImGui.Vec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.EndPopup();
            }
            if (ImGui.Button("Stacked modals.."))
                ImGui.OpenPopup("Stacked 1");
            if (ImGui.BeginPopupModal("Stacked 1", null, ImGui.WindowFlags.MenuBar)) {
                if (ImGui.BeginMenuBar()) {
                    if (ImGui.BeginMenu("File")) {
                        if (ImGui.MenuItem("Some menu item")) { }
                        ImGui.EndMenu();
                    }
                    ImGui.EndMenuBar();
                }
                ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGui.Col.ModalWindowDimBg] behind it.");
                // Testing behavior of widgets stacking their own regular popups over the modal.
                const item = STATIC(UNIQUE("item#c3ef3ffa"), 1);
                const color = STATIC(UNIQUE("color#768f04f5"), [0.4, 0.7, 0.0, 0.5]);
                ImGui.Combo("Combo", item.access, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
                ImGui.ColorEdit4("color", color.value);
                if (ImGui.Button("Add another modal.."))
                    ImGui.OpenPopup("Stacked 2");
                // Also demonstrate passing a boolean* to BeginPopupModal(), this will create a regular close button which
                // will close the popup. Note that the visibility state of popups is owned by imgui, so the input value
                // of the boolean actually doesn't matter here.
                let unused_open = true;
                if (ImGui.BeginPopupModal("Stacked 2", (_ = unused_open) => unused_open = _)) {
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
            // Note: As a quirk in this very specific example, we want to differentiate the parent of this menu from the
            // parent of the various popup menus above. To do so we are encloding the items in a PushID()/PopID() block
            // to make them two different menusets. If we don't, opening any popup above and hovering our menu here would
            // open it. This is because once a menu is active, we allow to switch to a sibling menu by just hovering on it,
            // which is the desired behavior for regular menus.
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
    // const ImGui.TableSortSpecs* MyItem::s_current_sort_specs = null;
    // }
    // Make the UI compact because there are so many fields
    function PushStyleCompact() {
        const style = ImGui.GetStyle();
        ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(style.FramePadding.x, Math.floor /*(float)(int)*/(style.FramePadding.y * 0.60)));
        ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(style.ItemSpacing.x, Math.floor /*(float)(int)*/(style.ItemSpacing.y * 0.60)));
    }
    function PopStyleCompact() {
        ImGui.PopStyleVar(2);
    }
    // Show a combo box with a choice of sizing policies
    function EditTableSizingFlags(p_flags) {
        class EnumDesc {
            constructor(Value, Name, Tooltip) {
                this.Value = Value;
                this.Name = Name;
                this.Tooltip = Tooltip;
            }
        }
        ;
        const policies = STATIC_ARRAY(5, UNIQUE("policies#4d5a69af"), [
            new EnumDesc(ImGui.TableFlags.None, "Default", "Use default sizing policy:\n- ImGui.TableFlags.SizingFixedFit if ScrollX is on or if host window has ImGui.WindowFlags.AlwaysAutoResize.\n- ImGui.TableFlags.SizingStretchSame otherwise."),
            new EnumDesc(ImGui.TableFlags.SizingFixedFit, "ImGui.TableFlags.SizingFixedFit", "Columns default to _WidthFixed (if resizable) or _WidthAuto (if not resizable), matching contents width."),
            new EnumDesc(ImGui.TableFlags.SizingFixedSame, "ImGui.TableFlags.SizingFixedSame", "Columns are all the same width, matching the maximum contents width.\nImplicitly disable ImGui.TableFlags.Resizable and enable ImGui.TableFlags.NoKeepColumnsVisible."),
            new EnumDesc(ImGui.TableFlags.SizingStretchProp, "ImGui.TableFlags.SizingStretchProp", "Columns default to _WidthStretch with weights proportional to their widths."),
            new EnumDesc(ImGui.TableFlags.SizingStretchSame, "ImGui.TableFlags.SizingStretchSame", "Columns default to _WidthStretch with same weights."),
        ]);
        let idx;
        for (idx = 0; idx < ImGui.ARRAYSIZE(policies.value); idx++)
            if (policies.value[idx].Value === (p_flags() & ImGui.TableFlags.SizingMask_))
                break;
        const preview_text = (idx < ImGui.ARRAYSIZE(policies.value)) ? policies.value[idx].Name + (idx > 0 ? "ImGui.TableFlags".length : 0) : "";
        if (ImGui.BeginCombo("Sizing Policy", preview_text)) {
            for (let n = 0; n < ImGui.ARRAYSIZE(policies.value); n++)
                if (ImGui.Selectable(policies.value[n].Name, idx === n))
                    p_flags((p_flags() & ~ImGui.TableFlags.SizingMask_) | policies.value[n].Value);
            ImGui.EndCombo();
        }
        ImGui.SameLine();
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 50.0);
            for (let m = 0; m < ImGui.ARRAYSIZE(policies.value); m++) {
                ImGui.Separator();
                ImGui.Text(`${policies.value[m].Name}:`);
                ImGui.Separator();
                ImGui.SetCursorPosX(ImGui.GetCursorPosX() + ImGui.GetStyle().IndentSpacing * 0.5);
                ImGui.TextUnformatted(policies.value[m].Tooltip);
            }
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    function EditTableColumnsFlags(p_flags) {
        ImGui.CheckboxFlags("_Disabled", p_flags, ImGui.TableColumnFlags.Disabled);
        ImGui.SameLine();
        HelpMarker("Master disable flag (also hide from context menu)");
        ImGui.CheckboxFlags("_DefaultHide", p_flags, ImGui.TableColumnFlags.DefaultHide);
        ImGui.CheckboxFlags("_DefaultSort", p_flags, ImGui.TableColumnFlags.DefaultSort);
        if (ImGui.CheckboxFlags("_WidthStretch", p_flags, ImGui.TableColumnFlags.WidthStretch))
            p_flags(p_flags() & ~(ImGui.TableColumnFlags.WidthMask_ ^ ImGui.TableColumnFlags.WidthStretch));
        if (ImGui.CheckboxFlags("_WidthFixed", p_flags, ImGui.TableColumnFlags.WidthFixed))
            p_flags(p_flags() & ~(ImGui.TableColumnFlags.WidthMask_ ^ ImGui.TableColumnFlags.WidthFixed));
        ImGui.CheckboxFlags("_NoResize", p_flags, ImGui.TableColumnFlags.NoResize);
        ImGui.CheckboxFlags("_NoReorder", p_flags, ImGui.TableColumnFlags.NoReorder);
        ImGui.CheckboxFlags("_NoHide", p_flags, ImGui.TableColumnFlags.NoHide);
        ImGui.CheckboxFlags("_NoClip", p_flags, ImGui.TableColumnFlags.NoClip);
        ImGui.CheckboxFlags("_NoSort", p_flags, ImGui.TableColumnFlags.NoSort);
        ImGui.CheckboxFlags("_NoSortAscending", p_flags, ImGui.TableColumnFlags.NoSortAscending);
        ImGui.CheckboxFlags("_NoSortDescending", p_flags, ImGui.TableColumnFlags.NoSortDescending);
        ImGui.CheckboxFlags("_NoHeaderLabel", p_flags, ImGui.TableColumnFlags.NoHeaderLabel);
        ImGui.CheckboxFlags("_NoHeaderWidth", p_flags, ImGui.TableColumnFlags.NoHeaderWidth);
        ImGui.CheckboxFlags("_PreferSortAscending", p_flags, ImGui.TableColumnFlags.PreferSortAscending);
        ImGui.CheckboxFlags("_PreferSortDescending", p_flags, ImGui.TableColumnFlags.PreferSortDescending);
        ImGui.CheckboxFlags("_IndentEnable", p_flags, ImGui.TableColumnFlags.IndentEnable);
        ImGui.SameLine();
        HelpMarker("Default for column 0");
        ImGui.CheckboxFlags("_IndentDisable", p_flags, ImGui.TableColumnFlags.IndentDisable);
        ImGui.SameLine();
        HelpMarker("Default for column >0");
    }
    function ShowTableColumnsStatusFlags(flags) {
        ImGui.CheckboxFlags("_IsEnabled", flags, ImGui.TableColumnFlags.IsEnabled);
        ImGui.CheckboxFlags("_IsVisible", flags, ImGui.TableColumnFlags.IsVisible);
        ImGui.CheckboxFlags("_IsSorted", flags, ImGui.TableColumnFlags.IsSorted);
        ImGui.CheckboxFlags("_IsHovered", flags, ImGui.TableColumnFlags.IsHovered);
    }
    function ShowDemoWindowTables() {
        //ImGui.SetNextItemOpen(true, ImGui.Cond.Once);
        IMGUI_DEMO_MARKER("Tables");
        if (!ImGui.CollapsingHeader("Tables & Columns"))
            return;
        // Using those as a base value to create width/height that are factor of the size of our font
        const TEXT_BASE_WIDTH = ImGui.CalcTextSize("A").x;
        const TEXT_BASE_HEIGHT = ImGui.GetTextLineHeightWithSpacing();
        ImGui.PushID("Tables");
        let open_action = -1;
        if (ImGui.Button("Open all"))
            open_action = 1;
        ImGui.SameLine();
        if (ImGui.Button("Close all"))
            open_action = 0;
        ImGui.SameLine();
        // Options
        const disable_indent = STATIC(UNIQUE("disable_indent#c1aad831"), false);
        ImGui.Checkbox("Disable tree indentation", disable_indent.access);
        ImGui.SameLine();
        HelpMarker("Disable the indenting of tree nodes so demo tables can use the full window width.");
        ImGui.Separator();
        if (disable_indent.value)
            ImGui.PushStyleVar(ImGui.StyleVar.IndentSpacing, 0.0);
        // About Styling of tables
        // Most settings are configured on a per-table basis via the flags passed to BeginTable() and TableSetupColumns APIs.
        // There are however a few settings that a shared and part of the ImGui.Style structure:
        //   style.CellPadding                          // Padding within each cell
        //   style.Colors[ImGui.Col.TableHeaderBg]       // Table header background
        //   style.Colors[ImGui.Col.TableBorderStrong]   // Table outer and header borders
        //   style.Colors[ImGui.Col.TableBorderLight]    // Table inner borders
        //   style.Colors[ImGui.Col.TableRowBg]          // Table row background when ImGui.TableFlags.RowBg is enabled (even rows)
        //   style.Colors[ImGui.Col.TableRowBgAlt]       // Table row background when ImGui.TableFlags.RowBg is enabled (odds rows)
        // Demos
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Basic");
        if (ImGui.TreeNode("Basic")) {
            // Here we will showcase three different ways to output a table.
            // They are very simple variations of a same thing!
            // [Method 1] Using TableNextRow() to create a new row, and TableSetColumnIndex() to select the column.
            // In many situations, this is the most flexible and easy to use pattern.
            HelpMarker("Using TableNextRow() + calling TableSetColumnIndex() _before_ each cell, in a loop.");
            if (ImGui.BeginTable("table1", 3)) {
                for (let row = 0; row < 4; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Row${row} Column ${column}`);
                    }
                }
                ImGui.EndTable();
            }
            // [Method 2] Using TableNextColumn() called multiple times, instead of using a for loop + TableSetColumnIndex().
            // This is generally more convenient when you have code manually submitting the contents of each columns.
            HelpMarker("Using TableNextRow() + calling TableNextColumn() _before_ each cell, manually.");
            if (ImGui.BeginTable("table2", 3)) {
                for (let row = 0; row < 4; row++) {
                    ImGui.TableNextRow();
                    ImGui.TableNextColumn();
                    ImGui.Text(`Row ${row}`);
                    ImGui.TableNextColumn();
                    ImGui.Text("Some contents");
                    ImGui.TableNextColumn();
                    ImGui.Text("123.456");
                }
                ImGui.EndTable();
            }
            // [Method 3] We call TableNextColumn() _before_ each cell. We never call TableNextRow(),
            // as TableNextColumn() will automatically wrap around and create new roes as needed.
            // This is generally more convenient when your cells all contains the same type of data.
            HelpMarker("Only using TableNextColumn(), which tends to be convenient for tables where every cells contains the same type of contents.\n" +
                "This is also more similar to the old NextColumn() function of the Columns API, and provided to facilitate the Columns.Tables API transition.");
            if (ImGui.BeginTable("table3", 3)) {
                for (let item = 0; item < 14; item++) {
                    ImGui.TableNextColumn();
                    ImGui.Text(`Item ${item}`);
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Borders, background");
        if (ImGui.TreeNode("Borders, background")) {
            // Expose a few Borders related flags interactively
            let ContentsType;
            (function (ContentsType) {
                ContentsType[ContentsType["Text"] = 0] = "Text";
                ContentsType[ContentsType["FillButton"] = 1] = "FillButton";
            })(ContentsType || (ContentsType = {}));
            ;
            const flags = STATIC(UNIQUE("flags#29dd6b7c"), ImGui.TableFlags.Borders | ImGui.TableFlags.RowBg);
            ;
            const display_headers = STATIC(UNIQUE("display_headers#80ef45b5"), false);
            ;
            const contents_type = STATIC(UNIQUE("contents_type#c4347904"), ContentsType.Text);
            ;
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.RowBg", flags.access, ImGui.TableFlags.RowBg);
            ImGui.CheckboxFlags("ImGui.TableFlags.Borders", flags.access, ImGui.TableFlags.Borders);
            ImGui.SameLine();
            HelpMarker("ImGui.TableFlags.Borders\n = ImGui.TableFlags.BordersInnerV\n | ImGui.TableFlags.BordersOuterV\n | ImGui.TableFlags.BordersInnerV\n | ImGui.TableFlags.BordersOuterH");
            ImGui.Indent();
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersH", flags.access, ImGui.TableFlags.BordersH);
            ImGui.Indent();
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterH", flags.access, ImGui.TableFlags.BordersOuterH);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerH", flags.access, ImGui.TableFlags.BordersInnerH);
            ImGui.Unindent();
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersV", flags.access, ImGui.TableFlags.BordersV);
            ImGui.Indent();
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterV", flags.access, ImGui.TableFlags.BordersOuterV);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerV", flags.access, ImGui.TableFlags.BordersInnerV);
            ImGui.Unindent();
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuter", flags.access, ImGui.TableFlags.BordersOuter);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInner", flags.access, ImGui.TableFlags.BordersInner);
            ImGui.Unindent();
            ImGui.AlignTextToFramePadding();
            ImGui.Text("Cell contents:");
            ImGui.SameLine();
            ImGui.RadioButton("Text", contents_type.access, ContentsType.Text);
            ImGui.SameLine();
            ImGui.RadioButton("FillButton", contents_type.access, ContentsType.FillButton);
            ImGui.Checkbox("Display headers", display_headers.access);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBody", flags.access, ImGui.TableFlags.NoBordersInBody);
            ImGui.SameLine();
            HelpMarker("Disable vertical borders in columns Body (borders will always appears in Headers");
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 3, flags.value)) {
                // Display headers so we can inspect their interaction with borders.
                // (Headers are not the main purpose of this section of the demo, so we are not elaborating on them too much. See other sections for details)
                if (display_headers.value) {
                    ImGui.TableSetupColumn("One");
                    ImGui.TableSetupColumn("Two");
                    ImGui.TableSetupColumn("Three");
                    ImGui.TableHeadersRow();
                }
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        const buf = `Hello ${column},${row}`;
                        if (contents_type.value === ContentsType.Text)
                            ImGui.TextUnformatted(buf);
                        else if (contents_type)
                            ImGui.Button(buf, new ImGui.Vec2(-FLT_MIN, 0.0));
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Resizable, stretch");
        if (ImGui.TreeNode("Resizable, stretch")) {
            // By default, if we don't enable ScrollX the sizing policy for each columns is "Stretch"
            // Each columns maintain a sizing weight, and they will occupy all available width.
            const flags = STATIC(UNIQUE("flags#204c8ade"), ImGui.TableFlags.SizingStretchSame | ImGui.TableFlags.Resizable | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV | ImGui.TableFlags.ContextMenuInBody);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersV", flags.access, ImGui.TableFlags.BordersV);
            ImGui.SameLine();
            HelpMarker("Using the _Resizable flag automatically enables the _BordersInnerV flag as well, this is why the resize borders are still showing when unchecking this.");
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 3, flags.value)) {
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Hello ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Resizable, fixed");
        if (ImGui.TreeNode("Resizable, fixed")) {
            // Here we use ImGui.TableFlags.SizingFixedFit (even though _ScrollX is not set)
            // So columns will adopt the "Fixed" policy and will maintain a fixed width regardless of the whole available width (unless table is small)
            // If there is not enough available width to fit all columns, they will however be resized down.
            // FIXME-TABLE: Providing a stretch-on-init would make sense especially for tables which don't have saved settings
            HelpMarker("Using _Resizable + _SizingFixedFit flags.\n" +
                "Fixed-width columns generally makes more sense if you want to use horizontal scrolling.\n\n" +
                "Double-click a column border to auto-fit the column to its contents.");
            PushStyleCompact();
            const flags = STATIC(UNIQUE("flags#5fc5ad75"), ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.Resizable | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV | ImGui.TableFlags.ContextMenuInBody);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendX", flags.access, ImGui.TableFlags.NoHostExtendX);
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 3, flags.value)) {
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Hello ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Resizable, mixed");
        if (ImGui.TreeNode("Resizable, mixed")) {
            HelpMarker("Using TableSetupColumn() to alter resizing policy on a per-column basis.\n\n" +
                "When combining Fixed and Stretch columns, generally you only want one, maybe two trailing columns to use _WidthStretch.");
            const flags = STATIC(UNIQUE("flags#271b5094"), ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.RowBg | ImGui.TableFlags.Borders | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable);
            if (ImGui.BeginTable("table1", 3, flags.value)) {
                ImGui.TableSetupColumn("AAA", ImGui.TableColumnFlags.WidthFixed);
                ImGui.TableSetupColumn("BBB", ImGui.TableColumnFlags.WidthFixed);
                ImGui.TableSetupColumn("CCC", ImGui.TableColumnFlags.WidthStretch);
                ImGui.TableHeadersRow();
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`${(column === 2) ? "Stretch" : "Fixed"} ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            if (ImGui.BeginTable("table2", 6, flags.value)) {
                ImGui.TableSetupColumn("AAA", ImGui.TableColumnFlags.WidthFixed);
                ImGui.TableSetupColumn("BBB", ImGui.TableColumnFlags.WidthFixed);
                ImGui.TableSetupColumn("CCC", ImGui.TableColumnFlags.WidthFixed | ImGui.TableColumnFlags.DefaultHide);
                ImGui.TableSetupColumn("DDD", ImGui.TableColumnFlags.WidthStretch);
                ImGui.TableSetupColumn("EEE", ImGui.TableColumnFlags.WidthStretch);
                ImGui.TableSetupColumn("FFF", ImGui.TableColumnFlags.WidthStretch | ImGui.TableColumnFlags.DefaultHide);
                ImGui.TableHeadersRow();
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 6; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`${(column >= 3) ? "Stretch" : "Fixed"} ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Reorderable, hideable, with headers");
        if (ImGui.TreeNode("Reorderable, hideable, with headers")) {
            HelpMarker("Click and drag column headers to reorder columns.\n\n" +
                "Right-click on a header to open a context menu.");
            const flags = STATIC(UNIQUE("flags#6780bbbd"), ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.Reorderable", flags.access, ImGui.TableFlags.Reorderable);
            ImGui.CheckboxFlags("ImGui.TableFlags.Hideable", flags.access, ImGui.TableFlags.Hideable);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBody", flags.access, ImGui.TableFlags.NoBordersInBody);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBodyUntilResize", flags.access, ImGui.TableFlags.NoBordersInBodyUntilResize);
            ImGui.SameLine();
            HelpMarker("Disable vertical borders in columns Body until hovered for resize (borders will always appears in Headers)");
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 3, flags.value)) {
                // Submit columns name with TableSetupColumn() and call TableHeadersRow() to create a row with a header in each column.
                // (Later we will show how TableSetupColumn() has other uses, optional flags, sizing weight etc.)
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableHeadersRow();
                for (let row = 0; row < 6; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Hello ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            // Use outer_size.x === 0.0 instead of default to make the table as tight as possible (only valid when no scrolling and no stretch column)
            if (ImGui.BeginTable("table2", 3, flags.value | ImGui.TableFlags.SizingFixedFit, new ImGui.Vec2(0.0, 0.0))) {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableHeadersRow();
                for (let row = 0; row < 6; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Fixed ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Padding");
        if (ImGui.TreeNode("Padding")) {
            // First example: showcase use of padding flags and effect of BorderOuterV/BorderInnerV on X padding.
            // We don't expose BorderOuterH/BorderInnerH here because they have no effect on X padding.
            HelpMarker("We often want outer padding activated when any using features which makes the edges of a column visible:\n" +
                "e.g.:\n" +
                "- BorderOuterV\n" +
                "- any form of row selection\n" +
                "Because of this, activating BorderOuterV sets the default to PadOuterX. Using PadOuterX or NoPadOuterX you can override the default.\n\n" +
                "Actual padding values are using style.CellPadding.\n\n" +
                "In this demo we don't show horizontal borders to emphasis how they don't affect default horizontal padding.");
            const flags1 = STATIC(UNIQUE("flags1#084b00f5"), ImGui.TableFlags.BordersV);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.PadOuterX", flags1.access, ImGui.TableFlags.PadOuterX);
            ImGui.SameLine();
            HelpMarker("Enable outer-most padding (default if ImGui.TableFlags.BordersOuterV is set)");
            ImGui.CheckboxFlags("ImGui.TableFlags.NoPadOuterX", flags1.access, ImGui.TableFlags.NoPadOuterX);
            ImGui.SameLine();
            HelpMarker("Disable outer-most padding (default if ImGui.TableFlags.BordersOuterV is not set)");
            ImGui.CheckboxFlags("ImGui.TableFlags.NoPadInnerX", flags1.access, ImGui.TableFlags.NoPadInnerX);
            ImGui.SameLine();
            HelpMarker("Disable inner padding between columns (double inner padding if BordersOuterV is on, single inner padding if BordersOuterV is off)");
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterV", flags1.access, ImGui.TableFlags.BordersOuterV);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerV", flags1.access, ImGui.TableFlags.BordersInnerV);
            const show_headers = STATIC(UNIQUE("show_headers#81045819"), false);
            ImGui.Checkbox("show_headers", show_headers.access);
            PopStyleCompact();
            if (ImGui.BeginTable("table_padding", 3, flags1.value)) {
                if (show_headers.value) {
                    ImGui.TableSetupColumn("One");
                    ImGui.TableSetupColumn("Two");
                    ImGui.TableSetupColumn("Three");
                    ImGui.TableHeadersRow();
                }
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        if (row === 0) {
                            ImGui.Text(`Avail ${ImGui.GetContentRegionAvail().x.toFixed(2)}`);
                        }
                        else {
                            const buf = `Hello ${column},${row}`;
                            ImGui.Button(buf, new ImGui.Vec2(-FLT_MIN, 0.0));
                        }
                        //if (ImGui.TableGetColumnFlags() & ImGui.TableColumnFlags.IsHovered)
                        //    ImGui.TableSetBgColor(ImGui.TableBgTarget.CellBg, ImGui.COL32(0, 100, 0, 255));
                    }
                }
                ImGui.EndTable();
            }
            // Second example: set style.CellPadding to (0.0) or a custom value.
            // FIXME-TABLE: Vertical border effectively not displayed the same way as horizontal one...
            HelpMarker("Setting style.CellPadding to (0,0) or a custom value.");
            const flags2 = STATIC(UNIQUE("flags2#0342b569"), ImGui.TableFlags.Borders | ImGui.TableFlags.RowBg);
            const cell_padding = STATIC(UNIQUE("cell_padding#6fe05f4a"), new ImGui.Vec2(0.0, 0.0));
            const show_widget_frame_bg = STATIC(UNIQUE("show_widget_frame_bg#e73de326"), true);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Borders", flags2.access, ImGui.TableFlags.Borders);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersH", flags2.access, ImGui.TableFlags.BordersH);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersV", flags2.access, ImGui.TableFlags.BordersV);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInner", flags2.access, ImGui.TableFlags.BordersInner);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuter", flags2.access, ImGui.TableFlags.BordersOuter);
            ImGui.CheckboxFlags("ImGui.TableFlags.RowBg", flags2.access, ImGui.TableFlags.RowBg);
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags2.access, ImGui.TableFlags.Resizable);
            ImGui.Checkbox("show_widget_frame_bg", show_widget_frame_bg.access);
            ImGui.SliderFloat2("CellPadding", cell_padding.value, 0.0, 10.0, "%.0f");
            PopStyleCompact();
            ImGui.PushStyleVar(ImGui.StyleVar.CellPadding, cell_padding.value);
            if (ImGui.BeginTable("table_padding_2", 3, flags2.value)) {
                const text_bufs = STATIC_ARRAY(15, UNIQUE("text_bufs#03f56cb5"), []); // Mini text storage for 3x5 cells
                const init = STATIC(UNIQUE("init#700ff3c9"), true);
                if (!show_widget_frame_bg.value)
                    ImGui.PushStyleColor(ImGui.Col.FrameBg, 0);
                for (let cell = 0; cell < 3 * 5; cell++) {
                    ImGui.TableNextColumn();
                    if (init.value)
                        text_bufs.value[cell] = new ImGui.StringBuffer(16, "edit me");
                    ImGui.SetNextItemWidth(-FLT_MIN);
                    ImGui.PushID(cell);
                    ImGui.InputText("##cell", text_bufs.value[cell], ImGui.ARRAYSIZE(text_bufs.value[cell]));
                    ImGui.PopID();
                }
                if (!show_widget_frame_bg.value)
                    ImGui.PopStyleColor();
                init.value = false;
                ImGui.EndTable();
            }
            ImGui.PopStyleVar();
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Explicit widths");
        if (ImGui.TreeNode("Sizing policies")) {
            const flags1 = STATIC(UNIQUE("flags1#0995c208"), ImGui.TableFlags.BordersV | ImGui.TableFlags.BordersOuterH | ImGui.TableFlags.RowBg | ImGui.TableFlags.ContextMenuInBody);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags1.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendX", flags1.access, ImGui.TableFlags.NoHostExtendX);
            PopStyleCompact();
            const sizing_policy_flags = STATIC_ARRAY(4, UNIQUE("sizing_policy_flags#267f2d77"), [ImGui.TableFlags.SizingFixedFit, ImGui.TableFlags.SizingFixedSame, ImGui.TableFlags.SizingStretchProp, ImGui.TableFlags.SizingStretchSame]);
            for (let table_n = 0; table_n < 4; table_n++) {
                ImGui.PushID(table_n);
                ImGui.SetNextItemWidth(TEXT_BASE_WIDTH * 30);
                EditTableSizingFlags(sizing_policy_flags.access(table_n));
                // To make it easier to understand the different sizing policy,
                // For each policy: we display one table where the columns have equal contents width, and one where the columns have different contents width.
                if (ImGui.BeginTable("table1", 3, sizing_policy_flags.value[table_n] | flags1.value)) {
                    for (let row = 0; row < 3; row++) {
                        ImGui.TableNextRow();
                        ImGui.TableNextColumn();
                        ImGui.Text("Oh dear");
                        ImGui.TableNextColumn();
                        ImGui.Text("Oh dear");
                        ImGui.TableNextColumn();
                        ImGui.Text("Oh dear");
                    }
                    ImGui.EndTable();
                }
                if (ImGui.BeginTable("table2", 3, sizing_policy_flags.value[table_n] | flags1.value)) {
                    for (let row = 0; row < 3; row++) {
                        ImGui.TableNextRow();
                        ImGui.TableNextColumn();
                        ImGui.Text("AAAA");
                        ImGui.TableNextColumn();
                        ImGui.Text("BBBBBBBB");
                        ImGui.TableNextColumn();
                        ImGui.Text("CCCCCCCCCCCC");
                    }
                    ImGui.EndTable();
                }
                ImGui.PopID();
            }
            ImGui.Spacing();
            ImGui.TextUnformatted("Advanced");
            ImGui.SameLine();
            HelpMarker("This section allows you to interact and see the effect of various sizing policies depending on whether Scroll is enabled and the contents of your columns.");
            let ContentsType;
            (function (ContentsType) {
                ContentsType[ContentsType["ShowWidth"] = 0] = "ShowWidth";
                ContentsType[ContentsType["ShortText"] = 1] = "ShortText";
                ContentsType[ContentsType["LongText"] = 2] = "LongText";
                ContentsType[ContentsType["Button"] = 3] = "Button";
                ContentsType[ContentsType["FillButton"] = 4] = "FillButton";
                ContentsType[ContentsType["InputText"] = 5] = "InputText";
            })(ContentsType || (ContentsType = {}));
            ;
            const flags = STATIC(UNIQUE("flags#b8d0337b"), ImGui.TableFlags.ScrollY | ImGui.TableFlags.Borders | ImGui.TableFlags.RowBg | ImGui.TableFlags.Resizable);
            const contents_type = STATIC(UNIQUE("contents_type#111b0589"), ContentsType.ShowWidth);
            const column_count = STATIC(UNIQUE("column_count#5addc0e0"), 3);
            PushStyleCompact();
            ImGui.PushID("Advanced");
            ImGui.PushItemWidth(TEXT_BASE_WIDTH * 30);
            EditTableSizingFlags(flags.access);
            ImGui.Combo("Contents", contents_type.access, "Show width\0Short Text\0Long Text\0Button\0Fill Button\0InputText\0");
            if (contents_type.value === ContentsType.FillButton) {
                ImGui.SameLine();
                HelpMarker("Be mindful that using right-alignment (e.g. size.x = -FLT_MIN) creates a feedback loop where contents width can feed into auto-column width can feed into contents width.");
            }
            ImGui.DragInt("Columns", column_count.access, 0.1, 1, 64, "%d", ImGui.SliderFlags.AlwaysClamp);
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.PreciseWidths", flags.access, ImGui.TableFlags.PreciseWidths);
            ImGui.SameLine();
            HelpMarker("Disable distributing remainder width to stretched columns (width allocation on a 100-wide table with 3 columns: Without this flag: 33,33,34. With this flag: 33,33,33). With larger number of columns, resizing will appear to be less smooth.");
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollX", flags.access, ImGui.TableFlags.ScrollX);
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollY", flags.access, ImGui.TableFlags.ScrollY);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoClip", flags.access, ImGui.TableFlags.NoClip);
            ImGui.PopItemWidth();
            ImGui.PopID();
            PopStyleCompact();
            if (ImGui.BeginTable("table2", column_count.value, flags.value, new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 7))) {
                for (let cell = 0; cell < 10 * column_count.value; cell++) {
                    ImGui.TableNextColumn();
                    let column = ImGui.TableGetColumnIndex();
                    let row = ImGui.TableGetRowIndex();
                    ImGui.PushID(cell);
                    const text_buf = STATIC(UNIQUE("text_buf#0dfe49db"), new ImGui.StringBuffer(32, ""));
                    const label = `Hello ${column},${row}`;
                    switch (contents_type.value) {
                        case ContentsType.ShortText:
                            ImGui.TextUnformatted(label);
                            break;
                        case ContentsType.LongText:
                            ImGui.Text(`Some ${column === 0 ? "long" : "longeeer"} text ${column},${row}\nOver two lines..`);
                            break;
                        case ContentsType.ShowWidth:
                            ImGui.Text(`W: ${ImGui.GetContentRegionAvail().x.toFixed(1)}`);
                            break;
                        case ContentsType.Button:
                            ImGui.Button(label);
                            break;
                        case ContentsType.FillButton:
                            ImGui.Button(label, new ImGui.Vec2(-FLT_MIN, 0.0));
                            break;
                        case ContentsType.InputText:
                            ImGui.SetNextItemWidth(-FLT_MIN);
                            ImGui.InputText("##", text_buf.value, ImGui.ARRAYSIZE(text_buf.value));
                            break;
                    }
                    ImGui.PopID();
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Vertical scrolling, with clipping");
        if (ImGui.TreeNode("Vertical scrolling, with clipping")) {
            HelpMarker("Here we activate ScrollY, which will create a child window container to allow hosting scrollable contents.\n\nWe also demonstrate using ImGui.ListClipper to virtualize the submission of many items.");
            const flags = STATIC(UNIQUE("flags#08f143ef"), ImGui.TableFlags.ScrollY | ImGui.TableFlags.RowBg | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollY", flags.access, ImGui.TableFlags.ScrollY);
            PopStyleCompact();
            // When using ScrollX or ScrollY we need to specify a size for our table container!
            // Otherwise by default the table will fit all available space, like a BeginChild() call.
            const outer_size = new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 8);
            if (ImGui.BeginTable("table_scrolly", 3, flags.value, outer_size)) {
                ImGui.TableSetupScrollFreeze(0, 1); // Make top row always visible
                ImGui.TableSetupColumn("One", ImGui.TableColumnFlags.None);
                ImGui.TableSetupColumn("Two", ImGui.TableColumnFlags.None);
                ImGui.TableSetupColumn("Three", ImGui.TableColumnFlags.None);
                ImGui.TableHeadersRow();
                // Demonstrate using clipper for large vertical lists
                const clipper = new ImGui.ListClipper();
                clipper.Begin(1000);
                while (clipper.Step()) {
                    for (let row = clipper.DisplayStart; row < clipper.DisplayEnd; row++) {
                        ImGui.TableNextRow();
                        for (let column = 0; column < 3; column++) {
                            ImGui.TableSetColumnIndex(column);
                            ImGui.Text(`Hello ${column},${row}`);
                        }
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Horizontal scrolling");
        if (ImGui.TreeNode("Horizontal scrolling")) {
            HelpMarker("When ScrollX is enabled, the default sizing policy becomes ImGui.TableFlags.SizingFixedFit, " +
                "as automatically stretching columns doesn't make much sense with horizontal scrolling.\n\n" +
                "Also note that as of the current version, you will almost always want to enable ScrollY along with ScrollX," +
                "because the container window won't automatically extend vertically to fix contents (this may be improved in future versions).");
            const flags = STATIC(UNIQUE("flags#6b832a82"), ImGui.TableFlags.ScrollX | ImGui.TableFlags.ScrollY | ImGui.TableFlags.RowBg | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable);
            const freeze_cols = STATIC(UNIQUE("freeze_cols#c7b4a45c"), 1);
            const freeze_rows = STATIC(UNIQUE("freeze_rows#c1f6ac3c"), 1);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollX", flags.access, ImGui.TableFlags.ScrollX);
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollY", flags.access, ImGui.TableFlags.ScrollY);
            ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
            ImGui.DragInt("freeze_cols", freeze_cols.access, 0.2, 0, 9, undefined, ImGui.SliderFlags.NoInput);
            ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
            ImGui.DragInt("freeze_rows", freeze_rows.access, 0.2, 0, 9, undefined, ImGui.SliderFlags.NoInput);
            PopStyleCompact();
            // When using ScrollX or ScrollY we need to specify a size for our table container!
            // Otherwise by default the table will fit all available space, like a BeginChild() call.
            const outer_size = new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 8);
            if (ImGui.BeginTable("table_scrollx", 7, flags.value, outer_size)) {
                ImGui.TableSetupScrollFreeze(freeze_cols.value, freeze_rows.value);
                ImGui.TableSetupColumn("Line #", ImGui.TableColumnFlags.NoHide); // Make the first column not hideable to match our use of TableSetupScrollFreeze()
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableSetupColumn("Four");
                ImGui.TableSetupColumn("Five");
                ImGui.TableSetupColumn("Six");
                ImGui.TableHeadersRow();
                for (let row = 0; row < 20; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 7; column++) {
                        // Both TableNextColumn() and TableSetColumnIndex() return true when a column is visible or performing width measurement.
                        // Because here we know that:
                        // - A) all our columns are contributing the same to row height
                        // - B) column 0 is always visible,
                        // We only always submit this one column and can skip others.
                        // More advanced per-column clipping behaviors may benefit from polling the status flags via TableGetColumnFlags().
                        if (!ImGui.TableSetColumnIndex(column) && column > 0)
                            continue;
                        if (column === 0)
                            ImGui.Text(`Line ${row}`);
                        else
                            ImGui.Text(`Hello world ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.Spacing();
            ImGui.TextUnformatted("Stretch + ScrollX");
            ImGui.SameLine();
            HelpMarker("Showcase using Stretch columns + ScrollX together: " +
                "this is rather unusual and only makes sense when specifying an 'inner_width' for the table!\n" +
                "Without an explicit value, inner_width is === outer_size.x and therefore using Stretch columns + ScrollX together doesn't make sense.");
            const flags2 = STATIC(UNIQUE("flags2#b064ce05"), ImGui.TableFlags.SizingStretchSame | ImGui.TableFlags.ScrollX | ImGui.TableFlags.ScrollY | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.RowBg | ImGui.TableFlags.ContextMenuInBody);
            const inner_width = STATIC(UNIQUE("inner_width#302db547"), 1000.0);
            PushStyleCompact();
            ImGui.PushID("flags3");
            ImGui.PushItemWidth(TEXT_BASE_WIDTH * 30);
            ImGui.CheckboxFlags("ImGui.TableFlags.ScrollX", flags2.access, ImGui.TableFlags.ScrollX);
            ImGui.DragFloat("inner_width", inner_width.access, 1.0, 0.0, FLT_MAX, "%.1f");
            ImGui.PopItemWidth();
            ImGui.PopID();
            PopStyleCompact();
            if (ImGui.BeginTable("table2", 7, flags2.value, outer_size, inner_width.value)) {
                for (let cell = 0; cell < 20 * 7; cell++) {
                    ImGui.TableNextColumn();
                    ImGui.Text(`Hello world ${ImGui.TableGetColumnIndex()},${ImGui.TableGetRowIndex()}`);
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Columns flags");
        if (ImGui.TreeNode("Columns flags")) {
            // Create a first table just to show all the options/flags we want to make visible in our example!
            const column_count = 3;
            const column_names = ["One", "Two", "Three"];
            const column_flags = STATIC_ARRAY(3 /*column_count*/, UNIQUE("column_flags#9148a987"), [ImGui.TableColumnFlags.DefaultSort, ImGui.TableColumnFlags.None, ImGui.TableColumnFlags.DefaultHide]);
            const column_flags_out = STATIC_ARRAY(3 /*column_count*/, UNIQUE("column_flags_out#7293d59a"), [0, 0, 0]); // Output from TableGetColumnFlags();
            if (ImGui.BeginTable("table_columns_flags_checkboxes", column_count, ImGui.TableFlags.None)) {
                PushStyleCompact();
                for (let column = 0; column < column_count; column++) {
                    ImGui.TableNextColumn();
                    ImGui.PushID(column);
                    ImGui.AlignTextToFramePadding(); // FIXME-TABLE: Workaround for wrong text baseline propagation
                    ImGui.Text(`'${column_names[column]}'`);
                    ImGui.Spacing();
                    ImGui.Text("Input flags:");
                    EditTableColumnsFlags(column_flags.access(column));
                    ImGui.Spacing();
                    ImGui.Text("Output flags:");
                    ShowTableColumnsStatusFlags(column_flags_out.access(column));
                    ImGui.PopID();
                }
                PopStyleCompact();
                ImGui.EndTable();
            }
            // Create the real table we care about for the example!
            // We use a scrolling table to be able to showcase the difference between the _IsEnabled and _IsVisible flags above, otherwise in
            // a non-scrolling table columns are always visible (unless using ImGui.TableFlags.NoKeepColumnsVisible + resizing the parent window down)
            const flags = ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.ScrollX | ImGui.TableFlags.ScrollY
                | ImGui.TableFlags.RowBg | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV
                | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.Sortable;
            const outer_size = new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 9);
            if (ImGui.BeginTable("table_columns_flags", column_count, flags, outer_size)) {
                for (let column = 0; column < column_count; column++)
                    ImGui.TableSetupColumn(column_names[column], column_flags.value[column]);
                ImGui.TableHeadersRow();
                for (let column = 0; column < column_count; column++)
                    column_flags_out.value[column] = ImGui.TableGetColumnFlags(column);
                const indent_step = Math.floor /*(float)*/(/*(int)*/ TEXT_BASE_WIDTH / 2);
                for (let row = 0; row < 8; row++) {
                    ImGui.Indent(indent_step); // Add some indentation to demonstrate usage of per-column IndentEnable/IndentDisable flags.
                    ImGui.TableNextRow();
                    for (let column = 0; column < column_count; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`${(column === 0) ? "Indented" : "Hello"} ${ImGui.TableGetColumnName(column)}`);
                    }
                }
                ImGui.Unindent(indent_step * 8.0);
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Columns widths");
        if (ImGui.TreeNode("Columns widths")) {
            HelpMarker("Using TableSetupColumn() to setup default width.");
            const flags1 = STATIC(UNIQUE("flags1#5b97faa3"), ImGui.TableFlags.Borders | ImGui.TableFlags.NoBordersInBodyUntilResize);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags1.access, ImGui.TableFlags.Resizable);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBodyUntilResize", flags1.access, ImGui.TableFlags.NoBordersInBodyUntilResize);
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 3, flags1.value)) {
                // We could also set ImGui.TableFlags.SizingFixedFit on the table and all columns will default to ImGui.TableColumnFlags.WidthFixed.
                ImGui.TableSetupColumn("one", ImGui.TableColumnFlags.WidthFixed, 100.0); // Default to 100.0
                ImGui.TableSetupColumn("two", ImGui.TableColumnFlags.WidthFixed, 200.0); // Default to 200.0
                ImGui.TableSetupColumn("three", ImGui.TableColumnFlags.WidthFixed); // Default to auto
                ImGui.TableHeadersRow();
                for (let row = 0; row < 4; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableSetColumnIndex(column);
                        if (row === 0)
                            ImGui.Text(`(w: ${ImGui.GetContentRegionAvail().x.toFixed(1)})`);
                        else
                            ImGui.Text(`Hello ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            HelpMarker("Using TableSetupColumn() to setup explicit width.\n\nUnless _NoKeepColumnsVisible is set, fixed columns with set width may still be shrunk down if there's not enough space in the host.");
            const flags2 = STATIC(UNIQUE("flags2#6b46a921"), ImGui.TableFlags.None);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.NoKeepColumnsVisible", flags2.access, ImGui.TableFlags.NoKeepColumnsVisible);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerV", flags2.access, ImGui.TableFlags.BordersInnerV);
            ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterV", flags2.access, ImGui.TableFlags.BordersOuterV);
            PopStyleCompact();
            if (ImGui.BeginTable("table2", 4, flags2.value)) {
                // We could also set ImGui.TableFlags.SizingFixedFit on the table and all columns will default to ImGui.TableColumnFlags.WidthFixed.
                ImGui.TableSetupColumn("", ImGui.TableColumnFlags.WidthFixed, 100.0);
                ImGui.TableSetupColumn("", ImGui.TableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 15.0);
                ImGui.TableSetupColumn("", ImGui.TableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 30.0);
                ImGui.TableSetupColumn("", ImGui.TableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 15.0);
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 4; column++) {
                        ImGui.TableSetColumnIndex(column);
                        if (row === 0)
                            ImGui.Text(`(w: ${ImGui.GetContentRegionAvail().x.toFixed(1)})`);
                        else
                            ImGui.Text(`Hello ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Nested tables");
        if (ImGui.TreeNode("Nested tables")) {
            HelpMarker("This demonstrate embedding a table into another table cell.");
            if (ImGui.BeginTable("table_nested1", 2, ImGui.TableFlags.Borders | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable)) {
                ImGui.TableSetupColumn("A0");
                ImGui.TableSetupColumn("A1");
                ImGui.TableHeadersRow();
                ImGui.TableNextColumn();
                ImGui.Text("A0 Row 0");
                {
                    const rows_height = TEXT_BASE_HEIGHT * 2;
                    if (ImGui.BeginTable("table_nested2", 2, ImGui.TableFlags.Borders | ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable)) {
                        ImGui.TableSetupColumn("B0");
                        ImGui.TableSetupColumn("B1");
                        ImGui.TableHeadersRow();
                        ImGui.TableNextRow(ImGui.TableRowFlags.None, rows_height);
                        ImGui.TableNextColumn();
                        ImGui.Text("B0 Row 0");
                        ImGui.TableNextColumn();
                        ImGui.Text("B1 Row 0");
                        ImGui.TableNextRow(ImGui.TableRowFlags.None, rows_height);
                        ImGui.TableNextColumn();
                        ImGui.Text("B0 Row 1");
                        ImGui.TableNextColumn();
                        ImGui.Text("B1 Row 1");
                        ImGui.EndTable();
                    }
                }
                ImGui.TableNextColumn();
                ImGui.Text("A1 Row 0");
                ImGui.TableNextColumn();
                ImGui.Text("A0 Row 1");
                ImGui.TableNextColumn();
                ImGui.Text("A1 Row 1");
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Row height");
        if (ImGui.TreeNode("Row height")) {
            HelpMarker("You can pass a 'min_row_height' to TableNextRow().\n\nRows are padded with 'style.CellPadding.y' on top and bottom, so effectively the minimum row height will always be >= 'style.CellPadding.y * 2.0'.\n\nWe cannot honor a _maximum_ row height as that would requires a unique clipping rectangle per row.");
            if (ImGui.BeginTable("table_row_height", 1, ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersInnerV)) {
                for (let row = 0; row < 10; row++) {
                    const min_row_height = Math.floor /*(float)(int)*/(TEXT_BASE_HEIGHT * 0.30 * row);
                    ImGui.TableNextRow(ImGui.TableRowFlags.None, min_row_height);
                    ImGui.TableNextColumn();
                    ImGui.Text(`min_row_height = ${min_row_height.toFixed(2)}`);
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Outer size");
        if (ImGui.TreeNode("Outer size")) {
            // Showcasing use of ImGui.TableFlags.NoHostExtendX and ImGui.TableFlags.NoHostExtendY
            // Important to that note how the two flags have slightly different behaviors!
            ImGui.Text("Using NoHostExtendX and NoHostExtendY:");
            PushStyleCompact();
            const flags = STATIC(UNIQUE("flags#f399c82a"), ImGui.TableFlags.Borders | ImGui.TableFlags.Resizable | ImGui.TableFlags.ContextMenuInBody | ImGui.TableFlags.RowBg | ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.NoHostExtendX);
            ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendX", flags.access, ImGui.TableFlags.NoHostExtendX);
            ImGui.SameLine();
            HelpMarker("Make outer width auto-fit to columns, overriding outer_size.x value.\n\nOnly available when ScrollX/ScrollY are disabled and Stretch columns are not used.");
            ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendY", flags.access, ImGui.TableFlags.NoHostExtendY);
            ImGui.SameLine();
            HelpMarker("Make outer height stop exactly at outer_size.y (prevent auto-extending table past the limit).\n\nOnly available when ScrollX/ScrollY are disabled. Data below the limit will be clipped and not visible.");
            PopStyleCompact();
            const outer_size = new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 5.5);
            if (ImGui.BeginTable("table1", 3, flags.value, outer_size)) {
                for (let row = 0; row < 10; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableNextColumn();
                        ImGui.Text(`Cell ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.SameLine();
            ImGui.Text("Hello!");
            ImGui.Spacing();
            ImGui.Text("Using explicit size:");
            if (ImGui.BeginTable("table2", 3, ImGui.TableFlags.Borders | ImGui.TableFlags.RowBg, new ImGui.Vec2(TEXT_BASE_WIDTH * 30, 0.0))) {
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableNextColumn();
                        ImGui.Text(`Cell ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.SameLine();
            if (ImGui.BeginTable("table3", 3, ImGui.TableFlags.Borders | ImGui.TableFlags.RowBg, new ImGui.Vec2(TEXT_BASE_WIDTH * 30, 0.0))) {
                for (let row = 0; row < 3; row++) {
                    ImGui.TableNextRow(0, TEXT_BASE_HEIGHT * 1.5);
                    for (let column = 0; column < 3; column++) {
                        ImGui.TableNextColumn();
                        ImGui.Text(`Cell ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Background color");
        if (ImGui.TreeNode("Background color")) {
            const flags = STATIC(UNIQUE("flags#abb35091"), ImGui.TableFlags.RowBg);
            const row_bg_type = STATIC(UNIQUE("row_bg_type#72c3f368"), 1);
            const row_bg_target = STATIC(UNIQUE("row_bg_target#37a8f062"), 1);
            const cell_bg_type = STATIC(UNIQUE("cell_bg_type#4268971f"), 1);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.Borders", flags.access, ImGui.TableFlags.Borders);
            ImGui.CheckboxFlags("ImGui.TableFlags.RowBg", flags.access, ImGui.TableFlags.RowBg);
            ImGui.SameLine();
            HelpMarker("ImGui.TableFlags.RowBg automatically sets RowBg0 to alternative colors pulled from the Style.");
            ImGui.Combo("row bg type", row_bg_type.access, "None\0Red\0Gradient\0");
            ImGui.Combo("row bg target", row_bg_target.access, "RowBg0\0RowBg1\0");
            ImGui.SameLine();
            HelpMarker("Target RowBg0 to override the alternating odd/even colors,\nTarget RowBg1 to blend with them.");
            ImGui.Combo("cell bg type", cell_bg_type.access, "None\0Blue\0");
            ImGui.SameLine();
            HelpMarker("We are colorizing cells to B1.C2 here.");
            ImGui.ASSERT(row_bg_type.value >= 0 && row_bg_type.value <= 2);
            ImGui.ASSERT(row_bg_target.value >= 0 && row_bg_target.value <= 1);
            ImGui.ASSERT(cell_bg_type.value >= 0 && cell_bg_type.value <= 1);
            PopStyleCompact();
            if (ImGui.BeginTable("table1", 5, flags.value)) {
                for (let row = 0; row < 6; row++) {
                    ImGui.TableNextRow();
                    // Demonstrate setting a row background color with 'ImGui.TableSetBgColor(ImGui.TableBgTarget.RowBgX, ...)'
                    // We use a transparent color so we can see the one behind in case our target is RowBg1 and RowBg0 was already targeted by the ImGui.TableFlags.RowBg flag.
                    if (row_bg_type.value !== 0) {
                        const row_bg_color = ImGui.GetColorU32(row_bg_type.value === 1 ? new ImGui.Vec4(0.7, 0.3, 0.3, 0.65) : new ImGui.Vec4(0.2 + row * 0.1, 0.2, 0.2, 0.65)); // Flat or Gradient?
                        ImGui.TableSetBgColor(ImGui.TableBgTarget.RowBg0 + row_bg_target.value, row_bg_color);
                    }
                    // Fill cells
                    for (let column = 0; column < 5; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`${String.fromCharCode("A".charCodeAt(0) + row)}${String.fromCharCode("0".charCodeAt(0) + column)}`); // ImGui.Text("%c%c", 'A' + row, '0' + column);
                        // Change background of Cells B1.C2
                        // Demonstrate setting a cell background color with 'ImGui.TableSetBgColor(ImGui.TableBgTarget.CellBg, ...)'
                        // (the CellBg color will be blended over the RowBg and ColumnBg colors)
                        // We can also pass a column number as a third parameter to TableSetBgColor() and do this outside the column loop.
                        if (row >= 1 && row <= 2 && column >= 1 && column <= 2 && cell_bg_type.value === 1) {
                            const cell_bg_color = ImGui.GetColorU32(new ImGui.Vec4(0.3, 0.3, 0.7, 0.65));
                            ImGui.TableSetBgColor(ImGui.TableBgTarget.CellBg, cell_bg_color);
                        }
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Tree view");
        if (ImGui.TreeNode("Tree view")) {
            const flags = STATIC(UNIQUE("flags#7578e43d"), ImGui.TableFlags.BordersV | ImGui.TableFlags.BordersOuterH | ImGui.TableFlags.Resizable | ImGui.TableFlags.RowBg | ImGui.TableFlags.NoBordersInBody);
            if (ImGui.BeginTable("3ways", 3, flags.value)) {
                // The first column will use the default _WidthStretch when ScrollX is Off and _WidthFixed when ScrollX is On
                ImGui.TableSetupColumn("Name", ImGui.TableColumnFlags.NoHide);
                ImGui.TableSetupColumn("Size", ImGui.TableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 12.0);
                ImGui.TableSetupColumn("Type", ImGui.TableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 18.0);
                ImGui.TableHeadersRow();
                // Simple storage to output a dummy file-system.
                class MyTreeNode {
                    constructor(Name, Type, Size, ChildIdx, ChildCount) {
                        this.Name = Name;
                        this.Type = Type;
                        this.Size = Size;
                        this.ChildIdx = ChildIdx;
                        this.ChildCount = ChildCount;
                    }
                    static DisplayNode(node, all_nodes) {
                        ImGui.TableNextRow();
                        ImGui.TableNextColumn();
                        const is_folder = (node.ChildCount > 0);
                        if (is_folder) {
                            const open = ImGui.TreeNodeEx(node.Name, ImGui.TreeNodeFlags.SpanFullWidth);
                            ImGui.TableNextColumn();
                            ImGui.TextDisabled("--");
                            ImGui.TableNextColumn();
                            ImGui.TextUnformatted(node.Type);
                            if (open) {
                                for (let child_n = 0; child_n < node.ChildCount; child_n++)
                                    MyTreeNode.DisplayNode(all_nodes[node.ChildIdx + child_n], all_nodes);
                                ImGui.TreePop();
                            }
                        }
                        else {
                            ImGui.TreeNodeEx(node.Name, ImGui.TreeNodeFlags.Leaf | ImGui.TreeNodeFlags.Bullet | ImGui.TreeNodeFlags.NoTreePushOnOpen | ImGui.TreeNodeFlags.SpanFullWidth);
                            ImGui.TableNextColumn();
                            ImGui.Text(`${node.Size}`);
                            ImGui.TableNextColumn();
                            ImGui.TextUnformatted(node.Type);
                        }
                    }
                }
                const nodes = STATIC_ARRAY(9, UNIQUE("nodes#6181ddd1"), [
                    new MyTreeNode("Root", "Folder", -1, 1, 3),
                    new MyTreeNode("Music", "Folder", -1, 4, 2),
                    new MyTreeNode("Textures", "Folder", -1, 6, 3),
                    new MyTreeNode("desktop.ini", "System file", 1024, -1, -1),
                    new MyTreeNode("File1_a.wav", "Audio file", 123000, -1, -1),
                    new MyTreeNode("File1_b.wav", "Audio file", 456000, -1, -1),
                    new MyTreeNode("Image001.png", "Image file", 203128, -1, -1),
                    new MyTreeNode("Copy of Image001.png", "Image file", 203256, -1, -1),
                    new MyTreeNode("Copy of Image001 (Final2).png", "Image file", 203512, -1, -1), // 8
                ]);
                MyTreeNode.DisplayNode(nodes.value[0], nodes.value);
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Item width");
        if (ImGui.TreeNode("Item width")) {
            HelpMarker("Showcase using PushItemWidth() and how it is preserved on a per-column basis.\n\n" +
                "Note that on auto-resizing non-resizable fixed columns, querying the content width for e.g. right-alignment doesn't make sense.");
            if (ImGui.BeginTable("table_item_width", 3, ImGui.TableFlags.Borders)) {
                ImGui.TableSetupColumn("small");
                ImGui.TableSetupColumn("half");
                ImGui.TableSetupColumn("right-align");
                ImGui.TableHeadersRow();
                for (let row = 0; row < 3; row++) {
                    ImGui.TableNextRow();
                    if (row === 0) {
                        // Setup ItemWidth once (instead of setting up every time, which is also possible but less efficient)
                        ImGui.TableSetColumnIndex(0);
                        ImGui.PushItemWidth(TEXT_BASE_WIDTH * 3.0); // Small
                        ImGui.TableSetColumnIndex(1);
                        ImGui.PushItemWidth(-ImGui.GetContentRegionAvail().x * 0.5);
                        ImGui.TableSetColumnIndex(2);
                        ImGui.PushItemWidth(-FLT_MIN); // Right-aligned
                    }
                    // Draw our contents
                    const dummy_f = STATIC(UNIQUE("dummy_f#1c71b98f"), 0.0);
                    ImGui.PushID(row);
                    ImGui.TableSetColumnIndex(0);
                    ImGui.SliderFloat("float0", dummy_f.access, 0.0, 1.0);
                    ImGui.TableSetColumnIndex(1);
                    ImGui.SliderFloat("float1", dummy_f.access, 0.0, 1.0);
                    ImGui.TableSetColumnIndex(2);
                    ImGui.SliderFloat("float2", dummy_f.access, 0.0, 1.0);
                    ImGui.PopID();
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        // Demonstrate using TableHeader() calls instead of TableHeadersRow()
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Custom headers");
        if (ImGui.TreeNode("Custom headers")) {
            const COLUMNS_COUNT = 3;
            if (ImGui.BeginTable("table_custom_headers", COLUMNS_COUNT, ImGui.TableFlags.Borders | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable)) {
                ImGui.TableSetupColumn("Apricot");
                ImGui.TableSetupColumn("Banana");
                ImGui.TableSetupColumn("Cherry");
                // Dummy entire-column selection storage
                // FIXME: It would be nice to actually demonstrate full-featured selection using those checkbox.
                const column_selected = STATIC_ARRAY(3, UNIQUE("column_selected#4f0615be"), []);
                // Instead of calling TableHeadersRow() we'll submit custom headers ourselves
                ImGui.TableNextRow(ImGui.TableRowFlags.Headers);
                for (let column = 0; column < COLUMNS_COUNT; column++) {
                    ImGui.TableSetColumnIndex(column);
                    const column_name = ImGui.TableGetColumnName(column); // Retrieve name passed to TableSetupColumn()
                    ImGui.PushID(column);
                    ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(0, 0));
                    ImGui.Checkbox("##checkall", column_selected.access(column));
                    ImGui.PopStyleVar();
                    ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                    ImGui.TableHeader(column_name);
                    ImGui.PopID();
                }
                for (let row = 0; row < 5; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++) {
                        const buf = `Cell ${column},${row}`;
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Selectable(buf, column_selected.value[column]);
                    }
                }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        // Demonstrate creating custom context menus inside columns, while playing it nice with context menus provided by TableHeadersRow()/TableHeader()
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Context menus");
        if (ImGui.TreeNode("Context menus")) {
            HelpMarker("By default, right-clicking over a TableHeadersRow()/TableHeader() line will open the default context-menu.\nUsing ImGui.TableFlags.ContextMenuInBody we also allow right-clicking over columns body.");
            const flags1 = STATIC(UNIQUE("flags1#965b70db"), ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.Borders | ImGui.TableFlags.ContextMenuInBody);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.ContextMenuInBody", flags1.access, ImGui.TableFlags.ContextMenuInBody);
            PopStyleCompact();
            // Context Menus: first example
            // [1.1] Right-click on the TableHeadersRow() line to open the default table context menu.
            // [1.2] Right-click in columns also open the default table context menu (if ImGui.TableFlags.ContextMenuInBody is set)
            const COLUMNS_COUNT = 3;
            if (ImGui.BeginTable("table_context_menu", COLUMNS_COUNT, flags1.value)) {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                // [1.1]] Right-click on the TableHeadersRow() line to open the default table context menu.
                ImGui.TableHeadersRow();
                // Submit dummy contents
                for (let row = 0; row < 4; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < COLUMNS_COUNT; column++) {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Cell ${column},${row}`);
                    }
                }
                ImGui.EndTable();
            }
            // Context Menus: second example
            // [2.1] Right-click on the TableHeadersRow() line to open the default table context menu.
            // [2.2] Right-click on the ".." to open a custom popup
            // [2.3] Right-click in columns to open another custom popup
            HelpMarker("Demonstrate mixing table context menu (over header), item context button (over button) and custom per-colum context menu (over column body).");
            const flags2 = ImGui.TableFlags.Resizable | ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.Borders;
            if (ImGui.BeginTable("table_context_menu_2", COLUMNS_COUNT, flags2)) {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                // [2.1] Right-click on the TableHeadersRow() line to open the default table context menu.
                ImGui.TableHeadersRow();
                for (let row = 0; row < 4; row++) {
                    ImGui.TableNextRow();
                    for (let column = 0; column < COLUMNS_COUNT; column++) {
                        // Submit dummy contents
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Cell ${column},${row}`);
                        ImGui.SameLine();
                        // [2.2] Right-click on the ".." to open a custom popup
                        ImGui.PushID(row * COLUMNS_COUNT + column);
                        ImGui.SmallButton("..");
                        if (ImGui.BeginPopupContextItem()) {
                            ImGui.Text(`This is the popup for Button(\"..\") in Cell ${column},${row}`);
                            if (ImGui.Button("Close"))
                                ImGui.CloseCurrentPopup();
                            ImGui.EndPopup();
                        }
                        ImGui.PopID();
                    }
                }
                // [2.3] Right-click anywhere in columns to open another custom popup
                // (instead of testing for !IsAnyItemHovered() we could also call OpenPopup() with ImGui.PopupFlags.NoOpenOverExistingPopup
                // to manage popup priority as the popups triggers, here "are we hovering a column" are overlapping)
                let hovered_column = -1;
                for (let column = 0; column < COLUMNS_COUNT + 1; column++) {
                    ImGui.PushID(column);
                    if (ImGui.TableGetColumnFlags(column) & ImGui.TableColumnFlags.IsHovered)
                        hovered_column = column;
                    if (hovered_column === column && !ImGui.IsAnyItemHovered() && ImGui.IsMouseReleased(1))
                        ImGui.OpenPopup("MyPopup");
                    if (ImGui.BeginPopup("MyPopup")) {
                        if (column === COLUMNS_COUNT)
                            ImGui.Text("This is a custom popup for unused space after the last column.");
                        else
                            ImGui.Text(`This is a custom popup for Column ${column}`);
                        if (ImGui.Button("Close"))
                            ImGui.CloseCurrentPopup();
                        ImGui.EndPopup();
                    }
                    ImGui.PopID();
                }
                ImGui.EndTable();
                ImGui.Text(`Hovered column: ${hovered_column}`);
            }
            ImGui.TreePop();
        }
        // Demonstrate creating multiple tables with the same ID
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Synced instances");
        if (ImGui.TreeNode("Synced instances")) {
            HelpMarker("Multiple tables with the same identifier will share their settings, width, visibility, order etc.");
            for (let n = 0; n < 3; n++) {
                const buf = `Synced Table ${n}`;
                const open = ImGui.CollapsingHeader(buf, ImGui.TreeNodeFlags.DefaultOpen);
                if (open && ImGui.BeginTable("Table", 3, ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.Borders | ImGui.TableFlags.SizingFixedFit | ImGui.TableFlags.NoSavedSettings)) {
                    ImGui.TableSetupColumn("One");
                    ImGui.TableSetupColumn("Two");
                    ImGui.TableSetupColumn("Three");
                    ImGui.TableHeadersRow();
                    for (let cell = 0; cell < 9; cell++) {
                        ImGui.TableNextColumn();
                        ImGui.Text(`this cell ${cell}`);
                    }
                    ImGui.EndTable();
                }
            }
            ImGui.TreePop();
        }
        // Demonstrate using Sorting facilities
        // This is a simplified version of the "Advanced" example, where we mostly focus on the code necessary to handle sorting.
        // Note that the "Advanced" example also showcase manually triggering a sort (e.g. if item quantities have been modified)
        const template_items_names = [
            "Banana", "Apple", "Cherry", "Watermelon", "Grapefruit", "Strawberry", "Mango",
            "Kiwi", "Orange", "Pineapple", "Blueberry", "Plum", "Coconut", "Pear", "Apricot"
        ];
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Sorting");
        if (ImGui.TreeNode("Sorting")) {
            // Create item list
            const items = STATIC(UNIQUE("items#1b67a6dd"), new ImGui.Vector());
            if (items.value.Size === 0) {
                items.value.resize(50, () => new MyItem());
                for (let n = 0; n < items.value.Size; n++) {
                    const template_n = n % ImGui.ARRAYSIZE(template_items_names);
                    const item = items.value[n];
                    item.ID = n;
                    item.Name = template_items_names[template_n];
                    item.Quantity = (n * n - n) % 20; // Assign default quantities
                }
            }
            // Options
            const flags = STATIC(UNIQUE("flags#8c7e85c9"), ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable | ImGui.TableFlags.Sortable | ImGui.TableFlags.SortMulti
                | ImGui.TableFlags.RowBg | ImGui.TableFlags.BordersOuter | ImGui.TableFlags.BordersV | ImGui.TableFlags.NoBordersInBody
                | ImGui.TableFlags.ScrollY);
            PushStyleCompact();
            ImGui.CheckboxFlags("ImGui.TableFlags.SortMulti", flags.access, ImGui.TableFlags.SortMulti);
            ImGui.SameLine();
            HelpMarker("When sorting is enabled: hold shift when clicking headers to sort on multiple column. TableGetSortSpecs() may return specs where (SpecsCount > 1).");
            ImGui.CheckboxFlags("ImGui.TableFlags.SortTristate", flags.access, ImGui.TableFlags.SortTristate);
            ImGui.SameLine();
            HelpMarker("When sorting is enabled: allow no sorting, disable default sorting. TableGetSortSpecs() may return specs where (SpecsCount === 0).");
            PopStyleCompact();
            if (ImGui.BeginTable("table_sorting", 4, flags.value, new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 15), 0.0)) {
                // Declare columns
                // We use the "user_id" parameter of TableSetupColumn() to specify a user id that will be stored in the sort specifications.
                // This is so our sort function can identify a column given our own identifier. We could also identify them based on their index!
                // Demonstrate using a mixture of flags among available sort-related flags:
                // - ImGui.TableColumnFlags.DefaultSort
                // - ImGui.TableColumnFlags.NoSort / ImGui.TableColumnFlags.NoSortAscending / ImGui.TableColumnFlags.NoSortDescending
                // - ImGui.TableColumnFlags.PreferSortAscending / ImGui.TableColumnFlags.PreferSortDescending
                ImGui.TableSetupColumn("ID", ImGui.TableColumnFlags.DefaultSort | ImGui.TableColumnFlags.WidthFixed, 0.0, MyItemColumnID.ID);
                ImGui.TableSetupColumn("Name", ImGui.TableColumnFlags.WidthFixed, 0.0, MyItemColumnID.Name);
                ImGui.TableSetupColumn("Action", ImGui.TableColumnFlags.NoSort | ImGui.TableColumnFlags.WidthFixed, 0.0, MyItemColumnID.Action);
                ImGui.TableSetupColumn("Quantity", ImGui.TableColumnFlags.PreferSortDescending | ImGui.TableColumnFlags.WidthStretch, 0.0, MyItemColumnID.Quantity);
                ImGui.TableSetupScrollFreeze(0, 1); // Make row always visible
                ImGui.TableHeadersRow();
                // Sort our data if sort specs have been changed!
                const sorts_specs = ImGui.TableGetSortSpecs();
                if (sorts_specs !== null && sorts_specs.SpecsDirty) {
                    MyItem.s_current_sort_specs = sorts_specs; // Store in variable accessible by the sort function.
                    if (items.value.Size > 1)
                        // qsort(&items[0], (size_t)items.Size, sizeof(items[0]), MyItem.CompareWithSortSpecs);
                        items.value.sort(MyItem.CompareWithSortSpecs);
                    MyItem.s_current_sort_specs = null;
                    sorts_specs.SpecsDirty = false;
                }
                // Demonstrate using clipper for large vertical lists
                const clipper = new ImGui.ListClipper();
                clipper.Begin(items.value.Size);
                while (clipper.Step())
                    for (let row_n = clipper.DisplayStart; row_n < clipper.DisplayEnd; row_n++) {
                        // Display a data item
                        const item = items.value[row_n];
                        ImGui.PushID(item.ID);
                        ImGui.TableNextRow();
                        ImGui.TableNextColumn();
                        ImGui.Text(`${item.ID.toString().padStart(4, "0")}`);
                        ImGui.TableNextColumn();
                        ImGui.TextUnformatted(item.Name);
                        ImGui.TableNextColumn();
                        ImGui.SmallButton("None");
                        ImGui.TableNextColumn();
                        ImGui.Text(`${item.Quantity}`);
                        ImGui.PopID();
                    }
                ImGui.EndTable();
            }
            ImGui.TreePop();
        }
        // In this example we'll expose most table flags and settings.
        // For specific flags and settings refer to the corresponding section for more detailed explanation.
        // This section is mostly useful to experiment with combining certain flags or settings with each others.
        //ImGui.SetNextItemOpen(true, ImGui.Cond.Once); // [DEBUG]
        if (open_action !== -1)
            ImGui.SetNextItemOpen(open_action !== 0);
        IMGUI_DEMO_MARKER("Tables/Advanced");
        if (ImGui.TreeNode("Advanced")) {
            const flags = STATIC(UNIQUE("flags#3f2f0a15"), ImGui.TableFlags.Resizable | ImGui.TableFlags.Reorderable | ImGui.TableFlags.Hideable
                | ImGui.TableFlags.Sortable | ImGui.TableFlags.SortMulti
                | ImGui.TableFlags.RowBg | ImGui.TableFlags.Borders | ImGui.TableFlags.NoBordersInBody
                | ImGui.TableFlags.ScrollX | ImGui.TableFlags.ScrollY
                | ImGui.TableFlags.SizingFixedFit);
            let ContentsType;
            (function (ContentsType) {
                ContentsType[ContentsType["Text"] = 0] = "Text";
                ContentsType[ContentsType["Button"] = 1] = "Button";
                ContentsType[ContentsType["SmallButton"] = 2] = "SmallButton";
                ContentsType[ContentsType["FillButton"] = 3] = "FillButton";
                ContentsType[ContentsType["Selectable"] = 4] = "Selectable";
                ContentsType[ContentsType["SelectableSpanRow"] = 5] = "SelectableSpanRow";
            })(ContentsType || (ContentsType = {}));
            ;
            const contents_type = STATIC(UNIQUE("contents_type#3a8ae22f"), ContentsType.SelectableSpanRow);
            const contents_type_names = ["Text", "Button", "SmallButton", "FillButton", "Selectable", "Selectable (span row)"];
            const freeze_cols = STATIC(UNIQUE("freeze_cols#d8a04a56"), 1);
            const freeze_rows = STATIC(UNIQUE("freeze_rows#f64daf19"), 1);
            const items_count = STATIC(UNIQUE("items_count#0781ca13"), ImGui.ARRAYSIZE(template_items_names) * 2);
            const outer_size_value = STATIC(UNIQUE("outer_size_value#94490908"), new ImGui.Vec2(0.0, TEXT_BASE_HEIGHT * 12));
            const row_min_height = STATIC(UNIQUE("row_min_height#607e0581"), 0.0); // Auto
            const inner_width_with_scroll = STATIC(UNIQUE("inner_width_with_scroll#2fde8d77"), 0.0); // Auto-extend
            const outer_size_enabled = STATIC(UNIQUE("outer_size_enabled#c9eb1b88"), true);
            const show_headers = STATIC(UNIQUE("show_headers#c4600b3c"), true);
            const show_wrapped_text = STATIC(UNIQUE("show_wrapped_text#52dbceb0"), false);
            //static ImGui.TextFilter filter;
            //ImGui.SetNextItemOpen(true, ImGui.Cond.Once); // FIXME-TABLE: Enabling this results in initial clipped first pass on table which tend to affects column sizing
            if (ImGui.TreeNode("Options")) {
                // Make the UI compact because there are so many fields
                PushStyleCompact();
                ImGui.PushItemWidth(TEXT_BASE_WIDTH * 28.0);
                if (ImGui.TreeNodeEx("Features:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.CheckboxFlags("ImGui.TableFlags.Resizable", flags.access, ImGui.TableFlags.Resizable);
                    ImGui.CheckboxFlags("ImGui.TableFlags.Reorderable", flags.access, ImGui.TableFlags.Reorderable);
                    ImGui.CheckboxFlags("ImGui.TableFlags.Hideable", flags.access, ImGui.TableFlags.Hideable);
                    ImGui.CheckboxFlags("ImGui.TableFlags.Sortable", flags.access, ImGui.TableFlags.Sortable);
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoSavedSettings", flags.access, ImGui.TableFlags.NoSavedSettings);
                    ImGui.CheckboxFlags("ImGui.TableFlags.ContextMenuInBody", flags.access, ImGui.TableFlags.ContextMenuInBody);
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Decorations:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.CheckboxFlags("ImGui.TableFlags.RowBg", flags.access, ImGui.TableFlags.RowBg);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersV", flags.access, ImGui.TableFlags.BordersV);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterV", flags.access, ImGui.TableFlags.BordersOuterV);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerV", flags.access, ImGui.TableFlags.BordersInnerV);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersH", flags.access, ImGui.TableFlags.BordersH);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersOuterH", flags.access, ImGui.TableFlags.BordersOuterH);
                    ImGui.CheckboxFlags("ImGui.TableFlags.BordersInnerH", flags.access, ImGui.TableFlags.BordersInnerH);
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBody", flags.access, ImGui.TableFlags.NoBordersInBody);
                    ImGui.SameLine();
                    HelpMarker("Disable vertical borders in columns Body (borders will always appears in Headers");
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoBordersInBodyUntilResize", flags.access, ImGui.TableFlags.NoBordersInBodyUntilResize);
                    ImGui.SameLine();
                    HelpMarker("Disable vertical borders in columns Body until hovered for resize (borders will always appears in Headers)");
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Sizing:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    EditTableSizingFlags(flags.access);
                    ImGui.SameLine();
                    HelpMarker("In the Advanced demo we override the policy of each column so those table-wide settings have less effect that typical.");
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendX", flags.access, ImGui.TableFlags.NoHostExtendX);
                    ImGui.SameLine();
                    HelpMarker("Make outer width auto-fit to columns, overriding outer_size.x value.\n\nOnly available when ScrollX/ScrollY are disabled and Stretch columns are not used.");
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoHostExtendY", flags.access, ImGui.TableFlags.NoHostExtendY);
                    ImGui.SameLine();
                    HelpMarker("Make outer height stop exactly at outer_size.y (prevent auto-extending table past the limit).\n\nOnly available when ScrollX/ScrollY are disabled. Data below the limit will be clipped and not visible.");
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoKeepColumnsVisible", flags.access, ImGui.TableFlags.NoKeepColumnsVisible);
                    ImGui.SameLine();
                    HelpMarker("Only available if ScrollX is disabled.");
                    ImGui.CheckboxFlags("ImGui.TableFlags.PreciseWidths", flags.access, ImGui.TableFlags.PreciseWidths);
                    ImGui.SameLine();
                    HelpMarker("Disable distributing remainder width to stretched columns (width allocation on a 100-wide table with 3 columns: Without this flag: 33,33,34. With this flag: 33,33,33). With larger number of columns, resizing will appear to be less smooth.");
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoClip", flags.access, ImGui.TableFlags.NoClip);
                    ImGui.SameLine();
                    HelpMarker("Disable clipping rectangle for every individual columns (reduce draw command count, items will be able to overflow into other columns). Generally incompatible with ScrollFreeze options.");
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Padding:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.CheckboxFlags("ImGui.TableFlags.PadOuterX", flags.access, ImGui.TableFlags.PadOuterX);
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoPadOuterX", flags.access, ImGui.TableFlags.NoPadOuterX);
                    ImGui.CheckboxFlags("ImGui.TableFlags.NoPadInnerX", flags.access, ImGui.TableFlags.NoPadInnerX);
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Scrolling:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.CheckboxFlags("ImGui.TableFlags.ScrollX", flags.access, ImGui.TableFlags.ScrollX);
                    ImGui.SameLine();
                    ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
                    ImGui.DragInt("freeze_cols", freeze_cols.access, 0.2, 0, 9, undefined, ImGui.SliderFlags.NoInput);
                    ImGui.CheckboxFlags("ImGui.TableFlags.ScrollY", flags.access, ImGui.TableFlags.ScrollY);
                    ImGui.SameLine();
                    ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
                    ImGui.DragInt("freeze_rows", freeze_rows.access, 0.2, 0, 9, undefined, ImGui.SliderFlags.NoInput);
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Sorting:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.CheckboxFlags("ImGui.TableFlags.SortMulti", flags.access, ImGui.TableFlags.SortMulti);
                    ImGui.SameLine();
                    HelpMarker("When sorting is enabled: hold shift when clicking headers to sort on multiple column. TableGetSortSpecs() may return specs where (SpecsCount > 1).");
                    ImGui.CheckboxFlags("ImGui.TableFlags.SortTristate", flags.access, ImGui.TableFlags.SortTristate);
                    ImGui.SameLine();
                    HelpMarker("When sorting is enabled: allow no sorting, disable default sorting. TableGetSortSpecs() may return specs where (SpecsCount === 0).");
                    ImGui.TreePop();
                }
                if (ImGui.TreeNodeEx("Other:", ImGui.TreeNodeFlags.DefaultOpen)) {
                    ImGui.Checkbox("show_headers", show_headers.access);
                    ImGui.Checkbox("show_wrapped_text", show_wrapped_text.access);
                    ImGui.DragFloat2("##OuterSize", outer_size_value.value);
                    ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                    ImGui.Checkbox("outer_size", outer_size_enabled.access);
                    ImGui.SameLine();
                    HelpMarker("If scrolling is disabled (ScrollX and ScrollY not set):\n" +
                        "- The table is output directly in the parent window.\n" +
                        "- OuterSize.x < 0.0 will right-align the table.\n" +
                        "- OuterSize.x = 0.0 will narrow fit the table unless there are any Stretch column.\n" +
                        "- OuterSize.y then becomes the minimum size for the table, which will extend vertically if there are more rows (unless NoHostExtendY is set).");
                    // From a user point of view we will tend to use 'inner_width' differently depending on whether our table is embedding scrolling.
                    // To facilitate toying with this demo we will actually pass 0.0 to the BeginTable() when ScrollX is disabled.
                    ImGui.DragFloat("inner_width (when ScrollX active)", inner_width_with_scroll.access, 1.0, 0.0, FLT_MAX);
                    ImGui.DragFloat("row_min_height", row_min_height.access, 1.0, 0.0, FLT_MAX);
                    ImGui.SameLine();
                    HelpMarker("Specify height of the Selectable item.");
                    ImGui.DragInt("items_count", items_count.access, 0.1, 0, 9999);
                    ImGui.Combo("items_type (first column)", contents_type.access, contents_type_names, ImGui.ARRAYSIZE(contents_type_names));
                    //filter.Draw("filter");
                    ImGui.TreePop();
                }
                ImGui.PopItemWidth();
                PopStyleCompact();
                ImGui.Spacing();
                ImGui.TreePop();
            }
            // Update item list if we changed the number of items
            const items = STATIC(UNIQUE("items#5b077f64"), new ImGui.Vector());
            const selection = STATIC(UNIQUE("selection#01260bec"), new ImGui.Vector());
            const items_need_sort = STATIC(UNIQUE("items_need_sort#d49bf4fa"), false);
            if (items.value.Size !== items_count.value) {
                items.value.resize(items_count.value, () => new MyItem());
                for (let n = 0; n < items_count.value; n++) {
                    const template_n = n % ImGui.ARRAYSIZE(template_items_names);
                    const item = items.value[n];
                    item.ID = n;
                    item.Name = template_items_names[template_n];
                    item.Quantity = (template_n === 3) ? 10 : (template_n === 4) ? 20 : 0; // Assign default quantities
                }
            }
            const parent_draw_list = ImGui.GetWindowDrawList();
            // TODO(imgui-js): ImDrawList.CmdBuffer
            const parent_draw_list_draw_cmd_count = parent_draw_list.IdxBuffer.length; // parent_draw_list.CmdBuffer.Size;
            const table_scroll_cur = new ImGui.Vec2(), table_scroll_max = new ImGui.Vec2(); // For debug display
            let table_draw_list = null; // "
            // Submit table
            const inner_width_to_use = (flags.value & ImGui.TableFlags.ScrollX) ? inner_width_with_scroll.value : 0.0;
            if (ImGui.BeginTable("table_advanced", 6, flags.value, outer_size_enabled.value ? outer_size_value.value : new ImGui.Vec2(0, 0), inner_width_to_use)) {
                // Declare columns
                // We use the "user_id" parameter of TableSetupColumn() to specify a user id that will be stored in the sort specifications.
                // This is so our sort function can identify a column given our own identifier. We could also identify them based on their index!
                ImGui.TableSetupColumn("ID", ImGui.TableColumnFlags.DefaultSort | ImGui.TableColumnFlags.WidthFixed | ImGui.TableColumnFlags.NoHide, 0.0, MyItemColumnID.ID);
                ImGui.TableSetupColumn("Name", ImGui.TableColumnFlags.WidthFixed, 0.0, MyItemColumnID.Name);
                ImGui.TableSetupColumn("Action", ImGui.TableColumnFlags.NoSort | ImGui.TableColumnFlags.WidthFixed, 0.0, MyItemColumnID.Action);
                ImGui.TableSetupColumn("Quantity", ImGui.TableColumnFlags.PreferSortDescending, 0.0, MyItemColumnID.Quantity);
                ImGui.TableSetupColumn("Description", (flags.value & ImGui.TableFlags.NoHostExtendX) ? 0 : ImGui.TableColumnFlags.WidthStretch, 0.0, MyItemColumnID.Description);
                ImGui.TableSetupColumn("Hidden", ImGui.TableColumnFlags.DefaultHide | ImGui.TableColumnFlags.NoSort);
                ImGui.TableSetupScrollFreeze(freeze_cols.value, freeze_rows.value);
                // Sort our data if sort specs have been changed!
                // ImGui.TableSortSpecs* sorts_specs = ImGui.TableGetSortSpecs();
                const sorts_specs = ImGui.TableGetSortSpecs();
                if (sorts_specs && sorts_specs.SpecsDirty)
                    items_need_sort.value = true;
                if (sorts_specs && items_need_sort.value && items.value.Size > 1) {
                    MyItem.s_current_sort_specs = sorts_specs; // Store in variable accessible by the sort function.
                    // qsort(&items[0], (size_t)items.Size, sizeof(items[0]), MyItem::CompareWithSortSpecs);
                    items.value.sort(MyItem.CompareWithSortSpecs);
                    MyItem.s_current_sort_specs = null;
                    sorts_specs.SpecsDirty = false;
                }
                items_need_sort.value = false;
                // Take note of whether we are currently sorting based on the Quantity field,
                // we will use this to trigger sorting when we know the data of this column has been modified.
                const sorts_specs_using_quantity = (ImGui.TableGetColumnFlags(3) & ImGui.TableColumnFlags.IsSorted) !== 0;
                // Show headers
                if (show_headers.value)
                    ImGui.TableHeadersRow();
                // Show data
                // FIXME-TABLE FIXME-NAV: How we can get decent up/down even though we have the buttons here?
                ImGui.PushButtonRepeat(true);
                // #if 1
                // Demonstrate using clipper for large vertical lists
                const clipper = new ImGui.ListClipper();
                clipper.Begin(items.value.Size);
                while (clipper.Step()) {
                    for (let row_n = clipper.DisplayStart; row_n < clipper.DisplayEnd; row_n++) 
                    // #else
                    // // Without clipper
                    // {
                    //     for (let row_n = 0; row_n < items.Size; row_n++)
                    // #endif
                    {
                        const item = items.value[row_n];
                        //if (!filter.PassFilter(item.Name))
                        //    continue;
                        const item_is_selected = selection.value.contains(item.ID);
                        ImGui.PushID(item.ID);
                        ImGui.TableNextRow(ImGui.TableRowFlags.None, row_min_height.value);
                        // For the demo purpose we can select among different type of items submitted in the first column
                        ImGui.TableSetColumnIndex(0);
                        const label = `${item.ID.toString().padStart(4, "0")}`;
                        if (contents_type.value === ContentsType.Text)
                            ImGui.TextUnformatted(label);
                        else if (contents_type.value === ContentsType.Button)
                            ImGui.Button(label);
                        else if (contents_type.value === ContentsType.SmallButton)
                            ImGui.SmallButton(label);
                        else if (contents_type.value === ContentsType.FillButton)
                            ImGui.Button(label, new ImGui.Vec2(-FLT_MIN, 0.0));
                        else if (contents_type.value === ContentsType.Selectable || contents_type.value === ContentsType.SelectableSpanRow) {
                            const selectable_flags = (contents_type.value === ContentsType.SelectableSpanRow) ? ImGui.SelectableFlags.SpanAllColumns | ImGui.SelectableFlags.AllowItemOverlap : ImGui.SelectableFlags.None;
                            if (ImGui.Selectable(label, item_is_selected, selectable_flags, new ImGui.Vec2(0, row_min_height.value))) {
                                if (ImGui.GetIO().KeyCtrl) {
                                    if (item_is_selected)
                                        selection.value.find_erase_unsorted(item.ID);
                                    else
                                        selection.value.push_back(item.ID);
                                }
                                else {
                                    selection.value.clear();
                                    selection.value.push_back(item.ID);
                                }
                            }
                        }
                        if (ImGui.TableSetColumnIndex(1))
                            ImGui.TextUnformatted(item.Name);
                        // Here we demonstrate marking our data set as needing to be sorted again if we modified a quantity,
                        // and we are currently sorting on the column showing the Quantity.
                        // To avoid triggering a sort while holding the button, we only trigger it when the button has been released.
                        // You will probably need a more advanced system in your code if you want to automatically sort when a specific entry changes.
                        if (ImGui.TableSetColumnIndex(2)) {
                            if (ImGui.SmallButton("Chop")) {
                                item.Quantity += 1;
                            }
                            if (sorts_specs_using_quantity && ImGui.IsItemDeactivated()) {
                                items_need_sort.value = true;
                            }
                            ImGui.SameLine();
                            if (ImGui.SmallButton("Eat")) {
                                item.Quantity -= 1;
                            }
                            if (sorts_specs_using_quantity && ImGui.IsItemDeactivated()) {
                                items_need_sort.value = true;
                            }
                        }
                        if (ImGui.TableSetColumnIndex(3))
                            ImGui.Text(`${item.Quantity}`);
                        ImGui.TableSetColumnIndex(4);
                        if (show_wrapped_text.value)
                            ImGui.TextWrapped("Lorem ipsum dolor sit amet");
                        else
                            ImGui.Text("Lorem ipsum dolor sit amet");
                        if (ImGui.TableSetColumnIndex(5))
                            ImGui.Text("1234");
                        ImGui.PopID();
                    }
                }
                ImGui.PopButtonRepeat();
                // Store some info to display debug details below
                table_scroll_cur.Set(ImGui.GetScrollX(), ImGui.GetScrollY());
                table_scroll_max.Set(ImGui.GetScrollMaxX(), ImGui.GetScrollMaxY());
                table_draw_list = ImGui.GetWindowDrawList();
                ImGui.EndTable();
            }
            const show_debug_details = STATIC(UNIQUE("show_debug_details#39de911e"), false);
            ImGui.Checkbox("Debug details", show_debug_details.access);
            if (show_debug_details.value && table_draw_list) {
                ImGui.SameLine(0.0, 0.0);
                // TODO(imgui-js): ImDrawList.CmdBuffer
                const table_draw_list_draw_cmd_count = table_draw_list.IdxBuffer.length; // table_draw_list.CmdBuffer.Size;
                if (table_draw_list === parent_draw_list)
                    ImGui.Text(`: IdxBuffer: +${table_draw_list_draw_cmd_count - parent_draw_list_draw_cmd_count} (in same window)`);
                else
                    ImGui.Text(`: IdxBuffer: +${table_draw_list_draw_cmd_count - 1} (in child window), Scroll: (${table_scroll_cur.x}/${table_scroll_max.x}) (${table_scroll_cur.y}/${table_scroll_max.y})`);
            }
            ImGui.TreePop();
        }
        ImGui.PopID();
        ShowDemoWindowColumns();
        if (disable_indent.value)
            ImGui.PopStyleVar();
    }
    // Demonstrate old/legacy Columns API!
    // [2020: Columns are under-featured and not maintained. Prefer using the more flexible and powerful BeginTable() API!]
    function ShowDemoWindowColumns() {
        IMGUI_DEMO_MARKER("Columns (legacy API)");
        const open = ImGui.TreeNode("Legacy Columns API");
        ImGui.SameLine();
        HelpMarker("Columns() is an old API! Prefer using the more flexible and powerful BeginTable() API!");
        if (!open)
            return;
        // Basic columns
        IMGUI_DEMO_MARKER("Columns (legacy API)/Basic");
        if (ImGui.TreeNode("Basic")) {
            ImGui.Text("Without border:");
            ImGui.Columns(3, "mycolumns3", false); // 3-ways, no border
            ImGui.Separator();
            for (let n = 0; n < 14; n++) {
                const label = `Item ${n}`;
                if (ImGui.Selectable(label)) { }
                //if (ImGui.Button(label, new ImGui.Vec2(-FLT_MIN,0.0))) {}
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
            const selected = STATIC(UNIQUE("selected#7f97a06b"), -1);
            for (let i = 0; i < 3; i++) {
                const label = `${i.toString().padStart(4, "0")}`;
                if (ImGui.Selectable(label, selected.value === i, ImGui.SelectableFlags.SpanAllColumns))
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
        IMGUI_DEMO_MARKER("Columns (legacy API)/Borders");
        if (ImGui.TreeNode("Borders")) {
            // NB: Future columns API should allow automatic horizontal borders.
            const h_borders = STATIC(UNIQUE("h_borders#d7f23137"), true);
            const v_borders = STATIC(UNIQUE("v_borders#17e24566"), true);
            const columns_count = STATIC(UNIQUE("columns_count#3b93013c"), 4);
            const lines_count = 3;
            ImGui.SetNextItemWidth(ImGui.GetFontSize() * 8);
            ImGui.DragInt("##columns_count", columns_count.access, 0.1, 2, 10, "%d columns");
            if (columns_count.value < 2)
                columns_count.value = 2;
            ImGui.SameLine();
            ImGui.Checkbox("horizontal", h_borders.access);
            ImGui.SameLine();
            ImGui.Checkbox("vertical", v_borders.access);
            ImGui.Columns(columns_count.value, null, v_borders.value);
            for (let i = 0; i < columns_count.value * lines_count; i++) {
                if (h_borders.value && ImGui.GetColumnIndex() === 0)
                    ImGui.Separator();
                const c = String.fromCharCode("a".charCodeAt(0) + i);
                ImGui.Text(`${c}${c}${c}`);
                ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}`);
                ImGui.Text(`Avail ${ImGui.GetContentRegionAvail().x.toFixed(2)}`);
                ImGui.Text(`Offset ${ImGui.GetColumnOffset().toFixed(2)}`);
                ImGui.Text("Long text that is likely to clip");
                ImGui.Button("Button", new ImGui.Vec2(-FLT_MIN, 0.0));
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            if (h_borders.value)
                ImGui.Separator();
            ImGui.TreePop();
        }
        // Create multiple items in a same cell before switching to next column
        IMGUI_DEMO_MARKER("Columns (legacy API)/Mixed items");
        if (ImGui.TreeNode("Mixed items")) {
            ImGui.Columns(3, "mixed");
            ImGui.Separator();
            ImGui.Text("Hello");
            ImGui.Button("Banana");
            ImGui.NextColumn();
            ImGui.Text("ImGui");
            ImGui.Button("Apple");
            const foo = STATIC(UNIQUE("foo#845ff349"), 1.0);
            ImGui.InputFloat("red", foo.access, 0.05, 0, "%.3f");
            ImGui.Text("An extra line here.");
            ImGui.NextColumn();
            ImGui.Text("Sailor");
            ImGui.Button("Corniflower");
            const bar = STATIC(UNIQUE("bar#32ef50e7"), 1.0);
            ImGui.InputFloat("blue", bar.access, 0.05, 0, "%.3f");
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
        IMGUI_DEMO_MARKER("Columns (legacy API)/Word-wrapping");
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
        IMGUI_DEMO_MARKER("Columns (legacy API)/Horizontal Scrolling");
        if (ImGui.TreeNode("Horizontal Scrolling")) {
            ImGui.SetNextWindowContentSize(new ImGui.Vec2(1500.0, 0.0));
            const child_size = new ImGui.Vec2(0, ImGui.GetFontSize() * 20.0);
            ImGui.BeginChild("##ScrollingRegion", child_size, false, ImGui.WindowFlags.HorizontalScrollbar);
            ImGui.Columns(10);
            // Also demonstrate using clipper for large vertical lists
            let ITEMS_COUNT = 2000;
            const clipper = new ImGui.ListClipper();
            clipper.Begin(ITEMS_COUNT);
            while (clipper.Step()) {
                for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    for (let j = 0; j < 10; j++) {
                        ImGui.Text(`Line ${i} Column ${j}...`);
                        ImGui.NextColumn();
                    }
            }
            ImGui.Columns(1);
            ImGui.EndChild();
            ImGui.TreePop();
        }
        IMGUI_DEMO_MARKER("Columns (legacy API)/Tree");
        if (ImGui.TreeNode("Tree")) {
            ImGui.Columns(2, "tree", true);
            for (let x = 0; x < 3; x++) {
                const open1 = ImGui.TreeNode(/*(void*)(intptr_t)*/ x, `Node${x}`);
                ImGui.NextColumn();
                ImGui.Text("Node contents");
                ImGui.NextColumn();
                if (open1) {
                    for (let y = 0; y < 3; y++) {
                        const open2 = ImGui.TreeNode(/*(void*)(intptr_t)*/ y, `Node${x}.${y}`);
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
        ImGui.TreePop();
    }
    function ShowDemoWindowMisc() {
        IMGUI_DEMO_MARKER("Filtering");
        if (ImGui.CollapsingHeader("Filtering")) {
            // Helper class to easy setup a text filter.
            // You may want to implement a more feature-full filtering scheme in your own application.
            const filter = STATIC(UNIQUE("filter#51f8d318"), new ImGui.TextFilter());
            ImGui.Text("Filter usage:\n" +
                "  \"\"         display all lines\n" +
                "  \"xxx\"      display lines containing \"xxx\"\n" +
                "  \"xxx,yyy\"  display lines containing \"xxx\" or \"yyy\"\n" +
                "  \"-xxx\"     hide lines containing \"xxx\"");
            filter.value.Draw();
            const lines = ["aaa1.c", "bbb1.c", "ccc1.c", "aaa2.cpp", "bbb2.cpp", "ccc2.cpp", "abc.h", "hello, world"];
            for (let i = 0; i < ImGui.ARRAYSIZE(lines); i++)
                if (filter.value.PassFilter(lines[i]))
                    ImGui.BulletText(`${lines[i]}`);
        }
        IMGUI_DEMO_MARKER("Inputs, Navigation & Focus");
        if (ImGui.CollapsingHeader("Inputs, Navigation & Focus")) {
            const io = ImGui.GetIO();
            // Display ImGui.IO output flags
            ImGui.Text(`WantCaptureMouse: ${io.WantCaptureMouse}`);
            ImGui.Text(`WantCaptureMouseUnlessPopupClose: ${io.WantCaptureMouseUnlessPopupClose}`);
            ImGui.Text(`WantCaptureKeyboard: ${io.WantCaptureKeyboard}`);
            ImGui.Text(`WantTextInput: ${io.WantTextInput}`);
            ImGui.Text(`WantSetMousePos: ${io.WantSetMousePos}`);
            ImGui.Text(`NavActive: ${io.NavActive}, NavVisible: ${io.NavVisible}`);
            // Display Mouse state
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Mouse State");
            if (ImGui.TreeNode("Mouse State")) {
                if (ImGui.IsMousePosValid())
                    ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.y})`);
                else
                    ImGui.Text("Mouse pos: <INVALID>");
                ImGui.Text(`Mouse delta: (${io.MouseDelta.x}, ${io.MouseDelta.y})`);
                const count = ImGui.ARRAYSIZE(io.MouseDown);
                ImGui.Text("Mouse down:");
                for (let i = 0; i < count; i++)
                    if (ImGui.IsMouseDown(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i} (${io.MouseDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Mouse clicked:");
                for (let i = 0; i < count; i++)
                    if (ImGui.IsMouseClicked(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i} (${ImGui.GetMouseClickedCount(i)})`);
                    }
                ImGui.Text("Mouse released:");
                for (let i = 0; i < count; i++)
                    if (ImGui.IsMouseReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`b${i}`);
                    }
                ImGui.Text(`Mouse wheel: ${io.MouseWheel.toFixed(1)}`);
                // ImGui.Text("Pen Pressure: %.1f", io.PenPressure); // Note: currently unused
                ImGui.TreePop();
            }
            // Display Keyboard/Mouse state
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Keyboard & Navigation State");
            if (ImGui.TreeNode("Keyboard & Navigation State")) {
                ImGui.Text("Keys down:");
                for (let i = 0; i < ImGui.ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyDown(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16).toUpperCase()}) (${io.KeysDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("Keys pressed:");
                for (let i = 0; i < ImGui.ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyPressed(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16).toUpperCase()})`);
                    }
                ImGui.Text("Keys release:");
                for (let i = 0; i < ImGui.ARRAYSIZE(io.KeysDown); i++)
                    if (ImGui.IsKeyReleased(i)) {
                        ImGui.SameLine();
                        ImGui.Text(`${i} (0x${i.toString(16).toUpperCase()})`);
                    }
                ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);
                // TODO(imgui-js): ImGui.IO.InputQueueCharacters
                // ImGui.Text("Chars queue:");    for (let i = 0; i < io.InputQueueCharacters.Size; i++) { const c = io.InputQueueCharacters[i]; ImGui.SameLine();  ImGui.Text("\'%c\' (0x%04X)", (c > ' ' && c <= 255) ? (char)c : '?', c); } // FIXME: We should convert 'c' to UTF-8 here but the functions are not public.
                ImGui.Text("NavInputs down:");
                for (let i = 0; i < ImGui.ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputs[i] > 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}] ${io.NavInputs[i].toFixed(2)} (${io.NavInputsDownDuration[i].toFixed(2)} secs)`);
                    }
                ImGui.Text("NavInputs pressed:");
                for (let i = 0; i < ImGui.ARRAYSIZE(io.NavInputs); i++)
                    if (io.NavInputsDownDuration[i] === 0.0) {
                        ImGui.SameLine();
                        ImGui.Text(`[${i}]`);
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
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Tabbing");
            if (ImGui.TreeNode("Tabbing")) {
                ImGui.Text("Use TAB/SHIFT+TAB to cycle through keyboard editable fields.");
                const buf = STATIC(UNIQUE("buf#9770eaac"), new ImGui.StringBuffer(32, "hello"));
                ImGui.InputText("1", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.InputText("2", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.InputText("3", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.PushAllowKeyboardFocus(false);
                ImGui.InputText("4 (tab skip)", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.SameLine();
                HelpMarker("Item won't be cycled through when using TAB or Shift+Tab.");
                ImGui.PopAllowKeyboardFocus();
                ImGui.InputText("5", buf.value, ImGui.ARRAYSIZE(buf.value));
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Focus from code");
            if (ImGui.TreeNode("Focus from code")) {
                const focus_1 = ImGui.Button("Focus on 1");
                ImGui.SameLine();
                const focus_2 = ImGui.Button("Focus on 2");
                ImGui.SameLine();
                const focus_3 = ImGui.Button("Focus on 3");
                let has_focus = 0;
                const buf = STATIC(UNIQUE("buf#f50d3898"), new ImGui.StringBuffer(128, "click on a button to set focus"));
                if (focus_1)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("1", buf.value, ImGui.ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 1;
                if (focus_2)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("2", buf.value, ImGui.ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 2;
                ImGui.PushAllowKeyboardFocus(false);
                if (focus_3)
                    ImGui.SetKeyboardFocusHere();
                ImGui.InputText("3 (tab skip)", buf.value, ImGui.ARRAYSIZE(buf.value));
                if (ImGui.IsItemActive())
                    has_focus = 3;
                ImGui.SameLine();
                HelpMarker("Item won't be cycled through when using TAB or Shift+Tab.");
                ImGui.PopAllowKeyboardFocus();
                if (has_focus)
                    ImGui.Text(`Item with focus: ${has_focus}`);
                else
                    ImGui.Text("Item with focus: <none>");
                // Use >= 0 parameter to SetKeyboardFocusHere() to focus an upcoming item
                const f3 = STATIC(UNIQUE("f3#80d7c310"), [0.0, 0.0, 0.0]);
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
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Dragging");
            if (ImGui.TreeNode("Dragging")) {
                ImGui.TextWrapped("You can use ImGui.GetMouseDragDelta(0) to query for the dragged amount on any widget.");
                for (let button = 0; button < 3; button++) {
                    ImGui.Text(`IsMouseDragging(${button}):`);
                    ImGui.Text(`  w/ default threshold: ${ImGui.IsMouseDragging(button)},`);
                    ImGui.Text(`  w/ zero threshold: ${ImGui.IsMouseDragging(button, 0.0)},`);
                    ImGui.Text(`  w/ large threshold: ${ImGui.IsMouseDragging(button, 20.0)},`);
                }
                ImGui.Button("Drag Me");
                if (ImGui.IsItemActive())
                    ImGui.GetForegroundDrawList().AddLine(io.MouseClickedPos[0], io.MousePos, ImGui.GetColorU32(ImGui.Col.Button), 4.0); // Draw a line between the button and the mouse cursor
                // Drag operations gets "unlocked" when the mouse has moved past a certain threshold
                // (the default threshold is stored in io.MouseDragThreshold). You can request a lower or higher
                // threshold using the second parameter of IsMouseDragging() and GetMouseDragDelta().
                const value_raw = ImGui.GetMouseDragDelta(0, 0.0);
                const value_with_lock_threshold = ImGui.GetMouseDragDelta(0);
                const mouse_delta = io.MouseDelta;
                ImGui.Text("GetMouseDragDelta(0):");
                ImGui.Text(`  w/ default threshold: (${value_with_lock_threshold.x.toFixed(1)}, ${value_with_lock_threshold.y.toFixed(1)})`);
                ImGui.Text(`  w/ zero threshold: (${value_raw.x.toFixed(1)}, ${value_raw.y.toFixed(1)})`);
                ImGui.Text(`io.MouseDelta: (${mouse_delta.x.toFixed(1)}, ${mouse_delta.y.toFixed(1)})`);
                ImGui.TreePop();
            }
            IMGUI_DEMO_MARKER("Inputs, Navigation & Focus/Mouse cursors");
            if (ImGui.TreeNode("Mouse cursors")) {
                const mouse_cursors_names = ["Arrow", "TextInput", "ResizeAll", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE", "Hand", "NotAllowed"];
                ImGui.ASSERT(ImGui.ARRAYSIZE(mouse_cursors_names) === ImGui.MouseCursor.COUNT);
                const current = ImGui.GetMouseCursor();
                ImGui.Text(`Current mouse cursor = ${current}: ${mouse_cursors_names[current]}`);
                ImGui.Text("Hover to see mouse cursors:");
                ImGui.SameLine();
                HelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. " +
                    "If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, " +
                    "otherwise your backend needs to handle it.");
                for (let i = 0; i < ImGui.MouseCursor.COUNT; i++) {
                    const label = `Mouse cursor ${i}: ${mouse_cursors_names[i]}`;
                    ImGui.Bullet();
                    ImGui.Selectable(label, false);
                    if (ImGui.IsItemHovered())
                        ImGui.SetMouseCursor(i);
                }
                ImGui.TreePop();
            }
        }
    }
    //-----------------------------------------------------------------------------
    // [SECTION] About Window / ShowAboutWindow()
    // Access from Dear ImGui Demo -> Tools -> About
    //-----------------------------------------------------------------------------
    function ShowAboutWindow(p_open) {
        if (!ImGui.Begin("About Dear ImGui", p_open, ImGui.WindowFlags.AlwaysAutoResize)) {
            ImGui.End();
            return;
        }
        IMGUI_DEMO_MARKER("Tools/About Dear ImGui");
        ImGui.Text(`Dear ImGui ${ImGui.GetVersion()}`);
        ImGui.Separator();
        ImGui.Text("By Omar Cornut and all Dear ImGui contributors.");
        ImGui.Text("Dear ImGui is licensed under the MIT License, see LICENSE for more information.");
        const show_config_info = STATIC(UNIQUE("show_config_info#714b2250"), false);
        ImGui.Checkbox("Config/Build Information", show_config_info.access);
        if (show_config_info.value) {
            const io = ImGui.GetIO();
            const style = ImGui.GetStyle();
            const copy_to_clipboard = ImGui.Button("Copy to clipboard");
            const child_size = new ImGui.Vec2(0, ImGui.GetTextLineHeightWithSpacing() * 18);
            ImGui.BeginChildFrame(ImGui.GetID("cfg_infos"), child_size, ImGui.WindowFlags.NoMove);
            if (copy_to_clipboard) {
                ImGui.LogToClipboard();
                ImGui.LogText("```\n"); // Back quotes will make text appears without formatting when pasting on GitHub
            }
            ImGui.Text(`Dear ImGui ${ImGui.VERSION} (${ImGui.VERSION_NUM})`);
            ImGui.Text(`Emscripten ${ImGui.bind.__EMSCRIPTEN_major__}.${ImGui.bind.__EMSCRIPTEN_minor__}.${ImGui.bind.__EMSCRIPTEN_tiny__}`);
            ImGui.Separator();
            // ImGui.Text("sizeof(size_t): %d, sizeof(ImDrawIdx): %d, sizeof(ImDrawVert): %d", (int)sizeof(size_t), (int)sizeof(ImDrawIdx), (int)sizeof(ImDrawVert));
            ImGui.Text(`ImGui.DrawIdxSize: ${ImGui.DrawIdxSize}, ImGui.DrawVertSize: ${ImGui.DrawVertSize}`);
            // ImGui.Text("define: __cplusplus=%d", (int)__cplusplus);
            // #ifdef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_OBSOLETE_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_WIN32_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_WIN32_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_DEFAULT_FORMAT_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_DEFAULT_FORMAT_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_DEFAULT_MATH_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_DEFAULT_MATH_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_DEFAULT_FILE_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_DEFAULT_FILE_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_FILE_FUNCTIONS
            // ImGui.Text("define: IMGUI_DISABLE_FILE_FUNCTIONS");
            // #endif
            // #ifdef IMGUI_DISABLE_DEFAULT_ALLOCATORS
            // ImGui.Text("define: IMGUI_DISABLE_DEFAULT_ALLOCATORS");
            // #endif
            // #ifdef IMGUI_USE_BGRA_PACKED_COLOR
            // ImGui.Text("define: IMGUI_USE_BGRA_PACKED_COLOR");
            // #endif
            // #ifdef _WIN32
            // ImGui.Text("define: _WIN32");
            // #endif
            // #ifdef _WIN64
            // ImGui.Text("define: _WIN64");
            // #endif
            // #ifdef __linux__
            // ImGui.Text("define: __linux__");
            // #endif
            // #ifdef __APPLE__
            // ImGui.Text("define: __APPLE__");
            // #endif
            // #ifdef _MSC_VER
            // ImGui.Text("define: _MSC_VER=%d", _MSC_VER);
            // #endif
            // #ifdef _MSVC_LANG
            // ImGui.Text("define: _MSVC_LANG=%d", (int)_MSVC_LANG);
            // #endif
            // #ifdef __MINGW32__
            // ImGui.Text("define: __MINGW32__");
            // #endif
            // #ifdef __MINGW64__
            // ImGui.Text("define: __MINGW64__");
            // #endif
            // #ifdef __GNUC__
            // ImGui.Text("define: __GNUC__=%d", (int)__GNUC__);
            // #endif
            // #ifdef __clang_version__
            // ImGui.Text("define: __clang_version__=%s", __clang_version__);
            // #endif
            ImGui.Separator();
            ImGui.Text(`io.BackendPlatformName: ${io.BackendPlatformName ? io.BackendPlatformName : "null"}`);
            ImGui.Text(`io.BackendRendererName: ${io.BackendRendererName ? io.BackendRendererName : "null"}`);
            ImGui.Text(`io.ConfigFlags: 0x${io.ConfigFlags.toString(16).toUpperCase().padStart(8, "0")}`);
            if (io.ConfigFlags & ImGui.ConfigFlags.NavEnableKeyboard)
                ImGui.Text(" NavEnableKeyboard");
            if (io.ConfigFlags & ImGui.ConfigFlags.NavEnableGamepad)
                ImGui.Text(" NavEnableGamepad");
            if (io.ConfigFlags & ImGui.ConfigFlags.NavEnableSetMousePos)
                ImGui.Text(" NavEnableSetMousePos");
            if (io.ConfigFlags & ImGui.ConfigFlags.NavNoCaptureKeyboard)
                ImGui.Text(" NavNoCaptureKeyboard");
            if (io.ConfigFlags & ImGui.ConfigFlags.NoMouse)
                ImGui.Text(" NoMouse");
            if (io.ConfigFlags & ImGui.ConfigFlags.NoMouseCursorChange)
                ImGui.Text(" NoMouseCursorChange");
            if (io.MouseDrawCursor)
                ImGui.Text("io.MouseDrawCursor");
            if (io.ConfigMacOSXBehaviors)
                ImGui.Text("io.ConfigMacOSXBehaviors");
            if (io.ConfigInputTextCursorBlink)
                ImGui.Text("io.ConfigInputTextCursorBlink");
            if (io.ConfigWindowsResizeFromEdges)
                ImGui.Text("io.ConfigWindowsResizeFromEdges");
            if (io.ConfigWindowsMoveFromTitleBarOnly)
                ImGui.Text("io.ConfigWindowsMoveFromTitleBarOnly");
            if (io.ConfigMemoryCompactTimer >= 0.0)
                ImGui.Text(`io.ConfigMemoryCompactTimer = ${io.ConfigMemoryCompactTimer.toFixed(1)}`);
            ImGui.Text(`io.BackendFlags: 0x${io.BackendFlags.toString(16).toUpperCase().padStart(8, "0")}`);
            if (io.BackendFlags & ImGui.BackendFlags.HasGamepad)
                ImGui.Text(" HasGamepad");
            if (io.BackendFlags & ImGui.BackendFlags.HasMouseCursors)
                ImGui.Text(" HasMouseCursors");
            if (io.BackendFlags & ImGui.BackendFlags.HasSetMousePos)
                ImGui.Text(" HasSetMousePos");
            if (io.BackendFlags & ImGui.BackendFlags.RendererHasVtxOffset)
                ImGui.Text(" RendererHasVtxOffset");
            ImGui.Separator();
            ImGui.Text(`io.Fonts: ${io.Fonts.Fonts.Size} fonts, Flags: 0x${io.Fonts.Flags.toString(16).toUpperCase().padStart(8, "0")}, TexSize: ${io.Fonts.TexWidth},${io.Fonts.TexHeight}`);
            ImGui.Text(`io.DisplaySize: ${io.DisplaySize.x.toFixed(2)},${io.DisplaySize.y.toFixed(2)}`);
            ImGui.Text(`io.DisplayFramebufferScale: ${io.DisplayFramebufferScale.x.toFixed(2)},${io.DisplayFramebufferScale.y.toFixed(2)}`);
            ImGui.Separator();
            ImGui.Text(`style.WindowPadding: ${style.WindowPadding.x.toFixed(2)},${style.WindowPadding.y.toFixed(2)}`);
            ImGui.Text(`style.WindowBorderSize: ${style.WindowBorderSize.toFixed(2)}`);
            ImGui.Text(`style.FramePadding: ${style.FramePadding.x.toFixed(2)},${style.FramePadding.y.toFixed(2)}`);
            ImGui.Text(`style.FrameRounding: ${style.FrameRounding.toFixed(2)}`);
            ImGui.Text(`style.FrameBorderSize: ${style.FrameBorderSize.toFixed(2)}`);
            ImGui.Text(`style.ItemSpacing: ${style.ItemSpacing.x.toFixed(2)},${style.ItemSpacing.y.toFixed(2)}`);
            ImGui.Text(`style.ItemInnerSpacing: ${style.ItemInnerSpacing.x.toFixed(2)},${style.ItemInnerSpacing.y.toFixed(2)}`);
            if (copy_to_clipboard) {
                ImGui.LogText("\n```\n");
                ImGui.LogFinish();
            }
            ImGui.EndChildFrame();
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Style Editor / ShowStyleEditor()
    //-----------------------------------------------------------------------------
    // - ShowFontSelector()
    // - ShowStyleSelector()
    // - ShowStyleEditor()
    //-----------------------------------------------------------------------------
    // Forward declare ShowFontAtlas() which isn't worth putting in public API yet
    // namespace ImGui { IMGUI_API void ShowFontAtlas(ImFontAtlas* atlas); }
    function ShowFontAtlas(atlas) {
        ImGui.PushItemWidth(120);
        for (let i = 0; i < atlas.Fonts.Size; i++) {
            const font = atlas.Fonts[i];
            ImGui.PushID(font.native.$$.ptr);
            NodeFont(font);
            ImGui.PopID();
        }
        if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`)) {
            const tint_col = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0);
            const border_col = new ImGui.Vec4(1.0, 1.0, 1.0, 0.5);
            ImGui.Image(atlas.TexID, new ImGui.Vec2(atlas.TexWidth, atlas.TexHeight), new ImGui.Vec2(0, 0), new ImGui.Vec2(1, 1), tint_col, border_col);
            ImGui.TreePop();
        }
    }
    // Demo helper function to select among loaded fonts.
    // Here we use the regular BeginCombo()/EndCombo() api which is more the more flexible one.
    function ShowFontSelector(label) {
        const io = ImGui.GetIO();
        const font_current = ImGui.GetFont();
        if (ImGui.BeginCombo(label, font_current.GetDebugName())) {
            for (let n = 0; n < io.Fonts.Fonts.Size; n++) {
                const font = io.Fonts.Fonts[n];
                ImGui.PushID(/*(void*)*/ font.native.$$.ptr);
                if (ImGui.Selectable(font.GetDebugName(), font === font_current))
                    io.FontDefault = font;
                ImGui.PopID();
            }
            ImGui.EndCombo();
        }
        ImGui.SameLine();
        HelpMarker("- Load additional fonts with io.Fonts.AddFontFromFileTTF().\n" +
            "- The font atlas is built when calling io.Fonts.GetTexDataAsXXXX() or io.Fonts.Build().\n" +
            "- Read FAQ and docs/FONTS.md for more details.\n" +
            "- If you need to add/remove fonts at runtime (e.g. for DPI change), do it before calling NewFrame().");
    }
    // [Internal] Display details for a single font, called by ShowStyleEditor().
    function NodeFont(font) {
        const io = ImGui.GetIO();
        const style = ImGui.GetStyle();
        const font_details_opened = ImGui.TreeNode(font.native.$$.ptr, `Font: \"${font.ConfigData ? font.ConfigData[0].Name : ""}\"\n${font.FontSize.toFixed(2)} px, ${font.Glyphs.Size} glyphs, ${font.ConfigDataCount} file(s)`);
        ImGui.SameLine();
        if (ImGui.SmallButton("Set as default")) {
            io.FontDefault = font;
        }
        if (!font_details_opened)
            return;
        ImGui.PushFont(font);
        ImGui.Text("The quick brown fox jumps over the lazy dog");
        ImGui.PopFont();
        ImGui.DragFloat("Font scale", (_ = font.Scale) => font.Scale = _, 0.005, 0.3, 2.0, "%.1f"); // Scale only this font
        ImGui.SameLine();
        HelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\n" +
            "Font are currently rendered into bitmaps at a given size at the time of building the atlas. " +
            "You may oversample them to get some flexibility with scaling. " +
            "You can also render at multiple sizes and select which one to use at runtime.\n\n" +
            "(Glimmer of hope: the atlas system will be rewritten in the future to make scaling more flexible.)");
        ImGui.Text(`Ascent: ${font.Ascent}, Descent: ${font.Descent}, Height: ${font.Ascent - font.Descent}`);
        ImGui.Text(`Fallback character: '${String.fromCharCode(font.FallbackChar)}' (U+${font.FallbackChar.toString().padStart(4, "0")})`);
        ImGui.Text(`Ellipsis character: '${String.fromCharCode(font.EllipsisChar)}' (U+${font.EllipsisChar.toString().padStart(4, "0")})`);
        const surface_sqrt = Math.floor(/*(int)*/ Math.sqrt(font.MetricsTotalSurface));
        ImGui.Text(`Texture Area: about ${font.MetricsTotalSurface} px ~${surface_sqrt}x${surface_sqrt} px`);
        for (let config_i = 0, cfg; config_i < font.ConfigDataCount; config_i++)
            if (font.ConfigData)
                if (cfg = font.ConfigData[config_i])
                    ImGui.BulletText(`Input ${config_i}: '${cfg.Name}', Oversample: (${cfg.OversampleH},${cfg.OversampleV}), PixelSnapH: ${cfg.PixelSnapH}, Offset: (${cfg.GlyphOffset.x.toFixed(1)},${cfg.GlyphOffset.x.toFixed(1)})`);
        if (ImGui.TreeNode("Glyphs", `Glyphs (${font.Glyphs.Size})`)) {
            // Display all glyphs of the fonts in separate pages of 256 characters
            const glyph_col = ImGui.GetColorU32(ImGui.Col.Text);
            for (let base = 0; base <= ImGui.UNICODE_CODEPOINT_MAX; base += 256) {
                // Skip ahead if a large bunch of glyphs are not present in the font (test in chunks of 4k)
                // This is only a small optimization to reduce the number of iterations when IM_UNICODE_MAX_CODEPOINT
                // is large // (if ImWchar==ImWchar32 we will do at least about 272 queries here)
                if (!(base & 4095) && font.IsGlyphRangeUnused(base, base + 4095)) {
                    base += 4096 - 256;
                    continue;
                }
                let count = 0;
                for (let n = 0; n < 256; n++)
                    if (font.FindGlyphNoFallback((base + n)))
                        count++;
                if (count <= 0)
                    continue;
                if (!ImGui.TreeNode(/*(void*)(intptr_t)*/ base, `U+${base.toString(16).toUpperCase().padStart(4, "0")}..U+${(base + 255).toString(16).toUpperCase().padStart(4, "0")} (${count} ${count > 1 ? "glyphs" : "glyph"})`))
                    continue;
                const cell_size = font.FontSize * 1;
                const cell_spacing = style.ItemSpacing.y;
                const base_pos = ImGui.GetCursorScreenPos();
                const draw_list = ImGui.GetWindowDrawList();
                for (let n = 0; n < 256; n++) {
                    // We use ImFont.RenderChar as a shortcut because we don't have UTF-8 conversion functions
                    // available here and thus cannot easily generate a zero-terminated UTF-8 encoded string.
                    const cell_p1 = new ImGui.Vec2(base_pos.x + (n % 16) * (cell_size + cell_spacing), base_pos.y + (0 | (n / 16)) * (cell_size + cell_spacing));
                    const cell_p2 = new ImGui.Vec2(cell_p1.x + cell_size, cell_p1.y + cell_size);
                    const glyph = font.FindGlyphNoFallback((base + n));
                    draw_list.AddRect(cell_p1, cell_p2, glyph ? ImGui.COL32(255, 255, 255, 100) : ImGui.COL32(255, 255, 255, 50));
                    if (glyph)
                        font.RenderChar(draw_list, cell_size, cell_p1, glyph_col, (base + n));
                    if (glyph && ImGui.IsMouseHoveringRect(cell_p1, cell_p2)) {
                        ImGui.BeginTooltip();
                        ImGui.Text(`Codepoint: U+${(base + n).toString(16).toUpperCase().padStart(4, "0")}`);
                        ImGui.Separator();
                        ImGui.Text(`Visible: ${glyph.Visible}`);
                        ImGui.Text(`AdvanceX: ${glyph.AdvanceX.toFixed(1)}`);
                        ImGui.Text(`Pos: (${glyph.X0.toFixed(2)},${glyph.Y0.toFixed(2)}).(${glyph.X1.toFixed(2)},${glyph.Y1.toFixed(2)})`);
                        ImGui.Text(`UV: (${glyph.U0.toFixed(3)},${glyph.V0.toFixed(3)}).(${glyph.U1.toFixed(3)},${glyph.V1.toFixed(3)})`);
                        ImGui.EndTooltip();
                    }
                }
                ImGui.Dummy(new ImGui.Vec2((cell_size + cell_spacing) * 16, (cell_size + cell_spacing) * 16));
                ImGui.TreePop();
            }
            ImGui.TreePop();
        }
        ImGui.TreePop();
    }
    // Demo helper function to select among default colors. See ShowStyleEditor() for more advanced options.
    // Here we use the simplified Combo() api that packs items into a single literal string.
    // Useful for quick combo boxes where the choices are known locally.
    function ShowStyleSelector(label) {
        const style_idx = STATIC(UNIQUE("style_idx#8531ae65"), -1);
        if (ImGui.Combo(label, style_idx.access, "Dark\0Light\0Classic\0")) {
            switch (style_idx.value) {
                case 0:
                    ImGui.StyleColorsDark();
                    break;
                case 1:
                    ImGui.StyleColorsLight();
                    break;
                case 2:
                    ImGui.StyleColorsClassic();
                    break;
            }
            return true;
        }
        return false;
    }
    function ShowStyleEditor(ref = null) {
        IMGUI_DEMO_MARKER("Tools/Style Editor");
        // You can pass in a reference ImGui.Style structure to compare to, revert to and save to
        // (without a reference style pointer, we will use one compared locally as a reference)
        const style = ImGui.GetStyle();
        const ref_saved_style = STATIC(UNIQUE("ref_saved_style#66ca25cd"), new ImGui.Style());
        // Default to using internal storage as reference
        const init = STATIC(UNIQUE("init#40d97303"), true);
        if (init.value && ref === null)
            ref_saved_style.value.Copy(style); // ref_saved_style = style;
        init.value = false;
        if (ref === null)
            ref = ref_saved_style.value;
        ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.50);
        if ( /*ImGui.*/ShowStyleSelector("Colors##Selector"))
            ref_saved_style.value.Copy(style); // ref_saved_style = style;
        /*ImGui.*/ ShowFontSelector("Fonts##Selector");
        // Simplified Settings (expose floating-pointer border sizes as boolean representing 0.0 or 1.0)
        if (ImGui.SliderFloat("FrameRounding", (_ = style.FrameRounding) => style.FrameRounding = _, 0.0, 12.0, "%.0f"))
            style.GrabRounding = style.FrameRounding; // Make GrabRounding always the same value as FrameRounding
        {
            let border = (style.WindowBorderSize > 0.0);
            if (ImGui.Checkbox("WindowBorder", (_ = border) => border = _)) {
                style.WindowBorderSize = border ? 1.0 : 0.0;
            }
        }
        ImGui.SameLine();
        {
            let border = (style.FrameBorderSize > 0.0);
            if (ImGui.Checkbox("FrameBorder", (_ = border) => border = _)) {
                style.FrameBorderSize = border ? 1.0 : 0.0;
            }
        }
        ImGui.SameLine();
        {
            let border = (style.PopupBorderSize > 0.0);
            if (ImGui.Checkbox("PopupBorder", (_ = border) => border = _)) {
                style.PopupBorderSize = border ? 1.0 : 0.0;
            }
        }
        // Save/Revert button
        if (ImGui.Button("Save Ref"))
            ref.Copy(ref_saved_style.value.Copy(style)); // *ref = ref_saved_style = style;
        ImGui.SameLine();
        if (ImGui.Button("Revert Ref"))
            style.Copy(ref); // style = *ref;
        ImGui.SameLine();
        HelpMarker("Save/Revert in local non-persistent storage. Default Colors definition are not affected. " +
            "Use \"Export\" below to save them somewhere.");
        ImGui.Separator();
        if (ImGui.BeginTabBar("##tabs", ImGui.TabBarFlags.None)) {
            if (ImGui.BeginTabItem("Sizes")) {
                ImGui.Text("Main");
                ImGui.SliderFloat2("WindowPadding", style.WindowPadding, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("FramePadding", style.FramePadding, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("CellPadding", style.CellPadding, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("ItemSpacing", style.ItemSpacing, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("ItemInnerSpacing", style.ItemInnerSpacing, 0.0, 20.0, "%.0f");
                ImGui.SliderFloat2("TouchExtraPadding", style.TouchExtraPadding, 0.0, 10.0, "%.0f");
                ImGui.SliderFloat("IndentSpacing", (_ = style.IndentSpacing) => style.IndentSpacing = _, 0.0, 30.0, "%.0f");
                ImGui.SliderFloat("ScrollbarSize", (_ = style.ScrollbarSize) => style.ScrollbarSize = _, 1.0, 20.0, "%.0f");
                ImGui.SliderFloat("GrabMinSize", (_ = style.GrabMinSize) => style.GrabMinSize = _, 1.0, 20.0, "%.0f");
                ImGui.Text("Borders");
                ImGui.SliderFloat("WindowBorderSize", (_ = style.WindowBorderSize) => style.WindowBorderSize = _, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("ChildBorderSize", (_ = style.ChildBorderSize) => style.ChildBorderSize = _, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("PopupBorderSize", (_ = style.PopupBorderSize) => style.PopupBorderSize = _, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("FrameBorderSize", (_ = style.FrameBorderSize) => style.FrameBorderSize = _, 0.0, 1.0, "%.0f");
                ImGui.SliderFloat("TabBorderSize", (_ = style.TabBorderSize) => style.TabBorderSize = _, 0.0, 1.0, "%.0f");
                ImGui.Text("Rounding");
                ImGui.SliderFloat("WindowRounding", (_ = style.WindowRounding) => style.WindowRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("ChildRounding", (_ = style.ChildRounding) => style.ChildRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("FrameRounding", (_ = style.FrameRounding) => style.FrameRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("PopupRounding", (_ = style.PopupRounding) => style.PopupRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("ScrollbarRounding", (_ = style.ScrollbarRounding) => style.ScrollbarRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("GrabRounding", (_ = style.GrabRounding) => style.GrabRounding = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("LogSliderDeadzone", (_ = style.LogSliderDeadzone) => style.LogSliderDeadzone = _, 0.0, 12.0, "%.0f");
                ImGui.SliderFloat("TabRounding", (_ = style.TabRounding) => style.TabRounding = _, 0.0, 12.0, "%.0f");
                ImGui.Text("Alignment");
                ImGui.SliderFloat2("WindowTitleAlign", style.WindowTitleAlign, 0.0, 1.0, "%.2f");
                let window_menu_button_position = style.WindowMenuButtonPosition + 1;
                if (ImGui.Combo("WindowMenuButtonPosition", (_ = window_menu_button_position) => window_menu_button_position = _, "None\0Left\0Right\0"))
                    style.WindowMenuButtonPosition = window_menu_button_position - 1;
                ImGui.Combo("ColorButtonPosition", (_ = style.ColorButtonPosition) => style.ColorButtonPosition = _, "Left\0Right\0");
                ImGui.SliderFloat2("ButtonTextAlign", style.ButtonTextAlign, 0.0, 1.0, "%.2f");
                ImGui.SameLine();
                HelpMarker("Alignment applies when a button is larger than its text content.");
                ImGui.SliderFloat2("SelectableTextAlign", style.SelectableTextAlign, 0.0, 1.0, "%.2f");
                ImGui.SameLine();
                HelpMarker("Alignment applies when a selectable is larger than its text content.");
                ImGui.Text("Safe Area Padding");
                ImGui.SameLine();
                HelpMarker("Adjust if you cannot see the edges of your screen (e.g. on a TV where scaling has not been configured).");
                ImGui.SliderFloat2("DisplaySafeAreaPadding", style.DisplaySafeAreaPadding, 0.0, 30.0, "%.0f");
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Colors")) {
                const output_dest = STATIC(UNIQUE("output_dest#86dadea7"), 0);
                const output_only_modified = STATIC(UNIQUE("output_only_modified#f809cfed"), true);
                if (ImGui.Button("Export")) {
                    if (output_dest.value === 0)
                        ImGui.LogToClipboard();
                    else
                        ImGui.LogToTTY();
                    ImGui.LogText(`const colors: ImGui.Vec4[] = ImGui.GetStyle().Colors;${IM_NEWLINE}`);
                    for (let i = 0; i < ImGui.Col.COUNT; i++) {
                        const col = style.Colors[i];
                        const name = ImGui.GetStyleColorName(i);
                        if (!output_only_modified.value || !col.Equals(ref.Colors[i]))
                            ImGui.LogText(`colors[ImGui.Col.${name}] = new ImGui.Vec4(${col.x}, ${col.y}, ${col.z}, ${col.w});${IM_NEWLINE}`);
                    }
                    ImGui.LogFinish();
                }
                ImGui.SameLine();
                ImGui.SetNextItemWidth(120);
                ImGui.Combo("##output_type", output_dest.access, "To Clipboard\0To TTY\0");
                ImGui.SameLine();
                ImGui.Checkbox("Only Modified Colors", output_only_modified.access);
                const filter = STATIC(UNIQUE("filter#82eacb19"), new ImGui.TextFilter());
                filter.value.Draw("Filter colors", ImGui.GetFontSize() * 16);
                const alpha_flags = STATIC(UNIQUE("alpha_flags#5b075799"), 0);
                if (ImGui.RadioButton("Opaque", alpha_flags.value === ImGui.ColorEditFlags.None)) {
                    alpha_flags.value = ImGui.ColorEditFlags.None;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Alpha", alpha_flags.value === ImGui.ColorEditFlags.AlphaPreview)) {
                    alpha_flags.value = ImGui.ColorEditFlags.AlphaPreview;
                }
                ImGui.SameLine();
                if (ImGui.RadioButton("Both", alpha_flags.value === ImGui.ColorEditFlags.AlphaPreviewHalf)) {
                    alpha_flags.value = ImGui.ColorEditFlags.AlphaPreviewHalf;
                }
                ImGui.SameLine();
                HelpMarker("In the color list:\n" +
                    "Left-click on color square to open color picker,\n" +
                    "Right-click to open edit options menu.");
                ImGui.BeginChild("##colors", new ImGui.Vec2(0, 0), true, ImGui.WindowFlags.AlwaysVerticalScrollbar | ImGui.WindowFlags.AlwaysHorizontalScrollbar | ImGui.WindowFlags.NavFlattened);
                ImGui.PushItemWidth(-160);
                for (let i = 0; i < ImGui.Col.COUNT; i++) {
                    const name = ImGui.GetStyleColorName(i);
                    if (!filter.value.PassFilter(name))
                        continue;
                    ImGui.PushID(i);
                    ImGui.ColorEdit4("##color", style.Colors[i], ImGui.ColorEditFlags.AlphaBar | alpha_flags.value);
                    if (!style.Colors[i].Equals(ref.Colors[i])) {
                        // Tips: in a real user application, you may want to merge and use an icon font into the main font,
                        // so instead of "Save"/"Revert" you'd use icons!
                        // Read the FAQ and docs/FONTS.md about using icon fonts. It's really easy and super convenient!
                        ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                        if (ImGui.Button("Save")) {
                            ref.Colors[i].Copy(style.Colors[i]);
                        }
                        ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                        if (ImGui.Button("Revert")) {
                            style.Colors[i].Copy(ref.Colors[i]);
                        }
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
                HelpMarker("Read FAQ and docs/FONTS.md for details on font loading.");
                /*ImGui.*/ ShowFontAtlas(atlas);
                // Post-baking font scaling. Note that this is NOT the nice way of scaling fonts, read below.
                // (we enforce hard clamping manually as by default DragFloat/SliderFloat allows CTRL+Click text to get out of bounds).
                const MIN_SCALE = 0.3;
                const MAX_SCALE = 2.0;
                HelpMarker("Those are old settings provided for convenience.\n" +
                    "However, the _correct_ way of scaling your UI is currently to reload your font at the designed size, " +
                    "rebuild the font atlas, and call style.ScaleAllSizes() on a reference ImGui.Style structure.\n" +
                    "Using those settings here will give you poor quality results.");
                const window_scale = STATIC(UNIQUE("window_scale#23b8388b"), 1.0);
                ImGui.PushItemWidth(ImGui.GetFontSize() * 8);
                if (ImGui.DragFloat("window scale", window_scale.access, 0.005, MIN_SCALE, MAX_SCALE, "%.2f", ImGui.SliderFlags.AlwaysClamp)) // Scale only this window
                    ImGui.SetWindowFontScale(window_scale.value);
                ImGui.DragFloat("global scale", (_ = io.FontGlobalScale) => io.FontGlobalScale = _, 0.005, MIN_SCALE, MAX_SCALE, "%.2f", ImGui.SliderFlags.AlwaysClamp); // Scale everything
                ImGui.PopItemWidth();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Rendering")) {
                ImGui.Checkbox("Anti-aliased lines", (_ = style.AntiAliasedLines) => style.AntiAliasedLines = _);
                ImGui.SameLine();
                HelpMarker("When disabling anti-aliasing lines, you'll probably want to disable borders in your style as well.");
                ImGui.Checkbox("Anti-aliased lines use texture", (_ = style.AntiAliasedLinesUseTex) => style.AntiAliasedLinesUseTex = _);
                ImGui.SameLine();
                HelpMarker("Faster lines using texture data. Require backend to render with bilinear filtering (not point/nearest filtering).");
                ImGui.Checkbox("Anti-aliased fill", (_ = style.AntiAliasedFill) => style.AntiAliasedFill = _);
                ImGui.PushItemWidth(ImGui.GetFontSize() * 8);
                ImGui.DragFloat("Curve Tessellation Tolerance", (_ = style.CurveTessellationTol) => style.CurveTessellationTol = _, 0.02, 0.10, 10.0, "%.2f");
                if (style.CurveTessellationTol < 0.10)
                    style.CurveTessellationTol = 0.10;
                // When editing the "Circle Segment Max Error" value, draw a preview of its effect on auto-tessellated circles.
                ImGui.DragFloat("Circle Tessellation Max Error", (_ = style.CircleTessellationMaxError) => style.CircleTessellationMaxError = _, 0.005, 0.10, 5.0, "%.2f", ImGui.SliderFlags.AlwaysClamp);
                if (ImGui.IsItemActive()) {
                    ImGui.SetNextWindowPos(ImGui.GetCursorScreenPos());
                    ImGui.BeginTooltip();
                    ImGui.TextUnformatted("(R = radius, N = number of segments)");
                    ImGui.Spacing();
                    const draw_list = ImGui.GetWindowDrawList();
                    const min_widget_width = ImGui.CalcTextSize("N: MMM\nR: MMM").x;
                    for (let n = 0; n < 8; n++) {
                        const RAD_MIN = 5.0;
                        const RAD_MAX = 70.0;
                        const rad = RAD_MIN + (RAD_MAX - RAD_MIN) * n / (8.0 - 1.0);
                        ImGui.BeginGroup();
                        ImGui.Text(`R: ${rad}\nN: ${draw_list._CalcCircleAutoSegmentCount(rad)}`);
                        const canvas_width = IM_MAX(min_widget_width, rad * 2.0);
                        const offset_x = Math.floor(canvas_width * 0.5);
                        const offset_y = Math.floor(RAD_MAX);
                        const p1 = ImGui.GetCursorScreenPos();
                        draw_list.AddCircle(new ImGui.Vec2(p1.x + offset_x, p1.y + offset_y), rad, ImGui.GetColorU32(ImGui.Col.Text));
                        ImGui.Dummy(new ImGui.Vec2(canvas_width, RAD_MAX * 2));
                        /*
                        const ImVec2 p2 = ImGui::GetCursorScreenPos();
                        draw_list->AddCircleFilled(ImVec2(p2.x + offset_x, p2.y + offset_y), rad, ImGui::GetColorU32(ImGuiCol_Text));
                        ImGui::Dummy(ImVec2(canvas_width, RAD_MAX * 2));
                        */
                        ImGui.EndGroup();
                        ImGui.SameLine();
                    }
                    ImGui.EndTooltip();
                }
                ImGui.SameLine();
                HelpMarker("When drawing circle primitives with \"num_segments === 0\" tesselation will be calculated automatically.");
                ImGui.DragFloat("Global Alpha", (_ = style.Alpha) => style.Alpha = _, 0.005, 0.20, 1.0, "%.2f"); // Not exposing zero here so user doesn't "lose" the UI (zero alpha clips all widgets). But application code could have a toggle to switch between zero and non-zero.
                ImGui.DragFloat("Disabled Alpha", (_ = style.DisabledAlpha) => style.DisabledAlpha = _, 0.005, 0.0, 1.0, "%.2f");
                ImGui.SameLine();
                HelpMarker("Additional alpha multiplier for disabled items (multiply over current value of Alpha).");
                ImGui.PopItemWidth();
                ImGui.EndTabItem();
            }
            ImGui.EndTabBar();
        }
        ImGui.PopItemWidth();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Main Menu Bar / ShowExampleAppMainMenuBar()
    //-----------------------------------------------------------------------------
    // - ShowExampleAppMainMenuBar()
    // - ShowExampleMenuFile()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a "main" fullscreen menu bar and populating it.
    // Note the difference between BeginMainMenuBar() and BeginMenuBar():
    // - BeginMenuBar() = menu-bar inside current window (which needs the ImGui.WindowFlags.MenuBar flag!)
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
    // Note that shortcuts are currently provided for display only
    // (future version will add explicit flags to BeginMenu() to request processing shortcuts)
    function ShowExampleMenuFile() {
        IMGUI_DEMO_MARKER("Examples/Menu");
        ImGui.MenuItem("(demo menu)", null, false, false);
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
        IMGUI_DEMO_MARKER("Examples/Menu/Options");
        if (ImGui.BeginMenu("Options")) {
            const enabled = STATIC(UNIQUE("enabled#5f4b3785"), true);
            ImGui.MenuItem("Enabled", "", enabled.access);
            ImGui.BeginChild("child", new ImGui.Vec2(0, 60), true);
            for (let i = 0; i < 10; i++)
                ImGui.Text(`Scrolling Text ${i}`);
            ImGui.EndChild();
            const f = STATIC(UNIQUE("f#cddcae77"), 0.5);
            const n = STATIC(UNIQUE("n#e3c8fe24"), 0);
            ImGui.SliderFloat("Value", f.access, 0.0, 1.0);
            ImGui.InputFloat("Input", f.access, 0.1);
            ImGui.Combo("Combo", n.access, "Yes\0No\0Maybe\0\0");
            ImGui.EndMenu();
        }
        IMGUI_DEMO_MARKER("Examples/Menu/Colors");
        if (ImGui.BeginMenu("Colors")) {
            const sz = ImGui.GetTextLineHeight();
            for (let i = 0; i < ImGui.Col.COUNT; i++) {
                const name = ImGui.GetStyleColorName(i);
                const p = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(p, new ImGui.Vec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i));
                ImGui.Dummy(new ImGui.Vec2(sz, sz));
                ImGui.SameLine();
                ImGui.MenuItem(name);
            }
            ImGui.EndMenu();
        }
        // Here we demonstrate appending again to the "Options" menu (which we already created above)
        // Of course in this demo it is a little bit silly that this function calls BeginMenu("Options") twice.
        // In a real code-base using it would make senses to use this feature from very different code locations.
        if (ImGui.BeginMenu("Options")) // <-- Append!
         {
            IMGUI_DEMO_MARKER("Examples/Menu/Append to an existing menu");
            const b = STATIC(UNIQUE("b#d9276246"), true);
            ImGui.Checkbox("SomeOption", b.access);
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Disabled", false)) // Disabled
         {
            ImGui.ASSERT(0);
        }
        if (ImGui.MenuItem("Checked", null, true)) { }
        if (ImGui.MenuItem("Quit", "Alt+F4")) {
            done = true;
        }
    }
    function ShowExampleAppConsole(p_open) {
        const console = STATIC(UNIQUE("console#84209ec1"), new ExampleAppConsole());
        console.value.Draw("Example: Console", p_open);
    }
    // Demonstrate creating a simple log window with basic filtering.
    function ShowExampleAppLog(p_open) {
        const log = STATIC(UNIQUE("log#64c1f1c1"), new ExampleAppLog());
        // For the demo: add a debug button _BEFORE_ the normal log window contents
        // We take advantage of a rarely used feature: multiple calls to Begin()/End() are appending to the _same_ window.
        // Most of the contents of the window will be added by the log.Draw() call.
        ImGui.SetNextWindowSize(new ImGui.Vec2(500, 400), ImGui.Cond.FirstUseEver);
        ImGui.Begin("Example: Log", p_open);
        IMGUI_DEMO_MARKER("Examples/Log");
        if (ImGui.SmallButton("[Debug] Add 5 entries")) {
            const counter = STATIC(UNIQUE("counter#b459af44"), 0);
            const categories = ["info", "warn", "error"];
            const words = ["Bumfuzzled", "Cattywampus", "Snickersnee", "Abibliophobia", "Absquatulate", "Nincompoop", "Pauciloquent"];
            for (let n = 0; n < 5; n++) {
                const category = categories[counter.value % ImGui.ARRAYSIZE(categories)];
                const word = words[counter.value % ImGui.ARRAYSIZE(words)];
                log.value.AddLog(`[${ImGui.GetFrameCount().toString().padStart(5, "0")}] [${category}] Hello, current time is ${ImGui.GetTime().toFixed(1)}, here's a word: '${word}'\n`);
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
        ImGui.SetNextWindowSize(new ImGui.Vec2(500, 440), ImGui.Cond.FirstUseEver);
        if (ImGui.Begin("Example: Simple layout", p_open, ImGui.WindowFlags.MenuBar)) {
            IMGUI_DEMO_MARKER("Examples/Simple layout");
            if (ImGui.BeginMenuBar()) {
                if (ImGui.BeginMenu("File")) {
                    if (ImGui.MenuItem("Close"))
                        p_open(false);
                    ImGui.EndMenu();
                }
                ImGui.EndMenuBar();
            }
            // Left
            const selected = STATIC(UNIQUE("selected#079abfa7"), 0);
            {
                ImGui.BeginChild("left pane", new ImGui.Vec2(150, 0), true);
                for (let i = 0; i < 100; i++) {
                    // FIXME: Good candidate to use ImGuiSelectableFlags_SelectOnNav
                    const label = `MyObject ${i}`;
                    if (ImGui.Selectable(label, selected.value === i))
                        selected.value = i;
                }
                ImGui.EndChild();
            }
            ImGui.SameLine();
            // Right
            {
                ImGui.BeginGroup();
                ImGui.BeginChild("item view", new ImGui.Vec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
                ImGui.Text(`MyObject: ${selected.value}`);
                ImGui.Separator();
                if (ImGui.BeginTabBar("##Tabs", ImGui.TabBarFlags.None)) {
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
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Property Editor / ShowExampleAppPropertyEditor()
    //-----------------------------------------------------------------------------
    function ShowPlaceholderObject(prefix, uid) {
        // Use object uid as identifier. Most commonly you could also use the object pointer as a base ID.
        ImGui.PushID(uid);
        // Text and Tree nodes are less high than framed widgets, using AlignTextToFramePadding() we add vertical spacing to make the tree lines equal high.
        ImGui.TableNextRow();
        ImGui.TableSetColumnIndex(0);
        ImGui.AlignTextToFramePadding();
        const node_open = ImGui.TreeNode("Object", `${prefix}_${uid}`);
        ImGui.TableSetColumnIndex(1);
        ImGui.Text("my sailor is rich");
        if (node_open) {
            const placeholder_members = STATIC_ARRAY(8, UNIQUE("placeholder_members#9a0bf6da"), [0.0, 0.0, 1.0, 3.1416, 100.0, 999.0]);
            for (let i = 0; i < 8; i++) {
                ImGui.PushID(i); // Use field index as identifier.
                if (i < 2) {
                    ShowPlaceholderObject("Child", 424242);
                }
                else {
                    // Here we use a TreeNode to highlight on hover (we could use e.g. Selectable as well)
                    ImGui.TableNextRow();
                    ImGui.TableSetColumnIndex(0);
                    ImGui.AlignTextToFramePadding();
                    const flags = ImGui.TreeNodeFlags.Leaf | ImGui.TreeNodeFlags.NoTreePushOnOpen | ImGui.TreeNodeFlags.Bullet;
                    ImGui.TreeNodeEx("Field", flags, `Field_${i}`);
                    ImGui.TableSetColumnIndex(1);
                    ImGui.SetNextItemWidth(-FLT_MIN);
                    if (i >= 5)
                        ImGui.InputFloat("##value", placeholder_members.access(i), 1.0);
                    else
                        ImGui.DragFloat("##value", placeholder_members.access(i), 0.01);
                    ImGui.NextColumn();
                }
                ImGui.PopID();
            }
            ImGui.TreePop();
        }
        ImGui.PopID();
    }
    // Demonstrate create a simple property editor.
    function ShowExampleAppPropertyEditor(p_open) {
        ImGui.SetNextWindowSize(new ImGui.Vec2(430, 450), ImGui.Cond.FirstUseEver);
        if (!ImGui.Begin("Example: Property editor", p_open)) {
            ImGui.End();
            return;
        }
        IMGUI_DEMO_MARKER("Examples/Property Editor");
        HelpMarker("This example shows how you may implement a property editor using two columns.\n" +
            "All objects/fields data are dummies here.\n" +
            "Remember that in many simple cases, you can use ImGui.SameLine(xxx) to position\n" +
            "your cursor horizontally instead of using the Columns() API.");
        ImGui.PushStyleVar(ImGui.StyleVar.FramePadding, new ImGui.Vec2(2, 2));
        if (ImGui.BeginTable("split", 2, ImGui.TableFlags.BordersOuter | ImGui.TableFlags.Resizable)) {
            // Iterate placeholder objects (all the same data)
            for (let obj_i = 0; obj_i < 4; obj_i++) {
                ShowPlaceholderObject("Object", obj_i);
                //ImGui.Separator();
            }
            ImGui.EndTable();
        }
        ImGui.PopStyleVar();
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Long Text / ShowExampleAppLongText()
    //-----------------------------------------------------------------------------
    // Demonstrate/test rendering huge amount of text, and the incidence of clipping.
    function ShowExampleAppLongText(p_open) {
        ImGui.SetNextWindowSize(new ImGui.Vec2(520, 600), ImGui.Cond.FirstUseEver);
        if (!ImGui.Begin("Example: Long text display", p_open)) {
            ImGui.End();
            return;
        }
        IMGUI_DEMO_MARKER("Examples/Long text display");
        const test_type = STATIC(UNIQUE("test_type#744ee350"), 0);
        const log = STATIC(UNIQUE("log#1c9419eb"), new ImGui.TextBuffer());
        const lines = STATIC(UNIQUE("lines#a26d2454"), 0);
        ImGui.Text("Printing unusually long amount of text.");
        ImGui.Combo("Test type", test_type.access, "Single call to TextUnformatted()\0" +
            "Multiple calls to Text(), clipped\0" +
            "Multiple calls to Text(), not clipped (slow)\0");
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
                ImGui.TextUnformatted(log.value.Buf);
                break;
            case 1:
                {
                    // Multiple calls to Text(), manually coarsely clipped - demonstrate how to use the ImGui.ListClipper helper.
                    ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(0, 0));
                    const clipper = new ImGui.ListClipper();
                    clipper.Begin(lines.value);
                    while (clipper.Step())
                        for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                            ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                    ImGui.PopStyleVar();
                    break;
                }
            case 2:
                // Multiple calls to Text(), not clipped (slow)
                ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(0, 0));
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
        IMGUI_DEMO_MARKER("Examples/Auto-resizing window");
        const lines = STATIC(UNIQUE("lines#5ebf3fd4"), 10);
        ImGui.TextUnformatted("Window will resize every-frame to the size of its content.\n" +
            "Note that you probably don't want to query the window size to\n" +
            "output your content because that would create a feedback loop.");
        ImGui.SliderInt("Number of lines", lines.access, 1, 20);
        for (let i = 0; i < lines.value; i++)
            ImGui.Text(`${"".padStart(i * 4)}This is line ${i}`); // Pad with space to extend size horizontally
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Constrained Resize / ShowExampleAppConstrainedResize()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a window with custom resize constraints.
    function ShowExampleAppConstrainedResize(p_open) {
        class CustomConstraints {
            // Helper functions to demonstrate programmatic constraints
            static Square(data) { data.DesiredSize.x = data.DesiredSize.y = IM_MAX(data.DesiredSize.x, data.DesiredSize.y); }
            static Step(data) { const step = data.UserData; data.DesiredSize.Set(Math.floor /*(int)*/(data.DesiredSize.x / step + 0.5) * step, Math.floor /*(int)*/(data.DesiredSize.y / step + 0.5) * step); }
        }
        const test_desc = [
            "Resize vertical only",
            "Resize horizontal only",
            "Width > 100, Height > 100",
            "Width 400-500",
            "Height 400-500",
            "Custom: Always Square",
            "Custom: Fixed Steps (100)",
        ];
        const auto_resize = STATIC(UNIQUE("auto_resize#3fd1e552"), false);
        const type = STATIC(UNIQUE("type#2ea441c9"), 0);
        const display_lines = STATIC(UNIQUE("display_lines#154bc4b5"), 10);
        if (type.value === 0)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(-1, 0), new ImGui.Vec2(-1, FLT_MAX)); // Vertical only
        if (type.value === 1)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(0, -1), new ImGui.Vec2(FLT_MAX, -1)); // Horizontal only
        if (type.value === 2)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(100, 100), new ImGui.Vec2(FLT_MAX, FLT_MAX)); // Width > 100, Height > 100
        if (type.value === 3)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(400, -1), new ImGui.Vec2(500, -1)); // Width 400-500
        if (type.value === 4)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(-1, 400), new ImGui.Vec2(-1, 500)); // Height 400-500
        if (type.value === 5)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(0, 0), new ImGui.Vec2(FLT_MAX, FLT_MAX), CustomConstraints.Square); // Always Square
        if (type.value === 6)
            ImGui.SetNextWindowSizeConstraints(new ImGui.Vec2(0, 0), new ImGui.Vec2(FLT_MAX, FLT_MAX), CustomConstraints.Step, /*(void*)(intptr_t)*/ 100); // Fixed Step
        const flags = auto_resize ? ImGui.WindowFlags.AlwaysAutoResize : 0;
        if (ImGui.Begin("Example: Constrained Resize", p_open, flags)) {
            IMGUI_DEMO_MARKER("Examples/Constrained Resizing window");
            if (ImGui.Button("200x200")) {
                ImGui.SetWindowSize(new ImGui.Vec2(200, 200));
            }
            ImGui.SameLine();
            if (ImGui.Button("500x500")) {
                ImGui.SetWindowSize(new ImGui.Vec2(500, 500));
            }
            ImGui.SameLine();
            if (ImGui.Button("800x200")) {
                ImGui.SetWindowSize(new ImGui.Vec2(800, 200));
            }
            ImGui.SetNextItemWidth(200);
            ImGui.Combo("Constraint", type.access, test_desc, ImGui.ARRAYSIZE(test_desc));
            ImGui.SetNextItemWidth(200);
            ImGui.DragInt("Lines", display_lines.access, 0.2, 1, 100);
            ImGui.Checkbox("Auto-resize", auto_resize.access);
            for (let i = 0; i < display_lines.value; i++)
                ImGui.Text(`${"".padStart(i * 4)}Hello, sailor! Making this line long enough for the example.`);
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Simple overlay / ShowExampleAppSimpleOverlay()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a simple static window with no decoration
    // + a context-menu to choose which corner of the screen to use.
    function ShowExampleAppSimpleOverlay(p_open) {
        const corner = STATIC(UNIQUE("corner#63044b6f"), 0);
        const io = ImGui.GetIO();
        let window_flags = ImGui.WindowFlags.NoDecoration | ImGui.WindowFlags.AlwaysAutoResize | ImGui.WindowFlags.NoSavedSettings | ImGui.WindowFlags.NoFocusOnAppearing | ImGui.WindowFlags.NoNav;
        if (corner.value !== -1) {
            const PAD = 10.0;
            const viewport = ImGui.GetMainViewport();
            const work_pos = viewport.WorkPos; // Use work area to avoid menu-bar/task-bar, if any!
            const work_size = viewport.WorkSize;
            const window_pos = new ImGui.Vec2();
            const window_pos_pivot = new ImGui.Vec2();
            window_pos.x = (corner.value & 1) ? (work_pos.x + work_size.x - PAD) : (work_pos.x + PAD);
            window_pos.y = (corner.value & 2) ? (work_pos.y + work_size.y - PAD) : (work_pos.y + PAD);
            window_pos_pivot.x = (corner.value & 1) ? 1.0 : 0.0;
            window_pos_pivot.y = (corner.value & 2) ? 1.0 : 0.0;
            ImGui.SetNextWindowPos(window_pos, ImGui.Cond.Always, window_pos_pivot);
            window_flags |= ImGui.WindowFlags.NoMove;
        }
        ImGui.SetNextWindowBgAlpha(0.35); // Transparent background
        if (ImGui.Begin("Example: Simple overlay", p_open, window_flags)) {
            IMGUI_DEMO_MARKER("Examples/Simple Overlay");
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
                if (p_open && ImGui.MenuItem("Close"))
                    p_open(false);
                ImGui.EndPopup();
            }
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Fullscreen window / ShowExampleAppFullscreen()
    //-----------------------------------------------------------------------------
    // Demonstrate creating a window covering the entire screen/viewport
    function ShowExampleAppFullscreen(p_open) {
        const use_work_area = STATIC(UNIQUE("use_work_area#63044b6f"), true);
        const flags = STATIC(UNIQUE("flags#63044b6f"), ImGui.WindowFlags.NoDecoration | ImGui.WindowFlags.NoMove | ImGui.WindowFlags.NoResize | ImGui.WindowFlags.NoSavedSettings);
        // We demonstrate using the full viewport area or the work area (without menu-bars, task-bars etc.)
        // Based on your use case you may want one of the other.
        const viewport = ImGui.GetMainViewport();
        ImGui.SetNextWindowPos(use_work_area.value ? viewport.WorkPos : viewport.Pos);
        ImGui.SetNextWindowSize(use_work_area.value ? viewport.WorkSize : viewport.Size);
        if (ImGui.Begin("Example: Fullscreen window", p_open, flags.value)) {
            ImGui.Checkbox("Use work area instead of main area", use_work_area.access);
            ImGui.SameLine();
            HelpMarker("Main Area = entire viewport,\nWork Area = entire viewport minus sections used by the main menu bars, task bars etc.\n\nEnable the main-menu bar in Examples menu to see the difference.");
            ImGui.CheckboxFlags("ImGui.WindowFlags.NoBackground", flags.access, ImGui.WindowFlags.NoBackground);
            ImGui.CheckboxFlags("ImGui.WindowFlags.NoDecoration", flags.access, ImGui.WindowFlags.NoDecoration);
            ImGui.Indent();
            ImGui.CheckboxFlags("ImGui.WindowFlags.NoTitleBar", flags.access, ImGui.WindowFlags.NoTitleBar);
            ImGui.CheckboxFlags("ImGui.WindowFlags.NoCollapse", flags.access, ImGui.WindowFlags.NoCollapse);
            ImGui.CheckboxFlags("ImGui.WindowFlags.NoScrollbar", flags.access, ImGui.WindowFlags.NoScrollbar);
            ImGui.Unindent();
            if (p_open && ImGui.Button("Close this window"))
                p_open(false); // *p_open = false;
        }
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Manipulating Window Titles / ShowExampleAppWindowTitles()
    //-----------------------------------------------------------------------------
    // Demonstrate using "##" and "###" in identifiers to manipulate ID generation.
    // This apply to all regular items as well.
    // Read FAQ section "How can I have multiple widgets with the same label?" for details.
    function ShowExampleAppWindowTitles(p_open) {
        const viewport = ImGui.GetMainViewport();
        const base_pos = viewport.Pos;
        // By default, Windows are uniquely identified by their title.
        // You can use the "##" and "###" markers to manipulate the display/ID.
        // Using "##" to display same title but have unique identifier.
        ImGui.SetNextWindowPos(new ImGui.Vec2(base_pos.x + 100, base_pos.y + 100), ImGui.Cond.FirstUseEver);
        ImGui.Begin("Same title as another window##1");
        IMGUI_DEMO_MARKER("Examples/Manipulating window titles");
        ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
        ImGui.End();
        ImGui.SetNextWindowPos(new ImGui.Vec2(base_pos.x + 100, base_pos.y + 200), ImGui.Cond.FirstUseEver);
        ImGui.Begin("Same title as another window##2");
        ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
        ImGui.End();
        // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
        const buf = `Animated title ${"|/-\\"[Math.floor /*(int)*/(ImGui.GetTime() / 0.25) & 3]} ${ImGui.GetFrameCount()}###AnimatedTitle`;
        ImGui.SetNextWindowPos(new ImGui.Vec2(base_pos.x + 100, base_pos.y + 300), ImGui.Cond.FirstUseEver);
        ImGui.Begin(buf);
        ImGui.Text("This window has a changing title.");
        ImGui.End();
    }
    //-----------------------------------------------------------------------------
    // [SECTION] Example App: Custom Rendering using ImDrawList API / ShowExampleAppCustomRendering()
    //-----------------------------------------------------------------------------
    // Demonstrate using the low-level ImDrawList to draw custom shapes.
    function ShowExampleAppCustomRendering(p_open) {
        if (!ImGui.Begin("Example: Custom rendering", p_open)) {
            ImGui.End();
            return;
        }
        IMGUI_DEMO_MARKER("Examples/Custom Rendering");
        // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of
        // overloaded operators, etc. Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your
        // types and ImGui.Vec2/ImGui.Vec4. Dear ImGui defines overloaded operators but they are internal to imgui.cpp and not
        // exposed outside (to avoid messing with your types) In this example we are not using the maths operators!
        if (ImGui.BeginTabBar("##TabBar")) {
            if (ImGui.BeginTabItem("Primitives")) {
                ImGui.PushItemWidth(-ImGui.GetFontSize() * 15);
                const draw_list = ImGui.GetWindowDrawList();
                // Draw gradients
                // (note that those are currently exacerbating our sRGB/Linear issues)
                // Calling ImGui.GetColorU32() multiplies the given colors by the current Style Alpha, but you may pass the ImGui.COL32() directly as well..
                ImGui.Text("Gradients");
                const gradient_size = new ImGui.Vec2(ImGui.CalcItemWidth(), ImGui.GetFrameHeight());
                {
                    const p0 = ImGui.GetCursorScreenPos();
                    const p1 = new ImGui.Vec2(p0.x + gradient_size.x, p0.y + gradient_size.y);
                    const col_a = ImGui.GetColorU32(ImGui.COL32(0, 0, 0, 255));
                    const col_b = ImGui.GetColorU32(ImGui.COL32(255, 255, 255, 255));
                    draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_b, col_b, col_a);
                    ImGui.InvisibleButton("##gradient1", gradient_size);
                }
                {
                    const p0 = ImGui.GetCursorScreenPos();
                    const p1 = new ImGui.Vec2(p0.x + gradient_size.x, p0.y + gradient_size.y);
                    const col_a = ImGui.GetColorU32(ImGui.COL32(0, 255, 0, 255));
                    const col_b = ImGui.GetColorU32(ImGui.COL32(255, 0, 0, 255));
                    draw_list.AddRectFilledMultiColor(p0, p1, col_a, col_b, col_b, col_a);
                    ImGui.InvisibleButton("##gradient2", gradient_size);
                }
                // Draw a bunch of primitives
                ImGui.Text("All primitives");
                const sz = STATIC(UNIQUE("sz#83665c0c"), 36.0);
                const thickness = STATIC(UNIQUE("thickness#1b3baad0"), 3.0);
                const ngon_sides = STATIC(UNIQUE("ngon_sides#a184dd3b"), 6);
                const circle_segments_override = STATIC(UNIQUE("circle_segments_override#f5946c4d"), false);
                const circle_segments_override_v = STATIC(UNIQUE("circle_segments_override_v#8ae75d44"), 12);
                const curve_segments_override = STATIC(UNIQUE("curve_segments_override#4bc9456e"), false);
                const curve_segments_override_v = STATIC(UNIQUE("curve_segments_override_v#c0102a7a"), 8);
                const colf = STATIC(UNIQUE("colf#379f26e6"), new ImGui.Vec4(1.0, 1.0, 0.4, 1.0));
                ImGui.DragFloat("Size", sz.access, 0.2, 2.0, 100.0, "%.0f");
                ImGui.DragFloat("Thickness", thickness.access, 0.05, 1.0, 8.0, "%.02f");
                ImGui.SliderInt("N-gon sides", ngon_sides.access, 3, 12);
                ImGui.Checkbox("##circlesegmentoverride", circle_segments_override.access);
                ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                if (ImGui.SliderInt("Circle segments override", circle_segments_override_v.access, 3, 40)) {
                    circle_segments_override.value = true;
                }
                ImGui.Checkbox("##curvessegmentoverride", curve_segments_override.access);
                ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                if (ImGui.SliderInt("Curves segments override", curve_segments_override_v.access, 3, 40)) {
                    curve_segments_override.value = true;
                }
                ImGui.ColorEdit4("Color", colf.value);
                const p = ImGui.GetCursorScreenPos();
                const col = new ImGui.Color(colf.value).toImU32();
                const spacing = 10.0;
                const corners_tl_br = ImGui.DrawFlags.RoundCornersTopLeft | ImGui.DrawFlags.RoundCornersBottomRight;
                const rounding = sz.value / 5.0;
                const circle_segments = circle_segments_override.value ? circle_segments_override_v.value : 0;
                const curve_segments = curve_segments_override.value ? curve_segments_override_v.value : 0;
                let x = p.x + 4.0;
                let y = p.y + 4.0;
                for (let n = 0; n < 2; n++) {
                    // First line uses a thickness of 1.0, second line uses the configurable thickness
                    const th = (n === 0) ? 1.0 : thickness.value;
                    draw_list.AddNgon(new ImGui.Vec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col, ngon_sides.value, th);
                    x += sz.value + spacing; // N-gon
                    draw_list.AddCircle(new ImGui.Vec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col, circle_segments, th);
                    x += sz.value + spacing; // Circle
                    draw_list.AddRect(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, 0.0, ImGui.DrawFlags.None, th);
                    x += sz.value + spacing; // Square
                    draw_list.AddRect(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, rounding, ImGui.DrawFlags.None, th);
                    x += sz.value + spacing; // Square with all rounded corners
                    draw_list.AddRect(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, rounding, corners_tl_br, th);
                    x += sz.value + spacing; // Square with two rounded corners
                    draw_list.AddTriangle(new ImGui.Vec2(x + sz.value * 0.5, y), new ImGui.Vec2(x + sz.value, y + sz.value - 0.5), new ImGui.Vec2(x, y + sz.value - 0.5), col, th);
                    x += sz.value + spacing; // Triangle
                    //draw_list.AddTriangle(new ImGui.Vec2(x+sz.value*0.2,y), new ImGui.Vec2(x, y+sz.value-0.5), new ImGui.Vec2(x+sz.value*0.4, y+sz.value-0.5), col, th);x+= sz.value*0.4 + spacing; // Thin triangle
                    draw_list.AddLine(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y), col, th);
                    x += sz.value + spacing; // Horizontal line (note: drawing a filled rectangle will be faster!)
                    draw_list.AddLine(new ImGui.Vec2(x, y), new ImGui.Vec2(x, y + sz.value), col, th);
                    x += spacing; // Vertical line (note: drawing a filled rectangle will be faster!)
                    draw_list.AddLine(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, th);
                    x += sz.value + spacing; // Diagonal line
                    // Quadratic Bezier Curve (3 control points)
                    const cp3 = [new ImGui.Vec2(x, y + sz.value * 0.6), new ImGui.Vec2(x + sz.value * 0.5, y - sz.value * 0.4), new ImGui.Vec2(x + sz.value, y + sz.value)];
                    draw_list.AddBezierQuadratic(cp3[0], cp3[1], cp3[2], col, th, curve_segments);
                    x += sz.value + spacing;
                    // Cubic Bezier Curve (4 control points)
                    const cp4 = [new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value * 1.3, y + sz.value * 0.3), new ImGui.Vec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new ImGui.Vec2(x + sz.value, y + sz.value)];
                    draw_list.AddBezierCubic(cp4[0], cp4[1], cp4[2], cp4[3], col, th, curve_segments);
                    x = p.x + 4;
                    y += sz.value + spacing;
                }
                draw_list.AddNgonFilled(new ImGui.Vec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col, ngon_sides.value);
                x += sz.value + spacing; // N-gon
                draw_list.AddCircleFilled(new ImGui.Vec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col, circle_segments);
                x += sz.value + spacing; // Circle
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col);
                x += sz.value + spacing; // Square
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, 10.0);
                x += sz.value + spacing; // Square with all rounded corners
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), col, 10.0, corners_tl_br);
                x += sz.value + spacing; // Square with two rounded corners
                draw_list.AddTriangleFilled(new ImGui.Vec2(x + sz.value * 0.5, y), new ImGui.Vec2(x + sz.value, y + sz.value - 0.5), new ImGui.Vec2(x, y + sz.value - 0.5), col);
                x += sz.value + spacing; // Triangle
                //draw_list.AddTriangleFilled(new ImGui.Vec2(x+sz.value*0.2,y), new ImGui.Vec2(x, y+sz.value-0.5), new ImGui.Vec2(x+sz.value*0.4, y+sz.value-0.5), col); x += sz.value*0.4 + spacing; // Thin triangle
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + thickness.value), col);
                x += sz.value + spacing; // Horizontal line (faster than AddLine, but only handle integer thickness)
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + thickness.value, y + sz.value), col);
                x += spacing * 2.0; // Vertical line (faster than AddLine, but only handle integer thickness)
                draw_list.AddRectFilled(new ImGui.Vec2(x, y), new ImGui.Vec2(x + 1, y + 1), col);
                x += sz.value; // Pixel (faster than AddLine)
                draw_list.AddRectFilledMultiColor(new ImGui.Vec2(x, y), new ImGui.Vec2(x + sz.value, y + sz.value), ImGui.COL32(0, 0, 0, 255), ImGui.COL32(255, 0, 0, 255), ImGui.COL32(255, 255, 0, 255), ImGui.COL32(0, 255, 0, 255));
                ImGui.Dummy(new ImGui.Vec2((sz.value + spacing) * 10.2, (sz.value + spacing) * 3.0));
                ImGui.PopItemWidth();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("Canvas")) {
                const points = STATIC(UNIQUE("points#a04ba04e"), new ImGui.Vector());
                const scrolling = STATIC(UNIQUE("scrolling#f5569b88"), new ImGui.Vec2(0.0, 0.0));
                const opt_enable_grid = STATIC(UNIQUE("opt_enable_grid#874bd734"), true);
                const opt_enable_context_menu = STATIC(UNIQUE("opt_enable_context_menu#8733fbe9"), true);
                const adding_line = STATIC(UNIQUE("adding_line#306a0717"), false);
                ImGui.Checkbox("Enable grid", opt_enable_grid.access);
                ImGui.Checkbox("Enable context menu", opt_enable_context_menu.access);
                ImGui.Text("Mouse Left: drag to add lines,\nMouse Right: drag to scroll, click for context menu.");
                // Typically you would use a BeginChild()/EndChild() pair to benefit from a clipping region + own scrolling.
                // Here we demonstrate that this can be replaced by simple offsetting + custom drawing + PushClipRect/PopClipRect() calls.
                // To use a child window instead we could use, e.g:
                //      ImGui.PushStyleVar(ImGui.StyleVar.WindowPadding, new ImGui.Vec2(0, 0));      // Disable padding
                //      ImGui.PushStyleColor(ImGui.Col.ChildBg, ImGui.COL32(50, 50, 50, 255));  // Set a background color
                //      ImGui.BeginChild("canvas", new ImGui.Vec2(0.0, 0.0), true, ImGui.WindowFlags.NoMove);
                //      ImGui.PopStyleColor();
                //      ImGui.PopStyleVar();
                //      [...]
                //      ImGui.EndChild();
                // Using InvisibleButton() as a convenience 1) it will advance the layout cursor and 2) allows us to use IsItemHovered()/IsItemActive()
                const canvas_p0 = ImGui.GetCursorScreenPos(); // ImDrawList API uses screen coordinates!
                const canvas_sz = ImGui.GetContentRegionAvail(); // Resize canvas to what's available
                if (canvas_sz.x < 50.0)
                    canvas_sz.x = 50.0;
                if (canvas_sz.y < 50.0)
                    canvas_sz.y = 50.0;
                const canvas_p1 = new ImGui.Vec2(canvas_p0.x + canvas_sz.x, canvas_p0.y + canvas_sz.y);
                // Draw border and background color
                const io = ImGui.GetIO();
                const draw_list = ImGui.GetWindowDrawList();
                draw_list.AddRectFilled(canvas_p0, canvas_p1, ImGui.COL32(50, 50, 50, 255));
                draw_list.AddRect(canvas_p0, canvas_p1, ImGui.COL32(255, 255, 255, 255));
                // This will catch our interactions
                ImGui.InvisibleButton("canvas", canvas_sz, ImGui.ButtonFlags.MouseButtonLeft | ImGui.ButtonFlags.MouseButtonRight);
                const is_hovered = ImGui.IsItemHovered(); // Hovered
                const is_active = ImGui.IsItemActive(); // Held
                const origin = new ImGui.Vec2(canvas_p0.x + scrolling.value.x, canvas_p0.y + scrolling.value.y); // Lock scrolled origin
                const mouse_pos_in_canvas = new ImGui.Vec2(io.MousePos.x - origin.x, io.MousePos.y - origin.y);
                // Add first and second point
                if (is_hovered && !adding_line.value && ImGui.IsMouseClicked(ImGui.MouseButton.Left)) {
                    points.value.push_back(new ImGui.Vec2().Copy(mouse_pos_in_canvas));
                    points.value.push_back(new ImGui.Vec2().Copy(mouse_pos_in_canvas));
                    adding_line.value = true;
                }
                if (adding_line.value) {
                    points.value.back().Copy(mouse_pos_in_canvas); // points.back() = mouse_pos_in_canvas;
                    if (!ImGui.IsMouseDown(ImGui.MouseButton.Left))
                        adding_line.value = false;
                }
                // Pan (we use a zero mouse threshold when there's no context menu)
                // You may decide to make that threshold dynamic based on whether the mouse is hovering something etc.
                const mouse_threshold_for_pan = opt_enable_context_menu ? -1.0 : 0.0;
                if (is_active && ImGui.IsMouseDragging(ImGui.MouseButton.Right, mouse_threshold_for_pan)) {
                    scrolling.value.x += io.MouseDelta.x;
                    scrolling.value.y += io.MouseDelta.y;
                }
                // Context menu (under default mouse threshold)
                const drag_delta = ImGui.GetMouseDragDelta(ImGui.MouseButton.Right);
                if (opt_enable_context_menu.value && ImGui.IsMouseReleased(ImGui.MouseButton.Right) && drag_delta.x === 0.0 && drag_delta.y === 0.0)
                    ImGui.OpenPopupOnItemClick("context");
                if (ImGui.BeginPopup("context")) {
                    if (adding_line.value)
                        points.value.resize(points.value.size() - 2);
                    adding_line.value = false;
                    if (ImGui.MenuItem("Remove one", null, false, points.value.Size > 0)) {
                        points.value.resize(points.value.size() - 2);
                    }
                    if (ImGui.MenuItem("Remove all", null, false, points.value.Size > 0)) {
                        points.value.clear();
                    }
                    ImGui.EndPopup();
                }
                // Draw grid + all lines in the canvas
                draw_list.PushClipRect(canvas_p0, canvas_p1, true);
                if (opt_enable_grid.value) {
                    const GRID_STEP = 64.0;
                    for (let x = fmodf(scrolling.value.x, GRID_STEP); x < canvas_sz.x; x += GRID_STEP)
                        draw_list.AddLine(new ImGui.Vec2(canvas_p0.x + x, canvas_p0.y), new ImGui.Vec2(canvas_p0.x + x, canvas_p1.y), ImGui.COL32(200, 200, 200, 40));
                    for (let y = fmodf(scrolling.value.y, GRID_STEP); y < canvas_sz.y; y += GRID_STEP)
                        draw_list.AddLine(new ImGui.Vec2(canvas_p0.x, canvas_p0.y + y), new ImGui.Vec2(canvas_p1.x, canvas_p0.y + y), ImGui.COL32(200, 200, 200, 40));
                }
                for (let n = 0; n < points.value.Size; n += 2)
                    draw_list.AddLine(new ImGui.Vec2(origin.x + points.value[n].x, origin.y + points.value[n].y), new ImGui.Vec2(origin.x + points.value[n + 1].x, origin.y + points.value[n + 1].y), ImGui.COL32(255, 255, 0, 255), 2.0);
                draw_list.PopClipRect();
                ImGui.EndTabItem();
            }
            if (ImGui.BeginTabItem("BG/FG draw lists")) {
                const draw_bg = STATIC(UNIQUE("draw_bg#f42741fb"), true);
                const draw_fg = STATIC(UNIQUE("draw_fg#f4199725"), true);
                ImGui.Checkbox("Draw in Background draw list", draw_bg.access);
                ImGui.SameLine();
                HelpMarker("The Background draw list will be rendered below every Dear ImGui windows.");
                ImGui.Checkbox("Draw in Foreground draw list", draw_fg.access);
                ImGui.SameLine();
                HelpMarker("The Foreground draw list will be rendered over every Dear ImGui windows.");
                const window_pos = ImGui.GetWindowPos();
                const window_size = ImGui.GetWindowSize();
                const window_center = new ImGui.Vec2(window_pos.x + window_size.x * 0.5, window_pos.y + window_size.y * 0.5);
                if (draw_bg.value)
                    ImGui.GetBackgroundDrawList().AddCircle(window_center, window_size.x * 0.6, ImGui.COL32(255, 0, 0, 200), 0, 10 + 4);
                if (draw_fg.value)
                    ImGui.GetForegroundDrawList().AddCircle(window_center, window_size.y * 0.6, ImGui.COL32(0, 255, 0, 200), 0, 10);
                ImGui.EndTabItem();
            }
            ImGui.EndTabBar();
        }
        ImGui.End();
    }
    // [Optional] Notify the system of Tabs/Windows closure that happened outside the regular tab interface.
    // If a tab has been closed programmatically (aka closed from another source such as the Checkbox() in the demo,
    // as opposed to clicking on the regular tab closing button) and stops being submitted, it will take a frame for
    // the tab bar to notice its absence. During this frame there will be a gap in the tab bar, and if the tab that has
    // disappeared was the selected one, the tab bar will report no selected tab during the frame. This will effectively
    // give the impression of a flicker for one frame.
    // We call SetTabItemClosed() to manually notify the Tab Bar or Docking system of removed tabs to avoid this glitch.
    // Note that this completely optional, and only affect tab bars with the ImGui.TabBarFlags.Reorderable flag.
    function NotifyOfDocumentsClosedElsewhere(app) {
        for (let doc_n = 0; doc_n < app.Documents.Size; doc_n++) {
            const doc = app.Documents[doc_n];
            if (!doc.Open && doc.OpenPrev)
                ImGui.SetTabItemClosed(doc.Name);
            doc.OpenPrev = doc.Open;
        }
    }
    function ShowExampleAppDocuments(p_open) {
        const app = STATIC(UNIQUE("app#78f890d0"), new ExampleAppDocuments());
        // Options
        const opt_reorderable = STATIC(UNIQUE("opt_reorderable#08e32fe0"), true);
        const opt_fitting_flags = STATIC(UNIQUE("opt_fitting_flags#c9447dc7"), ImGui.TabBarFlags.FittingPolicyDefault_);
        const window_contents_visible = ImGui.Begin("Example: Documents", p_open, ImGui.WindowFlags.MenuBar);
        if (!window_contents_visible) {
            ImGui.End();
            return;
        }
        // Menu
        if (ImGui.BeginMenuBar()) {
            if (ImGui.BeginMenu("File")) {
                let open_count = 0;
                for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++)
                    open_count += app.value.Documents[doc_n].Open ? 1 : 0;
                if (ImGui.BeginMenu("Open", open_count < app.value.Documents.Size)) {
                    for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++) {
                        const doc = app.value.Documents[doc_n];
                        if (!doc.Open)
                            if (ImGui.MenuItem(doc.Name))
                                doc.DoOpen();
                    }
                    ImGui.EndMenu();
                }
                if (ImGui.MenuItem("Close All Documents", null, false, open_count > 0))
                    for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++)
                        app.value.Documents[doc_n].DoQueueClose();
                if (ImGui.MenuItem("Exit", "Alt+F4")) { }
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }
        // [Debug] List documents with one checkbox for each
        for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++) {
            const doc = app.value.Documents[doc_n];
            if (doc_n > 0)
                ImGui.SameLine();
            ImGui.PushID(doc.ID);
            if (ImGui.Checkbox(doc.Name, (_ = doc.Open) => doc.Open = _))
                if (!doc.Open)
                    doc.DoForceClose();
            ImGui.PopID();
        }
        ImGui.Separator();
        // About the ImGuiWindowFlags_UnsavedDocument / ImGuiTabItemFlags_UnsavedDocument flags.
        // They have multiple effects:
        // - Display a dot next to the title.
        // - Tab is selected when clicking the X close button.
        // - Closure is not assumed (will wait for user to stop submitting the tab).
        //   Otherwise closure is assumed when pressing the X, so if you keep submitting the tab may reappear at end of tab bar.
        //   We need to assume closure by default otherwise waiting for "lack of submission" on the next frame would leave an empty
        //   hole for one-frame, both in the tab-bar and in tab-contents when closing a tab/window.
        //   The rarely used SetTabItemClosed() function is a way to notify of programmatic closure to avoid the one-frame hole.
        // Submit Tab Bar and Tabs
        {
            const tab_bar_flags = (opt_fitting_flags.value) | (opt_reorderable.value ? ImGui.TabBarFlags.Reorderable : 0);
            if (ImGui.BeginTabBar("##tabs", tab_bar_flags)) {
                if (opt_reorderable.value)
                    NotifyOfDocumentsClosedElsewhere(app.value);
                // [DEBUG] Stress tests
                //if ((ImGui.GetFrameCount() % 30) === 0) docs[1].Open ^= 1;            // [DEBUG] Automatically show/hide a tab. Test various interactions e.g. dragging with this on.
                //if (ImGui.GetIO().KeyCtrl) ImGui.SetTabItemSelected(docs[1].Name);  // [DEBUG] Test SetTabItemSelected(), probably not very useful as-is anyway..
                // Submit Tabs
                for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++) {
                    const doc = app.value.Documents[doc_n];
                    if (!doc.Open)
                        continue;
                    const tab_flags = (doc.Dirty ? ImGui.TabItemFlags.UnsavedDocument : 0);
                    const visible = ImGui.BeginTabItem(doc.Name, (_ = doc.Open) => doc.Open = _, tab_flags);
                    // Cancel attempt to close when unsaved add to save queue so we can display a popup.
                    if (!doc.Open && doc.Dirty) {
                        doc.Open = true;
                        doc.DoQueueClose();
                    }
                    MyDocument.DisplayContextMenu(doc);
                    if (visible) {
                        MyDocument.DisplayContents(doc);
                        ImGui.EndTabItem();
                    }
                }
                ImGui.EndTabBar();
            }
        }
        // Update closing queue
        const close_queue = STATIC(UNIQUE("close_queue#0bbccedf"), new ImGui.Vector());
        if (close_queue.value.empty()) {
            // Close queue is locked once we started a popup
            for (let doc_n = 0; doc_n < app.value.Documents.Size; doc_n++) {
                const doc = app.value.Documents[doc_n];
                if (doc.WantClose) {
                    doc.WantClose = false;
                    close_queue.value.push_back(doc);
                }
            }
        }
        // Display closing confirmation UI
        if (!close_queue.value.empty()) {
            let close_queue_unsaved_documents = 0;
            for (let n = 0; n < close_queue.value.Size; n++)
                if (close_queue.value[n].Dirty)
                    close_queue_unsaved_documents++;
            if (close_queue_unsaved_documents === 0) {
                // Close documents when all are unsaved
                for (let n = 0; n < close_queue.value.Size; n++)
                    close_queue.value[n].DoForceClose();
                close_queue.value.clear();
            }
            else {
                if (!ImGui.IsPopupOpen("Save?"))
                    ImGui.OpenPopup("Save?");
                if (ImGui.BeginPopupModal("Save?", null, ImGui.WindowFlags.AlwaysAutoResize)) {
                    ImGui.Text("Save change to the following items?");
                    const item_height = ImGui.GetTextLineHeightWithSpacing();
                    if (ImGui.BeginChildFrame(ImGui.GetID("frame"), new ImGui.Vec2(-FLT_MIN, 6.25 * item_height))) {
                        for (let n = 0; n < close_queue.value.Size; n++)
                            if (close_queue.value[n].Dirty)
                                ImGui.Text(`${close_queue.value[n].Name}`);
                        ImGui.EndChildFrame();
                    }
                    const button_size = new ImGui.Vec2(ImGui.GetFontSize() * 7.0, 0.0);
                    if (ImGui.Button("Yes", button_size)) {
                        for (let n = 0; n < close_queue.value.Size; n++) {
                            if (close_queue.value[n].Dirty)
                                close_queue.value[n].DoSave();
                            close_queue.value[n].DoForceClose();
                        }
                        close_queue.value.clear();
                        ImGui.CloseCurrentPopup();
                    }
                    ImGui.SameLine();
                    if (ImGui.Button("No", button_size)) {
                        for (let n = 0; n < close_queue.value.Size; n++)
                            close_queue.value[n].DoForceClose();
                        close_queue.value.clear();
                        ImGui.CloseCurrentPopup();
                    }
                    ImGui.SameLine();
                    if (ImGui.Button("Cancel", button_size)) {
                        close_queue.value.clear();
                        ImGui.CloseCurrentPopup();
                    }
                    ImGui.EndPopup();
                }
            }
        }
        ImGui.End();
    }
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
            }
        ],
        execute: function () {
            // #ifndef IMGUI_DISABLE
            // System includes
            // #include <ctype.h>          // toupper
            // #include <limits.h>         // INT_MIN, INT_MAX
            INT_MIN = -2147483648; // 0x80000000
            INT_MAX = +2147483647; // 0x7fffffff
            UINT_MAX = +4294967295; // 0xffffffff
            FLT_MIN = 1.175494e-38;
            FLT_MAX = 3.402823e+38;
            Static = class Static {
                constructor(value) {
                    this.value = value;
                    this.access = (value = this.value) => this.value = value;
                }
            };
            _static_map = new Map();
            StaticArray = class StaticArray {
                constructor(count, value) {
                    this.count = count;
                    this.value = value;
                }
                access(index) { return (value = this.value[index]) => this.value[index] = value; }
            };
            _static_array_map = new Map();
            // Visual Studio warnings
            // #ifdef _MSC_VER
            // #pragma warning (disable: 4996) // 'This function or variable may be unsafe': strcpy, strdup, sprintf, vsnprintf, sscanf, fopen
            // #endif
            // Clang/GCC warnings with -Weverything
            // #if defined(__clang__)
            // #if __has_warning("-Wunknown-warning-option")
            // #pragma clang diagnostic ignored "-Wunknown-warning-option"         // warning: unknown warning group 'xxx'                     // not all warnings are known by all Clang versions and they tend to be rename-happy.. so ignoring warnings triggers new warnings on some configuration. Great!
            // #endif
            // #pragma clang diagnostic ignored "-Wunknown-pragmas"                // warning: unknown warning group 'xxx'
            // #pragma clang diagnostic ignored "-Wold-style-cast"                 // warning: use of old-style cast                           // yes, they are more terse.
            // #pragma clang diagnostic ignored "-Wdeprecated-declarations"        // warning: 'xx' is deprecated: The POSIX name for this..   // for strdup used in demo code (so user can copy & paste the code)
            // #pragma clang diagnostic ignored "-Wint-to-void-pointer-cast"       // warning: cast to 'void *' from smaller integer type
            // #pragma clang diagnostic ignored "-Wformat-security"                // warning: format string is not a string literal
            // #pragma clang diagnostic ignored "-Wexit-time-destructors"          // warning: declaration requires an exit-time destructor    // exit-time destruction order is undefined. if MemFree() leads to users code that has been disabled before exit it might cause problems. ImGui coding style welcomes static/globals.
            // #pragma clang diagnostic ignored "-Wunused-macros"                  // warning: macro is not used                               // we define snprintf/vsnprintf on Windows so they are available, but not always used.
            // #pragma clang diagnostic ignored "-Wzero-as-null-pointer-constant"  // warning: zero as null pointer constant                   // some standard header variations use #define NULL 0
            // #pragma clang diagnostic ignored "-Wdouble-promotion"               // warning: implicit conversion from 'float' to 'double' when passing argument to function  // using printf() is a misery with this as C++ va_arg ellipsis changes float to double.
            // #pragma clang diagnostic ignored "-Wreserved-id-macro"              // warning: macro name is a reserved identifier
            // #pragma clang diagnostic ignored "-Wimplicit-int-float-conversion"  // warning: implicit conversion from 'xxx' to 'float' may lose precision
            // #elif defined(__GNUC__)
            // #pragma GCC diagnostic ignored "-Wpragmas"                  // warning: unknown option after '#pragma GCC diagnostic' kind
            // #pragma GCC diagnostic ignored "-Wint-to-pointer-cast"      // warning: cast to pointer from integer of different size
            // #pragma GCC diagnostic ignored "-Wformat-security"          // warning: format string is not a string literal (potentially insecure)
            // #pragma GCC diagnostic ignored "-Wdouble-promotion"         // warning: implicit conversion from 'float' to 'double' when passing argument to function
            // #pragma GCC diagnostic ignored "-Wconversion"               // warning: conversion to 'xxxx' from 'xxxx' may alter its value
            // #pragma GCC diagnostic ignored "-Wmisleading-indentation"   // [__GNUC__ >= 6] warning: this 'if' clause does not guard this statement      // GCC 6.0+ only. See #883 on GitHub.
            // #endif
            // Play it nice with Windows users (Update: May 2018, Notepad now supports Unix-style carriage returns!)
            // #ifdef _WIN32
            // #define IM_NEWLINE  "\r\n"
            // #else
            // #define IM_NEWLINE  "\n"
            // #endif
            IM_NEWLINE = "\n";
            exports_1("GImGuiDemoMarkerCallback", GImGuiDemoMarkerCallback = null);
            //-----------------------------------------------------------------------------
            // [SECTION] Demo Window / ShowDemoWindow()
            //-----------------------------------------------------------------------------
            // - ShowDemoWindowWidgets()
            // - ShowDemoWindowLayout()
            // - ShowDemoWindowPopups()
            // - ShowDemoWindowTables()
            // - ShowDemoWindowColumns()
            // - ShowDemoWindowMisc()
            //-----------------------------------------------------------------------------
            // We split the contents of the big ShowDemoWindow() function into smaller functions
            // (because the link time of very large functions grow non-linearly)
            // static void ShowDemoWindowWidgets();
            // static void ShowDemoWindowLayout();
            // static void ShowDemoWindowPopups();
            // static void ShowDemoWindowTables();
            // static void ShowDemoWindowColumns();
            // static void ShowDemoWindowMisc();
            done = false;
            // Dummy data structure that we use for the Table demo.
            // (pre-C++11 doesn't allow us to instantiate ImVector<MyItem> template if this structure if defined inside the demo function)
            // namespace
            // {
            // We are passing our own identifier to TableSetupColumn() to facilitate identifying columns in the sorting code.
            // This identifier will be passed down into ImGui.TableSortSpec.ColumnUserID.
            // But it is possible to omit the user id parameter of TableSetupColumn() and just use the column index instead! (ImGui.TableSortSpec.ColumnIndex)
            // If you don't use sorting, you will generally never care about giving column an ID!
            (function (MyItemColumnID) {
                MyItemColumnID[MyItemColumnID["ID"] = 0] = "ID";
                MyItemColumnID[MyItemColumnID["Name"] = 1] = "Name";
                MyItemColumnID[MyItemColumnID["Action"] = 2] = "Action";
                MyItemColumnID[MyItemColumnID["Quantity"] = 3] = "Quantity";
                MyItemColumnID[MyItemColumnID["Description"] = 4] = "Description";
            })(MyItemColumnID || (MyItemColumnID = {}));
            MyItem = class MyItem {
                constructor() {
                    this.ID = 0;
                    this.Name = "";
                    this.Quantity = 0;
                }
                // Compare function to be used by qsort()
                static CompareWithSortSpecs(lhs, rhs) {
                    const a = /*(const MyItem*)*/ lhs;
                    const b = /*(const MyItem*)*/ rhs;
                    ImGui.ASSERT(MyItem.s_current_sort_specs !== null);
                    for (let n = 0; n < MyItem.s_current_sort_specs.SpecsCount; n++) {
                        // Here we identify columns using the ColumnUserID value that we ourselves passed to TableSetupColumn()
                        // We could also choose to identify columns based on their index (sort_spec.ColumnIndex), which is simpler!
                        const sort_spec = MyItem.s_current_sort_specs.Specs[n];
                        let delta = 0;
                        switch (sort_spec.ColumnUserID) {
                            case MyItemColumnID.ID:
                                delta = (a.ID - b.ID);
                                break;
                            case MyItemColumnID.Name:
                                delta = (a.Name.localeCompare(b.Name));
                                break;
                            case MyItemColumnID.Quantity:
                                delta = (a.Quantity - b.Quantity);
                                break;
                            case MyItemColumnID.Description:
                                delta = (a.Name.localeCompare(b.Name));
                                break;
                            default:
                                ImGui.ASSERT(0);
                                break;
                        }
                        if (delta > 0)
                            return (sort_spec.SortDirection === ImGui.SortDirection.Ascending) ? +1 : -1;
                        if (delta < 0)
                            return (sort_spec.SortDirection === ImGui.SortDirection.Ascending) ? -1 : +1;
                    }
                    // qsort() is instable so always return a way to differenciate items.
                    // Your own compare function may want to avoid fallback on implicit sort specs e.g. a Name compare if it wasn't already part of the sort specs.
                    return (a.ID - b.ID);
                }
            };
            // We have a problem which is affecting _only this demo_ and should not affect your code:
            // As we don't rely on std:: or other third-party library to compile dear imgui, we only have reliable access to qsort(),
            // however qsort doesn't allow passing user data to comparing function.
            // As a workaround, we are storing the sort specs in a static/global for the comparing function to access.
            // In your own use case you would probably pass the sort specs to your sorting/comparing functions directly and not use a global.
            // We could technically call ImGui.TableGetSortSpecs() in CompareWithSortSpecs(), but considering that this function is called
            // very often by the sorting algorithm it would be a little wasteful.
            MyItem.s_current_sort_specs = null;
            //-----------------------------------------------------------------------------
            // [SECTION] Example App: Debug Console / ShowExampleAppConsole()
            //-----------------------------------------------------------------------------
            // Demonstrate creating a simple console window, with scrolling, filtering, completion and history.
            // For the console example, we are using a more C++ like approach of declaring a class to hold both data and functions.
            ExampleAppConsole = class ExampleAppConsole {
                constructor() {
                    this.InputBuf = new ImGui.StringBuffer(256, "");
                    this.Items = new ImGui.Vector();
                    this.Commands = new ImGui.Vector();
                    this.History = new ImGui.Vector();
                    this.HistoryPos = -1; // -1: new line, 0..this.History.Size-1 browsing history.
                    this.Filter = new ImGui.TextFilter();
                    this.AutoScroll = true;
                    this.ScrollToBottom = false;
                    IMGUI_DEMO_MARKER("Examples/Console");
                    this.ClearLog();
                    // memset(this.InputBuf, 0, sizeof(this.InputBuf));
                    this.HistoryPos = -1;
                    // "CLASSIFY" is here to provide the test case where "C"+[tab] completes to "CL" and display multiple matches.
                    this.Commands.push_back("HELP");
                    this.Commands.push_back("HISTORY");
                    this.Commands.push_back("CLEAR");
                    this.Commands.push_back("CLASSIFY");
                    this.AutoScroll = true;
                    this.ScrollToBottom = false;
                    this.AddLog("Welcome to Dear ImGui!");
                }
                destructor() {
                    this.ClearLog();
                    // for (let i = 0; i < this.History.Size; i++)
                    //     free(this.History[i]);
                }
                // Portable helpers
                // const   Stricmp(string s1, string s2)         { int d; while ((d = STATIC<int>(UNIQUE("  Stricmp(string s1, string s2)         { int d; while ((d"), toupper(*s2) - toupper(*s1)) === 0 && *s1) { s1++; s2++; } return d); }
                // const   Strnicmp(string s1, string s2, int n) { let d: int = 0; while (n > 0 && (d = STATIC<int>(UNIQUE("  Strnicmp(string s1, string s2, int n) { let d: int = 0; while (n > 0 && (d"), toupper(*s2) - toupper(*s1)) === 0 && *s1) { s1++; s2++; n--; } return d); }
                // static char* Strdup(string s)                           { ImGui.ASSERT(s); size_t len = strlen(s) + 1; void* buf = malloc(len); ImGui.ASSERT(buf); return (char*)memcpy(buf, (const void*)s, len); }
                // const  Strtrim(char* s)                                { char* str_end = s + strlen(s); while (str_end > s && str_end[-1] === ' ') str_end--; *str_end = STATIC<void>(UNIQUE(" Strtrim(char* s)                                { char* str_end = s + strlen(s); while (str_end > s && str_end[-1] === ' ') str_end--; *str_end"), 0); }
                ClearLog() {
                    // for (let i = 0; i < this.Items.Size; i++)
                    //     free(this.Items[i]);
                    this.Items.clear();
                }
                AddLog(fmt) {
                    // FIXME-OPT
                    // char buf[1024];
                    // va_list args;
                    // va_start(args, fmt);
                    // vsnprintf(buf, ImGui.ARRAYSIZE(buf), fmt, args);
                    // buf[ImGui.ARRAYSIZE(buf)-1] = 0;
                    // va_end(args);
                    // this.Items.push_back(Strdup(buf));
                    this.Items.push_back(fmt);
                }
                Draw(title, p_open) {
                    ImGui.SetNextWindowSize(new ImGui.Vec2(520, 600), ImGui.Cond.FirstUseEver);
                    if (!ImGui.Begin(title, p_open)) {
                        ImGui.End();
                        return;
                    }
                    // As a specific feature guaranteed by the library, after calling Begin() the last Item represent the title bar.
                    // So e.g. IsItemHovered() will return true when hovering the title bar.
                    // Here we create a context menu only available from the title bar.
                    if (ImGui.BeginPopupContextItem()) {
                        if (ImGui.MenuItem("Close Console"))
                            p_open(false);
                        ImGui.EndPopup();
                    }
                    ImGui.TextWrapped("This example implements a console with basic coloring, completion (TAB key) and history (Up/Down keys). A more elaborate " +
                        "implementation may want to store entries along with extra data such as timestamp, emitter, etc.");
                    ImGui.TextWrapped("Enter 'HELP' for help.");
                    // TODO: display items starting from the bottom
                    if (ImGui.SmallButton("Add Debug Text")) {
                        this.AddLog(`${this.Items.Size} some text`);
                        this.AddLog("some more text");
                        this.AddLog("display very important message here!");
                    }
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Add Debug Error")) {
                        this.AddLog("[error] something went wrong");
                    }
                    ImGui.SameLine();
                    if (ImGui.SmallButton("Clear")) {
                        this.ClearLog();
                    }
                    ImGui.SameLine();
                    const copy_to_clipboard = ImGui.SmallButton("Copy");
                    //const t = 0.0; if (ImGui.GetTime() - t > 0.02) { t = STATIC<float>(UNIQUE("t = 0.0; if (ImGui.GetTime() - t > 0.02) { t", ImGui.GetTime(); this.AddLog("Spam %f"), t)); }
                    ImGui.Separator();
                    // Options menu
                    if (ImGui.BeginPopup("Options")) {
                        ImGui.Checkbox("Auto-scroll", (_ = this.AutoScroll) => this.AutoScroll = _);
                        ImGui.EndPopup();
                    }
                    // Options, Filter
                    if (ImGui.Button("Options"))
                        ImGui.OpenPopup("Options");
                    ImGui.SameLine();
                    this.Filter.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
                    ImGui.Separator();
                    // Reserve enough left-over height for 1 separator + 1 input text
                    const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing();
                    ImGui.BeginChild("ScrollingRegion", new ImGui.Vec2(0, -footer_height_to_reserve), false, ImGui.WindowFlags.HorizontalScrollbar);
                    if (ImGui.BeginPopupContextWindow()) {
                        if (ImGui.Selectable("Clear"))
                            this.ClearLog();
                        ImGui.EndPopup();
                    }
                    // Display every line as a separate entry so we can change their color or add custom widgets.
                    // If you only want raw text you can use ImGui.TextUnformatted(log.begin(), log.end());
                    // NB- if you have thousands of entries this approach may be too inefficient and may require user-side clipping
                    // to only process visible items. The clipper will automatically measure the height of your first item and then
                    // "seek" to display only items in the visible area.
                    // To use the clipper we can replace your standard loop:
                    //      for (let i = 0; i < this.Items.Size; i++)
                    //   With:
                    //      ImGui.ListClipper clipper;
                    //      clipper.Begin(this.Items.Size);
                    //      while (clipper.Step())
                    //         for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    // - That your items are evenly spaced (same height)
                    // - That you have cheap random access to your elements (you can access them given their index,
                    //   without processing all the ones before)
                    // You cannot this code as-is if a filter is active because it breaks the 'cheap random-access' property.
                    // We would need random-access on the post-filtered list.
                    // A typical application wanting coarse clipping and filtering may want to pre-compute an array of indices
                    // or offsets of items that passed the filtering test, recomputing this array when user changes the filter,
                    // and appending newly elements as they are inserted. This is left as a task to the user until we can manage
                    // to improve this example code!
                    // If your items are of variable height:
                    // - Split them into same height items would be simpler and facilitate random-seeking into your list.
                    // - Consider using manual call to IsRectVisible() and skipping extraneous decoration from your items.
                    ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(4, 1)); // Tighten spacing
                    if (copy_to_clipboard)
                        ImGui.LogToClipboard();
                    for (let i = 0; i < this.Items.Size; i++) {
                        const item = this.Items[i];
                        if (!this.Filter.PassFilter(item))
                            continue;
                        // Normally you would store more information in your item than just a string.
                        // (e.g. make this.Items[] an array of structure, store color/type etc.)
                        const color = new ImGui.Vec4();
                        let has_color = false;
                        // if (strstr(item, "[error]"))          { color = new ImGui.Vec4(1.0, 0.4, 0.4, 1.0); has_color = true; }
                        if (/\[error\]/.test(item)) {
                            color.Set(1.0, 0.4, 0.4, 1.0);
                            has_color = true;
                        }
                        // else if (strncmp(item, "# ", 2) === 0) { color = new ImGui.Vec4(1.0, 0.8, 0.6, 1.0); has_color = true; }
                        else if (/^# /.test(item)) {
                            color.Set(1.0, 0.8, 0.6, 1.0);
                            has_color = true;
                        }
                        if (has_color)
                            ImGui.PushStyleColor(ImGui.Col.Text, color);
                        ImGui.TextUnformatted(item);
                        if (has_color)
                            ImGui.PopStyleColor();
                    }
                    if (copy_to_clipboard)
                        ImGui.LogFinish();
                    if (this.ScrollToBottom || (this.AutoScroll && ImGui.GetScrollY() >= ImGui.GetScrollMaxY()))
                        ImGui.SetScrollHereY(1.0);
                    this.ScrollToBottom = false;
                    ImGui.PopStyleVar();
                    ImGui.EndChild();
                    ImGui.Separator();
                    // Command-line
                    let reclaim_focus = false;
                    const input_text_flags = ImGui.InputTextFlags.EnterReturnsTrue | ImGui.InputTextFlags.CallbackCompletion | ImGui.InputTextFlags.CallbackHistory;
                    if (ImGui.InputText("Input", this.InputBuf, ImGui.ARRAYSIZE(this.InputBuf), input_text_flags, ExampleAppConsole.TextEditCallbackStub, this)) {
                        // char* s = this.InputBuf;
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
                ExecCommand(command_line) {
                    this.AddLog(`# ${command_line}\n`);
                    // Insert into history. First find match and delete it so it can be pushed to the back.
                    // This isn't trying to be smart or optimal.
                    this.HistoryPos = -1;
                    for (let i = this.History.Size - 1; i >= 0; i--)
                        // if (Stricmp(this.History[i], command_line) === 0)
                        if (this.History.Data[i].toLowerCase() === command_line.toLowerCase()) {
                            // free(this.History[i]);
                            // this.History.erase(this.History.begin() + i);
                            break;
                        }
                    // this.History.push_back(Strdup(command_line));
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
                            this.AddLog(`${i}: ${this.History[i]}\n`);
                    }
                    else {
                        this.AddLog(`Unknown command: '${command_line}'\n`);
                    }
                    // On command input, we scroll to bottom even if this.AutoScroll==false
                    this.ScrollToBottom = true;
                }
                // In C++11 you'd be better off using lambdas for this sort of forwarding callbacks
                static TextEditCallbackStub(data) {
                    const console = data.UserData;
                    ImGui.ASSERT(console);
                    return console.TextEditCallback(data);
                }
                TextEditCallback(data) {
                    //this.AddLog("cursor: %d, selection: %d-%d", data.CursorPos, data.SelectionStart, data.SelectionEnd);
                    switch (data.EventFlag) {
                        case ImGui.InputTextFlags.CallbackCompletion:
                            {
                                // TODO(imgui-js): ImGui.InputTextFlags.CallbackCompletion
                                // Example of TEXT COMPLETION
                                // Locate beginning of current word
                                // string word_end = data.Buf + data.CursorPos;
                                // string word_start = word_end;
                                // while (word_start > data.Buf)
                                // {
                                //     const char c = word_start[-1];
                                //     if (c === ' ' || c === '\t' || c === ',' || c === ';')
                                //         break;
                                //     word_start--;
                                // }
                                // Build a list of candidates
                                // ImVector<string> candidates;
                                // for (let i = 0; i < this.Commands.Size; i++)
                                //     if (Strnicmp(this.Commands[i], word_start, (int)(word_end - word_start)) === 0)
                                //         candidates.push_back(this.Commands[i]);
                                // if (candidates.Size === 0)
                                // {
                                //     // No match
                                //     this.AddLog("No match for \"%.*s\"!\n", (int)(word_end - word_start), word_start);
                                // }
                                // else if (candidates.Size === 1)
                                // {
                                //     // Single match. Delete the beginning of the word and replace it entirely so we've got nice casing.
                                //     data.DeleteChars((int)(word_start - data.Buf), (int)(word_end - word_start));
                                //     data.InsertChars(data.CursorPos, candidates[0]);
                                //     data.InsertChars(data.CursorPos, " ");
                                // }
                                // else
                                // {
                                //     // Multiple matches. Complete as much as we can..
                                //     // So inputing "C"+Tab will complete to "CL" then display "CLEAR" and "CLASSIFY" as matches.
                                //     let match_len: int = (int)(word_end - word_start);
                                //     for (;;)
                                //     {
                                //         let c: int = 0;
                                //         const all_candidates_matches: boolean = true;
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
                                //         data.DeleteChars((int)(word_start - data.Buf), (int)(word_end - word_start));
                                //         data.InsertChars(data.CursorPos, candidates[0], candidates[0] + match_len);
                                //     }
                                //     // List matches
                                //     this.AddLog("Possible matches:\n");
                                //     for (let i = 0; i < candidates.Size; i++)
                                //         this.AddLog("- %s\n", candidates[i]);
                                // }
                                break;
                            }
                        case ImGui.InputTextFlags.CallbackHistory:
                            {
                                // Example of HISTORY
                                const prev_history_pos = this.HistoryPos;
                                if (data.EventKey === ImGui.Key.UpArrow) {
                                    if (this.HistoryPos === -1)
                                        this.HistoryPos = this.History.Size - 1;
                                    else if (this.HistoryPos > 0)
                                        this.HistoryPos--;
                                }
                                else if (data.EventKey === ImGui.Key.DownArrow) {
                                    if (this.HistoryPos !== -1)
                                        if (++this.HistoryPos >= this.History.Size)
                                            this.HistoryPos = -1;
                                }
                                // A better implementation would preserve the data on the current input line along with cursor position.
                                if (prev_history_pos !== this.HistoryPos) {
                                    // string history_str = (this.HistoryPos >= 0) ? this.History[this.HistoryPos] : "";
                                    const history_str = (this.HistoryPos >= 0) ? this.History[this.HistoryPos] : "";
                                    data.DeleteChars(0, data.BufTextLen);
                                    data.InsertChars(0, history_str);
                                }
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
            //  my_log.this.AddLog("Hello %d world\n", 123);
            //  my_log.Draw("title");
            ExampleAppLog = class ExampleAppLog {
                constructor() {
                    this.Buf = new ImGui.TextBuffer();
                    this.Filter = new ImGui.TextFilter();
                    this.LineOffsets = new ImGui.Vector(); // Index to lines offset. We maintain this with this.AddLog() calls.
                    this.AutoScroll = true;
                    this.Clear();
                }
                Clear() {
                    this.Buf.clear();
                    this.LineOffsets.clear();
                    this.LineOffsets.push_back(0);
                }
                AddLog(fmt) {
                    let old_size = this.Buf.size();
                    // va_list args;
                    // va_start(args, fmt);
                    // Buf.appendfv(fmt, args);
                    // va_end(args);
                    this.Buf.append(fmt);
                    for (let new_size = this.Buf.size(); old_size < new_size; old_size++)
                        if (this.Buf.Buf[old_size] === '\n')
                            this.LineOffsets.push_back(old_size + 1);
                }
                Draw(title, p_open = null) {
                    if (!ImGui.Begin(title, p_open)) {
                        ImGui.End();
                        return;
                    }
                    // Options menu
                    if (ImGui.BeginPopup("Options")) {
                        ImGui.Checkbox("Auto-scroll", (_ = this.AutoScroll) => this.AutoScroll = _);
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
                    ImGui.BeginChild("scrolling", new ImGui.Vec2(0, 0), false, ImGui.WindowFlags.HorizontalScrollbar);
                    if (clear)
                        this.Clear();
                    if (copy)
                        ImGui.LogToClipboard();
                    ImGui.PushStyleVar(ImGui.StyleVar.ItemSpacing, new ImGui.Vec2(0, 0));
                    // string buf = Buf.begin();
                    // string buf_end = Buf.end();
                    const buf_end = this.Buf.Buf.length;
                    if (this.Filter.IsActive()) {
                        // In this example we don't use the clipper when Filter is enabled.
                        // This is because we don't have a random access on the result on our filter.
                        // A real application processing logs with ten of thousands of entries may want to store the result of
                        // search/filter.. especially if the filtering function is not trivial (e.g. reg-exp).
                        for (let line_no = 0; line_no < this.LineOffsets.Size; line_no++) {
                            // string line_start = buf + this.LineOffsets[line_no];
                            // string line_end = (line_no + 1 < this.LineOffsets.Size) ? (buf + this.LineOffsets[line_no + 1] - 1) : buf_end;
                            const line_start = this.Buf.Buf.substr(this.LineOffsets[line_no]);
                            const line_end = (line_no + 1 < this.LineOffsets.Size) ? this.LineOffsets[line_no + 1] - 1 : buf_end;
                            if (this.Filter.PassFilter(line_start, line_end))
                                ImGui.TextUnformatted(line_start, line_end);
                        }
                    }
                    else {
                        // The simplest and easy way to display the entire buffer:
                        //   ImGui.TextUnformatted(buf_begin, buf_end);
                        // And it'll just work. TextUnformatted() has specialization for large blob of text and will fast-forward
                        // to skip non-visible lines. Here we instead demonstrate using the clipper to only process lines that are
                        // within the visible area.
                        // If you have tens of thousands of items and their processing cost is non-negligible, coarse clipping them
                        // on your side is recommended. Using ImGui.ListClipper requires
                        // - A) random access into your data
                        // - B) items all being the  same height,
                        // both of which we can handle since we an array pointing to the beginning of each line of text.
                        // When using the filter (in the block of code above) we don't have random access into the data to display
                        // anymore, which is why we don't use the clipper. Storing or skimming through the search result would make
                        // it possible (and would be recommended if you want to search through tens of thousands of entries).
                        const clipper = new ImGui.ListClipper();
                        clipper.Begin(this.LineOffsets.Size);
                        while (clipper.Step()) {
                            for (let line_no = clipper.DisplayStart; line_no < clipper.DisplayEnd; line_no++) {
                                // string line_start = buf + this.LineOffsets[line_no];
                                // string line_end = (line_no + 1 < this.LineOffsets.Size) ? (buf + this.LineOffsets[line_no + 1] - 1) : buf_end;
                                const line_start = this.Buf.Buf.substr(this.LineOffsets[line_no]);
                                const line_end = (line_no + 1 < this.LineOffsets.Size) ? this.LineOffsets[line_no + 1] - 1 : buf_end;
                                ImGui.TextUnformatted(line_start, line_end);
                            }
                        }
                        clipper.End();
                    }
                    ImGui.PopStyleVar();
                    if (this.AutoScroll && ImGui.GetScrollY() >= ImGui.GetScrollMaxY())
                        ImGui.SetScrollHereY(1.0);
                    ImGui.EndChild();
                    ImGui.End();
                }
            };
            //-----------------------------------------------------------------------------
            // [SECTION] Example App: Documents Handling / ShowExampleAppDocuments()
            //-----------------------------------------------------------------------------
            // Simplified structure to mimic a Document model
            MyDocument = class MyDocument {
                constructor(name, open = true, color = new ImGui.Vec4(1.0, 1.0, 1.0, 1.0)) {
                    this.ID = MyDocument.ID++;
                    this.Name = name;
                    this.Open = this.OpenPrev = open;
                    this.Dirty = false;
                    this.WantClose = false;
                    this.Color = color;
                }
                DoOpen() { this.Open = true; }
                DoQueueClose() { this.WantClose = true; }
                DoForceClose() { this.Open = false; this.Dirty = false; }
                DoSave() { this.Dirty = false; }
                // Display placeholder contents for the Document
                static DisplayContents(doc) {
                    ImGui.PushID(doc.ID);
                    ImGui.Text(`Document "${doc.Name}"`);
                    ImGui.PushStyleColor(ImGui.Col.Text, doc.Color);
                    ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
                    ImGui.PopStyleColor();
                    if (ImGui.Button("Modify", new ImGui.Vec2(100, 0)))
                        doc.Dirty = true;
                    ImGui.SameLine();
                    if (ImGui.Button("Save", new ImGui.Vec2(100, 0)))
                        doc.DoSave();
                    ImGui.ColorEdit3("color", doc.Color); // Useful to test drag and drop and hold-dragged-to-open-tab behavior.
                    ImGui.PopID();
                }
                // Display context menu for the Document
                static DisplayContextMenu(doc) {
                    if (!ImGui.BeginPopupContextItem())
                        return;
                    const buf = `Save ${doc.Name}`;
                    if (ImGui.MenuItem(buf, "CTRL+S", false, doc.Open))
                        doc.DoSave();
                    if (ImGui.MenuItem("Close", "CTRL+W", false, doc.Open))
                        doc.DoQueueClose();
                    ImGui.EndPopup();
                }
            };
            MyDocument.ID = 0;
            ExampleAppDocuments = class ExampleAppDocuments {
                constructor() {
                    this.Documents = new ImGui.Vector();
                    this.Documents.push_back(new MyDocument("Lettuce", true, new ImGui.Vec4(0.4, 0.8, 0.4, 1.0)));
                    this.Documents.push_back(new MyDocument("Eggplant", true, new ImGui.Vec4(0.8, 0.5, 1.0, 1.0)));
                    this.Documents.push_back(new MyDocument("Carrot", true, new ImGui.Vec4(1.0, 0.8, 0.5, 1.0)));
                    this.Documents.push_back(new MyDocument("Tomato", false, new ImGui.Vec4(1.0, 0.3, 0.4, 1.0)));
                    this.Documents.push_back(new MyDocument("A Rather Long Title", false));
                    this.Documents.push_back(new MyDocument("Some Document", false));
                }
            };
        }
    };
});
//# sourceMappingURL=imgui_demo.js.map