<template>
  <form-layout
    v-if="form.visible"
    title="文章"
    submit="article/submit"
    :type="form.type"
    :form="$refs.form"
    :loading="form.loading"
    @close="TOGGLE_FORM(['CLOSE',false])">
    <el-form ref="form" :model="form.data" :rules="form.rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.data.title" v-focus></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.data.content" type="textarea" rows="10"></el-input>
      </el-form-item>
    </el-form>
  </form-layout>
</template>
<script>
import formLayout from '@/components/form'
import {mapMutations, mapState} from 'vuex'
export default {
  computed: {
    ...mapState('article', ['form'])
  },
  components: {
    formLayout
  },
  methods: {
    ...mapMutations('article', ['TOGGLE_FORM'])
  }
}
</script>
