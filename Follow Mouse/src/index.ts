import * as BABYLON from "@babylonjs/core";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core";

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
const engine = new BABYLON.Engine(canvas);

// Create our first scene.
let scene = new BABYLON.Scene(engine);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.4;

// Create a grid material
let material = new BABYLON.StandardMaterial("water", scene);
material.emissiveColor = new BABYLON.Color3(0, 0, 1);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
//let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

BABYLON.SceneLoader.ImportMesh("", "../assets/", "boot.babylon", scene, (meshes) => {
    //let sphere = BABYLON.Mesh.MergeMeshes(meshes as Mesh[]);
    let sphere = meshes[0];
    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(70, 70, 0), scene); 
    camera.setTarget(new BABYLON.Vector3(0,0,0));

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 60, 60, 2, scene);

    // Affect a material
    ground.material = material;

    let desiredrotation = sphere.rotation.y;
    let desiredposition = sphere.position;
    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
        camera.position = new BABYLON.Vector3(70 + sphere.position.x, 70, 0 + sphere.position.z);
        console.log(sphere.position.x,sphere.position.z);
        if(sphere.rotation.y != desiredrotation){
            if(sphere.rotation.y > desiredrotation){
                sphere.rotation.y -= 0.01;
                if(sphere.rotation.y < desiredrotation){ sphere.rotation.y = desiredrotation;}
            } else{
                sphere.rotation.y += 0.01;
                if(sphere.rotation.y > desiredrotation){ sphere.rotation.y = desiredrotation;}
            }
        }

        if(sphere.position != desiredposition){
            if(sphere.position.x > desiredposition.x){
                sphere.position.x -= 0.01;
                if(sphere.position.x < desiredposition.x){  sphere.position.x = desiredposition.x;}
            } else{
                sphere.position.x += 0.01;
                if(sphere.position.x > desiredposition.x){  sphere.position.x = desiredposition.x;}
            }

            if(sphere.position.z > desiredposition.z){
                sphere.position.z -= 0.01;
                if(sphere.position.z < desiredposition.z){  sphere.position.z = desiredposition.z;}
            } else{
                sphere.position.z += 0.01;
                if(sphere.position.z > desiredposition.z){  sphere.position.z = desiredposition.z;}
            }
        }

    });

    window.addEventListener("mousemove", function (event) {
		// We try to pick an object
           var pickResult = scene.pick(scene.pointerX, scene.pointerY);
           
           let direction = pickResult.pickedPoint.subtract(sphere.position);

           var v1 = new BABYLON.Vector3(0, 0, 1);
           var v2 = direction.normalize();
           
           // calculate the angle for the new direction
           var angle = Math.acos(BABYLON.Vector3.Dot(v1, v2));
           
           // decide if the angle has to be positive or negative
           if (direction.x < 0) angle *= -1;
           
           desiredrotation = angle;
           desiredposition= pickResult.pickedPoint;
           console.log(angle);
	});

    window.addEventListener("resize", function () {
        engine.resize();
        canvas.style.width = "100%";
        canvas.style.height = "100%";
    });
});
