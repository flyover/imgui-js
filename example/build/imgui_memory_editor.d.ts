type int = number;
type float = number;
type size_t = number;
import * as ImGui from "imgui-js";
export declare class MemoryEditor {
    Open: boolean;
    ReadOnly: boolean;
    Cols: int;
    OptShowOptions: boolean;
    OptShowDataPreview: boolean;
    OptShowHexII: boolean;
    OptShowAscii: boolean;
    OptGreyOutZeroes: boolean;
    OptUpperCaseHex: boolean;
    OptMidColsCount: int;
    OptAddrDigitsCount: int;
    HighlightColor: ImGui.U32;
    ReadFn: ((data: ArrayBuffer, off: size_t) => size_t) | null;
    WriteFn: ((data: ArrayBuffer, off: size_t, d: number) => void) | null;
    HighlightFn: ((data: ArrayBuffer, off: size_t) => boolean) | null;
    ContentsWidthChanged: boolean;
    DataPreviewAddr: size_t;
    DataEditingAddr: size_t;
    DataEditingTakeFocus: boolean;
    readonly DataInputBuf: ImGui.StringBuffer;
    readonly AddrInputBuf: ImGui.StringBuffer;
    GotoAddr: size_t;
    HighlightMin: size_t;
    HighlightMax: size_t;
    PreviewEndianess: int;
    PreviewDataType: ImGui.DataType;
    constructor();
    GotoAddrAndHighlight(addr_min: size_t, addr_max: size_t): void;
    CalcSizes(s: MemoryEditor.Sizes, mem_size: size_t, base_display_addr: size_t): void;
    DrawWindow(title: string, mem_data: ArrayBuffer, mem_size?: number, base_display_addr?: number): void;
    DrawContents(mem_data: ArrayBuffer, mem_size?: number, base_display_addr?: number): void;
    DrawOptionsLine(s: MemoryEditor.Sizes, mem_data: ArrayBuffer, mem_size: size_t, base_display_addr: size_t): void;
    DrawPreviewLine(s: MemoryEditor.Sizes, mem_data: ArrayBuffer, mem_size: size_t, base_display_addr: size_t): void;
    DataTypeGetDesc(data_type: ImGui.DataType): string;
    DataTypeGetSize(data_type: ImGui.DataType): size_t;
    DataFormatGetDesc(data_format: MemoryEditor.DataFormat): string;
    IsBigEndian(): boolean;
    DrawPreviewData(addr: size_t, mem_data: ArrayBuffer, mem_size: size_t, data_type: ImGui.DataType, data_format: MemoryEditor.DataFormat, out_buf: ImGui.StringBuffer, out_buf_size: size_t): void;
}
export declare namespace MemoryEditor {
    enum DataFormat {
        Bin = 0,
        Dec = 1,
        Hex = 2,
        COUNT = 3
    }
    class Sizes {
        AddrDigitsCount: int;
        LineHeight: float;
        GlyphWidth: float;
        HexCellWidth: float;
        SpacingBetweenMidCols: float;
        PosHexStart: float;
        PosHexEnd: float;
        PosAsciiStart: float;
        PosAsciiEnd: float;
        WindowWidth: float;
    }
}
export {};
