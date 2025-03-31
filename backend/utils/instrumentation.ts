/*instrumentation.ts*/
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(), // Exports trace data to the console
  metricReader: new PeriodicExportingMetricReader({
    // Exports metrics data periodically
    exporter: new ConsoleMetricExporter(), // Exports metrics data to the console
  }),
  instrumentations: [getNodeAutoInstrumentations()], // Automatically instruments various Node.js libraries for tracing and metrics
});

// sdk.start(); // Starts the OpenTelemetry SDK, enabling tracing and metrics collection

// Handle shutdown gracefully
// This ensures that all pending spans and metrics are flushed before the process exits
// process.on("SIGTERM", () => {
//   sdk
//     .shutdown()
//     .then(() => console.log("Tracing terminated"))
//     .catch((error) => console.log("Error terminating tracing", error))
//     .finally(() => process.exit(0));
// });

// Disabled because Sentry also serves this purpose
