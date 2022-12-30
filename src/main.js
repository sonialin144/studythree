// import * as THREE from './three.js-master/three.js-master/build/three.module.js'
// import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from 'three/src/core/Raycaster';
import { RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'


const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('./assets/bedroom2.glb', function(glb){
    console.log(glb);
    const root = glb.scene;
    root.scale.set(0.2,0.2,0.2);
    root.position.set(0,-.75,0);
    scene.add(root);
});

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2,2,2);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(35, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0,0,3.5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.setClearColor( 0x000000, 0 );
 
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement );
controls.maxPolarAngle = Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;  
controls.minAzimuthAngle = Math.PI / 4;
controls.enableZoom = false;
controls.rotateSpeed = 0.2;
controls.enablePan = false;
controls.update();

//raycaster picking + outline on hover 

console.log(scene.children);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

  var composer = new EffectComposer(renderer);
  var renderPass = new RenderPass(scene, camera);
  var outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  outlinePass.edgeStrength = 30;
  composer.addPass(renderPass);
  composer.addPass(outlinePass);

  var effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  effectFXAA.renderToScreen = true;
  composer.addPass(effectFXAA);

  scene.traverse( function ( child ) { // each object has own material 
    if ( child.material ) child.material = child.material.clone();
  } );

  // document.querySelector(".scene-reset-button").addEventListener('click', function(){
  //   controls.reset();
  // })

window.addEventListener('mousemove', onTouchMove);
window.addEventListener('click', onClickObj);

  function onTouchMove(event) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      var objects = [];
      objects.push(scene.getObjectByName("Circle")); // clock
      objects.push(scene.getObjectByName("journal"));
      objects.push(scene.getObjectByName("pc_monitor"));
      objects.push(scene.getObjectByName("Cube")); //record player
      objects.push(scene.getObjectByName("Cylinder")); //mug
      objects.push(scene.getObjectByName("ORIGAMI_Chat")); //cat
      objects.push(scene.getObjectByName("Plane")); //calendar
      objects.push(scene.getObjectByName("plant")); //plant
      objects.push(scene.getObjectByName("Circle006"));
      var intersects = raycaster.intersectObjects(objects, true);

      if (intersects.length > 0) {
          var selectedObject = intersects[0].object;

          var selected = [selectedObject.parent];
          if(selectedObject.parent.name == "Scene"){
            selected = [selectedObject];
          }

          let tooltip = document.getElementById("cursor");
          tooltip.style.left = event.clientX + "px";
          tooltip.style.top = event.clientY - 60 + "px";
          tooltip.classList.add("hover");

        if(selected[0].name == "Cube"){
          tooltip.innerHTML = "play music";
        }
        else if(selected[0].name == "Cylinder"){
          tooltip.innerHTML = "water reminder";
        }
        else if(selected[0].name == "pc_monitor"){
          tooltip.innerHTML = "play games";
        }
        else if(selected[0].name == "Circle"){
          tooltip.innerHTML = "pomodoro timer";
        }
        else if(selected[0].name == "journal"){
          tooltip.innerHTML = "todo list";
        }
        else if(selected[0].name == "ORIGAMI_Chat"){
          tooltip.innerHTML = "meow";
        }
        else if(selected[0].name == "Plane"){
          var now = new Date();
          tooltip.innerHTML = "Today is " + (now.getMonth()+1) + "/" + now.getDate();
        }
        else if(selected[0].name == "plant"){
          tooltip.innerHTML = "you touched grass, congrats!";
        }
        else if(selected[0].name == "Circle006"){
          tooltip.innerHTML = "reset camera view";
        }
        else{
          // outlinePass.selectedObjects = [];
          // tooltip.classList.remove("hover");
          return;
        }

          outlinePass.selectedObjects = selected;
      }
      else{
        outlinePass.selectedObjects = [];

        let tooltip = document.getElementById("cursor");
        tooltip.classList.remove("hover");
        // tooltip.classList.add("hover-off");
      }
  }

  function onClickObj(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var objects = [];
    objects.push(scene.getObjectByName("Circle")); // clock
    objects.push(scene.getObjectByName("journal"));
    objects.push(scene.getObjectByName("pc_monitor"));
    objects.push(scene.getObjectByName("Cube")); //record player
    objects.push(scene.getObjectByName("Cylinder")); //mug
    objects.push(scene.getObjectByName("Circle006"));
    var intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
        var selectedObject = intersects[0].object;

        var selected = [selectedObject.parent];

        if(selectedObject.parent.name == "Scene"){
          selected = [selectedObject];
        }
        if(selected[0].name == "Cube"){
          document.querySelector(".music-player-container").style.display = "block";
        }
        else if(selected[0].name == "Cylinder"){
          document.querySelector(".water-container").style.display = "block";
        }
        else if(selected[0].name == "pc_monitor"){
          document.querySelector(".error-container").style.display = "block";
        }
        else if(selected[0].name == "Circle"){
          document.querySelector(".pomodoro-container").style.display = "block";
        }
        else if(selected[0].name == "journal"){
          document.querySelector(".todo-container").style.display = "block";
        }
        else if(selected[0].name == "Circle006"){
          controls.reset();
        }
        else{
          return;
        }
    }
}


  function animate() {
    requestAnimationFrame(animate);

    composer.render();
  }
  animate();
 