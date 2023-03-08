const input = document.querySelector('.calculator__input');
const calculatorBtns = document.querySelector('.calculator__inner');

const reloadPage = () => location.reload();

const losing = () => {
    const hangmanReload = document.querySelector('.hangman__reload');
    hangmanReload.classList.remove('hangman__reload_disable');
    const hangmanBtn = document.querySelector('.hangman__btn');
    hangmanBtn.addEventListener('click', reloadPage);

}

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
        if(sym === '+') return Math.round(Math.abs(+num1 + +num2));
        if(sym === '-') return Math.round(Math.abs(+num1 - +num2));
        if(sym === '*') return Math.round(Math.abs(+num1 * +num2));
        if(sym === '/') return Math.round(Math.abs(+num1 / +num2));
}

const updateHangman = () => {
    const hangman = document.querySelector('.hangman');
    hangman.classList.toggle('hangman_active');
}

const updateInputValue = (e) => {
    console.log(e.target)
    const btn = e.target;
    if(btn.classList.contains('equals')) {
        updateHangman();
        input.value = operations();
        hangmanGame(input.value)
    } else if(btn.classList.contains('clear')) {
        input.value = '';
    } else if(btn.classList.contains('haha')) {
        const audio = new Audio();
        audio.src = './sounds/haha.mp3';
        audio.play();
        input.value = '';
    } else {
        input.value += btn.textContent;
    }
}

const createList = (value) => {
    const hangmanList = document.querySelector('.hangman__list');
    for(let i = 0; i < value.length; i++) {
        const li = document.createElement('li');
        li.classList.add('list__item');
        li.classList.add('list__item_disable');
        li.textContent = value[i];
        hangmanList.append(li);
    }
}

const clearLi = () => {
    const hangmanList = document.querySelector('.hangman__list');
    const li = hangmanList.querySelectorAll('.list__item');
    li.forEach(item => {
        hangmanList.removeChild(item);
    })
}

let count = 0;

const unlockingNumbers = () => {
    const numberItem = document.querySelectorAll('.numbers__item');
    numberItem.forEach(item => {
        item.classList.remove('numbers__item_true');
        item.classList.remove('numbers__item_false');
    })
}

const checkedLi = () => {
    const checkedItems = [];
    const listItem = document.querySelectorAll('.list__item');
    const numberItem = document.querySelectorAll('.numbers__item');
    const hangmanImage = document.querySelectorAll('.hangman__image');
    numberItem.forEach((item) => {
        item.addEventListener('click', ()=> {
            let found = false;
            listItem.forEach(li => {
                const digit = li.textContent.trim();
                if(item.textContent.includes(digit)) {
                    li.classList.remove('.list__item_disable');
                    li.classList.add('list__item_active');
                    checkedItems.push(true);
                    found = true;
                    item.classList.add('numbers__item_true');
                }
            })
            if (!found) {
                count++;
                item.classList.add('numbers__item_false');
                hangmanImage[count - 1].classList.remove('disable');

            }
            if(checkedItems.length === listItem.length) {
                count = 0;
                clearLi();
                unlockingNumbers();
                updateHangman();
                hangmanImage.forEach(item => {
                    item.classList.add('disable');
                })
            }
            if(count >= 3) {
                numberItem.forEach(item => {
                    item.classList.add('numbers__item_false');
                })
                losing();
            }
            
            console.log(count)
        })
    })   
}

const hangmanGame = (value) => {
    const hangmanValue = value.split('').map(item => +item);
    createList(value.split(''));
    checkedLi();
    console.log(hangmanValue)
}

const calculatorBtn = document.querySelectorAll('.calculator__btn');

calculatorBtn.forEach(item => {
    item.addEventListener('click', updateInputValue);
})
//calculatorBtns.addEventListener('click', updateInputValue);