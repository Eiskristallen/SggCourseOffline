<template>
  <div>
    <li class="list-group-item">
      <div class="handle">
        <a href="javascript:;" @click="onDelete">删除</a>
      </div>
      <p class="user">
        <span>{{comment.name}}</span>
        <span>说:</span>
      </p>
      <p class="centence">{{comment.content}}</p>
    </li>
  </div>
</template>
<script>
export default {
  props: ["comment", "deleteComment"],
  methods: {
    onDelete() {
      this.deleteComment(this.comment.id);
    },
  },
};
</script>
<style scoped>
</style>