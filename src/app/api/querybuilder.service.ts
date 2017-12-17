import {Injectable} from "@angular/core";

@Injectable()
export class QueryBuilderService {

  public where(where:{} = {},param:string,arg:any): {}{
    where[param]=arg;
    return where;
  }

  public and(where:{},arg:any[]): {}{
    where['$and']=arg;
    return where;
  }

  public or(where:{},arg:any[]): {}{
    where['$or']=arg;
    return where;
  }

  public lessThan(where:{},param:string,quantity:number): {}{
    where[param]={'$lt':quantity};
    return where;
  }

  public greaterThan(where:{},param:string,quantity:number): {}{
    where[param]={'$gt':quantity};
    return where;
  }


}
