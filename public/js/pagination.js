module.exports = (function calculatePagination(storedLinks) { 
  const addListeners = require('./addListeners');
  const config = {
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

  /**
  * Render only results needed for each page
  */
  function renderResults() {
    document.getElementById('links').innerHTML = '';
    for (var id=(config.currentPage-1) * config.maxItemsPerPage; id < (config.currentPage * config.maxItemsPerPage) && id < storedLinks.length; id++) {
      let li = document.createElement('li');
      li.innerHTML = `
        <div class="content">${storedLinks[id]}</div> 
        <div class="btn-container">
          <button class="saveBtn" id="${id}">
            <i class="material-icons">check</i>
          </button>
          <button class="editBtn" id="${id}">
            <i class="material-icons">edit</i>
          </button>
          <button class="removeBtn" id="${id}">
            <i class="material-icons">delete</i>
          </button>
        </div>
      `;
      document.getElementById('links').appendChild(li);
    }
    addListeners(storedLinks);
    return document.getElementById('links');
   }

  renderResults();

  if (config.totalPages > 1) {
    renderNavigation();
  }
});