<template>
  <div>
    <h3 class="reply">评论回复：</h3>
    <h2 style="display: none;">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <CommentDel
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>
// 此时数据在APP中,所以要把数据传给List组件

<script>
import CommentDel from "../CommentDel";

export default {
  data() {
    return {
      id: 3,
      comments: [
        {
          id: 1,
          name: "aaaaa",
          content: "ssssss",
        },
        {
          id: 2,
          name: "22aaaaa",
          content: "22ssssss",
        },
      ],
    };
  },
  methods: {
    addComment(comment) {
      this.comments.unshift(comment);
    },
  },
  mounted() {
    this.$globalEventBus.$on("addComment", function () {});
  },
  beforeDestroy() {
    this.$globalEventBus.$off("addComment", function () {});
  },
  //默认props属性组件不接受,如果需要接受的话,需要手动声明接受
  props: {
    //要声明接收的属性
    //key 接收的属性, value就是接受属性值的类型
    //此时组件实例对象上会有一个属性是xxx(props传递过来的属性)
    comments: Array,
    deleteC: Function,
  },
  components: {
    CommentDel,
  },
};
</script>

<style scoped></style>
