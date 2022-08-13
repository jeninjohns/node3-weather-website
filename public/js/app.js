const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = 'Loading ...'

    const location = search.value

    console.log(location)
    weatherURL ='/weather?address='+ encodeURIComponent(location)

    fetch(weatherURL).then((response) => {
        
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageTwo.textContent = data.error
            }

            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
})
})



