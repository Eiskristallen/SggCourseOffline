import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
  items: [{ id: Date.now(), content: "吃饭", done: false }],
};
const getters = {
  completionNum(state) {
    return state.items.reduce((accumulator, currentValue) => {
      accumulator += +currentValue.done;
      return accumulator;
    }, 0);
  },
};
const mutations = {
  ADDCONTENT(state, content) {
    state.items.push(content);
  },
  DELETECONTENT(state, itemID) {
    state.items = state.items.filter((item) => {
      return item.id != itemID;
    });
  },
  CHANGEDONE(state, val) {
    state.items.map((item) => {
      if (item.id === val.id) {
        item.done = val.done;
      }
    });
  },
  SELECTALL(state, val) {
    state.items.map((item) => {
      item.done = val;
    });
  },
  DELETEALLDONE(state) {
    state.items = state.items.filter((item) => {
      if (!item.done) {
        return true;
      }
      return false;
    });
  },
};
const actions = {
  addcontent({ commit }, content) {
    commit("ADDCONTENT", content);
  },
  deletecontent({ commit }, itemID) {
    commit("DELETECONTENT", itemID);
  },
  changedone({ commit }, val) {
    commit("CHANGEDONE", val);
  },
  selectAll({ commit }, val) {
    commit("SELECTALL", val);
  },
  deleteAllDone({ commit }) {
    commit("DELETEALLDONE");
  },
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
export default store;
