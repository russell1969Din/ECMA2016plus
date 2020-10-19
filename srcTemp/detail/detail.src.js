import {DBController} from "../../srcRoot/dbController.js";
import {StdElement} from "../../srcLibrary/stdElement.js";

import {PrivateIcons} from "../../srcPrivate/privateIcons.js";

// to do
//import {BigImage} from "../../srcLibrary/bigImage.js";

//delete it
//import {TableWithouthHead} from "../../srcLibrary/tableWithouthHead.js";

import {FlexSlider} from "../../srcExternal/srcFlexSlider/srcFlexSlider.js";
import {GoAtHome} from "../../srcLibrary/goAtHome.js";

import {TextOnlyIn} from "../../srcLibrary/textOnlyIn.js";
import {VideoPreview} from "../../srcLibrary/videoPreview.js";

export class Detail {
    constructor() {}

    renderTemplate() {


        let otherParams = {'pathJSON': 'json/', 'tester':true, 'noCache':true};    
        let dbController = new DBController(    'general~category~types~villages~districts~regions~parking~conditions~maklers',   //
                                                otherParams, //   ''       
                                                'gen_category=cat_id && gen_type=typ_id && gen_village=vil_id && gen_district=dis_id && gen_region=reg_id && gen_parking = par_id && gen_condition=con_id && gen_maklerId=mak_id');  

        let container = {};

        /*
        
        container = {   'parentID':'bigImage',
                        'ID':'image', 
                        'pathImage':'../img/',
                        'fadeIn':1000};
        dbController.read(new BigImage(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');

          */      
        container = {   'parentID':'bigImage',
                        'ID':'flex-slider', 
                        'pathImage':$('#webURL').html() + '/img/',
                        'fadeIn':1000};
        dbController.read(new FlexSlider(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');

        container = {   'parentID':'estateIcons',
                        'ID':'viewIcons',
                        'jsonFile':'../jsonStructInfo/dataEstate.json',
                        'fadeIn':1000};
        dbController.read(new PrivateIcons(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');
        
        
        container = {   'parentID':'tableJSON',
                        'ID':'elemJSON',
                        'cssFile':'estate-JSON',
                        'jsonFile':'../jsonStructInfo/dataEstateDetailPlus.json',
                        'isTrue':'Áno',
                        'isFalse':'Nie',
                        'columns':3,
                        'fadeIn':1000,
                        'imgPath':'',
                        'cssGlobal':'jsonGlobal container',
                        'cssCnt':'jsonElement',
                        'cnt1': 'tableFromJSON',
                        'cnt2':'<b>•&nbsp;Popis ponúkanej nehnuteľnosti:</b>',
                        'cnt3':'POPIS',
                        'cnt4':'gen_note',
                        'cnt5':'OKOLIE',
                        'cnt6':'gen_area',
                        'cnt7':'<b>•&nbsp;Virtuálna prehliadka:</b>',
                        'cnt8':'gen_virtualVideo',
                        'BS1': ''};
        dbController.read(new StdElement(), container, true, 2);      
        
          
        
        container = {   'parentID':'atHome',
                        'ID':'atHomePressKey',
                        'buttonText':'Návrat'};
        dbController.read(new GoAtHome(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');        
        
        //container = {}
        //dbController.read(new StdElement(), container, false, 0, 'gen_unique="' + getFragmentPath(2) + '"');
        //dbController.read(new StdElement(), container, true);
          /* 

    
 
        container = {   'parentID':'elementAndJSON',
                        'ID':'elemJSON',
                        'cssFile':'estate-JSON',
                        'jsonFile':'../jsonStructInfo/dataEstateDetailPlus.json',
                        'isTrue':'Áno',
                        'isFalse':'Nie',
                        'columns':3,
                        'fadeIn':1000,
                        'imgPath':'',
                        'cssGlobal':'jsonGlobal container',
                        'cssCnt':'jsonElement',
                        'cnt1': elem1,
                        'cnt2': elem2,
                        'cnt3': 'tableFromJSON',
                        'cnt4': elem3,
                        'BS1': ''};
        dbController.read(new StdElement(), container, true, 2);
     
        container = {   'parentID':'textDetail',
                        'ID':'tableEstate', 
                        'isTrue':'Áno',
                        'isFalse':'Nie',
                        'columns':3,
                        'fadeIn':1000,
                        'structJSON':   {'json1': 'dataEstateDetailPlus'}    };
        dbController.read(new TableWithouthHead(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');
  
        container = {   'methodName':'textConstantIn',
                        'parentID':'textTitleNote',
                        'ID':'text_1',
                        'content':'<b>&nbsp;&nbsp;•&nbsp;Popis ponúkanej nehnuteľnosti:</b>',
                        'fadeIn':1500};
        dbController.read(new TextOnlyIn(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');
        
        container = {   'parentID':'textNote',
                        'ID':'text_2',
                        'fadeIn':1500, 
                        'structJSON':'dataEstateDetail',
                        'fieldNameIn':'gen_note'};
        dbController.read(new TextOnlyIn(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');

        container = {   'parentID':'textArea',
                        'ID':'text_3',
                        'fadeIn':2000, 
                        'structJSON':'dataEstateDetail',
                        'fieldNameIn':'gen_area'};
        dbController.read(new TextOnlyIn(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');

        container = {   'parentID':'videoLiving',
                        'ID':'videoIn',
                        'title':'<b>&nbsp;&nbsp;•&nbsp;Virtuálna prehliadka:</b>',
                        'structJSON':'dataEstateDetail',
                        'fieldNameIn':'gen_virtualVideo'};
        dbController.read(new VideoPreview(), container, true, 0, 'gen_unique="' + getFragmentPath(2) + '"');
        */

    }
}
