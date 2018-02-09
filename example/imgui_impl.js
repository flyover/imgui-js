"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImGui = require("../imgui");
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
function Init() {
    const io = ImGui.GetIO();
    if (typeof (window) !== "undefined") {
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.right = "0px";
        canvas.style.top = "0px";
        canvas.style.bottom = "0px";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        document.body.appendChild(canvas);
        exports.gl = canvas.getContext("webgl", { alpha: false });
        window.addEventListener("blur", (event) => {
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
        window.addEventListener("keydown", (event) => {
            const io = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            io.KeysDown[event.keyCode] = true;
            if (event.keyCode === 9) {
                event.preventDefault();
            }
        });
        window.addEventListener("keyup", (event) => {
            const io = ImGui.GetIO();
            io.KeyCtrl = event.ctrlKey;
            io.KeyShift = event.shiftKey;
            io.KeyAlt = event.altKey;
            io.KeySuper = event.metaKey;
            io.KeysDown[event.keyCode] = false;
            event.preventDefault();
        });
        window.addEventListener("keypress", (event) => {
            const io = ImGui.GetIO();
            io.AddInputCharacter(event.charCode);
            event.preventDefault();
        });
        window.addEventListener("mousemove", (event) => {
            const io = ImGui.GetIO();
            io.MousePos.x = event.clientX;
            io.MousePos.y = event.clientY;
            event.preventDefault();
        });
        // MouseEvent.button
        // A number representing a given button:
        // 0: Main button pressed, usually the left button or the un-initialized state
        // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
        // 2: Secondary button pressed, usually the right button
        // 3: Fourth button, typically the Browser Back button
        // 4: Fifth button, typically the Browser Forward button
        const mouse_button_map = [0, 2, 1, 3, 4];
        window.addEventListener("mousedown", (event) => {
            const io = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = true;
            event.preventDefault();
        });
        window.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
        window.addEventListener("mouseup", (event) => {
            const io = ImGui.GetIO();
            io.MouseDown[mouse_button_map[event.button]] = false;
            event.preventDefault();
        });
        window.addEventListener("wheel", (event) => {
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
            io.MouseWheel = event.wheelDeltaY * scale; // Mouse wheel: 1 unit scrolls about 5 lines text.
            event.preventDefault();
        });
    }
    // io.SetClipboardTextFn = ImGui_Impl_SetClipboardText;
    // io.GetClipboardTextFn = ImGui_Impl_GetClipboardText;
    // io.ClipboardUserData = NULL;
    io.KeyMap[0 /* Tab */] = 9; // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
    io.KeyMap[1 /* LeftArrow */] = 37;
    io.KeyMap[2 /* RightArrow */] = 39;
    io.KeyMap[3 /* UpArrow */] = 38;
    io.KeyMap[4 /* DownArrow */] = 40;
    io.KeyMap[5 /* PageUp */] = 33;
    io.KeyMap[6 /* PageDown */] = 34;
    io.KeyMap[7 /* Home */] = 36;
    io.KeyMap[8 /* End */] = 35;
    io.KeyMap[9 /* Delete */] = 46;
    io.KeyMap[10 /* Backspace */] = 8;
    io.KeyMap[11 /* Enter */] = 13;
    io.KeyMap[12 /* Escape */] = 27;
    io.KeyMap[13 /* A */] = 65;
    io.KeyMap[14 /* C */] = 67;
    io.KeyMap[15 /* V */] = 86;
    io.KeyMap[16 /* X */] = 88;
    io.KeyMap[17 /* Y */] = 89;
    io.KeyMap[18 /* Z */] = 90;
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
    exports.gl && last_array_buffer && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER_BINDING, last_array_buffer);
    // This is the main rendering function that you have to implement and provide to ImGui (via setting up 'RenderDrawListsFn' in the ImGuiIO structure)
    // Note that this implementation is little overcomplicated because we are saving/setting up/restoring every OpenGL state explicitly, in order to be able to run within any OpenGL engine that doesn't do so. 
    // If text or lines are blurry when integrating ImGui in your engine: in your Render function, try translating your projection matrix by (0.5f,0.5f) or (0.375f,0.375f)
    // io.RenderDrawListsFn = draw_frame;
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
    ImGui.Shutdown();
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
    let dt = time - prev_time;
    prev_time = time;
    io.DeltaTime = dt / 1000;
    ImGui.NewFrame();
}
exports.NewFrame = NewFrame;
function EndFrame() {
    ImGui.EndFrame();
    ImGui.Render();
}
exports.EndFrame = EndFrame;
function RenderDrawLists(draw_data = ImGui.GetDrawData()) {
    const io = ImGui.GetIO();
    if (draw_data === null) {
        throw new Error();
    }
    exports.gl || console.log(draw_data);
    // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
    const fb_width = io.DisplaySize.x * io.DisplayFramebufferScale.x;
    const fb_height = io.DisplaySize.y * io.DisplayFramebufferScale.y;
    if (fb_width == 0 || fb_height == 0) {
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
            exports.gl && exports.gl.bindTexture(exports.gl.TEXTURE_2D, draw_cmd.TextureId);
            exports.gl && exports.gl.scissor(draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
            exports.gl && exports.gl.drawElements(exports.gl.TRIANGLES, draw_cmd.ElemCount, ElemType, ElemStart * ImGui.ImDrawIdxSize);
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
exports.RenderDrawLists = RenderDrawLists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFPdkIsUUFBQSxFQUFFLEdBQWlDLElBQUksQ0FBQztBQUNuRCxJQUFJLGNBQWMsR0FBd0IsSUFBSSxDQUFDO0FBQy9DLElBQUksWUFBWSxHQUF1QixJQUFJLENBQUM7QUFDNUMsSUFBSSxZQUFZLEdBQXVCLElBQUksQ0FBQztBQUM1QyxJQUFJLG1CQUFtQixHQUFnQyxJQUFJLENBQUM7QUFDNUQsSUFBSSx1QkFBdUIsR0FBZ0MsSUFBSSxDQUFDO0FBQ2hFLElBQUksd0JBQXdCLEdBQVUsQ0FBQyxDQUFDLENBQUM7QUFDekMsSUFBSSxrQkFBa0IsR0FBVSxDQUFDLENBQUMsQ0FBQztBQUNuQyxJQUFJLHFCQUFxQixHQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksV0FBVyxHQUF1QixJQUFJLENBQUM7QUFDM0MsSUFBSSxnQkFBZ0IsR0FBdUIsSUFBSSxDQUFDO0FBQ2hELElBQUksYUFBYSxHQUF3QixJQUFJLENBQUM7QUFFOUMsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0FBRTFCO0lBQ0ksTUFBTSxFQUFFLEdBQVksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWxDLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sTUFBTSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxH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