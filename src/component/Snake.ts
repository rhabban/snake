import {ICase} from "./Case";

export enum EMouvement {
    DEBUG, LEFT, RIGHT, UP, DOWN
}

export class Snake {
    position: ICase[]

    constructor(position: ICase[]) {
        this.position = position;
    }

    public getHeadPosition() {
        return this.position[this.position.length - 1];
    }

    public move(mouvement: EMouvement) {
        const headPosition = this.position[this.position.length - 1]
        let newPosition: ICase;
        switch (mouvement) {
            case EMouvement.DOWN:
                newPosition = {...headPosition, posY: headPosition.posY + 1}
                break;
            case EMouvement.UP:
                newPosition = {...headPosition, posY: headPosition.posY - 1}
                break;
            case EMouvement.LEFT:
                newPosition = {...headPosition, posX: headPosition.posX - 1}
                break;
            case EMouvement.RIGHT:
                newPosition = {...headPosition, posX: headPosition.posX + 1}
                break;
            default:
                newPosition = {...headPosition}
                break;
        }

        this.position.push(newPosition); // Add position of the head at the end of the list
        this.position.shift(); // Remove position of the tail as first element in list

        return this;
    }
}