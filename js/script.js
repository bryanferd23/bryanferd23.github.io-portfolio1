const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Certification modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const certificationCards = document.querySelectorAll('.certification-card');
  const body = document.body;

  certificationCards.forEach(card => {
    const img = card.querySelector('.cert-image');
    
    img.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the card click event from firing
      openImageModal(img.src, img.alt);
    });

    // Remove the card click event listener
    // card.addEventListener('click', () => {
    //   openCardModal(card);
    // });
  });

  function openImageModal(src, alt) {
    const modal = createModal();
    const modalImg = document.createElement('img');
    modalImg.src = src;
    modalImg.alt = alt;
    modalImg.classList.add('modal-image');
    modal.appendChild(modalImg);
    showModal(modal);
  }

  function openCardModal(card) {
    const modal = createModal();
    const modalContent = card.cloneNode(true);
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);
    showModal(modal);
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('modal-close');
    modal.appendChild(closeButton);

    closeButton.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });

    return modal;
  }

  function showModal(modal) {
    body.appendChild(modal);
    body.style.overflow = 'hidden';
    // Force reflow to ensure transition works
    modal.offsetHeight;
    modal.style.opacity = '1';
  }

  function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      body.removeChild(modal);
      body.style.overflow = 'auto';
    }, 300); // Match this with your CSS transition time
  }
});
