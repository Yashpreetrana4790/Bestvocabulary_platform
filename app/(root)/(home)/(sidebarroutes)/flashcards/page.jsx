"use client";

import dynamic from "next/dynamic";

const FlashcardsClient = dynamic(() => import("./FlashcardsClient"), { ssr: false });

export default FlashcardsClient;
