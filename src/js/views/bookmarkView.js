import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';


class BookmarkView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No BookMarks Yet, Mark Any ;-)."


    addHanlerRender(handler){
        window.addEventListener('load',handler);
    }
    _generateMarkup(){
        console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join();

    }


}
export default new BookmarkView();