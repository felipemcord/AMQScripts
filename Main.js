// ==UserScript==
// @name         AMQ set default settings
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       juvian
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
    xpBar.setXpPercent = XpBar.prototype.setXpPercent = function (newXpP) {
        this._xpPercent = newXpP;
        this.$xpHider.css("transform", "scale(" + ( newXpP) + ",1)");
    };
    afkKicker.setupAfkTimeout = function () {
        this.afkWarningTimeout = setTimeout(() => {

        }, this._AFK_TIMEOUT_TIME);
    };
    afkKicker.resetTimers();
    $("#rbMajorFilters p")[2].innerHTML = "Friends";
    $("#rbMajorFilters").css('width','311px');
    $("#rbMajorFilters").css('left','-311px');
    $('.levelText').css('color','#895F84');


    roomBrowser.applyTileFilterToRoom = function (room) {
        let searchRegExp = new RegExp(escapeRegExp(this.$filterSearchInput.val()), 'i');
        let roomSize = this.$filterRoomSize.slider('getValue');
        let playbackSpeed = this.$filterPlaybackSpeed.slider('getValue');
        let songCount = this.$filterSongCount.slider('getValue');
        let guessTime = this.$filterGuessTime.slider('getValue');

        let songType = {
            opening: $("#rbfSongTypeOpening:checked").length === 1,
            ending: $("#rbfSongTypeEnding:checked").length === 1,
            insert: $("#rbfSongTypeInsert:checked").length === 1
        };

        let songSelection = {
            1: $("#rbfSongSelectionRandom:checked").length === 1,
            2: $("#rbfSongSelectionMainly:checked").length === 1,
            3: $("#rbfSongSelectionOnly:checked").length === 1
        };

        if ($("#rbfPrivateRoom:checked").length === 1 && room.isPrivate()) {
            room.setHidden(true);
        } else if ($("#rbfPlaying:checked").length === 1 && !room.isInLobby()) {
            room.setHidden(true);
        } else if ($("#rbfFull:checked").length === 1 && Object.keys(room._friendsInGameMap).length == 0) {
            room.setHidden(true);
        } else if ($("#rbfModeStandard:checked").length !== 1 && room.settings.gameMode === 'Standard') {
            room.setHidden(true);
        } else if ($("#rbfModeQuickDraw:checked").length !== 1 && room.settings.gameMode === 'Quick Draw') {
            room.setHidden(true);
        } else if ((searchRegExp.source == "" | searchRegExp.test(room.settings.roomName) || searchRegExp.test(room.host) || searchRegExp.test(room.id)) && //Search filter
                   (roomSize[0] <= room.settings.roomSize
                    && roomSize[1] >= room.settings.roomSize
                    && songCount[0] <= room.settings.numberOfSongs
                    && songCount[1] >= room.settings.numberOfSongs
                    && guessTime[0] <= room.settings.guessTime.standardValue
                    && guessTime[1] >= room.settings.guessTime.standardValue
                    && playbackSpeed[0] <= room.settings.playbackSpeed.standardValue
                    && playbackSpeed[1] >= room.settings.playbackSpeed.standardValue)
                   && (songSelection[room.settings.songSelection.standardValue] || room.settings.songSelection.advancedOn) &&
                   (songType.opening || songType.opening === room.settings.songType.standardValue.openings) &&
                   (songType.ending || songType.ending === room.settings.songType.standardValue.endings) &&
                   (songType.insert || songType.insert === room.settings.songType.standardValue.inserts)) {
            room.setHidden(false);
        } else {
            room.setHidden(true);
        }
        //Apply setting filter

        this.updateNumberOfRoomsText();
    };




})();