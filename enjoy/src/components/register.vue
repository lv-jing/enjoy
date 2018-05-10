<template>
	<div id="un-head">
		<div id="register">
			<router-link tag="a" to="../index.html"><img src="../assets/logon2.png" /></router-link>
			<div>
				<p class="phone">
					<input type="text" placeholder="手机号" maxlength="11" v-model='num' >
				</p>
				<p class="phone">
					<input type="password" placeholder="密码（8-21位）" v-model="pas"  maxlength="21">
				</p>
				<span v-show="err" class="err">{{msg}}</span>
				<p class="dl"> 
					<a @click="cli()"> 注册</a>
				</p>
			</div>
			<div class="tips">
				 <p><a href="https://topic.ricebook.com/topicpage/agreement.html">用户协议</a></p> 			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import router from '../router';
export default {
  data () {
    return {
		err:true,
		msg:'',
		num:'',
		pas:null,
		str:'',
		er:false
    }
  },
  methods:{
  	cli(){
  		axios.post('/register',{
  			phone:this.num,
  			pass:this.pas
  			
  			
  		}).then((res)=>{
  			if(res.data == true){
  				this.err = false;
  				router.push('/login');
  				
  			}else{
  				this.err = true;
  				this.msg = '该手机号已注册，请直接登录';
  				
  				console.log(this.err);
  				console.log(this.msg);
  				
  			}
  		}).catch(function(err){
			console.log(err);
  		})
		
  	},
  	
	inp(){
		console.log(1)
		if(!/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.num) ){
			return this.num;
		}
	},
	pass(){
		if(/^[a-zA-Z\d_]{8,21}$/.test(this.pas) && this.pas !=''){
			return this.pas;
		}
	}
  	,
  	cli(){
  		var pho = /^1[3|4|5|8][0-9]\d{8}$/;
  		var pa = /^[a-zA-Z0-9]{6,21}$/;
  		console.log(this.num)
  		if(pho.test(this.num) && pa.test(this.pas)){
  			console.log("chenggong");
  			axios.post('/register',{
	  			phone:this.num,
	  			pass:this.pas
	  		}).then((res)=>{
	  			if(res.data == true){
	  				this.err = false;
	  				router.push('/login');
	  				
	  			}else{
	  				this.err = true;
	  				this.msg = '该手机号已注册，请直接登录';
	  				
	  				console.log(this.err);
	  				console.log(this.msg);
	  				
	  			}
	  		}).catch(function(err){
				console.log(err);
	  		})
  		}else{
  			console.log("shibai")
	  		this.msg = '账户和密码格式错误';
	  		}
  		}
  }
}
</script>

<style lang="scss" scoped>
.err{
	font-size: 0.11rem;
	color: red;
}
#register{
	   padding:0 0.15rem;
	   /*text-align: center;*/
	img{
		height: 0.45rem;
		 margin: .5rem;
	}
	.phone{
		margin-bottom: .25rem;
		input{
			width: 3.3rem;
		    font-size: .16rem;
		    color: #2c3038;
		    border-radius: 0.04rem;
		    border: 2px solid #bdc0c5;
		    padding: .115rem 0.05rem;
		}
	}
	.dl{
		margin-top: .5rem;
		a{
			display: block;
		    width: 100%;
		    padding: .115rem 0;
		    background-color: #1a1a1a;
		    font-family: PingFangSC-Medium;
		    font-size: .16rem;
		    color: #e5e5e5;
		    text-align: center;
		    margin-top: .25rem;
		    margin-bottom: 0.05rem;
		    text-decoration: none;
		}
	}
	.tips{
	    margin-top: .95rem;
	    width: 100%;
	    font-size: .12rem;
	    text-align: center;
	    color: #92969c;
	    margin-bottom: .275rem;
	    a{
	    	color: #2c3038;
    		text-decoration: underline;
	    }
	}
}
</style>