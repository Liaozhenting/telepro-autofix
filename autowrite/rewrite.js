const fs = require('fs')

let file = '../src/mes.html'
let html = fs.readFileSync(file, "utf-8");
let reg = new RegExp('\\s+(href|src)=\"\\S+\"\\s+tppabs=\"http://www.chixm.com(\\S+)\"\\s*', 'g');
html = html.replace(reg,' $1=".$2"')
fs.writeFileSync(file, html);