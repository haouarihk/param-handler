let {JSDOM} = require("jsdom")
const l = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`,{url:"https://www.google.com/"});
const window = l.window
let { paramsHandler } = require("./lib/index")



let ph = paramsHandler(window,l)

ph.on("change","page",(a)=>{
    console.log("event works!!",a)
})

console.log("3-", ph.readOnlyParams)
ph.set("page", "main")
console.log("3-", ph.readOnlyParams)
console.log("1-",ph.exists("page")) // return true or false
console.log("2-",ph.get("page")) // returns "main"
console.log("3-",ph.readOnlyParams) // returns {page:"main"}

