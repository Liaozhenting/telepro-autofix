let fs = require('fs');
let walk = require('walk');
let path = require('path')

let mkdirs = require('./tools/mkdirs.js')
// mkdir('./dist/test/')
//参数
let sourcePath,
  fileList = [],
  localURL;

localURL = 'http://www.chixm.com';
sourcePath = '../src/';

//需要处理的文件目录
let root = path.join(__dirname, sourcePath);


let getFileList = function (workpath) {
  return new Promise(function (resolve, reject) {
    try {
      let reg = new RegExp('\.html');
      walker = walk.walk(workpath, { followLinks: false });
      walker.on('file', function (roots, stat, next) {
        if (reg.test(stat.name)) {
          fileList.push(path.join(roots, stat.name))
        }
        next()
      })

      walker.on('end', function () {
        resolve();
      })
    } catch (e) {
      console.log(e)
      reject()
    }

  })

}



let noTppabs = function(fileList){
  if (fileList.length == 0) {
    return;
  }
  let dealStr = function(){
    return new Promise(function(resolve,reject){
      try{
        let file = fileList.shift()
        let html = fs.readFileSync(file, "utf-8");
        let reg = new RegExp('\\s+(href|src)=\"\\S+\"\\s+tppabs=\"http://www.chinajey.com(\\S+)\"\\s*', 'g');
        html = html.replace(reg,' $1=".$2"')
        fs.writeFileSync(file, html);
        resolve();
      }
      catch(e){
        console.log(e)
        reject();
      }
    })
  }
  let main = async function (params) {
    await dealStr();
    if (fileList.length !== 0) {
      main();
    }
  }
  main();
}

//运行过程
let _main = async function(params) {
  try{
    // await getFileList(root);
    // dealContent(fileList);
    await getFileList(path.join(__dirname,'./dist/'));
    noTppabs(fileList);
    console.log(fileList)
  }catch(e){
    console.log(e)
  }
}

_main();