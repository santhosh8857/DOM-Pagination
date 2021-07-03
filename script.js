// Data
let url = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';

// Using fetch
fetch (url)
   .then ((response) => {
      return response.json();
   })
   // retrieved data
   .then ((data) => {
     
      // table
      const tableElement = document.getElementById('main-table');

      // list
      const paginationElement = document.getElementById('pagination');

      // current
      let currentPage = 1;

      // Number of rows to be displayed
      let rows = 10;

      function displayContent (items, wrapper, rowsPerPage, page) {
         // everytime clears the table
         wrapper.innerHTML="";
         page--;

         // table heading
         let tableHead = document.createElement('thead');
         
         // main row
         let mainRow = document.createElement('tr');

         // adding data
         let h1 = document.createElement('th');
         h1.innerText = 'ID';

         let h2 =  document.createElement('th');
         h2.innerText = 'Name';

         let h3 = document.createElement('th');
         h3.innerText = 'Email';

         // append to mainRow
         mainRow.append(h1, h2, h3);

         // append to Head
         tableHead.appendChild(mainRow);

         // table body
         let tableBody = document.createElement('tbody');

         // start item of the page
         let startItem = rowsPerPage * page;
         // ebd item of the page
         let endItem = startItem + rowsPerPage; 

         // taking the items for each page (10 items)
         let paginatedItems = items.slice(startItem,endItem);

         // looping through separted items
         for(let i=0; i < paginatedItems.length; i++) {
            
            // creating row
            let trow = document.createElement('tr'); 
            
            // adding data
            let tdata1 = document.createElement('td');
            tdata1.innerText = paginatedItems[i].id;

            let tdata2 = document.createElement('td');
            tdata2.innerText = paginatedItems[i].name;

            let tdata3 = document.createElement('td');
            tdata3.innerText = paginatedItems[i].email;

            // append data to row
            trow.append(tdata1, tdata2, tdata3);
            console.log(trow);

            // append to table body
            tableBody.append(trow);

            // append to table
            wrapper.append(tableHead, tableBody);

         }
      }

      function Pagination (items, wrapper, rowsPerPage) {
         wrapper.innerHTML = "";

         // rounding up the next largest number
         let pageCount = Math.ceil(items.length / rowsPerPage);
         
         // creating btn w.r.t page count
         for(let i=1; i<= pageCount; i++) {
            let button = PaginationBtn(i, items);

            // append to pagenumber
            wrapper.appendChild(button);
         }
      }

      function PaginationBtn (page, items) {
         
         // creating button element
         let btn = document.createElement('button');
         btn.classList.add('btn', 'btn-light', 'border', 'rounded');

         btn.innerText = page;

         if(currentPage == page) {
            btn.classList.add('active');
         }

         // Adding event click 
         btn.addEventListener('click', function () {
            currentPage = page;

            displayContent (items, tableElement, rows, currentPage);

            let currentBtn = document.querySelector('.pagenumbers button.active');

            currentBtn.classList.remove('active');

            btn.classList.add('active');
         });

         return btn;
      }

      displayContent(data, tableElement, rows, currentPage);
      Pagination(data, paginationElement, rows);

   })

// error handling
   .catch((err) => {
      alert(err);
      console.log(err);
   })

 
