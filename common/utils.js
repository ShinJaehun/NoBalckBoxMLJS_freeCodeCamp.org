const utils = {};

utils.flaggedUsers=[];

// for google chart
// utils.styles={
//     car:'gray',
//     fish: 'red',
//     house: 'yellow',
//     tree: 'green',
//     bicycle: 'cyan',
//     guitar: 'blue',
//     pencil: 'magenta',
//     clock: 'lightgray',
// };

// for custom chart
utils.styles={
    car: { color: 'gray', text: '🚗' },
    fish: { color: 'red', text: '🐟' },
    house: { color: 'yellow', text: '🏠' },
    tree: { color: 'green', text: '🌳' },
    bicycle: { color: 'cyan', text: '🚲' },
    guitar: { color: 'blue', text: '🎸' },
    pencil: { color: 'magenta', text: '✏️' },
    clock: { color: 'lightgray', text: '⏰' },
};

utils.formatPercent = (n) => {
    return (n*100).toFixed(2)+"%";
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(
        count/max
    );
    process.stdout.write(count+"/"+max+" ("+percent+")");

    if (count == max) {
        process.stdout.write('\n');
    }
}

utils.groupBy=(objArray, key) => {
    const groups = {};
    for (let obj of objArray) {
        const val = obj[key];
        if (groups[val] == null) {
            groups[val] = [];
        }
        groups[val].push(obj);       
    }
    return groups;
}

// chart/math.js에서 복사해 온거... 매우 유용하게 사용 가능!
utils.distance=(p1,p2)=>{
    return Math.sqrt(
        (p1[0] - p2[0]) ** 2 +
        (p1[1] - p2[1]) ** 2
    );
}

utils.getNearest = (loc, points) => {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearestIndex = 0;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const d = utils.distance(loc, point);

        if (d < minDist) {
            minDist = d;
            nearestIndex = i;
        }
    }
    return nearestIndex;
}

if(typeof module !== 'undefined') {
    module.exports = utils;
}