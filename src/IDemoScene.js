"use strict";
import * as THREE from '../3rdparty/three.module.js';

export class IDemoScene
{
	constructor(device)
	{
        this.scene = new THREE.Scene();
        this.device = device;
	}
	Init() {}
	Update(time){}
	Render(r, camera){}
}