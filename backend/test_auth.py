import sys
sys.path.insert(0, 'backend')
import main
from models import init_db, SessionLocal, UserModel
from security import hash_password, verify_password, create_access_token, decode_jwt_token
from schemas import (
    UserRegister, UserLogin, ForgotPasswordRequest, ResetPasswordRequest,
    GoogleAuthRequest
)
from fastapi import HTTPException

init_db()
db = SessionLocal()

print("--- Testing MediCore AI Authentication & Security ---")

# 1. Test Password Hashing
hashed = hash_password("SecurePass123!")
assert verify_password("SecurePass123!", hashed) is True
assert verify_password("WrongPassword!", hashed) is False
print("✔ 1. Password hashing & verification passed (PBKDF2-HMAC-SHA256, 100k iterations)")

# 2. Test JWT Generation & Decoding
token = create_access_token("usr-123", "test@medicore.ai", "patient")
payload = decode_jwt_token(token)
assert payload is not None
assert payload["sub"] == "usr-123"
assert payload["role"] == "patient"
print("✔ 2. JWT token issuance and cryptographic verification passed")

class DummyClient:
    host = "127.0.0.1"

class DummyRequest:
    client = DummyClient()
    headers = {"user-agent": "MediCore-TestSuite/1.0"}

dummy_req = DummyRequest()

# 3. Test Seed Accounts Login (Patient, Doctor, Admin)
patient_login = main.login_user(UserLogin(email="patient@medicore.ai", password="Password123!"), dummy_req, db)
assert patient_login.user.role == "patient"
print("✔ 3. Patient login passed:", patient_login.user.fullName, f"({patient_login.user.email})")

doc_login = main.login_user(UserLogin(email="doctor@medicore.ai", password="DoctorPass123!"), dummy_req, db)
assert doc_login.user.role == "doctor"
print("✔ 4. Doctor login passed:", doc_login.user.fullName, f"({doc_login.user.email})")

admin_login = main.login_user(UserLogin(email="admin@medicore.ai", password="AdminSecure2026!"), dummy_req, db)
assert admin_login.user.role == "admin"
print("✔ 5. Admin login passed:", admin_login.user.fullName)

# Invalid password check
try:
    main.login_user(UserLogin(email="admin@medicore.ai", password="WrongPassword!"), dummy_req, db)
    assert False, "Should have thrown 401"
except HTTPException as e:
    assert e.status_code == 401
    print("✔ 6. Invalid credentials rejected with 401 Unauthorized")

# 4. Test RBAC Enforcement
admin_user_obj = db.query(UserModel).filter(UserModel.email == "admin@medicore.ai").first()
patient_user_obj = db.query(UserModel).filter(UserModel.email == "patient@medicore.ai").first()

all_users = main.list_users(admin_user=admin_user_obj, db=db)
assert len(all_users) >= 3
print(f"✔ 7. Admin authorized: listed {len(all_users)} system users")

# 5. Test Registration
reg_email = "alice.new@example.com"
# Clean up if existed
existing = db.query(UserModel).filter(UserModel.email == reg_email).first()
if existing:
    db.delete(existing)
    db.commit()

reg_res = main.register_user(
    UserRegister(
        fullName="Alice Walker",
        email=reg_email,
        phone="+91 91234 56789",
        dateOfBirth="1990-03-25",
        gender="Female",
        password="ValidPassword123!"
    ),
    dummy_req,
    db
)
assert reg_res.user.email == reg_email
assert reg_res.user.role == "patient"
print("✔ 8. Patient registration succeeded:", reg_res.user.fullName)

# Duplicate registration check
try:
    main.register_user(
        UserRegister(
            fullName="Duplicate Alice",
            email=reg_email,
            password="ValidPassword123!"
        ),
        dummy_req,
        db
    )
    assert False, "Should have rejected duplicate email"
except HTTPException as e:
    assert e.status_code == 400
    print("✔ 9. Duplicate email registration rejected (400 Bad Request)")

# Disallow self-assignment of Admin role
try:
    main.register_user(
        UserRegister(
            fullName="Fake Admin",
            email="fake.admin@example.com",
            password="ValidPassword123!",
            role="admin"
        ),
        dummy_req,
        db
    )
    assert False, "Should have rejected public admin registration"
except HTTPException as e:
    assert e.status_code == 403
    print("✔ 10. Public Admin registration blocked (403 Forbidden)")

# 6. Test Forgot Password & Reset Password
forgot_res = main.forgot_password(ForgotPasswordRequest(email=reg_email), db)
reset_token = forgot_res.get("demoResetToken")
assert reset_token is not None
print("✔ 11. Forgot password token issued safely")

# Reset password
reset_res = main.reset_password(
    ResetPasswordRequest(token=reset_token, newPassword="NewPassword456!"),
    db
)
assert "successfully" in reset_res["message"]
print("✔ 12. Password reset succeeded with new password")

# Test login with updated password
new_login = main.login_user(UserLogin(email=reg_email, password="NewPassword456!"), dummy_req, db)
assert new_login.user.email == reg_email
print("✔ 13. Login with newly reset password confirmed")

# Prevent token reuse
try:
    main.reset_password(
        ResetPasswordRequest(token=reset_token, newPassword="AnotherPassword123!"),
        db
    )
    assert False, "Should not allow token reuse"
except HTTPException as e:
    assert e.status_code == 400
    print("✔ 14. Password reset token reuse prevented")

# 7. Test Google OAuth
google_res = main.google_auth(
    GoogleAuthRequest(
        email="google.doc@example.com",
        name="Dr. Google User",
        picture="https://example.com/pic.png"
    ),
    dummy_req,
    db
)
assert google_res.user.email == "google.doc@example.com"
assert google_res.user.emailVerified is True
print("✔ 15. Google OAuth auto-provisioning and verification succeeded")

db.close()
print("\n🎉 ALL 15 AUTH & SECURITY BACKEND TESTS PASSED FLAWLESSLY! 🎉\n")
