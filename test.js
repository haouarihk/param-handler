let { JSDOM } = require("jsdom")
const {window} = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: "https://www.google.com/" });

let {ParamsHandler, QParamer} = require("./lib/index")


let ph = new QParamer(window)




//let ph = ParamsHandler(window)

ph.on("change", "page", (a) => {
    console.log(`PAGE HAS CHANGED To ${a}`) // get trigged when page changes
})

ph.on("change", (a) => {
    console.log(`location search HAS CHANGED To ${JSON.stringify(a)}`) // get trigged when page changes
})
console.log("readOnlyParams-", ph.params) // returns {}
ph.set("page", "main&kk=3") // return void
ph.set("page", "last") // return void
console.log("readOnlyParams-", ph.params) // returns {page:"main"}
console.log("page exists-", ph.exists("page")) // return true or false
console.log("get page-", ph.get("page")) // returns "main"
console.log("readOnlyParams-", ph.params) // returns {page:"main"}

