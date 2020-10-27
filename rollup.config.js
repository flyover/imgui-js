import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/imgui.ts",
    output: {
      file: "dist/imgui.umd.js",
      name: "ImGui",
      format: "umd",
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
        tsconfigOverride: {
          compilerOptions: {
            target: "ES2015",
            module: "ES2015",
            declaration: false,
          }
        }
      }),
    ]
  },
  {
    input: "example/src/imgui_demo.ts",
    output: {
      file: "dist/imgui_demo.umd.js",
      name: "ImGui_Demo",
      format: "umd",
      exports: "named",
      globals: { "imgui-js": "ImGui" },
    },
    external: [ "imgui-js" ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: "example/tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            target: "ES2015",
            module: "ES2015",
            declaration: false,
          }
        }
      }),
    ]
  },
  {
    input: "example/src/imgui_impl.ts",
    output: {
      file: "dist/imgui_impl.umd.js",
      name: "ImGui_Impl",
      format: "umd",
      exports: "named",
      globals: { "imgui-js": "ImGui" },
    },
    external: [ "imgui-js" ],
    plugins: [
      typescript({
        clean: true,
        tsconfig: "example/tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            target: "ES2015",
            module: "ES2015",
            declaration: false,
          }
        }
      }),
    ]
  }
];
