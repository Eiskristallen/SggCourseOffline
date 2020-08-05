<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <CommentAdd />
      <ul class="todo-main">
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
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  mounted() {},
  computed: {},

  components: {
    CommentList,
    CommentDel,
    CommentAdd,
  },
};
</script>
<style scoped></style>
