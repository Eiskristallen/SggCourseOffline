<template>
  <div>
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ completionNum }}</span>
      / 全部{{ 1 }}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheckAll: false,
    };
  },
  computed: {
    completionNum: {
      get() {
        if (!this.$bus.items) return 0;
        console.log(this.$bus.items);
        return this.$bus.items.reduce((a, c) => {
          a += +c.done;
          return a;
        }, 0);
        return num;
      },
      set() {},
    },
  },
};
</script>
<style scoped></style>
