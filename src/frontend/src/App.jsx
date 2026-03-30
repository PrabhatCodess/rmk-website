import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inject } from "@vercel/analytics";
import { CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Coffee, Droplets, ExternalLink, Icon, Leaf, Loader2, Mail, MapPin, Menu, Phone, Shirt, Star, Users, VolumeX, Wifi, Wind, X, Image } from "lucide-react";
import { stairs } from "@lucide/lab";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Loader from "./components/Loader";
import { useGetAllGuestReviews, useGetRooms, useSubmitBookingInquiry } from "./hooks/useQueries";

/* Seed reviews  */
const SEED_REVIEWS = [{
  guestName: "Prabhakar Kalavacherla",
  rating: BigInt(5),
  comment: "My wife and I waited for a long time to visit Benares- several decades. We wanted to stay at a place that was modern and ancient at the same time. Clearly, BrijRama Palace met that criteria but it is pricey place. Almost by chance I chanced upon Rudreshwar Mahadeo Kothi. I will say that photos online won't do justice as one has to experience the hospitality and warmth of these two elderly couple that run the place. Dr. Kiran and Dr. Balaji have mastered the age old Indian art of treating guests like Gods. Dr. Kiran in particular is just amazing and her quiet personality coupled with her inexhausible sense of service is just out of the world.\n\nThe facilities are not necessarily top notch when compared to a good star hotel. However, please don't even get disuaded by that as the warmth and hospitality more than compensates for any shortcomings.\n\nThe house itself is steeped in centuries of history and it is right in the heart of the temple area. My wife and I could not help feeling low when it was time to leave the place. But we made a promise to visit Benares and this next time our place of stay is determined. Thank you Dr. Kiran and Dr. Balaji.",
  stayDate: "6 weeks ago"
}, {
  guestName: "Krishma Maniar",
  rating: BigInt(5),
  comment: "Our stay was very delightful at Rudreshwar Mahadeo Kothi. Mr & Mrs Singh are the warmest host. Very helpful, guided us so well, helped us arrange boat ride n darshan. The property is 200 meters away from the kashi vishwanath temple, it was very convenient. Delicious breakfast. We booked family room, for us family of 4.Clean and neat rooms.",
  stayDate: "9 weeks ago"
}, {
  guestName: "finding nemu",
  rating: BigInt(5),
  comment: "This stay is beyond rating - this place is priceless. Balaji uncle and Kiran Aunty are the best hosts you will ever find on Airbnb, India. The stay is right in the heart of the old city of Benaras. The ghats and Vishwanath Dham are at a walkable ditance. There are plenty of shops and restaurants around. The stay offered a luggage transport support as well. The food at the stay is delicious. I didn‘t feel the need to eat outside as we got warm homemade food. Whatever I and my husband needed, uncle got it ready for us. This property is an ancestral heritage with a Shiv temple right in its courtyard. The hosts also gave us the opportunity of Rudra Abhishek in the temple. At the stay, we tried the banarasi pan and all special benarasi sweets. Kiran Aunty recommended us to even visit Sarnath which we undertook to experience Buddha‘s first sermon. I am not sure how to thank Uncle and Aunty for the best homestay experience I have ever had in any part of India. This place was totally worth it. Here we were not guests, rather part of a family. I had tears in my eyes as I had to bid bye to this place. This stay and Benaras will forever be in our hearts. See you soon !",
  stayDate: "Recently"
}, {
  guestName: "jonnalagadda keerthi",
  rating: BigInt(5),
  comment: "One of the best places to stay in Kashi—just a two-minute walk from Kashi Vishwanath Mandir and very close to all other temples and ghats. The house was incredibly beautiful, well maintained, and the bathrooms were spotlessly clean. the place was calm and serene. Kiran Aunty, Balaji Uncle, and the staff Akshay and Akash Bhaiyya were extremely warm and welcoming—it truly felt like visiting our relatives in Kashi. The best part was the temple within the house. The homemade food was absolutely delicious. Thank you for the wonderful hospitality; this would be our go to place in Kashi and we will definitely recommend this place to everyone.",
  stayDate: "13 weeks ago"
}, {
  guestName: "Neelesh Saran",
  rating: BigInt(5),
  comment: "Homely, and perfectly kept",
  stayDate: "15 weeks ago"
}, {
  guestName: "Bhavna Sharma",
  rating: BigInt(5),
  comment: "Very nice and homely stay\nWill definitely recommend\nA home away from your home.\nOur host Mr and Mrs Singh will definitely treat you as their own children\nYou will be comfortable as it's your home.",
  stayDate: "18 weeks ago"
}, {
  guestName: "Shivangi Singh",
  rating: BigInt(5),
  comment: "Rudreshwar Mahadeo Kothi in Kashi is more than just a place; it's an experience that touches the soul. ✨\nThe moment you step inside, you're enveloped in an atmosphere of profound peace and spirituality.\nThe intricate architecture and the serene ambiance create a perfect setting for reflection and devotion. Every corner of the kothi resonates with history and devotion, making it a must-visit for anyone seeking a deeper connection with the divine.\nPlus, the hosts Dr.V.N Singh and Dr.Kiran Singh are incredibly wonderful. They made us feel so comfortable, it just felt like home. They made sure that we don’t have any problems at all, and the major plus point is- it's conveniently located just a two-minute walk from the Kashi Vishwanath Temple!\nHighly recommended stay if you’re visiting Varanasi. It's a place that leaves a lasting impression on your heart. 💞",
  stayDate: "20 weeks ago"
}, {
  guestName: "Shruti Bansal",
  rating: BigInt(5),
  comment: "I had a wonderful stay at this homestay! The place was clean, cozy, and beautifully maintained. The hosts were warm, welcoming, and always ready to help",
  stayDate: "20 weeks ago"
}, {
  guestName: "abhishek pandey",
  rating: BigInt(5),
  comment: "Right in the heart of the city , this is a must stay place. Easy access to Kashi Viswanath ji and other famous street food next dooor is a blessing. And a beautiful temple within the compound just makes it blissful.\n\nA truly warm host in VN Singh sir and wondeful caretakers (Akash & Akshay) made the stay memorable. When you get delicious home cooked food - made to order what else can you ask for.\n\nRooms are great.. just be mindful of the noisy ones on special festive evenings, with windows facing the main street.",
  stayDate: "22 weeks ago"
}, {
  guestName: "SB0901",
  rating: BigInt(5),
  comment: "An Incredibly Beautiful House .. very aesthetically done ... super comfortable ... an Old World Charm... best location to stay in Varanasi , everything is just minutes-walk away .. Hosts are very warm and super Caring.. we had a great stay there and would definetely be staying there in future too .",
  stayDate: "51 weeks ago"
}];

/*  Room type  */

/* Room images map */
// map from room index to an array of image URLs; carousel buttons let the user
// scroll through the list. ensure the assets exist or update names accordingly.
const ROOM_IMAGES = {
  0: ["/assets/generated/kashi-suite/room-kashi-suite-1.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-2.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-3.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-4.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-5.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-6.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-7.dim_600x400.jpg", "/assets/generated/kashi-suite/room-kashi-suite-8.dim_600x400.jpg"],
  1: ["/assets/generated/Superior Room With Street View/room-superior-street-1.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-2.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-3.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-4.dim_600x400.jpg", "/assets/generated/Superior Room With Street View/room-superior-street-5.dim_600x400.jpg"],
  2: ["/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-1.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-2.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-3.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-4.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-5.dim_600x400.jpg", "/assets/generated/Superior Room With Access to a Shared Terrace/room-superior-terrace-6.dim_600x400.jpg"],
  3: ["/assets/generated/Standard Room With Private Bathroom/room-standard-1.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-2.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-3.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-4.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-5.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-6.dim_600x400.jpg", "/assets/generated/Standard Room With Private Bathroom/room-standard-7.dim_600x400.jpg"]
};

/* Gallery images  */
const GALLERY_IMAGES = [{
  src: "/assets/generated/rmk_entry/kothi_1.jpg",
  alt: "Haveli exterior 1"
}, {
  src: "/assets/generated/rmk_entry/kothi_2.jpg",
  alt: "Haveli exterior 2"
}, {
  src: "/assets/generated/rmk_entry/kothi_3.jpg",
  alt: "Haveli details 3"
}, {
  src: "/assets/generated/rmk_entry/kothi_4.jpg",
  alt: "Haveli details 4"
}, {
  src: "/assets/generated/rmk_entry/kothi_5.jpg",
  alt: "Haveli details 5"
}, {
  src: "/assets/generated/rmk_entry/kothi_6.jpg",
  alt: "Haveli details 6"
}, {
  src: "/assets/generated/rmk_entry/kothi_7.jpg",
  alt: "Haveli details 7"
}, {
  src: "/assets/generated/rmk_entry/kothi_8.png",
  alt: "Haveli sign 8"
}, {
  src: "/assets/generated/rmk_entry/kothi_9.png",
  alt: "Haveli sign 9"
}, {
  src: "/assets/generated/rmk_entry/kothi_10.png",
  alt: "Haveli interior 10"
}, {
  src: "/assets/generated/rmk_entry/kothi_11.png",
  alt: "Haveli interior 11"
}, {
  src: "/assets/generated/rmk_entry/kothi_12.png",
  alt: "Haveli interior 12"
}, {
  src: "/assets/generated/rmk_entry/kothi_13.png",
  alt: "Haveli interior 13"
}, {
  src: "/assets/generated/rmk_entry/kothi_14.png",
  alt: "Haveli interior 14"
}, {
  src: "/assets/generated/rmk_entry/kothi_15.png",
  alt: "Haveli interior 15"
}, {
  src: "/assets/generated/rmk_entry/kothi_16.png",
  alt: "Haveli interior 16"
}, {
  src: "/assets/generated/rmk_entry/kothi_17.png",
  alt: "Haveli interior 17"
}, {
  src: "/assets/generated/rmk_entry/kothi_18.png",
  alt: "Haveli interior 18"
}, {
  src: "/assets/generated/rmk_entry/kothi_19.png",
  alt: "Haveli interior 19"
}, {
  src: "/assets/generated/rmk_entry/kothi_20.png",
  alt: "Haveli interior 20"
}, {
  src: "/assets/generated/rmk_entry/kothi_21.png",
  alt: "Haveli interior 21"
}, {
  src: "/assets/generated/rmk_entry/kothi_22.png",
  alt: "Haveli interior 22"
}];

/* Image Lightbox  */

function ImageLightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  roomName = "Room"
}) {
  if (!isOpen || images.length === 0) return null;
  const currentImage = images[currentIndex];
  const imageNumber = currentIndex + 1;
  const totalImages = images.length;
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/95 z-50" />

          {/* Lightbox Content */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4">
            {/* Close Button */}
            <motion.button initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={e => {
          e.stopPropagation();
          onClose();
        }} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50" aria-label="Close lightbox">
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Counter */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute top-6 left-6 text-white text-sm font-medium">
              {roomName} - {imageNumber} / {totalImages}
            </motion.div>

            {/* Main Image Container */}
            <div className="relative w-full h-full flex items-center justify-center max-w-7xl">
              <motion.img key={currentIndex} src={currentImage} alt={`${roomName} - Image ${imageNumber}`} initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.95
          }} transition={{
            duration: 0.2
          }} className="max-w-full max-h-[80vh] object-contain" />

              {/* Left Arrow */}
              {totalImages > 1 && <motion.button initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} onClick={onPrev} className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors group" aria-label="Previous image">
                  <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </motion.button>}

              {/* Right Arrow */}
              {totalImages > 1 && <motion.button initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} onClick={onNext} className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors group" aria-label="Next image">
                  <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </motion.button>}
            </div>

            {/* Image Indicator Dots */}
            {totalImages > 1 && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="absolute bottom-6 flex gap-2">
                {images.map((_, idx) => <motion.button key={idx} onClick={() => {
            // This would require additional state management
            // For now, we'll keep arrow navigation only
          }} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"}`} aria-label={`Go to image ${idx + 1}`} />)}
              </motion.div>}
          </motion.div>
        </>}
    </AnimatePresence>;
}

// small reusable card used by RoomsGrid so each instance can manage its own
// image index state.

function RoomCard({
  room,
  idx,
  onInquire,
  onImageClick,
  roomMarker,
  inquireMarker,
  bookNowMarker
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const images = ROOM_IMAGES[idx] || [];
  const prev = () => {
    setDirection(-1);
    setImgIdx(i => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    setDirection(1);
    setImgIdx(i => (i + 1) % images.length);
  };
  const slideVariants = {
    enter: dir => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: dir => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0
    })
  };
  return <motion.div data-ocid={roomMarker} variants={fadeUp} className="room-card rounded-2xl overflow-hidden bg-card border border-border shadow-xs hover:shadow-md transition-shadow flex flex-col">
      {/* Room image carousel */}
      <div onClick={() => onImageClick?.(idx, imgIdx)} className="overflow-hidden h-48 relative group bg-muted cursor-pointer">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {images.length > 0 ? <motion.img key={imgIdx} src={images[imgIdx]} alt={room.name} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
          x: {
            type: "spring",
            stiffness: 500,
            damping: 40,
            mass: 0.5,
            duration: 0.3
          },
          opacity: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
              {/* placeholder in case no image available */}
              <Image className="w-6 h-6 text-muted-foreground" />
            </div>}
        </AnimatePresence>
        {images.length > 1 && <>
            <button onClick={e => {
          e.stopPropagation();
          prev();
        }} className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 text-white rounded-full p-1 transition-all duration-200 hover:scale-110">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={e => {
          e.stopPropagation();
          next();
        }} className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 text-white rounded-full p-1 transition-all duration-200 hover:scale-110">
              <ChevronRight className="w-4 h-4" />
            </button>
          </>}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">Up to {Number(room.maxGuests)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {room.description}
        </p>

        {/* Amenity tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 4).map(a => <Badge key={a} variant="secondary" className="text-xs font-normal rounded-full bg-secondary text-secondary-foreground">
              {a}
            </Badge>)}
          {room.amenities.length > 4 && <Badge variant="secondary" className="text-xs font-normal rounded-full bg-secondary/60 text-secondary-foreground/60">
              +{room.amenities.length - 4} more
            </Badge>}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <Button data-ocid={bookNowMarker} onClick={() => window.open(room.bookingUrl || "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            Book Now
          </Button>
          <Button data-ocid={inquireMarker} onClick={onInquire} variant="outline" className="w-full border-border rounded-full text-sm">
            Inquire
          </Button>
        </div>
      </div>
    </motion.div>;
}
const FALLBACK_ROOMS = [{
  name: "Kashi Family Suite",
  description: "Expansive suite on the second floor with two interconnected rooms and an attached bathroom. The inner room opens to a private balcony with a rare view of the Shiva temple inside the haveli and the street leading to Kashi Vishwanath Temple.",
  amenities: ["King + Double Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Balcony with Temple View", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(4),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Superior Room - Street View",
  description: "Airy room on the second floor opening directly onto the haveli courtyard. Features a queen-size bed, attached bathroom, and heritage charm. Ideal for guests seeking a peaceful atmosphere in the heart of the old city.",
  amenities: ["Queen Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Sitting Area with Coffee Table", "Terrace Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Superior Room - Terrace Access",
  description: "Located beside the family suite on the second floor, this room features a king-size bed and attached bathroom. Step outside to a terrace balcony overlooking the quiet haveli rooftop - perfect for a morning cup of tea.",
  amenities: ["King-size Bed", "En-suite Bathroom", "Fast Wi-Fi", "Air Conditioner", "Electric Kettle", "Terrace Balcony Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}, {
  name: "Standard Room - Private Bathroom",
  description: "Peaceful first-floor room with a queen-size bed and a private (detached) bathroom. Features a view of the temple path from the window and opens out to the inner haveli courtyard - a serene space to reflect.",
  amenities: ["Queen Bed", "Private Bathroom", "Fast Wi-Fi", "Air Conditioner", "Purified Drinking Water", "Terrace Access", "Premium Vegan Toiletries"],
  pricePerNight: BigInt(0),
  maxGuests: BigInt(2),
  bookingUrl: "https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns"
}];

/*  Distance highlights */
const DISTANCES = [{
  place: "Kashi Vishwanath Temple",
  time: "3 min",
  type: "walk"
}, {
  place: "Dashashwamedh Ghat",
  time: "8 min",
  type: "walk"
}, {
  place: "Manikarnika Ghat",
  time: "10 min",
  type: "walk"
}, {
  place: "Kaal Bhairav Temple",
  time: "19 min",
  type: "walk"
}, {
  place: "Banaras Hindu University",
  time: "25 min",
  type: "ride"
}, {
  place: "Varanasi Jn. Railway Station",
  time: "26 min",
  type: "ride"
}];

/*  House rules */
const HOUSE_RULES = ["Switch off AC, lights and fan before leaving your room", "Quiet hours: 22:00 - 06:00", "Only vegetarian food & drinks allowed", "Smoking allowed outdoors only", "No eating in bedrooms - please use the dining area", "Damages are chargeable"];

/* Star component */
const STAR_POSITIONS = [1, 2, 3, 4, 5];
function StarRating({
  rating,
  max = 5
}) {
  return <div className="flex gap-0.5">
      {STAR_POSITIONS.slice(0, max).map(pos => <Star key={pos} className={`w-4 h-4 ${pos <= rating ? "star-filled" : "star-empty"}`} />)}
    </div>;
}

/* Fade-in section animation  */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

/* APP */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxRoomIdx, setLightboxRoomIdx] = useState(0);
  const [lightboxImageIdx, setLightboxImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);
  const navLinks = [{
    href: "#about",
    label: "About"
  }, {
    href: "#rooms",
    label: "Rooms"
  }, {
    href: "#amenities",
    label: "Amenities"
  }, {
    href: "#gallery",
    label: "Gallery"
  }, {
    href: "#reviews",
    label: "Reviews"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  const scrollTo = id => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth"
    });
    setMobileMenuOpen(false);
  };
  const handleImageClick = (roomIdx, imageIdx) => {
    setLightboxRoomIdx(roomIdx);
    setLightboxImageIdx(imageIdx);
    setLightboxOpen(true);
  };

  // open lightbox for gallery images
  const handleGalleryClick = idx => {
    // treat gallery as a pseudo-room index of -1
    setLightboxRoomIdx(-1);
    setLightboxImageIdx(idx);
    setLightboxOpen(true);
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };
  const getCurrentImageArray = () => {
    if (lightboxRoomIdx === -1) {
      return GALLERY_IMAGES.map(i => i.src);
    }
    return ROOM_IMAGES[lightboxRoomIdx] || [];
  };
  const handlePrevImage = () => {
    const images = getCurrentImageArray();
    setLightboxImageIdx(prev => (prev - 1 + images.length) % images.length);
  };
  const handleNextImage = () => {
    const images = getCurrentImageArray();
    setLightboxImageIdx(prev => (prev + 1) % images.length);
  };

  // Keyboard event handler
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = e => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxRoomIdx]);
  return <div className="relative min-h-screen font-body">
      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }}>
          {/* Navigation */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
            <nav className="max-w-6xl mx-auto px-2 sm:px-6 h-[4.5rem] sm:h-[6.5rem] flex items-center justify-between">
              {/* Logo */}
              <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center h-10 relative shrink-0">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 sm:w-32 sm:h-32 object-cover relative " />

                <img src="/logo_2.png" alt="Logo_2" className="h-24 sm:h-52 w-auto object-contain relative right-14 sm:right-28 bottom-1 sm:bottom-2 " />


                {/* <span className="font-display font-semibold text-lg text-foreground tracking-tight leading-none">
                  Rudreshwar
                  <br />
                  <span className="text-xs font-body font-medium text-muted-foreground tracking-widest uppercase">
                    Mahadeo Kothi
                  </span>
                 </span> */}
              </button>

              {/* Desktop nav links */}
              <ul className="hidden md:flex items-center gap-6">
                {navLinks.map(link => <li key={link.href}>
                    <a href={link.href} data-ocid={`nav.${link.label.toLowerCase()}.link`} onClick={e => {
                e.preventDefault();
                scrollTo(link.href);
              }} className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>)}
              </ul>

              <div className="flex items-center gap-3">
                <Button data-ocid="nav.book_button" onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5 rounded-full">
                  Book Now
                </Button>
                <button type="button" className="md:hidden p-2 rounded-md text-foreground" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Toggle menu">
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileMenuOpen && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: "auto",
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.25
          }} className="md:hidden overflow-hidden bg-background border-t border-border">
                  <div className="px-4 py-4 flex flex-col gap-3">
                    {navLinks.map(link => <a key={link.href} href={link.href} onClick={e => {
                e.preventDefault();
                scrollTo(link.href);
              }} className="py-2 text-base font-medium text-foreground border-b border-border/50 last:border-0">
                        {link.label}
                      </a>)}
                    <Button data-ocid="nav.book_button" onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="mt-2 bg-primary text-primary-foreground w-full rounded-full">
                      Book Now
                    </Button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </header>

          <div>
            <main>
              {/* Hero */}
              <section id="hero" className="relative min-h-screen flex flex-col">
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img src="/assets/generated/hero-temple-shrine.dim_1200x700.jpg" alt="Rudreshwar Mahadeo Kothi heritage haveli temple shrine entrance" className="w-full h-full object-cover" />
                  <div className="hero-overlay absolute inset-0" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20">
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
                    {/* Badge */}
                    <motion.div variants={fadeUp} className="flex justify-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span className="text-white/90 text-xs font-medium tracking-widest uppercase">
                          Heritage Haveli - AirBnB Guest Favorite
                        </span>
                      </div>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.1] tracking-tight mb-4">
                      Rudreshwar
                      <br />
                      <span className="italic text-amber-200">Mahadeo Kothi</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-white/80 text-lg sm:text-xl font-light mb-8 leading-relaxed">
                      Heritage Haveli in the Heart of Varanasi
                      <br className="hidden sm:block" />3 min walk from Kashi
                      Vishwanath Temple
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button data-ocid="hero.primary_button" onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base rounded-full shadow-lg">
                        Book Now
                      </Button>
                      <Button onClick={() => scrollTo("#rooms")} size="lg" variant="outline" className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white px-8 py-6 text-base rounded-full">
                        View Rooms
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Scroll cue */}
                <div className="relative z-10 flex justify-center pb-8">
                  <motion.button type="button" onClick={() => scrollTo("#about")} animate={{
                y: [0, 6, 0]
              }} transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }} className="text-white/60 hover:text-white/90 transition-colors" aria-label="Scroll down">
                    <ChevronDown className="w-7 h-7" />
                  </motion.button>
                </div>
              </section>

              {/* About */}
              <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-background relative z-10">
                <div className="max-w-5xl mx-auto">
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }} className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div>
                      <motion.p variants={fadeUp} className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        About Us
                      </motion.p>
                      <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-5">
                        A 300-Year-Old
                        <br />
                        <span className="italic font-light">Heritage Haveli</span>
                      </motion.h2>
                      <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                          Step into a world of royal elegance, deep spirituality, and
                          living history at Rudreshwar Mahadeo Kothi - a 300-year-old
                          ancestral haveli steeped in tradition. Just a 3-minute walk
                          from the Kashi Vishwanath Temple and 10 minutes from the
                          sacred ghats of the Ganges.
                        </p>
                        <p>
                          This heritage home features soaring ceilings, ornate
                          courtyards, intricate carvings, and an in-house Lord
                          Vishwanath Temple - a rare private shrine within the
                          property. The Yaksh Vinayaka Shrine, one of the 56 revered
                          Vinayak temples of Varanasi, is also located here.
                        </p>
                        <p>
                          Traditional ritual facilities - Rudrabhishek,
                          Mahamrityunjaya Path, and other pujas - can be arranged on
                          request. Modern amenities ensure a seamless stay without
                          losing the soul of this living heritage.
                        </p>
                      </motion.div>
                    </div>

                    {/* Highlights card */}
                    <motion.div variants={fadeUp}>
                      <Card className="border-border shadow-sm overflow-hidden">
                        <div className="bg-primary/8 px-6 pt-0 pb-2 border-b border-border">
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            What's Included
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Every stay, every room
                          </p>
                        </div>
                        <CardContent className="p-6">
                          <ul className="space-y-4">
                            {[{
                          icon: Wifi,
                          label: "Free High-Speed Wi-Fi",
                          desc: "Throughout the property"
                        }, {
                          icon: Coffee,
                          label: "Vegetarian Breakfast",
                          desc: "Free light breakfast for direct bookers"
                        }, {
                          icon: Wind,
                          label: "Air Conditioning",
                          desc: "All rooms climate-controlled"
                        }, {
                          icon: Droplets,
                          label: "Hot & Cold Shower",
                          desc: "24x7 in all bathrooms"
                        }, {
                          icon: () => <Icon iconNode={stairs} className="w-4.5 h-4.5 text-secondary-foreground" style={{
                            width: "1.1rem",
                            height: "1.1rem"
                          }} />,
                          label: "Heritage Staircases",
                          desc: "Access to rooms is via Steep traditional staircases. Elevators are not available."
                        }].map(({
                          icon: Icon,
                          label,
                          desc
                        }) => <li key={label} className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Icon className="w-4.5 h-4.5 text-secondary-foreground" style={{
                              width: "1.1rem",
                              height: "1.1rem"
                            }} />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground text-sm">
                                    {label}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {desc}
                                  </p>
                                </div>
                              </li>)}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Rooms */}
              <section id="rooms" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }}>
                    <motion.div variants={fadeUp} className="text-center mb-14">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Our Rooms
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight">
                        Crafted for Your Comfort
                      </h2>
                    </motion.div>

                    <RoomsGrid onInquire={() => document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth"
                })} onImageClick={handleImageClick} />
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Amenities */}
              <section id="amenities" className="py-20 sm:py-28 px-4 sm:px-6 bg-secondary/30 relative z-10">
                <div className="max-w-5xl mx-auto">
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }}>
                    <motion.div variants={fadeUp} className="text-center mb-14">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Facilities
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight">
                        Everything You Need
                      </h2>
                    </motion.div>

                    <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                      {[{
                    icon: Coffee,
                    label: "Hearty Breakfast",
                    desc: "Fresh homemade vegetarian & vegan meals"
                  }, {
                    icon: Clock,
                    label: "Late Check-in",
                    desc: "Available with advance notice"
                  }, {
                    icon: Leaf,
                    label: "Free Vegan Toiletries",
                    desc: "Premium set for all rooms"
                  }, {
                    icon: MapPin,
                    label: "Local Experiences",
                    desc: "City tours & cultural immersion"
                  }, {
                    icon: Shirt,
                    label: "Laundry Service",
                    desc: "Washing machine available for fee"
                  }, {
                    icon: Wifi,
                    label: "Free Wi-Fi",
                    desc: "High-speed throughout the property"
                  }, {
                    icon: Droplets,
                    label: "Hot & Cold Shower",
                    desc: "24x7 in all bathrooms"
                  }, {
                    icon: VolumeX,
                    label: "Soundproofing",
                    desc: "Soundproofed windows & doors"
                  }].map(({
                    icon: Icon,
                    label,
                    desc
                  }) => <motion.div key={label} variants={fadeUp} className="bg-card rounded-2xl p-5 flex flex-col items-center text-center border border-border shadow-xs hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <p className="font-semibold text-sm text-foreground">
                            {label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                        </motion.div>)}
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Important Distances */}
              <section id="distances" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }}>
                    <motion.div variants={fadeUp} className="text-center mb-14">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Location
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight">
                        Important Distances
                      </h2>
                      <p className="text-muted-foreground mt-3">
                        Everything in Varanasi, minutes away
                      </p>
                    </motion.div>

                    <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {DISTANCES.map(({
                    place,
                    time,
                    type
                  }, idx) => <motion.div key={place} data-ocid={`distances.item.${idx + 1}`} variants={fadeUp} className="bg-card rounded-2xl border border-border p-5 shadow-xs hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm leading-snug">
                                {place}
                              </p>
                              <p className="text-primary font-display font-semibold text-lg mt-1">
                                {time}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {type}
                              </p>
                            </div>
                          </div>
                        </motion.div>)}
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Gallery */}
              <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 bg-secondary/30 relative z-10">
                <div className="max-w-5xl mx-auto">
                  <motion.div initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }} variants={stagger}>
                    <motion.div variants={fadeUp} className="text-center mb-14">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Gallery
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight">
                        A Glimpse of the Haveli
                      </h2>
                    </motion.div>

                    <motion.div variants={fadeUp} className="masonry-grid">
                      {GALLERY_IMAGES.map(({
                    src,
                    alt
                  }, idx) => <div key={src} className="masonry-item group cursor-zoom-in" onClick={() => handleGalleryClick(idx)}>
                          <img src={src} alt={alt || "gallery image"} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>)}
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Reviews */}
              <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                  <motion.div initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }} variants={stagger}>
                    <motion.div variants={fadeUp} className="text-center mb-14">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Guest Stories
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-4">
                        Loved by Our Guests
                      </h2>
                      {/* Google rating badge */}
                      <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 border border-border">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                          <Star className="w-3.5 h-3.5 fill-amber-400/60 text-amber-400/60" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          Rated 4.6 / 5 on Google
                        </span>
                      </div>
                    </motion.div>

                    <ReviewsSection />
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Directions */}
              <section id="directions" className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <motion.div initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }} variants={stagger}>
                    <motion.div variants={fadeUp} className="text-center mb-10">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Getting Here
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                        How to Find Us
                      </h2>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <button type="button" data-ocid="directions.toggle" onClick={() => setDirectionsOpen(v => !v)} className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-4 text-left hover:shadow-md transition-shadow">
                        <span className="font-semibold text-foreground">
                          View Directions
                        </span>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${directionsOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {directionsOpen && <motion.div initial={{
                      height: 0,
                      opacity: 0
                    }} animate={{
                      height: "auto",
                      opacity: 1
                    }} exit={{
                      height: 0,
                      opacity: 0
                    }} transition={{
                      duration: 0.3
                    }} className="overflow-hidden">
                            <div className="bg-card border border-t-0 border-border rounded-b-2xl px-6 py-6 space-y-6 text-sm text-muted-foreground leading-relaxed">
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  If Flying into Varanasi
                                </h4>
                                <ol className="list-decimal list-inside space-y-1">
                                  <li>
                                    Use pre-paid taxi to{" "}
                                    <strong>Godowlia Chauraha</strong>, then switch to
                                    e-rickshaw (tuk-tuk) to the property.
                                  </li>
                                  <li>
                                    We also offer a pick-up service for Rs 2,000 - our
                                    staff will meet you outside the terminal with a
                                    placard.
                                  </li>
                                </ol>
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  If Taking a Train
                                </h4>
                                <p className="mb-2">
                                  From <strong>Varanasi Junction (BSB)</strong>,{" "}
                                  <strong>Banaras Station (BSBS)</strong>, or{" "}
                                  <strong>DDU Junction</strong>:
                                </p>
                                <ol className="list-decimal list-inside space-y-1">
                                  <li>
                                    Take a taxi/auto to{" "}
                                    <strong>Godowlia Chauraha</strong>, then an
                                    e-rickshaw to the property.
                                  </li>
                                  <li>
                                    Get dropped at the entry to the lane of Gate 1 to{" "}
                                    <strong>Kashi Vishwanath Temple</strong>.
                                  </li>
                                  <li>
                                    Walk about 20 metres -{" "}
                                    <strong>Rudreshwar Mahadeo Kothi</strong> is the{" "}
                                    <em>first house on the left</em> (one shop after
                                    Vishwanath Kothi Restaurant).
                                  </li>
                                </ol>
                              </div>
                              <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                                <p className="text-foreground font-medium text-xs uppercase tracking-wide mb-1">
                                  Address
                                </p>
                                <p>
                                  CK-37/29, Bansphatak Road, Gate No.1 Near Pitambari Saree Opposite of Bank Of Baroda Varanasi 221001, Uttar
                                  Pradesh, India
                                </p>
                              </div>
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <div className="section-divider" />

              {/* Booking Form */}
              <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <motion.div initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-80px"
              }} variants={stagger}>
                    <motion.div variants={fadeUp} className="text-center mb-8">
                      <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
                        Stay With Us
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-3">
                        Book Your Stay
                      </h2>
                      <p className="text-muted-foreground mb-5">
                        Send us a message and Team Rudreshwar will confirm
                        availability within 24 hours.
                      </p>

                      {/* Direct contact links */}
                      <div className="flex flex-wrap gap-3 justify-center">
                        <a href="tel:+919920685754" data-ocid="contact.call_button" className="inline-flex items-center gap-2 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-full px-5 py-2.5 text-sm font-medium transition-colors">
                          <Phone className="w-4 h-4" />
                          Call Us: +91 99206 85754
                          +91 9889244273
                          +91 9044301567
                        </a>
                        <a href="mailto:rmkothivns@gmail.com" data-ocid="contact.email_button" className="inline-flex items-center gap-2 bg-secondary text-foreground hover:bg-secondary/80 border border-border rounded-full px-5 py-2.5 text-sm font-medium transition-colors">
                          <Mail className="w-4 h-4" />
                          Email Us
                        </a>
                        <a href="https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns" target="_blank" rel="noopener noreferrer" data-ocid="contact.booking_button" className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-medium transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          Book Online Now
                        </a>
                      </div>

                      {/* Check-in / out info */}
                      <div className="flex gap-6 justify-center mt-5 text-sm text-muted-foreground">
                        <span>
                          <strong className="text-foreground">Check-in:</strong> 12
                          noon
                        </span>
                        <span>
                          <strong className="text-foreground">Check-out:</strong> 11
                          am
                        </span>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <BookingForm />
                    </motion.div>

                    {/* House Rules collapsible */}
                    <motion.div variants={fadeUp} className="mt-8">
                      <button type="button" data-ocid="rules.toggle" onClick={() => setRulesOpen(v => !v)} className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-4 text-left hover:shadow-md transition-shadow">
                        <span className="font-semibold text-foreground">
                          House Rules
                        </span>
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${rulesOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {rulesOpen && <motion.div initial={{
                      height: 0,
                      opacity: 0
                    }} animate={{
                      height: "auto",
                      opacity: 1
                    }} exit={{
                      height: 0,
                      opacity: 0
                    }} transition={{
                      duration: 0.3
                    }} className="overflow-hidden">
                            <div className="bg-card border border-t-0 border-border rounded-b-2xl px-6 py-5">
                              <ol className="space-y-2">
                                {HOUSE_RULES.map((rule, idx) => <li key={rule} data-ocid={`rules.item.${idx + 1}`} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    {rule}
                                  </li>)}
                              </ol>
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </div>
              </section>
            </main>

            {/* Footer */}
            <footer className="bg-foreground text-primary-foreground py-14 px-4 sm:px-6 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="grid sm:grid-cols-3 gap-10 mb-10">
                  {/* Brand */}
                  <div>
                    <div className="flex items-center h-10 relative mb-16 sm:mb-20 mt-4 sm:mt-8 right-0 sm:right-14  ">
                      <img src="/logo.png" alt="Logo" className="w-20 h-20 sm:w-32 sm:h-32 object-cover relative " />
                      <img src="/logo_2.png" alt="Logo_2" className="h-40 sm:h-60 w-auto object-cover relative right-16 sm:right-24 bottom-1 sm:bottom-2 " />
                    </div>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed relative bottom-6 sm:bottom-12 ">
                      A 300-year-old heritage haveli managed by Mr. Dr V.N. Singh and Team Rudreshwar Kothi, in the
                      heart of Varanasi.
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-primary-foreground/50 mb-4">
                      Contact
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/40" />
                        CK-37/29, Bansphatak Road,
                        <br />
                        Varanasi 221001, UP, India
                      </li>
                      <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                        <Phone className="w-4 h-4 flex-shrink-0 text-primary-foreground/40" />
                        <a href="tel:+919335106436" className="hover:text-primary-foreground transition-colors">
                          +91 9335106436
                          <br />
                          +91 9889244273
                          <br />
                          +91 7860597574
                          <br />
                          +91 9044301567
                        </a>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                        <Mail className="w-4 h-4 flex-shrink-0 text-primary-foreground/40" />
                        <a href="mailto:rmkothivns@gmail.com" className="hover:text-primary-foreground transition-colors">
                          rmkothivns@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Quick links */}
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-primary-foreground/50 mb-4">
                      Quick Links
                    </h4>
                    <ul className="space-y-2">
                      {["About", "Rooms", "Amenities", "Gallery", "Reviews"].map(item => <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                              {item}
                            </a>
                          </li>)}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-primary-foreground/10 pt-6 text-center">
                  <p className="text-sm text-primary-foreground/40">
                    © 2026 Rudreshwar Mahadeo Kothi — A Heritage Property. All rights reserved.{" "}
                  </p>
                </div>
              </div>
            </footer>
          </div>

          {/* Image Lightbox */}
          <ImageLightbox isOpen={lightboxOpen} images={getCurrentImageArray()} currentIndex={lightboxImageIdx} onClose={handleCloseLightbox} onPrev={handlePrevImage} onNext={handleNextImage} roomName={lightboxRoomIdx === -1 ? "Gallery" : FALLBACK_ROOMS[lightboxRoomIdx]?.name || "Room"} />
        </motion.div>}
    </div>;
}

/* 
   ROOMS GRID */
function RoomsGrid({
  onInquire,
  onImageClick
}) {
  const {
    data: rooms,
    isLoading
  } = useGetRooms();
  const displayRooms = rooms && rooms.length > 0 ? rooms.map((room, idx) => ({
    ...room,
    bookingUrl: FALLBACK_ROOMS[idx]?.bookingUrl ?? ""
  })) : FALLBACK_ROOMS;
  const roomMarkers = ["rooms.item.1", "rooms.item.2", "rooms.item.3", "rooms.item.4"];
  const inquireMarkers = ["rooms.inquire_button.1", "rooms.inquire_button.2", "rooms.inquire_button.3", "rooms.inquire_button.4"];
  const bookNowMarkers = ["rooms.primary_button.1", "rooms.primary_button.2", "rooms.primary_button.3", "rooms.primary_button.4"];
  if (isLoading) {
    return <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border animate-pulse">
            <div className="h-48 bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
            </div>
          </div>)}
      </div>;
  }
  return <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayRooms.slice(0, 4).map((room, idx) => <RoomCard key={room.name} room={room} idx={idx} onInquire={onInquire} onImageClick={onImageClick} roomMarker={roomMarkers[idx]} inquireMarker={inquireMarkers[idx]} bookNowMarker={bookNowMarkers[idx]} />)}
    </div>;
}

/* REVIEWS */
function ReviewsSection() {
  const {
    data: fetchedReviews,
    isLoading
  } = useGetAllGuestReviews();
  const allReviews = [...SEED_REVIEWS, ...(fetchedReviews ?? [])];
  const reviewMarkers = ["reviews.item.1", "reviews.item.2", "reviews.item.3"];
  if (isLoading) {
    return <div className="grid sm:grid-cols-3 gap-5">
        {[1, 2, 3].map(i => <div key={i} className="rounded-2xl bg-card border border-border p-5 animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-4/5" />
          </div>)}
      </div>;
  }
  if (allReviews.length === 0) {
    return <div data-ocid="reviews.empty_state" className="text-center py-16 px-4 rounded-2xl bg-card border border-border">
        <Star className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="font-medium text-foreground">No reviews yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Be the first to share your experience!
        </p>
      </div>;
  }
  return <div className="grid sm:grid-cols-3 gap-5">
      {allReviews.slice(0, 9).map((review, idx) => <ReviewItem key={`${review.guestName}-${idx}`} review={review} idx={idx} marker={reviewMarkers[idx] ?? `reviews.item.${idx + 1}`} />)}
    </div>;
}
function ReviewItem({
  review,
  idx,
  marker
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.comment.length > 200;
  return <motion.div data-ocid={marker} variants={fadeUp} className="bg-card rounded-2xl border border-border p-5 flex flex-col shadow-xs h-fit">
      {/* Stars */}
      <StarRating rating={Number(review.rating)} />

      {/* Comment */}
      <div className="mt-3 mb-4 flex-1 flex flex-col items-start w-full">
        <p className={`text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap ${!isExpanded && isLong ? "line-clamp-5" : ""}`}>
          "{review.comment}"
        </p>
        {isLong && <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-semibold text-primary mt-2 hover:underline cursor-pointer focus:outline-none">
            {isExpanded ? "Read Less" : "Read More"}
          </button>}
      </div>

      {/* Guest info */}
      <div className="pt-3 border-t border-border/50 mt-auto w-full">
        <p className="font-semibold text-sm text-foreground">
          {review.guestName}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {review.stayDate}
        </p>
      </div>
    </motion.div>;
}

/*
   BOOKING FORM */
function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitBookingInquiry();
  const formRef = useRef(null);
  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        numberOfGuests: BigInt(form.guests || "1"),
        message: form.message
      });
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        message: ""
      });
    } catch {
      // error handled by mutation state
    }
  };
  if (submitted) {
    return <motion.div data-ocid="booking.success_state" initial={{
      opacity: 0,
      scale: 0.96
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="text-center py-16 px-6 bg-card rounded-2xl border border-border shadow-xs">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Inquiry Sent!
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. Team Rudreshwar will confirm availability within 24 hours.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6 rounded-full border-border">
          Send Another Inquiry
        </Button>
      </motion.div>;
  }
  return <form ref={formRef} onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs space-y-5">
      {submitMutation.isPending && <div data-ocid="booking.loading_state" className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-lg px-4 py-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending your inquiry...
        </div>}

      {submitMutation.isError && <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/8 rounded-lg px-4 py-3">
          Something went wrong. Please try again.
        </div>}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input id="name" name="name" data-ocid="booking.name_input" placeholder="Your full name" value={form.name} onChange={handleChange} required className="rounded-lg bg-background border-input" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input id="email" name="email" type="email" data-ocid="booking.email_input" placeholder="you@email.com" value={form.email} onChange={handleChange} required className="rounded-lg bg-background border-input" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="checkIn" className="text-sm font-medium">
            Check-in Date
          </Label>
          <Input id="checkIn" name="checkIn" type="date" data-ocid="booking.checkin_input" value={form.checkIn} onChange={handleChange} required className="rounded-lg bg-background border-input" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="checkOut" className="text-sm font-medium">
            Check-out Date
          </Label>
          <Input id="checkOut" name="checkOut" type="date" data-ocid="booking.checkout_input" value={form.checkOut} onChange={handleChange} required className="rounded-lg bg-background border-input" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="guests" className="text-sm font-medium">
            Guests
          </Label>
          <Input id="guests" name="guests" type="number" min="1" max="10" data-ocid="booking.guests_input" placeholder="2" value={form.guests} onChange={handleChange} required className="rounded-lg bg-background border-input" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm font-medium">
          Message{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea id="message" name="message" data-ocid="booking.message_textarea" placeholder="Any special requests, room preferences, or questions for the team..." value={form.message} onChange={handleChange} rows={4} className="rounded-lg bg-background border-input resize-none" />
      </div>

      <Button data-ocid="booking.submit_button" type="submit" disabled={submitMutation.isPending} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base">
        {submitMutation.isPending ? <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Sending...
          </> : "Send Booking Inquiry"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We typically respond within 24 hours. No payment required at this stage.
      </p>
    </form>;
  inject();
}