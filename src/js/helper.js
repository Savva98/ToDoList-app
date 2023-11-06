import { RENDER_PREVIOUS_PAGES } from "./config";
import paginationView from "./view/paginationView";

// Function that add style to the el argument uses in contoller line:34, 37; 
export const doneVisibility = function(e, op, vs){
    e.style.opacity = op;
    e.style.visibility = vs;
 }

 // This function sorts the array that we recives from the addTask array all element of this array we recived from the form. Ater the sort this array uses to render the elements of the array to the task list
 export const sortArray = function(array){
    return array.sort((a,b)=>{
      if(a.sortDate === b.sortDate){
        return a.sortTime - b.sortTime;
    }
    return a.sortDate - b.sortDate;
    }).sort((a,b)=> a.month-b.month).sort((a,b)=> a.year - b.year);
  }

  // Function that takes el and removes class from this element. In addition if it has test argument it add active class to the buttons of the task list by the determination which button has been clicked by the dataset of this button
  export const removeClass = function(el, delClass, test){
    el.forEach(element => {
        element.classList.remove(`${delClass}`)
    });
    if(test){
      el.forEach(el=>{
        el.classList.remove(`${delClass}`);
        if(el.dataset.goto == test){
          el.classList.add('btn-active');
        }
      })
    }
  }

  // Function recives a button and check whether it contains classes as a two next arguments and based on this it rendering buttons to the ul with class btn_num_container
  export const paginationFunction = function(button, firstClass, classSecond, gotoPage){
    if(button.classList.contains(`${firstClass}`)){
      paginationView._render(gotoPage+1)
    }
    if(button.classList.contains(`${classSecond}`) && button.previousSibling.classList.contains(`${firstClass}`)){
      paginationView._render(gotoPage - RENDER_PREVIOUS_PAGES, true);
    }
    else if(button.previousSibling && button.previousSibling.classList.contains(`${firstClass}`) && (gotoPage - RENDER_PREVIOUS_PAGES>Number(button.previousSibling.dataset.goto))){
      paginationView._render(gotoPage - RENDER_PREVIOUS_PAGES, 'last');
    }else if(button.classList.contains(`${classSecond}`)){;
      paginationView._render(gotoPage);
    }
  }
  

  // Function that iterates throught nodelist of element and compares dataset of each node with goto after the comparison return the button with this dataset needed for make button active used in line:199 of controller 
  export const  paginationElements = function(el, goto){
    let btnNum;
      el.forEach(elem => {
        if(elem.dataset.goto == goto){
          btnNum = elem
        }
      })
    return btnNum
  }

