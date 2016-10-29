<!DOCTYPE html>
<!--
Copyright (C) 2016 Yamil Elías <yamileliassoto@gmail.com>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
-->

<%-- Import needed page to use Web Service --%>
<%@page import="edu.client.WebserviceConsumer" %>

<!-- Call Angular hangman App -->
<html ng-app="hangman">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS Styles -->
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="stylesheet" href="assets/css/bootstrap.css" />

    <!-- JS Scripts -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
    
    <!-- AngularJS File -->
    <script src="assets/ng/hangman.js"></script>

    <%
        // Get random word from the web service
        WebserviceConsumer wsc = new WebserviceConsumer();
        String randomWord = wsc.getWord("http://cml.chi.itesm.mx:8080/HangmanWebService/getRandomWord.jsp");
    %>
    
    <title>Hangman Web Service</title>
</head>
  
<body ng-init="randomWord = '<% out.print(randomWord); %>';">
    <!-- Use the hangman controller from hangman app -->
    <div class="container-fluid" ng-controller="hangmanController">
        <div class="well">
            <h1><strong>Hangman</strong></h1>
            <h2>The Web Service Game</h2>

            <!-- Canvas for hangman drawing -->
            <canvas id="hangmanCanvas" width="600" height="300"></canvas>
            <script src="assets/js/canvas.js"></script>
            <div class="secretWord">
                <ul class="list-inline">
                    <!-- Print hidden words -->  
                    <li ng-repeat="letter in hiddenWord">
                    <span ng-hide="letter.chosen">_</span>
                    <span ng-show="letter.chosen">{{ letter.name }}</span>
                    </li>
                </ul>

                <!-- Print available letters --> 
                <div class="letters">
                    <ul class="list-inline">
                        <li ng-repeat="letter in letters">
                            <!-- Use angular to inspect if the letter have been chosen already -->
                            <button class="btn btn-primary letter-button"
                                ng-disabled="letter.chosen"
                                ng-click="try(letter);">{{letter.name}}</button>
                        </li>
                    </ul>
                </div>

                <p>
                    <i><span ng-hide="win || lost">You have {{ missesAllowed - numMisses }} guesses remaining.</span></i>
                    <span ng-show="win">Well done!</span>
                    <span ng-show="lost">Sorry, please try again!</span>
                </p>
            </div>

            <!-- Button to reset the game -->
            <button ng-click="reset();" class="btn btn-primary btn-large" onclick="location.reload();">New Game</button>
            <hr />
            <p><i>Developed by <a href="https://yamilelias.github.io">Yamil Elías</a></i></p>
        </div>
    </div>

    <!-- Other Scripts -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
</body>
</html>
