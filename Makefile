tailwind/watch:
	tailwindcss -i ./css/input.css -o ./css/dist/output.css --watch

tailwind: 
	tailwindcss -i ./css/input.css -o ./css/dist/output.css
	 
server:
	python3 -m http.server