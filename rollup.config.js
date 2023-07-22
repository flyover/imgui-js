import alias from "@rollup/plugin-alias";
import commonjs from '@rollup/plugin-commonjs';
import builtins from "rollup-plugin-node-builtins";
import typescript from "rollup-plugin-typescript2";

const tsconfigOverride = {
  compilerOptions: {
    target: "ES2015",
    module: "ES2015",
    declaration: false,
  }
};

export default [
  {
    input: "src/imgui.ts",
    output: {
      file: "dist/imgui.esm.js",
      name: "ImGui",
      format: "es",
      exports: "named",
    },
    plugins: [
      alias({
        entries: [
          { find: 'bind-imgui', replacement: './build/bind-imgui.js' },
        ]
      }),
      typescript({
        clean: true,
        tsconfigOverride,
      }),
      commonjs(),
      builtins(),
    ]
  },
  {
    input: "example/src/imgui_impl.ts",
    output: {
      file: "dist/imgui_impl.esm.js",
      name: "ImGui_Impl",
      format: "es",
      exports: "named",
      globals: { "imgui-js": "ImGui" },
    },
    external: [ "imgui-js" ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: "example/tsconfig.json",
        tsconfigOverride,
      }),
    ]
  },
  {
    input: "example/src/imgui_demo.ts",
    output: {
      file: "dist/imgui_demo.esm.js",
      name: "ImGui_Demo",
      format: "es",
      exports: "named",
      globals: { "imgui-js": "ImGui" },
    },
    external: [ "imgui-js" ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: "example/tsconfig.json",
        tsconfigOverride,
      }),
    ]
  },
  {
    input: "example/src/imgui_memory_editor.ts",
    output: {
      file: "dist/imgui_memory_editor.esm.js",
      name: "ImGui_Memory_Editor",
      format: "es",
      exports: "named",
      globals: { "imgui-js": "ImGui" },
    },
    external: [ "imgui-js" ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: "example/tsconfig.json",
        tsconfigOverride,
      }),
    ]
  },
];
