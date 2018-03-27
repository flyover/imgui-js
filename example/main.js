System.register(["imgui-js", "./imgui_impl", "imgui-js/imgui_demo", "imgui-js/imgui_memory_editor"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function main() {
        // Setup ImGui binding
        ImGui.CreateContext();
        const io = ImGui.GetIO();
        if (typeof (window) !== "undefined") {
            const output = document.getElementById("output") || document.body;
            const canvas = document.createElement("canvas");
            output.appendChild(canvas);
            canvas.tabIndex = 1;
            canvas.style.position = "absolute";
            canvas.style.left = "0px";
            canvas.style.right = "0px";
            canvas.style.top = "0px";
            canvas.style.bottom = "0px";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            const devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = canvas.clientWidth * devicePixelRatio;
            canvas.height = canvas.clientHeight * devicePixelRatio;
            window.addEventListener("resize", () => {
                const devicePixelRatio = window.devicePixelRatio || 1;
                canvas.width = canvas.clientWidth * devicePixelRatio;
                canvas.height = canvas.clientHeight * devicePixelRatio;
            });
            window.addEventListener("gamepadconnected", (event /* GamepadEvent */) => {
                console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
            });
            window.addEventListener("gamepaddisconnected", (event /* GamepadEvent */) => {
                console.log("Gamepad disconnected at index %d: %s.", event.gamepad.index, event.gamepad.id);
            });
            ImGui_Impl.Init(canvas);
            StartUpImage();
            StartUpVideo();
        }
        else {
            ImGui_Impl.Init(null);
        }
        //io.ConfigFlags |= ImGuiConfigFlags.EnableKeyboard;  // Enable Keyboard Controls
        // Setup style
        ImGui.StyleColorsDark();
        //ImGui.StyleColorsClassic();
        // Load Fonts
        // - If no fonts are loaded, dear imgui will use the default font. You can also load multiple fonts and use ImGui::PushFont()/PopFont() to select them.
        // - AddFontFromFileTTF() will return the ImFont* so you can store it if you need to select the font among multiple.
        // - If the file cannot be loaded, the function will return NULL. Please handle those errors in your application (e.g. use an assertion, or display an error and quit).
        // - The fonts will be rasterized at a given size (w/ oversampling) and stored into a texture when calling ImFontAtlas::Build()/GetTexDataAsXXXX(), which ImGui_ImplXXXX_NewFrame below will call.
        // - Read 'misc/fonts/README.txt' for more instructions and details.
        // - Remember that in C/C++ if you want to include a backslash \ in a string literal you need to write a double backslash \\ !
        //io.Fonts.AddFontDefault();
        //io.Fonts.AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 16.0);
        //io.Fonts.AddFontFromFileTTF("../imgui/misc/fonts/Cousine-Regular.ttf", 15.0);
        //io.Fonts.AddFontFromFileTTF("../imgui/misc/fonts/DroidSans.ttf", 16.0);
        //io.Fonts.AddFontFromFileTTF("../imgui/misc/fonts/ProggyTiny.ttf", 10.0);
        //const font: ImFont = io.Fonts.AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
        //IM_ASSERT(font !== null);
        // Main loop
        function _loop(time) {
            // You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
            // - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application.
            // - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application.
            // Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.
            ImGui_Impl.NewFrame(time);
            // 1. Show a simple window.
            // Tip: if we don't call ImGui::Begin()/ImGui::End() the widgets automatically appears in a window called "Debug".
            {
                // static float f = 0.0f;
                // static int counter = 0;
                ImGui.Text("Hello, world!"); // Display some text (you can use a format string too)
                ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0); // Edit 1 float using a slider from 0.0f to 1.0f
                ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats representing a color
                ImGui.Checkbox("Demo Window", (value = show_demo_window) => show_demo_window = value); // Edit bools storing our windows open/close state
                ImGui.Checkbox("Another Window", (value = show_another_window) => show_another_window = value);
                if (ImGui.Button("Button")) // Buttons return true when clicked (NB: most widgets return true when edited/activated)
                    counter++;
                ImGui.SameLine();
                ImGui.Text(`counter = ${counter}`);
                ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
                ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
                if (memory_editor.Open)
                    memory_editor.DrawWindow("Memory Editor", ImGui.bind.buffer);
                const mi = ImGui.bind.mallinfo();
                // ImGui.Text(`Total non-mmapped bytes (arena):       ${mi.arena}`);
                // ImGui.Text(`# of free chunks (ordblks):            ${mi.ordblks}`);
                // ImGui.Text(`# of free fastbin blocks (smblks):     ${mi.smblks}`);
                // ImGui.Text(`# of mapped regions (hblks):           ${mi.hblks}`);
                // ImGui.Text(`Bytes in mapped regions (hblkhd):      ${mi.hblkhd}`);
                ImGui.Text(`Max. total allocated space (usmblks):  ${mi.usmblks}`);
                // ImGui.Text(`Free bytes held in fastbins (fsmblks): ${mi.fsmblks}`);
                ImGui.Text(`Total allocated space (uordblks):      ${mi.uordblks}`);
                ImGui.Text(`Total free space (fordblks):           ${mi.fordblks}`);
                // ImGui.Text(`Topmost releasable block (keepcost):   ${mi.keepcost}`);
                if (ImGui.ImageButton(image_gl_texture, new imgui_js_1.ImVec2(48, 48)))
                    show_demo_window = !show_demo_window;
                if (ImGui.IsItemHovered()) {
                    ImGui.BeginTooltip();
                    ImGui.Text(image_url);
                    ImGui.EndTooltip();
                }
                ImGui.Checkbox("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
                if (show_sandbox_window)
                    ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
                ImGui.Checkbox("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
                if (show_gamepad_window)
                    ShowGamepadWindow("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
                ImGui.Checkbox("Movie Window", (value = show_movie_window) => show_movie_window = value);
                if (show_movie_window)
                    ShowMovieWindow("Movie Window", (value = show_movie_window) => show_movie_window = value);
            }
            // 2. Show another simple window. In most cases you will use an explicit Begin/End pair to name your windows.
            if (show_another_window) {
                ImGui.Begin("Another Window", (value = show_another_window) => show_another_window = value, ImGui.WindowFlags.AlwaysAutoResize);
                ImGui.Text("Hello from another window!");
                if (ImGui.Button("Close Me"))
                    show_another_window = false;
                ImGui.End();
            }
            // 3. Show the ImGui demo window. Most of the sample code is in ImGui::ShowDemoWindow(). Read its code to learn more about Dear ImGui!
            if (show_demo_window) {
                ImGui.SetNextWindowPos(new imgui_js_1.ImVec2(650, 20), ImGui.Cond.FirstUseEver); // Normally user code doesn't need/want to call this because positions are saved in .ini file anyway. Here we just want to make the demo initial state a bit more friendly!
                /*ImGui.*/ imgui_demo_1.ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
            }
            ImGui_Impl.EndFrame();
            // Rendering
            const gl = ImGui_Impl.gl;
            gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl && gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
            gl && gl.clear(gl.COLOR_BUFFER_BIT);
            //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
            UpdateVideo();
            ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(done ? _done : _loop);
            }
        }
        function _done() {
            CleanUpImage();
            CleanUpVideo();
            // Cleanup
            ImGui_Impl.Shutdown();
            ImGui.DestroyContext();
        }
        if (typeof (window) !== "undefined") {
            window.requestAnimationFrame(_loop);
        }
        else {
            _loop(1.0 / 60.0);
            _done();
        }
    }
    exports_1("default", main);
    function ShowHelpMarker(desc) {
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted(desc);
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
    }
    function ShowSandboxWindow(title, p_open = null) {
        ImGui.SetNextWindowSize(new imgui_js_1.ImVec2(320, 240), ImGui.Cond.FirstUseEver);
        ImGui.Begin(title, p_open);
        ImGui.Text("Source");
        ImGui.SameLine();
        ShowHelpMarker("Contents evaluated and appended to the window.");
        ImGui.PushItemWidth(-1);
        ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, imgui_js_1.ImVec2.ZERO, ImGui.InputTextFlags.AllowTabInput);
        ImGui.PopItemWidth();
        try {
            eval(source);
        }
        catch (e) {
            ImGui.TextColored(new imgui_js_2.ImVec4(1.0, 0.0, 0.0, 1.0), "error: ");
            ImGui.SameLine();
            ImGui.Text(e.message);
        }
        ImGui.End();
    }
    function ShowGamepadWindow(title, p_open = null) {
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        const gamepads = (typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
        if (gamepads.length > 0) {
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad = gamepads[i];
                ImGui.Text(`gamepad ${i} ${gamepad && gamepad.id}`);
                if (!gamepad) {
                    continue;
                }
                ImGui.Text(`       `);
                for (let button = 0; button < gamepad.buttons.length; ++button) {
                    ImGui.SameLine();
                    ImGui.Text(`${button.toString(16)}`);
                }
                ImGui.Text(`buttons`);
                for (let button = 0; button < gamepad.buttons.length; ++button) {
                    ImGui.SameLine();
                    ImGui.Text(`${gamepad.buttons[button].value}`);
                }
                ImGui.Text(`axes`);
                for (let axis = 0; axis < gamepad.axes.length; ++axis) {
                    ImGui.Text(`${axis}: ${gamepad.axes[axis].toFixed(2)}`);
                }
            }
        }
        else {
            ImGui.Text("connect a gamepad");
        }
        ImGui.End();
    }
    function StartUpImage() {
        const width = 256;
        const height = 256;
        const pixels = new Uint8Array(4 * width * height);
        const gl = ImGui_Impl.gl;
        image_gl_texture = gl && gl.createTexture();
        gl && gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const image = image_element = new Image();
        image.addEventListener("load", (event) => {
            gl && gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
            gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        });
        image.src = image_url;
    }
    function CleanUpImage() {
        const gl = ImGui_Impl.gl;
        gl && gl.deleteTexture(image_gl_texture);
        image_gl_texture = null;
        image_element = null;
    }
    function StartUpVideo() {
        video_element = document.createElement("video");
        video_element.src = video_url;
        video_element.crossOrigin = "anonymous";
        video_element.load();
        const width = 256;
        const height = 256;
        const pixels = new Uint8Array(4 * width * height);
        const gl = ImGui_Impl.gl;
        video_gl_texture = gl && gl.createTexture();
        gl && gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl && gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
    function CleanUpVideo() {
        const gl = ImGui_Impl.gl;
        gl && gl.deleteTexture(video_gl_texture);
        video_gl_texture = null;
        video_element = null;
    }
    function UpdateVideo() {
        if (video_element && video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
            const gl = ImGui_Impl.gl;
            gl && gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
            gl && gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video_element);
        }
    }
    function ShowMovieWindow(title, p_open = null) {
        ImGui.Begin("Movie Window", p_open, ImGui.WindowFlags.AlwaysAutoResize);
        if (video_element !== null) {
            ImGui.PushItemWidth(-1);
            if (ImGui.InputText("", (value = video_url) => video_url = value)) {
                console.log(video_url);
                video_element.src = video_url;
            }
            ImGui.PopItemWidth();
            const w = video_element.videoWidth;
            const h = video_element.videoHeight;
            if (ImGui.ImageButton(video_gl_texture, new imgui_js_1.ImVec2(w, h))) {
                video_element.paused ? video_element.play() : video_element.pause();
            }
            if (ImGui.Button(video_element.paused ? "Play" : "Stop")) {
                video_element.paused ? video_element.play() : video_element.pause();
            }
            ImGui.SameLine();
            if (!video_time_active) {
                video_time = video_element.currentTime;
            }
            ImGui.SliderFloat("Time", (value = video_time) => video_time = value, 0, video_element.duration);
            const video_time_was_active = video_time_active;
            video_time_active = ImGui.IsItemActive();
            if (!video_time_active && video_time_was_active) {
                video_element.currentTime = video_time;
            }
        }
        else {
            ImGui.Text("No Video Element");
        }
        ImGui.End();
    }
    var ImGui, ImGui_Impl, imgui_js_1, imgui_js_2, imgui_demo_1, imgui_memory_editor_1, show_demo_window, show_another_window, clear_color, memory_editor, show_sandbox_window, show_gamepad_window, show_movie_window, f, counter, done, source, image_url, image_element, image_gl_texture, video_url, video_element, video_gl_texture, video_time_active, video_time;
    return {
        setters: [
            function (ImGui_1) {
                ImGui = ImGui_1;
                imgui_js_1 = ImGui_1;
                imgui_js_2 = ImGui_1;
            },
            function (ImGui_Impl_1) {
                ImGui_Impl = ImGui_Impl_1;
            },
            function (imgui_demo_1_1) {
                imgui_demo_1 = imgui_demo_1_1;
            },
            function (imgui_memory_editor_1_1) {
                imgui_memory_editor_1 = imgui_memory_editor_1_1;
            }
        ],
        execute: function () {
            show_demo_window = true;
            show_another_window = false;
            clear_color = new imgui_js_2.ImVec4(0.45, 0.55, 0.60, 1.00);
            memory_editor = new imgui_memory_editor_1.MemoryEditor();
            show_sandbox_window = false;
            show_gamepad_window = false;
            show_movie_window = false;
            /* static */ f = 0.0;
            /* static */ counter = 0;
            done = false;
            source = [
                "ImGui.Text(\"Hello, world!\");",
                "ImGui.SliderFloat(\"float\",",
                "\t(value = f) => f = value,",
                "\t0.0, 1.0);",
                "",
            ].join("\n");
            image_url = "../imgui/examples/apple_example/imguiex-ios/imgui_ex_icon.png";
            image_element = null;
            image_gl_texture = null;
            video_url = "https://threejs.org/examples/textures/sintel.ogv";
            video_element = null;
            video_gl_texture = null;
            video_time_active = false;
            video_time = 0;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBMEJBO1FBQ0ksc0JBQXNCO1FBQ3RCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxPQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDL0UsTUFBTSxNQUFNLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDN0IsTUFBTSxnQkFBZ0IsR0FBVyxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztZQUNyRCxNQUFNLENBQUMsTUFB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