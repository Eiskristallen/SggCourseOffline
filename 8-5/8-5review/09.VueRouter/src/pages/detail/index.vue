<template>
  <div>
    <ul>
      <li>{{ detail.id }}</li>
      <li>{{ detail.content }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
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
      const id = +this.$route.params.id;
      const detail = messages.find((item) => {
        return item.id === id;
      });
      console.log(detail);
      this.detail = detail;
    }, 1000);
  },
  watch: {
    $route(newVal) {
      const id = newVal.params.id;
      const detail = this.messages.find((item) => {
        return item.id === id;
      });
      this.detail = detail;
    },
  },
};
</script>

<style scoped></style>
