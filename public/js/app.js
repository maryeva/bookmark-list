(function(){
  const calculatePagination = require('./pagination');
  const axios = require('axios');

  var error = document.getElementById('errorMessage');
  var input = document.getElementById('userInput');
  var submitBtn = document.getElementById('submitBtn');
  var saveBtns = document.getElementsByClassName('saveBtn');
  var editBtns = document.getElementsByClassName('editBtn');
  var removeBtns = document.getElementsByClassName('removeBtn');
  var storedLinks = [];

  var init = () => {
    submitBtn.addEventListener('click', validateUrl);
    refreshLinks();
  }

  /**
   * Refresh on initialization and after adding/removing elements
   * Show results depending on page user is on
   * Render navigation links appropriately
   * Add remove button listeners
   */
  var refreshLinks = () => {
    //persist page reload by saving session data
    storedLinks = sessionStorage.getItem('links') ? JSON.parse(sessionStorage.getItem('links')) : [];
    calculatePagination(storedLinks);
    for (let i=0; i < removeBtns.length; i++) {
      removeBtns[i].addEventListener('click', removeBookmark);
      editBtns[i].addEventListener('click', editBookmark);
      saveBtns[i].addEventListener('click', saveBookmark);
    };
  }

  /**
   * Check if URL exists
   * Try to access the link given. If status code is 200 it will return true
   * If blocked by CORS or status code is 404 it will return false
   */
  var urlExists = () => {
    var result = axios.get(input.value).then(function (response) {
      return true;
    })
    .catch(function (err) {
      console.error('catch', err);
      return false;
    });

    return result;
  }

  /**
   * Validate URL
   * Check if already in bookmarks
   * Check if it's a valid link
   * Check if it exists/access is allowed
   * Call addBookmark function or return error message
   */
  var validateUrl = async (e) => {
    e.preventDefault();
    var errorMessage = '';

    if (storedLinks.length > 0 && storedLinks.indexOf(input.value) > -1) {
      error.innerHTML = 'This link is already in your bookmarks!';
      input.value='';
      return;
    }

    var validUrl = /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/;
    var isValid = validUrl.test(input.value);

    if (input.value.length > 0 && isValid)  {
      if (await urlExists()) {
        addBookmark(input.value);
      } else {
        errorMessage = 'URL doesn\'t exist or access was denied';
      } 
    } else {
      errorMessage = 'Please provide a valid URL';
    }

    //show error if needed and clear input
    error.innerHTML = errorMessage;
    input.value='';
  }

  var addBookmark = (url) => {
    storedLinks.push(url);
    sessionStorage.setItem('links', JSON.stringify(storedLinks));
    refreshLinks();
  }

  var removeBookmark = (e) => {
    let id = e.currentTarget.getAttribute('id');
    let listItem = e.currentTarget.parentNode.parentNode;
    document.getElementById('links').removeChild(listItem);

    storedLinks.splice(id,1);
    sessionStorage.setItem('links', JSON.stringify(storedLinks));
    refreshLinks();
  }

  /**
   * Replace text with input and enable edit mode
   */
  var editBookmark = (e) => {
    let listItem = e.currentTarget.parentNode.parentNode;
    listItem.classList.add('editMode');

    let id = e.currentTarget.getAttribute('id');
    let content = e.currentTarget.parentNode.previousSibling.previousSibling;
    let editInput = document.createElement('input');
    editInput.classList.add('editInput')
    editInput.setAttribute('id', id);
    editInput.value = storedLinks[id];
    content.innerHTML = '';
    content.appendChild(editInput);
  }

  /**
   * Makes sure we get the value of the current active input
   * and updates storedLinks array with new value
   */
  var saveBookmark = (e) => {
    console.log('save it');
    let id = e.currentTarget.getAttribute('id');
    let newValue = document.querySelector(`input[id="${id}"]`).value;
    storedLinks[id] = newValue;
    sessionStorage.setItem('links', JSON.stringify(storedLinks));
    refreshLinks();
  }

  init();
})();
