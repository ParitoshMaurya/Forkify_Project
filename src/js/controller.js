const { async } = require("q");
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import {MODAL_CLOSE_SEC} from './config'

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';


// if (module.hot){
//   module.hot.accept();
// }


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1);
    if(!id) return

    recipeView.renderSpinner();

    // Update Results View 
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    
    // 1) Loading Recipe 
    await model.loadRecipe(id);
    
    // 2) Rendering Recipe 
    
    recipeView.render(model.state.recipe);
    
    
  } catch (err) {
    recipeView.renderError();
    
  }
}

const controlSearchResults = async function(){
  // Loading Spinner 
  resultsView.renderSpinner();

  // Getting Query From the User 
  const query = searchView.getQuery();
  if(!query) return;
  try {
    // Fetching Search Results 
    await model.loadSearchResults(query);

    // Rendering Search Results 
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.log(err);}

};

const controlPagination = function(goToPage){
  // Render New Search Results 
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render New Pagination 
  paginationView.render(model.state.search);

}

const controlServings =  function(updateTo){
  model.updateServings(updateTo)

  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){

  // Add/Remove Bookmark 
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update The Recipe 
  recipeView.update(model.state.recipe);

  // Render The Bookmarks
  bookmarkView.render(model.state.bookmarks);
}
const controlBookMarks = function(){
  bookmarkView.render(model.state.bookmarks);
}
const controlAddRecipe = async function(recipe){
  try{
    addRecipeView.renderSpinner();

    // Upload New Recipe 
    await model.uploadRecipe(recipe);

    // Render The Recipe 
    recipeView.render(model.state.recipe);
    


    // Success Message

    addRecipeView.renderMessage();

    // Render BookMark View

    bookmarkView.render(model.state.bookmarks);

    // Changing ID of URL 

    window.history.pushState(null,'',`#${model.state.recipe.id}`);
    
    // Close Form Window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC * 1000);

  }catch(err){
    addRecipeView.renderError(err.message);
  }
}



const init = function(){
  bookmarkView.addHanlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
