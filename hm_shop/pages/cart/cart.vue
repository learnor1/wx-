<template>
	<view class="cart_container" v-if="cart.length!==0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart_title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart_title_text">购物车</text>
		</view>
		
		<!-- 循环渲染商品信息 -->
		<uni-swipe-action> <!--左滑出现删除-->
			<block v-for="(goods,i) in cart" :key="i">
			<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
				<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change='radioChangehandler' @num-change="numberChangeHandler"></my-goods>
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	<view class="empty_cart" v-else>
		<image src="../../static/cart_empty@2x.png" mode="aspectFit" class="empty_img"></image>
		<text class="tip_text">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState,mapMutations} from "vuex"
	export default{
		mixins:[badgeMix],
		computed:{
			...mapState('cart',['cart'])
		},
		methods:{
			...mapMutations('cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangehandler(e){
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		},
		data(){
			return{
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
			}
		}
	}
</script>

<style lang="scss">
	.cart_title{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		.cart_title_text{
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.cart_container{
		padding-bottom: 50px;
	}
	.empty_cart{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		.empty_img{
			width: 90px;
			height: 90px;
		}
		.tip_text{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>