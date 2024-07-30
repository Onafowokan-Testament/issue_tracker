"use client";

import {
  QueryClient,
  QueryClientProvider as Client_Provider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const query_client = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <Client_Provider client={query_client}>{children}</Client_Provider>;
};

export default QueryClientProvider;
