document.addEventListener("DOMContentLoaded", () => {
  const mensagem = document.getElementById("mensagemTemporal");
  if (mensagem) {
    const agora = new Date();
    const hora = agora.getHours();
    const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
    mensagem.textContent = `${saudacao}! Estamos prontos para cuidar do seu pet.`;
  }

  const dataInput = document.getElementById("data");
  if (dataInput) dataInput.min = new Date().toISOString().split("T")[0];

  const form = document.getElementById("formAgendamento");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const resultado = document.getElementById("resultadoAgendamento");
    const nomeCliente = document.getElementById("nomeCliente").value.trim();
    const nomePet = document.getElementById("nomePet").value.trim();
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const metodos = [...document.querySelectorAll('input[name="metodo"]:checked')].map((item) => item.value);

    if (!form.checkValidity() || metodos.length === 0) {
      form.classList.add("was-validated");
      resultado.className = "alert alert-warning mt-4";
      resultado.textContent = "Revise os campos obrigatórios e escolha pelo menos um método de atendimento.";
      resultado.focus();
      return;
    }

    const valores = { Banho: 60, Tosa: 80 };
    const taxaTelebusca = metodos.includes("Tele-busca") ? 15 : 0;
    const valor = (valores[servico] ?? 0) + taxaTelebusca;
    const dataFormatada = new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");

    resultado.className = "alert alert-success mt-4";
    resultado.textContent = `Agendamento demonstrativo confirmado para ${nomeCliente}, responsável por ${nomePet}: ${servico}, ${dataFormatada} às ${hora}. Método: ${metodos.join(" e ")}. Valor estimado: R$ ${valor.toFixed(2).replace(".", ",")}.`;
    resultado.focus();
    form.reset();
    form.classList.remove("was-validated");
  });
});
