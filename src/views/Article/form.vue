<template>
  <form-layout
    title="文章"
    submit="article/submit"
    :type="form.type"
    :form="$refs.form"
    :loading="form.loading"
    @close="TOGGLE_FORM(['CLOSE',false])">
    <el-form ref="form" :model="form.data" :rules="form.rules" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.data.title" v-focus></el-input>
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
    ...mapMutations('article', ['TOGGLE_FORM', 'SET_FORM_CONTENT'])
  }
}
</script>
