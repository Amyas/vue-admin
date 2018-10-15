<template>
  <list-layout>
    <template slot="ctrl">
      <el-button type="primary"
        @click="TOGGLE_FORM(['create',true])">
        新建文章
      </el-button>
    </template>

    <el-table
      :data="list.data"
      v-loading="list.loading"
      stripe
      border
      style="width: 100%">
      <el-table-column prop="_id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="intro" label="简介"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.created | dateToString}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.updated | dateToString}}</span>
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

    <formComponent v-if="form.visible" />
  </list-layout>
</template>
<script>
import listLayout from '@/layout/listLayout'
import formComponent from './form'
import Store from '@/store'
import {mapActions, mapState, mapMutations} from 'vuex'
export default {
  async beforeRouteEnter (to, from, next) {
    await Store.dispatch('article/index', to.query)
    next()
  },
  async beforeRouteUpdate (to, from, next) {
    await Store.dispatch('article/index', to.query)
    next()
  },
  components: {
    listLayout,
    formComponent
  },
  computed: {
    ...mapState('article', ['list', 'form'])
  },
  methods: {
    ...mapActions('article', ['remove']),
    ...mapMutations('article', ['TOGGLE_FORM'])

  }
}
</script>
