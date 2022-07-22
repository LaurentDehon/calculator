class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }
  switchSign() {
      this.currentOperand = this.currentOperand * -1
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const curr = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation) {
      case '+':
        computation = prev + curr
        break
      case '-':
        computation = prev - curr
        break
      case '/':
        computation = prev / curr
        break
      case '*':
        computation = prev * curr
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('fr', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data_number]')
const operationButtons = document.querySelectorAll('[data_operation]')
const equalsButton = document.querySelector('[data_equals]')
const deleteButton = document.querySelector('[data_delete]')
const allClearButton = document.querySelector('[data_all_clear]')
const plusMinusButton = document.querySelector('[data_plus_minus]')
const previousOperandTextElement = document.querySelector('[data_previous_operand]')
const currentOperandTextElement = document.querySelector('[data_current_operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
plusMinusButton.addEventListener('click', button => {
  calculator.switchSign()
  calculator.updateDisplay()
})