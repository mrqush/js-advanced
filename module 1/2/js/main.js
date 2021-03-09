document.addEventListener('DOMContentLoaded', e => {
    const allowedCharacters = 'йцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ- ';
    const allowedWords = 'йцукенгшщзхъфывапролджэячсмитьбюё'
    const form = document.querySelector('form');

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', e => {
            if (!allowedCharacters.includes(e.key)) {
                e.preventDefault();
            }
        })
        input.addEventListener('blur', e => {
            if (!allowedCharacters.includes(e.target.value)) {
                const newValue = [];
                for (let character of input.value) {
                    if (!allowedCharacters.includes(character)) {
                        continue;
                    } else {
                        newValue.push(character)
                    }
                }
                input.value = newValue.join('');
            }
            if (input.value[0] === ' ' || input.value[0] === '-') {
                (function func (){
                    for (let character of input.value) {
                        if(character === ' ' || character === '-'){
                            continue;
                        } else if(allowedWords.includes(character)) {
                            const newValue = input.value.slice(input.value.indexOf(character));
                            input.value = newValue;
                            return;
                        }
                    }
                })()
            }
            if (input.value[input.value.length - 1] === ' ' || input.value[input.value.length - 1] === '-'){
                function reverseString(str) {
                    const splitString = str.split('');
                    const reverseArr = splitString.reverse();
                    return reverseArr.join('');
                }
                const reversedValue = reverseString(input.value);
                (function func () {
                    for (let character of reversedValue) {
                        if(character === ' ' || character === '-'){
                            continue;
                        } else if(allowedWords.includes(character)) {
                            const newValue = reversedValue.slice(reversedValue.indexOf(character));
                            input.value = reverseString(newValue);
                            return;
                        }
                    }
                })()
            }
            input.value = input.value.toLowerCase();
            input.value = input.value = input.value[0].toUpperCase() + input.value.slice(1).toLowerCase();
        })
    })
    form.addEventListener('submit', e => {
        e.preventDefault();
        const wrapper = document.createElement('div');
        wrapper.style.border = '1px solid #000';
        wrapper.style.width = '300px';
        form.querySelectorAll('input').forEach(input => {
            const block = document.createElement('div');
            block.textContent = input.value;
            wrapper.append(block);
            input.value = '';
        })
        document.body.append(wrapper);
    })
})