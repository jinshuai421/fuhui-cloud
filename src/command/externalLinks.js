/**
 *
 * @returns 其他项目的统一参数拼接
 */
export const getQeuryUrl = () => {
  let user = JSON.parse(localStorage.getItem('userInfo'))
  let faceUrl = user.faceUrl
  let loginTag = 'znm'
  let name = user.name
  let otherUserId = user.id
  let phone = user.phone
  return `?faceUrl=${faceUrl}&loginTag=${loginTag}&name=${name}&otherUserId=${otherUserId}&phone=${phone}`
}
