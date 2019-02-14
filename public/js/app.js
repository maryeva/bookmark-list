(function(){
  const refreshLinks = require('./refreshLinks');
  const axios = require('axios');

  var error = document.getElementById('errorMessage');
  var input = document.getElementById('userInput');
  var submitBtn = document.getElementById('submitBtn');
  var storedLinks = [];

  var init = () => {
    if (submitBtn) { submitBtn.addEventListener('click', validateUrl)};
    refreshLinks();
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
        //document.getElementById('bookmarkForm').submit();
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

  init();
})();
