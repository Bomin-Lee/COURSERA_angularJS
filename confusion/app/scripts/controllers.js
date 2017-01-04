'use strict';

angular.module('confusionApp')
    
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
      
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showDetails = false;
  
      $scope.showMenu = false;
      $scope.message = "Loading ...";
      $scope.dishes= {};
      menuFactory.getDishes()
          .then(
              function(response) {
                $scope.dishes = response.data;
                $scope.showMenu = true;
              },
              function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
              }
          );
      
      
      $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
          $scope.filtText = "mains";
        }
        else if (setTab === 4) {
          $scope.filtText = "dessert";
        }
        else {
          $scope.filtText = "";
        }
      };
      
      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };
      
      $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
      };
    }])
    
    .controller('ContactController', ['$scope', function($scope) {
      
      $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
      
      var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
      
      $scope.channels = channels;
      $scope.invalidChannelSelection = false;
      
    }])
    
    .controller('FeedbackController', ['$scope', function($scope) {
      
      $scope.sendFeedback = function() {
        
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
          $scope.invalidChannelSelection = true;
        }
        else {
          $scope.invalidChannelSelection = false;
          $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
          $scope.feedback.mychannel="";
          $scope.feedbackForm.$setPristine();
        }
      };
    }])
    
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
      $scope.showDetails = false;
      $scope.message = "Loading..";
      $scope.dish = {};
      menuFactory.getDish(parseInt($stateParams.id, 10))
          .then(
              function(response){
                $scope.dish = response.data;
                $scope.showDetails = true;
              },
              function(response){
                $scope.message = "Error: "+response.status+" "+response.statusText;
              }
          );
      
      // display rating by star.
      $scope.ratedStars = ['★', '★★', '★★★', '★★★★', '★★★★★'];
      $scope.getStars = function(comment, rate){
        if(1 <= rate && rate <= 5){
          return $scope.ratedStars[rate-1];
        }
      };
      
    }])
    
    .controller('DishCommentController', ['$scope', function($scope) {
      
      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
      
      $scope.submitComment = function () {
        
        $scope.mycomment.date = new Date().toISOString();
        
        $scope.dish.comments.push($scope.mycomment);
        
        $scope.commentForm.$setPristine();
        
        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
      }
    }])
    
    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
      $scope.featuredDish = {};
      $scope.showDish = false;
      $scope.showPromotion = false;
      $scope.message = "Loading..";
      menuFactory.getDish(0)
          .then(
              function(response){
                $scope.featuredDish = response.data;
                $scope.showDish = true;
              },
              function(response){
                $scope.message = "Error: "+response.status+" "+response.statusText;
              }
          );
      $scope.promotion = {};
      menuFactory.getPromotion(0)
          .then(
              function(response){
                $scope.promotion = response.data;
                $scope.showPromotion = true;
              },
              function(response){
                $scope.message = "Error: "+response.status+" "+response.statusText;
              }
          );
      $scope.chef = corporateFactory.getLeader(3);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
      $scope.leaders = corporateFactory.getLeaders();
    }])

    
.controller('HeaderController', ['$scope', function($scope){
  var navClass= [0,0,0,0];
  $scope.navClass = navClass;
  $scope.navClicked = function(index){
    if ($scope.navClass[index] == 0){
      $scope.navClass = [0,0,0,0];
      $scope.navClass[index] = "active";
    }
  }
}])

;
