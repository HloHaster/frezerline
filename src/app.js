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