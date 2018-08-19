<template>
	<div id="MyAside">
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
		  <el-submenu index="1">
		    <template slot="title" class="ttt">
		      <i class="el-icon-location"></i>
		      <span slot="title">导航一</span>
		    </template>
		    <el-menu-item-group>
		      <span slot="title">分组一</span>
		      <el-menu-item index="1-1" v-on:click="goto('/main/menu1')">选项1</el-menu-item>
		      <el-menu-item index="1-2" v-on:click="goto('/main/menu2')">选项2</el-menu-item>
		    </el-menu-item-group>
		    <el-menu-item-group title="分组2">
		      <el-menu-item index="1-3">选项3</el-menu-item>
		    </el-menu-item-group>
		    <el-submenu index="1-4">
		      <span slot="title">选项4</span>
		      <el-menu-item index="1-4-1">选项1</el-menu-item>
		    </el-submenu>
		  </el-submenu>
		  <el-submenu index="2">
		  	<template slot="title">
		      <i class="el-icon-menu"></i>
		      <span slot="title">导航二</span>
		    </template>
		    <el-menu-item-group>
		      <span slot="title">分组一</span>
		      <el-menu-item index="2-1">选项1</el-menu-item>
		      <el-menu-item index="2-2">选项2</el-menu-item>
		    </el-menu-item-group>
		  </el-submenu>
		  <el-menu-item index="3" disabled>
		    <i class="el-icon-document"></i>
		    <span slot="title">导航三</span>
		  </el-menu-item>
		  <el-menu-item index="4">
		    <i class="el-icon-setting"></i>
		    <span slot="title">导航四</span>
		  </el-menu-item>
		</el-menu>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goto(key){
      	this.$router.push({ path: key})
      }
    }
  }
</script>
<style scoped>
#MyAside{
	display: -webkit-flex; /* Safari */
  	display: flex;
	/*flex:1;*/
	height: 100%;
	/*width: 200px;*/
	/*min-width: 200px;*/
	/*border-right: 0.5px solid rgba(52, 52, 52,0.5);*/
	background-color: #fff;
	width: 200px;
    min-height: 400px;
    flex-direction: column;
}
/*.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}*/

</style>