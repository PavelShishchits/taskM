import device from 'current-device';

export const psUtils  = {
    isDesktop: device.desktop(),
    isMobile: device.mobile(),
    isTablet: device.tablet()
};