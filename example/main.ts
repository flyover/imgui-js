import * as ImGui from "imgui-js";
import * as ImGui_Impl from "./imgui_impl";
import * as bindImGui from "imgui-js/bind-imgui";
import { ImVec2 } from "imgui-js";
import { ImVec4 } from "imgui-js";
import { ImGuiIO } from "imgui-js";
import { ImGuiNavFlags } from "imgui-js";
import { ShowDemoWindow } from "imgui-js/imgui_demo";

import { MemoryEditor } from "imgui-js/imgui_memory_editor";

export default function main(): void {
    // Setup ImGui binding
    ImGui.CreateContext();
    const io: ImGuiIO = ImGui.GetIO();
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
        window.addEventListener("resize", (): void => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        });
        window.addEventListener("gamepadconnected", (event: any /* GamepadEvent */): void => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                event.gamepad.index, event.gamepad.id,
                event.gamepad.buttons.length, event.gamepad.axes.length);
        });
        window.addEventListener("gamepaddisconnected", (event: any /* GamepadEvent */): void => {
            console.log("Gamepad disconnected at index %d: %s.",
                event.gamepad.index, event.gamepad.id);
        });
        ImGui_Impl.Init(canvas);
    } else {
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

    let show_demo_window: boolean = true;
    let show_another_window: boolean = false;
    let clear_color: ImVec4 = new ImVec4(0.45, 0.55, 0.60, 1.00);

    /* static */ let f: number = 0.0;
    /* static */ let counter: number = 0;
    
    const memory_editor: MemoryEditor = new MemoryEditor();

    let source: string = [
        "ImGui.Text(\"Hello, world!\");",
        "ImGui.SliderFloat(\"float\",",
        "\t(value = f) => f = value,",
        "\t0.0, 1.0);",
        ""
    ].join("\n");

    function ShowSandboxWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
        ImGui.SetNextWindowSize(new ImVec2(320,240), ImGui.Cond.FirstUseEver);
        ImGui.Begin(title, p_open);
        ImGui.Text("Source");
        ImGui.SameLine();
        ImGui.TextDisabled("(?)");
        if (ImGui.IsItemHovered())
        {
            ImGui.BeginTooltip();
            ImGui.PushTextWrapPos(ImGui.GetFontSize() * 35.0);
            ImGui.TextUnformatted("Contents evaluated and appended to the window.");
            ImGui.PopTextWrapPos();
            ImGui.EndTooltip();
        }
        ImGui.PushItemWidth(-1);
        ImGui.InputTextMultiline("##source", (_ = source) => (source = _), 1024, ImVec2.ZERO, ImGui.InputTextFlags.AllowTabInput);
        ImGui.PopItemWidth();
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

    function ShowGamepadWindow(title: string, p_open: ImGui.ImAccess<boolean> | null = null): void {
        ImGui.Begin(title, p_open, ImGui.WindowFlags.AlwaysAutoResize);
        const gamepads: Gamepad[] = typeof(navigator) !== "undefined" && typeof(navigator.getGamepads) === "function" ? navigator.getGamepads() : [];
        if (gamepads.length > 0) {
            for (let i = 0; i < gamepads.length; ++i) {
                const gamepad: Gamepad = gamepads[i];
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

    let show_gamepad_window: boolean = false;

    // Main loop
    let done: boolean = false;
    function _loop(time: number): void {
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

            ImGui.Text("Hello, world!");                           // Display some text (you can use a format string too)
            ImGui.SliderFloat("float", (value = f) => f = value, 0.0, 1.0);            // Edit 1 float using a slider from 0.0f to 1.0f    
            ImGui.ColorEdit3("clear color", clear_color); // Edit 3 floats representing a color

            ImGui.Checkbox("Demo Window", (value = show_demo_window) => show_demo_window = value);      // Edit bools storing our windows open/close state
            ImGui.Checkbox("Another Window", (value = show_another_window) => show_another_window = value);

            if (ImGui.Button("Button"))                            // Buttons return true when clicked (NB: most widgets return true when edited/activated)
                counter++;
            ImGui.SameLine();
            ImGui.Text(`counter = ${counter}`);

            ImGui.Text(`Application average ${(1000.0 / ImGui.GetIO().Framerate).toFixed(3)} ms/frame (${ImGui.GetIO().Framerate.toFixed(1)} FPS)`);

            ImGui.Checkbox("Memory Editor", (value = memory_editor.Open) => memory_editor.Open = value);
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
            ImGui.Checkbox("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window= value);
            if (show_sandbox_window)
                ShowSandboxWindow("Sandbox Window", (value = show_sandbox_window) => show_sandbox_window = value);
            ImGui.Checkbox("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window= value);
            if (show_gamepad_window)
                ShowGamepadWindow("Gamepad Window", (value = show_gamepad_window) => show_gamepad_window = value);
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
        ImGui.DestroyContext();
    }

    if (typeof(window) !== "undefined") {
        window.requestAnimationFrame(_loop);
    } else {
        _loop(1.0 / 60.0);
        _done();
    }
}
