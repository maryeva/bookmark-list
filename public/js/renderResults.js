/**
* Render only results needed for each page
*/
module.exports = function renderResults() {
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

 return document.getElementById('links');
}