"use strict";

var Actor = /** @class */ (function () {

	Actor.prototype.hexi = null;

	Actor.prototype.sprite = null;

    Actor.prototype.game = null;
    
    Actor.prototype.configuration = null;

    Actor.prototype.resourcesPackage = null;

    Actor.prototype.sounds = null;

	Actor.prototype.life = 1;

	function Actor($hexi, game, main) {
		this.hexi = $hexi;
        this.game = game;
        this.resourcesPackage = main.resourcesPackage;
        this.gameScene = main.gameScene;
        this.configuration = main.configuration;
        this.sounds = main.sounds;
	}

	Actor.prototype.move = function () {
	}


	Actor.prototype.update = function () {
	}

	Actor.prototype.setPosition = function (position) {
		this.sprite.setPosition(position.x, position.y);
	};

	Actor.prototype.remove = function () {
		this.gameScene.removeChild(this.sprite);
	};

	Actor.prototype.hit = function (bullet) {
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
		_this.game.bulletsController.explosionSplashes.push(explosionSplashSprite);
		this.sounds["explode"].play();
	};

	return Actor;
}());