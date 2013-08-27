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
                    .text(JSON.stringify(msg)))
                    .hide();
                    
            if (this_list.children().length>15){
                this_list.children().last().remove();
            }
                                
            this_list.prepend(new_li);
            new_li.slideDown("slow");
        };
        
        return this_list; 
    },
    search_button : function(search_obj,msg_callback){
        var go_button=$('<button>')
            .attr('type','button')
            .attr('class','start_msg btn-lg btn-success')
            .text(search_obj.name || 'Go!');
        go_button.payload=search_obj;
        go_button.msg_callback=msg_callback;
        (function(b){
            b.on('click',function (){
                var $this=$(this);
                if (!this.intervalID){
                    this.intervalID = window.setInterval(b.msg_callback,3000,b.payload);
                } else{
                    this.intervalID=window.clearInterval(this.intervalID);  
                }
                $this.attr('class', (this.intervalID && 'btn-lg btn-danger' || 'btn-lg btn-success'));

            });
        })(go_button);
        
        return go_button;
    }
};


