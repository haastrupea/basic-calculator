let result = 0
let memory = []
let currentNumberValue = ''
let currentScreenValue=''
const valipOps = ['+', '-', '*', '/']
const opMap = {  '+': 'add',  '-': 'subtract', '/': 'divide', '*': 'multiply'}
const calculator = {
    clearScreen: function() {
        calculator.render('')
        currentNumberValue = ''
        currentScreenValue=''
        memory = []
    },

    render: (content) => {
        // grab the screen
        const display = document.getElementById('bc-screen-display')
        display.textContent = content
    },
    equalTo: function(lastOperand) {
        if(memory.length === 3 || (memory.length === 2 && lastOperand) ){
            const firstOprand = memory[0]
            const secondOprand = memory[2] || Number(lastOperand)
            const operation = memory[1]
            const opFnName = opMap[operation];
            const opFn = calculator[opFnName]
            const result = opFn(firstOprand, secondOprand)
            calculator.clearScreen()
            memory.push(result)
            if(lastOperand) {
                calculator.render(result)
            }
        }
    },
    add: function (a,b) {
        return a + b
    },
    subtract: function (a,b) {
        return a - b
    },
    divide: function (a,b) {
        return a / b
    },
    multiply: function name(a,b) {
        console.log(a, "a", b, "b")
        return a * b
    }

}

// add event listener to non op key press
const nonOpKeysContainer = document.querySelector('.bc-nonOp-keys')

nonOpKeysContainer.addEventListener('click', (evt)=>{
    const target = evt.target;
    if(target.classList.contains('bc-num-key')){
        const numValue = target.getAttribute('data-keyValue');
        currentNumberValue += numValue

        const show = memory.join('') + currentNumberValue
        calculator.render(show)
    }
    if (target.classList.contains('bc-fn-key')) {
        const bcFnKey = target.getAttribute('data-keyFn');
        const currentFunction = calculator[bcFnKey]
        currentFunction(currentNumberValue)
    }

}, false)

// add events to op key press
const opKeysContainer = document.querySelector('.bc-op-keys')

opKeysContainer.addEventListener('click', (evt)=>{
    const target = evt.target;
    if(target.classList.contains('bc-op-key')){

        if(currentNumberValue.length){
            memory.push(Number(currentNumberValue))
            currentNumberValue = '';
        }

        const lastInMemory = memory[memory.length-1]

        const currentOp = target.textContent

        calculator.equalTo()

        if(memory.length === 3){
            const firstOprand = memory[0]
            const secondOprand = memory[2]
            const operation = memory[1]
            const opFnName = opMap[operation];
            const opFn = calculator[opFnName]
            const result = opFn(firstOprand, secondOprand)
            calculator.clearScreen()
            
            memory.push(result);
        }

        if(lastInMemory !== undefined && !valipOps.includes(lastInMemory)) {
            memory.push(currentOp)
        }else if(currentOp !== lastInMemory) {
            memory[memory.length-1] = currentOp
        }

        calculator.render(memory.join(''))
    }

}, false)


console.log('release')