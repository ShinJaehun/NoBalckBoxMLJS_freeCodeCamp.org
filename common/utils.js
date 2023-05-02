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

if(typeof module !== 'undefined') {
    module.exports = utils;
}