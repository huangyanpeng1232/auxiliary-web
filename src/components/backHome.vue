<template>
  <div class="backHome">
    <router-link to="/">
      <input type="button" class="btn btn-info" value="返回">
    </router-link>
  </div>
</template>

<script>
export default {
  name: "backHome"
}
</script>

<style scoped>
.backHome{
  position: fixed;
  top: 15px;
  left: 30px;
}
</style>