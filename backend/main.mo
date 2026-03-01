import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Migration "migration";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let feedbackStore = List.empty<(Nat, Text, Nat, Text, Int)>();
  let ratingStore = List.empty<Nat>();
  var feedbackCounter = 0;

  type UserProfile = {
    name : Text;
    phone : Text;
    area : Text;
    signupTime : Int;
  };

  let userStore = Map.empty<Principal, UserProfile>();

  // Self-registration: only authenticated (non-anonymous) users can register
  public shared ({ caller }) func registerUser(name : Text, phone : Text, area : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can register");
    };
    let userProfile : UserProfile = {
      name;
      phone;
      area;
      signupTime = Time.now();
    };
    userStore.add(caller, userProfile);
  };

  public query ({ caller }) func getMyProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile");
    };
    userStore.get(caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile");
    };
    userStore.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userStore.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userStore.get(user);
  };

  // Admin-only: retrieve all users
  public query ({ caller }) func getUsers() : async [(Principal, UserProfile)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    userStore.toArray();
  };

  // Admin-only: delete a user
  public shared ({ caller }) func deleteUser(p : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (userStore.get(p)) {
      case (null) { Runtime.trap("User not found.") };
      case (?_) {
        userStore.remove(p);
      };
    };
  };

  // Admin-only: delete a feedback entry
  public shared ({ caller }) func deleteFeedback(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    var foundIndex : ?Nat = null;
    var currentIndex = 0;
    let feedbackIter = feedbackStore.values();
    for ((feedbackId, _, _, _, _) in feedbackIter) {
      if (feedbackId == id) {
        foundIndex := ?currentIndex;
      };
      currentIndex += 1;
    };
    switch (foundIndex) {
      case (null) {
        Runtime.trap("Delete feedback failed: no feedback found with the given id.");
      };
      case (?_) {
        ignore feedbackStore.removeLast();
      };
    };
  };

  // Open to any caller: anyone can submit feedback
  public shared ({ caller }) func addFeedback(name : Text, stars : Nat, message : Text) : async () {
    if (stars > 5 or stars < 1) {
      Runtime.trap("Invalid number of stars.");
    };
    let currentTime = Time.now();
    let feedbackId = feedbackCounter;
    feedbackStore.add((feedbackId, name, stars, message, currentTime));
    ratingStore.add(stars);
    feedbackCounter += 1;
  };

  // Open to any caller: public rating data
  public query ({ caller }) func getStars() : async [Nat] {
    ratingStore.toArray();
  };

  func compareByTimestamp(a : (Nat, Text, Nat, Text, Int), b : (Nat, Text, Nat, Text, Int)) : Order.Order {
    Int.compare(a.4, b.4);
  };

  // Open to any caller: public feedback listing (query only, no state mutation)
  public query ({ caller }) func getAllFeedback() : async [(Nat, Text, Nat, Text, Int)] {
    let sorted = feedbackStore.toArray().sort(compareByTimestamp);
    let topEntries = Nat.min(sorted.size(), 30);
    let resultArray = Array.tabulate(
      topEntries,
      func(i) {
        sorted[i];
      },
    );
    resultArray;
  };

  // Open to any caller: public feedback count
  public query ({ caller }) func getFeedbackCount() : async Nat {
    feedbackStore.size();
  };

  // Open to any caller: public average rating
  public query ({ caller }) func getAverageRating() : async Float {
    let totalFeedbacks = feedbackStore.size();
    if (totalFeedbacks == 0) {
      return 0.0;
    };

    var sumOfRatings = 0;
    for ((_, _, stars, _, _) in feedbackStore.values()) {
      sumOfRatings += stars;
    };

    sumOfRatings.toFloat() / totalFeedbacks.toFloat();
  };
};
