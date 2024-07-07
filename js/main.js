document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.dropdown-menu').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    })

    if (window.innerWidth < 992) {

        document.querySelectorAll('.dropdown-menu a').forEach(function(element) {
            element.addEventListener('click', function(e) {

                let nextEl = this.nextElementSibling;
                if (nextEl && nextEl.classList.contains('submenu')) {
                    e.preventDefault();
                    if (nextEl.style.display == 'block') {
                        nextEl.style.display = 'none';
                    } else {
                        nextEl.style.display = 'block';
                    }

                }
            });
        })
    }

});






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