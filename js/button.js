"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createskipMenuButton = exports.toggleMenu = exports.closeMenu = exports.openMenu = void 0;
var utilities_1 = require("./utilities");
var openMenu = function (config, lastItem) {
    if (lastItem === void 0) { lastItem = false; }
    var menu = document.getElementById(config.menuContainerId);
    if (menu) {
        var button = document.getElementById(config.buttonId);
        menu.style.display = 'block';
        button === null || button === void 0 ? void 0 : button.setAttribute('aria-expanded', 'true');
        var items = menu.querySelectorAll('[role="menuitem"]');
        if (lastItem) {
            items[items.length - 1].focus();
        }
        else {
            items[0].focus();
        }
    }
};
exports.openMenu = openMenu;
var closeMenu = function (config, keepVisibleOnClose) {
    var _a;
    if (keepVisibleOnClose === void 0) { keepVisibleOnClose = false; }
    var menu = document.getElementById(config.menuContainerId);
    if (menu) {
        var button = document.getElementById(config.buttonId);
        button === null || button === void 0 ? void 0 : button.removeAttribute('aria-expanded');
        menu.style.display = 'none';
        if (!keepVisibleOnClose && !config.alwaysShow) {
            (_a = document.getElementById(config.id)) === null || _a === void 0 ? void 0 : _a.classList.add('skipMenu-hidden');
        }
        button === null || button === void 0 ? void 0 : button.focus();
    }
};
exports.closeMenu = closeMenu;
var toggleMenu = function (config, keepVisibleOnClose) {
    if (keepVisibleOnClose === void 0) { keepVisibleOnClose = false; }
    var menu = document.getElementById(config.menuContainerId);
    if (menu) {
        var isCurrentlyExpanded = menu.style.display !== 'none';
        if (isCurrentlyExpanded) {
            (0, exports.closeMenu)(config, keepVisibleOnClose);
        }
        else {
            (0, exports.openMenu)(config);
        }
    }
};
exports.toggleMenu = toggleMenu;
var toolTipText = function (accessKey, startText) {
    if ((0, utilities_1.isTouchEnabled)()) {
        return null;
    }
    var userAgent = window.navigator.userAgent.toLowerCase();
    // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
    var isMac = /(macintosh|macintel|macppc|mac68k|macos)/.test(userAgent);
    var isOpera = /(opera|opr)/.test(userAgent);
    var fireFox = /(firefox)/.test(userAgent);
    var text = startText;
    if (isMac && isOpera) {
        text += 'Control + Alt';
    }
    else if (isMac) {
        text += 'Control + Option';
    }
    else if (fireFox) {
        text += 'Alt + Shift';
    }
    else {
        text += 'Alt';
    }
    text += ' + ' + accessKey;
    return text;
};
var toolTip = function (config) {
    var toolTipTextString = toolTipText(config.accessKey, config.text.tooltipLabel);
    if (!toolTipTextString) {
        return null;
    }
    var tooltip = document.createElement('div');
    tooltip.id = config.tooltipId;
    tooltip.classList.add('tooltip', 'bs-tooltip-bottom', 'pf-c-tooltip', 'pf-m-bottom');
    tooltip.setAttribute('role', 'tooltip');
    var tooltipArrow = document.createElement('div');
    tooltipArrow.classList.add('tooltip-arrow', 'pf-c-tooltip__arrow');
    tooltip.appendChild(tooltipArrow);
    var tooltipInner = document.createElement('div');
    tooltipInner.classList.add('tooltip-inner', 'pf-c-tooltip__content');
    tooltipInner.textContent = toolTipText(config.accessKey, config.text.tooltipLabel);
    tooltip.appendChild(tooltipInner);
    return tooltip;
};
var createskipMenuButton = function (config) {
    var buttonWrapper = document.createDocumentFragment();
    var skipMenuButton = document.createElement('button');
    skipMenuButton.setAttribute('aria-haspopup', 'true');
    skipMenuButton.removeAttribute('aria-expanded');
    skipMenuButton.setAttribute('aria-controls', config.menuContainerId);
    skipMenuButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'pf-c-button', 'pf-m-tertiary');
    skipMenuButton.id = config.buttonId;
    skipMenuButton.textContent = config.text.buttonLabel;
    var pfDropdownArrow = document.createElement('span');
    pfDropdownArrow.classList.add('pf-c-dropdown__toggle-icon');
    skipMenuButton.appendChild(pfDropdownArrow);
    if (config.tabIndex) {
        skipMenuButton.tabIndex = config.tabIndex;
    }
    skipMenuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        (0, exports.toggleMenu)(config, true);
    });
    skipMenuButton.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
            e.stopPropagation();
            e.preventDefault();
            if (e.key == 'ArrowDown') {
                (0, exports.openMenu)(config);
            }
            else {
                (0, exports.openMenu)(config, true);
            }
        }
    });
    if (!config.alwaysShow) {
        skipMenuButton.addEventListener('focus', function () {
            var _a;
            (_a = document.getElementById(config.id)) === null || _a === void 0 ? void 0 : _a.classList.remove('skipMenu-hidden');
        });
        skipMenuButton.addEventListener('blur', function () {
            var _a;
            if (!skipMenuButton.hasAttribute('aria-expanded')) {
                (_a = document.getElementById(config.id)) === null || _a === void 0 ? void 0 : _a.classList.add('skipMenu-hidden');
            }
        });
    }
    buttonWrapper.appendChild(skipMenuButton);
    if (config.useAccessKey) {
        var skipMenuToolTip_1 = toolTip(config);
        if (skipMenuToolTip_1) {
            skipMenuButton.addEventListener('focus', function () {
                if (!skipMenuButton.hasAttribute('aria-expanded')) {
                    skipMenuToolTip_1.style.display = 'block';
                }
            });
            skipMenuButton.addEventListener('blur', function () {
                skipMenuToolTip_1.style.display = 'none';
            });
            skipMenuButton.addEventListener('mouseover', function () {
                if (!skipMenuButton.hasAttribute('aria-expanded')) {
                    skipMenuToolTip_1.style.display = 'block';
                }
            });
            skipMenuButton.addEventListener('mouseout', function () {
                skipMenuToolTip_1.style.display = 'none';
            });
            buttonWrapper.appendChild(skipMenuToolTip_1);
            skipMenuButton.setAttribute('accesskey', config.accessKey);
        }
    }
    return buttonWrapper;
};
exports.createskipMenuButton = createskipMenuButton;
/* ************************************************** */
