# Implementation Guide: Patient Record Continuity & Returning Patient Intelligence

This document outlines the strategy for ensuring that doctors can recognize and retrieve the full medical history of returning patients using the **Medical Record Number (MRN)** system.

---

## 1. Core Identity: The MRN System
The `medicalRecordNumber` (MRN) in the `Patient` model serves as the unique, immutable anchor for all clinical data.

- **Storage:** `Patient.js` model handles MRN generation.
- **Lookup:** Any search by Mobile Number or Name should resolve to the `patientId` linked to the MRN.
- **Primary Goal:** Prevent duplicate records for the same physical person, even after years of absence.

## 2. Longitudinal Data Aggregation
To show a patient's history, the system must perform a **Cross-Model Join**. When a patient profile is opened, the backend should aggregate data from the following sources:

| Data Source | Model Reference | Key Information to Fetch |
| :--- | :--- | :--- |
| **Consultations** | `Prescription.js` | Diagnosis, Medications, Advice, Date of Visit |
| **Triage** | `TriageRecord.js` | Vitals (BP, HR, SpO2) at the time of entry |
| **Laboratory** | `LabReport.js` | Historical test results and diagnostic trends |
| **Laboratory** | `LabReport.js` | Historical test results and diagnostic trends |
| **Billing** | `Bill.js` | Previous payment history and service usage |

## 3. UI/UX: The Clinical Timeline
Instead of fragmented lists, the "Returning Patient" view should feature a **Clinical Timeline**.

- **Chronological Feed:** A vertical timeline showing every interaction (Appointment -> Triage -> Prescription -> Lab Report).
- **"Last Seen" Badge:** A prominent header showing exactly when the current doctor last saw this patient.
- **Comparison View:** Ability to see "Current Vitals" side-by-side with "Vitals from 1 Year Ago" to track health trends.

## 4. Returning Patient Intelligence (Logic)
When Doctor X opens Patient A’s record after 12+ months:

1.  **Automatic Recall:**
    - Query: `Prescription.find({ patientId: A, doctorId: X }).sort({ createdAt: -1 }).limit(1)`
    - *Purpose:* Immediately show the doctor what *they* specifically treated the patient for last time.
2.  **Summary Card:**
    - Display **Active Allergies** and **Chronic Conditions** at the top level of the screen.
    - Highlight **Missed Follow-ups** if any exist in the `Appointment` history.
3.  **Global History Access:**
    - If Patient A saw Doctor Y in the interim, Doctor X should be able to view those notes to maintain "Continuity of Care."

## 5. Implementation Steps (Phased)
1.  **Phase 1:** Create an API endpoint `/api/patients/:id/history` that returns a sorted list of all related documents.
2.  **Phase 2:** Implement a "Patient Dashboard" component in the frontend that visualizes this data as a timeline.
3.  **Phase 3:** Add "Intelligence Tags" (e.g., "Frequent Visitor", "Allergic", "Long-term Follow-up").

---
**Status:** Design Phase
**Associated Models:** `Patient`, `Prescription`, `TriageRecord`, `Appointment`
