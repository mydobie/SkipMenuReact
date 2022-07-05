"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMenuSection = void 0;
var utilities_1 = require("./utilities");
var button_1 = require("./button");
/* ********************************** */
var addMenuItemEvents = function (listItem, targetElement, config) {
    var buttonId = config.buttonId;
    listItem.addEventListener('click', function (event) {
        (0, button_1.closeMenu)(config);
        targetElement.focus();
        event.stopPropagation();
        event.preventDefault();
    });
    listItem.addEventListener('keydown', function (e) {
        var _a;
        if (e.key === 'Enter' || e.key === ' ') {
            (0, button_1.closeMenu)(config);
            targetElement.focus();
        }
        e.stopPropagation();
        e.preventDefault();
        if (e.key === 'Tab') {
            (0, button_1.closeMenu)(config);
            if (e.shiftKey) {
                (_a = document.getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else {
                (0, utilities_1.focusNextElement)(buttonId);
            }
        }
    });
    return listItem;
};
// *****************************************************************************
var landMarkType = function (element, config) {
    var tag = element.tagName;
    var role = element.getAttribute('role');
    switch (role) {
        case 'main':
            return config.text.mainLabel;
        case 'search':
            return config.text.searchLabel;
        case 'navigation':
            return config.text.navigationLabel;
        case 'region':
            return config.text.regionLabel;
        case 'complementary':
            return config.text.complementaryLabel;
        case 'banner':
            return config.text.bannerLabel;
        case 'contentinfo':
            return config.text.footerLabel;
    }
    switch (tag.toLowerCase()) {
        case 'main':
            return config.text.mainLabel;
        case 'nav':
            return config.text.navigationLabel;
        case 'section':
            return config.text.sectionLabel;
        case 'form':
            return config.text.formLabel;
        case 'aside':
            return config.text.complementaryLabel;
        case 'header':
            return config.text.bannerLabel;
        case 'footer':
            return config.text.footerLabel;
    }
    return null;
};
var getMenuItemText = function (element, isHeader, config) {
    var _a;
    var landmark = landMarkType(element, config);
    var text = '';
    if (element.hasAttribute('aria-label')) {
        text = element.getAttribute('aria-label');
    }
    else if (element.hasAttribute('aria-labelledby')) {
        var elementId = element.getAttribute('aria-labelledby') || '';
        text = ((_a = document.getElementById(elementId)) === null || _a === void 0 ? void 0 : _a.innerText.trim()) || '';
    }
    else if (element.hasAttribute('title')) {
        text = element.getAttribute('title');
    }
    if (landmark) {
        return text ? "".concat(landmark, ": ").concat(text) : landmark;
    }
    else if (isHeader) {
        var headerText = text || element.innerText;
        return headerText === null || headerText === void 0 ? void 0 : headerText.trim();
    }
    else {
        // unsure what this is, return tagname
        return element.tagName.toLocaleLowerCase();
    }
};
// *****************************************************************************
var buildMenuItem = function (element, depth, config) {
    var listItem = document.createElement('div');
    var listItemText = getMenuItemText(element, !!depth, config);
    if (!listItemText ||
        listItemText === '' ||
        element.classList.contains(config.ignoreClass)) {
        return null;
    }
    var span = document.createElement('span');
    span.classList.add('pf-c-menu__item');
    if (depth) {
        listItem.className = "skipMenu-menu-header-level-".concat(depth);
        var depthWrapper = document.createElement('span');
        depthWrapper.classList.add('menu__item-depth');
        var depthText = document.createTextNode("".concat(depth));
        depthWrapper.appendChild(depthText);
        span.appendChild(depthWrapper);
        span.appendChild(document.createTextNode(') '));
    }
    var text = document.createTextNode(listItemText);
    var textWrapper = document.createElement('span');
    textWrapper.classList.add('menu__item-text');
    textWrapper.appendChild(text);
    span.appendChild(textWrapper);
    listItem.appendChild(span);
    listItem.setAttribute('role', 'menuitem');
    listItem.classList.add('dropdown-item', 'pf-c-menu__list-item');
    listItem.setAttribute('tabindex', '-1');
    listItem = addMenuItemEvents(listItem, element, config);
    return listItem;
};
/* ********************************** */
var buildMenuSection = function (elements, sectionTitle, sectionId, config) {
    if (elements.length === 0) {
        return null;
    }
    var container = document.createElement('div');
    container.setAttribute('role', 'group');
    container.classList.add('pf-c-menu__list');
    container.id = sectionId;
    container.setAttribute('aria-labelledby', "".concat(sectionId, "-title"));
    var containerTitle = document.createElement('div');
    containerTitle.setAttribute('role', 'separator');
    containerTitle.id = "".concat(sectionId, "-title");
    containerTitle.appendChild(document.createTextNode(sectionTitle));
    container.appendChild(containerTitle);
    elements.forEach(function (element) {
        if ((0, utilities_1.isElementVisible)(element)) {
            var depth = parseInt(element.tagName.substring(1));
            if (element.getAttribute('aria-level')) {
                depth = parseInt(element.getAttribute('aria-level') || '');
            }
            if (!(0, utilities_1.isFocusable)(element)) {
                element.tabIndex = -1;
            }
            var menuItem = buildMenuItem(element, depth, config);
            if (menuItem) {
                container.appendChild(menuItem);
            }
        }
    });
    return container;
};
exports.buildMenuSection = buildMenuSection;
