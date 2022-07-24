export function emit(el, name, options) {
    const event = new CustomEvent(name, Object.assign({ bubbles: true, cancelable: false, composed: true, detail: {} }, options));
    el.dispatchEvent(event);
    return event;
}
export function waitForEvent(el, eventName) {
    return new Promise(resolve => {
        function done(event) {
            if (event.target === el) {
                el.removeEventListener(eventName, done);
                resolve();
            }
        }
        el.addEventListener(eventName, done);
    });
}
