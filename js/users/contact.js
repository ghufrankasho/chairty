function addcontact(event) {
    event.preventDefault();
    const formData = new FormData();

    const first_nameInput = document.getElementById('first_name').value;
    const last_nameInput = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;
    


 
    if (first_nameInput !== '') formData.append('first_name', first_nameInput);
    if (last_nameInput !== '') formData.append('last_name', last_nameInput);
    if (email !== '') formData.append('email', email);
    if (mobile !== '') formData.append('mobile', mobile);
    if (message !== '') formData.append('message', message);
    // Check if a new image file has been selected

   

   

    console.log(...formData);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/contact/add/', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.message);
                showAlert(null, response.message, response.status);
            } else {
                const response = JSON.parse(xhr.responseText);
                console.log(response.errors, response.message);
                showAlert(response, response, response.status);

            }
        }
    };

    xhr.send(formData);
}
function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('form');
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
        if (status) window.location.href = `/main.html`;
    });
}
document.addEventListener('DOMContentLoaded', () => {

    // const urlParams = new URLSearchParams(window.location.search);
    // const accountId = urlParams.get('accountId');
    // account_id=accountId;
    // console.log("accountId from URL:", accountId);

    //   // Call the function with the retrieved project ID

    //   if (accountId) {
    //       displaycontact();
    //   } else {
    //     // displaycontact();
    //       console.error("No accountId found in URL parameters.");
    //   }
    const firstnameInput = document.getElementById('first_name');
    const lastnameInput = document.getElementById('last_name');
    const message = document.getElementById('message');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');

    firstnameInput.addEventListener('input', validateFirstName);
    lastnameInput.addEventListener('input', validateLastName);
    message.addEventListener('input', validatemessage);
    email.addEventListener('input', validateEmail);
    mobile.addEventListener('input', validatemobile);

});
function validateFirstName() {
    const nameInput = document.getElementById('first_name');
    const nameError = document.getElementById('firstname-length-error');
    const value = nameInput.value.trim();

    if (!value) {
        nameInput.classList.add('error');
        nameError.textContent = 'اسم  مطلوب';
    } else if (value.length > 100) {
        nameInput.classList.add('error');
        nameError.textContent = 'الاسم لا يجب أن يتجاوز 100 حرف';
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
}
function validateLastName() {
    const nameInput = document.getElementById('last_name');
    const nameError = document.getElementById('lastname-length-error');
    const value = nameInput.value.trim();

    if (!value) {
        nameInput.classList.add('error');
        nameError.textContent = 'الكنية  مطلوبة';
    } else if (value.length > 100) {
        nameInput.classList.add('error');
        nameError.textContent = 'الاسم  لا يجب أن يتجاوز 100 حرف';
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
}
function validatemessage() {
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('message-length-error');
    const value = messageInput.value.trim();

    if (!value) {
        messageInput.classList.add('error');
        messageError.textContent = 'الكنية  مطلوبة';
    } else if (value.length > 200) {
        messageInput.classList.add('error');
        messageError.textContent = 'الرسالة  لا يجب أن يتجاوز 200 حرف';
    } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
    }
}
function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        email.classList.add('error');
        emailError.textContent = 'الايميل  مطلوب';
    } else {
        const isValid = pattern.test(value);
        if (!isValid) {
            email.classList.add('error');
            emailError.textContent = 'هذا الحقل يجب أن يكون ايميل';
        } else {
            email.classList.remove('error');
            emailError.textContent = '';
        }
    }
}
function validatemobile() {
    const mobile = document.getElementById('mobile');
    const mobileError = document.getElementById('mobile-length-error');
    const value = mobile.value.trim();
    // const pattern1 =/^\0963\d{3}\d{3}\d{3}$/;
    const pattern = /^09\d{2}\d{3}\d{3}$/;
    // Validate mobile number and update message

    if (!value) {
        mobile.classList.add('error');
        mobileError.textContent = 'رقم الهاتف  الخاص بالمستخدم مطلوب';
    } else {
        const isValid = pattern.test(value);
        if (!isValid) {
            mobile.classList.add('error');
            mobileError.textContent = ' رقم المستخدم يجب أن يبدأ ب 09 ويكون 10 خانات   ';
        } else {
            mobile.classList.remove('error');
            mobileError.textContent = '';
        }
    }
}