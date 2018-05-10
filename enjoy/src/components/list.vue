<template>
	<div>
		<ul class="list">
			<li class="left" @click="isShow?isShow = false:''">全部</li>
			<li class="right" @click="isShow = !isShow">智能排序</li>
		</ul>
		<div class="category-panel" v-show="isShow" > 
			<a href="javascript:;" v-for="data,index in list" @click="btn(index,data.id)" :class="now==index?'on':''">
				{{data.sort}}
			</a>
		</div>
		<ul>
			<li v-for="data in datalist" @click="handClick(data.product_id)">
				<img :src="data.product_image"  />
				<div>
					<p>{{data.name}}</p>
					<i>{{data.price/100}}元/{{data.show_entity_name}}</i><span>￥{{data.original_price/100}}</span>
					<b><i class="iconfont icon-map"    v-show="data.area?true:false"></i>{{data.area}}</b>
				</div>
			</li>
		</ul>
		<div class="page_footer">
			<p>© 2016 ENJOY</p>
			<p>京ICP备12040847</p>
			<p>京公网安备11010502025574 京ICP证150031号</p>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import router from "../router";
import axios from "axios";
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
    	 datalist:[],
    	 isShow:false,
    	 id:1,
    	 list:[
    	 	{sort: '智能排序',id:1},
　　　　　　　　{sort: '离我最近',id:3},
　　　　　　　　{sort: '价格最低',id:2},
　　　　　　　　{sort: '价格最高',id:4}
    	 ],
    	 now:0
    }
  },
  mounted(){
    var num = this.$route.params.id;	  	axios.get(`/4/tab/category_product_list.json?category_id=${num}&sort=1&from_id=0&city_id=388&page=0`).then(res=>{
  		this.datalist=res.data;
  	})
  },
  methods:{
  	
  	
  	handClick(id){
  		router.push(`/detail/${id}`)
  	}
	,
	btn(index,id){
		Indicator.open('加载中...');
		this.now = index;
		this.isShow = false;
		var num = this.$route.params.id;	  	axios.get(`/4/tab/category_product_list.json?category_id=${num}&sort=${id}&from_id=0&city_id=388&page=0`).then(res=>{
		  		this.datalist=res.data;
		  		Indicator.close();
		  	})
		
		}
	}
  	
	
}
</script>

<style lang="scss" scoped>
.category-panel{
	    position: absolute;
	    background-color: #fff;
	    z-index: 10;
	    width: 100%;
	    top: 0.5rem;
	    text-align: center;
	    a{
	    	    display: block;
		    width: 100%;
		    padding: 0.11rem 0;
		    border-top: 1px solid #e6e6e6;
		     color: #2c3038;
   			 text-align: center;
   			font-size:0.14rem;
	    }
}
.on{
    color: #ff3939 !important;
    background-color: #fafafa;
}
div{
	margin-top: 0.25rem;
	.list{
		margin-top: 0.45rem;
		padding:0.1rem 0;
		overflow:hidden;
		border-bottom: 1px solid #e6e6e6;
		font-size:0.14rem;
		
		.left{
			float: left;
			width: 50%;
			border-right:1px solid #e6e6e6 ;
			border-bottom: 0;
			padding: 0;
			text-align: center;
		}
		.right{
			text-align: center;
			float: right;
			width: 49.5%;
			padding: 0;
			border-bottom: 0;
		}
	}
	ul{
		li{
			overflow: auto;
			padding: 0.15rem;
			border-bottom: 1px solid #e6e6e6;
			img{
				float: left;
				width: 1.71rem;
    			height: 1.15rem;
    			vertical-align: top;
    			margin-right: 0.1rem;
			}
			div{
				margin-top: 0;
				position: relative;
				float: left;
				width: 1.61rem;
    			height: 1.15rem;
    			p{
    				height: 0.6rem;
				    line-height: 1.3;
				    font-size: 0.15rem;
				    color: #2c3038;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
    				-webkit-line-clamp: 3;
    			}
    			i{
    				font-size: 0.15rem;
    				color: #ff3939;
    				font-style: normal;
    			}
    			span{
    				font-size: 0.15rem;
    				font-weight: 700;
    				margin-left: 0.06rem;
				    text-decoration: line-through;
				    color: #92969c;
    			}
    			b{
    				font-weight: 100;
    				position: absolute;
				    bottom: 0;
				    left: 0;
				    font-size: 0.12rem;
				    color: #92969c;
				    i{
				    	color: #92969c;
				    }
    			}
			}
		}
	}
	.page_footer{
		position: relative;
	    font-size: 0.11rem;
	    color: #92969c;
	    width: 100%;
	    text-align: center;
	    margin: 0 auto;
	    background-color: #f6f6f6;
	    padding: 0.3rem 0 0.6rem;
	}
}
</style>