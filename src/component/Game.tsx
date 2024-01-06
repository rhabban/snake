import React, {useState} from "react";
import {EMouvement, Snake} from "./Snake";
import Grid, {GridEntity} from "./Grid";
import {ICase} from "./Case";
import useInterval from "../hooks/useInterval";


function Game() {

    /* const [xMax, setXMax] = useState(9)
     const [yMax, setYMax] = useState(9)*/

    const [snakeState, setSnakeState] = useState({snake: new Snake([{posX: 0, posY: 0}])})
    const [grid, setGrid] = useState<GridEntity>(new GridEntity(9, 9))

    const [fruit, setFruit] = useState<ICase>({posX: 3, posY: 3})

    const [actionQueue, setActionQueue] = useState<EMouvement[]>(new Array<EMouvement>())

    const [lastAction, setLastAction] = useState<EMouvement>()

    useInterval({callback: () => handleAction(), delay: 1000})

    const handleAction = () => {
        console.log("handleAction");

        if (lastAction) {
            console.log(lastAction);
            let oldTail = snakeState.snake.position[0];
            let snake = snakeState.snake.move(lastAction)
            let snakeHeadPosition = snake.getHeadPosition();
            if (snakeHeadPosition.posX > grid.xMax - 1)
                snakeHeadPosition.posX = 0
            if (snakeHeadPosition.posX < 0)
                snakeHeadPosition.posX = grid.xMax - 1
            if (snakeHeadPosition.posY > grid.yMax - 1)
                snakeHeadPosition.posY = 0
            if (snakeHeadPosition.posY < 0)
                snakeHeadPosition.posY = grid.yMax - 1

            if (snakeHeadPosition.posX === fruit.posX && snakeHeadPosition.posY === fruit.posY) {
                snakeState.snake.position.unshift(oldTail)
            }

            setSnakeState({snake: snake});
        }
    }

    const onClickOnMove = (direction: EMouvement) => {

        setActionQueue([...actionQueue, direction])
        setLastAction(direction);

    }

    document.addEventListener('keydown',
        (e) => {
            //onClickOnMove(EMouvement.DOWN);
            console.log(e)
            if (e.key === "ArrowLeft")
                onClickOnMove(EMouvement.LEFT)
            if (e.key === "ArrowRight")
                onClickOnMove(EMouvement.RIGHT)
            if (e.key === "ArrowUp")
                onClickOnMove(EMouvement.UP)
            if (e.key === "ArrowDown")
                onClickOnMove(EMouvement.DOWN)
        });


    return (
        <>
            <h1>Welcome to Game</h1>
            <Grid grid={grid} snake={snakeState.snake}></Grid>
            <div>
                <button onClick={() => onClickOnMove(EMouvement.UP)}>UP</button>
            </div>
            <div>
                <button onClick={() => onClickOnMove(EMouvement.LEFT)}>LEFT</button>
                <button onClick={() => onClickOnMove(EMouvement.DOWN)}>DOWN</button>
                <button onClick={() => onClickOnMove(EMouvement.RIGHT)}>RIGHT</button>
            </div>
        </>
    )
}

export default Game
