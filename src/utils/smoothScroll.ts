export const initSmoothScroll = (content: HTMLElement) => {
    let scrollY = 0;
    let lastScrollY = 0;
    const ease = 0.1;

    const requestTick = () => {
        requestAnimationFrame(update);
    };

    const onScroll = () => {
        lastScrollY = window.scrollY;
        requestTick();
    };

    const update = () => {
        scrollY += (lastScrollY - scrollY) * ease;

        const translateY = `translate3d(0,${-scrollY}px,0)`;
        content.style.transform = translateY;

        requestTick();
    };

    window.addEventListener('scroll', onScroll);

    return () => {
        window.removeEventListener('scroll', onScroll); // Cleanup on unmount
    };
};
