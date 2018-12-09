import { getQueryStringParameterByName } from "../utils";

export default function getBaseUrl() {
  return getQueryStringParameterByName("useMockApi") ? "http://localhost:3001/" : "/";
}


