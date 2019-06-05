System.register(["../imgui"], function (exports_1, context_1) {
    "use strict";
    var ImGui, clipboard_text, canvas, gl, g_ShaderHandle, g_VertHandle, g_FragHandle, g_AttribLocationTex, g_AttribLocationProjMtx, g_AttribLocationPosition, g_AttribLocationUV, g_AttribLocationColor, g_VboHandle, g_ElementsHandle, g_FontTexture, ctx, prev_time, mouse_button_map;
    var __moduleName = context_1 && context_1.id;
    function document_on_copy(event) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", clipboard_text);
        }
        // console.log(`${event.type}: "${clipboard_text}"`);
        event.preventDefault();
    }
    function document_on_cut(event) {
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", clipboard_text);
        }
        // console.log(`${event.type}: "${clipboard_text}"`);
        event.preventDefault();
    }
    function document_on_paste(event) {
        if (event.clipboardData) {
            clipboard_text = event.clipboardData.getData("text/plain");
        }
        // console.log(`${event.type}: "${clipboard_text}"`);
        event.preventDefault();
    }
    function window_on_resize() {
        if (canvas !== null) {
            const devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = canvas.scrollWidth * devicePixelRatio;
            canvas.height = canvas.scrollHeight * devicePixelRatio;
        }
    }
    function window_on_gamepadconnected(event /* GamepadEvent */) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
    }
    function window_on_gamepaddisconnected(event /* GamepadEvent */) {
        console.log("Gamepad disconnected at index %d: %s.", event.gamepad.index, event.gamepad.id);
    }
    function canvas_on_blur(event) {
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
    }
    function canvas_on_keydown(event) {
        // console.log(event.type, event.key, event.keyCode);
        const io = ImGui.GetIO();
        io.KeyCtrl = event.ctrlKey;
        io.KeyShift = event.shiftKey;
        io.KeyAlt = event.altKey;
        io.KeySuper = event.metaKey;
        ImGui.IM_ASSERT(event.keyCode >= 0 && event.keyCode < ImGui.IM_ARRAYSIZE(io.KeysDown));
        io.KeysDown[event.keyCode] = true;
        // forward to the keypress event
        if ( /*io.WantCaptureKeyboard ||*/event.key === "Tab") {
            event.preventDefault();
        }
    }
    function canvas_on_keyup(event) {
        // console.log(event.type, event.key, event.keyCode);
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
    }
    function canvas_on_keypress(event) {
        // console.log(event.type, event.key, event.keyCode);
        const io = ImGui.GetIO();
        io.AddInputCharacter(event.charCode);
        if (io.WantCaptureKeyboard) {
            event.preventDefault();
        }
    }
    function canvas_on_pointermove(event) {
        const io = ImGui.GetIO();
        io.MousePos.x = event.offsetX;
        io.MousePos.y = event.offsetY;
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    function canvas_on_pointerdown(event) {
        const io = ImGui.GetIO();
        io.MousePos.x = event.offsetX;
        io.MousePos.y = event.offsetY;
        io.MouseDown[mouse_button_map[event.button]] = true;
        // if (io.WantCaptureMouse) {
        //     event.preventDefault();
        // }
    }
    function canvas_on_contextmenu(event) {
        const io = ImGui.GetIO();
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    function canvas_on_pointerup(event) {
        const io = ImGui.GetIO();
        io.MouseDown[mouse_button_map[event.button]] = false;
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    function canvas_on_wheel(event) {
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
    }
    function Init(value) {
        const io = ImGui.GetIO();
        if (typeof (window) !== "undefined") {
            ImGui.LoadIniSettingsFromMemory(window.localStorage.getItem("imgui.ini") || "");
        }
        if (typeof (navigator) !== "undefined") {
            io.ConfigMacOSXBehaviors = navigator.platform.match(/Mac/) !== null;
        }
        if (typeof (document) !== "undefined") {
            document.body.addEventListener("copy", document_on_copy);
            document.body.addEventListener("cut", document_on_cut);
            document.body.addEventListener("paste", document_on_paste);
        }
        io.SetClipboardTextFn = (user_data, text) => {
            clipboard_text = text;
            // console.log(`set clipboard_text: "${clipboard_text}"`);
            if (typeof navigator !== "undefined" && typeof navigator.clipboard !== "undefined") {
                // console.log(`clipboard.writeText: "${clipboard_text}"`);
                navigator.clipboard.writeText(clipboard_text).then(() => {
                    // console.log(`clipboard.writeText: "${clipboard_text}" done.`);
                });
            }
        };
        io.GetClipboardTextFn = (user_data) => {
            // if (typeof navigator !== "undefined" && typeof (navigator as any).clipboard !== "undefined") {
            //     console.log(`clipboard.readText: "${clipboard_text}"`);
            //     (navigator as any).clipboard.readText().then((text: string): void => {
            //         clipboard_text = text;
            //         console.log(`clipboard.readText: "${clipboard_text}" done.`);
            //     });
            // }
            // console.log(`get clipboard_text: "${clipboard_text}"`);
            return clipboard_text;
        };
        io.ClipboardUserData = null;
        if (typeof (window) !== "undefined") {
            window.addEventListener("resize", window_on_resize);
            window.addEventListener("gamepadconnected", window_on_gamepadconnected);
            window.addEventListener("gamepaddisconnected", window_on_gamepaddisconnected);
        }
        if (value instanceof (HTMLCanvasElement)) {
            value = value.getContext("webgl", { alpha: false }) || value.getContext("2d");
        }
        if (value instanceof (WebGLRenderingContext)) {
            canvas = value.canvas;
            exports_1("gl", gl = value);
        }
        if (value instanceof (CanvasRenderingContext2D)) {
            canvas = value.canvas;
            exports_1("ctx", ctx = value);
        }
        if (canvas !== null) {
            window_on_resize();
            canvas.style.touchAction = "none"; // Disable browser handling of all panning and zooming gestures.
            canvas.addEventListener("blur", canvas_on_blur);
            canvas.addEventListener("keydown", canvas_on_keydown);
            canvas.addEventListener("keyup", canvas_on_keyup);
            canvas.addEventListener("keypress", canvas_on_keypress);
            canvas.addEventListener("pointermove", canvas_on_pointermove);
            canvas.addEventListener("pointerdown", canvas_on_pointerdown);
            canvas.addEventListener("contextmenu", canvas_on_contextmenu);
            canvas.addEventListener("pointerup", canvas_on_pointerup);
            canvas.addEventListener("wheel", canvas_on_wheel);
        }
        // Setup back-end capabilities flags
        io.BackendFlags |= ImGui.BackendFlags.HasMouseCursors; // We can honor GetMouseCursor() values (optional)
        // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
        io.KeyMap[ImGui.Key.Tab] = 9;
        io.KeyMap[ImGui.Key.LeftArrow] = 37;
        io.KeyMap[ImGui.Key.RightArrow] = 39;
        io.KeyMap[ImGui.Key.UpArrow] = 38;
        io.KeyMap[ImGui.Key.DownArrow] = 40;
        io.KeyMap[ImGui.Key.PageUp] = 33;
        io.KeyMap[ImGui.Key.PageDown] = 34;
        io.KeyMap[ImGui.Key.Home] = 36;
        io.KeyMap[ImGui.Key.End] = 35;
        io.KeyMap[ImGui.Key.Insert] = 45;
        io.KeyMap[ImGui.Key.Delete] = 46;
        io.KeyMap[ImGui.Key.Backspace] = 8;
        io.KeyMap[ImGui.Key.Space] = 32;
        io.KeyMap[ImGui.Key.Enter] = 13;
        io.KeyMap[ImGui.Key.Escape] = 27;
        io.KeyMap[ImGui.Key.A] = 65;
        io.KeyMap[ImGui.Key.C] = 67;
        io.KeyMap[ImGui.Key.V] = 86;
        io.KeyMap[ImGui.Key.X] = 88;
        io.KeyMap[ImGui.Key.Y] = 89;
        io.KeyMap[ImGui.Key.Z] = 90;
        CreateDeviceObjects();
    }
    exports_1("Init", Init);
    function Shutdown() {
        DestroyDeviceObjects();
        if (canvas !== null) {
            canvas.removeEventListener("blur", canvas_on_blur);
            canvas.removeEventListener("keydown", canvas_on_keydown);
            canvas.removeEventListener("keyup", canvas_on_keyup);
            canvas.removeEventListener("keypress", canvas_on_keypress);
            canvas.removeEventListener("pointermove", canvas_on_pointermove);
            canvas.removeEventListener("pointerdown", canvas_on_pointerdown);
            canvas.removeEventListener("contextmenu", canvas_on_contextmenu);
            canvas.removeEventListener("pointerup", canvas_on_pointerup);
            canvas.removeEventListener("wheel", canvas_on_wheel);
        }
        exports_1("gl", gl = null);
        exports_1("ctx", ctx = null);
        canvas = null;
        if (typeof (window) !== "undefined") {
            window.removeEventListener("resize", window_on_resize);
            window.removeEventListener("gamepadconnected", window_on_gamepadconnected);
            window.removeEventListener("gamepaddisconnected", window_on_gamepaddisconnected);
        }
        if (typeof (document) !== "undefined") {
            document.body.removeEventListener("copy", document_on_copy);
            document.body.removeEventListener("cut", document_on_cut);
            document.body.removeEventListener("paste", document_on_paste);
        }
    }
    exports_1("Shutdown", Shutdown);
    function NewFrame(time) {
        const io = ImGui.GetIO();
        if (io.WantSaveIniSettings) {
            io.WantSaveIniSettings = false;
            if (typeof (window) !== "undefined") {
                window.localStorage.setItem("imgui.ini", ImGui.SaveIniSettingsToMemory());
            }
        }
        const w = canvas && canvas.width || 640;
        const h = canvas && canvas.height || 480;
        const display_w = gl && gl.drawingBufferWidth || w;
        const display_h = gl && gl.drawingBufferHeight || h;
        io.DisplaySize.x = w;
        io.DisplaySize.y = h;
        io.DisplayFramebufferScale.x = w > 0 ? (display_w / w) : 0;
        io.DisplayFramebufferScale.y = h > 0 ? (display_h / h) : 0;
        const dt = time - prev_time;
        prev_time = time;
        io.DeltaTime = dt / 1000;
        if (io.WantSetMousePos) {
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
                    case ImGui.MouseCursor.Hand:
                        document.body.style.cursor = "move";
                        break;
                }
            }
        }
        // Gamepad navigation mapping [BETA]
        for (let i = 0; i < io.NavInputs.length; ++i) {
            io.NavInputs[i] = 0.0;
        }
        if (io.ConfigFlags & ImGui.ConfigFlags.NavEnableGamepad) {
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
                        MAP_BUTTON(ImGui.NavInput.Activate, 1); // Cross / A
                        MAP_BUTTON(ImGui.NavInput.Cancel, 2); // Circle / B
                        MAP_BUTTON(ImGui.NavInput.Menu, 0); // Square / X
                        MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
                        MAP_ANALOG(ImGui.NavInput.DpadLeft, 4, -0.3, -0.9); // D-Pad Left
                        MAP_ANALOG(ImGui.NavInput.DpadRight, 4, +0.3, +0.9); // D-Pad Right
                        MAP_ANALOG(ImGui.NavInput.DpadUp, 5, -0.3, -0.9); // D-Pad Up
                        MAP_ANALOG(ImGui.NavInput.DpadDown, 5, +0.3, +0.9); // D-Pad Down
                        MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
                        MAP_BUTTON(ImGui.NavInput.TweakSlow, 6); // L2 / LT
                        MAP_BUTTON(ImGui.NavInput.TweakFast, 7); // R2 / RT
                        MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    case "046dc21d": // Logitech Gamepad F310 (STANDARD GAMEPAD Vendor: 046d Product: c21d)
                        MAP_BUTTON(ImGui.NavInput.Activate, 0); // Cross / A
                        MAP_BUTTON(ImGui.NavInput.Cancel, 1); // Circle / B
                        MAP_BUTTON(ImGui.NavInput.Menu, 2); // Square / X
                        MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
                        MAP_BUTTON(ImGui.NavInput.DpadLeft, 14); // D-Pad Left
                        MAP_BUTTON(ImGui.NavInput.DpadRight, 15); // D-Pad Right
                        MAP_BUTTON(ImGui.NavInput.DpadUp, 12); // D-Pad Up
                        MAP_BUTTON(ImGui.NavInput.DpadDown, 13); // D-Pad Down
                        MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
                        MAP_ANALOG(ImGui.NavInput.TweakSlow, 6, +0.3, +0.9); // L2 / LT
                        MAP_ANALOG(ImGui.NavInput.TweakFast, 7, +0.3, +0.9); // R2 / RT
                        MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    case "2dc86001": // 8Bitdo SN30 Pro  8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6001)
                    case "2dc86101": // 8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6101)
                        MAP_BUTTON(ImGui.NavInput.Activate, 1); // Cross / A
                        MAP_BUTTON(ImGui.NavInput.Cancel, 0); // Circle / B
                        MAP_BUTTON(ImGui.NavInput.Menu, 4); // Square / X
                        MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
                        MAP_ANALOG(ImGui.NavInput.DpadLeft, 6, -0.3, -0.9); // D-Pad Left
                        MAP_ANALOG(ImGui.NavInput.DpadRight, 6, +0.3, +0.9); // D-Pad Right
                        MAP_ANALOG(ImGui.NavInput.DpadUp, 7, -0.3, -0.9); // D-Pad Up
                        MAP_ANALOG(ImGui.NavInput.DpadDown, 7, +0.3, +0.9); // D-Pad Down
                        MAP_BUTTON(ImGui.NavInput.FocusPrev, 6); // L1 / LB
                        MAP_BUTTON(ImGui.NavInput.FocusNext, 7); // R1 / RB
                        MAP_BUTTON(ImGui.NavInput.TweakSlow, 8); // L2 / LT
                        MAP_BUTTON(ImGui.NavInput.TweakFast, 9); // R2 / RT
                        MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    default: // standard gamepad: https://w3c.github.io/gamepad/#remapping
                        MAP_BUTTON(ImGui.NavInput.Activate, 0); // Cross / A
                        MAP_BUTTON(ImGui.NavInput.Cancel, 1); // Circle / B
                        MAP_BUTTON(ImGui.NavInput.Menu, 2); // Square / X
                        MAP_BUTTON(ImGui.NavInput.Input, 3); // Triangle / Y
                        MAP_BUTTON(ImGui.NavInput.DpadLeft, 14); // D-Pad Left
                        MAP_BUTTON(ImGui.NavInput.DpadRight, 15); // D-Pad Right
                        MAP_BUTTON(ImGui.NavInput.DpadUp, 12); // D-Pad Up
                        MAP_BUTTON(ImGui.NavInput.DpadDown, 13); // D-Pad Down
                        MAP_BUTTON(ImGui.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui.NavInput.FocusNext, 5); // R1 / RB
                        MAP_BUTTON(ImGui.NavInput.TweakSlow, 6); // L2 / LT
                        MAP_BUTTON(ImGui.NavInput.TweakFast, 7); // R2 / RT
                        MAP_ANALOG(ImGui.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                }
            }
        }
    }
    exports_1("NewFrame", NewFrame);
    function RenderDrawData(draw_data = ImGui.GetDrawData()) {
        const io = ImGui.GetIO();
        if (draw_data === null) {
            throw new Error();
        }
        gl || ctx || console.log(draw_data);
        // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
        const fb_width = io.DisplaySize.x * io.DisplayFramebufferScale.x;
        const fb_height = io.DisplaySize.y * io.DisplayFramebufferScale.y;
        if (fb_width === 0 || fb_height === 0) {
            return;
        }
        draw_data.ScaleClipRects(io.DisplayFramebufferScale);
        // Backup GL state
        const last_active_texture = gl && gl.getParameter(gl.ACTIVE_TEXTURE) || null;
        const last_program = gl && gl.getParameter(gl.CURRENT_PROGRAM) || null;
        const last_texture = gl && gl.getParameter(gl.TEXTURE_BINDING_2D) || null;
        const last_array_buffer = gl && gl.getParameter(gl.ARRAY_BUFFER_BINDING) || null;
        const last_element_array_buffer = gl && gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;
        // GLint last_polygon_mode[2]; glGetIntegerv(GL_POLYGON_MODE, last_polygon_mode);
        const last_viewport = gl && gl.getParameter(gl.VIEWPORT) || null;
        const last_scissor_box = gl && gl.getParameter(gl.SCISSOR_BOX) || null;
        const last_blend_src_rgb = gl && gl.getParameter(gl.BLEND_SRC_RGB) || null;
        const last_blend_dst_rgb = gl && gl.getParameter(gl.BLEND_DST_RGB) || null;
        const last_blend_src_alpha = gl && gl.getParameter(gl.BLEND_SRC_ALPHA) || null;
        const last_blend_dst_alpha = gl && gl.getParameter(gl.BLEND_DST_ALPHA) || null;
        const last_blend_equation_rgb = gl && gl.getParameter(gl.BLEND_EQUATION_RGB) || null;
        const last_blend_equation_alpha = gl && gl.getParameter(gl.BLEND_EQUATION_ALPHA) || null;
        const last_enable_blend = gl && gl.getParameter(gl.BLEND) || null;
        const last_enable_cull_face = gl && gl.getParameter(gl.CULL_FACE) || null;
        const last_enable_depth_test = gl && gl.getParameter(gl.DEPTH_TEST) || null;
        const last_enable_scissor_test = gl && gl.getParameter(gl.SCISSOR_TEST) || null;
        // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled, polygon fill
        gl && gl.enable(gl.BLEND);
        gl && gl.blendEquation(gl.FUNC_ADD);
        gl && gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl && gl.disable(gl.CULL_FACE);
        gl && gl.disable(gl.DEPTH_TEST);
        gl && gl.enable(gl.SCISSOR_TEST);
        // glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);
        // Setup viewport, orthographic projection matrix
        // Our visible imgui space lies from draw_data->DisplayPps (top left) to draw_data->DisplayPos+data_data->DisplaySize (bottom right). DisplayMin is typically (0,0) for single viewport apps.
        gl && gl.viewport(0, 0, fb_width, fb_height);
        const L = draw_data.DisplayPos.x;
        const R = draw_data.DisplayPos.x + draw_data.DisplaySize.x;
        const T = draw_data.DisplayPos.y;
        const B = draw_data.DisplayPos.y + draw_data.DisplaySize.y;
        const ortho_projection = new Float32Array([
            2.0 / (R - L), 0.0, 0.0, 0.0,
            0.0, 2.0 / (T - B), 0.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            (R + L) / (L - R), (T + B) / (B - T), 0.0, 1.0,
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
        // Draw
        const pos = draw_data.DisplayPos;
        const idx_buffer_type = gl && ((ImGui.ImDrawIdxSize === 4) ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT) || 0;
        draw_data.IterateDrawLists((draw_list) => {
            gl || ctx || console.log(draw_list);
            gl || ctx || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
            gl || ctx || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);
            let idx_buffer_offset = 0;
            gl && gl.bindBuffer(gl.ARRAY_BUFFER, g_VboHandle);
            gl && gl.bufferData(gl.ARRAY_BUFFER, draw_list.VtxBuffer, gl.STREAM_DRAW);
            gl && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
            gl && gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, draw_list.IdxBuffer, gl.STREAM_DRAW);
            draw_list.IterateDrawCmds((draw_cmd) => {
                gl || ctx || console.log(draw_cmd);
                gl || ctx || console.log("ElemCount", draw_cmd.ElemCount);
                gl || ctx || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
                gl || ctx || console.log("TextureId", draw_cmd.TextureId);
                if (!gl && !ctx) {
                    console.log("i: pos.x pos.y uv.x uv.y col");
                    for (let i = 0; i < Math.min(3, draw_cmd.ElemCount); ++i) {
                        const view = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i * ImGui.ImDrawVertSize);
                        console.log(`${i}: ${view.pos[0].toFixed(2)} ${view.pos[1].toFixed(2)} ${view.uv[0].toFixed(5)} ${view.uv[1].toFixed(5)} ${("00000000" + view.col[0].toString(16)).substr(-8)}`);
                    }
                }
                if (draw_cmd.UserCallback !== null) {
                    // User callback (registered via ImDrawList::AddCallback)
                    draw_cmd.UserCallback(draw_list, draw_cmd);
                }
                else {
                    const clip_rect = new ImGui.ImVec4(draw_cmd.ClipRect.x - pos.x, draw_cmd.ClipRect.y - pos.y, draw_cmd.ClipRect.z - pos.x, draw_cmd.ClipRect.w - pos.y);
                    if (clip_rect.x < fb_width && clip_rect.y < fb_height && clip_rect.z >= 0.0 && clip_rect.w >= 0.0) {
                        // Apply scissor/clipping rectangle
                        gl && gl.scissor(clip_rect.x, fb_height - clip_rect.w, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);
                        // Bind texture, Draw
                        gl && gl.activeTexture(gl.TEXTURE0);
                        gl && gl.bindTexture(gl.TEXTURE_2D, draw_cmd.TextureId);
                        gl && gl.drawElements(gl.TRIANGLES, draw_cmd.ElemCount, idx_buffer_type, idx_buffer_offset);
                        if (ctx) {
                            ctx.save();
                            ctx.beginPath();
                            ctx.rect(clip_rect.x, clip_rect.y, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);
                            ctx.clip();
                            const idx = ImGui.ImDrawIdxSize === 4 ?
                                new Uint32Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + idx_buffer_offset) :
                                new Uint16Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + idx_buffer_offset);
                            for (let i = 0; i < draw_cmd.ElemCount; i += 3) {
                                const i0 = idx[i + 0];
                                const i1 = idx[i + 1];
                                const i2 = idx[i + 2];
                                const v0 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i0 * ImGui.ImDrawVertSize);
                                const v1 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i1 * ImGui.ImDrawVertSize);
                                const v2 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i2 * ImGui.ImDrawVertSize);
                                const i3 = idx[i + 3];
                                const i4 = idx[i + 4];
                                const i5 = idx[i + 5];
                                const v3 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i3 * ImGui.ImDrawVertSize);
                                const v4 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i4 * ImGui.ImDrawVertSize);
                                const v5 = new ImGui.ImDrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i5 * ImGui.ImDrawVertSize);
                                let quad = true;
                                let minmin = v0;
                                let minmax = v0;
                                let maxmin = v0;
                                let maxmax = v0;
                                for (const v of [v1, v2, v3, v4, v5]) {
                                    let found = false;
                                    if (v.pos[0] <= minmin.pos[0] && v.pos[1] <= minmin.pos[1]) {
                                        minmin = v;
                                        found = true;
                                    }
                                    if (v.pos[0] <= minmax.pos[0] && v.pos[1] >= minmax.pos[1]) {
                                        minmax = v;
                                        found = true;
                                    }
                                    if (v.pos[0] >= maxmin.pos[0] && v.pos[1] <= maxmin.pos[1]) {
                                        maxmin = v;
                                        found = true;
                                    }
                                    if (v.pos[0] >= maxmax.pos[0] && v.pos[1] >= maxmax.pos[1]) {
                                        maxmax = v;
                                        found = true;
                                    }
                                    if (!found) {
                                        quad = false;
                                    }
                                }
                                quad = quad && (minmin.pos[0] === minmax.pos[0]);
                                quad = quad && (maxmin.pos[0] === maxmax.pos[0]);
                                quad = quad && (minmin.pos[1] === maxmin.pos[1]);
                                quad = quad && (minmax.pos[1] === maxmax.pos[1]);
                                if (quad) {
                                    if (minmin.uv[0] < 0.01 && minmin.uv[1] < 0.01) {
                                        // one vertex color
                                        ctx.beginPath();
                                        ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                        ctx.fill();
                                    }
                                    else {
                                        // no vertex color
                                        const image = draw_cmd.TextureId;
                                        ctx.drawImage(image, minmin.uv[0] * image.width, minmin.uv[1] * image.height, (maxmax.uv[0] - minmin.uv[0]) * image.width, (maxmax.uv[1] - minmin.uv[1]) * image.height, minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        // ctx.beginPath();
                                        // ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        // ctx.strokeStyle = "yellow";
                                        // ctx.stroke();
                                    }
                                    i += 3;
                                }
                                else {
                                    // one vertex color, no texture
                                    ctx.beginPath();
                                    ctx.moveTo(v0.pos[0], v0.pos[1]);
                                    ctx.lineTo(v1.pos[0], v1.pos[1]);
                                    ctx.lineTo(v2.pos[0], v2.pos[1]);
                                    ctx.closePath();
                                    ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                    ctx.fill();
                                }
                            }
                            ctx.restore();
                        }
                    }
                }
                idx_buffer_offset += draw_cmd.ElemCount * ImGui.ImDrawIdxSize;
            });
        });
        // Restore modified GL state
        gl && (last_program !== null) && gl.useProgram(last_program);
        gl && (last_texture !== null) && gl.bindTexture(gl.TEXTURE_2D, last_texture);
        gl && (last_active_texture !== null) && gl.activeTexture(last_active_texture);
        gl && gl.disableVertexAttribArray(g_AttribLocationPosition);
        gl && gl.disableVertexAttribArray(g_AttribLocationUV);
        gl && gl.disableVertexAttribArray(g_AttribLocationColor);
        gl && (last_array_buffer !== null) && gl.bindBuffer(gl.ARRAY_BUFFER, last_array_buffer);
        gl && (last_element_array_buffer !== null) && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
        gl && (last_blend_equation_rgb !== null && last_blend_equation_alpha !== null) && gl.blendEquationSeparate(last_blend_equation_rgb, last_blend_equation_alpha);
        gl && (last_blend_src_rgb !== null && last_blend_src_alpha !== null && last_blend_dst_rgb !== null && last_blend_dst_alpha !== null) && gl.blendFuncSeparate(last_blend_src_rgb, last_blend_src_alpha, last_blend_dst_rgb, last_blend_dst_alpha);
        gl && (last_enable_blend ? gl.enable(gl.BLEND) : gl.disable(gl.BLEND));
        gl && (last_enable_cull_face ? gl.enable(gl.CULL_FACE) : gl.disable(gl.CULL_FACE));
        gl && (last_enable_depth_test ? gl.enable(gl.DEPTH_TEST) : gl.disable(gl.DEPTH_TEST));
        gl && (last_enable_scissor_test ? gl.enable(gl.SCISSOR_TEST) : gl.disable(gl.SCISSOR_TEST));
        // glPolygonMode(GL_FRONT_AND_BACK, (GLenum)last_polygon_mode[0]);
        gl && (last_viewport !== null) && gl.viewport(last_viewport[0], last_viewport[1], last_viewport[2], last_viewport[3]);
        gl && (last_scissor_box !== null) && gl.scissor(last_scissor_box[0], last_scissor_box[1], last_scissor_box[2], last_scissor_box[3]);
    }
    exports_1("RenderDrawData", RenderDrawData);
    function CreateFontsTexture() {
        const io = ImGui.GetIO();
        // Backup GL state
        const last_texture = gl && gl.getParameter(gl.TEXTURE_BINDING_2D);
        // Build texture atlas
        // const width: number = 256;
        // const height: number = 256;
        // const pixels: Uint8Array = new Uint8Array(4 * width * height).fill(0xff);
        const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32(); // Load as RGBA 32-bits (75% of the memory is wasted, but default font is so small) because it is more likely to be compatible with user's existing shaders. If your ImTextureId represent a higher-level concept than just a GL texture id, consider calling GetTexDataAsAlpha8() instead to save on GPU memory.
        // console.log(`font texture ${width} x ${height} @ ${pixels.length}`);
        // Upload texture to graphics system
        g_FontTexture = gl && gl.createTexture();
        gl && gl.bindTexture(gl.TEXTURE_2D, g_FontTexture);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // gl && gl.pixelStorei(gl.UNPACK_ROW_LENGTH); // WebGL2
        gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        // Store our identifier
        io.Fonts.TexID = g_FontTexture || { foo: "bar" };
        // console.log("font texture id", g_FontTexture);
        if (ctx) {
            const image_canvas = document.createElement("canvas");
            image_canvas.width = width;
            image_canvas.height = height;
            const image_ctx = image_canvas.getContext("2d");
            if (image_ctx === null) {
                throw new Error();
            }
            const image_data = image_ctx.getImageData(0, 0, width, height);
            image_data.data.set(pixels);
            image_ctx.putImageData(image_data, 0, 0);
            io.Fonts.TexID = image_canvas;
        }
        // Restore modified GL state
        gl && last_texture && gl.bindTexture(gl.TEXTURE_2D, last_texture);
    }
    exports_1("CreateFontsTexture", CreateFontsTexture);
    function DestroyFontsTexture() {
        const io = ImGui.GetIO();
        io.Fonts.TexID = null;
        gl && gl.deleteTexture(g_FontTexture);
        g_FontTexture = null;
    }
    exports_1("DestroyFontsTexture", DestroyFontsTexture);
    function CreateDeviceObjects() {
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
            "precision mediump float;",
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
        CreateFontsTexture();
    }
    exports_1("CreateDeviceObjects", CreateDeviceObjects);
    function DestroyDeviceObjects() {
        DestroyFontsTexture();
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
    exports_1("DestroyDeviceObjects", DestroyDeviceObjects);
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
            }
        ],
        execute: function () {
            clipboard_text = "";
            canvas = null;
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
            exports_1("ctx", ctx = null);
            prev_time = 0;
            // MouseEvent.button
            // A number representing a given button:
            // 0: Main button pressed, usually the left button or the un-initialized state
            // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
            // 2: Secondary button pressed, usually the right button
            // 3: Fourth button, typically the Browser Back button
            // 4: Fifth button, typically the Browser Forward button
            mouse_button_map = [0, 2, 1, 3, 4];
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQXVCQSxTQUFTLGdCQUFnQixDQUFDLEtBQXFCO1FBQzNDLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUNyQixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxxREFBcUQ7UUFDckQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLGVBQWUsQ0FBQyxLQUFxQjtRQUMxQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDckIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QscURBQXFEO1FBQ3JELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFxQjtRQUM1QyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDckIsY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO1FBQ0QscURBQXFEO1FBQ3JELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxnQkFBZ0I7UUFDckIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE1BQU0sZ0JBQWdCLEdBQVcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7WUFDckQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVELFNBQVMsMEJBQTBCLENB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Q0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FB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RSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDbEUsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDcEUsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO29CQUNOLEtBQUssVUFBVSxFQUFFLHNFQUFzRTt3QkFDdkYsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTt3QkFDdkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZTt3QkFDMUQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDekQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYzt3QkFDMUQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDdkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDekQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDakUsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDakUsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO29CQUNOLEtBQUssVUFBVSxDQUFDLENBQUMsZ0VBQWdFO29CQUNqRixLQUFLLFVBQVUsRUFBRSwrQ0FBK0M7d0JBQ2hFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3BFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQ3JFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ2xFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3BFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsTUFBTTtvQkFDTixTQUFTLDZEQUE2RDt3QkFDdEUsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWTt3QkFDdkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDeEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZTt3QkFDMUQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDekQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYzt3QkFDMUQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVzt3QkFDdkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTt3QkFDekQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTt3QkFDckQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxF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LENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dDQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7d0NBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQ0FBRTtvQ0FDekYsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dDQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7d0NBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQ0FBRTtvQ0FDekYsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dDQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7d0NBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQ0FBRTtvQ0FDekYsSUFBSSxDQUFDLEtBQUssRUFBRTt3Q0FBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO3FDQUFFO2lDQUNoQztnQ0FDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDakQs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