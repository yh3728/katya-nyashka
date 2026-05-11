// window.addEventListener('scroll', () => {
//     const houseSection = document.querySelector('.house');
//     const leftPart = document.querySelector('.house-left');
//     const rightPart = document.querySelector('.house-right');
//
//     const rect = houseSection.getBoundingClientRect();
//     const scrollHeight = window.innerHeight;
//
//     if (rect.top < scrollHeight && rect.bottom > 0) {
//         const progress = (scrollHeight - rect.top) * 0.5;
//
//         leftPart.style.transform = `translateX(-${progress}px)`;
//         rightPart.style.transform = `translateX(${progress}px)`;
//     } else if (rect.top >= scrollHeight) {
//         leftPart.style.transform = `translateX(0)`;
//         rightPart.style.transform = `translateX(0)`;
//     }
// });