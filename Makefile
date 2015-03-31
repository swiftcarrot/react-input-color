all:
	jsx --no-cache-dir lib/input-color.jsx > dist/input-color.js
	jsx --no-cache-dir lib/color-picker.jsx > dist/color-picker.js
	lessc lib/input-color.less > dist/input-color.css
	cp lib/*.js dist
clean:
	rm dist/*
