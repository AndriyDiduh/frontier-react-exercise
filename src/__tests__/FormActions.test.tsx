import React from "react";
import Enzyme from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { SubmitAction } from "../components/FormActions";
 
Enzyme.configure({ adapter: new Adapter() });

describe("BUTTON: Submit action test", () => {
  it("Test click event", () => {
    const mockCallBack = jest.fn();

    const button = Enzyme.shallow(<SubmitAction handleSubmit={mockCallBack} />);
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
