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

sdk.start(); // Starts the OpenTelemetry SDK, enabling tracing and metrics collection
