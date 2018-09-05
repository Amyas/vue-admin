<template>
  <div
    id="form-layout"
    ref="formLayout"
    @click="handleClickLayout">
    <div class="form-main" :class="mainClass">
      <h3 class="title">{{title}}-{{type | formType}}</h3>
      <div class="main" @keyup.enter="handleSubmit" @keyup.esc="handleCloseForm">
        <slot></slot>
      </div>
      <div class="footer">
        <el-button @click="handleCloseForm">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'type', 'form', 'submit', 'loading'],
  data () {
    return {
      mainClass: {
        fadeIn: true,
        fadeOut: false
      }
    }
  },
  filters: {
    formType (value) {
      if (!value) return ''

      if (value === 'create') {
        return '新增'
      } else if (value === 'update') {
        return '编辑'
      }
    }
  },
  methods: {
    async handleClickLayout (e) {
      if (e.target === this.$refs.formLayout) {
        this.handleCloseForm()
      }
    },
    async handleCloseForm () {
      this.mainClass.fadeIn = false
      this.mainClass.fadeOut = true

      await this.$delay(300)

      this.$refs.formLayout.style.transition = '0.2s'
      this.$refs.formLayout.style.opacity = 0

      await this.$delay(200)

      this.$emit('close')

      this.mainClass.fadeIn = true
      this.mainClass.fadeOut = false

      this.$refs.formLayout.style.transition = ''
      this.$refs.formLayout.style.opacity = 1
    },
    async handleSubmit () {
      this.form.validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch(this.submit, this.type)
            this.handleCloseForm()
          } catch (error) {
            console.warn(this.submit, error)
          }
        }
      })
    }
  },
  mounted () {

  },
  beforeDestroy () {
    this.$emit('close')
  }
}
</script>
<style lang="scss" scoped>
#form-layout {
  position: absolute;
  left: 200px;
  top: 0;
  width: calc(100% - 200px);
  min-width: 1200px;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.4);
  z-index: 99;

  .form-main {
    display: flex;
    flex-direction: column;

    position: absolute;
    left: -600px;
    top: 0;
    width: 600px;
    height: 100%;
    background-color: #fff;

    .title {
      position: relative;
      padding: 20px 40px;
      margin: 0;
      &::before{
        content: "";
        position: absolute;
        left: 20px;
        top: 15px;
        width: 4px;
        height: calc(100% - 30px);
        background: #409eff;
      }
    }
    .main {
      flex: 1;
      padding: 0 20px;
      overflow-y: auto;
    }
    .footer {
      padding: 20px;
      text-align: right;
    }
  }
}
.fadeIn {
  animation:fadeIn 0.3s forwards;
}
.fadeOut{
  animation:fadeOut 0.3s forwards;
}
@keyframes fadeIn {
  0%{
    left: -600px;
    opacity: 0;
  }
  100%{
    left: 0;
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    left: 0;
    opacity: 1;
  }
  100%{
    left: -600px;
    opacity: 0;
  }
}
</style>
