export class Estate {
    constructor(data, tag) {
        this.data = data;
        this.tag = tag;
    }

    //extractDataToListItem({gen_id, gen_title}) {
    extractDataToListItem(record) {        
        return `<li>${record.gen_title} (${record.gen_id}) :: ${record.images["image0"+record.gen_firstImage].padStart(2,'0')}</li>`
    }
    
    printAll() {
        let html = '';
        for(let data of this.data) {
            html += this.extractDataToListItem(data)
        }
        this.tag.innerHTML = html;
    }     

}
