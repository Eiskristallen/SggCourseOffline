<template>
  <div>
    <label>
      <input type="checkbox" v-model="ischeckAll" @change="checkAll1" />
    </label>
    <span>
      <span>已完成{{ obj.num}}</span>
      / 全部{{ obj.length }}
    </span>
    <button class="btn btn-danger" @click="deleteAll">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ischeckAll: false,
      obj: {},
    };
  },
  mounted() {
    this.$bus.$on("checkAllChecked", this.checkAllChecked);
    this.$bus.$on("getCompeletedNum", this.getCompeletedNum);
  },
  beforeDestroy() {
    this.$bus.$off("checkAllChecked", this.checkAllChecked);
    this.$bus.$off("getCompeletedNum", this.getCompeletedNum);
  },
  methods: {
    getCompeletedNum(val) {
      this.obj = val;
      // this.total = total;
      // this.completed = completed;
    },
    deleteAll() {
      if (!confirm(`确定删除?`)) return;
      this.deleteAllDone();
    },
    checkAllChecked(val) {
      this.ischeckAll = val;
      // console.log(val);
      // this.obj = val;
    },
    deleteAll() {
      this.$bus.$emit("deleteAllI");
    },
    checkAll1() {
      this.$bus.$emit("checkAll", this.ischeckAll);
    },
  },
  computed: {},
  // computed: {
  //   ischeckAll: {
  //     get() {
  //       return this.targets.length === 0
  //         ? false
  //         : this.compeletNum === this.targets.length;
  //     },
  //     set(val) {
  //       this.checkAll(val);
  //     },
  //   },
  //   compeletNum() {
  //     return this.targets.reduce((a, i, index) => {
  //       a += +i.whetherChecked;
  //       return a;
  //     }, 0);
  //   },
  // },
};
</script>
<style scoped></style>
