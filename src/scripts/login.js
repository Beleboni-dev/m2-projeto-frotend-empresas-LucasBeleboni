const endpoint = {
    authLogin: 'http://localhost:3333/auth/login'
}

initAll()

async function initAll() {
    toHome()
    toLogin()
    toRegister()
}

function toRegister() {
    const buttons = document.querySelectorAll(".to-register")
    buttons.forEach(button => {
        console.log
        button.addEventListener("click", (e) => {
            e.preventDefault()
            window.location.href = "./signup.html"
        })
    })
}
function toHome() {
    const button = document.getElementById("to-home-btn")
    button.addEventListener("click", () => {
        window.location.href = "../../index.html"
    })
}
async function authLogin(email, password) {
    const body = {
        email,
        password
    }
    try {
        const res = await fetch(endpoint.authLogin, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (!res.ok) {
            throw new Error("Usuário ou senha invalido(s)")
        }

        const data = await res.json()
        saveCredencial(data)
        return data
    }
    catch (error) {
        console.log(error)
        throw new Error("Não foi possível fazer o login")
    }
}
async function saveCredencial(token) {
    const authToken = token.authToken
    const isAdmin = token.isAdm
    localStorage.setItem("auth", authToken)
    localStorage.setItem("isAdm", isAdmin)
    if (isAdmin) {
        window.location.href = "./adm-dashboard.html"
    } else {
        window.location.href = "./emp-dash.html"
    }
}
async function toLogin() {
    const loginButton = document.getElementById("modal-login-btn")
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const email = document.getElementById("input-email").value
        const password = document.getElementById("input-password").value
        await authLogin(email, password)
    })
}