<template>
	<view>
		<view class="goods_list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isloading:false
			};
		},
		onLoad(options) {
			this.queryObj.query=options.query||'';
			this.queryObj.cid=options.cid||'';
			this.getGoodsList()
		},
		//下拉刷新
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading=false
			this.goodsList=[]
			
			//重新发送数据请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		//加载更新列表
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total)return uni.$showMsg('没有更多了')
			//检查节流阀
			if(this.isloading)return
			//让页码值加1
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		methods:{
			//获取商品列表的数据
			async getGoodsList(cb){
				//设置节流阀
				this.isloading=true
				const {data:res}=await uni.$http.get('/goods/search',this.queryObj)
				this.isloading=false
				cb&&cb()
				if(res.meta.status!==200) return uni.$showMsg()
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			//跳转商品详情页
			gotoDetail(goods){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">


</style>
