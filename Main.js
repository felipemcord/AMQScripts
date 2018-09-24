// ==UserScript==
// @name         AMQ set default settings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//xpBarCoverOuter, #10bc7582 solid 3px #780386
//#gameChatPage  awMainView loadingScreen .removeClass gameChatContainer
    $('#gameChatPage > .col-xs-9').css('background-image','none');
    $('#gameChatContainer').css('background-color','#00000074');
    $('#gameChatContainer').removeClass('leftShadowBorder');
    $('#awMainView').css('background-image','url(https://files.catbox.moe/b9rqv3.png');
    $('#loadingScreen').css('background-image','url(https://files.catbox.moe/b9rqv3.png');
    $('#gameContainer').css('background-image','url(https://files.catbox.moe/b9rqv3.png');
    $('#startPage').css('background-image','url(https://files.catbox.moe/b9rqv3.png');
    $('#xpInnerContainer').css('height','45px');
    $('#xpLevelContainer p').css('font-size','35px');
    $('#xpLevelContainer').css('bottom','-5px');
    $('.xpBar').css('border-top-right-radius','0');
    $('.xpBar').css('border-top-left-radius','0');
    $('#xpBarCoverInner').css('background-color','transparent');
    $('#xpBarCoverInner').css('border','transparent solid');
    $('#xpBarCoverOuter').css('border','solid 5px #F1DE66');
    $('#xpBarCoverOuter').css('border-radius','0');
    $('#xpLevelContainer p').css('color:','#58533D');
    //$('#xpBackground').css('background-color','#10bc7582');
    //$('#xpHider').css('background-color','rgb(185, 6, 6)');
    $('#xpBackground').css('background-color','transparent');
    $('#xpHider').css('background-color','#C4E0F7');
    $('#xpHider').css('height','165px');
    //$('#footerMenuBarBackground').css('background-color','transparent');
    $('.levelText').css('color','#895F84');

})();