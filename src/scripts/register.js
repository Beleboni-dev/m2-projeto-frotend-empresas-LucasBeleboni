goToLogin()
toHome()
function goToLogin() {
    const button = document.getElementById("to-login")
    button.addEventListener("click", () => {
        window.location.href = "./login.html"
    })
}
function toHome() {
    const buttons = document.querySelectorAll(".to-home__btn")
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "../../index.html"
        })
    })
}
initRegister()

async function initRegister() {
    const button = document.getElementById("modal-register-btn")
    button.addEventListener("click", async (e) => {
        e.preventDefault()
        await insertNewEmployee()
    })
}

async function insertNewEmployee() {
    const nameInput = document.getElementById('input-name').value
    const emailInput = document.getElementById('input-email').value
    const passwordInput = document.getElementById('input-password').value

    // Verifica se algum campo está vazio
    if (!nameInput || !emailInput || !passwordInput) {
        alert('Por favor, preencha todos os campos')
        return
    }

    await employeesCreate(nameInput, emailInput, passwordInput)
}

async function employeesCreate(name, email, password) {
    const body = {
        name,
        email,
        password
    }
    console.log(body)
    try {

        const res = await fetch("http://localhost:3333/employees/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await res.json()
        alert("Usuário criado com sucesso")
        window.location.href = "./login.html"
        return data
    }
    catch (error) {
        console.log(error)
        throw new Error("não foi possível cadastrar o usuário")
    }


}