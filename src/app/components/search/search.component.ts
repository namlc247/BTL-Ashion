import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  ngOnInit(): void {
    $('.search-switch').on('click', function () {
      $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
      $('.search-model').fadeOut(400, function () {
        $('#search-input').val('');
      });
    });
  }
}
