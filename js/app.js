// Source arrays available in fruit_and_veggies.js
console.log('Fruit count', fruit.length);
console.log('Veggie count', vegetables.length);

// Define main app module and call .run
var sortingGame = angular.module("SortingGame", []);

sortingGame.run(function(){
  console.log('App Started.');
})

// Define main controller
sortingGame.controller("game", ["$scope", function($scope) {
  console.log('Controller loaded.');

  // Trim down the source arrays to a more reasonable size
  var fruitShortList = [];
  var vegShortList = [];

  for (i = 0 ; i < 5 ; i++) {
    fruitShortList.push(fruit[Math.floor(Math.random() * fruit.length)]);
    vegShortList.push(vegetables[Math.floor(Math.random() * vegetables.length)]);
  };
  
  // Combine and shuffle the shortened arrays
  $scope.items = fruitShortList.concat(vegShortList).sort(function() {
    return 0.5 - Math.random();
  });

  // Define gameplay logic
  $scope.sortedFruit = [];
  $scope.sortedVeg   = [];

  $scope.sortFruit = function(itemIndex) {
    // console.log("sortFruit() triggered.");
    $scope.sortedFruit.push($scope.items[itemIndex]);
    $scope.items.splice(itemIndex, 1);
  };

  $scope.sortVeg = function(itemIndex) {
    // console.log("sortVeg() triggered.");
    $scope.sortedVeg.push($scope.items[itemIndex]);
    $scope.items.splice(itemIndex, 1);
  };

  $scope.undoSort = function(itemIndex, itemType) {
    // console.log("undoSort triggered.");
    if (itemType == "Fruit") {
      $scope.items.push($scope.sortedFruit[itemIndex])
      $scope.sortedFruit.splice(itemIndex, 1)
    }
    else {
      $scope.items.push($scope.sortedVeg[itemIndex]);
      $scope.sortedVeg.splice(itemIndex, 1);
    }
  };

  $scope.isFruit = function(itemIndex) {
    //console.log('Checking isFruit for index: ' + itemIndex);
    if (fruit.indexOf($scope.sortedFruit[itemIndex]) >= 0) {
      return true;    // isFruit
    } else {
      return false;   // !isFruit
    };
  }

  $scope.isVeg = function(itemIndex) {
    // console.log('Checking isVeg for value' + $scope.sortedVeg[itemIndex] + ' at index: ' + itemIndex);
    if (vegetables.indexOf($scope.sortedVeg[itemIndex]) >= 0) {
      return true;    // isVeg
    } else {
      return false;   // !isVeg
    };
  }
}])