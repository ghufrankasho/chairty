var user_id=0;
 

function displayuser(){

    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://127.0.0.1:8000/api/user/show?id=${user_id}`, true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
               
                try {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('image').src = response.image;
                    document.getElementById('name').textContent = response.first_name +" "+response.last_name;
                    document.getElementById('type').textContent = response.work.name;
                    document.getElementById('phone').textContent = response.mobile;
                    document.getElementById('email').textContent = response.account.email;
                     
                    
                     
                    if(response. project!==null )
                    {
                        const projectContainer = document.getElementById('projects');
              
                        // Clear existing projects
                        projectContainer.innerHTML = '';
                        
                         
                            const projectDiv = document.createElement('div');
                            projectDiv.className = 'box';
                            projectDiv.innerHTML = `
                                <img src="${response. project.image}" alt="">
                                <div class="content">
                                    <h3>${response. project.name}</h3>
                                   
                                    <p>${response. project.description}</p>
                                    <div class="progress-bar">
                                        <div class="progress-per" per="${response. project.prograss}%" style="max-width:${response. project.prograss}%"></div>
                                    </div>
                                    <div class="info">
                                     
                                    <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="update-${response. project.id}" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                   </a>
                                   <a href="#">
                                  <svg xmlns="http://www.w3.org/2000/svg" id="view-${response. project.id}" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                    </svg>
                                   </a>
                                  <a href="#" class="delete">
                                  <svg xmlns="http://www.w3.org/2000/svg" id="delete-${response. project.id}" width="16" height="16" fill="currentColor" class=" bi bi-x-square" viewBox="0 0 16 16">
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg> </a>
                               </div >
                               </div >
                                </div>`;
                            
                            projectContainer.appendChild(projectDiv);
                            
                            const deleteButton = document.getElementById(`delete-${response.project.id}`);
                            deleteButton.addEventListener('click', function() {
                                
                            if(window.confirm("هل متأكد من أنك تريد حذف هذا المشروع؟"))
                                {deleteProject(project.id);}
                            });
                            // Create a update button and add an event listener
                            const updateButton = document.getElementById(`update-${response.project.id}`);
                            
          
                            updateButton.addEventListener('click',  () => {
                          
                              const projectId = response.project.id;
                               
                              // console.log(projectId)
                              window.location.href =`/project/updateproj.html?projectId=${projectId}`;
                              
                            });
                                     // Create a update button and add an event listener
                            const viewButton = document.getElementById(`view-${response.project.id}`);
                            
          
                            viewButton.addEventListener('click',  () => {
                          
                              const projectId = response.project.id;
                               
                              // console.log(projectId)
                              window.location.href =`/project/projDesc.html?projectId=${projectId}`;
                              
                            });
                      
                    }
                    else{
                        document.getElementById("usersh").style.display = "block"
                    }
                    
                    
                } catch (e) {
                    console.error("Failed to parse response JSON:", e);
                }
            } else {
                console.error("Error with request, status code:", xhr.status);
            }
        }
    };
  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
function deleteProject(id) {
    const data = JSON.stringify({ "id": id });  // Ensure id is an integer
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://127.0.0.1:8000/api/project/delete/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                // showAlert(null,response.message,response.status);
                // Optionally, refresh the projects list or remove the deleted project from the DOM
                displayuser();
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors ,response.message,response.status);
                console.error('Delete error:', response.errors || response.message);
            }
        }
    };
    xhr.send();
  }
 // Call the displayProject function when the page loads
  window.addEventListener('load', () => {
    // Get the project ID from the query parameters (e.g., "?projectId=20")
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    
    console.log("userId from URL:", userId);
    user_id=userId;
    // Call the function with the retrieved user ID
    if (userId) {
        displayuser();
    } else {
        console.error("No userId found in URL parameters.");
    }
  });