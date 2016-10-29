/* 
 * Copyright (C) 2016 Yamil Elías <yamileliassoto@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

var hangmanController = function($scope) {
  
  $scope.missesAllowed = 6;
  
  var getRandomWord = function() {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
  };
  
  var makeLetters = function(word) {
    return _.map(word.split(''), function(character) {
      return { name: character, chosen: false };
    });
  };
  
  var revealSecret = function() {
    _.each($scope.secretWord, function(letter) {
      letter.chosen = true;
    });
  };
  
  var checkForEndOfGame = function() {
    $scope.win = _.reduce($scope.secretWord, function(acc, letter) {
      return acc && letter.chosen;
    }, true);
    
    if (!$scope.win && $scope.numMisses === $scope.missesAllowed) {
      $scope.lost = true;
      revealSecret();
    }
  }
  
  $scope.reset = function() {
    _.each($scope.letters, function(letter) {
      letter.chosen = false;
    });
    $scope.secretWord = makeLetters(getRandomWord());
    $scope.numMisses = 0;
    $scope.win = false;
    $scope.lost = false;
  };
  
  $scope.reset();
  
  $scope.try = function(guess) {
    guess.chosen = true;
    var found = false;
    _.each($scope.secretWord,
           function(letter) {
             if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
               letter.chosen = true;
               found = true;
             }
           });
    if (!found) {
      $scope.numMisses++;
    }
    checkForEndOfGame();
  };
  
  $scope.letters = makeLetters("abcdefghijklmnopqrstuvwxyz");
  
};

var words = [
  'Rails', 'AngularJS', 'Bootstrap', 'Ruby', 'JavaScript',
  'authentication', 'function', 'array', 'object', 'sublime',
  'github', 'agile', 'route', 'database', 'model', 'view',
   'controller', 'terminal', 'array', 'data', 'inheritance',
  'Heroku', 'scope',  'closure'
];
    