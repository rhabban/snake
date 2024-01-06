import Case, {ICase} from "./Case";
import React from "react";
import {Snake} from "./Snake";

export interface IGrid {
    xMax: number;
    yMax: number;

    cases: ICase[];
}

export class GridEntity implements IGrid {
    xMax: number;
    yMax: number;

    cases: ICase[];

    constructor(xMax: number, yMax: number) {
        this.xMax = xMax
        this.yMax = yMax

        let cases = new Array<ICase>();

        let x = 0
        while (x < xMax) {
            let y = 0
            while (y < yMax) {
                cases.push({posX: x, posY: y})
                y++;
            }
            x++;
        }

        this.cases = cases;
    }

    getAllLines(): Array<Array<ICase>> {
        let lines = new Array<Array<ICase>>();
        let y = 0;
        while (y < this.yMax) {
            lines.push(this.getLine(y));
            y++;
        }
        return lines;
    }

    getLine(line: number): Array<ICase> {
        return this.cases.filter(value => value.posY === line)
    }

}

function Grid({grid, snake}: { grid: GridEntity, snake: Snake }) {

    return (
        <>
            <div id={"grid"}>
                {
                    grid.getAllLines().map((line) => (
                        <Line key={line[0].posY} cases={line} snake={snake}/>
                    ))
                }
            </div>
        </>

    );

}

function Line({cases, snake}: { cases: ICase[], snake: Snake }) {

    const IsSnakeOnCase = (caseXY: ICase) => {
        const res = snake.position.find((position) => position.posX === caseXY.posX && position.posY === caseXY.posY);
        if (res)
            return true;
        return false
    }

    return (
        <div className={"line"}>
            {
                cases.map((item) => (
                    <Case key={item.posX + '-' + item.posY} caseData={item} isSnake={IsSnakeOnCase(item)}
                          isFruit={false}/>
                ))
            }
        </div>
    )

}

export default Grid
