<template>
    <div :style="CompStyle">
      <div style="border-bottom: 2px solid #43b67a;float: left;padding-bottom: 26px;">
        <div style="font-size: 24px;">危险废物管理计划</div>
        <div style="font-size: 16px;text-align: right;">跨省运输确认</div>
      </div>
      <div class="content">
        <span>从一期监管平台的"查看跨省联单"功能中获取联单编号</span>
        <br>
        <span>将联单编号复制或输入到右侧相应输入框中</span>
        <br>
        <span>选择日期和牌照号</span>
      </div>
    </div>
</template>

<script>
export default {
    name:"LeftWrapper",
    props:{
        CompStyle:Object
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    padding-top: 42px;
    float: left;
    font-size: 10px;
}
</style>
