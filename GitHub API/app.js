const githubForm=document.getElementById("github-form")
const nameInput=document.getElementById("githubname")
const clearLastUsers=document.getElementById("clear-last-users")
const lastUsers=document.getElementById("last-users")
const github=new Github()
const ui=new UI()
eventListener()

function eventListener(){
    githubForm.addEventListener("submit",getData)
    clearLastUsers.addEventListener("click",clearAllSearched)
    document.addEventListener("DOMContentLoaded",getAllSearched)

}
function getData(e){
    let username=nameInput.value.trim()
    if(username===""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz")
    }
    else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.showError("Kullanıcı Bulunamadı")
            }
            else{
                ui.addSearchedUserToUI(username)
                Storage.addSearchedUserToStorage(username)
                ui.showRepoInfo(response.repo)
                ui.showUserInfo(response.user)
            }
        })
        .catch(err=>ui.showError(err))
    }
    ui.clearInput()
    e.preventDefault()
}
function clearAllSearched(){
    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage()
        ui.clearAllSearchedFromUI()
    }
}
function getAllSearched(){
    let users=Storage.getSearchedFromStorage()
    let result=""
    users.forEach(element => {
        result+=`<li class="list-group-item">${element}</li>`

    });
    lastUsers.innerHTML=result
}