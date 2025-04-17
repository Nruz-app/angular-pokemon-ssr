import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Fernando,Herrera,Curso,Angular,PRO',
    });
  }

}
