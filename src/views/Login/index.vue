<template>
  <div class="login-box">
    <h3>登录</h3>
    <el-form ref="form" :model="formData" :rules="formRule">
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          clearable
          placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          clearable
          placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submit"
          :loading="formLoading"
          @click="submit($refs.form)">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters('login', ['formData', 'formRule', 'formLoading'])
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
