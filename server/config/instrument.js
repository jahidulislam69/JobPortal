import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://5e45c07ca90fb67859dbdb971d4534cb@o4509015911104512.ingest.de.sentry.io/4509015922180176",
  integrations: [Sentry.mongooseIntegration()],
  
});