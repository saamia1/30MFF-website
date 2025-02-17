document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#navbar a");

    // Click event for smooth scrolling & active class toggle
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default jump
            const section = document.querySelector(this.getAttribute("href"));

            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 60, // Adjust offset for better alignment
                    behavior: "smooth" //smooth scrolling effect
                });
            }
            
            // Remove 'active' class from all links and add to the clicked one
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Scroll event for updating active class based on viewport position
    window.addEventListener("scroll", function () {
        let fromTop = window.scrollY + 400; // Adjusted value for earlier activation

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));

            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                // Check if the current section is in the viewport
                if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                    // Remove 'active' from all links first
                    navLinks.forEach(link => link.classList.remove("active"));
                    // Add 'active' to the correct section link
                    link.classList.add("active");
                }
            }
        });
    });
});
// Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);
    
// Function to navigate between slides
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
// Function to set a specific slide
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
// Function to display the correct slide
    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      // Loop back to first slide if beyond last, and vice versa
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
    
      // Hide all slides
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }
    // Function to shrink navbar on scroll
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "30px 10px";
        document.getElementById("logo").style.fontSize = "25px";
    } else {
        document.getElementById("navbar").style.padding = "80px 10px";
        document.getElementById("logo").style.fontSize = "35px";
    }
    }
    // Prevents navigation history from adding new entries on refresh
    window.history.replaceState({}, document.title, window.location.pathname);

    // Drag-and-drop functionality for trash sorting game
    const trashItems = document.querySelectorAll('.trash');
    const bins = document.querySelectorAll('.bin');

    // Enable dragging for trash items
    trashItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });
    });

    // Allow dropping trash into bins
    bins.forEach(bin => {
        bin.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        bin.addEventListener('drop', (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text');
            // Check if the item is dropped in the correct bin
            if (bin.id === itemId || (bin.id === 'general' && itemId !== 'organic' && itemId !== 'plastic' && itemId !== 'can')) {
                bin.appendChild(document.getElementById(itemId));
            } else {
                alert('Wrong bin! Try again.');
            }
        });
    });