const renderResults = require('./renderResults');

module.exports = (function calculatePagination(storedLinks) { 
  var config = {
    currentPage: 1,
    maxItemsPerPage: 20,
    get totalPages() {
      return Math.ceil(storedLinks.length / config.maxItemsPerPage);
    }
  }

  /**
   * Render nav link for each page available
   * Render nav arrows where appropriate
   */
  function renderNavigation() {
    document.getElementById('pagination').innerHTML = '';
    if (config.currentPage > 1) {
      let prevArrow = document.createElement('li');
      prevArrow.innerHTML = `<a href="#" rel="prev"><i class="material-icons">chevron_left</i></a>`;
      document.getElementById('pagination').appendChild(prevArrow);
    }

    for (var page=1; page <= config.totalPages; page++) {
      let li = document.createElement('li');
      li.innerHTML = `<a href="#">${page}</a>`;
      if (config.currentPage == page) { 
        li.classList.add('active')
      };
      document.getElementById('pagination').appendChild(li);
    }

    if (config.currentPage < config.totalPages) {
      let nextArrow = document.createElement('li');
      nextArrow.innerHTML = `<a href="#" rel="next"><i class="material-icons">chevron_right</i></a>`;
      document.getElementById('pagination').appendChild(nextArrow);
    }

    let navLinks = document.getElementById('pagination').childNodes;
    for (let i=0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', changePage);
    };

    return document.getElementById('pagination');
  }

  /**
   * Check if arrow or page number was clicked
   * and perform relevant action
   */
  function changePage(e) {
    let arrows = e.currentTarget.childNodes[0].getAttribute('rel');
    if (arrows) {
      arrows === 'next' ? config.currentPage++ : config.currentPage--; 
    } else {
      config.currentPage = e.currentTarget.childNodes[0].innerText || config.currentPage;
    }
    renderNavigation();
    renderResults();
  }

  renderResults();
  renderNavigation();
  
});