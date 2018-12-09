/* eslint-disable no-undef */

import chai from "chai";
import getQueryStringParameterByName from "./getQueryStringParameterByName";
chai.should();

describe("getQueryStringParameterByName.js", function () {
  it("should return true if matching query name is set to true", function () {
    let isFound = getQueryStringParameterByName("useMockApi", "http://domain-name.com?useMockApi=true");
    isFound.should.be.a("string", "true");
  })
})
