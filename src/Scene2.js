"use strict";
import * as THREE from '../3rdparty/three.module.js';
import {IDemoScene} from './IDemoScene.js'

export class Scene2 extends IDemoScene
{
	constructor(device)
	{
		super(device);
		this.amount = 1;
		this.group = new THREE.Group();
		this.Init();
	}

	Init() 
	{
		const material = new THREE.MeshStandardMaterial({color:0x008000, roughness : 0.4, metalness : 0.0});
		let box = new THREE.Mesh(new THREE.BoxBufferGeometry(0.5, 0.01, 0.5), material);
		this.scene.add(this.group);
		//this.scene.add(new THREE.AmbientLight(0xffffff));
        //this.scene.add(new THREE.DirectionalLight(0xffffff, 1));

		for ( var z = -0; z < 20; z += 0.5 ) 
		{
			for ( var x = -5; x < 26; x += 0.5 )
			{
				var clone = box.clone();
				clone.position.x = x - 5;
				clone.position.z = z - 5;
				this.group.add(clone);
			}
		}

		this.scene.add(new THREE.AmbientLight(0x999999));
	}

	Update(row)
	{
		var time = row / 10 ;
		let asd;
		for (let i = 0; i < this.group.children.length; i++) 
		{
			let object = this.group.children[i];
			object.rotation.x = Math.sin(object.position.y / 10  + time) *  Math.cos(object.position.y / 10 + time);
			object.material.emissive.r =  Math.cos(object.position.x * 0.9  + time) * Math.cos(time * 0.5);
			object.material.emissive.r =  Math.sin(object.position.x * 0.4  + time) * Math.cos(time * 0.8);
			object.material.emissive.r =  Math.cos(object.position.x * 0.6  + time) * Math.cos(time * 0.7);

			//object.rotation.z = Math.pow(Math.sin(object.position.z / 4 + time ), 10);
		}
		console.log(asd);
	}

	Render(r, camera)
	{
		r.render(this.scene, camera);
	}
}
