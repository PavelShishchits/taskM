Template based on webpack 4

## Svg icons
1) inline svg as background image  
dir - svgCss/icon.svg  
usage - background-image: svg-load('svgCss/close.svg', fill=#000, stroke=#e5e5e5);

2) inline svg as inline svg sprite  
dir - svg/icon.svg || ./images/svgIcons/*.svg (for icons which couldn't be included in js component)  
usage - svg(class='icon icon--iconName'> use(xlink:href='#iconName')  

3) png sprite  
dir - src/images/pngIcons. Generated files and styles template are in src/scss/utils/png
usage - sass: @include png; @include png-star-big;  
        pug: i.png-start-big
            