<template>
  <div>
    <label>
      <!-- 给全部选中复选框绑定计算属性,get时判断completionNum如果等于items长度说明全部被选中,则返回true,反之返回false,set就把所有done改为true或者false -->
      <input type="checkbox" v-model="isAllDone" />
    </label>
    <span>
      <!-- 已完成数量就是completionNum,全部是length -->
      <span>已完成{{ $store.getters.completionNum }}</span>
      / 全部{{ $store.state.items.length }}
    </span>
    <!-- 绑定一个双向数据,如果有被选中的任务才显示,并绑定单击事件删除所有完成的item -->
    <button
      class="btn btn-danger"
      v-show="isACompletion"
      @click="deleteAllDone"
    >
      清除已完成任务
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    deleteAllDone() {
      //删除所有已完成任务
      this.$store.dispatch("deleteAllItem");
    },
  },
  computed: {
    isACompletion: {
      get() {
        //把completionNum转换成布尔直接返回,如不是0就为true
        return !!this.$store.getters.completionNum;
      },
    },
    isAllDone: {
      get() {
        return this.$store.state.items.length === 0
          ? false
          : this.$store.state.items.length ===
              this.$store.getters.completionNum;
      },
      set(isAllDone) {
        this.$store.dispatch("doneAll", isAllDone);
      },
    },
  },
};
</script>
<style scoped></style>
