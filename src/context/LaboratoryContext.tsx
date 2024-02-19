import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface Patient {
  age?: number;
  company: string;
  cityDistrict: string;
  visionDefect?: number;
}

class Tube {
  static counter = 1;
  tubeId: number;
  patientInfo: Patient;

  constructor(patientInfo: Patient) {
    this.tubeId = Tube.counter++;
    this.patientInfo = patientInfo;
  }
}

export class Rack {
  static counter = 1;
  rackId: number;
  tubes: Tube[];

  constructor() {
    this.rackId = Rack.counter++;
    this.tubes = [];
  }

  addTube(tube: Tube) {
    if (this.checkRules(tube)) {
      this.tubes.push(tube);
      return this;
    } else {
      return undefined;
    }
  }

  removeTube(tubeId: number) {
    this.tubes = this.tubes.filter((tube) => tube.tubeId != tubeId);
  }

  checkRules(tube: Tube) {
    return !this.tubes.some(
      (existingTube) =>
        existingTube.patientInfo.age === tube.patientInfo.age ||
        existingTube.patientInfo.company === tube.patientInfo.company ||
        existingTube.patientInfo.cityDistrict ===
          tube.patientInfo.cityDistrict ||
        existingTube.patientInfo.visionDefect === tube.patientInfo.visionDefect
    );
  }
}

interface LaboratoryContextProps {
  tubes: Tube[];
  racks: Rack[];
  tubeRack: Map<number, number>;
  handleNewTube: (patientInfo: Patient) => void;
  handleAssignTubesToRacks: () => void;
}

const LaboratoryContext = createContext<LaboratoryContextProps | undefined>(
  undefined
);

export const LaboratoryContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [racks, setRacks] = useState<Rack[]>([]);
  const [tubes, setTubes] = useState<Tube[]>([]);
  const [tubeRack, setTubeRack] = useState<Map<number, number>>(new Map());

  const handleNewTube = (patientInfo: Patient): void => {
    const tube = new Tube(patientInfo);
    setTubes((prev) => [...prev, tube]);
  };

  const handleAssignTubesToRacks = (): void => {
    const tube = tubes.find((tube) => !tubeRack.get(tube.tubeId));

    if (!tube) return;

    let outputRack = Array.from(racks.values()).find((rack) => {
      return rack.addTube(tube);
    });

    if (!outputRack) {
      outputRack = new Rack();
      outputRack.tubes.push(tube);
      setRacks((prev) => [...prev, outputRack as Rack]);
    } else {
      setRacks((prev) =>
        prev.map((rack) =>
          outputRack && rack.rackId === outputRack.rackId ? outputRack : rack
        )
      );
    }

    const updatedTubeRack = new Map(tubeRack);
    updatedTubeRack.set(tube.tubeId, outputRack.rackId);
    setTubeRack(updatedTubeRack);
  };

  const racksAndTubesChanged = useRef({ racks, tubeRack });

  useEffect(() => {
    if (
      racksAndTubesChanged.current.racks !== racks &&
      racksAndTubesChanged.current.tubeRack !== tubeRack
    ) {
      handleAssignTubesToRacks();
      racksAndTubesChanged.current = { racks, tubeRack };
    }
  });

  const contextValue: LaboratoryContextProps = {
    tubes,
    racks,
    tubeRack,
    handleNewTube,
    handleAssignTubesToRacks,
  };

  return (
    <LaboratoryContext.Provider value={contextValue}>
      {children}
    </LaboratoryContext.Provider>
  );
};

export const useLaboratoryContext = () => {
  const context = useContext(LaboratoryContext);

  if (!context) {
    throw new Error("error for LaboratoryContext");
  }

  return context;
};
