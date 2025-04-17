import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent implements OnInit {

  private readonly title = inject(Title);
  private readonly meta  = inject(Meta);


  ngOnInit(): void {

    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi About Page >.<',
    });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Nicolas Ruz',
    });

  }

}
