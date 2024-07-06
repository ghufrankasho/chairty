function displayProjects() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/project/', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const projects = JSON.parse(xhr.responseText);
                const projectContainer = document.getElementById('projects');
                
                // Clear existing projects
                projectContainer.innerHTML = '';
                
                projects.forEach(function(project) {
                  
                    const projectli = document.createElement('li');
                    if(project.prograss>=80)
                   {
                    projectli.className = 'completed';
                   }
                   else{
                    projectli.className = 'not-completed';
                   }
                    projectli.innerHTML = `
                        <p> ${project.name}</p>
					
                        <a>   <i class='bx bxs-heart' id='support-${project.id}'></i>  </a>
                        <a><i class='fas fa-user-alt'  id='volunter-${project.id}'></i> </a>
                        </li>
                      `;
                 
                    projectContainer.appendChild(projectli);
                    if(project.doners.length ===0){
                        document.getElementById(`support-${project.id}`).className=`fas fa-heart-broken`;
                        
                 }
                 if(project.user.length ===0){
                  document.getElementById(`volunter-${project.id}`).className=`fas fa-user-alt-slash`;
                  
           }
              // Create a update button and add an event listener
              const supportButton = document.getElementById(`support-${project.id}`);
                
        
              supportButton.addEventListener('click',  () => {
                if(supportButton.className !=`fas fa-heart-broken`)
              {  localStorage.setItem("doners", JSON.stringify(project.doners));
                let doners = localStorage.getItem("doners");
                console.log(doners);
                   
                window.location.href =`/support/support.html`;}
        
              });
               // Create a update button and add an event listener
              const volunterButton = document.getElementById(`volunter-${project.id}`);
                
              volunterButton.addEventListener('click',  () => {
                if(volunterButton.className !=`fas fa-user-alt-slash`)
               { 
                localStorage.setItem("users", JSON.stringify(project.user));
                localStorage.setItem("employees", JSON.stringify(project.employees));
                  
              
                    
                 window.location.href =`/home/usersProject.html`;
                }
         
               });
                
          });
            } else {
                console.error('Error fetching projects:', xhr.statusText);
            }
        }
    };
    xhr.send();
}

function displayrequest() {
    const xhr = new XMLHttpRequest();
    const request_num=document.getElementById('request_num');
    const orphen_num=document.getElementById('orphen_num');
    xhr.open('GET', 'http://127.0.0.1:8000/api/user/request', true);
   

    xhr.onreadystatechange = function () {
    
        if (xhr.readyState === 4) {
       
            if (xhr.status === 200) {
             
                const requests = JSON.parse(xhr.responseText);
                request_num.textContent=requests.length;
                orphen_num.textContent=requests[0].orphen;
                const requestContainer = document.getElementById('requests');
                
                // Clear existing requests
                requestContainer.innerHTML = '';
                
                requests.forEach(function(request) {
                  console.log(request);
                    const requesttr = document.createElement('tr');
                   
                   requesttr.className='tra';
                   requesttr.id='tra';
                    requesttr.innerHTML = `
                        <td>
                        <a href="/prof.html"> <img src="${request.image}" ></a>
                        <p id='name-${request.id}'></p>
                        </td>
                        <td>${request.date}</td>
                        <td><li   id="avalible-${request.id}">موظف</li></td>
                        </tr>
                      `;
                      
                    
                      requestContainer.appendChild(requesttr);
                      const span = document.getElementById(`avalible-${request.id}`);
                      console.log(span);
                    if(request.is_user)
                      {
                        span.className='status completed';
                        span.textContent='متطوع';
                        document.getElementById(`name-${request.id}`).textContent=request.first_name+" "+request.last_name;
                        
                        
                      }
                      else{
                        span.className='status not-completed' ;
                        document.getElementById(`name-${request.id}`).textContent=request.name;
                        
                        
                      }
                  
                      
                  
                });
                
        
            }
        }
   
  };
  xhr.send();
}
  window.addEventListener('load', () => {
    displayProjects();
    
    displayrequest();
  
  });
  function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('project');
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

  