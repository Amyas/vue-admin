<template>
  <quillEditor
    :content="conntent"
    :options="editorOptions"
    @change="onEditorChange($event)" />
</template>
<script>
import {quillEditor} from 'vue-quill-editor'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
  props: ['conntent'],
  data () {
    return {
      editorOptions: {
        placeholder: '输入正文...',
        modules: {
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          toolbar: [
            [
              'bold',
              'blockquote',
              'code-block',
              {'header': 1},
              {'list': 'ordered'}, {'list': 'bullet'},
              {'indent': '+1'},
              {'color': []},
              {'background': []},
              {'align': []},
              'image',
              'video',
              'clean'
            ]
          ]
        }
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange ({quill, html, text}) {
      this.$emit('editorChange', html)
    }
  }
}
</script>
