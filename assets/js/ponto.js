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

const ordem = ['entrada', 'saidaAlmoco', 'retornoAlmoco', 'saidaFinal'];

function aplicarStatus(id, feito) {
  const btn = document.getElementById(id);

  if (feito) {
    btn.className = 'done';
    btn.disabled = true;

    const proximo = ordem[ordem.indexOf(id) + 1];
    if (proximo) {
      liberarBotao(proximo);
    }
  }
}

function liberarBotao(id) {
  const btn = document.getElementById(id);
  btn.className = 'primary';
  btn.disabled = false;
  btn.onclick = () => registrarHora(id);
}


let tipoPendente = null;

function registrarHora(tipo) {
  tipoPendente = tipo;

  const hora = new Date().toLocaleTimeString('pt-BR');
  document.getElementById('modalTitle').innerText = 'Confirmar registro';
  document.getElementById('modalText').innerText =
    `Confirmar ${formatar(tipo)} às ${hora}?`;

  document.getElementById('confirmModal').classList.remove('hidden');
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

function confirmarRegistro() {
  const tipo = tipoPendente;
  const hora = new Date().toLocaleTimeString('pt-BR');

  api({
    vendedor: vendedor.value,
    codigo: codigo.value,
    tipo,
    hora
  });

  aplicarStatus(tipo, true);
  fecharModal();
}

function fecharModal() {
  document.getElementById('confirmModal').classList.add('hidden');
}

function formatar(tipo) {
  return {
    entrada: 'Entrada',
    saidaAlmoco: 'Saída para almoço',
    retornoAlmoco: 'Retorno do almoço',
    saidaFinal: 'Saída final'
  }[tipo];
}
