"use strict";

var WeaponedActor = /** @class */ (function (_super) {
	__extends(WeaponedActor, _super);

	WeaponedActor.prototype.isWeaponShooting = false;

	WeaponedActor.prototype.canShot = false;

	WeaponedActor.prototype.automatedWeapons = [];

	function WeaponedActor($hexi, game, main) {
		return _super !== null && _super.apply(this, arguments) || this;
	}

	WeaponedActor.prototype.startShoot = function () {
		this.isWeaponShooting = true;
		this.canShot = true;
		this.onShootStarted();
	}

	WeaponedActor.prototype.onShootStarted = function () {
	}

	WeaponedActor.prototype.stopShoot = function () {
		this.isWeaponShooting = false;
		this.onShootStopped();
	}

	WeaponedActor.prototype.onShootStopped = function () {
	}

	WeaponedActor.prototype.updateShooting = function () {
	};

	WeaponedActor.prototype.remove = function () {
		this.isWeaponShooting = false;
		this.life = 0;
		_super.prototype.remove.call(this);
	};

	return WeaponedActor;
}(Actor));