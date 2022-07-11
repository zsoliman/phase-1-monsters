// 1. X
// When the page loads, show the first 50 monsters. Each monster's name, age, and
// description should be shown.

// fetch request => GET name, age and description from the API
// display that information on the DOM
// in the <div> with id='monster-container', make a new <div> that contains an <h2> for the name, an <h4> for the age, and a <p> for the descriptopn


document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = 'http://localhost:3000/monsters'
    const monsterDiv = document.getElementById('monster-container')

    const postNewMonster = async (body) => {
        let req = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        let res = await req.json()
        return res
    }

    //2.
    // Above your list of monsters, you should have a form to create a new monster.
    // You should have fields for name, age, and description, and a 'Create Monster
    // Button'. When you click the button, the monster should be added to the list
    // and saved in the API.

    const newMonster = () => {

        const form = document.createElement('form')
        form.id = 'form'
        const inputName = document.createElement('input')
        inputName.id = 'name'
        inputName.placeholder = 'name...'
        const inputAge = document.createElement('input')
        inputAge.id = 'age'
        inputAge.placeholder = 'age...'
        const inputDescription = document.createElement('input')
        inputDescription.id = 'description'
        inputDescription.placeholder = 'description'
        const submitBtn = document.createElement('input')
        submitBtn.type = 'submit'
        submitBtn.textContent = 'Create Your Monstr!'

        form.append(inputName)
        form.append(inputAge)
        form.append(inputDescription)
        form.append(submitBtn)

        const topDiv = document.getElementById('create-monster')
        topDiv.append(form)

        form.addEventListener('submit', (event) => {

            event.preventDefault();
            const monsterObj = {
                name: event.target.name.value,
                age: event.target.age.value,
                description: event.target.description.value
            }

            postNewMonster(monsterObj);

        })

    }

    newMonster();



    const fetchData = async () => {
        let req = await fetch(`${baseUrl}?_limit=50&_page=1`)
        let res = await req.json()
        return res
    }

    const createList = async () => {
        let newData = await fetchData();
        newData.forEach(element => {
            const div = document.createElement('div')
            const h2 = document.createElement('h2')
            h2.id = 'name'
            const h4 = document.createElement('h4')
            h4.id = 'age'
            const p = document.createElement('p')
            p.id = 'description'

            const name = document.getElementById('name')
            const age = document.getElementById('age')
            const description = document.getElementById('description')

            h2.textContent = `Name: ${element.name}`
            h4.textContent = `Age: ${element.age}`
            p.textContent = `Bio: ${element.description}`

            div.append(h2)
            div.append(h4)
            div.append(p)
            monsterDiv.append(div)
        });
    }

    createList();


})

// - At the end of the list of monsters, show a button. When clicked, the button
// should load the next 50 monsters and show them.
