import {useEffect, useState} from "react";

const tablet = parseInt("680px");
const desktop = parseInt("1200px");

type WindowSizeType = 'mobile' | 'tablet' | 'desktop';

interface WindowSize {
    device: WindowSizeType | null;
    isDesktop: boolean;
    isMobile: boolean;
}

export const useWindowSize = (): WindowSize => {

    const [device, setDevice] = useState<WindowSizeType | null>(null);

    const isDesktop = device === 'desktop';
    const isTablet = device === 'tablet';
    const isMobile = device === 'mobile';

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < tablet) {
                setDevice('mobile');
            }
             else{
                setDevice('desktop');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { device, isDesktop, isMobile };
}
