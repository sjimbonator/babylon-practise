import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

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

BABYLON.SceneLoader.ImportMesh(null, "../assets/", "ship-PLACEHOLDER-v7 (canon animation test).gltf", scene, (meshes, particleSystems, skeletons, animationgroups,) => {

    // #region Nodematerial
    var nodeMaterial = new BABYLON.NodeMaterial("node");

    // InputBlock
    var position = new BABYLON.InputBlock("position");
    position.setAsAttribute("position");
    
    // VectorSplitterBlock
    var VectorSplitter = new BABYLON.VectorSplitterBlock("VectorSplitter");
  
    // VectorMergerBlock
    var VectorMerger = new BABYLON.VectorMergerBlock("VectorMerger");
   
    // MultiplyBlock
    var Multiply = new BABYLON.MultiplyBlock("Multiply");
  
    // SimplexPerlin3DBlock
    var SimplexPerlinD = new BABYLON.SimplexPerlin3DBlock("SimplexPerlin3D");
   
    // MultiplyBlock
    var spikeyness = new BABYLON.MultiplyBlock("spikeyness");
   
    // AddBlock
    var Add = new BABYLON.AddBlock("Add");
    
    // VectorMergerBlock
    var VectorMerger1 = new BABYLON.VectorMergerBlock("VectorMerger");
    
    // InputBlock
    var Time = new BABYLON.InputBlock("Time");
    Time.value = 0;
    Time.min = 0;
    Time.max = 0;
    Time.isBoolean = false;
    Time.matrixMode = 0;
    Time.animationType = BABYLON.AnimatedInputBlockTypes.Time;
    Time.isConstant = false;
    
    // InputBlock
    var noiseyness = new BABYLON.InputBlock("noiseyness");
    noiseyness.value = new BABYLON.Vector3(2, 1, 2);
    noiseyness.isConstant = false;
    
    // InputBlock
    var flatness = new BABYLON.InputBlock("flatness");
    flatness.value = 0.8;
    flatness.min = 0;
    flatness.max = 0;
    flatness.isBoolean = false;
    flatness.matrixMode = 0;
    flatness.animationType = BABYLON.AnimatedInputBlockTypes.None;
    flatness.isConstant = false;
    
    // TransformBlock
    var WorldPos = new BABYLON.TransformBlock("WorldPos");
    WorldPos.complementZ = 0;
    WorldPos.complementW = 1;
    
    // InputBlock
    var World = new BABYLON.InputBlock("World");
    World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);
    
    // TransformBlock
    var Worldposition = new BABYLON.TransformBlock("World position");
    Worldposition.complementZ = 0;
    Worldposition.complementW = 1;
    
    // LightBlock
    var Lights = new BABYLON.LightBlock("Lights");
    
    // TransformBlock
    var Worldnormal = new BABYLON.TransformBlock("World normal");
    Worldnormal.complementZ = 0;
    Worldnormal.complementW = 0;
    
    // InputBlock
    var normal = new BABYLON.InputBlock("normal");
    normal.setAsAttribute("normal");
    
    // InputBlock
    var cameraPosition = new BABYLON.InputBlock("cameraPosition");
    cameraPosition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);
    
    // MultiplyBlock
    var Multiply1 = new BABYLON.MultiplyBlock("Multiply");
    
    // InputBlock
    var Color = new BABYLON.InputBlock("Color3");
    Color.value = new BABYLON.Color3(0.3137254901960784, 0.8901960784313725, 0.7607843137254902);
    Color.isConstant = false;
    
    // VectorMergerBlock
    var VectorMerger2 = new BABYLON.VectorMergerBlock("VectorMerger");
   
    // MultiplyBlock
    var Multiply2 = new BABYLON.MultiplyBlock("Multiply");
   
    // DotBlock
    var Dot = new BABYLON.DotBlock("Dot");
    
    // LightInformationBlock
    var Lightinformation = new BABYLON.LightInformationBlock("Light information");
    
    // NormalizeBlock
    var Normalize = new BABYLON.NormalizeBlock("Normalize");
    
    // CrossBlock
    var Cross = new BABYLON.CrossBlock("Cross");
    
    // DerivativeBlock
    var Derivative = new BABYLON.DerivativeBlock("Derivative");
    
    // AddBlock
    var Add1 = new BABYLON.AddBlock("Add");
    
    // FragmentOutputBlock
    var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
    
    // InputBlock
    var WaterOpacity = new BABYLON.InputBlock("WaterOpacity");
    WaterOpacity.value = 0.8;
    WaterOpacity.min = 0;
    WaterOpacity.max = 0;
    WaterOpacity.isBoolean = false;
    WaterOpacity.matrixMode = 0;
    WaterOpacity.animationType = BABYLON.AnimatedInputBlockTypes.None;
    WaterOpacity.isConstant = false;
    
    // TransformBlock
    var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
    WorldPosViewProjectionTransform.complementZ = 0;
    WorldPosViewProjectionTransform.complementW = 1;
    
    // InputBlock
    var ViewProjection = new BABYLON.InputBlock("ViewProjection");
    ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);
    
    // VertexOutputBlock
    var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
    
    // Connections
    position.output.connectTo(VectorSplitter.xyzIn);
    VectorSplitter.x.connectTo(VectorMerger.x);
    Time.output.connectTo(VectorMerger1.y);
    VectorMerger1.xyz.connectTo(Add.left);
    position.output.connectTo(Add.right);
    Add.output.connectTo(spikeyness.left);
    noiseyness.output.connectTo(spikeyness.right);
    spikeyness.output.connectTo(SimplexPerlinD.seed);
    SimplexPerlinD.output.connectTo(Multiply.left);
    flatness.output.connectTo(Multiply.right);
    Multiply.output.connectTo(VectorMerger.y);
    VectorSplitter.z.connectTo(VectorMerger.z);
    VectorMerger.xyz.connectTo(WorldPos.vector);
    World.output.connectTo(WorldPos.transform);
    WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
    ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
    WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
    position.output.connectTo(Worldposition.vector);
    World.output.connectTo(Worldposition.transform);
    Worldposition.output.connectTo(Lights.worldPosition);
    normal.output.connectTo(Worldnormal.vector);
    World.output.connectTo(Worldnormal.transform);
    Worldnormal.output.connectTo(Lights.worldNormal);
    cameraPosition.output.connectTo(Lights.cameraPosition);
    Color.output.connectTo(Multiply1.left);
    WorldPos.output.connectTo(Lightinformation.worldPosition);
    Lightinformation.direction.connectTo(Dot.left);
    WorldPos.output.connectTo(Derivative.input);
    Derivative.dy.connectTo(Cross.left);
    Derivative.dx.connectTo(Cross.right);
    Cross.output.connectTo(Normalize.input);
    Normalize.output.connectTo(Dot.right);
    Dot.output.connectTo(Multiply2.left);
    Dot.output.connectTo(Multiply2.right);
    Multiply2.output.connectTo(VectorMerger2.x);
    Multiply2.output.connectTo(VectorMerger2.y);
    Multiply2.output.connectTo(VectorMerger2.z);
    VectorMerger2.xyz.connectTo(Multiply1.right);
    Multiply1.output.connectTo(Lights.diffuseColor);
    Lights.diffuseOutput.connectTo(Add1.left);
    Lights.specularOutput.connectTo(Add1.right);
    Add1.output.connectTo(FragmentOutput.rgb);
    WaterOpacity.output.connectTo(FragmentOutput.a);
    
    // Output nodes
    nodeMaterial.addOutputNode(VertexOutput);
    nodeMaterial.addOutputNode(FragmentOutput);
    nodeMaterial.build();
    
    
    
    // #endregion

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(70, 70, 70), scene);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    var distance = 80;
    var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width;

    camera.orthoLeft = -distance / 2;
    camera.orthoRight = distance / 2;
    camera.orthoBottom = camera.orthoLeft * aspect;
    camera.orthoTop = camera.orthoRight * aspect;

    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    let directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, -3), scene);
    directionalLight.intensity = 3.5;
    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let water = BABYLON.MeshBuilder.CreateTiledGround("water", { xmin: -100, xmax: 100, zmin: -100, zmax: 100, subdivisions: { w: 100, h: 100 } }, scene)
    // Affect a material
    water.material = nodeMaterial;

    // Render every frame
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", function () {
        aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width;

        camera.orthoLeft = -distance / 2;
        camera.orthoRight = distance / 2;
        camera.orthoBottom = camera.orthoLeft * aspect;
        camera.orthoTop = camera.orthoRight * aspect;

        engine.resize();
        canvas.style.width = "100%";
        canvas.style.height = "100%";
    });
});
