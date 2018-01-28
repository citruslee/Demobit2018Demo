"use strict";
export class DemoSong
{
	constructor(song) 
	{
		this.audio = new Audio(song);
	}

	Start() 
	{
        this.audio.currentTime = 0;
        Play();
    }

	Play(cb) 
	{
		if(cb !== undefined) 
		{
			let fn = function () 
			{
                cb();
				this.audio.removeEventListener("play", fn)
            };
            this.audio.addEventListener("play", fn);
        }

        this.audio.play();
    }

	Stop() 
	{
        this.audio.pause();
        this.audio.currentTime = 0;
    }

	Pause() 
	{
        this.audio.pause();
    }

	Restart() 
	{
        Pause();
        this.audio.currentTime = 0;
        Play();
    }

	get Position() 
	{
        return this.audio.currentTime;
    }

	Seek(time) 
	{
        //_snd.pause();
        this.audio.currentTime = time;
    }

	get IsPaused() 
	{
       return this.audio.paused;
	}
}
