<template>
	<div class="box" v-if="datahomelist?true:false" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">

		<div v-for="data in datahomelist" class="boxx">
			<h2>{{data.group_section.title}}</h2>
			<h3>{{data.group_section.desc}}</h3>
			<ul v-for='data in data.tabs'>
				<li @click="handClick(data.enjoy_url
)">
					<img :src="data.url" alt="" />
					<p>{{data.title}}</p>
					<span>{{data.desc}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	import router from "../router";
	import axios from "axios";
	import { InfiniteScroll } from 'mint-ui';
	import Vue from "vue";
	Vue.use(InfiniteScroll);

	Indicator.open('加载中...');
	setTimeout(function() {
		Indicator.close();
	}, 1000)

	export default {
		data() {
			return {
				datalist: [],
				loading: false,
				count: 0,
				len: ""

			}
		},
		mounted() {
			this.$store.dispatch("getHomelist", this.$route.params.id);
		},
		computed: {
			datahomelist() {

				if(this.$store.state.homelist.length != 0) {
					this.len = this.$store.state.homelist.length
					return this.$store.state.homelist
				}
			}
		},
		methods: {
			handClick(id) {
				var id = id.split("?")[1].split("&")[0].split("=")[1];
				router.push(`/detail/${id}`)
			},
			loadMore() {
				this.count++;

				if(this.count * 3 > this.len) {
					loading: true
					return;
				}

				Indicator.open('加载中...');
				axios.get(`/hub/home/v1/web/week_choice.json?city_id=140&page=${this.count}`).then(res => {
					console.log(res.data)
					if(res.data.length != 0) {
						this.$store.state.homelist = [...this.datahomelist, ...res.data]
						

					}
					Indicator.close();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.boxx {
		margin-top: 0.3rem;
	}
	
	.box {
		margin-top: 0.44rem;
		padding: 0.15rem;
		h2 {
			font-size: 0.21rem;
		}
		h3 {
			color: red;
			font-size: 0.12rem;
		}
		ul {
			li {
				list-style: none;
				padding: 0.2rem 0;
				border-bottom: 1px solid #e0e0e0;
				position: relative;
				img {
					width: 3.35rem;
					height: 2.23rem;
				}
				p {
					margin-top: 0.15rem;
					font-size: 0.16rem;
					color: #2c3038;
				}
				span {
					margin-top: 0.08rem;
					font-size: 0.12rem;
					color: #92969c;
				}
			}
		}
	}
</style>