/* script.js */
// script.js

// Seleciona o formulário pelo ID
const form = document.getElementById('userForm');

// Quando a página for carregada, preenche os dados salvos
window.addEventListener('DOMContentLoaded', () => {
  loadFormData(); // Preenche automaticamente os campos do formulário
});

// Ao tentar enviar o formulário
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o envio padrão

  // Captura os valores das senhas
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Verifica se as senhas são diferentes
  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return; // Não envia o formulário
  }

  // Se passou pela validação, salva os dados localmente
  saveFormData();

  // Simula envio com mensagem
  alert('Cadastro salvo com sucesso! (simulado)');

  // Se quiser realmente enviar os dados para o servidor, use:
  // form.submit();
});

// Salva os dados do formulário no localStorage
function saveFormData() {
  const data = {
    fullName: form.fullName.value,
    email: form.email.value,
    password: form.password.value,
    gender: form.gender.value,
    interests: Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value),
    country: form.country.value
    // Foto de perfil não é salva pois é arquivo
  };

  localStorage.setItem('userFormData', JSON.stringify(data));
}

// Carrega os dados salvos do localStorage e preenche o formulário
function loadFormData() {
  const stored = localStorage.getItem('userFormData');
  if (!stored) return;

  const data = JSON.parse(stored);

  if (data.fullName) form.fullName.value = data.fullName;
  if (data.email) form.email.value = data.email;
  if (data.password) {
    form.password.value = data.password;
    form.confirmPassword.value = data.password;
  }
  if (data.gender) {
    const genderRadio = form.querySelector(`input[name="gender"][value="${data.gender}"]`);
    if (genderRadio) genderRadio.checked = true;
  }
  if (Array.isArray(data.interests)) {
    data.interests.forEach(value => {
      const cb = form.querySelector(`input[name="interests"][value="${value}"]`);
      if (cb) cb.checked = true;
    });
  }
  if (data.country) form.country.value = data.country;
}

// Botão de limpar/reset
const resetBtn = document.getElementById('resetBtn');

// Quando clicado, limpa o formulário e remove dados do localStorage
resetBtn.addEventListener('click', () => {
  if (confirm("Deseja realmente limpar todos os dados do formulário?")) {
    form.reset(); // Limpa os campos do formulário
    localStorage.removeItem('userFormData'); // Apaga os dados salvos
    alert('Formulário e dados locais apagados!');
  }
});


// Toda vez que o usuário digitar algo, os dados são salvos automaticamente
form.addEventListener('input', () => saveFormData());
