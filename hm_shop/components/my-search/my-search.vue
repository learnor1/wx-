<template>
	<view @click="searchBoxHandler()" class="my_search_container" :style="{'background-color':bgcolor}">
		<view class="my_search_box" :style="{'border-radius':radius+'px'}">
			<!-- 使用uni-ui提供的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my_search",
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.my_search_container{
		height: 50px;
		// background-color: #C00000;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my_search_box{
			height: 36px;
			width: 100%;
			background-color: #fff;
			// border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.placeholder{
			font-style: 15px;
			margin-left: 5px;
		}
	}
</style>