<template>
	<view>
		<!-- 搜索组件 -->
		<!-- <my-search :bgcolor="'pink'" :radius="30"></my-search> -->
		<my-search @click='gotoSearch()'></my-search>
		
		<view class="scroll_view_container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y :style="{height: wh+'px'}" class="left_scroll_view">
				<view :class="['left_scroll_view_item',i===active?'active':'']"  v-for="(item,i) in categoties" :key="i" @click="activeChanged(i)">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view scroll-y :style="{height: wh+'px'}"class="right_scroll_view" :scroll-top="scrollTop">
				<view class="cate_lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<!-- 二级分类的标题 -->
					<view class="cate_lv2_title">
						/{{item2.cat_name}}/
					</view>
					<!-- 三级分类 -->
					<view class="cate_lv3_list">
						<!-- 三级分类的item项 -->
						<view class="cate_lv3_item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 三级分类的文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default{
		mixins:[badgeMix],
		data(){
			return{
			wh:0,
			categoties:[],
			active:0,
			cateLevel2:[],	//二级分类
			scrollTop:0
			}
		},
		onLoad() {
			const sysInfo= uni.getSystemInfoSync();
			this.wh = sysInfo.windowHeight-50;
			this.getCategoties()
		},
		methods:{
			//获取分类信息
			async getCategoties(){
				const res = await uni.$http.get('/categories')
				if(res.data.meta.status!==200){
					uni.$showMsg()
				}
				this.categoties=res.data.message
				
				//为二级分类赋值
				this.cateLevel2=res.data.message[0].children
			},
			//更改active的值
			activeChanged(i){
				this.active=i;
				//重新为二级分类赋值
				this.cateLevel2=this.categoties[i].children
				//重置滚动条位置
				this.scrollTop=this.scrollTop===0?1:0
			},
			//跳转商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid="+item.cat_id
				})
			},
			//跳转到搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll_view_container{
		display: flex;
		.left_scroll_view{
			width: 120px;
			.left_scroll_view_item{
				text-align: center;
				background-color: #f7f7f7;
				font-size: 12px;
				line-height: 60px;
				
				&.active{
					background-color: #fff;
					position: relative;
					&::before{
						content: " ";
						display: block;
						width: 3px;
						height: 30px;
						background-color: #C00000;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
				}
			}
		}
	}
	.cate_lv2_title{
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	
	.cate_lv3_list{
		display: flex;
		flex-wrap: wrap;
		.cate_lv3_item{
			width: 33.33%;
			display: flex;
			flex-direction:column;
			justify-content: center;
			align-items: center;
			margin-bottom:10px ;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-style: 12px;
			}
		}
	}
</style>