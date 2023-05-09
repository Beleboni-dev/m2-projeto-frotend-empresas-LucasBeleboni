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
checkLoginStatus()
function checkLoginStatus() {
    const isAuth = localStorage.getItem("auth")
    const isAdm = localStorage.getItem("isAdm")
    if (isAdm) {
        setTimeout(() => {
            location.replace('./src/pages/adm-dashboard.html');
        }, 0)
    }
    if (isAuth && isAdm === 'false') {
        setTimeout(() => {
            location.replace("./src/pages/emp-dash.html")
        }, 0)
    }
    if (!isAuth) {
        document.body.style.display = "block"
    }
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

function initLogin() {
    const button = document.getElementById("open-main-login")
    button.addEventListener("click", () => {
        window.location.href = "./src/pages/login.html"
    })
}




