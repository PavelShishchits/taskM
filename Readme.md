Template based on webpack 4
## Pug
Import mixins in main.pug template (block mixin)  
Don't inline images use path to image: img(src='./images/tabs_01.jpg' alt='alt')   
## Icons
1) inline svg as background image  
dir - svgCss/icon.svg  
usage -   
@include svg;  
@include svg-load('collapse-arrow.svg', 10px, 9px, $link-color);  
Icons are copied in images/svgCss dir which is watched by Postcss-inlinesvg plugin

2) inline svg as inline svg sprite  
dir - svg/icon.svg || ./images/svgIcons/*.svg (for icons which couldn't be included in js component)  
usage - svg(class='icon icon--iconName'> use(xlink:href='#iconName')  

3) png sprite  
dir - src/images/pngIcons. Generated files and styles template are in src/scss/utils/png
usage - sass: @include png; @include png-star-big;  
        pug: i.png-start-big
        
## Stylelint  
To disabled stylelint rules use:  
/* stylelint-disable */  
a {}  
/* stylelint-enable */

## Images  
Images that used in component store in img directory,  
source to all images is './images/*.*'

## Mocking data  
To mock data:  
1) create mockData.json file in component directory   
2) copy relative path of this file and insert in in mock:api npm script in package.json  
3) npm run mock:api