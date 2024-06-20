function displayuser() {
    
   
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/api/work', true);
    
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
               
                  try {
                       
                      const response = JSON.parse(xhr.responseText);
                    
                      const select1 = document.getElementById('work_types');
                     
                      response.forEach(function(work) {
                        console.log(work);
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

function adduser() {

  const formData = new FormData();  

  const first_nameInput = document.getElementById('first_name').value;
  const last_nameInput = document.getElementById('last_name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  if(first_nameInput !=='')formData.append('first_name', nameInput);
  if(last_nameInput !=='')formData.append('last_name', nameInput);
  if(address !=='')formData.append('address', address);
  if(phone !=='')formData.append('phone', phone);
 
  // Check if a new image file has been selected
  const imageInput = document.getElementById('userImageInput');
  if ( imageInput !=null && imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
  }

console.log(...formData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/user/add/', true);

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

document.addEventListener('DOMContentLoaded', () => {
  displayuser();
 

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
    const pattern =/^\+963\d{3}\d{3}\d{3}$/;

    // Validate phone number and update message
   
    if (!value) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم الهاتف  الخاص بالمستخدم مطلوب';
    } else 
   { const isValid = pattern.test(value);
     if (!isValid) {
      phone.classList.add('error');
      phoneError.textContent = 'رقم المستخدم يجب أن يبدأ ب 963+ وأن يكون 9 خانات    ';
    } else {
      phone.classList.remove('error');
      phoneError.textContent = '';
    }}
}
