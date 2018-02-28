# Vanilla Modern JavaScript

## Rules

1. Not a single line of external source code

1. Use of a maximum of modern API both Node side and browser side

1. Anything is allowed as long as it's in a standard

## Currently using

* Node HTTP/2 natif support

* Full HTTP/2 assets push (the server doesn't even accept request other than `/`)

* JavaScript module in the browser

* Web Components : Custom Elements / HTML Imports / Shadow Dom

* CSS Variables

* CSS Grid (used it for the grid but not possible for the tiles as long as transitions doesn't work)

* Virtual Dom implementation using native HTML parser & diffing directly on real dom

* Redux clone to manage game state

* Logic in a WebWorker, unfortunately without modules as they are not yet supported

## Application

2048 clone. It's fun, doesn't need backend and is rich enough to trigger some real questions
