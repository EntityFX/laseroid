"use strict";

/**
 * Main class
 * 
 * @class Main
 */
var InputDevice = /** @class */ (function () {
    InputDevice.prototype.hexi = null;
    InputDevice.prototype.game = null;
    InputDevice.prototype.main = null;

    function InputDevice($hexi, main) {
        var _this = this;
        _this.hexi = $hexi;
        _this.game = main.game;
        _this.main = main;
	}

    InputDevice.prototype.init = function() {
        var _this = this;

        this.hexi.pointer.press = (function () {
            _this.game.player.startShoot();
        }).bind(this);
    
        this.hexi.pointer.release = (function () {
            _this.game.player.stopShoot();
        }).bind(this);
    
        var spaceBar = this.hexi.keyboard(32);
    
        spaceBar.press = (function () {
            _this.game.player.startShoot();
        }).bind(this);
    
        spaceBar.release = (function () {
            _this.game.player.stopShoot();
        }).bind(this);
    
        var plusButton = this.hexi.keyboard(189);
        plusButton.press = (function () {
            _this.game.player.downgrade();
        }).bind(this);
    
        var minusButton = this.hexi.keyboard(187);
        minusButton.press = (function () {
            _this.game.player.upgrade();
        }).bind(this);
    
        var minusButton2 = this.hexi.keyboard(61);
        minusButton2.press = (function () {
            _this.game.player.upgrade();
        }).bind(this);
    
    
        var nextButton = this.hexi.keyboard(78);
        nextButton.press = (function () {
            _this.game.nextLevel();
        }).bind(this);

        var saveButton = this.hexi.keyboard(83);
        saveButton.press = (function () {
            _this.main.saveGame();
        }).bind(this);

        var loadButton = this.hexi.keyboard(76);
        loadButton.press = (function () {
            _this.main.loadGame();
        }).bind(this);
    }

    InputDevice.prototype.lifeTapped = function() {
        if (this.main.lifeCheatCounter < 0) {
            this.main.lifeCheatCounter = 0;
        }
        this.main.lifeCheatCounter+= 60;

        if (this.main.lifeCheatCounter > 600) {
            this.game.player.upgrade();
            this.main.lifeCheatCounter = 0;
        }
    };

    InputDevice.prototype.loadTapped = function() {
        this.main.loadGame();
    };

    InputDevice.prototype.storeTapped = function() {
        this.main.saveGame();
    };

    InputDevice.prototype.resetTapped = function() {
        this.main.game.resetGame();
    };

    InputDevice.prototype.nextLevelTapped = function() {
        if (this.main.nextLevelCheatCounter < 0) {
            this.main.nextLevelCheatCounter = 0;
        }
        this.main.nextLevelCheatCounter+= 60;

        if (this.main.nextLevelCheatCounter > 600) {
            this.game.nextLevel();
            this.main.nextLevelCheatCounter = 0;
        }
    };

    InputDevice.prototype.pauseTapped = function() {
        this.hexi.paused = !this.hexi.paused;
    };

    return InputDevice;
}());