"use strict"
jQuery(document).ready(function () {

    var socket = io.connect('http://206.214.164.229');


    socket.on('message', function (data) {
        in_list.add_message(data);
       // $.event.trigger(data.message.eventType,data.message.payload);   

    });  
    
    var emit_msg = function(msg_payload){                
        socket.emit('message', { eventType: 'moveUser', payload: msg_payload });
        out_list.add_message(msg_payload);
    };


    for (var search in searches){
        var go_button= new wdgts.search_button(searches[search]),
        new_li = $('<li>')
            .attr('class','list-group-item')
            .append(go_button);
        
        $('#search_list').append(new_li)
    }
    
    var out_list = new wdgts.message_list('send_list')

    $('#outgoing').append(out_list);
    
    var in_list = new wdgts.message_list('message_list')

    $('#incoming').append(in_list);
    
$('button.start_msg').on('click',function(){
        var $this=$(this),
        state=$this.data('state'),
        intervalID;
        
        if(state==='go'){
            var payload=$this.data('search')
            intervalID = window.setInterval(emit_msg,3000,payload);
            $this.data('intervalID',intervalID);
            $this.attr('class','start_msg btn-lg btn-danger');
            $this.data('state','stop')            
        } else{
            intervalID=$this.data('intervalID');
            window.clearInterval(intervalID);  
            $this.data('state','go')
            $this.attr('class','start_msg btn-lg btn-success');
        }
    });

    
    
});