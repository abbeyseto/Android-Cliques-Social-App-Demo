<<<<<<< HEAD
var moment = require("moment");

Parse.Cloud.define("registerActivity", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user = request.user;
  user.set("lastActive", new Date());
  user.save(null).then(
    function(user) {
      response.success("successful");
    },
    function(error) {
      console.log(error);
      response.error(error);
    }
  );
});

Parse.Cloud.define("updateUser", function(request, response) {
  Parse.Cloud.useMasterKey();
  var username = request.params.username;
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", username);
  query.first({
    success: function(object) {
      object.set("lastActive", new Date());
      object.save(null, {
        success: function(successData) {
          response.success("username updated successfully.");
          object.fetch();
        },
        error: function(error) {
          console.log("Error while updating the username: ", error);
        }
      });
    },
    error: function(errorData) {
      console.log("Error: ", errorData);
      response.error(errorData);
    }
  });
});
// Parse.Cloud.define("updateUser", function(request, response)
// {
//   Parse.Cloud.useMasterKey();
//   var query = new Parse.Query(Parse.User);
//   var objectId = request.params.objectId;
//   var username = request.params.username;
//   var email = request.params.email;
//   var userType = request.params.userType;
//   var password = request.params.password;

//   query.equalTo("objectId", objectId);
//   query.first({
//       success: function(object)
//       {
//         object.set("username", username);
//         object.set("email", email);
//         object.set("userType", userType);
//         object.set("password", password);
//         object.save();
//         response.success("Success");
//       },
//     error: function(error) {
//       alert("Error: " + error.code + " " + error.message);
//       response.error("Error");
//     }
//   });
// });
// Parse.Cloud.define("updateUser", function(request, response) {
//   var query = new Parse.Query("User");
//   query.equalTo("username", "Shade");
//   //var type = request.params.type;
//   query.first({
//     success: function(user) {
//       user.set("lastActive", new Date());
//       user.save(
//         null,
//         { useMasterKey: true },
//         {
//           success: function(object) {
//             response.success("SUCCESS");
//           },
//           error: function(object, error) {
//             response.error(error);
//           }
//         }
//       );
//     },
//     error: function(error) {
//       response.error(error);
//     }
//   });
// });

Parse.Cloud.define("getOnlineUsers", function(request, response) {
  var userQuery = new Parse.Query(Parse.User);
  var activeSince = moment()
    .subtract("minutes", 2)
    .toDate();
  userQuery.greaterThan("lastActive", activeSince);
  userQuery.find().then(
    function(users) {
      response.success(users);
    },
    function(error) {
      response.error(error);
    }
  );
});

// Parse.Cloud.run('registerActivity').then(function(result) {
//     // result should be 'Update object successfully'
//     console.log("i am online");
//   })
=======
var moment = require("moment");

Parse.Cloud.define("registerActivity", function(request, response) {
  Parse.Cloud.useMasterKey();
  var user = request.user;
  user.set("lastActive", new Date());
  user.save(null).then(
    function(user) {
      response.success("successful");
    },
    function(error) {
      console.log(error);
      response.error(error);
    }
  );
});

Parse.Cloud.define("updateUser", function(request, response) {
  Parse.Cloud.useMasterKey();
  var username = request.params.username;
  var query = new Parse.Query(Parse.User);
  query.equalTo("username", username);
  query.first({
    success: function(object) {
      object.set("lastActive", new Date());
      object.save(null, {
        success: function(successData) {
          response.success("username updated successfully.");
          object.fetch();
        },
        error: function(error) {
          console.log("Error while updating the username: ", error);
        }
      });
    },
    error: function(errorData) {
      console.log("Error: ", errorData);
      response.error(errorData);
    }
  });
});
// Parse.Cloud.define("updateUser", function(request, response)
// {
//   Parse.Cloud.useMasterKey();
//   var query = new Parse.Query(Parse.User);
//   var objectId = request.params.objectId;
//   var username = request.params.username;
//   var email = request.params.email;
//   var userType = request.params.userType;
//   var password = request.params.password;

//   query.equalTo("objectId", objectId);
//   query.first({
//       success: function(object)
//       {
//         object.set("username", username);
//         object.set("email", email);
//         object.set("userType", userType);
//         object.set("password", password);
//         object.save();
//         response.success("Success");
//       },
//     error: function(error) {
//       alert("Error: " + error.code + " " + error.message);
//       response.error("Error");
//     }
//   });
// });
// Parse.Cloud.define("updateUser", function(request, response) {
//   var query = new Parse.Query("User");
//   query.equalTo("username", "Shade");
//   //var type = request.params.type;
//   query.first({
//     success: function(user) {
//       user.set("lastActive", new Date());
//       user.save(
//         null,
//         { useMasterKey: true },
//         {
//           success: function(object) {
//             response.success("SUCCESS");
//           },
//           error: function(object, error) {
//             response.error(error);
//           }
//         }
//       );
//     },
//     error: function(error) {
//       response.error(error);
//     }
//   });
// });

Parse.Cloud.define("getOnlineUsers", function(request, response) {
  var userQuery = new Parse.Query(Parse.User);
  var activeSince = moment()
    .subtract("minutes", 2)
    .toDate();
  userQuery.greaterThan("lastActive", activeSince);
  userQuery.find().then(
    function(users) {
      response.success(users);
    },
    function(error) {
      response.error(error);
    }
  );
});

// Parse.Cloud.run('registerActivity').then(function(result) {
//     // result should be 'Update object successfully'
//     console.log("i am online");
//   })
>>>>>>> df8e4b05ee77c5fd63c4c8f24f45bfd3dd7fcd68
