function displayemployee() {
   
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/employee/', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const employees = JSON.parse(xhr.responseText);
               
                const employeeContainer = document.getElementById('employees');
                const employeenum = document.getElementById('num_employ');
                employeenum.textContent=``;
               
                     
                // Clear existing employee
                employeeContainer.innerHTML =``;
               
                employees.forEach(function(employee) {
                  localStorage.setItem( `employee`+`${employee.id}`, employee );
                  
                  employeenum.textContent=employees[0].number;
                  const employeetr = document.createElement('tr');
                    
                   
                   
                  employeetr.innerHTML = ` <td>
                        <img src="${employee.image}">
                        <p>${employee.name}</p></td>
                     
                    <td><span class="status pending "  id="avalible-${employee.id}">في أجازة</span></td> 
                   <td>  <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" id="update-${employee.id}" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                         </a>
                     <a  >
                        <svg xmlns="http://www.w3.org/2000/svg" id="view-${employee.id}" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg>
                         </a>
                          <a href="#" class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" id="delete-${employee.id}" width="16" height="16" fill="currentColor" class=" bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                      </svg> </a></td> `;
                  
                
                 
                 employeeContainer.appendChild(employeetr);
                 const span = document.getElementById(`avalible-${employee.id}`);
                 if(employee.avaliable)
                 {
                    span.className='status completed' ;
                    span.textContent='متاح';
                    avalible=false;
                  
                 } 
                  // Create a update button and add an event listener
                  const updateButton = document.getElementById(`update-${employee.id}`);
                  
        
                  updateButton.addEventListener('click',  () => {
         
                    window.location.href =`editemployee.html?employeeId=${employee.id}`;
        
                  });
                  //// Create a delete button and add an event listener
                  const deleteButton = document.getElementById(`delete-${employee.id}`);
                  deleteButton.addEventListener('click', function() {
                      
                      if(window.confirm("هل متأكد من أنك تريد حذف هذا الموظف"))
                        {deleteemployee(employee.id);}
                  });
                  // Create a view button and add an event listener
                  const viewButton = document.getElementById(`view-${employee.id}`);
                  
        
                  viewButton.addEventListener('click',  () => {
        
                   
                    window.location.href =`viewemployee.html?employeeId=${employee.id}`;
        
                  });
                   
                });

                const searchButton = document.getElementById(`search`);
                    
                searchButton.addEventListener('click',  () => {
              
                  const search=document.getElementById('search_input').value;
                  console.log(search)
                  searchemployee(search);
                  
                });
              
            } else {
                console.error('Error fetching employee:', xhr.statusText);
            }
        }
    };
    xhr.send();
}
function deleteemployee(id) {
    
    
    
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://127.0.0.1:8000/api/employee/delete?id=${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                displayemployee();
                showAlert(null,response.message,response.status);
                displayemployee();
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors ,response.message,response.status);
                console.error('Delete error:', response.errors || response.message);
            }
        }
    };
    xhr.send();
    
}
function searchemployee(input) {
  
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://127.0.0.1:8000/api/employee/search/${input}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                const employees = JSON.parse(xhr.responseText);
                   
                // Clear existing employee
                const employeeContainer = document.getElementById('employees');
                employeeContainer.innerHTML =``;
               
                employees.forEach(function(employee) {
                  
                  
                  const employeetr = document.createElement('tr');
                    
                  let avalible = false;
                  if (employee.employed) {
                        
                        avalible = true;
                    }
                  employeetr.innerHTML = ` <td>
                        <img src="${employee.image}">
                        <p>${employee.name}</p></td>
                      <td>${employee.date}</td>
                    <td><span class="status pending "  id="avalible-${employee.id}">في أجازة</span></td>  `;
                  
                
                 
                 employeeContainer.appendChild(employeetr);
                 const span = document.getElementById(`avalible-${employee.id}`);
                 if(avalible)
                 {
                    span.className='status completed' ;
                    span.textContent='متاح';
                    avalible=false;
                  
                 } 
                   
                
                 
                  
                });
            } else {
              if (xhr.status === 204) {
                // show no result message
                       
         
          
          const accountContainer = document.getElementById('employees');
          accountContainer.innerHTML = '';

          const accounttr = document.createElement('tr');

          accounttr.innerHTML = `
                      
            <td>
             
            <td > no result found !!</td>    
            
         `;
          accountContainer.appendChild(accounttr);
              }
            }
        }
    };
    xhr.send();
    
  }
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('employees');
    const div = document.createElement('div');
    console.log(data)
    if (status) {
      div.className = "success alert d-none mt-3 mx-auto"
      div.innerHTML = ` 
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
        <svg width="50" height="50" id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle fill="#fff" cx="64" cy="64" r="64"/></g><g><path fill="#3EBD61" d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z"/></g></svg>
      </div>
      
    <p  height="80px";>${message}</p>
    
  
  </div>
  <button class="close"  id="AlertButton">
  <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
  </button>
  `
    }
    if (!status) {
      div.className = "warning alert d-none mt-3 mx-auto"
      div.innerHTML = ` 
    
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/></svg>
    </div>
       
    <p height="100px"> ${message} </p>
    <p height="100px"> ${JSON.stringify(data)} </p>
   
    </div>
    <button class="close" id="AlertButton">
     <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
    </button>
  </div>
  
  `
    }
    if (status == null) {
      div.className = "danger alert d-none mt-3 mx-auto"
      div.innerHTML = ` 
    
    <div class="content-message-alert" id ="AlertMessage">
      <div class="icon">
      <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/></svg>
      </div>
      <p height="100px"> ${message} </p>
      </div>
      <button class="close" id="AlertButton">
       <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
      </button>
  </div>
  
  `
    }
    Message.appendChild(div);
    div.classList.remove('d-none');
    const alertButton = document.getElementById('AlertButton');
    alertButton.addEventListener('click', () => {
      // Get the message container
  
  
      // Remove the message container from the DOM
      div.remove();
    });
}


window.addEventListener('load', displayemployee);

