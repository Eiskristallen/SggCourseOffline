<template>
  <div>
    <ul>
      <li v-for="person of persons" :key="person.id">{{ person.name }}</li>
    </ul>
    <child ref="child" />
  </div>
</template>
<script>
import child from "./components/childComponent";
export default {
  data() {
    // const targets = JSON.parse(localStorage.getItem("targets") || []);
    return {
      persons: [],
    };
  },

  mounted() {
    // this.$refs.child.$on("addPerson", this.addPerson);
    this.$bus.$on("addPerson", this.addPerson);
  },
  beforeDestroy() {
    this.$refs.child.$off("addPerson", this.addPerson);
  },
  methods: {
    addPerson(personInfor) {
      this.persons.push(personInfor);
    },
  },
  components: {
    child,
  },
};
</script>
<style scoped></style>
