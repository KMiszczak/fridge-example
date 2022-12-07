import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Element {
  id: number;
  category: string;
  content: Fruit[];
}

export interface Fruit {
  name: string;
}

/**
 * @title Table with editing
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['id', 'category', 'content'];

  backendResponse: Element[] = [
    { id: 158518626, category: 'Lebensmittel', content: [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}] },
    { id: 158518627, category: 'Lebensmittel', content: [{name: 'Pomes'}, {name: 'Wurst'}] },
  ];

  dataSource = new MatTableDataSource(this.backendResponse);

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const
  active?: number;

  add(event: MatChipInputEvent, i: number): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.backendResponse[i].content.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(element: Fruit, rowElement: number, contentElement: number): void {
    this.backendResponse[rowElement].content.splice(contentElement, 1);
  }

  sendButton() {
    console.log('Body', JSON.stringify(this.backendResponse));
  }
}


