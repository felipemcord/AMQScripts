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


    roomFilter.testRoom = function (room) {
        let searchRegex = new RegExp(escapeRegExp(this._$FILTER_SEARCH_INPUT.val()), 'i');
        let roomSizeFilter = this._$ROOM_SIZE_SLIDER.slider('getValue');
        let songCountFilter = this._$SONG_COUNT_SLIDER.slider('getValue');
        let guessTimeFilter = this._$GUESS_TIME_SLIDER.slider('getValue');
        let difficultyFilter = this._$DIFFICULTY_SLIDER.slider('getValue');
    
    
        if (!searchRegex.test(room.settings.roomName) && !searchRegex.test(room.host) && !searchRegex.test(room.id) && !room.getFriendsInGame().some(name => {return searchRegex.test(name);})) {
            return false;
        }
        if (this._$HIDE_PRIVATE_CHECKBOX.prop('checked') && room.isPrivate()) {
            return false;
        }
        if (this._$HIDE_PLAYING_CHECKBOX.prop('checked') && !room.isInLobby()) {
            return false;
        }
        if (this._$HIDE_FULL_CHECKBOX.prop('checked') && Object.keys(room._friendsInGameMap).length == 0 ) {
            return false;
        }
        if (roomSizeFilter[0] > room.settings.roomSize || roomSizeFilter[1] < room.settings.roomSize) {
            return false;
        }
        if (songCountFilter[0] > room.settings.numberOfSongs || songCountFilter[1] < room.settings.numberOfSongs) {
            return false;
        }
    
        let guessTimeSetting = room.settings.guessTime;
        if (guessTimeSetting.randomOn && (guessTimeFilter[0] > guessTimeSetting.randomValue[0] || guessTimeFilter[1] < guessTimeSetting.randomValue[1])) {
            return false;
        } else if (!guessTimeSetting.randomOn && (guessTimeFilter[0] > guessTimeSetting.standardValue || guessTimeFilter[1] < guessTimeSetting.standardValue)) {
            return false;
        }
    
        let difficultySetting = room.settings.songDifficulity;
        if (difficultySetting.advancedOn && (difficultyFilter[0] > difficultySetting.advancedValue[0] || difficultyFilter[1] < difficultySetting.advancedValue[1])) {
            return false;
        } else if (!difficultySetting.advancedOn) {
            let maxDiff, minDiff;
            if (difficultySetting.standardValue.hard) {
                maxDiff = 20;
                minDiff = 0;
            }
            if (difficultySetting.standardValue.medium) {
                minDiff = minDiff !== undefined ? minDiff : 20;
                maxDiff = 60;
            }
            if (difficultySetting.standardValue.easy) {
                minDiff = minDiff !== undefined ? minDiff : 60;
                maxDiff = 100;
            }
    
            if (difficultyFilter[0] > minDiff || difficultyFilter[1] < maxDiff) {
                return false;
            }
        }
    
        if (!this._$STANDARD_MODE_CHECKBOX.prop('checked') && room.settings.gameMode === 'Standard') {
            return false;
        }
        if (!this._$QUICK_DRAW_MODE_CHECKBOX.prop('checked') && room.settings.gameMode === 'Quick Draw') {
            return false;
        }
    
        let songTypeSettings = room.settings.songType;
        let songTypeInclusion;
        if (songTypeSettings.advancedOn && songTypeSettings.advancedValue.random === 0) {
            songTypeInclusion = {
                openings: songTypeSettings.advancedValue.openings > 0,
                endings: songTypeSettings.advancedValue.endings > 0,
                inserts: songTypeSettings.advancedValue.inserts > 0
            };
        } else {
            songTypeInclusion = songTypeSettings.standardValue;
        }
    
        if (!this._$OPENINGS_CHECKBOX.prop('checked') && songTypeInclusion.openings) {
            return false;
        }
        if (!this._$ENDINGS_CHECKBOX.prop('checked') && songTypeInclusion.endings) {
            return false;
        }
        if (!this._$INSERTS_CHECKBOX.prop('checked') && songTypeInclusion.inserts) {
            return false;
        }
    
        let songSelectionSettings = room.settings.songSelection;
        if (!this._$WATCHED_CHECKBOX.prop('checked') && songSelectionSettings.advancedValue.watched > 0) {
            return false;
        }
        if (!this._$UNWATCHED_CHECKBOX.prop('checked') && songSelectionSettings.advancedValue.unwatched > 0) {
            return false;
        }
        if (!this._$RANDOM_CHECKBOX.prop('checked') && songSelectionSettings.advancedValue.random > 0) {
            return false;
        }
    
        let animeTypeSetting = room.settings.type;
        if (!this._$TV_TYPE_CHECKBOX.prop('checked') && animeTypeSetting.tv) {
            return false;
        }
        if (!this._$MOVIE_TYPE_CHECKBOX.prop('checked') && animeTypeSetting.movie) {
            return false;
        }
        if (!this._$OVA_TYPE_CHECKBOX.prop('checked') && animeTypeSetting.ova) {
            return false;
        }
        if (!this._$ONA_TYPE_CHECKBOX.prop('checked') && animeTypeSetting.ona) {
            return false;
        }
        if (!this._$SPECIAL_TYPE_CHECKBOX.prop('checked') && animeTypeSetting.special) {
            return false;
        }
    
        if(this._$SAMPLE_POINT_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.samplePoint, hostModal.DEFUALT_SETTINGS.samplePoint)) {
            return false;
        }
        if(this._$PLAYBACK_SPEED_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.playbackSpeed, hostModal.DEFUALT_SETTINGS.playbackSpeed)) {
            return false;
        }
        if(this._$ANIME_SCORE_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.animeScore, hostModal.DEFUALT_SETTINGS.animeScore)) {
            return false;
        }
        if(this._$VINTAGE_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.vintage, hostModal.DEFUALT_SETTINGS.vintage)) {
            return false;
        }
        if(this._$GENRE_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.genre, hostModal.DEFUALT_SETTINGS.genre)) {
            return false;
        }
        if(this._$TAG_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.tags, hostModal.DEFUALT_SETTINGS.tags)) {
            return false;
        }
        if(this._$POPULARITY_CHECKBOX.prop('checked') && !this.compareSettings(room.settings.songPopularity, hostModal.DEFUALT_SETTINGS.songPopularity)) {
            return false;
        }
    
        return true;
    };




})();