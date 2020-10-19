const header = document.getElementById('header-js');
const mainBox = document.getElementById('main-box-js');
const navigation = document.getElementById('navigation-js');

const figureNoneAll = Array.from(document.querySelectorAll('.figure-none-js'));
const linksAll = Array.from(document.querySelectorAll('.link-js'));

const cellIcon = document.getElementById('cell-icon-js');

const crossLeft = document.getElementById('cross-left-js');
const crossRight = document.getElementById('cross-right-js');

const topFigure = document.getElementById('top-js');
const rightFigure = document.getElementById('right-js');
const bottomFigure = document.getElementById('bottom-js');
const leftFigure = document.getElementById('left-js');

cellIcon.addEventListener('click', () => {
    // ICON ANIMATION
    figureNoneAll.forEach(figure => figure.classList.toggle('animation-cross-none-js'));

    crossLeft.classList.toggle('animation-cross-left-js');
    crossRight.classList.toggle('animation-cross-right-js');

    topFigure.classList.toggle('animation-top-js');
    rightFigure.classList.toggle('animation-right-js');
    bottomFigure.classList.toggle('animation-bottom-js');
    leftFigure.classList.toggle('animation-left-js');

    // TOGGLE NAVIGATION
    navigation.classList.toggle('toggle-navigation-js');
    mainBox.classList.toggle('toggle-main-box-js');
    header.classList.toggle('toggle-header-js');

    linksAll.forEach((link, i) =>{
        if(link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation=`toggleLink 1s ease forwards ${i / 4 + 0.4}s`;
        }
    });
});
