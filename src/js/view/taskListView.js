
import icons from "url:../../img/icons.svg";
class TaskList{
_overlay = document.querySelector('.overlay');
_overlay1 = document.querySelector('.overlay1');
_taskList = document.querySelector('.task_list');
_btnTaskList = document.querySelector('.nav__btn-list');
_btnCloseWindow = document.querySelector('.btn--close-window--task');
_btnAddTask = document.querySelector('.btn--add--task');
_taskContainer = document.querySelector('.task_container');
_addTaskWindow = document.querySelector('.add-task-window');
_pagination = document.querySelector('.paginationArrows');
_state;
_data;

 constructor(){
    this._addHendlerShowWindow();
    this._addHendlerHideWindow();
 }   

 toggleClassList() {
    this._overlay1.classList.toggle('hidden');
    this._taskList.classList.toggle('hidden');
    this._taskContainer.innerHTML ='';
}
// next two function add eventLister to the elemnts which will be used the  toggleClassList function to toggle classes of the container
_addHendlerShowWindow(){
        this._btnTaskList.addEventListener('click', this.toggleClassList.bind(this));
}
_addHendlerHideWindow(){
    [this._btnCloseWindow, this._overlay1].forEach((el)=> el.addEventListener('click', this.toggleClassList.bind(this)))
}

// add event lister to the pagination container and passes the element to the handler function that procced elements and chenges pages of task list the used in controller line:189;
_addHendlerPagination(handler){
    this._pagination.addEventListener('click', function(e){
        e.preventDefault();
        handler(e)
    })
}
// rendering the task list based on the array that was passed to it as a data, if it has pagination then it also takes model.state object as a state  used in several function throught the contoller file, first used in line:174;
_render(data, pagination = false, state){
    if(!data || (Array.isArray(data) && data.length === 0)) return;
    this._data = data;
    const markUp = this._generateMarkUp();
    this._taskContainer.innerHTML ='';
    this._taskContainer.insertAdjacentHTML("afterbegin", markUp);
    if(pagination){
        this._state = state;
        const markUpButton = this._generateMarkUpButtons();
        this._pagination.innerHTML = ''
        this._pagination.insertAdjacentHTML('afterbegin', markUpButton);
    }
}
// function that iterates throught the this._data array which we recives in render function and each element go throught the _generateMarkUpTask wich will make the html elemet from it with the data of the element that was passed to the function after proccessing the data it will return the string that will be used for insertion in render function 
_generateMarkUp(){
    return `${this._data.map(this._generateMarkUpTask).join('')}`
}
_generateMarkUpTask(tsk){
    return `
        <div class = 'des_container'>
        <p class="description_of_task"><span class="task_date">${tsk.date}</span><span class ='task_time'>${tsk.time}</span> '${tsk.description}'</p>
       <div class="task_button">
         <button class="done_mark" data-id=${tsk.id}><i class="fa fa-check-square-o check_btn"></i></button>
         <button class="delete_mark" data-id=${tsk.id}> 
         <i class="fa fa-times-circle delete_btn"></i>
         </button>
         </div>
        </div>
     ` 
    }
    
    // function that added eventLister to the task list button and it will run the handler function that stores in controller file line:174 
_checkTaskList(handler){
    this._btnTaskList.addEventListener('click', function(e){
        e.preventDefault();
        handler();
    })
}
// this function will add eventListener to the taskContainer, and passes the element which were clicked to the handler function which will determine what button was clicked, it works beacause event deligation you can look at it in line:248 of controller file
_markAsDone_Delet(handler){
    this._taskContainer.addEventListener('click', function(e){
        e.preventDefault();
        handler(e);
    })
}
// two next functions generates arrows buttons inside the taskList container based on the _render function whether there were pagination or not 
 _generateMarkUpButtons(){
    const currPage = this._state.page;
    const numPages = Math.ceil(this._state.taskLIst.length / this._state.resultPerPage);
    
    // Page 1, and there are other pages
    if(currPage === 1 && numPages > 1){
        return this._generateButtons(currPage, 1, 0);
    }

    // Last page 
    if(currPage === numPages && numPages > 1){
        return this._generateButtons(currPage, 0, 1)
    }

    // Other page 
    if(currPage < numPages){
        return this._generateButtons(currPage,1,1);
    }
    return ``;
 }
 _generateButtons(currPage, num, num2){
    if(num === 1 && !num2){
        return `<button data-goto =${currPage + num} class="btn--inline paggination__btn--next">
        <svg class="search__icon">
            <use href = '${icons}#blue_copy'></use>
          </svg>
      </button>`
    }
    if(!num && num2 === 1){
        return `<button data-goto =${currPage - num2} class="btn--inline paggination__btn--prev">
        <svg class="search__icon">
            <use href = '${icons}#blue_copy'></use>
          </svg>
      </button>`
    }
    return `
    <button data-goto =${currPage + num} class="btn--inline paggination__btn--next">
        <svg class="search__icon">
            <use href = '${icons}#blue_copy'></use>
          </svg>
      </button>
      <button data-goto =${currPage - num2} class="btn--inline paggination__btn--prev">
        <svg class="search__icon">
            <use href = '${icons}#blue_copy'></use>
          </svg>
      </button>`
 }
}

export default new TaskList();