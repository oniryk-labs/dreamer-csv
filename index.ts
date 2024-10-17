import { HttpContext } from "@adonisjs/core/http";
import Papa from "papaparse";

export type CSVOptions = {
  filename?: string;
  delimiter?: string;
  columns?: string[];
  i18n?: Record<string, string>;
};

function translateColumns(
  items: Record<string, string>[],
  i18n: Record<string, string> = {},
) {
  return items.map((item) => {
    const newItem: Record<string, string> = {};
    Object.keys(item).forEach((key) => {
      newItem[i18n[key] || key] = item[key];
    });
    return newItem;
  });
}

export default function csv(options: CSVOptions = {}) {
  const handler = function ({ response }: HttpContext, rows: unknown[]) {
    let items = rows.map((c: any) => (c.serialize ? c.serialize() : c));

    if (options.i18n) {
      items = translateColumns(items, options.i18n);
    }

    const { filename, ...params } = options;
    const content = Papa.unparse(items, params);
    const name = options.filename || "export.csv";

    response.header("Content-Type", "text/csv");
    response.header("Content-Disposition", `attachment; filename="${name}"`);
    response.send(content);
  };

  handler.formatName = "csv";
  return handler;
}
