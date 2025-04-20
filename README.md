# 🏦 ParaBank Test Automation

Automated UI tests for [ParaBank](https://parabank.parasoft.com) using Playwright.  For the tests to work the account needs to be created and logged in beforehand.
Tests cover: account creation, bill payments, loan applications, and customer support flows.

## 🧪 Test Coverage
- **Account Management**  
  ✓ New checking/savings accounts  
  ✓ Account balance verification  

- **Transactions**  
  ✓ Bill payments to saved payees  
  ✓ Funds transfers  

- **Loan Services**  
  ✓ Loan application flow  
  ✓ Eligibility verification  

- **Customer Support**  
  ✓ Contact form submissions  
  ✓ FAQ navigation  

## 🛠️ Tech Stack
- Playwright v1.42+
- TypeScript
- GitHub Actions (CI/CD)

## 🚀 Getting Started
```bash
# 1. Clone repository
git clone https://github.com/your-username/parabank-tests.git

# 2. Install dependencies
npm install

# 3. Run tests
npx playwright test

# 4. View HTML report
npx playwright show-report