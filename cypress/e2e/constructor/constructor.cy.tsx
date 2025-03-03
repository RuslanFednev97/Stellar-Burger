import type {} from 'cypress';

describe('Конструктор бургера', () => {
  beforeEach(() => {

    // Перехват запросов и возврат моковых данных
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');

    // Открываем страницу конструктора
    cy.visit('http://localhost:4000');
  });

  it('Добавление ингредиентов в конструктор', () => {

    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');

    // Проверяем, что кнопка "ингредиент" существует и добавляем его
    cy.get('[data-cy=bun-ingredients]')
      .should('exist')
      .find('button')
      .first()
      .should('contain.text', 'Добавить')
      .click();

    // Проверяем, что ингредиент добавлен в конструктор
    cy.get('[data-cy="constructor-ingredients"]').should('have.length.greaterThan', 0);
  });

  describe('Работа модальных окон', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {

      // Ждем загрузки ингредиентов
      cy.wait('@getIngredients');

      // Проверяем, что модальное окно отсутствует на экране
      cy.get('[data-cy="modal"]').should('not.exist');

      // Открываем модальное окно по клику на ингредиент
      cy.get('[data-cy=bun-ingredients]').contains('Краторная булка N-200i').click();

      // Проверяем, что в модальном окне отображается информация о выбранном товаре
      cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Краторная булка N-200i').should('be.visible');
      });

      // Закрываем модальное окно по клику на крестик
      cy.get('[data-cy="close-modal"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      // Проверяем, что модальное окно отсутствует на экране
      cy.get('[data-cy="modal"]').should('not.exist');

      // Открываем модальное окно снова
      cy.get('[data-cy=bun-ingredients]').contains('Краторная булка N-200i').click();

      // Проверяем, что в модальном окне отображается информация о выбранном товаре
      cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Краторная булка N-200i').should('be.visible');
      });

      // Закрываем модальное окно по клику на оверлей
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      // Подставляем моковые токены авторизации
      cy.setCookie('accessToken', 'mockAccessToken');
      localStorage.setItem('refreshToken', 'mockRefreshToken');
    });

    afterEach(() => {
      // Очищаем localStorage и cookies после каждого теста в этом блоке
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('Создание заказа и проверка его по номеру', () => {
      cy.wait('@getIngredients');
    
      // Добавляем булку
      cy.get('[data-cy=bun-ingredients]')
        .should('exist')
        .find('button')
        .first()
        .should('contain.text', 'Добавить')
        .click();
    
      // Проверяем, что булка добавлена в конструктор
      cy.get('[data-cy="constructor-ingredients"]').should('have.length', 1);
    
      // Добавляем начинку
      cy.get('[data-cy=mains-ingredients]')
        .should('exist')
        .find('button')
        .first()
        .should('contain.text', 'Добавить')
        .click();
    
      // Проверяем, что начинка добавлена в конструктор
      cy.get('[data-cy="constructor-ingredients"] > *').should('have.length.greaterThan', 1);
    
      // Оформляем заказ
      cy.get('[data-cy="order-button"]').click();
    
      // Проверяем, что модальное окно открылось
      cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
    
      // Проверяем номер заказа
      cy.get('[data-cy="order-number"]').should('contain', '69625');
    
      // Закрываем модальное окно
      cy.get('[data-cy="close-modal"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    
      // Проверяем, что конструктор пуст
      cy.get('[data-cy="constructor-ingredients"]').should('have.length', 0);
    })
  })})