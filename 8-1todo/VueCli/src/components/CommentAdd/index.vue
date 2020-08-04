<template>
  <!-- 增加任务 -->
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="content"
      @keyup.enter="onEnter"
    />
  </div>
</template>
<script>
export default {
  props: ["addTarget"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    onEnter() {
      const content = this.content.trim();
      if (!content) return;
      this.addTarget({ content });
      this.content = "";
    },
  },
};
</script>
<style scoped></style>
