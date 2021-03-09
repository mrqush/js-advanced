document.querySelector('.dropdown').addEventListener('click', (e) => {
    document.querySelector('.dropdown__wrapper').classList.toggle('show');
    e._isClickWithinDropDown = true;
})

window.addEventListener('click', e => {
    if(e._isClickWithinDropDown) {
        return;
    }
    document.querySelector('.dropdown__wrapper').classList.remove('show');
})