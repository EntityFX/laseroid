var GameStorage = /** @class */ (function () {

    GameStorage.prototype.hexi;

    GameStorage.prototype.main;

    function GameStorage($hexi, main) {
        var _this = this;
        _this.hexi = $hexi;
        _this.main = main;
    }

    GameStorage.prototype.save = function() {
        var storeObject = {
            "life" : this.main.game.player.life,
            "wave" : this.main.game.level.wave,
            "scorePoints" : this.main.game.score.points,
            "gameTimeSeconds" : this.main.gameTimeSeconds,
            "enemies" : [],
            "bonuses" : []
        };
        localStorage.setItem("save.0", JSON.stringify(storeObject));
    };

    GameStorage.prototype.load = function() {
        var storedObjectJson = localStorage.getItem("save.0");
        return storedObjectJson ? JSON.parse(storedObjectJson) : null;
    };

    return GameStorage;
}());