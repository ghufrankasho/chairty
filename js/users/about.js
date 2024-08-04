(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Causes carousel
    $(".causes-carousel").owlCarousel({
        autoplay: true,
        animateIn: 'slideInDown',
        animateOut: 'slideOutDown',
        items: 1,
        smartSpeed: 450,
        dots: false,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
   


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

function displayMessages() {
   
  
    const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:8000/api/contact/views', true);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  const messages = JSON.parse(xhr.responseText);
                  
                  const messagesContainer = document.getElementById('messages');
                  
                   
                 
                       
                  // Clear existing user
                  messagesContainer.innerHTML =``;
                 
                  messages.forEach(function(message) {
                     
                    const messagetr = document.createElement('owl-stage-outer');
                      
                     
                    messagetr.innerHTML = ` 

                       <div class="owl-item cloned" style="width: 351px;"><div class="testimonial-item">
                        <div class="testimonial-profile">
                            <img src="img/about/testimonial-3 .jpg" alt="Image">
                            <div class="testimonial-name">
                            <h3>Person Name</h3>

                            </div>
                        </div>
                        <div class="testimonial-text">
                            <p>
                            Lorem ipsum dolor sit amet elit. Phasel preti mi facilis ornare velit non vulputa. Aliqu metus tortor,
                            auctor id gravid vivera quis
                            </p>
                        </div>
                        </div></div></div>
                               `;
  
                      
                  
                   
                   messagesContainer.appendChild(messagetr);
                  
                   });
                  }
                 
                 
                
              } 
              else {
                  console.error('Error fetching user:', xhr.statusText);
              }
          }
          xhr.send();
  }  
