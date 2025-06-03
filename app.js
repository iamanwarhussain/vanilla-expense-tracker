document.addEventListener("DOMContentLoaded" , () => {
    const form = document.querySelector("form")
    const expenseInput = document.querySelector(".expense-input")
    const costInput = document.querySelector(".cost-input")
    const ulLists = document.querySelector(".lists")
    const totalCost = document.querySelector(".totalCost")
    
    const data = JSON.parse(localStorage.getItem("TotalExpenses")) || []
    data.forEach(item => {
        renderExpense(item)
    });

    updateTotalCost()

    
    form.addEventListener("submit" , (e) => {
        e.preventDefault()
        let expenseInputValue = expenseInput.value.trim()
        let costInputValue = costInput.value.trim()

        if(expenseInputValue === ""){
            alert("Fill the expense tab");
            return ; 
        }
        if(costInputValue === "" || isNaN(costInputValue) || parseInt(costInputValue) <= 0){
            alert("Fill cost tab");
            return ;
        }

        let newExpense = {
            id : Date.now() ,
            text : `${expenseInputValue}` ,
            cost : parseFloat(costInputValue)
        }

        data.push(newExpense)

        renderExpense(newExpense)
        saveExpenses()
        updateTotalCost()

        costInput.value = ""
        expenseInput.value = ""

    })

    function renderExpense(item){
        let li = document.createElement("li")
        li.innerHTML = `
        ${item.text} <span>${item.cost}&#8377</span>
        <button class="remove-btn">remove</button>
        `
        ulLists.appendChild(li)
        
       
        
        li.querySelector(".remove-btn").addEventListener("click" , (e) => {
            li.remove()
            const index = data.findIndex(exp => exp.id === item.id)
            if(index > -1){
                data.splice(index , 1)
                saveExpenses()
                updateTotalCost()
            }
            
        })
        
    }

    function saveExpenses(){
        localStorage.setItem("TotalExpenses" , JSON.stringify(data))
    }

    function calculateTotal(){
        return data.reduce((acc , curr) => acc + curr.cost , 0)
    }

    function updateTotalCost(){
        totalCost.innerHTML = `${calculateTotal()}&#8377`

    }
})