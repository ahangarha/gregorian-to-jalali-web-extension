# How to contribute

This project uses `web-ext` as its dev dependency
and it is recommended to run the local `web-ext`.
In most of the cases, the `yarn run COMMAND` should be sufficient.
Check the following list of commands:

| Command | Description |
|-----------------|-------------|
| `start:firefox` | Opens a firefox window to test the extension. |
| `build`         | Bundles the extension in `web-ext-artifact` directory. |
| `build-watch`   | Bundles and watches for changes and rebundles if needed. |
| `eslint`        | Checkes for linting issues |
| `eslint-fix`    | Auto fixes linting issues |
