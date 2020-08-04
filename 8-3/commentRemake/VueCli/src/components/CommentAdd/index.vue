<template>
  <form class="form-horizontal" @submit.prevent="postComment">
    <div class="form-group">
      <label>用户名</label>
      <input
        type="text"
        class="form-control"
        placeholder="用户名"
        v-model="name"
      />
    </div>
    <div class="form-group">
      <label>评论内容</label>
      <textarea
        class="form-control"
        rows="6"
        placeholder="评论内容"
        v-model="content"
      ></textarea>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default pull-right">
          提交
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      content: "",
    };
  },
  methods: {
    postComment() {
      const name = this.name.trim();
      const content = this.content.trim();
      if (!name) {
        //空串进入
        alert("用户名呢?");
        return;
      }
      if (!content) {
        //空串进入
        alert("评论呢?");
        return;
      }
      //将这里面的data数据添加到APP的data数据里面,然后APP会自动更新,然后评论就能出来了
      this.this.$globalEventBus.$emit("addComment", { name, content });
      this.name = "";
      this.content = "";
    },
  },
};
</script>

<style scoped></style>
