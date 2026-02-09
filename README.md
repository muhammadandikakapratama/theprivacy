# Electric Pathfinder Wargame

Retro-style cybersecurity wargame with Windows 95 aesthetics.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB
1. Go to Vercel Dashboard → Storage → MongoDB
2. Copy the connection string
3. Create `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string_here
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Create Admin Account
Visit: `http://localhost:3000/api/setup-admin`

This will create admin user:
- **Username**: `admin`
- **Password**: `admin123`

## 📦 Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add `MONGODB_URI` environment variable in Vercel settings
4. Deploy!
5. Visit `https://your-app.vercel.app/api/setup-admin` to create admin

## 🎮 Features

- **Wargame Challenges**: Natas-style security challenges
- **Admin Panel**: Ban/unban users, view all accounts
- **User Tracking**: IP, location, last seen
- **Retro UI**: Windows 95 aesthetic
- **Persistent Storage**: MongoDB for data persistence

## 🔐 Admin Access

- Login with `admin` / `admin123`
- Access admin panel at `/admin`
- Manage users, view statistics

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Authentication**: Cookie-based sessions

## 📝 Environment Variables

```env
MONGODB_URI=mongodb+srv://...
```

## 🎯 Challenges

1. **Natas Level 0** - View page source
2. **Natas Level 1** - Bypass right-click block
3. **Natas Level 2** - Directory traversal
4. **Natas Level 3** - robots.txt secrets

## 🔒 Security Note

This is a **wargame/CTF platform**. Some vulnerabilities are intentional for educational purposes.

---

Built with ❤️ for cybersecurity education
