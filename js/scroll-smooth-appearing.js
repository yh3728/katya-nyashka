

const options = {
    threshold: 0.5 // 50% элемента в видимости — запускаем анимацию
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, options);

document.querySelectorAll('.smooth-appear').forEach((el) => {
    observer.observe(el);
});

