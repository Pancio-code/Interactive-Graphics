
var canvas;
var gl;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL 2.0 isn't available"); }

    // Four Vertices

    var vertices = [
        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5),
        vec2(-1, -1),
        vec2(1, -1),
        vec2(0, 1)
    ];


    //  Configure WebGL
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variable with our data buffer

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.viewport(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.viewport(0, 0, canvas.width, canvas.height / 2);
    gl.drawArrays(gl.TRIANGLES, 4, 3);
}
