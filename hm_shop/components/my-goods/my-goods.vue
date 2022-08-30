<template>
	<view>
		<view class="goods_item" >
		<!-- 左侧的盒子 -->
			<view class="goods_item_left">
				<radio :checked='goods.goods_state' color="#c00000" v-if="showRadio" @click="radioClickhandler"></radio>
				<image :src="goods.goods_small_logo" class="goods_pic"></image>
			</view>
			<!-- 右侧的盒子 -->
			<view class="goods_item_right">
				<view class="goods_name">
					{{goods.goods_name}}
				</view>
				<view class="goods_info_box">
					<view class="goods_price">
						￥{{goods.goods_price | tofixed}}
					</view>
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			radioClickhandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			//监听数量的改变
			numChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods_item{
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods_item_left{
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods_pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
	}
.goods_item_right{
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	.goods_name{
		font-size: 13px
	}
	.goods_info_box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods_price{
			color: #C00000;
		}
	}
}
</style>