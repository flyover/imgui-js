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
    var ImGui, ImGui_Impl, imgui_js_1, imgui_js_2, imgui_demo_1, imgui_memory_editor_1, font, show_demo_window, show_another_window, clear_color, memory_editor, show_sandbox_window, show_gamepad_window, show_movie_window, f, counter, done, source, image_urls, image_url, image_element, image_gl_texture, video_urls, video_url, video_element, video_gl_texture, video_w, video_h, video_time_active, video_time, video_duration;
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
        // Start the Dear ImGui frame
        ImGui_Impl.NewFrame(time);
        ImGui.NewFrame();
        // 1. Show the big demo window (Most of the sample code is in ImGui::ShowDemoWindow()! You can browse its code to learn more about Dear ImGui!).
        if (!done && show_demo_window) {
            done = /*ImGui.*/ imgui_demo_1.ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
        }
        // 2. Show a simple window that we create ourselves. We use a Begin/End pair to created a named window.
        {
            // static float f = 0.0f;
            // static int counter = 0;
            ImGui.Begin("Hello, world!"); // Create a window called "Hello, world!" and append into it.
            ImGui.Text("This is some useful text."); // Display some text (you can use a format strings too)
            ImGui.Checkbox("Demo Window", (value = show_demo_window) => show_demo_window = value); // Edit bools storing our windows open/close state
            ImGui.Checkbox("Another Window", (value = show_another_window) => show_another_window = value);
            ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0); // Edit 1 float using a slider from 0.0f to 1.0f
            ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats representing a color
            if (ImGui.Button("Button")) // Buttons return true when clicked (NB: most widgets return true when edited/activated)
                counter++;
            ImGui.SameLine();
            ImGui.Text(`counter = ${counter}`);
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
            if (memory_editor.Open)
                memory_editor.DrawWindow("Memory Editor", ImGui.bind.HEAP8.buffer);
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
            if (ImGui.ImageButton(image_gl_texture, new imgui_js_1.ImVec2(48, 48))) {
                // show_demo_window = !show_demo_window;
                image_url = image_urls[(image_urls.indexOf(image_url) + 1) % image_urls.length];
                if (image_element) {
                    image_element.src = image_url;
                }
            }
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
            ImGui.End();
        }
        // 3. Show another simple window.
        if (show_another_window) {
            ImGui.Begin("Another Window", (value = show_another_window) => show_another_window = value, ImGui.WindowFlags.AlwaysAutoResize);
            ImGui.Text("Hello from another window!");
            if (ImGui.Button("Close Me"))
                show_another_window = false;
            ImGui.End();
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
        const ctx = ImGui_Impl.ctx;
        if (ctx) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = `rgba(${clear_color.x * 0xff}, ${clear_color.y * 0xff}, ${clear_color.z * 0xff}, ${clear_color.w})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
            const ctx = ImGui_Impl.ctx;
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
            image.crossOrigin = "anonymous";
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
            video_element.crossOrigin = "anonymous";
            video_element.src = video_url;
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
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        if (video_element !== null) {
            if (p_open && !p_open()) {
                video_element.pause();
            }
            const w = video_element.videoWidth;
            const h = video_element.videoHeight;
            if (w > 0) {
                video_w = w;
            }
            if (h > 0) {
                video_h = h;
            }
            ImGui.BeginGroup();
            if (ImGui.BeginCombo("##urls", null, ImGui.ComboFlags.NoPreview | ImGui.ComboFlags.PopupAlignLeft)) {
                for (let n = 0; n < ImGui.IM_ARRAYSIZE(video_urls); n++) {
                    if (ImGui.Selectable(video_urls[n])) {
                        video_url = video_urls[n];
                        console.log(video_url);
                        video_element.src = video_url;
                        video_element.autoplay = true;
                    }
                }
                ImGui.EndCombo();
            }
            ImGui.SameLine();
            ImGui.PushItemWidth(video_w - 20);
            if (ImGui.InputText("##url", (value = video_url) => video_url = value)) {
                console.log(video_url);
                video_element.src = video_url;
            }
            ImGui.PopItemWidth();
            ImGui.EndGroup();
            if (ImGui.ImageButton(video_gl_texture, new imgui_js_1.ImVec2(video_w, video_h))) {
                if (video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
                    video_element.paused ? video_element.play() : video_element.pause();
                }
            }
            ImGui.BeginGroup();
            if (ImGui.Button(video_element.paused ? "Play" : "Stop")) {
                if (video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
                    video_element.paused ? video_element.play() : video_element.pause();
                }
            }
            ImGui.SameLine();
            if (!video_time_active) {
                video_time = video_element.currentTime;
                video_duration = video_element.duration || 0;
            }
            ImGui.SliderFloat("##time", (value = video_time) => video_time = value, 0, video_duration);
            const video_time_was_active = video_time_active;
            video_time_active = ImGui.IsItemActive();
            if (!video_time_active && video_time_was_active) {
                video_element.currentTime = video_time;
            }
            ImGui.EndGroup();
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
            image_urls = [
                "https://threejs.org/examples/textures/crate.gif",
                "https://threejs.org/examples/textures/sprite.png",
                "https://threejs.org/examples/textures/UV_Grid_Sm.jpg",
            ];
            image_url = image_urls[0];
            image_element = null;
            image_gl_texture = null;
            video_urls = [
                "https://threejs.org/examples/textures/sintel.ogv",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            ];
            video_url = video_urls[0];
            video_element = null;
            video_gl_texture = null;
            video_w = 640;
            video_h = 360;
            video_time_active = false;
            video_time = 0;
            video_duration = 0;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBMkJBLFNBQWUsZUFBZSxDQUFDLEdBQVc7O1lBQ3RDLE1BQU0sUUFBUSxHQUFhLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVELFNBQThCLElBQUk7O1lBQzlCLE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLElBQUksT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDaEMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNILFNBQWUsS0FBSzs7d0JBQ2hCLE1BQU0sS0FBSyxFQUFFLENBQUM7d0JBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTs0QkFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3lCQUFFO3dCQUM5QyxNQUFNLEtBQUssRUFBRSxDQUFDO29CQUNsQixDQUFDO2lCQUFBO2dCQUNELEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7UUFDTCxDQUFDO0tBQUE7O0lBRUQsU0FBZSxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsV0FBbUIsRUFBRSxXQUFzQyxJQUFJLEVBQUUsZUFBOEIsSUFBSTs7WUFDOUksUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNoRCxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFL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