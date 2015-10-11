NOTE: Before doing anything you should signup for an account from `https://trakt.tv` and fill up the API information in the JS file.

This directory contains the CSS, JS and a sample HTML file that are needed to mess around with the frontend without having a backend.

The `CSS` files can be used as is -even when deploying- or they can be minified.

The `JavaScript` files should be compiled using `browserify` by running the command `browserify index.js -o min/index.js`. This will
generate an `index.js` file inside the `min` directory out of compiling the `index.js` and `Sortable.min.js` files. The generated file
can then be used as is or minified then used -even when deploying-.

To mess around with the frontend, you can use `beefy` by running the command `beefy index.js --live --index index.html`.
