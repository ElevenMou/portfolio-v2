"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function VercelSpeedInsights() {
  return process.env.NODE_ENV === "production" && <SpeedInsights />;
}
