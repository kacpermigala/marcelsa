import TubeInput from "components/TubeInput";
import TubeList from "components/TubeList";
import { LaboratoryContextProvider } from "context/LaboratoryContext";

const Laboratory = () => {
  return (
    <LaboratoryContextProvider>
      <TubeInput />
      <TubeList />
    </LaboratoryContextProvider>
  );
};

export default Laboratory;
