import { ImAccess } from "imgui-js";
import { ImScalar } from "imgui-js";
import { ImGuiStyle } from "imgui-js";
export declare function ShowUserGuide(): void;
export declare function ShowDemoWindow(p_open?: ImAccess<boolean> | ImScalar<boolean> | null): boolean;
export declare function ShowStyleSelector(label: string): boolean;
export declare function ShowFontSelector(label: string): void;
export declare function ShowStyleEditor(ref?: ImGuiStyle | null): void;
