<template>
  <div id="AppVue">
    <my-header></my-header>
    <!-- <my-content></my-content> -->
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
  
  import Header from './components/common/Header.vue';
  import Footer from './components/common/Footer.vue';
  import Content from './components/content/Content.vue'
  export default {
    name: 'AppVue',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      'my-header':Header,
      'my-footer':Footer,
      'my-content':Content,
    }
  }
</script>

<style scoped>
#AppVue{
  background-color: #f5f7f9;
  display: flex;
  position: absolute;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;

}

</style>
