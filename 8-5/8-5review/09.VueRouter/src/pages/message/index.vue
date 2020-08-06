<template>
  <div>
    hahahahahah
    <ul>
      <li v-for="message of messages" :key="message.id">
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
        { id: 1, content: "1111111" },
        { id: 2, content: "1111111" },
        { id: 3, content: "1111111" },
      ];
      this.messages = messages;
    }, 1000);
  },
};
</script>

<style scoped></style>
