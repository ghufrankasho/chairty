
// Function to handle form submission and AJAX request
function submitSignUpForm(event) {
     event.preventDefault(); // Prevent default form submission

    // Get form data
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password_confirmation = document.getElementById('password_confirmation').value;
    var type=localStorage.getItem('type');
    console.log(type);
    // Now you have the data from the signup form, you can use it as needed

 
    var formData = {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        type:type

      };
    // Add your AJAX request here

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/auth/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            // Handle successful response
            var response = JSON.parse(xhr.responseText);
             
           
            
           if(localStorage.hasOwnProperty('user'))localStorage.removeItem('user');
           if(localStorage.hasOwnProperty('employee'))localStorage.removeItem('employee');
           if(localStorage.hasOwnProperty('support'))localStorage.removeItem('support');
            localStorage.setItem('type',response.account.type);
            localStorage.setItem('account_id',response.account.id);
            console.log(response);
            if (type=="0"){
             
          
             window.location.href =`/main.html`;
            }
            if (type=="2"){
            
            window.location.href =`/employee/addemployee.html?accountId=${response.account.id}`;
            }
            if (type=="3"){
             
              window.location.href =`/support/addSupport.html?accountId=${response.account.id}`;
              }
              
        } 
        else {
          
          if((xhr.readyState === 4 && xhr.status === 400) )
                  {var response = JSON.parse(xhr.responseText);
  
                  // Handle errors or other states
                  d=JSON.stringify(response.errors);
                  
                  showSuccessAlert(response.errors, '',false,`signUpForm`);
              }
          else{ 
            showSuccessAlert('Error occurred during login .',response,null);
          }
        }
    };
    xhr.send(JSON.stringify(formData)); // Send the form data as JSON

}
function submitSignInForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var email = document.getElementById('singinemail').value;
    var password = document.getElementById('singinpassword').value;
    
   

    var formData = {
        email: email,
        password: password,
       
       
      };
    // Add your AJAX request here

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/auth/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle successful response
            var response = JSON.parse(xhr.responseText);
            // showSuccessAlert(null,response.message,true,`signInForm`);
            localStorage.setItem('token',response.access_token);
            localStorage.setItem('type',response.account.type);
            localStorage.setItem('account_id',response.account.id);
            console.log(response,response.account.id);
            if (response.account.type=="0"){
              // user
              //localStorage.setItem('account_id',response.account.id);
              if(response.user!==null)localStorage.setItem('user',JSON.stringify(response.user));
              
              window.location.href =`/main.html`;
              
            }
            if (response.account.type=="2"){
              //employee
              // localStorage.setItem('account_id',response.account.id);
              if(response.user!==null) localStorage.setItem('employee',JSON.stringify(response.user));
               
               
               
              window.location.href =`/main.html`;
            }
            if(response.account.type=="1"){
              
              //admin
              if(response.user!==null) localStorage.setItem('Admin',JSON.stringify(response.user));
               
               console.log(response);
              window.location.href =`/index.html`;
              }
            if (response.account.type=="3"){
             //support
             if(response.user!==null) localStorage.setItem('support',JSON.stringify(response.user));
                window.location.href =`/main.html`;
                }
              // window.location.href =`/main.html`;
            
        
        }
         else {
            if((xhr.readyState === 4 && xhr.status === 400) )
                {
                  var response = JSON.parse(xhr.responseText);

                
                showSuccessAlert(response.errors,'',response.status,`signInForm`);
             
} 
        }
    };
    xhr.send(JSON.stringify(formData)); // Send the form data as JSON
}
function resetPassword(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  var new_password = document.getElementById('new_password').value;
  var old_password = document.getElementById('old_password').value;
  var password_confirmation = document.getElementById('confirmed_password').value;
  let token=localStorage.getItem('token');
  

  var formData = {
    old_password: old_password,
      new_password: new_password,
      new_password_confirmation:password_confirmation
     
     
    };
    
  // Add your AJAX request here

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/auth/reset_password', true);
  xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Handle successful response
          var response = JSON.parse(xhr.responseText);
          // showSuccessAlert(null,response.message,true);
          
          showSuccessAlert(null,response.message,true,'reset-password');
         console.log(response.account.type,response);
          if (response.account.type=="0"){
            console.log(response.message)
            if(window.confirm(response.message))
              {             window.location.href =`/index.html`;}
            // window.location.href =`/messages/userindex.html`;

           }
          if (response.account.type=="2"){
            
            // window.location.href =`/employee/employeeindex.html`;
            window.location.href =`/employee/employees.html`;
           }
          // else{window.location.href =`/index.html`;}
          
          // Handle response as needed
      } else {
          if((xhr.readyState === 4 && xhr.status === 400) )
              {var response = JSON.parse(xhr.responseText);

              // Handle errors or other states
              showSuccessAlert(response.errors,'',false,`reset-password`);
           
}
          else{
                  console.log("something went wrong",response.errors);
                  showSuccessAlert('Error occurred during login .',response.errors,null,`signInForm`);
              }
      }
  };
  xhr.setRequestHeader( "Authorization", "Bearer " + token );
  xhr.send(JSON.stringify(formData)); // Send the form data as JSON
}
function showSuccessAlert(data, message, status,form) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById(form);
 
    const div = document.createElement('div');
   
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
      if(data=="user type  is not correct chose the right  type for this account"){
        window.location.href =`tochoose.html`;
      }
  
      // Remove the message container from the DOM
      div.remove();
    });
}
function displayMessages() {
   
  
  const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/contact/', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const messages = JSON.parse(xhr.responseText);
                
                const messagesContainer = document.getElementById('messages');
                
                 
               
                     
                // Clear existing user
                messagesContainer.innerHTML =``;
               
                messages.forEach(function(message) {
                   
                  const messagetr = document.createElement('form-group');
                    
                   
                  messagetr.innerHTML = ` 
                   <div class="card-body pb-2" id="messages">
                                   
                                    <div class="form-group">
                                        <div class="para  text-right" dir="rtl">

                                            <label class="form-label  text-right" dir="rtl"> <i
                                                    class='bx bx-message-alt-x' id="delete-${message.id}"></i>
                                            </label>
                      
                                            <div class="homepageemp text-right " dir="rtl">

                                                <table class="content-table  text-right" style="margin-right: 30px;"
                                                    dir="rtl">
                                                    <thead>

                                                        <tr class="text-right">

                                                            <th> الاسم </th>
                                                            <th>الايميل </th>
                                                            <th>الموبايل</th>
                                                            <th>الرسالة</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>

                                                            <td>
                                                                <p>${message.first_name} ${message.last_name}</p>
                                                            </td>
                                                            <td>
                                                            ${message.email}
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p> ${message.mobile}</p>
                                                            </td>
                                                            <td>
                                                                <p> ${message.message}</p>
                                                            </td>

                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>


                                        </div>
                                    </div>
                                  
                                </div>`;

                    
                
                 
                 messagesContainer.appendChild(messagetr);
                 
                 const deleteButton = document.getElementById(`delete-${message.id}`);
                    
                deleteButton.addEventListener('click',  () => {
                   
                  if (window.confirm("هل متأكد من أنك تريد حذف هذه الرسالة؟")) { 
                    deleteMessage(message.id);
                  }
                   
                 }); 
                 });
                }
               
               
              
            } 
            else {
                console.error('Error fetching user:', xhr.statusText);
            }
        }
        xhr.send();
}   
function deleteMessage(id) {
    
    
    
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://127.0.0.1:8000/api/contact/delete?id=${id}`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
     
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              
              const response = JSON.parse(xhr.responseText);
              
              // showAlert(null,response.message,response.status);
              displayMessages();
             
          } else {
              const response = JSON.parse(xhr.responseText);
              showAlert(response.errors ,response.message,response.status);
              console.error('Delete error:', response.errors || response.message);
          }
      }
  };
  xhr.send();
  
}
function showAlert(data, message, status) {
  // Show the success message in the "success-message" div
  const Message = document.getElementById('messages');
   
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
    displayusers();
  });
}
 
