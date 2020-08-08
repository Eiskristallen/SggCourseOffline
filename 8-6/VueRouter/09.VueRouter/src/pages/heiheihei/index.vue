<template>
  <div>
    <ul>
      <li v-show="happy">😜 😜 😜 😜 😜 😜</li>
      <li v-show="cry">😭😭😭😭😭😭😭😭</li>
      <li v-show="anger">😠😠😠😠😠😠😠😠😠</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      happy: true,
      cry: false,
      anger: false,
    };
  },
  created() {
    console.log(+this.$route.params.id);
    switch (+this.$route.params.id) {
      case 1:
        (this.happy = true), (this.cry = false), (this.anger = false);
        break;

      case 2:
        (this.happy = false), (this.cry = true), (this.anger = false);
        break;
      case 3:
        (this.happy = false), (this.cry = false), (this.anger = true);
        break;
    }
  },
  watch: {
    $route(newVal) {
      switch (+newVal.params.id) {
        case 1:
          (this.happy = true), (this.cry = false), (this.anger = false);
          break;

        case 2:
          (this.happy = false), (this.cry = true), (this.anger = false);
          break;
        case 3:
          (this.happy = false), (this.cry = false), (this.anger = true);
          break;
      }
    },
  },
};
</script>

<style scoped></style>
