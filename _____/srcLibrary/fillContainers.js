import {ListItems} from "./listItems.js";
import {BigImage} from "./bigImage.js";
import {InsertTextOnly} from "./textOnlyIn.js";


export class FillContainers {
    constructor(data={}, container={}, otherParams={}) {
        this.data = data;
        this.container = container;
        this.otherParams = otherParams;
    }
    
    listItems() {
        let listItem = new ListItems(this.data, this.container, this.otherParams);
        listItem.execRender();
    }
    
    bigImage() {
        let bigImage = new BigImage(this.data, this.container, this.otherParams);
        bigImage.execRender();
    }
    
    insertTextOnly() {
        let insertTextOnly = new InsertTextOnly(this.data, this.container, this.otherParams);
        insertTextOnly.execRender()
    }
}
