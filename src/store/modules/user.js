import {fetchIndex, fetchRemove, fetchCreate, fetchUpdate, fetchRemoveBatch} from '@/api/user'
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
      total: 0,
      loading: false
    },
    selectList: [],
    form: initForm()
  },
  getters: {},
  mutations: {
    SET_LIST (state, {users, total}) {
      state.list.data = users
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
    SET_SELECT_LIST (state, v) {
      state.selectList = v
    }
  },
  actions: {
    async index ({commit}, query) {
      try {
        const {users, total} = await fetchIndex(query)
        commit('SET_LIST', {users, total})
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
            if (id) {
              await fetchRemove(id)
            } else {
              await fetchRemoveBatch(state.selectList)
            }
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
    async submit ({dispatch, state}, type) {
      const {data} = state.form

      await dispatch(type, data)
      Message.success(`用户${type === 'create' ? '创建' : '更新'}成功！`)
      await dispatch('index', this.state.route.query)
    }
  }
}
