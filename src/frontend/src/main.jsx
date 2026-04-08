import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "../index.css";
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { inject } from "@vercel/analytics";
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
// Inject Vercel Analytics
inject();
BigInt.prototype.toJSON = function () {
  return this.toString();
};
const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: Blog
});


const blogdetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
   path: '/blog-details/$slug',
  component: BlogDetails
});
const routeTree = rootRoute.addChildren([indexRoute, blogRoute,blogdetailsRoute]);
const router = createRouter({
  routeTree
});

// Register generic types for router

import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <InternetIdentityProvider>
        <RouterProvider router={router} />
      </InternetIdentityProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
