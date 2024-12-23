window.screenChangeInterop = {
    addChangeListener: function (dotNetReference) {
        const notifyChange = () => {
            dotNetReference.invokeMethodAsync("UpdateScreenState", window.innerWidth, window.innerHeight);
        };

        // Attach event listeners
        window.addEventListener("resize", notifyChange);
        window.addEventListener("orientationchange", notifyChange);

        // Trigger the check on initial load
        notifyChange();
    },

    removeChangeListener: function () {
        // Remove event listeners
        window.removeEventListener("resize", this.notifyChange);
        window.removeEventListener("orientationchange", this.notifyChange);
    }
};
