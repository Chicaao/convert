//cotação moedas do dia 
const USD = 5.68
const EUR = 6.09
const GBP = 7.39
// Obtendo elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")
// Manipulando input amount para receber apenas números
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})
// Captando o evento de submit do formulário
form.onsubmit = (event) => {
  event.preventDefault()
  
  switch(currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case 'EUR':
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try{
    // Exibindo cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
    // Calcula o total
    let total = amount * price
    // Verifica se o resultado não é um numero
    if(isNaN(total)) {
      return alert ("Por favor, digite o valor corretamente para converter.")
    }
    // formatar o valor total
    total = formatCurrencyBRL(total).replace("R$", "")
    // Exibe o resultado total 
    result.textContent = `${total} Reais`
    // APlica a classe que exibe o footer
    footer.classList.add("show-result")
  } catch (error) {
    // Remove a classe do footer da tela
    footer.classList.remove("show-result")
    console.log(error)
    alert("Não foi possível converter. Tente novamente mais tarde")
  }
}
// Formata a moeda em real Brasileiro
function formatCurrencyBRL(value){
  // Converte para numero para usar o toLocaleString
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}