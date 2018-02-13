"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImGui = require("../imgui");
const ImGui_Impl = require("./imgui_impl");
const bindImGui = require("../bind-imgui");
const imgui_1 = require("../imgui");
const imgui_2 = require("../imgui");
const imgui_demo_1 = require("../imgui_demo");
const imgui_memory_editor_1 = require("../imgui_memory_editor");
function main() {
    // Setup ImGui binding
    if (typeof (window) !== "undefined") {
        const output = document.getElementById("output") || document.body;
        const canvas = document.createElement("canvas");
        output.appendChild(canvas);
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
        ImGui_Impl.Init(canvas);
    }
    else {
        ImGui_Impl.Init(null);
    }
    // Setup style
    ImGui.StyleColorsClassic();
    //ImGui.StyleColorsDark();
    // Load Fonts
    // - If no fonts are loaded, dear imgui will use the default font. You can also load multiple fonts and use ImGui::PushFont()/PopFont() to select them. 
    // - AddFontFromFileTTF() will return the ImFont* so you can store it if you need to select the font among multiple. 
    // - If the file cannot be loaded, the function will return NULL. Please handle those errors in your application (e.g. use an assertion, or display an error and quit).
    // - The fonts will be rasterized at a given size (w/ oversampling) and stored into a texture when calling ImFontAtlas::Build()/GetTexDataAsXXXX(), which ImGui_ImplXXXX_NewFrame below will call.
    // - Read 'extra_fonts/README.txt' for more instructions and details.
    // - Remember that in C/C++ if you want to include a backslash \ in a string literal you need to write a double backslash \\ !
    //const io: ImGuiIO = ImGui.GetIO();
    //io.Fonts.AddFontDefault();
    //io.Fonts.AddFontFromFileTTF("../imgui/extra_fonts/Roboto-Medium.ttf", 16.0);
    //io.Fonts.AddFontFromFileTTF("../imgui/extra_fonts/Cousine-Regular.ttf", 15.0);
    //io.Fonts.AddFontFromFileTTF("../imgui/extra_fonts/DroidSans.ttf", 16.0);
    //io.Fonts.AddFontFromFileTTF("../imgui/extra_fonts/ProggyTiny.ttf", 10.0);
    //const font: ImFont = io.Fonts.AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0, null, io.Fonts.GetGlyphRangesJapanese());
    //IM_ASSERT(font !== null);
    let show_demo_window = true;
    let show_another_window = false;
    let clear_color = new imgui_2.ImVec4(0.45, 0.55, 0.60, 1.00);
    /* static */ let f = 0.0;
    const memory_editor = new imgui_memory_editor_1.MemoryEditor();
    let source = [
        "ImGui.Text(\"Hello, world!\");",
        "ImGui.SliderFloat(\"float\",",
        "\t(value = f) => f = value,",
        "\t0.0, 1.0);",
        ""
    ].join("\n");
    function ShowSandboxWindow(title, p_open = null) {
        ImGui.Begin(title, p_open, 64 /* AlwaysAutoResize */);
        ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, imgui_1.ImVec2.ZERO, 1024 /* AllowTabInput */);
        ImGui.SameLine();
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered()) {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(450.0);
            ImGui.TextUnformatted("Contents evaluated and appended to the window.");
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
        try {
            eval(source);
        }
        catch (e) {
            ImGui.TextColored(new imgui_2.ImVec4(1.0, 0.0, 0.0, 1.0), "error: ");
            ImGui.SameLine();
            ImGui.Text(e.message);
        }
        ImGui.End();
    }
    let show_sandbox_window = false;
    // Main loop
    let done = false;
    function _loop(time) {
        // You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
        // - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application.
        // - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application.
        // Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.
        ImGui_Impl.NewFrame(time);
        // 1. Show a simple window
        // Tip: if we don't call ImGui::Begin()/ImGui::End() the widgets automatically appears in a window called "Debug".
        {
            // static float f = 0.0f;
            ImGui.Text("Hello, world!"); // Some text (you can use a format string too)
            ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0); // Edit 1 float as a slider from 0.0f to 1.0f
            ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats as a color
            if (ImGui.Button("Demo Window"))
                show_demo_window = !show_demo_window;
            if (ImGui.Button("Another Window"))
                show_another_window = !show_another_window;
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
            if (ImGui.Button("Memory Editor"))
                memory_editor.Open = !memory_editor.Open;
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
            if (ImGui.Button("Sandbox Window"))
                show_sandbox_window = !show_sandbox_window;
            if (show_sandbox_window)
                ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
        }
        // 2. Show another simple window. In most cases you will use an explicit Begin/End pair to name the window.
        if (show_another_window) {
            ImGui.Begin("Another Window", (value = show_another_window) => show_another_window = value, 64 /* AlwaysAutoResize */);
            ImGui.Text("Hello from another window!");
            ImGui.End();
        }
        // 3. Show the ImGui demo window. Most of the sample code is in ImGui::ShowDemoWindow().
        if (show_demo_window) {
            ImGui.SetNextWindowPos(new imgui_1.ImVec2(650, 20), 4 /* FirstUseEver */); // Normally user code doesn't need/want to call this because positions are saved in .ini file anyway. Here we just want to make the demo initial state a bit more friendly!
            /*ImGui.*/ imgui_demo_1.ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
        }
        ImGui_Impl.EndFrame();
        // Rendering
        const gl = ImGui_Impl.gl;
        gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl && gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        gl && gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
        ImGui_Impl.RenderDrawLists();
        if (typeof (window) !== "undefined") {
            window.requestAnimationFrame(done ? _done : _loop);
        }
    }
    function _done() {
        // Cleanup
        ImGui_Impl.Shutdown();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFDbEMsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQyxvQ0FBa0M7QUFDbEMsb0NBQWtDO0FBQ2xDLDhDQUErQztBQUUvQyxnRUFBc0Q7QUFFdEQ7SUFDSSxzQkFBc0I7SUFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxNQUFNLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztRQUMvRSxNQUFNLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxF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