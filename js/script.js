
var session = null, imClient =null;
function sendIMessage (destId, id,  message){
    
    var m = '{'  +   '"message"' +  ':' + '"' + message.trim() + '"'  +  ',' + '"id"'  + ':' +id+ '}';
    imClient.sendMessage(destId, m);           
}

function receiveIMMessageHandler(e){
    var JSONmessage = $.parseJSON( e.detail.message);
    
    var id =  JSONmessage.id; //Get source id in message
    var message = JSONmessage.message;
    
    $(document).find( '[id= '+id+']').parent('a').trigger('click');
    setTimeout ( function (){
         var mBody = '<tr>'+
                        '<td>'+
                        '<div class="" style="margin-left:10px;">'+
                                        '<p class="bg-info rigth " style="margin-bottom : 0;">'+message+ '&nbsp;'+ '<span class="pull-right small  text-muted">'+ getHeure (new Date ())+'</span>'+
                                        '</p>'+
                                        '</div>'+
                                        '</td>'+
                                        '</tr>';
    var element =    $('tfoot').find( '[id ='+id +']').parent('td').parent('tr').parent('tfoot').siblings('tbody') || null;
    
    element.append(mBody) ;
    element.animate({scrollTop: element[0].scrollHeight},2000);
        
        
    }, 2000);
    
}
function getHeure(date){
    var heures = ("0" +date.getHours()).slice('-2');
    var minutes = ("0" +date.getMinutes()).slice('-2');
    return (heures+ ":"+minutes);
}
function sessionReadyHandler(e){        
    
    imClient = apiCC.session.createIMClient();
} 
function sessionReadyHandler(e){        
    apiRTC.addEventListener("receiveIMMessage", receiveIMMessageHandler);
    imClient = apiCC.session.createIMClient();
             
}   

apiRTC.init({
    apiKey :'badedb11c75abb4a254d0f268452bf48',
    presenceGroup : 'A',
    onReady : sessionReadyHandler
});