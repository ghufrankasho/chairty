function viewProject(projectId) {
    const data = { id: projectId };
    console.log("data inside", data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/project/show_all_detailes', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('image').src = response.image;
                    console.log(document.getElementById('image'));
                    document.getElementById('name').textContent = response.name;
                    document.getElementById('department').textContent=response.department_id;
                    document.getElementById('branch').textContent = response.branch.name;
                    document.getElementById('type').textContent=response.project_type_id;
                    document.getElementById('start').textContent = response.start_date;
                    document.getElementById('end').textContent = response.end_date;
                    document.getElementById('desc').textContent = response.description;
                    const employeesClass=document.getElementById('employees');
                    if(response.employees.length !==0){
                       
                        response.employees.forEach(function (employee) {
                    
                            const employtdiv = document.createElement('div');
                            employtdiv.className="card1 col-lg-4";
                             
                            employtdiv.innerHTML = `
                              <div class="image">
                                <img src="${employee.image}">
                            </div>
                            <div class="content">
                                <div class="card-body">
                            <p class="card-title fw-bold ">اسم الموظف</p>
                            <p class="card-text"> ${employee.name}</p>
                            <p class="card-title fw-bold">القسم</p>
                            <p class="card-text">${response.department_id} </p>
                            <p class="card-title fw-bold">الفرع التابع له</p>
                            <p class="card-text"> ${response.branch.name}</p>
                         </div>
                    </div> `;
                            employeesClass.appendChild(employtdiv); });
                    }
                    else{
                        document.getElementById("employeesh").style.display = "block";
                    }
                    // showing volunter of the project
                    const userClass=document.getElementById('users');
                    if(response.user.length !==0){
                      
                        response.user.forEach(function (use) {
                    
                            const usertdiv = document.createElement('div');
                            usertdiv.className="card1 col-lg-4";
                             
                            usertdiv.innerHTML = `
                              <div class="image">
                                <img src="${use.image}">
                            </div>
                            <div class="content">
                                <div class="card-body">
                            <p class="card-title fw-bold ">اسم المتطوع</p>
                            <p class="card-text"> ${use.name}</p>
                            <p class="card-title fw-bold">العنوان</p>
                            <p class="card-text">${use.address} </p>
                            <p class="card-title fw-bold">  الهاتف</p>
                            <p class="card-text"> ${use.phone}</p>
                         </div>
                    </div> `;
                            userClass.appendChild(usertdiv); });
                    }
                    else{
                        document.getElementById("usersh").style.display = "block"
                    }
                    
                      // showing supporter of the project
                      const supportClass=document.getElementById('supporter');
                      if(response.doners.length !==0){
                          response.doners.forEach(function (doner) {
                  
                              const donertdiv = document.createElement('div');
                              donertdiv.className='card2  col-lg-5 mb-5';
                              donertdiv.style="max-width: 540px; margin-left: auto; margin-right: auto;";
                              donertdiv.innerHTML = `
                                  <div class="row g-0">
                                  <div class="col-md-4">
                                      <img src="${doner.image}" class="img-fluid rounded-start" alt="...">
                                  </div>
                                  <div class="col-md-8">
                                  <div class="card-body">
                                  <h5 class="card-title">اسم الجهة الداعمة</h5>
                                  <p>${doner.name}</p>
                                  <h5 class="card-title">  معلومات أخرى</h5>
                                  <p class="card-text">${doner.address}</p>
                                   <p class="card-text">${doner.email}</p>
                                  
                                  </div>
                              </div>
                              </div> `;
                              supportClass.appendChild(donertdiv); });
                             
                      }
                       else{document.getElementById("supporterh").style.display = "block"}
                     
                  
                   
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
function displayProject(projectId) {
    const data = { id: projectId };
    console.log("data inside", data);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/project/show_all_detailes', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    document.getElementById('image').src = response.image;
                    console.log(document.getElementById('image'));
                    document.getElementById('name').textContent = response.name;
                    document.getElementById('department').textContent=response.department_id;
                    document.getElementById('branch').textContent = response.branch.name;
                    document.getElementById('type').textContent=response.project_type_id;
                    document.getElementById('start').textContent = response.start_date;
                    document.getElementById('end').textContent = response.end_date;
                    document.getElementById('desc').textContent = response.description;
                    const employeesClass=document.getElementById('employees');
                    if(response.employees.length !==0){
                       
                        response.employees.forEach(function (employee) {
                    
                            const employtdiv = document.createElement('div');
                            employtdiv.className="card1 col-lg-4";
                             
                            employtdiv.innerHTML = `
                              <div class="image">
                                <img src="${employee.image}">
                            </div>
                            <div class="content">
                                <div class="card-body">
                            <p class="card-title fw-bold ">اسم الموظف</p>
                            <p class="card-text"> ${employee.name}</p>
                            <p class="card-title fw-bold">القسم</p>
                            <p class="card-text">${response.department_id} </p>
                            <p class="card-title fw-bold">الفرع التابع له</p>
                            <p class="card-text"> ${response.branch.name}</p>
                         </div>
                    </div> `;
                            employeesClass.appendChild(employtdiv); });
                    }
                    else{
                        document.getElementById("employeesh").style.display = "block";
                    }
                    // showing volunter of the project
                    const userClass=document.getElementById('users');
                    if(response.user.length !==0){
                      
                        response.user.forEach(function (use) {
                    
                            const usertdiv = document.createElement('div');
                            usertdiv.className="card1 col-lg-4";
                             
                            usertdiv.innerHTML = `
                              <div class="image">
                                <img src="${use.image}">
                            </div>
                            <div class="content">
                                <div class="card-body">
                            <p class="card-title fw-bold ">اسم المتطوع</p>
                            <p class="card-text"> ${use.name}</p>
                            <p class="card-title fw-bold">العنوان</p>
                            <p class="card-text">${use.address} </p>
                            <p class="card-title fw-bold">  الهاتف</p>
                            <p class="card-text"> ${use.phone}</p>
                         </div>
                    </div> `;
                            userClass.appendChild(usertdiv); });
                    }
                    else{
                        document.getElementById("usersh").style.display = "block"
                    }
                    
                      // showing supporter of the project
                      const supportClass=document.getElementById('supporter');
                      if(response.doners.length !==0){
                          response.doners.forEach(function (doner) {
                  
                              const donertdiv = document.createElement('div');
                              donertdiv.className='card2  col-lg-5 mb-5';
                              donertdiv.style="max-width: 540px; margin-left: auto; margin-right: auto;";
                              donertdiv.innerHTML = `
                                  <div class="row g-0">
                                  <div class="col-md-4">
                                      <img src="${doner.image}" class="img-fluid rounded-start" alt="...">
                                  </div>
                                  <div class="col-md-8">
                                  <div class="card-body">
                                  <h5 class="card-title">اسم الجهة الداعمة</h5>
                                  <p>${doner.name}</p>
                                  <h5 class="card-title">  معلومات أخرى</h5>
                                  <p class="card-text">${doner.address}</p>
                                   <p class="card-text">${doner.email}</p>
                                  
                                  </div>
                              </div>
                              </div> `;
                              supportClass.appendChild(donertdiv); });
                             
                      }
                       else{document.getElementById("supporterh").style.display = "block"}
                     
                  
                   
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
  // Call the displayProject function when the page loads
  window.addEventListener('load', () => {
    // Get the project ID from the query parameters (e.g., "?projectId=20")
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
     
    console.log("projectId from URL:", projectId);
  
    // Call the function with the retrieved project ID
    if (projectId) {
        viewProject(projectId);
    } else {
        let project_id=localStorage.getItem('id');
        if(project_id){
            console.log(project_id,'inside if statment');
            displayProject(project_id);
            localStorage.removeItem('id');
        }

        else{console.error("No projectId found in URL parameters.");}
    }
  });