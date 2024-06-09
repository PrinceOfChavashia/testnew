import { ref, watch, onMounted, reactive, computed }  from 'vue';
import { defineStore }                                from 'pinia';

// export const useCounterStore = defineStore('counter', () => {
// 	const progress     = reactive([]);
// 	const ready        = reactive([]);
// 	const newTasksMass = reactive([]);

// 	onMounted(() => {
// 		initialization();
// 		//localStoreProgress();
// 	})
	
// 	const initialization = ()=>{
// 		if(JSON.parse(localStorage.getItem('progress')) !== null){
// 			progress = JSON.parse(localStorage.getItem('progress'));
// 			console.log(progress);
// 		}
// 		if(JSON.parse(localStorage.getItem('newTasksMass')) !== null){
// 			newTasksMass = JSON.parse(localStorage.getItem('newTasksMass'));
// 			console.log('initialization')
// 		}
// 		if(JSON.parse(localStorage.getItem('ready')) !== null){
// 			ready = JSON.parse(localStorage.getItem('ready'));
// 			console.log('initialization')
// 		}
// 	}
// 	const localStoreProgress = ()=>{
// 		localStorage.setItem('progress', JSON.stringify(progress));
// 		localStorage.setItem('newTasksMass', JSON.stringify(newTasksMass));
// 		localStorage.setItem('ready', JSON.stringify(ready));
// 	}
// 	const todoAdd = ()=>{
// 		progress.push({tasksProgress:[], tasksReady:[]});
// 		newTasksMass.push({newTask: ''});
// 	}
// 	const taskAdd = (index)=>{
// 		let newTask = newTasksMass[index].newTask;
// 		if(newTask === ''){
// 			return;
// 		}
// 		else{
// 			progress[index].tasksProgress.push({task: newTask});
// 			newTasksMass[index].newTask="";
// 		}
// 	}
// 	const checkTask = (index, i, type)=>{
// 		if(type === 'ready'){
// 			let task = progress[index].tasksProgress[i];
//         	progress[index].tasksReady.push(task);
//         	progress[index].tasksProgress.splice(i, 1);
// 		}
// 		else{
// 			let task = progress[index].tasksReady[i];
//         	progress[index].tasksProgress.push(task);
//         	progress[index].tasksReady.splice(i, 1);
// 		}
// 		//console.log(progress);
// 	}
// 	const checkTodo = (index)=>{
// 		progress[index].tasksProgress.forEach(element => {
// 			progress[index].tasksReady.push(element);
// 		})
// 		progress[index].tasksProgress.splice(0, progress[index].tasksProgress.length);
// 	}
// 	const clearTask = (index, i, type)=>{
// 		if(type === 'progress'){
// 			progress[index].tasksProgress.splice(i, 1);
// 		}
// 		else if(type === 'old'){
// 			ready[index].tasksReady.splice(i, 1);
// 		}
// 		else{
// 			progress[index].tasksReady.splice(i, 1);
// 		}
// 	}
// 	const clearTodo = (index, type)=>{
// 		if(type == 'progress'){
// 			progress.splice(index, 1);
// 			newTasksMass.splice(index, 1);
// 		}
// 		else{
// 			ready.splice(index, 1);
// 		}
// 	}
// 	const todoBack = (index)=>{
// 		ready[index].tasksReady.forEach(element => {
// 			ready[index].tasksProgress.push(element);
// 		})
// 		ready[index].tasksReady.splice(0, ready[index].tasksReady.length);
// 		progress.push(ready[index]);
// 		newTasksMass.push({newTask: ''});
// 		ready.splice(index, 1);
// 	}

// 	watch(progress, (progressNew) => {
// 		progressNew.forEach((element, index) => {
// 			if(element.tasksProgress.length == 0 && element.tasksReady.length != 0){
// 				ready.push(progress[index]);
// 				progress.splice(index, 1);
// 				newTasksMass.splice(index, 1);
// 			}
// 		})
// 	},{immediate:true})
// 	watch(ready, (readyNew) => {
// 		readyNew.forEach((element, index) => {
// 			if(element.tasksReady.length == 0){
// 				ready.splice(index, 1);
// 			}
// 		})
// 	},{immediate:true}) 
// 	watch([progress, ready], () => {
// 		localStoreProgress();
// 	},{immediate:true})

// 	return { progress, ready, newTasksMass, initialization, todoAdd, taskAdd, checkTask, checkTodo, clearTask, clearTodo, todoBack }
// })





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
		console.log(progress)
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
		//console.log(progress);

	}
	const checkTodo = (index)=>{
		progress.value[index].tasksProgress.forEach(element => {
			progress.value[index].tasksReady.push(element);
		})
		progress.value[index].tasksProgress.splice(0, progress.value[index].tasksProgress.length);
		progressСhange();
		//console.log("progressDO");
		//console.log(progress);
		//progress = JSON.parse(localStorage.getItem('progress'));
		//console.log("progressPost");
		//console.log(progress);
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

	// const newProgress = computed(() => {
	// 	progress.value.forEach((element, index) => {
	// 		if(element.tasksProgress.length == 0 && element.tasksReady.length != 0){
	// 			//ready.value.push(progress.value[index]);
	// 			//progress.value.splice(index, 1);
	// 			//newTasksMass.value.splice(index, 1);
	// 			console.log('gbhgbjvnfjvnff')
	// 		}//
	// 	})
	// 	console.log('gbhgbjvnfjvnff')
	// 	return progress
	// })

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


	//watch(progress.value, (progressNew) => {
	//	progressNew.forEach((element, index) => {
	//		if(element.tasksProgress.length == 0 && element.tasksReady.length != 0){
	//			ready.value.push(progress.value[index]);
	//			progressNew.splice(index, 1);
	//			newTasksMass.value.splice(index, 1);
	//		}
	//	})
	//})

	//watch(ready.value, (readyNew) => {
	//	readyNew.forEach((element, index) => {
	//		if(element.tasksReady.length == 0){
	//			readyNew.splice(index, 1);
	//		}
	//	})
	//})
	//watch([progress.value, ready.value], () => {
	//	localStoreProgress();
	//	console.log("ready")
	//})

	//watch(progress.value, (progressNew) => {
	//	progressNew.forEach((element, index) => {
	//		if(element.tasksProgress.length == 0 && element.tasksReady.length != 0){
	//			ready.value.push(progress.value[index]);
	//			progress.value.splice(index, 1);
	//			newTasksMass.value.splice(index, 1);
	//		}
	//	})
	//})
	//watch(ready.value, (readyNew) => {
	//	readyNew.forEach((element, index) => {
	//		if(element.tasksReady.length == 0){
	//			ready.value.splice(index, 1);
	//		}
	//	})
	//}) 
	//watch([progress.value, ready.value], () => {
	//	localStoreProgress();
	//	console.log("ready")
	//})


	return { progress, ready, newTasksMass, initialization, todoAdd, taskAdd, checkTask, checkTodo, clearTask, clearTodo, todoBack }
})
