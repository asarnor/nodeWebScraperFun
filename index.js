const Xray = require("x-ray");
const fs = require('fs');
const Download = require('download');

let xray = new Xray();

xray('https://en.wikipedia.org/wiki/Pluto', 'img',
    [{
        img: '',
        src: '@src',
        width: '@width',
        height: '@height'
    }]
)
(function(err, results){
    console.log( 'error:', err);
    console.log( 'results:', results);
    results = results.filter(function(image){
        return image.width > 100;
    }).forEach(function(image){
        Download(image.src, './images');
    });
    fs.writeFile("./results.json", JSON.stringify(results, null, '\t'));
})
