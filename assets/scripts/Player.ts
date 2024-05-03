import { _decorator, Component, Node, tween, Vec3, systemEvent, SystemEvent, EventKeyboard, KeyCode, AudioSource } from 'cc';
const { ccclass, property, type } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Thu Sep 30 2021 14:36:17 GMT-0300 (Horário Padrão de Brasília)
 * Author = andremtm
 * FileBasename = Player.ts
 * FileBasenameNoExtension = Player
 * URL = db://assets/scripts/Player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Player')
export class Player extends Component {
    @property
    jumpHeight = 0;

    @property
    jumpDuration = 0;

    @property
    maxMoveSpeed = 0;

    @property
    accel = 0;

    @type(AudioSource)
    jumpAudio: AudioSource | null = null;

    jumping = false;
    xSpeed = 0;
    accRight = false;
    accLeft = false;

    start () {
        // Initialize the keyboard input listening
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // var jumpAction = this.runJumpAction();
        // tween(this.node).then(jumpAction).start();
    }

    jump () {
        if (this.jumping) return;
        this.jumping = true;
        this.jumpAudio.play();
        tween(this.node).sequence(
            tween().by(this.jumpDuration, { position: new Vec3(0, this.jumpHeight, 0) }, { easing: 'sineOut' }),
            tween().by(this.jumpDuration, { position: new Vec3(0, -this.jumpHeight, 0) }, { easing: 'sineIn' })
        ).call(() => {
            this.jumping = false;
        }).start()
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = false;
                break;
            case KeyCode.KEY_D:
                this.accRight = false;
                break;
        }
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.accLeft = true;
                break;
            case KeyCode.KEY_D:
                this.accRight = true;
                break;
            case KeyCode.KEY_W:
                this.jump();
                break;
        }
    }

    update (deltaTime: number) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * deltaTime;
        } else if (this.accRight) {
            this.xSpeed += this.accel * deltaTime;
        } else if (this.xSpeed !== 0) {
            const deaccel = this.accel * deltaTime; 
            this.xSpeed += this.xSpeed > 0 ? deaccel * -1 : deaccel;
            if (Math.abs(this.xSpeed) < 5) {
                this.xSpeed = 0;
            }
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.xSpeed > 0 ? this.maxMoveSpeed : -this.maxMoveSpeed;
        }
        const move = this.xSpeed * deltaTime;
        this.node.setPosition(
            this.node.position.x + move,
            this.node.position.y
        )
    }

    onDestroy () {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
}
