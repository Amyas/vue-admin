<template>
  <el-container class="list-layout">
    <el-header>
      <div class="filter">
        <slot name="filter"></slot>
      </div>
      <div class="ctrl">
        <slot name="ctrl"></slot>
      </div>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
    <el-footer>
      <slot name="pagination"></slot>
    </el-footer>
  </el-container>
</template>
<style lang="scss">
.list-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .el-select+.el-select {
      margin-left: 10px;
    }
  }
  .el-main {
    flex: 1;
  }
  .el-footer {
    padding: 0;
    display: flex;
    align-items: flex-end;
  }
}
</style>
