'use strict';
var BASE_URL = 'http://192.168.1.23:81/api/web/app.php';

var app = angular.module('linkApp', ['ngResource', 'ui.router', 'ngAnimate','ngMaterial'])
.config( function ($stateProvider, $urlRouterProvider, $mdThemingProvider){
  $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
    
    $stateProvider.state('home', {
        url : '/home',
        controller : 'homeCtrl',
        templateUrl : 'views/home.html'
    })
    .state('login', {
        url : '/login',
        controller : 'loginCtrl',
        templateUrl :'index.html'
    })
    .state('logout', {
        url : '/logout',
        controller : 'loginCtrl',
        templateUrl : 'index.html'
    })
    .state('admin', {
        url : '/admin',
        controller : 'adminCtrl',
        templateUrl : 'views/admin-all.html'
    })
    .state('contact', {
        parent : 'admin',
        url : '/contact/:id',
        controller : 'contactCtrl',
        templateUrl : 'views/contact.html'
    })
    .state('newContact', {
        parent : 'admin',
        url : '/newcontact',
        controller : 'newContactCtrl',
        templateUrl : 'views/newContact.html'
    });
    $urlRouterProvider.when('/logout', 'logout');
})
.factory('conversation', function(){
     
    var contactConversation = {};
    return {
        setConversation : function(contact){
            contactConversation =  contact;
        },
        getConversation : function(){
            return contactConversation;
        }
    }
})
.factory('Contacts', function($http){
     return  $http({ method : 'GET', url :  BASE_URL+  '/allContacts'});
})
.factory ('Favorites', function( $http) {
    return {
        getFavorites : function(email){
            return $http.post(BASE_URL+  '/listeContact', {email: email});
        }
    } 
})
.factory('ContactsAdmin', function($http){
    return $http.get(BASE_URL+ '/allContactsAdmin');
})

.factory('addContactFactory', function( $http, $rootScope){
    return {
        add : function(contact){
           return $http.post(BASE_URL+'/addContact', { userId : $rootScope.currentUser.id, destId : contact.id});
        }
    }
})
.factory ('removeFavoryFactory', function($http, $rootScope){
     return {
        remove : function(contact){
            return $http.post(BASE_URL+'/removeContact', {userId : $rootScope.currentUser.id, destId : contact.id});   
        }
    }
})
.factory( 'StatusFactory', function($http){
    return {
        change : function(email, status){
            $http({
                method :  'POST',
                url : BASE_URL+'/changeStatus',
                data : {
                    email : email,
                    status : status
                }
            })   
        }   
    }
})
.factory('sendMessageFactory', function($http){
    return {
        send : function(dest, src, msg){
            $http({
                method : 'POST',
                url : BASE_URL+'/sendMessage',
                data : {
                    d_email : dest,
                    s_email : src,
                    m : msg
                }
            })   
        }   
    }
})
.factory('newContact', function($http){
    return {
        save : function(contact){
          return  $http.post(BASE_URL + '/newContact', contact);
        }
    }
})
.factory('updateContact', function($http){
    
    return {
        update: function(contact){
         return  $http.post(BASE_URL + '/updateContact', contact);
        }
    }
})
    /*
    return {
        updateContact : function(contact){
             $http({
                 url : BASE_URL + '/updateContact',
                 method : 'POST',
                 data : {
                     nom : 'dian'
                     //prenom : contact.prenom,
                    // email : contact.email,
                  //   titre : contact.titre,
                //     localisation : contact.localisation,
                  //   role : contact.role
                 }
                }).then( function(response){
                 console.log(contact.email);
                 console.log(response);
             })
        }
        
    }*/
.factory('rmContact', function($resource, $http){
      
    /*return {
          removeC : function(contact){
              $http({
                  method :'POST',
                  url : BASE_URL+ '/removeContact',
                  data : {
                      email : contact.email
                  }
              }).then ( function( response){
                  console.log( response);
              })
          }
      }*/
        
     return $resource(BASE_URL+ '/removeContact', { email : '@contactInAdmin.email'});

})
// Factory for administration
.factory('Contact', function(){
    var contact = {};
    return {
        setContact : function(c){
            contact = c;
        },
        getContact : function(){
            return contact;
            
        }
    }
})
.factory('messagesRecov', function(){
    var messages = [];
    return {
        setMessage : function(m){
            messages = m;
        },
        getMessage : function(){
            return messages
        }
    }
    
})
.factory ('TableCompenentClass', function(){
    var table = {
        'thead' : {'visibility' : 'visible'},
        'tbody' : {'visibility' : 'visible'},
        'tfoot' : {'visibility' : 'hidden'}
     };
    return {
        setAttributeTable  : function(h, b, f){
            table.thead = h;
            table.tbody = b;
            table.tfoot = f;
        },
        getAttributeTable : function(){
            return table;
        }
    }
})
.factory('AuthFactory', function($http, User, $state, $rootScope){
    return {
        authenticate : function(credentials){
                $http({
                    method : 'POST',
                    url : BASE_URL+'/crediantialCheck',
                    data : {
                        username : credentials.email,
                        password : credentials.password
                    }
                }).then( function ( data){
                    if ( 'disabled' === data.data) {
                        $rootScope.stateInvalid = true; 
                    }
                    else if ('No' === data.data) {
                        $rootScope.LoginFormInvalid = true;
                    }
                    else{
                        User.setUser(data.data);
                        $rootScope.id = User.getUser().id;
                        $state.go('home');
                    }
                }, function (err){
                    
                })
        }
    };
})      
.factory('User', function(){
    var user = {};
    return {
        setUser : function(u){
            user = u;
        },
        getUser : function(){
            return user;
        }
        
    }
    
})
.factory('Data', function(){
    return {
        getDataString : function(data) {
            var d = '';
            angular.forEach( data, function(item){
                if( typeof(item) == 'string'){
                d+=item;
                }
            })
        return d;
    }
        
    }
})
.factory ('DestId', function (){
 var destId = '', id = '', email = '';
    return {
        setDestinationId : function(d){
            destId = d;
        },
        getDestinationId : function(){
            return destId;
        },
        setContactId : function(d){
            id = d;
        },
        getContactId : function(){
            return id;
        },
         setContactEmail : function(e){
            email = e;
        },
        getContactEmail : function(){
            return email;
        }
        
    }
})

.directive('chevronDownDirective', function(){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            element.click (function(){
               element.parents('thead').addClass('table-no-border');
               element.parents('thead').siblings('tbody').addClass('table-no-border');
               element.parents('table').toggle();
               element.parents('table').siblings('footer').toggle();     
            })
        }   
    }
})
.directive('chevronUpDirective', function(){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            element.click( function(){  
                element.parents('html').animate({ scrollTop: $(document).height()+90-$(window).height() });
                element.parents('body').animate({ scrollTop: $(document).height()+90-$(window).height() });
                element.parents('footer').toggle();
                element.parents('footer').siblings('table').toggle();
                element.parents('footer').siblings('table').children('thead').removeClass('table-no-border');
                element.parents('footer').siblings('table').children('tbody').removeClass('table-no-border');
            })
        }
    }
})
.directive('textDirective', function($rootScope, DestId, sendMessageFactory){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            function getHeure(date){
                var heures = ("0" +date.getHours()).slice('-2');
                var minutes = ("0" +date.getMinutes()).slice('-2');
                return (heures+ ":"+minutes);
            }
            element.keyup ( function(e){
                if( e.keyCode == 13){
                    var message = element.val();
                    if( message.trim() != ''){
                        sendIMessage(DestId.getDestinationId() , $rootScope.currentUser.id, message);
                        sendMessageFactory.send(DestId.getContactEmail(),$rootScope.currentUser.email,message);
                         element.parent().parent().parent().siblings('tbody').append('<tr>'+
                        '<td>'+
                        '<div class="" style="margin-left:0px;">'+
                                        '<p class="bg-danger left" style="margin-bottom : 0;">'+message+ '&nbsp;'+ '<span class="pull-right small  text-muted">'+ getHeure ( new Date ())+'</span>'+
                                        '</p>'+
                                        '</div>'+
                                        '</td>'+
                                        '</tr>');
                    }
                    element.parent().parent().parent().siblings('tbody').animate({
                            scrollTop: element.parent().parent().parent().siblings('tbody')[0].scrollHeight},2000);
                    element.val('');
                            
                    }
            })
            
        }
    }
    
})
.directive('leftDirective', function($filter){
    return {
        restrict : 'E',
        template : '<p class="bg-danger left" style="margin-bottom : 0;">{{message}}&nbsp;<span class="pull-right small text-muted">{{time}}</span></p>',
        link : function( scope, element, attrs){
            scope.message = attrs.message;
            scope.time =attrs.time;
            element.parent('div').parent('td').parent('tr').parent('tbody').animate({
                scrollTop: element.parent('div').parent('td').parent('tr').parent('tbody')[0].scrollHeight},200)
            }    
        }
})
.directive('rightDirective', function(){
    return {
        restrict : 'E',
        template : '<p class="bg-info rigth" style="margin-bottom : 0;">{{message}}&nbsp;<span class="pull-right small  text-muted">{{time}}</span></p>',
        link : function( scope, element, attrs){
            scope.message = attrs.message;
            scope.time = attrs.time;
            element.parent('div').parent('td').parent('tr').parent('tbody').animate({
                scrollTop: element.parent('div').parent('td').parent('tr').parent('tbody')[0].scrollHeight},200)
            }        
        }
})
.directive( 'avatarDirective' , function(){
    return {
        restrict : 'E',
        template : '<span class= "img-circle" initials = "{{initials}}" style= "{{style}}" bgborder ="">{{initials}}</span>',
        link : function (scope, element, attrs) {
            attrs.class = "img-circle";
            scope.initials = attrs.initials;
            scope.style = "border : 2px solid " + attrs.bgborder+ ";"+ "width : 100%; height = 100%; background-color : #663399;"; 
        }
    }  
})
.directive ( 'convDirective', function(){
    return  {
        restrict : 'A',
        link : function( scope, element, attrs){
            element.data('clicked', true);
        }
    }
    
})
.directive ('dragDirective', function(){
    return {
        restrict : 'A',
        link : function(scope, element, attrs){
            element.draggable();
        }
    }
})
.directive ('overDirective', function(){
    
    return {
        restrict : 'A',
        link : function( scope, element, attrs){
            element.mouseover ( function(){
                element.attr('title', element.contents().text());
            })
            element.click( function(){
                element.siblings('table').slideToggle('fast');
                 element.parent('td').parent('tr').parent('tbody').parent('table').parent('div').animate({
                     scrollTop : element.parent('td').parent('tr').parent('tbody').parent('table').parent('div')[0].scrollHeight
                 }, 200);
                
               
            })
        }
    }
})
.filter('dateFilter', function(){
    return function(date){
        return $filter ('date')(date);
    
    }
})
;
