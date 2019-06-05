import * as ImGui from "imgui-js";
import * as ImGui_Impl from "./imgui_impl";

import { ImVec2 } from "imgui-js";
import { ImVec4 } from "imgui-js";
import { ImGuiIO } from "imgui-js";
import { ShowDemoWindow } from "imgui-js/imgui_demo";

import { MemoryEditor } from "imgui-js/imgui_memory_editor";

let font: ImGui.ImFont | null = null;

let show_demo_window: boolean = true;
let show_another_window: boolean = false;
const clear_color: ImVec4 = new ImVec4(0.45, 0.55, 0.60, 1.00);

const memory_editor: MemoryEditor = new MemoryEditor();

let show_sandbox_window: boolean = false;
let show_gamepad_window: boolean = false;
let show_movie_window: boolean = false;

/* static */ let f: number = 0.0;
/* static */ let counter: number = 0;

let done: boolean = false;

async function LoadArrayBuffer(url: string): Promise<ArrayBuffer> {
    const response: Response = await fetch(url);
    return response.arrayBuffer();
}

export default async function main(): Promise<void> {
    await ImGui.default();
    if (typeof(window) !== "undefined") {
        window.requestAnimationFrame(_init);
    } else {
        async function _main(): Promise<void> {
            await _init();
            for (let i = 0; i < 3; ++i) { _loop(1 / 60); }
            await _done();
        }
        _main().catch(console.error);
    }
}

async function AddFontFromFileTTF(url: string, size_pixels: number, font_cfg: ImGui.ImFontConfig | null = null, glyph_ranges: number | null = null): Promise<ImGui.ImFont> {
    font_cfg = font_cfg || new ImGui.ImFontConfig();
    font_cfg.Name = font_cfg.Name || `${url.split(/[\\\/]/).pop()}, ${size_pixels.toFixed(0)}px`;
    return ImGui.GetIO().Fonts.AddFontFromMemoryTTF(await LoadArrayBuffer(url), size_pixels, font_cfg, glyph_ranges);
}

async function _init(): Promise<void> {
    console.log("Total allocated space (uordblks) @ _init:", ImGui.bind.mallinfo().uordblks);

    // Setup Dear ImGui binding
    ImGui.IMGUI_CHECKVERSION();
    ImGui.CreateContext();

    const io: ImGuiIO = ImGui.GetIO();
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
    font = await AddFontFromFileTTF("../imgui/misc/fonts/Roboto-Medium.ttf", 16.0);
    // font = await AddFontFromFileTTF("../imgui/misc/fonts/Cousine-Regular.ttf", 15.0);
    // font = await AddFontFromFileTTF("../imgui/misc/fonts/DroidSans.ttf", 16.0);
    // font = await AddFontFromFileTTF("../imgui/misc/fonts/ProggyTiny.ttf", 10.0);
    // font = await AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
    // font = await AddFontFromFileTTF("https://raw.githubusercontent.com/googlei18n/noto-cjk/master/NotoSansJP-Regular.otf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
    ImGui.IM_ASSERT(font !== null);

    if (typeof(window) !== "undefined") {
        const output: HTMLElement = document.getElementById("output") || document.body;
        const canvas: HTMLCanvasElement = document.createElement("canvas");
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
    } else {
        ImGui_Impl.Init(null);
    }

    StartUpImage();
    StartUpVideo();

    if (typeof(window) !== "undefined") {
        window.requestAnimationFrame(_loop);
    }
}

// Main loop
function _loop(time: number): void {
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
        done = /*ImGui.*/ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
    }

    // 2. Show a simple window that we create ourselves. We use a Begin/End pair to created a named window.
    {
        // static float f = 0.0f;
        // static int counter = 0;

        ImGui.Begin("Hello, world!");                          // Create a window called "Hello, world!" and append into it.

        ImGui.Text("This is some useful text.");               // Display some text (you can use a format strings too)
        ImGui.Checkbox("Demo Window", (value = show_demo_window) => show_demo_window = value);      // Edit bools storing our windows open/close state
        ImGui.Checkbox("Another Window", (value = show_another_window) => show_another_window = value);

        ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0);            // Edit 1 float using a slider from 0.0f to 1.0f
        ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats representing a color

        if (ImGui.Button("Button"))                            // Buttons return true when clicked (NB: most widgets return true when edited/activated)
            counter++;
        ImGui.SameLine();
        ImGui.Text(`counter = ${counter}`);

        ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);

        ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
        if (memory_editor.Open)
            memory_editor.DrawWindow("Memory Editor", ImGui.bind.HEAP8.buffer);
        const mi: ImGui.Bind.mallinfo = ImGui.bind.mallinfo();
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
        if (ImGui.ImageButton(image_gl_texture, new ImVec2(48, 48))) {
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
        if (ImGui.Button("Sandbox Window")) { show_sandbox_window = true; }
        if (show_sandbox_window)
            ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
        ImGui.SameLine();
        if (ImGui.Button("Gamepad Window")) { show_gamepad_window = true; }
        if (show_gamepad_window)
            ShowGamepadWindow("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
        ImGui.SameLine();
        if (ImGui.Button("Movie Window")) { show_movie_window = true; }
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
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
    }

    const ctx: CanvasRenderingContext2D | null = ImGui_Impl.ctx;
    if (ctx) {
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = `rgba(${clear_color.x * 0xff}, ${clear_color.y * 0xff}, ${clear_color.z * 0xff}, ${clear_color.w})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    UpdateVideo();

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    if (typeof(window) !== "undefined") {
        window.requestAnimationFrame(done ? _done : _loop);
    }
}

async function _done(): Promise<void> {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    const ctx: CanvasRenderingContext2D | null = ImGui_Impl.ctx;
    if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    CleanUpImage();
    CleanUpVideo();

    // Cleanup
    ImGui_Impl.Shutdown();
    ImGui.DestroyContext();

    console.log("Total allocated space (uordblks) @ _done:", ImGui.bind.mallinfo().uordblks);
}

function ShowHelpMarker(desc: string): void {
    ImGui.TextDisabled("(?)");
    if (ImGui.IsItemHovered()) {
        ImGui.BeginTooltip();
        ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
        ImGui.TextUnformatted(desc);
        ImGui.PopTextWrapPos();
        ImGui.EndTooltip();
    }
}

let source: string = [
    "ImGui.Text(\"Hello, world!\");",
    "ImGui.SliderFloat(\"float\",",
    "\t(value = f) => f = value,",
    "\t0.0, 1.0);",
    "",
].join("\n");

function ShowSandboxWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
    ImGui.SetNextWindowSize(new ImVec2(320, 240), ImGui.Cond.FirstUseEver);
    ImGui.Begin(title, p_open);
    ImGui.Text("Source");
    ImGui.SameLine(); ShowHelpMarker("Contents evaluated and appended to the window.");
    ImGui.PushItemWidth(-1);
    ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, ImVec2.ZERO, ImGui.InputTextFlags.AllowTabInput);
    ImGui.PopItemWidth();
    try {
        eval(source);
    } catch (e) {
        ImGui.TextColored(new ImVec4(1.0, 0.0, 0.0, 1.0), "error: ");
        ImGui.SameLine();
        ImGui.Text(e.message);
    }
    ImGui.End();
}

function ShowGamepadWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
    ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
    const gamepads: (Gamepad | null)[] = (typeof(navigator) !== "undefined" && typeof(navigator.getGamepads) === "function") ? navigator.getGamepads() : [];
    if (gamepads.length > 0) {
        for (let i = 0; i < gamepads.length; ++i) {
            const gamepad: Gamepad | null = gamepads[i];
            ImGui.Text(`gamepad ${i} ${gamepad && gamepad.id}`);
            if (!gamepad) { continue; }
            ImGui.Text(`       `);
            for (let button = 0; button < gamepad.buttons.length; ++button) {
                ImGui.SameLine(); ImGui.Text(`${button.toString(16)}`);
            }
            ImGui.Text(`buttons`);
            for (let button = 0; button < gamepad.buttons.length; ++button) {
                ImGui.SameLine(); ImGui.Text(`${gamepad.buttons[button].value}`);
            }
            ImGui.Text(`axes`);
            for (let axis = 0; axis < gamepad.axes.length; ++axis) {
                ImGui.Text(`${axis}: ${gamepad.axes[axis].toFixed(2)}`);
            }
        }
    } else {
        ImGui.Text("connect a gamepad");
    }
    ImGui.End();
}

const image_urls: string[] = [
    "https://threejs.org/examples/textures/crate.gif",
    "https://threejs.org/examples/textures/sprite.png",
    "https://threejs.org/examples/textures/UV_Grid_Sm.jpg",
];
let image_url: string = image_urls[0];
let image_element: HTMLImageElement | null = null;
let image_gl_texture: WebGLTexture | null = null;

function StartUpImage(): void {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        const width: number = 256;
        const height: number = 256;
        const pixels: Uint8Array = new Uint8Array(4 * width * height);
        image_gl_texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        const image: HTMLImageElement = image_element = new Image();
        image.crossOrigin = "anonymous";
        image.addEventListener("load", (event: Event) => {
            gl.bindTexture(gl.TEXTURE_2D, image_gl_texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        });
        image.src = image_url;
    }
}

function CleanUpImage(): void {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        gl.deleteTexture(image_gl_texture); image_gl_texture = null;

        image_element = null;
    }
}

const video_urls: string[] = [
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
let video_url: string = video_urls[0];
let video_element: HTMLVideoElement | null = null;
let video_gl_texture: WebGLTexture | null = null;
let video_w: number = 640;
let video_h: number = 360;
let video_time_active: boolean = false;
let video_time: number = 0;
let video_duration: number = 0;

function StartUpVideo(): void {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        video_element = document.createElement("video");
        video_element.crossOrigin = "anonymous";
        video_element.src = video_url;
        video_element.load();

        const width: number = 256;
        const height: number = 256;
        const pixels: Uint8Array = new Uint8Array(4 * width * height);
        video_gl_texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    }
}

function CleanUpVideo(): void {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl) {
        gl.deleteTexture(video_gl_texture); video_gl_texture = null;

        video_element = null;
    }
}

function UpdateVideo(): void {
    const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
    if (gl && video_element && video_element.readyState >= video_element.HAVE_CURRENT_DATA) {
        gl.bindTexture(gl.TEXTURE_2D, video_gl_texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video_element);
    }
}

function ShowMovieWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
    ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
    if (video_element !== null) {
        if (p_open && !p_open()) {
            video_element.pause();
        }
        const w: number = video_element.videoWidth;
        const h: number = video_element.videoHeight;
        if (w > 0) { video_w = w; }
        if (h > 0) { video_h = h; }

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

        if (ImGui.ImageButton(video_gl_texture, new ImVec2(video_w, video_h))) {
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
        const video_time_was_active: boolean = video_time_active;
        video_time_active = ImGui.IsItemActive();
        if (!video_time_active && video_time_was_active) {
            video_element.currentTime = video_time;
        }
        ImGui.EndGroup();
    } else {
        ImGui.Text("No Video Element");
    }
    ImGui.End();
}
