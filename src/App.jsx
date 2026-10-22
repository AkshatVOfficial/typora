import styled from "styled-components";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import Signin from "./components/logic/Signin";
import Signup from "./components/logic/Signup";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Write from "./components/ui/tiptap/write";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import WriteEdit from "./components/ui/tiptap/WriteEdit";
import Protected from "./components/logic/AuthLayout";
import ScrollToTop from "./components/logic/ScrollToTop";
import {
  About,
  AccountGetInPage,
  Contact,
  Feedback,
  Guidelines,
  Help,
  Home,
  PostDetails,
  Posts,
  Privacy,
  Terms,
} from "./components/pages/index";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 6em;
    height: 6em;
  }

  .loader-ring {
    animation: ringA 2s linear infinite;
  }

  /* Theme colors from index.css. Dark mode switches them automatically. */
  .loader-ring-a,
  .loader-ring-c {
    stroke: var(--color-primary);
  }

  .loader-ring-b,
  .loader-ring-d {
    stroke: var(--color-primary-hover);
  }

  .loader-ring-b {
    animation-name: ringB;
  }

  .loader-ring-c {
    animation-name: ringC;
  }

  .loader-ring-d {
    animation-name: ringD;
  }

  /* Animations */
  @keyframes ringA {
    from,
    4% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }

    12% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -335;
    }

    32% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -595;
    }

    40%,
    54% {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -660;
    }

    62% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -665;
    }

    82% {
      stroke-dasharray: 60 600;
      stroke-width: 30;
      stroke-dashoffset: -925;
    }

    90%,
    to {
      stroke-dasharray: 0 660;
      stroke-width: 20;
      stroke-dashoffset: -990;
    }
  }

  @keyframes ringB {
    from,
    12% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -110;
    }

    20% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -115;
    }

    40% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -195;
    }

    48%,
    62% {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    70% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    90% {
      stroke-dasharray: 20 200;
      stroke-width: 30;
      stroke-dashoffset: -305;
    }

    98%,
    to {
      stroke-dasharray: 0 220;
      stroke-width: 20;
      stroke-dashoffset: -330;
    }
  }

  @keyframes ringC {
    from {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }

    8% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }

    28% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }

    36%,
    58% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    66% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    86% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }

    94%,
    to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }

  @keyframes ringD {
    from,
    8% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: 0;
    }

    16% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -5;
    }

    36% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -175;
    }

    44%,
    50% {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -220;
    }

    58% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -225;
    }

    78% {
      stroke-dasharray: 40 400;
      stroke-width: 30;
      stroke-dashoffset: -395;
    }

    86%,
    to {
      stroke-dasharray: 0 440;
      stroke-width: 20;
      stroke-dashoffset: -440;
    }
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({
              userData: JSON.parse(JSON.stringify(userData)),
            }),
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        dispatch(logout());

        console.error("Auth check failed:", error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <StyledWrapper>
          <svg
            className="loader"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            role="status"
            aria-label="Loading"
          >
            <circle
              className="loader-ring loader-ring-a"
              cx={120}
              cy={120}
              r={105}
              fill="none"
              strokeWidth={20}
              strokeDasharray="0 660"
              strokeDashoffset={-330}
              strokeLinecap="round"
            />
            <circle
              className="loader-ring loader-ring-b"
              cx={120}
              cy={120}
              r={35}
              fill="none"
              strokeWidth={20}
              strokeDasharray="0 220"
              strokeDashoffset={-110}
              strokeLinecap="round"
            />
            <circle
              className="loader-ring loader-ring-c"
              cx={85}
              cy={120}
              r={70}
              fill="none"
              strokeWidth={20}
              strokeDasharray="0 440"
              strokeLinecap="round"
            />
            <circle
              className="loader-ring loader-ring-d"
              cx={155}
              cy={120}
              r={70}
              fill="none"
              strokeWidth={20}
              strokeDasharray="0 440"
              strokeLinecap="round"
            />
          </svg>
        </StyledWrapper>
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/posts"
              element={
                <Protected authentication={true}>
                  <Posts />
                </Protected>
              }
            />
            <Route
              path="/add-post"
              element={
                <Protected authentication={true}>
                  <Write />
                </Protected>
              }
            />
            <Route
              path="/post/:postId/edit"
              element={
                <Protected authentication={true}>
                  <WriteEdit />
                </Protected>
              }
            />
            <Route
              path="/post/:postId/"
              element={
              
                  <PostDetails />
                
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/guidelines" element={<Guidelines />} />

            {/* Add your other normal pages here */}
          </Route>

          {/* authentication page  */}
          <Route path="/getin" element={<AccountGetInPage />}>
            <Route index element={<Signin />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
