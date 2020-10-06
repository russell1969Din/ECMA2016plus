//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";

//to do
import {Home} from "../srcTemp/home/home.src.js";

document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../css/bigImage.css" />');
    //  CSS current template  
    //  .parent-image
    //  .child-image
    
//======    Deklarácia objektu triedy bigImage 
export class BigImage {                       
    constructor(data, container, otherParams) { 
        this.data = data;
        for(let value of Object.values(container) ) {
            this.containerType = value.type;
            this.containerId = value.id;
            this.containerParent = value.parentId;
            this.pathImage = value.pathImage;
            this.callTemplate = value.callTemplate;
        };
        
        //======    Slučka pre načítanie hodnôt z objektu typu otherParams - ostatné parametre
        for(let param of Object.values(otherParams) ) {
            //======    názov aktuálnej metódy aktuálne sa v  tejto inštancií nepoužíva
            this.methodName = param.methodName;
            //======    this.fadeIn Ak je viac ako 0 - parameter pre animáciu jednotlivých detských kontajnerov
            this.fadeIn = param.fadeIn;
            //======    this.tester pri testovaní je možné nastaviť aby sa zobrazovali identifikačné údaje k elementom
            this.tester = param.tester;
        };
    }
    
    execRender()    {
        //======    Vytváram konštruktor triedy DomLevels pre prácu s metódami HTML DOM-levels (createElement)
        let domLevels = new DomLevels();    
        
        //======    Vytváram kontajner pre zobrazenie potvrdeného obrázka do rodičovského kontajnera
        let cnt = domLevels.createElement(  this.containerParent,
                                            this.containerType,
                                            this.containerId, 
                                            this.tester);
        $('#' + this.containerId).addClass('parent-image');
        let imgSrc =  '';
        let id = 0;
        for(let data of this.data) {
            imgSrc =  this.pathImage + data.images['image0'+data.gen_firstImage].padStart(2,'0');
            id = data.gen_id;
        }
        let imgId = this.containerId + '_image';
        let title = 'title="imgID: '+ imgId + ' :: ID: ' + this.containerId + ' :: SRC: ' + imgSrc + ' :: parentID: ' + this.containerParent + '"';
        $('#'+this.containerId).append('<img src="' + imgSrc + '" ' + title + ' id="' + imgId + '" class="child-image" />');

        //to do
        $('#'+this.containerId).append('<input id="startReturn" type="button" value="X" >');
        $('#startReturn').unbind();
        $('#startReturn').click(function() {
            
            let home = new Home();
            domLevels.returnFrom('home', home);
        });
    }
}
