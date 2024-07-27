 
 
function displayProjects() {
   
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://127.0.0.1:8000/api/project/get_pages`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const projects = JSON.parse(xhr.responseText);
                const projectContainer = document.getElementById('projects');
                
                if (projects.length > 0) {
                    projects.forEach(function(project) {
                        const projectDiv = document.createElement('div');
                        projectDiv.className = 'box';
                        projectDiv.innerHTML = `
                            <div class="image">
                                <img src="${project.image}" alt="">
                            </div> 
                            <div class="content">
                                <h3>${project.name}</h3>
                                <p>${project.description}</p>
                                <a href="#" class="btn" id="details-${project.id}">Read More</a>
                                <div class="icons">
                                    <span><i class="fas fa-calendar"></i> ${project.date}</span>
                                </div>
                            </div>
                        `;
                        projectContainer.appendChild(projectDiv);
                        
                        // Add event listener to "Read More" button
                        const detailsButton = document.getElementById(`details-${project.id}`);
                        detailsButton.addEventListener('click', (event) => {
                            event.preventDefault(); // Prevent default link behavior
                            const projectId = project.id;
                            localStorage.setItem('image',project.image);
                            localStorage.setItem('description',project.description);
                            localStorage.setItem('name',project.name);
                            if(project.fundrise==0)localStorage.setItem('fundrise',0);
                            else localStorage.setItem('fundrise',project.fundrise);
                            window.location.href = `/prodetail.html?projectId=${projectId}`;
                        });
                    });
                } else {
                    console.log('No more projects to load');
                    // Optionally, disable the "Load More" button if no more projects are available
                    document.getElementById('load-more').disabled = true;
                }
            } else {
                console.error('Error fetching projects:', xhr.statusText);
            }
        }
    };
    xhr.send();
}
function searchproject(input) {
   
    const data = JSON.stringify({ "search": input });  // Ensure id is an integer
  
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/project/search/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
  
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
  
          const projects = JSON.parse(xhr.responseText);
          const projectContainer = document.getElementById('projects');
          projectContainer.innerHTML = '';
         
          projects.forEach(function (project) {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'box';
            projectDiv.innerHTML = `
                <div class="image">
                    <img src="${project.image}" alt="">
                </div> 
                <div class="content">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="#" class="btn" id="details-${project.id}">Read More</a>
                    <div class="icons">
                        <span><i class="fas fa-calendar"></i> ${project.date}</span>
                    </div>
                </div>
            `;
            projectContainer.appendChild(projectDiv);
    // Add event listener to "Read More" button
    const detailsButton = document.getElementById(`details-${project.id}`);
    detailsButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const projectId = project.id;
        localStorage.setItem('image',project.image);
        localStorage.setItem('description',project.description);
        localStorage.setItem('name',project.name);
        if(project.fundrise==0)localStorage.setItem('fundrise',0);
        else localStorage.setItem('fundrise',project.fundrise);
        window.location.href = `/prodetail.html?projectId=${projectId}`;
    });
         
  
          });
  
        } }
        else {
          if (xhr.status === 204) {
            // show no result message
            
            
            const projectContainer = document.getElementById('projects');
            projectContainer.innerHTML = '';
  
            const projecttr = document.createElement('tr');
  
            projecttr.innerHTML = `
                        
         
               
              <td >no result found </td>    
             
           `;
            projectContainer.appendChild(projecttr);
          }
        }
      };
      xhr.send(data);
  
  }
 

window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
     
    console.log("search from URL:", search);
  
    // Call the function with the retrieved project ID
    if (search) {
        searchproject(search);
    } else {
        displayProjects();
    }
    

   
    });
 
