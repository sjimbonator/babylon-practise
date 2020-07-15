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
    
    // TrigonometryBlock
    var Sin = new BABYLON.TrigonometryBlock("Sin");
    Sin.operation = BABYLON.TrigonometryBlockOperations.Sin;
    
    // DivideBlock
    var Divide = new BABYLON.DivideBlock("Divide");
    
    // SubtractBlock
    var Subtract = new BABYLON.SubtractBlock("Subtract");
    
    // VectorSplitterBlock
    var VectorSplitter1 = new BABYLON.VectorSplitterBlock("VectorSplitter");
    
    // WorleyNoise3DBlock
    var WorleyNoiseD = new BABYLON.WorleyNoise3DBlock("WorleyNoise3D");
    WorleyNoiseD.manhattanDistance = false;
    
    // InputBlock
    var WorleyNoiseJitter = new BABYLON.InputBlock("WorleyNoiseJitter");
    WorleyNoiseJitter.value = 1;
    WorleyNoiseJitter.min = 0;
    WorleyNoiseJitter.max = 0;
    WorleyNoiseJitter.isBoolean = false;
    WorleyNoiseJitter.matrixMode = 0;
    WorleyNoiseJitter.animationType = BABYLON.AnimatedInputBlockTypes.None;
    WorleyNoiseJitter.isConstant = false;
    WorleyNoiseJitter.visibleInInspector = false;
    
    // MultiplyBlock
    var Multiply1 = new BABYLON.MultiplyBlock("Multiply");
    
    // InputBlock
    var Time = new BABYLON.InputBlock("Time");
    Time.value = 0;
    Time.min = 0;
    Time.max = 0;
    Time.isBoolean = false;
    Time.matrixMode = 0;
    Time.animationType = BABYLON.AnimatedInputBlockTypes.Time;
    Time.isConstant = false;
    Time.visibleInInspector = false;
    
    // InputBlock
    var WaveSpeed = new BABYLON.InputBlock("WaveSpeed");
    WaveSpeed.value = 0.5;
    WaveSpeed.min = 0;
    WaveSpeed.max = 0;
    WaveSpeed.isBoolean = false;
    WaveSpeed.matrixMode = 0;
    WaveSpeed.animationType = BABYLON.AnimatedInputBlockTypes.None;
    WaveSpeed.isConstant = false;
    WaveSpeed.visibleInInspector = false;
    
    // InputBlock
    var waveLength = new BABYLON.InputBlock("waveLength");
    waveLength.value = 0.2;
    waveLength.min = 0;
    waveLength.max = 0;
    waveLength.isBoolean = false;
    waveLength.matrixMode = 0;
    waveLength.animationType = BABYLON.AnimatedInputBlockTypes.None;
    waveLength.isConstant = false;
    waveLength.visibleInInspector = false;
    
    // InputBlock
    var WaveHeight = new BABYLON.InputBlock("WaveHeight");
    WaveHeight.value = 0.7;
    WaveHeight.min = 0;
    WaveHeight.max = 0;
    WaveHeight.isBoolean = false;
    WaveHeight.matrixMode = 0;
    WaveHeight.animationType = BABYLON.AnimatedInputBlockTypes.None;
    WaveHeight.isConstant = false;
    WaveHeight.visibleInInspector = false;
    
    // TransformBlock
    var WorldPos = new BABYLON.TransformBlock("WorldPos");
    WorldPos.complementZ = 0;
    WorldPos.complementW = 1;
    
    // InputBlock
    var World = new BABYLON.InputBlock("World");
    World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);
    
    // TransformBlock
    var WorldNormal = new BABYLON.TransformBlock("WorldNormal");
    WorldNormal.complementZ = 0;
    WorldNormal.complementW = 0;
    
    // InputBlock
    var normal = new BABYLON.InputBlock("normal");
    normal.setAsAttribute("normal");
    
    // LightBlock
    var Lights = new BABYLON.LightBlock("Lights");
    
    // InputBlock
    var cameraPosition = new BABYLON.InputBlock("cameraPosition");
    cameraPosition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);
    
    // InputBlock
    var Color = new BABYLON.InputBlock("Color3");
    Color.value = new BABYLON.Color3(0.3137254901960784, 0.8901960784313725, 0.7607843137254902);
    Color.isConstant = false;
    Color.visibleInInspector = false;
    
    // FragmentOutputBlock
    var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
    
    // InputBlock
    var WaterOpacity = new BABYLON.InputBlock("WaterOpacity");
    WaterOpacity.value = 0.5;
    WaterOpacity.min = 0;
    WaterOpacity.max = 0;
    WaterOpacity.isBoolean = false;
    WaterOpacity.matrixMode = 0;
    WaterOpacity.animationType = BABYLON.AnimatedInputBlockTypes.None;
    WaterOpacity.isConstant = false;
    WaterOpacity.visibleInInspector = false;
    
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
    position.output.connectTo(WorleyNoiseD.seed);
    WorleyNoiseJitter.output.connectTo(WorleyNoiseD.jitter);
    WorleyNoiseD.output.connectTo(VectorSplitter1.xyIn);
    VectorSplitter1.y.connectTo(Subtract.left);
    Time.output.connectTo(Multiply1.left);
    WaveSpeed.output.connectTo(Multiply1.right);
    Multiply1.output.connectTo(Subtract.right);
    Subtract.output.connectTo(Divide.left);
    waveLength.output.connectTo(Divide.right);
    Divide.output.connectTo(Sin.input);
    Sin.output.connectTo(Multiply.left);
    WaveHeight.output.connectTo(Multiply.right);
    Multiply.output.connectTo(VectorMerger.y);
    VectorSplitter.z.connectTo(VectorMerger.z);
    VectorMerger.xyz.connectTo(WorldPos.vector);
    World.output.connectTo(WorldPos.transform);
    WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
    ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
    WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
    WorldPos.output.connectTo(Lights.worldPosition);
    normal.output.connectTo(WorldNormal.vector);
    World.output.connectTo(WorldNormal.transform);
    WorldNormal.output.connectTo(Lights.worldNormal);
    cameraPosition.output.connectTo(Lights.cameraPosition);
    Color.output.connectTo(Lights.diffuseColor);
    Lights.diffuseOutput.connectTo(FragmentOutput.rgb);
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
