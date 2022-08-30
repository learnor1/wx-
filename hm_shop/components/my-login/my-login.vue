<template>
	<view class="login_container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn_login" @click="getUserProfile">一键登录</button>
		<text class="tips_text">登陆后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('user',['redirectInfo'])
		},
		methods:{
			...mapMutations('user',['updateToken','updateRedirectiveInfo']),
			getUserProfile() {
				uni.showModal({	
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success:(res)=> {
						console.log(0);
						console.log(res);		//如果用户点击了确定按钮		
						if (res.confirm) {
							uni.getUserProfile({
								desc: '获取你的昵称、头像、地区及性别',	
								success: res => {
									console.log(res);
									console.log(1);
									uni.setStorageSync('userinfo',JSON.stringify(res.userInfo))
									let tok = '12345678';
									this.updateToken(tok)
									uni.$showMsg('登陆成功')
									this.navigeteBack()
								},
								fail: res => {
								console.log(2);
								console.log(res)					//拒绝授权					
								uni.showToast({
									title: '您拒绝了请求不能正常使用小程序',
									icon: 'error',
									duration: 2000,
								});
								return;
						}
					});
				}
				else if (res.cancel) {			//如果用户点击了取消按钮			
				console.log(3);
				uni.showToast({
					title: '您拒绝了请求不能正常使用小程序',
					icon: 'error',
					duration: 2000,
				});
				return;
				}
				}});
			},
			navigeteBack(){
				if(this.redirectInfo && this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: () => {
							this.updateRedirectiveInfo(null)
						}
					})
				}
			}
			// async getToken(info){
			// 	//获取code值
			// 	const [err,res]=await uni.login().catch(err=>err)
			// 	if(err||res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')
			// 	//准备参数
			// 	// const query={
			// 	// 	code:res.code,
			// 	// 	encryptedData:info.encryptedData,
			// 	// 	iv:info.iv,
			// 	// 	signature:info.signature,
			// 	// 	rawData:info.rawData
			// 	// }
			// 	// const {data:loginResult}=await uni.$http.post('/users/wxlogin',query)
				
			// }
		 }
	}
</script>

<style lang="scss">
.login_container{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn_login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #C00000;
	}
	.tips_text{
		font-size: 12px;
		color: gray;
	}
}
</style>