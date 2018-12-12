import en from './en'
import jp from './jp'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'jp',
  messages: {en, jp},
})
