import { TypescriptDemoPage } from './app.po';

describe('typescript-demo App', () => {
  let page: TypescriptDemoPage;

  beforeEach(() => {
    page = new TypescriptDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
