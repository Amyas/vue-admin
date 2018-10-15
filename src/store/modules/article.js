import {fetchIndex, fetchRemove, fetchCreate, fetchUpdate} from '@/api/article'
import {MessageBox, Message} from 'element-ui'

const initForm = () => ({
  type: 'create',
  visible: false,
  loading: false,
  data: {
    title: '',
    content: '',
    intro: ''
  },
  rules: {
    title: [{required: true, message: '请输入标题!'}],
    intro: [{required: true, message: '请输入简介!'}],
    content: [{required: true, message: '请输入内容!'}]
  }
})

export default {
  namespaced: true,
  state: {
    list: {
      data: [],
      total: 0,
      loading: false
    },
    form: initForm()
  },
  getters: {

  },
  mutations: {
    SET_LIST (state, {items, total}) {
      state.list.data = items
      state.list.total = total
    },
    TOGGLE_FORM (state, [type, visible, data]) {
      if (type === 'update') {
        state.form.data = {
          ...initForm().data,
          ...data,
          checkPassword: data.password
        }
      } else if (type === 'create') {
        state.form.data = initForm().data
      }

      state.form.visible = visible
      state.form.type = type
    },
    SET_FORM_CONTENT (state, v) {
      state.form.data.content = v
    }
  },
  actions: {
    async index ({commit}, query) {
      try {
        const {items, total} = await fetchIndex(query)
        commit('SET_LIST', {items, total})
      } catch (error) {
        console.warn(error)
      }
    },
    async remove ({commit, dispatch, state}, id) {
      if (!id && !state.selectList.length) {
        return Message.warning('请选择要删除的数据!')
      }
      MessageBox
        .confirm('此操作将永久删除该数据,是否继续?', '提示', {type: 'warning'})
        .then(async _ => {
          try {
            await fetchRemove(id)
            Message.success('删除成功！')
            dispatch('index', this.state.route.query)
          } catch (error) {
            console.warn(error)
          }
        })
    },
    async create (ctx, data) {
      await fetchCreate(data)
    },
    async update (ctx, data) {
      const {_id, ...other} = data
      await fetchUpdate(_id, other)
    },
    async submit ({dispatch, state, rootState}, type) {
      const {data} = state.form
      data.author = rootState.login.userInfo.user._id
      await dispatch(type, data)
      Message.success(`文章${type === 'create' ? '创建' : '更新'}成功！`)
      await dispatch('index', this.state.route.query)
    }
  }
}
