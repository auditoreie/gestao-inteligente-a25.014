document.querySelectorAll('.offcanvas-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    const offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById('offcanvasRight')
    );
    if (offcanvas) {
      offcanvas.hide();
    }

    setTimeout(() => {
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  });
});

document.getElementById('newsletter').addEventListener('submit', function (e) {
  e.preventDefault();

  const emailInput = document.querySelector('input[name="email"]');
  const termsCheckbox = document.getElementById('terms');

  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  if (!termsCheckbox.checked) {
    alert('Você precisa aceitar os termos de política e privacidade.');
    return;
  }

  fetch('https://', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar o formulário.');
      }
      return response.json();
    })
    .then(data => {
      alert('Inscrição realizada com sucesso! Obrigado por se inscrever.');
      emailInput.value = '';
      termsCheckbox.checked = false;
    })
    .catch(error => {
      alert('Ocorreu um erro. Por favor, tente novamente.');
      console.error(error);
    });
});

const memberButton = document.querySelector('.btn-container button:nth-child(1)');
const partnerButton = document.querySelector('.btn-container button:nth-child(2)');
const memberLogos = document.querySelector('.logos-container .logos:nth-child(1)');
const partnerLogos = document.querySelector('.logos-container .logos:nth-child(2)');

memberButton.addEventListener('click', () => {
  memberLogos.classList.remove('d-none');
  partnerLogos.classList.add('d-none');

  // Altera o estado ativo dos botões
  memberButton.classList.add('active');
  partnerButton.classList.remove('active');
});

partnerButton.addEventListener('click', () => {
  // Torna visível os parceiros e oculta os membros
  partnerLogos.classList.remove('d-none');
  memberLogos.classList.add('d-none');

  // Altera o estado ativo dos botões
  partnerButton.classList.add('active');
  memberButton.classList.remove('active');
});
