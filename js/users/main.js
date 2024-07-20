function displayProjects() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/project/get/4', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const projects = JSON.parse(xhr.responseText);
                const projectContainer = document.getElementById('projects');
                
                // // Clear existing projects
                 projectContainer.innerHTML = '';
                
                projects.forEach(function(project,index) {
                  
                    const projectdiv = document.createElement('div');
                    projectdiv.className=`col-md-3 wow`;
                    if(index%4==0){
                        projectdiv.className=`col-md-3 wow zoomInDown`; 
                    }
                    if(index%4==1){
                        projectdiv.className=`col-md-3 wow zoomInLeft`; 
                    }
                    if(index%4==2){
                        projectdiv.className=`col-md-3 wow zoomInRight`; 
                    }
                    if(index%4==3){
                        projectdiv.className=`col-md-3 wow zoomInUp`; 
                    }
                //     if(project.prograss>=80)
                //    {
                //     projectdiv.className = 'completed';
                //    }
                //    else{
                //     projectdiv.className = 'not-completed';
                //    }
                 
                    projectdiv.innerHTML = `
                         <div class="card">
                                <img class="card-img-top img-fluid" alt="img1" src="${project.image}">
                                <div class="card-body">
                                    <div class="card-heading">${project.name}</div>
                                    <p class="card-text">${project.description}
                                    </p>
                                    <a class="btn btn-blue  text-light" href="reg.html">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                            fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </a>
                                    <a class="btn btn-blue text-light" href="reg.html"><svg
                                            xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                            fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                            <path
                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        </svg></a>
                                </div>
                            </div>  
                            </div>
                      `;
                 
                    projectContainer.appendChild(projectdiv);
               
             
            
                
          });
            } else {
                console.error('Error fetching projects:', xhr.statusText);
            }
        }
    };
    xhr.send();
}

function displaysliders() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/slider/1', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const sliders = JSON.parse(xhr.responseText);
                const slidersContainer = document.getElementById('sliders');
                
                sliders.forEach(function(slider, index) {
                    const sliderItem = document.createElement('div');
                    sliderItem.classList.add('carousel-item');
                    
                    if (index === 0) { // Make the first item active initially
                        sliderItem.classList.add('active');
                    }
                    value=1000+10000*index;
                    sliderItem.setAttribute('data-bs-interval', value);
                    sliderItem.innerHTML = `
                        <img src="${slider.image}" class="d-block" alt="${slider.title}">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${slider.title}</h5>
                            <p>${slider.description}</p>
                        </div>
                    `;
                    
                    slidersContainer.appendChild(sliderItem);
                });

                // Add event listeners for previous and next buttons
                const prevButton = document.getElementById('prev');
                const nextButton = document.getElementById('next');

                prevButton.addEventListener('click', function() {
                    const currentActive = slidersContainer.querySelector('.carousel-item.active');
                    const prevItem = currentActive.previousElementSibling || slidersContainer.lastElementChild;
                    
                    currentActive.classList.remove('active');
                    prevItem.classList.add('active');
                });

                nextButton.addEventListener('click', function() {
                    const currentActive = slidersContainer.querySelector('.carousel-item.active');
                    const nextItem = currentActive.nextElementSibling || slidersContainer.firstElementChild;
                    
                    currentActive.classList.remove('active');
                    nextItem.classList.add('active');
                });

            } else {
                console.error('Error fetching sliders:', xhr.status);
            }
        }
    };

    xhr.send();
}

function displayDonations() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/project/get_projects_with_fundris', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const projects = JSON.parse(xhr.responseText);
                const projectContainer = document.getElementById('donations');
                
                // // Clear existing projects
                 projectContainer.innerHTML = '';
                
                projects.forEach(function(project) {
                  
                    const projectdiv = document.createElement('div');
                    projectdiv.className=`product-card`;
                    
                 
                    projectdiv.innerHTML = `
                         <div class="product-image">
                            <img src="${project.image}" background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75))
                               , class="product-thumb" alt=""> 
                            <button class="card-btn" id="card-${project.id}">add to wishlist</button>
                        </div>
                        <div class="product-info">
                            <h2 class="product-brand">${project.name}</h2>
                            <p class="product-short-description">${project.description}</p>
                            <span class="price"> $${project.amount}</span><span class="actual-price">$${project.fundrise}</span>
                        </div>
                      
                      `;
                 
                    projectContainer.appendChild(projectdiv);
                    const cartButton = document.getElementById(`card-${project.id}`);
                    cartButton.addEventListener('click', function () {
                      if (window.confirm("هل متأكد من أنك تريد دعم هذا المشروع")) { }
                    });
             
            
                
          });
            } else {
                console.error('Error fetching projects:', xhr.statusText);
            }
        }
    };
    xhr.send();
}

  window.addEventListener('load', () => {

    
    displaysliders();
    
    displayProjects();
    displayDonations();
  
  });
 

  