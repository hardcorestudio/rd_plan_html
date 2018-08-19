<template>
	<div id='MyContent'>
		<my-aside class="my-aside"></my-aside>
		<my-main class="my-main"></my-main>
	</div>
</template>
<script>
	import Aside from './Aside.vue';
	import Main from './Main.vue';
	export default {
		name:'MyContent',
		data(){
			return {
				'xxx':''
			}
		},
		components:{
			'my-aside':Aside,
			'my-main':Main
		}
	}
</script>
<style scoped>
#MyContent{
	display: -webkit-flex; /* Safari */
  	display: flex;
  	flex:1;
  	flex-direction: row;
  	justify-content:space-between;
  	/*align-items:center;*/
  	align-content:center;
}
</style>