const gallery = document.querySelector('#gallery');

window.addEventListener('scroll', () => {
    handleScroll(gallery, gallery, null, [-2500, 0]);
})

// moveContainer - контейнер, что мы двигаем,
// observedElement - элемент, который мы при скролле отслеживаем,
// rotate - угол, на который вертим, translate - сдвиг вправо или вниз в пикселях
function handleScroll(moveContainer, observedElement, rotate, translate) {
    const obs = observedElement.getBoundingClientRect();
    const move = moveContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = obs.bottom - windowHeight;
    const end = obs.top;

    const distance = end - start || 1;

    let progress = (0 - start) / distance;

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    const transforms = [];

    if (rotate) {
        transforms.push(`rotate(${progress * rotate}deg)`);
    }

    if (translate) {
        transforms.push(
            `translate(${progress * translate[0]}px, ${progress * translate[1]}px)`
        );
    }

    moveContainer.style.transform = transforms.join(" ");
}