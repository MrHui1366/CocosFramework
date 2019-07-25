
var fs = require("fs");
let data = fs.readFileSync("../assets/script/netmsgs/msgs.js",{ encoding: "utf-8" } );

let data1= data.substr(0,165);
let mid = "var $protobuf = protobuf;";
let data2= data.substr(211);

let ret = data1.concat(mid,data2);

fs.writeFileSync("../assets/script/netmsgs/msgs.js",ret);


