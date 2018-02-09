import * as bind from "./bind-imgui";
import * as config from "./imconfig";

export { IMGUI_VERSION } from "./bind-imgui";

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

export { ImGuiWindowFlags, ImGuiWindowFlags as WindowFlags } from "./bind-imgui";
export { ImGuiInputTextFlags, ImGuiInputTextFlags as InputTextFlags } from "./bind-imgui";
export { ImGuiTreeNodeFlags, ImGuiTreeNodeFlags as TreeNodeFlags } from "./bind-imgui";
export { ImGuiSelectableFlags, ImGuiSelectableFlags as SelectableFlags } from "./bind-imgui";
export { ImGuiComboFlags, ImGuiComboFlags as ComboFlags } from "./bind-imgui";
export { ImGuiFocusedFlags, ImGuiFocusedFlags as FocusedFlags } from "./bind-imgui";
export { ImGuiHoveredFlags, ImGuiHoveredFlags as HoveredFlags } from "./bind-imgui";
export { ImGuiDragDropFlags, ImGuiDragDropFlags as DragDropFlags } from "./bind-imgui";
export { ImGuiKey, ImGuiKey as Key } from "./bind-imgui";
export { ImGuiCol, ImGuiCol as Col } from "./bind-imgui";
export { ImGuiStyleVar, ImGuiStyleVar as StyleVar } from "./bind-imgui";
export { ImGuiColorEditFlags, ImGuiColorEditFlags as ColorEditFlags } from "./bind-imgui";
export { ImGuiMouseCursor, ImGuiMouseCursor as MouseCursor } from "./bind-imgui";
export { ImGuiCond, ImGuiCond as Cond } from "./bind-imgui";

export { ImU32 } from "./bind-imgui";

export { interface_ImVec2 } from "./bind-imgui";
export { reference_ImVec2 } from "./bind-imgui";

export class ImVec2 implements bind.interface_ImVec2 {
    public static readonly ZERO: Readonly<ImVec2> = new ImVec2(0.0, 0.0);
    public static readonly UNIT: Readonly<ImVec2> = new ImVec2(1.0, 1.0);
    public static readonly UNIT_X: Readonly<ImVec2> = new ImVec2(1.0, 0.0);
    public static readonly UNIT_Y: Readonly<ImVec2> = new ImVec2(0.0, 1.0);

    constructor(public x: number = 0.0, public y: number = 0.0) {}

    public Copy(other: Readonly<bind.interface_ImVec2>): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    public Equals(other: Readonly<bind.interface_ImVec2>): boolean {
        if (this.x !== other.x) { return false; }
        if (this.y !== other.y) { return false; }
        return true;
    }
}

export { interface_ImVec4 } from "./bind-imgui";
export { reference_ImVec4 } from "./bind-imgui";

export class ImVec4 implements bind.interface_ImVec4 {
    public static readonly ZERO: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 0.0);
    public static readonly UNIT: Readonly<ImVec4> = new ImVec4(1.0, 1.0, 1.0, 1.0);
    public static readonly UNIT_X: Readonly<ImVec4> = new ImVec4(1.0, 0.0, 0.0, 0.0);
    public static readonly UNIT_Y: Readonly<ImVec4> = new ImVec4(0.0, 1.0, 0.0, 0.0);
    public static readonly UNIT_Z: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 1.0, 0.0);
    public static readonly UNIT_W: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 1.0);
    public static readonly BLACK: Readonly<ImVec4> = new ImVec4(0.0, 0.0, 0.0, 1.0);
    public static readonly WHITE: Readonly<ImVec4> = new ImVec4(1.0, 1.0, 1.0, 1.0);

    constructor(public x: number = 0.0, public y: number = 0.0, public z: number = 0.0, public w: number = 1.0) {}

    public Copy(other: Readonly<bind.interface_ImVec4>): this {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
        return this;
    }

    public Equals(other: Readonly<bind.interface_ImVec4>): boolean {
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

    // inline iterator             erase(const_iterator it)        { IM_ASSERT(it >= Data && it < Data+Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(value_type)); Size--; return Data + off; }
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
    InputBuf: ImStringBuffer = new ImStringBuffer(256);
    // ImVector<TextRange> Filters;
    // int                 CountGrep;
    CountGrep: number = 0;

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
    Buf: string = "";
    begin(): string { return this.Buf; }
    size(): number { return this.Buf.length; }
    clear(): void { this.Buf = ""; }
    append(text: string): void { this.Buf += text; }

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
    // char            DataType[8 + 1];    // Data type tag (short user-supplied string)
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
export const IM_COL32_WHITE: number = IM_COL32(255,255,255,255);  // Opaque white = 0xFFFFFFFF
export const IM_COL32_BLACK: number = IM_COL32(0,0,0,255);        // Opaque black
export const IM_COL32_BLACK_TRANS: number = IM_COL32(0,0,0,0);    // Transparent black = 0x00000000

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
    constructor(r: number | bind.ImU32 | Readonly<bind.interface_ImVec4> = 0.0, g: number = 0.0, b: number = 0.0, a: number = 1.0) {
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
    toImU32(): bind.ImU32 { return bind.ColorConvertFloat4ToU32(this.Value); }
    // inline operator ImVec4() const                                  { return Value; }
    toImVec4(): ImVec4 { return this.Value; }

    // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
    // inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
    SetHSV(h: number, s: number, v: number, a: number = 1.0): void {
        const ref_r: bind.ImScalar<number> = [ this.Value.x ];
        const ref_g: bind.ImScalar<number> = [ this.Value.y ];
        const ref_b: bind.ImScalar<number> = [ this.Value.z ];
        bind.ColorConvertHSVtoRGB(h, s, v, ref_r, ref_g, ref_b);
        this.Value.x = ref_r[0];
        this.Value.y = ref_g[0];
        this.Value.z = ref_b[0];
        this.Value.w = a;
    }
    // static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r,g,b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r,g,b,a); }
    static HSV(h: number, s: number, v: number, a: number = 1.0): ImColor {
        const color = new ImColor();
        color.SetHSV(h, s, v, a);
        return color;
    }
}

export const ImGuiTextEditDefaultSize: number = 128;

export type ImGuiTextEditCallback = (data: ImGuiTextEditCallbackData) => number;

// Shared state of InputText(), passed to callback when a ImGuiInputTextFlags_Callback* flag is used and the corresponding callback is triggered.
export class ImGuiTextEditCallbackData {
    constructor(public native: bind.ImGuiTextEditCallbackData) {}
    delete(): void { if (this.native) { this.native.delete(); delete this.native; } }

    // ImGuiInputTextFlags EventFlag;      // One of ImGuiInputTextFlags_Callback* // Read-only
    public get EventFlag(): bind.ImGuiInputTextFlags { return this.native.EventFlag; }
    // ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    public get Flags(): bind.ImGuiInputTextFlags { return this.native.Flags; }
    // void*               UserData;       // What user passed to InputText()      // Read-only
    public get UserData(): any { return this.native.UserData; }
    // bool                ReadOnly;       // Read-only mode                       // Read-only
    public get ReadOnly(): boolean { return this.native.ReadOnly; }

    // CharFilter event:
    // ImWchar             EventChar;      // Character input                      // Read-write (replace character or set to zero)
    public get EventChar(): bind.ImWchar { return this.native.EventChar; }
    public set EventChar(value: bind.ImWchar) { this.native.EventChar = value; }

    // Completion,History,Always events:
    // If you modify the buffer contents make sure you update 'BufTextLen' and set 'BufDirty' to true.
    // ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only
    public get EventKey(): bind.ImGuiKey { return this.native.EventKey; }
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

export type ImGuiSizeConstraintCallback = (data: ImGuiSizeConstraintCallbackData) => void;

// Resizing callback data to apply custom constraint. As enabled by SetNextWindowSizeConstraints(). Callback is called during the next Begin().
// NB: For basic min/max size constraint on each axis you don't need to use the callback! The SetNextWindowSizeConstraints() parameters are enough.
export class ImGuiSizeConstraintCallbackData {
    constructor(public native: bind.ImGuiSizeConstraintCallbackData) {}
    delete(): void { if (this.native) { this.native.delete(); delete this.native; } }

    get UserData(): any { return this.native.UserData; }
    get Pos(): Readonly<bind.interface_ImVec2> { return this.native.getPos(); }
    get CurrentSize(): Readonly<bind.interface_ImVec2> { return this.native.getCurrentSize(); }
    get DesiredSize(): bind.interface_ImVec2 { return this.native.getDesiredSize(); }
}

export class ImGuiListClipper
{
    private native: bind.ImGuiListClipper;

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
    delete(): void {
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
    constructor(public readonly native: bind.reference_ImDrawCmd) {}

    // unsigned int    ElemCount;              // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    get ElemCount(): number { return this.native.ElemCount; }
    // ImVec4          ClipRect;               // Clipping rectangle (x1, y1, x2, y2)
    get ClipRect(): Readonly<bind.reference_ImVec4> { return this.native.getClipRect(); }
    // ImTextureID     TextureId;              // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    get TextureId(): bind.ImTextureID { return this.native.TextureId; }
    // ImDrawCallback  UserCallback;           // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
    // void*           UserCallbackData;       // The draw callback code can access this.

    // ImDrawCmd() { ElemCount = 0; ClipRect.x = ClipRect.y = ClipRect.z = ClipRect.w = 0.0f; TextureId = NULL; UserCallback = NULL; UserCallbackData = NULL; }
}

// Vertex index (override with '#define ImDrawIdx unsigned int' inside in imconfig.h)
// #ifndef ImDrawIdx
// typedef unsigned short ImDrawIdx;
// #endif
export { ImDrawIdxSize } from "./bind-imgui";
export type ImDrawIdx = number;

// Vertex layout
// #ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
export { ImDrawVertSize } from "./bind-imgui";
export { ImDrawVertPosOffset } from "./bind-imgui";
export { ImDrawVertUVOffset } from "./bind-imgui";
export { ImDrawVertColOffset } from "./bind-imgui";
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

export { ImDrawCornerFlags } from "./bind-imgui";

export { ImDrawListFlags } from "./bind-imgui";

export class ImDrawListSharedData
{
    constructor(public readonly native: bind.reference_ImDrawListSharedData) {}
}

// Draw command list
// This is the low-level list of polygons that ImGui functions are filling. At the end of the frame, all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
// Each ImGui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to access the current window draw list and draw custom primitives.
// You can interleave normal ImGui:: calls and adding primitives to the current draw list.
// All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), however you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
// Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
export class ImDrawList
{
    constructor(public readonly native: bind.reference_ImDrawList) {}

    IterateDrawCmds(callback: (draw_cmd: ImDrawCmd, ElemStart: number) => void): void {
        this.native.IterateDrawCmds((draw_cmd: bind.reference_ImDrawCmd, ElemStart: number): void => {
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
    public PushClipRect(clip_rect_min: Readonly<bind.interface_ImVec2>, clip_rect_max: Readonly<bind.interface_ImVec2>, intersect_with_current_clip_rect: boolean = false): void {
        this.native.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
    }
    // IMGUI_API void  PushClipRectFullScreen();
    public PushClipRectFullScreen(): void { this.native.PushClipRectFullScreen(); }
    // IMGUI_API void  PopClipRect();
    public PopClipRect(): void { this.native.PopClipRect(); }
    // IMGUI_API void  PushTextureID(const ImTextureID& texture_id);
    // IMGUI_API void  PopTextureID();
    // inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    // inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }

    // Primitives
    // IMGUI_API void  AddLine(const ImVec2& a, const ImVec2& b, ImU32 col, float thickness = 1.0f);
    public AddLine(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, col: bind.ImU32, thickness: number = 1.0): void {
        this.native.AddLine(a, b, col, thickness);
    }
    // IMGUI_API void  AddRect(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All, float thickness = 1.0f);   // a: upper-left, b: lower-right, rounding_corners_flags: 4-bits corresponding to which corner to round
    public AddRect(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, col: bind.ImU32, rounding: number = 0.0, rounding_corners_flags: bind.ImDrawCornerFlags = bind.ImDrawCornerFlags.All, thickness: number = 1.0): void {
        this.native.AddRect(a, b, col, rounding, rounding_corners_flags, thickness);
    }
    // IMGUI_API void  AddRectFilled(const ImVec2& a, const ImVec2& b, ImU32 col, float rounding = 0.0f, int rounding_corners_flags = ImDrawCornerFlags_All);                     // a: upper-left, b: lower-right
    public AddRectFilled(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, col: bind.ImU32, rounding: number = 0.0, rounding_corners_flags: bind.ImDrawCornerFlags = bind.ImDrawCornerFlags.All): void {
        this.native.AddRectFilled(a, b, col, rounding, rounding_corners_flags);
    }
    // IMGUI_API void  AddRectFilledMultiColor(const ImVec2& a, const ImVec2& b, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    public AddRectFilledMultiColor(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, col_upr_left: bind.ImU32, col_upr_right: bind.ImU32, col_bot_right: bind.ImU32, col_bot_left: bind.ImU32): void {
        this.native.AddRectFilledMultiColor(a, b, col_upr_left, col_upr_right, col_bot_right, col_bot_left);
    }
    // IMGUI_API void  AddQuad(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col, float thickness = 1.0f);
    public AddQuad(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, c: Readonly<bind.interface_ImVec2>, d: Readonly<bind.interface_ImVec2>, col: bind.ImU32, thickness: number = 1.0): void {
        this.native.AddQuad(a, b, c, d, col, thickness);
    }
    // IMGUI_API void  AddQuadFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, ImU32 col);
    public AddQuadFilled(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, c: Readonly<bind.interface_ImVec2>, d: Readonly<bind.interface_ImVec2>, col: bind.ImU32): void {
        this.native.AddQuadFilled(a, b, c, d, col);
    }
    // IMGUI_API void  AddTriangle(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col, float thickness = 1.0f);
    public AddTriangle(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, c: Readonly<bind.interface_ImVec2>, col: bind.ImU32, thickness: number = 1.0): void {
        this.native.AddTriangle(a, b, c, col, thickness);
    }
    // IMGUI_API void  AddTriangleFilled(const ImVec2& a, const ImVec2& b, const ImVec2& c, ImU32 col);
    public AddTriangleFilled(a: Readonly<bind.interface_ImVec2>, b: Readonly<bind.interface_ImVec2>, c: Readonly<bind.interface_ImVec2>, col: bind.ImU32): void {
        this.native.AddTriangleFilled(a, b, c, col);
    }
    // IMGUI_API void  AddCircle(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f);
    public AddCircle(centre: Readonly<bind.interface_ImVec2>, radius: number, col: bind.ImU32, num_segments: number = 12, thickness: number = 1.0): void {
        this.native.AddCircle(centre, radius, col, num_segments, thickness);
    }
    // IMGUI_API void  AddCircleFilled(const ImVec2& centre, float radius, ImU32 col, int num_segments = 12);
    public AddCircleFilled(centre: Readonly<bind.interface_ImVec2>, radius: number, col: bind.ImU32, num_segments: number = 12): void {
        this.native.AddCircleFilled(centre, radius, col, num_segments);
    }
    // IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    public AddText(pos: Readonly<bind.interface_ImVec2>, col: bind.ImU32, text_begin: string, text_end: number | null = null): void {
        this.native.AddText(pos, col, text_begin, text_end);
    }
    // IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    public AddText_Font(font: ImFont, font_size: number, pos: Readonly<bind.interface_ImVec2>, col: bind.ImU32, text_begin: string, text_end: number | null = null, wrap_width: number = 0.0, cpu_fine_clip_rect: Readonly<bind.interface_ImVec4> | null = null): void {
        this.native.AddText_Font(font.native, font_size, pos, col, text_begin, text_end, wrap_width, cpu_fine_clip_rect);
    }
    // IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a = ImVec2(0,0), const ImVec2& uv_b = ImVec2(1,0), const ImVec2& uv_c = ImVec2(1,1), const ImVec2& uv_d = ImVec2(0,1), ImU32 col = 0xFFFFFFFF);
    // IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col, float rounding, int rounding_corners = ImDrawCornerFlags_All);
    // IMGUI_API void  AddPolyline(const ImVec2* points, const int num_points, ImU32 col, bool closed, float thickness);
    // IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, const int num_points, ImU32 col);
    // IMGUI_API void  AddBezierCurve(const ImVec2& pos0, const ImVec2& cp0, const ImVec2& cp1, const ImVec2& pos1, ImU32 col, float thickness, int num_segments = 0);
    public AddBezierCurve(pos0: Readonly<bind.interface_ImVec2>, cp0: Readonly<bind.interface_ImVec2>, cp1: Readonly<bind.interface_ImVec2>, pos1: Readonly<bind.interface_ImVec2>, col: bind.ImU32, thickness: number = 1.0, num_segments: number = 0): void {
        this.native.AddBezierCurve(pos0, cp0, cp1, pos1, col, thickness, num_segments);
    }

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

// All draw data to render an ImGui frame
export class ImDrawData
{
    constructor(public readonly native: bind.reference_ImDrawData) {}

    IterateDrawLists(callback: (draw_list: ImDrawList) => void): void {
        this.native.IterateDrawLists((draw_list: bind.reference_ImDrawList): void => {
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
    // IMGUI_API void ScaleClipRects(const ImVec2& sc);  // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
    public ScaleClipRects(sc: Readonly<bind.interface_ImVec2>): void {
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
    constructor(public readonly native: bind.reference_ImFontAtlas) {}

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
    GetTexDataAsRGBA32(): { pixels: Uint8Array, width: number, height: number } {
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
    get TexID(): bind.ImTextureID { return this.native.getTexID(); }
    set TexID(value: bind.ImTextureID) { this.native.setTexID(value); }
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
    constructor(public readonly native: bind.reference_ImFont) {}

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
    GetDebugName(): string { return this.native.GetDebugName(); }

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

// a script version of bind.ImGuiStyle with matching interface
class script_ImGuiStyle implements bind.interface_ImGuiStyle {
    Alpha: number = 1.0;                                     // Global alpha applies to everything in ImGui
    private WindowPadding: ImVec2 = new ImVec2(8,8);         // Padding within a window
    getWindowPadding(): bind.interface_ImVec2 { return this.WindowPadding; }
    WindowRounding: number = 7.0;                            // Radius of window corners rounding. Set to 0.0f to have rectangular windows
    WindowBorderSize: number = 0.0;                          // Thickness of border around windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    private WindowMinSize: ImVec2 = new ImVec2(32,32);       // Minimum window size
    getWindowMinSize(): bind.interface_ImVec2 { return this.WindowMinSize; }
    private WindowTitleAlign: ImVec2 = new ImVec2(0.0,0.5);  // Alignment for title bar text. Defaults to (0.0f,0.5f) for left-aligned,vertically centered.
    getWindowTitleAlign(): bind.interface_ImVec2 { return this.WindowTitleAlign; }
    ChildRounding: number = 0.0;                             // Radius of child window corners rounding. Set to 0.0f to have rectangular windows.
    ChildBorderSize: number = 1.0;                           // Thickness of border around child windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    PopupRounding: number = 0.0;                             // Radius of popup window corners rounding.
    PopupBorderSize: number = 1.0;                           // Thickness of border around popup windows. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    private FramePadding: ImVec2 = new ImVec2(4,3);          // Padding within a framed rectangle (used by most widgets)
    getFramePadding(): bind.interface_ImVec2 { return this.FramePadding; }
    FrameRounding: number = 0.0;                             // Radius of frame corners rounding. Set to 0.0f to have rectangular frame (used by most widgets).
    FrameBorderSize: number = 0.0;                           // Thickness of border around frames. Generally set to 0.0f or 1.0f. (Other values are not well tested and more CPU/GPU costly)
    private ItemSpacing: ImVec2 = new ImVec2(8,4);           // Horizontal and vertical spacing between widgets/lines
    getItemSpacing(): bind.interface_ImVec2 { return this.ItemSpacing; }
    private ItemInnerSpacing: ImVec2 = new ImVec2(4,4);      // Horizontal and vertical spacing between within elements of a composed widget (e.g. a slider and its label)
    getItemInnerSpacing(): bind.interface_ImVec2 { return this.ItemInnerSpacing; }
    private TouchExtraPadding: ImVec2 = new ImVec2(0,0);     // Expand reactive bounding box for touch-based system where touch position is not accurate enough. Unfortunately we don't sort widgets so priority on overlap will always be given to the first widget. So don't grow this too much!
    getTouchExtraPadding(): bind.interface_ImVec2 { return this.TouchExtraPadding; }
    IndentSpacing: number = 21.0;                            // Horizontal indentation when e.g. entering a tree node. Generally == (FontSize + FramePadding.x*2).
    ColumnsMinSpacing: number = 6.0;                         // Minimum horizontal spacing between two columns
    ScrollbarSize: number = 16.0;                            // Width of the vertical scrollbar, Height of the horizontal scrollbar
    ScrollbarRounding: number = 9.0;                         // Radius of grab corners for scrollbar
    GrabMinSize: number = 10.0;                              // Minimum width/height of a grab box for slider/scrollbar.
    GrabRounding: number = 0.0;                              // Radius of grabs corners rounding. Set to 0.0f to have rectangular slider grabs.
    private ButtonTextAlign: ImVec2 = new ImVec2(0.5,0.5);   // Alignment of button text when button is larger than text. Defaults to (0.5f,0.5f) for horizontally+vertically centered.
    getButtonTextAlign(): bind.interface_ImVec2 { return this.ButtonTextAlign; }
    private DisplayWindowPadding: ImVec2 = new ImVec2(22,22);// Window positions are clamped to be visible within the display area by at least this amount. Only covers regular windows.
    getDisplayWindowPadding(): bind.interface_ImVec2 { return this.DisplayWindowPadding; }
    private DisplaySafeAreaPadding: ImVec2 = new ImVec2(4,4);// If you cannot see the edge of your screen (e.g. on a TV) increase the safe area padding. Covers popups/tooltips as well regular windows.
    getDisplaySafeAreaPadding(): bind.interface_ImVec2 { return this.DisplaySafeAreaPadding; }
    AntiAliasedLines: boolean = true;                        // Enable anti-aliasing on lines/borders. Disable if you are really tight on CPU/GPU.
    AntiAliasedFill: boolean = true;                         // Enable anti-aliasing on filled shapes (rounded rectangles, circles, etc.)
    CurveTessellationTol: number = 1.25;                     // Tessellation tolerance when using PathBezierCurveTo() without a specific number of segments. Decrease for highly tessellated curves (higher quality, more polygons), increase to reduce quality.
    private Colors: ImVec4[] = [];
    getColorsAt(index: number): bind.interface_ImVec4 { return this.Colors[index]; }
    setColorsAt(index: number, color: Readonly<bind.interface_ImVec4>): boolean { this.Colors[index].Copy(color); return true; }

    constructor() {
        for (let i = 0; i < bind.ImGuiCol.COUNT; ++i) {
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
    constructor(public readonly internal: bind.interface_ImGuiStyle = new script_ImGuiStyle()) {}

    get Alpha(): number { return this.internal.Alpha; } set Alpha(value: number) { this.internal.Alpha = value; }
    get WindowPadding(): bind.interface_ImVec2 { return this.internal.getWindowPadding(); }
    get WindowRounding(): number { return this.internal.WindowRounding; } set WindowRounding(value: number) { this.internal.WindowRounding = value; }
    get WindowBorderSize(): number { return this.internal.WindowBorderSize; } set WindowBorderSize(value: number) { this.internal.WindowBorderSize = value; }
    get WindowMinSize(): bind.interface_ImVec2 { return this.internal.getWindowMinSize(); }
    get WindowTitleAlign(): bind.interface_ImVec2 { return this.internal.getWindowTitleAlign(); }
    get ChildRounding(): number { return this.internal.ChildRounding; } set ChildRounding(value: number) { this.internal.ChildRounding = value; }
    get ChildBorderSize(): number { return this.internal.ChildBorderSize; } set ChildBorderSize(value: number) { this.internal.ChildBorderSize = value; }
    get PopupRounding(): number { return this.internal.PopupRounding; } set PopupRounding(value: number) { this.internal.PopupRounding = value; }
    get PopupBorderSize(): number { return this.internal.PopupBorderSize; } set PopupBorderSize(value: number) { this.internal.PopupBorderSize = value; }
    get FramePadding(): bind.interface_ImVec2 { return this.internal.getFramePadding(); }
    get FrameRounding(): number { return this.internal.FrameRounding; } set FrameRounding(value: number) { this.internal.FrameRounding = value; }
    get FrameBorderSize(): number { return this.internal.FrameBorderSize; } set FrameBorderSize(value: number) { this.internal.FrameBorderSize = value; }
    get ItemSpacing(): bind.interface_ImVec2 { return this.internal.getItemSpacing(); }
    get ItemInnerSpacing(): bind.interface_ImVec2 { return this.internal.getItemInnerSpacing(); }
    get TouchExtraPadding(): bind.interface_ImVec2 { return this.internal.getTouchExtraPadding(); }
    get IndentSpacing(): number { return this.internal.IndentSpacing; } set IndentSpacing(value: number) { this.internal.IndentSpacing = value; }
    get ColumnsMinSpacing(): number { return this.internal.ColumnsMinSpacing; } set ColumnsMinSpacing(value: number) { this.internal.ColumnsMinSpacing = value; }
    get ScrollbarSize(): number { return this.internal.ScrollbarSize; } set ScrollbarSize(value: number) { this.internal.ScrollbarSize = value; }
    get ScrollbarRounding(): number { return this.internal.ScrollbarRounding; } set ScrollbarRounding(value: number) { this.internal.ScrollbarRounding = value; }
    get GrabMinSize(): number { return this.internal.GrabMinSize; } set GrabMinSize(value: number) { this.internal.GrabMinSize = value; }
    get GrabRounding(): number { return this.internal.GrabRounding; } set GrabRounding(value: number) { this.internal.GrabRounding = value; }
    get ButtonTextAlign(): bind.interface_ImVec2 { return this.internal.getButtonTextAlign(); }
    get DisplayWindowPadding(): bind.interface_ImVec2 { return this.internal.getDisplayWindowPadding(); }
    get DisplaySafeAreaPadding(): bind.interface_ImVec2 { return this.internal.getDisplaySafeAreaPadding(); }
    get AntiAliasedLines(): boolean { return this.internal.AntiAliasedLines; } set AntiAliasedLines(value: boolean) { this.internal.AntiAliasedLines = value; }
    get AntiAliasedFill(): boolean { return this.internal.AntiAliasedFill; } set AntiAliasedFill(value: boolean) { this.internal.AntiAliasedFill = value; }
    get CurveTessellationTol(): number { return this.internal.CurveTessellationTol; } set CurveTessellationTol(value: number) { this.internal.CurveTessellationTol = value; }
    public Colors: bind.interface_ImVec4[] = new Proxy([], {
        get: (target: bind.interface_ImVec4[], key: PropertyKey): number | bind.interface_ImVec4 => {
            if (key === "length") { return bind.ImGuiCol.COUNT; }
            return this.internal.getColorsAt(Number(key));
        },
        set: (target: bind.interface_ImVec4[], key: PropertyKey, value: Readonly<bind.interface_ImVec4>): boolean => {
            return this.internal.setColorsAt(Number(key), value);
        }
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
        this.AntiAliasedLines = other.AntiAliasedLines;
        this.AntiAliasedFill = other.AntiAliasedFill;
        this.CurveTessellationTol = other.CurveTessellationTol;
        for (let i = 0; i < bind.ImGuiCol.COUNT; ++i) {
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
    static RenderDrawListsFn: (draw_data: ImDrawData) => void;

    constructor(public readonly native: bind.reference_ImGuiIO) {}

    //------------------------------------------------------------------
    // Settings (fill once)                 // Default value:
    //------------------------------------------------------------------

    // ImVec2        DisplaySize;              // <unset>              // Display size, in pixels. For clamping windows positions.
    get DisplaySize(): bind.reference_ImVec2 { return this.native.getDisplaySize(); }
    // float         DeltaTime;                // = 1.0f/60.0f         // Time elapsed since last frame, in seconds.
    get DeltaTime(): number { return this.native.DeltaTime; }
    set DeltaTime(value: number) { this.native.DeltaTime = value; }
    // float         IniSavingRate;            // = 5.0f               // Maximum time between saving positions/sizes to .ini file, in seconds.
    // const char*   IniFilename;              // = "imgui.ini"        // Path to .ini file. NULL to disable .ini saving.
    // const char*   LogFilename;              // = "imgui_log.txt"    // Path to .log file (default parameter to ImGui::LogToFile when no file is specified).
    // float         MouseDoubleClickTime;     // = 0.30f              // Time for a double-click, in seconds.
    // float         MouseDoubleClickMaxDist;  // = 6.0f               // Distance threshold to stay in to validate a double-click, in pixels.
    // float         MouseDragThreshold;       // = 6.0f               // Distance threshold before considering we are dragging
    // int           KeyMap[ImGuiKey_COUNT];   // <unset>              // Map of indices into the KeysDown[512] entries array
    public KeyMap: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return bind.ImGuiKey.COUNT; }
            return this.native.getKeyMapAt(Number(key));
        },
        set: (target: number[], key: PropertyKey, value: number): boolean => {
            return this.native.setKeyMapAt(Number(key), value);
        }
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
    get DisplayFramebufferScale(): bind.reference_ImVec2 { return this.native.getDisplayFramebufferScale(); }
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
    get RenderDrawListsFn(): (draw_data: ImDrawData) => void { return ImGuiIO.RenderDrawListsFn; }
    set RenderDrawListsFn(value: (draw_data: ImDrawData) => void) { ImGuiIO.RenderDrawListsFn = value; }

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
    get MousePos(): bind.reference_ImVec2 { return this.native.getMousePos(); }
    // bool        MouseDown[5];               // Mouse buttons: left, right, middle + extras. ImGui itself mostly only uses left button (BeginPopupContext** are using right button). Others buttons allows us to track if the mouse is being used by your application + available to user as a convenience via IsMouse** API.
    public MouseDown: boolean[] = new Proxy([], {
        get: (target: boolean[], key: PropertyKey): number | boolean => {
            if (key === "length") { return 5; }
            return this.native.getMouseDownAt(Number(key));
        },
        set: (target: boolean[], key: PropertyKey, value: boolean): boolean => {
            return this.native.setMouseDownAt(Number(key), value);
        }
    });
    // float       MouseWheel;                 // Mouse wheel: 1 unit scrolls about 5 lines text.
    public get MouseWheel(): number { return this.native.MouseWheel; }
    public set MouseWheel(value: number) { this.native.MouseWheel = value; }
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
        }
    });
    // ImWchar     InputCharacters[16+1];      // List of characters input (translated by user from keypress+keyboard state). Fill using AddInputCharacter() helper.
    
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
    // float       Framerate;                  // Application framerate estimation, in frame per second. Solely for convenience. Rolling average estimation based on IO.DeltaTime over 120 frames
    get Framerate(): number { return this.native.Framerate; }
    // int         MetricsAllocs;              // Number of active memory allocations
    // int         MetricsRenderVertices;      // Vertices output during last call to Render()
    // int         MetricsRenderIndices;       // Indices output during last call to Render() = number of triangles * 3
    // int         MetricsActiveWindows;       // Number of visible root windows (exclude child windows)
    // ImVec2      MouseDelta;                 // Mouse delta. Note that this is zero if either current or previous position are invalid (-FLT_MAX,-FLT_MAX), so a disappearing/reappearing mouse won't have a huge delta.
    get MouseDelta(): Readonly<bind.reference_ImVec2> { return this.native.getMouseDelta(); }

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
    public MouseDownDuration: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return 5; }
            return this.native.getMouseDownDurationAt(Number(key));
        }
    });
    // float       MouseDownDurationPrev[5];   // Previous time the mouse button has been down
    // ImVec2      MouseDragMaxDistanceAbs[5]; // Maximum distance, absolute, on each axis, of how much mouse has traveled from the clicking point
    // float       MouseDragMaxDistanceSqr[5]; // Squared maximum distance of how much mouse has traveled from the clicking point
    // float       KeysDownDuration[512];      // Duration the keyboard key has been down (0.0f == just pressed)
    public KeysDownDuration: number[] = new Proxy([], {
        get: (target: number[], key: PropertyKey): number => {
            if (key === "length") { return 512; }
            return this.native.getKeysDownDurationAt(Number(key));
        }
    });
    // float       KeysDownDurationPrev[512];  // Previous duration the key has been down

    // IMGUI_API   ImGuiIO();
}

// Main
// IMGUI_API ImGuiIO&      GetIO();
export function GetIO(): ImGuiIO { return new ImGuiIO(bind.GetIO()); }
// IMGUI_API ImGuiStyle&   GetStyle();
export function GetStyle(): ImGuiStyle { return new ImGuiStyle(bind.GetStyle()); }
// IMGUI_API ImDrawData*   GetDrawData();                              // same value as passed to your io.RenderDrawListsFn() function. valid after Render() and until the next call to NewFrame()
export function GetDrawData(): ImDrawData | null {
    const draw_data: bind.reference_ImDrawData | null = bind.GetDrawData();
    return (draw_data === null) ? null : new ImDrawData(draw_data);
}
// IMGUI_API void          NewFrame();                                 // start a new ImGui frame, you can submit any command from this point until Render()/EndFrame().
export function NewFrame(): void { bind.NewFrame(); }
// IMGUI_API void          Render();                                   // ends the ImGui frame, finalize the draw data, then call your io.RenderDrawListsFn() function if set.
export function Render(): void {
    bind.Render();
    const io: ImGuiIO = GetIO();
    if (io.RenderDrawListsFn) {
        const draw_data: bind.reference_ImDrawData | null = bind.GetDrawData();
        if (draw_data) {
            io.RenderDrawListsFn(new ImDrawData(draw_data));
        }
    }
}
// IMGUI_API void          EndFrame();                                 // ends the ImGui frame. automatically called by Render(), so most likely don't need to ever call that yourself directly. If you don't need to render you may call EndFrame() but you'll have wasted CPU already. If you don't need to render, better to not create any imgui windows instead!
export function EndFrame(): void { bind.EndFrame(); }
// IMGUI_API void          Shutdown();
export function Shutdown(): void { bind.Shutdown(); }

// Demo, Debug, Informations
// IMGUI_API void          ShowDemoWindow(bool* p_open = NULL);        // create demo/test window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!
export function ShowDemoWindow(p_open: bind.ImScalar<boolean> | null = null): void { bind.ShowDemoWindow(p_open); }
// IMGUI_API void          ShowMetricsWindow(bool* p_open = NULL);     // create metrics window. display ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.
export function ShowMetricsWindow(p_open: bind.ImScalar<boolean> | bind.ImAccess<boolean> | null = null): void {
    if (p_open === null) {
        bind.ShowMetricsWindow(null);
    } else if (Array.isArray(p_open)) {
        bind.ShowMetricsWindow(p_open);
    } else {
        const ref_open: bind.ImScalar<boolean> = [ p_open() ];
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

// Window
// IMGUI_API bool          Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);                                                   // push window to the stack and start appending to it. see .cpp for details. return false when window is collapsed, so you can early out in your code. 'bool* p_open' creates a widget on the upper-right to close the window (which sets your bool to false).
export function Begin(name: string, open: bind.ImScalar<boolean> | bind.ImAccess<boolean> | null = null, flags: bind.ImGuiWindowFlags = 0): boolean {
    if (open === null) {
        return bind.Begin(name, null, flags);
    } else if (Array.isArray(open)) {
        return bind.Begin(name, open, flags);
    } else {
        const ref_open: bind.ImScalar<boolean> = [ open() ];
        const opened: boolean = bind.Begin(name, ref_open, flags);
        open(ref_open[0]);
        return opened;
    }
}
// IMGUI_API void          End();                                                                                                                      // finish appending to current window, pop it off the window stack.
export { End } from "./bind-imgui";
// IMGUI_API bool          BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);    // begin a scrolling region. size==0.0f: use remaining window size, size<0.0f: use remaining window size minus abs(size). size>0.0f: fixed size. each axis can use a different mode, e.g. ImVec2(0,400).
// IMGUI_API bool          BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags extra_flags = 0);            // "
export function BeginChild(id: string | bind.ImGuiID, size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, border: boolean = false, extra_flags: bind.ImGuiWindowFlags = 0): boolean {
    return bind.BeginChild(id, size, border, extra_flags);
}
// IMGUI_API void          EndChild();
export function EndChild(): void {
    bind.EndChild();
}
// IMGUI_API ImVec2        GetContentRegionMax();                                              // current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates
export function GetContentRegionMax(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetContentRegionMax(out);
}
// IMGUI_API ImVec2        GetContentRegionAvail();                                            // == GetContentRegionMax() - GetCursorPos()
export function GetContentRegionAvail(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetContentRegionAvail(out);
}
// IMGUI_API float         GetContentRegionAvailWidth();                                       //
export { GetContentRegionAvailWidth } from "./bind-imgui";
// IMGUI_API ImVec2        GetWindowContentRegionMin();                                        // content boundaries min (roughly (0,0)-Scroll), in window coordinates
export function GetWindowContentRegionMin(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowContentRegionMin(out);
}
// IMGUI_API ImVec2        GetWindowContentRegionMax();                                        // content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates
export function GetWindowContentRegionMax(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowContentRegionMax(out);
}
// IMGUI_API float         GetWindowContentRegionWidth();                                      //
export { GetWindowContentRegionWidth } from "./bind-imgui";
// IMGUI_API ImDrawList*   GetWindowDrawList();                                                // get rendering command-list if you want to append your own draw primitives
export function GetWindowDrawList(): ImDrawList {
    return new ImDrawList(bind.GetWindowDrawList());
}
// IMGUI_API ImVec2        GetWindowPos();                                                     // get current window position in screen space (useful if you want to do your own drawing via the DrawList api)
export function GetWindowPos(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowPos(out);
}
// IMGUI_API ImVec2        GetWindowSize();                                                    // get current window size
export function GetWindowSize(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetWindowSize(out);
}
// IMGUI_API float         GetWindowWidth();
export { GetWindowWidth } from "./bind-imgui";
// IMGUI_API float         GetWindowHeight();
export { GetWindowHeight } from "./bind-imgui";
// IMGUI_API bool          IsWindowCollapsed();
export { IsWindowCollapsed } from "./bind-imgui";
// IMGUI_API bool          IsWindowAppearing();
export { IsWindowAppearing } from "./bind-imgui";
// IMGUI_API void          SetWindowFontScale(float scale);                                    // per-window font scale. Adjust IO.FontGlobalScale if you want to scale all windows
export { SetWindowFontScale } from "./bind-imgui";

// IMGUI_API void          SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0)); // set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.
export function SetNextWindowPos(pos: Readonly<bind.interface_ImVec2>, cond: bind.ImGuiCond = 0, pivot: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.SetNextWindowPos(pos, cond, pivot);
}
// IMGUI_API void          SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);          // set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()
export function SetNextWindowSize(pos: Readonly<bind.interface_ImVec2>, cond: bind.ImGuiCond = 0): void {
    bind.SetNextWindowSize(pos, cond);
}
// IMGUI_API void          SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeConstraintCallback custom_callback = NULL, void* custom_callback_data = NULL); // set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Use callback to apply non-trivial programmatic constraints.
export function SetNextWindowSizeConstraints(size_min: Readonly<bind.interface_ImVec2>, size_max: Readonly<bind.interface_ImVec2>, custom_callback: ImGuiSizeConstraintCallback | null = null, custom_callback_data: any = null): void {
    if (custom_callback) {
        function _custom_callback(data: bind.ImGuiSizeConstraintCallbackData): void {
            const _data: ImGuiSizeConstraintCallbackData = new ImGuiSizeConstraintCallbackData(data);
            custom_callback ? custom_callback(_data) : 0;
            _data.delete();
        }
        bind.SetNextWindowSizeConstraints(size_min, size_max, _custom_callback, custom_callback_data);
    } else {
        bind.SetNextWindowSizeConstraints(size_min, size_max, null, null);
    }
}
// IMGUI_API void          SetNextWindowContentSize(const ImVec2& size);                       // set next window content size (~ enforce the range of scrollbars). not including window decorations (title bar, menu bar, etc.). set an axis to 0.0f to leave it automatic. call before Begin()
export function SetNextWindowContentSize(size: Readonly<bind.interface_ImVec2>): void {
    bind.SetNextWindowContentSize(size);
}
// IMGUI_API void          SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);         // set next window collapsed state. call before Begin()
export function SetNextWindowCollapsed(collapsed: boolean, cond: bind.ImGuiCond = 0): void {
    bind.SetNextWindowCollapsed(collapsed, cond);
}
// IMGUI_API void          SetNextWindowFocus();                                               // set next window to be focused / front-most. call before Begin()
export { SetNextWindowFocus } from "./bind-imgui";
// IMGUI_API void          SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                // (not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.
// IMGUI_API void          SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);              // (not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.    
// IMGUI_API void          SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);             // (not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().
// IMGUI_API void          SetWindowFocus();                                                   // (not recommended) set current window to be focused / front-most. prefer using SetNextWindowFocus().
// IMGUI_API void          SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);      // set named window position.
// IMGUI_API void          SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0);    // set named window size. set axis to 0.0f to force an auto-fit on this axis.
// IMGUI_API void          SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);   // set named window collapsed state
// IMGUI_API void          SetWindowFocus(const char* name);                                           // set named window to be focused / front-most. use NULL to remove focus.
export function SetWindowPos(name_or_pos: string | Readonly<bind.interface_ImVec2>, pos_or_cond: Readonly<bind.interface_ImVec2> | bind.ImGuiCond = 0, cond: bind.ImGuiCond = 0): void {
    if (typeof(name_or_pos) === "string") {
        bind.SetWindowNamePos(name_or_pos, pos_or_cond as Readonly<bind.interface_ImVec2>, cond);
        return;
    } else {
        bind.SetWindowPos(name_or_pos, pos_or_cond as bind.ImGuiCond);
    }
}
export function SetWindowSize(name_or_size: string | Readonly<bind.interface_ImVec2>, size_or_cond: Readonly<bind.interface_ImVec2> | bind.ImGuiCond = 0, cond: bind.ImGuiCond = 0): void {
    if (typeof(name_or_size) === "string") {
        bind.SetWindowNamePos(name_or_size, size_or_cond as Readonly<bind.interface_ImVec2>, cond);
    } else {
        bind.SetWindowSize(name_or_size, size_or_cond as bind.ImGuiCond);
    }
}
export function SetWindowCollapsed(name_or_collapsed: string | boolean, collapsed_or_cond: boolean | bind.ImGuiCond = 0, cond: bind.ImGuiCond = 0): void {
    if (typeof(name_or_collapsed) === "string") {
        bind.SetWindowNameCollapsed(name_or_collapsed, collapsed_or_cond as boolean, cond);
    } else {
        bind.SetWindowCollapsed(name_or_collapsed, collapsed_or_cond as bind.ImGuiCond);
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
export { GetScrollX } from "./bind-imgui";
// IMGUI_API float         GetScrollY();                                                       // get scrolling amount [0..GetScrollMaxY()]
export { GetScrollY } from "./bind-imgui";
// IMGUI_API float         GetScrollMaxX();                                                    // get maximum scrolling amount ~~ ContentSize.X - WindowSize.X
export { GetScrollMaxX } from "./bind-imgui";
// IMGUI_API float         GetScrollMaxY();                                                    // get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y
export { GetScrollMaxY } from "./bind-imgui";
// IMGUI_API void          SetScrollX(float scroll_x);                                         // set scrolling amount [0..GetScrollMaxX()]
export { SetScrollX } from "./bind-imgui";
// IMGUI_API void          SetScrollY(float scroll_y);                                         // set scrolling amount [0..GetScrollMaxY()]
export { SetScrollY } from "./bind-imgui";
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
export function PushStyleColor(idx: bind.ImGuiCol, col: bind.ImU32 | Readonly<bind.interface_ImVec4> | Readonly<ImColor>): void {
    if (col instanceof ImColor) {
        bind.PushStyleColor(idx, col.Value);
    } else {
        bind.PushStyleColor(idx, col as (bind.ImU32 | Readonly<bind.interface_ImVec4>));
    }
}
// IMGUI_API void          PopStyleColor(int count = 1);
export function PopStyleColor(count: number = 1): void {
    bind.PopStyleColor(count);
}
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, float val);
// IMGUI_API void          PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
export function PushStyleVar(idx: bind.ImGuiStyleVar, val: number | Readonly<bind.interface_ImVec2>): void {
    bind.PushStyleVar(idx, val);
}
// IMGUI_API void          PopStyleVar(int count = 1);
export function PopStyleVar(count: number = 1): void {
    bind.PopStyleVar(count);
}
// IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);                                    // retrieve style color as stored in ImGuiStyle structure. use to feed back into PushStyleColor(), otherwhise use GetColorU32() to get style color + style alpha.
export function GetStyleColorVec4(idx: bind.ImGuiCol): Readonly<bind.reference_ImVec4> {
    return bind.GetStyleColorVec4(idx);
}
// IMGUI_API ImFont*       GetFont();                                                          // get current font
export function GetFont(): ImFont {
    return new ImFont(bind.GetFont());
}
// IMGUI_API float         GetFontSize();                                                      // get current font size (= height in pixels) of current font with current scale applied
export { GetFontSize } from "./bind-imgui";
// IMGUI_API ImVec2        GetFontTexUvWhitePixel();                                           // get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API
export function GetFontTexUvWhitePixel(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetFontTexUvWhitePixel(out);
}
// IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);                  // retrieve given style color with style alpha applied and optional extra alpha multiplier
// IMGUI_API ImU32         GetColorU32(const ImVec4& col);                                     // retrieve given color with style alpha applied
// IMGUI_API ImU32         GetColorU32(ImU32 col);                                             // retrieve given color with style alpha applied
export function GetColorU32(idx: bind.ImGuiCol, alpha_mul: number = 1.0): bind.ImU32 {
    return bind.GetColorU32(idx, alpha_mul);
}

// Parameters stacks (current window)
// IMGUI_API void          PushItemWidth(float item_width);                                    // width of items for the common item+label case, pixels. 0.0f = default to ~2/3 of windows width, >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)
export { PushItemWidth } from "./bind-imgui";
// IMGUI_API void          PopItemWidth();
export { PopItemWidth } from "./bind-imgui";
// IMGUI_API float         CalcItemWidth();                                                    // width of item given pushed settings and current cursor position
export { CalcItemWidth } from "./bind-imgui";
// IMGUI_API void          PushTextWrapPos(float wrap_pos_x = 0.0f);                           // word-wrapping for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space
export function PushTextWrapPos(wrap_pos_x: number = 0.0): void {
    bind.PushTextWrapPos(wrap_pos_x);
}
// IMGUI_API void          PopTextWrapPos();
export { PopTextWrapPos } from "./bind-imgui";
// IMGUI_API void          PushAllowKeyboardFocus(bool allow_keyboard_focus);                  // allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets
export { PushAllowKeyboardFocus } from "./bind-imgui";
// IMGUI_API void          PopAllowKeyboardFocus();
export { PopAllowKeyboardFocus } from "./bind-imgui";
// IMGUI_API void          PushButtonRepeat(bool repeat);                                      // in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.
export { PushButtonRepeat } from "./bind-imgui";
// IMGUI_API void          PopButtonRepeat();
export { PopButtonRepeat } from "./bind-imgui";

// Cursor / Layout
// IMGUI_API void          Separator();                                                        // separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.
export { Separator } from "./bind-imgui";
// IMGUI_API void          SameLine(float pos_x = 0.0f, float spacing_w = -1.0f);              // call between widgets or groups to layout them horizontally
export function SameLine(pos_x: number = 0.0, spacing_w: number = -1.0): void {
    bind.SameLine(pos_x, spacing_w);
}
// IMGUI_API void          NewLine();                                                          // undo a SameLine()
export { NewLine } from "./bind-imgui";
// IMGUI_API void          Spacing();                                                          // add vertical spacing
export { Spacing } from "./bind-imgui";
// IMGUI_API void          Dummy(const ImVec2& size);                                          // add a dummy item of given size
export function Dummy(size: Readonly<bind.interface_ImVec2>): void { bind.Dummy(size); }
// IMGUI_API void          Indent(float indent_w = 0.0f);                                      // move content position toward the right, by style.IndentSpacing or indent_w if != 0
export function Indent(indent_w: number = 0.0) { bind.Indent(indent_w); }
// IMGUI_API void          Unindent(float indent_w = 0.0f);                                    // move content position back to the left, by style.IndentSpacing or indent_w if != 0
export function Unindent(indent_w: number = 0.0) { bind.Unindent(indent_w); }
// IMGUI_API void          BeginGroup();                                                       // lock horizontal starting position + capture group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)
export { BeginGroup } from "./bind-imgui";
// IMGUI_API void          EndGroup();
export { EndGroup } from "./bind-imgui";
// IMGUI_API ImVec2        GetCursorPos();                                                     // cursor position is relative to window position
export function GetCursorPos(out: bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorPos(out); }
// IMGUI_API float         GetCursorPosX();                                                    // "
export { GetCursorPosX } from "./bind-imgui";
// IMGUI_API float         GetCursorPosY();                                                    // "
export { GetCursorPosY } from "./bind-imgui";
// IMGUI_API void          SetCursorPos(const ImVec2& local_pos);                              // "
export function SetCursorPos(local_pos: Readonly<bind.interface_ImVec2>): void { bind.SetCursorPos(local_pos); }
// IMGUI_API void          SetCursorPosX(float x);                                             // "
export { SetCursorPosX } from "./bind-imgui";
// IMGUI_API void          SetCursorPosY(float y);                                             // "
export { SetCursorPosY } from "./bind-imgui";
// IMGUI_API ImVec2        GetCursorStartPos();                                                // initial cursor position
export function GetCursorStartPos(out: bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorStartPos(out); }
// IMGUI_API ImVec2        GetCursorScreenPos();                                               // cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)
export function GetCursorScreenPos(out: bind.interface_ImVec2 = new ImVec2()): typeof out { return bind.GetCursorScreenPos(out); }
// IMGUI_API void          SetCursorScreenPos(const ImVec2& pos);                              // cursor position in absolute screen coordinates [0..io.DisplaySize]
export function SetCursorScreenPos(pos: Readonly<bind.interface_ImVec2>): void { bind.SetCursorScreenPos(pos); }
// IMGUI_API void          AlignTextToFramePadding();                                          // vertically align/lower upcoming text to FramePadding.y so that it will aligns to upcoming widgets (call if you have text on a line before regular widgets)
export { AlignTextToFramePadding } from "./bind-imgui";
// IMGUI_API float         GetTextLineHeight();                                                // ~ FontSize
export { GetTextLineHeight } from "./bind-imgui";
// IMGUI_API float         GetTextLineHeightWithSpacing();                                     // ~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)
export { GetTextLineHeightWithSpacing } from "./bind-imgui";
// IMGUI_API float         GetFrameHeight();                                                   // ~ FontSize + style.FramePadding.y * 2
export { GetFrameHeight } from "./bind-imgui";
// IMGUI_API float         GetFrameHeightWithSpacing();                                        // ~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
export { GetFrameHeightWithSpacing } from "./bind-imgui";

// Columns
// You can also use SameLine(pos_x) for simplified columns. The columns API is still work-in-progress and rather lacking.
// IMGUI_API void          Columns(int count = 1, const char* id = NULL, bool border = true);
export function Columns(count: number = 1, id: string | null = null, border: boolean = true): void {
    id = id || "";
    bind.Columns(count, id, border);
}
// IMGUI_API void          NextColumn();                                                       // next column, defaults to current row or next row if the current row is finished
export { NextColumn } from "./bind-imgui";
// IMGUI_API int           GetColumnIndex();                                                   // get current column index
export { GetColumnIndex } from "./bind-imgui";
// IMGUI_API float         GetColumnWidth(int column_index = -1);                              // get column width (in pixels). pass -1 to use current column
export function GetColumnWidth(column_index: number = -1): number {
    return bind.GetColumnWidth(column_index);
}
// IMGUI_API void          SetColumnWidth(int column_index, float width);                      // set column width (in pixels). pass -1 to use current column
export { SetColumnWidth } from "./bind-imgui";
// IMGUI_API float         GetColumnOffset(int column_index = -1);                             // get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f
export function GetColumnOffset(column_index: number = -1): number {
    return bind.GetColumnOffset(column_index);
}
// IMGUI_API void          SetColumnOffset(int column_index, float offset_x);                  // set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column
export { SetColumnOffset } from "./bind-imgui";
// IMGUI_API int           GetColumnsCount();
export { GetColumnsCount } from "./bind-imgui";

// ID scopes
// If you are creating widgets in a loop you most likely want to push a unique identifier (e.g. object pointer, loop index) so ImGui can differentiate them.
// You can also use the "##foobar" syntax within widget label to distinguish them from each others. Read "A primer on the use of labels/IDs" in the FAQ for more details.
// IMGUI_API void          PushID(const char* str_id);                                         // push identifier into the ID stack. IDs are hash of the entire stack!
// IMGUI_API void          PushID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API void          PushID(const void* ptr_id);
// IMGUI_API void          PushID(int int_id);
export { PushID } from "./bind-imgui";
// IMGUI_API void          PopID();
export { PopID } from "./bind-imgui";
// IMGUI_API ImGuiID       GetID(const char* str_id);                                          // calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself
// IMGUI_API ImGuiID       GetID(const char* str_id_begin, const char* str_id_end);
// IMGUI_API ImGuiID       GetID(const void* ptr_id);
export { GetID } from "./bind-imgui";

// Widgets: Text
// IMGUI_API void          TextUnformatted(const char* text, const char* text_end = NULL);               // raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.
export function TextUnformatted(text: string): void { bind.TextUnformatted(text); }
// IMGUI_API void          Text(const char* fmt, ...)                                     IM_FMTARGS(1); // simple formatted text
// IMGUI_API void          TextV(const char* fmt, va_list args)                           IM_FMTLIST(1);
export function Text(fmt: string/*, ...args: any[]*/): void { bind.Text(fmt/*, ...args*/); }
// IMGUI_API void          TextColored(const ImVec4& col, const char* fmt, ...)           IM_FMTARGS(2); // shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();
// IMGUI_API void          TextColoredV(const ImVec4& col, const char* fmt, va_list args) IM_FMTLIST(2);
export function TextColored(col: Readonly<bind.interface_ImVec4> | Readonly<ImColor>, fmt: string/*, ...args: any[]*/): void {
    bind.TextColored((col instanceof ImColor) ? col.Value : col as Readonly<bind.interface_ImVec4>, fmt/*, ...args*/);
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
export { Bullet } from "./bind-imgui";

// Widgets: Main
// IMGUI_API bool          Button(const char* label, const ImVec2& size = ImVec2(0,0));            // button
export function Button(label: string, size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    return bind.Button(label, size);
}
// IMGUI_API bool          SmallButton(const char* label);                                         // button with FramePadding=(0,0) to easily embed within text
export { SmallButton } from "./bind-imgui";
// IMGUI_API bool          InvisibleButton(const char* str_id, const ImVec2& size);                // button behavior without the visuals, useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)
export function InvisibleButton(str_id: string, size: Readonly<bind.interface_ImVec2>): boolean {
    return bind.InvisibleButton(str_id, size);
}
// IMGUI_API void          Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0));
export function Image(user_texture_id: any, size: Readonly<bind.interface_ImVec2>, uv0: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, uv1: Readonly<bind.interface_ImVec2> = ImVec2.UNIT, tint_col: Readonly<bind.interface_ImVec4> = ImVec4.WHITE, border_col: Readonly<bind.interface_ImVec4> = ImVec4.ZERO): void {
    bind.Image(user_texture_id, size, uv0, uv1, tint_col, border_col);
}
// IMGUI_API bool          ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1));    // <0 frame_padding uses default frame padding settings. 0 for no padding
export function ImageButton(user_texture_id: any, size: Readonly<bind.interface_ImVec2>, uv0: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, uv1: Readonly<bind.interface_ImVec2> = ImVec2.UNIT, frame_padding: number = -1, bg_col: Readonly<bind.interface_ImVec4> = ImVec4.ZERO, tint_col: Readonly<bind.interface_ImVec4> = ImVec4.WHITE): void {
    return bind.ImageButton(user_texture_id, size, uv0, uv1, frame_padding, bg_col, tint_col);
}
// IMGUI_API bool          Checkbox(const char* label, bool* v);
export function Checkbox(label: string, v: bind.ImScalar<boolean> | bind.ImAccess<boolean>): boolean {
    if (Array.isArray(v)) {
        return bind.Checkbox(label, v);
    } else {
        const ref_v: bind.ImScalar<boolean> = [ v() ];
        const ret = bind.Checkbox(label, ref_v);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
export function CheckboxFlags(label: string, flags: bind.ImScalar<number>, flags_value: number): boolean {
    return bind.CheckboxFlags(label, flags, flags_value);
}
// IMGUI_API bool          RadioButton(const char* label, bool active);
// IMGUI_API bool          RadioButton(const char* label, int* v, int v_button);
export function RadioButton(label: string, active_or_v: boolean | bind.ImAccess<number> | bind.ImScalar<number>, v_button?: number): boolean {
    if (typeof(active_or_v) === "boolean" || Array.isArray(active_or_v)) {
        return bind.RadioButton(label, active_or_v, v_button);
    } else {
        const ref_v: bind.ImScalar<number> = [ active_or_v() ];
        const ret = bind.RadioButton(label, ref_v, v_button);
        active_or_v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API void          PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
export function PlotLines_Array(label: string, values: ArrayLike<number>, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, stride: number = 1): void {
    function values_getter(data: any, idx: number): number {
        return values[idx];
    }
    PlotLines_Callback(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotLines(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotLines_Callback(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.PlotLines(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
export function PlotLines(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): void {
    PlotLines_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0), int stride = sizeof(float));
export function PlotHistogram_Array(label: string, values: ArrayLike<number>, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, stride: number = 1): void {
    function values_getter(data: any, idx: number): number {
        return values[idx];
    }
    PlotHistogram(label, values_getter, null, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          PlotHistogram(const char* label, float (*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0,0));
export function PlotHistogram_Callback(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): void {
    bind.PlotHistogram(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
export function PlotHistogram(label: string, values_getter: (data: any, idx: number) => number, data: any, values_count: number = 0, value_offset: number = 0, overlay_text: string | null = null, scale_min: number | null = null, scale_max: number | null = null, graph_size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): void {
    PlotHistogram_Callback(label, values_getter, data, values_count, value_offset, overlay_text, scale_min, scale_max, graph_size);
}
// IMGUI_API void          ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL);
export function ProgressBar(fraction: number, size_arg: Readonly<bind.interface_ImVec2> = new ImVec2(-1,0), overlay: string | null = null): void {
    bind.ProgressBar(fraction, size_arg, overlay);
}

// Widgets: Combo Box
// The new BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it. 
// The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.
// IMGUI_API bool          BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
export function BeginCombo(label: string, preview_value: string | null, flags: bind.ImGuiComboFlags = 0): boolean {
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
    return (bind.GetFontSize() + style.ItemSpacing.y) * items_count - style.ItemSpacing.y + (style.WindowPadding.y * 2)
}
export function Combo(label: string, current_item: bind.ImAccess<number> | bind.ImScalar<number>, items: string[] | string, items_count: number = items.length, popup_max_height_in_items: number = -1): boolean {
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
    if (popup_max_height_in_items != -1 /*&& !g.SetNextWindowSizeConstraint*/)
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
export function Combo_2(label: string, current_item: bind.ImScalar<number>, items: string, popup_max_height_in_items: number = -1): boolean {
    return false;
}
export function Combo_3(label: string, current_item: bind.ImScalar<number>, items_getter: (data: any, idx: number, out_text: bind.ImScalar<string>) => boolean, data: any, items_count: number, popup_max_height_in_items: number = -1): boolean {
    return false;
}
// export function Combo(label: string, current_item: bind.ImScalar<number>, ...args: any[]): boolean {
//     return false;
// }

// Widgets: Drags (tip: ctrl+click on a drag box to input with keyboard. manually input values aren't clamped, can go off-bounds)
// For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
// IMGUI_API bool          DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);     // If v_min >= v_max we have no bound
export function DragFloat(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string | null = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.DragFloat(label, v, v_speed, v_min, v_max, display_format, power);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret = bind.DragFloat(label, ref_v, v_speed, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number> | ImVec2, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (v instanceof ImVec2) {
        const _v: bind.ImTuple2<number> = [ v.x, v.y ];
        const ret = bind.DragFloat2(label, _v, v_speed, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    } else {
        return bind.DragFloat2(label, v, v_speed, v_min, v_max, display_format, power);
    }
}
// IMGUI_API bool          DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.DragFloat3(label, v, v_speed, v_min, v_max, display_format, power);
}
// IMGUI_API bool          DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* display_format = "%.3f", float power = 1.0f);
export function DragFloat4(label: string, v: bind.ImTuple4<number> | ImVec4, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (v instanceof ImVec4) {
        const _v: bind.ImTuple4<number> = [ v.x, v.y, v.z, v.w ];
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
export function DragFloatRange2(label: string, v_current_min: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_current_max: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0.0, v_max: number = 0.0, display_format: string = "%.3f", display_format_max: string | null = null, power: number = 1.0): boolean {
    const ref_v_current_min: bind.ImScalar<number> = Array.isArray(v_current_min) ? v_current_min as any : [ v_current_min() ];
    const ref_v_current_max: bind.ImScalar<number> = Array.isArray(v_current_max) ? v_current_max as any : [ v_current_max() ];
    const ret = bind.DragFloatRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max, power);
    if (!Array.isArray(v_current_min)) { v_current_min(ref_v_current_min[0]); }
    if (!Array.isArray(v_current_max)) { v_current_max(ref_v_current_max[0]); }
    return ret;

}
// IMGUI_API bool          DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");                                       // If v_min >= v_max we have no bound
export function DragInt(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.DragInt(label, v, v_speed, v_min, v_max, display_format);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret = bind.DragInt(label, ref_v, v_speed, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt2(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt3(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f");
export function DragInt4(label: string, v: bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f"): boolean {
    return bind.DragInt4(label, v, v_speed, v_min, v_max, display_format);
}
// IMGUI_API bool          DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* display_format = "%.0f", const char* display_format_max = NULL);
export function DragIntRange2(label: string, v_current_min: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_current_max: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_speed: number = 1.0, v_min: number = 0, v_max: number = 0, display_format: string = "%.0f", display_format_max: string | null = null): boolean {
    const ref_v_current_min: bind.ImScalar<number> = Array.isArray(v_current_min) ? v_current_min as any : [ v_current_min() ];
    const ref_v_current_max: bind.ImScalar<number> = Array.isArray(v_current_max) ? v_current_max as any : [ v_current_max() ];
    const ret = bind.DragIntRange2(label, ref_v_current_min, ref_v_current_max, v_speed, v_min, v_max, display_format, display_format_max);
    if (!Array.isArray(v_current_min)) { v_current_min(ref_v_current_min[0]); }
    if (!Array.isArray(v_current_max)) { v_current_max(ref_v_current_max[0]); }
    return ret;
}

// Widgets: Input with Keyboard
// IMGUI_API bool          InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
export function InputText(label: string, buf: ImStringBuffer | bind.ImAccess<string> | bind.ImScalar<string>, buf_size: number = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, flags: bind.ImGuiInputTextFlags = 0, callback: ImGuiTextEditCallback | null = null, user_data: any = null): boolean {
    function _callback(data: bind.ImGuiTextEditCallbackData): number {
        const _data: ImGuiTextEditCallbackData = new ImGuiTextEditCallbackData(data);
        const ret: number = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputText(label, buf, buf_size, flags, callback === null ? null : _callback, user_data);
    }else if (buf instanceof ImStringBuffer) {
        const ref_buf: bind.ImScalar<string> = [ buf.buffer ];
        const _buf_size: number = Math.min(buf_size, buf.size);
        let ret: boolean = bind.InputText(label, ref_buf, _buf_size, flags, callback === null ? null : _callback, user_data);
        buf.buffer = ref_buf[0];
        return ret;
    } else {
        const ref_buf: bind.ImScalar<string> = [ buf() ];
        let ret: boolean = bind.InputText(label, ref_buf, buf_size, flags, callback === null ? null : _callback, user_data);
        buf(ref_buf[0]);
        return ret;
    }
}
// IMGUI_API bool          InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiTextEditCallback callback = NULL, void* user_data = NULL);
export function InputTextMultiline(label: string, buf: ImStringBuffer | bind.ImAccess<string> | bind.ImScalar<string>, buf_size: number = buf instanceof ImStringBuffer ? buf.size : ImGuiTextEditDefaultSize, size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO, flags: bind.ImGuiInputTextFlags = 0, callback: ImGuiTextEditCallback | null = null, user_data: any = null): boolean {
    function _callback(data: bind.ImGuiTextEditCallbackData): number {
        const _data: ImGuiTextEditCallbackData = new ImGuiTextEditCallbackData(data);
        const ret: number = callback === null ? 0 : callback(_data);
        _data.delete();
        return ret;
    }
    if (Array.isArray(buf)) {
        return bind.InputTextMultiline(label, buf, buf_size, size, flags, callback === null ? null : _callback, user_data);
    } else if (buf instanceof ImStringBuffer) {
        const ref_buf: bind.ImScalar<string> = [ buf.buffer ];
        const _buf_size: number = Math.min(buf_size, buf.size);
        let ret: boolean = bind.InputTextMultiline(label, ref_buf, _buf_size, size, flags, callback === null ? null : _callback, user_data);
        buf.buffer = ref_buf[0];
        return ret;
    } else {
        const ref_buf: bind.ImScalar<string> = [ buf() ];
        let ret: boolean = bind.InputTextMultiline(label, ref_buf, buf_size, size, flags, callback === null ? null : _callback, user_data);
        buf(ref_buf[0]);
        return ret;
    }
}
// IMGUI_API bool          InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, step: number = 0.0, step_fast: number = 0.0, decimal_precision: number = -1, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    if (Array.isArray(v)) {
        return bind.InputFloat(label, v, step, step_fast, decimal_precision, extra_flags);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret = bind.InputFloat(label, ref_v, step, step_fast, decimal_precision, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          InputFloat2(const char* label, float v[2], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat2(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputFloat3(const char* label, float v[3], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat3(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputFloat4(const char* label, float v[4], int decimal_precision = -1, ImGuiInputTextFlags extra_flags = 0);
export function InputFloat4(label: string, v: bind.ImTuple4<number>, decimal_precision: number = -1, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputFloat4(label, v, decimal_precision, extra_flags);
}
// IMGUI_API bool          InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags extra_flags = 0);
export function InputInt(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, step: number = 1, step_fast: number = 100, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    if (Array.isArray(v)) {
        return bind.InputInt(label, v, step, step_fast, extra_flags);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret = bind.InputInt(label, ref_v, step, step_fast, extra_flags);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          InputInt2(const char* label, int v[2], ImGuiInputTextFlags extra_flags = 0);
export function InputInt2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt2(label, v, extra_flags);
}
// IMGUI_API bool          InputInt3(const char* label, int v[3], ImGuiInputTextFlags extra_flags = 0);
export function InputInt3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt3(label, v, extra_flags);
}
// IMGUI_API bool          InputInt4(const char* label, int v[4], ImGuiInputTextFlags extra_flags = 0);
export function InputInt4(label: string, v: bind.ImTuple4<number>, extra_flags: bind.ImGuiInputTextFlags = 0): boolean {
    return bind.InputInt4(label, v, extra_flags);
}

// Widgets: Sliders (tip: ctrl+click on a slider to input with keyboard. manually input values aren't clamped, can go off-bounds)
// IMGUI_API bool          SliderFloat(const char* label, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);     // adjust display_format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for logarithmic sliders
export function SliderFloat(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.SliderFloat(label, v, v_min, v_max, display_format, power);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.SliderFloat(label, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number> | bind.interface_ImVec2, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.SliderFloat2(label, v, v_min, v_max, display_format, power);
    } else {
        const _v: bind.ImTuple2<number> = [ v.x, v.y ];
        const ret = bind.SliderFloat2(label, _v, v_min, v_max, display_format, power);
        v.x = _v[0];
        v.y = _v[1];
        return ret;
    }
}
// IMGUI_API bool          SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.SliderFloat3(label, v, v_min, v_max, display_format, power);
}
// IMGUI_API bool          SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function SliderFloat4(label: string, v: bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    return bind.SliderFloat4(label, v, v_min, v_max, display_format, power);
}
// IMGUI_API bool          SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f);
export function SliderAngle(label: string, v_rad: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_degrees_min: number = -360.0, v_degrees_max: number = +360.0): boolean {
    if (Array.isArray(v_rad)) {
        return bind.SliderAngle(label, v_rad, v_degrees_min, v_degrees_max);
    } else {
        const ref_v_rad: bind.ImScalar<number> = [ v_rad() ];
        const ret: boolean = bind.SliderAngle(label, ref_v_rad, v_degrees_min, v_degrees_max);
        v_rad(ref_v_rad[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderInt(const char* label, int* v, int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt(label: string, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.SliderInt(label, v, v_min, v_max, display_format);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.SliderInt(label, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt2(label: string, v: bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt2(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt3(label: string, v: bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt3(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* display_format = "%.0f");
export function SliderInt4(label: string, v: bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    return bind.SliderInt4(label, v, v_min, v_max, display_format);
}
// IMGUI_API bool          VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* display_format = "%.3f", float power = 1.0f);
export function VSliderFloat(label: string, size: Readonly<bind.interface_ImVec2>, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.3f", power: number = 1.0): boolean {
    if (Array.isArray(v)) {
        return bind.VSliderFloat(label, size, v, v_min, v_max, display_format, power);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.VSliderFloat(label, size, ref_v, v_min, v_max, display_format, power);
        v(ref_v[0]);
        return ret;
    }
}
// IMGUI_API bool          VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* display_format = "%.0f");
export function VSliderInt(label: string, size: Readonly<bind.interface_ImVec2>, v: bind.ImAccess<number> | bind.ImScalar<number> | bind.ImTuple2<number> | bind.ImTuple3<number> | bind.ImTuple4<number>, v_min: number, v_max: number, display_format: string = "%.0f"): boolean {
    if (Array.isArray(v)) {
        return bind.VSliderInt(label, size, v, v_min, v_max, display_format);
    } else {
        const ref_v: bind.ImScalar<number> = [ v() ];
        const ret: boolean = bind.VSliderInt(label, size, ref_v, v_min, v_max, display_format);
        v(ref_v[0]);
        return ret;
    }
}

// Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
// Note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can the pass the address of a first float element out of a contiguous structure, e.g. &myvector.x
// IMGUI_API bool          ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
export function ColorEdit3(label: string, col: bind.ImTuple3<number> | bind.ImTuple4<number> | bind.interface_ImVec4, flags: bind.ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorEdit3(label, col, flags);
    } else {
        const _col: bind.ImTuple3<number> = [ col.x, col.y, col.z ];
        const ret = bind.ColorEdit3(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2];
        return ret;
    }
}
// IMGUI_API bool          ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
export function ColorEdit4(label: string, col: bind.ImTuple4<number> | bind.interface_ImVec4, flags: bind.ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorEdit4(label, col, flags);
    } else {
        const _col: bind.ImTuple4<number> = [ col.x, col.y, col.z, col.w ];
        const ret = bind.ColorEdit4(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2]; col.w = _col[3];
        return ret;
    }
}
// IMGUI_API bool          ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
export function ColorPicker3(label: string, col: bind.ImTuple3<number> | bind.ImTuple4<number> | bind.interface_ImVec4, flags: bind.ImGuiColorEditFlags = 0): boolean {
    if (Array.isArray(col)) {
        return bind.ColorPicker3(label, col, flags);
    } else {
        const _col: bind.ImTuple3<number> = [ col.x, col.y, col.z ];
        const ret = bind.ColorPicker3(label, _col, flags);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2];
        return ret;
    }
}
// IMGUI_API bool          ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
export function ColorPicker4(label: string, col: bind.ImTuple4<number> | bind.interface_ImVec4, flags: bind.ImGuiColorEditFlags = 0, ref_col: bind.ImTuple4<number> | ImVec4 | null = null): boolean {
    if (Array.isArray(col)) {
        return bind.ColorPicker4(label, col, flags, ref_col);
    } else {
        const _col: bind.ImTuple4<number> = [ col.x, col.y, col.z, col.w ];
        const ret = bind.ColorPicker4(label, _col, flags, ref_col);
        col.x = _col[0]; col.y = _col[1]; col.z = _col[2]; col.w = _col[3];
        return ret;
    }
}
// IMGUI_API bool          ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0));  // display a colored square/button, hover for details, return true when pressed.
export function ColorButton(desc_id: string, col: Readonly<bind.interface_ImVec4>, flags: bind.ImGuiColorEditFlags = 0, size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    return bind.ColorButton(desc_id, col, flags, size);
}
// IMGUI_API void          SetColorEditOptions(ImGuiColorEditFlags flags);                         // initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
export function SetColorEditOptions(flags: bind.ImGuiColorEditFlags): void {
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
export function TreeNodeEx(label_or_id: string | number, flags: bind.ImGuiTreeNodeFlags = 0, fmt?: string): boolean {
    return bind.TreeNodeEx(label_or_id, flags, fmt || ((typeof(label_or_id) === "string") ? label_or_id : ""));
}
// IMGUI_API void          TreePush(const char* str_id);                                           // ~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call Push/Pop yourself for layout purpose
// IMGUI_API void          TreePush(const void* ptr_id = NULL);                                    // "
export { TreePush } from "./bind-imgui";
// IMGUI_API void          TreePop();                                                              // ~ Unindent()+PopId()
export { TreePop } from "./bind-imgui";
// IMGUI_API void          TreeAdvanceToLabelPos();                                                // advance cursor x position by GetTreeNodeToLabelSpacing()
export { TreeAdvanceToLabelPos } from "./bind-imgui";
// IMGUI_API float         GetTreeNodeToLabelSpacing();                                            // horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode
export { GetTreeNodeToLabelSpacing } from "./bind-imgui";
// IMGUI_API void          SetNextTreeNodeOpen(bool is_open, ImGuiCond cond = 0);                  // set next TreeNode/CollapsingHeader open state.
export function SetNextTreeNodeOpen(is_open: boolean, cond: bind.ImGuiCond = 0): void {
    bind.SetNextTreeNodeOpen(is_open, cond);
}
// IMGUI_API bool          CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);      // if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().
// IMGUI_API bool          CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0); // when 'p_open' isn't NULL, display an additional small close button on upper right of the header
export function CollapsingHeader(label: string, flags_or_p_open: bind.ImGuiTreeNodeFlags | bind.ImScalar<boolean> | bind.ImAccess<boolean> = 0, flags: bind.ImGuiTreeNodeFlags = 0): boolean {
    if (Array.isArray(flags_or_p_open)) {
        return bind.CollapsingHeader(label, flags_or_p_open, flags);
    } else if (typeof(flags_or_p_open) === "number") {
        return bind.CollapsingHeader(label, null, flags_or_p_open);
    } else {
        const ref_open: bind.ImScalar<boolean> = [ flags_or_p_open() ];
        const ret = bind.CollapsingHeader(label, ref_open, flags);
        flags_or_p_open(ref_open[0]);
        return ret;
    }
}

// Widgets: Selectable / Lists
// IMGUI_API bool          Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));  // size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height
// IMGUI_API bool          Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0));
export function Selectable(label: string, selected: boolean | bind.ImScalar<boolean> | bind.ImAccess<boolean> = false, flags: bind.ImGuiSelectableFlags = 0, size: Readonly<bind.interface_ImVec2> = ImVec2.ZERO): boolean {
    if (typeof(selected) === "boolean" || Array.isArray(selected)) {
        return bind.Selectable(label, selected, flags, size);
    } else {
        const ref_selected: bind.ImScalar<boolean> = [ selected() ];
        const ret = bind.Selectable(label, ref_selected, flags, size);
        selected(ref_selected[0]);
        return ret;
    }
}
// IMGUI_API bool          ListBox(const char* label, int* current_item, const char* const* items, int items_count, int height_in_items = -1);
// IMGUI_API bool          ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
export function ListBox(label: string, current_item: bind.ImAccess<number> | bind.ImScalar<number>, items: string[], items_count: number = items.length, height_in_items: number = -1): boolean {
    if (Array.isArray(current_item)) {
        return bind.ListBox(label, current_item, items, items_count, height_in_items);
    } else {
        const ref_current_item: bind.ImScalar<number> = [ current_item() ];
        const ret = bind.ListBox(label, ref_current_item, items, items_count, height_in_items);
        current_item(ref_current_item[0]);
        return ret;
    }
}
// IMGUI_API bool          ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0));     // use if you want to reimplement ListBox() will custom data or interactions. make sure to call ListBoxFooter() afterwards.
// IMGUI_API bool          ListBoxHeader(const char* label, int items_count, int height_in_items = -1); // "
export function ListBoxHeader(label: string, size: Readonly<bind.interface_ImVec2>): boolean {
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
export { BeginTooltip } from "./bind-imgui";
// IMGUI_API void          EndTooltip();
export { EndTooltip } from "./bind-imgui";

// Menus
// IMGUI_API bool          BeginMainMenuBar();                                                 // create and append to a full screen menu-bar. only call EndMainMenuBar() if this returns true!
export { BeginMainMenuBar } from "./bind-imgui";
// IMGUI_API void          EndMainMenuBar();
export { EndMainMenuBar } from "./bind-imgui";
// IMGUI_API bool          BeginMenuBar();                                                     // append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window). only call EndMenuBar() if this returns true!
export { BeginMenuBar } from "./bind-imgui";
// IMGUI_API void          EndMenuBar();
export { EndMenuBar } from "./bind-imgui";
// IMGUI_API bool          BeginMenu(const char* label, bool enabled = true);                  // create a sub-menu entry. only call EndMenu() if this returns true!
export function BeginMenu(label: string, enabled: boolean = true): boolean { return bind.BeginMenu(label, enabled); }
// IMGUI_API void          EndMenu();
export { EndMenu } from "./bind-imgui";
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);  // return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment
// IMGUI_API bool          MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);              // return true when activated + toggle (*p_selected) if p_selected != NULL
export function MenuItem(label: string, shortcut: string | null = null, selected: boolean | bind.ImScalar<boolean> | bind.ImAccess<boolean> = false, enabled: boolean = true): boolean {
    if (shortcut === null) { shortcut = ""; }
    if (typeof(selected) === "boolean") {
        selected = [ selected ];
        return bind.MenuItem(label, shortcut, selected, enabled);
    } else if (Array.isArray(selected)) {
        return bind.MenuItem(label, shortcut, selected, enabled);
    } else {
        const ref_selected: bind.ImScalar<boolean> = [ selected() ];
        const ret = bind.MenuItem(label, shortcut, ref_selected, enabled);
        selected(ref_selected[0]);
        return ret;
    }
}

// Popups
// IMGUI_API void          OpenPopup(const char* str_id);                                      // call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).
export { OpenPopup } from "./bind-imgui";
// IMGUI_API bool          OpenPopupOnItemClick(const char* str_id = NULL, int mouse_button = 1);                                  // helper to open popup when clicked on last item. return true when just opened.
export function OpenPopupOnItemClick(str_id: string = "", mouse_button: number = 1): boolean {
    return bind.OpenPopupOnItemClick(str_id, mouse_button);
}
// IMGUI_API bool          BeginPopup(const char* str_id);                                     // return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returned true!
export { BeginPopup } from "./bind-imgui";
// IMGUI_API bool          BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags extra_flags = 0);               // modal dialog (block interactions behind the modal window, can't close the modal window by clicking outside)
export function BeginPopupModal(str_id: string = "", p_open: bind.ImScalar<boolean> | null = null, extra_flags: bind.ImGuiWindowFlags = 0): boolean {
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
export { EndPopup } from "./bind-imgui";
// IMGUI_API bool          IsPopupOpen(const char* str_id);                                    // return true if the popup is open
export { IsPopupOpen } from "./bind-imgui";
// IMGUI_API void          CloseCurrentPopup();                                                // close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
export { CloseCurrentPopup } from "./bind-imgui";

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
export { LogFinish } from "./bind-imgui";
// IMGUI_API void          LogButtons();                                                       // helper to display buttons for logging to tty/file/clipboard
export { LogButtons } from "./bind-imgui";
// IMGUI_API void          LogText(const char* fmt, ...) IM_FMTARGS(1);                        // pass text data straight to log (without being displayed)
export function LogText(fmt: string): void {
    bind.LogText(fmt);
}

// Drag and Drop
// [BETA API] Missing Demo code. API may evolve.
// IMGUI_API bool          BeginDragDropSource(ImGuiDragDropFlags flags = 0, int mouse_button = 0);                // call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()
export function BeginDragDropSource(flags: bind.ImGuiDragDropFlags = 0, mouse_button: number = 0): boolean {
    return false;
}
// IMGUI_API bool          SetDragDropPayload(const char* type, const void* data, size_t size, ImGuiCond cond = 0);// type is a user defined string of maximum 8 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.
export function SetDragDropPayload(type: string, data: any, size: number, cond: bind.ImGuiCond = 0): boolean {
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
export function AcceptDragDropPayload(type: string, flags: bind.ImGuiDragDropFlags = 0): any {
    return null;
}
// IMGUI_API void          EndDragDropTarget();
export function EndDragDropTarget(): void {
}

// Clipping
// IMGUI_API void          PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
export function PushClipRect(clip_rect_min: Readonly<bind.interface_ImVec2>, clip_rect_max: Readonly<bind.interface_ImVec2>, intersect_with_current_clip_rect: boolean): void {
    bind.PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect);
}
// IMGUI_API void          PopClipRect();
export function PopClipRect(): void {
    bind.PopClipRect();
}

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

// Focus
// (FIXME: Those functions will be reworked after we merge the navigation branch + have a pass at focusing/tabbing features.)
// (Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHere()" when applicable, to make your code more forward compatible when navigation branch is merged)
// IMGUI_API void          SetItemDefaultFocus();                                              // make last item the default focused item of a window (WIP navigation branch only). Pleaase use instead of SetScrollHere().
export { SetItemDefaultFocus } from "./bind-imgui";
// IMGUI_API void          SetKeyboardFocusHere(int offset = 0);                               // focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
export function SetKeyboardFocusHere(offset: number = 0): void {
    bind.SetKeyboardFocusHere(offset);
}

// Utilities
// IMGUI_API bool          IsItemHovered(ImGuiHoveredFlags flags = 0);                         // is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.
export function IsItemHovered(flags: bind.ImGuiHoveredFlags = 0): boolean {
    return bind.IsItemHovered(flags);
}
// IMGUI_API bool          IsItemActive();                                                     // is the last item active? (e.g. button being held, text field being edited- items that don't interact will always return false)
export { IsItemActive } from "./bind-imgui";
// IMGUI_API bool          IsItemClicked(int mouse_button = 0);                                // is the last item clicked? (e.g. button/node just clicked on)
export function IsItemClicked(mouse_button: number = 0): boolean {
    return bind.IsItemClicked(mouse_button);
}
// IMGUI_API bool          IsItemVisible();                                                    // is the last item visible? (aka not out of sight due to clipping/scrolling.)
export { IsItemVisible } from "./bind-imgui";
// IMGUI_API bool          IsAnyItemHovered();
export { IsAnyItemHovered } from "./bind-imgui";
// IMGUI_API bool          IsAnyItemActive();
export { IsAnyItemActive } from "./bind-imgui";
// IMGUI_API ImVec2        GetItemRectMin();                                                   // get bounding rectangle of last item, in screen space
export function GetItemRectMin(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectMin(out);
}
// IMGUI_API ImVec2        GetItemRectMax();                                                   // "
export function GetItemRectMax(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectMax(out);
}
// IMGUI_API ImVec2        GetItemRectSize();                                                  // get size of last item, in screen space
export function GetItemRectSize(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetItemRectSize(out);
}
// IMGUI_API void          SetItemAllowOverlap();                                              // allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
export { SetItemAllowOverlap } from "./bind-imgui";
// IMGUI_API bool          IsWindowFocused(ImGuiFocusedFlags flags = 0);                       // is current window focused? or its root/child, depending on flags. see flags for options.
export function IsWindowFocused(flags: bind.ImGuiFocusedFlags = 0): boolean {
    return bind.IsWindowFocused(flags);
}
// IMGUI_API bool          IsWindowHovered(ImGuiHoveredFlags flags = 0);                       // is current window hovered (and typically: not blocked by a popup/modal)? see flags for options.
export function IsWindowHovered(flags: bind.ImGuiHoveredFlags = 0): boolean {
    return bind.IsWindowHovered(flags);
}
// IMGUI_API bool          IsAnyWindowFocused();
export { IsAnyWindowFocused } from "./bind-imgui";
// IMGUI_API bool          IsAnyWindowHovered();                                               // is mouse hovering any visible window
export { IsAnyWindowHovered } from "./bind-imgui";
// IMGUI_API bool          IsRectVisible(const ImVec2& size);                                  // test if rectangle (of given size, starting from cursor position) is visible / not clipped.
// IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);      // test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.
export function IsRectVisible(size_or_rect_min: Readonly<bind.interface_ImVec2>, rect_max?: Readonly<bind.interface_ImVec2>): boolean {
    return bind.IsRectVisible(size_or_rect_min, rect_max);
}
// IMGUI_API float         GetTime();
export { GetTime } from "./bind-imgui";
// IMGUI_API int           GetFrameCount();
export { GetFrameCount } from "./bind-imgui";
// IMGUI_API ImDrawList*   GetOverlayDrawList();                                               // this draw list will be the last rendered one, useful to quickly draw overlays shapes/text
export function GetOverlayDrawList(): ImDrawList {
    return new ImDrawList(bind.GetOverlayDrawList());
}
// IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
export function GetDrawListSharedData(): ImDrawListSharedData {
    return new ImDrawListSharedData(bind.GetDrawListSharedData());
}
// IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
export { GetStyleColorName } from "./bind-imgui";
// IMGUI_API ImVec2        CalcItemRectClosestPoint(const ImVec2& pos, bool on_edge = false, float outward = +0.0f);   // utility to find the closest point the last item bounding rectangle edge. useful to visually link items
export function CalcItemRectClosestPoint(pos: Readonly<bind.interface_ImVec2>, on_edge: boolean = false, outward: number = +0.0, out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.CalcItemRectClosestPoint(pos, on_edge, outward, out);
}
// IMGUI_API ImVec2        CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
export function CalcTextSize(text: string, text_end: string | null = null, hide_text_after_double_hash: boolean = false, wrap_width: number = -1, out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.CalcTextSize(text, text_end, hide_text_after_double_hash, wrap_width, out);
}
// IMGUI_API void          CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end);    // calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.
export function CalcListClipping(items_count: number, items_height: number, out_items_display_start: bind.ImScalar<number>, out_items_display_end: bind.ImScalar<number>): void {
    return bind.CalcListClipping(items_count, items_height, out_items_display_start, out_items_display_end);
}

// IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags extra_flags = 0);    // helper to create a child window / scrolling region that looks like a normal widget frame
export function BeginChildFrame(id: bind.ImGuiID, size: Readonly<bind.interface_ImVec2>, extra_flags: bind.ImGuiWindowFlags = 0): boolean {
    return bind.BeginChildFrame(id, size, extra_flags);
}
// IMGUI_API void          EndChildFrame();
export { EndChildFrame } from "./bind-imgui";

// IMGUI_API ImVec4        ColorConvertU32ToFloat4(ImU32 in);
export function ColorConvertU32ToFloat4(in_: bind.ImU32, out: bind.interface_ImVec4 = new ImVec4()): typeof out {
    return bind.ColorConvertU32ToFloat4(in_, out);
}
// IMGUI_API ImU32         ColorConvertFloat4ToU32(const ImVec4& in);
export function ColorConvertFloat4ToU32(in_: Readonly<bind.interface_ImVec4>): bind.ImU32 {
    return bind.ColorConvertFloat4ToU32(in_);
}
// IMGUI_API void          ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
export { ColorConvertRGBtoHSV } from "./bind-imgui";
// IMGUI_API void          ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
export { ColorConvertHSVtoRGB } from "./bind-imgui";

// Inputs
// IMGUI_API int           GetKeyIndex(ImGuiKey imgui_key);                                    // map ImGuiKey_* values into user's key index. == io.KeyMap[key]
export function GetKeyIndex(imgui_key: bind.ImGuiKey): number {
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
export function IsMouseHoveringRect(r_min: Readonly<bind.interface_ImVec2>, r_max: Readonly<bind.interface_ImVec2>, clip: boolean = true): boolean {
    return bind.IsMouseHoveringRect(r_min, r_max, clip);
}
// IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);                    //
export function IsMousePosValid(mouse_pos: Readonly<bind.interface_ImVec2> | null = null): boolean {
    return bind.IsMousePosValid(mouse_pos);
}
// IMGUI_API ImVec2        GetMousePos();                                                      // shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls
export function GetMousePos(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMousePos(out);
}
// IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();                                 // retrieve backup of mouse positioning at the time of opening popup we have BeginPopup() into
export function GetMousePosOnOpeningCurrentPopup(out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMousePosOnOpeningCurrentPopup(out);
}
// IMGUI_API ImVec2        GetMouseDragDelta(int button = 0, float lock_threshold = -1.0f);    // dragging amount since clicking. if lock_threshold < -1.0f uses io.MouseDraggingThreshold
export function GetMouseDragDelta(button: number = 0, lock_threshold: number = -1.0, out: bind.interface_ImVec2 = new ImVec2()): typeof out {
    return bind.GetMouseDragDelta(button, lock_threshold, out);
}
// IMGUI_API void          ResetMouseDragDelta(int button = 0);                                //
export function ResetMouseDragDelta(button: number = 0): void {
    bind.ResetMouseDragDelta(button);
}
// IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you
export { GetMouseCursor } from "./bind-imgui";
// IMGUI_API void          SetMouseCursor(ImGuiMouseCursor type);                              // set desired cursor type
export { SetMouseCursor } from "./bind-imgui";
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
export { MemAlloc } from "./bind-imgui";
// IMGUI_API void          MemFree(void* ptr);
export { MemFree } from "./bind-imgui";
// IMGUI_API const char*   GetClipboardText();
export { GetClipboardText } from "./bind-imgui";
// IMGUI_API void          SetClipboardText(const char* text);
export { SetClipboardText } from "./bind-imgui";

// Internal context access - if you want to use multiple context, share context between modules (e.g. DLL). There is a default context created and active by default.
// All contexts share a same ImFontAtlas by default. If you want different font atlas, you can new() them and overwrite the GetIO().Fonts variable of an ImGui context.
// IMGUI_API const char*   GetVersion();
export { GetVersion } from "./bind-imgui";
// IMGUI_API ImGuiContext* CreateContext(void* (*malloc_fn)(size_t) = NULL, void (*free_fn)(void*) = NULL);
// export function CreateContext(malloc_fn: ((sz: number) => any) | null = null, free_fn: ((ptr: any) => void) | null = null): bind.ImGuiContext | null {
//     return bind.CreateContext(malloc_fn, free_fn);
// }
export function CreateContext(): bind.ImGuiContext | null {
    return bind.CreateContext();
}
// IMGUI_API void          DestroyContext(ImGuiContext* ctx);
// export { DestroyContext } from "./bind-imgui";
export function DestroyContext(ctx: bind.ImGuiContext | null = null): void {
    return bind.DestroyContext(ctx);
}
// IMGUI_API ImGuiContext* GetCurrentContext();
export { GetCurrentContext } from "./bind-imgui";
// IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
export { SetCurrentContext } from "./bind-imgui";
