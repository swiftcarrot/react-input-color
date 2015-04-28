all:
	babel lib --out-dir dist
	lessc lib/input-color.less > dist/input-color.css
clean:
	rm dist/*
