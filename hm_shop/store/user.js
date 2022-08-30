export default{
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:JSON.parse(uni.getStorageSync('token')||''),
		redirectInfo:null
	}),
	mutations:{
		//更新收货地址
		updateAddress(state,address){
			state.address=address
			this.commit('user/saveAddressToStorage')
		},
		//持久化存储address
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		//存储token
		updateToken(state,token){
			state.token=token
			this.commit('user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		updateRedirectiveInfo(state,info){
			state.redirectInfo=info
		}
		
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}