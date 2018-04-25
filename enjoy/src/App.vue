<template>
  <div id="app">
       <navbar>
       				<a @click="isShow=!isShow">
       				<router-link to="/home" tag="span" v-show="isShow" @event="isShow=true">首页</router-link>
       				 <router-link to="/fication" tag="span" v-show="!isShow">分类</router-link>
       				</a>
       </navbar>
       <footerbar></footerbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from "./components/common/navbar"
import footerbar from "./components/common/footerbar"
export default {
  data() {
    return {
         isShow:false
    }
  },
  components:{
    navbar,
    footerbar
  },
  methods:{
 
  }


}
</script>

<style>
*{
	margin: 0;
	padding: 0;
}

a{
	text-decoration: none;
}
</style>
