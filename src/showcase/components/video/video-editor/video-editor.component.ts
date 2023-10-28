import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderRangeComponent } from '@showcase/components/video/slider-range/slider-range.component';

@Component({
	selector: 'sb-video-editor',
	standalone: true,
	imports: [CommonModule, SliderRangeComponent],
	templateUrl: './video-editor.component.html',
	styleUrls: ['./video-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoEditorComponent implements OnInit {
	private _mediaSource = new MediaSource();
	private _stream!: any;
	private _mediaRecorder!: any;
	private _recordedBlobs!: any;
	private _sourceBuffer!: any;
	private _superBuffer!: any;

	private initTime = 0;
	private lastTime = 4;

	enableRecord = false;

	private _cdr = inject(ChangeDetectorRef);

	@ViewChild('video') video!: ElementRef<HTMLVideoElement>;
	//@ViewChild('video2') video2:ElementRef<HTMLVideoElement>;

	@Input() source!: string;

	@Output() base64 = new EventEmitter();

	duration = 0;

	constructor() {}

	ngOnInit() {
		this._mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);
		this.video.nativeElement.ontimeupdate = () => {
			console.log('current', this.video.nativeElement.currentTime, this.lastTime);
			if (this.lastTime && this.video.nativeElement.currentTime >= this.lastTime) {
				this.video.nativeElement.pause();
				if (this.enableRecord) {
					this.stopRecording();
					this.enableRecord = false;
					this._cdr.detectChanges();
				}
			}
		};
		window['video'] = this.video;
		this.video.nativeElement.onloadeddata = () => {
			console.log('dectectChanges', this.video.nativeElement.duration);
			this.duration = this.video.nativeElement.duration;
			this._cdr.detectChanges();
		};
	}

	play() {
		this.video.nativeElement.currentTime = this.initTime;
		this.video.nativeElement.play();
		if (this.enableRecord) {
			this.startRecording();
		}
	}

	trimVideo() {
		this.enableRecord = true;
		this.play();
	}

	setTimeInit(value) {
		if (this.video && this.video.nativeElement.duration) {
			this.initTime = value;
			console.log('value', this.initTime);
			this.video.nativeElement.currentTime = this.initTime;
		}
	}

	setTimeLast(value) {
		const timeFinish = value;
		this.lastTime = timeFinish;
	}

	handleSourceOpen() {
		this._sourceBuffer = this._mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
	}

	handleDataAvailable(event) {
		if (event.data && event.data.size > 0) {
			this._recordedBlobs.push(event.data);
		}
	}

	handleStop(event) {
		console.log('Recorder stopped: ', event);
		this._superBuffer = new Blob(this._recordedBlobs, { type: 'video/webm' });
		//this.video2.nativeElement.src = window.URL.createObjectURL(this.superBuffer);
		const reader = new FileReader();
		reader.readAsDataURL(this._superBuffer);
		reader.onloadend = () => {
			const base64data = reader.result;
			console.log(base64data);
			this.base64.emit(base64data);
		};
	}

	startRecording() {
		let options = { mimeType: 'video/webm' };
		this._recordedBlobs = [];
		if ((<any>this.video.nativeElement).captureStream) {
			this._stream = (<any>this.video.nativeElement).captureStream();
		} else if ((<any>this.video.nativeElement).mozCaptureStream) {
			this._stream = (<any>this.video.nativeElement).mozCaptureStream();
		}
		try {
			this._mediaRecorder = new MediaRecorder(this._stream, options);
		} catch (e0) {
			console.log('Unable to create MediaRecorder with options Object: ', e0);
			try {
				options = { mimeType: 'video/webm,codecs=vp9' };
				this._mediaRecorder = new MediaRecorder(this._stream, options);
			} catch (e1) {
				console.log('Unable to create MediaRecorder with options Object: ', e1);
				try {
					options = <any>'video/vp8'; // Chrome 47
					this._mediaRecorder = new MediaRecorder(this._stream, options);
				} catch (e2) {
					alert(
						'MediaRecorder is not supported by this browser.\n\n' +
							'Try Firefox 29 or later, or Chrome 47 or later, ' +
							'with Enable experimental Web Platform features enabled from chrome://flags.',
					);
					console.error('Exception while creating MediaRecorder:', e2);
					return;
				}
			}
		}
		console.log('Created MediaRecorder', this._mediaRecorder, 'with options', options);
		this._mediaRecorder.onstop = (event) => {
			this.handleStop(event);
		};
		this._mediaRecorder.ondataavailable = (event) => {
			this.handleDataAvailable(event);
		};
		this._mediaRecorder.start(100); // collect 100ms of data
		console.log('MediaRecorder started', this._mediaRecorder);
	}

	stopRecording() {
		this._mediaRecorder.stop();
		console.log('Recorded Blobs: ', this._recordedBlobs);
		//this.video2.nativeElement.controls = true;
	}
}
