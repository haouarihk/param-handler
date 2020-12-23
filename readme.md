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

## using browser:

```js

// example
let { JSDOM } = require("jsdom")
const {window} = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: "https://www.google.com/" });
let { paramsHandler } = require("./lib/index")



let ph = paramsHandler(window)

ph.on("change", "page", (a) => {
    console.log(`PAGE HAS CHANGED To ${a.get("page")}`) // get trigged when page changes
})

ph.on("change", (a) => {
    console.log(`location search HAS CHANGED To ${a.readOnlyParams}`) // get trigged when page changes
})
console.log("readOnlyParams-", ph.readOnlyParams) // returns {}
ph.set("page", "main") // return void
ph.set("page", "last") // return void
console.log("readOnlyParams-", ph.readOnlyParams) // returns {page:"main"}
console.log("page exists-", ph.exists("page")) // return true or false
console.log("get page-", ph.get("page")) // returns "main"
console.log("readOnlyParams-", ph.readOnlyParams) // returns {page:"main"}
```