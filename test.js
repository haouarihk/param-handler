let { paramsHandler } = require("./lib/index")

let mafia="?nice=blue"

let ph = paramsHandler({
    specialGetter:()=>mafia,
    specialSetter:(nval)=>mafia = nval
})


