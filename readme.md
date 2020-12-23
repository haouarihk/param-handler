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



# The point of this project?

-it also allows you to change it without reloading the page. useful for virtual doms like (react, svelte, angular .. etc).

-it has callback when each variable changes (you have to use the same package for it to work).

-made with typescript!.

-it can return an object with these variable instead of a boaring string, for example: "?a=5&b=dad" => {a:5,b:"dad"}



# How can i use this?

## How can i test it:

Its easy, you will need jsdom if you don't have a dom(plain nodejs),

first of all you need to import the package:

```js
let { paramsHandler } = require("param-handler")
let ph = paramsHandler(window) // pass the window from the virtual dom
```

Then you can start using it!

## How can i update a specific variable in the query search location:

Well its easy.

You can just use 

```js
ph.set("name_of_the_variable", "the_new_value")
```

## How can i read a specific variable from the query search location:

You have two choises:

### 1- keep track of the change and read its data:

```js
ph.on("change", "name_of_the_variable", (new_value)=>{
    console.log(`name_of_the_variable has changed to ${new_value}!`)
})
```

### 2- Or you can just get the value of that specific variable:

```js
console.log(`name_of_the_variable has the value of ${ph.get("name_of_the_variable")}`)
```

