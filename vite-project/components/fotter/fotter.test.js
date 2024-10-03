import React from "react";
import { shallow } from "enzyme";
import Fotter from "./fotter";

describe("Fotter", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Fotter />);
    expect(wrapper).toMatchSnapshot();
  });
});
