import {$http} from "@escook/request-miniprogram"

//配置请求根路径
$http.baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"

//请求开始之前做一些事情
$http.beforRequest = function(options){
	uni.showLoading({
		title:'数据加载中...',
	})
	console.log(options);
	// if(options.url.indexOf('/my/')!==-1){
	// 	options
	// }
}

//请求完成之后做一些事情
$http.afterRequest = function (){
	uni.hideLoading()
}

export default $http