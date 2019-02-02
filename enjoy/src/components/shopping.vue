<template>
	<div class="box">
		<ul>
			<li v-for="(data,index) in datalist">
				<input type="checkbox" class="check" v-model="checkgroup" :value="data" />
				<div class="desc">
					<div class="left">
						<img :src="data.img" />
					</div>
					<div class="right">
						<p class="title">{{data.name}}</p>
						<p class="cate">类型: <span>{{data.spec}}</span></p>
						<p class="price">单价: {{data.monery}}元</p>
						<div class="opt">
							<div class="operate">
								<a class="subtract disable" @click="del(index)">-</a>
								{{data.num}}
								<a class="plus" @click="add(index)">+</a>
							</div>
						</div>
						<i class="iconfont icon-delete" @click="btn(index)"></i>
					</div>
				</div>
			</li>
		</ul>
		
		<div class="sop" >
			<p v-if="datalist.length>0?false:true">亲购物车没有商品</p>
		</div>
		<div class="cart-reco">
			<p>猜你喜欢</p>
			<ul class="clearfix" v-if="list">
				<li v-for="data in list.modules[5].data.recommend" :key="data.product_id" @click="handClick(data.product_id)">
					<a href="javascrip:;">
						<img :src="data.product_image_url" />
						<div class="desc">
							<p class="sub-title">{{data.product_name }}</p>
							<p class="price">
								<span>{{data.price/100}}元/{{data.show_entity_name}}</span>
								<span class="o-price" v-if="data.original_price">¥{{data.original_price}}</span>
							</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		<div class="cart-footer">
			<div class="cart-pay">
				<a class="sel-all">
					<input type="checkbox" v-model="isAllChecked" />
					<span class="text">全选</span>
				</a>
				<a class="pay-go">去结算</a>
				<div class="pay-content">合计：<span class="total">{{computedSum}}</span> 元</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import router from "../router"
	export default {
		data() {
			return {
				checkgroup: [],
				list: null,
				isAllChecked: false,
				total: 0,
				checkModel: [],
				datalist: [],
				arr:[],
				clickAll:true
			}
		},
		computed: {
			computedSum() {
				var sum = 0;
				var l = 0;
				for(var i in this.checkgroup) {
					sum += this.checkgroup[i].monery * this.checkgroup[i].num;
					l++
				}
				if(l==this.datalist.length){
					this.isAllChecked = true;
				}else{
					this.clickAll = false;
					this.isAllChecked = false;
				}
				return sum;
			}
		},
		watch: {
			isAllChecked(newvalue) {
				console.log(newvalue)
				if(newvalue) {
					this.checkgroup = this.datalist;
					this.clickAll = true;
				}else{
					if(this.clickAll){
						this.checkgroup = []
						this.clickAll = true;
					}					
					
				}
				
				}
		},
		mounted: function() {
			if(localStorage.car) {
				this.datalist = JSON.parse(localStorage.car);
				this.arr = this.datalist;
			}
				
			axios.get("/product/info/product_detail.json?product_id=1020400&sub_product_id=5040006").then(res => {
				this.list = res.data
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			handClick(id) {
				router.push(`/detail/${id}`)
			},
			add(index){

				this.arr[index].num++
				var arr1 = JSON.stringify(this.arr);
				localStorage.setItem("car",arr1)
			},
			del(index){
				if(this.arr[index].num<=1){
					this.arr[index].num=1
				}else{
					this.arr[index].num--
				}	
				var arr1 = JSON.stringify(this.arr);
				localStorage.setItem("car",arr1)
			},
			btn(index){
				this.arr.splice(index,1);
				var arr1 = JSON.stringify(this.arr);
				localStorage.setItem("car",arr1)
			}

		}
	}
</script>

<style scaped lang="scss">
.sop{
	p{
		text-align: center;
		margin-top:0.75rem;
		margin-bottom: 0.25rem;
		font-size: 0.2rem;
		color: red;
	}
}
	.box {
		margin-top: 0.45rem;
		ul {
			li {
				.check {
					margin-top: 0.4rem;
					margin-left: 0.175rem;
					width: 0.2rem;
					height: 0.2rem;
					float: left;
				}
				.desc {
					margin: 0 0.2rem 0 0.53rem;
					padding: 0.15rem 0;
					overflow: auto;
					.left {
						float: left;
						position: relative;
						width: 1.2rem;
						height: 0.8rem;
						img {
							width: 1.2rem;
							height: 0.8rem;
						}
					}
					.right {
						position: relative;
						margin-left: 1.35rem;
						height: 0.8rem;
						i {
							position: absolute;
							bottom: 0;
							right: 0;
							width: 0.19rem;
							height: 0.19rem;
							padding: 0.15rem 0 0 0.15rem;
							font-size: 0.18rem;
							color: #e0e0e0;
						}
						.title {
							font-family: PingFangSC-Medium;
							font-size: 0.14rem;
							font-weight: 500;
							color: #2c3038;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
						.cate {
							font-size: 0.12rem;
							color: #92969c;
						}
						.price {
							font-size: 0.12rem;
							color: #ff3939;
						}
						.opt {
							position: absolute;
							bottom: 0;
							a {
								width: 0.24rem;
								vertical-align: middle;
								background-color: #e9eaed;
								display: inline-block;
								height: 0.28rem;
								text-align: center;
							}
							input {
								width: 0.37rem;
								font-size: 0.14rem;
								display: inline-block;
								height: 0.24rem;
								text-align: center;
							}
							.subtract {
								color: #bdc0c5;
							}
						}
					}
				}
			}
		}
		.cart-footer {
			position: fixed;
			left: 0;
			bottom: .4rem;
			width: 100%;
			.total {
				border: none;
			}
			.cart-pay {
				position: relative;
				height: 0.6rem;
				background-color: #FFF;
				box-shadow: 0 -1px 0 0 #bebec2;
				.text {
					position: absolute;
					top: 0.21rem;
					left: 0.53rem;
					color: #ff3939;
					font-size: 0.15rem;
				}
				input {
					width: 0.15rem;
					height: 0.15rem;
					margin-left: 0.25rem;
					margin-top: 0.22rem;
				}
				.pay-go {
					float: right;
					width: 1.5rem;
					height: 0.6rem;
					background-color: #ff3939;
					font-size: 0.18rem;
					color: #FFF;
					text-align: center;
					line-height: 0.6rem;
				}
				.pay-content {
					float: right;
					height: 0.6rem;
					margin-right: 0.1rem;
					font-size: 0.12rem;
					color: #ff3939;
					line-height: 0.6rem;
					span {
						font-size: 0.16rem;
					}
				}
			}
		}
		.cart-reco {
			padding-bottom: 0.6rem;
			p {
				font-size: 0.18rem;
				color: #2c3038;
				text-align: center;
				margin: 0.15rem 0;
			}
			.clearfix {
				margin-left: 0.2rem;
				overflow: auto;
				li {
					list-style: none;
					margin-right: 0.15rem;
					margin-bottom: 42px;
					position: relative;
					float: left;
					width: 1.6rem;
					a {
						display: block;
						overflow: auto;
						img {
							float: left;
							width: 1.6rem;
							height: 1.2rem;
							vertical-align: top;
						}
						.desc {
							margin-left: 0;
							position: relative;
							float: left;
							width: 1.6rem;
							height: auto;
							overflow: hidden;
							.sub-title {
								height: 0.36rem;
								font-size: 0.14rem;
								line-height: 1.3;
								margin-top: 0.05rem;
								color: #2c3038;
								margin-bottom: 0.08rem;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}
							.price {
								font-size: 0.12rem;
								color: #ff3939;
							}
						}
					}
				}
			}
		}
	}
</style>
