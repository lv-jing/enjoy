<template>
	<div class="bg">
		<div class="headbox">
			<img src="../assets/1.png" />
			<h4>{{arr}}</h4>
		</div>
		<div class="vip">
			<h3>会员权益</h3> 
			<a href="javascript:;">去开通</a>
			<p>开通会员每月平均可以帮你多赚 2046 元</p>
			<ul class="list">
				<li><img src="../assets/1.jpg" /><span>会员大礼包</span></li>
				<li><img src="../assets/2.jpg" /><span>会员专享价</span></li>
				<li><img src="../assets/3.jpg" /><span>会员日特权</span></li>
				<li><img src="../assets/4.jpg" /><span>专属客服</span></li>
			</ul>
		</div>
		<div class="order">
			<router-link tag="a" to="/shopping">我的订单<span>></span></router-link>
		</div>
		<div class="order address">
			<a href="javascript:;">地址管理<span>></span></a>
		</div>
	</div>
</template>

<script>
	import router from "../router";
	export default {
		data() {
			return {
				arr:null
			}
		},
		mounted(){
			var str = document.cookie;
			this.arr=str.split("=")[1]
			console.log(this.arr)
			
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-color: #f6f6f6;
		padding-bottom: 200px;
		.headbox {
			top: 0.45rem;
			width: 3.75rem;
			height: 1.99rem;
			background: url(../assets/bg.png) 0 0 no-repeat;
			text-align: center;
			color: #fff;
			font-size: 0.16rem;
			position: relative;
			img {
				width: 0.7rem;
				height: 0.7rem;
				border-radius: 50%;
				margin-top: 0.54rem;
				margin-bottom: 0.1rem;
			}
		}
		.vip {
			margin-top: 0.55rem;
			font-size: 0.12rem;
			padding: 0.2rem;
			line-height: 1;
			background: #fff;
			position: relative;
			h3 {
				font-size: 0.17rem;
				font-weight: 400;
				color: #2c3038;
			}
			a {
				text-decoration: none;
				color: #fba700;
				position: absolute;
				right: 0.2rem;
				top: 0.26rem;
			}
			p {
				color: #92969c;
				margin-top: 0.06rem;
			}
			.list {
				overflow: hidden;
				background: #fff;
				margin-top: 0.2rem;
				li {
					list-style: none;
					width: 25%;
					float: left;
					box-sizing: border-box;
					color: #2c3038;
					text-align: center;
					img {
						width: 0.48rem;
						height: 0.48rem;
					}
					span {
						margin-top: 0.06rem;
						font-size: 0.12rem;
						display: inline-block;
					}
				}
			}
		}
		.order {
			margin-top: 0.09rem;
			background-color: #fff;
			a {
				text-decoration: none;
				padding: 0.2rem 0;
				color: #2c3038;
				display: block;
				margin: 0 0.2rem;
				padding-right: 0.2rem;
				margin-right: 0;
				font-size: 0.15rem;
				span {
					float: right;
					color: #cecece;
				}
			}
		}
	}
</style>