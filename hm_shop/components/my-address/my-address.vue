<template>
	<view>
		<!-- 选择收货 -->
		<view class="address_choose_box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址</button>
		</view>
		<!-- 收货信息 -->
		<view class="address_info_box" v-else @click="chooseAddress()">
			<view class="row1">
				<view class="row1_left">
					<view class="username">收货人：{{address.userName}}</view>
				</view>
				<view class="row1_right">
					<view class="phone">电话:{{address.telNumber}}</view>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2_left">收货地址：</view>
				<view class="row2_right">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部的边框线 -->
		<image src="/static/cart_border@2x.png" class="address_border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			}
		},
		methods:{
			...mapMutations('user',['updateAddress']),
			 async chooseAddress() {
			    const [err, succ] = await uni.chooseAddress().catch(err => err)
				console.log(err,succ);
			    if (err === null && succ.errMsg === 'chooseAddress:ok') {
			      this.updateAddress(succ)
			    }
				if(err && (err.Msg === 'chooseAddress:fail auth deny'||err.Msg === 'chooseAddress:fail authorize no response')){
					console.log('需要重新授权');
					this.reAuth()
			    }
			},
			async reAuth(){
				const [err2,confirmResult]=await uni.showModal({
					content:"检测到您没打开地址权限，是否去设置打开",
					confirmText:'确认',
					cancelText:'取消'
				})
				if(err2)return
				if(confirmResult.cancel)return uni.$showMsg('您取消了授权')
				if(confirmResult.confirm)return uni.openSetting({
					success:(settingResult)=>{
						if(settingResult.authSetting['scop.address']) return uni.$showMsg('您取消了授权！')
						if(settingResult.authSetting['scop.address']) return uni.$showMsg('授权成功！')
					}
				})
			}
		},
		computed:{
			...mapState('user',['address']),
			...mapGetters('user',['addstr'])
		},
}
</script>

<style lang="scss">
.address_border{
	width: 100%;
	height: 5px;
}

.address_choose_box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address_info_box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1_left{
			.username{}
		}
		.row1_right{
			display: flex;
			justify-content: space-between;
			.phone{}
		}
	}
	.row2{
		display: flex;
		align-items: center;
		margin-top: 10px;
		.row2_left{
			white-space: nowrap;
		}
		.row2_right{}
	}
}
</style>