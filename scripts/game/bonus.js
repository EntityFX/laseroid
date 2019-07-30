"use strict";

var Bonus = /** @class */ (function (_super) {
	__extends(Bonus, _super);

	Bonus.prototype.type = null;

	Bonus.prototype.shipConfiguration = null;

	Bonus.prototype.upgradeBonuses = null;

	Bonus.prototype.movementEngine = null;

	function Bonus($hexi, game, main, type) {
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

		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.player.sprite
			, _this.shipConfiguration.movement
			, _this.configuration.enemyConfiguration.enemyMovementConfiguration
			, _this.configuration.uiConfiguration.gameArea);

		return _this;
	}

	Bonus.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.remove();
		_super.prototype.hit.call(this, bullet);
		this.shootWithUpgrade(this.upgradeBonus);
	};

	Bonus.prototype.shootWithUpgrade = function (upgradeBonus) {
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

	Bonus.prototype.update = function () {
		_super.prototype.update.call(this);

		if (this.sprite.parent == null) return;

		var collision = this.hexi.contain(this.sprite,
			{
				x: this.configuration.uiConfiguration.gameArea.left + this.configuration.uiConfiguration.gameArea.padding,
				y: this.configuration.uiConfiguration.gameArea.top + this.configuration.uiConfiguration.gameArea.padding,
				width: this.hexi.canvas.width - this.configuration.uiConfiguration.gameArea.right - this.configuration.uiConfiguration.gameArea.padding,
				height: this.hexi.canvas.height - this.configuration.uiConfiguration.gameArea.enemyBottom - this.configuration.uiConfiguration.gameArea.padding
			}, true);

		this.movementEngine.update();
	};

	return Bonus;
}(Actor));