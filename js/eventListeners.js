"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDomChangeListener = exports.addCloseMenuOnClick = void 0;
var button_1 = require("./button");
var addCloseMenuOnClick = function (config) {
    document.addEventListener('click', function (e) {
        var menu = document.getElementById(config.menuContainerId);
        if (menu) {
            var isMenuOpen = menu.style.display !== 'none';
            if (isMenuOpen && !e.target.closest("#".concat(config.id))) {
                (0, button_1.closeMenu)(config);
            }
        }
    });
};
exports.addCloseMenuOnClick = addCloseMenuOnClick;
var addDomChangeListener = function (config, update, setMutationObserver) {
    if (config.reloadOnChange) {
        var obv = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var _a;
                if (!Array.from(mutation.removedNodes).some(function (removedNode) { return removedNode.id === config.id; }) &&
                    !Array.from(mutation.addedNodes).some(function (addedNode) { return addedNode.id === config.id; }) &&
                    !mutation.target.closest("#".concat(config.id)) &&
                    mutation.attributeName !== 'tabindex' &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    ((_a = mutation.addedNodes[0]) === null || _a === void 0 ? void 0 : _a.data) !== '\n\n' &&
                    mutation.target.id !== config.id &&
                    mutation.target.id !== config.menuId) {
                    update();
                }
            });
        });
        setMutationObserver(obv);
        obv.observe(document, {
            attributes: true,
            subtree: true,
            childList: true,
        });
    }
};
exports.addDomChangeListener = addDomChangeListener;
