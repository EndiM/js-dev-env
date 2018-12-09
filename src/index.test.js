/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { expect } from "chai";
import jsdom from "jsdom";
import fs from "fs";
const { JSDOM } = jsdom;

describe("index.js", function () {
  it("should return html markup with inner text Hello Friend", function () {
    const index = fs.readFileSync("./src/index.html", "utf-8");
    const { window } = new JSDOM(index);
    const h1 = window.document.getElementsByClassName("header-title")[0];
    expect(h1.innerHTML).to.equal("Hello Friend");
    window.close();
  })
});
