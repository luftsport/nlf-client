import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'highliteText'
})
export class HighliteTextPipe implements PipeTransform {
  /* use this for single match search */
  static SINGLE_MATCH: string = "Single-Match";
  /* use this for single match search with a restriction that target should start with search string */
  static SINGLE_AND_STARTS_WITH_MATCH: string = "Single-And-StartsWith-Match";
  /* use this for global search */
  static MULTI_MATCH: string = "Multi-Match";

  constructor() {}
  transform(
      contentString: string = null,
      stringToHighlight: string = null,
      option: string = "Single-And-StartsWith-Match",
      caseSensitive: boolean = false,
      highlightStyleName: string = "search-highlight"
  ): SafeHtml {
      if (stringToHighlight && contentString && option) {
          let regex: any = "";
          let caseFlag: string = !caseSensitive ? "i" : "";
          switch (option) {
              case "Single-Match": {
                  regex = new RegExp(stringToHighlight, caseFlag);
                  break;
              }
              case "Single-And-StartsWith-Match": {
                  regex = new RegExp("^" + stringToHighlight, caseFlag);
                  break;
              }
              case "Multi-Match": {
                  regex = new RegExp(stringToHighlight, "g" + caseFlag);
                  break;
              }
              default: {
                  // default will be a global case-insensitive match
                  regex = new RegExp(stringToHighlight, "gi");
              }
          }
          const replaced = contentString.replace(
              regex,
              (match) => `<span class="${highlightStyleName}">${match}</span>`
          );
          return replaced;
      } else {
          return contentString;
      }
  }
}

/** 
export class HighliteTextPipe implements PipeTransform {

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // const argsRegex = new RegExp(args, '/\b(\w+)\b/g');
    const argsArr = args.match(/\b(\w+)\b/gu);

    for (const text of argsArr) {
      var reText = new RegExp(text, 'gi');
      //value = value.replace(reText, "<mark>" + text + "</mark>");
      //for your custom css
      // value = value.replace(reText, "<span class='highlight-search-text'>" + text + "</span>");
      value = value.replace(reText, "<span class='highlight'>" + this.titleCaseWord(text) + "</span>");
    }
    return value;
    // insert from below
  }

}
*/
/**
    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
    **/