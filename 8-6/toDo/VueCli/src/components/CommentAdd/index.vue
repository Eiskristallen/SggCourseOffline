<template>
  <!-- 增加任务 -->
  <div class="todo-header">
    <!-- 绑定键盘enter键抬起事件,把输入内容放入items -->
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.prevent.enter="addNewItem"
      v-model="content"
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
    addNewItem() {
      //键盘事件,抬起把新定义的content内容包装成对象push到state.items里面
      const content = this.content.trim();
      //判断trim之后是否为空串,如为空串则直接无效
      if (!content) return;
      this.$store.dispatch("addItem", {
        id: Date.now(),
        itemName: content,
        done: false,
      });
      //清空输入框
      this.content = "";
    },
  },
};
</script>
<style scoped></style>
