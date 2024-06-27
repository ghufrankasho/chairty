var account_id=0;
 
function displayuser() {
    
   
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/api/work', true);
    
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
               
                  try {
                       
                    const response = JSON.parse(xhr.responseText);
                    
                    const select1 = document.getElementById('work_types');
                    var c1 = document.createElement("option");
                    c1.text = "select work";
                    c1.id =0;
                    select1.options.add(c1);
                      response.forEach(function(work) {
                      
                          var c1 = document.createElement("option");
                          c1.text = work.name;
                          c1.id = work.id;
                          select1.options.add(c1, work.name);
                      });
                     
                     
                    
                  } 
                  catch (e) {
                      console.error("Failed to parse response JSON:", e);
                  }
              } 
              else {
                  console.error("Error with request, status code:", xhr.status);
              }
          }
      } 
      xhr.send();
    
     
}
function adduser(event) {
  event.preventDefault();
  const formData = new FormData();  

  const first_nameInput = document.getElementById('first_name').value;
  const last_nameInput = document.getElementById('last_name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const typeElement = document.querySelector('#work_types');
  const type = typeElement.options[typeElement.selectedIndex].id;


  if(type !=='')formData.append('work_id', type);
  if(first_nameInput !=='')formData.append('first_name', first_nameInput);
  if(last_nameInput !=='')formData.append('last_name', last_nameInput);
  if(address !=='')formData.append('address', address);
  if(phone !=='')formData.append('mobile', phone);
  formData.append('account_id', account_id);
  // Check if a new image file has been selected
 
  const imageInput = document.getElementById('userImageInput');
  if ( imageInput !=null && imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
  }
   
  const cvInput = document.getElementById('cvInput');
  if ( cvInput !=null && cvInput.files.length > 0) {
      formData.append('cv', cvInput.files[0]);
  }

console.log(...formData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/user/add/', true);

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 201) {
              const response = JSON.parse(xhr.responseText);
               console.log(response.message);
              showAlert(null, response.message, response.status);
          } else {
              const response = JSON.parse(xhr.responseText);
              console.log(response.errors,response.message);
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
    if(status)window.location.href =`/users/Users.html`;
  });
}
document.addEventListener('DOMContentLoaded', () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const accountId = urlParams.get('accountId');
  account_id=accountId;
  console.log("accountId from URL:", accountId);
   
    // Call the function with the retrieved project ID
    
    if (accountId) {
        displayuser();
    } else {
      // displayuser();
        console.error("No accountId found in URL parameters.");
    }
  const firstnameInput = document.getElementById('first_name');
  const lastnameInput = document.getElementById('last_name');
 
  const address = document.getElementById('address');
  const phone = document.getElementById('phone');

  firstnameInput.addEventListener('input', validateFirstName);
  lastnameInput.addEventListener('input', validateLastName);
  address.addEventListener('input', validateAddress);
  phone.addEventListener('input', validatePhone);
 
});
function validateFirstName() {
  const nameInput =document.getElementById('first_name');
  const nameError = document.getElementById('firstname-length-error');
  const value = nameInput.value.trim();

  if (!value) {
        nameInput.classList.add('error');
        nameError.textContent = 'اسم  مطلوب';
    } else if (value.length > 100) {
        nameInput.classList.add('error');
        nameError.textContent = 'اسم المشروع لا يجب أن يتجاوز 100 أحرف';
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
}
function validateLastName() {
  const nameInput =document.getElementById('last_name');
  const nameError = document.getElementById('lastname-length-error');
  const value = nameInput.value.trim();

  if (!value) {
      nameInput.classList.add('error');
      nameError.textContent = 'الكنية  مطلوبة';
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
    const addressError = document.getElementById('address-length-error');
    const value = address.value.trim();
  
    if (!value) {
      address.classList.add('error');
      addressError.textContent = 'عنوان المستخدم مطلوب';
    } else if (value.length > 200) {
      address.classList.add('error');
      addressError.textContent = 'عنوان المستخدم لا يجب أن يتجاوز 200 أحرف';
    } else {
      address.classList.remove('error');
        addressError.textContent = '';
    }
}
function validatePhone() {
  const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-length-error');
    const value = phone.value.trim();
    // const pattern1 =/^\0963\d{3}\d{3}\d{3}$/;
    const pattern =/^09\d{2}\d{3}\d{3}$/;
    // Validate phone number and update message
   
    if (!value) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم الهاتف  الخاص بالمستخدم مطلوب';
    } else 
   { const isValid = pattern.test(value);
     if (!isValid) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم المستخدم يجب أن يبدأ ب 09    ';
    } else {
      phone.classList.remove('error');
      phoneError.textContent = '';
    }}
}
function displaycv(){
  const typeElement = document.querySelector('#work_types');
  const type = typeElement.options[typeElement.selectedIndex].text;
 console.log(type);
 if(type=='متطوع'){
  document.getElementById("cv").style.display = "block";
 }

}