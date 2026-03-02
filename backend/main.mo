import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

// Persistent initialization with migration support
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
      Runtime.trap("Invalid number of stars.");
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

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    icon : Text;
    startingPrice : Nat;
  };

  let servicesStore = Map.empty<Nat, Service>();
  var serviceIdCounter = 0;

  public query ({ caller }) func getAllServices() : async [Service] {
    servicesStore.values().toArray();
  };

  public query ({ caller }) func getService(id : Nat) : async ?Service {
    servicesStore.get(id);
  };

  public shared ({ caller }) func addService(name : Text, description : Text, icon : Text, startingPrice : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };

    let service : Service = {
      id = serviceIdCounter;
      name;
      description;
      icon;
      startingPrice;
    };

    servicesStore.add(serviceIdCounter, service);
    serviceIdCounter += 1;
  };

  public shared ({ caller }) func updateService(id : Nat, name : Text, description : Text, icon : Text, startingPrice : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };

    switch (servicesStore.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = {
          id;
          name;
          description;
          icon;
          startingPrice;
        };
        servicesStore.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };

    switch (servicesStore.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        servicesStore.remove(id);
      };
    };
  };

  type Booking = {
    bookingId : Nat;
    user : Principal;
    serviceId : Nat;
    address : Text;
    mobileNumber : Text;
    bookingTime : Int;
  };

  let bookingStore = Map.empty<Nat, Booking>();
  var bookingIdCounter = 0;

  public shared ({ caller }) func addBooking(serviceId : Nat, address : Text, mobileNumber : Text, bookingTime : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can book services");
    };

    let booking : Booking = {
      bookingId = bookingIdCounter;
      user = caller;
      serviceId;
      address;
      mobileNumber;
      bookingTime;
    };

    bookingStore.add(bookingIdCounter, booking);
    bookingIdCounter += 1;
  };

  public query ({ caller }) func getBookingsForCaller() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their bookings");
    };
    bookingStore.values().toArray().filter(func(booking) { booking.user == caller });
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookingStore.values().toArray();
  };

  public shared ({ caller }) func deleteBooking(bookingId : Nat) : async () {
    let booking = switch (bookingStore.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) { booking };
    };

    if (caller != booking.user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the owner or an admin can delete this booking");
    };

    bookingStore.remove(bookingId);
  };

  public shared ({ caller }) func updateBooking(bookingId : Nat, serviceId : Nat, address : Text, mobileNumber : Text, bookingTime : Int) : async () {
    let existingBooking = switch (bookingStore.get(bookingId)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) { booking };
    };

    if (caller != existingBooking.user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only the owner or an admin can update this booking");
    };

    let updatedBooking : Booking = {
      existingBooking with
      serviceId;
      address;
      mobileNumber;
      bookingTime;
    };

    bookingStore.add(bookingId, updatedBooking);
  };

  // Mechanic registration support
  type MechanicRegistration = {
    name : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    experience : Text;
    address : Text;
    age : Nat;
    preferredArea : Text;
    whyJoin : Text;
    timestamp : Int;
  };

  let mechanicRegistrationsStore = List.empty<MechanicRegistration>();

  public shared ({ caller }) func submitMechanicRegistration(
    name : Text,
    phone : Text,
    email : Text,
    serviceType : Text,
    experience : Text,
    address : Text,
    age : Nat,
    preferredArea : Text,
    whyJoin : Text,
  ) : async () {
    let newRegistration : MechanicRegistration = {
      name;
      phone;
      email;
      serviceType;
      experience;
      address;
      age;
      preferredArea;
      whyJoin;
      timestamp = Time.now();
    };

    mechanicRegistrationsStore.add(newRegistration);
  };

  public query ({ caller }) func getMechanicRegistrations() : async [MechanicRegistration] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view Mechanic Registrations");
    };
    mechanicRegistrationsStore.toArray();
  };
};
