// HEADER
const header = document.querySelector('.header');
const toggleClass = "is-fixed";

window.addEventListener('scroll', function () {
  const scrollFromTop = document.querySelector('html').scrollTop;
  const slideHeight = document.querySelector('.hero').offsetHeight;

  if (scrollFromTop >= slideHeight) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
}
)


// FAQ
const faqItems = document.querySelectorAll(".faq-questions button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < faqItems.length; i++) {
    faqItems[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

faqItems.forEach(item => item.addEventListener('click', toggleAccordion));






// Contact script

//Валидация формы

const form = document.getElementById('cost-form');
form.addEventListener('submit', formSend);

let formFields = document.querySelectorAll('.cost-form-field')
let nameInput;
let emailInput;
let telInput;
let FileInput

for (let index = 0; index < formFields.length; index++) {
  const input = formFields[index];
  let timeout = null

  if (input.classList.contains('name')) {
    nameInput = input;
    input.addEventListener('change', validateName);
  }
  if (input.classList.contains('email')) {
    emailInput = input;
    input.addEventListener('input', function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        validateEmail()
      }, 500);
    });
  }
  if (input.classList.contains('tel')) {
    telInput = input;
    input.addEventListener('input', function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        validateTel()
      }, 500);
    });
  }
}

function validateName() {
  if (!testName(nameInput)) {
    formAddError(nameInput);
    return;
  } else {
    formRemoveError(nameInput);
  }
}

function validateEmail() {
  if (!testEmail(emailInput)) {
    formAddError(emailInput, "errorEmailCostForm", 'Введите правильный E-mail');
    return;
  } else {
    formRemoveError(emailInput, "errorEmailCostForm");
  }
}

function validateTel() {
  if (!testTel(telInput)) {
    formAddError(telInput, "errorTelCostForm", "Введите правильный телефон");
    return;
  } else {
    formRemoveError(telInput, "errorTelCostForm");
  }
}


function formSend(e) {
  e.preventDefault();
  // будем отправлять :)
}


function formAddError(input, errorInputName, text) {
  input.classList.add('error');
  let errBox = document.getElementById(errorInputName);
  errBox.textContent = text;
}

function formRemoveError(input, errorInputName) {
  input.classList.remove('error');
  let errBox = document.getElementById(errorInputName);
  errBox.textContent = "";
}

let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/;
let telRegex = /^[\+\(\s.\-\/\d\)]{5,30}$/

//функция теста email
function testEmail(input) {
  return input.value !== '' && emailRegex.test(input.value);
}

//функция теста name
function testName(input) {
  return input.value !== '';
}

//функция теста tel
function testTel(input) {
  return input.value !== '' && telRegex.test(input.value);
}