window.onload = async () => {
  vendedor.value = localStorage.getItem('vendedor') || '';
  codigo.value = localStorage.getItem('codigo') || '';

  if (!codigo.value) return;

  const status = await api({ action: 'status', codigo: codigo.value });

  if (status.exists) {
    aplicarStatus('entrada', status.entrada);
    aplicarStatus('saidaAlmoco', status.saidaAlmoco);
    aplicarStatus('retornoAlmoco', status.retornoAlmoco);
    aplicarStatus('saidaFinal', status.saidaFinal);

    if (status.kmSaida) kmSaida.value = status.kmSaida;
    if (status.kmFinal) kmFinal.value = status.kmFinal;
  }
};

function aplicarStatus(id, valor) {
  if (valor) {
    const btn = document.getElementById(id);
    btn.classList.add('done');
    btn.disabled = true;
  }
}

function registrarHora(tipo) {
  api({
    vendedor: vendedor.value,
    codigo: codigo.value,
    tipo,
    hora: new Date().toLocaleTimeString('pt-BR')
  });
  aplicarStatus(tipo, true);
}

function registrarKm(tipo) {
  const km = tipo === 'km_saida' ? kmSaida.value : kmFinal.value;
  const file = tipo === 'km_saida' ? fotoSaida.files[0] : fotoFinal.files[0];

  if (!km || !file) {
    alert('KM e imagem são obrigatórios');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    api({
      vendedor: vendedor.value,
      codigo: codigo.value,
      tipo,
      km,
      imagem: reader.result.split(',')[1],
      mimeType: file.type,
      nomeArquivo: file.name
    });
  };
  reader.readAsDataURL(file);
}
