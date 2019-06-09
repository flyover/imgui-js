# [imgui-js](https://github.com/flyover/imgui-js)
JavaScript bindings for [Dear ImGui](https://github.com/ocornut/imgui) using [Emscripten](https://github.com/kripken/emscripten) and [TypeScript](https://github.com/Microsoft/TypeScript)

## Example
[ImGui JavaScript+WebGL example](https://flyover.github.io/imgui-js/example/)

The original Dear ImGui demo code from [imgui_demo.cpp](imgui/imgui_demo.cpp) has been ported to [imgui_demo.ts](imgui_demo.ts).  Also, the Memory Editor from the [imgui_club](https://github.com/ocornut/imgui_club) project ([imgui_memory_editor.h](https://github.com/ocornut/imgui_club/blob/master/imgui_memory_editor/imgui_memory_editor.h)) has been ported to [imgui_memory_editor.ts](imgui_memory_editor.ts) and added to the demo for browsing the Emscripten memory space.

[ImGui JavaScript Sandbox](https://codepen.io/flyovergames/pen/xYPBaj)

A [CodePen](https://codepen.io) using the [Ace](https://ace.c9.io) editor to live-edit a window.

[ImGui JavaScript+Three.js example](https://codepen.io/flyovergames/pen/ejXjXj)

A [CodePen](https://codepen.io) using Dear ImGui with [Three.js](https://threejs.org).

## Support
If you find this useful, please consider donating to this and the [Dear ImGui](https://github.com/ocornut/imgui) project.  I can also invoice for private support, custom development, etc.

[![PayPal donate button](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=H9KUEZTZHHTXQ&lc=US&item_name=imgui-js&currency_code=USD&bn=PP-DonationsBF:btn_donate_SM.gif:NonHosted "Donate to this project using Paypal")

## Notes
All functions in the C++ ImGui namespace are exported at the top level of the module.
```typescript
import * as ImGui from "imgui-js";
```
Individual exports can be imported as well.
```typescript
import { ImVec2 } from "imgui-js";
```

In general, functions that take an address of a variable in C++ have been changed to take an access function in JavaScript.  Calling the access function with no arguments returns the variable, calling with a value sets the variable.

```typescript
type ImAccess<T> = (value?: T) => T;

let show: boolean = true;

const _show: ImAccess<boolean> = (_: boolean = show): boolean => show = _;

// get the value of show
console.log(_show()); // true

// set the value of show to false (also returns the updated value)
console.log(_show(false)); // false
```

In the following example, the address of `show` in the C++ code has been replaced with an inline arrow access function.

```c++
#include "imgui.h"
bool show = true;
void draw() {
    if (ImGui::Button("Toggle")) { show = !show; }
    if (show) {
        ImGui::Begin("My Window", &show, ImGuiWindowFlags_AlwaysAutoResize));
        ImGui::Text("Hello, World!");
        ImGui::End();
    }
}
```

```typescript
import * as ImGui from "imgui-js";
let show: boolean = true;
function draw(): void {
    if (ImGui.Button("Toggle")) { show = !show; }
    if (show) {
        ImGui.Begin("My Window", (_ = show) => show = _, ImGui.WindowFlags.AlwaysAutoResize));
        ImGui.Text("Hello, World!");
        ImGui.End();
    }
}
```

Enumerations that begin with ImGui* are also exported with ImGui removed.  So the following examples are equivalent.
```typescript
import * as ImGui from "imgui-js";
const flags: ImGui.WindowFlags = ImGui.WindowFlags.AlwaysAutoResize;
```
```typescript
import { ImGuiWindowFlags } from "imgui-js";
const flags: ImGuiWindowFlags = ImGuiWindowFlags.AlwaysAutoResize;
```

In order to minimize size of the output, the C++ library has been compiled with `IMGUI_DISABLE_OBSOLETE_FUNCTIONS` and `IMGUI_DISABLE_DEMO_WINDOWS`.

## Building
* git clone git@github.com:flyover/imgui-js.git
* cd imgui-js
* git submodule update --init --recursive
* download and install [Emscripten](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)
* npm install
* make
* make start-example-html

## TODO
* file I/O, imgui.ini, loading external fonts
* implement ImGuiTextFilter (add support for JavaScript RegExp's)
* implement ImGuiTextBuffer (simplify to array of strings)
* fill in remainder of any missing API
* automate the Emscripten install and environment setup in npm install

## License
imgui-js is licensed under the MIT License, see [LICENSE](LICENSE.txt) for more information.
