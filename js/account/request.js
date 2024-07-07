function displayemployees() {
  console.log("  console.log(employee_request);");
  const xhr = new XMLHttpRequest();
  const num_employ = document.getElementById('num_employ');
  xhr.open('GET', 'http://127.0.0.1:8000/api/employee/request', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 & xhr.status === 200) {

      const employee_request = JSON.parse(xhr.responseText);
      const employeeContainer = document.getElementById('employee_request');
      num_employ.textContent = employee_request.length;

      // Clear existing employee_request
      employeeContainer.innerHTML = '';

      employee_request.forEach(function (employee) {

        const employeetr = document.createElement('tr');

        employeetr.innerHTML = `
                     <td>
                    <img src="${employee.image}">
                        <p> ${employee.name} </p>
                    </td>
                       
                    <td> <a  ><i class='bx bx-message-square-x' id="delete-${employee.id}"></i></a>
                    <a ><i class='bx bx-edit-alt' id="update-${employee.id}">عرض</i></a></td>
                 ` ;

        employeeContainer.appendChild(employeetr);
        const deleteButton = document.getElementById(`delete-${employee.id}`);
        deleteButton.addEventListener('click', function () {
          if (window.confirm("هل  أنت متأكد ؟")) {
            deleteemployee(employee.id);
          }
        });


        // Create a update button and add an event listener
        const updateButton = document.getElementById(`update-${employee.id}`);


        updateButton.addEventListener('click', () => {

          const employeeId = employee.id;

          window.location.href = `employmentapplication.html?employeeId=${employeeId}`;

        });
      });
      const searchButton = document.getElementById(`search_employee`);
      searchButton.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        const search_input_employee = document.getElementById('search_input_employee').value;

        search(search_input_employee,false);
      });
    }

    else {
      console.log('Error fetching employee_request:', xhr.statusText);
    }
  }
  xhr.send();
}
function displayVolunter() {
  console.log("  console.log(employee_request);");
  const xhr = new XMLHttpRequest();
  const num_volunter = document.getElementById('num_volunter');
  xhr.open('GET', 'http://127.0.0.1:8000/api/user/get_volunter', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 & xhr.status === 200) {

      const volunter_request = JSON.parse(xhr.responseText);
      const vlounterContainer = document.getElementById('volunter_request');
      num_volunter.textContent = volunter_request[0].number;

      // Clear existing employee_request
      vlounterContainer.innerHTML = '';

      volunter_request.forEach(function (volunter) {

        const voluntertr = document.createElement('tr');

        voluntertr.innerHTML = `
                     <td>
                    <img src="${volunter.image}">
                        <p> ${volunter.first_name} ${volunter.last_name} </p>
                    </td>
                       
                    <td> <a  ><i class='bx bx-message-square-x' id="delete-${volunter.id}"></i></a>
                    <a ><i class='bx bx-edit-alt' id="update-${volunter.id}">عرض</i></a></td>
                 `;

        vlounterContainer.appendChild(voluntertr);
        const deleteButton = document.getElementById(`delete-${volunter.id}`);
        deleteButton.addEventListener('click', function () {
          if (window.confirm("هل  أنت متأكد ؟")) {
            deleteuser(volunter.id);
          }
        });


        // Create a update button and add an event listener
        const updateButton = document.getElementById(`update-${volunter.id}`);


        updateButton.addEventListener('click', () => {

          const volunterId = volunter.id;

          window.location.href = `employmentapplication.html?volunterId=${volunterId}`;

        });
      });
      const searchButton = document.getElementById(`search_user`);
      searchButton.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        const search_input_user = document.getElementById('search_input_user').value;

        search(search_input_user,true);
      });
    }

    else {
      console.log('Error fetching employee_request:', xhr.statusText);
    }
  }
  xhr.send();
}
function search(input,is_user) {
   
  const data = JSON.stringify({ "search": input ,
    "is_user":is_user
  });  // Ensure id is an integer


  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/user/search/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {

    if (xhr.readyState === 4) {
   
      if (xhr.status === 200) {
        var Container = '';
        if(is_user)Container=document.getElementById('volunter_request');
        else Container=document.getElementById('employee_request');
        const request = JSON.parse(xhr.responseText);
       
        Container.innerHTML = '';
        request.forEach(function (data) {
          const employeetr = document.createElement('tr');

        employeetr.innerHTML = `
                     <td>
                    <img src="${data.image}">
                        <p id="name-${data.id}"> ${data.name} </p>
                    </td>
                       
                    <td> <a  ><i class='bx bx-message-square-x' id="delete-${data.id}"></i></a>
                    <a ><i class='bx bx-edit-alt' id="update-${data.id}">عرض</i></a></td>
                 ` ;

        Container.appendChild(employeetr);
        const name = document.getElementById(`name-${data.id}`);
        console.log(name);
        if(is_user) name.textContent=data.first_name +" "+data.last_name;
        
        const deleteButton = document.getElementById(`delete-${data.id}`);
        deleteButton.addEventListener('click', function () {
          if (window.confirm("هل  أنت متأكد ؟")) {
            if(is_user)deleteuser(data.id);
            else deleteemployee(data.id);
          }
        });


        // Create a update button and add an event listener
        const updateButton = document.getElementById(`update-${data.id}`);


        updateButton.addEventListener('click', () => {

          const employeeId = data.id;

          window.location.href = `employmentapplication.html?employeeId=${employeeId}`;

        });
        Container.appendChild(employeetr);
        });

      }
      else {
        if (xhr.status === 204) {
          var Container = '';
          if(is_user)Container=document.getElementById('volunter_request');
          else Container=document.getElementById('employee_request');
          // show no result message
           
          Container.innerHTML = '';

          const accounttr = document.createElement('tr');

          accounttr.innerHTML = `
                      
            <td>
             
            <td > no result found !!</td>    
            
         `;
         Container.appendChild(accounttr);
        }
      }
    }
  };
  xhr.send(data);

}

function deleteemployee(id) {
  const data = JSON.stringify({ "id": id });  // Ensure id is an integer
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://127.0.0.1:8000/api/employee/delete', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('Delete success:', response.message);

        // Optionally, refresh the employee_request list or remove the deleted employee from the DOM
        displayemployees();
      } else {
        const response = JSON.parse(xhr.responseText);
        showAlert(response.errors, response.message, response.status, 'employee_request');

      }
    }
  };
  xhr.send(data);
}
function deleteuser(id) {
  const data = JSON.stringify({ "id": id });  // Ensure id is an integer
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://127.0.0.1:8000/api/user/delete', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('Delete success:', response.message);

        // Optionally, refresh the employee_request list or remove the deleted employee from the DOM
        displayVolunter();
      } else {
        const response = JSON.parse(xhr.responseText);
        showAlert(response.errors, response.message, response.status, 'volunter_request');

      }
    }
  };
  xhr.send(data);
}
function showAlert(data, message, status, form) {
  // Show the success message in the "success-message" div
  const Message = document.getElementById(form);
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

window.addEventListener('load', function () {
   
 
    displayVolunter();
    displayemployees();
  



});
 
 


 
