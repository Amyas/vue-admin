<template>
  <form-layout
    v-if="form.visible"
    title="用户"
    submit="user/submit"
    :type="form.type"
    :form="$refs.form"
    :loading="form.loading"
    @close="TOGGLE_FORM(['CLOSE',false])">
    <el-form ref="form" :model="form.data" :rules="form.rules">
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.data.nickName" v-focus></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.data.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.data.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="form.data.checkPassword"></el-input>
      </el-form-item>
    </el-form>
  </form-layout>
</template>
<script>
import formLayout from '@/components/form'
import {mapMutations, mapState} from 'vuex'
export default {
  computed: {
    ...mapState('user', ['form'])
  },
  components: {
    formLayout
  },
  methods: {
    ...mapMutations('user', ['TOGGLE_FORM'])
  }
}
</script>
