import { useEffect } from 'react';

export interface LazyElement extends HTMLElement {
    dataset: {
        src: string;
    };
}

const useLazyLoading = (selector: string = 'img[data-src], svg[data-src]') => {
    useEffect(() => {
        const elements = document.querySelectorAll<LazyElement>(selector);
        console.log('Znaleziono elementów do lazy loading:', elements.length);
        const validElements: LazyElement[] = Array.from(elements).filter((el): el is LazyElement => {
            return el instanceof HTMLImageElement || el instanceof SVGElement;
        });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const element = entry.target as LazyElement;

                if (entry.isIntersecting) {
                    const { src } = element.dataset;
                    if (src) {
                        console.log('Ustawiam src:', src);

                        if (element instanceof HTMLImageElement) {
                            element.src = src;
                        } else if (element instanceof SVGElement) {
                            element.setAttribute('src', src);
                        }
                    }
                    element.classList.add('lazy-loaded');
                    observer.unobserve(element);
                }
            });
        });

        validElements.forEach((el) => observer.observe(el));

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    const newElements = Array.from(mutation.addedNodes).filter(node => 
                        node instanceof HTMLElement && node.matches(selector)
                    ) as LazyElement[];
                    newElements.forEach(el => {
                        if (!el.classList.contains('lazy-loaded')) {
                            observer.observe(el);
                        }
                    });
                }
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [selector]);
};

export default useLazyLoading;
