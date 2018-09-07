const MIN_NUMBER_OF_BLOCKS = 9;
const MAX_NUMBER_OF_BLOCKS = 100;
const LOWER_RANGE_FOR_DIVIDING_BLOCK = 25;
const UPPER_RANGE_FOR_DIIVIDING_BLOCK = 75;
const HUNDRED_PERCENT = 100;
const PXL_TO_CUT_DIVIDED_BLOCKS = 2;
const STARTING_NUMBER_OF_BLOCKS = 1;
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
        let childWidthA;
        let childHeightA;
        let childWidthB;
        let childHeightB;

        let randomPercentToDivide = getRandomIntInclusive(
            LOWER_RANGE_FOR_DIVIDING_BLOCK, UPPER_RANGE_FOR_DIIVIDING_BLOCK);

        // condition to get out from recursion (need to be improved)
        if (parentW * parentH > coeficientOfDividing) {

            if (parentW >= parentH) {
                childWidthBlockAPercent = randomPercentToDivide;
                childWidthBlockBPercent = HUNDRED_PERCENT - childWidthBlockAPercent;
                childWidthA = parentW * childWidthBlockAPercent / HUNDRED_PERCENT - PXL_TO_CUT_DIVIDED_BLOCKS;
                childWidthB = parentW * childWidthBlockBPercent / HUNDRED_PERCENT - PXL_TO_CUT_DIVIDED_BLOCKS;
                parentBlock.style.gridTemplateColumns = `${childWidthA}px ${childWidthB}px`
                parentBlock.setAttribute('class', 'parent-block bigger_width');
                parentBlock.style.gridTemplateRows = `${parentH}px`;
            } else {
                childHeightBlockAPercent = randomPercentToDivide;
                childHeightBlockBPercent = HUNDRED_PERCENT - childHeightBlockAPercent;
                childHeightA = parentH * childHeightBlockAPercent / HUNDRED_PERCENT - PXL_TO_CUT_DIVIDED_BLOCKS;
                childHeightB = parentH * childHeightBlockBPercent / HUNDRED_PERCENT; -PXL_TO_CUT_DIVIDED_BLOCKS;
                parentBlock.style.gridTemplateRows = `${childHeightA}px ${childHeightB}px`
                parentBlock.setAttribute('class', 'parent-block bigger_height');
                parentBlock.style.gridTemplateColumns = `${parentW}px`;
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
    let parentBlock = document.querySelector('.parent-rect').firstElementChild;
    coeficientOfDividing = parentBlock.offsetWidth * parentBlock.offsetHeight / randomNumber;

    if (totalNumberOfBlocks !== STARTING_NUMBER_OF_BLOCKS) {
        totalNumberOfBlocks = STARTING_NUMBER_OF_BLOCKS;
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


let fragmentColorInputEl = document.getElementById('block-color');

fragmentColorInputEl.addEventListener('input', changeBlockColor);

function makingActive(e) {

    if (activeItem) {
        activeItem.setAttribute('class', 'child-block not-active-item');
    }

    activeItem = e.target;
    let fragmentColor = activeItem.style.backgroundColor;
    let rgb = fragmentColor.split(',');
    fragmentColorInputEl.value = rgb.length !== 3 ? "#ffffff" : rgbToHex(rgb[0].substring(4), rgb[1].trim(), rgb[2].substring(1,4));
    activeItem.setAttribute('class', 'child-block active-item');
    // fragmentColorInputEl.click();
}


function changeBlockColor(e) {
    let colorBtnColor = document.getElementById('block-color').value;
    activeItem.style.backgroundColor = colorBtnColor;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let valueToMakeMaxInclusive = 1;
    return Math.floor(Math.random() * (max - min + valueToMakeMaxInclusive)) + min;
}

function componentToHex(c) {
    let hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
