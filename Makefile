all:
	jsx --no-cache-dir lib dist
	lessc lib/input-color.less > dist/input-color.css
clean:
	rm dist/*
