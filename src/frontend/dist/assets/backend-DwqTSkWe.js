var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class InMemoryBackend {
  constructor() {
    __publicField(this, "bookingInquiries", []);
    __publicField(this, "guestReviews", []);
    // rooms mirror the fallback data defined in App.tsx; keep them consistent
    __publicField(this, "rooms", [{
      name: "Kashi Family Suite",
      description: "Expansive suite on the second floor with two interconnected rooms and an attached bathroom. The inner room opens to a private balcony with a rare view of the Shiva temple inside the haveli and the street leading to Kashi Vishwanath Temple.",
      amenities: ["King + Double Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Balcony with Temple View", "Premium Vegan Toiletries"],
      pricePerNight: BigInt(0),
      maxGuests: BigInt(4)
    }, {
      name: "Superior Room - Street View",
      description: "Airy room on the second floor opening directly onto the haveli courtyard. Features a queen-size bed, attached bathroom, and heritage charm. Ideal for guests seeking a peaceful atmosphere in the heart of the old city.",
      amenities: ["Queen Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Sitting Area with Coffee Table", "Terrace Access", "Premium Vegan Toiletries"],
      pricePerNight: BigInt(0),
      maxGuests: BigInt(2)
    }, {
      name: "Superior Room - Terrace Access",
      description: "Located beside the family suite on the second floor, this room features a king-size bed and attached bathroom. Step outside to a terrace balcony overlooking the quiet haveli rooftop - perfect for a morning cup of tea.",
      amenities: ["King-size Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Terrace Balcony Access", "Premium Vegan Toiletries"],
      pricePerNight: BigInt(0),
      maxGuests: BigInt(2)
    }, {
      name: "Standard Room - Private Bathroom",
      description: "Peaceful first-floor room with a queen-size bed and a private (detached) bathroom. Features a view of the temple path from the window and opens out to the inner haveli courtyard - a serene space to reflect.",
      amenities: ["Queen Bed", "Private Bathroom", "Fast Wi-Fi", "Air Conditioner", "Purified Drinking Water", "Terrace Access", "Premium Vegan Toiletries"],
      pricePerNight: BigInt(0),
      maxGuests: BigInt(2)
    }]);
  }
  async addGuestReview(guestName, rating, comment, stayDate) {
    const num = Number(rating);
    if (num < 1 || num > 5) {
      throw new Error("Rating must be between 1 and 5");
    }
    this.guestReviews.push({
      guestName,
      rating,
      comment,
      stayDate
    });
  }
  async getAllBookingInquiries() {
    return [...this.bookingInquiries];
  }
  async getAllGuestReviews() {
    return [...this.guestReviews];
  }
  async getRooms() {
    return [...this.rooms];
  }
  async submitBookingInquiry(name, email, checkIn, checkOut, numberOfGuests, message) {
    if (numberOfGuests === BigInt(0)) {
      throw new Error("Number of guests must be at least 1");
    }
    this.bookingInquiries.push({
      name,
      email,
      checkIn,
      checkOut,
      numberOfGuests,
      message
    });
  }
}
const mockBackend = new InMemoryBackend();
export {
  mockBackend
};
