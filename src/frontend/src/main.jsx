import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "../index.css";
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { inject } from "@vercel/analytics";
import Home from "./components/Home";
import Blog from "./components/Blog";

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
const routeTree = rootRoute.addChildren([indexRoute, blogRoute]);
const router = createRouter({
  routeTree
});

// Register generic types for router

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(<QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <RouterProvider router={router} />
    </InternetIdentityProvider>
  </QueryClientProvider>);