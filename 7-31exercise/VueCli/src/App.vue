<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="col-md-4">
        <CommentAdd :addComment="addComment" />
      </div>
      <div class="col-md-8">
        <!-- 使用props方案由父组件给子组件传递动态数据 
             如果不加:会直接当成字符串解析,要写:才会去实例对象上面找-->
        <CommentList :comments="comments" :deleteC="deleteComment" />
      </div>
    </div>
  </div>
</template>

<script>
//引入组件
import CommentAdd from "./components/CommentAdd";
import CommentList from "./components/CommentList";
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
    addComment({ name, content }) {
      this.comments.unshift({
        id: this.id++,
        name,
        content,
      });
    },
    deleteComment(commontID) {
      this.comments = this.comments.filter((item, index) => {
        return item.id != commontID;
      });
    },
  },
  components: {
    CommentAdd,
    CommentList,
  },
};
</script>

<style scoped></style>
