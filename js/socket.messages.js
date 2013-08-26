//init socket
var socket = io.connect('http://206.214.164.229');


socket.on('message', function (data) {
    if ($('#message_list').children().length>15){
        $('#send_list').children().last().detach()
    }

    var new_li = $('<li>').html(
        $('<div>')
            .data(data)
            .attr('style','overflow: hidden')
            .attr('class','container')
            .text(JSON.stringify(data)));

    $('#message_list').prepend(new_li)

   // $.event.trigger(data.message.eventType,data.message.payload);   
      
});  

//socket events
$(document).on("newSearch", function (e, response) {
    search_layer.addLayer(searches.add_search(response));
});

$(document).on("endSearch", function (e, response) {
    $('.search_map').trigger('end_search', [response]);
});

$(document).on("moveSearch", function (e, response) {
    $('.search_map').trigger('move_search', [response]);
});

$(document).on("moveUser", function (e, response) {

});
