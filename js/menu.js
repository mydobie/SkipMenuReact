"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMenu = void 0;
var menuSection_1 = require("./menuSection");
var button_1 = require("./button");
var matchSection = function (key, menuItems, startIndex, endIndex) {
    var newIndex;
    var firstLetterRegExp = /^([0-9]\) )?\s*([\S])/;
    var firstNumberRegExp = /^([0-9])?/;
    menuItems.forEach(function (item, i) {
        var _a, _b, _c;
        var firstChar;
        if (parseInt(key)) {
            var matches = (_a = item.innerText) === null || _a === void 0 ? void 0 : _a.match(firstNumberRegExp);
            firstChar = matches === null || matches === void 0 ? void 0 : matches[1];
        }
        else {
            var matches = (_b = item.innerText) === null || _b === void 0 ? void 0 : _b.match(firstLetterRegExp);
            firstChar = (_c = matches === null || matches === void 0 ? void 0 : matches[2]) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase();
        }
        if (i >= startIndex &&
            i <= endIndex &&
            !newIndex &&
            firstChar === key.toLowerCase()) {
            newIndex = i;
        }
    });
    return newIndex;
};
var getMatchingElementIndex = function (key, menuItems, index) {
    var newIndex;
    newIndex = matchSection(key, menuItems, index + 1, menuItems.length - 1);
    if (!newIndex) {
        newIndex = matchSection(key, menuItems, 0, index - 1);
    }
    return newIndex;
};
var menuItemsEvent = function (menu, config) {
    var menuItems = menu.querySelectorAll('[role="menuitem"]');
    menuItems.forEach(function (item, index) {
        item.tabIndex = -1;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'ArrowDown':
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    if (menuItems[index + 1]) {
                        menuItems[index + 1].focus();
                    }
                    else {
                        menuItems[0].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    if (menuItems[index - 1]) {
                        menuItems[index - 1].focus();
                    }
                    else {
                        menuItems[menuItems.length - 1].focus();
                    }
                    break;
                case 'Escape':
                    (0, button_1.closeMenu)(config);
                    break;
                case 'Home':
                    menuItems[0].focus();
                    break;
                case 'End':
                    menuItems[menuItems.length - 1].focus();
                    break;
                default:
                    if (/^[a-zA-Z1-9]$/.test(e.key)) {
                        var newIndex = getMatchingElementIndex(e.key, menuItems, index);
                        if (newIndex !== undefined) {
                            menuItems[newIndex].focus();
                        }
                    }
            }
        });
    });
    return menu;
};
var buildMenu = function (config) {
    // build the actual menu
    var menu = document.createElement('div');
    menu.setAttribute('aria-live', 'off');
    menu.setAttribute('role', 'menu');
    menu.classList.add('pf-c-menu');
    menu.id = config.menuId;
    // attach the sections
    var headerSection = config.headings
        ? (0, menuSection_1.buildMenuSection)(document.querySelectorAll(config.headings), config.text.headingsLabel, "".concat(config.id, "_headings"), config)
        : null;
    var landmarkSection = config.landmarks
        ? (0, menuSection_1.buildMenuSection)(document.querySelectorAll(config.landmarks), config.text.landmarksLabel, "".concat(config.id, "_landmarks"), config)
        : null;
    if (landmarkSection !== null) {
        menu.appendChild(landmarkSection);
    }
    if (headerSection !== null) {
        menu.appendChild(headerSection);
    }
    // attach the events
    if (headerSection !== null || landmarkSection !== null) {
        menuItemsEvent(menu, config);
        return menu;
    }
    return null;
};
exports.buildMenu = buildMenu;
