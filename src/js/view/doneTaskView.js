class doneTasksView {
_parentElement = document.querySelector('.message');
_data;
constructor(){}

// Function that takes the data as an argument this data will be the array from the module file from state doneTask you can find use of it in controller file line 30
_render(data){
    if(!data || (Array.isArray(data) && data.length === 0)) return;
    this._data = data;
    const markUp = this._generateMarkUp();
    this._parentElement.innerHTML = markUp;
}
// this function just changing content of the div with the class message index.html line 28
_generateMarkUp(){
    if(this._data.length==1){
        return `<p>Congrats you have done, your first task. Keep it up!</p>`
    }
    if(this._data.length > 1){
        return `<p>Awesome you already have done '${this._data.length}' tasks. Great job. Keep going.</p>`
    }
}
}

export default new doneTasksView()