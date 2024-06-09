<script setup>
    import { ref }             from 'vue'

    //icons import
    import   iconClear         from './icons/iconClear.vue'

    //store
    import { useCounterStore } from '../store/index.js'
    const counter = useCounterStore()

    //props
    defineProps(['tasksProgress', 'tasksReady', 'index'])
</script>

<template>
    <div class="todo">
        <p class="title">TODO</p>
        <div class="checkbox-rect" v-for="(el, i) in tasksProgress" :key="el">
            <div class="byfer">
                <input
                    @click="counter.checkTask(index, i, 'ready')" 
                    type="checkbox" 
                    :id="'ready'+index+'_'+i" 
                    name="check"
                >
                <label :for="'ready'+index+'_'+i"></label>
                <input 
                    v-model="el.task" 
                    type="text" 
                    autocomplete="off"
                >
            </div> 
            <button class="clear" @click="counter.clearTask(index, i, 'progress')">
                <iconClear />
            </button>
        </div>
        <div class="todo_foot">
            <div class="todo_foot_left">
                <div class="checkbox-rect">
                    <div class="byfer">
                        <input
                            @click="counter.checkTodo(index)"  
                            type="checkbox" 
                            :id="index" 
                            name="check">
                        <label :for="index"></label>
                    </div> 
                </div>
                <input 
                    type="text" 
                    autocomplete="off" 
                    placeholder="+ Добавить элемент"
                    v-model="counter.newTasksMass[index].newTask"
                    @keyup.enter="counter.taskAdd(index)"
                >
            </div>
            <button class="clear" @click="counter.clearTodo(index, 'progress')">
                <iconClear />
            </button>
        </div>
        <p class="title" v-if="tasksReady.length != 0">READY</p>
        <div class="checkbox-rect todo_ready" v-for="(el, i) in tasksReady" :key="el">
            <div class="byfer">
                <input
                    @click="counter.checkTask(index, i, 'progress')" 
                    type="checkbox" 
                    :id="'progress'+index+'_'+i" 
                    name="check"
                    checked
                >
                <label :for="'progress'+index+'_'+i"></label>
                <input 
                    v-model="el.task" 
                    type="text" 
                    autocomplete="off"
                >
            </div> 
            <button class="clear" @click="counter.clearTask(index, i, 'ready')">
                <iconClear />
            </button>
        </div>
    </div>
</template>