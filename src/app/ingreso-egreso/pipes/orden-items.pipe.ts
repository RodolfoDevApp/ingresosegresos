import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Pipe({
  name: 'ordenItems'
})
export class OrdenItemsPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort( (a , b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
