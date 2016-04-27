'use strict'

var koa = require('koa');
var sha1 = require('sha1');
var config = {
	wechat : {
		appID : 'wx3c64d68e742077f3',
		appSecret : '851ee3876a07203f15a23ebce8233c87',
		token : 'ljh'
	}
}

var app = new koa();

app.use(function *(next){
	console.log(this.query);

	var token = config.wechat.token;
	var signature = this.query.signature;
	var nonce = this.query.nonce;
	var timestamp = this.query.timestamp;
	var echostr = this.query.echostr;

	var str = [token, timestamp, nonce].sort().join('');
	var sha = sha1(str);

	if(sha === signature){
		this.body = echostr + '';
	}else{
		this.body = 'wrong';
	}
})

app.listen(1234);
console.log('listener');