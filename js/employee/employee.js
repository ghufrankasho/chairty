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
                  
                  employeenum.textContent=employees[0].number;
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
    xhr.open('DELETE', `http://127.0.0.1:8000/api/employee/delete/${id}`, true);
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
    <div class="content" id ="AlertMessage">
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
    
    <div class="content" id ="AlertMessage">
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
    
    <div class="content" id ="AlertMessage">
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

