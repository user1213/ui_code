(function(){

	const NAME = 'John';
	const LOCATION = 'New York City';

	var app = angular.module('empApp', [])
				.controller('empControl', function($scope, $http, empService, empFactory){
					var ec = this;
					ec.init = function(){
						ec.appName = empService.getName();
						ec.location = empFactory.getLocation();
					}
					ec.add = function(){
						var item = '<li>' + ec.name + ' works for ' + ec.company + ' and earns $' + ec.salary + '</li>';
						$('#empList').append(item);
						ec.reset();
					}
					ec.reset = function(){
						$('input[type=text]').each(function(index, value){
							$(value).val('');
						});
						$('input[type=text]').eq(0).focus();
					}
					ec.addByKey = function(event){
						if(event.keyCode === 13){
							ec.add();
						}
						else if(event.keyCode === 27){
							ec.reset();
						}
					}
				});

	app.service('empService', function(){
		this.getName = function(){
			return NAME;
		};
	});

	app.factory('empFactory', function(){
		var module = {};
		module.getLocation = function(){
			return LOCATION;
		}
		return module;
	});

})();