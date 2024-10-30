FROM python:3.13-slim

ARG ENVIRONMENT=production

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    ENVIRONMENT=$ENVIRONMENT \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry' \
    PIP_NO_CACHE_DIR=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    PATH="/app/.venv/bin:$PATH" \
    PYTHONPATH="/app/"

WORKDIR /app

RUN apt-get update && apt-get install -y \
    make \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip setuptools wheel

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY uv.lock pyproject.toml .python-version ./

RUN if [ "$ENVIRONMENT" = "production" ]; then \
    uv sync --frozen --no-dev --no-install-project; \
    else \
    uv sync --frozen --all-extras; \
    fi

COPY . .

EXPOSE 8000