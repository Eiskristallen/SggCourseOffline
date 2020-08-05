import Vue from "vue";
import Vuex from "vuex";
//Vuex 用来集中统一管理多个组件共享的数据
//state存储数据
//getter保存计算属性(依赖与别的数据)
//mutation用来直接修改数据
//actions用来触发修改数据的方法(实际调用mutation)
Vue.use(Vuex);
const state = {
  count: 0,
};
const getters = {
  accumulation(state) {
    return (state.count & 1) === 0 ? "偶数" : "奇数";
  },
};
const mutations = {
  INCREMENT(state, num) {
    state.count += +num;
  },
  DECREMENT(state, num) {
    state.count -= +num;
  },
  INCREMENTACYNC(state, num) {
    setTimeout(() => {
      state.count += +num;
    }, 1000);
  },
  INCREMENTODD(state, num) {
    if ((state.count & 1) === 0) return;
    state.count += +num;
  },
};
const actions = {
  increment({ state, commit }, num) {
    commit("INCREMENT", num);
  },
  decrement({ state, commit }, num) {
    commit("DECREMENT", num);
  },
  incrementacync({ state, commit }, num) {
    commit("INCREMENTACYNC", num);
  },
  incrementodd({ state, commit }, num) {
    commit("INCREMENTODD", num);
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
