"use strict";
//-----------------------------------------------------------------------------
// COMPILE-TIME OPTIONS FOR DEAR IMGUI
// Most options (memory allocation, clipboard callbacks, etc.) can be set at runtime via the ImGuiIO structure - ImGui::GetIO().
//-----------------------------------------------------------------------------
// A) You may edit imconfig.h (and not overwrite it when updating imgui, or maintain a patch/branch with your modifications to imconfig.h)
// B) or add configuration directives in your own file and compile with #define IMGUI_USER_CONFIG "myfilename.h" 
// Note that options such as IMGUI_API, IM_VEC2_CLASS_EXTRA or ImDrawIdx needs to be defined consistently everywhere you include imgui.h, not only for the imgui*.cpp compilation units.
//-----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.IMGUI_USE_BGRA_PACKED_COLOR = false;
//---- Implement STB libraries in a namespace to avoid linkage conflicts (defaults to global namespace)
//#define IMGUI_STB_NAMESPACE     ImGuiStb
//---- Define constructor and implicit cast operators to convert back<>forth from your math types and ImVec2/ImVec4.
// This will be inlined as part of ImVec2 and ImVec4 class declarations.
/*
#define IM_VEC2_CLASS_EXTRA                                                 \
        ImVec2(const MyVec2& f) { x = f.x; y = f.y; }                       \
        operator MyVec2() const { return MyVec2(x,y); }

#define IM_VEC4_CLASS_EXTRA                                                 \
        ImVec4(const MyVec4& f) { x = f.x; y = f.y; z = f.z; w = f.w; }     \
        operator MyVec4() const { return MyVec4(x,y,z,w); }
*/
//---- Use 32-bit vertex indices (instead of default 16-bit) to allow meshes with more than 64K vertices. Render function needs to support it.
//#define ImDrawIdx unsigned int
//---- Tip: You can add extra functions within the ImGui:: namespace, here or in your own headers files.
/*
namespace ImGui
{
    void MyFunction(const char* name, const MyMatrix44& v);
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0VBQStFO0FBQy9FLHNDQUFzQztBQUN0QyxnSUFBZ0k7QUFDaEksK0VBQStFO0FBQy9FLDBJQUEwSTtBQUMxSSxpSEFBaUg7QUFDakgsd0xBQXdMO0FBQ3hMLCtFQUErRTs7QUFFL0UsZUFBZTtBQUVmLDhEQUE4RDtBQUM5RCwyQ0FBMkM7QUFFM0MscUZBQXFGO0FBQ3JGLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFFM0MsZ0tBQWdLO0FBQ2hLLDBDQUEwQztBQUUxQyw4RkFBOEY7QUFDOUYseUlBQXlJO0FBQ3pJLDZIQUE2SDtBQUU3SCw0SEFBNEg7QUFDNUgsNkhBQTZIO0FBQzdILG9DQUFvQztBQUVwQyxnR0FBZ0c7QUFDaEcsK0NBQStDO0FBRS9DLGtFQUFrRTtBQUNsRSxvQ0FBb0M7QUFFcEMsa0dBQWtHO0FBQ2xHLHFDQUFxQztBQUN4QixRQUFBLDJCQUEyQixHQUFZLEtBQUssQ0FBQztBQUUxRCx1R0FBdUc7QUFDdkcsMENBQTBDO0FBRTFDLG9IQUFvSDtBQUNwSCx3RUFBd0U7QUFDeEU7Ozs7Ozs7O0VBUUU7QUFFRiw4SUFBOEk7QUFDOUksZ0NBQWdDO0FBRWhDLHdHQUF3RztBQUN4Rzs7Ozs7RUFLRSJ9