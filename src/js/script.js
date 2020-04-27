'use strict';

$(document).ready(function () {
    // Resize function
    (function resizeFn() {
        let doit;

        const resized = () => {
            // Call your functions
        };

        window.onresize = () => {
            clearTimeout(doit);
            doit = null;
            doit = setTimeout(resized, 100);
        };
    })();
});
