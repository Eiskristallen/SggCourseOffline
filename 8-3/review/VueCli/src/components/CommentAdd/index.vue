<template>
  <!-- 增加任务 -->
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="content"
      @keyup.prevent.enter="addItem"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    addItem() {
      const content = this.content.trim();
      this.$bus.$emit("addItems", {
        id: Date.now(),
        itemName: content,
        done: false,
      });
    },
  },
};
</script>
<style scoped></style>
