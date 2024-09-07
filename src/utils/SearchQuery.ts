import queryString from "query-string";

export class SearchQuery {
  static arrayFormat(key: string, values: Array<string | number>): string {
    return queryString.stringify({[key]: values}, {arrayFormat: "comma"});
  }

  static pagination({limit = 10, page = 1, skip = 0, order = "asc", property = ""}: Partial<{
    page: number;
    skip: number;
    limit: number;
    order: "asc" | "desc";
    property: string;
  }>): string {
    return queryString.stringify(
      {page, limit, skip, order, property},
      {skipNull: true, skipEmptyString: true, }
    );
  }
}
