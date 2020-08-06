<template>
  <div>
    home....
    <ul>
      <li>
        <router-link to="message" class="list-group-item" active-class="active"
          >message</router-link
        >
      </li>
      <li>
        <router-link to="target" class="list-group-item" active-class="active"
          >target</router-link
        >
      </li>
    </ul>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
