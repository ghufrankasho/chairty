function addDoner() {

    const formData = new FormData();  

    const nameInput = document.getElementById('nameInput').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    if(nameInput !=='')formData.append('name', nameInput);
    if(address !=='')formData.append('address', address);
    if(phone !=='')formData.append('phone', phone);
    if(email !=='')formData.append('email', email);
    // Check if a new image file has been selected
    const imageInput = document.getElementById('input-file');
    if ( imageInput !=null && imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }
  
  console.log(...formData);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/api/doner/add/', true);
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                 
                showAlert(null, response.message, response.status,'form');
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors, response.message, response.status,'form');
               
            }
        }
    };
  
    xhr.send(formData);
}
function showAlert(data, message, status,form) {
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
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
  
    nameInput.addEventListener('input', validateName);
    address.addEventListener('input', validateAddress);
    phone.addEventListener('input', validatePhone);
    email.addEventListener('input', validateEmail);
  });
function validateName() {
    const nameInput = document.getElementById('nameInput');
    const nameError = document.getElementById('nameError');
    const value = nameInput.value.trim();
  
    if (!value) {
        nameInput.classList.add('error');
        nameError.textContent = 'اسم الجهة الداعمة مطلوب';
    } else if (value.length > 100) {
        nameInput.classList.add('error');
        nameError.textContent = 'اسم المشروع لا يجب أن يتجاوز 100 أحرف';
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
  }
  
function validateAddress() {
  const address = document.getElementById('address');
    const addressError = document.getElementById('addressError');
    const value = address.value.trim();
  
    if (!value) {
      address.classList.add('error');
      addressError.textContent = 'عنوان الجهة الداعمة مطلوب';
    } else if (value.length > 200) {
      address.classList.add('error');
      addressError.textContent = 'اسم المشروع لا يجب أن يتجاوز 200 أحرف';
    } else {
      address.classList.remove('error');
        addressError.textContent = '';
    }
}
function validatePhone() {
  const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const value = phone.value.trim();
    const pattern =/^\+963\d{3}\d{3}\d{3}$/;

    // Validate phone number and update message
   
    if (!value) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم الهاتف  الخاص بالجهة الداعمة مطلوب';
    } else 
   { const isValid = pattern.test(value);
     if (!isValid) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم المشروع يجب أن يبدأ ب 963+ وأن يكون 9 خانات    ';
    } else {
      phone.classList.remove('error');
      phoneError.textContent = '';
    }}
}
  
function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const value = email.value.trim();
    const pattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      email.classList.add('error');
      emailError.textContent = 'الايميل  مطلوب';
    } else 
    {
      const isValid = pattern.test(value);
      if (!isValid) {
        email.classList.add('error');
        emailError.textContent = 'هذا الحقل يجب أن يكون ايميل';
    } else {
      email.classList.remove('error');
      emailError.textContent = '';
    }}
  }