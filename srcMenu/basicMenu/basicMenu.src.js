import {DomLevels} from "../../srcRoot/domLevels.js";
import {MenuControl} from "../../srcRoot/menuControl.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../../srcMenu/basicMenu/basicMenu.css" />');
    //  CSS current template  
    //  
    //  .row:before, 
    //  .row:after

    //  .topnav
    //  .topnav .icon 
    //  .topnav a

    //  #mobilIcon
    //  .menu-general 
    //  .containerLogo
    //  .logoIcon
    //  .menu-icons
    //  .socialSection

    //  .icon-style 
    //  .fab
    //  .fa-facebook-square
    //  .fa-instagram
    //  .fa-twitter
    //  .fa-linkedin-in

    //  .menu-item
    //  .topnav a:hover
    //  .menu-item-current 

export class BasicMenu {
    constructor() {
        this.origin = 'basicMenu';
    }
    
    execRender() {
        
        this.loadMenuTemplate(this.origin);
    }
    
    basicMenuFetchIcons(origin) {
        //======    basicMenuIcons.json - dáta na zobrazenie ikoniek / logo, externé linky, sociálne siete
        //======    parent          rodičovský element, ak neexistuje vytvorí ho
        //======    col_sm          parameter pre bootstrap v prípade vytvaraného kontajnera - max 12
        //======    title           titulka 
        //======    image           obrázok ktorý má obsahovat interný / externý link 
        //======    id              jednoznačný identifikátor ikony / loga
        //======    url             interný link      
        //======    href            externný link
        //======    target          formát ovorenia externého linku
        //======    fontawesome     definícia kolerovanej ikony

        let url = $('#webURL').html() + '/'+'srcMenu/' + origin + '/json/' + origin + 'Icons.json';
        fetch(url)
            .then(response => response.json())
            .then(result => this.basicMenuFetchItems(result, origin));   
    }

    basicMenuFetchItems(dataIcons, origin) {
        //======    basicMenuItems.json - dáta vyjadrujúce položky menu
        //======    lokálny     index - malo by to byť poradové číslo položky menu 1...
        //======    textItem    text, ktorý sa má v aktuálnej položke menu zobraziť
        //======    url         interný link ktorý má položka menu volať
        let url = $('#webURL').html() + '/'+'srcMenu/' + origin + '/json/' + origin + 'Items.json';
        fetch(url)
            .then(response => response.json())
            .then(result => this.createMenu(result, dataIcons));   
    }
    
    createMenu(dataItems, dataIcons) {
        this.renderMenuIcons(dataIcons, dataItems);    
        this.renderMenuItems(dataItems);
        this.renderResponsiveIcon();
    }
    
    changeClassInMenuItem() {
        let currentID;
        for(let item of Object.values(menuItemsJSON)) {
            currentID = item.url;
            if(!document.getElementById(currentID)) break;
            $('#'+currentID).removeClass('menu-item-current');
            if(item.url==$('#current-site').html()) {
                $('#'+currentID).addClass('menu-item-current');
            }
        }
    }
    
    renderMenuItems(dataItems) {
        let menuIndex = 1;    
        let currentID = '';
        for(let menuItem of Object.values(dataItems)) {
            currentID = menuItem.url;
            $('#menu-items').append('<a style="" id="' + currentID + '"></a>');
            $('#'+ currentID).html(menuItem.textItem);
            $('#'+ currentID).addClass('menu-item');
    
            //to do
            if(getAllPath(2).substr(1,getAllPath(2).length) == menuItem.url) {
                $('#'+currentID).addClass('menu-item-current');
            }

            if(document.getElementById(currentID)) {
                if(undefinedIs(menuItem.url).length>0) {
                    $('#'+currentID).unbind();
                    $('#'+currentID).click(function() {
                        
                        let menuControl = new MenuControl();

                        menuControl.call(menuItem.url);
                        menuControl.changeClass(dataItems);
                    });
                }       
            }
            ++menuIndex;
        }     
    }

    renderMenuIcons(dataIcons, dataItems) {
        let imagePathName = ''
        for(let recIcon of Object.values(dataIcons)) {
            if(undefinedIs(recIcon.parent).length>0) {
                if(!document.getElementById(recIcon.parent)) {
                    let classParent = '';
                    if(recIcon.col_sm > 0) {classParent = 'class="col-sm-'+ recIcon.col_sm +' "';}
                    $('#menu-icons-up').append('<div id="' + recIcon.parent + '" ' + classParent + '></div>');
                    parent = recIcon.parent;
                }
            }
            if(undefinedIs(recIcon.image).length>0) {
                imagePathName = $('#webURL').html() + '/' + recIcon.image;
                $('#'+parent).append('<a id="' + recIcon.id + '_ahref"><img src="' + imagePathName + '" id="' + recIcon.id + '" class="logoIcon" /></a>')
                $('#'+parent).addClass('containerLogo');
                if(undefinedIs(recIcon.classCSS).length>0) {
                    $('#'+recIcon.id).addClass(recIcon.classCSS);
                } else {
                    $('#'+recIcon.id).addClass('icon-style');
                }   
            }
    
            if(undefinedIs(recIcon.fontawesome).length>0) {
                $('#'+parent).append('<a id="' + recIcon.id + '_ahref"><i class="fab ' + recIcon.fontawesome + '" id="' + recIcon.id + '"></i></a>');
                $('#'+recIcon.parent).removeClass('socialSection');
                $('#'+recIcon.parent).addClass('socialSection');
            }
    
            if(document.getElementById(recIcon.id)) {
                if(undefinedIs(recIcon.url).length>0) {
                    $('#'+recIcon.id).unbind();
                    $('#'+recIcon.id).click(function() {

                        let menuControl = new MenuControl();
                        menuControl.changeClass(dataItems);
                        menuControl.call(recIcon.url);
                    });
                }
            }
    
            if(undefinedIs(recIcon.href).length>0) {
                $('#'+recIcon.id+'_ahref').attr('href', recIcon.href);
                if(undefinedIs(recIcon.target).length>0) {    
                    $('#'+recIcon.id+'_ahref').attr('target', recIcon.target);
                }
            }
        }
    }
    
    renderResponsiveIcon() {
        $('#menu-items').append('<a id="mobilIcon_href"></a>');
        $('#mobilIcon_href').attr('href', 'javascript:void(0);');
        $('#mobilIcon_href').addClass('icon');
        $('#mobilIcon_href').click(function() {
            if($('#menu-items').attr('class').indexOf('responsive')==(-1)) {
                $('#menu-items').addClass("responsive");
            } else {
                $('#menu-items').removeClass("responsive");
            }
        });
        $('#mobilIcon_href').append('<i id="mobilIcon" style="" class="fa fa-bars"></i>');    
    }
    
    
    loadMenuTemplate(origin) {
        var openFile = new XMLHttpRequest();
        openFile.open("GET", $('#webURL').html() + '/' + 'srcMenu/' + origin + '/' + origin + '.tmp.php', true);
        openFile.onreadystatechange = function() {
            if (openFile.readyState == 4 && this.status == 200) {
                (async () => {  
                    var content = openFile.responseText;
                    $('#workSpace_menu').html(content);
                    let basicMenu = new BasicMenu();
                    basicMenu.basicMenuFetchIcons(origin);
                })();
            }
        }
        openFile.send();       
    }  

}


