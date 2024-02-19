import { useLaboratoryContext } from "context/LaboratoryContext";
import React from "react";

const TubeList: React.FC = () => {
  const { tubes, tubeRack, handleAssignTubesToRacks } = useLaboratoryContext();

  if (!tubes.length) return <div className="tube-list">Tubes list empty!</div>;

  return (
    <div className="tube-list">
      <div className="place-button">
        <button
          onClick={handleAssignTubesToRacks}
          data-testid="place-tubs-button"
        >
          Place Tubes
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>AGE</th>
            <th>COMPANY</th>
            <th>CITY DISTRICT</th>
            <th>VISION DEFECT</th>
            <th>RACK ID</th>
          </tr>
        </thead>
        <tbody>
          {tubes.map((tube) => (
            <tr key={`tube-${tube.tubeId}`}>
              <td>{tube.tubeId}</td>
              <td>{tube.patientInfo.age}</td>
              <td>{tube.patientInfo.company}</td>
              <td>{tube.patientInfo.cityDistrict}</td>
              <td>{tube.patientInfo.visionDefect}</td>
              <td data-testid="tube-rack-id">{tubeRack.get(tube.tubeId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TubeList;
