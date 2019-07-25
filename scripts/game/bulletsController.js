"use strict";

var BulletsController = /** @class */ (function () {
	BulletsController.prototype.hexi = null;

	BulletsController.prototype.game = null;

	BulletsController.prototype.playerBullets = [];

	BulletsController.prototype.playerLaser = null;

	BulletsController.prototype.enemyBullets = [];

	BulletsController.prototype.explosionSplashes = [];

	function BulletsController($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	BulletsController.prototype.intersects = function (first, second) {
		var firstBounds = first.getBounds();
		var secondBounds = second.getBounds();
		var secondY1 = secondBounds.y + second.height;
		var secondX1 = secondBounds.x + second.width;
		var firstY1 = firstBounds.y + first.height;
		var firstX1 = firstBounds.x + first.width;
		var x1 = firstBounds.x >= secondBounds.x && firstBounds.x <= secondX1;
		var x2 = secondBounds.x >= firstBounds.x && secondBounds.x <= firstX1;
		var x3 = firstX1 >= secondBounds.x && firstX1 <= secondX1;
		var x4 = secondX1 >= firstBounds.x && secondX1 <= firstX1;
		var y1 = firstBounds.y >= secondBounds.y && firstBounds.y <= secondY1;
		var y2 = secondBounds.y >= firstBounds.y && secondBounds.y <= firstY1;
		var y3 = firstY1 >= secondBounds.y && firstY1 <= secondY1;
		var y4 = secondY1 >= firstBounds.y && secondY1 <= firstY1;

		return (x1 || x2 || x3 || x4) && (y1 || y2 || y3 || y4);
	}

	BulletsController.prototype.update = function () {
		var _this = this;

		this.updatePlayerBullets();
		this.updateEnemyBullets();
		this.updatePlayerLaser();
		this.updateExplosions();

		this.hexi.move(this.playerBullets);
		this.hexi.move(this.enemyBullets);
	};

	BulletsController.prototype.updatePlayerBullets = function () {
		var _this = this;
		this.playerBullets = this.playerBullets.filter(function (bullet) {
			if (bullet.y < -bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			_this.game.enemyController.enemies.forEach(function (enemy) {
				if (_this.intersects(bullet, enemy.sprite)) {
					enemy.hit(bullet);
				}
			})

			_this.game.enemyController.bonuses.forEach(function (bonus) {
				if (_this.intersects(bullet, bonus.sprite)) {
					bonus.hit(bullet);
				}
			})

			return bullet.parent;
		});
	};

	BulletsController.prototype.updateEnemyBullets = function () {
		var _this = this;
		this.enemyBullets = this.enemyBullets.filter(function (bullet) {

			if (bullet.y >= _this.hexi.canvas.height + bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			//var hitResult = _this.hexi.hit(bullet, _this.game.player.collisionSprite);
			var hitResult = _this.intersects(bullet, _this.game.player.collisionSprite);
			if (hitResult) {
				_this.game.player.hit(bullet);
			}

			return bullet.parent;
		});
	};

	BulletsController.prototype.updatePlayerLaser = function () {
		var _this = this;
		if (!_this.playerLaser) {
			return;
		}
		_this.playerLaser.beam.x = _this.game.player.sprite.x - _this.playerLaser.beam.halfWidth;
		_this.playerLaser.shine.x = _this.game.player.sprite.x - _this.playerLaser.shine.halfWidth;
		_this.playerLaser.timeToLive--;

		_this.game.enemyController.enemies.forEach(function (enemy) {
			if (_this.intersects(_this.playerLaser.beam, enemy.sprite)) {
				enemy.hit(_this.playerLaser);
			}
		})

		_this.game.enemyController.bonuses.forEach(function (bonus) {
			if (_this.intersects(_this.playerLaser.beam, bonus.sprite)) {
				bonus.hit(_this.playerLaser);
			}
		})

		if (_this.playerLaser.timeToLive <= 0) {
			_this.hexi.stage.remove(_this.playerLaser.beam);
			_this.hexi.stage.remove(_this.playerLaser.shine);
			_this.playerLaser.beam.alpha = _this.playerLaser.timeToLive % 2 === 1 ? 1 : 0.1;
			_this.playerLaser = null;
		}
	};

	BulletsController.prototype.updateExplosions = function () {
		var _this = this;
		this.explosionSplashes = this.explosionSplashes.filter(function (explosionSplash) {
			explosionSplash.ticks++;

			if (explosionSplash.ticks > 18) {
				_this.hexi.stage.remove(explosionSplash);
			}
			return explosionSplash.parent;
		});
	};

	BulletsController.prototype.clear = function () {
		var _this = this;
		this.enemyBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.enemyBullets = [];

		this.playerBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.playerBullets = [];
	};

	return BulletsController;
}());


