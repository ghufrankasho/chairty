var project_id=null;
function displaysupport() {
   

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/doner', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const div_supports = document.getElementById('suports_div');
                     
                    div_supports.style.display='block';
                    const select_supports = document.getElementById('supports');
                     
                
                 
                  select_supports.options.length = 0;
                   // Clear existing options
                   const option = document.createElement("option");
                   option.text ="select";
                   option.value ="0";
                   select_supports.add(option);
                  // Populate branches
                  for (const key in response) {
                      
                          const doner = response[key];
                          const option = document.createElement("option");
                          option.text = doner.name;
                          option.value = doner.id;
                          select_supports.add(option);
                    
                   
                  }
                    
                   
                    
                  
                  
                   
                } catch (e) {
                    console.error("Failed to parse response JSON:", e);
                }
            } else {
                console.error("Error with request, status code:", xhr.status);
            }
        }
    };
  
  
    xhr.send();
}
function displayvolunter() {
   

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/user/volunter', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const divvolunters = document.getElementById('vlounters_div');
                     
                    divvolunters.style.display='block';
                    const selectvolunters = document.getElementById('volunters');
                   
                 
                    selectvolunters.options.length = 0;
                   // Clear existing options
                   const option = document.createElement("option");
                   option.text ="select";
                   option.value ="0";
                   selectvolunters.add(option);
                  // Populate branches
                  for (const key in response) {
                      
                          const user = response[key];
                          const option = document.createElement("option");
                          option.text = user.first_name+" "+user.last_name;
                          option.value = user.id;
                          selectvolunters.add(option);
                 }
                } catch (e) {
                    console.error("Failed to parse response JSON:", e);
                }
            } 
            else {
              const response = JSON.parse(xhr.responseText);
              showAlert(response.errors, response.message, response.status);
             
              // const v=document.getElementById('no_volunter');
              // v.style.display='block';
            }
        }
    };
  
  
    xhr.send();
}
function assignProjectToSupport() {
    let project_id=localStorage.getItem('id');
    
    const supportElement = document.querySelector('#supports');
    const support = supportElement.options[supportElement.selectedIndex].value;
    const data = { project_id: project_id ,
        doner_id:support,

    };
    console.log("data inside", data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/doner/attach', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                    const response = JSON.parse(xhr.responseText);
                    console.log('Update success:', response.message);
                    showAlert(null, response.message, true);
            }
            else {
                    const response = JSON.parse(xhr.responseText);
                    showAlert(response.errors, response.message, response.status);
                    console.error('Update error:', response.errors || response.message);
                }
         
        }
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function assignProjectTovolunter() {
    
    
    const supportElement = document.querySelector('#volunters');
    const support = supportElement.options[supportElement.selectedIndex].value;
    const data = { project_id: project_id ,
        user_id:support

    };
    console.log("data inside", data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/user/attach', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                
                    const response = JSON.parse(xhr.responseText);
                    console.log('Update success:', response.message);
                    showAlert(null, response.message, true);
            }
            else {
                    const response = JSON.parse(xhr.responseText);
                    showAlert(response.errors, response.message, response.status);
                    console.error('Update error:', response.errors || response.message);
                }
         
        }
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}
  // Call the displayProject function when the page loads
  window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    project_id=projectId;
    console.log("projectId from URL:", projectId);
  
    // Call the function with the retrieved project ID
    if (projectId) {
        project_id=projectId;
        const save_btn= document.getElementById('save_btn');
        save_btn.onclick=function(){
            assignProjectTovolunter();
        }
        displayvolunter();
    } else {

        displaysupport();
    }
       
 
     
    
  });
  function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('project');
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
      if(status)window.location.href =`/index.html`;
    });
  }