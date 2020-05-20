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

BABYLON.SceneLoader.ImportMesh(null, "../assets/", "ship-PLACEHOLDER-v7 (canon animation test).gltf", scene, (meshes, particleSystems, skeletons, animationgroups, ) => {

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
    
    // SimplexPerlin3DBlock
    var SimplexPerlinD = new BABYLON.SimplexPerlin3DBlock("SimplexPerlin3D");
    
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
    WaveSpeed.value = 0.2;
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
    WaveHeight.value = 0.6;
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
    var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
    WorldPosViewProjectionTransform.complementZ = 0;
    WorldPosViewProjectionTransform.complementW = 1;
    
    // InputBlock
    var ViewProjection = new BABYLON.InputBlock("ViewProjection");
    ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);
    
    // VertexOutputBlock
    var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
    
    // InputBlock
    var color = new BABYLON.InputBlock("color");
    color.setAsAttribute("color");
    
    // FragmentOutputBlock
    var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
    
    // Connections
    position.output.connectTo(VectorSplitter.xyzIn);
    VectorSplitter.x.connectTo(VectorMerger.x);
    position.output.connectTo(SimplexPerlinD.seed);
    SimplexPerlinD.output.connectTo(Subtract.left);
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
    color.output.connectTo(FragmentOutput.rgba);
    
    // Output nodes
    nodeMaterial.addOutputNode(VertexOutput);
    nodeMaterial.addOutputNode(FragmentOutput);
    nodeMaterial.build();
    
    

    // #endregion

    //let sphere = BABYLON.Mesh.MergeMeshes(meshes as Mesh[]);
    let sphere = meshes[0];
    let cannon = meshes[6];
    sphere.rotationQuaternion = undefined;
    // Move the sphere upward 1/2 its height

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(70, 70, 70), scene);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    var distance = 100;
    var aspect = scene.getEngine().getRenderingCanvasClientRect().height / scene.getEngine().getRenderingCanvasClientRect().width;

    camera.orthoLeft = -distance / 2;
    camera.orthoRight = distance / 2;
    camera.orthoBottom = camera.orthoLeft * aspect;
    camera.orthoTop = camera.orthoRight * aspect;

    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    // #region createGround
    let colors: BABYLON.FloatArray;
    let createGround = function (name, size, subdivisions, color, scene) {
        let ground = new BABYLON.Mesh(name, scene);
        let hsqrt3 = 0.86602540378;
        let tileSize = size / subdivisions;
        let halfTileSize = tileSize / 2;
        let halfTileSizeHsqrt3 = halfTileSize * hsqrt3;
        let flip = false;
        let positions = [];
        let normals = [];
        colors = [];
        let indices = [];
        let tint;
        let tileCount = 0;
        for (let z = -subdivisions / 2; z < subdivisions / 2; z++) {
            for (let x = -subdivisions; x < subdivisions; x++) {
                let posX = x * halfTileSize;
                let posZ = z * tileSize * hsqrt3;

                if (!flip) {
                    positions.push(posX + halfTileSize, 0, posZ - halfTileSizeHsqrt3);
                    positions.push(posX, 0, posZ + halfTileSizeHsqrt3);
                    positions.push(posX - halfTileSize, 0, posZ - halfTileSizeHsqrt3);
                } else {
                    positions.push(posX - halfTileSize, 0, posZ + halfTileSizeHsqrt3);
                    positions.push(posX, 0, posZ - halfTileSizeHsqrt3);
                    positions.push(posX + halfTileSize, 0, posZ + halfTileSizeHsqrt3);
                }

                for (let i = 0; i < 3; i++) normals.push(0, 1, 0);

                for (let i = 0; i < 3; i++) indices.push(tileCount + i);
                tileCount += 3;

                tint = Math.random() * 0.1;
                for (let i = 0; i < 3; i++) colors.push(color.r + tint, color.g + tint, color.b + tint, 1);

                flip = !flip;
            }
            flip = !flip;
        }
        ground.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
        ground.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals, true);
        ground.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors, true);
        ground.setIndices(indices);
        return ground;
    }
    // #endregion

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    let ground = createGround("ground", 60, 11, new BABYLON.Color3(0.3, 0.79, 1), scene);

    // Affect a material
    ground.material = nodeMaterial;


    let desiredrotation = sphere.rotation.y;
    let desiredposition = sphere.position;
    let colors2: BABYLON.FloatArray = colors;
    // Render every frame
    engine.runRenderLoop(() => {

        ground.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors2, true);
        scene.render();
        camera.position = new BABYLON.Vector3(70 + sphere.position.x, 70, 70 + sphere.position.z);

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
