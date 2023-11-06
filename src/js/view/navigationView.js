

class NavigationView {
_parentElement = document.querySelector('.head');
_nav = document.querySelector('.nav');
_btnScrollTo = document.querySelector('.btn--scroll-to'); 
_navHeight = this._nav.getBoundingClientRect().height;
constructor(){
    this._headerObserver(this._navHeight, this.stickyNav.bind(this));
}
// function that takes the handler function as an argument and add eventListener to the btn and to the "nav" then determines which element has been clicked and takes the id rom the elememt id can be as and href attribute or id attribute and passing it to the handler function which is located in controller file function (contollScrollTo)
_scrollTo(handler){
    this._btnScrollTo.addEventListener('click', function(e){
        const id = e.target.getAttribute('id');
        handler(id)
    })
    this._nav.addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.classList.contains('nav__link')){
            const id = e.target.getAttribute('href');
            handler(id)
        }
    })
}

// function that add mouseover eventListener to the "nav" element and passes three arguments to the handler function (contollFadeEffect in contoller), two of the arguments are already diclered just to pass their value to the handler function 
_fadeOpacityNav(handler, op = 1, vs = 'visible'){
    this._nav.addEventListener('mouseover', function(e){
        e.preventDefault();
        handler(e, op, vs)
    })
}
// Basically the same function as previous ones just changed value of two argument and event also was changed this function use as a handler same function in conroller as a previous 
_unFadeNav(handler, op = 0, vs ='hidden'){
    this._nav.addEventListener('mouseout', function(e){
        e.preventDefault();
        handler(e, op, vs);
    })
}
// this function adds class to the "nav" element if this element intersecting the next section 
stickyNav(entries){
    const [entry] = entries;
    if(!entry.isIntersecting){
        this._nav.classList.add('sticky');
    }else{
        this._nav.classList.remove('sticky');
    }
}
// f unction that observers the parentElement and takes the el as a first argument el contains the height of the "nav" element, and the fn add or removes class from the "nav" element, class changes display of the "nav" element (css file, line:108)
_headerObserver(el, fn){
  const header =  new IntersectionObserver(fn, {
        root:null,
        threshold:0,
        rootMargin:`-${el}px`
    });
    header.observe(this._parentElement)
}  

}
export default new NavigationView();