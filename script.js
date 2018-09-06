let parentRect = document.querySelector('.parent-rect').children[0];

const MIN_NUMBER_OF_BLOCKS = 9;
const MAX_NUMBER_OF_BLOCKS = 500;
let randomNumber;
let coeficientOfDividing;
let totalNumberOfBlocks = 1;


let activeItem;

function generateGrid(parentBlock) {

    // condition to get out from recursion (need to be improved)
    if (totalNumberOfBlocks < randomNumber) {

        const parentW = parentBlock.offsetWidth;
        const parentH = parentBlock.offsetHeight;
        let childWidthBlockAPercent;
        let childHeightBlockAPercent;
        let childWidthBlockBPercent;
        let childHeightBlockBPercent;
        let childWidth;
        let childHeight;

        let randomPercentToDivide = getRandomIntInclusive(25, 75);

        // condition to get out from recursion (need to be improved)
        if ((parentW * parentH > coeficientOfDividing)) {

            if (parentW >= parentH) {
                childWidthBlockAPercent = randomPercentToDivide;
                childWidthBlockBPercent = 100 - childWidthBlockAPercent;
                parentBlock.style.gridTemplateColumns = `${(parentW * childWidthBlockAPercent / 100) - 1.5} ${(parentW * childWidthBlockBPercent / 100) - 1.5}`
                parentBlock.setAttribute('class', 'parent-block bigger_width');
                parentBlock.style.gridTemplateRows = `${parentH}`;
                parentBlock.removeEvent
            } else {
                childHeightBlockAPercent = randomPercentToDivide;
                childHeightBlockBPercent = 100 - childHeightBlockAPercent;
                parentBlock.style.gridTemplateRows = `${(parentH * childHeightBlockAPercent / 100) - 1.5} ${(parentH * childHeightBlockBPercent / 100) - 1.5}`
                parentBlock.setAttribute('class', 'parent-block bigger_height');
                parentBlock.style.gridTemplateColumns = `${parentW}`;
            }


            totalNumberOfBlocks++;
            const divBlockA = document.createElement('div');
            divBlockA.setAttribute('class', 'child-block');
            divBlockA.setAttribute('id', totalNumberOfBlocks + 'a');

            const divBlockB = document.createElement('div');
            divBlockB.setAttribute('class', 'child-block');
            divBlockB.setAttribute('id', totalNumberOfBlocks + 'b');

            divBlockA.addEventListener('click', makingActive);
            divBlockB.addEventListener('click', makingActive);
            parentBlock.removeEventListener('click', makingActive);

            parentBlock.appendChild(divBlockA);
            parentBlock.appendChild(divBlockB);

            generateGrid(divBlockA);
            generateGrid(divBlockB);

        }
    }

}
document.getElementById('generate-btn').addEventListener('click', function () {

    randomNumber = getRandomIntInclusive(MIN_NUMBER_OF_BLOCKS, MAX_NUMBER_OF_BLOCKS);
    let parentBlock = document.querySelector('.parent-rect').children[0];
    coeficientOfDividing = parentBlock.offsetWidth * parentBlock.offsetHeight / randomNumber;;

    if (totalNumberOfBlocks !== 1) {
        totalNumberOfBlocks = 1;
        let mainRect = parentBlock.parentElement;
        mainRect.removeChild(parentBlock);
        const newParentBlock = document.createElement('div');
        newParentBlock.setAttribute('class', 'parent-block-start');
        mainRect.appendChild(newParentBlock);
        parentBlock = document.querySelector('.parent-block-start');
    }
    generateGrid(parentBlock);


});

function changeBackgroundColor(e) {

    let colorBtnColor = document.getElementById('bg-color').value;
    let mainRect = document.querySelector('.parent-rect');
    mainRect.style.backgroundColor = colorBtnColor;

}
let backGroundInputEl = document.getElementById('bg-color');
backGroundInputEl.addEventListener('input', changeBackgroundColor);

function makingActive(e) {
    if (activeItem) {
        activeItem.setAttribute('class', 'child-block not-active-item');
    }
    activeItem = e.target;
    activeItem.setAttribute('class', 'child-block active-item');
    fragmentColorInputEl.click();

}

function changeBlockColor(e) {
    let colorBtnColor = document.getElementById('block-color').value;
    activeItem.style.backgroundColor = colorBtnColor;
}

let fragmentColorInputEl = document.getElementById('block-color');

fragmentColorInputEl.addEventListener('input', changeBlockColor);


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let valueToMakeMaxInclusive = 1;
    return Math.floor(Math.random() * (max - min + valueToMakeMaxInclusive)) + min;
}
