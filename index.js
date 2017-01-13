const Xray = require("x-ray");
const fs = require('fs');
const Download = require('download');

let xray = new Xray();

xray( 'https://en.wikipedia.org/wiki/Pluto', 'img',
    [{
        img: '',
        src: '@src',
        width: '@width',
        height: '@height'
    }]
)
( ( err, results ) => {
    let images = results.filter( ( image ) => {
      return image.width > 100;
    } ).forEach( ( image ) => {
      // Download scraped images
      Download( image.src, './images' ).then(() => {
      	// console.log( 'done!', image.src );
      });
    } );
    // Write to json file
    fs.writeFile("./results.json", JSON.stringify( results, null, '\t' ) );
})
