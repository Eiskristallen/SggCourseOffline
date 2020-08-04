<template>
  <!-- 增加任务 -->
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="content" @keyup.enter="onEnter" />
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
    onEnter() {
      const content = this.content.trim();
      if (!content) return;
      // console.log(this.$bus);
      this.$bus.$emit("addTarget", {
        id: Date.now(),
        targetName: content,
        whetherChecked: false,
      });
      this.content = "";
    },
  },
};
</script>
<style scoped></style>
