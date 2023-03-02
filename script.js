// Theme

let tema = document.querySelector('.light')
let button = document.querySelector('.theme')

button.addEventListener('click', () => {
    if(tema.classList.contains('light')) {
        tema.classList.replace('light', 'dark')
    } else {
        tema.classList.replace('dark', 'light')
    }
})