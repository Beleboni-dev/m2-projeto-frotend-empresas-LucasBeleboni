const endpoints = {
    categoriesReadAll: 'http://localhost:3333/categories/readAll',
    authLogin: 'http://localhost:3333/auth/login',
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
    departmentsDelete: 'http://localhost:3333/departments/delete/'

}

//utils
async function handleInsertDepartments(e, companyName) {
    e.preventDefault()
    const name = document.getElementById("department-name-input").value
    const description = document.getElementById("department-description-input").value
    const companyID = document.getElementById("company-to-department").value

    const newDepartment = {
        name: name,
        description: description,
        company_id: companyID
    }
    await departmentsCreate(newDepartment, companyID, companyName)

}
async function handleDeleteDepartment(e, employees, departmentID, companyID, companyName) {
    e.preventDefault()
    await departmentsDelete(employees, departmentID, companyID, companyName)
}
async function handleHireEmployee(e, employeeID, departmentID, companyName) {
    e.preventDefault()
    await employeesHireEmployee(employeeID, departmentID, companyName)
}
async function handleDismissEmployee(e, employeeID, employeeName, departmentID, companyName) {
    e.preventDefault()
    await modalDismissEmployee(employeeID, departmentID, companyName, employeeName)
}
function getAuthHeader() {
    const authToken = localStorage.getItem("auth");

    if (authToken) {
        return { Authorization: `Bearer ${authToken}` }
    } else {
        return
    }
}
export function handleLogout() {
    window.location.href = "../../index.html"
    localStorage.clear()
}

// request

async function departmentsCreate(newDepartment, companyID, companyName) {
    const res = await fetch(endpoints.departmentsCreate, {
        method: "POST",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDepartment)
    })
    if (!res.ok) {
        throw new Error("Não foi possível criar o departamento")
    } else {
        const data = await res.json()
        alert("Departamento cadastrado com sucesso")
        const ulDepartments = document.getElementById("departments-list")
        ulDepartments.innerHTML = ""
        const select = document.getElementById("select-companies")
        select.value = companyID
        await renderDepartments(companyID, companyName)

        const modal = document.getElementById("new-department-modal")
        modal.close()
        modal.remove()
        return await data
    }
}
async function departmentsReadByCompany(companyID) {
    const res = await fetch(`${endpoints.departmentsReadByCompany}${companyID}`, { headers: getAuthHeader() })
    const data = await res.json()
    return await data
}
export async function getAllCompanies() {
    const res = await fetch(endpoints.companiesReadAll)
    const data = await res.json()
    return data
}
async function departmentsDelete(employees, departmentID, companyID, companyName) {
    const res = await fetch(`${endpoints.departmentsDelete}${departmentID}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    })
    if (!res.ok) {
        throw new Error("Não foi possível deletar, verifique o ID do departamento")
    }
    const data = await res.json()
    await dismissAllEmployees(employees)
    alert("Departamento deletado com sucesso")
    const modal = document.getElementById("delete-department-modal")
    const ulDepartments = document.getElementById("departments-list")
    ulDepartments.innerHTML = ""
    const select = document.getElementById("select-companies")
    select.value = companyID
    await renderDepartments(companyID, companyName)
    await renderEmployeeSection()
    modal.close()
    modal.remove()

    return await data
}
async function departmentsUpdate(departmentID, newDescription, companyID, companyName) {

    const newValues = {
        description: newDescription
    }
    const res = await fetch(`${endpoints.departmentsUpdate}${departmentID}`, {
        method: "PATCH",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newValues)

    })
    if (!res.ok) {
        throw new Error("Não foi possível atualizar dados do departamento")
    }
    const data = await res.json()
    const modal = document.getElementById("edit-department-modal")
    modal.close()
    modal.remove()
    renderDepartments(companyID, companyName)
    departmentsReadById(departmentID)
    return data
}
async function employeesReadAll() {
    const res = await fetch(endpoints.employeesReadAll, { headers: getAuthHeader() })
    const data = await res.json()
    return data
}
async function employeesOutOfWork() {
    const res = await fetch(endpoints.employeesOutOfWork, { headers: getAuthHeader() })
    const data = await res.json()
    return data
}
async function employeesUpdateEmployee(employeeID, newValues) {

    const res = await fetch(`http://localhost:3333/employees/updateEmployee/${employeeID}`, {
        method: "PATCH",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newValues)
    })
    if (!res.ok) {
        console.log(res)
        throw new Error("Não foi possível atualizar dados do funcionário")
    }
    const data = await res.json()
    alert(`atualizo dados do usuário ${newValues.name}`)
    const modal = document.getElementById("edit-employee-modal")
    modal.close()
    modal.remove()
    renderEmployeeSection()
    return data
}
async function employeesDeleteEmployee(employeeID) {
    const res = await fetch(`${endpoints.employeesDeleteEmployee}${employeeID}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    })
    if (!res.ok) {
        throw new Error("Não foi possível deletar, verifique o ID")
    }
    const data = await res.json()
    const modal = document.getElementById("delete-employee-modal")
    modal.close()
    modal.remove()
    renderEmployeeSection()
    alert("usuário deletado")
    return data
}
async function departmentsReadAll() {

    const res = await fetch(endpoints.departmentsReadAll, { headers: getAuthHeader() })
    const data = await res.json()
    console.log(data)
    return data
}
async function employeesHireEmployee(employeeID, departmentID, companyName) {


    const res = await fetch(`${endpoints.employeesHireEmployee}${employeeID}`, {
        method: "PATCH",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "department_id": departmentID })

    })
    if (!res.ok) {
        throw new Error("Não foi possível incluir o funcionário nesse departamento")
    }
    const data = await res.json()
    alert("Funcionário contratado")
    const select = document.getElementById("select-employee")
    const option = select.querySelector(`[value = "${employeeID}"]`)
    option.remove()
    select.selectedIndex = 0
    const ulContainer = document.getElementById("employee-list-container")
    const oldUl = document.querySelector(".department-employees-list")
    const currentUl = await renderEmployeeList(departmentID, companyName)
    ulContainer.replaceChild(currentUl, oldUl)
    await renderEmployeeSection()
    return data
}
async function dismissAllEmployees(employees) {
    if (employees.length > 0) {
        employees.forEach(async employee => {
            const res = await fetch(`${endpoints.modalDismissEmployee}${employee.id}`, {
                method: "PATCH",
                headers: {
                    ...getAuthHeader(),
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) {
                throw new Error("Não foi possível demitir esse funcionário")
            }
            const data = await res.json()
            alert(`${employee.name} demitido(a) do departamento`)
        })
    }
}

async function modalDismissEmployee(employeeID, departmentID, companyName) {

    const res = await fetch(`${endpoints.modalDismissEmployee}${employeeID}`, {
        method: "PATCH",
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json"
        }
    })
    if (!res.ok) {
        throw new Error("Não foi possível demitir esse funcionário")
    }
    const data = await res.json()
    alert("Funcionário demitido")
    const select = document.getElementById("select-employee")

    if (select !== null) {
        select.innerHTML = ""
        const allEmployees = await employeesOutOfWork()
        allEmployees.forEach(employee => {
            const option = document.createElement("option")
            option.value = employee.id
            option.textContent = `${employee.id} - ${employee.name}`
            select.appendChild(option)
        })
    }

    const ulContainer = document.getElementById("employee-list-container")
    const oldUl = document.querySelector(".department-employees-list")
    const currentUl = await renderEmployeeList(departmentID, companyName)
    ulContainer.replaceChild(currentUl, oldUl)
    await renderEmployeeSection()
    return data
}
async function companiesReadById(companyID) {
    if (companyID !== null) {
        const res = await fetch(`${endpoints.companiesReadById}${companyID}`, { headers: getAuthHeader() })
        const data = await res.json()
        return await data
    } else {
        return
    }
}

async function departmentsReadById(departmentID) {
    const res = await fetch(`${endpoints.departmentsReadById}${departmentID}`, { headers: getAuthHeader() })
    const data = await res.json()
    return data
}
//renders
export async function createNewDepartmentModal() {
    const modal = document.createElement("dialog")
    modal.classList.add("modal-dash")
    modal.id = "new-department-modal"

    const closeBtn = document.createElement("div")
    closeBtn.classList.add("new-department__close-btn")
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.classList.add("new-department__content-container")

    const title = document.createElement("h2")
    title.classList.add("new-department__title", "font-poppins-700")
    title.textContent = "Criar Departamento"

    const form = document.createElement("form")
    form.classList.add("new-department__form")

    const nameLabel = document.createElement("label")
    nameLabel.classList.add("modal-label")
    nameLabel.htmlFor = "department-name-input"
    nameLabel.textContent = "Nome do departamento"

    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.name = "name"
    nameInput.id = "department-name-input"
    nameInput.placeholder = "Nome do departamento"

    const descriptionLabel = document.createElement("label")
    descriptionLabel.classList.add("modal-label")
    descriptionLabel.htmlFor = "department-description-input"
    descriptionLabel.textContent = "descrição do departamento"

    const descriptionInput = document.createElement("input")
    descriptionInput.type = "text"
    descriptionInput.name = "description"
    descriptionInput.id = "department-description-input"
    descriptionInput.placeholder = "Descrição do departamento"

    const select = document.createElement("select")
    select.id = "company-to-department"
    const initialOption = document.createElement("option")
    initialOption.value = "initial"
    initialOption.classList.add("initial-select")
    initialOption.selected = true
    initialOption.disabled = true
    initialOption.textContent = "Selecionar empresa"
    select.appendChild(initialOption)

    const companies = await getAllCompanies()
    companies.forEach(company => {
        const option = document.createElement("option")
        option.value = company.id
        option.textContent = company.name
        select.appendChild(option)

    })



    const btn = document.createElement("button")
    btn.classList.add("title1-inter-700", "button", "button-action-1")
    btn.id = "new-department-btn"
    btn.textContent = "Criar"
    let empresaSelecionada = null
    select.addEventListener("change", () => {
        const selectedOption = select.options[select.selectedIndex]
        empresaSelecionada = selectedOption.textContent
    })

    btn.addEventListener("click", (e) => handleInsertDepartments(e, empresaSelecionada))

    form.appendChild(nameLabel)
    form.appendChild(nameInput)
    form.appendChild(descriptionLabel)
    form.appendChild(descriptionInput)
    form.appendChild(select)
    form.appendChild(btn)

    contentContainer.appendChild(title)
    contentContainer.appendChild(form)

    modal.appendChild(closeBtn)
    modal.appendChild(contentContainer)

    document.body.appendChild(modal)
    modal.showModal()

}
export async function renderDepartments(companyID, companyName) {
    const ulDepartments = document.getElementById("departments-list")
    const ulContainer = document.getElementById("departments-container")
    const emptyDisplay = document.getElementById('empty-display')
    const emptyText = document.getElementById("empty-text")

    const departments = await departmentsReadByCompany(companyID)
    if (departments.length > 0) {
        ulContainer.classList.remove("hide")
        emptyDisplay.style.display = "none"
    } else {
        ulContainer.classList.add("hide")
        emptyDisplay.style.display = "flex"
        emptyText.textContent = `A empresa ${companyName} não possuí departamentos`
    }
    ulDepartments.innerHTML = ""


    departments.forEach(department => {

        const li = document.createElement("li")
        li.classList.add("departments__item")
        li.id = department.id
        const divInfo = document.createElement("div")
        divInfo.classList.add("department__info-container")

        const h3 = document.createElement("h3")
        h3.classList.add("department__name")
        h3.classList.add("title2-inter-700")
        h3.textContent = department.name

        const p = document.createElement("p")
        p.classList.add("department__description")
        p.classList.add("text-4-inter")
        p.textContent = department.description

        const span = document.createElement("span")
        span.classList.add("department__company-name")
        span.classList.add("text-4-inter")
        span.textContent = companyName

        divInfo.appendChild(h3)
        divInfo.appendChild(p)
        divInfo.appendChild(span)

        const divIcons = document.createElement("div")
        divIcons.classList.add("department_icons-container")

        const divRead = document.createElement("div")
        divRead.classList.add("icon")
        divRead.classList.add("department-read-icon")
        divRead.addEventListener("click", () => {

            createReadDepartmentModal(companyName, department.id, department.name, department.description)
        })
        const divEdit = document.createElement("div")
        divEdit.classList.add("icon")
        divEdit.classList.add("department-edit-icon")
        divEdit.addEventListener("click", () => {
            createEditDepartmentModal(department.id, department.description, companyID, companyName)
        })


        const divDelete = document.createElement("div")
        divDelete.classList.add("icon")
        divDelete.classList.add("department-delete-icon")
        divDelete.addEventListener("click", () => createDeleteDepartmentModal(companyID, department.name, companyName, department.id))

        divIcons.appendChild(divRead)
        divIcons.appendChild(divEdit)
        divIcons.appendChild(divDelete)

        li.appendChild(divInfo)
        li.appendChild(divIcons)

        ulDepartments.appendChild(li)
    })
}
async function createDeleteDepartmentModal(companyID, departmentName, companyName, departmentId) {

    const modal = document.createElement("dialog")
    modal.classList.add("modal-dash")
    modal.id = "delete-department-modal"

    const closeBtn = document.createElement("div")
    closeBtn.classList.add("delete-department__close-btn")
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.classList.add("delete-department__content-container")

    const title = document.createElement("span")
    title.classList.add("delete-department__title")
    title.classList.add("font-poppins-700")
    title.textContent = `Realmente deseja remover o Departamento ${departmentName} e demitir seus funcionários?`

    const button = document.createElement("button")
    button.classList.add("button")
    button.classList.add("button-action-2")
    button.textContent = "Remover"
    const department = await departmentsReadById(departmentId)
    const departmentEmployees = department.employees
    button.addEventListener("click", (e) => handleDeleteDepartment(e, departmentEmployees, departmentId, companyID, companyName))

    contentContainer.appendChild(title)
    contentContainer.appendChild(button)

    modal.appendChild(closeBtn)
    modal.appendChild(contentContainer)

    document.body.appendChild(modal)
    modal.showModal()
}
export async function renderEmployeeSection() {
    const employeesList = document.querySelector('.employees__list')
    if (employeesList != null) {
        const employees = await employeesReadAll()
        const companies = await getAllCompanies()

        employeesList.innerHTML = ""
        if (employees.length === 0) {
            const emptyDisplay = document.getElementById("empty-display-employees")
            emptyDisplay.style.display = "flex"
            const containerEmployees = document.getElementById("employees-container")
            containerEmployees.style.display = "none"
        } else {
            const emptyDisplay = document.getElementById("empty-display-employees")
            emptyDisplay.style.display = "none"
            const containerEmployees = document.getElementById("employees-container")
            containerEmployees.style.display = "block"
        }
        if (employees.length > 0) {

            employees.forEach(async employee => {
                const employeeItem = document.createElement('li')
                employeeItem.classList.add('employees__item')

                const employeeInfoContainer = document.createElement('div')
                employeeInfoContainer.classList.add('employee__info-container')

                const employeeName = document.createElement('h3')
                employeeName.classList.add('employee__name', 'title2-inter-700')
                employeeName.textContent = employee.name

                employeeInfoContainer.appendChild(employeeName)

                const employeeCompanyID = employee.company_id
                const company = await companiesReadById(employeeCompanyID)
                const employeeCompanyName = document.createElement('span')
                employeeCompanyName.classList.add('employee__company-name', 'text-4-inter')
                if (employeeCompanyID !== null) {
                    employeeCompanyName.textContent = company.name
                } else {
                    employeeCompanyName.textContent = ""
                }

                employeeInfoContainer.appendChild(employeeCompanyName)

                const employeeIconsContainer = document.createElement('div')
                employeeIconsContainer.classList.add('employee_icons-container')

                const employeeEditIcon = document.createElement('div')
                employeeEditIcon.classList.add('icon', 'employee-edit-icon')
                employeeEditIcon.addEventListener("click", async () => {
                    await createEditEmployeeModal(employee.id, employee.name, employee.email)
                })

                const employeeDeleteIcon = document.createElement('div')
                employeeDeleteIcon.classList.add('icon', 'employee-delete-icon')
                employeeDeleteIcon.addEventListener("click", async () => {
                    await createDeleteEmployeeModal(employee.id, employee.name)
                })

                employeeIconsContainer.appendChild(employeeEditIcon)
                employeeIconsContainer.appendChild(employeeDeleteIcon)

                employeeItem.appendChild(employeeInfoContainer)
                employeeItem.appendChild(employeeIconsContainer)

                employeesList.appendChild(employeeItem)
            })
        }
    }
}
async function renderEmployeeList(departmentId, companyName) {
    const employeeList = document.createElement("ul")
    employeeList.className = "department-employees-list"

    const departmentInfo = await departmentsReadById(departmentId)

    const departmentsEmployees = await departmentInfo.employees
    departmentsEmployees.forEach(employee => {

        const employeeItem = document.createElement("li")
        employeeItem.className = "department-employee-item"
        employeeList.appendChild(employeeItem)

        const employeeName = document.createElement("h2")
        employeeName.className = "title2-inter-700"
        employeeName.textContent = employee.name
        employeeItem.appendChild(employeeName)

        const companyNameSpan = document.createElement("span")
        companyNameSpan.className = "text-4-inter"
        companyNameSpan.textContent = companyName
        employeeItem.appendChild(companyNameSpan)

        const dismissBtn = document.createElement("button")
        dismissBtn.className = "button button-action-2-outlined dismiss-buttons"
        dismissBtn.textContent = "Desligar"
        employeeItem.appendChild(dismissBtn)
        dismissBtn.addEventListener("click", (e) => {
            handleDismissEmployee(e, employee.id, employee.name, departmentId, companyName)
        })
    })
    return employeeList
}
async function createReadDepartmentModal(companyName, departmentId, departmentName, departmentDescription) {

    const modal = document.createElement("dialog")
    modal.className = "modal-dash"
    modal.id = "read-department-modal"

    const closeBtn = document.createElement("div")
    closeBtn.className = "read-department__close-btn"
    modal.appendChild(closeBtn)
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.className = "read-department__content-container"
    contentContainer.id = "employee-list-container"
    modal.appendChild(contentContainer)

    const title = document.createElement("h2")
    title.className = "read-department__title font-poppins-700"
    title.textContent = departmentName
    contentContainer.appendChild(title)

    const description = document.createElement("h3")
    description.className = "read-department__description font-poppins-700-20"
    description.textContent = departmentDescription
    contentContainer.appendChild(description)

    const selectContainer = document.createElement("div")
    selectContainer.className = "select-employee-container"
    contentContainer.appendChild(selectContainer)

    const select = document.createElement("select")
    select.id = "select-employee"

    const option = document.createElement("option")
    option.value = "initial"
    option.selected = true
    option.disabled = true
    option.textContent = "Selecionar usuário"
    select.appendChild(option)

    const allEmployees = await employeesOutOfWork()
    allEmployees.forEach(employee => {
        const option = document.createElement("option")
        option.value = employee.id
        option.textContent = `${employee.id} - ${employee.name}`
        select.appendChild(option)
    })

    selectContainer.appendChild(select)

    const hireBtn = document.createElement("button")
    hireBtn.className = "title1-inter-700 button button-action-1"
    hireBtn.id = "hire-employee-btn"
    hireBtn.textContent = "Contratar"
    selectContainer.appendChild(hireBtn)
    hireBtn.addEventListener("click", (e) => {
        handleHireEmployee(e, select.value, departmentId, companyName)
    })

    const employeeList = document.createElement("ul")
    employeeList.className = "department-employees-list"

    const departmentInfo = await departmentsReadById(departmentId)

    const departmentsEmployees = departmentInfo.employees

    departmentsEmployees.forEach(async employee => {

        const employeeItem = document.createElement("li")
        employeeItem.className = "department-employee-item"
        employeeList.appendChild(employeeItem)

        const employeeName = document.createElement("h2")
        employeeName.className = "title2-inter-700"
        employeeName.textContent = employee.name
        employeeItem.appendChild(employeeName)

        const companyNameSpan = document.createElement("span")
        companyNameSpan.className = "text-4-inter"
        companyNameSpan.textContent = companyName
        employeeItem.appendChild(companyNameSpan)

        const dismissBtn = document.createElement("button")
        dismissBtn.className = "button button-action-2-outlined dismiss-buttons"
        dismissBtn.textContent = "Desligar"
        employeeItem.appendChild(dismissBtn)
        dismissBtn.addEventListener("click", (e) => {
            handleDismissEmployee(e, employee.id, employee.name, departmentId, companyName)
        })
    })
    contentContainer.appendChild(employeeList)

    document.body.appendChild(modal)

    modal.showModal()
}
function createEditDepartmentModal(departmentID, departmentDescription, companyID, companyName) {
    const modal = document.createElement("dialog")
    modal.classList.add("modal-dash")
    modal.id = "edit-department-modal"

    const closeBtn = document.createElement("div")
    closeBtn.classList.add("edit-department__close-btn")
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.classList.add("edit-department__content-container")

    const title = document.createElement("h2")
    title.classList.add("edit-department__title", "font-poppins-700")
    title.textContent = "Editar Departamento"

    const form = document.createElement("form")
    form.classList.add("edit-department__form")

    const descriptionLabel = document.createElement("label")
    descriptionLabel.classList.add("modal-label")
    descriptionLabel.setAttribute("for", "description-to-edit")
    descriptionLabel.textContent = "Descrição do departamento"

    const textarea = document.createElement("textarea")
    textarea.name = "description-to-edit"
    textarea.id = "edit-department-textarea"
    textarea.cols = "30"
    textarea.rows = "10"
    textarea.value = departmentDescription

    const button = document.createElement("button")
    button.classList.add("title1-inter-700", "button", "button-action-1")
    button.id = "edit-department-btn"
    button.textContent = "Salvar"
    button.addEventListener('click', (e) => {
        e.preventDefault()
        const departmentNewDescription = textarea.value
        departmentsUpdate(departmentID, departmentNewDescription, companyID, companyName)
    })


    form.append(descriptionLabel, textarea, button)
    contentContainer.append(title, form)
    modal.append(closeBtn, contentContainer)

    document.body.appendChild(modal)
    modal.showModal()

}


async function createEditEmployeeModal(employeeID, employeeName, employeeEmail) {
    const modal = document.createElement("dialog")
    modal.classList.add("modal-dash")
    modal.id = "edit-employee-modal"

    const closeBtn = document.createElement("div")
    closeBtn.classList.add("edit-department__close-btn")
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.classList.add("edit-employee__content-container")

    const title = document.createElement("h2")
    title.classList.add("edit-employee__title", "font-poppins-700")
    title.textContent = "Editar Usuário"

    const form = document.createElement("form")
    form.classList.add("edit-employee__form")

    const nameLabel = document.createElement("label")
    nameLabel.classList.add("modal-label")
    nameLabel.setAttribute("for", "name-to-edit")
    nameLabel.textContent = "editar nome usuário"

    const inputName = document.createElement("input")
    inputName.name = "name-to-edit"
    inputName.id = "edit-employee-name-inputName"
    inputName.value = employeeName

    const emailLabel = document.createElement("label")
    emailLabel.classList.add("modal-label")
    emailLabel.setAttribute("for", "email-to-edit")
    emailLabel.textContent = "editar nome usuário"

    const inputEmail = document.createElement("input")
    inputEmail.email = "email-to-edit"
    inputEmail.id = "edit-employee-email"
    inputEmail.value = employeeEmail

    const button = document.createElement("button")
    button.classList.add("title1-inter-700", "button", "button-action-1")
    button.id = "edit-employee-btn"
    button.textContent = "Salvar"
    button.addEventListener('click', async (e) => {
        e.preventDefault()
        const newValues = {
            "name": inputName.value,
            "email": inputEmail.value
        }

        await employeesUpdateEmployee(employeeID, newValues)
    })


    form.append(nameLabel, inputName, inputEmail, button)
    contentContainer.append(title, form)
    modal.append(closeBtn, contentContainer)

    document.body.appendChild(modal)
    modal.showModal()

}
async function createDeleteEmployeeModal(employeeID, employeeName) {

    const modal = document.createElement("dialog")
    modal.classList.add("modal-dash")
    modal.id = "delete-employee-modal"

    const closeBtn = document.createElement("div")
    closeBtn.classList.add("delete-employee__close-btn")
    closeBtn.addEventListener("click", () => {
        modal.close()
        modal.remove()
    })

    const contentContainer = document.createElement("div")
    contentContainer.classList.add("delete-employee__content-container")

    const title = document.createElement("span")
    title.classList.add("delete-employee__title")
    title.classList.add("font-poppins-700")
    title.textContent = `Realmente deseja remover o usuário ${employeeName}?`

    const button = document.createElement("button")
    button.classList.add("button")
    button.classList.add("button-action-2")
    button.textContent = "Remover"
    button.addEventListener("click", async () => await employeesDeleteEmployee(employeeID))

    contentContainer.appendChild(title)
    contentContainer.appendChild(button)

    modal.appendChild(closeBtn)
    modal.appendChild(contentContainer)

    document.body.appendChild(modal)
    modal.showModal()
}
