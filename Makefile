git = $$(command -v git)
npm = $$(command -v npm)
ronn = $$(command -v ronn)

manuals = manuals/drawght.5.html manuals/drawght-parser.3.html

.SUFFIXES: .ronn .html .html_fragment

.ronn.html_fragment:
	$(ronn) --organization drawght --date=$$(date +%F) --fragment ${<}

.html_fragment.html:
	mv ${<} content/${@:%.html_fragment=%}

build: build.all
	$(npm) run $(@)

build.all: build.manuals ${manuals}

build.manuals:
	$(ronn) --organization drawght --date=$$(date +%F) --fragment manuals/*.ronn

server.start:
	$(npm) start

clean:
	$(git) submodule update --remote --rebase
	rm -rf manuals/*.html
