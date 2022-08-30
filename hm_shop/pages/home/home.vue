<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search_box">	
		<my-search @click='gotoSearch()'></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay interval="3000" circular>
			<swiper-item v-for="(item,i) in swiperlist" :key="i">
				<navigator open-type="navigate" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="navs">
			<view class="nav" v-for="(item,i) in navList" :key="i">
			<image @click="firstNav(item)" :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor_list">
			<view class="floor_item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor_tit"></image>
				<view class="floor_img_box">
					<navigator :url="item.product_list[0].url" class="left_img_box">
						<image :src="item.product_list[0].image_src" 
						:style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right_img_box">
						<navigator :url="item2.url" class="right_img_item" 
						v-for="(item2,i2) in item.product_list" :key="i2" 
						v-if="i2!==0">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default{
		mixins:[badgeMix],
		data(){
			return{
				swiperlist:[],
				navList:[],
				floorList:[]
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			//获取轮播图数据
			async getSwiperList(){
				const res = await uni.$http.get('/home/swiperdata')
				if(res.data.meta.status !== 200){
					return uni.$showMsg()
				}
				this.swiperlist = res.data.message
			},
			//获取导航栏数据
			async getNavList(){
				const res = await uni.$http.get('/home/catitems')
				if(res.data.meta.status !==200){
					return uni.$showMsg
				}
				this.navList=res.data.message
			},
			//第一个导航栏到分类页面
			firstNav(i){
				if(i.name==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//获取楼层数据
			async getFloorList(){
				const res = await uni.$http.get('/home/floordata')
				if(res.data.meta.status!==200)return uni.$showMsg()
				res.data.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.data.message
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

<style lang="scss" scoped>
	swiper {
		height: 330rpx;
		swiper-item{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
			}
		}
	}
	// 导航栏
	.navs{
		width: 100%;
		
		display: flex;
		.nav{
			width: 25%;
			image{
				width: 100%;
			}
		}
	}
	//楼层
	.floor_tit{
		width: 100%;
		height: 60rpx;
	}
	.right_img_box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floor_img_box{
		display: flex;
		padding-left: 10rpx;
	}
	//搜索
	.search_box{
		position: sticky;
		top:0;
		z-index: 999;
	}
</style>