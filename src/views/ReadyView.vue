<script setup>
	//component import
	import todoReady from '../components/todoReady.vue'

	//store
    import { useCounterStore } from '../store/index.js'
    const counter = useCounterStore()
</script>

<template>
	<section class="container progress">
		<transition-group name="anim_todo">
			<todoReady 
				v-for="(el, index) in counter.ready" :key="el"
				:index="index"
				:tasksReady = "el.tasksReady"
			/>
		</transition-group>
	</section>
</template>

<style scoped>
</style>
