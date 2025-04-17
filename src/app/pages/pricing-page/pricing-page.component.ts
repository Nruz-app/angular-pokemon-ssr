import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit{

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    //Identificar si la app se carga desde el cliente o desde el servidor
    console.log(`Page Cargada Desde Cliente (SPA) ${isPlatformBrowser(this.platform)}`);
    console.log(`Page Carga Desde Servidor (SSR) ${isPlatformServer(this.platform)}`);

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
  }

}
