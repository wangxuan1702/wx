//总路由模块
angular.module('route', ['ionic', 'starter.controllers'])


  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        // cache: false,//不缓存
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.newsDetail', {
        url: '/newsDetail',
        params:{
          docid:''
        },
        views: {
          'tab-dash': {
            templateUrl: 'templates/newsDetail.html',
            controller: 'newsDetailCtrl'
          }
        }
      })

      .state('tab.movies', {
        url: '/movies',
        views: {
          'tab-movies': {
            templateUrl: 'templates/tab-movies.html',
            controller: 'MoviesCtrl'
          }
        }
      })
      .state('tab.music', {
        url: '/music',
        views: {
          'tab-music': {
            templateUrl: 'templates/tab-music.html',
            controller: 'MusicCtrl'
          }
        }
      })
      .state('tab.detail', {
        url: '/music/detail',
        params: {
          songImg: "",
          singerName: "",
          songName: "",
          songUrl: ""
        },
        views: {
          'tab-music': {
            templateUrl: 'templates/music-detail.html',
            controller: "musicDetailCtrl"
          }
        }
      })
      .state('tab.mine', {
        url: '/mine',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine.html',
            controller: 'MineCtrl'
          }
        }
      })
      .state('tab.msg', {
        url: '/msg',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine-msg.html',
            controller: 'MineMsgCtrl'
          }
        }
      })
      .state('tab.setting', {
        url: '/setting',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine-setting.html',
            controller: 'MineSettingCtrl'
          }
        }
      })
      .state('tab.collection', {
        url: '/collection',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine-collection.html',
            controller: 'MineCollectionCtrl'
          }
        }
      })
      .state('tab.collectionPlay', {
        url: '/collectionPlay',
        params: {
          songImg: "",
          singerName: "",
          songName: "",
          songUrl: ""
        },
        views: {
          'tab-mine': {
            templateUrl: 'templates/collectionPlay.html',
            controller: 'collectionPlayCtrl'
          }
        }
      })
      .state('tab.suggest', {
        url: '/suggest',
        views: {
          'tab-mine': {
            templateUrl: 'templates/tab-mine-suggest.html',
            controller: 'MineSuggestCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
