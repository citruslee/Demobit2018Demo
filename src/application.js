/* eslint-env browser */
"use strict";
import * as THREE from '../3rdparty/three.module.js';
import {DemoSong} from './DemoSong.js'
import {Scene0} from './Scene0.js'
import {Scene1} from './Scene1.js'
import {Scene2} from './Scene2.js'
import {Scene3} from './Scene3.js'

let audio = new DemoSong('../2ds.mp3');

let demo = true
//This is the API you'll use
let syncDevice = new JSRocket.SyncDevice(), BPM = 100, ROWS_PER_BEAT = 8, ROW_RATE = BPM / 60 * ROWS_PER_BEAT, row = 0;
let sceneIndex;
let camxpos;
let camypos;
let camzpos;
let camxrot;
let camyrot;
let camzrot;
let camxlookat;
let camylookat;
let camzlookat;

syncDevice.init();
syncDevice.on('ready', onSyncReady);
syncDevice.on('update', onSyncUpdate);
syncDevice.on('play', onPlay);
syncDevice.on('pause', onPause);
let scenes = [];

function onSyncReady()
{
	sceneIndex = syncDevice.getTrack('SceneIndex');
	camxpos = syncDevice.getTrack('camera:xpos');
	camypos = syncDevice.getTrack('camera:ypos');
	camzpos = syncDevice.getTrack('camera:zpos');
	camxrot = syncDevice.getTrack('camera:xrot');
	camyrot = syncDevice.getTrack('camera:yrot');
	camzrot = syncDevice.getTrack('camera:zrot');
	camxlookat = syncDevice.getTrack('camera:xlookat');
	camylookat = syncDevice.getTrack('camera:ylookat');
	camzlookat = syncDevice.getTrack('camera:zlookat');
	console.log("sync ready");
	scenes.push(new Scene0(syncDevice));
	scenes.push(new Scene1(syncDevice));
	scenes.push(new Scene2(syncDevice));
	scenes.push(new Scene3(syncDevice));
	render();
}



function onSyncUpdate(newRow)
{
	if(!isNaN(row))
	{
		row = newRow;
  	}

  	//update your view
  	audio.Seek(row / ROW_RATE);
}

function onPlay()
{
	//you could also set tune.currentTime here
	console.log("[onPlay] time in seconds", row / ROW_RATE);
	audio.Seek(row / ROW_RATE);
	audio.Play();
}

function onPause()
{
	console.log("[onPause] time in seconds", row / ROW_RATE);
	audio.Seek(row / ROW_RATE);
	audio.Pause();
}
				
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', onWindowResize, false);
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function render()
{
	requestAnimationFrame(render);
	if(audio.IsPaused === false) 
	{
		row = audio.Position * ROW_RATE;
        syncDevice.update(row);
	}
	let idx = sceneIndex.getValue(row);
	if(idx < scenes.length)
	{
		let row = audio.Position * ROW_RATE;
		scenes[idx].Update(row);
		camera.position.x = camxpos.getValue(row);
		camera.position.y = camypos.getValue(row);
		camera.position.z = camzpos.getValue(row);
		
		camera.rotation.x = camxrot.getValue(row);
		camera.rotation.y = camyrot.getValue(row);
		camera.rotation.z = camzrot.getValue(row);
		
		camera.lookAt(camxlookat.getValue(row), camylookat.getValue(row), camzlookat.getValue(row));
		scenes[idx].Render(renderer, camera);
	}
	else
	{
		console.log("end");
	}
}

