document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('top-nav');
    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('open')) {
            hamburger.classList.remove('open');
            nav.classList.remove('top-0');
            nav.classList.add('rounded-b-full', 'top-[-100vh]');
        } else {
            hamburger.classList.add('open');
            nav.classList.add('top-0');
            nav.classList.remove('rounded-b-full', 'top-[-100vh]');
        }
    });

    for (let i = 0; i < nav.children[0].children.length; i++) {
        nav.children[0].children[i].addEventListener('click', () => {
            hamburger.classList.remove('open');
            nav.classList.remove('top-0');
            nav.classList.add('rounded-b-full', 'top-[-100vh]');
        });
    }
});

window.addEventListener('resize', () => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('top-nav');
    hamburger.classList.remove('open');
    nav.classList.remove('top-0');
    nav.classList.add('rounded-b-full', 'top-[-100vh]');
});
