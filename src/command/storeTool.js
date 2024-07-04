function getAppCode() {
  let code = /[0-9]/.test(location.hostname)
    ? 'ljkc'
    : location.pathname.split('/')[1]
  return code || 'ljkc'
}

export const getCookie = function (key) {
  const splits = document.cookie.split(';')
  let obj = {}
  splits.forEach((e) => {
    const keys = e.split('=')
    obj[keys[0].trim()] = keys[1]
  })
  return obj[key]
}

export const auth = {
  key: 'auth',
  set(auth) {
    let appCode = getAppCode()
    localStorage.setItem(appCode, auth.access_token)
  },
  get() {
    let appCode = getAppCode()
    return {
      tokenType: 'bearer',
      token: localStorage.getItem(appCode)
    }
  },
  remove() {
    let appCode = getAppCode()
    localStorage.setItem('historyUrl', location.href)
    localStorage.removeItem(appCode)
  },
  setPhone(phone) {
    localStorage.setItem('auth_phone', phone)
  },
  getPhone() {
    return localStorage.getItem('auth_phone')
  }
}

export default {
  auth
}
