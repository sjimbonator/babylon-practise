import {
    Engine
} from "@babylonjs/core/Engines/engine";
import {
    Scene
} from "@babylonjs/core/scene";
import {
    Vector3
} from "@babylonjs/core/Maths/math";
import {
    FollowCamera
} from "@babylonjs/core/Cameras/followCamera";
import {
    HemisphericLight
} from "@babylonjs/core/Lights/hemisphericLight";
import {
    Mesh
} from "@babylonjs/core/Meshes/mesh";

import {
    GridMaterial
} from "@babylonjs/materials/grid";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
let scene = new Scene(engine);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;

// Create a grid material
let material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
let sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Affect a material
sphere.material = material;

let camera = new FollowCamera("camera1", sphere.position, scene, sphere);
camera.radius = 5;
camera.heightOffset = 20; 
camera.rotationOffset = 0;
camera.cameraAcceleration = 0.5;
camera.maxCameraSpeed = 50;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

// Affect a material
ground.material = material;

// Render every frame
engine.runRenderLoop(() => {
    scene.render();
    sphere.position.x +=0.01;
    sphere.position.z +=0.01;
});