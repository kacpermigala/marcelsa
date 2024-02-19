import { Patient, useLaboratoryContext } from "context/LaboratoryContext";
import React, { ChangeEvent, FormEvent, useState } from "react";

const defaultPatientInfo = {
  age: undefined,
  company: "",
  cityDistrict: "",
  visionDefect: undefined,
};

const TubeInput: React.FC = () => {
  const { handleNewTube } = useLaboratoryContext();

  const [patientInfo, setPatientInfo] = useState<Patient>(defaultPatientInfo);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleNewTube(patientInfo);
    setPatientInfo(defaultPatientInfo);
  };

  return (
    <div className="tube-form">
      <h1>Add tube</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Age:
            <input
              type="number"
              name="age"
              min={0}
              max={100}
              value={patientInfo.age === undefined ? "" : patientInfo.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={patientInfo.company}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            City District:
            <input
              type="text"
              name="cityDistrict"
              value={patientInfo.cityDistrict}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Vision Defect:
            <input
              type="number"
              step="0.01"
              name="visionDefect"
              value={
                patientInfo.visionDefect === undefined
                  ? ""
                  : patientInfo.visionDefect
              }
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <button type="submit">Add Tube</button>
        </div>
      </form>
    </div>
  );
};

export default TubeInput;
