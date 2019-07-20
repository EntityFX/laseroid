"use strict";

var BonusShip = /** @class */ (function (_super) {
	__extends(BonusShip, _super);

	BonusShip.prototype.type = null;

	BonusShip.prototype.shipConfiguration = null;

	BonusShip.prototype.upgradeBonuses = null;

	BonusShip.prototype.movementEngine = null;

	function BonusShip($hexi, game, main, type) {
		var _this = _super.call(this, $hexi, game, main) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(_this.configuration.enemyConfiguration.bonusShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("resources/{0}/images/ships-texture.json".format(_this.resourcesPackage)).animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		this.upgradeBonus = deepCopy(_this.shipConfiguration.upgradeBonus);

		_this.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;

		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.hero.sprite, _this.shipConfiguration.movement, _this.configuration.enemyConfiguration.enemyMovementConfiguration);

		return _this;
	}

	BonusShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.remove();
		_super.prototype.hit.call(this, bullet);
		this.shootWithUpgrade(this.upgradeBonus);
	};

	BonusShip.prototype.shootWithUpgrade = function (upgradeBonus) {
		var _this = this;
		//_this.game.sounds.shoot.play();
		var upgradeBonusConfig = _this.configuration.enemyConfiguration.upgradeConfiguration[upgradeBonus.type];

		_this.hexi.shoot(
			_this.sprite, 1.57,
			_this.sprite.halfWidth + upgradeBonus.position.x, upgradeBonus.position.y,
			_this.hexi.stage, upgradeBonusConfig.speed,
			_this.game.enemyController.upgrades,
			(function () {

				var upgradeSprite = _this.hexi.sprite(upgradeBonusConfig.sprite
					? upgradeBonusConfig.sprite
					: _this.hexi.json("resources/{0}/images/bullet-texture.json".format(_this.game.resourcesPackage)).animations[upgradeBonusConfig.animatedSprite]);
				if (upgradeBonusConfig.animatedSprite) {
					upgradeSprite.playAnimation();
				}
				return upgradeSprite;
			}).bind(_this)
		);
	};

	BonusShip.prototype.update = function () {
		_super.prototype.update.call(this);

		if (this.sprite.parent == null) return;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.enemyBottom - Main.gameArea.padding
			}, true);

		this.movementEngine.update();
	};

	return BonusShip;
}(Ship));