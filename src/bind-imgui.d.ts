import * as Emscripten from "./emscripten";

// emcc -s MODULARIZE=0
// declare const Module: Module; export default Module;

// emcc -s MODULARIZE=1
export default function Module(Module?: Partial<Module>): Module;

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

// Enums/Flags (declared as int for compatibility with old C++, to allow using as flags and to not pollute the top of this file)
// - Tip: Use your programming IDE navigation facilities on the names in the _central column_ below to find the actual flags/enum lists!
//   In Visual Studio IDE: CTRL+comma ("Edit.NavigateTo") can follow symbols in comments, whereas CTRL+F12 ("Edit.GoToImplementation") cannot.
//   With Visual Assist installed: ALT+G ("VAssistX.GoToImplementation") can also follow symbols in comments.
type ImGuiCol = number;               // -> enum ImGuiCol_             // Enum: A color identifier for styling
type ImGuiCond = number;              // -> enum ImGuiCond_            // Enum: A condition for many Set*() functions
type ImGuiDataType = number;          // -> enum ImGuiDataType_        // Enum: A primary data type
type ImGuiDir = number;               // -> enum ImGuiDir_             // Enum: A cardinal direction
type ImGuiKey = number;               // -> enum ImGuiKey_             // Enum: A key identifier (ImGui-side enum)
type ImGuiNavInput = number;          // -> enum ImGuiNavInput_        // Enum: An input identifier for navigation
type ImGuiMouseButton = number;       // -> enum ImGuiMouseButton_     // Enum: A mouse button identifier (0=left, 1=right, 2=middle)
type ImGuiMouseCursor = number;       // -> enum ImGuiMouseCursor_     // Enum: A mouse cursor identifier
type ImGuiSortDirection = number;     // -> enum ImGuiSortDirection_   // Enum: A sorting direction (ascending or descending)
type ImGuiStyleVar = number;          // -> enum ImGuiStyleVar_        // Enum: A variable identifier for styling
type ImGuiTableBgTarget = number;     // -> enum ImGuiTableBgTarget_   // Enum: A color target for TableSetBgColor()
type ImDrawFlags = number;            // -> enum ImDrawFlags_          // Flags: for ImDrawList::AddRect(), AddRectFilled() etc.
type ImDrawListFlags = number;        // -> enum ImDrawListFlags_      // Flags: for ImDrawList
type ImFontAtlasFlags = number;       // -> enum ImFontAtlasFlags_     // Flags: for ImFontAtlas build
type ImGuiBackendFlags = number;      // -> enum ImGuiBackendFlags_    // Flags: for io.BackendFlags
type ImGuiButtonFlags = number;       // -> enum ImGuiButtonFlags_     // Flags: for InvisibleButton()
type ImGuiColorEditFlags = number;    // -> enum ImGuiColorEditFlags_  // Flags: for ColorEdit4(), ColorPicker4() etc.
type ImGuiConfigFlags = number;       // -> enum ImGuiConfigFlags_     // Flags: for io.ConfigFlags
type ImGuiComboFlags = number;        // -> enum ImGuiComboFlags_      // Flags: for BeginCombo()
type ImGuiDragDropFlags = number;     // -> enum ImGuiDragDropFlags_   // Flags: for BeginDragDropSource(), AcceptDragDropPayload()
type ImGuiFocusedFlags = number;      // -> enum ImGuiFocusedFlags_    // Flags: for IsWindowFocused()
type ImGuiHoveredFlags = number;      // -> enum ImGuiHoveredFlags_    // Flags: for IsItemHovered(), IsWindowHovered() etc.
type ImGuiInputTextFlags = number;    // -> enum ImGuiInputTextFlags_  // Flags: for InputText(), InputTextMultiline()
type ImGuiKeyModFlags = number;       // -> enum ImGuiKeyModFlags_     // Flags: for io.KeyMods (Ctrl/Shift/Alt/Super)
type ImGuiPopupFlags = number;        // -> enum ImGuiPopupFlags_      // Flags: for OpenPopup*(), BeginPopupContext*(), IsPopupOpen()
type ImGuiSelectableFlags = number;   // -> enum ImGuiSelectableFlags_ // Flags: for Selectable()
type ImGuiSliderFlags = number;       // -> enum ImGuiSliderFlags_     // Flags: for DragFloat(), DragInt(), SliderFloat(), SliderInt() etc.
type ImGuiTabBarFlags = number;       // -> enum ImGuiTabBarFlags_     // Flags: for BeginTabBar()
type ImGuiTabItemFlags = number;      // -> enum ImGuiTabItemFlags_    // Flags: for BeginTabItem()
type ImGuiTableFlags = number;        // -> enum ImGuiTableFlags_      // Flags: For BeginTable()
type ImGuiTableColumnFlags = number;  // -> enum ImGuiTableColumnFlags_// Flags: For TableSetupColumn()
type ImGuiTableRowFlags = number;     // -> enum ImGuiTableRowFlags_   // Flags: For TableNextRow()
type ImGuiTreeNodeFlags = number;     // -> enum ImGuiTreeNodeFlags_   // Flags: for TreeNode(), TreeNodeEx(), CollapsingHeader()
type ImGuiViewportFlags = number;     // -> enum ImGuiViewportFlags_   // Flags: for ImGuiViewport
type ImGuiWindowFlags = number;       // -> enum ImGuiWindowFlags_     // Flags: for Begin(), BeginChild()

// Other types
// #ifndef ImTextureID                 // ImTextureID [configurable type: override in imconfig.h with '#define ImTextureID xxx']
// typedef void* ImTextureID;          // User data for rendering backend to identify a texture. This is whatever to you want it to be! read the FAQ about ImTextureID for details.
// #endif
export type ImTextureID = number;
// typedef unsigned int ImGuiID;       // A unique ID used by widgets, typically hashed from a stack of string.
export type ImGuiID = number;
// typedef int (*ImGuiInputTextCallback)(ImGuiInputTextCallbackData* data);    // Callback function for ImGui::InputText()
export type ImGuiInputTextCallback = (data: reference_ImGuiInputTextCallbackData) => number;
// typedef void (*ImGuiSizeCallback)(ImGuiSizeCallbackData* data);             // Callback function for ImGui::SetNextWindowSizeConstraints()
export type ImGuiSizeCallback = (data: reference_ImGuiSizeCallbackData) => void;

// Character types
// (we generally use UTF-8 encoded string in the API. This is storage specifically for a decoded character used for keyboard input and display)
// typedef unsigned short ImWchar16;   // A single decoded U16 character/code point. We encode them as multi bytes UTF-8 when used in strings.
export type ImWchar16 = number;
// typedef unsigned int ImWchar32;     // A single decoded U32 character/code point. We encode them as multi bytes UTF-8 when used in strings.
export type ImWchar32 = number;
// #ifdef IMGUI_USE_WCHAR32            // ImWchar [configurable type: override in imconfig.h with '#define IMGUI_USE_WCHAR32' to support Unicode planes 1-16]
// typedef ImWchar32 ImWchar;
// #else
// typedef ImWchar16 ImWchar;
// #endif
export type ImWchar = number;

// Basic scalar data types
// typedef signed char         ImS8;   // 8-bit signed integer
// typedef unsigned char       ImU8;   // 8-bit unsigned integer
// typedef signed short        ImS16;  // 16-bit signed integer
export type ImS16 = number;
// typedef unsigned short      ImU16;  // 16-bit unsigned integer
// typedef signed int          ImS32;  // 32-bit signed integer == int
// typedef unsigned int        ImU32;  // 32-bit unsigned integer (often used to store packed colors)
export type ImU32 = number;
// #if defined(_MSC_VER) && !defined(__clang__)
// typedef signed   __int64    ImS64;  // 64-bit signed integer (pre and post C++11 with Visual Studio)
// typedef unsigned __int64    ImU64;  // 64-bit unsigned integer (pre and post C++11 with Visual Studio)
// #elif (defined(__clang__) || defined(__GNUC__)) && (__cplusplus < 201100)
// #include <stdint.h>
// typedef int64_t             ImS64;  // 64-bit signed integer (pre C++11)
// typedef uint64_t            ImU64;  // 64-bit unsigned integer (pre C++11)
// #else
// typedef signed   long long  ImS64;  // 64-bit signed integer (post C++11)
// typedef unsigned long long  ImU64;  // 64-bit unsigned integer (post C++11)
// #endif

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
    // void                SelectAll()             { SelectionStart = 0; SelectionEnd = BufTextLen; }
    SelectAll(): void;
    // void                ClearSelection()        { SelectionStart = SelectionEnd = BufTextLen; }
    ClearSelection(): void;
    // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
    HasSelection(): boolean;
}

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
    public DisplayStart: number;
    public DisplayEnd: number;

    public ItemsCount: number;
    // public StepNo: number;
    // public ItemsFrozen: number;
    public ItemsHeight: number;
    public StartPosY: number;

    // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
    // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
    // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
    // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
    // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.

    // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
    public Begin(items_count: number, items_height: number): void;
    // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
    public End(): void;
    // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
    public Step(): boolean;
}

export interface reference_ImGuiTableColumnSortSpecs extends Emscripten.EmscriptenClassReference {
    // ImGuiID                     ColumnUserID;       // User id of the column (if specified by a TableSetupColumn() call)
    ColumnUserID: number;
    // ImS16                       ColumnIndex;        // Index of the column
    ColumnIndex: number;
    // ImS16                       SortOrder;          // Index within parent ImGuiTableSortSpecs (always stored in order starting from 0, tables sorted on a single criteria will always have a 0 here)
    SortOrder: number;
    // ImGuiSortDirection          SortDirection : 8;  // ImGuiSortDirection_Ascending or ImGuiSortDirection_Descending (you can use this or SortSign, whichever is more convenient for your sort function)
    SortDirection: number; // TODO: use an enum?
}

export interface reference_ImGuiTableSortSpecs extends Emscripten.EmscriptenClassReference {
    //const ImGuiTableColumnSortSpecs* Specs;     // Pointer to sort spec array.
    //Specs: readonly reference_ImGuiTableColumnSortSpecs[];
    GetSpec(idx: number) : reference_ImGuiTableColumnSortSpecs;
    //int                         SpecsCount;     // Sort spec count. Most often 1. May be > 1 when ImGuiTableFlags_SortMulti is enabled. May be == 0 when ImGuiTableFlags_SortTristate is enabled.
    SpecsCount: number; // TODO: make readonly?
    //bool                        SpecsDirty;     // Set to true when specs have changed since last time! Use this to sort again, then clear the flag.
    SpecsDirty: boolean;

    //ImGuiTableSortSpecs()       { memset(this, 0, sizeof(*this)); }
}

// You may modify the ImGui::GetStyle() main instance during initialization and before NewFrame().
// During the frame, prefer using ImGui::PushStyleVar(ImGuiStyleVar_XXXX)/PopStyleVar() to alter the main style values, and ImGui::PushStyleColor(ImGuiCol_XXX)/PopStyleColor() for colors.
export interface interface_ImGuiStyle {
    // float       Alpha;                      // Global alpha applies to everything in Dear ImGui.
    // float       DisabledAlpha;              //
    // ImVec2      WindowPadding;              // Padding within a window.
    // float       WindowRounding;             // Radius of window corners rounding. Set to 0.0f to have rectangular windows. Large values tend to lead to variety of artifacts and are not recommended.
    // float       WindowBorderSize;           // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    // ImVec2      WindowMinSize;              // Minimum window size. This is a global setting. If you want to constraint individual windows, use SetNextWindowSizeConstraints().
    // ImVec2      WindowTitleAlign;           // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
    // ImGuiDir    WindowMenuButtonPosition;   // Side of the collapsing/docking button in the title bar (None/Left/Right). Defaults to ImGuiDir_Left.
    // float       ChildRounding;              // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
    // float       ChildBorderSize;            // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    // float       PopupRounding;              // Radius of popup window corners rounding. (Note that tooltip windows use WindowRounding)
    // float       PopupBorderSize;            // Thickness of border around popup/tooltip windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    // ImVec2      FramePadding;               // Padding within a framed rectangle (used by most widgets).
    // float       FrameRounding;              // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
    // float       FrameBorderSize;            // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly).
    // ImVec2      ItemSpacing;                // Horizontal and vertical spacing between widgets/lines.
    // ImVec2      ItemInnerSpacing;           // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label).
    // ImVec2      CellPadding;                // Padding within a table cell
    // ImVec2      TouchExtraPadding;          // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
    // float       IndentSpacing;              // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
    // float       ColumnsMinSpacing;          // Minimum horizontal spacing between two columns. Preferably > (FramePadding.x + 1).
    // float       ScrollbarSize;              // Width of the vertical scrollbar, Height of the horizontal scrollbar.
    // float       ScrollbarRounding;          // Radius of grab corners for scrollbar.
    // float       GrabMinSize;                // Minimum width/height of a grab box for slider/scrollbar.
    // float       GrabRounding;               // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
    // float       LogSliderDeadzone;          // The size in pixels of the dead-zone around zero on logarithmic sliders that cross zero.
    // float       TabRounding;                // Radius of upper corners of a tab. Set to 0.0f to have rectangular tabs.
    // float       TabBorderSize;              // Thickness of border around tabs.
    // float       TabMinWidthForCloseButton;  // Minimum width for close button to appears on an unselected tab when hovered. Set to 0.0f to always show when hovering, set to FLT_MAX to never show close button unless selected.
    // ImGuiDir    ColorButtonPosition;        // Side of the color button in the ColorEdit4 widget (left/right). Defaults to ImGuiDir_Right.
    // ImVec2      ButtonTextAlign;            // Alignment of button text when button is larger than text. Defaults to (0.5f, 0.5f) (centered).
    // ImVec2      SelectableTextAlign;        // Alignment of selectable text. Defaults to (0.0f, 0.0f) (top-left aligned). It's generally important to keep this left-aligned if you want to lay multiple items on a same line.
    // ImVec2      DisplayWindowPadding;       // Window position are clamped to be visible within the display area or monitors by at least this amount. Only applies to regular windows.
    // ImVec2      DisplaySafeAreaPadding;     // If you cannot see the edges of your screen (e.g. on a TV) increase the safe area padding. Apply to popups/tooltips as well regular windows. NB: Prefer configuring your TV sets correctly!
    // float       MouseCursorScale;           // Scale software rendered mouse cursor (when io.MouseDrawCursor is enabled). May be removed later.
    // bool        AntiAliasedLines;           // Enable anti-aliased lines/borders. Disable if you are really tight on CPU/GPU. Latched at the beginning of the frame (copied to ImDrawList).
    // bool        AntiAliasedLinesUseTex;     // Enable anti-aliased lines/borders using textures where possible. Require backend to render with bilinear filtering. Latched at the beginning of the frame (copied to ImDrawList).
    // bool        AntiAliasedFill;            // Enable anti-aliased edges around filled shapes (rounded rectangles, circles, etc.). Disable if you are really tight on CPU/GPU. Latched at the beginning of the frame (copied to ImDrawList).
    // float       CurveTessellationTol;       // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
    // float       CircleTessellationMaxError;      // Maximum error (in pixels) allowed when using AddCircle()/AddCircleFilled() or drawing rounded corner rectangles with no explicit segment count specified. Decrease for higher quality but more geometry.
    // ImVec4      Colors[ImGuiCol_COUNT];

    Alpha: number;
    DisabledAlpha: number;
    readonly WindowPadding: interface_ImVec2;
    WindowRounding: number;
    WindowBorderSize: number;
    readonly WindowMinSize: interface_ImVec2;
    readonly WindowTitleAlign: interface_ImVec2;
    WindowMenuButtonPosition: ImGuiDir;
    ChildRounding: number;
    ChildBorderSize: number;
    PopupRounding: number;
    PopupBorderSize: number;
    readonly FramePadding: interface_ImVec2;
    FrameRounding: number;
    FrameBorderSize: number;
    readonly ItemSpacing: interface_ImVec2;
    readonly ItemInnerSpacing: interface_ImVec2;
    readonly TouchExtraPadding: interface_ImVec2;
    readonly CellPadding: interface_ImVec2;
    IndentSpacing: number;
    ColumnsMinSpacing: number;
    ScrollbarSize: number;
    ScrollbarRounding: number;
    GrabMinSize: number;
    GrabRounding: number;
    LogSliderDeadzone: number;
    TabRounding: number;
    TabBorderSize: number;
    TabMinWidthForCloseButton: number;
    ColorButtonPosition: number;
    readonly ButtonTextAlign: interface_ImVec2;
    readonly SelectableTextAlign: interface_ImVec2;
    readonly DisplayWindowPadding: interface_ImVec2;
    readonly DisplaySafeAreaPadding: interface_ImVec2;
    MouseCursorScale: number;
    AntiAliasedLines: boolean;
    AntiAliasedLinesUseTex: boolean;
    AntiAliasedFill: boolean;
    CurveTessellationTol: number;
    CircleTessellationMaxError: number;
    _getAt_Colors(idx: number): interface_ImVec4;
    _setAt_Colors(idx: number, value: Readonly<interface_ImVec4>): boolean;

    // IMGUI_API ImGuiStyle();
    // IMGUI_API void ScaleAllSizes(float scale_factor);
    ScaleAllSizes(scale_factor: number): void;
}

export class ImGuiStyle extends Emscripten.EmscriptenClass implements interface_ImGuiStyle {
    Alpha: number;
    DisabledAlpha: number;
    readonly WindowPadding: reference_ImVec2;
    WindowRounding: number;
    WindowBorderSize: number;
    readonly WindowMinSize: reference_ImVec2;
    readonly WindowTitleAlign: reference_ImVec2;
    WindowMenuButtonPosition: ImGuiDir;
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
    readonly CellPadding: reference_ImVec2;
    IndentSpacing: number;
    ColumnsMinSpacing: number;
    ScrollbarSize: number;
    ScrollbarRounding: number;
    GrabMinSize: number;
    GrabRounding: number;
    LogSliderDeadzone: number;
    TabRounding: number;
    TabBorderSize: number;
    TabMinWidthForCloseButton: number;
    ColorButtonPosition: ImGuiDir;
    readonly ButtonTextAlign: reference_ImVec2;
    readonly SelectableTextAlign: reference_ImVec2;
    readonly DisplayWindowPadding: reference_ImVec2;
    readonly DisplaySafeAreaPadding: reference_ImVec2;
    MouseCursorScale: number;
    AntiAliasedLines: boolean;
    AntiAliasedLinesUseTex: boolean;
    AntiAliasedFill: boolean;
    CurveTessellationTol: number;
    CircleTessellationMaxError: number;
    _getAt_Colors(idx: number): reference_ImVec4;
    _setAt_Colors(idx: number, value: Readonly<interface_ImVec4>): boolean;

    public ScaleAllSizes(scale_factor: number): void;
}

export interface reference_DragDropPayload extends Emscripten.EmscriptenClassReference {
}

export type ImDrawCallback = (parent_list: Readonly<reference_ImDrawList>, cmd: Readonly<reference_ImDrawCmd>) => void;

export interface reference_ImDrawCmd extends Emscripten.EmscriptenClassReference {
    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    readonly ElemCount: number;
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    readonly ClipRect: Readonly<reference_ImVec4>;
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    readonly TextureId: ImTextureID;
    // unsigned int    VtxOffset;              // Start offset in vertex buffer. Pre-1.71 or without ImGuiBackendFlags_RendererHasVtxOffset: always 0. With ImGuiBackendFlags_RendererHasVtxOffset: may be >0 to support meshes larger than 64K vertices with 16-bits indices.
    readonly VtxOffset: number;
    // unsigned int    IdxOffset;              // Start offset in index buffer. Always equal to sum of ElemCount drawn so far.
    readonly IdxOffset: number;
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
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawFlags_None, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    AddRect(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawFlags, thickness: number): void;
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawFlags_None);                     // a: upper-left, b: lower-right
    AddRectFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawFlags): void;
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
    // IMGUI_API void  AddNgon(const ImVec2& center, float radius, ImU32 col, int num_segments, float thickness = 1.0f);
    AddNgon(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number, thickness: number): void;
    // IMGUI_API void  AddNgonFilled(const ImVec2& center, float radius, ImU32 col, int num_segments);
    AddNgonFilled(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number): void;
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    AddText_A(pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string): void;
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    AddText_B(font: reference_ImFont, font_size: number, pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string, wrap_width: number, cpu_fine_clip_rect: Readonly<interface_ImVec4> | null): void;
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    AddImage(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    AddImageQuad(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, uv_c: Readonly<interface_ImVec2>, uv_d: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int flags = ImDrawFlags_None);
    AddImageRounded(user_texture_id: ImTextureID, a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, uv_a: Readonly<interface_ImVec2>, uv_b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, flags: ImDrawFlags): void;
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    AddPolyline(points: Readonly<interface_ImVec2>[], num_points: number, col: ImU32, flags: ImDrawFlags, thickness: number): void;
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    AddConvexPolyFilled(points: Readonly<interface_ImVec2>[], num_points: number, col: ImU32): void;
    // IMGUI_API void  AddBezierCubic(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    AddBezierCubic(pos0: Readonly<interface_ImVec2>, cp0: Readonly<interface_ImVec2>, cp1: Readonly<interface_ImVec2>, pos1: Readonly<interface_ImVec2>, col: ImU32, thickness: number, num_segments: number): void;
    AddBezierQuadratic(pos0: Readonly<interface_ImVec2>, cp0: Readonly<interface_ImVec2>, cp1: Readonly<interface_ImVec2>, col: ImU32, thickness: number, num_segments: number): void;

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
    PathStroke(col: ImU32, flags: ImDrawFlags, thickness: number): void;
    // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
    PathArcTo(centre: Readonly<interface_ImVec2>, radius: number, a_min: number, a_max: number, num_segments: number): void;
    // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
    PathArcToFast(centre: Readonly<interface_ImVec2>, radius: number, a_min_of_12: number, a_max_of_12: number): void;
    // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
    PathBezierCubicCurveTo(p1: Readonly<interface_ImVec2>, p2: Readonly<interface_ImVec2>, p3: Readonly<interface_ImVec2>, num_segments: number): void;
    PathBezierQuadraticCurveTo(p2: Readonly<interface_ImVec2>, p3: Readonly<interface_ImVec2>, num_segments: number): void;
    // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int flags = ImDrawFlags_None);
    PathRect(rect_min: Readonly<interface_ImVec2>, rect_max: Readonly<interface_ImVec2>, rounding: number, flags: ImDrawFlags): void;

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
    PrimUnreserve(idx_count: number, vtx_count: number): void;
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

    // IMGUI_API int   _CalcCircleAutoSegmentCount(float radius) const;
    _CalcCircleAutoSegmentCount(radius: number): number;
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
    // ImVec2          FramebufferScale;       // Amount of pixels for each unit of DisplaySize. Based on io.DisplayFramebufferScale. Generally (1,1) on normal display, (2,2) on OSX with Retina display.
    readonly FramebufferScale: Readonly<reference_ImVec2>;

    // Functions
    // ImDrawData() { Clear(); }
    // void Clear() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; } // Draw lists are owned by the ImGuiContext and only pointed to here.
    // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    DeIndexAllBuffers(): void;
    // IMGUI_API void ScaleClipRects(const ImVec2& fb_scale);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    ScaleClipRects(fb_scale: Readonly<interface_ImVec2>): void;
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
    EllipsisChar: number;
    DotChar: number;
    
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
    // SetFallbackChar(c: number): void;
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
    // unsigned int    FontBuilderFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
    FontBuilderFlags: number;
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
    Colored: boolean;
    Visible: boolean;
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
    GetTexDataAsAlpha8(): { pixels: Uint8ClampedArray, width: number, height: number, bytes_per_pixel: number };
    // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
    GetTexDataAsRGBA32(): { pixels: Uint8ClampedArray, width: number, height: number, bytes_per_pixel: number };
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
    // IMGUI_API const ImWchar*    GetGlyphRangesVietnamese();       // Default + Vietnamese characters
    GetGlyphRangesVietnamese(): number;

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

export interface reference_ImGuiViewport extends Emscripten.EmscriptenClassReference {
    // ImGuiViewportFlags  Flags;                  // See ImGuiViewportFlags_
    Flags: ImGuiViewportFlags;
    // ImVec2              Pos;                    // Main Area: Position of the viewport (Dear ImGui coordinates are the same as OS desktop/native coordinates)
    readonly Pos: interface_ImVec2;
    // ImVec2              Size;                   // Main Area: Size of the viewport.
    readonly Size: interface_ImVec2;
    // ImVec2              WorkPos;                // Work Area: Position of the viewport minus task bars, menus bars, status bars (>= Pos)
    readonly WorkPos: interface_ImVec2;
    // ImVec2              WorkSize;               // Work Area: Size of the viewport minus task bars, menu bars, status bars (<= Size)
    readonly WorkSize: interface_ImVec2;

    // ImGuiViewport()     { memset(this, 0, sizeof(*this)); }

    // Helpers
    // ImVec2              GetCenter() const       { return ImVec2(Pos.x + Size.x * 0.5f, Pos.y + Size.y * 0.5f); }
    // ImVec2              GetWorkCenter() const   { return ImVec2(WorkPos.x + WorkSize.x * 0.5f, WorkPos.y + WorkSize.y * 0.5f); }
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

    // Advanced/subtle behaviors
    // bool        MouseDrawCursor;                // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
    MouseDrawCursor: boolean;
    // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
    ConfigMacOSXBehaviors: boolean;
    // bool          ConfigInputTextCursorBlink;   // = true               // Enable blinking cursor, for users who consider it annoying.
    ConfigInputTextCursorBlink: boolean;
    ConfigDragClickToInputText: boolean;
    // bool          ConfigWindowsResizeFromEdges; // = false          // [BETA] Enable resizing of windows from their edges and from the lower-left corner. This requires (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors) because it needs mouse cursor feedback. (This used to be the ImGuiWindowFlags_ResizeFromAnySide flag)
    ConfigWindowsResizeFromEdges: boolean;
    // bool        ConfigWindowsMoveFromTitleBarOnly;// = false        // [BETA] Set to true to only allow moving windows when clicked+dragged from the title bar. Windows without a title bar are not affected.
    ConfigWindowsMoveFromTitleBarOnly: boolean;
    ConfigMemoryCompactTimer: number;

    //------------------------------------------------------------------
    // Settings (User Functions)
    //------------------------------------------------------------------

    // Optional: Platform/Renderer back-end name (informational only! will be displayed in About Window) + User data for back-end/wrappers to store their own stuff.
    // const char* BackendPlatformName;            // = NULL
    BackendPlatformName: string | null;
    // const char* BackendRendererName;            // = NULL
    BackendRendererName: string | null;
    // void*       BackendPlatformUserData;        // = NULL
    BackendPlatformUserData: string | null;
    // void*       BackendRendererUserData;        // = NULL
    BackendRendererUserData: string | null;
    // void*       BackendLanguageUserData;        // = NULL
    BackendLanguageUserData: string | null;

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
    // IMGUI_API void  AddInputCharacterUTF16(ImWchar16 c);        // Queue new character input from an UTF-16 character, it can be a surrogate
    AddInputCharacterUTF16(c: ImWchar16): void;
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

    WantCaptureMouseUnlessPopupClose: boolean;
    // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
    // ImVec2      MouseClickedPos[5];         // Position at time of clicking
    _getAt_MouseClickedPos(index: number): Readonly<reference_ImVec2>;
    // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
    // bool        MouseClicked[5];            // Mouse button went from !Down to Down
    // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
    // bool        MouseReleased[5];           // Mouse button went from Down to !Down
    // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
    // bool        MouseDownWasDoubleClick[5];     // Track if button down was a double-click
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

    __EMSCRIPTEN_major__: number;
    __EMSCRIPTEN_minor__: number;
    __EMSCRIPTEN_tiny__: number;

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

    ImGuiListClipper: { new(): ImGuiListClipper; };
    ImGuiStyle: { new(): ImGuiStyle; };

    // Context creation and access
    // Each context create its own ImFontAtlas by default. You may instance one yourself and pass it to CreateContext() to share a font atlas between imgui contexts.
    // None of those functions is reliant on the current context.
    // IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
    // IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = destroy current context
    // IMGUI_API ImGuiContext* GetCurrentContext();
    // IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
    CreateContext(shared_font_atlas: reference_ImFontAtlas | null): WrapImGuiContext;
    DestroyContext(ctx: WrapImGuiContext | null): void;
    GetCurrentContext(): WrapImGuiContext | null;
    SetCurrentContext(ctx: WrapImGuiContext | null): void;

    // Main
    // IMGUI_API ImGuiIO&      GetIO();                                    // access the IO structure (mouse/keyboard/gamepad inputs, time, various configuration options/flags)
    // IMGUI_API ImGuiStyle&   GetStyle();                                 // access the Style structure (colors, sizes). Always use PushStyleCol(), PushStyleVar() to modify style mid-frame!
    // IMGUI_API void          NewFrame();                                 // start a new Dear ImGui frame, you can submit any command from this point until Render()/EndFrame().
    // IMGUI_API void          EndFrame();                                 // ends the Dear ImGui frame. automatically called by Render(). If you don't need to render data (skipping rendering) you may call EndFrame() without Render()... but you'll have wasted CPU already! If you don't need to render, better to not create any windows and not call NewFrame() at all!
    // IMGUI_API void          Render();                                   // ends the Dear ImGui frame, finalize the draw data. You can then get call GetDrawData().
    // IMGUI_API ImDrawData*   GetDrawData();                              // valid after Render() and until the next call to NewFrame(). this is what you have to render.
    GetIO(): reference_ImGuiIO;
    GetStyle(): ImGuiStyle;
    NewFrame(): void;
    EndFrame(): void;
    Render(): void;
    GetDrawData(): reference_ImDrawData | null;

    // Demo, Debug, Information
    // IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create Demo window. demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
    // IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create Metrics/Debugger window. display Dear ImGui internals: windows, draw commands, various internal state, etc.
    // IMGUI_API void          ShowStackToolWindow(bool* p_open = NULL);   // create Stack Tool window. hover items with mouse to query information about the source of their unique ID.
    // IMGUI_API void          ShowAboutWindow(bool* p_open = NULL);       // create About window. display Dear ImGui version, credits and build/system information.
    // IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
    // IMGUI_API bool          ShowStyleSelector(const char* label);       // add style selector block (not a window), essentially a combo listing the default styles.
    // IMGUI_API void          ShowFontSelector(const char* label);        // add font selector block (not a window), essentially a combo listing the loaded fonts.
    // IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
    // IMGUI_API const char*   GetVersion();                               // get the compiled version string e.g. "1.80 WIP" (essentially the value for IMGUI_VERSION from the compiled version of imgui.cpp)
    ShowDemoWindow(p_open: ImScalar<boolean> | null): void;
    ShowMetricsWindow(p_open: ImScalar<boolean> | null): void;
    ShowStackToolWindow(p_open: ImScalar<boolean> | null): void;
    ShowAboutWindow(p_open: ImScalar<boolean> | null): void;
    ShowStyleEditor(ref: ImGuiStyle | null): void;
    ShowStyleSelector(label: string): boolean;
    ShowFontSelector(label: string): void;
    ShowUserGuide(): void;
    GetVersion(): string;

    // Styles
    // IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);    // new, recommended style (default)
    // IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);   // best used with borders and a custom, thicker font
    // IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL); // classic imgui style
    StyleColorsDark(dst: ImGuiStyle | null): void;
    StyleColorsLight(dst: ImGuiStyle | null): void;
    StyleColorsClassic(dst: ImGuiStyle | null): void;

    // Windows
    // - Begin() = push window to the stack and start appending to it. End() = pop window from the stack.
    // - Passing 'bool* p_open != NULL' shows a window-closing widget in the upper-right corner of the window,
    //   which clicking will set the boolean to false when clicked.
    // - You may append multiple times to the same window during the same frame by calling Begin()/End() pairs multiple times.
    //   Some information such as 'flags' or 'p_open' will only be considered by the first call to Begin().
    // - Begin() return false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting
    //   anything to the window. Always call a matching End() for each Begin() call, regardless of its return value!
    //   [Important: due to legacy reason, this is inconsistent with most other functions such as BeginMenu/EndMenu,
    //    BeginPopup/EndPopup, etc. where the EndXXX call should only be called if the corresponding BeginXXX function
    //    returned true. Begin and BeginChild are the only odd ones out. Will be fixed in a future update.]
    // - Note that the bottom of window stack always contains a window called "Debug".
    // IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
    // IMGUI_API void          End();
    Begin(name: string, p_open: ImScalar<boolean> | null , flags: ImGuiWindowFlags): boolean;
    End(): void;

    // Child Windows
    // - Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window. Child windows can embed their own child.
    // - For each independent axis of 'size': ==0.0f: use remaining host window size / >0.0f: fixed size / <0.0f: use remaining window size minus abs(size) / Each axis can use a different mode, e.g. ImVec2(0,400).
    // - BeginChild() returns false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting anything to the window.
    //   Always call a matching EndChild() for each BeginChild() call, regardless of its return value.
    //   [Important: due to legacy reason, this is inconsistent with most other functions such as BeginMenu/EndMenu,
    //    BeginPopup/EndPopup, etc. where the EndXXX call should only be called if the corresponding BeginXXX function
    //    returned true. Begin and BeginChild are the only odd ones out. Will be fixed in a future update.]
    // IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
    // IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
    // IMGUI_API void          EndChild();
    BeginChild(id: string | ImGuiID, size: Readonly<interface_ImVec2>, border: boolean, flags: ImGuiWindowFlags): boolean;
    EndChild(): void;

    // Windows Utilities
    // - 'current window' = the window we are appending into while inside a Begin()/End() block. 'next window' = next window we will Begin() into.
    // IMGUI_API bool          IsWindowAppearing();
    // IMGUI_API bool          IsWindowCollapsed();
    // IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags=0); // is current window focused? or its root/child, depending on flags. see flags for options.
    // IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags=0); // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options. NB: If you are trying to check whether your mouse should be dispatched to imgui or to your app, you should use the 'io.WantCaptureMouse' boolean for that! Please read the FAQ!
    // IMGUI_API ImDrawList*   GetWindowDrawList();                        // get draw list associated to the current window, to append your own drawing primitives
    // IMGUI_API ImVec2        GetWindowPos();                             // get current window position in screen space (useful if you want to do your own drawing via the DrawList API)
    // IMGUI_API ImVec2        GetWindowSize();                            // get current window size
    // IMGUI_API float         GetWindowWidth();                           // get current window width (shortcut for GetWindowSize().x)
    // IMGUI_API float         GetWindowHeight();                          // get current window height (shortcut for GetWindowSize().y)
    IsWindowAppearing(): boolean;
    IsWindowCollapsed(): boolean;
    IsWindowFocused(flags: ImGuiFocusedFlags): boolean;
    IsWindowHovered(flags: ImGuiHoveredFlags): boolean;
    GetWindowDrawList(): reference_ImDrawList;
    GetWindowPos(out: interface_ImVec2): typeof out;
    GetWindowSize(out: interface_ImVec2): typeof out;
    GetWindowWidth(): number;
    GetWindowHeight(): number;
    
    // Prefer using SetNextXXX functions (before Begin) rather that SetXXX functions (after Begin).
    // IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0, 0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
    // IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);                  // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
    // IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Sizes will be rounded down. Use callback to apply non-trivial programmatic constraints.
    // IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                               // set next window content size (~ scrollable client area, which enforce the range of scrollbars). Not including window decorations (title bar, menu bar, etc.) nor WindowPadding. set an axis to 0.0f to leave it automatic. call before Begin()
    // IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);                 // set next window collapsed state. call before Begin()
    // IMGUI_API void          SetNextWindowFocus();                                                       // set next window to be focused / top-most. call before Begin()
    // IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                          // set next window background color alpha. helper to easily override the Alpha component of ImGuiCol_WindowBg/ChildBg/PopupBg. you may also use ImGuiWindowFlags_NoBackground.
    // IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                        // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
    // IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);                      // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0, 0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
    // IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);                     // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
    // IMGUI_API void          SetWindowFocus();                                                           // (not recommended) set current window to be focused / top-most. prefer using SetNextWindowFocus().
    // IMGUI_API void          SetWindowFontScale(float scale);                                            // set font scale. Adjust IO.FontGlobalScale if you want to scale all windows. This is an old API! For correct scaling, prefer to reload font + rebuild ImFontAtlas + call style.ScaleAllSizes().
    // IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
    // IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
    // IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
    // IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / top-most. use NULL to remove focus.
    SetNextWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond, pivot: Readonly<interface_ImVec2>): void;
    SetNextWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond): void;
    SetNextWindowSizeConstraints(size_min: Readonly<interface_ImVec2>, size_max: Readonly<interface_ImVec2>, custom_callback: ImGuiSizeCallback | null, data: any): void;
    SetNextWindowContentSize(size: Readonly<interface_ImVec2>): void;
    SetNextWindowCollapsed(collapsed: boolean, cond: ImGuiCond): void;
    SetNextWindowFocus(): void;
    SetNextWindowBgAlpha(alpha: number): void;
    SetWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond): void;
    SetWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond): void;
    SetWindowCollapsed(collapsed: boolean, cond: ImGuiCond): void;
    SetWindowFocus(): void;
    SetWindowFontScale(scale: number): void;
    SetWindowNamePos(name: string, pos: Readonly<interface_ImVec2>, cond: ImGuiCond): void;
    SetWindowNameSize(name: string, size: Readonly<interface_ImVec2>, cond: ImGuiCond): void;
    SetWindowNameCollapsed(name: string, collapsed: boolean, cond: ImGuiCond): void;
    SetWindowNameFocus(name: string): void;

    // Content region
    // - Retrieve available space from a given point. GetContentRegionAvail() is frequently useful.
    // - Those functions are bound to be redesigned (they are confusing, incomplete and the Min/Max return values are in local window coordinates which increases confusion)
    // IMGUI_API ImVec2        GetContentRegionAvail();                                        // == GetContentRegionMax() - GetCursorPos()
    // IMGUI_API ImVec2        GetContentRegionMax();                                          // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
    // IMGUI_API ImVec2        GetWindowContentRegionMin();                                    // content boundaries min (roughly (0,0)-Scroll), in window coordinates
    // IMGUI_API ImVec2        GetWindowContentRegionMax();                                    // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
    // IMGUI_API float         GetWindowContentRegionWidth();                                  //
    GetContentRegionAvail(out: interface_ImVec2): typeof out;
    GetContentRegionMax(out: interface_ImVec2): typeof out;
    GetWindowContentRegionMin(out: interface_ImVec2): typeof out;
    GetWindowContentRegionMax(out: interface_ImVec2): typeof out;
    // GetWindowContentRegionWidth(): number;

    // Windows Scrolling
    // IMGUI_API float         GetScrollX();                                                   // get scrolling amount [0 .. GetScrollMaxX()]
    // IMGUI_API float         GetScrollY();                                                   // get scrolling amount [0 .. GetScrollMaxY()]
    // IMGUI_API void          SetScrollX(float scroll_x);                                     // set scrolling amount [0 .. GetScrollMaxX()]
    // IMGUI_API void          SetScrollY(float scroll_y);                                     // set scrolling amount [0 .. GetScrollMaxY()]
    // IMGUI_API float         GetScrollMaxX();                                                // get maximum scrolling amount ~~ ContentSize.x - WindowSize.x - DecorationsSize.x
    // IMGUI_API float         GetScrollMaxY();                                                // get maximum scrolling amount ~~ ContentSize.y - WindowSize.y - DecorationsSize.y
    // IMGUI_API void          SetScrollHereX(float center_x_ratio = 0.5f);                    // adjust scrolling amount to make current cursor position visible. center_x_ratio=0.0: left, 0.5: center, 1.0: right. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    // IMGUI_API void          SetScrollHereY(float center_y_ratio = 0.5f);                    // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
    // IMGUI_API void          SetScrollFromPosX(float local_x, float center_x_ratio = 0.5f);  // adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.
    // IMGUI_API void          SetScrollFromPosY(float local_y, float center_y_ratio = 0.5f);  // adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.
    GetScrollX(): number;
    GetScrollY(): number;
    SetScrollX(scroll_x: number): void;
    SetScrollY(scroll_y: number): void;
    GetScrollMaxX(): number;
    GetScrollMaxY(): number;
    SetScrollHereX(center_x_ratio: number): void;
    SetScrollHereY(center_y_ratio: number): void;
    SetScrollFromPosX(pos_x: number, center_x_ratio: number): void;
    SetScrollFromPosY(pos_y: number, center_y_ratio: number): void;

    // Parameters stacks (shared)
    // IMGUI_API void          PushFont(ImFont* font);                                         // use NULL as a shortcut to push default font
    // IMGUI_API void          PopFont();
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);                        // modify a style color. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
    // IMGUI_API void          PopStyleColor(int count = 1);
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);                     // modify a style float variable. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);             // modify a style ImVec2 variable. always use this if you modify the style after NewFrame().
    // IMGUI_API void          PopStyleVar(int count = 1);
    // IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);              // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
    // IMGUI_API void          PopAllowKeyboardFocus();
    // IMGUI_API void          PushButtonRepeat(bool repeat);                                  // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
    // IMGUI_API void          PopButtonRepeat();
    PushFont(font: reference_ImFont | null): void;
    PopFont(): void;
    PushStyleColor(idx: ImGuiCol, col: ImU32 | Readonly<interface_ImVec4>): void;
    PopStyleColor(count: number): void;
    PushStyleVar(idx: ImGuiStyleVar, val: number | Readonly<interface_ImVec2>): void;
    PopStyleVar(count: number): void;
    PushAllowKeyboardFocus(allow_keyboard_focus: boolean): void;
    PopAllowKeyboardFocus(): void;
    PushButtonRepeat(repeat: boolean): void;
    PopButtonRepeat(): void;

    // Parameters stacks (current window)
    // IMGUI_API void          PushItemWidth(float item_width);                                // push width of items for common large "item+label" widgets. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -FLT_MIN always align width to the right side). 0.0f = default to ~2/3 of windows width,
    // IMGUI_API void          PopItemWidth();
    // IMGUI_API void          SetNextItemWidth(float item_width);                             // set width of the _next_ common large "item+label" widget. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -FLT_MIN always align width to the right side)
    // IMGUI_API float         CalcItemWidth();                                                // width of item given pushed settings and current cursor position. NOT necessarily the width of last item unlike most 'Item' functions.
    // IMGUI_API void          PushTextWrapPos(float wrap_local_pos_x = 0.0f);                 // push word-wrapping position for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
    // IMGUI_API void          PopTextWrapPos();
    PushItemWidth(item_width: number): void;
    PopItemWidth(): void;
    SetNextItemWidth(item_width: number): void;
    CalcItemWidth(): number;
    PushTextWrapPos(wrap_pos_x: number): void;
    PopTextWrapPos(): void;

    // Style read access
    // IMGUI_API ImFont*       GetFont();                                                      // get current font
    // IMGUI_API float         GetFontSize();                                                  // get current font size (= height in pixels) of current font with current scale applied
    // IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                       // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
    // IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);              // retrieve given style color with style alpha applied and optional extra alpha multiplier, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                 // retrieve given color with style alpha applied, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API ImU32         GetColorU32(ImU32 col);                                         // retrieve given color with style alpha applied, packed as a 32-bit value suitable for ImDrawList
    // IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwise use GetColorU32() to get style color with style alpha baked in.
    GetFont(): reference_ImFont;
    GetFontSize(): number;
    GetFontTexUvWhitePixel(out: interface_ImVec2): typeof out;
    GetColorU32_A(idx: ImGuiCol, alpha_mul: number): ImU32;
    GetColorU32_B(col: Readonly<interface_ImVec4>): ImU32;
    GetColorU32_C(col: ImU32): ImU32;
    GetStyleColorVec4(idx: ImGuiCol): Readonly<reference_ImVec4>;

    // Cursor / Layout
    // - By "cursor" we mean the current output position.
    // - The typical widget behavior is to output themselves at the current cursor position, then move the cursor one line down.
    // - You can call SameLine() between widgets to undo the last carriage return and output at the right of the preceding widget.
    // - Attention! We currently have inconsistencies between window-local and absolute positions we will aim to fix with future API:
    //    Window-local coordinates:   SameLine(), GetCursorPos(), SetCursorPos(), GetCursorStartPos(), GetContentRegionMax(), GetWindowContentRegion*(), PushTextWrapPos()
    //    Absolute coordinate:        GetCursorScreenPos(), SetCursorScreenPos(), all ImDrawList:: functions.
    // IMGUI_API void          Separator();                                                    // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
    // IMGUI_API void          SameLine(float offset_from_start_x=0.0f, float spacing=-1.0f);  // call between widgets or groups to layout them horizontally. X position given in window coordinates.
    // IMGUI_API void          NewLine();                                                      // undo a SameLine() or force a new line when in an horizontal-layout context.
    // IMGUI_API void          Spacing();                                                      // add vertical spacing.
    // IMGUI_API void          Dummy(const ImVec2& size);                                      // add a dummy item of given size. unlike InvisibleButton(), Dummy() won't take the mouse click or be navigable into.
    // IMGUI_API void          Indent(float indent_w = 0.0f);                                  // move content position toward the right, by indent_w, or style.IndentSpacing if indent_w <= 0
    // IMGUI_API void          Unindent(float indent_w = 0.0f);                                // move content position back to the left, by indent_w, or style.IndentSpacing if indent_w <= 0
    // IMGUI_API void          BeginGroup();                                                   // lock horizontal starting position
    // IMGUI_API void          EndGroup();                                                     // unlock horizontal starting position + capture the whole group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
    // IMGUI_API ImVec2        GetCursorPos();                                                 // cursor position in window coordinates (relative to window position)
    // IMGUI_API float         GetCursorPosX();                                                //   (some functions are using window-relative coordinates, such as: GetCursorPos, GetCursorStartPos, GetContentRegionMax, GetWindowContentRegion* etc.
    // IMGUI_API float         GetCursorPosY();                                                //    other functions such as GetCursorScreenPos or everything in ImDrawList::
    // IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                          //    are using the main, absolute coordinate system.
    // IMGUI_API void          SetCursorPosX(float local_x);                                   //    GetWindowPos() + GetCursorPos() == GetCursorScreenPos() etc.)
    // IMGUI_API void          SetCursorPosY(float local_y);                                   //
    // IMGUI_API ImVec2        GetCursorStartPos();                                            // initial cursor position in window coordinates
    // IMGUI_API ImVec2        GetCursorScreenPos();                                           // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
    // IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                          // cursor position in absolute screen coordinates [0..io.DisplaySize]
    // IMGUI_API void          AlignTextToFramePadding();                                      // vertically align upcoming text baseline to FramePadding.y so that it will align properly to regularly framed items (call if you have text on a line before a framed item)
    // IMGUI_API float         GetTextLineHeight();                                            // ~ FontSize
    // IMGUI_API float         GetTextLineHeightWithSpacing();                                 // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
    // IMGUI_API float         GetFrameHeight();                                               // ~ FontSize + style.FramePadding.y * 2
    // IMGUI_API float         GetFrameHeightWithSpacing();                                    // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
    Separator(): void;
    SameLine(pos_x: number, spacing_w: number): void;
    NewLine(): void;
    Spacing(): void;
    Dummy(size: Readonly<interface_ImVec2>): void;
    Indent(indent_w: number): void;
    Unindent(indent_w: number): void;
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

    // ID stack/scopes
    // - Read the FAQ for more details about how ID are handled in dear imgui. If you are creating widgets in a loop you most
    //   likely want to push a unique identifier (e.g. object pointer, loop index) to uniquely differentiate them.
    // - The resulting ID are hashes of the entire stack.
    // - You can also use the "Label##foobar" syntax within widget label to distinguish them from each others.
    // - In this header file we use the "label"/"name" terminology to denote a string that will be displayed and used as an ID,
    //   whereas "str_id" denote a string that is only used as an ID and not normally displayed.
    // IMGUI_API void          PushID(const char* str_id);                                     // push string into the ID stack (will hash string).
    // IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);       // push string into the ID stack (will hash string).
    // IMGUI_API void          PushID(const void* ptr_id);                                     // push pointer into the ID stack (will hash pointer).
    // IMGUI_API void          PushID(int int_id);                                             // push integer into the ID stack (will hash integer).
    // IMGUI_API void          PopID();                                                        // pop from the ID stack.
    // IMGUI_API ImGuiID       GetID(const char* str_id);                                      // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
    // IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
    // IMGUI_API ImGuiID       GetID(const void* ptr_id);
    PushID(id: string | number): void;
    PopID(): void;
    GetID(id: string | number): ImGuiID;

    // Widgets: Text
    // IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL); // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
    // IMGUI_API void          Text(const char* fmt, ...)                                      IM_FMTARGS(1); // formatted text
    // IMGUI_API void          TextV(const char* fmt, va_list args)                            IM_FMTLIST(1);
    // IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)            IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args)  IM_FMTLIST(2);
    // IMGUI_API void          TextDisabled(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
    // IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                    IM_FMTLIST(1);
    // IMGUI_API void          TextWrapped(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
    // IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                     IM_FMTLIST(1);
    // IMGUI_API void          LabelText(const char* label, const char* fmt, ...)              IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
    // IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)    IM_FMTLIST(2);
    // IMGUI_API void          BulletText(const char* fmt, ...)                                IM_FMTARGS(1); // shortcut for Bullet()+Text()
    // IMGUI_API void          BulletTextV(const char* fmt, va_list args)                      IM_FMTLIST(1);
    TextUnformatted(text: string): void;
    Text(fmt: string): void;
    TextColored(col: Readonly<interface_ImVec4>, fmt: string): void;
    TextDisabled(fmt: string): void;
    TextWrapped(fmt: string): void;
    LabelText(label: string, fmt: string): void;
    BulletText(fmt: string): void;

    // Widgets: Main
    // - Most widgets return true when the value has been changed or when pressed/selected
    // - You may also use one of the many IsItemXXX functions (e.g. IsItemActive, IsItemHovered, etc.) to query widget state.
    // IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0, 0));   // button
    // IMGUI_API bool          SmallButton(const char* label);                                 // button with FramePadding=(0,0) to easily embed within text
    // IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size, ImGuiButtonFlags flags = 0); // flexible button behavior without the visuals, frequently useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
    // IMGUI_API bool          ArrowButton(const char* str_id, ImGuiDir dir);                  // square button with an arrow shape
    // IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
    // IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
    // IMGUI_API bool          Checkbox(const char* label, bool* v);
    // IMGUI_API bool          CheckboxFlags(const char* label, int* flags, int flags_value);
    // IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
    // IMGUI_API bool          RadioButton(const char* label, bool active);                    // use with e.g. if (RadioButton("one", my_value==1)) { my_value = 1; }
    // IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);           // shortcut to handle the above pattern when value is an integer
    // IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-FLT_MIN, 0), const char* overlay = NULL);
    // IMGUI_API void          Bullet();                                                       // draw a small circle + keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
    Button(label: string, size: Readonly<interface_ImVec2>): boolean;
    SmallButton(label: string): boolean;
    InvisibleButton(str_id: string, size: Readonly<interface_ImVec2>, flags: ImGuiButtonFlags): boolean;
    ArrowButton(label: string, dir: ImGuiDir): boolean;
    Image(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, tint_col: Readonly<interface_ImVec4>, border_col: Readonly<interface_ImVec4>): void;
    ImageButton(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, frame_padding: number, bg_col: Readonly<interface_ImVec4>, tint_col: Readonly<interface_ImVec4>): boolean;
    Checkbox(label: string, v: ImScalar<boolean>): boolean;
    CheckboxFlags(label: string, flags: ImScalar<number> | null, flags_value: number): boolean;
    RadioButton_A(label: string, active: boolean): boolean;
    RadioButton_B(label: string, v: ImScalar<number>, v_button: number): boolean;
    ProgressBar(fraction: number, size_arg: Readonly<interface_ImVec2>, overlay: string | null): void;
    Bullet(): void;

    // Widgets: Combo Box
    // - The BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it, by creating e.g. Selectable() items.
    // - The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
    // IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
    // IMGUI_API void          EndCombo(); // only call EndCombo() if BeginCombo() returns true!
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
    // IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
    // IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
    BeginCombo(label: string, preview_value: string | null, flags: ImGuiComboFlags): boolean;
    EndCombo(): void;
    Combo<T>(label: string, current_item: ImScalar<number>, items_getter: (data: T, idx: number, out_text: [string]) => boolean, data: T, items_count: number, popup_max_height_in_items: number): boolean;

    // Widgets: Drag Sliders
    // - CTRL+Click on any drag box to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
    // - For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
    // - Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.
    // - Format string may also be set to NULL or use the default format ("%f" or "%d").
    // - Speed are per-pixel of mouse movement (v_speed=0.2f: mouse needs to move by 5 pixels to increase value by 1). For gamepad/keyboard navigation, minimum speed is Max(v_speed, minimum_step_at_given_precision).
    // - Use v_min < v_max to clamp edits to given limits. Note that CTRL+Click manual input can override those limits.
    // - Use v_max = FLT_MAX / INT_MAX etc to avoid clamping to a maximum, same with v_min = -FLT_MAX / INT_MIN to avoid clamping to a minimum.
    // - We use the same sets of flags for DragXXX() and SliderXXX() functions as the features are the same and it makes it easier to swap them.
    // - Legacy: Pre-1.78 there are DragXXX() function signatures that takes a final `float power=1.0f' argument instead of the `ImGuiSliderFlags flags=0' argument.
    //   If you get a warning converting a float to ImGuiSliderFlags, read https://github.com/ocornut/imgui/issues/3361
    // IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);     // If v_min >= v_max we have no bound
    // IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);  // If v_min >= v_max we have no bound
    // IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragScalar(const char* label, ImGuiDataType data_type, void* p_data, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          DragScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
    DragFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string | null, flags: ImGuiSliderFlags): boolean;
    DragFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragFloat4(label: string, v: ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragFloatRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number, v_min: number, v_max: number, format: string, format_max: string | null, flags: ImGuiSliderFlags): boolean;
    DragInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragInt4(label: string, v: ImTuple4<number>, v_speed: number, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    DragIntRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number, v_min: number, v_max: number, format: string, format_max: string | null, flags: ImGuiSliderFlags): boolean;
    DragScalar(label: string, data_type: ImGuiDataType, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, v_speed: number, v_min: number | null, v_max: number | null, format: string | null, flags: ImGuiSliderFlags): boolean;

    // Widgets: Regular Sliders
    // - CTRL+Click on any slider to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
    // - Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.
    // - Format string may also be set to NULL or use the default format ("%f" or "%d").
    // - Legacy: Pre-1.78 there are SliderXXX() function signatures that takes a final `float power=1.0f' argument instead of the `ImGuiSliderFlags flags=0' argument.
    //   If you get a warning converting a float to ImGuiSliderFlags, read https://github.com/ocornut/imgui/issues/3361
    // IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);     // adjust format to decorate the value with a prefix or a suffix for in-slider labels or unit display.
    // IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f, const char* format = "%.0f deg", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          SliderScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
    // IMGUI_API bool          VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
    SliderFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderFloat4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderAngle(label: string, v_rad: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_degrees_min: number, v_degrees_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderInt4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    SliderScalar(label: string, data_type: ImGuiDataType, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, v_min: number | null, v_max: number | null, format: string | null, flags: ImGuiSliderFlags): boolean;
    VSliderFloat(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    VSliderInt(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, format: string, flags: ImGuiSliderFlags): boolean;
    VSliderScalar(label: string, size: Readonly<interface_ImVec2>, data_type: ImGuiDataType, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, v_min: number | null, v_max: number | null, format: string | null, flags: ImGuiSliderFlags): boolean;

    // Widgets: Input with Keyboard
    // - If you want to use InputText() with std::string or any custom dynamic string type, see misc/cpp/imgui_stdlib.h and comments in imgui_demo.cpp.
    // - Most of the ImGuiInputTextFlags flags are only useful for InputText() and not for InputFloatX, InputIntX, InputDouble etc.
    // IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0, 0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputTextWithHint(const char* label, const char* hint, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
    // IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputDouble(const char* label, double* v, double step = 0.0, double step_fast = 0.0, const char* format = "%.6f", ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
    // IMGUI_API bool          InputScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
    InputText(label: string, buf: [ string ], buf_size: number, flags: ImGuiInputTextFlags, callback: ImGuiInputTextCallback | null, user_data: any): boolean;
    InputTextMultiline(label: string, buf: [ string ], buf_size: number, size: Readonly<interface_ImVec2>, flags: ImGuiInputTextFlags, callback: ImGuiInputTextCallback | null, user_data: any): boolean;
    InputTextWithHint(label: string, hint: string, buf: [ string ], buf_size: number, flags: ImGuiInputTextFlags, callback: ImGuiInputTextCallback | null, user_data: any): boolean;
    InputFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number, step_fast: number, format: string, flags: ImGuiInputTextFlags): boolean;
    InputFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, format: string, flags: ImGuiInputTextFlags): boolean;
    InputFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, format: string, flags: ImGuiInputTextFlags): boolean;
    InputFloat4(label: string, v: ImTuple4<number>, format: string, flags: ImGuiInputTextFlags): boolean;
    InputInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number, step_fast: number, flags: ImGuiInputTextFlags): boolean;
    InputInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, flags: ImGuiInputTextFlags): boolean;
    InputInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, flags: ImGuiInputTextFlags): boolean;
    InputInt4(label: string, v: ImTuple4<number>, flags: ImGuiInputTextFlags): boolean;
    InputDouble(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number, step_fast: number, format: string, flags: ImGuiInputTextFlags): boolean;
    InputScalar(label: string, data_type: ImGuiDataType, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, step: number | null, step_fast: number | null, format: string | null, flags: ImGuiInputTextFlags): boolean;

    // Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little color square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
    // - Note that in C++ a 'float v[X]' function argument is the _same_ as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible.
    // - You can pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
    // IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
    // IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
    // IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0, 0)); // display a color square/button, hover for details, return true when pressed.
    // IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                     // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
    ColorEdit3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags): boolean;
    ColorEdit4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags): boolean;
    ColorPicker3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags): boolean;
    ColorPicker4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags, ref_col: ImTuple4<number> | null): boolean;
    ColorButton(desc_id: string, col: Readonly<interface_ImVec4>, flags: ImGuiColorEditFlags, size: Readonly<interface_ImVec2>): boolean;
    SetColorEditOptions(flags: ImGuiColorEditFlags): void;

    // Widgets: Trees
    // - TreeNode functions return true when the node is open, in which case you need to also call TreePop() when you are finished displaying the tree node contents.
    // IMGUI_API bool          TreeNode(const char* label);
    // IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);   // helper variation to easily decorelate the id from the displayed string. Read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
    // IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);   // "
    // IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
    // IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
    // IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
    // IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
    // IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    // IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
    // IMGUI_API void          TreePush(const char* str_id);                                       // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call TreePush/TreePop yourself if desired.
    // IMGUI_API void          TreePush(const void* ptr_id = NULL);                                // "
    // IMGUI_API void          TreePop();                                                          // ~ Unindent()+PopId()
    // IMGUI_API float         GetTreeNodeToLabelSpacing();                                        // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
    // IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);  // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
    // IMGUI_API bool          CollapsingHeader(const char* label, bool* p_visible, ImGuiTreeNodeFlags flags = 0); // when 'p_visible != NULL': if '*p_visible==true' display an additional small close button on upper right of the header which will set the bool to false when clicked, if '*p_visible==false' don't display the header.
    // IMGUI_API void          SetNextItemOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
    TreeNode_A(label: string): boolean;
    TreeNode_B(str_id: string, fmt: string): boolean;
    TreeNode_C(ptr_id: number, fmt: string): boolean;
    TreeNodeEx_A(label: string, flags: ImGuiTreeNodeFlags): boolean;
    TreeNodeEx_B(str_id: string, flags: ImGuiTreeNodeFlags, fmt: string): boolean;
    TreeNodeEx_C(ptr_id: number, flags: ImGuiTreeNodeFlags, fmt: string): boolean;
    TreePush_A(str_id: string): void;
    TreePush_B(ptr_id: number): void;
    TreePop(): void;
    GetTreeNodeToLabelSpacing(): number;
    CollapsingHeader_A(label: string, flags: ImGuiTreeNodeFlags): boolean;
    CollapsingHeader_B(label: string, p_open: ImScalar<boolean> | null, flags: ImGuiTreeNodeFlags): boolean;
    SetNextItemOpen(is_open: boolean, cond: ImGuiCond): void;

    // Widgets: Selectables
    // - A selectable highlights when hovered, and can display another color when selected.
    // - Neighbors selectable extend their highlight bounds in order to leave no gap between them. This is so a series of selected Selectable appear contiguous.
    // IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0)); // "bool selected" carry the selection state (read-only). Selectable() is clicked is returns true so you can modify your selection state. size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
    // IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0));      // "bool* p_selected" point to the selection state (read-write), as a convenient helper.
    Selectable_A(label: string, selected: boolean, flags: ImGuiSelectableFlags, size: interface_ImVec2): boolean;
    Selectable_B(label: string, p_selected: ImScalar<boolean>, flags: ImGuiSelectableFlags, size: interface_ImVec2): boolean;

    // Widgets: List Boxes
    // - FIXME: To be consistent with all the newer API, ListBoxHeader/ListBoxFooter should in reality be called BeginListBox/EndListBox. Will rename them.
    // IMGUI_API bool          BeginListBox(const char* label, const ImVec2& size = ImVec2(0, 0)); // open a framed scrolling region
    // IMGUI_API void          EndListBox();                                                       // only call EndListBox() if BeginListBox() returned true!
    // IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const items[], int items_count, int height_in_items = -1);
    // IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
    BeginListBox(label: string, size: Readonly<interface_ImVec2>): boolean;
    EndListBox(): void;
    ListBox_A(label: string, current_item: ImScalar<number>, items: string[], items_count: number, height_in_items: number): boolean;
    ListBox_B<T>(label: string, current_item: ImScalar<number>, items_getter: (data: T, idx: number, out_text: [string]) => boolean, data: T, items_count: number, height_in_items: number): boolean;

    // Widgets: Data Plotting
    // IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float));
    // IMGUI_API void          PlotLines(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0));
    // IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float));
    // IMGUI_API void          PlotHistogram(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0));
    PlotLines<T>(label: string, values_getter: (data: T, idx: number) => number, data: T, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number, scale_max: number, graph_size: Readonly<interface_ImVec2>): void;
    PlotHistogram<T>(label: string, values_getter: (data: T, idx: number) => number, data: T, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number, scale_max: number, graph_size: Readonly<interface_ImVec2>): void;

    // Widgets: Value() Helpers.
    // - Those are merely shortcut to calling Text() with a format string. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
    // IMGUI_API void          Value(const char* prefix, bool b);
    // IMGUI_API void          Value(const char* prefix, int v);
    // IMGUI_API void          Value(const char* prefix, unsigned int v);
    // IMGUI_API void          Value(const char* prefix, float v, const char* float_format = NULL);
    Value_A(prefix: string, b: boolean): void;
    Value_B(prefix: string, v: number): void;
    Value_C(prefix: string, v: number): void;
    Value_D(prefix: string, v: number, float_format: string | null): void;

    // Widgets: Menus
    // - Use BeginMenuBar() on a window ImGuiWindowFlags_MenuBar to append to its menu bar.
    // - Use BeginMainMenuBar() to create a menu bar at the top of the screen and append to it.
    // - Use BeginMenu() to create a menu. You can call BeginMenu() multiple time with the same identifier to append more items to it.
    // IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window).
    // IMGUI_API void          EndMenuBar();                                                       // only call EndMenuBar() if BeginMenuBar() returns true!
    // IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar.
    // IMGUI_API void          EndMainMenuBar();                                                   // only call EndMainMenuBar() if BeginMainMenuBar() returns true!
    // IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
    // IMGUI_API void          EndMenu();                                                          // only call EndMenu() if BeginMenu() returns true!
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
    // IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
    BeginMenuBar(): boolean;
    EndMenuBar(): void;
    BeginMainMenuBar(): boolean;
    EndMainMenuBar(): void;
    BeginMenu(label: string, enabled: boolean): boolean;
    EndMenu(): void;
    MenuItem_A(label: string, shortcut: string | null, selected: boolean, enabled: boolean): boolean;
    MenuItem_B(label: string, shortcut: string | null, p_selected: ImScalar<boolean>, enabled: boolean): boolean;

    // Tooltips
    // - Tooltip are windows following the mouse. They do not take focus away.
    // IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of items).
    // IMGUI_API void          EndTooltip();
    // IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set a text-only tooltip, typically use with ImGui::IsItemHovered(). override any previous call to SetTooltip().
    // IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
    BeginTooltip(): void;
    EndTooltip(): void;
    SetTooltip(fmt: string): void;

    // Popups, Modals
    //  - They block normal mouse hovering detection (and therefore most mouse interactions) behind them.
    //  - If not modal: they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
    //  - Their visibility state (~bool) is held internally instead of being held by the programmer as we are used to with regular Begin*() calls.
    //  - The 3 properties above are related: we need to retain popup visibility state in the library because popups may be closed as any time.
    //  - You can bypass the hovering restriction by using ImGuiHoveredFlags_AllowWhenBlockedByPopup when calling IsItemHovered() or IsWindowHovered().
    //  - IMPORTANT: Popup identifiers are relative to the current ID stack, so OpenPopup and BeginPopup generally needs to be at the same level of the stack.
    //    This is sometimes leading to confusing mistakes. May rework this in the future.
    // Popups: begin/end functions
    //  - BeginPopup(): query popup state, if open start appending into the window. Call EndPopup() afterwards. ImGuiWindowFlags are forwarded to the window.
    //  - BeginPopupModal(): block every interactions behind the window, cannot be closed by user, add a dimming background, has a title bar.
    // IMGUI_API bool          BeginPopup(const char* str_id, ImGuiWindowFlags flags = 0);                         // return true if the popup is open, and you can start outputting to it.
    // IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0); // return true if the modal is open, and you can start outputting to it.
    // IMGUI_API void          EndPopup();                                                                         // only call EndPopup() if BeginPopupXXX() returns true!
    BeginPopup(str_id: string, flags: ImGuiWindowFlags): boolean;
    BeginPopupModal(name: string, p_open: ImScalar<boolean> | null, flags: ImGuiWindowFlags): boolean;
    EndPopup(): void;
    // Popups: open/close functions
    //  - OpenPopup(): set popup state to open. ImGuiPopupFlags are available for opening options.
    //  - If not modal: they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
    //  - CloseCurrentPopup(): use inside the BeginPopup()/EndPopup() scope to close manually.
    //  - CloseCurrentPopup() is called by default by Selectable()/MenuItem() when activated (FIXME: need some options).
    //  - Use ImGuiPopupFlags_NoOpenOverExistingPopup to avoid opening a popup if there's already one at the same level. This is equivalent to e.g. testing for !IsAnyPopupOpen() prior to OpenPopup().
    // IMGUI_API void          OpenPopup(const char* str_id, ImGuiPopupFlags popup_flags = 0);                     // call to mark popup as open (don't call every frame!).
    // IMGUI_API void          OpenPopupOnItemClick(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);   // helper to open popup when clicked on last item. return true when just opened. (note: actually triggers on the mouse _released_ event to be consistent with popup behaviors)
    // IMGUI_API void          CloseCurrentPopup();                                                                // manually close the popup we have begin-ed into.
    OpenPopup(str_id: string, popup_flags: ImGuiPopupFlags): void;
    OpenPopupOnItemClick(str_id: string | null, popup_flags: ImGuiPopupFlags): void;
    CloseCurrentPopup(): void;
    // Popups: open+begin combined functions helpers
    //  - Helpers to do OpenPopup+BeginPopup where the Open action is triggered by e.g. hovering an item and right-clicking.
    //  - They are convenient to easily create context menus, hence the name.
    //  - IMPORTANT: Notice that BeginPopupContextXXX takes ImGuiPopupFlags just like OpenPopup() and unlike BeginPopup(). For full consistency, we may add ImGuiWindowFlags to the BeginPopupContextXXX functions in the future.
    //  - IMPORTANT: we exceptionally default their flags to 1 (== ImGuiPopupFlags_MouseButtonRight) for backward compatibility with older API taking 'int mouse_button = 1' parameter, so if you add other flags remember to re-add the ImGuiPopupFlags_MouseButtonRight.
    // IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);  // open+begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
    // IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);// open+begin popup when clicked on current window.
    // IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);  // open+begin popup when clicked in void (where there are no windows).
    BeginPopupContextItem(str_id: string | null, popup_flags: ImGuiPopupFlags): boolean;
    BeginPopupContextWindow(str_id: string | null, popup_flags: ImGuiPopupFlags): boolean;
    BeginPopupContextVoid(str_id: string | null, popup_flags: ImGuiPopupFlags): boolean;
    // Popups: test function
    //  - IsPopupOpen(): return true if the popup is open at the current BeginPopup() level of the popup stack.
    //  - IsPopupOpen() with ImGuiPopupFlags_AnyPopupId: return true if any popup is open at the current BeginPopup() level of the popup stack.
    //  - IsPopupOpen() with ImGuiPopupFlags_AnyPopupId + ImGuiPopupFlags_AnyPopupLevel: return true if any popup is open.
    // IMGUI_API bool          IsPopupOpen(const char* str_id, ImGuiPopupFlags flags = 0);                         // return true if the popup is open.
    IsPopupOpen(str_id: string, flags: ImGuiPopupFlags): boolean;

    // Tables
    // [BETA API] API may evolve slightly! If you use this, please update to the next version when it comes out!
    // - Full-featured replacement for old Columns API.
    // - See Demo->Tables for demo code.
    // - See top of imgui_tables.cpp for general commentary.
    // - See ImGuiTableFlags_ and ImGuiTableColumnFlags_ enums for a description of available flags.
    // The typical call flow is:
    // - 1. Call BeginTable().
    // - 2. Optionally call TableSetupColumn() to submit column name/flags/defaults.
    // - 3. Optionally call TableSetupScrollFreeze() to request scroll freezing of columns/rows.
    // - 4. Optionally call TableHeadersRow() to submit a header row. Names are pulled from TableSetupColumn() data.
    // - 5. Populate contents:
    //    - In most situations you can use TableNextRow() + TableSetColumnIndex(N) to start appending into a column.
    //    - If you are using tables as a sort of grid, where every columns is holding the same type of contents,
    //      you may prefer using TableNextColumn() instead of TableNextRow() + TableSetColumnIndex().
    //      TableNextColumn() will automatically wrap-around into the next row if needed.
    //    - IMPORTANT: Comparatively to the old Columns() API, we need to call TableNextColumn() for the first column!
    //    - Summary of possible call flow:
    //        --------------------------------------------------------------------------------------------------------
    //        TableNextRow() -> TableSetColumnIndex(0) -> Text("Hello 0") -> TableSetColumnIndex(1) -> Text("Hello 1")  // OK
    //        TableNextRow() -> TableNextColumn()      -> Text("Hello 0") -> TableNextColumn()      -> Text("Hello 1")  // OK
    //                          TableNextColumn()      -> Text("Hello 0") -> TableNextColumn()      -> Text("Hello 1")  // OK: TableNextColumn() automatically gets to next row!
    //        TableNextRow()                           -> Text("Hello 0")                                               // Not OK! Missing TableSetColumnIndex() or TableNextColumn()! Text will not appear!
    //        --------------------------------------------------------------------------------------------------------
    // - 5. Call EndTable()
    // IMGUI_API bool          BeginTable(const char* str_id, int column, ImGuiTableFlags flags = 0, const ImVec2& outer_size = ImVec2(0.0f, 0.0f), float inner_width = 0.0f);
    // IMGUI_API void          EndTable();                                 // only call EndTable() if BeginTable() returns true!
    // IMGUI_API void          TableNextRow(ImGuiTableRowFlags row_flags = 0, float min_row_height = 0.0f); // append into the first cell of a new row.
    // IMGUI_API bool          TableNextColumn();                          // append into the next column (or first column of next row if currently in last column). Return true when column is visible.
    // IMGUI_API bool          TableSetColumnIndex(int column_n);          // append into the specified column. Return true when column is visible.
    BeginTable(str_id: string, column: number, flags: ImGuiTableFlags, outer_size: interface_ImVec2, inner_width: number): boolean;
    EndTable(): void;
    TableNextRow(row_flags: ImGuiTableRowFlags, min_row_height: number): void;
    TableNextColumn(): boolean
    TableSetColumnIndex(column_n: number): boolean;
    // Tables: Headers & Columns declaration
    // - Use TableSetupColumn() to specify label, resizing policy, default width/weight, id, various other flags etc.
    // - Use TableHeadersRow() to create a header row and automatically submit a TableHeader() for each column.
    //   Headers are required to perform: reordering, sorting, and opening the context menu.
    //   The context menu can also be made available in columns body using ImGuiTableFlags_ContextMenuInBody.
    // - You may manually submit headers using TableNextRow() + TableHeader() calls, but this is only useful in
    //   some advanced use cases (e.g. adding custom widgets in header row).
    // - Use TableSetupScrollFreeze() to lock columns/rows so they stay visible when scrolled.
    // IMGUI_API void          TableSetupColumn(const char* label, ImGuiTableColumnFlags flags = 0, float init_width_or_weight = 0.0f, ImU32 user_id = 0);
    // IMGUI_API void          TableSetupScrollFreeze(int cols, int rows); // lock columns/rows so they stay visible when scrolled.
    // IMGUI_API void          TableHeadersRow();                          // submit all headers cells based on data provided to TableSetupColumn() + submit context menu
    // IMGUI_API void          TableHeader(const char* label);             // submit one header cell manually (rarely used)
    TableSetupColumn(label: string, flags: ImGuiTableColumnFlags, init_width_or_weight: number, user_id: ImU32): void;
    TableSetupScrollFreeze(cols: number, rows: number): void;
    TableHeadersRow(): void;
    TableHeader(label: string): void;
    // Tables: Sorting
    // - Call TableGetSortSpecs() to retrieve latest sort specs for the table. NULL when not sorting.
    // - When 'SpecsDirty == true' you should sort your data. It will be true when sorting specs have changed
    //   since last call, or the first time. Make sure to set 'SpecsDirty = false' after sorting, else you may
    //   wastefully sort your data every frame!
    // - Lifetime: don't hold on this pointer over multiple frames or past any subsequent call to BeginTable().
    // IMGUI_API ImGuiTableSortSpecs* TableGetSortSpecs();                        // get latest sort specs for the table (NULL if not sorting).
    TableGetSortSpecs(): reference_ImGuiTableSortSpecs | null;
    // Tables: Miscellaneous functions
    // - Functions args 'int column_n' treat the default value of -1 as the same as passing the current column index.
    // IMGUI_API int                   TableGetColumnCount();                      // return number of columns (value passed to BeginTable)
    // IMGUI_API int                   TableGetColumnIndex();                      // return current column index.
    // IMGUI_API int                   TableGetRowIndex();                         // return current row index.
    // IMGUI_API const char*           TableGetColumnName(int column_n = -1);      // return "" if column didn't have a name declared by TableSetupColumn(). Pass -1 to use current column.
    // IMGUI_API ImGuiTableColumnFlags TableGetColumnFlags(int column_n = -1);     // return column flags so you can query their Enabled/Visible/Sorted/Hovered status flags. Pass -1 to use current column.
    // IMGUI_API void                  TableSetColumnEnabled(int column_n, bool v);// change user accessible enabled/disabled state of a column. Set to false to hide the column. User can use the context menu to change this themselves (right-click in headers, or right-click in columns body with ImGuiTableFlags_ContextMenuInBody)
    // IMGUI_API void                  TableSetBgColor(ImGuiTableBgTarget target, ImU32 color, int column_n = -1);  // change the color of a cell, row, or column. See ImGuiTableBgTarget_ flags for details.
    TableGetColumnCount(): number;
    TableGetColumnIndex(): number;
    TableGetRowIndex(): number;
    TableGetColumnName(column_n: number): string;
    TableGetColumnFlags(column_n: number): ImGuiTableColumnFlags;
    TableSetColumnEnabled(column_n: number, v: boolean): void;
    TableSetBgColor(target: ImGuiTableBgTarget, color: ImU32, column_n: number): void;

    // Legacy Columns API (2020: prefer using Tables!)
    // - You can also use SameLine(pos_x) to mimic simplified columns.
    // IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
    // IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
    // IMGUI_API int           GetColumnIndex();                                                   // get current column index
    // IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
    // IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
    // IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
    // IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
    // IMGUI_API int           GetColumnsCount();
    Columns(count: number, id: string | null, border: boolean): void;
    NextColumn(): void;
    GetColumnIndex(): number;
    GetColumnWidth(column_index: number): number;
    SetColumnWidth(column_index: number, width: number): void;
    GetColumnOffset(column_index: number): number;
    SetColumnOffset(column_index: number, offset_x: number): void;
    GetColumnsCount(): number;

    // Tab Bars, Tabs
    // IMGUI_API bool          BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0);        // create and append into a TabBar
    // IMGUI_API void          EndTabBar();                                                        // only call EndTabBar() if BeginTabBar() returns true!
    // IMGUI_API bool          BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0); // create a Tab. Returns true if the Tab is selected.
    // IMGUI_API void          EndTabItem();                                                       // only call EndTabItem() if BeginTabItem() returns true!
    // IMGUI_API bool          TabItemButton(const char* label, ImGuiTabItemFlags flags = 0);      // create a Tab behaving like a button. return true when clicked. cannot be selected in the tab bar.
    // IMGUI_API void          SetTabItemClosed(const char* tab_or_docked_window_label);           // notify TabBar or Docking system of a closed tab/window ahead (useful to reduce visual flicker on reorderable tab bars). For tab-bar: call after BeginTabBar() and before Tab submissions. Otherwise call with a window name.
    BeginTabBar(str_id: string, flags: ImGuiTabBarFlags): boolean;
    EndTabBar(): void;
    BeginTabItem(label: string, p_open: ImScalar<boolean> | null, flags: ImGuiTabBarFlags): boolean;
    EndTabItem(): void;
    TabItemButton(label: string, flags: ImGuiTabItemFlags): boolean;
    SetTabItemClosed(tab_or_docked_window_label: string): void;

    // Logging/Capture
    // - All text output from the interface can be captured into tty/file/clipboard. By default, tree nodes are automatically opened during logging.
    // IMGUI_API void          LogToTTY(int auto_open_depth = -1);                                 // start logging to tty (stdout)
    // IMGUI_API void          LogToFile(int auto_open_depth = -1, const char* filename = NULL);   // start logging to file
    // IMGUI_API void          LogToClipboard(int auto_open_depth = -1);                           // start logging to OS clipboard
    // IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
    // IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
    // IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
    LogToTTY(max_depth: number): void;
    LogToFile(max_depth: number, filename: string | null): void;
    LogToClipboard(max_depth: number): void;
    LogFinish(): void;
    LogButtons(): void;
    LogText(fmt: string): void;

    // Drag and Drop
    // - If you stop calling BeginDragDropSource() the payload is preserved however it won't have a preview tooltip (we currently display a fallback "..." tooltip as replacement)
    // IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0);                                      // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
    // IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t sz, ImGuiCond cond = 0);  // type is a user defined string of maximum 32 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
    // IMGUI_API void          EndDragDropSource();                                                                    // only call EndDragDropSource() if BeginDragDropSource() returns true!
    // IMGUI_API bool                  BeginDragDropTarget();                                                          // call after submitting an item that may receive a payload. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
    // IMGUI_API const ImGuiPayload*   AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);          // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
    // IMGUI_API void                  EndDragDropTarget();                                                            // only call EndDragDropTarget() if BeginDragDropTarget() returns true!
    // IMGUI_API const ImGuiPayload*   GetDragDropPayload();                                                           // peek directly into the current payload from anywhere. may return NULL. use ImGuiPayload::IsDataType() to test for the payload type.
    BeginDragDropSource(flags: ImGuiDragDropFlags): boolean;
    SetDragDropPayload(type: string, data: any, size: number, cond: ImGuiCond): boolean;
    EndDragDropSource(): void;
    BeginDragDropTarget(): boolean;
    AcceptDragDropPayload(type: string, flags: ImGuiDragDropFlags): boolean; // reference_DragDropPayload | null; // TODO
    EndDragDropTarget(): void;
    GetDragDropPayload(): null; // reference_DragDropPayload | null; // TODO

    // Disabling [BETA API]
    // - Disable all user interactions and dim items visuals (applying style.DisabledAlpha over current colors)
    // - Those can be nested but it cannot be used to enable an already disabled section (a single BeginDisabled(true) in the stack is enough to keep everything disabled)
    // - BeginDisabled(false) essentially does nothing useful but is provided to facilitate use of boolean expressions. If you can avoid calling BeginDisabled(False)/EndDisabled() best to avoid it.
    // IMGUI_API void          BeginDisabled(bool disabled = true);
    // IMGUI_API void          EndDisabled();
    BeginDisabled(disabled: boolean): void;
    EndDisabled(): void;

    // Clipping
    // - Mouse hovering is affected by ImGui::PushClipRect() calls, unlike direct calls to ImDrawList::PushClipRect() which are render only.
    // IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
    // IMGUI_API void          PopClipRect();
    PushClipRect(clip_rect_min: Readonly<interface_ImVec2>, clip_rect_max: Readonly<interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
    PopClipRect(): void;

    // Focus, Activation
    // - Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHereY()" when applicable to signify "this is the default item"
    // IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window.
    // IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
    SetItemDefaultFocus(): void;
    SetKeyboardFocusHere(offset: number): void;

    // Item/Widgets Utilities
    // - Most of the functions are referring to the last/previous item we submitted.
    // - See Demo Window under "Widgets->Querying Status" for an interactive visualization of most of those functions.
    // IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
    // IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited. This will continuously return true while holding mouse button on an item. Items that don't interact will always return false)
    // IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
    // IMGUI_API bool          IsItemClicked(ImGuiMouseButton mouse_button = 0);                   // is the last item clicked? (e.g. button/node just clicked on) == IsMouseClicked(mouse_button) && IsItemHovered()
    // IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (items may be out of sight because of clipping/scrolling)
    // IMGUI_API bool          IsItemEdited();                                                     // did the last item modify its underlying value this frame? or was pressed? This is generally the same as the "bool" return value of many widgets.
    // IMGUI_API bool          IsItemActivated();                                                  // was the last item just made active (item was previously inactive).
    // IMGUI_API bool          IsItemDeactivated();                                                // was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.
    // IMGUI_API bool          IsItemDeactivatedAfterEdit();                                       // was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).
    // IMGUI_API bool          IsItemToggledOpen();                                                // was the last item open state toggled? set by TreeNode().
    // IMGUI_API bool          IsAnyItemHovered();                                                 // is any item hovered?
    // IMGUI_API bool          IsAnyItemActive();                                                  // is any item active?
    // IMGUI_API bool          IsAnyItemFocused();                                                 // is any item focused?
    // IMGUI_API ImVec2        GetItemRectMin();                                                   // get upper-left bounding rectangle of the last item (screen space)
    // IMGUI_API ImVec2        GetItemRectMax();                                                   // get lower-right bounding rectangle of the last item (screen space)
    // IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item
    // IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
    IsItemHovered(flags: ImGuiHoveredFlags): boolean;
    IsItemActive(): boolean;
    IsItemFocused(): boolean;
    IsItemClicked(mouse_button: ImGuiMouseButton): boolean;
    IsItemVisible(): boolean;
    IsItemEdited(): boolean;
    IsItemActivated(): boolean;
    IsItemDeactivated(): boolean;
    IsItemDeactivatedAfterEdit(): boolean;
    IsItemToggledOpen(): boolean;
    IsAnyItemHovered(): boolean;
    IsAnyItemActive(): boolean;
    IsAnyItemFocused(): boolean;
    GetItemRectMin(out: interface_ImVec2): typeof out;
    GetItemRectMax(out: interface_ImVec2): typeof out;
    GetItemRectSize(out: interface_ImVec2): typeof out;
    SetItemAllowOverlap(): void;


    // Viewports
    // - Currently represents the Platform Window created by the application which is hosting our Dear ImGui windows.
    // - In 'docking' branch with multi-viewport enabled, we extend this concept to have multiple active viewports.
    // - In the future we will extend this concept further to also represent Platform Monitor and support a "no main platform window" operation mode.
    // IMGUI_API ImGuiViewport* GetMainViewport();                                                 // return primary/default viewport. This can never be NULL.
    GetMainViewport(): reference_ImGuiViewport;

    // Miscellaneous Utilities
    // IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
    // IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
    // IMGUI_API double        GetTime();                                                          // get global imgui time. incremented by io.DeltaTime every frame.
    // IMGUI_API int           GetFrameCount();                                                    // get global imgui frame count. incremented by 1 every frame.
    // IMGUI_API ImDrawList*   GetBackgroundDrawList();                                            // this draw list will be the first rendering one. Useful to quickly draw shapes/text behind dear imgui contents.
    // IMGUI_API ImDrawList*   GetForegroundDrawList();                                            // this draw list will be the last rendered one. Useful to quickly draw shapes/text over dear imgui contents.
    // IMGUI_API ImDrawListSharedData* GetDrawListSharedData();                                    // you may use this when creating your own ImDrawList instances.
    // IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);                                    // get a string corresponding to the enum value (for display, saving, etc.).
    // IMGUI_API void          SetStateStorage(ImGuiStorage* storage);                             // replace current window storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
    // IMGUI_API ImGuiStorage* GetStateStorage();
    // IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
    // IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags flags = 0); // helper to create a child window / scrolling region that looks like a normal widget frame
    // IMGUI_API void          EndChildFrame();                                                    // always call EndChildFrame() regardless of BeginChildFrame() return values (which indicates a collapsed/clipped window)
    IsRectVisible_A(size: Readonly<interface_ImVec2>): boolean;
    IsRectVisible_B(rect_min: Readonly<interface_ImVec2>, rect_max: Readonly<interface_ImVec2>): boolean;
    GetTime(): number;
    GetFrameCount(): number;
    GetBackgroundDrawList(): reference_ImDrawList;
    GetForegroundDrawList(): reference_ImDrawList;
    GetDrawListSharedData(): reference_ImDrawListSharedData;
    // function SetStateStorage(tree: ImGuiStorage | null): void;
    // function GetStateStorage(): ImGuiStorage | null;
    GetStyleColorName(idx: ImGuiCol): string;
    // CalcListClipping(items_count: number, items_height: number, out_items_display_start: ImScalar<number>, out_items_display_end: ImScalar<number>): void;
    BeginChildFrame(id: ImGuiID, size: Readonly<interface_ImVec2>, flags: ImGuiWindowFlags): boolean;
    EndChildFrame(): void;

    // Text Utilities
    // IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
    CalcTextSize(text: string, hide_text_after_double_hash: boolean, wrap_width: number, out: interface_ImVec2): typeof out;

    // Color Utilities
    // IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
    // IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
    // IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
    // IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
    ColorConvertU32ToFloat4(in_: ImU32, out: interface_ImVec4): typeof out;
    ColorConvertFloat4ToU32(in_: Readonly<interface_ImVec4>): ImU32;
    ColorConvertRGBtoHSV(r: number, g: number, b: number, out_h: ImScalar<number>, out_s: ImScalar<number>, out_v: ImScalar<number>): void;
    ColorConvertHSVtoRGB(h: number, s: number, v: number, out_r: ImScalar<number>, out_g: ImScalar<number>, out_b: ImScalar<number>): void;

    // Inputs Utilities: Keyboard
    // - For 'int user_key_index' you can use your own indices/enums according to how your backend/engine stored them in io.KeysDown[].
    // - We don't know the meaning of those value. You can use GetKeyIndex() to map a ImGuiKey_ value into the user index.
    // IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
    // IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index].
    // IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down)? if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
    // IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)?
    // IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
    // IMGUI_API void          CaptureKeyboardFromApp(bool want_capture_keyboard_value = true);    // attention: misleading name! manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application to handle). e.g. force capture keyboard when your widget is being hovered. This is equivalent to setting "io.WantCaptureKeyboard = want_capture_keyboard_value"; after the next NewFrame() call.
    GetKeyIndex(imgui_key: ImGuiKey): number;
    IsKeyDown(user_key_index: number): boolean;
    IsKeyPressed(user_key_index: number, repeat: boolean): boolean;
    IsKeyReleased(user_key_index: number): boolean;
    GetKeyPressedAmount(key_index: number, repeat_delay: number, rate: number): number;
    CaptureKeyboardFromApp(capture: boolean): void;

    // Inputs Utilities: Mouse
    // - To refer to a mouse button, you may use named enums in your code e.g. ImGuiMouseButton_Left, ImGuiMouseButton_Right.
    // - You can also use regular integer: it is forever guaranteed that 0=Left, 1=Right, 2=Middle.
    // - Dragging operations are only reported after mouse has moved a certain distance away from the initial clicking position (see 'lock_threshold' and 'io.MouseDraggingThreshold')
    // IMGUI_API bool          IsMouseDown(ImGuiMouseButton button);                               // is mouse button held?
    // IMGUI_API bool          IsMouseClicked(ImGuiMouseButton button, bool repeat = false);       // did mouse button clicked? (went from !Down to Down)
    // IMGUI_API bool          IsMouseReleased(ImGuiMouseButton button);                           // did mouse button released? (went from Down to !Down)
    // IMGUI_API bool          IsMouseDoubleClicked(ImGuiMouseButton button);                      // did mouse button double-clicked? (note that a double-click will also report IsMouseClicked() == true)
    // IMGUI_API int           GetMouseClickedCount(ImGuiMouseButton button);                      // return the number of successive mouse-clicks at the time where a click happen (otherwise 0).
    // IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);// is mouse hovering given bounding rect (in screen space). clipped by current clipping settings, but disregarding of other consideration of focus/window ordering/popup-block.
    // IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    // by convention we use (-FLT_MAX,-FLT_MAX) to denote that there is no mouse available
    // IMGUI_API bool          IsAnyMouseDown();                                                   // is any mouse button held?
    // IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
    // IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve mouse position at the time of opening popup we have BeginPopup() into (helper to avoid user backing that value themselves)
    // IMGUI_API bool          IsMouseDragging(ImGuiMouseButton button, float lock_threshold = -1.0f);         // is mouse dragging? (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)
    // IMGUI_API ImVec2        GetMouseDragDelta(ImGuiMouseButton button = 0, float lock_threshold = -1.0f);   // return the delta from the initial clicking position while the mouse button is pressed or was just released. This is locked and return 0.0f until the mouse moves past a distance threshold at least once (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)
    // IMGUI_API void          ResetMouseDragDelta(ImGuiMouseButton button = 0);                   //
    // IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
    // IMGUI_API void          SetMouseCursor(ImGuiMouseCursor cursor_type);                       // set desired cursor type
    // IMGUI_API void          CaptureMouseFromApp(bool want_capture_mouse_value = true);          // attention: misleading name! manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application to handle). This is equivalent to setting "io.WantCaptureMouse = want_capture_mouse_value;" after the next NewFrame() call.
    IsMouseDown(button: ImGuiMouseButton): boolean;
    IsMouseClicked(button: ImGuiMouseButton, repeat: boolean): boolean;
    IsMouseReleased(button: ImGuiMouseButton): boolean;
    IsMouseDoubleClicked(button: ImGuiMouseButton): boolean;
    GetMouseClickedCount(button: ImGuiMouseButton): number;
    IsMouseHoveringRect(r_min: Readonly<interface_ImVec2>, r_max: Readonly<interface_ImVec2>, clip: boolean): boolean;
    IsMousePosValid(mouse_pos: Readonly<interface_ImVec2> | null): boolean;
    IsAnyMouseDown(): boolean;
    GetMousePos(out: interface_ImVec2): typeof out;
    GetMousePosOnOpeningCurrentPopup(out: interface_ImVec2): typeof out;
    IsMouseDragging(button: ImGuiMouseButton, lock_threshold: number): boolean;
    GetMouseDragDelta(button: ImGuiMouseButton, lock_threshold: number, out: interface_ImVec2): typeof out;
    ResetMouseDragDelta(button: ImGuiMouseButton): void;
    GetMouseCursor(): ImGuiMouseCursor;
    SetMouseCursor(type: ImGuiMouseCursor): void;
    CaptureMouseFromApp(capture: boolean): void;

    // Clipboard Utilities
    // - Also see the LogToClipboard() function to capture GUI into clipboard, or easily output text data to the clipboard.
    // IMGUI_API const char*   GetClipboardText();
    // IMGUI_API void          SetClipboardText(const char* text);
    GetClipboardText(): string;
    SetClipboardText(text: string): void;

    // Settings/.Ini Utilities
    // - The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
    // - Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.
    // IMGUI_API void          LoadIniSettingsFromDisk(const char* ini_filename);                  // call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).
    // IMGUI_API void          LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0); // call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.
    // IMGUI_API void          SaveIniSettingsToDisk(const char* ini_filename);                    // this is automatically called (if io.IniFilename is not empty) a few seconds after any modification that should be reflected in the .ini file (and also by DestroyContext).
    // IMGUI_API const char*   SaveIniSettingsToMemory(size_t* out_ini_size = NULL);               // return a zero-terminated string with the .ini data which you can save by your own mean. call when io.WantSaveIniSettings is set, then save data by your own mean and clear io.WantSaveIniSettings.
    LoadIniSettingsFromMemory(ini_data: string/*, ini_size: number*/): void;
    SaveIniSettingsToMemory(/*out_ini_size: ImScalar<number> | null*/): string;

    // Debug Utilities
    // IMGUI_API bool          DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert, size_t sz_drawidx); // This is called by IMGUI_CHECKVERSION() macro.
    DebugCheckVersionAndDataLayout(version_str: string, sz_io: number, sz_style: number, sz_vec2: number, sz_vec4: number, sz_draw_vert: number, sz_draw_idx: number): boolean;

    // Memory Allocators
    // - All those functions are not reliant on the current context.
    // - If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again because we use global storage for those.
    // IMGUI_API void          SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void (*free_func)(void* ptr, void* user_data), void* user_data = NULL);
    // IMGUI_API void*         MemAlloc(size_t size);
    // IMGUI_API void          MemFree(void* ptr);
    SetAllocatorFunctions(alloc_func: (sz: number, user_data: any) => number, free_func: (ptr: number, user_data: any) => void, user_data: any): void;
    MemAlloc(sz: number): any;
    MemFree(ptr: any): void;
}
