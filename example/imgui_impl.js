System.register(["../imgui"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function Init(canvas) {
        const io = ImGui.GetIO();
        if (canvas !== null) {
            exports_1("gl", gl = canvas.getContext("webgl", { alpha: false }));
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
        const last_texture = gl && gl.getParameter(gl.TEXTURE_BINDING_2D);
        const last_array_buffer = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING);
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
        const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32(); // Load as RGBA 32-bits for OpenGL3 demo because it is more likely to be compatible with user's existing shader.
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
        gl && last_array_buffer && gl.bindBuffer(gl.ARRAY_BUFFER, last_array_buffer);
    }
    exports_1("Init", Init);
    function Shutdown() {
        const io = ImGui.GetIO();
        io.Fonts.TexID = null;
        gl && gl.deleteTexture(g_FontTexture);
        g_FontTexture = null;
        gl && gl.deleteBuffer(g_VboHandle);
        g_VboHandle = null;
        gl && gl.deleteBuffer(g_ElementsHandle);
        g_ElementsHandle = null;
        g_AttribLocationTex = null;
        g_AttribLocationProjMtx = null;
        g_AttribLocationPosition = -1;
        g_AttribLocationUV = -1;
        g_AttribLocationColor = -1;
        gl && gl.deleteProgram(g_ShaderHandle);
        g_ShaderHandle = null;
        gl && gl.deleteShader(g_VertHandle);
        g_VertHandle = null;
        gl && gl.deleteShader(g_FragHandle);
        g_FragHandle = null;
    }
    exports_1("Shutdown", Shutdown);
    function NewFrame(time) {
        const io = ImGui.GetIO();
        const w = gl && gl.canvas.width || 640;
        const h = gl && gl.canvas.height || 480;
        const display_w = gl && gl.drawingBufferWidth || w;
        const display_h = gl && gl.drawingBufferHeight || h;
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
                    case ImGui.MouseCursor.ResizeAll:
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
        if (io.ConfigFlags & imgui_2.ImGuiConfigFlags.EnableGamepad) {
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
    exports_1("NewFrame", NewFrame);
    function EndFrame() {
        ImGui.EndFrame();
        ImGui.Render();
    }
    exports_1("EndFrame", EndFrame);
    function RenderDrawData(draw_data = ImGui.GetDrawData()) {
        const io = ImGui.GetIO();
        if (draw_data === null) {
            throw new Error();
        }
        gl || console.log(draw_data);
        // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
        const fb_width = io.DisplaySize.x * io.DisplayFramebufferScale.x;
        const fb_height = io.DisplaySize.y * io.DisplayFramebufferScale.y;
        if (fb_width === 0 || fb_height === 0) {
            return;
        }
        draw_data.ScaleClipRects(io.DisplayFramebufferScale);
        // Backup GL state
        const last_program = gl && gl.getParameter(gl.CURRENT_PROGRAM) || null;
        const last_texture = gl && gl.getParameter(gl.TEXTURE_BINDING_2D) || null;
        const last_array_buffer = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING) || null;
        const last_element_array_buffer = gl && gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;
        // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled
        gl && gl.enable(gl.BLEND);
        gl && gl.blendEquation(gl.FUNC_ADD);
        gl && gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl && gl.disable(gl.CULL_FACE);
        gl && gl.disable(gl.DEPTH_TEST);
        gl && gl.enable(gl.SCISSOR_TEST);
        gl && gl.activeTexture(gl.TEXTURE0);
        // Setup orthographic projection matrix
        const ortho_projection = new Float32Array([
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
        const ElemType = gl && ((ImGui.ImDrawIdxSize === 4) ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT) || 0;
        draw_data.IterateDrawLists((draw_list) => {
            gl || console.log(draw_list);
            gl || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
            gl || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);
            gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
            gl && gl.bufferData(gl.ARRAY_BUFFER, draw_list.VtxBuffer, gl.STREAM_DRAW);
            gl && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
            gl && gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, draw_list.IdxBuffer, gl.STREAM_DRAW);
            let ElemStart = 0;
            draw_list.IterateDrawCmds((draw_cmd) => {
                gl || console.log(draw_cmd);
                gl || console.log("ElemCount", draw_cmd.ElemCount);
                gl || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
                gl || console.log("TextureId", draw_cmd.TextureId);
                if (!gl) {
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
                    gl && gl.bindTexture(gl.TEXTURE_2D, draw_cmd.TextureId);
                    gl && gl.scissor(draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
                    gl && gl.drawElements(gl.TRIANGLES, draw_cmd.ElemCount, ElemType, ElemStart * ImGui.ImDrawIdxSize);
                }
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
    exports_1("RenderDrawData", RenderDrawData);
    var ImGui, imgui_1, imgui_2, imgui_3, gl, g_ShaderHandle, g_VertHandle, g_FragHandle, g_AttribLocationTex, g_AttribLocationProjMtx, g_AttribLocationPosition, g_AttribLocationUV, g_AttribLocationColor, g_VboHandle, g_ElementsHandle, g_FontTexture, prev_time;
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
                imgui_1 = ImGui_1;
                imgui_2 = ImGui_1;
                imgui_3 = ImGui_1;
            }
        ],
        execute: function () {
            exports_1("gl", gl = null);
            g_ShaderHandle = null;
            g_VertHandle = null;
            g_FragHandle = null;
            g_AttribLocationTex = null;
            g_AttribLocationProjMtx = null;
            g_AttribLocationPosition = -1;
            g_AttribLocationUV = -1;
            g_AttribLocationColor = -1;
            g_VboHandle = null;
            g_ElementsHandle = null;
            g_FontTexture = null;
            prev_time = 0;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBLGNBQXFCLE1BQWdDO1FBQ2pELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixnQkFBQSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUVsRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBaUIsRUFBUSxFQUFFO2dCQUN4RCxNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsRUFBRSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixDQUFDO2dCQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENB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Q0FBQyxDQUFDLGFBQWE7d0JBQ25FLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsS0FBSyxDQUFDO29CQUNOLEtBQUssVUFBVSxDQUFFLHNFQUFzRTt3QkFDdkYsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTt3QkFDdEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDdkQsVUFBVSxDQUFDLHFCQUFhLENBQUMsSUFBSSxFQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDdkQsVUFBVSxDQUFDLHFCQUFhLENBQUMsS0FBSyxFQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZTt3QkFDekQsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYzt3QkFDekQsVUFBVSxDQUFDLHFCQUFhLENBQUMsTUFBTSxFQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDdEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDcEQsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDaEUsVUFBVSxDQUFDLHFCQUFhLENBQUMsU0FBUyxFQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDaEUsVUFBVSxDQUFDLHFCQUFhLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxL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