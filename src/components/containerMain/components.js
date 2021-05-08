//建立上下文件关系
const files = require.context("../../view/", true, /\.jsx$/);
const components = []; //声明组件
// 循环文件
files.keys().forEach(key => {
  if (key.includes('./index/') || key.includes('./login/')) {
    return false
  }
  const splitFilesName = key.split('.')
  const jsonObj = {};
  const path = `/index${splitFilesName[1].toLowerCase()}`
  const component = files(key).default;
//   写入对象
  jsonObj.path = path
  jsonObj.component = component
  components.push(jsonObj)

})

export default components