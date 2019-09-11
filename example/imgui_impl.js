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
            canvas.width = Math.floor(canvas.scrollWidth * devicePixelRatio);
            canvas.height = Math.floor(canvas.scrollHeight * devicePixelRatio);
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
            io.BackendPlatformName = "imgui_impl_html5";
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
        if (typeof (window) !== "undefined") {
            if (value instanceof (HTMLCanvasElement)) {
                value = value.getContext("webgl", { alpha: false }) || value.getContext("2d");
            }
            if (value instanceof (WebGLRenderingContext)) {
                io.BackendRendererName = "imgui_impl_webgl";
                canvas = value.canvas;
                exports_1("gl", gl = value);
            }
            if (value instanceof (CanvasRenderingContext2D)) {
                io.BackendRendererName = "imgui_impl_ctx2d";
                canvas = value.canvas;
                exports_1("ctx", ctx = value);
            }
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
        const w = canvas && canvas.scrollWidth || 640;
        const h = canvas && canvas.scrollHeight || 480;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1ndWlfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltZ3VpX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQXVCQSxTQUFTLGdCQUFnQixDQUFDLEtBQXFCO1FBQzNDLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUNyQixLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxxREFBcUQ7UUFDckQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxTQUFTLGVBQWUsQ0FBQyxLQUFxQjtRQUMxQyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDckIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QscURBQXFEO1FBQ3JELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFxQjtRQUM1QyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDckIsY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO1FBQ0QscURBQXFEO1FBQ3JELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxnQkFBZ0I7UUFDckIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE1BQU0sZ0JBQWdCLEdBQVcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLGdC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USxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3BFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQ3JFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ2xFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3BFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsTUFBTTtvQkFDTixLQUFLLFVBQVUsRUFBRSxzRUFBc0U7d0JBQ3ZGLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2pFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ2pFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsTUFBTTtvQkFDTixLQUFLLFVBQVUsQ0FBQyxDQUFDLGdFQUFnRTtvQkFDakYsS0FBSyxVQUFVLEVBQUUsK0NBQStDO3dCQUNoRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO3dCQUN2RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN4RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUN4RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlO3dCQUMxRCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUNwRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO3dCQUNyRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXO3dCQUNsRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO3dCQUNwRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNyRCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNyRCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNyRCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO3dCQUNyRCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELE1BQU07b0JBQ04sU0FBUyw2REFBNkQ7d0JBQ3RFLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7d0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3hELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7d0JBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7d0JBQzFELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7d0JBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7d0JBQ3JELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsTUFBTTtpQkFDVDthQUNKO1NBQ0o7SUFDTCxDQUFDOztJQUVELFNBQWdCLGNBQWMsQ0FBQyxZQUFxQyxLQUFLLENBQUMsV0FBVyxFQUFFO1FBQ25GLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FBRTtRQUU5QyxFQUFFLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEMsd0hBQXdIO1FBQ3hILE1BQU0sUUFBUSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxTQUFTLEdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLFFBQVEsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFDRCxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJELGtCQUFrQjtRQUNsQixNQUFNLG1CQUFtQixHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzVGLE1BQU0sWUFBWSxHQUF3QixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzVGLE1BQU0sWUFBWSxHQUF3QixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDL0YsTUFBTSxpQkFBaUIsR0FBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3JHLE1BQU0seUJBQXlCLEdBQXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNySCxpRkFBaUY7UUFDakYsTUFBTSxhQUFhLEdBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDcEYsTUFBTSxnQkFBZ0IsR0FBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUMxRixNQUFNLGtCQUFrQixHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzFGLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDMUYsTUFBTSxvQkFBb0IsR0FBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUM5RixNQUFNLG9CQUFvQixHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzlGLE1BQU0sdUJBQXVCLEdBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNwRyxNQUFNLHlCQUF5QixHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDeEcsTUFBTSxpQkFBaUIsR0FBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNwRixNQUFNLHFCQUFxQixHQUFxQixFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQzVGLE1BQU0sc0JBQXNCLEdBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDOUYsTUFBTSx3QkFBd0IsR0FBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQztRQUVsRywrR0FBK0c7UUFDL0csRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pELEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLDZDQUE2QztRQUU3QyxpREFBaUQ7UUFDakQsNkxBQTZMO1FBQzdMLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxHQUFXLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sZ0JBQWdCLEdBQWlCLElBQUksWUFBWSxDQUFDO1lBQ3BELEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTSxHQUFHLEVBQWlCLEdBQUcsRUFBRSxHQUFHO1lBQy9DLEdBQUcsRUFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEdBQUcsRUFBRSxHQUFHO1lBQy9DLEdBQUcsRUFBZ0IsR0FBRyxFQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHO1lBQy9DLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFHLEdBQUcsRUFBRSxHQUFHO1NBQ2xELENBQUMsQ0FBQztRQUNILEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsSUFBSSx1QkFBdUIsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFdkcsdUJBQXVCO1FBQ3ZCLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEQsRUFBRSxJQUFJLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzNELEVBQUUsSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRCxFQUFFLElBQUksRUFBRSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFeEQsRUFBRSxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1SCxFQUFFLElBQUksRUFBRSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JILEVBQUUsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFaEksT0FBTztRQUNQLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDakMsTUFBTSxlQUFlLEdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9HLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQTJCLEVBQVEsRUFBRTtZQUM3RCxFQUFFLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsRUFBRSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekUsRUFBRSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekUsSUFBSSxpQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFFbEMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNsRCxFQUFFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFFLEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9ELEVBQUUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVsRixTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBeUIsRUFBUSxFQUFFO2dCQUMxRCxFQUFFLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxFQUFFLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqTCxFQUFFLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7b0JBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7d0JBQ3RELE1BQU0sSUFBSSxHQUFxQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDM0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDcEw7aUJBQ0o7Z0JBRUQsSUFBSSxRQUFRLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtvQkFDaEMseURBQXlEO29CQUN6RCxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkosSUFBSSxTQUFTLENBQUMsQ0FBQyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTt3QkFDL0YsbUNBQW1DO3dCQUNuQyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFN0cscUJBQXFCO3dCQUNyQixFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3BDLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN4RCxFQUFFLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7d0JBRTVGLElBQUksR0FBRyxFQUFFOzRCQUNMLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDWCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7NEJBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekYsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNYLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ25DLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQ0FDakcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsQ0FBQzs0QkFDcEcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FDNUMsTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQXFCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUMxSSxNQUFNLEVBQUUsR0FBcUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQzFJLE1BQU0sRUFBRSxHQUFxQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDMUksTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsTUFBTSxFQUFFLEdBQXFCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUMxSSxNQUFNLEVBQUUsR0FBcUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQzFJLE1BQU0sRUFBRSxHQUFxQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDMUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO2dDQUNoQixJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO2dDQUNsQyxJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO2dDQUNsQyxJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO2dDQUNsQyxJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO2dDQUNsQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBRSxFQUFFO29DQUNwQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7b0NBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3Q0FBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUNBQUU7b0NBQ3pGLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3Q0FBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUNBQUU7b0NBQ3pGLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3Q0FBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUNBQUU7b0NBQ3pGLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3Q0FBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUNBQUU7b0NBQ3pGLElBQUksQ0FBQyxLQUFLLEVBQUU7d0NBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQztxQ0FBRTtpQ0FDaEM7Z0NBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNqRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDakQsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNqRCxJQUFJLElBQUksRUFBRTtvQ0FDTixJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFO3dDQUM1QyxtQkFBbUI7d0NBQ25CLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3Q0FDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNyRyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQzt3Q0FDMUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO3FDQUNkO3lDQUFNO3dDQUNILGtCQUFrQjt3Q0FDbEIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQThCLENBQUM7d0NBQ3RELEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUNmLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQ3ZELENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQ3pGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNsRSxtQkFB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