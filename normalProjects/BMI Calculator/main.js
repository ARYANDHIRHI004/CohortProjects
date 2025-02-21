const Name = document.getElementById("Name")
const age = document.getElementById("Age")
const weight = document.getElementById("Weight")
const hight = document.getElementById("Hight")
const result = document.getElementById("Result")
const greeting = document.getElementsByClassName("Greeting")[0]
const calculate = document.getElementsByClassName("Calculate")[0]


calculate.addEventListener("click", (e) => {
    if(Name.value === ''){ 
        greeting.innerHTML = 'Please enter details'      
    }
    else{
        greeting.innerHTML = `Hi ${Name.value}`
    }

    let bmi = Number(weight.value)/(Number(hight.value)/100)**2
    console.log(bmi);
    
    if(bmi <= 18.5){
        result.innerHTML = `${bmi.toFixed(2)} Underweight`
    }
    else if(bmi > 18.5 && bmi <= 25){
        result.innerHTML = `${bmi.toFixed(2)} Normal`
    }
    else if(bmi > 25 && bmi <= 40){
        result.innerHTML = `${bmi.toFixed(2)} Overweight`
    }
    else if(bmi > 40){
        result.innerHTML = `${bmi.toFixed(2)} Obesity`
    }

    Name.value = null
    age.value = null
    weight.value = null
    hight.value = null
})










