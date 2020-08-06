<template>
  <div>
    hahahahahah
    <ul>
      <li v-for="message of messages" :key="message.id">
        <!-- 不知道为啥不能加/ -->
        <router-link :to="{ name: 'detail', params: { id: message.id } }">{{
          message.content
        }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    setTimeout(() => {
      const messages = [
        { id: 1, content: "message01" },
        { id: 2, content: "message02" },
        { id: 3, content: "message03" },
      ];
      this.messages = messages;
    }, 1000);
  },
};
</script>

<style scoped></style>
