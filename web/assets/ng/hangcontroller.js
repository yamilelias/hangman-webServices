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

'use strict';
// TODO: Edit module to fit hangman necessities
angular.module('plan-picker', ['chayka-utils'])
    .directive('planPicker', ['utils', function(utils){
        return {
            controllerAs: 'ctrl',
            restrict: 'A',
            templateUrl: utils.getResourceUrl('a_shirt_club_wpt', 'ng/plan-picker.html'),
            bindToController: true,
            scope: {
                plan: '@',
                res: '@'
            },
            controller: function(){
                var ctrl = {
                    plan: '',
                    res: '',
                    
                    getJoinUrl: function(){
                        return '/join-' + ctrl.plan;
                    },

                    getImgUrl: function() {
                        if (ctrl.plan == 'trial') {
                            return ctrl.res +'t-shirt-promo-big-old.png';
                        } else{
                            return ctrl.res + 't-shirt-promo-big.png';
                        }
                    }
                };

                return ctrl;
            }
        };
    }])
;
