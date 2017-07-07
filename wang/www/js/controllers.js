angular.module('starter.controllers', [])

//首页控制器
.controller('DashCtrl', function($scope,$http,$state, $ionicLoading,$ionicScrollDelegate) {
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  var num = 0;
  $scope.urlArray = [
    {name:"旅游",url:'http://c.m.163.com/nc/article/list/T1348654204705/',index:0,T:'T1348654204705'},
    {name:"健康",url:'http://c.m.163.com/nc/article/list/T1414389941036/',index:1,T:'T1414389941036'},
    {name:"时尚",url:'http://c.m.163.com/nc/article/list/T1348650593803/',index:2,T:'T1348650593803'},
    {name:"漫画",url:'http://c.3g.163.com/nc/article/list/T1444270454635/',index:3,T:'T1444270454635'},
    {name:"数码",url:'http://c.3g.163.com/nc/article/list/T1348649776727/',index:4,T:'T1348649776727'}];
  $scope.changeDash = function (index) {
    num = 0;
    $scope.name = $scope.urlArray[index].name;
    $scope.index = $scope.urlArray[index].index;
    $scope.urlArray[index].num = 0;
    $http({
      url:"http://47.93.192.69:3000/wy?myUrl="+ $scope.urlArray[index].url +"0-20.html",
      method:"GET"
    })
      .then(function (res) {
        $ionicLoading.hide();
        var T = $scope.urlArray[index].T;
        // console.log(res.data[T]);
        $scope.data = res.data[T];
        // console.log($scope.data);
      });
  };
  //刷新请求数据
  $scope.changeDash(0);
  //下拉刷新
  $scope.doRefreshFun = function (index) {
    $http({
      url:"http://47.93.192.69:3000/wy?myUrl="+ $scope.urlArray[index].url +"0-20.html",
      method:"GET"
    })
      .then(function (res) {
        $ionicLoading.hide();
        var T = $scope.urlArray[index].T;
        $scope.data = res.data[T];
        $scope.$broadcast('scroll.refreshComplete');
      });
  }
  $scope.doRefresh = function () {
    console.log(this.name);
    console.log(this.index);
    $scope.doRefreshFun(this.index);

  }

  //上拉加载更多
  $scope.loadMore = function () {
    console.log(this.index);
    var aaa= this.name;
    var index = this.index;
    num += 20;
    console.log(num);
    $http({
      url:"http://47.93.192.69:3000/wy?myUrl="+ $scope.urlArray[index].url + num +'-'+(num + 20) + '.html',
      method:"GET"

    })
      .then(function (res) {
        console.log(res);
        var T = $scope.urlArray[index].T;
        // console.log(res.data[T]);
        // $scope.data = res.data[T];
        $scope.data = $scope.data.concat(res.data[T]);
        console.log( $scope.data);
        console.log('请求'+ aaa + num + '-' + (num+20) + '数据成功' );
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
  };
  $scope.goNewsDetail = function (index) {
      console.log(index);
      $state.go('tab.newsDetail',{
          docid : $scope.data[index].docid
      });
  }
})
.controller('newsDetailCtrl', function($scope,$http,$stateParams) {
  var docid = $stateParams.docid;
  console.log(docid);

  $http({
    url:"http://47.93.192.69:3000/wy?myUrl=http://c.m.163.com/nc/article/"+ docid +"/full.html",
    method:"GET"

  })
    .then(function (res) {
      console.log(res.data[docid]);
      $scope.newsDetailData = res.data[docid];
    });

})
//视频界面控制器
.controller('MoviesCtrl', function($scope, $http, $ionicLoading,$ionicScrollDelegate) {
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  //数据请求

  $scope.pageNum = $scope.pageNum?$scope.pageNum++:1;
  $scope.url= "http://route.showapi.com/255-1?showapi_appid=36003&showapi_sign=48fc36c80bd745cf88cee555f0095206&type=41&page="+$scope.pageNum;
  console.log($scope.url);
  $http({
    url:$scope.url,
    method:"GET"
  })
    .then(function (res) {
      $ionicLoading.hide();
      console.log(res.data.showapi_res_body.pagebean.contentlist);
      $scope.videoData = res.data.showapi_res_body.pagebean.contentlist;
    })
    .then(function (error) {
      if(error){
        console.log(error);
      }
    });
  $scope.loadMore = function () {
    $scope.pageNum++;
    console.log($scope.pageNum);
    $http({
      url:"http://route.showapi.com/255-1?showapi_appid=36003&showapi_sign=48fc36c80bd745cf88cee555f0095206&type=41&page="+$scope.pageNum,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res.data.showapi_res_body.pagebean.contentlist);
        $scope.videoData =$scope.videoData.concat(res.data.showapi_res_body.pagebean.contentlist);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if($scope.videoData.length < 20 ){
          pageNum = 0;
        }
      })
    };
})

.controller('MusicCtrl', function($scope, $http, $cacheFactory, $state, $ionicLoading,$ionicScrollDelegate) {
  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };




  $scope.changeMusic = function (id) {
     //数据请求
     $scope.url= "http://route.showapi.com/213-4?showapi_appid=36003&showapi_sign=48fc36c80bd745cf88cee555f0095206&topid=" + id;
       console.log($scope.url);
       $http({
         url:$scope.url,
         method:"GET"
       })
       .then(function (res) {
         $ionicLoading.hide();
         console.log(res);
         // console.log(res.data.showapi_res_body.pagebean.songlist);
         $scope.musicData = res.data.showapi_res_body.pagebean.songlist;
       })
       .then(function (error) {
         if(error){
           console.log(error);
         }
       });
 }
  $scope.changeMusic(3);
  $scope.goMusicDetail = function (index) {
     var obj = $scope.musicData[index];
     $state.go("tab.detail", {
       songImg:obj.albumpic_big,
       singerName: obj.singername,
       songName: obj.songname,
       songUrl: obj.url
     })

   }

})
  .controller('musicDetailCtrl', function($scope,$stateParams,$timeout,$ionicActionSheet) {
    $scope.show = function() {

      // 显示上拉菜单
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>QQ</b>' },
          { text: '微信' },
          { text: '微博' }
        ],

        cancelText: 'Cancel',
        cancel: function() {

        },
        buttonClicked: function(index) {
          return true;
        }
      });

      // $timeout(function() {
      //   hideSheet();
      // }, 6000);

    };
    var audio = document.querySelectorAll('audio');
      $scope.songImg = $stateParams.songImg;
      $scope.singerName = $stateParams.singerName;
      $scope.songUrl = $stateParams.songUrl;
      $scope.songName = $stateParams.songName;
      $scope.changeColor = function () {

      }
    $scope.$on('$ionicView.leave',
      function()
      {
        for (i=0;i<audio.length;i++){
          console.log(audio[i]);
          audio[i].pause();
        }
      });
  })

.controller('MineMsgCtrl', function($scope,$http) {

  $scope.data = [];
  $scope.send = function () {
    var aaa = document.getElementById('aaa');
    var sendMsg = aaa.value;
    aaa.value = '';
    $scope.data[$scope.data.length] = {name:'me',text:sendMsg};
    // console.log(document.getElementById('aaa'));
    console.log(sendMsg);
    var url = "http://route.showapi.com/60-27?showapi_appid=40871&showapi_sign=f17a09470cbd4d90946ef74a89d56031&info=" + sendMsg;
    console.log(url);
    $http({
      url:url,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res.data.showapi_res_body.text);
        // $scope.data = res.data.showapi_res_body.text;
        $scope.data[$scope.data.length] = {name:'tuling',text:res.data.showapi_res_body.text}
        console.log($scope.data);
      })
      .then(function (error) {
        if(error){
          console.log(error);
        }
      });

  };
  $scope.clear = function () {
    $scope.data = [];
  };

})
  .controller('MineSettingCtrl', function($scope) {

  })
  .controller('MineCtrl', function($scope) {
      $scope.imgUrl= '../www/img/bg.gif';
      $scope.userName = '未登录';

  })
  .controller('MineCollectionCtrl', function($scope,$state) {
      $scope.collectionData=[
        {songImg: "http://i.gtimg.cn/music/photo/mid_album_300/8/X/004avLEH3iQD8X.jpg",
        songUrl: "http://ws.stream.qqmusic.qq.com/202553248.m4a?fromtag=46",
        singerName:"G.E.M. 邓紫棋",
        songName: "桃花诺"
        },
        {songImg:"http://i.gtimg.cn/music/photo/mid_album_300/L/3/002qBBpu2q0vL3.jpg",
          songUrl: "http://ws.stream.qqmusic.qq.com/109191643.m4a?fromtag=46",
          singerName:"李玉刚",
          songName: "刚好遇见你"
        },
        {songImg: "http://i.gtimg.cn/music/photo/mid_album_300/Y/F/004fAhFe0fdHYF.jpg",
          songUrl: "http://ws.stream.qqmusic.qq.com/107762070.m4a?fromtag=46",
          singerName:"陈粒",
          songName: "小半"
        },
        {songImg: "http://i.gtimg.cn/music/photo/mid_album_300/g/c/0048Pthf2KOhgc.jpg",
          songUrl: "http://ws.stream.qqmusic.qq.com/108986243.m4a?fromtag=46",
          singerName:"王冕",
          songName: "勉为其难"
        }
      ];
    $scope.play = function (index) {
      var obj = $scope.collectionData[index];
      $state.go("tab.collectionPlay", {
        songImg:obj.songImg,
        singerName: obj.singerName,
        songName: obj.songName,
        songUrl: obj.songUrl
      })

    }


  })
  .controller('MineSuggestCtrl', function($scope) {
      $scope.text="请输入你的建议....";

      $scope.submitText =function () {
        var textArea = document.getElementById('textArea');
        var suggestText = textArea.innerHTML;
        console.log(suggestText);
        textArea.innerHTML = '提交成功！感谢您的建议！';

        setTimeout(function () {
          textArea.innerHTML = '';
        },3000);
      }

  })
  .controller('collectionPlayCtrl', function($scope,$stateParams) {
    var audio = document.querySelectorAll('audio');
    $scope.songImg = $stateParams.songImg;
    $scope.singerName = $stateParams.singerName;
    $scope.songUrl = $stateParams.songUrl;
    $scope.songName = $stateParams.songName;

    $scope.$on('$ionicView.leave',
      function()
      {
        for (i=0;i<audio.length;i++){
          console.log(audio[i]);
          audio[i].pause();
        }
      });
  })
  .controller('qqCtrl', function($scope) {
    $scope.LogIn = function () {
      var args = {};
      args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      QQSDK.ssoLogin(function (result) {
        alert('token is ' + result.access_token);
        alert('userid is ' + result.userid);
        alert('expires_time is ' + new Date(parseInt(result.expires_time)) + ' TimeStamp is ' + result.expires_time);
      }, function (failReason) {
        alert(failReason);
      }, args);
    }
    $scope.LogOut = function () {
      QQSDK.logout(function () {
        alert('logout success');
      }, function (failReason) {
        alert(failReason);
      });
    }
    $scope.guanyu = function () {
      alert('该APP创作于2017年6月');
    }
    $scope.banben = function () {
      alert('已是最新版本');
    }
    $scope.imgUrl= '../www/img/bg.gif';
    $scope.userName = '未登录';

  })

.filter('trusted', ['$sce', function ($sce) {
  return function(url) {
  return $sce.trustAsResourceUrl(url);
  };
}]);
