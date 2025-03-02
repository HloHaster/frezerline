document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Остановить наблюдение после появления
        }
      });
    },
    { threshold: 0.1 } // Срабатывает, когда элемент виден на 20%
  );

  elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".slide-in");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Остановить наблюдение после появления
        }
      });
    },
    { threshold: 0.1 } // Срабатывает, когда элемент виден на 20%
  );

  elements.forEach(el => observer.observe(el));
});

// // HEADER
// const header = document.querySelector('.header');
// const toggleClass = "is-fixed";

// window.addEventListener('scroll', function () {
//   const scrollFromTop = document.querySelector('html').scrollTop;
//   const slideHeight = document.querySelector('.hero').offsetHeight;

//   if (scrollFromTop >= slideHeight) {
//     header.classList.add(toggleClass);
//   } else {
//     header.classList.remove(toggleClass);
//   }
// }
// )

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const firstBlock = document.querySelector(".first-block");
  const headerHeight = header.offsetHeight;

  function toggleHeader() {
    if (window.scrollY > firstBlock.clientHeight - headerHeight) {
      header.classList.add("is-fixed");
      document.body.style.paddingTop = `${headerHeight}px`;
      document.documentElement.style.overflowX = "hidden"; // Блокируем горизонтальную прокрутку
    } else {
      header.classList.remove("is-fixed");
      document.body.style.paddingTop = "0px";
      document.documentElement.style.overflowX = "auto"; // Возвращаем прокрутку, если нужна
    }
  }

  window.addEventListener("scroll", toggleHeader);
});

// Services

function openModal(src) {
  if (window.innerWidth > 768) {
      document.getElementById('modal-img').src = src;
      document.getElementById('modal').style.display = 'flex';
  }
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

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



// Forms 

const forms = document.querySelectorAll('.uploadForm');
const maxFiles = 7;
let timeout = null

forms.forEach(form => {
   // Валидация файлов при изменении
  const fileInput = form.querySelector('input[type="file"]');
  const fileListDiv = form.querySelector('.fileList');
  const attachBtn = form.querySelector('.btn-attach')

  attachBtn.addEventListener('click', function(e) {
    fileInput.click()
  })

  fileInput.addEventListener('input', (event) => {
    validateFiles(fileInput, fileListDiv);
  });

  // Валидация текстовых полей в реальном времени
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
    input.addEventListener('change', function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        validateInput(input)
      }, 300);
    });
  });

  // Отправка формы
  form.addEventListener('submit', handleFormSubmit);
});

// Рендеринг обновленного списка файлов
function renderFileList(fileListDiv, files) {
  fileListDiv.innerHTML = '';
  Array.from(files).forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    const fileName = document.createElement('span');
    fileName.classList.add('file-name');
    fileName.textContent = file.name;

    const removeButton = document.createElement('span');
    removeButton.classList.add('remove-file');
    removeButton.textContent = '✖';
    removeButton.addEventListener('click', () => {
      removeFile(fileInput, file.name, fileListDiv);
    });

    fileItem.appendChild(fileName);
    fileItem.appendChild(removeButton);
    fileListDiv.appendChild(fileItem);
  });
}

// Удаление файла из списка
function removeFile(fileInput, fileName, fileListDiv) {
  const filesArray = Array.from(fileInput.files);
  const updatedFilesArray = filesArray.filter(file => file.name !== fileName);

  const dataTransfer = new DataTransfer();
  updatedFilesArray.forEach(file => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;

  renderFileList(fileListDiv, fileInput.files);
}



function validateInput(input) {
  const inputType = input.getAttribute('name');
  let isValid = false;

  if (inputType === 'name') {
    isValid = input.value.trim().length > 0;
    if (!isValid) addErrorMessage(input, 'Введите корректное имя');
    else removeErrorMessage(input);
  } else if (inputType === 'phone') {
    const phoneRegex = /^[\+\(\s.\-\/\d\)]{5,30}$/
    isValid = phoneRegex.test(input.value.trim());
    if (!isValid) addErrorMessage(input, 'Введите корректный номер телефона');
    else removeErrorMessage(input);
  } else if (inputType === 'email') {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,15})+$/;
    isValid = emailRegex.test(input.value.trim());
    if (!isValid) addErrorMessage(input, 'Введите корректный E-mail');
    else removeErrorMessage(input);
  }

  // Установка классов в зависимости от валидности
  if (isValid) {
    input.classList.remove('error');
  } else {
    input.classList.add('error');
  }

  return isValid;
}

// Валидация файлов
function validateFiles(fileInput, fileListDiv) {
  const files = Array.from(fileInput.files);
  const validExtensions = ['.stp', '.dxf', '.dwg', '.igs'];
  let isValid = true;

  // Проверка количества файлов
  if (files.length > maxFiles) {
    alert('Максимум можно прикрепить 7 файлов.');
    isValid = false;
  }

   // Фильтрация неподдерживаемых файлов
   const filteredFiles = files.filter(file => {
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      alert(`Невалидный формат файла: ${file.name}. Доступны только .stp, .dxf, .dwg, .igs.`);
      isValid = false;
      return false;
    }
    return true;
  });

  // Если все файлы валидны, обновляем список файлов
  if (isValid) {
    renderFileList(fileListDiv, filteredFiles);
  }

  // Обновляем input, оставляя только валидные файлы
  const dataTransfer = new DataTransfer();
  filteredFiles.forEach(file => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;

  return isValid;
}

// Функция для валидации всех полей формы
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required]');
  let isFormValid = true;

  inputs.forEach(input => {
    if (!validateInput(input)) {
      isFormValid = false;
    }
  });

  const fileInput = form.querySelector('input[type="file"]');
  const fileListDiv = form.querySelector('.fileList');
  if (!validateFiles(fileInput, fileListDiv)) {
    isFormValid = false;
  }

  return isFormValid;
}


// Добавляем элементы для отображения сообщений об ошибках
function addErrorMessage(input, message) {
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains('error-message')) {
    error = document.createElement('div');
    error.classList.add('error-message');
    input.after(error);
  }

  error.textContent = message;
}

function removeErrorMessage(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains('error-message')) {
    error.textContent = '';
  }
}

// Функция для отправки формы
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!validateForm(form)) {
    alert('Пожалуйста, заполните все обязательные поля корректно.');
    return;
  }

  const formData = new FormData(form);

  // Отправка данных
  sendFormData(formData, form.id);
}

// Функция отправки данных формы
function sendFormData(formData, formId) {
  fetch('send_mail.php', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    alert('Форма успешно отправлена!');
    resetForm(formId);  // Очистка формы после успешной отправки
  })
  .catch(error => {
    console.error('Ошибка отправки формы:', error);
  });
}

// Очистка формы
function resetForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
  const fileListDiv = form.querySelector('.fileList');
  fileListDiv.innerHTML = ''; // Очистка списка файлов
}