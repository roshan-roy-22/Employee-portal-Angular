import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search' // It is used as search in all component where it is available
})
export class SearchPipe implements PipeTransform {

  transform(allUsers:any[],searchKey:string): any[] {
    const result:any =[]

    if(!allUsers || searchKey==""){
      return allUsers
    }

    allUsers.forEach((item)=>{
      if(item.name?.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })

    return result;
  }

}
