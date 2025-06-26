# SPDX-FileCopyrightText: 2024 The Forkbomb Company
#
# SPDX-License-Identifier: AGPL-3.0-or-later

NODE_MODULES = node_modules
PACKAGE_JSON = package.json
BUN_LOCK = bun.lockb
DIST = dist
TEST = contracts/test

DEPS = bun rm awk
K := $(foreach exec,$(DEPS),\
        $(if $(shell which $(exec)),some string,$(error "🥶 `$(exec)` not found in PATH please install it")))

all: help

$(NODE_MODULES): $(PACKAGE_JSON) $(BUN_LOCK)
	bun i

## Development
build: $(NODE_MODULES) ## 🔨 Build to a single .html file
	bun run build
	cd ./electron && bun make

dev: $(NODE_MODULES) ## 🎮 Run the project and serve with livereload 
	bun run dev

clean: ## 🧹 clean files not necessarry for save
	@rm -fr ${NODE_MODULES}
	@rm -fr ${DIST}
	@$(MAKE)	-C $(TEST) clean --no-print-directory
	@echo "🧹 Clean done"

test: ## 🧪 run tests on zencode scripts
	$(MAKE) -C $(TEST)

## Help
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)
help: ## 🦺 Show this help.
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)
