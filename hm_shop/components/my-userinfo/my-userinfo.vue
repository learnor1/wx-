<template>
	<view>
		<view class="my_userinfo_container">
			<!-- 头像和昵称 -->
			<view class="top_box">
				<image :src="userinfo.avatarUrl" class="avatar"></image>
				<view class="nickname">
					{{userinfo.nickName}}
				</view>
			</view>
			<!-- 面板区域 -->
			<view class="panel_list">
				<!-- 面板1 -->
				<view class="panel">
					<view class="panel_body">
						<view class="panel_item">
							<text>8</text>
							<text>收藏的店铺</text>
						</view>
						<view class="panel_item">
							<text>14</text>
							<text>收藏的商品</text>
						</view>
						<view class="panel_item">
							<text>18</text>
							<text>关注的商品</text>
						</view>
						<view class="panel_item">
							<text>84</text>
							<text>足迹</text>
						</view>
					</view>
				</view>
				<!-- 面板2 -->
				<view class="panel">
					<view class="panel_title">
						
					</view>
					<view class="panel_body">
						<view class="panel_item">
							<image src="../../static/my-icons/icon1.png" class="icon"></image>
							<text>待付款</text>
						</view>
						<view class="panel_item">
							<image src="../../static/my-icons/icon2.png" class="icon"></image>
							<text>待收货</text>
						</view>
						<view class="panel_item">
							<image src="../../static/my-icons/icon3.png" class="icon"></image>
							<text>退款/退货</text>
						</view>
						<view class="panel_item">
							<image src="../../static/my-icons/icon4.png" class="icon"></image>
							<text>全部订单</text>
						</view>
					</view>
				</view>
				<!-- 面板3 -->
				<view class="panel">
					<view class="panel_list_item">
						<text>收货地址</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="panel_list_item">
						<text>联系客服</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					<view class="panel_list_item" @click="logout">
						<text>退出登陆</text>
						<uni-icons type="arrowright" size="15"></uni-icons>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			userinfo(){
				return JSON.parse(uni.getStorageSync('userinfo')||'{}')
			}
		},
		methods:{
			...mapMutations('user',['updateToken']),
			 async logout(){
				const [err,succ]=await uni.showModal({
					title:'提示',
					content:'确认退出吗？'
				}).catch(err=>err)
				if(succ&&succ.confirm){
					uni.removeStorageSync('userinfo')
					uni.removeStorageSync('address')
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
.my_userinfo_container{
	height: 100%;
	background-color: #f4f4f4;
	.top_box{
		height: 400rpx;
		background-color: #C00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
}
.panel_list{
	padding: 0 10px;
	position: relative;
	top: -10px;
	.panel{
		background-color: white;
		border-radius: 3px;
		margin-bottom: 8px;
		.panel_title{
			line-height: 45px;
			padding-left: 10px;
			font-size: 15px;
			border-bottom: 1px solid #f4f4f4;
		}
		.panel_body{
			display: flex;
			justify-content: space-around;
			.panel_item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				padding: 10px 0;
				font-size: 13px;
					
				.icon{
					width: 35px;
					height: 35px;
				}
			}
		}
	}
}
.panel_list_item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	padding: 0 10px;
	line-height: 45px;
}
</style>