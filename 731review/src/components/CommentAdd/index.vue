<template>
  <form class="form-horizontal" @submit.prevent="onSubmit">
    <div class="form-group">
      <label>用户名</label>
      <input type="text" class="form-control" placeholder="用户名" v-model="name" />
    </div>
    <div class="form-group">
      <label>评论内容</label>
      <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default pull-right">提交</button>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: ["addComment"],
  data() {
    return {
      name: "",
      content: "",
    };
  },
  methods: {
    onSubmit() {
      const name = this.name.trim();
      const content = this.content.trim();
      if (!name) {
        console.log("空串");
        return;
      }
      if (!content) {
        console.log("空内容");
        return;
      }

      this.addComment({ name, content });
      this.name = "";
      this.content = "";
    },
  },
};
</script>
<style scoped>
</style>