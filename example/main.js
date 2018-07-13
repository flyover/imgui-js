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
    var ImGui, ImGui_Impl, imgui_js_1, imgui_js_2, imgui_demo_1, imgui_memory_editor_1, font, show_demo_window, show_another_window, clear_color, memory_editor, show_sandbox_window, show_gamepad_window, show_movie_window, f, counter, done, source, image_url, image_element, image_gl_texture, video_url, video_element, video_gl_texture, video_time_active, video_time;
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
    function AddFontFromFileTTF(url, size_pixels, font_cfg = null, glyph_ranges = null) {
        return __awaiter(this, void 0, void 0, function* () {
            font_cfg = font_cfg || new ImGui.ImFontConfig();
            font_cfg.Name = font_cfg.Name || `${url.split(/[\\\/]/).pop()}, ${size_pixels.toFixed(0)}px`;
            return ImGui.GetIO().Fonts.AddFontFromMemoryTTF(yield LoadArrayBuffer(url), size_pixels, font_cfg, glyph_ranges);
        });
    }
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
            font = yield AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 16.0);
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/Cousine-Regular.ttf", 15.0);
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/DroidSans.ttf", 16.0);
            // font = await AddFontFromFileTTF("../imgui/misc/fonts/ProggyTiny.ttf", 10.0);
            // font = await AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
            // font = await AddFontFromFileTTF("https://raw.githubusercontent.com/googlei18n/noto-cjk/master/NotoSansJP-Regular.otf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
            ImGui.IM_ASSERT(font !== null);
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
            if (font) {
                ImGui.PushFont(font);
                ImGui.Text(`${font.GetDebugName()}`);
                if (font.FindGlyphNoFallback(0x5929)) {
                    ImGui.Text(`U+5929: \u5929`);
                }
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
            done = /*ImGui.*/ imgui_demo_1.ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBMkJBLHlCQUErQixHQUFXOztZQUN0QyxNQUFNLFFBQVEsR0FBYSxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFRDs7WUFDSSxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QixJQUFJLE9BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSDs7d0JBQ0ksTUFBTSxLQUFLLEVBQUUsQ0FBQzt3QkFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFOzRCQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7eUJBQUU7d0JBQzlDLE1BQU0sS0FBSyxFQUFFLENBQUM7b0JBQ2xCLENBQUM7aUJBQUE7Z0JBQ0QsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNMLENBQUM7S0FBQTs7SUFFRCw0QkFBa0MsR0FBVyxFQUFFLFdBQW1CLEVBQUUsV0FBc0MsSUFBSSxFQUFFLGVBQThCLElBQUk7O1lBQzlJLFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDaEQsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7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