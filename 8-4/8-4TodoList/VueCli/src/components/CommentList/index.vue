<template>
  <!-- 任务列表 -->
  <li>
    <label>
      <input type="checkbox" v-model="isChecked" />
      <span>{{ item.content }}</span>
    </label>
    <button
      class="btn btn-danger"
      style="display:none"
      v-show="isChecked"
      @click="deleteItem"
    >
      删除
    </button>
  </li>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["item"],
  computed: {
    isChecked: {
      get() {
        return this.item.done;
      },
      set(isChecked) {
        this.$store.dispatch("changedone", {
          id: this.item.id,
          done: isChecked,
        });
      },
    },
  },
  methods: {
    deleteItem() {
      if (!confirm("确认删除?")) return;
      this.$store.dispatch("deletecontent", this.item.id);
    },
  },
  // watch: {
  //   isChecked: function() {},
  // },
};
</script>
<style scoped></style>
