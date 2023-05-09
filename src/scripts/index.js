const endpoints = {
    categoriesReadAll: 'http://localhost:3333/categories/readAll',
    employeesCreate: 'http://localhost:3333/employees/create',
    companiesReadAll: 'http://localhost:3333/companies/readAll',
    companiesReadByCategory: 'http://localhost:3333/companies/readByCategory/',
    employeesReadAll: 'http://localhost:3333/employees/readAll',
    employeesOutOfWork: 'http://localhost:3333/employees/outOfWork',
    employeesUpdateEmployee: 'http://localhost:3333/employees/updateEmployee/',
    employeesDeleteEmployee: 'http://localhost:3333/employees/deleteEmployee/',
    employeesHireEmployee: 'http://localhost:3333/employees/hireEmployee/',
    modalDismissEmployee: 'http://localhost:3333/employees/dismissEmployee/',
    companiesReadById: 'http://localhost:3333/companies/readById/',
    departmentsCreate: 'http://localhost:3333/departments/create',
    departmentsReadAll: 'http://localhost:3333/departments/readAll',
    departmentsReadByCompany: 'http://localhost:3333/departments/readByCompany/',
    departmentsReadById: 'http://localhost:3333/departments/readById/',
    departmentsUpdate: 'http://localhost:3333/departments/update/',
    departmentsDelete: 'http://localhost:3333/departments/delete/',
    employeesProfile: 'http://localhost:3333/employees/profile'
}
categoryOptions()
initLogin()
toRegister()

function toRegister() {
    const button = document.getElementById("to-register")
    button.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = "./src/pages/signup.html"
    })
}

async function getCompaniesByCategory(categoryName) {
    const res = await fetch(`${endpoints.companiesReadByCategory}${categoryName}`)
    const data = await res.json()
    return await data
}
async function getAllCompanies() {
    const res = await fetch(endpoints.companiesReadAll)
    const data = await res.json()
    return data
}
async function getAllCategories() {
    const res = await fetch(endpoints.categoriesReadAll)
    const data = await res.json()
    return data

}

/* Renderiza os options no select inicial, seleciona a ul e renderiza primeiramente todas as companhias, depois renderiza conforme acontece change no select */
async function categoryOptions() {
    renderCompanies()
    const categories = await getAllCategories()
    const select = document.getElementById("select-categories")
    const all = document.createElement("option")
    all.value = "all"
    all.textContent = "Todos"
    select.appendChild(all)
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.name
        option.textContent = category.name
        select.appendChild(option)
    })
    select.addEventListener("change", () => renderCompanies(select.value))
}
async function renderCompanies(categoryName) {
    let companies = []
    if (categoryName != undefined && categoryName != "all") {
        companies = await getCompaniesByCategory(categoryName)
    } else {
        companies = await getAllCompanies()
    }

    const ul = document.querySelector('.companies-list')
    ul.innerHTML = ""
    companies.forEach(async company => {
        const categories = await getAllCategories()
        const category = await categories.find(category => category.id === company.category_id)
        const li = document.createElement('li')
        li.classList.add('companies-list__item')

        const h3 = document.createElement('h3')
        h3.textContent = company.name
        h3.classList.add('title1-bold')

        const span = document.createElement('span')
        span.textContent = category.name
        span.classList.add('companies-category-chip', 'button-default-outlined')


        li.appendChild(h3)
        li.appendChild(span)

        ul.appendChild(li)
    })
}

/* Renderiza os modais de login e cadastro quando chamados no modals.js que é onde estão todos eventos de chamada dos modais  */

function initLogin() {
    const button = document.getElementById("open-modal-login")
    button.addEventListener("click", () => {
        window.location.href = "./src/pages/login.html"
    })
}
function renderRegisterModal() {

    const modal = document.createElement('dialog')
    const title = document.createElement('h2')
    const form = document.createElement('form')
    const nameLabel = document.createElement('label')
    const nameInput = document.createElement('input')
    const emailLabel = document.createElement('label')
    const emailInput = document.createElement('input')
    const passwordLabel = document.createElement('label')
    const passwordInput = document.createElement('input')
    const registerButton = document.createElement('button')
    const returnButton = document.createElement('button')

    modal.id = 'modal-register'
    modal.classList.add('modal')
    title.classList.add('modal-title', 'font-poppins-700')
    title.textContent = 'Cadastre-se'
    form.classList.add('modal-form')
    nameLabel.setAttribute('for', 'name')
    nameLabel.classList.add('modal-label')
    nameLabel.textContent = 'Nome'
    nameInput.type = 'text'
    nameInput.name = 'name'
    nameInput.id = 'input-name'
    nameInput.classList.add('modal-input')
    nameInput.placeholder = 'Seu nome'
    nameInput.required = true
    emailLabel.setAttribute('for', 'email')
    emailLabel.classList.add('modal-label')
    emailLabel.textContent = 'E-mail'
    emailInput.type = 'email'
    emailInput.name = 'email'
    emailInput.id = 'input-email'
    emailInput.classList.add('modal-input')
    emailInput.placeholder = 'Seu e-mail'
    emailInput.required = true
    passwordLabel.setAttribute('for', 'password')
    passwordLabel.classList.add('modal-label')
    passwordLabel.textContent = 'Senha'
    passwordInput.type = 'password'
    passwordInput.name = 'password'
    passwordInput.id = 'input-password'
    passwordInput.classList.add('modal-input')
    passwordInput.placeholder = 'Sua senha'
    registerButton.classList.add('button', 'button-default', 'modal-btn--primary')
    registerButton.id = 'modal-register-btn'
    registerButton.textContent = 'Cadastrar'
    registerButton.addEventListener("click", (e) => insertNewEmployee(e))
    returnButton.classList.add('button', 'button-default-outlined', 'modal-btn--secondary')
    returnButton.id = 'modal-return-btn'
    returnButton.textContent = 'Retornar'
    returnButton.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })
    form.appendChild(nameLabel)
    form.appendChild(nameInput)
    form.appendChild(emailLabel)
    form.appendChild(emailInput)
    form.appendChild(passwordLabel)
    form.appendChild(passwordInput)
    form.appendChild(registerButton)
    form.appendChild(returnButton)
    modal.appendChild(title)
    modal.appendChild(form)

    document.body.appendChild(modal)
    modal.showModal()
}
function renderLoginModal() {

    const modal = document.createElement('dialog')
    modal.id = 'modal-login'
    modal.classList.add('modal')

    const title = document.createElement('h2')
    title.classList.add('modal-title', 'font-poppins-700')
    title.textContent = 'Login'

    const message = document.createElement('span')
    message.classList.add('text1-regular')
    message.textContent = 'Preencha os campos para realizar login'

    const form = document.createElement('form')
    form.classList.add('modal-form')

    const emailLabel = document.createElement('label')
    emailLabel.classList.add('modal-label')
    emailLabel.setAttribute('for', 'input-email')
    emailLabel.textContent = 'e-mail'

    const emailInput = document.createElement('input')
    emailInput.classList.add('modal-input')
    emailInput.setAttribute('type', 'email')
    emailInput.setAttribute('name', 'email')
    emailInput.setAttribute('id', 'input-email')
    emailInput.setAttribute('placeholder', 'Seu e-mail')
    emailInput.required = true

    const passwordLabel = document.createElement('label')
    passwordLabel.classList.add('modal-label')
    passwordLabel.setAttribute('for', 'input-password')
    passwordLabel.textContent = 'senha'

    const passwordInput = document.createElement('input')
    passwordInput.classList.add('modal-input')
    passwordInput.setAttribute('type', 'password')
    passwordInput.setAttribute('name', 'password')
    passwordInput.setAttribute('id', 'input-password')
    passwordInput.setAttribute('placeholder', 'Sua senha')

    const loginButton = document.createElement('button')
    loginButton.classList.add('button', 'button-default', 'modal-btn--primary')
    loginButton.setAttribute('id', 'modal-login-btn')
    loginButton.textContent = 'Login'

    const registerMessage = document.createElement('span')
    registerMessage.classList.add('text1-regular')
    registerMessage.textContent = 'ou'

    const registerButton = document.createElement('button')
    registerButton.classList.add('button', 'button-default-outlined', 'modal-btn--secondary')
    registerButton.setAttribute('id', 'modal-register-btn')
    registerButton.textContent = 'Cadastre-se'
    registerButton.addEventListener("click", () => {
        closeModal(modal)
        renderRegisterModal()
    })

    form.appendChild(emailLabel)
    form.appendChild(emailInput)
    form.appendChild(passwordLabel)
    form.appendChild(passwordInput)
    form.appendChild(loginButton)
    form.appendChild(registerMessage)
    form.appendChild(registerButton)

    modal.appendChild(title)
    modal.appendChild(message)
    modal.appendChild(form)


    document.body.appendChild(modal)
    modal.showModal()
    toLogin()
}

/* Faz o login e salva na localStorage o token e validação de adm, na sequencia direciona o usuário pra rota respectiva */



