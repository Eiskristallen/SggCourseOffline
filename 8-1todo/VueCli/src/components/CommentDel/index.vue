<template>
  <div>
    <label>
      <input type="checkbox" v-model="ischeckAll" />
    </label>
    <span>
      <span>已完成{{ compeletNum }}</span>
      / 全部{{ targets.length }}
    </span>
    <button class="btn btn-danger" @click="deleteAll" v-show="!!compeletNum">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  props: ["targets", "checkAll", "deleteAllDone"],
  data() {
    return {};
  },
  methods: {
    deleteAll() {
      if (!confirm(`确定删除?`)) return;
      this.deleteAllDone();
    },
  },
  computed: {
    ischeckAll: {
      get() {
        return this.targets.length === 0
          ? false
          : this.compeletNum === this.targets.length;
      },
      set(val) {
        this.checkAll(val);
      },
    },
    compeletNum() {
      return this.targets.reduce((a, i, index) => {
        a += +i.whetherChecked;
        return a;
      }, 0);
    },
  },
};
</script>
<style scoped></style>
