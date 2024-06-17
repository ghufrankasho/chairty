function displayaccounts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/user/get_accounts', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const accounts = JSON.parse(xhr.responseText);
                const accountContainer = document.getElementById('accounts');
                
                // Clear existing accounts
                accountContainer.innerHTML = '';
                
                accounts.forEach(function(account) {
                
                    const accounttr = document.createElement('tr');
                    
                    accounttr.innerHTML = `
                    <td>
                    
                    <p>${account.email}</p>
                </td>
                <td>${account.date}</td>
                 <td><div class="col-lg-12 col-md-6 col-sm-6  mb-3">
                    
                    <select name="type" id="select-${account.id}">
                        <option id="option-${account.id}" > </option>
                        <option value="0" > مستخدم</option>
                        <option value="2"  >جهة داعمة </option>
                        <option value="3" >موظف </option>
                        <option value="4" >رئيس قسم </option>
                         
                    </select>
    
                </div></td>
                <td> <input type="checkbox"  value="0" id='box-${account.id}'></td>`;
                    
                    accountContainer.appendChild(accounttr);
                    
                  
                  const checkbox=document.getElementById(`box-${account.id}`);
                  checkbox.addEventListener('change', function () {
                  const option=document.getElementById(`option-${account.id}`);
                 
                  if (this.checked ) {
                 const selectElement = document.querySelector(`#select-${account.id}`);
                 option.text=selectElement.options[selectElement.selectedIndex].text
                
                  let type = selectElement.value;
 
               
                  if(window.confirm("هل تريد المتابعة بهذا التأكيد؟"))
                   
                  {
                
                    changeAccountType(type,account.id); 
                  }
                  } 
                   
                  });
                  const searchButton = document.getElementById(`search`);    
                  searchButton.addEventListener('click',  function(e) {
                    e.stopImmediatePropagation();
                    const search=document.getElementById('search_input').value;
                    console.log("inside button "+search)
                    searchaccount(search);
                   
                    
                  });
                });
            } else {
                console.error('Error fetching accounts:', xhr.statusText);
            }
        }
    };
    xhr.send();
  }
function searchaccount(input) {
    console.log("inside searchaccount" +input);
    const data = JSON.stringify({ "search": input });  // Ensure id is an integer

    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/user/search_account/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
       
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                const accounts = JSON.parse(xhr.responseText);
                const accountContainer = document.getElementById('accounts');
                accountContainer.innerHTML='';
                accounts.forEach(function(account) {
                  const accounttr = document.createElement('tr');
                  
                  accounttr.innerHTML = `
                  
                  <td>
                    
                  <p>${account.email}</p>
              </td>
              <td>${account.date}</td>
               <td><div class="col-lg-12 col-md-6 col-sm-6  mb-3">
                  
                  <select name="type" id="type-${account.id}">
                      <option >${account.type}</option>
                      <option value="0"> مستخدم</option>
                      <option value="2">جهة داعمة </option>
                      <option value="3">موظف </option>
                      <option value="4">رئيس قسم </option>
                       
                  </select>
  
              </div></td>
              <td> <input type="checkbox"  value="0" id='${account.id}'></td>`;
                  
               accountContainer.appendChild(accounttr);
            
              });
               
            } 
            else {
              if (xhr.status === 204) {
                // show no result message
                console.log("no result");
               
          const accountthead = document.getElementById('thead');
          accountthead.innerHTML = '';
          const accountContainer = document.getElementById('accounts');
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
    xhr.send(data);
    
}  
function changeAccountType(type,id) {
    const data = JSON.stringify({ "type": type, "id":id});  // Ensure id is an integer
    console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/user/type', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              // displayaccounts();
            } 
            else {
              const response = JSON.parse(xhr.responseText);
              
              // showAlert(response.errors ,response.message,response.status);
               
            }
        }
    };
    xhr.send(data);
  }
  function deleteaccount(id) {
    const data = JSON.stringify({ "id": id });  // Ensure id is an integer
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://127.0.0.1:8000/api/account/delete/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                showAlert(null,response.message,response.status);
                // Optionally, refresh the accounts list or remove the deleted account from the DOM
                displayaccounts();
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors ,response.message,response.status);
                console.error('Delete error:', response.errors || response.message);
            }
        }
    };
    xhr.send(data);
  }  
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('account');
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
  window.addEventListener('load', displayaccounts);
  