import { Component, OnInit, ViewChild } from '@angular/core';
import { range } from 'rxjs';
import { Pokemon } from '../pokemon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image'];
  data: Pokemon[] = [];
  dataSource = new MatTableDataSource<Pokemon>(this.data);
  pokemons = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getCharacters() {
    let character;
    range(1, 150).subscribe((id) =>
      this.pokemonsService.getPokemons(id).subscribe((res) => {
        character = {
          id: id,
          name: res.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          base_experience: res.base_experience,
          height: res.height,
          weight: res.weight,
        };
        this.data.push(character);
        this.dataSource = new MatTableDataSource<Pokemon>(this.data);
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getRow(row: Pokemon) {
    this.router.navigateByUrl(`detail/${row.id}`);
  }
}