import { Component, OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  errors: Array<string> =[];
 
  @Input() fileExt: string = "JPG, GIF, PNG";
  @Input() maxSize: number = 5; // 5MB
  @Input() imgSource:any;
  @Input() selectedDocument:string;
  @Input() inputFileId:string;
  @Input() FileName:string;
  @Output() uploadOtherFile = new EventEmitter<Object>();
  @ViewChild('myInput')
  myInputVariable: any;
   
  constructor(private ng2ImgMax:Ng2ImgMaxService,private _sanitizer: DomSanitizer) { }
   
  ngOnInit() {
  }
   
  reset() {
  this.myInputVariable.nativeElement.value = "";
  }
   
  onFileChange(event){
    this.imgSource='';
  if( this.selectedDocument=="-1")
  {
  this.errors.push("Please select the document type.");
  this.uploadOtherFile.emit({error:this.errors,file:null});
  this.reset();
  return false;
  }
  else
  {
  let files = event.target.files;
  this.saveFiles(files);
  }
   
  }
   
  
  saveFiles(files){
  this.errors = []; // Clear error
  // Validate file size and allowed extensions
  let that=this;
  if (files.length > 0 && (!this.isValidFiles(files))) {
  //this.imgSource = "https://i.gadgets360cdn.com/large/pan_card_blank_gadgets_360_1522231408988.jpg";
  this.uploadOtherFile.emit({error:this.errors,file:null});
  return;
  }
   
  if (files.length > 0) {
 
  //this.myInputVariable.nativeElement.value = "";
this.ng2ImgMax.compressImage(files[0], 5).subscribe(
   result => {
   let file= new File([result], result.name);
   this.FileName=result.name;
    var reader = new FileReader();
    reader.onload = (event:any) => {
    this.imgSource= this._sanitizer.bypassSecurityTrustUrl(event.target.result);
    }
    reader.readAsDataURL(file);
    this.uploadOtherFile.emit({error:null,file:file });
   that.reset();
   return;
   },
   error => {
   console.log('Error in image upload', error);
   that.reset();
   return;
   }
   );
  }
  
  }
   
  private isValidFiles(files){
  // Check Number of files

  if (files.length > 1) {
  this.errors.push("At a time you can upload only one files");
  return;
  }
  this.isValidFileExtension(files);
  return this.errors.length === 0;
  }
   
  private isValidFileExtension(files){
  // Make array of file extensions
  var extensions = (this.fileExt.split(','))
  .map(function (x) { return x.toLocaleUpperCase().trim() });
   
  for (var i = 0; i < files.length; i++) {
  // Get file extension
  var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
  // Check the extension exists
  var exists = extensions.includes(ext);
  if (!exists) {
  this.errors.push(`The files to be uploaded over here should be in ${this.fileExt} extensions.`);
  }
  // Check file size
  this.isValidFileSize(files[i]);
  }
  }
   
  private isValidFileSize(file) {
  
  var fileSizeinMB = file.size / (1024 * 1024);
  var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
  if (size > this.maxSize)
  this.errors.push(`The file size cannot exceed ${this.maxSize} MB.`);
  }
   
  

}
