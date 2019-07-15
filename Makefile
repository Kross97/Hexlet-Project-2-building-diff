install:
	npm install

start:
	npx babel-node src/bin/gendiff before.json after.json

publish: 
	npm publish --dry-run

test:
        npx jest

lint:
	npx eslint .
