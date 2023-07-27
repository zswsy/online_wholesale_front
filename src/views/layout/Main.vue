<template>
  <div class="box">
    <el-container style="width: 100%;height: 100%;">
      <el-aside :width="getWidth">
        <AsideTabs></AsideTabs>
      </el-aside>
      <el-container>
        <el-header style="height: 65px;">
          <Header></Header>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import AsideTabs from '../../components/aside/asideTabs.vue';
import Header from '../../components/header/header.vue';

export default {
    components:{
        AsideTabs,
        Header,
    },
    computed:{
      getWidth(){
        return this.$store.state.Menu.menuWidth
      },
    },
    mounted(){
      console.log(this.$router,'this.router')
      this.$store.commit('dynamicAddRouter',this.$router)
    }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}

::v-deep .el-header{
    background-color: $headerColor;
    color: white;
    // text-align: center;
    // line-height: 60px;
  }
  
  .el-aside {
    background-color: $asideColor;
    color: #333;
    transition: ease-in-out .4s;
    min-height: 713px;
    // text-align: center;
    // line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // max-height: 91%;
    min-height: 648px;
    // overflow: scroll;
    // text-align: center;
    // line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    width: 100%;
    height: 100%;
  }
  
</style>

