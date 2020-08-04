<template>
  <div>
    <li class="list-group-item">
      <div class="handle">
        <a href="javascript:;">删除</a>
      </div>
      <p class="user">
        <span>{{ comment.name }}</span
        ><span>说:</span>
      </p>
      <p class="centence">{{ comment.content }}</p>
    </li>
  </div>
</template>

<script>
export default {
  //数组方案只要声明属性不需要类型
  props: ["comment"],
  data() {
    return {};
  },
  methods: {
    onDelete() {
      this.deleteC(this.comment.id);
    },
  },
};
</script>

<style scoped></style>
