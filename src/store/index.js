import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});
export default new Vuex.Store({
  state: {
    name: '',
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
  },
  actions: {
    setName({ commit }, name) {
      commit('setName', name);
    },
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
