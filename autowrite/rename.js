let fs = require('fs');
let walk = require('walk');
let path = require('path');

let sourcePath = '../src';
//需要处理的文件目录
// let root = path.join(__dirname, sourcePath);
let workpath = path.join(__dirname,sourcePath);

let DealAll = function (workpath) {
  return new Promise(function (resolve, reject) {
    try {
      walker = walk.walk(workpath, { followLinks: false });
      walker.on('file', function (roots, stat, next) {
        Rename(roots,stat.name);
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

let Rename = function(roots,name){
  // let reg = new RegExp('-ver=\\S+\\.\\S+');
  // let newName = name.replace(reg,'');
  let newName = NewName(name,'-v');
  console.log(newName)
  fs.renameSync(path.join(roots,name),path.join(roots,newName), function (err) {
    if (err) {
      throw err;
    } else {
      console.log('done');
    }
  })
}

let NewName = function(old,type){
  let stategy ={
    '-ver':new RegExp('-ver=\\S+\\.\\S+'),
    '-v':new RegExp('-v=\\S+')
  }
  return old.replace(stategy[type],'');
}

let Main =async function(){
  await DealAll (workpath);
}

Main();