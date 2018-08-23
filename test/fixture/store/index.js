import VuexPersist from '@@/lib/vuex-persist'

export const state = () => ({

  myState: 'Welcome!'

})

export const mutations = {
  changeState (state, value) {
    state.myState = value
  }
}

export const plugins = [VuexPersist({
  storage: (typeof window !== 'undefined' ? window.localStorage : {}),
  expireAfter: 10
})]
