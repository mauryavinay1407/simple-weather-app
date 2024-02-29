const temperature=document.querySelector(".temperature");
const cityName=document.querySelector(".weather1 p");
const timeDate=document.querySelector(".weather1 span");
const logo=document.querySelector(".weather2 p img");
const condition=document.querySelector(".weather2 span");
const mybtn=document.querySelector("button");
const inPut=document.getElementById("searchbar");
const form=document.querySelector("form");


form.addEventListener("submit",search);

let target="Ghaziabad";

const fetchData= async(target)=>{
    try{
       const url=`https://api.weatherapi.com/v1/current.json?key= ${YOUR_API_KEY} &q=${target}`;
       const data=await fetch(url); 
       const value=await data.json();

       const {
        location:
             {name,localtime},
        current: {
            temp_c,
            condition: {icon ,text}
                 }
             }=value;
   
        updateDOM(name,localtime,temp_c,icon,text); 

    } catch(error){
      alert("Location not found");
    }
}

function updateDOM(name,time,temp,icon,text)
{
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    // temp=temp deg&;
    const exactDay = getDayFullName(new Date(exactDate).getDay());
    timeDate.innerText=`${exactTime} ${exactDate} ${exactDay}`;
   
    cityName.innerText=name;
    temperature.innerText=`${temp}°`;
    condition.innerText=text;
    logo.src=icon;

}
fetchData(target);

function search(e){
    e.preventDefault();

    target=inPut.value;

    fetchData(target);
}

 function getDayFullName(num)
 {
    switch(num)
    {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't know";
    }
 }


