import device from 'current-device';

export const currentDevice  = {
    isDesktop: device.desktop(),
    isMobile: device.mobile(),
    isTablet: device.tablet()
};

export const detectJs = () => {
    const block = $('.no-js');
    if (block.length) {
        block.removeClass('no-js');
    }
};

export const detectIE = () => {
    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        const rv = ua.indexOf('rv:');
        $('body').addClass(`ie ie-${parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)}`);
    }
};