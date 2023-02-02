import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ApiContentService } from 'app/api/api-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiOptionsInterface, ApiContentItem } from 'app/api/api.interface';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class NlfContentViewComponent implements OnInit, AfterContentChecked {

  faEdit = faEdit;
  faPlus = faPlus;

  content: ApiContentItem;
  dataReady = false;
  error = false;
  checked = false;
  parents = [];
  children = [];
  siblings = [];
  space_tree = [];

  constructor(private apiContent: ApiContentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(

      params => {
        this.dataReady = false; // Always trigger loader
        this.parents = [];
        this.children = [];
        this.siblings = [];

        const options: ApiOptionsInterface = {
          query: {
            where: { space_key: params['space_key'] }
          },
        };
        this.apiContent.getContent(params['slug'], options).subscribe(
          data => {
            this.content = data;
            this.getParents(data._id);
            this.getChildren(data._id);
            this.getSiblings(data.parent, data._id);
            this.getSpaceTree(data.space_key);
          },
          err => {
            console.log(err);
            this.error = true;
          },
          () => this.dataReady = true
        );
      });

  }

  private getSpaceTree(space_key) {
    const options: ApiOptionsInterface = {
      query: {
        // where: { space_key: space_key },
        projection: {_id: 1, title: 1, slug: 1, space_key:1, parent: 1}
      },
    };
    this.apiContent.getContentList(options).subscribe(
      data => {
        this.space_tree = this.treeify(data._items, '_id', 'parent', 'children');
      },
      err => console.log(err),
      () => this.dataReady = true
    );


  }

  treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) { idAttr = '_id'; }
    if (!parentAttr) { parentAttr = 'parent'; }
    if (!childrenAttr) { childrenAttr = 'children'; }

    let treeList = [];
    let lookup = {};
    list.forEach(function (obj) {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
      if (obj[parentAttr] != null) {
        lookup[obj[parentAttr]][childrenAttr].push(obj);
      } else {
        treeList.push(obj);
      }
    });
    return treeList;
  }

  private getParents(_id: string) {
    const options: ApiOptionsInterface = {
      query: {
        aggregate: { '$start_id': _id }
      },
    };
    this.apiContent.aggregateParents(options).subscribe(
      data => {
        console.log('Len', data._items.length);
        if (data._items.length > 0) {
          this.parents = data._items[0]['parents'];
        }
      },
      err => console.log(err),
    );

  }

  private getSiblings(parent_id, _id) {
    const options: ApiOptionsInterface = {
      query: {
        aggregate: { '$parent_id': parent_id, '$current_id': _id }
      },
    };
    this.apiContent.aggregateSiblings(options).subscribe(
      data => {
        console.log('Siblings', data);
        if (data._items.length > 0) {
          this.siblings = data._items[0]['siblings'];
        }
      },
      err => console.log(err),
    );
  }

  private getChildren(_id: string) {

    const options: ApiOptionsInterface = {
      query: {
        aggregate: { '$start_id': _id, '$max_depth': 10 }
      },
    };
    this.apiContent.aggregateChildren(options).subscribe(
      data => {
        console.log('Children', data);
        console.log('Len', data._items.length);
        if (data._items.length > 0) {
          this.children = data._items[0]['children'];
        }
      },
      err => console.log(err),
    );
  }

  ngAfterContentChecked() {

    if (!this.checked) {
      let children = document.getElementsByClassName('macrolink');

      for (let i = 0; i < children.length; i++) {

        if (!!children[i]['attributes'] && !!children[i]['attributes']['data-url']) {
          children[i].addEventListener('click', (event: Event) => {

            if (!!event['originalTarget']['attributes']['data-url']['value']) {
              this.router.navigate([event['originalTarget']['attributes']['data-url']['value']]);
            }
          });
        }
      }
    }
  }
}

/**
 * use fnlf-dev;
db.content.aggregate(
    [
        {
            "$graphLookup" : {
                "from" : "content",
                "startWith" : "$parent",
                "connectFromField" : "parent",
                "connectToField" : "_id",
                "as" : "parents"
            }
        }
    ],
    {
        "allowDiskUse" : false
    }
);

 */
