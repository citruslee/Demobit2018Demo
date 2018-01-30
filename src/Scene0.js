"use strict";
import * as THREE from '../3rdparty/three.module.js';
import {IDemoScene} from './IDemoScene.js'

export class Scene0 extends IDemoScene
{
	constructor(device)
	{
		super(device);
		this.amount = 100;
        this.group = new THREE.Group();
        this.xrot = this.device.getTrack('scene0:xrot');
		this.yrot = this.device.getTrack('scene0:yrot');
        this.zrot = this.device.getTrack('scene0:zrot');
        this.xscale = this.device.getTrack('scene0:xscale');
		this.yscale = this.device.getTrack('scene0:yscale');
		this.zscale = this.device.getTrack('scene0:zscale');
		this.offset = this.device.getTrack('scene0:offset');
		this.cubeAmount = this.device.getTrack('scene0:amount');
		this.circleTime = this.device.getTrack('scene0:circleTime');
		this.Init();
	}

	Init() 
	{
		const material = new THREE.MeshStandardMaterial({color: 0x888888 , roughness : 0.2, metalness : 0.7});
        let box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 0.1), material);
        const material2 = new THREE.MeshStandardMaterial({color: 0x111111, roughness : 0.8, metalness : 0.1});
        material2.side = THREE.DoubleSide;
        let fuck = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(6, 1), material2);
        this.scene.add(fuck);
		this.scene.add(this.group);
        this.scene.add(new THREE.AmbientLight(0xffffff));
        this.scene.add(new THREE.DirectionalLight(0xffffff, 1));

		for (let i = 0; i < this.amount; i++) 
		{	
			let j = (i / this.amount) * Math.PI * 2;
			let clone = box.clone();
			clone.material = box.material.clone();
			clone.position.x = Math.cos(j) * 2;
			clone.position.y = Math.sin(j) * 2;
			clone.rotation.x = Math.PI / 2;
			clone.rotation.y = j;
			//clone.visible = false;
			this.group.add(clone);
		}
	}

	Update(row)
	{
		let time = row * 0.1;
		let amt = this.cubeAmount.getValue(row);
		if(amt > this.amount)
		{
			amt = this.amount;    
		}
		/*for (let i = 0; i < this.amount; i++) 
		{
			let object = this.group.children[i];
			object.visible = false;
		}*/
		console.log(amt);
		for (let i = 0; i < this.amount; i++) 
		{
			let t = this.circleTime.getValue(row);
			let value = Math.sin(t * 0.567 + (i / 16.0)) +
				Math.sin(t * 2.345 + (i / 8.0)) +
				Math.sin(t * 1.456 + (i / 4.0)) + this.offset.getValue(row);
			
			value *= Math.sin(t * 0.123) + this.offset.getValue(row);

			let object = this.group.children[i];
			object.visible = true;
			object.scale.x = object.scale.y = value * 0.25 + 0.7;
			object.rotation.z = value;
			object.material.emissive.g = Math.pow(value, 6.0) / 10.0;
			object.material.emissive.r = Math.pow(value, 2.0) / 50.0;
			let j = (i / this.amount) * Math.PI * amt;
			object.position.x = Math.cos(j) * amt;
			object.position.y = Math.sin(j) * amt;
        }
        this.scene.rotation.x = this.xrot.getValue(row);
        this.scene.rotation.y = this.yrot.getValue(row);
        this.scene.rotation.z = this.zrot.getValue(row);
        this.scene.scale.x = this.xscale.getValue(row);
        this.scene.scale.y = this.yscale.getValue(row);
        this.scene.scale.z = this.zscale.getValue(row);
	}

	Render(r, camera)
	{
		r.render(this.scene, camera);
		
	}
}
