
var a = document
// console.dir(a)

// console.log(a.all[11])
a.all[11].textContent = 'Note-Taker'

// console.log(a.all[30])
// a.all[30].setAttribute('id', 'button')
// console.log(a.all[30])

// a.querySelector('#note-task').addEventListener('keydown', e =>{
//     console.log(e)
// })

// a.querySelector('#note-time').addEventListener('keydown', e=>{
//     console.log(e)
// })

// console.log(a.querySelector('#check').addEventListener('click', e =>{
//     console.log(e)
// }))
// const submit = a.querySelector('#button').addEventListener('click', e => {
    
    // var enteredInfo = {nameofTask, timeofTask, checked}
    // console.log(enteredInfo)
    
    
  

    // var metaCheck = document.getElementById('check').addEventListener('change'{
    //     console.log(metaCheck) })
    
    // const textdiv2 = a.querySelector('#new-card-col2').value
    // const textdiv1 = a.querySelector('#new-card-col1').value
    // const textH1 = a.querySelector('#h1').value
    // const textH3 = a.querySelector('#h3').value

    // ------------------------------------------------------------------------------------------------------------        
    // console.log(a.querySelector('#button'))
    
    let submitBtn = a.querySelector('#button')
submitBtn.addEventListener('click', e => {

    

        // e.preventDefault()

            var nameofTask = a.querySelector('#note-task').value
            var timeofTask = a.querySelector('#note-time').value
            var checkedValue = a.querySelector('#check').checked

            // var submitedVal = {nameofTask, timeofTask, checked}

            const center = a.getElementById('center-cont')

            // var resetmytext () =>
           
            if(nameofTask === ''){

                alert("nothing to do");
                
            } else{

            

            // for (let i = 0; i < array.length; i++) {
            //     const element = array[i];
                
            // }
            // center.innerHTML 
            
        
        
            var  h1 = a.createElement('h1')
            const h3 = a.createElement('h3')
            const cardCol1Div = a.createElement('div')
            const cardCol2Div = a.createElement('div')
            const cardRowDiv = a.createElement('div')
            const cardInColorBtn = a.createElement('div')
            const closeBtn = a.createElement('input')
            const divCloseBtn = a.createElement('div')
            const cardContRow = a.createElement('div')
            // const break1 = a.createElement('br')
            
            
            
            cardContRow.setAttribute('class', 'container row mb-2')
            cardContRow.appendChild(cardInColorBtn) 
            cardContRow.appendChild(divCloseBtn) 
            // cardContRow.appendChild(break1)
             
            
            divCloseBtn.setAttribute('class', 'ps-5 pe-0 pb-3 pt-5 col')
            divCloseBtn.appendChild(closeBtn)
            
            closeBtn.setAttribute('class', 'btn-close float-start')
            closeBtn.setAttribute('type', 'button')
            closeBtn.setAttribute('aria-label', 'close')
            // closeBtn.textContent = checked

            cardInColorBtn.setAttribute('class', 'ps-4 pe-0 pt-0 pb-0 border-black col')
            cardInColorBtn.appendChild(cardRowDiv) 

            cardRowDiv.setAttribute('class', 'input-group-text text-black row')
            cardRowDiv.appendChild(cardCol1Div)
            cardRowDiv.appendChild(cardCol2Div)

            cardCol2Div.setAttribute('class', 'pb-0 pt-4 col' )
            cardCol2Div.appendChild(h3)

            cardCol1Div.setAttribute('class', 'pb-2 pt-4  col')
            cardCol1Div.appendChild(h1)

            h3.setAttribute('class', 'text-grey')
            h3.textContent = timeofTask

            h1.setAttribute('class', 'text-black')
            h1.textContent = nameofTask

            
            
            // cardContRow.appendChild(cardInColorBtn)
            // cardContRow.appendChild(divCloseBtn)
            // divCloseBtn.appendChild(closeBtn)
            // cardInColorBtn.appendChild(cardRowDiv)
            // cardRowDiv.appendChild(cardCol1Div)
            // cardRowDiv.appendChild(cardCol2Div)
            // cardCol1Div.appendChild(h1)
            // cardCol2Div.appendChild(h3)
            
            setTimeout(() => {checkStatus(cardContRow)})
            // setTimeout(() => {(nameofTask), 0 })
            // setTimeout(() => {(timeofTask), 0 })
            // setTimeout(() => {(checkedValue), 0 })
            center.appendChild(cardContRow)

            

            // document.getElementById('note-take').value = '';
            // document.getElementById('note-time').value = '';
            // document,getElementById('check').value = '';
            
            const deleteButton = () => {
                cardContRow.parentNode.removeChild(cardContRow)
                
                
            }
            closeBtn.addEventListener('click', deleteButton)
            
            const checkStatus = (checked) => {
                // console.log(status)
                
                if(checked)
                {
                    
                    cardInColorBtn.setAttribute('class',' btn-success ps-4 pe-0 pt-0 pb-0 border-black col')
                    
                }
                else{
                    cardInColorBtn.setAttribute( 'class',' btn-danger ps-4 pe-0 pt-0 pb-0 border-black col')
                    
                }
                checkStatus(checkedValue)
                
            }
            
        } 
        document.getElementById('note-task').value = " "; document.getElementById('note-time').value = " "; document.getElementById('check').checked = false;

        //    var resetTask = a.querySelector("#note-task").value = ""
        //    var resetTime = a.querySelector("#note-time").value = ""
        //    var resetcheck = a.querySelector('#check').checked = ""
        })   
        // // ----------------------------------------------------------------------------------------------------------
        // submitBtn.addEventListener('click', (e) => {
        //     submitBtn.addEventListener('click', resetfunction(){

        //         resetfunction = () =>{
        //             Reset()
        //         }
        //     })

        // })
        
        
        
        
        
        
            
        // a.querySelector('#card-col1').appendChild(h1)
        // console.log(h1)
        
        
        
        // a.querySelector('#card-col2').appendChild(h3)
        // console.log(h3)
        
        // a.querySelector('#div-closebtn').appendChild(closeBtn)
        // console.log(closeBtn)
        
        // a.querySelector('#card-row').appendChild(cardCol1Div)
        // console.log(cardCol1Div)
        
            // a.querySelector('#card-row').appendChild(cardCol2Div)
            // console.log(cardCol2Div)
            
            
        // const checked = a.querySelector('#check').checked
        // // console.log(checked)
        
        // checked = a.querySelector('#check').addEventListener('click', () => checkStatus(a.querySelector('#check').checked) )
    //     function checkStatus  (status) 
    //    {
           
    //            // console.log({status})
    
    // if(status)
    //    {
    
    //        cardInColorBtn.setAttribute('class', ' btn-success  ps-4 pe-0 pt-0 pb-0 border-black')
    
    //    }
    // else
    //    {
    
    //        cardInColorBtn.setAttribute('class', ' btn-danger ps-4 pe-0 pt-0 pb-0 border-black')
    
    //     }
    
    // }checked = a.querySelector('#check').addEventListener('click', () => checkStatus(a.querySelector('#check').checked) )
        
        // // const checkValue = a.querySelector('#card-incolorbtn')
        // // console.log(a.querySelector('#card-incolorbtn'))
        
        // document.querySelector('#button').addEventListener('click', e =>
        // {
            //     e.preventDefault()
            //     console.log(e)
            
            
    
    
    
    
    
    
    
    // console.log(enteredInfo)
    
    // console.log(checkedVal)
    
    
    // const  cardCol1H1 = a.createElement('h1')
    // cardCol1H1.setAttribute('id', 'card-col1-h1')
    // cardCol1H1.setAttribute('class', 'text-black')
    // cardCol1H1.textContent = nameofTask
    
    // a.querySelector('#card-col1').appendChild(cardCol1H1)
    
    // const cardCol2H3 = a.createElement('h3')
    // cardCol2H3.setAttribute('id', 'card-col2-h3')
    // cardCol2H3.setAttribute('class', 'text-grey')
    // cardCol2H3.textContent = timeofTask
    
    // a.querySelector('#card-col2').appendChild(cardCol2H3)
    
    
    
    // var enteredInfo = {nameofTask, timeofTask}
    //  + console.log( {enteredInfo})
    
    
    // })
    
    // })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // const namenotetake = a.querySelector('#button')
    // button.addEventListener('click', e => {
        //     e.preventDefault()
        
        
        
        
        //     console.log(namenotetake)
        // // Add the click listner which user clicks when he's ready to add an Item
        // submit.addEventListener('click', e => {
        //     // Preventing the default behaviour of the submit button to take the form input to the action URL
        //     e.preventDefault()
        //     // Getting the typed value in the input type text
        //     const text = document.querySelector('#note-task #note-time #check').value
        //     // Creating an li in which the text value could be appended
//     const newLi = document.createElement('li')
//     // Adding the CSS style class as same as the other li
//     newLi.setAttribute('class', 'list-group-item')
//     // Appending the text value to the created li
//     newLi.textContent = text
//     // Appending the created li to the ul in DOM
//     document.querySelector('ul').appendChild(newLi)
// })

// a.querySelector('#button').add
// })








// h1.setAttribute('id', 'newh1')
// h3.setAttribute('id', 'newh3')
// closeBtn.setAttribute('id', 'newclosebtn')
// cardCol1Div.setAttribute('id', 'new-card-col1') 
// cardCol2Div.setAttribute('id', 'new-card-col2' )
// cardRowDiv.setAttribute('id', 'new-card-row')