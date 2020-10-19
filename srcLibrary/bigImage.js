//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";
import {MenuControl} from "../srcRoot/menuControl.js";                                                  
                                                  
//to do
import {Home} from "../srcTemp/home/home.src.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/bigImage.css" />');
    //  CSS current template  
    //  .parent-image
    //  .child-image
    //  .linkReturn-parent
    //  .linkReturn-child
    
//======    Deklarácia objektu triedy bigImage 
export class BigImage {                       
    constructor(data, container, otherParams) { 
    
        this.doConstruct(data, container, otherParams);
    
        /*
        this.data = data;
    
        this.containerType = container.type;
        this.containerId = container.id;
        this.containerParent = container.parentId;
        this.pathImage = container.pathImage;
        this.fadeIn = container.fadeIn;
    
        //======    Načítanie hodnôt z objektu typu otherParams - ostatné parametre
        //======    názov aktuálnej metódy aktuálne sa v  tejto inštancií nepoužíva
        this.methodName = otherParams.methodName;
        //======    this.tester pri testovaní je možné nastaviť aby sa zobrazovali identifikačné údaje k elementom
        this.tester = otherParams.tester;
        */
    }       
    
    doConstruct(data={}, container={}, otherParams={}) {
        this.data = data;
        if( Object.keys(container).length > 0) {
            for(let key of Object.keys(container)) eval('this.' + key + ' = container.' + key + ';');
        }

        if( Object.keys(otherParams).length > 0) {
            for(let key of Object.keys(otherParams)) eval('this.' + key + ' = otherParams.' + key + ';');
        }
        this.container = container; 
        this.otherParams = otherParams;
    }
    
    execRender(data={}, container={}, otherParams={})    {
    
        this.doConstruct(data, container, otherParams);
    
        //======    Vytváram konštruktor triedy DomLevels pre prácu s metódami HTML DOM-levels (createElement)
        let domLevels = new DomLevels();    
        
        //======    Vytváram kontajner pre zobrazenie potvrdeného obrázka do rodičovského kontajnera
        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);
        
 
        //=======   Ak je this.fadeIn pre animáciu nastavený viac ako 0, zavolám animáciu 
        //          Animácie je možné nastaviť aj v príslušnom kaskádovom štýle objektu tejto triedy
        if(this.fadeIn > 0) {
            $('#'+this.ID).css('display','none');
            $('#'+this.ID).fadeIn(this.fadeIn);
        }
        
        $('#' + this.ID).addClass('parent-image');
        let imgSrc =  '';
        let id = 0;
        for(let data of this.data) {
            imgSrc =  this.pathImage + data.images['image0'+data.gen_firstImage].padStart(2,'0');
            id = data.gen_id;
        }

        let imgId = this.ID + '_image';
        let title = 'title="imgID: '+ imgId + ' :: ID: ' + this.ID + ' :: SRC: ' + imgSrc + ' :: parentID: ' + this.parentID + '"';
        console.log(imgSrc);
        $('#'+this.ID).append('<img src="' + imgSrc + '" ' + title + ' id="' + imgId + '" class="child-image" />');

        //to do
        $('#'+this.ID).append('<div class="linkReturn-parent"><div class="linkReturn-child"></div></div>');
        $('.linkReturn-child').html('Návrat');
        $('.linkReturn-child').unbind();
        $('.linkReturn-child').click(function() {

            let menuControl = new MenuControl();
            menuControl.call('home');            
            
            /*
            let home = new Home();
            domLevels.returnFrom('home', home);
            */
        });
    }
}
