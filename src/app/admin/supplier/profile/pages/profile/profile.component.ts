import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../services/profile.service';
import { LocalStorageStoreService } from 'src/app/shared/services/local-storage.service';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild('editp') editp?: ElementRef;
  @ViewChild('editName') editName?: ElementRef;
  @ViewChild('fileInput') fileInput?: ElementRef;

  formCreate: FormGroup = new FormGroup({});
  description = ''
  id_supplier = 0
  name = ''
  srcImage?: string;
  waitTime?: ReturnType<typeof setTimeout>;

  departments = [
    {
        "id": "1",
        "name": "Lima"
    },
    {
        "id": "2",
        "name": "Amazonas"
    },
    {
        "id": "3",
        "name": "Apurímac"
    },
    {
        "id": "4",
        "name": "Arequipa"
    },
    {
        "id": "5",
        "name": "Ayacucho"
    },
    {
        "id": "6",
        "name": "Cajamarca"
    },
    {
        "id": "7",
        "name": "Cusco"
    },
    {
        "id": "8",
        "name": "Huancavelica"
    },
    {
        "id": "9",
        "name": "Huánuco"
    },
    {
        "id": "10",
        "name": "Ica"
    },
    {
        "id": "11",
        "name": "Junín"
    },
    {
        "id": "12",
        "name": "La Libertad"
    },
    {
        "id": "13",
        "name": "Lambayeque"
    },
    {
        "id": "14",
        "name": "Loreto"
    },
    {
        "id": "15",
        "name": "Madre De Dios"
    },
    {
        "id": "16",
        "name": "Moquegua"
    },
    {
        "id": "17",
        "name": "Pasco"
    },
    {
        "id": "18",
        "name": "Piura"
    },
    {
        "id": "19",
        "name": "Puno"
    },
    {
        "id": "20",
        "name": "San Martín"
    },
    {
        "id": "21",
        "name": "Tacna"
    },
    {
        "id": "22",
        "name": "Tumbes"
    },
    {
        "id": "23",
        "name": "Ucayali"
    },
    {
        "id": "24",
        "name": "Áncash"
    }
]

  constructor(
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private localStorage:LocalStorageStoreService,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    // const {email} = Validators
    const {image,department,phone,mail,description,name, id_supplier} = this.adminService.infoSupplier
    console.log(this.adminService.infoSupplier)
    // const {department,phone,mail,description,name, id_supplier} = JSON.parse(this.localStorage.getItem('infoSupplier') ?? '')
    this.description = description || 'Mi descripción'
    this.name = name || ''
    this.id_supplier = id_supplier || 0
    this.srcImage = image
    this.formCreate = this.fb.group({
      mail: [mail || '',[]],
      department: [department || '',[]],
      phone: [phone || '',[]],
    })

    this.adminService.supplierEmitter.subscribe(({description,name,id_supplier,image,mail,department,phone})=>{
      this.description = description || 'Mi descripción';
      this.name = name || '';
      this.id_supplier = id_supplier || 0;
      this.srcImage = image || '';
      this.formCreate.patchValue({
        mail,
        department,
        phone,
      })

    })

  }

  onChangeInformation(event: KeyboardEvent) {
    const editp = this.editp?.nativeElement as HTMLParagraphElement;
    const editName = this.editName?.nativeElement as HTMLTitleElement;
    if (event.key === 'Enter') {
      editp.querySelector('div')?.remove();
      editName.querySelector('div')?.remove();
    }

   
    clearTimeout(this.waitTime);
    this.waitTime = setTimeout(()=>{
      const valueParagraph = editp.innerText.trim()
      const valueName = editName.innerText.trim()
      this.description = valueParagraph
      this.name = valueName
      this.saveChanges()
    }, 1000);
  }


  saveChanges(){
    // if(!this.formCreate.valid) return;
    const {mail,department,phone} = this.formCreate.value as {mail:string,department:string,phone:string}
    const objectToSend = {
      id_supplier: this.id_supplier,
      description: this.description,
      name: this.name,
      mail,
      department:department.toString(),
      phone
    }
    this.profileService.updateFieldProfile(objectToSend).subscribe((update:boolean)=>{
      if(!update) {
        this.showSnackBar.bind(this)('Error al actualizar el campo','Aceptar')
        return;
      }
     
      this.adminService.updateFieldsProfile(objectToSend)
      this.showSnackBar.bind(this)('Cambios guardados','Aceptar')

    })
  }


  onChangeImage(event: Event){
    if(!this.fileInput) return;

    const selectedFile = (event.target as HTMLInputElement).files?.[0]
    if(!selectedFile) return;
    this.profileService.updateImage(selectedFile).subscribe((url:string)=>{
      
      if(!url) {
        this.showSnackBar.bind(this)('Error al subir la imagen','Aceptar')
        return;
      }

      this.srcImage = url
      this.adminService.updateFieldsProfile({image: url})
      this.showSnackBar.bind(this)('Imagen subida correctamente','Aceptar')

    })

    console.log(selectedFile)
    // if (selectedFile) {
    //     const reader = new FileReader()
    //     reader.onload = (e: ProgressEvent<FileReader>) => {
    //       if (e.target && e.target.result) {
    //         const binaryString = e.target.result as string;
    //         console.log(binaryString)
    //         this.srcImage = binaryString

    //         if(event.target) (event.target as HTMLInputElement).value = ''
    //       }
    //     }

    //     reader.readAsDataURL(selectedFile);
      

    // }
  }

  showSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action , {
      duration: 2000,
    });
  }

 

}
