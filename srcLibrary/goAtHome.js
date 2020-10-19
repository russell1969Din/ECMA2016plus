//======    Importuje triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../srcRoot/domLevels.js";
import {MenuControl} from "../srcRoot/menuControl.js";


//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="../srcLibrary/goAtHome.css" />');     
    //  CSS current template
    //  workbanch
    //  workbanch-button

export class GoAtHome {

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

    execRender(data={}, container={}, otherParams={}) {
    
        this.doConstruct(data, container, otherParams)
        
        let domLevels = new DomLevels();

        let cnt = domLevels.createDivElement(   this.parentID,
                                                this.ID, 
                                                this.tester);
        $('#' + this.ID).addClass('workbanch d-flex justify-content-center');
        
        let button = domLevels.createDivElement(    this.ID,
                                                    this.ID+'-as-button', 
                                                    this.tester);
        $('#' + this.ID+'-as-button').addClass('workbanch-button ');
        $('#' + this.ID+'-as-button').html(this.buttonText);

        $('#' + this.ID+'-as-button').unbind();
        $('#' + this.ID+'-as-button').click(function() {
            let menuControl = new MenuControl();
            menuControl.call('home');
        });
    }
}