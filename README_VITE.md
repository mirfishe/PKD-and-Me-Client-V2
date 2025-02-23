# Using Vite

# Starting the Application

- Clone this repo.
- Run `npm install`.
- To start running in development, run `npm run dev` or `npm start`.
  - The localhost url (http://localhost:5173 by default) will be shown in the terminal if it was started successfully.
- To build the project for production, run `npm run build`.
- You can also preview the build afterwards by running `npm run preview`. This starts a server and points to the build's index file.


# Notable Differences Between Vite and CRA

- First notable change is that the index.html file is placed in the root instead of the public folder.
  - In the index.html file, `<script type="module" src="/src/index.js"></script>` is added at the end of the `<body>` section. The `type="module"` is what allows Vite to serve the source code over native ESM rather than bundling it beforehand. 
- In any js file, any requires at the top of the page should be changed to imports. (Another way of putting it is changing Common JS files to ES Module files?)
- This link has good explanations of other differences, such as why starting the server is faster in Vite, etc.: https://vitejs.dev/guide/why.html


## vite.config.js

`base: "./"`
- Equivalent of setting "homepage": "." in package.json
- Setting can be removed in package.json because it doesn't work, so you have to set the base.

`plugins: [react()]`
- Can use react, vue, etc.

`server`
- `server.port`
  - Can define any port here. If port isn't available, vite will automatically use the next port number.
- `server.strictPort`
  - Set to true if you don't want vite to automatically use the next available port

`esbuild and optimizeDeps`
- Vite requires JSX files to use the .jsx extension. These settings are a workaround to get vite to recognize .js files as JSX. Vite recommends changing the extension rather than using this workaround.

`css.postcss`
- Can set up postcss plugins here rather than in a separate postcss.config file.
- Import the postcss plugins at the top of the page.
- Also do not need to add any logic for how to compile the postcss files, vite automatically handles this.

`build`
- `outDir` 
  - Change the directory build is placed in. By default, running `npm run build` places the build in a "dist" folder. 
- `emptyOutDir`
  - Whether to empty the build folder or not before placing the new build in.
- `rollupOptions`
  - Vite uses rollup as its bundler, so this is for passing in any other rollup settings.
  - `input.index`: Set the build entry point
  - `output.entryFileNames`, `output.assetFileNames`: Set where to place js/asset files in the build. Can add with/without a hash.


## Differences in Build

This will repeat some of the same information mentioned above.

By default, Vite structures the build like this:
```
├── dist/
|   ├── assets/
|   |   ├── index.[hash].js
|   |   ├── index.[hash].css
|   |   ├── any assets from src/
|   |   ├── anything else in public/assets
|   ├── json/
|   |   ├── this folder is here because it's placed in the public folder
├── favicon.ico
├── index.html
```

Rather than trying to rewrite the trimBuild script, I tried to replicate the same file structure used by CRA, but couldn't figure out how to replicate it completely. Here's what I ended up with:
```
├── build/
|   ├── assets/
|   |   ├── anything in public/assets
|   ├── json/
|   |   ├── anything in public/json
|   |   static/
|   |   ├── index.[hash].js
|   |   ├── index.[hash].css
|   |   ├── any assets from src/
├── favicon.ico
├── index.html
```
The only real difference is that the static folder was divided into more subfolders (css, js, and media).


## env Variables

There are some differences in how env variables are used between vite and create-react-app. https://vitejs.dev/guide/env-and-mode.html

| Create-React-App                         | Vite |
| ---------------------------------------- | ---- |
| `process.env`                            | `import.meta.env` |
| `process.env.NODE_ENV === "development"` | `import.meta.env.MODE === "development"` |
| Variables must start with `REACT_APP_`   | Variables must start with `VITE_` |



## Resources

<a href="https://vitejs.dev/guide/#index-html-and-project-root" target="_blank" rel="noopener noreferrer nofollow">index.html and Project Root</a>

<a href="https://vitejs.dev/guide/env-and-mode.html" target="_blank" rel="noopener noreferrer nofollow">Env Variables and Modes</a>

