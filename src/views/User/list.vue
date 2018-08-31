<template>
  <list-layout>

    <template slot="filter">
      <el-select
        clearable
        placeholder="请选择"
        :value="$route.query.nickName"
        @change="val=>$changeQuery({key:'nickName',val})"  >
        <el-option
          v-for="item in nicknames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select
        clearable
        placeholder="请选择"
        :value="$route.query.username"
        @change="val=>$changeQuery({key:'username',val})"  >
        <el-option
          v-for="item in usernames"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>

    <template slot="ctrl">
      <el-button type="primary"
        @click="TOGGLE_FORM(['create',true])">
        新建用户
      </el-button>
      <el-button type="danger"
       @click="remove()">
       批量删除
      </el-button>
    </template>

    <el-table
      :data="list.data"
      v-loading="list.loading"
      stripe
      border
      @selection-change="SET_SELECT_LIST"
      style="width: 100%">
      <el-table-column type="selection" width="36"></el-table-column>
      <el-table-column prop="_id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | dateToString}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="TOGGLE_FORM(['update',true,scope.row])">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
    await Store.dispatch('user/index', to.query)
    next()
  },
  async beforeRouteUpdate (to, from, next) {
    await Store.dispatch('user/index', to.query)
    next()
  },
  data () {
    return {
      nicknames: [
        {label: '王建鹏', value: '王建鹏'},
        {label: '1', value: '1'}
      ],
      usernames: [
        {label: '11', value: '11'},
        {label: '1', value: '1'}
      ]
    }
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
    ...mapMutations('user', ['TOGGLE_FORM', 'SET_SELECT_LIST'])
  }
}
</script>
