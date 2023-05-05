import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nlfDynamicColorErc",
  pure: false,
})
export class NlfDynamicColorErcPipe implements PipeTransform {
  transform(value: any): any {
    let type: string;

    if (value < 20) {
      type = "success";
    } else if (value < 500) {
      type = "warning";
    } else {
      type = "danger";
    }

    return type;
  }
}
