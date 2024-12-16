import { useEffect } from 'react';


export interface LazyImage extends HTMLImageElement {
    dataset: {
        src: string;
    };
}

const useLazyLoading = (selector: string = 'img[data-src]' ) => {
    useEffect(() => {
        const elements = document.querySelectorAll<LazyImage>(selector);
        console.log('Znaleziono elementów do lazy loading:', elements.length);
        const validImages : LazyImage [] = Array.from(elements).filter((el): el is LazyImage  => {
            return el instanceof HTMLImageElement;
        });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const img =  entry.target as LazyImage;
               
                if(entry.isIntersecting){
                    const {src} = img.dataset;
                if(src) {
                    console.log('Ustawiam src:', src); 

                    img.src = src;
                }
                img.classList.add('lazy-loaded');
                observer.unobserve(img);                
                };
            });
        });
        validImages.forEach((img) => observer.observe(img));
        return () => observer.disconnect();
    }, [selector]);
};
export default useLazyLoading;
