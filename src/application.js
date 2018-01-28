/* eslint-env browser */
"use strict";
import * as THREE from '../3rdparty/three.module.js';
import {DemoSong} from './DemoSong.js'
import {Scene0} from './Scene0.js'
import {Scene1} from './Scene1.js'

let audio = new DemoSong('../2ds.mp3');

let demo = true
//This is the API you'll use
let syncDevice = new JSRocket.SyncDevice(), BPM = 100, ROWS_PER_BEAT = 8, ROW_RATE = BPM / 60 * ROWS_PER_BEAT, sceneIndex, row = 0;

syncDevice.init();
syncDevice.on('ready', onSyncReady);
syncDevice.on('update', onSyncUpdate);
syncDevice.on('play', onPlay);
syncDevice.on('pause', onPause);
let scenes = [];

function onSyncReady()
{
	sceneIndex = syncDevice.getTrack('SceneIndex');
	console.log("sync ready");
	scenes.push(new Scene0(syncDevice));
	scenes.push(new Scene1(syncDevice));
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
		scenes[idx].Update(audio.Position * ROW_RATE);
		scenes[idx].Render(renderer, camera);
	}
	else
	{
		console.log("end");
	}
}

