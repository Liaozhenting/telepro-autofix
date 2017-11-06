const fs = require('fs')
const path = require('path')
function mkdirsSync(dirpath, mode) {
  try {
    if (!fs.existsSync(dirpath)) {
      let pathtmp;
      let dirArr = dirpath.split(/[/\\]/)
      for(let i=0;i<dirArr.length-1;i++){
        (function(i){
          if (pathtmp) {
            pathtmp = path.join(pathtmp, dirArr[i]);
          }
          else {
            pathtmp = dirArr[i];
          }
          if (!fs.existsSync(pathtmp)) {
            if (!fs.mkdirSync(pathtmp, mode)) {
              return false;
            }
          }
        })(i)
        
      }
      // forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
        
      // });
    }
    return true;
  } catch (e) {
    throw new Error("create director fail! path=" + dirpath + " errorMsg:" + e);
    return false;
  }
}
//以下用法!!注意最后面的'/'  创建的目录是一样，不会创建文件
//mkdirsSync('./to/lid/');
//mkdirsSync('./to/lid/index.html');
module.exports = mkdirsSync;