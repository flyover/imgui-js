"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImGui = require("../imgui");
const imgui_1 = require("../imgui");
const imgui_2 = require("../imgui");
const imgui_3 = require("../imgui");
exports.gl = null;
let g_ShaderHandle = null;
let g_VertHandle = null;
let g_FragHandle = null;
let g_AttribLocationTex = null;
let g_AttribLocationProjMtx = null;
let g_AttribLocationPosition = -1;
let g_AttribLocationUV = -1;
let g_AttribLocationColor = -1;
let g_VboHandle = null;
let g_ElementsHandle = null;
let g_FontTexture = null;
let prev_time = 0;
function Init(canvas) {
    const io = ImGui.GetIO();
    if (canvas !== null) {
        exports.gl = canvas.getContext("webgl", { alpha: false });
        canvas.addEventListener("blur", (event) => {
            const io = ImGui.GetIO();
            io.KeyCtrl = false;
            io.KeyShift = false;
            io.KeyAlt = false;
            io.KeySuper = false;
            for (let i = 0; i < io.KeysDown.length; ++i) {
                io.KeysDown[i] = false;
            }
            for (let i = 0; i < io.MouseDown.length; ++i) {
                io.MouseDown[i] = false;
            }
        });
        canvas.addEventListener("keydown", (event) => {
            const io = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            ImGui.IM_ASSERT(event.keyCode >= 0 && event.keyCode < ImGui.IM_ARRAYSIZE(io.KeysDown));
            io.KeysDown[event.keyCode] = true;
            if (event.keyCode === 9) {
                event.preventDefault();
            }
        });
        canvas.addEventListener("keyup", (event) => {
            const io = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            ImGui.IM_ASSERT(event.keyCode >= 0 && event.keyCode < ImGui.IM_ARRAYSIZE(io.KeysDown));
            io.KeysDown[event.keyCode] = false;
            if (io.WantCaptureKeyboard) {
                event.preventDefault();
            }
        });
        canvas.addEventListener("keypress", (event) => {
            const io = ImGui.GetIO();
            io.AddInputCharacter(event.charCode);
            if (io.WantCaptureKeyboard) {
                event.preventDefault();
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            const io = ImGui.GetIO();
            io.MousePos.x = event.offsetX;
            io.MousePos.y = event.offsetY;
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });
        // MouseEvent.button
        // A number representing a given button:
        // 0: Main button pressed, usually the left button or the un-initialized state
        // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
        // 2: Secondary button pressed, usually the right button
        // 3: Fourth button, typically the Browser Back button
        // 4: Fifth button, typically the Browser Forward button
        const mouse_button_map = [0, 2, 1, 3, 4];
        canvas.addEventListener("mousedown", (event) => {
            const io = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = true;
            // if (io.WantCaptureMouse) {
            //     event.preventDefault();
            // }
        });
        canvas.addEventListener("contextmenu", (event) => {
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });
        canvas.addEventListener("mouseup", (event) => {
            const io = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = false;
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });
        canvas.addEventListener("wheel", (event) => {
            const io = ImGui.GetIO();
            let scale = 1.0;
            switch (event.deltaMode) {
                case event.DOM_DELTA_PIXEL:
                    scale = 0.01;
                    break;
                case event.DOM_DELTA_LINE:
                    scale = 0.2;
                    break;
                case event.DOM_DELTA_PAGE:
                    scale = 1.0;
                    break;
            }
            io.MouseWheelH = event.deltaX * scale;
            io.MouseWheel = -event.deltaY * scale; // Mouse wheel: 1 unit scrolls about 5 lines text.
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });
    }
    // io.SetClipboardTextFn = ImGui_Impl_SetClipboardText;
    // io.GetClipboardTextFn = ImGui_Impl_GetClipboardText;
    // io.ClipboardUserData = NULL;
    // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
    io.KeyMap[imgui_1.ImGuiKey.Tab] = 9;
    io.KeyMap[imgui_1.ImGuiKey.LeftArrow] = 37;
    io.KeyMap[imgui_1.ImGuiKey.RightArrow] = 39;
    io.KeyMap[imgui_1.ImGuiKey.UpArrow] = 38;
    io.KeyMap[imgui_1.ImGuiKey.DownArrow] = 40;
    io.KeyMap[imgui_1.ImGuiKey.PageUp] = 33;
    io.KeyMap[imgui_1.ImGuiKey.PageDown] = 34;
    io.KeyMap[imgui_1.ImGuiKey.Home] = 36;
    io.KeyMap[imgui_1.ImGuiKey.End] = 35;
    io.KeyMap[imgui_1.ImGuiKey.Insert] = 45;
    io.KeyMap[imgui_1.ImGuiKey.Delete] = 46;
    io.KeyMap[imgui_1.ImGuiKey.Backspace] = 8;
    io.KeyMap[imgui_1.ImGuiKey.Space] = 32;
    io.KeyMap[imgui_1.ImGuiKey.Enter] = 13;
    io.KeyMap[imgui_1.ImGuiKey.Escape] = 27;
    io.KeyMap[imgui_1.ImGuiKey.A] = 65;
    io.KeyMap[imgui_1.ImGuiKey.C] = 67;
    io.KeyMap[imgui_1.ImGuiKey.V] = 86;
    io.KeyMap[imgui_1.ImGuiKey.X] = 88;
    io.KeyMap[imgui_1.ImGuiKey.Y] = 89;
    io.KeyMap[imgui_1.ImGuiKey.Z] = 90;
    // Backup GL state
    const last_texture = exports.gl && exports.gl.getParameter(exports.gl.TEXTURE_BINDING_2D);
    const last_array_buffer = exports.gl && exports.gl.getParameter(exports.gl.ARRAY_BUFFER_BINDING);
    const vertex_shader = [
        "uniform mat4 ProjMtx;",
        "attribute vec2 Position;",
        "attribute vec2 UV;",
        "attribute vec4 Color;",
        "varying vec2 Frag_UV;",
        "varying vec4 Frag_Color;",
        "void main() {",
        "	Frag_UV = UV;",
        "	Frag_Color = Color;",
        "	gl_Position = ProjMtx * vec4(Position.xy,0,1);",
        "}",
    ];
    const fragment_shader = [
        // #ifdef __EMSCRIPTEN__
        // WebGL requires precision specifiers but OpenGL 2.1 disallows
        // them, so I define the shader without it and then add it here.
        "precision mediump float;",
        // #endif
        "uniform sampler2D Texture;",
        "varying vec2 Frag_UV;",
        "varying vec4 Frag_Color;",
        "void main() {",
        "	gl_FragColor = Frag_Color * texture2D(Texture, Frag_UV);",
        "}",
    ];
    g_ShaderHandle = exports.gl && exports.gl.createProgram();
    g_VertHandle = exports.gl && exports.gl.createShader(exports.gl.VERTEX_SHADER);
    g_FragHandle = exports.gl && exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
    exports.gl && exports.gl.shaderSource(g_VertHandle, vertex_shader.join("\n"));
    exports.gl && exports.gl.shaderSource(g_FragHandle, fragment_shader.join("\n"));
    exports.gl && exports.gl.compileShader(g_VertHandle);
    exports.gl && exports.gl.compileShader(g_FragHandle);
    exports.gl && exports.gl.attachShader(g_ShaderHandle, g_VertHandle);
    exports.gl && exports.gl.attachShader(g_ShaderHandle, g_FragHandle);
    exports.gl && exports.gl.linkProgram(g_ShaderHandle);
    g_AttribLocationTex = exports.gl && exports.gl.getUniformLocation(g_ShaderHandle, "Texture");
    g_AttribLocationProjMtx = exports.gl && exports.gl.getUniformLocation(g_ShaderHandle, "ProjMtx");
    g_AttribLocationPosition = exports.gl && exports.gl.getAttribLocation(g_ShaderHandle, "Position") || 0;
    g_AttribLocationUV = exports.gl && exports.gl.getAttribLocation(g_ShaderHandle, "UV") || 0;
    g_AttribLocationColor = exports.gl && exports.gl.getAttribLocation(g_ShaderHandle, "Color") || 0;
    g_VboHandle = exports.gl && exports.gl.createBuffer();
    g_ElementsHandle = exports.gl && exports.gl.createBuffer();
    // Build texture
    // const width: number = 256;
    // const height: number = 256;
    // const pixels: Uint8Array = new Uint8Array(4 * width * height).fill(0xff);
    const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32(); // Load as RGBA 32-bits for OpenGL3 demo because it is more likely to be compatible with user's existing shader.
    // console.log(`font texture ${width} x ${height} @ ${pixels.length}`);
    // Create OpenGL texture
    g_FontTexture = exports.gl && exports.gl.createTexture();
    exports.gl && exports.gl.bindTexture(exports.gl.TEXTURE_2D, g_FontTexture);
    exports.gl && exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MIN_FILTER, exports.gl.LINEAR);
    exports.gl && exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MAG_FILTER, exports.gl.LINEAR);
    exports.gl && exports.gl.texImage2D(exports.gl.TEXTURE_2D, 0, exports.gl.RGBA, width, height, 0, exports.gl.RGBA, exports.gl.UNSIGNED_BYTE, pixels);
    // Store our identifier
    io.Fonts.TexID = g_FontTexture || { foo: "bar" };
    // console.log("font texture id", g_FontTexture);
    // Cleanup (don't clear the input data if you want to append new fonts later)
    // io.Fonts.ClearInputData();
    // io.Fonts.ClearTexData();
    // Restore modified GL state
    exports.gl && last_texture && exports.gl.bindTexture(exports.gl.TEXTURE_2D, last_texture);
    exports.gl && last_array_buffer && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, last_array_buffer);
}
exports.Init = Init;
function Shutdown() {
    const io = ImGui.GetIO();
    io.Fonts.TexID = null;
    exports.gl && exports.gl.deleteTexture(g_FontTexture);
    g_FontTexture = null;
    exports.gl && exports.gl.deleteBuffer(g_VboHandle);
    g_VboHandle = null;
    exports.gl && exports.gl.deleteBuffer(g_ElementsHandle);
    g_ElementsHandle = null;
    g_AttribLocationTex = null;
    g_AttribLocationProjMtx = null;
    g_AttribLocationPosition = -1;
    g_AttribLocationUV = -1;
    g_AttribLocationColor = -1;
    exports.gl && exports.gl.deleteProgram(g_ShaderHandle);
    g_ShaderHandle = null;
    exports.gl && exports.gl.deleteShader(g_VertHandle);
    g_VertHandle = null;
    exports.gl && exports.gl.deleteShader(g_FragHandle);
    g_FragHandle = null;
}
exports.Shutdown = Shutdown;
function NewFrame(time) {
    const io = ImGui.GetIO();
    const w = exports.gl && exports.gl.canvas.width || 640;
    const h = exports.gl && exports.gl.canvas.height || 480;
    const display_w = exports.gl && exports.gl.drawingBufferWidth || w;
    const display_h = exports.gl && exports.gl.drawingBufferHeight || h;
    io.DisplaySize.x = w;
    io.DisplaySize.y = h;
    io.DisplayFramebufferScale.x = w > 0 ? (display_w / w) : 0;
    io.DisplayFramebufferScale.y = h > 0 ? (display_h / h) : 0;
    const dt = time - prev_time;
    prev_time = time;
    io.DeltaTime = dt / 1000;
    if (io.WantMoveMouse) {
        console.log("TODO: MousePos", io.MousePos.x, io.MousePos.y);
    }
    if (typeof (document) !== "undefined") {
        if (io.MouseDrawCursor) {
            document.body.style.cursor = "none";
        }
        else {
            switch (ImGui.GetMouseCursor()) {
                case ImGui.MouseCursor.None:
                    document.body.style.cursor = "none";
                    break;
                default:
                case ImGui.MouseCursor.Arrow:
                    document.body.style.cursor = "default";
                    break;
                case ImGui.MouseCursor.TextInput:
                    document.body.style.cursor = "text";
                    break; // When hovering over InputText, etc.
                case ImGui.MouseCursor.Move:
                    document.body.style.cursor = "move";
                    break; // Unused
                case ImGui.MouseCursor.ResizeNS:
                    document.body.style.cursor = "ns-resize";
                    break; // When hovering over an horizontal border
                case ImGui.MouseCursor.ResizeEW:
                    document.body.style.cursor = "ew-resize";
                    break; // When hovering over a vertical border or a column
                case ImGui.MouseCursor.ResizeNESW:
                    document.body.style.cursor = "nesw-resize";
                    break; // When hovering over the bottom-left corner of a window
                case ImGui.MouseCursor.ResizeNWSE:
                    document.body.style.cursor = "nwse-resize";
                    break; // When hovering over the bottom-right corner of a window
            }
        }
    }
    // Gamepad navigation mapping [BETA]
    for (let i = 0; i < io.NavInputs.length; ++i) {
        io.NavInputs[i] = 0.0;
    }
    if (io.NavFlags & imgui_2.ImGuiNavFlags.EnableGamepad) {
        // Update gamepad inputs
        const gamepads = typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function" ? navigator.getGamepads() : [];
        for (let i = 0; i < gamepads.length; ++i) {
            const gamepad = gamepads[i];
            if (!gamepad) {
                continue;
            }
            const buttons_count = gamepad.buttons.length;
            const axes_count = gamepad.axes.length;
            function MAP_BUTTON(NAV_NO, BUTTON_NO) {
                if (buttons_count > BUTTON_NO && gamepad.buttons[BUTTON_NO].pressed)
                    io.NavInputs[NAV_NO] = 1.0;
            }
            function MAP_ANALOG(NAV_NO, AXIS_NO, V0, V1) {
                let v = (axes_count > AXIS_NO) ? gamepad.axes[AXIS_NO] : V0;
                v = (v - V0) / (V1 - V0);
                if (v > 1.0)
                    v = 1.0;
                if (io.NavInputs[NAV_NO] < v)
                    io.NavInputs[NAV_NO] = v;
            }
            // TODO: map input based on vendor and product id
            const match = gamepad.id.match(/^.*\(.*Vendor: ([0-9a-f]{4}) Product: ([0-9a-f]{4})\).*/);
            const vendor = match && match[1] || "0000";
            const product = match && match[2] || "0000";
            switch (vendor + product) {
                case "046dc216":// Logitech Logitech Dual Action (Vendor: 046d Product: c216)
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Activate, 1); // Cross / A
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Cancel, 2); // Circle / B
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Menu, 0); // Square / X
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Input, 3); // Triangle / Y
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadLeft, 4, -0.3, -0.9); // D-Pad Left
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadRight, 4, +0.3, +0.9); // D-Pad Right
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadUp, 5, -0.3, -0.9); // D-Pad Up
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadDown, 5, +0.3, +0.9); // D-Pad Down
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusPrev, 4); // L1 / LB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusNext, 5); // R1 / RB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakSlow, 6); // L2 / LT
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakFast, 7); // R2 / RT
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickLeft, 0, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickRight, 0, +0.3, +0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickUp, 1, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickDown, 1, +0.3, +0.9);
                    break;
                case "046dc21d":// Logitech Gamepad F310 (STANDARD GAMEPAD Vendor: 046d Product: c21d)
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Activate, 0); // Cross / A
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Cancel, 1); // Circle / B
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Menu, 2); // Square / X
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Input, 3); // Triangle / Y
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadLeft, 14); // D-Pad Left
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadRight, 15); // D-Pad Right
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadUp, 12); // D-Pad Up
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadDown, 13); // D-Pad Down
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusPrev, 4); // L1 / LB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusNext, 5); // R1 / RB
                    MAP_ANALOG(imgui_3.ImGuiNavInput.TweakSlow, 6, +0.3, +0.9); // L2 / LT
                    MAP_ANALOG(imgui_3.ImGuiNavInput.TweakFast, 7, +0.3, +0.9); // R2 / RT
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickLeft, 0, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickRight, 0, +0.3, +0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickUp, 1, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickDown, 1, +0.3, +0.9);
                    break;
                case "2dc86001": // 8Bitdo SN30 Pro  8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6001)
                case "2dc86101":// 8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6101)
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Activate, 1); // Cross / A
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Cancel, 0); // Circle / B
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Menu, 4); // Square / X
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Input, 3); // Triangle / Y
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadLeft, 6, -0.3, -0.9); // D-Pad Left
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadRight, 6, +0.3, +0.9); // D-Pad Right
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadUp, 7, -0.3, -0.9); // D-Pad Up
                    MAP_ANALOG(imgui_3.ImGuiNavInput.DpadDown, 7, +0.3, +0.9); // D-Pad Down
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusPrev, 6); // L1 / LB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusNext, 7); // R1 / RB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakSlow, 8); // L2 / LT
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakFast, 9); // R2 / RT
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickLeft, 0, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickRight, 0, +0.3, +0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickUp, 1, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickDown, 1, +0.3, +0.9);
                    break;
                default:// standard gamepad: https://w3c.github.io/gamepad/#remapping
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Activate, 0); // Cross / A
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Cancel, 1); // Circle / B
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Menu, 2); // Square / X
                    MAP_BUTTON(imgui_3.ImGuiNavInput.Input, 3); // Triangle / Y
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadLeft, 14); // D-Pad Left
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadRight, 15); // D-Pad Right
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadUp, 12); // D-Pad Up
                    MAP_BUTTON(imgui_3.ImGuiNavInput.DpadDown, 13); // D-Pad Down
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusPrev, 4); // L1 / LB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.FocusNext, 5); // R1 / RB
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakSlow, 6); // L2 / LT
                    MAP_BUTTON(imgui_3.ImGuiNavInput.TweakFast, 7); // R2 / RT
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickLeft, 0, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickRight, 0, +0.3, +0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickUp, 1, -0.3, -0.9);
                    MAP_ANALOG(imgui_3.ImGuiNavInput.LStickDown, 1, +0.3, +0.9);
                    break;
            }
        }
    }
    ImGui.NewFrame();
}
exports.NewFrame = NewFrame;
function EndFrame() {
    ImGui.EndFrame();
    ImGui.Render();
}
exports.EndFrame = EndFrame;
function RenderDrawData(draw_data = ImGui.GetDrawData()) {
    const io = ImGui.GetIO();
    if (draw_data === null) {
        throw new Error();
    }
    exports.gl || console.log(draw_data);
    // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
    const fb_width = io.DisplaySize.x * io.DisplayFramebufferScale.x;
    const fb_height = io.DisplaySize.y * io.DisplayFramebufferScale.y;
    if (fb_width === 0 || fb_height === 0) {
        return;
    }
    draw_data.ScaleClipRects(io.DisplayFramebufferScale);
    // Backup GL state
    const last_program = exports.gl && exports.gl.getParameter(exports.gl.CURRENT_PROGRAM) || null;
    const last_texture = exports.gl && exports.gl.getParameter(exports.gl.TEXTURE_BINDING_2D) || null;
    const last_array_buffer = exports.gl && exports.gl.getParameter(exports.gl.ARRAY_BUFFER_BINDING) || null;
    const last_element_array_buffer = exports.gl && exports.gl.getParameter(exports.gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;
    // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled
    exports.gl && exports.gl.enable(exports.gl.BLEND);
    exports.gl && exports.gl.blendEquation(exports.gl.FUNC_ADD);
    exports.gl && exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
    exports.gl && exports.gl.disable(exports.gl.CULL_FACE);
    exports.gl && exports.gl.disable(exports.gl.DEPTH_TEST);
    exports.gl && exports.gl.enable(exports.gl.SCISSOR_TEST);
    exports.gl && exports.gl.activeTexture(exports.gl.TEXTURE0);
    // Setup orthographic projection matrix
    const ortho_projection = new Float32Array([
        2.0 / io.DisplaySize.x, 0.0, 0.0, 0.0,
        0.0, -2.0 / io.DisplaySize.y, 0.0, 0.0,
        0.0, 0.0, -1.0, 0.0,
        -1.0, 1.0, 0.0, 1.0,
    ]);
    exports.gl && exports.gl.useProgram(g_ShaderHandle);
    exports.gl && exports.gl.uniform1i(g_AttribLocationTex, 0);
    exports.gl && g_AttribLocationProjMtx && exports.gl.uniformMatrix4fv(g_AttribLocationProjMtx, false, ortho_projection);
    // Render command lists
    exports.gl && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, g_VboHandle);
    exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationPosition);
    exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationUV);
    exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationColor);
    exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationPosition, 2, exports.gl.FLOAT, false, ImGui.ImDrawVertSize, ImGui.ImDrawVertPosOffset);
    exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationUV, 2, exports.gl.FLOAT, false, ImGui.ImDrawVertSize, ImGui.ImDrawVertUVOffset);
    exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationColor, 4, exports.gl.UNSIGNED_BYTE, true, ImGui.ImDrawVertSize, ImGui.ImDrawVertColOffset);
    const ElemType = exports.gl && ((ImGui.ImDrawIdxSize === 4) ? exports.gl.UNSIGNED_INT : exports.gl.UNSIGNED_SHORT) || 0;
    draw_data.IterateDrawLists((draw_list) => {
        exports.gl || console.log(draw_list);
        exports.gl || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
        exports.gl || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);
        exports.gl && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, g_VboHandle);
        exports.gl && exports.gl.bufferData(exports.gl.ARRAY_BUFFER, draw_list.VtxBuffer, exports.gl.STREAM_DRAW);
        exports.gl && exports.gl.bindBuffer(exports.gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
        exports.gl && exports.gl.bufferData(exports.gl.ELEMENT_ARRAY_BUFFER, draw_list.IdxBuffer, exports.gl.STREAM_DRAW);
        let ElemStart = 0;
        draw_list.IterateDrawCmds((draw_cmd) => {
            exports.gl || console.log(draw_cmd);
            exports.gl || console.log("ElemCount", draw_cmd.ElemCount);
            exports.gl || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
            exports.gl || console.log("TextureId", draw_cmd.TextureId);
            if (!exports.gl) {
                console.log("i: pos.x pos.y uv.x uv.y col");
                for (let i = 0; i < Math.min(3, draw_cmd.ElemCount); ++i) {
                    const view = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i * ImGui.ImDrawVertSize);
                    console.log(`${i}: ${view.pos[0].toFixed(2)} ${view.pos[1].toFixed(2)} ${view.uv[0].toFixed(5)} ${view.uv[1].toFixed(5)} ${("00000000" + view.col[0].toString(16)).substr(-8)}`);
                }
            }
            if (draw_cmd.UserCallback !== null) {
                draw_cmd.UserCallback(draw_list, draw_cmd);
            }
            else {
                exports.gl && exports.gl.bindTexture(exports.gl.TEXTURE_2D, draw_cmd.TextureId);
                exports.gl && exports.gl.scissor(draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
                exports.gl && exports.gl.drawElements(exports.gl.TRIANGLES, draw_cmd.ElemCount, ElemType, ElemStart * ImGui.ImDrawIdxSize);
            }
            ElemStart += draw_cmd.ElemCount;
        });
    });
    // Restore modified state
    exports.gl && exports.gl.disableVertexAttribArray(g_AttribLocationPosition);
    exports.gl && exports.gl.disableVertexAttribArray(g_AttribLocationUV);
    exports.gl && exports.gl.disableVertexAttribArray(g_AttribLocationColor);
    exports.gl && last_program && exports.gl.useProgram(last_program);
    exports.gl && last_texture && exports.gl.bindTexture(exports.gl.TEXTURE_2D, last_texture);
    exports.gl && last_array_buffer && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, last_array_buffer);
    exports.gl && last_element_array_buffer && exports.gl.bindBuffer(exports.gl.ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
    exports.gl && exports.gl.disable(exports.gl.SCISSOR_TEST);
}
exports.RenderDrawData = RenderDrawData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLG9DQUF5QztBQUN6QyxvQ0FBeUM7QUFNOUIsUUFBQSxFQUFFLEdBQWlDLElBQUksQ0FBQztBQUNuRCxJQUFJLGNBQWMsR0FBd0IsSUFBSSxDQUFDO0FBQy9DLElBQUksWUFBWSxHQUF1QixJQUFJLENBQUM7QUFDNUMsSUFBSSxZQUFZLEdBQXVCLElBQUksQ0FBQztBQUM1QyxJQUFJLG1CQUFtQixHQUFnQyxJQUFJLENBQUM7QUFDNUQsSUFBSSx1QkFBdUIsR0FBZ0MsSUFBSSxDQUFDO0FBQ2hFLElBQUksd0JBQXdCLEdBQVUsQ0FBQyxDQUFDLENBQUM7QUFDekMsSUFBSSxrQkFBa0IsR0FBVSxDQUFDLENBQUMsQ0FBQztBQUNuQyxJQUFJLHFCQUFxQixHQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksV0FBVyxHQUF1QixJQUFJLENBQUM7QUFDM0MsSUFBSSxnQkFBZ0IsR0FBdUIsSUFBSSxDQUFDO0FBQ2hELElBQUksYUFBYSxHQUF3QixJQUFJLENBQUM7QUFFOUMsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0FBRTFCLGNBQXFCLE1BQWdDO0lBQ2pELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixVQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBaUIsRUFBUSxFQUFFO1lBQ3hELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNs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LENBQUMsWUFBWTtvQkFDdEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtvQkFDdkQsVUFBVSxDQUFDLHFCQUFhLENBQUMsSUFBSSxFQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtvQkFDdkQsVUFBVSxDQUFDLHFCQUFhLENBQUMsS0FBSyxFQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZTtvQkFDekQsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtvQkFDeEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYztvQkFDekQsVUFBVSxDQUFDLHFCQUFhLENBQUMsTUFBTSxFQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVztvQkFDdEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtvQkFDeEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFB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