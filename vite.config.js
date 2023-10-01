import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

// * https://vitejs.dev/config/ -- 04/04/2023 JH

// * https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js -- 09/22/2023 MF
dotenv.config();

// * The port 5173 is the Vite default port. -- 09/28/2023 MF
// * If the port is already being used, Vite will automatically try the next available port so this may not be the actual port the server ends up listening on. (https://vitejs.dev/config/preview-options.html#preview-port) -- 09/28/2023 MF
let applicationPort = 5173;

if (process.env.PORT !== null && process.env.PORT !== undefined && process.env.PORT !== "") {

  applicationPort = process.env.PORT;

};

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    port: applicationPort
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          }
        }
      ]
    }
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "./index.html"
      },
      output: {
        entryFileNames: 'static/[name].[hash].js',
        assetFileNames: `static/[name].[hash].[ext]`,
      }
    }
  }
});
