#include "imgui.h"

#ifndef __FLT_MAX__
#define __FLT_MAX__ 3.40282346638528859812e+38F
#endif

#if defined(IMGUI_DISABLE_DEMO_WINDOWS)
// warning: unresolved symbol: _ZN5ImGui17ShowStyleSelectorEPKc
bool ImGui::ShowStyleSelector(const char*) { return false; }
// warning: unresolved symbol: _ZN5ImGui16ShowFontSelectorEPKc
void ImGui::ShowFontSelector(const char*) {}
#endif

#include <emscripten/bind.h>

#define FUNCTION(RET, ARGS, CODE...) \
    emscripten::select_overload<RET ARGS>([] ARGS -> RET { CODE })

#include <malloc.h>

emscripten::val get_mallinfo() {
    const auto& i = mallinfo();
    emscripten::val rv(emscripten::val::object());
    rv.set("arena", emscripten::val(i.arena));
    rv.set("ordblks", emscripten::val(i.ordblks));
    rv.set("smblks", emscripten::val(i.smblks));
    rv.set("hblks", emscripten::val(i.hblks));
    rv.set("hblkhd", emscripten::val(i.hblkhd));
    rv.set("usmblks", emscripten::val(i.usmblks));
    rv.set("fsmblks", emscripten::val(i.fsmblks));
    rv.set("uordblks", emscripten::val(i.uordblks));
    rv.set("fordblks", emscripten::val(i.fordblks));
    rv.set("keepcost", emscripten::val(i.keepcost));
    return rv;
}

EMSCRIPTEN_BINDINGS(mallinfo) {
    emscripten::function("mallinfo", &get_mallinfo);
}

#define TODO() printf("TODO: %s\n", __PRETTY_FUNCTION__)

ImVec2 import_ImVec2(const emscripten::val& value) {
    float x = value["x"].as<float>();
    float y = value["y"].as<float>();
    return ImVec2(x, y);
}

emscripten::val export_ImVec2(const ImVec2& v, emscripten::val out) {
    // emscripten::val out = emscripten::val::object();
    out.set("x", v.x);
    out.set("y", v.y);
    return out;
}

emscripten::val ImVec2_Copy(emscripten::val that, emscripten::val other) {
    that.set("x", other["x"].as<float>());
    that.set("y", other["y"].as<float>());
    return emscripten::val(that);
}

bool ImVec2_Equals(const emscripten::val that, emscripten::val other) {
    if (that["x"].as<float>() != other["x"].as<float>()) { return false; }
    if (that["y"].as<float>() != other["y"].as<float>()) { return false; }
    return true;
}

EMSCRIPTEN_BINDINGS(ImVec2) {
    emscripten::class_<ImVec2>("ImVec2")
        .constructor()
        .constructor<float, float>()
        .property("x", &ImVec2::x)
        .property("y", &ImVec2::y)
        .function("Copy", &ImVec2_Copy)
        .function("Equals", &ImVec2_Equals)
    ;
}

ImVec4 import_ImVec4(const emscripten::val& value) {
    float x = value["x"].as<float>();
    float y = value["y"].as<float>();
    float z = value["z"].as<float>();
    float w = value["w"].as<float>();
    return ImVec4(x, y, z, w);
}

emscripten::val export_ImVec4(const ImVec4& v, emscripten::val out) {
    // emscripten::val out = emscripten::val::object();
    out.set("x", v.x);
    out.set("y", v.y);
    out.set("z", v.z);
    out.set("w", v.w);
    return out;
}

emscripten::val ImVec4_Copy(emscripten::val that, emscripten::val other) {
    that.set("x", other["x"].as<float>());
    that.set("y", other["y"].as<float>());
    that.set("z", other["z"].as<float>());
    that.set("w", other["w"].as<float>());
    return emscripten::val(that);
}

bool ImVec4_Equals(const emscripten::val that, emscripten::val other) {
    if (that["x"].as<float>() != other["x"].as<float>()) { return false; }
    if (that["y"].as<float>() != other["y"].as<float>()) { return false; }
    if (that["z"].as<float>() != other["z"].as<float>()) { return false; }
    if (that["w"].as<float>() != other["w"].as<float>()) { return false; }
    return true;
}

EMSCRIPTEN_BINDINGS(ImVec4) {
    emscripten::class_<ImVec4>("ImVec4")
        .constructor()
        .constructor<float, float, float, float>()
        .property("x", &ImVec4::x)
        .property("y", &ImVec4::y)
        .property("z", &ImVec4::z)
        .property("w", &ImVec4::w)
        .function("Copy", &ImVec4_Copy)
        .function("Equals", &ImVec4_Equals)
    ;
}

// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
// struct ImGuiTextEditCallbackData
EMSCRIPTEN_BINDINGS(ImGuiTextEditCallbackData) {
    emscripten::class_<ImGuiTextEditCallbackData>("ImGuiTextEditCallbackData")
        .constructor()
        // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
        .property("EventFlag", &ImGuiTextEditCallbackData::EventFlag)
        // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
        .property("Flags", &ImGuiTextEditCallbackData::Flags)
        // void*               UserData;       // What user passed to InputText()      // Read-only
        // bool                ReadOnly;       // Read-only mode                       // Read-only
        .property("ReadOnly", &ImGuiTextEditCallbackData::ReadOnly)

        // // CharFilter event:
        // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
        .property("EventChar", &ImGuiTextEditCallbackData::EventChar)

        // // Completion,History,Always events:
        // // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
        // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
        .property("EventKey", &ImGuiTextEditCallbackData::EventKey)
        // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
        .function("getBuf", FUNCTION(std::string, (const ImGuiTextEditCallbackData& that), {
            return that.Buf;
        }))
        .function("setBuf", FUNCTION(void, (const ImGuiTextEditCallbackData& that, std::string value), {
            strcpy(that.Buf, value.c_str());
        }))
        // int                 BufTextLen;     // Current text length in bytes         // Read-write
        .property("BufTextLen", &ImGuiTextEditCallbackData::BufTextLen)
        // int                 BufSize;        // Maximum text length in bytes         // Read-only
        .property("BufSize", &ImGuiTextEditCallbackData::BufSize)
        // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
        .property("BufDirty", &ImGuiTextEditCallbackData::BufDirty)
        // int                 CursorPos;      //                                      // Read-write
        .property("CursorPos", &ImGuiTextEditCallbackData::CursorPos)
        // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
        .property("SelectionStart", &ImGuiTextEditCallbackData::SelectionStart)
        // int                 SelectionEnd;   //                                      // Read-write
        .property("SelectionEnd", &ImGuiTextEditCallbackData::SelectionEnd)

        // // NB: Helper functions for text manipulation. Calling those function loses selection.
        // IMGUI_API void    DeleteChars(int pos, int bytes_count);
        .function("DeleteChars", &ImGuiTextEditCallbackData::DeleteChars)
        // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
        .function("InsertChars", FUNCTION(void, (ImGuiTextEditCallbackData& that, int pos, std::string text, emscripten::val text_end), {
            that.InsertChars(pos, text.c_str());
        }))
        // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
        .function("HasSelection", &ImGuiTextEditCallbackData::HasSelection)
    ;
}

// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
// struct ImGuiSizeConstraintCallbackData
// {
//     void*   UserData;       // Read-only.   What user passed to SetNextWindowSizeConstraints()
//     ImVec2  Pos;            // Read-only.   Window position, for reference.
//     ImVec2  CurrentSize;    // Read-only.   Current window size.
//     ImVec2  DesiredSize;    // Read-write.  Desired size, based on user's mouse position. Write to this field to restrain resizing.
// };
EMSCRIPTEN_BINDINGS(ImGuiSizeConstraintCallbackData) {
    emscripten::class_<ImGuiSizeConstraintCallbackData>("ImGuiSizeConstraintCallbackData")
        .constructor()
        .function("getPos", FUNCTION(emscripten::val, (const ImGuiSizeConstraintCallbackData& that), {
            const ImVec2* p = &that.Pos; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        .function("getCurrentSize", FUNCTION(emscripten::val, (const ImGuiSizeConstraintCallbackData& that), {
            const ImVec2* p = &that.CurrentSize; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        .function("getDesiredSize", FUNCTION(emscripten::val, (const ImGuiSizeConstraintCallbackData& that), {
            const ImVec2* p = &that.DesiredSize; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
    ;
}

EMSCRIPTEN_BINDINGS(ImGuiListClipper) {
    emscripten::class_<ImGuiListClipper>("ImGuiListClipper")
        .constructor()
        .constructor<int>()
        .constructor<int, float>()
        .property("StartPosY", &ImGuiListClipper::StartPosY)
        .property("ItemsHeight", &ImGuiListClipper::ItemsHeight)
        .property("ItemsCount", &ImGuiListClipper::ItemsCount)
        .property("StepNo", &ImGuiListClipper::StepNo)
        .property("DisplayStart", &ImGuiListClipper::DisplayStart)
        .property("DisplayEnd", &ImGuiListClipper::DisplayEnd)
        .function("Step", &ImGuiListClipper::Step)
        .function("Begin", &ImGuiListClipper::Begin)
        .function("End", &ImGuiListClipper::End)
    ;
}

EMSCRIPTEN_BINDINGS(ImDrawCmd) {
    emscripten::class_<ImDrawCmd>("ImDrawCmd")
        .property("ElemCount", &ImDrawCmd::ElemCount)
        .function("getClipRect", FUNCTION(emscripten::val, (const ImDrawCmd* that), {
            const ImVec4* p = &that->ClipRect; return emscripten::val(p);    
        }), emscripten::allow_raw_pointers())
        .property("TextureId", FUNCTION(emscripten::val, (const ImDrawCmd& that), {
            return (that.TextureId != NULL) ? *(emscripten::val*) that.TextureId : emscripten::val::null();
        }))
    ;
}

EMSCRIPTEN_BINDINGS(ImDrawList) {
    emscripten::class_<ImDrawList>("ImDrawList")
        .function("IterateDrawCmds", FUNCTION(void, (const ImDrawList* that, emscripten::val callback), {
            unsigned int ElemStart = 0;
            for (const ImDrawCmd* pcmd = that->CmdBuffer.begin(); pcmd != that->CmdBuffer.end(); pcmd++) {
                callback(emscripten::val(pcmd), emscripten::val(ElemStart));
                ElemStart += pcmd->ElemCount;
            }
        }), emscripten::allow_raw_pointers())

        // This is what you have to render
        // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
        // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
        .property("IdxBuffer", FUNCTION(emscripten::val, (const ImDrawList& that), {
            return emscripten::val(emscripten::typed_memory_view((size_t)(that.IdxBuffer.size() * sizeof(ImDrawIdx)), (char *) &that.IdxBuffer.front()));
        }))
        // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
        .property("VtxBuffer", FUNCTION(emscripten::val, (const ImDrawList& that), {
            return emscripten::val(emscripten::typed_memory_view((size_t)(that.VtxBuffer.size() * sizeof(ImDrawVert)), (char *) &that.VtxBuffer.front()));
        }))

        // [Internal, used while building lists]
        // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
        // const ImDrawListSharedData* _Data;          // Pointer to shared draw data (you can use ImGui::GetDrawListSharedData() to get the one from current ImGui context)
        // const char*             _OwnerName;         // Pointer to owner window's name for debugging
        // unsigned int            _VtxCurrentIdx;     // [Internal] == VtxBuffer.Size
        // ImDrawVert*             _VtxWritePtr;       // [Internal] point within VtxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
        // ImDrawIdx*              _IdxWritePtr;       // [Internal] point within IdxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
        // ImVector<ImVec4>        _ClipRectStack;     // [Internal]
        // ImVector<ImTextureID>   _TextureIdStack;    // [Internal]
        // ImVector<ImVec2>        _Path;              // [Internal] current path building
        // int                     _ChannelsCurrent;   // [Internal] current channel number (0)
        // int                     _ChannelsCount;     // [Internal] number of active channels (1+)
        // ImVector<ImDrawChannel> _Channels;          // [Internal] draw channels for columns API (not resized down so _ChannelsCount may be smaller than _Channels.Size)

        // ImDrawList(const ImDrawListSharedData* shared_data) { _Data = shared_data; _OwnerName = NULL; Clear(); }
        // ~ImDrawList() { ClearFreeMemory(); }
        // IMGUI_API void  PushClipRect(ImVec2 clip_rect_min, ImVec2 clip_rect_max, bool intersect_with_current_clip_rect = false);  // Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)
        .function("PushClipRect", FUNCTION(void, (ImDrawList& that, emscripten::val clip_rect_min, emscripten::val clip_rect_max, bool intersect_with_current_clip_rect), {
            that.PushClipRect(import_ImVec2(clip_rect_min), import_ImVec2(clip_rect_max), intersect_with_current_clip_rect);
        }))
        // IMGUI_API void  PushClipRectFullScreen();
        .function("PushClipRectFullScreen", &ImDrawList::PushClipRectFullScreen)
        // IMGUI_API void  PopClipRect();
        .function("PopClipRect", &ImDrawList::PopClipRect)
        // IMGUI_API void  PushTextureID(const ImTextureID& texture_id);
        // IMGUI_API void  PopTextureID();
        // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
        // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }

        // Primitives
        // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
        .function("AddLine", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, ImU32 col, float thickness), {
            that.AddLine(import_ImVec2(a), import_ImVec2(b), col, thickness);
        }))
        // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
        .function("AddRect", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, ImU32 col, float rounding, int rounding_corners_flags, float thickness), {
            that.AddRect(import_ImVec2(a), import_ImVec2(b), col, rounding, rounding_corners_flags, thickness);
        }))
        // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
        .function("AddRectFilled", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, ImU32 col, float rounding, int rounding_corners_flags), {
            that.AddRectFilled(import_ImVec2(a), import_ImVec2(b), col, rounding, rounding_corners_flags);
        }))
        // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
        .function("AddRectFilledMultiColor", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left), {
            that.AddRectFilledMultiColor(import_ImVec2(a), import_ImVec2(b), col_upr_left, col_upr_right, col_bot_right, col_bot_left);
        }))
        // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
        .function("AddQuad", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, emscripten::val c, emscripten::val d, ImU32 col, float thickness), {
            that.AddQuad(import_ImVec2(a), import_ImVec2(b), import_ImVec2(c), import_ImVec2(d), col, thickness);
        }))
        // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
        .function("AddQuadFilled", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, emscripten::val c, emscripten::val d, ImU32 col), {
            that.AddQuadFilled(import_ImVec2(a), import_ImVec2(b), import_ImVec2(c), import_ImVec2(d), col);
        }))
        // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
        .function("AddTriangle", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, emscripten::val c, ImU32 col, float thickness), {
            that.AddTriangle(import_ImVec2(a), import_ImVec2(b), import_ImVec2(c), col, thickness);
        }))
        // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
        .function("AddTriangleFilled", FUNCTION(void, (ImDrawList& that, emscripten::val a, emscripten::val b, emscripten::val c, ImU32 col), {
            that.AddTriangle(import_ImVec2(a), import_ImVec2(b), import_ImVec2(c), col);
        }))
        // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
        .function("AddCircle", FUNCTION(void, (ImDrawList& that, emscripten::val centre, float radius, ImU32 col, int num_segments, float thickness), {
            that.AddCircle(import_ImVec2(centre), radius, col, num_segments, thickness);
        }))
        // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
        .function("AddCircleFilled", FUNCTION(void, (ImDrawList& that, emscripten::val centre, float radius, ImU32 col, int num_segments), {
            that.AddCircleFilled(import_ImVec2(centre), radius, col, num_segments);
        }))
        // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
        .function("AddText", FUNCTION(void, (ImDrawList& that, emscripten::val pos, ImU32 col, std::string text_begin, emscripten::val text_end), {
            that.AddText(import_ImVec2(pos), col, text_begin.c_str(), NULL);
        }))
        // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
        .function("AddText_Font", FUNCTION(void, (ImDrawList& that, emscripten::val font, float font_size, emscripten::val pos, ImU32 col, std::string text_begin, emscripten::val text_end, float wrap_width, emscripten::val cpu_fine_clip_rect), {
            ImFont* _font = font.as<ImFont*>(emscripten::allow_raw_pointers());
            ImVec4 _cpu_fine_clip_rect;
            if (!cpu_fine_clip_rect.isNull()) {
                _cpu_fine_clip_rect = import_ImVec4(cpu_fine_clip_rect);
            }
            that.AddText(_font, font_size, import_ImVec2(pos), col, text_begin.c_str(), NULL, wrap_width, cpu_fine_clip_rect.isNull() ? NULL : &_cpu_fine_clip_rect);
        }))
        // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
        // .function("AddImage", FUNCTION(void, (ImDrawList& that, ImTextureID user_texture_id, emscripten::val a, emscripten::val b, emscripten::val uv_a, emscripten::val uv_b, ImU32 col), {}))
        // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
        // .function("AddImageQuad", FUNCTION(void, (ImDrawList& that, ImTextureID user_texture_id, emscripten::val a, emscripten::val b, emscripten::val c, emscripten::val d, emscripten::val uv_a, emscripten::val uv_b, emscripten::val uv_c, emscripten::val uv_d, ImU32 col), {}))
        // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
        // .function("AddImageRounded", FUNCTION(void, (ImDrawList& that, ImTextureID user_texture_id, emscripten::val a, emscripten::val b, emscripten::val uv_a, emscripten::val uv_b, ImU32 col, float rounding, int rounding_corners), {}))
        // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
        // .function("AddPolyline", FUNCTION(void, (const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness), {}))
        // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
        // .function("AddConvexPolyFilled", FUNCTION(void, (const ImVec2* points, const int num_points, ImU32 col), {}))
        // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
        .function("AddBezierCurve", FUNCTION(void, (ImDrawList& that, emscripten::val pos0, emscripten::val cp0, emscripten::val cp1, emscripten::val pos1, ImU32 col, float thickness, int num_segments), {
            that.AddBezierCurve(import_ImVec2(pos0), import_ImVec2(cp0), import_ImVec2(cp1), import_ImVec2(pos1), col, thickness, num_segments);
        }))

        // Stateful path API, add points then finish with PathFill() or PathStroke()
        // inline    void  PathClear()                                                 { _Path.resize(0); }
        // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
        // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
        // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
        // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
        // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
        // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
        // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
        // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);

        // Channels
        // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
        // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
        // IMGUI_API void  ChannelsSplit(int channels_count);
        // IMGUI_API void  ChannelsMerge();
        // IMGUI_API void  ChannelsSetCurrent(int channel_index);

        // Advanced
        // IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
        // IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible

        // Internal helpers
        // NB: all primitives needs to be reserved via PrimReserve() beforehand!
        // IMGUI_API void  Clear();
        // IMGUI_API void  ClearFreeMemory();
        // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
        // IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
        // IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
        // IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
        // inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col){ _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
        // inline    void  PrimWriteIdx(ImDrawIdx idx)                                 { *_IdxWritePtr = idx; _IdxWritePtr++; }
        // inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)     { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); }
        // IMGUI_API void  UpdateClipRect();
        // IMGUI_API void  UpdateTextureID();
    ;
}

EMSCRIPTEN_BINDINGS(ImDrawData) {
    emscripten::class_<ImDrawData>("ImDrawData")
        .function("IterateDrawLists", FUNCTION(void, (const ImDrawData* that, emscripten::val callback), {
            for (int n = 0; n < that->CmdListsCount; n++) {
                const ImDrawList* cmd_list = that->CmdLists[n];
                callback(emscripten::val(cmd_list));
            }
        }), emscripten::allow_raw_pointers())

        // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
        .property("Valid", &ImDrawData::Valid)
        // ImDrawList**    CmdLists;
        // int             CmdListsCount;
        .property("CmdListsCount", &ImDrawData::CmdListsCount)
        // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
        .property("TotalVtxCount", &ImDrawData::TotalVtxCount)
        // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
        .property("TotalIdxCount", &ImDrawData::TotalIdxCount)

        // Functions
        // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
        // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
        // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
        .function("ScaleClipRects", FUNCTION(void, (ImDrawData* that, emscripten::val sc), {
            that->ScaleClipRects(import_ImVec2(sc));
        }), emscripten::allow_raw_pointers())
    ;
}

EMSCRIPTEN_BINDINGS(ImFont) {
    emscripten::class_<ImFont>("ImFont")
    // Members: Hot ~62/78 bytes
    // float                       FontSize;           // <user set>   // Height of characters, set during loading (don't change after loading)
    // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
    // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
    // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
    // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
    // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
    // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
    // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
    // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()

    // Members: Cold ~18/26 bytes
    // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
    // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
    // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
    // float                       Ascent, Descent;    //              // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
    // int                         MetricsTotalSurface;//              // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)

    // Methods
    // IMGUI_API ImFont();
    // IMGUI_API ~ImFont();
    // IMGUI_API void              ClearOutputData();
    // IMGUI_API void              BuildLookupTable();
    // IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
    // IMGUI_API void              SetFallbackChar(ImWchar c);
    // float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
    // bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
    // const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }
    .function("GetDebugName", FUNCTION(std::string, (const ImFont& that), { return that.GetDebugName(); }))

    // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
    // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
    // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
    // IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
    // IMGUI_API void              RenderChar(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, unsigned short c) const;
    // IMGUI_API void              RenderText(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, const ImVec4& clip_rect, const char* text_begin, const char* text_end, float wrap_width = 0.0f, bool cpu_fine_clip = false) const;

    // [Internal]
    // IMGUI_API void              GrowIndex(int new_size);
    // IMGUI_API void              AddGlyph(ImWchar c, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, float advance_x);
    // IMGUI_API void              AddRemapChar(ImWchar dst, ImWchar src, bool overwrite_dst = true); // Makes 'dst' character/glyph points to 'src' character/glyph. Currently needs to be called AFTER fonts have been built.

    // #ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    // typedef ImFontGlyph Glyph; // OBSOLETE 1.52+
    // #endif
    ;
}

EMSCRIPTEN_BINDINGS(ImFontAtlas) {
    emscripten::class_<ImFontAtlas>("ImFontAtlas")
        // IMGUI_API ImFontAtlas();
        // IMGUI_API ~ImFontAtlas();
        // IMGUI_API ImFont*           AddFont(const ImFontConfig* font_cfg);
        // IMGUI_API ImFont*           AddFontDefault(const ImFontConfig* font_cfg = NULL);
        // IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
        // IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after Build(). Set font_cfg->FontDataOwnedByAtlas to false to keep ownership.
        // IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
        // IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
        // IMGUI_API void              ClearTexData();             // Clear the CPU-side texture data. Saves RAM once the texture has been copied to graphics memory.
        // IMGUI_API void              ClearInputData();           // Clear the input TTF data (inc sizes, glyph ranges)
        // IMGUI_API void              ClearFonts();               // Clear the ImGui-side font data (glyphs storage, UV coordinates)
        // IMGUI_API void              Clear();                    // Clear all
        
        // Build atlas, retrieve pixel data.
        // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
        // RGBA32 format is provided for convenience and compatibility, but note that unless you use CustomRect to draw color data, the RGB pixels emitted from Fonts will all be white (~75% of waste). 
        // Pitch = Width * BytesPerPixels
        // IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
        // IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
        // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
        .function("GetTexDataAsRGBA32", FUNCTION(emscripten::val, (ImFontAtlas& that), {
            unsigned char* pixels = NULL;
            int width = -1;
            int height = -1;
            int bytes_per_pixel = -1;
            that.GetTexDataAsRGBA32(&pixels, &width, &height, &bytes_per_pixel);
            emscripten::val tex_data = emscripten::val::object();
            tex_data.set(emscripten::val("pixels"), emscripten::val(emscripten::typed_memory_view(width * height * 4, pixels)));
            tex_data.set(emscripten::val("width"), emscripten::val(width));
            tex_data.set(emscripten::val("height"), emscripten::val(height));
            return tex_data;
        }))
        // void                        SetTexID(ImTextureID id)    { TexID = id; }

        //-------------------------------------------
        // Glyph Ranges
        //-------------------------------------------

        // Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
        // NB: Make sure that your string are UTF-8 and NOT in your local code page. In C++11, you can create UTF-8 string literal using the u8"Hello world" syntax. See FAQ for details.
        // IMGUI_API const ImWchar*    GetGlyphRangesDefault();    // Basic Latin, Extended Latin
        // IMGUI_API const ImWchar*    GetGlyphRangesKorean();     // Default + Korean characters
        // IMGUI_API const ImWchar*    GetGlyphRangesJapanese();   // Default + Hiragana, Katakana, Half-Width, Selection of 1946 Ideographs
        // IMGUI_API const ImWchar*    GetGlyphRangesChinese();    // Default + Japanese + full set of about 21000 CJK Unified Ideographs
        // IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();   // Default + about 400 Cyrillic characters
        // IMGUI_API const ImWchar*    GetGlyphRangesThai();       // Default + Thai characters

        // Helpers to build glyph ranges from text data. Feed your application strings/characters to it then call BuildRanges().
        // struct GlyphRangesBuilder
        // {
        //     ImVector<unsigned char> UsedChars;  // Store 1-bit per Unicode code point (0=unused, 1=used)
        //     GlyphRangesBuilder()                { UsedChars.resize(0x10000 / 8); memset(UsedChars.Data, 0, 0x10000 / 8); }
        //     bool           GetBit(int n)        { return (UsedChars[n >> 3] & (1 << (n & 7))) != 0; }
        //     void           SetBit(int n)        { UsedChars[n >> 3] |= 1 << (n & 7); }  // Set bit 'c' in the array
        //     void           AddChar(ImWchar c)   { SetBit(c); }                          // Add character
        //     IMGUI_API void AddText(const char* text, const char* text_end = NULL);      // Add string (each character of the UTF-8 string are added)
        //     IMGUI_API void AddRanges(const ImWchar* ranges);                            // Add ranges, e.g. builder.AddRanges(ImFontAtlas::GetGlyphRangesDefault) to force add all of ASCII/Latin+Ext
        //     IMGUI_API void BuildRanges(ImVector<ImWchar>* out_ranges);                  // Output new ranges
        // };

        //-------------------------------------------
        // Custom Rectangles/Glyphs API
        //-------------------------------------------

        // You can request arbitrary rectangles to be packed into the atlas, for your own purposes. After calling Build(), you can query the rectangle position and render your pixels.
        // You can also request your rectangles to be mapped as font glyph (given a font + Unicode point), so you can render e.g. custom colorful icons and use them as regular glyphs.
        // struct CustomRect
        // {
        //     unsigned int    ID;             // Input    // User ID. Use <0x10000 to map into a font glyph, >=0x10000 for other/internal/custom texture data.
        //     unsigned short  Width, Height;  // Input    // Desired rectangle dimension
        //     unsigned short  X, Y;           // Output   // Packed position in Atlas
        //     float           GlyphAdvanceX;  // Input    // For custom font glyphs only (ID<0x10000): glyph xadvance
        //     ImVec2          GlyphOffset;    // Input    // For custom font glyphs only (ID<0x10000): glyph display offset
        //     ImFont*         Font;           // Input    // For custom font glyphs only (ID<0x10000): target font
        //     CustomRect()            { ID = 0xFFFFFFFF; Width = Height = 0; X = Y = 0xFFFF; GlyphAdvanceX = 0.0f; GlyphOffset = ImVec2(0,0); Font = NULL; }
        //     bool IsPacked() const   { return X != 0xFFFF; }
        // };

        // IMGUI_API int       AddCustomRectRegular(unsigned int id, int width, int height);                                                                   // Id needs to be >= 0x10000. Id >= 0x80000000 are reserved for ImGui and ImDrawList
        // IMGUI_API int       AddCustomRectFontGlyph(ImFont* font, ImWchar id, int width, int height, float advance_x, const ImVec2& offset = ImVec2(0,0));   // Id needs to be < 0x10000 to register a rectangle to map into a specific font.
        // IMGUI_API void      CalcCustomRectUV(const CustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max);
        // const CustomRect*   GetCustomRectByIndex(int index) const { if (index < 0) return NULL; return &CustomRects[index]; }

        //-------------------------------------------
        // Members
        //-------------------------------------------

        // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
        .function("getTexID", FUNCTION(emscripten::val, (const ImFontAtlas* that), {
            return (that->TexID == NULL) ? emscripten::val::null() : *(emscripten::val*) that->TexID;
        }), emscripten::allow_raw_pointers())
        .function("setTexID", FUNCTION(void, (ImFontAtlas* that, emscripten::val value), {
            if (that->TexID) { delete (emscripten::val*) that->TexID; }
            that->TexID = (value.isNull()) ? NULL : new emscripten::val(value);
        }), emscripten::allow_raw_pointers())
        // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
        // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.

        // [Internal]
        // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
        // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
        // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
        // int                         TexWidth;           // Texture width calculated during Build().
        .property("TexWidth", &ImFontAtlas::TexWidth)
        // int                         TexHeight;          // Texture height calculated during Build().
        .property("TexHeight", &ImFontAtlas::TexHeight)
        // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
        // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
        // ImVector<CustomRect>        CustomRects;        // Rectangles for packing custom texture data into the atlas.
        // ImVector<ImFontConfig>      ConfigData;         // Internal data
        // int                         CustomRectIds[1];   // Identifiers of custom texture rectangle used by ImFontAtlas/ImDrawList
    ;
}

EMSCRIPTEN_BINDINGS(ImGuiIO) {
    emscripten::class_<ImGuiIO>("ImGuiIO")
        //------------------------------------------------------------------
        // Settings (fill once)                 // Default value:
        //------------------------------------------------------------------

        // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
        .function("getDisplaySize", FUNCTION(emscripten::val, (ImGuiIO* that), {
            ImVec2* p = &that->DisplaySize; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
        .property("DeltaTime", &ImGuiIO::DeltaTime)
        // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
        // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
        // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
        // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
        // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
        // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
        // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
        .function("getKeyMapAt", FUNCTION(int, (const ImGuiIO* that, int /*ImGuiKey*/ index), {
            return (0 <= index && index < ImGuiKey_COUNT) ? that->KeyMap[index] : -1;
        }), emscripten::allow_raw_pointers())
        .function("setKeyMapAt", FUNCTION(bool, (ImGuiIO* that, int /*ImGuiKey*/ index, int value), {
            if (0 <= index && index < ImGuiKey_COUNT) { that->KeyMap[index] = value; return true; } return false;
        }), emscripten::allow_raw_pointers())
        // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
        // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
        // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.

        // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
        .function("getFonts", FUNCTION(emscripten::val, (ImGuiIO* that), {
            ImFontAtlas* p = that->Fonts; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
        .property("FontGlobalScale", &ImGuiIO::FontGlobalScale)
        // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
        // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
        // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
        .function("getDisplayFramebufferScale", FUNCTION(emscripten::val, (ImGuiIO* that), {
            ImVec2* p = &that->DisplayFramebufferScale; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
        // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize

        // Advanced/subtle behaviors
        // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
        // bool          OptCursorBlink;           // = true               // Enable blinking cursor, for users who consider it annoying.

        //------------------------------------------------------------------
        // Settings (User Functions)
        //------------------------------------------------------------------

        // Rendering function, will be called in Render().
        // Alternatively you can keep this to NULL and call GetDrawData() after Render() to get the same pointer.
        // See example applications if you are unsure of how to implement this.
        // void        (*RenderDrawListsFn)(ImDrawData* data);

        // Optional: access OS clipboard
        // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
        // const char* (*GetClipboardTextFn)(void* user_data);
        // void        (*SetClipboardTextFn)(void* user_data, const char* text);
        // void*       ClipboardUserData;

        // Optional: override memory allocations. MemFreeFn() may be called with a NULL pointer.
        // (default to posix malloc/free)
        // void*       (*MemAllocFn)(size_t sz);
        // void        (*MemFreeFn)(void* ptr);

        // Optional: notify OS Input Method Editor of the screen position of your cursor for text input position (e.g. when using Japanese/Chinese IME in Windows)
        // (default to use native imm32 api on Windows)
        // void        (*ImeSetInputScreenPosFn)(int x, int y);
        // void*       ImeWindowHandle;            // (Windows) Set this to your HWND to get automatic IME cursor positioning.

        //------------------------------------------------------------------
        // Input - Fill before calling NewFrame()
        //------------------------------------------------------------------

        // ImVec2      MousePos;                   // Mouse position, in pixels. Set to ImVec2(-FLT_MAX,-FLT_MAX) if mouse is unavailable (on another screen, etc.)
        .function("getMousePos", FUNCTION(emscripten::val, (ImGuiIO* that), {
            ImVec2* p = &that->MousePos; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
        .function("getMouseDownAt", FUNCTION(bool, (const ImGuiIO* that, int index), {
            return (0 <= index && index < 5) ? that->MouseDown[index] : false;
        }), emscripten::allow_raw_pointers())
        .function("setMouseDownAt", FUNCTION(bool, (ImGuiIO* that, int index, bool value), {
            if (0 <= index && index < 5) { that->MouseDown[index] = value; return true; } return false;
        }), emscripten::allow_raw_pointers())
        // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
        .property("MouseWheel", &ImGuiIO::MouseWheel)
        // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
        .property("MouseDrawCursor", &ImGuiIO::MouseDrawCursor)
        // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
        .property("KeyCtrl", &ImGuiIO::KeyCtrl)
        // bool        KeyShift;                   // Keyboard modifier pressed: Shift
        .property("KeyShift", &ImGuiIO::KeyShift)
        // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
        .property("KeyAlt", &ImGuiIO::KeyAlt)
        // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
        .property("KeySuper", &ImGuiIO::KeySuper)
        // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
        .function("getKeysDownAt", FUNCTION(bool, (const ImGuiIO* that, int index), {
            return (0 <= index && index < 512) ? that->KeysDown[index] : false;
        }), emscripten::allow_raw_pointers())
        .function("setKeysDownAt", FUNCTION(bool, (ImGuiIO* that, int index, bool value), {
            if (0 <= index && index < 512) { that->KeysDown[index] = value; return true; } return false;
        }), emscripten::allow_raw_pointers())
        // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.

        // Functions
        // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
        .function("AddInputCharacter", &ImGuiIO::AddInputCharacter)
        // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
        // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually

        //------------------------------------------------------------------
        // Output - Retrieve after calling NewFrame()
        //------------------------------------------------------------------

        // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active). 
        .property("WantCaptureMouse", &ImGuiIO::WantCaptureMouse)
        // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
        .property("WantCaptureKeyboard", &ImGuiIO::WantCaptureKeyboard)
        // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
        .property("WantTextInput", &ImGuiIO::WantTextInput)
        // bool        WantMoveMouse;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
        .property("WantMoveMouse", &ImGuiIO::WantMoveMouse)
        // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
        .property("Framerate", &ImGuiIO::Framerate)
        // int         MetricsAllocs;              // Number of active memory allocations
        // int         MetricsRenderVertices;      // Vertices output during last call to Render()
        // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
        // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
        // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
        .function("getMouseDelta", FUNCTION(emscripten::val, (ImGuiIO* that), {
            ImVec2* p = &that->MouseDelta; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())

        //------------------------------------------------------------------
        // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
        //------------------------------------------------------------------

        // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
        // ImVec2      MouseClickedPos[5];         // Position at time of clicking
        // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
        // bool        MouseClicked[5];            // Mouse button went from !Down to Down
        // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
        // bool        MouseReleased[5];           // Mouse button went from Down to !Down
        // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
        // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
        .function("getMouseDownDurationAt", FUNCTION(float, (const ImGuiIO* that, int index), {
            return (0 <= index && index < 5) ? that->MouseDownDuration[index] : -1.0f;
        }), emscripten::allow_raw_pointers())
        // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
        // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
        // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
        // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
        .function("getKeysDownDurationAt", FUNCTION(float, (const ImGuiIO* that, int index), {
            return (0 <= index && index < 512) ? that->KeysDownDuration[index] : -1.0f;
        }), emscripten::allow_raw_pointers())
        // float       KeysDownDurationPrev[512];  // Previous duration the key has been down

        // IMGUI_API   ImGuiIO();
    ;
}

EMSCRIPTEN_BINDINGS(ImGuiStyle) {
    emscripten::class_<ImGuiStyle>("ImGuiStyle")
        .constructor()
        // float       Alpha;                      // Global alpha applies to everything in ImGui
        .property("Alpha", &ImGuiStyle::Alpha)
        // ImVec2      WindowPadding;              // Padding within a window
        .function("getWindowPadding", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->WindowPadding; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float       WindowRounding;             // Radius of window corners rounding. Set to 0.0f to have rectangular windows
        .property("WindowRounding", &ImGuiStyle::WindowRounding)
        // float       WindowBorderSize;           // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
        .property("WindowBorderSize", &ImGuiStyle::WindowBorderSize)
        // ImVec2      WindowMinSize;              // Minimum window size
        .function("getWindowMinSize", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->WindowMinSize; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2      WindowTitleAlign;           // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
        .function("getWindowTitleAlign", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->WindowTitleAlign; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float       ChildRounding;              // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
        .property("ChildRounding", &ImGuiStyle::ChildRounding)
        // float       ChildBorderSize;            // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
        .property("ChildBorderSize", &ImGuiStyle::ChildBorderSize)
        // float       PopupRounding;              // Radius of popup window corners rounding.
        .property("PopupRounding", &ImGuiStyle::PopupRounding)
        // float       PopupBorderSize;            // Thickness of border around popup windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
        .property("PopupBorderSize", &ImGuiStyle::PopupBorderSize)
        // ImVec2      FramePadding;               // Padding within a framed rectangle (used by most widgets)
        .function("getFramePadding", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->FramePadding; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float       FrameRounding;              // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
        .property("FrameRounding", &ImGuiStyle::FrameRounding)
        // float       FrameBorderSize;            // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
        .property("FrameBorderSize", &ImGuiStyle::FrameBorderSize)
        // ImVec2      ItemSpacing;                // Horizontal and vertical spacing between widgets/lines
        .function("getItemSpacing", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->ItemSpacing; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2      ItemInnerSpacing;           // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label)
        .function("getItemInnerSpacing", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->ItemInnerSpacing; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2      TouchExtraPadding;          // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
        .function("getTouchExtraPadding", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->TouchExtraPadding; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // float       IndentSpacing;              // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
        .property("IndentSpacing", &ImGuiStyle::IndentSpacing)
        // float       ColumnsMinSpacing;          // Minimum horizontal spacing between two columns
        .property("ColumnsMinSpacing", &ImGuiStyle::ColumnsMinSpacing)
        // float       ScrollbarSize;              // Width of the vertical scrollbar, Height of the horizontal scrollbar
        .property("ScrollbarSize", &ImGuiStyle::ScrollbarSize)
        // float       ScrollbarRounding;          // Radius of grab corners for scrollbar
        .property("ScrollbarRounding", &ImGuiStyle::ScrollbarRounding)
        // float       GrabMinSize;                // Minimum width/height of a grab box for slider/scrollbar.
        .property("GrabMinSize", &ImGuiStyle::GrabMinSize)
        // float       GrabRounding;               // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
        .property("GrabRounding", &ImGuiStyle::GrabRounding)
        // ImVec2      ButtonTextAlign;            // Alignment of button text when button is larger than text. Defaults to (0.5f,0.5f) for horizontally+vertically centered.
        .function("getButtonTextAlign", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->ButtonTextAlign; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2      DisplayWindowPadding;       // Window positions are clamped to be visible within the display area by at least this amount. Only covers regular windows.
        .function("getDisplayWindowPadding", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->DisplayWindowPadding; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // ImVec2      DisplaySafeAreaPadding;     // If you cannot see the edge of your screen (e.g. on a TV) increase the safe area padding. Covers popups/tooltips as well regular windows.
        .function("getDisplaySafeAreaPadding", FUNCTION(emscripten::val, (ImGuiStyle* that), {
            ImVec2* p = &that->DisplaySafeAreaPadding; return emscripten::val(p);
        }), emscripten::allow_raw_pointers())
        // bool        AntiAliasedLines;           // Enable anti-aliasing on lines/borders. Disable if you are really tight on CPU/GPU.
        .property("AntiAliasedLines", &ImGuiStyle::AntiAliasedLines)
        // bool        AntiAliasedFill;            // Enable anti-aliasing on filled shapes (rounded rectangles, circles, etc.)
        .property("AntiAliasedFill", &ImGuiStyle::AntiAliasedFill)
        // float       CurveTessellationTol;       // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
        .property("CurveTessellationTol", &ImGuiStyle::CurveTessellationTol)
        // ImVec4      Colors[ImGuiCol_COUNT];
        .function("getColorsAt", FUNCTION(emscripten::val, (ImGuiStyle* that, int index), {
            ImVec4* p = &that->Colors[index]; return (0 <= index && index < ImGuiCol_COUNT) ? emscripten::val(p) : emscripten::val::undefined();
        }), emscripten::allow_raw_pointers())
        .function("setColorsAt", FUNCTION(bool, (ImGuiStyle* that, int index, emscripten::val value), {
            if (0 <= index && index < ImGuiCol_COUNT) { that->Colors[index] = import_ImVec4(value); return true; } return false;    
        }), emscripten::allow_raw_pointers())

        // IMGUI_API ImGuiStyle();
        // IMGUI_API void ScaleAllSizes(float scale_factor);
        .function("ScaleAllSizes", &ImGuiStyle::ScaleAllSizes)
    ;
}

// EMSCRIPTEN_BINDINGS(ImGuiContext) {
//     emscripten::class_<ImGuiContext>("ImGuiContext")
//     ;
// }

static emscripten::val _PlotLines_values_getter = emscripten::val::undefined();
static emscripten::val _PlotLines_data = emscripten::val::undefined();
static emscripten::val _PlotHistogram_values_getter = emscripten::val::undefined();
static emscripten::val _PlotHistogram_data = emscripten::val::undefined();

EMSCRIPTEN_BINDINGS(ImGui) {
    emscripten::constant("IMGUI_VERSION", std::string(IMGUI_VERSION));

    emscripten::constant("ImDrawVertSize", sizeof(ImDrawVert));
    emscripten::constant("ImDrawIdxSize", sizeof(ImDrawIdx));
    #define OFFSETOF(TYPE, ELEMENT) ((int)&(((TYPE *)0)->ELEMENT))
    emscripten::constant("ImDrawVertPosOffset", OFFSETOF(ImDrawVert, pos));
    emscripten::constant("ImDrawVertUVOffset", OFFSETOF(ImDrawVert, uv));
    emscripten::constant("ImDrawVertColOffset", OFFSETOF(ImDrawVert, col));
    #undef OFFSETOF

    // Main
    // IMGUI_API ImGuiIO&      GetIO();
    emscripten::function("GetIO", FUNCTION(emscripten::val, (), {
        static bool once = false;
        if (!once) {
            once = true;
            ImGui::GetIO().IniFilename = NULL;
            ImGui::GetIO().LogFilename = NULL;
        }
        ImGuiIO* p = &ImGui::GetIO(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API ImGuiStyle&   GetStyle();
    emscripten::function("GetStyle", FUNCTION(emscripten::val, (), {
        ImGuiStyle* p = &ImGui::GetStyle(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
    emscripten::function("GetDrawData", FUNCTION(emscripten::val, (), {
        ImDrawData* p = ImGui::GetDrawData(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
    emscripten::function("NewFrame", &ImGui::NewFrame);
    // IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
    emscripten::function("Render", FUNCTION(void, (), {
        // static emscripten::val g_wrapRenderDrawListsFn = emscripten::val::undefined();
        // ImGuiIO& io = ImGui::GetIO();
        // io.RenderDrawListsFn = FUNCTION(void, (ImDrawData* draw_data), {
        //     if (!g_wrapRenderDrawListsFn.isUndefined()) {
        //         g_wrapRenderDrawListsFn(emscripten::val(draw_data));
        //     }
        // });
        ImGui::Render();
        // io.RenderDrawListsFn = NULL;
    }));
    // IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
    emscripten::function("EndFrame", &ImGui::EndFrame);
    // IMGUI_API void          Shutdown();
    emscripten::function("Shutdown", &ImGui::Shutdown);

    // Demo, Debug, Informations
    // IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
    emscripten::function("ShowDemoWindow", FUNCTION(void, (emscripten::val p_open), {
        if (p_open.isNull()) {
            ImGui::ShowDemoWindow();
        } else {
            bool open = p_open[0].as<bool>();
            ImGui::ShowDemoWindow(&open);
            p_open.set(0, emscripten::val(open));
        }
    }));
    // IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
    emscripten::function("ShowMetricsWindow", FUNCTION(void, (emscripten::val p_open), {
        if (p_open.isNull()) {
            ImGui::ShowMetricsWindow();
        } else {
            bool open = p_open[0].as<bool>();
            ImGui::ShowMetricsWindow(&open);
            p_open.set(0, emscripten::val(open));
        }
    }));
    // IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
    emscripten::function("ShowStyleEditor", FUNCTION(void, (emscripten::val ref), {
        if (ref.isNull()) {
            ImGui::ShowStyleEditor();
        } else {
            ImGuiStyle* _ref = ref.as<ImGuiStyle*>(emscripten::allow_raw_pointers());
            ImGui::ShowStyleEditor(_ref);
        }
    }));
    // IMGUI_API bool          ShowStyleSelector(const char* label);
    emscripten::function("ShowStyleSelector", FUNCTION(void, (std::string label), {
        ImGui::ShowStyleSelector(label.c_str());
    }));
    // IMGUI_API void          ShowFontSelector(const char* label);
    emscripten::function("ShowFontSelector", FUNCTION(void, (std::string label), {
        ImGui::ShowFontSelector(label.c_str());
    }));
    // IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
    emscripten::function("ShowUserGuide", &ImGui::ShowUserGuide);

    // Window
    // IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
    emscripten::function("Begin", FUNCTION(bool, (std::string label, emscripten::val p_open, ImGuiWindowFlags flags), {
        if (p_open.isNull()) {
            return ImGui::Begin(label.c_str(), NULL, flags);
        } else {
            bool open = p_open[0].as<bool>();
            bool ret = ImGui::Begin(label.c_str(), &open, flags);
            p_open.set(0, emscripten::val(open));
            return ret;
        }
    }));
    // IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
    emscripten::function("End", &ImGui::End);
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
    emscripten::function("BeginChild", FUNCTION(bool, (emscripten::val id, emscripten::val size, bool border, ImGuiWindowFlags extra_flags), {
        if (id.typeOf().equals(emscripten::val("string"))) {
            return ImGui::BeginChild(id.as<std::string>().c_str(), import_ImVec2(size), border, extra_flags);
        } else {
            return ImGui::BeginChild(id.as<ImGuiID>(), import_ImVec2(size), border, extra_flags);
        }
    }));
    // IMGUI_API void          EndChild();
    emscripten::function("EndChild", &ImGui::EndChild);
    // IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
    emscripten::function("GetContentRegionMax", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetContentRegionMax(), out);
    }));
    // IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
    emscripten::function("GetContentRegionAvail", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetContentRegionAvail(), out);
    }));
    // IMGUI_API float         GetContentRegionAvailWidth();                                       //
    emscripten::function("GetContentRegionAvailWidth", &ImGui::GetContentRegionAvailWidth);
    // IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
    emscripten::function("GetWindowContentRegionMin", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetWindowContentRegionMin(), out);
    }));
    // IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
    emscripten::function("GetWindowContentRegionMax", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetWindowContentRegionMax(), out);
    }));
    // IMGUI_API float         GetWindowContentRegionWidth();                                      //
    emscripten::function("GetWindowContentRegionWidth", &ImGui::GetWindowContentRegionWidth);
    // IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
    emscripten::function("GetWindowDrawList", FUNCTION(emscripten::val, (), {
        ImDrawList* p = ImGui::GetWindowDrawList(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
    emscripten::function("GetWindowPos", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetWindowPos(), out);
    }));
    // IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
    emscripten::function("GetWindowSize", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetWindowSize(), out);
    }));
    // IMGUI_API float         GetWindowWidth();
    emscripten::function("GetWindowWidth", &ImGui::GetWindowWidth);
    // IMGUI_API float         GetWindowHeight();
    emscripten::function("GetWindowHeight", &ImGui::GetWindowHeight);
    // IMGUI_API bool          IsWindowCollapsed();
    emscripten::function("IsWindowCollapsed", &ImGui::IsWindowCollapsed);
    // IMGUI_API bool          IsWindowAppearing();
    emscripten::function("IsWindowAppearing", &ImGui::IsWindowAppearing);
    // IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
    emscripten::function("SetWindowFontScale", &ImGui::SetWindowFontScale);

    // IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
    emscripten::function("SetNextWindowPos", FUNCTION(void, (emscripten::val pos, ImGuiCond cond, emscripten::val pivot), {
        ImGui::SetNextWindowPos(import_ImVec2(pos), cond, import_ImVec2(pivot));
    }));
    // IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
    emscripten::function("SetNextWindowSize", FUNCTION(void, (emscripten::val size, ImGuiCond cond), {
        ImGui::SetNextWindowSize(import_ImVec2(size), cond);
    }));
    // IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
    emscripten::function("SetNextWindowSizeConstraints", FUNCTION(void, (emscripten::val size_min, emscripten::val size_max, emscripten::val custom_callback, emscripten::val custom_callback_data), {
        if (!custom_callback.isUndefined() && !custom_callback.isNull()) {
            static emscripten::val _custom_callback = custom_callback;
            static emscripten::val _custom_callback_data = custom_callback_data;
            ImGui::SetNextWindowSizeConstraints(import_ImVec2(size_min), import_ImVec2(size_max), FUNCTION(void, (ImGuiSizeConstraintCallbackData* data), {
                // void*   UserData;       // Read-only.   What user passed to SetNextWindowSizeConstraints()
                // ImVec2  Pos;            // Read-only.   Window position, for reference.
                // ImVec2  CurrentSize;    // Read-only.   Current window size.
                // ImVec2  DesiredSize;    // Read-write.  Desired size, based on user's mouse position. Write to this field to restrain resizing.
                // emscripten::val _data = emscripten::val::object();
                // _data.set("UserData", _custom_callback_data);
                // const ImVec2* Pos = &data->Pos; _data.set("Pos", emscripten::val(Pos));
                // const ImVec2* CurrentSize = &data->CurrentSize; _data.set("CurrentSize", emscripten::val(CurrentSize));
                // const ImVec2* DesiredSize = &data->DesiredSize; _data.set("DesiredSize", emscripten::val(DesiredSize));
                // _custom_callback(_data);
                emscripten::val _data = emscripten::val(data);
                _data.set("UserData", _custom_callback_data);
                _custom_callback(_data);
            }), NULL);
        } else {
            ImGui::SetNextWindowSizeConstraints(import_ImVec2(size_min), import_ImVec2(size_max));
        }
    }));
    // IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
    emscripten::function("SetNextWindowContentSize", FUNCTION(void, (emscripten::val size), {
        ImGui::SetNextWindowContentSize(import_ImVec2(size));
    }));
    // IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
    emscripten::function("SetNextWindowCollapsed", &ImGui::SetNextWindowCollapsed);
    // IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
    emscripten::function("SetNextWindowFocus", &ImGui::SetNextWindowFocus);
    // IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
    emscripten::function("SetWindowPos", FUNCTION(void, (emscripten::val pos, ImGuiCond cond), {
        ImGui::SetWindowPos(import_ImVec2(pos), cond);
    }));
    // IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.    
    emscripten::function("SetWindowSize", FUNCTION(void, (emscripten::val pos, ImGuiCond cond), {
        ImGui::SetWindowSize(import_ImVec2(pos), cond);
    }));
    // IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
    emscripten::function("SetWindowCollapsed", FUNCTION(void, (bool collapsed, ImGuiCond cond), {
        ImGui::SetWindowCollapsed(collapsed, cond);
    }));
    // IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
    emscripten::function("SetWindowFocus", FUNCTION(void, (), {
        ImGui::SetWindowFocus();
    }));
    // IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
    emscripten::function("SetWindowNamePos", FUNCTION(void, (std::string name, emscripten::val pos, ImGuiCond cond), {
        ImGui::SetWindowPos(name.c_str(), import_ImVec2(pos), cond);
    }));
    // IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
    emscripten::function("SetWindowNameSize", FUNCTION(void, (std::string name, emscripten::val size, ImGuiCond cond), {
        ImGui::SetWindowSize(name.c_str(), import_ImVec2(size), cond);
    }));
    // IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
    emscripten::function("SetWindowNameCollapsed", FUNCTION(void, (std::string name, bool collapsed, ImGuiCond cond), {
        ImGui::SetWindowCollapsed(name.c_str(), collapsed, cond);
    }));
    // IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
    emscripten::function("SetWindowNameFocus", FUNCTION(void, (std::string name), {
        ImGui::SetWindowFocus(name.c_str());
    }));

    // IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
    emscripten::function("GetScrollX", &ImGui::GetScrollX);
    // IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
    emscripten::function("GetScrollY", &ImGui::GetScrollY);
    // IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
    emscripten::function("GetScrollMaxX", &ImGui::GetScrollMaxX);
    // IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
    emscripten::function("GetScrollMaxY", &ImGui::GetScrollMaxY);
    // IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
    emscripten::function("SetScrollX", &ImGui::SetScrollX);
    // IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
    emscripten::function("SetScrollY", &ImGui::SetScrollY);
    // IMGUI_API void          SetScrollHere(float center_y_ratio = 0.5f);                         // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    emscripten::function("SetScrollHere", &ImGui::SetScrollHere);
    // IMGUI_API void          SetScrollFromPosY(float pos_y, float center_y_ratio = 0.5f);        // adjust scrolling amount to make given position valid. use GetCursorPos() or GetCursorStartPos()+offset to get valid positions.
    emscripten::function("SetScrollFromPosY", &ImGui::SetScrollFromPosY);
    // IMGUI_API void          SetStateStorage(ImGuiStorage* tree);                                // replace tree state storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
    emscripten::function("SetStateStorage", FUNCTION(void, (emscripten::val tree), {
        TODO();
    }));
    // IMGUI_API ImGuiStorage* GetStateStorage();
    emscripten::function("GetStateStorage", FUNCTION(emscripten::val, (), {
        TODO();
        return emscripten::val::null();
    }));

    // Parameters stacks (shared)
    // IMGUI_API void          PushFont(ImFont* font);                                             // use NULL as a shortcut to push default font
    emscripten::function("PushFont", FUNCTION(void, (emscripten::val font), {
        TODO();
        // ImGui::PushFont(font);
    }));
    // IMGUI_API void          PopFont();
    emscripten::function("PopFont", FUNCTION(void, (), {
        TODO();
        // ImGui::PopFont();
    }));
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
    emscripten::function("PushStyleColor", FUNCTION(void, (ImGuiCol idx, emscripten::val col), {
        if (col.typeOf().as<std::string>() == "number") {
            ImGui::PushStyleVar(idx, col.as<ImU32>());
        } else {
            ImGui::PushStyleColor(idx, import_ImVec4(col));
        }
    }));
    // IMGUI_API void          PopStyleColor(int count = 1);
    emscripten::function("PopStyleColor", &ImGui::PopStyleColor);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float emscripten::val);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& emscripten::val);
    emscripten::function("PushStyleVar", FUNCTION(void, (ImGuiStyleVar idx, emscripten::val var), {
        if (var.typeOf().as<std::string>() == "number") {
            ImGui::PushStyleVar(idx, var.as<float>());
        } else {
            ImGui::PushStyleVar(idx, import_ImVec2(var));
        }
    }));
    // IMGUI_API void          PopStyleVar(int count = 1);
    emscripten::function("PopStyleVar", &ImGui::PopStyleVar);
    // IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
    emscripten::function("GetStyleColorVec4", FUNCTION(emscripten::val, (ImGuiCol idx), {
        const ImVec4* p = &ImGui::GetStyleColorVec4(idx); return emscripten::val(p);
    }));
    // IMGUI_API ImFont*       GetFont();                                                          // get current font
    emscripten::function("GetFont", FUNCTION(emscripten::val, (), {
        ImFont* p = ImGui::GetFont(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
    emscripten::function("GetFontSize", &ImGui::GetFontSize);
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    emscripten::function("GetFontTexUvWhitePixel", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetFontTexUvWhitePixel(), out);
    }));
    // IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);                  // retrieve given style color with style alpha applied and optional extra alpha multiplier
    // IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                     // retrieve given color with style alpha applied
    // IMGUI_API ImU32         GetColorU32(ImU32 col);                                             // retrieve given color with style alpha applied
    emscripten::function("GetColorU32", FUNCTION(ImU32, (emscripten::val color, emscripten::val alpha_mul), {
        return ImGui::GetColorU32(color.as<ImGuiCol>(), alpha_mul.as<float>());
    }));

    // Parameters stacks (current window)
    // IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
    emscripten::function("PushItemWidth", &ImGui::PushItemWidth);
    // IMGUI_API void          PopItemWidth();
    emscripten::function("PopItemWidth", &ImGui::PopItemWidth);
    // IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
    emscripten::function("CalcItemWidth", &ImGui::CalcItemWidth);
    // IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    emscripten::function("PushTextWrapPos", &ImGui::PushTextWrapPos);
    // IMGUI_API void          PopTextWrapPos();
    emscripten::function("PopTextWrapPos", &ImGui::PopTextWrapPos);
    // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
    emscripten::function("PushAllowKeyboardFocus", &ImGui::PushAllowKeyboardFocus);
    // IMGUI_API void          PopAllowKeyboardFocus();
    emscripten::function("PopAllowKeyboardFocus", &ImGui::PopAllowKeyboardFocus);
    // IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
    emscripten::function("PushButtonRepeat", &ImGui::PushButtonRepeat);
    // IMGUI_API void          PopButtonRepeat();
    emscripten::function("PopButtonRepeat", &ImGui::PopButtonRepeat);

    // Cursor / Layout
    // IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
    emscripten::function("Separator", &ImGui::Separator);
    // IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
    emscripten::function("SameLine", &ImGui::SameLine);
    // IMGUI_API void          NewLine();                                                          // undo a SameLine()
    emscripten::function("NewLine", &ImGui::NewLine);
    // IMGUI_API void          Spacing();                                                          // add vertical spacing
    emscripten::function("Spacing", &ImGui::Spacing);
    // IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
    emscripten::function("Dummy", FUNCTION(void, (emscripten::val size), {
        ImGui::Dummy(import_ImVec2(size));
    }));
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
    emscripten::function("Indent", &ImGui::Indent);
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
    emscripten::function("Unindent", &ImGui::Unindent);
    // IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
    emscripten::function("BeginGroup", &ImGui::BeginGroup);
    // IMGUI_API void          EndGroup();
    emscripten::function("EndGroup", &ImGui::EndGroup);
    // IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
    emscripten::function("GetCursorPos", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetCursorPos(), out);
    }));
    // IMGUI_API float         GetCursorPosX();                                                    // "
    emscripten::function("GetCursorPosX", &ImGui::GetCursorPosX);
    // IMGUI_API float         GetCursorPosY();                                                    // "
    emscripten::function("GetCursorPosY", &ImGui::GetCursorPosY);
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
    emscripten::function("SetCursorPos", &ImGui::SetCursorPos);
    // IMGUI_API void          SetCursorPosX(float x);                                             // "
    emscripten::function("SetCursorPosX", &ImGui::SetCursorPosX);
    // IMGUI_API void          SetCursorPosY(float y);                                             // "
    emscripten::function("SetCursorPosY", &ImGui::SetCursorPosY);
    // IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
    emscripten::function("GetCursorStartPos", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetCursorStartPos(), out);
    }));
    // IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    emscripten::function("GetCursorScreenPos", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetCursorScreenPos(), out);
    }));
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
    emscripten::function("SetCursorScreenPos", &ImGui::SetCursorScreenPos);
    // IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
    emscripten::function("AlignTextToFramePadding", &ImGui::AlignTextToFramePadding);
    // IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
    emscripten::function("GetTextLineHeight", &ImGui::GetTextLineHeight);
    // IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
    emscripten::function("GetTextLineHeightWithSpacing", &ImGui::GetTextLineHeightWithSpacing);
    // IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
    emscripten::function("GetFrameHeight", &ImGui::GetFrameHeight);
    // IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
    emscripten::function("GetFrameHeightWithSpacing", &ImGui::GetFrameHeightWithSpacing);

    // Columns
    // You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    emscripten::function("Columns", FUNCTION(void, (int count, emscripten::val id, bool border), {
        if (id.isNull()) {
            ImGui::Columns(count, NULL, border);
        } else {
            ImGui::Columns(count, id.as<std::string>().c_str(), border);
        }
    }));
    // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
    emscripten::function("NextColumn", &ImGui::NextColumn);
    // IMGUI_API int           GetColumnIndex();                                                   // get current column index
    emscripten::function("GetColumnIndex", &ImGui::GetColumnIndex);
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    emscripten::function("GetColumnWidth", &ImGui::GetColumnWidth);
    // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
    emscripten::function("SetColumnWidth", &ImGui::SetColumnWidth);
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    emscripten::function("GetColumnOffset", &ImGui::GetColumnOffset);
    // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
    emscripten::function("SetColumnOffset", &ImGui::SetColumnOffset);
    // IMGUI_API int           GetColumnsCount();
    emscripten::function("GetColumnsCount", &ImGui::GetColumnsCount);

    // ID scopes
    // If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
    // You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
    // IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
    // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API void          PushID(const void* ptr_id);
    // IMGUI_API void          PushID(int int_id);
    emscripten::function("PushID", FUNCTION(void, (emscripten::val id), {
        if (id.typeOf().as<std::string>() == "number") {
            return ImGui::PushID(id.as<int>());
        } else {
            return ImGui::PushID(id.as<std::string>().c_str());
        }
    }));
    // IMGUI_API void          PopID();
    emscripten::function("PopID", &ImGui::PopID);
    // IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
    // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API ImGuiID       GetID(const void* ptr_id);
    emscripten::function("GetID", FUNCTION(ImGuiID, (emscripten::val id), {
        if (id.typeOf().as<std::string>() == "number") {
            return ImGui::GetID((const void*) id.as<int>());
        } else {
            return ImGui::GetID(id.as<std::string>().c_str());
        }
    }));

    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    emscripten::function("TextUnformatted", FUNCTION(void, (std::string text), { ImGui::TextUnformatted(text.c_str()); }));
    // IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
    emscripten::function("Text", FUNCTION(void, (std::string fmt), { ImGui::Text("%s", fmt.c_str()); }));
    // IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
    emscripten::function("TextV", FUNCTION(void, (std::string fmt), { ImGui::Text("%s", fmt.c_str()); }));
    // IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
    emscripten::function("TextColored", FUNCTION(void, (emscripten::val col, std::string fmt), { ImGui::TextColored(import_ImVec4(col), "%s", fmt.c_str()); }));
    // IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
    emscripten::function("TextColoredV", FUNCTION(void, (emscripten::val col, std::string fmt), { ImGui::TextColored(import_ImVec4(col), "%s", fmt.c_str()); }));
    // IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
    emscripten::function("TextDisabled", FUNCTION(void, (std::string fmt), { ImGui::TextDisabled("%s", fmt.c_str()); }));
    // IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
    emscripten::function("TextDisabledV", FUNCTION(void, (std::string fmt), { ImGui::TextDisabled("%s", fmt.c_str()); }));
    // IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
    emscripten::function("TextWrapped", FUNCTION(void, (std::string fmt), { ImGui::TextWrapped("%s", fmt.c_str()); }));
    // IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
    emscripten::function("TextWrappedV", FUNCTION(void, (std::string fmt), { ImGui::TextWrapped("%s", fmt.c_str()); }));
    // IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
    emscripten::function("LabelText", FUNCTION(void, (std::string label, std::string fmt), { ImGui::LabelText(label.c_str(), "%s", fmt.c_str()); }));
    // IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
    emscripten::function("LabelTextV", FUNCTION(void, (std::string label, std::string fmt), { ImGui::LabelText(label.c_str(), "%s", fmt.c_str()); }));
    // IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
    emscripten::function("BulletText", FUNCTION(void, (std::string fmt), { ImGui::BulletText("%s", fmt.c_str()); }));
    // IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
    emscripten::function("BulletTextV", FUNCTION(void, (std::string fmt), { ImGui::BulletText("%s", fmt.c_str()); }));
    // IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
    emscripten::function("Bullet", &ImGui::Bullet);

    // Widgets: Main
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
    emscripten::function("Button", FUNCTION(bool, (std::string label, emscripten::val size), {
        return ImGui::Button(label.c_str(), import_ImVec2(size));
    }));
    // IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
    emscripten::function("SmallButton", FUNCTION(bool, (std::string label), { return ImGui::SmallButton(label.c_str()); }));
    // IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
    emscripten::function("InvisibleButton", FUNCTION(bool, (std::string str_id, emscripten::val size), { return ImGui::InvisibleButton(str_id.c_str(), import_ImVec2(size)); }));
    // IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
    emscripten::function("Image", FUNCTION(void, (emscripten::val user_texture_id, emscripten::val size, emscripten::val uv0, emscripten::val uv1, emscripten::val tint_col, emscripten::val border_col), {
        ImTextureID _user_texture_id = ImGui::GetIO().Fonts->TexID; // TODO: texture
        ImGui::Image(_user_texture_id, import_ImVec2(size), import_ImVec2(uv0), import_ImVec2(uv1), import_ImVec4(tint_col), import_ImVec4(border_col));
    }));
    // IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
    emscripten::function("ImageButton", FUNCTION(bool, (emscripten::val user_texture_id, emscripten::val size, emscripten::val uv0, emscripten::val uv1, int frame_padding, emscripten::val bg_col, emscripten::val tint_col), {
        ImTextureID _user_texture_id = ImGui::GetIO().Fonts->TexID; // TODO: texture
        return ImGui::ImageButton(_user_texture_id, import_ImVec2(size), import_ImVec2(uv0), import_ImVec2(uv1), frame_padding, import_ImVec4(bg_col), import_ImVec4(tint_col));
    }));
    // IMGUI_API bool          Checkbox(const char* label, bool* v);
    emscripten::function("Checkbox", FUNCTION(bool, (std::string label, emscripten::val v), {
        bool _v = v[0].as<bool>();
        bool ret = ImGui::Checkbox(label.c_str(), &_v);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
    emscripten::function("CheckboxFlags", FUNCTION(bool, (std::string label, emscripten::val flags, unsigned int flags_value), {
        unsigned int _flags = flags[0].as<unsigned int>();
        bool ret = ImGui::CheckboxFlags(label.c_str(), &_flags, flags_value);
        flags.set(0, emscripten::val(_flags));
        return ret;
    }));
    // IMGUI_API bool          RadioButton(const char* label, bool active);
    // IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);
    emscripten::function("RadioButton", FUNCTION(bool, (std::string label, emscripten::val active_or_v, emscripten::val v_button), {
        if (v_button.isUndefined()) {
            return ImGui::RadioButton(label.c_str(), active_or_v.as<bool>());
        } else {
            int _v = active_or_v[0].as<int>();
            bool ret = ImGui::RadioButton(label.c_str(), &_v, v_button.as<int>());
            active_or_v.set(0, emscripten::val(_v));
            return ret;
        }
    }));
    // IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
    // IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
    emscripten::function("PlotLines", FUNCTION(void, (std::string label, emscripten::val values_getter, emscripten::val data, int values_count, int values_offset, emscripten::val overlay_text, emscripten::val scale_min, emscripten::val scale_max, emscripten::val graph_size), {
        /*static emscripten::val*/ _PlotLines_values_getter = values_getter;
        /*static emscripten::val*/ _PlotLines_data = data;
        const char* _overlay_text = overlay_text.isNull() ? NULL : overlay_text.as<std::string>().c_str();
        float _scale_min = scale_min.isNull() ? FLT_MAX : scale_min.as<float>();
        float _scale_max = scale_max.isNull() ? FLT_MAX : scale_max.as<float>();
        ImGui::PlotLines(label.c_str(), FUNCTION(float, (void* data, int idx), {
            return _PlotLines_values_getter(_PlotLines_data, emscripten::val(idx)).as<float>();
        }), NULL, values_count, values_offset, _overlay_text, _scale_min, _scale_max, import_ImVec2(graph_size));

        // ImGui::PlotLines(label.c_str(), emscripten::select_overload<float (void* data, int idx)>([] (void* data, int idx) -> float {
        //     return 0.0f;
        // }), NULL, values_count, values_offset, _overlay_text, _scale_min, _scale_max, import_ImVec2(graph_size));


    }));
    // IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
    // IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
    emscripten::function("PlotHistogram", FUNCTION(void, (std::string label, emscripten::val values_getter, emscripten::val data, int values_count, int values_offset, emscripten::val overlay_text, emscripten::val scale_min, emscripten::val scale_max, emscripten::val graph_size), {
        /*static emscripten::val*/ _PlotHistogram_values_getter = values_getter;
        /*static emscripten::val*/ _PlotHistogram_data = data;
        const char* _overlay_text = overlay_text.isNull() ? NULL : overlay_text.as<std::string>().c_str();
        float _scale_min = scale_min.isNull() ? FLT_MAX : scale_min.as<float>();
        float _scale_max = scale_max.isNull() ? FLT_MAX : scale_max.as<float>();
        ImGui::PlotHistogram(label.c_str(), FUNCTION(float, (void* data, int idx), {
            return _PlotHistogram_values_getter(_PlotHistogram_data, emscripten::val(idx)).as<float>();
        }), NULL, values_count, values_offset, _overlay_text, _scale_min, _scale_max, import_ImVec2(graph_size));
    }));
    // IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
    emscripten::function("ProgressBar", FUNCTION(void, (float fraction, emscripten::val size_arg, emscripten::val overlay), {
        if (overlay.isNull()) {
            ImGui::ProgressBar(fraction, import_ImVec2(size_arg), NULL);
        } else {
            ImGui::ProgressBar(fraction, import_ImVec2(size_arg), overlay.as<std::string>().c_str());
        }
    }));

    // Widgets: Combo Box
    // The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it. 
    // The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
    // IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
    emscripten::function("BeginCombo", FUNCTION(bool, (std::string label, emscripten::val preview_value, ImGuiComboFlags flags), {
        return ImGui::BeginCombo(label.c_str(), preview_value.isNull() ? NULL : preview_value.as<std::string>().c_str(), flags);
    }));
    // IMGUI_API void          EndCombo();
    emscripten::function("EndCombo", &ImGui::EndCombo);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
    // IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
    emscripten::function("Combo", FUNCTION(bool, (std::string label, emscripten::val current_item, emscripten::val items, int items_count, int popup_max_height_in_items), {
        static emscripten::val _items = items;
        int _current_item = current_item[0].as<int>();
        bool ret = ImGui::Combo(label.c_str(), &_current_item, FUNCTION(bool, (void* data, int idx, const char** out_text), {
            static std::string text = _items[idx].as<std::string>();
            *out_text = text.c_str();
            return true;
        }), NULL, items_count, popup_max_height_in_items);
        current_item.set(0, emscripten::val(_current_item));
        return ret;
    }));

    // Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
    // IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
    emscripten::function("DragFloat", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, float v_min, float v_max, emscripten::val display_format, float power), {
        float _v = v[0].as<float>();
        bool ret = ImGui::DragFloat(label.c_str(), &_v, v_speed, v_min, v_max, display_format.isNull() ? NULL : display_format.as<std::string>().c_str(), power);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("DragFloat2", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, float v_min, float v_max, std::string display_format, float power), {
        float _v[2] = { v[0].as<float>(), v[1].as<float>() };
        bool ret = ImGui::DragFloat2(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("DragFloat3", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, float v_min, float v_max, std::string display_format, float power), {
        float _v[3] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>() };
        bool ret = ImGui::DragFloat3(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("DragFloat4", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, float v_min, float v_max, std::string display_format, float power), {
        float _v[4] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>(), v[3].as<float>() };
        bool ret = ImGui::DragFloat4(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));
    // IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", const char* display_format_max = NULL, float power = 1.0f);
    emscripten::function("DragFloatRange2", FUNCTION(bool, (std::string label, emscripten::val v_current_min, emscripten::val v_current_max, float v_speed, float v_min, float v_max, std::string display_format, emscripten::val display_format_max, float power), {
        float _v_current_min = v_current_min[0].as<float>();
        float _v_current_max = v_current_max[0].as<float>();
        std::string _display_format_max = display_format_max.isNull() ? NULL : display_format_max.as<std::string>();
        bool ret = ImGui::DragFloatRange2(label.c_str(), &_v_current_min, &_v_current_max, v_speed, v_min, v_max, display_format.c_str(), _display_format_max.c_str(), power);
        v_current_min.set(0, emscripten::val(_v_current_min));
        v_current_max.set(0, emscripten::val(_v_current_max));
        return ret;
    }));
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");                                       // If v_min >= v_max we have no bound
    emscripten::function("DragInt", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, int v_min, int v_max, std::string display_format), {
        int _v = v[0].as<int>();
        bool ret = ImGui::DragInt(label.c_str(), &_v, v_speed, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    emscripten::function("DragInt2", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, int v_min, int v_max, std::string display_format), {
        int _v[] = { v[0].as<int>(), v[1].as<int>() };
        bool ret = ImGui::DragInt2(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    emscripten::function("DragInt3", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, int v_min, int v_max, std::string display_format), {
        int _v[] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>() };
        bool ret = ImGui::DragInt3(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
    emscripten::function("DragInt4", FUNCTION(bool, (std::string label, emscripten::val v, float v_speed, int v_min, int v_max, std::string display_format), {
        int _v[4] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>(), v[3].as<int>() };
        bool ret = ImGui::DragInt4(label.c_str(), _v, v_speed, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
    emscripten::function("DragIntRange2", FUNCTION(bool, (std::string label, emscripten::val v_current_min, emscripten::val v_current_max, float v_speed, float v_min, float v_max, std::string display_format, emscripten::val display_format_max), {
        int _v_current_min = v_current_min[0].as<int>();
        int _v_current_max = v_current_max[0].as<int>();
        std::string _display_format_max = display_format_max.isNull() ? NULL : display_format_max.as<std::string>();
        bool ret = ImGui::DragIntRange2(label.c_str(), &_v_current_min, &_v_current_max, v_speed, v_min, v_max, display_format.c_str(), _display_format_max.c_str());
        v_current_min.set(0, emscripten::val(_v_current_min));
        v_current_max.set(0, emscripten::val(_v_current_max));
        return ret;
    }));

    // Widgets: Input with Keyboard
    // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
    emscripten::function("InputText", FUNCTION(bool, (std::string label, emscripten::val buf, size_t buf_size, ImGuiInputTextFlags flags, emscripten::val callback, emscripten::val user_data), {
        std::string _buf = buf[0].as<std::string>();
        _buf.reserve(buf_size);
        bool ret = false;
        if (!callback.isNull()) {
            static emscripten::val _callback = callback;
            static emscripten::val _user_data = user_data;
            ret = ImGui::InputText(label.c_str(), (char*) _buf.data(), buf_size, flags, FUNCTION(int, (ImGuiTextEditCallbackData* data), {
                emscripten::val _data = emscripten::val(data);
                _data.set("UserData", _user_data);
                return _callback(_data).as<int>();
            }), NULL);
        } else {
            ret = ImGui::InputText(label.c_str(), (char*) _buf.data(), buf_size, flags);
        }
        buf.set(0, emscripten::val(_buf.c_str()));
        return ret;
    }), emscripten::allow_raw_pointers());
    // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
    emscripten::function("InputTextMultiline", FUNCTION(bool, (std::string label, emscripten::val buf, size_t buf_size, emscripten::val size, ImGuiInputTextFlags flags, emscripten::val callback, emscripten::val user_data), {
        std::string _buf = buf[0].as<std::string>();
        _buf.reserve(buf_size);
        bool ret = false;
        if (!callback.isNull()) {
            static emscripten::val _callback = callback;
            static emscripten::val _user_data = user_data;
            ret = ImGui::InputTextMultiline(label.c_str(), (char*) _buf.data(), buf_size, import_ImVec2(size), flags, FUNCTION(int, (ImGuiTextEditCallbackData* data), {
                emscripten::val _data = emscripten::val(data);
                _data.set("UserData", _user_data);
                return _callback(_data).as<int>();
            }), NULL);
        } else {
            ret = ImGui::InputTextMultiline(label.c_str(), (char*) _buf.data(), buf_size, import_ImVec2(size), flags);
        }
        buf.set(0, emscripten::val(_buf.c_str()));
        return ret;
    }));
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputFloat", FUNCTION(bool, (std::string label, emscripten::val v, float step, float step_fast, int decimal_precision, ImGuiInputTextFlags extra_flags), {
        float _v = v[0].as<float>();
        bool ret = ImGui::InputFloat(label.c_str(), &_v, step, step_fast, decimal_precision, extra_flags);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputFloat2", FUNCTION(bool, (std::string label, emscripten::val v, int decimal_precision, ImGuiInputTextFlags extra_flags), {
        float _v[] = { v[0].as<float>(), v[1].as<float>() };
        bool ret = ImGui::InputFloat2(label.c_str(), _v, decimal_precision, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputFloat3", FUNCTION(bool, (std::string label, emscripten::val v, int decimal_precision, ImGuiInputTextFlags extra_flags), {
        float _v[] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>() };
        bool ret = ImGui::InputFloat3(label.c_str(), _v, decimal_precision, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputFloat4", FUNCTION(bool, (std::string label, emscripten::val v, int decimal_precision, ImGuiInputTextFlags extra_flags), {
        float _v[] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>(), v[3].as<float>() };
        bool ret = ImGui::InputFloat4(label.c_str(), _v, decimal_precision, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));
    // IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputInt", FUNCTION(bool, (std::string label, emscripten::val v, int step, int step_fast, ImGuiInputTextFlags extra_flags), {
        int _v = v[0].as<int>();
        bool ret = ImGui::InputInt(label.c_str(), &_v, step, step_fast, extra_flags);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputInt2", FUNCTION(bool, (std::string label, emscripten::val v, ImGuiInputTextFlags extra_flags), {
        int _v[] = { v[0].as<int>(), v[1].as<int>() };
        bool ret = ImGui::InputInt2(label.c_str(), _v, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputInt3", FUNCTION(bool, (std::string label, emscripten::val v, ImGuiInputTextFlags extra_flags), {
        int _v[] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>() };
        bool ret = ImGui::InputInt3(label.c_str(), _v, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
    emscripten::function("InputInt4", FUNCTION(bool, (std::string label, emscripten::val v, ImGuiInputTextFlags extra_flags), {
        int _v[] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>(), v[3].as<int>() };
        bool ret = ImGui::InputInt4(label.c_str(), _v, extra_flags);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));

    // Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);     // adjust display_format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
    emscripten::function("SliderFloat", FUNCTION(bool, (std::string label, emscripten::val v, float v_min, float v_max, std::string display_format, float power), {
        float _v = v[0].as<float>();
        bool ret = ImGui::SliderFloat(label.c_str(), &_v, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("SliderFloat2", FUNCTION(bool, (std::string label, emscripten::val v, float v_min, float v_max, std::string display_format, float power), {
        float _v[] = { v[0].as<float>(), v[1].as<float>() };
        bool ret = ImGui::SliderFloat2(label.c_str(), _v, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("SliderFloat3", FUNCTION(bool, (std::string label, emscripten::val v, float v_min, float v_max, std::string display_format, float power), {
        float _v[] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>() };
        bool ret = ImGui::SliderFloat3(label.c_str(), _v, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("SliderFloat4", FUNCTION(bool, (std::string label, emscripten::val v, float v_min, float v_max, std::string display_format, float power), {
        float _v[] = { v[0].as<float>(), v[1].as<float>(), v[2].as<float>(), v[3].as<float>() };
        bool ret = ImGui::SliderFloat4(label.c_str(), _v, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));
    // IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
    emscripten::function("SliderAngle", FUNCTION(bool, (std::string label, emscripten::val v_rad, float v_degrees_min, float v_degrees_max), {
        float _v_rad = v_rad[0].as<float>();
        bool ret = ImGui::SliderAngle(label.c_str(), &_v_rad, v_degrees_min, v_degrees_max);
        v_rad.set(0, emscripten::val(_v_rad));
        return ret;
    }));
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* display_format = "%.0f");
    emscripten::function("SliderInt", FUNCTION(bool, (std::string label, emscripten::val v, int v_min, int v_max, std::string display_format), {
        int _v = v[0].as<int>();
        bool ret = ImGui::SliderInt(label.c_str(), &_v, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* display_format = "%.0f");
    emscripten::function("SliderInt2", FUNCTION(bool, (std::string label, emscripten::val v, int v_min, int v_max, std::string display_format), {
        int _v[] = { v[0].as<int>(), v[1].as<int>() };
        bool ret = ImGui::SliderInt2(label.c_str(), _v, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        return ret;
    }));
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* display_format = "%.0f");
    emscripten::function("SliderInt3", FUNCTION(bool, (std::string label, emscripten::val v, int v_min, int v_max, std::string display_format), {
        int _v[] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>() };
        bool ret = ImGui::SliderInt3(label.c_str(), _v, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        return ret;
    }));
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* display_format = "%.0f");
    emscripten::function("SliderInt4", FUNCTION(bool, (std::string label, emscripten::val v, int v_min, int v_max, std::string display_format), {
        int _v[] = { v[0].as<int>(), v[1].as<int>(), v[2].as<int>(), v[3].as<int>() };
        bool ret = ImGui::SliderInt4(label.c_str(), _v, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v[0]));
        v.set(1, emscripten::val(_v[1]));
        v.set(2, emscripten::val(_v[2]));
        v.set(3, emscripten::val(_v[3]));
        return ret;
    }));
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
    emscripten::function("VSliderFloat", FUNCTION(bool, (std::string label, emscripten::val size, emscripten::val v, float v_min, float v_max, std::string display_format, float power), {
        float _v = v[0].as<float>();
        bool ret = ImGui::VSliderFloat(label.c_str(), import_ImVec2(size), &_v, v_min, v_max, display_format.c_str(), power);
        v.set(0, emscripten::val(_v));
        return ret;
    }));
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* display_format = "%.0f");
    emscripten::function("VSliderInt", FUNCTION(bool, (std::string label, emscripten::val size, emscripten::val v, int v_min, int v_max, std::string display_format), {
        int _v = v[0].as<int>();
        bool ret = ImGui::VSliderInt(label.c_str(), import_ImVec2(size), &_v, v_min, v_max, display_format.c_str());
        v.set(0, emscripten::val(_v));
        return ret;
    }));

    // Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
    // Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
    // IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    emscripten::function("ColorEdit3", FUNCTION(bool, (std::string label, emscripten::val col, ImGuiColorEditFlags flags), {
        float _col[3] = { 0.0f, 0.0f, 0.0f };
        _col[0] = col[0].as<float>();
        _col[1] = col[1].as<float>();
        _col[2] = col[2].as<float>();
        bool ret = ImGui::ColorEdit3(label.c_str(), _col, flags);
        col.set(0, emscripten::val(_col[0]));
        col.set(1, emscripten::val(_col[1]));
        col.set(2, emscripten::val(_col[2]));
        return ret;
    }));
    // IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
    emscripten::function("ColorEdit4", FUNCTION(bool, (std::string label, emscripten::val col, ImGuiColorEditFlags flags), {
        float _col[4] = { 0.0f, 0.0f, 0.0f, 0.0f };
        _col[0] = col[0].as<float>();
        _col[1] = col[1].as<float>();
        _col[2] = col[2].as<float>();
        _col[3] = col[3].as<float>();
        bool ret = ImGui::ColorEdit4(label.c_str(), _col, flags);
        col.set(0, emscripten::val(_col[0]));
        col.set(1, emscripten::val(_col[1]));
        col.set(2, emscripten::val(_col[2]));
        col.set(3, emscripten::val(_col[3]));
        return ret;
    }));
    // IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    emscripten::function("ColorPicker3", FUNCTION(bool, (std::string label, emscripten::val col, ImGuiColorEditFlags flags), {
        float _col[3] = { 0.0f, 0.0f, 0.0f };
        _col[0] = col[0].as<float>();
        _col[1] = col[1].as<float>();
        _col[2] = col[2].as<float>();
        bool ret = ImGui::ColorPicker3(label.c_str(), _col, flags);
        col.set(0, emscripten::val(_col[0]));
        col.set(1, emscripten::val(_col[1]));
        col.set(2, emscripten::val(_col[2]));
        return ret;
    }));
    // IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
    emscripten::function("ColorPicker4", FUNCTION(bool, (std::string label, emscripten::val col, ImGuiColorEditFlags flags, emscripten::val ref_col), {
        float _col[4] = { 0.0f, 0.0f, 0.0f, 0.0f };
        _col[0] = col[0].as<float>();
        _col[1] = col[1].as<float>();
        _col[2] = col[2].as<float>();
        _col[3] = col[3].as<float>();
        bool ret = ImGui::ColorPicker4(label.c_str(), _col, flags); // TODO: ref_col
        col.set(0, emscripten::val(_col[0]));
        col.set(1, emscripten::val(_col[1]));
        col.set(2, emscripten::val(_col[2]));
        col.set(3, emscripten::val(_col[3]));
        return ret;
    }));
    // IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
    emscripten::function("ColorButton", FUNCTION(bool, (std::string label, emscripten::val col, ImGuiColorEditFlags flags, emscripten::val size), {
        return ImGui::ColorButton(label.c_str(), import_ImVec4(col), flags, import_ImVec2(size));
    }));
    // IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
    emscripten::function("SetColorEditOptions", &ImGui::SetColorEditOptions);

    // Widgets: Trees
    // IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
    // IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
    // IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
    // IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
    // IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
    emscripten::function("TreeNode", FUNCTION(bool, (emscripten::val label_or_id, std::string fmt), {
        // return ImGui::TreeNode(label.c_str(), "%s", fmt.c_str());
        if (label_or_id.typeOf().equals(emscripten::val("string"))) {
            return ImGui::TreeNode(label_or_id.as<std::string>().c_str(), "%s", fmt.c_str());    
        } else {
            return ImGui::TreeNode((const void*) label_or_id.as<int>(), "%s", fmt.c_str());    
        }
    }));
    // IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
    // IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    // IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    emscripten::function("TreeNodeEx", FUNCTION(bool, (emscripten::val label_or_id, ImGuiTreeNodeFlags flags, std::string fmt), {
        // return ImGui::TreeNodeEx(label.c_str(), flags, "%s", fmt.c_str());
        if (label_or_id.typeOf().equals(emscripten::val("string"))) {
            return ImGui::TreeNodeEx(label_or_id.as<std::string>().c_str(), flags, "%s", fmt.c_str());    
        } else {
            return ImGui::TreeNodeEx((const void*) label_or_id.as<int>(), flags, "%s", fmt.c_str());    
        }
    }));
    // IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
    // IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
    emscripten::function("TreePush", FUNCTION(void, (emscripten::val id), {
        if (id.typeOf().equals(emscripten::val("string"))) {
            ImGui::TreePush(id.as<std::string>().c_str());
        } else {
            ImGui::TreePush((const void*) id.as<int>());
        }
    }));
    // IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
    emscripten::function("TreePop", &ImGui::TreePop);
    // IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
    emscripten::function("TreeAdvanceToLabelPos", &ImGui::TreeAdvanceToLabelPos);
    // IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
    emscripten::function("GetTreeNodeToLabelSpacing", &ImGui::GetTreeNodeToLabelSpacing);
    // IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    emscripten::function("SetNextTreeNodeOpen", &ImGui::SetNextTreeNodeOpen);
    // IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
    // IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
    emscripten::function("CollapsingHeader", FUNCTION(bool, (std::string label, emscripten::val p_open, int flags), {
        if (p_open.isNull()) {
            return ImGui::CollapsingHeader(label.c_str(), flags);
        } else {
            bool _p_open = p_open[0].as<bool>();
            bool ret = ImGui::CollapsingHeader(label.c_str(), &_p_open, flags);
            p_open.set(0, emscripten::val(_p_open));
            return ret;
        }
    }));

    // Widgets: Selectable / Lists
    // IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
    // IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
    emscripten::function("Selectable", FUNCTION(bool, (std::string label, emscripten::val p_selected, ImGuiSelectableFlags flags, emscripten::val size), {
        if (p_selected.typeOf().equals(emscripten::val("boolean"))) {
            return ImGui::Selectable(label.c_str(), p_selected.as<bool>(), flags, import_ImVec2(size));    
        } else {
            bool selected = p_selected[0].as<bool>();
            bool ret = ImGui::Selectable(label.c_str(), &selected, flags, import_ImVec2(size));
            p_selected.set(0, emscripten::val(selected));
            return ret;
        }
    }));
    // IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
    // IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
    emscripten::function("ListBox", FUNCTION(bool, (std::string label, emscripten::val current_item, emscripten::val items, int items_count, int height_in_items), {
        static emscripten::val _items = items;
        static int _items_count = items_count;
        static std::string _list_box_item;
        int _current_item = current_item[0].as<int>();
        bool ret = ImGui::ListBox(label.c_str(), &_current_item, FUNCTION(bool, (void* data, int idx, const char** out_text), {
            if (0 <= idx && idx <= _items_count) {
                _list_box_item = _items[idx].as<std::string>();
                *out_text = _list_box_item.c_str();
                return true;
            } else {
                return false;
            }
        }), NULL, items_count, height_in_items);
        current_item.set(0, emscripten::val(_current_item));
        return ret;
    }));
    // IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
    // IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
    emscripten::function("ListBoxHeader", FUNCTION(bool, (std::string label, emscripten::val size), {
        return ImGui::ListBoxHeader(label.c_str(), import_ImVec2(size));
    }));
    // IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
    emscripten::function("ListBoxFooter", &ImGui::ListBoxFooter);

    // Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
    // IMGUI_API void          Value(const char* prefix, bool b);
    // IMGUI_API void          Value(const char* prefix, int v);
    // IMGUI_API void          Value(const char* prefix, unsigned int v);
    // IMGUI_API void          Value(const char* prefix, float v, const char* float_format = NULL);
    emscripten::function("Value", FUNCTION(void, (std::string prefix, emscripten::val value), {
        if (value.typeOf().equals(emscripten::val("boolean"))) {
            ImGui::Value(prefix.c_str(), value.as<bool>());
        } else if (value.typeOf().equals(emscripten::val("number"))) {
            ImGui::Value(prefix.c_str(), value.as<float>());
        } else {
            ImGui::LabelText(prefix.c_str(), "%s", value.as<std::string>().c_str());
        }
    }));

    // Tooltips
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    emscripten::function("SetTooltip", FUNCTION(void, (std::string fmt), {
        ImGui::SetTooltip("%s", fmt.c_str());
    }));
    // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
    emscripten::function("BeginTooltip", &ImGui::BeginTooltip);
    // IMGUI_API void          EndTooltip();
    emscripten::function("EndTooltip", &ImGui::EndTooltip);

    // Menus
    // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
    emscripten::function("BeginMainMenuBar", &ImGui::BeginMainMenuBar);
    // IMGUI_API void          EndMainMenuBar();
    emscripten::function("EndMainMenuBar", &ImGui::EndMainMenuBar);
    // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
    emscripten::function("BeginMenuBar", &ImGui::BeginMenuBar);
    // IMGUI_API void          EndMenuBar();
    emscripten::function("EndMenuBar", &ImGui::EndMenuBar);
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    emscripten::function("BeginMenu", FUNCTION(bool, (std::string label, bool enabled), {
        return ImGui::BeginMenu(label.c_str(), enabled);
    }));
    // IMGUI_API void          EndMenu();
    emscripten::function("EndMenu", &ImGui::EndMenu);
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
    emscripten::function("MenuItem", FUNCTION(bool, (std::string label, std::string shortcut, emscripten::val selected, bool enabled), {
        bool _selected = selected[0].as<bool>();
        bool ret = ImGui::MenuItem(label.c_str(), shortcut.c_str(), &_selected, enabled);
        selected.set(0, emscripten::val(_selected));
        return ret;
    }));

    // Popups
    // IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
    emscripten::function("OpenPopup", FUNCTION(void, (std::string str_id), { ImGui::OpenPopup(str_id.c_str()); }));
    // IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
    emscripten::function("OpenPopupOnItemClick", FUNCTION(bool, (std::string str_id, int mouse_button), { return ImGui::OpenPopupOnItemClick(str_id.c_str(), mouse_button); }));
    // IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
    emscripten::function("BeginPopup", FUNCTION(bool, (std::string str_id), { return ImGui::BeginPopup(str_id.c_str()); }));
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
    emscripten::function("BeginPopupModal", FUNCTION(bool, (std::string name, emscripten::val p_open, ImGuiWindowFlags extra_flags), {
        bool open = p_open[0].as<bool>();
        bool ret = ImGui::BeginPopupModal(name.c_str(), &open, extra_flags);
        p_open.set(0, emscripten::val(open));
        return ret;
    }));
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    emscripten::function("BeginPopupContextItem", FUNCTION(bool, (std::string str_id, int mouse_button), { return ImGui::BeginPopupContextItem(str_id.c_str(), mouse_button); }));
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
    emscripten::function("BeginPopupContextWindow", FUNCTION(bool, (std::string str_id, int mouse_button, bool also_over_items), { return ImGui::BeginPopupContextWindow(str_id.c_str(), mouse_button, also_over_items); }));
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
    emscripten::function("BeginPopupContextVoid", FUNCTION(bool, (std::string str_id, int mouse_button), { return ImGui::BeginPopupContextVoid(str_id.c_str(), mouse_button); }));
    // IMGUI_API void          EndPopup();
    emscripten::function("EndPopup", &ImGui::EndPopup);
    // IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
    emscripten::function("IsPopupOpen", FUNCTION(bool, (std::string str_id), { return ImGui::IsPopupOpen(str_id.c_str()); }));
    // IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
    emscripten::function("CloseCurrentPopup", &ImGui::CloseCurrentPopup);

    // Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
    // IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
    emscripten::function("LogToTTY", &ImGui::LogToTTY);
    // IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
    emscripten::function("LogToFile", FUNCTION(void, (int max_depth, emscripten::val filename), {
        ImGui::LogToFile(max_depth, filename.isNull() ? NULL : filename.as<std::string>().c_str());
    }));
    // IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
    emscripten::function("LogToClipboard", &ImGui::LogToClipboard);
    // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
    emscripten::function("LogFinish", &ImGui::LogFinish);
    // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
    emscripten::function("LogButtons", &ImGui::LogButtons);
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    emscripten::function("LogText", FUNCTION(void, (std::string fmt), {
        ImGui::LogText("%s", fmt.c_str());
    }));

    // Drag and Drop
    // [BETA API] Missing Demo code. API may evolve.
    // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
    emscripten::function("BeginDragDropSource", &ImGui::BeginDragDropSource);
    // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
    emscripten::function("SetDragDropPayload", FUNCTION(bool, (std::string type, emscripten::val data, size_t size, ImGuiCond cond), {
        TODO();
        return false;
    }));
    // IMGUI_API void          EndDragDropSource();
    emscripten::function("EndDragDropSource", &ImGui::EndDragDropSource);
    // IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
    emscripten::function("BeginDragDropTarget", &ImGui::BeginDragDropTarget);
    // IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
    emscripten::function("AcceptDragDropPayload", FUNCTION(emscripten::val, (std::string type, ImGuiDragDropFlags flags), {
        TODO();
        return emscripten::val::null();
    }));
    // IMGUI_API void          EndDragDropTarget();
    emscripten::function("EndDragDropTarget", &ImGui::EndDragDropTarget);

    // Clipping
    // IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
    emscripten::function("PushClipRect", FUNCTION(void, (emscripten::val clip_rect_min, emscripten::val clip_rect_max, bool intersect_with_current_clip_rect), {
        return ImGui::PushClipRect(import_ImVec2(clip_rect_min), import_ImVec2(clip_rect_max), intersect_with_current_clip_rect);
    }));
    // IMGUI_API void          PopClipRect();
    emscripten::function("PopClipRect", &ImGui::PopClipRect);

    // Styles
    // IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
    emscripten::function("StyleColorsClassic", FUNCTION(void, (ImGuiStyle* dst), { ImGui::StyleColorsClassic(dst); }), emscripten::allow_raw_pointers());
    // IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
    emscripten::function("StyleColorsDark", FUNCTION(void, (ImGuiStyle* dst), { ImGui::StyleColorsDark(dst); }), emscripten::allow_raw_pointers());
    // IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
    emscripten::function("StyleColorsLight", FUNCTION(void, (ImGuiStyle* dst), { ImGui::StyleColorsLight(dst); }), emscripten::allow_raw_pointers());

    // Focus
    // (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
    // (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
    // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
    emscripten::function("SetItemDefaultFocus", &ImGui::SetItemDefaultFocus);
    // IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
    emscripten::function("SetKeyboardFocusHere", &ImGui::SetKeyboardFocusHere);

    // Utilities
    // IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
    emscripten::function("IsItemHovered", &ImGui::IsItemHovered);
    // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
    emscripten::function("IsItemActive", &ImGui::IsItemActive);
    // IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
    emscripten::function("IsItemClicked", &ImGui::IsItemClicked);
    // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
    emscripten::function("IsItemVisible", &ImGui::IsItemVisible);
    // IMGUI_API bool          IsAnyItemHovered();
    emscripten::function("IsAnyItemHovered", &ImGui::IsAnyItemHovered);
    // IMGUI_API bool          IsAnyItemActive();
    emscripten::function("IsAnyItemActive", &ImGui::IsAnyItemActive);
    // IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
    emscripten::function("GetItemRectMin", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetItemRectMin(), out);
    }));
    // IMGUI_API ImVec2        GetItemRectMax();                                                   // "
    emscripten::function("GetItemRectMax", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetItemRectMax(), out);
    }));
    // IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
    emscripten::function("GetItemRectSize", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetItemRectSize(), out);
    }));
    // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
    emscripten::function("SetItemAllowOverlap", &ImGui::SetItemAllowOverlap);
    // IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
    emscripten::function("IsWindowFocused", &ImGui::IsWindowFocused);
    // IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
    emscripten::function("IsWindowHovered", &ImGui::IsWindowHovered);
    // IMGUI_API bool          IsAnyWindowFocused();
    emscripten::function("IsAnyWindowFocused", &ImGui::IsAnyWindowFocused);
    // IMGUI_API bool          IsAnyWindowHovered();                                               // is mouse hovering any visible window
    emscripten::function("IsAnyWindowHovered", &ImGui::IsAnyWindowHovered);
    // IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
    // IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
    emscripten::function("IsRectVisible", FUNCTION(bool, (emscripten::val size_or_rect_min, emscripten::val rect_max), {
        if (rect_max.isUndefined()) {
            return ImGui::IsRectVisible(import_ImVec2(size_or_rect_min));
        } else {
            return ImGui::IsRectVisible(import_ImVec2(size_or_rect_min), import_ImVec2(rect_max));
        }
    }));
    // IMGUI_API float         GetTime();
    emscripten::function("GetTime", &ImGui::GetTime);
    // IMGUI_API int           GetFrameCount();
    emscripten::function("GetFrameCount", &ImGui::GetFrameCount);
    // IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
    emscripten::function("GetOverlayDrawList", FUNCTION(emscripten::val, (), {
        ImDrawList* p = ImGui::GetOverlayDrawList(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
    emscripten::function("GetDrawListSharedData", FUNCTION(emscripten::val, (), {
        ImDrawListSharedData* p = ImGui::GetDrawListSharedData(); return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
    emscripten::function("GetStyleColorName", FUNCTION(std::string, (ImGuiCol idx), { return std::string(ImGui::GetStyleColorName(idx)); }));
    // IMGUI_API ImVec2        CalcItemRectClosestPoint(const ImVec2& pos, bool on_edge = false, float outward = +0.0f);   // utility to find the closest point the last item bounding rectangle edge. useful to visually link items
    emscripten::function("CalcItemRectClosestPoint", FUNCTION(emscripten::val, (emscripten::val pos, bool on_edge, float outward, emscripten::val out), {
        return export_ImVec2(ImGui::CalcItemRectClosestPoint(import_ImVec2(pos), on_edge, outward), out);
    }));
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    emscripten::function("CalcTextSize", FUNCTION(emscripten::val, (std::string text, emscripten::val text_end, bool hide_text_after_double_hash, float wrap_width, emscripten::val out), {
        return export_ImVec2(ImGui::CalcTextSize(text.c_str(), NULL, hide_text_after_double_hash, wrap_width), out); // TODO: text_end
    }));
    // IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
    emscripten::function("CalcListClipping", FUNCTION(void, (int items_count, float items_height, emscripten::val out_items_display_start, emscripten::val out_items_display_end), {
        int _out_items_display_start = -1;
        int _out_items_display_end = -1;
        ImGui::CalcListClipping(items_count, items_height, &_out_items_display_start, &_out_items_display_end);
        out_items_display_start.set(0, emscripten::val(_out_items_display_start));
        out_items_display_end.set(0, emscripten::val(_out_items_display_end));
    }));

    // IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
    emscripten::function("BeginChildFrame", &ImGui::BeginChildFrame);
    // IMGUI_API void          EndChildFrame();
    emscripten::function("EndChildFrame", &ImGui::EndChildFrame);

    // IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
    emscripten::function("ColorConvertU32ToFloat4", FUNCTION(emscripten::val, (ImU32 in, emscripten::val out), {
        return export_ImVec4(ImGui::ColorConvertU32ToFloat4(in), out);
    }));
    // IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
    emscripten::function("ColorConvertFloat4ToU32", &ImGui::ColorConvertFloat4ToU32);
    // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
    emscripten::function("ColorConvertRGBtoHSV", FUNCTION(void, (float r, float g, float b, emscripten::val out_h, emscripten::val out_s, emscripten::val out_v), {
        float h, s, v;
        ImGui::ColorConvertRGBtoHSV(r, g, b, h, s, v);
        out_h.set(0, emscripten::val(h));
        out_s.set(0, emscripten::val(s));
        out_v.set(0, emscripten::val(v));
    }));
    // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
    emscripten::function("ColorConvertHSVtoRGB", FUNCTION(void, (float h, float s, float v, emscripten::val out_r, emscripten::val out_g, emscripten::val out_b), {
        float r, g, b;
        ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b);
        out_r.set(0, emscripten::val(r));
        out_g.set(0, emscripten::val(g));
        out_b.set(0, emscripten::val(b));
    }));

    // Inputs
    // IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
    emscripten::function("GetKeyIndex", &ImGui::GetKeyIndex);
    // IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
    emscripten::function("IsKeyDown", &ImGui::IsKeyDown);
    // IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
    emscripten::function("IsKeyPressed", &ImGui::IsKeyPressed);
    // IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
    emscripten::function("IsKeyReleased", &ImGui::IsKeyReleased);
    // IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
    emscripten::function("GetKeyPressedAmount", &ImGui::GetKeyPressedAmount);
    // IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
    emscripten::function("IsMouseDown", &ImGui::IsMouseDown);
    // IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
    emscripten::function("IsMouseClicked", &ImGui::IsMouseClicked);
    // IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
    emscripten::function("IsMouseDoubleClicked", &ImGui::IsMouseDoubleClicked);
    // IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
    emscripten::function("IsMouseReleased", &ImGui::IsMouseReleased);
    // IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    emscripten::function("IsMouseDragging", &ImGui::IsMouseDragging);
    // IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
    emscripten::function("IsMouseHoveringRect", FUNCTION(bool, (emscripten::val r_min, emscripten::val r_max, bool clip), {
        return ImGui::IsMouseHoveringRect(import_ImVec2(r_min), import_ImVec2(r_max), clip);
    }));
    // IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
    emscripten::function("IsMousePosValid", FUNCTION(bool, (emscripten::val mouse_pos), {
        if (mouse_pos.isNull()) {
            return ImGui::IsMousePosValid();
        } else {
            ImVec2 _mouse_pos = import_ImVec2(mouse_pos);
            return ImGui::IsMousePosValid(&_mouse_pos);
        }
    }));
    // IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
    emscripten::function("GetMousePos", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetMousePos(), out);
    }));
    // IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
    emscripten::function("GetMousePosOnOpeningCurrentPopup", FUNCTION(emscripten::val, (emscripten::val out), {
        return export_ImVec2(ImGui::GetMousePosOnOpeningCurrentPopup(), out);
    }));
    // IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
    emscripten::function("GetMouseDragDelta", FUNCTION(emscripten::val, (int button, float lock_threshold, emscripten::val out), {
        return export_ImVec2(ImGui::GetMouseDragDelta(button, lock_threshold), out);
    }));
    // IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
    emscripten::function("ResetMouseDragDelta", &ImGui::ResetMouseDragDelta);
    // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
    emscripten::function("GetMouseCursor", &ImGui::GetMouseCursor);
    // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
    emscripten::function("SetMouseCursor", &ImGui::SetMouseCursor);
    // IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
    emscripten::function("CaptureKeyboardFromApp", &ImGui::CaptureKeyboardFromApp);
    // IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
    emscripten::function("CaptureMouseFromApp", &ImGui::CaptureMouseFromApp);

    // Helpers functions to access functions pointers in ImGui::GetIO()
    // IMGUI_API void*         MemAlloc(size_t sz);
    emscripten::function("MemAlloc", FUNCTION(emscripten::val, (size_t sz), {
        void* p = ImGui::MemAlloc(sz);
        return emscripten::val(p);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API void          MemFree(void* ptr);
    emscripten::function("MemFree", FUNCTION(void, (emscripten::val ptr), {
        void* _ptr = ptr.as<void*>(emscripten::allow_raw_pointers());
        ImGui::MemFree(_ptr);
    }));
    // IMGUI_API const char*   GetClipboardText();
    emscripten::function("GetClipboardText", FUNCTION(std::string, (), {
        return ImGui::GetClipboardText();
    }));
    // IMGUI_API void          SetClipboardText(const char* text);
    emscripten::function("SetClipboardText", FUNCTION(void, (emscripten::val text), {
        ImGui::SetClipboardText(text.as<std::string>().c_str());
    }));

    // Internal context access - if you want to use multiple context, share context between modules (e.g. DLL). There is a default context created and active by default.
    // All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
    // IMGUI_API const char*   GetVersion();
    emscripten::function("GetVersion", FUNCTION(std::string, (), {
        return ImGui::GetVersion();
    }));
    // IMGUI_API ImGuiContext* CreateContext(void* (*malloc_fn)(size_t) = NULL, void (*free_fn)(void*) = NULL);
    emscripten::function("CreateContext", FUNCTION(emscripten::val, (), {
        ImGuiContext* ctx = ImGui::CreateContext();
        return (ctx == NULL) ? emscripten::val::null() : emscripten::val(ctx);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API void          DestroyContext(ImGuiContext* ctx);
    emscripten::function("DestroyContext", FUNCTION(void, (emscripten::val ctx), {
        ImGuiContext* _ctx = ctx.isNull() ? NULL : ctx.as<ImGuiContext*>(emscripten::allow_raw_pointers());
        ImGui::DestroyContext(_ctx);
    }));
    // IMGUI_API ImGuiContext* GetCurrentContext();
    emscripten::function("GetCurrentContext", FUNCTION(emscripten::val, (), {
        ImGuiContext* ctx = ImGui::GetCurrentContext();
        return (ctx == NULL) ? emscripten::val::null() : emscripten::val(ctx);
    }), emscripten::allow_raw_pointers());
    // IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
    emscripten::function("SetCurrentContext", FUNCTION(void, (emscripten::val ctx), {
        ImGuiContext* _ctx = ctx.isNull() ? NULL : ctx.as<ImGuiContext*>(emscripten::allow_raw_pointers());
        ImGui::SetCurrentContext(_ctx);
    }));
}
