import * as model from './module.js';
import { doneVisibility, sortArray, removeClass,  paginationFunction, paginationElements } from './helper.js';
import { FADE_OPACITY, ONE_ELEMENT_NODE_LENGTH, SEEN_OPACITY, sections } from './config.js';
import navigationView from './view/navigationView.js';
import featureView from './view/featureView.js';
import howToStartView from './view/howToStartView.js';
import taskListView from './view/taskListView.js';
import addTaskView from './view/addTaskView.js';
import doneTaskView from './view/doneTaskView.js';
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";
import paginationView from './view/paginationView.js';
let currSlide  = 0;
let incr = 0;

if (module.hot) {
  module.hot.accept();
}

// function that scrols to the section based on the id that was passed to the function - id can be as a href attribute and also html id attribute  
const contollScrollTo = function(id){
  let section;
  if(!id.includes('#')){
    section = document.querySelector(`#${id}1`);
    section.scrollIntoView({behavior:'smooth', block: 'start'});
  }else{
    section = document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
}

// function that recieves three arguments first it's html element with the class nav, two other corresponds to the style of element such as opacity, and visibility; inside the function it determens targen of the event that occurred after determination of the target function adds to the target opacity of 1 and to the other elements opacity will be equal to 0.5;  inside the firts if block other situation of cource it also make the same with the opacity but it also need to show other container to the user with message about the amount of tasks that already being completed so it also added visibility to the container based on the event that was occured; in this function two types of events it's ('mouseover', 'nouseout');
const contollFadeEffect = function(e, op, vs){
  if(e.target.closest('.nav_btn--done-tasks')){
      const container = e.target.closest('.nav__item').querySelector('.done');
      if(!container) return;
      if(container.style.opacity){
        doneVisibility(container, op, vs)
      }
      doneTaskView._render(model.state.doneTasks);
      doneVisibility(container, op, vs);
  }

   if(e.target.classList.contains('nav__link') || e.target.closest('.nav_btn')){
    let link;
    link = e.target;
    if(!link.classList.contains('nav__link')){
      link = link.closest('.nav_btn');
    }
    const  siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const buttons = link.closest('.nav').querySelectorAll('.nav_btn');
    siblings.forEach((el)=>{
      if(el !== link){
        el.style.opacity = this;
      }
    })
    buttons.forEach((el)=>{
      if(el !== link){
        el.style.opacity = this;
      }
    })
  }
}

// function needed for section observer all section was selected inside the confing file. It removes the class from each section that observed and make the section that has been observed unobservable
const revealSections = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSections, {
  root:null,
  threshold: 0.15,
})
// add to the each section hidden class 
const obserEl = function(el){
  el.forEach((sec)=>{
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
  })
}

// function that detect of the button on which event has occurred and it also removes from all the buttons the active class and added it to the button on which event detected and also it takes the dataset and via this dataset it selecting the element with the corresponding content and adding the active class to it;
const contentActive = function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  removeClass(featureView._tabs, 'operations__tab--active');
  removeClass(featureView._tabsContent, 'operations__content--active');

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
}
// function that ends the active class to the dot inside the dot container, by the taking the number of the slide 
const activeDot = function(slide){
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(el => el.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');
}
// function that change transfrom style of all elements inside slider;
const goToSlide = function(slide){
  howToStartView._slides.forEach((sl, i)=>{
    sl.style.transform = `translateX(${100*(i - slide)}%)`;
})
}
// function to change the slide to the right; it also changed active dot;
const sliderNextSlide = function(){
  if(currSlide === howToStartView._maxSlides - 1){
    currSlide = 0;
  }else{
    currSlide++;
  }
  goToSlide(currSlide);
  activeDot(currSlide)
}
// Same function as previous one. but to the left side
const sliderPreviousSlide = function(){
  if(currSlide === 0){
    currSlide = howToStartView._maxSlides - 1;
  }else{
    currSlide --;
  }
  goToSlide(currSlide);
  activeDot(currSlide);
}

// Each dot contains dataset by using this dataset we can go to the slide that corresponds to the dot number;
const dotSlide = function(e){
 if(e.target.classList.contains('dots__dot')){
  let slide = e.target.dataset.slide;
  goToSlide(slide);
  activeDot(slide);
 }
}

// ArrowEvents to the slider so u can use arrows to go to the next or previous slide
const arrowEvent = function(){
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft'){
      sliderPreviousSlide();
    }else if(e.key === 'ArrowRight'){
      sliderNextSlide();
    }
  })
}

// function that adds event listener to the button in the bottom of the html file so use can satrt to fill the form from there;
const showForm = function(){
  const form = document.querySelector('.add-task-window');
  const overlay = document.querySelector('.overlay');
  const btn = document.querySelector('.btn--show-modal');
  const toggleClass = function(){
    form.classList.toggle('hidden1');
    overlay.classList.toggle('hidden1');
  }
  btn.addEventListener('click', function(e){
    e.preventDefault();
    toggleClass();
  });
}

// this function to change the style of elements inside the addTaskView file based on the argument that was passed to it, boolean argument;
const addTaskHelper = function(el = true){
  if(el){
    addTaskView._addTaskWindow.classList.toggle('hidden1');
    addTaskView._overlay.classList.toggle('hidden1');
    addTaskView._addedTaskContainer.classList.toggle('hidden');
    addTaskView._addedTaskContainer.textContent = '';
    addTaskView._addTaskWindow.style.transform = `translate(-50%, -50%)`;
  }else{
    addTaskView._addedTaskContainer.textContent = '';
    addTaskView._addedTaskContainer.classList.add('hidden');
    addTaskView._addTaskWindow.style.transform = `translate(-50%, -50%)`;
  }
}

// function to determin the id of the passed button and also remove the content that corresponds to the button. The id will be used inside the other functions to remove the element from the array based on the id;
const buttonRemovalFunction = function(button, parent){
  const id = button.dataset.id;
  const container = button.closest(`.${parent}`);
  container.remove();
  return id;
}

// One of the main functions in this app function that listen the event to the taskList button after it takes task list array checks whether it's not empty if it's not it will render the taskList array to the user with the tasks that were stored inside the array, then it checks whether length of  the array bigger than the resultsPerPage if it's true, then it will also render the buttons to the buttom of the container so u can go to another page to see other tasks also it passes to the render function all state object from the module, it works beacause model.getResultsPerPage() function. This function also checks whether the taskList array length devided to the resultsPerPage >= 5 if it greater, then function will also generates buttons with the numbers so you can go from the first page to the last page not clicking the several times same button;
const contollAddToTaskList = function(){
  if(model.state.taskLIst.length == 0) return;
  const taskList = model.state.taskLIst;
    if((taskList.length / model.state.resultPerPage)>=5){
      const amountPages = taskList.length / model.state.resultPerPage;
      taskListView._render(model.getResultsPerPage(), true, model.state);
      paginationView._render(2, false, amountPages);
    } else if(taskList.length > model.state.resultPerPage){
      taskListView._render(model.getResultsPerPage(), true, model.state);
    }else{
      taskListView._render(taskList);
    }
}

// function that extract dataset from the passed button removes active class from all buttons add simultaneously added this active class to the button that has been clicked based on the dataset will render the results from taskList array to the task list container; 
const paginationHelper = function (button){
  const goto = Number(button.dataset.goto)
  const el = button.closest('.btn_num_container').querySelectorAll('.btn_num');
  removeClass(el, 'btn-active');
  button.classList.add('btn-active');
  taskListView._render(model.getResultsPerPage(goto), true, model.state);
  // for paginationFunction look into helper file;
  paginationFunction(button, 'page_first', 'last_page', goto)
}

// function that recieves the event rom the taskListView pagination container and rendering the results based on the dataset of the button that was clicked for example if dataset will be equal to two then inside the taskList container would be rendered all the task that correspond to the second page of the taskList array. This function also checks whether the task container contain the buttons with numbers by checking btn-active
const controllPagination = function(e){
  const btn = taskListView._taskList.querySelector('.btn-active');
  const button = e.target.closest('.btn--inline');

        if(!button) return;
        
  const gotoPage = +button.dataset.goto;
  
  if(btn){
    let elements =  paginationView._parentElement.querySelectorAll('.btn_num');
    // for paginationElement function check helper file;
   let btnNum = paginationElements(elements, gotoPage);

    if(!btnNum && gotoPage){
      let goto;
      if(gotoPage == Math.ceil(paginationView._amountPages)){
         goto = gotoPage -1;
      }
      // I do this beacause it will return an error and rendering not accureate results to the user beacause it can't find the btnNum that corresponds to the looking dataset, so i need to render new buttons before i will transfer to the another page
      paginationView._render(goto?goto:gotoPage-2);
      elements = paginationView._parentElement.querySelectorAll('.btn_num');
      btnNum = paginationElements(elements, gotoPage);
    }

    paginationHelper(btnNum);
  }else{
    // Render new results
    taskListView._render(model.getResultsPerPage(gotoPage), true, model.state);
  }
}

// determins the button on which event occurred, after passes this button to the paginationHelper()
const controllPaginationButtonNum = function(e){
  const button = e.target.closest('.btn_num');
  if(!button) return;
  paginationHelper(button)
}

// takes all elements form the container that corresponds to the button;
const takeElements = function(btn, closesClass){
  const element = [...btn.closest(`${closesClass}`).querySelectorAll('*')].length;
  return element;
}

// Function to update TaskList view after clicking done or delete buttons 
const updatePageTaskListView = function(el, nodeLength, btnNum){
  if((el - nodeLength) == 0){
    model.state.page = model.state.page - 1;

    if(model.state.page == 0 && model.state.taskLIst.length>=1) model.state.page = 1;

    if(!btnNum){

      taskListView._render(model.getResultsPerPage(), true, model.state);
    } else if(model.state.taskLIst.length / model.state.resultPerPage != 5)
    {
      paginationView._render();

    } else if(model.state.taskLIst.length / model.state.resultPerPage >= 5)
    {
      paginationHelper(btnNum)
    }
  }
  
}

// here we recies the event based on this, event we check which button has been clicked, we also looking for the buttons with numbers, if such button exist it will be passed to updatePageTaskList for next operations;
const controllMarkTaskAsDoneOrDelet = function(e){

  const btnDone = e.target.closest('.done_mark');
  const btnDel = e.target.closest('.delete_mark');
  const button = btnDone ?? btnDel;
  // if task_container contain only one element, length of all nodes of this element equals to 9;
  const oneElementNodeLength = ONE_ELEMENT_NODE_LENGTH;
    if(!button) return;
    const btnNum = button.closest('.task_list').querySelector('.btn-active');

  if(button.classList.contains('done_mark')){
    const element = takeElements(button, '.task_container')
    const id = buttonRemovalFunction(button, 'des_container');
    model.deleteDesc(id, 'task');
    if(btnNum){
      updatePageTaskListView(element, oneElementNodeLength, btnNum);
    }else{
      updatePageTaskListView(element, oneElementNodeLength)
    }
  }
  if(button.classList.contains('delete_mark')){
    const element = takeElements(button, '.task_container');
    const id = buttonRemovalFunction(button, 'des_container');
    model.deleteDesc(id, 'del');
    if(btnNum){
      updatePageTaskListView(element, oneElementNodeLength, btnNum);
    }else{
      updatePageTaskListView(element, oneElementNodeLength)
    }
  }
}

//function that exutes every time u clicked the add task button in form it takes the object from the addTaskView, also it removes hidden class from addedTaskContainer it pushes object to the addTask array and shows the current task u have been created in the  addedTaskContainer;
const contollAddTaskDesc = function(){
  const obj = addTaskView._getTaskInfo();
  if(!obj) return;
  if(addTaskView._addedTaskContainer.classList.contains('hidden')){
    addTaskView._addedTaskContainer.classList.remove('hidden');
  }
  model.state.addTask.push(obj);
  const tasks = model.state.addTask;
  addTaskView.render(tasks[incr]);
  incr++;
}

// chenger the increment and also removing all the elements that were stored inside the array;
const controllDeleteAddedTasks = function(){
  incr = 0;
  model.removeDesc();
}

// removes one task rom the addTask array based on the id of the task that was clicked;
const controllRemoveOneTask = function(e){
  const button = e.target.closest(`.del_mark`);
  if(!button) return;
  const id = buttonRemovalFunction(button, 'descript');
  model.deleteDesc(id);
  if(model.state.addTask.length == 0){
    addTaskHelper(false);
  }
  incr--;
}

//this function concat all the elements of the addTask array to the taskList array, also removes all elements from the addTask array;
const controllUploadTasks = function(){
  if(model.state.addTask.length == 0)return;

  if(model.state.taskLIst.length == 0){
    model.moveToTheTaskList(sortArray(model.state.addTask));
  }else{
    model.concatTheTaskList(sortArray(model.state.addTask));
  }
  addTaskHelper();
  model.removeDesc();
  incr = 0;
}

const init = function(){
  navigationView._scrollTo(contollScrollTo);
  navigationView._fadeOpacityNav(contollFadeEffect.bind(FADE_OPACITY))
  navigationView._unFadeNav(contollFadeEffect.bind(SEEN_OPACITY));
  featureView._activeContent(contentActive);
  howToStartView._nextSlide(sliderNextSlide);
  howToStartView._previousSlide(sliderPreviousSlide);
  howToStartView._dotSlides(dotSlide);
  taskListView._checkTaskList(contollAddToTaskList)
  taskListView._markAsDone_Delet(controllMarkTaskAsDoneOrDelet);
  taskListView._addHendlerPagination(controllPagination);
  paginationView._addHandkerPaginationNum(controllPaginationButtonNum);
  addTaskView._addTaskDescription(contollAddTaskDesc)
  addTaskView._removeDesc(controllDeleteAddedTasks);
  addTaskView._removeOneDescr(controllRemoveOneTask);
  addTaskView._uploadTasks(controllUploadTasks);
  obserEl(sections)
  activeDot(0);
  goToSlide(0);
  arrowEvent();
  showForm();
}
init();
