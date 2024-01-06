export interface ICase {
    posX: number;
    posY: number;
}

function Case({caseData, isSnake}: { caseData: ICase, isSnake: boolean, isFruit: boolean }) {

    return (
        <>
            <div className={isSnake ? "case snake" : "case"}>
                X : {caseData.posX}, Y : {caseData.posY}
            </div>
        </>
    );

}

export default Case
