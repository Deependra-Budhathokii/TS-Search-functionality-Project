# Typescript Project with Github API and Search Functionality


->While importing js in Html, include  attr `type="module"`, will be helpful  


`index.ts`

// `as HTMLInputElement` in following code  is called `type assertion`  to tell ts that the result of `document.querySelector("#user")` should be treated as an `HTMLInputElement`

```
const getUsername = document.querySelector("#user") as HTMLInputElement

```


### <span style="color:yellow;">Api links</span>
https://api.github.com/
https://api.github.com/users

https://api.github.com/users/mojombo  // details of individual user

login.value  ===   mojombo 




Note : API is in the form `Array of an Object` 

```
myCustomFetcher<UserData[]>(url, {}); 

Here  generic :  <UserData[]>  tells thay it is and array of objects
```



### using of `for of loop` to get array value
-  alterntively, we can use `foreach loop` `map` etc
- array value is in our case `objects`,
- when we apply `for of loop`, we get value i.e object
- when we console object i.e `singleUser`, we get in format `[object object]`, 
- it means now we can access `objects value`  by `singleUser.propertiesname`


```
 for(const singleUser of userInfo){
            showResultUI(singleUser)
            console.log(singleUser)  // It shows [object object]
       }
```



### Very summarize points
- In APi , we have data in format `Array of objects` i.e [{},{}.{}.{},{}]
- first we define `object interface` name `UserData`
- In fetching process, we pass type as `UserData[]` saying array of object `data type`
- when we fetch, then apply for loop, we get value of array i.e `just objects`
- then while using it in DOM, we gain pass the object in type `UserData`



- We make those `function async` which `returns an promise`




## some Element method to play with DOM

### Element: insertAdjacentHTML() method

```
syntax

insertAdjacentHTML(position, text)   // see its position in video and text contain pure html part
```

main_container.insertAdjacentHTML("beforeend", `<div class= "card">....rest html</div>`)




## SEARCH FUNCTIONALITY

-> we make those func a `async` which returns a `promise` so in Events,  we make `anonymous function` `asyn func` as it `returns a promise`




Note :

- step-1: Lets create an Event i.e when an Event onsubmit triggers, a anony func will be called where we provide all search functionality logic.

```
formsubmit.addEventListener('submit', async()=>{})
```

*Note: search functionality triggers only when the onsubmit events occurs, by automatic, when we type anything  on input, `onsubmit` events triggers*


- step2: we saved user input after `converting it into lowercase` in `var`-> `searchTerm`
```
const searchTerm = getUsername.value.toLowerCase()
```


*Now we write rest of the code in `try catch block`*

- step3: we call our resuable`(already made)` `myCustomFetcher func` which fetch api data and return array of objects. We assign those return promise data in `var`-> `allUserData`

```
const allUserData = myCustomFetcher(url, {})
```

- step4 : Now user searched content is stored in a new array

- step4 : Now user searched content that matched with user name i.e `user.login has a name` is stored in a var -> `matchingUsers`

```
const matchingUsers = allUserData.filter((user)=>{
    return user.login.toLowerCase().includes(searchTerm)
})
```

*Note: `includes method` and above logic is a main logic *   
      
*Note:if a single word matches , we get data in matchingUser var*


- step 5 : Its imp that while we are searching, we make our previous data empty

```
main_container.innerHTML = ""
```



- step6: if matchingUsers length is 0 then we make our main card empty of card and provide msg `No matching users found`    else  we show only `matchingusers` information 


```
if(matchingUsers.length===0){
    main_container.insertAdjacentHTML("beforeend", `<p>No matching users found</p>`)

} else{
    for(const singleUser of mathcingUsers){
        showResultUI(singleUser);
    }
}


```

In above code, The  `showResultUI(singleUser);` is `reused`, the only difference is it shows the `matchingUsers` `only`  
 - This func called the card with a matching users only



Lets analyze  a comparison of above  `showResult function` for performing two func:
- one is displaying all api data, i.e by default
- another is displaying only a `matching api data`

The diff is :



```
---
1st 
---

// For displaying all data
for(const singleUser of userInfo){
     showResultUI(singleUser)
}

Here userInfo contains the all fetched api data in js object format


---
2nd 
---

for(const singleUser of matchingUser){
    showResultUI(singleUser)
}

Here  matchingUser contains the fetched api data of  only the matched user. 

```



## <span style="color:yellow">Lets undertand How we work while fetching api using promise, async await etc</span>

- First we create `fetching asyn function`, inside which we perform fetching api, in orders which returns `promise`

```
async function fetchingFunc(url, options?){
    const repsonse = await fetch(url, options)
    const data = await response.json()

    return data
} 

// calling func
const userInfo = fetchingFunc(url, options?);


// userInfo contains above returned data
```

Here, Basically  `fetchingFunc returns promise` i.e data in `Js object format` which is previously on `JSON/string` format in api links.  *Although visually they look similar before and after*

Now we have api data in js obj format whether may in form :
- `array of objects` i.e  [{},{},{}]  or
-  `Array of array` i.e [[],[],[]]


Now Here comes the usecases of `methods` like `for of` `for each` `map` which extract the `value` of js format `data`. 
e.g lets take `for of method`

```
for(const user of userInfo){
   
}
```
For case `array of object`  
Here , now `user` becomes a `general obj name` for all the objects i.e  {}{}{}{} . Basically for of `Iterate` over all the value of an array and provide value of array. `In this case value of our array is objects` 
 - Now though `user` , we can target Iterate value of each object like  `user.name` `user.img` `user.id` etc
- we can pass the user for card, etc either through functions etc

- To simplify the object calling process, we can use object destructure like

 const{name,img,id} = user

here, name, img, id should be exactly matched with properties mentioned in api




For case `array of array`   
Here , now `user` becomes a `general array name` for all the array values i.e  [][][][] . Basically `for of` `Iterate` over all the value of an array and provide value of array. `In this case value of our array is arrays` 

- Now though `user` , we can target Iterate value of each arrays like  `user[0]` `user[1]` `user[2]` etc

-- To simplify the array value calling process, we can use array destructure like
 const[name,img,id] = user

 here , we can assign any variable name like name, img, id etc







  
