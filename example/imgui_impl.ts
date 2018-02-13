import * as ImGui from "../imgui";
import { ImGuiKey } from "../imgui";
import { ImGuiIO } from "../imgui";
import { ImDrawCmd } from "../imgui";
import { ImDrawList } from "../imgui";
import { ImDrawData } from "../imgui";

export let gl: WebGLRenderingContext | null = null;
let g_ShaderHandle: WebGLProgram | null = null;
let g_VertHandle: WebGLShader | null = null;
let g_FragHandle: WebGLShader | null = null;
let g_AttribLocationTex: WebGLUniformLocation | null = null;
let g_AttribLocationProjMtx: WebGLUniformLocation | null = null;
let g_AttribLocationPosition: GLint = -1;
let g_AttribLocationUV: GLint = -1;
let g_AttribLocationColor: GLint = -1;
let g_VboHandle: WebGLBuffer | null = null;
let g_ElementsHandle: WebGLBuffer | null = null;
let g_FontTexture: WebGLTexture | null = null;

let prev_time: number = 0;

export function Init(canvas: HTMLCanvasElement | null): void {
    const io: ImGuiIO = ImGui.GetIO();

    if (canvas !== null) {
        gl = canvas.getContext("webgl", { alpha: false });

        canvas.addEventListener("blur", (event: FocusEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
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

        canvas.addEventListener("keydown", (event: KeyboardEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            io.KeysDown[event.keyCode] = true;
            if (/*io.WantCaptureKeyboard ||*/ event.keyCode === 9) {
                event.preventDefault();
            }
        });

        canvas.addEventListener("keyup", (event: KeyboardEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            io.KeysDown[event.keyCode] = false;
            if (io.WantCaptureKeyboard) {
                event.preventDefault();
            }
        });

        canvas.addEventListener("keypress", (event: KeyboardEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            io.AddInputCharacter(event.charCode);
            if (io.WantCaptureKeyboard) {
                event.preventDefault();
            }
        });

        canvas.addEventListener("mousemove", (event: MouseEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
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
        const mouse_button_map: number[] = [ 0, 2, 1, 3, 4 ];

        canvas.addEventListener("mousedown", (event: MouseEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = true;
            // if (io.WantCaptureMouse) {
            //     event.preventDefault();
            // }
        });
        canvas.addEventListener("contextmenu", (event: PointerEvent): void => {
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });

        canvas.addEventListener("mouseup", (event: MouseEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = false;
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });

        canvas.addEventListener("wheel", (event: WheelEvent): void => {
            const io: ImGuiIO = ImGui.GetIO();
            let scale: number = 1.0;
            switch (event.deltaMode) {
                case event.DOM_DELTA_PIXEL: scale = 0.01; break;
                case event.DOM_DELTA_LINE: scale = 0.2; break;
                case event.DOM_DELTA_PAGE: scale = 1.0; break;
            }
            io.MouseWheel = -event.deltaY * scale; // Mouse wheel: 1 unit scrolls about 5 lines text.
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
        });
    }

    // io.SetClipboardTextFn = ImGui_Impl_SetClipboardText;
    // io.GetClipboardTextFn = ImGui_Impl_GetClipboardText;
    // io.ClipboardUserData = NULL;

    io.KeyMap[ImGuiKey.Tab] = 9; // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
    io.KeyMap[ImGuiKey.LeftArrow] = 37;
    io.KeyMap[ImGuiKey.RightArrow] = 39;
    io.KeyMap[ImGuiKey.UpArrow] = 38;
    io.KeyMap[ImGuiKey.DownArrow] = 40;
    io.KeyMap[ImGuiKey.PageUp] = 33;
    io.KeyMap[ImGuiKey.PageDown] = 34;
    io.KeyMap[ImGuiKey.Home] = 36;
    io.KeyMap[ImGuiKey.End] = 35;
    io.KeyMap[ImGuiKey.Delete] = 46;
    io.KeyMap[ImGuiKey.Backspace] = 8;
    io.KeyMap[ImGuiKey.Enter] = 13;
    io.KeyMap[ImGuiKey.Escape] = 27;
    io.KeyMap[ImGuiKey.A] = 65;
    io.KeyMap[ImGuiKey.C] = 67;
    io.KeyMap[ImGuiKey.V] = 86;
    io.KeyMap[ImGuiKey.X] = 88;
    io.KeyMap[ImGuiKey.Y] = 89;
    io.KeyMap[ImGuiKey.Z] = 90;

    // Backup GL state
    const last_texture: WebGLTexture | null = gl && gl.getParameter(gl.TEXTURE_BINDING_2D);
    const last_array_buffer: WebGLBuffer | null = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING);

    const vertex_shader: string[] = [
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

    const fragment_shader: string[] = [
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

    g_ShaderHandle = gl && gl.createProgram();
    g_VertHandle = gl && gl.createShader(gl.VERTEX_SHADER);
    g_FragHandle = gl && gl.createShader(gl.FRAGMENT_SHADER);
    gl && gl.shaderSource(g_VertHandle, vertex_shader.join("\n"));
    gl && gl.shaderSource(g_FragHandle, fragment_shader.join("\n"));
    gl && gl.compileShader(g_VertHandle);
    gl && gl.compileShader(g_FragHandle);
    gl && gl.attachShader(g_ShaderHandle, g_VertHandle);
    gl && gl.attachShader(g_ShaderHandle, g_FragHandle);
    gl && gl.linkProgram(g_ShaderHandle);

    g_AttribLocationTex = gl && gl.getUniformLocation(g_ShaderHandle, "Texture");
    g_AttribLocationProjMtx = gl && gl.getUniformLocation(g_ShaderHandle, "ProjMtx");
    g_AttribLocationPosition = gl && gl.getAttribLocation(g_ShaderHandle, "Position") || 0;
    g_AttribLocationUV = gl && gl.getAttribLocation(g_ShaderHandle, "UV") || 0;
    g_AttribLocationColor = gl && gl.getAttribLocation(g_ShaderHandle, "Color") || 0;

    g_VboHandle = gl && gl.createBuffer();
    g_ElementsHandle = gl && gl.createBuffer();

    // Build texture
    // const width: number = 256;
    // const height: number = 256;
    // const pixels: Uint8Array = new Uint8Array(4 * width * height).fill(0xff);
    const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32();   // Load as RGBA 32-bits for OpenGL3 demo because it is more likely to be compatible with user's existing shader.
    // console.log(`font texture ${width} x ${height} @ ${pixels.length}`);

    // Create OpenGL texture
    g_FontTexture = gl && gl.createTexture();
    gl && gl.bindTexture(gl.TEXTURE_2D, g_FontTexture);
    gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    // Store our identifier
    io.Fonts.TexID = g_FontTexture || { foo: "bar" };
    // console.log("font texture id", g_FontTexture);

    // Cleanup (don't clear the input data if you want to append new fonts later)
    // io.Fonts.ClearInputData();
    // io.Fonts.ClearTexData();

    // Restore modified GL state
    gl && last_texture && gl.bindTexture(gl.TEXTURE_2D, last_texture);
    gl && last_array_buffer && gl.bindBuffer(gl.ARRAY_BUFFER_BINDING, last_array_buffer);

    // This is the main rendering function that you have to implement and provide to ImGui (via setting up 'RenderDrawListsFn' in the ImGuiIO structure)
    // Note that this implementation is little overcomplicated because we are saving/setting up/restoring every OpenGL state explicitly, in order to be able to run within any OpenGL engine that doesn't do so. 
    // If text or lines are blurry when integrating ImGui in your engine: in your Render function, try translating your projection matrix by (0.5f,0.5f) or (0.375f,0.375f)
    // io.RenderDrawListsFn = RenderDrawLists;
}

export function Shutdown(): void {
    const io: ImGuiIO = ImGui.GetIO();

    io.Fonts.TexID = null;
    gl && gl.deleteTexture(g_FontTexture); g_FontTexture = null;

    gl && gl.deleteBuffer(g_VboHandle); g_VboHandle = null;
    gl && gl.deleteBuffer(g_ElementsHandle); g_ElementsHandle = null;

    g_AttribLocationTex = null;
    g_AttribLocationProjMtx = null;
    g_AttribLocationPosition = -1;
    g_AttribLocationUV = -1;
    g_AttribLocationColor = -1;
    
    gl && gl.deleteProgram(g_ShaderHandle); g_ShaderHandle = null;
    gl && gl.deleteShader(g_VertHandle); g_VertHandle = null;
    gl && gl.deleteShader(g_FragHandle); g_FragHandle = null;

    ImGui.Shutdown();
}

export function NewFrame(time: number): void {
    const io: ImGuiIO = ImGui.GetIO();

    const w: number = gl && gl.canvas.width || 640;
    const h: number = gl && gl.canvas.height || 480;
    const display_w: number = gl && gl.drawingBufferWidth || w;
    const display_h: number = gl && gl.drawingBufferHeight || h;
    io.DisplaySize.x = w;
    io.DisplaySize.y = h;
    io.DisplayFramebufferScale.x = w > 0 ? (display_w / w) : 0;
    io.DisplayFramebufferScale.y = h > 0 ? (display_h / h) : 0;

    let dt: number = time - prev_time;
    prev_time = time;
    io.DeltaTime = dt / 1000;

    ImGui.NewFrame();
}

export function EndFrame(): void {
    ImGui.EndFrame();

    ImGui.Render();
}

export function RenderDrawLists(draw_data: ImDrawData | null = ImGui.GetDrawData()): void {
    const io: ImGuiIO = ImGui.GetIO();
    if (draw_data === null) { throw new Error(); }

    gl || console.log(draw_data);

    // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
    const fb_width: number = io.DisplaySize.x * io.DisplayFramebufferScale.x;
    const fb_height: number = io.DisplaySize.y * io.DisplayFramebufferScale.y;
    if (fb_width == 0 || fb_height == 0) {
        return;
    }
    draw_data.ScaleClipRects(io.DisplayFramebufferScale);

    // Backup GL state
    const last_program: WebGLProgram | null = gl && gl.getParameter(gl.CURRENT_PROGRAM) || null;
    const last_texture: WebGLTexture | null = gl && gl.getParameter(gl.TEXTURE_BINDING_2D) || null;
    const last_array_buffer: WebGLBuffer | null = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING) || null;
    const last_element_array_buffer: WebGLBuffer | null = gl && gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;

    // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled
    gl && gl.enable(gl.BLEND);
    gl && gl.blendEquation(gl.FUNC_ADD);
    gl && gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl && gl.disable(gl.CULL_FACE);
    gl && gl.disable(gl.DEPTH_TEST);
    gl && gl.enable(gl.SCISSOR_TEST);
    gl && gl.activeTexture(gl.TEXTURE0);

    // Setup orthographic projection matrix
    const ortho_projection: Float32Array = new Float32Array([
        2.0 / io.DisplaySize.x, 0.0, 0.0, 0.0,
        0.0, -2.0 / io.DisplaySize.y, 0.0, 0.0,
        0.0, 0.0, -1.0, 0.0,
        -1.0, 1.0, 0.0, 1.0,
    ]);
    gl && gl.useProgram(g_ShaderHandle);
    gl && gl.uniform1i(g_AttribLocationTex, 0);
    gl && g_AttribLocationProjMtx && gl.uniformMatrix4fv(g_AttribLocationProjMtx, false, ortho_projection);

    // Render command lists
    gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
    gl && gl.enableVertexAttribArray(g_AttribLocationPosition);
    gl && gl.enableVertexAttribArray(g_AttribLocationUV);
    gl && gl.enableVertexAttribArray(g_AttribLocationColor);

    gl && gl.vertexAttribPointer(g_AttribLocationPosition, 2, gl.FLOAT, false, ImGui.ImDrawVertSize, ImGui.ImDrawVertPosOffset);
    gl && gl.vertexAttribPointer(g_AttribLocationUV, 2, gl.FLOAT, false, ImGui.ImDrawVertSize, ImGui.ImDrawVertUVOffset);
    gl && gl.vertexAttribPointer(g_AttribLocationColor, 4, gl.UNSIGNED_BYTE, true, ImGui.ImDrawVertSize, ImGui.ImDrawVertColOffset);

    const ElemType: GLenum = gl && ((ImGui.ImDrawIdxSize === 4) ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT) || 0;

    draw_data.IterateDrawLists((draw_list: ImDrawList): void => {
        gl || console.log(draw_list);
        gl || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
        gl || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);

        gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
        gl && gl.bufferData(gl.ARRAY_BUFFER, draw_list.VtxBuffer, gl.STREAM_DRAW);
        gl && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
        gl && gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, draw_list.IdxBuffer, gl.STREAM_DRAW);

        let ElemStart: number = 0;

        draw_list.IterateDrawCmds((draw_cmd: ImDrawCmd): void => {
            gl || console.log(draw_cmd);
            gl || console.log("ElemCount", draw_cmd.ElemCount);
            gl || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
            gl || console.log("TextureId", draw_cmd.TextureId);
            if (!gl) {
                console.log("i: pos.x pos.y uv.x uv.y col");
                for (let i = 0; i < Math.min(3, draw_cmd.ElemCount); ++i) {
                    const view: ImGui.ImDrawVert = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i * ImGui.ImDrawVertSize);
                    console.log(`${i}: ${view.pos[0].toFixed(2)} ${view.pos[1].toFixed(2)} ${view.uv[0].toFixed(5)} ${view.uv[1].toFixed(5)} ${("00000000" + view.col[0].toString(16)).substr(-8)}`);
                }
            }

            gl && gl.bindTexture(gl.TEXTURE_2D, draw_cmd.TextureId);
            gl && gl.scissor(draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
            gl && gl.drawElements(gl.TRIANGLES, draw_cmd.ElemCount, ElemType, ElemStart * ImGui.ImDrawIdxSize);

            ElemStart += draw_cmd.ElemCount;
        });
    });

    // Restore modified state
    gl && gl.disableVertexAttribArray(g_AttribLocationPosition);
    gl && gl.disableVertexAttribArray(g_AttribLocationUV);
    gl && gl.disableVertexAttribArray(g_AttribLocationColor);
    gl && last_program && gl.useProgram(last_program);
    gl && last_texture && gl.bindTexture(gl.TEXTURE_2D, last_texture);
    gl && last_array_buffer && gl.bindBuffer(gl.ARRAY_BUFFER, last_array_buffer);
    gl && last_element_array_buffer && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
    gl && gl.disable(gl.SCISSOR_TEST);
}
