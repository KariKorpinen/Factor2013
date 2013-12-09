'use strict';

/* Controllers */

var factoryControllers = angular.module('factoryControllers', []);

factoryControllers.controller('ListCtrl', ['$scope', 'Factory',
  function($scope, Factory) {
    $scope.repo = Factory.query();
    $scope.orderProp = 'city';
  }]);


  factoryControllers.controller('JsonCtrl', function($scope, $http, Factory,$filter) {
  //$http.get('/unzips/certfi_autoreporter_opendata_2008.json')
  //$http.get('/unzips').success(function(data,status,headers,config){
  $http.get('/unzips/certfi_autoreporter_opendata_2010.json').success(function(data,status,headers,config){
  $scope.reports=data;
  $scope.reports = $filter('orderBy')($scope.reports, 'city');
 
  var   varrepo=[];
  var countrepo=[];
  var categoryrepo=[];
  var categoryrepo2=[];
  
  for (var i=0;i<$scope.reports.autoreporter.opendata.length;i++)
  {
    for (var is2=0;is2<$scope.reports.autoreporter.opendata[i].asn.length;is2++)
	{
	  for (var is3=0;is3<$scope.reports.autoreporter.opendata[i].asn[is2].ipaddress.length;is3++)
	  {
	    varrepo.push({'cc': $scope.reports.autoreporter.opendata[i].asn[is2].ipaddress[is3].cc + ' ' + $scope.reports.autoreporter.opendata[i].asn[is2].ipaddress[is3].city});
        for (var is4=0;is4<$scope.reports.autoreporter.opendata[i].asn[is2].ipaddress[is3].incident.length;is4++)
		{
		  categoryrepo.push({'category': $scope.reports.autoreporter.opendata[i].asn[is2].ipaddress[is3].incident[is4].category.main});  
		}
	  }
	}
  }
  varrepo = $filter('orderBy')(varrepo,'cc');
  
  var varOldCC="";
  var varNewCC="";
  var varOldCity="";
  var varNewCity="";
  var varNewCount=0;
  var varOldCount=0;
  if(varrepo.length>0)
  {   
    varOldCC=varrepo[0].cc;
	varNewCount=0;
	for (var i2=1;i2<varrepo.length;i2++)
	{
	  varNewCC=varrepo[i2].cc;
	  varNewCount++;
	  if(varNewCC===varOldCC)
	  {
	  }
	  else
	  {
		countrepo.push({'cc': varOldCC,'varcount': varNewCount});
		varOldCC=varNewCC;
		varOldCount=varNewCount;
		varNewCC="";
		varNewCount=0;					 
	  }
	}//add last values
	countrepo.push({'cc': varOldCC,'varcount': 1});
  } 
  
  categoryrepo = $filter('orderBy')(categoryrepo,'category');
  var varOldCate="";
  var varNewCate="";
  var varNewCateCount=0;
  var varCateount=0;
  if(categoryrepo.length>0)
  {   
	varOldCate=categoryrepo[0].category;
	varNewCateCount=0;
			   
	for (var i3=1;i3<categoryrepo.length;i3++)
	{
	  varNewCate=categoryrepo[i3].category;
	  varNewCateCount++;
	  if(varNewCate===varOldCate)
	  {
	  }
	  else
	  {
	    categoryrepo2.push({'category': varOldCate,'varcatecount': varNewCateCount});
					 
        varOldCate=varNewCate;
		varNewCate="";
		varNewCateCount=0;					 
	  }
	}//add last values
	if(varNewCateCount<1)
	  varNewCateCount=1;
	categoryrepo2.push({'category': varOldCate,'varcatecount': varNewCateCount});
  }  
  $scope.repo = Factory.query();
  $scope.orderProp = 'city';
	
  $scope.repo=countrepo;
  $scope.repo2=categoryrepo2;
  });
});
