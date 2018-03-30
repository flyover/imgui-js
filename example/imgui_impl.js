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
                if ( /*io.WantCaptureKeyboard ||*/event.keyCode === 9) {
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
            canvas.style.touchAction = "none"; // Disable browser handling of all panning and zooming gestures.
            canvas.addEventListener("pointermove", (event) => {
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
            canvas.addEventListener("pointerdown", (event) => {
                const io = ImGui.GetIO();
                io.MousePos.x = event.offsetX;
                io.MousePos.y = event.offsetY;
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
            canvas.addEventListener("pointerup", (event) => {
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
        const w = gl && gl.canvas.scrollWidth || 640;
        const h = gl && gl.canvas.scrollHeight || 480;
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
            const gamepads = (typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad = gamepads[i];
                if (!gamepad) {
                    continue;
                }
                const buttons_count = gamepad.buttons.length;
                const axes_count = gamepad.axes.length;
                function MAP_BUTTON(NAV_NO, BUTTON_NO) {
                    if (!gamepad) {
                        return;
                    }
                    if (buttons_count > BUTTON_NO && gamepad.buttons[BUTTON_NO].pressed)
                        io.NavInputs[NAV_NO] = 1.0;
                }
                function MAP_ANALOG(NAV_NO, AXIS_NO, V0, V1) {
                    if (!gamepad) {
                        return;
                    }
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
                    case "046dc216": // Logitech Logitech Dual Action (Vendor: 046d Product: c216)
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
                    case "046dc21d": // Logitech Gamepad F310 (STANDARD GAMEPAD Vendor: 046d Product: c21d)
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
                    case "2dc86101": // 8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6101)
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
                    default: // standard gamepad: https://w3c.github.io/gamepad/#remapping
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBLGNBQXFCLE1BQWdDO1FBQ2pELE1BQU0sRUFBRSxHQUFZLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDakIsZ0JBQUEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUM7WUFFbEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQWlCLEVBQVEsRUFBRTtnQkFDeEQsTUFBTSxFQUFFLEdBQVksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsQyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsRUFBRSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO29CQUN6QyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDMUI7Z0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO29CQUMxQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0I7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUs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QUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsTUFBTTtvQkFDTixLQUFLLFVBQVUsRUFBRSxzRUFBc0U7d0JBQ3ZGLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3RELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3ZELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQ3pELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQ3pELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLE1BQU0sRUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ3RELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3BELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2hFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2hFLFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsVUFBVSxDQUFDLHFCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JELFVBQVUsQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsTUFBTTtvQkFDTixLQUFLLFVBQVUsQ0FBQyxDQUFDLGdFQUFnRTtvQkFDakYsS0FBSyxVQUFVLEVBQUUsK0NBQStDO3dCQUNoRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO3dCQUN0RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN2RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxJQUFJLEVBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN2RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxLQUFLLEVBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlO3dCQUN6RCxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUNuRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO3dCQUNwRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO3dCQUNqRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUNuRSxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNwRCxVQUFVLENBQUMscUJBQWEsQ0FBQyxVQUFVLEVBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENB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