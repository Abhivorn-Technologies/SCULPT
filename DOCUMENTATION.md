# SCULPT Aesthetics & Plastic Surgery Clinic
## Technical & Deployment Documentation

---

### 1. Project Overview

**SCULPT Aesthetics** is the official web application and content management system (CMS) for **The Sculpt Plastic & Cosmetic Surgery Clinic**, located in Madhapur, Hyderabad. Led by board-certified plastic surgeons **Dr. Jagadish Kiran (M.S., M.Ch)** and **Dr. Suma Sandhyala (M.S., M.Ch)**, the platform serves as both a public-facing patient portal and a full administrative portal.

#### Key Features:
* **Public Patient Portal**:
  * Comprehensive details for **36 plastic surgery & aesthetic procedures** across 6 clinical departments (Face, Body, Breast, Skin, Intimate Aesthetics, Wellness).
  * Interactive **Before & After Results Gallery** supporting both dual-image comparison sliders and single composite images.
  * **Clinical Blog & Health Guide** section.
  * Multi-touchpoint **Lead Capture System** integrated with WhatsApp Business (`+91 96396 35454`) and MongoDB lead recording.
* **Administrative CMS Portal (`/admin`)**:
  * Protected authentication via NextAuth.js (JWT).
  * Real-time **Dashboard** with KPI analytics for lead inquiries, published blogs, and gallery results.
  * **Lead & Appointment Manager** (`/admin/appointments`) to search, filter, update statuses (`New`, `Contacted`, `Scheduled`, `Completed`), add notes, or delete inquiries.
  * **Gallery & Results Manager** (`/admin/gallery`) with image mode toggle, 9-item pagination, manual treatment title entry, and dynamic uppercase category filter chips.
  * **Blogs & Articles CMS** (`/admin/blogs`) with a 1-click visual rich-text formatting toolbar and real-time live article preview.
  * **Settings & Security Manager** (`/admin/settings`) allowing admin profile and password updates saved directly into MongoDB.

---

### 2. Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Full-stack React framework utilizing Server & Client Components. |
| **Language** | **TypeScript** | Type-safe application development (`npx tsc --noEmit` verified clean). |
| **Styling** | **Vanilla CSS + Tailwind CSS v4** | Custom SCULPT Light Luxury design system (`#F8F6F2` cream, `#FFFFFF` cards, `#E6663A` terracotta accent, `#151515` deep black). |
| **Animations** | **Framer Motion** | Micro-interactions, smooth page transitions, and interactive before/after sliders. |
| **Authentication**| **NextAuth.js** | JWT session management with credentials provider checking MongoDB `User` collection. |
| **Database** | **MongoDB Atlas & Mongoose** | Cloud document database with cached connection handler (`sculpt_db`). |
| **Icons** | **Lucide React** | Lightweight modern icon set. |
| **Image Storage** | **Public Static & Local Upload API** | Server upload API (`/api/admin/upload`) writing files to `public/uploads/`. |

---

### 3. Frontend & Backend Architecture

#### Public Routes:
* `/` — Homepage featuring Hero, Services Grid, Clinical Results, Surgeon Profile, FAQs, and Contact Form.
* `/about` — Clinic philosophy, surgeon credentials, and facility highlights.
* `/services` — Department index for procedures.
* `/services/[slug]` — Individual detailed procedure landing pages.
* `/gallery` — Public before-and-after results gallery with dynamic category filter tabs (`ALL`, `FACE`, `BODY`, `BREAST`, `SKIN`, `INTIMATE`, `WELLNESS`, etc.) and 9-item pagination.
* `/blog` — Patient education blog index.
* `/blog/[slug]` — Dynamic blog post page featuring structured typography, rich HTML content, FAQs, and consultation CTA.
* `/contact` — Direct booking and inquiry form.
* `/privacy-policy`, `/terms-of-service`, `/medical-disclaimer` — Legal & regulatory compliance pages.

#### Protected Admin Routes (`/admin`):
* `/admin/login` — Light Luxury branded authentication portal.
* `/admin` — Admin Dashboard overview & statistics.
* `/admin/appointments` — Lead & booking inquiry management.
* `/admin/gallery` — Before & After results gallery manager.
* `/admin/blogs` — Blog posts list and status filter.
* `/admin/blogs/new` — Create new blog post.
* `/admin/blogs/[id]` — Edit existing blog post.
* `/admin/settings` — Profile details & admin password security settings.

#### API Endpoints (`/app/api/`):
* `POST /api/auth/[...nextauth]` — Authentication endpoint.
* `GET /api/gallery` — Public published gallery results payload.
* `GET, POST /api/admin/gallery` — Admin gallery fetch and creation endpoint.
* `PUT, DELETE /api/admin/gallery/[id]` — Admin gallery update and deletion endpoint.
* `GET, POST /api/admin/blogs` — Admin blogs fetch and creation endpoint.
* `PUT, DELETE /api/admin/blogs/[id]` — Admin blog update and deletion endpoint.
* `POST /api/admin/upload` — File upload endpoint (saves images to `public/uploads/`).
* `GET, PATCH, DELETE /api/admin/appointments` — Admin lead management endpoints.
* `POST /api/appointment` — Public lead submission endpoint (saves to MongoDB & triggers WhatsApp redirect).
* `POST /api/admin/seed` — Database seeder endpoint for initial deployment.

---

### 4. Database Schemas & Collections (`sculpt_db`)

1. **`users` Collection** (`lib/models/User.ts`):
   * `name`: String
   * `email`: String (unique)
   * `password`: String (bcrypt hashed)
   * `role`: String (default: `"admin"`)

2. **`blogs` Collection** (`lib/models/Blog.ts`):
   * `title`: String
   * `slug`: String (unique)
   * `featuredImage`: String
   * `shortDescription`: String
   * `content`: String (HTML / Rich text)
   * `category`: String
   * `author`: String
   * `publishDate`: Date
   * `status`: Enum (`"Draft"`, `"Published"`)
   * `metaTitle`: String
   * `metaDescription`: String
   * `relatedService`: String

3. **`galleryresults` Collection** (`lib/models/Gallery.ts`):
   * `title`: String
   * `beforeImage`: String
   * `afterImage`: String
   * `treatmentService`: String
   * `category`: String (Uppercase, e.g., `"FACE"`, `"BODY"`, `"HAIR"`)
   * `shortDescription`: String
   * `displayOrder`: Number
   * `status`: Enum (`"Draft"`, `"Published"`)

4. **`appointments` Collection** (`lib/models/Appointment.ts`):
   * `fullName`: String
   * `phone`: String
   * `email`: String
   * `service`: String
   * `message`: String
   * `status`: Enum (`"New"`, `"Contacted"`, `"Scheduled"`, `"Completed"`, `"Cancelled"`)
   * `notes`: String

---

### 5. API & Third-Party Integrations

* **WhatsApp Business Integration**:
  * Direct pre-filled WhatsApp redirection to **`+91 96396 35454`**.
  * Pre-formatted message templates containing Client Name, Phone, Email, Service Requested, and Message.
* **Nodemailer SMTP (Optional Alert System)**:
  * Triggers email notifications upon new lead submissions if `SMTP_HOST` environment variables are provided.
* **Windows DNS Resolver Fix**:
  * `lib/mongodb.ts` includes `dns.setServers(["8.8.8.8", "1.1.1.1"])` to resolve `querySrv ECONNREFUSED` issues on Windows environments connecting to MongoDB Atlas SRV URIs.

---

### 6. Environment Variables Required

Create a `.env.local` file in the project root:

```env
# Node & Application URL
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sculpt_aesthetics_nextauth_secret_key_2026_super_secure

# Database Connection (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sculpt_db?retryWrites=true&w=majority

# Admin Credentials (Initial Fallback)
ADMIN_EMAIL=admin@thesculpt.co.in
ADMIN_PASSWORD=your_secure_admin_password

# Email Alerts (Optional Nodemailer Config)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=leads@thesculpt.co.in

# Cloudinary Media Storage Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

---

### 7. Deployment Process & Hosting Details

#### Hosting Infrastructure Summary:

| Component | Platform / Provider | Purpose |
| :--- | :--- | :--- |
| **Frontend & Serverless API** | **Vercel** *(or Hostinger VPS / Railway / Netlify)* | Hosts Next.js App Router frontend pages and serverless API endpoints. |
| **Database** | **MongoDB Atlas** | Cloud MongoDB cluster hosting `sculpt_db` collections. |
| **Source Control** | **GitHub** (`Abhivorn-Technologies/SCULPT`) | Version control and automated continuous integration (CI/CD) deployment. |
| **Domain & DNS** | **Custom Domain** (`thesculpt.co.in`) | Production domain with SSL certificate pointing to Vercel/Hosting DNS servers. |

#### Step-by-Step Deployment Guide:

1. **GitHub Repository Sync**:
   * Push all source files to GitHub repository `Abhivorn-Technologies/SCULPT`.
2. **MongoDB Atlas Preparation**:
   * Whitelist IP addresses (`0.0.0.0/0` for serverless hosting like Vercel).
   * Copy connection URI into `MONGODB_URI`.
3. **Vercel / Hosting Platform Setup**:
   * Import project from GitHub.
   * Framework Preset: `Next.js`.
   * Configure Environment Variables (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
   * Deploy project.
4. **Initial Database Seeding**:
   * Trigger initial seed by making a POST request to `https://thesculpt.co.in/api/admin/seed` or logging into `/admin` (auto-seeds 36 gallery items and 11 blogs).

---

### 8. Current Project Status

* **Status**: 100% Production Ready & Verified.
* **TypeScript Health**: 0 compilation errors (`npx tsc --noEmit` verified).
* **Content Status**:
  * 36 static Before & After results imported into MongoDB.
  * 11 static blog posts imported into MongoDB.
  * Admin Settings password update operational.
  * Custom deletion modals (zero browser `alert()` popups) implemented.

---

### 9. Developer Handover Notes

* **Admin Access**: Navigate to `/admin/login`. Enter admin credentials stored in MongoDB (or env fallback).
* **Media Uploads**: Uploaded images via Admin panel are saved to `public/uploads/`. If deploying to read-only serverless platforms (e.g. Vercel), configure an S3 bucket or Cloudinary in `app/api/admin/upload/route.ts` if persistent disk storage is required.
* **Adding New Gallery Categories**: Type any uppercase category in `/admin/gallery`. The public site automatically generates matching filter tabs dynamically without requiring code modifications.
