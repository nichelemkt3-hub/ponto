function salvarUsuario() {
  const vendedor = document.getElementById('vendedor').value;
  const codigo = document.getElementById('codigo').value;

  if (!vendedor || !codigo) {
    alert('Preencha vendedor e código');
    return;
  }

  localStorage.setItem('vendedor', vendedor);
  localStorage.setItem('codigo', codigo);
  alert('Dados salvos');
}
