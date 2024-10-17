import assert from "node:assert";
import { test } from "node:test";
import csv from "../index";
import { responseProxy } from "./utils/response-proxy";

test("generate csv form a array of objects", () => {
  const data = [
    {
      "col-1": "col-1-value",
      "col-2": "col-2-value",
      "col-3": "col-3-value;",
      "col-4": "col-4-value;",
    },
  ];

  const response = responseProxy();

  csv({ delimiter: ";", columns: ["col-1", "col-4"] })(
    { response } as any,
    data,
  );

  assert.strictEqual(
    response.state.body,
    'col-1;col-4\r\ncol-1-value;"col-4-value;"',
  );
});

test("generate csv translating columns", () => {
  const data = [
    {
      "col-1": "col-1-value",
      "col-2": "col-2-value",
    },
  ];

  const response = responseProxy();

  csv({ delimiter: ";", i18n: { "col-1": "column-one" } })(
    { response } as any,
    data,
  );

  assert.strictEqual(
    response.state.body,
    "column-one;col-2\r\ncol-1-value;col-2-value",
  );
});
