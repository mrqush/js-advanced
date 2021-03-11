document.querySelector('.dropdown').addEventListener('click', (e) => {
    if(document.querySelector('.dropdown__wrapper').contains(e.target)) {
        e._isClickWithinDropDown = true;
        return;
    }
    document.querySelector('.dropdown__wrapper').classList.toggle('show');
    e._isClickWithinDropDown = true;
})

window.addEventListener('click', e => {
    if(e._isClickWithinDropDown) {
        return;
    }
    document.querySelector('.dropdown__wrapper').classList.remove('show');
})