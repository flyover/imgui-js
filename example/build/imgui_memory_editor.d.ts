import { ImStringBuffer } from "imgui-js";
import { ImU32 } from "imgui-js";
export declare class MemoryEditor {
    Open: boolean;
    ReadOnly: boolean;
    Rows: number;
    OptShowAscii: boolean;
    OptShowHexII: boolean;
    OptGreyOutZeroes: boolean;
    OptMidRowsCount: number;
    OptAddrDigitsCount: number;
    HighlightColor: ImU32;
    ReadFn: ((data: ArrayBuffer, off: number) => number) | null;
    WriteFn: ((data: ArrayBuffer, off: number, d: number) => void) | null;
    HighlightFn: ((data: ArrayBuffer, off: number) => boolean) | null;
    ContentsWidthChanged: boolean;
    DataEditingAddr: number;
    DataEditingTakeFocus: boolean;
    DataInputBuf: ImStringBuffer;
    AddrInputBuf: ImStringBuffer;
    GotoAddr: number;
    HighlightMin: number;
    HighlightMax: number;
    GotoAddrAndHighlight(addr_min: number, addr_max: number): void;
    CalcSizes(s: MemoryEditor.Sizes, mem_size: number, base_display_addr: number): void;
    static sprintf_PRISizeT(n: number, pad?: number): string;
    static sscanf_PRISizeT(s: string): number;
    DrawWindow(title: string, mem_data: ArrayBuffer, mem_size?: number, base_display_addr?: number): void;
    DrawContents(mem_data: ArrayBuffer, mem_size?: number, base_display_addr?: number): void;
}
export declare namespace MemoryEditor {
    class Sizes {
        AddrDigitsCount: number;
        LineHeight: number;
        GlyphWidth: number;
        HexCellWidth: number;
        SpacingBetweenMidRows: number;
        PosHexStart: number;
        PosHexEnd: number;
        PosAsciiStart: number;
        PosAsciiEnd: number;
        WindowWidth: number;
    }
}
