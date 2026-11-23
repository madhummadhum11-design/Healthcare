from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
import datetime
import re

EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"

# --- Health & Vital Schemas ---
class VitalCreate(BaseModel):
    timestamp: str
    type: str
    value: float
    secondaryValue: Optional[float] = None
    unit: str
    status: str
    notes: Optional[str] = None
    context: Optional[str] = 'resting'

class VitalResponse(VitalCreate):
    id: str

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = 'English'
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    text: str
    isEmergency: bool
    emergencyType: Optional[str] = None
    suggestedActions: Optional[List[str]] = []
    medicalReferences: Optional[List[str]] = []

class AppointmentCreate(BaseModel):
    doctorId: str
    doctorName: str
    doctorSpecialty: str
    doctorAvatar: str
    hospital: str
    patientName: str
    date: str
    timeSlot: str
    type: str = 'video'
    fee: float
    symptoms: str

class AppointmentResponse(AppointmentCreate):
    id: str
    status: str
    notes: Optional[str] = None

# --- Authentication & User Management Schemas ---
class UserRegister(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100)
    email: str
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    password: str = Field(..., min_length=8)
    role: Optional[str] = "patient" # 'patient' or 'doctor'

    @field_validator('email')
    def validate_email(cls, v):
        if not re.match(EMAIL_REGEX, v.strip()):
            raise ValueError('Invalid email format')
        return v.strip().lower()

class UserLogin(BaseModel):
    email: str
    password: str
    rememberMe: Optional[bool] = False

    @field_validator('email')
    def validate_email(cls, v):
        if not re.match(EMAIL_REGEX, v.strip()):
            raise ValueError('Invalid email format')
        return v.strip().lower()

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = None
    email: str
    name: str
    picture: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: str

    @field_validator('email')
    def validate_email(cls, v):
        if not re.match(EMAIL_REGEX, v.strip()):
            raise ValueError('Invalid email format')
        return v.strip().lower()

class ResetPasswordRequest(BaseModel):
    token: str
    newPassword: str = Field(..., min_length=8)

class UserOut(BaseModel):
    id: str
    fullName: str
    email: str
    phone: Optional[str] = None
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    role: str
    emailVerified: bool
    isActive: bool
    createdAt: Optional[datetime.datetime] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    accessToken: str
    refreshToken: str
    tokenType: str = "bearer"
    user: UserOut

class RefreshTokenRequest(BaseModel):
    refreshToken: str

class AuditLogOut(BaseModel):
    id: str
    userId: Optional[str] = None
    action: str
    timestamp: str
    ipAddress: str
    status: str
