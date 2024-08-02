
const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(5,10,7);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);


var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */


var light = new THREE.PointLight( 0xffffcc, 4, 50 );
light.position.set( 4, 15, -20 );
scene.add( light );

var light2 = new THREE.AmbientLight( 0x20202A, 6, 300 );
// light2.position.set( 30, -10, 30 );
scene.add( light2 );



CustomBounce.create("myBounce", {strength:0.4, squash: 0});


var mtlLoader = new THREE.MTLLoader();
mtlLoader.crossOrigin = true;
mtlLoader.setPath( 'https://raw.githubusercontent.com/D99-1/Blender-Crime-Animation/main/' );
mtlLoader.load( 'crime.mtl', function( materials ) {

  materials.preload();
  var objLoader = new THREE.OBJLoader();
  console.log(materials);
  objLoader.setMaterials( materials );
  objLoader.setPath( 'https://raw.githubusercontent.com/D99-1/Blender-Crime-Animation/main/' );
  objLoader.load( 'crime.obj', function ( object ) {

    for ( var key in materials.materials ) {
      materials.materials[key].reflectivity = 0.3; 
      materials.materials[key].shininess = 10; 
    }

    object.position.set(0, 0, 5);
    object.rotation.set(Math.PI / -2, 0, 0);

    TweenLite.from( object.rotation, 1.3, {
      y: Math.PI * 2,
      ease: 'Power3.easeOut'
    });

    TweenLite.from( object.position, 1.6, {
      y: 10,
      ease: 'myBounce'
    });
    scene.add( object );
  });
});
