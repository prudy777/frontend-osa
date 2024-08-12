import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    testType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dateOfBirth,
        email: formData.email,
        phone: formData.phone,
        test_type: formData.testType,
      });
      alert("Registration Submitted Successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        testType: "",
      });
      if (onRegisterSuccess) {
        onRegisterSuccess(); // Trigger the callback
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="registration-page">
      <div className="form-container">
        <h2>Patient Registration for Testing</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="testType">Laboratory Investigation</label>
            <select
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              required
            >
              <option value="">Select Test Type</option>
              <option value="bloodTest">Blood Test</option>
              <option value="xray">X-Ray</option>
              <option value="covid19">COVID-19</option>
              <option value="malariaParasiteRapidAg">
                Malaria Parasite (Rapid Ag)
              </option>
              <option value="malariaBloodFilm">Malaria blood film</option>
              <option value="urinalysis">Urinalysis</option>
              <option value="urineMCS">Urine M/C/S</option>
              <option value="hvsMCS">HVS M/C/S</option>
              <option value="semenAnalysis">Semen Analysis</option>
              <option value="semenAnalysisMCS">Semen analysis + M/C/S</option>
              <option value="stoolAnalysis">Stool Analysis</option>
              <option value="stoolAnalysisMCS">Stool analysis + M/C/S</option>
              <option value="sputumMCS">Sputum M/C/S</option>
              <option value="csfMCS">CSF M/C/S</option>
              <option value="urethralSwabMCS">Urethral Swab M/C/S</option>
              <option value="woundSwabMCS">Wound swab M/C/S</option>
              <option value="pusMCS">Pus M/C/S</option>
              <option value="bloodCulture">Blood culture</option>
              <option value="occultBloodTestStool">
                Occult blood test (stool)
              </option>
              <option value="fungiElement">Fungi element</option>
              <option value="microfilaria">Microfilaria</option>
              <option value="chlamydiaTest">Chlamydia Test</option>
              <option value="mantouxTest">Mantoux test</option>
              <option value="fullBloodCount">Full Blood Count (FBC)</option>
              <option value="haemoglobin">Haemoglobin (Hb)</option>
              <option value="pcv">PCV</option>
              <option value="wbcCount">
                WBC Count (Total and Differential)
              </option>
              <option value="bloodFilmExamination">
                Blood Film Examination/ Comment
              </option>
              <option value="genotype">Genotype</option>
              <option value="bloodGroupRhesusGrouping">
                Blood Group and Rhesus Grouping
              </option>
              <option value="esr">ESR</option>
              <option value="sickleCellTest">Sickle cell Test</option>
              <option value="directIndirectCoombsTest">
                Direct & Indirect Coomb's Test
              </option>
              <option value="clottingProfile">Clotting Profile</option>
              <option value="rhesusAntibodyTitre">Rhesus Antibody Titre</option>
              <option value="bleedingTime">Bleeding time</option>
              <option value="cd4Count">CD4 count</option>
              <option value="pregnancyTestBHCG">Pregnancy test [BHCG]</option>
              <option value="typhoidTest">Typhoid test</option>
              <option value="syphilisVdrlTest">Syphilis (VDRL) test</option>
              <option value="hivScreeningTest">HIV Screening test</option>
              <option value="hivConfirmatory">HIV confirmatory</option>
              <option value="hepatitisA">Hepatitis A</option>
              <option value="hepatitisBCScreening">
                Hepatitis B & C Screening
              </option>
              <option value="hepatitisBPanel">Hepatitis B panel</option>
              <option value="hepatitisBDNAViralLoad">
                Hepatitis B DNA Viral Load
              </option>
              <option value="rheumatoidFactor">Rheumatoid Factor</option>
              <option value="hpyloriUlcerTest">H. pylori (Ulcer) test</option>
              <option value="torchScreening">Torch Screening</option>
              <option value="gonorrheaRapidTest">Gonorrhea Rapid test</option>
              <option value="herpesSimplexVirus">
                Herpes Simplex Virus (HSV)
              </option>
              <option value="serumTuberculosis">Serum Tuberculosis (TB)</option>
              <option value="thyroidFunctionTest">
                Thyroid Function Test (T3T4 & TSH)
              </option>
              <option value="estrogenE2">Estrogen (E2)</option>
              <option value="prolactin">Prolactin</option>
              <option value="progesterone">Progesterone</option>
              <option value="lh">LH</option>
              <option value="fsh">FSH</option>
              <option value="testosterone">Testosterone</option>
              <option value="psa">PSA (prostate cancer)</option>
              <option value="ca125">CA-125 (Ovarian cancer marker)</option>
              <option value="ca153">CA-15-3 (Breast cancer marker)</option>
              <option value="ca199">
                CA-19-9 (G.I.T Pancreatic cancer marker)
              </option>
              <option value="cea">CEA (GIT Lung Breast)</option>
              <option value="antimullerianHormone">
                Antimullerian Hormone (Auto-immune disease)
              </option>
              <option value="ana">ANA (Anti Nuclear Antibody)</option>
              <option value="g6pd">G6PD</option>
              <option value="afp">AFP [Alfa Feto Protein]</option>
              <option value="ckmb">CKMB</option>
              <option value="troponinI">Troponin I</option>
              <option value="troponinT">Troponin T</option>
              <option value="ovulationProfile">Ovulation Profile</option>
              <option value="menstrualDisorder">Menstrual disorder</option>
              <option value="hormonalProfileMale">
                Hormonal Profile (Male)
              </option>
              <option value="hormonalProfileFemale">
                Hormonal Profile (Female)
              </option>
              <option value="fastingRandomBloodSugarTest">
                Fasting/Random Blood Sugar test
              </option>
              <option value="2hpp">2HPP</option>
              <option value="ogtt">OGTT</option>
              <option value="hba1c">HBA1C</option>
              <option value="csfGlucose">CSF Glucose</option>
              <option value="csfProtein">CSF Protein</option>
              <option value="fullElectrolytes">Full Electrolytes</option>
              <option value="kidneyFunctionTest">
                Kidney Function Test (E/U/Cr)
              </option>
              <option value="creatinineClearance">Creatinine clearance</option>
              <option value="calcium">Calcium</option>
              <option value="phosphorous">Phosphorous</option>
              <option value="magnesium">Magnesium</option>
              <option value="liverFunctionTest">
                Liver Function Test (LFT)
              </option>
              <option value="totalDirectBilirubinTest">
                Total & Direct Bilirubin test
              </option>
              <option value="globulin">Globulin</option>
              <option value="albumin">Albumin</option>
              <option value="totalProtein">Total Protein</option>
              <option value="amylase">Amylase</option>
              <option value="lipidProfile">
                Lipid Profile (Cholesterol Trig HDL LDL)
              </option>
              <option value="uricAcid">Uric Acid</option>
              <option value="papSmear">PAP smear</option>
              <option value="drugOfAbuseTest">Drug of abuse test</option>
              <option value="infectionScreeningTests">
                Infection Screening tests
              </option>
              <option value="premaritalCounsellingTesting">
                Pre-marital counselling and Testing
              </option>
              <option value="preemploymentScreening">
                Pre-employment screening
              </option>
              <option value="domesticStaffScreening">
                Domestic staff screening
              </option>
              <option value="infertilityScreening">
                Infertility screening
              </option>
              <option value="comprehensiveHealthAssessmentTests">
                Comprehensive health assessment tests
              </option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
