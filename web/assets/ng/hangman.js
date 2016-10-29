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

// Angular module that controls all the hangman functionality
angular.module('hangman', [])
    .controller('hangmanController', ['$scope', function($scope){

        $scope.missesAllowed = 6;

        // Deprecated function when web service enters
        $scope.getRandomWord = function() {
            var index = Math.floor(Math.random() * words.length);
            return words[index];
        };

        // Make the mapping for the letters
        $scope.makeLetters = function(word) {
            return _.map(word.split(''), function(character) {
                return { name: character, chosen: false };
            });
        };

        // Alphabet
        $scope.letters = $scope.makeLetters("abcdefghijklmnopqrstuvwxyz");

        // Reveal the word if the user lose
        $scope.revealWord = function() {
            _.each($scope.hiddenWord, function(letter) {
                letter.chosen = true;
            });
        };

        // Check everytime if the game is over to reveal the hidden word
        // and to set the letters unavailable to the user until game is restarted.
        $scope.checkForEndOfGame = function() {
            $scope.win = _.reduce($scope.hiddenWord, function(acc, letter) {
                return acc && letter.chosen;
            }, true);
            
            if (!$scope.win && $scope.numMisses === $scope.missesAllowed) {
                $scope.lost = true;
                $scope.revealWord();
            }
        };

        // Reset all variables to reset the entire game
        $scope.reset = function() {
            _.each($scope.letters, function(letter) {
                letter.chosen = false;
            });
            $scope.hiddenWord = $scope.makeLetters($scope.getRandomWord());
            $scope.numMisses = 0;
            $scope.win = false;
            $scope.lost = false;
        };
        $scope.reset();
  
        // Try the selected letter that the user clicks
        $scope.try = function(guess) {
            guess.chosen = true;
            var found = false;
            
            // Iterate the word searching for all the existings letters in the hidden word
            _.each($scope.hiddenWord, function(letter) {
                if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
                    letter.chosen = true;
                    found = true;
                }
            });
            
            // If letter wasn't found in the hidden word
            if (!found) {
                $scope.numMisses++;
            }

            // Does it end with this try?
            $scope.checkForEndOfGame();
        };
    }])
;

// Deprecated variable when web service enters.
var words = [
  'Rails', 'AngularJS', 'Bootstrap', 'Ruby', 'JavaScript',
  'authentication', 'function', 'array', 'object', 'sublime',
  'github', 'agile', 'route', 'database', 'model', 'view',
   'controller', 'terminal', 'array', 'data', 'inheritance',
  'Heroku', 'scope',  'closure'
];