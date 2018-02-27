//-----------------------------------------------------------------------------
// COMPILE-TIME OPTIONS FOR DEAR IMGUI
// Most options (memory allocation, clipboard callbacks, etc.) can be set at runtime via the ImGuiIO structure - ImGui::GetIO().
//-----------------------------------------------------------------------------
// A) You may edit imconfig.h (and not overwrite it when updating imgui, or maintain a patch/branch with your modifications to imconfig.h)
// B) or add configuration directives in your own file and compile with #define IMGUI_USER_CONFIG "myfilename.h"
// Note that options such as IMGUI_API, IM_VEC2_CLASS_EXTRA or ImDrawIdx needs to be defined consistently everywhere you include imgui.h, not only for the imgui*.cpp compilation units.
//-----------------------------------------------------------------------------
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IMGUI_USE_BGRA_PACKED_COLOR;
    return {
        setters: [],
        execute: function () {
            // #pragma once
            //---- Define assertion handler. Defaults to calling assert().
            //#define IM_ASSERT(_EXPR)  MyAssert(_EXPR)
            //---- Define attributes of all API symbols declarations, e.g. for DLL under Windows.
            //#define IMGUI_API __declspec( dllexport )
            //#define IMGUI_API __declspec( dllimport )
            //---- Don't define obsolete functions names. Consider enabling from time to time or when updating to reduce likelihood of using already obsolete function/names
            //#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS
            //---- Don't implement default handlers for Windows (so as not to link with certain functions)
            //#define IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS   // Don't use and link with OpenClipboard/GetClipboardData/CloseClipboard etc.
            //#define IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS         // Don't use and link with ImmGetContext/ImmSetCompositionWindow.
            //---- Don't implement demo windows functionality (ShowDemoWindow()/ShowStyleEditor()/ShowUserGuide() methods will be empty)
            //---- It is very strongly recommended to NOT disable the demo windows. Please read the comment at the top of imgui_demo.cpp.
            //#define IMGUI_DISABLE_DEMO_WINDOWS
            //---- Don't implement ImFormatString(), ImFormatStringV() so you can reimplement them yourself.
            //#define IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS
            //---- Include imgui_user.h at the end of imgui.h as a convenience
            //#define IMGUI_INCLUDE_IMGUI_USER_H
            //---- Pack colors to BGRA8 instead of RGBA8 (if you needed to convert from one to another anyway)
            //#define IMGUI_USE_BGRA_PACKED_COLOR
            exports_1("IMGUI_USE_BGRA_PACKED_COLOR", IMGUI_USE_BGRA_PACKED_COLOR = false);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrRUFBK0U7QUFDL0Usc0NBQXNDO0FBQ3RDLGdJQUFnSTtBQUNoSSwrRUFBK0U7QUFDL0UsMElBQTBJO0FBQzFJLGdIQUFnSDtBQUNoSCx3TEFBd0w7QUFDeEwsK0VBQStFOzs7Ozs7OztZQUUvRSxlQUFlO1lBRWYsOERBQThEO1lBQzlELDJDQUEyQztZQUUzQyxxRkFBcUY7WUFDckYsMkNBQTJDO1lBQzNDLDJDQUEyQztZQUUzQyxnS0FBZ0s7WUFDaEssMENBQTBDO1lBRTFDLDhGQUE4RjtZQUM5Rix5SUFBeUk7WUFDekksNkhBQTZIO1lBRTdILDRIQUE0SDtZQUM1SCw2SEFBNkg7WUFDN0gsb0NBQW9DO1lBRXBDLGdHQUFnRztZQUNoRywrQ0FBK0M7WUFFL0Msa0VBQWtFO1lBQ2xFLG9DQUFvQztZQUVwQyxrR0FBa0c7WUFDbEcscUNBQXFDO1lBQ3JDLHlDQUFhLDJCQUEyQixHQUFZLEtBQUssRUFBQyJ9