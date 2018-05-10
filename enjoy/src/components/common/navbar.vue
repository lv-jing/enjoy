<template>
	<nav>
    <div class="left">
    	<ul @click="handleClick()">
    	<slot></slot>
       
    	</ul>

    </div> 
    
    <div class='logo'>    
    	 <router-link tag="a" to="/home"><img src="../../assets/logo.png" /></router-link>
        <router-link to="/city" tag="span" id="span">重庆</router-link>
        <p style="display: none;" id="cityid">388</p>
       <i class="iconfont icon-moreunfold"></i>
    </div>
    <div class="right">
        <router-link to="/login" tag="span">登录</router-link>
        <i class="iconfont icon-search" @click="isShow1=true"></i>
    </div>
    
    </div>
    <div class="search" v-show="isShow1">
    	<input type="text" placeholder="搜索本地精选 / 快递到家" id="search"/><span @click="click()">搜索</span>
    </div>
    
  </nav>
</template>

<script>
	import router from "../../router";
	import axios from "axios"
export default {
  data () {
    return {
        isShow:false,
        isShow1:false
    }
  },
  methods:{
    handleClick(){
        this.$emit("event")
    },
    click(){
  		var search = document.getElementById("search");
  		var str = search.value;
  		var key = document.getElementById("key");
  		if(key){key.innerHTML = str}
  			search.value = ""
  			var num = document.getElementById("cityid").innerHTML
			var keyd = this.$route.params.id;
			axios.get(`https://api.ricebook.com/3/enjoy_product/search.json?city_id=${num}&keyword=${keyd}&page=0`).then(res=>{
				
			}).catch(err=>{
				console.log(err)
			})
	  		if(str){
	  			this.isShow1 = false;
	  			router.push(`/search/${str}`)
	  		}
  		
  	}    
    
    
  }
  
}
</script>

<style lang="scss" scoped>
nav{
    background: #282828;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: auto;
    line-height:0.44rem;
    overflow: hidden;
    color: white;
    z-index:2;
    display: flex;
    justify-content: space-around;

  }
  .logo{
  	img{
  		width: 0.675rem;
  		height: 0.25rem;
  		margin-top: 0.05rem;
  	}
  	span{
  		font-size: 0.1rem;
  	}
  	i{
  		font-size: 0.12rem;
  	}
  }
  .left{
  	font-size: 0.15rem;
  }
  .right{
  	font-size: 0.15rem;
  	span{
  		margin-right: 0.1rem;
  	}
  	
  }
  
    .search{
  	position:fixed;
	top: 0.4rem;
    width: 3.45rem;
    height: 0.4rem;
    background-color: #fff;
    padding: 0.075rem 0.15rem;
    margin: 0 auto;  	
    z-index: 3;
    input{
    	font-size: 0.14rem;
	    padding: 0.1rem 0.15rem;
	    background-color: #f2f3f4;
	    width: 2.7rem;
	    border: none;
	    outline: none;
    }
  	span{
  		font-size: 0.15rem;
  		color: black;
	    width: 0.45rem;
	    height: 0.4rem;
	    text-align: right;
  	}
  }

</style>