import * as Bind from "./bind-imgui";
export { Bind };

const bind: Bind.Module = Bind.default();
export { bind };

import * as config from "./imconfig";

export const IMGUI_VERSION: string = bind.IMGUI_VERSION;

export function IM_ASSERT(_EXPR: boolean | number): void { if (!_EXPR) { throw new Error(); } }

export function IM_ARRAYSIZE(_ARR: ArrayLike<any> | ImStringBuffer): number {
    if (_ARR instanceof ImStringBuffer) {
        return _ARR.size;
    } else {
        return _ARR.length;
    }
}

export class ImStringBuffer {
    constructor(public size: number, public buffer: string = "") {}
}

export { ImAccess } from "./bind-imgui";
export { ImScalar } from "./bind-imgui";
export { ImTuple2 } from "./bind-imgui";
export { ImTuple3 } from "./bind-imgui";
export { ImTuple4 } from "./bind-imgui";

export type ImTextureID = WebGLTexture;

// Flags for ImGui::Begin()
export { ImGuiWindowFlags as WindowFlags };
export enum ImGuiWindowFlags {
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
    AlwaysHorizontalScrollbar= 1 << 15,  // Always show horizontal scrollbar (even if ContentSize.x < Size.x)
    AlwaysUseWindowPadding = 1 << 16,  // Ensure child windows without border uses style.WindowPadding (ignored by default for non-bordered child windows, because more convenient)
    ResizeFromAnySide      = 1 << 17,  // (WIP) Enable resize from any corners and borders. Your back-end needs to honor the different values of io.MouseCursor set by imgui.
    NoNavInputs            = 1 << 18,  // No gamepad/keyboard navigation within the window
    NoNavFocus             = 1 << 19,  // No focusing toward this window with gamepad/keyboard navigation (e.g. skipped by CTRL+TAB)
    NoNav                  = NoNavInputs | NoNavFocus,

    // [Internal]
    NavFlattened           = 1 << 23,  // (WIP) Allow gamepad/keyboard navigation to cross over parent border to this child (only use on child that have no scrolling!)
    ChildWindow            = 1 << 24,  // Don't use! For internal use by BeginChild()
    Tooltip                = 1 << 25,  // Don't use! For internal use by BeginTooltip()
    Popup                  = 1 << 26,  // Don't use! For internal use by BeginPopup()
    Modal                  = 1 << 27,  // Don't use! For internal use by BeginPopupModal()
    ChildMenu              = 1 << 28,   // Don't use! For internal use by BeginMenu()
}

// Flags for ImGui::InputText()
export { ImGuiInputTextFlags as InputTextFlags };
export enum ImGuiInputTextFlags {
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
    Multiline           = 1 << 20,   // For internal use by InputTextMultiline()
}

// Flags for ImGui::TreeNodeEx(), ImGui::CollapsingHeader*()
export { ImGuiTreeNodeFlags as TreeNodeFlags };
export enum ImGuiTreeNodeFlags {
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
    NavLeftJumpsBackHere = 1 << 13,  // (WIP) Nav: left direction may move to this TreeNode() from any of its child (items submitted between TreeNode and TreePop)
    CollapsingHeader     = Framed | NoAutoOpenOnLog,
}

// Flags for ImGui::Selectable()
export { ImGuiSelectableFlags as SelectableFlags };
export enum ImGuiSelectableFlags {
    DontClosePopups    = 1 << 0,   // Clicking this don't close parent popup window
    SpanAllColumns     = 1 << 1,   // Selectable frame can span all columns (text will still fit in current column)
    AllowDoubleClick   = 1 << 2,    // Generate press events on double clicks too
}

// Flags for ImGui::BeginCombo()
export { ImGuiComboFlags as ComboFlags };
export enum ImGuiComboFlags {
    PopupAlignLeft          = 1 << 0,   // Align the popup toward the left by default
    HeightSmall             = 1 << 1,   // Max ~4 items visible. Tip: If you want your combo popup to be a specific size you can use SetNextWindowSizeConstraints() prior to calling BeginCombo()
    HeightRegular           = 1 << 2,   // Max ~8 items visible (default)
    HeightLarge             = 1 << 3,   // Max ~20 items visible
    HeightLargest           = 1 << 4,   // As many fitting items as possible
    HeightMask_             = HeightSmall | HeightRegular | HeightLarge | HeightLargest,
}

// Flags for ImGui::IsWindowFocused()
export { ImGuiFocusedFlags as FocusedFlags };
export enum ImGuiFocusedFlags {
    ChildWindows                  = 1 << 0,   // IsWindowFocused(): Return true if any children of the window is focused
    RootWindow                    = 1 << 1,   // IsWindowFocused(): Test from root window (top most parent of the current hierarchy)
    AnyWindow                     = 1 << 2,   // IsWindowFocused(): Return true if any window is focused
    RootAndChildWindows           = RootWindow | ChildWindows,
}

// Flags for ImGui::IsItemHovered(), ImGui::IsWindowHovered()
export { ImGuiHoveredFlags as HoveredFlags };
export enum ImGuiHoveredFlags {
    Default                       = 0,        // Return true if directly over the item/window, not obstructed by another window, not obstructed by an active popup or modal blocking inputs under them.
    ChildWindows                  = 1 << 0,   // IsWindowHovered() only: Return true if any children of the window is hovered
    RootWindow                    = 1 << 1,   // IsWindowHovered() only: Test from root window (top most parent of the current hierarchy)
    AnyWindow                     = 1 << 2,   // IsWindowHovered() only: Return true if any window is hovered
    AllowWhenBlockedByPopup       = 1 << 3,   // Return true even if a popup window is normally blocking access to this item/window
    //AllowWhenBlockedByModal     = 1 << 4,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
    AllowWhenBlockedByActiveItem  = 1 << 5,   // Return true even if an active item is blocking access to this item/window. Useful for Drag and Drop patterns.
    AllowWhenOverlapped           = 1 << 6,   // Return true even if the position is overlapped by another window
    RectOnly                      = AllowWhenBlockedByPopup | AllowWhenBlockedByActiveItem | AllowWhenOverlapped,
    RootAndChildWindows           = RootWindow | ChildWindows,
}

// Flags for ImGui::BeginDragDropSource(), ImGui::AcceptDragDropPayload()
export { ImGuiDragDropFlags as DragDropFlags };
export enum ImGuiDragDropFlags {
    // BeginDragDropSource() flags
    SourceNoPreviewTooltip       = 1 << 0,       // By default, a successful call to BeginDragDropSource opens a tooltip so you can display a preview or description of the source contents. This flag disable this behavior.
    SourceNoDisableHover         = 1 << 1,       // By default, when dragging we clear data so that IsItemHovered() will return true, to avoid subsequent user code submitting tooltips. This flag disable this behavior so you can still call IsItemHovered() on the source item.
    SourceNoHoldToOpenOthers     = 1 << 2,       // Disable the behavior that allows to open tree nodes and collapsing header by holding over them while dragging a source item.
    SourceAllowNullID            = 1 << 3,       // Allow items such as Text(), Image() that have no unique identifier to be used as drag source, by manufacturing a temporary identifier based on their window-relative position. This is extremely unusual within the dear imgui ecosystem and so we made it explicit.
    SourceExtern                 = 1 << 4,       // External source (from outside of imgui), won't attempt to read current item/window info. Will always return true. Only one Extern source can be active simultaneously.
    // AcceptDragDropPayload() flags
    AcceptBeforeDelivery         = 1 << 10,      // AcceptDragDropPayload() will returns true even before the mouse button is released. You can then call IsDelivery() to test if the payload needs to be delivered.
    AcceptNoDrawDefaultRect      = 1 << 11,      // Do not draw the default highlight rectangle when hovering over target.
    AcceptPeekOnly               = AcceptBeforeDelivery | AcceptNoDrawDefaultRect,  // For peeking ahead and inspecting the payload before delivery.
}

// Standard Drag and Drop payload types. You can define you own payload types using 12-characters long strings. Types starting with '_' are defined by Dear ImGui.
export const IMGUI_PAYLOAD_TYPE_COLOR_3F: string = "_COL3F";    // float[3]     // Standard type for colors, without alpha. User code may use this type.
export const IMGUI_PAYLOAD_TYPE_COLOR_4F: string = "_COL4F";    // float[4]     // Standard type for colors. User code may use this type.

// User fill ImGuiIO.KeyMap[] array with indices into the ImGuiIO.KeysDown[512] array
export { ImGuiKey as Key };
export enum ImGuiKey {
    Tab,
    LeftArrow,
    RightArrow,
    UpArrow,
    DownArrow,
    PageUp,
    PageDown,
    Home,
    End,
    Insert,
    Delete,
    Backspace,
    Space,
    Enter,
    Escape,
    A,         // for text edit CTRL+A: select all
    C,         // for text edit CTRL+C: copy
    V,         // for text edit CTRL+V: paste
    X,         // for text edit CTRL+X: cut
    Y,         // for text edit CTRL+Y: redo
    Z,         // for text edit CTRL+Z: undo
    COUNT,
}

// [BETA] Gamepad/Keyboard directional navigation
// Keyboard: Set io.ConfigFlags |= EnableKeyboard to enable. NewFrame() will automatically fill io.NavInputs[] based on your io.KeyDown[] + io.KeyMap[] arrays.
// Gamepad:  Set io.ConfigFlags |= EnableGamepad to enable. Fill the io.NavInputs[] fields before calling NewFrame(). Note that io.NavInputs[] is cleared by EndFrame().
// Read instructions in imgui.cpp for more details.
export { ImGuiNavInput as NavInput };
export enum ImGuiNavInput
{
    // Gamepad Mapping
    Activate,      // activate / open / toggle / tweak value       // e.g. Circle (PS4), A (Xbox), B (Switch), Space (Keyboard)
    Cancel,        // cancel / close / exit                        // e.g. Cross  (PS4), B (Xbox), A (Switch), Escape (Keyboard)
    Input,         // text input / on-screen keyboard              // e.g. Triang.(PS4), Y (Xbox), X (Switch), Return (Keyboard)
    Menu,          // tap: toggle menu / hold: focus, move, resize // e.g. Square (PS4), X (Xbox), Y (Switch), Alt (Keyboard)
    DpadLeft,      // move / tweak / resize window (w/ PadMenu)    // e.g. D-pad Left/Right/Up/Down (Gamepads), Arrow keys (Keyboard)
    DpadRight,     //
    DpadUp,        //
    DpadDown,      //
    LStickLeft,    // scroll / move window (w/ PadMenu)            // e.g. Left Analog Stick Left/Right/Up/Down
    LStickRight,   //
    LStickUp,      //
    LStickDown,    //
    FocusPrev,     // next window (w/ PadMenu)                     // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)
    FocusNext,     // prev window (w/ PadMenu)                     // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)
    TweakSlow,     // slower tweaks                                // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)
    TweakFast,     // faster tweaks                                // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)

    // [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
    // Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) may be directly reading from io.KeyDown[] instead of io.NavInputs[].
    KeyMenu_,      // toggle menu                                  // = io.KeyAlt
    KeyLeft_,      // move left                                    // = Arrow keys
    KeyRight_,     // move right
    KeyUp_,        // move up
    KeyDown_,      // move down
    COUNT,
    InternalStart_ = KeyMenu_,
}

// [BETA] Gamepad/Keyboard directional navigation flags, stored in io.ConfigFlags
export { ImGuiConfigFlags as ConfigFlags };
export enum ImGuiConfigFlags
{
    EnableKeyboard    = 1 << 0,   // Master keyboard navigation enable flag. NewFrame() will automatically fill io.NavInputs[] based on io.KeyDown[].
    EnableGamepad     = 1 << 1,   // Master gamepad navigation enable flag. This is mostly to instruct your imgui back-end to fill io.NavInputs[].
    MoveMouse         = 1 << 2,   // Request navigation to allow moving the mouse cursor. May be useful on TV/console systems where moving a virtual mouse is awkward. Will update io.MousePos and set io.WantMoveMouse=true. If enabled you MUST honor io.WantMoveMouse requests in your binding, otherwise ImGui will react as if the mouse is jumping around back and forth.
    NoCaptureKeyboard = 1 << 3,    // Do not set the io.WantCaptureKeyboard flag with io.NavActive is set.
}

// Enumeration for PushStyleColor() / PopStyleColor()
export { ImGuiCol as Col };
export enum ImGuiCol {
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
    NavHighlight,          // gamepad/keyboard: current highlighted item
    NavWindowingHighlight, // gamepad/keyboard: when holding NavMenu to focus/move/resize windows
    COUNT,
}

// Enumeration for PushStyleVar() / PopStyleVar() to temporarily modify the ImGuiStyle structure.
// NB: the enum only refers to fields of ImGuiStyle which makes sense to be pushed/popped inside UI code. During initialization, feel free to just poke into ImGuiStyle directly.
// NB: if changing this enum, you need to update the associated internal table GStyleVarInfo[] accordingly. This is where we link enum values to members offset/type.
export { ImGuiStyleVar as StyleVar };
export enum ImGuiStyleVar {
    // Enum name ......................// Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
    Alpha,               // float     Alpha
    WindowPadding,       // ImVec2    WindowPadding
    WindowRounding,      // float     WindowRounding
    WindowBorderSize,    // float     WindowBorderSize
    WindowMinSize,       // ImVec2    WindowMinSize
    WindowTitleAlign,    // ImVec2    WindowTitleAlign
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
    ScrollbarSize,       // float     ScrollbarSize
    ScrollbarRounding,   // float     ScrollbarRounding
    GrabMinSize,         // float     GrabMinSize
    GrabRounding,        // float     GrabRounding
    ButtonTextAlign,     // ImVec2    ButtonTextAlign
    Count_, COUNT = Count_,
}

// Enumeration for ColorEdit3() / ColorEdit4() / ColorPicker3() / ColorPicker4() / ColorButton()
export { ImGuiColorEditFlags as ColorEditFlags };
export enum ImGuiColorEditFlags {
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
    _InputsMask     = RGB | HSV | HEX,
    _DataTypeMask   = Uint8 | Float,
    _PickerMask     = PickerHueWheel | PickerHueBar,
    _OptionsDefault = Uint8 | RGB | PickerHueBar,    // Change application default using SetColorEditOptions()
}

// Enumeration for GetMouseCursor()
export { ImGuiMouseCursor as MouseCursor };
export enum ImGuiMouseCursor {
    None = -1,
    Arrow = 0,
    TextInput,         // When hovering over InputText, etc.
    ResizeAll,         // Unused
    ResizeNS,          // When hovering over an horizontal border
    ResizeEW,          // When hovering over a vertical border or a column
    ResizeNESW,        // When hovering over the bottom-left corner of a window
    ResizeNWSE,        // When hovering over the bottom-right corner of a window
    Count_, COUNT = Count_,
}

// Condition for ImGui::SetWindow***(), SetNextWindow***(), SetNextTreeNode***() functions
// All those functions treat 0 as a shortcut to Always. From the point of view of the user use this as an enum (don't combine multiple values into flags).
export { ImGuiCond as Cond };
export enum ImGuiCond {
    Always        = 1 << 0,   // Set the variable
    Once          = 1 << 1,   // Set the variable once per runtime session (only the first call with succeed)
    FirstUseEver  = 1 << 2,   // Set the variable if the window has no saved data (if doesn't exist in the .ini file)
    Appearing     = 1 << 3,    // Set the variable if the window is appearing after being hidden/inactive (or the first time)
}

export { ImDrawCornerFlags as wCornerFlags };
export enum ImDrawCornerFlags
{
    TopLeft   = 1 << 0, // 0x1
    TopRight  = 1 << 1, // 0x2
    BotLeft   = 1 << 2, // 0x4
    BotRight  = 1 << 3, // 0x8
    Top       = TopLeft | TopRight,   // 0x3
    Bot       = BotLeft | BotRight,   // 0xC
    Left      = TopLeft | BotLeft,    // 0x5
    Right     = TopRight | BotRight,  // 0xA
    All       = 0xF,     // In your function calls you may use ~0 (= all bits sets) instead of All, as a convenience
}

export { ImDrawListFlags as wListFlags };
export enum ImDrawListFlags
{
    AntiAliasedLines = 1 << 0,
    AntiAliasedFill  = 1 << 1,
}

export { ImU32 } from "./bind-imgui";

export { interface_ImVec2 } from "./bind-imgui";
export { reference_ImVec2 } from "./bind-imgui";

export class ImVec2 implements Bind.interface_ImVec2 {
    public static readonly ZERO: Readonly<ImVec2> = new ImVec2(0.0, 0.0);
    public static readonly UNIT: Readonly<ImVec2> = new ImVec2(1.0, 1.0);
    public static readonly UNIT_X: Readonly<ImVec2> = new ImVec2(1.0, 0.0);
    public static readonly UNIT_Y: Readonly<ImVec2> = new ImVec2(0.0, 1.0);

    constructor(public x: number = 0.0, public y: number = 0.0) {}

    public Copy(other: Readonly<Bind.interface_ImVec2>): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    public Equals(other: Readonly<Bind.interface_ImVec2>): boolean {
        if (this.x !== other.x) { return false; }
        if (this.y !== other.y) { return false; }
        return true;
    }
}

export { interface_ImVec4 } from "./bind-imgui";
export { reference_ImVec4 } from "./bind-imgui";

export class ImVec4 implements Bind.interface_ImVec4 {
    public static readonly ZERO: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 0.0);
    public static readonly UNIT: Readonly<ImVec4> = new ImVec4(1.0, 1.0, 1.0, 1.0);
    public static readonly UNIT_X: Readonly<ImVec4> = new ImVec4(1.0, 0.0, 0.0, 0.0);
    public static readonly UNIT_Y: Readonly<ImVec4> = new ImVec4(0.0, 1.0, 0.0, 0.0);
    public static readonly UNIT_Z: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 1.0, 0.0);
    public static readonly UNIT_W: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 1.0);
    public static readonly BLACK: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 1.0);
    public static readonly WHITE: Readonly<ImVec4> = new ImVec4(1.0, 1.0, 1.0, 1.0);

    constructor(public x: number = 0.0, public y: number = 0.0, public z: number = 0.0, public w: number = 1.0) {}

    public Copy(other: Readonly<Bind.interface_ImVec4>): this {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
        return this;
    }

    public Equals(other: Readonly<Bind.interface_ImVec4>): boolean {
        if (this.x !== other.x) { return false; }
        if (this.y !== other.y) { return false; }
        if (this.z !== other.z) { return false; }
        if (this.w !== other.w) { return false; }
        return true;
    }
}

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

// Lightweight std::vector<> like class to avoid dragging dependencies (also: windows implementation of STL with debug enabled is absurdly slow, so let's bypass it so our code runs fast in debug).
// Our implementation does NOT call C++ constructors/destructors. This is intentional and we do not require it. Do not use this class as a straight std::vector replacement in your code!
export class ImVector<T>
{
    public get Size(): number { return this.Data.length; }
    public Data: T[] = [];
    public empty(): boolean { return this.Data.length === 0; }
    public clear(): void { this.Data.length = 0; }
    public pop_back(): T | undefined { return this.Data.pop(); }
    public push_back(value: T): void { this.Data.push(value); }
    // public:
    // int                         Size;
    // int                         Capacity;
    // T*                          Data;

    // typedef T                   value_type;
    // typedef value_type*         iterator;
    // typedef const value_type*   const_iterator;

    // inline ImVector()           { Size = Capacity = 0; Data = NULL; }
    // inline ~ImVector()          { if (Data) ImGui::MemFree(Data); }

    // inline bool                 empty() const                   { return Size == 0; }
    // inline int                  size() const                    { return Size; }
    // inline int                  capacity() const                { return Capacity; }

    // inline value_type&          operator[](int i)               { IM_ASSERT(i < Size); return Data[i]; }
    // inline const value_type&    operator[](int i) const         { IM_ASSERT(i < Size); return Data[i]; }

    // inline void                 clear()                         { if (Data) { Size = Capacity = 0; ImGui::MemFree(Data); Data = NULL; } }
    // inline iterator             begin()                         { return Data; }
    // inline const_iterator       begin() const                   { return Data; }
    // inline iterator             end()                           { return Data + Size; }
    // inline const_iterator       end() const                     { return Data + Size; }
    // inline value_type&          front()                         { IM_ASSERT(Size > 0); return Data[0]; }
    // inline const value_type&    front() const                   { IM_ASSERT(Size > 0); return Data[0]; }
    // inline value_type&          back()                          { IM_ASSERT(Size > 0); return Data[Size - 1]; }
    // inline const value_type&    back() const                    { IM_ASSERT(Size > 0); return Data[Size - 1]; }
    // inline void                 swap(ImVector<T>& rhs)          { int rhs_size = rhs.Size; rhs.Size = Size; Size = rhs_size; int rhs_cap = rhs.Capacity; rhs.Capacity = Capacity; Capacity = rhs_cap; value_type* rhs_data = rhs.Data; rhs.Data = Data; Data = rhs_data; }

    // inline int                  _grow_capacity(int size) const  { int new_capacity = Capacity ? (Capacity + Capacity/2) : 8; return new_capacity > size ? new_capacity : size; }

    // inline void                 resize(int new_size)            { if (new_size > Capacity) reserve(_grow_capacity(new_size)); Size = new_size; }
    // inline void                 resize(int new_size, const T& v){ if (new_size > Capacity) reserve(_grow_capacity(new_size)); if (new_size > Size) for (int n = Size; n < new_size; n++) Data[n] = v; Size = new_size; }
    // inline void                 reserve(int new_capacity)
    // {
    //     if (new_capacity <= Capacity)
    //         return;
    //     T* new_data = (value_type*)ImGui::MemAlloc((size_t)new_capacity * sizeof(T));
    //     if (Data)
    //         memcpy(new_data, Data, (size_t)Size * sizeof(T));
    //     ImGui::MemFree(Data);
    //     Data = new_data;
    //     Capacity = new_capacity;
    // }

    // inline void                 push_back(const value_type& v)  { if (Size == Capacity) reserve(_grow_capacity(Size + 1)); Data[Size++] = v; }
    // inline void                 pop_back()                      { IM_ASSERT(Size > 0); Size--; }
    // inline void                 push_front(const value_type& v) { if (Size == 0) push_back(v); else insert(Data, v); }

    // inline iterator             erase(const_iterator it)                        { IM_ASSERT(it >= Data && it < Data+Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(value_type)); Size--; return Data + off; }
    // inline iterator             insert(const_iterator it, const value_type& v)  { IM_ASSERT(it >= Data && it <= Data+Size); const ptrdiff_t off = it - Data; if (Size == Capacity) reserve(_grow_capacity(Size + 1)); if (off < (int)Size) memmove(Data + off + 1, Data + off, ((size_t)Size - (size_t)off) * sizeof(value_type)); Data[off] = v; Size++; return Data + off; }
    // inline bool                 contains(const value_type& v) const             { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data++ == v) return true; return false; }
}

// Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
export class ImGuiTextFilter
{
    // struct TextRange
    // {
    //     const char* b;
    //     const char* e;

    //     TextRange() { b = e = NULL; }
    //     TextRange(const char* _b, const char* _e) { b = _b; e = _e; }
    //     const char* begin() const { return b; }
    //     const char* end() const { return e; }
    //     bool empty() const { return b == e; }
    //     char front() const { return *b; }
    //     static bool is_blank(char c) { return c == ' ' || c == '\t'; }
    //     void trim_blanks() { while (b < e && is_blank(*b)) b++; while (e > b && is_blank(*(e-1))) e--; }
    //     IMGUI_API void split(char separator, ImVector<TextRange>& out);
    // };

    // char                InputBuf[256];
    public InputBuf: ImStringBuffer = new ImStringBuffer(256);
    // ImVector<TextRange> Filters;
    // int                 CountGrep;
    public CountGrep: number = 0;

    // IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
    constructor(default_filter: string = "") {
        if (default_filter)
        {
            // ImStrncpy(InputBuf, default_filter, IM_ARRAYSIZE(InputBuf));
            this.InputBuf.buffer = default_filter;
            this.Build();
        }
        else
        {
            // InputBuf[0] = 0;
            this.InputBuf.buffer = "";
            this.CountGrep = 0;
        }
    }
    // IMGUI_API bool      Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f);    // Helper calling InputText+Build
    public Draw(label: string = "Filter (inc,-exc)", width: number = 0.0): boolean {
        if (width !== 0.0)
            bind.PushItemWidth(width);
        const value_changed: boolean = InputText(label, this.InputBuf, IM_ARRAYSIZE(this.InputBuf));
        if (width !== 0.0)
            bind.PopItemWidth();
        if (value_changed)
            this.Build();
        return value_changed;
    }
    // IMGUI_API bool      PassFilter(const char* text, const char* text_end = NULL) const;
    public PassFilter(text: string, text_end: number | null = null): boolean {
        // if (Filters.empty())
        //     return true;

        // if (text == NULL)
        //     text = "";

        // for (int i = 0; i != Filters.Size; i++)
        // {
        //     const TextRange& f = Filters[i];
        //     if (f.empty())
        //         continue;
        //     if (f.front() == '-')
        //     {
        //         // Subtract
        //         if (ImStristr(text, text_end, f.begin()+1, f.end()) != NULL)
        //             return false;
        //     }
        //     else
        //     {
        //         // Grep
        //         if (ImStristr(text, text_end, f.begin(), f.end()) != NULL)
        //             return true;
        //     }
        // }

        // Implicit * grep
        if (this.CountGrep === 0)
            return true;

        return false;
    }
    // IMGUI_API void      Build();
    public Build(): void {
        // Filters.resize(0);
        // TextRange input_range(InputBuf, InputBuf+strlen(InputBuf));
        // input_range.split(',', Filters);

        this.CountGrep = 0;
        // for (int i = 0; i != Filters.Size; i++)
        // {
        //     Filters[i].trim_blanks();
        //     if (Filters[i].empty())
        //         continue;
        //     if (Filters[i].front() != '-')
        //         CountGrep += 1;
        // }
    }
    // void                Clear() { InputBuf[0] = 0; Build(); }
    public Clear(): void { this.InputBuf.buffer = ""; this.Build(); }
    // bool                IsActive() const { return !Filters.empty(); }
    public IsActive(): boolean { return false; }
}

// Helper: Text buffer for logging/accumulating text
export class ImGuiTextBuffer
{
    // ImVector<char>      Buf;
    public Buf: string = "";
    public begin(): string { return this.Buf; }
    public size(): number { return this.Buf.length; }
    public clear(): void { this.Buf = ""; }
    public append(text: string): void { this.Buf += text; }

    // ImGuiTextBuffer()   { Buf.push_back(0); }
    // inline char         operator[](int i) { return Buf.Data[i]; }
    // const char*         begin() const { return &Buf.front(); }
    // const char*         end() const { return &Buf.back(); }      // Buf is zero-terminated, so end() will point on the zero-terminator
    // int                 size() const { return Buf.Size - 1; }
    // bool                empty() { return Buf.Size <= 1; }
    // void                clear() { Buf.clear(); Buf.push_back(0); }
    // void                reserve(int capacity) { Buf.reserve(capacity); }
    // const char*         c_str() const { return Buf.Data; }
    // IMGUI_API void      appendf(const char* fmt, ...) IM_FMTARGS(2);
    // IMGUI_API void      appendfv(const char* fmt, va_list args) IM_FMTLIST(2);
}

// Helper: Simple Key->value storage
// Typically you don't have to worry about this since a storage is held within each Window.
// We use it to e.g. store collapse state for a tree (Int 0/1), store color edit options.
// This is optimized for efficient reading (dichotomy into a contiguous buffer), rare writing (typically tied to user interactions)
// You can use it as custom user storage for temporary values. Declare your own storage if, for example:
// - You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
// - You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
// Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
export class ImGuiStorage
{
    // struct Pair
    // {
    //     ImGuiID key;
    //     union { int val_i; float val_f; void* val_p; };
    //     Pair(ImGuiID _key, int _val_i)   { key = _key; val_i = _val_i; }
    //     Pair(ImGuiID _key, float _val_f) { key = _key; val_f = _val_f; }
    //     Pair(ImGuiID _key, void* _val_p) { key = _key; val_p = _val_p; }
    // };
    // ImVector<Pair>      Data;

    // - Get***() functions find pair, never add/allocate. Pairs are sorted so a query is O(log N)
    // - Set***() functions find pair, insertion on demand if missing.
    // - Sorted insertion is costly, paid once. A typical frame shouldn't need to insert any new pair.
    // void                Clear() { Data.clear(); }
    // IMGUI_API int       GetInt(ImGuiID key, int default_val = 0) const;
    // IMGUI_API void      SetInt(ImGuiID key, int val);
    // IMGUI_API bool      GetBool(ImGuiID key, bool default_val = false) const;
    // IMGUI_API void      SetBool(ImGuiID key, bool val);
    // IMGUI_API float     GetFloat(ImGuiID key, float default_val = 0.0f) const;
    // IMGUI_API void      SetFloat(ImGuiID key, float val);
    // IMGUI_API void*     GetVoidPtr(ImGuiID key) const; // default_val is NULL
    // IMGUI_API void      SetVoidPtr(ImGuiID key, void* val);

    // - Get***Ref() functions finds pair, insert on demand if missing, return pointer. Useful if you intend to do Get+Set.
    // - References are only valid until a new value is added to the storage. Calling a Set***() function or a Get***Ref() function invalidates the pointer.
    // - A typical use case where this is convenient for quick hacking (e.g. add storage during a live Edit&Continue session if you can't modify existing struct)
    //      float* pvar = ImGui::GetFloatRef(key); ImGui::SliderFloat("var", pvar, 0, 100.0f); some_var += *pvar;
    // IMGUI_API int*      GetIntRef(ImGuiID key, int default_val = 0);
    // IMGUI_API bool*     GetBoolRef(ImGuiID key, bool default_val = false);
    // IMGUI_API float*    GetFloatRef(ImGuiID key, float default_val = 0.0f);
    // IMGUI_API void**    GetVoidPtrRef(ImGuiID key, void* default_val = NULL);

    // Use on your own storage if you know only integer are being stored (open/close all tree nodes)
    // IMGUI_API void      SetAllInt(int val);

    // For quicker full rebuild of a storage (instead of an incremental one), you may add all your contents and then sort once.
    // IMGUI_API void      BuildSortByKey();
}

// Data payload for Drag and Drop operations
export class ImGuiPayload
{
    // Members
    // const void*     Data;               // Data (copied and owned by dear imgui)
    // int             DataSize;           // Data size

    // [Internal]
    // ImGuiID         SourceId;           // Source item id
    // ImGuiID         SourceParentId;     // Source parent id (if available)
    // int             DataFrameCount;     // Data timestamp
    // char            DataType[12 + 1];    // Data type tag (short user-supplied string, 12 characters max)
    // bool            Preview;            // Set when AcceptDragDropPayload() was called and mouse has been hovering the target item (nb: handle overlapping drag targets)
    // bool            Delivery;           // Set when AcceptDragDropPayload() was called and mouse button is released over the target item.

    // ImGuiPayload()  { Clear(); }
    // void Clear()    { SourceId = SourceParentId = 0; Data = NULL; DataSize = 0; memset(DataType, 0, sizeof(DataType)); DataFrameCount = -1; Preview = Delivery = false; }
    // bool IsDataType(const char* type) const { return DataFrameCount != -1 && strcmp(type, DataType) == 0; }
    // bool IsPreview() const                  { return Preview; }
    // bool IsDelivery() const                 { return Delivery; }
}

// Helpers macros to generate 32-bits encoded colors
export const IM_COL32_R_SHIFT: number = config.IMGUI_USE_BGRA_PACKED_COLOR ? 16 : 0;
export const IM_COL32_G_SHIFT: number = 8;
export const IM_COL32_B_SHIFT: number = config.IMGUI_USE_BGRA_PACKED_COLOR ? 0 : 16;
export const IM_COL32_A_SHIFT: number = 24;
export const IM_COL32_A_MASK: number = 0xFF000000;
export function IM_COL32(R: number, G: number, B: number, A: number = 255): number {
    return ((A << IM_COL32_A_SHIFT) | (B << IM_COL32_B_SHIFT) | (G << IM_COL32_G_SHIFT) | (R << IM_COL32_R_SHIFT)) >>> 0;
}
export const IM_COL32_WHITE: number = IM_COL32(255, 255, 255, 255);  // Opaque white = 0xFFFFFFFF
export const IM_COL32_BLACK: number = IM_COL32(0, 0, 0, 255);        // Opaque black
export const IM_COL32_BLACK_TRANS: number = IM_COL32(0, 0, 0, 0);    // Transparent black = 0x00000000

// ImColor() helper to implicity converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
// Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
// **Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
// **None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
export class ImColor
{
    // ImVec4              Value;
    public Value: ImVec4 = new ImVec4();

    // ImColor()                                                       { Value.x = Value.y = Value.z = Value.w = 0.0f; }
    // ImColor(int r, int g, int b, int a = 255)                       { float sc = 1.0f/255.0f; Value.x = (float)r * sc; Value.y = (float)g * sc; Value.z = (float)b * sc; Value.w = (float)a * sc; }
    // ImColor(ImU32 rgba)                                             { float sc = 1.0f/255.0f; Value.x = (float)((rgba>>IM_COL32_R_SHIFT)&0xFF) * sc; Value.y = (float)((rgba>>IM_COL32_G_SHIFT)&0xFF) * sc; Value.z = (float)((rgba>>IM_COL32_B_SHIFT)&0xFF) * sc; Value.w = (float)((rgba>>IM_COL32_A_SHIFT)&0xFF) * sc; }
    // ImColor(float r, float g, float b, float a = 1.0f)              { Value.x = r; Value.y = g; Value.z = b; Value.w = a; }
    // ImColor(const ImVec4& col)                                      { Value = col; }
    constructor(r: number | Bind.ImU32 | Readonly<Bind.interface_ImVec4> = 0.0, g: number = 0.0, b: number = 0.0, a: number = 1.0) {
        if (typeof(r) === "number") {
            if (r > 255 && g === 0.0 && b === 0.0 && a === 1.0) {
                this.Value.x = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_R_SHIFT) & 0xFF) / 255));
                this.Value.y = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_G_SHIFT) & 0xFF) / 255));
                this.Value.z = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_B_SHIFT) & 0xFF) / 255));
                this.Value.w = Math.max(0.0, Math.min(1.0, ((r >> IM_COL32_A_SHIFT) & 0xFF) / 255));
            } else if (r <= 1.0 && g <= 1.0 && b <= 1.0 && a <= 1.0) {
                this.Value.x = Math.max(0.0, r);
                this.Value.y = Math.max(0.0, g);
                this.Value.z = Math.max(0.0, b);
                this.Value.w = Math.max(0.0, a);
            } else {
                this.Value.x = Math.max(0.0, Math.min(1.0, r / 255));
                this.Value.y = Math.max(0.0, Math.min(1.0, g / 255));
                this.Value.z = Math.max(0.0, Math.min(1.0, b / 255));
                if (a <= 1.0) {
                    this.Value.w = Math.max(0.0, a);
                } else {
                    this.Value.w = Math.max(0.0, Math.min(1.0, a / 255));
                }
            }
        } else {
            this.Value.Copy(r);
        }
    }
    // inline operator ImU32() const                                   { return ImGui::ColorConvertFloat4ToU32(Value); }
    public toImU32(): Bind.ImU32 { return bind.ColorConvertFloat4ToU32(this.Value); }
    // inline operator ImVec4() const                                  { return Value; }
    public toImVec4(): ImVec4 { return this.Value; }

    // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
    // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
    public SetHSV(h: number, s: number, v: number, a: number = 1.0): void {
        const ref_r: Bind.ImScalar<number> = [ this.Value.x ];
        const ref_g: Bind.ImScalar<number> = [ this.Value.y ];
        const ref_b: Bind.ImScalar<number> = [ this.Value.z ];
        bind.ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
        this.Value.x = ref_r[0];
        this.Value.y = ref_g[0];
        this.Value.z = ref_b[0];
        this.Value.w = a;
    }
    // static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r,g,b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r,g,b,a); }
    public static HSV(h: number, s: number, v: number, a: number = 1.0): ImColor {
        const color = new ImColor();
        color.SetHSV(h, s, v, a);
        return color;
    }
}

export const ImGuiTextEditDefaultSize: number = 128;

export type ImGuiTextEditCallback = (data: ImGuiTextEditCallbackData) => number;

// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
export class ImGuiTextEditCallbackData {
    constructor(public native: Bind.ImGuiTextEditCallbackData, public readonly UserData: any) {}
    public delete(): void { if (this.native) { this.native.delete(); delete this.native; } }

    // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
    public get EventFlag(): ImGuiInputTextFlags { return this.native.EventFlag; }
    // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    public get Flags(): ImGuiInputTextFlags { return this.native.Flags; }
    // void*               UserData;       // What user passed to InputText()      // Read-only
    // public get UserData(): any { return this.native.UserData; }
    // bool                ReadOnly;       // Read-only mode                       // Read-only
    public get ReadOnly(): boolean { return this.native.ReadOnly; }

    // CharFilter event:
    // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
    public get EventChar(): Bind.ImWchar { return this.native.EventChar; }
    public set EventChar(value: Bind.ImWchar) { this.native.EventChar = value; }

    // Completion,History,Always events:
    // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
    // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
    public get EventKey(): ImGuiKey { return this.native.EventKey; }
    // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
    public get Buf(): string { return this.native.getBuf(); }
    public set Buf(value: string) { this.native.setBuf(value); }
    // int                 BufTextLen;     // Current text length in bytes         // Read-write
    public get BufTextLen(): number { return this.native.BufTextLen; }
    public set BufTextLen(value: number) { this.native.BufTextLen = value; }
    // int                 BufSize;        // Maximum text length in bytes         // Read-only
    public get BufSize(): number { return this.native.BufSize; }
    // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
    public set BufDirty(value: boolean) { this.native.BufDirty = value; }
    // int                 CursorPos;      //                                      // Read-write
    public get CursorPos(): number { return this.native.CursorPos; }
    public set CursorPos(value: number) { this.native.CursorPos = value; }
    // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
    public get SelectionStart(): number { return this.native.SelectionStart; }
    public set SelectionStart(value: number) { this.native.SelectionStart = value; }
    // int                 SelectionEnd;   //                                      // Read-write
    public get SelectionEnd(): number { return this.native.SelectionEnd; }
    public set SelectionEnd(value: number) { this.native.SelectionEnd = value; }

    // NB: Helper functions for text manipulation. Calling those function loses selection.
    // IMGUI_API void    DeleteChars(int pos, int bytes_count);
    public DeleteChars(pos: number, bytes_count: number): void { return this.native.DeleteChars(pos, bytes_count); }
    // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
    public InsertChars(pos: number, text: string, text_end: number | null = null): void { return this.native.InsertChars(pos, text, text_end); }
    // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
    public HasSelection(): boolean { return this.native.HasSelection(); }
}

export type ImGuiSizeConstraintCallback = (data: ImGuiSizeCallbackData) => void;

// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
export class ImGuiSizeCallbackData {
    constructor(public native: Bind.ImGuiSizeCallbackData) {}
    public delete(): void { if (this.native) { this.native.delete(); delete this.native; } }

    get UserData(): any { return this.native.UserData; }
    get Pos(): Readonly<Bind.interface_ImVec2> { return this.native.getPos(); }
    get CurrentSize(): Readonly<Bind.interface_ImVec2> { return this.native.getCurrentSize(); }
    get DesiredSize(): Bind.interface_ImVec2 { return this.native.getDesiredSize(); }
}

export class ImGuiListClipper
{
    private native: Bind.ImGuiListClipper;

    public get StartPosY(): number { return this.native.StartPosY; }
    public get ItemsHeight(): number { return this.native.ItemsHeight; }
    public get ItemsCount(): number { return this.native.ItemsCount; }
    public get StepNo(): number { return this.native.StepNo; }
    public get DisplayStart(): number { return this.native.DisplayStart; }
    public get DisplayEnd(): number { return this.native.DisplayEnd; }

    // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
    // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
    // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
    // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
    constructor(items_count: number = -1, items_height: number = -1.0) {
        this.native = new bind.ImGuiListClipper(items_count, items_height);
    }
    // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
    public delete(): void {
        if (this.native) {
            this.native.delete();
            delete this.native;
        }
    }

    // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
    public Step(): boolean {
        if (!this.native) { throw new Error(); }
        const busy: boolean = this.native.Step();
        if (!busy) {
            this.delete();
        }
        return busy;
    }
    // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
    public Begin(items_count: number, items_height: number): void {
        if (!this.native) {
            this.native = new bind.ImGuiListClipper(items_count, items_height);
        }
        this.native.Begin(items_count, items_height);
    }
    // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
    public End(): void {
        if (!this.native) { throw new Error(); }
        this.native.End();
        this.delete();
    }
}

//-----------------------------------------------------------------------------
// Draw List
// Hold a series of drawing commands. The user provides a renderer for ImDrawData which essentially contains an array of ImDrawList.
//-----------------------------------------------------------------------------

// Draw callbacks for advanced uses.
// NB- You most likely do NOT need to use draw callbacks just to create your own widget or customized UI rendering (you can poke into the draw list for that)
// Draw callback may be useful for example, A) Change your GPU render state, B) render a complex 3D scene inside a UI element (without an intermediate texture/render target), etc.
// The expected behavior from your rendering function is 'if (cmd.UserCallback != NULL) cmd.UserCallback(parent_list, cmd); else RenderTriangles()'
// typedef void (*ImDrawCallback)(const ImDrawList* parent_list, const ImDrawCmd* cmd);
export type ImDrawCallback = (parent_list: Readonly<ImDrawList>, cmd: Readonly<ImDrawCmd>) => void;

// Typically, 1 command = 1 GPU draw call (unless command is a callback)
export class ImDrawCmd
{
    constructor(public readonly native: Bind.reference_ImDrawCmd) {}

    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    get ElemCount(): number { return this.native.ElemCount; }
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    get ClipRect(): Readonly<Bind.reference_ImVec4> { return this.native.getClipRect(); }
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    get TextureId(): ImTextureID | null {
        return ImGuiContext.getTexture(this.native.TextureId);
    }
    // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
    public readonly UserCallback: ImDrawCallback | null = null; // TODO
    // void*           UserCallbackData;       // The draw callback code can access this.
    public readonly UserCallbackData: any = null; // TODO

    // ImDrawCmd() { ElemCount = 0; ClipRect.x = ClipRect.y = ClipRect.z = ClipRect.w = 0.0f; TextureId = NULL; UserCallback = NULL; UserCallbackData = NULL; }
}

// Vertex index (override with '#define ImDrawIdx unsigned int' inside in imconfig.h)
// #ifndef ImDrawIdx
// typedef unsigned short ImDrawIdx;
// #endif
export const ImDrawIdxSize = bind.ImDrawIdxSize;
export type ImDrawIdx = number;

// Vertex layout
// #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
export const ImDrawVertSize = bind.ImDrawVertSize;
export const ImDrawVertPosOffset = bind.ImDrawVertPosOffset;
export const ImDrawVertUVOffset = bind.ImDrawVertUVOffset;
export const ImDrawVertColOffset = bind.ImDrawVertColOffset;
export class ImDrawVert
{
    // ImVec2  pos;
    public pos: Float32Array;
    // ImVec2  uv;
    public uv: Float32Array;
    // ImU32   col;
    public col: Uint32Array;

    constructor(buffer: ArrayBuffer, byteOffset: number = 0) {
        this.pos = new Float32Array(buffer, byteOffset + bind.ImDrawVertPosOffset, 2);
        this.uv = new Float32Array(buffer, byteOffset + bind.ImDrawVertUVOffset, 2);
        this.col = new Uint32Array(buffer, byteOffset + bind.ImDrawVertColOffset, 1);
    }
}
// #else
// You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
// The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
// The type has to be described within the macro (you can either declare the struct or use a typedef)
// NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
// IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
// #endif

// Draw channels are used by the Columns API to "split" the render list into different channels while building, so items of each column can be batched together.
// You can also use them to simulate drawing layers and submit primitives in a different order than how they will be rendered.
export class ImDrawChannel
{
    // ImVector<ImDrawCmd>     CmdBuffer;
    // ImVector<ImDrawIdx>     IdxBuffer;
}

export class ImDrawListSharedData
{
    constructor(public readonly native: Bind.reference_ImDrawListSharedData) {}
}

// Draw command list
// This is the low-level list of polygons that ImGui functions are filling. At the end of the frame, all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
// Each ImGui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to access the current window draw list and draw custom primitives.
// You can interleave normal ImGui:: calls and adding primitives to the current draw list.
// All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), however you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
// Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
export class ImDrawList
{
    constructor(public readonly native: Bind.reference_ImDrawList) {}

    public IterateDrawCmds(callback: (draw_cmd: ImDrawCmd, ElemStart: number) => void): void {
        this.native.IterateDrawCmds((draw_cmd: Bind.reference_ImDrawCmd, ElemStart: number): void => {
            callback(new ImDrawCmd(draw_cmd), ElemStart);
        });
    }

    // This is what you have to render
    // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
    // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
    get IdxBuffer(): Uint8Array { return this.native.IdxBuffer; }
    // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
    get VtxBuffer(): Uint8Array { return this.native.VtxBuffer; }

    // [Internal, used while building lists]
    // ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.
    get Flags(): ImDrawListFlags { return this.native.Flags; }
    set Flags(value: ImDrawListFlags) { this.native.Flags = value; }
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
    public PushClipRect(clip_rect_min: Readonly<Bind.interface_ImVec2>, clip_rect_max: Readonly<Bind.interface_ImVec2>, intersect_with_current_clip_rect: boolean = false): void {
        this.native.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    // IMGUI_API void  PushClipRectFullScreen();
    public PushClipRectFullScreen(): void { this.native.PushClipRectFullScreen(); }
    // IMGUI_API void  PopClipRect();
    public PopClipRect(): void { this.native.PopClipRect(); }
    // IMGUI_API void  PushTextureID(ImTextureID texture_id);
    public PushTextureID(texture_id: ImTextureID): void {
        this.native.PushTextureID(ImGuiContext.setTexture(texture_id));
    }
    // IMGUI_API void  PopTextureID();
    public PopTextureID(): void { this.native.PopTextureID(); }
    // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    public GetClipRectMin(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
        return this.native.GetClipRectMin(out);
    }
    // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }
    public GetClipRectMax(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
        return this.native.GetClipRectMax(out);
    }

    // Primitives
    // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
    public AddLine(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness: number = 1.0): void {
        this.native.AddLine(a, b, col, thickness);
    }
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    public AddRect(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding: number = 0.0, rounding_corners_flags: ImDrawCornerFlags = ImDrawCornerFlags.All, thickness: number = 1.0): void {
        this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
    }
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    public AddRectFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding: number = 0.0, rounding_corners_flags: ImDrawCornerFlags = ImDrawCornerFlags.All): void {
        this.native.AddRectFilled(a, b, col, rounding, rounding_corners_flags);
    }
    // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    public AddRectFilledMultiColor(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col_upr_left: Bind.ImU32, col_upr_right: Bind.ImU32, col_bot_right: Bind.ImU32, col_bot_left: Bind.ImU32): void {
        this.native.AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
    }
    // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
    public AddQuad(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness: number = 1.0): void {
        this.native.AddQuad(a, b, c, d, col, thickness);
    }
    // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
    public AddQuadFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void {
        this.native.AddQuadFilled(a, b, c, d, col);
    }
    // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
    public AddTriangle(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness: number = 1.0): void {
        this.native.AddTriangle(a, b, c, col, thickness);
    }
    // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
    public AddTriangleFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void {
        this.native.AddTriangleFilled(a, b, c, col);
    }
    // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
    public AddCircle(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments: number = 12, thickness: number = 1.0): void {
        this.native.AddCircle(centre, radius, col, num_segments, thickness);
    }
    // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
    public AddCircleFilled(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments: number = 12): void {
        this.native.AddCircleFilled(centre, radius, col, num_segments);
    }
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    public AddText(pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, text_begin: string, text_end: number | null = null): void {
        this.native.AddText(pos, col, text_begin, text_end);
    }
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    public AddText_Font(font: ImFont, font_size: number, pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, text_begin: string, text_end: number | null = null, wrap_width: number = 0.0, cpu_fine_clip_rect: Readonly<Bind.interface_ImVec4> | null = null): void {
        this.native.AddText_Font(font.native, font_size, pos, col, text_begin, text_end, wrap_width, cpu_fine_clip_rect);
    }
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    public AddImage(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, uv_b: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT, col: Bind.ImU32 = 0xFFFFFFFF): void {
        this.native.AddImage(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col);
    }
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    public AddImageQuad(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, uv_b: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT_X, uv_c: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT, uv_d: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT_Y, col: Bind.ImU32 = 0xFFFFFFFF): void {
        this.native.AddImageQuad(ImGuiContext.setTexture(user_texture_id), a, b, c, d, uv_a, uv_b, uv_c, uv_d, col);
    }
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
    public AddImageRounded(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding: number, rounding_corners: ImDrawCornerFlags = ImDrawCornerFlags.All): void {
        this.native.AddImageRounded(ImGuiContext.setTexture(user_texture_id), a, b, uv_a, uv_b, col, rounding, rounding_corners);
    }
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    public AddPolyline(points: Array<Readonly<Bind.interface_ImVec2>>, num_points: number, col: Bind.ImU32, closed: boolean, thickness: number): void {
        this.native.AddPolyline(points, num_points, col, closed, thickness);
    }
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    public AddConvexPolyFilled(points: Array<Readonly<Bind.interface_ImVec2>>, num_points: number, col: Bind.ImU32): void {
        this.native.AddConvexPolyFilled(points, num_points, col);
    }
    // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    public AddBezierCurve(pos0: Readonly<Bind.interface_ImVec2>, cp0: Readonly<Bind.interface_ImVec2>, cp1: Readonly<Bind.interface_ImVec2>, pos1: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness: number = 1.0, num_segments: number = 0): void {
        this.native.AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness, num_segments);
    }

    // Stateful path API, add points then finish with PathFill() or PathStroke()
    // inline    void  PathClear()                                                 { _Path.resize(0); }
    public PathClear(): void { this.native.PathClear(); }
    // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
    public PathLineTo(pos: Readonly<Bind.interface_ImVec2>): void { this.native.PathLineTo(pos); }
    // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
    public PathLineToMergeDuplicate(pos: Readonly<Bind.interface_ImVec2>): void { this.native.PathLineToMergeDuplicate(pos); }
    // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
    public PathFillConvex(col: Bind.ImU32): void { this.native.PathFillConvex(col); }
    // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
    public PathStroke(col: Bind.ImU32, closed: boolean, thickness: number = 1.0): void { this.native.PathStroke(col, closed, thickness); }
    // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
    public PathArcTo(centre: Readonly<Bind.interface_ImVec2>, radius: number, a_min: number, a_max: number, num_segments: number = 10): void { this.native.PathArcTo(centre, radius, a_min, a_max, num_segments); }
    // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
    public PathArcToFast(centre: Readonly<Bind.interface_ImVec2>, radius: number, a_min_of_12: number, a_max_of_12: number): void { this.native.PathArcToFast(centre, radius, a_min_of_12, a_max_of_12); }
    // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
    public PathBezierCurveTo(p1: Readonly<Bind.interface_ImVec2>, p2: Readonly<Bind.interface_ImVec2>, p3: Readonly<Bind.interface_ImVec2>, num_segments: number = 0): void { this.native.PathBezierCurveTo(p1, p2, p3, num_segments); }
    // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);
    public PathRect(rect_min: Readonly<Bind.interface_ImVec2>, rect_max: Readonly<Bind.interface_ImVec2>, rounding: number = 0.0, rounding_corners_flags: ImDrawCornerFlags = ImDrawCornerFlags.All): void { this.native.PathRect(rect_min, rect_max, rounding, rounding_corners_flags); }

    // Channels
    // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
    // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
    // IMGUI_API void  ChannelsSplit(int channels_count);
    public ChannelsSplit(channels_count: number): void { this.native.ChannelsSplit(channels_count); }
    // IMGUI_API void  ChannelsMerge();
    public ChannelsMerge(): void { this.native.ChannelsMerge(); }
    // IMGUI_API void  ChannelsSetCurrent(int channel_index);
    public ChannelsSetCurrent(channel_index: number): void { this.native.ChannelsSetCurrent(channel_index); }

    // Advanced
    // IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
    public AddCallback(callback: ImDrawCallback, callback_data: any): void {
        const _callback: Bind.ImDrawCallback = (parent_list: Readonly<Bind.reference_ImDrawList>, draw_cmd: Readonly<Bind.reference_ImDrawCmd>): void => {
            callback(new ImDrawList(parent_list), new ImDrawCmd(draw_cmd));
        };
        this.native.AddCallback(_callback, callback_data);
    }
    // IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
    public AddDrawCmd(): void { this.native.AddDrawCmd(); }

    // Internal helpers
    // NB: all primitives needs to be reserved via PrimReserve() beforehand!
    // IMGUI_API void  Clear();
    public Clear(): void { this.native.Clear(); }
    // IMGUI_API void  ClearFreeMemory();
    public ClearFreeMemory(): void { this.native.ClearFreeMemory(); }
    // IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
    public PrimReserve(idx_count: number, vtx_count: number): void { this.native.PrimReserve(idx_count, vtx_count); }
    // IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
    public PrimRect(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void { this.native.PrimRect(a, b, col); }
    // IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
    public PrimRectUV(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void { this.native.PrimRectUV(a, b, uv_a, uv_b, col); }
    // IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
    public PrimQuadUV(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, uv_c: Readonly<Bind.interface_ImVec2>, uv_d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void { this.native.PrimQuadUV(a, b, c, d, uv_a, uv_b, uv_c, uv_d, col); }
    // inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col){ _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
    public PrimWriteVtx(pos: Readonly<Bind.interface_ImVec2>, uv: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void { this.native.PrimWriteVtx(pos, uv, col); }
    // inline    void  PrimWriteIdx(ImDrawIdx idx)                                 { *_IdxWritePtr = idx; _IdxWritePtr++; }
    public PrimWriteIdx(idx: ImDrawIdx): void { this.native.PrimWriteIdx(idx); }
    // inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)     { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); }
    public PrimVtx(pos: Readonly<Bind.interface_ImVec2>, uv: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void { this.native.PrimVtx(pos, uv, col); }
    // IMGUI_API void  UpdateClipRect();
    public UpdateClipRect(): void { this.native.UpdateClipRect(); }
    // IMGUI_API void  UpdateTextureID();
    public UpdateTextureID(): void { this.native.UpdateTextureID(); }
}

// All draw data to render an ImGui frame
export class ImDrawData
{
    constructor(public readonly native: Bind.reference_ImDrawData) {}

    public IterateDrawLists(callback: (draw_list: ImDrawList) => void): void {
        this.native.IterateDrawLists((draw_list: Bind.reference_ImDrawList): void => {
            callback(new ImDrawList(draw_list));
        });
    }

    // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
    get Valid(): boolean { return this.native.Valid; }
    // ImDrawList**    CmdLists;
    // int             CmdListsCount;
    get CmdListsCount(): number { return this.native.CmdListsCount; }
    // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
    get TotalVtxCount(): number { return this.native.TotalVtxCount; }
    // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
    get TotalIdxCount(): number { return this.native.TotalIdxCount; }

    // Functions
    // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
    // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    public DeIndexAllBuffers(): void { this.native.DeIndexAllBuffers(); }
    // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    public ScaleClipRects(sc: Readonly<Bind.interface_ImVec2>): void {
        this.native.ScaleClipRects(sc);
    }
}

export class ImFontConfig
{
    // void*           FontData;                   //          // TTF/OTF data
    // int             FontDataSize;               //          // TTF/OTF data size
    // bool            FontDataOwnedByAtlas;       // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
    // int             FontNo;                     // 0        // Index of font within TTF/OTF file
    // float           SizePixels;                 //          // Size in pixels for rasterizer.
    // int             OversampleH, OversampleV;   // 3, 1     // Rasterize at higher quality for sub-pixel positioning. We don't use sub-pixel positions on the Y axis.
    // bool            PixelSnapH;                 // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
    // ImVec2          GlyphExtraSpacing;          // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
    // ImVec2          GlyphOffset;                // 0, 0     // Offset all glyphs from this font input.
    // const ImWchar*  GlyphRanges;                // NULL     // Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list). THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE.
    // bool            MergeMode;                  // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
    // unsigned int    RasterizerFlags;            // 0x00     // Settings for custom font rasterizer (e.g. ImGuiFreeType). Leave as zero if you aren't using one.
    // float           RasterizerMultiply;         // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.

    // [Internal]
    // char            Name[32];                               // Name (strictly to ease debugging)
    // ImFont*         DstFont;

    // IMGUI_API ImFontConfig();
}

// struct ImFontGlyph
export class ImFontGlyph
{
    // ImWchar         Codepoint;          // 0x0000..0xFFFF
    // float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
    // float           X0, Y0, X1, Y1;     // Glyph corners
    // float           U0, V0, U1, V1;     // Texture coordinates
}

export enum ImFontAtlasFlags
{
    NoPowerOfTwoHeight = 1 << 0,   // Don't round the height to next power of two
    NoMouseCursors     = 1 << 1,    // Don't build software mouse cursors into the atlas
}

// Load and rasterize multiple TTF/OTF fonts into a same texture.
// Sharing a texture for multiple fonts allows us to reduce the number of draw calls during rendering.
// We also add custom graphic data into the texture that serves for ImGui.
//  1. (Optional) Call AddFont*** functions. If you don't call any, the default font will be loaded for you.
//  2. Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
//  3. Upload the pixels data into a texture within your graphics system.
//  4. Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture. This value will be passed back to you during rendering to identify the texture.
// IMPORTANT: If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the ImFont is build (when calling GetTextData*** or Build()). We only copy the pointer, not the data.
export class ImFontAtlas
{
    constructor(public readonly native: Bind.reference_ImFontAtlas) {}

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
    public Build(): boolean { return this.native.Build(); }
    // IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
    public GetTexDataAsAlpha8(): { pixels: Uint8Array, width: number, height: number } {
        return this.native.GetTexDataAsAlpha8();
    }
    // IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
    public GetTexDataAsRGBA32(): { pixels: Uint8Array, width: number, height: number } {
        return this.native.GetTexDataAsRGBA32();
    }
    // void                        SetTexID(ImTextureID id)    { TexID = id; }
    public SetTexID(id: ImTextureID | null): void { this.TexID = id; }

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
    get TexID(): ImTextureID | null {
        return ImGuiContext.getTexture(this.native.getTexID());
    }
    set TexID(value: ImTextureID | null) {
        this.native.setTexID(ImGuiContext.setTexture(value));
    }
    // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
    // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.

    // [Internal]
    // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
    // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
    // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
    // int                         TexWidth;           // Texture width calculated during Build().
    get TexWidth(): number { return this.native.TexWidth; }
    // int                         TexHeight;          // Texture height calculated during Build().
    get TexHeight(): number { return this.native.TexHeight; }
    // ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
    // ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
    // ImVector<CustomRect>        CustomRects;        // Rectangles for packing custom texture data into the atlas.
    // ImVector<ImFontConfig>      ConfigData;         // Internal data
    // int                         CustomRectIds[1];   // Identifiers of custom texture rectangle used by ImFontAtlas/ImDrawList
}

// Font runtime data and rendering
// ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
export class ImFont
{
    constructor(public readonly native: Bind.reference_ImFont) {}

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
    public GetDebugName(): string { return this.native.GetDebugName(); }

    // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
    // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
    // IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
    public CalcTextSizeA(size: number, max_width: number, wrap_width: number, text_begin: string, text_end: number | null = null, remaining: any = null): Bind.interface_ImVec2 {
        return this.native.CalcTextSizeA(size, max_width, wrap_width, text_begin, text_end, remaining, new ImVec2());
    }
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

// a script version of BindImGui.ImGuiStyle with matching interface
class script_ImGuiStyle implements Bind.interface_ImGuiStyle {
    public Alpha: number = 1.0;
    private WindowPadding: ImVec2 = new ImVec2(8, 8);
    public getWindowPadding(): Bind.interface_ImVec2 { return this.WindowPadding; }
    public WindowRounding: number = 7.0;
    public WindowBorderSize: number = 0.0;
    private WindowMinSize: ImVec2 = new ImVec2(32, 32);
    public getWindowMinSize(): Bind.interface_ImVec2 { return this.WindowMinSize; }
    private WindowTitleAlign: ImVec2 = new ImVec2(0.0, 0.5);
    public getWindowTitleAlign(): Bind.interface_ImVec2 { return this.WindowTitleAlign; }
    public ChildRounding: number = 0.0;
    public ChildBorderSize: number = 1.0;
    public PopupRounding: number = 0.0;
    public PopupBorderSize: number = 1.0;
    private FramePadding: ImVec2 = new ImVec2(4, 3);
    public getFramePadding(): Bind.interface_ImVec2 { return this.FramePadding; }
    public FrameRounding: number = 0.0;
    public FrameBorderSize: number = 0.0;
    private ItemSpacing: ImVec2 = new ImVec2(8, 4);
    public getItemSpacing(): Bind.interface_ImVec2 { return this.ItemSpacing; }
    private ItemInnerSpacing: ImVec2 = new ImVec2(4, 4);
    public getItemInnerSpacing(): Bind.interface_ImVec2 { return this.ItemInnerSpacing; }
    private TouchExtraPadding: ImVec2 = new ImVec2(0, 0);
    public getTouchExtraPadding(): Bind.interface_ImVec2 { return this.TouchExtraPadding; }
    public IndentSpacing: number = 21.0;
    public ColumnsMinSpacing: number = 6.0;
    public ScrollbarSize: number = 16.0;
    public ScrollbarRounding: number = 9.0;
    public GrabMinSize: number = 10.0;
    public GrabRounding: number = 0.0;
    private ButtonTextAlign: ImVec2 = new ImVec2(0.5, 0.5);
    public getButtonTextAlign(): Bind.interface_ImVec2 { return this.ButtonTextAlign; }
    private DisplayWindowPadding: ImVec2 = new ImVec2(22, 22);
    public getDisplayWindowPadding(): Bind.interface_ImVec2 { return this.DisplayWindowPadding; }
    private DisplaySafeAreaPadding: ImVec2 = new ImVec2(4, 4);
    public getDisplaySafeAreaPadding(): Bind.interface_ImVec2 { return this.DisplaySafeAreaPadding; }
    public MouseCursorScale: number = 1;
    public AntiAliasedLines: boolean = true;
    public AntiAliasedFill: boolean = true;
    public CurveTessellationTol: number = 1.25;
    private Colors: ImVec4[] = [];
    public getColorsAt(index: number): Bind.interface_ImVec4 { return this.Colors[index]; }
    public setColorsAt(index: number, color: Readonly<Bind.interface_ImVec4>): boolean { this.Colors[index].Copy(color); return true; }

    constructor() {
        for (let i = 0; i < ImGuiCol.COUNT; ++i) {
            this.Colors[i] = new ImVec4();
        }
        const _this = new ImGuiStyle(this);
        const native = new bind.ImGuiStyle();
        const _that = new ImGuiStyle(native);
        _that.Copy(_this);
        bind.StyleColorsClassic(native);
        _this.Copy(_that);
        native.delete();
    }

    public ScaleAllSizes(scale_factor: number): void {
        const _this = new ImGuiStyle(this);
        const native = new bind.ImGuiStyle();
        const _that = new ImGuiStyle(native);
        _that.Copy(_this);
        native.ScaleAllSizes(scale_factor);
        _this.Copy(_that);
        native.delete();
    }
}

export class ImGuiStyle
{
    constructor(public readonly internal: Bind.interface_ImGuiStyle = new script_ImGuiStyle()) {}

    get Alpha(): number { return this.internal.Alpha; } set Alpha(value: number) { this.internal.Alpha = value; }
    get WindowPadding(): Bind.interface_ImVec2 { return this.internal.getWindowPadding(); }
    get WindowRounding(): number { return this.internal.WindowRounding; } set WindowRounding(value: number) { this.internal.WindowRounding = value; }
    get WindowBorderSize(): number { return this.internal.WindowBorderSize; } set WindowBorderSize(value: number) { this.internal.WindowBorderSize = value; }
    get WindowMinSize(): Bind.interface_ImVec2 { return this.internal.getWindowMinSize(); }
    get WindowTitleAlign(): Bind.interface_ImVec2 { return this.internal.getWindowTitleAlign(); }
    get ChildRounding(): number { return this.internal.ChildRounding; } set ChildRounding(value: number) { this.internal.ChildRounding = value; }
    get ChildBorderSize(): number { return this.internal.ChildBorderSize; } set ChildBorderSize(value: number) { this.internal.ChildBorderSize = value; }
    get PopupRounding(): number { return this.internal.PopupRounding; } set PopupRounding(value: number) { this.internal.PopupRounding = value; }
    get PopupBorderSize(): number { return this.internal.PopupBorderSize; } set PopupBorderSize(value: number) { this.internal.PopupBorderSize = value; }
    get FramePadding(): Bind.interface_ImVec2 { return this.internal.getFramePadding(); }
    get FrameRounding(): number { return this.internal.FrameRounding; } set FrameRounding(value: number) { this.internal.FrameRounding = value; }
    get FrameBorderSize(): number { return this.internal.FrameBorderSize; } set FrameBorderSize(value: number) { this.internal.FrameBorderSize = value; }
    get ItemSpacing(): Bind.interface_ImVec2 { return this.internal.getItemSpacing(); }
    get ItemInnerSpacing(): Bind.interface_ImVec2 { return this.internal.getItemInnerSpacing(); }
    get TouchExtraPadding(): Bind.interface_ImVec2 { return this.internal.getTouchExtraPadding(); }
    get IndentSpacing(): number { return this.internal.IndentSpacing; } set IndentSpacing(value: number) { this.internal.IndentSpacing = value; }
    get ColumnsMinSpacing(): number { return this.internal.ColumnsMinSpacing; } set ColumnsMinSpacing(value: number) { this.internal.ColumnsMinSpacing = value; }
    get ScrollbarSize(): number { return this.internal.ScrollbarSize; } set ScrollbarSize(value: number) { this.internal.ScrollbarSize = value; }
    get ScrollbarRounding(): number { return this.internal.ScrollbarRounding; } set ScrollbarRounding(value: number) { this.internal.ScrollbarRounding = value; }
    get GrabMinSize(): number { return this.internal.GrabMinSize; } set GrabMinSize(value: number) { this.internal.GrabMinSize = value; }
    get GrabRounding(): number { return this.internal.GrabRounding; } set GrabRounding(value: number) { this.internal.GrabRounding = value; }
    get ButtonTextAlign(): Bind.interface_ImVec2 { return this.internal.getButtonTextAlign(); }
    get DisplayWindowPadding(): Bind.interface_ImVec2 { return this.internal.getDisplayWindowPadding(); }
    get DisplaySafeAreaPadding(): Bind.interface_ImVec2 { return this.internal.getDisplaySafeAreaPadding(); }
    get MouseCursorScale(): number { return this.internal.MouseCursorScale; } set MouseCursorScale(value: number) { this.internal.MouseCursorScale = value; }
    get AntiAliasedLines(): boolean { return this.internal.AntiAliasedLines; } set AntiAliasedLines(value: boolean) { this.internal.AntiAliasedLines = value; }
    get AntiAliasedFill(): boolean { return this.internal.AntiAliasedFill; } set AntiAliasedFill(value: boolean) { this.internal.AntiAliasedFill = value; }
    get CurveTessellationTol(): number { return this.internal.CurveTessellationTol; } set CurveTessellationTol(value: number) { this.internal.CurveTessellationTol = value; }
    public Colors: Bind.interface_ImVec4[] = new Proxy([], {
        get: (target: Bind.interface_ImVec4[], key: PropertyKey): number | Bind.interface_ImVec4 => {
            if (key === "length") { return ImGuiCol.COUNT; }
            return this.internal.getColorsAt(Number(key));
        },
        set: (target: Bind.interface_ImVec4[], key: PropertyKey, value: Readonly<Bind.interface_ImVec4>): boolean => {
            return this.internal.setColorsAt(Number(key), value);
        },
    });

    public Copy(other: Readonly<ImGuiStyle>): this {
        this.Alpha = other.Alpha;
        this.WindowPadding.Copy(this.WindowPadding);
        this.WindowRounding = other.WindowRounding;
        this.WindowBorderSize = other.WindowBorderSize;
        this.WindowMinSize.Copy(this.WindowMinSize);
        this.WindowTitleAlign.Copy(this.WindowTitleAlign);
        this.ChildRounding = other.ChildRounding;
        this.ChildBorderSize = other.ChildBorderSize;
        this.PopupRounding = other.PopupRounding;
        this.PopupBorderSize = other.PopupBorderSize;
        this.FramePadding.Copy(this.FramePadding);
        this.FrameRounding = other.FrameRounding;
        this.FrameBorderSize = other.FrameBorderSize;
        this.ItemSpacing.Copy(this.ItemSpacing);
        this.ItemInnerSpacing.Copy(this.ItemInnerSpacing);
        this.TouchExtraPadding.Copy(this.TouchExtraPadding);
        this.IndentSpacing = other.IndentSpacing;
        this.ColumnsMinSpacing = other.ColumnsMinSpacing;
        this.ScrollbarSize = other.ScrollbarSize;
        this.ScrollbarRounding = other.ScrollbarRounding;
        this.GrabMinSize = other.GrabMinSize;
        this.GrabRounding = other.GrabRounding;
        this.ButtonTextAlign.Copy(this.ButtonTextAlign);
        this.DisplayWindowPadding.Copy(this.DisplayWindowPadding);
        this.DisplaySafeAreaPadding.Copy(this.DisplaySafeAreaPadding);
        this.MouseCursorScale = other.MouseCursorScale;
        this.AntiAliasedLines = other.AntiAliasedLines;
        this.AntiAliasedFill = other.AntiAliasedFill;
        this.CurveTessellationTol = other.CurveTessellationTol;
        for (let i = 0; i < ImGuiCol.COUNT; ++i) {
            this.Colors[i].Copy(other.Colors[i]);
        }
        return this;
    }

    public ScaleAllSizes(scale_factor: number): void { this.internal.ScaleAllSizes(scale_factor); }
}

// This is where your app communicate with ImGui. Access via ImGui::GetIO().
// Read 'Programmer guide' section in .cpp file for general usage.
export class ImGuiIO
{
    constructor(public readonly native: Bind.reference_ImGuiIO) {}

    //------------------------------------------------------------------
    // Settings (fill once)                 // Default value:
    //------------------------------------------------------------------

    // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
    get DisplaySize(): Bind.reference_ImVec2 { return this.native.getDisplaySize(); }
    // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
    get DeltaTime(): number { return this.native.DeltaTime; }
    set DeltaTime(value: number) { this.native.DeltaTime = value; }
    // ImGuiConfigFlags ConfigFlags;                 // = 0x00               // See ImGuiConfigFlags_. Gamepad/keyboard navigation options.
    get ConfigFlags(): ImGuiConfigFlags { return this.native.ConfigFlags; }
    set ConfigFlags(value: ImGuiConfigFlags) { this.native.ConfigFlags = value; }
    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
    // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
    // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
    // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
    public KeyMap: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return ImGuiKey.COUNT; }
            return this.native.getKeyMapAt(Number(key));
        },
        set: (target: number[], key: PropertyKey, value: number): boolean => {
            return this.native.setKeyMapAt(Number(key), value);
        },
    });
    // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
    // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
    // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.

    // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
    get Fonts(): ImFontAtlas { return new ImFontAtlas(this.native.getFonts()); }
    // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
    get FontGlobalScale(): number { return this.native.FontGlobalScale; }
    set FontGlobalScale(value: number) { this.native.FontGlobalScale = value; }
    // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
    get FontAllowUserScaling(): boolean { return false; }
    // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
    // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
    get DisplayFramebufferScale(): Bind.reference_ImVec2 { return this.native.getDisplayFramebufferScale(); }
    // ImVec2        DisplayVisibleMin;        // <unset> (0.0f,0.0f)  // If you use DisplaySize as a virtual space larger than your screen, set DisplayVisibleMin/Max to the visible area.
    // ImVec2        DisplayVisibleMax;        // <unset> (0.0f,0.0f)  // If the values are the same, we defaults to Min=(0.0f) and Max=DisplaySize

    // Advanced/subtle behaviors
    // bool          OptMacOSXBehaviors;       // = defined(__APPLE__) // OS X style: Text editing cursor movement using Alt instead of Ctrl, Shortcuts using Cmd/Super instead of Ctrl, Line/Text Start and End using Cmd+Arrows instead of Home/End, Double click selects by word instead of selecting whole text, Multi-selection in lists uses Cmd/Super instead of Ctrl
    // bool          OptCursorBlink;           // = true               // Enable blinking cursor, for users who consider it annoying.

    //------------------------------------------------------------------
    // Settings (User Functions)
    //------------------------------------------------------------------

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
    get MousePos(): Bind.reference_ImVec2 { return this.native.getMousePos(); }
    // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
    public MouseDown: boolean[] = new Proxy([], {
        get: (target: boolean[], key: PropertyKey): number | boolean => {
            if (key === "length") { return 5; }
            return this.native.getMouseDownAt(Number(key));
        },
        set: (target: boolean[], key: PropertyKey, value: boolean): boolean => {
            return this.native.setMouseDownAt(Number(key), value);
        },
    });
    // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
    public get MouseWheel(): number { return this.native.MouseWheel; }
    public set MouseWheel(value: number) { this.native.MouseWheel = value; }
    // float       MouseWheelH;                    // Mouse wheel (Horizontal). Most users don't have a mouse with an horizontal wheel, may not be filled by all back-ends.
    public get MouseWheelH(): number { return this.native.MouseWheelH; }
    public set MouseWheelH(value: number) { this.native.MouseWheelH = value; }
    // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
    get MouseDrawCursor(): boolean { return this.native.MouseDrawCursor; } set MouseDrawCursor(value: boolean) { this.native.MouseDrawCursor = value; }
    // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
    get KeyCtrl(): boolean { return this.native.KeyCtrl; } set KeyCtrl(value: boolean) { this.native.KeyCtrl = value; }
    // bool        KeyShift;                   // Keyboard modifier pressed: Shift
    get KeyShift(): boolean { return this.native.KeyShift; } set KeyShift(value: boolean) { this.native.KeyShift = value; }
    // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
    get KeyAlt(): boolean { return this.native.KeyAlt; } set KeyAlt(value: boolean) { this.native.KeyAlt = value; }
    // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
    get KeySuper(): boolean { return this.native.KeySuper; } set KeySuper(value: boolean) { this.native.KeySuper = value; }
    // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
    public KeysDown: boolean[] = new Proxy([], {
        get: (target: boolean[], key: PropertyKey): number | boolean => {
            if (key === "length") { return 512; }
            return this.native.getKeysDownAt(Number(key));
        },
        set: (target: boolean[], key: PropertyKey, value: boolean): boolean => {
            return this.native.setKeysDownAt(Number(key), value);
        },
    });
    // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
    // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
    public NavInputs: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return ImGuiNavInput.COUNT; }
            return this.native.getNavInputsAt(Number(key));
        },
        set: (target: number[], key: PropertyKey, value: number): boolean => {
            return this.native.setNavInputsAt(Number(key), value);
        },
    });

    // Functions
    // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
    public AddInputCharacter(c: number): void { this.native.AddInputCharacter(c); }
    // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
    // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually

    //------------------------------------------------------------------
    // Output - Retrieve after calling NewFrame()
    //------------------------------------------------------------------

    // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active).
    get WantCaptureMouse(): boolean { return this.native.WantCaptureMouse; } set WantCaptureMouse(value: boolean) { this.native.WantCaptureMouse = value; }
    // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
    get WantCaptureKeyboard(): boolean { return this.native.WantCaptureKeyboard; } set WantCaptureKeyboard(value: boolean) { this.native.WantCaptureKeyboard = value; }
    // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
    get WantTextInput(): boolean { return this.native.WantTextInput; } set WantTextInput(value: boolean) { this.native.WantTextInput = value; }
    // bool        WantMoveMouse;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
    get WantMoveMouse(): boolean { return this.native.WantMoveMouse; } set WantMoveMouse(value: boolean) { this.native.WantMoveMouse = value; }
    // bool        NavActive;                  // Directional navigation is currently allowed (will handle ImGuiKey_NavXXX events) = a window is focused and it doesn't use the ImGuiWindowFlags_NoNavInputs flag.
    get NavActive(): boolean { return this.native.NavActive; } set NavActive(value: boolean) { this.native.NavActive = value; }
    // bool        NavVisible;                 // Directional navigation is visible and allowed (will handle ImGuiKey_NavXXX events).
    get NavVisible(): boolean { return this.native.NavVisible; } set NavVisible(value: boolean) { this.native.NavVisible = value; }
    // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
    get Framerate(): number { return this.native.Framerate; }
    // int         MetricsAllocs;              // Number of active memory allocations
    // int         MetricsRenderVertices;      // Vertices output during last call to Render()
    // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
    // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
    // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
    get MouseDelta(): Readonly<Bind.reference_ImVec2> { return this.native.getMouseDelta(); }

    //------------------------------------------------------------------
    // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
    //------------------------------------------------------------------

    // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
    // ImVec2      MouseClickedPos[5];         // Position at time of clicking
    // public getMouseClickedPosAt(index: number): Readonly<BindImGui.reference_ImVec2>;
    public MouseClickedPos: Array<Readonly<Bind.reference_ImVec2>> = new Proxy([], {
        get: (target: Array<Readonly<Bind.reference_ImVec2>>, key: PropertyKey): number | Readonly<Bind.reference_ImVec2> => {
            if (key === "length") { return 5; }
            return this.native.getMouseClickedPosAt(Number(key));
        },
    });
    // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
    // bool        MouseClicked[5];            // Mouse button went from !Down to Down
    // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
    // bool        MouseReleased[5];           // Mouse button went from Down to !Down
    // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
    // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
    public MouseDownDuration: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return 5; }
            return this.native.getMouseDownDurationAt(Number(key));
        },
    });
    // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
    // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
    // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
    // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
    public KeysDownDuration: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return 512; }
            return this.native.getKeysDownDurationAt(Number(key));
        },
    });
    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
    // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
    public NavInputsDownDuration: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return ImGuiNavInput.COUNT; }
            return this.native.getNavInputsDownDurationAt(Number(key));
        },
    });
    // float       NavInputsDownDurationPrev[ImGuiNavInput_COUNT];

    // IMGUI_API   ImGuiIO();
}

// Context creation and access, if you want to use multiple context, share context between modules (e.g. DLL).
// All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
// All those functions are not reliant on the current context.
export class ImGuiContext {
    public static current_ctx: ImGuiContext | null = null;
    public static getTexture(index: number): ImTextureID | null {
        if (ImGuiContext.current_ctx === null) { throw new Error(); }
        return ImGuiContext.current_ctx._getTexture(index);
    }
    public static setTexture(texture: ImTextureID | null): number {
        if (ImGuiContext.current_ctx === null) { throw new Error(); }
        return ImGuiContext.current_ctx._setTexture(texture);
    }

    private textures: Array<ImTextureID | null> = [];
    constructor(public native: Bind.ImGuiContext) {}
    public delete(): void {
        this.textures.length = 0;
    }
    private _getTexture(index: number): ImTextureID | null {
        return this.textures[index] || null;
    }
    private _setTexture(texture: ImTextureID | null): number {
        let index = this.textures.indexOf(texture);
        if (index === -1) {
            for (let i = 0; i < this.textures.length; ++i) {
                if (this.textures[i] === null) {
                    this.textures[i] = texture;
                    return i;
                }
            }
            index = this.textures.length;
            this.textures.push(texture);
        }
        return index;
    }
}
// IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
export function CreateContext(shared_font_atlas: ImFontAtlas | null = null): ImGuiContext | null {
    const ctx_native: Bind.ImGuiContext | null = bind.CreateContext();
    if (ctx_native === null) { throw new Error(); }
    const ctx: ImGuiContext = new ImGuiContext(ctx_native);
    if (ImGuiContext.current_ctx === null) {
        ImGuiContext.current_ctx = ctx;
    }
    return ctx;
}
// IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = Destroy current context
export function DestroyContext(ctx: ImGuiContext | null = null): void {
    if (ctx === null) {
        ctx = ImGuiContext.current_ctx;
        ImGuiContext.current_ctx = null;
    }
    bind.DestroyContext((ctx === null) ? null : ctx.native);
    if (ctx) { ctx.delete(); }
}
// IMGUI_API ImGuiContext* GetCurrentContext();
export function GetCurrentContext(): ImGuiContext | null {
    // const ctx_native: BindImGui.ImGuiContext | null = bind.GetCurrentContext();
    return ImGuiContext.current_ctx;
}
// IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
export function SetCurrentContext(ctx: ImGuiContext | null): void {
    bind.SetCurrentContext((ctx === null) ? null : ctx.native);
    ImGuiContext.current_ctx = ctx;
}

// Main
// IMGUI_API ImGuiIO&      GetIO();
export function GetIO(): ImGuiIO { return new ImGuiIO(bind.GetIO()); }
// IMGUI_API ImGuiStyle&   GetStyle();
export function GetStyle(): ImGuiStyle { return new ImGuiStyle(bind.GetStyle()); }
// IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
export function GetDrawData(): ImDrawData | null {
    const draw_data: Bind.reference_ImDrawData | null = bind.GetDrawData();
    return (draw_data === null) ? null : new ImDrawData(draw_data);
}
// IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
export function NewFrame(): void { bind.NewFrame(); }
// IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
export function Render(): void { bind.Render(); }
// IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
export function EndFrame(): void { bind.EndFrame(); }

// Demo, Debug, Informations
// IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
export function ShowDemoWindow(p_open: Bind.ImScalar<boolean> | null = null): void { bind.ShowDemoWindow(p_open); }
// IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
export function ShowMetricsWindow(p_open: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null = null): void {
    if (p_open === null) {
        bind.ShowMetricsWindow(null);
    } else if (Array.isArray(p_open)) {
        bind.ShowMetricsWindow(p_open);
    } else {
        const ref_open: Bind.ImScalar<boolean> = [ p_open() ];
        const ret = bind.ShowMetricsWindow(ref_open);
        p_open(ref_open[0]);
        return ret;
    }
}
// IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
export function ShowStyleEditor(ref: ImGuiStyle | null = null): void {
    if (ref === null) {
        bind.ShowStyleEditor(null);
    } else if (ref.internal instanceof bind.ImGuiStyle) {
        bind.ShowStyleEditor(ref.internal);
    } else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(ref);
        bind.ShowStyleEditor(native);
        ref.Copy(wrap);
        native.delete();
    }
}
// IMGUI_API bool          ShowStyleSelector(const char* label);
export function ShowStyleSelector(label: string): boolean { return bind.ShowStyleSelector(label); }
// IMGUI_API void          ShowFontSelector(const char* label);
export function ShowFontSelector(label: string): void { bind.ShowFontSelector(label); }
// IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
export function ShowUserGuide(): void { bind.ShowUserGuide(); }
// IMGUI_API const char*   GetVersion();
export const GetVersion = bind.GetVersion;

// Styles
// IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
export function StyleColorsClassic(dst: ImGuiStyle | null = null): void {
    if (dst === null) {
        bind.StyleColorsClassic(null);
    } else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsClassic(dst.internal);
    } else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsClassic(native);
        dst.Copy(wrap);
        native.delete();
    }
}
// IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
export function StyleColorsDark(dst: ImGuiStyle | null = null): void {
    if (dst === null) {
        bind.StyleColorsDark(null);
    } else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsDark(dst.internal);
    } else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsDark(native);
        dst.Copy(wrap);
        native.delete();
    }
}
// IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
export function StyleColorsLight(dst: ImGuiStyle | null = null): void {
    if (dst === null) {
        bind.StyleColorsLight(null);
    } else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsLight(dst.internal);
    } else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsLight(native);
        dst.Copy(wrap);
        native.delete();
    }
}

// Window
// IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
export function Begin(name: string, open: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null = null, flags: ImGuiWindowFlags = 0): boolean {
    if (open === null) {
        return bind.Begin(name, null, flags);
    } else if (Array.isArray(open)) {
        return bind.Begin(name, open, flags);
    } else {
        const ref_open: Bind.ImScalar<boolean> = [ open() ];
        const opened: boolean = bind.Begin(name, ref_open, flags);
        open(ref_open[0]);
        return opened;
    }
}
// IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
export const End = bind.End;
// IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
// IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
export function BeginChild(id: string | Bind.ImGuiID, size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, border: boolean = false, extra_flags: ImGuiWindowFlags = 0): boolean {
    return bind.BeginChild(id, size, border, extra_flags);
}
// IMGUI_API void          EndChild();
export function EndChild(): void {
    bind.EndChild();
}
// IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
export function GetContentRegionMax(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetContentRegionMax(out);
}
// IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
export function GetContentRegionAvail(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetContentRegionAvail(out);
}
// IMGUI_API float         GetContentRegionAvailWidth();                                       //
export const GetContentRegionAvailWidth = bind.GetContentRegionAvailWidth;
// IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
export function GetWindowContentRegionMin(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowContentRegionMin(out);
}
// IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
export function GetWindowContentRegionMax(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowContentRegionMax(out);
}
// IMGUI_API float         GetWindowContentRegionWidth();                                      //
export const GetWindowContentRegionWidth = bind.GetWindowContentRegionWidth;
// IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
export function GetWindowDrawList(): ImDrawList {
    return new ImDrawList(bind.GetWindowDrawList());
}
// IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
export function GetWindowPos(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowPos(out);
}
// IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
export function GetWindowSize(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowSize(out);
}
// IMGUI_API float         GetWindowWidth();
export const GetWindowWidth = bind.GetWindowWidth;
// IMGUI_API float         GetWindowHeight();
export const GetWindowHeight = bind.GetWindowHeight;
// IMGUI_API bool          IsWindowCollapsed();
export const IsWindowCollapsed = bind.IsWindowCollapsed;
// IMGUI_API bool          IsWindowAppearing();
export const IsWindowAppearing = bind.IsWindowAppearing;
// IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
export const SetWindowFontScale = bind.SetWindowFontScale;

// IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
export function SetNextWindowPos(pos: Readonly<Bind.interface_ImVec2>, cond: ImGuiCond = 0, pivot: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.SetNextWindowPos(pos, cond, pivot);
}
// IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
export function SetNextWindowSize(pos: Readonly<Bind.interface_ImVec2>, cond: ImGuiCond = 0): void {
    bind.SetNextWindowSize(pos, cond);
}
// IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
export function SetNextWindowSizeConstraints(size_min: Readonly<Bind.interface_ImVec2>, size_max: Readonly<Bind.interface_ImVec2>, custom_callback: ImGuiSizeConstraintCallback | null = null, custom_callback_data: any = null): void {
    if (custom_callback) {
        function _custom_callback(data: Bind.ImGuiSizeCallbackData): void {
            if (custom_callback) {
                const _data: ImGuiSizeCallbackData = new ImGuiSizeCallbackData(data);
                custom_callback(_data);
                _data.delete();
            }
        }
        bind.SetNextWindowSizeConstraints(size_min, size_max, _custom_callback, custom_callback_data);
    } else {
        bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
    }
}
// IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
export function SetNextWindowContentSize(size: Readonly<Bind.interface_ImVec2>): void {
    bind.SetNextWindowContentSize(size);
}
// IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
export function SetNextWindowCollapsed(collapsed: boolean, cond: ImGuiCond = 0): void {
    bind.SetNextWindowCollapsed(collapsed, cond);
}
// IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
export const SetNextWindowFocus = bind.SetNextWindowFocus;
// IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                  // set next window background color alpha. helper to easily modify ImGuiCol_WindowBg/ChildBg/PopupBg.
export const SetNextWindowBgAlpha = bind.SetNextWindowBgAlpha;
// IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
// IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
// IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
// IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
// IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
// IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
// IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
// IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
export function SetWindowPos(name_or_pos: string | Readonly<Bind.interface_ImVec2>, pos_or_cond: Readonly<Bind.interface_ImVec2> | ImGuiCond = 0, cond: ImGuiCond = 0): void {
    if (typeof(name_or_pos) === "string") {
        bind.SetWindowNamePos(name_or_pos, pos_or_cond as Readonly<Bind.interface_ImVec2>, cond);
        return;
    } else {
        bind.SetWindowPos(name_or_pos, pos_or_cond as ImGuiCond);
    }
}
export function SetWindowSize(name_or_size: string | Readonly<Bind.interface_ImVec2>, size_or_cond: Readonly<Bind.interface_ImVec2> | ImGuiCond = 0, cond: ImGuiCond = 0): void {
    if (typeof(name_or_size) === "string") {
        bind.SetWindowNamePos(name_or_size, size_or_cond as Readonly<Bind.interface_ImVec2>, cond);
    } else {
        bind.SetWindowSize(name_or_size, size_or_cond as ImGuiCond);
    }
}
export function SetWindowCollapsed(name_or_collapsed: string | boolean, collapsed_or_cond: boolean | ImGuiCond = 0, cond: ImGuiCond = 0): void {
    if (typeof(name_or_collapsed) === "string") {
        bind.SetWindowNameCollapsed(name_or_collapsed, collapsed_or_cond as boolean, cond);
    } else {
        bind.SetWindowCollapsed(name_or_collapsed, collapsed_or_cond as ImGuiCond);
    }
}
export function SetWindowFocus(name?: string): void {
    if (typeof(name) === "string") {
        bind.SetWindowNameFocus(name);
    } else {
        bind.SetWindowFocus();
    }
}

// IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
export const GetScrollX = bind.GetScrollX;
// IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
export const GetScrollY = bind.GetScrollY;
// IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
export const GetScrollMaxX = bind.GetScrollMaxX;
// IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
export const GetScrollMaxY = bind.GetScrollMaxY;
// IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
export const SetScrollX = bind.SetScrollX;
// IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
export const SetScrollY = bind.SetScrollY;
// IMGUI_API void          SetScrollHere(float center_y_ratio = 0.5f);                         // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
export function SetScrollHere(center_y_ratio: number = 0.5): void {
    bind.SetScrollHere(center_y_ratio);
}
// IMGUI_API void          SetScrollFromPosY(float pos_y, float center_y_ratio = 0.5f);        // adjust scrolling amount to make given position valid. use GetCursorPos() or GetCursorStartPos()+offset to get valid positions.
export function SetScrollFromPosY(pos_y: number, center_y_ratio: number = 0.5): void {
    bind.SetScrollFromPosY(pos_y, center_y_ratio);
}
// IMGUI_API void          SetStateStorage(ImGuiStorage* tree);                                // replace tree state storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
// IMGUI_API ImGuiStorage* GetStateStorage();

// Parameters stacks (shared)
// IMGUI_API void          PushFont(ImFont* font);                                             // use NULL as a shortcut to push default font
export function PushFont(font: ImFont): void {}
// IMGUI_API void          PopFont();
export function PopFont(): void {}
// IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);
// IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
export function PushStyleColor(idx: ImGuiCol, col: Bind.ImU32 | Readonly<Bind.interface_ImVec4> | Readonly<ImColor>): void {
    if (col instanceof ImColor) {
        bind.PushStyleColor(idx, col.Value);
    } else {
        bind.PushStyleColor(idx, col as (Bind.ImU32 | Readonly<Bind.interface_ImVec4>));
    }
}
// IMGUI_API void          PopStyleColor(int count = 1);
export function PopStyleColor(count: number = 1): void {
    bind.PopStyleColor(count);
}
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
export function PushStyleVar(idx: ImGuiStyleVar, val: number | Readonly<Bind.interface_ImVec2>): void {
    bind.PushStyleVar(idx, val);
}
// IMGUI_API void          PopStyleVar(int count = 1);
export function PopStyleVar(count: number = 1): void {
    bind.PopStyleVar(count);
}
// IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
export function GetStyleColorVec4(idx: ImGuiCol): Readonly<Bind.reference_ImVec4> {
    return bind.GetStyleColorVec4(idx);
}
// IMGUI_API ImFont*       GetFont();                                                          // get current font
export function GetFont(): ImFont {
    return new ImFont(bind.GetFont());
}
// IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
export const GetFontSize = bind.GetFontSize;
// IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
export function GetFontTexUvWhitePixel(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetFontTexUvWhitePixel(out);
}
// IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);                  // retrieve given style color with style alpha applied and optional extra alpha multiplier
// IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                     // retrieve given color with style alpha applied
// IMGUI_API ImU32         GetColorU32(ImU32 col);                                             // retrieve given color with style alpha applied
export function GetColorU32(idx: ImGuiCol, alpha_mul: number = 1.0): Bind.ImU32 {
    return bind.GetColorU32(idx, alpha_mul);
}

// Parameters stacks (current window)
// IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
export const PushItemWidth = bind.PushItemWidth;
// IMGUI_API void          PopItemWidth();
export const PopItemWidth = bind.PopItemWidth;
// IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
export const CalcItemWidth = bind.CalcItemWidth;
// IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
export function PushTextWrapPos(wrap_pos_x: number = 0.0): void {
    bind.PushTextWrapPos(wrap_pos_x);
}
// IMGUI_API void          PopTextWrapPos();
export const PopTextWrapPos = bind.PopTextWrapPos;
// IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
export const PushAllowKeyboardFocus = bind.PushAllowKeyboardFocus;
// IMGUI_API void          PopAllowKeyboardFocus();
export const PopAllowKeyboardFocus = bind.PopAllowKeyboardFocus;
// IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
export const PushButtonRepeat = bind.PushButtonRepeat;
// IMGUI_API void          PopButtonRepeat();
export const PopButtonRepeat = bind.PopButtonRepeat;

// Cursor / Layout
// IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
export const Separator = bind.Separator;
// IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
export function SameLine(pos_x: number = 0.0, spacing_w: number = -1.0): void {
    bind.SameLine(pos_x, spacing_w);
}
// IMGUI_API void          NewLine();                                                          // undo a SameLine()
export const NewLine = bind.NewLine;
// IMGUI_API void          Spacing();                                                          // add vertical spacing
export const Spacing = bind.Spacing;
// IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
export function Dummy(size: Readonly<Bind.interface_ImVec2>): void { bind.Dummy(size); }
// IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
export function Indent(indent_w: number = 0.0) { bind.Indent(indent_w); }
// IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
export function Unindent(indent_w: number = 0.0) { bind.Unindent(indent_w); }
// IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
export const BeginGroup = bind.BeginGroup;
// IMGUI_API void          EndGroup();
export const EndGroup = bind.EndGroup;
// IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
export function GetCursorPos(out: Bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorPos(out); }
// IMGUI_API float         GetCursorPosX();                                                    // "
export const GetCursorPosX = bind.GetCursorPosX;
// IMGUI_API float         GetCursorPosY();                                                    // "
export const GetCursorPosY = bind.GetCursorPosY;
// IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
export function SetCursorPos(local_pos: Readonly<Bind.interface_ImVec2>): void { bind.SetCursorPos(local_pos); }
// IMGUI_API void          SetCursorPosX(float x);                                             // "
export const SetCursorPosX = bind.SetCursorPosX;
// IMGUI_API void          SetCursorPosY(float y);                                             // "
export const SetCursorPosY = bind.SetCursorPosY;
// IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
export function GetCursorStartPos(out: Bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorStartPos(out); }
// IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
export function GetCursorScreenPos(out: Bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorScreenPos(out); }
// IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
export function SetCursorScreenPos(pos: Readonly<Bind.interface_ImVec2>): void { bind.SetCursorScreenPos(pos); }
// IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
export const AlignTextToFramePadding = bind.AlignTextToFramePadding;
// IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
export const GetTextLineHeight = bind.GetTextLineHeight;
// IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
export const GetTextLineHeightWithSpacing = bind.GetTextLineHeightWithSpacing;
// IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
export const GetFrameHeight = bind.GetFrameHeight;
// IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
export const GetFrameHeightWithSpacing = bind.GetFrameHeightWithSpacing;

// Columns
// You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
// IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
export function Columns(count: number = 1, id: string | null = null, border: boolean = true): void {
    id = id || "";
    bind.Columns(count, id, border);
}
// IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
export const NextColumn = bind.NextColumn;
// IMGUI_API int           GetColumnIndex();                                                   // get current column index
export const GetColumnIndex = bind.GetColumnIndex;
// IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
export function GetColumnWidth(column_index: number = -1): number {
    return bind.GetColumnWidth(column_index);
}
// IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
export const SetColumnWidth = bind.SetColumnWidth;
// IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
export function GetColumnOffset(column_index: number = -1): number {
    return bind.GetColumnOffset(column_index);
}
// IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
export const SetColumnOffset = bind.SetColumnOffset;
// IMGUI_API int           GetColumnsCount();
export const GetColumnsCount = bind.GetColumnsCount;

// ID scopes
// If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
// You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
// IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
// IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API void          PushID(const void* ptr_id);
// IMGUI_API void          PushID(int int_id);
export const PushID = bind.PushID;
// IMGUI_API void          PopID();
export const PopID = bind.PopID;
// IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
// IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API ImGuiID       GetID(const void* ptr_id);
export const GetID = bind.GetID;

// Widgets: Text
// IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
export function TextUnformatted(text: string): void { bind.TextUnformatted(text); }
// IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
// IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
export function Text(fmt: string/*, ...args: any[]*/): void { bind.Text(fmt/*, ...args*/); }
// IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
// IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
export function TextColored(col: Readonly<Bind.interface_ImVec4> | Readonly<ImColor>, fmt: string/*, ...args: any[]*/): void {
    bind.TextColored((col instanceof ImColor) ? col.Value : col as Readonly<Bind.interface_ImVec4>, fmt/*, ...args*/);
}
// IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
// IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
export function TextDisabled(fmt: string/*, ...args: any[]*/): void { bind.TextDisabled(fmt/*, ...args*/); }
// IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
// IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
export function TextWrapped(fmt: string/*, ...args: any[]*/): void { bind.TextWrapped(fmt/*, ...args*/); }
// IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
// IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
export function LabelText(label: string, fmt: string/*, ...args: any[]*/): void { bind.LabelText(label, fmt/*, ...args*/); }
// IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
// IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
export function BulletText(fmt: string/*, ...args: any[]*/): void { bind.BulletText(fmt/*, ...args*/); }
// IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
export const Bullet = bind.Bullet;

// Widgets: Main
// IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
export function Button(label: string, size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    return bind.Button(label, size);
}
// IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
export const SmallButton = bind.SmallButton;
// IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
export function InvisibleButton(str_id: string, size: Readonly<Bind.interface_ImVec2>): boolean {
    return bind.InvisibleButton(str_id, size);
}
// IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
export function Image(user_texture_id: ImTextureID | null, size: Readonly<Bind.interface_ImVec2>, uv0: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, uv1: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT, tint_col: Readonly<Bind.interface_ImVec4> = ImVec4.WHITE, border_col: Readonly<Bind.interface_ImVec4> = ImVec4.ZERO): void {
    bind.Image(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, tint_col, border_col);
}
// IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
export function ImageButton(user_texture_id: ImTextureID | null, size: Readonly<Bind.interface_ImVec2>, uv0: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, uv1: Readonly<Bind.interface_ImVec2> = ImVec2.UNIT, frame_padding: number = -1, bg_col: Readonly<Bind.interface_ImVec4> = ImVec4.ZERO, tint_col: Readonly<Bind.interface_ImVec4> = ImVec4.WHITE): void {
    return bind.ImageButton(ImGuiContext.setTexture(user_texture_id), size, uv0, uv1, frame_padding, bg_col, tint_col);
}
// IMGUI_API bool          Checkbox(const char* label, bool* v);
export function Checkbox(label: string, v: Bind.ImScalar<boolean> | Bind.ImAccess<boolean>): boolean {
    if (Array.isArray(v)) {
        return bind.Checkbox(label, v);
    } else {
        const ref_v: Bind.ImScalar<boolean> = [ v() ];
        const ret = bind.Checkbox(label, ref_v);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
export function CheckboxFlags(label: string, flags: Bind.ImAccess<number> | Bind.ImScalar<number>, flags_value: number): boolean {
    if (Array.isArray(flags)) {
        return bind.CheckboxFlags(label, flags, flags_value);
    } else {
        const ref_flags: Bind.ImScalar<number> = [ flags() ];
        const ret = bind.CheckboxFlags(label, ref_flags, flags_value);
        flags(ref_flags[0]);
        return ret;
    }
}
// IMGUI_API bool          RadioButton(const char* label, bool active);
// IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);
export function RadioButton(label: string, active_or_v: boolean | Bind.ImAccess<number> | Bind.ImScalar<number>, v_button?: number): boolean {
    if (typeof(active_or_v) === "boolean" || Array.isArray(active_or_v)) {
        return bind.RadioButton(label, active_or_v, v_button);
    } else {
        const ref_v: Bind.ImScalar<number> = [ active_or_v() ];
        const ret = bind.RadioButton(label, ref_v, v_button);
        active_or_v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
export function PlotLines_Array(label: string, values: ArrayLike<number>, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, stride: number = 1): void {
    function values_getter(data: any, idx: number): number {
        return values[idx];
    }
    PlotLines_Callback(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotLines_Callback(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.PlotLines(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
export function PlotLines(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): void {
    PlotLines_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
export function PlotHistogram_Array(label: string, values: ArrayLike<number>, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, stride: number = 1): void {
    function values_getter(data: any, idx: number): number {
        return values[idx];
    }
    PlotHistogram(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotHistogram_Callback(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.PlotHistogram(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
export function PlotHistogram(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): void {
    PlotHistogram_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
export function ProgressBar(fraction: number, size_arg: Readonly<Bind.interface_ImVec2> = new ImVec2(-1, 0), overlay: string | null = null): void {
    bind.ProgressBar(fraction, size_arg, overlay);
}

// Widgets: Combo Box
// The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it.
// The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
// IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
export function BeginCombo(label: string, preview_value: string | null, flags: ImGuiComboFlags = 0): boolean {
    return bind.BeginCombo(label, preview_value, flags);
}
// IMGUI_API void          EndCombo();
export function EndCombo(): void { bind.EndCombo(); }
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
// IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
function CalcMaxPopupHeightFromItemCount(items_count: number): number {
    // ImGuiContext& g = *GImGui;
    // const io: ImGuiIO = GetIO();
    const style: ImGuiStyle = GetStyle();
    if (items_count <= 0)
        return Number.MAX_VALUE;
    // return (g.FontSize + g.Style.ItemSpacing.y) * items_count - g.Style.ItemSpacing.y + (g.Style.WindowPadding.y * 2);
    return (bind.GetFontSize() + style.ItemSpacing.y) * items_count - style.ItemSpacing.y + (style.WindowPadding.y * 2);
}
export function Combo(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items: string[] | string, items_count: number = items.length, popup_max_height_in_items: number = -1): boolean {
    // return bind.Combo(label, current_item, items, items_count, popup_max_height_in_items);

    const _current_item = Array.isArray(current_item) ? current_item : [ current_item() ];

    if (typeof(items) === "string") {
        items = items.replace(/^\0+|\0+$/g, "").split("\0");
        items_count = items.length;
        // popup_max_height_in_items = items_count;
    }

    // const char* preview_text = NULL;
    let preview_text: string = "";
    // if (*current_item >= 0 && *current_item < items_count)
    //     items_getter(data, *current_item, &preview_text);
    if (_current_item[0] >= 0 && _current_item[0] < items_count)
        preview_text = items[_current_item[0]];

    // The old Combo() API exposed "popup_max_height_in_items", however the new more general BeginCombo() API doesn't, so we emulate it here.
    // if (popup_max_height_in_items != -1 && !g.SetNextWindowSizeConstraint)
    // {
    //     float popup_max_height = CalcMaxPopupHeightFromItemCount(popup_max_height_in_items);
    //     SetNextWindowSizeConstraints(ImVec2(0,0), ImVec2(FLT_MAX, popup_max_height));
    // }
    if (popup_max_height_in_items !== -1 /*&& !g.SetNextWindowSizeConstraint*/)
    {
        const popup_max_height: number = CalcMaxPopupHeightFromItemCount(popup_max_height_in_items);
        SetNextWindowSizeConstraints(ImVec2.ZERO, new ImVec2(Number.MAX_VALUE, popup_max_height));
    }

    if (!bind.BeginCombo(label, preview_text, 0))
        return false;

    // Display items
    // FIXME-OPT: Use clipper (but we need to disable it on the appearing frame to make sure our call to SetItemDefaultFocus() is processed)
    let value_changed: boolean = false;
    for (let i = 0; i < items_count; i++)
    {
        bind.PushID(i.toString());
        const item_selected: boolean = (i === _current_item[0]);
        // const char* item_text;
        const item_text = items[i];
        // if (!items_getter(data, i, &item_text))
        //     item_text = "*Unknown item*";
        if (Selectable(item_text, item_selected))
        {
            value_changed = true;
            _current_item[0] = i;
        }
        if (item_selected)
            bind.SetItemDefaultFocus();
        bind.PopID();
    }

    EndCombo();
    if (!Array.isArray(current_item)) { current_item(_current_item[0]); }
    return value_changed;
}
export function Combo_2(label: string, current_item: Bind.ImScalar<number>, items: string, popup_max_height_in_items: number = -1): boolean {
    return false;
}
export function Combo_3(label: string, current_item: Bind.ImScalar<number>, items_getter: (data: any, idx: number, out_text: Bind.ImScalar<string>) => boolean, data: any, items_count: number, popup_max_height_in_items: number = -1): boolean {
    return false;
}
// export function Combo(label: string, current_item: ImScalar<number>, ...args: any[]): boolean {
//     return false;
// }

// Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
// For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
// IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
export function DragFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string | null = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.DragFloat(label, v, v_speed, v_min, v_max, display_format, power);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret = bind.DragFloat(label, ref_v, v_speed, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number> | ImVec2, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (v instanceof ImVec2) {
        const _v: Bind.ImTuple2<number> = [ v.x, v.y ];
        const ret = bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    } else {
        return bind.DragFloat2(label, v, v_speed, v_min, v_max, display_format, power);
    }
}
// IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.DragFloat3(label, v, v_speed, v_min, v_max, display_format, power);
}
// IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat4(label: string, v: Bind.ImTuple4<number> | ImVec4, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (v instanceof ImVec4) {
        const _v: Bind.ImTuple4<number> = [ v.x, v.y, v.z, v.w ];
        const ret = bind.DragFloat4(label, _v, v_speed, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        v.z = _v[2];
        v.w = _v[3];
        return ret;
    } else {
        return bind.DragFloat4(label, v, v_speed, v_min, v_max, display_format, power);
    }
}
// IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", const char* display_format_max = NULL, float power = 1.0f);
export function DragFloatRange2(label: string, v_current_min: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_current_max: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", display_format_max: string | null = null, power: number = 1.0): boolean {
    const ref_v_current_min: Bind.ImScalar<number> = Array.isArray(v_current_min) ? v_current_min as any : [ v_current_min() ];
    const ref_v_current_max: Bind.ImScalar<number> = Array.isArray(v_current_max) ? v_current_max as any : [ v_current_max() ];
    const ret = bind.DragFloatRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max, power);
    if (!Array.isArray(v_current_min)) { v_current_min(ref_v_current_min[0]); }
    if (!Array.isArray(v_current_max)) { v_current_max(ref_v_current_max[0]); }
    return ret;

}
// IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");                                       // If v_min >= v_max we have no bound
export function DragInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.DragInt(label, v, v_speed, v_min, v_max, display_format);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret = bind.DragInt(label, ref_v, v_speed, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt2(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt3(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt4(label: string, v: Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt4(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
export function DragIntRange2(label: string, v_current_min: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_current_max: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f", display_format_max: string | null = null): boolean {
    const ref_v_current_min: Bind.ImScalar<number> = Array.isArray(v_current_min) ? v_current_min as any : [ v_current_min() ];
    const ref_v_current_max: Bind.ImScalar<number> = Array.isArray(v_current_max) ? v_current_max as any : [ v_current_max() ];
    const ret = bind.DragIntRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max);
    if (!Array.isArray(v_current_min)) { v_current_min(ref_v_current_min[0]); }
    if (!Array.isArray(v_current_max)) { v_current_max(ref_v_current_max[0]); }
    return ret;
}

// Widgets: Input with Keyboard
// IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
let InputText_user_data: any = null;
export function InputText(label: string, buf: ImStringBuffer | Bind.ImAccess<string> | Bind.ImScalar<string>, buf_size: number = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, flags: ImGuiInputTextFlags = 0, callback: ImGuiTextEditCallback | null = null, user_data: any = null): boolean {
    InputText_user_data = user_data;
    function _callback(data: Bind.ImGuiTextEditCallbackData): number {
        const _data: ImGuiTextEditCallbackData = new ImGuiTextEditCallbackData(data, InputText_user_data);
        const ret: number = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputText(label, buf, buf_size, flags, callback === null ? null : _callback, null);
    } else if (buf instanceof ImStringBuffer) {
        const ref_buf: Bind.ImScalar<string> = [ buf.buffer ];
        const _buf_size: number = Math.min(buf_size, buf.size);
        const ret: boolean = bind.InputText(label, ref_buf, _buf_size, flags, callback === null ? null : _callback, null);
        buf.buffer = ref_buf[0];
        return ret;
    } else {
        const ref_buf: Bind.ImScalar<string> = [ buf() ];
        const ret: boolean = bind.InputText(label, ref_buf, buf_size, flags, callback === null ? null : _callback, null);
        buf(ref_buf[0]);
        return ret;
    }
}
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
let InputTextMultiline_user_data: any = null;
export function InputTextMultiline(label: string, buf: ImStringBuffer | Bind.ImAccess<string> | Bind.ImScalar<string>, buf_size: number = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO, flags: ImGuiInputTextFlags = 0, callback: ImGuiTextEditCallback | null = null, user_data: any = null): boolean {
    InputTextMultiline_user_data = user_data;
    function _callback(data: Bind.ImGuiTextEditCallbackData): number {
        const _data: ImGuiTextEditCallbackData = new ImGuiTextEditCallbackData(data, InputTextMultiline_user_data);
        const ret: number = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputTextMultiline(label, buf, buf_size, size, flags, callback === null ? null : _callback, null);
    } else if (buf instanceof ImStringBuffer) {
        const ref_buf: Bind.ImScalar<string> = [ buf.buffer ];
        const _buf_size: number = Math.min(buf_size, buf.size);
        const ret: boolean = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, callback === null ? null : _callback, null);
        buf.buffer = ref_buf[0];
        return ret;
    } else {
        const ref_buf: Bind.ImScalar<string> = [ buf() ];
        const ret: boolean = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, callback === null ? null : _callback, null);
        buf(ref_buf[0]);
        return ret;
    }
}
// IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, step: number = 0.0, step_fast: number = 0.0, decimal_precision: number = -1, extra_flags: ImGuiInputTextFlags = 0): boolean {
    if (Array.isArray(v)) {
        return bind.InputFloat(label, v, step, step_fast, decimal_precision, extra_flags);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret = bind.InputFloat(label, ref_v, step, step_fast, decimal_precision, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          InputFloat2(const char* label, float v[2], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat2(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputFloat3(const char* label, float v[3], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat3(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputFloat4(const char* label, float v[4], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat4(label: string, v: Bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat4(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
export function InputInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, step: number = 1, step_fast: number = 100, extra_flags: ImGuiInputTextFlags = 0): boolean {
    if (Array.isArray(v)) {
        return bind.InputInt(label, v, step, step_fast, extra_flags);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret = bind.InputInt(label, ref_v, step, step_fast, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
export function InputInt2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt2(label, v, extra_flags);
}
// IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
export function InputInt3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt3(label, v, extra_flags);
}
// IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
export function InputInt4(label: string, v: Bind.ImTuple4<number>, extra_flags: ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt4(label, v, extra_flags);
}

// Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
// IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);     // adjust display_format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
export function SliderFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.SliderFloat(label, v, v_min, v_max, display_format, power);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.SliderFloat(label, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec2, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.SliderFloat2(label, v, v_min, v_max, display_format, power);
    } else {
        const _v: Bind.ImTuple2<number> = [ v.x, v.y ];
        const ret = bind.SliderFloat2(label, _v, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    }
}
// IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.SliderFloat3(label, v, v_min, v_max, display_format, power);
}
// IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat4(label: string, v: Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.SliderFloat4(label, v, v_min, v_max, display_format, power);
}
// IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
export function SliderAngle(label: string, v_rad: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_degrees_min: number = -360.0, v_degrees_max: number = +360.0): boolean {
    if (Array.isArray(v_rad)) {
        return bind.SliderAngle(label, v_rad, v_degrees_min, v_degrees_max);
    } else {
        const ref_v_rad: Bind.ImScalar<number> = [ v_rad() ];
        const ret: boolean = bind.SliderAngle(label, ref_v_rad, v_degrees_min, v_degrees_max);
        v_rad(ref_v_rad[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.SliderInt(label, v, v_min, v_max, display_format);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.SliderInt(label, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt2(label: string, v: Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt2(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt3(label: string, v: Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt3(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt4(label: string, v: Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt4(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function VSliderFloat(label: string, size: Readonly<Bind.interface_ImVec2>, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.VSliderFloat(label, size, v, v_min, v_max, display_format, power);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.VSliderFloat(label, size, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* display_format = "%.0f");
export function VSliderInt(label: string, size: Readonly<Bind.interface_ImVec2>, v: Bind.ImAccess<number> | Bind.ImScalar<number> | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.VSliderInt(label, size, v, v_min, v_max, display_format);
    } else {
        const ref_v: Bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.VSliderInt(label, size, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}

// Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
// Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
// IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
export function ColorEdit3(label: string, col: Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags: ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorEdit3(label, col, flags);
    } else {
        const _col: Bind.ImTuple3<number> = [ col.x, col.y, col.z ];
        const ret = bind.ColorEdit3(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2];
        return ret;
    }
}
// IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
export function ColorEdit4(label: string, col: Bind.ImTuple4<number> | Bind.interface_ImVec4, flags: ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorEdit4(label, col, flags);
    } else {
        const _col: Bind.ImTuple4<number> = [ col.x, col.y, col.z, col.w ];
        const ret = bind.ColorEdit4(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2]; col.w = _col[3];
        return ret;
    }
}
// IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
export function ColorPicker3(label: string, col: Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags: ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorPicker3(label, col, flags);
    } else {
        const _col: Bind.ImTuple3<number> = [ col.x, col.y, col.z ];
        const ret = bind.ColorPicker3(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2];
        return ret;
    }
}
// IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
export function ColorPicker4(label: string, col: Bind.ImTuple4<number> | Bind.interface_ImVec4, flags: ImGuiColorEditFlags = 0, ref_col: Bind.ImTuple4<number> | ImVec4 | null = null): boolean {
    if (Array.isArray(col)) {
        return bind.ColorPicker4(label, col, flags, ref_col);
    } else {
        const _col: Bind.ImTuple4<number> = [ col.x, col.y, col.z, col.w ];
        const ret = bind.ColorPicker4(label, _col, flags, ref_col);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2]; col.w = _col[3];
        return ret;
    }
}
// IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
export function ColorButton(desc_id: string, col: Readonly<Bind.interface_ImVec4>, flags: ImGuiColorEditFlags = 0, size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    return bind.ColorButton(desc_id, col, flags, size);
}
// IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
export function SetColorEditOptions(flags: ImGuiColorEditFlags): void {
    bind.SetColorEditOptions(flags);
}

// Widgets: Trees
// IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
// IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
// IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
// IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
// IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
export function TreeNode(label_or_id: string | number, fmt?: string): boolean {
    return bind.TreeNode(label_or_id, fmt || ((typeof(label_or_id) === "string") ? label_or_id : ""));
}
// IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
// IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
// IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
export function TreeNodeEx(label_or_id: string | number, flags: ImGuiTreeNodeFlags = 0, fmt?: string): boolean {
    return bind.TreeNodeEx(label_or_id, flags, fmt || ((typeof(label_or_id) === "string") ? label_or_id : ""));
}
// IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
// IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
export const TreePush = bind.TreePush;
// IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
export const TreePop = bind.TreePop;
// IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
export const TreeAdvanceToLabelPos = bind.TreeAdvanceToLabelPos;
// IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
export const GetTreeNodeToLabelSpacing = bind.GetTreeNodeToLabelSpacing;
// IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
export function SetNextTreeNodeOpen(is_open: boolean, cond: ImGuiCond = 0): void {
    bind.SetNextTreeNodeOpen(is_open, cond);
}
// IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
// IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
export function CollapsingHeader(label: string, flags_or_p_open: ImGuiTreeNodeFlags | Bind.ImScalar<boolean> | Bind.ImAccess<boolean> = 0, flags: ImGuiTreeNodeFlags = 0): boolean {
    if (Array.isArray(flags_or_p_open)) {
        return bind.CollapsingHeader(label, flags_or_p_open, flags);
    } else if (typeof(flags_or_p_open) === "number") {
        return bind.CollapsingHeader(label, null, flags_or_p_open);
    } else {
        const ref_open: Bind.ImScalar<boolean> = [ flags_or_p_open() ];
        const ret = bind.CollapsingHeader(label, ref_open, flags);
        flags_or_p_open(ref_open[0]);
        return ret;
    }
}

// Widgets: Selectable / Lists
// IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
// IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
export function Selectable(label: string, selected: boolean | Bind.ImScalar<boolean> | Bind.ImAccess<boolean> = false, flags: ImGuiSelectableFlags = 0, size: Readonly<Bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    if (typeof(selected) === "boolean" || Array.isArray(selected)) {
        return bind.Selectable(label, selected, flags, size);
    } else {
        const ref_selected: Bind.ImScalar<boolean> = [ selected() ];
        const ret = bind.Selectable(label, ref_selected, flags, size);
        selected(ref_selected[0]);
        return ret;
    }
}
// IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
// IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
export function ListBox(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items: string[], items_count: number = items.length, height_in_items: number = -1): boolean {
    if (Array.isArray(current_item)) {
        return bind.ListBox(label, current_item, items, items_count, height_in_items);
    } else {
        const ref_current_item: Bind.ImScalar<number> = [ current_item() ];
        const ret = bind.ListBox(label, ref_current_item, items, items_count, height_in_items);
        current_item(ref_current_item[0]);
        return ret;
    }
}
// IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
// IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
export function ListBoxHeader(label: string, size: Readonly<Bind.interface_ImVec2>): boolean {
    return bind.ListBoxHeader(label, size);
}
// IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
export function ListBoxFooter(): void {
    bind.ListBoxFooter();
}

// Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
// IMGUI_API void          Value(const char* prefix, bool b);
// IMGUI_API void          Value(const char* prefix, int v);
// IMGUI_API void          Value(const char* prefix, unsigned int v);
// IMGUI_API void          Value(const char* prefix, float v, const char* float_format = NULL);
export function Value(prefix: string, ...args: any[]): void {
}

// Tooltips
// IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
// IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
export function SetTooltip(fmt: string): void {
    bind.SetTooltip(fmt);
}
// IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
export const BeginTooltip = bind.BeginTooltip;
// IMGUI_API void          EndTooltip();
export const EndTooltip = bind.EndTooltip;

// Menus
// IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
export const BeginMainMenuBar = bind.BeginMainMenuBar;
// IMGUI_API void          EndMainMenuBar();
export const EndMainMenuBar = bind.EndMainMenuBar;
// IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
export const BeginMenuBar = bind.BeginMenuBar;
// IMGUI_API void          EndMenuBar();
export const EndMenuBar = bind.EndMenuBar;
// IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
export function BeginMenu(label: string, enabled: boolean = true): boolean { return bind.BeginMenu(label, enabled); }
// IMGUI_API void          EndMenu();
export const EndMenu = bind.EndMenu;
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
export function MenuItem(label: string, shortcut: string | null = null, selected: boolean | Bind.ImScalar<boolean> | Bind.ImAccess<boolean> = false, enabled: boolean = true): boolean {
    if (shortcut === null) { shortcut = ""; }
    if (typeof(selected) === "boolean") {
        selected = [ selected ];
        return bind.MenuItem(label, shortcut, selected, enabled);
    } else if (Array.isArray(selected)) {
        return bind.MenuItem(label, shortcut, selected, enabled);
    } else {
        const ref_selected: Bind.ImScalar<boolean> = [ selected() ];
        const ret = bind.MenuItem(label, shortcut, ref_selected, enabled);
        selected(ref_selected[0]);
        return ret;
    }
}

// Popups
// IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
export const OpenPopup = bind.OpenPopup;
// IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
export function OpenPopupOnItemClick(str_id: string = "", mouse_button: number = 1): boolean {
    return bind.OpenPopupOnItemClick(str_id, mouse_button);
}
// IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
export const BeginPopup = bind.BeginPopup;
// IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
export function BeginPopupModal(str_id: string = "", p_open: Bind.ImScalar<boolean> | null = null, extra_flags: ImGuiWindowFlags = 0): boolean {
    p_open = p_open || [ true ];
    return bind.BeginPopupModal(str_id, p_open, extra_flags);
}
// IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
export function BeginPopupContextItem(str_id: string = "", mouse_button: number = 1): boolean {
    return bind.BeginPopupContextItem(str_id, mouse_button);
}
// IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
export function BeginPopupContextWindow(str_id: string = "", mouse_button: number = 1, also_over_items: boolean = true): boolean {
    return bind.BeginPopupContextWindow(str_id, mouse_button, also_over_items);
}
// IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
export function BeginPopupContextVoid(str_id: string = "", mouse_button: number = 1): boolean {
    return bind.BeginPopupContextVoid(str_id, mouse_button);
}
// IMGUI_API void          EndPopup();
export const EndPopup = bind.EndPopup;
// IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
export const IsPopupOpen = bind.IsPopupOpen;
// IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
export const CloseCurrentPopup = bind.CloseCurrentPopup;

// Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
// IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
export function LogToTTY(max_depth: number = -1): void {
    bind.LogToTTY(max_depth);
}
// IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
export function LogToFile(max_depth: number = -1, filename: string | null = null): void {
    bind.LogToFile(max_depth, filename);
}
// IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
export function LogToClipboard(max_depth: number = -1): void {
    bind.LogToClipboard(max_depth);
}
// IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
export const LogFinish = bind.LogFinish;
// IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
export const LogButtons = bind.LogButtons;
// IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
export function LogText(fmt: string): void {
    bind.LogText(fmt);
}

// Drag and Drop
// [BETA API] Missing Demo code. API may evolve.
// IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
export function BeginDragDropSource(flags: ImGuiDragDropFlags = 0, mouse_button: number = 0): boolean {
    return false;
}
// IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
export function SetDragDropPayload(type: string, data: any, size: number, cond: ImGuiCond = 0): boolean {
    return false;
}
// IMGUI_API void          EndDragDropSource();
export function EndDragDropSource(): void {
}
// IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
export function BeginDragDropTarget(): boolean {
    return false;
}
// IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
export function AcceptDragDropPayload(type: string, flags: ImGuiDragDropFlags = 0): any {
    return null;
}
// IMGUI_API void          EndDragDropTarget();
export function EndDragDropTarget(): void {
}

// Clipping
// IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
export function PushClipRect(clip_rect_min: Readonly<Bind.interface_ImVec2>, clip_rect_max: Readonly<Bind.interface_ImVec2>, intersect_with_current_clip_rect: boolean): void {
    bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
}
// IMGUI_API void          PopClipRect();
export function PopClipRect(): void {
    bind.PopClipRect();
}

// Focus
// (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
// (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
// IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
export const SetItemDefaultFocus = bind.SetItemDefaultFocus;
// IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
export function SetKeyboardFocusHere(offset: number = 0): void {
    bind.SetKeyboardFocusHere(offset);
}

// Utilities
// IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
export function IsItemHovered(flags: ImGuiHoveredFlags = 0): boolean {
    return bind.IsItemHovered(flags);
}
// IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
export const IsItemActive = bind.IsItemActive;
// IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
export const IsItemFocused = bind.IsItemFocused;
// IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
export function IsItemClicked(mouse_button: number = 0): boolean {
    return bind.IsItemClicked(mouse_button);
}
// IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
export const IsItemVisible = bind.IsItemVisible;
// IMGUI_API bool          IsAnyItemHovered();
export const IsAnyItemHovered = bind.IsAnyItemHovered;
// IMGUI_API bool          IsAnyItemActive();
export const IsAnyItemActive = bind.IsAnyItemActive;
// IMGUI_API bool          IsAnyItemFocused();
export const IsAnyItemFocused = bind.IsAnyItemFocused;
// IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
export function GetItemRectMin(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectMin(out);
}
// IMGUI_API ImVec2        GetItemRectMax();                                                   // "
export function GetItemRectMax(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectMax(out);
}
// IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
export function GetItemRectSize(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectSize(out);
}
// IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
export const SetItemAllowOverlap = bind.SetItemAllowOverlap;
// IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
export function IsWindowFocused(flags: ImGuiFocusedFlags = 0): boolean {
    return bind.IsWindowFocused(flags);
}
// IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
export function IsWindowHovered(flags: ImGuiHoveredFlags = 0): boolean {
    return bind.IsWindowHovered(flags);
}
// IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
// IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
export function IsRectVisible(size_or_rect_min: Readonly<Bind.interface_ImVec2>, rect_max?: Readonly<Bind.interface_ImVec2>): boolean {
    return bind.IsRectVisible(size_or_rect_min, rect_max);
}
// IMGUI_API float         GetTime();
export const GetTime = bind.GetTime;
// IMGUI_API int           GetFrameCount();
export const GetFrameCount = bind.GetFrameCount;
// IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
export function GetOverlayDrawList(): ImDrawList {
    return new ImDrawList(bind.GetOverlayDrawList());
}
// IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
export function GetDrawListSharedData(): ImDrawListSharedData {
    return new ImDrawListSharedData(bind.GetDrawListSharedData());
}
// IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
export const GetStyleColorName = bind.GetStyleColorName;
// IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
export function CalcTextSize(text: string, text_end: string | null = null, hide_text_after_double_hash: boolean = false, wrap_width: number = -1, out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.CalcTextSize(text, text_end, hide_text_after_double_hash, wrap_width, out);
}
// IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
export function CalcListClipping(items_count: number, items_height: number, out_items_display_start: Bind.ImScalar<number>, out_items_display_end: Bind.ImScalar<number>): void {
    return bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
}

// IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
export function BeginChildFrame(id: Bind.ImGuiID, size: Readonly<Bind.interface_ImVec2>, extra_flags: ImGuiWindowFlags = 0): boolean {
    return bind.BeginChildFrame(id, size, extra_flags);
}
// IMGUI_API void          EndChildFrame();
export const EndChildFrame = bind.EndChildFrame;

// IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
export function ColorConvertU32ToFloat4(in_: Bind.ImU32, out: Bind.interface_ImVec4 = new ImVec4()): typeof out {
    return bind.ColorConvertU32ToFloat4(in_, out);
}
// IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
export function ColorConvertFloat4ToU32(in_: Readonly<Bind.interface_ImVec4>): Bind.ImU32 {
    return bind.ColorConvertFloat4ToU32(in_);
}
// IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
export const ColorConvertRGBtoHSV = bind.ColorConvertRGBtoHSV;
// IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
export const ColorConvertHSVtoRGB = bind.ColorConvertHSVtoRGB;

// Inputs
// IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
export function GetKeyIndex(imgui_key: ImGuiKey): number {
    return bind.GetKeyIndex(imgui_key);
}
// IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
export function IsKeyDown(user_key_index: number): boolean {
    return bind.IsKeyDown(user_key_index);
}
// IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
export function IsKeyPressed(user_key_index: number, repeat: boolean = true): boolean {
    return bind.IsKeyPressed(user_key_index, repeat);
}
// IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
export function IsKeyReleased(user_key_index: number): boolean {
    return bind.IsKeyReleased(user_key_index);
}
// IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
export function GetKeyPressedAmount(user_key_index: number, repeat_delay: number, rate: number): number {
    return bind.GetKeyPressedAmount(user_key_index, repeat_delay, rate);
}
// IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
export function IsMouseDown(button: number): boolean {
    return bind.IsMouseDown(button);
}
// IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
export function IsMouseClicked(button: number, repeat: boolean = false): boolean {
    return bind.IsMouseClicked(button, repeat);
}
// IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
export function IsMouseDoubleClicked(button: number): boolean {
    return bind.IsMouseDoubleClicked(button);
}
// IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
export function IsMouseReleased(button: number): boolean {
    return bind.IsMouseReleased(button);
}
// IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
export function IsMouseDragging(button: number = 0, lock_threshold: number = -1.0): boolean {
    return bind.IsMouseDragging(button, lock_threshold);
}
// IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
export function IsMouseHoveringRect(r_min: Readonly<Bind.interface_ImVec2>, r_max: Readonly<Bind.interface_ImVec2>, clip: boolean = true): boolean {
    return bind.IsMouseHoveringRect(r_min, r_max, clip);
}
// IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
export function IsMousePosValid(mouse_pos: Readonly<Bind.interface_ImVec2> | null = null): boolean {
    return bind.IsMousePosValid(mouse_pos);
}
// IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
export function GetMousePos(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMousePos(out);
}
// IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
export function GetMousePosOnOpeningCurrentPopup(out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMousePosOnOpeningCurrentPopup(out);
}
// IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
export function GetMouseDragDelta(button: number = 0, lock_threshold: number = -1.0, out: Bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMouseDragDelta(button, lock_threshold, out);
}
// IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
export function ResetMouseDragDelta(button: number = 0): void {
    bind.ResetMouseDragDelta(button);
}
// IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
export const GetMouseCursor = bind.GetMouseCursor;
// IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
export const SetMouseCursor = bind.SetMouseCursor;
// IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
export function CaptureKeyboardFromApp(capture: boolean = true) {
    return bind.CaptureKeyboardFromApp(capture);
}
// IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
export function CaptureMouseFromApp(capture: boolean = true): void {
    bind.CaptureMouseFromApp(capture);
}

// Helpers functions to access functions pointers in ImGui::GetIO()
// IMGUI_API void*         MemAlloc(size_t sz);
export const MemAlloc = bind.MemAlloc;
// IMGUI_API void          MemFree(void* ptr);
export const MemFree = bind.MemFree;
// IMGUI_API const char*   GetClipboardText();
export const GetClipboardText = bind.GetClipboardText;
// IMGUI_API void          SetClipboardText(const char* text);
export const SetClipboardText = bind.SetClipboardText;
