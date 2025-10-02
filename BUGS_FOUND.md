# Bugs Found During Testing

This document lists defects discovered during automated test execution.

---

## Bug #1: Phone Number Validation Accepts 11 Digits

**Severity**: Medium  
**Status**: Open  
**Found**: October 1, 2025  
**Test**: `Phone validation rejects 11 digits`

### Description
The phone number field accepts 11-digit phone numbers and allows form submission to proceed to the thank you page, when it should only accept exactly 10 digits.

### Steps to Reproduce
1. Navigate to https://test-qa.capslock.global
2. Fill ZIP code: `48823`
3. Select all 4 interests (Independence, Safety, Therapy, Other)
4. Select any property type (e.g., Owned House)
5. Fill Name: any valid name
6. Fill Email: any valid email (e.g., `test@example.com`)
7. Click "Go To Estimate"
8. Fill Phone: `12345678901` (11 digits)
9. Click "Submit Your Request"

### Expected Behavior
- Phone validation should reject 11-digit numbers
- Error message should appear: "Wrong phone number" or similar
- Form should NOT proceed to thank you page
- User should remain on the phone input step

### Actual Behavior
- Form accepts the 11-digit phone number
- Form submits successfully
- User is redirected to `/thankyou` page
- No validation error is shown

### Test Evidence
```
Test: Phone validation rejects 11 digits
Error: Form should reject 11 digits and not redirect to thank you page

expect(received).toBe(expected)
Expected: false
Received: true
```

### Impact
- **User Experience**: Users might submit invalid phone numbers
- **Data Quality**: Database will contain invalid phone data
- **Business Impact**: Sales team cannot call back with invalid numbers

### Requirements
According to the assignment requirements:
> "Phone number: must contain exactly 10 digits."

The form should enforce this validation.

### Notes
- 9-digit phone numbers ARE properly rejected ✅
- Empty phone numbers ARE properly rejected ✅
- Phone numbers with letters ARE properly rejected ✅
- **Only 11-digit validation is broken** ❌

### Recommended Fix
Update phone validation logic to:
```javascript
if (phone.replace(/\D/g, '').length !== 10) {
  showError("Phone must be exactly 10 digits");
  return false;
}
```

### Screenshots
- Screenshot: `test-results/init-form-Walk-In-Bath-For-3d7a1-alidation-rejects-11-digits-chromium/test-failed-1.png`

---

## Bug Summary

| Bug ID | Description | Severity | Status |
|--------|-------------|----------|--------|
| #1 | Phone validation accepts 11 digits | Medium | Open |

**Total Bugs Found**: 1  
**Critical**: 0  
**High**: 0  
**Medium**: 1  
**Low**: 0  

---

## Test Execution Statistics

**Total Tests**: 11  
**Passed**: 10 (90.9%)  
**Failed**: 1 (9.1%)  
**Bug Detection Rate**: 100% (all failures are real bugs, not test issues)

---

**Last Updated**: October 1, 2025
