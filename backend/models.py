from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import uuid
import secrets
import hashlib

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    date_of_birth = Column(String, nullable=True)
    gender = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="patient", index=True) # 'patient', 'doctor', 'admin'
    email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class SessionModel(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    refresh_token_hash = Column(String, index=True, nullable=False)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    is_revoked = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PasswordResetTokenModel(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    token_hash = Column(String, index=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuditLogModel(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=True)
    action = Column(String, nullable=False)
    timestamp = Column(String, nullable=False)
    ip_address = Column(String, default="127.0.0.1")
    status = Column(String, default="SUCCESS")

class PatientModel(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    blood_group = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    allergies = Column(Text)
    chronic_conditions = Column(Text)

class VitalModel(Base):
    __tablename__ = "vitals"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, index=True)
    timestamp = Column(String)
    vital_type = Column(String, index=True)
    value = Column(Float)
    secondary_value = Column(Float, nullable=True)
    unit = Column(String)
    status = Column(String)
    context = Column(String)
    notes = Column(Text, nullable=True)

class AppointmentModel(Base):
    __tablename__ = "appointments"

    id = Column(String, primary_key=True, index=True)
    doctor_id = Column(String)
    doctor_name = Column(String)
    doctor_specialty = Column(String)
    hospital = Column(String)
    patient_name = Column(String)
    date = Column(String)
    time_slot = Column(String)
    consultation_type = Column(String)
    status = Column(String, default="confirmed")
    fee = Column(Float)
    symptoms = Column(Text)
    notes = Column(Text, nullable=True)

DATABASE_URL = "sqlite:///./medicore.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def _seed_hash(password: str) -> str:
    salt = secrets.token_bytes(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
    return f"pbkdf2:sha256:100000${salt.hex()}${key.hex()}"

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Seed default Patient
        if not db.query(UserModel).filter(UserModel.email == "patient@medicore.ai").first():
            db.add(UserModel(
                id="usr-patient-1001",
                full_name="John Doe",
                email="patient@medicore.ai",
                phone="+91 98450 12345",
                date_of_birth="1984-05-12",
                gender="Male",
                password_hash=_seed_hash("Password123!"),
                role="patient",
                email_verified=True,
                is_active=True
            ))
        # Seed default Doctor
        if not db.query(UserModel).filter(UserModel.email == "doctor@medicore.ai").first():
            db.add(UserModel(
                id="usr-doctor-2001",
                full_name="Dr. Rajesh Sharma, MD",
                email="doctor@medicore.ai",
                phone="+91 99012 34567",
                date_of_birth="1978-08-20",
                gender="Male",
                password_hash=_seed_hash("DoctorPass123!"),
                role="doctor",
                email_verified=True,
                is_active=True
            ))
        # Seed default Admin
        if not db.query(UserModel).filter(UserModel.email == "admin@medicore.ai").first():
            db.add(UserModel(
                id="usr-admin-3001",
                full_name="System Administrator",
                email="admin@medicore.ai",
                phone="+91 98800 99999",
                date_of_birth="1980-01-01",
                gender="Other",
                password_hash=_seed_hash("AdminSecure2026!"),
                role="admin",
                email_verified=True,
                is_active=True
            ))
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()
