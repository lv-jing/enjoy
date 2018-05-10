<template>
	<div>
		<p>本地服务开通城市</p>
		<ul>
			<li @click="handleClick" id="104">上海</li>
			<li @click="handleClick" id="140">北京</li>
			<li @click="handleClick" id="144">南京</li>
			<li @click="handleClick" id="185">天津</li>
			<li @click="handleClick" id="216">广州</li>
			<li @click="handleClick" id="235">成都</li>
			<li @click="handleClick" id="260">杭州</li>
			<li @click="handleClick" id="299">深圳</li>
			<li @click="handleClick" id="347">苏州</li>
			<li @click="handleClick" id="362">西安</li>
			<li @click="handleClick" id="388">重庆</li>
			<li @click="handleClick" id="401">长沙</li>
		</ul>
	</div>
</template>

<script>
	import router from "../router"
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleClick(ev) {
				var city_id = ev.target.id;
				var span = document.getElementById("span");
				var cityid = document.getElementById("cityid");
				cityid.innerHTML = ev.target.id;
				span.innerHTML = ev.target.innerHTML;
				router.push(`/home/${city_id}`);
			}
		}
	}
</script>

<style lang="scss" scoped>
	div {
		font-family: PingFangSC-Medium;
		margin-top: 0.25rem;
		padding-left: 0.15rem;
		p {
			font-size: 0.16rem;
			color: #1a1a1a;
			margin-top: 0.7rem;
		}
		ul {
			li {
				list-style: none;
				float: left;
				width: 1.03rem;
				font-size: 0.13rem;
				padding: 0.05rem 0;
				border: 1px solid #1a1a1a;
				text-align: center;
				color: #1a1a1a;
				margin: 0.15rem 0.15rem 0 0;
			}
		}
	}
</style>