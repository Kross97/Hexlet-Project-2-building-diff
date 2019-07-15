install:
	npm install

start:
	npx babel-node src/bin/gendiff before.yml after.yml

publish: 
	npm publish --dry-run

test:
        npx jest

lint:
	npx eslint .
