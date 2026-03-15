import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BookingInquiry {
    checkIn: string;
    name: string;
    email: string;
    message: string;
    checkOut: string;
    numberOfGuests: bigint;
}
export interface Room {
    pricePerNight: bigint;
    name: string;
    description: string;
    amenities: Array<string>;
    maxGuests: bigint;
}
export interface GuestReview {
    stayDate: string;
    guestName: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    addGuestReview(guestName: string, rating: bigint, comment: string, stayDate: string): Promise<void>;
    getAllBookingInquiries(): Promise<Array<BookingInquiry>>;
    getAllGuestReviews(): Promise<Array<GuestReview>>;
    getRooms(): Promise<Array<Room>>;
    submitBookingInquiry(name: string, email: string, checkIn: string, checkOut: string, numberOfGuests: bigint, message: string): Promise<void>;
}
