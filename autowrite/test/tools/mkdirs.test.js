let expect = require('chai').expect;
let fs = require('fs');
let mkdirs = require('../../tools/mkdirs.js');

describe('mkdirs',function(){
  it('should mkdir',function(){
    expect(mkdirs).to.be.an('function');
    mkdirs('../tools/lib/');
    expect(fs.existsSync('../tools/lib/')).to.be.equal(true)
  })
})
