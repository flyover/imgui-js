// dear imgui, v1.71
// (demo code)

// Message to the person tempted to delete this file when integrating Dear ImGui into their code base:
// Do NOT remove this file from your project! Think again! It is the most useful reference code that you and other coders
// will want to refer to and call. Have the ImGui::ShowDemoWindow() function wired in an always-available debug menu of
// your game/app! Removing this file from your project is hindering access to documentation for everyone in your team,
// likely leading you to poorer usage of the library.
// Everything in this file will be stripped out by the linker if you don't call ImGui::ShowDemoWindow().
// If you want to link core Dear ImGui in your shipped builds but want an easy guarantee that the demo will not be linked,
// you can setup your imconfig.h with #define IMGUI_DISABLE_DEMO_WINDOWS and those functions will be empty.
// In other situation, whenever you have Dear ImGui available you probably want this to be available for reference.
// Thank you,
// -Your beloved friend, imgui_demo.cpp (that you won't delete)

// Message to beginner C/C++ programmers about the meaning of the 'static' keyword:
// In this demo code, we frequently we use 'static' variables inside functions. A static variable persist across calls, so it is
// essentially like a global variable but declared inside the scope of the function. We do this as a way to gather code and data
// in the same place, to make the demo source code faster to read, faster to write, and smaller in size.
// It also happens to be a convenient way of storing simple UI related information as long as your function doesn't need to be 
// reentrant or used in multiple threads. This might be a pattern you will want to use in your code, but most of the real data
// you would be editing is likely going to be stored outside your functions.

// The Demo code is this file is designed to be easy to copy-and-paste in into your application!
// Because of this:
// - We never omit the ImGui:: namespace when calling functions, even though most of our code is already in the same namespace.
// - We try to declare static variables in the local scope, as close as possible to the code using them.
// - We never use any of the helpers/facilities used internally by dear imgui, unless it has been exposed in the public API (imgui.h).
// - We never use maths operators on ImVec2/ImVec4. For other imgui sources files, they are provided by imgui_internal.h w/ IMGUI_DEFINE_MATH_OPERATORS,
//   for your own sources file they are optional and require you either enable those, either provide your own via IM_VEC2_CLASS_EXTRA in imconfig.h.
//   Because we don't want to assume anything about your support of maths operators, we don't use them in imgui_demo.cpp.

/*

Index of this file:

// [SECTION] Forward Declarations, Helpers
// [SECTION] Demo Window / ShowDemoWindow()
// [SECTION] About Window / ShowAboutWindow()
// [SECTION] Style Editor / ShowStyleEditor()
// [SECTION] Example App: Main Menu Bar / ShowExampleAppMainMenuBar()
// [SECTION] Example App: Debug Console / ShowExampleAppConsole()
// [SECTION] Example App: Debug Log / ShowExampleAppLog()
// [SECTION] Example App: Simple Layout / ShowExampleAppLayout()
// [SECTION] Example App: Property Editor / ShowExampleAppPropertyEditor()
// [SECTION] Example App: Long Text / ShowExampleAppLongText()
// [SECTION] Example App: Auto Resize / ShowExampleAppAutoResize()
// [SECTION] Example App: Constrained Resize / ShowExampleAppConstrainedResize()
// [SECTION] Example App: Simple Overlay / ShowExampleAppSimpleOverlay()
// [SECTION] Example App: Manipulating Window Titles / ShowExampleAppWindowTitles()
// [SECTION] Example App: Custom Rendering using ImDrawList API / ShowExampleAppCustomRendering()
// [SECTION] Example App: Documents Handling / ShowExampleAppDocuments()

*/

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

import * as ImGui from "imgui-js";

import { IMGUI_VERSION } from "imgui-js";

import { IM_ASSERT } from "imgui-js";
import { IM_ARRAYSIZE } from "imgui-js";

import { ImStringBuffer } from "imgui-js";
import { ImAccess } from "imgui-js";
import { ImScalar } from "imgui-js";
import { ImTuple3 } from "imgui-js";
import { ImTuple4 } from "imgui-js";
import { ImGuiCol } from "imgui-js";
import { ImGuiColorEditFlags } from "imgui-js";
import { ImGuiSliderFlags } from "imgui-js";
import { ImGuiCond } from "imgui-js";
import { ImGuiFocusedFlags } from "imgui-js";
import { ImGuiHoveredFlags } from "imgui-js";
import { ImGuiInputTextFlags } from "imgui-js";
import { ImGuiMouseCursor } from "imgui-js";
import { ImGuiSelectableFlags } from "imgui-js";
import { ImGuiStyleVar } from "imgui-js";
import { ImGuiTreeNodeFlags } from "imgui-js";
import { ImGuiWindowFlags } from "imgui-js";
import { ImGuiTableFlags } from "imgui-js";
import { ImGuiTableColumnFlags } from "imgui-js";
import { ImGuiTableRowFlags } from "imgui-js";
import { ImGuiTableBgTarget } from "imgui-js";
import { ImGuiTabBarFlags } from "imgui-js";
import { ImGuiTabItemFlags } from "imgui-js";
import { ImGuiInputTextCallbackData } from "imgui-js";
import { ImGuiSizeCallbackData } from "imgui-js";
import { ImDrawCornerFlags } from "imgui-js";
import { ImU32 } from "imgui-js";
import { ImVector } from "imgui-js";
import { ImVec2, interface_ImVec2 } from "imgui-js";
import { ImVec4, interface_ImVec4 } from "imgui-js";
import { IM_COL32 } from "imgui-js";
import { ImColor } from "imgui-js";
import { ImGuiIO } from "imgui-js";
import { ImGuiStyle } from "imgui-js";
import { ImDrawList } from "imgui-js";
import { ImGuiTextFilter } from "imgui-js";
import { ImGuiTextBuffer } from "imgui-js";
import { ImGuiListClipper } from "imgui-js";
import { ImFont } from "imgui-js";
import { ImFontAtlas } from "imgui-js";
import { ImGuiDir } from "imgui-js";

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

function format_number(n: number, radix: number = 10, pad: number = 0, pad_char: string = "0"): string {
    return pad > 0 ? (pad_char.repeat(pad) + n.toString(radix)).substr(-pad) : n.toString(radix);
}

function format_number_dec(n: number, pad: number = 0, pad_char: string = "0"): string {
    return format_number(n, 10, pad, pad_char);
}

function format_number_hex(n: number, pad: number = 0, pad_char: string = "0"): string {
    return format_number(n, 16, pad, pad_char);
}

// Play it nice with Windows users. Notepad in 2017 still doesn't display text data with Unix-style \n.
// #ifdef _WIN32
// #define IM_NEWLINE "\r\n"
// #else
// #define IM_NEWLINE "\n"
// #endif
const IM_NEWLINE: string = "\n";

// #define IM_MAX(_A,_B)       (((_A) >= (_B)) ? (_A) : (_B))
function IM_MAX(_A: number, _B: number): number { return ((_A) >= (_B)) ? (_A) : (_B); }

//-----------------------------------------------------------------------------
// [SECTION] Forward Declarations, Helpers
//-----------------------------------------------------------------------------

// #if !defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS) && defined(IMGUI_DISABLE_TEST_WINDOWS) && !defined(IMGUI_DISABLE_DEMO_WINDOWS)   // Obsolete name since 1.53, TEST->DEMO
// #define IMGUI_DISABLE_DEMO_WINDOWS
// #endif

// #if !defined(IMGUI_DISABLE_DEMO_WINDOWS)

class Static<T> {
    constructor(public value: T) {}
}

const _static: {[key: string]: Static<any>} = {};

function STATIC<T>(key: string, value: T): Static<T> {
    return _static[key] || (_static[key] = new Static<T>(value));
}

let done: boolean = false;

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
function HelpMarker(desc: string): void
{
    ImGui.TextDisabled("(?)");
    if (ImGui.IsItemHovered())
    {
        ImGui.BeginTooltip();
        ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
        ImGui.TextUnformatted(desc);
        ImGui.PopTextWrapPos();
        ImGui.EndTooltip();
    }
}

// Helper to display basic user controls.
export function ShowUserGuide(): void
{
    const io: ImGuiIO = ImGui.GetIO();
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
export function ShowDemoWindow(p_open: ImAccess<boolean> | ImScalar<boolean> | null = null): boolean
{
    done = false;

    // IM_ASSERT(ImGui.GetCurrentContext() !== null && "Missing dear imgui context. Refer to examples app!"); // Exceptionally add an extra assert here for people confused with initial dear imgui setup

    // Examples Apps (accessible from the "Examples" menu)
    /* static */ const show_app_documents: Static<boolean> = STATIC("show_app_documents", false);
    /* static */ const show_app_main_menu_bar: Static<boolean> = STATIC("show_app_main_menu_bar", false);
    /* static */ const show_app_console: Static<boolean> = STATIC("show_app_console", false);
    /* static */ const show_app_log: Static<boolean> = STATIC("show_app_log", false);
    /* static */ const show_app_layout: Static<boolean> = STATIC("show_app_layout", false);
    /* static */ const show_app_property_editor: Static<boolean> = STATIC("show_app_property_editor", false);
    /* static */ const show_app_long_text: Static<boolean> = STATIC("show_app_long_text", false);
    /* static */ const show_app_auto_resize: Static<boolean> = STATIC("show_app_auto_resize", false);
    /* static */ const show_app_constrained_resize: Static<boolean> = STATIC("show_app_constrained_resize", false);
    /* static */ const show_app_simple_overlay: Static<boolean> = STATIC("show_app_simple_overlay", false);
    /* static */ const show_app_window_titles: Static<boolean> = STATIC("show_app_window_titles", false);
    /* static */ const show_app_custom_rendering: Static<boolean> = STATIC("show_app_custom_rendering", false);
    /* static */ const show_backend_checker_window: Static<boolean> = STATIC("show_backend_checker_window", false);

    if (show_app_documents.value)           ShowExampleAppDocuments((value = show_app_documents.value) => show_app_documents.value = value);
    if (show_app_main_menu_bar.value)       ShowExampleAppMainMenuBar();
    if (show_app_console.value)             ShowExampleAppConsole((value = show_app_console.value) => show_app_console.value = value);
    if (show_app_log.value)                 ShowExampleAppLog((value = show_app_log.value) => show_app_log.value = value);
    if (show_app_layout.value)              ShowExampleAppLayout((value = show_app_layout.value) => show_app_layout.value = value);
    if (show_app_property_editor.value)     ShowExampleAppPropertyEditor((value = show_app_property_editor.value) => show_app_property_editor.value = value);
    if (show_app_long_text.value)           ShowExampleAppLongText((value = show_app_long_text.value) => show_app_long_text.value = value);
    if (show_app_auto_resize.value)         ShowExampleAppAutoResize((value = show_app_auto_resize.value) => show_app_auto_resize.value = value);
    if (show_app_constrained_resize.value)  ShowExampleAppConstrainedResize((value = show_app_constrained_resize.value) => show_app_constrained_resize.value = value);
    if (show_app_simple_overlay.value)      ShowExampleAppSimpleOverlay((value = show_app_simple_overlay.value) => show_app_simple_overlay.value = value);
    if (show_app_window_titles.value)       ShowExampleAppWindowTitles((value = show_app_window_titles.value) => show_app_window_titles.value = value);
    if (show_app_custom_rendering.value)    ShowExampleAppCustomRendering((value = show_app_custom_rendering.value) => show_app_custom_rendering.value = value);
    if (show_backend_checker_window.value)  ShowBackendCheckerWindow((value = show_backend_checker_window.value) => show_backend_checker_window.value = value);

    // Dear ImGui Apps (accessible from the "Help" menu)
    /* static */ const show_app_style_editor: Static<boolean> = STATIC("show_app_style_editor", false);
    /* static */ const show_app_metrics: Static<boolean> = STATIC("show_app_metrics", false);
    /* static */ const show_app_about: Static<boolean> = STATIC("show_app_about", false);

    if (show_app_metrics.value)             { ImGui.ShowMetricsWindow((value = show_app_metrics.value) => show_app_metrics.value = value); }
    if (show_app_style_editor.value)        { ImGui.Begin("Style Editor", (value = show_app_style_editor.value) => show_app_style_editor.value = value); /*ImGui.*/ShowStyleEditor(); ImGui.End(); }
    if (show_app_about.value)               { ShowAboutWindow((value = show_app_about.value) => show_app_about.value = value); }

    // Demonstrate the various window flags. Typically you would just use the default!
    /* static */ const no_titlebar: Static<boolean> = STATIC("no_titlebar", false);
    /* static */ const no_scrollbar: Static<boolean> = STATIC("no_scrollbar", false);
    /* static */ const no_menu: Static<boolean> = STATIC("no_menu", false);
    /* static */ const no_move: Static<boolean> = STATIC("no_move", false);
    /* static */ const no_resize: Static<boolean> = STATIC("no_resize", false);
    /* static */ const no_collapse: Static<boolean> = STATIC("no_collapse", false);
    /* static */ const no_close: Static<boolean> = STATIC("no_close", false);
    /* static */ const no_nav: Static<boolean> = STATIC("no_nav", false);
    /* static */ const no_background: Static<boolean> = STATIC("no_background", false);
    /* static */ const no_bring_to_front: Static<boolean> = STATIC("no_bring_to_front", false);

    let window_flags: ImGui.WindowFlags = 0;
    if (no_titlebar.value)        window_flags |= ImGuiWindowFlags.NoTitleBar;
    if (no_scrollbar.value)       window_flags |= ImGuiWindowFlags.NoScrollbar;
    if (!no_menu.value)           window_flags |= ImGuiWindowFlags.MenuBar;
    if (no_move.value)            window_flags |= ImGuiWindowFlags.NoMove;
    if (no_resize.value)          window_flags |= ImGuiWindowFlags.NoResize;
    if (no_collapse.value)        window_flags |= ImGuiWindowFlags.NoCollapse;
    if (no_nav.value)             window_flags |= ImGuiWindowFlags.NoNav;
    if (no_background.value)      window_flags |= ImGuiWindowFlags.NoBackground;
    if (no_bring_to_front.value)  window_flags |= ImGuiWindowFlags.NoBringToFrontOnFocus;
    if (no_close.value)           p_open = null; // Don't pass our bool* to Begin

    // We specify a default position/size in case there's no data in the .ini file. Typically this isn't required! We only do it to make the Demo applications a little more welcoming.
    ImGui.SetNextWindowPos(new ImVec2(650, 20), ImGui.Cond.FirstUseEver);
    ImGui.SetNextWindowSize(new ImVec2(550, 680), ImGuiCond.FirstUseEver);

    // Main body of the Demo window starts here.
    if (!ImGui.Begin("Dear ImGui Demo", p_open, window_flags))
    {
        // Early out if the window is collapsed, as an optimization.
        ImGui.End();
        return done;
    }

    // Most "big" widgets share a common width settings by default.
    //ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.65);    // Use 2/3 of the space for widgets and 1/3 for labels (default)
    ImGui.PushItemWidth(ImGui.GetFontSize() * -12);           // Use fixed width for labels (by passing a negative value), the rest goes to widgets. We choose a width proportional to our font size.

    // Menu Bar
    if (ImGui.BeginMenuBar())
    {
        if (ImGui.BeginMenu("Menu"))
        {
            ShowExampleMenuFile();
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Examples"))
        {
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
        if (ImGui.BeginMenu("Help"))
        {
            ImGui.MenuItem("Metrics", null, (value = show_app_metrics.value) => show_app_metrics.value = value);
            ImGui.MenuItem("Style Editor", null, (value = show_app_style_editor.value) => show_app_style_editor.value = value);
            ImGui.MenuItem("About Dear ImGui", null, (value = show_app_about.value) => show_app_about.value = value);
            ImGui.EndMenu();
        }
        ImGui.EndMenuBar();
    }

    ImGui.Text(`dear imgui says hello. (${IMGUI_VERSION})`);
    ImGui.Spacing();

    if (ImGui.CollapsingHeader("Help"))
    {
        ImGui.Text("PROGRAMMER GUIDE:");
        ImGui.BulletText("Please see the ShowDemoWindow() code in imgui_demo.cpp. <- you are here!");
        ImGui.BulletText("Please see the comments in imgui.cpp.");
        ImGui.BulletText("Please see the examples/ in application.");
        ImGui.BulletText("Enable 'io.ConfigFlags |= NavEnableKeyboard' for keyboard controls.");
        ImGui.BulletText("Enable 'io.ConfigFlags |= NavEnableGamepad' for gamepad controls.");
        ImGui.Separator();

        ImGui.Text("USER GUIDE:");
        /*ImGui.*/ShowUserGuide();
    }

    if (ImGui.CollapsingHeader("Configuration"))
    {
        const io: ImGuiIO = ImGui.GetIO();

        if (ImGui.TreeNode("Configuration##2"))
        {
            ImGui.CheckboxFlags("io.ConfigFlags: NavEnableKeyboard", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableKeyboard);
            ImGui.CheckboxFlags("io.ConfigFlags: NavEnableGamepad", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableGamepad);
            ImGui.SameLine(); HelpMarker("Required back-end to feed in gamepad inputs in io.NavInputs[] and set io.BackendFlags |= ImGuiBackendFlags_HasGamepad.\n\nRead instructions in imgui.cpp for details.");
            ImGui.CheckboxFlags("io.ConfigFlags: NavEnableSetMousePos", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NavEnableSetMousePos);
            ImGui.SameLine(); HelpMarker("Instruct navigation to move the mouse cursor. See comment for ImGuiConfigFlags_NavEnableSetMousePos.");
            ImGui.CheckboxFlags("io.ConfigFlags: NoMouse", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NoMouse);
            if (io.ConfigFlags & ImGui.ConfigFlags.NoMouse) // Create a way to restore this flag otherwise we could be stuck completely!
            {
                if ((ImGui.GetTime() % 0.40) < 0.20)
                {
                    ImGui.SameLine();
                    ImGui.Text("<<PRESS SPACE TO DISABLE>>");
                }
                if (ImGui.IsKeyPressed(ImGui.GetKeyIndex(ImGui.Key.Space)))
                    io.ConfigFlags &= ~ImGui.ConfigFlags.NoMouse;
            }
            ImGui.CheckboxFlags("io.ConfigFlags: NoMouseCursorChange", (value = io.ConfigFlags) => io.ConfigFlags = value, ImGui.ConfigFlags.NoMouseCursorChange);
            ImGui.SameLine(); HelpMarker("Instruct back-end to not alter mouse cursor shape and visibility.");
            ImGui.Checkbox("io.ConfigInputTextCursorBlink", (value = io.ConfigInputTextCursorBlink) => io.ConfigInputTextCursorBlink = value);
            ImGui.SameLine(); HelpMarker("Set to false to disable blinking cursor, for users who consider it distracting");
            ImGui.Checkbox("io.ConfigWindowsResizeFromEdges [beta]", (value = io.ConfigWindowsResizeFromEdges) => io.ConfigWindowsResizeFromEdges = value);
            ImGui.SameLine(); HelpMarker("Enable resizing of windows from their edges and from the lower-left corner.\nThis requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback.");
            ImGui.Checkbox("io.ConfigWindowsMoveFromTitleBarOnly", (value = io.ConfigWindowsMoveFromTitleBarOnly) => io.ConfigWindowsMoveFromTitleBarOnly = value);
            ImGui.Checkbox("io.MouseDrawCursor", (value = io.MouseDrawCursor) => io.MouseDrawCursor = value);
            ImGui.SameLine(); HelpMarker("Instruct Dear ImGui to render a mouse cursor for you. Note that a mouse cursor rendered via your application GPU rendering path will feel more laggy than hardware cursor, but will be more in sync with your other visuals.\n\nSome desktop applications may use both kinds of cursors (e.g. enable software cursor only when resizing/dragging something).");
            ImGui.TreePop();
            ImGui.Separator();
        }

        if (ImGui.TreeNode("Backend Flags"))
        {
            HelpMarker("Those flags are set by the back-ends (imgui_impl_xxx files) to specify their capabilities.");
            let backend_flags: ImGui.BackendFlags = io.BackendFlags; // Make a local copy to avoid modifying the back-end flags.
            ImGui.CheckboxFlags("io.BackendFlags: HasGamepad", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasGamepad);
            ImGui.CheckboxFlags("io.BackendFlags: HasMouseCursors", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasMouseCursors);
            ImGui.CheckboxFlags("io.BackendFlags: HasSetMousePos", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.HasSetMousePos);
            ImGui.CheckboxFlags("io.BackendFlags: RendererHasVtxOffset", (value = backend_flags) => backend_flags = value, ImGui.BackendFlags.RendererHasVtxOffset);
            ImGui.TreePop();
            ImGui.Separator();
        }

        if (ImGui.TreeNode("Style"))
        {
            /*ImGui.*/ShowStyleEditor();
            ImGui.TreePop();
            ImGui.Separator();
        }

        if (ImGui.TreeNode("Capture/Logging"))
        {
            ImGui.TextWrapped("The logging API redirects all text output so you can easily capture the content of a window or a block. Tree nodes can be automatically expanded.");
            HelpMarker("Try opening any of the contents below in this window and then click one of the \"Log To\" button.");
            ImGui.LogButtons();
            ImGui.TextWrapped("You can also call ImGui.LogText() to output directly to the log without a visual output.");
            if (ImGui.Button("Copy \"Hello, world!\" to clipboard"))
            {
                ImGui.LogToClipboard();
                ImGui.LogText("Hello, world!");
                ImGui.LogFinish();
            }
            ImGui.TreePop();
        }
    }

    if (ImGui.CollapsingHeader("Window options"))
    {
        ImGui.Checkbox("No titlebar", (value = no_titlebar.value) => no_titlebar.value = value); ImGui.SameLine(150);
        ImGui.Checkbox("No scrollbar", (value = no_scrollbar.value) => no_scrollbar.value = value); ImGui.SameLine(300);
        ImGui.Checkbox("No menu", (value = no_menu.value) => no_menu.value = value);
        ImGui.Checkbox("No move", (value = no_move.value) => no_move.value = value); ImGui.SameLine(150);
        ImGui.Checkbox("No resize", (value = no_resize.value) => no_resize.value = value); ImGui.SameLine(300);
        ImGui.Checkbox("No collapse", (value = no_collapse.value) => no_collapse.value = value);
        ImGui.Checkbox("No close", (value = no_close.value) => no_close.value = value); ImGui.SameLine(150);
        ImGui.Checkbox("No nav", (value = no_nav.value) => no_nav.value = value); ImGui.SameLine(300);
        ImGui.Checkbox("No background", (value = no_background.value) => no_background.value = value);
        ImGui.Checkbox("No bring to front", (value = no_bring_to_front.value) => no_bring_to_front.value = value);
    }

    // All demo contents
    ShowDemoWindowWidgets();
    ShowDemoWindowLayout();
    ShowDemoWindowPopups();
    ShowDemoWindowColumns();
    ShowDemoWindowTables();
    ShowDemoWindowMisc();

    // End of ShowDemoWindow()
    ImGui.End();

    return done;
}

function ShowDemoWindowWidgets()
{
    if (!ImGui.CollapsingHeader("Widgets"))
        return;

    if (ImGui.TreeNode("Basic"))
    {
        /* static */ const clicked: Static<number> = STATIC("clicked", 0);
        if (ImGui.Button("Button"))
            clicked.value++;
        if (clicked.value & 1)
        {
            ImGui.SameLine();
            ImGui.Text("Thanks for clicking me!");
        }

        /* static */ const check: Static<boolean> = STATIC("check", true);
        ImGui.Checkbox("checkbox", (value = check.value) => check.value = value);

        /* static */ const e: Static<number> = STATIC("e", 0);
        ImGui.RadioButton("radio a", (value = e.value) => e.value = value, 0); ImGui.SameLine();
        ImGui.RadioButton("radio b", (value = e.value) => e.value = value, 1); ImGui.SameLine();
        ImGui.RadioButton("radio c", (value = e.value) => e.value = value, 2);

        // Color buttons, demonstrate using PushID() to add unique identifier in the ID stack, and changing style.
        for (let i = 0; i < 7; i++)
        {
            if (i > 0)
                ImGui.SameLine();
            ImGui.PushID(i);
            ImGui.PushStyleColor(ImGuiCol.Button, ImColor.HSV(i / 7.0, 0.6, 0.6));
            ImGui.PushStyleColor(ImGuiCol.ButtonHovered, ImColor.HSV(i / 7.0, 0.7, 0.7));
            ImGui.PushStyleColor(ImGuiCol.ButtonActive, ImColor.HSV(i / 7.0, 0.8, 0.8));
            ImGui.Button("Click");
            ImGui.PopStyleColor(3);
            ImGui.PopID();
        }

        // Use AlignTextToFramePadding() to align text baseline to the baseline of framed elements (otherwise a Text+SameLine+Button sequence will have the text a little too high by default)
        ImGui.AlignTextToFramePadding();
        ImGui.Text("Hold to repeat:");
        ImGui.SameLine();

        // Arrow buttons with Repeater
        /* static */ const counter: Static<number> = STATIC("counter", 0);
        const spacing = ImGui.GetStyle().ItemInnerSpacing.x;
        ImGui.PushButtonRepeat(true);
        if (ImGui.ArrowButton("##left", ImGuiDir.Left)) { counter.value--; }
        ImGui.SameLine(0.0, spacing);
        if (ImGui.ArrowButton("##right", ImGuiDir.Right)) { counter.value++; }
        ImGui.PopButtonRepeat();
        ImGui.SameLine();
        ImGui.Text(`${counter.value}`);

        ImGui.Text("Hover over me");
        if (ImGui.IsItemHovered())
            ImGui.SetTooltip("I am a tooltip");

        ImGui.SameLine();
        ImGui.Text("- or me");
        if (ImGui.IsItemHovered())
        {
            ImGui.BeginTooltip();
            ImGui.Text("I am a fancy tooltip");
            /* static */ const arr: Static<number[]> = STATIC("arr_", [ 0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2 ]);
            // ImGui.PlotLines("Curve", arr, IM_ARRAYSIZE(arr));
            ImGui.PlotLines("Curve", arr.value, IM_ARRAYSIZE(arr.value));
            ImGui.EndTooltip();
        }

        ImGui.Separator();

        ImGui.LabelText("label", "Value");

        {
            // Using the _simplified_ one-liner Combo() api here
            // See "Combo" section for examples of how to use the more complete BeginCombo()/EndCombo() api.
            const items: string[] = [ "AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO" ];
            /* static */ const item_current: Static<number> = STATIC("item_current#389", 0);
            ImGui.Combo("combo", (value = item_current.value) => item_current.value = value, items, IM_ARRAYSIZE(items));
            ImGui.SameLine(); HelpMarker("Refer to the \"Combo\" section below for an explanation of the full BeginCombo/EndCombo API, and demonstration of various flags.\n");
        }

        {
            /* static */ const str0: Static<ImStringBuffer> = STATIC("str0", new ImStringBuffer(128, "Hello, world!"));
            ImGui.InputText("input text", str0.value, IM_ARRAYSIZE(str0.value));
            ImGui.SameLine(); HelpMarker("USER:\nHold SHIFT or use mouse to select text.\n" + "CTRL+Left/Right to word jump.\n" + "CTRL+A or double-click to select all.\n" + "CTRL+X,CTRL+C,CTRL+V clipboard.\n" + "CTRL+Z,CTRL+Y undo/redo.\n" + "ESCAPE to revert.\n\nPROGRAMMER:\nYou can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputText() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example (this is not demonstrated in imgui_demo.cpp).");

            /* static */ const str1: Static<ImStringBuffer> = STATIC("str1", new ImStringBuffer(128, ""));
            ImGui.InputTextWithHint("input text (w/ hint)", "enter text here", str1.value, IM_ARRAYSIZE(str1.value));

            /* static */ const i0: Static<number> = STATIC("i0", 123);
            ImGui.InputInt("input int", (value = i0.value) => i0.value = value);
            ImGui.SameLine(); HelpMarker("You can apply arithmetic operators +,*,/ on numerical values.\n  e.g. [ 100 ], input \'*2\', result becomes [ 200 ]\nUse +- to subtract.\n");

            /* static */ const f0: Static<number> = STATIC("f0#400", 0.001);
            ImGui.InputFloat("input float", (value = f0.value) => f0.value = value, 0.01, 1.0, "%.3f");

            /* static */ const d0: Static<number> = STATIC("d0", 999999.000001);
            ImGui.InputDouble("input double", (value = d0.value) => d0.value = value, 0.01, 1.0, "%.8f");

            /* static */ const f1: Static<number> = STATIC("f1#403", 1.e10);
            ImGui.InputFloat("input scientific", (value = f1.value) => f1.value = value, 0.0, 0.0, "%e");
            ImGui.SameLine(); HelpMarker("You can input value using the scientific notation,\n  e.g. \"1e+8\" becomes \"100000000\".\n");

            /* static */ const vec4a: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4a", [ 0.10, 0.20, 0.30, 0.44 ]);
            ImGui.InputFloat3("input float3", vec4a.value);
        }

        {
            /* static */ const i1: Static<number> = STATIC("i1#415", 50), i2: Static<number> = STATIC("i2#415", 42);
            ImGui.DragInt("drag int", (value = i1.value) => i1.value = value, 1);
            ImGui.SameLine(); HelpMarker("Click and drag to edit value.\nHold SHIFT/ALT for faster/slower edit.\nDouble-click or CTRL+click to input value.");

            ImGui.DragInt("drag int 0..100", (value = i2.value) => i2.value = value, 1, 0, 100, "%d%%");

            /* static */ const f1: Static<number> = STATIC("f1#421", 1.00), f2: Static<number> = STATIC("f2#421", 0.0067);
            ImGui.DragFloat("drag float", (value = f1.value) => f1.value = value, 0.005);
            ImGui.DragFloat("drag small float", (value = f2.value) => f2.value = value, 0.0001, 0.0, 0.0, "%.06f ns");
        }

        {
            /* static */ const i1: Static<number> = STATIC("i1#427", 0);
            ImGui.SliderInt("slider int", (value = i1.value) => i1.value = value, -1, 3);
            ImGui.SameLine(); HelpMarker("CTRL+click to input value.");

            /* static */ const f1: Static<number> = STATIC("f1#427", 0.123), f2: Static<number> = STATIC("f2#427", 0.0);
            ImGui.SliderFloat("slider float", (value = f1.value) => f1.value = value, 0.0, 1.0, "ratio = %.3f");
            ImGui.SliderFloat("slider float (curve)", (value = f2.value) => f2.value = value, -10.0, 10.0, "%.4f", 2.0);
            /* static */ const angle: Static<number> = STATIC("angle", 0.0);
            ImGui.SliderAngle("slider angle", (value = angle.value) => angle.value = value);
            /* static */ const angle3: Static<ImTuple3<number>> = STATIC<ImTuple3<number>>("angle3", [ 0.0, 0.0, 0.0 ]);
            ImGui.SliderAngle3("slider angle3", angle3.value);
        }

        {
            /* static */ const col1: Static<ImTuple3<number>> = STATIC<ImTuple3<number>>("col1", [ 1.0, 0.0, 0.2 ]);
            /* static */ const col2: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("col2", [ 0.4, 0.7, 0.0, 0.5 ]);
            ImGui.ColorEdit3("color 1", col1.value);
            ImGui.SameLine(); HelpMarker("Click on the colored square to open a color picker.\nClick and hold to use drag and drop.\nRight-click on the colored square to show options.\nCTRL+click on individual component to input value.\n");

            ImGui.ColorEdit4("color 2", col2.value);
        }

        {
            // List box
            const listbox_items: string[] = [ "Apple", "Banana", "Cherry", "Kiwi", "Mango", "Orange", "Pineapple", "Strawberry", "Watermelon" ];
            /* static */ const listbox_item_current: Static<number> = STATIC("listbox_item_current", 1);
            ImGui.ListBox("listbox\n(single select)", (value = listbox_item_current.value) => listbox_item_current.value = value, listbox_items, IM_ARRAYSIZE(listbox_items), 4);

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

    if (ImGui.TreeNode("Trees"))
    {
        if (ImGui.TreeNode("Basic trees"))
        {
            for (let i = 0; i < 5; i++)
            {
                // Use SetNextItemOpen() so set the default state of a node to be open.
                // We could also use TreeNodeEx() with the ImGuiTreeNodeFlags_DefaultOpen flag to achieve the same thing!
                if (i == 0)
                    ImGui.SetNextItemOpen(true, ImGuiCond.Once);

                if (ImGui.TreeNode(i.toString(), `Child ${i}`))
                {
                    ImGui.Text("blah blah");
                    ImGui.SameLine();
                    if (ImGui.SmallButton("button")) {}
                    ImGui.TreePop();
                }
            }
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Advanced, with Selectable nodes"))
        {
            HelpMarker("This is a more typical looking tree with selectable nodes.\nClick to select, CTRL+Click to toggle, click on arrows or double-click to open.");
            /* static */ const align_label_with_current_x_position: Static<boolean> = STATIC("align_label_with_current_x_position", false);
            ImGui.Checkbox("Align label with current X position)", (value = align_label_with_current_x_position.value) => align_label_with_current_x_position.value = value);
            ImGui.Text("Hello!");
            if (align_label_with_current_x_position.value)
                ImGui.Unindent(ImGui.GetTreeNodeToLabelSpacing());

            /* static */ const selection_mask: Static<number> = STATIC("selection_mask", (1 << 2)); // Dumb representation of what may be user-side selection state. You may carry selection state inside or outside your objects in whatever format you see fit.
            let node_clicked: number = -1;                // Temporary storage of what node we have clicked to process selection at the end of the loop. May be a pointer to your own node type, etc.
            ImGui.PushStyleVar(ImGuiStyleVar.IndentSpacing, ImGui.GetFontSize() * 3); // Increase spacing to differentiate leaves from expanded contents.
            for (let i = 0; i < 6; i++)
            {
                // Disable the default open on single-click behavior and pass in Selected flag according to our selection state.
                let node_flags: ImGuiTreeNodeFlags = ImGuiTreeNodeFlags.OpenOnArrow | ImGuiTreeNodeFlags.OpenOnDoubleClick;
                if (selection_mask.value & (1 << i))
                    node_flags |= ImGuiTreeNodeFlags.Selected;
                if (i < 3)
                {
                    // Items 0..2 are Tree Node
                    const node_open: boolean = ImGui.TreeNodeEx(i, node_flags, `Selectable Node ${i}`);
                    if (ImGui.IsItemClicked())
                        node_clicked = i;
                    if (node_open)
                    {
                        ImGui.Text("Blah blah\nBlah Blah");
                        ImGui.TreePop();
                    }
                }
                else
                {
                    // Items 3..5 are Tree Leaves
                    // The only reason we use TreeNode at all is to allow selection of the leaf.
                    // Otherwise we can use BulletText() or TreeAdvanceToLabelPos()+Text().
                    node_flags |= ImGuiTreeNodeFlags.Leaf | ImGuiTreeNodeFlags.NoTreePushOnOpen; // ImGuiTreeNodeFlags.Bullet
                    ImGui.TreeNodeEx(i, node_flags, `Selectable Leaf ${i}`);
                    if (ImGui.IsItemClicked())
                        node_clicked = i;
                }
            }
            if (node_clicked !== -1)
            {
                // Update selection state. Process outside of tree loop to avoid visual inconsistencies during the clicking-frame.
                if (ImGui.GetIO().KeyCtrl)
                    selection_mask.value ^= (1 << node_clicked);          // CTRL+click to toggle
                else //if (!(selection_mask & (1 << node_clicked))) // Depending on selection behavior you want, this commented bit preserve selection when clicking on item that is part of the selection
                    selection_mask.value = (1 << node_clicked);           // Click to single-select
            }
            ImGui.PopStyleVar();
            if (align_label_with_current_x_position.value)
                ImGui.Indent(ImGui.GetTreeNodeToLabelSpacing());
            ImGui.TreePop();
        }
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Collapsing Headers"))
    {
        /* static */ const closable_group: Static<boolean> = STATIC("closable_group", true);
        ImGui.Checkbox("Show 2nd header", (value = closable_group.value) => closable_group.value = value);
        if (ImGui.CollapsingHeader("Header"))
        {
            ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
            for (let i = 0; i < 5; i++)
                ImGui.Text(`Some content ${i}`);
        }
        if (ImGui.CollapsingHeader("Header with a close button", (value = closable_group.value) => closable_group.value = value))
        {
            ImGui.Text(`IsItemHovered: ${ImGui.IsItemHovered()}`);
            for (let i = 0; i < 5; i++)
                ImGui.Text(`More content ${i}`);
        }
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Bullets"))
    {
        ImGui.BulletText("Bullet point 1");
        ImGui.BulletText("Bullet point 2\nOn multiple lines");
        ImGui.Bullet(); ImGui.Text("Bullet point 3 (two calls)");
        ImGui.Bullet(); ImGui.SmallButton("Button");
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Text"))
    {
        if (ImGui.TreeNode("Colored Text"))
        {
            // Using shortcut. You can use PushStyleColor()/PopStyleColor() for more flexibility.
            ImGui.TextColored(new ImVec4(1.0, 0.0, 1.0, 1.0), "Pink");
            ImGui.TextColored(new ImVec4(1.0, 1.0, 0.0, 1.0), "Yellow");
            ImGui.TextDisabled("Disabled");
            ImGui.SameLine(); HelpMarker("The TextDisabled color is stored in ImGuiStyle.");
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Word Wrapping"))
        {
            // Using shortcut. You can use PushTextWrapPos()/PopTextWrapPos() for more flexibility.
            ImGui.TextWrapped("This text should automatically wrap on the edge of the window. The current implementation for text wrapping follows simple rules suitable for English and possibly other languages.");
            ImGui.Spacing();

            /* static */ const wrap_width: Static<number> = STATIC("wrap_width", 200.0);
            ImGui.SliderFloat("Wrap width", (value = wrap_width.value) => wrap_width.value = value, -20, 600, "%.0f");

            ImGui.Text("Test paragraph 1:");
            let pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
            ImGui.GetWindowDrawList().AddRectFilled(new ImVec2(pos.x + wrap_width.value, pos.y), new ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), IM_COL32(255, 0, 255, 255));
            ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
            ImGui.Text(`The lazy dog is a good dog. This paragraph is made to fit within ${wrap_width.value.toFixed(0)} pixels. Testing a 1 character word. The quick brown fox jumps over the lazy dog.`);
            ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), IM_COL32(255, 255, 0, 255));
            ImGui.PopTextWrapPos();

            ImGui.Text("Test paragraph 2:");
            pos = ImGui.GetCursorScreenPos();
            ImGui.GetWindowDrawList().AddRectFilled(new ImVec2(pos.x + wrap_width.value, pos.y), new ImVec2(pos.x + wrap_width.value + 10, pos.y + ImGui.GetTextLineHeight()), IM_COL32(255, 0, 255, 255));
            ImGui.PushTextWrapPos(ImGui.GetCursorPos().x + wrap_width.value);
            ImGui.Text("aaaaaaaa bbbbbbbb, c cccccccc,dddddddd. d eeeeeeee   ffffffff. gggggggg!hhhhhhhh");
            ImGui.GetWindowDrawList().AddRect(ImGui.GetItemRectMin(), ImGui.GetItemRectMax(), IM_COL32(255, 255, 0, 255));
            ImGui.PopTextWrapPos();

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("UTF-8 Text"))
        {
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
            /* static */ const buf: Static<ImStringBuffer> = STATIC("buf", new ImStringBuffer(32, "日本語"));
            //static char buf[32] = u8"NIHONGO"; // <- this is how you would write it with C++11, using real kanjis
            ImGui.InputText("UTF-8 input", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.TreePop();
        }
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Images"))
    {
        const io: ImGuiIO = ImGui.GetIO();
        ImGui.TextWrapped("Below we are displaying the font texture (which is the only texture we have access to in this demo). Use the 'ImTextureID' type as storage to pass pointers or identifier to your own texture data. Hover the texture for a zoomed view!");

        // Here we are grabbing the font texture because that's the only one we have access to inside the demo code.
        // Remember that ImTextureID is just storage for whatever you want it to be, it is essentially a value that will be passed to the render function inside the ImDrawCmd structure.
        // If you use one of the default imgui_impl_XXXX.cpp renderer, they all have comments at the top of their file to specify what they expect to be stored in ImTextureID.
        // (for example, the imgui_impl_dx11.cpp renderer expect a 'ID3D11ShaderResourceView*' pointer. The imgui_impl_glfw_gl3.cpp renderer expect a GLuint OpenGL texture identifier etc.)
        // If you decided that ImTextureID = MyEngineTexture*, then you can pass your MyEngineTexture* pointers to ImGui.Image(), and gather width/height through your own functions, etc.
        // Using ShowMetricsWindow() as a "debugger" to inspect the draw data that are being passed to your render will help you debug issues if you are confused about this.
        // Consider using the lower-level ImDrawList::AddImage() API, via ImGui.GetWindowDrawList()->AddImage().
        const my_tex_id: WebGLTexture | null = io.Fonts.TexID;
        const my_tex_w: number = io.Fonts.TexWidth;
        const my_tex_h: number = io.Fonts.TexHeight;

        ImGui.Text(`${my_tex_w.toFixed(0)}x${my_tex_h.toFixed(0)}`);
        const pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
        ImGui.Image(my_tex_id, new ImVec2(my_tex_w, my_tex_h), new ImVec2(0, 0), new ImVec2(1, 1), new ImVec4(1.0, 1.0, 1.0, 1.0), new ImVec4(1.0, 1.0, 1.0, 0.5));
        if (ImGui.IsItemHovered())
        {
            ImGui.BeginTooltip();
            const region_sz: number = 32.0;
            let region_x: number = io.MousePos.x - pos.x - region_sz * 0.5; if (region_x < 0.0) region_x = 0.0; else if (region_x > my_tex_w - region_sz) region_x = my_tex_w - region_sz;
            let region_y: number = io.MousePos.y - pos.y - region_sz * 0.5; if (region_y < 0.0) region_y = 0.0; else if (region_y > my_tex_h - region_sz) region_y = my_tex_h - region_sz;
            let zoom: number = 4.0;
            ImGui.Text(`Min: (${region_x.toFixed(2)}, ${region_y.toFixed(2)})`);
            ImGui.Text(`Max: (${(region_x + region_sz).toFixed(2)}, ${(region_y + region_sz).toFixed(2)})`);
            const uv0: ImVec2 = new ImVec2((region_x) / my_tex_w, (region_y) / my_tex_h);
            const uv1: ImVec2 = new ImVec2((region_x + region_sz) / my_tex_w, (region_y + region_sz) / my_tex_h);
            ImGui.Image(my_tex_id, new ImVec2(region_sz * zoom, region_sz * zoom), uv0, uv1, new ImColor(255, 255, 255, 255).toImVec4(), new ImColor(255, 255, 255, 128).toImVec4());
            ImGui.EndTooltip();
        }
        ImGui.TextWrapped("And now some textured buttons..");
        /* static */ const pressed_count: Static<number> = STATIC("pressed_count", 0);
        for (let i = 0; i < 8; i++)
        {
            ImGui.PushID(i);
            const frame_padding: number = -1 + i;     // -1 = uses default padding
            if (ImGui.ImageButton(my_tex_id, new ImVec2(32, 32), new ImVec2(0, 0), new ImVec2(32.0 / my_tex_w, 32 / my_tex_h), frame_padding, new ImVec4(0, 0, 0, 1)))
                pressed_count.value += 1;
            ImGui.PopID();
            ImGui.SameLine();
        }
        ImGui.NewLine();
        ImGui.Text(`Pressed ${pressed_count.value} times.`);
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Combo"))
    {
        // Expose flags as checkbox for the demo
        /* static */ const flags: Static<ImGui.ImGuiComboFlags> = STATIC("flags#669", 0);
        ImGui.CheckboxFlags("ImGuiComboFlags_PopupAlignLeft", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.PopupAlignLeft);
        ImGui.SameLine(); HelpMarker("Only makes a difference if the popup is larger than the combo");
        if (ImGui.CheckboxFlags("ImGuiComboFlags_NoArrowButton", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.NoArrowButton))
            flags.value &= ~ImGui.ImGuiComboFlags.NoPreview;     // Clear the other flag, as we cannot combine both
        if (ImGui.CheckboxFlags("ImGuiComboFlags_NoPreview", (value = flags.value) => flags.value = value, ImGui.ImGuiComboFlags.NoPreview))
            flags.value &= ~ImGui.ImGuiComboFlags.NoArrowButton; // Clear the other flag, as we cannot combine both

        // General BeginCombo() API, you have full control over your selection data and display type.
        // (your selection data could be an index, a pointer to the object, an id for the object, a flag stored in the object itself, etc.)
        const items: string[] = [ "AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLLLLL", "MMMM", "OOOOOOO" ];
        /* static */ const item_current: Static<string> = STATIC("item_current#692", items[0]);// Here our selection is a single pointer stored outside the object.
        if (ImGui.BeginCombo("combo 1", item_current.value, flags.value)) // The second parameter is the label previewed before opening the combo.
        {
            for (let n = 0; n < IM_ARRAYSIZE(items); n++)
            {
                const is_selected: boolean = (item_current.value === items[n]);
                if (ImGui.Selectable(items[n], is_selected))
                    item_current.value = items[n];
                if (is_selected)
                    ImGui.SetItemDefaultFocus();   // Set the initial focus when opening the combo (scrolling + for keyboard navigation support in the upcoming navigation branch)
            }
            ImGui.EndCombo();
        }

        // Simplified one-liner Combo() API, using values packed in a single constant string
        /* static */ const item_current_2: Static<number> = STATIC("item_current_2", 0);
        ImGui.Combo("combo 2", (value = item_current_2.value) => item_current_2.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");

        // Simplified one-liner Combo() using an array of const char*
        /* static */ const item_current_3: Static<number> = STATIC("item_current_3", -1); // If the selection isn't within 0..count, Combo won't display a preview
        ImGui.Combo("combo 3 (array)", (value = item_current_3.value) => item_current_3.value = value, items, IM_ARRAYSIZE(items));

        // Simplified one-liner Combo() using an accessor function
        // struct FuncHolder { static bool ItemGetter(void* data, int idx, const char** out_str) { *out_str = ((const char**)data)[idx]; return true; } };
        class FuncHolder { public static ItemGetter(data: string[], idx: number, out_str: [string]): boolean { out_str[0] = data[idx]; return true; }; }
        /* static */ const item_current_4: Static<number> = STATIC("item_current_4", 0);
        ImGui.Combo("combo 4 (function)", (value = item_current_4.value) => item_current_4.value = value, FuncHolder.ItemGetter, items, IM_ARRAYSIZE(items));

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Selectables"))
    {
        // Selectable() has 2 overloads:
        // - The one taking "bool selected" as a read-only selection information. When Selectable() has been clicked is returns true and you can alter selection state accordingly.
        // - The one taking "bool* p_selected" as a read-write selection information (convenient in some cases)
        // The earlier is more flexible, as in real application your selection may be stored in a different manner (in flags within objects, as an external list, etc).
        if (ImGui.TreeNode("Basic"))
        {
            /* static */ const selection: Static<boolean[/*5*/]> = STATIC("selection#695", [ false, true, false, false, false ]);
            ImGui.Selectable("1. I am selectable", (value = selection.value[0]) => selection.value[0] = value);
            ImGui.Selectable("2. I am selectable", (value = selection.value[1]) => selection.value[1] = value);
            ImGui.Text("3. I am not selectable");
            ImGui.Selectable("4. I am selectable", (value = selection.value[3]) => selection.value[2] = value);
            if (ImGui.Selectable("5. I am double clickable", selection.value[4], ImGuiSelectableFlags.AllowDoubleClick))
                if (ImGui.IsMouseDoubleClicked(0))
                    selection.value[4] = !selection.value[4];
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Selection State: Single Selection"))
        {
            /* static */ const selected: Static<number> = STATIC("selected#707", -1);
            for (let n = 0; n < 5; n++)
            {
                const buf: string = `Object ${n}`;
                if (ImGui.Selectable(buf, selected.value === n))
                    selected.value = n;
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Selection State: Multiple Selection"))
        {
            HelpMarker("Hold CTRL and click to select multiple items.");
            /* static */ const selection: Static<boolean[/*5*/]> = STATIC("selection#720", [ false, false, false, false, false ]);
            for (let n = 0; n < 5; n++)
            {
                const buf: string = `Object ${n}`;
                if (ImGui.Selectable(buf, selection.value[n]))
                {
                    if (!ImGui.GetIO().KeyCtrl)    // Clear selection when CTRL is not held
                        // memset(selection, 0, sizeof(selection));
                        selection.value.fill(false);
                    selection.value[n] = !selection.value[n];
                }
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Rendering more text into the same line"))
        {
            // Using the Selectable() override that takes "bool* p_selected" parameter and toggle your booleans automatically.
            /* static */ const selected: Static<boolean[/*3*/]> = STATIC("selected#687", [ false, false, false ]);
            ImGui.Selectable("main.c",    (value = selected.value[0]) => selected.value[0] = value); ImGui.SameLine(300); ImGui.Text(" 2,345 bytes");
            ImGui.Selectable("Hello.cpp", (value = selected.value[1]) => selected.value[1] = value); ImGui.SameLine(300); ImGui.Text("12,345 bytes");
            ImGui.Selectable("Hello.h",   (value = selected.value[2]) => selected.value[2] = value); ImGui.SameLine(300); ImGui.Text(" 2,345 bytes");
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("In columns"))
        {
            ImGui.Columns(3, null, false);
            /* static */ const selected: Static<boolean[/*16*/]> = STATIC("selected#699", new Array(16).fill(false));
            for (let i = 0; i < 16; i++)
            {
                const label: string = `Item ${i}`;
                if (ImGui.Selectable(label, (value = selected.value[i]) => selected.value[i] = value)) {}
                ImGui.NextColumn();
            }
            ImGui.Columns(1);
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Grid"))
        {
            /* static */ const selected: Static<boolean[/*4*4*/]> = STATIC("selected#712", [ true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, true ]);
            for (let i = 0; i < 4*4; i++)
            {
                ImGui.PushID(i);
                if (ImGui.Selectable("Sailor", (value = selected.value[i]) => selected.value[i] = value, 0, new ImVec2(50, 50)))
                {
                    // Note: We _unnecessarily_ test for both x/y and i here only to silence some static analyzer. The second part of each test is unnecessary.
                    const x: number = i % 4;
                    const y: number = i / 4;
                    if (x > 0)           { selected.value[i - 1] = !selected.value[i - 1]; }
                    if (x < 3 && i < 15) { selected.value[i + 1] = !selected.value[i + 1]; }
                    if (y > 0 && i > 3)  { selected.value[i - 4] = !selected.value[i - 4]; }
                    if (y < 3 && i < 12) { selected.value[i + 4] = !selected.value[i + 4]; }
                }
                if ((i % 4) < 3) ImGui.SameLine();
                ImGui.PopID();
            }
            ImGui.TreePop();
        }
        if (ImGui.TreeNode("Alignment"))
        {
            HelpMarker("Alignment applies when a selectable is larger than its text content.\nBy default, Selectables uses style.SelectableTextAlign but it can be overriden on a per-item basis using PushStyleVar().");
            /* static */ const selected: Static<boolean[/*3*3*/]> = STATIC("selected#1012", [ true, false, true, false, true, false, true, false, true ]);
            for (let y = 0; y < 3; y++)
            {
                for (let x = 0; x < 3; x++)
                {
                    const alignment: ImVec2 = new ImVec2(x / 2.0, y / 2.0);
                    // char name[32];
                    // sprintf(name, "(%.1f,%.1f)", alignment.x, alignment.y);
                    const name: string = `(${alignment.x.toFixed(1)},${alignment.y.toFixed(1)})`;
                    if (x > 0) ImGui.SameLine();
                    ImGui.PushStyleVar(ImGuiStyleVar.SelectableTextAlign, alignment);
                    // ImGui.Selectable(name, &selected[3*y+x], ImGuiSelectableFlags_None, ImVec2(80,80));
                    ImGui.Selectable(name, (value = selected.value[3*y+x]) => selected.value[3*y+x] = value, ImGuiSelectableFlags.None, new ImVec2(80,80));
                    ImGui.PopStyleVar();
                }
            }
            ImGui.TreePop();
        }
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Text Input"))
    {
        if (ImGui.TreeNode("Multi-line Text Input"))
        {
            // Note: we are using a fixed-sized buffer for simplicity here. See ImGuiInputTextFlags_CallbackResize
            // and the code in misc/cpp/imgui_stdlib.h for how to setup InputText() for dynamically resizing strings.
            /* static */ const text: Static<ImStringBuffer> = STATIC("text", new ImStringBuffer(1024 * 16,
                "/*\n" +
                " The Pentium F00F bug, shorthand for F0 0F C7 C8,\n" +
                " the hexadecimal encoding of one offending instruction,\n" +
                " more formally, the invalid operand with locked CMPXCHG8B\n" +
                " instruction bug, is a design flaw in the majority of\n" +
                " Intel Pentium, Pentium MMX, and Pentium OverDrive\n" +
                " processors (all in the P5 microarchitecture).\n" +
                "*/\n\n" +
                "label:\n" +
                "\tlock cmpxchg8b eax\n"));

            /* static */ const flags: Static<ImGuiInputTextFlags> = STATIC("flags", ImGuiInputTextFlags.AllowTabInput);
            HelpMarker("You can use the ImGuiInputTextFlags_CallbackResize facility if you need to wire InputTextMultiline() to a dynamic string type. See misc/cpp/imgui_stdlib.h for an example. (This is not demonstrated in imgui_demo.cpp)");
            ImGui.CheckboxFlags("ImGuiInputTextFlags_ReadOnly", (value = flags.value) => flags.value = value, ImGuiInputTextFlags.ReadOnly);
            ImGui.CheckboxFlags("ImGuiInputTextFlags_AllowTabInput", (value = flags.value) => flags.value = value, ImGuiInputTextFlags.AllowTabInput);
            ImGui.CheckboxFlags("ImGuiInputTextFlags_CtrlEnterForNewLine", (value = flags.value) => flags.value = value, ImGuiInputTextFlags.CtrlEnterForNewLine);
            ImGui.InputTextMultiline("##source", text.value, IM_ARRAYSIZE(text.value), new ImVec2(-1.0, ImGui.GetTextLineHeight() * 16), flags.value);
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Filtered Text Input"))
        {
            /* static */ const buf1: Static<ImStringBuffer> = STATIC("buf1", new ImStringBuffer(64, "")); ImGui.InputText("default", buf1.value, IM_ARRAYSIZE(buf1.value));
            /* static */ const buf2: Static<ImStringBuffer> = STATIC("buf2", new ImStringBuffer(64, "")); ImGui.InputText("decimal", buf2.value, IM_ARRAYSIZE(buf2.value), ImGuiInputTextFlags.CharsDecimal);
            /* static */ const buf3: Static<ImStringBuffer> = STATIC("buf3", new ImStringBuffer(64, "")); ImGui.InputText("hexadecimal", buf3.value, IM_ARRAYSIZE(buf3.value), ImGuiInputTextFlags.CharsHexadecimal | ImGuiInputTextFlags.CharsUppercase);
            /* static */ const buf4: Static<ImStringBuffer> = STATIC("buf4", new ImStringBuffer(64, "")); ImGui.InputText("uppercase", buf4.value, IM_ARRAYSIZE(buf4.value), ImGuiInputTextFlags.CharsUppercase);
            /* static */ const buf5: Static<ImStringBuffer> = STATIC("buf5", new ImStringBuffer(64, "")); ImGui.InputText("no blank", buf5.value, IM_ARRAYSIZE(buf5.value), ImGuiInputTextFlags.CharsNoBlank);
            class TextFilters { public static FilterImGuiLetters(data: ImGuiInputTextCallbackData): number { if (data.EventChar < 256 && /[imgui]/.test(String.fromCharCode(data.EventChar))) return 0; return 1; } }
            /* static */ const buf6: Static<ImStringBuffer> = STATIC("buf6", new ImStringBuffer(64, "")); ImGui.InputText("\"imgui\" letters", buf6.value, IM_ARRAYSIZE(buf6.value), ImGuiInputTextFlags.CallbackCharFilter, TextFilters.FilterImGuiLetters);

            ImGui.Text("Password input");
            /* static */ const bufpass: Static<ImStringBuffer> = STATIC("bufpass", new ImStringBuffer(64, "password123"));
            ImGui.InputText("password", bufpass.value, IM_ARRAYSIZE(bufpass.value), ImGuiInputTextFlags.Password | ImGuiInputTextFlags.CharsNoBlank);
            ImGui.SameLine(); HelpMarker("Display all characters as '*'.\nDisable clipboard cut and copy.\nDisable logging.\n");
            ImGui.InputText("password (clear)", bufpass.value, IM_ARRAYSIZE(bufpass.value), ImGuiInputTextFlags.CharsNoBlank);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Resize Callback"))
        {
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

    if (ImGui.TreeNode("Plots Widgets"))
    {
        /* static */ const animate: Static<boolean> = STATIC("animate", true);
        ImGui.Checkbox("Animate", (value = animate.value) => animate.value = value);

        /* static */ const arr: Static<number[]> = STATIC("arr", [ 0.6, 0.1, 1.0, 0.5, 0.92, 0.1, 0.2 ]);
        ImGui.PlotLines("Frame Times", arr.value, IM_ARRAYSIZE(arr.value));

        // Create a dummy array of contiguous float values to plot
        // Tip: If your float aren't contiguous but part of a structure, you can pass a pointer to your first float and the sizeof() of your structure in the Stride parameter.
        /* static */ const values: Static<number[/*90*/]> = STATIC("values#803", new Array(90).fill(0));
        /* static */ const values_offset: Static<number> = STATIC("values_offset", 0);
        /* static */ const refresh_time: Static<number> = STATIC("refresh_time", 0.0);
        if (!animate.value || refresh_time.value === 0.0)
            refresh_time.value = ImGui.GetTime();
        while (refresh_time.value < ImGui.GetTime()) // Create dummy data at fixed 60 hz rate for the demo
        {
            /* static */ const phase: Static<number> = STATIC("phase", 0.0);
            values.value[values_offset.value] = Math.cos(phase.value);
            values_offset.value = (values_offset.value + 1) % IM_ARRAYSIZE(values.value);
            phase.value += 0.10 * values_offset.value;
            refresh_time.value += 1.0 / 60.0;
        }
        ImGui.PlotLines("Lines", values.value, IM_ARRAYSIZE(values.value), values_offset.value, "avg 0.0", -1.0, 1.0, new ImVec2(0, 80));
        ImGui.PlotHistogram("Histogram", arr.value, IM_ARRAYSIZE(arr.value), 0, null, 0.0, 1.0, new ImVec2(0, 80));

        // Use functions to generate output
        // FIXME: This is rather awkward because current plot API only pass in indices. We probably want an API passing floats and user provide sample rate/count.
        class Funcs
        {
            public static Sin(data: any, i: number): number { return Math.sin(i * 0.1); }
            public static Saw(data: any, i: number): number { return (i & 1) ? 1.0 : -1.0; }
        }
        /* static */ const func_type: Static<number> = STATIC("func_type", 0), display_count: Static<number> = STATIC("display_count", 70);
        ImGui.Separator();
        ImGui.SetNextItemWidth(100); ImGui.Combo("func", (value = func_type.value) => func_type.value = value, "Sin\0Saw\0");
        ImGui.SameLine();
        ImGui.SliderInt("Sample count", (value = display_count.value) => display_count.value = value, 1, 400);
        const func: (data: any, i: number) => number = (func_type.value === 0) ? Funcs.Sin : Funcs.Saw;
        ImGui.PlotLines("Lines", func, null, display_count.value, 0, null, -1.0, 1.0, new ImVec2(0, 80));
        ImGui.PlotHistogram("Histogram", func, null, display_count.value, 0, null, -1.0, 1.0, new ImVec2(0, 80));
        ImGui.Separator();

        // Animate a simple progress bar
        /* static */ const progress: Static<number> = STATIC("progress", 0.0), progress_dir: Static<number> = STATIC("progress_dir", 1.0);
        if (animate.value)
        {
            progress.value += progress_dir.value * 0.4 * ImGui.GetIO().DeltaTime;
            if (progress.value >= +1.1) { progress.value = +1.1; progress_dir.value *= -1.0; }
            if (progress.value <= -0.1) { progress.value = -0.1; progress_dir.value *= -1.0; }
        }

        // Typically we would use ImVec2(-1.0f,0.0) to use all available width, or ImVec2(width,0.0) for a specified width. ImVec2(0.0,0.0) uses ItemWidth.
        ImGui.ProgressBar(progress.value, new ImVec2(0.0, 0.0));
        ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
        ImGui.Text("Progress Bar");

        const progress_saturated: number = (progress.value < 0.0) ? 0.0 : (progress.value > 1.0) ? 1.0 : progress.value;
        const buf: string = `${(progress_saturated * 1753).toFixed(0)}/${1753}`;
        ImGui.ProgressBar(progress.value, new ImVec2(0., 0.), buf);
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Color/Picker Widgets"))
    {
        /* static */ const color: Static<ImVec4> = STATIC("color#863", new ImVec4(114.0/255.0, 144.0/255.0, 154.0/255.0, 200.0/255.0));

        /* static */ const alpha_preview: Static<boolean> = STATIC("alpha_preview", true);
        /* static */ const alpha_half_preview: Static<boolean> = STATIC("alpha_half_preview", false);
        /* static */ const drag_and_drop: Static<boolean> = STATIC("drag_and_drop", true);
        /* static */ const options_menu: Static<boolean> = STATIC("options_menu", true);
        /* static */ const hdr: Static<boolean> = STATIC("hdr", false);
        ImGui.Checkbox("With Alpha Preview", (value = alpha_preview.value) => alpha_preview.value = value);
        ImGui.Checkbox("With Half Alpha Preview", (value = alpha_half_preview.value) => alpha_half_preview.value = value);
        ImGui.Checkbox("With Drag and Drop", (value = drag_and_drop.value) => drag_and_drop.value = value);
        ImGui.Checkbox("With Options Menu", (value = options_menu.value) => options_menu.value = value); ImGui.SameLine(); HelpMarker("Right-click on the individual color widget to show options.");
        ImGui.Checkbox("With HDR", (value = hdr.value) => hdr.value = value); ImGui.SameLine(); HelpMarker("Currently all this does is to lift the 0..1 limits on dragging widgets.");
        const misc_flags: ImGuiColorEditFlags = (hdr.value ? ImGuiColorEditFlags.HDR : 0) | (drag_and_drop.value ? 0 : ImGuiColorEditFlags.NoDragDrop) | (alpha_half_preview.value ? ImGuiColorEditFlags.AlphaPreviewHalf : (alpha_preview.value ? ImGuiColorEditFlags.AlphaPreview : 0)) | (options_menu.value ? 0 : ImGuiColorEditFlags.NoOptions);

        ImGui.Text("Color widget:");
        ImGui.SameLine(); HelpMarker("Click on the colored square to open a color picker.\nCTRL+click on individual component to input value.\n");
        ImGui.ColorEdit3("MyColor##1", color.value, misc_flags);

        ImGui.Text("Color widget HSV with Alpha:");
        ImGui.ColorEdit4("MyColor##2", color.value, ImGuiColorEditFlags.DisplayHSV | misc_flags);

        ImGui.Text("Color widget with Float Display:");
        ImGui.ColorEdit4("MyColor##2f", color.value, ImGuiColorEditFlags.Float | misc_flags);

        ImGui.Text("Color button with Picker:");
        ImGui.SameLine(); HelpMarker("With the ImGuiColorEditFlags.NoInputs flag you can hide all the slider/text inputs.\nWith the ImGuiColorEditFlags.NoLabel flag you can pass a non-empty label which will only be used for the tooltip and picker popup.");
        ImGui.ColorEdit4("MyColor##3", color.value, ImGuiColorEditFlags.NoInputs | ImGuiColorEditFlags.NoLabel | misc_flags);

        ImGui.Text("Color button with Custom Picker Popup:");

        // Generate a dummy default palette. The palette will persist and can be edited.
        /* static */ const saved_palette_init: Static<boolean> = STATIC("saved_palette_init", true);
        /* static */ const saved_palette: Static<ImVec4[/*32*/]> = STATIC("saved_palette", []);
        if (saved_palette_init.value)
        {
            for (let n = 0; n < 32; n++)
            {
                saved_palette.value[n] = new ImVec4();
                // ImGui.ColorConvertHSVtoRGB(n / 31.0f, 0.8f, 0.8f, saved_palette[n].x, saved_palette[n].y, saved_palette[n].z);
                const r: ImScalar<number> = [ 0.0 ];
                const g: ImScalar<number> = [ 0.0 ];
                const b: ImScalar<number> = [ 0.0 ];
                ImGui.ColorConvertHSVtoRGB(n / 32.0, 0.8, 0.8, r, g, b);
                saved_palette.value[n].x = r[0];
                saved_palette.value[n].y = g[0];
                saved_palette.value[n].z = b[0];
                saved_palette.value[n].w = 1.0; // Alpha
            }
            saved_palette_init.value = false;
        }

        /* static */ const backup_color: Static<ImVec4> = STATIC("backup_color", new ImVec4());
        let open_popup: boolean = ImGui.ColorButton("MyColor##3b", color.value, misc_flags);
        ImGui.SameLine();
        open_popup = ImGui.Button("Palette") || open_popup;
        if (open_popup)
        {
            ImGui.OpenPopup("mypicker");
                backup_color.value.Copy(color.value);
        }
        if (ImGui.BeginPopup("mypicker"))
        {
            ImGui.Text("MY CUSTOM COLOR PICKER WITH AN AMAZING PALETTE!");
            ImGui.Separator();
            ImGui.ColorPicker4("##picker", color.value, misc_flags | ImGuiColorEditFlags.NoSidePreview | ImGuiColorEditFlags.NoSmallPreview);
            ImGui.SameLine();
            ImGui.BeginGroup(); // Lock X position
            ImGui.Text("Current");
            ImGui.ColorButton("##current", color.value, ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.AlphaPreviewHalf, new ImVec2(60, 40));
            ImGui.Text("Previous");
            if (ImGui.ColorButton("##previous", backup_color.value, ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.AlphaPreviewHalf, new ImVec2(60, 40)))
                color.value.Copy(backup_color.value);
            ImGui.Separator();
            ImGui.Text("Palette");
            for (let n = 0; n < IM_ARRAYSIZE(saved_palette.value); n++)
            {
                ImGui.PushID(n);
                if ((n % 8) !== 0)
                    ImGui.SameLine(0.0, ImGui.GetStyle().ItemSpacing.y);
                if (ImGui.ColorButton("##palette", saved_palette.value[n], ImGuiColorEditFlags.NoAlpha | ImGuiColorEditFlags.NoPicker | ImGuiColorEditFlags.NoTooltip, new ImVec2(20, 20)))
                    color.value.Copy(new ImVec4(saved_palette.value[n].x, saved_palette.value[n].y, saved_palette.value[n].z, color.value.w)); // Preserve alpha!

                // Allow user to drop colors into each palette entry
                // (Note that ColorButton is already a drag source by default, unless using ImGuiColorEditFlags_NoDragDrop)
                if (ImGui.BeginDragDropTarget())
                {
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
        ImGui.ColorButton("MyColor##3c", color.value, misc_flags, new ImVec2(80, 80));

        ImGui.Text("Color picker:");
        /* static */ const alpha: Static<boolean> = STATIC("alpha", true);
        /* static */ const alpha_bar: Static<boolean> = STATIC("alpha_bar", true);
        /* static */ const side_preview: Static<boolean> = STATIC("side_preview", true);
        /* static */ const ref_color: Static<boolean> = STATIC("ref_color", false);
        /* static */ const ref_color_v: Static<ImVec4> = STATIC("ref_color_v", new ImVec4(1.0, 0.0, 1.0, 0.5));
        /* static */ const display_mode: Static<number> = STATIC("display_mode", 0);
        /* static */ const picker_mode: Static<number> = STATIC("picker_mode", 0);
        ImGui.Checkbox("With Alpha", (value = alpha.value) => alpha.value = value);
        ImGui.Checkbox("With Alpha Bar", (value = alpha_bar.value) => alpha_bar.value = value);
        ImGui.Checkbox("With Side Preview", (value = side_preview.value) => side_preview.value = value);
        if (side_preview)
        {
            ImGui.SameLine();
            ImGui.Checkbox("With Ref Color", (value = ref_color.value) => ref_color.value = value);
            if (ref_color.value)
            {
                ImGui.SameLine();
                ImGui.ColorEdit4("##RefColor", ref_color_v.value, ImGuiColorEditFlags.NoInputs | misc_flags);
            }
        }
        ImGui.Combo("Display Mode", (value = display_mode.value) => display_mode.value = value, "Auto/Current\0None\0RGB Only\0HSV Only\0Hex Only\0");
        ImGui.SameLine(); HelpMarker("ColorEdit defaults to displaying RGB inputs if you don't specify a display mode, but the user can change it with a right-click.\n\nColorPicker defaults to displaying RGB+HSV+Hex if you don't specify a display mode.\n\nYou can change the defaults using SetColorEditOptions().");
        ImGui.Combo("Picker Mode", (value = picker_mode.value) => picker_mode.value = value, "Auto/Current\0Hue bar + SV rect\0Hue wheel + SV triangle\0");
        ImGui.SameLine(); HelpMarker("User can right-click the picker to change mode.");
        let flags: ImGuiColorEditFlags = misc_flags;
        if (!alpha.value) flags |= ImGuiColorEditFlags.NoAlpha; // This is by default if you call ColorPicker3() instead of ColorPicker4()
        if (alpha_bar.value) flags |= ImGuiColorEditFlags.AlphaBar;
        if (!side_preview.value) flags |= ImGuiColorEditFlags.NoSidePreview;
        if (picker_mode.value === 1) flags |= ImGuiColorEditFlags.PickerHueBar;
        if (picker_mode.value === 2) flags |= ImGuiColorEditFlags.PickerHueWheel;
        if (display_mode.value === 1) flags |= ImGuiColorEditFlags.NoInputs; // Disable all RGB/HSV/Hex displays
        if (display_mode.value === 2) flags |= ImGuiColorEditFlags.DisplayRGB; // Override display mode
        if (display_mode.value === 3) flags |= ImGuiColorEditFlags.DisplayHSV;
        if (display_mode.value === 4) flags |= ImGuiColorEditFlags.DisplayHex;
        ImGui.ColorPicker4("MyColor##4", color.value, flags, ref_color.value ? ref_color_v.value : null);

        ImGui.Text("Programmatically set defaults:");
        ImGui.SameLine(); HelpMarker("SetColorEditOptions() is designed to allow you to set boot-time default.\nWe don't have Push/Pop functions because you can force options on a per-widget basis if needed, and the user can change non-forced ones with the options menu.\nWe don't have a getter to avoid encouraging you to persistently save values that aren't forward-compatible.");
        if (ImGui.Button("Default: Uint8 + HSV + Hue Bar"))
            ImGui.SetColorEditOptions(ImGuiColorEditFlags.Uint8 | ImGuiColorEditFlags.DisplayHSV | ImGuiColorEditFlags.PickerHueBar);
        if (ImGui.Button("Default: Float + HDR + Hue Wheel"))
            ImGui.SetColorEditOptions(ImGuiColorEditFlags.Float | ImGuiColorEditFlags.HDR | ImGuiColorEditFlags.PickerHueWheel);

        // HSV encoded support (to avoid RGB<>HSV round trips and singularities when S==0 or V==0)
        /* static */ const color_stored_as_hsv: Static<ImVec4> = STATIC("color_stored_as_hsv", new ImVec4(0.23, 1.0, 1.0, 1.0));
        ImGui.Spacing();
        ImGui.Text("HSV encoded colors");
        ImGui.SameLine(); HelpMarker("By default, colors are given to ColorEdit and ColorPicker in RGB, but ImGuiColorEditFlags_InputHSV allows you to store colors as HSV and pass them to ColorEdit and ColorPicker as HSV. This comes with the added benefit that you can manipulate hue values with the picker even when saturation or value are zero.");
        ImGui.Text("Color widget with InputHSV:");
        ImGui.ColorEdit4("HSV shown as RGB##1", color_stored_as_hsv.value, ImGuiColorEditFlags.DisplayRGB | ImGuiColorEditFlags.InputHSV | ImGuiColorEditFlags.Float);
        ImGui.ColorEdit4("HSV shown as HSV##1", color_stored_as_hsv.value, ImGuiColorEditFlags.DisplayHSV | ImGuiColorEditFlags.InputHSV | ImGuiColorEditFlags.Float);
        ImGui.DragFloat4("Raw HSV values", color_stored_as_hsv.value, 0.01, 0.0, 1.0);

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Range Widgets"))
    {
        /* static */ const begin: Static<number> = STATIC("begin", 10), end: Static<number> = STATIC("end", 90);
        /* static */ const begin_i: Static<number> = STATIC("begin_i", 100), end_i: Static<number> = STATIC("end_i", 1000);
        ImGui.DragFloatRange2("range", (value = begin.value) => begin.value = value, (value = end.value) => end.value = value, 0.25, 0.0, 100.0, "Min: %.1f %%", "Max: %.1f %%");
        ImGui.DragIntRange2("range int (no bounds)", (value = begin_i.value) => begin_i.value = value, (value = end_i.value) => end_i.value = value, 5, 0, 0, "Min: %d units", "Max: %d units");
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Data Types"))
    {
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

        const s8_zero = 0,   s8_one = 1,   s8_fifty = 50, s8_min = -128, s8_max = 127;
        const u8_zero = 0,   u8_one = 1,   u8_fifty = 50, u8_min = 0,    u8_max = 255;
        const s16_zero = 0,   s16_one = 1,   s16_fifty = 50, s16_min = -32768, s16_max = 32767;
        const u16_zero = 0,   u16_one = 1,   u16_fifty = 50, u16_min = 0,      u16_max = 65535;
        const s32_zero = 0,   s32_one = 1,   s32_fifty = 50, s32_min = INT_MIN / 2,   s32_max = INT_MAX / 2,    s32_hi_a = INT_MAX / 2 - 100,    s32_hi_b = INT_MAX / 2;
        const u32_zero = 0,   u32_one = 1,   u32_fifty = 50, u32_min = 0,             u32_max = UINT_MAX / 2,   u32_hi_a = UINT_MAX / 2 - 100,   u32_hi_b = UINT_MAX / 2;
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
        /* static */ const drag_clamp: Static<boolean> = STATIC("drag_clamp", false);
        ImGui.Text("Drags:");
        ImGui.Checkbox("Clamp integers to 0..50", (value = drag_clamp.value) => drag_clamp.value = value); ImGui.SameLine(); HelpMarker("As with every widgets in dear imgui, we never modify values unless there is a user interaction.\nYou can override the clamping limits by using CTRL+Click to input a value.");
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
        ImGui.DragScalar("drag s8",        s8_v.value,  drag_speed, drag_clamp.value ? s8_zero  : null, drag_clamp.value ? s8_fifty  : null);
        ImGui.DragScalar("drag u8",        u8_v.value,  drag_speed, drag_clamp.value ? u8_zero  : null, drag_clamp.value ? u8_fifty  : null, "%u ms");
        ImGui.DragScalar("drag s16",       s16_v.value, drag_speed, drag_clamp.value ? s16_zero : null, drag_clamp.value ? s16_fifty : null);
        ImGui.DragScalar("drag u16",       u16_v.value, drag_speed, drag_clamp.value ? u16_zero : null, drag_clamp.value ? u16_fifty : null, "%u ms");
        ImGui.DragScalar("drag s32",       s32_v.value, drag_speed, drag_clamp.value ? s32_zero : null, drag_clamp.value ? s32_fifty : null);
        ImGui.DragScalar("drag u32",       u32_v.value, drag_speed, drag_clamp.value ? u32_zero : null, drag_clamp.value ? u32_fifty : null, "%u ms");
        // ImGui.DragScalar("drag s64",       s64_v.value, drag_speed, drag_clamp.value ? s64_zero : null, drag_clamp.value ? s64_fifty : null);
        // ImGui.DragScalar("drag u64",       u64_v.value, drag_speed, drag_clamp.value ? u64_zero : null, drag_clamp.value ? u64_fifty : null);
        ImGui.DragScalar("drag float",     f32_v.value, 0.005, f32_zero, f32_one, "%f", 1.0);
        ImGui.DragScalar("drag float ^2",  f32_v.value, 0.005, f32_zero, f32_one, "%f", 2.0);
        ImGui.DragScalar("drag double",    f64_v.value, 0.0005, f64_zero, null,    "%.10f grams", 1.0);
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
        ImGui.SliderScalar("slider s8 full",     s8_v.value,  s8_min,   s8_max,   "%d");
        ImGui.SliderScalar("slider u8 full",     u8_v.value,  u8_min,   u8_max,   "%u");
        ImGui.SliderScalar("slider s16 full",    s16_v.value, s16_min,  s16_max,  "%d");
        ImGui.SliderScalar("slider u16 full",    u16_v.value, u16_min,  u16_max,  "%u");
        ImGui.SliderScalar("slider s32 low",     s32_v.value, s32_zero, s32_fifty,"%d");
        ImGui.SliderScalar("slider s32 high",    s32_v.value, s32_hi_a, s32_hi_b, "%d");
        ImGui.SliderScalar("slider s32 full",    s32_v.value, s32_min,  s32_max,  "%d");
        ImGui.SliderScalar("slider u32 low",     u32_v.value, u32_zero, u32_fifty,"%u");
        ImGui.SliderScalar("slider u32 high",    u32_v.value, u32_hi_a, u32_hi_b, "%u");
        ImGui.SliderScalar("slider u32 full",    u32_v.value, u32_min,  u32_max,  "%u");
        // ImGui.SliderScalar("slider s64 low",     s64_v.value, s64_zero, s64_fifty,"%I64d");
        // ImGui.SliderScalar("slider s64 high",    s64_v.value, s64_hi_a, s64_hi_b, "%I64d");
        // ImGui.SliderScalar("slider s64 full",    s64_v.value, s64_min,  s64_max,  "%I64d");
        // ImGui.SliderScalar("slider u64 low",     u64_v.value, u64_zero, u64_fifty,"%I64u ms");
        // ImGui.SliderScalar("slider u64 high",    u64_v.value, u64_hi_a, u64_hi_b, "%I64u ms");
        // ImGui.SliderScalar("slider u64 full",    u64_v.value, u64_min,  u64_max,  "%I64u ms");
        ImGui.SliderScalar("slider float low",   f32_v.value, f32_zero, f32_one);
        ImGui.SliderScalar("slider float low^2", f32_v.value, f32_zero, f32_one,  "%.10f", 2.0);
        ImGui.SliderScalar("slider float high",  f32_v.value, f32_lo_a, f32_hi_a, "%e");
        ImGui.SliderScalar("slider double low",  f64_v.value, f64_zero, f64_one,  "%.10f grams", 1.0);
        ImGui.SliderScalar("slider double low^2",f64_v.value, f64_zero, f64_one,  "%.10f", 2.0);
        ImGui.SliderScalar("slider double high", f64_v.value, f64_lo_a, f64_hi_a, "%e grams", 1.0);

        /* static */ const inputs_step: Static<boolean> = STATIC("inputs_step", true)
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
        ImGui.InputScalar("input s8",      s8_v.value,  inputs_step.value ? s8_one  : null, null, "%d");
        ImGui.InputScalar("input s8 hex",  s8_v.value,  inputs_step.value ? s8_one  : null, null, "%08X", ImGuiInputTextFlags.CharsHexadecimal);
        ImGui.InputScalar("input s16",     s16_v.value, inputs_step.value ? s16_one : null, null, "%d");
        ImGui.InputScalar("input s16 hex", s16_v.value, inputs_step.value ? s16_one : null, null, "%08X", ImGuiInputTextFlags.CharsHexadecimal);
        ImGui.InputScalar("input s32",     s32_v.value, inputs_step.value ? s32_one : null, null, "%d");
        ImGui.InputScalar("input s32 hex", s32_v.value, inputs_step.value ? s32_one : null, null, "%08X", ImGuiInputTextFlags.CharsHexadecimal);
        ImGui.InputScalar("input u32",     u32_v.value, inputs_step.value ? u32_one : null, null, "%u");
        ImGui.InputScalar("input u32 hex", u32_v.value, inputs_step.value ? u32_one : null, null, "%08X", ImGuiInputTextFlags.CharsHexadecimal);
        // ImGui.InputScalar("input s64",     s64_v.value, inputs_step.value ? s64_one : null);
        // ImGui.InputScalar("input u64",     u64_v.value, inputs_step.value ? u64_one : null);
        ImGui.InputScalar("input float",   f32_v.value, inputs_step.value ? f32_one : null);
        ImGui.InputScalar("input double",  f64_v.value, inputs_step.value ? f64_one : null);

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Multi-component Widgets"))
    {
        /* static */ const vec4f: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4f", [ 0.10, 0.20, 0.30, 0.44 ]);
        /* static */ const vec4i: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("vec4i", [ 1, 5, 100, 255 ]);

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

    if (ImGui.TreeNode("Vertical Sliders"))
    {
        const spacing: number = 4;
        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(spacing, spacing));

        /* static */ const int_value: Static<number> = STATIC("int_value", 0);
        ImGui.VSliderInt("##int", new ImVec2(18, 160), (value = int_value.value) => int_value.value = value, 0, 5);
        ImGui.SameLine();

        /* static */ const values: Static<number[]> = STATIC("values#1072", [ 0.0, 0.60, 0.35, 0.9, 0.70, 0.20, 0.0 ]);
        ImGui.PushID("set1");
        for (let i = 0; i < 7; i++)
        {
            if (i > 0) ImGui.SameLine();
            ImGui.PushID(i);
            ImGui.PushStyleColor(ImGuiCol.FrameBg, ImColor.HSV(i / 7.0, 0.5, 0.5));
            ImGui.PushStyleColor(ImGuiCol.FrameBgHovered, ImColor.HSV(i / 7.0, 0.6, 0.5));
            ImGui.PushStyleColor(ImGuiCol.FrameBgActive, ImColor.HSV(i / 7.0, 0.7, 0.5));
            ImGui.PushStyleColor(ImGuiCol.SliderGrab, ImColor.HSV(i / 7.0, 0.9, 0.9));
            ImGui.VSliderFloat("##v", new ImVec2(18, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "");
            if (ImGui.IsItemActive() || ImGui.IsItemHovered())
                ImGui.SetTooltip(`${values.value[i].toFixed(3)}`);
            ImGui.PopStyleColor(4);
            ImGui.PopID();
        }
        ImGui.PopID();

        ImGui.SameLine();
        ImGui.PushID("set2");
        /* static */ const values2: Static<number[/*4*/]> = STATIC("values2", [ 0.20, 0.80, 0.40, 0.25 ]);
        const rows: number = 3;
        const small_slider_size: Readonly<ImVec2> = new ImVec2(18, (160.0 - (rows - 1) * spacing) / rows);
        for (let nx = 0; nx < 4; nx++)
        {
            if (nx > 0) ImGui.SameLine();
            ImGui.BeginGroup();
            for (let ny = 0; ny < rows; ny++)
            {
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
        for (let i = 0; i < 4; i++)
        {
            if (i > 0) ImGui.SameLine();
            ImGui.PushID(i);
            ImGui.PushStyleVar(ImGuiStyleVar.GrabMinSize, 40);
            ImGui.VSliderFloat("##v", new ImVec2(40, 160), (value = values.value[i]) => values.value[i] = value, 0.0, 1.0, "%.2f\nsec");
            ImGui.PopStyleVar();
            ImGui.PopID();
        }
        ImGui.PopID();
        ImGui.PopStyleVar();
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Drag and Drop"))
    {
        {
            // ColorEdit widgets automatically act as drag source and drag target.
            // They are using standardized payload strings IMGUI_PAYLOAD_TYPE_COLOR_3F and IMGUI_PAYLOAD_TYPE_COLOR_4F to allow your own widgets
            // to use colors in their drag and drop interaction. Also see the demo in Color Picker -> Palette demo.
            ImGui.BulletText("Drag and drop in standard widgets");
            ImGui.Indent();
            /* static */ const col1: Static<ImTuple3<number>> = STATIC<ImTuple3<number>>("col1#1309", [ 1.0, 0.0, 0.2 ]);
            /* static */ const col2: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("col2#1310", [ 0.4, 0.7, 0.0, 0.5 ]);
            ImGui.ColorEdit3("color 1", col1.value);
            ImGui.ColorEdit4("color 2", col2.value);
            ImGui.Unindent();
        }

        {
            ImGui.BulletText("Drag and drop to copy/swap items");
            ImGui.Indent();
            enum Mode
            {
                Mode_Copy,
                Mode_Move,
                Mode_Swap
            };
            /* static */ const mode: Static<number> = STATIC("mode", 0);
            if (ImGui.RadioButton("Copy", mode.value === Mode.Mode_Copy)) { mode.value = Mode.Mode_Copy; } ImGui.SameLine();
            if (ImGui.RadioButton("Move", mode.value === Mode.Mode_Move)) { mode.value = Mode.Mode_Move; } ImGui.SameLine();
            if (ImGui.RadioButton("Swap", mode.value === Mode.Mode_Swap)) { mode.value = Mode.Mode_Swap; }
            /* static */ const names: Static<string[/*9*/]> = STATIC("names", [ "Bobby", "Beatrice", "Betty", "Brianna", "Barry", "Bernard", "Bibi", "Blaine", "Bryn" ]);
            for (let n = 0; n < IM_ARRAYSIZE(names.value); n++)
            {
                ImGui.PushID(n);
                if ((n % 3) != 0)
                    ImGui.SameLine();
                ImGui.Button(names.value[n], new ImVec2(60,60));

                // Our buttons are both drag sources and drag targets here!
                if (ImGui.BeginDragDropSource(ImGui.DragDropFlags.None))
                {
                    // ImGui.SetDragDropPayload("DND_DEMO_CELL", &n, sizeof(int));        // Set payload to carry the index of our item (could be anything)
                    ImGui.SetDragDropPayload("DND_DEMO_CELL", { n }); // Set payload to carry the index of our item (could be anything)
                    if (mode.value === Mode.Mode_Copy) { ImGui.Text(`Copy ${names.value[n]}`); } // Display preview (could be anything, e.g. when dragging an image we could decide to display the filename and a small preview of the image, etc.)
                    if (mode.value === Mode.Mode_Move) { ImGui.Text(`Move ${names.value[n]}`); }
                    if (mode.value === Mode.Mode_Swap) { ImGui.Text(`Swap ${names.value[n]}`); }
                    ImGui.EndDragDropSource();
                }
                if (ImGui.BeginDragDropTarget())
                {
                    let payload: ImGui.ImGuiPayload<{ n: number }> | null;
                    if (payload = ImGui.AcceptDragDropPayload("DND_DEMO_CELL"))
                    {
                        // IM_ASSERT(payload->DataSize == sizeof(int));
                        // int payload_n = *(const int*)payload->Data;
                        const payload_n: number = payload.Data.n;
                        if (mode.value === Mode.Mode_Copy)
                        {
                            names.value[n] = names.value[payload_n];
                        }
                        if (mode.value === Mode.Mode_Move)
                        {
                            names.value[n] = names.value[payload_n];
                            names.value[payload_n] = "";
                        }
                        if (mode.value === Mode.Mode_Swap)
                        {
                            const tmp: string = names.value[n];
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

    if (ImGui.TreeNode("Querying Status (Active/Focused/Hovered etc.)"))
    {
        // Display the value of IsItemHovered() and other common item state functions. Note that the flags can be combined.
        // (because BulletText is an item itself and that would affect the output of IsItemHovered() we pass all state in a single call to simplify the code).
        /* static */ const item_type: Static<number> = STATIC("item_type", 1);
        /* static */ const b: Static<boolean> = STATIC("b#1302", false);
        /* static */ const col4f: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("col4f", [ 1.0, 0.5, 0.0, 1.0 ]);
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
        let ret: boolean = false;
        if (item_type.value === 0) { ImGui.Text("ITEM: Text"); }                                                     // Testing text items with no identifier/interaction
        if (item_type.value === 1) { ret = ImGui.Button("ITEM: Button"); }                                           // Testing button
        if (item_type.value === 2) { ret = ImGui.Checkbox("ITEM: Checkbox", (value = b.value) => b.value = value); } // Testing checkbox
        if (item_type.value === 3) { ret = ImGui.SliderFloat("ITEM: SliderFloat", (value = col4f.value[0]) => col4f.value[0] = value, 0.0, 1.0); } // Testing basic item
        // if (item_type.value === 4) { ret = ImGui.InputText("ITEM: InputText", &str[0], IM_ARRAYSIZE(str)); }  // Testing input text (which handles tabbing)
        // if (item_type.value === 5) { ret = ImGui.InputFloat3("ITEM: InputFloat3", col4f); }                   // Testing multi-component items (IsItemXXX flags are reported merged)
        if (item_type.value === 6) { ret = ImGui.ColorEdit4("ITEM: ColorEdit4", col4f.value); }                      // Testing multi-component items (IsItemXXX flags are reported merged)
        // if (item_type == 7) { ret = ImGui.MenuItem("ITEM: MenuItem"); }                                // Testing menu item (they use ImGuiButtonFlags_PressedOnRelease button policy)
        // if (item_type == 8) { ret = ImGui.TreeNodeEx("ITEM: TreeNode w/ ImGuiTreeNodeFlags_OpenOnDoubleClick", ImGuiTreeNodeFlags_OpenOnDoubleClick | ImGuiTreeNodeFlags_NoTreePushOnOpen); } // Testing tree node with ImGuiButtonFlags_PressedOnDoubleClick button policy.
        if (item_type.value === 9) { const items: string[] = [ "Apple", "Banana", "Cherry", "Kiwi" ]; /* static */ const current: Static<number> = STATIC("current", 1); ret = ImGui.ListBox("ITEM: ListBox", (value = current.value) => current.value = value, items, IM_ARRAYSIZE(items), IM_ARRAYSIZE(items)); }
        ImGui.BulletText(
            `Return value = ${ret}\n` +
            `IsItemFocused() = ${ImGui.IsItemFocused()}\n` +
            `IsItemHovered() = ${ImGui.IsItemHovered()}\n` +
            `IsItemHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
            `IsItemHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
            `IsItemHovered(_AllowWhenOverlapped) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.AllowWhenOverlapped)}\n` +
            `IsItemhovered(_RectOnly) = ${ImGui.IsItemHovered(ImGuiHoveredFlags.RectOnly)}\n` +
            `IsItemActive() = ${ImGui.IsItemActive()}\n` +
            `IsItemEdited() = ${ImGui.IsItemEdited()}\n` +
            `IsItemActivated() = ${ImGui.IsItemActivated()}\n` +
            `IsItemDeactivated() = ${ImGui.IsItemDeactivated()}\n` +
            `IsItemDeactivatedAfterEdit() = ${ImGui.IsItemDeactivatedAfterEdit()}\n` +
            `IsItemVisible() = ${ImGui.IsItemVisible()}\n` +
            `IsItemClicked() = ${ImGui.IsItemClicked()}\n` +
            `GetItemRectMin() = (${ImGui.GetItemRectMin().x.toFixed(1)}, ${ImGui.GetItemRectMin().y.toFixed(1)})\n` +
            `GetItemRectMax() = (${ImGui.GetItemRectMax().x.toFixed(1)}, ${ImGui.GetItemRectMax().y.toFixed(1)})\n` +
            `GetItemRectSize() = (${ImGui.GetItemRectSize().x.toFixed(1)}, ${ImGui.GetItemRectSize().y.toFixed(1)})`
        );

        /* static */ const embed_all_inside_a_child_window: Static<boolean> = STATIC("embed_all_inside_a_child_window", false);
        ImGui.Checkbox("Embed everything inside a child window (for additional testing)", (value = embed_all_inside_a_child_window.value) => embed_all_inside_a_child_window.value = value);
        if (embed_all_inside_a_child_window.value)
            ImGui.BeginChild("outer_child", new ImVec2(0, ImGui.GetFontSize() * 20), true);

        // Testing IsWindowFocused() function with its various flags. Note that the flags can be combined.
        ImGui.BulletText(
            `IsWindowFocused() = ${ImGui.IsWindowFocused()}\n` +
            `IsWindowFocused(_ChildWindows) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.ChildWindows)}\n` +
            `IsWindowFocused(_ChildWindows|_RootWindow) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.ChildWindows | ImGuiFocusedFlags.RootWindow)}\n` +
            `IsWindowFocused(_RootWindow) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.RootWindow)}\n` +
            `IsWindowFocused(_AnyWindow) = ${ImGui.IsWindowFocused(ImGuiFocusedFlags.AnyWindow)}\n`);

        // Testing IsWindowHovered() function with its various flags. Note that the flags can be combined.
        ImGui.BulletText(
            `IsWindowHovered() = ${ImGui.IsWindowHovered()}\n` +
            `IsWindowHovered(_AllowWhenBlockedByPopup) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
            `IsWindowHovered(_AllowWhenBlockedByActiveItem) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.AllowWhenBlockedByActiveItem)}\n` +
            `IsWindowHovered(_ChildWindows) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.ChildWindows)}\n` +
            `IsWindowHovered(_ChildWindows|_RootWindow) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.ChildWindows | ImGuiHoveredFlags.RootWindow)}\n` +
            `IsWindowFocused(_ChildWindows|_AllowWhenBlockedByPopup) = ${ImGui.IsWindowFocused(ImGuiHoveredFlags.ChildWindows | ImGuiHoveredFlags.AllowWhenBlockedByPopup)}\n` +
            `IsWindowHovered(_RootWindow) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.RootWindow)}\n` +
            `IsWindowHovered(_AnyWindow) = ${ImGui.IsWindowHovered(ImGuiHoveredFlags.AnyWindow)}\n`);

        ImGui.BeginChild("child", new ImVec2(0, 50), true);
        ImGui.Text("This is another child window for testing the _ChildWindows flag.");
        ImGui.EndChild();

        if (embed_all_inside_a_child_window.value)
            ImGui.EndChild();

        // static char dummy_str[] = "This is a dummy field to be able to tab-out of the widgets above.";
        // ImGui.InputText("dummy", dummy_str, IM_ARRAYSIZE(dummy_str), ImGuiInputTextFlags_ReadOnly);

        // Calling IsItemHovered() after begin returns the hovered status of the title bar.
        // This is useful in particular if you want to create a context menu (with BeginPopupContextItem) associated to the title bar of a window.
        /* static */ const test_window: Static<boolean> = STATIC("test_window", false);
        ImGui.Checkbox("Hovered/Active tests after Begin() for title bar testing", (value = test_window.value) => test_window.value = value);
        if (test_window.value)
        {
            ImGui.Begin("Title bar Hovered/Active tests", (value = test_window.value) => test_window.value = value);
            if (ImGui.BeginPopupContextItem()) // <-- This is using IsItemHovered()
            {
                if (ImGui.MenuItem("Close")) { test_window.value = false; }
                ImGui.EndPopup();
            }
            ImGui.Text(
                `IsItemHovered() after begin = ${ImGui.IsItemHovered()} (== is title bar hovered)\n` +
                `IsItemActive() after begin = ${ImGui.IsItemActive()} (== is window being clicked/moved)\n`);
            ImGui.End();
        }

        ImGui.TreePop();
    }
}

function ShowDemoWindowLayout()
{
    if (!ImGui.CollapsingHeader("Layout"))
        return;

    if (ImGui.TreeNode("Child windows"))
    {
        HelpMarker("Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window.");
        /* static */ const disable_mouse_wheel: Static<boolean> = STATIC("disable_mouse_wheel", false);
        /* static */ const disable_menu: Static<boolean> = STATIC("disable_menu", false);
        ImGui.Checkbox("Disable Mouse Wheel", (value = disable_mouse_wheel.value) => disable_mouse_wheel.value = value);
        ImGui.Checkbox("Disable Menu", (value = disable_menu.value) => disable_menu.value = value);

        /* static */ const line: Static<number> = STATIC("line", 50);
        let goto_line: boolean = ImGui.Button("Goto");
        ImGui.SameLine();
        ImGui.SetNextItemWidth(100);
        goto_line = ImGui.InputInt("##Line", (value = line.value) => line.value = value, 0, 0, ImGuiInputTextFlags.EnterReturnsTrue) || goto_line;

        // Child 1: no border, enable horizontal scrollbar
        {
            const window_flags = ImGuiWindowFlags.HorizontalScrollbar | (disable_mouse_wheel.value ? ImGuiWindowFlags.NoScrollWithMouse : 0);
            ImGui.BeginChild("Child1", new ImVec2(ImGui.GetWindowContentRegionWidth() * 0.5, 260), false, window_flags);
            for (let i = 0; i < 100; i++)
            {
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
            const window_flags = (disable_mouse_wheel.value ? ImGuiWindowFlags.NoScrollWithMouse : 0) | (disable_menu.value ? 0 : ImGuiWindowFlags.MenuBar);
            ImGui.PushStyleVar(ImGuiStyleVar.ChildRounding, 5.0);
            ImGui.BeginChild("Child2", new ImVec2(0, 260), true, window_flags);
            if (!disable_menu.value && ImGui.BeginMenuBar())
            {
                if (ImGui.BeginMenu("Menu"))
                {
                    ShowExampleMenuFile();
                    ImGui.EndMenu();
                }
                ImGui.EndMenuBar();
            }
            ImGui.Columns(2);
            for (let i = 0; i < 100; i++)
            {
                // sprintf(buf, "%03d", i);
                const buf: string = `${format_number_dec(i, 3)}`;
                ImGui.Button(buf, new ImVec2(-1.0, 0.0));
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
            ImGui.PushStyleColor(ImGuiCol.ChildBg, IM_COL32(255, 0, 0, 100));
            ImGui.BeginChild("blah", new ImVec2(200, 100), true, ImGuiWindowFlags.None);
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

    if (ImGui.TreeNode("Widgets Width"))
    {
        // Use SetNextItemWidth() to set the width of a single upcoming item.
        // Use PushItemWidth()/PopItemWidth() to set the width of a group of items.
        /* static */ const f: Static<number> = STATIC("f#1181", 0.0);
        ImGui.Text("SetNextItemWidth/PushItemWidth(100)");
        ImGui.SameLine(); HelpMarker("Fixed width.");
        ImGui.SetNextItemWidth(100);
        ImGui.DragFloat("float##1", (value = f.value) => f.value = value);

        ImGui.Text("SetNextItemWidth/PushItemWidth(GetWindowWidth() * 0.5f)");
        ImGui.SameLine(); HelpMarker("Half of window width.");
        ImGui.SetNextItemWidth(ImGui.GetWindowWidth() * 0.5);
        ImGui.DragFloat("float##2", (value = f.value) => f.value = value);

        ImGui.Text("SetNextItemWidth/PushItemWidth(GetContentRegionAvail().x * 0.5f)");
        ImGui.SameLine(); HelpMarker("Half of available width.\n(~ right-cursor_pos)\n(works within a column set)");
        ImGui.SetNextItemWidth(ImGui.GetContentRegionAvail().x * 0.5);
        ImGui.DragFloat("float##3", (value = f.value) => f.value = value);

        ImGui.Text("SetNextItemWidth/PushItemWidth(-100)");
        ImGui.SameLine(); HelpMarker("Align to right edge minus 100");
        ImGui.SetNextItemWidth(-100);
        ImGui.DragFloat("float##4", (value = f.value) => f.value = value);

        // Demonstrate using PushItemWidth to surround three items. Calling SetNextItemWidth() before each of them would have the same effect.
        ImGui.Text("SetNextItemWidth/PushItemWidth(-1)");
        ImGui.SameLine(); HelpMarker("Align to right edge");
        ImGui.PushItemWidth(-1);
        ImGui.DragFloat("float##5a", (value = f.value) => f.value = value);
        ImGui.DragFloat("float##5b", (value = f.value) => f.value = value);
        ImGui.DragFloat("float##5c", (value = f.value) => f.value = value);
        ImGui.PopItemWidth();

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Basic Horizontal Layout"))
    {
        ImGui.TextWrapped("(Use ImGui.SameLine() to keep adding items to the right of the preceding item)");

        // Text
        ImGui.Text("Two items: Hello"); ImGui.SameLine();
        ImGui.TextColored(new ImVec4(1, 1, 0, 1), "Sailor");

        // Adjust spacing
        ImGui.Text("More spacing: Hello"); ImGui.SameLine(0, 20);
        ImGui.TextColored(new ImVec4(1, 1, 0, 1), "Sailor");

        // Button
        ImGui.AlignTextToFramePadding();
        ImGui.Text("Normal buttons"); ImGui.SameLine();
        ImGui.Button("Banana"); ImGui.SameLine();
        ImGui.Button("Apple"); ImGui.SameLine();
        ImGui.Button("Corniflower");

        // Button
        ImGui.Text("Small buttons"); ImGui.SameLine();
        ImGui.SmallButton("Like this one"); ImGui.SameLine();
        ImGui.Text("can fit within a text block.");

        // Aligned to arbitrary position. Easy/cheap column.
        ImGui.Text("Aligned");
        ImGui.SameLine(150); ImGui.Text("x=150");
        ImGui.SameLine(300); ImGui.Text("x=300");
        ImGui.Text("Aligned");
        ImGui.SameLine(150); ImGui.SmallButton("x=150");
        ImGui.SameLine(300); ImGui.SmallButton("x=300");

        // Checkbox
        /* static */ const c1: Static<boolean> = STATIC("c1", false), c2: Static<boolean> = STATIC("c2", false), c3: Static<boolean> = STATIC("c3", false), c4: Static<boolean> = STATIC("c4", false);
        ImGui.Checkbox("My", (value = c1.value) => c1.value = value); ImGui.SameLine();
        ImGui.Checkbox("Tailor", (value = c2.value) => c2.value = value); ImGui.SameLine();
        ImGui.Checkbox("Is", (value = c3.value) => c3.value = value); ImGui.SameLine();
        ImGui.Checkbox("Rich", (value = c4.value) => c4.value = value);

        // Various
        /* static */ const f0: Static<number> = STATIC("f0#1255", 1.0), f1: Static<number> = STATIC("f1#1255", 2.0), f2: Static<number> = STATIC("f2", 3.0);
        ImGui.PushItemWidth(80);
        const items: string[] = [ "AAAA", "BBBB", "CCCC", "DDDD" ];
        /* static */ const item: Static<number> = STATIC("item#1258", -1);
        ImGui.Combo("Combo", (value = item.value) => item.value = value, items, IM_ARRAYSIZE(items)); ImGui.SameLine();
        ImGui.SliderFloat("X", (value = f0.value) => f0.value = value, 0.0, 5.0); ImGui.SameLine();
        ImGui.SliderFloat("Y", (value = f1.value) => f1.value = value, 0.0, 5.0); ImGui.SameLine();
        ImGui.SliderFloat("Z", (value = f2.value) => f2.value = value, 0.0, 5.0);
        ImGui.PopItemWidth();

        ImGui.PushItemWidth(80);
        ImGui.Text("Lists:");
        /* static */ const selection: Static<number[/*4*/]> = STATIC("selection", [ 0, 1, 2, 3 ]);
        for (let i = 0; i < 4; i++)
        {
            if (i > 0) ImGui.SameLine();
            ImGui.PushID(i);
            ImGui.ListBox("", (value = selection.value[i]) => selection.value[i] = value, items, IM_ARRAYSIZE(items));
            ImGui.PopID();
            if (ImGui.IsItemHovered()) ImGui.SetTooltip(`ListBox ${i} hovered`);
        }
        ImGui.PopItemWidth();

        // Dummy
        const button_sz: Readonly<ImVec2> = new ImVec2(40, 40);
        ImGui.Button("A", button_sz); ImGui.SameLine();
        ImGui.Dummy(button_sz); ImGui.SameLine();
        ImGui.Button("B", button_sz);

        // Manually wrapping (we should eventually provide this as an automatic layout feature, but for now you can do it manually)
        ImGui.Text("Manually wrapping:");
        const style: ImGuiStyle = ImGui.GetStyle();
        const buttons_count: number = 20;
        const window_visible_x2: number = ImGui.GetWindowPos().x + ImGui.GetWindowContentRegionMax().x;
        for (let n = 0; n < buttons_count; n++)
        {
            ImGui.PushID(n);
            ImGui.Button("Box", button_sz);
            const last_button_x2: number = ImGui.GetItemRectMax().x;
            const next_button_x2: number = last_button_x2 + style.ItemSpacing.x + button_sz.x; // Expected position if next button was on same line
            if (n + 1 < buttons_count && next_button_x2 < window_visible_x2)
                ImGui.SameLine();
            ImGui.PopID();
        }

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Tabs"))
    {
        if (ImGui.TreeNode("Basic"))
        {
            const tab_bar_flags = ImGuiTabBarFlags.None;
            if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags))
            {
                if (ImGui.BeginTabItem("Avocado"))
                {
                    ImGui.Text("This is the Avocado tab!\nblah blah blah blah blah");
                    ImGui.EndTabItem();
                }
                if (ImGui.BeginTabItem("Broccoli"))
                {
                    ImGui.Text("This is the Broccoli tab!\nblah blah blah blah blah");
                    ImGui.EndTabItem();
                }
                if (ImGui.BeginTabItem("Cucumber"))
                {
                    ImGui.Text("This is the Cucumber tab!\nblah blah blah blah blah");
                    ImGui.EndTabItem();
                }
                ImGui.EndTabBar();
            }
            ImGui.Separator();
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Advanced & Close Button"))
        {
            // Expose a couple of the available flags. In most cases you may just call BeginTabBar() with no flags (0).
            /* static */ const tab_bar_flags: Static<ImGuiTabBarFlags> = STATIC("tab_bar_flags", ImGuiTabBarFlags.Reorderable);
            ImGui.CheckboxFlags("ImGuiTabBarFlags_Reorderable", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.Reorderable);
            ImGui.CheckboxFlags("ImGuiTabBarFlags_AutoSelectNewTabs", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.AutoSelectNewTabs);
            ImGui.CheckboxFlags("ImGuiTabBarFlags_TabListPopupButton", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGuiTabBarFlags.TabListPopupButton);
            ImGui.CheckboxFlags("ImGuiTabBarFlags_NoCloseWithMiddleMouseButton", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGui.TabBarFlags.NoCloseWithMiddleMouseButton);
            if ((tab_bar_flags.value & ImGuiTabBarFlags.FittingPolicyMask_) === 0)
                tab_bar_flags.value |= ImGuiTabBarFlags.FittingPolicyDefault_;
            if (ImGui.CheckboxFlags("ImGuiTabBarFlags_FittingPolicyResizeDown", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGuiTabBarFlags.FittingPolicyResizeDown))
                tab_bar_flags.value &= ~(ImGuiTabBarFlags.FittingPolicyMask_ ^ ImGuiTabBarFlags.FittingPolicyResizeDown);
            if (ImGui.CheckboxFlags("ImGuiTabBarFlags_FittingPolicyScroll", (value = tab_bar_flags.value) => tab_bar_flags.value = value, ImGuiTabBarFlags.FittingPolicyScroll))
                tab_bar_flags.value &= ~(ImGuiTabBarFlags.FittingPolicyMask_ ^ ImGuiTabBarFlags.FittingPolicyScroll);

            // Tab Bar
            const names = [ "Artichoke", "Beetroot", "Celery", "Daikon" ];
            /* static */ const opened: Static<boolean[]> = STATIC("opened", [ true, true, true, true ]); // Persistent user state
            for (let n = 0; n < IM_ARRAYSIZE(opened.value); n++)
            {
                if (n > 0) { ImGui.SameLine(); }
                ImGui.Checkbox(names[n], (value = opened.value[n]) => opened.value[n] = value);
            }

            // Passing a bool* to BeginTabItem() is similar to passing one to Begin(): the underlying bool will be set to false when the tab is closed.
            if (ImGui.BeginTabBar("MyTabBar", tab_bar_flags.value))
            {
                for (let n = 0; n < IM_ARRAYSIZE(opened.value); n++)
                    if (opened.value[n] && ImGui.BeginTabItem(names[n], (value = opened.value[n]) => opened.value[n] = value))
                    {
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

    if (ImGui.TreeNode("Groups"))
    {
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
        const size: ImVec2 = ImGui.GetItemRectSize();
        const values: number[/*5*/] = [ 0.5, 0.20, 0.80, 0.60, 0.25 ];
        ImGui.PlotHistogram("##values", values, IM_ARRAYSIZE(values), 0, null, 0.0, 1.0, size);

        ImGui.Button("ACTION", new ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
        ImGui.SameLine();
        ImGui.Button("REACTION", new ImVec2((size.x - ImGui.GetStyle().ItemSpacing.x) * 0.5, size.y));
        ImGui.EndGroup();
        ImGui.SameLine();

        ImGui.Button("LEVERAGE\nBUZZWORD", size);
        ImGui.SameLine();

        if (ImGui.ListBoxHeader("List", size))
        {
            ImGui.Selectable("Selected", true);
            ImGui.Selectable("Not Selected", false);
            ImGui.ListBoxFooter();
        }

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Text Baseline Alignment"))
    {
        HelpMarker("This is testing the vertical alignment that gets applied on text to keep it aligned with widgets. Lines only composed of text or \"small\" widgets fit in less vertical spaces than lines with normal widgets.");

        ImGui.Text("One\nTwo\nThree"); ImGui.SameLine();
        ImGui.Text("Hello\nWorld"); ImGui.SameLine();
        ImGui.Text("Banana");

        ImGui.Text("Banana"); ImGui.SameLine();
        ImGui.Text("Hello\nWorld"); ImGui.SameLine();
        ImGui.Text("One\nTwo\nThree");

        ImGui.Button("HOP##1"); ImGui.SameLine();
        ImGui.Text("Banana"); ImGui.SameLine();
        ImGui.Text("Hello\nWorld"); ImGui.SameLine();
        ImGui.Text("Banana");

        ImGui.Button("HOP##2"); ImGui.SameLine();
        ImGui.Text("Hello\nWorld"); ImGui.SameLine();
        ImGui.Text("Banana");

        ImGui.Button("TEST##1"); ImGui.SameLine();
        ImGui.Text("TEST"); ImGui.SameLine();
        ImGui.SmallButton("TEST##2");

        ImGui.AlignTextToFramePadding(); // If your line starts with text, call this to align it to upcoming widgets.
        ImGui.Text("Text aligned to Widget"); ImGui.SameLine();
        ImGui.Button("Widget##1"); ImGui.SameLine();
        ImGui.Text("Widget"); ImGui.SameLine();
        ImGui.SmallButton("Widget##2"); ImGui.SameLine();
        ImGui.Button("Widget##3");

        // Tree
        const spacing: number = ImGui.GetStyle().ItemInnerSpacing.x;
        ImGui.Button("Button##1");
        ImGui.SameLine(0.0, spacing);
        if (ImGui.TreeNode("Node##1")) { for (let i = 0; i < 6; i++) ImGui.BulletText(`Item ${i}..`); ImGui.TreePop(); }    // Dummy tree data

        ImGui.AlignTextToFramePadding();         // Vertically align text node a bit lower so it'll be vertically centered with upcoming widget. Otherwise you can use SmallButton (smaller fit).
        const node_open: boolean = ImGui.TreeNode("Node##2");  // Common mistake to avoid: if we want to SameLine after TreeNode we need to do it before we add child content.
        ImGui.SameLine(0.0, spacing); ImGui.Button("Button##2");
        if (node_open) { for (let i = 0; i < 6; i++) ImGui.BulletText(`Item ${i}..`); ImGui.TreePop(); }   // Dummy tree data

        // Bullet
        ImGui.Button("Button##3");
        ImGui.SameLine(0.0, spacing);
        ImGui.BulletText("Bullet text");

        ImGui.AlignTextToFramePadding();
        ImGui.BulletText("Node");
        ImGui.SameLine(0.0, spacing); ImGui.Button("Button##4");

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Scrolling"))
    {
        HelpMarker("Use SetScrollHereY() or SetScrollFromPosY() to scroll to a given position.");

        /* static */ const track: Static<boolean> = STATIC("track", true);
        /* static */ const track_line: Static<number> = STATIC("track_line", 50);
        /* static */ const scroll_to_off_px: Static<number> = STATIC("scroll_to_off_px", 0);
        /* static */ const scroll_to_pos_px: Static<number> = STATIC("scroll_to_pos_px", 200);
        ImGui.Checkbox("Track", (value = track.value) => track.value = value);
        ImGui.PushItemWidth(100);
        ImGui.SameLine(140); track.value = ImGui.DragInt("##line", (value = track_line.value) => track_line.value = value, 0.25, 0, 99, "Line = %d") || track.value;

        let scroll_to_off: boolean = ImGui.Button("Scroll Offset");
        ImGui.SameLine(140); scroll_to_off = ImGui.DragFloat("##off_y", (value = scroll_to_off_px.value) => scroll_to_off_px.value = value, 1.00, 0, 9999, "+%.0f px") || scroll_to_off;

        let scroll_to_pos: boolean = ImGui.Button("Scroll To Pos");
        ImGui.SameLine(140); scroll_to_pos = ImGui.DragInt("##pos_y", (value = scroll_to_pos_px.value) => scroll_to_pos_px.value = value, 1.00, 0, 9999, "Y = %d px") || scroll_to_pos;

        ImGui.PopItemWidth();
        if (scroll_to_off || scroll_to_pos)
            track.value = false;

        const style: ImGuiStyle = ImGui.GetStyle();
        const child_w: number = (ImGui.GetContentRegionAvail().x - 4 * style.ItemSpacing.x) / 5;
        for (let i = 0; i < 5; i++)
        {
            if (i > 0) ImGui.SameLine();
            ImGui.BeginGroup();
            ImGui.Text(i === 0 ? "Top" : i === 1 ? "25%" : i === 2 ? "Center" : i === 3 ? "75%" : "Bottom");
            const child_flags: ImGui.WindowFlags = ImGuiWindowFlags.MenuBar;
            ImGui.BeginChild(ImGui.GetID(i), new ImVec2(child_w, 200.0), true, child_flags);
            if (scroll_to_off)
                ImGui.SetScrollY(scroll_to_off_px.value);
            if (scroll_to_pos)
                ImGui.SetScrollFromPosY(ImGui.GetCursorStartPos().y + scroll_to_pos_px.value, i * 0.25);
            for (let line = 0; line < 100; line++)
            {
                if (track.value && line === track_line.value)
                {
                    ImGui.TextColored(new ImVec4(1, 1, 0, 1), `Line ${line}`);
                    ImGui.SetScrollHereY(i * 0.25); // 0.0:top, 0.5f:center, 1.0f:bottom
                }
                else
                {
                    ImGui.Text(`Line ${line}`);
                }
            }
            const scroll_y: number = ImGui.GetScrollY();
            const scroll_max_y: number = ImGui.GetScrollMaxY();
            ImGui.EndChild();
            ImGui.Text(`${scroll_y.toFixed(0)}/${scroll_max_y.toFixed(0)}`);
            ImGui.EndGroup();
        }
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Horizontal Scrolling"))
    {
        HelpMarker("Horizontal scrolling for a window has to be enabled explicitly via the ImGuiWindowFlags_HorizontalScrollbar flag.\n\nYou may want to explicitly specify content width by calling SetNextWindowContentWidth() before Begin().");
        /* static */ const lines: Static<number> = STATIC("lines#1432", 7);
        ImGui.SliderInt("Lines", (value = lines.value) => lines.value = value, 1, 15);
        ImGui.PushStyleVar(ImGuiStyleVar.FrameRounding, 3.0);
        ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(2.0, 1.0));
        ImGui.BeginChild("scrolling", new ImVec2(0, ImGui.GetFrameHeightWithSpacing() * 7 + 30), true, ImGuiWindowFlags.HorizontalScrollbar);
        for (let line = 0; line < lines.value; line++)
        {
            // Display random stuff (for the sake of this trivial demo we are using basic Button+SameLine. If you want to create your own time line for a real application you may be better off
            // manipulating the cursor position yourself, aka using SetCursorPos/SetCursorScreenPos to position the widgets yourself. You may also want to use the lower-level ImDrawList API)
            const num_buttons: number = 10 + ((line & 1) ? line * 9 : line * 3);
            for (let n = 0; n < num_buttons; n++)
            {
                if (n > 0) ImGui.SameLine();
                ImGui.PushID(n + line * 1000);
                const num_buf: string = n.toFixed(0);
                const label: string = (!(n % 15)) ? "FizzBuzz" : (!(n % 3)) ? "Fizz" : (!(n % 5)) ? "Buzz" : num_buf;
                const hue: number = n * 0.05;
                ImGui.PushStyleColor(ImGuiCol.Button, ImColor.HSV(hue, 0.6, 0.6));
                ImGui.PushStyleColor(ImGuiCol.ButtonHovered, ImColor.HSV(hue, 0.7, 0.7));
                ImGui.PushStyleColor(ImGuiCol.ButtonActive, ImColor.HSV(hue, 0.8, 0.8));
                ImGui.Button(label, new ImVec2(40.0 + Math.sin(line + n) * 20.0, 0.0));
                ImGui.PopStyleColor(3);
                ImGui.PopID();
            }
        }
        const scroll_x: number = ImGui.GetScrollX();
        const scroll_max_x: number = ImGui.GetScrollMaxX();
        ImGui.EndChild();
        ImGui.PopStyleVar(2);
        let scroll_x_delta: number = 0.0;
        ImGui.SmallButton("<<"); if (ImGui.IsItemActive()) { scroll_x_delta = -ImGui.GetIO().DeltaTime * 1000.0; } ImGui.SameLine();
        ImGui.Text("Scroll from code"); ImGui.SameLine();
        ImGui.SmallButton(">>"); if (ImGui.IsItemActive()) { scroll_x_delta = +ImGui.GetIO().DeltaTime * 1000.0; } ImGui.SameLine();
        ImGui.Text(`${scroll_x.toFixed(0)}/${scroll_max_x.toFixed(0)}`);
        if (scroll_x_delta !== 0.0)
        {
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

    if (ImGui.TreeNode("Clipping"))
    {
        /* static */ const size: Static<ImVec2> = STATIC("size", new ImVec2(100, 100)), offset: Static<ImVec2> = STATIC("offset", new ImVec2(50, 20));
        ImGui.TextWrapped("On a per-widget basis we are occasionally clipping text CPU-side if it won't fit in its frame. Otherwise we are doing coarser clipping + passing a scissor rectangle to the renderer. The system is designed to try minimizing both execution and CPU/GPU rendering cost.");
        ImGui.DragFloat2("size", size.value, 0.5, 1.0, 200.0, "%.0f");
        ImGui.TextWrapped("(Click and drag)");
        const pos: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
        const clip_rect: Readonly<ImVec4> = new ImVec4(pos.x, pos.y, pos.x + size.value.x, pos.y + size.value.y);
        ImGui.InvisibleButton("##dummy", size.value);
        if (ImGui.IsItemActive() && ImGui.IsMouseDragging()) { offset.value.x += ImGui.GetIO().MouseDelta.x; offset.value.y += ImGui.GetIO().MouseDelta.y; }
        ImGui.GetWindowDrawList().AddRectFilled(pos, new ImVec2(pos.x + size.value.x, pos.y + size.value.y), IM_COL32(90, 90, 120, 255));
        ImGui.GetWindowDrawList().AddText(ImGui.GetFont(), ImGui.GetFontSize() * 2.0, new ImVec2(pos.x + offset.value.x, pos.y + offset.value.y), IM_COL32(255, 255, 255, 255), "Line 1 hello\nLine 2 clip me!", null, 0.0, clip_rect);
        ImGui.TreePop();
    }
}

function ShowDemoWindowPopups()
{
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

    if (ImGui.TreeNode("Popups"))
    {
        ImGui.TextWrapped("When a popup is active, it inhibits interacting with windows that are behind the popup. Clicking outside the popup closes it.");

        /* static */ const selected_fish: Static<number> = STATIC("selected_fish", -1);
        const names: string[] = [ "Bream", "Haddock", "Mackerel", "Pollock", "Tilefish" ];
        /* static */ const toggles: Static<boolean[]> = STATIC("toggles", [ true, false, false, false, false ]);

        // Simple selection popup
        // (If you want to show the current selection inside the Button itself, you may want to build a string using the "###" operator to preserve a constant ID with a variable label)
        if (ImGui.Button("Select.."))
            ImGui.OpenPopup("my_select_popup");
        ImGui.SameLine();
        ImGui.TextUnformatted(selected_fish.value === -1 ? "<None>" : names[selected_fish.value]);
        if (ImGui.BeginPopup("my_select_popup"))
        {
            ImGui.Text("Aquarium");
            ImGui.Separator();
            for (let i = 0; i < IM_ARRAYSIZE(names); i++)
                if (ImGui.Selectable(names[i]))
                    selected_fish.value = i;
            ImGui.EndPopup();
        }

        // Showing a menu with toggles
        if (ImGui.Button("Toggle.."))
            ImGui.OpenPopup("my_toggle_popup");
        if (ImGui.BeginPopup("my_toggle_popup"))
        {
            for (let i = 0; i < IM_ARRAYSIZE(names); i++)
            {
                ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
            }
            if (ImGui.BeginMenu("Sub-menu"))
            {
                ImGui.MenuItem("Click me");
                ImGui.EndMenu();
            }

            ImGui.Separator();
            ImGui.Text("Tooltip here");
            if (ImGui.IsItemHovered())
                ImGui.SetTooltip("I am a tooltip over a popup");

            if (ImGui.Button("Stacked Popup"))
                ImGui.OpenPopup("another popup");
            if (ImGui.BeginPopup("another popup"))
            {
                for (let i = 0; i < IM_ARRAYSIZE(names); i++)
                {
                    ImGui.MenuItem(names[i], "", (value = toggles.value[i]) => toggles.value[i] = value);
                }
                if (ImGui.BeginMenu("Sub-menu"))
                {
                    ImGui.MenuItem("Click me");
                    if (ImGui.Button("Stacked Popup"))
                        ImGui.OpenPopup("another popup");
                    if (ImGui.BeginPopup("another popup"))
                    {
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
        if (ImGui.BeginPopup("my_file_popup"))
        {
            ShowExampleMenuFile();
            ImGui.EndPopup();
        }

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Context menus"))
    {
        // BeginPopupContextItem() is a helper to provide common/simple popup behavior of essentially doing:
        //    if (IsItemHovered() && IsMouseReleased(0))
        //       OpenPopup(id);
        //    return BeginPopup(id);
        // For more advanced uses you may want to replicate and cuztomize this code. This the comments inside BeginPopupContextItem() implementation.
        /* static */ const value: Static<number> = STATIC("value", 0.5);
        ImGui.Text(`Value = ${value.value.toFixed(3)} (<-- right-click here)`);
        if (ImGui.BeginPopupContextItem("item context menu"))
        {
            if (ImGui.Selectable("Set to zero")) value.value = 0.0;
            if (ImGui.Selectable("Set to PI")) value.value = 3.1415;
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
        /* static */ const name: Static<ImStringBuffer> = STATIC("name", new ImStringBuffer(32, "Label1"));
        const buf: string = `Button: ${name.value.buffer}###Button`; // ### operator override ID ignoring the preceding label
        ImGui.Button(buf);
        if (ImGui.BeginPopupContextItem())
        {
            ImGui.Text("Edit name:");
            ImGui.InputText("##edit", name.value, IM_ARRAYSIZE(name.value));
            if (ImGui.Button("Close"))
                ImGui.CloseCurrentPopup();
            ImGui.EndPopup();
        }
        ImGui.SameLine(); ImGui.Text("(<-- right-click here)");

        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Modals"))
    {
        ImGui.TextWrapped("Modal windows are like popups but the user cannot close them by clicking outside the window.");

        if (ImGui.Button("Delete.."))
            ImGui.OpenPopup("Delete?");

            if (ImGui.BeginPopupModal("Delete?", null, ImGuiWindowFlags.AlwaysAutoResize))
        {
            ImGui.Text("All those beautiful files will be deleted.\nThis operation cannot be undone!\n\n");
            ImGui.Separator();

            ///* static */ const dummy_i: number = 0;
            //ImGui.Combo("Combo", &dummy_i, "Delete\0Delete harder\0");

            /* static */ const dont_ask_me_next_time: Static<boolean> = STATIC("dont_ask_me_next_time", false);
            ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0, 0));
            ImGui.Checkbox("Don't ask me next time", (value = dont_ask_me_next_time.value) => dont_ask_me_next_time.value = value);
            ImGui.PopStyleVar();

            if (ImGui.Button("OK", new ImVec2(120, 0))) { ImGui.CloseCurrentPopup(); }
            ImGui.SetItemDefaultFocus();
            ImGui.SameLine();
            if (ImGui.Button("Cancel", new ImVec2(120, 0))) { ImGui.CloseCurrentPopup(); }
            ImGui.EndPopup();
        }

        if (ImGui.Button("Stacked modals.."))
            ImGui.OpenPopup("Stacked 1");
        if (ImGui.BeginPopupModal("Stacked 1", null, ImGuiWindowFlags.MenuBar))
        {
            if (ImGui.BeginMenuBar())
            {
                if (ImGui.BeginMenu("File"))
                {
                    if (ImGui.MenuItem("Dummy menu item")) {}
                    ImGui.EndMenu();
                }
                ImGui.EndMenuBar();
            }
            ImGui.Text("Hello from Stacked The First\nUsing style.Colors[ImGuiCol.ModalWindowDimBg] behind it.");

            // Testing behavior of widgets stacking their own regular popups over the modal.
            /* static */ const item: Static<number> = STATIC("item#1636", 1);
            /* static */ const color: Static<ImTuple4<number>> = STATIC<ImTuple4<number>>("color#2", [ 0.4, 0.7, 0.0, 0.5 ]);
            ImGui.Combo("Combo", (value = item.value) => item.value = value, "aaaa\0bbbb\0cccc\0dddd\0eeee\0\0");
            ImGui.ColorEdit4("color", color.value);

            if (ImGui.Button("Add another modal.."))
                ImGui.OpenPopup("Stacked 2");

            // Also demonstrate passing a bool* to BeginPopupModal(), this will create a regular close button which will close the popup.
            // Note that the visibility state of popups is owned by imgui, so the input value of the bool actually doesn't matter here.
            let dummy_open = true;
            if (ImGui.BeginPopupModal("Stacked 2", [dummy_open]))
            {
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

    if (ImGui.TreeNode("Menus inside a regular window"))
    {
        ImGui.TextWrapped("Below we are testing adding menu items to a regular window. It's rather unusual but should work!");
        ImGui.Separator();
        // NB: As a quirk in this very specific example, we want to differentiate the parent of this menu from the parent of the various popup menus above.
        // To do so we are encloding the items in a PushID()/PopID() block to make them two different menusets. If we don't, opening any popup above and hovering our menu here
        // would open it. This is because once a menu is active, we allow to switch to a sibling menu by just hovering on it, which is the desired behavior for regular menus.
        ImGui.PushID("foo");
        ImGui.MenuItem("Menu item", "CTRL+M");
        if (ImGui.BeginMenu("Menu inside a regular window"))
        {
            ShowExampleMenuFile();
            ImGui.EndMenu();
        }
        ImGui.PopID();
        ImGui.Separator();
        ImGui.TreePop();
    }
}

function ShowDemoWindowColumns()
{
    if (!ImGui.CollapsingHeader("Columns"))
        return;

    ImGui.PushID("Columns");

    /* static */ const disable_indent: Static<boolean> = STATIC("disable_indent", false);
    ImGui.Checkbox("Disable tree indentation", (value = disable_indent.value) => disable_indent.value = value);
    ImGui.SameLine();
    HelpMarker("Disable the indenting of tree nodes so demo columns can use the full window width.");
    if (disable_indent.value)
        ImGui.PushStyleVar(ImGuiStyleVar.IndentSpacing, 0.0);

    // Basic columns
    if (ImGui.TreeNode("Basic"))
    {
        ImGui.Text("Without border:");
        ImGui.Columns(3, "mycolumns3", false);  // 3-ways, no border
        ImGui.Separator();
        for (let n = 0; n < 14; n++)
        {
            const label: string = `Item ${n}`;
            if (ImGui.Selectable(label)) {}
            //if (ImGui.Button(label, new ImVec2(-1,0))) {}
            ImGui.NextColumn();
        }
        ImGui.Columns(1);
        ImGui.Separator();

        ImGui.Text("With border:");
        ImGui.Columns(4, "mycolumns"); // 4-ways, with border
        ImGui.Separator();
        ImGui.Text("ID"); ImGui.NextColumn();
        ImGui.Text("Name"); ImGui.NextColumn();
        ImGui.Text("Path"); ImGui.NextColumn();
        ImGui.Text("Hovered"); ImGui.NextColumn();
        ImGui.Separator();
        const names: string[/*3*/] = [ "One", "Two", "Three" ];
        const paths: string[/*3*/] = [ "/path/one", "/path/two", "/path/three" ];
        /* static */ const selected: Static<number> = STATIC("selected#1709", -1);
        for (let i = 0; i < 3; i++)
        {
            const label: string = format_number_dec(i, 4);
            if (ImGui.Selectable(label, selected.value === i, ImGuiSelectableFlags.SpanAllColumns))
                selected.value = i;
            const hovered: boolean = ImGui.IsItemHovered();
            ImGui.NextColumn();
            ImGui.Text(names[i]); ImGui.NextColumn();
            ImGui.Text(paths[i]); ImGui.NextColumn();
            ImGui.Text(`${hovered}`); ImGui.NextColumn();
        }
        ImGui.Columns(1);
        ImGui.Separator();
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Borders"))
    {
        // NB: Future columns API should allow automatic horizontal borders.
        /* static */ const h_borders: Static<boolean> = STATIC("h_borders", true);
        /* static */ const v_borders: Static<boolean> = STATIC("v_borders", true);
        ImGui.Checkbox("horizontal", (value = h_borders.value) => h_borders.value = value);
        ImGui.SameLine();
        ImGui.Checkbox("vertical", (value = v_borders.value) => v_borders.value = value);
        ImGui.Columns(4, null, v_borders.value);
        for (let i = 0; i < 4 * 3; i++)
        {
            if (h_borders.value && ImGui.GetColumnIndex() === 0)
                ImGui.Separator();
            // ImGui.Text("%c%c%c", 'a'+i, 'a'+i, 'a'+i);
            const c: string = String.fromCharCode("a".charCodeAt(0) + i);
            ImGui.Text(`${c}${c}${c}`);
            ImGui.Text(`Width ${ImGui.GetColumnWidth().toFixed(2)}`);
            ImGui.Text(`Offset ${ImGui.GetColumnOffset().toFixed(2)}`);
            ImGui.Text("Long text that is likely to clip");
            ImGui.Button("Button", new ImVec2(-1.0, 0.0));
            ImGui.NextColumn();
        }
        ImGui.Columns(1);
        if (h_borders.value)
            ImGui.Separator();
        ImGui.TreePop();
    }

    // Create multiple items in a same cell before switching to next column
    if (ImGui.TreeNode("Mixed items"))
    {
        ImGui.Columns(3, "mixed");
        ImGui.Separator();

        ImGui.Text("Hello");
        ImGui.Button("Banana");
        ImGui.NextColumn();

        ImGui.Text("ImGui");
        ImGui.Button("Apple");
        /* static */ const foo: Static<number> = STATIC("foo", 1.0);
        ImGui.InputFloat("red", (value = foo.value) => foo.value = value, 0.05, 0, "%.3f");
        ImGui.Text("An extra line here.");
        ImGui.NextColumn();

        ImGui.Text("Sailor");
        ImGui.Button("Corniflower");
        /* static */ const bar: Static<number> = STATIC("bar", 1.0);
        ImGui.InputFloat("blue", (value = bar.value) => bar.value = value, 0.05, 0, "%.3f");
        ImGui.NextColumn();

        if (ImGui.CollapsingHeader("Category A")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
        if (ImGui.CollapsingHeader("Category B")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
        if (ImGui.CollapsingHeader("Category C")) { ImGui.Text("Blah blah blah"); } ImGui.NextColumn();
        ImGui.Columns(1);
        ImGui.Separator();
        ImGui.TreePop();
    }

    // Word wrapping
    if (ImGui.TreeNode("Word-wrapping"))
    {
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

    if (ImGui.TreeNode("Horizontal Scrolling"))
    {
        ImGui.SetNextWindowContentSize(new ImVec2(1500.0, 0.0));
        ImGui.BeginChild("##ScrollingRegion", new ImVec2(0, ImGui.GetFontSize() * 20), false, ImGuiWindowFlags.HorizontalScrollbar);
        ImGui.Columns(10);
        const ITEMS_COUNT: number = 2000;
        const clipper: ImGuiListClipper = new ImGuiListClipper();  // Also demonstrate using the clipper for large list
        clipper.Begin(ITEMS_COUNT);
        while (clipper.Step())
        {
            for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                for (let j = 0; j < 10; j++)
                {
                    ImGui.Text(`Line ${i} Column ${j}...`);
                    ImGui.NextColumn();
                }
        }
        // clipper.delete(); // NOTE: native emscripten class
        ImGui.Columns(1);
        ImGui.EndChild();
        ImGui.TreePop();
    }

    if (ImGui.TreeNode("Tree"))
    {
        ImGui.Columns(2, "tree", true);
        for (let x = 0; x < 3; x++)
        {
            const open1: boolean = ImGui.TreeNode(x, `Node${x}`);
            ImGui.NextColumn();
            ImGui.Text("Node contents");
            ImGui.NextColumn();
            if (open1)
            {
                for (let y = 0; y < 3; y++)
                {
                    const open2: boolean = ImGui.TreeNode(y, `Node${x}.${y}`);
                    ImGui.NextColumn();
                    ImGui.Text("Node contents");
                    if (open2)
                    {
                        ImGui.Text("Even more contents");
                        if (ImGui.TreeNode("Tree in column"))
                        {
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

// Make the UI compact because there are so many fields
function PushStyleCompact()
{
    const style: ImGuiStyle = ImGui.GetStyle();
    ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(style.FramePadding.x, Math.floor(style.FramePadding.y * 0.60)));
    ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(style.ItemSpacing.x, Math.floor(style.ItemSpacing.y * 0.60)));
}

function PopStyleCompact()
{
    ImGui.PopStyleVar(2);
}

function EditTableSizingFlags(p_flags: Static<ImGui.ImGuiTableFlags>)
{
    interface SizingPolicy
    {
        value: ImGuiTableFlags;
        name: string;
        tooltip: string;
    }
    let policies: SizingPolicy[] =
    [
        { value: ImGuiTableFlags.None,               name: "Default",                            tooltip: "Use default sizing policy:\n- ImGuiTableFlags_SizingFixedFit if ScrollX is on or if host window has ImGuiWindowFlags_AlwaysAutoResize.\n- ImGuiTableFlags_SizingStretchSame otherwise." },
        { value: ImGuiTableFlags.SizingFixedFit,     name: "ImGuiTableFlags_SizingFixedFit",     tooltip: "Columns default to _WidthFixed (if resizable) or _WidthAuto (if not resizable), matching contents width." },
        { value: ImGuiTableFlags.SizingFixedSame,    name: "ImGuiTableFlags_SizingFixedSame",    tooltip: "Columns are all the same width, matching the maximum contents width.\nImplicitly disable ImGuiTableFlags_Resizable and enable ImGuiTableFlags_NoKeepColumnsVisible." },
        { value: ImGuiTableFlags.SizingStretchProp,  name: "ImGuiTableFlags_SizingStretchProp",  tooltip: "Columns default to _WidthStretch with weights proportional to their widths." },
        { value: ImGuiTableFlags.SizingStretchSame,  name: "ImGuiTableFlags_SizingStretchSame",  tooltip: "Columns default to _WidthStretch with same weights." }
    ];
    let idx = 0;
    for (idx = 0; idx < IM_ARRAYSIZE(policies); idx++)
        if (policies[idx].value == (p_flags.value & ImGuiTableFlags.SizingMask_))
            break;
    //const char* preview_text = (idx < IM_ARRAYSIZE(policies)) ? policies[idx].Name + (idx > 0 ? strlen("ImGuiTableFlags") : 0) : "";
    let preview_text = (idx < IM_ARRAYSIZE(policies)) ? policies[idx].name.substr(idx > 0 ? "ImGuiTableFlags".length : 0) : "";
    if (ImGui.BeginCombo("Sizing Policy", preview_text))
    {
        for (let n = 0; n < IM_ARRAYSIZE(policies); n++)
            if (ImGui.Selectable(policies[n].name, idx == n))
                p_flags.value = (p_flags.value & ~ImGuiTableFlags.SizingMask_) | policies[n].value;
        ImGui.EndCombo();
    }
    ImGui.SameLine();
    ImGui.TextDisabled("(?)");
    if (ImGui.IsItemHovered())
    {
        ImGui.BeginTooltip();
        ImGui.PushTextWrapPos(ImGui.GetFontSize() * 50.0);
        for (let m = 0; m < IM_ARRAYSIZE(policies); m++)
        {
            ImGui.Separator();
            ImGui.Text(`${policies[m].name}):`);
            ImGui.Separator();
            ImGui.SetCursorPosX(ImGui.GetCursorPosX() + ImGui.GetStyle().IndentSpacing * 0.5);
            ImGui.TextUnformatted(policies[m].tooltip);
        }
        ImGui.PopTextWrapPos();
        ImGui.EndTooltip();
    }
}

function EditTableColumnsFlags(p_flags: Static<ImGui.ImGuiTableColumnFlags>)
{
    ImGui.CheckboxFlags("_DefaultHide", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.DefaultHide);
    ImGui.CheckboxFlags("_DefaultSort", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.DefaultSort);
    if (ImGui.CheckboxFlags("_WidthStretch", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.WidthStretch))
        p_flags.value &= ~(ImGuiTableColumnFlags.WidthMask_ ^ ImGuiTableColumnFlags.WidthStretch);
    if (ImGui.CheckboxFlags("_WidthFixed", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.WidthFixed))
        p_flags.value &= ~(ImGuiTableColumnFlags.WidthMask_ ^ ImGuiTableColumnFlags.WidthFixed);
    ImGui.CheckboxFlags("_NoResize", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoResize);
    ImGui.CheckboxFlags("_NoReorder", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoReorder);
    ImGui.CheckboxFlags("_NoHide", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoHide);
    ImGui.CheckboxFlags("_NoClip", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoClip);
    ImGui.CheckboxFlags("_NoSort", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoSort);
    ImGui.CheckboxFlags("_NoSortAscending", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoSortAscending);
    ImGui.CheckboxFlags("_NoSortDescending", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoSortDescending);
    ImGui.CheckboxFlags("_NoHeaderWidth", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.NoHeaderWidth);
    ImGui.CheckboxFlags("_PreferSortAscending", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.PreferSortAscending);
    ImGui.CheckboxFlags("_PreferSortDescending", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.PreferSortDescending);
    ImGui.CheckboxFlags("_IndentEnable", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.IndentEnable); ImGui.SameLine(); HelpMarker("Default for column 0");
    ImGui.CheckboxFlags("_IndentDisable", (value = p_flags.value) => p_flags.value = value, ImGuiTableColumnFlags.IndentDisable); ImGui.SameLine(); HelpMarker("Default for column >0");
}

function ShowTableColumnsStatusFlags(flags: ImGuiTableColumnFlags)
{
    const flags_s: ImScalar<ImGuiTableColumnFlags> = [ flags ];
    ImGui.CheckboxFlags("_IsEnabled", flags_s, ImGuiTableColumnFlags.IsEnabled);
    ImGui.CheckboxFlags("_IsVisible", flags_s, ImGuiTableColumnFlags.IsVisible);
    ImGui.CheckboxFlags("_IsSorted", flags_s, ImGuiTableColumnFlags.IsSorted);
    ImGui.CheckboxFlags("_IsHovered", flags_s, ImGuiTableColumnFlags.IsHovered);
}


function ShowDemoWindowTables()
{
    if (!ImGui.CollapsingHeader("Tables & Columns"))
        return;

    const TEXT_BASE_WIDTH: number = ImGui.CalcTextSize("A").x;
    const TEXT_BASE_HEIGHT: number = ImGui.GetTextLineHeightWithSpacing();

    ImGui.PushID("Tables");

    let open_action = -1;
    if (ImGui.Button("Open all"))
        open_action = 1;
    ImGui.SameLine();
    if (ImGui.Button("Close all"))
        open_action = 0;
    ImGui.SameLine();

    /* static */ const disable_indent: Static<boolean> = STATIC("disable_indent", false);
    ImGui.Checkbox("Disable tree indentation", (value = disable_indent.value) => disable_indent.value = value);
    ImGui.SameLine();
    HelpMarker("Disable the indenting of tree nodes so demo tables can use the full window width.");
    ImGui.Separator();
    if (disable_indent.value)
        ImGui.PushStyleVar(ImGuiStyleVar.IndentSpacing, 0.0);

    // Demos
    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Basic"))
    {
        // Here we will showcase three different ways to output a table.
        // They are very simple variations of a same thing!

        // [Method 1] Using TableNextRow() to create a new row, and TableSetColumnIndex() to select the column.
        // In many situations, this is the most flexible and easy to use pattern.
        HelpMarker("Using TableNextRow() + calling TableSetColumnIndex() _before_ each cell, in a loop.");
        if (ImGui.BeginTable("table1", 3))
        {
            for (let row = 0; row < 4; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Row ${row} Column ${column}`);
                }
            }
            ImGui.EndTable();
        }

        // [Method 2] Using TableNextColumn() called multiple times, instead of using a for loop + TableSetColumnIndex().
        // This is generally more convenient when you have code manually submitting the contents of each columns.
        HelpMarker("Using TableNextRow() + calling TableNextColumn() _before_ each cell, manually.");
        if (ImGui.BeginTable("table2", 3))
        {
            for (let row = 0; row < 4; row++)
            {
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
        HelpMarker(
            `Only using TableNextColumn(), which tends to be convenient for tables where every cells contains the same type of contents.
This is also more similar to the old NextColumn() function of the Columns API, and provided to facilitate the Columns->Tables API transition.`);
        if (ImGui.BeginTable("table3", 3))
        {
            for (let item = 0; item < 14; item++)
            {
                ImGui.TableNextColumn();
                ImGui.Text(`Item ${item}`);
            }
            ImGui.EndTable();
        }

        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Borders, background"))
    {
        // Expose a few Borders related flags interactively
        enum ContentsType { CT_Text, CT_FillButton };

        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables2", ImGuiTableFlags.Borders | ImGuiTableFlags.RowBg);
        /* static */ const display_headers: Static<boolean> = STATIC("display_headers", false);
        /* static */ const contents_type: Static<number> = STATIC("contents_type", ContentsType.CT_Text);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags.RowBg", (value = flags.value) => flags.value = value, ImGuiTableFlags.RowBg);
        ImGui.CheckboxFlags("ImGuiTableFlags.Borders", (value = flags.value) => flags.value = value, ImGuiTableFlags.Borders);
        ImGui.SameLine(); HelpMarker("ImGuiTableFlags.Borders\n = ImGuiTableFlags.BordersInnerV\n | ImGuiTableFlags.BordersOuterV\n | ImGuiTableFlags.BordersInnerV\n | ImGuiTableFlags.BordersOuterH");
        ImGui.Indent();

        ImGui.CheckboxFlags("ImGuiTableFlags.BordersH", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersH);
        ImGui.Indent();
        ImGui.CheckboxFlags("ImGuiTableFlags.BordersOuterH", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersOuterH);
        ImGui.CheckboxFlags("ImGuiTableFlags.BordersInnerH", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersInnerH);
        ImGui.Unindent();

        ImGui.CheckboxFlags("ImGuiTableFlags.BordersV", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersV);
        ImGui.Indent();
        ImGui.CheckboxFlags("ImGuiTableFlags.BordersOuterV", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersOuterV);
        ImGui.CheckboxFlags("ImGuiTableFlags.BordersInnerV", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersInnerV);
        ImGui.Unindent();

        ImGui.CheckboxFlags("ImGuiTableFlags.BordersOuter", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersOuter);
        ImGui.CheckboxFlags("ImGuiTableFlags.BordersInner", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersInner);
        ImGui.Unindent();

        ImGui.AlignTextToFramePadding(); ImGui.Text("Cell contents:");
        ImGui.SameLine(); ImGui.RadioButton("Text", (value = contents_type.value) => contents_type.value = value, ContentsType.CT_Text);
        ImGui.SameLine(); ImGui.RadioButton("FillButton", (value = contents_type.value) => contents_type.value = value, ContentsType.CT_FillButton);
        ImGui.Checkbox("Display headers", (value = display_headers.value) => display_headers.value = value);
        ImGui.CheckboxFlags("ImGuiTableFlags.NoBordersInBody", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoBordersInBody); ImGui.SameLine(); HelpMarker("Disable vertical borders in columns Body (borders will always appears in Headers");
        PopStyleCompact();

        if (ImGui.BeginTable("table1", 3, flags.value))
        {
            // Display headers so we can inspect their interaction with borders.
            // (Headers are not the main purpose of this section of the demo, so we are not elaborating on them too much. See other sections for details)
            if (display_headers.value)
            {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableHeadersRow();
            }

            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    if (contents_type.value == ContentsType.CT_Text)
                        ImGui.TextUnformatted(`Hello ${column},${row}`);
                    else if (contents_type)
                        ImGui.Button(`Hello ${column},${row}`, new ImVec2(-1.0, 0.0));
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Resizable, stretch"))
    {
        // By default, if we don't enable ScrollX the sizing policy for each columns is "Stretch"
        // Each columns maintain a sizing weight, and they will occupy all available width.
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables3", ImGuiTableFlags.SizingStretchSame | ImGuiTableFlags.Resizable | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV | ImGuiTableFlags.ContextMenuInBody);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersV", (value = flags.value) => flags.value = value, ImGuiTableFlags.BordersV);
        ImGui.SameLine(); HelpMarker("Using the _Resizable flag automatically enables the _BordersInnerV flag as well, this is why the resize borders are still showing when unchecking this.");
        PopStyleCompact();

        if (ImGui.BeginTable("table1", 3, flags.value))
        {
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Hello ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Resizable, fixed"))
    {
        // Here we use ImGuiTableFlags_SizingFixedFit (even though _ScrollX is not set)
        // So columns will adopt the "Fixed" policy and will maintain a fixed width regardless of the whole available width (unless table is small)
        // If there is not enough available width to fit all columns, they will however be resized down.
        // FIXME-TABLE: Providing a stretch-on-init would make sense especially for tables which don't have saved settings
        HelpMarker(`Using _Resizable + _SizingFixedFit flags.
Fixed-width columns generally makes more sense if you want to use horizontal scrolling.

Double-click a column border to auto-fit the column to its contents.`);
        PushStyleCompact();
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables4", ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.Resizable | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV | ImGuiTableFlags.ContextMenuInBody);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoHostExtendX", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoHostExtendX);
        PopStyleCompact();

        if (ImGui.BeginTable("table1", 3, flags.value))
        {
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Hello ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Resizable, mixed"))
    {
        HelpMarker(`Using TableSetupColumn() to alter resizing policy on a per-column basis.

When combining Fixed and Stretch columns, generally you only want one, maybe two trailing columns to use _WidthStretch.`);
        const flags : ImGuiTableFlags = ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.RowBg | ImGuiTableFlags.Borders | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable;

        if (ImGui.BeginTable("table1", 3, flags))
        {
            ImGui.TableSetupColumn("AAA", ImGuiTableColumnFlags.WidthFixed);
            ImGui.TableSetupColumn("BBB", ImGuiTableColumnFlags.WidthFixed);
            ImGui.TableSetupColumn("CCC", ImGuiTableColumnFlags.WidthStretch);
            ImGui.TableHeadersRow();
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`${column >= 3 ? "Stretch" : "Fixed"} ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        if (ImGui.BeginTable("table2", 6, flags))
        {
            ImGui.TableSetupColumn("AAA", ImGuiTableColumnFlags.WidthFixed);
            ImGui.TableSetupColumn("BBB", ImGuiTableColumnFlags.WidthFixed);
            ImGui.TableSetupColumn("CCC", ImGuiTableColumnFlags.WidthFixed | ImGuiTableColumnFlags.DefaultHide);
            ImGui.TableSetupColumn("DDD", ImGuiTableColumnFlags.WidthStretch);
            ImGui.TableSetupColumn("EEE", ImGuiTableColumnFlags.WidthStretch);
            ImGui.TableSetupColumn("FFF", ImGuiTableColumnFlags.WidthStretch | ImGuiTableColumnFlags.DefaultHide);
            ImGui.TableHeadersRow();
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 6; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`${column >= 3 ? "Stretch" : "Fixed"} ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Reorderable, hideable, with headers"))
    {
        HelpMarker(`Click and drag column headers to reorder columns.

Right-click on a header to open a context menu.`);
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-reorderable", ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_Reorderable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Reorderable);
        ImGui.CheckboxFlags("ImGuiTableFlags_Hideable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Hideable);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoBordersInBody", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoBordersInBody);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoBordersInBodyUntilResize", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoBordersInBodyUntilResize); ImGui.SameLine(); HelpMarker("Disable vertical borders in columns Body until hovered for resize (borders will always appears in Headers)");
        PopStyleCompact();

        if (ImGui.BeginTable("table1", 3, flags.value))
        {
            // Submit columns name with TableSetupColumn() and call TableHeadersRow() to create a row with a header in each column.
            // (Later we will show how TableSetupColumn() has other uses, optional flags, sizing weight etc.)
            ImGui.TableSetupColumn("One");
            ImGui.TableSetupColumn("Two");
            ImGui.TableSetupColumn("Three");
            ImGui.TableHeadersRow();
            for (let row = 0; row < 6; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Hello ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }

        // Use outer_size.x == 0.0f instead of default to make the table as tight as possible (only valid when no scrolling and no stretch column)
        if (ImGui.BeginTable("table2", 3, flags.value | ImGuiTableFlags.SizingFixedFit, new ImVec2(0.0, 0.0)))
        {
            ImGui.TableSetupColumn("One");
            ImGui.TableSetupColumn("Two");
            ImGui.TableSetupColumn("Three");
            ImGui.TableHeadersRow();
            for (let row = 0; row < 6; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Fixed ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Padding"))
    {
        // First example: showcase use of padding flags and effect of BorderOuterV/BorderInnerV on X padding.
        // We don't expose BorderOuterH/BorderInnerH here because they have no effect on X padding.
        HelpMarker(`We often want outer padding activated when any using features which makes the edges of a column visible:

e.g.:
- BorderOuterV
- any form of row selection
Because of this, activating BorderOuterV sets the default to PadOuterX. Using PadOuterX or NoPadOuterX you can override the default.
Actual padding values are using style.CellPadding.

In this demo we don't show horizontal borders to emphasis how they don't affect default horizontal padding.`);

        /* static */ const flags1: Static<ImGui.ImGuiTableFlags> = STATIC("flags1#tables-padding", ImGuiTableFlags.BordersV);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_PadOuterX", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.PadOuterX);
        ImGui.SameLine(); HelpMarker("Enable outer-most padding (default if ImGuiTableFlags_BordersOuterV is set)");
        ImGui.CheckboxFlags("ImGuiTableFlags_NoPadOuterX", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.NoPadOuterX);
        ImGui.SameLine(); HelpMarker("Disable outer-most padding (default if ImGuiTableFlags_BordersOuterV is not set)");
        ImGui.CheckboxFlags("ImGuiTableFlags_NoPadInnerX", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.NoPadInnerX);
        ImGui.SameLine(); HelpMarker("Disable inner padding between columns (double inner padding if BordersOuterV is on, single inner padding if BordersOuterV is off)");
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersOuterV", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.BordersOuterV);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersInnerV", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.BordersInnerV);
        /* static */ const show_headers: Static<boolean> = STATIC("show_headers#tables-padding", false);
        ImGui.Checkbox("show_headers", (value = show_headers.value) => show_headers.value = value);
        PopStyleCompact();

        if (ImGui.BeginTable("table_padding", 3, flags1.value))
        {
            if (show_headers.value)
            {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableHeadersRow();
            }

            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    if (row == 0)
                    {
                        ImGui.Text(`Avail ${ImGui.GetContentRegionAvail().x.toFixed(2)}`);
                    }
                    else
                    {
                        ImGui.Button(`Hello ${column},${row}`, new ImVec2(-1.0, 0.0));
                    }
                    //if (ImGui.TableGetColumnFlags() & ImGuiTableColumnFlags_IsHovered)
                    //    ImGui.TableSetBgColor(ImGuiTableBgTarget_CellBg, IM_COL32(0, 100, 0, 255));
                }
            }
            ImGui.EndTable();
        }

        // Second example: set style.CellPadding to (0.0) or a custom value.
        // FIXME-TABLE: Vertical border effectively not displayed the same way as horizontal one...
        HelpMarker("Setting style.CellPadding to (0,0) or a custom value.");
        /* static */ const flags2: Static<ImGui.ImGuiTableFlags> = STATIC("flags2#tables-padding", ImGuiTableFlags.Borders | ImGuiTableFlags.RowBg);
        /* static */ const cell_padding: Static<ImVec2> = STATIC("cell_padding#tables-padding", new ImVec2(0.0, 0.0));
        /* static */ const show_widget_frame_bg: Static<boolean> = STATIC("const show_widget_frame_bg#tables-padding", true);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Borders", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.Borders);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersH", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersH);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersV", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersV);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersInner", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersInner);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersOuter", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersOuter);
        ImGui.CheckboxFlags("ImGuiTableFlags_RowBg", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.RowBg);
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.Resizable);
        ImGui.Checkbox("show_widget_frame_bg", (value = show_widget_frame_bg.value) => show_widget_frame_bg.value = value);
        ImGui.SliderFloat2("CellPadding", cell_padding.value, 0.0, 10.0, "%.0f");
        PopStyleCompact();

        ImGui.PushStyleVar(ImGuiStyleVar.CellPadding, cell_padding.value);
        if (ImGui.BeginTable("table_padding_2", 3, flags2.value))
        {
            //static bool init = true;
            if (!show_widget_frame_bg.value)
                ImGui.PushStyleColor(ImGuiCol.FrameBg, 0);
            for (let cell = 0; cell < 3 * 5; cell++)
            {
                ImGui.TableNextColumn();
                ImGui.SetNextItemWidth(-1.0);
                ImGui.PushID(cell);

                /* static */ const str0: Static<ImStringBuffer> = STATIC(`str0#${cell}`, new ImStringBuffer(16, "edit me"));
                ImGui.InputText("##cell", str0.value, IM_ARRAYSIZE(str0.value));
                ImGui.PopID();
            }
            if (!show_widget_frame_bg.value)
                ImGui.PopStyleColor();
            //init = false;
            ImGui.EndTable();
        }
        ImGui.PopStyleVar();

        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Sizing policies"))
    {
        /* static */ const flags1: Static<ImGui.ImGuiTableFlags> = STATIC("flags1#tables-sizing-policies", ImGuiTableFlags.BordersV | ImGuiTableFlags.BordersOuterH | ImGuiTableFlags.RowBg | ImGuiTableFlags.ContextMenuInBody);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoHostExtendX", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.NoHostExtendX);
        PopStyleCompact();

        let sizing_policy_flags: ImGuiTableFlags[] = [ ImGuiTableFlags.SizingFixedFit, ImGuiTableFlags.SizingFixedSame, ImGuiTableFlags.SizingStretchProp, ImGuiTableFlags.SizingStretchSame ];
        for (let table_n = 0; table_n < 4; table_n++)
        {
            /* static */ const sizing_policy_flag: Static<ImGui.ImGuiTableFlags> = STATIC(`sizing_policy_flag#tables-sizing-policies${table_n}`, sizing_policy_flags[table_n]);
            ImGui.PushID(table_n);
            ImGui.SetNextItemWidth(TEXT_BASE_WIDTH * 30);
            EditTableSizingFlags(sizing_policy_flag);

            // To make it easier to understand the different sizing policy,
            // For each policy: we display one table where the columns have equal contents width, and one where the columns have different contents width.
            if (ImGui.BeginTable("table1", 3, sizing_policy_flag.value | flags1.value))
            {
                for (let row = 0; row < 3; row++)
                {
                    ImGui.TableNextRow();
                    ImGui.TableNextColumn(); ImGui.Text("Oh dear");
                    ImGui.TableNextColumn(); ImGui.Text("Oh dear");
                    ImGui.TableNextColumn(); ImGui.Text("Oh dear");
                }
                ImGui.EndTable();
            }
            if (ImGui.BeginTable("table2", 3, sizing_policy_flags[table_n] | flags1.value))
            {
                for (let row = 0; row < 3; row++)
                {
                    ImGui.TableNextRow();
                    ImGui.TableNextColumn(); ImGui.Text("AAAA");
                    ImGui.TableNextColumn(); ImGui.Text("BBBBBBBB");
                    ImGui.TableNextColumn(); ImGui.Text("CCCCCCCCCCCC");
                }
                ImGui.EndTable();
            }
            ImGui.PopID();
        }

        ImGui.Spacing();
        ImGui.TextUnformatted("Advanced");
        ImGui.SameLine();
        HelpMarker("This section allows you to interact and see the effect of various sizing policies depending on whether Scroll is enabled and the contents of your columns.");

        enum ContentsType { CT_ShowWidth, CT_ShortText, CT_LongText, CT_Button, CT_FillButton, CT_InputText };
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-sizing-policies", ImGuiTableFlags.ScrollY | ImGuiTableFlags.Borders | ImGuiTableFlags.RowBg | ImGuiTableFlags.Resizable);
        /* static */ const contents_type: Static<number> = STATIC("contents_type#tables-sizing-policies", ContentsType.CT_ShowWidth);
        /* static */ const column_count: Static<number> = STATIC("column_count#tables-sizing-policies", 3);

        PushStyleCompact();
        ImGui.PushID("Advanced");
        ImGui.PushItemWidth(TEXT_BASE_WIDTH * 30);
        EditTableSizingFlags(flags);
        ImGui.Combo("Contents", (value = contents_type.value) => contents_type.value = value, "Show width\0Short Text\0Long Text\0Button\0Fill Button\0InputText\0");
        if (contents_type.value == ContentsType.CT_FillButton)
        {
            ImGui.SameLine();
            HelpMarker("Be mindful that using right-alignment (e.g. size.x = -FLT_MIN) creates a feedback loop where contents width can feed into auto-column width can feed into contents width.");
        }
        ImGui.DragInt("Columns", (value = column_count.value) => column_count.value = value, 0.1, 1, 64, "%d");
        //ImGui.DragInt("Columns", (value = column_count.value) => column_count.value = value, 0.1, 1, 64, "%d", ImGuiSliderFlags.AlwaysClamp);
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_PreciseWidths", (value = flags.value) => flags.value = value, ImGuiTableFlags.PreciseWidths);
        ImGui.SameLine(); HelpMarker("Disable distributing remainder width to stretched columns (width allocation on a 100-wide table with 3 columns: Without this flag: 33,33,34. With this flag: 33,33,33). With larger number of columns, resizing will appear to be less smooth.");
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollX", (value = flags.value) => flags.value = value, ImGuiTableFlags.ScrollX);
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollY", (value = flags.value) => flags.value = value, ImGuiTableFlags.ScrollY);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoClip", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoClip);
        ImGui.PopItemWidth();
        ImGui.PopID();
        PopStyleCompact();

        if (ImGui.BeginTable("table2", column_count.value, flags.value, new ImVec2(0.0, TEXT_BASE_HEIGHT * 7)))
        {
            for (let cell = 0; cell < 10 * column_count.value; cell++)
            {
                ImGui.TableNextColumn();
                let column = ImGui.TableGetColumnIndex();
                let row = ImGui.TableGetRowIndex();

                ImGui.PushID(cell);
                let label = `Hello ${column},${row}`
                /* static */ const text_buf: Static<ImStringBuffer> = STATIC(`text_buf#sizing_${cell}`, new ImStringBuffer(32, ""));
                switch (contents_type.value)
                {
                case ContentsType.CT_ShortText:  ImGui.TextUnformatted(label); break;
                case ContentsType.CT_LongText:   ImGui.Text(`Some ${column == 0 ? "long" : "longeeer"} ${column},${row}\nOver two lines...`); break;
                case ContentsType.CT_ShowWidth:  ImGui.Text(`W: ${ImGui.GetContentRegionAvail().x.toFixed(1)}`); break;
                case ContentsType.CT_Button:     ImGui.Button(label); break;
                case ContentsType.CT_FillButton: ImGui.Button(label, new ImVec2(-1.0, 0.0)); break;
                case ContentsType.CT_InputText:  ImGui.SetNextItemWidth(-1.0); ImGui.InputText("##", text_buf.value, IM_ARRAYSIZE(text_buf.value)); break;
                }
                ImGui.PopID();
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Vertical scrolling, with clipping"))
    {
        HelpMarker("Here we activate ScrollY, which will create a child window container to allow hosting scrollable contents.\n\nWe also demonstrate using ImGuiListClipper to virtualize the submission of many items.");
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-vertical-scrolling", ImGuiTableFlags.ScrollY | ImGuiTableFlags.RowBg | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollY", (value = flags.value) => flags.value = value, ImGuiTableFlags.ScrollY);
        PopStyleCompact();

        // When using ScrollX or ScrollY we need to specify a size for our table container!
        // Otherwise by default the table will fit all available space, like a BeginChild() call.
        let outer_size = new ImVec2(0.0, TEXT_BASE_HEIGHT * 8);
        if (ImGui.BeginTable("table_scrolly", 3, flags.value, outer_size))
        {
            ImGui.TableSetupScrollFreeze(0, 1); // Make top row always visible
            ImGui.TableSetupColumn("One", ImGuiTableColumnFlags.None);
            ImGui.TableSetupColumn("Two", ImGuiTableColumnFlags.None);
            ImGui.TableSetupColumn("Three", ImGuiTableColumnFlags.None);
            ImGui.TableHeadersRow();

            // Demonstrate using clipper for large vertical lists
            let clipper = new ImGuiListClipper();
            clipper.Begin(1000);
            while (clipper.Step())
            {
                for (let row = clipper.DisplayStart; row < clipper.DisplayEnd; row++)
                {
                    ImGui.TableNextRow();
                    for (let column = 0; column < 3; column++)
                    {
                        ImGui.TableSetColumnIndex(column);
                        ImGui.Text(`Hello ${row},${column}`);
                    }
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Horizontal scrolling"))
    {
        HelpMarker(`When ScrollX is enabled, the default sizing policy becomes ImGuiTableFlags_SizingFixedFit, 
as automatically stretching columns doesn't make much sense with horizontal scrolling.

Also note that as of the current version, you will almost always want to enable ScrollY along with ScrollX,
"because the container window won't automatically extend vertically to fix contents (this may be improved in future versions)."`);
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-horizontal-scrolling", ImGuiTableFlags.ScrollX | ImGuiTableFlags.ScrollY | ImGuiTableFlags.RowBg | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable);
        /* static */ const freeze_cols: Static<number> = STATIC("freeze_cols#tables-horizontal-scrolling", 1);
        /* static */ const freeze_rows: Static<number> = STATIC("freeze_rows#tables-horizontal-scrolling", 1);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags.value) => flags.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollX", (value = flags.value) => flags.value = value, ImGuiTableFlags.ScrollX);
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollY", (value = flags.value) => flags.value = value, ImGuiTableFlags.ScrollY);
        ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
        // TODO: support slider flags argument?
        // ImGui.DragInt("freeze_cols", (value = freeze_cols.value) => freeze_cols.value = value, 0.2, 0, 9, null, ImGuiSliderFlags.NoInput);
        ImGui.DragInt("freeze_cols", (value = freeze_cols.value) => freeze_cols.value = value, 0.2, 0, 9);
        ImGui.SetNextItemWidth(ImGui.GetFrameHeight());
        // TODO: support slider flags argument?
        // ImGui.DragInt("freeze_rows", (value = freeze_rows.value) => freeze_rows.value = value, 0.2, 0, 9, null, ImGuiSliderFlags.NoInput);
        ImGui.DragInt("freeze_rows", (value = freeze_rows.value) => freeze_rows.value = value, 0.2, 0, 9);
        PopStyleCompact();

        // When using ScrollX or ScrollY we need to specify a size for our table container!
        // Otherwise by default the table will fit all available space, like a BeginChild() call.
        let outer_size = new ImVec2(0.0, TEXT_BASE_HEIGHT * 8);
        if (ImGui.BeginTable("table_scrollx", 7, flags.value, outer_size))
        {
            ImGui.TableSetupScrollFreeze(freeze_cols.value, freeze_rows.value);
            ImGui.TableSetupColumn("Line #", ImGuiTableColumnFlags.NoHide); // Make the first column not hideable to match our use of TableSetupScrollFreeze()
            ImGui.TableSetupColumn("One");
            ImGui.TableSetupColumn("Two");
            ImGui.TableSetupColumn("Three");
            ImGui.TableSetupColumn("Four");
            ImGui.TableSetupColumn("Five");
            ImGui.TableSetupColumn("Six");
            ImGui.TableHeadersRow();
            for (let row = 0; row < 20; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 7; column++)
                {
                    // Both TableNextColumn() and TableSetColumnIndex() return true when a column is visible or performing width measurement.
                    // Because here we know that:
                    // - A) all our columns are contributing the same to row height
                    // - B) column 0 is always visible,
                    // We only always submit this one column and can skip others.
                    // More advanced per-column clipping behaviors may benefit from polling the status flags via TableGetColumnFlags().
                    if (!ImGui.TableSetColumnIndex(column) && column > 0)
                        continue;
                    if (column == 0)
                        ImGui.Text(`Line ${row}`);
                    else
                        ImGui.Text(`Hello world ${row},${column}`);
                }
            }
            ImGui.EndTable();
        }

        ImGui.Spacing();
        ImGui.TextUnformatted("Stretch + ScrollX");
        ImGui.SameLine();
        HelpMarker(`"Showcase using Stretch columns + ScrollX together: "
this is rather unusual and only makes sense when specifying an 'inner_width' for the table!
Without an explicit value, inner_width is == outer_size.x and therefore using Stretch columns + ScrollX together doesn't make sense.`);
        /* static */ const flags2: Static<ImGui.ImGuiTableFlags> = STATIC("flags2#tables-horizontal-scrolling", ImGuiTableFlags.SizingStretchSame | ImGuiTableFlags.ScrollX | ImGuiTableFlags.ScrollY | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.RowBg | ImGuiTableFlags.ContextMenuInBody);
        /* static */ const inner_width: Static<number> = STATIC("inner_width#tables-horizontal-scrolling", 1000.0);
        PushStyleCompact();
        ImGui.PushID("flags3");
        ImGui.PushItemWidth(TEXT_BASE_WIDTH * 30);
        ImGui.CheckboxFlags("ImGuiTableFlags_ScrollX", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.ScrollX);
        ImGui.DragFloat("inner_width", (value = inner_width.value) => inner_width.value = value, 1.0, 0.0, 1000000, "%.1f");
        ImGui.PopItemWidth();
        ImGui.PopID();
        PopStyleCompact();
        if (ImGui.BeginTable("table2", 7, flags2.value, outer_size, inner_width.value))
        {
            for (let cell = 0; cell < 20 * 7; cell++)
            {
                ImGui.TableNextColumn();
                ImGui.Text(`Hello world ${ImGui.TableGetColumnIndex()},${ImGui.TableGetRowIndex()}`);
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Columns flags"))
    {
        // Create a first table just to show all the options/flags we want to make visible in our example!
        let column_count = 3;
        let column_names = [ "One", "Two", "Three" ];
        //static ImGuiTableColumnFlags column_flags[column_count] = {};
        let column_flags: Static<ImGuiTableColumnFlags>[] = [
            ImGuiTableColumnFlags.DefaultSort, ImGuiTableColumnFlags.None, ImGuiTableColumnFlags.DefaultHide
        ].map((flag, i) => STATIC(`column_flags${i}#tables-column-flags`, flag));
        let column_flags_out: Static<ImGuiTableColumnFlags>[] = [
            0, 0, 0
        ].map((flag, i) => STATIC(`column_flags_out${i}#tables-column-flags`, flag)); // Output from TableGetColumnFlags()

        if (ImGui.BeginTable("table_columns_flags_checkboxes", column_count, ImGuiTableFlags.None))
        {
            PushStyleCompact();
            for (let column = 0; column < column_count; column++)
            {
                ImGui.TableNextColumn();
                ImGui.PushID(column);
                ImGui.AlignTextToFramePadding(); // FIXME-TABLE: Workaround for wrong text baseline propagation
                ImGui.Text(`'${column_names[column]}'`);
                ImGui.Spacing();
                ImGui.Text("Input flags:");
                EditTableColumnsFlags(column_flags[column]);
                ImGui.Spacing();
                ImGui.Text("Output flags:");
                ShowTableColumnsStatusFlags(column_flags_out[column].value);
                ImGui.PopID();
            }
            PopStyleCompact();
            ImGui.EndTable();
        }

        // Create the real table we care about for the example!
        // We use a scrolling table to be able to showcase the difference between the _IsEnabled and _IsVisible flags above, otherwise in
        // a non-scrolling table columns are always visible (unless using ImGuiTableFlags_NoKeepColumnsVisible + resizing the parent window down)
        let flags = ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.ScrollX | ImGuiTableFlags.ScrollY
            | ImGuiTableFlags.RowBg | ImGuiTableFlags.BordersOuter | ImGuiTableFlags.BordersV
            | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable | ImGuiTableFlags.Sortable;
        let outer_size = new ImVec2(0.0, TEXT_BASE_HEIGHT * 9);
        if (ImGui.BeginTable("table_columns_flags", column_count, flags, outer_size))
        {
            for (let column = 0; column < column_count; column++)
                ImGui.TableSetupColumn(column_names[column], column_flags[column].value);
            ImGui.TableHeadersRow();
            for (let column = 0; column < column_count; column++)
                column_flags_out[column].value = ImGui.TableGetColumnFlags(column);
            let indent_step = Math.floor(TEXT_BASE_WIDTH / 2);
            for (let row = 0; row < 8; row++)
            {
                ImGui.Indent(indent_step); // Add some indentation to demonstrate usage of per-column IndentEnable/IndentDisable flags.
                ImGui.TableNextRow();
                for (let column = 0; column < column_count; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`${(column == 0) ? "Indented" : "Hello"} ${ImGui.TableGetColumnName(column)}`);
                }
            }
            ImGui.Unindent(indent_step * 8.0);

            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Columns widths"))
    {
        function leftPad(str: string, len: number, ch=' '): string {
            len = len - str.length + 1;
            return len > 0 ? new Array(len).join(ch) + str : str;
        }

        HelpMarker("Using TableSetupColumn() to setup default width.");

        /* static */ const flags1: Static<ImGui.ImGuiTableFlags> = STATIC("flags1#tables-columns-widths", ImGuiTableFlags.Borders | ImGuiTableFlags.NoBordersInBodyUntilResize);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Resizable", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.Resizable);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoBordersInBodyUntilResize", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.NoBordersInBodyUntilResize);
        PopStyleCompact();
        if (ImGui.BeginTable("table1", 3, flags1.value))
        {
            // We could also set ImGuiTableFlags_SizingFixedFit on the table and all columns will default to ImGuiTableColumnFlags_WidthFixed.
            ImGui.TableSetupColumn("one", ImGuiTableColumnFlags.WidthFixed, 100.0); // Default to 100.0
            ImGui.TableSetupColumn("two", ImGuiTableColumnFlags.WidthFixed, 200.0); // Default to 200.0
            ImGui.TableSetupColumn("three", ImGuiTableColumnFlags.WidthFixed);      // Default to auto
            ImGui.TableHeadersRow();
            for (let row = 0; row < 4; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    if (row == 0)
                        ImGui.Text(`(w: ${leftPad(ImGui.GetContentRegionAvail().x.toFixed(1), 5)})`);
                    else
                        ImGui.Text(`Hello ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }

        HelpMarker("Using TableSetupColumn() to setup explicit width.\n\nUnless _NoKeepColumnsVisible is set, fixed columns with set width may still be shrunk down if there's not enough space in the host.");

        /* static */ const flags2: Static<ImGui.ImGuiTableFlags> = STATIC("flags2#tables-columns-widths", ImGuiTableFlags.None);
        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_NoKeepColumnsVisible", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.NoKeepColumnsVisible);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersInnerV", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersInnerV);
        ImGui.CheckboxFlags("ImGuiTableFlags_BordersOuterV", (value = flags2.value) => flags2.value = value, ImGuiTableFlags.BordersOuterV);
        PopStyleCompact();
        if (ImGui.BeginTable("table2", 4, flags2.value))
        {
            // We could also set ImGuiTableFlags_SizingFixedFit on the table and all columns will default to ImGuiTableColumnFlags_WidthFixed.
            ImGui.TableSetupColumn("", ImGuiTableColumnFlags.WidthFixed, 100.0);
            ImGui.TableSetupColumn("", ImGuiTableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 15.0);
            ImGui.TableSetupColumn("", ImGuiTableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 30.0);
            ImGui.TableSetupColumn("", ImGuiTableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 15.0);
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 4; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    if (row == 0)
                        ImGui.Text(`(w: ${leftPad(ImGui.GetContentRegionAvail().x.toFixed(1), 5)})`);
                    else
                        ImGui.Text(`Hello ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Nested tables"))
    {
        HelpMarker("This demonstrate embedding a table into another table cell.");

        if (ImGui.BeginTable("table.nested1", 2, ImGuiTableFlags.Borders | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable))
        {
            ImGui.TableSetupColumn("A0");
            ImGui.TableSetupColumn("A1");
            ImGui.TableHeadersRow();

            ImGui.TableNextColumn();
            ImGui.Text("A0 Cell 0");
            {
                let rows_height = TEXT_BASE_HEIGHT * 2;
                if (ImGui.BeginTable("table.nested2", 2, ImGuiTableFlags.Borders | ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable))
                {
                    ImGui.TableSetupColumn("B0");
                    ImGui.TableSetupColumn("B1");
                    ImGui.TableHeadersRow();

                    ImGui.TableNextRow(ImGuiTableRowFlags.None, rows_height);
                    ImGui.TableNextColumn();
                    ImGui.Text("B0 Cell 0");
                    ImGui.TableNextColumn();
                    ImGui.Text("B0 Cell 1");
                    ImGui.TableNextRow(ImGuiTableRowFlags.None, rows_height);
                    ImGui.TableNextColumn();
                    ImGui.Text("B1 Cell 0");
                    ImGui.TableNextColumn();
                    ImGui.Text("B1 Cell 1");

                    ImGui.EndTable();
                }
            }
            ImGui.TableNextColumn(); ImGui.Text("A0 Cell 1");
            ImGui.TableNextColumn(); ImGui.Text("A1 Cell 0");
            ImGui.TableNextColumn(); ImGui.Text("A1 Cell 1");
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Outer size"))
    {
        // Showcasing use of ImGuiTableFlags_NoHostExtendX and ImGuiTableFlags_NoHostExtendY
        // Important to that note how the two flags have slightly different behaviors!
        ImGui.Text("Using NoHostExtendX and NoHostExtendY:");
        PushStyleCompact();
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-row-height", ImGuiTableFlags.Borders | ImGuiTableFlags.Resizable | ImGuiTableFlags.ContextMenuInBody | ImGuiTableFlags.RowBg | ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.NoHostExtendX);
        ImGui.CheckboxFlags("ImGuiTableFlags_NoHostExtendX", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoHostExtendX);
        ImGui.SameLine(); HelpMarker("Make outer width auto-fit to columns, overriding outer_size.x value.\n\nOnly available when ScrollX/ScrollY are disabled and Stretch columns are not used.");
        ImGui.CheckboxFlags("ImGuiTableFlags_NoHostExtendY", (value = flags.value) => flags.value = value, ImGuiTableFlags.NoHostExtendY);
        ImGui.SameLine(); HelpMarker("Make outer height stop exactly at outer_size.y (prevent auto-extending table past the limit).\n\nOnly available when ScrollX/ScrollY are disabled. Data below the limit will be clipped and not visible.");
        PopStyleCompact();

        let outer_size = new ImVec2(0.0, TEXT_BASE_HEIGHT * 5.5);
        if (ImGui.BeginTable("table1", 3, flags.value, outer_size))
        {
            for (let row = 0; row < 10; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
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
        if (ImGui.BeginTable("table2", 3, ImGuiTableFlags.Borders | ImGuiTableFlags.RowBg, new ImVec2(TEXT_BASE_WIDTH * 30, 0.0)))
        {
            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableNextColumn();
                    ImGui.Text(`Cell ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }
        ImGui.SameLine();
        if (ImGui.BeginTable("table3", 3, ImGuiTableFlags.Borders | ImGuiTableFlags.RowBg, new ImVec2(TEXT_BASE_WIDTH * 30, 0.0)))
        {
            for (let row = 0; row < 3; row++)
            {
                ImGui.TableNextRow(0, TEXT_BASE_HEIGHT * 1.5);
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableNextColumn();
                    ImGui.Text(`Cell ${column},${row}`);
                }
            }
            ImGui.EndTable();
        }

        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Background color"))
    {
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-bg", ImGuiTableFlags.RowBg);
        /* static */ const row_bg_type: Static<number> = STATIC("row_bg_type#tables-bg", 1);
        /* static */ const row_bg_target: Static<number> = STATIC("row_bg_target#tables-bg", 1);
        /* static */ const cell_bg_type: Static<number> = STATIC("cell_bg_type#tables-bg", 1);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_Borders", (value = flags.value) => flags.value = value, ImGuiTableFlags.Borders);
        ImGui.CheckboxFlags("ImGuiTableFlags_RowBg", (value = flags.value) => flags.value = value, ImGuiTableFlags.RowBg);
        ImGui.SameLine(); HelpMarker("ImGuiTableFlags_RowBg automatically sets RowBg0 to alternative colors pulled from the Style.");
        ImGui.Combo("row bg type", (value = row_bg_type.value) => row_bg_type.value = value, "None\0Red\0Gradient\0");
        ImGui.Combo("row bg target", (value = row_bg_target.value) => row_bg_target.value = value, "RowBg0\0RowBg1\0"); ImGui.SameLine(); HelpMarker("Target RowBg0 to override the alternating odd/even colors,\nTarget RowBg1 to blend with them.");
        ImGui.Combo("cell bg type", (value = cell_bg_type.value) => cell_bg_type.value = value, "None\0Blue\0"); ImGui.SameLine(); HelpMarker("We are colorizing cells to B1->C2 here.");
        IM_ASSERT(row_bg_type.value >= 0 && row_bg_type.value <= 2);
        IM_ASSERT(row_bg_target.value >= 0 && row_bg_target.value <= 1);
        IM_ASSERT(cell_bg_type.value >= 0 && cell_bg_type.value <= 1);
        PopStyleCompact();

        if (ImGui.BeginTable("table1", 5, flags.value))
        {
            for (let row = 0; row < 6; row++)
            {
                ImGui.TableNextRow();

                // Demonstrate setting a row background color with 'ImGui.TableSetBgColor(ImGuiTableBgTarget_RowBgX, ...)'
                // We use a transparent color so we can see the one behind in case our target is RowBg1 and RowBg0 was already targeted by the ImGuiTableFlags_RowBg flag.
                if (row_bg_type.value != 0)
                {
                    let row_bg_color = ImGui.GetColorU32(row_bg_type.value == 1 ? new ImVec4(0.7, 0.3, 0.3, 0.65) : new ImVec4(0.2 + row * 0.1, 0.2, 0.2, 0.65)); // Flat or Gradient?
                    ImGui.TableSetBgColor(ImGuiTableBgTarget.RowBg0 + row_bg_target.value, row_bg_color);
                }

                // Fill cells
                for (let column = 0; column < 5; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`${String.fromCharCode('A'.charCodeAt(0) + row)}${column}`);

                    // Change background of Cells B1->C2
                    // Demonstrate setting a cell background color with 'ImGui.TableSetBgColor(ImGuiTableBgTarget_CellBg, ...)'
                    // (the CellBg color will be blended over the RowBg and ColumnBg colors)
                    // We can also pass a column number as a third parameter to TableSetBgColor() and do this outside the column loop.
                    if (row >= 1 && row <= 2 && column >= 1 && column <= 2 && cell_bg_type.value == 1)
                    {
                        let cell_bg_color = ImGui.GetColorU32(new ImVec4(0.3, 0.3, 0.7, 0.65));
                        ImGui.TableSetBgColor(ImGuiTableBgTarget.CellBg, cell_bg_color);
                    }
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Tree view"))
    {
        /* static */ const flags: Static<ImGui.ImGuiTableFlags> = STATIC("flags#tables-tree-view", ImGuiTableFlags.BordersV | ImGuiTableFlags.BordersOuterH | ImGuiTableFlags.Resizable | ImGuiTableFlags.RowBg | ImGuiTableFlags.NoBordersInBody);

        if (ImGui.BeginTable("3ways", 3, flags.value))
        {
            // The first column will use the default _WidthStretch when ScrollX is Off and _WidthFixed when ScrollX is On
            ImGui.TableSetupColumn("Name", ImGuiTableColumnFlags.NoHide);
            ImGui.TableSetupColumn("Size", ImGuiTableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 12.0);
            ImGui.TableSetupColumn("Type", ImGuiTableColumnFlags.WidthFixed, TEXT_BASE_WIDTH * 18.0);
            ImGui.TableHeadersRow();

            // Simple storage to output a dummy file-system.
            class MyTreeNode
            {
                constructor(name: string, type: string, size: number, childIdx: number, childCount: number)
                {
                    this.Name = name;
                    this.Type = type;
                    this.Size = size;
                    this.ChildIdx = childIdx;
                    this.ChildCount = childCount;
                }
                Name: string;
                Type: string;
                Size: number;
                ChildIdx: number;
                ChildCount: number;
                static DisplayNode(node: MyTreeNode, all_nodes: MyTreeNode[]): void
                {
                    ImGui.TableNextRow();
                    ImGui.TableNextColumn();
                    const is_folder = (node.ChildCount > 0);
                    if (is_folder)
                    {
                        let open = ImGui.TreeNodeEx(node.Name, ImGuiTreeNodeFlags.SpanFullWidth);
                        ImGui.TableNextColumn();
                        ImGui.TextDisabled("--");
                        ImGui.TableNextColumn();
                        ImGui.TextUnformatted(node.Type);
                        if (open)
                        {
                            for (let child_n = 0; child_n < node.ChildCount; child_n++)
                                MyTreeNode.DisplayNode(all_nodes[node.ChildIdx + child_n], all_nodes);
                            ImGui.TreePop();
                        }
                    }
                    else
                    {
                        ImGui.TreeNodeEx(node.Name, ImGuiTreeNodeFlags.Leaf | ImGuiTreeNodeFlags.Bullet | ImGuiTreeNodeFlags.NoTreePushOnOpen | ImGuiTreeNodeFlags.SpanFullWidth);
                        ImGui.TableNextColumn();
                        ImGui.Text(`${node.Size}`);
                        ImGui.TableNextColumn();
                        ImGui.TextUnformatted(node.Type);
                    }
                }
            };
            let nodes: MyTreeNode[] =
            [
                new MyTreeNode("Root",                         "Folder",       -1,       1, 3    ), // 0
                new MyTreeNode("Music",                        "Folder",       -1,       4, 2    ), // 1
                new MyTreeNode("Textures",                     "Folder",       -1,       6, 3    ), // 2
                new MyTreeNode("desktop.ini",                  "System file",  1024,    -1,-1    ), // 3
                new MyTreeNode("File1_a.wav",                  "Audio file",   123000,  -1,-1    ), // 4
                new MyTreeNode("File1_b.wav",                  "Audio file",   456000,  -1,-1    ), // 5
                new MyTreeNode("Image001.png",                 "Image file",   203128,  -1,-1    ), // 6
                new MyTreeNode("Copy of Image001.png",         "Image file",   203256,  -1,-1    ), // 7
                new MyTreeNode("Copy of Image001 (Final2).png","Image file",   203512,  -1,-1    ), // 8
            ];

            MyTreeNode.DisplayNode(nodes[0], nodes);

            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Item width"))
    {
        HelpMarker(
            "Showcase using PushItemWidth() and how it is preserved on a per-column basis.\n\n"
            + "Note that on auto-resizing non-resizable fixed columns, querying the content width for e.g. right-alignment doesn't make sense.");
        if (ImGui.BeginTable("table_item_width", 3, ImGuiTableFlags.Borders))
        {
            ImGui.TableSetupColumn("small");
            ImGui.TableSetupColumn("half");
            ImGui.TableSetupColumn("right-align");
            ImGui.TableHeadersRow();

            for (let row = 0; row < 3; row++)
            {
                ImGui.TableNextRow();
                if (row == 0)
                {
                    // Setup ItemWidth once (instead of setting up every time, which is also possible but less efficient)
                    ImGui.TableSetColumnIndex(0);
                    ImGui.PushItemWidth(TEXT_BASE_WIDTH * 3.0); // Small
                    ImGui.TableSetColumnIndex(1);
                    ImGui.PushItemWidth(-ImGui.GetContentRegionAvail().x * 0.5);
                    ImGui.TableSetColumnIndex(2);
                    ImGui.PushItemWidth(-1.0); // Right-aligned
                }

                // Draw our contents
                /* static */ const dummy_f: Static<number> = STATIC("dummy_f#tables-item-width", 0.0);
                ImGui.PushID(row);
                ImGui.TableSetColumnIndex(0);
                ImGui.SliderFloat("float0", (value = dummy_f.value) => dummy_f.value = value, 0.0, 1.0);
                ImGui.TableSetColumnIndex(1);
                ImGui.SliderFloat("float1", (value = dummy_f.value) => dummy_f.value = value, 0.0, 1.0);
                ImGui.TableSetColumnIndex(2);
                ImGui.SliderFloat("float2", (value = dummy_f.value) => dummy_f.value = value, 0.0, 1.0);
                ImGui.PopID();
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Custom headers"))
    {
        const COLUMNS_COUNT = 3;
        if (ImGui.BeginTable("table_custom_headers", COLUMNS_COUNT, ImGuiTableFlags.Borders | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable))
        {
            ImGui.TableSetupColumn("Apricot");
            ImGui.TableSetupColumn("Banana");
            ImGui.TableSetupColumn("Cherry");

            // Dummy entire-column selection storage
            // FIXME: It would be nice to actually demonstrate full-featured selection using those checkbox.
            let column_selected: Static<boolean>[] = [
                STATIC("column_selected1#tables-custom-headers", false),
                STATIC("column_selected2#tables-custom-headers", false),
                STATIC("column_selected3#tables-custom-headers", false),
            ];

            // Instead of calling TableHeadersRow() we'll submit custom headers ourselves
            ImGui.TableNextRow(ImGuiTableRowFlags.Headers);
            for (let column = 0; column < COLUMNS_COUNT; column++)
            {
                ImGui.TableSetColumnIndex(column);
                const column_name = ImGui.TableGetColumnName(column); // Retrieve name passed to TableSetupColumn()
                ImGui.PushID(column);
                ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(0, 0));
                ImGui.Checkbox("##checkall", (value = column_selected[column].value) => column_selected[column].value = value);
                ImGui.PopStyleVar();
                ImGui.SameLine(0.0, ImGui.GetStyle().ItemInnerSpacing.x);
                ImGui.TableHeader(column_name);
                ImGui.PopID();
            }

            for (let row = 0; row < 5; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Selectable(`Cell ${column},${row}`, column_selected[column].value);
                }
            }
            ImGui.EndTable();
        }
        ImGui.TreePop();
    }

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Context menus"))
    {
        HelpMarker("By default, right-clicking over a TableHeadersRow()/TableHeader() line will open the default context-menu.\nUsing ImGuiTableFlags_ContextMenuInBody we also allow right-clicking over columns body.");
        /* static */ const flags1: Static<ImGui.ImGuiTableFlags> = STATIC("flags1#tables-context-menus", ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable | ImGuiTableFlags.Borders | ImGuiTableFlags.ContextMenuInBody);

        PushStyleCompact();
        ImGui.CheckboxFlags("ImGuiTableFlags_ContextMenuInBody", (value = flags1.value) => flags1.value = value, ImGuiTableFlags.ContextMenuInBody);
        PopStyleCompact();

        // Context Menus: first example
        // [1.1] Right-click on the TableHeadersRow() line to open the default table context menu.
        // [1.2] Right-click in columns also open the default table context menu (if ImGuiTableFlags_ContextMenuInBody is set)
        const COLUMNS_COUNT = 3;
        if (ImGui.BeginTable("table_context_menu", COLUMNS_COUNT, flags1.value))
        {
            ImGui.TableSetupColumn("One");
            ImGui.TableSetupColumn("Two");
            ImGui.TableSetupColumn("Three");

            // [1.1]] Right-click on the TableHeadersRow() line to open the default table context menu.
            ImGui.TableHeadersRow();

            // Submit dummy contents
            for (let row = 0; row < 4; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < COLUMNS_COUNT; column++)
                {
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
        /* static */ const flags2: Static<ImGui.ImGuiTableFlags> = STATIC("flags2#tables-context-menus", ImGuiTableFlags.Resizable | ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable | ImGuiTableFlags.Borders);
        if (ImGui.BeginTable("table_context_menu_2", COLUMNS_COUNT, flags2.value))
        {
            ImGui.TableSetupColumn("One");
            ImGui.TableSetupColumn("Two");
            ImGui.TableSetupColumn("Three");

            // [2.1] Right-click on the TableHeadersRow() line to open the default table context menu.
            ImGui.TableHeadersRow();
            for (let row = 0; row < 4; row++)
            {
                ImGui.TableNextRow();
                for (let column = 0; column < COLUMNS_COUNT; column++)
                {
                    // Submit dummy contents
                    ImGui.TableSetColumnIndex(column);
                    ImGui.Text(`Cell ${column},${row}`);
                    ImGui.SameLine();

                    // [2.2] Right-click on the ".." to open a custom popup
                    ImGui.PushID(row * COLUMNS_COUNT + column);
                    ImGui.SmallButton("..");
                    if (ImGui.BeginPopupContextItem())
                    {
                        ImGui.Text(`This is the popup for Button(\"..\") in Cell ${column},${row}`);
                        if (ImGui.Button("Close"))
                            ImGui.CloseCurrentPopup();
                        ImGui.EndPopup();
                    }
                    ImGui.PopID();
                }
            }

            // [2.3] Right-click anywhere in columns to open another custom popup
            // (instead of testing for !IsAnyItemHovered() we could also call OpenPopup() with ImGuiPopupFlags_NoOpenOverExistingPopup
            // to manage popup priority as the popups triggers, here "are we hovering a column" are overlapping)
            let hovered_column = -1;
            for (let column = 0; column < COLUMNS_COUNT + 1; column++)
            {
                ImGui.PushID(column);
                if (ImGui.TableGetColumnFlags(column) & ImGuiTableColumnFlags.IsHovered)
                    hovered_column = column;
                if (hovered_column == column && !ImGui.IsAnyItemHovered() && ImGui.IsMouseReleased(1))
                    ImGui.OpenPopup("MyPopup");
                if (ImGui.BeginPopup("MyPopup"))
                {
                    if (column == COLUMNS_COUNT)
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

    if (open_action != -1)
        ImGui.SetNextItemOpen(open_action != 0);
    if (ImGui.TreeNode("Synced instances"))
    {
        HelpMarker("Multiple tables with the same identifier will share their settings, width, visibility, order etc.");
        for (let n = 0; n < 3; n++)
        {
            let buf = `Synced Table ${n}`
            let open = ImGui.CollapsingHeader(buf, ImGuiTreeNodeFlags.DefaultOpen);
            if (open && ImGui.BeginTable("Table", 3, ImGuiTableFlags.Resizable | ImGuiTableFlags.Reorderable | ImGuiTableFlags.Hideable | ImGuiTableFlags.Borders | ImGuiTableFlags.SizingFixedFit | ImGuiTableFlags.NoSavedSettings))
            {
                ImGui.TableSetupColumn("One");
                ImGui.TableSetupColumn("Two");
                ImGui.TableSetupColumn("Three");
                ImGui.TableHeadersRow();
                for (let cell = 0; cell < 9; cell++)
                {
                    ImGui.TableNextColumn();
                    ImGui.Text(`this cell ${cell}`);
                }
                ImGui.EndTable();
            }
        }
        ImGui.TreePop();
    }

    ImGui.PopID();

    if (disable_indent.value)
        ImGui.PopStyleVar();
}

function ShowDemoWindowMisc()
{
    if (ImGui.CollapsingHeader("Filtering"))
    {
        /* static */ const filter: Static<ImGuiTextFilter> = STATIC("filter#1864", new ImGuiTextFilter());
        ImGui.Text("Filter usage:\n"
                    + "  \"\"         display all lines\n"
                    + "  \"xxx\"      display lines containing \"xxx\"\n"
                    + "  \"xxx,yyy\"  display lines containing \"xxx\" or \"yyy\"\n"
                    + "  \"-xxx\"     hide lines containing \"xxx\"");
        filter.value.Draw();
        const lines: string[] = [ "aaa1.c", "bbb1.c", "ccc1.c", "aaa2.cpp", "bbb2.cpp", "ccc2.cpp", "abc.h", "hello, world" ];
        for (let i = 0; i < IM_ARRAYSIZE(lines); i++)
            if (filter.value.PassFilter(lines[i]))
                ImGui.BulletText(lines[i]);
    }

    if (ImGui.CollapsingHeader("Inputs, Navigation & Focus"))
    {
        const io: ImGuiIO = ImGui.GetIO();

        ImGui.Text(`WantCaptureMouse: ${io.WantCaptureMouse}`);
        ImGui.Text(`WantCaptureKeyboard: ${io.WantCaptureKeyboard}`);
        ImGui.Text(`WantTextInput: ${io.WantTextInput}`);
        ImGui.Text(`WantSetMousePos: ${io.WantSetMousePos}`);
        ImGui.Text(`NavActive: ${io.NavActive}, NavVisible: ${io.NavVisible}`);

        if (ImGui.TreeNode("Keyboard, Mouse & Navigation State"))
        {
            if (ImGui.IsMousePosValid())
                ImGui.Text(`Mouse pos: (${io.MousePos.x}, ${io.MousePos.y})`);
            else
                ImGui.Text("Mouse pos: <INVALID>");
            ImGui.Text(`Mouse delta: (${io.MouseDelta.x}, ${io.MouseDelta.y})`);
            ImGui.Text("Mouse down:");     for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (io.MouseDownDuration[i] >= 0.0)   { ImGui.SameLine(); ImGui.Text(`b${i} (${io.MouseDownDuration[i].toFixed(2)} secs)`); }
            ImGui.Text("Mouse clicked:");  for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseClicked(i))          { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text("Mouse dbl-clicked:"); for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseDoubleClicked(i)) { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text("Mouse released:"); for (let i = 0; i < IM_ARRAYSIZE(io.MouseDown); i++) if (ImGui.IsMouseReleased(i))         { ImGui.SameLine(); ImGui.Text(`b${i}`); }
            ImGui.Text(`Mouse wheel: ${io.MouseWheel.toFixed(1)}`);

            ImGui.Text("Keys down:");      for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (io.KeysDownDuration[i] >= 0.0)     { ImGui.SameLine(); ImGui.Text(`${i} (0x${i.toString(16)}) (${io.KeysDownDuration[i].toFixed(2)} secs)`); }
            ImGui.Text("Keys pressed:");   for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (ImGui.IsKeyPressed(i))             { ImGui.SameLine(); ImGui.Text(`${i} (0x${i.toString(16)})`); }
            ImGui.Text("Keys release:");   for (let i = 0; i < IM_ARRAYSIZE(io.KeysDown); i++) if (ImGui.IsKeyReleased(i))            { ImGui.SameLine(); ImGui.Text(`${i} (0x${i.toString(16)})`); }
            ImGui.Text(`Keys mods: ${io.KeyCtrl ? "CTRL " : ""}${io.KeyShift ? "SHIFT " : ""}${io.KeyAlt ? "ALT " : ""}${io.KeySuper ? "SUPER " : ""}`);
            // ImGui.Text("Chars queue:");    for (let i = 0; i < io.InputQueueCharacters.Size; i++) { const c: ImWchar = io.InputQueueCharacters[i]; ImGui.SameLine();  ImGui.Text("\'%c\' (0x%04X)", (c > ' ' && c <= 255) ? (char)c : '?', c); } // FIXME: We should convert 'c' to UTF-8 here but the functions are not public.

            ImGui.Text("NavInputs down:"); for (let i = 0; i < IM_ARRAYSIZE(io.NavInputs); i++) if (io.NavInputs[i] > 0.0)                    { ImGui.SameLine(); ImGui.Text(`[${i}] ${io.NavInputs[i].toFixed(2)}`); }
            ImGui.Text("NavInputs pressed:"); for (let i = 0; i < IM_ARRAYSIZE(io.NavInputs); i++) if (io.NavInputsDownDuration[i] === 0.0)    { ImGui.SameLine(); ImGui.Text(`[${i}]`); }
            ImGui.Text("NavInputs duration:"); for (let i = 0; i < IM_ARRAYSIZE(io.NavInputs); i++) if (io.NavInputsDownDuration[i] >= 0.0)   { ImGui.SameLine(); ImGui.Text(`[${i}] ${io.NavInputsDownDuration[i].toFixed(2)}`); }

            ImGui.Button("Hovering me sets the\nkeyboard capture flag");
            if (ImGui.IsItemHovered())
                ImGui.CaptureKeyboardFromApp(true);
            ImGui.SameLine();
            ImGui.Button("Holding me clears the\nthe keyboard capture flag");
            if (ImGui.IsItemActive())
                ImGui.CaptureKeyboardFromApp(false);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Tabbing"))
        {
            ImGui.Text("Use TAB/SHIFT+TAB to cycle through keyboard editable fields.");
            /* static */ const buf: Static<ImStringBuffer> = STATIC("buf1#1921", new ImStringBuffer(32, "dummy"));
            ImGui.InputText("1", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.InputText("2", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.InputText("3", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.PushAllowKeyboardFocus(false);
            ImGui.InputText("4 (tab skip)", buf.value, IM_ARRAYSIZE(buf.value));
            //ImGui.SameLine(); HelpMarker("Use ImGui.PushAllowKeyboardFocus(bool)\nto disable tabbing through certain widgets.");
            ImGui.PopAllowKeyboardFocus();
            ImGui.InputText("5", buf.value, IM_ARRAYSIZE(buf.value));
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Focus from code"))
        {
            const focus_1: boolean = ImGui.Button("Focus on 1"); ImGui.SameLine();
            const focus_2: boolean = ImGui.Button("Focus on 2"); ImGui.SameLine();
            const focus_3: boolean = ImGui.Button("Focus on 3");
            let has_focus: number = 0;
            /* static */ const buf: Static<ImStringBuffer> = STATIC("buf2#1944", new ImStringBuffer(128, "click on a button to set focus"));

            if (focus_1) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("1", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 1;

            if (focus_2) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("2", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 2;

            ImGui.PushAllowKeyboardFocus(false);
            if (focus_3) ImGui.SetKeyboardFocusHere();
            ImGui.InputText("3 (tab skip)", buf.value, IM_ARRAYSIZE(buf.value));
            if (ImGui.IsItemActive()) has_focus = 3;
            ImGui.PopAllowKeyboardFocus();

            if (has_focus)
                ImGui.Text(`Item with focus: ${has_focus}`);
            else
                ImGui.Text("Item with focus: <none>");

            // Use >= 0 parameter to SetKeyboardFocusHere() to focus an upcoming item
            /* static */ const f3: Static<ImTuple3<number>> = STATIC<ImTuple3<number>>("f3", [ 0.0, 0.0, 0.0 ]);
            let focus_ahead: number = -1;
            if (ImGui.Button("Focus on X")) { focus_ahead = 0; } ImGui.SameLine();
            if (ImGui.Button("Focus on Y")) { focus_ahead = 1; } ImGui.SameLine();
            if (ImGui.Button("Focus on Z")) { focus_ahead = 2; }
            if (focus_ahead !== -1) ImGui.SetKeyboardFocusHere(focus_ahead);
            ImGui.SliderFloat3("Float3", f3.value, 0.0, 1.0);

            ImGui.TextWrapped("NB: Cursor & selection are preserved when refocusing last used item in code.");
            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Dragging"))
        {
            ImGui.TextWrapped("You can use ImGui.GetMouseDragDelta(0) to query for the dragged amount on any widget.");
            for (let button = 0; button < 3; button++)
                ImGui.Text(`IsMouseDragging(${button}):\n  w/ default threshold: ${ImGui.IsMouseDragging(button)},\n  w/ zero threshold: ${ImGui.IsMouseDragging(button, 0.0)}\n  w/ large threshold: ${ImGui.IsMouseDragging(button, 20.0)}`);

            ImGui.Button("Drag Me");
            if (ImGui.IsItemActive())
                ImGui.GetForegroundDrawList().AddLine(io.MouseClickedPos[0], io.MousePos, ImGui.GetColorU32(ImGuiCol.Button), 4.0); // Draw a line between the button and the mouse cursor

            // Drag operations gets "unlocked" when the mouse has moved past a certain threshold (the default threshold is stored in io.MouseDragThreshold)
            // You can request a lower or higher threshold using the second parameter of IsMouseDragging() and GetMouseDragDelta()
            const value_raw: Readonly<ImVec2> = ImGui.GetMouseDragDelta(0, 0.0);
            const value_with_lock_threshold: Readonly<ImVec2> = ImGui.GetMouseDragDelta(0);
            const mouse_delta: Readonly<ImGui.reference_ImVec2> = io.MouseDelta;
            ImGui.SameLine(); ImGui.Text(`Raw (${value_raw.x.toFixed(1)}, ${value_raw.y.toFixed(1)}), WithLockThresold (${value_with_lock_threshold.x.toFixed(1)}, ${value_with_lock_threshold.y.toFixed(1)}), MouseDelta (${mouse_delta.x.toFixed(1)}, ${mouse_delta.y.toFixed(1)})`);
            // TODO
            // ImGui.Text("GetMouseDragDelta(0):\n  w/ default threshold: (%.1f, %.1f),\n  w/ zero threshold: (%.1f, %.1f)\nMouseDelta: (%.1f, %.1f)", value_with_lock_threshold.x, value_with_lock_threshold.y, value_raw.x, value_raw.y, mouse_delta.x, mouse_delta.y);

            ImGui.TreePop();
        }

        if (ImGui.TreeNode("Mouse cursors"))
        {
            const mouse_cursors_names: string[] = [ "Arrow", "TextInput", "Move", "ResizeNS", "ResizeEW", "ResizeNESW", "ResizeNWSE", "Hand" ];
            IM_ASSERT(IM_ARRAYSIZE(mouse_cursors_names) === ImGuiMouseCursor.COUNT);

            ImGui.Text(`Current mouse cursor = ${ImGui.GetMouseCursor()}: ${mouse_cursors_names[ImGui.GetMouseCursor()]}`);
            ImGui.Text("Hover to see mouse cursors:");
            ImGui.SameLine(); HelpMarker("Your application can render a different mouse cursor based on what ImGui.GetMouseCursor() returns. If software cursor rendering (io.MouseDrawCursor) is set ImGui will draw the right cursor for you, otherwise your backend needs to handle it.");
            for (let i = 0; i < ImGuiMouseCursor.COUNT; i++)
            {
                const label: string = `Mouse cursor ${i}: ${mouse_cursors_names[i]}`;
                ImGui.Bullet(); ImGui.Selectable(label, false);
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

function ShowAboutWindow(p_open: ImAccess<boolean>): void
{
    if (!ImGui.Begin("About Dear ImGui", p_open, ImGuiWindowFlags.AlwaysAutoResize))
    {
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
export function ShowStyleSelector(label: string): boolean
{
    /* static */ const style_idx: Static<number> = STATIC("style_idx", -1);
    if (ImGui.Combo(label, (value = style_idx.value) => style_idx.value = value, "Classic\0Dark\0Light\0"))
    {
        switch (style_idx.value)
        {
        case 0: ImGui.StyleColorsClassic(); break;
        case 1: ImGui.StyleColorsDark(); break;
        case 2: ImGui.StyleColorsLight(); break;
        }
        return true;
    }
    return false;
}

// Demo helper function to select among loaded fonts.
// Here we use the regular BeginCombo()/EndCombo() api which is more the more flexible one.
export function ShowFontSelector(label: string): void
{
    const io: ImGuiIO = ImGui.GetIO();
    const font_current: ImFont = ImGui.GetFont();
    if (ImGui.BeginCombo(label, font_current.GetDebugName()))
    {
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
    HelpMarker(
        "- Load additional fonts with io.Fonts->AddFontFromFileTTF().\n" +
        "- The font atlas is built when calling io.Fonts->GetTexDataAsXXXX() or io.Fonts->Build().\n" +
        "- Read FAQ and documentation in misc/fonts for more details.\n" +
        "- If you need to add/remove fonts at runtime (e.g. for DPI change), do it before calling NewFrame().");
}

export function ShowStyleEditor(ref: ImGuiStyle | null = null): void
{
    // You can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it compares to an internally stored reference)
    const style: ImGuiStyle = ImGui.GetStyle();
    /* static */ const ref_saved_style: Static<ImGuiStyle> = STATIC("ref_saved_style", new ImGuiStyle());

    // Default to using internal storage as reference
    /* static */ const init: Static<boolean> = STATIC("init", true);
    if (init.value && ref === null)
        ref_saved_style.value.Copy(style);
    init.value = false;
    if (ref === null)
        ref = ref_saved_style.value;

    ImGui.PushItemWidth(ImGui.GetWindowWidth() * 0.50);

    if (/*ImGui.*/ShowStyleSelector("Colors##Selector"))
        ref_saved_style.value.Copy(style);
    /*ImGui.*/ShowFontSelector("Fonts##Selector");

    // Simplified Settings
    if (ImGui.SliderFloat("FrameRounding", (value = style.FrameRounding) => style.FrameRounding = value, 0.0, 12.0, "%.0f"))
        style.GrabRounding = style.FrameRounding; // Make GrabRounding always the same value as FrameRounding
    { let window_border: boolean = (style.WindowBorderSize > 0.0); if (ImGui.Checkbox("WindowBorder", (value = window_border) => window_border = value)) style.WindowBorderSize = window_border ? 1.0 : 0.0; }
    ImGui.SameLine();
    { let frame_border: boolean = (style.FrameBorderSize > 0.0); if (ImGui.Checkbox("FrameBorder", (value = frame_border) => frame_border = value)) style.FrameBorderSize = frame_border ? 1.0 : 0.0; }
    ImGui.SameLine();
    { let popup_border: boolean = (style.PopupBorderSize > 0.0); if (ImGui.Checkbox("PopupBorder", (value = popup_border) => popup_border = value)) style.PopupBorderSize = popup_border ? 1.0 : 0.0; }

    // Save/Revert button
    if (ImGui.Button("Save Ref"))
        ref.Copy(ref_saved_style.value.Copy(style));
    ImGui.SameLine();
    if (ImGui.Button("Revert Ref"))
        style.Copy(ref);
    ImGui.SameLine();
    HelpMarker("Save/Revert in local non-persistent storage. Default Colors definition are not affected. Use \"Export Colors\" below to save them somewhere.");

    ImGui.Separator();

    if (ImGui.BeginTabBar("##tabs", ImGuiTabBarFlags.None))
    {
        if (ImGui.BeginTabItem("Sizes"))
        {
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
            ImGui.SliderFloat2("ButtonTextAlign", style.ButtonTextAlign, 0.0, 1.0, "%.2f"); ImGui.SameLine(); HelpMarker("Alignment applies when a button is larger than its text content.");
            // ImGui.SliderFloat2("SelectableTextAlign", (float*)&style.SelectableTextAlign, 0.0f, 1.0f, "%.2f"); ImGui.SameLine(); HelpMarker("Alignment applies when a selectable is larger than its text content.");
            ImGui.Text("Safe Area Padding"); ImGui.SameLine(); HelpMarker("Adjust if you cannot see the edges of your screen (e.g. on a TV where scaling has not been configured).");
            ImGui.SliderFloat2("DisplaySafeAreaPadding", style.DisplaySafeAreaPadding, 0.0, 30.0, "%.0f");
            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Colors"))
        {
            /* static */ const output_dest: Static<number> = STATIC("output_dest", 0);
            /* static */ const output_only_modified: Static<boolean> = STATIC("output_only_modified", true);
            if (ImGui.Button("Export Unsaved"))
            {
                if (output_dest.value === 0)
                    ImGui.LogToClipboard();
                else
                    ImGui.LogToTTY();
                ImGui.LogText("ImVec4* colors = ImGui.GetStyle().Colors;" + IM_NEWLINE);
                for (let i = 0; i < ImGuiCol.COUNT; i++)
                {
                    const col: Readonly<interface_ImVec4> = style.Colors[i];
                    const name: string = ImGui.GetStyleColorName(i);
                    if (!output_only_modified.value || !col.Equals(ref.Colors[i]))
                        ImGui.LogText(`colors[ImGuiCol.${name}] = new ImVec4(${col.x.toFixed(2)}, ${col.y.toFixed(2)}, ${col.z.toFixed(2)}, ${col.w.toFixed(2)});` + IM_NEWLINE);
                }
                ImGui.LogFinish();
            }
            ImGui.SameLine(); ImGui.SetNextItemWidth(120); ImGui.Combo("##output_type", (value = output_dest.value) => output_dest.value = value, "To Clipboard\0To TTY\0");
            ImGui.SameLine(); ImGui.Checkbox("Only Modified Colors", (value = output_only_modified.value) => output_only_modified.value = value);

            ImGui.Text("Tip: Left-click on colored square to open color picker,\nRight-click to open edit options menu.");

            /* static */ const filter: Static<ImGuiTextFilter> = STATIC("filter#2223", new ImGuiTextFilter());
            filter.value.Draw("Filter colors", 200);

            /* static */ const alpha_flags: Static<ImGuiColorEditFlags> = STATIC("alpha_flags", 0);
            ImGui.RadioButton("Opaque", (value = alpha_flags.value) => alpha_flags.value = value, 0); ImGui.SameLine();
            ImGui.RadioButton("Alpha", (value = alpha_flags.value) => alpha_flags.value = value, ImGuiColorEditFlags.AlphaPreview); ImGui.SameLine();
            ImGui.RadioButton("Both", (value = alpha_flags.value) => alpha_flags.value = value, ImGuiColorEditFlags.AlphaPreviewHalf);

            ImGui.BeginChild("#colors", new ImVec2(0, 300), true, ImGuiWindowFlags.AlwaysVerticalScrollbar | ImGuiWindowFlags.AlwaysHorizontalScrollbar | ImGuiWindowFlags.NavFlattened);
            ImGui.PushItemWidth(-160);
            for (let i = 0; i < ImGuiCol.COUNT; i++)
            {
                const name: string = ImGui.GetStyleColorName(i);
                if (!filter.value.PassFilter(name))
                    continue;
                ImGui.PushID(i);
                ImGui.ColorEdit4("##color", style.Colors[i], ImGuiColorEditFlags.AlphaBar | alpha_flags.value);
                if (!style.Colors[i].Equals(ref.Colors[i]))
                {
                    // Tips: in a real user application, you may want to merge and use an icon font into the main font, so instead of "Save"/"Revert" you'd use icons.
                    // Read the FAQ and misc/fonts/README.txt about using icon fonts. It's really easy and super convenient!
                    ImGui.SameLine(0.0, style.ItemInnerSpacing.x); if (ImGui.Button("Save")) ref.Colors[i].Copy(style.Colors[i]);
                    ImGui.SameLine(0.0, style.ItemInnerSpacing.x); if (ImGui.Button("Revert")) style.Colors[i].Copy(ref.Colors[i]);
                }
                ImGui.SameLine(0.0, style.ItemInnerSpacing.x);
                ImGui.TextUnformatted(name);
                ImGui.PopID();
            }
            ImGui.PopItemWidth();
            ImGui.EndChild();

            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Fonts"))
        {
            const io: ImGuiIO = ImGui.GetIO();
            const atlas: ImFontAtlas = io.Fonts;
            HelpMarker("Read FAQ and misc/fonts/README.txt for details on font loading.");
            ImGui.PushItemWidth(120);
            for (let i = 0; i < atlas.Fonts.Size; i++)
            {
                const font: ImFont = atlas.Fonts[i];
                ImGui.PushID(font.native.$$.ptr);
                const font_details_opened = ImGui.TreeNode(font.native.$$.ptr, `Font ${i}: \'${font.ConfigData.length > 0 ? font.ConfigData[0].Name : ""}\', ${font.FontSize.toFixed(2)} px, ${font.Glyphs.Size} glyphs, ${font.ConfigDataCount} file(s)`);
                ImGui.SameLine(); if (ImGui.SmallButton("Set as default")) io.FontDefault = font;
                if (font_details_opened)
                {
                    ImGui.PushFont(font);
                    ImGui.Text("The quick brown fox jumps over the lazy dog");
                    ImGui.PopFont();
                    ImGui.DragFloat("Font scale", (value = font.Scale) => font.Scale = value, 0.005, 0.3, 2.0, "%.1f");   // Scale only this font
                    ImGui.SameLine(); HelpMarker("Note than the default embedded font is NOT meant to be scaled.\n\nFont are currently rendered into bitmaps at a given size at the time of building the atlas. You may oversample them to get some flexibility with scaling. You can also render at multiple sizes and select which one to use at runtime.\n\n(Glimmer of hope: the atlas system should hopefully be rewritten in the future to make scaling more natural and automatic.)");
                    ImGui.InputFloat("Font offset", (value = font.DisplayOffset.y) => font.DisplayOffset.y = value, 1, 1, "%.0f");
                    ImGui.Text(`Ascent: ${font.Ascent}, Descent: ${font.Descent}, Height: ${font.Ascent - font.Descent}`);
                    ImGui.Text(`Fallback character: '${String.fromCharCode(font.FallbackChar)}' (${font.FallbackChar})`);
                    const surface_sqrt: number = Math.sqrt(font.MetricsTotalSurface);
                    ImGui.Text(`Texture surface: ${font.MetricsTotalSurface} pixels (approx) ~ ${0 | surface_sqrt}x${0 | surface_sqrt}`);
                    for (let config_i = 0; config_i < font.ConfigDataCount; config_i++)
                    {
                        const cfg: ImGui.ImFontConfig = font.ConfigData[config_i];
                        ImGui.BulletText(`Input ${config_i}: \'${cfg.Name}\', Oversample: (${cfg.OversampleH},${cfg.OversampleH}), PixelSnapH: ${cfg.PixelSnapH}`);
                    }
                    if (ImGui.TreeNode("Glyphs", `Glyphs (${font.Glyphs.Size})`))
                    {
                        // Display all glyphs of the fonts in separate pages of 256 characters
                        for (let base = 0; base < 0x10000; base += 256)
                        {
                            let count = 0;
                            for (let n = 0; n < 256; n++)
                                count += font.FindGlyphNoFallback((base + n) as ImGui.Bind.ImWchar) ? 1 : 0;
                            if (count > 0 && ImGui.TreeNode(base, `U+${format_number_hex(base, 4).toUpperCase()}..U+${(format_number_hex(base + 255, 4).toUpperCase())} (${count} ${count > 1 ? "glyphs" : "glyph"})`))
                            {
                                const cell_size = font.FontSize * 1;
                                const cell_spacing = style.ItemSpacing.y;
                                const base_pos = ImGui.GetCursorScreenPos();
                                const draw_list = ImGui.GetWindowDrawList();
                                for (let n = 0; n < 256; n++)
                                {
                                    const cell_p1 = new ImVec2(base_pos.x + (n % 16) * (cell_size + cell_spacing), base_pos.y + (0 | (n / 16)) * (cell_size + cell_spacing));
                                    const cell_p2 = new ImVec2(cell_p1.x + cell_size, cell_p1.y + cell_size);
                                    const glyph: ImGui.ImFontGlyph | null = font.FindGlyphNoFallback((base + n) as ImGui.Bind.ImWchar);
                                    draw_list.AddRect(cell_p1, cell_p2, glyph ? IM_COL32(255,255,255,100) : IM_COL32(255,255,255,50));
                                    if (glyph)
                                        font.RenderChar(draw_list, cell_size, cell_p1, ImGui.GetColorU32(ImGuiCol.Text), (base+n) as ImGui.Bind.ImWchar); // We use ImFont.RenderChar as a shortcut because we don't have UTF-8 conversion functions available to generate a string.
                                    if (glyph && ImGui.IsWindowHovered() && ImGui.IsMouseHoveringRect(cell_p1, cell_p2))
                                    {
                                        ImGui.BeginTooltip();
                                        ImGui.Text(`Codepoint: U+${format_number_hex(base + n, 4).toUpperCase()}`);
                                        ImGui.Separator();
                                        ImGui.Image(ImGui.GetIO().Fonts.TexID, new ImVec2(8 * (glyph.X1 - glyph.X0), 8 * (glyph.Y1 - glyph.Y0)), new ImVec2(glyph.U0, glyph.V0), new ImVec2(glyph.U1, glyph.V1), new ImColor(255, 255, 255, 255).toImVec4(), new ImColor(255, 255, 255, 128).toImVec4());
                                        ImGui.SameLine();
                                        ImGui.BeginGroup();
                                        ImGui.Text(`AdvanceX: ${glyph.AdvanceX.toFixed(1)}`);
                                        ImGui.Text(`Pos: (${glyph.X0.toFixed(2)},${glyph.Y0.toFixed(2)}).(${glyph.X1.toFixed(2)},${glyph.Y1.toFixed(2)})`);
                                        ImGui.Text(`UV: (${glyph.U0.toFixed(3)},${glyph.V0.toFixed(3)}).(${glyph.U1.toFixed(3)},${glyph.V1.toFixed(3)})`);
                                        ImGui.EndGroup();
                                        ImGui.EndTooltip();
                                    }
                                }
                                ImGui.Dummy(new ImVec2((cell_size + cell_spacing) * 16, (cell_size + cell_spacing) * 16));
                                ImGui.TreePop();
                            }
                        }
                        ImGui.TreePop();
                    }
                    ImGui.TreePop();
                }
                ImGui.PopID();
            }
            if (ImGui.TreeNode("Atlas texture", `Atlas texture (${atlas.TexWidth}x${atlas.TexHeight} pixels)`))
            {
                const tint_col: ImVec4 = new ImVec4(1.0, 1.0, 1.0, 1.0);
                const border_col: ImVec4 = new ImVec4(1.0, 1.0, 1.0, 0.5);
                ImGui.Image(atlas.TexID, new ImVec2(atlas.TexWidth, atlas.TexHeight), new ImVec2(0, 0), new ImVec2(1, 1), tint_col, border_col);
                ImGui.TreePop();
            }

            /* static */ const window_scale: Static<number> = STATIC("window_scale", 1.0);
            if (ImGui.DragFloat("this window scale", (value = window_scale.value) => window_scale.value = value, 0.005, 0.3, 2.0, "%.2f"))              // scale only this window
                ImGui.SetWindowFontScale(window_scale.value);
            ImGui.DragFloat("global scale", (value = ImGui.GetIO().FontGlobalScale) => io.FontGlobalScale = value, 0.005, 0.3, 2.0, "%.2f"); // scale everything
            ImGui.PopItemWidth();

            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Rendering"))
        {
            ImGui.Checkbox("Anti-aliased lines", (value = style.AntiAliasedLines) => style.AntiAliasedLines = value); ImGui.SameLine(); HelpMarker("When disabling anti-aliasing lines, you'll probably want to disable borders in your style as well.");
            ImGui.Checkbox("Anti-aliased fill", (value = style.AntiAliasedFill) => style.AntiAliasedFill = value);
            ImGui.PushItemWidth(100);
            ImGui.DragFloat("Curve Tessellation Tolerance", (value = style.CurveTessellationTol) => style.CurveTessellationTol = value, 0.02, 0.10, Number.MAX_VALUE, "%.2f", 2.0);
            if (style.CurveTessellationTol < 0.10) style.CurveTessellationTol = 0.10;
            ImGui.DragFloat("Global Alpha", (value = style.Alpha) => style.Alpha = value, 0.005, 0.20, 1.0, "%.2f"); // Not exposing zero here so user doesn't "lose" the UI (zero alpha clips all widgets). But application code could have a toggle to switch between zero and non-zero.
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

// Demonstrate creating a "main" fullscreen menu bar and populating it.
// Note the difference between BeginMainMenuBar() and BeginMenuBar():
// - BeginMenuBar() = menu-bar inside current window we Begin()-ed into (the window needs the ImGuiWindowFlags_MenuBar flag)
// - BeginMainMenuBar() = helper to create menu-bar-sized window at the top of the main viewport + call BeginMenuBar() into it.
function ShowExampleAppMainMenuBar(): void
{
    if (ImGui.BeginMainMenuBar())
    {
        if (ImGui.BeginMenu("File"))
        {
            ShowExampleMenuFile();
            ImGui.EndMenu();
        }
        if (ImGui.BeginMenu("Edit"))
        {
            if (ImGui.MenuItem("Undo", "CTRL+Z")) {}
            if (ImGui.MenuItem("Redo", "CTRL+Y", false, false)) {}  // Disabled item
            ImGui.Separator();
            if (ImGui.MenuItem("Cut", "CTRL+X")) {}
            if (ImGui.MenuItem("Copy", "CTRL+C")) {}
            if (ImGui.MenuItem("Paste", "CTRL+V")) {}
            ImGui.EndMenu();
        }
        ImGui.EndMainMenuBar();
    }
}

// Note that shortcuts are currently provided for display only (future version will add flags to BeginMenu to process shortcuts)
function ShowExampleMenuFile(): void
{
    ImGui.MenuItem("(dummy menu)", null, false, false);
    if (ImGui.MenuItem("New")) {}
    if (ImGui.MenuItem("Open", "Ctrl+O")) {}
    if (ImGui.BeginMenu("Open Recent"))
    {
        ImGui.MenuItem("fish_hat.c");
        ImGui.MenuItem("fish_hat.inl");
        ImGui.MenuItem("fish_hat.h");
        if (ImGui.BeginMenu("More.."))
        {
            ImGui.MenuItem("Hello");
            ImGui.MenuItem("Sailor");
            if (ImGui.BeginMenu("Recurse.."))
            {
                ShowExampleMenuFile();
                ImGui.EndMenu();
            }
            ImGui.EndMenu();
        }
        ImGui.EndMenu();
    }
    if (ImGui.MenuItem("Save", "Ctrl+S")) {}
    if (ImGui.MenuItem("Save As..")) {}
    ImGui.Separator();
    if (ImGui.BeginMenu("Options"))
    {
        /* static */ const enabled: Static<boolean> = STATIC("enabled", true);
        ImGui.MenuItem("Enabled", "", (value = enabled.value) => enabled.value = value);
        ImGui.BeginChild("child", new ImVec2(0, 60), true);
        for (let i = 0; i < 10; i++)
            ImGui.Text(`Scrolling Text ${i}`);
        ImGui.EndChild();
        /* static */ const f: Static<number> = STATIC("f#2408", 0.5);
        /* static */ const n: Static<number> = STATIC("n", 0);
        /* static */ const b: Static<boolean> = STATIC("b#2599", true);
        ImGui.SliderFloat("Value", (value = f.value) => f.value = value, 0.0, 1.0);
        ImGui.InputFloat("Input", (value = f.value) => f.value = value, 0.1);
        ImGui.Combo("Combo", (value = n.value) => n.value = value, "Yes\0No\0Maybe\0\0");
        ImGui.Checkbox("Check", (value = b.value) => b.value = value);
        ImGui.EndMenu();
    }
    if (ImGui.BeginMenu("Colors"))
    {
        const sz: number = ImGui.GetTextLineHeight();
        for (let i = 0; i < ImGuiCol.COUNT; i++)
        {
            const name: string = ImGui.GetStyleColorName(i as ImGuiCol);
            const p: ImGui.interface_ImVec2 = ImGui.GetCursorScreenPos();
            ImGui.GetWindowDrawList().AddRectFilled(p, new ImVec2(p.x + sz, p.y + sz), ImGui.GetColorU32(i as ImGuiCol));
            ImGui.Dummy(new ImVec2(sz, sz));
            ImGui.SameLine();
            ImGui.MenuItem(name);
        }
        ImGui.EndMenu();
    }
    if (ImGui.BeginMenu("Disabled", false)) // Disabled
    {
        IM_ASSERT(0);
    }
    if (ImGui.MenuItem("Checked", null, true)) {}
    if (ImGui.MenuItem("Quit", "Alt+F4")) { done = true; }
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Debug Console / ShowExampleAppConsole()
//-----------------------------------------------------------------------------

// Demonstrate creating a simple console window, with scrolling, filtering, completion and history.
// For the console example, here we are using a more C++ like approach of declaring a class to hold the data and the functions.
class ExampleAppConsole {
    // char                  InputBuf[256];
    public InputBuf: ImStringBuffer = new ImStringBuffer(256, "");
    // ImVector<char*>       Items;
    public Items: ImVector<string> = new ImVector<string>();
    // ImVector<const char*> Commands;
    public Commands: ImVector<string> = new ImVector<string>();
    // ImVector<char*>       History;
    public History: ImVector<string> = new ImVector<string>();
    // int                   HistoryPos;    // -1: new line, 0..History.Size-1 browsing history.
    public HistoryPos: number = -1;
    // ImGuiTextFilter       Filter;
    public Filter: ImGuiTextFilter = new ImGuiTextFilter();
    // bool                  AutoScroll;
    public AutoScroll: boolean = true;
    // bool                  ScrollToBottom;
    public ScrollToBottom: boolean = true;

    constructor() {
        this.ClearLog();
        // memset(InputBuf, 0, sizeof(InputBuf));
        this.InputBuf.buffer = "";
        this.HistoryPos = -1;
        this.Commands.push_back("HELP");
        this.Commands.push_back("HISTORY");
        this.Commands.push_back("CLEAR");
        this.Commands.push_back("CLASSIFY");  // "classify" is only here to provide an example of "C"+[tab] completing to "CL" and displaying matches.
        this.AutoScroll = true;
        this.ScrollToBottom = true;
        this.AddLog("Welcome to Dear ImGui!");
    }

    public delete(): void {}

    // Portable helpers
    // static int   Stricmp(const char* str1, const char* str2)         { int d; while ((d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; } return d; }
    // static int   Strnicmp(const char* str1, const char* str2, int n) { int d = 0; while (n > 0 && (d = toupper(*str2) - toupper(*str1)) === 0 && *str1) { str1++; str2++; n--; } return d; }
    // static char* Strdup(const char *str)                             { size_t len = strlen(str) + 1; void* buf = malloc(len); IM_ASSERT(buf); return (char*)memcpy(buf, (const void*)str, len); }
    // static void  Strtrim(char* str)                                  { char* str_end = str + strlen(str); while (str_end > str && str_end[-1] == ' ') str_end--; *str_end = 0; }

    public ClearLog(): void {
        // for (let i = 0; i < Items.Size; i++)
        //     free(Items[i]);
        this.Items.clear();
        this.ScrollToBottom = true;
    }

    // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
    public AddLog(fmt: string): void {
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
    public Draw(title: string, p_open: ImAccess<boolean>): void
    {
        ImGui.SetNextWindowSize(new ImVec2(520, 600), ImGuiCond.FirstUseEver);
        if (!ImGui.Begin(title, p_open))
        {
            ImGui.End();
            return;
        }

        // As a specific feature guaranteed by the library, after calling Begin() the last Item represent the title bar. So e.g. IsItemHovered() will return true when hovering the title bar.
        // Here we create a context menu only available from the title bar.
        if (ImGui.BeginPopupContextItem())
        {
            if (ImGui.MenuItem("Close Console"))
                // *p_open = false;
                p_open(false);
            ImGui.EndPopup();
        }

        ImGui.TextWrapped("This example implements a console with basic coloring, completion and history. A more elaborate implementation may want to store entries along with extra data such as timestamp, emitter, etc.");
        ImGui.TextWrapped("Enter 'HELP' for help, press TAB to use text completion.");

        // TODO: display items starting from the bottom

        if (ImGui.SmallButton("Add Dummy Text")) { this.AddLog(`${this.Items.Size} some text`); this.AddLog("some more text"); this.AddLog("display very important message here!"); } ImGui.SameLine();
        if (ImGui.SmallButton("Add Dummy Error")) { this.AddLog("[error] something went wrong"); } ImGui.SameLine();
        if (ImGui.SmallButton("Clear")) { this.ClearLog(); } ImGui.SameLine();
        const copy_to_clipboard: boolean = ImGui.SmallButton("Copy"); ImGui.SameLine();
        if (ImGui.SmallButton("Scroll to bottom")) this.ScrollToBottom = true;
        // /* static */ const t: Static<number> = getStatic("t", 0.0); if (ImGui.GetTime() - t > 0.02) { t = ImGui.GetTime(); this.AddLog(`Spam ${t}`); }

        ImGui.Separator();

        // Options menu
        if (ImGui.BeginPopup("Options"))
        {
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

        const footer_height_to_reserve: number = ImGui.GetStyle().ItemSpacing.y + ImGui.GetFrameHeightWithSpacing(); // 1 separator, 1 input text
        ImGui.BeginChild("ScrollingRegion", new ImVec2(0, -footer_height_to_reserve), false, ImGuiWindowFlags.HorizontalScrollbar); // Leave room for 1 separator + 1 InputText
        if (ImGui.BeginPopupContextWindow())
        {
            if (ImGui.Selectable("Clear")) this.ClearLog();
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
        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(4, 1)); // Tighten spacing
        if (copy_to_clipboard)
            ImGui.LogToClipboard();
        for (let i = 0; i < this.Items.Size; i++)
        {
            // const char* item = Items[i];
            const item: string = this.Items.Data[i];
            if (!this.Filter.PassFilter(item))
                continue;

            // Normally you would store more information in your item (e.g. make Items[] an array of structure, store color/type etc.)
            let pop_color = false;
            // if (strstr(item, "[error]"))            { ImGui.PushStyleColor(ImGuiCol_Text, new ImVec4(1.0f, 0.4f, 0.4f, 1.0f)); pop_color = true; }
            if (/\[error\]/.test(item)) { ImGui.PushStyleColor(ImGuiCol.Text, new ImVec4(1.0, 0.4, 0.4, 1.0)); pop_color = true; }
            // else if (strncmp(item, "# ", 2) == 0)   { ImGui.PushStyleColor(ImGuiCol_Text, new ImVec4(1.0f, 0.8f, 0.6f, 1.0f)); pop_color = true; }
            else if (/^# /.test(item))  { ImGui.PushStyleColor(ImGuiCol.Text, new ImVec4(1.0, 0.8, 0.6, 1.0)); pop_color = true; }
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
        let reclaim_focus: boolean = false;
        if (ImGui.InputText("Input", this.InputBuf, IM_ARRAYSIZE(this.InputBuf), ImGuiInputTextFlags.EnterReturnsTrue | ImGuiInputTextFlags.CallbackCompletion | ImGuiInputTextFlags.CallbackHistory, ExampleAppConsole.TextEditCallbackStub, this))
        {
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
    public ExecCommand(command_line: string): void
    {
        this.AddLog(`# ${command_line}\n`);

        // Insert into history. First find match and delete it so it can be pushed to the back. This isn't trying to be smart or optimal.
        this.HistoryPos = -1;
        for (let i = this.History.Size - 1; i >= 0; i--)
            // if (Stricmp(History[i], command_line) === 0)
            if (this.History.Data[i].toLowerCase() === command_line.toLowerCase())
            {
                // free(History[i]);
                // History.erase(History.begin() + i);
                break;
            }
        // History.push_back(Strdup(command_line));
        this.History.push_back(command_line);

        // Process command
        // if (Stricmp(command_line, "CLEAR") === 0)
        if (command_line.toUpperCase() === "CLEAR")
        {
            this.ClearLog();
        }
        // else if (Stricmp(command_line, "HELP") === 0)
        else if (command_line.toUpperCase() === "HELP")
        {
            this.AddLog("Commands:");
            for (let i = 0; i < this.Commands.Size; i++)
                this.AddLog(`- ${this.Commands.Data[i]}`);
        }
        // else if (Stricmp(command_line, "HISTORY") === 0)
        else if (command_line.toUpperCase() === "HISTORY")
        {
            const first: number = this.History.Size - 10;
            for (let i = first > 0 ? first : 0; i < this.History.Size; i++)
                this.AddLog(`${i}: ${this.History.Data[i]}\n`);
        }
        else
        {
           this.AddLog(`Unknown command: '${command_line}'\n`);
        }

        // On commad input, we scroll to bottom even if AutoScroll==false
        this.ScrollToBottom = true;
    }

    // static const TextEditCallbackStub: number(ImGuiInputTextCallbackData* data) // In C++11 you are better off using lambdas for this sort of forwarding callbacks
    public static TextEditCallbackStub(data: ImGuiInputTextCallbackData): number
    {
        // ExampleAppConsole* console = (ExampleAppConsole*)data->UserData;
        const _console: ExampleAppConsole = data.UserData as ExampleAppConsole;
        return _console.TextEditCallback(data);
    }

    // int     TextEditCallback(ImGuiInputTextCallbackData* data)
    public TextEditCallback(data: ImGuiInputTextCallbackData): number
    {
        //AddLog("cursor: %d, selection: %d-%d", data->CursorPos, data->SelectionStart, data->SelectionEnd);
        switch (data.EventFlag)
        {
        case ImGuiInputTextFlags.CallbackCompletion:
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
        case ImGuiInputTextFlags.CallbackHistory:
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
}

function ShowExampleAppConsole(p_open: ImAccess<boolean>): void
{
    /* static */ const console: Static<ExampleAppConsole> = STATIC("console", new ExampleAppConsole());
    console.value.Draw("Example: Console", p_open);
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Debug Log / ShowExampleAppLog()
//-----------------------------------------------------------------------------

// Usage:
//  static ExampleAppLog my_log;
//  my_log.AddLog("Hello %d world\n", 123);
//  my_log.Draw("title");
class ExampleAppLog
{
    // ImGuiTextBuffer     Buf;
    public Buf: ImGuiTextBuffer = new ImGuiTextBuffer();
    // ImGuiTextFilter     Filter;
    public Filter: ImGuiTextFilter = new ImGuiTextFilter();
    // ImVector<int>       LineOffsets;        // Index to lines offset. We maintain this with AddLog() calls, allowing us to have a random access on lines
    public LineOffsets: ImVector<number> = new ImVector<number>();
    // bool                AutoScroll;
    public AutoScroll: boolean = true;
    // bool                ScrollToBottom;
    public ScrollToBottom: boolean = false;

    // void    Clear()     { Buf.clear(); LineOffsets.clear(); }
    public Clear(): void {
        this.Buf.clear();
        this.LineOffsets.clear();
        this.LineOffsets.push_back(0);
    }

    // void    AddLog(const char* fmt, ...) IM_FMTARGS(2)
    public AddLog(fmt: string): void
    {
        let old_size: number = this.Buf.size();
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

    public Draw(title: string, p_open: ImAccess<boolean>): void
    {
        ImGui.SetNextWindowSize(new ImVec2(500, 400), ImGuiCond.FirstUseEver);
        if (!ImGui.Begin(title, p_open))
        {
            ImGui.End();
            return;
        }

        // Options menu
        if (ImGui.BeginPopup("Options"))
        {
            if (ImGui.Checkbox("Auto-scroll", (value = this.AutoScroll) => this.AutoScroll = value))
                if (this.AutoScroll)
                    this.ScrollToBottom = true;
            ImGui.EndPopup();
        }

        // Main window
        if (ImGui.Button("Options"))
            ImGui.OpenPopup("Options");
        ImGui.SameLine();
        const clear: boolean = ImGui.Button("Clear");
        ImGui.SameLine();
        const copy: boolean = ImGui.Button("Copy");
        ImGui.SameLine();
        this.Filter.Draw("Filter", -100.0);

        ImGui.Separator();
        ImGui.BeginChild("scrolling", new ImVec2(0, 0), false, ImGuiWindowFlags.HorizontalScrollbar);

        if (clear)
            this.Clear();
        if (copy)
            ImGui.LogToClipboard();

        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(0, 0));
        // const char* buf = Buf.begin();
        // const char* buf_end = Buf.end();
        if (this.Filter.IsActive())
        {
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
        else
        {
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
}

// Demonstrate creating a simple log window with basic filtering.
function ShowExampleAppLog(p_open: ImAccess<boolean>): void
{
    /* static */ const log: Static<ExampleAppLog> = STATIC("log#3073", new ExampleAppLog());

    // For the demo: add a debug button _BEFORE_ the normal log window contents
    // We take advantage of a rarely used feature: multiple calls to Begin()/End() are appending to the _same_ window.
    // Most of the contents of the window will be added by the log.Draw() call.
    ImGui.SetNextWindowSize(new ImVec2(500, 400), ImGuiCond.FirstUseEver);
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
    if (ImGui.SmallButton("[Debug] Add 5 entries"))
    {
        /* static */ const counter: Static<number> = STATIC("counter", 0);
        for (let n = 0; n < 5; n++)
        {
            const categories = [ "info", "warn", "error" ];
            const words = [ "Bumfuzzled", "Cattywampus", "Snickersnee", "Abibliophobia", "Absquatulate", "Nincompoop", "Pauciloquent" ];
            // log.AddLog("[%05d] [%s] Hello, current time is %.1f, here's a word: '%s'\n",
            //     ImGui.GetFrameCount(), categories[counter % IM_ARRAYSIZE(categories)], ImGui.GetTime(), words[counter % IM_ARRAYSIZE(words)]);
            log.value.AddLog(`[${ImGui.GetFrameCount()}] [${categories[counter.value % IM_ARRAYSIZE(categories)]}] Hello, current time is ${ImGui.GetTime()}, here's a word: '${words[counter.value % IM_ARRAYSIZE(words)]}'\n`);
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
function ShowExampleAppLayout(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(500, 440), ImGuiCond.FirstUseEver);
    if (ImGui.Begin("Example: Simple Layout", p_open, ImGuiWindowFlags.MenuBar))
    {
        if (ImGui.BeginMenuBar())
        {
            if (ImGui.BeginMenu("File"))
            {
                if (ImGui.MenuItem("Close")) p_open(false);
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }

        // left
        /* static */ const selected: Static<number> = STATIC("selected#3106", 0);
        ImGui.BeginChild("left pane", new ImVec2(150, 0), true);
        for (let i = 0; i < 100; i++)
        {
            const label: string = `MyObject ${i}`;
            if (ImGui.Selectable(label, selected.value === i))
                selected.value = i;
        }
        ImGui.EndChild();
        ImGui.SameLine();

        // right
        ImGui.BeginGroup();
            ImGui.BeginChild("item view", new ImVec2(0, -ImGui.GetFrameHeightWithSpacing())); // Leave room for 1 line below us
                ImGui.Text(`MyObject: ${selected}`);
                ImGui.Separator();
                if (ImGui.BeginTabBar("##Tabs", ImGuiTabBarFlags.None))
                {
                    if (ImGui.BeginTabItem("Description"))
                    {
                        ImGui.TextWrapped("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ");
                        ImGui.EndTabItem();
                    }
                    if (ImGui.BeginTabItem("Details"))
                    {
                        ImGui.Text("ID: 0123456789");
                        ImGui.EndTabItem();
                    }
                    ImGui.EndTabBar();
                }
            ImGui.EndChild();
            if (ImGui.Button("Revert")) {}
            ImGui.SameLine();
            if (ImGui.Button("Save")) {}
        ImGui.EndGroup();
    }
    ImGui.End();
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Property Editor / ShowExampleAppPropertyEditor()
//-----------------------------------------------------------------------------

// Demonstrate create a simple property editor.
function ShowExampleAppPropertyEditor(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(430, 450), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Property editor", p_open))
    {
        ImGui.End();
        return;
    }

    HelpMarker("This example shows how you may implement a property editor using two columns.\nAll objects/fields data are dummies here.\nRemember that in many simple cases, you can use ImGui.SameLine(xxx) to position\nyour cursor horizontally instead of using the Columns() API.");

    ImGui.PushStyleVar(ImGuiStyleVar.FramePadding, new ImVec2(2, 2));
    ImGui.Columns(2);
    ImGui.Separator();

    class funcs
    {
        public static ShowDummyObject(prefix: string, uid: number): void
        {
            ImGui.PushID(uid);                      // Use object uid as identifier. Most commonly you could also use the object pointer as a base ID.
            ImGui.AlignTextToFramePadding();  // Text and Tree nodes are less high than regular widgets, here we add vertical spacing to make the tree lines equal high.
            const node_open: boolean = ImGui.TreeNode("Object", `${prefix}_${uid}`);
            ImGui.NextColumn();
            ImGui.AlignTextToFramePadding();
            ImGui.Text("my sailor is rich");
            ImGui.NextColumn();
            if (node_open)
            {
                /* static */ const dummy_members: Static<number[/*8*/]> = STATIC("dummy_members", [ 0.0, 0.0, 1.0, 3.1416, 100.0, 999.0 ]);
                for (let i = 0; i < 8; i++)
                {
                    ImGui.PushID(i); // Use field index as identifier.
                    if (i < 2)
                    {
                        funcs.ShowDummyObject("Child", 424242);
                    }
                    else
                    {
                        // Here we use a TreeNode to highlight on hover (we could use e.g. Selectable as well)
                        ImGui.AlignTextToFramePadding();
                        // ImGui.TreeNodeEx("Field", ImGuiTreeNodeFlags_Leaf | ImGuiTreeNodeFlags_NoTreePushOnOpen | ImGuiTreeNodeFlags_Bullet, "Field_%d", i);
                        ImGui.TreeNodeEx("Field", ImGuiTreeNodeFlags.Leaf | ImGuiTreeNodeFlags.NoTreePushOnOpen | ImGuiTreeNodeFlags.Bullet, `Field_${i}`);
                        ImGui.NextColumn();
                        ImGui.SetNextItemWidth(-1);
                        const ref: ImScalar<number> = [ dummy_members.value[i] || 0 ];
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
function ShowExampleAppLongText(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(520, 600), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Long text display", p_open))
    {
        ImGui.End();
        return;
    }

    /* static */ const test_type: Static<number> = STATIC("test_type", 0);
    /* static */ const log: Static<ImGuiTextBuffer> = STATIC("log#3217", new ImGuiTextBuffer());
    /* static */ const lines: Static<number> = STATIC("lines#3218", 0);
    ImGui.Text("Printing unusually long amount of text.");
    ImGui.Combo("Test type", (value = test_type.value) => test_type.value = value, "Single call to TextUnformatted()\0Multiple calls to Text(), clipped manually\0Multiple calls to Text(), not clipped (slow)\0");
    ImGui.Text(`Buffer contents: ${lines.value} lines, ${log.value.size()} bytes`);
    if (ImGui.Button("Clear")) { log.value.clear(); lines.value = 0; }
    ImGui.SameLine();
    if (ImGui.Button("Add 1000 lines"))
    {
        for (let i = 0; i < 1000; i++)
            log.value.append(`${lines.value + i} The quick brown fox jumps over the lazy dog\n`);
        lines.value += 1000;
    }
    ImGui.BeginChild("Log");
    switch (test_type.value)
    {
    case 0:
        // Single call to TextUnformatted() with a big buffer
        // ImGui.TextUnformatted(log.begin(), log.end());
        ImGui.TextUnformatted(log.value.begin());
        break;
    case 1:
        {
            // Multiple calls to Text(), manually coarsely clipped - demonstrate how to use the ImGuiListClipper helper.
            ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(0, 0));
            const clipper: ImGuiListClipper = new ImGuiListClipper();
            clipper.Begin(lines.value);
            while (clipper.Step())
                for (let i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
                    ImGui.Text(`${i} The quick brown fox jumps over the lazy dog`);
            // clipper.delete(); // NOTE: native emscripten class
            ImGui.PopStyleVar();
            break;
        }
    case 2:
        // Multiple calls to Text(), not clipped (slow)
        ImGui.PushStyleVar(ImGuiStyleVar.ItemSpacing, new ImVec2(0, 0));
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
function ShowExampleAppAutoResize(p_open: ImAccess<boolean>): void
{
    if (!ImGui.Begin("Example: Auto-resizing window", p_open, ImGui.WindowFlags.AlwaysAutoResize))
    {
        ImGui.End();
        return;
    }

    /* static */ const lines: Static<number> = STATIC("lines#2447", 10);
    ImGui.Text("Window will resize every-frame to the size of its content.\nNote that you probably don't want to query the window size to\noutput your content because that would create a feedback loop.");
    ImGui.SliderInt("Number of lines", (value = lines.value) => lines.value = value, 1, 20);
    for (let i = 0; i < lines.value; i++)
        ImGui.Text(" ".repeat(i * 4) +  `This is line ${i}`); // Pad with space to extend size horizontally
    ImGui.End();
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Constrained Resize / ShowExampleAppConstrainedResize()
//-----------------------------------------------------------------------------

// Demonstrate creating a window with custom resize constraints.
function ShowExampleAppConstrainedResize(p_open: ImAccess<boolean>): void
{
    class CustomConstraints // Helper functions to demonstrate programmatic constraints
    {
        public static Square(data: ImGuiSizeCallbackData): void {
            data.DesiredSize.x = data.DesiredSize.y = IM_MAX(data.DesiredSize.x, data.DesiredSize.y);
        }
        public static Step(data: ImGuiSizeCallbackData): void {
            const step: number = data.UserData;
            data.DesiredSize.x = Math.floor(data.DesiredSize.x / step + 0.5) * step;
            data.DesiredSize.y = Math.floor(data.DesiredSize.y / step + 0.5) * step;
        }
    }

    /* static */ const auto_resize: Static<boolean> = STATIC("auto_resize", false);
    /* static */ const type: Static<number> = STATIC("type", 0);
    /* static */ const display_lines: Static<number> = STATIC("display_lines", 10);
    if (type.value === 0) ImGui.SetNextWindowSizeConstraints(new ImVec2(-1, 0),    new ImVec2(-1, Number.MAX_VALUE));      // Vertical only
    if (type.value === 1) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, -1),    new ImVec2(Number.MAX_VALUE, -1));      // Horizontal only
    if (type.value === 2) ImGui.SetNextWindowSizeConstraints(new ImVec2(100, 100), new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE)); // Width > 100, Height > 100
    if (type.value === 3) ImGui.SetNextWindowSizeConstraints(new ImVec2(400, -1),  new ImVec2(500, -1));          // Width 400-500
    if (type.value === 4) ImGui.SetNextWindowSizeConstraints(new ImVec2(-1, 400),  new ImVec2(-1, 500));          // Height 400-500
    if (type.value === 5) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, 0),     new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Square);   // Always Square
    if (type.value === 6) ImGui.SetNextWindowSizeConstraints(new ImVec2(0, 0),     new ImVec2(Number.MAX_VALUE, Number.MAX_VALUE), CustomConstraints.Step, 100); // Fixed Step

    const flags: ImGuiWindowFlags = auto_resize.value ? ImGuiWindowFlags.AlwaysAutoResize : 0;
    if (ImGui.Begin("Example: Constrained Resize", p_open, flags))
    {
        const desc: string[] = [
            "Resize vertical only",
            "Resize horizontal only",
            "Width > 100, Height > 100",
            "Width 400-500",
            "Height 400-500",
            "Custom: Always Square",
            "Custom: Fixed Steps (100)",
        ];
        if (ImGui.Button("200x200")) { ImGui.SetWindowSize(new ImVec2(200, 200)); } ImGui.SameLine();
        if (ImGui.Button("500x500")) { ImGui.SetWindowSize(new ImVec2(500, 500)); } ImGui.SameLine();
        if (ImGui.Button("800x200")) { ImGui.SetWindowSize(new ImVec2(800, 200)); }
        ImGui.SetNextItemWidth(200);
        ImGui.Combo("Constraint", (value = type.value) => type.value = value, desc, IM_ARRAYSIZE(desc));
        ImGui.SetNextItemWidth(200);
        ImGui.DragInt("Lines", (value = display_lines.value) => display_lines.value = value, 0.2, 1, 100);
        ImGui.Checkbox("Auto-resize", (value = auto_resize.value) => auto_resize.value = value);
        for (let i = 0; i < display_lines.value; i++)
            ImGui.Text(" ".repeat(i * 4) +  "Hello, sailor! Making this line long enough for the example.");
    }
    ImGui.End();
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Simple Overlay / ShowExampleAppSimpleOverlay()
//-----------------------------------------------------------------------------

// Demonstrate creating a simple static window with no decoration + a context-menu to choose which corner of the screen to use.
function ShowExampleAppSimpleOverlay(p_open: ImAccess<boolean>): void
{
    const DISTANCE: number = 10.0;
    /* static */ const corner: Static<number> = STATIC("corner", 0);
    const io: ImGuiIO = ImGui.GetIO();
    if (corner.value !== -1)
    {
        const window_pos: Readonly<ImVec2> = new ImVec2((corner.value & 1) ? io.DisplaySize.x - DISTANCE : DISTANCE, (corner.value & 2) ? io.DisplaySize.y - DISTANCE : DISTANCE);
        const window_pos_pivot: Readonly<ImVec2> = new ImVec2((corner.value & 1) ? 1.0 : 0.0, (corner.value & 2) ? 1.0 : 0.0);
        ImGui.SetNextWindowPos(window_pos, ImGuiCond.Always, window_pos_pivot);
    }
    ImGui.SetNextWindowBgAlpha(0.35); // Transparent background
    if (ImGui.Begin("Example: Simple overlay", p_open, (corner.value !== -1 ? ImGuiWindowFlags.NoMove : 0) | ImGuiWindowFlags.NoDecoration | ImGuiWindowFlags.AlwaysAutoResize | ImGuiWindowFlags.NoSavedSettings))
    {
        ImGui.Text("Simple overlay\nin the corner of the screen.\n(right-click to change position)");
        ImGui.Separator();
        if (ImGui.IsMousePosValid())
            ImGui.Text(`Mouse Position: (${io.MousePos.x.toFixed(1)},${io.MousePos.y.toFixed(1)})`);
        else
            ImGui.Text("Mouse Position: <invalid>");
        if (ImGui.BeginPopupContextWindow())
        {
            if (ImGui.MenuItem("Custom", null, corner.value === -1)) corner.value = -1;
            if (ImGui.MenuItem("Top-left", null, corner.value === 0)) corner.value = 0;
            if (ImGui.MenuItem("Top-right", null, corner.value === 1)) corner.value = 1;
            if (ImGui.MenuItem("Bottom-left", null, corner.value === 2)) corner.value = 2;
            if (ImGui.MenuItem("Bottom-right", null, corner.value === 3)) corner.value = 3;
            if (p_open() && ImGui.MenuItem("Close")) p_open(false);
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
function ShowExampleAppWindowTitles(p_open: ImAccess<boolean>): void
{
    // By default, Windows are uniquely identified by their title.
    // You can use the "##" and "###" markers to manipulate the display/ID.

    // Using "##" to display same title but have unique identifier.
    ImGui.SetNextWindowPos(new ImVec2(100, 100), ImGuiCond.FirstUseEver);
    ImGui.Begin("Same title as another window##1");
    ImGui.Text("This is window 1.\nMy title is the same as window 2, but my identifier is unique.");
    ImGui.End();

    ImGui.SetNextWindowPos(new ImVec2(100, 200), ImGuiCond.FirstUseEver);
    ImGui.Begin("Same title as another window##2");
    ImGui.Text("This is window 2.\nMy title is the same as window 1, but my identifier is unique.");
    ImGui.End();

    // Using "###" to display a changing title but keep a static identifier "AnimatedTitle"
    const buf: string = `Animated title ${"|/-\\".charAt((ImGui.GetTime() / 0.25) & 3)} ${ImGui.GetFrameCount()}###AnimatedTitle`;
    ImGui.SetNextWindowPos(new ImVec2(100, 300), ImGuiCond.FirstUseEver);
    ImGui.Begin(buf);
    ImGui.Text("This window has a changing title.");
    ImGui.End();
}

//-----------------------------------------------------------------------------
// [SECTION] Example App: Custom Rendering using ImDrawList API / ShowExampleAppCustomRendering()
//-----------------------------------------------------------------------------

// Demonstrate using the low-level ImDrawList to draw custom shapes.
function ShowExampleAppCustomRendering(p_open: ImAccess<boolean>): void
{
    ImGui.SetNextWindowSize(new ImVec2(350, 560), ImGuiCond.FirstUseEver);
    if (!ImGui.Begin("Example: Custom rendering", p_open))
    {
        ImGui.End();
        return;
    }

    // Tip: If you do a lot of custom rendering, you probably want to use your own geometrical types and benefit of overloaded operators, etc.
    // Define IM_VEC2_CLASS_EXTRA in imconfig.h to create implicit conversions between your types and ImVec2/ImVec4.
    // ImGui defines overloaded operators but they are internal to imgui.cpp and not exposed outside (to avoid messing with your types)
    // In this example we are not using the maths operators!
    const draw_list: ImDrawList = ImGui.GetWindowDrawList();

    if (ImGui.BeginTabBar("##TabBar"))
    {
        // Primitives
        if (ImGui.BeginTabItem("Primitives"))
        {
            /* static */ const sz: Static<number> = STATIC("sz", 36.0);
            /* static */ const thickness: Static<number> = STATIC("thickness", 4.0);
            /* static */ const col: Static<ImVec4> = STATIC("color#2583", new ImVec4(1.0, 1.0, 0.4, 1.0));
            ImGui.DragFloat("Size", (value = sz.value) => sz.value = value, 0.2, 2.0, 72.0, "%.0f");
            ImGui.DragFloat("Thickness", (value = thickness.value) => thickness.value = value, 0.05, 1.0, 8.0, "%.02f");
            ImGui.ColorEdit3("Color", col.value);
            {
                const p: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
                const col32: ImU32 = IM_COL32(col.value.x * 255, col.value.y * 255, col.value.z * 255, col.value.w * 255);
                let x: number = p.x + 4.0, y: number = p.y + 4.0; const spacing: number = 8.0;
                for (let n = 0; n < 2; n++)
                {
                    const curr_thickness: number = (n === 0) ? 1.0 : thickness.value;
                    draw_list.AddCircle(new ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 20, curr_thickness); x += sz.value + spacing;
                    draw_list.AddRect(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, 0.0, ImDrawCornerFlags.All, curr_thickness); x += sz.value + spacing;
                    draw_list.AddRect(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, 10.0, ImDrawCornerFlags.All, curr_thickness); x += sz.value + spacing;
                    draw_list.AddRect(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, 10.0, ImDrawCornerFlags.TopLeft | ImDrawCornerFlags.BotRight, curr_thickness); x += sz.value + spacing;
                    draw_list.AddTriangle(new ImVec2(x + sz.value * 0.5, y), new ImVec2(x + sz.value, y + sz.value - 0.5), new ImVec2(x, y + sz.value - 0.5), col32, curr_thickness); x += sz.value + spacing;
                    draw_list.AddLine(new ImVec2(x, y), new ImVec2(x + sz.value, y           ), col32, curr_thickness); x += sz.value + spacing; // Horizontal line (note: drawing a filled rectangle will be faster!)
                    draw_list.AddLine(new ImVec2(x, y), new ImVec2(x,            y + sz.value), col32, curr_thickness); x += spacing;            // Vertical line (note: drawing a filled rectangle will be faster!)
                    draw_list.AddLine(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, curr_thickness); x += sz.value + spacing; // Diagonal line
                    draw_list.AddBezierCurve(new ImVec2(x, y), new ImVec2(x + sz.value * 1.3, y + sz.value * 0.3), new ImVec2(x + sz.value - sz.value * 1.3, y + sz.value - sz.value * 0.3), new ImVec2(x + sz.value, y + sz.value), col32, curr_thickness);
                    x = p.x + 4;
                    y += sz.value + spacing;
                }
                draw_list.AddCircleFilled(new ImVec2(x + sz.value * 0.5, y + sz.value * 0.5), sz.value * 0.5, col32, 32); x += sz.value + spacing;
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32); x += sz.value + spacing;
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, 10.0); x += sz.value + spacing;
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), col32, 10.0, ImDrawCornerFlags.TopLeft | ImDrawCornerFlags.BotRight); x += sz.value + spacing;
                draw_list.AddTriangleFilled(new ImVec2(x + sz.value * 0.5, y), new ImVec2(x + sz.value, y + sz.value - 0.5), new ImVec2(x, y + sz.value - 0.5), col32); x += sz.value + spacing;
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + sz.value, y + thickness.value), col32); x += sz.value + spacing; // Horizontal line (faster than AddLine, but only handle integer thickness)
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + thickness.value, y + sz.value), col32); x += spacing + spacing;  // Vertical line (faster than AddLine, but only handle integer thickness)
                draw_list.AddRectFilled(new ImVec2(x, y), new ImVec2(x + 1, y + 1), col32);                      x += sz.value;           // Pixel (faster than AddLine)
                draw_list.AddRectFilledMultiColor(new ImVec2(x, y), new ImVec2(x + sz.value, y + sz.value), IM_COL32(0, 0, 0), IM_COL32(255, 0, 0), IM_COL32(255, 255, 0), IM_COL32(0, 255, 0));
                ImGui.Dummy(new ImVec2((sz.value + spacing) * 8, (sz.value + spacing) * 3));
            }
            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Canvas"))
        {
            /* static */ const points: Static<ImVector<ImVec2>> = STATIC("points", new ImVector<ImVec2>());
            /* static */ const adding_line: Static<boolean> = STATIC("adding_line", false);
            if (ImGui.Button("Clear")) points.value.clear();
            if (points.value.Size >= 2) { ImGui.SameLine(); if (ImGui.Button("Undo")) { points.value.pop_back(); points.value.pop_back(); } }
            ImGui.Text("Left-click and drag to add lines,\nRight-click to undo");

            // Here we are using InvisibleButton() as a convenience to 1) advance the cursor and 2) allows us to use IsItemHovered()
            // But you can also draw directly and poll mouse/keyboard by yourself. You can manipulate the cursor using GetCursorPos() and SetCursorPos().
            // If you only use the ImDrawList API, you can notify the owner window of its extends by using SetCursorPos(max).
            const canvas_pos: ImVec2 = ImGui.GetCursorScreenPos();            // ImDrawList API uses screen coordinates!
            const canvas_size: ImVec2 = ImGui.GetContentRegionAvail();        // Resize canvas to what's available
            if (canvas_size.x < 50.0) canvas_size.x = 50.0;
            if (canvas_size.y < 50.0) canvas_size.y = 50.0;
            draw_list.AddRectFilledMultiColor(canvas_pos, new ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), IM_COL32(50, 50, 50), IM_COL32(50, 50, 60), IM_COL32(60, 60, 70), IM_COL32(50, 50, 60));
            draw_list.AddRect(canvas_pos, new ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), IM_COL32(255, 255, 255));

            let adding_preview: boolean = false;
            ImGui.InvisibleButton("canvas", canvas_size);
            const mouse_pos_in_canvas: ImVec2 = new ImVec2(ImGui.GetIO().MousePos.x - canvas_pos.x, ImGui.GetIO().MousePos.y - canvas_pos.y);
            if (adding_line.value)
            {
                adding_preview = true;
                points.value.push_back(mouse_pos_in_canvas);
                if (!ImGui.IsMouseDown(0))
                    adding_line.value = adding_preview = false;
            }
            if (ImGui.IsItemHovered())
            {
                if (!adding_line.value && ImGui.IsMouseClicked(0))
                {
                    points.value.push_back(mouse_pos_in_canvas);
                    adding_line.value = true;
                }
                if (ImGui.IsMouseClicked(1) && !points.value.empty())
                {
                    adding_line.value = adding_preview = false;
                    points.value.pop_back();
                    points.value.pop_back();
                }
            }
            draw_list.PushClipRect(canvas_pos, new ImVec2(canvas_pos.x + canvas_size.x, canvas_pos.y + canvas_size.y), true);      // clip lines within the canvas (if we resize it, etc.)
            for (let i = 0; i < points.value.Size - 1; i += 2)
                draw_list.AddLine(new ImVec2(canvas_pos.x + points.value.Data[i].x, canvas_pos.y + points.value.Data[i].y), new ImVec2(canvas_pos.x + points.value.Data[i + 1].x, canvas_pos.y + points.value.Data[i + 1].y), IM_COL32(255, 255, 0, 255), 2.0);
            draw_list.PopClipRect();
            if (adding_preview)
                points.value.pop_back();
            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("BG/FG draw lists"))
        {
            /* static */ const draw_bg: Static<boolean> = STATIC("draw_bg", true);
            /* static */ const draw_fg: Static<boolean> = STATIC("draw_fg", true);
            ImGui.Checkbox("Draw in Background draw list", (value = draw_bg.value) => draw_bg.value = value);
            ImGui.Checkbox("Draw in Foreground draw list", (value = draw_fg.value) => draw_fg.value = value);
            const window_pos: ImVec2 = ImGui.GetWindowPos();
            const window_size: ImVec2 = ImGui.GetWindowSize();
            const window_center: ImVec2 = new ImVec2(window_pos.x + window_size.x * 0.5, window_pos.y + window_size.y * 0.5);
            if (draw_bg.value)
                ImGui.GetBackgroundDrawList().AddCircle(window_center, window_size.x * 0.6, IM_COL32(255, 0, 0, 200), 32, 10+4);
            if (draw_fg.value)
                ImGui.GetForegroundDrawList().AddCircle(window_center, window_size.y * 0.6, IM_COL32(0, 255, 0, 200), 32, 10);
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
function ShowExampleAppDocuments(p_open: ImAccess<boolean>): void
{
    // static ExampleAppDocuments app;

    // // Options
    // static bool opt_reorderable = true;
    // static ImGuiTabBarFlags opt_fitting_flags = ImGuiTabBarFlags_FittingPolicyDefault_;

    if (!ImGui.Begin("Example: Documents", p_open, ImGuiWindowFlags.MenuBar))
    {
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

function ShowBackendCheckerWindow(p_open: ImAccess<boolean>): void
{
    if (!ImGui.Begin("Dear ImGui Backend Checker", p_open))
    {
        ImGui.End();
        return;
    }

    const io: ImGuiIO = ImGui.GetIO();
    ImGui.Text(`Dear ImGui ${ImGui.GetVersion()} Backend Checker`);
    ImGui.Text(`io.BackendPlatformName: ${io.BackendPlatformName ? io.BackendPlatformName : "NULL"}`);
    ImGui.Text(`io.BackendRendererName: ${io.BackendRendererName ? io.BackendRendererName : "NULL"}`);
    ImGui.Separator();
    
    if (ImGui.TreeNode("0001: Renderer: Large Mesh Support"))
    {
        const draw_list: ImGui.ImDrawList = ImGui.GetWindowDrawList();
        {
            /* static */ const vtx_count: Static<number> = STATIC("vtx_count#4821", 60000);
            // ImGui.SliderInt("VtxCount##1", &vtx_count, 0, 100000);
            ImGui.SliderInt("VtxCount##1", (_ = vtx_count.value) => vtx_count.value = _, 0, 100000);
            const p: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
            for (let n = 0; n < vtx_count.value / 4; n++)
            {
                // float off_x = (float)(n % 100) * 3.0f;
                const off_x = (n % 100) * 3.0;
                // float off_y = (float)(n % 100) * 1.0f;
                const off_y = (n % 100) * 1.0;
                // ImU32 col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                const col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                // draw_list->AddRectFilled(ImVec2(p.x + off_x, p.y + off_y), ImVec2(p.x + off_x + 50, p.y + off_y + 50), col);
                draw_list.AddRectFilled(new ImVec2(p.x + off_x, p.y + off_y), new ImVec2(p.x + off_x + 50, p.y + off_y + 50), col);
            }
            ImGui.Dummy(new ImVec2(300 + 50, 100 + 50));
            // ImGui.Text("VtxBuffer.Size = %d", draw_list->VtxBuffer.Size);
            ImGui.Text(`VtxBuffer = ${draw_list.VtxBuffer.length}`);
        }
        {
            /* static */ const vtx_count: Static<number> = STATIC("vtx_count#4841", 60000);
            // ImGui.SliderInt("VtxCount##2", &vtx_count, 0, 100000);
            ImGui.SliderInt("VtxCount##2", (_ = vtx_count.value) => vtx_count.value = _, 0, 100000);
            const p: Readonly<ImVec2> = ImGui.GetCursorScreenPos();
            for (let n = 0; n < vtx_count.value / (10*4); n++)
            {
                // float off_x = (float)(n % 100) * 3.0f;
                const off_x = (n % 100) * 3.0;
                // float off_y = (float)(n % 100) * 1.0f;
                const off_y = (n % 100) * 1.0;
                // ImU32 col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                const col = IM_COL32(((n * 17) & 255), ((n * 59) & 255), ((n * 83) & 255), 255);
                // draw_list->AddText(ImVec2(p.x + off_x, p.y + off_y), col, "ABCDEFGHIJ");
                draw_list.AddText(new ImVec2(p.x + off_x, p.y + off_y), col, "ABCDEFGHIJ");
            }
            ImGui.Dummy(new ImVec2(300 + 50, 100 + 20));
            // ImGui.Text("VtxBuffer.Size = %d", draw_list->VtxBuffer.Size);
            ImGui.Text(`VtxBuffer = ${draw_list.VtxBuffer.length}`);
        }
        ImGui.TreePop();
    }

    ImGui.End();
}

// End of Demo code
// #else

// export function ShowAboutWindow(p_open: ImAccess<boolean>): void {}
// export function ShowDemoWindow(p_open: ImAccess<boolean>): void {}
// export function ShowUserGuide(): void {}
// export function ShowStyleSelector(label: string): boolean { return false; }
// export function ShowFontSelector(label: string): void {}
// export function ShowStyleEditor(ref: ImGuiStyle | null = null): void {}

// #endif
