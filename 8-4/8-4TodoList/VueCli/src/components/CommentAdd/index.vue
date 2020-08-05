<template>
  <!-- 增加任务 -->
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.prevent.enter="addNewContent"
      v-model="content"
    />
  </div>
</template>
<script>
import store from "../../Store";
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    addNewContent() {
      if (!this.content) return;
      this.$store.dispatch("addcontent", {
        id: Date.now(),
        content: this.content,
        done: false,
      });
      this.content = "";
    },
  },
  components: {
    store,
  },
};
</script>
<style scoped></style>
