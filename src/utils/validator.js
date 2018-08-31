import Store from '@/store'

export function userCheckPassword (rule, value, callback) {
  if (value !== Store.state.user.form.data.password) {
    return callback(new Error('两次密码输入不一致!'))
  }
  callback()
}

export function userPassword (rule, value, callback) {
  const {checkPassword} = Store.state.user.form.data
  if (value && checkPassword && value !== checkPassword) {
    return callback(new Error('两次密码输入不一致!'))
  }
  callback()
}
