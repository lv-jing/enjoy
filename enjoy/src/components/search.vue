<template>
	<div>
		<div class="bento-tab none-bg"> 
			<div class="tab-item local active"> 本地服务 </div> 
			<div class="tab-item express"> 全国送 </div> 
		</div>
		<div class="search-hint"> 
			<span>根据您的关键词
				<span v-model="keyword" id="key">
					{{keyword}}
				</span>为您推荐以下商品
			</span>
		</div>
		<div class="search-list">
			<div class="search-cell" v-for="data in datalist"> 
				<img :src="data.product_image"> 
					<div class="products-info"> 
						<div class="product-title">
							{{data.name}}
						</div> 
						<div class="products-price"> 
							<div class="price"> 
								<span class="num">{{data.price/100}}</span>元/{{data.show_entity_name?data.show_entity_name:entity_name}} 
							</div>  
							<div class="origin-price" v-if="data.original_price">￥{{data.original_price/100}}</div>
						</div> 
					</div> 
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default{
		data(){
			return{
				keyword:null,
				datalist:[]
			}
		},
		mounted(){
			var num = document.getElementById("cityid").innerHTML
			this.keyword = this.$route.params.id;
			var keyd = this.$route.params.id;
			axios.get(`https://api.ricebook.com/3/enjoy_product/search.json?city_id=${num}&keyword=${keyd}&page=0`).then(res=>{
				this.datalist = res.data.products
			}).catch(err=>{
				console.log(err)
			})
			
		}
	}
</script>

<style lang="scss" scoped>
	.none-bg {
		margin-top: 0.46rem;
	    border: 1px solid #e5e7e9;
	    width: 100%;
	    height: 0.4rem;
	    box-sizing: border-box;
	    .tab-item{ 
			width: 1.86rem;
		    height: 0.4rem;
		    line-height: 0.4rem;
		    padding-left: 0.22rem;
		    box-sizing: border-box;
		    float: left;
		    text-align: center;
		    font-size: 0.16rem;
		    font-family: PingFangSC-Medium;
		    color: #969696;
		    cursor: pointer;	    
	    }
	}
	.search-hint {
	    font-family: PingFangSC-Regular;
	    font-size: 0.13rem;
	    color: #92969c;
	    text-align: center;
	    padding-top: 0.15rem;
	}
	.search-cell{
		width: 3.45rem;
	    margin: 0 auto;
	    border-bottom: 1px solid #e6e6e6;
	    padding: 0.15rem 0;
	    position: relative;
	    img{
	    	    width: 1.72rem;
			    height: 1.15rem;
			    display: inline-block;
	    }
	    .products-info {
		    display: inline-block;
		    width: 1.62rem;
		    vertical-align: top;
		    .product-title {
			    font-size: 0.15rem;
			    line-height: 1.3;
			    color: #2c3038;
			    margin-bottom: 0.11rem;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			}
			.products-price {
			    font-size: 0.13rem;
			    color: #92969c;
			     .price {
				    font-size: 0.14rem;
				    line-height: .7;
				    color: #ff3939;
				    display: inline-block;
				}
				.origin-price {
				    display: inline-block;
				    margin-left: 0.05rem;
				    vertical-align: middle;
				    text-decoration: line-through;
				    color: #92969c;
				}
			}
		}
	}
</style>