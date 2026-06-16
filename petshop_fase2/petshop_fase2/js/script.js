document.addEventListener('DOMContentLoaded', function () {
  const mensagem = document.getElementById('mensagemTemporal');
  if (mensagem) {
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao = 'Olá';
    if (hora < 12) saudacao = 'Bom dia';
    else if (hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';
    mensagem.textContent = `${saudacao}! Hoje é ${agora.toLocaleDateString('pt-BR')} e estamos prontos para cuidar do seu pet.`;
  }

  const form = document.getElementById('formAgendamento');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const nomeCliente = document.getElementById('nomeCliente').value.trim();
      const nomePet = document.getElementById('nomePet').value.trim();
      const servico = document.getElementById('servico').value;
      const data = document.getElementById('data').value;
      const hora = document.getElementById('hora').value;
      const metodos = Array.from(document.querySelectorAll('input[name="metodo"]:checked')).map(item => item.value);
      const resultado = document.getElementById('resultadoAgendamento');

      if (!nomeCliente || !nomePet || !servico || !data || !hora || metodos.length === 0) {
        resultado.className = 'alert alert-warning mt-4';
        resultado.textContent = 'Preencha todos os campos obrigatórios e escolha pelo menos um método de agendamento.';
        resultado.focus();
        return;
      }

      const valor = servico === 'Banho' ? 60 : 80;
      resultado.className = 'alert alert-success mt-4';
      resultado.innerHTML = `<strong>Agendamento confirmado!</strong><br>Cliente: ${nomeCliente}<br>Pet: ${nomePet}<br>Serviço: ${servico}<br>Método: ${metodos.join(' e ')}<br>Data: ${data.split('-').reverse().join('/')} às ${hora}<br>Valor estimado: R$ ${valor.toFixed(2).replace('.', ',')}`;
      resultado.focus();
      form.reset();
    });
  }
});
