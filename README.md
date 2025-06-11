
# 💪 FitScan – Gym Management System (UI Prototype)

**Fitscan** is a **dual-platform** (web + mobile) smart gym management system with **IoT integration** (Raspberry Pi) for access control. This project focuses on front-end features like member management, check-ins, weight tracking, and role-based views.

## 📸 UI Preview
[🔗 FitScan_UI_Preview.pdf](https://github.com/jvbkishore/fitscan-ui/blob/40ff9796d1847b338832928854b01aeec9dd5c42/src/assets/Fitscan_UI_Preview.pdf)



It serves:

1. **Gym Owners/Staff** (Web Dashboard)
2. **Gym Members** (Mobile App)
3. **Sales Teams** (Onboarding Portal)



### **🔑 Core Features (Implemented/Planned)**

#### **1. User Management**
  - Gym owner dashboards (members, attendance, payments)  
  - Member profiles with tiered access (premium locks)  
  - Employee role-based access (trainers, receptionists)  
  - Sales executive onboarding flows  

#### **2. QR-Based Access Control**  
  - QR code generation in mobile app  
  - Basic validation logic  
  - Raspberry Pi integration for physical lock control  
  - Time-based OTP validation API  

#### **3. Attendance & Weight Tracking** *(New Feature)*  
  - Weight trend graphs (LineChart)  
  - Daily weight logging interface  
  - Auto-link weight data to attendance sessions  
  - Progress reports (PDF export)  

#### **4. IoT Integration**   
  - Hardware specs for QR scanners  
  - Electromagnetic lock API endpoints  
  - Fail-safe mechanisms (offline mode)  

#### **5. Monetization**  
  - Ad slots in dashboard/app  
  - Premium feature unlocks (e.g., health stats)  

---

### **📱 Platform-Specific Features**

| **Web (Owner Dashboard)**       | **Mobile (Member App)**          |
|----------------------------------|----------------------------------|
| Member onboarding                | QR code generation              |
| Attendance analytics             | Check-in history                |
| Equipment management             | Weight tracking                 |
| Payment processing               | Subscription status             |
| Staff scheduling                 | Notifications                   |

---

### **⚙️ Technical Stack**
- **Frontend**: React (Web)
- **Backend**: .net core API & Postgre Sql DB  
- **IoT**: Raspberry Pi + Python scripts  
- **Charts**: Recharts (for analytics)  
- **Auth**: JWT token Auth  




