const gallery = document.querySelector('#gallery');
const houseSection = document.querySelector('.house');
const leftPart = document.querySelector('.house-left');
const rightPart = document.querySelector('.house-right');

window.addEventListener('scroll', () => {
    handleScroll(gallery, gallery, 0, [-2000, 0], 0.4, 0.65);

    const width = window.innerWidth / 2;

    handleScroll(leftPart, houseSection, 0, [-width, 0], 0, 0.5);
    handleScroll(rightPart, houseSection, 0, [width, 0], 0, 0.5);
});

function handleScroll(moveContainer, observedElement, rotate, translate, startThreshold = 0, endThreshold = 1) {
    const rect = observedElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    progress = Math.max(0, Math.min(1, progress));

    let activeProgress = (progress - startThreshold) / (endThreshold - startThreshold);

    activeProgress = Math.max(0, Math.min(1, activeProgress));

    const transforms = [];

    if (rotate) {
        transforms.push(`rotate(${activeProgress * rotate}deg)`);
    }

    if (translate) {
        transforms.push(`translate(${activeProgress * translate[0]}px, ${activeProgress * translate[1]}px)`);
    }

    moveContainer.style.transform = transforms.join(" ");
}