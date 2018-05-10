<template>
	<div class="content">
		<div class="one">
			<div class="title">
				<h3>{{title1}}</h3>
				<p>{{mes1}}</p>
			</div>
			<div class="swiper-container" v-if="datalist1" id="swiper-undefined">
				<!-- //swiper-wrapper 就包裹所有轮播的页面 -->
				<ul class="swiper-wrapper clearfix">
					<li v-for="data in datalist1.data.tabs" class="swiper-slide">
						<a href="javascript:;">
							<img :src="data.url" />
							<p class="tips">{{data.tag}}</p>
							<p class="tie">{{data.title}}</p>
							<p class="sub-title">{{data.desc}}</p>
						</a>
					</li>
				</ul>
				<!-- //加上下面这个div 就是加上分页器 -->
				<!--  <div class="swiper-pagination"></div>-->
			</div>
			<div class="component-gap"></div>
		</div>

		<div class="two">
			<div class="side-slip-column">
				<div class="swiper-container" id="swiper-93" v-if="datalist2">
					<ul class="swiper-wrapper clearfix">
						<li v-for="data in datalist2.data.tabs" class="swiper-slide">
							<a href="javascroipt">
								<img src="../assets/pic.png" />
								<p class="tie">{{data.title}}</p>
								<p class="sub-title">{{data.desc}}</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="component-gap"></div>
		</div>

		<div class="ths">
			<ul>
				<swipe class="my-swipe" v-if="datalist3">
					<swipe-item v-for="data in datalist3" :key="data.id">
						<li>
							<img :src="data.url" />
							<p>{{data.title}}</p>

						</li>
					</swipe-item>
				</swipe>
			</ul>
			<div class="component-gap"></div>

		</div>

		<div class="fer">
			<div class="sku-shelf" v-if="datalist4">
				<h3>{{title4}}</h3>
				<p>{{mes4}}</p>
				<a href="javascript">{{ck}}</a>
				<ul>
					<li v-for="data in datalist4.data.tabs">

						<img :src="data.url" />

					</li>

				</ul>
			</div>
		</div>
		<div class="fer">
			<div class="sku-shelf" v-if="datalist5">
				<h3>{{title5}}</h3>
				<p>{{mes5}}</p>
				<a href="javascript">{{ck}}</a>
				<ul>
					<li v-for="data in datalist5.data.tabs">

						<img :src="data.url" />

					</li>

				</ul>
			</div>
		</div>
		<div class="fer sty">
			<div class="sku-shelf" v-if="datalist6">
				<h3>{{title6}}</h3>
				<p>{{mes6}}</p>
				<a href="javascript">{{ck}}</a>
				<ul>
					<li v-for="data in datalist6.data.tabs">

						<img :src="data.url" />

					</li>

				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	import 'vue-swipe/dist/vue-swipe.css';
	import { Swipe, SwipeItem } from 'vue-swipe';
	import router from "../router";
	import axios from "axios";
	export default {
		data() {
			return {
				datalist1: null,
				datalist2: null,
				datalist3: null,
				datalist4: null,
				datalist5: null,
				datalist6: null,
				title1: '',
				title4: '',
				title5: '',
				title6: '',
				mes1: '',
				mes4: '',
				mes5: '',
				mes6: '',
				ck: ''
			}
		},
		mounted() {

			axios.get('/hub/home/v1/web/explore.json?city_id=388').then(res => {
				this.datalist1 = res.data[0];
				this.datalist2 = res.data[1];
				this.datalist3 = res.data[2].data.tabs;
				this.datalist4 = res.data[3];
				this.datalist5 = res.data[4];
				this.datalist6 = res.data[5];

				this.title1 = this.datalist1.data.group_section.title;
				this.mes1 = this.datalist1.data.group_section.desc;

				this.title4 = this.datalist4.data.group_section.title
				this.mes4 = this.datalist4.data.group_section.desc;

				this.title5 = this.datalist5.data.group_section.title
				this.mes5 = this.datalist5.data.group_section.desc;

				this.title6 = this.datalist6.data.group_section.title
				this.mes6 = this.datalist6.data.group_section.desc;
				this.ck = this.datalist6.data.group_section.enjoy_url_text;

				setTimeout(() => {
					var swiper = new Swiper('.swiper-container', {
						loop: false,
						speed: 1000,
						paginationClickable: true,
					});
				});
			}).catch(err => {
				console.log(err);
			});

		},
		components: {
			'swipe': Swipe,
			'swipe-item': SwipeItem
		}
	}
</script>

<style lang="scss" scoped="">
li{
	list-style: none;
}
	.content {
		width: 100%;
		background-color: #fff;
		margin-top: 0.44rem;
		padding-bottom: 0.7rem;
	}
	
	.component-gap {
		margin: 0 auto;
		width: 3.35rem;
		height: 1px;
		background-color: #d8d8d8;
	}
	
	.one {
		width: 3.75rem;
		font-size: 0;
		.title {
			position: relative;
			padding: 0.3rem 0.2rem 0.2rem;
			h3 {
				font-size: 0.21rem;
				font-weight: 600;
				color: #191919;
			}
			p {
				font-size: 0.11rem;
				color: #92969c;
			}
		}
		#swiper-undefined {
			width: 100%;
			background-color: #fff;
			/*overflow: hidden;*/
			.clearfix {
				width: 20.9rem;
				margin-left: 0.2rem;
				li {
					/*margin-right: 0.1rem;*/
					width: 3.3rem;
					a {
						width: 3.3rem;
						display: block;
						padding-bottom: 0.2rem;
						img {
							width: 3.35rem;
							height: 1.89rem;
							margin-bottom: 0.16rem;
							vertical-align: top;
						}
						.tips {
							font-size: 0.11rem;
							color: #ff3939;
							margin-bottom: 0.05rem;
						}
						.tie {
							font-size: 0.16rem;
							font-weight: 600;
							color: #000;
							margin-bottom: 0.04rem;
						}
						.sub-title {
							font-size: 0.11rem;
							color: #9b9b9b;
						}
					}
				}
			}
		}
	}
	
	.two {
		.side-slip-column {
			width: 3.75rem;
			background-color: #fff;
			overflow: hidden;
			padding-top: 0.2rem;
			#swiper-93 {
				width: 3.75rem;
				font-size: 0;
				.clearfix {
					margin-left: 0.2rem;
					li {
						margin-right: 0.1rem;
						width: 1.62rem !important;
						a {
							display: block;
							width: 1.62rem;
							padding-bottom: 0.2rem;
							img {
								width: 1.62rem;
								height: 0.91rem;
								vertical-align: top;
							}
							.tie {
								position: absolute;
								top: 0.3rem;
								font-size: 0.16rem;
								font-weight: 600;
								margin-bottom: 0.04rem;
								color: #fff;
							}
							.sub-title {
								position: absolute;
								top: 0.52rem;
								font-size: 0.11rem;
								color: #fff;
							}
						}
					}
				}
			}
		}
	}
	
	.ths {
		.my-swipe {
			height: 2.7rem;
			margin-left: 0.2rem;
			img {
				width: 3.35rem;
				height: 1.89rem;
				margin-top: 0.2rem;
			}
			p {
				font-size: 0.14rem;
				letter-spacing: 0.01rem;
				color: rgba(69, 69, 69, .99)
			}
		}
	}
	
	.fer {
		.sku-shelf {
			padding: 0.3rem 0 0.2rem;
			margin: 0 0.2rem;
			position: relative;
			line-height: 1;
			border-bottom: 1px solid #e0e0e0;
			h3 {
				font-size: 0.21rem;
				font-weight: bolder;
				color: #2c3038;
			}
			p {
				color: #92969c;
				font-size: 0.11rem;
				margin-top: 0.05rem;
			}
			a {
				position: absolute;
				top: 0.35rem;
				right: 0;
				color: #ff3939;
				font-size: 0.14rem;
			}
		}
		ul {
			padding-top: 0.2rem;
			height: 1.05rem;
			li {
				margin-right: 0.1rem;
				width: 1rem;
				height: 1.05rem;
				float: left;
				img {
					width: 1.05rem;
					height: 1.05rem;
				}
			}
		}
	}
	
	.sty {
		/*margin-bottom: 0.4rem;*/
	}
</style>