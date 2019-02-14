/**
* Refresh on initialization and after adding/removing elements
* Show results depending on page user is on
* Render navigation links appropriately
*/
const calculatePagination = require('./pagination');

module.exports = (function refreshLinks() {
  //persist page reload by saving session data
  storedLinks = sessionStorage.getItem('links') ? JSON.parse(sessionStorage.getItem('links')) : [];
  calculatePagination(storedLinks);
});