angular.module('FilteringSelect',['ui.bootstrap.collapse']).controller('fsController', ['$http', '$scope', function($http, $scope){
	$scope.listItems = [];
	$scope.selectedItems = [];
	$scope.act = false;
	$scope.isCollapsed = true;
		
	$http.get("data/data.js")
	.success(function(data) {
		$scope.listItems = data;
	})
	.error(function(err){
		console.log(err);
	});
				
	this.itemSelected = function(item, $event){
		if(!containsObject(item.item, $scope.selectedItems)){
			$scope.selectedItems.push(item.item);
		}
		$scope.act = false;
		
		setTimeout(function(){
			document.body.click();
		}, 500);
		//$event.stopImmediatePropagation();
		$scope.isCollapsed = false;
		
	};
	
	this.removeItem = function(item){
		for(i=0;i<$scope.selectedItems.length;i++){
			if($scope.selectedItems[i].value == item.selectedItem.value){
				$scope.selectedItems.splice(i, 1);
			}
		}
		if($scope.selectedItems.length ==0){
			$scope.isCollapsed =true;
		}
	};
	
	function containsObject(obj, list) {
		var i;
		for (i = 0; i < list.length; i++) {
			if (list[i] === obj) {
			return true;
			}
		}
		return false;
	};
			
	this.focus = function($event){
		$event.currentTarget.focus();
		console.log($scope.act); 
	};
		
		var addNewStyle = function (newStyle) {
		var styleElement = document.getElementById('styles_js');
		if (!styleElement) {
			styleElement = document.createElement('style');
			styleElement.type = 'text/css';
			styleElement.id = 'styles_js';
			document.getElementsByTagName('head')[0].appendChild(styleElement);
		}
		styleElement.appendChild(document.createTextNode(newStyle));
	}

		addNewStyle('.input-group-btn .dropdown-menu {width: '+document.body.querySelector(".bootstrap-select.input-group").clientWidth + "px !important"+'}');
}]);