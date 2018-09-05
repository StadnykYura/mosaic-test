// var ctx = canvas.getContext('2d'),
//     columns = 3,
//     rows = 3,
//     w, h, tileWidth, tileHeight;

// canvas.onresize = calcSize;
// canvas.onmousemove = highlight;

// calcSize();

// function checkBorderColor() {
//     let colorBtn = document.getElementById('bg-color');
//     return colorBtn.value;
// }
// function checkBlockColor() {
//     let colorBtn = document.getElementById('block-color');
//     return colorBtn.value;
// }

// document.getElementById('generate-btn').addEventListener('click', GenerateNew);

// function GenerateNew() {
//     ctx.strokeStyle = checkBorderColor();
//     ctx.fillStyle = checkBlockColor();
//     //    canvas.style.canvas = 'border: 1x solid ' + checkBorderColor();
//     render();
// }
// function calcSize() {
//     canvas.width = w = window.innerWidth / 2;
//     canvas.height = h = window.innerHeight / 2;

//     tileWidth = w / columns;
//     tileHeight = h / rows;

//     ctx.strokeStyle = '#929292';
//     ctx.fillStyle = '#ff7700';

//     render();
// }
// function render() {

//     ctx.clearRect(0, 0, w, h);

//     ctx.beginPath();

//     for (var x = 0; x < columns; x++) {
//         ctx.moveTo(x * tileWidth, 0);
//         ctx.lineTo(x * tileWidth, h);
//     }
//     for (var y = 0; y < rows; y++) {
//         ctx.moveTo(0, y * tileHeight);
//         ctx.lineTo(w, y * tileHeight);
//     }

//     ctx.stroke();
// }
// function highlight(e) {

//     var rect = canvas.getBoundingClientRect(),
//         mx = e.clientX - rect.left,
//         my = e.clientY - rect.top,

//         /// get index from mouse position
//         xIndex = Math.round((mx - tileWidth * 0.5) / tileWidth),
//         yIndex = Math.round((my - tileHeight * 0.5) / tileHeight);

//     render();

//     ctx.fillRect(xIndex * tileWidth,
//         yIndex * tileHeight,
//         tileWidth,
//         tileHeight);

// }

let parentRect = document.querySelector('.parent-rect').children[0];
let totalNumberOfBlocks = 1;
const MIN_NUMBER_OF_BLOCKS = 9;
const MAX_NUMBER_OF_BLOCKS = 40000;
const RANDOMLY_GENERATED_NUMBER_IN_RANGE = 100;

function generateGrid(parentBlock) {

    if (totalNumberOfBlocks < RANDOMLY_GENERATED_NUMBER_IN_RANGE) {

        // const rect = parentBlock.getBoundingClientRect();

        const parentW = parentBlock.offsetWidth;
        const parentH = parentBlock.offsetHeight;
        let childWidthBlockAPercent;
        let childHeightBlockAPercent;
        let childWidthBlockBPercent;
        let childHeightBlockBPercent;
        let childWidth;
        let childHeight;

        let randomPercentToDivide = getRandomIntInclusive(33, 66);
        if (parentW >= parentH) {
            childWidth = parentW * (randomPercentToDivide / 100);
        } else {
            childHeight = parentH * (randomPercentToDivide / 100);
        }

        if ((parentW >= 10 || parentH >= 10)) {

            // if (!parentBlock.className === 'parent-rect') {
            //     const newParentBlock = document.createElement('div');
            //     newParentBlock.setAttribute('class', 'parent-block');
            //     newParentBlock.setAttribute('width', parentW);
            //     newParentBlock.setAttribute('height', parentW);
            //     parentBlock.appendChild(newParentBlock);
            //     parentBlock = newParentBlock;
            // }

            if (parentW >= parentH) {
                childWidthBlockAPercent = randomPercentToDivide;
                childWidthBlockBPercent = 100 - childWidthBlockAPercent;
                parentBlock.style.gridTemplateColumns = `${(parentW * childWidthBlockAPercent / 100) - 1} ${(parentW * childWidthBlockBPercent / 100) - 1}`
                parentBlock.setAttribute('class', 'parent-block bigger_width');

                parentBlock.style.gridTemplateRows = `${parentH}`;
            } else {
                childHeightBlockAPercent = randomPercentToDivide;
                childHeightBlockBPercent = 100 - childHeightBlockAPercent;
                parentBlock.style.gridTemplateRows = `${(parentH * childHeightBlockAPercent/100) - 1} ${(parentH * childHeightBlockBPercent/100) - 1}`
                parentBlock.setAttribute('class', 'parent-block bigger_height');
                parentBlock.style.gridTemplateColumns = `${parentW}`;
            }


            totalNumberOfBlocks++;
            const divBlockA = document.createElement('div');
            divBlockA.setAttribute('class', 'child-block');
            divBlockA.setAttribute('id', totalNumberOfBlocks + 'a')
            // divBlockA.style.backgroundColor = 'white';

            const divBlockB = document.createElement('div');
            divBlockB.setAttribute('class', 'child-block');
            divBlockB.setAttribute('id', totalNumberOfBlocks + 'b')
            // divBlockB.style.backgroundColor = 'white';

            parentBlock.appendChild(divBlockA);
            parentBlock.appendChild(divBlockB);

            generateGrid(divBlockA);
            generateGrid(divBlockB);

        }
    }

}

generateGrid(parentRect);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let valueToMakeMaxInclusive = 1;
    return Math.floor(Math.random() * (max - min + valueToMakeMaxInclusive)) + min;
}
