const contas = document.querySelector("#contas")
const getInfo = JSON.parse(localStorage.getItem("users")) || []
getInfo.forEach(info => {
    const divCard = document.createElement("div")
    const divIcone = document.createElement("div")
    const texto = document.createElement("p")
    
    divCard.classList.add("card")
    divIcone.classList.add("icone")
    texto.classList.add("txt")
    
    texto.textContent = info.nome

    divCard.appendChild(divIcone)
    divCard.appendChild(texto)
    contas.appendChild(divCard)
})
