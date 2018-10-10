<template>
	<div id="assTable">
		<el-table :data="tableList" border style="width: 100%">
      <el-table-column v-for="item in tableTitleList" :key="item"
        :prop="item.key"
        :label="item.title">
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
  export default {
		props: {
			tableList: Array,
			tableTitleList: Array
		},
    data() {
      return {
        // isCollapse: false
      };
		},
		mounted: {
			
		},
    methods: {
			
    }
  }
</script>
<style>
#assTable{
	width: 100%;
	float: left;
  box-shadow: 1px 1px 5px #989898;
}
</style>