// ==UserScript==
// @name         AMQ AFK Remove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    xpBar.setXpPercent = XpBar.prototype.setXpPercent = function (newXpP) {
        this._xpPercent = newXpP;
        this.$xpHider.css("transform", "scale(" + ( newXpP) + ",1)");
    };
    afkKicker.setupAfkTimeout = function () {
        this.afkWarningTimeout = setTimeout(() => {

        }, this._AFK_TIMEOUT_TIME);
    };
    afkKicker.resetTimers();
})