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
                const devicePixelRatio = window.devicePixelRatio || 1;
                io.MousePos.x = event.offsetX * devicePixelRatio;
                io.MousePos.y = event.offsetY * devicePixelRatio;
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
                // https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/id
                const match = gamepad.id.match(/^([0-9a-f]{4})-([0-9a-f]{4})-.*$/);
                const match_chrome = gamepad.id.match(/^.*\(.*Vendor: ([0-9a-f]{4}) Product: ([0-9a-f]{4})\).*$/);
                const vendor = (match && match[1]) || (match_chrome && match_chrome[1]) || "0000";
                const product = (match && match[2]) || (match_chrome && match_chrome[2]) || "0000";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBLGNBQXFCLE1BQWdDO1FBQ2pELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixnQkFBQSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztZQUVsRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBaUIsRUFBUSxFQUFFO2dCQUN4RCxNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsRUFBRSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixDQUFDO2dCQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENB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Q0FBQyxhQUFhO3dCQUNuRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO3dCQUNwRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO3dCQUNqRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUNuRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxVQUFVLEVBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsUUFBUSxFQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxVQUFVLEVBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELEtBQUssQ0FBQztvQkFDTixLQUFLLFVBQVUsQ0FBRSxzRUFBc0U7d0JBQ3ZGLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3RELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQ3pELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQ3pELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ3RELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2hFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2hFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsS0FBSyxDQUFDO29CQUNOLEtBQUssVUFBVSxDQUFDLENBQUMsZ0VBQWdFO29CQUNqRixLQUFLLFVBQVUsQ0FBRSwrQ0FBK0M7d0JBQ2hFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3RELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQ3pELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ25FLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQ3BFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ2pFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ25FLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsS0FBSyxDQUFDO29CQUNOLFFBQVMsNkRBQTZEO3dCQUN0RSxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO3dCQUN0RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN2RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxJQUFJLEVBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN2RCxVQUFVLENBQUMscUJBQWEs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