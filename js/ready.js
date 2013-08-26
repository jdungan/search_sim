"use strict"
jQuery(document).ready(function () {
    
    for (var search in searches){
        var go_button=$('<button>')
            .data('search',searches[search])
            .data('state','go')
            .attr('type','button')
            .attr('class','start_msg btn-lg btn-success')
            .text('Go!'),

        new_div = $('<li>').append($('<h3>').text(search))
            .append(go_button),
        
        new_li=$('<li>')
            .append(new_div);
        
        $('#search_list').append(new_li)
    }
    
    var x = new wdgts.message_list('send_list')

    $('#outgoing').append(x);

    var emit_msg = function(msg_payload){
                
        socket.emit('message', { eventType: 'moveUser', payload: msg_payload });
        if ($('#send_list').children().length>15){
            $('#send_list').children().last().detach()
        }
        $('#send_list').append($('<li>').text(JSON.stringify(msg_payload)));
    };
    
    $('button.start_msg').on('click',function(){
        var $this=$(this),
        state=$this.data('state'),
        intervalID;
        
        if(state==='go'){
            var payload=$this.data('search')
            intervalID = window.setInterval(emit_msg,3000,payload);
            $this.data('intervalID',intervalID)
            $this.attr('class','start_msg btn-lg btn-danger').text('STOP')
            $this.data('state','stop')            
        } else{
            intervalID=$this.data('intervalID');
            window.clearInterval(intervalID);  
            $this.data('state','go')
            $this.attr('class','start_msg btn-lg btn-success').text('GO!')            
        }
    });

    
    
});