# Introduction:

This is a project that is focus on controling the query params of your webpage "?stuff=stuff&othersuff=true",
in the best way possible, this package can change and handle change event without reloading the page.


# How to install:

## Using npm:

-in your command promp type:
```cmd
npm install param-handler
```

# How to use:

## using nodejs:

```js
// import it from npm
const {paramsHandler} = require("param-handler");
let ph = paramsHandler()

// example
ph.set("page","main")
ph.get("page")
ph.exists("page") // return true or false
ph.on("change", (newsearch)=>{ //  whenever location search changes
    console.log(`location search has changed to ${newpage}`)
})
ph.on("change", "page", (newpage)=>{ // whenever a specific param changes
    console.log(`page has changed to ${newpage}`)
})
```
