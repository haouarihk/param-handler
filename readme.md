
# The point of this project?

-it also allows you to change it without reloading the page. useful for virtual doms like (react, svelte, angular .. etc).

-it has callback when each variable changes (you have to use the same package for it to work).

-made with typescript!.

-it can return an object with these variable instead of a boaring string, for example: "?a=5&b=dad" => {a:5,b:"dad"}



# How can i use this?

# How to install:

## Using npm:

-in your command promp type:
```cmd
npm install param-handler
```


## How can i test it:

Its easy, you will need jsdom if you don't have a dom(plain nodejs),

first of all you need to import the package:

```js
let {ParamsHandler} = require("param-handler") 
// or
import {ParamsHandler} from "param-handler"
```

Then

```js
let ph = paramsHandler(window) // pass the window from the virtual dom
```

or if you're into classes

```js
let {QParamer} = require("param-handler") 
// or
import {QParamer} from "param-handler"
```

Then

```js
let ph = new QParamer(window) // pass the window from the virtual dom
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

### 1- keep track of the changes of a specific variable:

```js
ph.on("change", "name_of_the_variable", (new_value)=>{
    console.log(`name_of_the_variable has changed to ${new_value}!`)
})
```
note that you can use the second argument inside the callbackfunction to call "this".

### 2- Or you can just get the value of that specific variable:

```js
console.log(`name_of_the_variable has the value of ${ph.get("name_of_the_variable")}`)
```

## How can i get that fancy object thingy:

```js
console.log(`the fancy object ${ph.params}`)
```

## How can i check if a variable exists:

```js
console.log(`does name_of_the_variable exists?`)

console.log(ph.exists("name_of_the_variable")?"YES":"no :(")

```