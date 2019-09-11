import commonjs from 'rollup-plugin-commonjs';
import builtins from "rollup-plugin-node-builtins";
import typescript from "rollup-plugin-typescript2";

const plugins = [
  typescript({
    clean: true,
    tsconfigOverride: {
      compilerOptions: {
        target: "ES2015",
        module: "ES2015"
      }
    }
  }),
  commonjs({
    namedExports: {
      "bind-imgui.js": [ "bind" ]
    }
  }),
  builtins(),
];

export default [
  {
    input: "imgui.ts",
    output: {
      file: "dist/imgui.umd.js",
      name: "ImGui",
      format: "umd",
      exports: "named"
    },
    plugins: plugins
  },
  {
    input: "imgui_demo.ts",
    output: {
      file: "dist/imgui_demo.umd.js",
      name: "ImGui_Demo",
      format: "umd",
      exports: "named"
    },
    plugins: plugins
  },
  {
    input: "example/imgui_impl.ts",
    output: {
      file: "dist/imgui_impl.umd.js",
      name: "ImGui_Impl",
      format: "umd",
      exports: "named"
    },
    plugins: plugins
  }
];
