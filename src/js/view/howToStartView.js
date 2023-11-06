
class HowToStart{
    _slides = document.querySelectorAll('.slide');
    _btnLeft = document.querySelector('.slider__btn--left');
    _btnRight = document.querySelector('.slider__btn--right');
    _maxSlides = this._slides.length;
    _dotContainer = document.querySelector('.dots')
constructor(){
    this.createDots();
}
// This function add dots to the slider 
createDots(){
    this._slides.forEach((_,i)=>{
        this._dotContainer.insertAdjacentHTML('beforeend', `<button class = 'dots__dot' data-slide='${i}'></button>`)
    })
}
  // Two functions below add event lister to the arrow buttons that contains in the slider, look in controller file functions(sliderNextSlide, sliderPreviousSlide)
_nextSlide(handler){
    this._btnRight.addEventListener('click', handler)
}
_previousSlide(handler){
    this._btnLeft.addEventListener('click', handler);
}
// This function added event listener to the dotContainer in the slider to understand this function look into controller.js file to the dotSlide function 
_dotSlides(handler){
    this._dotContainer.addEventListener('click', function(e){
     handler(e);     
    })
}
}
export default new HowToStart();