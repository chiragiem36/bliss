// import something here

import resource from 'vue-resource'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(resource)
}
