# Benchtop Market: Technical Build & Architecture Plan

## 1. Project Overview & Objectives

**Benchtop Market** is a prediction market and milestone funding web app for deep tech startups. This document outlines the system architecture, component breakdown, technology stack, and phased implementation roadmap.

---

## 2. Technology Stack

### Core Frontend & UI
* **Framework**: React / Next.js or Vite + HTML5 + JavaScript (ESNext)
* **Styling**: Vanilla CSS / Custom CSS Design Tokens (Dark mode, glassmorphism, responsive grid layout)
* **Charts & Telemetry**: Lightweight-Charts / Chart.js for real-time prediction odds, orderbook, and telemetry
* **Icons & Fonts**: Lucide Icons + Google Fonts (Inter / Outfit)

### Backend & Escrow Simulation
* **API / Logic Engine**: Node.js / Express or Client-side Mock State Manager with LocalStorage persistence
* **Data Verification Engine**: IPFS Mock / Cryptographic Hash Verification Module for test certificates
* **Market Engine**: Automated Market Maker (AMM) constant-product / CPMM algorithm or binary orderbook engine

---

## 3. System Architecture & Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      BENCHTOP MARKET FRONTEND UI                        │
├─────────────────┬───────────────────────┬───────────────────────────────┤
│  Market Hub     │  Prediction Terminal  │  Direct Grant Escrow Panel    │
│ • Featured Tech │ • Live YES/NO Order   │ • Real-time Lab Funding Meter │
│ • Category Filter│ • Interactive Chart   │ • Accredited Lab Details      │
│ • Startup Cards │ • Position Summary    │ • Fee Split Transparency      │
└────────┬────────┴───────────┬───────────┴──────────────┬────────────────┘
         │                   │                          │
         ▼                   ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     BENCHTOP MARKET CORE ENGINE                         │
├─────────────────────────┬───────────────────────────────────────────────┤
│ Market Logic (AMM)      │ Grant Escrow Router                           │
│ • Shares Calculation    │ • 2.5% Lab Escrow Allocation                  │
│ • Price Impact Engine   │ • 0.5% Platform Fee Engine                    │
│ • Payout Resolver       │ • Invoice & Release Protocol                  │
└─────────────────────────┴───────────────────────────────────────────────┘
```

---

## 4. Phased Development Roadmap

### Phase 1: Directory Setup & Structural Foundation (Current)
* [x] Create project repository structure (`/build_plan`, `/economics`).
* [x] Formulate platform economics and mathematical fee routing model.
* [x] Draft technical architectural build plan.

### Phase 2: Core Platform Engine & UI Mockup
* [ ] Implement CSS design token system (Dark modern theme, gradient accents, responsive cards).
* [ ] Build interactive Prediction Market Terminal (YES/NO trading interface, live odds calculation).
* [ ] Build Direct Grant Escrow Progress Bar & Transparency Widget.
* [ ] Build Startup Milestone Directory with category filters (Robotics, Biotech, Clean Energy, Quantum).

### Phase 3: Oracle Verification & VC Pro Terminal
* [ ] Build Lab Verification Certificate Inspector with sample hash validator.
* [ ] Build VC / Pro Investor Terminal view with telemetry analytics and deal flow triggers.
* [ ] Integrate local state persistence for testing trading simulations.

### Phase 4: Testing & Polish
* [ ] Perform cross-browser and mobile responsive testing.
* [ ] Verify fee split calculation precision and escrow release logic.
