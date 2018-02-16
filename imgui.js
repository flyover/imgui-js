"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bind = require("./bind-imgui");
const config = require("./imconfig");
var bind_imgui_1 = require("./bind-imgui");
exports.IMGUI_VERSION = bind_imgui_1.IMGUI_VERSION;
function IM_ASSERT(_EXPR) { if (!_EXPR) {
    throw new Error();
} }
exports.IM_ASSERT = IM_ASSERT;
function IM_ARRAYSIZE(_ARR) {
    if (_ARR instanceof ImStringBuffer) {
        return _ARR.size;
    }
    else {
        return _ARR.length;
    }
}
exports.IM_ARRAYSIZE = IM_ARRAYSIZE;
class ImStringBuffer {
    constructor(size, buffer = "") {
        this.size = size;
        this.buffer = buffer;
    }
}
exports.ImStringBuffer = ImStringBuffer;
var ImGuiWindowFlags;
(function (ImGuiWindowFlags) {
    ImGuiWindowFlags[ImGuiWindowFlags["NoTitleBar"] = 1] = "NoTitleBar";
    ImGuiWindowFlags[ImGuiWindowFlags["NoResize"] = 2] = "NoResize";
    ImGuiWindowFlags[ImGuiWindowFlags["NoMove"] = 4] = "NoMove";
    ImGuiWindowFlags[ImGuiWindowFlags["NoScrollbar"] = 8] = "NoScrollbar";
    ImGuiWindowFlags[ImGuiWindowFlags["NoScrollWithMouse"] = 16] = "NoScrollWithMouse";
    ImGuiWindowFlags[ImGuiWindowFlags["NoCollapse"] = 32] = "NoCollapse";
    ImGuiWindowFlags[ImGuiWindowFlags["AlwaysAutoResize"] = 64] = "AlwaysAutoResize";
    //ShowBorders          = 1 << 7,   // Show borders around windows and items (OBSOLETE! Use e.g. style.FrameBorderSize=1.0f to enable borders).
    ImGuiWindowFlags[ImGuiWindowFlags["NoSavedSettings"] = 256] = "NoSavedSettings";
    ImGuiWindowFlags[ImGuiWindowFlags["NoInputs"] = 512] = "NoInputs";
    ImGuiWindowFlags[ImGuiWindowFlags["MenuBar"] = 1024] = "MenuBar";
    ImGuiWindowFlags[ImGuiWindowFlags["HorizontalScrollbar"] = 2048] = "HorizontalScrollbar";
    ImGuiWindowFlags[ImGuiWindowFlags["NoFocusOnAppearing"] = 4096] = "NoFocusOnAppearing";
    ImGuiWindowFlags[ImGuiWindowFlags["NoBringToFrontOnFocus"] = 8192] = "NoBringToFrontOnFocus";
    ImGuiWindowFlags[ImGuiWindowFlags["AlwaysVerticalScrollbar"] = 16384] = "AlwaysVerticalScrollbar";
    ImGuiWindowFlags[ImGuiWindowFlags["AlwaysHorizontalScrollbar"] = 32768] = "AlwaysHorizontalScrollbar";
    ImGuiWindowFlags[ImGuiWindowFlags["AlwaysUseWindowPadding"] = 65536] = "AlwaysUseWindowPadding";
    ImGuiWindowFlags[ImGuiWindowFlags["ResizeFromAnySide"] = 131072] = "ResizeFromAnySide";
    ImGuiWindowFlags[ImGuiWindowFlags["NoNavInputs"] = 262144] = "NoNavInputs";
    ImGuiWindowFlags[ImGuiWindowFlags["NoNavFocus"] = 524288] = "NoNavFocus";
    ImGuiWindowFlags[ImGuiWindowFlags["NoNav"] = 786432] = "NoNav";
    // [Internal]
    ImGuiWindowFlags[ImGuiWindowFlags["NavFlattened"] = 8388608] = "NavFlattened";
    ImGuiWindowFlags[ImGuiWindowFlags["ChildWindow"] = 16777216] = "ChildWindow";
    ImGuiWindowFlags[ImGuiWindowFlags["Tooltip"] = 33554432] = "Tooltip";
    ImGuiWindowFlags[ImGuiWindowFlags["Popup"] = 67108864] = "Popup";
    ImGuiWindowFlags[ImGuiWindowFlags["Modal"] = 134217728] = "Modal";
    ImGuiWindowFlags[ImGuiWindowFlags["ChildMenu"] = 268435456] = "ChildMenu"; // Don't use! For internal use by BeginMenu()
})(ImGuiWindowFlags = exports.ImGuiWindowFlags || (exports.ImGuiWindowFlags = {}));
exports.WindowFlags = ImGuiWindowFlags;
var ImGuiInputTextFlags;
(function (ImGuiInputTextFlags) {
    ImGuiInputTextFlags[ImGuiInputTextFlags["CharsDecimal"] = 1] = "CharsDecimal";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CharsHexadecimal"] = 2] = "CharsHexadecimal";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CharsUppercase"] = 4] = "CharsUppercase";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CharsNoBlank"] = 8] = "CharsNoBlank";
    ImGuiInputTextFlags[ImGuiInputTextFlags["AutoSelectAll"] = 16] = "AutoSelectAll";
    ImGuiInputTextFlags[ImGuiInputTextFlags["EnterReturnsTrue"] = 32] = "EnterReturnsTrue";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCompletion"] = 64] = "CallbackCompletion";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackHistory"] = 128] = "CallbackHistory";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackAlways"] = 256] = "CallbackAlways";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CallbackCharFilter"] = 512] = "CallbackCharFilter";
    ImGuiInputTextFlags[ImGuiInputTextFlags["AllowTabInput"] = 1024] = "AllowTabInput";
    ImGuiInputTextFlags[ImGuiInputTextFlags["CtrlEnterForNewLine"] = 2048] = "CtrlEnterForNewLine";
    ImGuiInputTextFlags[ImGuiInputTextFlags["NoHorizontalScroll"] = 4096] = "NoHorizontalScroll";
    ImGuiInputTextFlags[ImGuiInputTextFlags["AlwaysInsertMode"] = 8192] = "AlwaysInsertMode";
    ImGuiInputTextFlags[ImGuiInputTextFlags["ReadOnly"] = 16384] = "ReadOnly";
    ImGuiInputTextFlags[ImGuiInputTextFlags["Password"] = 32768] = "Password";
    ImGuiInputTextFlags[ImGuiInputTextFlags["NoUndoRedo"] = 65536] = "NoUndoRedo";
    // [Internal]
    ImGuiInputTextFlags[ImGuiInputTextFlags["Multiline"] = 1048576] = "Multiline"; // For internal use by InputTextMultiline()
})(ImGuiInputTextFlags = exports.ImGuiInputTextFlags || (exports.ImGuiInputTextFlags = {}));
exports.InputTextFlags = ImGuiInputTextFlags;
var ImGuiTreeNodeFlags;
(function (ImGuiTreeNodeFlags) {
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Selected"] = 1] = "Selected";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Framed"] = 2] = "Framed";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["AllowItemOverlap"] = 4] = "AllowItemOverlap";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoTreePushOnOpen"] = 8] = "NoTreePushOnOpen";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NoAutoOpenOnLog"] = 16] = "NoAutoOpenOnLog";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["DefaultOpen"] = 32] = "DefaultOpen";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnDoubleClick"] = 64] = "OpenOnDoubleClick";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["OpenOnArrow"] = 128] = "OpenOnArrow";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Leaf"] = 256] = "Leaf";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["Bullet"] = 512] = "Bullet";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["FramePadding"] = 1024] = "FramePadding";
    //SpanAllAvailWidth  = 1 << 11,  // FIXME: TODO: Extend hit box horizontally even if not framed
    //NoScrollOnOpen     = 1 << 12,  // FIXME: TODO: Disable automatic scroll on TreePop() if node got just open and contents is not visible
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["NavCloseFromChild"] = 8192] = "NavCloseFromChild";
    ImGuiTreeNodeFlags[ImGuiTreeNodeFlags["CollapsingHeader"] = 18] = "CollapsingHeader";
})(ImGuiTreeNodeFlags = exports.ImGuiTreeNodeFlags || (exports.ImGuiTreeNodeFlags = {}));
exports.TreeNodeFlags = ImGuiTreeNodeFlags;
var ImGuiSelectableFlags;
(function (ImGuiSelectableFlags) {
    ImGuiSelectableFlags[ImGuiSelectableFlags["DontClosePopups"] = 1] = "DontClosePopups";
    ImGuiSelectableFlags[ImGuiSelectableFlags["SpanAllColumns"] = 2] = "SpanAllColumns";
    ImGuiSelectableFlags[ImGuiSelectableFlags["AllowDoubleClick"] = 4] = "AllowDoubleClick"; // Generate press events on double clicks too
})(ImGuiSelectableFlags = exports.ImGuiSelectableFlags || (exports.ImGuiSelectableFlags = {}));
exports.SelectableFlags = ImGuiSelectableFlags;
var ImGuiComboFlags;
(function (ImGuiComboFlags) {
    ImGuiComboFlags[ImGuiComboFlags["PopupAlignLeft"] = 1] = "PopupAlignLeft";
    ImGuiComboFlags[ImGuiComboFlags["HeightSmall"] = 2] = "HeightSmall";
    ImGuiComboFlags[ImGuiComboFlags["HeightRegular"] = 4] = "HeightRegular";
    ImGuiComboFlags[ImGuiComboFlags["HeightLarge"] = 8] = "HeightLarge";
    ImGuiComboFlags[ImGuiComboFlags["HeightLargest"] = 16] = "HeightLargest";
    ImGuiComboFlags[ImGuiComboFlags["HeightMask_"] = 30] = "HeightMask_";
})(ImGuiComboFlags = exports.ImGuiComboFlags || (exports.ImGuiComboFlags = {}));
exports.ComboFlags = ImGuiComboFlags;
var ImGuiFocusedFlags;
(function (ImGuiFocusedFlags) {
    ImGuiFocusedFlags[ImGuiFocusedFlags["ChildWindows"] = 1] = "ChildWindows";
    ImGuiFocusedFlags[ImGuiFocusedFlags["RootWindow"] = 2] = "RootWindow";
    ImGuiFocusedFlags[ImGuiFocusedFlags["AnyWindow"] = 4] = "AnyWindow";
    ImGuiFocusedFlags[ImGuiFocusedFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
})(ImGuiFocusedFlags = exports.ImGuiFocusedFlags || (exports.ImGuiFocusedFlags = {}));
exports.FocusedFlags = ImGuiFocusedFlags;
var ImGuiHoveredFlags;
(function (ImGuiHoveredFlags) {
    ImGuiHoveredFlags[ImGuiHoveredFlags["Default"] = 0] = "Default";
    ImGuiHoveredFlags[ImGuiHoveredFlags["ChildWindows"] = 1] = "ChildWindows";
    ImGuiHoveredFlags[ImGuiHoveredFlags["RootWindow"] = 2] = "RootWindow";
    ImGuiHoveredFlags[ImGuiHoveredFlags["AnyWindow"] = 4] = "AnyWindow";
    ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByPopup"] = 8] = "AllowWhenBlockedByPopup";
    //AllowWhenBlockedByModal     = 1 << 4,   // Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.
    ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenBlockedByActiveItem"] = 32] = "AllowWhenBlockedByActiveItem";
    ImGuiHoveredFlags[ImGuiHoveredFlags["AllowWhenOverlapped"] = 64] = "AllowWhenOverlapped";
    ImGuiHoveredFlags[ImGuiHoveredFlags["RectOnly"] = 104] = "RectOnly";
    ImGuiHoveredFlags[ImGuiHoveredFlags["RootAndChildWindows"] = 3] = "RootAndChildWindows";
})(ImGuiHoveredFlags = exports.ImGuiHoveredFlags || (exports.ImGuiHoveredFlags = {}));
exports.HoveredFlags = ImGuiHoveredFlags;
var ImGuiDragDropFlags;
(function (ImGuiDragDropFlags) {
    // BeginDragDropSource() flags
    ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoPreviewTooltip"] = 1] = "SourceNoPreviewTooltip";
    ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoDisableHover"] = 2] = "SourceNoDisableHover";
    ImGuiDragDropFlags[ImGuiDragDropFlags["SourceNoHoldToOpenOthers"] = 4] = "SourceNoHoldToOpenOthers";
    ImGuiDragDropFlags[ImGuiDragDropFlags["SourceAllowNullID"] = 8] = "SourceAllowNullID";
    ImGuiDragDropFlags[ImGuiDragDropFlags["SourceExtern"] = 16] = "SourceExtern";
    // AcceptDragDropPayload() flags
    ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptBeforeDelivery"] = 1024] = "AcceptBeforeDelivery";
    ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptNoDrawDefaultRect"] = 2048] = "AcceptNoDrawDefaultRect";
    ImGuiDragDropFlags[ImGuiDragDropFlags["AcceptPeekOnly"] = 3072] = "AcceptPeekOnly"; // For peeking ahead and inspecting the payload before delivery.
})(ImGuiDragDropFlags = exports.ImGuiDragDropFlags || (exports.ImGuiDragDropFlags = {}));
exports.DragDropFlags = ImGuiDragDropFlags;
// Standard Drag and Drop payload types. You can define you own payload types using 12-characters long strings. Types starting with '_' are defined by Dear ImGui.
exports.IMGUI_PAYLOAD_TYPE_COLOR_3F = "_COL3F"; // float[3]     // Standard type for colors, without alpha. User code may use this type. 
exports.IMGUI_PAYLOAD_TYPE_COLOR_4F = "_COL4F"; // float[4]     // Standard type for colors. User code may use this type.
var ImGuiKey;
(function (ImGuiKey) {
    ImGuiKey[ImGuiKey["Tab"] = 0] = "Tab";
    ImGuiKey[ImGuiKey["LeftArrow"] = 1] = "LeftArrow";
    ImGuiKey[ImGuiKey["RightArrow"] = 2] = "RightArrow";
    ImGuiKey[ImGuiKey["UpArrow"] = 3] = "UpArrow";
    ImGuiKey[ImGuiKey["DownArrow"] = 4] = "DownArrow";
    ImGuiKey[ImGuiKey["PageUp"] = 5] = "PageUp";
    ImGuiKey[ImGuiKey["PageDown"] = 6] = "PageDown";
    ImGuiKey[ImGuiKey["Home"] = 7] = "Home";
    ImGuiKey[ImGuiKey["End"] = 8] = "End";
    ImGuiKey[ImGuiKey["Insert"] = 9] = "Insert";
    ImGuiKey[ImGuiKey["Delete"] = 10] = "Delete";
    ImGuiKey[ImGuiKey["Backspace"] = 11] = "Backspace";
    ImGuiKey[ImGuiKey["Space"] = 12] = "Space";
    ImGuiKey[ImGuiKey["Enter"] = 13] = "Enter";
    ImGuiKey[ImGuiKey["Escape"] = 14] = "Escape";
    ImGuiKey[ImGuiKey["A"] = 15] = "A";
    ImGuiKey[ImGuiKey["C"] = 16] = "C";
    ImGuiKey[ImGuiKey["V"] = 17] = "V";
    ImGuiKey[ImGuiKey["X"] = 18] = "X";
    ImGuiKey[ImGuiKey["Y"] = 19] = "Y";
    ImGuiKey[ImGuiKey["Z"] = 20] = "Z";
    ImGuiKey[ImGuiKey["COUNT"] = 21] = "COUNT";
})(ImGuiKey = exports.ImGuiKey || (exports.ImGuiKey = {}));
exports.Key = ImGuiKey;
var ImGuiNavInput;
(function (ImGuiNavInput) {
    // Gamepad Mapping
    ImGuiNavInput[ImGuiNavInput["Activate"] = 0] = "Activate";
    ImGuiNavInput[ImGuiNavInput["Cancel"] = 1] = "Cancel";
    ImGuiNavInput[ImGuiNavInput["Input"] = 2] = "Input";
    ImGuiNavInput[ImGuiNavInput["Menu"] = 3] = "Menu";
    ImGuiNavInput[ImGuiNavInput["DpadLeft"] = 4] = "DpadLeft";
    ImGuiNavInput[ImGuiNavInput["DpadRight"] = 5] = "DpadRight";
    ImGuiNavInput[ImGuiNavInput["DpadUp"] = 6] = "DpadUp";
    ImGuiNavInput[ImGuiNavInput["DpadDown"] = 7] = "DpadDown";
    ImGuiNavInput[ImGuiNavInput["LStickLeft"] = 8] = "LStickLeft";
    ImGuiNavInput[ImGuiNavInput["LStickRight"] = 9] = "LStickRight";
    ImGuiNavInput[ImGuiNavInput["LStickUp"] = 10] = "LStickUp";
    ImGuiNavInput[ImGuiNavInput["LStickDown"] = 11] = "LStickDown";
    ImGuiNavInput[ImGuiNavInput["FocusPrev"] = 12] = "FocusPrev";
    ImGuiNavInput[ImGuiNavInput["FocusNext"] = 13] = "FocusNext";
    ImGuiNavInput[ImGuiNavInput["TweakSlow"] = 14] = "TweakSlow";
    ImGuiNavInput[ImGuiNavInput["TweakFast"] = 15] = "TweakFast";
    // [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
    // Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) may be directly reading from io.KeyDown[] instead of io.NavInputs[].
    ImGuiNavInput[ImGuiNavInput["KeyMenu_"] = 16] = "KeyMenu_";
    ImGuiNavInput[ImGuiNavInput["KeyLeft_"] = 17] = "KeyLeft_";
    ImGuiNavInput[ImGuiNavInput["KeyRight_"] = 18] = "KeyRight_";
    ImGuiNavInput[ImGuiNavInput["KeyUp_"] = 19] = "KeyUp_";
    ImGuiNavInput[ImGuiNavInput["KeyDown_"] = 20] = "KeyDown_";
    ImGuiNavInput[ImGuiNavInput["COUNT"] = 21] = "COUNT";
    ImGuiNavInput[ImGuiNavInput["InternalStart_"] = 16] = "InternalStart_";
})(ImGuiNavInput = exports.ImGuiNavInput || (exports.ImGuiNavInput = {}));
exports.NavInput = ImGuiNavInput;
var ImGuiNavFlags;
(function (ImGuiNavFlags) {
    ImGuiNavFlags[ImGuiNavFlags["EnableKeyboard"] = 1] = "EnableKeyboard";
    ImGuiNavFlags[ImGuiNavFlags["EnableGamepad"] = 2] = "EnableGamepad";
    ImGuiNavFlags[ImGuiNavFlags["MoveMouse"] = 4] = "MoveMouse";
    ImGuiNavFlags[ImGuiNavFlags["NoCaptureKeyboard"] = 8] = "NoCaptureKeyboard"; // Do not set the io.WantCaptureKeyboard flag with io.NavActive is set. 
})(ImGuiNavFlags = exports.ImGuiNavFlags || (exports.ImGuiNavFlags = {}));
exports.NavFlags = ImGuiNavFlags;
var ImGuiCol;
(function (ImGuiCol) {
    ImGuiCol[ImGuiCol["Text"] = 0] = "Text";
    ImGuiCol[ImGuiCol["TextDisabled"] = 1] = "TextDisabled";
    ImGuiCol[ImGuiCol["WindowBg"] = 2] = "WindowBg";
    ImGuiCol[ImGuiCol["ChildBg"] = 3] = "ChildBg";
    ImGuiCol[ImGuiCol["PopupBg"] = 4] = "PopupBg";
    ImGuiCol[ImGuiCol["Border"] = 5] = "Border";
    ImGuiCol[ImGuiCol["BorderShadow"] = 6] = "BorderShadow";
    ImGuiCol[ImGuiCol["FrameBg"] = 7] = "FrameBg";
    ImGuiCol[ImGuiCol["FrameBgHovered"] = 8] = "FrameBgHovered";
    ImGuiCol[ImGuiCol["FrameBgActive"] = 9] = "FrameBgActive";
    ImGuiCol[ImGuiCol["TitleBg"] = 10] = "TitleBg";
    ImGuiCol[ImGuiCol["TitleBgActive"] = 11] = "TitleBgActive";
    ImGuiCol[ImGuiCol["TitleBgCollapsed"] = 12] = "TitleBgCollapsed";
    ImGuiCol[ImGuiCol["MenuBarBg"] = 13] = "MenuBarBg";
    ImGuiCol[ImGuiCol["ScrollbarBg"] = 14] = "ScrollbarBg";
    ImGuiCol[ImGuiCol["ScrollbarGrab"] = 15] = "ScrollbarGrab";
    ImGuiCol[ImGuiCol["ScrollbarGrabHovered"] = 16] = "ScrollbarGrabHovered";
    ImGuiCol[ImGuiCol["ScrollbarGrabActive"] = 17] = "ScrollbarGrabActive";
    ImGuiCol[ImGuiCol["CheckMark"] = 18] = "CheckMark";
    ImGuiCol[ImGuiCol["SliderGrab"] = 19] = "SliderGrab";
    ImGuiCol[ImGuiCol["SliderGrabActive"] = 20] = "SliderGrabActive";
    ImGuiCol[ImGuiCol["Button"] = 21] = "Button";
    ImGuiCol[ImGuiCol["ButtonHovered"] = 22] = "ButtonHovered";
    ImGuiCol[ImGuiCol["ButtonActive"] = 23] = "ButtonActive";
    ImGuiCol[ImGuiCol["Header"] = 24] = "Header";
    ImGuiCol[ImGuiCol["HeaderHovered"] = 25] = "HeaderHovered";
    ImGuiCol[ImGuiCol["HeaderActive"] = 26] = "HeaderActive";
    ImGuiCol[ImGuiCol["Separator"] = 27] = "Separator";
    ImGuiCol[ImGuiCol["SeparatorHovered"] = 28] = "SeparatorHovered";
    ImGuiCol[ImGuiCol["SeparatorActive"] = 29] = "SeparatorActive";
    ImGuiCol[ImGuiCol["ResizeGrip"] = 30] = "ResizeGrip";
    ImGuiCol[ImGuiCol["ResizeGripHovered"] = 31] = "ResizeGripHovered";
    ImGuiCol[ImGuiCol["ResizeGripActive"] = 32] = "ResizeGripActive";
    ImGuiCol[ImGuiCol["CloseButton"] = 33] = "CloseButton";
    ImGuiCol[ImGuiCol["CloseButtonHovered"] = 34] = "CloseButtonHovered";
    ImGuiCol[ImGuiCol["CloseButtonActive"] = 35] = "CloseButtonActive";
    ImGuiCol[ImGuiCol["PlotLines"] = 36] = "PlotLines";
    ImGuiCol[ImGuiCol["PlotLinesHovered"] = 37] = "PlotLinesHovered";
    ImGuiCol[ImGuiCol["PlotHistogram"] = 38] = "PlotHistogram";
    ImGuiCol[ImGuiCol["PlotHistogramHovered"] = 39] = "PlotHistogramHovered";
    ImGuiCol[ImGuiCol["TextSelectedBg"] = 40] = "TextSelectedBg";
    ImGuiCol[ImGuiCol["ModalWindowDarkening"] = 41] = "ModalWindowDarkening";
    ImGuiCol[ImGuiCol["DragDropTarget"] = 42] = "DragDropTarget";
    ImGuiCol[ImGuiCol["NavHighlight"] = 43] = "NavHighlight";
    ImGuiCol[ImGuiCol["NavWindowingHighlight"] = 44] = "NavWindowingHighlight";
    ImGuiCol[ImGuiCol["COUNT"] = 45] = "COUNT";
})(ImGuiCol = exports.ImGuiCol || (exports.ImGuiCol = {}));
exports.Col = ImGuiCol;
var ImGuiStyleVar;
(function (ImGuiStyleVar) {
    // Enum name ......................// Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
    ImGuiStyleVar[ImGuiStyleVar["Alpha"] = 0] = "Alpha";
    ImGuiStyleVar[ImGuiStyleVar["WindowPadding"] = 1] = "WindowPadding";
    ImGuiStyleVar[ImGuiStyleVar["WindowRounding"] = 2] = "WindowRounding";
    ImGuiStyleVar[ImGuiStyleVar["WindowBorderSize"] = 3] = "WindowBorderSize";
    ImGuiStyleVar[ImGuiStyleVar["WindowMinSize"] = 4] = "WindowMinSize";
    ImGuiStyleVar[ImGuiStyleVar["WindowTitleAlign"] = 5] = "WindowTitleAlign";
    ImGuiStyleVar[ImGuiStyleVar["ChildRounding"] = 6] = "ChildRounding";
    ImGuiStyleVar[ImGuiStyleVar["ChildBorderSize"] = 7] = "ChildBorderSize";
    ImGuiStyleVar[ImGuiStyleVar["PopupRounding"] = 8] = "PopupRounding";
    ImGuiStyleVar[ImGuiStyleVar["PopupBorderSize"] = 9] = "PopupBorderSize";
    ImGuiStyleVar[ImGuiStyleVar["FramePadding"] = 10] = "FramePadding";
    ImGuiStyleVar[ImGuiStyleVar["FrameRounding"] = 11] = "FrameRounding";
    ImGuiStyleVar[ImGuiStyleVar["FrameBorderSize"] = 12] = "FrameBorderSize";
    ImGuiStyleVar[ImGuiStyleVar["ItemSpacing"] = 13] = "ItemSpacing";
    ImGuiStyleVar[ImGuiStyleVar["ItemInnerSpacing"] = 14] = "ItemInnerSpacing";
    ImGuiStyleVar[ImGuiStyleVar["IndentSpacing"] = 15] = "IndentSpacing";
    ImGuiStyleVar[ImGuiStyleVar["ScrollbarSize"] = 16] = "ScrollbarSize";
    ImGuiStyleVar[ImGuiStyleVar["ScrollbarRounding"] = 17] = "ScrollbarRounding";
    ImGuiStyleVar[ImGuiStyleVar["GrabMinSize"] = 18] = "GrabMinSize";
    ImGuiStyleVar[ImGuiStyleVar["GrabRounding"] = 19] = "GrabRounding";
    ImGuiStyleVar[ImGuiStyleVar["ButtonTextAlign"] = 20] = "ButtonTextAlign";
    ImGuiStyleVar[ImGuiStyleVar["Count_"] = 21] = "Count_";
    ImGuiStyleVar[ImGuiStyleVar["COUNT"] = 21] = "COUNT";
})(ImGuiStyleVar = exports.ImGuiStyleVar || (exports.ImGuiStyleVar = {}));
exports.StyleVar = ImGuiStyleVar;
var ImGuiColorEditFlags;
(function (ImGuiColorEditFlags) {
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoAlpha"] = 2] = "NoAlpha";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoPicker"] = 4] = "NoPicker";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoOptions"] = 8] = "NoOptions";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoSmallPreview"] = 16] = "NoSmallPreview";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoInputs"] = 32] = "NoInputs";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoTooltip"] = 64] = "NoTooltip";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoLabel"] = 128] = "NoLabel";
    ImGuiColorEditFlags[ImGuiColorEditFlags["NoSidePreview"] = 256] = "NoSidePreview";
    // User Options (right-click on widget to change some of them). You can set application defaults using SetColorEditOptions(). The idea is that you probably don't want to override them in most of your calls, let the user choose and/or call SetColorEditOptions() during startup.
    ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaBar"] = 512] = "AlphaBar";
    ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreview"] = 1024] = "AlphaPreview";
    ImGuiColorEditFlags[ImGuiColorEditFlags["AlphaPreviewHalf"] = 2048] = "AlphaPreviewHalf";
    ImGuiColorEditFlags[ImGuiColorEditFlags["HDR"] = 4096] = "HDR";
    ImGuiColorEditFlags[ImGuiColorEditFlags["RGB"] = 8192] = "RGB";
    ImGuiColorEditFlags[ImGuiColorEditFlags["HSV"] = 16384] = "HSV";
    ImGuiColorEditFlags[ImGuiColorEditFlags["HEX"] = 32768] = "HEX";
    ImGuiColorEditFlags[ImGuiColorEditFlags["Uint8"] = 65536] = "Uint8";
    ImGuiColorEditFlags[ImGuiColorEditFlags["Float"] = 131072] = "Float";
    ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueBar"] = 262144] = "PickerHueBar";
    ImGuiColorEditFlags[ImGuiColorEditFlags["PickerHueWheel"] = 524288] = "PickerHueWheel";
    // Internals/Masks
    ImGuiColorEditFlags[ImGuiColorEditFlags["_InputsMask"] = 57344] = "_InputsMask";
    ImGuiColorEditFlags[ImGuiColorEditFlags["_DataTypeMask"] = 196608] = "_DataTypeMask";
    ImGuiColorEditFlags[ImGuiColorEditFlags["_PickerMask"] = 786432] = "_PickerMask";
    ImGuiColorEditFlags[ImGuiColorEditFlags["_OptionsDefault"] = 335872] = "_OptionsDefault"; // Change application default using SetColorEditOptions()
})(ImGuiColorEditFlags = exports.ImGuiColorEditFlags || (exports.ImGuiColorEditFlags = {}));
exports.ColorEditFlags = ImGuiColorEditFlags;
var ImGuiMouseCursor;
(function (ImGuiMouseCursor) {
    ImGuiMouseCursor[ImGuiMouseCursor["None"] = -1] = "None";
    ImGuiMouseCursor[ImGuiMouseCursor["Arrow"] = 0] = "Arrow";
    ImGuiMouseCursor[ImGuiMouseCursor["TextInput"] = 1] = "TextInput";
    ImGuiMouseCursor[ImGuiMouseCursor["Move"] = 2] = "Move";
    ImGuiMouseCursor[ImGuiMouseCursor["ResizeNS"] = 3] = "ResizeNS";
    ImGuiMouseCursor[ImGuiMouseCursor["ResizeEW"] = 4] = "ResizeEW";
    ImGuiMouseCursor[ImGuiMouseCursor["ResizeNESW"] = 5] = "ResizeNESW";
    ImGuiMouseCursor[ImGuiMouseCursor["ResizeNWSE"] = 6] = "ResizeNWSE";
    ImGuiMouseCursor[ImGuiMouseCursor["Count_"] = 7] = "Count_";
    ImGuiMouseCursor[ImGuiMouseCursor["COUNT"] = 7] = "COUNT";
})(ImGuiMouseCursor = exports.ImGuiMouseCursor || (exports.ImGuiMouseCursor = {}));
exports.MouseCursor = ImGuiMouseCursor;
var ImGuiCond;
(function (ImGuiCond) {
    ImGuiCond[ImGuiCond["Always"] = 1] = "Always";
    ImGuiCond[ImGuiCond["Once"] = 2] = "Once";
    ImGuiCond[ImGuiCond["FirstUseEver"] = 4] = "FirstUseEver";
    ImGuiCond[ImGuiCond["Appearing"] = 8] = "Appearing"; // Set the variable if the window is appearing after being hidden/inactive (or the first time)
})(ImGuiCond = exports.ImGuiCond || (exports.ImGuiCond = {}));
exports.Cond = ImGuiCond;
var ImDrawCornerFlags;
(function (ImDrawCornerFlags) {
    ImDrawCornerFlags[ImDrawCornerFlags["TopLeft"] = 1] = "TopLeft";
    ImDrawCornerFlags[ImDrawCornerFlags["TopRight"] = 2] = "TopRight";
    ImDrawCornerFlags[ImDrawCornerFlags["BotLeft"] = 4] = "BotLeft";
    ImDrawCornerFlags[ImDrawCornerFlags["BotRight"] = 8] = "BotRight";
    ImDrawCornerFlags[ImDrawCornerFlags["Top"] = 3] = "Top";
    ImDrawCornerFlags[ImDrawCornerFlags["Bot"] = 12] = "Bot";
    ImDrawCornerFlags[ImDrawCornerFlags["Left"] = 5] = "Left";
    ImDrawCornerFlags[ImDrawCornerFlags["Right"] = 10] = "Right";
    ImDrawCornerFlags[ImDrawCornerFlags["All"] = 15] = "All"; // In your function calls you may use ~0 (= all bits sets) instead of All, as a convenience
})(ImDrawCornerFlags = exports.ImDrawCornerFlags || (exports.ImDrawCornerFlags = {}));
exports.wCornerFlags = ImDrawCornerFlags;
var ImDrawListFlags;
(function (ImDrawListFlags) {
    ImDrawListFlags[ImDrawListFlags["AntiAliasedLines"] = 1] = "AntiAliasedLines";
    ImDrawListFlags[ImDrawListFlags["AntiAliasedFill"] = 2] = "AntiAliasedFill";
})(ImDrawListFlags = exports.ImDrawListFlags || (exports.ImDrawListFlags = {}));
exports.wListFlags = ImDrawListFlags;
var bind_imgui_2 = require("./bind-imgui");
exports.reference_ImVec2 = bind_imgui_2.reference_ImVec2;
class ImVec2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    Copy(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    Equals(other) {
        if (this.x !== other.x) {
            return false;
        }
        if (this.y !== other.y) {
            return false;
        }
        return true;
    }
}
ImVec2.ZERO = new ImVec2(0.0, 0.0);
ImVec2.UNIT = new ImVec2(1.0, 1.0);
ImVec2.UNIT_X = new ImVec2(1.0, 0.0);
ImVec2.UNIT_Y = new ImVec2(0.0, 1.0);
exports.ImVec2 = ImVec2;
var bind_imgui_3 = require("./bind-imgui");
exports.reference_ImVec4 = bind_imgui_3.reference_ImVec4;
class ImVec4 {
    constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Copy(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
        return this;
    }
    Equals(other) {
        if (this.x !== other.x) {
            return false;
        }
        if (this.y !== other.y) {
            return false;
        }
        if (this.z !== other.z) {
            return false;
        }
        if (this.w !== other.w) {
            return false;
        }
        return true;
    }
}
ImVec4.ZERO = new ImVec4(0.0, 0.0, 0.0, 0.0);
ImVec4.UNIT = new ImVec4(1.0, 1.0, 1.0, 1.0);
ImVec4.UNIT_X = new ImVec4(1.0, 0.0, 0.0, 0.0);
ImVec4.UNIT_Y = new ImVec4(0.0, 1.0, 0.0, 0.0);
ImVec4.UNIT_Z = new ImVec4(0.0, 0.0, 1.0, 0.0);
ImVec4.UNIT_W = new ImVec4(0.0, 0.0, 0.0, 1.0);
ImVec4.BLACK = new ImVec4(0.0, 0.0, 0.0, 1.0);
ImVec4.WHITE = new ImVec4(1.0, 1.0, 1.0, 1.0);
exports.ImVec4 = ImVec4;
//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------
// Lightweight std::vector<> like class to avoid dragging dependencies (also: windows implementation of STL with debug enabled is absurdly slow, so let's bypass it so our code runs fast in debug).
// Our implementation does NOT call C++ constructors/destructors. This is intentional and we do not require it. Do not use this class as a straight std::vector replacement in your code!
class ImVector {
    constructor() {
        this.Data = [];
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
        // inline iterator             erase(const_iterator it)        { IM_ASSERT(it >= Data && it < Data+Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(value_type)); Size--; return Data + off; }
        // inline iterator             insert(const_iterator it, const value_type& v)  { IM_ASSERT(it >= Data && it <= Data+Size); const ptrdiff_t off = it - Data; if (Size == Capacity) reserve(_grow_capacity(Size + 1)); if (off < (int)Size) memmove(Data + off + 1, Data + off, ((size_t)Size - (size_t)off) * sizeof(value_type)); Data[off] = v; Size++; return Data + off; }
        // inline bool                 contains(const value_type& v) const             { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data++ == v) return true; return false; }
    }
    get Size() { return this.Data.length; }
    empty() { return this.Data.length === 0; }
    clear() { this.Data.length = 0; }
    pop_back() { return this.Data.pop(); }
    push_back(value) { this.Data.push(value); }
}
exports.ImVector = ImVector;
// Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
class ImGuiTextFilter {
    // IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
    constructor(default_filter = "") {
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
        this.InputBuf = new ImStringBuffer(256);
        // ImVector<TextRange> Filters;
        // int                 CountGrep;
        this.CountGrep = 0;
        if (default_filter) {
            // ImStrncpy(InputBuf, default_filter, IM_ARRAYSIZE(InputBuf));
            this.InputBuf.buffer = default_filter;
            this.Build();
        }
        else {
            // InputBuf[0] = 0;
            this.InputBuf.buffer = "";
            this.CountGrep = 0;
        }
    }
    // IMGUI_API bool      Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f);    // Helper calling InputText+Build
    Draw(label = "Filter (inc,-exc)", width = 0.0) {
        if (width !== 0.0)
            bind.PushItemWidth(width);
        const value_changed = InputText(label, this.InputBuf, IM_ARRAYSIZE(this.InputBuf));
        if (width !== 0.0)
            bind.PopItemWidth();
        if (value_changed)
            this.Build();
        return value_changed;
    }
    // IMGUI_API bool      PassFilter(const char* text, const char* text_end = NULL) const;
    PassFilter(text, text_end = null) {
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
    Build() {
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
    Clear() { this.InputBuf.buffer = ""; this.Build(); }
    // bool                IsActive() const { return !Filters.empty(); }
    IsActive() { return false; }
}
exports.ImGuiTextFilter = ImGuiTextFilter;
// Helper: Text buffer for logging/accumulating text
class ImGuiTextBuffer {
    constructor() {
        // ImVector<char>      Buf;
        this.Buf = "";
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
    begin() { return this.Buf; }
    size() { return this.Buf.length; }
    clear() { this.Buf = ""; }
    append(text) { this.Buf += text; }
}
exports.ImGuiTextBuffer = ImGuiTextBuffer;
// Helper: Simple Key->value storage
// Typically you don't have to worry about this since a storage is held within each Window.
// We use it to e.g. store collapse state for a tree (Int 0/1), store color edit options.
// This is optimized for efficient reading (dichotomy into a contiguous buffer), rare writing (typically tied to user interactions)
// You can use it as custom user storage for temporary values. Declare your own storage if, for example:
// - You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
// - You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
// Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
class ImGuiStorage {
}
exports.ImGuiStorage = ImGuiStorage;
// Data payload for Drag and Drop operations
class ImGuiPayload {
}
exports.ImGuiPayload = ImGuiPayload;
// Helpers macros to generate 32-bits encoded colors
exports.IM_COL32_R_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 16 : 0;
exports.IM_COL32_G_SHIFT = 8;
exports.IM_COL32_B_SHIFT = config.IMGUI_USE_BGRA_PACKED_COLOR ? 0 : 16;
exports.IM_COL32_A_SHIFT = 24;
exports.IM_COL32_A_MASK = 0xFF000000;
function IM_COL32(R, G, B, A = 255) {
    return ((A << exports.IM_COL32_A_SHIFT) | (B << exports.IM_COL32_B_SHIFT) | (G << exports.IM_COL32_G_SHIFT) | (R << exports.IM_COL32_R_SHIFT)) >>> 0;
}
exports.IM_COL32 = IM_COL32;
exports.IM_COL32_WHITE = IM_COL32(255, 255, 255, 255); // Opaque white = 0xFFFFFFFF
exports.IM_COL32_BLACK = IM_COL32(0, 0, 0, 255); // Opaque black
exports.IM_COL32_BLACK_TRANS = IM_COL32(0, 0, 0, 0); // Transparent black = 0x00000000
// ImColor() helper to implicity converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
// Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
// **Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
// **None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
class ImColor {
    // ImColor()                                                       { Value.x = Value.y = Value.z = Value.w = 0.0f; }
    // ImColor(int r, int g, int b, int a = 255)                       { float sc = 1.0f/255.0f; Value.x = (float)r * sc; Value.y = (float)g * sc; Value.z = (float)b * sc; Value.w = (float)a * sc; }
    // ImColor(ImU32 rgba)                                             { float sc = 1.0f/255.0f; Value.x = (float)((rgba>>IM_COL32_R_SHIFT)&0xFF) * sc; Value.y = (float)((rgba>>IM_COL32_G_SHIFT)&0xFF) * sc; Value.z = (float)((rgba>>IM_COL32_B_SHIFT)&0xFF) * sc; Value.w = (float)((rgba>>IM_COL32_A_SHIFT)&0xFF) * sc; }
    // ImColor(float r, float g, float b, float a = 1.0f)              { Value.x = r; Value.y = g; Value.z = b; Value.w = a; }
    // ImColor(const ImVec4& col)                                      { Value = col; }
    constructor(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
        // ImVec4              Value;
        this.Value = new ImVec4();
        if (typeof (r) === "number") {
            if (r > 255 && g === 0.0 && b === 0.0 && a === 1.0) {
                this.Value.x = Math.max(0.0, Math.min(1.0, ((r >> exports.IM_COL32_R_SHIFT) & 0xFF) / 255));
                this.Value.y = Math.max(0.0, Math.min(1.0, ((r >> exports.IM_COL32_G_SHIFT) & 0xFF) / 255));
                this.Value.z = Math.max(0.0, Math.min(1.0, ((r >> exports.IM_COL32_B_SHIFT) & 0xFF) / 255));
                this.Value.w = Math.max(0.0, Math.min(1.0, ((r >> exports.IM_COL32_A_SHIFT) & 0xFF) / 255));
            }
            else if (r <= 1.0 && g <= 1.0 && b <= 1.0 && a <= 1.0) {
                this.Value.x = Math.max(0.0, r);
                this.Value.y = Math.max(0.0, g);
                this.Value.z = Math.max(0.0, b);
                this.Value.w = Math.max(0.0, a);
            }
            else {
                this.Value.x = Math.max(0.0, Math.min(1.0, r / 255));
                this.Value.y = Math.max(0.0, Math.min(1.0, g / 255));
                this.Value.z = Math.max(0.0, Math.min(1.0, b / 255));
                if (a <= 1.0) {
                    this.Value.w = Math.max(0.0, a);
                }
                else {
                    this.Value.w = Math.max(0.0, Math.min(1.0, a / 255));
                }
            }
        }
        else {
            this.Value.Copy(r);
        }
    }
    // inline operator ImU32() const                                   { return ImGui::ColorConvertFloat4ToU32(Value); }
    toImU32() { return bind.ColorConvertFloat4ToU32(this.Value); }
    // inline operator ImVec4() const                                  { return Value; }
    toImVec4() { return this.Value; }
    // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
    // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
    SetHSV(h, s, v, a = 1.0) {
        const ref_r = [this.Value.x];
        const ref_g = [this.Value.y];
        const ref_b = [this.Value.z];
        bind.ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
        this.Value.x = ref_r[0];
        this.Value.y = ref_g[0];
        this.Value.z = ref_b[0];
        this.Value.w = a;
    }
    // static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r,g,b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r,g,b,a); }
    static HSV(h, s, v, a = 1.0) {
        const color = new ImColor();
        color.SetHSV(h, s, v, a);
        return color;
    }
}
exports.ImColor = ImColor;
exports.ImGuiTextEditDefaultSize = 128;
// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
class ImGuiTextEditCallbackData {
    constructor(native, UserData) {
        this.native = native;
        this.UserData = UserData;
    }
    delete() { if (this.native) {
        this.native.delete();
        delete this.native;
    } }
    // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
    get EventFlag() { return this.native.EventFlag; }
    // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    get Flags() { return this.native.Flags; }
    // void*               UserData;       // What user passed to InputText()      // Read-only
    // public get UserData(): any { return this.native.UserData; }
    // bool                ReadOnly;       // Read-only mode                       // Read-only
    get ReadOnly() { return this.native.ReadOnly; }
    // CharFilter event:
    // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
    get EventChar() { return this.native.EventChar; }
    set EventChar(value) { this.native.EventChar = value; }
    // Completion,History,Always events:
    // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
    // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
    get EventKey() { return this.native.EventKey; }
    // char*               Buf;            // Current text buffer                  // Read-write (pointed data only, can't replace the actual pointer)
    get Buf() { return this.native.getBuf(); }
    set Buf(value) { this.native.setBuf(value); }
    // int                 BufTextLen;     // Current text length in bytes         // Read-write
    get BufTextLen() { return this.native.BufTextLen; }
    set BufTextLen(value) { this.native.BufTextLen = value; }
    // int                 BufSize;        // Maximum text length in bytes         // Read-only
    get BufSize() { return this.native.BufSize; }
    // bool                BufDirty;       // Set if you modify Buf/BufTextLen!!   // Write
    set BufDirty(value) { this.native.BufDirty = value; }
    // int                 CursorPos;      //                                      // Read-write
    get CursorPos() { return this.native.CursorPos; }
    set CursorPos(value) { this.native.CursorPos = value; }
    // int                 SelectionStart; //                                      // Read-write (== to SelectionEnd when no selection)
    get SelectionStart() { return this.native.SelectionStart; }
    set SelectionStart(value) { this.native.SelectionStart = value; }
    // int                 SelectionEnd;   //                                      // Read-write
    get SelectionEnd() { return this.native.SelectionEnd; }
    set SelectionEnd(value) { this.native.SelectionEnd = value; }
    // NB: Helper functions for text manipulation. Calling those function loses selection.
    // IMGUI_API void    DeleteChars(int pos, int bytes_count);
    DeleteChars(pos, bytes_count) { return this.native.DeleteChars(pos, bytes_count); }
    // IMGUI_API void    InsertChars(int pos, const char* text, const char* text_end = NULL);
    InsertChars(pos, text, text_end = null) { return this.native.InsertChars(pos, text, text_end); }
    // bool              HasSelection() const { return SelectionStart != SelectionEnd; }
    HasSelection() { return this.native.HasSelection(); }
}
exports.ImGuiTextEditCallbackData = ImGuiTextEditCallbackData;
// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
class ImGuiSizeCallbackData {
    constructor(native) {
        this.native = native;
    }
    delete() { if (this.native) {
        this.native.delete();
        delete this.native;
    } }
    get UserData() { return this.native.UserData; }
    get Pos() { return this.native.getPos(); }
    get CurrentSize() { return this.native.getCurrentSize(); }
    get DesiredSize() { return this.native.getDesiredSize(); }
}
exports.ImGuiSizeCallbackData = ImGuiSizeCallbackData;
class ImGuiListClipper {
    get StartPosY() { return this.native.StartPosY; }
    get ItemsHeight() { return this.native.ItemsHeight; }
    get ItemsCount() { return this.native.ItemsCount; }
    get StepNo() { return this.native.StepNo; }
    get DisplayStart() { return this.native.DisplayStart; }
    get DisplayEnd() { return this.native.DisplayEnd; }
    // items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
    // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
    // If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().
    // ImGuiListClipper(int items_count = -1, float items_height = -1.0f)  { Begin(items_count, items_height); } // NB: Begin() initialize every fields (as we allow user to call Begin/End multiple times on a same instance if they want).
    constructor(items_count = -1, items_height = -1.0) {
        this.native = new bind.ImGuiListClipper(items_count, items_height);
    }
    // ~ImGuiListClipper()                                                 { IM_ASSERT(ItemsCount == -1); }      // Assert if user forgot to call End() or Step() until false.
    delete() {
        if (this.native) {
            this.native.delete();
            delete this.native;
        }
    }
    // IMGUI_API bool Step();                                              // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.
    Step() {
        if (!this.native) {
            throw new Error();
        }
        const busy = this.native.Step();
        if (!busy) {
            this.delete();
        }
        return busy;
    }
    // IMGUI_API void Begin(int items_count, float items_height = -1.0f);  // Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.
    Begin(items_count, items_height) {
        if (!this.native) {
            this.native = new bind.ImGuiListClipper(items_count, items_height);
        }
        this.native.Begin(items_count, items_height);
    }
    // IMGUI_API void End();                                               // Automatically called on the last call of Step() that returns false.
    End() {
        if (!this.native) {
            throw new Error();
        }
        this.native.End();
        this.delete();
    }
}
exports.ImGuiListClipper = ImGuiListClipper;
// Typically, 1 command = 1 GPU draw call (unless command is a callback)
class ImDrawCmd {
    constructor(native) {
        this.native = native;
    }
    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    get ElemCount() { return this.native.ElemCount; }
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    get ClipRect() { return this.native.getClipRect(); }
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    get TextureId() { return this.native.TextureId; }
}
exports.ImDrawCmd = ImDrawCmd;
// Vertex index (override with '#define ImDrawIdx unsigned int' inside in imconfig.h)
// #ifndef ImDrawIdx
// typedef unsigned short ImDrawIdx;
// #endif
var bind_imgui_4 = require("./bind-imgui");
exports.ImDrawIdxSize = bind_imgui_4.ImDrawIdxSize;
// Vertex layout
// #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
var bind_imgui_5 = require("./bind-imgui");
exports.ImDrawVertSize = bind_imgui_5.ImDrawVertSize;
var bind_imgui_6 = require("./bind-imgui");
exports.ImDrawVertPosOffset = bind_imgui_6.ImDrawVertPosOffset;
var bind_imgui_7 = require("./bind-imgui");
exports.ImDrawVertUVOffset = bind_imgui_7.ImDrawVertUVOffset;
var bind_imgui_8 = require("./bind-imgui");
exports.ImDrawVertColOffset = bind_imgui_8.ImDrawVertColOffset;
class ImDrawVert {
    constructor(buffer, byteOffset = 0) {
        this.pos = new Float32Array(buffer, byteOffset + bind.ImDrawVertPosOffset, 2);
        this.uv = new Float32Array(buffer, byteOffset + bind.ImDrawVertUVOffset, 2);
        this.col = new Uint32Array(buffer, byteOffset + bind.ImDrawVertColOffset, 1);
    }
}
exports.ImDrawVert = ImDrawVert;
// #else
// You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
// The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
// The type has to be described within the macro (you can either declare the struct or use a typedef)
// NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
// IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
// #endif
// Draw channels are used by the Columns API to "split" the render list into different channels while building, so items of each column can be batched together.
// You can also use them to simulate drawing layers and submit primitives in a different order than how they will be rendered.
class ImDrawChannel {
}
exports.ImDrawChannel = ImDrawChannel;
// export { ImDrawCornerFlags } from "./bind-imgui";
// export { ImDrawListFlags } from "./bind-imgui";
class ImDrawListSharedData {
    constructor(native) {
        this.native = native;
    }
}
exports.ImDrawListSharedData = ImDrawListSharedData;
// Draw command list
// This is the low-level list of polygons that ImGui functions are filling. At the end of the frame, all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
// Each ImGui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to access the current window draw list and draw custom primitives.
// You can interleave normal ImGui:: calls and adding primitives to the current draw list.
// All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), however you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
// Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
class ImDrawList {
    constructor(native) {
        this.native = native;
    }
    IterateDrawCmds(callback) {
        this.native.IterateDrawCmds((draw_cmd, ElemStart) => {
            callback(new ImDrawCmd(draw_cmd), ElemStart);
        });
    }
    // This is what you have to render
    // ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
    // ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
    get IdxBuffer() { return this.native.IdxBuffer; }
    // ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
    get VtxBuffer() { return this.native.VtxBuffer; }
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
    PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect = false) {
        this.native.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    // IMGUI_API void  PushClipRectFullScreen();
    PushClipRectFullScreen() { this.native.PushClipRectFullScreen(); }
    // IMGUI_API void  PopClipRect();
    PopClipRect() { this.native.PopClipRect(); }
    // IMGUI_API void  PushTextureID(const ImTextureID& texture_id);
    // IMGUI_API void  PopTextureID();
    // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }
    // Primitives
    // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
    AddLine(a, b, col, thickness = 1.0) {
        this.native.AddLine(a, b, col, thickness);
    }
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    AddRect(a, b, col, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All, thickness = 1.0) {
        this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
    }
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    AddRectFilled(a, b, col, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All) {
        this.native.AddRectFilled(a, b, col, rounding, rounding_corners_flags);
    }
    // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left) {
        this.native.AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
    }
    // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
    AddQuad(a, b, c, d, col, thickness = 1.0) {
        this.native.AddQuad(a, b, c, d, col, thickness);
    }
    // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
    AddQuadFilled(a, b, c, d, col) {
        this.native.AddQuadFilled(a, b, c, d, col);
    }
    // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
    AddTriangle(a, b, c, col, thickness = 1.0) {
        this.native.AddTriangle(a, b, c, col, thickness);
    }
    // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
    AddTriangleFilled(a, b, c, col) {
        this.native.AddTriangleFilled(a, b, c, col);
    }
    // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
    AddCircle(centre, radius, col, num_segments = 12, thickness = 1.0) {
        this.native.AddCircle(centre, radius, col, num_segments, thickness);
    }
    // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
    AddCircleFilled(centre, radius, col, num_segments = 12) {
        this.native.AddCircleFilled(centre, radius, col, num_segments);
    }
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    AddText(pos, col, text_begin, text_end = null) {
        this.native.AddText(pos, col, text_begin, text_end);
    }
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    AddText_Font(font, font_size, pos, col, text_begin, text_end = null, wrap_width = 0.0, cpu_fine_clip_rect = null) {
        this.native.AddText_Font(font.native, font_size, pos, col, text_begin, text_end, wrap_width, cpu_fine_clip_rect);
    }
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness = 1.0, num_segments = 0) {
        this.native.AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness, num_segments);
    }
    // Stateful path API, add points then finish with PathFill() or PathStroke()
    // inline    void  PathClear()                                                 { _Path.resize(0); }
    PathClear() { this.native.PathClear(); }
    // inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
    PathLineTo(pos) { this.native.PathLineTo(pos); }
    // inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path[_Path.Size-1], &pos, 8) != 0) _Path.push_back(pos); }
    PathLineToMergeDuplicate(pos) { this.native.PathLineToMergeDuplicate(pos); }
    // inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); PathClear(); }
    PathFillConvex(col) { this.native.PathFillConvex(col); }
    // inline    void  PathStroke(ImU32 col, bool closed, float thickness = 1.0f)  { AddPolyline(_Path.Data, _Path.Size, col, closed, thickness); PathClear(); }
    PathStroke(col, closed, thickness = 1.0) { this.native.PathStroke(col, closed, thickness); }
    // IMGUI_API void  PathArcTo(const ImVec2& centre, float radius, float a_min, float a_max, int num_segments = 10);
    PathArcTo(centre, radius, a_min, a_max, num_segments = 10) { this.native.PathArcTo(centre, radius, a_min, a_max, num_segments); }
    // IMGUI_API void  PathArcToFast(const ImVec2& centre, float radius, int a_min_of_12, int a_max_of_12);                                // Use precomputed angles for a 12 steps circle
    PathArcToFast(centre, radius, a_min_of_12, a_max_of_12) { this.native.PathArcToFast(centre, radius, a_min_of_12, a_max_of_12); }
    // IMGUI_API void  PathBezierCurveTo(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, int num_segments = 0);
    PathBezierCurveTo(p1, p2, p3, num_segments = 0) { this.native.PathBezierCurveTo(p1, p2, p3, num_segments); }
    // IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);
    PathRect(rect_min, rect_max, rounding = 0.0, rounding_corners_flags = ImDrawCornerFlags.All) { this.native.PathRect(rect_min, rect_max, rounding, rounding_corners_flags); }
    // Channels
    // - Use to simulate layers. By switching channels to can render out-of-order (e.g. submit foreground primitives before background primitives)
    // - Use to minimize draw calls (e.g. if going back-and-forth between multiple non-overlapping clipping rectangles, prefer to append into separate channels then merge at the end)
    // IMGUI_API void  ChannelsSplit(int channels_count);
    ChannelsSplit(channels_count) { this.native.ChannelsSplit(channels_count); }
    // IMGUI_API void  ChannelsMerge();
    ChannelsMerge() { this.native.ChannelsMerge(); }
    // IMGUI_API void  ChannelsSetCurrent(int channel_index);
    ChannelsSetCurrent(channel_index) { this.native.ChannelsSetCurrent(channel_index); }
}
exports.ImDrawList = ImDrawList;
// All draw data to render an ImGui frame
class ImDrawData {
    constructor(native) {
        this.native = native;
    }
    IterateDrawLists(callback) {
        this.native.IterateDrawLists((draw_list) => {
            callback(new ImDrawList(draw_list));
        });
    }
    // bool            Valid;                  // Only valid after Render() is called and before the next NewFrame() is called.
    get Valid() { return this.native.Valid; }
    // ImDrawList**    CmdLists;
    // int             CmdListsCount;
    get CmdListsCount() { return this.native.CmdListsCount; }
    // int             TotalVtxCount;          // For convenience, sum of all cmd_lists vtx_buffer.Size
    get TotalVtxCount() { return this.native.TotalVtxCount; }
    // int             TotalIdxCount;          // For convenience, sum of all cmd_lists idx_buffer.Size
    get TotalIdxCount() { return this.native.TotalIdxCount; }
    // Functions
    // ImDrawData() { Valid = false; CmdLists = NULL; CmdListsCount = TotalVtxCount = TotalIdxCount = 0; }
    // IMGUI_API void DeIndexAllBuffers();               // For backward compatibility or convenience: convert all buffers from indexed to de-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    ScaleClipRects(sc) {
        this.native.ScaleClipRects(sc);
    }
}
exports.ImDrawData = ImDrawData;
class ImFontConfig {
}
exports.ImFontConfig = ImFontConfig;
// struct ImFontGlyph
class ImFontGlyph {
}
exports.ImFontGlyph = ImFontGlyph;
var bind_imgui_9 = require("./bind-imgui");
exports.ImFontAtlasFlags = bind_imgui_9.ImFontAtlasFlags;
// Load and rasterize multiple TTF/OTF fonts into a same texture.
// Sharing a texture for multiple fonts allows us to reduce the number of draw calls during rendering.
// We also add custom graphic data into the texture that serves for ImGui.
//  1. (Optional) Call AddFont*** functions. If you don't call any, the default font will be loaded for you.
//  2. Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
//  3. Upload the pixels data into a texture within your graphics system.
//  4. Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture. This value will be passed back to you during rendering to identify the texture.
// IMPORTANT: If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the ImFont is build (when calling GetTextData*** or Build()). We only copy the pointer, not the data.
class ImFontAtlas {
    constructor(native) {
        this.native = native;
    }
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
    GetTexDataAsRGBA32() {
        return this.native.GetTexDataAsRGBA32();
    }
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
    get TexID() { return this.native.getTexID(); }
    set TexID(value) { this.native.setTexID(value); }
    // int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
    // int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1.
    // [Internal]
    // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
    // unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
    // unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
    // int                         TexWidth;           // Texture width calculated during Build().
    get TexWidth() { return this.native.TexWidth; }
    // int                         TexHeight;          // Texture height calculated during Build().
    get TexHeight() { return this.native.TexHeight; }
}
exports.ImFontAtlas = ImFontAtlas;
// Font runtime data and rendering
// ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
class ImFont {
    constructor(native) {
        this.native = native;
    }
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
    GetDebugName() { return this.native.GetDebugName(); }
}
exports.ImFont = ImFont;
// a script version of bind.ImGuiStyle with matching interface
class script_ImGuiStyle {
    constructor() {
        this.Alpha = 1.0;
        this.WindowPadding = new ImVec2(8, 8);
        this.WindowRounding = 7.0;
        this.WindowBorderSize = 0.0;
        this.WindowMinSize = new ImVec2(32, 32);
        this.WindowTitleAlign = new ImVec2(0.0, 0.5);
        this.ChildRounding = 0.0;
        this.ChildBorderSize = 1.0;
        this.PopupRounding = 0.0;
        this.PopupBorderSize = 1.0;
        this.FramePadding = new ImVec2(4, 3);
        this.FrameRounding = 0.0;
        this.FrameBorderSize = 0.0;
        this.ItemSpacing = new ImVec2(8, 4);
        this.ItemInnerSpacing = new ImVec2(4, 4);
        this.TouchExtraPadding = new ImVec2(0, 0);
        this.IndentSpacing = 21.0;
        this.ColumnsMinSpacing = 6.0;
        this.ScrollbarSize = 16.0;
        this.ScrollbarRounding = 9.0;
        this.GrabMinSize = 10.0;
        this.GrabRounding = 0.0;
        this.ButtonTextAlign = new ImVec2(0.5, 0.5);
        this.DisplayWindowPadding = new ImVec2(22, 22);
        this.DisplaySafeAreaPadding = new ImVec2(4, 4);
        this.MouseCursorScale = 1;
        this.AntiAliasedLines = true;
        this.AntiAliasedFill = true;
        this.CurveTessellationTol = 1.25;
        this.Colors = [];
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
    getWindowPadding() { return this.WindowPadding; }
    getWindowMinSize() { return this.WindowMinSize; }
    getWindowTitleAlign() { return this.WindowTitleAlign; }
    getFramePadding() { return this.FramePadding; }
    getItemSpacing() { return this.ItemSpacing; }
    getItemInnerSpacing() { return this.ItemInnerSpacing; }
    getTouchExtraPadding() { return this.TouchExtraPadding; }
    getButtonTextAlign() { return this.ButtonTextAlign; }
    getDisplayWindowPadding() { return this.DisplayWindowPadding; }
    getDisplaySafeAreaPadding() { return this.DisplaySafeAreaPadding; }
    getColorsAt(index) { return this.Colors[index]; }
    setColorsAt(index, color) { this.Colors[index].Copy(color); return true; }
    ScaleAllSizes(scale_factor) {
        const _this = new ImGuiStyle(this);
        const native = new bind.ImGuiStyle();
        const _that = new ImGuiStyle(native);
        _that.Copy(_this);
        native.ScaleAllSizes(scale_factor);
        _this.Copy(_that);
        native.delete();
    }
}
class ImGuiStyle {
    constructor(internal = new script_ImGuiStyle()) {
        this.internal = internal;
        this.Colors = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return ImGuiCol.COUNT;
                }
                return this.internal.getColorsAt(Number(key));
            },
            set: (target, key, value) => {
                return this.internal.setColorsAt(Number(key), value);
            }
        });
    }
    get Alpha() { return this.internal.Alpha; }
    set Alpha(value) { this.internal.Alpha = value; }
    get WindowPadding() { return this.internal.getWindowPadding(); }
    get WindowRounding() { return this.internal.WindowRounding; }
    set WindowRounding(value) { this.internal.WindowRounding = value; }
    get WindowBorderSize() { return this.internal.WindowBorderSize; }
    set WindowBorderSize(value) { this.internal.WindowBorderSize = value; }
    get WindowMinSize() { return this.internal.getWindowMinSize(); }
    get WindowTitleAlign() { return this.internal.getWindowTitleAlign(); }
    get ChildRounding() { return this.internal.ChildRounding; }
    set ChildRounding(value) { this.internal.ChildRounding = value; }
    get ChildBorderSize() { return this.internal.ChildBorderSize; }
    set ChildBorderSize(value) { this.internal.ChildBorderSize = value; }
    get PopupRounding() { return this.internal.PopupRounding; }
    set PopupRounding(value) { this.internal.PopupRounding = value; }
    get PopupBorderSize() { return this.internal.PopupBorderSize; }
    set PopupBorderSize(value) { this.internal.PopupBorderSize = value; }
    get FramePadding() { return this.internal.getFramePadding(); }
    get FrameRounding() { return this.internal.FrameRounding; }
    set FrameRounding(value) { this.internal.FrameRounding = value; }
    get FrameBorderSize() { return this.internal.FrameBorderSize; }
    set FrameBorderSize(value) { this.internal.FrameBorderSize = value; }
    get ItemSpacing() { return this.internal.getItemSpacing(); }
    get ItemInnerSpacing() { return this.internal.getItemInnerSpacing(); }
    get TouchExtraPadding() { return this.internal.getTouchExtraPadding(); }
    get IndentSpacing() { return this.internal.IndentSpacing; }
    set IndentSpacing(value) { this.internal.IndentSpacing = value; }
    get ColumnsMinSpacing() { return this.internal.ColumnsMinSpacing; }
    set ColumnsMinSpacing(value) { this.internal.ColumnsMinSpacing = value; }
    get ScrollbarSize() { return this.internal.ScrollbarSize; }
    set ScrollbarSize(value) { this.internal.ScrollbarSize = value; }
    get ScrollbarRounding() { return this.internal.ScrollbarRounding; }
    set ScrollbarRounding(value) { this.internal.ScrollbarRounding = value; }
    get GrabMinSize() { return this.internal.GrabMinSize; }
    set GrabMinSize(value) { this.internal.GrabMinSize = value; }
    get GrabRounding() { return this.internal.GrabRounding; }
    set GrabRounding(value) { this.internal.GrabRounding = value; }
    get ButtonTextAlign() { return this.internal.getButtonTextAlign(); }
    get DisplayWindowPadding() { return this.internal.getDisplayWindowPadding(); }
    get DisplaySafeAreaPadding() { return this.internal.getDisplaySafeAreaPadding(); }
    get MouseCursorScale() { return this.internal.MouseCursorScale; }
    set MouseCursorScale(value) { this.internal.MouseCursorScale = value; }
    get AntiAliasedLines() { return this.internal.AntiAliasedLines; }
    set AntiAliasedLines(value) { this.internal.AntiAliasedLines = value; }
    get AntiAliasedFill() { return this.internal.AntiAliasedFill; }
    set AntiAliasedFill(value) { this.internal.AntiAliasedFill = value; }
    get CurveTessellationTol() { return this.internal.CurveTessellationTol; }
    set CurveTessellationTol(value) { this.internal.CurveTessellationTol = value; }
    Copy(other) {
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
    ScaleAllSizes(scale_factor) { this.internal.ScaleAllSizes(scale_factor); }
}
exports.ImGuiStyle = ImGuiStyle;
// This is where your app communicate with ImGui. Access via ImGui::GetIO().
// Read 'Programmer guide' section in .cpp file for general usage.
class ImGuiIO {
    constructor(native) {
        this.native = native;
        // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
        // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
        // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
        // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
        this.KeyMap = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return ImGuiKey.COUNT;
                }
                return this.native.getKeyMapAt(Number(key));
            },
            set: (target, key, value) => {
                return this.native.setKeyMapAt(Number(key), value);
            }
        });
        // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
        this.MouseDown = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return 5;
                }
                return this.native.getMouseDownAt(Number(key));
            },
            set: (target, key, value) => {
                return this.native.setMouseDownAt(Number(key), value);
            }
        });
        // bool        KeysDown[512];              // Keyboard keys that are pressed (in whatever storage order you naturally have access to keyboard data)
        this.KeysDown = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return 512;
                }
                return this.native.getKeysDownAt(Number(key));
            },
            set: (target, key, value) => {
                return this.native.setKeysDownAt(Number(key), value);
            }
        });
        // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
        // float       NavInputs[ImGuiNavInput_COUNT]; // Gamepad inputs (keyboard keys will be auto-mapped and be written here by ImGui::NewFrame)
        this.NavInputs = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return ImGuiNavInput.COUNT;
                }
                return this.native.getNavInputsAt(Number(key));
            },
            set: (target, key, value) => {
                return this.native.setNavInputsAt(Number(key), value);
            }
        });
        //------------------------------------------------------------------
        // [Internal] ImGui will maintain those fields. Forward compatibility not guaranteed!
        //------------------------------------------------------------------
        // ImVec2      MousePosPrev;               // Previous mouse position temporary storage (nb: not for public use, set to MousePos in NewFrame())
        // ImVec2      MouseClickedPos[5];         // Position at time of clicking
        // public getMouseClickedPosAt(index: number): Readonly<reference_ImVec2>;
        this.MouseClickedPos = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return 5;
                }
                return this.native.getMouseClickedPosAt(Number(key));
            }
        });
        // float       MouseClickedTime[5];        // Time of last click (used to figure out double-click)
        // bool        MouseClicked[5];            // Mouse button went from !Down to Down
        // bool        MouseDoubleClicked[5];      // Has mouse button been double-clicked?
        // bool        MouseReleased[5];           // Mouse button went from Down to !Down
        // bool        MouseDownOwned[5];          // Track if button was clicked inside a window. We don't request mouse capture from the application if click started outside ImGui bounds.
        // float       MouseDownDuration[5];       // Duration the mouse button has been down (0.0f == just clicked)
        this.MouseDownDuration = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return 5;
                }
                return this.native.getMouseDownDurationAt(Number(key));
            }
        });
        // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
        // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
        // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
        // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
        this.KeysDownDuration = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return 512;
                }
                return this.native.getKeysDownDurationAt(Number(key));
            }
        });
        // float       KeysDownDurationPrev[512];  // Previous duration the key has been down
        // float       NavInputsDownDuration[ImGuiNavInput_COUNT];
        this.NavInputsDownDuration = new Proxy([], {
            get: (target, key) => {
                if (key === "length") {
                    return ImGuiNavInput.COUNT;
                }
                return this.native.getNavInputsDownDurationAt(Number(key));
            }
        });
    }
    //------------------------------------------------------------------
    // Settings (fill once)                 // Default value:
    //------------------------------------------------------------------
    // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
    get DisplaySize() { return this.native.getDisplaySize(); }
    // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
    get DeltaTime() { return this.native.DeltaTime; }
    set DeltaTime(value) { this.native.DeltaTime = value; }
    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
    // ImGuiNavFlags NavFlags;                 // = 0                  // See ImGuiNavFlags_. Gamepad/keyboard navigation options.
    get NavFlags() { return this.native.NavFlags; }
    set NavFlags(value) { this.native.NavFlags = value; }
    // float         KeyRepeatDelay;           // = 0.250f             // When holding a key/button, time before it starts repeating, in seconds (for buttons in Repeat mode, etc.).
    // float         KeyRepeatRate;            // = 0.050f             // When holding a key/button, rate at which it repeats, in seconds.
    // void*         UserData;                 // = NULL               // Store your own data for retrieval by callbacks.
    // ImFontAtlas*  Fonts;                    // <auto>               // Load and assemble one or more fonts into a single tightly packed texture. Output to Fonts array.
    get Fonts() { return new ImFontAtlas(this.native.getFonts()); }
    // float         FontGlobalScale;          // = 1.0f               // Global scale all fonts
    get FontGlobalScale() { return this.native.FontGlobalScale; }
    set FontGlobalScale(value) { this.native.FontGlobalScale = value; }
    // bool          FontAllowUserScaling;     // = false              // Allow user scaling text of individual window with CTRL+Wheel.
    get FontAllowUserScaling() { return false; }
    // ImFont*       FontDefault;              // = NULL               // Font to use on NewFrame(). Use NULL to uses Fonts->Fonts[0].
    // ImVec2        DisplayFramebufferScale;  // = (1.0f,1.0f)        // For retina display or other situations where window coordinates are different from framebuffer coordinates. User storage only, presently not used by ImGui.
    get DisplayFramebufferScale() { return this.native.getDisplayFramebufferScale(); }
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
    get RenderDrawListsFn() { return ImGuiIO.RenderDrawListsFn; }
    set RenderDrawListsFn(value) { ImGuiIO.RenderDrawListsFn = value; }
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
    get MousePos() { return this.native.getMousePos(); }
    // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
    get MouseWheel() { return this.native.MouseWheel; }
    set MouseWheel(value) { this.native.MouseWheel = value; }
    // float       MouseWheelH;                    // Mouse wheel (Horizontal). Most users don't have a mouse with an horizontal wheel, may not be filled by all back ends.
    get MouseWheelH() { return this.native.MouseWheelH; }
    set MouseWheelH(value) { this.native.MouseWheelH = value; }
    // bool        MouseDrawCursor;            // Request ImGui to draw a mouse cursor for you (if you are on a platform without a mouse cursor).
    get MouseDrawCursor() { return this.native.MouseDrawCursor; }
    set MouseDrawCursor(value) { this.native.MouseDrawCursor = value; }
    // bool        KeyCtrl;                    // Keyboard modifier pressed: Control
    get KeyCtrl() { return this.native.KeyCtrl; }
    set KeyCtrl(value) { this.native.KeyCtrl = value; }
    // bool        KeyShift;                   // Keyboard modifier pressed: Shift
    get KeyShift() { return this.native.KeyShift; }
    set KeyShift(value) { this.native.KeyShift = value; }
    // bool        KeyAlt;                     // Keyboard modifier pressed: Alt
    get KeyAlt() { return this.native.KeyAlt; }
    set KeyAlt(value) { this.native.KeyAlt = value; }
    // bool        KeySuper;                   // Keyboard modifier pressed: Cmd/Super/Windows
    get KeySuper() { return this.native.KeySuper; }
    set KeySuper(value) { this.native.KeySuper = value; }
    // Functions
    // IMGUI_API void AddInputCharacter(ImWchar c);                        // Add new character into InputCharacters[]
    AddInputCharacter(c) { this.native.AddInputCharacter(c); }
    // IMGUI_API void AddInputCharactersUTF8(const char* utf8_chars);      // Add new characters into InputCharacters[] from an UTF-8 string
    // inline void    ClearInputCharacters() { InputCharacters[0] = 0; }   // Clear the text input buffer manually
    //------------------------------------------------------------------
    // Output - Retrieve after calling NewFrame()
    //------------------------------------------------------------------
    // bool        WantCaptureMouse;           // When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application. This is set by ImGui when it wants to use your mouse (e.g. unclicked mouse is hovering a window, or a widget is active).
    get WantCaptureMouse() { return this.native.WantCaptureMouse; }
    set WantCaptureMouse(value) { this.native.WantCaptureMouse = value; }
    // bool        WantCaptureKeyboard;        // When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application. This is set by ImGui when it wants to use your keyboard inputs.
    get WantCaptureKeyboard() { return this.native.WantCaptureKeyboard; }
    set WantCaptureKeyboard(value) { this.native.WantCaptureKeyboard = value; }
    // bool        WantTextInput;              // Mobile/console: when io.WantTextInput is true, you may display an on-screen keyboard. This is set by ImGui when it wants textual keyboard input to happen (e.g. when a InputText widget is active).
    get WantTextInput() { return this.native.WantTextInput; }
    set WantTextInput(value) { this.native.WantTextInput = value; }
    // bool        WantMoveMouse;              // [BETA-NAV] MousePos has been altered, back-end should reposition mouse on next frame. Set only when 'NavMovesMouse=true'.
    get WantMoveMouse() { return this.native.WantMoveMouse; }
    set WantMoveMouse(value) { this.native.WantMoveMouse = value; }
    // bool        NavActive;                  // Directional navigation is currently allowed (will handle ImGuiKey_NavXXX events) = a window is focused and it doesn't use the ImGuiWindowFlags_NoNavInputs flag.
    get NavActive() { return this.native.NavActive; }
    set NavActive(value) { this.native.NavActive = value; }
    // bool        NavVisible;                 // Directional navigation is visible and allowed (will handle ImGuiKey_NavXXX events).
    get NavVisible() { return this.native.NavVisible; }
    set NavVisible(value) { this.native.NavVisible = value; }
    // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
    get Framerate() { return this.native.Framerate; }
    // int         MetricsAllocs;              // Number of active memory allocations
    // int         MetricsRenderVertices;      // Vertices output during last call to Render()
    // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
    // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
    // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
    get MouseDelta() { return this.native.getMouseDelta(); }
}
exports.ImGuiIO = ImGuiIO;
// Context creation and access, if you want to use multiple context, share context between modules (e.g. DLL). 
// All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
// All those functions are not reliant on the current context.
// IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
function CreateContext(shared_font_atlas = null) {
    return bind.CreateContext();
}
exports.CreateContext = CreateContext;
// IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);   // NULL = Destroy current context
function DestroyContext(ctx = null) {
    return bind.DestroyContext(ctx);
}
exports.DestroyContext = DestroyContext;
// IMGUI_API ImGuiContext* GetCurrentContext();
var bind_imgui_10 = require("./bind-imgui");
exports.GetCurrentContext = bind_imgui_10.GetCurrentContext;
// IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
var bind_imgui_11 = require("./bind-imgui");
exports.SetCurrentContext = bind_imgui_11.SetCurrentContext;
// Main
// IMGUI_API ImGuiIO&      GetIO();
function GetIO() { return new ImGuiIO(bind.GetIO()); }
exports.GetIO = GetIO;
// IMGUI_API ImGuiStyle&   GetStyle();
function GetStyle() { return new ImGuiStyle(bind.GetStyle()); }
exports.GetStyle = GetStyle;
// IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
function GetDrawData() {
    const draw_data = bind.GetDrawData();
    return (draw_data === null) ? null : new ImDrawData(draw_data);
}
exports.GetDrawData = GetDrawData;
// IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
function NewFrame() { bind.NewFrame(); }
exports.NewFrame = NewFrame;
// IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
function Render() {
    bind.Render();
    const io = GetIO();
    if (io.RenderDrawListsFn) {
        const draw_data = bind.GetDrawData();
        if (draw_data) {
            io.RenderDrawListsFn(new ImDrawData(draw_data));
        }
    }
}
exports.Render = Render;
// IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
function EndFrame() { bind.EndFrame(); }
exports.EndFrame = EndFrame;
// Demo, Debug, Informations
// IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
function ShowDemoWindow(p_open = null) { bind.ShowDemoWindow(p_open); }
exports.ShowDemoWindow = ShowDemoWindow;
// IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
function ShowMetricsWindow(p_open = null) {
    if (p_open === null) {
        bind.ShowMetricsWindow(null);
    }
    else if (Array.isArray(p_open)) {
        bind.ShowMetricsWindow(p_open);
    }
    else {
        const ref_open = [p_open()];
        const ret = bind.ShowMetricsWindow(ref_open);
        p_open(ref_open[0]);
        return ret;
    }
}
exports.ShowMetricsWindow = ShowMetricsWindow;
// IMGUI_API void          ShowStyleEditor(ImGuiStyle* ref = NULL);    // add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)
function ShowStyleEditor(ref = null) {
    if (ref === null) {
        bind.ShowStyleEditor(null);
    }
    else if (ref.internal instanceof bind.ImGuiStyle) {
        bind.ShowStyleEditor(ref.internal);
    }
    else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(ref);
        bind.ShowStyleEditor(native);
        ref.Copy(wrap);
        native.delete();
    }
}
exports.ShowStyleEditor = ShowStyleEditor;
// IMGUI_API bool          ShowStyleSelector(const char* label);
function ShowStyleSelector(label) { return bind.ShowStyleSelector(label); }
exports.ShowStyleSelector = ShowStyleSelector;
// IMGUI_API void          ShowFontSelector(const char* label);
function ShowFontSelector(label) { bind.ShowFontSelector(label); }
exports.ShowFontSelector = ShowFontSelector;
// IMGUI_API void          ShowUserGuide();                            // add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
function ShowUserGuide() { bind.ShowUserGuide(); }
exports.ShowUserGuide = ShowUserGuide;
// IMGUI_API const char*   GetVersion();
var bind_imgui_12 = require("./bind-imgui");
exports.GetVersion = bind_imgui_12.GetVersion;
// Styles
// IMGUI_API void          StyleColorsClassic(ImGuiStyle* dst = NULL);
function StyleColorsClassic(dst = null) {
    if (dst === null) {
        bind.StyleColorsClassic(null);
    }
    else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsClassic(dst.internal);
    }
    else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsClassic(native);
        dst.Copy(wrap);
        native.delete();
    }
}
exports.StyleColorsClassic = StyleColorsClassic;
// IMGUI_API void          StyleColorsDark(ImGuiStyle* dst = NULL);
function StyleColorsDark(dst = null) {
    if (dst === null) {
        bind.StyleColorsDark(null);
    }
    else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsDark(dst.internal);
    }
    else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsDark(native);
        dst.Copy(wrap);
        native.delete();
    }
}
exports.StyleColorsDark = StyleColorsDark;
// IMGUI_API void          StyleColorsLight(ImGuiStyle* dst = NULL);
function StyleColorsLight(dst = null) {
    if (dst === null) {
        bind.StyleColorsLight(null);
    }
    else if (dst.internal instanceof bind.ImGuiStyle) {
        bind.StyleColorsLight(dst.internal);
    }
    else {
        const native = new bind.ImGuiStyle();
        const wrap = new ImGuiStyle(native);
        wrap.Copy(dst);
        bind.StyleColorsLight(native);
        dst.Copy(wrap);
        native.delete();
    }
}
exports.StyleColorsLight = StyleColorsLight;
// Window
// IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
function Begin(name, open = null, flags = 0) {
    if (open === null) {
        return bind.Begin(name, null, flags);
    }
    else if (Array.isArray(open)) {
        return bind.Begin(name, open, flags);
    }
    else {
        const ref_open = [open()];
        const opened = bind.Begin(name, ref_open, flags);
        open(ref_open[0]);
        return opened;
    }
}
exports.Begin = Begin;
// IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
var bind_imgui_13 = require("./bind-imgui");
exports.End = bind_imgui_13.End;
// IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
// IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
function BeginChild(id, size = ImVec2.ZERO, border = false, extra_flags = 0) {
    return bind.BeginChild(id, size, border, extra_flags);
}
exports.BeginChild = BeginChild;
// IMGUI_API void          EndChild();
function EndChild() {
    bind.EndChild();
}
exports.EndChild = EndChild;
// IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
function GetContentRegionMax(out = new ImVec2()) {
    return bind.GetContentRegionMax(out);
}
exports.GetContentRegionMax = GetContentRegionMax;
// IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
function GetContentRegionAvail(out = new ImVec2()) {
    return bind.GetContentRegionAvail(out);
}
exports.GetContentRegionAvail = GetContentRegionAvail;
// IMGUI_API float         GetContentRegionAvailWidth();                                       //
var bind_imgui_14 = require("./bind-imgui");
exports.GetContentRegionAvailWidth = bind_imgui_14.GetContentRegionAvailWidth;
// IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
function GetWindowContentRegionMin(out = new ImVec2()) {
    return bind.GetWindowContentRegionMin(out);
}
exports.GetWindowContentRegionMin = GetWindowContentRegionMin;
// IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
function GetWindowContentRegionMax(out = new ImVec2()) {
    return bind.GetWindowContentRegionMax(out);
}
exports.GetWindowContentRegionMax = GetWindowContentRegionMax;
// IMGUI_API float         GetWindowContentRegionWidth();                                      //
var bind_imgui_15 = require("./bind-imgui");
exports.GetWindowContentRegionWidth = bind_imgui_15.GetWindowContentRegionWidth;
// IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
function GetWindowDrawList() {
    return new ImDrawList(bind.GetWindowDrawList());
}
exports.GetWindowDrawList = GetWindowDrawList;
// IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
function GetWindowPos(out = new ImVec2()) {
    return bind.GetWindowPos(out);
}
exports.GetWindowPos = GetWindowPos;
// IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
function GetWindowSize(out = new ImVec2()) {
    return bind.GetWindowSize(out);
}
exports.GetWindowSize = GetWindowSize;
// IMGUI_API float         GetWindowWidth();
var bind_imgui_16 = require("./bind-imgui");
exports.GetWindowWidth = bind_imgui_16.GetWindowWidth;
// IMGUI_API float         GetWindowHeight();
var bind_imgui_17 = require("./bind-imgui");
exports.GetWindowHeight = bind_imgui_17.GetWindowHeight;
// IMGUI_API bool          IsWindowCollapsed();
var bind_imgui_18 = require("./bind-imgui");
exports.IsWindowCollapsed = bind_imgui_18.IsWindowCollapsed;
// IMGUI_API bool          IsWindowAppearing();
var bind_imgui_19 = require("./bind-imgui");
exports.IsWindowAppearing = bind_imgui_19.IsWindowAppearing;
// IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
var bind_imgui_20 = require("./bind-imgui");
exports.SetWindowFontScale = bind_imgui_20.SetWindowFontScale;
// IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
function SetNextWindowPos(pos, cond = 0, pivot = ImVec2.ZERO) {
    bind.SetNextWindowPos(pos, cond, pivot);
}
exports.SetNextWindowPos = SetNextWindowPos;
// IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
function SetNextWindowSize(pos, cond = 0) {
    bind.SetNextWindowSize(pos, cond);
}
exports.SetNextWindowSize = SetNextWindowSize;
// IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
function SetNextWindowSizeConstraints(size_min, size_max, custom_callback = null, custom_callback_data = null) {
    if (custom_callback) {
        function _custom_callback(data) {
            const _data = new ImGuiSizeCallbackData(data);
            custom_callback ? custom_callback(_data) : 0;
            _data.delete();
        }
        bind.SetNextWindowSizeConstraints(size_min, size_max, _custom_callback, custom_callback_data);
    }
    else {
        bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
    }
}
exports.SetNextWindowSizeConstraints = SetNextWindowSizeConstraints;
// IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
function SetNextWindowContentSize(size) {
    bind.SetNextWindowContentSize(size);
}
exports.SetNextWindowContentSize = SetNextWindowContentSize;
// IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
function SetNextWindowCollapsed(collapsed, cond = 0) {
    bind.SetNextWindowCollapsed(collapsed, cond);
}
exports.SetNextWindowCollapsed = SetNextWindowCollapsed;
// IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
var bind_imgui_21 = require("./bind-imgui");
exports.SetNextWindowFocus = bind_imgui_21.SetNextWindowFocus;
// IMGUI_API void          SetNextWindowBgAlpha(float alpha);                                  // set next window background color alpha. helper to easily modify ImGuiCol_WindowBg/ChildBg/PopupBg.
var bind_imgui_22 = require("./bind-imgui");
exports.SetNextWindowBgAlpha = bind_imgui_22.SetNextWindowBgAlpha;
// IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
// IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.
// IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
// IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
// IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
// IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
// IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
// IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
function SetWindowPos(name_or_pos, pos_or_cond = 0, cond = 0) {
    if (typeof (name_or_pos) === "string") {
        bind.SetWindowNamePos(name_or_pos, pos_or_cond, cond);
        return;
    }
    else {
        bind.SetWindowPos(name_or_pos, pos_or_cond);
    }
}
exports.SetWindowPos = SetWindowPos;
function SetWindowSize(name_or_size, size_or_cond = 0, cond = 0) {
    if (typeof (name_or_size) === "string") {
        bind.SetWindowNamePos(name_or_size, size_or_cond, cond);
    }
    else {
        bind.SetWindowSize(name_or_size, size_or_cond);
    }
}
exports.SetWindowSize = SetWindowSize;
function SetWindowCollapsed(name_or_collapsed, collapsed_or_cond = 0, cond = 0) {
    if (typeof (name_or_collapsed) === "string") {
        bind.SetWindowNameCollapsed(name_or_collapsed, collapsed_or_cond, cond);
    }
    else {
        bind.SetWindowCollapsed(name_or_collapsed, collapsed_or_cond);
    }
}
exports.SetWindowCollapsed = SetWindowCollapsed;
function SetWindowFocus(name) {
    if (typeof (name) === "string") {
        bind.SetWindowNameFocus(name);
    }
    else {
        bind.SetWindowFocus();
    }
}
exports.SetWindowFocus = SetWindowFocus;
// IMGUI_API float         GetScrollX();                                                       // get scrolling amount [0..GetScrollMaxX()]
var bind_imgui_23 = require("./bind-imgui");
exports.GetScrollX = bind_imgui_23.GetScrollX;
// IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
var bind_imgui_24 = require("./bind-imgui");
exports.GetScrollY = bind_imgui_24.GetScrollY;
// IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
var bind_imgui_25 = require("./bind-imgui");
exports.GetScrollMaxX = bind_imgui_25.GetScrollMaxX;
// IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
var bind_imgui_26 = require("./bind-imgui");
exports.GetScrollMaxY = bind_imgui_26.GetScrollMaxY;
// IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
var bind_imgui_27 = require("./bind-imgui");
exports.SetScrollX = bind_imgui_27.SetScrollX;
// IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
var bind_imgui_28 = require("./bind-imgui");
exports.SetScrollY = bind_imgui_28.SetScrollY;
// IMGUI_API void          SetScrollHere(float center_y_ratio = 0.5f);                         // adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.
function SetScrollHere(center_y_ratio = 0.5) {
    bind.SetScrollHere(center_y_ratio);
}
exports.SetScrollHere = SetScrollHere;
// IMGUI_API void          SetScrollFromPosY(float pos_y, float center_y_ratio = 0.5f);        // adjust scrolling amount to make given position valid. use GetCursorPos() or GetCursorStartPos()+offset to get valid positions.
function SetScrollFromPosY(pos_y, center_y_ratio = 0.5) {
    bind.SetScrollFromPosY(pos_y, center_y_ratio);
}
exports.SetScrollFromPosY = SetScrollFromPosY;
// IMGUI_API void          SetStateStorage(ImGuiStorage* tree);                                // replace tree state storage with our own (if you want to manipulate it yourself, typically clear subsection of it)
// IMGUI_API ImGuiStorage* GetStateStorage();
// Parameters stacks (shared)
// IMGUI_API void          PushFont(ImFont* font);                                             // use NULL as a shortcut to push default font
function PushFont(font) { }
exports.PushFont = PushFont;
// IMGUI_API void          PopFont();
function PopFont() { }
exports.PopFont = PopFont;
// IMGUI_API void          PushStyleColor(ImGuiCol idx, ImU32 col);
// IMGUI_API void          PushStyleColor(ImGuiCol idx, const ImVec4& col);
function PushStyleColor(idx, col) {
    if (col instanceof ImColor) {
        bind.PushStyleColor(idx, col.Value);
    }
    else {
        bind.PushStyleColor(idx, col);
    }
}
exports.PushStyleColor = PushStyleColor;
// IMGUI_API void          PopStyleColor(int count = 1);
function PopStyleColor(count = 1) {
    bind.PopStyleColor(count);
}
exports.PopStyleColor = PopStyleColor;
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
function PushStyleVar(idx, val) {
    bind.PushStyleVar(idx, val);
}
exports.PushStyleVar = PushStyleVar;
// IMGUI_API void          PopStyleVar(int count = 1);
function PopStyleVar(count = 1) {
    bind.PopStyleVar(count);
}
exports.PopStyleVar = PopStyleVar;
// IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
function GetStyleColorVec4(idx) {
    return bind.GetStyleColorVec4(idx);
}
exports.GetStyleColorVec4 = GetStyleColorVec4;
// IMGUI_API ImFont*       GetFont();                                                          // get current font
function GetFont() {
    return new ImFont(bind.GetFont());
}
exports.GetFont = GetFont;
// IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
var bind_imgui_29 = require("./bind-imgui");
exports.GetFontSize = bind_imgui_29.GetFontSize;
// IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
function GetFontTexUvWhitePixel(out = new ImVec2()) {
    return bind.GetFontTexUvWhitePixel(out);
}
exports.GetFontTexUvWhitePixel = GetFontTexUvWhitePixel;
// IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);                  // retrieve given style color with style alpha applied and optional extra alpha multiplier
// IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                     // retrieve given color with style alpha applied
// IMGUI_API ImU32         GetColorU32(ImU32 col);                                             // retrieve given color with style alpha applied
function GetColorU32(idx, alpha_mul = 1.0) {
    return bind.GetColorU32(idx, alpha_mul);
}
exports.GetColorU32 = GetColorU32;
// Parameters stacks (current window)
// IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
var bind_imgui_30 = require("./bind-imgui");
exports.PushItemWidth = bind_imgui_30.PushItemWidth;
// IMGUI_API void          PopItemWidth();
var bind_imgui_31 = require("./bind-imgui");
exports.PopItemWidth = bind_imgui_31.PopItemWidth;
// IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
var bind_imgui_32 = require("./bind-imgui");
exports.CalcItemWidth = bind_imgui_32.CalcItemWidth;
// IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
function PushTextWrapPos(wrap_pos_x = 0.0) {
    bind.PushTextWrapPos(wrap_pos_x);
}
exports.PushTextWrapPos = PushTextWrapPos;
// IMGUI_API void          PopTextWrapPos();
var bind_imgui_33 = require("./bind-imgui");
exports.PopTextWrapPos = bind_imgui_33.PopTextWrapPos;
// IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
var bind_imgui_34 = require("./bind-imgui");
exports.PushAllowKeyboardFocus = bind_imgui_34.PushAllowKeyboardFocus;
// IMGUI_API void          PopAllowKeyboardFocus();
var bind_imgui_35 = require("./bind-imgui");
exports.PopAllowKeyboardFocus = bind_imgui_35.PopAllowKeyboardFocus;
// IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
var bind_imgui_36 = require("./bind-imgui");
exports.PushButtonRepeat = bind_imgui_36.PushButtonRepeat;
// IMGUI_API void          PopButtonRepeat();
var bind_imgui_37 = require("./bind-imgui");
exports.PopButtonRepeat = bind_imgui_37.PopButtonRepeat;
// Cursor / Layout
// IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
var bind_imgui_38 = require("./bind-imgui");
exports.Separator = bind_imgui_38.Separator;
// IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
function SameLine(pos_x = 0.0, spacing_w = -1.0) {
    bind.SameLine(pos_x, spacing_w);
}
exports.SameLine = SameLine;
// IMGUI_API void          NewLine();                                                          // undo a SameLine()
var bind_imgui_39 = require("./bind-imgui");
exports.NewLine = bind_imgui_39.NewLine;
// IMGUI_API void          Spacing();                                                          // add vertical spacing
var bind_imgui_40 = require("./bind-imgui");
exports.Spacing = bind_imgui_40.Spacing;
// IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
function Dummy(size) { bind.Dummy(size); }
exports.Dummy = Dummy;
// IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
function Indent(indent_w = 0.0) { bind.Indent(indent_w); }
exports.Indent = Indent;
// IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
function Unindent(indent_w = 0.0) { bind.Unindent(indent_w); }
exports.Unindent = Unindent;
// IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
var bind_imgui_41 = require("./bind-imgui");
exports.BeginGroup = bind_imgui_41.BeginGroup;
// IMGUI_API void          EndGroup();
var bind_imgui_42 = require("./bind-imgui");
exports.EndGroup = bind_imgui_42.EndGroup;
// IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
function GetCursorPos(out = new ImVec2()) { return bind.GetCursorPos(out); }
exports.GetCursorPos = GetCursorPos;
// IMGUI_API float         GetCursorPosX();                                                    // "
var bind_imgui_43 = require("./bind-imgui");
exports.GetCursorPosX = bind_imgui_43.GetCursorPosX;
// IMGUI_API float         GetCursorPosY();                                                    // "
var bind_imgui_44 = require("./bind-imgui");
exports.GetCursorPosY = bind_imgui_44.GetCursorPosY;
// IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
function SetCursorPos(local_pos) { bind.SetCursorPos(local_pos); }
exports.SetCursorPos = SetCursorPos;
// IMGUI_API void          SetCursorPosX(float x);                                             // "
var bind_imgui_45 = require("./bind-imgui");
exports.SetCursorPosX = bind_imgui_45.SetCursorPosX;
// IMGUI_API void          SetCursorPosY(float y);                                             // "
var bind_imgui_46 = require("./bind-imgui");
exports.SetCursorPosY = bind_imgui_46.SetCursorPosY;
// IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
function GetCursorStartPos(out = new ImVec2()) { return bind.GetCursorStartPos(out); }
exports.GetCursorStartPos = GetCursorStartPos;
// IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
function GetCursorScreenPos(out = new ImVec2()) { return bind.GetCursorScreenPos(out); }
exports.GetCursorScreenPos = GetCursorScreenPos;
// IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
function SetCursorScreenPos(pos) { bind.SetCursorScreenPos(pos); }
exports.SetCursorScreenPos = SetCursorScreenPos;
// IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
var bind_imgui_47 = require("./bind-imgui");
exports.AlignTextToFramePadding = bind_imgui_47.AlignTextToFramePadding;
// IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
var bind_imgui_48 = require("./bind-imgui");
exports.GetTextLineHeight = bind_imgui_48.GetTextLineHeight;
// IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
var bind_imgui_49 = require("./bind-imgui");
exports.GetTextLineHeightWithSpacing = bind_imgui_49.GetTextLineHeightWithSpacing;
// IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
var bind_imgui_50 = require("./bind-imgui");
exports.GetFrameHeight = bind_imgui_50.GetFrameHeight;
// IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
var bind_imgui_51 = require("./bind-imgui");
exports.GetFrameHeightWithSpacing = bind_imgui_51.GetFrameHeightWithSpacing;
// Columns
// You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
// IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
function Columns(count = 1, id = null, border = true) {
    id = id || "";
    bind.Columns(count, id, border);
}
exports.Columns = Columns;
// IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
var bind_imgui_52 = require("./bind-imgui");
exports.NextColumn = bind_imgui_52.NextColumn;
// IMGUI_API int           GetColumnIndex();                                                   // get current column index
var bind_imgui_53 = require("./bind-imgui");
exports.GetColumnIndex = bind_imgui_53.GetColumnIndex;
// IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
function GetColumnWidth(column_index = -1) {
    return bind.GetColumnWidth(column_index);
}
exports.GetColumnWidth = GetColumnWidth;
// IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
var bind_imgui_54 = require("./bind-imgui");
exports.SetColumnWidth = bind_imgui_54.SetColumnWidth;
// IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
function GetColumnOffset(column_index = -1) {
    return bind.GetColumnOffset(column_index);
}
exports.GetColumnOffset = GetColumnOffset;
// IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
var bind_imgui_55 = require("./bind-imgui");
exports.SetColumnOffset = bind_imgui_55.SetColumnOffset;
// IMGUI_API int           GetColumnsCount();
var bind_imgui_56 = require("./bind-imgui");
exports.GetColumnsCount = bind_imgui_56.GetColumnsCount;
// ID scopes
// If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
// You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
// IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
// IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API void          PushID(const void* ptr_id);
// IMGUI_API void          PushID(int int_id);
var bind_imgui_57 = require("./bind-imgui");
exports.PushID = bind_imgui_57.PushID;
// IMGUI_API void          PopID();
var bind_imgui_58 = require("./bind-imgui");
exports.PopID = bind_imgui_58.PopID;
// IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
// IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API ImGuiID       GetID(const void* ptr_id);
var bind_imgui_59 = require("./bind-imgui");
exports.GetID = bind_imgui_59.GetID;
// Widgets: Text
// IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
function TextUnformatted(text) { bind.TextUnformatted(text); }
exports.TextUnformatted = TextUnformatted;
// IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
// IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
function Text(fmt /*, ...args: any[]*/) { bind.Text(fmt /*, ...args*/); }
exports.Text = Text;
// IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
// IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
function TextColored(col, fmt /*, ...args: any[]*/) {
    bind.TextColored((col instanceof ImColor) ? col.Value : col, fmt /*, ...args*/);
}
exports.TextColored = TextColored;
// IMGUI_API void          TextDisabled(const char* fmt, ...)                             IM_FMTARGS(1); // shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();
// IMGUI_API void          TextDisabledV(const char* fmt, va_list args)                   IM_FMTLIST(1);
function TextDisabled(fmt /*, ...args: any[]*/) { bind.TextDisabled(fmt /*, ...args*/); }
exports.TextDisabled = TextDisabled;
// IMGUI_API void          TextWrapped(const char* fmt, ...)                              IM_FMTARGS(1); // shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().
// IMGUI_API void          TextWrappedV(const char* fmt, va_list args)                    IM_FMTLIST(1);
function TextWrapped(fmt /*, ...args: any[]*/) { bind.TextWrapped(fmt /*, ...args*/); }
exports.TextWrapped = TextWrapped;
// IMGUI_API void          LabelText(const char* label, const char* fmt, ...)             IM_FMTARGS(2); // display text+label aligned the same way as value+label widgets
// IMGUI_API void          LabelTextV(const char* label, const char* fmt, va_list args)   IM_FMTLIST(2);
function LabelText(label, fmt /*, ...args: any[]*/) { bind.LabelText(label, fmt /*, ...args*/); }
exports.LabelText = LabelText;
// IMGUI_API void          BulletText(const char* fmt, ...)                               IM_FMTARGS(1); // shortcut for Bullet()+Text()
// IMGUI_API void          BulletTextV(const char* fmt, va_list args)                     IM_FMTLIST(1);
function BulletText(fmt /*, ...args: any[]*/) { bind.BulletText(fmt /*, ...args*/); }
exports.BulletText = BulletText;
// IMGUI_API void          Bullet();                                                                     // draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
var bind_imgui_60 = require("./bind-imgui");
exports.Bullet = bind_imgui_60.Bullet;
// Widgets: Main
// IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
function Button(label, size = ImVec2.ZERO) {
    return bind.Button(label, size);
}
exports.Button = Button;
// IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
var bind_imgui_61 = require("./bind-imgui");
exports.SmallButton = bind_imgui_61.SmallButton;
// IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
function InvisibleButton(str_id, size) {
    return bind.InvisibleButton(str_id, size);
}
exports.InvisibleButton = InvisibleButton;
// IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
function Image(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, tint_col = ImVec4.WHITE, border_col = ImVec4.ZERO) {
    bind.Image(user_texture_id, size, uv0, uv1, tint_col, border_col);
}
exports.Image = Image;
// IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
function ImageButton(user_texture_id, size, uv0 = ImVec2.ZERO, uv1 = ImVec2.UNIT, frame_padding = -1, bg_col = ImVec4.ZERO, tint_col = ImVec4.WHITE) {
    return bind.ImageButton(user_texture_id, size, uv0, uv1, frame_padding, bg_col, tint_col);
}
exports.ImageButton = ImageButton;
// IMGUI_API bool          Checkbox(const char* label, bool* v);
function Checkbox(label, v) {
    if (Array.isArray(v)) {
        return bind.Checkbox(label, v);
    }
    else {
        const ref_v = [v()];
        const ret = bind.Checkbox(label, ref_v);
        v(ref_v[0]);
        return ret;
    }
}
exports.Checkbox = Checkbox;
// IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
function CheckboxFlags(label, flags, flags_value) {
    if (Array.isArray(flags)) {
        return bind.CheckboxFlags(label, flags, flags_value);
    }
    else {
        const ref_flags = [flags()];
        const ret = bind.CheckboxFlags(label, ref_flags, flags_value);
        flags(ref_flags[0]);
        return ret;
    }
}
exports.CheckboxFlags = CheckboxFlags;
// IMGUI_API bool          RadioButton(const char* label, bool active);
// IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);
function RadioButton(label, active_or_v, v_button) {
    if (typeof (active_or_v) === "boolean" || Array.isArray(active_or_v)) {
        return bind.RadioButton(label, active_or_v, v_button);
    }
    else {
        const ref_v = [active_or_v()];
        const ret = bind.RadioButton(label, ref_v, v_button);
        active_or_v(ref_v[0]);
        return ret;
    }
}
exports.RadioButton = RadioButton;
// IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
function PlotLines_Array(label, values, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO, stride = 1) {
    function values_getter(data, idx) {
        return values[idx];
    }
    PlotLines_Callback(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotLines_Array = PlotLines_Array;
// IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
function PlotLines_Callback(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
    bind.PlotLines(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotLines_Callback = PlotLines_Callback;
function PlotLines(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
    PlotLines_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotLines = PlotLines;
// IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
function PlotHistogram_Array(label, values, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO, stride = 1) {
    function values_getter(data, idx) {
        return values[idx];
    }
    PlotHistogram(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotHistogram_Array = PlotHistogram_Array;
// IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
function PlotHistogram_Callback(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
    bind.PlotHistogram(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotHistogram_Callback = PlotHistogram_Callback;
function PlotHistogram(label, values_getter, data, values_count = 0, value_offset = 0, overlay_text = null, scale_min = null, scale_max = null, graph_size = ImVec2.ZERO) {
    PlotHistogram_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
exports.PlotHistogram = PlotHistogram;
// IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
function ProgressBar(fraction, size_arg = new ImVec2(-1, 0), overlay = null) {
    bind.ProgressBar(fraction, size_arg, overlay);
}
exports.ProgressBar = ProgressBar;
// Widgets: Combo Box
// The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it.
// The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
// IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
function BeginCombo(label, preview_value, flags = 0) {
    return bind.BeginCombo(label, preview_value, flags);
}
exports.BeginCombo = BeginCombo;
// IMGUI_API void          EndCombo();
function EndCombo() { bind.EndCombo(); }
exports.EndCombo = EndCombo;
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
// IMGUI_API bool          Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);      // Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"
// IMGUI_API bool          Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
function CalcMaxPopupHeightFromItemCount(items_count) {
    // ImGuiContext& g = *GImGui;
    // const io: ImGuiIO = GetIO();
    const style = GetStyle();
    if (items_count <= 0)
        return Number.MAX_VALUE;
    // return (g.FontSize + g.Style.ItemSpacing.y) * items_count - g.Style.ItemSpacing.y + (g.Style.WindowPadding.y * 2);
    return (bind.GetFontSize() + style.ItemSpacing.y) * items_count - style.ItemSpacing.y + (style.WindowPadding.y * 2);
}
function Combo(label, current_item, items, items_count = items.length, popup_max_height_in_items = -1) {
    // return bind.Combo(label, current_item, items, items_count, popup_max_height_in_items);
    const _current_item = Array.isArray(current_item) ? current_item : [current_item()];
    if (typeof (items) === "string") {
        items = items.replace(/^\0+|\0+$/g, "").split("\0");
        items_count = items.length;
        // popup_max_height_in_items = items_count;
    }
    // const char* preview_text = NULL;
    let preview_text = "";
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
    if (popup_max_height_in_items != -1 /*&& !g.SetNextWindowSizeConstraint*/) {
        const popup_max_height = CalcMaxPopupHeightFromItemCount(popup_max_height_in_items);
        SetNextWindowSizeConstraints(ImVec2.ZERO, new ImVec2(Number.MAX_VALUE, popup_max_height));
    }
    if (!bind.BeginCombo(label, preview_text, 0))
        return false;
    // Display items
    // FIXME-OPT: Use clipper (but we need to disable it on the appearing frame to make sure our call to SetItemDefaultFocus() is processed)
    let value_changed = false;
    for (let i = 0; i < items_count; i++) {
        bind.PushID(i.toString());
        const item_selected = (i === _current_item[0]);
        // const char* item_text;
        const item_text = items[i];
        // if (!items_getter(data, i, &item_text))
        //     item_text = "*Unknown item*";
        if (Selectable(item_text, item_selected)) {
            value_changed = true;
            _current_item[0] = i;
        }
        if (item_selected)
            bind.SetItemDefaultFocus();
        bind.PopID();
    }
    EndCombo();
    if (!Array.isArray(current_item)) {
        current_item(_current_item[0]);
    }
    return value_changed;
}
exports.Combo = Combo;
function Combo_2(label, current_item, items, popup_max_height_in_items = -1) {
    return false;
}
exports.Combo_2 = Combo_2;
function Combo_3(label, current_item, items_getter, data, items_count, popup_max_height_in_items = -1) {
    return false;
}
exports.Combo_3 = Combo_3;
// export function Combo(label: string, current_item: bind.ImScalar<number>, ...args: any[]): boolean {
//     return false;
// }
// Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
// For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
// IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
function DragFloat(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
    if (Array.isArray(v)) {
        return bind.DragFloat(label, v, v_speed, v_min, v_max, display_format, power);
    }
    else {
        const ref_v = [v()];
        const ret = bind.DragFloat(label, ref_v, v_speed, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
exports.DragFloat = DragFloat;
// IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
function DragFloat2(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
    if (v instanceof ImVec2) {
        const _v = [v.x, v.y];
        const ret = bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    }
    else {
        return bind.DragFloat2(label, v, v_speed, v_min, v_max, display_format, power);
    }
}
exports.DragFloat2 = DragFloat2;
// IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
function DragFloat3(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
    return bind.DragFloat3(label, v, v_speed, v_min, v_max, display_format, power);
}
exports.DragFloat3 = DragFloat3;
// IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
function DragFloat4(label, v, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", power = 1.0) {
    if (v instanceof ImVec4) {
        const _v = [v.x, v.y, v.z, v.w];
        const ret = bind.DragFloat4(label, _v, v_speed, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        v.z = _v[2];
        v.w = _v[3];
        return ret;
    }
    else {
        return bind.DragFloat4(label, v, v_speed, v_min, v_max, display_format, power);
    }
}
exports.DragFloat4 = DragFloat4;
// IMGUI_API bool          DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", const char* display_format_max = NULL, float power = 1.0f);
function DragFloatRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0.0, v_max = 0.0, display_format = "%.3f", display_format_max = null, power = 1.0) {
    const ref_v_current_min = Array.isArray(v_current_min) ? v_current_min : [v_current_min()];
    const ref_v_current_max = Array.isArray(v_current_max) ? v_current_max : [v_current_max()];
    const ret = bind.DragFloatRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max, power);
    if (!Array.isArray(v_current_min)) {
        v_current_min(ref_v_current_min[0]);
    }
    if (!Array.isArray(v_current_max)) {
        v_current_max(ref_v_current_max[0]);
    }
    return ret;
}
exports.DragFloatRange2 = DragFloatRange2;
// IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");                                       // If v_min >= v_max we have no bound
function DragInt(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
    if (Array.isArray(v)) {
        return bind.DragInt(label, v, v_speed, v_min, v_max, display_format);
    }
    else {
        const ref_v = [v()];
        const ret = bind.DragInt(label, ref_v, v_speed, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
exports.DragInt = DragInt;
// IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
function DragInt2(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
    return bind.DragInt2(label, v, v_speed, v_min, v_max, display_format);
}
exports.DragInt2 = DragInt2;
// IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
function DragInt3(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
    return bind.DragInt3(label, v, v_speed, v_min, v_max, display_format);
}
exports.DragInt3 = DragInt3;
// IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
function DragInt4(label, v, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f") {
    return bind.DragInt4(label, v, v_speed, v_min, v_max, display_format);
}
exports.DragInt4 = DragInt4;
// IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
function DragIntRange2(label, v_current_min, v_current_max, v_speed = 1.0, v_min = 0, v_max = 0, display_format = "%.0f", display_format_max = null) {
    const ref_v_current_min = Array.isArray(v_current_min) ? v_current_min : [v_current_min()];
    const ref_v_current_max = Array.isArray(v_current_max) ? v_current_max : [v_current_max()];
    const ret = bind.DragIntRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max);
    if (!Array.isArray(v_current_min)) {
        v_current_min(ref_v_current_min[0]);
    }
    if (!Array.isArray(v_current_max)) {
        v_current_max(ref_v_current_max[0]);
    }
    return ret;
}
exports.DragIntRange2 = DragIntRange2;
// Widgets: Input with Keyboard
// IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
let InputText_user_data = null;
function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : exports.ImGuiTextEditDefaultSize, flags = 0, callback = null, user_data = null) {
    InputText_user_data = user_data;
    function _callback(data) {
        const _data = new ImGuiTextEditCallbackData(data, InputText_user_data);
        const ret = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputText(label, buf, buf_size, flags, callback === null ? null : _callback, null);
    }
    else if (buf instanceof ImStringBuffer) {
        const ref_buf = [buf.buffer];
        const _buf_size = Math.min(buf_size, buf.size);
        let ret = bind.InputText(label, ref_buf, _buf_size, flags, callback === null ? null : _callback, null);
        buf.buffer = ref_buf[0];
        return ret;
    }
    else {
        const ref_buf = [buf()];
        let ret = bind.InputText(label, ref_buf, buf_size, flags, callback === null ? null : _callback, null);
        buf(ref_buf[0]);
        return ret;
    }
}
exports.InputText = InputText;
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
let InputTextMultiline_user_data = null;
function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : exports.ImGuiTextEditDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
    InputTextMultiline_user_data = user_data;
    function _callback(data) {
        const _data = new ImGuiTextEditCallbackData(data, InputTextMultiline_user_data);
        const ret = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputTextMultiline(label, buf, buf_size, size, flags, callback === null ? null : _callback, null);
    }
    else if (buf instanceof ImStringBuffer) {
        const ref_buf = [buf.buffer];
        const _buf_size = Math.min(buf_size, buf.size);
        let ret = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, callback === null ? null : _callback, null);
        buf.buffer = ref_buf[0];
        return ret;
    }
    else {
        const ref_buf = [buf()];
        let ret = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, callback === null ? null : _callback, null);
        buf(ref_buf[0]);
        return ret;
    }
}
exports.InputTextMultiline = InputTextMultiline;
// IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
function InputFloat(label, v, step = 0.0, step_fast = 0.0, decimal_precision = -1, extra_flags = 0) {
    if (Array.isArray(v)) {
        return bind.InputFloat(label, v, step, step_fast, decimal_precision, extra_flags);
    }
    else {
        const ref_v = [v()];
        const ret = bind.InputFloat(label, ref_v, step, step_fast, decimal_precision, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
exports.InputFloat = InputFloat;
// IMGUI_API bool          InputFloat2(const char* label, float v[2], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
function InputFloat2(label, v, decimal_precision = -1, extra_flags = 0) {
    return bind.InputFloat2(label, v, decimal_precision, extra_flags);
}
exports.InputFloat2 = InputFloat2;
// IMGUI_API bool          InputFloat3(const char* label, float v[3], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
function InputFloat3(label, v, decimal_precision = -1, extra_flags = 0) {
    return bind.InputFloat3(label, v, decimal_precision, extra_flags);
}
exports.InputFloat3 = InputFloat3;
// IMGUI_API bool          InputFloat4(const char* label, float v[4], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
function InputFloat4(label, v, decimal_precision = -1, extra_flags = 0) {
    return bind.InputFloat4(label, v, decimal_precision, extra_flags);
}
exports.InputFloat4 = InputFloat4;
// IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
function InputInt(label, v, step = 1, step_fast = 100, extra_flags = 0) {
    if (Array.isArray(v)) {
        return bind.InputInt(label, v, step, step_fast, extra_flags);
    }
    else {
        const ref_v = [v()];
        const ret = bind.InputInt(label, ref_v, step, step_fast, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
exports.InputInt = InputInt;
// IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
function InputInt2(label, v, extra_flags = 0) {
    return bind.InputInt2(label, v, extra_flags);
}
exports.InputInt2 = InputInt2;
// IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
function InputInt3(label, v, extra_flags = 0) {
    return bind.InputInt3(label, v, extra_flags);
}
exports.InputInt3 = InputInt3;
// IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
function InputInt4(label, v, extra_flags = 0) {
    return bind.InputInt4(label, v, extra_flags);
}
exports.InputInt4 = InputInt4;
// Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
// IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);     // adjust display_format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
function SliderFloat(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
    if (Array.isArray(v)) {
        return bind.SliderFloat(label, v, v_min, v_max, display_format, power);
    }
    else {
        const ref_v = [v()];
        const ret = bind.SliderFloat(label, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
exports.SliderFloat = SliderFloat;
// IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
function SliderFloat2(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
    if (Array.isArray(v)) {
        return bind.SliderFloat2(label, v, v_min, v_max, display_format, power);
    }
    else {
        const _v = [v.x, v.y];
        const ret = bind.SliderFloat2(label, _v, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    }
}
exports.SliderFloat2 = SliderFloat2;
// IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
function SliderFloat3(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
    return bind.SliderFloat3(label, v, v_min, v_max, display_format, power);
}
exports.SliderFloat3 = SliderFloat3;
// IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
function SliderFloat4(label, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
    return bind.SliderFloat4(label, v, v_min, v_max, display_format, power);
}
exports.SliderFloat4 = SliderFloat4;
// IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
function SliderAngle(label, v_rad, v_degrees_min = -360.0, v_degrees_max = +360.0) {
    if (Array.isArray(v_rad)) {
        return bind.SliderAngle(label, v_rad, v_degrees_min, v_degrees_max);
    }
    else {
        const ref_v_rad = [v_rad()];
        const ret = bind.SliderAngle(label, ref_v_rad, v_degrees_min, v_degrees_max);
        v_rad(ref_v_rad[0]);
        return ret;
    }
}
exports.SliderAngle = SliderAngle;
// IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* display_format = "%.0f");
function SliderInt(label, v, v_min, v_max, display_format = "%.0f") {
    if (Array.isArray(v)) {
        return bind.SliderInt(label, v, v_min, v_max, display_format);
    }
    else {
        const ref_v = [v()];
        const ret = bind.SliderInt(label, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
exports.SliderInt = SliderInt;
// IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* display_format = "%.0f");
function SliderInt2(label, v, v_min, v_max, display_format = "%.0f") {
    return bind.SliderInt2(label, v, v_min, v_max, display_format);
}
exports.SliderInt2 = SliderInt2;
// IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* display_format = "%.0f");
function SliderInt3(label, v, v_min, v_max, display_format = "%.0f") {
    return bind.SliderInt3(label, v, v_min, v_max, display_format);
}
exports.SliderInt3 = SliderInt3;
// IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* display_format = "%.0f");
function SliderInt4(label, v, v_min, v_max, display_format = "%.0f") {
    return bind.SliderInt4(label, v, v_min, v_max, display_format);
}
exports.SliderInt4 = SliderInt4;
// IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
function VSliderFloat(label, size, v, v_min, v_max, display_format = "%.3f", power = 1.0) {
    if (Array.isArray(v)) {
        return bind.VSliderFloat(label, size, v, v_min, v_max, display_format, power);
    }
    else {
        const ref_v = [v()];
        const ret = bind.VSliderFloat(label, size, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
exports.VSliderFloat = VSliderFloat;
// IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* display_format = "%.0f");
function VSliderInt(label, size, v, v_min, v_max, display_format = "%.0f") {
    if (Array.isArray(v)) {
        return bind.VSliderInt(label, size, v, v_min, v_max, display_format);
    }
    else {
        const ref_v = [v()];
        const ret = bind.VSliderInt(label, size, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
exports.VSliderInt = VSliderInt;
// Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
// Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
// IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
function ColorEdit3(label, col, flags = 0) {
    if (Array.isArray(col)) {
        return bind.ColorEdit3(label, col, flags);
    }
    else {
        const _col = [col.x, col.y, col.z];
        const ret = bind.ColorEdit3(label, _col, flags);
        col.x = _col[0];
        col.y = _col[1];
        col.z = _col[2];
        return ret;
    }
}
exports.ColorEdit3 = ColorEdit3;
// IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
function ColorEdit4(label, col, flags = 0) {
    if (Array.isArray(col)) {
        return bind.ColorEdit4(label, col, flags);
    }
    else {
        const _col = [col.x, col.y, col.z, col.w];
        const ret = bind.ColorEdit4(label, _col, flags);
        col.x = _col[0];
        col.y = _col[1];
        col.z = _col[2];
        col.w = _col[3];
        return ret;
    }
}
exports.ColorEdit4 = ColorEdit4;
// IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
function ColorPicker3(label, col, flags = 0) {
    if (Array.isArray(col)) {
        return bind.ColorPicker3(label, col, flags);
    }
    else {
        const _col = [col.x, col.y, col.z];
        const ret = bind.ColorPicker3(label, _col, flags);
        col.x = _col[0];
        col.y = _col[1];
        col.z = _col[2];
        return ret;
    }
}
exports.ColorPicker3 = ColorPicker3;
// IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
function ColorPicker4(label, col, flags = 0, ref_col = null) {
    if (Array.isArray(col)) {
        return bind.ColorPicker4(label, col, flags, ref_col);
    }
    else {
        const _col = [col.x, col.y, col.z, col.w];
        const ret = bind.ColorPicker4(label, _col, flags, ref_col);
        col.x = _col[0];
        col.y = _col[1];
        col.z = _col[2];
        col.w = _col[3];
        return ret;
    }
}
exports.ColorPicker4 = ColorPicker4;
// IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
function ColorButton(desc_id, col, flags = 0, size = ImVec2.ZERO) {
    return bind.ColorButton(desc_id, col, flags, size);
}
exports.ColorButton = ColorButton;
// IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
function SetColorEditOptions(flags) {
    bind.SetColorEditOptions(flags);
}
exports.SetColorEditOptions = SetColorEditOptions;
// Widgets: Trees
// IMGUI_API bool          TreeNode(const char* label);                                            // if returning 'true' the node is open and the tree id is pushed into the id stack. user is responsible for calling TreePop().
// IMGUI_API bool          TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);       // read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().
// IMGUI_API bool          TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);       // "
// IMGUI_API bool          TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
// IMGUI_API bool          TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
function TreeNode(label_or_id, fmt) {
    return bind.TreeNode(label_or_id, fmt || ((typeof (label_or_id) === "string") ? label_or_id : ""));
}
exports.TreeNode = TreeNode;
// IMGUI_API bool          TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
// IMGUI_API bool          TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
// IMGUI_API bool          TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
// IMGUI_API bool          TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
function TreeNodeEx(label_or_id, flags = 0, fmt) {
    return bind.TreeNodeEx(label_or_id, flags, fmt || ((typeof (label_or_id) === "string") ? label_or_id : ""));
}
exports.TreeNodeEx = TreeNodeEx;
// IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
// IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
var bind_imgui_62 = require("./bind-imgui");
exports.TreePush = bind_imgui_62.TreePush;
// IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
var bind_imgui_63 = require("./bind-imgui");
exports.TreePop = bind_imgui_63.TreePop;
// IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
var bind_imgui_64 = require("./bind-imgui");
exports.TreeAdvanceToLabelPos = bind_imgui_64.TreeAdvanceToLabelPos;
// IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
var bind_imgui_65 = require("./bind-imgui");
exports.GetTreeNodeToLabelSpacing = bind_imgui_65.GetTreeNodeToLabelSpacing;
// IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
function SetNextTreeNodeOpen(is_open, cond = 0) {
    bind.SetNextTreeNodeOpen(is_open, cond);
}
exports.SetNextTreeNodeOpen = SetNextTreeNodeOpen;
// IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
// IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
function CollapsingHeader(label, flags_or_p_open = 0, flags = 0) {
    if (Array.isArray(flags_or_p_open)) {
        return bind.CollapsingHeader(label, flags_or_p_open, flags);
    }
    else if (typeof (flags_or_p_open) === "number") {
        return bind.CollapsingHeader(label, null, flags_or_p_open);
    }
    else {
        const ref_open = [flags_or_p_open()];
        const ret = bind.CollapsingHeader(label, ref_open, flags);
        flags_or_p_open(ref_open[0]);
        return ret;
    }
}
exports.CollapsingHeader = CollapsingHeader;
// Widgets: Selectable / Lists
// IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
// IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
function Selectable(label, selected = false, flags = 0, size = ImVec2.ZERO) {
    if (typeof (selected) === "boolean" || Array.isArray(selected)) {
        return bind.Selectable(label, selected, flags, size);
    }
    else {
        const ref_selected = [selected()];
        const ret = bind.Selectable(label, ref_selected, flags, size);
        selected(ref_selected[0]);
        return ret;
    }
}
exports.Selectable = Selectable;
// IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
// IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
function ListBox(label, current_item, items, items_count = items.length, height_in_items = -1) {
    if (Array.isArray(current_item)) {
        return bind.ListBox(label, current_item, items, items_count, height_in_items);
    }
    else {
        const ref_current_item = [current_item()];
        const ret = bind.ListBox(label, ref_current_item, items, items_count, height_in_items);
        current_item(ref_current_item[0]);
        return ret;
    }
}
exports.ListBox = ListBox;
// IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
// IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
function ListBoxHeader(label, size) {
    return bind.ListBoxHeader(label, size);
}
exports.ListBoxHeader = ListBoxHeader;
// IMGUI_API void          ListBoxFooter();                                                        // terminate the scrolling region
function ListBoxFooter() {
    bind.ListBoxFooter();
}
exports.ListBoxFooter = ListBoxFooter;
// Widgets: Value() Helpers. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)
// IMGUI_API void          Value(const char* prefix, bool b);
// IMGUI_API void          Value(const char* prefix, int v);
// IMGUI_API void          Value(const char* prefix, unsigned int v);
// IMGUI_API void          Value(const char* prefix, float v, const char* float_format = NULL);
function Value(prefix, ...args) {
}
exports.Value = Value;
// Tooltips
// IMGUI_API void          SetTooltip(const char* fmt, ...) IM_FMTARGS(1);                     // set text tooltip under mouse-cursor, typically use with ImGui::IsItemHovered(). overidde any previous call to SetTooltip().
// IMGUI_API void          SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
function SetTooltip(fmt) {
    bind.SetTooltip(fmt);
}
exports.SetTooltip = SetTooltip;
// IMGUI_API void          BeginTooltip();                                                     // begin/append a tooltip window. to create full-featured tooltip (with any kind of contents).
var bind_imgui_66 = require("./bind-imgui");
exports.BeginTooltip = bind_imgui_66.BeginTooltip;
// IMGUI_API void          EndTooltip();
var bind_imgui_67 = require("./bind-imgui");
exports.EndTooltip = bind_imgui_67.EndTooltip;
// Menus
// IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
var bind_imgui_68 = require("./bind-imgui");
exports.BeginMainMenuBar = bind_imgui_68.BeginMainMenuBar;
// IMGUI_API void          EndMainMenuBar();
var bind_imgui_69 = require("./bind-imgui");
exports.EndMainMenuBar = bind_imgui_69.EndMainMenuBar;
// IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
var bind_imgui_70 = require("./bind-imgui");
exports.BeginMenuBar = bind_imgui_70.BeginMenuBar;
// IMGUI_API void          EndMenuBar();
var bind_imgui_71 = require("./bind-imgui");
exports.EndMenuBar = bind_imgui_71.EndMenuBar;
// IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
function BeginMenu(label, enabled = true) { return bind.BeginMenu(label, enabled); }
exports.BeginMenu = BeginMenu;
// IMGUI_API void          EndMenu();
var bind_imgui_72 = require("./bind-imgui");
exports.EndMenu = bind_imgui_72.EndMenu;
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
function MenuItem(label, shortcut = null, selected = false, enabled = true) {
    if (shortcut === null) {
        shortcut = "";
    }
    if (typeof (selected) === "boolean") {
        selected = [selected];
        return bind.MenuItem(label, shortcut, selected, enabled);
    }
    else if (Array.isArray(selected)) {
        return bind.MenuItem(label, shortcut, selected, enabled);
    }
    else {
        const ref_selected = [selected()];
        const ret = bind.MenuItem(label, shortcut, ref_selected, enabled);
        selected(ref_selected[0]);
        return ret;
    }
}
exports.MenuItem = MenuItem;
// Popups
// IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
var bind_imgui_73 = require("./bind-imgui");
exports.OpenPopup = bind_imgui_73.OpenPopup;
// IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
function OpenPopupOnItemClick(str_id = "", mouse_button = 1) {
    return bind.OpenPopupOnItemClick(str_id, mouse_button);
}
exports.OpenPopupOnItemClick = OpenPopupOnItemClick;
// IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
var bind_imgui_74 = require("./bind-imgui");
exports.BeginPopup = bind_imgui_74.BeginPopup;
// IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
function BeginPopupModal(str_id = "", p_open = null, extra_flags = 0) {
    p_open = p_open || [true];
    return bind.BeginPopupModal(str_id, p_open, extra_flags);
}
exports.BeginPopupModal = BeginPopupModal;
// IMGUI_API bool          BeginPopupContextItem(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!
function BeginPopupContextItem(str_id = "", mouse_button = 1) {
    return bind.BeginPopupContextItem(str_id, mouse_button);
}
exports.BeginPopupContextItem = BeginPopupContextItem;
// IMGUI_API bool          BeginPopupContextWindow(const char* str_id = NULL, int mouse_button = 1, bool also_over_items = true);  // helper to open and begin popup when clicked on current window.
function BeginPopupContextWindow(str_id = "", mouse_button = 1, also_over_items = true) {
    return bind.BeginPopupContextWindow(str_id, mouse_button, also_over_items);
}
exports.BeginPopupContextWindow = BeginPopupContextWindow;
// IMGUI_API bool          BeginPopupContextVoid(const char* str_id = NULL, int mouse_button = 1);                                 // helper to open and begin popup when clicked in void (where there are no imgui windows).
function BeginPopupContextVoid(str_id = "", mouse_button = 1) {
    return bind.BeginPopupContextVoid(str_id, mouse_button);
}
exports.BeginPopupContextVoid = BeginPopupContextVoid;
// IMGUI_API void          EndPopup();
var bind_imgui_75 = require("./bind-imgui");
exports.EndPopup = bind_imgui_75.EndPopup;
// IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
var bind_imgui_76 = require("./bind-imgui");
exports.IsPopupOpen = bind_imgui_76.IsPopupOpen;
// IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
var bind_imgui_77 = require("./bind-imgui");
exports.CloseCurrentPopup = bind_imgui_77.CloseCurrentPopup;
// Logging/Capture: all text output from interface is captured to tty/file/clipboard. By default, tree nodes are automatically opened during logging.
// IMGUI_API void          LogToTTY(int max_depth = -1);                                       // start logging to tty
function LogToTTY(max_depth = -1) {
    bind.LogToTTY(max_depth);
}
exports.LogToTTY = LogToTTY;
// IMGUI_API void          LogToFile(int max_depth = -1, const char* filename = NULL);         // start logging to file
function LogToFile(max_depth = -1, filename = null) {
    bind.LogToFile(max_depth, filename);
}
exports.LogToFile = LogToFile;
// IMGUI_API void          LogToClipboard(int max_depth = -1);                                 // start logging to OS clipboard
function LogToClipboard(max_depth = -1) {
    bind.LogToClipboard(max_depth);
}
exports.LogToClipboard = LogToClipboard;
// IMGUI_API void          LogFinish();                                                        // stop logging (close file, etc.)
var bind_imgui_78 = require("./bind-imgui");
exports.LogFinish = bind_imgui_78.LogFinish;
// IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
var bind_imgui_79 = require("./bind-imgui");
exports.LogButtons = bind_imgui_79.LogButtons;
// IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
function LogText(fmt) {
    bind.LogText(fmt);
}
exports.LogText = LogText;
// Drag and Drop
// [BETA API] Missing Demo code. API may evolve.
// IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
function BeginDragDropSource(flags = 0, mouse_button = 0) {
    return false;
}
exports.BeginDragDropSource = BeginDragDropSource;
// IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
function SetDragDropPayload(type, data, size, cond = 0) {
    return false;
}
exports.SetDragDropPayload = SetDragDropPayload;
// IMGUI_API void          EndDragDropSource();
function EndDragDropSource() {
}
exports.EndDragDropSource = EndDragDropSource;
// IMGUI_API bool          BeginDragDropTarget();                                                                  // call after submitting an item that may receive an item. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()
function BeginDragDropTarget() {
    return false;
}
exports.BeginDragDropTarget = BeginDragDropTarget;
// IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);            // accept contents of a given type. If ImGuiDragDropFlags_AcceptBeforeDelivery is set you can peek into the payload before the mouse button is released.
function AcceptDragDropPayload(type, flags = 0) {
    return null;
}
exports.AcceptDragDropPayload = AcceptDragDropPayload;
// IMGUI_API void          EndDragDropTarget();
function EndDragDropTarget() {
}
exports.EndDragDropTarget = EndDragDropTarget;
// Clipping
// IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
function PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect) {
    bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
}
exports.PushClipRect = PushClipRect;
// IMGUI_API void          PopClipRect();
function PopClipRect() {
    bind.PopClipRect();
}
exports.PopClipRect = PopClipRect;
// Focus
// (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
// (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
// IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
var bind_imgui_80 = require("./bind-imgui");
exports.SetItemDefaultFocus = bind_imgui_80.SetItemDefaultFocus;
// IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
function SetKeyboardFocusHere(offset = 0) {
    bind.SetKeyboardFocusHere(offset);
}
exports.SetKeyboardFocusHere = SetKeyboardFocusHere;
// Utilities
// IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
function IsItemHovered(flags = 0) {
    return bind.IsItemHovered(flags);
}
exports.IsItemHovered = IsItemHovered;
// IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
var bind_imgui_81 = require("./bind-imgui");
exports.IsItemActive = bind_imgui_81.IsItemActive;
// IMGUI_API bool          IsItemFocused();                                                    // is the last item focused for keyboard/gamepad navigation?
var bind_imgui_82 = require("./bind-imgui");
exports.IsItemFocused = bind_imgui_82.IsItemFocused;
// IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
function IsItemClicked(mouse_button = 0) {
    return bind.IsItemClicked(mouse_button);
}
exports.IsItemClicked = IsItemClicked;
// IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
var bind_imgui_83 = require("./bind-imgui");
exports.IsItemVisible = bind_imgui_83.IsItemVisible;
// IMGUI_API bool          IsAnyItemHovered();
var bind_imgui_84 = require("./bind-imgui");
exports.IsAnyItemHovered = bind_imgui_84.IsAnyItemHovered;
// IMGUI_API bool          IsAnyItemActive();
var bind_imgui_85 = require("./bind-imgui");
exports.IsAnyItemActive = bind_imgui_85.IsAnyItemActive;
// IMGUI_API bool          IsAnyItemFocused();
var bind_imgui_86 = require("./bind-imgui");
exports.IsAnyItemFocused = bind_imgui_86.IsAnyItemFocused;
// IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
function GetItemRectMin(out = new ImVec2()) {
    return bind.GetItemRectMin(out);
}
exports.GetItemRectMin = GetItemRectMin;
// IMGUI_API ImVec2        GetItemRectMax();                                                   // "
function GetItemRectMax(out = new ImVec2()) {
    return bind.GetItemRectMax(out);
}
exports.GetItemRectMax = GetItemRectMax;
// IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
function GetItemRectSize(out = new ImVec2()) {
    return bind.GetItemRectSize(out);
}
exports.GetItemRectSize = GetItemRectSize;
// IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
var bind_imgui_87 = require("./bind-imgui");
exports.SetItemAllowOverlap = bind_imgui_87.SetItemAllowOverlap;
// IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
function IsWindowFocused(flags = 0) {
    return bind.IsWindowFocused(flags);
}
exports.IsWindowFocused = IsWindowFocused;
// IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
function IsWindowHovered(flags = 0) {
    return bind.IsWindowHovered(flags);
}
exports.IsWindowHovered = IsWindowHovered;
// IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
// IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
function IsRectVisible(size_or_rect_min, rect_max) {
    return bind.IsRectVisible(size_or_rect_min, rect_max);
}
exports.IsRectVisible = IsRectVisible;
// IMGUI_API float         GetTime();
var bind_imgui_88 = require("./bind-imgui");
exports.GetTime = bind_imgui_88.GetTime;
// IMGUI_API int           GetFrameCount();
var bind_imgui_89 = require("./bind-imgui");
exports.GetFrameCount = bind_imgui_89.GetFrameCount;
// IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
function GetOverlayDrawList() {
    return new ImDrawList(bind.GetOverlayDrawList());
}
exports.GetOverlayDrawList = GetOverlayDrawList;
// IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
function GetDrawListSharedData() {
    return new ImDrawListSharedData(bind.GetDrawListSharedData());
}
exports.GetDrawListSharedData = GetDrawListSharedData;
// IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
var bind_imgui_90 = require("./bind-imgui");
exports.GetStyleColorName = bind_imgui_90.GetStyleColorName;
// IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
function CalcTextSize(text, text_end = null, hide_text_after_double_hash = false, wrap_width = -1, out = new ImVec2()) {
    return bind.CalcTextSize(text, text_end, hide_text_after_double_hash, wrap_width, out);
}
exports.CalcTextSize = CalcTextSize;
// IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
function CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end) {
    return bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
}
exports.CalcListClipping = CalcListClipping;
// IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
function BeginChildFrame(id, size, extra_flags = 0) {
    return bind.BeginChildFrame(id, size, extra_flags);
}
exports.BeginChildFrame = BeginChildFrame;
// IMGUI_API void          EndChildFrame();
var bind_imgui_91 = require("./bind-imgui");
exports.EndChildFrame = bind_imgui_91.EndChildFrame;
// IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
function ColorConvertU32ToFloat4(in_, out = new ImVec4()) {
    return bind.ColorConvertU32ToFloat4(in_, out);
}
exports.ColorConvertU32ToFloat4 = ColorConvertU32ToFloat4;
// IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
function ColorConvertFloat4ToU32(in_) {
    return bind.ColorConvertFloat4ToU32(in_);
}
exports.ColorConvertFloat4ToU32 = ColorConvertFloat4ToU32;
// IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
var bind_imgui_92 = require("./bind-imgui");
exports.ColorConvertRGBtoHSV = bind_imgui_92.ColorConvertRGBtoHSV;
// IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
var bind_imgui_93 = require("./bind-imgui");
exports.ColorConvertHSVtoRGB = bind_imgui_93.ColorConvertHSVtoRGB;
// Inputs
// IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
function GetKeyIndex(imgui_key) {
    return bind.GetKeyIndex(imgui_key);
}
exports.GetKeyIndex = GetKeyIndex;
// IMGUI_API bool          IsKeyDown(int user_key_index);                                      // is key being held. == io.KeysDown[user_key_index]. note that imgui doesn't know the semantic of each entry of io.KeyDown[]. Use your own indices/enums according to how your backend/engine stored them into KeyDown[]!
function IsKeyDown(user_key_index) {
    return bind.IsKeyDown(user_key_index);
}
exports.IsKeyDown = IsKeyDown;
// IMGUI_API bool          IsKeyPressed(int user_key_index, bool repeat = true);               // was key pressed (went from !Down to Down). if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate
function IsKeyPressed(user_key_index, repeat = true) {
    return bind.IsKeyPressed(user_key_index, repeat);
}
exports.IsKeyPressed = IsKeyPressed;
// IMGUI_API bool          IsKeyReleased(int user_key_index);                                  // was key released (went from Down to !Down)..
function IsKeyReleased(user_key_index) {
    return bind.IsKeyReleased(user_key_index);
}
exports.IsKeyReleased = IsKeyReleased;
// IMGUI_API int           GetKeyPressedAmount(int key_index, float repeat_delay, float rate); // uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate
function GetKeyPressedAmount(user_key_index, repeat_delay, rate) {
    return bind.GetKeyPressedAmount(user_key_index, repeat_delay, rate);
}
exports.GetKeyPressedAmount = GetKeyPressedAmount;
// IMGUI_API bool          IsMouseDown(int button);                                            // is mouse button held
function IsMouseDown(button) {
    return bind.IsMouseDown(button);
}
exports.IsMouseDown = IsMouseDown;
// IMGUI_API bool          IsMouseClicked(int button, bool repeat = false);                    // did mouse button clicked (went from !Down to Down)
function IsMouseClicked(button, repeat = false) {
    return bind.IsMouseClicked(button, repeat);
}
exports.IsMouseClicked = IsMouseClicked;
// IMGUI_API bool          IsMouseDoubleClicked(int button);                                   // did mouse button double-clicked. a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.
function IsMouseDoubleClicked(button) {
    return bind.IsMouseDoubleClicked(button);
}
exports.IsMouseDoubleClicked = IsMouseDoubleClicked;
// IMGUI_API bool          IsMouseReleased(int button);                                        // did mouse button released (went from Down to !Down)
function IsMouseReleased(button) {
    return bind.IsMouseReleased(button);
}
exports.IsMouseReleased = IsMouseReleased;
// IMGUI_API bool          IsMouseDragging(int button = 0, float lock_threshold = -1.0f);      // is mouse dragging. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
function IsMouseDragging(button = 0, lock_threshold = -1.0) {
    return bind.IsMouseDragging(button, lock_threshold);
}
exports.IsMouseDragging = IsMouseDragging;
// IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);  // is mouse hovering given bounding rect (in screen space). clipped by current clipping settings. disregarding of consideration of focus/window ordering/blocked by a popup.
function IsMouseHoveringRect(r_min, r_max, clip = true) {
    return bind.IsMouseHoveringRect(r_min, r_max, clip);
}
exports.IsMouseHoveringRect = IsMouseHoveringRect;
// IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
function IsMousePosValid(mouse_pos = null) {
    return bind.IsMousePosValid(mouse_pos);
}
exports.IsMousePosValid = IsMousePosValid;
// IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
function GetMousePos(out = new ImVec2()) {
    return bind.GetMousePos(out);
}
exports.GetMousePos = GetMousePos;
// IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
function GetMousePosOnOpeningCurrentPopup(out = new ImVec2()) {
    return bind.GetMousePosOnOpeningCurrentPopup(out);
}
exports.GetMousePosOnOpeningCurrentPopup = GetMousePosOnOpeningCurrentPopup;
// IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
function GetMouseDragDelta(button = 0, lock_threshold = -1.0, out = new ImVec2()) {
    return bind.GetMouseDragDelta(button, lock_threshold, out);
}
exports.GetMouseDragDelta = GetMouseDragDelta;
// IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
function ResetMouseDragDelta(button = 0) {
    bind.ResetMouseDragDelta(button);
}
exports.ResetMouseDragDelta = ResetMouseDragDelta;
// IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
var bind_imgui_94 = require("./bind-imgui");
exports.GetMouseCursor = bind_imgui_94.GetMouseCursor;
// IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
var bind_imgui_95 = require("./bind-imgui");
exports.SetMouseCursor = bind_imgui_95.SetMouseCursor;
// IMGUI_API void          CaptureKeyboardFromApp(bool capture = true);                        // manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application handle). e.g. force capture keyboard when your widget is being hovered.
function CaptureKeyboardFromApp(capture = true) {
    return bind.CaptureKeyboardFromApp(capture);
}
exports.CaptureKeyboardFromApp = CaptureKeyboardFromApp;
// IMGUI_API void          CaptureMouseFromApp(bool capture = true);                           // manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application handle).
function CaptureMouseFromApp(capture = true) {
    bind.CaptureMouseFromApp(capture);
}
exports.CaptureMouseFromApp = CaptureMouseFromApp;
// Helpers functions to access functions pointers in ImGui::GetIO()
// IMGUI_API void*         MemAlloc(size_t sz);
var bind_imgui_96 = require("./bind-imgui");
exports.MemAlloc = bind_imgui_96.MemAlloc;
// IMGUI_API void          MemFree(void* ptr);
var bind_imgui_97 = require("./bind-imgui");
exports.MemFree = bind_imgui_97.MemFree;
// IMGUI_API const char*   GetClipboardText();
var bind_imgui_98 = require("./bind-imgui");
exports.GetClipboardText = bind_imgui_98.GetClipboardText;
// IMGUI_API void          SetClipboardText(const char* text);
var bind_imgui_99 = require("./bind-imgui");
exports.SetClipboardText = bind_imgui_99.SetClipboardText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWd1aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFFckMsMkNBQTZDO0FBQXBDLHFDQUFBLGFBQWEsQ0FBQTtBQUV0QixtQkFBMEIsS0FBdUIsSUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFBQyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7QUFBQyxDQUFDLENBQUMsQ0FBQztBQUEvRiw4QkFBK0Y7QUFFL0Ysc0JBQTZCLElBQXFDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBTkQsb0NBTUM7QUFFRDtJQUNJLFlBQW1CLElBQVksRUFBUyxTQUFpQixFQUFFO1FBQXhDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFhO0lBQUcsQ0FBQztDQUNsRTtBQUZELHdDQUVDO0FBVUQsSUFBWSxnQkE4Qlg7QUE5QkQsV0FBWSxnQkFBZ0I7SUFDeEIsbUVBQStCLENBQUE7SUFDL0IsK0RBQStCLENBQUE7SUFDL0IsMkRBQStCLENBQUE7SUFDL0IscUVBQStCLENBQUE7SUFDL0Isa0ZBQStCLENBQUE7SUFDL0Isb0VBQStCLENBQUE7SUFDL0IsZ0ZBQStCLENBQUE7SUFDL0IsOElBQThJO0lBQzlJLCtFQUErQixDQUFBO0lBQy9CLGlFQUErQixDQUFBO0lBQy9CLGdFQUFnQyxDQUFBO0lBQ2hDLHdGQUFnQyxDQUFBO0lBQ2hDLHNGQUFnQyxDQUFBO0lBQ2hDLDRGQUFnQyxDQUFBO0lBQ2hDLGlHQUFnQyxDQUFB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QUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFD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