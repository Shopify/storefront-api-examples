import { SmallAwesomeShopPage } from './app.po';

describe('small-awesome-shop App', () => {
  let page: SmallAwesomeShopPage;

  beforeEach(() => {
    page = new SmallAwesomeShopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
