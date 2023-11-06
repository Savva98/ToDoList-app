
class AddTaskView{
    _parentElement = document.querySelector('.upload');
    _btnTaskWindow = document.querySelector('.btn--add--task');
    _addTaskWindow = document.querySelector('.add-task-window');
   _btnCloseForm = document.querySelector('.btn--close-window');
   _overlay = document.querySelector('.overlay');
   _overlay1 = document.querySelector('.overlay1');
    _taskList = document.querySelector('.task_list');
    _btnAddTask = document.querySelector('.add_task');
    _taskDateInp = document.getElementById('date1');
    _taskDescriptionInp = document.getElementById('desc');
    _taskTimeInp = document.getElementById('timeStemp');
    _addedTaskContainer = document.querySelector('.added_task');
    _uploadTask = document.querySelector('.upload__btn');
    _data;
    constructor(){
        this._addHendlerShowForm();
        this._addHendlerHideForm();
    }
    // Same three functions as in taskListView file, but inside the toogle function was added some if statment to check whether the taskList contain the hidden class. If it's not then it will add it, to it also it checking whether _addTaskWindow was transformed previously and if it does then it will changed that transformation it will be nedded if you're going to add some new tasks to the list because when you added some task to the addTask array the task that you just added will be displayed in _addedTaskContainer it eventually transforms the _addTaskWindow slightly to the right; 
    toggleWindowClass(){
        if(!this._taskList.classList.contains('hidden')){
            this._taskList.classList.toggle('hidden');
            this._overlay1.classList.toggle('hidden');
        }
        if(!this._addedTaskContainer.classList.contains('hidden')) this._addedTaskContainer.classList.add('hidden');

        if(this._addTaskWindow.style.transform){
            this._addTaskWindow.style.transform = `translate(-50%, -50%)`;
        }

        this._addTaskWindow.classList.toggle('hidden1');
        this._overlay.classList.toggle('hidden1');
        this._addedTaskContainer.textContent = '';
    }
    _addHendlerShowForm(){
        this._btnTaskWindow.addEventListener('click', this.toggleWindowClass.bind(this));
    }
    _addHendlerHideForm(){
        [this._btnCloseForm, this._overlay].forEach((el)=> el.addEventListener('click', this.toggleWindowClass.bind(this)))
    }
    // this just needed to clear the input fields of the form for tasks
    _clearInput(par1, par2, par3) {
        par1.value = "";
        par2.value = "";
        par3.value = '';
      }

      // render function take an object and generates the description of the task inside the _addedTaskContainer;
    render(data){
        this._data = data;
            if(!this._addTaskWindow.style.transform){
                this._addTaskWindow.style.transform = `translate(-15%, -50%)`;
            }else{
                this._addTaskWindow.style.transform = `translate(-15%, -50%)`;
            }
        const markUp = this._generateMarkUpDesc(this._data);
        this._addedTaskContainer.insertAdjacentHTML('beforeend', markUp);
      }

      // make an id to the each task object so you could find it whenever it needed for exmp. for deleting task from task list array, or addTask array
    _makeId(){
        const min = 0;
        const max = 100000;
        const num1 = Math.floor(Math.random()*(max-min)+min);
        const num2 = Math.floor(Math.random()*(max-min)+min);
        return (num1+num2).toString();
      }

      // make the object that will be shown in _addedTaskContainer and also that have been pushed to the addTask array and after all objects will be transfered to the taskList array;
    _getTaskInfo(){
        const description = this._taskDescriptionInp.value;
        const date = this._taskDateInp.value;
        const time = this._taskTimeInp.value;
        const id = this._makeId();
        const firstIndex = date.indexOf('-');
        const lasIndex = date.lastIndexOf('-');


        const year = date.slice(0,firstIndex);
        const month = date.slice(firstIndex+1, lasIndex)-1;
        const day = date.slice(lasIndex+1);

        const sortDate = +year + Number(month + 1) + Number(day);
        const sortTime = +time.replace(':','');

        const date2 = new Date(Date.UTC(year, month, day))
        const accurateDate = new Intl.DateTimeFormat().format(date2);
        if(!accurateDate || !description || description.length <=3) return;
        const taskObj = {
            date:accurateDate,
            time: time ? time :'',
            description:description, 
            id,
            sortDate,
            sortTime,
            month, 
            year
        }
        this._clearInput(this._taskDescriptionInp, this._taskDateInp, this._taskTimeInp);
        return taskObj;
    }
    // button that will render description of the task that you can read or delete if something wrong with it, and it add the objects to the addTask array, all logic is inside controller file line:286;
    _addTaskDescription(handler){
        this._btnAddTask.addEventListener('click', function(e){
            e.preventDefault();
            handler();
        })
    }
    // it's jut for generation description of the task so you can read it in _addedTaskContainer; 
    _generateMarkUpDesc(tsk){
        return `
        <div class ='descript'>
        <p class="desc_task"><span class="task_date_desc">${tsk.date}</span>: '${tsk.description}'</p>
        <div class="task_button">
          <button class="del_mark" data-id=${tsk.id}> 
          <i class="fa fa-times-circle delete_btn"></i>
          </button>
          </div>
        </div>
          `
          
    }
    // function contains button to close form also overlay as an element for listening event when you click other of it then all the objects that have been already stored inside the addTask array; 
    _removeDesc(handler){
        [this._btnCloseForm, this._overlay].forEach((el)=> el.addEventListener('click', handler))
    }
    // here I add event to the container of the task description where via event diligation  passed an event to the handelr fuction that inside controller line:304;
    _removeOneDescr(handler){
        this._addedTaskContainer.addEventListener('click', function(e){
            e.preventDefault();
            handler(e);
        })
    }
    //button to upload the task that have been stored inside the addTask array to the taskList array all logic in controller line:314;
    _uploadTasks(handler){
        this._uploadTask.addEventListener('click', function(e){
            e.preventDefault();
            handler();
        })
    }
}

export default new AddTaskView();