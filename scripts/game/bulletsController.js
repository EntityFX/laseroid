"use strict";

var BulletsController = /** @class */ (function () {
	BulletsController.prototype.hexi = null;

	BulletsController.prototype.game = null;

	BulletsController.prototype.heroBullets = [];

	BulletsController.prototype.heroLaser = null;

	BulletsController.prototype.enemyBullets = [];

	function BulletsController($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	BulletsController.prototype.update = function () {
		var _this = this;
		this.heroBullets = this.heroBullets.filter(function (bullet) {
			if (bullet.y < -bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			_this.game.enemyController.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(bullet, enemy.sprite)) {
					enemy.hit(bullet);
				}
			})

			_this.game.enemyController.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(bullet, bonus.sprite)) {
					bonus.hit(bullet);
				}
			})

			return bullet.parent;
		});

		if (_this.heroLaser) {
			_this.heroLaser.beam.x = _this.game.hero.sprite.x - _this.heroLaser.beam.halfWidth;
			_this.heroLaser.shine.x = _this.game.hero.sprite.x - _this.heroLaser.shine.halfWidth;
			_this.heroLaser.timeToLive--;

			_this.game.enemyController.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, enemy.sprite)) {
					enemy.hit(_this.heroLaser);
				}
			})

			_this.game.enemyController.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, bonus.sprite)) {
					bonus.hit(_this.heroLaser);
				}
			})

			if (_this.heroLaser.timeToLive <= 0) {
				_this.hexi.stage.remove(_this.heroLaser.beam);
				_this.hexi.stage.remove(_this.heroLaser.shine);
				_this.heroLaser.beam.alpha = _this.heroLaser.timeToLive % 2 === 1 ? 1 : 0.1;
				_this.heroLaser = null;
			}
		}

		this.enemyBullets = this.enemyBullets.filter(function (bullet) {

			if (bullet.y >= _this.hexi.canvas.height + bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			if (_this.hexi.hitTestRectangle(bullet, _this.game.hero.collisionSprite)) {
				_this.game.hero.hit(bullet);
			}

			return bullet.parent;
		});

		this.hexi.move(this.heroBullets);
		this.hexi.move(this.enemyBullets);
	};

	BulletsController.prototype.clear = function () {
		var _this = this;
		this.enemyBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.enemyBullets = [];

		this.heroBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.heroBullets = [];
	};

	return BulletsController;
}());


