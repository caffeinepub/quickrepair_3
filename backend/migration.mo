import Map "mo:core/Map";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    feedbackStore : List.List<(Text, Nat, Text, Int)>;
    ratingStore : List.List<Nat>;
  };

  type NewActor = {
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

  public func run(old : OldActor) : NewActor {
    func convertFeedbackStoreToNewFormat(
      originalStore : List.List<(Text, Nat, Text, Int)>
    ) : List.List<(Nat, Text, Nat, Text, Int)> {
      let newList = List.empty<(Nat, Text, Nat, Text, Int)>();
      var currentId = 0;
      for (feedback in originalStore.values()) {
        let (name, stars, message, timestamp) = feedback;
        newList.add((currentId, name, stars, message, timestamp));
        currentId += 1;
      };
      newList;
    };
    {
      feedbackStore = convertFeedbackStoreToNewFormat(old.feedbackStore);
      ratingStore = old.ratingStore;
      userStore = Map.empty<Principal, { name : Text; phone : Text; area : Text; signupTime : Int }>();
      feedbackCounter = old.ratingStore.size();
    };
  };
};
