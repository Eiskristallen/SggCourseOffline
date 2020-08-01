<template>
  <h2 @click="handleClick" class="title">
    {{ title }}
  </h2>
</template>
<script>
export default {
  data() {
    return {
      title: "hello vue!!!",
    };
  },
  methods: {
    handleClick() {
      console.log(123);
    },
  },
};
</script>
//加上scope之后style之就只在当前组件生效,不加就是公共样式
<style scoped>
.title {
  color: red;
}
</style>
