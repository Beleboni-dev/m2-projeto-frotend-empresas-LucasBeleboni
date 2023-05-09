import { createNewDepartmentModal, renderDepartments, getAllCompanies, renderEmployeeSection, handleLogout } from "./handleAdmin.js"
checkAuth()


function checkAuth() {
  const isAdm = localStorage.getItem("isAdm")
  if (!isAdm || isAdm !== 'true') {
    setTimeout(() => {
      location.replace('./login.html');
    }, 0)
  } else {
    document.body.style.display = "block"
  }
}


const logoutButton = document.getElementById("logout-btn")
if (logoutButton !== null) {
  logoutButton.addEventListener("click", handleLogout)
}

companiesOptions()
renderDepartments()
initDepartmentCreate()
renderEmployeeSection()

async function companiesOptions() {
  const companies = await getAllCompanies()
  const select = document.getElementById("select-companies")
  if (select != null) {

    companies.forEach(company => {
      const option = document.createElement("option")
      option.value = company.id
      option.textContent = company.name
      select.appendChild(option)
    })
    select.addEventListener("change", () => {
      const selectedOption = select.options[select.selectedIndex]
      renderDepartments(select.value, selectedOption.textContent)
    })
  }
}
function initDepartmentCreate() {
  const button = document.querySelector(".departments__header-create")
  if (button != null) {

    button.addEventListener("click", () => {
      createNewDepartmentModal()
    })
  }
}






