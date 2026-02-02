const API_URL = 'https://script.google.com/macros/s/AKfycbw6T084_OIjLNPikozHFm-5tA_WZAvRPC2Dyvw7WfdvuYJ2wdazgMszqY5naXWo5kyx/exec';

async function api(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.json();
}

function marcarKmConfirmado(botao) {
  botao.classList.add('ok');
  botao.innerText = 'KM Confirmado ✔';
  botao.disabled = true;
}
