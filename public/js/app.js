//console.log("Client side javascript file");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//ad a listener
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value;
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast.placename + ' Temperature is '+data.forecast.temperature+' Degrees.'+ 
            'There is '+data.forecast.rainchance+'% chance of rain. Humidity is '+data.forecast.humidity;
        }
    })
});
   // console.log(location)
})