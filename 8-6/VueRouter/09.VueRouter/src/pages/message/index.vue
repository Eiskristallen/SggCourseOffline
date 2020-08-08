<template>
  <div>
    hahahahahah
    <ul>
      <!-- li遍历请求回来的数据,把message.id作为params传给子路由,子路由根据id去找寻对应的要显示的内容 -->
      <li v-for="message of messages" :key="message.id">
        <router-link :to="{ name: 'detail', params: { id: message.id } }">
          {{ message.content }}</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  //模拟请求回来的数据
  data() {
    return {
      messages: [],
    };
  },
  created() {
    setTimeout(() => {
      const messages = [
        { id: 1, content: "wwwwww" },
        { id: 2, content: "ssssss" },
        { id: 3, content: "dddddd" },
      ];
      //请求的数据赋值给data,让页面能够显示
      this.messages = messages;
    }, 1000);
  },
};
</script>

<style scoped></style>
