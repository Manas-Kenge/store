import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import "@/App.css";

import Container from "@/components/Container";
import NotFoundRedirect from "@/components/NotFoundRedirect";
import { ScrollToTop } from "@/components/ScrollToTop";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/nav/Navbar";
import APIKeys from "@/components/pages/APIKeys";
import About from "@/components/pages/About";
import Browse from "@/components/pages/Browse";
import BuyPage from "@/components/pages/BuyPage";
import Create from "@/components/pages/Create";
import EmailSignup from "@/components/pages/EmailSignup";
import FileBrowser from "@/components/pages/FileBrowser";
import Home from "@/components/pages/Home";
import ListingDetails from "@/components/pages/ListingDetails";
import Login from "@/components/pages/Login";
import Logout from "@/components/pages/Logout";
import NotFound from "@/components/pages/NotFound";
import Profile from "@/components/pages/Profile";
import Signup from "@/components/pages/Signup";
import { AlertQueue, AlertQueueProvider } from "@/hooks/useAlertQueue";
import { AuthenticationProvider } from "@/hooks/useAuth";
import { DarkModeProvider } from "@/hooks/useDarkMode";

import DownloadsPage from "./components/pages/Download";

const PendoInitializer = () => {
  const location = useLocation(); // Hook to get current route

  useEffect(() => {
    if (window.pendo) {
      window.pendo.initialize({
        visitor: { id: "" }, // Leave empty for anonymous tracking
        account: { id: "" },
      });
      console.log("Pendo initialized");
    }
  }, []);

  useEffect(() => {
    // Track page views when the route changes
    if (window.pendo) {
      window.pendo.pageLoad(); // Notify Pendo of page transitions
    }
  }, [location.pathname]);

  return null; // This component only handles Pendo initialization and page tracking
};

const App = () => {
  return (
    <Router>
      <DarkModeProvider>
        <AuthenticationProvider>
          <AlertQueueProvider>
            <AlertQueue>
              <ScrollToTop>
                <div className="dark:bg-black dark:text-white min-h-screen flex flex-col">
                  <Navbar />
                  <PendoInitializer />{" "}
                  {/* This component is where Pendo is initialized */}
                  <div className="flex-grow">
                    <Container>
                      <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/about" element={<About />} />
                        <Route path="/buy" element={<BuyPage />} />
                        <Route path="/downloads" element={<DownloadsPage />} />

                        <Route path="/browse/:page?" element={<Browse />} />
                        <Route
                          path="/file/:artifactId"
                          element={<FileBrowser />}
                        />

                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/signup/" element={<Signup />} />
                        <Route path="/signup/:id" element={<EmailSignup />} />

                        <Route path="/create" element={<Create />} />
                        <Route path="/item/:id" element={<ListingDetails />} />
                        <Route path="/keys" element={<APIKeys />} />

                        <Route path="/profile/:id?" element={<Profile />} />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<NotFoundRedirect />} />
                      </Routes>
                    </Container>
                  </div>
                  <Footer />
                </div>
              </ScrollToTop>
            </AlertQueue>
          </AlertQueueProvider>
        </AuthenticationProvider>
      </DarkModeProvider>
    </Router>
  );
};

export default App;
