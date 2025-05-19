// vite.config.js
export default {
  build: {
    lib: {
      entry: "src/pricing-component.ts",
      formats: ["es"],
      fileName: "pricing-component",
    },
    minify: true,
    outDir: "dist",
  },
};
