<template>
  <form-layout
    title="文章"
    :type="form.type"
    :formData="form.data"
    :validateParams="['content','title']"
    :loading="form.loading"
    width="100%"
    @submit="submit"
    @close="TOGGLE_FORM(['CLOSE',false])">
    <el-form ref="form" :model="form.data" :rules="form.rules" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.data.title" v-focus></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="form.data.intro" type="textarea" placeholder="为什么写这篇文章，从出现的问题和学习的角度写"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quillEditor :conntent="form.data.content" @editorChange="SET_FORM_CONTENT" />
      </el-form-item>
    </el-form>
  </form-layout>
</template>
<script>
import formLayout from '@/components/form'
import quillEditor from '@/components/quillEditor'
import {mapMutations, mapState} from 'vuex'
export default {
  computed: {
    ...mapState('article', ['form'])
  },
  components: {
    formLayout,
    quillEditor
  },
  methods: {
    ...mapMutations('article', ['TOGGLE_FORM', 'SET_FORM_CONTENT']),
    submit (cb) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            await this.$store.dispatch('article/submit', this.form.type)
            cb && cb()
          } catch (error) {
            console.warn(this.submit, error)
          }
        }
      })
    }
  }
}

</script>
