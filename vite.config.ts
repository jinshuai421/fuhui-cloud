import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuejsx from "@vitejs/plugin-vue-jsx";
import styleImport from "vite-plugin-style-import";
import path from "path/posix";
import viteSvg from "vite-plugin-svg-icons";
import visualizer from "rollup-plugin-visualizer";
import legacy from "@vitejs/plugin-legacy";
const plugins = [] as any;

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === "production") {
  // 打包依赖展示
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  );
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  build: {
    outDir: "fuhui-cloud",
  },
  base: "./",
  experimental: {} as any,
  server: {
    host: "0.0.0.0",
    port: 80,
    // port: 3000,
    proxy: {
      "/api": {
        target: "http://10.10.30.74/",
        // target: 'http://10.10.40.29:40070/a/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    ...plugins,
    vue(),
    vuejsx({ enableObjectSlots: true }),
    viteSvg({
      iconDirs: [path.resolve(process.cwd(), "./src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    styleImport({
      libs: [
        {
          // libraryName: 'ant-design-vue',
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => {
            return `../es/${name}/style`;
          },
        },
      ],
    }),
    legacy({
      targets: ["chrome 52"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      modernPolyfills: true,
      polyfills: true,
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[path]_[local]_[hash:base64:5]",
      hashPrefix: "prefix",
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "src/theme/variable.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
} as any);
