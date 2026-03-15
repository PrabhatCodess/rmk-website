# Rudreshwar Mahadeo Kothi

## Current State
A generic homestay website ("Sunrise Homestay") with placeholder content: fake Vietnamese family, Da Nang location, fictional rooms, seed reviews, and dummy contact info. The visual structure (hero, about, rooms, amenities, gallery, reviews, booking form, footer) is already in place.

## Requested Changes (Diff)

### Add
- "Important Distances" section with walking/travel times to nearby landmarks (Kashi Vishwanath Temple, ghats, stations, etc.)
- "How to Find Us" directions section with train/flight/bus guidance
- House rules section near the bottom
- Booking link to the actual reservations page for each room

### Modify
- **Branding/Name**: "Sunrise Homestay" → "Rudreshwar Mahadeo Kothi"
- **Tagline**: "Heritage Haveli in the Heart of Varanasi"
- **Hero**: Update title, subtitle, and badge (remove "3-star" badge; add "Heritage Haveli | Airbnb Guest Favorite")
- **About section**: Replace Vietnamese family content with actual property description — 300-year-old haveli, 3 min from Kashi Vishwanath Temple, 10 min from Ganges ghats; in-house Lord Vishwanath temple; Yaksh Vinayaka shrine; traditional puja facilities
- **What's Included card**: Update to match real amenities: Free Wi-Fi, Vegetarian Breakfast, Air Conditioning, Premium Vegan Toiletries, Hot & Cold Shower, Late Check-in, Laundry Service, Local Experiences
- **Rooms section** (4 real rooms):
  1. Kashi Family Suite — King + Double Bed, En-suite, Balcony with Temple View, AC, Wi-Fi, Electric Kettle
  2. Superior Room (Street View) — Queen Bed, En-suite, AC, Wi-Fi, Sitting Area, Terrace Access
  3. Superior Room (Terrace) — King Bed, En-suite, Balcony Access, AC, Wi-Fi, Electric Kettle
  4. Standard Room (Private Bathroom) — Queen Bed, Detached Bathroom, AC, Wi-Fi, Terrace Access
  - Each room card links to real booking URL
- **Amenities section**: Replace with real services: Hearty Breakfast, Late Check-in, Free Vegan Toiletries, Local Experiences, Laundry Service, Free Wi-Fi, Hot & Cold Shower, Soundproofing
- **Gallery**: Keep existing generated images (they represent the heritage aesthetic well)
- **Reviews**: Replace seed reviews with 2 real Google reviews from SB0901 and Mudit Mani Goswami; remove fictional Da Nang reviews
- **Rating display**: Show "Rated 4.6 out of 5" badge near reviews header
- **Contact/Booking form**: Update address to CK-37/29, Bansphatak Road, Varanasi 221001; phone +919920685754; email rmk.vns@ithstays.com; check-in 12 noon, check-out 11 am
- **Footer**: Update name, address, phone, email to match real property

### Remove
- All fictional Vietnamese/Da Nang references
- "Since 2012" family story
- Nguyen family references
- Dollar-sign pricing on rooms (replace with "Book Now" linking to real reservation URL)

## Implementation Plan
1. Update App.tsx with real property name, tagline, about text, rooms (4), amenities (8), reviews (2 real), contact info, distances, directions, house rules
2. Add "Important Distances" section after amenities
3. Update room cards to include direct "Book Now" links to reservations system
4. Update footer with real contact details
5. Remove all fictional content (Da Nang, Nguyen family, dollar prices)
