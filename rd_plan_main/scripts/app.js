'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var iwoboApp = angular.module('sbAdminApp', [
    'LocalStorageModule',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'duScroll',
    'treeControl'
]);
iwoboApp.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/modal/modalController.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/header/header-notification/header-notification.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                            ]
                        }),
                        $ocLazyLoad.load(
                            {
                                name: 'toggle-switch',
                                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngAnimate',
                                files: ['bower_components/angular-animate/angular-animate.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngCookies',
                                files: ['bower_components/angular-cookies/angular-cookies.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                    $ocLazyLoad.load(
                        {
                            name: 'ngTouch',
                            files: ['bower_components/angular-touch/angular-touch.js']
                        })
                }
            }
        })
        .state('dashboard.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        })
        .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        })
        .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login',
            controller: 'LoginCtrl',
            params: {
                "from": null
            },
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/loginController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('register', {
            templateUrl: 'views/pages/register.html',
            url: '/register',
            controller: 'RegisterCtrl',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/registerController.js',
                            'scripts/controllers/modal/registerModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.index', {
            url: '/index',
            controller: 'IndexCtrl',
            templateUrl: 'views/dashboard/index/index.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/index/indexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex', {
            url: '/unfinishedTaskIndex',
            controller: 'UnfinishedTaskIndexCtrl',
            templateUrl: 'views/dashboard/task/unfinishedTaskIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/task/unfinishedTaskIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.unfinishedTaskList', {
            url: '/unfinishedTaskList',
            controller: 'UnfinishedTaskListCtrl',
            templateUrl: 'views/dashboard/task/unfinishedTaskList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/task/unfinishedTaskListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex', {
            url: '/finishedTaskIndex',
            controller: 'FinishedTaskIndexCtrl',
            templateUrl: 'views/dashboard/task/finishedTaskIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/task/finishedTaskIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.finishedTaskList', {
            url: '/finishedTaskList',
            controller: 'FinishedTaskListCtrl',
            templateUrl: 'views/dashboard/task/finishedTaskList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/task/finishedTaskListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpInfo', {
            url: '/approveEpInfo',
            controller: 'ApproveEpInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpModifyInfo', {
            url: '/approveEpModifyInfo',
            controller: 'ApproveEpModifyInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpModifyInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpModifyInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.approveEpModifyInfoUnfinished', {
            url: '/approveEpModifyInfoUnfinished',
            controller: 'ApproveEpModifyInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpModifyInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpModifyInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpInfoHistory', {
            url: '/approveEpInfoHistory',
            controller: 'ApproveEpInfoHistoryCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfoHistory.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "oldFrom": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoHistoryController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.approveEpInfo', {
            url: '/approveEpInfo',
            controller: 'ApproveEpInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.epAdminManageUnfinishedTaskForAdmin', {
            url: '/epAdminManageUnfinishedTaskForAdmin',
            controller: 'ApproveEpAdminInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpAdminInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/admin/approveEpAdminInfoController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.epAdminManageFinishedTaskForAdmin', {
            url: '/epAdminManageFinishedTaskForAdmin',
            controller: 'ApproveEpAdminInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpAdminInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveEpAdminInfoController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.planMain', {
            url: '/unfinishedPlanMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.planMain', {
            url: '/finishedPlanMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex', {
            url: '/planIndex',
            controller: 'PlanIndexCtrl',
            templateUrl: 'views/dashboard/plan/planIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/plan/planIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex.planMain', {
            url: '/planMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "epId": null,
                "epName": null,
                "from": null,
                "btnFlag":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex.planList', {
            url: '/planList',
            controller: 'PlanListCtrl',
            templateUrl: 'views/dashboard/plan/planList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/plan/planListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex', {
            url: '/roleIndex',
            controller: 'RoleIndexCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/sysadmin/roleIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleList', {
            url: '/roleList',
            controller: 'RoleListCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleInfo', {
            url: '/roleInfo',
            controller: 'RoleInfoCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleInfo.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'scripts/controllers/sysadmin/roleInfoController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleMenu', {
            url: '/roleMenu',
            controller: 'RoleMenuCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleMenu.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleMenuController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleUser', {
            url: '/roleUser',
            controller: 'RoleUserCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleUser.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleUserController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.menu', {
            templateUrl: 'views/dashboard/menu/menu.html',
            url: '/menu',
            controller: 'MenuCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/menu/menuController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.modifyPwd', {
            templateUrl: 'views/dashboard/modifyPwd.html',
            url: '/modifyPwd',
            controller: 'ModifyPwdCtrl',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/modifyPwdController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex', {
            url: '/epForAdminIndex',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminIndex.html',
            controller: 'EpForAdminIndexCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/enterpriseAdmin/epForAdminIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex.epForAdminList', {
            url: '/epForAdminList',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminList.html',
            controller: 'EpForAdminListCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/enterpriseAdmin/epForAdminListController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex.epForAdminInfo', {
            url: '/epForAdminInfo',
            controller: 'EpForAdminInfoCtrl',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminInfo.html',
            params: {
                "epId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/enterpriseAdmin/epForAdminInfoController.js',
                            'scripts/controllers/modal/promptModalController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.batchOperation', {
            url: '/batchOperation',
            controller: 'batchOperationController',
            templateUrl: 'views/dashboard/sysadmin/batchOperation.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/crypto-js/crypto-js.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/batchOperationController.js'
                        ]
                    })
                }
            }
        })
    /* $httpProvider.interceptors.push(['$rootScope','$injector','$q',function($rootScope,$injector,$q){
     return {
     'request':function(config){
     return config;
     },
     'response': function (config) {
     if(angular.equals("POST",config.config.method) || angular.equals("post",config.config.method)  )
     {
     //如果想跳转页面，需注入$injector，再获取$state
     var $state = $injector.get('$state');
     //$state.go("login");
     console.log("response=====>>"+JSON.stringify($state.current));
     }
     return config;
     }
     };
     }]);*/
}]);
iwoboApp.run(['$state', '$rootScope', 'localStorageService', '$modal', '$log', 'Init', function ($state, $rootScope, localStorageService, $modal, $log, Init) {
    console.log("===========iwobo app running====================================");
    // $rootScope.baseUrl = 'http://lovewobo.com';
    $rootScope.baseUrl = 'http://localhost:9002/api';
    // $rootScope.baseUrl = 'http://192.168.2.139:9002/api';
    //$rootScope.baseUrl = 'http://60.30.64.249:7080/rd_2nd';
    $rootScope.baseUrlPath = '';
    $rootScope.uuid = '';
    $rootScope.platform = "";
    $rootScope.logintitle = '';
    $rootScope.loginPic = '';
    $rootScope.userPortrait = '';
    $rootScope.ifLogin = '1';  //0-登录 1-未登录
    $rootScope.nickName = '';
    $rootScope.tel = '';
    $rootScope.mail = '';
    $rootScope.loginUrl = 'login';
    $rootScope.title = '管理面板';
    $rootScope.downFlag = true;
    $rootScope.downNum = 1;
    $rootScope.appId = '';
    $rootScope.appName = '请选择应用';
    $rootScope.APPS = new Array();
    $rootScope.logo = 'images/logo.png';
    //公司注册登录信息
    $rootScope.epName = "";
    $rootScope.epArea = "";
    $rootScope.epCode = "";
    //localStorageService.IWBSESSION = "";
    //时间控件是否点击
    $rootScope.dateClick = true;

    //页面按钮显示提示信息
    $rootScope.checkApp = function () {
        $('#element').popover('show');
    };
}]);

    
