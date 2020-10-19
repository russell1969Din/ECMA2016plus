//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../../srcRoot/domLevels.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" type="text/css"  href="/srcExternal/srcFlexSlider/css/flexslider.css" />');

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link rel="stylesheet" type="text/css"  href="/srcExternal/srcFlexSlider/css/style.css" />');

export class FlexSlider {

    constructor(data={}, container={}, otherParams={}) {

        this.doConstruct(data, container, otherParams);
    }

    doConstruct(data={}, container={}, otherParams={}) {
        this.data = data;
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) eval('this.' + key + ' = container.' + key + ';');
        }

        if( Object.keys(otherParams).length > 0) {
            for(let key of Object.keys(otherParams)) eval('this.' + key + ' = otherParams.' + key + ';');
        }
    }

    bigImageRender(element_li, index, pathNameImage) {
    
        $(element_li).append('<li id="li-slider-' + index + '"></li>');
        $('#li-slider-' + index).append('<center id="center-slider-' + index + '" ></center>');
        $('#center-slider-' + index).append('<a id="a-slider-' + index + '"></a>');
        
        $('#a-slider-' + index).attr('href', pathNameImage);
        $('#a-slider-' + index).attr('data-toggle', 'lightbox');
        $('#a-slider-' + index).attr('data-gallery', 'multiimages');
        $('#a-slider-' + index).attr('data-parent', '.advert_left');
        
        $('#a-slider-' + index).append('<img style="width:auto;height:auto;" id="img-slider-' + index + '" />');
        $('#img-slider-' + index).attr('src', pathNameImage);
        $('#img-slider-' + index).attr('alt', '');
        $('#img-slider-' + index).attr('border', '0');
        $('#img-slider-' + index).addClass('img-responsive');
    }
    
    smallSliderRender(element_li, index, pathNameImage) {
       
        $(element_li).append('<li id="li-slides-' + index + '"></li>');
        if(index==1) $('#li-slides-'+index).addClass('first_image_carousel');
        
        $('#li-slides-' + index).addClass('first_image_carousel');
        $('#li-slides-' + index).append('<center id="center-slides-' + index + '"></center>');
        
        $('#center-slides-' + index).append('<img id="img-slides-' + index + '" />');
        $('#img-slides-' + index).attr('src', pathNameImage);
        $('#img-slider-' + index).attr('alt', '');
        $('#img-slider-' + index).attr('border', '0');
        $('#img-slider-' + index).addClass('img-responsive');
    }

    execRender(data={}, container={}, otherParams={}) {

        this.doConstruct(data, container, otherParams);
        
        this.images  = this.data[0].images;

        let domLevels = new DomLevels();
        
        let global = domLevels.createDivElement(    this.parentID,
                                                    this.ID, 
                                                    this.tester);       
        let html = '';
        html += '<script type="text/javascript" src="/srcExternal/srcFlexSlider/js/detail.js?v1"></script>';
        html += '<script type="text/javascript" src="/srcExternal/srcFlexSlider/js/bootstrap.min.js"></script>';
        html += '<script type="text/javascript" src="/srcExternal/srcFlexSlider/js/ekko-lightbox.js"></script>';
        html += '<script type="text/javascript" src="/srcExternal/srcFlexSlider/js/jquery.flexslider-min.js"></script>';
        $('#'+this.ID).html(html);
        
        let buffer = domLevels.createDivElement(    this.ID,
                                                    this.ID + '_buffer', 
                                                    this.tester);       
        $('#'+this.ID + '_buffer').addClass('flexslider_script_class' );

        let slider = domLevels.createDivElement(    this.ID + '_buffer',
                                                    'slider', 
                                                    this.tester);
        $('#slider').addClass('flexslider');
        //to do
        $('#slider').css('background-color','#f3f3f3');

        $('#slider').append('<ul id="ul-slider"></ul>');
        $('#ul-slider').addClass('slides');

        let imagePathName;
        let index = 1;        
        for(let imageName of Object.values(this.images)) {
            imagePathName = this.pathImage + imageName;
            this.bigImageRender( '#ul-slider', index, imagePathName);
            ++index;
        }

        let carousel = domLevels.createDivElement(  this.ID + '_buffer',
                                                    'carousel', 
                                                    this.tester);
        $('#carousel').addClass('flexslider');
        //to do
        $('#carousel').css('background-color','#f3f3f3');
        $('#carousel').append('<ul id="ul-slides" class="slides"></ul>');

        index = 1;
        for(let imageName of Object.values(this.images)) {
            imagePathName = this.pathImage + imageName;
            this.smallSliderRender( '#ul-slides', index, imagePathName);
            ++index;
        }
    }
}
