let figureNoneAll = document.querySelectorAll('#figure-none-js')
figureNoneAll = Array.from(figureNoneAll);

const cellIcon = document.getElementById('cell-icon-js');

const crossLeft = document.getElementById('cross-left-js');
const crossRight = document.getElementById('cross-right-js');

const topFigure = document.getElementById('top-js');
const rightFigure = document.getElementById('right-js');
const bottomFigure = document.getElementById('bottom-js');
const leftFigure = document.getElementById('left-js');

cellIcon.addEventListener('click', () => {
    figureNoneAll.forEach(figure => figure.classList.toggle('animation-cross-none-js'));

    crossLeft.classList.toggle('animation-cross-left-js');
    crossRight.classList.toggle('animation-cross-right-js');

    topFigure.classList.toggle('animation-top-js');
    rightFigure.classList.toggle('animation-right-js');
    bottomFigure.classList.toggle('animation-bottom-js');
    leftFigure.classList.toggle('animation-left-js');
});
