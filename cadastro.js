const formInfo = document.querySelector("#data-form")
const cadastro = JSON.parse(localStorage.getItem("users")) || []
formInfo.addEventListener("submit", e => {
    e.preventDefault()
    const dataForm = new FormData(formInfo)
    const cadNovo = {
        nome:dataForm.get("nome").trim(),
        email:dataForm.get("email").trim(),
        idade:dataForm.get("idade").trim()
    }
    if (cadNovo.nome === "" && cadNovo.idade === "") {
        alert(`Preencha o campo`)
    }else{
        cadastro.push(cadNovo)
        localStorage.setItem("users", JSON.stringify(cadastro))
        window.location.href = "index.html"
    }
})