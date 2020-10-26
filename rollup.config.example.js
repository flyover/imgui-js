import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import typescript from "rollup-plugin-typescript2";

const plugins = [
  typescript({
    tsconfig: "./example/tsconfig.json",
    tsconfigOverride: {
      compilerOptions: {
        target: "ES2015",
        module: "ES2015",
      },
    },
  }),
  commonjs(),
  builtins(),
];

export default [
  {
    input: "./example/main.ts",
    output: {
      file: "./example/main.js",
      format: "cjs",
    },
    plugins: plugins,
  },
];
