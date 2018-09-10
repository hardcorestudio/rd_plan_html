<template>
	<div id='pageIncompatible'>
		<my-aside class="my-aside" :titleInfo="{}"></my-aside>
		<div id="pageIncompatibleArea">您当前使用的浏览器不支持本模块功能，建议使用360急速浏览器<br/>下载地址：<a href="https://browser.360.cn/ee/">https://browser.360.cn/ee/</a></div>
	</div>
</template>
<script>
import Aside from './Aside.vue'
export default {
	name:'pageIncompatible',
	data(){
		return {
		}
	},
	components:{
		'my-aside':Aside
	},
	mounted () {
		
	},
	methods: {
		
	}
}
</script>
<style>
#pageIncompatible{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex:1;
	flex-direction: row;
	justify-content:space-between;
	/*align-items:center;*/
	align-content:center;
	overflow-y: hidden;
}
#pageIncompatible >#MyAside{
	overflow-y: scroll
}
#pageIncompatibleArea{
	flex:1;
	width: 100%;
	padding: 40px 5%;
	height: 100%;
	box-sizing: border-box;
	overflow-y: scroll;
}	
</style>