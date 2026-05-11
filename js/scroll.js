const gallery = document.querySelector('#gallery');

window.addEventListener('scroll', () => {
    handleScroll(gallery, gallery, null, [-2000, 0], 1, 0.5);
})

// moveContainer - контейнер, что мы двигаем,
// observedElement - элемент, который мы при скролле отслеживаем,
// rotate - угол, на который вертим, translate - сдвиг вправо или вниз в пикселях
// beginCoefficient - с какой части контейнера начинается движение
function handleScroll(moveContainer, observedElement, rotate, translate, beginCoefficient, endCoefficient) {
    const rect = observedElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // // 0 - элемент вне экрана, 1 - полностью виден
    let progress = 1 - ((rect.top + (rect.height * beginCoefficient)) / windowHeight);
    let progress2 = ((rect.bottom - rect.height * endCoefficient) / windowHeight);
    console.log(progress, progress2);

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // смещаем или крутим в зависимости от скролла
    // создаём массив трансформаций
    let transforms = [];

    if (rotate) {
        transforms.push(`rotate(${progress * rotate}deg)`);
    }

    if (translate) {
        transforms.push(`translate(${progress * translate[0]}px, ${progress * translate[1]}px)`);
    }

    // объединяем в одну строку
    moveContainer.style.transform = transforms.join(" ");
}