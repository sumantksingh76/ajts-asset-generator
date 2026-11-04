# AJTS Asset Sticker & Master Sheet QR Generator
### With 4 Stickers in a Row on A4 & Live Master Inventory Sheet

A professional web application tailored for **AJTS COMPUTERS RENTAL SERVICES** to manage hardware inventory across **CPU** and **Monitor** categories, generate bulk scannable asset stickers formatted with **4 stickers in a row** on standard **A4 paper**, and view/edit all records in a real-time **Master Sheet**.

---

## 🌟 Key Features & Updates

1. **4 Stickers in a Row on A4 (`⭐ 20 per A4 [4×5]` & `24 per A4 [4×6]`)**:
   - **4 Columns**: Exactly 4 stickers across each row of the A4 page ($47.5\,\text{mm}$ width).
   - **Layout Presets**:
     - `⭐ 4 in a row (20 per A4)`: $4 \times 5$ grid ($47.5\,\text{mm} \times 52\,\text{mm}$).
     - `4 in a row (24 per A4)`: $4 \times 6$ grid ($47.5\,\text{mm} \times 43\,\text{mm}$).
     - `3 in a row (15 per A4)` & `2 in a row (8 per A4)` also available in the toolbar.

2. **Redesigned Sticker (Large Logo & Zero Wasted Space)**:
   - **Enlarged Logo**: The AJTS logo occupies the full height of the header, prominently visible even in 4-column compact stickers.
   - **Zero Wasted Space**: Tightened margins, compact divider line, clean typography, and optimized QR code square area for maximum scannability.

3. **Master Inventory Sheet (Default Starting View)**:
   - When the application starts, it displays the **Master Sheet** first, allowing you to review all inventory records and see what data stickers are being created for.
   - **Categories**:
     - **`💻 CPU`**: Desktops, Laptops, Workstations (Dell 3420, Latitude 5420, HP ProBook, Lenovo ThinkPad, OptiPlex, etc.).
     - **`🖥️ Monitor`**: Screens, Displays (Dell 24" P2419H, HP 24" E243, Samsung 24", BenQ 24", etc.).
   - **Real-Time Sync**: Edit any cell (Badge #, Model Name, Serial Number, or Category) and changes synchronize immediately across both the queue and sticker sheets.
   - **Click-to-Toggle Category**: Click the category badge directly in the Master Sheet to switch any item between CPU and Monitor.

4. **Multi-Tab Excel (.xlsx) Export**:
   - Downloads a genuine Excel file with 3 sheets:
     - `Master Sheet (All Records)`
     - `CPU (Laptops & Desktops)`
     - `Monitor (Screens & Displays)`

---

## 🚀 How to Run

1. **Via npm**:
   ```bash
   npm start
   ```
2. **Via Python directly**:
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and navigate to: **`http://localhost:3000`**

---

## 🖨️ Printing Instructions

1. Click **"🖨️ Print A4 Sheets"**.
2. In your browser print dialog:
   - **Paper Size**: **A4**.
   - **Margins**: **None** (or Minimum).
   - **Options**: Ensure **"Background graphics"** is **CHECKED**.
