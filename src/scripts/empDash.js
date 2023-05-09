const endpoints = {
    departmentsReadById: 'http://localhost:3333/departments/readById/',
    employeesProfile: 'http://localhost:3333/employees/profile'
}
checkAuthStatus()
employeesListRender()

 function checkAuthStatus () {  
    const isAuth = localStorage.getItem("auth")
    const isAdm = localStorage.getItem("isAdm")
    
    if (isAdm === 'true') {
      setTimeout(() => {
        location.replace('./adm-dashboard.html');
      }, 0)
    } else if(!isAuth){
        setTimeout(() => {
            location.replace('./login.html');
        }, 0)
    }else if(isAuth && isAdm === 'false'){
        setTimeout(() => {
            document.body.style.display = "block"
        }, 0)
    }
}

const logoutButton = document.getElementById("logout-btn")
if (logoutButton !== null) {
    logoutButton.addEventListener("click", handleLogout)
}
async function departmentsReadById(departmentID) {
    const res = await fetch(`${endpoints.departmentsReadById}${departmentID}`, { headers: getAuthHeader() })
    const data = await res.json()
    return data
}


function handleLogout() {
    window.location.href = "../../index.html"
    localStorage.clear()
}
function getAuthHeader() {
    const authToken = localStorage.getItem("auth");

    if (authToken) {
        return { Authorization: `Bearer ${authToken}` }
    } else {
        return
    }
}

async function renderEmployeeProfile() {
    const username = document.getElementById("user-box-username")
    const email = document.getElementById("user-box-email")

    const res = await fetch(endpoints.employeesProfile, { headers: getAuthHeader() })
    const data = await res.json()
    username.innerText = data.name
    email.innerText = data.email
    return data
}
async function employeesListRender() {

    const employeeData = await renderEmployeeProfile()
    if (employeeData.department_id === null) {
        return
    }
    const departmentData = await departmentsReadById(employeeData.department_id)
    const sectionTile = document.getElementById("company-department")
    sectionTile.textContent = `${departmentData.company.name} - ${departmentData.name}`


    const employeesList = document.getElementById('employees-list');
    if (departmentData.employees.length > 0) {
        const companyInfo = document.getElementById("company-info")
        companyInfo.classList.remove("hide")
        const emptyDisplay = document.getElementById("empty-display")
        emptyDisplay.classList.add("hide")
        const listContainer = document.getElementById("list-container")
        listContainer.classList.remove("hide")
        departmentData.employees.forEach(employee => {

            const li = document.createElement('li');
            li.setAttribute('class', 'employees__item');
            const h3 = document.createElement('h3');
            h3.setAttribute('class', 'employee-name font-poppins-700-20');
            h3.textContent = employee.name;
            li.appendChild(h3);
            employeesList.appendChild(li)
        })
    }

}
