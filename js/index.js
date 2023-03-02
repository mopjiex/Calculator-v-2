const input = document.querySelector('.calculator__input');
const calculatorBtns = document.querySelector('.calculator__inner');

const inputToArray = () => {
    let value = input.value;
    const symbols = ['+', '-', '/', '*'];
         let index = symbols.map(
            item => {
                return [...value].indexOf(item);
            }
        );
    index = index.filter(item => !(item === -1))[0];
    const valueToArray = [value.slice(0, index), value[index], value.slice(index+1, value.length)]; 
    return valueToArray;  
}

const operations = () => {
    const [num1, sym, num2] = inputToArray();
        if(sym === '+') return Math.round(+num1 + +num2);
        if(sym === '-') return Math.round(+num1 - +num2);
        if(sym === '*') return Math.round(+num1 * +num2);
        if(sym === '/') return Math.round(+num1 / +num2);
}

const updateInputValue = (e) => {
    const btn = e.target;
    if(btn.classList.contains('equals')) {
        input.value = operations();
    } else {
        input.value += btn.textContent;
    }
    
}


calculatorBtns.addEventListener('click', updateInputValue);