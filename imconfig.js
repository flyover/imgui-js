"use strict";
//-----------------------------------------------------------------------------
// USER IMPLEMENTATION
// This file contains compile-time options for ImGui.
// Other options (memory allocation overrides, callbacks, etc.) can be set at runtime via the ImGuiIO structure - ImGui::GetIO().
//-----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// #pragma once
//---- Define assertion handler. Defaults to calling assert().
//#define IM_ASSERT(_EXPR)  MyAssert(_EXPR)
//---- Define attributes of all API symbols declarations, e.g. for DLL under Windows.
//#define IMGUI_API __declspec( dllexport )
//#define IMGUI_API __declspec( dllimport )
//---- Don't define obsolete functions names. Consider enabling from time to time or when updating to reduce like hood of using already obsolete function/names
//#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS
//---- Include imgui_user.h at the end of imgui.h
//#define IMGUI_INCLUDE_IMGUI_USER_H
//---- Don't implement default handlers for Windows (so as not to link with OpenClipboard() and others Win32 functions)
//#define IMGUI_DISABLE_WIN32_DEFAULT_CLIPBOARD_FUNCTIONS
//#define IMGUI_DISABLE_WIN32_DEFAULT_IME_FUNCTIONS
//---- Don't implement demo windows functionality (ShowDemoWindow()/ShowStyleEditor()/ShowUserGuide() methods will be empty)
//---- It is very strongly recommended to NOT disable the demo windows. Please read the comment at the top of imgui_demo.cpp to learn why.
//#define IMGUI_DISABLE_DEMO_WINDOWS
//---- Don't implement ImFormatString(), ImFormatStringV() so you can reimplement them yourself.
//#define IMGUI_DISABLE_FORMAT_STRING_FUNCTIONS
//---- Pack colors to BGRA instead of RGBA (remove need to post process vertex buffer in back ends)
//#define IMGUI_USE_BGRA_PACKED_COLOR
exports.IMGUI_USE_BGRA_PACKED_COLOR = false;
//---- Implement STB libraries in a namespace to avoid linkage conflicts
//#define IMGUI_STB_NAMESPACE     ImGuiStb
//---- Define constructor and implicit cast operators to convert back<>forth from your math types and ImVec2/ImVec4.
/*
#define IM_VEC2_CLASS_EXTRA                                                 \
        ImVec2(const MyVec2& f) { x = f.x; y = f.y; }                       \
        operator MyVec2() const { return MyVec2(x,y); }

#define IM_VEC4_CLASS_EXTRA                                                 \
        ImVec4(const MyVec4& f) { x = f.x; y = f.y; z = f.z; w = f.w; }     \
        operator MyVec4() const { return MyVec4(x,y,z,w); }
*/
//---- Use 32-bit vertex indices (instead of default: 16-bit) to allow meshes with more than 64K vertices
//#define ImDrawIdx unsigned int
//---- Tip: You can add extra functions within the ImGui:: namespace, here or in your own headers files.
//---- e.g. create variants of the ImGui::Value() helper for your low-level math types, or your own widgets/helpers.
/*
namespace ImGui
{
    void    Value(const char* prefix, const MyMatrix44& v, const char* float_format = NULL);
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0VBQStFO0FBQy9FLHNCQUFzQjtBQUN0QixxREFBcUQ7QUFDckQsaUlBQWlJO0FBQ2pJLCtFQUErRTs7QUFFL0UsZUFBZTtBQUVmLDhEQUE4RDtBQUM5RCwyQ0FBMkM7QUFFM0MscUZBQXFGO0FBQ3JGLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFFM0MsK0pBQStKO0FBQy9KLDBDQUEwQztBQUUxQyxpREFBaUQ7QUFDakQsb0NBQW9DO0FBRXBDLHVIQUF1SDtBQUN2SCx5REFBeUQ7QUFDekQsbURBQW1EO0FBRW5ELDRIQUE0SDtBQUM1SCwwSUFBMEk7QUFDMUksb0NBQW9DO0FBRXBDLGdHQUFnRztBQUNoRywrQ0FBK0M7QUFFL0MsbUdBQW1HO0FBQ25HLHFDQUFxQztBQUN4QixRQUFBLDJCQUEyQixHQUFZLEtBQUssQ0FBQztBQUUxRCx3RUFBd0U7QUFDeEUsMENBQTBDO0FBRTFDLG9IQUFvSDtBQUNwSDs7Ozs7Ozs7RUFRRTtBQUVGLHlHQUF5RztBQUN6RyxnQ0FBZ0M7QUFFaEMsd0dBQXdHO0FBQ3hHLG9IQUFvSDtBQUNwSDs7Ozs7RUFLRSJ9