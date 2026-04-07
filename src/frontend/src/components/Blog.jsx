import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inject } from "@vercel/analytics";
import { ChevronLeft, Menu, X, Phone, MapPin, Mail, ArrowRight, Calendar, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import Loader from "./Loader";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "@tanstack/react-router";

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export const BLOG_POSTS = [
  {
    id: "why-staying-near-ganga-perfect",
    date: "April 6, 2026",
    readTime: "6 min read",
    title: "Why Staying Near the Ganga River Makes Your Varanasi Trip Perfect",
    heroImage: "/assets/generated/blog-hero.jpeg", // Note to User: Will use this placeholder until you swap it with your image
    description: "Choosing a hotel near Ganga river Varanasi instantly elevates the entire experience, bringing you closer to the essence of the city.",
    content: `
      <p class="lead text-xl font-medium text-foreground mb-8">Varanasi is one of those places where every lane tells a story, every ghat carries centuries of devotion, and every sunrise feels like a new spiritual beginning. When you plan a trip here, where you stay becomes just as important as where you go. Choosing a hotel near Ganga river Varanasi instantly elevates the entire experience, bringing you closer to the essence of the city, the ghats, the rituals, and the divine energy that has drawn travellers for generations.</p>
      
      <p>Whether you want peaceful mornings, easy access to the famous temples, or a comfortable base for exploring cultural landmarks, staying close to the river gives you an unmatched advantage.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Why Choosing a Hotel Near Ganga River Varanasi Changes Your Entire Trip</h2>
      <p>The Ganga is not just a river; it is the heartbeat of Varanasi. When you stay close to it, you’re never too far from the most important experiences the city offers.</p>
      <p>You can walk to the ghats, attend the evening Aarti effortlessly, experience early morning boat rides, or simply sit by the river in silence. Hotels near the Ganga also tend to be located in the heritage zone, where everything from temples to street food lies within comfortable reach.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">The Benefits of Staying at a River View Hotel Varanasi</h2>
      <p>A river view hotel Varanasi adds a visual calmness to your stay. Watching sunrise over the water, listening to ringing temple bells, and observing the gentle movement of boats bring a sense of serenity. Even a quick break in your room feels special when you can look outside and see the city’s sacred rhythm unfold.</p>
      <p>These hotels also offer faster access to boat rides, heritage walks, and photography spots, making your trip richer and more fulfilling.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Exploring Varanasi’s Sacred Spots From a Hotel Near Kashi Vishwanath Temple</h2>
      <p>The Kashi Vishwanath Temple is the spiritual centre of Varanasi, and staying nearby helps you avoid long travel times through narrow, busy lanes. A hotel near Kashi Vishwanath Temple ensures you can visit early in the morning, again in the evening, or even multiple times if your itinerary allows.</p>
      <p>This area also keeps you close to several iconic spots like Annapurna Temple, Vishalakshi Temple, and countless ancient shrines hidden in the city’s internal passages.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Easy Access to Dashashwamedh Ghat From a Hotel Near Dashashwamedh Ghat</h2>
      <p>Dashashwamedh Ghat is the cultural heart of Varanasi, bustling, colorful, and deeply spiritual. Staying at a hotel near Dashashwamedh Ghat allows you to reach the evening Ganga Aarti, morning rituals, and boat rides without dealing with long commutes.</p>
      <p>The ghat area is also surrounded by small markets, street-food stalls, and souvenir shops, giving you the real Banarasi flavor at your doorstep.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Experience Spiritual Mornings From a Hotel Near Ganga Aarti Varanasi</h2>
      <p>The Ganga Aarti is a once-in-a-lifetime experience, and staying within walking distance makes it even more magical. From a hotel near Ganga Aarti Varanasi, you can reach prime viewing spots easily before crowds gather.</p>
      <p>Morning Aarti and sunrise boat rides are also more accessible, allowing you to witness Varanasi’s calmest moments, soft chants, floating diyas, and the gentle glow over the ghats.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Why a Hotel Near Ganga Ghat Varanasi Helps You Catch the True Essence of the City</h2>
      <p>Staying at a hotel near Ganga ghat Varanasi means you can explore multiple ghats on foot. Each ghat has its own character; some are spiritual, some are artistic, some are perfect for photography, and some are ideal for peaceful reflection.</p>
      <p>Walking along the riverfront in the early morning or late evening brings you the real spirit of Varanasi, slow, soulful, and deeply rooted in tradition.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Smooth Travel, Market Walks, and Food Trails From a Hotel Near Godowlia Varanasi</h2>
      <p>Godowlia is one of the busiest and most exciting areas of Varanasi. Staying near this area helps you explore the best markets, local street food, handicraft shops, and authentic Banarasi textiles. Choosing a hotel near Godowlia Varanasi also gives you quick access to rickshaws, autos, and short walking routes to almost all major attractions.</p>
      <p>Whether you’re shopping for Banarasi sarees, trying kachori-jalebi, or sipping kulhad chai, Godowlia keeps you connected to everything lively in the city.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Explore BHU, Sarnath, Kal Bhairav Mandir & Iconic Temples Easily</h2>
      <p>From this central zone, it becomes extremely easy to visit important landmarks such as Sarnath, BHU campus, Bharat Kala Bhawan, Sankat Mochan Temple, Tulsi Manas Mandir, Bharat Mata Mandir, and Kal Bhairav Mandir. All of these are short drives away, making the city’s cultural and historical circuits smooth and comfortable.</p>

      <div class="my-10 p-8 rounded-2xl bg-secondary/30 border border-secondary shadow-sm">
        <h2 class="text-foreground font-display font-semibold mb-4 text-2xl !mt-0">Why Rudreshwar Mahadeo Kothi Is a Perfect Fit</h2>
        <p>If you're looking for a peaceful, well-located stay close to the river and major attractions, Rudreshwar Mahadeo Kothi sits in the ideal zone. It offers comfort, elegance, and proximity to ghats and temples, making it an excellent base for your Varanasi exploration.</p>
        <p class="mb-0">Its serene ambience gives you the perfect space to unwind after a long day of sightseeing.</p>
      </div>

      <p>Staying near the Ganga elevates your Varanasi experience in ways that go beyond convenience. It immerses you in the city's spiritual rhythm, keeps you close to iconic landmarks, and helps you explore both culture and calmness with ease. A well-chosen hotel near the river, such as Rudreshwar Mahadeo Kothi, brings together comfort, location, and authenticity, ensuring your Varanasi trip becomes truly meaningful.</p>
    `
  },
  {
    id: "how-hotel-near-ganga-makes-meaningful",
    date: "March 30, 2024",
    readTime: "8 min read",
    title: "How a Hotel Near the Ganga River Makes Your Varanasi Trip More Meaningful",
    heroImage: "/assets/generated/blog2.jpeg",
    description: "Discover how a riverfront stay enhances your trip with comfort, views, and easy access to major ghats.",
    content: `
      <p class="lead text-xl font-medium text-foreground mb-8">Varanasi is a destination that touches every traveller differently. Some come for spirituality, some for culture, and many for the iconic Ghats that define the soul of the city. Choosing a hotel near Ganga river Varanasi is more than just a convenience; it shapes the entire experience of your trip. Staying close to the river allows you to immerse yourself in the rhythm of the city, wake up to peaceful views, and reach important locations with ease.</p>
      <p>In this blog, discover why staying near the Ganga can make your visit more meaningful and how the right location elevates your travel experience.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">The Emotional Connection of Living by a Hotel Near Ganga River Varanasi</h2>
      <p>The Ganga is not just a river; it is a living energy that flows through the heart of Varanasi. Staying close to it means waking up to the sound of temple bells, watching boats glide across the morning waters, and experiencing the city’s spiritual essence from the moment you open your eyes.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Why Choosing a Hotel Near Ganga River Varanasi Makes Your Trip More Convenient</h2>
      <p>A hotel near the river keeps you close to the most significant spiritual sites. Many travellers prefer staying near the ghats because it reduces travel time and maximises exploration.</p>
      <p>Choosing a hotel near Ganga river Varanasi means you’re within walking distance of boat rides, rituals, and landmark areas. The ghats are where the real magic of the city unfolds culture, faith, and community all blend in one place. You also remain close to temples like Kal Bhairav Mandir, Kashi Vishwanath, and cultural attractions such as Bharat Mata Mandir.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Experience the Ganga Aarti Without Hassle</h2>
      <p>The Ganga Aarti is one of the most unforgettable experiences in Varanasi. Staying close to this evening ritual adds convenience and comfort to your visit.</p>

      <div class="my-10 p-8 rounded-2xl bg-secondary/30 border border-secondary shadow-sm">
        <h2 class="text-foreground font-display font-semibold mb-4 text-2xl !mt-0">Better River Views for a Calming Stay</h2>
        <p class="mb-0">Travellers often choose a river view hotel Varanasi because of the calming effect the Ganga has on the mind. A peaceful morning view, a glowing sunset on the waters, or boats returning after evening ceremonies these elements make your stay visually memorable. Such hotels often offer rooftop views, peaceful balconies, and serene atmospheres, which naturally enhance your travel experience.</p>
      </div>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Stay Connected to City Life Through Godowlia</h2>
      <p>While the riverfront is peaceful, the city’s energy flows strongly in areas like Godowlia. If you want convenience, markets, and food joints nearby, consider staying close to this area.</p>

      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Closer Access to the Famous Kashi Vishwanath Temple</h2>
      <p>No trip to Varanasi is complete without visiting the sacred Kashi Vishwanath Temple. Staying close to the river often gives you better access to this historic temple.</p>
      
      <h2 class="text-foreground font-display font-semibold mt-12 mb-5 text-3xl">Why Staying Near the Ganga Creates a More Enriching Travel Experience</h2>
      <p>A hotel near the river helps you explore Varanasi in a natural, effortless way. You can walk along the ghats, pause for chai, enjoy local music, meet people from around the world, and experience the culture at your own pace.</p>

      <div class="mt-10 p-8 rounded-2xl bg-primary/10 border border-primary/20 text-foreground">
        <p class="font-medium mb-0">Choosing a hotel near Ganga river Varanasi transforms your Varanasi trip into a deeper experience. It brings you closer to the city’s spirit, simplifies your travel, and surrounds you with calming river views. Whether you’re visiting for spirituality, culture, or relaxation, staying near the river always adds more meaning to your journey.</p>
      </div>
    `
  }
];

export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('id');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis();
    window.lenis = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, [loading]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#rooms", label: "Rooms" },
    { href: "#amenities", label: "Amenities" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" }
  ];

  const handleNavClick = href => {
    if (href.startsWith("#")) {
      navigate({ to: "/", hash: href.substring(1) });
    } else {
      navigate({ to: href });
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  const activePost = postId ? BLOG_POSTS.find(p => p.id === postId) : null;

  return (
    <div className="relative min-h-screen font-body bg-background">
      <Helmet>
        <title>{activePost ? `${activePost.title} | Rudreshwar Kothi Blog` : "Our Stories | Rudreshwar Kothi Blog"}</title>
        <meta name="description" content={activePost ? activePost.description : "Discover stories, guides, and experiences from the heart of spiritual Varanasi."} />
        <meta property="og:title" content={activePost ? `${activePost.title} | Rudreshwar Kothi Blog` : "Our Stories | Rudreshwar Kothi Blog"} />
        <meta property="og:description" content={activePost ? activePost.description : "Discover stories, guides, and experiences from the heart of spiritual Varanasi."} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={activePost ? `https://rmkothi.com${activePost.heroImage}` : "https://rmkothi.com/assets/generated/blog-hero.jpeg"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

          {/* NAVIGATION (Modern floating pill -> Grand Modern Header) */}
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-b border-black/5"
          >
            <nav className="max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-20 h-[6.5rem] lg:h-[8.5rem] flex items-center justify-between">
              
              {/* Logo Area (Left) */}
              <div className="flex-1 flex justify-start">
                <button type="button" onClick={e => {
                  e.preventDefault();
                  handleNavClick("#hero");
                }} className="relative shrink-0 block overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src="/Rudreshwar%20Mahadeo%20Kothi.png" 
                    alt="Rudreshwar Mahadeo Kothi Logo" 
                    className="h-20 lg:h-[7.5rem] w-auto object-contain origin-left" 
                  />
                </button>
              </div>

              {/* Desktop Nav Links (Center) */}
              <ul className="hidden lg:flex flex-1 items-center justify-center gap-10">
                {navLinks.map((link, idx) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                  >
                    <a href={link.href} onClick={e => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }} className="relative text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-zinc-600 hover:text-black transition-colors py-2 group">
                      {link.label}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-400 ease-out group-hover:w-full"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Action Area (Right) */}
              <div className="flex-1 flex justify-end items-center gap-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
                  <Button onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="hidden sm:flex bg-primary text-white hover:bg-black hover:text-white transition-colors duration-500 text-xs sm:text-sm tracking-[0.15em] uppercase px-8 sm:px-10 py-6 sm:py-7 rounded-none font-semibold shadow-none">
                    Book Now
                  </Button>
                </motion.div>
                <button type="button" className="lg:hidden p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors text-black border border-zinc-200" onClick={() => setMobileMenuOpen(v => !v)}>
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: "auto", opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  transition={{ duration: 0.3, ease: "easeInOut" }} 
                  className="lg:hidden bg-white border-t border-zinc-100 overflow-hidden shadow-2xl absolute w-full left-0 top-full"
                >
                  <div className="px-6 py-8 flex flex-col gap-4">
                    {navLinks.map(link => (
                      <a key={link.href} href={link.href} onClick={e => {
                        e.preventDefault();
                        handleNavClick(link.href);
                        setMobileMenuOpen(false);
                      }} className="py-2 text-sm uppercase tracking-widest font-medium text-zinc-600 hover:text-black transition-colors">
                        {link.label}
                      </a>
                    ))}
                    <div className="pt-6 mt-2 border-t border-zinc-100">
                      <Button onClick={() => window.open("https://live.ipms247.com/booking/book-rooms-rudreshwarmahadeokothibyvns", "_blank")} className="bg-primary text-white w-full rounded-none py-7 font-semibold tracking-[0.1em] uppercase text-sm">
                        Book Your Stay
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>

          <main className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 relative z-10 min-h-[80vh]">
            {activePost ? (
              // BLOG POST VIEW 
              <motion.article
                initial="hidden" animate="visible" variants={stagger}
                className="max-w-4xl mx-auto"
              >
                <motion.div variants={fadeUp} className="mb-10">
                  <button
                    onClick={() => navigate({ to: '/blog', search: {} })}
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-8 group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
                  </button>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {activePost.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {activePost.readTime}</span>
                  </div>
                  <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground leading-tight tracking-tight mb-8">
                    {activePost.title}
                  </h1>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-border relative group">
                  <img src={activePost.heroImage} alt={activePost.title} className="w-full h-[400px] sm:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.div variants={fadeUp} className="prose prose-lg dark:prose-invert prose-indigo max-w-none text-muted-foreground">
                  <div dangerouslySetInnerHTML={{ __html: activePost.content }} />
                </motion.div>

                <motion.hr variants={fadeUp} className="my-16 border-border" />
              </motion.article>
            ) : (
              // BLOG INDEX VIEW
              <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto">
                <motion.div variants={fadeUp} className="text-center mb-16 sm:mb-24">
                  <Badge variant="secondary" className="mb-6 px-4 py-1 pb-1.5">Our Journal</Badge>
                  <h1 className="font-display text-5xl sm:text-7xl font-bold text-foreground leading-tight tracking-tight mb-6">
                    Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Experiences</span>
                  </h1>
                  <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                    Discover travel guides, spiritual journeys, and hidden gems around the holy city of Varanasi.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {BLOG_POSTS.map((post) => (
                    <motion.div
                      key={post.id}
                      whileHover={{ y: -8 }}
                      className="group bg-white/95 border border-border shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden flex flex-col cursor-pointer transition-all"
                      onClick={() => navigate({ to: '/blog', search: { id: post.id } })}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-8 pb-10 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-primary/40" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground leading-snug mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">
                          {post.description}
                        </p>
                        <div className="flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                          Read Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </main>

          {/* FOOTER (Modern dark layout) */}
          <footer className="footer-gradient bg-zinc-950 text-white pt-24 pb-12 px-4 sm:px-6 relative z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle,rgba(139,35,35,0.15)_0%,transparent_60%)] rounded-full pointer-events-none transform translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                <div className="lg:col-span-5 space-y-8">
                <div className="flex flex-col items-start">
                  <div className="bg-white/95 px-6 py-4 rounded-xl shadow-lg border border-white/10 inline-block mb-2">
                    <img src="/Rudreshwar%20Mahadeo%20Kothi.png" alt="Rudreshwar Mahadeo Kothi Logo" className="h-16 sm:h-20 w-auto object-contain" />
                  </div>
                </div>
                  <p className="text-zinc-400 leading-relaxed text-lg max-w-sm">
                    A 300-year-old heritage haveli offering royal elegance and deep spirituality in the heart of ancient Varanasi.
                  </p>
                  <div className="pt-4">
                    <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">Subscribe for offers</p>
                    <div className="flex bg-zinc-900 border border-zinc-800 rounded-full p-1.5 max-w-md focus-within:border-primary/50 transition-colors">
                      <input type="email" placeholder="Email address" className="bg-transparent border-none text-white px-4 py-2 w-full text-sm focus:outline-none" />
                      <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6">Join</Button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Reach Us</h4>
                    <ul className="space-y-4">
                      <li>
                        <a href="tel:+919335106436" className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors">
                          <div className="mt-1 p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <Phone className="w-4 h-4" />
                          </div>
                          <span className="text-sm leading-relaxed">+91 9335106436<br />+91 9889244273</span>
                        </a>
                      </li>
                      <li>
                        <a href="mailto:rmkothivns@gmail.com" className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                          <div className="p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="text-sm">rmkothivns@gmail.com</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Location</h4>
                    <div className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                      <div className="mt-1 p-2 bg-zinc-900 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-sm leading-relaxed">CK-37/29, Bansphatak Road,<br />Gate No.1 Near Pitambari Saree<br />Varanasi 221001, UP, India</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-semibold text-sm uppercase tracking-widest text-zinc-100">Quick Links</h4>
                    <ul className="space-y-3">
                      {["About", "Rooms", "Amenities", "Gallery", "Reviews", "Contact"].map(item => (
                        <li key={item}>
                          <a href={`/${item === "Blog" ? "blog" : "#" + item.toLowerCase()}`} className="text-sm text-zinc-400 hover:text-primary hover:translate-x-1 inline-block transition-all cursor-pointer">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-zinc-500 font-medium">© {new Date().getFullYear()} Rudreshwar Mahadeo Kothi. All rights reserved. Managed by Dr V.N. Singh.</p>
                <div className="flex items-center gap-6 text-sm text-zinc-500">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}