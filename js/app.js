const dataController = (function() {
    const state = {
        navigation: { toggled: false },

        slider: { currentPage: 1 }
    };

    return {
        isToggled() { return state.navigation.toggled; },
        
        toggleState() { state.navigation.toggled = !state.navigation.toggled; },

        getState() { return state; }
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
        leftFigure: 'left-js'
    };

    return {
        getDOMStrings() { return DOMStrings; },

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
            header.classList.toggle('toggle-header-js');
        },

        animateNavigation() {
            const navigation = document.getElementById(DOMStrings.navigation);

            navigation.classList.toggle('toggle-navigation-js');
        },

        animateLinks() {
            let linksAll = document.querySelectorAll(DOMStrings.links);
            linksAll = Array.from(linksAll);

            linksAll.forEach((link, i) =>{
                if(link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation=`toggleLink 1s ease forwards ${i / 4 + 0.4}s`;
                }
            });
        }
    };
})();

const globalController = (function(dataCtrl, UICtrl) {

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

        // ANIMATE THE LINKS()
        UICtrl.animateLinks();
    };

    const toggleNavigation = () => {
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

    const setupEventListeners = () => {
        const DOMStrings = UICtrl.getDOMStrings();
        document.getElementById(DOMStrings.cellIcon).addEventListener('click', toggleNavigation);
    };

    return {
        init() { setupEventListeners() }
    }

})(dataController, UIController);

globalController.init();
