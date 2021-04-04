import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import config from '../config'

library.add(faTimes, faArrowUp, faArrowDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

if(config.googleAnalyticsId){
  Vue.use(VueAnalytics, {
    id: config.googleAnalyticsId
  })
}

new Vue({
  render: h => h(App),
}).$mount('#app')
