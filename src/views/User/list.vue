<template>
  <list-layout>
    <el-button
      slot="ctrl"
      type="primary"
      @click="TOGGLE_FORM(['create',true])">
      新建用户
    </el-button>
    <el-table
      :data="list.data"
      v-loading="list.loading"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="编号"
        width="220">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="TOGGLE_FORM(['update',true,scope.row])">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <formComponent />
  </list-layout>
</template>
<script>
import listLayout from '@/layout/listLayout'
import formComponent from './form'
import Store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('user/index')
    next()
  },
  components: {
    listLayout,
    formComponent
  },
  computed: {
    ...mapState('user', ['list'])
  },
  methods: {
    ...mapActions('user', ['remove']),
    ...mapMutations('user', ['TOGGLE_FORM'])
  }
}
</script>
