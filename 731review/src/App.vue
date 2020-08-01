<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="col-md-4">
        <CommentAdd :addComment="addComment" />
      </div>
      <div class="col-md-8">
        <CommentList :comments=" comments" :deleteComment="deleteComment" />
      </div>
    </div>
  </div>
</template>
<script>
import CommentAdd from "./components/CommentAdd";
import CommentList from "./components/CommentList";
export default {
  data() {
    return {
      id: 3,
      comments: [
        {
          id: 1,
          name: "老王",
          content: "隔壁老王",
        },
        {
          id: 2,
          name: "老李",
          content: "隔壁老李",
        },
      ],
    };
  },
  methods: {
    addComment({ name, content }) {
      this.comments.unshift({
        id: this.id++,
        name,
        content,
      });
    },
    deleteComment(commentID) {
      this.comments = this.comments.filter((item, index) => {
        return item.id != commentID;
      });
    },
  },
  //注册组件
  components: {
    CommentAdd,
    CommentList,
  },
};
</script>
<style scoped></style>