// src/pages/PreConsultationForm.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { savePreConsultation } from "../services/preConsultationService";
import FileUpload from "../components/FileUpload";
import "../css/preConsultation.css";

const SYMPTOMS_LIST = [
  "Fever", "Cold", "Cough", "Headache", "Chest Pain",
  "Vomiting", "Breathing Difficulty", "Fatigue", "Body Pain",
  "Stomach Pain", "Dizziness",
];

const CONDITIONS_LIST = [
  "Diabetes", "Blood Pressure", "Asthma", "Thyroid",
  "Heart Disease", "Kidney Disease", "None",
];

function PreConsultationForm() {
  // useParams reads the dynamic :appointmentId segment from the URL
  const { appointmentId } = useParams();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  // One big state object for the whole form, since it's all submitted together
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodGroup: "",
    phone: "",
    chiefComplaint: "",
    symptoms: [],
    symptomDuration: "",
    painLevel: 0,
    existingConditions: [],
    currentMedicines: "",
    allergies: "",
    lifestyle: [],
    questionsForDoctor: "",
  });

  const [files, setFiles] = useState({
    prescription: null,
    bloodReport: null,
    xray: null,
    mri: null,
    ecg: null,
  });

  // Generic handler for simple text/select/textarea inputs —
  // works for any field because it reads the field's `name` attribute
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handler for checkbox groups (symptoms, conditions, lifestyle) —
  // toggles a value in/out of an array
  function handleCheckboxToggle(field, value) {
    setFormData((prev) => {
      const currentValues = prev[field];
      const alreadySelected = currentValues.includes(value);

      return {
        ...prev,
        [field]: alreadySelected
          ? currentValues.filter((v) => v !== value) // remove it
          : [...currentValues, value],                // add it
      };
    });
  }

  function handleFileSelect(fileKey, file) {
    setFiles((prev) => ({ ...prev, [fileKey]: file }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Note: file bytes aren't uploaded (see FileUpload.jsx comment) —
      // we just record which files were selected, by name, for now
      const fileNames = Object.fromEntries(
        Object.entries(files).map(([key, file]) => [key, file?.name || null])
      );

      await savePreConsultation(appointmentId, {
        ...formData,
        patientId: currentUser.uid,
        uploadedFiles: fileNames,
      });

      showToast("Pre-consultation form submitted!", "success");
      navigate(`/summary/${appointmentId}`);
    } catch (err) {
      showToast("Failed to submit form. Please try again.", "error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="preconsult-page">
      <form className="preconsult-form" onSubmit={handleSubmit}>
        <h1>Smart Pre-Consultation Form</h1>
        <p className="preconsult-subtitle">
          Help your doctor prepare for your visit by sharing this information in advance.
        </p>

        {/* ===== PERSONAL INFORMATION ===== */}
        <section>
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div>
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
            </div>
            <div>
              <label>Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
        </section>

        {/* ===== CHIEF COMPLAINT ===== */}
        <section>
          <h2>Chief Complaint</h2>
          <label>What's the main reason for your visit?</label>
          <textarea
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            rows={4}
            required
          />
        </section>

        {/* ===== SYMPTOMS ===== */}
        <section>
          <h2>Symptoms</h2>
          <div className="checkbox-grid">
            {SYMPTOMS_LIST.map((symptom) => (
              <label key={symptom} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => handleCheckboxToggle("symptoms", symptom)}
                />
                {symptom}
              </label>
            ))}
          </div>
        </section>

        {/* ===== DURATION & PAIN LEVEL ===== */}
        <section>
          <div className="form-grid">
            <div>
              <label>Symptom Duration</label>
              <select name="symptomDuration" value={formData.symptomDuration} onChange={handleChange} required>
                <option value="">Select</option>
                {["Today", "2 Days", "3 Days", "1 Week", "2 Weeks", "1 Month", "More than 1 Month"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Pain Level: {formData.painLevel} / 10</label>
              <input
                type="range"
                name="painLevel"
                min="0"
                max="10"
                value={formData.painLevel}
                onChange={handleChange}
                className="pain-slider"
              />
            </div>
          </div>
        </section>

        {/* ===== EXISTING CONDITIONS ===== */}
        <section>
          <h2>Existing Medical Conditions</h2>
          <div className="checkbox-grid">
            {CONDITIONS_LIST.map((condition) => (
              <label key={condition} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.existingConditions.includes(condition)}
                  onChange={() => handleCheckboxToggle("existingConditions", condition)}
                />
                {condition}
              </label>
            ))}
          </div>
        </section>

        {/* ===== MEDICINES & ALLERGIES ===== */}
        <section>
          <div className="form-grid-2col">
            <div>
              <label>Current Medicines</label>
              <textarea
                name="currentMedicines"
                value={formData.currentMedicines}
                onChange={handleChange}
                rows={3}
                placeholder="List any medicines you're currently taking"
              />
            </div>
            <div>
              <label>Allergies</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                rows={3}
                placeholder="List any known allergies"
              />
            </div>
          </div>
        </section>

        {/* ===== LIFESTYLE ===== */}
        <section>
          <h2>Lifestyle</h2>
          <div className="checkbox-grid">
            {["Smoking", "Alcohol", "Regular Exercise"].map((item) => (
              <label key={item} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.lifestyle.includes(item)}
                  onChange={() => handleCheckboxToggle("lifestyle", item)}
                />
                {item}
              </label>
            ))}
          </div>
        </section>

        {/* ===== DOCUMENT UPLOADS ===== */}
        <section>
          <h2>Upload Documents</h2>
          <p className="section-note">Optional — attach any relevant reports.</p>
          <div className="form-grid">
            <FileUpload label="Prescription" file={files.prescription} onFileSelect={(f) => handleFileSelect("prescription", f)} />
            <FileUpload label="Blood Report" file={files.bloodReport} onFileSelect={(f) => handleFileSelect("bloodReport", f)} />
            <FileUpload label="X-Ray" file={files.xray} onFileSelect={(f) => handleFileSelect("xray", f)} />
            <FileUpload label="MRI" file={files.mri} onFileSelect={(f) => handleFileSelect("mri", f)} />
            <FileUpload label="ECG" file={files.ecg} onFileSelect={(f) => handleFileSelect("ecg", f)} />
          </div>
        </section>

        {/* ===== QUESTIONS FOR DOCTOR ===== */}
        <section>
          <h2>Questions for Doctor</h2>
          <textarea
            name="questionsForDoctor"
            value={formData.questionsForDoctor}
            onChange={handleChange}
            rows={3}
            placeholder="Anything specific you'd like to ask?"
          />
        </section>

        <button type="submit" disabled={submitting} className="preconsult-submit">
          {submitting ? "Submitting..." : "Submit Pre-Consultation Form"}
        </button>
      </form>
    </div>
  );
}

export default PreConsultationForm;