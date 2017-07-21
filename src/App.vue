<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
    <mu-back-top/>
  </div>
</template>

<script>
import TopBar from "./view/TopBar"
import BottomBar from "./view/BottomBar"
export default {
  name: 'app',
  components:{
    TopBar,
    BottomBar
  }
}
</script>

<style>
#app {
  font-family:'微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}
</style>
