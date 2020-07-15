// Define class OOP without property
class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
     this.previousOperandTextElement = previousOperandTextElement
     this.currentOperandTextElement = currentOperandTextElement
     this.clear()
   }
   // Clear Function
   clear() {
     this.currentOperand = ''
     this.previousOperand = ''
     this.operation = undefined
   }
   // Delete Function
   delete() {
     this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }
   // Append Number Function
   appendNumber(number) {
     if (number === '.' && this.currentOperand.includes('.')) return
     this.currentOperand = this.currentOperand.toString() + number.toString()
   }
   // Choose Operation Function
   chooseOperation(operation) {
     if (this.currentOperand === '') return
     if (this.previousOperand !== '') {
       this.process() // Define Function for Processes 
     }
     this.operation = operation
     this.previousOperand = this.currentOperand
     this.currentOperand = ''
   }
   // Processes Function
   process() {
     let processing
     const prev = parseFloat(this.previousOperand)
     const current = parseFloat(this.currentOperand)
     if (isNaN(prev) || isNaN(current)) return
     switch (this.operation) {
       case '+':
         processing = prev + current
         break
       case '-':
         processing = prev - current
         break
       case '*':
         processing = prev * current
         break
       case '/':
         processing = prev / current
         break
       default:
         return
     }
     this.currentOperand = processing
     this.operation = undefined
     this.previousOperand = ''
   }
   // Display Number Function
   getDisplayNumber(number) {
     const stringNumber = number.toString()
     const integerDigits = parseFloat(stringNumber.split('.')[0])
     const decimalDigits = stringNumber.split('.')[1]
     let integerDisplay
     if (isNaN(integerDigits)) {
       integerDisplay = ''
     } else {
       integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
     }
     if (decimalDigits != null) {
       return `${integerDisplay}.${decimalDigits}`
     } else {
       return integerDisplay
     }
   }
   // Update Number Function
   updateDisplay() {
     this.currentOperandTextElement.innerText =
       this.getDisplayNumber(this.currentOperand)
     if (this.operation != null) {
       this.previousOperandTextElement.innerText =
         `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
     } else {
       this.previousOperandTextElement.innerText = ''
     }
   }
 }
 
//  Define Vars From index.html through DOM
 const numberButtons = document.querySelectorAll('[data-number]')
 const operationButtons = document.querySelectorAll('[data-operation]')
 const equalsButton = document.querySelector('[data-equals]')
 const deleteButton = document.querySelector('[data-delete]')
 const allClearButton = document.querySelector('[data-all-clear]')
 const previousOperandTextElement = document.querySelector('[data-previous-operand]')
 const currentOperandTextElement = document.querySelector('[data-current-operand]')

 // Create Object  
 const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
 
//  Loop for Numbers Buttons 
 numberButtons.forEach(function(button) {
   button.addEventListener('click', function() {
     calculator.appendNumber(button.innerText)
     calculator.updateDisplay()
   })
 })
//  Loop for Operations Buttons
 operationButtons.forEach(function(button) {
   button.addEventListener('click', function() {
     calculator.chooseOperation(button.innerText)
     calculator.updateDisplay()
   })
 })
 
//  Add DOM for Equal Button 
 equalsButton.addEventListener('click', function(button) {
   calculator.process()
   calculator.updateDisplay()
 })
 
//  Add DOM for Clear Button 'AC'
 allClearButton.addEventListener('click', function(button) {
   calculator.clear()
   calculator.updateDisplay()
 })
 
//  Add DOM for Delete Button 'DEL'
 deleteButton.addEventListener('click',  function(button) {
   calculator.delete()
   calculator.updateDisplay()
 })