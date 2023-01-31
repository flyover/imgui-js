export interface XY {
    x: number;
    y: number;
}
export interface XYZ extends XY {
    z: number;
}
export interface XYZW extends XYZ {
    w: number;
}
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface RGBA extends RGB {
    a: number;
}
import * as Bind from "bind-imgui";
export { Bind };
declare let bind: Bind.Module;
export default function (value?: Partial<Bind.Module>): Promise<void>;
export { bind };
export { IMGUI_VERSION as VERSION };
export declare const IMGUI_VERSION: string;
export { IMGUI_VERSION_NUM as VERSION_NUM };
export declare const IMGUI_VERSION_NUM: number;
export { IMGUI_CHECKVERSION as CHECKVERSION };
export declare function IMGUI_CHECKVERSION(): boolean;
export declare const IMGUI_HAS_TABLE: boolean;
export declare function ASSERT(c: any): asserts c;
export declare function IM_ASSERT(c: any): asserts c;
export { IM_ARRAYSIZE as ARRAYSIZE };
export declare function IM_ARRAYSIZE(_ARR: ArrayLike<any> | ImStringBuffer): number;
export { ImStringBuffer as StringBuffer };
export declare class ImStringBuffer {
    size: number;
    buffer: string;
    constructor(size: number, buffer?: string);
}
export type ImAccess<T> = Bind.ImAccess<T>;
export { ImAccess as Access };
export type ImScalar<T> = Bind.ImScalar<T>;
export { ImScalar as Scalar };
export type ImTuple2<T> = Bind.ImTuple2<T>;
export { ImTuple2 as Tuple2 };
export type ImTuple3<T> = Bind.ImTuple3<T>;
export { ImTuple3 as Tuple3 };
export type ImTuple4<T> = Bind.ImTuple4<T>;
export { ImTuple4 as Tuple4 };
export { ImTextureID as TextureID };
export type ImTextureID = WebGLTexture;
export { ImGuiID as ID };
export type ImGuiID = Bind.ImGuiID;
export { ImGuiWindowFlags as WindowFlags };
export declare enum ImGuiWindowFlags {
    None = 0,
    NoTitleBar = 1,
    NoResize = 2,
    NoMove = 4,
    NoScrollbar = 8,
    NoScrollWithMouse = 16,
    NoCollapse = 32,
    AlwaysAutoResize = 64,
    NoBackground = 128,
    NoSavedSettings = 256,
    NoMouseInputs = 512,
    MenuBar = 1024,
    HorizontalScrollbar = 2048,
    NoFocusOnAppearing = 4096,
    NoBringToFrontOnFocus = 8192,
    AlwaysVerticalScrollbar = 16384,
    AlwaysHorizontalScrollbar = 32768,
    AlwaysUseWindowPadding = 65536,
    NoNavInputs = 262144,
    NoNavFocus = 524288,
    UnsavedDocument = 1048576,
    NoNav = 786432,
    NoDecoration = 43,
    NoInputs = 786944,
    NavFlattened = 8388608,
    ChildWindow = 16777216,
    Tooltip = 33554432,
    Popup = 67108864,
    Modal = 134217728,
    ChildMenu = 268435456
}
export { ImGuiInputTextFlags as InputTextFlags };
export declare enum ImGuiInputTextFlags {
    None = 0,
    CharsDecimal = 1,
    CharsHexadecimal = 2,
    CharsUppercase = 4,
    CharsNoBlank = 8,
    AutoSelectAll = 16,
    EnterReturnsTrue = 32,
    CallbackCompletion = 64,
    CallbackHistory = 128,
    CallbackAlways = 256,
    CallbackCharFilter = 512,
    AllowTabInput = 1024,
    CtrlEnterForNewLine = 2048,
    NoHorizontalScroll = 4096,
    AlwaysOverwrite = 8192,
    ReadOnly = 16384,
    Password = 32768,
    NoUndoRedo = 65536,
    CharsScientific = 131072,
    CallbackResize = 262144,
    CallbackEdit = 524288,
    Multiline = 1048576,
    NoMarkEdited = 2097152
}
export { ImGuiTreeNodeFlags as TreeNodeFlags };
export declare enum ImGuiTreeNodeFlags {
    None = 0,
    Selected = 1,
    Framed = 2,
    AllowItemOverlap = 4,
    NoTreePushOnOpen = 8,
    NoAutoOpenOnLog = 16,
    DefaultOpen = 32,
    OpenOnDoubleClick = 64,
    OpenOnArrow = 128,
    Leaf = 256,
    Bullet = 512,
    FramePadding = 1024,
    SpanAvailWidth = 2048,
    SpanFullWidth = 4096,
    NavLeftJumpsBackHere = 8192,
    CollapsingHeader = 26
}
export { ImGuiPopupFlags as PopupFlags };
export declare enum ImGuiPopupFlags {
    None = 0,
    MouseButtonLeft = 0,
    MouseButtonRight = 1,
    MouseButtonMiddle = 2,
    MouseButtonMask_ = 31,
    MouseButtonDefault_ = 1,
    NoOpenOverExistingPopup = 32,
    NoOpenOverItems = 64,
    AnyPopupId = 128,
    AnyPopupLevel = 256,
    AnyPopup = 384
}
export { ImGuiSelectableFlags as SelectableFlags };
export declare enum ImGuiSelectableFlags {
    None = 0,
    DontClosePopups = 1,
    SpanAllColumns = 2,
    AllowDoubleClick = 4,
    Disabled = 8,
    AllowItemOverlap = 16
}
export { ImGuiComboFlags as ComboFlags };
export declare enum ImGuiComboFlags {
    None = 0,
    PopupAlignLeft = 1,
    HeightSmall = 2,
    HeightRegular = 4,
    HeightLarge = 8,
    HeightLargest = 16,
    NoArrowButton = 32,
    NoPreview = 64,
    HeightMask_ = 30
}
export { ImGuiTabBarFlags as TabBarFlags };
export declare enum ImGuiTabBarFlags {
    None = 0,
    Reorderable = 1,
    AutoSelectNewTabs = 2,
    TabListPopupButton = 4,
    NoCloseWithMiddleMouseButton = 8,
    NoTabListScrollingButtons = 16,
    NoTooltip = 32,
    FittingPolicyResizeDown = 64,
    FittingPolicyScroll = 128,
    FittingPolicyMask_ = 192,
    FittingPolicyDefault_ = 64
}
export { ImGuiTabItemFlags as TabItemFlags };
export declare enum ImGuiTabItemFlags {
    None = 0,
    UnsavedDocument = 1,
    SetSelected = 2,
    NoCloseWithMiddleMouseButton = 4,
    NoPushId = 8,
    NoTooltip = 16,
    NoReorder = 32,
    Leading = 64,
    Trailing = 128
}
export { ImGuiTableFlags as TableFlags };
export declare enum ImGuiTableFlags {
    None = 0,
    Resizable = 1,
    Reorderable = 2,
    Hideable = 4,
    Sortable = 8,
    NoSavedSettings = 16,
    ContextMenuInBody = 32,
    RowBg = 64,
    BordersInnerH = 128,
    BordersOuterH = 256,
    BordersInnerV = 512,
    BordersOuterV = 1024,
    BordersH = 384,
    BordersV = 1536,
    BordersInner = 640,
    BordersOuter = 1280,
    Borders = 1920,
    NoBordersInBody = 2048,
    NoBordersInBodyUntilResize = 4096,
    SizingFixedFit = 8192,
    SizingFixedSame = 16384,
    SizingStretchProp = 24576,
    SizingStretchSame = 32768,
    NoHostExtendX = 65536,
    NoHostExtendY = 131072,
    NoKeepColumnsVisible = 262144,
    PreciseWidths = 524288,
    NoClip = 1048576,
    PadOuterX = 2097152,
    NoPadOuterX = 4194304,
    NoPadInnerX = 8388608,
    ScrollX = 16777216,
    ScrollY = 33554432,
    SortMulti = 67108864,
    SortTristate = 134217728,
    SizingMask_ = 57344
}
export { ImGuiTableColumnFlags as TableColumnFlags };
export declare enum ImGuiTableColumnFlags {
    None = 0,
    Disabled = 1,
    DefaultHide = 2,
    DefaultSort = 4,
    WidthStretch = 8,
    WidthFixed = 16,
    NoResize = 32,
    NoReorder = 64,
    NoHide = 128,
    NoClip = 256,
    NoSort = 512,
    NoSortAscending = 1024,
    NoSortDescending = 2048,
    NoHeaderLabel = 4096,
    NoHeaderWidth = 8192,
    PreferSortAscending = 16384,
    PreferSortDescending = 32768,
    IndentEnable = 65536,
    IndentDisable = 131072,
    IsEnabled = 16777216,
    IsVisible = 33554432,
    IsSorted = 67108864,
    IsHovered = 134217728,
    WidthMask_ = 24,
    IndentMask_ = 196608,
    StatusMask_ = 251658240,
    NoDirectResize_ = 1073741824
}
export { ImGuiTableRowFlags as TableRowFlags };
export declare enum ImGuiTableRowFlags {
    None = 0,
    Headers = 1
}
export { ImGuiTableBgTarget as TableBgTarget };
export declare enum ImGuiTableBgTarget {
    None = 0,
    RowBg0 = 1,
    RowBg1 = 2,
    CellBg = 3
}
export { ImGuiFocusedFlags as FocusedFlags };
export declare enum ImGuiFocusedFlags {
    None = 0,
    ChildWindows = 1,
    RootWindow = 2,
    AnyWindow = 4,
    NoPopupHierarchy = 8,
    RootAndChildWindows = 3
}
export { ImGuiHoveredFlags as HoveredFlags };
export declare enum ImGuiHoveredFlags {
    None = 0,
    ChildWindows = 1,
    RootWindow = 2,
    AnyWindow = 4,
    NoPopupHierarchy = 8,
    AllowWhenBlockedByPopup = 32,
    AllowWhenBlockedByActiveItem = 128,
    AllowWhenOverlapped = 256,
    AllowWhenDisabled = 512,
    RectOnly = 416,
    RootAndChildWindows = 3
}
export { ImGuiDragDropFlags as DragDropFlags };
export declare enum ImGuiDragDropFlags {
    None = 0,
    SourceNoPreviewTooltip = 1,
    SourceNoDisableHover = 2,
    SourceNoHoldToOpenOthers = 4,
    SourceAllowNullID = 8,
    SourceExtern = 16,
    SourceAutoExpirePayload = 32,
    AcceptBeforeDelivery = 1024,
    AcceptNoDrawDefaultRect = 2048,
    AcceptNoPreviewTooltip = 4096,
    AcceptPeekOnly = 3072
}
export declare const IMGUI_PAYLOAD_TYPE_COLOR_3F: string;
export declare const IMGUI_PAYLOAD_TYPE_COLOR_4F: string;
export { ImGuiDataType as DataType };
export declare enum ImGuiDataType {
    S8 = 0,
    U8 = 1,
    S16 = 2,
    U16 = 3,
    S32 = 4,
    U32 = 5,
    S64 = 6,
    U64 = 7,
    Float = 8,
    Double = 9,
    COUNT = 10
}
export { ImGuiDir as Dir };
export declare enum ImGuiDir {
    None = -1,
    Left = 0,
    Right = 1,
    Up = 2,
    Down = 3,
    COUNT = 4
}
export { ImGuiSortDirection as SortDirection };
export declare enum ImGuiSortDirection {
    None = 0,
    Ascending = 1,
    Descending = 2
}
export { ImGuiKey as Key };
export declare enum ImGuiKey {
    Tab = 0,
    LeftArrow = 1,
    RightArrow = 2,
    UpArrow = 3,
    DownArrow = 4,
    PageUp = 5,
    PageDown = 6,
    Home = 7,
    End = 8,
    Insert = 9,
    Delete = 10,
    Backspace = 11,
    Space = 12,
    Enter = 13,
    Escape = 14,
    KeyPadEnter = 15,
    A = 16,
    C = 17,
    V = 18,
    X = 19,
    Y = 20,
    Z = 21,
    COUNT = 22
}
export { ImGuiKeyModFlags as KeyModFlags };
export declare enum ImGuiKeyModFlags {
    None = 0,
    Ctrl = 1,
    Shift = 2,
    Alt = 4,
    Super = 8
}
export { ImGuiNavInput as NavInput };
export declare enum ImGuiNavInput {
    Activate = 0,
    Cancel = 1,
    Input = 2,
    Menu = 3,
    DpadLeft = 4,
    DpadRight = 5,
    DpadUp = 6,
    DpadDown = 7,
    LStickLeft = 8,
    LStickRight = 9,
    LStickUp = 10,
    LStickDown = 11,
    FocusPrev = 12,
    FocusNext = 13,
    TweakSlow = 14,
    TweakFast = 15,
    KeyLeft_ = 16,
    KeyRight_ = 17,
    KeyUp_ = 18,
    KeyDown_ = 19,
    COUNT = 20,
    InternalStart_ = 16
}
export { ImGuiConfigFlags as ConfigFlags };
export declare enum ImGuiConfigFlags {
    None = 0,
    NavEnableKeyboard = 1,
    NavEnableGamepad = 2,
    NavEnableSetMousePos = 4,
    NavNoCaptureKeyboard = 8,
    NoMouse = 16,
    NoMouseCursorChange = 32,
    IsSRGB = 1048576,
    IsTouchScreen = 2097152
}
export { ImGuiCol as Col };
export declare enum ImGuiCol {
    Text = 0,
    TextDisabled = 1,
    WindowBg = 2,
    ChildBg = 3,
    PopupBg = 4,
    Border = 5,
    BorderShadow = 6,
    FrameBg = 7,
    FrameBgHovered = 8,
    FrameBgActive = 9,
    TitleBg = 10,
    TitleBgActive = 11,
    TitleBgCollapsed = 12,
    MenuBarBg = 13,
    ScrollbarBg = 14,
    ScrollbarGrab = 15,
    ScrollbarGrabHovered = 16,
    ScrollbarGrabActive = 17,
    CheckMark = 18,
    SliderGrab = 19,
    SliderGrabActive = 20,
    Button = 21,
    ButtonHovered = 22,
    ButtonActive = 23,
    Header = 24,
    HeaderHovered = 25,
    HeaderActive = 26,
    Separator = 27,
    SeparatorHovered = 28,
    SeparatorActive = 29,
    ResizeGrip = 30,
    ResizeGripHovered = 31,
    ResizeGripActive = 32,
    Tab = 33,
    TabHovered = 34,
    TabActive = 35,
    TabUnfocused = 36,
    TabUnfocusedActive = 37,
    PlotLines = 38,
    PlotLinesHovered = 39,
    PlotHistogram = 40,
    PlotHistogramHovered = 41,
    TableHeaderBg = 42,
    TableBorderStrong = 43,
    TableBorderLight = 44,
    TableRowBg = 45,
    TableRowBgAlt = 46,
    TextSelectedBg = 47,
    DragDropTarget = 48,
    NavHighlight = 49,
    NavWindowingHighlight = 50,
    NavWindowingDimBg = 51,
    ModalWindowDimBg = 52,
    COUNT = 53
}
export { ImGuiStyleVar as StyleVar };
export declare enum ImGuiStyleVar {
    Alpha = 0,
    DisabledAlpha = 1,
    WindowPadding = 2,
    WindowRounding = 3,
    WindowBorderSize = 4,
    WindowMinSize = 5,
    WindowTitleAlign = 6,
    ChildRounding = 7,
    ChildBorderSize = 8,
    PopupRounding = 9,
    PopupBorderSize = 10,
    FramePadding = 11,
    FrameRounding = 12,
    FrameBorderSize = 13,
    ItemSpacing = 14,
    ItemInnerSpacing = 15,
    IndentSpacing = 16,
    CellPadding = 17,
    ScrollbarSize = 18,
    ScrollbarRounding = 19,
    GrabMinSize = 20,
    GrabRounding = 21,
    TabRounding = 22,
    ButtonTextAlign = 23,
    SelectableTextAlign = 24,
    COUNT = 25
}
export { ImGuiBackendFlags as BackendFlags };
export declare enum ImGuiBackendFlags {
    None = 0,
    HasGamepad = 1,
    HasMouseCursors = 2,
    HasSetMousePos = 4,
    RendererHasVtxOffset = 8
}
export { ImGuiButtonFlags as ButtonFlags };
export declare enum ImGuiButtonFlags {
    None = 0,
    MouseButtonLeft = 1,
    MouseButtonRight = 2,
    MouseButtonMiddle = 4,
    MouseButtonMask_ = 7,
    MouseButtonDefault_ = 1
}
export { ImGuiColorEditFlags as ColorEditFlags };
export declare enum ImGuiColorEditFlags {
    None = 0,
    NoAlpha = 2,
    NoPicker = 4,
    NoOptions = 8,
    NoSmallPreview = 16,
    NoInputs = 32,
    NoTooltip = 64,
    NoLabel = 128,
    NoSidePreview = 256,
    NoDragDrop = 512,
    NoBorder = 1024,
    AlphaBar = 65536,
    AlphaPreview = 131072,
    AlphaPreviewHalf = 262144,
    HDR = 524288,
    DisplayRGB = 1048576,
    DisplayHSV = 2097152,
    DisplayHex = 4194304,
    Uint8 = 8388608,
    Float = 16777216,
    PickerHueBar = 33554432,
    PickerHueWheel = 67108864,
    InputRGB = 134217728,
    InputHSV = 268435456,
    DefaultOptions_ = 177209344,
    DisplayMask_ = 7340032,
    DataTypeMask_ = 25165824,
    PickerMask_ = 100663296,
    InputMask_ = 402653184
}
export { ImGuiSliderFlags as SliderFlags };
export declare enum ImGuiSliderFlags {
    None = 0,
    AlwaysClamp = 16,
    Logarithmic = 32,
    NoRoundToFormat = 64,
    NoInput = 128,
    InvalidMask_ = 1879048207
}
export { ImGuiMouseButton as MouseButton };
export declare enum ImGuiMouseButton {
    Left = 0,
    Right = 1,
    Middle = 2,
    COUNT = 5
}
export { ImGuiMouseCursor as MouseCursor };
export declare enum ImGuiMouseCursor {
    None = -1,
    Arrow = 0,
    TextInput = 1,
    ResizeAll = 2,
    ResizeNS = 3,
    ResizeEW = 4,
    ResizeNESW = 5,
    ResizeNWSE = 6,
    Hand = 7,
    NotAllowed = 8,
    COUNT = 9
}
export { ImGuiCond as Cond };
export declare enum ImGuiCond {
    None = 0,
    Always = 1,
    Once = 2,
    FirstUseEver = 4,
    Appearing = 8
}
export { ImDrawFlags as DrawFlags };
export declare enum ImDrawFlags {
    None = 0,
    Closed = 1,
    RoundCornersTopLeft = 16,
    RoundCornersTopRight = 32,
    RoundCornersBottomLeft = 64,
    RoundCornersBottomRight = 128,
    RoundCornersNone = 256,
    RoundCornersTop = 48,
    RoundCornersBottom = 192,
    RoundCornersLeft = 80,
    RoundCornersRight = 160,
    RoundCornersAll = 240,
    RoundCornersDefault_ = 240,
    RoundCornersMask_ = 496
}
export { ImDrawListFlags as wListFlags };
export declare enum ImDrawListFlags {
    None = 0,
    AntiAliasedLines = 1,
    AntiAliasedLinesUseTex = 2,
    AntiAliasedFill = 4,
    AllowVtxOffset = 8
}
export { ImU32 as U32 };
export type ImU32 = Bind.ImU32;
export { interface_ImVec2 } from "bind-imgui";
export { reference_ImVec2 } from "bind-imgui";
export { ImVec2 as Vec2 };
export declare class ImVec2 implements Bind.interface_ImVec2 {
    x: number;
    y: number;
    static readonly ZERO: Readonly<ImVec2>;
    static readonly UNIT: Readonly<ImVec2>;
    static readonly UNIT_X: Readonly<ImVec2>;
    static readonly UNIT_Y: Readonly<ImVec2>;
    constructor(x?: number, y?: number);
    Set(x: number, y: number): this;
    Copy(other: Readonly<Bind.interface_ImVec2>): this;
    Equals(other: Readonly<Bind.interface_ImVec2>): boolean;
}
export { interface_ImVec4 } from "bind-imgui";
export { reference_ImVec4 } from "bind-imgui";
export { ImVec4 as Vec4 };
export declare class ImVec4 implements Bind.interface_ImVec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    static readonly ZERO: Readonly<ImVec4>;
    static readonly UNIT: Readonly<ImVec4>;
    static readonly UNIT_X: Readonly<ImVec4>;
    static readonly UNIT_Y: Readonly<ImVec4>;
    static readonly UNIT_Z: Readonly<ImVec4>;
    static readonly UNIT_W: Readonly<ImVec4>;
    static readonly BLACK: Readonly<ImVec4>;
    static readonly WHITE: Readonly<ImVec4>;
    constructor(x?: number, y?: number, z?: number, w?: number);
    Set(x: number, y: number, z: number, w: number): this;
    Copy(other: Readonly<Bind.interface_ImVec4>): this;
    Equals(other: Readonly<Bind.interface_ImVec4>): boolean;
}
export { ImVector as Vector };
export declare class ImVector<T> extends Array<T> {
    get Size(): number;
    Data: T[];
    empty(): boolean;
    clear(): void;
    pop_back(): T | undefined;
    push_back(value: T): void;
    front(): T;
    back(): T;
    size(): number;
    resize(new_size: number, v?: (index: number) => T): void;
    contains(value: T): boolean;
    find_erase_unsorted(value: T): void;
}
export { IM_UNICODE_CODEPOINT_MAX as UNICODE_CODEPOINT_MAX };
export declare const IM_UNICODE_CODEPOINT_MAX: number;
export { ImGuiTextFilter as TextFilter };
export declare class ImGuiTextFilter {
    constructor(default_filter?: string);
    Draw(label?: string, width?: number): boolean;
    PassFilter(text: string, text_end?: number | null): boolean;
    Build(): void;
    Clear(): void;
    IsActive(): boolean;
    InputBuf: ImStringBuffer;
    CountGrep: number;
}
export { ImGuiTextBuffer as TextBuffer };
export declare class ImGuiTextBuffer {
    Buf: string;
    begin(): string;
    size(): number;
    clear(): void;
    append(text: string): void;
}
export declare class ImGuiStorage {
}
export { ImGuiPayload as Payload };
export interface ImGuiPayload<T> {
    Data: T;
}
export declare const IM_COL32_R_SHIFT: number;
export declare const IM_COL32_G_SHIFT: number;
export declare const IM_COL32_B_SHIFT: number;
export declare const IM_COL32_A_SHIFT: number;
export declare const IM_COL32_A_MASK: number;
export { IM_COL32 as COL32 };
export declare function IM_COL32(R: number, G: number, B: number, A?: number): number;
export declare const IM_COL32_WHITE: number;
export { IM_COL32_WHITE as COL32_WHITE };
export declare const IM_COL32_BLACK: number;
export { IM_COL32_BLACK as COL32_BLACK };
export declare const IM_COL32_BLACK_TRANS: number;
export { IM_COL32_BLACK_TRANS as COL32_BLACK_TRANS };
export { ImColor as Color };
export declare class ImColor {
    Value: ImVec4;
    constructor();
    constructor(r: number, g: number, b: number);
    constructor(r: number, g: number, b: number, a: number);
    constructor(rgba: Bind.ImU32);
    constructor(col: Readonly<Bind.interface_ImVec4>);
    toImU32(): Bind.ImU32;
    toImVec4(): ImVec4;
    SetHSV(h: number, s: number, v: number, a?: number): void;
    static HSV(h: number, s: number, v: number, a?: number): ImColor;
}
export { ImGuiInputTextDefaultSize as InputTextDefaultSize };
export declare const ImGuiInputTextDefaultSize: number;
export { ImGuiInputTextCallback as InputTextCallback };
export type ImGuiInputTextCallback<T> = (data: ImGuiInputTextCallbackData<T>) => number;
export { ImGuiInputTextCallbackData as InputTextCallbackData };
export declare class ImGuiInputTextCallbackData<T> {
    readonly native: Bind.reference_ImGuiInputTextCallbackData;
    readonly UserData: T | null;
    constructor(native: Bind.reference_ImGuiInputTextCallbackData, UserData?: T | null);
    get EventFlag(): ImGuiInputTextFlags;
    get Flags(): ImGuiInputTextFlags;
    get EventChar(): Bind.ImWchar;
    set EventChar(value: Bind.ImWchar);
    get EventKey(): ImGuiKey;
    get Buf(): string;
    set Buf(value: string);
    get BufTextLen(): number;
    set BufTextLen(value: number);
    get BufSize(): number;
    set BufDirty(value: boolean);
    get CursorPos(): number;
    set CursorPos(value: number);
    get SelectionStart(): number;
    set SelectionStart(value: number);
    get SelectionEnd(): number;
    set SelectionEnd(value: number);
    DeleteChars(pos: number, bytes_count: number): void;
    InsertChars(pos: number, text: string, text_end?: number | null): void;
    SelectAll(): void;
    ClearSelection(): void;
    HasSelection(): boolean;
}
export { ImGuiSizeCallback as SizeCallback };
export type ImGuiSizeCallback<T> = (data: ImGuiSizeCallbackData<T>) => void;
export { ImGuiSizeCallbackData as SizeCallbackData };
export declare class ImGuiSizeCallbackData<T> {
    readonly native: Bind.reference_ImGuiSizeCallbackData;
    readonly UserData: T;
    constructor(native: Bind.reference_ImGuiSizeCallbackData, UserData: T);
    get Pos(): Readonly<Bind.interface_ImVec2>;
    get CurrentSize(): Readonly<Bind.interface_ImVec2>;
    get DesiredSize(): Bind.interface_ImVec2;
}
export { ImGuiTableColumnSortSpecs as TableColumnSortSpecs };
export declare class ImGuiTableColumnSortSpecs {
    readonly native: Bind.reference_ImGuiTableColumnSortSpecs;
    constructor(native: Bind.reference_ImGuiTableColumnSortSpecs);
    get ColumnUserID(): ImGuiID;
    get ColumnIndex(): Bind.ImS16;
    get SortOrder(): Bind.ImS16;
    get SortDirection(): ImGuiSortDirection;
}
export { ImGuiTableSortSpecs as TableSortSpecs };
export declare class ImGuiTableSortSpecs {
    readonly native: Bind.reference_ImGuiTableSortSpecs;
    constructor(native: Bind.reference_ImGuiTableSortSpecs);
    private _Specs;
    get Specs(): Readonly<ImGuiTableColumnSortSpecs[]>;
    get SpecsCount(): number;
    get SpecsDirty(): boolean;
    set SpecsDirty(value: boolean);
}
export { ImGuiListClipper as ListClipper };
export declare class ImGuiListClipper {
    private _native;
    private get native();
    get DisplayStart(): number;
    get DisplayEnd(): number;
    get ItemsCount(): number;
    get ItemsHeight(): number;
    get StartPosY(): number;
    delete(): void;
    Begin(items_count: number, items_height?: number): void;
    End(): void;
    Step(): boolean;
}
export declare const IM_DRAWLIST_TEX_LINES_WIDTH_MAX: number;
export type ImDrawCallback = (parent_list: Readonly<ImDrawList>, cmd: Readonly<ImDrawCmd>) => void;
export declare const ImDrawCallback_ResetRenderState = -1;
export { ImDrawCmd as DrawCmd };
export declare class ImDrawCmd {
    readonly native: Bind.reference_ImDrawCmd;
    constructor(native: Bind.reference_ImDrawCmd);
    get ElemCount(): number;
    get ClipRect(): Readonly<Bind.reference_ImVec4>;
    get TextureId(): ImTextureID | null;
    get VtxOffset(): number;
    get IdxOffset(): number;
    readonly UserCallback: ImDrawCallback | null;
    readonly UserCallbackData: any;
}
export { ImDrawIdxSize as DrawIdxSize };
export declare const ImDrawIdxSize: number;
export { ImDrawIdx as DrawIdx };
export type ImDrawIdx = number;
export { ImDrawVertSize as DrawVertSize };
export declare const ImDrawVertSize: number;
export { ImDrawVertPosOffset as DrawVertPosOffset };
export declare const ImDrawVertPosOffset: number;
export { ImDrawVertUVOffset as DrawVertUVOffset };
export declare const ImDrawVertUVOffset: number;
export { ImDrawVertColOffset as DrawVertColOffset };
export declare const ImDrawVertColOffset: number;
export { ImDrawVert as DrawVert };
export declare class ImDrawVert {
    pos: Float32Array;
    uv: Float32Array;
    col: Uint32Array;
    constructor(buffer: ArrayBuffer, byteOffset?: number);
}
export declare class ImDrawCmdHeader {
}
export declare class ImDrawChannel {
}
export declare class ImDrawListSharedData {
    readonly native: Bind.reference_ImDrawListSharedData;
    constructor(native: Bind.reference_ImDrawListSharedData);
}
export { ImDrawList as DrawList };
export declare class ImDrawList {
    readonly native: Bind.reference_ImDrawList;
    constructor(native: Bind.reference_ImDrawList);
    IterateDrawCmds(callback: (draw_cmd: ImDrawCmd, ElemStart: number) => void): void;
    get IdxBuffer(): Uint8Array;
    get VtxBuffer(): Uint8Array;
    get Flags(): ImDrawListFlags;
    set Flags(value: ImDrawListFlags);
    PushClipRect(clip_rect_min: Readonly<Bind.interface_ImVec2>, clip_rect_max: Readonly<Bind.interface_ImVec2>, intersect_with_current_clip_rect?: boolean): void;
    PushClipRectFullScreen(): void;
    PopClipRect(): void;
    PushTextureID(texture_id: ImTextureID): void;
    PopTextureID(): void;
    GetClipRectMin(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
    GetClipRectMax(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
    AddLine(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness?: number): void;
    AddRect(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding?: number, flags?: ImDrawFlags, thickness?: number): void;
    AddRectFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding?: number, flags?: ImDrawFlags): void;
    AddRectFilledMultiColor(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col_upr_left: Bind.ImU32, col_upr_right: Bind.ImU32, col_bot_right: Bind.ImU32, col_bot_left: Bind.ImU32): void;
    AddQuad(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness?: number): void;
    AddQuadFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    AddTriangle(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness?: number): void;
    AddTriangleFilled(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    AddCircle(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments?: number, thickness?: number): void;
    AddCircleFilled(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments?: number): void;
    AddNgon(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments: number, thickness?: number): void;
    AddNgonFilled(centre: Readonly<Bind.interface_ImVec2>, radius: number, col: Bind.ImU32, num_segments: number): void;
    AddText(pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, text_begin: string, text_end?: number | null): void;
    AddText(font: ImFont, font_size: number, pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, text_begin: string, text_end?: number | null, wrap_width?: number, cpu_fine_clip_rect?: Readonly<Bind.interface_ImVec4> | null): void;
    AddPolyline(points: Array<Readonly<Bind.interface_ImVec2>>, num_points: number, col: Bind.ImU32, flags: ImDrawFlags, thickness: number): void;
    AddConvexPolyFilled(points: Array<Readonly<Bind.interface_ImVec2>>, num_points: number, col: Bind.ImU32): void;
    AddBezierCubic(p1: Readonly<Bind.interface_ImVec2>, p2: Readonly<Bind.interface_ImVec2>, p3: Readonly<Bind.interface_ImVec2>, p4: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness?: number, num_segments?: number): void;
    AddBezierQuadratic(p1: Readonly<Bind.interface_ImVec2>, p2: Readonly<Bind.interface_ImVec2>, p3: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, thickness?: number, num_segments?: number): void;
    AddImage(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a?: Readonly<Bind.interface_ImVec2>, uv_b?: Readonly<Bind.interface_ImVec2>, col?: Bind.ImU32): void;
    AddImageQuad(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, uv_a?: Readonly<Bind.interface_ImVec2>, uv_b?: Readonly<Bind.interface_ImVec2>, uv_c?: Readonly<Bind.interface_ImVec2>, uv_d?: Readonly<Bind.interface_ImVec2>, col?: Bind.ImU32): void;
    AddImageRounded(user_texture_id: ImTextureID | null, a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, rounding: number, flags?: ImDrawFlags): void;
    PathClear(): void;
    PathLineTo(pos: Readonly<Bind.interface_ImVec2>): void;
    PathLineToMergeDuplicate(pos: Readonly<Bind.interface_ImVec2>): void;
    PathFillConvex(col: Bind.ImU32): void;
    PathStroke(col: Bind.ImU32, flags: ImDrawFlags, thickness?: number): void;
    PathArcTo(centre: Readonly<Bind.interface_ImVec2>, radius: number, a_min: number, a_max: number, num_segments?: number): void;
    PathArcToFast(centre: Readonly<Bind.interface_ImVec2>, radius: number, a_min_of_12: number, a_max_of_12: number): void;
    PathBezierCubicCurveTo(p2: Readonly<Bind.interface_ImVec2>, p3: Readonly<Bind.interface_ImVec2>, p4: Readonly<Bind.interface_ImVec2>, num_segments?: number): void;
    PathBezierQuadraticCurveTo(p2: Readonly<Bind.interface_ImVec2>, p3: Readonly<Bind.interface_ImVec2>, num_segments?: number): void;
    PathRect(rect_min: Readonly<Bind.interface_ImVec2>, rect_max: Readonly<Bind.interface_ImVec2>, rounding?: number, flags?: ImDrawFlags): void;
    ChannelsSplit(channels_count: number): void;
    ChannelsMerge(): void;
    ChannelsSetCurrent(channel_index: number): void;
    AddCallback(callback: ImDrawCallback, callback_data: any): void;
    AddDrawCmd(): void;
    PrimReserve(idx_count: number, vtx_count: number): void;
    PrimUnreserve(idx_count: number, vtx_count: number): void;
    PrimRect(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    PrimRectUV(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    PrimQuadUV(a: Readonly<Bind.interface_ImVec2>, b: Readonly<Bind.interface_ImVec2>, c: Readonly<Bind.interface_ImVec2>, d: Readonly<Bind.interface_ImVec2>, uv_a: Readonly<Bind.interface_ImVec2>, uv_b: Readonly<Bind.interface_ImVec2>, uv_c: Readonly<Bind.interface_ImVec2>, uv_d: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    PrimWriteVtx(pos: Readonly<Bind.interface_ImVec2>, uv: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    PrimWriteIdx(idx: ImDrawIdx): void;
    PrimVtx(pos: Readonly<Bind.interface_ImVec2>, uv: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32): void;
    _CalcCircleAutoSegmentCount(radius: number): number;
}
export { ImDrawData as DrawData };
export declare class ImDrawData {
    readonly native: Bind.reference_ImDrawData;
    constructor(native: Bind.reference_ImDrawData);
    IterateDrawLists(callback: (draw_list: ImDrawList) => void): void;
    get Valid(): boolean;
    get CmdListsCount(): number;
    get TotalIdxCount(): number;
    get TotalVtxCount(): number;
    get DisplayPos(): Readonly<Bind.reference_ImVec2>;
    get DisplaySize(): Readonly<Bind.reference_ImVec2>;
    get FramebufferScale(): Readonly<Bind.reference_ImVec2>;
    DeIndexAllBuffers(): void;
    ScaleClipRects(fb_scale: Readonly<Bind.interface_ImVec2>): void;
}
export declare class script_ImFontConfig implements Bind.interface_ImFontConfig {
    FontData: DataView | null;
    FontDataOwnedByAtlas: boolean;
    FontNo: number;
    SizePixels: number;
    OversampleH: number;
    OversampleV: number;
    PixelSnapH: boolean;
    GlyphExtraSpacing: ImVec2;
    GlyphOffset: ImVec2;
    GlyphRanges: number | null;
    GlyphMinAdvanceX: number;
    GlyphMaxAdvanceX: number;
    MergeMode: boolean;
    FontBuilderFlags: number;
    RasterizerMultiply: number;
    EllipsisChar: number;
    DotChar: number;
    Name: string;
    DstFont: Bind.reference_ImFont | null;
}
export { ImFontConfig as FontConfig };
export declare class ImFontConfig {
    readonly internal: Bind.interface_ImFontConfig;
    constructor(internal?: Bind.interface_ImFontConfig);
    get FontData(): DataView | null;
    get FontDataOwnedByAtlas(): boolean;
    get FontNo(): number;
    get SizePixels(): number;
    get OversampleH(): number;
    get OversampleV(): number;
    get PixelSnapH(): boolean;
    get GlyphExtraSpacing(): ImVec2;
    get GlyphOffset(): ImVec2;
    get GlyphRanges(): number | null;
    get GlyphMinAdvanceX(): number;
    get GlyphMaxAdvanceX(): number;
    get MergeMode(): boolean;
    get FontBuilderFlags(): number;
    get RasterizerMultiply(): number;
    get Name(): string;
    set Name(value: string);
    get DstFont(): ImFont | null;
}
export declare class script_ImFontGlyph implements Bind.interface_ImFontGlyph {
    Colored: boolean;
    Visible: boolean;
    Codepoint: number;
    AdvanceX: number;
    X0: number;
    Y0: number;
    X1: number;
    Y1: number;
    U0: number;
    V0: number;
    U1: number;
    V1: number;
}
export { ImFontGlyph as FontGlyph };
export declare class ImFontGlyph implements Bind.interface_ImFontGlyph {
    readonly internal: Bind.interface_ImFontGlyph;
    constructor(internal?: Bind.interface_ImFontGlyph);
    get Colored(): boolean;
    get Visible(): boolean;
    get Codepoint(): number;
    get AdvanceX(): number;
    get X0(): number;
    get Y0(): number;
    get X1(): number;
    get Y1(): number;
    get U0(): number;
    get V0(): number;
    get U1(): number;
    get V1(): number;
}
export declare class ImFontAtlasCustomRect {
}
export { ImFontAtlasFlags as FontAtlasFlags };
export declare enum ImFontAtlasFlags {
    None = 0,
    NoPowerOfTwoHeight = 1,
    NoMouseCursors = 2,
    NoBakedLines = 4
}
export { ImFontAtlas as FontAtlas };
export declare class ImFontAtlas {
    readonly native: Bind.reference_ImFontAtlas;
    constructor(native: Bind.reference_ImFontAtlas);
    AddFontDefault(font_cfg?: Bind.interface_ImFontConfig | null): ImFont;
    AddFontFromMemoryTTF(data: ArrayBuffer, size_pixels: number, font_cfg?: ImFontConfig | null, glyph_ranges?: number | null): ImFont;
    ClearTexData(): void;
    ClearInputData(): void;
    ClearFonts(): void;
    Clear(): void;
    Build(): boolean;
    IsBuilt(): boolean;
    GetTexDataAsAlpha8(): {
        pixels: Uint8ClampedArray;
        width: number;
        height: number;
        bytes_per_pixel: number;
    };
    GetTexDataAsRGBA32(): {
        pixels: Uint8ClampedArray;
        width: number;
        height: number;
        bytes_per_pixel: number;
    };
    SetTexID(id: ImTextureID | null): void;
    GetGlyphRangesDefault(): number;
    GetGlyphRangesKorean(): number;
    GetGlyphRangesJapanese(): number;
    GetGlyphRangesChineseFull(): number;
    GetGlyphRangesChineseSimplifiedCommon(): number;
    GetGlyphRangesCyrillic(): number;
    GetGlyphRangesThai(): number;
    GetGlyphRangesVietnamese(): number;
    get Locked(): boolean;
    set Locked(value: boolean);
    get Flags(): ImFontAtlasFlags;
    set Flags(value: ImFontAtlasFlags);
    get TexID(): ImTextureID | null;
    set TexID(value: ImTextureID | null);
    get TexDesiredWidth(): number;
    set TexDesiredWidth(value: number);
    get TexGlyphPadding(): number;
    set TexGlyphPadding(value: number);
    get TexWidth(): number;
    get TexHeight(): number;
    get TexUvScale(): Readonly<Bind.reference_ImVec2>;
    get TexUvWhitePixel(): Readonly<Bind.reference_ImVec2>;
    get Fonts(): ImVector<ImFont>;
}
export { ImFont as Font };
export declare class ImFont {
    readonly native: Bind.reference_ImFont;
    constructor(native: Bind.reference_ImFont);
    get FontSize(): number;
    get Scale(): number;
    set Scale(value: number);
    get Glyphs(): ImVector<ImFontGlyph>;
    get FallbackGlyph(): ImFontGlyph | null;
    set FallbackGlyph(value: ImFontGlyph | null);
    get FallbackAdvanceX(): number;
    get FallbackChar(): number;
    get EllipsisChar(): number;
    get DotChar(): number;
    get ConfigDataCount(): number;
    get ConfigData(): ImFontConfig[];
    get ContainerAtlas(): ImFontAtlas | null;
    get Ascent(): number;
    get Descent(): number;
    get MetricsTotalSurface(): number;
    ClearOutputData(): void;
    BuildLookupTable(): void;
    FindGlyph(c: number): Readonly<ImFontGlyph> | null;
    FindGlyphNoFallback(c: number): ImFontGlyph | null;
    GetCharAdvance(c: number): number;
    IsLoaded(): boolean;
    GetDebugName(): string;
    CalcTextSizeA(size: number, max_width: number, wrap_width: number, text_begin: string, text_end?: number | null, remaining?: Bind.ImScalar<number> | null): Bind.interface_ImVec2;
    CalcWordWrapPositionA(scale: number, text: string, text_end: number | null | undefined, wrap_width: number): number;
    RenderChar(draw_list: ImDrawList, size: number, pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, c: Bind.ImWchar): void;
    RenderText(draw_list: ImDrawList, size: number, pos: Readonly<Bind.interface_ImVec2>, col: Bind.ImU32, clip_rect: Readonly<Bind.interface_ImVec4>, text_begin: string, text_end?: number | null, wrap_width?: number, cpu_fine_clip?: boolean): void;
    IsGlyphRangeUnused(c_begin: number, c_last: number): boolean;
}
export { ImGuiViewportFlags as ViewportFlags };
export declare enum ImGuiViewportFlags {
    None = 0,
    IsPlatformWindow = 1,
    IsPlatformMonitor = 2,
    OwnedByApp = 4
}
export { ImGuiViewport as Viewport };
export declare class ImGuiViewport {
    readonly native: Bind.reference_ImGuiViewport;
    constructor(native: Bind.reference_ImGuiViewport);
    get Flags(): ImGuiViewportFlags;
    get Pos(): Bind.interface_ImVec2;
    get Size(): Bind.interface_ImVec2;
    get WorkPos(): Bind.interface_ImVec2;
    get WorkSize(): Bind.interface_ImVec2;
    GetCenter(): ImVec2;
    GetWorkCenter(): ImVec2;
}
export { ImGuiStyle as Style };
export declare class ImGuiStyle {
    readonly internal: Bind.interface_ImGuiStyle;
    constructor(internal?: Bind.interface_ImGuiStyle);
    get Alpha(): number;
    set Alpha(value: number);
    get DisabledAlpha(): number;
    set DisabledAlpha(value: number);
    get WindowPadding(): Bind.interface_ImVec2;
    get WindowRounding(): number;
    set WindowRounding(value: number);
    get WindowBorderSize(): number;
    set WindowBorderSize(value: number);
    get WindowMinSize(): Bind.interface_ImVec2;
    get WindowTitleAlign(): Bind.interface_ImVec2;
    get WindowMenuButtonPosition(): ImGuiDir;
    set WindowMenuButtonPosition(value: ImGuiDir);
    get ChildRounding(): number;
    set ChildRounding(value: number);
    get ChildBorderSize(): number;
    set ChildBorderSize(value: number);
    get PopupRounding(): number;
    set PopupRounding(value: number);
    get PopupBorderSize(): number;
    set PopupBorderSize(value: number);
    get FramePadding(): Bind.interface_ImVec2;
    get FrameRounding(): number;
    set FrameRounding(value: number);
    get FrameBorderSize(): number;
    set FrameBorderSize(value: number);
    get ItemSpacing(): Bind.interface_ImVec2;
    get ItemInnerSpacing(): Bind.interface_ImVec2;
    get CellPadding(): Bind.interface_ImVec2;
    get TouchExtraPadding(): Bind.interface_ImVec2;
    get IndentSpacing(): number;
    set IndentSpacing(value: number);
    get ColumnsMinSpacing(): number;
    set ColumnsMinSpacing(value: number);
    get ScrollbarSize(): number;
    set ScrollbarSize(value: number);
    get ScrollbarRounding(): number;
    set ScrollbarRounding(value: number);
    get GrabMinSize(): number;
    set GrabMinSize(value: number);
    get GrabRounding(): number;
    set GrabRounding(value: number);
    get LogSliderDeadzone(): number;
    set LogSliderDeadzone(value: number);
    get TabRounding(): number;
    set TabRounding(value: number);
    get TabBorderSize(): number;
    set TabBorderSize(value: number);
    get TabMinWidthForCloseButton(): number;
    set TabMinWidthForCloseButton(value: number);
    get ColorButtonPosition(): number;
    set ColorButtonPosition(value: number);
    get ButtonTextAlign(): Bind.interface_ImVec2;
    get SelectableTextAlign(): Bind.interface_ImVec2;
    get DisplayWindowPadding(): Bind.interface_ImVec2;
    get DisplaySafeAreaPadding(): Bind.interface_ImVec2;
    get MouseCursorScale(): number;
    set MouseCursorScale(value: number);
    get AntiAliasedLines(): boolean;
    set AntiAliasedLines(value: boolean);
    get AntiAliasedLinesUseTex(): boolean;
    set AntiAliasedLinesUseTex(value: boolean);
    get AntiAliasedFill(): boolean;
    set AntiAliasedFill(value: boolean);
    get CurveTessellationTol(): number;
    set CurveTessellationTol(value: number);
    get CircleTessellationMaxError(): number;
    set CircleTessellationMaxError(value: number);
    Colors: Bind.interface_ImVec4[];
    Copy(other: Readonly<ImGuiStyle>): this;
    ScaleAllSizes(scale_factor: number): void;
}
export { ImGuiIO as IO };
export declare class ImGuiIO {
    readonly native: Bind.reference_ImGuiIO;
    constructor(native: Bind.reference_ImGuiIO);
    get ConfigFlags(): ImGuiConfigFlags;
    set ConfigFlags(value: ImGuiConfigFlags);
    get BackendFlags(): ImGuiBackendFlags;
    set BackendFlags(value: ImGuiBackendFlags);
    get DisplaySize(): Bind.reference_ImVec2;
    get DeltaTime(): number;
    set DeltaTime(value: number);
    get IniSavingRate(): number;
    set IniSavingRate(value: number);
    get IniFilename(): string;
    set IniFilename(value: string);
    get LogFilename(): string;
    set LogFilename(value: string);
    get MouseDoubleClickTime(): number;
    set MouseDoubleClickTime(value: number);
    get MouseDoubleClickMaxDist(): number;
    set MouseDoubleClickMaxDist(value: number);
    get MouseDragThreshold(): number;
    set MouseDragThreshold(value: number);
    KeyMap: number[];
    get KeyRepeatDelay(): number;
    set KeyRepeatDelay(value: number);
    get KeyRepeatRate(): number;
    set KeyRepeatRate(value: number);
    get UserData(): any;
    set UserData(value: any);
    get Fonts(): ImFontAtlas;
    get FontGlobalScale(): number;
    set FontGlobalScale(value: number);
    get FontAllowUserScaling(): boolean;
    set FontAllowUserScaling(value: boolean);
    get FontDefault(): ImFont | null;
    set FontDefault(value: ImFont | null);
    get DisplayFramebufferScale(): Bind.reference_ImVec2;
    get ConfigMacOSXBehaviors(): boolean;
    set ConfigMacOSXBehaviors(value: boolean);
    get ConfigInputTextCursorBlink(): boolean;
    set ConfigInputTextCursorBlink(value: boolean);
    get ConfigDragClickToInputText(): boolean;
    set ConfigDragClickToInputText(value: boolean);
    get ConfigWindowsResizeFromEdges(): boolean;
    set ConfigWindowsResizeFromEdges(value: boolean);
    get ConfigWindowsMoveFromTitleBarOnly(): boolean;
    set ConfigWindowsMoveFromTitleBarOnly(value: boolean);
    get ConfigMemoryCompactTimer(): number;
    set ConfigMemoryCompactTimer(value: number);
    get BackendPlatformName(): string | null;
    set BackendPlatformName(value: string | null);
    get BackendRendererName(): string | null;
    set BackendRendererName(value: string | null);
    get BackendPlatformUserData(): string | null;
    set BackendPlatformUserData(value: string | null);
    get BackendRendererUserData(): string | null;
    set BackendRendererUserData(value: string | null);
    get BackendLanguageUserData(): string | null;
    set BackendLanguageUserData(value: string | null);
    get GetClipboardTextFn(): ((user_data: any) => string) | null;
    set GetClipboardTextFn(value: ((user_data: any) => string) | null);
    get SetClipboardTextFn(): ((user_data: any, text: string) => void) | null;
    set SetClipboardTextFn(value: ((user_data: any, text: string) => void) | null);
    get ClipboardUserData(): any;
    set ClipboardUserData(value: any);
    get MousePos(): Bind.reference_ImVec2;
    MouseDown: boolean[];
    get MouseWheel(): number;
    set MouseWheel(value: number);
    get MouseWheelH(): number;
    set MouseWheelH(value: number);
    get MouseDrawCursor(): boolean;
    set MouseDrawCursor(value: boolean);
    get KeyCtrl(): boolean;
    set KeyCtrl(value: boolean);
    get KeyShift(): boolean;
    set KeyShift(value: boolean);
    get KeyAlt(): boolean;
    set KeyAlt(value: boolean);
    get KeySuper(): boolean;
    set KeySuper(value: boolean);
    KeysDown: boolean[];
    NavInputs: number[];
    AddInputCharacter(c: number): void;
    AddInputCharacterUTF16(c: number): void;
    AddInputCharactersUTF8(utf8_chars: string): void;
    ClearInputCharacters(): void;
    get WantCaptureMouse(): boolean;
    set WantCaptureMouse(value: boolean);
    get WantCaptureKeyboard(): boolean;
    set WantCaptureKeyboard(value: boolean);
    get WantTextInput(): boolean;
    set WantTextInput(value: boolean);
    get WantSetMousePos(): boolean;
    set WantSetMousePos(value: boolean);
    get WantSaveIniSettings(): boolean;
    set WantSaveIniSettings(value: boolean);
    get NavActive(): boolean;
    set NavActive(value: boolean);
    get NavVisible(): boolean;
    set NavVisible(value: boolean);
    get Framerate(): number;
    get MetricsRenderVertices(): number;
    get MetricsRenderIndices(): number;
    get MetricsRenderWindows(): number;
    get MetricsActiveWindows(): number;
    get MetricsActiveAllocations(): number;
    get MouseDelta(): Readonly<Bind.reference_ImVec2>;
    get WantCaptureMouseUnlessPopupClose(): boolean;
    set WantCaptureMouseUnlessPopupClose(value: boolean);
    MouseClickedPos: Array<Readonly<Bind.reference_ImVec2>>;
    MouseDownDuration: number[];
    KeysDownDuration: number[];
    NavInputsDownDuration: number[];
}
export declare class ImGuiContext {
    readonly native: Bind.WrapImGuiContext;
    static current_ctx: ImGuiContext | null;
    static getTexture(index: number): ImTextureID | null;
    static setTexture(texture: ImTextureID | null): number;
    private static textures;
    constructor(native: Bind.WrapImGuiContext);
    private _getTexture;
    private _setTexture;
}
export declare function CreateContext(shared_font_atlas?: ImFontAtlas | null): ImGuiContext | null;
export declare function DestroyContext(ctx?: ImGuiContext | null): void;
export declare function GetCurrentContext(): ImGuiContext | null;
export declare function SetCurrentContext(ctx: ImGuiContext | null): void;
export declare function GetIO(): ImGuiIO;
export declare function GetStyle(): ImGuiStyle;
export declare function NewFrame(): void;
export declare function EndFrame(): void;
export declare function Render(): void;
export declare function GetDrawData(): ImDrawData | null;
export declare function ShowDemoWindow(p_open?: Bind.ImScalar<boolean> | null): void;
export declare function ShowMetricsWindow(p_open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null): void;
export declare function ShowStackToolWindow(p_open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null): void;
export declare function ShowAboutWindow(p_open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null): void;
export declare function ShowStyleEditor(ref?: ImGuiStyle | null): void;
export declare function ShowStyleSelector(label: string): boolean;
export declare function ShowFontSelector(label: string): void;
export declare function ShowUserGuide(): void;
export declare function GetVersion(): string;
export declare function StyleColorsDark(dst?: ImGuiStyle | null): void;
export declare function StyleColorsLight(dst?: ImGuiStyle | null): void;
export declare function StyleColorsClassic(dst?: ImGuiStyle | null): void;
export declare function Begin(name: string, open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null, flags?: ImGuiWindowFlags): boolean;
export declare function End(): void;
export declare function BeginChild(id: string | ImGuiID, size?: Readonly<Bind.interface_ImVec2>, border?: boolean, flags?: ImGuiWindowFlags): boolean;
export declare function EndChild(): void;
export declare function IsWindowAppearing(): boolean;
export declare function IsWindowCollapsed(): boolean;
export declare function IsWindowFocused(flags?: ImGuiFocusedFlags): boolean;
export declare function IsWindowHovered(flags?: ImGuiHoveredFlags): boolean;
export declare function GetWindowDrawList(): ImDrawList;
export declare function GetWindowPos(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetWindowSize(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetWindowWidth(): number;
export declare function GetWindowHeight(): number;
export declare function SetNextWindowPos(pos: Readonly<Bind.interface_ImVec2>, cond?: ImGuiCond, pivot?: Readonly<Bind.interface_ImVec2>): void;
export declare function SetNextWindowSize(pos: Readonly<Bind.interface_ImVec2>, cond?: ImGuiCond): void;
export declare function SetNextWindowSizeConstraints(size_min: Readonly<Bind.interface_ImVec2>, size_max: Readonly<Bind.interface_ImVec2>): void;
export declare function SetNextWindowSizeConstraints<T>(size_min: Readonly<Bind.interface_ImVec2>, size_max: Readonly<Bind.interface_ImVec2>, custom_callback: ImGuiSizeCallback<T>, custom_callback_data?: T): void;
export declare function SetNextWindowContentSize(size: Readonly<Bind.interface_ImVec2>): void;
export declare function SetNextWindowCollapsed(collapsed: boolean, cond?: ImGuiCond): void;
export declare function SetNextWindowFocus(): void;
export declare function SetNextWindowBgAlpha(alpha: number): void;
export declare function SetWindowPos(name_or_pos: string | Readonly<Bind.interface_ImVec2>, pos_or_cond?: Readonly<Bind.interface_ImVec2> | ImGuiCond, cond?: ImGuiCond): void;
export declare function SetWindowSize(name_or_size: string | Readonly<Bind.interface_ImVec2>, size_or_cond?: Readonly<Bind.interface_ImVec2> | ImGuiCond, cond?: ImGuiCond): void;
export declare function SetWindowCollapsed(name_or_collapsed: string | boolean, collapsed_or_cond?: boolean | ImGuiCond, cond?: ImGuiCond): void;
export declare function SetWindowFocus(name?: string): void;
export declare function SetWindowFontScale(scale: number): void;
export declare function GetContentRegionAvail(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetContentRegionMax(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetWindowContentRegionMin(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetWindowContentRegionMax(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetScrollX(): number;
export declare function GetScrollY(): number;
export declare function SetScrollX(scroll_x: number): void;
export declare function SetScrollY(scroll_y: number): void;
export declare function GetScrollMaxX(): number;
export declare function GetScrollMaxY(): number;
export declare function SetScrollHereX(center_x_ratio?: number): void;
export declare function SetScrollHereY(center_y_ratio?: number): void;
export declare function SetScrollFromPosX(pos_x: number, center_x_ratio?: number): void;
export declare function SetScrollFromPosY(pos_y: number, center_y_ratio?: number): void;
export declare function PushFont(font: ImFont | null): void;
export declare function PopFont(): void;
export declare function PushStyleColor(idx: ImGuiCol, col: Bind.ImU32 | Readonly<Bind.interface_ImVec4> | Readonly<ImColor>): void;
export declare function PopStyleColor(count?: number): void;
export declare function PushStyleVar(idx: ImGuiStyleVar, val: number | Readonly<Bind.interface_ImVec2>): void;
export declare function PopStyleVar(count?: number): void;
export declare function PushAllowKeyboardFocus(allow_keyboard_focus: boolean): void;
export declare function PopAllowKeyboardFocus(): void;
export declare function PushButtonRepeat(repeat: boolean): void;
export declare function PopButtonRepeat(): void;
export declare function PushItemWidth(item_width: number): void;
export declare function PopItemWidth(): void;
export declare function SetNextItemWidth(item_width: number): void;
export declare function CalcItemWidth(): number;
export declare function PushTextWrapPos(wrap_pos_x?: number): void;
export declare function PopTextWrapPos(): void;
export declare function GetFont(): ImFont;
export declare function GetFontSize(): number;
export declare function GetFontTexUvWhitePixel(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetColorU32(idx: ImGuiCol, alpha_mul?: number): Bind.ImU32;
export declare function GetColorU32(col: Readonly<Bind.interface_ImVec4>): Bind.ImU32;
export declare function GetColorU32(col: Bind.ImU32): Bind.ImU32;
export declare function GetStyleColorVec4(idx: ImGuiCol): Readonly<Bind.reference_ImVec4>;
export declare function Separator(): void;
export declare function SameLine(pos_x?: number, spacing_w?: number): void;
export declare function NewLine(): void;
export declare function Spacing(): void;
export declare function Dummy(size: Readonly<Bind.interface_ImVec2>): void;
export declare function Indent(indent_w?: number): void;
export declare function Unindent(indent_w?: number): void;
export declare function BeginGroup(): void;
export declare function EndGroup(): void;
export declare function GetCursorPos(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetCursorPosX(): number;
export declare function GetCursorPosY(): number;
export declare function SetCursorPos(local_pos: Readonly<Bind.interface_ImVec2>): void;
export declare function SetCursorPosX(x: number): void;
export declare function SetCursorPosY(y: number): void;
export declare function GetCursorStartPos(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetCursorScreenPos(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function SetCursorScreenPos(pos: Readonly<Bind.interface_ImVec2>): void;
export declare function AlignTextToFramePadding(): void;
export declare function GetTextLineHeight(): number;
export declare function GetTextLineHeightWithSpacing(): number;
export declare function GetFrameHeight(): number;
export declare function GetFrameHeightWithSpacing(): number;
export declare function PushID(id: string | number): void;
export declare function PopID(): void;
export declare function GetID(id: string | number): ImGuiID;
export declare function TextUnformatted(text: string, text_end?: number | null): void;
export declare function Text(text: string): void;
export declare function TextColored(col: Readonly<Bind.interface_ImVec4> | Readonly<ImColor>, text: string): void;
export declare function TextDisabled(text: string): void;
export declare function TextWrapped(text: string): void;
export declare function LabelText(label: string, text: string): void;
export declare function BulletText(text: string): void;
export declare function Button(label: string, size?: Readonly<Bind.interface_ImVec2>): boolean;
export declare function SmallButton(label: string): boolean;
export declare function ArrowButton(str_id: string, dir: ImGuiDir): boolean;
export declare function InvisibleButton(str_id: string, size: Readonly<Bind.interface_ImVec2>, flags?: ImGuiButtonFlags): boolean;
export declare function Image(user_texture_id: ImTextureID | null, size: Readonly<Bind.interface_ImVec2>, uv0?: Readonly<Bind.interface_ImVec2>, uv1?: Readonly<Bind.interface_ImVec2>, tint_col?: Readonly<Bind.interface_ImVec4>, border_col?: Readonly<Bind.interface_ImVec4>): void;
export declare function ImageButton(user_texture_id: ImTextureID | null, size?: Readonly<Bind.interface_ImVec2>, uv0?: Readonly<Bind.interface_ImVec2>, uv1?: Readonly<Bind.interface_ImVec2>, frame_padding?: number, bg_col?: Readonly<Bind.interface_ImVec4>, tint_col?: Readonly<Bind.interface_ImVec4>): boolean;
export declare function Checkbox(label: string, v: Bind.ImScalar<boolean> | Bind.ImAccess<boolean>): boolean;
export declare function CheckboxFlags(label: string, flags: Bind.ImAccess<number> | Bind.ImScalar<number>, flags_value: number): boolean;
export declare function RadioButton(label: string, active: boolean): boolean;
export declare function RadioButton(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number>, v_button: number): boolean;
export declare function ProgressBar(fraction: number, size_arg?: Readonly<Bind.interface_ImVec2>, overlay?: string | null): void;
export declare function Bullet(): void;
export declare function BeginCombo(label: string, preview_value?: string | null, flags?: ImGuiComboFlags): boolean;
export declare function EndCombo(): void;
export type ComboValueGetter<T> = (data: T, idx: number, out_text: [string]) => boolean;
export declare function Combo(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items: string[], items_count?: number, popup_max_height_in_items?: number): boolean;
export declare function Combo(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items_separated_by_zeros: string, popup_max_height_in_items?: number): boolean;
export declare function Combo<T>(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items_getter: ComboValueGetter<T>, data: T, items_count: number, popup_max_height_in_items?: number): boolean;
export declare function DragFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, display_format?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function DragFloat2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number> | ImVec2, v_speed?: number, v_min?: number, v_max?: number, display_format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragFloat3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, display_format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragFloat4(label: string, v: XYZW | Bind.ImTuple4<number> | ImVec4, v_speed?: number, v_min?: number, v_max?: number, display_format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragFloatRange2(label: string, v_current_min: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_current_max: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, display_format?: string, display_format_max?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function DragInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragInt2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragInt3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragInt4(label: string, v: XYZW | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function DragIntRange2(label: string, v_current_min: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_current_max: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_speed?: number, v_min?: number, v_max?: number, format?: string, format_max?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function DragScalar(label: string, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, v_speed?: number, v_min?: number | null, v_max?: number | null, format?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function SliderFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderFloat2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec2, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderFloat3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderFloat4(label: string, v: XYZW | Bind.ImTuple4<number> | XYZW, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderAngle(label: string, v_rad: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_degrees_min?: number, v_degrees_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderAngle3(label: string, v_rad: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_degrees_min?: number, v_degrees_max?: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderInt2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderInt3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderInt4(label: string, v: XYZW | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function SliderScalar(label: string, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, v_min: number, v_max: number, format?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function VSliderFloat(label: string, size: Readonly<Bind.interface_ImVec2>, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function VSliderInt(label: string, size: Readonly<Bind.interface_ImVec2>, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, v_min: number, v_max: number, format?: string, flags?: ImGuiSliderFlags): boolean;
export declare function VSliderScalar(label: string, size: Readonly<Bind.interface_ImVec2>, data_type: ImGuiDataType, v: Bind.ImAccess<number> | Bind.ImScalar<number>, v_min: number, v_max: number, format?: string | null, flags?: ImGuiSliderFlags): boolean;
export declare function InputText<T>(label: string, buf: ImStringBuffer | Bind.ImAccess<string> | Bind.ImScalar<string>, buf_size?: number, flags?: ImGuiInputTextFlags, callback?: ImGuiInputTextCallback<T> | null, user_data?: T | null): boolean;
export declare function InputTextMultiline<T>(label: string, buf: ImStringBuffer | Bind.ImAccess<string> | Bind.ImScalar<string>, buf_size?: number, size?: Readonly<Bind.interface_ImVec2>, flags?: ImGuiInputTextFlags, callback?: ImGuiInputTextCallback<T> | null, user_data?: T | null): boolean;
export declare function InputTextWithHint<T>(label: string, hint: string, buf: ImStringBuffer | Bind.ImAccess<string> | Bind.ImScalar<string>, buf_size?: number, flags?: ImGuiInputTextFlags, callback?: ImGuiInputTextCallback<T> | null, user_data?: T | null): boolean;
export declare function InputFloat(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, step?: number, step_fast?: number, format?: string, flags?: ImGuiInputTextFlags): boolean;
export declare function InputFloat2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, format?: string, flags?: ImGuiInputTextFlags): boolean;
export declare function InputFloat3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, format?: string, flags?: ImGuiInputTextFlags): boolean;
export declare function InputFloat4(label: string, v: XYZW | Bind.ImTuple4<number>, format?: string, flags?: ImGuiInputTextFlags): boolean;
export declare function InputInt(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, step?: number, step_fast?: number, flags?: ImGuiInputTextFlags): boolean;
export declare function InputInt2(label: string, v: XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, flags?: ImGuiInputTextFlags): boolean;
export declare function InputInt3(label: string, v: XYZ | XYZW | Bind.ImTuple3<number> | Bind.ImTuple4<number>, flags?: ImGuiInputTextFlags): boolean;
export declare function InputInt4(label: string, v: XYZW | Bind.ImTuple4<number>, flags?: ImGuiInputTextFlags): boolean;
export declare function InputDouble(label: string, v: Bind.ImAccess<number> | Bind.ImScalar<number> | XY | XYZ | XYZW | Bind.ImTuple2<number> | Bind.ImTuple3<number> | Bind.ImTuple4<number>, step?: number, step_fast?: number, format?: string, flags?: ImGuiInputTextFlags): boolean;
export declare function InputScalar(label: string, v: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, step?: number | null, step_fast?: number | null, format?: string | null, flags?: ImGuiInputTextFlags): boolean;
export declare function ColorEdit3(label: string, col: RGB | RGBA | Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags?: ImGuiColorEditFlags): boolean;
export declare function ColorEdit4(label: string, col: RGBA | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags?: ImGuiColorEditFlags): boolean;
export declare function ColorPicker3(label: string, col: RGB | RGBA | Bind.ImTuple3<number> | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags?: ImGuiColorEditFlags): boolean;
export declare function ColorPicker4(label: string, col: RGBA | Bind.ImTuple4<number> | Bind.interface_ImVec4, flags?: ImGuiColorEditFlags, ref_col?: Bind.ImTuple4<number> | Bind.interface_ImVec4 | null): boolean;
export declare function ColorButton(desc_id: string, col: Readonly<Bind.interface_ImVec4>, flags?: ImGuiColorEditFlags, size?: Readonly<Bind.interface_ImVec2>): boolean;
export declare function SetColorEditOptions(flags: ImGuiColorEditFlags): void;
export declare function TreeNode(label: string): boolean;
export declare function TreeNode(label: string, fmt: string): boolean;
export declare function TreeNode(label: number, fmt: string): boolean;
export declare function TreeNodeEx(label: string, flags?: ImGuiTreeNodeFlags): boolean;
export declare function TreeNodeEx(str_id: string, flags: ImGuiTreeNodeFlags, fmt: string): boolean;
export declare function TreeNodeEx(ptr_id: number, flags: ImGuiTreeNodeFlags, fmt: string): boolean;
export declare function TreePush(str_id: string): void;
export declare function TreePush(ptr_id: number): void;
export declare function TreePop(): void;
export declare function GetTreeNodeToLabelSpacing(): number;
export declare function CollapsingHeader(label: string, flags?: ImGuiTreeNodeFlags): boolean;
export declare function CollapsingHeader(label: string, p_open: Bind.ImScalar<boolean> | Bind.ImAccess<boolean>, flags?: ImGuiTreeNodeFlags): boolean;
export declare function SetNextItemOpen(is_open: boolean, cond?: ImGuiCond): void;
export declare function Selectable(label: string, selected?: boolean, flags?: ImGuiSelectableFlags, size?: Readonly<Bind.interface_ImVec2>): boolean;
export declare function Selectable(label: string, p_selected: Bind.ImScalar<boolean> | Bind.ImAccess<boolean>, flags?: ImGuiSelectableFlags, size?: Readonly<Bind.interface_ImVec2>): boolean;
export declare function BeginListBox(label: string, size?: Readonly<Bind.interface_ImVec2>): boolean;
export declare function EndListBox(): void;
export type ListBoxItemGetter<T> = (data: T, idx: number, out_text: [string]) => boolean;
export declare function ListBox(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items: string[], items_count?: number, height_in_items?: number): boolean;
export declare function ListBox<T>(label: string, current_item: Bind.ImAccess<number> | Bind.ImScalar<number>, items_getter: ListBoxItemGetter<T>, data: T, items_count: number, height_in_items?: number): boolean;
export type PlotLinesValueGetter<T> = (data: T, idx: number) => number;
export declare function PlotLines(label: string, values: ArrayLike<number>, values_count?: number, value_offset?: number, overlay_text?: string | null, scale_min?: number, scale_max?: number, graph_size?: Readonly<Bind.interface_ImVec2>, stride?: number): void;
export declare function PlotLines<T>(label: string, values_getter: PlotLinesValueGetter<T>, data: T, values_count?: number, value_offset?: number, overlay_text?: string | null, scale_min?: number, scale_max?: number, graph_size?: Readonly<Bind.interface_ImVec2>): void;
export type PlotHistogramValueGetter<T> = (data: T, idx: number) => number;
export declare function PlotHistogram(label: string, values: ArrayLike<number>, values_count?: number, value_offset?: number, overlay_text?: string | null, scale_min?: number, scale_max?: number, graph_size?: Readonly<Bind.interface_ImVec2>, stride?: number): void;
export declare function PlotHistogram<T>(label: string, values_getter: PlotHistogramValueGetter<T>, data: T, values_count?: number, value_offset?: number, overlay_text?: string | null, scale_min?: number, scale_max?: number, graph_size?: Readonly<Bind.interface_ImVec2>): void;
export declare function Value(prefix: string, b: boolean): void;
export declare function Value(prefix: string, v: number): void;
export declare function Value(prefix: string, v: number, float_format?: string | null): void;
export declare function Value(prefix: string, v: any): void;
export declare function BeginMenuBar(): boolean;
export declare function EndMenuBar(): void;
export declare function BeginMainMenuBar(): boolean;
export declare function EndMainMenuBar(): void;
export declare function BeginMenu(label: string, enabled?: boolean): boolean;
export declare function EndMenu(): void;
export declare function MenuItem(label: string, shortcut?: string | null, selected?: boolean, enabled?: boolean): boolean;
export declare function MenuItem(label: string, shortcut: string | null, p_selected: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null, enabled?: boolean): boolean;
export declare function BeginTooltip(): void;
export declare function EndTooltip(): void;
export declare function SetTooltip(fmt: string): void;
export declare function BeginPopup(str_id: string, flags?: ImGuiWindowFlags): boolean;
export declare function BeginPopupModal(str_id: string, p_open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null, flags?: ImGuiWindowFlags): boolean;
export declare function EndPopup(): void;
export declare function OpenPopup(str_id: string, popup_flags?: ImGuiPopupFlags): void;
export declare function OpenPopupOnItemClick(str_id?: string | null, popup_flags?: ImGuiPopupFlags): void;
export declare function CloseCurrentPopup(): void;
export declare function BeginPopupContextItem(str_id?: string | null, popup_flags?: ImGuiPopupFlags): boolean;
export declare function BeginPopupContextWindow(str_id?: string | null, popup_flags?: ImGuiPopupFlags): boolean;
export declare function BeginPopupContextVoid(str_id?: string | null, popup_flags?: ImGuiPopupFlags): boolean;
export declare function IsPopupOpen(str_id: string, flags?: ImGuiPopupFlags): boolean;
export declare function BeginTable(str_id: string, column: number, flags?: ImGuiTableFlags, outer_size?: Bind.interface_ImVec2, inner_width?: number): boolean;
export declare function EndTable(): void;
export declare function TableNextRow(row_flags?: ImGuiTableRowFlags, min_row_height?: number): void;
export declare function TableNextColumn(): boolean;
export declare function TableSetColumnIndex(column_n: number): boolean;
export declare function TableSetupColumn(label: string, flags?: ImGuiTableColumnFlags, init_width_or_weight?: number, user_id?: Bind.ImGuiID): void;
export declare function TableSetupScrollFreeze(cols: number, rows: number): void;
export declare function TableHeadersRow(): void;
export declare function TableHeader(label: string): void;
export declare function TableGetSortSpecs(): ImGuiTableSortSpecs | null;
export declare function TableGetColumnCount(): number;
export declare function TableGetColumnIndex(): number;
export declare function TableGetRowIndex(): number;
export declare function TableGetColumnName(column_n?: number): string;
export declare function TableGetColumnFlags(column_n?: number): ImGuiTableColumnFlags;
export declare function TableSetColumnEnabled(column_n: number, v: boolean): void;
export declare function TableSetBgColor(target: ImGuiTableBgTarget, color: Bind.ImU32, column_n?: number): void;
export declare function Columns(count?: number, id?: string | null, border?: boolean): void;
export declare function NextColumn(): void;
export declare function GetColumnIndex(): number;
export declare function GetColumnWidth(column_index?: number): number;
export declare function SetColumnWidth(column_index: number, width: number): void;
export declare function GetColumnOffset(column_index?: number): number;
export declare function SetColumnOffset(column_index: number, offset_x: number): void;
export declare function GetColumnsCount(): number;
export declare function BeginTabBar(str_id: string, flags?: ImGuiTabBarFlags): boolean;
export declare function EndTabBar(): void;
export declare function BeginTabItem(label: string, p_open?: Bind.ImScalar<boolean> | Bind.ImAccess<boolean> | null, flags?: ImGuiTabItemFlags): boolean;
export declare function EndTabItem(): void;
export declare function TabItemButton(label: string, flags?: ImGuiTabItemFlags): boolean;
export declare function SetTabItemClosed(tab_or_docked_window_label: string): void;
export declare function LogToTTY(max_depth?: number): void;
export declare function LogToFile(max_depth?: number, filename?: string | null): void;
export declare function LogToClipboard(max_depth?: number): void;
export declare function LogFinish(): void;
export declare function LogButtons(): void;
export declare function LogText(fmt: string): void;
export declare function BeginDragDropSource(flags?: ImGuiDragDropFlags): boolean;
export declare function SetDragDropPayload<T>(type: string, data: T, cond?: ImGuiCond): boolean;
export declare function EndDragDropSource(): void;
export declare function BeginDragDropTarget(): boolean;
export declare function AcceptDragDropPayload<T>(type: string, flags?: ImGuiDragDropFlags): ImGuiPayload<T> | null;
export declare function EndDragDropTarget(): void;
export declare function GetDragDropPayload<T>(): ImGuiPayload<T> | null;
export declare function BeginDisabled(disabled?: boolean): void;
export declare function EndDisabled(): void;
export declare function PushClipRect(clip_rect_min: Readonly<Bind.interface_ImVec2>, clip_rect_max: Readonly<Bind.interface_ImVec2>, intersect_with_current_clip_rect: boolean): void;
export declare function PopClipRect(): void;
export declare function SetItemDefaultFocus(): void;
export declare function SetKeyboardFocusHere(offset?: number): void;
export declare function IsItemHovered(flags?: ImGuiHoveredFlags): boolean;
export declare function IsItemActive(): boolean;
export declare function IsItemFocused(): boolean;
export declare function IsItemClicked(mouse_button?: ImGuiMouseButton): boolean;
export declare function IsItemVisible(): boolean;
export declare function IsItemEdited(): boolean;
export declare function IsItemActivated(): boolean;
export declare function IsItemDeactivated(): boolean;
export declare function IsItemDeactivatedAfterEdit(): boolean;
export declare function IsItemToggledOpen(): boolean;
export declare function IsAnyItemHovered(): boolean;
export declare function IsAnyItemActive(): boolean;
export declare function IsAnyItemFocused(): boolean;
export declare function GetItemRectMin(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetItemRectMax(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetItemRectSize(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function SetItemAllowOverlap(): void;
export declare function GetMainViewport(): ImGuiViewport;
export declare function IsRectVisible(size: Readonly<Bind.interface_ImVec2>): boolean;
export declare function IsRectVisible(rect_min: Readonly<Bind.interface_ImVec2>, rect_max: Readonly<Bind.interface_ImVec2>): boolean;
export declare function GetTime(): number;
export declare function GetFrameCount(): number;
export declare function GetBackgroundDrawList(): ImDrawList;
export declare function GetForegroundDrawList(): ImDrawList;
export declare function GetDrawListSharedData(): ImDrawListSharedData;
export declare function GetStyleColorName(idx: ImGuiCol): string;
export declare function BeginChildFrame(id: ImGuiID, size: Readonly<Bind.interface_ImVec2>, flags?: ImGuiWindowFlags): boolean;
export declare function EndChildFrame(): void;
export declare function CalcTextSize(text: string, text_end?: number | null, hide_text_after_double_hash?: boolean, wrap_width?: number, out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function ColorConvertU32ToFloat4(in_: Bind.ImU32, out?: Bind.interface_ImVec4): Bind.interface_ImVec4;
export declare function ColorConvertFloat4ToU32(in_: Readonly<Bind.interface_ImVec4>): Bind.ImU32;
export declare function ColorConvertRGBtoHSV(r: number, g: number, b: number, out_h: Bind.ImScalar<number>, out_s: Bind.ImScalar<number>, out_v: Bind.ImScalar<number>): void;
export declare function ColorConvertHSVtoRGB(h: number, s: number, v: number, out_r: Bind.ImScalar<number>, out_g: Bind.ImScalar<number>, out_b: Bind.ImScalar<number>): void;
export declare function GetKeyIndex(imgui_key: ImGuiKey): number;
export declare function IsKeyDown(user_key_index: number): boolean;
export declare function IsKeyPressed(user_key_index: number, repeat?: boolean): boolean;
export declare function IsKeyReleased(user_key_index: number): boolean;
export declare function GetKeyPressedAmount(user_key_index: number, repeat_delay: number, rate: number): number;
export declare function CaptureKeyboardFromApp(capture?: boolean): void;
export declare function IsMouseDown(button: number): boolean;
export declare function IsMouseClicked(button: number, repeat?: boolean): boolean;
export declare function IsMouseDoubleClicked(button: number): boolean;
export declare function GetMouseClickedCount(button: number): number;
export declare function IsMouseReleased(button: number): boolean;
export declare function IsMouseHoveringRect(r_min: Readonly<Bind.interface_ImVec2>, r_max: Readonly<Bind.interface_ImVec2>, clip?: boolean): boolean;
export declare function IsMousePosValid(mouse_pos?: Readonly<Bind.interface_ImVec2> | null): boolean;
export declare function IsAnyMouseDown(): boolean;
export declare function GetMousePos(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function GetMousePosOnOpeningCurrentPopup(out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function IsMouseDragging(button?: number, lock_threshold?: number): boolean;
export declare function GetMouseDragDelta(button?: number, lock_threshold?: number, out?: Bind.interface_ImVec2): Bind.interface_ImVec2;
export declare function ResetMouseDragDelta(button?: number): void;
export declare function GetMouseCursor(): ImGuiMouseCursor;
export declare function SetMouseCursor(type: ImGuiMouseCursor): void;
export declare function CaptureMouseFromApp(capture?: boolean): void;
export declare function GetClipboardText(): string;
export declare function SetClipboardText(text: string): void;
export declare function LoadIniSettingsFromDisk(ini_filename: string): void;
export declare function LoadIniSettingsFromMemory(ini_data: string, ini_size?: number): void;
export declare function SaveIniSettingsToDisk(ini_filename: string): void;
export declare function SaveIniSettingsToMemory(out_ini_size?: Bind.ImScalar<number> | null): string;
export declare function DebugCheckVersionAndDataLayout(version_str: string, sz_io: number, sz_style: number, sz_vec2: number, sz_vec4: number, sz_draw_vert: number, sz_draw_idx: number): boolean;
export declare function SetAllocatorFunctions(alloc_func: (sz: number, user_data: any) => number, free_func: (ptr: number, user_data: any) => void, user_data?: any): void;
export declare function MemAlloc(sz: number): void;
export declare function MemFree(ptr: any): void;
