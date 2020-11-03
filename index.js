addListeners();

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });
    
    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });
    
    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 6000);
        });

    let heartBeating;
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeating = animaster().heartBeating(block);
        });
    
    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            heartBeating.stop();
        })
}

function animaster() {
    return {
        /**
         * Блок плавно появляется из прозрачного
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        fadeIn(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        /**
         * Блок плавно скрывается
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        /**
         * Функция, передвигающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param translation — объект с полями x и y, обозначающими смещение блока
         */
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        /**
         * Функция, увеличивающая/уменьшающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
         */
        scale(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
        
        /**
         * Функция, передвигающая элемент на 100 пикселей вправо и на 20 вниз, а затем скрывающая его. Пропорция времени анимации 40/60
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        moveAndHide(element, duration) {
            const moveDuration = .4 * duration;
            const hideDuration = .6 * duration;
            this.move(element, moveDuration, {x: 100, y: 20});
            
            setTimeout(() => {
                this.fadeOut(element, hideDuration);
            }, moveDuration);
        },
        /**
         * Функция, показывающая элемент и после паузы скрывающая его. Каждая фаза длится 1/3 от указанной продолжительности анимации
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         */
        showAndHide(element, duration) {
            const animationDuration = duration / 3;
            const pauseDuration = 2 * animationDuration;
            
            this.fadeIn(element, animationDuration);
            setTimeout(() => {
                this.fadeOut(element, animationDuration);
            }, pauseDuration);
        },

        heartBeating(element) {

            const duration = 1000;
            const maxRatio = 1.4;
            const minRatio = 1;
            let timer = setInterval(() => {
                this.scale(element, duration / 2, maxRatio);
                setTimeout(this.scale, duration / 2, element, duration / 2, minRatio);
            }, duration);

            const stop = function () {
                clearInterval(timer)
            }

            return {
                stop,
            }
        },
    }

}



function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
