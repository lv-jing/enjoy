import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);//注册Vuex
const store = new Vuex.Store({
	
	state:{
		homelist:[]
			
	},
	actions:{
		//可以移步亦可以同步
		getHomelist(store,id){
			if(id==undefined){
				id=388
			}
			axios.get(`/hub/home/v1/web/week_choice.json?city_id=${id}&page=0`).then(res=>{
				//提交给mutationons 改变状态
				store.commit("changeHomelist",res.data);
			})
		}
	},
	mutations:{
		//只能同步
		changeHomelist:function(state,payload){
			//改变状态
			state.homelist = payload
			
		}
	}
	
})

export default store;