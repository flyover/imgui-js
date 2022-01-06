(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('imgui-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'imgui-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ImGui_Impl = {}, global.ImGui));
})(this, (function (exports, ImGui) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var ImGui__namespace = /*#__PURE__*/_interopNamespace(ImGui);

    let clipboard_text = "";
    let canvas = null;
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
    exports.ctx = null;
    let prev_time = 0;
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
            canvas.width = canvas.scrollWidth;
            canvas.height = canvas.scrollHeight;
        }
    }
    function window_on_gamepadconnected(event /* GamepadEvent */) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
    }
    function window_on_gamepaddisconnected(event /* GamepadEvent */) {
        console.log("Gamepad disconnected at index %d: %s.", event.gamepad.index, event.gamepad.id);
    }
    function canvas_on_blur(event) {
        const io = ImGui__namespace.GetIO();
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
    const key_code_to_index = {
        "NumpadEnter": 176,
    };
    function canvas_on_keydown(event) {
        // console.log(event.type, event.key, event.code, event.keyCode);
        const io = ImGui__namespace.GetIO();
        io.KeyCtrl = event.ctrlKey;
        io.KeyShift = event.shiftKey;
        io.KeyAlt = event.altKey;
        io.KeySuper = event.metaKey;
        const key_index = key_code_to_index[event.code] || event.keyCode;
        ImGui__namespace.ASSERT(key_index >= 0 && key_index < ImGui__namespace.ARRAYSIZE(io.KeysDown));
        io.KeysDown[key_index] = true;
        // forward to the keypress event
        if ( /*io.WantCaptureKeyboard ||*/event.key === "Tab") {
            event.preventDefault();
        }
    }
    function canvas_on_keyup(event) {
        // console.log(event.type, event.key, event.code, event.keyCode);
        const io = ImGui__namespace.GetIO();
        io.KeyCtrl = event.ctrlKey;
        io.KeyShift = event.shiftKey;
        io.KeyAlt = event.altKey;
        io.KeySuper = event.metaKey;
        const key_index = key_code_to_index[event.code] || event.keyCode;
        ImGui__namespace.ASSERT(key_index >= 0 && key_index < ImGui__namespace.ARRAYSIZE(io.KeysDown));
        io.KeysDown[key_index] = false;
        if (io.WantCaptureKeyboard) {
            event.preventDefault();
        }
    }
    function canvas_on_keypress(event) {
        // console.log(event.type, event.key, event.code, event.keyCode);
        const io = ImGui__namespace.GetIO();
        io.AddInputCharacter(event.charCode);
        if (io.WantCaptureKeyboard) {
            event.preventDefault();
        }
    }
    function canvas_on_pointermove(event) {
        const io = ImGui__namespace.GetIO();
        io.MousePos.x = event.offsetX;
        io.MousePos.y = event.offsetY;
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    // MouseEvent.button
    // A number representing a given button:
    // 0: Main button pressed, usually the left button or the un-initialized state
    // 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
    // 2: Secondary button pressed, usually the right button
    // 3: Fourth button, typically the Browser Back button
    // 4: Fifth button, typically the Browser Forward button
    const mouse_button_map = [0, 2, 1, 3, 4];
    function canvas_on_pointerdown(event) {
        const io = ImGui__namespace.GetIO();
        io.MousePos.x = event.offsetX;
        io.MousePos.y = event.offsetY;
        io.MouseDown[mouse_button_map[event.button]] = true;
        // if (io.WantCaptureMouse) {
        //     event.preventDefault();
        // }
    }
    function canvas_on_contextmenu(event) {
        const io = ImGui__namespace.GetIO();
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    function canvas_on_pointerup(event) {
        const io = ImGui__namespace.GetIO();
        io.MouseDown[mouse_button_map[event.button]] = false;
        if (io.WantCaptureMouse) {
            event.preventDefault();
        }
    }
    function canvas_on_wheel(event) {
        const io = ImGui__namespace.GetIO();
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
        const io = ImGui__namespace.GetIO();
        if (typeof (window) !== "undefined") {
            io.BackendPlatformName = "imgui_impl_browser";
            ImGui__namespace.LoadIniSettingsFromMemory(window.localStorage.getItem("imgui.ini") || "");
        }
        else {
            io.BackendPlatformName = "imgui_impl_console";
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
                canvas = value;
                value = canvas.getContext("webgl2", { alpha: false }) || canvas.getContext("webgl", { alpha: false }) || canvas.getContext("2d");
            }
            if (typeof WebGL2RenderingContext !== "undefined" && value instanceof (WebGL2RenderingContext)) {
                io.BackendRendererName = "imgui_impl_webgl2";
                canvas = canvas || value.canvas;
                exports.gl = value;
            }
            else if (typeof WebGLRenderingContext !== "undefined" && value instanceof (WebGLRenderingContext)) {
                io.BackendRendererName = "imgui_impl_webgl";
                canvas = canvas || value.canvas;
                exports.gl = value;
            }
            else if (typeof CanvasRenderingContext2D !== "undefined" && value instanceof (CanvasRenderingContext2D)) {
                io.BackendRendererName = "imgui_impl_2d";
                canvas = canvas || value.canvas;
                exports.ctx = value;
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
        io.BackendFlags |= ImGui__namespace.BackendFlags.HasMouseCursors; // We can honor GetMouseCursor() values (optional)
        // Keyboard mapping. ImGui will use those indices to peek into the io.KeyDown[] array.
        io.KeyMap[ImGui__namespace.Key.Tab] = 9;
        io.KeyMap[ImGui__namespace.Key.LeftArrow] = 37;
        io.KeyMap[ImGui__namespace.Key.RightArrow] = 39;
        io.KeyMap[ImGui__namespace.Key.UpArrow] = 38;
        io.KeyMap[ImGui__namespace.Key.DownArrow] = 40;
        io.KeyMap[ImGui__namespace.Key.PageUp] = 33;
        io.KeyMap[ImGui__namespace.Key.PageDown] = 34;
        io.KeyMap[ImGui__namespace.Key.Home] = 36;
        io.KeyMap[ImGui__namespace.Key.End] = 35;
        io.KeyMap[ImGui__namespace.Key.Insert] = 45;
        io.KeyMap[ImGui__namespace.Key.Delete] = 46;
        io.KeyMap[ImGui__namespace.Key.Backspace] = 8;
        io.KeyMap[ImGui__namespace.Key.Space] = 32;
        io.KeyMap[ImGui__namespace.Key.Enter] = 13;
        io.KeyMap[ImGui__namespace.Key.Escape] = 27;
        io.KeyMap[ImGui__namespace.Key.KeyPadEnter] = key_code_to_index["NumpadEnter"];
        io.KeyMap[ImGui__namespace.Key.A] = 65;
        io.KeyMap[ImGui__namespace.Key.C] = 67;
        io.KeyMap[ImGui__namespace.Key.V] = 86;
        io.KeyMap[ImGui__namespace.Key.X] = 88;
        io.KeyMap[ImGui__namespace.Key.Y] = 89;
        io.KeyMap[ImGui__namespace.Key.Z] = 90;
        CreateDeviceObjects();
    }
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
        exports.gl = null;
        exports.ctx = null;
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
    function NewFrame(time) {
        const io = ImGui__namespace.GetIO();
        if (io.WantSaveIniSettings) {
            io.WantSaveIniSettings = false;
            if (typeof (window) !== "undefined") {
                window.localStorage.setItem("imgui.ini", ImGui__namespace.SaveIniSettingsToMemory());
            }
        }
        const w = canvas && canvas.scrollWidth || 640;
        const h = canvas && canvas.scrollHeight || 480;
        const display_w = exports.gl && exports.gl.drawingBufferWidth || w;
        const display_h = exports.gl && exports.gl.drawingBufferHeight || h;
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
                switch (ImGui__namespace.GetMouseCursor()) {
                    case ImGui__namespace.MouseCursor.None:
                        document.body.style.cursor = "none";
                        break;
                    default:
                    case ImGui__namespace.MouseCursor.Arrow:
                        document.body.style.cursor = "default";
                        break;
                    case ImGui__namespace.MouseCursor.TextInput:
                        document.body.style.cursor = "text";
                        break; // When hovering over InputText, etc.
                    case ImGui__namespace.MouseCursor.ResizeAll:
                        document.body.style.cursor = "all-scroll";
                        break; // Unused
                    case ImGui__namespace.MouseCursor.ResizeNS:
                        document.body.style.cursor = "ns-resize";
                        break; // When hovering over an horizontal border
                    case ImGui__namespace.MouseCursor.ResizeEW:
                        document.body.style.cursor = "ew-resize";
                        break; // When hovering over a vertical border or a column
                    case ImGui__namespace.MouseCursor.ResizeNESW:
                        document.body.style.cursor = "nesw-resize";
                        break; // When hovering over the bottom-left corner of a window
                    case ImGui__namespace.MouseCursor.ResizeNWSE:
                        document.body.style.cursor = "nwse-resize";
                        break; // When hovering over the bottom-right corner of a window
                    case ImGui__namespace.MouseCursor.Hand:
                        document.body.style.cursor = "move";
                        break;
                    case ImGui__namespace.MouseCursor.NotAllowed:
                        document.body.style.cursor = "not-allowed";
                        break;
                }
            }
        }
        // Gamepad navigation mapping [BETA]
        for (let i = 0; i < io.NavInputs.length; ++i) {
            // TODO: This is currently causing an issue and I have no gamepad to test with.
            //       The error is: ''set' on proxy: trap returned falsish for property '21'
            //       I think that the NavInputs are zeroed out by ImGui at the start of each frame anyway
            //       so I am not sure if the following is even necessary.
            //io.NavInputs[i] = 0.0;
        }
        if (io.ConfigFlags & ImGui__namespace.ConfigFlags.NavEnableGamepad) {
            // Update gamepad inputs
            const gamepads = (typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad = gamepads[i];
                if (!gamepad) {
                    continue;
                }
                io.BackendFlags |= ImGui__namespace.BackendFlags.HasGamepad;
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
                        MAP_BUTTON(ImGui__namespace.NavInput.Activate, 1); // Cross / A
                        MAP_BUTTON(ImGui__namespace.NavInput.Cancel, 2); // Circle / B
                        MAP_BUTTON(ImGui__namespace.NavInput.Menu, 0); // Square / X
                        MAP_BUTTON(ImGui__namespace.NavInput.Input, 3); // Triangle / Y
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadLeft, 4, -0.3, -0.9); // D-Pad Left
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadRight, 4, +0.3, +0.9); // D-Pad Right
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadUp, 5, -0.3, -0.9); // D-Pad Up
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadDown, 5, +0.3, +0.9); // D-Pad Down
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusNext, 5); // R1 / RB
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakSlow, 6); // L2 / LT
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakFast, 7); // R2 / RT
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    case "046dc21d": // Logitech Gamepad F310 (STANDARD GAMEPAD Vendor: 046d Product: c21d)
                        MAP_BUTTON(ImGui__namespace.NavInput.Activate, 0); // Cross / A
                        MAP_BUTTON(ImGui__namespace.NavInput.Cancel, 1); // Circle / B
                        MAP_BUTTON(ImGui__namespace.NavInput.Menu, 2); // Square / X
                        MAP_BUTTON(ImGui__namespace.NavInput.Input, 3); // Triangle / Y
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadLeft, 14); // D-Pad Left
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadRight, 15); // D-Pad Right
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadUp, 12); // D-Pad Up
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadDown, 13); // D-Pad Down
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusNext, 5); // R1 / RB
                        MAP_ANALOG(ImGui__namespace.NavInput.TweakSlow, 6, +0.3, +0.9); // L2 / LT
                        MAP_ANALOG(ImGui__namespace.NavInput.TweakFast, 7, +0.3, +0.9); // R2 / RT
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    case "2dc86001": // 8Bitdo SN30 Pro  8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6001)
                    case "2dc86101": // 8Bitdo SN30 Pro (Vendor: 2dc8 Product: 6101)
                        MAP_BUTTON(ImGui__namespace.NavInput.Activate, 1); // Cross / A
                        MAP_BUTTON(ImGui__namespace.NavInput.Cancel, 0); // Circle / B
                        MAP_BUTTON(ImGui__namespace.NavInput.Menu, 4); // Square / X
                        MAP_BUTTON(ImGui__namespace.NavInput.Input, 3); // Triangle / Y
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadLeft, 6, -0.3, -0.9); // D-Pad Left
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadRight, 6, +0.3, +0.9); // D-Pad Right
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadUp, 7, -0.3, -0.9); // D-Pad Up
                        MAP_ANALOG(ImGui__namespace.NavInput.DpadDown, 7, +0.3, +0.9); // D-Pad Down
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusPrev, 6); // L1 / LB
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusNext, 7); // R1 / RB
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakSlow, 8); // L2 / LT
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakFast, 9); // R2 / RT
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                    default: // standard gamepad: https://w3c.github.io/gamepad/#remapping
                        MAP_BUTTON(ImGui__namespace.NavInput.Activate, 0); // Cross / A
                        MAP_BUTTON(ImGui__namespace.NavInput.Cancel, 1); // Circle / B
                        MAP_BUTTON(ImGui__namespace.NavInput.Menu, 2); // Square / X
                        MAP_BUTTON(ImGui__namespace.NavInput.Input, 3); // Triangle / Y
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadLeft, 14); // D-Pad Left
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadRight, 15); // D-Pad Right
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadUp, 12); // D-Pad Up
                        MAP_BUTTON(ImGui__namespace.NavInput.DpadDown, 13); // D-Pad Down
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusPrev, 4); // L1 / LB
                        MAP_BUTTON(ImGui__namespace.NavInput.FocusNext, 5); // R1 / RB
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakSlow, 6); // L2 / LT
                        MAP_BUTTON(ImGui__namespace.NavInput.TweakFast, 7); // R2 / RT
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickLeft, 0, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickRight, 0, +0.3, +0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickUp, 1, -0.3, -0.9);
                        MAP_ANALOG(ImGui__namespace.NavInput.LStickDown, 1, +0.3, +0.9);
                        break;
                }
            }
        }
    }
    function RenderDrawData(draw_data = ImGui__namespace.GetDrawData()) {
        const io = ImGui__namespace.GetIO();
        if (draw_data === null) {
            throw new Error();
        }
        exports.gl || exports.ctx || console.log(draw_data);
        // Avoid rendering when minimized, scale coordinates for retina displays (screen coordinates != framebuffer coordinates)
        const fb_width = io.DisplaySize.x * io.DisplayFramebufferScale.x;
        const fb_height = io.DisplaySize.y * io.DisplayFramebufferScale.y;
        if (fb_width === 0 || fb_height === 0) {
            return;
        }
        draw_data.ScaleClipRects(io.DisplayFramebufferScale);
        const gl2 = typeof WebGL2RenderingContext !== "undefined" && exports.gl instanceof WebGL2RenderingContext && exports.gl || null;
        const gl_vao = exports.gl && exports.gl.getExtension("OES_vertex_array_object") || null;
        // Backup GL state
        const last_active_texture = exports.gl && exports.gl.getParameter(exports.gl.ACTIVE_TEXTURE) || null;
        const last_program = exports.gl && exports.gl.getParameter(exports.gl.CURRENT_PROGRAM) || null;
        const last_texture = exports.gl && exports.gl.getParameter(exports.gl.TEXTURE_BINDING_2D) || null;
        const last_array_buffer = exports.gl && exports.gl.getParameter(exports.gl.ARRAY_BUFFER_BINDING) || null;
        const last_element_array_buffer = exports.gl && exports.gl.getParameter(exports.gl.ELEMENT_ARRAY_BUFFER_BINDING) || null;
        const last_vertex_array_object = gl2 && gl2.getParameter(gl2.VERTEX_ARRAY_BINDING) || exports.gl && gl_vao && exports.gl.getParameter(gl_vao.VERTEX_ARRAY_BINDING_OES) || null;
        // GLint last_polygon_mode[2]; glGetIntegerv(GL_POLYGON_MODE, last_polygon_mode);
        const last_viewport = exports.gl && exports.gl.getParameter(exports.gl.VIEWPORT) || null;
        const last_scissor_box = exports.gl && exports.gl.getParameter(exports.gl.SCISSOR_BOX) || null;
        const last_blend_src_rgb = exports.gl && exports.gl.getParameter(exports.gl.BLEND_SRC_RGB) || null;
        const last_blend_dst_rgb = exports.gl && exports.gl.getParameter(exports.gl.BLEND_DST_RGB) || null;
        const last_blend_src_alpha = exports.gl && exports.gl.getParameter(exports.gl.BLEND_SRC_ALPHA) || null;
        const last_blend_dst_alpha = exports.gl && exports.gl.getParameter(exports.gl.BLEND_DST_ALPHA) || null;
        const last_blend_equation_rgb = exports.gl && exports.gl.getParameter(exports.gl.BLEND_EQUATION_RGB) || null;
        const last_blend_equation_alpha = exports.gl && exports.gl.getParameter(exports.gl.BLEND_EQUATION_ALPHA) || null;
        const last_enable_blend = exports.gl && exports.gl.getParameter(exports.gl.BLEND) || null;
        const last_enable_cull_face = exports.gl && exports.gl.getParameter(exports.gl.CULL_FACE) || null;
        const last_enable_depth_test = exports.gl && exports.gl.getParameter(exports.gl.DEPTH_TEST) || null;
        const last_enable_scissor_test = exports.gl && exports.gl.getParameter(exports.gl.SCISSOR_TEST) || null;
        // Setup desired GL state
        // Recreate the VAO every time (this is to easily allow multiple GL contexts to be rendered to. VAO are not shared among GL contexts)
        // The renderer would actually work without any VAO bound, but then our VertexAttrib calls would overwrite the default one currently bound.
        const vertex_array_object = gl2 && gl2.createVertexArray() || gl_vao && gl_vao.createVertexArrayOES();
        // Setup render state: alpha-blending enabled, no face culling, no depth testing, scissor enabled, polygon fill
        exports.gl && exports.gl.enable(exports.gl.BLEND);
        exports.gl && exports.gl.blendEquation(exports.gl.FUNC_ADD);
        exports.gl && exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
        exports.gl && exports.gl.disable(exports.gl.CULL_FACE);
        exports.gl && exports.gl.disable(exports.gl.DEPTH_TEST);
        exports.gl && exports.gl.enable(exports.gl.SCISSOR_TEST);
        // glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);
        // Setup viewport, orthographic projection matrix
        // Our visible imgui space lies from draw_data->DisplayPps (top left) to draw_data->DisplayPos+data_data->DisplaySize (bottom right). DisplayMin is typically (0,0) for single viewport apps.
        exports.gl && exports.gl.viewport(0, 0, fb_width, fb_height);
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
        exports.gl && exports.gl.useProgram(g_ShaderHandle);
        exports.gl && exports.gl.uniform1i(g_AttribLocationTex, 0);
        exports.gl && g_AttribLocationProjMtx && exports.gl.uniformMatrix4fv(g_AttribLocationProjMtx, false, ortho_projection);
        gl2 && gl2.bindVertexArray(vertex_array_object) || gl_vao && gl_vao.bindVertexArrayOES(vertex_array_object);
        // Render command lists
        exports.gl && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, g_VboHandle);
        exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationPosition);
        exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationUV);
        exports.gl && exports.gl.enableVertexAttribArray(g_AttribLocationColor);
        exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationPosition, 2, exports.gl.FLOAT, false, ImGui__namespace.DrawVertSize, ImGui__namespace.DrawVertPosOffset);
        exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationUV, 2, exports.gl.FLOAT, false, ImGui__namespace.DrawVertSize, ImGui__namespace.DrawVertUVOffset);
        exports.gl && exports.gl.vertexAttribPointer(g_AttribLocationColor, 4, exports.gl.UNSIGNED_BYTE, true, ImGui__namespace.DrawVertSize, ImGui__namespace.DrawVertColOffset);
        // Draw
        const pos = draw_data.DisplayPos;
        const idx_buffer_type = exports.gl && ((ImGui__namespace.DrawIdxSize === 4) ? exports.gl.UNSIGNED_INT : exports.gl.UNSIGNED_SHORT) || 0;
        draw_data.IterateDrawLists((draw_list) => {
            exports.gl || exports.ctx || console.log(draw_list);
            exports.gl || exports.ctx || console.log("VtxBuffer.length", draw_list.VtxBuffer.length);
            exports.gl || exports.ctx || console.log("IdxBuffer.length", draw_list.IdxBuffer.length);
            exports.gl && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, g_VboHandle);
            exports.gl && exports.gl.bufferData(exports.gl.ARRAY_BUFFER, draw_list.VtxBuffer, exports.gl.STREAM_DRAW);
            exports.gl && exports.gl.bindBuffer(exports.gl.ELEMENT_ARRAY_BUFFER, g_ElementsHandle);
            exports.gl && exports.gl.bufferData(exports.gl.ELEMENT_ARRAY_BUFFER, draw_list.IdxBuffer, exports.gl.STREAM_DRAW);
            draw_list.IterateDrawCmds((draw_cmd) => {
                exports.gl || exports.ctx || console.log(draw_cmd);
                exports.gl || exports.ctx || console.log("ElemCount", draw_cmd.ElemCount);
                exports.gl || exports.ctx || console.log("ClipRect", draw_cmd.ClipRect.x, fb_height - draw_cmd.ClipRect.w, draw_cmd.ClipRect.z - draw_cmd.ClipRect.x, draw_cmd.ClipRect.w - draw_cmd.ClipRect.y);
                exports.gl || exports.ctx || console.log("TextureId", draw_cmd.TextureId);
                if (!exports.gl && !exports.ctx) {
                    console.log("i: pos.x pos.y uv.x uv.y col");
                    for (let i = 0; i < Math.min(3, draw_cmd.ElemCount); ++i) {
                        const view = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i * ImGui__namespace.DrawVertSize);
                        console.log(`${i}: ${view.pos[0].toFixed(2)} ${view.pos[1].toFixed(2)} ${view.uv[0].toFixed(5)} ${view.uv[1].toFixed(5)} ${("00000000" + view.col[0].toString(16)).substr(-8)}`);
                    }
                }
                if (draw_cmd.UserCallback !== null) {
                    // User callback (registered via ImDrawList::AddCallback)
                    draw_cmd.UserCallback(draw_list, draw_cmd);
                }
                else {
                    const clip_rect = new ImGui__namespace.Vec4(draw_cmd.ClipRect.x - pos.x, draw_cmd.ClipRect.y - pos.y, draw_cmd.ClipRect.z - pos.x, draw_cmd.ClipRect.w - pos.y);
                    if (clip_rect.x < fb_width && clip_rect.y < fb_height && clip_rect.z >= 0.0 && clip_rect.w >= 0.0) {
                        // Apply scissor/clipping rectangle
                        exports.gl && exports.gl.scissor(clip_rect.x, fb_height - clip_rect.w, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);
                        // Bind texture, Draw
                        exports.gl && exports.gl.activeTexture(exports.gl.TEXTURE0);
                        exports.gl && exports.gl.bindTexture(exports.gl.TEXTURE_2D, draw_cmd.TextureId);
                        exports.gl && exports.gl.drawElements(exports.gl.TRIANGLES, draw_cmd.ElemCount, idx_buffer_type, draw_cmd.IdxOffset * ImGui__namespace.DrawIdxSize);
                        if (exports.ctx) {
                            exports.ctx.save();
                            exports.ctx.beginPath();
                            exports.ctx.rect(clip_rect.x, clip_rect.y, clip_rect.z - clip_rect.x, clip_rect.w - clip_rect.y);
                            exports.ctx.clip();
                            const idx = ImGui__namespace.DrawIdxSize === 4 ?
                                new Uint32Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + draw_cmd.IdxOffset * ImGui__namespace.DrawIdxSize) :
                                new Uint16Array(draw_list.IdxBuffer.buffer, draw_list.IdxBuffer.byteOffset + draw_cmd.IdxOffset * ImGui__namespace.DrawIdxSize);
                            for (let i = 0; i < draw_cmd.ElemCount; i += 3) {
                                const i0 = idx[i + 0];
                                const i1 = idx[i + 1];
                                const i2 = idx[i + 2];
                                const v0 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i0 * ImGui__namespace.DrawVertSize);
                                const v1 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i1 * ImGui__namespace.DrawVertSize);
                                const v2 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i2 * ImGui__namespace.DrawVertSize);
                                const i3 = idx[i + 3];
                                const i4 = idx[i + 4];
                                const i5 = idx[i + 5];
                                const v3 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i3 * ImGui__namespace.DrawVertSize);
                                const v4 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i4 * ImGui__namespace.DrawVertSize);
                                const v5 = new ImGui__namespace.DrawVert(draw_list.VtxBuffer.buffer, draw_list.VtxBuffer.byteOffset + i5 * ImGui__namespace.DrawVertSize);
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
                                    if (minmin.uv[0] === maxmax.uv[0] || minmin.uv[1] === maxmax.uv[1]) {
                                        // one vertex color
                                        exports.ctx.beginPath();
                                        exports.ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        exports.ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                        exports.ctx.fill();
                                    }
                                    else {
                                        // no vertex color
                                        const image = draw_cmd.TextureId; // HACK
                                        const width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
                                        const height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
                                        image && exports.ctx.drawImage(image, minmin.uv[0] * width, minmin.uv[1] * height, (maxmax.uv[0] - minmin.uv[0]) * width, (maxmax.uv[1] - minmin.uv[1]) * height, minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        // ctx.beginPath();
                                        // ctx.rect(minmin.pos[0], minmin.pos[1], maxmax.pos[0] - minmin.pos[0], maxmax.pos[1] - minmin.pos[1]);
                                        // ctx.strokeStyle = "yellow";
                                        // ctx.stroke();
                                    }
                                    i += 3;
                                }
                                else {
                                    // one vertex color, no texture
                                    exports.ctx.beginPath();
                                    exports.ctx.moveTo(v0.pos[0], v0.pos[1]);
                                    exports.ctx.lineTo(v1.pos[0], v1.pos[1]);
                                    exports.ctx.lineTo(v2.pos[0], v2.pos[1]);
                                    exports.ctx.closePath();
                                    exports.ctx.fillStyle = `rgba(${v0.col[0] >> 0 & 0xff}, ${v0.col[0] >> 8 & 0xff}, ${v0.col[0] >> 16 & 0xff}, ${(v0.col[0] >> 24 & 0xff) / 0xff})`;
                                    exports.ctx.fill();
                                }
                            }
                            exports.ctx.restore();
                        }
                    }
                }
            });
        });
        // Destroy the temporary VAO
        gl2 && gl2.deleteVertexArray(vertex_array_object) || gl_vao && gl_vao.deleteVertexArrayOES(vertex_array_object);
        // Restore modified GL state
        exports.gl && (last_program !== null) && exports.gl.useProgram(last_program);
        exports.gl && (last_texture !== null) && exports.gl.bindTexture(exports.gl.TEXTURE_2D, last_texture);
        exports.gl && (last_active_texture !== null) && exports.gl.activeTexture(last_active_texture);
        gl2 && gl2.bindVertexArray(last_vertex_array_object) || gl_vao && gl_vao.bindVertexArrayOES(last_vertex_array_object);
        exports.gl && (last_array_buffer !== null) && exports.gl.bindBuffer(exports.gl.ARRAY_BUFFER, last_array_buffer);
        exports.gl && (last_element_array_buffer !== null) && exports.gl.bindBuffer(exports.gl.ELEMENT_ARRAY_BUFFER, last_element_array_buffer);
        exports.gl && (last_blend_equation_rgb !== null && last_blend_equation_alpha !== null) && exports.gl.blendEquationSeparate(last_blend_equation_rgb, last_blend_equation_alpha);
        exports.gl && (last_blend_src_rgb !== null && last_blend_src_alpha !== null && last_blend_dst_rgb !== null && last_blend_dst_alpha !== null) && exports.gl.blendFuncSeparate(last_blend_src_rgb, last_blend_src_alpha, last_blend_dst_rgb, last_blend_dst_alpha);
        exports.gl && (last_enable_blend ? exports.gl.enable(exports.gl.BLEND) : exports.gl.disable(exports.gl.BLEND));
        exports.gl && (last_enable_cull_face ? exports.gl.enable(exports.gl.CULL_FACE) : exports.gl.disable(exports.gl.CULL_FACE));
        exports.gl && (last_enable_depth_test ? exports.gl.enable(exports.gl.DEPTH_TEST) : exports.gl.disable(exports.gl.DEPTH_TEST));
        exports.gl && (last_enable_scissor_test ? exports.gl.enable(exports.gl.SCISSOR_TEST) : exports.gl.disable(exports.gl.SCISSOR_TEST));
        // glPolygonMode(GL_FRONT_AND_BACK, (GLenum)last_polygon_mode[0]);
        exports.gl && (last_viewport !== null) && exports.gl.viewport(last_viewport[0], last_viewport[1], last_viewport[2], last_viewport[3]);
        exports.gl && (last_scissor_box !== null) && exports.gl.scissor(last_scissor_box[0], last_scissor_box[1], last_scissor_box[2], last_scissor_box[3]);
    }
    function CreateFontsTexture() {
        const io = ImGui__namespace.GetIO();
        // Backup GL state
        const last_texture = exports.gl && exports.gl.getParameter(exports.gl.TEXTURE_BINDING_2D);
        // Build texture atlas
        // const width: number = 256;
        // const height: number = 256;
        // const pixels: Uint8Array = new Uint8Array(4 * width * height).fill(0xff);
        const { width, height, pixels } = io.Fonts.GetTexDataAsRGBA32(); // Load as RGBA 32-bits (75% of the memory is wasted, but default font is so small) because it is more likely to be compatible with user's existing shaders. If your ImTextureId represent a higher-level concept than just a GL texture id, consider calling GetTexDataAsAlpha8() instead to save on GPU memory.
        // console.log(`font texture ${width} x ${height} @ ${pixels.length}`);
        // Upload texture to graphics system
        g_FontTexture = exports.gl && exports.gl.createTexture();
        exports.gl && exports.gl.bindTexture(exports.gl.TEXTURE_2D, g_FontTexture);
        exports.gl && exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MIN_FILTER, exports.gl.LINEAR);
        exports.gl && exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MAG_FILTER, exports.gl.LINEAR);
        // gl && gl.pixelStorei(gl.UNPACK_ROW_LENGTH); // WebGL2
        exports.gl && exports.gl.texImage2D(exports.gl.TEXTURE_2D, 0, exports.gl.RGBA, width, height, 0, exports.gl.RGBA, exports.gl.UNSIGNED_BYTE, pixels);
        // Store our identifier
        io.Fonts.TexID = g_FontTexture || { foo: "bar" };
        // console.log("font texture id", g_FontTexture);
        if (exports.ctx) {
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
        exports.gl && last_texture && exports.gl.bindTexture(exports.gl.TEXTURE_2D, last_texture);
    }
    function DestroyFontsTexture() {
        const io = ImGui__namespace.GetIO();
        io.Fonts.TexID = null;
        exports.gl && exports.gl.deleteTexture(g_FontTexture);
        g_FontTexture = null;
    }
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
        CreateFontsTexture();
    }
    function DestroyDeviceObjects() {
        DestroyFontsTexture();
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

    exports.CreateDeviceObjects = CreateDeviceObjects;
    exports.CreateFontsTexture = CreateFontsTexture;
    exports.DestroyDeviceObjects = DestroyDeviceObjects;
    exports.DestroyFontsTexture = DestroyFontsTexture;
    exports.Init = Init;
    exports.NewFrame = NewFrame;
    exports.RenderDrawData = RenderDrawData;
    exports.Shutdown = Shutdown;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
