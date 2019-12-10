# grep -o "STATIC(\"\w*\"" imgui_demo.ts | sort | uniq -d

all: start-example-node

start: start-example-html

build: build-bind-imgui build-imgui build-example

clean: clean-bind-imgui clean-imgui clean-example

# bind-imgui

IMGUI_PATH = imgui
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imconfig.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imgui.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imgui_internal.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imstb_rectpack.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imstb_textedit.h
IMGUI_SOURCE_HXX += $(IMGUI_PATH)/imstb_truetype.h
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui.cpp
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui_demo.cpp
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui_draw.cpp
IMGUI_SOURCE_CXX += $(IMGUI_PATH)/imgui_widgets.cpp
IMGUI_OUTPUT_BC = $(IMGUI_SOURCE_CXX:%.cpp=%.bc)

BIND_IMGUI_SOURCE_D_TS = bind-imgui.d.ts
BIND_IMGUI_SOURCE_CXX = bind-imgui.cpp
BIND_IMGUI_OUTPUT_BC = bind-imgui.bc
BIND_IMGUI_OUTPUT_JS = bind-imgui.js

# debug flags
# FLAGS += -g4
# FLAGS += -O0
# FLAGS += --source-map-base http://127.0.0.1:8080/
# FLAGS += -s ASSERTIONS=1
# FLAGS += -s SAFE_HEAP=1

FLAGS += -Os
FLAGS += -s NO_FILESYSTEM=1
# FLAGS += -s WASM=1
FLAGS += -s MODULARIZE=1
# FLAGS += -s EXPORT_NAME=\"ImGui\"
FLAGS += -s EXPORT_BINDINGS=1
# FLAGS += -s EXPORT_ALL=1
# FLAGS += -s MEM_INIT_METHOD=0
# FLAGS += --memory-init-file 0
FLAGS += -s SINGLE_FILE=1
# FLAGS += -s BINARYEN_ASYNC_COMPILATION=0
# FLAGS += -s BINARYEN_METHOD=\"native-wasm,asmjs\"
# FLAGS += -s BINARYEN_METHOD=\"interpret-asm2wasm,asmjs\"
# FLAGS += -s BINARYEN_TRAP_MODE=\"clamp\"
# FLAGS += -s TOTAL_MEMORY=4194304
# FLAGS += -s ALLOW_MEMORY_GROWTH=1
FLAGS += -s EMBIND_STD_STRING_IS_UTF8=1

FLAGS += -D "IM_ASSERT(EXPR)=((void)(EXPR))"

FLAGS += -D IMGUI_DISABLE_OBSOLETE_FUNCTIONS
FLAGS += -D IMGUI_DISABLE_DEMO_WINDOWS

build-bind-imgui: bind-imgui.js

clean-bind-imgui:
	rm -f $(IMGUI_OUTPUT_BC)
	rm -f $(BIND_IMGUI_OUTPUT_BC)
	rm -f bind-imgui.js bind-imgui.js.*
	rm -f bind-imgui.wasm bind-imgui.wasm.*

%.bc: %.cpp $(IMGUI_SOURCE_HXX)
	emcc $(FLAGS) -I $(IMGUI_PATH) -c $< -o $@

bind-imgui.bc: bind-imgui.cpp $(IMGUI_SOURCE_HXX)
	emcc $(FLAGS) -I $(IMGUI_PATH) -c --bind $< -o $@

bind-imgui.js: $(IMGUI_OUTPUT_BC) $(BIND_IMGUI_OUTPUT_BC)
	emcc $(FLAGS) -I $(IMGUI_PATH) --bind $^ -o $@

# imgui

build-imgui:
	npm run build-imgui

clean-imgui:
	npm run clean-imgui

# example

build-example:
	npm run build-example

clean-example:
	npm run clean-example

start-example: start-example-node

start-example-node:
	npm run start-example-node

start-example-html:
	npm run start-example-html

# native-example

IMGUI_NATIVE_EXAMPLE_PATH = $(IMGUI_PATH)/examples/example_sdl_opengl2
IMGUI_NATIVE_EXAMPLE_SOURCE_CXX += $(IMGUI_NATIVE_EXAMPLE_PATH)/main.cpp
IMGUI_NATIVE_EXAMPLE_SOURCE_CXX += $(IMGUI_PATH)/examples/imgui_impl_sdl.cpp
IMGUI_NATIVE_EXAMPLE_SOURCE_CXX += $(IMGUI_PATH)/examples/imgui_impl_opengl2.cpp

IMGUI_NATIVE_EXAMPLE_BUILD = echo $$(uname)
IMGUI_NATIVE_EXAMPLE_CLEAN = echo $$(uname)
IMGUI_NATIVE_EXAMPLE_START = echo $$(uname)
ifeq ($(shell uname),Linux)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/example-linux
IMGUI_NATIVE_EXAMPLE_BUILD = c++ `sdl2-config --cflags` -I $(IMGUI_NATIVE_EXAMPLE_PATH) -I $(IMGUI_PATH)/examples -I $(IMGUI_PATH) -D HAVE_MALLINFO $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) `sdl2-config --libs` -lGL -o $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif
ifeq ($(shell uname),Darwin)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/example-macos
IMGUI_NATIVE_EXAMPLE_BUILD = c++ `sdl2-config --cflags` -I $(IMGUI_NATIVE_EXAMPLE_PATH) -I $(IMGUI_PATH)/examples -I $(IMGUI_PATH) $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) `sdl2-config --libs` -framework OpenGl -o $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif
ifeq ($(OS),Windows_NT)
IMGUI_NATIVE_EXAMPLE_OUTPUT = $(IMGUI_NATIVE_EXAMPLE_PATH)/example-windows.exe
IMGUI_NATIVE_EXAMPLE_BUILD = set SDL2DIR=C:\SDL2 && cl /Zi /MD /I $(IMGUI_NATIVE_EXAMPLE_PATH) /I $(IMGUI_PATH)/examples /I $(IMGUI_PATH) /I %SDL2DIR%\include $(IMGUI_NATIVE_EXAMPLE_SOURCE_CXX) $(IMGUI_SOURCE_CXX) /link /LIBPATH:%SDL2DIR%\lib SDL2.lib SDL2main.lib opengl32.lib /subsystem:console /Fe $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_CLEAN = rm -f $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
IMGUI_NATIVE_EXAMPLE_START = $(IMGUI_NATIVE_EXAMPLE_OUTPUT)
endif

build-native-example:
	$(IMGUI_NATIVE_EXAMPLE_BUILD)

clean-native-example:
	$(IMGUI_NATIVE_EXAMPLE_CLEAN)

start-native-example:
	$(IMGUI_NATIVE_EXAMPLE_START)
