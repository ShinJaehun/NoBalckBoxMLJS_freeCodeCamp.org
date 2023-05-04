const constants = require('../common/constants.js');
const featureFunctions = require('../common/featureFunctions.js');
const utils=require('../common/utils.js');
const fs = require('fs');

console.log("EXTRACTING FEATURES ...");

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

// 아웃라이어 하나를 삭제했는데 전체 데이터의 분포가 달라짐...
// 그리고 삭제 전에 매칭되었던 class와 다른 class로 매칭됨
// const samples = JSON.parse(
//     fs.readFileSync(constants.SAMPLES)
// ).filter(s=>s.id!=3107);


// 그래서 원래 samples는 이런 모양이었는데
// [
//     {
//         "id": 1,
//         "label": "car",
//         "student_name": "Radu",
//         "student_id": 1663053145814
//     },
//     {
//         "id": 2,
//         "label": "fish",
//         "student_name": "Radu",
//         "student_id": 1663053145814
//     },
//     {
//         "id": 3,
//         "label": "house",
//         "student_name": "Radu",
//         "student_id": 1663053145814
//     },
// ...

for (const sample of samples) {
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json"
        )
    );

    // generalized
    // 이런게 고급 기능! 함수 mapping?
    const functions=featureFunctions.inUse.map(f=>f.function);
    sample.point=functions.map(f=>f(paths));

    // sample.point=[
    //     featureFunctions.getPathCount(paths),
    //     featureFunctions.getPointCount(paths)
    // ];
}

// console.log(samples);

// 고급 기능? map을 거치면서 각 element에 point를 붙임
// [
//     {
//       id: 1,
//       label: 'car',
//       student_name: 'Radu',
//       student_id: 1663053145814,
//       point: [ 5, 883 ]  // <---- 얘는 path count와 point count
//     },
//     {
//       id: 2,
//       label: 'fish',
//       student_name: 'Radu',
//       student_id: 1663053145814,
//       point: [ 4, 596 ]
//     },
//     {
//       id: 3,
//       label: 'house',
//       student_name: 'Radu',
//       student_id: 1663053145814,
//       point: [ 8, 571 ]
//     },
// ...

// const minMax=utils.normalizePoints(
//     samples.map(s=>s.point)
// );

// normalize 과정을 거치면서 data는 0과 1 사이 값으로 변경됨!
// {
//     "featureNames": [
//         "Path Count",
//         "Point Count"
//     ],
//     "samples": [
//         {
//             "point": [
//                 0.018604651162790697,
//                 0.057616156282998945
//             ],
//             "label": "car"
//         },
//         {
//             "point": [
//                 0.013953488372093023,
//                 0.03867476240760296
//             ],
//             "label": "fish"
//         },

const featureNames = featureFunctions.inUse.map(f=>f.name);
// const featureNames = ["Path Count", "Point Count"];

console.log("generating splits ...");

const trainingAmount=samples.length*0.5;

const training=[];
const testing=[];

for(let i=0;i<samples.length;i++){
    if(i<trainingAmount){
        training.push(samples[i]);
    }else{
        testing.push(samples[i]);
    }
}

const minMax=utils.normalizePoints(
    training.map(s=>s.point)
);

utils.normalizePoints(
    testing.map(s=>s.point), minMax
);

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featureNames,
        samples:samples.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

// 어쨌든 이렇게 뽑아낸 minMax 값은 const minMax={"min":[1,10],"max":[216,15162]};
fs.writeFileSync(constants.FEATURES_JS,
    `const features=
    ${JSON.stringify({featureNames, samples})}
    ;`
);

fs.writeFileSync(constants.TRAINING,
    JSON.stringify({
        featureNames,
        samples:training.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(constants.TRAINING_JS,
    `const training=
    ${JSON.stringify({featureNames, samples:training})}
    ;`
);

fs.writeFileSync(constants.TESTING,
    JSON.stringify({
        featureNames,
        samples:testing.map(s=>{
            return {
                point:s.point,
                label:s.label
            };
        })
    })
);

fs.writeFileSync(constants.TESTING_JS,
    `const testing=
    ${JSON.stringify({featureNames, samples:testing})}
    ;`
);

fs.writeFileSync(constants.MIN_MAX_JS, 
    `const minMax=${JSON.stringify(minMax)};`);

console.log("DONE");