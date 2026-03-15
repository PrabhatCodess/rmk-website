import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type BookingInquiry = {
    name : Text;
    email : Text;
    checkIn : Text;
    checkOut : Text;
    numberOfGuests : Nat;
    message : Text;
  };

  type GuestReview = {
    guestName : Text;
    rating : Nat;
    comment : Text;
    stayDate : Text;
  };

  type Room = {
    name : Text;
    description : Text;
    amenities : [Text];
    pricePerNight : Nat;
    maxGuests : Nat;
  };

  let bookingInquiries = List.empty<BookingInquiry>();
  let guestReviews = List.empty<GuestReview>();

  public shared ({ caller }) func submitBookingInquiry(name : Text, email : Text, checkIn : Text, checkOut : Text, numberOfGuests : Nat, message : Text) : async () {
    if (numberOfGuests == 0) {
      Runtime.trap("Number of guests must be at least 1");
    };

    let inquiry : BookingInquiry = {
      name;
      email;
      checkIn;
      checkOut;
      numberOfGuests;
      message;
    };

    bookingInquiries.add(inquiry);
  };

  public shared ({ caller }) func addGuestReview(guestName : Text, rating : Nat, comment : Text, stayDate : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let review : GuestReview = {
      guestName;
      rating;
      comment;
      stayDate;
    };

    guestReviews.add(review);
  };

  public query ({ caller }) func getAllBookingInquiries() : async [BookingInquiry] {
    bookingInquiries.toArray();
  };

  public query ({ caller }) func getAllGuestReviews() : async [GuestReview] {
    guestReviews.toArray();
  };

  public query ({ caller }) func getRooms() : async [Room] {
    [
      {
        name = "Standard Room";
        description = "A cozy room with all basic amenities. Perfect for solo travelers or couples.";
        amenities = ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom"];
        pricePerNight = 100;
        maxGuests = 2;
      },
      {
        name = "Deluxe Room";
        description = "A spacious room with enhanced amenities. Ideal for those seeking extra comfort.";
        amenities = ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom", "Mini Bar", "Balcony"];
        pricePerNight = 150;
        maxGuests = 2;
      },
      {
        name = "Family Suite";
        description = "Large suite suitable for families, offering separate living and sleeping areas.";
        amenities = ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom", "Mini Bar", "Kitchenette", "Balcony"];
        pricePerNight = 200;
        maxGuests = 5;
      },
    ];
  };
};
