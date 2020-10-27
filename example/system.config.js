SystemJS.config({
    map: {
        "bind-imgui": "../build/bind-imgui.js",
        "imgui-js": "../build",
    },
    packages: {
        "imgui-js": { main: "imgui.js", }
    }
});
