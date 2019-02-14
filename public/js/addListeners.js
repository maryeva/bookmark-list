/**
* Add all button listeners needed and define functions to run
*/
module.exports = (function addListeners(storedLinks) {
  const refreshLinks = require('./refreshLinks');

  var saveBtns = document.getElementsByClassName('saveBtn');
  var editBtns = document.getElementsByClassName('editBtn');
  var removeBtns = document.getElementsByClassName('removeBtn');

  for (let i=0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', removeBookmark);
    editBtns[i].addEventListener('click', editBookmark);
    saveBtns[i].addEventListener('click', saveBookmark);
  };

  function removeBookmark(e) {
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
  function editBookmark(e) {
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
  function saveBookmark(e) {
    let id = e.currentTarget.getAttribute('id');
    let newValue = document.querySelector(`input[id="${id}"]`).value;
    storedLinks[id] = newValue;
    sessionStorage.setItem('links', JSON.stringify(storedLinks));

    //revert back to normal view
    let listItem = e.currentTarget.parentNode.parentNode;
    listItem.classList.remove('editMode');
    let content = e.currentTarget.parentNode.previousSibling.previousSibling;
    content.innerHTML = newValue;
  }
});