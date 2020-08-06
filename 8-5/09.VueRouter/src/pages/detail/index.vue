<template>
  <div>
    <li>id: {{ detail.id }}</li>
    <li>content: {{ detail.content }}</li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: "",
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
      console.log(this.$route.params.id);
      const id = +this.$route.params.id;
      const detail = messages.find((message) => message.id === id);
      this.detail = detail;
    }, 1000);
  },
  watch: {
    $route(newVal) {
      const id = newVal.params.id;
      this.detail = this.messages.find((message) => message.id == id);
    },
  },
};
</script>

<style scoped>
</style>