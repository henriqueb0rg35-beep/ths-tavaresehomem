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
  date.min = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  const select = document.getElementById('servico');
  const requestedService = new URLSearchParams(location.search).get('servico');
  if ([...select.options].some(option => option.value === requestedService)) select.value = requestedService;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const [year, month, day] = date.value.split('-');
    const details = document.getElementById('detalhes').value.trim();
    const message = [
      'Olá, equipe Thavera Group! Gostaria de conversar sobre um projeto.',
      '',
      'Nome: ' + document.getElementById('nome').value.trim(),
      'E-mail: ' + document.getElementById('email').value.trim(),
      'Serviço: ' + select.selectedOptions[0].textContent,
      'Data sugerida para contato: ' + day + '/' + month + '/' + year,
      details ? 'Detalhes: ' + details : '',
      '',
      'Aguardo retorno para alinhar o escopo e confirmar a disponibilidade.'
    ].filter((line,i,a) => line !== '' || a[i-1] !== '').join('\n');
    document.getElementById('request-text').value = message;
    document.getElementById('send-request').href = 'mailto:group.thavera@gmail.com?subject=' + encodeURIComponent('Proposta Thavera Group — ' + select.selectedOptions[0].textContent) + '&body=' + encodeURIComponent(message);
    document.getElementById('request-result').hidden = false;
    document.getElementById('form-status').textContent = 'Mensagem preparada. Abra seu e-mail ou copie o texto para enviar.';
  });
  document.getElementById('copy-request').addEventListener('click', async () => {
    const field = document.getElementById('request-text');
    try {
      await navigator.clipboard.writeText(field.value);
      document.getElementById('form-status').textContent = 'Mensagem copiada. Envie para group.thavera@gmail.com.';
    } catch {
      field.focus(); field.select();
      document.getElementById('form-status').textContent = 'Selecione e copie a mensagem para compartilhar.';
    }
  });
}