<template>
	<div id='MyHeader'>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
		 background-color="#b3c0d1"
		 active-text-color="#fff"
		  @select="handleSelect">
		  <el-menu-item index="1" v-on:click="goto('/')">处理中心</el-menu-item>
		  <el-submenu index="2">
		    <template slot="title">我的工作台</template>
		    <el-menu-item index="2-1">选项1</el-menu-item>
		    <el-menu-item index="2-2">选项2</el-menu-item>
		    <el-menu-item index="2-3">选项3</el-menu-item>
		    <el-submenu index="2-4">
		      <template slot="title">选项4</template>
		      <el-menu-item index="2-4-1">选项1</el-menu-item>
		      <el-menu-item index="2-4-2">选项2</el-menu-item>
		      <el-menu-item index="2-4-3">选项3</el-menu-item>
		    </el-submenu>
		  </el-submenu>
		  <el-menu-item index="3" v-on:click="goto('/page404')">404页面</el-menu-item>
		  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
		</el-menu>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goto(key){
      	this.$router.push(key);
      }
    }
  }
</script>
<style scoped>
#MyHeader{
	background-color: #b3c0d1;
	display: -webkit-flex; /* Safari */
  	display: flex;
	margin:0;
	height: 64px;
	min-height: 48px;
	/*border-bottom: 0.5px solid rgba(52, 52, 52,0.5);*/
	justify-content: center;
	align-items: center;
	/*background-color: #fff;*/
	-moz-box-shadow: 0px 0px 1px #888888; /* 老的 Firefox */
	box-shadow: 0px 0px 1px #888888;
}
.el-menu--horizontal {
	border-bottom:none;
}

</style>