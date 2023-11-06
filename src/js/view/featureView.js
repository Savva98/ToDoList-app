
class FeatureView {
    _parentElement = document.querySelector('.section1');
    _tabsContainer = document.querySelector('.operations__tab-container');
    _tabs = document.querySelectorAll('.operations__tab');
    _tabsContent = document.querySelectorAll('.operations__content');
    constructor(){
    }

    // passes element of tabsContainer to the handler function contoller line:79
    _activeContent(handler){
        this._tabsContainer.addEventListener('click', function(e){
            e.preventDefault();
            handler(e);
        })
    }
}

export default new FeatureView ();