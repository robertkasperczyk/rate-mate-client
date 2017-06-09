import { RateMateClientPage } from './app.po';

describe('rate-mate-client App', () => {
  let page: RateMateClientPage;

  beforeEach(() => {
    page = new RateMateClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
