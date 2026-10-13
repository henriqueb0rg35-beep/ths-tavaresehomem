'use strict';
const menu = document.querySelector('.menu');
if (menu) {
  document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
}
const form = document.querySelector('.form-agendamento');
if (form) {
  const date = document.getElementById('data');
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  date.min = localToday;
  const select = document.getElementById('servico');
  const requestedService = new URLSearchParams(location.search).get('servico');
  if ([...select.options].some(option => option.value === requestedService)) select.value = requestedService;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const [year, month, day] = date.value.split('-');
    document.getElementById('request-text').value = `Olá, THS! Gostaria de conversar sobre um projeto.\nNome: ${document.getElementById('nome').value.trim()}\nE-mail: ${document.getElementById('email').value.trim()}\nServiço: ${select.selectedOptions[0].textContent}\nData de preferência: ${day}/${month}/${year}\nAguardo contato para alinhar o escopo e confirmar a disponibilidade.`;
    document.getElementById('request-result').hidden = false;
    document.getElementById('form-status').textContent = 'Solicitação preparada. Copie o texto abaixo para compartilhar com a equipe.';
  });
  document.getElementById('copy-request').addEventListener('click', async () => {
    const text = document.getElementById('request-text');
    try { await navigator.clipboard.writeText(text.value); document.getElementById('form-status').textContent = 'Texto copiado. Compartilhe com a equipe THS.'; }
    catch { text.focus(); text.select(); document.getElementById('form-status').textContent = 'Selecione e copie o texto para compartilhar.'; }
  });
}
