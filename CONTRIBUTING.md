# Contributing

## Setup for creating pull requests
- Fork this project
- In your fork, create a branch, for example: `fix/camera-update`
- Add your changes
- Run `yarn generate` to update the autogenerated code
- Test changes in example app
- Push and open a PR with your branch

## Example app
The recommended way to develop is building the example app. Example app links in `@rnmapbox/maps` from parent directory. JavaScript changes for example in `src/components/MapView.tsx`, will be applied automatically.
Some notes about example app:
- example app are both for demonstrating how to use differenc components, so examples should be simple (and not all of them should be typescript)
- example app can contains screens designed from through testing of a component, but it should be separate for simple components demonstrating the use of components

### Example app configurations:

- V11: this build with V11 of mapbox 
  To build example in this mode on ios run:
  ```
  cd example/ios ; RNMBX11=1 pod update MapboxMaps
  ```
  To build example in this mode on android:
  Change `RNMBX11=true` in `example/android/gradle.properties`
- NewArchitecture/Fabric:
  ```
  cd example/ios ; RCT_NEW_ARCH_ENABLED=1 pod update MapboxMaps
  ```
  On android change `newArchEnabled=true` in `example/android/gradle.properties`

### Running example app for Web

```
npx expo start -c --web
```


## Best practices for PRs
- If you plan to work on a bigger feature, please open a discussion, to discuss the best way to address it
- If you add a feature, make sure you add it to the documentation
- Use meaningful commit messages, use semantic commit messages
- If you add a new feature make sure to add a scene in `/example` for others to see/ test it

## Generated code/documentation

Run `yarn generate` to update generated code/documentation.

We use the following code generators, but check yarn generate for more:
- `style-spec/v8.json` download from mapbox.com describes properties of layers/sources etc. We generate the following files from it:
  - `MapboxStyles.d.ts` - typescript definitions for different Layer styles
  - `RNMBXStyle.swift.ejs`/`RNMBXStyleFactoryV10.kt` - ios/android native style setters
  - `docs.json` is generated both from style-spec and documentation in our typescript files
- Document generation:
  - `docs/MapView.md` is generated from `src/components/MapView.tsx` with `react-docgen` 
  - `docs/examples.json` is generated from `example/src/examples/*`
- Codepart generation:
  Code between comments:
    ```
    // @{codepart-replace-start(LayerManagerCommonProps.codepart-kt.ejs,{layerType:"RNMBXCircleLayer"})}
    ...
    // @{codepart-replace-end}
    ```
  are generated. So instead of editing the code between the comments you need to edit the `codepart-*` file and run
  `yarn generate` again
- `android/src/main/old-arch/` is java code generated by react-native codegen from `src/specs`

Also new architecture `codegen` by `react-native` generates a bunch of code from `src/specs`
  
### Documentation generation

Documentation is generated from code blocks and comments.  It will be auto-generated when you commit changes.  
If any changes are generated from your edits, the changed files will need to be added using `git add` before attempting the commit again.  
To manually generate the changes, run `yarn generate`.  

Notice, that changing the documentation in the individual <COMPONENT>.md within `/docs` will not suffice.  
The correct way is the above described

### Document site generation

The full documentation generation process looks like this:

`<doc-site>` is https://github.com/rnmapbox/maps-docs repo

1.) `docs/docs.json` generated by `scripts/autogenerate.mjs`

  The source is `style-spec/v8.json` and documentation at `src/*.ts`

  This step runs by `yarn generate` and checked if up-todate by CI.

2.) `docs/examples.json`  generated by `jest __tests__/dumpExamplesJson.ts`.

  ```
  cd example
  npx jest __tests__/dumpExamplesJson.ts
  ```

  This step runs by `yarn generate` and checked if up-todate by CI.

3.) `<doc-site>/screenhsots`. Grab screenshots from examples (needs `docs/examples.json`)

  We use detox tests to capture screenshots of examples
  ```
  cd example
  yarn detox build --configuration ios.debug
  yarn detox test --configuration ios.debug ./e2e/docScreenshots.e2e.js
  ```

  This step is run manually for now

4.) `<doc-site>/docs/components` Generate component/api documentation (into the docosaurus site)

  ```
  node scripts/doc-generate.mjs
  ```

  Runs when `main` is changed by `update-docs` gh action workflow

5.) `<doc-site>/docs/exmaples` Generate example docs (into the docosaurus site)

  ```
  bun scripts/example-docs.ts
  ```

  Runs when `main` is changed by `update-docs` gh action workflow

6.) publish doc site

  Runs automatically by workflow on the `<doc-site>`

  ```
  cd <doc-site>
  GIT_USER=mfazekas yarn deploy
  ```



