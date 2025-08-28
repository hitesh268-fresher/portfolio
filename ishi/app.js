const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"

const dropdown= document.querySelectorAll(".dropdown select");
const btn =document.querySelector("button");
const formCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load" , () => {
  updateExchangeRate();
})



for(let select of dropdown){
  for (currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name === "form" && currCode === "USD"){
      newOption.selected="selected";
    }else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
  })
}




const updateFlag = (element) => {
  let currCode =element.value;
  let countryCode= countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img =element.parentElement.querySelector("img");
  img.src =newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal =amount.value;
  if(amtVal === ""|| amtVal < 1){
    amtVal=1;
    amount.value="1";
  }
  const URL =`https://api.frankfurter.dev/v1/2023-01-04?base=${formCurr.value}&symbols=${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  console.log(rate);

  let finalVal = amtVal * rate;
  msg.innerText=`${amtVal} ${formCurr.value} = ${finalVal} ${toCurr.value}`;
}

btn.addEventListener("click",  (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
