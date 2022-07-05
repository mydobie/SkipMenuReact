"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFocusable = exports.isTouchEnabled = exports.focusNextElement = exports.isElementVisible = void 0;
var isElementVisible = function (el) {
    if (el.nodeType === 9 || el.parentElement === null) {
        return true;
    } // is at document level
    var computedStyle = window.getComputedStyle(el);
    var display = computedStyle.getPropertyValue('display');
    var visibility = computedStyle.getPropertyValue('visibility');
    var width = computedStyle.getPropertyValue('width');
    var height = computedStyle.getPropertyValue('height');
    var hidden = el.getAttribute('hidden');
    if (display === 'none' ||
        visibility === 'hidden' ||
        hidden !== null ||
        width === '0px' ||
        height === '0px') {
        return false;
    }
    return (0, exports.isElementVisible)(el.parentNode);
};
exports.isElementVisible = isElementVisible;
var focusNextElement = function (menuButtonId) {
    var _a, _b;
    if (menuButtonId === void 0) { menuButtonId = 'skipMenu_button'; }
    var canHaveFocus = 'a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    var focusableElements = document.querySelectorAll(canHaveFocus);
    var buttonIndex = Array.from(focusableElements).findIndex(function (el) {
        return el.isEqualNode(document.getElementById(menuButtonId));
    });
    var buttonTabIndex = ((_a = document.getElementById(menuButtonId)) === null || _a === void 0 ? void 0 : _a.tabIndex) || 0;
    var nextElement;
    if (buttonTabIndex === 0) {
        for (var i = buttonIndex + 1; i < focusableElements.length && !nextElement; i++) {
            if ((0, exports.isElementVisible)(focusableElements[i]) &&
                focusableElements[i].tabIndex === 0) {
                nextElement = focusableElements[i];
            }
        }
    }
    else {
        for (var i = buttonIndex + 1; i < focusableElements.length && !nextElement; i++) {
            if ((0, exports.isElementVisible)(focusableElements[i]) &&
                focusableElements[i].tabIndex >= buttonTabIndex) {
                nextElement = focusableElements[i];
            }
        }
        for (var i = 0; i < buttonIndex && !nextElement; i++) {
            if ((0, exports.isElementVisible)(focusableElements[i]) &&
                focusableElements[i].tabIndex === 0) {
                nextElement = focusableElements[i];
            }
        }
    }
    if (nextElement) {
        nextElement.focus();
    }
    else {
        (_b = document.getElementById(menuButtonId)) === null || _b === void 0 ? void 0 : _b.focus();
    }
};
exports.focusNextElement = focusNextElement;
var isTouchEnabled = function () {
    return 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigator.msMaxTouchPoints > 0;
};
exports.isTouchEnabled = isTouchEnabled;
var isFocusable = function (element) {
    var _a;
    if (element.getAttribute('href') !== null ||
        (element.hasAttribute('contentEditable') &&
            ((_a = element.getAttribute('contentEditable')) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'false') ||
        element.getAttribute('tabindex') !== null) {
        return true;
    }
    var tag = element.tagName.toLowerCase();
    return ['button', 'details', 'input', 'iframe', 'select', 'textarea'].some(function (t) { return t === tag; });
};
exports.isFocusable = isFocusable;
