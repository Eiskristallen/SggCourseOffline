import Vue from "vue";
import Vuex from "vuex";
//Vuex 用来集中统一管理多个组件共享的数据
//state存储数据
//getter保存计算属性(依赖与别的数据)
//mutation用来直接修改数据
//actions用来触发修改数据的方法(实际调用mutation)

const state = {
  count: 0,
};
const getter = {
  accumulation(state) {
    return (state.count & 1) === 0 ? "偶数" : "奇数";
  },
};
const mutations = {
  INCREMENT(state) {
    state.count++;
  },
  DECREMENT(state) {
    state.count++;
  },
  INCREMENTACYNC(state) {
    setTimeout(() => {
      state.count++;
    }, 1000);
  },
  INCREMENTODD(state) {
    if ((state.count & 1) === 0) return;
    state.count++;
  },
};
const actions = {
  increment({ state, commit }) {
    commit.INCREMENT();
  },
  decrement({ state, commit }) {
    commit.DECREMENT();
  },
  decrementacync({ state, commit }) {
    commit.INCREMENTACYNC();
  },
  increment({ state, commit }) {
    commit.INCREMENTODD();
  },
};

const store = new Vuex.Store({
  state,
  getter,
  mutations,
  actions,
});
Vue.use(Vuex);
export default store;
