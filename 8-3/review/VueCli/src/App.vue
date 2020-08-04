<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <CommentAdd />
      <ul class="todo-main">
        <CommentList />
      </ul>
      <div class="todo-footer">
        <CommentDel />
      </div>
    </div>
  </div>
</template>
<script>
import CommentList from "./components/CommentList";
import CommentDel from "./components/CommentDel";
import CommentAdd from "./components/CommentAdd";

export default {
  components: {
    CommentList,
    CommentDel,
    CommentAdd,
  },
};
</script>
<style scoped></style>
