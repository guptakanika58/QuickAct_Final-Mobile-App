angular.module('starter.controllers', [])


// Dashboard Controller
.controller('DashCtrl', function($scope,$location,$http) {
  $scope.user={};
  $scope.isShow=false;
  $scope.goArea=function(){
    $http.post('/authenticate', $scope.user).success(function(res){
      if(res.data){
        localStorage.setItem('auth', JSON.stringify($scope.user));
        //.auth=$scope.user;
        $location.path("tab/sectors");
      }else{
        $scope.isShow=true;
      }
    }).error(function(err){
      console.log(err);
    });
    /*if($scope.user.uname =="consumer" && $scope.user.pwd =="123456" ){
    $location.path("tab/sectors");
    }*/
  }
})

//Sector Controller
.controller('SectorCtrl', function($scope, Area) {
  $scope.areas = Area.all();
  $scope.remove = function(chat) {
    Area.remove(area);
  };
})


// Activity Controller
.controller('ActivityCtrl', function($scope, Activity) {


  $scope.activities = Activity.all();
  $scope.remove = function(chat) {
    Activity.remove(area);
  };
})

.controller('ProblemCtrl', function($scope, Problem,$location) {
  $scope.notchecked=true;
  $scope.select=function(id){ 
    //if(!($(id).hasClass("checkbox-background"))){
    $("#"+id).hide().siblings(".check").css("display","inline-block").show();
    $scope.notchecked=false;

    //}
  };


  $scope.navigate=function(){
    $location.path("tab/proof");
  };

  $scope.problems = Problem.all();
  $scope.remove = function(chat) {
    Problem.remove(area);
  };
})

// Proof controller
.controller('ProofCtrl', function($scope, Proof, $ionicPopover) {

   var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

   $scope.popover = $ionicPopover.fromTemplate(template, {
     scope: $scope
   });


    uniqueid=function(){
     var date = new Date();
     var components = [
         date.getYear(),
         date.getMonth(),
         date.getDate(),
         date.getHours(),
         date.getMinutes(),
         date.getSeconds(),
         date.getMilliseconds()
     ];

     var id = components.join("");
   return id;
    };

   // .fromTemplateUrl() method
   $ionicPopover.fromTemplateUrl('my-popover.html', {
     scope: $scope
   }).then(function(popover) {
     $scope.popover = popover;
   });


   $scope.openPopover = function($event) { 
    var id=uniqueid();
    setTimeout(function(){
      $("#unique").html(id);
    },100);
    
     $scope.popover.show($event);
   };
   $scope.closePopover = function() {
     $scope.popover.hide();
   };
   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.popover.remove();
   });
   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
     // Execute action
   });
   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
     // Execute action
   });

  $scope.iterate=0;
  $scope.thrdcheck=false;
  $scope.isDisable=true;

  $scope.camera=function(){
    $("#camera-image,.capture").addClass("hide");
    $("#camera-image-hidden").removeClass("hide");
    $scope.isDisable=false;
  }

  $scope.select=function(id,key){ 

    $("#"+id).hide().siblings(".check").css("display","inline-block").show();
    if(key==2){
      $scope.thrdcheck=true;
    }

  };

  $scope.proofs = Proof.all();
  $scope.remove = function(chat) {
    Proof.remove(area);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
