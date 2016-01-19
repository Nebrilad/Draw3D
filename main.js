initialize();

function initialize(){
	console.log("initialize");
	WIDTH=window.innerWidth;
	HEIGHT=window.innerHeight;

	cliccato=false;
	isMouseDown=false;

	// set some camera attributes
	VIEW_ANGLE = 45;
	ASPECT = WIDTH / HEIGHT;
	NEAR = 0.1;
	FAR = 1000;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(  VIEW_ANGLE, ASPECT, NEAR, FAR  );
	//camera.position.set(1, 700, 1000);
	renderer = new THREE.WebGLRenderer();

	initControl();

	objects = [];
	sphere=new THREE.Mesh();
	//projector = new THREE.Projector();
	mesh=new THREE.Mesh();

	//Definizione Colori
	colorpin=	0x737485;
	colorf=new Array(
			0xff0000, 0xffcc00, 0x00ffaa, 0x005299, 0xf780ff, 0x590000, 0x594700, /*0xbfffea, 0xbfe1ff, */
			0x590053, 0x99574d, 0x66644d, 0x005947, 0x001433, 0xb3008f, 0x992900, 0x8f9900, 0x00ffee,
			0x001f73, 0xff0088, 0xffa280, 0xfbffbf, 0x003033, 0x0022ff, 0x804062, 0xffd0bf, 0xccff00,
			0x53a0a6, 0x8091ff, 0x99003d, 0xff6600, 0x293300, 0x00ccff, 0x7c82a6, 0x664d57, 0x332b26,
			0xa1e673, 0x00aaff, 0x6c29a6, 0xff0044, 0x593000, 0x44ff00, 0x003c59, 0xe1bfff, 0x330d17,
			0xffa640, 0x00590c, 0x23698c, 0x220033, 0xffbfd0, 0xd9b56c, 0x53a674, 0x4d5e66, 0xcc00ff,

			0xffcc00, 0x00ffaa, 0x005299, 0xf780ff, 0x590000, 0x594700, 0xbfffea, /*0xbfe1ff, 0xff0000, */
			0x590053, 0x99574d, 0x66644d, 0x005947, 0x001433, 0xb3008f, 0x992900, 0x8f9900, 0x00ffee,
			0x001f73, 0xff0088, 0xffa280, 0xfbffbf, 0x003033, 0x0022ff, 0x804062, 0xffd0bf, 0xccff00,
			0x53a0a6, 0x8091ff, 0x99003d, 0xff6600, 0x293300, 0x00ccff, 0x7c82a6, 0x664d57, 0x332b26,
			0xa1e673, 0x00aaff, 0x6c29a6, 0xff0044, 0x593000, 0x44ff00, 0x003c59, 0xe1bfff, 0x330d17,
			0xffa640, 0x00590c, 0x23698c, 0x220033, 0xffbfd0, 0xd9b56c, 0x53a674, 0x4d5e66, 0xcc00ff
	);

	initWebGl();
	init();
	animate();
/**
	var plane = new THREE.PlaneGeometry(20,20);
	var material1 = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	var floor = new THREE.Mesh( plane, material1 );

	floor.position.z = -2.5;
	scene.name = "plane";
	scene.add( floor );
	objects.push( plane );
**/
	var geometry = new THREE.BoxGeometry( 5, 5, 5 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.name = "cubo";
	scene.add( cube );

	objects.push( cube );

	prova = events();
	for(var key in prova){
		document.addEventListener(key, prova[key], false );
	}
}

function initControl(){
	console.log("initControl");
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minPolarAngle=0;
	controls.maxPolarAngle=Math.PI/2;
	//controls.minDistance=50;
	//controls.maxDistance=5000;
	controls.userPanSpeed= 8;
}

function initWebGl(){
	console.log("initWebGl");
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(new THREE.Color(0xdddddd, 1.0));
	document.body.appendChild( renderer.domElement );
}

function init(){
	console.log("init");
	scene.add(camera);

	light	= new THREE.SpotLight( 0xFFAA88, 2 );
	light.position.set(-500,300,-500);
	light.shadowCameraFov = 120;
	light.target.position.set( 0, 0, 0 );
	light.shadowCameraNear = 0.01;
	light.castShadow = true;
	light.shadowDarkness = 0.5;

	scene.add(light);
}

function render() {
	console.log("render");
	requestAnimationFrame( render );
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	renderer.render( scene, camera );
}

function initControl(){
	console.log("initControl");
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minPolarAngle=0;
	controls.maxPolarAngle=Math.PI/2;
	controls.minDistance=50;
	controls.maxDistance=5000;
	controls.userPanSpeed= 8;
}

function animate() {
	requestAnimationFrame( function() { animate(); } );
	TWEEN.update();
	render();
}

function render(){
	controls.update();
  renderer.render(scene, camera);
}

function events(){
			return {
					"mousedown": onDocumentMouseDown,
					"mouseup": onDocumentMouseUp,
					"mousemove": onDocumentMouseMove
			};
}

function cursorPositionInCanvas(canvas, event) {
  var x, y;
  //canoffset = $(canvas).offset();

  x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canvas.offsetLeft);
  y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canvas.offsetTop) + 1;

  return [x,y];
}

function onDocumentMouseDown(event){
	//console.log("onDocumentMouseDown");
	var mouse=[];
	event.preventDefault();
	isMouseDown=true;

	console.log(event.clientX, event.clientY);

	mouse.x = ((cursorPositionInCanvas( renderer.domElement, event )[0]) / WIDTH) * 2 - 1;
	mouse.y = - ((cursorPositionInCanvas( renderer.domElement, event )[1])/ HEIGHT) * 2 + 1;

	var vector= new THREE.Vector3( mouse.x, mouse.y, 0.5);

	if(event.which == 1){

			vector.unproject(camera);

			var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

			var intersect = ray.intersectObjects(objects);

			if(intersect.length>0){
					cliccato=true;
					ObjectHeight = intersect[0].object.geometry.parameters.height;
					ObjectWidth = intersect[0].object.geometry.parameters.width;

					intersect[0].object.material.color.setHex(Math.random()*0xffffff);

/*
					//CREAZIONE SCRITTA
					var canvas1 = document.createElement('canvas');
					canvas1.setAttribute('height', 25);
					canvas1.setPosition = intersect[0].point;

					var context1 = canvas1.getContext('2d');
					context1.font = "10px serif";
					context1.fillStyle = "rgba(255,0,0,1)";
					console.dir(intersect[0].point);
					context1.fillText(intersect[0].object.name, intersect[0].point.x, intersect[0].point.y);

					// canvas contents will be used for a texture
					var texture1 = new THREE.Texture(canvas1);
					texture1.needsUpdate = true;

					var material1 = new THREE.MeshBasicMaterial( {map: texture1, depthWrite: true, depthTest: false,side:THREE.DoubleSide } );
					material1.transparent = true;

					mesh1 = new THREE.Mesh(
							new THREE.PlaneGeometry(canvas1.width, canvas1.height),
							material1
					);
					//mesh1.position = intersect[0].point;
					//mesh1.position.x = ObjectHeight;
					mesh1.lookAt(camera.position);
					scritta= new THREE.Object3D();
					scene.add(mesh1);
*/

					var font = "Helvetica",
			        size = 15,
			        color = "rgb(255, 0, 0)";

			    font = "bold " + size + "px " + font;

			    var canvas = document.createElement('canvas');
			    var context = canvas.getContext('2d');
			    context.font = font;
					var text = intersect[0].object.name;

			    // get size data (height depends only on font size)
			    var metrics = context.measureText(text),
			        textWidth = metrics.width;

			    canvas.width = textWidth + 3;
			    canvas.height = size + 3;

			    context.font = font;
			    context.fillStyle = color;
			    context.fillText(text, 0, size);

			    // canvas contents will be used for a texture
			    var texture = new THREE.Texture(canvas);
			    texture.needsUpdate = true;

					var material = new THREE.MeshBasicMaterial(
						{
							map: texture,
							depthWrite: true,
							depthTest: false,
							side:THREE.DoubleSide
						}
					);
					material.transparent = true;

			    mesh = new THREE.Mesh(
						new THREE.PlaneGeometry(canvas.width, canvas.height),
						material
					);

					mesh.lookAt(camera.position);

					scene.add(mesh);

					//FINE CREAZIONE SCRITTA

			}else{
					console.log("cliccato a vuoto..");
			}
	}
}

function onDocumentMouseMove(event){
	//console.log("onDocumentMouseMove");
	event.preventDefault();

	if(isMouseDown && cliccato){
			mesh.lookAt(camera.position);
	}
}

function onDocumentMouseUp(event){
	//console.log("onDOcumentMouseUp");
	event.preventDefault();
	isMouseDown=false;
	cliccato=false;
	scene.remove(mesh);
}
