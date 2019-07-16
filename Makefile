install:
	npm install

start:
	npx babel-node src/bin/gendiff before.ini after.ini

publish: 
	npm publish --dry-run

test:
        npx jest

lint:
	npx eslint .
