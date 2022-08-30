<template>
	<view>
		<view class="search_box">
		<uni-search-bar :radius="100" @input="input" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg_list" v-if="searchResults.length!==0">
			<view class="sugg_item" v-for="(item,i) in searchResults.goods" :key="i" @click="gotoDetail(item)">
				<view class="sugg_name">
					{{item.goods_name}}
				</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history_box" v-else>
			<!-- 标题区域 -->
			<view class="history_title">
				<text>搜索历史</text>
				<uni-icons @click="clean" type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history_list">
				<uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotogoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				historyList:['a','app','apple']
			};
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer= setTimeout(()=>{
					this.kw=e,
					this.getSearchList()
				},500)
			},
			//获取搜索关键词相关数据
			async getSearchList(){
				if(this.kw.length==0){
					this.searchResults=[]
					return
				}
				const {data:res}=await uni.$http.get('/goods/search');
				if(res.meta.status!==200) return uni.shouMsg()
				this.searchResults=res.message;
				this.saveSearchHistory()
			},
			//前往商品详情页
			gotoDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
				})
			},
			//保存搜索历史
			saveSearchHistory(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList=Array.from(set)
				//对搜索历史数据进行持久化存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList||[]))
			},
			//清除历史搜索记录
			clean(){
				this.historyList=[];
				uni.setStorageSync('kw',[])
			},
			//前往商品列表
			gotogoodsList(item){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?query="+item
				})
			}
		},
		computed:{
			//解决最新搜索排序
			historys(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search_box{
		position: sticky;
		top:0;
		z-index: 999;
	}
	// 建议
	.sugg_list{
		pa: 0 5px;
		.sugg_item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			.sugg_name{
			//文本不允许换行
			white-space: nowrap;
			//文本溢出隐藏
			overflow: hidden;
			//溢出后用...代替
			text-overflow: ellipsis;
			margin-right: 3px;
			}
		}
	}
	//历史搜索
	.history_box{
		padding: 0 5px;
		.history_title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history_list{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				margin-top: 5px;
				margin-right: 5px;
				border: none;
				background-color: #ccc
			}
		}
	}
</style>
