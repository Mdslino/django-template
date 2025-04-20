SHELL := /bin/bash
PYTHON_PATH := $(shell pwd)
export PYTHONPATH=$(PYTHON_PATH)
export PYTHONUNBUFFERED=1

.PHONY: all clean install test format lint run run-dev migrate migration help run-docker

# Misc Section
help:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

all: clean install test

install:
	uv sync

clean:
	@find . -name '*.pyc' -exec rm -rf {} +
	@find . -name '__pycache__' -exec rm -rf {} +
	@find . -name 'Thumbs.db' -exec rm -rf {} +
	@find . -name '*~' -exec rm -rf {} +
	rm -rf .cache
	rm -rf build
	rm -rf dist
	rm -rf *.egg-info
	rm -rf htmlcov
	rm -rf .tox/
	rm -rf docs/_build

# Test Section
test:
	pytest -n auto tests/ -vv

test-coverage:
	pytest -n auto --cov-branch --cov-report term-missing --cov=core tests/ -vv

#Run Section
run:
	@gunicorn -c gunicorn.conf.py core.wsgi:application

run-dev:
	@python manage.py runserver 0.0.0.0:8000

run-docker:
	@echo "Running docker-compose"
	@docker compose up --build -d app
	@echo "App is running on http://localhost:8000"

# Lint Section
lint:
	@./scripts/lint.sh $(MODE)

# Migration Section

migrate:
	@python manage.py migrate

docker-migrate:
	@docker compose run --remove-orphans app uv run manage.py migrate

docker-migration:
	@docker compose run app --remove-orphans uv run manage.py makemigrations

migration:
	@python manage.py makemigrations
