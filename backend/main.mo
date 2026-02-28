import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Order "mo:core/Order";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


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

  public shared ({ caller }) func registerUser(name : Text, phone : Text, area : Text) : async () {
    let userProfile : UserProfile = {
      name;
      phone;
      area;
      signupTime = Time.now();
    };
    userStore.add(caller, userProfile);
  };

  public query ({ caller }) func getMyProfile() : async ?UserProfile {
    userStore.get(caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userStore.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userStore.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userStore.get(user);
  };

  public query ({ caller }) func getUsers() : async [(Principal, UserProfile)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    userStore.toArray();
  };

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

  public shared ({ caller }) func addFeedback(name : Text, stars : Nat, message : Text) : async () {
    if (stars > 5 or stars < 1) {
      Runtime.trap("Invalid number of stars. ");
    };
    let currentTime = Time.now();
    let feedbackId = feedbackCounter;
    feedbackStore.add((feedbackId, name, stars, message, currentTime));
    ratingStore.add(stars);
    feedbackCounter += 1;
  };

  public query ({ caller }) func getStars() : async [Nat] {
    ratingStore.toArray();
  };

  func compareByTimestamp(a : (Nat, Text, Nat, Text, Int), b : (Nat, Text, Nat, Text, Int)) : Order.Order {
    Int.compare(a.4, b.4);
  };

  func deleteOldestFeedback() {
    if (feedbackStore.size() > 30) {
      ignore feedbackStore.removeLast();
    };
  };

  public query ({ caller }) func getAllFeedback() : async [(Nat, Text, Nat, Text, Int)] {
    let sorted = feedbackStore.toArray().sort(compareByTimestamp);
    let result = sorted.sliceToArray(0, Nat.min(sorted.size(), 30));
    deleteOldestFeedback();
    result;
  };

  public query ({ caller }) func getFeedbackCount() : async Nat {
    feedbackStore.size();
  };

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
