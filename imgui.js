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
    constructor(native) {
        this.native = native;
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
    get UserData() { return this.native.UserData; }
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
    AddRect(a, b, col, rounding = 0.0, rounding_corners_flags = 15 /* All */, thickness = 1.0) {
        this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
    }
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    AddRectFilled(a, b, col, rounding = 0.0, rounding_corners_flags = 15 /* All */) {
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
        for (let i = 0; i < 45 /* COUNT */; ++i) {
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
                    return 45 /* COUNT */;
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
        for (let i = 0; i < 45 /* COUNT */; ++i) {
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
                    return 21 /* COUNT */;
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
                    return 21 /* COUNT */;
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
                    return 21 /* COUNT */;
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
function InputText(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : exports.ImGuiTextEditDefaultSize, flags = 0, callback = null, user_data = null) {
    function _callback(data) {
        const _data = new ImGuiTextEditCallbackData(data);
        const ret = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputText(label, buf, buf_size, flags, callback === null ? null : _callback, user_data);
    }
    else if (buf instanceof ImStringBuffer) {
        const ref_buf = [buf.buffer];
        const _buf_size = Math.min(buf_size, buf.size);
        let ret = bind.InputText(label, ref_buf, _buf_size, flags, callback === null ? null : _callback, user_data);
        buf.buffer = ref_buf[0];
        return ret;
    }
    else {
        const ref_buf = [buf()];
        let ret = bind.InputText(label, ref_buf, buf_size, flags, callback === null ? null : _callback, user_data);
        buf(ref_buf[0]);
        return ret;
    }
}
exports.InputText = InputText;
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
function InputTextMultiline(label, buf, buf_size = buf instanceof ImStringBuffer ? buf.size : exports.ImGuiTextEditDefaultSize, size = ImVec2.ZERO, flags = 0, callback = null, user_data = null) {
    function _callback(data) {
        const _data = new ImGuiTextEditCallbackData(data);
        const ret = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputTextMultiline(label, buf, buf_size, size, flags, callback === null ? null : _callback, user_data);
    }
    else if (buf instanceof ImStringBuffer) {
        const ref_buf = [buf.buffer];
        const _buf_size = Math.min(buf_size, buf.size);
        let ret = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, callback === null ? null : _callback, user_data);
        buf.buffer = ref_buf[0];
        return ret;
    }
    else {
        const ref_buf = [buf()];
        let ret = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, callback === null ? null : _callback, user_data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWd1aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFFckMsMkNBQTZDO0FBQXBDLHFDQUFBLGFBQWEsQ0FBQTtBQUV0QixtQkFBMEIsS0FBdUIsSUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFBQyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7QUFBQyxDQUFDLENBQUMsQ0FBQztBQUEvRiw4QkFBK0Y7QUFFL0Ysc0JBQTZCLElBQXFDO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBTkQsb0NBTUM7QUFFRDtJQUNJLFlBQW1CLElBQVksRUFBUyxTQUFpQixFQUFFO1FBQXhDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFhO0lBQUcsQ0FBQztDQUNsRTtBQUZELHdDQUVDO0FBNEJELDJDQUFnRDtBQUF2Qyx3Q0FBQSxnQkFBZ0IsQ0FBQTtBQUV6QjtJQU1JLFlBQW1CLElBQVksR0FBRyxFQUFTLElBQVksR0FBRztRQUF2QyxNQUFDLEdBQUQsQ0FBQyxDQUFjO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBYztJQUFHLENBQUM7SUFFdkQsSUFBSSxDQUFDLEtBQXNDO1FBQzlDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFB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QyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksd0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxD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