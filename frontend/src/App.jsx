import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Wallet from './pages/Wallet/Wallet';
import Settings from './pages/Settings/Settings';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import LandingPage from './pages/Landing/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/transactions"
          element={
            <>
              <SignedIn>
                <MainLayout>
                  <Transactions />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/wallet"
          element={
            <>
              <SignedIn>
                <MainLayout>
                  <Wallet />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <SignedIn>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-in/*"
          element={<SignInPage />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUpPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
