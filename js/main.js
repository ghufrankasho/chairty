 
 

 
// document.addEventListener('DOMContentLoaded', function () {
 
  
//     let type=localStorage.getItem('type');
//     console.log(type);
//     if(type==0)
//    {
//      let user =  localStorage.getItem('user'); // Parse the stringified JSON
//     if (user  ) {
//        let  t=JSON.parse(localStorage.getItem('user'));
        
//         let img = document.getElementById('pro-image');
//         let profile = document.getElementById('href');
//         profile.href='/users/userHome.html';
//         img.src = t.image;
//     } else {
//         console.log("User not found or image is missing");
//     }
//     console.log(user);}
//     if(type==2)
//     { 
    
//         let employee = JSON.parse(localStorage.getItem('employee')); // Parse the stringified JSON
//         if (employee) {
//             let profile = document.getElementById('href');
//             profile.href='/employee/employeeHome.html';
//             let img = document.getElementById('pro-image');
//             img.src = employee.image;
//         } else {
//             console.log("employee not found or image is missing");
//         }
//         console.log(employee);}
    
// });







  

var carouselItems = document.querySelectorAll('.landing-carousel-item');
var carouselDots = document.querySelectorAll('.landing-carousel-dots>.dot');
var currentItem = 0;

function scrollToCarouselItem(i) {
    carouselDots[currentItem].classList.remove('active');
    carouselDots[i].classList.add('active');

    document.getElementById('carousel-scroll-container').scrollTo({
        left: window.innerWidth * i,
        behavior: 'smooth'
    })
    currentItem = i;
}

carouselDots.forEach((dot, i) => {
    dot.addEventListener('click', ev => {
        ev.preventDefault();
        scrollToCarouselItem(i);
    })
})

setInterval(() => {
    scrollToCarouselItem((currentItem + 1) % carouselItems.length)
}, 5000);


const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})



const fab = document.getElementById("fab");
const fabBtns = document.querySelector(".fab-btns");

fab.addEventListener("click", () => {
  fabBtns.classList.toggle("show");
});












fetch("https://api.currencyfreaks.com/latest?apikey=631d974204e04c35afe1d8403bd920a1")
  .then((result) => {
    // console.log(result);
    let myData = result.json();
   //  console.log(myData);
    return myData;
  })
  .then((currency) => {
    let amount = document.querySelector(".amount");
    let egpPrice = document.querySelector(".egp span");
    let sarPrice = document.querySelector(".sar span");
    let sypPrice = document.querySelector(".syp span");

    egpPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["EGP"]);
    sarPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["SAR"]);
    sypPrice.innerHTML = Math.round(amount.innerHTML * currency.rates["SYP"]);

    // console.log(currency.rates);
    console.log(currency.rates["EGP"]);
    console.log(currency.rates["SAR"]);
    console.log(currency.rates["SYP"]);
  });














