import { useMemo } from "react";
import { tableHeadersConfig } from "../config/tableConfig";
import { PageType } from "../app/type/index";

export const useTableHeaders = (page: PageType) => {
  const headers = useMemo(() => {
    return tableHeadersConfig[page] || []; // Return empty array if the page isn't found
  }, [page]);

  return headers;
};
