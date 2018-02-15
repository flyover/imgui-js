"use strict";
// dear imgui, v1.60 WIP
// (demo code)
Object.defineProperty(exports, "__esModule", { value: true });
// Message to the person tempted to delete this file when integrating ImGui into their code base:
// Don't do it! Do NOT remove this file from your project! It is useful reference code that you and other users will want to refer to.
// Everything in this file will be stripped out by the linker if you don't call ImGui.ShowDemoWindow().
// During development, you can call ImGui.ShowDemoWindow() in your code to learn about various features of ImGui. Have it wired in a debug menu!
// Removing this file from your project is hindering access to documentation for everyone in your team, likely leading you to poorer usage of the library.
// Note that you can #define IMGUI_DISABLE_DEMO_WINDOWS in imconfig.h for the same effect.
// If you want to link core ImGui in your final builds but not those demo windows, #define IMGUI_DISABLE_DEMO_WINDOWS in imconfig.h and those functions will be empty.
// In other situation, when you have ImGui available you probably want this to be available for reference and execution.
// Thank you,
// -Your beloved friend, imgui_demo.cpp (that you won't delete)
// Message to beginner C/C++ programmers. About the meaning of 'static': in this demo code, we frequently we use 'static' variables inside functions. 
// We do this as a way to gather code and data in the same place, just to make the demo code faster to read, faster to write, and use less code. 
// A static variable persist across calls, so it is essentially like a global variable but declared inside the scope of the function. 
// It also happens to be a convenient way of storing simple UI related information as long as your function doesn't need to be reentrant or used in threads.
// This might be a pattern you occasionally want to use in your code, but most of the real data you would be editing is likely to be stored outside your function.
// #if defined(_MSC_VER) && !defined(_CRT_SECURE_NO_WARNINGS)
// #define _CRT_SECURE_NO_WARNINGS
// #endif
// #include "imgui.h"
// #include <ctype.h>          // toupper, isprint
// #include <math.h>           // sqrtf, powf, cosf, sinf, floorf, ceilf
// #include <stdio.h>          // vsnprintf, sscanf, printf
// #include <stdlib.h>         // null, malloc, free, atoi
// #if defined(_MSC_VER) && _MSC_VER <= 1500 // MSVC 2008 or earlier
// #include <stddef.h>         // intptr_t
// #else
// #include <stdint.h>         // intptr_t
// #endif
const ImGui = require("./imgui");
const imgui_1 = require("./imgui");
const imgui_2 = require("./imgui");
const imgui_3 = require("./imgui");
const imgui_4 = require("./imgui");
const imgui_5 = require("./imgui");
const imgui_6 = require("./imgui");
const imgui_7 = require("./imgui");
const imgui_8 = require("./imgui");
const imgui_9 = require("./imgui");
const imgui_10 = require("./imgui");
const imgui_11 = require("./imgui");
const imgui_12 = require("./imgui");
const imgui_13 = require("./imgui");
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
const IM_NEWLINE = "\n";
// #define IM_MAX(_A,_B)       (((_A) >= (_B)) ? (_A) : (_B))
function IM_MAX(_A, _B) { return ((_A) >= (_B)) ? (_A) : (_B); }
//-----------------------------------------------------------------------------
// DEMO CODE
//-----------------------------------------------------------------------------
// #if !defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS) && defined(IMGUI_DISABLE_TEST_WINDOWS) && !defined(IMGUI_DISABLE_DEMO_WINDOWS)   // Obsolete name since 1.53, TEST->DEMO
// #define IMGUI_DISABLE_DEMO_WINDOWS
// #endif
// #if !defined(IMGUI_DISABLE_DEMO_WINDOWS)
class Static {
    constructor(value) {
        this.value = value;
    }
}
const _static = {};
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
exports.ShowUserGuide = ShowUserGuide;
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
        ImGui.Begin("About Dear ImGui", (value = show_app_about.value) => show_app_about.value = value, 64 /* AlwaysAutoResize */);
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
        window_flags |= 1 /* NoTitleBar */;
    if (no_scrollbar.value)
        window_flags |= 8 /* NoScrollbar */;
    if (!no_menu.value)
        window_flags |= 1024 /* MenuBar */;
    if (no_move.value)
        window_flags |= 4 /* NoMove */;
    if (no_resize.value)
        window_flags |= 2 /* NoResize */;
    if (no_collapse.value)
        window_flags |= 32 /* NoCollapse */;
    if (no_nav.value)
        window_flags |= 786432 /* NoNav */;
    if (no_close.value)
        p_open = null; // Don't pass our bool* to Begin
    ImGui.SetNextWindowSize(new imgui_6.ImVec2(550, 680), 4 /* FirstUseEver */);
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
                ImGui.PushStyleColor(21 /* Button */, imgui_9.ImColor.HSV(i / 7.0, 0.6, 0.6));
                ImGui.PushStyleColor(22 /* ButtonHovered */, imgui_9.ImColor.HSV(i / 7.0, 0.7, 0.7));
                ImGui.PushStyleColor(23 /* ButtonActive */, imgui_9.ImColor.HSV(i / 7.0, 0.8, 0.8));
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
                ImGui.PlotLines_Array("Curve", arr.value, imgui_3.IM_ARRAYSIZE(arr.value));
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
                    for (let n = 0; n < imgui_3.IM_ARRAYSIZE(items); n++) {
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
                /* static */ const str0 = STATIC("str0", new imgui_4.ImStringBuffer(128, "Hello, world!"));
                /* static */ const i0 = STATIC("i0", 123);
                /* static */ const f0 = STATIC("f0#400", 0.001);
                ImGui.InputText("input text", str0.value, imgui_3.IM_ARRAYSIZE(str0.value));
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
            ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, imgui_3.IM_ARRAYSIZE(listbox_items), 4);
            /* static */ const listbox_item_current2 = STATIC("listbox_item_current2", 2);
            ImGui.PushItemWidth(-1);
            ImGui.ListBox("##listbox2", (value = listbox_item_current2.value) => listbox_item_current2.value = value, listbox_items, imgui_3.IM_ARRAYSIZE(listbox_items), 4);
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
                ImGui.PushStyleVar(15 /* IndentSpacing */, ImGui.GetFontSize() * 3); // Increase spacing to differentiate leaves from expanded contents.
                for (let i = 0; i < 6; i++) {
                    // Disable the default open on single-click behavior and pass in Selected flag according to our selection state.
                    let node_flags = 128 /* OpenOnArrow */ | 64 /* OpenOnDoubleClick */ | ((selection_mask.value & (1 << i)) ? 1 /* Selected */ : 0);
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
                        node_flags |= 256 /* Leaf */ | 8 /* NoTreePushOnOpen */; // ImGuiTreeNodeFlags.Bullet
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
                ImGui.TextColored(new imgui_7.ImVec4(1.0, 0.0, 1.0, 1.0), "Pink");
                ImGui.TextColored(new imgui_7.ImVec4(1.0, 1.0, 0.0, 1.0), "Yellow");
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
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_6.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_6.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_8.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_8.IM_COL32(255, 255, 0, 255));
                ImGui.PopTextWrapPos();
                ImGui.Text("Test paragraph 2:");
                pos = ImGui.GetCursorScreenPos();
                ImGui.GetWindowDrawList().AddRectFilled(new imgui_6.ImVec2(pos.x + wrap_width.value, pos.y), new imgui_6.ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), imgui_8.IM_COL32(255, 0, 255, 255));
                ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
                ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
                ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), imgui_8.IM_COL32(255, 255, 0, 255));
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
                /* static */ const buf = STATIC("buf", new imgui_4.ImStringBuffer(32, "\xe6\x97\xa5\xe6\x9c\xac\xe8\xaa\x9e")); // "nihongo"
                ImGui.InputText("UTF-8 input", buf.value, imgui_3.IM_ARRAYSIZE(buf.value));
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
            ImGui.Image(my_tex_id, new imgui_6.ImVec2(my_tex_w, my_tex_h), new imgui_6.ImVec2(0, 0), new imgui_6.ImVec2(1, 1), new imgui_7.ImVec4(1.0, 1.0, 1.0, 1.0), new imgui_7.ImVec4(1.0, 1.0, 1.0, 0.5));
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
                const uv0 = new imgui_6.ImVec2((focus_x) / my_tex_w, (focus_y) / my_tex_h);
                const uv1 = new imgui_6.ImVec2((focus_x + focus_sz) / my_tex_w, (focus_y + focus_sz) / my_tex_h);
                // ImGui.Image(my_tex_id, ImVec2(128,128), uv0, uv1, ImColor(255,255,255,255), ImColor(255,255,255,128));
                ImGui.Image(my_tex_id, new imgui_6.ImVec2(128, 128), uv0, uv1, new imgui_7.ImVec4(1.0, 1.0, 1.0, 1.0), new imgui_7.ImVec4(1.0, 1.0, 1.0, 0.5));
                ImGui.EndTooltip();
            }
            ImGui.TextWrapped("And now some textured buttons..");
            /* static */ const pressed_count = STATIC("pressed_count", 0);
            for (let i = 0; i < 8; i++) {
                ImGui.PushID(i);
                let frame_padding = -1 + i; // -1 = uses default padding
                if (ImGui.ImageButton(my_tex_id, new imgui_6.ImVec2(32, 32), new imgui_6.ImVec2(0, 0), new imgui_6.ImVec2(32.0 / my_tex_w, 32 / my_tex_h), frame_padding, new imgui_7.ImVec4(0, 0, 0, 1)))
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
                if (ImGui.Selectable("5. I am double clickable", selection.value[4], 4 /* AllowDoubleClick */))
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
                    if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new imgui_6.ImVec2(50, 50))) {
                        let x = i % 4, y = i / 4;
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
            ImGui.InputText("decimal", buf2.value, imgui_3.IM_ARRAYSIZE(buf2.value), 1 /* CharsDecimal */);
            /* static */ const buf3 = STATIC("buf3", new imgui_4.ImStringBuffer(64, ""));
            ImGui.InputText("hexadecimal", buf3.value, imgui_3.IM_ARRAYSIZE(buf3.value), 2 /* CharsHexadecimal */ | 4 /* CharsUppercase */);
            /* static */ const buf4 = STATIC("buf4", new imgui_4.ImStringBuffer(64, ""));
            ImGui.InputText("uppercase", buf4.value, imgui_3.IM_ARRAYSIZE(buf4.value), 4 /* CharsUppercase */);
            /* static */ const buf5 = STATIC("buf5", new imgui_4.ImStringBuffer(64, ""));
            ImGui.InputText("no blank", buf5.value, imgui_3.IM_ARRAYSIZE(buf5.value), 8 /* CharsNoBlank */);
            class TextFilters {
                static FilterImGuiLetters(data) { if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar)))
                    return 0; return 1; }
            }
            /* static */ const buf6 = STATIC("buf6", new imgui_4.ImStringBuffer(64, ""));
            ImGui.InputText("\"imgui\" letters", buf6.value, imgui_3.IM_ARRAYSIZE(buf6.value), 512 /* CallbackCharFilter */, TextFilters.FilterImGuiLetters);
            ImGui.Text("Password input");
            /* static */ const bufpass = STATIC("bufpass", new imgui_4.ImStringBuffer(64, "password123"));
            ImGui.InputText("password", bufpass.value, imgui_3.IM_ARRAYSIZE(bufpass.value), 32768 /* Password */ | 8 /* CharsNoBlank */);
            ImGui.SameLine();
            ShowHelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
            ImGui.InputText("password (clear)", bufpass.value, imgui_3.IM_ARRAYSIZE(bufpass.value), 8 /* CharsNoBlank */);
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
            ImGui.PushStyleVar(10 /* FramePadding */, new imgui_6.ImVec2(0, 0));
            ImGui.Checkbox("Read-only", (value = read_only.value) => read_only.value = value);
            ImGui.PopStyleVar();
            ImGui.InputTextMultiline("##source", text.value, imgui_3.IM_ARRAYSIZE(text.value), new imgui_6.ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), 1024 /* AllowTabInput */ | (read_only.value ? 16384 /* ReadOnly */ : 0));
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Plots widgets")) {
            /* static */ const animate = STATIC("animate", true);
            ImGui.Checkbox("Animate", (value = animate.value) => animate.value = value);
            /* static */ const arr = STATIC("arr", [0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2]);
            ImGui.PlotLines_Array("Frame Times", arr.value, imgui_3.IM_ARRAYSIZE(arr.value));
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
                values_offset.value = (values_offset.value + 1) % imgui_3.IM_ARRAYSIZE(values.value);
                phase.value += 0.10 * values_offset.value;
                refresh_time.value += 1.0 / 60.0;
            }
            ImGui.PlotLines_Array("Lines", values.value, imgui_3.IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new imgui_6.ImVec2(0, 80));
            ImGui.PlotHistogram_Array("Histogram", arr.value, imgui_3.IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new imgui_6.ImVec2(0, 80));
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
            ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_6.ImVec2(0, 80));
            ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new imgui_6.ImVec2(0, 80));
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
            ImGui.ProgressBar(progress.value, new imgui_6.ImVec2(0.0, 0.0));
            ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
            ImGui.Text("Progress Bar");
            const progress_saturated = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
            const buf = `${(progress_saturated * 1753).toFixed(0)}/${1753}`;
            ImGui.ProgressBar(progress.value, new imgui_6.ImVec2(0., 0.), buf);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Color/Picker Widgets")) {
            /* static */ const color = STATIC("color#863", new imgui_9.ImColor(114, 144, 154, 200).toImVec4());
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
            const misc_flags = (hdr.value ? 4096 /* HDR */ : 0) | (alpha_half_preview.value ? 2048 /* AlphaPreviewHalf */ : (alpha_preview.value ? 1024 /* AlphaPreview */ : 0)) | (options_menu.value ? 0 : 8 /* NoOptions */);
            ImGui.Text("Color widget:");
            ImGui.SameLine();
            ShowHelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
            ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);
            ImGui.Text("Color widget HSV with Alpha:");
            ImGui.ColorEdit4("MyColor##2", color.value, 16384 /* HSV */ | misc_flags);
            ImGui.Text("Color widget with Float Display:");
            ImGui.ColorEdit4("MyColor##2f", color.value, 131072 /* Float */ | misc_flags);
            ImGui.Text("Color button with Picker:");
            ImGui.SameLine();
            ShowHelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
            ImGui.ColorEdit4("MyColor##3", color.value, 32 /* NoInputs */ | 128 /* NoLabel */ | misc_flags);
            ImGui.Text("Color button with Custom Picker Popup:");
            // Generate a dummy palette
            /* static */ const saved_palette_inited = STATIC("saved_palette_inited", false);
            /* static */ const saved_palette = STATIC("saved_palette", []);
            if (!saved_palette_inited.value)
                for (let n = 0; n < 32; n++) {
                    saved_palette.value[n] = new imgui_7.ImVec4();
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
            /* static */ const backup_color = STATIC("backup_color", new imgui_7.ImVec4());
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
                ImGui.ColorPicker4("##picker", color.value, misc_flags | 256 /* NoSidePreview */ | 16 /* NoSmallPreview */);
                ImGui.SameLine();
                ImGui.BeginGroup();
                ImGui.Text("Current");
                ImGui.ColorButton("##current", color.value, 4 /* NoPicker */ | 2048 /* AlphaPreviewHalf */, new imgui_6.ImVec2(60, 40));
                ImGui.Text("Previous");
                if (ImGui.ColorButton("##previous", backup_color.value, 4 /* NoPicker */ | 2048 /* AlphaPreviewHalf */, new imgui_6.ImVec2(60, 40)))
                    color.value.Copy(backup_color.value);
                ImGui.Separator();
                ImGui.Text("Palette");
                for (let n = 0; n < imgui_3.IM_ARRAYSIZE(saved_palette.value); n++) {
                    ImGui.PushID(n);
                    if ((n % 8) !== 0)
                        ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                    if (ImGui.ColorButton("##palette", saved_palette.value[n], 2 /* NoAlpha */ | 4 /* NoPicker */ | 64 /* NoTooltip */, new imgui_6.ImVec2(20, 20)))
                        color.value.Copy(new imgui_7.ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!
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
            ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new imgui_6.ImVec2(80, 80));
            ImGui.Text("Color picker:");
            /* static */ const alpha = STATIC("alpha", true);
            /* static */ const alpha_bar = STATIC("alpha_bar", true);
            /* static */ const side_preview = STATIC("side_preview", true);
            /* static */ const ref_color = STATIC("ref_color", false);
            /* static */ const ref_color_v = STATIC("ref_color_v", new imgui_7.ImVec4(1.0, 0.0, 1.0, 0.5));
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
                    ImGui.ColorEdit4("##RefColor", ref_color_v.value, 32 /* NoInputs */ | misc_flags);
                }
            }
            ImGui.Combo("Inputs Mode", (value = inputs_mode.value) => inputs_mode.value = value, "All Inputs\0No Inputs\0RGB Input\0HSV Input\0HEX Input\0");
            ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
            ImGui.SameLine();
            ShowHelpMarker("User can right-click the picker to change mode.");
            let flags = misc_flags;
            if (!alpha.value)
                flags |= 2 /* NoAlpha */; // This is by default if you call ColorPicker3() instead of ColorPicker4()
            if (alpha_bar.value)
                flags |= 512 /* AlphaBar */;
            if (!side_preview.value)
                flags |= 256 /* NoSidePreview */;
            if (picker_mode.value === 1)
                flags |= 262144 /* PickerHueBar */;
            if (picker_mode.value === 2)
                flags |= 524288 /* PickerHueWheel */;
            if (inputs_mode.value === 1)
                flags |= 32 /* NoInputs */;
            if (inputs_mode.value === 2)
                flags |= 8192 /* RGB */;
            if (inputs_mode.value === 3)
                flags |= 16384 /* HSV */;
            if (inputs_mode.value === 4)
                flags |= 32768 /* HEX */;
            ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);
            ImGui.Text("Programmatically set defaults/options:");
            ImGui.SameLine();
            ShowHelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
            if (ImGui.Button("Uint8 + HSV"))
                ImGui.SetColorEditOptions(65536 /* Uint8 */ | 16384 /* HSV */);
            ImGui.SameLine();
            if (ImGui.Button("Float + HDR"))
                ImGui.SetColorEditOptions(131072 /* Float */ | 8192 /* RGB */);
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
            ImGui.PushStyleVar(13 /* ItemSpacing */, new imgui_6.ImVec2(spacing, spacing));
            /* static */ const int_value = STATIC("int_value", 0);
            ImGui.VSliderInt("##int", new imgui_6.ImVec2(18, 160), (value = int_value.value) => int_value.value = value, 0, 5);
            ImGui.SameLine();
            /* static */ const values = STATIC("values#1072", [0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0]);
            ImGui.PushID("set1");
            for (let i = 0; i < 7; i++) {
                if (i > 0)
                    ImGui.SameLine();
                ImGui.PushID(i);
                ImGui.PushStyleColor(7 /* FrameBg */, imgui_9.ImColor.HSV(i / 7.0, 0.5, 0.5));
                ImGui.PushStyleColor(8 /* FrameBgHovered */, imgui_9.ImColor.HSV(i / 7.0, 0.6, 0.5));
                ImGui.PushStyleColor(9 /* FrameBgActive */, imgui_9.ImColor.HSV(i / 7.0, 0.7, 0.5));
                ImGui.PushStyleColor(19 /* SliderGrab */, imgui_9.ImColor.HSV(i / 7.0, 0.9, 0.9));
                ImGui.VSliderFloat("##v", new imgui_6.ImVec2(18, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
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
            const small_slider_size = new imgui_6.ImVec2(18, (160.0 - (rows - 1) * spacing) / rows);
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
                ImGui.PushStyleVar(18 /* GrabMinSize */, 40);
                ImGui.VSliderFloat("##v", new imgui_6.ImVec2(40, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
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
            goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, 32 /* EnterReturnsTrue */) || goto_line;
            ImGui.PopItemWidth();
            // Child 1: no border, enable horizontal scrollbar
            {
                ImGui.BeginChild("Child1", new imgui_6.ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5, 300), false, 2048 /* HorizontalScrollbar */ | (disable_mouse_wheel.value ? 16 /* NoScrollWithMouse */ : 0));
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
                ImGui.PushStyleVar(6 /* ChildRounding */, 5.0);
                ImGui.BeginChild("Child2", new imgui_6.ImVec2(0, 300), true, (disable_mouse_wheel.value ? 16 /* NoScrollWithMouse */ : 0) | (disable_menu.value ? 0 : 1024 /* MenuBar */));
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
                    ImGui.Button(buf, new imgui_6.ImVec2(-1.0, 0.0));
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
            ImGui.TextColored(new imgui_7.ImVec4(1, 1, 0, 1), "Sailor");
            // Adjust spacing
            ImGui.Text("More spacing: Hello");
            ImGui.SameLine(0, 20);
            ImGui.TextColored(new imgui_7.ImVec4(1, 1, 0, 1), "Sailor");
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
            const sz = new imgui_6.ImVec2(30, 30);
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
            ImGui.PlotHistogram_Array("##values", values, imgui_3.IM_ARRAYSIZE(values), 0, null, 0.0, 1.0, size);
            ImGui.Button("ACTION", new imgui_6.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
            ImGui.SameLine();
            ImGui.Button("REACTION", new imgui_6.ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
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
                ImGui.BeginChild(ImGui.GetID(i), new imgui_6.ImVec2(ImGui.GetWindowWidth() * 0.17, 200.0), true);
                if (scroll_to)
                    ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_px.value, i * 0.25);
                for (let line = 0; line < 100; line++) {
                    if (track.value && line === track_line.value) {
                        ImGui.TextColored(new imgui_9.ImColor(255, 255, 0), `Line ${line}`);
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
            ImGui.PushStyleVar(11 /* FrameRounding */, 3.0);
            ImGui.PushStyleVar(10 /* FramePadding */, new imgui_6.ImVec2(2.0, 1.0));
            ImGui.BeginChild("scrolling", new imgui_6.ImVec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30), true, 2048 /* HorizontalScrollbar */);
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
                    ImGui.PushStyleColor(21 /* Button */, imgui_9.ImColor.HSV(hue, 0.6, 0.6));
                    ImGui.PushStyleColor(22 /* ButtonHovered */, imgui_9.ImColor.HSV(hue, 0.7, 0.7));
                    ImGui.PushStyleColor(23 /* ButtonActive */, imgui_9.ImColor.HSV(hue, 0.8, 0.8));
                    ImGui.Button(label, new imgui_6.ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
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
            /* static */ const size = STATIC("size", new imgui_6.ImVec2(100, 100)), offset = STATIC("offset", new imgui_6.ImVec2(50, 20));
            ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
            ImGui.DragFloat2("size", size.value, 0.5, 0.0, 200.0, "%.0f");
            ImGui.TextWrapped("(Click and drag)");
            const pos = ImGui.GetCursorScreenPos();
            const clip_rect = new imgui_7.ImVec4(pos.x, pos.y, pos.x + size.value.x, pos.y + size.value.y);
            ImGui.InvisibleButton("##dummy", size.value);
            if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) {
                offset.value.x += ImGui.GetIO().MouseDelta.x;
                offset.value.y += ImGui.GetIO().MouseDelta.y;
            }
            ImGui.GetWindowDrawList().AddRectFilled(pos, new imgui_6.ImVec2(pos.x + size.value.x, pos.y + size.value.y), imgui_8.IM_COL32(90, 90, 120, 255));
            ImGui.GetWindowDrawList().AddText_Font(ImGui.GetFont(), ImGui.GetFontSize() * 2.0, new imgui_6.ImVec2(pos.x + offset.value.x, pos.y + offset.value.y), imgui_8.IM_COL32(255, 255, 255, 255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
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
            if (ImGui.BeginPopupModal("Delete?", null, 64 /* AlwaysAutoResize */)) {
                ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
                ImGui.Separator();
                ///* static */ const dummy_i: number = 0;
                //ImGui.Combo("Combo", &dummy_i, "Delete\0Delete harder\0");
                /* static */ const dont_ask_me_next_time = STATIC("dont_ask_me_next_time", false);
                ImGui.PushStyleVar(10 /* FramePadding */, new imgui_6.ImVec2(0, 0));
                ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
                ImGui.PopStyleVar();
                if (ImGui.Button("OK", new imgui_6.ImVec2(120, 0))) {
                    ImGui.CloseCurrentPopup();
                }
                ImGui.SetItemDefaultFocus();
                ImGui.SameLine();
                if (ImGui.Button("Cancel", new imgui_6.ImVec2(120, 0))) {
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
                if (ImGui.Selectable(label, selected.value === i, 2 /* SpanAllColumns */))
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
            ImGui.SetNextWindowContentSize(new imgui_6.ImVec2(1500.0, 0.0));
            ImGui.BeginChild("##ScrollingRegion", new imgui_6.ImVec2(0, ImGui.GetFontSize() * 20), false, 2048 /* HorizontalScrollbar */);
            ImGui.Columns(10);
            const ITEMS_COUNT = 2000;
            const clipper = new imgui_13.ImGuiListClipper(ITEMS_COUNT); // Also demonstrate using the clipper for large list
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
        /* static */ const filter = STATIC("filter#1864", new imgui_11.ImGuiTextFilter);
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
        ImGui.Text(`WantMoveMouse: ${io.WantMoveMouse}`);
        ImGui.Text(`NavActive: ${io.NavActive}, NavVisible: ${io.NavVisible}`);
        ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
        ImGui.SameLine();
        ShowHelpMarker("Request ImGui to render a mouse cursor for you in software. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
        ImGui.CheckboxFlags("io.NavFlags: EnableGamepad", (value = io.NavFlags) => io.NavFlags = value, 2 /* EnableGamepad */);
        ImGui.CheckboxFlags("io.NavFlags: EnableKeyboard", (value = io.NavFlags) => io.NavFlags = value, 1 /* EnableKeyboard */);
        ImGui.CheckboxFlags("io.NavFlags: MoveMouse", (value = io.NavFlags) => io.NavFlags = value, 4 /* MoveMouse */);
        ImGui.SameLine();
        ShowHelpMarker("Request ImGui to move your move cursor when using gamepad/keyboard navigation. NewFrame() will change io.MousePos and set the io.WantMoveMouse flag, your backend will need to apply the new mouse position.");
        if (ImGui.TreeNode("Keyboard, Mouse & Navigation State")) {
            if (ImGui.IsMousePosValid())
                ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.x})`);
            else
                ImGui.Text("Mouse pos: <INVALID>");
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
                if (io.NavInputsDownDuration[i] == 0.0) {
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
            if (focus_ahead != -1)
                ImGui.SetKeyboardFocusHere(focus_ahead);
            ImGui.SliderFloat3("Float3", f3.value, 0.0, 1.0);
            ImGui.TextWrapped("NB: Cursor & selection are preserved when refocusing last used item in code.");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Focused & Hovered Test")) {
            /* static */ const embed_all_inside_a_child_window = STATIC("embed_all_inside_a_child_window", false);
            ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
            if (embed_all_inside_a_child_window.value)
                ImGui.BeginChild("embeddingchild", new imgui_6.ImVec2(0, ImGui.GetFontSize() * 25), true);
            // Testing IsWindowFocused() function with its various flags (note that the flags can be combined)
            ImGui.BulletText(`IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
                `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(1 /* ChildWindows */)}\n` +
                `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(1 /* ChildWindows */ | 2 /* RootWindow */)}\n` +
                `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(2 /* RootWindow */)}\n` +
                `IsWindowFocused(_AnyWindow) = ${ImGui.IsWindowFocused(4 /* AnyWindow */)}\n`);
            // Testing IsWindowHovered() function with its various flags (note that the flags can be combined)
            ImGui.BulletText(`IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
                `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(8 /* AllowWhenBlockedByPopup */)}\n` +
                `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(32 /* AllowWhenBlockedByActiveItem */)}\n` +
                `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(1 /* ChildWindows */)}\n` +
                `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(1 /* ChildWindows */ | 2 /* RootWindow */)}\n` +
                `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(2 /* RootWindow */)}\n"` +
                `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(4 /* AnyWindow */)}\n"`);
            // Testing IsItemHovered() function (because BulletText is an item itself and that would affect the output of IsItemHovered, we pass all lines in a single items to shorten the code)
            ImGui.Button("ITEM");
            ImGui.BulletText(`IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
                `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(8 /* AllowWhenBlockedByPopup */)}\n` +
                `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(32 /* AllowWhenBlockedByActiveItem */)}\n` +
                `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(64 /* AllowWhenOverlapped */)}\n` +
                `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(104 /* RectOnly */)}\n`);
            ImGui.BeginChild("child", new imgui_6.ImVec2(0, 50), true);
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
                // draw_list->AddLine(io.MouseClickedPos[0], io.MousePos, ImGui::GetColorU32(ImGuiCol_Button), 4.0f);
                draw_list.AddLine(io.MouseClickedPos[0], io.MousePos, ImGui.GetColorU32(21 /* Button */), 4.0);
                // draw_list.AddLine(ImGui.CalcItemRectClosestPoint(io.MousePos, true, -2.0), io.MousePos, ImGui.ColorConvertFloat4ToU32(ImGui.GetStyle().Colors[ImGuiCol.Button]), 4.0);
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
            imgui_2.IM_ASSERT(imgui_3.IM_ARRAYSIZE(mouse_cursors_names) === 7 /* COUNT */);
            ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
            ImGui.Text("Hover to see mouse cursors:");
            ImGui.SameLine();
            ShowHelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
            for (let i = 0; i < 7 /* COUNT */; i++) {
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
exports.ShowDemoWindow = ShowDemoWindow;
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
exports.ShowStyleSelector = ShowStyleSelector;
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
exports.ShowFontSelector = ShowFontSelector;
function ShowStyleEditor(ref = null) {
    // You can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it compares to an internally stored reference)
    const style = ImGui.GetStyle();
    /* static */ const ref_saved_style = STATIC("ref_saved_style", new imgui_10.ImGuiStyle());
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
            for (let i = 0; i < 45 /* COUNT */; i++) {
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
        /* static */ const filter = STATIC("filter#2223", new imgui_11.ImGuiTextFilter());
        filter.value.Draw("Filter colors", 200);
        /* static */ const alpha_flags = STATIC("alpha_flags", 0);
        ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0);
        ImGui.SameLine();
        ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, 1024 /* AlphaPreview */);
        ImGui.SameLine();
        ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, 2048 /* AlphaPreviewHalf */);
        ImGui.BeginChild("#colors", new imgui_6.ImVec2(0, 300), true, 16384 /* AlwaysVerticalScrollbar */ | 32768 /* AlwaysHorizontalScrollbar */ | 8388608 /* NavFlattened */);
        ImGui.PushItemWidth(-160);
        for (let i = 0; i < 45 /* COUNT */; i++) {
            const name = ImGui.GetStyleColorName(i);
            if (!filter.value.PassFilter(name))
                continue;
            ImGui.PushID(i);
            ImGui.ColorEdit4("##color", style.Colors[i], 512 /* AlphaBar */ | alpha_flags.value);
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
            ImGui.Image(atlas.TexID, new imgui_6.ImVec2(atlas.TexWidth, atlas.TexHeight), new imgui_6.ImVec2(0, 0), new imgui_6.ImVec2(1, 1), new imgui_9.ImColor(255, 255, 255, 255).Value, new imgui_9.ImColor(255, 255, 255, 128).Value);
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
exports.ShowStyleEditor = ShowStyleEditor;
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
        ImGui.BeginChild("child", new imgui_6.ImVec2(0, 60), true);
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
        for (let i = 0; i < 45 /* COUNT */; i++) {
            const name = ImGui.GetStyleColorName(i);
            ImGui.ColorButton(name, ImGui.GetStyleColorVec4(i));
            const p = ImGui.GetCursorScreenPos();
            ImGui.GetWindowDrawList().AddRectFilled(p, new imgui_6.ImVec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i));
            ImGui.Dummy(new imgui_6.ImVec2(sz, sz));
            ImGui.SameLine();
            ImGui.MenuItem(name);
        }
        ImGui.EndMenu();
    }
    if (ImGui.BeginMenu("Disabled", false)) {
        imgui_2.IM_ASSERT(0);
    }
    if (ImGui.MenuItem("Checked", null, true)) { }
    if (ImGui.MenuItem("Quit", "Alt+F4")) { }
}
// Demonstrate creating a window which gets auto-resized according to its content.
function ShowExampleAppAutoResize(p_open) {
    if (!ImGui.Begin("Example: Auto-resizing window", p_open, 64 /* AlwaysAutoResize */)) {
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
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(-1, 0), new imgui_6.ImVec2(-1, Number.MAX_VALUE)); // Vertical only
    if (type.value === 1)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(0, -1), new imgui_6.ImVec2(Number.MAX_VALUE, -1)); // Horizontal only
    if (type.value === 2)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(100, 100), new imgui_6.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
    if (type.value === 3)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(400, -1), new imgui_6.ImVec2(500, -1)); // Width 400-500
    if (type.value === 4)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(-1, 400), new imgui_6.ImVec2(-1, 500)); // Height 400-500
    if (type.value === 5)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(0, 0), new imgui_6.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square); // Always Square
    if (type.value === 6)
        ImGui.SetNextWindowSizeConstraints(new imgui_6.ImVec2(0, 0), new imgui_6.ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100); // Fixed Step
    const flags = auto_resize.value ? 64 /* AlwaysAutoResize */ : 0;
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
            ImGui.SetWindowSize(new imgui_6.ImVec2(200, 200));
        }
        ImGui.SameLine();
        if (ImGui.Button("500x500")) {
            ImGui.SetWindowSize(new imgui_6.ImVec2(500, 500));
        }
        ImGui.SameLine();
        if (ImGui.Button("800x200")) {
            ImGui.SetWindowSize(new imgui_6.ImVec2(800, 200));
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
function ShowExampleAppFixedOverlay(p_open) {
    const DISTANCE = 10.0;
    /* static */ const corner = STATIC("corner", 0);
    const window_pos = new imgui_6.ImVec2((corner.value & 1) ? ImGui.GetIO().DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? ImGui.GetIO().DisplaySize.y - DISTANCE : DISTANCE);
    const window_pos_pivot = new imgui_6.ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
    ImGui.SetNextWindowPos(window_pos, 1 /* Always */, window_pos_pivot);
    ImGui.SetNextWindowBgAlpha(0.3); // Transparent background
    if (ImGui.Begin("Example: Fixed Overlay", p_open, 1 /* NoTitleBar */ | 2 /* NoResize */ | 64 /* AlwaysAutoResize */ | 4 /* NoMove */ | 256 /* NoSavedSettings */)) {
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
    ImGui.SetNextWindowPos(new imgui_6.ImVec2(100, 100), 4 /* FirstUseEver */);
    ImGui.Begin("Same title as another window##1");
    ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
    ImGui.End();
    ImGui.SetNextWindowPos(new imgui_6.ImVec2(100, 200), 4 /* FirstUseEver */);
    ImGui.Begin("Same title as another window##2");
    ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
    ImGui.End();
    // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
    const buf = `Animated title ${"|/-\\".charAt((ImGui.GetTime() / 0.25) & 3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
    ImGui.SetNextWindowPos(new imgui_6.ImVec2(100, 300), 4 /* FirstUseEver */);
    ImGui.Begin(buf);
    ImGui.Text("This window has a changing title.");
    ImGui.End();
}
// Demonstrate using the low-level ImDrawList to draw custom shapes. 
function ShowExampleAppCustomRendering(p_open) {
    ImGui.SetNextWindowSize(new imgui_6.ImVec2(350, 560), 4 /* FirstUseEver */);
    if (!ImGui.Begin("Example: Custom rendering", p_open)) {
        ImGui.End();
        return;
    }
    // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of overloaded operators, etc.
    // Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your types and ImVec2/ImVec4.
    // ImGui defines overloaded operators but they are internal to imgui.cpp and not exposed outside (to avoid messing with your types)
    // In this example we are not using the maths operators!
    // ImDrawList* draw_list = ImGui.GetWindowDrawList();
    const draw_list = ImGui.GetWindowDrawList();
    // Primitives
    ImGui.Text("Primitives");
    /* static */ const sz = STATIC("sz", 36.0);
    /* static */ const col = STATIC("color#2583", new imgui_7.ImVec4(1.0, 1.0, 0.4, 1.0));
    ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
    ImGui.ColorEdit3("Color", col.value);
    {
        const p = ImGui.GetCursorScreenPos();
        const col32 = imgui_8.IM_COL32(col.value.x * 255, col.value.y * 255, col.value.z * 255, col.value.w * 255);
        let x = p.x + 4.0, y = p.y + 4.0, spacing = 8.0;
        for (let n = 0; n < 2; n++) {
            const thickness = (n === 0) ? 1.0 : 4.0;
            draw_list.AddCircle(new imgui_6.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 20, thickness);
            x += sz.value + spacing;
            draw_list.AddRect(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, 0.0, 15 /* All */, thickness);
            x += sz.value + spacing;
            draw_list.AddRect(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, 10.0, 15 /* All */, thickness);
            x += sz.value + spacing;
            draw_list.AddRect(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, 10.0, 1 /* TopLeft */ | 8 /* BotRight */, thickness);
            x += sz.value + spacing;
            draw_list.AddTriangle(new imgui_6.ImVec2(x + sz.value * 0.5, y), new imgui_6.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_6.ImVec2(x, y + sz.value - 0.5), col32, thickness);
            x += sz.value + spacing;
            draw_list.AddLine(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y), col32, thickness);
            x += sz.value + spacing;
            draw_list.AddLine(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, thickness);
            x += sz.value + spacing;
            draw_list.AddLine(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x, y + sz.value), col32, thickness);
            x += spacing;
            draw_list.AddBezierCurve(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value * 1.3, y + sz.value * 0.3), new imgui_6.ImVec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, thickness);
            x = p.x + 4;
            y += sz.value + spacing;
        }
        draw_list.AddCircleFilled(new imgui_6.ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 32);
        x += sz.value + spacing;
        draw_list.AddRectFilled(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32);
        x += sz.value + spacing;
        draw_list.AddRectFilled(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, 10.0);
        x += sz.value + spacing;
        draw_list.AddRectFilled(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), col32, 10.0, 1 /* TopLeft */ | 8 /* BotRight */);
        x += sz.value + spacing;
        draw_list.AddTriangleFilled(new imgui_6.ImVec2(x + sz.value * 0.5, y), new imgui_6.ImVec2(x + sz.value, y + sz.value - 0.5), new imgui_6.ImVec2(x, y + sz.value - 0.5), col32);
        x += sz.value + spacing;
        draw_list.AddRectFilledMultiColor(new imgui_6.ImVec2(x, y), new imgui_6.ImVec2(x + sz.value, y + sz.value), imgui_8.IM_COL32(0, 0, 0), imgui_8.IM_COL32(255, 0, 0), imgui_8.IM_COL32(255, 255, 0), imgui_8.IM_COL32(0, 255, 0));
        ImGui.Dummy(new imgui_6.ImVec2((sz.value + spacing) * 8, (sz.value + spacing) * 3));
    }
    ImGui.Separator();
    {
        /* static */ const points = STATIC("points", new imgui_5.ImVector());
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
        draw_list.AddRectFilledMultiColor(canvas_pos, new imgui_6.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_8.IM_COL32(50, 50, 50), imgui_8.IM_COL32(50, 50, 60), imgui_8.IM_COL32(60, 60, 70), imgui_8.IM_COL32(50, 50, 60));
        draw_list.AddRect(canvas_pos, new imgui_6.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), imgui_8.IM_COL32(255, 255, 255));
        let adding_preview = false;
        ImGui.InvisibleButton("canvas", canvas_size);
        const mouse_pos_in_canvas = new imgui_6.ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
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
        draw_list.PushClipRect(canvas_pos, new imgui_6.ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), true); // clip lines within the canvas (if we resize it, etc.)
        for (let i = 0; i < points.value.Size - 1; i += 2)
            draw_list.AddLine(new imgui_6.ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new imgui_6.ImVec2(canvas_pos.x + points.value.Data[i + 1].x, canvas_pos.y + points.value.Data[i + 1].y), imgui_8.IM_COL32(255, 255, 0, 255), 2.0);
        draw_list.PopClipRect();
        if (adding_preview)
            points.value.pop_back();
    }
    ImGui.End();
}
// Demonstrating creating a simple console window, with scrolling, filtering, completion and history.
// For the console example, here we are using a more C++ like approach of declaring a class to hold the data and the functions.
class ExampleAppConsole {
    constructor() {
        // char                  InputBuf[256];
        this.InputBuf = new imgui_4.ImStringBuffer(256, "");
        // ImVector<char*>       Items;
        this.Items = new imgui_5.ImVector();
        // bool                  ScrollToBottom;
        this.ScrollToBottom = false;
        // ImVector<char*>       History;
        this.History = new imgui_5.ImVector();
        // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
        this.HistoryPos = -1;
        // ImVector<const char*> Commands;
        this.Commands = new imgui_5.ImVector();
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
        ImGui.SetNextWindowSize(new imgui_6.ImVec2(520, 600), 4 /* FirstUseEver */);
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
        ImGui.PushStyleVar(10 /* FramePadding */, new imgui_6.ImVec2(0, 0));
        /* static */ const filter = STATIC("filter#2763", new imgui_11.ImGuiTextFilter());
        filter.value.Draw("Filter (\"incl,-excl\") (\"error\")", 180);
        ImGui.PopStyleVar();
        ImGui.Separator();
        const footer_height_to_reserve = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
        ImGui.BeginChild("ScrollingRegion", new imgui_6.ImVec2(0, -footer_height_to_reserve), false, 2048 /* HorizontalScrollbar */); // Leave room for 1 separator + 1 InputText
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
        ImGui.PushStyleVar(13 /* ItemSpacing */, new imgui_6.ImVec2(4, 1)); // Tighten spacing
        if (copy_to_clipboard)
            ImGui.LogToClipboard();
        const col_default_text = ImGui.GetStyleColorVec4(0 /* Text */);
        for (let i = 0; i < this.Items.Size; i++) {
            // const char* item = Items[i];
            const item = this.Items.Data[i];
            if (!filter.value.PassFilter(item))
                continue;
            let col = col_default_text;
            // if (strstr(item, "[error]")) col = ImColor(1.0f,0.4f,0.4f,1.0f);
            if (/\[error\]/.test(item))
                col = new imgui_7.ImVec4(1.0, 0.4, 0.4, 1.0);
            else if (/^# /.test(item))
                col = new imgui_7.ImVec4(1.0, 0.78, 0.58, 1.0);
            ImGui.PushStyleColor(0 /* Text */, col);
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
        if (ImGui.InputText("Input", this.InputBuf, imgui_3.IM_ARRAYSIZE(this.InputBuf), 32 /* EnterReturnsTrue */ | 64 /* CallbackCompletion */ | 128 /* CallbackHistory */, ExampleAppConsole.TextEditCallbackStub, this)) {
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
        const console = data.UserData;
        return console.TextEditCallback(data);
    }
    // int     TextEditCallback(ImGuiTextEditCallbackData* data)
    TextEditCallback(data) {
        //AddLog("cursor: %d, selection: %d-%d", data->CursorPos, data->SelectionStart, data->SelectionEnd);
        switch (data.EventFlag) {
            case 64 /* CallbackCompletion */:
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
            case 128 /* CallbackHistory */:
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
}
function ShowExampleAppConsole(p_open) {
    /* static */ const console = STATIC("console", new ExampleAppConsole());
    console.value.Draw("Example: Console", p_open);
}
// Usage:
//  static ExampleAppLog my_log;
//  my_log.AddLog("Hello %d world\n", 123);
//  my_log.Draw("title");
class ExampleAppLog {
    constructor() {
        // ImGuiTextBuffer     Buf;
        this.Buf = new imgui_12.ImGuiTextBuffer();
        // ImGuiTextFilter     Filter;
        this.Filter = new imgui_11.ImGuiTextFilter();
        // ImVector<int>       LineOffsets;        // Index to lines offset
        this.LineOffsets = new imgui_5.ImVector();
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
        for (let new_size = this.Buf.size(); old_size < new_size; old_size++)
            if (this.Buf.Buf[old_size] === '\n')
                this.LineOffsets.push_back(old_size);
        this.ScrollToBottom = true;
    }
    Draw(title, p_open) {
        ImGui.SetNextWindowSize(new imgui_6.ImVec2(500, 400), 4 /* FirstUseEver */);
        ImGui.Begin(title, p_open);
        if (ImGui.Button("Clear"))
            this.Clear();
        ImGui.SameLine();
        const copy = ImGui.Button("Copy");
        ImGui.SameLine();
        this.Filter.Draw("Filter", -100.0);
        ImGui.Separator();
        ImGui.BeginChild("scrolling", new imgui_6.ImVec2(0, 0), false, 2048 /* HorizontalScrollbar */);
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
    ImGui.SetNextWindowSize(new imgui_6.ImVec2(500, 440), 4 /* FirstUseEver */);
    if (ImGui.Begin("Example: Layout", p_open, 1024 /* MenuBar */)) {
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
        ImGui.BeginChild("left pane", new imgui_6.ImVec2(150, 0), true);
        for (let i = 0; i < 100; i++) {
            const label = `MyObject ${i}`;
            if (ImGui.Selectable(label, selected.value === i))
                selected.value = i;
        }
        ImGui.EndChild();
        ImGui.SameLine();
        // right
        ImGui.BeginGroup();
        ImGui.BeginChild("item view", new imgui_6.ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
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
    ImGui.SetNextWindowSize(new imgui_6.ImVec2(430, 450), 4 /* FirstUseEver */);
    if (!ImGui.Begin("Example: Property editor", p_open)) {
        ImGui.End();
        return;
    }
    ShowHelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");
    ImGui.PushStyleVar(10 /* FramePadding */, new imgui_6.ImVec2(2, 2));
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
    ImGui.SetNextWindowSize(new imgui_6.ImVec2(520, 600), 4 /* FirstUseEver */);
    if (!ImGui.Begin("Example: Long text display", p_open)) {
        ImGui.End();
        return;
    }
    /* static */ const test_type = STATIC("test_type", 0);
    /* static */ const log = STATIC("log#3217", new imgui_12.ImGuiTextBuffer());
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
                ImGui.PushStyleVar(13 /* ItemSpacing */, new imgui_6.ImVec2(0, 0));
                const clipper = new imgui_13.ImGuiListClipper(lines.value);
                while (clipper.Step())
                    for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                        ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
                // clipper.delete(); // NOTE: native emscripten class
                ImGui.PopStyleVar();
                break;
            }
        case 2:
            // Multiple calls to Text(), not clipped (slow)
            ImGui.PushStyleVar(13 /* ItemSpacing */, new imgui_6.ImVec2(0, 0));
            for (let i = 0; i < lines.value; i++)
                ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
            ImGui.PopStyleVar();
            break;
    }
    ImGui.EndChild();
    ImGui.End();
}
// End of Demo code
// #else
// export function ShowDemoWindow(p_open: ImAccess<boolean>): void {}
// export function ShowUserGuide(): void {}
// export function ShowStyleSelector(label: string): boolean { return false; }
// export function ShowFontSelector(label: string): void {}
// export function ShowStyleEditor(ref: ImGuiStyle | null = null): void {}
// #endif
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfZGVtby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUF3QjtBQUN4QixjQUFjOztBQUVkLGlHQUFpRztBQUNqRyxzSUFBc0k7QUFDdEksdUdBQXVHO0FBQ3ZHLGdKQUFnSjtBQUNoSiwwSkFBMEo7QUFDMUosMEZBQTBGO0FBQzFGLHNLQUFzSztBQUN0Syx3SEFBd0g7QUFDeEgsYUFBYTtBQUNiLCtEQUErRDtBQUUvRCxzSkFBc0o7QUFDdEosaUpBQWlKO0FBQ2pKLHNJQUFzSTtBQUN0SSw0SkFBNEo7QUFDNUosa0tBQWtLO0FBRWxLLDZEQUE2RDtBQUM3RCxrQ0FBa0M7QUFDbEMsU0FBUztBQUVULHFCQUFxQjtBQUNyQixrREFBa0Q7QUFDbEQsd0VBQXdFO0FBQ3hFLDJEQUEyRDtBQUMzRCwwREFBMEQ7QUFDMUQsb0VBQW9FO0FBQ3BFLDBDQUEwQztBQUMxQyxRQUFRO0FBQ1IsMENBQTBDO0FBQzFDLFNBQVM7QUFFVCxpQ0FBaUM7QUFDakMsbUNBQXdDO0FBQ3hDLG1DQUFvQztBQUNwQyxtQ0FBdUM7QUFDdkMsbUNBQXlDO0FBcUJ6QyxtQ0FBbUM7QUFDbkMsbUNBQW1EO0FBQ25ELG1DQUFtRDtBQUNuRCxtQ0FBbUM7QUFDbkMsbUNBQWtDO0FBRWxDLG9DQUFxQztBQUVyQyxvQ0FBMEM7QUFDMUMsb0NBQTBDO0FBQzFDLG9DQUEyQztBQUkzQyxrQkFBa0I7QUFDbEIsa0lBQWtJO0FBQ2xJLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsbUJBQW1CO0FBQ25CLCtKQUErSjtBQUMvSixzTUFBc007QUFDdE0sZ0lBQWdJO0FBQ2hJLDhIQUE4SDtBQUM5SCx3VEFBd1Q7QUFDeFQsMkNBQTJDO0FBQzNDLHFJQUFxSTtBQUNySSxTQUFTO0FBQ1QsMEJBQTBCO0FBQzFCLDZIQUE2SDtBQUM3SCw0SUFBNEk7QUFDNUksNkpBQTZKO0FBQzdKLG1JQUFtSTtBQUNuSSxzQkFB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QyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQy9HLENBQUM7d0JBQ0csSUFBSSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxLQUFLLENBQUMs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QUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRyxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQ3BKLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxjQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQVEsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pILEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFDLEdBQUcsRUFBRSxJQUFJLGNBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBUSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFFLCtCQUErQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDMU4sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FDckQsQ0FBQztRQUNHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDN0IsQ0FBQztZQUNHLEtBQUssQ0FBQyxXQUFXLENBQUMsK0hBQStILENBQUMsQ0FBQztZQUVuSixZQUFZLENBQUMsTUFBTSxhQUFhLEdBQW1CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRSxNQUFNLEtBQUssR0FBYSxDQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUUsQ0FBQztZQUNsRixZQUFZLENBQUMsTUFBTSxPQUFPLEdBQXNCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFFLENBQUMsQ0FBQztZQUV4Ryx5QkFBeUI7WUFDekIsZ0xBQWdMO1lBQ2hMLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUMvQixDQUFDO2dCQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDeEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQixDQUFDO1lBRUQsOEJBQThCO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUMvQixDQUFDO2dCQUNHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFDNUMsQ0FBQztvQkFDRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDekYsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQ2hDLENBQUM7b0JBQ0csS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNwQixDQUFDO2dCQUVELEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN0QixLQUFLLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBRXBELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FDdEMsQ0FBQztvQkFDRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQzVDLENBQUM7d0JBQ0csS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ3pGLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUNoQyxDQUFDO3dCQUNHLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzNCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQztvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDbEMsQ0FBQztnQkFDRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN0QixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckIsQ0FBQztZQUVELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUNwQyxDQUFDO1lBQ0csb0dBQW9HO1lBQ3BHLCtDQUErQztZQUMvQyx1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDZJQUE2STtZQUM3SSxZQUFZLENBQUMsTUFBTSxLQUFLLEdBQW1CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQ3JELENBQUM7Z0JBQ0csRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDdkQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztnQkFDeEQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQixDQUFDO1lBRUQsWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUEyQixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksc0JBQWMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRyxNQUFNLEdBQUcsR0FBVyxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxXQUFXLENBQUMsQ0FBQyx3REFBd0Q7WUFDckgsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUNsQyxDQUFDO2dCQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzlCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQixDQUFDO1lBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRXZELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUM3QixDQUFDO1lBQ0csS0FBSyxDQUFDLFdBQVcsQ0FBQyw4RkFBOEYsQ0FBQyxDQUFDO1lBRWxILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsSUFBSSw0QkFBb0MsQ0FBQyxDQUM5RSxDQUFDO2dCQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsa0ZBQWtGLENBQUMsQ0FBQztnQkFDL0YsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVsQix5Q0FBeUM7Z0JBQ3pDLDREQUE0RDtnQkFFNUQsWUFBWSxDQUFDLE1BQU0scUJBQXFCLEdBQW9CLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkcsS0FBSyxDQUFDLFlBQVksd0JBQTZCLElBQUksY0FBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxLQUFLLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN2SCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksY0FBTSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUN6RSxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLGNBQU0sQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQUMsQ0FBQztnQkFDN0UsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUN2QyxDQUFDO2dCQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0dBQWdHLENBQUMsQ0FBQztnQkFDN0csWUFBWSxDQUFDLE1BQU0sSUFBSSxHQUFtQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUNyRyxZQUFZLENBQUMsTUFBTSxLQUFLLEdBQTZCLE1BQU0sQ0FBbUIsU0FBUyxFQUFFLENBQUUsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQztnQkFDOUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUUsa0VBQWtFO2dCQUUzRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3BDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDdkMsQ0FBQztvQkFDRyxLQUFLLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUM5QixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzlCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQixDQUFDO1lBRUQsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FDcEQsQ0FBQztZQUNHLEtBQUssQ0FBQyxXQUFXLENBQUMsa0dBQWtHLENBQUMsQ0FBQztZQUN0SCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEIsbUpBQW1KO1lBQ25KLHVLQUF1SztZQUN2SyxzS0FBc0s7WUFDdEssS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FDcEQsQ0FBQztnQkFDRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN0QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FDdEMsQ0FBQztRQUNHLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEIsZ0JBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDNUIsQ0FBQztZQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSxvQkFBb0I7WUFDNUQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUMzQixDQUFDO2dCQUNHLE1BQU0sS0FBSyxHQUFXLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDL0IsK0NBQStDO2dCQUMvQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkIsQ0FBQztZQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWxCLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7WUFDckQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDMUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sS0FBSyxHQUFrQixDQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFFLENBQUM7WUFDdkQsTUFBTSxLQUFLLEdBQWtCLENBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUUsQ0FBQztZQUN6RSxZQUFZLENBQUMsTUFBTSxRQUFRLEdBQW1CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFDMUIsQ0FBQztnQkFDRyxNQUFNLEtBQUssR0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssS0FBSyxDQUFDLHlCQUFzQyxDQUFDO29CQUNuRixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxPQUFPLEdBQVksS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMvQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2pELENBQUM7WUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELHVFQUF1RTtRQUN2RSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQ2xDLENBQUM7WUFDRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMxQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVuQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsWUFBWSxDQUFDLE1BQU0sR0FBRyxHQUFtQixNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUUsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVuQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUIsWUFBWSxDQUFDLE1BQU0sR0FBRyxHQUFtQixNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0UsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRW5CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMvRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFBQyxDQUFDO1lBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9GLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsZ0JBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztZQUNHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7WUFDbEUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQ2xFLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQzlCLENBQUM7WUFDRyxvRUFBb0U7WUFDcEUsWUFBWSxDQUFDLE1BQU0sU0FBUyxHQUFvQixNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFFLFlBQVksQ0FBQyxNQUFNLFNBQVMsR0FBb0IsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ25GLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ2pGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUM1QixDQUFDO2dCQUNHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN0Qiw2Q0FBNkM7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFXLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUNoQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFFRCxvQkFBb0I7UUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBdUJFO1FBRUYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQzNDLENBQUM7WUFDRyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxjQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLGNBQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssaUNBQXVDLENBQUM7WUFDNUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixNQUFNLFdBQVcsR0FBVyxJQUFJLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQXFCLElBQUkseUJBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxvREFBb0Q7WUFDMUgsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQ3JCLENBQUM7Z0JBQ0csR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7b0JBQzFELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUMzQixDQUFDO3dCQUNHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN2QixDQUFDO1lBQ1QsQ0FBQztZQUNELHFEQUFxRDtZQUNyRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELE1BQU0sU0FBUyxHQUFZLEtBQUssQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNyRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFBQyxjQUFjLENBQUMsMkZBQTJGLENBQUMsQ0FBQztRQUM5SCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDZCxDQUFDO1lBQ0csS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUFDLENBQUM7WUFBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUN4QyxDQUFDO1FBQ0csWUFBWSxDQUFDLE1BQU0sTUFBTSxHQUE0QixNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksd0JBQWUsQ0FBQyxDQUFDO1FBQ2hHLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCO2NBQ2Qsb0NBQW9DO2NBQ3BDLG1EQUFtRDtjQUNuRCw4REFBOEQ7Y0FDOUQsOENBQThDLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLE1BQU0sS0FBSyxHQUFhLENBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBRSxDQUFDO1FBQ3RILEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQ3pELENBQUM7UUFDRyxNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUN2RCxLQUFLLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxpQkFBaUIsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFdkUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUFDLGNBQWMsQ0FBQyxvV0FBb1csQ0FBQyxDQUFDO1FBQ3ZZLEtBQUssQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxLQUFLLHdCQUFvQyxDQUFDO1FBQ25JLEtBQUssQ0FBQyxhQUFhLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxLQUFLLHlCQUFxQyxDQUFDO1FBQ3JJLEtBQUssQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxLQUFLLG9CQUFnQyxDQUFDO1FBQzNILEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUFDLGNBQWMsQ0FBQyw4TUFBOE0sQ0FBQyxDQUFDO1FBRWpQLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1lBQ0csRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLElBQUk7Z0JBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUcsQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBQ2pOLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBVSxDQUFDO29CQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBQ3BLLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDcEssS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFTLENBQUM7b0JBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDcEssS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUssQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBQy9NLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWEsQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBQ3pLLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQVksQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBQ3pLLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFNUksS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBb0IsQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUMzTSxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUksQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUM3SyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUcsQ0FBQztvQkFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQUMsS0FBSyxDQUFDLElBQUks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S0FBSyxHQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDO1lBQzNILFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsZ0JBQXlCLFNBQVMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDO1lBQzdJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksZ0JBQXlCLFNBQVMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDO1lBQzlJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxrQ0FBb0QsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFDLE9BQU8sQ0FBQztZQUM3SyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUks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S0FBSyxFQUFFLENBQUMsQ0FDckQsQ0FBQztnQkFDRyxXQUFXLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUM7UUFDRCxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsR0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBTSx1REFBdUQ7UUFDMUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDN0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBUSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FB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