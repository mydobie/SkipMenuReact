"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipMenu = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
var button_1 = require("./button");
var menu_1 = require("./menu");
var eventListeners_1 = require("./eventListeners");
var skipMenuTypes_1 = require("./skipMenuTypes");
var SkipMenu = /** @class */ (function () {
    function SkipMenu(config) {
        // @ts-ignore
        this.config = __assign(__assign({}, skipMenuTypes_1.defaultConfig), config);
        // This is to support deprecated headers configuration
        if (config === null || config === void 0 ? void 0 : config.headers) {
            this.config.headings = config.headers;
        }
        if (config === null || config === void 0 ? void 0 : config.text) {
            this.config.text = __assign(__assign({}, skipMenuTypes_1.defaultConfig.text), config.text);
        }
        this.config.menuId = this.config.id + '_menu';
        this.config.menuContainerId = this.config.menuId + '-container';
        this.config.buttonId = this.config.id + '_button';
        this.config.tooltipId = this.config.id + '_tooltip';
        this.update = this.update.bind(this);
        this.getConfig = this.getConfig.bind(this);
    }
    SkipMenu.prototype.getConfig = function () {
        return this.config;
    };
    SkipMenu.prototype.init = function () {
        var _this = this;
        // Load DOM change listener
        (0, eventListeners_1.addDomChangeListener)(this.config, this.update, function (obv) {
            _this.config.mutationObserver = obv;
        });
        // Add listener to close menu
        (0, eventListeners_1.addCloseMenuOnClick)(this.config);
        this._add();
    };
    SkipMenu.prototype._add = function () {
        // builds the skipMenu container
        if (this.config.isRemoved) {
            return null;
        }
        var skipMenu = document.createDocumentFragment();
        var skipMenuWrapper = document.createElement('div');
        skipMenu.appendChild(skipMenuWrapper);
        skipMenuWrapper.id = this.config.id;
        skipMenuWrapper.setAttribute('data-skip-menu', 'true');
        if (!this.config.alwaysShow) {
            skipMenuWrapper.classList.add('skipMenu-hidden');
        }
        // builds the button
        var skipMenuButton = (0, button_1.createskipMenuButton)(this.config);
        skipMenuWrapper.appendChild(skipMenuButton);
        var menu = (0, menu_1.buildMenu)(this.config);
        if (menu === null) {
            // eslint-disable-next-line no-console
            console.warn('No landmarks or headings found  - skipmenu could not be built');
            return;
        }
        var menuContainer = document.createElement('div');
        menuContainer.id = this.config.menuContainerId;
        menuContainer.classList.add('dropdown-menu');
        menuContainer.style.display = 'none';
        menuContainer.appendChild(menu);
        // Append menu items and attach event listeners
        skipMenuWrapper.appendChild(menuContainer);
        var attachToStyles = window.getComputedStyle(this.config.attachTo);
        if (this.config.ensureAbsoluteParent &&
            this.config.attachTo.tagName.toLocaleLowerCase() !== 'body' &&
            !['sticky', 'absolute', 'fixed', 'relative', '-webkit-sticky'].some(function (style) { return style === attachToStyles.getPropertyValue('position'); })) {
            this.config.attachTo.style.position = 'relative';
        }
        this.config.attachTo.prepend(skipMenuWrapper);
    };
    SkipMenu.prototype.update = function () {
        var currentMenu = document.getElementById(this.config.menuId);
        var updatedMenu = (0, menu_1.buildMenu)(this.config);
        if (currentMenu && updatedMenu && !currentMenu.isEqualNode(updatedMenu)) {
            var focusedElement_1 = document.activeElement;
            currentMenu.setAttribute('aria-busy', 'true');
            currentMenu.replaceWith(updatedMenu);
            currentMenu.setAttribute('aria-busy', 'false');
            updatedMenu.querySelectorAll('[role="menuitem"]').forEach(function (item) {
                if (focusedElement_1 && focusedElement_1.isEqualNode(item)) {
                    item.focus();
                }
            });
        }
        if (updatedMenu && !currentMenu) {
            this._add();
        }
        if (!updatedMenu && currentMenu) {
            this._remove();
        }
    };
    SkipMenu.prototype.open = function () {
        (0, button_1.openMenu)(this.getConfig());
    };
    SkipMenu.prototype.close = function () {
        (0, button_1.closeMenu)(this.getConfig());
    };
    SkipMenu.prototype._remove = function () {
        var skipMenu = document.getElementById(this.config.id);
        if (skipMenu) {
            skipMenu.remove();
        }
    };
    SkipMenu.prototype.remove = function () {
        var _a;
        this.config.isRemoved = true;
        (_a = this.config.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.config.mutationObserver = null;
        this._remove();
    };
    SkipMenu.version = 'v1.3.1'; // Note - this is replaced on build
    return SkipMenu;
}());
exports.SkipMenu = SkipMenu;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.SkipMenu = SkipMenu;
