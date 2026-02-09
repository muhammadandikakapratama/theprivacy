#!/bin/bash
# Automated Security Testing Script for Kali Linux
# Target: https://theprivacy.vercel.app

TARGET="https://theprivacy.vercel.app"
OUTPUT_DIR="./pentest_results"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔═══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ELECTRIC PATHFINDER SECURITY SCANNER   ║${NC}"
echo -e "${GREEN}║        Automated Kali Linux Testing       ║${NC}"
echo -e "${GREEN}╔═══════════════════════════════════════════╗${NC}"
echo ""
echo -e "${YELLOW}Target: $TARGET${NC}"
echo ""

# Create output directory
mkdir -p $OUTPUT_DIR

# 1. NMAP SCAN
echo -e "${GREEN}[1/7] Running Nmap Scan...${NC}"
nmap -sV -sC -oN $OUTPUT_DIR/nmap_scan.txt theprivacy.vercel.app 2>/dev/null
echo -e "${GREEN}✓ Nmap scan complete${NC}\n"

# 2. DIRECTORY ENUMERATION
echo -e "${GREEN}[2/7] Directory Enumeration with Gobuster...${NC}"
gobuster dir -u $TARGET -w /usr/share/wordlists/dirb/common.txt -o $OUTPUT_DIR/gobuster.txt -q 2>/dev/null
echo -e "${GREEN}✓ Directory scan complete${NC}\n"

# 3. NIKTO SCAN
echo -e "${GREEN}[3/7] Running Nikto Web Scanner...${NC}"
nikto -h $TARGET -o $OUTPUT_DIR/nikto.txt 2>/dev/null
echo -e "${GREEN}✓ Nikto scan complete${NC}\n"

# 4. ROBOTS.TXT CHECK
echo -e "${GREEN}[4/7] Checking robots.txt...${NC}"
curl -s $TARGET/robots.txt > $OUTPUT_DIR/robots.txt
echo -e "${GREEN}✓ Robots.txt saved${NC}\n"

# 5. HIDDEN DIRECTORIES
echo -e "${GREEN}[5/7] Checking known hidden paths...${NC}"
echo "Testing /files/" >> $OUTPUT_DIR/hidden_paths.txt
curl -s $TARGET/files/ >> $OUTPUT_DIR/hidden_paths.txt
echo -e "\nTesting /s3cr3t/" >> $OUTPUT_DIR/hidden_paths.txt
curl -s $TARGET/s3cr3t/ >> $OUTPUT_DIR/hidden_paths.txt
echo -e "${GREEN}✓ Hidden paths checked${NC}\n"

# 6. API ENDPOINT DISCOVERY
echo -e "${GREEN}[6/7] API Endpoint Discovery...${NC}"
echo "Common API endpoints:" > $OUTPUT_DIR/api_endpoints.txt
for endpoint in auth login register me logout admin users challenges stats; do
    echo -e "\nTesting /api/$endpoint" >> $OUTPUT_DIR/api_endpoints.txt
    curl -s -o /dev/null -w "Status: %{http_code}\n" $TARGET/api/$endpoint >> $OUTPUT_DIR/api_endpoints.txt
done
echo -e "${GREEN}✓ API discovery complete${NC}\n"

# 7. BASIC XSS TEST
echo -e "${GREEN}[7/7] Basic XSS Testing...${NC}"
echo "XSS Test Results:" > $OUTPUT_DIR/xss_test.txt
curl -X POST $TARGET/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"<script>alert(1)</script>","password":"test"}' \
  >> $OUTPUT_DIR/xss_test.txt 2>/dev/null
echo -e "${GREEN}✓ XSS test complete${NC}\n"

# GENERATE SUMMARY
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}           SCAN COMPLETE!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Results saved to: $OUTPUT_DIR/${NC}"
echo ""
echo -e "Files created:"
ls -lh $OUTPUT_DIR/
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review results in $OUTPUT_DIR/"
echo "2. Try manual exploitation"
echo "3. Use Burp Suite for advanced testing"
echo "4. Check KALI_TESTING.md for more commands"
echo ""
echo -e "${GREEN}Happy Hacking! 🐉${NC}"
