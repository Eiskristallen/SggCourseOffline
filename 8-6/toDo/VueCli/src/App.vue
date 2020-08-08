<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <CommentAdd />
      <ul class="todo-main">
        <!-- 遍历state的里面的数据,根据数据的个数生成对应的list li,每个的都要有对应的唯一key属性,并用props把item的对应信息给子组件 -->
        <CommentList
          v-for="item of $store.state.items"
          :key="item.id"
          :item="item"
        />
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
