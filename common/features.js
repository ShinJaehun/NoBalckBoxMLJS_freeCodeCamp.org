const features={};

features.getPathCount = (paths) => {
    return paths.length;
}

features.getPointCount=(paths)=>{
    const points=paths.flat(); // flatten of array of array?
    return points.length;
}

if(typeof module!=='undefined'){
    module.exports=features
}