import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.scss']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  load: boolean;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService) { 
     this.form = this.fb.group({
       titular: ['', Validators.required],
       numtarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
       fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
       cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
     })

     this.load = false;
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listTarjetas = data;
      this.load = true;
    }, error =>{
      console.log(error);
    })
  }

  guardarTarjeta(){
    

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numtarjeta: this.form.get('numtarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined){

      //Agregar tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('Tarjeta registrada con exito', 'Tarjeta registrada');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('ocurrio un error','Error');
        console.log(error);
      })
    }else{
      //Modificar tarjeta
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito','Tarjeta Actualizada');
        this.obtenerTarjetas();
      }, error => {
        this.toastr.error('La tarjeta no se pudo actualizar', 'Actualizar Tarjeta');
        console.log(error);
      })
    }

    
    
  }

  eliminarTarjeta(id: number){
     this._tarjetaService.borrartarjeta(id).subscribe(data =>{
       this.toastr.error('Tarjeta eliminada exitosamente', 'Eliminar tarjeta');
       this.obtenerTarjetas();
     }, error => {
       console.log(error);
     })
     
  }

  editarTarjeta(tarjeta: any){
     this.accion = 'Editar';
     this.id = tarjeta.id;

     this.form.patchValue({
       titular : tarjeta.titular,
       numtarjeta : tarjeta.numtarjeta,
       fechaExpiracion : tarjeta.fechaExpiracion,
       cvv : tarjeta.cvv
     })
  }

}


