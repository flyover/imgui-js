"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImGui = require("imgui-js");
const ImGui_Impl = require("./imgui_impl");
const bindImGui = require("imgui-js/bind-imgui");
const imgui_js_1 = require("imgui-js");
const imgui_js_2 = require("imgui-js");
const imgui_demo_1 = require("imgui-js/imgui_demo");
const imgui_memory_editor_1 = require("imgui-js/imgui_memory_editor");
let show_demo_window = true;
let show_another_window = false;
const clear_color = new imgui_js_2.ImVec4(0.45, 0.55, 0.60, 1.00);
const memory_editor = new imgui_memory_editor_1.MemoryEditor();
let show_sandbox_window = false;
let show_gamepad_window = false;
let show_movie_window = false;
/* static */ let f = 0.0;
/* static */ let counter = 0;
const done = false;
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
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        window.addEventListener("resize", () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
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
    //io.NavFlags |= ImGuiNavFlags.EnableKeyboard;  // Enable Keyboard Controls
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
            if (ImGui.Button("Button"))
                counter++;
            ImGui.SameLine();
            ImGui.Text(`counter = ${counter}`);
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
            if (memory_editor.Open)
                memory_editor.DrawWindow("Memory Editor", bindImGui.buffer);
            const mi = bindImGui.mallinfo();
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
exports.default = main;
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
let source = [
    "ImGui.Text(\"Hello, world!\");",
    "ImGui.SliderFloat(\"float\",",
    "\t(value = f) => f = value,",
    "\t0.0, 1.0);",
    "",
].join("\n");
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
    const gamepads = typeof (navigator) !== "undefined" && typeof (navigator.getGamepads) === "function" ? navigator.getGamepads() : [];
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
const image_url = "../imgui/examples/apple_example/imguiex-ios/imgui_ex_icon.png";
let image_element = null;
let image_gl_texture = null;
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
let video_url = "https://threejs.org/examples/textures/sintel.ogv";
let video_element = null;
let video_gl_texture = null;
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
let video_time_active = false;
let video_time = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFDbEMsMkNBQTJDO0FBRTNDLGlEQUFpRDtBQUVqRCx1Q0FBa0M7QUFDbEMsdUNBQWtDO0FBR2xDLG9EQUFxRDtBQUVyRCxzRUFBNEQ7QUFFNUQsSUFBSSxnQkFBZ0IsR0FBWSxJQUFJLENBQUM7QUFDckMsSUFBSSxtQkFBbUIsR0FBWSxLQUFLLENBQUM7QUFDekMsTUFBTSxXQUFXLEdBQVcsSUFBSSxpQkFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRS9ELE1BQU0sYUFBYSxHQUFpQixJQUFJLGtDQUFZLEVBQUUsQ0FBQztBQUV2RCxJQUFJLG1CQUFtQixHQUFZLEtBQUssQ0FBQztBQUN6QyxJQUFJLG1CQUFtQixHQUFZLEtBQUssQ0FBQztBQUN6QyxJQUFJLGlCQUFpQixHQUFZLEtBQUssQ0FBQztBQUV2QyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQVcsR0FBRyxDQUFDO0FBQ2pDLFlBQVksQ0FBQyxJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUM7QUFFckMsTUFBTSxJQUFJLEdBQVksS0FBSyxDQUFDO0FBRTVCO0lBQ0ksc0JBQXNCO0lBQ3RCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixNQUFNLEVBQUUsR0FBWSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsRUFBRSxDQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxNQUFNLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUMvRSxNQUFNLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsV0FB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