export interface Log {
  id: string;
  timestamp: number;
  message: string;
  severity: "info" | "warning" | "error";
  env: "production";
  stack: string[];
}

