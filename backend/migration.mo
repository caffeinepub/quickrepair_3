import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  public func run(old : { feedbackCounter : Nat }) : {
    feedbackCounter : Nat;
    mechanicRegistrationsStore : List.List<{
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
    }>;
  } {
    { old with mechanicRegistrationsStore = List.empty() };
  };
};
