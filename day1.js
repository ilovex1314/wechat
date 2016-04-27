'use strict'

var koa = require('koa');
var xss = require('xss');

var app = new koa();

app.use(function *(){
    var echo = this.query.echo;
    var head = '<!DOCTYPE html><html><head><title>回声机</title></head><body><span style="color:#ff6600; border:1px solid #ddd;">';
    var end = '</span></body></end>';
    
    if(!echo){
        this.body = head + '没有参数' + end;
    }else{
        echo = xss(echo);
        this.body = head + echo + end;
    }
})

app.listen(3000);
console.log('成功启动服务，端口是3000');