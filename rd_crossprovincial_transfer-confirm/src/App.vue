<template>
  <div id="app">
    <left-wrapper :CompStyle="LeftWrapperStyle" />
    <right-wrapper :CompStyle="RightWrapperStyle" />
  </div>
</template>

<script>
import LeftWrapper from "@/components/LeftWrapper"
import RightWrapper from "@/components/RightWrapper"

export default {
  name: 'App',
  components:{
    LeftWrapper,
    RightWrapper
  },
  data(){
    return {
      LeftWrapperStyle:{
        "background-color": "#fff",
        "padding": "45px 28px",
        
        "min-height": "400px"
      },
      RightWrapperStyle:{
        "background-color": "#f5f7f9",
        "box-sizing": "border-box",
        "padding": "40px 5%",
      }
    }
  }
}
</script>

<style>

body {
  margin:0px;
  padding:0px;
  overflow: hidden;
}

#app {
  display: grid;
  grid-template-columns: 360px auto;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

</style>
