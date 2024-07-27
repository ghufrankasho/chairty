var project_id=0;
 
function adddonation(event) {
  event.preventDefault();
  const formData = new FormData();  

  const cardNumberInput = document.getElementById('card_number').value;
  const expMonthInput = document.getElementById('exp_month').value;
  const expYearInput = document.getElementById('exp_year').value;
  const amountInput = document.getElementById('amount').value;


  formData.append('detailes', cardNumberInput+"  "+expMonthInput+"  "+expYearInput);
  if(amountInput !=='')formData.append('amount', amountInput);
 
  if(project_id!==0) formData.append('id', project_id);
  // Check if a new image file has been selected
 
  

console.log(...formData);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/api/project/donat/', true);

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
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
  const Message = document.getElementById('paymentForm');
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
    if(status)window.location.href =`/main.html`;
  });
}
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    if(projectId)project_id=projectId;
    console.log("projectId from URL:", projectId);
   
    const cardNumberInput = document.getElementById('card_number');
    const expMonthInput = document.getElementById('exp_month');
    const expYearInput = document.getElementById('exp_year');
    const amountInput = document.getElementById('amount');

    const cardNumberError = document.getElementById('card_number_error');
    const expMonthError = document.getElementById('exp_month_error');
    const expYearError = document.getElementById('exp_year_error');
    const amountError = document.getElementById('amount_error');

    function validateAmount() {
        const amount = amountInput.value;
        const amountPattern = /^(?!0\d)(\d+(\.\d{1,2})?)$/; // Positive number with up to 2 decimal places

        if (!amountPattern.test(amount)) {
            amountError.textContent = 'Amount must be a positive number with up to two decimal places.';
        } else {
            amountError.textContent = '';
        }
    }
    // function validateCardNumber() {
    //     const cardNumber = cardNumberInput.value;
    //     const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    //     if (!cardNumberPattern.test(cardNumber)) {
    //         cardNumberError.textContent = 'Card number must be in the format 1111-2222-3333-4444.';
    //     } else {
    //         cardNumberError.textContent = '';
    //     }
    // }

    function validateExpMonth() {
        const expMonth = expMonthInput.value;
        const expMonthPattern = /^(0[1-9]|1[0-2])$/; // MM format
        if (!expMonthPattern.test(expMonth)) {
            expMonthError.textContent = 'Expiration month must be between 01 and 12.';
        } else {
            expMonthError.textContent = '';
        }
    }

    function validateExpYear() {
        const expYear = expYearInput.value;
        const expYearPattern = /^\d{4}$/;
        const currentYear = new Date().getFullYear();
        const minYear = currentYear; // Set minimum year as current year
        const maxYear = currentYear + 10; // Optional: Set a maximum year limit, e.g., 10 years ahead

        if (!expYearPattern.test(expYear)) {
            expYearError.textContent = 'Expiration year must be a four-digit number.';
        } else if (parseInt(expYear) < minYear || parseInt(expYear) > maxYear) {
            expYearError.textContent = `Expiration year must be between ${minYear} and ${maxYear}.`;
        } else {
            expYearError.textContent = '';
        }
    }
    // cardNumberInput.addEventListener('input', validateCardNumber);
    expMonthInput.addEventListener('input', validateExpMonth);
    expYearInput.addEventListener('input', validateExpYear);
    amountInput.addEventListener('input', validateAmount);
});

