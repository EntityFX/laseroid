"use strict";

/**
 * Main class
 * 
 * @class Main
 */
var InputDevice = /** @class */ (function () {
    InputDevice.prototype.hexi = null;
    InputDevice.prototype.game = null;

    function InputDevice($hexi, main) {
        var _this = this;
        _this.hexi = $hexi;
        _this.game = main.game;
	}

    InputDevice.prototype.init = function() {
        var _this = this;

        this.hexi.pointer.press = (function () {
            _this.game.hero.startShoot();
        }).bind(this);
    
        this.hexi.pointer.release = (function () {
            _this.game.hero.stopShoot();
        }).bind(this);
    
        var spaceBar = this.hexi.keyboard(32);
    
        spaceBar.press = (function () {
            _this.game.hero.startShoot();
        }).bind(this);
    
        spaceBar.release = (function () {
            _this.game.hero.stopShoot();
        }).bind(this);
    
        var plusButton = this.hexi.keyboard(189);
        plusButton.press = (function () {
            _this.game.hero.downgrade();
        }).bind(this);
    
        var minusButton = this.hexi.keyboard(187);
        minusButton.press = (function () {
            _this.game.hero.upgrade();
        }).bind(this);
    
        var minusButton2 = this.hexi.keyboard(61);
        minusButton2.press = (function () {
            _this.game.hero.upgrade();
        }).bind(this);
    
    
        var nextButton = this.hexi.keyboard(78);
        nextButton.press = (function () {
            _this.game.nextLevel();
        }).bind(this);
    }

    return InputDevice;
}());