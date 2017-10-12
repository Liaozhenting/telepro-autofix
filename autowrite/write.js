let fs = require('fs');
let walk = require('walk');
let path = require('path')

let mkdirs = require('./tools/mkdirs.js')
// mkdir('./dist/test/')
//参数
let sourcePath,
  fileList = [],
  localURL;

localURL = 'http://www.chinajey.com';
sourcePath = '../chinajey';

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

let dealContent = async function () {
  if (fileList.length == 0) {
    resolve();
    return;
  }


  let createFiles = function () {
    return new Promise(function (resolve, reject) {
      try {
        let html = fs.readFileSync(fileList.shift(), "utf-8");
        // let html = fs.readFileSync(fileItem, "utf-8");

        let reg = new RegExp('\\s+(href|src)=\"\\S+\"\\s+tppabs=\"\\S+\"\\s*', 'g');
        let resArray = html.match(reg)

        let localFileExistReg = new RegExp(localURL);
        let illegalStrReg = new RegExp('[\\{\\}]')
        let fileAddressReg = new RegExp('(href|src)=\"(\\S+)\"');
        let dirAddressReg = new RegExp('tppabs=\"' + localURL + '\\/(\\S+)\"');


        let writeObj = function () {
          let ele = resArray.shift();
          if (localFileExistReg.test(ele) && !illegalStrReg.test(ele)) {
            let dirAddressRes = ele.match(dirAddressReg);
            // console.log(ele.match(dirAddressReg))
            if(!dirAddressRes || dirAddressRes.length<2){
              writeObj();
              return;
            }
            let dirStr = dirAddressRes[1];
            mkdirs(path.join('./dist/' , dirStr));
            if (!fs.existsSync(path.join('./dist/' , dirStr))) {
              mkdirs(path.join('./dist/' , dirStr));
            }
            if (localFileExistReg.test(ele)) {
              let dirStr =dirAddressRes[1];
              let address = ele.match(fileAddressReg)[2];
              try{
                let source = fs.readFileSync(path.join(root, address));
                fs.writeFileSync(path.join(__dirname, './dist', dirStr), source);
              }
              catch(e){
                console.log(e)
              }
            }            
          }
          else {
            console.log('未包括: ' + ele)
          }
          if (resArray.length > 0) {
            writeObj();
          }
        }
        writeObj();
        resolve();

      }
      catch (e) {
        console.log(e)
        reject();
      }

    })

  }
  let main = async function () {
    await createFiles();
    if (fileList.length !== 0) {
      main();
    }
  }
  main();

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
    await getFileList(root);
    dealContent(fileList);
    await getFileList(path.join(__dirname,'./dist'));
    noTppabs(fileList);
  }catch(e){
    console.log(e)
  }
}

_main();