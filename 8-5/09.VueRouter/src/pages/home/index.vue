<template>
  <div>
    home....
    <ul>
      <li>
        <router-link class="list-group-item" to="/message" active-class="active"
          >message</router-link
        >
      </li>
      <li>
        <router-link class="list-group-item" to="/target" active-class="active"
          >target</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
