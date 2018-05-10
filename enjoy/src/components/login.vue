<template>
	<div id="un-head">
		<div id="login">
			<router-link tag="a" to="../index.html"><img src="../assets/logon2.png" /></router-link>
			<div>
				<p class="phone">
					<input type="text" placeholder="手机号" v-model="num" @change="inp()" maxlength="11">
				</p>
				<p class="phone">
					<input type="password" placeholder="密码" v-model="pas" @change="pass()" maxlength="21">
				</p>
				<span v-show="err" class="err">{{msg}}</span>
				<p class="dl">
					<a @click="cli()">登录</a>
				</p>

				<p class="dl">
					<router-link to="/register" tag="a">注册</router-link>
				</p>
			</div>
			<div class="tips">
				<p> 登录即表示您同意
					<a href="https://topic.ricebook.com/topicpage/agreement.html">用户协议</a>
				</p>
			</div>   
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import router from '../router';

	export default {
		data() {
			return {
				err: true,
				msg: '',
				num: null,
				pas: null
			}
		},
		methods: {
			cli() {

				axios.post('/login', {
					phone: this.num,
					password: this.pas
				}).then((res) => {

					if(res.data == true) {
						this.err = false;
						router.push('/home');
						console.log(res.data)

					} else {
						console.log(res.data)
						this.err = true;
						this.msg = '手机或密码错误';
					}
				})
			},
			inp() {
				if(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.num) && this.num != '') {
					return this.num;
				}
			},
			pass() {
				if(/^[a-zA-Z0-9]{6,21}$/.test(this.pas) && this.pas != '') {
					console.log('yes')
					return this.pas;
				}else{
					console.log('no')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.err {
		font-size: 0.11rem;
		color: red;
	}
	
	#login {
		padding: 0 0.15rem;
		/*text-align: center;*/
		img {
			height: 0.45rem;
			margin: .5rem;
		}
		.phone {
			margin-bottom: .25rem;
			input {
				width: 100%;
				font-size: .16rem;
				color: #2c3038;
				border-radius: 0.04rem;
				border: 2px solid #bdc0c5;
				padding: .115rem 0.05rem;
				padding: .115rem 0;
			}
		}
		.dl {
			a {
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
		.tips {
			margin-top: .95rem;
			width: 100%;
			font-size: .12rem;
			text-align: center;
			color: #92969c;
			margin-bottom: .275rem;
			a {
				color: #2c3038;
				text-decoration: underline;
			}
		}
	}
</style>