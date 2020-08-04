<template>
  <!-- 任务列表 -->
  <div>
    <li v-for="target of targets" :key="target.id">
      <label>
        <input type="checkbox" v-model="target.whetherChecked" />
        <span>{{ target.targetName }}</span>
      </label>
      <button
        class="btn btn-danger"
        style="display:none"
        v-show="isShow"
        @click="handleDelete(target.id)"
      >删除</button>
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: true,
      targets: [],
    };
  },
  mounted() {
    this.$bus.$on("addTarget", this.addTarget);
    this.$bus.$on("checkAll", this.checkAll);
    this.$bus.$on("deleteAllI", this.deleteAllI);
  },
  beforeDestroy() {
    this.$bus.$off("addTarget", this.addTarget);
    this.$bus.$off("checkAll", this.checkAll);
    this.$bus.$off("deleteAllI", this.deleteAllI);
  },
  methods: {
    checkAll(all) {
      this.targets.map((item) => {
        item.whetherChecked = all;
      });
      // console.log(this.targets);
    },
    addTarget(target) {
      this.targets = [target, ...this.targets];
      // this.targets.push(target);
      // console.log(this.targets);
    },
    deleteAllI() {
      this.targets = this.targets.filter((item) => {
        return false;
      });
    },
    // onHanderl(e) {
    //   // this.showDel(this.target.id);
    //   console.log(e.target.checked, this.target.id);
    //   this.showButton = e.target.checked;
    //   // this.modifyList(this.target.id, e.target.checked);
    // },
    handleDelete(id) {
      this.targets = this.targets.filter((item) => {
        return item.id != id;
      });
    },
  },
  computed: {
    completedNum: {
      get() {
        // let num = 0;
        // this.targets.map((item) => {
        //   if (item.whetherChecked) {
        //     num++;
        //   }
        // });
        let num = this.targets.filter((item) => item.whetherChecked).length;

        let length = this.targets.length;
        this.$nextTick(() => {
          this.$bus.$emit("getCompeletedNum", { num, length });
        });
        this.$bus.$emit(
          "checkAllChecked",
          this.targets.length === 0 ? false : this.targets.length === num
        );
        return num;
      },
      // if (targets.length === 0) return;
      // let num = 0;
      // this.targets.map((item) => {
      //   if (item.whetherChecked) {
      //     num++;
      //   }
      // });
      // if (num === targets.length) {
      //   this.$bus.$emit("checkAllChecked", true);
      // } else {
      //   this.$bus.$emit("checkAllChecked", false);
      // }
    },
  },
  watch: {
    completedNum: function () {},
    // // targets: function () {
    // //   this.$bus.$emit(
    // //     "getCompeletedNum",
    // //     this.completedNum,
    // //     this.targets.length
    // //   );
    // // },
  },
};
</script>
<style scoped></style>
