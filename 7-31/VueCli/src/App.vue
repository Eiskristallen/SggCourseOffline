<template>
  <!-- 定义vue的组件
  1.组件名称大驼峰命名法 2.后缀名.vue
  3.默认情况下都有一个公共应用主组件:App.vue
    他是最大的,最外层的组件
  4.组件内部有三个代码块:
   template:html
    caution:至少有一个根标签写在外面
   script:js
   style:css
   
   
   
   
   
   
   
   
   
   
   
  -->
  <div>
    <HelloVue></HelloVue>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
//默认暴露出去一个配置对象
export default {
  data() {
    return {
      title: "hello vue",
    };
  },
};
</script>
<style>
.title {
  color: aqua;
}
</style>
