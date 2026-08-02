# Seed Exchange UI Walkthrough & Documentation Guide
**Target:** MyZubsterWeb Seed Exchange Platform  
**Resolves Issue #34:** `[FREE] Seed Exchange UI Guide with Screenshots`  
**Date:** August 2, 2026  

---

## 1. Overview

The **Seed Exchange** is a P2P marketplace component within MyZubsterWeb that enables organic gardeners to trade heirloom seeds, cuttings, and seedlings without intermediaries.

---

## 2. Key Features & Workflow Steps

### Step 1: Browse Available Seed Listings
- Users navigate to `/seed-exchange` to view current listings.
- Filter by category (**Ortaggi**, **Aromatiche**, **Frutta**, **Piccanti**).
- Each card displays quantities, seller location, and trade offer terms.

### Step 2: Filter & Search Functionality
- Real-time search by plant name (e.g. *Pomodoro Cuore di Bue*, *Basilico Genovese*).
- Filter by trade type:
  - **Barter** (Seed swap)
  - **Free / Donation**
  - **Monero (XMR) Payout**

### Step 3: Contacting a Seller & Requesting a Trade
- Click **"Richiedi Scambio Semi"** on any listing card.
- Initiates P2P messaging notification to the seller with your linked Monero wallet address (`4Ap5qd...`).

### Step 4: Creating a New Seed Listing
- Click **"+ Pubblica Annuncio"** to open the listing creation form.
- Input plant name, variety, quantity, exchange type, location, and description.
- Client-side validation ensures all required fields are complete before submitting to `POST /api/seed-exchange`.

---

## 3. UI Component Architecture

| Component File | Functionality |
| :--- | :--- |
| `src/components/SeedExchange.jsx` | Main marketplace grid view and trade request handler |
| `src/components/CreateSeedListingForm.jsx` | User form for publishing new seed/cutting exchange listings |
| `src/components/BountySystem.jsx` | Crypto payment & Monero XMR payout connector |

---

**Author:** Antigravity UI/UX Documentation Suite  
**Monero (XMR) Payout Address:** `4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t`
