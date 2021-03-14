init = () => {
  document.querySelector('.js-scroll-icon').onclick = () => this.navigateToSection('benefits');
  const navElements = document.querySelectorAll('.js-nav-item');
  if (navElements && navElements.length) {
    navElements.forEach(navElement => {
      const navId = navElement.dataset.id;
      navElement.onclick = () => this.navigateToSection(navId);
    });
  }
  document.querySelector('.js-form-submit').onclick = this.validate;
  this.optionsForMobile();
  window.addEventListener('resize', this.optionsForMobile);
  document.querySelector('.js-mobile-nav').onclick = this.onMobileNavClick;
}

navigateToSection = (sectionId) => {
  this.highLightSelectedElement(sectionId);
  const scrollTopValue = document.getElementById(`${sectionId}`).offsetTop - 70;
  document.querySelector('.js-container').scrollTo(0, scrollTopValue);
}

highLightSelectedElement = (sectionId) => {
  const navElements = document.querySelectorAll('.js-nav-item');
  if (navElements && navElements.length) {
    navElements.forEach(navElement => {
      const navId = navElement.dataset.id;
      if (sectionId == navId) {
        navElement.classList.add('high-light-tab');
      } else {
        navElement.classList.remove('high-light-tab');
      }
    });
  }
}

validate = () => {
  const contactUsElement = document.getElementById('contactForm');
  const name = contactUsElement.querySelector('.js-name').value;
  const email = contactUsElement.querySelector('.js-email').value;
  const phone = contactUsElement.querySelector('.js-phone').value;
  const message = contactUsElement.querySelector('.js-message').value;
  const error_message = document.querySelector('.js-error-message');

  let text;
  if (name && name.length < 5) {
    text = 'Please Enter min 5 characters Name';
    error_message.innerHTML = text;
    return false;
  }
  if (phone && (isNaN(phone) || phone.length != 10)) {
    text = 'Please Enter valid Phone Number';
    error_message.innerHTML = text;
    return false;
  }
  if (email && (email.indexOf('@') == -1 || email.length < 6)) {
    text = 'Please Enter valid Email';
    error_message.innerHTML = text;
    return false;
  }
  if (message && message.length <= 140) {
    text = 'Please Enter More Than 140 Characters';
    error_message.innerHTML = text;
    return false;
  }
  if (name == '' || email == '') {
    text = 'Please fill the form';
    error_message.innerHTML = text;
  } else {
    alert('Form Submitted Successfully!');
    this.clearInputFields();
  }
  setTimeout(() => {
    error_message.innerHTML = '';
  }, 3000);
  return true;
}

clearInputFields = () => {
  const contactUsElement = document.getElementById('contactForm');
  const name = contactUsElement.querySelector('.js-name').value;
  const email = contactUsElement.querySelector('.js-email').value;
  const phone = contactUsElement.querySelector('.js-phone').value;
  const message = contactUsElement.querySelector('.js-message').value;
  if (name) {
    name = '';
  }
  if (email) {
    email = '';
  }
  if (phone) {
    phone = '';
  }
  if (message) {
    message = '';
  }
}
isMobile = () => {
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Nokia|Windows Phone/i.test(navigator.userAgent);
  if (!isMobile) {
    if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
      isMobile = true;
    }
  }
  return isMobile;
}

optionsForMobile = () => {
  setTimeout(() => {
    const isMobile = this.isMobile();
    const element = document.querySelector('.js-container');
    if (isMobile) {
      element.classList.remove('desktop');
      element.classList.add('mobile');
    } else {
      element.classList.add('desktop');
      element.classList.remove('mobile');
    }
  }, 300);
}

onMobileNavClick = () => {
  document.querySelector('.js-nav-bar').classList.toggle('opened');
}

this.init();
