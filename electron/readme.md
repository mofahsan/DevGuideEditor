## Generate Electron Build 
   - Go to backend-editor/component-modifier 
   - Generate the build and copy the files to electron folder:
     ```sh
     npx tsc && cp -rf ./dist/. ../../electron
     ```
   - Generate frontend build and copy dist folder to electron with react-build folder name
   - From the electon folder run 
     ```sh
     npm run build
     ```
    The electron executable and installable will be generated at electorn/dist
