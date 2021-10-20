FROM postgres:9.6.20-alpine

ENV POSTGRES_PASSWORD knex
ENV POSTGRES_USER knex
ENV POSTGRES_DB knex

# Make sure postgres is running
HEALTHCHECK --interval=3s --timeout=5s --retries=5 \
  CMD pg_isready