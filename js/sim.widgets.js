'use strict'
var wdgts = {
    message_list : function (id){
        var this_list = this_list || $('<ul>')
            .attr('id',id)
            .attr('class','list-group');
        this_list.add_message = function(msg){
            var new_li = $('<li>')
                    .attr('style','word-wrap: break-word;')
                    .attr('class','list-group-item')
                    .text(JSON.stringify(msg))
                    .hide();
                    
            if (this_list.children().length>15){
                this_list.children().last().remove();
            }
            this_list.prepend(new_li);
            new_li.slideDown();
        };
        return this_list; 
    },
    search_button : function(search_obj,msg_callback){
        var go_button=$('<button>')
            .attr('type','button')
            .attr('style','width:100%')
            .attr('class','btn-lg btn-success')
            .text(search_obj.name || 'Go!')
            .on('click',function (){
                if (this.intervalID){
                    this.intervalID=window.clearInterval(this.intervalID);  
                } else{
                    msg_callback(search_obj);
                    this.intervalID = window.setInterval(msg_callback,3000,search_obj);
                }
                this.setAttribute('class', (this.intervalID && 'btn-lg btn-danger' || 'btn-lg btn-success'));
            });
        return go_button;
    }
};


