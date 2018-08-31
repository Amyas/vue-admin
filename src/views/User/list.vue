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
    <template slot="pagination">
      <el-pagination
        @size-change="val=>$changeQuery({key:'pageSize',val})"
        @current-change="val=>$changeQuery({key:'pageNumber',val})"
        :current-page="Number($route.query.pageNumber) || 1"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="Number($route.query.pageSize) || 20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total">
      </el-pagination>
    </template>
  </list-layout>
</template>
<script>
import listLayout from '@/layout/listLayout'
import formComponent from './form'
import Store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('user/index', to.query)
    next()
  },
  async beforeRouteUpdate (to, from, next) {
    await Store.dispatch('user/index', to.query)
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
