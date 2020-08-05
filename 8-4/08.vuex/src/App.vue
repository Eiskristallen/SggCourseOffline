<template>
  <div>
    <p>
      clicked: {{ count }} times, count is
      {{ accumulation }}
    </p>
    <select v-model="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      number: 1,
    };
  },

  methods: {
    increment() {
      this.$store.dispatch("increment", this.number);
      console.log(this.$store);
    },
    decrement() {
      this.$store.dispatch("decrement", this.number);
    },
    incrementIfOdd() {
      this.$store.dispatch("incrementodd", this.number);
    },
    incrementAsync() {
      this.$store.dispatch("incrementacync", this.number);
    },
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["accumulation"]),
  },
};
</script>

<style scoped></style>
