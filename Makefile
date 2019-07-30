install:
	npm install

start:
	npx babel-node src/bin/gendiff --format plain before-tree.json after-tree.json

publish: 
	npm publish --dry-run

test:
	npx jest

lint:
	npx eslint .
