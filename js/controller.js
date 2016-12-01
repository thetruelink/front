var BASE_URL = 'http://192.168.2.3:81/worldLink/web/app.php';
var session = '';
app.controller('appCtrl', function(){
    
});

app.controller('homeCtrl', function($scope, $http, Contacts, addContactFactory, removeFavoryFactory, StatusFactory, Favorites, Data, User, DestId, sendMessageFactory, conversation, $rootScope){
    
    $scope.user =   User.getUser();
    $scope.user.status = 'Disponible';
    $scope.searchText = '';
    $scope.allContacts = [];
    
    $rootScope.currentUser = $scope.user;
   
    $.ajax({
        type : 'POST',
        data : {
            apiId :apiCC.session.apiCCId,
            id    :  $scope.user.id
        },
        url : BASE_URL+ '/changeApiId'
    }).done( function(data){
        //console.log( data);
    }).fail( function(err){
        //console.error( err);
    });
    
    Contacts.then( function ( data){
        $scope.allContacts = data.data;
    });
    
    setInterval( function(){
            Contacts.then( function ( data){
            $scope.allContacts = data.data;
    });
    }, 15000);
    
    //Initialisation des views
    var tabTemplateC = []; $scope.tabTemplate = [];
     Contacts.then( function ( data){
         tabTemplateC = data.data;
         angular.forEach(  tabTemplateC, function(contact){
             var c = {
                'contact' : contact,
                'show' : false
            };
            $scope.tabTemplate.push(c);
        });  
    });
    
    $rootScope.getAttributeShow = function(contact){
        var d = false;
        angular.forEach($scope.tabTemplate, function(c){
            if( c.contact.id == contact.id){
                d = c.show;
            }
        });
        return d;
    };
    
    $rootScope.setAttributeShow = function(contact, s){
        angular.forEach($scope.tabTemplate, function(c){
            if( c.contact.id == contact.id){
                $scope.tabTemplate[ $scope.tabTemplate.indexOf(c)].show = s;
            }
        });   
    }
  
    
    $scope.loadConversation = function(contact){ 
        
        
        /* Récupérer l'apiId à chaque click pour débuter une nouvelle conversation
        Parce qu'à un moment donné, l'apiId du destinataire a changé !
        */
        $.ajax({
            type : 'POST',
            data : {
                id:  contact.id
            },
            url :  BASE_URL+ '/getApiId'
        }).done( function (data) {
            DestId.setDestinationId (data);
            DestId.setContactId(contact.id);
        } ).fail( function (err) {
            
           // console.log( err);
        });
        
        $http({
            method : 'POST',
            url : BASE_URL+'/getMessages',
            data : {
                s : $rootScope.currentUser.id,
                d : contact.id
            }
            
        }).then ( function ( data){
                $scope.template= 'views/newChat.html#chatBoxId';
                $scope.setAttributeShow( contact, true);
                conversation.setConversation(contact);
                messagesRecov.setMessage ( data.data);
        }, function (err){});
         
    }
    $scope.$on('$includeContentLoaded', function(){
        
        $('html, body').animate({ scrollTop: $(document).height()-$(window).height() });
    });

    $scope.statusClass = 'text-success';
    $scope.changeStatus = function(status, myClass, name){
        $scope.user.status =  status;
        $scope.statusClass = myClass;
        StatusFactory.change( $scope.user.email, status);
    }
    $scope.getStatus = function(index){

        return conversations.findConversation(index).statut;  
    }
   $scope.favorites = [];
    /*
    Favorites.getFavorites($rootScope.currentUser.id).then( function( data){
        $scope.favorites = data.data;
    });
    */
    /*
    setTimeout( function(){
        Favorites.then( function(data){ 
        $scope.favorites = data.data;
    });
    }, 1500);
*/
    
    $scope.checkFavory = function(contact){
        var c=0;
        angular.forEach($scope.favorites, function(f){
            if( f.id === contact.id){
                c= 1;
            }            
        })
        return c;
    }
    
    /* Ajout d'un contact aux favoris*/
    
    $scope.addToFavorites = function(contact){
        if( $scope.checkFavory(contact) == 0){
            $scope.favorites.push(contact); 
            addContactFactory.add(contact);        
        }
    }
    /*Suppression d'un contact des favoris*/
    
    $scope.deleteToFavorites = function(favory){
        $scope.favorites.splice($scope.favorites.indexOf(favory), 1);
         removeFavoryFactory.remove(favory);
    }
    
    
});
app.controller('contactCtrl', function($scope, conversation, messagesRecov, Contact, $state , updateContact, rmContact, Data, $http){  
    $scope.contact = conversation.getConversation();
    $scope.messages = messagesRecov.getMessage();
    $scope.contactInAdmin  = Contact.getContact();
    $scope.gotoAdminHome = function(){
        $state.go('admin');   
    };
    $scope.update = function(){
         //updateContact.updateContact($scope.contactInAdmin); 
        
        updateContact.update($scope.contactInAdmin)
            .then(function(data){
             if(data.data == 'existe'){
                 $scope.exist = true;
             }
            else{
                $scope.contactSaved = true
            }  
        });
       // $state.go('admin');
    };
    $scope.remove = function(){
       // rmContact.removeC($scope.contactInAdmin);
        var c = new rmContact();
       c.$save({email : $scope.contactInAdmin.email}).then(function(data){ console.log(data)});
    }
    $scope.disableForm = true;
    
    $scope.admin = function(){
        $scope.disableForm = false;
    }
    
    $scope.changeState = function(){
        $http.post(BASE_URL + '/changeState', {email: $scope.contactInAdmin.email, state: $scope.contactInAdmin.state})
           .then( function(data){
            if( data.data === 'ok'){
               location.reload();
            }
        }, function(err){
            console.log(err);
        });
        
    }

 
});
app.controller('loginCtrl', function($scope, AuthFactory, Data){
    $scope.title ="trueLink";
   $scope.credentials = {
       email : '',
       password : ''
   };
    $scope.formSubmit = function(e){
        if( e == true){
            AuthFactory.authenticate ($scope.credentials);
        }
        
    }
    
});
app.controller('adminCtrl', function($scope, Contacts, $state, Contact, newContact, ContactsAdmin){
    $scope.searchText = '';
    ContactsAdmin.then( function ( data){
        console.log(data.data);
        $scope.allContacts = data.data;
    });
    
    $scope.setContact = function(c){
        Contact.setContact(c);
       // $state.go('contact');
    }
});
app.controller('newContactCtrl', function(newContact, $scope, Data, $state){
    $scope.contact = {
        nom :'',
        prenom : '',
        email : '',
        titre : '',
        localisation : '',
        role : ''
    };
    $scope.saveContact = function(){
         newContact.save($scope.contact)
        .then( function(data){
             $scope.registrerOk = data.data === 'ok' ? true : false;  
             $scope.exist = data.data === 'existe' ? true : false;  
        }, function(err){
             console.log(err);
         });
    }
});
