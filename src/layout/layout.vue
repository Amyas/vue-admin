<template>
  <el-container class="layout">
    <el-aside width="200px">
      <h3>王建鹏</h3>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#409eff"
        text-color="#fff">
        <template v-for="(item,index) in $router.options.routes">
          <el-submenu v-if="item.children" :index="item.name" :key="`item_${index}`">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.meta.routeName}}</span>
            </template>
            <template v-for="(subItem,subIndex) in item.children">
              <router-link :to="{name:subItem.name}" :key="`subItem_${subIndex}`">
                <el-menu-item :index="subItem.name">
                  {{subItem.meta.routeName}}
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
          <div v-else-if="item.name !== 'index'" :key="`item_${index}`">
            <router-link :to="item.path">
              <el-menu-item :index="item.name">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.meta.routeName}}</span>
              </el-menu-item>
            </router-link>
          </div>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="20px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <template v-for="(item, index) in $route.matched">
            <el-breadcrumb-item :key="index">{{item.meta.routeName}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-header>
      <el-main>
          <router-view></router-view>
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
    h3 {
      text-align: center;
    }
    .el-menu-item.is-active {
      color: #fff !important;
      background-color: rgba($color: #fff, $alpha: 0.2) !important;
    }
    .el-submenu__title i,
    .el-menu-item i {
      color: #fff !important;
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
</style>
