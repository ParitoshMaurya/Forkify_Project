import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';


class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = "We didn't get any results for you query ! Try with different one."

    _generateMarkup(){
        console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join();
    }

}
export default new ResultsView();