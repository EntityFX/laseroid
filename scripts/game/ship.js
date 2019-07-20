"use strict";

var Ship = /** @class */ (function () {

	Ship.prototype.hexi = null;

	Ship.prototype.sprite = null;

    Ship.prototype.game = null;
    
    Ship.prototype.configuration = null;

    Ship.prototype.resourcesPackage = null;

    Ship.prototype.sounds = null;

	Ship.prototype.life = 1;

	function Ship($hexi, game, main) {
		this.hexi = $hexi;
        this.game = game;
        this.resourcesPackage = main.resourcesPackage;
        this.gameScene = main.gameScene;
        this.configuration = main.configuration;
        this.sounds = main.sounds;
	}

	Ship.prototype.move = function () {
	}


	Ship.prototype.update = function () {
	}

	Ship.prototype.setPosition = function (position) {
		this.sprite.setPosition(position.x, position.y);
	};

	Ship.prototype.remove = function () {
		this.gameScene.removeChild(this.sprite);
	};

	Ship.prototype.hit = function (bullet) {
		var _this = this;
		var explosionSplashSprite = this.hexi.sprite(
            this.hexi.json("resources/{0}/images/bullet-texture.json".format(_this.resourcesPackage)).animations["Explosion"]);

		if (bullet.type == "laser") {
			this.sprite.putCenter(explosionSplashSprite, 0, 0);
		} else {
			bullet.putCenter(explosionSplashSprite, 0, 0);
		}
		explosionSplashSprite.playAnimation();
		explosionSplashSprite.ticks = 0;
		this.game.explosionSplashes.push(explosionSplashSprite);
		this.sounds["explode"].play();
	};

	return Ship;
}());