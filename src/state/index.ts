

export const setPageEnterTime = (time: number = Date.now()) => {
    localStorage.setItem('pageEnterTime', time.toString());
}

export const getPageEnterTime = () => {
    return Number(localStorage.getItem('pageEnterTime') || '');
}
