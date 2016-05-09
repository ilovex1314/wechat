'use strict'

var koa = require('koa');
var wechat = require('./weichat/g');
var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/accessToken.txt');
var config = {
	wechat : {
		appID : 'wx3c64d68e742077f3',
		appSecret : '851ee3876a07203f15a23ebce8233c87',
		token : 'ljh',
		getAccessToken : function(){
			return util.readFileAsync(wechat_file);
		},
		saveAccessToken : function(data){
			var data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file, data);
		}

	}
}

var app = new koa();

app.use(wechat(config.wechat));


app.listen(1234);
console.log('listener');