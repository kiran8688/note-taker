
var a = document

a.all[10].textContent = 'Note-Taker'

let submitBtn = a.querySelector('#button')
submitBtn.addEventListener('click', e => {

    var nameofTask = a.querySelector('#note-task').value
    var timeofTask = a.querySelector('#note-time').value
    var checkedValue = a.querySelector('#check').checked

    const center = a.getElementById('center-cont')

    if (nameofTask === '') {

        alert("Enter name of the task");

    } else if (timeofTask === "") {

        alert('Enter time of the task')
    } else if(nameofTask === ''&& timeofTask === '')
    {
        alert('Make sure the Name of the task & Time of the Task is entered')

    }else{

        var h1 = a.createElement('h1')
        const h3 = a.createElement('h3')
        const cardCol1Div = a.createElement('div')
        const cardCol2Div = a.createElement('div')
        const cardRowDiv = a.createElement('div')
        const cardInColorBtn = a.createElement('div')
        const closeBtn = a.createElement('input')
        const divCloseBtn = a.createElement('div')
        const cardContRow = a.createElement('div')

        cardContRow.setAttribute('class', 'container row mb-2')
        cardContRow.appendChild(cardInColorBtn)
        cardContRow.appendChild(divCloseBtn)

        divCloseBtn.setAttribute('class', 'ps-5 pe-0 pb-3 pt-5 col')
        divCloseBtn.appendChild(closeBtn)

        closeBtn.setAttribute('class', 'btn-close float-start')
        closeBtn.setAttribute('type', 'button')
        closeBtn.setAttribute('aria-label', 'close')

        cardInColorBtn.setAttribute('class', 'container-fluid ps-4 pe-0 pt-0 pb-0 border-black col')
        cardInColorBtn.appendChild(cardRowDiv)

        cardRowDiv.setAttribute('class', 'input-group-text text-black row')
        cardRowDiv.appendChild(cardCol1Div)
        cardRowDiv.appendChild(cardCol2Div)

        cardCol2Div.setAttribute('class', 'pb-0 pt-4 col')
        cardCol2Div.appendChild(h3)

        cardCol1Div.setAttribute('class', 'pb-2 pt-4  col')
        cardCol1Div.appendChild(h1)

        h3.setAttribute('class', 'text-secondary')
        h3.textContent = timeofTask

        h1.setAttribute('class', 'text-black')
        h1.textContent = nameofTask

        setTimeout(() => { checkStatus(cardContRow) })

        center.appendChild(cardContRow)

        const deleteButton = () => {
            cardContRow.parentNode.removeChild(cardContRow)
        }
        closeBtn.addEventListener('click', deleteButton)

        const checkStatus = (checked) => {

            if (checked) {
                cardInColorBtn.setAttribute('class', ' btn-success container-fluid ps-4 pe-0 pt-0 pb-0 border-black col')

            }
            else {
                cardInColorBtn.setAttribute('class', ' btn-danger container-fluid ps-4 pe-0 pt-0 pb-0 border-black col')

            }
            checkStatus(checkedValue)
        }
    }

    document.getElementById('note-task').value = " "; document.getElementById('note-time').value = " "; document.getElementById('check').checked = false;
})
