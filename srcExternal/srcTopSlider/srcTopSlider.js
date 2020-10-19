//======    Importujeme triedu DomLevels s metódami pre prácu s HTML DOM levels  
import {DomLevels} from "../../srcRoot/domLevels.js";


export class TopSlider {

    constructor(data={}, container={}, otherParams={}) {
        //this.data = data;
    
        this.methodName = container.methodName;
        this.parentID = container.parentID;                        
        this.containerID = container.id;
        this.fadeIn = container.fadeIn;
        this.pathImage = container.pathImage;

        this.tester = otherParams.tester;

        //this.images  = this.data[0].images;
    }
        
    execRender() {

        let domLevels = new DomLevels();
        
        let global = domLevels.createDivElement(    this.parentID,
                                                    this.containerID, 
                                                    this.tester);       
    }    
}