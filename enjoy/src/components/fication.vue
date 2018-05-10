<template>
	<div>

		<ul v-for="data in ficationlist">
			<p>{{data.name}}</p>
			<li v-for="v_data in data.sub_category_list" @click="handClick(v_data.sub_category_list?v_data.sub_category_list[0].id:v_data.id)">{{v_data.name}}</li>
		</ul>

		<router-view></router-view>
	</div>
</template>

<script>
	import router from "../router";
	import axios from "axios";
	export default {
		data() {
			return {
				ficationlist: [],
				isShow: true

			}
		},
		mounted: function() {
			axios.get("/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9Mzg4JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9ODk5ZjIyYzQyMmFmZTJhOWFjNDJmOGZhY2QyMmNiN2UmMjAxODA0MTgxMDAw.json").then(res => {

				this.ficationlist = res.data;

			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			handClick(data) {
				if(data) {
					console.log(data);
					router.push(`/list/${data}`)
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	div {
		margin-top: 50px;
		ul {
			overflow: hidden;
			p {
				background-color: #f6f6f6;
				padding: 0.09rem 0.2rem;
				font-size: 0.15rem;
				color: #1b1b20;
				text-align: left;
			}
			li {
				float: left;
				list-style: none;
				width: 33.1%;
				font-size: 0.14rem;
				text-align: center;
				color: #2c3038;
				border-bottom: 1px solid #e4e5e7;
				border-right: 1px solid #e4e5e7;
				padding: 0.15rem 0;
			}
			li:nth-of-type(3n+0) {
				border-right: none;
			}
		}
	}
</style>