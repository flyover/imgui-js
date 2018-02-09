/// <reference types="emscripten" />

export declare class EmscriptenClassHandle {
}

export declare class EmscriptenRegisteredClass {
    baseClass: any;
    "constructor": (...args: any[]) => this;
    constructor_body: any;
    downcast: number;
    getActualType: () => any;
    instancePrototype: EmscriptenClassHandle;
    name: string;
    pureVirtualFunctions: ((...args: any[]) => any)[];
    rawDestructor: () => void;
    upcast: number;
}

export declare class EmscriptenRegisteredPointer {
    destructorFunction: (() => void) | null;
    isConst: boolean;
    isReference: boolean;
    isSmartPointer: boolean;
    name: string;
    pointeeType: any;
    rawConstructor: any;
    rawDestructor: any;
    rawGetPointee: any;
    rawShare: any;
    registeredClass: EmscriptenRegisteredClass;
    sharingPolicy: any;
    toWireType: (destructors: any[], handle: EmscriptenClass) => number;
}

export declare class EmscriptenWireType {
    ptr: number;
    ptrType: EmscriptenRegisteredPointer;
    count: { value: number };
}

export declare class EmscriptenClassReference {
    $$: EmscriptenWireType;
}

export declare class EmscriptenClass extends EmscriptenClassReference {
    delete(): void;
}

export const buffer: ArrayBuffer;
export const HEAP8: Int8Array;
export const HEAP16: Int16Array;
export const HEAP32: Int32Array;
export const HEAPU8: Uint8Array;
export const HEAPU16: Uint16Array;
export const HEAPU32: Uint32Array;
export const HEAPF32: Float32Array;
export const HEAPF64: Float64Array;

export const TOTAL_STACK: number;
export const TOTAL_MEMORY: number;

export function count_emval_handles(): number;

export let onRuntimeInitialized: () => void;
