async function includeHTML() {
    document.getElementById("header").innerHTML = await fetch('/header-footer/header.html').then(res => res.text());
    document.getElementById("footer").innerHTML = await fetch('/header-footer/footer.html').then(res => res.text());
}
includeHTML();

function toggleMenu() {
    document.getElementById('main-nav').classList.toggle('active');
}

setTimeout(function() {
    const headerContainer = document.getElementById('header');
    const header = headerContainer.querySelector('header') || headerContainer;
    
    let lastScrollTop = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
    
        if (Math.abs(lastScrollTop - currentScroll) > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
                header.classList.add('hidden');
            } 
            else {
                header.classList.remove('hidden');
            }
            lastScrollTop = currentScroll;
        }
    });
    
    console.log('Scroll header script initialized');
}, 500);


/*
<link rel="stylesheet" href="/header-footer/header-footer.css"> 

<div id="header"></div>

<div id="footer"></div>
<script src="/header-footer/access-header-footer.js"></script>
<script src="https://kit.fontawesome.com/eaa5e9c69b.js" crossorigin="anonymous"></script>
*/