const getUsername = document.querySelector("#user") as HTMLInputElement
const formSubmit = document.querySelector("#form") as HTMLInputElement
const main_container = document.querySelector(".main_container") as HTMLElement

// Lets define the contract of an object

interface UserData {
    id: number,
    login: string;
    avatar_url: string;
    location: string;
    url: string;

}

// Func call on page load

// Func define
// reusable func
async function myCustomFetcher<T>(url:string, options?:RequestInit):Promise<T>{
   const response = await fetch(url, options);
   
   if(!response.ok){
    throw new Error(`Network response was not ok - status  : ${response.status}`);
   }

   const data = await response.json()
   console.log(data)
   return data;
}

// Let display the Card UI

const showResultUI = (singleUser: UserData) =>{

    const{login, avatar_url,url} = singleUser;

    main_container.insertAdjacentHTML("beforeend", `
    <div class='card'>
    <img src = ${avatar_url} alt=${login} />
    <hr/>

    <div class="card-footer">
    <img src = ${avatar_url} alt=${login} />
    <a href="${url}">Github</a>


    </div>
    </div>

    `)

}

// Func define
function fetchUserData(url : string){
    // func call
    myCustomFetcher<UserData[]>(url, {}).then((userInfo)=>{
       for(const singleUser of userInfo){
            showResultUI(singleUser)
            console.log(singleUser)  // It shows [object object]
       }
    })
}




// default func call
fetchUserData("https://api.github.com/users")




// Lets work on Search Functionality

 
formSubmit.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase()
    

    try {

        const url = "https://api.github.com/users"
        const allUserData = await myCustomFetcher<UserData[]>(url,{})
    
        const matchingData = allUserData.filter((user:UserData)=>{
            return user.login.toLowerCase().includes(searchTerm)
        })

        main_container.innerHTML= ""  // make the container empty while searching

        if(matchingData.length===0){
            main_container.insertAdjacentHTML("beforeend", `
            <p class="empty">No matching name found !</p>
            `)
        } else{
            for(const singleUser of matchingData){
                showResultUI(singleUser)
            }
        }

        
    } catch (error) {
        console.log(error)
    }

    

})



