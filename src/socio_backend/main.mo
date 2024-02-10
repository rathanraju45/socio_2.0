import Principal "mo:base/Principal";
import RBTree "mo:base/RBTree";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";

actor socio {

  type UserDetails = {
    userName : Text;
    passWord : Text;
    dob : Text;
    gender : Text;
    profilePic : Blob;
  };

  var users = RBTree.RBTree<Principal, UserDetails>(Principal.compare);

  public shared (msg) func getPrincipal() : async Principal {
    msg.caller;
  };

  public shared (msg) func createUser(username : Text, password : Text, dofb : Text, genderOfUser : Text, profilepic : Blob) : async {
    status : Nat;
    msg : Text;
  } {
    if (Principal.isAnonymous(msg.caller)) {
      var checkForUser = users.get(msg.caller);
      switch (checkForUser) {
        case (null) {
          var newUser : UserDetails = {
            userName = username;
            passWord = password;
            dob = dofb;
            gender = genderOfUser;
            profilePic = profilepic;
          };
          users.put(msg.caller, newUser);
          return {
            status = 200;
            msg = "User Registered Succesfully.";
          };
        };
        case (?user) {
          return {
            status = 403;
            msg = "User already Exists.";
          };
        };
      };
    } else {
      return {
        status = 404;
        msg = "Please connect your Identity.";
      };
    };
  };

  public shared (msg) func checkUser() : async Nat {
    var userExists = users.get(msg.caller);
    switch (userExists) {
      case (?user) {
        return 200;
      };
      case (null) {
        return 404;
      };
    };
  };

};
