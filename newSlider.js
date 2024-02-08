const $ = (s, o = document) => o.querySelector(s);

var interval;

let slider = $('.slider'),
    input = $('input', slider),
    random = (min, max) => min + Math.random() * (max - min),
    between = (min, max, percent) =>  max - (max - min) * (1 - percent),
    create = slider => {

        let percent = slider.handle.dataset.percent,
            position = slider.handle.dataset.position,
            div = document.createElement('div');

        div.classList.add('smoke');
        slider.range.appendChild(div);

        gsap.set(div, {
            x: position,
            y: -20
        });

        gsap.timeline().to(div, {
            scale: random(between(.15, 1, percent), between(.4, 2, percent)),
            duration: between(.8, 1.2, percent)
        }).to(div, {
            scale: 0,
            duration: between(.3, .5, percent)
        });

        gsap.to(div, {
            duration: between(.3, .4, percent),
            opacity: 1
        });

        gsap.to(div, {
            duration: between(2, 3, percent),
            y: random(between(-40, -200, percent), between(-70, -320, percent)),
            x: random(between(-20, -90, percent), between(20, 90, percent)) + parseInt(position),
            onComplete() {
                div.remove();
            }
        });

    };

rangesliderJs.create(input, {
    onInit(value) {
        this.handle.dataset.value = value;
    },
    onSlideStart(value, percent, position) {
        this.handle.classList.add('active');
        interval = setInterval(() => {
            create(this);
        }, 50);
    },
    onSlide(value, percent, position) {
        this.handle.dataset.value = value;
        this.handle.dataset.percent = percent;
        this.handle.dataset.position = position;
    },
    onSlideEnd() {
        this.handle.classList.remove('active');
        clearInterval(interval);
    }
});
