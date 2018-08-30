<template>
  <div class="login-box" @keyup.enter="submit($refs.form)">
    <h3>登录</h3>
    <el-form ref="form" :model="form.data" :rules="form.rules">
      <el-form-item prop="username">
        <el-input
          v-model="form.data.username"
          clearable
          v-focus
          placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="form.data.password"
          clearable
          placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submit"
          :loading="form.loading"
          @click="submit($refs.form)">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState('login', ['form'])
  },
  methods: {
    ...mapActions('login', ['submit'])
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  width: 240px;
  margin: 200px auto;

  .submit {
    width: 100%;
  }
}
</style>
