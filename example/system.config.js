SystemJS.config({
    map: {
        "bind-imgui": "../build/bind-imgui.js",
        "imgui-js": "../build",
        "main": "build/main.js",
    },
    packages: {
        "imgui-js": { main: "imgui.js", }
    }
});
