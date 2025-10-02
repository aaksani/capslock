# Bugs Found

## Bug #1: Phone Validation Accepts 11 Digits

### Steps to Reproduce
1. Navigate to https://test-qa.capslock.global
2. Fill ZIP code: `48823`
3. Select any interests (e.g., Independence)
4. Select any property type (e.g., Owned House)
5. Fill Name: `John Doe`
6. Fill Email: `test@example.com`
7. Click "Go To Estimate"
8. Fill Phone: `12345678901` (11 digits)
9. Click "Submit Your Request"

### Expected Result
- Form should reject the 11-digit phone number
- Error message should appear
- Form should NOT redirect to thank you page

### Actual Result
- Form accepts the 11-digit phone number
- Form submits successfully
- User is redirected to `/thankyou` page

---

**Note:** Requirements state "Phone number: must contain exactly 10 digits"  
The form correctly rejects 9 digits, empty phone, and letters – only 11 digits is broken.
