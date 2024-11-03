import { ref, watch, onMounted, reactive, computed }  from 'vue';
import { defineStore }                                from 'pinia';

export const useCounterStore = defineStore('counter', () => {
	const progress     = ref([]);
	const ready        = ref([]);
	const newTasksMass = ref([]);
	
	onMounted(() => { initialization()})
	
	const initialization = ()=>{
		if(JSON.parse(localStorage.getItem('progress')) !== null){
			progress.value = JSON.parse(localStorage.getItem('progress'));
		}
		
		if(JSON.parse(localStorage.getItem('newTasksMass')) !== null){
			newTasksMass.value = JSON.parse(localStorage.getItem('newTasksMass'));
		}

		if(JSON.parse(localStorage.getItem('ready')) !== null){
			ready.value = JSON.parse(localStorage.getItem('ready'));
		}
	}
	const localStoreProgress = ()=>{
		localStorage.setItem('progress', JSON.stringify(progress.value));
		localStorage.setItem('newTasksMass', JSON.stringify(newTasksMass.value));
		localStorage.setItem('ready', JSON.stringify(ready.value));
	}
	const todoAdd = ()=>{
		progress.value.push({tasksProgress:[], tasksReady:[]});
		newTasksMass.value.push({newTask: ''});
	}
	const taskAdd = (index)=>{
		let newTask = newTasksMass.value[index].newTask;
		if(newTask === ''){
			return;
		}
		else{
			progress.value[index].tasksProgress.push({task: newTask});
			newTasksMass.value[index].newTask="";
		}
		progressСhange();
	}
	const checkTask = (index, i, type)=>{
		if(type === 'ready'){
			let task = progress.value[index].tasksProgress[i];
        	progress.value[index].tasksReady.push(task);
        	progress.value[index].tasksProgress.splice(i, 1);
		}
		else{
			let task = progress.value[index].tasksReady[i];
        	progress.value[index].tasksProgress.push(task);
        	progress.value[index].tasksReady.splice(i, 1);
		}
		progressСhange();

	}
	const checkTodo = (index)=>{
		progress.value[index].tasksProgress.forEach(element => {
			progress.value[index].tasksReady.push(element);
		})
		progress.value[index].tasksProgress.splice(0, progress.value[index].tasksProgress.length);
		progressСhange();
	}
	const clearTask = (index, i, type)=>{
		if(type === 'progress'){
			progress.value[index].tasksProgress.splice(i, 1);
		}
		else if(type === 'old'){
			ready.value[index].tasksReady.splice(i, 1);
		}
		else{
			progress.value[index].tasksReady.splice(i, 1);
		}
		progressСhange();
		deleteReady();
	}
	const clearTodo = (index, type)=>{
		if(type == 'progress'){
			progress.value.splice(index, 1);
			newTasksMass.value.splice(index, 1);
		}
		else{
			ready.value.splice(index, 1);
		}
		progressСhange();
		deleteReady();
	}
	const todoBack = (index)=>{
		ready.value[index].tasksReady.forEach(element => {
			ready.value[index].tasksProgress.push(element);
		})
		ready.value[index].tasksReady.splice(0, ready.value[index].tasksReady.length);
		progress.value.push(ready.value[index]);
		newTasksMass.value.push({newTask: ''});
		ready.value.splice(index, 1);
		progressСhange();
		deleteReady();
	}
	const progressСhange = () => {
		progress.value.forEach((element, index) => {
			if(element.tasksProgress.length == 0 && element.tasksReady.length != 0){
				ready.value.push(progress.value[index]);
				progress.value.splice(index, 1);
				newTasksMass.value.splice(index, 1);
			}
		})
		localStoreProgress();
	}
	const deleteReady = () => {
		ready.value.forEach((element, index) => {
			if(element.tasksReady.length == 0){
				ready.value.splice(index, 1);
			}
		})
		localStoreProgress();
	}

	return { progress, ready, newTasksMass, initialization, todoAdd, taskAdd, checkTask, checkTodo, clearTask, clearTodo, todoBack }
})
