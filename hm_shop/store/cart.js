export default{
	namespaced:true,
	
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cart'))||[]
	}),
	mutations:{
		addToCart(state,goods){
			const findResult= state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods);
			}else{
				findResult.goods_count++;
			}
			// console.log(state.cart);
			this.commit('cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//更新购物车中商品的勾选状态
		updateGoodsState(state,goods){
			const findResult=state.cart.find(x=>x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_state=goods.goods_state
			}
			this.commit('cart/saveToStorage')
		},
		// 更新商品数量
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count
				this.commit('cart/saveToStorage')
			}
		},
		//删除商品
		removeGoodsById(state,goods){
			state.cart=state.cart.filter(x=>x.goods_id!==goods)
			this.commit('cart/saveToStorage')
		},
		//全选中
		updateAllGoodsState(state,newState){
			state.cart.forEach(x=>x.goods_state = newState)
			this.commit('cart/saveToStorage')
		}
	},
	getters:{
		//购物车中商品数量
		total(state){
			return state.cart.reduce((total,item)=>total+=item.goods_count,0)
		},
		//筛选已勾选商品
		checkedCount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		//已勾选商品的总价
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	}
}