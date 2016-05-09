'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
	accessToken_url : prefix + 'token?grant_type=client_credential'
}

function Wechat(ops){
	var that = this;
	this.appID = ops.appID;
	this.appSecret = ops.appSecret;
	this.getAccessToken = ops.getAccessToken;
	this.saveAccessToken = ops.saveAccessToken;

	this.getAccessToken()
		.then(function(data){
			try{
				data = JSON.parse(data);
			}
			catch(e){
				return that.updataAccessToken();	
			}
			if(that.isValidAccessToken(data)){
				return Promise.resolve(data);
			}
			else{
				return that.updataAccessToken();
			}
		})
		.then(function(data){
			that.access_token = data.access_token;
			that.expires_in = data.expires_in;
			that.saveAccessToken(data);
		})
}

Wechat.prototype.isValidAccessToken = function(data){
	if(!data || !data.access_token || !data.expires_in){
		return false;
	}
	
	var expires_in = data.expires_in;
	var now = (new Date().getTime());
	if(now < expires_in){
		return true;
	}
	else{
		return false;
	}
}

Wechat.prototype.updataAccessToken = function(){
	var appID = this.appID;
	var appSecret = this.appSecret;
	var url = api.accessToken_url + '&appid=' + appID + '&secret=' + appSecret;

	return new Promise(function(resolve, reject){
		request({url: url, json: true}).then(function(response){
			// console.log(response.body);
			var data = response.body;
			var now = (new Date().getTime());
			var expires_in = now + (data.expires_in - 20)*1000;

			data.expires_in = expires_in;

			// console.log(data);
			resolve(data);
		})
	})

	
}

module.exports = Wechat;