//-----------------------------------------------------------------------------
// COMPILE-TIME OPTIONS FOR DEAR IMGUI
// Most options (memory allocation, clipboard callbacks, etc.) can be set at runtime via the ImGuiIO structure - ImGui::GetIO().
//-----------------------------------------------------------------------------
// A) You may edit imconfig.h (and not overwrite it when updating imgui, or maintain a patch/branch with your modifications to imconfig.h)
// B) or add configuration directives in your own file and compile with #define IMGUI_USER_CONFIG "myfilename.h"
// If you do so you need to make sure that configuration settings are defined consistently _everywhere_ dear imgui is used, which include
// the imgui*.cpp files but also _any_ of your code that uses imgui. This is because some compile-time options have an affect on data structures.
// Defining those options in imconfig.h will ensure every compilation unit gets to see the same data structure layouts.
// Call IMGUI_CHECKVERSION() from your .cpp files to verify that the data structures your files are using are matching the ones imgui.cpp is using.
//-----------------------------------------------------------------------------
System.register([], function (exports_1, context_1) {
    "use strict";
    var IMGUI_USE_BGRA_PACKED_COLOR;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            // #pragma once
            //---- Define assertion handler. Defaults to calling assert().
            //#define IM_ASSERT(_EXPR)  MyAssert(_EXPR)
            //#define IM_ASSERT(_EXPR)  ((void)(_EXPR))     // Disable asserts
            //---- Define attributes of all API symbols declarations, e.g. for DLL under Windows.
            //#define IMGUI_API __declspec( dllexport )
            //#define IMGUI_API __declspec( dllimport )
            //---- Don't define obsolete functions names. Consider enabling from time to time or when updating to reduce likelihood of using already obsolete function/names.
            //#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS
            //---- Don't implement demo windows functionality (ShowDemoWindow()/ShowStyleEditor()/ShowUserGuide() methods will be empty)
            //---- It is very strongly recommended to NOT disable the demo windows. Please read the comment at the top of imgui_demo.cpp.
            //#define IMGUI_DISABLE_DEMO_WINDOWS
            //---- Don't implement some functions to reduce linkage requirements.
            //#define IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS   // Don't use and link with OpenClipboard/GetClipboardData/CloseClipboard etc.
            //#define IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS         // Don't use and link with ImmGetContext/ImmSetCompositionWindow.
            //#define IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS             // Don't implement ImFormatString/ImFormatStringV so you can implement them yourself if you don't want to link with vsnprintf.
            //#define IMGUI_DISABLE_MATH_FUNCTIONS                      // Don't implement ImFabs/ImSqrt/ImPow/ImFmod/ImCos/ImSin/ImAcos/ImAtan2 wrapper so you can implement them yourself. Declare your prototypes in imconfig.h.
            //#define IMGUI_DISABLE_DEFAULT_ALLOCATORS                  // Don't implement default allocators calling malloc()/free(). You will need to call ImGui::SetAllocatorFunctions().
            //---- Include imgui_user.h at the end of imgui.h as a convenience
            //#define IMGUI_INCLUDE_IMGUI_USER_H
            //---- Pack colors to BGRA8 instead of RGBA8 (if you needed to convert from one to another anyway)
            //#define IMGUI_USE_BGRA_PACKED_COLOR
            exports_1("IMGUI_USE_BGRA_PACKED_COLOR", IMGUI_USE_BGRA_PACKED_COLOR = false);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrRUFBK0U7QUFDL0Usc0NBQXNDO0FBQ3RDLGdJQUFnSTtBQUNoSSwrRUFBK0U7QUFDL0UsMElBQTBJO0FBQzFJLGdIQUFnSDtBQUNoSCx5SUFBeUk7QUFDekksaUpBQWlKO0FBQ2pKLHVIQUF1SDtBQUN2SCxtSkFBbUo7QUFDbkosK0VBQStFOzs7Ozs7OztZQUUvRSxlQUFlO1lBRWYsOERBQThEO1lBQzlELDJDQUEyQztZQUMzQyxrRUFBa0U7WUFFbEUscUZBQXFGO1lBQ3JGLDJDQUEyQztZQUMzQywyQ0FBMkM7WUFFM0MsaUtBQWlLO1lBQ2pLLDBDQUEwQztZQUUxQyw0SEFBNEg7WUFDNUgsNkhBQTZIO1lBQzdILG9DQUFvQztZQUVwQyxxRUFBcUU7WUFDckUseUlBQXlJO1lBQ3pJLDZIQUE2SDtZQUM3SCwwTEFBMEw7WUFDMUwsdU5BQXVOO1lBQ3ZOLGdMQUFnTDtZQUVoTCxrRUFBa0U7WUFDbEUsb0NBQW9DO1lBRXBDLGtHQUFrRztZQUNsRyxxQ0FBcUM7WUFDckMseUNBQWEsMkJBQTJCLEdBQVksS0FBSyxFQUFDIn0=