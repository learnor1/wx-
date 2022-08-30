<template>
	<view class="my_settle_container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount_box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn_settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		computed:{
			...mapGetters('cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('user',['addstr']),
			...mapState('user',['token']),
			...mapState('cart',['cart']),
			isFullCheck(){
				return this.total===this.checkedCount
			}
		},
		methods:{
			...mapMutations('cart',['updateAllGoodsState']),
			...mapMutations('user',['updateRedirectiveInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			//用户点击了结算按钮
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				if(!this.token) return this.delayNavigater()
				this.payOrder()
			},
			//创建订单
			async payOrder(){
				const orderInfo={
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map(x=>({
				goods_id:x.goods_id,
				goods_number:x.goods_count,
				goods_price:x.goods_price
					}))
				}
				
				const {data:res}= await uni.$http.post('/my/orders/create',orderInfo)
				console.log(res);
				if(res.meta.status!==200){
					return uni.$showMsg("创建订单失败")
				}
				const orderNumber = res.message.order_number
				console.log(orderNumber);
			},
			//延时导航
			delayNavigater(){
				this.seconds =3
				this.showTips(this.seconds)
					
				this.timer=setInterval(()=>{
					this.seconds--
					if(this.seconds<=0){
						clearInterval(this.timer)
						uni.switchTab({
							url:"/pages/my/my",
							success:()=>{
								this.updateRedirectiveInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			//展示倒计时提示消息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！'+n+'秒后自动跳转到登陆',
					mask:true, //防止点击穿透
					duration:1500
				})
			}
		}
	}
</script>

<style lang="scss">
.my_settle_container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;align-items: center;
	font-size: 14px;
	padding-left: 5px;
	background-color: #fff;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount_box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn_settle{
		background-color: #C00000;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}

</style>