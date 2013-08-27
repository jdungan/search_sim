'use strict'
var wdgts = {
    message_list : function (id){
        var this_list = this_list || $('<ul>')
            .attr('id',id)
            .attr('class','list-group');

        this_list.add_message = function(msg){
            var new_li = $('<li>').html(
                $('<div>')
                    .data('message',msg)
                    .attr('style','overflow: hidden')
                    .attr('class','list-group-item')
                    .text(JSON.stringify(msg)));
                    
            if (this_list.children().length>15){
                this_list.children().last().remove();
            }
                                
            this_list.prepend(new_li);
        };
        
        return this_list; 
    },
    search_button : function(search_obj){
        var go_button=$('<button>')
            .data('search',search_obj)
            .data('state','go')
            .attr('type','button')
            .attr('class','start_msg btn-lg btn-success')
            .text(search_obj.name || 'Go!');
        return go_button;
    }
};


