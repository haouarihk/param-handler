let { JSDOM } = require("jsdom")
const l = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: "https://www.google.com/" });
const window = l.window
let { paramsHandler } = require("./lib/index")



let ph = paramsHandler(window, l)

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

