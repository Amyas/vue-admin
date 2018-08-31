import {fetchIndex, fetchRemove, fetchCreate, fetchUpdate} from '@/api/user'
import {MessageBox, Message} from 'element-ui'
import {userCheckPassword, userPassword} from '@/utils/validator'

const initForm = () => ({
  type: 'create',
  visible: false,
  loading: false,
  data: {
    nickName: '',
    username: '',
    password: '',
    checkPassword: ''
  },
  rules: {
    nickName: [{required: true, message: '请输入昵称!'}],
    username: [{required: true, message: '请输入账号!'}],
    password: [
      {required: true, message: '请输入密码!'},
      {validator: userPassword}
    ],
    checkPassword: [
      {required: true, message: '请输入密码!'},
      {validator: userCheckPassword}
    ]
  }
})

export default {
  namespaced: true,
  state: {
    list: {
      data: [],
      total: 200,
      pageSize: 20,
      loading: false
    },
    form: initForm()
  },
  getters: {},
  mutations: {
    SET_LIST (state, v) {
      state.list.data = v
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
    }
  },
  actions: {
    async index ({commit}, query) {
      try {
        const {users} = await fetchIndex(query)
        commit('SET_LIST', users)
      } catch (error) {

      }
    },
    async remove ({commit, dispatch}, id) {
      MessageBox
        .confirm('此操作将永久删除该数据,是否继续?', '提示', {type: 'warning'})
        .then(async _ => {
          try {
            await fetchRemove(id)
            Message.success('用户删除成功！')
            dispatch('index')
          } catch (error) {
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
    async submit ({dispatch, state}, type) {
      const {data} = state.form

      await dispatch(type, data)
      Message.success(`用户${type === 'create' ? '创建' : '更新'}成功！`)
      await dispatch('index')
    }
  }
}
