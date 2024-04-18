import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import crate from './crate.gif';
import cat from './test.png'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.set(0, 5, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// // 字体
// const texture = new THREE.TextureLoader().load( "textures/water.jpg" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );
//  console.log('texture', texture);

// // 简单的立方体
// const geometry = new THREE.BoxGeometry( 3, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );



// 简易的一条线
// const material = new THREE.LineBasicMaterial( { color: 0x0000ff, } );
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line(geometry, material);
// scene.add( line );

// 创建纹理
const texture = new THREE.TextureLoader().load(cat);
texture.colorSpace = THREE.SRGBColorSpace;
console.log('textture', texture);
// 创建平面
// const plane = new THREE.PlaneGeometry( 5, 5);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {
    color: 0xffffff,
		map: texture,
		side: THREE.DoubleSide,
		// transparent: true,
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update()
camera.position.z = 5;


// 固定轨道运动
 // 创建一个圆形路径
 const curve = new THREE.EllipseCurve(
	0, 0,            // ax, aY
	3, 3,            // xRadius, yRadius
	0, 2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);
const points = curve.getPoints(500);
const geometryCurve = new THREE.BufferGeometry().setFromPoints(points);
const materialCurve = new THREE.LineBasicMaterial({ color: 0xff0000 });

const ellipse = new THREE.Line(geometryCurve, materialCurve);
scene.add(ellipse);
scene.add(mesh);

let time = 0;
function animate() {
	requestAnimationFrame( animate );
	controls.update()
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
  time += 0.01;
            const t = (time % 1) / 1; // 正规化时间t到0到1之间
            const point = curve.getPoint(t); // 根据时间t获取曲线上的位置
            const tangent = curve.getTangent(t);
            mesh.position.set(point.x, point.y, 0); // 更新立方体位置到曲线上
            mesh.lookAt(point.add(tangent)); // 
	renderer.render( scene, camera );
}

animate();