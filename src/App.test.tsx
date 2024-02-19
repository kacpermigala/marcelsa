import { fireEvent, render, screen } from "@testing-library/react";
import Laboratory from "components/Laboratory";
import { Rack } from "context/LaboratoryContext";

const initialData = [
  {
    age: 10,
    company: "Intel",
    cityDistrict: "Orlando",
    visionDefect: 2.5,
  },
  {
    age: 15,
    company: "AMD",
    cityDistrict: "NY",
    visionDefect: 2,
  },
  {
    age: 16,
    company: "Intel",
    cityDistrict: "Kansas",
    visionDefect: 4,
  },
  {
    age: 11,
    company: "Nvidia",
    cityDistrict: "Miami",
    visionDefect: -5,
  },
];

const addDataForTubes = (data: any) => {
  data.forEach((obj: any) => {
    fireEvent.change(screen.getByLabelText("Age:"), {
      target: { value: obj.age },
    });
    fireEvent.change(screen.getByLabelText("Company:"), {
      target: { value: obj.company },
    });
    fireEvent.change(screen.getByLabelText("City District:"), {
      target: { value: obj.cityDistrict },
    });
    fireEvent.change(screen.getByLabelText("Vision Defect:"), {
      target: { value: obj.visionDefect },
    });
    fireEvent.click(screen.getByText("Add Tube"));
  });
};

describe("App", () => {
  beforeEach(() => {
    Rack.counter = 1;
  });

  describe("the same company", () => {
    const expectedOutput = [1, 1, 2, 1];

    it("fills racks correctly", () => {
      render(<Laboratory />);
      addDataForTubes(initialData);

      const placeBtn = screen.getByTestId("place-tubs-button");
      fireEvent.click(placeBtn);

      const rackIds = screen
        .getAllByTestId("tube-rack-id")
        .map((el) => Number(el.textContent));
      expect(rackIds).toEqual(expectedOutput);
    });
  });

  describe("the same age", () => {
    const newData = [
      {
        age: 11,
        company: "Opel",
        cityDistrict: "London",
        visionDefect: -1.19,
      },
      {
        age: 27,
        company: "BMW",
        cityDistrict: "Paris",
        visionDefect: -3.19,
      },
    ];

    const expectedOutput = [1, 1, 2, 1, 2, 1];

    it("fills racks correctly", () => {
      render(<Laboratory />);
      addDataForTubes([...initialData, ...newData]);

      const placeBtn = screen.getByTestId("place-tubs-button");
      fireEvent.click(placeBtn);
      const rackIds = screen
        .getAllByTestId("tube-rack-id")
        .map((el) => Number(el.textContent));
      expect(rackIds).toEqual(expectedOutput);
    });
  });

  describe("the same city district", () => {
    const newData = [
      {
        age: 39,
        company: "Opel",
        cityDistrict: "NY",
        visionDefect: -1.19,
      },
      {
        age: 27,
        company: "BMW",
        cityDistrict: "Paris",
        visionDefect: -3.19,
      },
    ];

    const expectedOutput = [1, 1, 2, 1, 2, 1];

    it("fills racks correctly", () => {
      render(<Laboratory />);
      addDataForTubes([...initialData, ...newData]);

      const placeBtn = screen.getByTestId("place-tubs-button");
      fireEvent.click(placeBtn);
      const rackIds = screen
        .getAllByTestId("tube-rack-id")
        .map((el) => Number(el.textContent));
      expect(rackIds).toEqual(expectedOutput);
    });
  });

  describe("the same vision defect", () => {
    const newData = [
      {
        age: 39,
        company: "Opel",
        cityDistrict: "Paris",
        visionDefect: 4,
      },
      {
        age: 27,
        company: "BMW",
        cityDistrict: "Warsaw",
        visionDefect: -5,
      },
    ];

    const expectedOutput = [1, 1, 2, 1, 1, 2];

    it("fills racks correctly", () => {
      render(<Laboratory />);
      addDataForTubes([...initialData, ...newData]);

      const placeBtn = screen.getByTestId("place-tubs-button");
      fireEvent.click(placeBtn);
      const rackIds = screen
        .getAllByTestId("tube-rack-id")
        .map((el) => Number(el.textContent));
      expect(rackIds).toEqual(expectedOutput);
    });
  });
});
