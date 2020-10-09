import {Detail} from "../../srcTemp/detail/detail.src.js";
import {DomLevels} from "../../srcRoot/domLevels.js";
import {System} from "../../srcRoot/system.js";


//======    Nahráme príslušný CSS súbor s popisom nižšie
document.getElementsByTagName("head")[0].insertAdjacentHTML(
    'beforeend',
    '<link id="original"  rel="stylesheet" href="srcLibrary/listItemsAdd/listItems.add.css" />');
    //  CSS current template
    //  .icon
    //  .centre
    //  .centreSpan
    //  .titleEstate
    //  .lineEstate
    //  .margin
    //  .noteEstate
    //  .valueEstate
    //  .price
    //  .github
    //  .linkDetail
    //  .linkDetailIn
     

export class ListItemsAdd {
    
    constructor() {}
    
    fetchDataEstate(    data,
                        parentID, 
                        containerType, 
                        containerID, 
                        tester,
                        callTemplate) {
                        
    let url = '../../jsonStructInfo/dataEstate.json';                        
    fetch(url)
        .then(response => response.json())
        .then(result => this.dataEstate( data,
                                    parentID, 
                                    containerType, 
                                    containerID, 
                                    tester,
                                    callTemplate,
                                    result));        
    }
    
    dataEstate( data,
                parentID, 
                containerType, 
                containerID, 
                tester,
                callTemplate,
                viewFields) {
         
        let detail = new Detail();
        let domLevels = new DomLevels();
        let icons = domLevels.createElement(    parentID,
                                                containerType,
                                                containerID,
                                                tester);
        
        let system = new System();
        let fromDB = system.getArrayFromData(viewFields, data);

        let html = '';        
        for(let icons of viewFields) { 
            if(typeof icons.iconFont != 'undefined') {
                if(icons.iconFont.length>0 && fromDB[icons.field] == 1) {
                    html += '<i title="' + icons.title + '" style="color:' + icons.iconColor + ';background-color:' + icons.iconBgColor + ';" class="icon ' + icons.iconFont + '"></i>';
                }
            }
        }
        $('#'+containerID).append(html);
        
        //console.log(data['gen_centre']);
        if(data['gen_centre']==1) {
            $('#'+containerID).append('<div id="click_1_'+data['gen_id']+'" class="centre"><p class="centreSpan">&nbsp;Priamo&nbsp;v&nbsp;centre&nbsp;</p></div>');
            $('#'+'click_1_'+data['gen_id']).unbind();
            $('#'+'click_1_'+data['gen_id']).click(function() {
                let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
                domLevels.linkTemplate(hrefLink, $('#webURL').html());
                let detail = new Detail();
                detail.controller();
            });
        } else {$('#'+containerID).append('<div class="centre"></div>');}

        $('#'+containerID).append('<div id="click_2_'+data['gen_id']+'" class="titleEstate">' + fromDB['gen_title'].substr(0,60) + '...</div>');
        $('#'+'click_2_'+data['gen_id']).unbind();
        $('#'+'click_2_'+data['gen_id']).click(function() {
            let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
            domLevels.linkTemplate(hrefLink, $('#webURL').html());
            let detail = new Detail();
            detail.controller();
        });
        
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['cat_noteTitle'] + '</div><div class="valueEstate">' + fromDB['cat_note'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['typ_noteTitle'] + '</div><div class="valueEstate">' + fromDB['typ_note'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['vil_fullnameTitle'] + '</div><div class="valueEstate ">' + fromDB['vil_fullname'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['dis_nameTitle'] + '</div><div class="valueEstate ">' + fromDB['dis_name'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['reg_nameTitle'] + '</div><div class="valueEstate ">' + fromDB['reg_name'] + '</div></div>');
        $('#'+containerID).append('<div class="lineEstate margin"></div>');
        $('#'+containerID).append('<div class="lineEstate"><div class="noteEstate">' + fromDB['gen_priceTitle'] + '</div><div class="valueEstate price">' + fromDB['gen_price'] + '</div></div>');
        
        $('#'+containerID).append('<div id="click_3_'+data['gen_id']+'"  class="linkDetail d-flex justify-content-center"><div class="linkDetailIn">Detail</div></div>');
        $('#'+'click_3_'+data['gen_id']).unbind();
        $('#'+'click_3_'+data['gen_id']).click(function() {
            let hrefLink = callTemplate + '/' + fromDB['gen_unique'];
            domLevels.linkTemplate(hrefLink, $('#webURL').html());
            let detail = new Detail();
            detail.controller();
        });

    }

}
