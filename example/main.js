System.register(["imgui-js", "./imgui_impl", "imgui-js/imgui_demo", "imgui-js/imgui_memory_editor"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var ImGui, ImGui_Impl, imgui_js_1, imgui_js_2, imgui_demo_1, imgui_memory_editor_1, font, show_demo_window, show_another_window, clear_color, memory_editor, show_sandbox_window, show_gamepad_window, show_movie_window, show_dragdrop_window, f, counter, done, source, image_url, image_element, image_gl_texture, video_url, video_element, video_gl_texture, video_time_active, video_time, butnum;
    var __moduleName = context_1 && context_1.id;
    function LoadArrayBuffer(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            return response.arrayBuffer();
        });
    }
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ImGui.default();
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_init);
            }
            else {
                function _main() {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield _init();
                        for (let i = 0; i < 3; ++i) {
                            _loop(1 / 60);
                        }
                        yield _done();
                    });
                }
                _main().catch(console.error);
            }
        });
    }
    exports_1("default", main);
    function _init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Total allocated space (uordblks) @ _init:", ImGui.bind.mallinfo().uordblks);
            // Setup Dear ImGui binding
            ImGui.IMGUI_CHECKVERSION();
            ImGui.CreateContext();
            const io = ImGui.GetIO();
            // io.ConfigFlags |= ImGui.ConfigFlags.NavEnableKeyboard;  // Enable Keyboard Controls
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
            io.Fonts.AddFontDefault();
            font = io.Fonts.AddFontFromMemoryTTF(yield LoadArrayBuffer("../imgui/misc/fonts/Roboto-Medium.ttf"), 16.0);
            // io.Fonts.AddFontFromMemoryTTF(await LoadArrayBuffer("../imgui/misc/fonts/Cousine-Regular.ttf"), 15.0);
            // io.Fonts.AddFontFromMemoryTTF(await LoadArrayBuffer("../imgui/misc/fonts/DroidSans.ttf"), 16.0);
            // io.Fonts.AddFontFromMemoryTTF(await LoadArrayBuffer("../imgui/misc/fonts/ProggyTiny.ttf"), 10.0);
            // const font: ImFont = io.Fonts.AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
            // IM_ASSERT(font !== null);
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
                ImGui_Impl.Init(canvas);
            }
            else {
                ImGui_Impl.Init(null);
            }
            StartUpImage();
            StartUpVideo();
            if (typeof (window) !== "undefined") {
                window.requestAnimationFrame(_loop);
            }
        });
    }
    // Main loop
    function _loop(time) {
        // Poll and handle events (inputs, window resize, etc.)
        // You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
        // - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application.
        // - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application.
        // Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.
        // Start the ImGui frame
        ImGui_Impl.NewFrame(time);
        ImGui.NewFrame();
        ImGui.SetNextWindowPos(new ImGui.ImVec2(0, 0));
        ImGui.Begin("Exit", null, ImGui.WindowFlags.AlwaysAutoResize | ImGui.WindowFlags.NoCollapse | ImGui.WindowFlags.NoMove | ImGui.WindowFlags.NoTitleBar);
        if (ImGui.Button("Exit")) {
            done = true;
        }
        ImGui.End();
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
            if (ImGui.Button("Sandbox Window")) {
                show_sandbox_window = true;
            }
            if (show_sandbox_window)
                ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
            ImGui.SameLine();
            if (ImGui.Button("Gamepad Window")) {
                show_gamepad_window = true;
            }
            if (show_gamepad_window)
                ShowGamepadWindow("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
            ImGui.SameLine();
            if (ImGui.Button("Movie Window")) {
                show_movie_window = true;
            }
            if (show_movie_window)
                ShowMovieWindow("Movie Window", (value = show_movie_window) => show_movie_window = value);
            if (ImGui.Button("Drag/Drop Window")) {
                show_dragdrop_window = true;
            }
            if (show_dragdrop_window)
                ShowDragDropWindow("Drag/Drop Window", (value = show_dragdrop_window) => show_dragdrop_window = value);
            if (font) {
                ImGui.PushFont(font);
                ImGui.Text(`Roboto-Medium.ttf, 16px`);
                ImGui.PopFont();
            }
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
        ImGui.EndFrame();
        // Rendering
        ImGui.Render();
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
            gl.clear(gl.COLOR_BUFFER_BIT);
            //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
        }
        UpdateVideo();
        ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
        if (typeof (window) !== "undefined") {
            window.requestAnimationFrame(done ? _done : _loop);
        }
    }
    function _done() {
        return __awaiter(this, void 0, void 0, function* () {
            const gl = ImGui_Impl.gl;
            if (gl) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            CleanUpImage();
            CleanUpVideo();
            // Cleanup
            ImGui_Impl.Shutdown();
            ImGui.DestroyContext();
            console.log("Total allocated space (uordblks) @ _done:", ImGui.bind.mallinfo().uordblks);
        });
    }
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
        const gl = ImGui_Impl.gl;
        if (gl) {
            const width = 256;
            const height = 256;
            const pixels = new Uint8Array(4 * width * height);
            image_gl_texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            const image = image_element = new Image();
            image.addEventListener("load", (event) => {
                gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            });
            image.src = image_url;
        }
    }
    function CleanUpImage() {
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.deleteTexture(image_gl_texture);
            image_gl_texture = null;
            image_element = null;
        }
    }
    function StartUpVideo() {
        const gl = ImGui_Impl.gl;
        if (gl) {
            video_element = document.createElement("video");
            video_element.src = video_url;
            video_element.crossOrigin = "anonymous";
            video_element.load();
            const width = 256;
            const height = 256;
            const pixels = new Uint8Array(4 * width * height);
            video_gl_texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        }
    }
    function CleanUpVideo() {
        const gl = ImGui_Impl.gl;
        if (gl) {
            gl.deleteTexture(video_gl_texture);
            video_gl_texture = null;
            video_element = null;
        }
    }
    function UpdateVideo() {
        const gl = ImGui_Impl.gl;
        if (gl && video_element && video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
            gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video_element);
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
    function ShowDragDropWindow(title, p_open = null) {
        ImGui.Begin("Drag/Drop Window", p_open, ImGui.WindowFlags.AlwaysAutoResize);
        for (let i = 0; i < butnum.length; ++i) {
            ImGui.Button(`but${butnum[i]}`, new imgui_js_1.ImVec2(50, 50));
            if (ImGui.BeginDragDropSource()) {
                const data = { i };
                ImGui.SetDragDropPayload("ITEMN", data, ImGui.Cond.Once);
                ImGui.Button(`drag${butnum[i]}`, new imgui_js_1.ImVec2(50, 50));
                ImGui.EndDragDropSource();
            }
            if (ImGui.BeginDragDropTarget()) {
                const payload = ImGui.AcceptDragDropPayload("ITEMN");
                if (payload !== null) {
                    // swap numbers
                    [butnum[payload.Data.i], butnum[i]] = [butnum[i], butnum[payload.Data.i]];
                }
                ImGui.EndDragDropTarget();
            }
            if ((i % 4) < 3) {
                ImGui.SameLine();
            }
        }
        ImGui.End();
    }
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
            font = null;
            show_demo_window = true;
            show_another_window = false;
            clear_color = new imgui_js_2.ImVec4(0.45, 0.55, 0.60, 1.00);
            memory_editor = new imgui_memory_editor_1.MemoryEditor();
            show_sandbox_window = false;
            show_gamepad_window = false;
            show_movie_window = false;
            show_dragdrop_window = false;
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
            image_url = "../imgui/examples/example_apple/imguiex-ios/imgui_ex_icon.png";
            image_element = null;
            image_gl_texture = null;
            video_url = "https://threejs.org/examples/textures/sintel.ogv";
            video_element = null;
            video_gl_texture = null;
            video_time_active = false;
            video_time = 0;
            butnum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBNEJBLHlCQUErQixHQUFXOztZQUN0QyxNQUFNLFFBQVEsR0FBYSxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7WUFDSSxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QixJQUFJLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSDs7d0JBQ0ksTUFBTSxLQUFLLEVBQUUsQ0FBQzt3QkFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFOzRCQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7eUJBQUU7d0JBQzlDLE1BQU0sS0FBSyxFQUFFLENBQUM7b0JBQ2xCLENBQUM7aUJBQUE7Z0JBQ0QsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUM7S0FBQTs7SUFFRDs7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekYsMkJBQTJCO1lBQzNCLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUV0QixNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEMsc0ZBQXNGO1lBRXRGLGNBQWM7WUFDZCxLQUFLLENBQUMsZUFB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