// ==UserScript==
// @name         AMQ AFK Remove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       
// @match        https://animemusicquiz.com/*
// @grant        none
// @downloadURL https://github.com/felipemcord/AMQScripts/raw/master/afk.js
// @updateURL   https://github.com/felipemcord/AMQScripts/raw/master/afk.js
// @copyright MIT license
// ==/UserScript==

(function() {
    'use strict';
    afkKicker.setupAfkTimeout = function () {
        this.afkWarningTimeout = setTimeout(() => {

        }, this._AFK_TIMEOUT_TIME);
    };
    afkKicker.resetTimers();
})
