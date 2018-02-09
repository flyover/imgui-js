import * as emscripten from "./emscripten";
export * from "./emscripten";

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

export function mallinfo(): mallinfo;

export const IMGUI_VERSION: string;

export const ImDrawVertSize: number;
export const ImDrawIdxSize: number;
export const ImDrawVertPosOffset: number;
export const ImDrawVertUVOffset: number;
export const ImDrawVertColOffset: number;

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
export type ImTextureID = any;

// Flags for ImGui::Begin()
export const enum ImGuiWindowFlags {
    NoTitleBar             = 1 << 0,   // Disable title-bar
    NoResize               = 1 << 1,   // Disable user resizing with the lower-right grip
    NoMove                 = 1 << 2,   // Disable user moving the window
    NoScrollbar            = 1 << 3,   // Disable scrollbars (window can still scroll with mouse or programatically)
    NoScrollWithMouse      = 1 << 4,   // Disable user vertically scrolling with mouse wheel. On child window, mouse wheel will be forwarded to the parent unless NoScrollbar is also set.
    NoCollapse             = 1 << 5,   // Disable user collapsing window by double-clicking on it
    AlwaysAutoResize       = 1 << 6,   // Resize every window to its content every frame
    //ShowBorders          = 1 << 7,   // Show borders around windows and items (OBSOLETE! Use e.g. style.FrameBorderSize=1.0f to enable borders).
    NoSavedSettings        = 1 << 8,   // Never load/save settings in .ini file
    NoInputs               = 1 << 9,   // Disable catching mouse or keyboard inputs, hovering test with pass through.
    MenuBar                = 1 << 10,  // Has a menu-bar
    HorizontalScrollbar    = 1 << 11,  // Allow horizontal scrollbar to appear (off by default). You may use SetNextWindowContentSize(ImVec2(width,0.0f)); prior to calling Begin() to specify width. Read code in imgui_demo in the "Horizontal Scrolling" section.
    NoFocusOnAppearing     = 1 << 12,  // Disable taking focus when transitioning from hidden to visible state
    NoBringToFrontOnFocus  = 1 << 13,  // Disable bringing window to front when taking focus (e.g. clicking on it or programatically giving it focus)
    AlwaysVerticalScrollbar= 1 << 14,  // Always show vertical scrollbar (even if ContentSize.y < Size.y)
    AlwaysHorizontalScrollbar=1<< 15,  // Always show horizontal scrollbar (even if ContentSize.x < Size.x)
    AlwaysUseWindowPadding = 1 << 16,  // Ensure child windows without border uses style.WindowPadding (ignored by default for non-bordered child windows, because more convenient)
    ResizeFromAnySide      = 1 << 17,  // (WIP) Enable resize from any corners and borders. Your back-end needs to honor the different values of io.MouseCursor set by imgui.

    // [Internal]
    ChildWindow            = 1 << 24,  // Don't use! For internal use by BeginChild()
    Tooltip                = 1 << 25,  // Don't use! For internal use by BeginTooltip()
    Popup                  = 1 << 26,  // Don't use! For internal use by BeginPopup()
    Modal                  = 1 << 27,  // Don't use! For internal use by BeginPopupModal()
    ChildMenu              = 1 << 28   // Don't use! For internal use by BeginMenu()
}

// Flags for ImGui::InputText()
export const enum ImGuiInputTextFlags {
    CharsDecimal        = 1 << 0,   // Allow 0123456789.+-*/
    CharsHexadecimal    = 1 << 1,   // Allow 0123456789ABCDEFabcdef
    CharsUppercase      = 1 << 2,   // Turn a..z into A..Z
    CharsNoBlank        = 1 << 3,   // Filter out spaces, tabs
    AutoSelectAll       = 1 << 4,   // Select entire text when first taking mouse focus
    EnterReturnsTrue    = 1 << 5,   // Return 'true' when Enter is pressed (as opposed to when the value was modified)
    CallbackCompletion  = 1 << 6,   // Call user function on pressing TAB (for completion handling)
    CallbackHistory     = 1 << 7,   // Call user function on pressing Up/Down arrows (for history handling)
    CallbackAlways      = 1 << 8,   // Call user function every time. User code may query cursor position, modify text buffer.
    CallbackCharFilter  = 1 << 9,   // Call user function to filter character. Modify data->EventChar to replace/filter input, or return 1 to discard character.
    AllowTabInput       = 1 << 10,  // Pressing TAB input a '\t' character into the text field
    CtrlEnterForNewLine = 1 << 11,  // In multi-line mode, unfocus with Enter, add new line with Ctrl+Enter (default is opposite: unfocus with Ctrl+Enter, add line with Enter).
    NoHorizontalScroll  = 1 << 12,  // Disable following the cursor horizontally
    AlwaysInsertMode    = 1 << 13,  // Insert mode
    ReadOnly            = 1 << 14,  // Read-only mode
    Password            = 1 << 15,  // Password mode, display all characters as '*'
    NoUndoRedo          = 1 << 16,  // Disable undo/redo. Note that input text owns the text data while active, if you want to provide your own undo/redo stack you need e.g. to call ClearActiveID().
    // [Internal]
    Multiline           = 1 << 20   // For internal use by InputTextMultiline()
}

// Flags for ImGui::TreeNodeEx(), ImGui::CollapsingHeader*()
export const enum ImGuiTreeNodeFlags {
    Selected             = 1 << 0,   // Draw as selected
    Framed               = 1 << 1,   // Full colored frame (e.g. for CollapsingHeader)
    AllowItemOverlap     = 1 << 2,   // Hit testing to allow subsequent widgets to overlap this one
    NoTreePushOnOpen     = 1 << 3,   // Don't do a TreePush() when open (e.g. for CollapsingHeader) = no extra indent nor pushing on ID stack
    NoAutoOpenOnLog      = 1 << 4,   // Don't automatically and temporarily open node when Logging is active (by default logging will automatically open tree nodes)
    DefaultOpen          = 1 << 5,   // Default node to be open
    OpenOnDoubleClick    = 1 << 6,   // Need double-click to open node
    OpenOnArrow          = 1 << 7,   // Only open when clicking on the arrow part. If OpenOnDoubleClick is also set, single-click arrow or double-click all box to open.
    Leaf                 = 1 << 8,   // No collapsing, no arrow (use as a convenience for leaf nodes). 
    Bullet               = 1 << 9,   // Display a bullet instead of arrow
    FramePadding         = 1 << 10,  // Use FramePadding (even for an unframed text node) to vertically align text baseline to regular widget height. Equivalent to calling AlignTextToFramePadding().
    //SpanAllAvailWidth  = 1 << 11,  // FIXME: TODO: Extend hit box horizontally even if not framed
    //NoScrollOnOpen     = 1 << 12,  // FIXME: TODO: Disable automatic scroll on TreePop() if node got just open and contents is not visible
    CollapsingHeader     = Framed | NoAutoOpenOnLog
}

// Flags for ImGui::Selectable()
export const enum ImGuiSelectableFlags {
    DontClosePopups    = 1 << 0,   // Clicking this don't close parent popup window
    SpanAllColumns     = 1 << 1,   // Selectable frame can span all columns (text will still fit in current column)
    AllowDoubleClick   = 1 << 2    // Generate press events on double clicks too
}

// Flags for ImGui::BeginCombo()
export const enum ImGuiComboFlags {
    PopupAlignLeft          = 1 << 0,   // Align the popup toward the left by default
    HeightSmall             = 1 << 1,   // Max ~4 items visible. Tip: If you want your combo popup to be a specific size you can use SetNextWindowSizeConstraints() prior to calling BeginCombo()
    HeightRegular           = 1 << 2,   // Max ~8 items visible (default)
    HeightLarge             = 1 << 3,   // Max ~20 items visible
    HeightLargest           = 1 << 4,   // As many fitting items as possible
    HeightMask_             = HeightSmall | HeightRegular | HeightLarge | HeightLargest
}

// Flags for ImGui::IsWindowFocused()
export const enum ImGuiFocusedFlags {
    ChildWindows                  = 1 << 0,   // IsWindowFocused(): Return true if any children of the window is focused
    RootWindow                    = 1 << 1,   // IsWindowFocused(): Test from root window (top most parent of the current hierarchy)
    RootAndChildWindows           = RootWindow | ChildWindows
}

// Flags for ImGui::IsItemHovered(), ImGui::IsWindowHovered()
export const enum ImGuiHoveredFlags {
    Default                       = 0,        // Return true if directly over the item/window, not obstructed by another window, not obstructed by an active popup or modal blocking inputs under them.
    ChildWindows                  = 1 << 0,   // IsWindowHovered() only: Return true if any children of the window is hovered
    RootWindow                    = 1 << 1,   // IsWindowHovered() only: Test from root window (top most parent of the current hierarchy)
    AllowWhenBlockedByPopup       = 1 << 2,   // Return true even if a popup window is normally blocking access to this item/window
    //AllowWhenBlockedByModal     = 1 << 3,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
    AllowWhenBlockedByActiveItem  = 1 << 4,   // Return true even if an active item is blocking access to this item/window. Useful for Drag and Drop patterns.
    AllowWhenOverlapped           = 1 << 5,   // Return true even if the position is overlapped by another window
    RectOnly                      = AllowWhenBlockedByPopup | AllowWhenBlockedByActiveItem | AllowWhenOverlapped,
    RootAndChildWindows           = RootWindow | ChildWindows
}

// Flags for ImGui::BeginDragDropSource(), ImGui::AcceptDragDropPayload()
export const enum ImGuiDragDropFlags {
    // BeginDragDropSource() flags
    SourceNoPreviewTooltip       = 1 << 0,       // By default, a successful call to BeginDragDropSource opens a tooltip so you can display a preview or description of the source contents. This flag disable this behavior.
    SourceNoDisableHover         = 1 << 1,       // By default, when dragging we clear data so that IsItemHovered() will return true, to avoid subsequent user code submitting tooltips. This flag disable this behavior so you can still call IsItemHovered() on the source item.
    SourceNoHoldToOpenOthers     = 1 << 2,       // Disable the behavior that allows to open tree nodes and collapsing header by holding over them while dragging a source item.
    SourceAllowNullID            = 1 << 3,       // Allow items such as Text(), Image() that have no unique identifier to be used as drag source, by manufacturing a temporary identifier based on their window-relative position. This is extremely unusual within the dear imgui ecosystem and so we made it explicit.
    SourceExtern                 = 1 << 4,       // External source (from outside of imgui), won't attempt to read current item/window info. Will always return true. Only one Extern source can be active simultaneously.
    // AcceptDragDropPayload() flags
    AcceptBeforeDelivery         = 1 << 10,      // AcceptDragDropPayload() will returns true even before the mouse button is released. You can then call IsDelivery() to test if the payload needs to be delivered.
    AcceptNoDrawDefaultRect      = 1 << 11,      // Do not draw the default highlight rectangle when hovering over target.
    AcceptPeekOnly               = AcceptBeforeDelivery | AcceptNoDrawDefaultRect  // For peeking ahead and inspecting the payload before delivery.
}

// Standard Drag and Drop payload types. You can define you own payload types using 8-characters long strings. Types starting with '_' are defined by Dear ImGui.
export const IMGUI_PAYLOAD_TYPE_COLOR_3F: string; // = "_COL3F";    // float[3]     // Standard type for colors, without alpha. User code may use this type. 
export const IMGUI_PAYLOAD_TYPE_COLOR_4F: string; // = "_COL4F";    // float[4]     // Standard type for colors. User code may use this type.

// User fill ImGuiIO.KeyMap[] array with indices into the ImGuiIO.KeysDown[512] array
export const enum ImGuiKey {
    Tab,       // for tabbing through fields
    LeftArrow, // for text edit
    RightArrow,// for text edit
    UpArrow,   // for text edit
    DownArrow, // for text edit
    PageUp,
    PageDown,
    Home,      // for text edit
    End,       // for text edit
    Delete,    // for text edit
    Backspace, // for text edit
    Enter,     // for text edit
    Escape,    // for text edit
    A,         // for text edit CTRL+A: select all
    C,         // for text edit CTRL+C: copy
    V,         // for text edit CTRL+V: paste
    X,         // for text edit CTRL+X: cut
    Y,         // for text edit CTRL+Y: redo
    Z,         // for text edit CTRL+Z: undo
    COUNT
}

// Enumeration for PushStyleColor() / PopStyleColor()
export const enum ImGuiCol {
    Text,
    TextDisabled,
    WindowBg,              // Background of normal windows
    ChildBg,               // Background of child windows
    PopupBg,               // Background of popups, menus, tooltips windows
    Border,
    BorderShadow,
    FrameBg,               // Background of checkbox, radio button, plot, slider, text input
    FrameBgHovered,
    FrameBgActive,
    TitleBg,
    TitleBgActive,
    TitleBgCollapsed,
    MenuBarBg,
    ScrollbarBg,
    ScrollbarGrab,
    ScrollbarGrabHovered,
    ScrollbarGrabActive,
    CheckMark,
    SliderGrab,
    SliderGrabActive,
    Button,
    ButtonHovered,
    ButtonActive,
    Header,
    HeaderHovered,
    HeaderActive,
    Separator,
    SeparatorHovered,
    SeparatorActive,
    ResizeGrip,
    ResizeGripHovered,
    ResizeGripActive,
    CloseButton,
    CloseButtonHovered,
    CloseButtonActive,
    PlotLines,
    PlotLinesHovered,
    PlotHistogram,
    PlotHistogramHovered,
    TextSelectedBg,
    ModalWindowDarkening,  // darken entire screen when a modal window is active
    DragDropTarget,
    COUNT
}

// Enumeration for PushStyleVar() / PopStyleVar() to temporarily modify the ImGuiStyle structure.
// NB: the enum only refers to fields of ImGuiStyle which makes sense to be pushed/popped inside UI code. During initialization, feel free to just poke into ImGuiStyle directly.
// NB: if changing this enum, you need to update the associated internal table GStyleVarInfo[] accordingly. This is where we link enum values to members offset/type.
export const enum ImGuiStyleVar {
    // Enum name ......................// Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
    Alpha,               // float     Alpha
    WindowPadding,       // ImVec2    WindowPadding
    WindowRounding,      // float     WindowRounding
    WindowBorderSize,    // float     WindowBorderSize
    WindowMinSize,       // ImVec2    WindowMinSize
    ChildRounding,       // float     ChildRounding
    ChildBorderSize,     // float     ChildBorderSize
    PopupRounding,       // float     PopupRounding
    PopupBorderSize,     // float     PopupBorderSize
    FramePadding,        // ImVec2    FramePadding
    FrameRounding,       // float     FrameRounding
    FrameBorderSize,     // float     FrameBorderSize
    ItemSpacing,         // ImVec2    ItemSpacing
    ItemInnerSpacing,    // ImVec2    ItemInnerSpacing
    IndentSpacing,       // float     IndentSpacing
    GrabMinSize,         // float     GrabMinSize
    ButtonTextAlign,     // ImVec2    ButtonTextAlign
    Count_, COUNT = Count_
}

// Enumeration for ColorEdit3() / ColorEdit4() / ColorPicker3() / ColorPicker4() / ColorButton()
export const enum ImGuiColorEditFlags {
    NoAlpha         = 1 << 1,   //              // ColorEdit, ColorPicker, ColorButton: ignore Alpha component (read 3 components from the input pointer).
    NoPicker        = 1 << 2,   //              // ColorEdit: disable picker when clicking on colored square.
    NoOptions       = 1 << 3,   //              // ColorEdit: disable toggling options menu when right-clicking on inputs/small preview.
    NoSmallPreview  = 1 << 4,   //              // ColorEdit, ColorPicker: disable colored square preview next to the inputs. (e.g. to show only the inputs)
    NoInputs        = 1 << 5,   //              // ColorEdit, ColorPicker: disable inputs sliders/text widgets (e.g. to show only the small preview colored square).
    NoTooltip       = 1 << 6,   //              // ColorEdit, ColorPicker, ColorButton: disable tooltip when hovering the preview.
    NoLabel         = 1 << 7,   //              // ColorEdit, ColorPicker: disable display of inline text label (the label is still forwarded to the tooltip and picker).
    NoSidePreview   = 1 << 8,   //              // ColorPicker: disable bigger color preview on right side of the picker, use small colored square preview instead.
    // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
    AlphaBar        = 1 << 9,   //              // ColorEdit, ColorPicker: show vertical alpha bar/gradient in picker.
    AlphaPreview    = 1 << 10,  //              // ColorEdit, ColorPicker, ColorButton: display preview as a transparent color over a checkerboard, instead of opaque.
    AlphaPreviewHalf= 1 << 11,  //              // ColorEdit, ColorPicker, ColorButton: display half opaque / half checkerboard, instead of opaque.
    HDR             = 1 << 12,  //              // (WIP) ColorEdit: Currently only disable 0.0f..1.0f limits in RGBA edition (note: you probably want to use Float flag as well).
    RGB             = 1 << 13,  // [Inputs]     // ColorEdit: choose one among RGB/HSV/HEX. ColorPicker: choose any combination using RGB/HSV/HEX.
    HSV             = 1 << 14,  // [Inputs]     // "
    HEX             = 1 << 15,  // [Inputs]     // "
    Uint8           = 1 << 16,  // [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0..255. 
    Float           = 1 << 17,  // [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0.0f..1.0f floats instead of 0..255 integers. No round-trip of value via integers.
    PickerHueBar    = 1 << 18,  // [PickerMode] // ColorPicker: bar for Hue, rectangle for Sat/Value.
    PickerHueWheel  = 1 << 19,  // [PickerMode] // ColorPicker: wheel for Hue, triangle for Sat/Value.
    // Internals/Masks
    _InputsMask     = RGB|HSV|HEX,
    _DataTypeMask   = Uint8|Float,
    _PickerMask     = PickerHueWheel|PickerHueBar,
    _OptionsDefault = Uint8|RGB|PickerHueBar    // Change application default using SetColorEditOptions()
}

// Enumeration for GetMouseCursor()
export const enum ImGuiMouseCursor {
    None = -1,
    Arrow = 0,
    TextInput,         // When hovering over InputText, etc.
    Move,              // Unused
    ResizeNS,          // When hovering over an horizontal border
    ResizeEW,          // When hovering over a vertical border or a column
    ResizeNESW,        // When hovering over the bottom-left corner of a window
    ResizeNWSE,        // When hovering over the bottom-right corner of a window
    Count_, COUNT = Count_
}

// Condition for ImGui::SetWindow***(), SetNextWindow***(), SetNextTreeNode***() functions
// All those functions treat 0 as a shortcut to Always. From the point of view of the user use this as an enum (don't combine multiple values into flags).
export const enum ImGuiCond {
    Always        = 1 << 0,   // Set the variable
    Once          = 1 << 1,   // Set the variable once per runtime session (only the first call with succeed)
    FirstUseEver  = 1 << 2,   // Set the variable if the window has no saved data (if doesn't exist in the .ini file)
    Appearing     = 1 << 3    // Set the variable if the window is appearing after being hidden/inactive (or the first time)
}

export const enum ImDrawCornerFlags
{
    TopLeft   = 1 << 0, // 0x1
    TopRight  = 1 << 1, // 0x2
    BotLeft   = 1 << 2, // 0x4
    BotRight  = 1 << 3, // 0x8
    Top       = TopLeft | TopRight,   // 0x3
    Bot       = BotLeft | BotRight,   // 0xC
    Left      = TopLeft | BotLeft,    // 0x5
    Right     = TopRight | BotRight,  // 0xA
    All       = 0xF     // In your function calls you may use ~0 (= all bits sets) instead of All, as a convenience
}

export const enum ImDrawListFlags
{
    AntiAliasedLines = 1 << 0,
    AntiAliasedFill  = 1 << 1
}

export type ImGuiContext = any;

export interface interface_ImVec2 {
    x: number;
    y: number;
    Copy(other: Readonly<interface_ImVec2>): this;
    Equals(other: Readonly<interface_ImVec2>): boolean;
}

export class reference_ImVec2 extends emscripten.EmscriptenClassReference implements interface_ImVec2 {
    public x: number;
    public y: number;
    public Copy(other: Readonly<interface_ImVec2>): this;
    public Equals(other: Readonly<interface_ImVec2>): boolean;
}

// export class ImVec2 extends NativeClass implements interface_ImVec2 {
//     public x: number;
//     public y: number;
//     public constructor();
//     public constructor(x: number, y: number);
//     public Copy(other: Readonly<interface_ImVec2>): this;
//     public Equals(other: Readonly<interface_ImVec2>): boolean;
// }

export interface interface_ImVec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    Copy(other: Readonly<interface_ImVec4>): this;
    Equals(other: Readonly<interface_ImVec4>): boolean;
}

export class reference_ImVec4 extends emscripten.EmscriptenClassReference implements interface_ImVec4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;
    public Copy(other: Readonly<interface_ImVec4>): this;
    public Equals(other: Readonly<interface_ImVec4>): boolean;
}

// export class ImVec4 extends NativeClass implements interface_ImVec4 {
//     public x: number;
//     public y: number;
//     public z: number;
//     public w: number;
//     public constructor();
//     public constructor(x: number, y: number, z: number, w: number);
//     public Copy(other: Readonly<interface_ImVec4>): this;
//     public Equals(other: Readonly<interface_ImVec4>): boolean;
// }

// export class ImColor extends NativeClass {
//     public Value: ImVec4;
// }

export type ImGuiTextEditCallback = (data: ImGuiTextEditCallbackData) => number;

// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
export class ImGuiTextEditCallbackData extends emscripten.EmscriptenClass {
    // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
    public EventFlag: ImGuiInputTextFlags;
    // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    public Flags: ImGuiInputTextFlags;
    // void*               UserData;       // What user passed to InputText()      // Read-only
    public UserData: any;
    // bool                ReadOnly;       // Read-only mode                       // Read-only
    public ReadOnly: boolean;

    // CharFilter event:
    // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
    public EventChar: ImWchar;

    // Completion,History,Always events:
    // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
    // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
    public EventKey: ImGuiKey;
    // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
    public getBuf(): string;
    public setBuf(value: string): void;
    // int                 BufTextLen;     // Current text length in bytes         // Read-write
    public BufTextLen: number;
    // int                 BufSize;        // Maximum text length in bytes         // Read-only
    public BufSize: number;
    // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
    public BufDirty: boolean;
    // int                 CursorPos;      //                                      // Read-write
    public CursorPos: number;
    // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
    public SelectionStart: number;
    // int                 SelectionEnd;   //                                      // Read-write
    public SelectionEnd: number;

    // NB: Helper functions for text manipulation. Calling those function loses selection.
    // IMGUI_API void    DeleteChars(int pos, int bytes_count);
    public DeleteChars(pos: number, bytes_count: number): void;
    // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
    public InsertChars(pos: number, text: string, text_end: number | null): void;
    // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
    public HasSelection(): boolean;
}

export type ImGuiSizeConstraintCallback = (data: ImGuiSizeConstraintCallbackData) => void;

// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
export class ImGuiSizeConstraintCallbackData extends emscripten.EmscriptenClass
{
    // void*   UserData;       // Read-only.   What user passed to SetNextWindowSizeConstraints()
    public UserData: any;
    // ImVec2  Pos;            // Read-only.   Window position, for reference.
    public getPos(): Readonly<reference_ImVec2>;
    // ImVec2  CurrentSize;    // Read-only.   Current window size.
    public getCurrentSize(): Readonly<reference_ImVec2>;
    // ImVec2  DesiredSize;    // Read-write.  Desired size, based on user's mouse position. Write to this field to restrain resizing.
    public getDesiredSize(): reference_ImVec2;
}

export class ImGuiListClipper extends emscripten.EmscriptenClass {
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

export interface interface_ImGuiStyle {
    // float       Alpha;                      // Global alpha applies to everything in ImGui
    Alpha: number;
    // ImVec2      WindowPadding;              // Padding within a window
    getWindowPadding(): interface_ImVec2;
    // float       WindowRounding;             // Radius of window corners rounding. Set to 0.0f to have rectangular windows
    WindowRounding: number;
    // float       WindowBorderSize;           // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    WindowBorderSize: number;
    // ImVec2      WindowMinSize;              // Minimum window size
    getWindowMinSize(): interface_ImVec2;
    // ImVec2      WindowTitleAlign;           // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
    getWindowTitleAlign(): interface_ImVec2;
    // float       ChildRounding;              // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
    ChildRounding: number;
    // float       ChildBorderSize;            // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    ChildBorderSize: number;
    // float       PopupRounding;              // Radius of popup window corners rounding.
    PopupRounding: number;
    // float       PopupBorderSize;            // Thickness of border around popup windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    PopupBorderSize: number;
    // ImVec2      FramePadding;               // Padding within a framed rectangle (used by most widgets)
    getFramePadding(): interface_ImVec2;
    // float       FrameRounding;              // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
    FrameRounding: number;
    // float       FrameBorderSize;            // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    FrameBorderSize: number;
    // ImVec2      ItemSpacing;                // Horizontal and vertical spacing between widgets/lines
    getItemSpacing(): interface_ImVec2;
    // ImVec2      ItemInnerSpacing;           // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label)
    getItemInnerSpacing(): interface_ImVec2;
    // ImVec2      TouchExtraPadding;          // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
    getTouchExtraPadding(): interface_ImVec2;
    // float       IndentSpacing;              // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
    IndentSpacing: number;
    // float       ColumnsMinSpacing;          // Minimum horizontal spacing between two columns
    ColumnsMinSpacing: number;
    // float       ScrollbarSize;              // Width of the vertical scrollbar, Height of the horizontal scrollbar
    ScrollbarSize: number;
    // float       ScrollbarRounding;          // Radius of grab corners for scrollbar
    ScrollbarRounding: number;
    // float       GrabMinSize;                // Minimum width/height of a grab box for slider/scrollbar.
    GrabMinSize: number;
    // float       GrabRounding;               // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
    GrabRounding: number;
    // ImVec2      ButtonTextAlign;            // Alignment of button text when button is larger than text. Defaults to (0.5f,0.5f) for horizontally+vertically centered.
    getButtonTextAlign(): interface_ImVec2;
    // ImVec2      DisplayWindowPadding;       // Window positions are clamped to be visible within the display area by at least this amount. Only covers regular windows.
    getDisplayWindowPadding(): interface_ImVec2;
    // ImVec2      DisplaySafeAreaPadding;     // If you cannot see the edge of your screen (e.g. on a TV) increase the safe area padding. Covers popups/tooltips as well regular windows.
    getDisplaySafeAreaPadding(): interface_ImVec2;
    // bool        AntiAliasedLines;           // Enable anti-aliasing on lines/borders. Disable if you are really tight on CPU/GPU.
    AntiAliasedLines: boolean;
    // bool        AntiAliasedFill;            // Enable anti-aliasing on filled shapes (rounded rectangles, circles, etc.)
    AntiAliasedFill: boolean;
    // float       CurveTessellationTol;       // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
    CurveTessellationTol: number;
    // ImVec4      Colors[ImGuiCol_COUNT];
    getColorsAt(idx: number): interface_ImVec4;
    setColorsAt(idx: number, value: Readonly<interface_ImVec4>): boolean;

    // IMGUI_API ImGuiStyle();
    // IMGUI_API void ScaleAllSizes(float scale_factor);
    ScaleAllSizes(scale_factor: number): void;
}

export class ImGuiStyle extends emscripten.EmscriptenClass implements interface_ImGuiStyle {
    // float       Alpha;                      // Global alpha applies to everything in ImGui
    Alpha: number;
    // ImVec2      WindowPadding;              // Padding within a window
    getWindowPadding(): reference_ImVec2;
    // float       WindowRounding;             // Radius of window corners rounding. Set to 0.0f to have rectangular windows
    WindowRounding: number;
    // float       WindowBorderSize;           // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    WindowBorderSize: number;
    // ImVec2      WindowMinSize;              // Minimum window size
    getWindowMinSize(): reference_ImVec2;
    // ImVec2      WindowTitleAlign;           // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
    getWindowTitleAlign(): reference_ImVec2;
    // float       ChildRounding;              // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
    ChildRounding: number;
    // float       ChildBorderSize;            // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    ChildBorderSize: number;
    // float       PopupRounding;              // Radius of popup window corners rounding.
    PopupRounding: number;
    // float       PopupBorderSize;            // Thickness of border around popup windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    PopupBorderSize: number;
    // ImVec2      FramePadding;               // Padding within a framed rectangle (used by most widgets)
    getFramePadding(): reference_ImVec2;
    // float       FrameRounding;              // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
    FrameRounding: number;
    // float       FrameBorderSize;            // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    FrameBorderSize: number;
    // ImVec2      ItemSpacing;                // Horizontal and vertical spacing between widgets/lines
    getItemSpacing(): reference_ImVec2;
    // ImVec2      ItemInnerSpacing;           // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label)
    getItemInnerSpacing(): reference_ImVec2;
    // ImVec2      TouchExtraPadding;          // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
    getTouchExtraPadding(): reference_ImVec2;
    // float       IndentSpacing;              // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
    IndentSpacing: number;
    // float       ColumnsMinSpacing;          // Minimum horizontal spacing between two columns
    ColumnsMinSpacing: number;
    // float       ScrollbarSize;              // Width of the vertical scrollbar, Height of the horizontal scrollbar
    ScrollbarSize: number;
    // float       ScrollbarRounding;          // Radius of grab corners for scrollbar
    ScrollbarRounding: number;
    // float       GrabMinSize;                // Minimum width/height of a grab box for slider/scrollbar.
    GrabMinSize: number;
    // float       GrabRounding;               // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
    GrabRounding: number;
    // ImVec2      ButtonTextAlign;            // Alignment of button text when button is larger than text. Defaults to (0.5f,0.5f) for horizontally+vertically centered.
    getButtonTextAlign(): reference_ImVec2;
    // ImVec2      DisplayWindowPadding;       // Window positions are clamped to be visible within the display area by at least this amount. Only covers regular windows.
    getDisplayWindowPadding(): reference_ImVec2;
    // ImVec2      DisplaySafeAreaPadding;     // If you cannot see the edge of your screen (e.g. on a TV) increase the safe area padding. Covers popups/tooltips as well regular windows.
    getDisplaySafeAreaPadding(): reference_ImVec2;
    // bool        AntiAliasedLines;           // Enable anti-aliasing on lines/borders. Disable if you are really tight on CPU/GPU.
    AntiAliasedLines: boolean;
    // bool        AntiAliasedFill;            // Enable anti-aliasing on filled shapes (rounded rectangles, circles, etc.)
    AntiAliasedFill: boolean;
    // float       CurveTessellationTol;       // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
    CurveTessellationTol: number;
    // ImVec4      Colors[ImGuiCol_COUNT];
    getColorsAt(idx: number): reference_ImVec4;
    setColorsAt(idx: number, value: Readonly<interface_ImVec4>): boolean;

    // IMGUI_API ImGuiStyle();
    // IMGUI_API void ScaleAllSizes(float scale_factor);
    public ScaleAllSizes(scale_factor: number): void;
}

// export class ImDrawCmd extends NativeClass {
export class reference_ImDrawCmd extends emscripten.EmscriptenClassReference {
    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    readonly ElemCount: number;
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    getClipRect(): Readonly<reference_ImVec4>;
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    readonly TextureId: ImTextureID;
    // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
    // void*           UserCallbackData;       // The draw callback code can access this.

    // ImDrawCmd() { ElemCount = 0; ClipRect.x = ClipRect.y = ClipRect.z = ClipRect.w = 0.0f; TextureId = NULL; UserCallback = NULL; UserCallbackData = NULL; }
    // public readonly ClipRect: Readonly<ImVec4>;
}

export class reference_ImDrawListSharedData extends emscripten.EmscriptenClassReference {
}

// export class ImDrawList extends NativeClass {
export class reference_ImDrawList extends emscripten.EmscriptenClassReference {
    public IterateDrawCmds(callback: (draw_cmd: reference_ImDrawCmd, ElemStart: number) => void): void;
    
    // This is what you have to render
    // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
    // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
    public readonly IdxBuffer: Uint8Array;
    // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
    public readonly VtxBuffer: Uint8Array;

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
    public PushClipRect(clip_rect_min: Readonly<interface_ImVec2>, clip_rect_max: Readonly<interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
    // IMGUI_API void  PushClipRectFullScreen();
    public PushClipRectFullScreen(): void;
    // IMGUI_API void  PopClipRect();
    public PopClipRect(): void;
    // IMGUI_API void  PushTextureID(const ImTextureID& texture_id);
    // IMGUI_API void  PopTextureID();
    // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }

    // Primitives
    // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
    public AddLine(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    public AddRect(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawCornerFlags, thickness: number): void;
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    public AddRectFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col: ImU32, rounding: number, rounding_corners_flags: ImDrawCornerFlags): void;
    // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    public AddRectFilledMultiColor(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, col_upr_left: ImU32, col_upr_right: ImU32, col_bot_right: ImU32, col_bot_left: ImU32): void;
    // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
    public AddQuad(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
    public AddQuadFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, d: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
    public AddTriangle(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, col: ImU32, thickness: number): void;
    // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
    public AddTriangleFilled(a: Readonly<interface_ImVec2>, b: Readonly<interface_ImVec2>, c: Readonly<interface_ImVec2>, col: ImU32): void;
    // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
    public AddCircle(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number, thickness: number): void;
    // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
    public AddCircleFilled(centre: Readonly<interface_ImVec2>, radius: number, col: ImU32, num_segments: number): void;
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    public AddText(pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string, text_end: number | null): void;
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    public AddText_Font(font: reference_ImFont, font_size: number, pos: Readonly<interface_ImVec2>, col: ImU32, text_begin: string, text_end: number | null, wrap_width: number, cpu_fine_clip_rect: Readonly<interface_ImVec4> | null): void;
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    public AddBezierCurve(pos0: Readonly<interface_ImVec2>, cp0: Readonly<interface_ImVec2>, cp1: Readonly<interface_ImVec2>, pos1: Readonly<interface_ImVec2>, col: ImU32, thickness: number, num_segments: number): void;

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
}

// export class ImDrawData extends NativeClass {
export class reference_ImDrawData extends emscripten.EmscriptenClassReference {
    public IterateDrawLists(callback: (draw_list: reference_ImDrawList) => void): void;

    // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
    public readonly Valid: boolean;
    // ImDrawList**    CmdLists;
    // int             CmdListsCount;
    public readonly CmdListsCount: number;
    // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
    public readonly TotalVtxCount: number;
    // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
    public readonly TotalIdxCount: number;

    // Functions
    // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
    // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    // public ScaleClipRects(sc: Readonly<ImVec2>): void;
    public ScaleClipRects(sc: Readonly<interface_ImVec2>): void;
}

export class reference_ImFont extends emscripten.EmscriptenClassReference {
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
    GetDebugName(): string;

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
}

export class reference_ImFontAtlas extends emscripten.EmscriptenClassReference {
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
    GetTexDataAsRGBA32(): { pixels: Uint8Array, width: number, height: number };
    // void                        SetTexID(ImTextureID id)    { TexID = id; }

    // //-------------------------------------------
    // Glyph Ranges
    // //-------------------------------------------

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
    // IMGUI_API void      CalcCustomRectUV(const CustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max);
    // const CustomRect*   GetCustomRectByIndex(int index) const { if (index < 0) return NULL; return &CustomRects[index]; }

    // //-------------------------------------------
    // Members
    // //-------------------------------------------

    // ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
    getTexID(): WebGLTexture | null;
    setTexID(value: WebGLTexture | null): void;
    // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
    // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.

    // [Internal]
    // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
    // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
    // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
    // int                         TexWidth;           // Texture width calculated during Build().
    readonly TexWidth: number;
    // int                         TexHeight;          // Texture height calculated during Build().
    readonly TexHeight: number;
    // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
    // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
    // ImVector<CustomRect>        CustomRects;        // Rectangles for packing custom texture data into the atlas.
    // ImVector<ImFontConfig>      ConfigData;         // Internal data
    // int                         CustomRectIds[1];   // Identifiers of custom texture rectangle used by ImFontAtlas/ImDrawList
}

export class reference_ImGuiIO extends emscripten.EmscriptenClassReference {
    //------------------------------------------------------------------
    // Settings (fill once)                 // Default value:
    //------------------------------------------------------------------

    // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
    public getDisplaySize(): reference_ImVec2;
    // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
    public DeltaTime: number;
    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
    // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
    // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
    // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
    public getKeyMapAt(index: ImGuiKey): number;
    public setKeyMapAt(index: ImGuiKey, value: number): boolean;
    // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
    // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
    // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.

    // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
    public getFonts(): reference_ImFontAtlas;
    // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
    public FontGlobalScale: number;
    // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
    // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
    // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
    public getDisplayFramebufferScale(): reference_ImVec2;
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
    public getMousePos(): reference_ImVec2;
    // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
    public getMouseDownAt(index: number): boolean;
    public setMouseDownAt(index: number, value: boolean): boolean;
    // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
    public MouseWheel: number;
    // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
    public MouseDrawCursor: boolean;
    // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
    public KeyCtrl: boolean;
    // bool        KeyShift;                   // Keyboard modifier pressed: Shift
    public KeyShift: boolean;
    // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
    public KeyAlt: boolean;
    // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
    public KeySuper: boolean;
    // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
    public getKeysDownAt(index: number): boolean;
    public setKeysDownAt(index: number, value: boolean): boolean;
    // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
    
    // Functions
    // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
    public AddInputCharacter(c: number): void;
    // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
    // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually

    //------------------------------------------------------------------
    // Output - Retrieve after calling NewFrame()
    //------------------------------------------------------------------

    // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active). 
    public WantCaptureMouse: boolean;
    // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
    public WantCaptureKeyboard: boolean;
    // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
    public WantTextInput: boolean;
    // bool        WantMoveMouse;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
    public WantMoveMouse: boolean;
    // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
    public Framerate: number;
    // int         MetricsAllocs;              // Number of active memory allocations
    // int         MetricsRenderVertices;      // Vertices output during last call to Render()
    // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
    // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
    // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
    public getMouseDelta(): Readonly<reference_ImVec2>;

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
    public getMouseDownDurationAt(index: number): number;
    // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
    // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
    // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
    // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
    public getKeysDownDurationAt(index: number): number;
    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down

    // IMGUI_API   ImGuiIO();
}

// Main
// IMGUI_API ImGuiIO&      GetIO();
export function GetIO(): reference_ImGuiIO;
// IMGUI_API ImGuiStyle&   GetStyle();
export function GetStyle(): ImGuiStyle;
// IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
export function GetDrawData(): reference_ImDrawData | null;
// IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
export function NewFrame(): void;
// IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
export function Render(): void;
// IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
export function EndFrame(): void;
// IMGUI_API void          Shutdown();
export function Shutdown(): void;

// Demo, Debug, Informations
// IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
export function ShowDemoWindow(p_open: [ boolean ] | null): void;
// IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
export function ShowMetricsWindow(p_open: [ boolean ] | null): void;
// IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
export function ShowStyleEditor(ref: ImGuiStyle | null): void;
// IMGUI_API bool          ShowStyleSelector(const char* label);
export function ShowStyleSelector(label: string): boolean;
// IMGUI_API void          ShowFontSelector(const char* label);
export function ShowFontSelector(label: string): void;
// IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
export function ShowUserGuide(): void;

// Window
export function Begin(name: string, p_open: [ boolean ] | null /* = NULL */, flags: ImGuiWindowFlags/* = 0 */): boolean;
export function End(): void;
export function BeginChild(id: string | ImGuiID, size: Readonly<interface_ImVec2>, border: boolean, extra_flags: ImGuiWindowFlags): boolean;
export function EndChild(): void;
export function GetContentRegionMax(out: interface_ImVec2): typeof out;
export function GetContentRegionAvail(out: interface_ImVec2): typeof out;
export function GetContentRegionAvailWidth(): number;
export function GetWindowContentRegionMin(out: interface_ImVec2): typeof out;
export function GetWindowContentRegionMax(out: interface_ImVec2): typeof out;
export function GetWindowContentRegionWidth(): number;
export function GetWindowDrawList(): reference_ImDrawList;
export function GetWindowPos(out: interface_ImVec2): typeof out;
export function GetWindowSize(out: interface_ImVec2): typeof out;
export function GetWindowWidth(): number;
export function GetWindowHeight(): number;
export function IsWindowCollapsed(): boolean;
export function IsWindowAppearing(): boolean;
export function SetWindowFontScale(scale: number): void;

export function SetNextWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */, pivot: Readonly<interface_ImVec2>/* = ImVec2(0,0) */): void;
export function SetNextWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
export function SetNextWindowSizeConstraints(size_min: Readonly<interface_ImVec2>, size_max: Readonly<interface_ImVec2>, custom_callback: ImGuiSizeConstraintCallback | null/* = NULL */, data: any/* = NULL */): void;
export function SetNextWindowContentSize(size: Readonly<interface_ImVec2>): void;
export function SetNextWindowCollapsed(collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
export function SetNextWindowFocus(): void;
export function SetWindowPos(pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
export function SetWindowSize(size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
export function SetWindowCollapsed(collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
export function SetWindowFocus(): void;
export function SetWindowNamePos(name: string, pos: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
export function SetWindowNameSize(name: string, size: Readonly<interface_ImVec2>, cond: ImGuiCond/* = 0 */): void;
export function SetWindowNameCollapsed(name: string, collapsed: boolean, cond: ImGuiCond/* = 0 */): void;
export function SetWindowNameFocus(name: string): void;

export function GetScrollX(): number;
export function GetScrollY(): number;
export function GetScrollMaxX(): number;
export function GetScrollMaxY(): number;
export function SetScrollX(scroll_x: number): void;
export function SetScrollY(scroll_y: number): void;
export function SetScrollHere(center_y_ratio: number/* = 0.5f */): void;
export function SetScrollFromPosY(pos_y: number, center_y_ratio: number/* = 0.5f */): void;
// function SetStateStorage(tree: ImGuiStorage | null): void;
// function GetStateStorage(): ImGuiStorage | null;

// Parameters stacks (shared)
// function PushFont(font: ImFont | null): void;
// function PopFont(): void;
export function PushStyleColor(idx: ImGuiCol, col: ImU32 | Readonly<interface_ImVec4>): void;
export function PopStyleColor(count: number/* = 1 */): void;
export function PushStyleVar(idx: ImGuiStyleVar, val: number | Readonly<interface_ImVec2>): void;
export function PopStyleVar(count: number/* = 1 */): void;
export function GetStyleColorVec4(idx: ImGuiCol): Readonly<reference_ImVec4>;
export function GetFont(): reference_ImFont;
export function GetFontSize(): number;
export function GetFontTexUvWhitePixel(out: interface_ImVec2): typeof out;
export function GetColorU32(idx: ImGuiCol, alpha_mul: number/* = 1.0f */): ImU32;
// export function GetColorU32(col: Readonly<interface_ImVec4>): ImU32;
// export function GetColorU32(col: ImU32): ImU32;

// Parameters stacks (current window)
export function PushItemWidth(item_width: number): void;
export function PopItemWidth(): void;
export function CalcItemWidth(): number;
export function PushTextWrapPos(wrap_pos_x: number/* = 0.0f */): void;
export function PopTextWrapPos(): void;
export function PushAllowKeyboardFocus(allow_keyboard_focus: boolean): void;
export function PopAllowKeyboardFocus(): void;
export function PushButtonRepeat(repeat: boolean): void;
export function PopButtonRepeat(): void;

// Cursor / Layout
export function Separator(): void;
export function SameLine(pos_x: number/* = 0.0f */, spacing_w: number/* = -1.0f */): void;
export function NewLine(): void;
export function Spacing(): void;
export function Dummy(size: Readonly<interface_ImVec2>): void;
export function Indent(indent_w: number/* = 0.0f */): void;
export function Unindent(indent_w: number/* = 0.0f */): void;
export function BeginGroup(): void;
export function EndGroup(): void;
export function GetCursorPos(out: interface_ImVec2): typeof out;
export function GetCursorPosX(): number;
export function GetCursorPosY(): number;
export function SetCursorPos(local_pos: Readonly<interface_ImVec2>): void;
export function SetCursorPosX(x: number): void;
export function SetCursorPosY(y: number): void;
export function GetCursorStartPos(out: interface_ImVec2): typeof out;
export function GetCursorScreenPos(out: interface_ImVec2): typeof out;
export function SetCursorScreenPos(pos: interface_ImVec2): void;
export function AlignTextToFramePadding(): void;
export function GetTextLineHeight(): number;
export function GetTextLineHeightWithSpacing(): number;
export function GetFrameHeight(): number;
export function GetFrameHeightWithSpacing(): number;

// Columns
// You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
export function Columns(count: number/* = 1 */, id: string | null/* = NULL */, border: boolean/* = true */): void;
export function NextColumn(): void;
export function GetColumnIndex(): number;
export function GetColumnWidth(column_index: number/* = -1 */): number;
export function SetColumnWidth(column_index: number, width: number): void;
export function GetColumnOffset(column_index: number/* = -1 */): number;
export function SetColumnOffset(column_index: number, offset_x: number): void;
export function GetColumnsCount(): number;

// ID scopes
// If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
// You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
// export function PushID(str_id_begin: string, str_id_end: string): void;
// export function PushID(ptr_id: any): void;
// export function PushID(int_id: number): void;
export function PushID(id: string | number): void;
export function PopID(): void;
// export function GetID(str_id_begin: string, str_id_end: string): ImGuiID;
// export function GetID(ptr_id: any): ImGuiID;
export function GetID(id: string | number): ImGuiID;

// Widgets: Text
// IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
export function TextUnformatted(text: string, /* text_end: string = NULL */): void;
// IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
export function Text(fmt: string/*, ...args: any[]*/): void;
// IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
export function Text(fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
export function TextColored(col: Readonly<interface_ImVec4>, fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
export function TextColoredV(col: Readonly<interface_ImVec4>, fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
export function TextDisabled(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
export function TextDisabledV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
export function TextWrapped(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
export function TextWrappedV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
export function LabelText(label: string, fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
export function LabelTextV(label: string, fmt: string/* , args: any[] */): void;
// IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
export function BulletText(fmt: string/* , ...args: any[] */): void;
// IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
export function BulletTextV(fmt: string/* , args: any[] */): void;
// IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
export function Bullet(): void;

// Widgets: Main
export function Button(label: string, size: Readonly<interface_ImVec2>): boolean;
export function SmallButton(label: string): boolean;
export function InvisibleButton(str_id: string, size: Readonly<interface_ImVec2>): boolean;
// IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
export function Image(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, tint_col: Readonly<interface_ImVec4>, border_col: Readonly<interface_ImVec4>): void;
// IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
export function ImageButton(user_texture_id: any, size: Readonly<interface_ImVec2>, uv0: Readonly<interface_ImVec2>, uv1: Readonly<interface_ImVec2>, frame_padding: number, bg_col: Readonly<interface_ImVec4>, tint_col: Readonly<interface_ImVec4>): void;
export function Checkbox(label: string, v: [ boolean ]): boolean;
export function CheckboxFlags(label: string, flags: ImScalar<number> | null, flags_value: number): boolean;
// export function RadioButton(label: string, active: boolean): boolean;
// export function RadioButton(label: string, v: ImScalar<number>, v_button: number): boolean;
export function RadioButton(label: string, active_or_v: boolean | ImScalar<number>, v_button?: number): boolean;
// IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
// IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotLines(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number | null, scale_max: number | null, graph_size: Readonly<interface_ImVec2>): void;
// IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
// IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotHistogram(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number, value_offset: number, overlay_text: string | null, scale_min: number | null, scale_max: number | null, graph_size: Readonly<interface_ImVec2>): void;
// IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
export function ProgressBar(fraction: number, size_arg: Readonly<interface_ImVec2>, overlay: string | null): void;

// Widgets: Combo Box
// The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it. 
// The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
export function BeginCombo(label: string, preview_value: string | null, flags: ImGuiComboFlags/* = 0 */): boolean;
export function EndCombo(): void;
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
// IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
export function Combo(label: string, current_item: ImScalar<number>, items: string[/**/], items_count: number, popup_max_height_in_items: number/* = -1 */): boolean;
// export function Combo(label: string, current_item: ImScalar<number>, items_separated_by_zeros: string, popup_max_height_in_items: number/* = -1 */): boolean;

// Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
// For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
export function DragFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string | null/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function DragFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function DragFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function DragFloat4(label: string, v: ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function DragFloatRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0.0f */, v_max: number/* = 0.0f */, display_format: string/* = "%.3f" */, display_format_max: string | null/* = NULL */, power: number/* = 1.0f */): boolean;
export function DragInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
export function DragInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
export function DragInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
export function DragInt4(label: string, v: ImTuple4<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */): boolean;
export function DragIntRange2(label: string, v_current_min: ImScalar<number>, v_current_max: ImScalar<number>, v_speed: number/* = 1.0f */, v_min: number/* = 0 */, v_max: number/* = 0 */, display_format: string/* = "%.0f" */, display_format_max: string | null/* = NULL */): boolean;

// Widgets: Input with Keyboard
export function InputText(label: string, buf: [ string ], buf_size: number, flags: ImGuiInputTextFlags/* = 0 */, callback: ImGuiTextEditCallback | null/* = NULL */, user_data: any/* = NULL */): boolean;
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
export function InputTextMultiline(label: string, buf: [ string ], buf_size: number, size: Readonly<interface_ImVec2>, flags: ImGuiInputTextFlags/* = 0 */, callback: ImGuiTextEditCallback | null/* = NULL */, user_data: any/* = NULL */): boolean;
export function InputFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number/* = 0.0f */, step_fast: number/* = 0.0f */, decimal_precision: number/* = -1 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, decimal_precision: number/* = -1 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, decimal_precision: number/* = -1 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputFloat4(label: string, v: ImTuple4<number>, decimal_precision: number/* = -1 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, step: number/* = 1 */, step_fast: number/* = 100 */, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;
export function InputInt4(label: string, v: ImTuple4<number>, extra_flags: ImGuiInputTextFlags/* = 0 */): boolean;

// Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
export function SliderFloat(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function SliderFloat2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function SliderFloat3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function SliderFloat4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function SliderAngle(label: string, v_rad: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_degrees_min: number/* = -360.0f */, v_degrees_max: number/* = +360.0f */): boolean;
export function SliderInt(label: string, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
export function SliderInt2(label: string, v: ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
export function SliderInt3(label: string, v: ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
export function SliderInt4(label: string, v: ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;
export function VSliderFloat(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.3f" */, power: number/* = 1.0f */): boolean;
export function VSliderInt(label: string, size: Readonly<interface_ImVec2>, v: ImScalar<number> | ImTuple2<number> | ImTuple3<number> | ImTuple4<number>, v_min: number, v_max: number, display_format: string/* = "%.0f" */): boolean;

// Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
// Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
export function ColorEdit3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
export function ColorEdit4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
export function ColorPicker3(label: string, col: ImTuple3<number> | ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */): boolean;
export function ColorPicker4(label: string, col: ImTuple4<number>, flags: ImGuiColorEditFlags/* = 0 */, ref_col: any /* const float* *//* = NULL */): boolean;
// IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
export function ColorButton(desc_id: string, col: Readonly<interface_ImVec4>, flags: ImGuiColorEditFlags, size: Readonly<interface_ImVec2>): boolean;
export function SetColorEditOptions(flags: ImGuiColorEditFlags): void;

// Widgets: Trees
// IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
// IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
// IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
// IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
// IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
export function TreeNode(label_or_id: string | number, fmt: string): boolean;
// IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
// IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
// IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
export function TreeNodeEx(label_or_id: string | number, flags: ImGuiTreeNodeFlags/* = 0 */, fmt: string): boolean;
// IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
// IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
export function TreePush(id: string | number): void;
// IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
export function TreePop(): void;
// IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
export function TreeAdvanceToLabelPos(): void;
// IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
export function GetTreeNodeToLabelSpacing(): number;
// IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
export function SetNextTreeNodeOpen(is_open: boolean, cond: ImGuiCond/* = 0 */): void;
// IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
// IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
export function CollapsingHeader(label: string, p_open: [ boolean ] | null, flags: ImGuiTreeNodeFlags/* = 0 */): boolean;

// Widgets: Selectable / Lists
// IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
// IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
export function Selectable(label: string, selected?: boolean | [ boolean ], flags?: ImGuiSelectableFlags, size?: interface_ImVec2): boolean;
// IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
// IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
export function ListBox(label: string, current_item: ImScalar<number>, items: string[], items_count: number, height_in_items: number/* = -1 */): boolean;
// IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
// IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
export function ListBoxHeader(label: string, size: Readonly<interface_ImVec2>): boolean;
export function ListBoxFooter(): void;

// Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
export function Value(prefix: string, b: boolean): void;
export function Value(prefix: string, v: number): void;
export function Value(prefix: string, v: number, float_format: string/* = NULL */): void;

// Tooltips
// IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
// IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
export function SetTooltip(fmt: string): void;
export function BeginTooltip(): void;
export function EndTooltip(): void;

// Menus
export function BeginMainMenuBar(): boolean;
export function EndMainMenuBar(): void;
export function BeginMenuBar(): boolean;
export function EndMenuBar(): void;
export function BeginMenu(label: string, enabled: boolean/* = true */): boolean;
export function EndMenu(): void;
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
export function MenuItem(label: string, shortcut: string, p_selected: [ boolean ], enabled: boolean/* = true */): boolean;

// Popups
export function OpenPopup(str_id: string): void;
export function OpenPopupOnItemClick(str_id: string/* = NULL */, mouse_button: number/* = 1 */): boolean;
export function BeginPopup(str_id: string): boolean;
export function BeginPopupModal(name: string, p_open: [ boolean ]/* = NULL */, extra_flags: ImGuiWindowFlags/* = 0 */): boolean;
export function BeginPopupContextItem(str_id: string/* = NULL */, mouse_button: number/* = 1 */): boolean;
export function BeginPopupContextWindow(str_id: string/* = NULL */, mouse_button: number/* = 1 */, also_over_items: boolean/* = true */): boolean;
export function BeginPopupContextVoid(str_id: string/* = NULL */, mouse_button: number/* = 1 */): boolean;
export function EndPopup(): void;
export function IsPopupOpen(str_id: string): boolean;
export function CloseCurrentPopup(): void;

// Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
// IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
export function LogToTTY(max_depth: number/* = -1 */): void;
// IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
export function LogToFile(max_depth: number/* = -1 */, filename: string | null/* = NULL */): void;
// IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
export function LogToClipboard(max_depth: number/* = -1 */): void;
// IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
export function LogFinish(): void;
// IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
export function LogButtons(): void;
// IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
export function LogText(fmt: string): void;

// Drag and Drop
// [BETA API] Missing Demo code. API may evolve.
// IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
export function BeginDragDropSource(flags: ImGuiDragDropFlags/* = 0 */, mouse_button: number/* = 0 */): boolean;
// IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
export function SetDragDropPayload(type: string, data: any, size: number, cond: ImGuiCond/* = 0 */): boolean;
// IMGUI_API void          EndDragDropSource();
export function EndDragDropSource(): void;
// IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
export function BeginDragDropTarget(): boolean;
// IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
export function AcceptDragDropPayload(type: string, flags: ImGuiDragDropFlags/* = 0 */): any;
// IMGUI_API void          EndDragDropTarget();
export function EndDragDropTarget(): void;

// Clipping
// IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
// export function PushClipRect(clip_rect_min: Readonly<ImVec2>, clip_rect_max: Readonly<ImVec2>, intersect_with_current_clip_rect: boolean): void;
export function PushClipRect(clip_rect_min: Readonly<interface_ImVec2>, clip_rect_max: Readonly<interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
// IMGUI_API void          PopClipRect();
export function PopClipRect(): void;

// Styles
// IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
export function StyleColorsClassic(dst: ImGuiStyle | null/* = NULL */): void;
// IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
export function StyleColorsDark(dst: ImGuiStyle | null/* = NULL */): void;
// IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
export function StyleColorsLight(dst: ImGuiStyle | null/* = NULL */): void;

// Focus
// (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
// (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
// IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
export function SetItemDefaultFocus(): void;
// IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
export function SetKeyboardFocusHere(offset: number/* = 0 */): void;

// Utilities
// IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
export function IsItemHovered(flags: ImGuiHoveredFlags/* = 0 */): boolean;
// IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
export function IsItemActive(): boolean;
// IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
export function IsItemClicked(mouse_button: number/* = 0 */): boolean;
// IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
export function IsItemVisible(): boolean;
// IMGUI_API bool          IsAnyItemHovered();
export function IsAnyItemHovered(): boolean;
// IMGUI_API bool          IsAnyItemActive();
export function IsAnyItemActive(): boolean;
// IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
export function GetItemRectMin(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetItemRectMax();                                                   // "
export function GetItemRectMax(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
export function GetItemRectSize(out: interface_ImVec2): typeof out;
// IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
export function SetItemAllowOverlap(): void;
// IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
export function IsWindowFocused(flags: ImGuiFocusedFlags/* = 0 */): boolean;
// IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
export function IsWindowHovered(flags: ImGuiHoveredFlags/* = 0 */): boolean;
// IMGUI_API bool          IsAnyWindowFocused();
export function IsAnyWindowFocused(): boolean;
// IMGUI_API bool          IsAnyWindowHovered();                                               // is mouse hovering any visible window
export function IsAnyWindowHovered(): boolean;
// IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
// IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
export function IsRectVisible(size_or_rect_min: Readonly<interface_ImVec2>, rect_max?: Readonly<interface_ImVec2>): boolean;
// IMGUI_API float         GetTime();
export function GetTime(): number;
// IMGUI_API int           GetFrameCount();
export function GetFrameCount(): number;
// IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
export function GetOverlayDrawList(): reference_ImDrawList;
// IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
export function GetDrawListSharedData(): reference_ImDrawListSharedData;
// IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
export function GetStyleColorName(idx: ImGuiCol): string;
// IMGUI_API ImVec2        CalcItemRectClosestPoint(const ImVec2& pos, bool on_edge = false, float outward = +0.0f);   // utility to find the closest point the last item bounding rectangle edge. useful to visually link items
export function CalcItemRectClosestPoint(pos: Readonly<interface_ImVec2>, on_edge: boolean/* = false */, outward: number/* = +0.0f */, out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
export function CalcTextSize(text: string, text_end: string | null/* = NULL */, hide_text_after_double_hash: boolean/* = false */, wrap_width: number/* = -1.0f */, out: interface_ImVec2): typeof out;
// IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
export function CalcListClipping(items_count: number, items_height: number, out_items_display_start: ImScalar<number>, out_items_display_end: ImScalar<number>): void;

// IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
export function BeginChildFrame(id: ImGuiID, size: Readonly<interface_ImVec2>, extra_flags: ImGuiWindowFlags/* = 0 */): boolean;
// IMGUI_API void          EndChildFrame();
export function EndChildFrame(): void;

// IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
export function ColorConvertU32ToFloat4(in_: ImU32, out: interface_ImVec4): typeof out;
// IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
export function ColorConvertFloat4ToU32(in_: Readonly<interface_ImVec4>): ImU32;
// IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
export function ColorConvertRGBtoHSV(r: number, g: number, b: number, out_h: ImScalar<number>, out_s: ImScalar<number>, out_v: ImScalar<number>): void;
// IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
export function ColorConvertHSVtoRGB(h: number, s: number, v: number, out_r: ImScalar<number>, out_g: ImScalar<number>, out_b: ImScalar<number>): void;

// Inputs
// IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
export function GetKeyIndex(imgui_key: ImGuiKey): number;
// IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
export function IsKeyDown(user_key_index: number): boolean;
// IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
export function IsKeyPressed(user_key_index: number, repeat: boolean/* = true */): boolean;
// IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
export function IsKeyReleased(user_key_index: number): boolean;
// IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
export function GetKeyPressedAmount(key_index: number, repeat_delay: number, rate: number): number;
// IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
export function IsMouseDown(button: number): boolean;
// IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
export function IsMouseClicked(button: number, repeat: boolean/* = false */): boolean;
// IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
export function IsMouseDoubleClicked(button: number): boolean;
// IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
export function IsMouseReleased(button: number): boolean;
// IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
export function IsMouseDragging(button: number/* = 0 */, lock_threshold: number/* = -1.0f */): boolean;
// IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
export function IsMouseHoveringRect(r_min: Readonly<interface_ImVec2>, r_max: Readonly<interface_ImVec2>, clip: boolean/* = true */): boolean;
// IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
export function IsMousePosValid(mouse_pos: Readonly<interface_ImVec2> | null/* = NULL */): boolean;
// IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
export function GetMousePos(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
export function GetMousePosOnOpeningCurrentPopup(out: interface_ImVec2): typeof out;
// IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
export function GetMouseDragDelta(button: number/* = 0 */, lock_threshold: number/* = -1.0f */, out: interface_ImVec2): typeof out;
// IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
export function ResetMouseDragDelta(button: number/* = 0 */): void;
// IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
export function GetMouseCursor(): ImGuiMouseCursor;
// IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
export function SetMouseCursor(type: ImGuiMouseCursor): void;
// IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
export function CaptureKeyboardFromApp(capture: boolean/* = true */): void;
// IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
export function CaptureMouseFromApp(capture: boolean/* = true */): void;

// Helpers functions to access functions pointers in ImGui::GetIO()
// IMGUI_API void*         MemAlloc(size_t sz);
export function MemAlloc(sz: number): any;
// IMGUI_API void          MemFree(void* ptr);
export function MemFree(ptr: any): void;
// IMGUI_API const char*   GetClipboardText();
export function GetClipboardText(): string;
// IMGUI_API void          SetClipboardText(const char* text);
export function SetClipboardText(text: string): void;

// Internal context access - if you want to use multiple context, share context between modules (e.g. DLL). There is a default context created and active by default.
// All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
// IMGUI_API const char*   GetVersion();
export function GetVersion(): string;
// IMGUI_API ImGuiContext* CreateContext(void* (*malloc_fn)(size_t) = NULL, void (*free_fn)(void*) = NULL);
// export function CreateContext(malloc_fn: ((sz: number) => any) | null, free_fn: ((ptr: any) => void) | null): ImGuiContext | null;
export function CreateContext(): ImGuiContext | null;
// IMGUI_API void          DestroyContext(ImGuiContext* ctx);
export function DestroyContext(ctx: ImGuiContext | null): void;
// IMGUI_API ImGuiContext* GetCurrentContext();
export function GetCurrentContext(): ImGuiContext | null;
// IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
export function SetCurrentContext(ctx: ImGuiContext | null): void;
