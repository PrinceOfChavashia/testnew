<script setup>
    //store
    import { useCounterStore } from '../store/index.js'
    const counter = useCounterStore()

    //icon import
    import iconTodoAdd  from '../components/icons/iconTodoAdd.vue'

    //component import
    import todoProgress from '../components/todoProgress.vue'
</script>

<template>
    <section class="container progress">
        <transition-group name="anim_todo">
            <todoProgress 
                v-for="(el, index) in counter.progress" :key="el"
                :index="index"
                :tasksProgress="el.tasksProgress"
                :tasksReady="el.tasksReady"
            />
        </transition-group>
        <button @click="counter.todoAdd">
            <iconTodoAdd />
        </button>
    </section>
</template>