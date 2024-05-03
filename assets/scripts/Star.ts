
import { _decorator, Component, Node, Sprite, Color, AudioSource } from 'cc';
import { Game } from './Game';
const { ccclass, property, type } = _decorator;

/**
 * Predefined variables
 * Name = Star
 * DateTime = Thu Sep 30 2021 16:20:49 GMT-0300 (Horário Padrão de Brasília)
 * Author = andremtm
 * FileBasename = Star.ts
 * FileBasenameNoExtension = Star
 * URL = db://assets/scripts/Star.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Star')
export class Star extends Component {
    // [1]
    // dummy = '';

    @property
    pickRadius = 0;

    @type(AudioSource)
    collectAudio : AudioSource | null = null;

    game: Game | null = null;

    update (_deltaTime: number) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
    }

    getPlayerDistance () : number {
        var playerPos = this.game.playerNode.getPosition();
        var dist = this.node.getPosition().subtract(playerPos).length();
        return dist;
    }

    onPicked () {
        this.collectAudio.play();
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    }
}
