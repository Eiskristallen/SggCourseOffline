import vue from "vue";
import vuex from "vuex";

// 引入必要模块
// 注册插件
vue.use(vuex);
//组件间共享的数据item
const state = {
  items: [{ id: Date.now(), itemName: "吃饭", done: false }],
};

const getters = {
  //基于state的计算属性
  completionNum(state) {
    //getters里面数据都为只读
    //计算items内部以完成任务的数量
    return state.items.reduce((a, c) => {
      a += +c.done;
      return a;
    }, 0);
  },
};
//触发修改数据方法mutation的actions
const actions = {
  addItem({ commit }, item) {
    commit("ADDITEM", item);
  },
  deleteSingleItem({ commit }, itemID) {
    commit("DELETEESINGLEITEM", itemID);
  },
  deleteAllItem({ commit }) {
    commit("DELETEALLITEM");
  },
  changeDone({ commit }, itemID) {
    commit("CHANGEDONE", itemID);
  },
  doneAll({ commit }, done) {
    commit("DONEALL", done);
  },
};
//实际修改state数据的方法mutation
const mutations = {
  ADDITEM(state, item) {
    state.items.push(item);
  },
  DELETEESINGLEITEM(state, itemID) {
    state.items = state.items.filter((item) => item.id !== itemID);
  },
  DELETEALLITEM(state) {
    state.items = state.items.filter((item) => !item.done);
  },
  CHANGEDONE(state, itemID) {
    state.items.find((item) => {
      if (item.id === itemID) item.done = !item.done;
    });
  },

  DONEALL(state, done) {
    state.items.forEach((item) => {
      item.done = done;
    });
  },
};
//生成新的vuex store实例并把上面的几个对象放进去,并导出方便其他模块或组件引用
const store = new vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
export default store;
