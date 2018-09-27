/**
 * Created by woody on 2015/12/12.
 */
angular.module('sbAdminApp').factory('WebSocket', ['$websocket', '$rootScope','localStorageService', function($websocket, $rootScope,localStorageService) {
//  var ws = $websocket('ws://localhost:9001/mywebsocket');
  var wsurl = $rootScope.websocketUrlController+'?userId='+localStorageService.get('userId');;
  console.log(wsurl)
  var ws = $websocket(wsurl);
  var collection = [];
  ws.onMessage(function(event) {
    console.log('message: ', event);
    var res;
    try {
      res = (new Function("return " + event.data))();
    } catch(e) {
      res = {
          'userId': $rootScope.userId,
          'message': event.data
      };
    }
  });
  ws.onError(function(event) {
    console.log('connection Error', event);
  });
  ws.onClose(function(event) {
    console.log('connection closed', event);
  });
  ws.onOpen(function() {
    console.log('connection open');
   ws.send('{"key":"hello","val":"woody"}');
  });
  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) 
      {
        ws.send(message);
      }
      else if (angular.isObject(message)) 
      {
        ws.send(JSON.stringify(message));
      }
    }
  };
}]);