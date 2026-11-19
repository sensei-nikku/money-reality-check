/* Money Reality Check — built by tools/build.py from src/. Edit src/, not this file. */
/* page markup (from src/student/markup.html) */
document.getElementById("app").innerHTML = "<div id=\"loadScreen\"><div class=\"spinner\"></div><p style=\"font-size:14px;color:var(--dg)\">Loading...</p><p id=\"loadErr\" style=\"font-size:12px;color:var(--rd);display:none\"></p></div>\n<div class=\"hdr\" id=\"stickyHdr\" style=\"display:none\"><div class=\"wrap\" style=\"padding-top:0;padding-bottom:0\"><div class=\"hdr-row\"><h1>Money Reality Check</h1><span class=\"badge\" id=\"hBadge\">1/7</span></div><div class=\"prog-track\"><div class=\"prog-fill\" id=\"hProg\" style=\"width:0%\"></div></div><div class=\"tabs\" id=\"hTabs\"></div></div></div>\n<div class=\"wrap\" id=\"main\">\n<div class=\"sec\" id=\"secDone\"><div style=\"text-align:center;margin:60px 0 20px\"><h2 style=\"font-size:22px;font-weight:700;margin-bottom:8px\">Already Submitted</h2><p style=\"font-size:13px;color:var(--dg)\">Your work has been submitted for review.</p><p style=\"font-size:13px;color:var(--dg);margin-top:12px\" id=\"doneEmail\"></p></div></div>\n\n\n\n<!-- \u2550\u2550\u2550 SECTION 0: PAYCHECK \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s0\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 1: Your Paycheck</h2>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">What Is Gross Pay?</p><p>Gross pay is the total amount your employer agrees to pay you before any deductions. If you make $16/hour and work 40 hours a week, your gross weekly pay is $640. Over a year (52 weeks), that is $33,280. This is the number on a job posting, but it is NOT the amount that shows up in your bank account.</p></div>\n    <div class=\"sub\"><p class=\"t\">What Is Net Pay?</p><p>Net pay (take-home pay) is what actually hits your bank account after all deductions. The gap between gross and net can be 20-35% of your paycheck. This is the only number that matters for budgeting because you cannot spend money you never received.</p></div>\n    <div class=\"sub\"><p class=\"t\">The Three Mandatory Deductions</p><p><strong>1. Federal Income Tax</strong> uses a progressive system: income is taxed in layers. The first $11,600 is taxed at 10%. Income from $11,601-$47,150 at 12%. And so on. Only dollars above each threshold get the higher rate.</p><p><strong>2. Arizona State Tax</strong> is a flat 2.5% on all earned income. Every dollar taxed at the same rate.</p><p><strong>3. FICA</strong> is 7.65% split between Social Security (6.2%) for retirement/disability and Medicare (1.45%) for health coverage at 65+. Your employer matches it.</p></div>\n  </div>\n\n  <div class=\"block b-apply\"><p class=\"bt\">Apply</p>\n    <div class=\"sub\">\n      <div class=\"fld\"><label>How are you paid?</label><div class=\"radio-g\"><div class=\"rbtn sel\" data-rkey=\"payType\" data-rval=\"hourly\" onclick=\"setRadio(this)\">Hourly</div><div class=\"rbtn\" data-rkey=\"payType\" data-rval=\"salary\" onclick=\"setRadio(this)\">Salary</div></div></div>\n      <div id=\"pHourly\"><div class=\"fld\"><label>Hourly wage</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"wage\" placeholder=\"16.50\" step=\"0.25\" oninput=\"calcPC()\"></div></div><div class=\"fld\"><label>Hours per week</label><input type=\"number\" data-key=\"hours\" value=\"40\" placeholder=\"40\" oninput=\"calcPC()\"></div></div>\n      <div id=\"pSalary\" style=\"display:none\"><div class=\"fld\"><label>Annual salary</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"salary\" placeholder=\"38000\" oninput=\"calcPC()\"></div></div></div>\n    </div>\n    <div class=\"sub\" id=\"pcR\" style=\"display:none\"><p class=\"t\">Your Breakdown</p><div class=\"bk\"><span>Gross monthly:</span><span class=\"r b\" id=\"pcG\">$0</span><span>- Federal tax:</span><span class=\"r rd\" id=\"pcF\">-$0</span><span>- AZ state:</span><span class=\"r rd\" id=\"pcS\">-$0</span><span>- FICA:</span><span class=\"r rd\" id=\"pcC\">-$0</span><span class=\"b bbt\">Take-home:</span><span class=\"r b gn bbt\" id=\"pcN\" data-display=\"netMonthly\">$0</span></div><div style=\"text-align:center;padding:10px 0\"><p style=\"font-size:24px;font-weight:700;color:var(--gn)\" id=\"pcNB\">$0</p><p style=\"font-size:11px;color:var(--dg)\" id=\"pcSB\"></p></div></div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg0\">Enter your pay to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think0\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">Your gross pay and net pay are different. Explain why you should always use net pay when planning a budget. What happens if someone budgets with gross?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,0)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">FICA takes money from every paycheck. What two programs does it fund, and what would happen to workers and retirees if FICA did not exist?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,0)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">The U.S. uses progressive taxation. Explain what that means. If someone goes from $40k to $50k, is ALL their income taxed at a higher rate? Why or why not?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,0)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><div></div><button class=\"btn btn-p\" id=\"gate0\" disabled onclick=\"goSec(1)\">Next: Banking</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg0\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 1: BANKING \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s1\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 2: Banking</h2>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">Checking Accounts</p><p>Your everyday money hub. Paycheck lands here via direct deposit. You spend from it with a debit card or bill pay. Pays little to no interest (0.01% typical). The tradeoff: your money is always accessible but not growing.</p></div>\n    <div class=\"sub\"><p class=\"t\">Savings Accounts</p><p>Where you park money you do not need today. Online banks offer 4-5% APY. Traditional banks offer 0.01-0.50%. $1,000 in an online savings earns $40-50/year automatically. Some accounts limit withdrawals to 6/month.</p></div>\n    <div class=\"sub\"><p class=\"t\">FDIC Insurance</p><p>The FDIC insures deposits up to $250,000 per depositor per bank. If your bank fails, the government guarantees your money. Covers checking, savings, CDs, and money market accounts.</p></div>\n    <div class=\"sub\"><p class=\"t\">Banking Fees</p><p><strong>Overdraft ($35 each):</strong> Spending more than your balance. Three in a day = $105. Fix: opt OUT of overdraft protection.</p><p><strong>Monthly maintenance ($5-$15):</strong> $12/month = $144/year. Fix: direct deposit waiver or online bank.</p><p><strong>ATM fees ($3-$5):</strong> Using another bank's ATM. Twice a week = $300-500/year. Fix: use your own bank's ATMs.</p></div>\n    <div class=\"sub\"><p class=\"t\">Simple Interest Formula</p><p><strong>Interest = Principal x Rate x Time</strong></p><p>Example: $2,000 at 4.5% for 1 year = $2,000 x 0.045 x 1 = $90.</p></div>\n  </div>\n\n  <div class=\"block b-do\"><p class=\"bt\">Do It</p>\n    <div class=\"sub\"><p class=\"t\">Problem 1: Simple Interest</p><p>You deposit $500 earning 4.5% APY. Interest in one year?</p><div class=\"fld\"><label>$500 x 0.045 x 1 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"intCalc\" placeholder=\"?\" step=\"0.01\" oninput=\"VN('intCalc',22.5,.1);checkDo(1);checkGate(1)\"></div></div><p class=\"fb\" id=\"fb_intCalc\"></p></div>\n    <div class=\"sub\"><p class=\"t\">Problem 2: Fee Damage</p><p>3 overdrafts ($35 each) + 4 out-of-network ATMs ($5 each). Total?</p><div class=\"fld\"><label>(3 x $35) + (4 x $5) = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"odCalc\" placeholder=\"?\" oninput=\"VN('odCalc',125,1);checkDo(1);checkGate(1)\"></div></div><p class=\"fb\" id=\"fb_odCalc\"></p></div>\n    <div class=\"sub\"><p class=\"t\">Problem 3: Bank Comparison</p><p>Bank A: $12/month maintenance, no ATM fees. Bank B: $0 maintenance, 3 ATM trips/month at $5.</p><div class=\"fld\"><label>Bank A yearly: $12 x 12 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bankA\" placeholder=\"?\" oninput=\"VN('bankA',144,1);checkDo(1);checkGate(1)\"></div></div><p class=\"fb\" id=\"fb_bankA\"></p><div class=\"fld\"><label>Bank B yearly: 3 x $5 x 12 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bankB\" placeholder=\"?\" oninput=\"VN('bankB',180,1);checkDo(1);checkGate(1)\"></div></div><p class=\"fb\" id=\"fb_bankB\"></p></div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg1\">Get all three problems correct to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think1\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">Banking fees can cost hundreds per year. Name two fees you or someone you know has paid and explain exactly how to avoid each one.</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,1)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Explain checking vs savings accounts. When should you use each? Why is it risky to keep all money in one account?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,1)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">What is FDIC insurance and why does it matter? What happens if a bank fails?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,1)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(0)\">Back</button><button class=\"btn btn-p\" id=\"gate1\" disabled onclick=\"goSec(2)\">Next: Insurance</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg1\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 2: INSURANCE \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s2\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 3: Insurance</h2>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">Why Insurance Exists</p><p>Some costs are too large for one person. A car accident: $30,000. A hospital stay: $100,000. Insurance works through <strong>risk pooling</strong>: thousands pay small premiums into a shared pool. Most months, most people do not claim. The pool covers the few who do.</p></div>\n    <div class=\"sub\"><p class=\"t\">Key Terms</p><p><strong>Premium:</strong> Monthly payment whether or not you use it. <strong>Deductible:</strong> You pay first before insurance kicks in. <strong>Copay:</strong> Fixed amount per visit. <strong>Coinsurance:</strong> After deductible, you split costs (you 20%, insurer 80%). <strong>OOP Max:</strong> Most you pay in a year. After this, insurance covers 100%.</p></div>\n    <div class=\"sub\"><p class=\"t\">The Deductible Tradeoff</p><p>Higher deductible = lower premium but more risk. Lower deductible = higher premium but less risk. Choose based on your savings.</p></div>\n  </div>\n\n  <div class=\"block b-apply\"><p class=\"bt\">Apply</p>\n    <div class=\"sub\"><p class=\"t\">Auto Insurance: Pick a Plan</p>\n      <div class=\"scenario\" data-rkey=\"autoChoice\" data-rval=\"planA\" onclick=\"pickScen(this)\"><p class=\"ti\">Plan A: $500 deductible, $180/month</p><p class=\"su\">No accident: $2,160/yr. $3,000 repair: $2,660/yr total.</p></div>\n      <div class=\"scenario\" data-rkey=\"autoChoice\" data-rval=\"planB\" onclick=\"pickScen(this)\"><p class=\"ti\">Plan B: $1,500 deductible, $120/month</p><p class=\"su\">No accident: $1,440/yr. $3,000 repair: $2,940/yr total.</p></div>\n    </div>\n  </div>\n\n  <div class=\"block b-do\"><p class=\"bt\">Do It</p>\n    <div class=\"sub\"><p class=\"t\">Health Insurance Math</p><p>Your plan: $1,500 deductible, 20% coinsurance, $6,000 OOP max. ER bill: $8,000.</p>\n      <div class=\"fld\"><label>Step 1: Deductible = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"h1\" placeholder=\"?\" oninput=\"VN('h1',1500,1);checkDo(2);checkGate(2)\"></div></div><p class=\"fb\" id=\"fb_h1\"></p>\n      <div class=\"fld\"><label>Step 2: Remaining ($8,000 - deductible) = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"h2\" placeholder=\"?\" oninput=\"VN('h2',6500,1);checkDo(2);checkGate(2)\"></div></div><p class=\"fb\" id=\"fb_h2\"></p>\n      <div class=\"fld\"><label>Step 3: Your 20% of remaining = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"h3\" placeholder=\"?\" oninput=\"VN('h3',1300,1);checkDo(2);checkGate(2)\"></div></div><p class=\"fb\" id=\"fb_h3\"></p>\n      <div class=\"fld\"><label>Step 4: Total out-of-pocket = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"h4\" placeholder=\"?\" data-display=\"healthCalc\" oninput=\"VN('h4',2800,1);checkDo(2);checkGate(2)\"></div></div><p class=\"fb\" id=\"fb_h4\"></p>\n    </div>\n    <div class=\"sub\"><p class=\"t\">Breakeven</p><p>Plan B saves $60/month. Deductible is $1,000 higher. How many months to break even?</p><p style=\"font-size:11px;color:var(--dg)\">$1,000 / $60 = ? (round up)</p><div class=\"fld\"><label>Months = ____</label><input type=\"number\" data-key=\"brkEven\" placeholder=\"?\" oninput=\"VN('brkEven',17,1);checkDo(2);checkGate(2)\"></div><p class=\"fb\" id=\"fb_brkEven\"></p></div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg2\">Complete all calculations and pick a plan to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think2\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">Explain risk pooling in your own words. Why does an insurance company not go bankrupt paying claims?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,2)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">You chose an auto plan and calculated the breakeven. Explain your choice. What would need to be true about your finances for the other plan to be smarter?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,2)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Why is the out-of-pocket maximum the most important number in a health plan?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,2)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(1)\">Back</button><button class=\"btn btn-p\" id=\"gate2\" disabled onclick=\"goSec(3)\">Next: Credit</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg2\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 3: CREDIT \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s3\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 4: Credit Cards</h2>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">How Credit Cards Work</p><p>Pay the <strong>full balance</strong> by due date = zero interest (grace period). Carry a balance = interest at <strong>APR</strong> (20-30% typical).</p></div>\n    <div class=\"sub\"><p class=\"t\">The Minimum Payment Trap</p><p>Minimum (about 2% or $25) is set low on purpose. Most goes to interest, not balance. $2,000 at 25% APR takes 10+ years at minimums.</p></div>\n    <div class=\"sub\"><p class=\"t\">Credit Score (300-850)</p><p><strong>1. Payment history (35%):</strong> Pay on time.</p><p><strong>2. Utilization (30%):</strong> Keep under 30% of limit.</p><p><strong>3. Length (15%):</strong> Longer = better.</p><p><strong>4. Mix (10%):</strong> Different types help.</p><p><strong>5. Inquiries (10%):</strong> Many apps = risky.</p></div>\n  </div>\n\n  <div class=\"block b-apply\"><p class=\"bt\">Apply</p>\n    <div class=\"sub\"><p class=\"t\">Payoff Calculator</p>\n      <div class=\"fld\"><label>Balance</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"ccBal\" placeholder=\"2000\" oninput=\"calcCC()\"></div></div>\n      <div class=\"fld\"><label>APR (%)</label><div class=\"fld-row\"><span class=\"fld-pfx\">%</span><input type=\"number\" data-key=\"ccAPR\" value=\"24.99\" step=\"0.01\" oninput=\"calcCC()\"></div></div>\n    </div>\n    <div class=\"sub\" id=\"ccR\" style=\"display:none\"><p class=\"t\" style=\"color:var(--rd)\">Results</p>\n      <div class=\"pf-card\" style=\"background:#FFEBEE\"><p class=\"ti\" style=\"color:var(--rd)\" id=\"ccML\"></p><div class=\"pf-grid\"><span>Time:</span><span class=\"r\" id=\"ccMT\"></span><span>Total:</span><span class=\"r\" style=\"color:var(--rd)\" id=\"ccMO\"></span><span>Interest:</span><span class=\"r\" style=\"color:var(--rd)\" id=\"ccMI\"></span></div></div>\n      <div class=\"pf-card\" style=\"background:var(--ol)\"><p class=\"ti\" style=\"color:var(--or)\" id=\"ccEL\"></p><div class=\"pf-grid\"><span>Time:</span><span class=\"r\" id=\"ccET\"></span><span>Total:</span><span class=\"r\" id=\"ccEO\"></span><span>Saved:</span><span class=\"r\" style=\"color:var(--gn)\" id=\"ccES\"></span></div></div>\n      <div class=\"pf-card\" style=\"background:#E8F5E9\"><p class=\"ti\" style=\"color:var(--gn)\" id=\"ccAL\"></p><div class=\"pf-grid\"><span>Time:</span><span class=\"r\" id=\"ccAT\"></span><span>Total:</span><span class=\"r\" id=\"ccAO\"></span><span>Saved:</span><span class=\"r\" style=\"color:var(--gn)\" id=\"ccAS\"></span></div></div>\n      <p id=\"ccSL\" style=\"margin-top:8px;padding:8px;border-radius:6px;background:#f5f5f5;text-align:center;font-size:12px\"></p>\n    </div>\n  </div>\n\n  <div class=\"block b-do\"><p class=\"bt\">Do It</p>\n    <div class=\"sub\"><p class=\"t\">See the Trap</p><p>You owe $1,000 at 24% APR. Minimum = $25.</p>\n      <div class=\"fld\"><label>Monthly interest: $1,000 x 0.24 / 12 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"ccInt1\" placeholder=\"?\" oninput=\"VN('ccInt1',20,1);checkDo(3);checkGate(3)\"></div></div><p class=\"fb\" id=\"fb_ccInt1\"></p>\n      <div class=\"fld\"><label>Toward balance: $25 - interest = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"ccPrin1\" placeholder=\"?\" oninput=\"VN('ccPrin1',5,.5);checkDo(3);checkGate(3)\"></div></div><p class=\"fb\" id=\"fb_ccPrin1\"></p>\n      <p style=\"font-size:12px;color:var(--dg);margin-top:8px\">Only $5 of your $25 reduces the debt. The rest is profit for the card company.</p>\n    </div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg3\">Complete the calculations to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think3\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">You calculated that only $5 of a $25 payment goes to your balance. Explain why minimum payments keep people in debt for years.</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,3)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">List the five credit score factors in order. Which two make up 65%, and what actions improve them?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,3)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">What is the grace period, and how does it let you avoid interest? Why do most people end up paying interest anyway?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,3)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(2)\">Back</button><button class=\"btn btn-p\" id=\"gate3\" disabled onclick=\"goSec(4)\">Next: Loans</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg3\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 4: LOANS \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s4\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 5: Loans and Debt</h2>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">Loan Terms</p><p><strong>Principal:</strong> Amount borrowed. <strong>APR:</strong> Annual cost. <strong>Term:</strong> Repayment length. Longer term = lower payment but more total interest. The car costs the same either way.</p></div>\n    <div class=\"sub\"><p class=\"t\">Avalanche vs Snowball</p><p><strong>Avalanche:</strong> Extra to highest APR first. Saves the most. <strong>Snowball:</strong> Extra to smallest balance first. Faster wins. Both work.</p></div>\n    <div class=\"sub\"><p class=\"t\">Identity Theft</p><p>Check your credit report yearly (annualcreditreport.com). Freeze credit at all three bureaus (free). Use unique passwords + two-factor auth. Never share SSN unless required.</p></div>\n  </div>\n\n  <div class=\"block b-apply\"><p class=\"bt\">Apply</p>\n    <div class=\"sub\"><p class=\"t\">Auto Loan Comparison</p>\n      <div class=\"fld\"><label>Car price</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"carPrice\" value=\"18000\" oninput=\"calcLN()\"></div></div>\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px\">\n        <div style=\"padding:10px;border-radius:8px;background:var(--tl)\"><p style=\"font-size:12px;font-weight:700;color:var(--teal);margin-bottom:6px\">Loan A: 48mo</p><div class=\"fld\"><label>APR</label><input type=\"number\" data-key=\"lnA\" value=\"6.5\" step=\"0.1\" oninput=\"calcLN()\"></div><p style=\"font-size:12px\">Pmt: <strong id=\"lA\">$0</strong></p><p style=\"font-size:12px\">Total: <strong id=\"lAT\">$0</strong></p><p style=\"font-size:12px\">Interest: <strong id=\"lAI\" style=\"color:var(--rd)\">$0</strong></p></div>\n        <div style=\"padding:10px;border-radius:8px;background:var(--ol)\"><p style=\"font-size:12px;font-weight:700;color:var(--or);margin-bottom:6px\">Loan B: 72mo</p><div class=\"fld\"><label>APR</label><input type=\"number\" data-key=\"lnB\" value=\"8.0\" step=\"0.1\" oninput=\"calcLN()\"></div><p style=\"font-size:12px\">Pmt: <strong id=\"lB\">$0</strong></p><p style=\"font-size:12px\">Total: <strong id=\"lBT\">$0</strong></p><p style=\"font-size:12px\">Interest: <strong id=\"lBI\" style=\"color:var(--rd)\">$0</strong></p></div>\n      </div>\n      <p style=\"font-size:11px;color:var(--dg);margin-top:8px\" id=\"lnD\"></p>\n    </div>\n  </div>\n\n  <div class=\"block b-do\"><p class=\"bt\">Do It</p>\n    <div class=\"sub\"><p class=\"t\">Check the Calculator</p><p>Loan A: $427/month for 48 months.</p>\n      <div class=\"fld\"><label>Total: $427 x 48 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"lnTotal\" placeholder=\"?\" oninput=\"VN('lnTotal',20496,50);checkDo(4);checkGate(4)\"></div></div><p class=\"fb\" id=\"fb_lnTotal\"></p>\n      <div class=\"fld\"><label>Interest: total - $18,000 = $____</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"lnInt\" placeholder=\"?\" oninput=\"VN('lnInt',2496,50);checkDo(4);checkGate(4)\"></div></div><p class=\"fb\" id=\"fb_lnInt\"></p>\n    </div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg4\">Complete the calculations to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think4\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">Why might someone choose the shorter, higher-payment loan? What is the real cost of affordable monthly payments?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,4)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Three debts: Card A ($800, 28% APR), Card B ($3,200, 19%), Card C ($400, 22%). $100 extra/month. Which card under avalanche? Snowball? Explain both.</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,4)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Name two things you can do now to protect against identity theft. Explain how each works.</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,4)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(3)\">Back</button><button class=\"btn btn-p\" id=\"gate4\" disabled onclick=\"goSec(5)\">Next: Budget</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg4\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 5: BUDGET \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s5\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 6: Your Budget</h2>\n  <p style=\"font-size:13px;color:var(--dg);margin-bottom:12px\">Take-home: <strong style=\"color:var(--gn)\" id=\"bgNet\">$0/mo</strong></p>\n\n  <div class=\"block b-learn\"><p class=\"bt\">Learn</p>\n    <div class=\"sub\"><p class=\"t\">The 50/30/20 Rule</p><p><strong>50% needs</strong> (rent, groceries, insurance, transport, minimum debt). <strong>30% wants</strong> (eating out, subs, entertainment). <strong>20% savings + extra debt payoff</strong>.</p></div>\n    <div class=\"sub\"><p class=\"t\">Needs vs Wants</p><p>Needs cannot be eliminated without serious consequences. Wants are everything else. A phone is a need; a $60 unlimited plan might be a want if $25 prepaid works.</p></div>\n    <div class=\"sub\"><p class=\"t\">When It Does Not Balance</p><p>Cut wants first. Then reduce needs. Last resort: more income. An unbalanced budget is information, not failure.</p></div>\n  </div>\n\n  <div class=\"block b-apply\"><p class=\"bt\">Apply</p>\n    <div class=\"sub\"><p class=\"t\">Needs</p>\n      <div class=\"fld\"><label>Rent/Housing</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bRent\" placeholder=\"1200\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Transportation</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bTrans\" placeholder=\"300\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Groceries</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bGroc\" placeholder=\"350\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Phone</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bPhone\" placeholder=\"60\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Insurance</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bIns\" placeholder=\"150\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Min debt payments</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bDebt\" placeholder=\"0\" oninput=\"calcBG()\"></div></div>\n    </div>\n    <div class=\"sub\"><p class=\"t\" style=\"color:var(--or)\">Wants</p>\n      <div class=\"fld\"><label>Eating out/delivery</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bEat\" placeholder=\"150\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Subscriptions</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bSubs\" placeholder=\"50\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Entertainment</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bEnt\" placeholder=\"75\" oninput=\"calcBG()\"></div></div>\n      <div class=\"fld\"><label>Other</label><div class=\"fld-row\"><span class=\"fld-pfx\">$</span><input type=\"number\" data-key=\"bOther\" placeholder=\"50\" oninput=\"calcBG()\"></div></div>\n    </div>\n    <div class=\"sub\" id=\"bgR\" style=\"display:none\"><p class=\"t\">Breakdown</p>\n      <div class=\"stats-3\"><div class=\"st\" style=\"background:var(--tl)\"><p class=\"sl2\">Needs</p><p class=\"sv\" style=\"color:var(--teal)\" id=\"bgN\">$0</p><p class=\"ss\" id=\"bgNP\"></p></div><div class=\"st\" style=\"background:var(--ol)\"><p class=\"sl2\">Wants</p><p class=\"sv\" style=\"color:var(--or)\" id=\"bgW\">$0</p><p class=\"ss\" id=\"bgWP\"></p></div><div class=\"st\" id=\"bgRC\"><p class=\"sl2\">Left</p><p class=\"sv\" id=\"bgRM\">$0</p><p class=\"ss\" id=\"bgRS\"></p></div></div>\n      <div id=\"bgBR\"></div>\n      <div id=\"bgOV\" class=\"warn\" style=\"display:none\"></div>\n      <div style=\"padding:10px;border-radius:6px;background:#f5f5f5;font-size:12px;margin-top:8px\"><p style=\"font-weight:700;margin-bottom:3px\">50/30/20:</p><p class=\"chk-row\" id=\"bgC1\"></p><p class=\"chk-row\" id=\"bgC2\"></p><p class=\"chk-row\" id=\"bgC3\"></p></div>\n    </div>\n  </div>\n\n  <div class=\"block b-do\"><p class=\"bt\">Do It</p>\n    <div class=\"sub\"><p class=\"t\">Need or Want?</p><p style=\"margin-bottom:8px\">Classify each expense.</p>\n      <div class=\"nw-row\"><span class=\"nw-label\">Rent</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_rent\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_rent\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Netflix</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_netflix\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_netflix\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Gas for commute</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_gas\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_gas\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Concert tickets</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_concert\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_concert\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Groceries</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_groceries\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_groceries\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Gym membership</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_gym\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_gym\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Electric bill</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_electric\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_electric\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Daily coffee shop</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_coffee\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_coffee\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Car insurance</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_insurance\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_insurance\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n      <div class=\"nw-row\"><span class=\"nw-label\">Salon haircut</span><div class=\"radio-g\"><div class=\"rbtn\" data-rkey=\"nw_haircut\" data-rval=\"need\" onclick=\"setRadio(this);checkNWfb()\">Need</div><div class=\"rbtn\" data-rkey=\"nw_haircut\" data-rval=\"want\" onclick=\"setRadio(this);checkNWfb()\">Want</div></div></div>\n    </div>\n  </div>\n\n  <p class=\"lock-msg\" id=\"lockMsg5\">Enter budget and classify all items correctly to unlock Think About It.</p>\n  <div class=\"locked\" id=\"think5\"><div class=\"block b-think\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">If you had to cut $200/month, what would you cut and why? What is the tradeoff?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,5)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">What is an emergency fund? How many months should it cover? Based on your budget, what would 3 months be?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,5)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Name one budgeting strategy besides 50/30/20 (zero-based, envelope, pay-yourself-first). How does it work? Why prefer it?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,5)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(4)\">Back</button><button class=\"btn btn-p\" id=\"gate5\" disabled onclick=\"goSec(6)\">Next: Reflection</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg5\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SECTION 6: REFLECTION \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"s6\">\n  <h2 style=\"font-size:18px;font-weight:700;margin-bottom:12px\">Section 7: Final Reflection</h2>\n\n  <div class=\"block b-think\" id=\"think6\"><p class=\"bt\">Think About It</p><div class=\"sub\">\n    <div class=\"kc-q\"><label class=\"ql\">Across all six sections, what was the most surprising thing you learned about your financial situation? Why?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,6)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">Name one specific financial decision you will make differently. Be concrete: I will [action] because [reason from your calculations].</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,6)\"></textarea><p class=\"wc\">0/30 words</p></div>\n    <div class=\"kc-q\"><label class=\"ql\">One piece of financial advice for someone starting their first job, based on what you learned here?</label><textarea rows=\"4\" placeholder=\"Write at least 30 words...\" oninput=\"onTA(this,6)\"></textarea><p class=\"wc\">0/30 words</p></div>\n  </div></div>\n\n  <div class=\"nav\"><button class=\"btn btn-s\" onclick=\"goSec(5)\">Back</button><button class=\"btn btn-p\" id=\"gate6\" disabled onclick=\"goSec(7)\" style=\"background:var(--gn);border-color:var(--gn)\">Review and Submit</button></div>\n  <p class=\"gate-msg\" id=\"gateMsg6\"></p><p class=\"save-ind\"></p>\n</div>\n\n\n<!-- \u2550\u2550\u2550 SUMMARY (dynamic) \u2550\u2550\u2550 -->\n<div class=\"sec\" id=\"sSummary\">\n  <div id=\"sumContent\"></div>\n</div>\n\n</div>\n<div class=\"footer no-print\">Money Reality Check - The Excel Center - <a href=\"#\" id=\"dashLink\" style=\"color:#ccc\">Dashboard</a></div>\n\n\n";

/* ── src/student/app.js ── */
/* ═══ STATE ═══ */
var USER_EMAIL = '', SEC = 0, DATA = {}, MW = 30;
var SNAMES = ['Paycheck','Banking','Insurance','Credit','Loans','Budget','Reflect'];
var TOTAL = SNAMES.length;

/* ═══ HELPERS ═══ */
function $(id) { return document.getElementById(id); }
function fmt(n) { return '$' + Math.round(n || 0).toLocaleString(); }
function fmtD(n) { return '$' + (n || 0).toFixed(2); }
function pct(n) { return Math.round(n || 0) + '%'; }
function wc(s) { return s.trim() === '' ? 0 : s.trim().split(/\s+/).length; }

function fedTax(inc) {
  var br = [[11600,.1],[47150,.12],[100525,.22],[191950,.24],[243725,.32],[609350,.35],[Infinity,.37]];
  var tx = Math.max(0, inc - 15000), t = 0, p = 0;
  for (var i = 0; i < br.length; i++) {
    var ch = Math.min(tx, br[i][0]) - p;
    if (ch <= 0) break;
    t += ch * br[i][1];
    p = br[i][0];
  }
  return t;
}

function creditCalc(b, a, p) {
  if (b <= 0 || p <= 0) return { mo: 0, tot: 0, int: 0 };
  var mr = a / 100 / 12;
  if (p <= b * mr) return { mo: Infinity, tot: Infinity, int: Infinity };
  var r = b, m = 0, t = 0;
  while (r > 0.01 && m < 600) { r -= (p - r * mr); t += p; m++; }
  return { mo: m, tot: t, int: t - b };
}

function fmtMo(m) {
  if (m === Infinity) return 'Never';
  var y = Math.floor(m / 12), mo = m % 12;
  return y ? y + 'yr ' + mo + 'mo' : mo + 'mo';
}

/* Escape text before it goes into innerHTML (students' answers can contain < and &). */
function escH(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* ═══ INIT ═══
   The server puts the student's saved work into the page (window.MRC_BOOT), so
   there is no load-time round trip. start.js calls MRC_start() after every module
   (save, links, Claim/Evidence/Reasoning) has hooked in. */
function MRC_start() {
  var b = window.MRC_BOOT || {};
  var d = $('dashLink'); if (d && b.appUrl) d.href = b.appUrl;
  if (b.error || !b.user) {
    $('loadErr').textContent = b.error || 'Could not load your work. Refresh the page.';
    $('loadErr').style.display = 'block';
    var sp = document.querySelector('#loadScreen .spinner'); if (sp) sp.style.display = 'none';
    return;
  }
  var r = b.user;
  USER_EMAIL = r.email;
  if (r.status === 'submitted') {
    $('loadScreen').style.display = 'none';
    $('secDone').classList.add('on');
    $('doneEmail').textContent = r.email;
    return;
  }
  DATA = r.progress || {};
  SEC = r.currentSection || 0;
  if (r.returned) showReturned(r.returned);
  startApp();
}

/* A teacher sent this back for rework: show their note above everything. */
function showReturned(note) {
  var main = $('main');
  if (!main || $('returnedNote')) return;
  var el = document.createElement('div');
  el.id = 'returnedNote';
  el.className = 'returned no-print';
  var h = document.createElement('p');
  h.className = 'returned-h';
  h.textContent = 'Your teacher sent this back for rework';
  var n = document.createElement('p');
  n.className = 'returned-n';
  n.textContent = note;
  var f = document.createElement('p');
  f.className = 'returned-f';
  f.textContent = 'Use the tabs at the top to go back to any section. Fix what the note asks for, then submit again from the last page.';
  el.appendChild(h); el.appendChild(n); el.appendChild(f);
  main.insertBefore(el, main.firstChild);
}

/* ═══ APP STARTUP ═══ */
function startApp() {
  $('loadScreen').style.display = 'none';
  $('stickyHdr').style.display = 'block';
  // Sections are already in the HTML — just show the right one
  goSec(SEC);
}

/* ═══ NAVIGATION ═══ */
function goSec(n) {
  collectData(SEC);
  SEC = n;
  // Hide all sections
  var all = document.querySelectorAll('.sec');
  for (var i = 0; i < all.length; i++) all[i].classList.remove('on');
  // Show target
  var target = n >= TOTAL ? 'sSummary' : 's' + n;
  var el = $(target);
  if (el) el.classList.add('on');
  if (n >= TOTAL) buildSum();
  updateHdr();
  restoreSec(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  autoSave();
}

function updateHdr() {
  var n = Math.min(SEC, TOTAL);
  $('hBadge').textContent = SEC < TOTAL ? (SEC + 1) + '/' + TOTAL : 'Done';
  $('hProg').style.width = (n / TOTAL * 100) + '%';
  var t = '';
  for (var i = 0; i < TOTAL; i++) {
    var c = i === SEC ? 'tab on' : i < SEC ? 'tab done' : 'tab';
    var cl = i < SEC ? ' onclick="goSec(' + i + ')"' : '';
    t += '<div class="' + c + '"' + cl + '>' + SNAMES[i] + '</div>';
  }
  $('hTabs').innerHTML = t;
}

/* ═══ SAVE / LOAD ═══ */
// Saving is done by savesync.js, which replaces this function when it loads.
function autoSave() {}

function showSaved() {
  var el = document.querySelector('.save-ind');
  if (el) { el.textContent = 'Saved'; setTimeout(function() { el.textContent = ''; }, 2000); }
}

function collectData(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var keys = ['paycheck','banking','insurance','credit','loans','budget','reflection'];
  var key = keys[sec];
  if (!key) return;
  if (!DATA[key]) DATA[key] = {};

  // Named inputs
  var inputs = el.querySelectorAll('[data-key]');
  for (var i = 0; i < inputs.length; i++) DATA[key][inputs[i].dataset.key] = inputs[i].value;

  // Radio selections
  var rb = el.querySelectorAll('.rbtn.sel[data-rkey]');
  for (var i = 0; i < rb.length; i++) DATA[key][rb[i].dataset.rkey] = rb[i].dataset.rval;

  // Scenario selections
  var sc = el.querySelectorAll('.scenario.sel[data-rkey]');
  for (var i = 0; i < sc.length; i++) DATA[key][sc[i].dataset.rkey] = sc[i].dataset.rval;

  // Knowledge check answers
  var answers = [];
  var kc = el.querySelectorAll('.kc-q');
  for (var i = 0; i < kc.length; i++) {
    var q = kc[i].querySelector('.ql');
    var a = kc[i].querySelector('textarea');
    answers.push({ q: q ? q.textContent : '', a: a ? a.value : '' });
  }
  DATA[key].answers = answers;

  // Display values
  var di = el.querySelectorAll('[data-display]');
  for (var i = 0; i < di.length; i++) DATA[key][di[i].dataset.display] = di[i].textContent;
}

function restoreSec(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var keys = ['paycheck','banking','insurance','credit','loans','budget','reflection'];
  var key = keys[sec];
  if (!key || !DATA[key]) { checkDo(sec); checkGate(sec); return; }
  var d = DATA[key];

  // Restore inputs
  var inputs = el.querySelectorAll('[data-key]');
  for (var i = 0; i < inputs.length; i++) {
    if (d[inputs[i].dataset.key] !== undefined) inputs[i].value = d[inputs[i].dataset.key];
  }

  // Restore radios
  var rb = el.querySelectorAll('.rbtn[data-rkey]');
  for (var i = 0; i < rb.length; i++) {
    if (d[rb[i].dataset.rkey] === rb[i].dataset.rval) rb[i].classList.add('sel');
    else rb[i].classList.remove('sel');
  }

  // Restore scenarios
  var sc = el.querySelectorAll('.scenario[data-rkey]');
  for (var i = 0; i < sc.length; i++) {
    if (d[sc[i].dataset.rkey] === sc[i].dataset.rval) sc[i].classList.add('sel');
    else sc[i].classList.remove('sel');
  }

  // Restore textarea answers
  if (d.answers) {
    var ta = el.querySelectorAll('.kc-q textarea');
    for (var i = 0; i < d.answers.length; i++) {
      if (ta[i]) ta[i].value = d.answers[i].a || '';
    }
  }

  // Re-run calculators and checks
  if (sec === 0) calcPC();
  if (sec === 3) calcCC();
  if (sec === 4) calcLN();
  if (sec === 5) calcBG();
  updateWCs(sec);
  checkDo(sec);
  checkGate(sec);
}

/* ═══ UI UTILITIES ═══ */
function setRadio(btn) {
  var sibs = btn.parentElement.querySelectorAll('.rbtn');
  for (var i = 0; i < sibs.length; i++) sibs[i].classList.remove('sel');
  btn.classList.add('sel');
  if (btn.dataset.rkey === 'payType') {
    if ($('pHourly')) $('pHourly').style.display = btn.dataset.rval === 'hourly' ? 'block' : 'none';
    if ($('pSalary')) $('pSalary').style.display = btn.dataset.rval === 'salary' ? 'block' : 'none';
    calcPC();
  }
  checkDo(SEC); checkGate(SEC);
}

function pickScen(el) {
  var sibs = el.parentElement.querySelectorAll('.scenario');
  for (var i = 0; i < sibs.length; i++) sibs[i].classList.remove('sel');
  el.classList.add('sel');
  checkDo(SEC); checkGate(SEC);
}

/* ═══ VALIDATION ═══ */
function VN(id, correct, tol) {
  var el = document.querySelector('[data-key="' + id + '"]');
  var fb = $('fb_' + id);
  if (!el) return false;
  var v = parseFloat(el.value) || 0;
  if (!fb) return Math.abs(v - correct) <= (tol || 0.5);
  if (v === 0) { fb.textContent = ''; fb.className = 'fb'; return false; }
  if (Math.abs(v - correct) <= (tol || 0.5)) {
    fb.textContent = 'Correct!'; fb.className = 'fb ok'; return true;
  }
  fb.textContent = 'Not quite. Try again.'; fb.className = 'fb no'; return false;
}

/* ═══ WORD COUNTS ═══ */
function updateWC(ta) {
  var c = ta.nextElementSibling;
  if (!c || !c.classList.contains('wc')) return;
  var w = wc(ta.value);
  c.textContent = w + '/' + MW + ' words';
  if (w >= MW) c.classList.add('met'); else c.classList.remove('met');
}

function updateWCs(sec) {
  var el = $('s' + sec);
  if (!el) return;
  var ta = el.querySelectorAll('.kc-q textarea');
  for (var i = 0; i < ta.length; i++) updateWC(ta[i]);
}

function onTA(ta, sec) { updateWC(ta); checkGate(sec); }

/* ═══ DO IT GATE (unlocks Think About It) ═══ */
function checkDo(sec) {
  var th = $('think' + sec);
  var lm = $('lockMsg' + sec);
  if (!th) return;

  var ok = false;
  if (sec === 0) ok = (window._net || 0) > 0;
  if (sec === 1) ok = VN('intCalc',22.5,.1) && VN('odCalc',125,1) && VN('bankA',144,1) && VN('bankB',180,1);
  if (sec === 2) {
    ok = VN('h1',1500,1) && VN('h2',6500,1) && VN('h3',1300,1) && VN('h4',2800,1) && VN('brkEven',17,1);
    var el = $('s2');
    if (el && !el.querySelector('.scenario.sel')) ok = false;
  }
  if (sec === 3) ok = VN('ccInt1',20,1) && VN('ccPrin1',5,.5);
  if (sec === 4) ok = VN('lnTotal',20496,50) && VN('lnInt',2496,50);
  if (sec === 5) ok = (window._total || 0) > 0 && checkNW();
  if (sec === 6) ok = true;

  if (ok) { th.classList.remove('locked'); if (lm) lm.style.display = 'none'; }
  else { th.classList.add('locked'); if (lm) lm.style.display = 'block'; }
}

/* ═══ NEXT GATE (unlocks Next button) ═══ */
function checkGate(sec) {
  checkDo(sec);
  var btn = $('gate' + sec);
  if (!btn) return;
  var el = $('s' + sec);
  if (!el) { btn.disabled = true; return; }

  var ta = el.querySelectorAll('.kc-q textarea');
  var allW = true;
  for (var i = 0; i < ta.length; i++) { if (wc(ta[i].value) < MW) allW = false; }

  var th = $('think' + sec);
  var doOk = !th || !th.classList.contains('locked');

  btn.disabled = !(allW && doOk);
  var m = $('gateMsg' + sec);
  if (m) {
    if (!doOk) m.textContent = 'Complete Do It first.';
    else if (!allW) m.textContent = 'Each response needs ' + MW + '+ words.';
    else m.textContent = '';
  }
}

/* ═══ NEEDS vs WANTS CHECKER ═══ */
function checkNW() {
  var el = $('s5');
  if (!el) return false;
  var correct = {
    nw_rent:'need', nw_netflix:'want', nw_gas:'need', nw_concert:'want',
    nw_groceries:'need', nw_gym:'want', nw_electric:'need', nw_coffee:'want',
    nw_insurance:'need', nw_haircut:'want'
  };
  var allRight = true;
  for (var k in correct) {
    var sel = el.querySelector('.rbtn.sel[data-rkey="' + k + '"]');
    if (!sel || sel.dataset.rval !== correct[k]) allRight = false;
  }
  return allRight;
}

function checkNWfb() {
  var el = $('s5');
  if (!el) return;
  var correct = {
    nw_rent:'need', nw_netflix:'want', nw_gas:'need', nw_concert:'want',
    nw_groceries:'need', nw_gym:'want', nw_electric:'need', nw_coffee:'want',
    nw_insurance:'need', nw_haircut:'want'
  };
  for (var k in correct) {
    var btns = el.querySelectorAll('.rbtn[data-rkey="' + k + '"]');
    var sel = el.querySelector('.rbtn.sel[data-rkey="' + k + '"]');
    for (var i = 0; i < btns.length; i++) {
      if (sel && sel.dataset.rval === correct[k])
        btns[i].style.borderColor = btns[i].classList.contains('sel') ? 'var(--gn)' : '#ddd';
      else if (sel)
        btns[i].style.borderColor = btns[i].classList.contains('sel') ? 'var(--rd)' : '#ddd';
      else
        btns[i].style.borderColor = '#ddd';
    }
  }
  checkDo(5); checkGate(5);
}

/* ═══ CALCULATORS ═══ */

// Section 0: Paycheck
function calcPC() {
  var el = $('s0');
  if (!el) return;
  var ptBtn = el.querySelector('.rbtn.sel[data-rkey="payType"]');
  var pt = ptBtn ? ptBtn.dataset.rval : 'hourly';
  if ($('pHourly')) $('pHourly').style.display = pt === 'hourly' ? 'block' : 'none';
  if ($('pSalary')) $('pSalary').style.display = pt === 'salary' ? 'block' : 'none';

  var w = parseFloat((el.querySelector('[data-key="wage"]') || {}).value) || 0;
  var h = parseFloat((el.querySelector('[data-key="hours"]') || {}).value) || 0;
  var s = parseFloat((el.querySelector('[data-key="salary"]') || {}).value) || 0;
  var ga = pt === 'hourly' ? w * h * 52 : s;

  if (ga <= 0) { $('pcR').style.display = 'none'; checkDo(0); checkGate(0); return; }

  var gm = ga / 12, fd = fedTax(ga) / 12, st = ga * 0.025 / 12, fc = ga * 0.0765 / 12;
  var net = gm - fd - st - fc;
  $('pcR').style.display = 'block';
  $('pcG').textContent = fmt(gm);
  $('pcF').textContent = '-' + fmt(fd);
  $('pcS').textContent = '-' + fmt(st);
  $('pcC').textContent = '-' + fmt(fc);
  $('pcN').textContent = fmt(net);
  $('pcNB').textContent = fmt(net) + '/mo';
  $('pcSB').textContent = fmt(gm) + ' gross - ' + fmt(gm - net) + ' deductions';
  window._net = net;
  window._gross = gm;
  checkDo(0); checkGate(0);
}

// Section 3: Credit Card
function calcCC() {
  var el = $('s3');
  if (!el) return;
  var b = parseFloat((el.querySelector('[data-key="ccBal"]') || {}).value) || 0;
  var a = parseFloat((el.querySelector('[data-key="ccAPR"]') || {}).value) || 0;
  if (b <= 0) { $('ccR').style.display = 'none'; checkDo(3); checkGate(3); return; }

  $('ccR').style.display = 'block';
  var mp = Math.max(25, b * 0.02);
  var mn = creditCalc(b, a, mp), ex = creditCalc(b, a, mp + 50), ag = creditCalc(b, a, mp + 150);

  $('ccML').textContent = 'Min (' + fmtD(mp) + '/mo)';
  $('ccMT').textContent = fmtMo(mn.mo);
  $('ccMO').textContent = mn.tot === Infinity ? 'Never' : fmt(mn.tot);
  $('ccMI').textContent = mn.int === Infinity ? 'Never' : fmt(mn.int);
  $('ccEL').textContent = fmtD(mp + 50) + '/mo (+$50)';
  $('ccET').textContent = fmtMo(ex.mo);
  $('ccEO').textContent = fmt(ex.tot);
  $('ccES').textContent = (mn.int === Infinity ? 'All' : fmt(mn.int - ex.int)) + ' saved';
  $('ccAL').textContent = fmtD(mp + 150) + '/mo (+$150)';
  $('ccAT').textContent = fmtMo(ag.mo);
  $('ccAO').textContent = fmt(ag.tot);
  $('ccAS').textContent = (mn.int === Infinity ? 'All' : fmt(mn.int - ag.int)) + ' saved';

  if (mn.int !== Infinity)
    $('ccSL').innerHTML = 'Your ' + fmt(b) + ' costs <strong style="color:var(--rd)">' + fmt(mn.tot) + '</strong> at minimums.';
  else
    $('ccSL').innerHTML = '<strong style="color:var(--rd)">Minimums do not cover interest.</strong>';

  checkDo(3); checkGate(3);
}

// Section 4: Loans
function calcLN() {
  var el = $('s4');
  if (!el) return;
  var p = parseFloat((el.querySelector('[data-key="carPrice"]') || {}).value) || 0;
  var rA = (parseFloat((el.querySelector('[data-key="lnA"]') || {}).value) || 0) / 100 / 12;
  var rB = (parseFloat((el.querySelector('[data-key="lnB"]') || {}).value) || 0) / 100 / 12;
  if (p <= 0) return;

  var pmtA = rA > 0 ? p * rA / (1 - Math.pow(1 + rA, -48)) : p / 48;
  var pmtB = rB > 0 ? p * rB / (1 - Math.pow(1 + rB, -72)) : p / 72;

  $('lA').textContent = fmt(pmtA) + '/mo';
  $('lAT').textContent = fmt(pmtA * 48);
  $('lAI').textContent = fmt(pmtA * 48 - p);
  $('lB').textContent = fmt(pmtB) + '/mo';
  $('lBT').textContent = fmt(pmtB * 72);
  $('lBI').textContent = fmt(pmtB * 72 - p);
  $('lnD').textContent = 'Loan B is ' + fmt(pmtA - pmtB) + '/mo less but costs ' + fmt((pmtB*72-p) - (pmtA*48-p)) + ' more interest.';
  checkGate(4);
}

// Section 5: Budget
function calcBG() {
  var el = $('s5');
  if (!el) return;
  function gv(k) { var i = el.querySelector('[data-key="' + k + '"]'); return parseFloat(i ? i.value : 0) || 0; }

  var needs = gv('bRent') + gv('bTrans') + gv('bGroc') + gv('bPhone') + gv('bIns') + gv('bDebt');
  var wants = gv('bEat') + gv('bSubs') + gv('bEnt') + gv('bOther');
  var total = needs + wants;

  if (total <= 0) { $('bgR').style.display = 'none'; checkDo(5); checkGate(5); return; }
  $('bgR').style.display = 'block';

  var net = window._net || 1;
  $('bgNet').textContent = fmt(net) + '/mo';
  var rem = net - total;

  $('bgN').textContent = fmt(needs);
  $('bgNP').textContent = pct(needs / net * 100);
  $('bgNP').style.color = needs / net > 0.5 ? 'var(--rd)' : 'var(--gn)';
  $('bgW').textContent = fmt(wants);
  $('bgWP').textContent = pct(wants / net * 100);
  $('bgWP').style.color = wants / net > 0.3 ? 'var(--rd)' : 'var(--gn)';
  $('bgRM').textContent = fmt(rem);
  $('bgRM').style.color = rem >= 0 ? 'var(--gn)' : 'var(--rd)';
  $('bgRC').style.background = rem >= 0 ? '#E8F5E9' : '#FFEBEE';
  $('bgRS').textContent = rem >= 0 ? 'savings' : 'over';

  // Bars
  var items = [
    {l:'Housing',v:gv('bRent'),c:'var(--teal)'}, {l:'Transport',v:gv('bTrans'),c:'var(--teal)'},
    {l:'Groceries',v:gv('bGroc'),c:'var(--teal)'}, {l:'Phone',v:gv('bPhone'),c:'var(--teal)'},
    {l:'Insurance',v:gv('bIns'),c:'var(--teal)'}, {l:'Debt',v:gv('bDebt'),c:'var(--teal)'},
    {l:'Eating',v:gv('bEat'),c:'var(--or)'}, {l:'Subs',v:gv('bSubs'),c:'var(--or)'},
    {l:'Fun',v:gv('bEnt'),c:'var(--or)'}, {l:'Other',v:gv('bOther'),c:'var(--or)'}
  ];
  var bh = '';
  for (var i = 0; i < items.length; i++) {
    if (items[i].v > 0) {
      bh += '<div class="bar-row"><span class="bar-lbl">' + items[i].l + '</span><div class="bar-trk"><div class="bar-fill" style="width:' + Math.min(100, items[i].v / net * 100) + '%;background:' + items[i].c + '"><span>' + fmt(items[i].v) + '</span></div></div></div>';
    }
  }
  $('bgBR').innerHTML = bh;

  $('bgOV').style.display = rem < 0 ? 'block' : 'none';
  $('bgOV').innerHTML = '<strong>' + fmt(Math.abs(rem)) + ' over budget.</strong>';

  var np = needs/net*100, wp = wants/net*100, sp = Math.max(0,rem)/net*100;
  $('bgC1').innerHTML = 'Needs: ' + pct(np) + ' ' + (np <= 50 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Over</span>');
  $('bgC2').innerHTML = 'Wants: ' + pct(wp) + ' ' + (wp <= 30 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Over</span>');
  $('bgC3').innerHTML = 'Save: ' + pct(sp) + ' ' + (rem >= 0 && sp >= 20 ? '<span class="chk-ok">OK</span>' : '<span class="chk-no">Under</span>');

  window._needs = needs; window._wants = wants; window._rem = rem; window._total = total;
  checkDo(5); checkGate(5);
}

/* ═══ SUMMARY (only dynamic section) ═══ */
function buildSum() {
  for (var i = 0; i < TOTAL; i++) collectData(i);
  var net = window._net || 0, tot = window._total || 0, rem = window._rem || 0;

  var h = '<div style="text-align:center;margin-bottom:16px">';
  h += '<h2 style="font-size:20px;font-weight:700">Financial Snapshot</h2>';
  h += '<p style="font-size:13px;color:var(--dg)">' + escH(USER_EMAIL) + ' - ' + new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) + '</p>';
  h += '<p style="font-size:11px;color:var(--dg)">Financial Mathematics Test-Out - The Excel Center</p></div>';

  var secs = [
    {k:'paycheck',t:'1. Paycheck'}, {k:'banking',t:'2. Banking'}, {k:'insurance',t:'3. Insurance'},
    {k:'credit',t:'4. Credit'}, {k:'loans',t:'5. Loans'}, {k:'budget',t:'6. Budget'}, {k:'reflection',t:'7. Reflection'}
  ];
  for (var s = 0; s < secs.length; s++) {
    var d = DATA[secs[s].k];
    h += '<div class="sum-card"><p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--teal);margin-bottom:6px">' + secs[s].t + '</p>';
    if (!d || !d.answers || d.answers.length === 0) {
      h += '<p style="font-size:12px;color:#aaa">Not completed</p>';
    } else {
      h += '<div class="sum-qa">';
      for (var a = 0; a < d.answers.length; a++) {
        h += '<p class="q">' + escH(d.answers[a].q || '') + '</p>';
        h += '<p class="a">' + escH(d.answers[a].a || '(none)') + '</p>';
      }
      h += '</div>';
    }
    h += '</div>';
  }

  if (net > 0) {
    h += '<div class="bot-line"><p class="bl">Bottom line</p>';
    h += '<p class="bb">' + fmt(net) + ' in, ' + fmt(tot) + ' out, ' + fmt(rem) + (rem >= 0 ? ' left' : ' short') + '</p>';
    h += '<p class="bs">' + (rem >= 0 ? pct(rem/net*100) + ' for savings' : 'Need ' + fmt(Math.abs(rem)) + '/mo in cuts') + '</p></div>';
  }

  h += '<div style="text-align:center;margin-bottom:14px" class="no-print">';
  h += '<button class="btn-submit" onclick="doSubmit()">Submit for Review</button>';
  h += '<p style="font-size:11px;color:var(--dg);margin-top:6px">Cannot edit after submitting.</p>';
  h += '<br><button class="btn-print" style="margin-top:8px" onclick="window.print()">Print</button></div>';
  h += '<div class="nav no-print"><button class="btn btn-s" onclick="goSec(6)">Back</button><div></div></div>';

  $('sumContent').innerHTML = h;
}

function doSubmit() {
  if (!confirm('Submit? Cannot undo.')) return;
  for (var i = 0; i < TOTAL; i++) collectData(i);
  google.script.run
    .withSuccessHandler(function(r) {
      if (r.submitted) { alert('Submitted!'); location.reload(); }
      else alert(r.error || 'Error');
    })
    .withFailureHandler(function(e) { alert(e.message); })
    .submitWork(JSON.stringify(DATA));
}

;

/* ── src/student/savesync.js ── */
/* ════════════════════════════════════════════════════════════════════
   SaveSyncJS — interim save for Money Reality Check (student view)

   Bundled into student.js after app.js. Server half: mrcSync() in Code.gs.
   The starting revision comes from window.MRC_BOOT (no extra request).

   1. Every edit is backed up on this device within ~1 s (survives a closed
      tab, dead battery, dropped Wi-Fi). The backup is deleted once the
      server confirms it has the same work.
   2. Server save: 10 s after the student stops typing, never more than 60 s
      after the first unsaved edit, right after Next/Back/tab, when the tab
      is hidden, and on "Save now". Unchanged work is never re-sent.
   3. One save in flight at a time; edits made during a save go in the next.
   4. Each save carries the revision it was built on. If another tab/device
      saved newer work, the server refuses and this page asks for a reload.
   5. Failures retry with backoff (2 s → 60 s, jittered). Sign-outs stop and
      ask for a reload; the device backup carries the work across.
   6. A section is only read back into DATA after it has been restored on
      screen. Without this, a blank never-opened section overwrites saved
      answers — on page load (current section) and at Submit (every section
      the student finished in an earlier sitting).
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CFG = {
    IDLE_MS: 10000,
    MAX_WAIT_MS: 60000,
    NAV_MS: 500,
    LOCAL_MS: 600,
    POLL_MS: 30000,
    RETRY_BASE_MS: 2000,
    RETRY_MAX_MS: 60000,
    SUBMIT_WAIT_MS: 10000,
    LOCAL_TTL_MS: 14 * 24 * 3600 * 1000,
    LOCAL_PREFIX: 'mrc_unsynced_v1:'
  };

  var S = {
    started: false, halted: '', paused: false, suppress: false,
    rev: null, max: 0, seq: 0,
    dirty: false, inflight: false, firstDirtyAt: 0, nextAllowedAt: 0, failures: 0,
    lastAcked: null, savedAt: null, recovered: false, localOk: false,
    hydrated: {}, timer: null, localTimer: null,
    state: undefined, pendingStart: null, status: 'loaded'
  };

  /* ── hook into StudentJS ─────────────────────────────────────────── */
  var restoreName = typeof window.restoreSec === 'function' ? 'restoreSec'
                  : typeof window.restoreSection === 'function' ? 'restoreSection' : '';
  var orig = {
    startApp: window.startApp,
    collectData: window.collectData,
    restore: restoreName ? window[restoreName] : null,
    doSubmit: window.doSubmit
  };
  if (typeof orig.startApp !== 'function' || typeof orig.collectData !== 'function' || !orig.restore) {
    console.warn('[SaveSync] StudentJS hooks not found — interim save is OFF; old save behavior unchanged.');
    return;
  }

  // Never read a section that hasn't been restored on screen yet.
  window.collectData = function (sec) {
    if (!S.hydrated[sec]) return;
    return orig.collectData.apply(this, arguments);
  };

  // Restore, then replay input/change so word counts, Do It checks and
  // gates re-evaluate against the restored values.
  window[restoreName] = function (n) {
    S.suppress = true;
    try {
      var r = orig.restore.apply(this, arguments);
      replayValidation(n);
      return r;
    } finally {
      S.hydrated[n] = true;
      S.suppress = false;
    }
  };

  window.autoSave = function () {          // StudentJS calls this from goSec()
    if (!S.started) return;
    var sec = Number(SEC) || 0;
    if (sec > S.max) { S.max = sec; markDirty(); }
    if (S.dirty) scheduleSync(CFG.NAV_MS);
  };

  window.showSaved = function () {};       // header status replaces the per-section label

  window.startApp = function () {
    var self = this, args = arguments;
    var run = function () { begin(self, args); };
    if (S.state === undefined) S.pendingStart = run; else run();
  };

  if (typeof orig.doSubmit === 'function') {
    window.doSubmit = function () {
      var self = this, args = arguments;
      S.paused = true;
      clearTimeout(S.timer);
      var go = function () {
        try { orig.doSubmit.apply(self, args); }
        finally {
          // If they cancelled the confirm or the submit failed, resume saving.
          setTimeout(function () {
            S.paused = false;
            if (S.halted !== 'submitted') setStatus(S.dirty ? 'dirty' : 'saved');
            if (S.dirty) scheduleSync(CFG.NAV_MS);
          }, 15000);
        }
      };
      if (!S.inflight) return go();
      setStatus('finishing');
      waitForIdle(go, CFG.SUBMIT_WAIT_MS);
    };
  }

  /* ── server state: comes in the page itself (window.MRC_BOOT) ────── */
  (function () {
    var b = window.MRC_BOOT, u = b && b.user;
    gotState(u ? { email: u.email, status: u.status, max: Number(u.currentSection) || 0, rev: Number(u.rev) || 0 } : null);
  })();

  function gotState(st) {
    if (S.state !== undefined) return;     // first answer wins
    S.state = st;
    if (st && st.status === 'submitted') clearLocal();
    if (S.pendingStart) { var f = S.pendingStart; S.pendingStart = null; f(); }
  }

  function begin(self, args) {
    var st = S.state;
    if (st && typeof st.rev === 'number') S.rev = st.rev;
    S.max = Math.max(Number(SEC) || 0, (st && st.max) || 0);
    recoverLocal(st);
    S.started = true;
    orig.startApp.apply(self, args);
    mountUI();
    if (S.recovered) {
      S.lastAcked = null;
      S.seq++; S.dirty = true; S.firstDirtyAt = Date.now();
      setStatus('recovered');
      scheduleSync(CFG.NAV_MS);
    } else {
      S.lastAcked = fingerprint();
      setStatus('loaded');
    }
    setInterval(poll, CFG.POLL_MS);
  }

  /* ── change tracking ─────────────────────────────────────────────── */
  function onEdit(e) {
    if (!S.started || S.suppress) return;
    var t = e.target;
    if (!t || !t.closest || !t.closest('.sec')) return;
    if (e.type === 'click' && !t.closest('button, label, [data-rkey], .rbtn, .scenario, input[type=checkbox], input[type=radio]')) return;
    markDirty();
  }
  document.addEventListener('input', onEdit, true);
  document.addEventListener('change', onEdit, true);
  document.addEventListener('click', onEdit, true);

  // Safety net: catches anything that changed without an event.
  function poll() {
    if (!S.started || S.halted === 'submitted' || S.inflight || S.dirty) return;
    if (fingerprint() !== S.lastAcked) markDirty();
  }

  function markDirty() {
    if (!S.started || S.halted === 'submitted') return;
    S.seq++;
    if (!S.dirty) S.firstDirtyAt = Date.now();
    S.dirty = true;
    scheduleLocal();
    if (S.halted) return;                  // keep the device backup current, skip the server
    setStatus('dirty');
    scheduleSync(CFG.IDLE_MS);
  }

  /* ── server sync ─────────────────────────────────────────────────── */
  function scheduleSync(delay) {
    if (S.halted || S.paused) return;
    var now = Date.now(), wait = delay;
    if (S.firstDirtyAt) wait = Math.min(wait, S.firstDirtyAt + CFG.MAX_WAIT_MS - now);
    wait = Math.max(wait, S.nextAllowedAt - now, 0);
    clearTimeout(S.timer);
    S.timer = setTimeout(function () { flush(false); }, wait);
  }

  function flush(force) {
    clearTimeout(S.timer); S.timer = null;
    if (!S.started || S.halted || S.paused || S.inflight) return;
    if (!S.dirty && !force) return;

    var fp = fingerprint();                // also collects the open section into DATA
    if (!force && fp === S.lastAcked) {    // nothing actually changed
      S.dirty = false; S.firstDirtyAt = 0;
      clearTimeout(S.localTimer); clearLocal();
      setStatus('saved');
      return;
    }

    var json;
    try { json = JSON.stringify(DATA); } catch (e) { console.warn('[SaveSync] stringify', e); return; }
    var seqAtSend = S.seq;
    S.inflight = true; S.dirty = false; S.firstDirtyAt = 0;
    writeLocal();
    setStatus('saving');
    google.script.run
      .withSuccessHandler(function (r) { S.inflight = false; onResult(r || {}, seqAtSend, fp); })
      .withFailureHandler(function (err) { S.inflight = false; onFail(err); })
      .mrcSync({ baseRev: S.rev, max: S.max, json: json });
  }

  function onResult(r, seqAtSend, fp) {
    if (r.ok) {
      S.rev = r.rev; S.failures = 0; S.nextAllowedAt = 0;
      S.lastAcked = fp; S.savedAt = new Date();
      if (S.seq === seqAtSend && !S.dirty) {
        clearTimeout(S.localTimer); clearLocal();
        if (!S.paused) setStatus('saved');
      } else {                             // edits arrived while saving
        writeLocal();
        setStatus('dirty');
        scheduleSync(CFG.IDLE_MS);
      }
      return;
    }
    if (r.submitted) { clearLocal(); halt('submitted'); return; }
    S.dirty = true;
    if (r.conflict)  { halt('conflict');  return; }
    if (r.signedOut) { halt('signedout'); return; }
    if (r.tooLarge)  { halt('toolarge');  return; }
    onFail(r.busy ? 'busy' : (r.error || 'error'));
  }

  function onFail(err) {
    S.dirty = true;
    if (!S.firstDirtyAt) S.firstDirtyAt = Date.now();
    writeLocal();
    var msg = String((err && err.message) || err || '');
    if (/authoriz|sign ?in|signed out|log ?in/i.test(msg)) { halt('signedout'); return; }
    S.failures++;
    var d = Math.min(CFG.RETRY_MAX_MS, CFG.RETRY_BASE_MS * Math.pow(2, S.failures - 1));
    d = Math.round(d * (0.75 + Math.random() * 0.5));
    S.nextAllowedAt = Date.now() + d;
    setStatus('retrying');
    clearTimeout(S.timer);
    S.timer = setTimeout(function () { flush(false); }, d);
  }

  function halt(reason) {
    S.halted = reason;
    clearTimeout(S.timer); S.timer = null;
    setStatus(reason);
  }

  function saveNow() {
    if (S.halted === 'conflict' || S.halted === 'submitted') return;
    if (S.halted) S.halted = '';           // signed out / too large: allow another try
    S.nextAllowedAt = 0; S.failures = 0;
    S.seq++; S.dirty = true;
    if (S.inflight) { setStatus('saving'); return; }   // resends after the current save lands
    flush(true);
  }

  function waitForIdle(cb, maxMs) {
    var t0 = Date.now();
    (function tick() {
      if (!S.inflight || Date.now() - t0 > maxMs) return cb();
      setTimeout(tick, 200);
    })();
  }

  /* ── device backup (unsynced work only) ──────────────────────────── */
  function emailKey() {
    var em = (typeof USER_EMAIL === 'string' && USER_EMAIL) || (S.state && S.state.email) || '';
    return em ? CFG.LOCAL_PREFIX + em.toLowerCase() : '';
  }
  function writeLocal() {
    var k = emailKey(); if (!k) return;
    try {
      localStorage.setItem(k, JSON.stringify({
        v: 1, baseRev: S.rev, sec: Number(SEC) || 0, max: S.max, ts: Date.now(), data: DATA
      }));
      S.localOk = true;
    } catch (e) { S.localOk = false; }
  }
  function readLocal() {
    var k = emailKey(); if (!k) return null;
    try { var raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function clearLocal() {
    var k = emailKey(); if (!k) return;
    try { localStorage.removeItem(k); } catch (e) {}
  }
  function scheduleLocal() {
    clearTimeout(S.localTimer);
    S.localTimer = setTimeout(function () {
      if (S.dirty || S.inflight || S.halted) { collectOpen(); writeLocal(); }
    }, CFG.LOCAL_MS);
  }

  function recoverLocal(st) {
    var L = readLocal();
    if (!L) return;
    if (L.v !== 1 || !L.data || !L.ts || Date.now() - L.ts > CFG.LOCAL_TTL_MS) { clearLocal(); return; }
    if (!st) return;                       // can't tell which copy is newer — keep it for next load
    var same = L.baseRev === S.rev || (L.baseRev === null && S.rev === 0);
    if (!same) { clearLocal(); return; }   // server already has newer work from elsewhere
    DATA = L.data;
    if (typeof L.sec === 'number') SEC = L.sec;
    S.max = Math.max(S.max, Number(L.max) || 0, Number(SEC) || 0);
    S.recovered = true;
  }

  /* ── helpers ─────────────────────────────────────────────────────── */
  function collectOpen() {
    var sec = Number(SEC) || 0;
    try { window.collectData(sec); } catch (e) { console.warn('[SaveSync] collect', e); }
    if (sec > S.max) S.max = sec;
  }
  function fingerprint() {
    collectOpen();
    try { return JSON.stringify(DATA) + '|' + S.max; } catch (e) { return String(Math.random()); }
  }

  function replayValidation(n) {
    var el = document.getElementById('s' + n);
    if (!el) return;
    var f = el.querySelectorAll('input, textarea, select');
    for (var i = 0; i < f.length; i++) {
      var x = f[i], t = (x.type || '').toLowerCase();
      if (t === 'button' || t === 'submit' || t === 'hidden') continue;
      if ((t === 'checkbox' || t === 'radio') ? !x.checked : x.value === '') continue;
      fire(x, 'input'); fire(x, 'change');
    }
  }
  function fire(el, type) {
    var ev;
    try { ev = new Event(type, { bubbles: true }); }
    catch (e) { ev = document.createEvent('Event'); ev.initEvent(type, true, true); }
    try { el.dispatchEvent(ev); } catch (e) { console.warn('[SaveSync] replay', e); }
  }

  /* ── page lifecycle ──────────────────────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && S.started && (S.dirty || S.inflight)) {
      collectOpen(); writeLocal(); flush(false);
    }
  });
  window.addEventListener('pagehide', function () {
    if (S.started && (S.dirty || S.inflight)) { collectOpen(); writeLocal(); }
  });
  window.addEventListener('online', function () {
    if (S.started && S.dirty && !S.halted) { S.nextAllowedAt = 0; flush(false); }
  });
  window.addEventListener('beforeunload', function (e) {
    if (!S.started || S.paused || S.halted === 'submitted') return;
    if (!(S.dirty || S.inflight)) return;
    collectOpen(); writeLocal();
    if (S.halted) return;                  // backup written; don't nag on a reload we asked for
    e.preventDefault(); e.returnValue = ''; return '';
  });

  /* ── status bar ──────────────────────────────────────────────────── */
  function timeStr(d) {
    if (!d) return '';
    try { return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
    catch (e) { return d.toLocaleTimeString(); }
  }
  var MSG = {
    loaded:    'All work saved',
    dirty:     'Unsaved changes',
    saving:    'Saving…',
    saved:     function () { return 'All work saved · ' + timeStr(S.savedAt); },
    recovered: 'Recovered unsaved work from this device. Saving…',
    finishing: 'Finishing your last save…',
    retrying:  function () { return S.localOk
                 ? 'Not saved yet. Trying again. Your work is kept on this device.'
                 : 'Not saved yet. Trying again. Keep this page open.'; },
    signedout: function () { return S.localOk
                 ? 'You were signed out. Reload to keep saving. Your work is kept on this device.'
                 : 'You were signed out. Copy your newest answer somewhere, then reload.'; },
    conflict:  'This page is out of date. Your work was saved from another tab or device. Reload to continue.',
    toolarge:  'Too much text to save. Shorten your longest answer, then press Save now.',
    submitted: 'Already submitted. Changes are not saved.'
  };
  var TONE = { retrying: 'warn', signedout: 'bad', conflict: 'bad', toolarge: 'bad' };

  function setStatus(k) { S.status = k; paint(); }

  function paint() {
    var bar = document.getElementById('ssBar');
    if (!bar) return;
    var k = S.status, m = MSG[k];
    document.getElementById('ssStatus').textContent = typeof m === 'function' ? m() : (m || '');
    bar.setAttribute('data-tone', TONE[k] || '');
    document.getElementById('ssReload').style.display = (k === 'signedout' || k === 'conflict') ? 'inline-block' : 'none';
    document.getElementById('ssSave').disabled =
      (k === 'saving' || k === 'finishing' || k === 'conflict' || k === 'submitted');
  }

  function mountUI() {
    if (document.getElementById('ssBar')) return;
    var css = document.createElement('style');
    css.textContent =
      '#ssBar{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;' +
        'padding:4px 0 2px;font-size:12px;line-height:1.3}' +
      '#ssStatus{color:var(--dg,#555)}' +
      '#ssBar[data-tone=warn] #ssStatus{color:#B45309;font-weight:600}' +
      '#ssBar[data-tone=bad] #ssStatus{color:#B91C1C;font-weight:600}' +
      '#ssBar button{font:inherit;font-weight:600;padding:4px 10px;border-radius:6px;' +
        'border:1.5px solid #2B7A78;background:#fff;color:#2B7A78;cursor:pointer}' +
      '#ssBar button:disabled{opacity:.5;cursor:default}' +
      '#ssReload{display:none}' +
      '@media print{#ssBar{display:none}}';
    document.head.appendChild(css);

    var bar = document.createElement('div');
    bar.id = 'ssBar';
    bar.className = 'no-print';
    bar.innerHTML =
      '<span id="ssStatus" role="status" aria-live="polite"></span>' +
      '<button type="button" id="ssReload">Reload</button>' +
      '<button type="button" id="ssSave">Save now</button>';
    (document.getElementById('stickyHdr') || document.body).appendChild(bar);
    document.getElementById('ssSave').onclick = saveNow;
    document.getElementById('ssReload').onclick = function () { S.paused = true; location.reload(); };
    paint();
  }
})();

;

/* ── src/student/resources.js ── */
/* ════════════════════════════════════════════════════════════════════
   ResourcesJS — "Go deeper" links for Money Reality Check (student view)

   Bundled into student.js after savesync.js.
   No server file. Code.gs, StudentJS and saved work are not touched.

   Each section gets a "Go deeper" card at the end of its Learn block:
   textbook sections first, then videos, readings and tools. Each Do It
   block gets a "Stuck on the math?" line pointing to the textbook's
   worked examples. The summary and "already submitted" screens get a
   link to the full textbook.

   Edit the RES table below to change links. Textbook links are built
   from BOOK_BASE + section id; set BOOK_BASE to '' to hide all of them.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var BOOK_BASE = 'https://books.abovethewell.com/fm/';

  // Textbook sections used below: id -> [number, title] (from fm-textbook book.js)
  var BOOK = {
    'reading-your-pay-stub':           ['3.3',  'Reading a Pay Stub'],
    'how-income-tax-works':            ['4.1',  'How Income Tax Works'],
    'checking-accounts-and-overdraft': ['5.1',  'Checking Accounts'],
    'bank-fees':                       ['5.3',  'Bank Fees and Choosing an Account'],
    'savings-accounts':                ['5.4',  'Savings Accounts and Interest'],
    'emergency-funds':                 ['6.3',  'Emergency and Sinking Funds'],
    'what-a-budget-is':                ['7.1',  'What a Budget Is'],
    'budget-methods':                  ['7.2',  'Ways to Run a Budget'],
    'credit-scores':                   ['9.3',  'Credit Scores'],
    'credit-cards':                    ['10.1', 'How Credit Cards Work'],
    'payoff-time':                     ['10.3', 'Paying Down a Balance: Time and Total Cost'],
    'how-loans-work':                  ['11.1', 'How Loans Work'],
    'car-loans':                       ['11.2', 'Car Loans'],
    'predatory-lending':               ['11.5', 'Predatory Lending'],
    'repaying-debt':                   ['11.6', 'Managing and Repaying Debt'],
    'how-insurance-works':             ['12.1', 'How Insurance Works'],
    'auto-insurance':                  ['12.2', 'Auto Insurance'],
    'health-insurance':                ['12.4', 'Health Insurance']
  };

  var TC = 'Two Cents · PBS';

  // Index = section number (0 Paycheck … 6 Reflection).
  // t: book | video | read | tool.  min: runtime in minutes, if known.
  var RES = [
    { // 0 Paycheck
      stuck: ['how-income-tax-works'],
      items: [
        { t: 'book', id: 'reading-your-pay-stub' },
        { t: 'book', id: 'how-income-tax-works' },
        { t: 'video', title: 'How Do Tax Brackets Actually Work?', src: TC, min: 7,
          url: 'https://www.pbs.org/video/how-do-tax-brackets-actually-work-uxonke',
          why: 'What a higher bracket really does to your pay.' },
        { t: 'video', title: 'How Do Your Tax Dollars Get Spent?', src: TC, min: 5,
          url: 'https://www.pbs.org/video/how-do-your-tax-dollars-get-spent-zbnxjr',
          why: 'Where the money taken out of your check goes.' },
        { t: 'read', title: 'Social Security and Medicare Withholding Rates', src: 'IRS',
          url: 'https://www.irs.gov/taxtopics/tc751',
          why: 'The official FICA rates.' },
        { t: 'tool', title: 'Arizona Paycheck Calculator', src: 'SmartAsset',
          url: 'https://smartasset.com/taxes/arizona-paycheck-calculator',
          why: 'Run your own take-home pay.' }
      ]
    },
    { // 1 Banking
      stuck: ['bank-fees', 'savings-accounts'],
      items: [
        { t: 'book', id: 'checking-accounts-and-overdraft' },
        { t: 'book', id: 'bank-fees' },
        { t: 'book', id: 'savings-accounts' },
        { t: 'video', title: 'Should You Break Up With Your Big Bank?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/should-you-break-up-with-your-big-bank-27jodw',
          why: 'Big banks compared with the other places to keep your money.' },
        { t: 'video', title: 'Is Your Money Safe in a Bank?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/is-your-money-safe-in-a-bank-6epd7d',
          why: 'What protects your deposits if a bank fails.' },
        { t: 'read', title: "Customers Can Avoid Overdraft Fees, but Most Don't Know How", src: 'Pew Charitable Trusts',
          url: 'https://www.pewtrusts.org/en/research-and-analysis/articles/2018/03/21/customers-can-avoid-overdraft-fees-but-most-dont-know-how',
          why: 'How overdraft fees work and how to avoid them.' }
      ]
    },
    { // 2 Insurance
      stuck: ['health-insurance'],
      items: [
        { t: 'book', id: 'how-insurance-works' },
        { t: 'book', id: 'health-insurance' },
        { t: 'book', id: 'auto-insurance' },
        { t: 'video', title: 'Health Insurance Explained: The YouToons Have It Covered', src: 'KFF',
          url: 'https://kff.org/dba192c',
          why: 'Premiums, deductibles and coinsurance, in cartoons.' },
        { t: 'video', title: "I'm Young & Healthy, Can I Skip Health Insurance?", src: TC, min: 5,
          url: 'https://www.pbs.org/video/im-young-healthy-can-i-skip-health-insurance-h5oetd',
          why: 'The real risk of going without coverage.' },
        { t: 'video', title: '10 Ways to Lower Your Car Insurance Premiums', src: TC, min: 7,
          url: 'https://www.pbs.org/video/10-ways-to-lower-your-car-insurance-premiums-nim8a3',
          why: 'Ways to pay less for the same coverage.' }
      ]
    },
    { // 3 Credit Cards
      stuck: ['payoff-time'],
      items: [
        { t: 'book', id: 'credit-cards' },
        { t: 'book', id: 'payoff-time' },
        { t: 'book', id: 'credit-scores' },
        { t: 'video', title: 'How Are Credit Scores Calculated?', src: TC, min: 5,
          url: 'https://www.pbs.org/video/how-are-credit-scores-calculated-s6zjoc',
          why: 'The five things your score is built from.' },
        { t: 'video', title: "What's the Fastest Way to Pay Off Debt?", src: TC, min: 5,
          url: 'https://www.pbs.org/video/hacking-your-brain-to-get-out-of-debt-6kyrbi',
          why: 'Payoff strategies, and the psychology behind them.' },
        { t: 'read', title: 'How Is a Credit Card Minimum Payment Calculated?', src: 'Experian',
          url: 'https://www.experian.com/blogs/ask-experian/how-is-your-credit-card-minimum-payment-calculated',
          why: 'What sets your minimum payment.' },
        { t: 'read', title: 'How Do I Get and Keep a Good Credit Score?', src: 'CFPB',
          url: 'https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-and-keep-a-good-credit-score-en-318/',
          why: "The government's short list of what helps." }
      ]
    },
    { // 4 Loans and Debt
      stuck: ['how-loans-work'],
      items: [
        { t: 'book', id: 'how-loans-work' },
        { t: 'book', id: 'car-loans' },
        { t: 'book', id: 'predatory-lending' },
        { t: 'book', id: 'repaying-debt' },
        { t: 'video', title: 'Is There Such a Thing as Good Debt?', src: TC, min: 7,
          url: 'https://www.pbs.org/video/is-there-such-a-thing-as-good-debt-6ofhtj',
          why: 'When borrowing pays off, and when it doesn’t.' },
        { t: 'video', title: 'Are Payday Loans Ever a Good Idea?', src: TC, min: 6,
          url: 'https://www.pbs.org/video/are-payday-loans-ever-a-good-idea-wlg0p0/',
          why: 'What a payday loan really costs.' },
        { t: 'read', title: 'What Is a Truth-in-Lending Disclosure for an Auto Loan?', src: 'CFPB',
          url: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-truth-in-lending-disclosure-for-an-auto-loan-en-787/',
          why: 'The form that shows a loan’s total cost.' },
        { t: 'read', title: 'What Is the Maximum Interest Rate for Auto Title Loans?', src: 'Arizona DIFI',
          url: 'https://difi.az.gov/faq/what-maximum-interest-rate-auto-title-loans',
          why: 'Arizona’s legal limits on title loans.' }
      ]
    },
    { // 5 Budget
      stuck: ['budget-methods'],
      items: [
        { t: 'book', id: 'what-a-budget-is' },
        { t: 'book', id: 'budget-methods' },
        { t: 'book', id: 'emergency-funds' },
        { t: 'video', title: 'Budgeting Basics!', src: TC,
          url: 'https://www.pbs.org/video/budgeting-basics-frsgla/',
          why: 'Where a budget starts.' },
        { t: 'video', title: 'Why You NEED an Emergency Fund!', src: TC,
          url: 'https://www.pbs.org/video/why-you-need-an-emergency-fund-m0uc67/',
          why: 'Why savings come before extra wants.' },
        { t: 'video', title: 'How Eating Out Keeps You Poor!', src: TC,
          url: 'https://www.pbs.org/video/how-eating-out-keeps-you-poor-d0qcmh/',
          why: 'How small spending adds up.' }
      ]
    },
    { // 6 Reflection
      title: 'Keep going after this',
      items: [
        { t: 'book', home: true },
        { t: 'read', title: 'You Now Have Permanent Access to Free Weekly Credit Reports', src: 'FTC',
          url: 'https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports',
          why: 'Check your own credit report for free, every week.' },
        { t: 'read', title: 'Free Tax Return Preparation for Qualifying Taxpayers', src: 'IRS',
          url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
          why: 'Free help filing your taxes (VITA), if you qualify.' }
      ]
    }
  ];

  var TAG = { book: 'Textbook', video: 'Video', read: 'Read', tool: 'Tool' };

  /* ── rendering ───────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function bookUrl(id) { return BOOK_BASE ? BOOK_BASE + (id ? id + '.html' : 'book.html') : ''; }

  function resolve(it) {
    if (it.t !== 'book') return it;
    if (!BOOK_BASE) return null;
    if (it.home) return { t: 'book', tag: 'Textbook', title: 'Financial Math: the full textbook', src: 'Free, no sign-in',
                          url: bookUrl(''), why: 'Every topic in this check-out, with worked examples.' };
    var b = BOOK[it.id]; if (!b) return null;
    return { t: 'book', tag: 'Textbook ' + b[0], title: b[1], url: bookUrl(it.id) };
  }

  function row(it) {
    var r = resolve(it); if (!r || !r.url) return '';
    var meta = [r.src, r.min ? r.min + ' min' : ''].filter(Boolean).join(' · ');
    if (r.why) meta += (meta ? ' — ' : '') + r.why;
    return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">'
      + '<span class="rx-tag rx-' + r.t + '">' + esc(r.tag || TAG[r.t]) + '</span>'
      + '<span class="rx-t">' + esc(r.title) + '</span>'
      + (meta ? '<span class="rx-meta">' + esc(meta) + '</span>' : '')
      + '</a></li>';
  }

  function card(sec, solo) {
    var d = RES[sec]; if (!d) return null;
    var rows = d.items.map(row).join('');
    if (!rows) return null;
    var el = document.createElement('div');
    el.className = 'rx-card no-print' + (solo ? ' rx-solo' : ' sub');
    el.setAttribute('data-rx', String(sec));
    el.innerHTML = '<p class="rx-h">' + esc(d.title || 'Go deeper') + '</p>'
      + '<p class="rx-note">Optional. The textbook has worked examples and practice. Links open in a new tab, so this page stays open.</p>'
      + '<ul class="rx-list">' + rows + '</ul>';
    return el;
  }

  function stuckLine(sec) {
    var d = RES[sec]; if (!d || !d.stuck || !BOOK_BASE) return null;
    var links = d.stuck.filter(function (id) { return BOOK[id]; }).map(function (id) {
      return '<a href="' + esc(bookUrl(id)) + '" target="_blank" rel="noopener noreferrer">Textbook '
        + esc(BOOK[id][0]) + ': ' + esc(BOOK[id][1]) + '</a>';
    });
    if (!links.length) return null;
    var el = document.createElement('p');
    el.className = 'rx-stuck no-print';
    el.setAttribute('data-rx-stuck', String(sec));
    el.innerHTML = '<strong>Stuck on the math?</strong> Worked examples: ' + links.join(' · ');
    return el;
  }

  function homeCard(key) {
    if (!BOOK_BASE) return null;
    var el = document.createElement('div');
    el.className = 'rx-card rx-solo no-print';
    el.setAttribute('data-rx', key);
    el.innerHTML = '<p class="rx-h">Keep learning</p>'
      + '<ul class="rx-list">' + row({ t: 'book', home: true }) + '</ul>';
    return el;
  }

  /* ── placement (idempotent; safe to call on every navigation) ────── */
  function q(root, sels) {
    for (var i = 0; i < sels.length; i++) {
      try { var e = root.querySelector(sels[i]); if (e) return e; } catch (x) {}
    }
    return null;
  }

  function placeSection(n) {
    var sec = document.getElementById('s' + n);
    if (!sec || !RES[n]) return;

    if (!sec.querySelector('[data-rx="' + n + '"]')) {
      var learn = document.getElementById('learn' + n) || q(sec, ['.b-learn', '[id^="learn"]']);
      var c;
      if (learn && (c = card(n, false))) {
        learn.appendChild(c);
      } else if ((c = card(n, true))) {
        var h = sec.querySelector('h2');
        var firstBlock = sec.querySelector('.block');
        if (firstBlock && firstBlock.nextSibling) firstBlock.parentNode.insertBefore(c, firstBlock.nextSibling);
        else if (h && h.nextSibling) h.parentNode.insertBefore(c, h.nextSibling);
        else sec.insertBefore(c, sec.firstChild);
      }
    }

    if (!sec.querySelector('[data-rx-stuck="' + n + '"]')) {
      var doit = document.getElementById('do' + n) || document.getElementById('doit' + n)
              || q(sec, ['.b-do', '.b-doit', '.b-prove']);
      var s = doit && stuckLine(n);
      if (s) {
        var title = doit.querySelector('.bt');
        if (title && title.parentNode === doit) doit.insertBefore(s, title.nextSibling);
        else doit.insertBefore(s, doit.firstChild);
      }
    }
  }

  function placeAll() {
    for (var i = 0; i < RES.length; i++) {
      try { placeSection(i); } catch (e) { console.warn('[Resources] section ' + i, e); }
    }
    [['sSummary', 'summary'], ['secDone', 'done']].forEach(function (p) {
      var host = document.getElementById(p[0]);
      if (host && !host.querySelector('[data-rx="' + p[1] + '"]')) {
        var c = homeCard(p[1]); if (c) host.appendChild(c);
      }
    });
  }

  /* ── styles ──────────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    '.rx-card{margin-top:12px;color:#1A1A2E}' +
    '.rx-solo{background:#fff;border-left:4px solid #2B7A78;border-radius:8px;padding:12px 14px;margin:12px 0;' +
      'box-shadow:0 1px 3px rgba(0,0,0,.08)}' +
    '.rx-h{margin:0 0 2px;font-size:15px;font-weight:700;color:#2B7A78}' +
    '.rx-note{margin:0 0 6px;font-size:12px;color:#666}' +
    '.rx-list{list-style:none;margin:0;padding:0}' +
    '.rx-list li{border-top:1px solid #eee}' +
    '.rx-list li:first-child{border-top:0}' +
    '.rx-list a{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 8px;padding:9px 0;' +
      'text-decoration:none;color:#1A1A2E}' +
    '.rx-list a:hover .rx-t,.rx-list a:focus .rx-t{text-decoration:underline}' +
    '.rx-t{font-weight:600;font-size:14px;line-height:1.35}' +
    '.rx-meta{flex-basis:100%;font-size:12px;line-height:1.4;color:#555}' +
    '.rx-tag{flex:none;font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;' +
      'padding:2px 6px;border-radius:4px;white-space:nowrap}' +
    '.rx-book{background:#2B7A78;color:#fff}' +
    '.rx-video{background:#B45309;color:#fff}' +
    '.rx-read{background:#E8F5F4;color:#1F5E5C}' +
    '.rx-tool{background:#FFF3E6;color:#92400E}' +
    '.rx-stuck{display:block;background:#fff;color:#1A1A2E;border-radius:6px;padding:8px 10px;' +
      'margin:6px 0 10px;font-size:13px;line-height:1.45}' +
    '.rx-stuck a{color:#2B7A78;font-weight:700}' +
    '@media print{.rx-card,.rx-stuck{display:none!important}}';
  document.head.appendChild(css);

  /* ── hooks ───────────────────────────────────────────────────────── */
  // Sections may be built in HTML or by startApp(); goSec() always runs after
  // they exist, so place on every navigation (cheap, idempotent).
  if (typeof window.goSec === 'function') {
    var origGoSec = window.goSec;
    window.goSec = function () {
      var r = origGoSec.apply(this, arguments);
      try { placeAll(); } catch (e) { console.warn('[Resources]', e); }
      return r;
    };
  }
  try { placeAll(); } catch (e) { console.warn('[Resources]', e); }
})();

;

/* ── src/student/cer.js ── */
/* ════════════════════════════════════════════════════════════════════
   CERJS — Claim / Evidence / Reasoning for every Think About It answer

   Bundled into student.js after resources.js.
   No server change: answers are stored in the same answer field as before.
   The teacher dashboard shows the three parts on separate labeled lines.

   How it works
   - Each Think About It question gets three boxes: Claim, Evidence,
     Reasoning, each with its own word minimum and counter.
   - The original answer box stays in place, hidden, and still holds the
     answer. The three parts are written into it as
         [CLAIM] …  [EVIDENCE] …  [REASONING] …
     so saving, the teacher dashboard and the printout keep working, and
     each part shows up labeled.
   - Next stays locked until every answer in the section has all three
     parts. Submit is blocked the same way (checked against saved work,
     so sections from an earlier sitting count).
   - Answers written before this update ("legacy") are moved into the
     Reasoning box with a note. They still pass if they met the old
     30-word rule; editing one switches it to the new rules.
   - Each Think About It block shows how answers are graded, that any
     section can be sent back for rework, and a model answer to a
     question that isn't on the test.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var MIN = { c: 5, e: 15, r: 20 };   // words per part
  var LEGACY_MIN = 30;                // old one-box rule, for answers written before this update
  var KEYS = ['paycheck', 'banking', 'insurance', 'credit', 'loans', 'budget', 'reflection'];

  var PARTS = [
    { k: 'c', name: 'Claim',     tag: 'CLAIM',
      hint: 'Your answer, in one sentence.',
      ph: 'I think… / I would… / The answer is…' },
    { k: 'e', name: 'Evidence',  tag: 'EVIDENCE',
      hint: 'Proof: a number from your work above, or a fact from Learn. Say where it came from.',
      ph: 'From my numbers above: … / The Learn section says: …' },
    { k: 'r', name: 'Reasoning', tag: 'REASONING',
      hint: 'Explain why your evidence proves your claim.',
      ph: 'This shows… because… / That matters because…' }
  ];

  /* ── text format ─────────────────────────────────────────────────── */
  function wc(s) { s = String(s || '').trim(); return s ? s.split(/\s+/).length : 0; }

  function compose(p) {
    var c = (p.c || '').trim(), e = (p.e || '').trim(), r = (p.r || '').trim();
    if (!c && !e && !r) return '';
    return '[CLAIM] ' + c + '\n[EVIDENCE] ' + e + '\n[REASONING] ' + r;
  }

  var RX = /^\s*\[CLAIM\] ?([\s\S]*?)\n\[EVIDENCE\] ?([\s\S]*?)\n\[REASONING\] ?([\s\S]*)$/;
  function parse(v) {
    v = String(v || '');
    var m = v.match(RX);
    if (m) return { c: m[1].trim(), e: m[2].trim(), r: m[3].trim(), legacy: false };
    if (!v.trim()) return { c: '', e: '', r: '', legacy: false };
    return { c: '', e: '', r: v.trim(), legacy: true };
  }

  function complete(v) {
    var p = parse(v);
    if (p.legacy) return wc(v) >= LEGACY_MIN;
    return wc(p.c) >= MIN.c && wc(p.e) >= MIN.e && wc(p.r) >= MIN.r;
  }

  /* ── helpers ─────────────────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function secOf(el) {
    var s = el.closest && el.closest('.sec');
    var m = s && /^s(\d+)$/.exec(s.id);
    return m ? +m[1] : -1;
  }
  function thinkBlock(n) {
    var sec = $('s' + n);
    return $('think' + n) || (sec && sec.querySelector('.b-think'));
  }
  function questions(n) {           // every written-answer question in the section (same set checkGate counts)
    var sec = $('s' + n); if (!sec) return [];
    var out = [], q = sec.querySelectorAll('.kc-q');
    for (var i = 0; i < q.length; i++) { var ta = q[i].querySelector('textarea'); if (ta) out.push({ kcq: q[i], ta: ta }); }
    return out;
  }
  function fire(el, type) {
    var ev;
    try { ev = new Event(type, { bubbles: true }); }
    catch (x) { ev = document.createEvent('Event'); ev.initEvent(type, true, true); }
    el.dispatchEvent(ev);
  }
  function sectionName(n) {
    var names = (typeof SNAMES !== 'undefined' && SNAMES) || ['Paycheck', 'Banking', 'Insurance', 'Credit', 'Loans', 'Budget', 'Reflect'];
    return 'Section ' + (n + 1) + ' (' + names[n] + ')';
  }

  /* ── build the three boxes for one question ──────────────────────── */
  function build(q) {
    var kcq = q.kcq, ta = q.ta;
    if (kcq.__cer) return kcq.__cer;

    ta.style.display = 'none';
    ta.setAttribute('aria-hidden', 'true');
    var wcp = ta.nextElementSibling;
    if (wcp && wcp.classList.contains('wc')) wcp.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.className = 'cer';                               // deliberately NOT inside .kc-q
    var html = '';
    PARTS.forEach(function (P) {
      html += '<div class="cer-part" data-part="' + P.k + '">'
        + '<div class="cer-top"><span class="cer-badge cer-' + P.k + '">' + P.name.charAt(0) + '</span>'
        + '<span class="cer-name">' + P.name + '</span>'
        + '<span class="cer-count" aria-live="polite"></span></div>'
        + '<p class="cer-hint">' + esc(P.hint) + '</p>'
        + '<textarea class="cer-box" rows="' + (P.k === 'c' ? 2 : 3) + '" placeholder="' + esc(P.ph) + '"'
        + ' aria-label="' + P.name + '"></textarea>'
        + (P.k === 'e' ? '<p class="cer-tip" hidden>Tip: strong evidence usually has a number. Scroll up to your Apply or Do It work.</p>' : '')
        + '</div>';
    });
    html += '<p class="cer-legacy" hidden>This answer was written before the Claim, Evidence and Reasoning boxes, so all of it is in Reasoning. '
      + 'Split it up: answers without all three can be sent back for rework.</p>';
    wrap.innerHTML = html;
    kcq.parentNode.insertBefore(wrap, kcq.nextSibling);

    var st = { ta: ta, wrap: wrap, last: null, legacy: false, box: {} };
    PARTS.forEach(function (P) { st.box[P.k] = wrap.querySelector('[data-part="' + P.k + '"] textarea'); });
    kcq.__cer = st;
    wrap.__cer = st;
    return st;
  }

  function current(st) { return { c: st.box.c.value, e: st.box.e.value, r: st.box.r.value }; }

  // Answer box -> three boxes (the hidden answer box wins whenever it changed underneath us).
  function pull(st) {
    if (st.ta.value === st.last) return;
    var p = parse(st.ta.value);
    st.box.c.value = p.c; st.box.e.value = p.e; st.box.r.value = p.r;
    st.legacy = p.legacy;
    st.last = st.ta.value;
    paint(st);
  }

  // Three boxes -> answer box, only when the student actually changed something.
  function push(st) {
    var v = compose(current(st));
    if (st.last !== null && v === compose(parse(st.last))) return;   // nothing new (e.g. a replayed event)
    st.legacy = false;
    st.ta.value = v;
    st.last = v;
    fire(st.ta, 'input');           // runs the original onTA(): word count + checkGate()
    paint(st);
  }

  function paint(st) {
    var cur = current(st);
    PARTS.forEach(function (P) {
      var el = st.wrap.querySelector('[data-part="' + P.k + '"] .cer-count');
      var n = wc(cur[P.k]);
      var min = MIN[P.k];
      el.textContent = n >= min ? '✓ ' + n + ' words' : n + ' / ' + min + ' words';
      el.className = 'cer-count' + (n >= min ? ' met' : '');
    });
    var tip = st.wrap.querySelector('.cer-tip');
    if (tip) tip.hidden = !(wc(cur.e) >= 5 && !/\d/.test(cur.e));
    st.wrap.querySelector('.cer-legacy').hidden = !st.legacy;
    // mirror a disabled/read-only original box (submitted or locked states)
    var off = st.ta.disabled || st.ta.readOnly;
    PARTS.forEach(function (P) { st.box[P.k].disabled = off; });
  }

  /* ── grading notice + model answer, once per Think About It block ── */
  var NOTICE =
      '<p class="cer-n-h">How your answers are graded</p>'
    + '<p>There is no single right opinion. Every answer needs three parts:</p>'
    + '<ul><li><b>Claim:</b> your answer, in one sentence.</li>'
    + '<li><b>Evidence:</b> proof. Use a number from your work above or a fact from Learn, and say where it came from.</li>'
    + '<li><b>Reasoning:</b> why that evidence proves your claim.</li></ul>'
    + '<p class="cer-n-warn">Your teacher reads every answer. Any section that doesn\'t have a clear claim, evidence and reasoning '
    + 'for each answer can be sent back for rework.</p>'
    + '<details><summary>See a strong answer (to a practice question that isn\'t on this test)</summary>'
    + '<p class="cer-ex-q">Practice question: Is a $65-a-year warehouse store membership worth it for you?</p>'
    + '<p><span class="cer-badge cer-c">C</span> It\'s worth it for me only if I buy things that keep, because the savings have to be more than $65.</p>'
    + '<p><span class="cer-badge cer-e">E</span> If I save about $8 a week by buying in bulk, that\'s $8 × 52 = $416 a year, '
    + 'far more than $65. But the last big bag of rice I bought went stale before I finished it.</p>'
    + '<p><span class="cer-badge cer-r">R</span> The math says yes, but only if I actually use what I buy. Food I throw away isn\'t savings, '
    + 'so I\'d stick to things that last, like toilet paper and coffee. Then the $65 pays for itself in about two months.</p>'
    + '</details>';

  function addNotice(n) {
    var th = thinkBlock(n);
    if (!th) { var q = questions(n)[0]; th = q && (q.kcq.closest('.block') || q.kcq.parentNode); }
    if (!th || th.querySelector('.cer-notice')) return;
    var el = document.createElement('div');
    el.className = 'cer-notice no-print';
    el.innerHTML = NOTICE;
    var bt = th.querySelector('.bt');                 // "Think About It" title, at any depth
    if (bt) bt.parentNode.insertBefore(el, bt.nextSibling);
    else th.insertBefore(el, th.firstChild);
  }

  /* ── Next-button gate ────────────────────────────────────────────── */
  var lastMsg = {};
  function sectionStatus(n) {
    var qs = questions(n), done = 0;
    qs.forEach(function (q) { if (complete(q.ta.value)) done++; });
    return { total: qs.length, done: done };
  }
  function enforce(n) {
    var btn = $('gate' + n);
    if (!btn) return;
    var th = thinkBlock(n);
    if (th && th.classList.contains('locked')) return;      // "Complete Do It first" stays in charge
    var s = sectionStatus(n);
    var msg = $('gateMsg' + n);
    if (s.done < s.total) {
      btn.disabled = true;
      if (msg) {
        lastMsg[n] = 'Every answer needs a Claim, Evidence and Reasoning (' + s.done + ' of ' + s.total + ' answers done).';
        msg.textContent = lastMsg[n];
      }
    } else if (msg && lastMsg[n] && msg.textContent === lastMsg[n]) {
      msg.textContent = '';
      lastMsg[n] = '';
    }
  }

  /* ── sync everything (idempotent; runs after every navigation) ───── */
  function syncAll() {
    for (var n = 0; n < KEYS.length; n++) {
      var qs = questions(n);
      if (!qs.length) continue;
      addNotice(n);
      qs.forEach(function (q) { pull(build(q)); });
    }
    var cur = (typeof SEC !== 'undefined') ? SEC : -1;
    if (cur >= 0 && cur < KEYS.length) {
      if (typeof window.checkGate === 'function') window.checkGate(cur); else enforce(cur);
    }
    summaryNote();
  }

  /* ── typing in the three boxes ───────────────────────────────────── */
  function onBox(e) {
    var t = e.target;
    if (!t || !t.classList || !t.classList.contains('cer-box')) return;
    var wrap = t.closest('.cer');
    if (wrap && wrap.__cer) push(wrap.__cer);
  }
  document.addEventListener('input', onBox, true);

  /* ── submit check (reads saved work, so earlier sittings count) ──── */
  function incompleteSections() {
    var data = (typeof DATA !== 'undefined' && DATA) || {};
    var bad = [];
    for (var n = 0; n < KEYS.length; n++) {
      if (!questions(n).length) continue;                      // section has no Think About It
      var ans = data[KEYS[n]] && data[KEYS[n]].answers;
      var ok = Array.isArray(ans) && ans.length > 0;
      if (ok) for (var i = 0; i < ans.length; i++) if (!complete(ans[i] && ans[i].a)) { ok = false; break; }
      if (!ok) bad.push(n);
    }
    return bad;
  }

  function summaryNote(bad) {
    var host = $('sSummary'); if (!host) return;
    var el = host.querySelector('.cer-sum');
    if (!el) {
      el = document.createElement('div');
      el.className = 'cer-sum no-print';
      host.insertBefore(el, host.firstChild);
    }
    if (bad && bad.length) {
      el.setAttribute('data-state', 'blocked');
      el.innerHTML = '<p><b>Not ready to submit.</b> These sections have answers missing a claim, evidence or reasoning:</p>'
        + bad.map(function (n) {
            return '<button type="button" class="cer-jump" data-sec="' + n + '">Go to ' + esc(sectionName(n)) + '</button>';
          }).join(' ');
    } else {
      el.setAttribute('data-state', 'ok');
      el.innerHTML = '<p><b>Before you submit:</b> check that every answer has a clear claim, evidence and reasoning. '
        + 'Sections without them get sent back for rework.</p>';
    }
  }

  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('.cer-jump');
    if (b && typeof window.goSec === 'function') window.goSec(+b.getAttribute('data-sec'));
  });

  /* ── hooks ───────────────────────────────────────────────────────── */
  if (typeof window.checkGate === 'function') {
    var origCheckGate = window.checkGate;
    window.checkGate = function (n) {
      var r = origCheckGate.apply(this, arguments);
      try { enforce(n); } catch (x) { console.warn('[CER]', x); }
      return r;
    };
  }
  if (typeof window.goSec === 'function') {
    var origGoSec = window.goSec;
    window.goSec = function () {
      var r = origGoSec.apply(this, arguments);
      try { syncAll(); } catch (x) { console.warn('[CER]', x); }
      return r;
    };
  }
  if (typeof window.doSubmit === 'function') {
    var origSubmit = window.doSubmit;
    window.doSubmit = function () {
      var bad = incompleteSections();
      if (bad.length) { summaryNote(bad); window.scrollTo(0, 0); return; }
      return origSubmit.apply(this, arguments);
    };
  }

  /* ── styles ──────────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    '.cer{margin:6px 0 18px;padding:10px 12px;border:1px solid #e3e3e3;border-radius:8px;background:#fff;color:#1A1A2E}' +
    '.cer-part+.cer-part{margin-top:10px}' +
    '.cer-top{display:flex;align-items:center;gap:8px}' +
    '.cer-name{font-weight:700;font-size:14px}' +
    '.cer-count{margin-left:auto;font-size:12px;color:#777;white-space:nowrap}' +
    '.cer-count.met{color:#2E7D32;font-weight:600}' +
    '.cer-hint{margin:2px 0 4px;font-size:12px;color:#555}' +
    '.cer-box{width:100%;box-sizing:border-box;font:inherit;font-size:14px;padding:8px;border:1.5px solid #ccc;border-radius:6px;resize:vertical}' +
    '.cer-box:focus{outline:none;border-color:#2B7A78}' +
    '.cer-tip{margin:4px 0 0;font-size:12px;color:#92400E}' +
    '.cer-legacy{margin:10px 0 0;font-size:12px;color:#92400E;background:#FFF3E6;border-radius:6px;padding:6px 8px}' +
    '.cer-badge{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;' +
      'font-size:11px;font-weight:800;color:#fff;flex:none;vertical-align:middle}' +
    '.cer-c{background:#2B7A78}.cer-e{background:#B45309}.cer-r{background:#1E3A5F}' +
    '.cer-notice{background:#fff;color:#1A1A2E;border-left:4px solid #B45309;border-radius:8px;padding:10px 12px;margin:0 0 10px;font-size:13px;line-height:1.45}' +
    '.cer-notice p{margin:0 0 6px}.cer-notice ul{margin:0 0 6px;padding-left:18px}' +
    '.cer-n-h{font-weight:700;font-size:14px}' +
    '.cer-n-warn{font-weight:600}' +
    '.cer-notice details{margin-top:4px}.cer-notice summary{cursor:pointer;color:#2B7A78;font-weight:600}' +
    '.cer-notice details p{margin:6px 0}.cer-ex-q{font-style:italic}' +
    '.cer-sum{border-radius:8px;padding:10px 12px;margin:0 0 12px;font-size:13px;line-height:1.45;background:#E8F5F4;color:#1A1A2E}' +
    '.cer-sum[data-state=blocked]{background:#FFEBEE}' +
    '.cer-sum p{margin:0 0 6px}' +
    '.cer-jump{font:inherit;font-weight:600;padding:5px 10px;margin:2px 4px 2px 0;border-radius:6px;border:1.5px solid #B91C1C;background:#fff;color:#B91C1C;cursor:pointer}' +
    '@media print{.cer-notice,.cer-sum,.cer-tip,.cer-legacy{display:none!important}}';
  document.head.appendChild(css);

  try { syncAll(); } catch (x) { console.warn('[CER]', x); }
})();

;

/* ── src/student/start.js ── */
/* Runs last, after every module has hooked in. */
MRC_start();

;
