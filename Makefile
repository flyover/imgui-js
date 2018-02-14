# grep -o "STATIC(\"\w*\"" imgui_demo.ts | sort | uniq -d

IMGUI_PATH = imgui
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imconfig.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imgui.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imgui_internal.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/stb_rect_pack.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/stb_textedit.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/stb_truetype.h
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui.cpp
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui_draw.cpp
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui_demo.cpp
IMGUI_OUTPUT_BC = $(IMGUI_SOURCE_CXX:%.cpp=%.bc)

BIND_IMGUI_SOURCE_D_TS = bind-imgui.d.ts
BIND_IMGUI_SOURCE_CXX = bind-imgui.cpp
BIND_IMGUI_OUTPUT_BC = bind-imgui.bc
BIND_IMGUI_OUTPUT_JS = bind-imgui.js

IMGUI_JS_SOURCE_TS += imgui.ts
IMGUI_JS_SOURCE_TS += imgui_demo.ts
IMGUI_JS_SOURCE_TS += imgui_memory_editor.ts
IMGUI_JS_OUTPUT_JS = $(IMGUI_JS_SOURCE_TS:%.ts=%.js)

IMGUI_JS_EXAMPLE_SOURCE_TS += example/main.ts
IMGUI_JS_EXAMPLE_SOURCE_TS += example/imgui_impl.ts
IMGUI_JS_EXAMPLE_OUTPUT_JS = $(IMGUI_JS_EXAMPLE_SOURCE_TS:%.ts=%.js)

# FLAGS += -g4
FLAGS += -Os
FLAGS += -s NO_FILESYSTEM=1
# FLAGS += -s WASM=1
# FLAGS += -s MODULARIZE=1
# FLAGS += -s EXPORT_NAME=\"ImGui\"
FLAGS += -s EXPORT_BINDINGS=1
# FLAGS += -s EXPORT_ALL=1
# FLAGS += -s MEM_INIT_METHOD=0
# FLAGS += --memory-init-file 0
FLAGS += -s SINGLE_FILE=1
FLAGS += -s BINARYEN_ASYNC_COMPILATION=0
# FLAGS += -s TOTAL_MEMORY=4194304

FLAGS += -D IMGUI_DISABLE_OBSOLETE_FUNCTIONS
FLAGS += -D IMGUI_DISABLE_DEMO_WINDOWS

all: start-example-node

dev: start-example-html

build: build-imgui-js build-example

clean: clean-imgui-js clean-example

# imgui-js

build-imgui-js: $(IMGUI_JS_OUTPUT_JS) bind-imgui.js
# build-imgui-js: $(word 1, $(IMGUI_JS_OUTPUT_JS)) bind-imgui.js

clean-imgui-js:
	rm -f $(IMGUI_OUTPUT_BC)
	rm -f $(BIND_IMGUI_OUTPUT_BC)
	rm -f bind-imgui.js bind-imgui.js.*
	rm -f bind-imgui.wasm bind-imgui.wasm.*
	rm -f $(IMGUI_JS_OUTPUT_JS)

%.bc: %.cpp $(IMGUI_SOURCE_HXX)
	emcc $(FLAGS) -I $(IMGUI_PATH) $< -o $@

bind-imgui.bc: bind-imgui.cpp $(IMGUI_SOURCE_HXX)
	emcc $(FLAGS) -I $(IMGUI_PATH) --bind $< -o $@

bind-imgui.js: $(IMGUI_OUTPUT_BC) $(BIND_IMGUI_OUTPUT_BC)
	emcc $(FLAGS) -I $(IMGUI_PATH) --bind $^ -o $@

$(IMGUI_JS_SOURCE_TS): bind-imgui.d.ts tsconfig.json

# %.js: %.ts
$(IMGUI_JS_OUTPUT_JS): $(IMGUI_JS_SOURCE_TS)
# imgui.js: imgui.ts
# imgui_demo.js: imgui_demo.ts
# imgui_memory_editor.js: imgui_memory_editor.ts
# $(word 1, $(IMGUI_JS_OUTPUT_JS)): $(IMGUI_JS_SOURCE_TS)
	$$(npm bin)/tsc -p .

# example

build-example: $(IMGUI_JS_EXAMPLE_OUTPUT_JS) build-imgui-js
# build-example: $(word 1, $(IMGUI_JS_EXAMPLE_OUTPUT_JS)) build-imgui-js

clean-example:
	rm -f $(IMGUI_JS_EXAMPLE_OUTPUT_JS)

$(IMGUI_JS_EXAMPLE_SOURCE_TS): bind-imgui.d.ts example/tsconfig.json

# example/%.js: example/%.ts
$(IMGUI_JS_EXAMPLE_OUTPUT_JS): $(IMGUI_JS_EXAMPLE_SOURCE_TS)
# $(word 1, $(IMGUI_JS_EXAMPLE_OUTPUT_JS)): $(IMGUI_JS_EXAMPLE_SOURCE_TS)
# example/main.js: example/main.ts
# example/imgui_impl.js: example/imgui_impl.ts
	$$(npm bin)/tsc -p example

start-example: start-example-node

start-example-node: build-example
	node example/index.js

start-example-html:
	@echo http://localhost:8080/example/index.html
	$$(npm bin)/http-server

# native-example

IMGUI_NATIVE_EXAMPLE_PATH = $(IMGUI_PATH)/examples/sdl_opengl2_example
IMGUI_NATIVE_EXAMPLE_SOURCE_CXX += $(IMGUI_NATIVE_EXAMPLE_PATH)/main.cpp
IMGUI_NATIVE_EXAMPLE_SOURCE_CXX += $(IMGUI_NATIVE_EXAMPLE_PATH)/imgui_impl_sdl.cpp

IMGUI_NATIVE_EXAMPLE_BUILD = echo $$(uname)
IMGUI_NATIVE_EXAMPLE_CLEAN = echo $$(uname)
IMGUI_NATIVE_EXAMPLE_START = echo $$(uname)
ifeq ($(shell uname),Linux)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/sdl2example-linux
IMGUI_NATIVE_EXAMPLE_BUILD = c++ `sdl2-config --cflags` -I $(IMGUI_NATIVE_EXAMPLE_PATH) -I $(IMGUI_PATH) -D HAVE_MALLINFO $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) `sdl2-config --libs` -lGL -o $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif
ifeq ($(shell uname),Darwin)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/sdl2example-macos
IMGUI_NATIVE_EXAMPLE_BUILD = c++ `sdl2-config --cflags` -I $(IMGUI_NATIVE_EXAMPLE_PATH) -I $(IMGUI_PATH) $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) `sdl2-config --libs` -framework OpenGl -o $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif
ifeq ($(OS),Windows_NT)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/sdl2example-windows.exe
IMGUI_NATIVE_EXAMPLE_BUILD = set SDL2DIR=C:\SDL2 && cl /Zi /MD /I $(IMGUI_NATIVE_EXAMPLE_PATH) /I $(IMGUI_PATH) /I %SDL2DIR%\include $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) /link /LIBPATH:%SDL2DIR%\lib SDL2.lib SDL2main.lib opengl32.lib /subsystem:console /Fe $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif

build-native-example:
	$(IMGUI_NATIVE_EXAMPLE_BUILD)

clean-native-example:
	$(IMGUI_NATIVE_EXAMPLE_CLEAN)

start-native-example:
	$(IMGUI_NATIVE_EXAMPLE_START)
