"use strict";
import * as THREE from '../3rdparty/three.module.js';
import {IDemoScene} from './IDemoScene.js'

export class Scene1 extends IDemoScene
{
	constructor(device)
	{
		super(device);
		this.amount = 1;
		this.group = new THREE.Group();
		this.cubexrot = this.device.getTrack('cube:xrot');
		this.cubeyrot = this.device.getTrack('cube:yrot');
		this.cubezrot = this.device.getTrack('cube:zrot');
		this.cubexscale = this.device.getTrack('cube:xscale');
		this.cubeyscale = this.device.getTrack('cube:yscale');
		this.cubezscale = this.device.getTrack('cube:zscale');
		this.Init();
	}

	Init() 
	{
		const material = new THREE.MeshStandardMaterial({color: 0x222222, roughness : 0.2, metalness : 0.7});
		let box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), material);
		this.scene.add(this.group);
		
		this.scene.add(new THREE.AmbientLight(0x999999));
		this.group.add(box)
	}

	Update(row)
	{
			let object = this.group.children[0];
			let xrot = this.cubexrot.getValue(row);
			let yrot = this.cubeyrot.getValue(row);
			let zrot = this.cubezrot.getValue(row);
			let xscale = this.cubexscale.getValue(row);
			let yscale = this.cubeyscale.getValue(row);
			let zscale = this.cubezscale.getValue(row);
			let euler = new THREE.Euler(xrot, yrot, zrot, 'XYZ' );
			//object.rotation.applyEuler(euler);
			object.rotation.x = xrot;
			object.rotation.y = yrot;
			object.rotation.z = zrot;
			object.scale.x = xscale;
			object.scale.y = yscale;
			object.scale.z = zscale;
			object.material.emissive.r = 0.4;
			object.material.emissive.b = 0.7;
		
	}

	Render(r, camera)
	{
		r.render(this.scene, camera);
	}
}
