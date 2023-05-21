// Setup Parallax Effect
function setupParallax() {
  const parallaxElements = document.querySelectorAll(".parallax");
  const onScroll = () => {
    if (window.innerWidth > 768) {
      console.log(window.innerWidth);
      const scrollPosition = window.scrollY;
      parallaxElements.forEach((element) => {
        const speed = element.dataset.parallaxSpeed;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    }
  };
  window.addEventListener("scroll", onScroll);
}

// Change Background Color
function changeBackgroundColor() {
  const pages = document.querySelectorAll(".page");
  const bg = document.querySelector(".full-page-background");
  const onScroll = () => {
    const scrollPosition = window.scrollY;
    pages.forEach((page) => {
      const bgcol = page.dataset.bgcol;
      if (Math.abs(scrollPosition - page.offsetTop) < 100) {
        console.log("scrolled");
        bg.style.backgroundColor = bgcol;
      }
    });
  };
  window.addEventListener("scroll", onScroll);
}

// Update Background Text and Logo Blur
function updateBackgroundTextAndLogoBlur() {
  const backgroundText = document.querySelector(".background-text");
  const page = document.querySelector(".page");
  const logo = document.querySelector(".logo-container");
  const onScroll = () => {
    const scrollPosition = window.scrollY;
    const blurFactor = Math.max(0, 14 - scrollPosition / 10);
    backgroundText.style.transform = `translateY(calc(${
      scrollPosition * 0.4
    }px - 50%))`;
    backgroundText.style.filter = `blur(${blurFactor}px)`;
    logo.style.filter = `blur(${14 - blurFactor}px)`;
  };
  window.addEventListener("scroll", onScroll);
}

// Hide Navigation
function hideNavigation() {
  const bottomNav = document.querySelector(".bottom-nav");
  const topNav = document.querySelector(".top-nav");
  const onScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      bottomNav.classList.add("hidden");
    } else {
      bottomNav.classList.remove("hidden");
    }
    if (scrollPosition > 400) {
      topNav.classList.add("slide-in");
    } else {
      topNav.classList.remove("slide-in");
    }
  };
  window.addEventListener("scroll", onScroll);
}

// Setup XY Position
function setupXYPosition() {
  const elements = document.querySelectorAll("[data-xy]");
  elements.forEach((element) => {
    const [x, y] = element.dataset.xy.split(",");
    element.style.top = y;
    element.style.left = x;
  });
}

// Animate Blob on Mouse Move
function animateBlob() {
  const blob = document.querySelector(".blob");
  const onMouseMove = (event) => {
    const { clientX, clientY } = event;
    blob.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      {
        duration: 30000,
        fill: "forwards",
      }
    );
  };
  document.body.addEventListener("mousemove", onMouseMove);
}

function handleContactButton() {
  const contactButtons = document.getElementsByClassName("contact-button");
  const contactContainer = document.getElementById("contact-container");
  const closeButton = document.getElementById("close-button");

  for (const contactButton of contactButtons) {
    contactButton.addEventListener("click", () => {
      contactContainer.classList.add("show");
    });
  }
  closeButton.addEventListener("click", () => {
    contactContainer.classList.remove("show");
  });
}

function handleProfileImagePerpective() {
  const el = document.querySelector("#profile-perspective");

  document.addEventListener("mousemove", (e) => {
    const maxAngle = 15;
    const x = e.clientX;
    const y = e.clientY;
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;
    const offsetX = ((x - middleX) / middleX) * maxAngle;
    const offsetY = ((y - middleY) / middleY) * maxAngle;

    el.style.setProperty("--rotateX", -1 * offsetY + "deg");
    el.style.setProperty("--rotateY", offsetX + "deg");
  });
}

function submitForm(email, subject, message) {
  var emailField = document.getElementById("email");
  var subjectField = document.getElementById("subject");
  var messageField = document.getElementById("message");
  var correctness = 0;
  // Validate email field
  if (!email) {
    emailField.style.outline = "2px solid red";
    emailField.previousSibling.previousSibling.lastChild.textContent =
      "E-mail is required";
  } else if (!validateEmail(email)) {
    emailField.style.outline = "2px solid red";
    emailField.previousSibling.previousSibling.lastChild.textContent =
      "Not a valid e-mail adress";
  } else correctness++;

  // Validate subject field
  if (!subject) {
    subjectField.style.outline = "2px solid red";
    subjectField.previousSibling.previousSibling.lastChild.textContent =
      "Subject is required";
  } else {
    correctness++;
  }

  // Validate message field
  if (!message) {
    messageField.style.outline = "2px solid red";
    messageField.previousSibling.previousSibling.lastChild.textContent =
      "Message is required";
  } else {
    correctness++;
  }

  if (correctness == 3) {
    const contactContainer = document.getElementById("contact-container");
    contactContainer.classList.remove("show");
    correctness = 0;
    emailField.value = "";
    subjectField.value = "";
    messageField.value = "";
  }
}

function validateEmail(email) {
  // Simple email format validation
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function resetField(event) {
  var field = event.target;
  field.style.outline = "";
  field.previousSibling.previousSibling.lastChild.textContent = "";
}
var mobileMenuOpen = false;
function handleHamburgerClick() {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileLinks = document.querySelector(".mobile-links");

  hamburgerMenu.addEventListener("click", function () {
    if (!mobileMenuOpen) {
      mobileLinks.style.display = "block";
      mobileMenuOpen = true;
    } else {
      mobileMenuOpen = false;
      mobileLinks.style.display = "none";
    }

    console.log(mobileLinks.style.display);
  });
  const mobileLinksAll = document.querySelectorAll(".mobile-link");
  mobileLinksAll.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuOpen = false;
      mobileLinks.style.display = "none";
    });
  });

  window.addEventListener("scroll", (e) => {
    mobileMenuOpen = false;
    mobileLinks.style.display = "none";
  });
}
// Initialize Functions on Load
document.addEventListener("DOMContentLoaded", () => {
  setupParallax();
  changeBackgroundColor();
  updateBackgroundTextAndLogoBlur();
  hideNavigation();
  setupXYPosition();
  animateBlob();
  handleContactButton();
  handleProfileImagePerpective();
  handleHamburgerClick();

  document.getElementById("email").addEventListener("input", resetField);
  document.getElementById("subject").addEventListener("input", resetField);
  document.getElementById("message").addEventListener("input", resetField);
  window.addEventListener("resize", (e) => {
    document.documentElement.style.setProperty(
      "--screen-height",
      window.innerHeight + "px"
    );
  });
});

function ValidateEmail(mail) {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
  ) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
