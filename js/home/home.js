function displayProjects() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/project/get', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const projects = JSON.parse(xhr.responseText);
                const projectContainer = document.getElementById('projects');
                
                // Clear existing projects
                projectContainer.innerHTML = '';
                
                projects.forEach(function(project) {
                  
                    const projectli = document.createElement('li');
                   
                    if(project.prograss>=50)
                   {
                    projectli.className = 'completed';
                   }
                   else{
                    projectli.className = 'not-completed';
                   }
                    projectli.innerHTML = `
                       <a id="${project.id}"><p> ${project.name}</p></a>
					
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
            // Create a project button and add an event listener
            const btnproject = document.getElementById(`${project.id}`);
                
        
            btnproject.addEventListener('click',  () => {
              localStorage.setItem('id',project.id);
              window.location.href =`/project/projDesc.html`;
      
            });
              // Create a update button and add an event listener
              const supportButton = document.getElementById(`support-${project.id}`);
                
        
              supportButton.addEventListener('click',  () => {
              if(supportButton.className !=`fas fa-heart-broken`)
              {  
                localStorage.setItem("doners", JSON.stringify(project.doners));
                
                 
                window.location.href =`/support/support.html`;
              }
              else{
                localStorage.setItem("id", project.id);
                localStorage.setItem("name", project.name);
                localStorage.setItem("description", project.description);
                localStorage.setItem("image", project.image);
                window.location.href =`/project/assignSupport.html`;
              }
        
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
              else{
            
                   
                  localStorage.setItem("name", project.name);
                  localStorage.setItem("description", project.description);
                  localStorage.setItem("image", project.image);
                  window.location.href =`/project/assignSupport.html?projectId=${project.id}`;
                
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
    const donation_num=document.getElementById('donation_num');
    xhr.open('GET', 'http://127.0.0.1:8000/api/user/request', true);
   

    xhr.onreadystatechange = function () {
    
        if (xhr.readyState === 4) {
       
            if (xhr.status === 200) {
             
                const requests = JSON.parse(xhr.responseText);
                request_num.textContent=requests.length;
                orphen_num.textContent=requests[0].orphen;
                donation_num.textContent=requests[0].donations;
                const requestContainer = document.getElementById('requests');
                
                // Clear existing requests
                requestContainer.innerHTML = '';
                
                requests.forEach(function(request) {
            
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
  
  