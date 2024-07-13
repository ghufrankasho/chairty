  function displaysliders() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/slider/', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              
                const sliders = JSON.parse(xhr.responseText);
                const sliderContainer = document.getElementById('sliders');
                
                // Clear existing sliders
                sliderContainer.innerHTML = '';
                
                sliders.forEach(function(slider) {
                    const sliderDiv = document.createElement('div');
                    sliderDiv.className = 'box';
                    sliderDiv.innerHTML = `
                        <img src="${slider.image}" alt="">
                        <div class="content-message">
                            <h3>${slider.title}</h3>
                           
                            <p>${slider.description}</p>
                            
                            <div class="info">
                             
                            <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" id="update-${slider.id}" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                           </a>
                           
                          <a href="#" class="delete">
                          <svg xmlns="http://www.w3.org/2000/svg" id="delete-${slider.id}" width="16" height="16" fill="currentColor" class=" bi bi-x-square" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg> </a>
                       </div >
                       </div >
                        </div>`;
                    
                    sliderContainer.appendChild(sliderDiv);
                    
                    const deleteButton = document.getElementById(`delete-${slider.id}`);
                    deleteButton.addEventListener('click', function() {
                        
                        if(window.confirm("هل متأكد من أنك تريد حذف هذا السلايدر"))
                          {deleteslider(slider.id);}
                    });
                    // Create a update button and add an event listener
                    const updateButton = document.getElementById(`update-${slider.id}`);
                    
  
                    updateButton.addEventListener('click',  () => {
                      localStorage.setItem('title',slider.title);
                      localStorage.setItem('description',slider.description);
                      localStorage.setItem('image',slider.image);
                      localStorage.setItem('id',slider.id);
                      const sliderId = slider.id;
                       
                      // console.log(sliderId)
                      window.location.href =`addnews.html?sliderId=${sliderId}`;
                      
                    });
              
                 
          
           
                });
            } else {
                console.error('Error fetching sliders:', xhr.statusText);
            }
        }
    };
    xhr.send();
  }
  
  function deleteslider(id) {
    const data = JSON.stringify({ "id": id });  // Ensure id is an integer
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://127.0.0.1:8000/api/slider/?id=${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Delete success:', response.message);
                // showAlert(null,response,response.status);
                // Optionally, refresh the sliders list or remove the deleted slider from the DOM
                displaysliders();
            } else {
                const response = JSON.parse(xhr.responseText);
                showAlert(response.errors ,response.message,response.status);
                
            }
        }
    };
    xhr.send();
  }
 
  function showAlert(data, message, status) {
    // Show the success message in the "success-message" div
    const Message = document.getElementById('slider');
    const div = document.createElement('div');
   
    if (status) {
      div.className = "success alert d-none mt-3 mx-auto"
      div.innerHTML = ` 
    <div class="content-message" id ="AlertMessage">
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
    
    <div class="content-message" id ="AlertMessage">
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
    
    <div class="content-message" id ="AlertMessage">
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
      if(status){
        console.log('inside if statment  add page' );
        window.location.href =`/news/news.html`};
    });
  }
  window.addEventListener('load', displaysliders);
  