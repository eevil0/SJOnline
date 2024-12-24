const getScreenDimensions = () => {
    return {
        width:
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
        height:
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
    };
};

const getScreenDpi = () => {
    return {
        value:
            window.devicePixelRatio * 96 ||
            document.devicePixelRatio * 96 ||
            document.body.devicePixelRatio * 96
    };
};

window.screenChangeInterop = {
    addChangeListener: function (dotNetReference) {

        const notifyChange = () => {
            const dimensions = getScreenDimensions();
            const dpi = getScreenDpi();
            dotNetReference.invokeMethodAsync("UpdateScreenState", dimensions.width, dimensions.height, dpi.value);
        };

        let resizeTimeout;

        // Use throttling to prevent rapid firing of events
        const throttledNotifyChange = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(notifyChange, 200); // 200ms delay
        };

        // Attach event listeners
        window.addEventListener("resize", throttledNotifyChange);
        window.addEventListener("orientationchange", throttledNotifyChange);

        // Trigger the check on initial load
        notifyChange();
    },

    removeChangeListener: function () {
        // Remove event listeners
        window.removeEventListener("resize", this.notifyChange);
        window.removeEventListener("orientationchange", this.notifyChange);
    }
};
