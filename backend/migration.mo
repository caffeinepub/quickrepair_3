import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  // Old actors types did not change
  type Actor = {
    feedbackStore : List.List<(Nat, Text, Nat, Text, Int)>;
    ratingStore : List.List<Nat>;
    userStore : Map.Map<Principal, {
      name : Text;
      phone : Text;
      area : Text;
      signupTime : Int;
    }>;
    feedbackCounter : Nat;
  };

  // New versions keep the same structure
  public func run(old : Actor) : Actor {
    old;
  };
};
