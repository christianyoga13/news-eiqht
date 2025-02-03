"use client";
import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7500);
  }, []);

  return loading ? <PageLoader onComplete={() => setLoading(false)} /> : children;
}
