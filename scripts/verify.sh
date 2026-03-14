#!/bin/bash
# =============================================================================
# verify.sh — Design Fortune 프로젝트 구조 검증 스크립트
# 실행: bash scripts/verify.sh
# =============================================================================

PASS=0
FAIL=0
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

green="\033[0;32m"
red="\033[0;31m"
yellow="\033[0;33m"
reset="\033[0m"

check() {
  local label="$1"
  local condition="$2"
  if eval "$condition" > /dev/null 2>&1; then
    echo -e "  ${green}✅ PASS${reset}  $label"
    PASS=$((PASS + 1))
  else
    echo -e "  ${red}❌ FAIL${reset}  $label"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "================================================"
echo " Design Fortune — System Verification"
echo "================================================"
echo ""

# ── 1. 핵심 파일 존재 여부 ──────────────────────────
echo "${yellow}[1] Core Files${reset}"
check "src/styles/tokens.ts 존재"      "[ -f '$ROOT/src/styles/tokens.ts' ]"
check "DRAGME.md 존재"                 "[ -f '$ROOT/DRAGME.md' ]"
check "DESIGN_SYSTEM.md 존재"          "[ -f '$ROOT/DESIGN_SYSTEM.md' ]"
check "TESTING.md 존재"                "[ -f '$ROOT/TESTING.md' ]"
check "DEVELOPMENT_LOG.md 존재"        "[ -f '$ROOT/DEVELOPMENT_LOG.md' ]"
check "readme.md 존재"                 "[ -f '$ROOT/readme.md' ]"
echo ""

# ── 2. 컴포넌트 파일 존재 여부 ──────────────────────
echo "${yellow}[2] Components${reset}"
check "src/components/Button.tsx 존재" "[ -f '$ROOT/src/components/Button.tsx' ]"
check "src/components/Input.tsx 존재"  "[ -f '$ROOT/src/components/Input.tsx' ]"
check "src/components/Badge.tsx 존재"  "[ -f '$ROOT/src/components/Badge.tsx' ]"
echo ""

# ── 3. 토큰 시스템 유효성 ───────────────────────────
echo "${yellow}[3] Design Token Integrity${reset}"
check "tokens.ts에 colors 정의됨"      "grep -q 'colors:' '$ROOT/src/styles/tokens.ts'"
check "tokens.ts에 spacing 정의됨"     "grep -q 'spacing:' '$ROOT/src/styles/tokens.ts'"
check "tokens.ts에 typography 정의됨"  "grep -q 'typography:' '$ROOT/src/styles/tokens.ts'"
check "tokens.ts에 borderRadius 정의됨" "grep -q 'borderRadius:' '$ROOT/src/styles/tokens.ts'"
echo ""

# ── 4. 하드코딩 감지 ───────────────────────────────
echo "${yellow}[4] Hardcoding Detection${reset}"
HARDCODED_HEX=$(grep -rn "'#[0-9a-fA-F]\{3,6\}'" "$ROOT/src/components/" \
  --include="*.tsx" --include="*.ts" \
  | grep -v "tokens\." | grep -v "opacity\|rgba\|\/\/" | wc -l | tr -d ' ')

if [ "$HARDCODED_HEX" -eq 0 ]; then
  echo -e "  ${green}✅ PASS${reset}  컴포넌트 내 하드코딩 hex 색상 0건"
  PASS=$((PASS + 1))
else
  echo -e "  ${red}❌ FAIL${reset}  하드코딩 hex 색상 ${HARDCODED_HEX}건 발견"
  FAIL=$((FAIL + 1))
fi
echo ""

# ── 5. 런타임 환경 ─────────────────────────────────
echo "${yellow}[5] Runtime Environment${reset}"
check "bun 설치됨"     "command -v bun"
check "git 설치됨"     "command -v git"
check "package.json 존재" "[ -f '$ROOT/package.json' ]"
echo ""

# ── 결과 요약 ──────────────────────────────────────
echo "================================================"
TOTAL=$((PASS + FAIL))
echo " Results: ${PASS}/${TOTAL} checks passed"
echo "================================================"

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo -e "${green}  ✅ System Ready${reset}"
  echo ""
  exit 0
else
  echo ""
  echo -e "${red}  ❌ ${FAIL} check(s) failed — review output above${reset}"
  echo ""
  exit 1
fi
