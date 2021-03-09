document.addEventListener('DOMContentLoaded', e => {
    window.addEventListener('scroll', e => {
        if (window.pageYOffset > 100) {
            document.querySelector('#anchor').style.display = 'block';
        } else {
            document.querySelector('#anchor').style.display = 'none';
        }
    }, { passive: true })
    document.querySelector('#anchor').addEventListener('click', e => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
})