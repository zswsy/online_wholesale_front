<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      text-color="white"
      active-text-color="#ffd04b"
      :unique-opened="unique"
    >
      <h3 class="Atitle">{{ IsCollapse ? "后台" : "线上批发后台管理" }}</h3>

      <template v-for="item in MenuData?MenuData:tabsData">
        <!-- 有二级菜单的渲染 -->
        <el-submenu
          v-if="item.children.length"
          :index="item.name"
          :key="item.name"
          class="submenu"
        >

          <template slot="title">
            <i :class="`${item.icon}`"></i>
            <span v-show="!IsCollapse">{{ item.name }}</span>
          </template>

          <el-menu-item
            v-for="item in item.children"
            :key="item.name"
            :index="item.name"
            style="padding-left: 60px"
            @click="handleMenuitem(item)"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <!-- 无二级菜单的渲染 -->
        <el-menu-item v-else 
          :index="item.name" 
          :key="item.label" 
          class="menu"
          @click="handleMenuitem(item)"
          >
          <template slot="title">
            <i :class="`${item.icon}`"></i>
            <span v-show="!IsCollapse">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import http from "../../utils/axios.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      tabsData: [],
      unique: true,
    };
  },
  
  methods: {

    //打开应用获取导航栏数据
    getMenuData() {
      const menu = localStorage.getItem(config.menuData);
      if (!menu) {
        //本地无导航栏数据则网络加载导航栏菜单
        this.$store.dispatch('getMenuData')
        this.tabsData=this.$store.state.Menu.menuList
      } else {
        this.$store.state.Menu.menuList = JSON.parse(localStorage.getItem(config.menuData));
      }
    },

    //点击一二级按钮跳转路由
    handleMenuitem(item){
      // console.log(this.$route.path)
      // console.log(item)
      //判断路由是否跳转当前路由
      if(this.$route.path!=item.path && !(this.$route.path==='/home' && item.path ==='/')){
        this.$router.push(item.path)
      }
      this.$store.commit('addBread',item)
      
      
    }
  },
  mounted() {
  },
  computed: {
    IsCollapse() {
      return this.$store.state.Menu.isCollapse;
    },

    MenuData(){
      return this.$store.state.Menu.menuList
    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: none;
  background-color: $asideColor;
  font-size: 18px;
  .menu {
    &:hover {
      background-color: #004a7c;
      color: #ffd04b;
    }
    i {
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      transition: ease-in-out 0.4s;
    }
  }

  ::v-deep .submenu {
    &:hover {
      // background-color: #004a7c;
      // color: #ffd04b;
    }
    .el-submenu__title {
      &:hover {
        background-color: #004a7c;
      }

      i {
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        transition: ease-in-out 0.4s;
      }
    }
    .el-menu--inline {
      background-color: $asideColor;
      .el-menu-item {
        &:hover {
          background-color: #004a7c;
        }
        padding-left: 50px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}

.is-active {
  background-color: $asideColor;
}

.Atitle {
  height: 65px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 65px;
}
</style>