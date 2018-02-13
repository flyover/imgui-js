import * as ImGui from "imgui-js";
import * as ImGui_Impl from "./imgui_impl";
import * as bindImGui from "imgui-js/bind-imgui";
import { ImVec2 } from "imgui-js";
import { ImVec4 } from "imgui-js";
import { ShowDemoWindow } from "imgui-js/imgui_demo";

import { MemoryEditor } from "imgui-js/imgui_memory_editor";

export default function main(): void {
    // Setup ImGui binding
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
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        window.addEventListener("resize", () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        });
        ImGui_Impl.Init(canvas);
    } else {
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

    let show_demo_window: boolean = true;
    let show_another_window: boolean = false;
    let clear_color: ImVec4 = new ImVec4(0.45, 0.55, 0.60, 1.00);

    /* static */ let f: number = 0.0;
    
    const memory_editor: MemoryEditor = new MemoryEditor();

    let source: string = [
        "ImGui.Text(\"Hello, world!\");",
        "ImGui.SliderFloat(\"float\",",
        "\t(value = f) => f = value,",
        "\t0.0, 1.0);",
        ""
    ].join("\n");

    function ShowSandboxWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, ImVec2.ZERO, ImGui.InputTextFlags.AllowTabInput);
        ImGui.SameLine();
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered())
        {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(450.0);
            ImGui.TextUnformatted("Contents evaluated and appended to the window.");
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
        try {
            eval(source);
        } catch (e) {
            ImGui.TextColored(new ImVec4(1.0,0.0,0.0,1.0), "error: ");
            ImGui.SameLine();
            ImGui.Text(e.message);
        }
        ImGui.End();
    }

    let show_sandbox_window: boolean = false;

    // Main loop
    let done: boolean = false;
    function _loop(time: number): void {
        // You can read the io.WantCaptureMouse, io.WantCaptureKeyboard flags to tell if dear imgui wants to use your inputs.
        // - When io.WantCaptureMouse is true, do not dispatch mouse input data to your main application.
        // - When io.WantCaptureKeyboard is true, do not dispatch keyboard input data to your main application.
        // Generally you may always pass all inputs to dear imgui, and hide them from your application based on those two flags.
        ImGui_Impl.NewFrame(time);

        // 1. Show a simple window
        // Tip: if we don't call ImGui::Begin()/ImGui::End() the widgets automatically appears in a window called "Debug".
        {
            // static float f = 0.0f;
            ImGui.Text("Hello, world!");                                    // Some text (you can use a format string too)
            ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0); // Edit 1 float as a slider from 0.0f to 1.0f
            ImGui.ColorEdit3("clear color", clear_color);                   // Edit 3 floats as a color
            if (ImGui.Button("Demo Window"))  // Use buttons to toggle our bools. We could use Checkbox() as well.
                show_demo_window = !show_demo_window;
            if (ImGui.Button("Another Window"))
                show_another_window = !show_another_window;
            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);
    
            if (ImGui.Button("Memory Editor"))
                memory_editor.Open = !memory_editor.Open;
            if (memory_editor.Open)
                memory_editor.DrawWindow("Memory Editor", bindImGui.buffer);        
            const mi: bindImGui.mallinfo = bindImGui.mallinfo();
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
            ImGui.Begin("Another Window", (value = show_another_window) => show_another_window = value, ImGui.WindowFlags.AlwaysAutoResize);
            ImGui.Text("Hello from another window!");
            ImGui.End();
        }
    
        // 3. Show the ImGui demo window. Most of the sample code is in ImGui::ShowDemoWindow().
        if (show_demo_window) {
            ImGui.SetNextWindowPos(new ImVec2(650, 20), ImGui.Cond.FirstUseEver) // Normally user code doesn't need/want to call this because positions are saved in .ini file anyway. Here we just want to make the demo initial state a bit more friendly!
            /*ImGui.*/ShowDemoWindow((value = show_demo_window) => show_demo_window = value);
        }
    
        ImGui_Impl.EndFrame();
    
        // Rendering
        const gl: WebGLRenderingContext | null = ImGui_Impl.gl;
        gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl && gl.clearColor(clear_color.x, clear_color.y, clear_color.z, clear_color.w);
        gl && gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound
    
        ImGui_Impl.RenderDrawLists();

        if (typeof(window) !== "undefined") {
            window.requestAnimationFrame(done ? _done : _loop);
        }
    }

    function _done(): void {
        // Cleanup
        ImGui_Impl.Shutdown();
    }

    if (typeof(window) !== "undefined") {
        window.requestAnimationFrame(_loop);
    } else {
        _loop(1.0 / 60.0);
        _done();
    }
}
