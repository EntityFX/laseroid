"use strict";

var EnemyController= /** @class */ (function () {
	EnemyController.prototype.hexi = null;

	EnemyController.prototype.game = null;

	EnemyController.prototype.enemies = [];

	EnemyController.prototype.bonuses = [];

    EnemyController.prototype.upgrades = [];

	function EnemyController($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	EnemyController.prototype.update = function () {
		var _this = this;
		this.enemies = this.enemies.filter(function (enemy) {
			enemy.update();
			return enemy.life > 0;
		});

		this.bonuses = this.bonuses.filter(function (bonus) {
			bonus.update();
			return bonus.sprite.parent;
		});


		this.upgrades = this.upgrades.filter(function (upgradeItem) {
			if (upgradeItem.y >= _this.hexi.canvas.height + upgradeItem.height) {
				_this.hexi.stage.remove(upgradeItem);
			}

			if (_this.hexi.hitTestRectangle(upgradeItem, _this.game.hero.collisionSprite)) {
				_this.game.hero.hitUpgrade(upgradeItem);
			}
			return upgradeItem.parent;
		});

		this.hexi.move(this.upgrades);
	};

	EnemyController.prototype.clear = function () {
		var _this = this;
		this.enemies.forEach(function (enemy) {
			enemy.remove();
		});
		this.enemies = [];

		this.bonuses.forEach(function (bonus) {
			bonus.remove();
		});
		this.bonuses = [];

		this.upgrades.forEach(function (upgrade) {
			_this.hexi.stage.removeChild(upgrade);
		});
		this.upgrades = [];
	};

	EnemyController.prototype.isLevelCompleted = function () {
		return this.enemies.length == 0 && this.bonuses.length == 0 && this.upgrades.length == 0
	}

	return EnemyController;
}());