let parentRect = document.querySelector('.parent-rect').children[0];
let totalNumberOfBlocks = 1;
const MIN_NUMBER_OF_BLOCKS = 9;
const MAX_NUMBER_OF_BLOCKS = 40000;

// play with this number to get count of needed blocks ( can be from range 9 - 40000)
const RANDOMLY_GENERATED_NUMBER_IN_RANGE = 100;

function generateGrid(parentBlock) {

    // condition to get out from recursion (need to be improved)
    if (totalNumberOfBlocks < RANDOMLY_GENERATED_NUMBER_IN_RANGE) {

        const parentW = parentBlock.offsetWidth;
        const parentH = parentBlock.offsetHeight;
        let childWidthBlockAPercent;
        let childHeightBlockAPercent;
        let childWidthBlockBPercent;
        let childHeightBlockBPercent;
        let childWidth;
        let childHeight;

        let randomPercentToDivide = getRandomIntInclusive(33, 66);
        // if (parentW >= parentH) {
        //     childWidth = parentW * (randomPercentToDivide / 100);
        // } else {
        //     childHeight = parentH * (randomPercentToDivide / 100);
        // }

        // condition to get out from recursion (need to be improved)
        if ((parentW >= 50 || parentH >= 50)) {

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
            divBlockA.setAttribute('id', totalNumberOfBlocks + 'a');

            const divBlockB = document.createElement('div');
            divBlockB.setAttribute('class', 'child-block');
            divBlockB.setAttribute('id', totalNumberOfBlocks + 'b');

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
