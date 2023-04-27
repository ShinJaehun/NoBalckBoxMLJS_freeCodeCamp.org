const draw=require('../common/draw.js');
const constants=require('../common/constants.js');
const utils=require('../common/utils.js');

// 어쨌든 브라우저에서 실행할 것은 아니니까?
const {createCanvas} = require('canvas');
const canvas=createCanvas(400, 400);
const ctx=canvas.getContext('2d');

// const constants = {};

// constants.DATA_DIR="../data";
// constants.RAW_DIR=constants.DATA_DIR+'/raw';
// constants.DATASET_DIR=constants.DATA_DIR+'/dataset';
// constants.JSON_DIR=constants.DATASET_DIR+'/json';
// constants.IMG_DIR=constants.DATASET_DIR+'/img';
// constants.SAMPLES=constants.DATASET_DIR+'/samples.json';

// RAW_DIR의 파일을 읽어와서 content를 JSON 형식으로 parse하기
const fs = require('fs');
const fileNames=fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id=1;
fileNames.forEach(fn=>{
    const content = fs.readFileSync(
        constants.RAW_DIR+"/"+fn
    );
    const {session, student, drawings}=JSON.parse(content);

    // drawing는 이렇게 되어 있기 때문에
    // car:Array()
    //   0:Array()
    //   1:Array()
    //   ...
    // fish:Array()
    //   0:Array()
    //   .. 
    // 각 이미지만 추출하려면 label에 따라 꺼내야 함

    for (let label in drawings) {
        samples.push({
            id,
            label,
            sutdent_name: student,
            student_id: session
        });

        // drawings[label] 걍 label에 따라서 drawing 정보만 추출하기
        // fs.writeFileSync(
        //     constants.JSON_DIR+'/'+id+".json",
        //     JSON.stringify(drawings[label]) 
        // );

        const paths = drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR+'/'+id+".json",
            JSON.stringify(paths) 
        );

        generateImageFile(
            constants.IMG_DIR+'/'+id+'.png',
            paths
        )

        // 파일 생성 과정 화면에 출력하기
        utils.printProgress(id, fileNames.length*8); // 여기서 왜 8이여?
        id++;
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

// 데이터를 쉽게 접근하기 위해서 포맷을 변형
// JS는 이런게 좋은 거 같음...
fs.writeFileSync(constants.SAMPLES_JS, "const samples="+JSON.stringify(samples)+";");


function generateImageFile(outFile, paths) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#FFFFFF"; // 왜 이게 적용되지 않는걸까?
    draw.paths(ctx, paths);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
}