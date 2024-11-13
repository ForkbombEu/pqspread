VENDOR = vendor
ALPINE = ${VENDOR}/alpine.js
TAILWIND = ${VENDOR}/tailwind.js
ZENROOM = ${VENDOR}/zenroom.js
.DEFAULT_GOAL := help

.PHONY: test

## 🙏Deps
vendors: ${ALPINE} ${TAILWIND} ${ZENROOM} ## Install all the deps in a vendor folder
	@echo "👙Big success all the vendors where downloaded"

${VENDOR}: 
	@mkdir ${VENDOR}

${ALPINE}: ${VENDOR}
	@wget https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js -qO ${ALPINE}

${TAILWIND}: ${VENDOR}
	@wget https://cdn.tailwindcss.com -qO ${TAILWIND}

${ZENROOM}: ${VENDOR}
	@wget https://cdn.jsdelivr.net/npm/zenroom/dist/main/index.min.js -qO ${ZENROOM}

## 🎮 Run
dev: vendors ## Run the project and serve with livereload 
	npx browser-sync start --server --files "*.html"

## 🧹 Clean
clean: ## clean files not necessarry for save
	@rm -fr ${VENDOR}
	@echo "🧹 Clean done"

## 🧪 Test
test: ## run tests on zencode crypt contracts
	$(MAKE) -C test

## Help:
help: ## Show this help.
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} { \
		if (/^[a-zA-Z_-]+:.*?##.*$$/) {printf "    ${YELLOW}%-20s${GREEN}%s${RESET}\n", $$1, $$2} \
		else if (/^## .*$$/) {printf "  ${CYAN}%s${RESET}\n", substr($$1,4)} \
		}' $(MAKEFILE_LIST)
