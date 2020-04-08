'use strict';

angular.module('Group')
.controller('group', function ($scope) {

  $scope.controller_loaded = 'Group loaded!';

  $scope.registro = function(p1,p2){
    console.log('pares 1 =', p1, 'pares 2 =', p2);
    return [2011];
  };

  $scope.teamBuilding = function(team, candidate) {
    if (team.length === 0) {
      team.push({candidate: candidate, repeated: 1 });
    } else {
      var flag = false;
      team.map(function(element) {
        if (element.candidate === candidate) {
          flag = true;
          element.repeated ++;
        } else if (element.candidate !== candidate && !flag) {
          team.push({candidate: candidate, repeated: 1 });
        }
      });
    }
    return team;
  };

  $scope.groupSelection = function(input) {
    var stockholmPeople = [];
    var londonPeople = [];
    var team = [];
    JSON.parse(input).map(function(item) {
      stockholmPeople = $scope.teamBuilding(stockholmPeople, item[0]);
      londonPeople = $scope.teamBuilding(londonPeople, item[1]);
    });
    $scope.push(team, stockholmPeople);
    $scope.push(team, londonPeople);

    var selected = team.filter(function(item, index, array) {
      return array.indexOf(item) === index;
    });
    $scope.selectedPeople = selected;
    return selected;
  };

  $scope.push= function(team, arrayCandidate) {
    arrayCandidate.map(function (item) {
      if (item.repeated>=2) {
        team.push(item.candidate);
      }
    });
  };


})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});