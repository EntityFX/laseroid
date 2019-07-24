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
		this.heroBullets = this.heroBullets.filter(function (bullet) {
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

		if (_this.heroLaser) {
			_this.heroLaser.beam.x = _this.game.hero.sprite.x - _this.heroLaser.beam.halfWidth;
			_this.heroLaser.shine.x = _this.game.hero.sprite.x - _this.heroLaser.shine.halfWidth;
			_this.heroLaser.timeToLive--;

			_this.game.enemyController.enemies.forEach(function (enemy) {
				if (_this.intersects(_this.heroLaser.beam, enemy.sprite)) {
					enemy.hit(_this.heroLaser);
				}
			})

			_this.game.enemyController.bonuses.forEach(function (bonus) {
				if (_this.intersects(_this.heroLaser.beam, bonus.sprite)) {
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

			//var hitResult = _this.hexi.hit(bullet, _this.game.hero.collisionSprite);
			var hitResult = _this.intersects(bullet, _this.game.hero.collisionSprite);
			if (hitResult) {
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


