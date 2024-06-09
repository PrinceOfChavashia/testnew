<script setup>
	import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <section class="container">
      	<nav>
      	  	<RouterLink to="/">Home</RouterLink>
      	  	<RouterLink to="/ready">Ready</RouterLink>
      	</nav>
    </section>
  <RouterView />
</template>

<style scoped>

</style>
