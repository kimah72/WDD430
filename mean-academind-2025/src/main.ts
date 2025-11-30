import { platformBrowser } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, {
  providers: [
    provideAnimations(),
  ],
})
  .catch(err => console.error(err));
