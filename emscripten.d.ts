/// <reference types="emscripten" />

export declare class EmscriptenClassHandle {
}

export declare class EmscriptenRegisteredClass {
    baseClass: any;
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
    destructorFunction: ((ptr: number) => void) | null;
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
    fromWireType: (value: any) => any;
    toWireType: (destructors: any[], value: any) => number;
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

export interface EmscriptenModule {
    ENVIRONMENT?: "WEB" | "WORKER" | "NODE" | "SHELL";

    "arguments": any[];
    thisProgram: string;
    quit(status: number, toThrow: Error): void;
    preRun: (() => void)[];
    postRun: (() => void)[];

    buffer: ArrayBuffer;
    HEAP8: Int8Array;
    HEAP16: Int16Array;
    HEAP32: Int32Array;
    HEAPU8: Uint8Array;
    HEAPU16: Uint16Array;
    HEAPU32: Uint32Array;
    HEAPF32: Float32Array;
    HEAPF64: Float64Array;

    TOTAL_STACK: number;
    TOTAL_MEMORY: number;

    count_emval_handles(): number;

    onRuntimeInitialized: () => void;

    _malloc(size: number): number;
    _free(ptr: number): number;
    _memcpy(dst: number, src: number, num: number): number;
    _memset(ptr: number, val: number, num: number): number;
}
