import React from "react";
import { Link } from "@tanstack/react-router";

const blogs = [
  {
    id: 1,
    title: "How a Hotel Near the Ganga River Makes Your Varanasi Trip More Meaningful",
    desc: " Varanasi is a destination that touches every traveller differently. Some come for spirituality, some for culture, and many for the iconic Ghats that define the soul of the city. Choosing a hotel near Ganga river Varanasi is more than just a convenience; it shapes the entire experience of your trip. Staying close to the river allows you to immerse yourself in the rhythm of the city, wake up to peaceful views, and reach important locations with ease.",
    img: "/assets/generated/blog-hero.jpeg",
    slug:"how-a-hotel-near-the-ganga-river-makes-your-varanasi-trip-more-meaningful",
  },
  {
    id: 2,
    title: "Why Staying Near the Ganga River Makes Your Varanasi Trip Perfect",
    desc: "Varanasi is one of those places where every lane tells a story, every ghat carries centuries of devotion, and every sunrise feels like a new spiritual beginning. When you plan a trip here, where you stay becomes just as important as where you go. Choosing a hotel near Ganga river Varanasi instantly elevates the entire experience, bringing you closer to the essence of the city, the ghats, the rituals, and the divine energy that has drawn travellers for generations.",
    img: "/assets/generated/1.jpg",
    slug:"why-staying-near-the-ganga-river-makes-your-varanasi-trip-perfect",
  },
];

const BlogGrid = () => {
  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <div className="blog-img">
            <img src={blog.img} alt={blog.title} />
          </div>

          <div className="blog-content">
            <h1><b>{blog.title}</b></h1>
            <p>{blog.desc}</p>

            {/* ✅ FIXED LINK */}<br/>
            <Link
              to="/blog-details/$slug"
              params={{ slug: blog.slug }}
              className="read-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .blog-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .blog-card:hover {
          transform: translateY(-8px);
        }
        .blog-img img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }
        .blog-content {
          padding: 20px;
        }
        .read-btn {
          padding: 8px 16px;
          background:  oklch(var(--primary) / var(--tw-bg-opacity, 1));
          color: white;
          border-radius: 8px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default BlogGrid;