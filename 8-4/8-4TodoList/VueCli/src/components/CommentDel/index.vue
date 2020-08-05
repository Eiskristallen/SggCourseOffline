<template>
  <div>
    <label>
      <input type="checkbox" v-model="whetherCompleted" />
    </label>
    <span>
      <span>已完成{{ $store.getters.completionNum }}</span>
      / 全部{{ $store.state.items.length }}
    </span>
    <button class="btn btn-danger" @click="deleteAllDone">
      清除已完成任务
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    deleteAllDone() {
      this.$store.dispatch("deleteAllDone");
    },
  },
  computed: {
    whetherCompleted: {
      get() {
        if (this.$store.state.items.length === 0) return;
        if (
          this.$store.getters.completionNum === this.$store.state.items.length
        ) {
          return true;
        }
        return false;
      },
      set(whetherCompleted) {
        this.$store.dispatch("selectAll", whetherCompleted);
      },
    },
  },
};
</script>
<style scoped></style>
