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
            io.MouseWheel = -event.deltaY * scale; // Mouse wheel: 1 unit scrolls about 5 lines text.
            if (io.WantCaptureMouse) {
                event.preventDefault();
            }
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
    // io.RenderDrawListsFn = RenderDrawLists;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFPdkIsUUFBQSxFQUFFLEdBQWlDLElBQUksQ0FBQztBQUNuRCxJQUFJLGNBQWMsR0FBd0IsSUFBSSxDQUFDO0FBQy9DLElBQUksWUFBWSxHQUF1QixJQUFJLENBQUM7QUFDNUMsSUFBSSxZQUFZLEdBQXVCLElBQUksQ0FBQztBQUM1QyxJQUFJLG1CQUFtQixHQUFnQyxJQUFJLENBQUM7QUFDNUQsSUFBSSx1QkFBdUIsR0FBZ0MsSUFBSSxDQUFDO0FBQ2hFLElBQUksd0JBQXdCLEdBQVUsQ0FBQyxDQUFDLENBQUM7QUFDekMsSUFBSSxrQkFBa0IsR0FBVSxDQUFDLENBQUMsQ0FBQztBQUNuQyxJQUFJLHFCQUFxQixHQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLElBQUksV0FBVyxHQUF1QixJQUFJLENBQUM7QUFDM0MsSUFBSSxnQkFBZ0IsR0FBdUIsSUFBSSxDQUFDO0FBQ2hELElBQUksYUFBYSxHQUF3QixJQUFJLENBQUM7QUFFOUMsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0FBRTFCLGNBQXFCLE1BQWdDO0lBQ2pELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixVQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBaUIsRUFBUSxFQUFFO1lBQ3hELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNuQixF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