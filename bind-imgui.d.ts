import * as Emscripten from "./emscripten";

// emcc -s MODULARIZE=0
// declare const Module: ImGuiModule; export default Module;

// emcc -s MODULARIZE=1
export default function Module(Module?: Partial<Module>): Promise<Module>;

export interface mallinfo {
    arena: number;
    ordblks: number;
    smblks: number;
    hblks: number;
    hblkhd: number;
    usmblks: number;
    fsmblks: number;
    uordblks: number;
    fordblks: number;
    keepcost: number;
}

export type ImAccess<T> = (value?: T) => T;
export type ImScalar<T> = [ T ];
export type ImTuple2<T> = [ T, T ];
export type ImTuple3<T> = [ T, T, T ];
export type ImTuple4<T> = [ T, T, T, T ];

// Typedefs and Enumerations (declared as int for compatibility and to not pollute the top of this file)
// typedef unsigned int ImU32;         // 32-bit unsigned integer (typically used to store packed colors)
export type ImU32 = number;
// typedef unsigned int ImGuiID;       // unique ID used by widgets (typically hashed from a stack of string)
export type ImGuiID = number;
// typedef unsigned short ImWchar;     // character for keyboard input/display
export type ImWchar = number;
// typedef void* ImTextureID;          // user data to identify a texture (this is whatever to you want it to be! read the FAQ about ImTextureID in imgui.cpp)
export type ImTextureID = number;

type ImGuiWindowFlags = number;
type ImGuiInputTextFlags = number;
type ImGuiTreeNodeFlags = number;
type ImGuiSelectableFlags = number;
type ImGuiComboFlags = number;
type ImGuiTabBarFlags = number;
type ImGuiTabItemFlags = number;
type ImGuiFocusedFlags = number;
type ImGuiHoveredFlags = number;
type ImGuiDragDropFlags = number;
type ImGuiDataType = number;
type ImGuiDir = number;
type ImGuiKey = number;
type ImGuiNavInput = number;
type ImGuiConfigFlags = number;
type ImGuiBackendFlags = number;
type ImGuiCol = number;
type ImGuiStyleVar = number;
type ImGuiColorEditFlags = number;
type ImGuiMouseCursor = number;
type ImGuiCond = number;

type ImDrawCornerFlags = number;
type ImDrawListFlags = number;

export class WrapImGuiContext extends Emscripten.EmscriptenClass {}

export interface interface_ImVec2 {
    x: number;
    y: number;
    Set(x: number, y: number): this;
    Copy(other: Readonly<interface_ImVec2>): this;
    Equals(other: Readonly<interface_ImVec2>): boolean;
}

export interface reference_ImVec2 extends Emscripten.EmscriptenClassReference, interface_ImVec2 {}

export interface interface_ImVec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    Set(x: number, y: number, z: number, w: number): this;
    Copy(other: Readonly<interface_ImVec4>): this;
    Equals(other: Readonly<interface_ImVec4>): boolean;
}

export interface reference_ImVec4 extends Emscripten.EmscriptenClassReference, interface_ImVec4 {}

export type ImGuiInputTextCallback = (data: reference_ImGuiInputTextCallbackData) => number;

// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
export interface reference_ImGuiInputTextCallbackData extends Emscripten.EmscriptenClassReference {
    // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
    EventFlag: ImGuiInputTextFlags;
    // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    Flags: ImGuiInputTextFlags;
    // void*               UserData;       // What user passed to InputText()      // Read-only
    UserData: any;

    // CharFilter event:
    // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
    EventChar: ImWchar;

    // Completion,History,Always events:
    // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
    // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
    EventKey: ImGuiKey;
    // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
    Buf: string;
    // int                 BufTextLen;     // Current text length in bytes         // Read-write
    BufTextLen: number;
    // int                 BufSize;        // Maximum text length in bytes         // Read-only
    BufSize: number;
    // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
    BufDirty: boolean;
    // int                 CursorPos;      //                                      // Read-write
    CursorPos: number;
    // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
    SelectionStart: number;
    // int                 SelectionEnd;   //                                      // Read-write
    SelectionEnd: number;

    // NB: Helper functions for text manipulation. Calling those function loses selection.
    // IMGUI_API void    DeleteChars(int pos, int bytes_count);
    DeleteChars(pos: number, bytes_count: number): void;
    // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
    InsertChars(pos: number, text: string): void;
    // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
    HasSelection(): boolean;
}

export type ImGuiSizeConstraintCallback = (data: reference_ImGuiSizeCallbackData) => void;

// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
export interface reference_ImGuiSizeCallbackData extends Emscripten.EmscriptenClassReference
{
    // void*   UserData;       // Read-only.   What user passed to SetNextWindowSizeConstraints()
    // UserData: any;
    // ImVec2  Pos;            // Read-only.   Window position, for reference.
    Pos: Readonly<reference_ImVec2>;
    // ImVec2  CurrentSize;    // Read-only.   Current window size.
    CurrentSize: Readonly<reference_ImVec2>;
    // ImVec2  DesiredSize;    // Read-write.  Desired size, based on user's mouse position. Write to this field to restrain resizing.
    DesiredSize: reference_ImVec2;
}

export class ImGuiListClipper extends Emscripten.EmscriptenClass {
    public StartPosY: number;
    public ItemsHeight: number;
    public ItemsCount: number;
    public StepNo: number;
    public DisplayStart: number;
    public DisplayEnd: number;

    // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
    // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
    // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
    // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
    constructor(items_count?: number, items_height?: number);
    // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.

    // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
    public Step(): boolean;
    // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
    public Begin(items_count: number, items_height: number): void;
    // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
    public End(): void;
}

// You may modify the ImGui::GetStyle() main instance during initialization and before NewFrame().
// During the frame, prefer using ImGui::PushStyleVar(ImGuiStyleVar_XXXX)/PopStyleVar() to alter the main style values, and ImGui::PushStyleColor(ImGuiCol_XXX)/PopStyleColor() for colors.
export interface interface_ImGuiStyle {
    // float       Alpha;                      // Global alpha applies to everything in ImGui.
    Alpha: number;
    // ImVec2      WindowPadding;              // Padding within a window.
    readonly WindowPadding: interface_ImVec2;
    // float       WindowRounding;             // Radius of window corners rounding. Set to 0.0f to have rectangular windows.
    WindowRounding: number;
    // float       WindowBorderSize;           // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    WindowBorderSize: number;
    // ImVec2      WindowMinSize;              // Minimum window size. This is a global setting. If you want to constraint individual windows, use SetNextWindowSizeConstraints().
    readonly WindowMinSize: interface_ImVec2;
    // ImVec2      WindowTitleAlign;           // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
    readonly WindowTitleAlign: interface_ImVec2;
    // float       ChildRounding;              // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
    ChildRounding: number;
    // float       ChildBorderSize;            // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    ChildBorderSize: number;
    // float       PopupRounding;              // Radius of popup window corners rounding.
    PopupRounding: number;
    // float       PopupBorderSize;            // Thickness of border around popup windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    PopupBorderSize: number;
    // ImVec2      FramePadding;               // Padding within a framed rectangle (used by most widgets).
    readonly FramePadding: interface_ImVec2;
    // float       FrameRounding;              // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
    FrameRounding: number;
    // float       FrameBorderSize;            // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    FrameBorderSize: number;
    // ImVec2      ItemSpacing;                // Horizontal and vertical spacing between widgets/lines.
    readonly ItemSpacing: interface_ImVec2;
    // ImVec2      ItemInnerSpacing;           // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label).
    readonly ItemInnerSpacing: interface_ImVec2;
    // ImVec2      TouchExtraPadding;          // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
    readonly TouchExtraPadding: interface_ImVec2;
    // float       IndentSpacing;              // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
    IndentSpacing: number;
    // float       ColumnsMinSpacing;          // Minimum horizontal spacing between two columns.
    ColumnsMinSpacing: number;
    // float       ScrollbarSize;              // Width of the vertical scrollbar, Height of the horizontal scrollbar.
    ScrollbarSize: number;
    // float       ScrollbarRounding;          // Radius of grab corners for scrollbar.
    ScrollbarRounding: number;
    // float       GrabMinSize;                // Minimum width/height of a grab box for slider/scrollbar.
    GrabMinSize: number;
    // float       GrabRounding;               // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
    GrabRounding: number;
    // float       TabRounding;                // Radius of upper corners of a tab. Set to 0.0f to have rectangular tabs.
    TabRounding: number;
    // float       TabBorderSize;              // Thickness of border around tabs. 
    TabBorderSize: number;
    // ImVec2      ButtonTextAlign;            // Alignment of button text when button is larger than text. Defaults to (0.5f,0.5f) for horizontally+vertically centered.
    readonly ButtonTextAlign: interface_ImVec2;
    // ImVec2      DisplayWindowPadding;       // Window positions are clamped to be visible within the display area by at least this amount. Only covers regular windows.
    readonly DisplayWindowPadding: interface_ImVec2;
    // ImVec2      DisplaySafeAreaPadding;     // If you cannot see the edge of your screen (e.g. on a TV) increase the safe area padding. Covers popups/tooltips as well regular windows.
    readonly DisplaySafeAreaPadding: interface_ImVec2;
    // float       MouseCursorScale;           // Scale software rendered mouse cursor (when io.MouseDrawCursor is enabled). May be removed later.
    MouseCursorScale: number;
    // bool        AntiAliasedLines;           // Enable anti-aliasing on lines/borders. Disable if you are really tight on CPU/GPU.
    AntiAliasedLines: boolean;
    // bool        AntiAliasedFill;            // Enable anti-aliasing on filled shapes (rounded rectangles, circles, etc.)
    AntiAliasedFill: boolean;
    // float       CurveTessellationTol;       // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
    CurveTessellationTol: number;
    // ImVec4      Colors[ImGuiCol_COUNT];
    _getAt_Colors(idx: number): interface_ImVec4;
    _setAt_Colors(idx: number, value: Readonly<interface_ImVec4>): boolean;

    // IMGUI_API ImGuiStyle();
    // IMGUI_API void ScaleAllSizes(float scale_factor);
    ScaleAllSizes(scale_factor: number): void;
}

export class ImGuiStyle extends Emscripten.EmscriptenClass implements interface_ImGuiStyle {
    Alpha: number;
    readonly WindowPadding: reference_ImVec2;
    WindowRounding: number;
    WindowBorderSize: number;
    readonly WindowMinSize: reference_ImVec2;
    readonly WindowTitleAlign: reference_ImVec2;
    ChildRounding: number;
    ChildBorderSize: number;
    PopupRounding: number;
    PopupBorderSize: number;
    readonly FramePadding: reference_ImVec2;
    FrameRounding: number;
    FrameBorderSize: number;
    readonly ItemSpacing: reference_ImVec2;
    readonly ItemInnerSpacing: reference_ImVec2;
    readonly TouchExtraPadding: reference_ImVec2;
    IndentSpacing: number;
    ColumnsMinSpacing: number;
    ScrollbarSize: number;
    ScrollbarRounding: number;
    GrabMinSize: number;
    GrabRounding: number;
    TabRounding: number;
    TabBorderSize: number;
    readonly ButtonTextAlign: reference_ImVec2;
    readonly DisplayWindowPadding: reference_ImVec2;
    readonly DisplaySafeAreaPadding: reference_ImVec2;
    MouseCursorScale: number;
    AntiAliasedLines: boolean;
    AntiAliasedFill: boolean;
    CurveTessellationTol: number;
    _getAt_Colors(idx: number): reference_ImVec4;
    _setAt_Colors(idx: number, value: Readonly<interface_ImVec4>): boolean;

    public ScaleAllSizes(scale_factor: number): void;
}

export type ImDrawCallback = (parent_list: Readonly<reference_ImDrawList>, cmd: Readonly<reference_ImDrawCmd>) => void;

export interface reference_ImDrawCmd extends Emscripten.EmscriptenClassReference {
    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    readonly ElemCount: number;
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    readonly ClipRect: Readonly<reference_ImVec4>;
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    readonly TextureId: ImTextureID;
    // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
    // void*           UserCallbackData;       // The draw callback code can access this.

    // ImDrawCmd() { ElemCount = 0; ClipRect.x = ClipRect.y = ClipRect.z = ClipRect.w = 0.0f; TextureId = NULL; UserCallback = NULL; UserCallbackData = NULL; }
    // readonly ClipRect: Readonly<ImVec4>;
}

export interface reference_ImDrawListSharedData extends Emscripten.EmscriptenClassReference {}

export interface reference_ImDrawList extends Emscripten.EmscriptenClassReference {
    IterateDrawCmds(callback: (draw_cmd: reference_ImDrawCmd, ElemStart: number) => void): void;
    
    // This is what you have to render
    // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
    // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
    readonly IdxBuffer: Uint8Array;
    // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
    readonly VtxBuffer: Uint8Array;

    // [Internal, used while building lists]
    // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
    Flags: ImDrawListFlags;
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

    // If you want to create ImDrawList instances, pass them ImGui::GetDrawListSharedData() or create and use your own ImDrawListSharedData (so you can use ImDrawList without ImGui)
    // ImDrawList(const ImDrawListSharedData* shared_data) { _Data = shared_data; _OwnerName = NULL; Clear(); }
    // ~ImDrawList() { ClearFreeMemory(); }
    // IMGUI_API void  PushClipRect(ImVec2 clip_rect_min, ImVec2 clip_rect_max, bool intersect_with_current_clip_rect = false);  // Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)
    PushClipRect(clip_rect_min: Readonly<interface_ImVec2>, clip_rect_max: Readonly<interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
    // IMGUI_API void  PushClipRectFullScreen();
    PushClipRectFullScreen(): void;
    // IMGUI_API void  PopClipRect();
    PopClipRect(): void;
    // IMGUI_API void  PushTextureID(const ImTextureID& texture_id);
    PushTextureID(texture_id: ImTextureID): void;
    // IMGUI_API void  PopTextureID();
    PopTextureID(): void;
    // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    GetClipRectMin(out: interface_ImVec2): typeof out;
    // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }
    GetClipRectMax(out: interface_ImVec2): typeof out;

    // Primitives
    // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
    AddLine(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    AddRect(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawCornerFlags, thickness: number): void;
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    AddRectFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawCornerFlags): void;
    // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    AddRectFilledMultiColor(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col_upr_left: ImU32, col_upr_right: ImU32, col_bot_right: ImU32, col_bot_left: ImU32): void;
    // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
    AddQuad(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
    AddQuadFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
    AddTriangle(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
    AddTriangleFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
    AddCircle(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number, thickness: number): void;
    // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
    AddCircleFilled(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number): void;
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    AddText_A(pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string): void;
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    AddText_B(font: reference_ImFont, font_size: number, pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string, wrap_width: number, cpu_fine_clip_rect: Readonly<interface_ImVec4> | null): void;
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    AddImage(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    AddImageQuad(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, uv_c: Readonly<interface_ImVec2>, uv_d: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
    AddImageRounded(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners: ImDrawCornerFlags): void;
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    AddPolyline(points: Readonly<interface_ImVec2>[], num_points: number, col: ImU32, closed: boolean, thickness: number): void;
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    AddConvexPolyFilled(points: Readonly<interface_ImVec2>[], num_points: number, col: ImU32): void;
    // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    AddBezierCurve(pos0: Readonly<interface_ImVec2>, cp0: Readonly<interface_ImVec2>, cp1: Readonly<interface_ImVec2>, pos1: Readonly<interface_ImVec2>, col: ImU32, thickness: number, num_segments: number): void;

    // Stateful path API, add points then finish with PathFill() or PathStroke()
    // inline    void  PathClear()                                                 { _Path.resize(0); }
    PathClear(): void;
    // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
    PathLineTo(pos: Readonly<interface_ImVec2>): void;
    // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
    PathLineToMergeDuplicate(pos: Readonly<interface_ImVec2>): void;
    // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
    PathFillConvex(col: ImU32): void;
    // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
    PathStroke(col: ImU32, closed: boolean, thickness: number): void;
    // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
    PathArcTo(centre: Readonly<interface_ImVec2>, radius: number, a_min: number, a_max: number, num_segments: number): void;
    // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
    PathArcToFast(centre: Readonly<interface_ImVec2>, radius: number, a_min_of_12: number, a_max_of_12: number): void;
    // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
    PathBezierCurveTo(p1: Readonly<interface_ImVec2>, p2: Readonly<interface_ImVec2>, p3: Readonly<interface_ImVec2>, num_segments: number): void;
    // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);
    PathRect(rect_min: Readonly<interface_ImVec2>, rect_max: Readonly<interface_ImVec2>, rounding: number, rounding_corners_flags: ImDrawCornerFlags): void;

    // Channels
    // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
    // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
    // IMGUI_API void  ChannelsSplit(int channels_count);
    ChannelsSplit(channels_count: number): void;
    // IMGUI_API void  ChannelsMerge();
    ChannelsMerge(): void;
    // IMGUI_API void  ChannelsSetCurrent(int channel_index);
    ChannelsSetCurrent(channel_index: number): void;

    // Advanced
    // IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
    AddCallback(callback: ImDrawCallback, callback_data: any): void;
    // IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
    AddDrawCmd(): void;

    // Internal helpers
    // NB: all primitives needs to be reserved via PrimReserve() beforehand!
    // IMGUI_API void  Clear();
    Clear(): void;
    // IMGUI_API void  ClearFreeMemory();
    ClearFreeMemory(): void;
    // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
    PrimReserve(idx_count: number, vtx_count: number): void;
    // IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
    PrimRect(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
    PrimRectUV(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
    PrimQuadUV(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, uv_c: Readonly<interface_ImVec2>, uv_d: Readonly<interface_ImVec2>, col: ImU32): void;
    // inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col){ _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
    PrimWriteVtx(pos: Readonly<interface_ImVec2>, us: Readonly<interface_ImVec2>, col: ImU32): void;
    // inline    void  PrimWriteIdx(ImDrawIdx idx)                                 { *_IdxWritePtr = idx; _IdxWritePtr++; }
    PrimWriteIdx(idx: number): void;
    // inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)     { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); }
    PrimVtx(pos: Readonly<interface_ImVec2>, uv: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  UpdateClipRect();
    UpdateClipRect(): void;
    // IMGUI_API void  UpdateTextureID();
    UpdateTextureID(): void;
}

export interface reference_ImDrawData extends Emscripten.EmscriptenClassReference {
    IterateDrawLists(callback: (draw_list: reference_ImDrawList) => void): void;

    // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
    readonly Valid: boolean;
    // ImDrawList**    CmdLists;
    // int             CmdListsCount;
    readonly CmdListsCount: number;
    // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
    readonly TotalVtxCount: number;
    // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
    readonly TotalIdxCount: number;
    // ImVec2          DisplayPos;             // Upper-left position of the viewport to render (== upper-left of the orthogonal projection matrix to use)
    readonly DisplayPos: Readonly<reference_ImVec2>;
    // ImVec2          DisplaySize;            // Size of the viewport to render (== io.DisplaySize for the main viewport) (DisplayPos + DisplaySize == lower-right of the orthogonal projection matrix to use)
    readonly DisplaySize: Readonly<reference_ImVec2>;

    // Functions
    // ImDrawData() { Clear(); }
    // void Clear() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; } // Draw lists are owned by the ImGuiContext and only pointed to here.
    // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    DeIndexAllBuffers(): void;
    // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    ScaleClipRects(sc: Readonly<interface_ImVec2>): void;
}

export interface reference_ImFont extends Emscripten.EmscriptenClassReference {
    // Members: Hot ~62/78 bytes
    // float                       FontSize;           // <user set>   // Height of characters, set during loading (don't change after loading)
    FontSize: number;
    // float                       Scale;              // = 1.f        // Base font scale, multiplied by the per-window font scale which you can adjust with SetFontScale()
    Scale: number;
    // ImVec2                      DisplayOffset;      // = (0.f,1.f)  // Offset font rendering by xx pixels
    readonly DisplayOffset: reference_ImVec2;
    // ImVector<ImFontGlyph>       Glyphs;             //              // All glyphs.
    IterateGlyphs(callback: (cfg: reference_ImFontGlyph) => void): void;
    // ImVector<float>             IndexAdvanceX;      //              // Sparse. Glyphs->AdvanceX in a directly indexable way (more cache-friendly, for CalcTextSize functions which are often bottleneck in large UI).
    // IndexAdvanceX: any;
    // ImVector<unsigned short>    IndexLookup;        //              // Sparse. Index glyphs by Unicode code-point.
    // IndexLookup: any;
    // const ImFontGlyph*          FallbackGlyph;      // == FindGlyph(FontFallbackChar)
    // FallbackGlyph: any;
    FallbackGlyph: Readonly<reference_ImFontGlyph> | null;
    // float                       FallbackAdvanceX;   // == FallbackGlyph->AdvanceX
    FallbackAdvanceX: number;
    // ImWchar                     FallbackChar;       // = '?'        // Replacement glyph if one isn't found. Only set via SetFallbackChar()
    FallbackChar: number;
    
    // Members: Cold ~18/26 bytes
    // short                       ConfigDataCount;    // ~ 1          // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
    ConfigDataCount: number;
    // ImFontConfig*               ConfigData;         //              // Pointer within ContainerAtlas->ConfigData
    // ConfigData: any;
    IterateConfigData(callback: (cfg: interface_ImFontConfig) => void): void;
    // ImFontAtlas*                ContainerAtlas;     //              // What we has been loaded into
    // ContainerAtlas: any;
    // float                       Ascent, Descent;    //              // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
    Ascent: number;
    Descent: number;
    // int                         MetricsTotalSurface;//              // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)
    MetricsTotalSurface: number;
    
    // Methods
    // IMGUI_API ImFont();
    // IMGUI_API ~ImFont();
    // IMGUI_API void              ClearOutputData();
    ClearOutputData(): void;
    // IMGUI_API void              BuildLookupTable();
    BuildLookupTable(): void;
    // IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
    FindGlyph(c: number): Readonly<reference_ImFontGlyph> | null;
    // IMGUI_API const ImFontGlyph*FindGlyphNoFallback(ImWchar c) const;
    FindGlyphNoFallback(c: number): Readonly<reference_ImFontGlyph> | null;
    // IMGUI_API void              SetFallbackChar(ImWchar c);
    SetFallbackChar(c: number): void;
    // float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
    GetCharAdvance(c: number): number;
    // bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
    IsLoaded(): boolean;
    // const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }
    GetDebugName(): string;

    // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
    // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
    // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
    CalcTextSizeA(size: number, max_width: number, wrap_width: number, text_begin: string, remaining: ImScalar<number> | null, out: interface_ImVec2): interface_ImVec2;
    // IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
    CalcWordWrapPositionA(scale: number, text: string, wrap_width: number): number;
    // IMGUI_API void              RenderChar(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, unsigned short c) const;
    RenderChar(draw_list: reference_ImDrawList, size: number, pos: Readonly<interface_ImVec2>, col: ImU32, c: ImWchar): void;
    // IMGUI_API void              RenderText(ImDrawList* draw_list, float size, ImVec2 pos, ImU32 col, const ImVec4& clip_rect, const char* text_begin, const char* text_end, float wrap_width = 0.0f, bool cpu_fine_clip = false) const;

    // [Internal]
    // IMGUI_API void              GrowIndex(int new_size);
    // IMGUI_API void              AddGlyph(ImWchar c, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, float advance_x);
    // IMGUI_API void              AddRemapChar(ImWchar dst, ImWchar src, bool overwrite_dst = true); // Makes 'dst' character/glyph points to 'src' character/glyph. Currently needs to be called AFTER fonts have been built.

    // #ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    // typedef ImFontGlyph Glyph; // OBSOLETE 1.52+
    // #endif
}

export interface interface_ImFontConfig {
    // void*           FontData;                   //          // TTF/OTF data
    // int             FontDataSize;               //          // TTF/OTF data size
    FontData: DataView | null;
    // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
    FontDataOwnedByAtlas: boolean;
    // int             FontNo;                     // 0        // Index of font within TTF/OTF file
    FontNo: number;
    // float           SizePixels;                 //          // Size in pixels for rasterizer.
    SizePixels: number;
    // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
    OversampleH: number;
    OversampleV: number;
    // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
    PixelSnapH: boolean;
    // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
    readonly GlyphExtraSpacing: interface_ImVec2;
    // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
    readonly GlyphOffset: interface_ImVec2;
    // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
    GlyphRanges: number | null;
    // float           GlyphMinAdvanceX;           // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
    GlyphMinAdvanceX: number;
    // float           GlyphMaxAdvanceX;           // FLT_MAX  // Maximum AdvanceX for glyphs
    GlyphMaxAdvanceX: number;
    // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
    MergeMode: boolean;
    // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
    RasterizerFlags: number;
    // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
    RasterizerMultiply: number;

    // [Internal]
    // char            Name[32];                               // Name (strictly to ease debugging)
    Name: string;
    // ImFont*         DstFont;
    DstFont: reference_ImFont | null;

    // IMGUI_API ImFontConfig();
}

export interface reference_ImFontConfig extends Emscripten.EmscriptenClassReference, interface_ImFontConfig {}

export interface interface_ImFontGlyph {
    // ImWchar         Codepoint;          // 0x0000..0xFFFF
    Codepoint: number;
    // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
    AdvanceX: number;
    // float           X0, Y0, X1, Y1;     // Glyph corners
    X0: number;
    Y0: number;
    X1: number;
    Y1: number;
    // float           U0, V0, U1, V1;     // Texture coordinates
    U0: number;
    V0: number;
    U1: number;
    V1: number;
}

export interface reference_ImFontGlyph extends Emscripten.EmscriptenClassReference, interface_ImFontGlyph {}

export type ImFontAtlasFlags = number;

export interface reference_ImFontAtlas extends Emscripten.EmscriptenClassReference {
    // IMGUI_API ImFontAtlas();
    // IMGUI_API ~ImFontAtlas();
    // IMGUI_API ImFont*           AddFont(const ImFontConfig* font_cfg);
    // IMGUI_API ImFont*           AddFontDefault(const ImFontConfig* font_cfg = NULL);
    AddFontDefault(font_cfg: interface_ImFontConfig | null): reference_ImFont;
    // IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
    // IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after Build(). Set font_cfg->FontDataOwnedByAtlas to false to keep ownership.
    AddFontFromMemoryTTF(data: Uint8Array, size_pixels: number, font_cfg: interface_ImFontConfig | null, glyph_ranges: number | null): reference_ImFont;
    // IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
    // IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
    // IMGUI_API void              ClearTexData();             // Clear the CPU-side texture data. Saves RAM once the texture has been copied to graphics memory.
    ClearTexData(): void;
    // IMGUI_API void              ClearInputData();           // Clear the input TTF data (inc sizes, glyph ranges)
    ClearInputData(): void;
    // IMGUI_API void              ClearFonts();               // Clear the ImGui-side font data (glyphs storage, UV coordinates)
    ClearFonts(): void;
    // IMGUI_API void              Clear();                    // Clear all
    Clear(): void;
    
    // Build atlas, retrieve pixel data.
    // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
    // RGBA32 format is provided for convenience and compatibility, but note that unless you use CustomRect to draw color data, the RGB pixels emitted from Fonts will all be white (~75% of waste). 
    // Pitch = Width * BytesPerPixels
    // IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
    Build(): boolean;
    // IMGUI_API bool              IsBuilt()                   { return Fonts.Size > 0 && (TexPixelsAlpha8 != NULL || TexPixelsRGBA32 != NULL); }
    IsBuilt(): boolean;
    // IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
    GetTexDataAsAlpha8(): { pixels: Uint8Array, width: number, height: number, bytes_per_pixel: number };
    // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
    GetTexDataAsRGBA32(): { pixels: Uint8Array, width: number, height: number, bytes_per_pixel: number };
    // void                        SetTexID(ImTextureID id)    { TexID = id; }

    // //-------------------------------------------
    // Glyph Ranges
    // //-------------------------------------------

    // Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
    // NB: Make sure that your string are UTF-8 and NOT in your local code page. In C++11, you can create UTF-8 string literal using the u8"Hello world" syntax. See FAQ for details.
    // IMGUI_API const ImWchar*    GetGlyphRangesDefault();    // Basic Latin, Extended Latin
    GetGlyphRangesDefault(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesKorean();     // Default + Korean characters
    GetGlyphRangesKorean(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesJapanese();   // Default + Hiragana, Katakana, Half-Width, Selection of 1946 Ideographs
    GetGlyphRangesJapanese(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesChineseFull();            // Default + Half-Width + Japanese Hiragana/Katakana + full set of about 21000 CJK Unified Ideographs
    GetGlyphRangesChineseFull(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesChineseSimplifiedCommon();// Default + Half-Width + Japanese Hiragana/Katakana + set of 2500 CJK Unified Ideographs for common simplified Chinese
    GetGlyphRangesChineseSimplifiedCommon(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();   // Default + about 400 Cyrillic characters
    GetGlyphRangesCyrillic(): number;
    // IMGUI_API const ImWchar*    GetGlyphRangesThai();       // Default + Thai characters
    GetGlyphRangesThai(): number;

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

    // //-------------------------------------------
    // Custom Rectangles/Glyphs API
    // //-------------------------------------------

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
    // const CustomRect*   GetCustomRectByIndex(int index) const { if (index < 0) return NULL; return &CustomRects[index]; }

    // Internals
    // IMGUI_API void      CalcCustomRectUV(const CustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max);
    // IMGUI_API bool      GetMouseCursorTexData(ImGuiMouseCursor cursor, ImVec2* out_offset, ImVec2* out_size, ImVec2 out_uv_border[2], ImVec2 out_uv_fill[2]);

    // //-------------------------------------------
    // Members
    // //-------------------------------------------

    // bool                        Locked;             // Marked as Locked by ImGui::NewFrame() so attempt to modify the atlas will assert.
    Locked: boolean;
    // ImFontAtlasFlags            Flags;              // Build flags (see ImFontAtlasFlags_)
    Flags: ImFontAtlasFlags;
    // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
    TexID: ImTextureID;
    // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
    TexDesiredWidth: number;
    // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.
    TexGlyphPadding: number;

    // [Internal]
    // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
    // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
    // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
    // int                         TexWidth;           // Texture width calculated during Build().
    readonly TexWidth: number;
    // int                         TexHeight;          // Texture height calculated during Build().
    readonly TexHeight: number;
    // ImVec2                      TexUvScale;         // = (1.0f/TexWidth, 1.0f/TexHeight)
    readonly TexUvScale: Readonly<reference_ImVec2>;
    // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
    readonly TexUvWhitePixel: Readonly<reference_ImVec2>;
    // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
    IterateFonts(callback: (font: reference_ImFont) => void): void;
    // ImVector<CustomRect>        CustomRects;        // Rectangles for packing custom texture data into the atlas.
    // ImVector<ImFontConfig>      ConfigData;         // Internal data
    // int                         CustomRectIds[1];   // Identifiers of custom texture rectangle used by ImFontAtlas/ImDrawList
}

export interface reference_ImGuiIO extends Emscripten.EmscriptenClassReference {
    //------------------------------------------------------------------
    // Settings (fill once)                 // Default value:
    //------------------------------------------------------------------

    // ImGuiConfigFlags ConfigFlags;                 // = 0                  // See ImGuiConfigFlags_. Gamepad/keyboard navigation options.
    ConfigFlags: ImGuiConfigFlags;
    // ImGuiBackendFlags BackendFlags;               // = 0                  // Set ImGuiBackendFlags_ enum. Set by imgui_impl_xxx files or custom back-end.
    BackendFlags: ImGuiBackendFlags;
    // ImVec2        DisplayS0ize;              // <unset>              // Display size, in pixels. For clamping windows positions.
    readonly DisplaySize: reference_ImVec2;
    // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
    DeltaTime: number;
    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
    IniSavingRate: number;
    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
    IniFilename: string;
    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
    LogFilename: string;
    // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
    MouseDoubleClickTime: number;
    // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
    MouseDoubleClickMaxDist: number;
    // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging.
    MouseDragThreshold: number;
    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array which represent your "native" keyboard state.
    _getAt_KeyMap(index: ImGuiKey): number;
    _setAt_KeyMap(index: ImGuiKey, value: number): boolean;
    // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
    KeyRepeatDelay: number;
    // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
    KeyRepeatRate: number;
    // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.
    UserData: any;

    // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
    readonly Fonts: reference_ImFontAtlas;
    // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
    FontGlobalScale: number;
    // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
    FontAllowUserScaling: boolean;
    // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
    FontDefault: reference_ImFont | null;
    // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
    readonly DisplayFramebufferScale: reference_ImVec2;
    // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
    readonly DisplayVisibleMin: reference_ImVec2;
    // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize
    readonly DisplayVisibleMax: reference_ImVec2;

    // Advanced/subtle behaviors
    // bool        MouseDrawCursor;                // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
    MouseDrawCursor: boolean;
    // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
    ConfigMacOSXBehaviors: boolean;
    // bool          ConfigInputTextCursorBlink;   // = true               // Enable blinking cursor, for users who consider it annoying.
    ConfigInputTextCursorBlink: boolean;
    // bool          ConfigWindowsResizeFromEdges; // = false          // [BETA] Enable resizing of windows from their edges and from the lower-left corner. This requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback. (This used to be the ImGuiWindowFlags_ResizeFromAnySide flag)
    ConfigWindowsResizeFromEdges: boolean;
    // bool        ConfigWindowsMoveFromTitleBarOnly;// = false        // [BETA] Set to true to only allow moving windows when clicked+dragged from the title bar. Windows without a title bar are not affected.
    ConfigWindowsMoveFromTitleBarOnly: boolean;

    //------------------------------------------------------------------
    // Settings (User Functions)
    //------------------------------------------------------------------

    // Optional: Platform/Renderer back-end name (informational only! will be displayed in About Window) + User data for back-end/wrappers to store their own stuff.
    // const char* BackendPlatformName;            // = NULL
    // const char* BackendRendererName;            // = NULL
    // void*       BackendPlatformUserData;        // = NULL
    // void*       BackendRendererUserData;        // = NULL
    // void*       BackendLanguageUserData;        // = NULL

    // Optional: access OS clipboard
    // (default to use native Win32 clipboard on Windows, otherwise uses a private clipboard. Override to access OS clipboard on other architectures)
    // const char* (*GetClipboardTextFn)(void* user_data);
    GetClipboardTextFn: ((user_data: any) => string) | null;
    // void        (*SetClipboardTextFn)(void* user_data, const char* text);
    SetClipboardTextFn: ((user_data: any, text: string) => void) | null;
    // void*       ClipboardUserData;
    ClipboardUserData: any;

    // Optional: notify OS Input Method Editor of the screen position of your cursor for text input position (e.g. when using Japanese/Chinese IME in Windows)
    // (default to use native imm32 api on Windows)
    // void        (*ImeSetInputScreenPosFn)(int x, int y);
    // void*       ImeWindowHandle;            // (Windows) Set this to your HWND to get automatic IME cursor positioning.

    //------------------------------------------------------------------
    // Input - Fill before calling NewFrame()
    //------------------------------------------------------------------

    // ImVec2      MousePos;                       // Mouse position, in pixels. Set to ImVec2(-FLT_MAX,-FLT_MAX) if mouse is unavailable (on another screen, etc.)
    readonly MousePos: reference_ImVec2;
    // bool        MouseDown[5];                   // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
    _getAt_MouseDown(index: number): boolean;
    _setAt_MouseDown(index: number, value: boolean): boolean;
    // float       MouseWheel;                     // Mouse wheel: 1 unit scrolls about 5 lines text.
    MouseWheel: number;
    // float       MouseWheelH;                    // Mouse wheel (Horizontal). Most users don't have a mouse with an horizontal wheel, may not be filled by all back ends.
    MouseWheelH: number;
    // bool        KeyCtrl;                        // Keyboard modifier pressed: Control
    KeyCtrl: boolean;
    // bool        KeyShift;                       // Keyboard modifier pressed: Shift
    KeyShift: boolean;
    // bool        KeyAlt;                         // Keyboard modifier pressed: Alt
    KeyAlt: boolean;
    // bool        KeySuper;                       // Keyboard modifier pressed: Cmd/Super/Windows
    KeySuper: boolean;
    // bool        KeysDown[512];                  // Keyboard keys that are pressed (ideally left in the "native" order your engine has access to keyboard keys, so you can use your own defines/enums for keys).
    _getAt_KeysDown(index: number): boolean;
    _setAt_KeysDown(index: number, value: boolean): boolean;
    // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
    _getAt_NavInputs(index: number): number;
    _setAt_NavInputs(index: number, value: number): boolean;
    
    // Functions
    // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
    AddInputCharacter(c: number): void;
    // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
    AddInputCharactersUTF8(utf8_chars: string): void;
    // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually
    ClearInputCharacters(): void;

    //------------------------------------------------------------------
    // Output - Retrieve after calling NewFrame()
    //------------------------------------------------------------------

    // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active). 
    WantCaptureMouse: boolean;
    // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
    WantCaptureKeyboard: boolean;
    // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
    WantTextInput: boolean;
    // bool        WantSetMousePos;              // MousePos has been altered, back-end should reposition mouse on next frame. Set only when ImGuiConfigFlags_MoveMouse flag is enabled in io.ConfigFlags.
    WantSetMousePos: boolean;
    // bool        WantSaveIniSettings;        // When manual .ini load/save is active (io.IniFilename == NULL), this will be set to notify your application that you can call SaveIniSettingsToMemory() and save yourself. IMPORTANT: You need to clear io.WantSaveIniSettings yourself.
    WantSaveIniSettings: boolean;
    // bool        NavActive;                  // Directional navigation is currently allowed (will handle ImGuiKey_NavXXX events) = a window is focused and it doesn't use the ImGuiWindowFlags_NoNavInputs flag.
    NavActive: boolean;
    // bool        NavVisible;                 // Directional navigation is visible and allowed (will handle ImGuiKey_NavXXX events).
    NavVisible: boolean;
    // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
    Framerate: number;
    // int         MetricsRenderVertices;      // Vertices output during last call to Render()
    MetricsRenderVertices: number;
    // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
    MetricsRenderIndices: number;
    // int         MetricsRenderWindows;       // Number of visible windows
    MetricsRenderWindows: number;
    // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
    MetricsActiveWindows: number;
    // int         MetricsActiveAllocations;   // Number of active allocations, updated by MemAlloc/MemFree based on current context. May be off if you have multiple imgui contexts.
    MetricsActiveAllocations: number;
    // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
    readonly MouseDelta: Readonly<reference_ImVec2>;

    //------------------------------------------------------------------
    // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
    //------------------------------------------------------------------

    // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
    // ImVec2      MouseClickedPos[5];         // Position at time of clicking
    _getAt_MouseClickedPos(index: number): Readonly<reference_ImVec2>;
    // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
    // bool        MouseClicked[5];            // Mouse button went from !Down to Down
    // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
    // bool        MouseReleased[5];           // Mouse button went from Down to !Down
    // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
    // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
    _getAt_MouseDownDuration(index: number): number;
    // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
    // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
    // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
    // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
    _getAt_KeysDownDuration(index: number): number;
    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
    // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
    _getAt_NavInputsDownDuration(index: number): number;
    // float       NavInputsDownDurationPrev[ImGuiNavInput_COUNT];

    // IMGUI_API   ImGuiIO();
}

export interface Module extends Emscripten.EmscriptenModule {

mallinfo(): mallinfo;

IMGUI_VERSION: string;

IMGUI_CHECKVERSION(): boolean;

ImGuiIOSize: number;
ImGuiStyleSize: number;
ImVec2Size: number;
ImVec4Size: number;

ImDrawVertSize: number;
ImDrawIdxSize: number;
ImDrawVertPosOffset: number;
ImDrawVertUVOffset: number;
ImDrawVertColOffset: number;

ImGuiListClipper: { new(items_count: number, items_height: number): ImGuiListClipper; };
ImGuiStyle: { new(): ImGuiStyle; };

// Context creation and access, if you want to use multiple context, share context between modules (e.g. DLL). 
// All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
// All those functions are not reliant on the current context.
// IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
CreateContext(): WrapImGuiContext;
// IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = Destroy current context
DestroyContext(ctx: WrapImGuiContext | null): void;
// IMGUI_API ImGuiContext* GetCurrentContext();
GetCurrentContext(): WrapImGuiContext | null;
// IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
SetCurrentContext(ctx: WrapImGuiContext | null): void;
// IMGUI_API bool          DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert);
DebugCheckVersionAndDataLayout(version_str: string, sz_io: number, sz_style: number, sz_vec2: number, sz_vec4: number, sz_draw_vert: number): boolean;

// Main
// IMGUI_API ImGuiIO&      GetIO();
GetIO(): reference_ImGuiIO;
// IMGUI_API ImGuiStyle&   GetStyle();
GetStyle(): ImGuiStyle;
// IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
GetDrawData(): reference_ImDrawData | null;
// IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
NewFrame(): void;
// IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
Render(): void;
// IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
EndFrame(): void;

// Demo, Debug, Informations
// IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
ShowDemoWindow(p_open: ImScalar<boolean> | null): void;
// IMGUI_API void          ShowAboutWindow(bool* p_open = NULL);       // create about window. display Dear ImGui version, credits and build/system information.
ShowAboutWindow(p_open: ImScalar<boolean> | null): void;
// IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
ShowMetricsWindow(p_open: ImScalar<boolean> | null): void;
// IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
ShowStyleEditor(ref: ImGuiStyle | null): void;
// IMGUI_API bool          ShowStyleSelector(const char* label);
ShowStyleSelector(label: string): boolean;
// IMGUI_API void          ShowFontSelector(const char* label);
ShowFontSelector(label: string): void;
// IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
ShowUserGuide(): void;
// IMGUI_API const char*   GetVersion();
GetVersion(): string;

// Styles
// IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
StyleColorsClassic(dst: ImGuiStyle | null/* = NULL */): void;
// IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
StyleColorsDark(dst: ImGuiStyle | null/* = NULL */): void;
// IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
StyleColorsLight(dst: ImGuiStyle | null/* = NULL */): void;

// Window
Begin(name: string, p_open: ImScalar<boolean> | null /* = NULL */, flags: ImGuiWindowFlags/* = 0 */): boolean;
End(): void;
BeginChild(id: string | ImGuiID, size: Readonly<interface_ImVec2>, border: boolean, extra_flags: ImGuiWindowFlags): boolean;
EndChild(): void;
GetContentRegionMax(out: interface_ImVec2): typeof out;
GetContentRegionAvail(out: interface_ImVec2): typeof out;
GetContentRegionAvailWidth(): number;
GetWindowContentRegionMin(out: interface_ImVec2): typeof out;
GetWindowContentRegionMax(out: interface_ImVec2): typeof out;
GetWindowContentRegionWidth(): number;
GetWindowDrawList(): reference_ImDrawList;
GetWindowPos(out: interface_ImVec2): typeof out;
GetWindowSize(out: interface_ImVec2): typeof out;
GetWindowWidth(): number;
GetWindowHeight(): number;
IsWindowCollapsed(): boolean;
IsWindowAppearing(): boolean;
SetWindowFontScale(scale: number): void;

SetNextWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */, pivot: Readonly<interface_ImVec2>/* = ImVec2(0,0) */): void;
SetNextWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
SetNextWindowSizeConstraints(size_min: Readonly<interface_ImVec2>, size_max: Readonly<interface_ImVec2>, custom_callback: ImGuiSizeConstraintCallback | null/* = NULL */, data: any/* = NULL */): void;
SetNextWindowContentSize(size: Readonly<interface_ImVec2>): void;
SetNextWindowCollapsed(collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
SetNextWindowFocus(): void;
SetNextWindowBgAlpha(alpha: number): void;
SetWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
SetWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
SetWindowCollapsed(collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
SetWindowFocus(): void;
SetWindowNamePos(name: string, pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
SetWindowNameSize(name: string, size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
SetWindowNameCollapsed(name: string, collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
SetWindowNameFocus(name: string): void;

GetScrollX(): number;
GetScrollY(): number;
GetScrollMaxX(): number;
GetScrollMaxY(): number;
SetScrollX(scroll_x: number): void;
SetScrollY(scroll_y: number): void;
SetScrollHereY(center_y_ratio: number/* = 0.5f */): void;
SetScrollFromPosY(pos_y: number, center_y_ratio: number/* = 0.5f */): void;
// function SetStateStorage(tree: ImGuiStorage | null): void;
// function GetStateStorage(): ImGuiStorage | null;

// Parameters stacks (shared)
PushFont(font: reference_ImFont | null): void;
PopFont(): void;
PushStyleColor(idx: ImGuiCol, col: ImU32 | Readonly<interface_ImVec4>): void;
PopStyleColor(count: number/* = 1 */): void;
PushStyleVar(idx: ImGuiStyleVar, val: number | Readonly<interface_ImVec2>): void;
PopStyleVar(count: number/* = 1 */): void;
GetStyleColorVec4(idx: ImGuiCol): Readonly<reference_ImVec4>;
GetFont(): reference_ImFont;
GetFontSize(): number;
GetFontTexUvWhitePixel(out: interface_ImVec2): typeof out;
GetColorU32_A(idx: ImGuiCol, alpha_mul: number/* = 1.0f */): ImU32;
GetColorU32_B(col: Readonly<interface_ImVec4>): ImU32;
GetColorU32_C(col: ImU32): ImU32;

// Parameters stacks (current window)
PushItemWidth(item_width: number): void;
PopItemWidth(): void;
CalcItemWidth(): number;
PushTextWrapPos(wrap_pos_x: number/* = 0.0f */): void;
PopTextWrapPos(): void;
PushAllowKeyboardFocus(allow_keyboard_focus: boolean): void;
PopAllowKeyboardFocus(): void;
PushButtonRepeat(repeat: boolean): void;
PopButtonRepeat(): void;

// Cursor / Layout
Separator(): void;
SameLine(pos_x: number/* = 0.0f */, spacing_w: number/* = -1.0f */): void;
NewLine(): void;
Spacing(): void;
Dummy(size: Readonly<interface_ImVec2>): void;
Indent(indent_w: number/* = 0.0f */): void;
Unindent(indent_w: number/* = 0.0f */): void;
BeginGroup(): void;
EndGroup(): void;
GetCursorPos(out: interface_ImVec2): typeof out;
GetCursorPosX(): number;
GetCursorPosY(): number;
SetCursorPos(local_pos: Readonly<interface_ImVec2>): void;
SetCursorPosX(x: number): void;
SetCursorPosY(y: number): void;
GetCursorStartPos(out: interface_ImVec2): typeof out;
GetCursorScreenPos(out: interface_ImVec2): typeof out;
SetCursorScreenPos(pos: interface_ImVec2): void;
AlignTextToFramePadding(): void;
GetTextLineHeight(): number;
GetTextLineHeightWithSpacing(): number;
GetFrameHeight(): number;
GetFrameHeightWithSpacing(): number;

// Columns
// You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
Columns(count: number/* = 1 */, id: string | null/* = NULL */, border: boolean/* = true */): void;
NextColumn(): void;
GetColumnIndex(): number;
GetColumnWidth(column_index: number/* = -1 */): number;
SetColumnWidth(column_index: number, width: number): void;
GetColumnOffset(column_index: number/* = -1 */): number;
SetColumnOffset(column_index: number, offset_x: number): void;
GetColumnsCount(): number;

// ID scopes
// If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
// You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
// PushID(str_id_begin: string, str_id_end: string): void;
// PushID(ptr_id: any): void;
// PushID(int_id: number): void;
PushID(id: string | number): void;
PopID(): void;
// GetID(str_id_begin: string, str_id_end: string): ImGuiID;
// GetID(ptr_id: any): ImGuiID;
GetID(id: string | number): ImGuiID;

// Widgets: Text
// IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
TextUnformatted(text: string, /* text_end: string = NULL */): void;
// IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
Text(fmt: string/*, ...args: any[]*/): void;
// IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
Text(fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
TextColored(col: Readonly<interface_ImVec4>, fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
TextColoredV(col: Readonly<interface_ImVec4>, fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
TextDisabled(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
TextDisabledV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
TextWrapped(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
TextWrappedV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
LabelText(label: string, fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
LabelTextV(label: string, fmt: string/* , args: any[] */): void;
// IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
BulletText(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
BulletTextV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
Bullet(): void;

// Widgets: Main
Button(label: string, size: Readonly<interface_ImVec2>): boolean;
SmallButton(label: string): boolean;
ArrowButton(label: string, dir: ImGuiDir): boolean;
InvisibleButton(str_id: string, size: Readonly<interface_ImVec2>): boolean;
// IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
Image(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, tint_col: Readonly<interface_ImVec4>, border_col: Readonly<interface_ImVec4>): void;
// IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
ImageButton(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, frame_padding: number, bg_col: Readonly<interface_ImVec4>, tint_col: Readonly<interface_ImVec4>): boolean;
Checkbox(label: string, v: ImScalar<boolean>): boolean;
CheckboxFlags(label: string, flags: ImScalar<number> | null, flags_value: number): boolean;
// RadioButton(label: string, active: boolean): boolean;
// RadioButton(label: string, v: ImScalar<number>, v_button: number): boolean;
RadioButton_A(label: string, active: boolean): boolean;
RadioButton_B(label: string, v: ImScalar<number>, v_button: number): boolean;
// IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
// IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
PlotLines(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number, scale_max: number, graph_size: Readonly<interface_ImVec2>): void;
// IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
// IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
PlotHistogram(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number, scale_max: number, graph_size: Readonly<interface_ImVec2>): void;
// IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
ProgressBar(fraction: number, size_arg: Readonly<interface_ImVec2>, overlay: string | null): void;

// Widgets: Combo Box
// The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it. 
// The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
BeginCombo(label: string, preview_value: string | null, flags: ImGuiComboFlags/* = 0 */): boolean;
EndCombo(): void;
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
// IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
Combo(label: string, current_item: ImScalar<number>, items_getter: (data: any, idx: number, out_text: [string]) => boolean, data: any, items_count: number, popup_max_height_in_items: number): boolean;

// Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
// For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
DragFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string | null/* = "%.3f" */, power: number/* = 1.0f */): boolean;
DragFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
DragFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
DragFloat4(label: string, v: ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
DragFloatRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, display_format_max: string | null/* = NULL */, power: number/* = 1.0f */): boolean;
DragInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
DragInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
DragInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
DragInt4(label: string, v: ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
DragIntRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */, display_format_max: string | null/* = NULL */): boolean;
// IMGUI_API bool          DragScalar(const char* label, ImGuiDataType data_type, void* v, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
// IMGUI_API bool          DragScalarN(const char* label, ImGuiDataType data_type, void* v, int components, float v_speed, const void* v_min = NULL, const void* v_max = NULL, const char* format = NULL, float power = 1.0f);
DragScalar(label: string, data_type: ImGuiDataType, v: Int32Array | Uint32Array | Float32Array | Float64Array, v_speed: number, v_min: number | null, v_max: number | null, format: string | null, power: number): boolean;

// Widgets: Input with Keyboard
InputText(label: string, buf: [ string ], buf_size: number, flags: ImGuiInputTextFlags/* = 0 */, callback: ImGuiInputTextCallback | null/* = NULL */, user_data: any/* = NULL */): boolean;
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
InputTextMultiline(label: string, buf: [ string ], buf_size: number, size: Readonly<interface_ImVec2>, flags: ImGuiInputTextFlags/* = 0 */, callback: ImGuiInputTextCallback | null/* = NULL */, user_data: any/* = NULL */): boolean;
InputFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number/* = 0.0f */, step_fast: number/* = 0.0f */, format: string/* = "%.3f"*/, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, format: string/* = "%.3f"*/, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, format: string/* = "%.3f"*/, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputFloat4(label: string, v: ImTuple4<number>, format: string/* = "%.3f"*/, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number/* = 1 */, step_fast: number/* = 100 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputInt4(label: string, v: ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
InputDouble(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number/* = 0.0f */, step_fast: number/* = 0.0f */, display_format: string/* = "%0.6f" */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
// IMGUI_API bool          InputScalar(const char* label, ImGuiDataType data_type, void* v, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
// IMGUI_API bool          InputScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* step = NULL, const void* step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags extra_flags = 0);
InputScalar(label: string, data_type: ImGuiDataType, v: Int32Array | Uint32Array | Float32Array | Float64Array, step: number | null, step_fast: number | null, format: string | null, extra_flags: ImGuiInputTextFlags): boolean;

// Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
SliderFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
SliderFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
SliderFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
SliderFloat4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
SliderAngle(label: string, v_rad: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_degrees_min: number/* = -360.0f */, v_degrees_max: number/* = +360.0f */): boolean;
SliderInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
SliderInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
SliderInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
SliderInt4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
// IMGUI_API bool          SliderScalar(const char* label, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
// IMGUI_API bool          SliderScalarN(const char* label, ImGuiDataType data_type, void* v, int components, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
SliderScalar(label: string, data_type: ImGuiDataType, v: Int32Array | Uint32Array | Float32Array | Float64Array, v_min: number | null, v_max: number | null, format: string | null, power: number): boolean;
VSliderFloat(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
VSliderInt(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
// IMGUI_API bool          VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* v, const void* v_min, const void* v_max, const char* format = NULL, float power = 1.0f);
VSliderScalar(label: string, size: Readonly<interface_ImVec2>, data_type: ImGuiDataType, v: Int32Array | Uint32Array | Float32Array | Float64Array, v_min: number | null, v_max: number | null, format: string | null, power: number): boolean;

// Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
// Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
ColorEdit3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
ColorEdit4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
ColorPicker3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
ColorPicker4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */, ref_col: ImTuple4<number> | null/* = NULL */): boolean;
// IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
ColorButton(desc_id: string, col: Readonly<interface_ImVec4>, flags: ImGuiColorEditFlags, size: Readonly<interface_ImVec2>): boolean;
SetColorEditOptions(flags: ImGuiColorEditFlags): void;

// Widgets: Trees
// IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
// IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
// IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
// IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
// IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
TreeNode_A(label: string): boolean;
TreeNode_B(str_id: string, fmt: string): boolean;
TreeNode_C(ptr_id: number, fmt: string): boolean;
// IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
// IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
// IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
TreeNodeEx_A(label: string, flags: ImGuiTreeNodeFlags/* = 0 */): boolean;
TreeNodeEx_B(str_id: string, flags: ImGuiTreeNodeFlags/* = 0 */, fmt: string): boolean;
TreeNodeEx_C(ptr_id: number, flags: ImGuiTreeNodeFlags/* = 0 */, fmt: string): boolean;
// IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
// IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
TreePush_A(str_id: string): void;
TreePush_B(ptr_id: number): void;
// IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
TreePop(): void;
// IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
TreeAdvanceToLabelPos(): void;
// IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
GetTreeNodeToLabelSpacing(): number;
// IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
SetNextTreeNodeOpen(is_open: boolean, cond: ImGuiCond/* = 0 */): void;
// IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
// IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
CollapsingHeader_A(label: string, flags: ImGuiTreeNodeFlags/* = 0 */): boolean;
CollapsingHeader_B(label: string, p_open: ImScalar<boolean> | null, flags: ImGuiTreeNodeFlags/* = 0 */): boolean;

// Widgets: Selectable / Lists
// IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
// IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
Selectable_A(label: string, selected: boolean, flags: ImGuiSelectableFlags, size: interface_ImVec2): boolean;
Selectable_B(label: string, p_selected: ImScalar<boolean>, flags: ImGuiSelectableFlags, size: interface_ImVec2): boolean;
// IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
// IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
ListBox_A(label: string, current_item: ImScalar<number>, items: string[], items_count: number, height_in_items: number/* = -1 */): boolean;
ListBox_B(label: string, current_item: ImScalar<number>, items_getter: any, data: any, items_count: number, height_in_items: number/* = -1 */): boolean;
// IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
// IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
ListBoxHeader_A(label: string, size: Readonly<interface_ImVec2>): boolean;
ListBoxHeader_B(label: string, items_count: number, height_in_items: number): boolean;
ListBoxFooter(): void;

// Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
Value_A(prefix: string, b: boolean): void;
Value_B(prefix: string, v: number): void;
Value_C(prefix: string, v: number): void;
Value_D(prefix: string, v: number, float_format: string | null/* = NULL */): void;

// Tooltips
// IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
// IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
SetTooltip(fmt: string): void;
BeginTooltip(): void;
EndTooltip(): void;

// Menus
BeginMainMenuBar(): boolean;
EndMainMenuBar(): void;
BeginMenuBar(): boolean;
EndMenuBar(): void;
BeginMenu(label: string, enabled: boolean/* = true */): boolean;
EndMenu(): void;
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
MenuItem_A(label: string, shortcut: string | null, selected: boolean, enabled: boolean/* = true */): boolean;
MenuItem_B(label: string, shortcut: string | null, p_selected: ImScalar<boolean>, enabled: boolean/* = true */): boolean;

// Popups
OpenPopup(str_id: string): void;
OpenPopupOnItemClick(str_id: string | null/* = NULL */, mouse_button: number/* = 1 */): boolean;
BeginPopup(str_id: string): boolean;
BeginPopupModal(name: string, p_open: ImScalar<boolean> | null/* = NULL */, extra_flags: ImGuiWindowFlags/* = 0 */): boolean;
BeginPopupContextItem(str_id: string | null/* = NULL */, mouse_button: number/* = 1 */): boolean;
BeginPopupContextWindow(str_id: string | null/* = NULL */, mouse_button: number/* = 1 */, also_over_items: boolean/* = true */): boolean;
BeginPopupContextVoid(str_id: string | null/* = NULL */, mouse_button: number/* = 1 */): boolean;
EndPopup(): void;
IsPopupOpen(str_id: string): boolean;
CloseCurrentPopup(): void;

// Tab Bars, Tabs
// [BETA API] API may evolve!
// IMGUI_API bool          BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0);        // create and append into a TabBar
BeginTabBar(str_id: string, flags: ImGuiTabBarFlags): boolean;
// IMGUI_API void          EndTabBar();                                                        // only call EndTabBar() if BeginTabBar() returns true!
EndTabBar(): void;
// IMGUI_API bool          BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0);// create a Tab. Returns true if the Tab is selected.
BeginTabItem(label: string, p_open: ImScalar<boolean> | null, flags: ImGuiTabBarFlags): boolean;
// IMGUI_API void          EndTabItem();                                                       // only call EndTabItem() if BeginTabItem() returns true!
EndTabItem(): void;
// IMGUI_API void          SetTabItemClosed(const char* tab_or_docked_window_label);           // notify TabBar or Docking system of a closed tab/window ahead (useful to reduce visual flicker on reorderable tab bars). For tab-bar: call after BeginTabBar() and before Tab submissions. Otherwise call with a window name.
SetTabItemClosed(tab_or_docked_window_label: string): void;

// Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
// IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
LogToTTY(max_depth: number/* = -1 */): void;
// IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
LogToFile(max_depth: number/* = -1 */, filename: string | null/* = NULL */): void;
// IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
LogToClipboard(max_depth: number/* = -1 */): void;
// IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
LogFinish(): void;
// IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
LogButtons(): void;
// IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
LogText(fmt: string): void;

// Drag and Drop
// [BETA API] Missing Demo code. API may evolve.
// IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
BeginDragDropSource(flags: ImGuiDragDropFlags/* = 0 */): boolean;
// IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
SetDragDropPayload(type: string, data: any, size: number, cond: ImGuiCond/* = 0 */): boolean;
// IMGUI_API void          EndDragDropSource();
EndDragDropSource(): void;
// IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
BeginDragDropTarget(): boolean;
// IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
AcceptDragDropPayload(type: string, flags: ImGuiDragDropFlags/* = 0 */): any;
// IMGUI_API void          EndDragDropTarget();
EndDragDropTarget(): void;

// Clipping
// IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
// PushClipRect(clip_rect_min: Readonly<ImVec2>, clip_rect_max: Readonly<ImVec2>, intersect_with_current_clip_rect: boolean): void;
PushClipRect(clip_rect_min: Readonly<interface_ImVec2>, clip_rect_max: Readonly<interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
// IMGUI_API void          PopClipRect();
PopClipRect(): void;

// Focus
// (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
// (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
// IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
SetItemDefaultFocus(): void;
// IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
SetKeyboardFocusHere(offset: number/* = 0 */): void;

// Utilities
// IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
IsItemHovered(flags: ImGuiHoveredFlags/* = 0 */): boolean;
// IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
IsItemActive(): boolean;
// IMGUI_API bool          IsItemEdited();
IsItemEdited(): boolean;
// IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
IsItemFocused(): boolean;
// IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
IsItemClicked(mouse_button: number/* = 0 */): boolean;
// IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
IsItemVisible(): boolean;
// IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
IsItemDeactivated(): boolean;
// IMGUI_API bool          IsItemDeactivatedAfterEdit();                                     // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
IsItemDeactivatedAfterEdit(): boolean;
// IMGUI_API bool          IsAnyItemHovered();
IsAnyItemHovered(): boolean;
// IMGUI_API bool          IsAnyItemActive();
IsAnyItemActive(): boolean;
// IMGUI_API bool          IsAnyItemFocused();
IsAnyItemFocused(): boolean;
// IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
GetItemRectMin(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetItemRectMax();                                                   // "
GetItemRectMax(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
GetItemRectSize(out: interface_ImVec2): typeof out;
// IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
SetItemAllowOverlap(): void;
// IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
IsWindowFocused(flags: ImGuiFocusedFlags/* = 0 */): boolean;
// IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
IsWindowHovered(flags: ImGuiHoveredFlags/* = 0 */): boolean;
// IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
// IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
IsRectVisible_A(size: Readonly<interface_ImVec2>): boolean;
IsRectVisible_B(rect_min: Readonly<interface_ImVec2>, rect_max: Readonly<interface_ImVec2>): boolean;
// IMGUI_API float         GetTime();
GetTime(): number;
// IMGUI_API int           GetFrameCount();
GetFrameCount(): number;
// IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
GetOverlayDrawList(): reference_ImDrawList;
// IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
GetDrawListSharedData(): reference_ImDrawListSharedData;
// IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
GetStyleColorName(idx: ImGuiCol): string;
// IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
CalcTextSize(text: string, hide_text_after_double_hash: boolean/* = false */, wrap_width: number/* = -1.0f */, out: interface_ImVec2): typeof out;
// IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
CalcListClipping(items_count: number, items_height: number, out_items_display_start: ImScalar<number>, out_items_display_end: ImScalar<number>): void;

// IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags flags = 0); // helper to create a child window / scrolling region that looks like a normal widget frame
BeginChildFrame(id: ImGuiID, size: Readonly<interface_ImVec2>, extra_flags: ImGuiWindowFlags/* = 0 */): boolean;
// IMGUI_API void          EndChildFrame();                                                    // always call EndChildFrame() regardless of BeginChildFrame() return values (which indicates a collapsed/clipped window)
EndChildFrame(): void;

// IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
ColorConvertU32ToFloat4(in_: ImU32, out: interface_ImVec4): typeof out;
// IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
ColorConvertFloat4ToU32(in_: Readonly<interface_ImVec4>): ImU32;
// IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
ColorConvertRGBtoHSV(r: number, g: number, b: number, out_h: ImScalar<number>, out_s: ImScalar<number>, out_v: ImScalar<number>): void;
// IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
ColorConvertHSVtoRGB(h: number, s: number, v: number, out_r: ImScalar<number>, out_g: ImScalar<number>, out_b: ImScalar<number>): void;

// Inputs
// IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
GetKeyIndex(imgui_key: ImGuiKey): number;
// IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
IsKeyDown(user_key_index: number): boolean;
// IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
IsKeyPressed(user_key_index: number, repeat: boolean/* = true */): boolean;
// IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
IsKeyReleased(user_key_index: number): boolean;
// IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
GetKeyPressedAmount(key_index: number, repeat_delay: number, rate: number): number;
// IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
IsMouseDown(button: number): boolean;
// IMGUI_API bool          IsAnyMouseDown();                                                   // is any mouse button held
IsAnyMouseDown(): boolean;
// IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
IsMouseClicked(button: number, repeat: boolean/* = false */): boolean;
// IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
IsMouseDoubleClicked(button: number): boolean;
// IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
IsMouseReleased(button: number): boolean;
// IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
IsMouseDragging(button: number/* = 0 */, lock_threshold: number/* = -1.0f */): boolean;
// IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
IsMouseHoveringRect(r_min: Readonly<interface_ImVec2>, r_max: Readonly<interface_ImVec2>, clip: boolean/* = true */): boolean;
// IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
IsMousePosValid(mouse_pos: Readonly<interface_ImVec2> | null/* = NULL */): boolean;
// IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
GetMousePos(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
GetMousePosOnOpeningCurrentPopup(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
GetMouseDragDelta(button: number/* = 0 */, lock_threshold: number/* = -1.0f */, out: interface_ImVec2): typeof out;
// IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
ResetMouseDragDelta(button: number/* = 0 */): void;
// IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
GetMouseCursor(): ImGuiMouseCursor;
// IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
SetMouseCursor(type: ImGuiMouseCursor): void;
// IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
CaptureKeyboardFromApp(capture: boolean/* = true */): void;
// IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
CaptureMouseFromApp(capture: boolean/* = true */): void;

// Clipboard Utilities (also see the LogToClipboard() function to capture or output text data to the clipboard)
// IMGUI_API const char*   GetClipboardText();
GetClipboardText(): string;
// IMGUI_API void          SetClipboardText(const char* text);
SetClipboardText(text: string): void;

// Settings/.Ini Utilities
// The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
// Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.
// IMGUI_API void          LoadIniSettingsFromDisk(const char* ini_filename);                  // call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).
// LoadIniSettingsFromDisk(ini_filename: string): void;
// IMGUI_API void          LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0); // call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.
LoadIniSettingsFromMemory(ini_data: string/*, ini_size: number*/): void;
// IMGUI_API void          SaveIniSettingsToDisk(const char* ini_filename);
// SaveIniSettingsToDisk(ini_filename: string): void;
// IMGUI_API const char*   SaveIniSettingsToMemory(size_t* out_ini_size = NULL);               // return a zero-terminated string with the .ini data which you can save by your own mean. call when io.WantSaveIniSettings is set, then save data by your own mean and clear io.WantSaveIniSettings.
SaveIniSettingsToMemory(/*out_ini_size: ImScalar<number> | null*/): string;

// Memory Utilities
// All those functions are not reliant on the current context.
// If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again.
// IMGUI_API void          SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void(*free_func)(void* ptr, void* user_data), void* user_data = NULL);
SetAllocatorFunctions(alloc_func: (sz: number, user_data: any) => number, free_func: (ptr: number, user_data: any) => void, user_data: any): void;
// IMGUI_API void*         MemAlloc(size_t sz);
MemAlloc(sz: number): any;
// IMGUI_API void          MemFree(void* ptr);
MemFree(ptr: any): void;

}
