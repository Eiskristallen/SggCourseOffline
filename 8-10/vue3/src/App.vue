<template>
  <Fragment>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <p>{{ state.count }}</p>
    <button @click="handle">Click me</button>
  </Fragment>
</template>

<script>
//ref用来创建响应式数据
//reactive可以定义复数个响应式数据
import { ref, reactive, toRefs } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
/*
Composition API 组合API
提供函数式编程

*/
export default {
  name: "App",
  //一开始进来的时候就会调用的方法1
  setup() {
    //会创建一个响应式数据,初始化值为我们写的值,返回值为调用方法后的值
    // const count = ref(0);
    // 定义的函数(原来的methods)也写在这里面,修改count要用valuee
    const handle = function () {
      state.count++;
    };
    const state = reactive({
      count: 0,
      num: 0,
    });

    //返回一个对象,该对象的所有属性,都会被添加到this上
    return {
      handle,
      // count,
      state,
      // ...toRefs
    };
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>
