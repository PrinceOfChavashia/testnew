<script setup>
    import { ref }             from 'vue'

    //icons import
    import   iconClear    from './icons/iconClear.vue'
    import   iconTodoBack from './icons/iconTodoBack.vue'

    //store
    import { useCounterStore } from '../store/index.js'
    const counter = useCounterStore()

    //props
    defineProps(['tasksReady', 'index'])
</script>

<template>
    <div class="todo">
        <div class="todo_foot">
            <button class="back" @click="counter.todoBack(index)">
                <iconTodoBack />
            </button>
            <button class="clear" @click="counter.clearTodo(index, 'ready')">
                <iconClear />
            </button>
        </div>
        <div class="checkbox-rect" v-for="(el, i) in tasksReady" :key="el">
            <div class="byfer">
                <input 
                    v-model="el.task" 
                    type="text" 
                    autocomplete="off"
                >
            </div> 
            <button class="clear" @click="counter.clearTask(index, i, 'old')">
                <iconClear />
            </button>
        </div>
    </div>
</template>