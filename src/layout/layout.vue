<template>
  <el-container class="layout">
    <el-aside width="200px">
      <h3>{{name}}</h3>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#409eff"
        text-color="#fff">
        <template v-for="(item,index) in $router.options.routes">

          <template v-if="item.children && item.children.length === 1">
            <router-link :to="item.path" :key="index">
              <el-menu-item :index="item.children[0].name">
                <i :class="item.meta.iconClass" style="padding-right:8px;"></i>
                <span slot="title">{{item.meta.routeName}}</span>
              </el-menu-item>
            </router-link>
          </template>

          <template v-else-if="item.children && item.children.length > 1">
            <el-submenu :index="item.name" :key="index">
              <template slot="title">
                <i :class="item.meta.iconClass" style="padding-right:8px;"></i>
                <span>{{item.meta.routeName}}</span>
              </template>
              <template v-for="(subItem,subIndex) in item.children">
                <router-link :to="{name:subItem.name}" :key="subIndex">
                  <el-menu-item :index="subItem.name">
                    {{subItem.meta.routeName}}
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </template>

        </template>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="20px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
            <transition-group name="breadcrumb" mode="in-out">
              <template v-for="(item, index) in $route.matched">
                <el-breadcrumb-item :key="index">{{item.meta.routeName}}</el-breadcrumb-item>
              </template>
            </transition-group>
        </el-breadcrumb>
      </el-header>
      <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  computed: {
    active () {
      const {matched} = this.$route
      return matched[matched.length - 1].name
    },
    name () {
      return this.$store.getters['login/userName']
    }
  }
}
</script>
<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  min-width: 1200px;
  .el-aside {
    color: #fff;
    background-color: #409eff;
    z-index: 999;
    h3 {
      text-align: center;
    }
    .el-menu {
      border-right: none;
    }
    .el-menu-item.is-active {
      color: #fff !important;
      background-color: rgba($color: #fff, $alpha: 0.2) !important;
    }
    .el-submenu__title i,
    .el-menu-item i {
      color: #fff !important;
    }
    .el-submenu .el-menu-item {
      padding-left: 50px !important;
    }
  }
  .content {
    flex: 1;
    padding: 20px;
  }
  .el-header {
    padding-left: 0;
    margin-bottom: 14px;
  }
  .el-main {
    height: 100%;
    padding: 0;
  }
  a {
    color: #fff;
    text-decoration: none;
  }

}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all .3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .3s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

</style>
