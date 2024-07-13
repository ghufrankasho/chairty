
var project_id=0;
 
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const dateInput1 = document.getElementById('dateInput1');
  const dateInput2 = document.getElementById('dateInput2');
  const descInput = document.getElementById('desc');

  nameInput.addEventListener('input', validateName);
  dateInput1.addEventListener('input', validateDates);
  dateInput2.addEventListener('input', validateDates);
  descInput.addEventListener('input', validateDescription);
});

function validateName() {
  const nameInput = document.getElementById('nameInput');
  const nameError = document.getElementById('nameError');
  const value = nameInput.value.trim();

  if (!value) {
      nameInput.classList.add('error');
      nameError.textContent = 'اسم المشروع مطلوب';
  } else if (value.length > 100) {
      nameInput.classList.add('error');
      nameError.textContent = 'اسم المشروع لا يجب أن يتجاوز 100 أحرف';
  } else {
      nameInput.classList.remove('error');
      nameError.textContent = '';
  }
}

function validateDates() {
  const dateInput1 = document.getElementById('dateInput1');
  const dateInput2 = document.getElementById('dateInput2');
  const dateError1 = document.getElementById('dateE');
  const dateError2 = document.getElementById('dateError2');

  const startDate = new Date(dateInput1.value);
  const endDate = new Date(dateInput2.value);
  const maxDate = new Date('2030-12-31');

  if (!dateInput1.value) {
      dateInput1.classList.add('error');
      dateError1.textContent = 'تاريخ البداية مطلوب';
  } else if (startDate > maxDate) {
      dateInput1.classList.add('error');
      dateError1.textContent = 'التاريخ لا يجب أن يتجاوز 2030';
  } else {
      dateInput1.classList.remove('error');
      dateError1.textContent = '';
  }

  if (!dateInput2.value) {
      dateInput2.classList.add('error');
      dateError2.textContent = 'تاريخ النهاية مطلوب';
  } else if (endDate < startDate) {
      dateInput2.classList.add('error');
      dateError2.textContent = 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
  } else if (endDate > maxDate) {
      dateInput2.classList.add('error');
      dateError2.textContent = 'التاريخ لا يجب أن يتجاوز 2030';
  } else {
      dateInput2.classList.remove('error');
      dateError2.textContent = '';
  }
}

function validateDescription() {
  const descInput = document.getElementById('desc');
  const descError = document.getElementById('descError');
  const value = descInput.value.trim();

  if (!value) {
      descInput.classList.add('error');
      descError.textContent = 'وصف المشروع مطلوب';
  } else if (value.length > 2000) {
      descInput.classList.add('error');
      descError.textContent = 'وصف المشروع لا يجب أن يتجاوز 2000 حرف';
  } else {
      descInput.classList.remove('error');
      descError.textContent = '';
  }
}

let originalProject = {};

function displayProject(projectId) {
    const data = { id: projectId };
    console.log("data inside", data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/project/show/', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('profile-pic').src = response.image;
                    document.getElementById('nameInput').value = response.name;
                    const select1 = document.getElementById('departments');
                   
                    response.departments.forEach(function(department) {
                        var c1 = document.createElement("option");
                        c1.text = department.name;
                        c1.id = department.id;
                        select1.options.add(c1, department.name);
                    });
                    const select = document.getElementById('types');
                   
                    response.types.forEach(function(type) {
                        var c = document.createElement("option");
                        c.text = type.name;
                        c.id = type.id;
                        select.options.add(c, type.name);
                    });
                    document.getElementById('dateInput1').value = response.start_date;
                    document.getElementById('dateInput2').value = response.end_date;
                    document.getElementById('desc').value = response.description;
                    document.getElementById('fundrise').value = response.fundrise;
                    // Store original values
                    originalProject = {
                        name: response.name,
                        department: select1.value,
                        type: select.value,
                        start_date: response.start_date,
                        end_date: response.end_date,
                        description: response.description,
                        fundrise:response.fundrise,
                    };
                } catch (e) {
                    console.error("Failed to parse response JSON:", e);
                }
            } else {
                console.error("Error with request, status code:", xhr.status);
            }
        }
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

 
function updateProject() {
  const formData = new FormData();  
  const deparElement = document.querySelector('#departments');
  const department = deparElement.options[deparElement.selectedIndex].id;
  const typeElement = document.querySelector('#types');
  const type = typeElement.options[typeElement.selectedIndex].id;

  const currentProject = {
      name: document.getElementById('nameInput').value,
      department: department,
      type: type,
      start_date: document.getElementById('dateInput1').value,
      end_date: document.getElementById('dateInput2').value,
      description: document.getElementById('desc').value,
      fundrise:document.getElementById('fundrise').value,
  };

  // Compare current values with original values and append only changed fields
  if (currentProject.name !== originalProject.name) {
      formData.append('name', currentProject.name);
  }
  if (currentProject.department !== originalProject.department) {
      formData.append('department_id', currentProject.department);
  }
  if (currentProject.type !== originalProject.type) {
      formData.append('project_type_id', currentProject.type);
  }
  if (currentProject.start_date !== originalProject.start_date) {
      formData.append('start_date', currentProject.start_date);
  }
  if (currentProject.end_date !== originalProject.end_date) {
      formData.append('end_date', currentProject.end_date);
  }
  if (currentProject.description !== originalProject.description) {
      formData.append('description', currentProject.description);
  }
  if (currentProject.fundrise !== originalProject.fundrise) {
    formData.append('fundrise', currentProject.fundrise);
}

  // Check if a new image file has been selected
  const imageInput = document.getElementById('input-file');
  if ( imageInput !=null && imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
  }

  formData.append('id', project_id); // Always include the project ID
   console.log(...formData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/project/update/', true);

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              console.log('Update success:', response.message);
              showAlert(null, response.message, response.status);
          } else {
              const response = JSON.parse(xhr.responseText);
              showAlert(response.errors, response.message, response.status);
              console.error('Update error:', response.errors || response.message);
          }
      }
  };

  xhr.send(formData);
}

  
  // Call the displayProject function when the page loads
  window.addEventListener('load', () => {
    // Get the project ID from the query parameters (e.g., "?projectId=20")
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    project_id=projectId;
    console.log("projectId from URL:", projectId);
  
    // Call the function with the retrieved project ID
    if (projectId) {
        displayProject(projectId);
    } else {
        console.error("No projectId found in URL parameters.");
    }
  });
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('form');
    const div = document.createElement('div');
    console.log(data)
    if (status) {
      div.className = "success alert d-none mt-3 mx-auto"
      div.innerHTML = ` 
    <div class="content-message" id ="AlertMessage">
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
    
    <div class="content-message" id ="AlertMessage">
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
    
    <div class="content-message" id ="AlertMessage">
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
      if(status)window.location.href =`/project/proj.html`;
    });
  }