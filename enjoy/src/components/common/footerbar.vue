<template>
	<div id="footer">
		<router-link to="/home" tag="a" activeClass="active"><i class="iconfont icon-iconfontstop" ></i></router-link>
		<router-link to="/recommend" tag="a" activeClass="active"><i class="iconfont icon-compass"></i></router-link>
		<router-link to="/shopping" tag="a" activeClass="active"><i class="iconfont icon-gifts"></i></router-link>
		<router-link to="/user" tag="a" activeClass="active"><i class="iconfont icon-gerenzhongxin"></i></router-link>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
#footer{
	position: fixed;
    right: 0;
    bottom: 0;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.4rem;
    border-top: 1px solid #e0e0e0;
    background-color: #fff;
    z-index: 2;
	i{
   		flex: 1;
    	text-align: center;
    	font-size: 0.25rem;
		color:#AFAFAF;
	}


}

</style>