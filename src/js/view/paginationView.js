import { removeClass } from "../helper";
import { AMOUNT_OF_BUTTONS_IN_CONTAINER } from "../config";

class pagginationView {
_parentElement = document.querySelector('.btn_num_container');
_amountPages;
_buttonAmounts = AMOUNT_OF_BUTTONS_IN_CONTAINER;
_starterIndex = 2;
_markupFirstBtn = `<li data-goto = 1 class ='btn_num page_first btn-active'>1</li>`;


// function needed for rendering the amount of buttons in parentElement based on the starterIndex and inserting all of this buttons to the parentElement, it always inserts the one element with the dataset equals to 1 this is first button, it needed to return to the first page of the taskList no meter on which page you are
_render(starterIndex, lastbtnActive = false, amountPages){
   this._starterIndex = starterIndex
   if(!starterIndex){
    this._parentElement.innerHTML = '';
    return;
   }
    if(amountPages){
        this._amountPages = amountPages;
    }
    let endIndex = this._starterIndex  + this._buttonAmounts;
    if(endIndex-1>this._amountPages) endIndex = this._amountPages+1

    if(this._starterIndex == this._amountPages && this._amountPages == 5){
        return;
    }

    if(this._starterIndex == this._amountPages){
        // //////////////////
        this._parentElement.innerHTML ='';
        this._parentElement.insertAdjacentHTML('afterbegin', this._markupFirstBtn);
        const markUp =  this._generateMarkUp(this._starterIndex-1, endIndex-1);
        this._parentElement.insertAdjacentHTML('beforeend', markUp);
        this.addClassList();

    }else{
        ////////////////
        this._parentElement.innerHTML ='';
        this._parentElement.insertAdjacentHTML('afterbegin', this._markupFirstBtn);
        const markUp = this._generateMarkUp(this._starterIndex, endIndex);
        this._parentElement.insertAdjacentHTML('beforeend', markUp);
        const btns = this._parentElement.querySelectorAll('.btn_num');

        if(this._starterIndex >= 2 && lastbtnActive){
        removeClass(btns, 'btn-active', this._starterIndex + 3);
       }else if(this._starterIndex >= 2 && lastbtnActive == 'last'){
        removeClass(btns, 'btn-active', this._starterIndex + 3);
       }else if(this._starterIndex > 2){
        removeClass(btns, 'btn-active', this._starterIndex);
        }
        this.addClassList();
    }
}
// function adds event listener to the parent element and passes the element that was clicked to the handler. Handler function line:227;
_addHandkerPaginationNum(handler){
    this._parentElement.addEventListener('click', function(e){
        handler(e)
    })
}
// unction that takes array of elements from generateMarkUpButtonNum function and make it as a string that will be inserted in the parentEl;
_generateMarkUp(num, num2){
    return `${this.generateMarkUpButtonNum(num, num2).join('')}`
}
// this function return array of elements that were pushed inside of it, by the iteration from the starterindex to the end index within each element added dataset with the index, and also number that corresponds to the index if the index+1 equals to the endIndex then to this element will be added class 'last_page' this class will be used inside the paginationFunction as a third argument
generateMarkUpButtonNum(num, num2){
    const arrayOfElements = [];
    for (let i = num; i < num2 ; i++) {
        let element =`<li class ='btn_num page_number' data-goto=${i}>${i}</li>`;
        if((i+1)==num2){
            element = `<li class ='btn_num page_number last_page' data-goto=${i}>${i}</li>`
        }
        arrayOfElements.push(element)
    }
    return arrayOfElements;
}

// Function to add or remove class from the parent element if the nodes length <=3 
addClassList(){
    const nodesLength = this._parentElement.childNodes.length;
    if(nodesLength <= 3){
        this._parentElement.classList.add('triple')
    }else if(nodesLength > 3 && this._parentElement.classList.contains('triple')){
        this._parentElement.classList.remove('triple')
    }
}

}

export default new pagginationView()