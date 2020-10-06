import {ListItems} from "./listItems.js";
import {BigImage} from "./bigImage.js";

export class FillContainers {

    constructor(data, container, otherParams) {
        this.data = data;
        this.container = container;
        this.otherParams = otherParams;
    }
    
    listItems() {
        let listItem = new ListItems(this.data, this.container, this.otherParams);
        listItem.execRender();
    }
    
    bigImage() {
        console.log('bigImage()');
        let bigImage = new BigImage(this.data, this.container, this.otherParams);
        bigImage.execRender();
    }
}
