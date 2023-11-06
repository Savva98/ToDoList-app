import taskListView from "./view/taskListView";
import { sortArray } from "./helper";
import { RESULTS_PER_PAGE } from "./config";

export const state = {
    taskLIst: [],
    addTask:[],
    doneTasks:[],
    resultPerPage: RESULTS_PER_PAGE,
    page:1,
}

// Add the taskList array to the local storage
const persistTaskList = function(done  = false){
    if(!done){
        localStorage.setItem('taskList', JSON.stringify(state.taskLIst));
    }else if(done){
        localStorage.setItem('doneList', JSON.stringify(state.doneTasks));
    }

}
// Takes current page as a number and uses this number as a index to take results from the taskList also sort the array and return result => exmp. page = 1; so it takes results from taskList array from the index 0 to the index equals to the resultsPerPage
export const getResultsPerPage = function(page = state.page){
    state.page = page;
    const start = (page - 1) * state.resultPerPage;
    const end = page * state.resultPerPage;
    return sortArray(state.taskLIst).slice(start, end);
}

// extract data from the local storage
const inti = function(){
    const storageTaskList = localStorage.getItem('taskList');
    if(storageTaskList) state.taskLIst = JSON.parse(storageTaskList);
    const storageDoneTask = localStorage.getItem('doneList');
    if(storageDoneTask) state.doneTasks = JSON.parse(storageDoneTask);
}

// take the argument as array and the id of an element to remove from this array, also if it has add agrument = true, add this index to the doneTask array
const helperToRemoveTasks = function(arr, id, add = false){
    const ind = arr.findIndex(ind=> ind.id == id);
    if(add){
        state.doneTasks.push(arr[ind])
        persistTaskList(true);
    }
    arr.splice(ind, 1);
}
// The function that takes the id and pass this id to the another function to romove the element of the array with this id, also it determins from which array to remove element based on the 'str' argument if str argument = 'task' || 'del' chnges the array that stored in local storage
export const deleteDesc = function(id, str = 'addTask'){
    if(str.includes('add')){
        helperToRemoveTasks(state.addTask, id);
    }
    if(str.includes('task')){
        helperToRemoveTasks(state.taskLIst, id, true);
        persistTaskList();
    }
    if(str.includes('del')){
        helperToRemoveTasks(state.taskLIst, id);
        persistTaskList();
    }
}

// two function below just add elements to the taskList array based on the array that passes as an argument 
export const moveToTheTaskList = function(arr){
    state.taskLIst = [...arr];
    persistTaskList();
}
export const concatTheTaskList = function(arr){
    const temp = [...arr];
    state.taskLIst = state.taskLIst.concat(temp);
    persistTaskList();
}
// this unction basically removes all elements from the addTask array. Launches when you click closeForm button or overlay
export const removeDesc = function (){
    state.addTask.splice(0);
}
inti();