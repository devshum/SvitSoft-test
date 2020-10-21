const dataController = (function() {
    const state = {
        navigation: { toggled: false },

        slider: {
            position: 0,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    };

    return {
        isToggled() { return state.navigation.toggled; },
        
        toggleState() { state.navigation.toggled = !state.navigation.toggled; },

        movePosition(val, movePosition) {
            val === 'inc' ? state.slider.position += movePosition
                          : state.slider.position -= movePosition
        },

        getPosition() {
            return state.slider.position;
        },

        getSlidesToScroll() {
            return state.slider.slidesToScroll;
        },

        // TESTING
        getState() { return state; },
    }
})();

const UIController = (function() {
    const DOMStrings = {
        header: 'header-js',
        mainBox: 'main-box-js',
        navigation: 'navigation-js',
        figureNone: '.figure-none-js',
        links: '.link-js',
        cellIcon: 'cell-icon-js',
        crossLeft: 'cross-left-js',
        crossRight: 'cross-right-js',
        topFigure: 'top-js',
        rightFigure: 'right-js',
        bottomFigure: 'bottom-js',
        leftFigure: 'left-js',
        btnToggler: '.btn-toggler-js',
        hero: 'hero-js',

        sliderContainer: 'slider-container',
        sliderTrack: 'slider-track',
        sliderItem: 'slider-item',
        btnPrev: 'slider-btn-prev',
        btnNext: 'slider-btn-next'
    };

    return {
        getDOMStrings() { return DOMStrings; },

        getLinks() {
            let linksAll = document.querySelectorAll(DOMStrings.links);
            return linksAll = Array.from(linksAll);
        },

        getBtns() {
            let btns = document.querySelectorAll(DOMStrings.btnToggler);
            return btnsAll = Array.from(btns);
        },

        hideFigures() {
            // HIDE THE FIGURES
            let figureNoneAll = document.querySelectorAll(DOMStrings.figureNone);
            figureNoneAll = Array.from(figureNoneAll);

            figureNoneAll.forEach(figure => figure.classList.toggle('animation-cross-none-js'));
        },

        crossFigures() {
            // CROSS THE FIGURES
            const crossLeft = document.getElementById(DOMStrings.crossLeft);
            const crossRight = document.getElementById(DOMStrings.crossRight);

            crossLeft.classList.toggle('animation-cross-left-js');
            crossRight.classList.toggle('animation-cross-right-js');
        },

        transformFigures() {
            // TRANSFORM THE FIGURES
            const topFigure = document.getElementById(DOMStrings.topFigure);
            const rightFigure = document.getElementById(DOMStrings.rightFigure);
            const bottomFigure = document.getElementById(DOMStrings.bottomFigure);
            const leftFigure = document.getElementById(DOMStrings.leftFigure);

            topFigure.classList.toggle('animation-top-js');
            rightFigure.classList.toggle('animation-right-js');
            bottomFigure.classList.toggle('animation-bottom-js');
            leftFigure.classList.toggle('animation-left-js');
        },

        animateHeaderComponents() {
            const header = document.getElementById(DOMStrings.header);
            const mainBox = document.getElementById(DOMStrings.mainBox);

            mainBox.classList.toggle('toggle-main-box-js');
        },

        animateNavigation() {
            const navigation = document.getElementById(DOMStrings.navigation);

            navigation.classList.toggle('toggle-navigation-js');
        },

        animateLinks() {
            linksAll = this.getLinks();

            linksAll.forEach((link, i) =>{
                if(link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation=`toggleLink 1s ease forwards ${i / 4 + 0.4}s`;
                };
            });
        },

        animateHero() {
            const hero = document.getElementById(DOMStrings.hero);

            if(hero.style.animation) {
                hero.style.animation = '';
            } else {
                hero.style.animation=`toggleHero 1s ease forwards`;
            };
        },

        clearLinks() {
            const linksAll = this.getLinks();

            linksAll.forEach(link => link.style.color = '#4e254f40');
        },

        renderLoader(containerString) {
            const parent = document.getElementById(containerString);

            const loader = `
                <div class="loader">
                    <svg>
                        <use href="img/cw-icon.svg#icon-cw"></use>
                    </svg>
                </div>
            `;

            parent.insertAdjacentHTML('afterbegin', loader);
        },

        getSliderItemWidth() {
            const sliderItem = document.getElementById(DOMStrings.sliderItem);

            return sliderItem.offsetWidth;
        },

        clearLoader() {
            const loader = document.querySelector('.loader');
            if(loader) loader.parentElement.removeChild(loader);
        },

        setPosition(position) {
           const sliderTrack = document.getElementById(DOMStrings.sliderTrack);
           sliderTrack.style.transform = `translateX(${position}px)`;
        },

        checkBtns(position, slidesToShow, sliderItemWidth) {
            const btnPrev = document.getElementById(DOMStrings.btnPrev);
            const btnNext = document.getElementById(DOMStrings.btnNext);

            btnPrev.disabled = position === 0;
            btnNext.disabled = position <= -(4 - slidesToShow) * sliderItemWidth;
        }
    };
})();

const globalController = (function(dataCtrl, UICtrl) {
    const DOMStrings = UICtrl.getDOMStrings();

    const iconAnimationCtrl = () => {
        // TOGGLE THE STATE VALUE
        dataCtrl.toggleState();

        // HIDE THE FIGURES
        UICtrl.hideFigures();
    
        // CROSS THE FIGURES
        UICtrl.crossFigures();
        
        // TRANSFORM THE FIGURES
        UICtrl.transformFigures();
    };

    const navigationAnimationCtrl = () => {
        // ANIMATE HEADER COMPONENTS
        UICtrl.animateHeaderComponents();

        // ANIMATE THE NAV
        UICtrl.animateNavigation();

        // ANIMATE THE LINKS
        UICtrl.animateLinks();
    };

    const toggleNavigation = () => {
        // CLEAR LINKS
        UICtrl.clearLinks();

        // TOGGLE THE STATE VALUE
        dataCtrl.toggleState();

        // GET TOGGLED VALUE FROM THE STATE
        const isToggled = dataCtrl.isToggled();

        // CHECK IS TOGGLED
        if(isToggled) {
            iconAnimationCtrl();
            navigationAnimationCtrl();
        };
    };

    function clickLinksCtrl(thisVal) {
        linksAll.forEach(link => link.style.color = '#4e254f40');

        UICtrl.animateLinks();
        UICtrl.renderLoader(DOMStrings.navigation);

        setTimeout(() => {
            UICtrl.animateLinks();
            UICtrl.clearLoader();
        }, 1000);


        thisVal.style.color = '#4E254F';
    }

    function clickBtnCtrl(thisVal) {
        btnsAll.forEach(btn => btn.style.color = '#4e254f40');

        UICtrl.animateHero();
        UICtrl.renderLoader(DOMStrings.header);

        setTimeout(() => {
            UICtrl.animateHero();
            UICtrl.clearLoader();
        }, 1500);

        thisVal.style.color = '#4E254F';
    }


    const btnLogic = param => {
        const slidesToShow = 1;
        const slidesToScroll = dataCtrl.getSlidesToScroll();
        const sliderItemWidth = UICtrl.getSliderItemWidth();
        const movePosition = slidesToScroll * sliderItemWidth;
        

        dataCtrl.movePosition(param, movePosition);
        const position = dataCtrl.getPosition();
        UICtrl.setPosition(position);
        
        UICtrl.checkBtns(position, slidesToShow, sliderItemWidth);
    }

    const setupEventListeners = () => {
        const linksAll = UICtrl.getLinks();
        const btnsAll = UICtrl.getBtns();

        document.getElementById(DOMStrings.cellIcon).addEventListener('click', toggleNavigation);

        linksAll.forEach(link => {
           
            link.addEventListener('click', function() {
                clickLinksCtrl(this);
            })
        });

        btnsAll.forEach(btn => {
           
            btn.addEventListener('click', function() {
                clickBtnCtrl(this);
            })
        });

        document.getElementById(DOMStrings.btnNext).addEventListener('click', () => {
            btnLogic('dec');
        });

        document.getElementById(DOMStrings.btnPrev).addEventListener('click', () => {
            btnLogic('inc');
        });
    };

    return {
        init() { 
            setupEventListeners(), 
            UICtrl.checkBtns(0); 
        }
    }

})(dataController, UIController);

globalController.init();

