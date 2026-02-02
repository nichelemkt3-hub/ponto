function registrarHora(tipo) {
  const payload = basePayload();
  payload.tipo = tipo;
  payload.hora = new Date().toLocaleTimeString('pt-BR');

  enviarDados(payload);
  alert('Registrado');
}

function registrarKm(tipo) {
  const fileInput = tipo === 'km_saida'
    ? document.getElementById('fotoSaida')
    : document.getElementById('fotoFinal');

  const km = tipo === 'km_saida'
    ? document.getElementById('kmSaida').value
    : document.getElementById('kmFinal').value;

  const file = fileInput.files[0];
  if (!file || !km) {
    alert('KM e imagem obrigatórios');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const payload = basePayload();
    payload.tipo = tipo;
    payload.kmSaida = tipo === 'km_saida' ? km : '';
    payload.kmFinal = tipo === 'km_final' ? km : '';
    payload.imagem = reader.result.split(',')[1];
    payload.mimeType = file.type;
    payload.nomeArquivo = file.name;

    await enviarDados(payload);
    alert('KM enviado');
  };
  reader.readAsDataURL(file);
}

function basePayload() {
  return {
    vendedor: localStorage.getItem('vendedor'),
    codigo: localStorage.getItem('codigo')
  };
}
